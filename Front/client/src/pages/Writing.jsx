import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiFetch } from '../api/client';
import './Writing.css';

const FEEDBACK_URL = 'https://flask-hello-world-2-eta.vercel.app/feedback';

export default function Writing() {
  const navigate = useNavigate();
  const [session, setSession] = useState({ username: '', email: '' });
  const [topic, setTopic] = useState(null);
  const [response, setResponse] = useState('');
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [feedback, setFeedback] = useState(null); // { original, corrections }
  const timerRef = useRef(null);

  useEffect(() => {
    async function fetchSessionInfo() {
      try {
        const res = await apiFetch('/session-info');
        if (res.ok) {
          const data = await res.json();
          setSession({ username: data.username, email: data.email });
        } else {
          console.error('Failed to fetch session info');
        }
      } catch (error) {
        console.error('Error fetching session info:', error);
      }
    }

    async function fetchAndDisplayPrompt() {
      try {
        const res = await apiFetch('/gre_writing_topics');
        const data = await res.json();
        const randomTopic = data[Math.floor(Math.random() * data.length)];
        setTopic(randomTopic);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchSessionInfo();
    fetchAndDisplayPrompt();

    timerRef.current = setInterval(() => setTimeElapsed((t) => t + 1), 1000);
    return () => clearInterval(timerRef.current);
  }, []);

  const wordCount = response.split(/\s+/).filter((word) => word.length > 0).length;
  const minutes = Math.floor(timeElapsed / 60);
  const seconds = timeElapsed % 60;

  async function submitFeedback(responseText) {
    try {
      const feedbackRes = await fetch(FEEDBACK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ feedback: responseText })
      });

      if (feedbackRes.ok) {
        const feedbackData = await feedbackRes.json();
        setFeedback({
          original: feedbackData['Original Feedback'],
          corrections: feedbackData['Corrections'] || null
        });
      } else {
        console.error('Error receiving feedback:', feedbackRes.statusText);
        alert('Error receiving feedback. Please try again later.');
      }
    } catch (error) {
      console.error('Error receiving feedback:', error);
      alert('Error receiving feedback. Please try again later.');
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!session.username?.trim() || !session.email?.trim()) {
      alert('Failed to fetch user info. Please try again.');
      return;
    }

    const dataToSend = {
      username: session.username,
      email: session.email,
      topic_id: topic?._id,
      topic_text: topic?.topic_text,
      response_text: response,
      time: timeElapsed
    };

    try {
      const saveResponse = await apiFetch('/gre_writing_response', {
        method: 'POST',
        body: JSON.stringify(dataToSend)
      });

      if (saveResponse.ok) {
        clearInterval(timerRef.current);
        setSubmitted(true);
        await submitFeedback(dataToSend.response_text);
      } else {
        console.error('Error saving data:', saveResponse.statusText);
        alert('Error submitting data. Please try again.');
      }
    } catch (error) {
      console.error('Error saving data:', error);
      alert('Error submitting data. Please try again.');
    }
  }

  return (
    <div className="writing-page">
      <div className="main-content">
        <h2>Analytical Writing (GRE)</h2>

        <div className="form-group">
          <h4>Topic</h4>
          <h5 id="promptContainer">{topic?.topic_text}</h5>
          <div className="d-flex justify-content-end">
            <div id="timerDisplay" className="shadow p-3 mb-5 bg-body-tertiary rounded" style={{ color: 'black' }}>
              Time: {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
            </div>
          </div>
        </div>

        <div className="form-group">
          <textarea
            className="form-control response-textarea"
            id="response"
            placeholder="Write your response here"
            disabled={submitted}
            value={response}
            onChange={(e) => setResponse(e.target.value)}
          />
          <h5 id="wordCount">Word count: {wordCount}</h5>
        </div>

        {!submitted && (
          <button
            onClick={handleSubmit}
            id="submitBtn"
            className="btn btn-primary btn-lg"
            disabled={wordCount < 200}
          >
            Submit
          </button>
        )}

        {submitted && (
          <div id="submitResponse" style={{ display: 'block' }}>
            <span style={{ fontSize: '24px' }}>Thank you for your submission, {session.username}!</span>
          </div>
        )}

        {feedback && (
          <div id="feedbackResponse" style={{ display: 'block' }}>
            Original Feedback: {feedback.original}
          </div>
        )}

        {feedback && (
          <div id="corrections" style={{ display: 'block' }}>
            {feedback.corrections ? (
              <>
                <strong>Corrections:</strong>
                <ul className="correction-list">
                  {Object.entries(feedback.corrections).map(([original, corrected]) => (
                    <li key={original} className="correction-item">{original} :- {corrected}</li>
                  ))}
                </ul>
              </>
            ) : (
              'No corrections needed.'
            )}
          </div>
        )}

        {submitted && (
          <button
            id="homeBtn"
            className="btn btn-secondary btn-lg"
            style={{ display: 'inline-block' }}
            onClick={() => navigate('/')}
          >
            Home Page
          </button>
        )}
      </div>
    </div>
  );
}

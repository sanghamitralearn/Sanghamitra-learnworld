import { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Chart } from 'chart.js/auto';
import { apiFetch } from '../api/client';
import './VocabAnalytics.css';

export default function VocabAnalytics() {
  const [searchParams] = useSearchParams();
  const quizId = searchParams.get('quizId');

  const [username, setUsername] = useState('User');
  const [summary, setSummary] = useState(null);
  const [questions, setQuestions] = useState([]);

  const difficultyCanvasRef = useRef(null);
  const cefrCanvasRef = useRef(null);
  const difficultyChartRef = useRef(null);
  const cefrChartRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchSessionInfo() {
      try {
        const response = await apiFetch('/session-info');
        if (!response.ok) {
          console.error('Failed to fetch session info');
          return;
        }
        const data = await response.json();
        if (cancelled) return;
        setUsername(data.username || 'User');
        await fetchUserData(data.email);
      } catch (error) {
        console.error('Error fetching session info:', error);
      }
    }

    async function fetchUserData(email) {
      try {
        const response = await apiFetch(`/vocabscores?email=${encodeURIComponent(email)}&date=${encodeURIComponent(quizId)}`);
        if (!response.ok) throw new Error('Network response was not ok ' + response.statusText);
        const userData = await response.json();
        if (cancelled) return;
        processUserData(userData);
      } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
      }
    }

    function processUserData(userData) {
      if (!userData?.assessments?.length) {
        console.error('Invalid user data', userData);
        return;
      }

      const assessment = userData.assessments[userData.assessments.length - 1];
      const totalQuestions = assessment.questions.length;
      const correctAnswers = assessment.questions.filter((q) => q.is_correct).length;
      const incorrectAnswers = assessment.questions.filter((q) => !q.is_correct && q.user_response !== '').length;
      const skippedQuestions = assessment.questions.filter((q) => q.user_response === '').length;
      const accuracy = (correctAnswers / totalQuestions) * 100;

      const difficultyScores = {};
      const cefrScores = {};

      assessment.questions.forEach((question) => {
        const difficulty = question.difficulty_level;
        const cefr = question.CEFR_level;
        if (!difficultyScores[difficulty]) difficultyScores[difficulty] = { correct: 0, total: 0 };
        if (!cefrScores[cefr]) cefrScores[cefr] = { correct: 0, total: 0 };
        difficultyScores[difficulty].total++;
        cefrScores[cefr].total++;
        if (question.is_correct) {
          difficultyScores[difficulty].correct++;
          cefrScores[cefr].correct++;
        }
      });

      setSummary({
        totalScore: assessment.total_score,
        accuracy: accuracy.toFixed(2),
        correctAnswers,
        incorrectAnswers,
        skippedQuestions,
        difficultyScores,
        cefrScores
      });
      setQuestions(assessment.questions);
    }

    fetchSessionInfo();
    return () => {
      cancelled = true;
    };
  }, [quizId]);

  useEffect(() => {
    if (!summary) return;

    difficultyChartRef.current?.destroy();
    cefrChartRef.current?.destroy();

    const difficultyLabels = Object.keys(summary.difficultyScores);
    const difficultyData = difficultyLabels.map(
      (d) => (summary.difficultyScores[d].correct / summary.difficultyScores[d].total) * 100
    );
    const cefrLabels = Object.keys(summary.cefrScores);
    const cefrData = cefrLabels.map((c) => (summary.cefrScores[c].correct / summary.cefrScores[c].total) * 100);

    difficultyChartRef.current = new Chart(difficultyCanvasRef.current.getContext('2d'), {
      type: 'bar',
      data: {
        labels: difficultyLabels,
        datasets: [{
          label: 'Difficulty Scores',
          data: difficultyData,
          backgroundColor: 'rgba(153, 102, 255, 0.2)',
          borderColor: 'rgba(153, 102, 255, 1)',
          borderWidth: 1
        }]
      },
      options: { responsive: true, maintainAspectRatio: false }
    });

    cefrChartRef.current = new Chart(cefrCanvasRef.current.getContext('2d'), {
      type: 'bar',
      data: {
        labels: cefrLabels,
        datasets: [{
          label: 'CEFR Scores',
          data: cefrData,
          backgroundColor: 'rgba(255, 159, 64, 0.2)',
          borderColor: 'rgba(255, 159, 64, 1)',
          borderWidth: 1
        }]
      },
      options: { responsive: true, maintainAspectRatio: false }
    });

    return () => {
      difficultyChartRef.current?.destroy();
      cefrChartRef.current?.destroy();
    };
  }, [summary]);

  return (
    <div className="quiz-analytics-content">
      <div className="main-content">
        <div className="dashboard">
          <h1>Quiz Analytics for <span id="username">{username}</span></h1>
          <div className="card">
            <h2>Total Points Earned</h2>
            <p id="totalScore">{summary?.totalScore ?? 'N/A'}</p>
          </div>
          <div className="card">
            <h2>Accuracy</h2>
            <p id="accuracy" title={summary ? `${summary.correctAnswers}/${summary.correctAnswers + summary.incorrectAnswers + summary.skippedQuestions}` : undefined}>
              {summary ? `${summary.accuracy}%` : 'N/A'}
            </p>
            <div>
              <p id="correctAnswers">Correct: {summary?.correctAnswers ?? 'N/A'}</p>
              <p id="incorrectAnswers">Incorrect: {summary?.incorrectAnswers ?? 'N/A'}</p>
              <p id="skippedQuestions">Skipped: {summary?.skippedQuestions ?? 'N/A'}</p>
            </div>
          </div>
          <div className="card chart-container">
            <canvas id="difficultyChart" ref={difficultyCanvasRef}></canvas>
          </div>
          <div className="card chart-container">
            <canvas id="cefrChart" ref={cefrCanvasRef}></canvas>
          </div>
          <div className="card">
            <h2>Question Analysis</h2>
            <table id="questionTable">
              <thead>
                <tr>
                  <th>Question</th>
                  <th>Topic</th>
                  <th>CEFR Level</th>
                  <th>Difficulty</th>
                  <th>Your Response</th>
                  <th>Correct Answer</th>
                  <th>Points Awarded</th>
                </tr>
              </thead>
              <tbody>
                {questions.map((question, index) => (
                  <tr key={question.question_id || index}>
                    <td>{question.question_text}</td>
                    <td>{question.topic}</td>
                    <td>{question.CEFR_level}</td>
                    <td>{question.difficulty_level}</td>
                    <td>{question.user_response}</td>
                    <td>{question.correct_option}</td>
                    <td>{question.points_awarded}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="sidebar">
        <h2>Additional Resources</h2>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/dashboard">Profile</Link></li>
          <li><a href="#">Settings</a></li>
        </ul>
      </div>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiFetch } from '../api/client';
import './Dashboard.css';

function processUserData(user) {
  const assessments = user.assessments;
  const latestAssessment = assessments[0];

  const strengths = [];
  const weaknesses = [];
  const topicScores = {};

  latestAssessment.questions.forEach((question) => {
    const topic = question.topic;
    if (!topicScores[topic]) topicScores[topic] = { correct: 0, total: 0 };
    topicScores[topic].total++;
    if (question.is_correct) topicScores[topic].correct++;
  });

  Object.keys(topicScores).forEach((topic) => {
    const score = (topicScores[topic].correct / topicScores[topic].total) * 100;
    if (score >= 75) strengths.push(topic);
    else if (score < 50) weaknesses.push(topic);
  });

  const quizScores = assessments.map((assessment) => ({
    id: assessment._id,
    date: assessment.date,
    score: assessment.total_score
  }));

  const totalScore = quizScores.reduce((total, quiz) => total + quiz.score, 0);

  return {
    totalScore,
    strengths,
    weaknesses,
    quizCount: assessments.length,
    quizScores
  };
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [processed, setProcessed] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function init() {
      try {
        const dashboardRes = await apiFetch('/dashboard');
        if (!dashboardRes.ok) {
          navigate('/login?redirectPath=%2Fdashboard');
          return;
        }
        const userData = await dashboardRes.json();
        if (cancelled) return;
        setUser(userData);

        const scoresRes = await apiFetch(`/vocabscores?email=${encodeURIComponent(userData.email)}`);
        if (!scoresRes.ok) throw new Error('Network response was not ok');
        const vocabScoresData = await scoresRes.json();
        if (cancelled) return;

        if (vocabScoresData?.assessments?.length) {
          setProcessed(processUserData(vocabScoresData));
        }
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    init();
    return () => {
      cancelled = true;
    };
  }, [navigate]);

  return (
    <section className="container mt-5">
      <div className="row">
        <div className="col-lg-12 mx-auto" data-aos="fade-up">
          <div className="card shadow-sm mb-4 bg-light">
            <div className="card-header bg-primary text-white">
              <h2 className="mb-0">Student Dashboard</h2>
            </div>
            <div className="card-body">
              <div className="card-custom mb-4">
                <h3>User Information</h3>
                <p><strong>Username:</strong> <span id="userName">{user?.name}</span></p>
                <p><strong>Email:</strong> <span id="userEmail">{user?.email}</span></p>
              </div>

              {loading ? (
                <p>Loading dashboard data&hellip;</p>
              ) : (
                <div className="card-container">
                  <div className="card-custom">
                    <h3>Vocabulary</h3>
                    <p><strong>Total Points Earned:</strong> <span id="total-score">{processed?.totalScore ?? 'N/A'}</span></p>
                    <p><strong>Number of Quizzes Taken:</strong> <span id="quiz-count">{processed?.quizCount ?? 'N/A'}</span></p>
                    <div id="quiz-scores">
                      <h4>Individual Scores</h4>
                      <ul id="quiz-scores-list">
                        {processed?.quizScores.map((quiz) => (
                          <li key={quiz.id}>
                            Date: {new Date(quiz.date).toLocaleDateString()}, Score: {quiz.score}{' '}
                            <button
                              className="btn btn-custom-small"
                              onClick={() => navigate(`/vocab-analytics?quizId=${encodeURIComponent(quiz.date)}`)}
                            >
                              View Analytics
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div id="strengths-container">
                      <h4>Strengths</h4>
                      <ul id="strengths-list">
                        {processed?.strengths.map((topic) => <li key={topic}>{topic}</li>)}
                      </ul>
                    </div>
                    <div id="weaknesses-container">
                      <h4>Weaknesses</h4>
                      <ul id="weaknesses-list">
                        {processed?.weaknesses.map((topic) => <li key={topic}>{topic}</li>)}
                      </ul>
                    </div>
                  </div>
                  <div className="card-custom">
                    <h3>Mathematics</h3>
                    <p><strong>Total Score:</strong> <span id="math-total-score">N/A</span></p>
                  </div>
                  <div className="card-custom">
                    <h3>Reading Comprehension</h3>
                    <p><strong>Total Score:</strong> <span id="reading-total-score">N/A</span></p>
                  </div>
                  <div className="card-custom">
                    <h3>Computer Science</h3>
                    <p><strong>Total Score:</strong> <span id="cs-total-score">N/A</span></p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

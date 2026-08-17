import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Chart } from 'chart.js/auto';
import { apiFetch } from '../../api/client';
import NotificationBar from '../../components/admin/NotificationBar';
import './AdminDashboard.css';

function latestMathAttempt(doc) {
  if (!doc.attempts?.length) return null;
  return doc.attempts[doc.attempts.length - 1];
}

function latestVocabAssessment(doc) {
  if (!doc.assessments?.length) return null;
  return doc.assessments[doc.assessments.length - 1];
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [subject, setSubject] = useState('maths');
  const [scores, setScores] = useState({ math: [], english: [] });
  const [performance, setPerformance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const gradeCanvasRef = useRef(null);
  const gradeChartRef = useRef(null);
  const passFailCanvasRef = useRef(null);
  const passFailChartRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    async function init() {
      try {
        const [scoresRes, performanceRes] = await Promise.all([
          apiFetch('/admin/scores'),
          apiFetch('/admin/exam-performance')
        ]);
        if (!scoresRes.ok || !performanceRes.ok) throw new Error('Failed to load admin data');
        const scoresData = await scoresRes.json();
        const performanceData = await performanceRes.json();
        if (cancelled) return;
        setScores(scoresData);
        setPerformance(performanceData);
      } catch (err) {
        console.error('Error loading admin dashboard:', err);
        if (!cancelled) setError('Failed to load admin dashboard data.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    init();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!performance) return;

    passFailChartRef.current?.destroy();
    const stats = subject === 'maths' ? performance.math : performance.english;
    const passCount = Math.round((stats.passRate / 100) * stats.count);
    const failCount = stats.count - passCount;

    passFailChartRef.current = new Chart(passFailCanvasRef.current.getContext('2d'), {
      type: 'doughnut',
      data: {
        labels: ['Pass (≥50%)', 'Fail (<50%)'],
        datasets: [{
          data: [passCount, failCount],
          backgroundColor: ['rgba(75, 192, 128, 0.6)', 'rgba(255, 99, 132, 0.6)']
        }]
      },
      options: { responsive: true, maintainAspectRatio: false }
    });

    gradeChartRef.current?.destroy();
    if (subject === 'maths' && performance.math.byGrade) {
      const grades = Object.keys(performance.math.byGrade).sort();
      gradeChartRef.current = new Chart(gradeCanvasRef.current.getContext('2d'), {
        type: 'bar',
        data: {
          labels: grades,
          datasets: [{
            label: 'Average Accuracy % by Grade',
            data: grades.map((g) => performance.math.byGrade[g].averageAccuracy),
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }]
        },
        options: { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true, max: 100 } } }
      });
    }

    return () => {
      passFailChartRef.current?.destroy();
      gradeChartRef.current?.destroy();
    };
  }, [performance, subject]);

  const stats = performance ? (subject === 'maths' ? performance.math : performance.english) : null;
  const scoreRows = subject === 'maths' ? scores.math : scores.english;

  return (
    <section className="container mt-5 admin-dashboard">
      <h2 className="mb-4">Admin Dashboard</h2>

      <NotificationBar />

      {loading && <p>Loading admin data&hellip;</p>}
      {error && <p className="text-danger">{error}</p>}

      {!loading && !error && (
        <>
          <ul className="nav nav-pills mb-4">
            <li className="nav-item">
              <button
                type="button"
                className={`nav-link ${subject === 'maths' ? 'active' : ''}`}
                onClick={() => setSubject('maths')}
              >
                Maths
              </button>
            </li>
            <li className="nav-item">
              <button
                type="button"
                className={`nav-link ${subject === 'english' ? 'active' : ''}`}
                onClick={() => setSubject('english')}
              >
                English
              </button>
            </li>
          </ul>

          <div className="card shadow-sm mb-4">
            <div className="card-header bg-primary text-white">
              <h3 className="mb-0">Exam Performance — {subject === 'maths' ? 'Maths' : 'English'}</h3>
            </div>
            <div className="card-body">
              {stats && (
                <div className="stat-card-row mb-4">
                  <div className="stat-card">
                    <div className="stat-value">{stats.count}</div>
                    <div className="stat-label">{subject === 'maths' ? 'Total Attempts' : 'Total Assessments'}</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-value">{stats.averageAccuracy}%</div>
                    <div className="stat-label">Average Accuracy</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-value">{stats.averageScore}</div>
                    <div className="stat-label">Average Score</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-value">{stats.passRate}%</div>
                    <div className="stat-label">Pass Rate</div>
                  </div>
                </div>
              )}
              <div className="chart-row">
                <div className="chart-container">
                  <canvas ref={passFailCanvasRef}></canvas>
                </div>
                {subject === 'maths' && (
                  <div className="chart-container">
                    <canvas ref={gradeCanvasRef}></canvas>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="card shadow-sm mb-4">
            <div className="card-header bg-primary text-white">
              <h3 className="mb-0">User Scores — {subject === 'maths' ? 'Maths' : 'English'}</h3>
            </div>
            <div className="card-body table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Email</th>
                    <th>{subject === 'maths' ? 'Attempts' : 'Assessments'}</th>
                    <th>Latest Score</th>
                    <th>Latest Date</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {scoreRows.map((doc) => {
                    const latest = subject === 'maths' ? latestMathAttempt(doc) : latestVocabAssessment(doc);
                    return (
                      <tr
                        key={doc._id}
                        className="admin-user-row"
                        onClick={() => navigate(`/admin/user-detail?subject=${subject}&email=${encodeURIComponent(doc.email)}`)}
                      >
                        <td>{doc.username}</td>
                        <td>{doc.email}</td>
                        <td>{subject === 'maths' ? doc.attempts.length : doc.assessments.length}</td>
                        <td>{latest ? latest.total_score : 'N/A'}</td>
                        <td>{latest ? new Date(latest.date).toLocaleDateString() : 'N/A'}</td>
                        <td><span className="btn btn-sm btn-outline-primary">View Details</span></td>
                      </tr>
                    );
                  })}
                  {scoreRows.length === 0 && (
                    <tr>
                      <td colSpan={6} className="text-center">No data yet.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </section>
  );
}

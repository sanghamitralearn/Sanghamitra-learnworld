import { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Chart } from 'chart.js/auto';
import { apiFetch } from '../../api/client';
import './AdminUserDetail.css';

export default function AdminUserDetail() {
  const [searchParams] = useSearchParams();
  const subject = searchParams.get('subject') === 'english' ? 'english' : 'maths';
  const email = searchParams.get('email') || '';

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const trendCanvasRef = useRef(null);
  const trendChartRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const path = subject === 'maths' ? '/admin/scores/math' : '/admin/scores/english';
        const response = await apiFetch(`${path}/${encodeURIComponent(email)}`);
        if (response.status === 404) {
          if (!cancelled) setData(null);
          return;
        }
        if (!response.ok) throw new Error('Failed to load user detail');
        const json = await response.json();
        if (!cancelled) setData(json);
      } catch (err) {
        console.error('Error loading user detail:', err);
        if (!cancelled) setError('Failed to load this user\'s results.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    if (email) load();
    return () => {
      cancelled = true;
    };
  }, [subject, email]);

  const entries = subject === 'maths' ? data?.attempts : data?.assessments;

  useEffect(() => {
    trendChartRef.current?.destroy();
    if (!entries?.length) return;

    trendChartRef.current = new Chart(trendCanvasRef.current.getContext('2d'), {
      type: 'line',
      data: {
        labels: entries.map((e) => new Date(e.date).toLocaleDateString()),
        datasets: [{
          label: 'Total Score',
          data: entries.map((e) => e.total_score),
          borderColor: 'rgba(54, 162, 235, 1)',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          tension: 0.2
        }]
      },
      options: { responsive: true, maintainAspectRatio: false }
    });

    return () => {
      trendChartRef.current?.destroy();
    };
  }, [entries]);

  const latestAssessment = subject === 'english' && entries?.length ? entries[entries.length - 1] : null;

  return (
    <section className="container mt-5 admin-user-detail">
      <Link to="/admin" className="btn btn-sm btn-outline-secondary mb-3">&larr; Back to Admin Dashboard</Link>

      <div className="card shadow-sm mb-4">
        <div className="card-header bg-primary text-white">
          <h3 className="mb-0">
            {subject === 'maths' ? 'Maths' : 'English'} Results — {data?.username || email}
          </h3>
          <small>{email}</small>
        </div>
        <div className="card-body">
          {loading && <p>Loading&hellip;</p>}
          {error && <p className="text-danger">{error}</p>}

          {!loading && !error && !entries?.length && (
            <p>No {subject === 'maths' ? 'attempts' : 'assessments'} recorded for this user yet.</p>
          )}

          {!loading && !error && entries?.length > 0 && (
            <>
              <div className="chart-container mb-4">
                <canvas ref={trendCanvasRef}></canvas>
              </div>

              <div className="table-responsive mb-4">
                {subject === 'maths' ? (
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Grade</th>
                        <th>Chapter</th>
                        <th>Level</th>
                        <th>Warmup</th>
                        <th>Diagnostic</th>
                        <th>Recheck</th>
                        <th>Total Score</th>
                      </tr>
                    </thead>
                    <tbody>
                      {entries.map((a, idx) => (
                        <tr key={idx}>
                          <td>{new Date(a.date).toLocaleDateString()}</td>
                          <td>{a.grade}</td>
                          <td>{a.chapter_name}</td>
                          <td>{a.level}</td>
                          <td>{a.warmup_correct}/{a.warmup_total}</td>
                          <td>{a.diagnostic_correct}/{a.diagnostic_total}</td>
                          <td>{a.recheck_correct}/{a.recheck_total}</td>
                          <td>{a.total_score}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Correct</th>
                        <th>Total Questions</th>
                        <th>Total Score</th>
                      </tr>
                    </thead>
                    <tbody>
                      {entries.map((a, idx) => (
                        <tr key={idx}>
                          <td>{new Date(a.date).toLocaleDateString()}</td>
                          <td>{a.questions.filter((q) => q.is_correct).length}</td>
                          <td>{a.questions.length}</td>
                          <td>{a.total_score}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>

              {latestAssessment && (
                <>
                  <h4>Latest Assessment — Question Breakdown</h4>
                  <div className="table-responsive">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th>Question</th>
                          <th>Topic</th>
                          <th>CEFR Level</th>
                          <th>Difficulty</th>
                          <th>Response</th>
                          <th>Correct Answer</th>
                          <th>Points</th>
                        </tr>
                      </thead>
                      <tbody>
                        {latestAssessment.questions.map((q, idx) => (
                          <tr key={q.question_id || idx}>
                            <td>{q.question_text}</td>
                            <td>{q.topic}</td>
                            <td>{q.CEFR_level}</td>
                            <td>{q.difficulty_level}</td>
                            <td>{q.user_response}</td>
                            <td>{q.correct_option}</td>
                            <td>{q.points_awarded}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}

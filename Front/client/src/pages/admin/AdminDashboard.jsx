import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiFetch } from '../../api/client';
import RecentActivityBell from '../../components/admin/RecentActivityBell';
import './AdminDashboard.css';

function latestMathAttempt(doc) {
  if (!doc.attempts?.length) return null;
  return doc.attempts[doc.attempts.length - 1];
}

function latestVocabAssessment(doc) {
  if (!doc.assessments?.length) return null;
  return doc.assessments[doc.assessments.length - 1];
}

function vocabAssessmentPercent(assessment) {
  const total = assessment.questions.length;
  if (total === 0) return null;
  const correct = assessment.questions.filter((q) => q.is_correct).length;
  return Math.round((correct / total) * 100);
}

function pctClass(pct) {
  if (pct === null) return 'score-pill-muted';
  if (pct >= 70) return 'score-pill-high';
  if (pct >= 40) return 'score-pill-mid';
  return 'score-pill-low';
}

function ScorePill({ fraction, pct }) {
  return (
    <span className={`score-pill ${pctClass(pct)}`}>
      {fraction}{pct !== null && <span className="score-pill-pct"> ({pct}%)</span>}
    </span>
  );
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [subject, setSubject] = useState('maths');
  const [scores, setScores] = useState({ math: [], english: [] });
  const [performance, setPerformance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function loadDashboard() {
    setLoading(true);
    try {
      const [scoresRes, performanceRes] = await Promise.all([
        apiFetch('/admin/scores'),
        apiFetch('/admin/exam-performance')
      ]);
      if (!scoresRes.ok || !performanceRes.ok) throw new Error('Failed to load admin data');
      const scoresData = await scoresRes.json();
      const performanceData = await performanceRes.json();
      setScores(scoresData);
      setPerformance(performanceData);
      setError(null);
    } catch (err) {
      console.error('Error loading admin dashboard:', err);
      setError('Failed to load admin dashboard data.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDashboard();
  }, []);

  const stats = performance ? (subject === 'maths' ? performance.math : performance.english) : null;
  const scoreRows = subject === 'maths' ? scores.math : scores.english;
  const totalSubmissions = scoreRows.reduce(
    (sum, doc) => sum + (subject === 'maths' ? doc.attempts.length : doc.assessments.length),
    0
  );

  return (
    <section className="admin-dashboard">
      <div className="admin-header-bar">
        <div className="container admin-header-inner">
          <div className="admin-header-title">
            <i className="bi bi-shield-lock-fill"></i>
            <div>
              <h2 className="mb-0">Admin Dashboard</h2>
              <span className="admin-header-subtitle">Monitor student progress across subjects</span>
            </div>
          </div>
          <RecentActivityBell />
        </div>
      </div>

      <div className="container mt-4">
        {loading && <p>Loading admin data&hellip;</p>}
        {error && <p className="text-danger">{error}</p>}

        {!loading && !error && (
          <>
            <div className="subject-switch mb-4">
              <button
                type="button"
                className={`subject-switch-btn ${subject === 'maths' ? 'active' : ''}`}
                onClick={() => setSubject('maths')}
              >
                <i className="bi bi-calculator"></i> Maths
              </button>
              <button
                type="button"
                className={`subject-switch-btn ${subject === 'english' ? 'active' : ''}`}
                onClick={() => setSubject('english')}
              >
                <i className="bi bi-journal-text"></i> English
              </button>
            </div>

            {stats && (
              <div className="icon-stat-row mb-4">
                <div className="icon-stat-card">
                  <div className="icon-stat-icon icon-stat-icon-blue">
                    <i className="bi bi-people-fill"></i>
                  </div>
                  <div>
                    <div className="icon-stat-value">{scoreRows.length}</div>
                    <div className="icon-stat-label">Total Students</div>
                  </div>
                </div>
                <div className="icon-stat-card">
                  <div className="icon-stat-icon icon-stat-icon-green">
                    <i className="bi bi-bar-chart-fill"></i>
                  </div>
                  <div>
                    <div className="icon-stat-value">{stats.averageAccuracy}%</div>
                    <div className="icon-stat-label">Average Score</div>
                  </div>
                </div>
                <div className="icon-stat-card">
                  <div className="icon-stat-icon icon-stat-icon-teal">
                    <i className="bi bi-check2-circle"></i>
                  </div>
                  <div>
                    <div className="icon-stat-value">{stats.passRate}%</div>
                    <div className="icon-stat-label">Pass Rate</div>
                  </div>
                </div>
                <div className="icon-stat-card">
                  <div className="icon-stat-icon icon-stat-icon-purple">
                    <i className="bi bi-journal-check"></i>
                  </div>
                  <div>
                    <div className="icon-stat-value">{totalSubmissions}</div>
                    <div className="icon-stat-label">Total Submissions</div>
                  </div>
                </div>
              </div>
            )}

            <div className="card shadow-sm mb-4 exam-activity-card">
              <div className="card-header d-flex justify-content-between align-items-center flex-wrap gap-2">
                <div>
                  <h3 className="mb-0">Recent Exam Activity</h3>
                  <small className="text-muted">{subject === 'maths' ? 'Maths' : 'English'} — every student&apos;s latest attempt</small>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <span className="badge rounded-pill activity-count-badge">{scoreRows.length} students</span>
                  <button type="button" className="btn btn-sm refresh-btn" onClick={loadDashboard}>
                    <i className="bi bi-arrow-clockwise me-1"></i>Refresh
                  </button>
                </div>
              </div>
              <div className="card-body table-responsive">
                <table className="table exam-activity-table align-middle">
                  <thead>
                    <tr>
                      <th>Student</th>
                      {subject === 'maths' ? (
                        <>
                          <th>Warmup</th>
                          <th>Diagnostic</th>
                          <th>Recheck</th>
                        </>
                      ) : (
                        <th>Score</th>
                      )}
                      <th>Total Score</th>
                      <th>Last Active</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scoreRows.map((doc) => {
                      const latest = subject === 'maths' ? latestMathAttempt(doc) : latestVocabAssessment(doc);
                      return (
                        <tr key={doc._id}>
                          <td>
                            <div className="student-cell-name">{doc.username}</div>
                            <div className="student-cell-email">{doc.email}</div>
                          </td>
                          {subject === 'maths' ? (
                            <>
                              <td>
                                {latest ? (
                                  <ScorePill
                                    fraction={`${latest.warmup_correct}/${latest.warmup_total}`}
                                    pct={latest.warmup_total ? Math.round((latest.warmup_correct / latest.warmup_total) * 100) : null}
                                  />
                                ) : '—'}
                              </td>
                              <td>
                                {latest ? (
                                  <ScorePill
                                    fraction={`${latest.diagnostic_correct}/${latest.diagnostic_total}`}
                                    pct={latest.diagnostic_total ? Math.round((latest.diagnostic_correct / latest.diagnostic_total) * 100) : null}
                                  />
                                ) : '—'}
                              </td>
                              <td>
                                {latest ? (
                                  <ScorePill
                                    fraction={`${latest.recheck_correct}/${latest.recheck_total}`}
                                    pct={latest.recheck_total ? Math.round((latest.recheck_correct / latest.recheck_total) * 100) : null}
                                  />
                                ) : '—'}
                              </td>
                            </>
                          ) : (
                            <td>
                              {latest ? (
                                <ScorePill
                                  fraction={`${latest.questions.filter((q) => q.is_correct).length}/${latest.questions.length}`}
                                  pct={vocabAssessmentPercent(latest)}
                                />
                              ) : '—'}
                            </td>
                          )}
                          <td>{latest ? latest.total_score : '—'}</td>
                          <td>{latest ? new Date(latest.date).toLocaleDateString() : '—'}</td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-sm view-detail-btn"
                              onClick={() => navigate(`/admin/user-detail?subject=${subject}&email=${encodeURIComponent(doc.email)}`)}
                            >
                              View &rarr;
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                    {scoreRows.length === 0 && (
                      <tr>
                        <td colSpan={subject === 'maths' ? 7 : 5} className="empty-state-cell">
                          <i className="bi bi-inbox"></i>
                          <span>No {subject === 'maths' ? 'attempts' : 'assessments'} recorded yet.</span>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </>
        )}
      </div>
    </section>
  );
}

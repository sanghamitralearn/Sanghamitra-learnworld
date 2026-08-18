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
  const [expandedIndex, setExpandedIndex] = useState(null);

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

  useEffect(() => {
    setExpandedIndex(null);
  }, [subject, email]);

  const entries = subject === 'maths' ? data?.attempts : data?.assessments;

  function toggleExpand(idx) {
    setExpandedIndex((prev) => (prev === idx ? null : idx));
  }

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

  return (
    <section className="admin-user-detail">
      <div className="admin-header-bar">
        <div className="admin-header-title">
          <i className="bi bi-person-lines-fill"></i>
          <div>
            <h2 className="mb-0">{data?.username || email}</h2>
            <span className="admin-header-subtitle">{subject === 'maths' ? 'Maths' : 'English'} results &middot; {email}</span>
          </div>
        </div>
        <Link to="/admin" className="btn btn-sm btn-light">&larr; Back to Dashboard</Link>
      </div>

      <div className="container mt-4">
        <div className="card shadow-sm mb-4">
          <div className="card-body">
            {loading && <p>Loading&hellip;</p>}
            {error && <p className="text-danger">{error}</p>}

            {!loading && !error && !entries?.length && (
              <p>No {subject === 'maths' ? 'attempts' : 'assessments'} recorded for this user yet.</p>
            )}

            {!loading && !error && entries?.length > 0 && (
              <>
                <h4 className="section-title">Score Trend</h4>
                <div className="chart-container mb-4">
                  <canvas ref={trendCanvasRef}></canvas>
                </div>

                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h4 className="section-title mb-0">Attempt History</h4>
                  <span className="text-muted small">Click a row to review its questions</span>
                </div>

                <div className="table-responsive mb-2">
                  {subject === 'maths' ? (
                    <table className="table table-striped admin-attempts-table">
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
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {entries.flatMap((a, idx) => {
                          const rows = [
                            <tr key={`row-${idx}`} className="clickable-row" onClick={() => toggleExpand(idx)}>
                              <td>{new Date(a.date).toLocaleDateString()}</td>
                              <td>{a.grade}</td>
                              <td>{a.chapter_name}</td>
                              <td>{a.level}</td>
                              <td>{a.warmup_correct}/{a.warmup_total}</td>
                              <td>{a.diagnostic_correct}/{a.diagnostic_total}</td>
                              <td>{a.recheck_correct}/{a.recheck_total}</td>
                              <td>{a.total_score}</td>
                              <td className="expand-toggle-cell">
                                <i className={`bi ${expandedIndex === idx ? 'bi-chevron-up' : 'bi-chevron-down'}`}></i>
                              </td>
                            </tr>
                          ];
                          if (expandedIndex === idx) {
                            rows.push(
                              <tr key={`detail-${idx}`}>
                                <td colSpan={9}>
                                  <MathAnswerBreakdown answers={a.answers} />
                                </td>
                              </tr>
                            );
                          }
                          return rows;
                        })}
                      </tbody>
                    </table>
                  ) : (
                    <table className="table table-striped admin-attempts-table">
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Correct</th>
                          <th>Total Questions</th>
                          <th>Total Score</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {entries.flatMap((a, idx) => {
                          const rows = [
                            <tr key={`row-${idx}`} className="clickable-row" onClick={() => toggleExpand(idx)}>
                              <td>{new Date(a.date).toLocaleDateString()}</td>
                              <td>{a.questions.filter((q) => q.is_correct).length}</td>
                              <td>{a.questions.length}</td>
                              <td>{a.total_score}</td>
                              <td className="expand-toggle-cell">
                                <i className={`bi ${expandedIndex === idx ? 'bi-chevron-up' : 'bi-chevron-down'}`}></i>
                              </td>
                            </tr>
                          ];
                          if (expandedIndex === idx) {
                            rows.push(
                              <tr key={`detail-${idx}`}>
                                <td colSpan={5}>
                                  <VocabQuestionBreakdown questions={a.questions} />
                                </td>
                              </tr>
                            );
                          }
                          return rows;
                        })}
                      </tbody>
                    </table>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function MathAnswerBreakdown({ answers }) {
  if (!answers?.length) return <p className="text-muted mb-0">No question-level data recorded for this attempt.</p>;

  return (
    <table className="table table-sm table-bordered mb-0 breakdown-table">
      <thead>
        <tr>
          <th>Phase</th>
          <th>Cluster</th>
          <th>Question</th>
          <th>Your Answer</th>
          <th>Correct Answer</th>
          <th>Result</th>
          <th>Points</th>
        </tr>
      </thead>
      <tbody>
        {answers.map((ans, idx) => (
          <tr key={`${ans.item_id}-${idx}`}>
            <td>{ans.phase}</td>
            <td>{ans.cluster}</td>
            <td>{ans.question_text || ans.item_id}</td>
            <td>{ans.skipped ? 'Skipped' : (ans.chosen_text ?? `Option ${ans.chosen_index + 1}`)}</td>
            <td>{ans.correct_text ?? '—'}</td>
            <td>
              <span className={`result-pill ${ans.is_correct ? 'result-pill-correct' : 'result-pill-incorrect'}`}>
                <i className={`bi ${ans.is_correct ? 'bi-check-circle-fill' : 'bi-x-circle-fill'}`}></i>
                {ans.is_correct ? 'Correct' : 'Incorrect'}
              </span>
            </td>
            <td>{ans.points_awarded}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function VocabQuestionBreakdown({ questions }) {
  if (!questions?.length) return <p className="text-muted mb-0">No question-level data recorded for this assessment.</p>;

  return (
    <table className="table table-sm table-bordered mb-0 breakdown-table">
      <thead>
        <tr>
          <th>Question</th>
          <th>Topic</th>
          <th>CEFR Level</th>
          <th>Difficulty</th>
          <th>Response</th>
          <th>Correct Answer</th>
          <th>Result</th>
          <th>Points</th>
        </tr>
      </thead>
      <tbody>
        {questions.map((q, idx) => (
          <tr key={q.question_id || idx}>
            <td>{q.question_text}</td>
            <td>{q.topic}</td>
            <td>{q.CEFR_level}</td>
            <td>{q.difficulty_level}</td>
            <td>{q.user_response}</td>
            <td>{q.correct_option}</td>
            <td>
              <span className={`result-pill ${q.is_correct ? 'result-pill-correct' : 'result-pill-incorrect'}`}>
                <i className={`bi ${q.is_correct ? 'bi-check-circle-fill' : 'bi-x-circle-fill'}`}></i>
                {q.is_correct ? 'Correct' : 'Incorrect'}
              </span>
            </td>
            <td>{q.points_awarded}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

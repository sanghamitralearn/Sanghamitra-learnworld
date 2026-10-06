import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { apiFetch } from '../../api/client';
import TrendChart from '../../components/admin/TrendChart';
import {
  entriesFor, findCourse, formatDate, fullTests, isExamCourse, loadSections, moduleAttempts, percentOf, scoreTone
} from './adminCourses';
import { ScoreText } from './AdminCourseDashboard';
import './admin.css';

const SECTION_COLORS = ['#15803d', '#1e40af', '#ea580c', '#0891b2', '#be185d'];

export default function AdminUserDetail() {
  const [searchParams] = useSearchParams();
  const requested = searchParams.get('course') || searchParams.get('subject');
  const key = findCourse(requested) ? requested : 'maths';
  const course = findCourse(key);
  const exam = isExamCourse(key);
  const email = searchParams.get('email') || '';

  const [data, setData] = useState(null);
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [review, setReview] = useState(null);
  const reviewRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      setReview(null);
      try {
        const path = key === 'maths' ? '/admin/scores/math' : '/admin/scores/exams';
        const response = await apiFetch(`${path}/${encodeURIComponent(email)}`);
        if (response.status === 404) {
          if (!cancelled) setData(null);
          return;
        }
        if (!response.ok) throw new Error('Failed to load user detail');
        const json = await response.json();
        const nextSections = exam ? await loadSections(key, entriesFor(key, json)) : [];
        if (!cancelled) {
          setData(json);
          setSections(nextSections);
        }
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
  }, [key, exam, email]);

  useEffect(() => {
    if (review) reviewRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [review]);

  const entries = useMemo(() => (data ? entriesFor(key, data) : []), [data, key]);
  const fulls = useMemo(() => (exam ? fullTests(entries) : entries), [entries, exam]);
  const latestFull = fulls[fulls.length - 1] || null;
  const headline = latestFull || entries[entries.length - 1] || null;
  const headlinePct = headline ? percentOf(headline.correct, headline.total) ?? 0 : 0;

  return (
    <section className="adm-page">
      <div className="container-fluid adm-wrap">
        <div className="adm-head-actions mb-3">
          <Link to="/admin" className="adm-btn adm-btn-dark">&larr; Admin Home</Link>
          <Link to={`/admin/course/${key}`} className="adm-btn adm-btn-light">&larr; Back to List</Link>
        </div>

        {loading && <p>Loading&hellip;</p>}
        {error && <p className="text-danger">{error}</p>}
        {!loading && !error && !entries.length && (
          <div className="adm-panel adm-panel-pad">No {course.label} attempts recorded for {email} yet.</div>
        )}

        {!loading && !error && entries.length > 0 && (
          <>
            <div className="adm-panel adm-panel-pad adm-panel-accent">
              <div className="adm-detail-title">
                Student Details: <span>{data.username}</span>
              </div>
              <div className="adm-detail-grid">
                <div>
                  <div className="adm-detail-label">Student Information</div>
                  <p>Email: <strong>{data.email}</strong></p>
                  <p>Name: <strong>{data.username}</strong></p>
                </div>
                <div>
                  <div className="adm-detail-label">Performance Summary</div>
                  <p>Total Submissions: <strong>{entries.length}</strong></p>
                  <p>
                    {exam ? 'Latest Full Test' : 'Latest Score'}:{' '}
                    {headline && (exam ? latestFull : true) ? (
                      <>
                        <span className={`adm-score tone-${scoreTone(headlinePct)}`}>{headline.correct}</span>
                        {' '}/ {headline.total} ({headlinePct}%)
                      </>
                    ) : '—'}
                  </p>
                </div>
              </div>
            </div>

            <div className="adm-banner">
              <div>
                <h2>{exam && latestFull ? 'Combined Score' : 'Latest Score'}</h2>
                <p className="adm-banner-sub">{bannerSubtitle(key, course, headline, latestFull, sections)}</p>
                <p className="adm-banner-note">{entries.length} total attempts{exam ? ' across all sections' : ''}</p>
              </div>
              <div className="adm-ring-wrap">
                <div className="adm-ring">
                  <strong>{headline.correct}</strong>
                  <span>{headline.total}</span>
                </div>
                <div className="adm-ring-pct">{headlinePct}%</div>
              </div>
            </div>

            {exam ? (
              <ExamSections
                course={course}
                entries={entries}
                fulls={fulls}
                latestFull={latestFull}
                sections={sections}
                onReview={setReview}
              />
            ) : (
              <MathSections entries={entries} onReview={setReview} />
            )}

            {review && (
              <div className="adm-panel mt-4" ref={reviewRef}>
                <div className="adm-panel-head">
                  <span>
                    Question Review &middot; {reviewTitle(key, review)}
                    <small className="adm-muted-cell ms-2">{new Date(review.date).toLocaleString()}</small>
                  </span>
                  <button type="button" className="adm-btn adm-btn-light adm-btn-sm" onClick={() => setReview(null)}>
                    Close &times;
                  </button>
                </div>
                <div className="adm-panel-pad table-responsive">
                  {exam ? <ExamAnswerBreakdown attempt={review} /> : <MathAnswerBreakdown answers={review.answers} />}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

function bannerSubtitle(key, course, headline, latestFull, sections) {
  if (key === 'maths') return `${headline.chapter_name} · Grade ${headline.grade} · Level ${headline.level}`;
  if (latestFull) return `${sections.map((s) => s.name).join(' + ')} · Full ${course.label} Test`;
  return `${headline.exam_label || headline.exam} · ${headline.section_name || 'Module'} practice`;
}

function reviewTitle(key, attempt) {
  if (key === 'maths') return `${attempt.chapter_name} — Level ${attempt.level}`;
  return `${attempt.exam_label || attempt.exam} — ${attempt.scope === 'full' ? 'Full test' : attempt.section_name}`;
}

function sectionResult(attempt, code) {
  return (attempt.section_results || []).find((s) => s.section === code) || null;
}

function ScoreHeader({ correct, total }) {
  const pct = percentOf(correct, total) ?? 0;
  return (
    <div className="adm-score-header">
      <div>
        <span className={`adm-score-big tone-${scoreTone(pct)}`}>{correct}</span>
        <span className="adm-score-of"> / {total}</span>
      </div>
      <span className={`adm-pct-badge tone-${scoreTone(pct)}`}>{pct}%</span>
    </div>
  );
}

function ExamSections({ course, entries, fulls, latestFull, sections, onReview }) {
  const practice = useMemo(() => sections
    .map((s) => ({ ...s, attempts: moduleAttempts(entries, s.code) }))
    .filter((s) => s.attempts.length > 0), [entries, sections]);
  const latestPractice = practice.map((s) => s.attempts[s.attempts.length - 1]);
  const practiceCorrect = latestPractice.reduce((sum, a) => sum + a.correct, 0);
  const practiceTotal = latestPractice.reduce((sum, a) => sum + a.total, 0);

  // Practice history: every module attempt in date order, numbered within its section.
  const history = useMemo(() => {
    const counters = {};
    return entries
      .filter((a) => a.scope === 'module')
      .map((a) => ({ attempt: a, number: (counters[a.section] = (counters[a.section] || 0) + 1) }));
  }, [entries]);

  const fullChart = useMemo(() => ({
    labels: fulls.map((_, i) => `S${i + 1}`),
    datasets: [{ label: 'Score', data: fulls.map((a) => a.percent), color: '#7c3aed' }]
  }), [fulls]);

  const practiceChart = useMemo(() => {
    const length = Math.max(0, ...practice.map((s) => s.attempts.length));
    return {
      labels: Array.from({ length }, (_, i) => `#${i + 1}`),
      datasets: practice.map((s, i) => ({
        label: s.name,
        data: s.attempts.map((a) => a.percent),
        color: SECTION_COLORS[i % SECTION_COLORS.length]
      }))
    };
  }, [practice]);

  return (
    <>
      <div className="adm-two-col">
        <div className="adm-panel adm-panel-pad">
          <div className="adm-card-head">
            <h3>Full {course.label} Test</h3>
            {latestFull && <ScoreHeader correct={latestFull.correct} total={latestFull.total} />}
          </div>
          {latestFull ? (
            <>
              {sections.map((s, i) => {
                const r = sectionResult(latestFull, s.code);
                return (
                  <div key={s.code} className="adm-section-row">
                    <span className="adm-section-name" style={{ color: SECTION_COLORS[i % SECTION_COLORS.length] }}>{s.name}</span>
                    {r ? <ScoreText correct={r.correct} total={r.total} /> : <ScoreText />}
                  </div>
                );
              })}
              <button type="button" className="adm-btn adm-btn-purple adm-btn-block" onClick={() => onReview(latestFull)}>
                View Full Analysis &rarr;
              </button>
              <div className="adm-card-foot">{fulls.length} attempts &middot; {formatDate(latestFull.date)}</div>
            </>
          ) : (
            <p className="adm-muted-cell mb-0">No full-length test taken yet.</p>
          )}
        </div>

        <div className="adm-panel adm-panel-pad">
          <div className="adm-card-head">
            <h3>Module Practice</h3>
            {practiceTotal > 0 && <ScoreHeader correct={practiceCorrect} total={practiceTotal} />}
          </div>
          {practice.length ? practice.map((s, i) => {
            const latest = s.attempts[s.attempts.length - 1];
            const wrong = latest.total - latest.correct - latest.unattempted;
            return (
              <div key={s.code} className="adm-section-row">
                <div>
                  <span className="adm-section-name" style={{ color: SECTION_COLORS[i % SECTION_COLORS.length] }}>{s.name}</span>
                  <span className="adm-att-chip">{s.attempts.length} att</span>
                  <div className="adm-section-meta">
                    <span className="tone-high">{latest.correct}✓</span>{' '}
                    <span className="tone-low">{wrong}✗</span>{' '}
                    <span>{latest.unattempted}—</span> &middot; acc {latest.percent}%
                  </div>
                </div>
                <div className="adm-section-right">
                  <ScoreText correct={latest.correct} total={latest.total} />
                  <button type="button" className="adm-btn adm-btn-blue adm-btn-xs" onClick={() => onReview(latest)}>
                    Analyze
                  </button>
                </div>
              </div>
            );
          }) : <p className="adm-muted-cell mb-0">No module practice yet.</p>}
        </div>
      </div>

      {fulls.length > 0 && (
        <>
          <h4 className="adm-insight-title">Full {course.label} Test — Insights</h4>
          <div className="adm-two-col">
            <div className="adm-panel">
              <div className="adm-panel-head adm-panel-head-sm">
                <span>Session History <small className="adm-muted-cell">({fulls.length} sessions)</small></span>
              </div>
              <div className="table-responsive adm-scroll">
                <table className="adm-table adm-table-compact">
                  <thead>
                    <tr>
                      <th>#</th>
                      {sections.map((s) => <th key={s.code}>{s.name}</th>)}
                      <th>Total</th>
                      <th>Date</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...fulls].reverse().map((a, idx) => (
                      <tr key={a._id || idx}>
                        <td>#{fulls.length - idx}</td>
                        {sections.map((s) => {
                          const r = sectionResult(a, s.code);
                          return <td key={s.code}>{r ? <ScoreText correct={r.correct} total={r.total} /> : <ScoreText />}</td>;
                        })}
                        <td><ScoreText correct={a.correct} total={a.total} /></td>
                        <td className="adm-muted-cell">{formatDate(a.date)}</td>
                        <td>
                          <button type="button" className="adm-icon-btn" onClick={() => onReview(a)} aria-label="Review questions">
                            <i className="bi bi-bar-chart-fill"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="adm-panel">
              <div className="adm-panel-head adm-panel-head-sm"><span>Score Trend (%)</span></div>
              <div className="adm-panel-pad">
                <TrendChart labels={fullChart.labels} datasets={fullChart.datasets} />
              </div>
            </div>
          </div>
        </>
      )}

      {history.length > 0 && (
        <>
          <h4 className="adm-insight-title adm-insight-title-dark">Module Practice — Insights</h4>
          <div className="adm-two-col">
            <div className="adm-panel">
              <div className="adm-panel-head adm-panel-head-sm"><span>Practice History</span></div>
              <div className="table-responsive adm-scroll">
                <table className="adm-table adm-table-compact">
                  <thead>
                    <tr>
                      <th>Section</th>
                      <th>#</th>
                      <th>Score</th>
                      <th>✓</th>
                      <th>✗</th>
                      <th>Acc</th>
                      <th>Date</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.map(({ attempt: a, number }, idx) => (
                      <tr key={a._id || idx}>
                        <td className="adm-student-name">{a.section_name || a.section}</td>
                        <td>#{number}</td>
                        <td><ScoreText correct={a.correct} total={a.total} /></td>
                        <td className="tone-high">{a.correct}</td>
                        <td className="tone-low">{a.total - a.correct - a.unattempted}</td>
                        <td className={`tone-${scoreTone(a.percent)}`}>{a.percent}%</td>
                        <td className="adm-muted-cell">{formatDate(a.date)}</td>
                        <td>
                          <button type="button" className="adm-icon-btn" onClick={() => onReview(a)} aria-label="Review questions">
                            <i className="bi bi-bar-chart-fill"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="adm-panel">
              <div className="adm-panel-head adm-panel-head-sm"><span>Subject Score Trend (%)</span></div>
              <div className="adm-panel-pad">
                <TrendChart labels={practiceChart.labels} datasets={practiceChart.datasets} />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

function MathSections({ entries, onReview }) {
  const latest = entries[entries.length - 1];
  const best = entries.reduce((b, a) => (a.percent > b.percent ? a : b), entries[0]);
  const avg = Math.round(entries.reduce((sum, a) => sum + a.percent, 0) / entries.length);
  const first = entries[0];

  const chart = useMemo(() => ({
    labels: entries.map((_, i) => `A${i + 1}`),
    datasets: [{ label: 'Score', data: entries.map((a) => a.percent), color: '#7c3aed' }]
  }), [entries]);

  return (
    <>
      <div className="adm-two-col">
        <div className="adm-panel adm-panel-pad">
          <div className="adm-card-head">
            <h3>Latest Attempt</h3>
            <ScoreHeader correct={latest.correct} total={latest.total} />
          </div>
          <div className="adm-section-row"><span className="adm-section-name">Warmup</span><ScoreText correct={latest.warmup_correct} total={latest.warmup_total} /></div>
          <div className="adm-section-row"><span className="adm-section-name">Diagnostic</span><ScoreText correct={latest.diagnostic_correct} total={latest.diagnostic_total} /></div>
          <div className="adm-section-row">
            <span className="adm-section-name">Recheck</span>
            {latest.recheck_total === 0 && percentOf(latest.diagnostic_correct, latest.diagnostic_total) >= 90
              ? <span className="adm-score tone-high">Not needed (≥90%)</span>
              : <ScoreText correct={latest.recheck_correct} total={latest.recheck_total} />}
          </div>
          <div className="adm-section-row"><span className="adm-section-name">Points</span><strong>{latest.total_score}</strong></div>
          <button type="button" className="adm-btn adm-btn-purple adm-btn-block" onClick={() => onReview(latest)}>
            View Full Analysis &rarr;
          </button>
          <div className="adm-card-foot">{formatDate(latest.date)}</div>
        </div>

        <div className="adm-panel adm-panel-pad">
          <div className="adm-card-head"><h3>Progress</h3></div>
          <div className="adm-section-row"><span className="adm-section-name">Attempts</span><strong>{entries.length}</strong></div>
          <div className="adm-section-row"><span className="adm-section-name">Best score</span><span className={`adm-score tone-${scoreTone(best.percent)}`}>{best.percent}%</span></div>
          <div className="adm-section-row"><span className="adm-section-name">Average score</span><span className={`adm-score tone-${scoreTone(avg)}`}>{avg}%</span></div>
          <div className="adm-section-row">
            <span className="adm-section-name">First &rarr; Latest</span>
            <span>
              <span className={`adm-score tone-${scoreTone(first.percent)}`}>{first.percent}%</span>
              {' '}&rarr;{' '}
              <span className={`adm-score tone-${scoreTone(latest.percent)}`}>{latest.percent}%</span>
            </span>
          </div>
        </div>
      </div>

      <h4 className="adm-insight-title">Attempts — Insights</h4>
      <div className="adm-two-col">
        <div className="adm-panel">
          <div className="adm-panel-head adm-panel-head-sm">
            <span>Attempt History <small className="adm-muted-cell">({entries.length} attempts)</small></span>
          </div>
          <div className="table-responsive adm-scroll">
            <table className="adm-table adm-table-compact">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Chapter</th>
                  <th>Level</th>
                  <th>Warmup</th>
                  <th>Diagnostic</th>
                  <th>Recheck</th>
                  <th>Points</th>
                  <th>Date</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {[...entries].reverse().map((a, idx) => (
                  <tr key={a._id || idx}>
                    <td>#{entries.length - idx}</td>
                    <td>{a.chapter_name}</td>
                    <td>{a.level}</td>
                    <td><ScoreText correct={a.warmup_correct} total={a.warmup_total} /></td>
                    <td><ScoreText correct={a.diagnostic_correct} total={a.diagnostic_total} /></td>
                    <td><ScoreText correct={a.recheck_correct} total={a.recheck_total} /></td>
                    <td>{a.total_score}</td>
                    <td className="adm-muted-cell">{formatDate(a.date)}</td>
                    <td>
                      <button type="button" className="adm-icon-btn" onClick={() => onReview(a)} aria-label="Review questions">
                        <i className="bi bi-bar-chart-fill"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="adm-panel">
          <div className="adm-panel-head adm-panel-head-sm"><span>Score Trend (%)</span></div>
          <div className="adm-panel-pad">
            <TrendChart labels={chart.labels} datasets={chart.datasets} />
          </div>
        </div>
      </div>
    </>
  );
}

function formatDuration(seconds) {
  const s = Math.max(0, Math.round(seconds || 0));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  return h ? `${h}h ${m}m` : `${m}m ${s % 60}s`;
}

function ExamAnswerBreakdown({ attempt }) {
  const answers = attempt.answers || [];
  if (!answers.length) return <p className="text-muted mb-0">No question-level data recorded for this attempt.</p>;

  return (
    <>
      <p className="mb-2 small">
        <strong>Mode:</strong> <span className="text-capitalize">{attempt.mode}</span>
        {' · '}<strong>Time:</strong> {formatDuration(attempt.time_spent)}
        {' · '}<strong>Unanswered:</strong> {attempt.unattempted}
        {attempt.section_results?.length > 1 && (
          <>
            {' · '}<strong>By section:</strong>{' '}
            {attempt.section_results.map((s) => `${s.section}: ${s.correct}/${s.total} (${s.percent}%)`).join(' · ')}
          </>
        )}
      </p>
      <table className="table table-sm table-bordered mb-0 adm-breakdown">
        <thead>
          <tr>
            <th>Section</th>
            <th>Q</th>
            <th>Question</th>
            <th>Student&apos;s Answer</th>
            <th>Correct Answer</th>
            <th>Result</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {answers.map((ans, idx) => (
            <tr key={`${ans.item_id}-${idx}`}>
              <td>{ans.section}</td>
              <td>{ans.question_number ?? '—'}</td>
              <td>{ans.question_text || ans.item_id}</td>
              <td>{ans.skipped ? 'Not answered' : (ans.response_text || ans.response || '—')}</td>
              <td>{ans.correct_text || '—'}</td>
              <td>
                <span className={`result-pill ${ans.is_correct ? 'result-pill-correct' : 'result-pill-incorrect'}`}>
                  <i className={`bi ${ans.is_correct ? 'bi-check-circle-fill' : 'bi-x-circle-fill'}`}></i>
                  {ans.is_correct ? 'Correct' : ans.skipped ? 'Skipped' : 'Incorrect'}
                </span>
              </td>
              <td>{ans.time_elapsed ? `${ans.time_elapsed}s` : '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

function MathAnswerBreakdown({ answers }) {
  if (!answers?.length) return <p className="text-muted mb-0">No question-level data recorded for this attempt.</p>;

  const reached = answers.filter((a) => !a.not_attempted);
  const correct = answers.filter((a) => a.is_correct).length;
  const wrong = reached.filter((a) => !a.is_correct && !a.skipped).length;

  return (
    <>
    <p className="mb-2 small">
      <strong>Answered:</strong> {reached.length - reached.filter((a) => a.skipped).length} of {answers.length}
      {' · '}<span className="tone-high"><strong>Correct:</strong> {correct}</span>
      {' · '}<span className="tone-low"><strong>Wrong:</strong> {wrong}</span>
      {' · '}<strong>Not attempted / skipped:</strong> {answers.length - correct - wrong}
    </p>
    <table className="table table-sm table-bordered mb-0 adm-breakdown">
      <thead>
        <tr>
          <th>Phase</th>
          <th>Cluster</th>
          <th>Question</th>
          <th>Your Answer</th>
          <th>Correct Answer</th>
          <th>Result</th>
          <th>Why they got it wrong</th>
          <th>Points</th>
        </tr>
      </thead>
      <tbody>
        {answers.map((ans, idx) => (
          <tr key={`${ans.item_id}-${idx}`}>
            <td>{ans.phase}</td>
            <td>{ans.cluster}</td>
            <td>{ans.question_text || ans.item_id}</td>
            <td>{ans.not_attempted ? 'Not attempted' : ans.skipped ? 'Skipped' : (ans.chosen_text ?? '—')}</td>
            <td>{ans.correct_text ?? '—'}</td>
            <td>
              {ans.skipped ? (
                <span className="result-pill result-pill-muted">
                  <i className="bi bi-dash-circle"></i>
                  {ans.not_attempted ? 'Not attempted' : 'Skipped'}
                </span>
              ) : (
                <span className={`result-pill ${ans.is_correct ? 'result-pill-correct' : 'result-pill-incorrect'}`}>
                  <i className={`bi ${ans.is_correct ? 'bi-check-circle-fill' : 'bi-x-circle-fill'}`}></i>
                  {ans.is_correct ? 'Correct' : 'Incorrect'}
                </span>
              )}
            </td>
            <td className="mistake-detail-cell">
              {!ans.is_correct && ans.mistake_tag && (
                <span className="mistake-tag-pill">{ans.mistake_tag}</span>
              )}
              {!ans.is_correct && ans.mistake_description && (
                <div className="mistake-description"><strong>What:</strong> {ans.mistake_description}</div>
              )}
              {!ans.is_correct && ans.mistake_why && (
                <div className="mistake-why"><strong>Why:</strong> {ans.mistake_why}</div>
              )}
              {!ans.is_correct && ans.mistake_fix && (
                <div className="mistake-fix"><strong>Fix:</strong> {ans.mistake_fix}</div>
              )}
              {(ans.is_correct || (!ans.mistake_tag && !ans.mistake_description && !ans.mistake_why && !ans.mistake_fix)) && '—'}
            </td>
            <td>{ans.points_awarded}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </>
  );
}

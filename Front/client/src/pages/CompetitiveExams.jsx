import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { apiFetch } from '../api/client';
import './CompetitiveExams.css';

// Competitive Exams, in two levels:
//   /competitive-exams          — "Competitive Exam Courses" grid (SAT, GRE, GMAT, …)
//   /competitive-exams/:course  — that course's "Full Tests" page. Every practice paper is one
//                                 full-length test; each card shows the paper's size, the learner's
//                                 last score and attempt count, and Start / Reattempt / View Analysis.
// A course's `id` matches the `family` field of its rows in /exams/catalog.

export const COURSES = [
  { id: 'sat', label: 'SAT', icon: 'bi-pencil-fill' },
  { id: 'gre', label: 'GRE', icon: 'bi-mortarboard-fill' },
  { id: 'gmat', label: 'GMAT', icon: 'bi-briefcase-fill' },
  { id: 'act', label: 'ACT', icon: 'bi-journal-text' },
  { id: 'cat', label: 'CAT', icon: 'bi-journal-check' },
  { id: 'jee-main', label: 'JEE Main', icon: 'bi-mortarboard-fill' },
  { id: 'jee-advanced', label: 'JEE Advanced', icon: 'bi-trophy-fill' },
  { id: 'gate-da', label: 'GATE DA', icon: 'bi-cpu-fill' },
];

function formatDuration(totalSeconds) {
  const mins = Math.round((totalSeconds || 0) / 60);
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return h ? `${h}h ${m}m` : `${m}m`;
}

function formatDate(value) {
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? '' : d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

// Red for weak, amber for middling, green for strong — same bar as the screenshot design.
function scoreTone(percent) {
  if (percent >= 70) return 'good';
  if (percent >= 40) return 'mid';
  return 'low';
}

// ---------------------------------------------------------------------
// /competitive-exams — course grid
// ---------------------------------------------------------------------

export default function CompetitiveExams() {
  return (
    <div className="ce-page ce-courses-page">
      <main className="ce-shell ce-body">
        {/* Same heading font as the home page's "Popular Courses" (main.css .section-title p). */}
        <div className="section-title ce-page-title">
          <h1 id="ce-courses-title">Competitive Exam Courses</h1>
        </div>
        <section className="ce-courses" aria-labelledby="ce-courses-title">
          {/* The whole card opens the course's tests. */}
          <div className="ce-course-grid">
            {COURSES.map((course) => (
              <Link key={course.id} to={`/competitive-exams/${course.id}`} className="ce-course" aria-label={`Open ${course.label} tests`}>
                <span className="ce-course-icon" aria-hidden="true"><i className={`bi ${course.icon}`}></i></span>
                <h3>{course.label}</h3>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

// ---------------------------------------------------------------------
// /competitive-exams/:course — Full Tests for one course
// ---------------------------------------------------------------------

function TestCard({ test, familyLabel, attempts }) {
  const last = attempts[attempts.length - 1];
  const percent = last && last.total ? Math.round((last.correct / last.total) * 100) : 0;
  const testUrl = `/competitive-exams/${test.exam}/test`;

  return (
    <article className="ce-card">
      <div className="ce-card-main">
        <span className="ce-card-icon" aria-hidden="true"><i className="bi bi-file-earmark-text-fill"></i></span>
        <div className="ce-card-title">
          <h3>{test.examLabel}</h3>
          <span>{familyLabel} Full-Length Paper</span>
        </div>
      </div>

      <div className="ce-card-stats">
        <div className="ce-stat-boxes">
          <div className="ce-stat ce-stat-q">
            <b>{test.questions}</b>
            <span>Questions</span>
          </div>
          <div className="ce-stat ce-stat-m">
            <b>{test.questions}</b>
            <span>Max Marks</span>
          </div>
        </div>

        <div className="ce-bar" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={percent} aria-label="Last score">
          <span className={`ce-bar-fill ${scoreTone(percent)}`} style={{ width: `${percent}%` }} />
        </div>

        {last ? (
          <>
            <span className="ce-pill">{percent}%</span>
            <span className="ce-score-line">Score: {last.correct}/{last.total}</span>
            <span className="ce-score-line">{last.correct}/{last.total} correct</span>
            <span className="ce-score-line">
              Last: {formatDate(last.date)} · <b>{attempts.length} attempt{attempts.length === 1 ? '' : 's'}</b>
            </span>
          </>
        ) : (
          <>
            <span className="ce-pill empty" aria-hidden="true">—</span>
            <span className="ce-score-line">Not attempted yet</span>
          </>
        )}
      </div>

      <div className="ce-card-actions">
        {last ? (
          <>
            <Link to={testUrl} className="ce-btn ce-btn-primary"><i className="bi bi-arrow-clockwise"></i> Reattempt</Link>
            <Link to={`/competitive-exams/${test.exam}/analysis`} className="ce-btn ce-btn-outline"><i className="bi bi-bar-chart-line"></i> View Analysis</Link>
          </>
        ) : (
          <Link to={testUrl} className="ce-btn ce-btn-primary"><i className="bi bi-play-fill"></i> Start Test</Link>
        )}
      </div>
    </article>
  );
}

export function CourseTests() {
  const { course: courseId } = useParams();
  const course = COURSES.find((c) => c.id === courseId) || { id: courseId, label: String(courseId || '').toUpperCase() };

  const [catalog, setCatalog] = useState([]);
  const [status, setStatus] = useState('loading'); // loading | ready | error
  const [attemptsByExam, setAttemptsByExam] = useState({});

  useEffect(() => {
    let cancelled = false;
    apiFetch('/exams/catalog')
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((data) => {
        if (cancelled) return;
        setCatalog(Array.isArray(data) ? data : []);
        setStatus('ready');
      })
      .catch(() => { if (!cancelled) setStatus('error'); });
    return () => { cancelled = true; };
  }, []);

  // Full-length attempts for a signed-in learner, grouped by paper (oldest first).
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const sessionRes = await apiFetch('/session-info');
        if (!sessionRes.ok) return;
        const { email } = await sessionRes.json();
        if (cancelled || !email) return;
        const res = await apiFetch(`/exams/scores?email=${encodeURIComponent(email)}`);
        if (!res.ok) return;
        const { attempts = [] } = await res.json();
        if (cancelled) return;
        const map = {};
        attempts
          .filter((a) => a.scope === 'full')
          .sort((a, b) => new Date(a.date) - new Date(b.date))
          .forEach((a) => { (map[a.exam] ||= []).push(a); });
        setAttemptsByExam(map);
      } catch { /* scores are a nice-to-have; the page works without them */ }
    })();
    return () => { cancelled = true; };
  }, []);

  // One test per paper of this course; catalog rows arrive sorted by paper, section and module.
  const tests = useMemo(() => {
    const list = [];
    catalog
      .filter((row) => (row.family || 'sat') === course.id)
      .forEach((row) => {
        let test = list.find((t) => t.exam === row.exam);
        if (!test) {
          test = { exam: row.exam, examLabel: row.examLabel, order: row.examOrder, questions: 0, seconds: 0, sections: [] };
          list.push(test);
        }
        test.questions += row.questionCount;
        test.seconds += row.timedSeconds;
        if (!test.sections.includes(row.sectionName)) test.sections.push(row.sectionName);
      });
    // Newest paper first, as on the reference design.
    return list.sort((a, b) => b.order - a.order);
  }, [catalog, course.id]);

  const sample = tests[0];

  return (
    <div className="ce-page">
      <div className="ce-crumbbar">
        <div className="ce-shell">
          <ol className="ce-crumbs">
            <li><Link to="/">Home</Link></li>
            <li className="sep" aria-hidden="true">/</li>
            <li><Link to="/competitive-exams">Competitive Exams</Link></li>
            <li className="sep" aria-hidden="true">/</li>
            <li aria-current="page">{course.label}</li>
          </ol>
        </div>
      </div>

      <main className="ce-shell ce-body">
        <h2 className="ce-heading">
          <i className="bi bi-calendar3" aria-hidden="true"></i>
          Full Tests
          {status === 'ready' && <span className="ce-count">{tests.length} paper{tests.length === 1 ? '' : 's'}</span>}
        </h2>

        {status === 'loading' && (
          <div className="ce-list" aria-hidden="true">
            {Array.from({ length: 3 }, (_, i) => <div key={i} className="ce-card ce-skeleton" />)}
          </div>
        )}

        {status === 'error' && (
          <div className="ce-note">
            <i className="bi bi-wifi-off"></i>
            <b>We couldn&apos;t load the tests</b>
            The server didn&apos;t respond. Please refresh the page or try again in a moment.
          </div>
        )}

        {status === 'ready' && tests.length === 0 && (
          <div className="ce-note">
            <i className="bi bi-hourglass-split"></i>
            <b>No {course.label} tests published yet</b>
            New papers are on the way — check back soon.
            <Link to="/competitive-exams" className="ce-btn ce-btn-outline ce-note-back"><i className="bi bi-arrow-left"></i> All courses</Link>
          </div>
        )}

        {status === 'ready' && tests.length > 0 && (
          <>
            <div className="ce-list">
              {tests.map((test) => (
                <TestCard key={test.exam} test={test} familyLabel={course.label} attempts={attemptsByExam[test.exam] || []} />
              ))}
            </div>

            <div className="ce-info">
              <div className="ce-info-card">
                <i className="bi bi-check-circle-fill ce-info-good" aria-hidden="true"></i>
                <b>+1 mark</b>
                <span>for each correct answer</span>
              </div>
              <div className="ce-info-card">
                <i className="bi bi-dash-circle-fill ce-info-neutral" aria-hidden="true"></i>
                <b>0 marks</b>
                <span>for wrong answers — no penalty</span>
              </div>
              <div className="ce-info-card">
                <i className="bi bi-clock-fill ce-info-time" aria-hidden="true"></i>
                <b>{formatDuration(sample.seconds)} total</b>
                <span>{sample.sections.join(' + ')}</span>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

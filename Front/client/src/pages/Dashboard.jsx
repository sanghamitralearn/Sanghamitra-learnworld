import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiFetch } from '../api/client';
import { AttemptHistory } from './attempts/AttemptHistory';
import { buildActivity, buildCourses, nextStep, overallStats, vocabEntries, vocabTopics } from './dashboardStats';
import './Dashboard.css';

const NAV = [
  { to: '/dashboard', label: 'Dashboard', current: true },
  { to: '/math', label: 'Mathematics' },
  { to: '/competitive-exams', label: 'Competitive Exams' },
  { to: '/contact', label: 'Support' }
];

const STATUS_NOTE = { new: 'Not started', completed: 'Completed' };

const formatDate = (value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

const initialsOf = (name = '') => name.trim().split(/\s+/).slice(0, 2).map((word) => word[0]?.toUpperCase()).join('') || '?';

// A learner with no attempts gets a 404 from the score APIs, which just means "nothing yet".
async function loadJson(path, empty) {
  try {
    const response = await apiFetch(path);
    if (response.ok) return { data: await response.json(), failed: false };
    return { data: empty, failed: response.status !== 404 };
  } catch (error) {
    console.error(`Failed to load ${path}:`, error);
    return { data: empty, failed: true };
  }
}

function useDashboardData() {
  const navigate = useNavigate();
  const [state, setState] = useState({ loading: true, user: null, courses: [], vocab: [], partial: false });

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const session = await loadJson('/dashboard', null);
      if (cancelled) return;
      if (!session.data) {
        navigate('/login?redirectPath=%2Fdashboard');
        return;
      }
      const user = session.data;
      setState((s) => ({ ...s, user }));

      const email = encodeURIComponent(user.email);
      const results = await Promise.all([
        loadJson('/math/catalog', []),
        loadJson('/exams/catalog', []),
        loadJson(`/math/scores?email=${email}`, {}),
        loadJson(`/exams/scores?email=${email}`, {}),
        loadJson(`/vocabscores?email=${email}`, {})
      ]);
      if (cancelled) return;

      const [mathCatalog, examCatalog, mathScores, examScores, vocabScores] = results.map((r) => r.data);
      const vocab = vocabEntries(vocabScores.assessments);
      setState({
        loading: false,
        user,
        vocab,
        partial: results.some((r) => r.failed),
        catalogFailed: results[0].failed || results[1].failed,
        courses: buildCourses({
          mathCatalog,
          examCatalog,
          mathAttempts: mathScores.attempts || [],
          examAttempts: examScores.attempts || [],
          vocab
        })
      });
    })();

    return () => {
      cancelled = true;
    };
  }, [navigate]);

  return state;
}

function StatisticCard({ user, stats, loading, countsUnknown }) {
  const hasScore = stats.accuracy !== null;
  const segments = [
    { key: 'correct', label: 'Correct', value: stats.correct },
    { key: 'wrong', label: 'Wrong', value: stats.wrong },
    { key: 'skipped', label: 'Skipped', value: stats.skipped }
  ].filter((s) => s.value > 0);
  const tiles = [
    { label: 'In progress', value: stats.inProgress, icon: 'bi-hourglass-split' },
    { label: 'Not started', value: stats.notStarted, icon: 'bi-collection' },
    { label: 'Completed', value: stats.completed, icon: 'bi-check2-circle' }
  ];

  return (
    <section className="sd-card sd-stat" aria-labelledby="sd-stat-title">
      <h2 id="sd-stat-title" className="sd-card-title">Statistic</h2>

      <div className="sd-profile">
        <div className="sd-avatar" aria-hidden="true">{initialsOf(user?.name)}</div>
        <span className="sd-profile-badge">{stats.attempts} {stats.attempts === 1 ? 'attempt' : 'attempts'}</span>
        <p className="sd-welcome">Welcome, {user?.name || 'learner'}</p>
      </div>

      <div className="sd-accuracy">
        <div className="sd-accuracy-head">
          <strong>{hasScore ? `${stats.accuracy}%` : '—'}</strong>
          <span>Overall<br />accuracy</span>
        </div>
        {hasScore ? (
          <>
            <div className="sd-seg" aria-hidden="true">
              {segments.map((s) => (
                <span key={s.key} className={`sd-seg-part is-${s.key}`} style={{ flexGrow: s.value }} />
              ))}
            </div>
            <ul className="sd-legend">
              {segments.map((s) => (
                <li key={s.key}>
                  <i className={`sd-dot is-${s.key}`} aria-hidden="true"></i>
                  {s.label} <b>{Math.round((s.value / stats.total) * 100)}%</b>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p className="sd-hint">{loading ? 'Loading your progress…' : 'Finish a test to see your accuracy here.'}</p>
        )}
      </div>

      <div className="sd-tiles">
        {tiles.map((tile) => (
          <div key={tile.label} className="sd-tile">
            <span className="sd-tile-icon" aria-hidden="true"><i className={`bi ${tile.icon}`}></i></span>
            <b>{loading || countsUnknown ? '–' : tile.value}</b>
            <span>{tile.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function CourseCard({ course }) {
  const showAccuracy = course.percent === null && course.accuracy !== null;
  const value = showAccuracy ? course.accuracy : course.percent;
  const lastLine = course.lastDate ? `Last: ${formatDate(course.lastDate)}` : STATUS_NOTE[course.status];

  if (course.status === 'soon') {
    return (
      <Link to={course.to} className="sd-course is-soon">
        <div className="sd-course-top">
          <h3>{course.label}</h3>
          <span className="sd-course-icon" aria-hidden="true"><i className={`bi ${course.icon}`}></i></span>
        </div>
        <div className="sd-tags"><span className="sd-tag">Coming soon</span></div>
        <p className="sd-soon-note">New tests are on the way.</p>
      </Link>
    );
  }

  return (
    <Link to={course.to} className="sd-course">
      <div className="sd-course-top">
        <h3>{course.label}</h3>
        <span className="sd-course-icon" aria-hidden="true"><i className={`bi ${course.icon}`}></i></span>
      </div>
      <div className="sd-tags">
        {course.tags.map((tag) => <span key={tag} className="sd-tag">{tag}</span>)}
      </div>

      <div className="sd-course-progress">
        <span><b>{value ?? 0}%</b> {showAccuracy ? 'accuracy' : 'completed'}</span>
        <div className="sd-track" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={value ?? 0} aria-label={`${course.label} ${showAccuracy ? 'accuracy' : 'completed'}`}>
          <span style={{ width: `${value ?? 0}%` }} />
        </div>
      </div>

      <div className="sd-course-foot">
        <span>
          <small>{course.unit ? `${course.done}/${course.total} ${course.unit}` : 'Quiz results'}</small>
          {lastLine}
        </span>
        {course.accuracy !== null && !showAccuracy && <span className="sd-score">{course.accuracy}% score</span>}
      </div>
    </Link>
  );
}

function CoursesPanel({ courses, loading, failed }) {
  const scroller = useRef(null);
  const [showAll, setShowAll] = useState(false);
  const [edges, setEdges] = useState({ start: true, end: true });

  const updateEdges = useCallback(() => {
    const el = scroller.current;
    if (!el) return;
    setEdges({ start: el.scrollLeft <= 1, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 1 });
  }, []);

  useEffect(() => {
    updateEdges();
    window.addEventListener('resize', updateEdges);
    return () => window.removeEventListener('resize', updateEdges);
  }, [updateEdges, courses, showAll, loading]);

  const slide = (direction) => {
    const el = scroller.current;
    el.scrollBy({ left: direction * (el.firstElementChild.offsetWidth + 14), behavior: 'smooth' });
  };

  return (
    <section className="sd-courses" aria-labelledby="sd-courses-title">
      <div className="sd-courses-head">
        <h2 id="sd-courses-title">Your courses</h2>
        {!failed && <div className="sd-courses-actions">
          {!showAll && (
            <div className="sd-arrows">
              <button type="button" aria-label="Previous courses" disabled={edges.start} onClick={() => slide(-1)}><i className="bi bi-chevron-left"></i></button>
              <button type="button" aria-label="Next courses" disabled={edges.end} onClick={() => slide(1)}><i className="bi bi-chevron-right"></i></button>
            </div>
          )}
          <button type="button" className="sd-pill-btn" aria-expanded={showAll} onClick={() => setShowAll((v) => !v)}>
            {showAll ? 'Show less' : 'View all'}
          </button>
        </div>}
      </div>

      {failed ? (
        <p className="sd-courses-error">
          <i className="bi bi-wifi-off" aria-hidden="true"></i> We couldn&apos;t load the course list. Please refresh the page.
        </p>
      ) : (
        <div ref={scroller} className={`sd-course-list${showAll ? ' is-grid' : ''}`} onScroll={updateEdges}>
          {loading
            ? Array.from({ length: 3 }, (_, i) => <div key={i} className="sd-course sd-skeleton" aria-hidden="true" />)
            : courses.map((course) => <CourseCard key={course.key} course={course} />)}
        </div>
      )}
    </section>
  );
}

function ActivityCard({ courses }) {
  const [range, setRange] = useState('week');
  const buckets = useMemo(() => buildActivity(courses, range), [courses, range]);
  const peak = Math.max(...buckets.map((b) => b.value), 0);
  const total = buckets.reduce((sum, b) => sum + b.value, 0);
  const peakIndex = buckets.findIndex((b) => b.value === peak);

  return (
    <section className="sd-card sd-activity" aria-labelledby="sd-activity-title">
      <div className="sd-activity-head">
        <div>
          <h2 id="sd-activity-title" className="sd-card-title">Study activity</h2>
          <p>{total} {total === 1 ? 'attempt' : 'attempts'} {range === 'week' ? 'in the last 7 days' : 'in the last 4 weeks'}</p>
        </div>
        <select aria-label="Time range" value={range} onChange={(e) => setRange(e.target.value)}>
          <option value="week">Week</option>
          <option value="month">Month</option>
        </select>
      </div>

      <div className="sd-bars" role="list" aria-label="Attempts over time">
        {buckets.map((bucket, i) => {
          const isPeak = peak > 0 && i === peakIndex;
          const note = `${bucket.detail}: ${bucket.value} ${bucket.value === 1 ? 'attempt' : 'attempts'}`;
          return (
            <div key={bucket.key} className="sd-bar" role="listitem" tabIndex={0} aria-label={note}>
              <span className="sd-tip" aria-hidden="true">{note}</span>
              <div className="sd-bar-track">
                {bucket.value > 0 && (
                  <span className={`sd-bar-fill${isPeak ? ' is-peak' : ''}`} style={{ height: `${(bucket.value / peak) * 100}%` }}>
                    {isPeak && <b>{bucket.value}</b>}
                  </span>
                )}
              </div>
              <span className="sd-bar-label">{bucket.label}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function NextUpCard({ step, loading }) {
  return (
    <section className="sd-next" aria-labelledby="sd-next-title">
      <span className="sd-next-chip"><i className="bi bi-signpost-2-fill" aria-hidden="true"></i> Next up</span>
      <div className="sd-next-inner">
        <h2 id="sd-next-title">{loading ? 'Finding your next step…' : step.title}</h2>
        {!loading && (
          <div className="sd-next-row">
            <p>{step.detail}</p>
            <Link to={step.to} className="sd-next-btn">
              {step.cta} <i className="bi bi-arrow-right" aria-hidden="true"></i>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

function VocabTopics({ quizzes }) {
  const latest = quizzes[quizzes.length - 1];
  const { strengths, weaknesses } = vocabTopics(latest);

  return (
    <section className="sd-card sd-vocab" aria-labelledby="sd-vocab-title">
      <h2 id="sd-vocab-title" className="sd-card-title">Vocabulary topics</h2>
      <p className="sd-vocab-note">From your latest quiz on {formatDate(latest.date)}</p>
      <div className="sd-topics">
        <div>
          <h3>Strengths</h3>
          <p>{strengths.join(', ') || 'None yet'}</p>
        </div>
        <div>
          <h3>Needs work</h3>
          <p>{weaknesses.join(', ') || 'None yet'}</p>
        </div>
      </div>
    </section>
  );
}

export default function Dashboard() {
  const { loading, user, courses, vocab, partial, catalogFailed } = useDashboardData();
  const stats = useMemo(() => overallStats(courses), [courses]);
  const step = useMemo(() => nextStep(courses), [courses]);
  const attemptedCourses = useMemo(
    () => courses.filter((c) => c.attempts > 0).map(({ key, label }) => ({ key, label })),
    [courses]
  );

  return (
    <div className="sd-page">
      <div className="container sd-frame">
        <div className="sd-topbar">
          <h1>My Dashboard</h1>
          <nav className="sd-nav" aria-label="Dashboard">
            {NAV.map((item) => (
              <Link key={item.to} to={item.to} className={item.current ? 'is-active' : ''} aria-current={item.current ? 'page' : undefined}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {partial && (
          <p className="sd-alert" role="status">
            <i className="bi bi-exclamation-triangle-fill" aria-hidden="true"></i> Some of your progress couldn&apos;t be loaded, so these numbers may be incomplete. Please refresh to try again.
          </p>
        )}

        <div className="sd-grid">
          <StatisticCard user={user} stats={stats} loading={loading} countsUnknown={catalogFailed} />
          <CoursesPanel courses={courses} loading={loading} failed={catalogFailed} />
          <ActivityCard courses={courses} />
          <NextUpCard step={step} loading={loading} />
        </div>

        <AttemptHistory courses={attemptedCourses} />

        {vocab.length > 0 && <VocabTopics quizzes={vocab} />}
      </div>
    </div>
  );
}

import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiFetch } from '../api/client';
import './Math.css';

// The four bootcamp stages every chapter runs through, in the order a learner should take them.
const LEVEL_META = {
  1: { name: 'Warm-up', hint: 'Untimed', icon: 'bi-cup-hot', text: 'Ease in with guided questions — no clock, no pressure.' },
  2: { name: 'Diagnostic', hint: 'Untimed', icon: 'bi-search', text: 'Find exactly which ideas still need work.' },
  3: { name: 'Recheck', hint: 'Spaced', icon: 'bi-arrow-repeat', text: 'Come back later and lock in what you fixed.' },
  4: { name: 'Speed Run', hint: 'Timed', icon: 'bi-stopwatch', text: 'Beat the clock to build real exam pace.' },
};

const GRADE_STORAGE_KEY = 'mathx.activeGrade';

// Pick a bootstrap-icon that matches the chapter topic, so cards scan visually.
const ICON_RULES = [
  [/angle|geometry|shape|triangle|polygon|circle/i, 'bi-triangle'],
  [/fraction|decimal|percent|ratio|proportion/i, 'bi-pie-chart'],
  [/data|graph|statistic|probability|chart/i, 'bi-bar-chart'],
  [/algebra|equation|expression|formula|inequal/i, 'bi-braces'],
  [/measure|length|mass|volume|capacity|time|unit/i, 'bi-rulers'],
  [/money|profit|interest|currency/i, 'bi-cash-coin'],
  [/factor|multiple|prime|number propert|integer|place value/i, 'bi-123'],
  [/sequence|pattern|series/i, 'bi-diagram-3'],
  [/word problem|reasoning|logic|puzzle/i, 'bi-lightbulb'],
];

function chapterIcon(name = '') {
  const hit = ICON_RULES.find(([re]) => re.test(name));
  return hit ? hit[1] : 'bi-calculator';
}

// Chapter order comes from the slug ("ch-4-fractions" -> 4) so new chapters slot into
// the right place automatically, and "ch-10" sorts after "ch-9" rather than after "ch-1".
function leadingNumber(value = '') {
  const match = String(value).match(/(\d+)/);
  return match ? Number(match[1]) : Number.POSITIVE_INFINITY;
}

const pad = (n) => String(n).padStart(2, '0');

function readStoredGrade() {
  try { return window.localStorage.getItem(GRADE_STORAGE_KEY); } catch { return null; }
}

function storeGrade(gradeKey) {
  try { window.localStorage.setItem(GRADE_STORAGE_KEY, gradeKey); } catch { /* storage unavailable */ }
}

function ChapterCard({ gradeKey, gradeLabel, chapter, showGrade }) {
  const firstLevel = chapter.levels[0];

  return (
    <article className="mx-card">
      <div className="mx-card-top">
        <span className="mx-icon" aria-hidden="true">
          <i className={`bi ${chapterIcon(chapter.chapterName)}`}></i>
        </span>
        <div className="mx-card-title">
          <span className="mx-card-kicker">
            Chapter {pad(chapter.number)}
            {showGrade && <span className="mx-card-grade"> · {gradeLabel}</span>}
          </span>
          <h3>{chapter.chapterName}</h3>
        </div>
      </div>

      <ol className="mx-levels" aria-label={`${chapter.chapterName} levels`}>
        {chapter.levels.map((level) => {
          const meta = LEVEL_META[level] || { name: `Level ${level}`, hint: 'Practice' };
          return (
            <li key={level}>
              <Link
                to={`/math/${gradeKey}/${chapter.slug}/${level}`}
                className={`mx-level${level === 4 ? ' timed' : ''}${level === firstLevel ? ' first' : ''}`}
                aria-label={`${chapter.chapterName} — Level ${level}, ${meta.name} (${meta.hint})`}
              >
                <span className="num">{level}</span>
                <b>{meta.name}</b>
                <small>{meta.hint}</small>
              </Link>
            </li>
          );
        })}
      </ol>

      <Link to={`/math/${gradeKey}/${chapter.slug}/${firstLevel}`} className="mx-card-cta">
        Start chapter <i className="bi bi-arrow-right"></i>
      </Link>
    </article>
  );
}

function HowItWorks() {
  return (
    <section className="mx-how" aria-labelledby="mx-how-title">
      <div className="mx-how-head">
        <span className="mx-how-tag"><i className="bi bi-signpost-2"></i> New here?</span>
        <h2 id="mx-how-title">How every chapter works</h2>
        <p>Pick your grade, open a chapter and move through its four levels in order. Most learners start with Chapter 01 &middot; Level 1.</p>
      </div>
      <ol className="mx-how-steps">
        {Object.entries(LEVEL_META).map(([level, meta]) => (
          <li key={level} className={level === '4' ? 'timed' : ''}>
            <span className="n"><i className={`bi ${meta.icon}`}></i></span>
            <span className="lvl">Level {level} &middot; {meta.hint}</span>
            <b>{meta.name}</b>
            <span className="t">{meta.text}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default function MathPage() {
  const [catalog, setCatalog] = useState([]);
  const [status, setStatus] = useState('loading'); // loading | ready | error
  const [query, setQuery] = useState('');
  const [activeGrade, setActiveGrade] = useState(readStoredGrade);

  useEffect(() => {
    let cancelled = false;
    apiFetch('/math/catalog')
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((data) => {
        if (cancelled) return;
        setCatalog(Array.isArray(data) ? data : []);
        setStatus('ready');
      })
      .catch(() => {
        if (!cancelled) setStatus('error');
      });
    return () => { cancelled = true; };
  }, []);

  // Group rows by grade, then by chapter; sort grades and chapters numerically.
  const grades = useMemo(() => {
    const byGrade = catalog.reduce((acc, row) => {
      if (!acc[row.grade]) acc[row.grade] = { gradeLabel: row.gradeLabel, chapters: {} };
      const chapters = acc[row.grade].chapters;
      if (!chapters[row.chapterSlug]) {
        chapters[row.chapterSlug] = { chapterName: row.chapterName, description: row.description, levels: [] };
      }
      if (!chapters[row.chapterSlug].levels.includes(row.level)) {
        chapters[row.chapterSlug].levels.push(row.level);
      }
      return acc;
    }, {});

    return Object.entries(byGrade)
      .map(([gradeKey, data]) => ({
        gradeKey,
        gradeLabel: data.gradeLabel,
        chapters: Object.entries(data.chapters)
          .map(([slug, chapter]) => ({
            slug,
            ...chapter,
            levels: [...chapter.levels].sort((a, b) => a - b),
            order: leadingNumber(slug),
          }))
          .sort((a, b) => a.order - b.order || a.chapterName.localeCompare(b.chapterName))
          .map((chapter, i) => ({ ...chapter, number: Number.isFinite(chapter.order) ? chapter.order : i + 1 })),
      }))
      .sort((a, b) => leadingNumber(a.gradeKey) - leadingNumber(b.gradeKey));
  }, [catalog]);

  // Fall back to the first grade when nothing (or a grade that no longer exists) is stored.
  const currentGrade = grades.some((g) => g.gradeKey === activeGrade) ? activeGrade : grades[0]?.gradeKey;

  const selectGrade = (gradeKey) => {
    setActiveGrade(gradeKey);
    storeGrade(gradeKey);
  };

  const term = query.trim().toLowerCase();

  // A search looks across every grade; otherwise only the selected grade is shown.
  const visible = useMemo(() => grades
    .filter((g) => term || g.gradeKey === currentGrade)
    .map((g) => ({
      ...g,
      chapters: term
        ? g.chapters.filter((c) => `${c.chapterName} ${c.description || ''}`.toLowerCase().includes(term))
        : g.chapters,
    }))
    .filter((g) => g.chapters.length > 0), [grades, currentGrade, term]);

  const totals = useMemo(() => ({
    grades: grades.length,
    chapters: grades.reduce((n, g) => n + g.chapters.length, 0),
    drills: catalog.length,
  }), [grades, catalog]);

  const matchCount = visible.reduce((n, g) => n + g.chapters.length, 0);

  return (
    <div className="mathx">
      <header className="mx-hero">
        <div className="mx-shell">
          <ol className="mx-crumbs">
            <li><Link to="/">Home</Link></li>
            <li className="sep" aria-hidden="true">/</li>
            <li aria-current="page">Mathematics</li>
          </ol>

          <div className="mx-hero-grid">
            <div>
              <span className="mx-eyebrow">
                <span className="dot" aria-hidden="true"><i className="bi bi-check-lg"></i></span>
                Bootcamp Curriculum
              </span>
              <h1>Master maths, <em>one chapter at a time.</em></h1>
              <p className="mx-hero-lede">
                Choose your grade, then work through the chapters in order. Each chapter has four short levels
                that take you from a relaxed warm-up to a timed speed run.
              </p>
            </div>

            <div className="mx-stats">
              <div className="mx-stat">
                <b>{status === 'ready' ? totals.grades : '—'}</b>
                <span>Grades</span>
              </div>
              <div className="mx-stat">
                <b>{status === 'ready' ? totals.chapters : '—'}</b>
                <span>Chapters</span>
              </div>
              <div className="mx-stat">
                <b>{status === 'ready' ? totals.drills : '—'}</b>
                <span>Levels</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-shell mx-how-wrap">
        <HowItWorks />
      </div>

      <div className="mx-shell mx-toolbar-wrap">
        <div className="mx-toolbar">
          <div className="mx-tabs" role="tablist" aria-label="Choose your grade">
            <span className="mx-tabs-label">Your grade</span>
            {grades.map((g) => (
              <button
                key={g.gradeKey}
                type="button"
                role="tab"
                className="mx-tab"
                aria-selected={!term && g.gradeKey === currentGrade}
                onClick={() => { selectGrade(g.gradeKey); setQuery(''); }}
              >
                {g.gradeLabel}
              </button>
            ))}
          </div>

          <div className="mx-search">
            <i className="bi bi-search" aria-hidden="true"></i>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search all chapters — fractions, angles…"
              aria-label="Search chapters in every grade"
            />
            {query && (
              <button type="button" className="clear" onClick={() => setQuery('')} aria-label="Clear search">
                <i className="bi bi-x-lg"></i>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="mx-shell mx-body">
        {status === 'loading' && (
          <div className="mx-skeleton-grid" aria-hidden="true">
            {Array.from({ length: 6 }, (_, i) => <div key={i} className="mx-skeleton" />)}
          </div>
        )}

        {status === 'error' && (
          <div className="mx-note">
            <i className="bi bi-wifi-off"></i>
            <b>We couldn&apos;t load the maths catalog</b>
            The server didn&apos;t respond. Please refresh the page or try again in a moment.
          </div>
        )}

        {status === 'ready' && grades.length === 0 && (
          <div className="mx-note">
            <i className="bi bi-hourglass-split"></i>
            <b>No chapters published yet</b>
            New bootcamp chapters are on the way — check back soon.
          </div>
        )}

        {status === 'ready' && grades.length > 0 && matchCount === 0 && (
          <div className="mx-note">
            <i className="bi bi-search"></i>
            <b>No chapters match &ldquo;{query}&rdquo;</b>
            Try a different topic, or clear the search to browse your grade.
            <div>
              <button type="button" className="mx-tab" onClick={() => setQuery('')}>
                <i className="bi bi-arrow-counterclockwise"></i> Clear search
              </button>
            </div>
          </div>
        )}

        {status === 'ready' && visible.map((grade) => {
          const first = grade.chapters[0];
          const levelCount = grade.chapters.reduce((n, c) => n + c.levels.length, 0);
          return (
            <section key={grade.gradeKey} className="mx-grade" aria-labelledby={`grade-${grade.gradeKey}`}>
              <div className="mx-grade-head">
                <div>
                  <h2 id={`grade-${grade.gradeKey}`}>{grade.gradeLabel}</h2>
                  <span className="mx-grade-meta">
                    {term
                      ? `${grade.chapters.length} chapter${grade.chapters.length === 1 ? '' : 's'} matching “${query.trim()}”`
                      : `${grade.chapters.length} chapters · ${levelCount} levels · shown in teaching order`}
                  </span>
                </div>
                {!term && first && (
                  <Link to={`/math/${grade.gradeKey}/${first.slug}/${first.levels[0]}`} className="mx-start">
                    <i className="bi bi-play-fill"></i>
                    Start with Chapter {pad(first.number)}
                  </Link>
                )}
              </div>

              <div className="mx-cards">
                {grade.chapters.map((chapter) => (
                  <ChapterCard
                    key={chapter.slug}
                    gradeKey={grade.gradeKey}
                    gradeLabel={grade.gradeLabel}
                    chapter={chapter}
                    showGrade={Boolean(term)}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
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

function chapterStatus(chapter, doneLevels) {
  const total = chapter.levels.length;
  const doneCount = chapter.levels.filter((l) => doneLevels.has(l)).length;
  const complete = total > 0 && doneCount === total;
  let label;
  if (complete) label = <><i className="bi bi-trophy-fill"></i> Chapter complete</>;
  else if (doneCount > 0) label = `${doneCount} of ${total} done · keep going`;
  else label = `${total} short test${total === 1 ? '' : 's'}`;
  return { doneCount, complete, label, nextLevel: chapter.levels.find((l) => !doneLevels.has(l)) };
}

// A chapter card is the chapter title plus a progress bar; clicking it opens the chapter's
// own page, where its levels are listed.
function ChapterCard({ gradeKey, gradeLabel, chapter, showGrade, doneLevels }) {
  const { complete, label } = chapterStatus(chapter, doneLevels);

  return (
    <Link
      to={`/math/${gradeKey}/${chapter.slug}`}
      className={`mx-card mx-card-link${complete ? ' is-complete' : ''}`}
      aria-label={`Chapter ${pad(chapter.number)}: ${chapter.chapterName} — open levels`}
    >
      <span className="mx-card-top">
        <span className="mx-icon" aria-hidden="true">
          <i className={`bi ${chapterIcon(chapter.chapterName)}`}></i>
        </span>
        <span className="mx-card-title">
          <span className="mx-card-kicker">
            Chapter {pad(chapter.number)}
            {showGrade && <span className="mx-card-grade"> · {gradeLabel}</span>}
          </span>
          <h3>{chapter.chapterName}</h3>
          <span className="mx-card-count">{label}</span>
          <span className="mx-progress" aria-hidden="true">
            {chapter.levels.map((l) => (
              <span key={l} className={doneLevels.has(l) ? 'on' : ''} />
            ))}
          </span>
        </span>
        <i className="bi bi-chevron-right mx-card-chevron" aria-hidden="true"></i>
      </span>
    </Link>
  );
}

// One card per level on a chapter's page. Only one level is ever marked "Up next", so the learner
// never has to decide where to start, and finished levels are ticked so progress feels real.
function LevelCard({ gradeKey, chapter, level, state, firstStart }) {
  const meta = LEVEL_META[level] || { name: `Level ${level}`, hint: 'Practice', icon: 'bi-pencil' };
  const timed = meta.hint === 'Timed';
  return (
    <Link
      to={`/math/${gradeKey}/${chapter.slug}/${level}`}
      className={`mx-card mx-level-card is-${state}`}
      aria-label={`${chapter.chapterName} — Level ${level}, ${meta.name} (${meta.hint})${state === 'done' ? ', completed' : ''}${state === 'next' ? ', up next' : ''}`}
    >
      <span className="mx-level-top">
        <span className="mx-step-mark" aria-hidden="true">
          <i className={`bi ${state === 'done' ? 'bi-check-lg' : meta.icon}`}></i>
        </span>
        <span className="mx-test-lvl">Level {level}</span>
        {state === 'next' && <span className="mx-chip next">Up next</span>}
        {state === 'done' && <span className="mx-chip done">Done</span>}
      </span>
      <h3>{meta.name}</h3>
      {meta.text && <span className="mx-test-text">{meta.text}</span>}
      <span className="mx-level-foot">
        <span className={`mx-chip hint${timed ? ' timed' : ''}`}>
          <i className={`bi ${timed ? 'bi-stopwatch' : 'bi-emoji-smile'}`}></i> {meta.hint}
        </span>
        {state === 'next' ? (
          <span className="mx-test-cta">{firstStart ? 'Start' : 'Continue'} <i className="bi bi-arrow-right"></i></span>
        ) : (
          <span className="mx-test-go">
            {state === 'done' ? <><i className="bi bi-arrow-counterclockwise"></i> Redo</> : <>Open <i className="bi bi-chevron-right"></i></>}
          </span>
        )}
      </span>
    </Link>
  );
}

const NO_LEVELS = new Set();

// The maths catalog grouped by grade, then chapter; grades and chapters sorted numerically.
function useMathCatalog() {
  const [catalog, setCatalog] = useState([]);
  const [status, setStatus] = useState('loading'); // loading | ready | error

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

  return { catalog, grades, status };
}

// Finished levels for a signed-in learner, keyed "grade/slug" -> Set(levels). Logged-out
// visitors (or learners with no attempts yet) simply see no ticks.
function useMathProgress() {
  const [progress, setProgress] = useState({});
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const sessionRes = await apiFetch('/session-info');
        if (!sessionRes.ok) return;
        const { email } = await sessionRes.json();
        if (cancelled || !email) return;
        setSignedIn(true);
        const res = await apiFetch(`/math/scores?email=${encodeURIComponent(email)}`);
        if (!res.ok) return;
        const { attempts = [] } = await res.json();
        if (cancelled) return;
        const map = {};
        attempts.forEach((a) => {
          const key = `${a.grade}/${a.chapter_slug}`;
          (map[key] ||= new Set()).add(Number(a.level));
        });
        setProgress(map);
      } catch { /* progress is a nice-to-have; the page works without it */ }
    })();
    return () => { cancelled = true; };
  }, []);

  return { progress, signedIn };
}

// /math/:grade/:chapterSlug — one chapter's levels as cards; a level opens the bootcamp test.
export function MathChapterPage() {
  const { grade: gradeKey, chapterSlug } = useParams();
  const { grades, status } = useMathCatalog();
  const { progress, signedIn } = useMathProgress();

  const grade = grades.find((g) => g.gradeKey === gradeKey);
  const chapter = grade?.chapters.find((c) => c.slug === chapterSlug);
  const doneLevels = progress[`${gradeKey}/${chapterSlug}`] || NO_LEVELS;

  // Coming back to /math should land on this chapter's grade.
  useEffect(() => {
    if (grade) storeGrade(gradeKey);
  }, [grade, gradeKey]);

  const info = chapter ? chapterStatus(chapter, doneLevels) : null;

  return (
    <div className="mathx">
      <header className="mx-hero">
        <div className="mx-shell">
          <ol className="mx-crumbs">
            <li><Link to="/">Home</Link></li>
            <li className="sep" aria-hidden="true">/</li>
            <li><Link to="/math">Mathematics</Link></li>
            {grade && (
              <>
                <li className="sep" aria-hidden="true">/</li>
                <li><Link to="/math">{grade.gradeLabel}</Link></li>
              </>
            )}
            {chapter && (
              <>
                <li className="sep" aria-hidden="true">/</li>
                <li aria-current="page">{chapter.chapterName}</li>
              </>
            )}
          </ol>

          {chapter && (
            <div className="mx-chapter-hero">
              <span className="mx-chapter-hero-icon" aria-hidden="true">
                <i className={`bi ${chapterIcon(chapter.chapterName)}`}></i>
              </span>
              <div>
                <span className="mx-eyebrow">Chapter {pad(chapter.number)} &middot; {grade.gradeLabel}</span>
                <h1>{chapter.chapterName}</h1>
                <p className="mx-hero-lede">
                  {chapter.description || 'Work through the levels in order — from a relaxed warm-up to a timed speed run.'}
                </p>
                <span className="mx-chapter-status">{info.label}</span>
              </div>
            </div>
          )}
        </div>
      </header>

      <div className="mx-shell mx-body">
        <Link to="/math" className="mx-back">
          <i className="bi bi-arrow-left"></i> All chapters
        </Link>

        {status === 'loading' && (
          <div className="mx-skeleton-grid" aria-hidden="true">
            {Array.from({ length: 4 }, (_, i) => <div key={i} className="mx-skeleton" />)}
          </div>
        )}

        {status === 'error' && (
          <div className="mx-note">
            <i className="bi bi-wifi-off"></i>
            <b>We couldn&apos;t load this chapter</b>
            The server didn&apos;t respond. Please refresh the page or try again in a moment.
          </div>
        )}

        {status === 'ready' && !chapter && (
          <div className="mx-note">
            <i className="bi bi-search"></i>
            <b>Chapter not found</b>
            It may have been moved or renamed.
            <div><Link to="/math" className="mx-tab">Browse all chapters</Link></div>
          </div>
        )}

        {status === 'ready' && chapter && (
          <>
            <h2 className="mx-levels-title">Choose a level</h2>
            <div className="mx-cards mx-level-cards">
              {chapter.levels.map((level) => (
                <LevelCard
                  key={level}
                  gradeKey={gradeKey}
                  chapter={chapter}
                  level={level}
                  firstStart={info.doneCount === 0}
                  state={doneLevels.has(level) ? 'done' : level === info.nextLevel ? 'next' : 'later'}
                />
              ))}
            </div>
            {!signedIn && (
              <p className="mx-tests-note">
                <i className="bi bi-lock"></i> A free account saves your progress and ticks off each level you finish.
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function HowItWorks() {
  return (
    <section className="mx-how" aria-labelledby="mx-how-title">
      <div className="mx-how-head">
        <span className="mx-how-tag"><i className="bi bi-signpost-2"></i> New here?</span>
        <h2 id="mx-how-title">How every chapter works</h2>
        <p>Pick your grade, click a chapter card and move through its four levels in order. Most learners start with Chapter 01 &middot; Level 1.</p>
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
  const { catalog, grades, status } = useMathCatalog();
  const { progress } = useMathProgress();
  const [query, setQuery] = useState('');
  const [activeGrade, setActiveGrade] = useState(readStoredGrade);

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
                    doneLevels={progress[`${grade.gradeKey}/${chapter.slug}`] || NO_LEVELS}
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

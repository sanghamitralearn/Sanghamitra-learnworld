import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiFetch } from '../../api/client';
import ClusterHeatmap from '../../components/admin/ClusterHeatmap';
import ClusterBars from '../../components/admin/ClusterBars';
import { courseStudents, formatDate } from './adminCourses';
import {
  BANDS, DEFAULT_THRESHOLD, SEVERITIES, SEVERITY_LABEL, STATUS, bandFor, buildInsights, loadMathCatalog, ragTone
} from './mathGaps';
import { GapRow, SeverityBadge } from './StudentGaps';
import './admin.css';
import './insights.css';

const LAYOUT_KEY = 'adm-math-insights-layout-v1';
const DEFAULT_LAYOUT = {
  topSplit: 62,
  bottomSplit: 50,
  heights: { chart: 420, clusters: 420, chapters: 480, gaps: 480 },
  collapsed: {},
  rowMode: 'clusters',
  gapView: 'chapter',
  threshold: DEFAULT_THRESHOLD,
  heatmap: { zoom: 1, lock: 'free', colOrder: [], rowOrder: { clusters: [], students: [] } }
};

function readLayout() {
  try {
    const saved = JSON.parse(localStorage.getItem(LAYOUT_KEY) || 'null');
    if (!saved) return DEFAULT_LAYOUT;
    return {
      ...DEFAULT_LAYOUT,
      ...saved,
      heights: { ...DEFAULT_LAYOUT.heights, ...saved.heights },
      heatmap: { ...DEFAULT_LAYOUT.heatmap, ...saved.heatmap, rowOrder: { ...DEFAULT_LAYOUT.heatmap.rowOrder, ...saved.heatmap?.rowOrder } }
    };
  } catch {
    return DEFAULT_LAYOUT;
  }
}

// The user's last arrangement (panel sizes, collapsed sections, chart view), kept in this browser.
function useSavedLayout() {
  const [layout, setLayout] = useState(readLayout);
  useEffect(() => {
    try {
      localStorage.setItem(LAYOUT_KEY, JSON.stringify(layout));
    } catch {
      // Storage blocked (private window etc.) — the layout just won't be remembered.
    }
  }, [layout]);
  const update = useCallback((patch) => setLayout((l) => ({ ...l, ...(typeof patch === 'function' ? patch(l) : patch) })), []);
  const reset = useCallback(() => setLayout(DEFAULT_LAYOUT), []);
  return [layout, update, reset];
}

export default function AdminMathInsights() {
  const [students, setStudents] = useState([]);
  const [catalog, setCatalog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [layout, setLayout, resetLayout] = useSavedLayout();
  const [filters, setFilters] = useState({ grade: '', chapter: '', cluster: '', severity: '', name: '' });
  const [openGrades, setOpenGrades] = useState(() => new Set());
  const [openCluster, setOpenCluster] = useState(null);
  const [openChapters, setOpenChapters] = useState(() => new Set());

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [scoresRes, cat] = await Promise.all([apiFetch('/admin/scores?answers=1'), loadMathCatalog()]);
      if (!scoresRes.ok) throw new Error('Failed to load scores');
      setStudents(courseStudents({ math: [], exams: [], ...(await scoresRes.json()) }, 'maths'));
      setCatalog(cat);
      setError(null);
    } catch (err) {
      console.error('Error loading maths insights:', err);
      setError('Failed to load chapter insights.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const { threshold } = layout;
  const insights = useMemo(() => buildInsights(students, catalog, threshold), [students, catalog, threshold]);
  const setFilter = (k) => (e) => setFilters((f) => ({ ...f, [k]: e.target.value }));
  const nameMatch = useCallback((p) => !filters.name || `${p.username} ${p.email}`.toLowerCase().includes(filters.name.toLowerCase()), [filters.name]);

  const setGrade = (grade) => setFilters((f) => ({
    ...f,
    grade,
    chapter: grade && f.chapter && !f.chapter.startsWith(`${grade}|`) ? '' : f.chapter
  }));
  const gradeChapters = insights.chapters.filter((c) => !filters.grade || c.grade === filters.grade);
  const visibleChapters = gradeChapters.filter((c) => !filters.chapter || c.key === filters.chapter);
  const visibleGrades = insights.grades.filter((g) => !filters.grade || g.grade === filters.grade);
  const peopleWithGaps = insights.people.filter((p) => p.gaps.length).length;
  const overall = insights.people.length ? Math.round(insights.people.reduce((s, p) => s + p.percent, 0) / insights.people.length) : 0;

  const toggleCollapsed = (id) => setLayout((l) => ({ collapsed: { ...l.collapsed, [id]: !l.collapsed[id] } }));
  const setHeight = (id) => (h) => setLayout((l) => ({ heights: { ...l.heights, [id]: h } }));
  const panelProps = (id) => ({
    id,
    collapsed: !!layout.collapsed[id],
    onToggle: () => toggleCollapsed(id),
    height: layout.heights[id],
    onHeight: setHeight(id)
  });

  return (
    <section className="adm-page">
      <div className="container-fluid adm-wrap">
        <div className="adm-page-head">
          <div>
            <h1 className="adm-page-title">Chapter &amp; Gap Insights</h1>
            <p className="adm-page-subtitle">Mathematics · how each performance cluster is doing per chapter, and where the gaps are</p>
          </div>
          <div className="adm-head-actions">
            <Link to="/admin/course/maths" className="adm-btn adm-btn-dark">&larr; Maths Dashboard</Link>
            <button type="button" className="adm-btn adm-btn-light" onClick={resetLayout} title="Restore the default panel sizes and chart view">
              <i className="bi bi-layout-wtf"></i> Reset layout
            </button>
            <button type="button" className="adm-btn adm-btn-blue" onClick={load} disabled={loading}>
              <i className="bi bi-arrow-clockwise"></i> Refresh
            </button>
          </div>
        </div>

        {error && <p className="text-danger">{error}</p>}

        <div className="adm-stat-row">
          <Stat icon="bi-people-fill" tone="blue" value={insights.people.length} label="Students" />
          <Stat icon="bi-bar-chart-fill" tone="green" value={`${overall}%`} label="Average chapter score" />
          <Stat icon="bi-journals" tone="purple" value={insights.chapters.length} label="Chapters attempted" />
          <Stat icon="bi-exclamation-triangle-fill" tone="red" value={peopleWithGaps} label={`Students with gaps (< ${threshold}%)`} />
        </div>

        <div className="ins-filters adm-panel">
          <label>
            <span>Grade</span>
            <select value={filters.grade} onChange={(e) => setGrade(e.target.value)}>
              <option value="">All grades</option>
              {insights.grades.map((g) => <option key={g.grade} value={g.grade}>{g.gradeLabel}</option>)}
            </select>
          </label>
          <label>
            <span>Chapter</span>
            <select value={filters.chapter} onChange={setFilter('chapter')}>
              <option value="">All chapters</option>
              {insights.grades.filter((g) => !filters.grade || g.grade === filters.grade).map((g) => (
                <optgroup key={g.grade} label={g.gradeLabel}>
                  {g.chapters.map((c) => <option key={c.key} value={c.key}>{c.chapterName}</option>)}
                </optgroup>
              ))}
            </select>
          </label>
          <label>
            <span>Cluster</span>
            <select value={filters.cluster} onChange={setFilter('cluster')}>
              <option value="">All clusters</option>
              {BANDS.map((b) => <option key={b.id} value={b.id}>{b.label}</option>)}
            </select>
          </label>
          <label>
            <span>Severity</span>
            <select value={filters.severity} onChange={setFilter('severity')}>
              <option value="">All severities</option>
              {SEVERITIES.map((s) => <option key={s} value={s}>{SEVERITY_LABEL[s]}</option>)}
            </select>
          </label>
          <label className="ins-filter-grow">
            <span>Student</span>
            <input type="search" placeholder="Search name or email" value={filters.name} onChange={setFilter('name')} />
          </label>
          <label>
            <span>Gap threshold</span>
            <select value={threshold} onChange={(e) => setLayout({ threshold: Number(e.target.value) })}>
              {[50, 60, 70, 80].map((t) => <option key={t} value={t}>Below {t}%</option>)}
            </select>
          </label>
        </div>

        {loading && !students.length ? <p>Loading&hellip;</p> : (
          <>
            <div className="ins-summary-wrap">
              <Panel
                id="summary"
                collapsed={!!layout.collapsed.summary}
                onToggle={() => toggleCollapsed('summary')}
                title="High-level summary · grade & chapter"
                icon="bi-bar-chart-steps"
                badge={filters.grade ? visibleGrades[0]?.gradeLabel : 'All grades'}
              >
                <HighLevelSummary
                  grades={visibleGrades}
                  chapters={visibleChapters}
                  threshold={threshold}
                  activeGrade={filters.grade}
                  onGrade={(g) => setGrade(filters.grade === g ? '' : g)}
                  onChapter={(key) => {
                    setFilters((f) => ({ ...f, chapter: key }));
                    setOpenChapters((s) => new Set(s).add(key));
                  }}
                />
              </Panel>
            </div>

            <SplitRow
              ratio={layout.topSplit}
              onRatio={(r) => setLayout({ topSplit: r })}
              stack={layout.collapsed.chart || layout.collapsed.clusters}
              label="Resize chart and clusters"
            >
              <Panel {...panelProps('chart')} title="Clusters × Chapters" icon="bi-grid-3x3-gap-fill">
                <InsightsHeatmap
                  insights={insights}
                  chapters={visibleChapters}
                  filters={filters}
                  nameMatch={nameMatch}
                  layout={layout}
                  setLayout={setLayout}
                />
              </Panel>
              <Panel {...panelProps('clusters')} title="Student Clusters" icon="bi-diagram-3-fill">
                <ClusterView
                  clusters={insights.clusters}
                  open={openCluster}
                  onOpen={(id) => setOpenCluster((cur) => (cur === id ? null : id))}
                  highlight={filters.cluster}
                  nameMatch={nameMatch}
                  threshold={threshold}
                />
              </Panel>
            </SplitRow>

            <SplitRow
              ratio={layout.bottomSplit}
              onRatio={(r) => setLayout({ bottomSplit: r })}
              stack={layout.collapsed.chapters || layout.collapsed.gaps}
              label="Resize chapter summary and gaps"
            >
              <Panel {...panelProps('chapters')} title="Chapter Summary" icon="bi-journal-text"
                badge={`${visibleChapters.length} ${visibleChapters.length === 1 ? 'chapter' : 'chapters'}`}>
                <ChapterSummary
                  chapters={visibleChapters}
                  grades={visibleGrades}
                  closedGrades={openGrades}
                  onToggleGrade={(g) => setOpenGrades((s) => {
                    const next = new Set(s);
                    if (next.has(g)) next.delete(g); else next.add(g);
                    return next;
                  })}
                  open={openChapters}
                  onToggle={(key) => setOpenChapters((s) => {
                    const next = new Set(s);
                    if (next.has(key)) next.delete(key); else next.add(key);
                    return next;
                  })}
                  threshold={threshold}
                />
              </Panel>
              <Panel {...panelProps('gaps')} title="Student Gaps" icon="bi-bullseye"
                actions={(
                  <div className="ins-tabs" role="tablist">
                    {[['chapter', 'By chapter'], ['student', 'By student']].map(([id, label]) => (
                      <button key={id} type="button" role="tab" aria-selected={layout.gapView === id}
                        className={layout.gapView === id ? 'is-active' : ''} onClick={() => setLayout({ gapView: id })}>
                        {label}
                      </button>
                    ))}
                  </div>
                )}>
                {layout.gapView === 'chapter'
                  ? <GapsByChapter chapters={visibleChapters} insights={insights} filters={filters} nameMatch={nameMatch} />
                  : <GapsByStudent insights={insights} filters={filters} nameMatch={nameMatch} />}
              </Panel>
            </SplitRow>
          </>
        )}
      </div>
    </section>
  );
}

function Stat({ icon, tone, value, label }) {
  return (
    <div className="adm-stat-card">
      <div className={`adm-stat-icon tone-${tone}`}><i className={`bi ${icon}`}></i></div>
      <div>
        <div className="adm-stat-value">{value}</div>
        <div className="adm-stat-label">{label}</div>
      </div>
    </div>
  );
}

// ---------- Layout pieces ----------

// Two panels side by side with a draggable divider. Stacks on narrow screens, or when one panel is
// collapsed (so the open one gets the full width).
function SplitRow({ ratio, onRatio, stack, label, children }) {
  const rowRef = useRef(null);
  const dragging = useRef(false);
  const clamp = (r) => Math.min(80, Math.max(25, Math.round(r)));

  const onDown = (e) => {
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onMove = (e) => {
    if (!dragging.current) return;
    const box = rowRef.current.getBoundingClientRect();
    onRatio(clamp(((e.clientX - box.left) / box.width) * 100));
  };
  const onKey = (e) => {
    if (e.key === 'ArrowLeft') onRatio(clamp(ratio - 3));
    if (e.key === 'ArrowRight') onRatio(clamp(ratio + 3));
  };

  return (
    <div
      ref={rowRef}
      className={`ins-split ${stack ? 'is-stacked' : ''}`}
      style={{ '--split': `${ratio}%` }}
    >
      {children[0]}
      <div
        className="ins-splitter"
        role="separator"
        aria-orientation="vertical"
        aria-label={label}
        aria-valuenow={ratio}
        aria-valuemin={25}
        aria-valuemax={80}
        tabIndex={0}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={() => { dragging.current = false; }}
        onPointerCancel={() => { dragging.current = false; }}
        onKeyDown={onKey}
        onDoubleClick={() => onRatio(50)}
      >
        <span></span>
      </div>
      {children[1]}
    </div>
  );
}

// Collapsible panel whose body scrolls inside a height the user can drag.
function Panel({ title, icon, badge, actions, collapsed, onToggle, height, onHeight, children }) {
  const drag = useRef(null);
  const onDown = (e) => {
    drag.current = { y: e.clientY, h: height };
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onMove = (e) => {
    if (!drag.current) return;
    onHeight(Math.min(1200, Math.max(200, drag.current.h + e.clientY - drag.current.y)));
  };
  const onKey = (e) => {
    if (e.key === 'ArrowUp') onHeight(Math.max(200, height - 40));
    if (e.key === 'ArrowDown') onHeight(Math.min(1200, height + 40));
  };

  return (
    <div className={`adm-panel ins-panel ${collapsed ? 'is-collapsed' : ''}`}>
      <div className="adm-panel-head adm-panel-head-sm ins-panel-head">
        <button type="button" className="ins-collapse" onClick={onToggle} aria-expanded={!collapsed}>
          <i className={`bi ${collapsed ? 'bi-chevron-right' : 'bi-chevron-down'}`}></i>
          {icon && <i className={`bi ${icon} ins-panel-icon`}></i>}
          <span>{title}</span>
          {badge && <span className="ins-badge">{badge}</span>}
        </button>
        {!collapsed && actions}
      </div>
      {!collapsed && !onHeight && <div className="ins-panel-auto">{children}</div>}
      {!collapsed && onHeight && (
        <>
          <div className="ins-panel-body" style={{ height }}>{children}</div>
          <div
            className="ins-resize"
            role="separator"
            aria-orientation="horizontal"
            aria-label={`Resize ${title}`}
            tabIndex={0}
            onPointerDown={onDown}
            onPointerMove={onMove}
            onPointerUp={() => { drag.current = null; }}
            onPointerCancel={() => { drag.current = null; }}
            onKeyDown={onKey}
          >
            <span></span>
          </div>
        </>
      )}
    </div>
  );
}

// ---------- Chart ----------

function InsightsHeatmap({ insights, chapters, filters, nameMatch, layout, setLayout }) {
  const mode = layout.rowMode;
  const { threshold } = insights;

  const cols = useMemo(() => chapters.map((c) => ({ id: c.key, label: c.chapterName, sub: c.gradeLabel })), [chapters]);

  const rows = useMemo(() => {
    if (mode === 'clusters') {
      return insights.clusters
        .filter((c) => !filters.cluster || c.id === filters.cluster)
        .map((c) => ({ id: c.id, label: c.label, sub: `${c.members.length} students · ${c.percent}%` }));
    }
    return insights.people
      .filter((p) => (!filters.cluster || p.band === filters.cluster) && nameMatch(p))
      .sort((a, b) => b.percent - a.percent)
      .map((p) => ({ id: p.email, label: p.username, sub: `${bandFor(p.percent).label} · ${p.percent}%` }));
  }, [mode, insights, filters.cluster, nameMatch]);

  const cell = useCallback((rowId, colId) => {
    if (mode === 'clusters') {
      const cluster = insights.clusters.find((c) => c.id === rowId);
      const scores = cluster.members.map((p) => p.chapterByKey.get(colId)).filter(Boolean);
      if (!scores.length) return null;
      const pcts = scores.map((s) => s.percent);
      const withGaps = scores.filter((s) => s.topics.some((t) => t.percent < threshold)).length;
      return {
        pct: Math.round(pcts.reduce((a, b) => a + b, 0) / pcts.length),
        lines: [
          `Students: ${scores.length} of ${cluster.members.length} attempted`,
          `Range: ${Math.min(...pcts)}% – ${Math.max(...pcts)}%`,
          `With topic gaps: ${withGaps}`
        ]
      };
    }
    const person = insights.people.find((p) => p.email === rowId);
    const ch = person?.chapterByKey.get(colId);
    if (!ch) return null;
    const gaps = ch.topics.filter((t) => t.percent < threshold);
    return {
      pct: ch.percent,
      lines: [
        `Levels done: ${ch.levelsDone} of ${ch.levelsTotal}`,
        `Attempts: ${ch.attempts}`,
        gaps.length ? `Gaps: ${gaps.slice(0, 3).map((g) => `${g.name} ${g.percent}%`).join(', ')}${gaps.length > 3 ? '…' : ''}` : 'No topic gaps',
        `Last attempt: ${formatDate(ch.lastDate)}`
      ]
    };
  }, [mode, insights, threshold]);

  const hm = layout.heatmap;
  const settings = { zoom: hm.zoom, lock: hm.lock, colOrder: hm.colOrder, rowOrder: hm.rowOrder[mode] || [] };
  const onSettings = useCallback((patch) => setLayout((l) => {
    const { rowOrder, ...rest } = patch;
    return {
      heatmap: {
        ...l.heatmap,
        ...rest,
        rowOrder: rowOrder !== undefined ? { ...l.heatmap.rowOrder, [l.rowMode]: rowOrder } : l.heatmap.rowOrder
      }
    };
  }), [setLayout]);

  return (
    <ClusterHeatmap
      rows={rows}
      cols={cols}
      cell={cell}
      threshold={threshold}
      settings={settings}
      onSettings={onSettings}
      rowHeaderLabel={mode === 'clusters' ? 'Cluster' : 'Student'}
      toolbarExtra={(
        <div className="ins-tabs" role="tablist" aria-label="Rows">
          {[['clusters', 'Clusters'], ['students', 'Students']].map(([id, label]) => (
            <button key={id} type="button" role="tab" aria-selected={mode === id}
              className={mode === id ? 'is-active' : ''} onClick={() => setLayout({ rowMode: id })}>
              {label}
            </button>
          ))}
        </div>
      )}
    />
  );
}

// ---------- Clusters ----------

function ClusterView({ clusters, open, onOpen, highlight, nameMatch, threshold }) {
  const current = clusters.find((c) => c.id === open);
  return (
    <div className="ins-pad">
      <div className="ins-cluster-grid">
        {clusters.map((c) => (
          <button
            key={c.id}
            type="button"
            className={`ins-cluster-card band-${c.tone} ${open === c.id ? 'is-open' : ''} ${highlight && highlight !== c.id ? 'is-dim' : ''}`}
            onClick={() => onOpen(c.id)}
            aria-expanded={open === c.id}
          >
            <div className="ins-cluster-top">
              <span className="ins-cluster-name">{c.label}</span>
              <span className="ins-cluster-range">{c.min === 0 ? `< ${BANDS[BANDS.length - 2].min}%` : `${c.min}%+`}</span>
            </div>
            <div className="ins-cluster-stats">
              <div><strong>{c.members.length}</strong><span>students</span></div>
              <div><strong>{c.members.length ? `${c.percent}%` : '—'}</strong><span>avg score</span></div>
            </div>
            <div className="ins-cluster-weak">
              <span className="ins-mini-label">Top weak topics</span>
              {c.weakTopics.length ? c.weakTopics.map((w) => (
                <div key={`${w.chapterName}-${w.name}`} className="ins-weak-line" title={w.chapterName}>
                  <span>{w.name}</span><em>{w.count}</em>
                </div>
              )) : <div className="ins-weak-line is-none">None below {threshold}%</div>}
            </div>
          </button>
        ))}
      </div>

      {current && (
        <div className="ins-drill">
          <div className="ins-drill-head">
            <strong>{current.label}</strong> &middot; {current.members.length} students
            <button type="button" className="adm-btn adm-btn-light adm-btn-xs" onClick={() => onOpen(current.id)}>Close &times;</button>
          </div>
          {current.members.filter(nameMatch).length ? (
            <table className="adm-table adm-table-compact">
              <thead>
                <tr><th>Student</th><th>Avg</th><th>Chapters</th><th>Gaps</th><th></th></tr>
              </thead>
              <tbody>
                {current.members.filter(nameMatch).map((p) => (
                  <tr key={p.email}>
                    <td>
                      <div className="adm-student-name">{p.username}</div>
                      <div className="adm-student-email">{p.email}</div>
                    </td>
                    <td className={`rag-text-${ragTone(p.percent, threshold)} adm-score`}>{p.percent}%</td>
                    <td>{p.chapters.length}</td>
                    <td>{p.gaps.length ? <span className="rag-text-red adm-score">{p.gaps.length}</span> : <span className="tone-muted">0</span>}</td>
                    <td><StudentLink email={p.email} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : <p className="adm-muted-cell mb-0">No students match the current filters.</p>}
        </div>
      )}
    </div>
  );
}

function StudentLink({ email }) {
  return (
    <Link className="adm-btn adm-btn-blue adm-btn-xs" to={`/admin/user-detail?course=maths&email=${encodeURIComponent(email)}`}>
      View &rarr;
    </Link>
  );
}

// ---------- Chapter summary ----------

// ---------- High-level summary ----------

function HighLevelSummary({ grades, chapters, threshold, activeGrade, onGrade, onChapter }) {
  const groups = grades
    .map((g) => ({
      id: g.grade,
      label: g.gradeLabel,
      sub: `${g.students} students · avg ${g.percent}%`,
      rows: chapters.filter((c) => c.grade === g.grade).map((c) => ({
        id: c.key,
        label: c.chapterName,
        sub: `${c.students} students · ${c.withGaps} with gaps`,
        counts: c.bandCounts,
        total: c.students,
        percent: c.percent,
        status: c.status
      }))
    }))
    .filter((g) => g.rows.length);

  return (
    <div className="ins-pad">
      <div className="ins-grade-cards">
        {grades.map((g) => (
          <button
            key={g.grade}
            type="button"
            className={`ins-grade-card ${activeGrade === g.grade ? 'is-active' : ''}`}
            onClick={() => onGrade(g.grade)}
            aria-pressed={activeGrade === g.grade}
            title={activeGrade === g.grade ? 'Show all grades' : `Show only ${g.gradeLabel}`}
          >
            <div className="ins-grade-top">
              <strong>{g.gradeLabel}</strong>
              <span className={`adm-score rag-text-${ragTone(g.percent, threshold)}`}>{g.percent}%</span>
            </div>
            <div className="ins-grade-meta">
              {g.students} students · {g.chapters.length} {g.chapters.length === 1 ? 'chapter' : 'chapters'} · <span className={g.withGaps ? 'rag-text-red' : ''}>{g.withGaps} with gaps</span>
            </div>
            <div className="cb-bar cb-bar-thin" aria-hidden="true">
              {BANDS.map((b) => (g.bandCounts[b.id] ? <span key={b.id} className={`cb-seg band-${b.tone}`} style={{ flexGrow: g.bandCounts[b.id] }}></span> : null))}
            </div>
            <div className="ins-grade-status">
              {Object.entries(STATUS).map(([id, s]) => (
                <span key={id} className={`ins-status status-${s.tone}`}>{g.statusCounts[id]} {s.label}</span>
              ))}
            </div>
          </button>
        ))}
      </div>

      <h5 className="ins-sub-h">Students per cluster, by chapter <small>click a chapter to see its topics</small></h5>
      <ClusterBars groups={groups} threshold={threshold} onRowClick={onChapter} />
    </div>
  );
}

function ChapterSummary({ chapters, grades, closedGrades, onToggleGrade, open, onToggle, threshold }) {
  if (!chapters.length) return <div className="adm-empty"><i className="bi bi-journal-x"></i>No chapters to show.</div>;
  return (
    <div className="ins-chapters">
      <div className="ins-ch-row ins-ch-headrow" aria-hidden="true">
        <span>Chapter</span><span>Avg score</span><span>Completion</span><span>Clusters</span><span>Gaps</span><span>Status</span>
      </div>
      {grades.map((g) => {
        const list = chapters.filter((c) => c.grade === g.grade);
        if (!list.length) return null;
        const closed = closedGrades.has(g.grade);
        return (
          <div key={g.grade} className="ins-grade-group">
            <button type="button" className="ins-grade-head" onClick={() => onToggleGrade(g.grade)} aria-expanded={!closed}>
              <i className={`bi ${closed ? 'bi-chevron-right' : 'bi-chevron-down'}`}></i>
              <strong>{g.gradeLabel}</strong>
              <span className="adm-muted-cell">{list.length} {list.length === 1 ? 'chapter' : 'chapters'} · {g.students} students · avg {g.percent}%</span>
              <span className="ins-grade-head-status">
                {Object.entries(STATUS).map(([id, s]) => (g.statusCounts[id]
                  ? <span key={id} className={`ins-status status-${s.tone}`}>{g.statusCounts[id]} {s.label}</span> : null))}
              </span>
            </button>
            {!closed && <ChapterRows chapters={list} open={open} onToggle={onToggle} threshold={threshold} />}
          </div>
        );
      })}
    </div>
  );
}

function ChapterRows({ chapters, open, onToggle, threshold }) {
  return (
    <>
      {chapters.map((c) => {
        const isOpen = open.has(c.key);
        const status = STATUS[c.status];
        return (
          <div key={c.key} className={`ins-ch ${isOpen ? 'is-open' : ''}`}>
            <button type="button" className="ins-ch-row" onClick={() => onToggle(c.key)} aria-expanded={isOpen}>
              <span className="ins-ch-name">
                <i className={`bi ${isOpen ? 'bi-chevron-down' : 'bi-chevron-right'}`}></i>
                <span>
                  <strong>{c.chapterName}</strong>
                  <small>{c.gradeLabel} · {c.students} {c.students === 1 ? 'student' : 'students'}</small>
                </span>
              </span>
              <span className="ins-ch-metric" data-label="Avg score">
                <Meter pct={c.percent} threshold={threshold} />
              </span>
              <span className="ins-ch-metric" data-label="Completion">
                <Meter pct={c.completion} neutral />
              </span>
              <span className="ins-ch-metric" data-label="Clusters">
                <span className="ins-band-chips" title="Students by their score in this chapter">
                  {BANDS.map((b) => (
                    <span key={b.id} className={`ins-band-chip band-${b.tone}`} title={`${b.label}: ${c.bandCounts[b.id]}`}>
                      {b.label[0]}<b>{c.bandCounts[b.id]}</b>
                    </span>
                  ))}
                </span>
              </span>
              <span className="ins-ch-metric" data-label="Gaps">
                <span className={c.withGaps ? 'rag-text-red adm-score' : 'tone-muted'}>{c.withGaps}</span>
                <small className="adm-muted-cell"> of {c.students}</small>
              </span>
              <span className="ins-ch-metric" data-label="Status">
                <span className={`ins-status status-${status.tone}`}>{status.label}</span>
              </span>
            </button>
            {isOpen && (
              <div className="ins-ch-detail">
                <table className="adm-table adm-table-compact">
                  <thead>
                    <tr><th>Topic</th><th>Avg</th><th>Students below {threshold}%</th><th>Severity</th></tr>
                  </thead>
                  <tbody>
                    {c.topics.map((t) => (
                      <tr key={t.code}>
                        <td>{t.name}</td>
                        <td className={`rag-text-${ragTone(t.percent, threshold)} adm-score`}>{t.percent}%</td>
                        <td>{t.affected.length} of {t.attempted}</td>
                        <td>{t.severity ? <SeverityBadge severity={t.severity} /> : <span className="tone-muted">—</span>}</td>
                      </tr>
                    ))}
                    {!c.topics.length && <tr><td colSpan={4} className="adm-muted-cell">No topic-level answers recorded.</td></tr>}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}

function Meter({ pct, threshold, neutral }) {
  const tone = neutral ? 'blue' : ragTone(pct, threshold);
  return (
    <span className="ins-meter">
      <span className="ins-meter-track"><span className={`ins-meter-fill fill-${tone}`} style={{ width: `${pct}%` }}></span></span>
      <span className="ins-meter-val">{pct}%</span>
    </span>
  );
}

// ---------- Gaps ----------

function GapsByChapter({ chapters, insights, filters, nameMatch }) {
  const allowed = new Set(insights.people.filter((p) => (!filters.cluster || p.band === filters.cluster) && nameMatch(p)).map((p) => p.email));
  const groups = chapters.map((c) => ({
    ...c,
    gapTopics: c.topics
      .map((t) => ({ ...t, affected: t.affected.filter((a) => allowed.has(a.email)) }))
      .filter((t) => t.affected.length && (!filters.severity || t.severity === filters.severity))
  })).filter((c) => c.gapTopics.length);

  if (!groups.length) return <div className="adm-empty"><i className="bi bi-check2-circle"></i>No gaps match the current filters.</div>;

  return (
    <div className="ins-pad">
      {groups.map((c) => (
        <div key={c.key} className="ins-gap-group">
          <div className="ins-gap-group-head">
            <strong>{c.chapterName}</strong> <small className="adm-muted-cell">{c.gradeLabel}</small>
          </div>
          {c.gapTopics.map((t) => (
            <div key={t.code} className={`ins-gap-topic sev-${t.severity}`}>
              <div className="ins-gap-topic-main">
                <span className="ins-gap-name">{t.name}</span>
                <span className="ins-gap-meta">
                  <strong>{t.affected.length}</strong> of {t.attempted} students &middot; topic avg {t.percent}%
                </span>
              </div>
              <SeverityBadge severity={t.severity} />
              <div className="ins-gap-people">
                {t.affected.slice(0, 8).map((a) => (
                  <Link key={a.email} to={`/admin/user-detail?course=maths&email=${encodeURIComponent(a.email)}`} className="ins-person-chip">
                    {a.username} <em>{a.percent}%</em>
                  </Link>
                ))}
                {t.affected.length > 8 && <span className="adm-muted-cell">+{t.affected.length - 8} more</span>}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function GapsByStudent({ insights, filters, nameMatch }) {
  const rows = insights.people
    .filter((p) => (!filters.cluster || p.band === filters.cluster) && nameMatch(p))
    .map((p) => ({
      ...p,
      shown: p.gaps.filter((g) => (!filters.grade || g.chapterKey.startsWith(`${filters.grade}|`))
        && (!filters.chapter || g.chapterKey === filters.chapter)
        && (!filters.severity || g.severity === filters.severity))
    }))
    .filter((p) => p.shown.length)
    .sort((a, b) => b.shown.length - a.shown.length || a.percent - b.percent);

  if (!rows.length) return <div className="adm-empty"><i className="bi bi-check2-circle"></i>No gaps match the current filters.</div>;

  return (
    <div className="ins-pad">
      {rows.map((p) => {
        const band = bandFor(p.percent);
        return (
          <div key={p.email} className="ins-gap-group">
            <div className="ins-gap-group-head ins-gap-student-head">
              <span>
                <strong>{p.username}</strong>{' '}
                <span className={`ins-band-chip band-${band.tone}`}>{band.label}</span>{' '}
                <small className="adm-muted-cell">{p.shown.length} {p.shown.length === 1 ? 'gap' : 'gaps'}</small>
              </span>
              <StudentLink email={p.email} />
            </div>
            {p.shown.map((g) => <GapRow key={`${g.chapterKey}-${g.code}`} gap={g} showChapter={!filters.chapter} />)}
          </div>
        );
      })}
    </div>
  );
}

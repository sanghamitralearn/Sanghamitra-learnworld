import { useEffect, useMemo, useRef, useState } from 'react';
import { ACTIONS, chapterKey, currentAttempts, studentSeverity } from './mathGaps';

// "Topic risk map" for one student's diagnostic report.
// Rows = chapters (weakest first), x = topic score (0–100%) in the chosen phase, bubble area =
// questions answered on that topic (how much evidence the score rests on), colour = status.
// The dashed line is the gap threshold, so everything left of it is a gap. Each row ends with the
// chapter's own score and gap count in a fixed right-hand column, so rows read like a scorecard.
//
// The chart is drawn at the container's real pixel width (not a stretched viewBox), so text and
// bubbles stay the same size on any screen. Topics with the same score are packed into a tight
// cluster around their score (hexagonal packing) instead of one tall column.
//
// Colours were checked with the dataviz validator (--pairs all, light surface): all three pass the
// colour-blind separation check. Orange is under 3:1 contrast, so every status also carries an
// icon and a label, gap bubbles are direct-labelled, and the tooltip gives the exact numbers.
const STATUS = {
  critical: { label: 'Critical gap', color: '#d03b3b', icon: 'bi-exclamation-octagon-fill' },
  gap: { label: 'Gap', color: '#ec835a', icon: 'bi-exclamation-triangle-fill' },
  secure: { label: 'On track', color: '#3b82c4', icon: 'bi-check-circle-fill' }
};
const STATUS_ORDER = ['critical', 'gap', 'secure'];

export const PHASES = {
  diagnostic: { label: 'Diagnostic', hint: 'Applied questions — the main measure of what the student knows' },
  warmup: { label: 'Warm-up', hint: 'Basics checked before the diagnostic' },
  all: { label: 'All phases', hint: 'Warm-up, diagnostic and recheck together' }
};

const TOP = 30;
const AXIS_H = 28;
const R_MIN = 5;
const R_MAX = 10;
const ROW_MIN = 56;
const ROW_PAD = 10;
const SCORE_W = 92; // right-hand score column
const GUTTER = 18; // space between the plot and the score column

const gradeLabel = (g) => `Grade ${String(g).replace(/^grade-/, '')}`;
const pct = (c, t) => (t ? Math.round((c / t) * 100) : 0);
const truncate = (s, n) => (s.length > n ? `${s.slice(0, n - 1)}…` : s);
const chapterNo = (key) => Number((/\|ch-(\d+)/.exec(key) || [])[1] || 999);

// Topic scores per chapter for one phase, from the latest attempt at each chapter + level.
function chaptersForPhase(entries, catalog, phase, threshold) {
  const topicNames = new Map((catalog?.chapters || []).map((c) => [c.key, c.topics || {}]));
  const byChapter = new Map();
  currentAttempts(entries).forEach((a) => {
    const key = chapterKey(a);
    const ch = byChapter.get(key) || { key, grade: a.grade, chapterName: a.chapter_name, topics: new Map() };
    (a.answers || []).forEach((x) => {
      if (x.not_attempted || !x.cluster) return;
      if (phase !== 'all' && x.phase !== phase) return;
      // Different levels can use different cluster codes for the same topic, so topics are merged
      // by their name within a chapter — otherwise "Order of Operations" shows up twice.
      const name = topicNames.get(key)?.[x.cluster] || x.cluster_name || x.cluster;
      const nameKey = String(name).trim().toLowerCase();
      const t = ch.topics.get(nameKey) || { code: nameKey, name, correct: 0, total: 0 };
      t.total += 1;
      if (x.is_correct) t.correct += 1;
      ch.topics.set(nameKey, t);
    });
    byChapter.set(key, ch);
  });
  return [...byChapter.values()]
    .map((c) => {
      const topics = [...c.topics.values()].map((t) => {
        const percent = pct(t.correct, t.total);
        const severity = percent < threshold ? studentSeverity(percent, threshold) : null;
        return {
          ...t,
          id: `${c.key}|${t.code}`,
          chapterKey: c.key,
          chapterName: c.chapterName,
          percent,
          status: !severity ? 'secure' : severity === 'high' ? 'critical' : 'gap',
          action: severity ? ACTIONS[severity] : null
        };
      });
      const correct = topics.reduce((s, t) => s + t.correct, 0);
      const total = topics.reduce((s, t) => s + t.total, 0);
      return {
        ...c, topics, percent: pct(correct, total), correct, total,
        gaps: topics.filter((t) => t.status !== 'secure').length
      };
    })
    .filter((c) => c.total > 0);
}

// Packs one row's bubbles: each bubble takes the free spot nearest its true score, searching a
// small hexagonal neighbourhood (vertical moves are cheap, sideways moves cost more, and a bubble
// never moves sideways by more than about one diameter or outside the plot).
function pack(topics, xOf, rOf, xMin, xMax) {
  const placed = [];
  [...topics].sort((a, b) => b.total - a.total || a.percent - b.percent).forEach((t) => {
    const r = rOf(t.total);
    const x0 = xOf(t.percent);
    const cands = [];
    // Hex grid whose spacing (2·step) clears the 1.5px gap kept between bubbles.
    const step = r + 1;
    for (let row = -8; row <= 8; row += 1) {
      const shift = row % 2 ? step : 0;
      for (let col = -2; col <= 2; col += 1) {
        const dx = col * 2 * step + shift;
        if (Math.abs(dx) > 2 * step + 0.1) continue;
        const x = x0 + dx;
        if (x - r < xMin || x + r > xMax) continue;
        const dy = row * step * 1.73;
        cands.push({ x, dy, cost: Math.hypot((x - x0) * 0.9, dy) });
      }
    }
    cands.sort((a, b) => a.cost - b.cost);
    const spot = cands.find((c) => !placed.some((q) => Math.hypot(q.x - c.x, q.dy - c.dy) < q.r + r + 1.5)) || cands[0] || { x: x0, dy: 0 };
    placed.push({ ...t, x: spot.x, dy: spot.dy, r });
  });
  const half = placed.reduce((m, p) => Math.max(m, Math.abs(p.dy) + p.r), 0);
  return { placed: placed.sort((a, b) => b.r - a.r), half };
}

export default function TopicBubbleMap({ entries, catalog, stats, incomplete, threshold }) {
  const [phase, setPhase] = useState('diagnostic');
  const [grade, setGrade] = useState('');
  const [chapter, setChapter] = useState('');
  const [hover, setHover] = useState(null);
  const wrapRef = useRef(null);
  const [width, setWidth] = useState(760);

  const all = useMemo(() => chaptersForPhase(entries, catalog, phase, threshold), [entries, catalog, phase, threshold]);
  const grades = useMemo(() => [...new Set(all.map((c) => c.grade))]
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true })), [all]);
  const inGrade = useMemo(() => all.filter((c) => !grade || c.grade === grade), [all, grade]);
  const chapterOptions = useMemo(() => [...inGrade]
    .sort((a, b) => a.grade.localeCompare(b.grade, undefined, { numeric: true }) || chapterNo(a.key) - chapterNo(b.key)), [inGrade]);
  const chapterOn = chapter && inGrade.some((c) => c.key === chapter) ? chapter : '';
  const shown = useMemo(() => inGrade.filter((c) => !chapterOn || c.key === chapterOn)
    .sort((a, b) => a.percent - b.percent), [inGrade, chapterOn]);
  const hasChart = shown.length > 0;

  useEffect(() => {
    const el = wrapRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return undefined;
    const ro = new ResizeObserver(([e]) => setWidth(Math.max(320, Math.round(e.contentRect.width))));
    ro.observe(el);
    return () => ro.disconnect();
  }, [hasChart]);

  if (!entries.length) return null;

  const points = shown.flatMap((c) => c.topics);
  const counts = Object.fromEntries(STATUS_ORDER.map((s) => [s, points.filter((p) => p.status === s).length]));
  const gapsTotal = counts.critical + counts.gap;
  const phaseScore = pct(shown.reduce((s, c) => s + c.correct, 0), shown.reduce((s, c) => s + c.total, 0));

  // ---- layout at real pixel width ----
  const W = width;
  const labelW = Math.round(Math.min(230, Math.max(140, W * 0.2)));
  const plotL = labelW;
  const plotR = W - SCORE_W - GUTTER;
  const xOf = (p) => plotL + (p / 100) * (plotR - plotL);
  const maxTotal = Math.max(1, ...points.map((p) => p.total));
  const rOf = (n) => R_MIN + (R_MAX - R_MIN) * Math.sqrt(n / maxTotal);
  const nameChars = Math.floor((labelW - 10) / 6.6);

  let y = TOP;
  const rows = shown.map((c) => {
    const { placed, half } = pack(c.topics, xOf, rOf, plotL - R_MAX, plotR + R_MAX + 4);
    const h = Math.max(ROW_MIN, 2 * half + 2 * ROW_PAD + 12);
    const top = y;
    const cy = y + h / 2;
    y += h;
    const bubbles = placed.map((p) => ({ ...p, y: cy + p.dy }));
    // Direct labels for gaps only (weakest first): above, then below; skip if it would collide.
    const labels = [];
    const overlapsBubble = (b) => bubbles.some((q) => q.x + q.r > b.x1 && q.x - q.r < b.x2 && q.y + q.r > b.y - 9 && q.y - q.r < b.y + 2);
    bubbles.filter((p) => p.status !== 'secure').sort((a, b) => a.percent - b.percent).forEach((p) => {
      const text = `${truncate(p.name, 24)} · ${p.percent}%`;
      const w = text.length * 5.6;
      const x1 = Math.min(Math.max(p.x - w / 2, plotL + 2), plotR - w);
      for (const ly of [p.y - p.r - 5, p.y + p.r + 12]) {
        const box = { x1, x2: x1 + w, y: ly };
        const inRow = ly - 9 > top && ly < top + h - 1;
        const clash = labels.some((l) => Math.abs(l.y - ly) < 12 && l.x1 < box.x2 + 6 && box.x1 < l.x2 + 6);
        if (inRow && !clash && !overlapsBubble(box)) { labels.push({ ...box, text, id: p.id }); break; }
      }
    });
    return { chapter: c, top, h, cy, bubbles, labels, unfinished: incomplete.some((x) => x.chapterKey === c.key) };
  });
  const plotBottom = y;
  const H = plotBottom + AXIS_H;
  const scoreX = W - SCORE_W / 2;

  const showTip = (p, e) => {
    const box = wrapRef.current?.getBoundingClientRect();
    if (!box) return;
    const left = e.clientX - box.left;
    setHover({ p, left, top: e.clientY - box.top, flip: left > box.width - 280 });
  };
  const summary = `${points.length} topics across ${shown.length} chapters (${PHASES[phase].label}): ${counts.critical} critical gaps, ${counts.gap} gaps, ${counts.secure} on track.`;

  return (
    <div className="dx-block tb">
      <div className="tb-head-text">
        <h4 className="dx-h">Topic risk map</h4>
        <p className="tb-sub">Each bubble is a topic, placed at its score. Left of the dashed line is a gap; a bigger bubble means more questions answered.</p>
      </div>

      <div className="tb-toolbar">
        <label className="tb-field">
          <span>Phase</span>
          <select className="adm-trend-select" value={phase} onChange={(e) => { setPhase(e.target.value); setHover(null); }} title={PHASES[phase].hint}>
            {Object.entries(PHASES).map(([id, p]) => <option key={id} value={id}>{p.label}</option>)}
          </select>
        </label>
        <label className="tb-field tb-field-grow">
          <span>Chapter</span>
          <select className="adm-trend-select" value={chapterOn} onChange={(e) => { setChapter(e.target.value); setHover(null); }}>
            <option value="">All chapters ({chapterOptions.length})</option>
            {chapterOptions.map((c) => (
              <option key={c.key} value={c.key}>{grades.length > 1 && !grade ? `${gradeLabel(c.grade)} · ` : ''}{c.chapterName} — {c.percent}%</option>
            ))}
          </select>
        </label>
        {grades.length > 1 && (
          <div className="tb-field">
            <span>Grade</span>
            <div className="dx-grade-tabs" role="tablist" aria-label="Grade">
              <button type="button" role="tab" aria-selected={!grade} className={!grade ? 'is-active' : ''} onClick={() => setGrade('')}>All</button>
              {grades.map((g) => (
                <button key={g} type="button" role="tab" aria-selected={grade === g} className={grade === g ? 'is-active' : ''} onClick={() => setGrade(g)}>{gradeLabel(g)}</button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="tb-kpis">
        <Kpi label={`${PHASES[phase].label} score`} value={hasChart ? phaseScore : null} suffix="%" tone={!hasChart ? undefined : phaseScore >= threshold ? 'ok' : 'bad'}
          foot={`${shown.length} ${shown.length === 1 ? 'chapter' : 'chapters'} · latest attempts`} />
        <Kpi label="Warm-up → diagnostic" value={stats.warmup || null} suffix="%" second={stats.diagnostic || null}
          foot={stats.warmup && stats.diagnostic ? `${stats.diagnostic - stats.warmup >= 0 ? '+' : ''}${stats.diagnostic - stats.warmup} pts on applied questions` : 'basics → applied'} />
        <Kpi label={`Topics below ${threshold}%`} value={gapsTotal} of={points.length} tone={gapsTotal ? 'bad' : 'ok'} foot={`${counts.critical} critical · ${counts.gap} gap`} />
        <Kpi label="Unfinished diagnostics" value={incomplete.length} tone={incomplete.length ? 'warn' : 'ok'} foot={incomplete.length ? 'scores may understate' : 'all complete'} />
      </div>

      {!hasChart ? (
        <p className="tb-empty">No {PHASES[phase].label.toLowerCase()} answers in the latest attempts{grade ? ` for ${gradeLabel(grade)}` : ''}.</p>
      ) : (
        <div className="tb-chart" ref={wrapRef} onMouseLeave={() => setHover(null)}>
          <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Topic risk map. ${summary}`}>
            {/* column headers */}
            <text x={0} y={TOP - 11} className="tb-col-head">Chapter</text>
            <text x={scoreX} y={TOP - 11} className="tb-col-head" textAnchor="middle">Score · gaps</text>

            {rows.map(({ chapter: c, top, h }, i) => (i % 2 === 1
              ? <rect key={`band-${c.key}`} x={0} y={top} width={W} height={h} className="tb-row-band" /> : null))}
            <rect x={plotL} y={TOP} width={xOf(threshold) - plotL} height={plotBottom - TOP} className="tb-gapzone" />
            {[0, 20, 40, 60, 80, 100].map((v) => (
              <g key={v}>
                <line x1={xOf(v)} x2={xOf(v)} y1={TOP} y2={plotBottom} className="tb-grid" />
                <text x={xOf(v)} y={H - 8} className="tb-tick" textAnchor="middle">{v}%</text>
              </g>
            ))}
            <line x1={xOf(threshold)} x2={xOf(threshold)} y1={TOP - 4} y2={plotBottom} className="tb-threshold" />
            <text x={xOf(threshold)} y={TOP - 11} className="tb-threshold-label" textAnchor="middle">Gap threshold {threshold}%</text>
            <text x={plotL + 4} y={TOP - 11} className="tb-zone-label">◀ Needs work</text>
            <text x={plotR} y={TOP - 11} className="tb-zone-label" textAnchor="end">Secure ▶</text>

            {rows.map(({ chapter: c, cy, bubbles, labels, unfinished }) => (
              <g key={c.key}>
                <text x={10} y={cy - 3} className="tb-row-name">
                  <title>{c.chapterName}</title>
                  {truncate(c.chapterName, nameChars)}
                </text>
                <text x={10} y={cy + 13} className="tb-row-meta">
                  {grades.length > 1 ? `${gradeLabel(c.grade)} · ` : ''}{c.topics.length} topics{unfinished ? ' · ⚠ unfinished' : ''}
                </text>

                {/* score column */}
                <rect x={W - SCORE_W + 8} y={cy - 17} width={SCORE_W - 16} height={34} rx={8}
                  className={`tb-score-box ${c.percent < threshold ? 'is-bad' : ''}`} />
                <text x={scoreX} y={cy - 1} className="tb-score-val" textAnchor="middle">{c.percent}%</text>
                <text x={scoreX} y={cy + 11} className={`tb-score-gaps ${c.gaps ? 'has-gaps' : ''}`} textAnchor="middle">
                  {c.gaps ? `${c.gaps} gap${c.gaps > 1 ? 's' : ''}` : 'no gaps'}
                </text>

                {bubbles.map((p) => (
                  <g key={p.id}
                    className={`tb-bubble ${hover && hover.p.id === p.id ? 'is-hover' : ''}`}
                    tabIndex={0}
                    onMouseMove={(e) => showTip(p, e)}
                    onFocus={() => setHover({ p, left: p.x, top: p.y, flip: p.x > W - 280 })}
                    onBlur={() => setHover(null)}
                    aria-label={`${p.name}, ${p.chapterName}: ${p.percent}%, ${p.correct} of ${p.total} correct, ${STATUS[p.status].label}`}>
                    <circle cx={p.x} cy={p.y} r={Math.max(p.r + 3, 11)} className="tb-hit" />
                    <circle cx={p.x} cy={p.y} r={p.r} fill={STATUS[p.status].color} className="tb-dot" />
                  </g>
                ))}
                {labels.map((l) => <text key={l.id} x={l.x1} y={l.y} className="tb-label">{l.text}</text>)}
              </g>
            ))}
          </svg>

          {hover && (
            <div className={`tb-tip ${hover.flip ? 'is-flip' : ''}`} style={{ left: hover.left, top: hover.top }} role="status">
              <div className="tb-tip-name">{hover.p.name}</div>
              <div className="tb-tip-ch">{hover.p.chapterName} · {PHASES[phase].label}</div>
              <div className="tb-tip-score"><strong>{hover.p.percent}%</strong><span>{hover.p.correct}/{hover.p.total} correct</span></div>
              <div className="tb-tip-meter"><span style={{ width: `${hover.p.percent}%`, background: STATUS[hover.p.status].color }}></span><i style={{ left: `${threshold}%` }}></i></div>
              <div className="tb-tip-status">
                <i className={`bi ${STATUS[hover.p.status].icon}`} style={{ color: STATUS[hover.p.status].color }}></i>
                {STATUS[hover.p.status].label}
                <small>{hover.p.percent >= threshold ? `${hover.p.percent - threshold} pts above` : `${threshold - hover.p.percent} pts below`} {threshold}%</small>
              </div>
              {hover.p.action && <div className="tb-tip-action"><i className={`bi ${hover.p.action.icon}`}></i> Next step: {hover.p.action.label}</div>}
            </div>
          )}

          <div className="tb-legend">
            {STATUS_ORDER.map((s) => (
              <span key={s} className="tb-legend-item">
                <span className="tb-swatch" style={{ background: STATUS[s].color }}></span>
                <i className={`bi ${STATUS[s].icon}`} style={{ color: STATUS[s].color }}></i>
                {STATUS[s].label} <b>{counts[s]}</b>
              </span>
            ))}
            <span className="tb-legend-size">
              <span className="tb-size-dot" style={{ width: R_MIN * 2, height: R_MIN * 2 }}></span>
              <span className="tb-size-dot" style={{ width: R_MAX * 2, height: R_MAX * 2 }}></span>
              Bubble size = questions answered (1–{maxTotal}) · hover a bubble for details
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

function Kpi({ label, value, suffix = '', of, second, foot, tone }) {
  return (
    <div className={`tb-kpi ${tone ? `tone-${tone}` : ''}`}>
      <span className="tb-kpi-label">{label}</span>
      <span className="tb-kpi-value">
        {value === null || value === undefined ? '—' : <>{value}{suffix}</>}
        {of !== undefined && value !== null && <small> / {of}</small>}
        {second !== undefined && second !== null && <small className="tb-kpi-second"> → {second}{suffix}</small>}
      </span>
      {foot && <span className="tb-kpi-foot">{foot}</span>}
    </div>
  );
}

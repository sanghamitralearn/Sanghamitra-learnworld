import { useEffect, useMemo, useRef, useState } from 'react';
import { ragTone } from '../../pages/admin/mathGaps';

// Rows × columns grid of percentages (clusters or students × chapters).
//  - drag the grid to pan (lock to one axis with the Pan control)
//  - drag a row or column header to reorder
//  - Ctrl/⌘ + wheel or the +/− buttons to zoom; Reset restores zoom, scroll and order
//  - hover a cell for the exact values
//
// cell(rowId, colId) -> null | { pct, lines: ['Students: 4', ...] }
// settings: { zoom, lock: 'free'|'x'|'y', rowOrder: [], colOrder: [] }; onSettings(patch)

const MIN_ZOOM = 0.6;
const MAX_ZOOM = 1.8;
const clampZoom = (z) => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, Math.round(z * 10) / 10));

// Saved order first (dropping ids that no longer exist), then any new ids in their natural order.
function applyOrder(items, saved = []) {
  const byId = new Map(items.map((i) => [i.id, i]));
  const ordered = saved.filter((id) => byId.has(id)).map((id) => byId.get(id));
  const seen = new Set(ordered.map((i) => i.id));
  return [...ordered, ...items.filter((i) => !seen.has(i.id))];
}

function move(ids, from, to) {
  const next = ids.filter((id) => id !== from);
  next.splice(next.indexOf(to) + (ids.indexOf(from) < ids.indexOf(to) ? 1 : 0), 0, from);
  return next;
}

export default function ClusterHeatmap({ rows, cols, cell, threshold, settings, onSettings, toolbarExtra, rowHeaderLabel }) {
  const { zoom = 1, lock = 'free', rowOrder = [], colOrder = [] } = settings;
  const viewportRef = useRef(null);
  const wrapRef = useRef(null);
  const panRef = useRef(null);
  const [tip, setTip] = useState(null);
  const [reorder, setReorder] = useState(null); // { axis, id, target, active }
  const [panning, setPanning] = useState(false);

  const orderedRows = useMemo(() => applyOrder(rows, rowOrder), [rows, rowOrder]);
  const orderedCols = useMemo(() => applyOrder(cols, colOrder), [cols, colOrder]);

  const cellW = Math.round(104 * zoom);
  const cellH = Math.round(42 * zoom);
  const headW = Math.round(150 * Math.max(zoom, 0.85));

  // Ctrl/⌘ + wheel zooms; a plain wheel scrolls as usual. Needs a non-passive listener.
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return undefined;
    const onWheel = (e) => {
      if (!e.ctrlKey && !e.metaKey) return;
      e.preventDefault();
      onSettings({ zoom: clampZoom(zoom + (e.deltaY < 0 ? 0.1 : -0.1)) });
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [zoom, onSettings, rows.length, cols.length]);

  // ---- Pan ----
  const startPan = (e) => {
    if (e.button !== 0 || e.target.closest('[data-head]')) return;
    const el = viewportRef.current;
    panRef.current = { x: e.clientX, y: e.clientY, left: el.scrollLeft, top: el.scrollTop, moved: false };
    el.setPointerCapture(e.pointerId);
  };
  const onViewportMove = (e) => {
    const pan = panRef.current;
    if (pan) {
      const dx = e.clientX - pan.x;
      const dy = e.clientY - pan.y;
      if (!pan.moved && Math.hypot(dx, dy) > 4) {
        pan.moved = true;
        setPanning(true);
        setTip(null);
      }
      if (pan.moved) {
        const el = viewportRef.current;
        if (lock !== 'y') el.scrollLeft = pan.left - dx;
        if (lock !== 'x') el.scrollTop = pan.top - dy;
      }
      return;
    }
    showTip(e);
  };
  const endPan = () => {
    panRef.current = null;
    setPanning(false);
  };

  // ---- Tooltip ----
  function showTip(e) {
    const target = e.target.closest('[data-cell]');
    if (!target || reorder) {
      setTip(null);
      return;
    }
    const [rowId, colId] = target.dataset.cell.split('::');
    const row = orderedRows.find((r) => r.id === rowId);
    const col = orderedCols.find((c) => c.id === colId);
    const value = cell(rowId, colId);
    const box = wrapRef.current.getBoundingClientRect();
    setTip({
      x: Math.min(e.clientX - box.left + 14, box.width - 230),
      y: e.clientY - box.top + 14,
      title: `${row?.label} · ${col?.label}`,
      pct: value?.pct ?? null,
      lines: value?.lines || ['No attempts yet']
    });
  }

  // ---- Header drag to reorder ----
  const startReorder = (axis, id) => (e) => {
    if (e.button !== 0) return;
    e.stopPropagation();
    e.currentTarget.setPointerCapture(e.pointerId);
    setReorder({ axis, id, target: null, active: false, x: e.clientX, y: e.clientY });
    setTip(null);
  };
  const moveReorder = (e) => {
    if (!reorder) return;
    if (!reorder.active && Math.hypot(e.clientX - reorder.x, e.clientY - reorder.y) < 5) return;
    const hit = document.elementFromPoint(e.clientX, e.clientY)?.closest(`[data-head="${reorder.axis}"]`);
    setReorder({ ...reorder, active: true, target: hit ? hit.dataset.id : null });
  };
  const endReorder = () => {
    if (reorder?.active && reorder.target && reorder.target !== reorder.id) {
      if (reorder.axis === 'col') onSettings({ colOrder: move(orderedCols.map((c) => c.id), reorder.id, reorder.target) });
      else onSettings({ rowOrder: move(orderedRows.map((r) => r.id), reorder.id, reorder.target) });
    }
    setReorder(null);
  };
  const headProps = (axis, id) => ({
    'data-head': axis,
    'data-id': id,
    onPointerDown: startReorder(axis, id),
    onPointerMove: moveReorder,
    onPointerUp: endReorder,
    onPointerCancel: () => setReorder(null),
    className: [
      axis === 'col' ? 'hm-colhead' : 'hm-rowhead',
      reorder?.active && reorder.id === id && reorder.axis === axis ? 'is-dragging' : '',
      reorder?.active && reorder.target === id && reorder.axis === axis && reorder.id !== id ? 'is-target' : ''
    ].join(' ')
  });

  const reset = () => {
    onSettings({ zoom: 1, rowOrder: [], colOrder: [] });
    viewportRef.current?.scrollTo({ left: 0, top: 0 });
  };

  if (!rows.length || !cols.length) {
    return <div className="adm-empty"><i className="bi bi-grid-3x3"></i>No chapter results to chart yet.</div>;
  }

  return (
    <div className="hm" ref={wrapRef} style={{ '--hm-font': `${Math.max(0.68, 0.8 * zoom)}rem` }}>
      <div className="hm-toolbar">
        {toolbarExtra}
        <label className="hm-field">
          <span>Pan</span>
          <select className="adm-trend-select" value={lock} onChange={(e) => onSettings({ lock: e.target.value })}>
            <option value="free">Both directions</option>
            <option value="x">Horizontal only</option>
            <option value="y">Vertical only</option>
          </select>
        </label>
        <div className="hm-zoom" role="group" aria-label="Zoom">
          <button type="button" onClick={() => onSettings({ zoom: clampZoom(zoom - 0.1) })} disabled={zoom <= MIN_ZOOM} aria-label="Zoom out">
            <i className="bi bi-dash-lg"></i>
          </button>
          <span>{Math.round(zoom * 100)}%</span>
          <button type="button" onClick={() => onSettings({ zoom: clampZoom(zoom + 0.1) })} disabled={zoom >= MAX_ZOOM} aria-label="Zoom in">
            <i className="bi bi-plus-lg"></i>
          </button>
        </div>
        <button type="button" className="adm-btn adm-btn-light adm-btn-xs" onClick={reset}>
          <i className="bi bi-arrow-counterclockwise"></i> Reset view
        </button>
      </div>

      <div
        className={`hm-viewport ${panning ? 'is-panning' : ''}`}
        ref={viewportRef}
        onPointerDown={startPan}
        onPointerMove={onViewportMove}
        onPointerUp={endPan}
        onPointerCancel={endPan}
        onPointerLeave={() => setTip(null)}
      >
        <div
          className="hm-grid"
          style={{ gridTemplateColumns: `${headW}px repeat(${orderedCols.length}, ${cellW}px)`, gridAutoRows: `minmax(${cellH}px, auto)` }}
        >
          <div className="hm-corner">{rowHeaderLabel}</div>
          {orderedCols.map((c) => (
            <div key={c.id} {...headProps('col', c.id)} title="Drag to reorder">
              <span className="hm-head-label">{c.label}</span>
              {c.sub && <span className="hm-head-sub">{c.sub}</span>}
            </div>
          ))}
          {orderedRows.map((r) => (
            <RowCells key={r.id} row={r} cols={orderedCols} cell={cell} threshold={threshold} headProps={headProps('row', r.id)} />
          ))}
        </div>
      </div>

      <div className="hm-legend">
        <span><i className="hm-swatch rag-red"></i>Below {threshold}%</span>
        <span><i className="hm-swatch rag-amber"></i>{threshold}–69%</span>
        <span><i className="hm-swatch rag-green"></i>70%+</span>
        <span><i className="hm-swatch rag-muted"></i>No attempts</span>
        <span className="hm-hint">Drag the grid to pan · drag headers to reorder · Ctrl + scroll to zoom</span>
      </div>

      {tip && (
        <div className="hm-tip" style={{ left: tip.x, top: tip.y }} role="tooltip">
          <div className="hm-tip-title">{tip.title}</div>
          {tip.pct !== null && <div className={`hm-tip-pct rag-text-${ragTone(tip.pct, threshold)}`}>{tip.pct}%</div>}
          {tip.lines.map((l) => <div key={l}>{l}</div>)}
        </div>
      )}
    </div>
  );
}

function RowCells({ row, cols, cell, threshold, headProps }) {
  return (
    <>
      <div {...headProps} title="Drag to reorder">
        <span className="hm-head-label">{row.label}</span>
        {row.sub && <span className="hm-head-sub">{row.sub}</span>}
      </div>
      {cols.map((c) => {
        const v = cell(row.id, c.id);
        const tone = v ? ragTone(v.pct, threshold) : 'muted';
        return (
          <div
            key={c.id}
            className={`hm-cell rag-${tone}`}
            data-cell={`${row.id}::${c.id}`}
            aria-label={`${row.label}, ${c.label}: ${v ? `${v.pct}%` : 'no attempts'}`}
          >
            {v ? `${v.pct}%` : '—'}
          </div>
        );
      })}
    </>
  );
}

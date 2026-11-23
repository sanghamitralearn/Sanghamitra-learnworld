import { useRef, useState } from 'react';
import { BANDS, STATUS, ragTone } from '../../pages/admin/mathGaps';

// One 100%-stacked bar per chapter showing how many students sit in each performance cluster,
// grouped under grade headings. Counts are printed inside segments wide enough to hold them,
// and every segment has a hover tooltip, so the colours are never the only cue.
//
// groups: [{ id, label, sub, rows: [{ id, label, sub, counts: { advanced: 3, … }, total, percent, status }] }]
export default function ClusterBars({ groups, threshold, onRowClick }) {
  const wrapRef = useRef(null);
  const [tip, setTip] = useState(null);

  const show = (e, row, band) => {
    const box = wrapRef.current.getBoundingClientRect();
    const n = row.counts[band.id];
    setTip({
      x: Math.min(e.clientX - box.left + 12, box.width - 220),
      y: e.clientY - box.top + 14,
      title: `${row.label} · ${band.label}`,
      lines: [`${n} of ${row.total} students (${row.total ? Math.round((n / row.total) * 100) : 0}%)`, `Chapter avg: ${row.percent}%`]
    });
  };

  if (!groups.length) return <div className="adm-empty"><i className="bi bi-bar-chart"></i>No chapters to show.</div>;

  return (
    <div className="cb" ref={wrapRef} onPointerLeave={() => setTip(null)}>
      <div className="cb-legend" aria-label="Clusters">
        {BANDS.map((b) => (
          <span key={b.id}><i className={`cb-swatch band-${b.tone}`}></i>{b.label} <small>{b.min ? `${b.min}%+` : `< ${BANDS[BANDS.length - 2].min}%`}</small></span>
        ))}
      </div>

      {groups.map((g) => (
        <div key={g.id} className="cb-group">
          <div className="cb-group-head">
            <strong>{g.label}</strong>
            {g.sub && <span className="adm-muted-cell">{g.sub}</span>}
          </div>
          {g.rows.map((r) => {
            const s = STATUS[r.status];
            return (
              <div key={r.id} className={`cb-row ${onRowClick ? 'is-clickable' : ''}`} onClick={onRowClick ? () => onRowClick(r.id) : undefined}>
                <div className="cb-label">
                  <span className="cb-name">{r.label}</span>
                  <small>{r.sub}</small>
                </div>
                <div className="cb-bar" role="img" aria-label={`${r.label}: ${BANDS.map((b) => `${b.label} ${r.counts[b.id]}`).join(', ')}`}>
                  {BANDS.map((b) => {
                    const n = r.counts[b.id];
                    if (!n) return null;
                    const pct = (n / r.total) * 100;
                    return (
                      <span
                        key={b.id}
                        className={`cb-seg band-${b.tone}`}
                        style={{ flexGrow: n }}
                        onPointerMove={(e) => show(e, r, b)}
                      >
                        {pct >= 12 && n}
                      </span>
                    );
                  })}
                </div>
                <div className="cb-end">
                  <span className={`adm-score rag-text-${ragTone(r.percent, threshold)}`}>{r.percent}%</span>
                  <span className={`ins-status status-${s.tone}`}>{s.label}</span>
                </div>
              </div>
            );
          })}
        </div>
      ))}

      {tip && (
        <div className="hm-tip" style={{ left: tip.x, top: tip.y }} role="tooltip">
          <div className="hm-tip-title">{tip.title}</div>
          {tip.lines.map((l) => <div key={l}>{l}</div>)}
        </div>
      )}
    </div>
  );
}

import { useMemo, useState } from 'react';
import { MISTAKE_SORTS, currentAttempts, mistakePatterns } from './mathGaps';
import './insights.css';

// The kinds of mistakes behind a student's wrong answers (from their latest attempt at each level).
// Each card shows what goes wrong; the fix is revealed on demand.
export default function MistakePatterns({ entries }) {
  const [sort, setSort] = useState('important');
  const all = useMemo(() => mistakePatterns(currentAttempts(entries), Infinity, sort), [entries, sort]);
  const mistakes = all.slice(0, 5);
  const [open, setOpen] = useState(() => new Set());
  const toggle = (tag) => setOpen((s) => {
    const next = new Set(s);
    if (next.has(tag)) next.delete(tag); else next.add(tag);
    return next;
  });
  const total = all.reduce((s, m) => s + m.count, 0);

  return (
    <div className="adm-panel mp">
      <div className="mp-head">
        <div>
          <h2 className="mp-title"><i className="bi bi-bug-fill"></i> Mistake Patterns</h2>
          <p className="mp-sub">
            {mistakes.length
              ? <>{total} wrong {total === 1 ? 'answer' : 'answers'} traced to {all.length} mistake {all.length === 1 ? 'type' : 'types'}{all.length > mistakes.length ? ` · showing top ${mistakes.length}` : ''} · latest attempt at each level</>
              : 'No tagged mistakes in the latest attempts.'}
          </p>
        </div>
        {mistakes.length > 0 && (
          <div className="mp-actions">
            {mistakes.length > 1 && (
              <select
                className="adm-trend-select"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                aria-label="Sort mistake patterns"
                title={MISTAKE_SORTS[sort].hint}
              >
                {Object.entries(MISTAKE_SORTS).map(([id, s]) => <option key={id} value={id}>{s.label}</option>)}
              </select>
            )}
            {mistakes.length > 1 && (
              <button
                type="button"
                className="adm-btn adm-btn-light adm-btn-sm"
                onClick={() => setOpen(open.size === mistakes.length ? new Set() : new Set(mistakes.map((m) => m.tag)))}
              >
                {open.size === mistakes.length ? 'Hide all fixes' : 'Show all fixes'}
              </button>
            )}
          </div>
        )}
      </div>

      {mistakes.length > 0 && (
        <div className="mp-grid">
          {mistakes.map((m) => {
            const isOpen = open.has(m.tag);
            return (
              <div key={m.tag} className={`mp-card ${isOpen ? 'is-open' : ''}`}>
                <div className="mp-card-top">
                  <span className="mistake-tag-pill">{m.tag}</span>
                  <span className="mp-count" title={`${m.count} wrong ${m.count === 1 ? 'answer' : 'answers'}`}>{m.count}×</span>
                </div>
                {m.why && <p className="mp-why"><strong>Why:</strong> {m.why}</p>}
                <div className="mp-card-foot">
                  <small className="mp-chapters"><i className="bi bi-journal-text"></i> {m.chapters.join(', ')}</small>
                  {m.fix && (
                    <button type="button" className="mp-fix-btn" onClick={() => toggle(m.tag)} aria-expanded={isOpen}>
                      <i className={`bi ${isOpen ? 'bi-eye-slash' : 'bi-lightbulb-fill'}`}></i>
                      {isOpen ? 'Hide fix' : 'Show fix'}
                    </button>
                  )}
                  {m.fix && isOpen && <p className="mp-fix"><strong>Fix:</strong> {m.fix}</p>}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

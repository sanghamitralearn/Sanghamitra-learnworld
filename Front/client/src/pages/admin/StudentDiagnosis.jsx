import { useEffect, useMemo, useState } from 'react';
import { formatDateTime } from './adminCourses';
import {
  DEFAULT_THRESHOLD, DIAGNOSIS_STATUS, diagnoseStudent, loadMathCatalog
} from './mathGaps';
import TopicBubbleMap from './TopicBubbleMap';
import './insights.css';

// Top-of-page report for one student: overall status, what is wrong and where, and what to do next.
export default function StudentDiagnosis({ entries, username }) {
  const [catalog, setCatalog] = useState(null);
  useEffect(() => {
    let cancelled = false;
    loadMathCatalog().then((c) => { if (!cancelled) setCatalog(c); });
    return () => { cancelled = true; };
  }, []);

  const d = useMemo(() => diagnoseStudent(entries, catalog, DEFAULT_THRESHOLD), [entries, catalog]);
  const status = DIAGNOSIS_STATUS[d.status];
  const last = entries[entries.length - 1];
  const firstName = (username || 'This student').split(' ')[0];
  // Collapsed by default: the header (title + status) is a button that opens the full report.
  const [open, setOpen] = useState(false);

  return (
    <div className={`adm-panel dx band-${status.tone} ${open ? 'is-open' : 'is-collapsed'}`}>
      <button type="button" className="dx-head dx-toggle" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls="dx-body">
        <div>
          <div className="dx-eyebrow">Diagnostic report · Mathematics</div>
          <h3 className="dx-title">Where {firstName} needs help</h3>
          <div className="dx-sub">
            Based on {d.stats.attempts} attempts across {d.chapters.length} {d.chapters.length === 1 ? 'chapter' : 'chapters'}
            {' · '}last active {formatDateTime(last.date)} · gap = topic below {DEFAULT_THRESHOLD}%
          </div>
        </div>
        <span className="dx-head-right">
          <span className={`dx-status status-${status.tone}`}>
            <i className={`bi ${status.icon}`}></i>{status.label}
          </span>
          <span className="dx-toggle-cta">
            {open ? 'Hide report' : 'View full report'}
            <i className={`bi ${open ? 'bi-chevron-up' : 'bi-chevron-down'}`}></i>
          </span>
        </span>
      </button>

      {open && (
        <div id="dx-body" className="dx-body">
          <p className="dx-verdict"><strong>{firstName}</strong> {d.verdict}</p>
          <TopicBubbleMap entries={entries} catalog={catalog} stats={d.stats} incomplete={d.incomplete} threshold={DEFAULT_THRESHOLD} />
        </div>
      )}
    </div>
  );
}

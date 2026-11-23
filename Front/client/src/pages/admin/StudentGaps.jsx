import { useEffect, useMemo, useState } from 'react';
import {
  DEFAULT_THRESHOLD, SEVERITY_LABEL, loadMathCatalog, ragTone, studentChapters, topicGaps
} from './mathGaps';
import './insights.css';

export function SeverityBadge({ severity }) {
  return <span className={`ins-sev sev-${severity}`}><i></i>{SEVERITY_LABEL[severity]}</span>;
}

// One weak topic: score, severity and the suggested next step.
export function GapRow({ gap, showChapter = false }) {
  return (
    <div className={`ins-gap-row sev-${gap.severity}`}>
      <span className="ins-gap-dot" aria-hidden="true"></span>
      <span className="ins-gap-row-name">
        {gap.name}
        {showChapter && <small>{gap.chapterName}</small>}
      </span>
      <span className="ins-gap-row-score">
        <strong>{gap.percent}%</strong>
        <small>{gap.correct}/{gap.total}</small>
      </span>
      <SeverityBadge severity={gap.severity} />
      <span className="ins-action">
        <i className={`bi ${gap.action.icon}`}></i>{gap.action.label}
      </span>
    </div>
  );
}

// "Learning Gaps" section of the student page: weak topics per chapter, from the latest attempt at
// each level, with a suggested action for each.
export default function StudentGaps({ entries }) {
  const [catalog, setCatalog] = useState(null);
  const [threshold, setThreshold] = useState(DEFAULT_THRESHOLD);

  useEffect(() => {
    let cancelled = false;
    loadMathCatalog().then((c) => { if (!cancelled) setCatalog(c); });
    return () => { cancelled = true; };
  }, []);

  const chapters = useMemo(() => {
    const byKey = new Map((catalog?.chapters || []).map((c) => [c.key, c]));
    return studentChapters(entries, byKey)
      .map((c) => ({ ...c, gaps: topicGaps(c, threshold) }))
      .sort((a, b) => b.gaps.length - a.gaps.length || a.percent - b.percent);
  }, [entries, catalog, threshold]);

  const totalGaps = chapters.reduce((s, c) => s + c.gaps.length, 0);
  const high = chapters.reduce((s, c) => s + c.gaps.filter((g) => g.severity === 'high').length, 0);

  return (
    <>
      <h4 className="adm-insight-title ins-title-red" id="learning-gaps" style={{ scrollMarginTop: '110px' }}>Learning Gaps — topic by topic</h4>
      <div className="adm-panel">
        <div className="adm-panel-head adm-panel-head-sm">
          <span>
            {totalGaps
              ? <><strong className="rag-text-red">{totalGaps}</strong> weak {totalGaps === 1 ? 'topic' : 'topics'} across {chapters.filter((c) => c.gaps.length).length} {chapters.filter((c) => c.gaps.length).length === 1 ? 'chapter' : 'chapters'}{high ? <> &middot; <span className="rag-text-red">{high} high severity</span></> : null}</>
              : <>No topics below {threshold}%</>}
            <small className="adm-muted-cell ms-2">based on the latest attempt at each level</small>
          </span>
          <select className="adm-trend-select" value={threshold} onChange={(e) => setThreshold(Number(e.target.value))} aria-label="Gap threshold">
            {[50, 60, 70, 80].map((t) => <option key={t} value={t}>Below {t}%</option>)}
          </select>
        </div>
        <div className="ins-student-gaps">
          {chapters.map((c) => {
            const strong = c.topics.filter((t) => t.percent >= threshold);
            return (
              <div key={c.key} className="ins-gap-group">
                <div className="ins-gap-group-head ins-gap-student-head">
                  <span>
                    <strong>{c.chapterName}</strong>{' '}
                    <small className="adm-muted-cell">Levels {c.levelsDone}/{c.levelsTotal} &middot; {c.attempts} {c.attempts === 1 ? 'attempt' : 'attempts'}</small>
                  </span>
                  <span className={`adm-score rag-text-${ragTone(c.percent, threshold)}`}>{c.percent}%</span>
                </div>
                {c.gaps.map((g) => <GapRow key={g.code} gap={g} />)}
                {!c.gaps.length && c.topics.length > 0 && (
                  <div className="ins-gap-none"><i className="bi bi-check-circle-fill"></i> All topics at or above {threshold}%</div>
                )}
                {!c.topics.length && <div className="ins-gap-none is-muted">No question-level answers recorded.</div>}
                {strong.length > 0 && c.gaps.length > 0 && (
                  <div className="ins-strong">
                    <span className="ins-mini-label">Secure</span>
                    {strong.map((t) => <span key={t.code} className="ins-strong-chip">{t.name} {t.percent}%</span>)}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

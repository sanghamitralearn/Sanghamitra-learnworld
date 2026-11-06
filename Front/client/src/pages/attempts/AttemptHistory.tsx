import { useId, useState } from 'react';
import { Link } from 'react-router-dom';
import { AttemptReviewDetails } from './AttemptReviewDetails';
import { LoadError } from './LoadError';
import { formatDate, formatDuration, scoreTone } from './format';
import { useAttemptHistory } from './useAttempts';
import type { AttemptSummary, CourseOption } from './types';
import './AttemptHistory.css';

function AttemptRow({ attempt }: { attempt: AttemptSummary }) {
  const panelId = useId();
  const [expanded, setExpanded] = useState(false);
  // Details load on first open, then stay mounted so reopening doesn't fetch them again.
  const [opened, setOpened] = useState(false);

  const toggle = () => {
    setOpened(true);
    setExpanded((value) => !value);
  };

  const meta = [
    attempt.detail,
    formatDate(attempt.date),
    attempt.timeSpent ? formatDuration(attempt.timeSpent) : null,
    attempt.mode === 'timed' ? 'Timed' : null
  ].filter(Boolean).join(' · ');

  return (
    <li className="at-row">
      <button type="button" className="at-row-head" aria-expanded={expanded} aria-controls={panelId} onClick={toggle}>
        <span className="at-course">{attempt.courseLabel}</span>
        <span className="at-title">
          <b>{attempt.title}</b>
          <small>{meta}</small>
        </span>
        <span className="at-counts">
          <span><b>{attempt.correct}</b> correct</span>
          <span><b>{attempt.wrong}</b> wrong</span>
          <span><b>{attempt.skipped}</b> skipped</span>
        </span>
        <span className="at-marks">
          <b>{attempt.correct}/{attempt.total}</b>
          <span className={`at-percent is-${scoreTone(attempt.percent)}`}>{attempt.percent}%</span>
        </span>
        <i className={`bi ${expanded ? 'bi-chevron-up' : 'bi-chevron-down'} at-chevron`} aria-hidden="true"></i>
      </button>
      <div id={panelId} className="at-row-body" hidden={!expanded}>
        {opened && <AttemptReviewDetails attempt={attempt} />}
      </div>
    </li>
  );
}

export function AttemptHistory({ courses }: { courses: CourseOption[] }) {
  const [course, setCourse] = useState<string | null>(null);
  const { state, loadingMore, loadMoreFailed, loadMore, reload } = useAttemptHistory(course);

  return (
    <section className="sd-card at-panel" aria-labelledby="at-title">
      <div className="at-head">
        <div>
          <h2 id="at-title" className="sd-card-title">Past attempts</h2>
          <p>Your marks and where you lost them. Open an attempt to see each mistake.</p>
        </div>
        {courses.length > 1 && (
          <select aria-label="Filter by course" value={course ?? ''} onChange={(event) => setCourse(event.target.value || null)}>
            <option value="">All courses</option>
            {courses.map((option) => <option key={option.key} value={option.key}>{option.label}</option>)}
          </select>
        )}
      </div>

      {state.status === 'loading' && (
        <div className="at-skeletons" role="status" aria-label="Loading past attempts">
          {[0, 1, 2].map((i) => <div key={i} className="at-skeleton" />)}
        </div>
      )}

      {state.status === 'error' && <LoadError state={state} onRetry={reload} />}

      {state.status === 'ready' && state.data.attempts.length === 0 && (
        <div className="at-empty">
          <i className="bi bi-journal-check" aria-hidden="true"></i>
          <p>You haven&apos;t attempted anything yet. Your results will appear here after your first test.</p>
          <Link to="/competitive-exams" className="at-btn at-btn-primary">Browse tests</Link>
        </div>
      )}

      {state.status === 'ready' && state.data.attempts.length > 0 && (
        <>
          <ul className="at-list">
            {state.data.attempts.map((attempt) => <AttemptRow key={`${attempt.course}:${attempt.id}`} attempt={attempt} />)}
          </ul>
          {loadMoreFailed && <p className="at-more-error" role="alert">Couldn&apos;t load more attempts. Please try again.</p>}
          {state.data.attempts.length < state.data.total && (
            <button type="button" className="at-btn at-more" disabled={loadingMore} onClick={loadMore}>
              {loadingMore ? 'Loading…' : `Show more (${state.data.total - state.data.attempts.length} left)`}
            </button>
          )}
        </>
      )}
    </section>
  );
}

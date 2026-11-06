import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LoadError } from './LoadError';
import { useAttemptReview } from './useAttempts';
import { scoreTone } from './format';
import type { AttemptSummary, Mistake, TopicResult } from './types';

const INITIAL_MISTAKES = 10;

function TopicBars({ topics }: { topics: TopicResult[] }) {
  return (
    <ul className="at-topics">
      {topics.map((topic) => (
        <li key={topic.name}>
          <div className="at-topic-head">
            <span>{topic.name}</span>
            <b>{topic.correct}/{topic.total}</b>
          </div>
          <div className="at-topic-track" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={topic.percent} aria-label={`${topic.name} score`}>
            <span className={`is-${scoreTone(topic.percent)}`} style={{ width: `${topic.percent}%` }} />
          </div>
        </li>
      ))}
    </ul>
  );
}

function AnswerLine({ label, value, tone }: { label: string; value: string; tone: 'wrong' | 'right' | 'skipped' }) {
  return (
    <p className={`at-answer is-${tone}`}>
      <i className={`bi ${tone === 'right' ? 'bi-check-circle-fill' : tone === 'wrong' ? 'bi-x-circle-fill' : 'bi-dash-circle-fill'}`} aria-hidden="true"></i>
      <span><b>{label}:</b> {value}</span>
    </p>
  );
}

function MistakeCard({ mistake }: { mistake: Mistake }) {
  const place = [
    mistake.questionNumber !== null ? `Q${mistake.questionNumber}` : null,
    mistake.section,
    mistake.topic
  ].filter(Boolean).join(' · ');

  return (
    <li className="at-mistake">
      <div className="at-mistake-head">
        <span className="at-mistake-place">{place}</span>
        <span className={`at-status is-${mistake.status}`}>{mistake.status === 'skipped' ? 'Skipped' : 'Wrong'}</span>
      </div>
      <p className="at-question">{mistake.question ?? 'This question is no longer available.'}</p>
      {mistake.status === 'skipped'
        ? <AnswerLine label="Your answer" value="Not answered" tone="skipped" />
        : <AnswerLine label="Your answer" value={mistake.yourAnswer ?? 'Not recorded'} tone="wrong" />}
      {mistake.correctAnswer && <AnswerLine label="Correct answer" value={mistake.correctAnswer} tone="right" />}
      {(mistake.tag || mistake.why || mistake.fix) && (
        <div className="at-insight">
          {mistake.tag && <p><b>Mistake type:</b> {mistake.tag}</p>}
          {mistake.why && <p><b>Why it happened:</b> {mistake.why}</p>}
          {mistake.fix && <p><b>How to fix it:</b> {mistake.fix}</p>}
        </div>
      )}
      {mistake.explanation && <p className="at-explanation"><b>Explanation:</b> {mistake.explanation}</p>}
    </li>
  );
}

export function AttemptReviewDetails({ attempt }: { attempt: AttemptSummary }) {
  const { state, reload } = useAttemptReview(attempt.course, attempt.id);
  const [showAll, setShowAll] = useState(false);

  if (state.status === 'loading') {
    return <p className="at-note" role="status"><i className="bi bi-arrow-repeat at-spin" aria-hidden="true"></i> Loading details…</p>;
  }
  if (state.status === 'error') return <LoadError state={state} onRetry={reload} />;

  const { topics, mistakes } = state.data;
  const visible = showAll ? mistakes : mistakes.slice(0, INITIAL_MISTAKES);

  return (
    <div className="at-review">
      <div className="at-review-actions">
        <Link to={attempt.retakeUrl} className="at-btn at-btn-primary"><i className="bi bi-arrow-clockwise" aria-hidden="true"></i> Reattempt</Link>
        {attempt.analyticsUrl && <Link to={attempt.analyticsUrl} className="at-btn"><i className="bi bi-bar-chart-line" aria-hidden="true"></i> View analytics</Link>}
      </div>

      {topics.length > 0 && (
        <>
          <h4 className="at-subtitle">Marks by topic <small>weakest first</small></h4>
          <TopicBars topics={topics} />
        </>
      )}

      <h4 className="at-subtitle">Where you went wrong <small>{mistakes.length} {mistakes.length === 1 ? 'question' : 'questions'}</small></h4>
      {mistakes.length === 0 ? (
        <p className="at-note"><i className="bi bi-stars" aria-hidden="true"></i> No mistakes in this attempt. Well done!</p>
      ) : (
        <ol className="at-mistakes">
          {visible.map((mistake) => <MistakeCard key={mistake.id} mistake={mistake} />)}
        </ol>
      )}
      {mistakes.length > INITIAL_MISTAKES && (
        <button type="button" className="at-btn at-more" onClick={() => setShowAll((value) => !value)}>
          {showAll ? 'Show fewer' : `Show all ${mistakes.length} questions`}
        </button>
      )}
    </div>
  );
}

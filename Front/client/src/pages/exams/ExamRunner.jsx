import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { apiFetch } from '../../api/client';
import { typesetMath } from '../math/mathjax';
import '../math/MathBootcamp.css';
import './ExamRunner.css';

// Runs an official practice paper: the full-length test (SAT/PSAT: Reading and Writing
// Module 1 & 2, then Math Module 1 & 2; GRE: Verbal Sections 1 & 2, then Quantitative
// Sections 3 & 4) or a single module/section. Two modes, mirroring the
// math bootcamp's untimed levels and timed speed run:
//   practice — untimed; each answer is checked straight away with the explanation.
//   timed    — each module on its own official clock; answers are scored at the end.
// Also exports ExamAnalysis, the "View Analysis" page for the latest saved attempt.

function formatTime(totalSeconds) {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return h ? `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}` : `${m}:${String(s).padStart(2, '0')}`;
}

// Typesets its own LaTeX (\( ... \)) whenever its content changes — see MathText in MathBootcamp.
function MathText({ html, as: Tag = 'span', className }) {
  const ref = useRef(null);
  useEffect(() => { typesetMath(ref.current); }, [html]);
  return <Tag ref={ref} className={className} dangerouslySetInnerHTML={{ __html: html || '' }} />;
}

// ---------------------------------------------------------------------
// Grading
// ---------------------------------------------------------------------

function parseNumber(value) {
  const s = String(value ?? '').replace(/[,\s]/g, '');
  if (/^-?\d*\.?\d+\/-?\d*\.?\d+$/.test(s)) {
    const [a, b] = s.split('/').map(Number);
    return b === 0 ? NaN : a / b;
  }
  return /^-?\d*\.?\d+$/.test(s) ? Number(s) : NaN;
}

// Student-produced responses: any equivalent value counts (".48", "0.48", "12/25"), and — as on
// the real test — a decimal that fills the answer space (3+ places, truncated or rounded) is accepted.
// An accepted answer written "7.5 to 8.5" is an inclusive range (JEE / GATE numerical answers).
const RANGE_ANSWER = /^\s*(-?\d*\.?\d+)\s+to\s+(-?\d*\.?\d+)\s*$/;

function isSprCorrect(input, accepted) {
  const u = parseNumber(input);
  if (Number.isNaN(u)) return false;
  const places = (String(input).split('.')[1] || '').replace(/\D/g, '').length;
  return accepted.some((answer) => {
    const range = String(answer).match(RANGE_ANSWER);
    if (range) return u >= Number(range[1]) - 1e-9 && u <= Number(range[2]) + 1e-9;
    const v = parseNumber(answer);
    if (Number.isNaN(v)) return String(answer).trim() === String(input).trim();
    if (Math.abs(u - v) < 1e-9) return true;
    if (places >= 3) {
      const p = 10 ** places;
      return Math.abs(Math.trunc(v * p) / p - u) < 1e-9 || Math.abs(Math.round(v * p) / p - u) < 1e-9;
    }
    return false;
  });
}

// Multi-answer questions (GRE select-all, sentence equivalence, 2/3-blank completion) store their
// response as sorted option ids joined with commas, the same form as correctAnswer ("D,F").
// GMAT Two-Part Analysis stores one id per column in column order instead ("B,D", "B," while the
// second column is still empty). All of them are all-or-nothing, as on the real tests.
const isMultiType = (q) => q.type === 'multiple_select' || q.type === 'multi_blank' || q.type === 'two_part';
const splitIds = (value) => String(value ?? '').split(',').filter(Boolean);
const joinIds = (ids) => [...ids].sort().join(',');
const columnIds = (q, value) => q.columns.map((_, i) => String(value ?? '').split(',')[i] || '');

function grade(question, response) {
  if (response == null || response === '') return false;
  if (question.type === 'student_produced_response') {
    return isSprCorrect(response, question.acceptedAnswers?.length ? question.acceptedAnswers : [question.correctAnswer]);
  }
  return response === question.correctAnswer;
}

// Ready to be checked: the right number of choices is picked.
function isComplete(question, response) {
  if (question.type === 'two_part') return columnIds(question, response).every(Boolean);
  const picked = splitIds(response);
  if (question.type === 'multi_blank') {
    return question.blanks.every((b) => b.optionIds.some((id) => picked.includes(id)));
  }
  return question.selectCount ? picked.length === question.selectCount : picked.length > 0;
}

function multiHint(question) {
  if (question.type === 'multi_blank') return 'Choose one entry for each blank.';
  if (question.type === 'two_part') return 'Make one selection in each column.';
  return question.selectCount
    ? `Select exactly ${question.selectCount} answer choices.`
    : 'Select all the answer choices that apply.';
}

// The correct answer in words, for feedback: "Train Y Speed: B, Train X Speed: D" or "D, F".
function answerSummary(question) {
  if (question.type === 'two_part') {
    return columnIds(question, question.correctAnswer).map((id, i) => `${question.columns[i]}: ${id}`).join(', ');
  }
  return splitIds(question.correctAnswer).join(', ');
}

// GMAT Two-Part Analysis: rows are the shared options, each column is a radio group.
function TwoPartTable({ question, response, locked, onRespond }) {
  const picked = columnIds(question, response);
  const correct = columnIds(question, question.correctAnswer);

  function pick(col, id) {
    const next = [...picked];
    next[col] = next[col] === id ? '' : id;
    onRespond(next.some(Boolean) ? next.join(',') : '');
  }

  return (
    <table className="exr-two-part">
      <thead>
        <tr>
          {question.columns.map((c) => <th key={c} scope="col">{c}</th>)}
          <th scope="col" className="exr-two-part-choice">Choice</th>
        </tr>
      </thead>
      <tbody>
        {question.options.map((o) => (
          <tr key={o.id}>
            {question.columns.map((c, col) => {
              const selected = picked[col] === o.id;
              let state = '';
              if (locked && correct[col] === o.id) state = ' correct';
              else if (locked && selected) state = ' incorrect';
              return (
                <td key={c}>
                  <button
                    type="button"
                    className={`exr-radio${selected ? ' on' : ''}${state}`}
                    onClick={() => pick(col, o.id)}
                    disabled={locked}
                    aria-pressed={selected}
                    aria-label={`${c}: ${o.id}`}
                  />
                </td>
              );
            })}
            <td className="exr-two-part-choice"><MathText html={o.text} /></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const sectionTopic = (q) => q.topic || 'Other';

const escapeHtml = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// ---------------------------------------------------------------------
// Pieces
// ---------------------------------------------------------------------

function NavBar({ questions, activeIndex, responses, checked, practice, flagged, onSelect }) {
  return (
    <div className="mb-navigation-bar">
      {questions.map((q, i) => {
        let cls = 'mb-nav-btn';
        if (i === activeIndex) cls += ' active-nav';
        const answered = responses[q.itemId] != null && responses[q.itemId] !== '';
        if (practice && checked[q.itemId]) cls += checked[q.itemId].correct ? ' answered-correct' : ' answered-incorrect';
        else if (answered) cls += ' exr-nav-answered';
        if (flagged[q.itemId]) cls += ' exr-nav-flagged';
        return (
          <button key={q.itemId} type="button" className={cls} onClick={() => onSelect(i)} aria-label={`Question ${i + 1}${answered ? ', answered' : ''}${flagged[q.itemId] ? ', flagged' : ''}`}>
            {i + 1}
          </button>
        );
      })}
    </div>
  );
}

function Figure({ src, alt }) {
  const [failed, setFailed] = useState(false);
  if (!src) return null;
  if (failed) return <p className="exr-figure-missing"><i className="bi bi-image" /> {alt}</p>;
  return (
    <figure className="exr-figure">
      <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} />
    </figure>
  );
}

function ChoiceButton({ option, state, disabled, selected, multi, onClick }) {
  let cls = 'mb-option-btn';
  if (multi) cls += ' exr-choice-multi';
  if (state) cls += ` ${state}`;
  if (selected && !state) cls += ' exr-selected';
  return (
    <button type="button" className={cls} onClick={onClick} disabled={disabled} aria-pressed={selected}>
      <span className="mb-option-letter" aria-hidden="true">
        <span className="mb-option-letter-char">{option.id}</span>
        <span className="mb-option-letter-icon"><i className="bi bi-check-lg" /></span>
        <span className="mb-option-letter-icon incorrect-icon"><i className="bi bi-x-lg" /></span>
      </span>
      <span className="mb-option-text">
        {option.image && <img className="exr-option-img" src={option.image} alt={`Choice ${option.id}`} loading="lazy" />}
        {option.text && !option.image && <MathText html={option.text} />}
      </span>
    </button>
  );
}

function QuestionCard({ question, index, total, unit, practice, response, check, flagged, onRespond, onCheck, onToggleFlag, onPrev, onNext, isLast, onFinish }) {
  const [draft, setDraft] = useState(response || '');
  useEffect(() => { setDraft(response || ''); }, [question.itemId, response]);

  const locked = practice && !!check;
  const spr = question.type === 'student_produced_response';
  const multi = isMultiType(question);
  const hasPassage = !!question.passage;
  const picked = splitIds(response);
  const correctIds = splitIds(question.correctAnswer);

  // Select-all toggles a choice; a blank keeps only one choice from its own column.
  function toggle(id) {
    let next = picked.filter((x) => x !== id);
    if (next.length === picked.length) {
      if (question.type === 'multi_blank') {
        const blank = question.blanks.find((b) => b.optionIds.includes(id));
        next = next.filter((x) => !blank?.optionIds.includes(x));
      }
      next.push(id);
    }
    onRespond(joinIds(next));
  }

  const optionState = (id) => {
    if (!locked) return null;
    if (multi ? correctIds.includes(id) : id === question.correctAnswer) return 'correct';
    if (multi ? picked.includes(id) : id === response) return 'incorrect';
    return null;
  };

  const renderChoice = (option) => (
    <ChoiceButton
      key={option.id}
      option={option}
      state={optionState(option.id)}
      selected={multi ? picked.includes(option.id) : response === option.id}
      multi={question.type === 'multiple_select'}
      disabled={locked}
      onClick={() => {
        if (multi) { toggle(option.id); return; }
        onRespond(option.id);
        if (practice) onCheck(option.id);
      }}
    />
  );

  const optionsById = Object.fromEntries(question.options.map((o) => [o.id, o]));

  return (
    <div className={`exr-question${hasPassage ? ' has-passage' : ''}`}>
      {hasPassage && (
        <div className="mb-card exr-passage">
          <span className="exr-passage-label">Text</span>
          <MathText as="div" className="exr-passage-body" html={question.passage} />
        </div>
      )}

      <div className="mb-card">
        <div className="mb-question-meta">
          <span className="mb-question-badge">Question {index + 1} of {total}</span>
          {question.topic && <span className="exr-topic-badge">{question.topic}</span>}
          <span className={`exr-diff exr-diff-${question.difficulty}`}>{question.difficulty}</span>
          <button type="button" className={`exr-flag${flagged ? ' on' : ''}`} onClick={onToggleFlag} aria-pressed={flagged}>
            <i className={`bi ${flagged ? 'bi-flag-fill' : 'bi-flag'}`} /> {flagged ? 'Flagged' : 'Flag for review'}
          </button>
        </div>

        <Figure src={question.image} alt={question.imageAlt} />
        <MathText as="div" className="mb-question-title exr-question-title" html={question.question} />

        {spr ? (
          <form
            className="exr-spr"
            onSubmit={(e) => {
              e.preventDefault();
              onRespond(draft.trim());
              if (practice) onCheck(draft.trim());
            }}
          >
            <label htmlFor={`spr-${question.itemId}`}>Your answer</label>
            <div className="exr-spr-row">
              <input
                id={`spr-${question.itemId}`}
                type="text"
                inputMode="decimal"
                autoComplete="off"
                value={draft}
                maxLength={10}
                disabled={locked}
                placeholder="e.g. 12, 3.5 or 7/2"
                onChange={(e) => {
                  setDraft(e.target.value);
                  if (!practice) onRespond(e.target.value.trim());
                }}
              />
              {practice && !locked && (
                <button type="submit" className="mb-btn" disabled={!draft.trim()}>Check <i className="bi bi-check2" /></button>
              )}
            </div>
            <span className="exr-spr-help">Enter a whole number, decimal or fraction. Commas are optional.</span>
          </form>
        ) : (
          <>
            {multi && <p className="exr-multi-hint"><i className="bi bi-info-circle" /> {multiHint(question)}</p>}
            {question.type === 'two_part' ? (
              <TwoPartTable question={question} response={response} locked={locked} onRespond={onRespond} />
            ) : question.type === 'multi_blank' ? (
              <div className="exr-blanks">
                {question.blanks.map((b) => (
                  <div key={b.label} className="exr-blank-col">
                    <span className="exr-blank-label">{b.label}</span>
                    <div className="mb-options-group">
                      {b.optionIds.map((id) => optionsById[id] && renderChoice(optionsById[id]))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mb-options-group">{question.options.map(renderChoice)}</div>
            )}
            {multi && practice && !locked && (
              <div className="exr-multi-check">
                <button type="button" className="mb-btn" disabled={!isComplete(question, response)} onClick={() => onCheck(response)}>
                  Check <i className="bi bi-check2" />
                </button>
              </div>
            )}
          </>
        )}

        {locked && (
          <div className={`mb-feedback ${check.correct ? 'fb-correct' : 'fb-incorrect'}`}>
            <span className="mb-feedback-icon"><i className={`bi ${check.correct ? 'bi-check-circle-fill' : 'bi-x-circle-fill'}`} /></span>
            <span>
              <strong>{check.correct ? 'Correct!' : 'Not quite.'}</strong>
              {!check.correct && spr && <> The answer is <strong>{question.acceptedAnswers.join(' or ')}</strong>.</>}
              {!check.correct && multi && <> The answer is <strong>{answerSummary(question)}</strong> — every part must be right.</>}
              {question.explanation && <MathText as="div" className="exr-explanation" html={question.explanation} />}
            </span>
          </div>
        )}

        <div className="exr-actions">
          <button type="button" className="mb-btn secondary" onClick={onPrev} disabled={index === 0}>
            <i className="bi bi-arrow-left" /> Back
          </button>
          {isLast ? (
            <button type="button" className="mb-btn" onClick={onFinish}>Finish {unit.toLowerCase()} <i className="bi bi-flag-fill" /></button>
          ) : (
            <button type="button" className="mb-btn" onClick={onNext}>Next <i className="bi bi-arrow-right" /></button>
          )}
        </div>
      </div>
    </div>
  );
}

function ConfirmFinish({ unit, unanswered, flagged, isLastModule, onCancel, onConfirm }) {
  const u = unit.toLowerCase();
  return (
    <div className="mb-modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onCancel(); }}>
      <div className="mb-modal-content mb-modal-confirm">
        <div className="mb-gate-icon mb-modal-warn-icon"><i className="bi bi-flag" /></div>
        <h3>{isLastModule ? 'Finish the test?' : `Finish this ${u}?`}</h3>
        {!isLastModule && <p>You won&apos;t be able to come back to this {u}.</p>}
        {unanswered > 0 && <p>You have <strong>{unanswered}</strong> unanswered question{unanswered === 1 ? '' : 's'}. They will be marked incorrect.</p>}
        {flagged > 0 && <p><strong>{flagged}</strong> question{flagged === 1 ? ' is' : 's are'} still flagged for review.</p>}
        <div className="mb-modal-actions">
          <button type="button" className="mb-btn secondary" onClick={onCancel}>Keep working</button>
          <button type="button" className="mb-btn" onClick={onConfirm}>Finish <i className="bi bi-arrow-right" /></button>
        </div>
      </div>
    </div>
  );
}

function ReviewItem({ question, index, result }) {
  const [open, setOpen] = useState(!result.correct);
  const spr = question.type === 'student_produced_response';
  const status = result.skipped ? 'unattempted' : result.correct ? 'correct' : 'incorrect';
  // One line per chosen option; multi-blank answers are labelled with their blank.
  const optionText = (value) => {
    if (question.type === 'two_part') {
      return columnIds(question, value).map((id, i) => {
        const o = question.options.find((x) => x.id === id);
        return `${escapeHtml(question.columns[i])}: ${o ? `${id}. ${o.text}` : '—'}`;
      }).join('<br>');
    }
    const ids = splitIds(value);
    if (!ids.length) return '—';
    return ids.map((id) => {
      const o = question.options.find((x) => x.id === id);
      if (!o) return escapeHtml(id);
      const blank = (question.blanks || []).find((b) => b.optionIds.includes(id));
      return `${blank ? `${blank.label}: ` : ''}${id}. ${o.image ? '(graph)' : o.text}`;
    }).join('<br>');
  };
  // Typed answers are user input, so escape them before they go through innerHTML.
  const yours = result.skipped ? 'Not answered' : spr ? escapeHtml(result.response) : optionText(result.response);
  const correct = spr ? escapeHtml(question.acceptedAnswers.join(' or ')) : optionText(question.correctAnswer);

  return (
    <div className={`mb-review-item mb-review-${status}`}>
      <button type="button" className="exr-review-toggle" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
        <span className="exr-review-num">{status === 'correct' ? '✓' : status === 'incorrect' ? '✗' : '○'} Q{index + 1}</span>
        <span className="exr-review-topic">{question.topic || 'Question'}</span>
        <i className={`bi ${open ? 'bi-chevron-up' : 'bi-chevron-down'}`} />
      </button>
      {open && (
        <div className="exr-review-body">
          {question.passage && <MathText as="div" className="exr-review-passage" html={question.passage} />}
          <Figure src={question.image} alt={question.imageAlt} />
          <MathText as="div" className="q" html={question.question} />
          <div className="your-ans">Your answer: <MathText html={yours} /></div>
          <div className="correct-ans">Correct answer: <MathText html={correct} /></div>
          {question.explanation && <div className="feedback-detail"><strong>Explanation:</strong> <MathText html={question.explanation} /></div>}
        </div>
      )}
    </div>
  );
}

function TierRows({ rows, nameKey }) {
  return (
    <div className="mb-gap-clusters">
      {rows.map((r) => {
        const acc = r.total ? r.correct / r.total : 0;
        const tier = acc === 1 ? 'strong' : acc < 0.5 ? 'weak' : 'shaky';
        return (
          <div key={r[nameKey]} className={`mb-gap-row mb-gap-${tier}`}>
            <span className="mb-gap-name">{r[nameKey]}</span>
            <span className="mb-gap-score">{r.correct}/{r.total} correct</span>
          </div>
        );
      })}
    </div>
  );
}

// `modules`: [{ key, label, questions, results }] — one entry per module played, in order.
function Results({ title, modules, mode, timeSpent, date, backTo, onRetake }) {
  const [filter, setFilter] = useState('all'); // all | wrong
  const allQuestions = modules.flatMap((m) => m.questions);
  const allResults = modules.flatMap((m) => m.results);
  const correct = allResults.filter((r) => r.correct).length;
  const skipped = allResults.filter((r) => r.skipped).length;
  const percent = allQuestions.length ? Math.round((correct / allQuestions.length) * 100) : 0;

  const sections = useMemo(() => {
    const map = {};
    modules.forEach((m) => {
      map[m.sectionName] ||= { section: m.sectionName, correct: 0, total: 0 };
      map[m.sectionName].total += m.questions.length;
      map[m.sectionName].correct += m.results.filter((r) => r.correct).length;
    });
    return Object.values(map);
  }, [modules]);

  const topics = useMemo(() => {
    const map = {};
    allQuestions.forEach((q, i) => {
      const t = sectionTopic(q);
      map[t] ||= { topic: t, correct: 0, total: 0 };
      map[t].total += 1;
      if (allResults[i].correct) map[t].correct += 1;
    });
    return Object.values(map).sort((a, b) => a.correct / a.total - b.correct / b.total);
  }, [allQuestions, allResults]);

  return (
    <>
      <div className="mb-card exr-results">
        <div className="mb-gate-icon"><i className={`bi ${percent >= 80 ? 'bi-trophy' : 'bi-bar-chart-line'}`} /></div>
        <h2>{title}</h2>
        <div className="exr-score">
          <b>{correct}</b><span>/ {allQuestions.length}</span>
        </div>
        <p className="exr-score-sub">
          {percent}% correct · {mode === 'timed' ? 'Timed' : 'Practice'} mode
          {timeSpent > 0 && <> · {formatTime(timeSpent)} spent</>}
          {skipped > 0 && <> · {skipped} unanswered</>}
          {date && <> · {new Date(date).toLocaleString()}</>}
        </p>

        {sections.length > 1 && (
          <div className="mb-gap-summary exr-topics">
            <h3>By section</h3>
            <TierRows rows={sections} nameKey="section" />
          </div>
        )}

        <div className="mb-gap-summary exr-topics">
          <h3>By topic</h3>
          <TierRows rows={topics} nameKey="topic" />
        </div>

        <div className="mb-modal-actions">
          <button type="button" className="mb-btn secondary" onClick={() => onRetake('practice')}><i className="bi bi-arrow-clockwise" /> Retake in practice mode</button>
          <button type="button" className="mb-btn secondary" onClick={() => onRetake('timed')}><i className="bi bi-stopwatch" /> Retake timed</button>
          <Link className="mb-btn" to={backTo}>Back to tests <i className="bi bi-arrow-right" /></Link>
        </div>
      </div>

      <div className="mb-card">
        <div className="exr-review-head">
          <h3><i className="bi bi-journal-text" /> Review answers</h3>
          <div className="exr-seg" role="group" aria-label="Filter questions">
            <button type="button" aria-pressed={filter === 'all'} onClick={() => setFilter('all')}>All</button>
            <button type="button" aria-pressed={filter === 'wrong'} onClick={() => setFilter('wrong')}>Incorrect only</button>
          </div>
        </div>
        {modules.map((m) => (
          <div key={m.key} className="exr-review-module">
            {modules.length > 1 && (
              <h4 className="exr-review-module-title">
                {m.label} <span>{m.results.filter((r) => r.correct).length}/{m.questions.length}</span>
              </h4>
            )}
            {m.questions.map((q, i) => (filter === 'wrong' && m.results[i].correct ? null : (
              <ReviewItem key={q.itemId} question={q} index={i} result={m.results[i]} />
            )))}
          </div>
        ))}
      </div>
    </>
  );
}

// ---------------------------------------------------------------------
// Loading a paper: catalog rows + questions -> ordered list of modules
// ---------------------------------------------------------------------

async function loadPaper(exam, section, moduleNum) {
  const qs = new URLSearchParams({ exam });
  if (section) qs.set('section', section);
  if (moduleNum) qs.set('module', String(moduleNum));
  const [catalogRes, questionsRes] = await Promise.all([
    apiFetch('/exams/catalog'),
    apiFetch(`/exams/questions?${qs}`),
  ]);
  if (!catalogRes.ok || !questionsRes.ok) throw new Error('load failed');
  const catalog = await catalogRes.json();
  const questions = await questionsRes.json();

  // Catalog rows come back in test order (Reading and Writing M1, M2, then Math M1, M2).
  const modules = catalog
    .filter((c) => c.exam === exam && (!section || c.section === section) && (!moduleNum || c.module === moduleNum))
    .map((c) => ({
      key: `${c.section}-m${c.module}`,
      section: c.section,
      sectionName: c.sectionName,
      module: c.module,
      unit: c.unitName || 'Module',
      label: `${c.sectionName} · ${c.unitName || 'Module'} ${c.unitNumber || c.module}`,
      timedSeconds: c.timedSeconds,
      topics: c.topics || [],
      questions: questions
        .filter((q) => q.section === c.section && q.module === c.module)
        .sort((a, b) => a.order - b.order),
    }))
    .filter((m) => m.questions.length > 0);

  const first = catalog.find((c) => c.exam === exam);
  const family = first?.family || 'sat';
  return {
    examLabel: first?.examLabel || exam,
    sourceCitation: first?.sourceCitation || '',
    backTo: `/competitive-exams/${family}`,
    modules,
  };
}

async function requireSession(navigate, returnTo) {
  const res = await apiFetch('/session-info');
  if (!res.ok) {
    navigate(`/login?redirectPath=${encodeURIComponent(returnTo)}`);
    return null;
  }
  const data = await res.json();
  return { username: data.username, email: data.email };
}

// ---------------------------------------------------------------------
// Test runner — a full-length paper (all modules in order) or a single module
// ---------------------------------------------------------------------

export default function ExamRunner() {
  const { exam, section, module } = useParams();
  const moduleNum = module ? Number(module) : 0;
  const fullTest = !section;
  const navigate = useNavigate();
  const returnTo = fullTest ? `/competitive-exams/${exam}/test` : `/competitive-exams/${exam}/${section}/${module}`;

  const [phase, setPhase] = useState('loading'); // loading | error | intro | test | break | results
  const [session, setSession] = useState(null);
  const [paper, setPaper] = useState(null);
  const [mode, setMode] = useState('practice');

  const [moduleIdx, setModuleIdx] = useState(0);
  const [index, setIndex] = useState(0);
  const [responses, setResponses] = useState({});
  const [checked, setChecked] = useState({});
  const [flagged, setFlagged] = useState({});
  const [graded, setGraded] = useState([]);
  const [confirmFinish, setConfirmFinish] = useState(false);

  const [timeLeft, setTimeLeft] = useState(0);
  const [timerVisible, setTimerVisible] = useState(true);
  const [timeSpent, setTimeSpent] = useState(0);
  const startedAtRef = useRef(0);
  const questionStartRef = useRef(0);
  const timeLogRef = useRef({});
  const savedRef = useRef(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const s = await requireSession(navigate, returnTo);
        if (!s || cancelled) return;
        setSession(s);
        const loaded = await loadPaper(exam, section, moduleNum);
        if (cancelled) return;
        setPaper(loaded);
        setPhase(loaded.modules.length ? 'intro' : 'error');
      } catch {
        if (!cancelled) setPhase('error');
      }
    })();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exam, section, module]);

  const modules = paper?.modules || [];
  const practice = mode === 'practice';
  const currentModule = modules[moduleIdx];
  const questions = currentModule?.questions || [];
  const current = questions[index];
  const totalQuestions = modules.reduce((n, m) => n + m.questions.length, 0);
  const totalSeconds = modules.reduce((n, m) => n + m.timedSeconds, 0);

  function start(nextMode) {
    setMode(nextMode);
    setModuleIdx(0);
    setIndex(0);
    setResponses({});
    setChecked({});
    setFlagged({});
    setGraded([]);
    timeLogRef.current = {};
    savedRef.current = false;
    startedAtRef.current = Date.now();
    questionStartRef.current = Date.now();
    setTimeLeft(modules[0]?.timedSeconds || 0);
    setTimerVisible(true);
    setPhase('test');
    window.scrollTo({ top: 0 });
  }

  const logTime = useCallback(() => {
    if (!current || !questionStartRef.current) return;
    const elapsed = (Date.now() - questionStartRef.current) / 1000;
    timeLogRef.current[current.itemId] = (timeLogRef.current[current.itemId] || 0) + elapsed;
    questionStartRef.current = Date.now();
  }, [current]);

  function go(nextIndex) {
    logTime();
    setIndex(Math.max(0, Math.min(questions.length - 1, nextIndex)));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const gradeAll = useCallback(() => modules.map((m) => ({
    ...m,
    results: m.questions.map((q) => {
      const response = responses[q.itemId];
      const skipped = response == null || response === '';
      return { response: skipped ? '' : response, skipped, correct: !skipped && grade(q, response) };
    }),
  })), [modules, responses]);

  // End the current module: move to the break screen, or to results after the last module.
  const finishModule = useCallback(() => {
    logTime();
    setConfirmFinish(false);
    if (moduleIdx + 1 < modules.length) {
      setPhase('break');
    } else {
      setGraded(gradeAll());
      setTimeSpent(Math.round((Date.now() - startedAtRef.current) / 1000));
      setPhase('results');
    }
    window.scrollTo({ top: 0 });
  }, [logTime, moduleIdx, modules.length, gradeAll]);

  function startNextModule() {
    const next = moduleIdx + 1;
    setModuleIdx(next);
    setIndex(0);
    setTimeLeft(modules[next].timedSeconds);
    setTimerVisible(true);
    questionStartRef.current = Date.now();
    setPhase('test');
    window.scrollTo({ top: 0 });
  }

  // Each module has its own clock in timed mode, like the real test.
  useEffect(() => {
    if (phase !== 'test' || practice) return undefined;
    const id = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) { clearInterval(id); return 0; }
        if (t - 1 === 300) setTimerVisible(true);
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [phase, practice, moduleIdx]);

  useEffect(() => {
    if (phase === 'test' && !practice && timeLeft === 0) finishModule();
  }, [phase, practice, timeLeft, finishModule]);

  // Save the attempt once, as soon as results are ready.
  useEffect(() => {
    if (phase !== 'results' || savedRef.current || !session || !paper) return;
    savedRef.current = true;
    const flat = graded.flatMap((m) => m.questions.map((q, i) => ({ q, r: m.results[i] })));
    const only = !fullTest && modules[0];
    const attempt = {
      exam,
      exam_label: paper.examLabel,
      scope: fullTest ? 'full' : 'module',
      section: only ? only.section : '',
      section_name: only ? only.sectionName : '',
      module: only ? only.module : 0,
      mode,
      correct: flat.filter((x) => x.r.correct).length,
      total: flat.length,
      unattempted: flat.filter((x) => x.r.skipped).length,
      time_spent: timeSpent,
      answers: flat.map(({ q, r }) => ({
        item_id: q.itemId,
        section: q.section,
        module: q.module,
        topic: q.topic,
        response: r.response,
        is_correct: r.correct,
        skipped: r.skipped,
        time_elapsed: Math.round(timeLogRef.current[q.itemId] || 0),
      })),
    };
    apiFetch('/exams/scores', {
      method: 'POST',
      body: JSON.stringify({ username: session.username, email: session.email, attempt }),
    })
      .then((res) => { if (!res.ok) console.error('[exam runner] failed to save attempt, status', res.status); })
      .catch((err) => console.error('[exam runner] network error saving attempt:', err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  const answeredInModule = questions.filter((q) => responses[q.itemId] != null && responses[q.itemId] !== '').length;
  const flaggedInModule = questions.filter((q) => flagged[q.itemId]).length;

  if (phase === 'loading') {
    return <div className="mb-container"><p className="mb-loading"><i className="bi bi-arrow-repeat mb-spin" /> Loading practice test&hellip;</p></div>;
  }
  if (phase === 'error') {
    return (
      <div className="mb-container">
        <div className="mb-card mb-gate-card">
          <div className="mb-gate-icon"><i className="bi bi-exclamation-circle" /></div>
          <p>No questions are loaded for this test yet.</p>
          <Link className="mb-btn" to="/competitive-exams"><i className="bi bi-arrow-left" /> Back to Full Tests</Link>
        </div>
      </div>
    );
  }

  const hasPassages = questions.some((q) => q.passage);
  const pct = questions.length ? Math.round((answeredInModule / questions.length) * 100) : 0;
  const nextModule = modules[moduleIdx + 1];

  return (
    <div className={`mb-container exr${phase === 'test' && hasPassages ? ' exr-wide' : ''}`}>
      <header className="mb-header">
        <Link className="mb-back-link" to={paper.backTo}><i className="bi bi-arrow-left" /> Back to Full Tests</Link>
        <div className="mb-header-eyebrow">
          <span className="mb-eyebrow-chip">{paper.examLabel}</span>
          <span className="mb-eyebrow-chip">{fullTest ? 'Full-Length Paper' : currentModule?.sectionName}</span>
          {(phase === 'test' || phase === 'break') && (
            <span className={`mb-eyebrow-chip mb-eyebrow-level${!practice ? ' timed' : ''}`}>
              <i className={`bi ${!practice ? 'bi-stopwatch-fill' : 'bi-flag-fill'}`} />
              {practice ? 'Practice' : 'Timed'}
            </span>
          )}
        </div>
        <h2>{phase === 'test' && currentModule ? currentModule.label : `${paper.examLabel}${fullTest ? ' — Full Test' : ''}`}</h2>
        <p>
          {phase === 'test' && modules.length > 1
            ? `${currentModule.unit} ${moduleIdx + 1} of ${modules.length}`
            : `${totalQuestions} questions · ${modules.map((m) => m.label).join(', ')}`}
        </p>

        {phase === 'test' && !practice && (
          <div className="mb-timer-area">
            <i className="bi bi-clock-history mb-timer-icon" />
            <span className={`mb-timer-display ${timeLeft < 60 ? 'danger' : timeLeft < 300 ? 'warning' : ''}`}>
              {timerVisible ? formatTime(timeLeft) : '--:--'}
            </span>
            <button type="button" className="mb-hide-timer-btn" onClick={() => setTimerVisible((v) => !v)}>
              <i className={`bi ${timerVisible ? 'bi-eye-slash' : 'bi-eye'}`} /> {timerVisible ? 'Hide Timer' : 'Show Timer'}
            </button>
          </div>
        )}

        {phase === 'test' && (
          <div className="mb-progress-indicator">
            <span>{answeredInModule} of {questions.length} answered</span>
            <div className="mb-progress-bar-outer"><div className="mb-progress-bar-inner" style={{ width: `${pct}%` }} /></div>
            <span>{pct}%</span>
          </div>
        )}
      </header>

      {phase === 'intro' && (
        <div className="mb-card mb-gate-card exr-intro">
          <div className="mb-gate-icon"><i className="bi bi-journal-check" /></div>
          <h2>{totalQuestions} questions · {totalQuestions} marks</h2>
          <ol className="exr-module-plan">
            {modules.map((m) => (
              <li key={m.key}>
                <b>{m.label}</b>
                <span>{m.questions.length} questions · {Math.round(m.timedSeconds / 60)} min</span>
              </li>
            ))}
          </ol>
          <p>+1 mark for each correct answer, no penalty for wrong answers. Choose how you want to work through the test.</p>
          <div className="exr-modes">
            <button type="button" className="exr-mode" onClick={() => start('practice')}>
              <i className="bi bi-emoji-smile" />
              <b>Practice</b>
              <span>Untimed. Each answer is checked straight away, with a full explanation.</span>
            </button>
            <button type="button" className="exr-mode timed" onClick={() => start('timed')}>
              <i className="bi bi-stopwatch" />
              <b>Timed · {formatTime(totalSeconds)}</b>
              <span>Real exam pace: each {(modules[0]?.unit || 'Module').toLowerCase()} has its own clock. Change answers freely and see your score at the end.</span>
            </button>
          </div>
          <p className="exr-source"><i className="bi bi-patch-check" /> {paper.sourceCitation || 'College Board Official SAT/PSAT Practice Test'}</p>
        </div>
      )}

      {phase === 'test' && current && (
        <>
          <NavBar
            questions={questions}
            activeIndex={index}
            responses={responses}
            checked={checked}
            practice={practice}
            flagged={flagged}
            onSelect={go}
          />
          <QuestionCard
            key={current.itemId}
            question={current}
            index={index}
            total={questions.length}
            unit={currentModule.unit}
            practice={practice}
            response={responses[current.itemId]}
            check={checked[current.itemId]}
            flagged={!!flagged[current.itemId]}
            onRespond={(value) => setResponses((prev) => ({ ...prev, [current.itemId]: value }))}
            onCheck={(value) => setChecked((prev) => ({ ...prev, [current.itemId]: { correct: grade(current, value) } }))}
            onToggleFlag={() => setFlagged((prev) => ({ ...prev, [current.itemId]: !prev[current.itemId] }))}
            onPrev={() => go(index - 1)}
            onNext={() => go(index + 1)}
            isLast={index === questions.length - 1}
            onFinish={() => setConfirmFinish(true)}
          />
        </>
      )}

      {phase === 'break' && nextModule && (
        <div className="mb-card mb-gate-card">
          <div className="mb-gate-icon"><i className="bi bi-check2-circle" /></div>
          <h2>{currentModule.label} complete</h2>
          <p>
            Up next: <strong>{nextModule.label}</strong> — {nextModule.questions.length} questions
            {!practice && <>, {Math.round(nextModule.timedSeconds / 60)} minutes</>}.<br />
            You can&apos;t return to the previous {currentModule.unit.toLowerCase()} once you continue.
          </p>
          <button type="button" className="mb-btn" onClick={startNextModule}>
            Start {nextModule.label} <i className="bi bi-arrow-right" />
          </button>
        </div>
      )}

      {phase === 'results' && (
        <Results
          title={fullTest ? 'Test complete' : `${modules[0]?.unit || 'Module'} complete`}
          modules={graded}
          mode={mode}
          timeSpent={timeSpent}
          backTo={paper.backTo}
          onRetake={start}
        />
      )}

      {confirmFinish && (
        <ConfirmFinish
          unit={currentModule.unit}
          unanswered={questions.length - answeredInModule}
          flagged={flaggedInModule}
          isLastModule={moduleIdx === modules.length - 1}
          onCancel={() => setConfirmFinish(false)}
          onConfirm={finishModule}
        />
      )}
    </div>
  );
}

// ---------------------------------------------------------------------
// Analysis of a saved full-length attempt ("View Analysis")
// ---------------------------------------------------------------------

export function ExamAnalysis() {
  const { exam } = useParams();
  const navigate = useNavigate();
  const [state, setState] = useState({ status: 'loading' }); // loading | error | empty | ready

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const s = await requireSession(navigate, `/competitive-exams/${exam}/analysis`);
        if (!s || cancelled) return;
        const [scoresRes, paper] = await Promise.all([
          apiFetch(`/exams/scores?email=${encodeURIComponent(s.email)}&exam=${encodeURIComponent(exam)}`),
          loadPaper(exam),
        ]);
        if (cancelled) return;
        const attempts = scoresRes.ok ? ((await scoresRes.json()).attempts || []) : [];
        const full = attempts.filter((a) => a.scope === 'full').sort((a, b) => new Date(b.date) - new Date(a.date));
        if (!full.length) { setState({ status: 'empty', paper }); return; }
        const attempt = full[0];
        const byItem = Object.fromEntries(attempt.answers.map((a) => [a.item_id, a]));
        const modules = paper.modules.map((m) => ({
          ...m,
          results: m.questions.map((q) => {
            const a = byItem[q.itemId];
            return a
              ? { response: a.response, skipped: a.skipped, correct: a.is_correct }
              : { response: '', skipped: true, correct: false };
          }),
        }));
        setState({ status: 'ready', paper, attempt, modules, count: full.length });
      } catch {
        if (!cancelled) setState({ status: 'error' });
      }
    })();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exam]);

  if (state.status === 'loading') {
    return <div className="mb-container"><p className="mb-loading"><i className="bi bi-arrow-repeat mb-spin" /> Loading analysis&hellip;</p></div>;
  }
  if (state.status !== 'ready') {
    return (
      <div className="mb-container">
        <div className="mb-card mb-gate-card">
          <div className="mb-gate-icon"><i className="bi bi-bar-chart-line" /></div>
          <p>{state.status === 'empty' ? 'You haven’t finished this test yet.' : 'We couldn’t load your analysis. Please try again.'}</p>
          <div className="mb-modal-actions">
            <Link className="mb-btn secondary" to={state.paper?.backTo || '/competitive-exams'}><i className="bi bi-arrow-left" /> Back to Full Tests</Link>
            <Link className="mb-btn" to={`/competitive-exams/${exam}/test`}>Start Test <i className="bi bi-arrow-right" /></Link>
          </div>
        </div>
      </div>
    );
  }

  const { paper, attempt, modules, count } = state;
  return (
    <div className="mb-container exr">
      <header className="mb-header">
        <Link className="mb-back-link" to={paper.backTo}><i className="bi bi-arrow-left" /> Back to Full Tests</Link>
        <div className="mb-header-eyebrow">
          <span className="mb-eyebrow-chip">{paper.examLabel}</span>
          <span className="mb-eyebrow-chip">Analysis</span>
          <span className="mb-eyebrow-chip mb-eyebrow-level"><i className="bi bi-flag-fill" /> {count} attempt{count === 1 ? '' : 's'}</span>
        </div>
        <h2>{paper.examLabel} — Latest attempt</h2>
        <p>{modules.map((m) => m.label).join(', ')}</p>
      </header>
      <Results
        title="Test analysis"
        modules={modules}
        mode={attempt.mode}
        timeSpent={attempt.time_spent}
        date={attempt.date}
        backTo={paper.backTo}
        onRetake={() => navigate(`/competitive-exams/${exam}/test`)}
      />
    </div>
  );
}

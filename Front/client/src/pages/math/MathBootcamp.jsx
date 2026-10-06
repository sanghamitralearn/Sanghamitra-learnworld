import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { apiFetch } from '../../api/client';
import { typesetMath } from './mathjax';
import './MathBootcamp.css';

function shuffleArray(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function formatTime(totalSeconds) {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function getShuffled(item, cacheRef) {
  if (!cacheRef.current[item.itemId]) {
    cacheRef.current[item.itemId] = shuffleArray(item.options);
  }
  return cacheRef.current[item.itemId];
}

// ---------------------------------------------------------------------
// MathText — the ONE place that typesets LaTeX (\( ... \)). Any question,
// option, feedback, or explanation text that might contain math must be
// rendered through this component instead of a plain string/innerHTML.
//
// Why this exists: the old approach called typesetMath(cardRef.current)
// from one shared useEffect on the top-level card, keyed to a hand-maintained
// list of state dependencies. Any new section (a collapsible review panel, a
// modal) that wasn't in that list — or that lives outside cardRef entirely,
// like ReviewModal — silently never got typeset, so its LaTeX showed up as
// raw "\( ... \)" text. MathText fixes that at the source: each instance
// watches its own content and typesets itself, so it works no matter where
// it's mounted or what triggered the re-render.
function MathText({ html, children, as: Tag = 'span', className }) {
  const ref = useRef(null);
  const content = html != null ? html : children;
  useEffect(() => {
    typesetMath(ref.current);
  }, [content]);
  if (html != null) {
    return <Tag ref={ref} className={className} dangerouslySetInnerHTML={{ __html: html }} />;
  }
  return <Tag ref={ref} className={className}>{children}</Tag>;
}

// ---------------------------------------------------------------------
// Small presentational pieces
// ---------------------------------------------------------------------

function NavBar({ items, activeIndex, answeredMap, onSelect }) {
  return (
    <div className="mb-navigation-bar">
      {items.map((item, i) => {
        const record = answeredMap[item.itemId];
        let cls = 'mb-nav-btn';
        if (i === activeIndex) cls += ' active-nav';
        if (record) {
          if (record.unattempted) cls += ' unattempted';
          else cls += record.correct ? ' answered-correct' : ' answered-incorrect';
        }
        return (
          <button key={item.itemId} className={cls} onClick={() => onSelect(i)}>
            {i + 1}
            {record && !record.unattempted && <span className="check-dot" />}
          </button>
        );
      })}
    </div>
  );
}

function OptionButton({ text, state, onClick, disabled, index }) {
  // state: null | 'correct' | 'incorrect'
  let cls = 'mb-option-btn';
  if (state) cls += ` ${state}`;
  const letter = typeof index === 'number' ? String.fromCharCode(65 + index) : null;
  return (
    <button className={cls} onClick={onClick} disabled={disabled}>
      <span className="mb-option-letter" aria-hidden="true">
        <span className="mb-option-letter-char">{letter}</span>
        <span className="mb-option-letter-icon"><i className="bi bi-check-lg" /></span>
        <span className="mb-option-letter-icon incorrect-icon"><i className="bi bi-x-lg" /></span>
      </span>
      <span className="mb-option-text"><MathText html={text} /></span>
    </button>
  );
}

function RestartModal({ onCancel, onConfirm }) {
  return (
    <div className="mb-modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onCancel(); }}>
      <div className="mb-modal-content mb-modal-confirm">
        <div className="mb-gate-icon mb-modal-warn-icon"><i className="bi bi-arrow-clockwise" /></div>
        <h3>Restart the bootcamp?</h3>
        <p>Your progress will be lost.</p>
        <div className="mb-modal-actions">
          <button className="mb-btn secondary" onClick={onCancel}>Cancel</button>
          <button className="mb-btn" onClick={onConfirm}>Yes, restart <i className="bi bi-arrow-right" /></button>
        </div>
      </div>
    </div>
  );
}

// The misconceptions[] seed data is written as "Short Label — full explanation".
// The label is the short, specific mistake-type tag for the review card;
// the explanation after the dash is the plain-language "why" for that tag.
function misconceptionTag(rootCause) {
  if (!rootCause) return '';
  const idx = rootCause.indexOf('—');
  return idx === -1 ? rootCause : rootCause.slice(0, idx).trim();
}
function misconceptionExplanation(rootCause) {
  if (!rootCause) return '';
  const idx = rootCause.indexOf('—');
  return idx === -1 ? '' : rootCause.slice(idx + 1).trim();
}

// The detail block shown under a wrong answer: what kind of mistake it was,
// why it felt right at the time, and what to do differently — pulled straight
// from the matching misconceptions[] entry so it's specific to *this* wrong option.
function MistakeInsight({ item, chosenOpt }) {
  if (!chosenOpt || !chosenOpt.misconceptionId) return null;
  const misconception = (item.misconceptions || []).find((m) => m.misconceptionId === chosenOpt.misconceptionId);
  if (!misconception) return null;
  const tag = misconceptionTag(misconception.rootCause);
  const description = misconception.description || '';
  const why = misconceptionExplanation(misconception.rootCause);
  const fix = misconception.remediation || '';
  if (!tag && !description && !why && !fix) return null;
  return (
    <div className="mb-mistake-insight">
      {tag && <span className="mistake-tag">{tag}</span>}
      {description && <div className="mistake-description"><strong>What happened:</strong> <MathText>{description}</MathText></div>}
      {why && <div className="mistake-why"><strong>Why this happens:</strong> <MathText>{why}</MathText></div>}
      {fix && <div className="mistake-fix"><strong>How to fix it:</strong> <MathText>{fix}</MathText></div>}
    </div>
  );
}

// Per-cluster accuracy across attempted questions, weakest first — this is
// what turns a flat list of right/wrong cards into an actual gap diagnosis.
function computeClusterGaps(items, answeredMap, clusterNames) {
  const stats = {};
  items.forEach((q) => {
    const rec = answeredMap[q.itemId];
    if (!rec || rec.unattempted) return;
    if (!stats[q.cluster]) stats[q.cluster] = { correct: 0, total: 0 };
    stats[q.cluster].total++;
    if (rec.correct) stats[q.cluster].correct++;
  });
  return Object.entries(stats)
    .map(([cluster, s]) => ({
      cluster,
      name: clusterNames[cluster] || cluster,
      correct: s.correct,
      total: s.total,
      wrong: s.total - s.correct,
      accuracy: s.total ? s.correct / s.total : 1
    }))
    .sort((a, b) => (b.wrong - a.wrong) || (a.accuracy - b.accuracy));
}

// Any mistake-type tag that shows up on 2+ wrong answers is a pattern worth
// calling out on its own, not just two separate one-off mistakes.
function computeRepeatedMistakeTags(items, answeredMap, shuffledMapRef) {
  const counts = new Map();
  items.forEach((q) => {
    const rec = answeredMap[q.itemId];
    if (!rec || rec.unattempted || rec.correct) return;
    const shuffled = shuffledMapRef.current[q.itemId] || [];
    const chosenOpt = shuffled[rec.chosenIdx];
    if (!chosenOpt || !chosenOpt.misconceptionId) return;
    const misconception = (q.misconceptions || []).find((m) => m.misconceptionId === chosenOpt.misconceptionId);
    const tag = misconception ? misconceptionTag(misconception.rootCause) : '';
    if (!tag) return;
    counts.set(tag, (counts.get(tag) || 0) + 1);
  });
  return [...counts.entries()]
    .filter(([, count]) => count >= 2)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

function GapSummary({ items, answeredMap, shuffledMapRef, clusterNames }) {
  const clusters = computeClusterGaps(items, answeredMap, clusterNames);
  const repeated = computeRepeatedMistakeTags(items, answeredMap, shuffledMapRef);
  if (clusters.length === 0) return null;
  return (
    <div className="mb-gap-summary">
      <h3>Where you need work</h3>
      <div className="mb-gap-clusters">
        {clusters.map((c) => {
          const tier = c.wrong === 0 ? 'strong' : c.accuracy < 0.5 ? 'weak' : 'shaky';
          return (
            <div className={`mb-gap-row mb-gap-${tier}`} key={c.cluster}>
              <span className="mb-gap-name">{c.name}</span>
              <span className="mb-gap-score">{c.correct}/{c.total} correct</span>
            </div>
          );
        })}
      </div>
      {repeated.length > 0 && (
        <div className="mb-gap-patterns">
          {repeated.map((r) => (
            <div key={r.tag} className="mb-gap-pattern-callout">
              Repeated pattern: <strong>{r.tag}</strong> (seen {r.count}&times;) &mdash; worth extra practice.
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// One row of the review list, covering all three outcomes: correct,
// incorrect, or never attempted. `shuffledMapRef` only has an entry once a
// question has actually been rendered on screen, so an item that was never
// reached (e.g. timer ran out first) falls back to its unshuffled options —
// still enough to show the correct answer and feedback.
function ReviewItemCard({ item, rec, shuffledMapRef }) {
  const shuffled = shuffledMapRef.current[item.itemId] || item.options || [];
  const correctOpt = shuffled.find((o) => o.correct);
  const attempted = !!rec && !rec.unattempted;
  const chosenOpt = attempted ? shuffled[rec.chosenIdx] : null;
  const isCorrect = attempted && rec.correct;

  let icon = '○';
  let statusClass = 'mb-review-unattempted';
  if (attempted) {
    icon = isCorrect ? '✓' : '✗';
    statusClass = isCorrect ? 'mb-review-correct' : 'mb-review-incorrect';
  }

  return (
    <div className={`mb-review-item ${statusClass}`}>
      <div className="q">{icon} <MathText html={item.question} /></div>
      {attempted ? (
        <>
          <div className="your-ans">Your answer: <MathText>{chosenOpt ? chosenOpt.text : '—'}</MathText> {!isCorrect && '(incorrect)'}</div>
          <div className="correct-ans">Correct answer: <MathText>{correctOpt ? correctOpt.text : '—'}</MathText></div>
          <div className="feedback-detail"><strong>Feedback:</strong> <MathText>{correctOpt ? correctOpt.feedback : ''}</MathText></div>
          {!isCorrect && <MistakeInsight item={item} chosenOpt={chosenOpt} />}
        </>
      ) : (
        <>
          <div className="your-ans not-attempted">Not attempted</div>
          <div className="correct-ans">Correct answer: <MathText>{correctOpt ? correctOpt.text : '—'}</MathText></div>
          <div className="feedback-detail"><strong>Feedback:</strong> <MathText>{correctOpt ? correctOpt.feedback : ''}</MathText></div>
        </>
      )}
    </div>
  );
}

function ReviewModal({ cluster, clusterName, items, answeredMap, shuffledMapRef, onClose }) {
  return (
    <div className="mb-modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="mb-modal-content">
        <button className="mb-modal-close" onClick={onClose} aria-label="Close"><i className="bi bi-x-lg" /></button>
        <h3><i className="bi bi-journal-text" /> Review: {clusterName}</h3>
        {items.length === 0 && <p>No questions in this cluster.</p>}
        {items.map((item) => (
          <ReviewItemCard key={item.itemId} item={item} rec={answeredMap[item.itemId]} shuffledMapRef={shuffledMapRef} />
        ))}
      </div>
    </div>
  );
}

function WarmupReviewList({ items, answeredMap, shuffledMapRef }) {
  if (items.length === 0) {
    return <p>No warm-up questions yet.</p>;
  }
  return (
    <div className="mb-warmup-review">
      {items.map((item) => (
        <ReviewItemCard key={item.itemId} item={item} rec={answeredMap[item.itemId]} shuffledMapRef={shuffledMapRef} />
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------
// Main engine
// ---------------------------------------------------------------------

export default function MathBootcamp() {
  const { grade, chapterSlug, level } = useParams();
  const levelNum = Number(level);
  const timed = levelNum === 4;
  const navigate = useNavigate();

  const [phase, setPhase] = useState('loading'); // loading|error|warmup|gate|diagnostic|results|recheck|final
  const [session, setSession] = useState(null);
  const [meta, setMeta] = useState(null);
  const [warmupQuestions, setWarmupQuestions] = useState([]);
  const [diagnosticQuestions, setDiagnosticQuestions] = useState([]);
  const [recheckBank, setRecheckBank] = useState([]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answeredMap, setAnsweredMap] = useState({});
  const [warmupAttempts, setWarmupAttempts] = useState({});
  const [warmupFirstCorrect, setWarmupFirstCorrect] = useState({});
  const [warmupWrongIdx, setWarmupWrongIdx] = useState({});

  const [recheckItems, setRecheckItems] = useState([]);
  const [recheckIndex, setRecheckIndex] = useState(0);
  const [recheckAnswered, setRecheckAnswered] = useState({});
  const [recheckSkipped, setRecheckSkipped] = useState(false);

  const [showGateReview, setShowGateReview] = useState(false);
  const [reviewCluster, setReviewCluster] = useState(null);
  const [showRestartModal, setShowRestartModal] = useState(false);
  const [showBreakdown, setShowBreakdown] = useState(false);

  const [timeRemaining, setTimeRemaining] = useState(0);
  const [timerVisible, setTimerVisible] = useState(true);

  const shuffledOptionsRef = useRef({});
  const recheckShuffledRef = useRef({});
  const timeLogRef = useRef({}); // itemId -> { elapsed, correct }
  const questionStartRef = useRef(null);
  const timerIntervalRef = useRef(null);
  const timerPausedRef = useRef(false);
  const cardRef = useRef(null);
  const warmupSubmitRef = useRef(false);
  const diagnosticSubmitRef = useRef(false);
  const finalSubmitRef = useRef(false);
  const savedAttemptIdRef = useRef(null);

  // -------------------------------------------------------------
  // Load session + catalog + questions
  // -------------------------------------------------------------
  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const sessionRes = await apiFetch('/session-info');
        if (!sessionRes.ok) {
          navigate(`/login?redirectPath=${encodeURIComponent(`/math/${grade}/${chapterSlug}/${level}`)}`);
          return;
        }
        const sessionData = await sessionRes.json();
        if (cancelled) return;
        setSession({ username: sessionData.username, email: sessionData.email });

        const [catalogRes, questionsRes] = await Promise.all([
          apiFetch('/math/catalog'),
          apiFetch(`/math/questions?grade=${grade}&chapter=${chapterSlug}&level=${levelNum}`)
        ]);
        if (cancelled) return;

        if (!catalogRes.ok || !questionsRes.ok) {
          setPhase('error');
          return;
        }

        const catalog = await catalogRes.json();
        const questions = await questionsRes.json();
        if (cancelled) return;

        const chapterMeta = catalog.find(
          (c) => c.grade === grade && c.chapterSlug === chapterSlug && c.level === levelNum
        );
        setMeta(chapterMeta || null);

        const warmup = questions.filter((q) => q.phase === 'warmup').sort((a, b) => a.order - b.order);
        const diagnostic = questions.filter((q) => q.phase === 'diagnostic').sort((a, b) => a.order - b.order);
        const recheck = shuffleArray(questions.filter((q) => q.phase === 'recheck'));

        setWarmupQuestions(warmup);
        setDiagnosticQuestions(diagnostic);
        setRecheckBank(recheck);

        if (chapterMeta && chapterMeta.timedSeconds > 0) {
          setTimeRemaining(chapterMeta.timedSeconds);
        }

        if (warmup.length === 0) {
          setPhase('error');
        } else {
          setPhase('warmup');
        }
      } catch (err) {
        if (!cancelled) setPhase('error');
      }
    }

    load();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [grade, chapterSlug, level]);

  // Math typesetting is handled per-node by <MathText> (see its definition
  // above), not from a shared effect here — see that component's comment for
  // why a single top-level effect was the wrong place for this.

  // -------------------------------------------------------------
  // Timer (level 4 only)
  // -------------------------------------------------------------
  const endDiagnostic = useCallback(() => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    setAnsweredMap((prev) => {
      const next = { ...prev };
      diagnosticQuestions.forEach((q) => {
        if (!next[q.itemId]) next[q.itemId] = { correct: false, chosenIdx: -1, unattempted: true };
      });
      return next;
    });
    setPhase('results');
  }, [diagnosticQuestions]);

  useEffect(() => {
    if (phase !== 'diagnostic' || !timed) return undefined;
    timerIntervalRef.current = setInterval(() => {
      if (timerPausedRef.current) return;
      setTimeRemaining((t) => {
        if (t <= 1) {
          clearInterval(timerIntervalRef.current);
          endDiagnostic();
          return 0;
        }
        const next = t - 1;
        if (next <= 120 && !timerVisible) setTimerVisible(true);
        return next;
      });
    }, 1000);
    return () => clearInterval(timerIntervalRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, timed, endDiagnostic]);

  useEffect(() => {
    if (phase === 'diagnostic' && timed) {
      questionStartRef.current = Date.now();
    }
  }, [phase, timed, currentIndex]);

  function recordTime(itemId, correct) {
    if (questionStartRef.current) {
      const elapsed = (Date.now() - questionStartRef.current) / 1000;
      timeLogRef.current[itemId] = { elapsed, correct };
    }
  }

  // -------------------------------------------------------------
  // Warm-up
  // -------------------------------------------------------------
  const warmupItem = warmupQuestions[currentIndex];

  function handleWarmupChoice(item, chosenIdx) {
    if (answeredMap[item.itemId]) return;
    const shuffled = getShuffled(item, shuffledOptionsRef);
    const isCorrect = shuffled[chosenIdx].correct;
    const attempt = warmupAttempts[item.itemId] || 0;

    if (attempt === 0) {
      setWarmupFirstCorrect((prev) => ({ ...prev, [item.itemId]: isCorrect }));
      if (!isCorrect) {
        setWarmupAttempts((prev) => ({ ...prev, [item.itemId]: 1 }));
        setWarmupWrongIdx((prev) => ({ ...prev, [item.itemId]: chosenIdx }));
        return;
      }
    }

    setAnsweredMap((prev) => ({ ...prev, [item.itemId]: { correct: isCorrect, chosenIdx } }));
  }

  function advanceWarmup() {
    if (currentIndex + 1 < warmupQuestions.length) {
      setCurrentIndex((i) => i + 1);
    } else {
      setCurrentIndex(0);
      setPhase('gate');
    }
  }

  // -------------------------------------------------------------
  // Diagnostic
  // -------------------------------------------------------------
  const diagnosticItem = diagnosticQuestions[currentIndex];

  function handleDiagnosticChoice(item, chosenIdx) {
    if (answeredMap[item.itemId]) return;
    const shuffled = getShuffled(item, shuffledOptionsRef);
    const isCorrect = shuffled[chosenIdx].correct;
    if (timed) {
      timerPausedRef.current = true;
      recordTime(item.itemId, isCorrect);
    }
    setAnsweredMap((prev) => ({ ...prev, [item.itemId]: { correct: isCorrect, chosenIdx } }));
  }

  function handleSkip() {
    const item = diagnosticQuestions[currentIndex];
    if (!item) return;
    recordTime(item.itemId, false);
    setAnsweredMap((prev) => ({ ...prev, [item.itemId]: { correct: false, chosenIdx: -1, unattempted: true } }));
    if (currentIndex + 1 < diagnosticQuestions.length) {
      setCurrentIndex((i) => i + 1);
    } else {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      setPhase('results');
    }
  }

  function advanceDiagnostic() {
    if (timed) timerPausedRef.current = false;
    if (currentIndex + 1 < diagnosticQuestions.length) {
      setCurrentIndex((i) => i + 1);
    } else {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      setPhase('results');
    }
  }

  // -------------------------------------------------------------
  // Recheck
  // -------------------------------------------------------------
  const recheckItem = recheckItems[recheckIndex];

  function handleRecheckChoice(item, chosenIdx) {
    if (recheckAnswered[item.itemId]) return;
    const shuffled = getShuffled(item, recheckShuffledRef);
    const isCorrect = shuffled[chosenIdx].correct;
    setRecheckAnswered((prev) => ({ ...prev, [item.itemId]: { correct: isCorrect, chosenIdx } }));
  }

  function advanceRecheck() {
    let nextIdx = recheckIndex + 1;
    while (nextIdx < recheckItems.length && recheckAnswered[recheckItems[nextIdx].itemId]) nextIdx++;
    if (nextIdx < recheckItems.length) {
      setRecheckIndex(nextIdx);
    } else {
      setPhase('final');
    }
  }

  function startRecheck() {
    // Criteria: a strong diagnostic (>=90%) doesn't need a re-check at all.
    if (diagnosticStats.percent >= 90) {
      setRecheckSkipped(true);
      setRecheckItems([]);
      setRecheckIndex(0);
      setRecheckAnswered({});
      setPhase('final');
      return;
    }

    let items;
    if (timed) {
      const slowZoneIds = new Set();
      diagnosticQuestions.forEach((q) => {
        const rec = answeredMap[q.itemId];
        const t = timeLogRef.current[q.itemId];
        if (rec && !rec.correct) slowZoneIds.add(q.itemId);
        else if (t && t.elapsed > 90) slowZoneIds.add(q.itemId);
      });
      items = recheckBank.filter((r) => slowZoneIds.has(r.recheckFor));
      if (items.length === 0) items = recheckBank.slice(0, 5);
    } else {
      // Only bring back questions from clusters the student actually got wrong.
      const wrongClusters = new Set(
        diagnosticQuestions
          .filter((q) => {
            const rec = answeredMap[q.itemId];
            return rec && !rec.unattempted && !rec.correct;
          })
          .map((q) => q.cluster)
      );
      items = recheckBank.filter((r) => wrongClusters.has(r.cluster));
      if (items.length === 0) items = recheckBank.slice(0, 5);
    }
    setRecheckSkipped(false);
    setRecheckItems(items);
    setRecheckIndex(0);
    setRecheckAnswered({});
    setPhase('recheck');
  }

  // -------------------------------------------------------------
  // Derived stats
  // -------------------------------------------------------------
  const diagnosticStats = useMemo(() => {
    const total = diagnosticQuestions.length;
    const correct = diagnosticQuestions.filter((q) => answeredMap[q.itemId]?.correct).length;
    return { total, correct, percent: total ? (correct / total) * 100 : 0 };
  }, [diagnosticQuestions, answeredMap]);

  const diagnosticClusterErrors = useMemo(() => {
    const errors = {};
    diagnosticQuestions.forEach((q) => {
      const rec = answeredMap[q.itemId];
      if (rec && !rec.unattempted) {
        if (!(q.cluster in errors)) errors[q.cluster] = 0;
        if (!rec.correct) errors[q.cluster]++;
      }
    });
    return errors;
  }, [diagnosticQuestions, answeredMap]);

  const slowZoneItems = useMemo(() => {
    if (!timed) return [];
    const ids = new Set();
    diagnosticQuestions.forEach((q) => {
      const rec = answeredMap[q.itemId];
      const t = timeLogRef.current[q.itemId];
      if (rec && !rec.unattempted && !rec.correct) ids.add(q.itemId);
      else if (t && t.elapsed > 90) ids.add(q.itemId);
    });
    return [...ids];
  }, [timed, diagnosticQuestions, answeredMap, phase]);

  // -------------------------------------------------------------
  // Score submission — checkpointed after warm-up, diagnostic, and recheck,
  // so progress is never lost even if the user stops partway through.
  // -------------------------------------------------------------
  function buildDiagnosticSummary() {
    const warmupTotal = warmupQuestions.length;
    const warmupCorrect = warmupQuestions.filter((q) => warmupFirstCorrect[q.itemId] === true).length;

    const diagAnswers = diagnosticQuestions.map((q) => {
      const rec = answeredMap[q.itemId] || { correct: false, chosenIdx: -1, unattempted: true };
      const t = timeLogRef.current[q.itemId];
      const shuffled = shuffledOptionsRef.current[q.itemId] || [];
      const chosenOpt = shuffled[rec.chosenIdx];
      return {
        item_id: q.itemId,
        phase: 'diagnostic',
        cluster: q.cluster,
        chosen_index: rec.chosenIdx,
        option_index: chosenOpt ? q.options.indexOf(chosenOpt) : -1,
        is_correct: !!rec.correct,
        misconception_id: (!rec.correct && chosenOpt) ? (chosenOpt.misconceptionId || '') : '',
        skipped: !!rec.unattempted,
        time_elapsed: t ? t.elapsed : 0,
        points_awarded: rec.correct ? q.points : 0
      };
    });

    const diagnosticCorrect = diagAnswers.filter((a) => a.is_correct).length;
    const diagnosticUnattempted = diagAnswers.filter((a) => a.skipped).length;
    const correctTimes = diagAnswers.filter((a) => a.is_correct).map((a) => a.time_elapsed);
    const avgTime = correctTimes.length
      ? correctTimes.reduce((s, v) => s + v, 0) / correctTimes.length
      : 0;

    return { warmupCorrect, warmupTotal, diagAnswers, diagnosticCorrect, diagnosticUnattempted, avgTime };
  }

  function buildWarmupAnswers() {
    return warmupQuestions
      .filter((q) => answeredMap[q.itemId])
      .map((q) => {
        const rec = answeredMap[q.itemId];
        const shuffled = shuffledOptionsRef.current[q.itemId] || [];
        const chosenOpt = shuffled[rec.chosenIdx];
        return {
          item_id: q.itemId,
          phase: 'warmup',
          cluster: q.cluster,
          chosen_index: rec.chosenIdx,
          option_index: chosenOpt ? q.options.indexOf(chosenOpt) : -1,
          is_correct: !!rec.correct,
          misconception_id: (!rec.correct && chosenOpt) ? (chosenOpt.misconceptionId || '') : '',
          skipped: false,
          time_elapsed: 0,
          points_awarded: 0
        };
      });
  }

  function buildRecheckAnswers() {
    return recheckItems.map((q) => {
      const rec = recheckAnswered[q.itemId];
      const shuffled = recheckShuffledRef.current[q.itemId] || [];
      const chosenOpt = rec ? shuffled[rec.chosenIdx] : null;
      return {
        item_id: q.itemId,
        phase: 'recheck',
        cluster: q.cluster,
        chosen_index: rec ? rec.chosenIdx : -1,
        option_index: chosenOpt ? q.options.indexOf(chosenOpt) : -1,
        is_correct: rec ? !!rec.correct : false,
        misconception_id: (rec && !rec.correct && chosenOpt) ? (chosenOpt.misconceptionId || '') : '',
        skipped: !rec,
        time_elapsed: 0,
        points_awarded: rec && rec.correct ? q.points : 0
      };
    });
  }

  // Creates the attempt on first use, then patches that same attempt on every
  // later checkpoint so a single session never produces duplicate rows.
  async function saveOrUpdateAttempt(fields) {
    if (!session) return;

    if (savedAttemptIdRef.current) {
      try {
        const res = await apiFetch(`/math/scores/${savedAttemptIdRef.current}`, {
          method: 'PATCH',
          body: JSON.stringify({ email: session.email, updates: fields })
        });
        if (!res.ok) {
          console.error('[math bootcamp] failed to update attempt, status', res.status, await res.text().catch(() => ''));
        } else {
          console.log('[math bootcamp] attempt updated:', savedAttemptIdRef.current, fields);
        }
      } catch (err) {
        console.error('[math bootcamp] network error updating attempt:', err);
      }
      return;
    }

    const attempt = {
      grade,
      chapter_slug: chapterSlug,
      chapter_name: meta ? meta.chapterName : chapterSlug,
      level: levelNum,
      warmup_correct: 0,
      warmup_total: warmupQuestions.length,
      diagnostic_correct: 0,
      diagnostic_total: diagnosticQuestions.length,
      diagnostic_unattempted: diagnosticQuestions.length,
      recheck_correct: 0,
      recheck_total: 0,
      total_score: 0,
      avg_time_per_correct: 0,
      answers: [],
      ...fields
    };

    try {
      const res = await apiFetch('/math/scores', {
        method: 'POST',
        body: JSON.stringify({ username: session.username, email: session.email, attempt })
      });
      if (!res.ok) {
        console.error('[math bootcamp] failed to save attempt, status', res.status, await res.text().catch(() => ''));
        return;
      }
      const data = await res.json();
      if (data?.attemptId) {
        savedAttemptIdRef.current = data.attemptId;
        console.log('[math bootcamp] attempt saved:', data.attemptId, fields);
      }
    } catch (err) {
      console.error('[math bootcamp] network error saving attempt:', err);
    }
  }

  // Checkpoint 1: warm-up complete (gate screen reached) — saves even if the
  // user never touches the diagnostic.
  useEffect(() => {
    if (phase !== 'gate' || warmupSubmitRef.current || !session) return;
    warmupSubmitRef.current = true;

    const warmupTotal = warmupQuestions.length;
    const warmupCorrect = warmupQuestions.filter((q) => warmupFirstCorrect[q.itemId] === true).length;

    saveOrUpdateAttempt({
      warmup_correct: warmupCorrect,
      warmup_total: warmupTotal,
      diagnostic_total: diagnosticQuestions.length,
      diagnostic_unattempted: diagnosticQuestions.length,
      answers: buildWarmupAnswers()
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  // Checkpoint 2: diagnostic complete (results screen reached).
  useEffect(() => {
    if (phase !== 'results' || diagnosticSubmitRef.current || !session) return;
    diagnosticSubmitRef.current = true;

    const { warmupCorrect, warmupTotal, diagAnswers, diagnosticCorrect, diagnosticUnattempted, avgTime } = buildDiagnosticSummary();
    const totalScore = diagAnswers.reduce((s, a) => s + a.points_awarded, 0);

    saveOrUpdateAttempt({
      warmup_correct: warmupCorrect,
      warmup_total: warmupTotal,
      diagnostic_correct: diagnosticCorrect,
      diagnostic_total: diagnosticQuestions.length,
      diagnostic_unattempted: diagnosticUnattempted,
      total_score: totalScore,
      avg_time_per_correct: avgTime,
      answers: [...buildWarmupAnswers(), ...diagAnswers]
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  // Checkpoint 3: recheck complete (final summary reached).
  useEffect(() => {
    if (phase !== 'final' || finalSubmitRef.current || !session) return;
    finalSubmitRef.current = true;

    const { warmupCorrect, warmupTotal, diagAnswers, diagnosticCorrect, diagnosticUnattempted } = buildDiagnosticSummary();
    const recheckAnswers = buildRecheckAnswers();
    const recheckCorrect = recheckAnswers.filter((a) => a.is_correct).length;
    const totalScore = [...diagAnswers, ...recheckAnswers].reduce((s, a) => s + a.points_awarded, 0);

    saveOrUpdateAttempt({
      warmup_correct: warmupCorrect,
      warmup_total: warmupTotal,
      diagnostic_correct: diagnosticCorrect,
      diagnostic_total: diagnosticQuestions.length,
      diagnostic_unattempted: diagnosticUnattempted,
      recheck_correct: recheckCorrect,
      recheck_total: recheckItems.length,
      total_score: totalScore,
      answers: [...buildWarmupAnswers(), ...diagAnswers, ...recheckAnswers]
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  function restart() {
    window.location.reload();
  }

  // -------------------------------------------------------------
  // Render
  // -------------------------------------------------------------
  if (phase === 'loading') {
    return <div className="mb-container"><p className="mb-loading"><i className="bi bi-arrow-repeat mb-spin" /> Loading bootcamp&hellip;</p></div>;
  }
  if (phase === 'error') {
    return (
      <div className="mb-container">
        <div className="mb-card mb-gate-card">
          <div className="mb-gate-icon"><i className="bi bi-exclamation-circle" /></div>
          <p>No questions are loaded for this chapter yet.</p>
          <Link className="mb-btn" to="/math"><i className="bi bi-arrow-left" /> Back to Math Hub</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-container">
      <header className="mb-header">
        <Link className="mb-back-link" to="/math"><i className="bi bi-arrow-left" /> Back to Math Hub</Link>

        {meta && (meta.gradeLabel || meta.chapterName) && (
          <div className="mb-header-eyebrow">
            {meta.gradeLabel && <span className="mb-eyebrow-chip">{meta.gradeLabel}</span>}
            {meta.chapterName && <span className="mb-eyebrow-chip">{meta.chapterName}</span>}
            <span className={`mb-eyebrow-chip mb-eyebrow-level${timed ? ' timed' : ''}`}>
              <i className={`bi ${timed ? 'bi-stopwatch-fill' : 'bi-flag-fill'}`} />
              {timed ? 'Level 4 · Timed' : `Level ${levelNum}`}
            </span>
          </div>
        )}

        <h2>{meta ? meta.title : 'Math Bootcamp'}</h2>
        <p>{meta ? meta.subtitle : ''}</p>

        {timed && phase === 'diagnostic' && (
          <div className="mb-timer-area">
            <i className="bi bi-clock-history mb-timer-icon" />
            <span className={`mb-timer-display ${timeRemaining < 60 ? 'danger' : timeRemaining < 300 ? 'warning' : ''}`}>
              {timerVisible ? formatTime(timeRemaining) : '--:--'}
            </span>
            <button className="mb-hide-timer-btn" onClick={() => setTimerVisible((v) => !v)}>
              <i className={`bi ${timerVisible ? 'bi-eye-slash' : 'bi-eye'}`} /> {timerVisible ? 'Hide Timer' : 'Show Timer'}
            </button>
          </div>
        )}

        {(phase === 'warmup' || phase === 'diagnostic') && (
          <div className="mb-progress-indicator">
            {(() => {
              const items = phase === 'warmup' ? warmupQuestions : diagnosticQuestions;
              const idx = currentIndex;
              const total = items.length;
              const pct = total ? Math.round(((idx + 1) / total) * 100) : 0;
              return (
                <>
                  <span>Question {idx + 1} of {total}</span>
                  <div className="mb-progress-bar-outer"><div className="mb-progress-bar-inner" style={{ width: `${pct}%` }} /></div>
                  <span>{pct}%</span>
                </>
              );
            })()}
          </div>
        )}
        {phase === 'recheck' && (
          <div className="mb-progress-indicator">
            <span>Question {recheckIndex + 1} of {recheckItems.length}</span>
            <div className="mb-progress-bar-outer">
              <div className="mb-progress-bar-inner" style={{ width: `${recheckItems.length ? Math.round(((recheckIndex + 1) / recheckItems.length) * 100) : 0}%` }} />
            </div>
          </div>
        )}
      </header>

      {phase === 'warmup' && warmupItem && (
        <>
          <NavBar items={warmupQuestions} activeIndex={currentIndex} answeredMap={answeredMap} onSelect={setCurrentIndex} />
          <QuestionCard
            innerRef={cardRef}
            item={warmupItem}
            index={currentIndex}
            clusterLabel={warmupItem.clusterName}
            record={answeredMap[warmupItem.itemId]}
            shuffledMapRef={shuffledOptionsRef}
            onChoice={(idx) => handleWarmupChoice(warmupItem, idx)}
            onNext={advanceWarmup}
            wrongIdx={warmupWrongIdx[warmupItem.itemId]}
            hint={warmupAttempts[warmupItem.itemId] === 1 ? warmupItem.retryHint : null}
          />
        </>
      )}

      {phase === 'gate' && (
        <div className="mb-card mb-gate-card" ref={cardRef}>
          <div className="mb-gate-icon"><i className={`bi ${timed ? 'bi-stopwatch' : 'bi-check2-circle'}`} /></div>
          <h2>{timed ? 'Timed Diagnostic' : 'Warm-up complete'}</h2>
          {warmupQuestions.every((q) => warmupFirstCorrect[q.itemId] === true) && <p className="mb-celebrate"><i className="bi bi-stars" /> Perfect warm-up!</p>}
          {timed ? (
            <>
              <p>
                You have <strong>{Math.floor((meta?.timedSeconds || 0) / 60)} minutes</strong> for {diagnosticQuestions.length} questions.<br />
                Skip freely and come back; the timer pauses when you answer.<br />
                <strong>Good luck!</strong>
              </p>
              <button
                className="mb-btn"
                onClick={() => {
                  setPhase('diagnostic');
                  setCurrentIndex(0);
                }}
              >
                Begin Timed Diagnostic ({Math.floor((meta?.timedSeconds || 0) / 60)} min) <i className="bi bi-arrow-right" />
              </button>
            </>
          ) : (
            <>
              <p>
                Now the diagnostic will mix things up to find your real gaps.<br />
                <strong>Mistakes here are useful information, not failure.</strong>
              </p>
              <button className="mb-btn" onClick={() => { setPhase('diagnostic'); setCurrentIndex(0); }}>
                I&apos;m ready &mdash; start diagnostic <i className="bi bi-arrow-right" />
              </button>{' '}
              <button className="mb-btn secondary" onClick={() => setShowGateReview((v) => !v)}>
                <i className="bi bi-journal-text" /> I want to review first
              </button>
              {showGateReview && (
                <div className="mb-gate-review-section">
                  {meta && (
                    <>
                      <h3>Quick Review</h3>
                      <MathText as="div" className="mb-review-card" html={meta.gateReviewHTML} />
                    </>
                  )}
                  <GapSummary
                    items={warmupQuestions}
                    answeredMap={answeredMap}
                    shuffledMapRef={shuffledOptionsRef}
                    clusterNames={meta?.clusterNames || {}}
                  />
                  <h3>Your Warm-up Answers</h3>
                  <WarmupReviewList
                    items={warmupQuestions}
                    answeredMap={answeredMap}
                    shuffledMapRef={shuffledOptionsRef}
                  />
                </div>
              )}
            </>
          )}
        </div>
      )}

      {phase === 'diagnostic' && diagnosticItem && (
        <>
          <NavBar items={diagnosticQuestions} activeIndex={currentIndex} answeredMap={answeredMap} onSelect={setCurrentIndex} />
          <QuestionCard
            innerRef={cardRef}
            item={diagnosticItem}
            index={currentIndex}
            clusterLabel={diagnosticItem.clusterName}
            record={answeredMap[diagnosticItem.itemId]}
            shuffledMapRef={shuffledOptionsRef}
            onChoice={(idx) => handleDiagnosticChoice(diagnosticItem, idx)}
            onNext={advanceDiagnostic}
            onSkip={timed ? handleSkip : null}
            showBackForward
          />
        </>
      )}

      {phase === 'results' && (
        <ResultsScreen
          timed={timed}
          diagnosticQuestions={diagnosticQuestions}
          answeredMap={answeredMap}
          timeLogRef={timeLogRef}
          diagnosticClusterErrors={diagnosticClusterErrors}
          slowZoneItems={slowZoneItems}
          meta={meta}
          showBreakdown={showBreakdown}
          setShowBreakdown={setShowBreakdown}
          onReviewCluster={setReviewCluster}
          onStartRecheck={startRecheck}
          onRestart={() => setShowRestartModal(true)}
          cardRef={cardRef}
          diagnosticPercent={diagnosticStats.percent}
        />
      )}

      {phase === 'recheck' && recheckItem && (
        <>
          <NavBar items={recheckItems} activeIndex={recheckIndex} answeredMap={recheckAnswered} onSelect={setRecheckIndex} />
          <RecheckCard
            innerRef={cardRef}
            item={recheckItem}
            index={recheckIndex}
            record={recheckAnswered[recheckItem.itemId]}
            shuffledMapRef={recheckShuffledRef}
            onChoice={(idx) => handleRecheckChoice(recheckItem, idx)}
            onNext={advanceRecheck}
          />
        </>
      )}

      {phase === 'final' && (
        <FinalSummary
          cardRef={cardRef}
          recheckItems={recheckItems}
          recheckAnswered={recheckAnswered}
          diagnosticClusterErrors={diagnosticClusterErrors}
          clusterNames={meta ? meta.clusterNames : {}}
          onRestart={() => setShowRestartModal(true)}
          recheckSkipped={recheckSkipped}
          diagnosticPercent={diagnosticStats.percent}
        />
      )}

      {reviewCluster && meta && (
        <ReviewModal
          cluster={reviewCluster}
          clusterName={meta.clusterNames[reviewCluster] || reviewCluster}
          items={diagnosticQuestions.filter((q) => q.cluster === reviewCluster)}
          answeredMap={answeredMap}
          shuffledMapRef={shuffledOptionsRef}
          onClose={() => setReviewCluster(null)}
        />
      )}

      {showRestartModal && (
        <RestartModal onCancel={() => setShowRestartModal(false)} onConfirm={restart} />
      )}
    </div>
  );
}

// ---------------------------------------------------------------------
// Question card (warm-up + diagnostic share this)
// ---------------------------------------------------------------------

function QuestionCard({ innerRef, item, index, clusterLabel, record, shuffledMapRef, onChoice, onNext, onSkip, wrongIdx, hint, showBackForward }) {
  const shuffled = getShuffled(item, shuffledMapRef);
  const locked = record && !record.unattempted;

  return (
    <div className="mb-card" ref={innerRef}>
      <div className="mb-question-meta">
        <span className="mb-question-badge">{clusterLabel} &middot; Q{index + 1}</span>
        {item.tier && <span className="mb-tier-badge" data-tier={item.tier}>{tierLabel(item.tier)}</span>}
      </div>
      <MathText as="div" className="mb-question-title" html={item.question} />
      <div className="mb-options-group">
        {shuffled.map((opt, i) => {
          let state = null;
          let disabled = false;
          if (locked) {
            const correctIdx = shuffled.findIndex((o) => o.correct);
            if (i === correctIdx) state = 'correct';
            else if (i === record.chosenIdx && !record.correct) state = 'incorrect';
            disabled = true;
          } else if (wrongIdx === i) {
            state = 'incorrect';
            disabled = true;
          }
          return (
            <OptionButton key={i} index={i} text={opt.text} state={state} disabled={disabled} onClick={() => onChoice(i)} />
          );
        })}
      </div>

      {!locked && hint && <div className="mb-hint-box"><i className="bi bi-lightbulb-fill" /> <MathText>{hint}</MathText></div>}

      {locked && (
        <div className={`mb-feedback ${record.correct ? 'fb-correct' : 'fb-incorrect'}`}>
          <span className="mb-feedback-icon"><i className={`bi ${record.correct ? 'bi-check-circle-fill' : 'bi-x-circle-fill'}`} /></span>
          <span>
            <strong>{record.correct ? 'Correct!' : 'Incorrect.'}</strong>{' '}
            <MathText>{shuffled[record.chosenIdx] ? shuffled[record.chosenIdx].feedback : 'Skipped.'}</MathText>
            {showBackForward && record.correct && item.backward && <MathText>{' ' + item.backward}</MathText>}
            {showBackForward && record.correct && item.forward && <MathText>{' ' + item.forward}</MathText>}
          </span>
        </div>
      )}

      {locked && (
        <div className="mb-next-hint visible">
          <span onClick={onNext}>Next Question <span className="arrow"><i className="bi bi-arrow-right" /></span></span>
        </div>
      )}

      {!locked && onSkip && (
        <div className="mb-skip-btn">
          <button className="mb-btn secondary" onClick={onSkip}>Skip <i className="bi bi-arrow-right" /></button>
        </div>
      )}
    </div>
  );
}

function tierLabel(tier) {
  return { S: 'Speed', C: 'Core', H: 'Challenge', T: 'Trap' }[tier] || tier;
}

function RecheckCard({ innerRef, item, index, record, shuffledMapRef, onChoice, onNext }) {
  const shuffled = getShuffled(item, shuffledMapRef);
  const locked = !!record;
  return (
    <div className="mb-card" ref={innerRef}>
      <div className="mb-question-meta">
        <span className="mb-question-badge">Re-check Q{index + 1}</span>
      </div>
      <MathText as="div" className="mb-question-title" html={item.question} />
      <div className="mb-options-group">
        {shuffled.map((opt, i) => {
          let state = null;
          if (locked) {
            const correctIdx = shuffled.findIndex((o) => o.correct);
            if (i === correctIdx) state = 'correct';
            else if (i === record.chosenIdx && !record.correct) state = 'incorrect';
          }
          return <OptionButton key={i} index={i} text={opt.text} state={state} disabled={locked} onClick={() => onChoice(i)} />;
        })}
      </div>
      {locked && (
        <div className={`mb-feedback ${record.correct ? 'fb-correct' : 'fb-incorrect'}`}>
          <span className="mb-feedback-icon"><i className={`bi ${record.correct ? 'bi-check-circle-fill' : 'bi-x-circle-fill'}`} /></span>
          <span>
            <strong>{record.correct ? 'Correct!' : 'Incorrect.'}</strong>{' '}
            <MathText>{shuffled[record.chosenIdx] ? shuffled[record.chosenIdx].feedback : ''}</MathText>
          </span>
        </div>
      )}
      {locked && (
        <div className="mb-next-hint visible">
          <span onClick={onNext}>Next Question <span className="arrow"><i className="bi bi-arrow-right" /></span></span>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------
// Results screens
// ---------------------------------------------------------------------

function ResultsScreen({ timed, diagnosticQuestions, answeredMap, timeLogRef, diagnosticClusterErrors, slowZoneItems, meta, showBreakdown, setShowBreakdown, onReviewCluster, onStartRecheck, onRestart, cardRef, diagnosticPercent }) {
  const recheckNeeded = diagnosticPercent < 90;
  if (timed) {
    let totalCorrect = 0, unattempted = 0, totalTime = 0;
    const correctTimes = [];
    diagnosticQuestions.forEach((item) => {
      const rec = answeredMap[item.itemId];
      if (rec && rec.unattempted) unattempted++;
      else if (rec && rec.correct) {
        totalCorrect++;
        const t = timeLogRef.current[item.itemId];
        if (t) { totalTime += t.elapsed; correctTimes.push(t.elapsed); }
      }
    });
    const avg = totalCorrect === 0 ? 'N/A' : `${(totalTime / totalCorrect).toFixed(1)} s`;
    const fastest = correctTimes.length ? `${Math.min(...correctTimes).toFixed(1)} s` : 'N/A';
    const slowest = correctTimes.length ? `${Math.max(...correctTimes).toFixed(1)} s` : 'N/A';

    return (
      <div className="mb-card" ref={cardRef}>
        <h2>Time&apos;s Up!</h2>
        <p>Correct: <strong>{totalCorrect}</strong> / {diagnosticQuestions.length}</p>
        <p>Unattempted: <strong>{unattempted}</strong></p>
        <p>Average time per correct: <strong>{avg}</strong></p>
        <p>Fastest correct: <strong>{fastest}</strong> | Slowest correct: <strong>{slowest}</strong></p>
        <p>Slow-zone items (incorrect or &gt;90s): <strong>{slowZoneItems.length}</strong></p>
        <p>Diagnostic score: <strong>{Math.round(diagnosticPercent)}%</strong></p>
        <button className="mb-btn secondary" onClick={() => setShowBreakdown((v) => !v)}>
          {showBreakdown ? 'Hide' : 'Show'} item-by-item breakdown
        </button>
        {showBreakdown && (
          <table className="mb-results-table">
            <thead><tr><th>Q</th><th>Status</th><th>Time</th></tr></thead>
            <tbody>
              {diagnosticQuestions.map((item, i) => {
                const rec = answeredMap[item.itemId];
                let status = '⚪ Unattempted', timeStr = '—';
                const t = timeLogRef.current[item.itemId];
                if (rec && rec.unattempted) {
                  // stays unattempted
                } else if (rec && rec.correct) {
                  status = '✓ Correct';
                  timeStr = t ? `${t.elapsed.toFixed(1)}s` : '0.0s';
                  if (t && t.elapsed > 90) status += ' (slow)';
                } else if (rec && !rec.correct) {
                  status = '✗ Incorrect';
                  timeStr = t ? `${t.elapsed.toFixed(1)}s` : '0.0s';
                }
                return <tr key={item.itemId}><td>{i + 1}</td><td>{status}</td><td>{timeStr}</td></tr>;
              })}
            </tbody>
          </table>
        )}
        {recheckNeeded ? (
          <p style={{ marginTop: '1rem' }}>Click below for a personalised re-check on your slow and incorrect items.</p>
        ) : (
          <p style={{ marginTop: '1rem' }}>🎉 You scored 90% or higher, so a re-check isn&apos;t necessary.</p>
        )}
        <button className="mb-btn" onClick={onStartRecheck}>{recheckNeeded ? 'Start Personalised Re-check' : 'Continue'} <i className="bi bi-arrow-right" /></button>
        <p style={{ marginTop: '1rem' }}><button className="mb-btn secondary" onClick={onRestart}><i className="bi bi-arrow-clockwise" /> Restart Bootcamp</button></p>
      </div>
    );
  }

  // Untimed levels 1-3 results
  const clusterTotals = {};
  diagnosticQuestions.forEach((q) => { clusterTotals[q.cluster] = (clusterTotals[q.cluster] || 0) + 1; });
  const attemptedCount = diagnosticQuestions.filter((q) => answeredMap[q.itemId]).length;
  const unattempted = diagnosticQuestions.length - attemptedCount;
  const clusterNames = meta ? meta.clusterNames : {};

  return (
    <div className="mb-card" ref={cardRef}>
      <h2>Diagnostic Complete</h2>
      {unattempted > 0 && (
        <p style={{ marginBottom: '1rem' }}>
          You answered <strong>{attemptedCount}</strong> of <strong>{diagnosticQuestions.length}</strong> diagnostic questions.
          Unattempted items don&apos;t count against you &mdash; they just highlight areas to revisit.
        </p>
      )}
      <table className="mb-results-table">
        <thead><tr><th>Skill cluster</th><th>Attempted</th><th>Errors</th></tr></thead>
        <tbody>
          {Object.entries(clusterTotals).map(([cl, total]) => {
            const items = diagnosticQuestions.filter((q) => q.cluster === cl);
            const attemptedItems = items.filter((q) => answeredMap[q.itemId]);
            const attempted = attemptedItems.length;
            const errors = attemptedItems.filter((q) => !answeredMap[q.itemId].correct).length;
            return (
              <tr key={cl}>
                <td>
                  {attempted > 0
                    ? <span className="mb-cluster-clickable" onClick={() => onReviewCluster(cl)}>{clusterNames[cl] || cl}</span>
                    : clusterNames[cl] || cl}
                </td>
                <td>{attempted} of {total}</td>
                <td>{attempted > 0 ? errors : '—'}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p style={{ marginTop: '1rem' }}>
        Diagnostic score: <strong>{Math.round(diagnosticPercent)}%</strong>
        {' '}&middot;{' '}Click a cluster name to review your answers.
      </p>
      {!recheckNeeded && (
        <p>🎉 You scored 90% or higher, so a re-check isn&apos;t necessary.</p>
      )}
      <button className="mb-btn" onClick={onStartRecheck}>{recheckNeeded ? 'Simulate Spaced Re-check' : 'Continue'} <i className="bi bi-arrow-right" /></button>
      <p style={{ marginTop: '1rem' }}><button className="mb-btn secondary" onClick={onRestart}><i className="bi bi-arrow-clockwise" /> Restart Bootcamp</button></p>
    </div>
  );
}

// ---------------------------------------------------------------------
// Final summary (five-way guard)
// ---------------------------------------------------------------------

function FinalSummary({ cardRef, recheckItems, recheckAnswered, diagnosticClusterErrors, clusterNames, onRestart, recheckSkipped, diagnosticPercent }) {
  const correctRecheck = Object.values(recheckAnswered).filter((r) => r.correct).length;
  const totalRecheck = recheckItems.length;
  const attemptedRecheck = Object.keys(recheckAnswered).length;
  const unattemptedRecheck = totalRecheck - attemptedRecheck;

  const wrap = (children) => <div className="mb-card" ref={cardRef}>{children}</div>;

  if (recheckSkipped) {
    return wrap(
      <>
        <h2>No Re-check Needed</h2>
        <p>🎉 You scored <strong>{Math.round(diagnosticPercent)}%</strong> on the diagnostic &mdash; that&apos;s 90% or higher, so a re-check isn&apos;t necessary. Great work!</p>
        <button className="mb-btn" onClick={onRestart}><i className="bi bi-arrow-clockwise" /> Restart Demo</button>
      </>
    );
  }

  if (attemptedRecheck === 0) {
    return wrap(
      <>
        <h2>Re-check Complete</h2>
        <p>You haven&apos;t attempted any re-check items yet. When you&apos;re ready, give them a try &mdash; they&apos;re selected just for you.</p>
        <p style={{ color: '#7d7872' }}>In production, this would target only your weakest areas.</p>
        <button className="mb-btn" onClick={onRestart}><i className="bi bi-arrow-clockwise" /> Restart Demo</button>
      </>
    );
  }
  if (attemptedRecheck < totalRecheck / 2) {
    return wrap(
      <>
        <h2>Re-check Complete</h2>
        <p>You attempted <strong>{attemptedRecheck}</strong> of <strong>{totalRecheck}</strong>. That&apos;s not quite enough to compare with your diagnostic. Try completing the rest to see your progress.</p>
        <p style={{ color: '#7d7872' }}>In production, this would target only your weakest areas.</p>
        <button className="mb-btn" onClick={onRestart}><i className="bi bi-arrow-clockwise" /> Restart Demo</button>
      </>
    );
  }
  if (correctRecheck === 0) {
    return wrap(
      <>
        <h2>Re-check Complete</h2>
        <p>You didn&apos;t get any correct this time. That&apos;s okay &mdash; these were your hardest items from the diagnostic. Review the feedback and try again in a couple of days.</p>
        <p style={{ color: '#7d7872' }}>In production, this would target only your weakest areas.</p>
        <button className="mb-btn" onClick={onRestart}><i className="bi bi-arrow-clockwise" /> Restart Demo</button>
      </>
    );
  }

  const recheckClusterErrors = {};
  recheckItems.forEach((item) => {
    const rec = recheckAnswered[item.itemId];
    if (rec && !rec.correct) recheckClusterErrors[item.cluster] = (recheckClusterErrors[item.cluster] || 0) + 1;
  });
  const attemptedClusters = new Set(recheckItems.filter((item) => recheckAnswered[item.itemId]).map((item) => item.cluster));
  const improved = [];
  const stillNeed = [];
  Object.entries(diagnosticClusterErrors).forEach(([cl, diagErrors]) => {
    if (diagErrors === 0 || !attemptedClusters.has(cl)) return;
    const name = clusterNames[cl] || cl;
    const recErrors = recheckClusterErrors[cl] || 0;
    if (recErrors === 0) improved.push(name);
    else stillNeed.push(`${name} (still ${recErrors} error${recErrors > 1 ? 's' : ''})`);
  });
  Object.entries(recheckClusterErrors).forEach(([cl, recErrors]) => {
    if (recErrors > 0 && !(cl in diagnosticClusterErrors) && attemptedClusters.has(cl)) {
      stillNeed.push(`${clusterNames[cl] || cl} (new, ${recErrors} error${recErrors > 1 ? 's' : ''})`);
    }
  });

  let insight;
  if (correctRecheck === totalRecheck) {
    insight = <p>🎉 Perfect re-check! You got every item correct. Your spaced practice has really paid off.</p>;
  } else {
    insight = (
      <>
        {improved.length > 0 && <p><span className="improved">✓ You improved on:</span> {improved.join(', ')}.</p>}
        {stillNeed.length > 0 && <p><span className="still-need">⚠ Still needs work:</span> {stillNeed.join(', ')}. That&apos;s your next micro-practice target.</p>}
        {improved.length === 0 && stillNeed.length === 0 && <p>You maintained strong skills across all clusters. Well done!</p>}
      </>
    );
  }

  return wrap(
    <>
      <h2>Spaced Re-check Done</h2>
      <p>You got <strong>{correctRecheck}</strong> out of <strong>{totalRecheck}</strong> correct on the re-check.</p>
      {unattemptedRecheck > 0 && (
        <p style={{ marginBottom: '0.5rem' }}>
          You attempted <strong>{attemptedRecheck}</strong> of <strong>{totalRecheck}</strong> re-check items. Unattempted items might still need attention.
        </p>
      )}
      <div className="mb-insight-box">{insight}</div>
      <p style={{ color: '#7d7872' }}>In production, this would happen 2 days later targeting only your weakest areas.</p>
      <button className="mb-btn" onClick={onRestart}><i className="bi bi-arrow-clockwise" /> Restart Demo</button>
    </>
  );
}

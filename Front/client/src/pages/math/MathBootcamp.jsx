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

function OptionButton({ text, state, onClick, disabled }) {
  // state: null | 'correct' | 'incorrect'
  let cls = 'mb-option-btn';
  if (state) cls += ` ${state}`;
  return (
    <button className={cls} onClick={onClick} disabled={disabled} dangerouslySetInnerHTML={{ __html: text }} />
  );
}

function RestartModal({ onCancel, onConfirm }) {
  return (
    <div className="mb-modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onCancel(); }}>
      <div className="mb-modal-content">
        <h3>Restart the bootcamp?</h3>
        <p>Your progress will be lost.</p>
        <div style={{ textAlign: 'right', marginTop: '1.5rem' }}>
          <button className="mb-btn secondary" onClick={onCancel}>Cancel</button>{' '}
          <button className="mb-btn" onClick={onConfirm}>Yes, restart</button>
        </div>
      </div>
    </div>
  );
}

function ReviewModal({ cluster, clusterName, items, answeredMap, shuffledMapRef, onClose }) {
  const attempted = items.filter((q) => answeredMap[q.itemId] && !answeredMap[q.itemId].unattempted);
  return (
    <div className="mb-modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="mb-modal-content">
        <button className="mb-modal-close" onClick={onClose}>&times;</button>
        <h3>Review: {clusterName}</h3>
        {attempted.length === 0 && <p>No questions were attempted in this cluster.</p>}
        {attempted.map((item) => {
          const rec = answeredMap[item.itemId];
          const shuffled = shuffledMapRef.current[item.itemId] || [];
          const correctOpt = shuffled.find((o) => o.correct);
          const chosenOpt = shuffled[rec.chosenIdx];
          const icon = rec.correct ? '✓' : '✗';
          return (
            <div className="mb-review-item" key={item.itemId}>
              <div className="q">{icon} <span dangerouslySetInnerHTML={{ __html: item.question }} /></div>
              <div className="your-ans">Your answer: {chosenOpt ? chosenOpt.text : '—'} {!rec.correct && '(incorrect)'}</div>
              <div className="correct-ans">Correct answer: {correctOpt ? correctOpt.text : '—'}</div>
              <div className="feedback-detail">{chosenOpt ? chosenOpt.feedback : ''}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function WarmupReviewList({ items, answeredMap, shuffledMapRef }) {
  const attempted = items.filter((q) => answeredMap[q.itemId] && !answeredMap[q.itemId].unattempted);
  if (attempted.length === 0) {
    return <p>No warm-up questions were attempted yet.</p>;
  }
  return (
    <div className="mb-warmup-review">
      {attempted.map((item) => {
        const rec = answeredMap[item.itemId];
        const shuffled = shuffledMapRef.current[item.itemId] || [];
        const correctOpt = shuffled.find((o) => o.correct);
        const chosenOpt = shuffled[rec.chosenIdx];
        const icon = rec.correct ? '✓' : '✗';
        return (
          <div className="mb-review-item" key={item.itemId}>
            <div className="q">{icon} <span dangerouslySetInnerHTML={{ __html: item.question }} /></div>
            <div className="your-ans">Your answer: {chosenOpt ? chosenOpt.text : '—'} {!rec.correct && '(incorrect)'}</div>
            <div className="correct-ans">Correct answer: {correctOpt ? correctOpt.text : '—'}</div>
            <div className="feedback-detail">{chosenOpt ? chosenOpt.feedback : ''}</div>
          </div>
        );
      })}
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

  // Typeset math whenever the visible question changes
  useEffect(() => {
    typesetMath(cardRef.current);
  }, [phase, currentIndex, recheckIndex, answeredMap, recheckAnswered, showBreakdown, reviewCluster]);

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
      return {
        item_id: q.itemId,
        phase: 'diagnostic',
        cluster: q.cluster,
        chosen_index: rec.chosenIdx,
        is_correct: !!rec.correct,
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
        return {
          item_id: q.itemId,
          phase: 'warmup',
          cluster: q.cluster,
          chosen_index: rec.chosenIdx,
          is_correct: !!rec.correct,
          skipped: false,
          time_elapsed: 0,
          points_awarded: 0
        };
      });
  }

  function buildRecheckAnswers() {
    return recheckItems.map((q) => {
      const rec = recheckAnswered[q.itemId];
      return {
        item_id: q.itemId,
        phase: 'recheck',
        cluster: q.cluster,
        chosen_index: rec ? rec.chosenIdx : -1,
        is_correct: rec ? !!rec.correct : false,
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
    return <div className="mb-container"><p className="mb-loading">Loading bootcamp&hellip;</p></div>;
  }
  if (phase === 'error') {
    return (
      <div className="mb-container">
        <div className="mb-card">
          <p>No questions are loaded for this chapter yet.</p>
          <Link className="mb-btn" to="/math">Back to Math Hub</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-container">
      <header className="mb-header">
        <Link className="mb-back-link" to="/math">&larr; Back to Math Hub</Link>
        <h2>{meta ? meta.title : 'Math Bootcamp'} {timed && <>&middot; Level 4</>}</h2>
        <p>{meta ? meta.subtitle : ''}</p>

        {timed && phase === 'diagnostic' && (
          <div className="mb-timer-area">
            <span className={`mb-timer-display ${timeRemaining < 60 ? 'danger' : timeRemaining < 300 ? 'warning' : ''}`}>
              {timerVisible ? formatTime(timeRemaining) : '--:--'}
            </span>
            <button className="mb-hide-timer-btn" onClick={() => setTimerVisible((v) => !v)}>
              {timerVisible ? 'Hide Timer' : 'Show Timer'}
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
          <h2>{timed ? 'Timed Diagnostic' : 'Warm-up complete'}</h2>
          {warmupQuestions.every((q) => warmupFirstCorrect[q.itemId] === true) && <p>🎉 Perfect warm-up!</p>}
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
                Begin Timed Diagnostic ({Math.floor((meta?.timedSeconds || 0) / 60)} min) &rarr;
              </button>
            </>
          ) : (
            <>
              <p>
                Now the diagnostic will mix things up to find your real gaps.<br />
                <strong>Mistakes here are useful information, not failure.</strong>
              </p>
              <button className="mb-btn" onClick={() => { setPhase('diagnostic'); setCurrentIndex(0); }}>
                I&apos;m ready &mdash; start diagnostic
              </button>{' '}
              <button className="mb-btn secondary" onClick={() => setShowGateReview((v) => !v)}>
                I want to review first
              </button>
              {showGateReview && (
                <div className="mb-gate-review-section">
                  {meta && (
                    <>
                      <h3>Quick Review</h3>
                      <div className="mb-review-card" dangerouslySetInnerHTML={{ __html: meta.gateReviewHTML }} />
                    </>
                  )}
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
      <div className="mb-question-title" dangerouslySetInnerHTML={{ __html: item.question }} />
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
            <OptionButton key={i} text={opt.text} state={state} disabled={disabled} onClick={() => onChoice(i)} />
          );
        })}
      </div>

      {!locked && hint && <div className="mb-hint-box">💡 {hint}</div>}

      {locked && (
        <div className={`mb-feedback ${record.correct ? 'fb-correct' : 'fb-incorrect'}`}>
          <strong>{record.correct ? '✓ Correct!' : '✗ Incorrect.'}</strong>{' '}
          {shuffled[record.chosenIdx] ? shuffled[record.chosenIdx].feedback : 'Skipped.'}
          {showBackForward && record.correct && item.backward && <> {item.backward}</>}
          {showBackForward && record.correct && item.forward && <> {item.forward}</>}
        </div>
      )}

      {locked && (
        <div className="mb-next-hint visible">
          <span onClick={onNext}>Next <span className="arrow">&rarr;</span></span>
        </div>
      )}

      {!locked && onSkip && (
        <div className="mb-skip-btn">
          <button className="mb-btn secondary" onClick={onSkip}>Skip &rarr;</button>
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
      <div className="mb-question-title" dangerouslySetInnerHTML={{ __html: item.question }} />
      <div className="mb-options-group">
        {shuffled.map((opt, i) => {
          let state = null;
          if (locked) {
            const correctIdx = shuffled.findIndex((o) => o.correct);
            if (i === correctIdx) state = 'correct';
            else if (i === record.chosenIdx && !record.correct) state = 'incorrect';
          }
          return <OptionButton key={i} text={opt.text} state={state} disabled={locked} onClick={() => onChoice(i)} />;
        })}
      </div>
      {locked && (
        <div className={`mb-feedback ${record.correct ? 'fb-correct' : 'fb-incorrect'}`}>
          <strong>{record.correct ? '✓ Correct!' : '✗ Incorrect.'}</strong>{' '}
          {shuffled[record.chosenIdx] ? shuffled[record.chosenIdx].feedback : ''}
        </div>
      )}
      {locked && (
        <div className="mb-next-hint visible">
          <span onClick={onNext}>Next <span className="arrow">&rarr;</span></span>
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
        <button className="mb-btn" onClick={onStartRecheck}>{recheckNeeded ? 'Start Personalised Re-check' : 'Continue'}</button>
        <p style={{ marginTop: '1rem' }}><button className="mb-btn secondary" onClick={onRestart}>Restart Bootcamp</button></p>
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
      <button className="mb-btn" onClick={onStartRecheck}>{recheckNeeded ? 'Simulate Spaced Re-check' : 'Continue'}</button>
      <p style={{ marginTop: '1rem' }}><button className="mb-btn secondary" onClick={onRestart}>Restart Bootcamp</button></p>
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
        <button className="mb-btn" onClick={onRestart}>Restart Demo</button>
      </>
    );
  }

  if (attemptedRecheck === 0) {
    return wrap(
      <>
        <h2>Re-check Complete</h2>
        <p>You haven&apos;t attempted any re-check items yet. When you&apos;re ready, give them a try &mdash; they&apos;re selected just for you.</p>
        <p style={{ color: '#7d7872' }}>In production, this would target only your weakest areas.</p>
        <button className="mb-btn" onClick={onRestart}>Restart Demo</button>
      </>
    );
  }
  if (attemptedRecheck < totalRecheck / 2) {
    return wrap(
      <>
        <h2>Re-check Complete</h2>
        <p>You attempted <strong>{attemptedRecheck}</strong> of <strong>{totalRecheck}</strong>. That&apos;s not quite enough to compare with your diagnostic. Try completing the rest to see your progress.</p>
        <p style={{ color: '#7d7872' }}>In production, this would target only your weakest areas.</p>
        <button className="mb-btn" onClick={onRestart}>Restart Demo</button>
      </>
    );
  }
  if (correctRecheck === 0) {
    return wrap(
      <>
        <h2>Re-check Complete</h2>
        <p>You didn&apos;t get any correct this time. That&apos;s okay &mdash; these were your hardest items from the diagnostic. Review the feedback and try again in a couple of days.</p>
        <p style={{ color: '#7d7872' }}>In production, this would target only your weakest areas.</p>
        <button className="mb-btn" onClick={onRestart}>Restart Demo</button>
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
      <button className="mb-btn" onClick={onRestart}>Restart Demo</button>
    </>
  );
}

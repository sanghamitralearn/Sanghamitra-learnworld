import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiFetch } from '../api/client';
import './VocabularyDiagnosticTest.css';

const OPTION_KEYS = ['a', 'b', 'c', 'd'];
const CEFR_LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

function emptyCefrMap() {
  return CEFR_LEVELS.reduce((acc, level) => ({ ...acc, [level]: 0 }), {});
}

function determineVocabularyLevel(correctAnswers, totalQuestions) {
  const levelThreshold = 0.6;
  const minCorrectAnswers = 3;

  let determinedLevel = 'A1';
  let maxScore = 0;

  for (const level of CEFR_LEVELS) {
    const totalAtLevel = totalQuestions[level] || 1;
    const correctAtLevel = correctAnswers[level] || 0;
    const incorrectAtLevel = totalAtLevel - correctAtLevel || 0;
    const percentageCorrect = correctAtLevel / totalAtLevel;
    const score = percentageCorrect - (incorrectAtLevel / totalAtLevel) * 0.2;

    if (percentageCorrect >= levelThreshold && correctAtLevel >= minCorrectAnswers) {
      if (score > maxScore) {
        maxScore = score;
        determinedLevel = level;
      }
    }
  }

  return determinedLevel;
}

function buildQuizSet(fullPool, previousQuestions) {
  if (previousQuestions?.length) {
    const wrongIds = new Set(
      previousQuestions.filter((q) => !q.is_correct).map((q) => String(q.question_id))
    );
    if (wrongIds.size > 0) {
      const wrongQuestions = fullPool.filter((q) => wrongIds.has(String(q._id)));
      if (wrongQuestions.length > 0) {
        return { picked: wrongQuestions, isRetry: true };
      }
    }
  }
  const shuffled = [...fullPool].sort(() => 0.5 - Math.random()).slice(0, 20);
  return { picked: shuffled, isRetry: false };
}

function AnalysisQuestion({ question, answer, index }) {
  const [expanded, setExpanded] = useState(false);
  const skipped = answer.user_response === 'You did not answer this question.';

  return (
    <div className={`analysis-question ${answer.is_correct ? 'correct-answer' : 'incorrect-answer'}`}>
      <div className="question-header">
        <span className={skipped ? 'skipped-icon' : answer.is_correct ? 'correct-icon' : 'incorrect-icon'}></span>
        <p>Question {index + 1}: {question.question}</p>
      </div>
      <p>Your answer: {answer.user_response}</p>
      <p>Correct answer: {answer.correct_option}</p>
      <button className="expand-button" onClick={() => setExpanded((v) => !v)}>Explanation</button>
      <div className={`expandable ${expanded ? '' : 'hidden'}`}>
        <p>Explanation: {question.explanation}</p>
        <p>Synonyms: {question.synonyms?.join(', ')}</p>
        <p>Antonyms: {question.antonyms?.join(', ')}</p>
        <p>Phonetic: {question.phonetic}</p>
        <p>Points Earned: {answer.points_awarded}</p>
        <p>CEFR Level: {question.CEFRLevel}</p>
      </div>
    </div>
  );
}

export default function VocabularyDiagnosticTest() {
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [phase, setPhase] = useState('loading'); // loading | quiz | result
  const [pool, setPool] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);
  const [isRetry, setIsRetry] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function fetchSessionInfo() {
      try {
        const response = await apiFetch('/session-info');
        if (!response.ok) {
          navigate('/login?redirectPath=%2Fvocabulary-diagnostic-test');
          return;
        }
        const data = await response.json();
        if (cancelled) return;
        if (!data.username || !data.email) {
          navigate('/login?redirectPath=%2Fvocabulary-diagnostic-test');
          return;
        }
        setSession({ username: data.username, email: data.email });
        await fetchQuestions(data.email);
      } catch (error) {
        console.error('Error fetching session info:', error);
      }
    }

    async function fetchPreviousAssessment(email) {
      try {
        const response = await apiFetch(`/vocabscores?email=${encodeURIComponent(email)}`);
        if (!response.ok) return null;
        const data = await response.json();
        const assessments = data?.assessments || [];
        return assessments.length ? assessments[assessments.length - 1] : null;
      } catch (error) {
        console.error('Error fetching previous vocab assessment:', error);
        return null;
      }
    }

    async function fetchQuestions(email) {
      try {
        const response = await apiFetch('/vocab-questions');
        if (!response.ok) {
          navigate('/login?redirectPath=%2Fvocabulary-diagnostic-test');
          return;
        }
        const data = await response.json();
        if (cancelled) return;
        setPool(data);

        const previousAssessment = await fetchPreviousAssessment(email);
        if (cancelled) return;

        const { picked, isRetry: retry } = buildQuizSet(data, previousAssessment?.questions);
        setQuestions(picked);
        setAnswers(new Array(picked.length).fill(null));
        setCurrentIndex(0);
        setIsRetry(retry);
        setPhase('quiz');
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    }

    fetchSessionInfo();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function restartQuiz() {
    const previousQuestions = result?.finalAnswers;
    setResult(null);
    setPhase('loading');
    const { picked, isRetry: retry } = buildQuizSet(pool, previousQuestions);
    setQuestions(picked);
    setAnswers(new Array(picked.length).fill(null));
    setCurrentIndex(0);
    setIsRetry(retry);
    setPhase('quiz');
  }

  function selectOption(optionKey) {
    const question = questions[currentIndex];
    const selectedAnswer = question.options[optionKey];
    const isCorrect = selectedAnswer === question.correctOption;

    const nextAnswers = answers.slice();
    nextAnswers[currentIndex] = {
      question_id: question._id,
      question_text: question.question,
      user_response: selectedAnswer,
      correct_option: question.correctOption,
      is_correct: isCorrect,
      points_awarded: isCorrect ? question.points : 0,
      difficulty_level: question.difficultyLevel,
      CEFR_level: question.CEFRLevel,
      topic: question.topic,
      selectedOptionKey: optionKey
    };
    setAnswers(nextAnswers);
  }

  async function postUserData(userData) {
    try {
      const response = await apiFetch('/vocabscoreadd', {
        method: 'POST',
        body: JSON.stringify(userData)
      });
      if (!response.ok) throw new Error('Failed to post user data');
    } catch (error) {
      console.error('Error posting user data:', error);
    }
  }

  function endQuiz() {
    const finalAnswers = answers.map((answer, i) => {
      if (answer) return answer;
      const q = questions[i];
      return {
        question_id: q._id,
        question_text: q.question,
        user_response: 'You did not answer this question.',
        correct_option: q.correctOption,
        is_correct: false,
        points_awarded: 0,
        difficulty_level: q.difficultyLevel || 'Unknown',
        CEFR_level: q.CEFRLevel,
        topic: q.topic
      };
    });

    const totalPoints = finalAnswers.reduce((sum, a) => sum + a.points_awarded, 0);

    const correctByLevel = emptyCefrMap();
    const totalByLevel = emptyCefrMap();
    finalAnswers.forEach((answer) => {
      if (!(answer.CEFR_level in totalByLevel)) return;
      totalByLevel[answer.CEFR_level]++;
      if (answer.is_correct) correctByLevel[answer.CEFR_level]++;
    });

    const vocabularyLevel = determineVocabularyLevel(correctByLevel, totalByLevel);

    setResult({ totalPoints, finalAnswers, vocabularyLevel });
    setPhase('result');

    postUserData({
      username: session?.username,
      email: session?.email,
      assessments: [{ total_score: totalPoints, questions: finalAnswers }]
    });
  }

  if (phase === 'loading') {
    return (
      <div className="page-title" data-aos="fade">
        <div className="heading">
          <div className="container text-center">
            <h1>Vocabulary Diagnostic Test</h1>
            <p className="mb-0">Loading questions&hellip;</p>
          </div>
        </div>
      </div>
    );
  }

  const question = questions[currentIndex];
  const savedAnswer = answers[currentIndex];
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === questions.length - 1;

  return (
    <div className="quiz-diagnostic">
      <div className="page-title" data-aos="fade">
        <div className="heading">
          <div className="container">
            <div className="row d-flex justify-content-center text-center">
              <div className="col-lg-8">
                <h1>Vocabulary Diagnostic Test</h1>
                <p className="mb-0">Welcome to the Diagnostic Vocabulary Assessment</p>
              </div>
            </div>
          </div>
        </div>
        <nav className="breadcrumbs">
          <div className="container">
            <ol>
              <li><a href="/">Home</a></li>
              <li className="current">Vocabulary Diagnostic Test</li>
            </ol>
          </div>
        </nav>
      </div>

      {phase === 'quiz' && question && (
        <div id="quiz" className="page active">
          <div className="container quiz-container">
            <div className="row">
              <div className="col-lg-8 mx-auto">
                {isRetry && (
                  <p className="retry-banner">
                    Retake: solving only the {questions.length} question{questions.length === 1 ? '' : 's'} you got wrong last time.
                  </p>
                )}
                <h2 id="question" className="mb-4">{question.question}</h2>
                <div id="options" className="mb-4">
                  {OPTION_KEYS.map((key) => (
                    <button
                      key={key}
                      className={`option btn btn-outline-secondary ${savedAnswer?.selectedOptionKey === key ? 'selected' : ''}`}
                      data-option={key}
                      onClick={() => selectOption(key)}
                    >
                      {question.options[key]}
                    </button>
                  ))}
                </div>
                <div className="buttons d-flex justify-content-between">
                  <button
                    id="previous-button"
                    className={`btn btn-secondary ${isFirst ? 'hidden' : ''}`}
                    onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
                  >
                    Previous Question
                  </button>
                  <button
                    id="next-button"
                    className={`btn btn-primary ${isLast ? 'hidden' : ''}`}
                    onClick={() => setCurrentIndex((i) => i + 1)}
                  >
                    Next Question
                  </button>
                  <button
                    id="end-button"
                    className={`btn btn-danger ${isLast ? '' : 'hidden'}`}
                    onClick={endQuiz}
                  >
                    End Quiz
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {phase === 'result' && result && (
        <div id="result" className="page active">
          <div className="container">
            <div className="row d-flex justify-content-center text-center">
              <div className="col-lg-8">
                <h2>Quiz Completed!</h2>
                <p id="total-score">Total Points: {result.totalPoints}</p>
                <div id="comprehensive-analysis">
                  <h3>Total Points: {result.totalPoints}</h3>
                  {questions.map((q, i) => (
                    <AnalysisQuestion key={q._id || i} question={q} answer={result.finalAnswers[i]} index={i} />
                  ))}
                </div>
                <h3>Your Vocabulary Level is: {result.vocabularyLevel}</h3>
                <button id="restart-button" className="btn btn-primary mt-4" onClick={restartQuiz}>Restart Quiz</button>
                <button id="analytics-button" className="btn btn-secondary mt-4" onClick={() => navigate('/vocab-analytics')}>
                  View Analytics
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

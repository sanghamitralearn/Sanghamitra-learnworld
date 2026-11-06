// The signed-in student's own attempt history. The email always comes from the session, never from
// the request, so one student can't read another's attempts.
const express = require('express');
const mongoose = require('mongoose');
const authenticate = require('../middleware/authenticate');
const { MathScore } = require('../model/MathScore');
const MathQuestion = require('../model/MathQuestion');
const { VocabScore } = require('../model/vocabScoreSchema');
const VocabQuestion = require('../model/vocabSchema');
const ExamModule = require('../model/ExamModule');
const { FAMILIES } = require('../model/ExamQuestion');
const { scoresFor } = require('../model/ExamScore');
const {
    COURSE_LABELS,
    examPercent,
    plainText,
    applyMisconception,
    mathReviewRows,
    examQuestionsByItem,
    annotateExamAnswer
} = require('../utils/attemptReview');

const router = express.Router();

const DEFAULT_LIMIT = 5;
const MAX_LIMIT = 50;
const QUESTION_TEXT_MAX = 600;
const MATHS = 'maths';
const VOCABULARY = 'vocabulary';
const COURSES = [MATHS, VOCABULARY, ...FAMILIES];
const VOCAB_SKIPPED = 'You did not answer this question.';

const MATH_LEVEL_NAMES = { 1: 'Core', 2: 'Advanced Core', 3: 'Synthesis', 4: 'Speed Run' };
const MATH_PHASE_NAMES = { warmup: 'Warm-up', diagnostic: 'Diagnostic', recheck: 'Recheck' };

const percentOf = (correct, total) => (total ? Math.round((correct / total) * 100) : 0);

// Whole number from a query string, or null when it's missing, malformed or out of range.
function intInRange(value, fallback, min, max) {
    if (value === undefined) return fallback;
    if (typeof value !== 'string' || !/^\d+$/.test(value)) return null;
    const number = Number(value);
    return number >= min && number <= max ? number : null;
}

const isCourse = (value) => typeof value === 'string' && COURSES.includes(value);

// ---- One row of the history list ----

function summary(course, courseLabel, fields) {
    const { correct, total, skipped } = fields;
    return {
        course,
        courseLabel,
        points: null,
        mode: null,
        timeSpent: null,
        analyticsUrl: null,
        ...fields,
        wrong: Math.max(total - correct - skipped, 0),
        percent: fields.percent ?? percentOf(correct, total)
    };
}

function mathSummary(a) {
    const correct = a.warmup_correct + a.diagnostic_correct + a.recheck_correct;
    const total = a.warmup_total + a.diagnostic_total + a.recheck_total;
    return summary(MATHS, 'Mathematics', {
        id: String(a._id),
        title: a.chapter_name,
        detail: `${String(a.grade).replace('grade-', 'Grade ')} · ${MATH_LEVEL_NAMES[a.level] || `Level ${a.level}`}`,
        date: a.date,
        correct,
        total,
        skipped: a.diagnostic_unattempted || 0,
        points: a.total_score,
        retakeUrl: `/math/${encodeURIComponent(a.grade)}/${encodeURIComponent(a.chapter_slug)}/${a.level}`
    });
}

function examSummary(family, a) {
    const exam = encodeURIComponent(a.exam);
    const isFull = a.scope === 'full';
    return summary(family, COURSE_LABELS[family], {
        id: String(a._id),
        title: a.exam_label || a.exam,
        detail: isFull ? 'Full test' : `${a.section_name || a.section} · Module ${a.module}`,
        date: a.date,
        correct: a.correct,
        total: a.total,
        skipped: a.unattempted || 0,
        percent: examPercent(a),
        mode: a.mode,
        timeSpent: a.time_spent || null,
        retakeUrl: isFull ? `/competitive-exams/${exam}/test` : `/competitive-exams/${exam}/${encodeURIComponent(a.section)}/${a.module}`
    });
}

const isVocabSkipped = (q) => q.user_response === VOCAB_SKIPPED || q.user_response === '';

function vocabSummary(a) {
    const questions = a.questions || [];
    return summary(VOCABULARY, 'Vocabulary', {
        id: String(a._id),
        title: 'Vocabulary quiz',
        detail: 'Diagnostic test',
        date: a.date,
        correct: questions.filter((q) => q.is_correct).length,
        total: questions.length,
        skipped: questions.filter(isVocabSkipped).length,
        points: a.total_score,
        retakeUrl: '/vocabulary-diagnostic-test',
        analyticsUrl: `/vocab-analytics?quizId=${encodeURIComponent(new Date(a.date).toISOString())}`
    });
}

// The answers themselves are by far the largest part of a score document, so the list leaves them out.
async function listCourse(course, email) {
    if (course === MATHS) {
        const doc = await MathScore.findOne({ email }).select('-attempts.answers').lean();
        return (doc?.attempts || []).map(mathSummary);
    }
    if (course === VOCABULARY) {
        const doc = await VocabScore.findOne({ email })
            .select('assessments._id assessments.date assessments.total_score assessments.questions.is_correct assessments.questions.user_response')
            .lean();
        return (doc?.assessments || []).map(vocabSummary);
    }
    const doc = await scoresFor(course).findOne({ email }).select('-attempts.answers').lean();
    return (doc?.attempts || []).map((a) => examSummary(course, a));
}

// ---- One attempt's review ----

function mistake(fields) {
    return {
        questionNumber: null,
        section: null,
        explanation: null,
        tag: null,
        why: null,
        fix: null,
        ...fields,
        status: fields.skipped ? 'skipped' : 'wrong'
    };
}

// Correct / total per topic, weakest first, so the panel leads with where marks were lost.
function topicResults(rows) {
    const byName = new Map();
    rows.forEach(({ topic, correct }) => {
        const name = topic || 'General';
        const entry = byName.get(name) || { name, correct: 0, total: 0 };
        entry.total += 1;
        if (correct) entry.correct += 1;
        byName.set(name, entry);
    });
    return [...byName.values()]
        .map((t) => ({ ...t, percent: percentOf(t.correct, t.total) }))
        .sort((a, b) => a.percent - b.percent || b.total - a.total);
}

const reviewOptions = { questionMax: QUESTION_TEXT_MAX, withExplanation: true };

async function mathReview(attempt) {
    const bank = await MathQuestion
        .find({ grade: attempt.grade, chapterSlug: attempt.chapter_slug, level: attempt.level })
        .lean();
    const rows = mathReviewRows(attempt, bank, reviewOptions);
    return {
        attempt: mathSummary(attempt),
        topics: topicResults(rows.map((r) => ({ topic: r.cluster_name || r.cluster, correct: r.is_correct }))),
        mistakes: rows.filter((r) => !r.is_correct).map((r) => mistake({
            id: `${r.phase}:${r.item_id}`,
            section: MATH_PHASE_NAMES[r.phase] || r.phase,
            topic: r.cluster_name || r.cluster,
            question: r.question_text || null,
            yourAnswer: r.chosen_text || null,
            correctAnswer: r.correct_text || null,
            skipped: Boolean(r.skipped),
            explanation: r.explanation || null,
            tag: r.mistake_tag || null,
            why: r.mistake_why || r.mistake_description || null,
            fix: r.mistake_fix || null
        }))
    };
}

async function examReview(family, attempt) {
    const answers = attempt.answers || [];
    const [questions, modules] = await Promise.all([
        examQuestionsByItem(family, answers.map((a) => a.item_id)),
        ExamModule.find({ exam: attempt.exam }).select('section sectionName').lean()
    ]);
    const sectionNames = new Map(modules.map((m) => [m.section, m.sectionName]));
    answers.forEach((a) => annotateExamAnswer(a, questions.get(a.item_id), reviewOptions));
    return {
        attempt: examSummary(family, attempt),
        topics: topicResults(answers.map((a) => ({ topic: a.topic || a.section, correct: a.is_correct }))),
        mistakes: answers.filter((a) => !a.is_correct).map((a) => mistake({
            id: a.item_id,
            questionNumber: a.question_number ?? null,
            section: sectionNames.get(a.section) || a.section || null,
            topic: a.topic || null,
            question: a.question_text || null,
            yourAnswer: a.response_text || null,
            correctAnswer: a.correct_text || null,
            skipped: Boolean(a.skipped),
            explanation: a.explanation || null
        }))
    };
}

// Stored vocab answers may be an option letter ("b") or the option's text; show the text either way.
function vocabOptionText(question, value) {
    const text = question?.options?.[String(value).toLowerCase()];
    return text ? `${String(value).toUpperCase()}. ${plainText(text, 200)}` : plainText(value, 200);
}

async function vocabReview(assessment) {
    const questions = assessment.questions || [];
    const wrong = questions.filter((q) => !q.is_correct);
    const bank = await VocabQuestion
        .find({ _id: { $in: wrong.map((q) => q.question_id) } })
        .select('options explanation misconceptions')
        .lean();
    const bankById = new Map(bank.map((q) => [String(q._id), q]));
    return {
        attempt: vocabSummary(assessment),
        topics: topicResults(questions.map((q) => ({ topic: q.topic, correct: q.is_correct }))),
        mistakes: wrong.map((q) => {
            const source = bankById.get(String(q.question_id));
            const skipped = isVocabSkipped(q);
            const row = {};
            applyMisconception(row, source?.misconceptions?.find((m) => m.misconceptionId === q.misconception_id));
            return mistake({
                id: String(q._id),
                topic: q.topic,
                question: plainText(q.question_text, QUESTION_TEXT_MAX),
                yourAnswer: skipped ? null : vocabOptionText(source, q.user_response),
                correctAnswer: vocabOptionText(source, q.correct_option),
                skipped,
                explanation: source?.explanation ? plainText(source.explanation, 600) : null,
                tag: row.mistake_tag || null,
                why: row.mistake_why || row.mistake_description || null,
                fix: row.mistake_fix || null
            });
        })
    };
}

// The attempt must belong to `email`: the filter matches on both, so anyone else's id is simply not found.
async function loadReview(course, id, email) {
    if (course === VOCABULARY) {
        const doc = await VocabScore.findOne({ email, 'assessments._id': id }, { 'assessments.$': 1 }).lean();
        return doc ? vocabReview(doc.assessments[0]) : null;
    }
    const Model = course === MATHS ? MathScore : scoresFor(course);
    const doc = await Model.findOne({ email, 'attempts._id': id }, { 'attempts.$': 1 }).lean();
    if (!doc) return null;
    return course === MATHS ? mathReview(doc.attempts[0]) : examReview(course, doc.attempts[0]);
}

// ---- Routes ----

router.use(authenticate);
router.use((req, res, next) => {
    res.set('Cache-Control', 'private, no-store');
    next();
});

// GET /api/me/attempts?course=sat&limit=5&offset=0 — newest first.
router.get('/attempts', async (req, res) => {
    const { course } = req.query;
    const limit = intInRange(req.query.limit, DEFAULT_LIMIT, 1, MAX_LIMIT);
    const offset = intInRange(req.query.offset, 0, 0, Number.MAX_SAFE_INTEGER);
    if (limit === null || offset === null) return res.status(400).json({ error: 'Invalid limit or offset' });
    if (course !== undefined && !isCourse(course)) return res.status(400).json({ error: 'Unknown course' });

    try {
        const lists = await Promise.all((course ? [course] : COURSES).map((c) => listCourse(c, req.rootUser.email)));
        const attempts = lists.flat().sort((a, b) => new Date(b.date) - new Date(a.date));
        res.status(200).json({ attempts: attempts.slice(offset, offset + limit), total: attempts.length });
    } catch (err) {
        console.error('[me/attempts] failed to list attempts:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// GET /api/me/attempts/sat/<attemptId> — marks plus where the marks were lost.
router.get('/attempts/:course/:id', async (req, res) => {
    const { course, id } = req.params;
    if (!isCourse(course)) return res.status(400).json({ error: 'Unknown course' });
    if (!mongoose.isObjectIdOrHexString(id)) return res.status(400).json({ error: 'Invalid attempt id' });

    try {
        const review = await loadReview(course, id, req.rootUser.email);
        if (!review) return res.status(404).json({ error: 'Attempt not found' });
        res.status(200).json(review);
    } catch (err) {
        console.error('[me/attempts] failed to load review:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;

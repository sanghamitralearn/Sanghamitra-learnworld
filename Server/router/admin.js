const express = require('express');
const router = express.Router();
const { MathScore } = require('../model/MathScore');
const MathQuestion = require('../model/MathQuestion');
const MathChapter = require('../model/MathChapter');
const { VocabScore } = require('../model/vocabScoreSchema');
const Notification = require('../model/notificationSchema');
const { FAMILIES } = require('../model/ExamQuestion');
const { scoresFor } = require('../model/ExamScore');
const { accuracyForAttempt, accuracyForAssessment } = require('../utils/scoreStats');
const { COURSE_LABELS, examPercent, mathReviewRows, examQuestionsByItem, annotateExamAnswer } = require('../utils/attemptReview');

// All routes here are mounted behind authenticate + requireAdmin in app.js.

// ---- Competitive exams: one score collection per course (sat_scores, gre_scores, …) ----

// Every student's attempts across all courses, newest last, one row per student.
// `email` limits it to one student; answers (the bulk of each document) are only loaded when asked for.
async function allExamScores({ email, withAnswers = false } = {}) {
    const filter = email ? { email } : {};
    const perFamily = await Promise.all(FAMILIES.map((f) => {
        const query = scoresFor(f).find(filter);
        if (!withAnswers) query.select('-attempts.answers');
        return query.lean();
    }));
    const byEmail = new Map();
    perFamily.forEach((docs, i) => {
        const family = FAMILIES[i];
        docs.forEach((doc) => {
            if (!byEmail.has(doc.email)) byEmail.set(doc.email, { _id: doc.email, username: doc.username, email: doc.email, attempts: [] });
            const row = byEmail.get(doc.email);
            (doc.attempts || []).forEach((a) => {
                row.attempts.push({ ...a, family: a.family || family, course: COURSE_LABELS[a.family || family], percent: examPercent(a) });
            });
        });
    });
    const rows = [...byEmail.values()];
    rows.forEach((r) => r.attempts.sort((a, b) => new Date(a.date) - new Date(b.date)));
    return rows;
}

// Dashboards only need per-attempt totals, so answers are left out unless ?answers=1 is passed.
router.get('/scores', async (req, res) => {
    try {
        const withAnswers = req.query.answers === '1';
        const [math, english, exams] = await Promise.all([
            MathScore.find({}).select(withAnswers ? '' : '-attempts.answers').lean(),
            VocabScore.find({}).select('-assessments.questions').lean(),
            allExamScores({ withAnswers })
        ]);
        res.status(200).json({ math, english, exams });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Maths chapters with their levels and topic (cluster) names, for the chapter / gap dashboards.
router.get('/math/catalog', async (req, res) => {
    try {
        const rows = await MathChapter.find({}).select('grade gradeLabel chapterSlug chapterName level clusterNames').lean();
        const byChapter = new Map();
        rows.forEach((r) => {
            const key = `${r.grade}|${r.chapterSlug}`;
            if (!byChapter.has(key)) {
                byChapter.set(key, {
                    key, grade: r.grade, gradeLabel: r.gradeLabel, chapterSlug: r.chapterSlug,
                    chapterName: r.chapterName, levels: [], topics: {}
                });
            }
            const chapter = byChapter.get(key);
            if (!chapter.levels.includes(r.level)) chapter.levels.push(r.level);
            Object.assign(chapter.topics, r.clusterNames || {});
        });
        const chapters = [...byChapter.values()];
        chapters.forEach((c) => c.levels.sort((a, b) => a - b));
        res.status(200).json({ chapters });
    } catch (err) {
        console.error('[admin/math/catalog] failed:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

router.get('/scores/math/:email', async (req, res) => {
    try {
        const userScores = await MathScore.findOne({ email: req.params.email }).lean();
        if (!userScores) return res.status(404).json({ message: 'User not found' });

        const attempts = userScores.attempts || [];
        const levels = new Map();
        attempts.forEach((a) => {
            levels.set([a.grade, a.chapter_slug, a.level].join('|'), { grade: a.grade, chapterSlug: a.chapter_slug, level: a.level });
        });
        // Only the fields the review rows use; hint ladders, curriculum links etc. are left out.
        const questions = levels.size
            ? await MathQuestion.find({ $or: [...levels.values()] })
                .select('grade chapterSlug level phase itemId order cluster clusterName question options.text options.correct options.misconceptionId misconceptions')
                .lean()
            : [];

        attempts.forEach((attempt) => {
            const bank = questions.filter((q) => q.grade === attempt.grade && q.chapterSlug === attempt.chapter_slug && q.level === attempt.level);
            attempt.answers = mathReviewRows(attempt, bank);
        });

        res.status(200).json(userScores);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// One student's competitive-exam attempts, with each answer's question text and correct answer.
router.get('/scores/exams/:email', async (req, res) => {
    try {
        const [row] = await allExamScores({ email: req.params.email, withAnswers: true });
        if (!row) return res.status(404).json({ message: 'User not found' });

        const idsByFamily = {};
        row.attempts.forEach((a) => (a.answers || []).forEach((ans) => {
            (idsByFamily[a.family] ||= new Set()).add(ans.item_id);
        }));
        const maps = await Promise.all(Object.entries(idsByFamily).map(([family, ids]) => examQuestionsByItem(family, [...ids])));
        const questionMap = new Map(maps.flatMap((map) => [...map]));

        row.attempts.forEach((a) => {
            (a.answers || []).forEach((ans) => annotateExamAnswer(ans, questionMap.get(ans.item_id)));
        });
        res.status(200).json(row);
    } catch (err) {
        console.error('[admin/scores/exams] failed:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

router.get('/scores/english/:email', async (req, res) => {
    try {
        const userScores = await VocabScore.findOne({ email: req.params.email });
        if (!userScores) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(userScores);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

function summarize(accuracies, scores) {
    const count = accuracies.length;
    if (count === 0) {
        return { count: 0, averageAccuracy: 0, averageScore: 0, passRate: 0 };
    }
    const averageAccuracy = accuracies.reduce((sum, a) => sum + a, 0) / count;
    const averageScore = scores.reduce((sum, s) => sum + s, 0) / count;
    const passRate = (accuracies.filter((a) => a >= 50).length / count) * 100;
    return {
        count,
        averageAccuracy: Number(averageAccuracy.toFixed(2)),
        averageScore: Number(averageScore.toFixed(2)),
        passRate: Number(passRate.toFixed(2))
    };
}

router.get('/exam-performance', async (req, res) => {
    try {
        const [mathDocs, vocabDocs, examRows] = await Promise.all([
            MathScore.find({}).select('-attempts.answers').lean(),
            VocabScore.find({}).select('assessments.total_score assessments.questions.is_correct').lean(),
            allExamScores()
        ]);

        const examAttempts = examRows.flatMap((r) => r.attempts);
        const examByCourse = {};
        examAttempts.forEach((a) => {
            if (!examByCourse[a.course]) examByCourse[a.course] = { accuracies: [], scores: [] };
            examByCourse[a.course].accuracies.push(a.percent);
            examByCourse[a.course].scores.push(a.correct || 0);
        });

        const mathAttempts = mathDocs.flatMap((doc) => doc.attempts);
        const mathAccuracies = mathAttempts.map(accuracyForAttempt);
        const mathScores = mathAttempts.map((a) => a.total_score);
        const mathByGrade = {};
        mathAttempts.forEach((attempt, idx) => {
            const grade = attempt.grade || 'unknown';
            if (!mathByGrade[grade]) mathByGrade[grade] = { accuracies: [], scores: [] };
            mathByGrade[grade].accuracies.push(mathAccuracies[idx]);
            mathByGrade[grade].scores.push(mathScores[idx]);
        });
        const mathByGradeSummary = Object.fromEntries(
            Object.entries(mathByGrade).map(([grade, data]) => [grade, summarize(data.accuracies, data.scores)])
        );

        const vocabAssessments = vocabDocs.flatMap((doc) => doc.assessments);
        const vocabAccuracies = vocabAssessments.map(accuracyForAssessment);
        const vocabScores = vocabAssessments.map((a) => a.total_score);

        res.status(200).json({
            math: { ...summarize(mathAccuracies, mathScores), byGrade: mathByGradeSummary },
            english: summarize(vocabAccuracies, vocabScores),
            exams: {
                ...summarize(examAttempts.map((a) => a.percent), examAttempts.map((a) => a.correct || 0)),
                byCourse: Object.fromEntries(
                    Object.entries(examByCourse).map(([course, data]) => [course, summarize(data.accuracies, data.scores)])
                )
            }
        });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

router.get('/recent-activity', async (req, res) => {
    try {
        const limit = Math.min(parseInt(req.query.limit, 10) || 15, 50);
        const [mathDocs, vocabDocs, examRows] = await Promise.all([
            MathScore.find({}).select('-attempts.answers').lean(),
            VocabScore.find({}).select('username email assessments._id assessments.date assessments.questions.is_correct').lean(),
            allExamScores()
        ]);

        const examActivity = examRows.flatMap((row) =>
            row.attempts.map((attempt) => ({
                id: String(attempt._id),
                subject: 'exams',
                username: row.username,
                email: row.email,
                topic: `${attempt.exam_label || attempt.exam}${attempt.section_name ? ` — ${attempt.section_name}` : ''}`,
                percentage: attempt.percent,
                date: attempt.date
            }))
        );

        const mathActivity = mathDocs.flatMap((doc) =>
            (doc.attempts || []).map((attempt) => ({
                id: String(attempt._id),
                subject: 'maths',
                username: doc.username,
                email: doc.email,
                topic: `${attempt.chapter_name} — Level ${attempt.level}`,
                percentage: Math.round(accuracyForAttempt(attempt)),
                date: attempt.date
            }))
        );

        const vocabActivity = vocabDocs.flatMap((doc) =>
            (doc.assessments || []).map((assessment) => ({
                id: String(assessment._id),
                subject: 'english',
                username: doc.username,
                email: doc.email,
                topic: 'Vocabulary Assessment',
                percentage: Math.round(accuracyForAssessment(assessment)),
                date: assessment.date
            }))
        );

        const activity = [...mathActivity, ...vocabActivity, ...examActivity]
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, limit);

        res.status(200).json(activity);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

router.get('/notifications', async (req, res) => {
    try {
        const notifications = await Notification.find({}).sort({ createdAt: -1 });
        const withState = notifications.map((n) => ({
            _id: n._id,
            title: n.title,
            message: n.message,
            type: n.type,
            createdBy: n.createdBy,
            createdAt: n.createdAt,
            dismissed: n.dismissedBy.some((id) => id.equals(req.userID))
        }));
        res.status(200).json(withState);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

router.post('/notifications', async (req, res) => {
    const { title, message, type } = req.body;
    if (!title || !message) {
        return res.status(400).json({ error: 'title and message are required' });
    }
    try {
        const notification = new Notification({
            title,
            message,
            type: type || 'info',
            createdBy: req.rootUser.email
        });
        await notification.save();
        res.status(201).json(notification);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

router.patch('/notifications/:id/dismiss', async (req, res) => {
    try {
        const notification = await Notification.findByIdAndUpdate(
            req.params.id,
            { $addToSet: { dismissedBy: req.userID } },
            { new: true }
        );
        if (!notification) return res.status(404).json({ error: 'Notification not found' });
        res.status(200).json({ message: 'Dismissed' });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

router.delete('/notifications/:id', async (req, res) => {
    try {
        const notification = await Notification.findByIdAndDelete(req.params.id);
        if (!notification) return res.status(404).json({ error: 'Notification not found' });
        res.status(200).json({ message: 'Deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;

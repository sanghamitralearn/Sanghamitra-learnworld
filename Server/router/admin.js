const express = require('express');
const router = express.Router();
const { MathScore } = require('../model/MathScore');
const MathQuestion = require('../model/MathQuestion');
const { VocabScore } = require('../model/vocabScoreSchema');
const Notification = require('../model/notificationSchema');
const { accuracyForAttempt, accuracyForAssessment } = require('../utils/scoreStats');

// All routes here are mounted behind authenticate + requireAdmin in app.js.

router.get('/scores', async (req, res) => {
    try {
        const [math, english] = await Promise.all([
            MathScore.find({}),
            VocabScore.find({})
        ]);
        res.status(200).json({ math, english });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

router.get('/scores/math/:email', async (req, res) => {
    try {
        const userScores = await MathScore.findOne({ email: req.params.email }).lean();
        if (!userScores) return res.status(404).json({ message: 'User not found' });

        const attempts = userScores.attempts || [];
        const lookupKeys = new Map();
        attempts.forEach((attempt) => {
            (attempt.answers || []).forEach((answer) => {
                const key = [attempt.grade, attempt.chapter_slug, attempt.level, answer.phase, answer.item_id].join('|');
                lookupKeys.set(key, {
                    grade: attempt.grade,
                    chapterSlug: attempt.chapter_slug,
                    level: attempt.level,
                    phase: answer.phase,
                    itemId: answer.item_id
                });
            });
        });

        if (lookupKeys.size) {
            const questions = await MathQuestion.find({
                $or: Array.from(lookupKeys.values())
            }).lean();
            const questionMap = new Map(
                questions.map((q) => [[q.grade, q.chapterSlug, q.level, q.phase, q.itemId].join('|'), q])
            );

            attempts.forEach((attempt) => {
                (attempt.answers || []).forEach((answer) => {
                    const key = [attempt.grade, attempt.chapter_slug, attempt.level, answer.phase, answer.item_id].join('|');
                    const question = questionMap.get(key);
                    if (question) {
                        answer.question_text = question.question;
                        answer.chosen_text = question.options?.[answer.chosen_index]?.text ?? null;
                        answer.correct_text = question.options?.find((o) => o.correct)?.text ?? null;
                    }
                });
            });
        }

        res.status(200).json(userScores);
    } catch (err) {
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
        const [mathDocs, vocabDocs] = await Promise.all([
            MathScore.find({}),
            VocabScore.find({})
        ]);

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
            english: summarize(vocabAccuracies, vocabScores)
        });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

router.get('/recent-activity', async (req, res) => {
    try {
        const limit = Math.min(parseInt(req.query.limit, 10) || 15, 50);
        const [mathDocs, vocabDocs] = await Promise.all([
            MathScore.find({}).lean(),
            VocabScore.find({}).lean()
        ]);

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

        const activity = [...mathActivity, ...vocabActivity]
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

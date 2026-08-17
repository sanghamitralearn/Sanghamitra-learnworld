const express = require('express');
const router = express.Router();
const { MathScore } = require('../model/MathScore');
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
        const userScores = await MathScore.findOne({ email: req.params.email });
        if (!userScores) return res.status(404).json({ message: 'User not found' });
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

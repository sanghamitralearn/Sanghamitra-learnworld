const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const MathQuestion = require('../model/MathQuestion');
const MathChapter = require('../model/MathChapter');
const MathProgress = require('../model/MathProgress');
const { MathScore, addOrUpdateMathAttempt } = require('../model/MathScore');
const { notifyNewMathAttempt } = require('../utils/notify');

// Public: catalog of every grade/chapter/level combination, used by the Math hub page.
router.get('/catalog', async (req, res) => {
  try {
    const chapters = await MathChapter.find({}).sort({ grade: 1, chapterName: 1, level: 1 });
    res.json(chapters);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Question bank (warmup + diagnostic + recheck) for one grade/chapter/level.
router.get('/questions', authenticate, async (req, res) => {
  const { grade, chapter, level } = req.query;
  if (!grade || !chapter || !level) {
    return res.status(400).json({ error: 'grade, chapter and level are required' });
  }
  try {
    const questions = await MathQuestion
      .find({ grade, chapterSlug: chapter, level: Number(level) })
      .sort({ phase: 1, order: 1 });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Save a bootcamp attempt for the signed-in user. Called as soon as the diagnostic
// finishes so progress isn't lost if the user never does the recheck.
router.post('/scores', authenticate, async (req, res) => {
  const { username, email, attempt } = req.body;
  if (!username || !email || !attempt) {
    console.error('[math/scores] rejected: missing username/email/attempt in request body', { username, email, hasAttempt: !!attempt });
    return res.status(400).json({ error: 'username, email and attempt are required' });
  }
  try {
    const user = await addOrUpdateMathAttempt(username, email, attempt);
    const savedAttempt = user.attempts[user.attempts.length - 1];
    console.log(`[math/scores] saved attempt ${savedAttempt._id} for ${email} (${attempt.chapter_name}, level ${attempt.level})`);
    res.status(201).json({ message: 'Score saved successfully', attemptId: savedAttempt._id });
    notifyNewMathAttempt(username, attempt).catch((err) => console.error('Failed to post score notification:', err));
  } catch (err) {
    console.error('[math/scores] failed to save score:', err);
    res.status(500).json({ error: 'Server error, failed to save score' });
  }
});

// Update a previously saved attempt with recheck results once the user finishes it.
router.patch('/scores/:attemptId', authenticate, async (req, res) => {
  const { email, updates } = req.body;
  if (!email || !updates) {
    return res.status(400).json({ error: 'email and updates are required' });
  }
  try {
    const userScores = await MathScore.findOne({ email });
    if (!userScores) return res.status(404).json({ message: 'User not found' });
    const attempt = userScores.attempts.id(req.params.attemptId);
    if (!attempt) return res.status(404).json({ message: 'Attempt not found' });
    Object.assign(attempt, updates);
    await userScores.save();
    console.log(`[math/scores] updated attempt ${req.params.attemptId} for ${email} with recheck results`);
    res.status(200).json({ message: 'Attempt updated successfully' });
  } catch (err) {
    console.error('[math/scores] failed to update score:', err);
    res.status(500).json({ error: 'Server error, failed to update score' });
  }
});

// Fetch a user's past attempts, optionally filtered by grade/chapter/level.
router.get('/scores', authenticate, async (req, res) => {
  const { email, grade, chapter, level } = req.query;
  if (!email) return res.status(400).json({ error: 'email is required' });
  try {
    const userScores = await MathScore.findOne({ email });
    if (!userScores) return res.status(404).json({ message: 'User not found' });

    let attempts = userScores.attempts;
    if (grade) attempts = attempts.filter((a) => a.grade === grade);
    if (chapter) attempts = attempts.filter((a) => a.chapter_slug === chapter);
    if (level) attempts = attempts.filter((a) => a.level === Number(level));

    res.status(200).json({ email: userScores.email, username: userScores.username, attempts });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// ---------------------------------------------------------------------
// In-progress bootcamp state (resume where the student left off).
// Always keyed to the signed-in user's own email, never one from the client.
// ---------------------------------------------------------------------
function progressKey(req, source) {
  const { grade, chapter, level } = source;
  if (!grade || !chapter || !level) return null;
  return { email: req.rootUser.email, grade, chapter_slug: chapter, level: Number(level) };
}

// List every bootcamp this user has in progress (for "Resume" badges on the hub).
router.get('/progress/all', authenticate, async (req, res) => {
  try {
    const docs = await MathProgress.find({ email: req.rootUser.email }, { state: 0 });
    res.json(docs.map((d) => ({ grade: d.grade, chapter: d.chapter_slug, level: d.level, updated_at: d.updated_at })));
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/progress', authenticate, async (req, res) => {
  const key = progressKey(req, req.query);
  if (!key) return res.status(400).json({ error: 'grade, chapter and level are required' });
  try {
    const doc = await MathProgress.findOne(key);
    if (!doc) return res.status(404).json({ message: 'No saved progress' });
    res.json({ state: doc.state, updated_at: doc.updated_at });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/progress', authenticate, async (req, res) => {
  const key = progressKey(req, req.body);
  const { state } = req.body;
  if (!key || !state || typeof state !== 'object') {
    return res.status(400).json({ error: 'grade, chapter, level and state are required' });
  }
  try {
    await MathProgress.updateOne(key, { $set: { state, updated_at: new Date() } }, { upsert: true });

    // Keep the saved attempt's phase times current as the student goes, so time spent
    // is recorded even if they leave mid-phase. $max: a late/out-of-order save never lowers it.
    const t = state.phaseTime;
    if (t && state.savedAttemptId && mongoose.isValidObjectId(state.savedAttemptId)) {
      const secs = (v) => (Number.isFinite(Number(v)) ? Math.max(0, Math.round(Number(v))) : 0);
      await MathScore.updateOne(
        { email: key.email, 'attempts._id': state.savedAttemptId },
        { $max: {
          'attempts.$.warmup_time': secs(t.warmup),
          'attempts.$.diagnostic_time': secs(t.diagnostic),
          'attempts.$.recheck_time': secs(t.recheck)
        } }
      );
    }
    res.json({ message: 'Progress saved' });
  } catch (err) {
    console.error('[math/progress] failed to save progress:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/progress', authenticate, async (req, res) => {
  const key = progressKey(req, req.query);
  if (!key) return res.status(400).json({ error: 'grade, chapter and level are required' });
  try {
    await MathProgress.deleteOne(key);
    res.json({ message: 'Progress cleared' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

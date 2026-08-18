const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const MathQuestion = require('../model/MathQuestion');
const MathChapter = require('../model/MathChapter');
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
    return res.status(400).json({ error: 'username, email and attempt are required' });
  }
  try {
    const user = await addOrUpdateMathAttempt(username, email, attempt);
    const savedAttempt = user.attempts[user.attempts.length - 1];
    res.status(201).json({ message: 'Score saved successfully', attemptId: savedAttempt._id });
    notifyNewMathAttempt(username, attempt).catch((err) => console.error('Failed to post score notification:', err));
  } catch (err) {
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
    res.status(200).json({ message: 'Attempt updated successfully' });
  } catch (err) {
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

module.exports = router;

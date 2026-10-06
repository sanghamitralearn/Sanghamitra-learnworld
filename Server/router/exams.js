const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const ExamModule = require('../model/ExamModule');
const { forFamily, FAMILIES } = require('../model/ExamQuestion');
const { scoresFor, addExamAttempt } = require('../model/ExamScore');

// "psat-10" → "sat", "cat-2" → "cat", read from the paper's catalog entry.
async function familyOf(exam) {
  const paper = await ExamModule.findOne({ exam }).select('family');
  return paper ? paper.family : null;
}

// Public: every exam/section/module combination, used by the Competitive Exams hub page.
router.get('/catalog', async (req, res) => {
  try {
    const modules = await ExamModule.find({}).sort({ examOrder: 1, sectionOrder: 1, module: 1 });
    res.json(modules);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Questions for a whole paper (full-length test), or one section/module of it.
router.get('/questions', authenticate, async (req, res) => {
  const { exam, section, module } = req.query;
  if (!exam) {
    return res.status(400).json({ error: 'exam is required' });
  }
  const filter = { exam };
  if (section) filter.section = section;
  if (module) filter.module = Number(module);
  try {
    const family = await familyOf(exam);
    if (!family) return res.status(404).json({ error: 'Unknown exam' });
    const questions = await forFamily(family)
      .find(filter)
      .sort({ section: 1, module: 1, order: 1 });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Save a finished module attempt for the signed-in user.
router.post('/scores', authenticate, async (req, res) => {
  const { username, email, attempt } = req.body;
  if (!username || !email || !attempt) {
    return res.status(400).json({ error: 'username, email and attempt are required' });
  }
  try {
    const family = await familyOf(attempt.exam);
    if (!family) return res.status(400).json({ error: 'Unknown exam' });
    const user = await addExamAttempt(family, username, email, attempt);
    const saved = user.attempts[user.attempts.length - 1];
    console.log(`[exams/scores] saved attempt ${saved._id} to ${user.collection.collectionName} for ${email} (${attempt.exam} ${attempt.section || 'full'}: ${saved.correct}/${saved.total})`);
    res.status(201).json({ message: 'Score saved successfully', attemptId: saved._id });
  } catch (err) {
    console.error('[exams/scores] failed to save score:', err);
    res.status(500).json({ error: 'Server error, failed to save score' });
  }
});

// A user's past attempts, optionally filtered by exam/section/module.
router.get('/scores', authenticate, async (req, res) => {
  const { email, exam, section, module } = req.query;
  if (!email) return res.status(400).json({ error: 'email is required' });
  try {
    // One exam → its family's collection; no exam → every family's attempts together.
    const families = exam ? [await familyOf(exam)].filter(Boolean) : FAMILIES;
    const docs = (await Promise.all(families.map((f) => scoresFor(f).findOne({ email })))).filter(Boolean);
    if (!docs.length) return res.status(404).json({ message: 'User not found' });

    let attempts = docs.flatMap((d) => d.attempts).sort((a, b) => new Date(a.date) - new Date(b.date));
    if (exam) attempts = attempts.filter((a) => a.exam === exam);
    if (section) attempts = attempts.filter((a) => a.section === section);
    if (module) attempts = attempts.filter((a) => a.module === Number(module));

    res.status(200).json({ email: docs[0].email, username: docs[0].username, attempts });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

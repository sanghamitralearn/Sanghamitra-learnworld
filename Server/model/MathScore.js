// model/MathScore.js
const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  item_id: { type: String, required: true },
  phase: { type: String, required: true },
  cluster: { type: String, required: true },
  chosen_index: { type: Number, required: true },
  is_correct: { type: Boolean, required: true },
  misconception_id: { type: String, default: '' },  // set when the chosen option is wrong and tags a known error pattern
  skipped: { type: Boolean, default: false },
  time_elapsed: { type: Number, default: 0 },
  points_awarded: { type: Number, default: 0 }
}, { _id: false });

const attemptSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  grade: { type: String, required: true },
  chapter_slug: { type: String, required: true },
  chapter_name: { type: String, required: true },
  level: { type: Number, required: true },
  warmup_correct: { type: Number, default: 0 },
  warmup_total: { type: Number, default: 0 },
  diagnostic_correct: { type: Number, default: 0 },
  diagnostic_total: { type: Number, default: 0 },
  diagnostic_unattempted: { type: Number, default: 0 },
  recheck_correct: { type: Number, default: 0 },
  recheck_total: { type: Number, default: 0 },
  total_score: { type: Number, default: 0 },
  avg_time_per_correct: { type: Number, default: 0 },
  answers: { type: [answerSchema], default: [] }
});

const mathScoreSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  attempts: { type: [attemptSchema], default: [] }
});

const MathScore = mongoose.model('MathScore', mathScoreSchema, 'math_scores');

async function addOrUpdateMathAttempt(username, email, attempt) {
  let user = await MathScore.findOne({ email });
  if (user) {
    user.attempts.push(attempt);
    await user.save();
  } else {
    user = new MathScore({ username, email, attempts: [attempt] });
    await user.save();
  }
  return user;
}

module.exports = { MathScore, addOrUpdateMathAttempt };

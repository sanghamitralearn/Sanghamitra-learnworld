// model/ExamScore.js
// One document per learner per exam family, holding every attempt they finished. Like the
// questions, each family has its own collection: sat_scores, gre_scores, gmat_scores,
// act_scores, cat_scores, jee_main_scores, jee_advanced_scores, gate_da_scores.
const mongoose = require('mongoose');
const { FAMILIES, collectionPrefix, modelPrefix } = require('./ExamQuestion');

const examAnswerSchema = new mongoose.Schema({
  item_id: { type: String, required: true },
  section: { type: String, default: '' },
  module: { type: Number, default: 0 },
  topic: { type: String, default: '' },
  response: { type: String, default: '' },     // chosen option id or typed SPR answer
  is_correct: { type: Boolean, required: true },
  skipped: { type: Boolean, default: false },
  time_elapsed: { type: Number, default: 0 }
}, { _id: false });

const sectionResultSchema = new mongoose.Schema({
  section: { type: String, default: '' },
  correct: { type: Number, default: 0 },
  total: { type: Number, default: 0 },
  unattempted: { type: Number, default: 0 },
  percent: { type: Number, default: 0 }
}, { _id: false });

const examAttemptSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  family: { type: String, default: '' },         // "sat" | "gre" | "gmat" | "act" | "cat"
  exam: { type: String, required: true },
  exam_label: { type: String, default: '' },
  scope: { type: String, enum: ['full', 'module'], default: 'module' }, // full-length paper or a single module
  section: { type: String, default: '' },        // '' for a full-length test
  section_name: { type: String, default: '' },
  module: { type: Number, default: 0 },          // 0 for a full-length test
  mode: { type: String, enum: ['practice', 'timed'], default: 'practice' },
  correct: { type: Number, default: 0 },
  total: { type: Number, default: 0 },
  unattempted: { type: Number, default: 0 },
  percent: { type: Number, default: 0 },         // correct / total, rounded
  section_results: { type: [sectionResultSchema], default: [] },
  time_spent: { type: Number, default: 0 },      // seconds
  answers: { type: [examAnswerSchema], default: [] }
});

const examScoreSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  attempts: { type: [examAttemptSchema], default: [] }
});
examScoreSchema.index({ email: 1 }, { unique: true });

const models = {};
function scoresFor(family) {
  if (!FAMILIES.includes(family)) throw new Error(`Unknown exam family: ${family}`);
  if (!models[family]) {
    models[family] = mongoose.model(`${modelPrefix(family)}ExamScore`, examScoreSchema, `${collectionPrefix(family)}_scores`);
  }
  return models[family];
}

const pct = (correct, total) => (total ? Math.round((correct / total) * 100) : 0);

// Fill in the totals from the answers so the stored score always matches them.
function summarise(attempt) {
  const answers = attempt.answers || [];
  const bySection = new Map();
  answers.forEach((a) => {
    const s = bySection.get(a.section) || { section: a.section, correct: 0, total: 0, unattempted: 0 };
    s.total += 1;
    if (a.is_correct) s.correct += 1;
    if (a.skipped) s.unattempted += 1;
    bySection.set(a.section, s);
  });
  const correct = answers.filter((a) => a.is_correct).length;
  return {
    ...attempt,
    correct,
    total: answers.length,
    unattempted: answers.filter((a) => a.skipped).length,
    percent: pct(correct, answers.length),
    section_results: [...bySection.values()].map((s) => ({ ...s, percent: pct(s.correct, s.total) })),
  };
}

async function addExamAttempt(family, username, email, attempt) {
  const Score = scoresFor(family);
  const entry = summarise({ ...attempt, family });
  let user = await Score.findOne({ email });
  if (user) {
    user.attempts.push(entry);
    await user.save();
  } else {
    user = new Score({ username, email, attempts: [entry] });
    await user.save();
  }
  return user;
}

module.exports = { scoresFor, addExamAttempt };

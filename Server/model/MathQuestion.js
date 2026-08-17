// model/MathQuestion.js
const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  correct: { type: Boolean, required: true },
  feedback: { type: String, required: true }
}, { _id: false });

const mathQuestionSchema = new mongoose.Schema({
  grade: { type: String, required: true },           // e.g. "grade-6"
  chapterSlug: { type: String, required: true },      // e.g. "ch-4-fractions"
  chapterName: { type: String, required: true },      // "Fractions"
  level: { type: Number, required: true, enum: [1, 2, 3, 4] },
  phase: { type: String, required: true, enum: ['warmup', 'diagnostic', 'recheck'] },
  itemId: { type: String, required: true },           // "w1", "d1", "r1" - unique within grade+chapter+level+phase
  order: { type: Number, required: true },
  cluster: { type: String, required: true },
  clusterName: { type: String, required: true },
  tier: { type: String, enum: ['S', 'C', 'H', 'T'], default: undefined }, // level 4 diagnostic only
  question: { type: String, required: true },
  options: { type: [optionSchema], required: true },
  explanation: { type: String, default: '' },
  retryHint: { type: String, default: '' },           // warmup only
  backward: { type: String, default: '' },            // bw - prior knowledge link
  forward: { type: String, default: '' },              // fw - forward link
  recheckFor: { type: String, default: '' },          // for phase="recheck": the diagnostic itemId it targets
  points: { type: Number, default: 10 }
});

mathQuestionSchema.index({ grade: 1, chapterSlug: 1, level: 1, phase: 1, order: 1 });

const MathQuestion = mongoose.model('MathQuestion', mathQuestionSchema, 'math_questions');
module.exports = MathQuestion;

// model/vocabQuestionSchema.js
const mongoose = require('mongoose');
const { misconceptionSchema, scaffoldingLevelSchema, forwardRiskLinkSchema } = require('./diagnosticFields');

const vocabQuestionSchema = new mongoose.Schema({
  questionType: { type: String, required: true },
  question: { type: String, required: true },
  options: {
    a: { type: String, required: true },
    b: { type: String, required: true },
    c: { type: String, required: true },
    d: { type: String, required: true },
  },
  correctOption: { type: String, required: true },
  explanation: { type: String, required: true },
  synonyms: { type: [String], required: true },
  antonyms: { type: [String], required: true },
  phonetic: { type: String, required: true },
  difficultyLevel: { type: String, required: true },
  CEFRLevel: { type: String, required: true },
  topic: { type: String, required: true },
  points: { type: Number, required: true },
  skillId: { type: String, default: '' },             // stable skill code for cross-domain risk tracking
  // Per-option feedback, keyed the same way as `options` above (a/b/c/d).
  // Optional and additive — old documents without it just show `explanation` as before.
  optionFeedback: {
    a: { type: String, default: '' },
    b: { type: String, default: '' },
    c: { type: String, default: '' },
    d: { type: String, default: '' }
  },
  // Which misconception (by misconceptionId, below) each wrong option represents.
  // The correct letter's entry should stay empty.
  optionMisconceptions: {
    a: { type: String, default: '' },
    b: { type: String, default: '' },
    c: { type: String, default: '' },
    d: { type: String, default: '' }
  },
  misconceptions: { type: [misconceptionSchema], default: [] },
  scaffoldingLevels: { type: [scaffoldingLevelSchema], default: [] },
  forwardRiskLinks: { type: [forwardRiskLinkSchema], default: [] },
  learningObjectives: { type: [String], default: [] }
});

const VocabQuestion = mongoose.model('VocabQuestion', vocabQuestionSchema, 'vocab_questions');

module.exports = VocabQuestion;

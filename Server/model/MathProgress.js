// model/MathProgress.js
// In-progress bootcamp state, one document per user + grade/chapter/level.
// Lets a student close the tab mid-quiz and pick up on the same question later.
// Deleted once the bootcamp reaches its final summary (or the student restarts).
const mongoose = require('mongoose');

const mathProgressSchema = new mongoose.Schema({
  email: { type: String, required: true },
  grade: { type: String, required: true },
  chapter_slug: { type: String, required: true },
  level: { type: Number, required: true },
  // Snapshot of the bootcamp's client state (phase, current question, answers,
  // option order, timer...). Shape is owned by MathBootcamp.jsx.
  state: { type: mongoose.Schema.Types.Mixed, required: true },
  updated_at: { type: Date, default: Date.now }
}, { minimize: false });

mathProgressSchema.index({ email: 1, grade: 1, chapter_slug: 1, level: 1 }, { unique: true });

module.exports = mongoose.model('MathProgress', mathProgressSchema, 'math_progress');

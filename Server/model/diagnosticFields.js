// model/diagnosticFields.js
//
// Shared sub-schemas for the misconception-diagnostic layer used by both
// MathQuestion and VocabQuestion. Every field here is additive: existing
// documents that don't set them keep working exactly as before.
const mongoose = require('mongoose');

// One named error pattern a wrong option can represent — the *why* behind
// the mistake, not just the mistake itself.
const misconceptionSchema = new mongoose.Schema({
  misconceptionId: { type: String, required: true },   // e.g. "E-MUL-01a" — referenced by an option's misconceptionId
  description: { type: String, required: true },       // what the student's wrong answer looks like
  rootCause: { type: String, required: true },          // why that answer felt right to them
  remediation: { type: String, required: true }         // what to do about it
}, { _id: false });

// A rung on the hint ladder shown when a student is stuck, from lightest
// nudge (level 1) to most explicit (level 3+).
const scaffoldingLevelSchema = new mongoose.Schema({
  level: { type: Number, required: true },
  description: { type: String, required: true },
  hint: { type: String, required: true }
}, { _id: false });

// A prediction: leaving this error unfixed tends to cause a specific error
// downstream, at a given confidence, if not remediated by a certain point.
const forwardRiskLinkSchema = new mongoose.Schema({
  targetSkillId: { type: String, required: true },
  probability: { type: Number, min: 0, max: 1, required: true },
  condition: { type: String, required: true }
}, { _id: false });

module.exports = { misconceptionSchema, scaffoldingLevelSchema, forwardRiskLinkSchema };

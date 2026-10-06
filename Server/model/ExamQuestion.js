// model/ExamQuestion.js
// One question from a competitive-exam practice test (SAT/PSAT, GRE, GMAT, ACT, CAT). Text fields are stored as
// render-ready HTML with inline LaTeX wrapped in \( ... \), the same convention the
// math bootcamp uses, so the frontend typesets them with MathJax.
const mongoose = require('mongoose');

const examOptionSchema = new mongoose.Schema({
  id: { type: String, required: true },       // "A" | "B" | "C" | "D" (GRE goes up to "I")
  text: { type: String, default: '' },
  image: { type: String, default: '' }        // public URL when the choice is a picture (e.g. a graph)
}, { _id: false });

const examQuestionSchema = new mongoose.Schema({
  exam: { type: String, required: true },          // "psat-8-9-1"
  section: { type: String, required: true },       // "reading-writing" | "math"
  module: { type: Number, required: true },        // 1 | 2
  order: { type: Number, required: true },         // position within the module
  questionNumber: { type: Number, required: true },// number printed in the official test
  itemId: { type: String, required: true },        // unique: "psat-8-9-1:math:m1:q07"
  sourceId: { type: String, default: '' },         // _id / question_id in the source dataset
  // multiple_choice           — pick one option
  // student_produced_response — typed numeric answer (SAT grid-in, GRE numeric entry)
  // multiple_select           — pick several options (GRE "select all", sentence equivalence)
  // multi_blank               — one option per blank (GRE two/three-blank text completion)
  // two_part                  — GMAT Two-Part Analysis: one option per column, all columns share the options
  // For multiple_select and multi_blank, correctAnswer is the sorted option ids joined with commas ("D,F");
  // for two_part it is one id per column, in column order ("B,D").
  type: {
    type: String,
    required: true,
    enum: ['multiple_choice', 'student_produced_response', 'multiple_select', 'multi_blank', 'two_part'],
  },
  columns: { type: [String], default: [] },       // two_part: column headings, e.g. ["Train Y Speed", "Train X Speed"]
  selectCount: { type: Number, default: 0 },       // multiple_select: exact number to pick (2 for sentence equivalence), 0 = any
  blanks: {                                        // multi_blank: which options belong to which blank
    type: [{ label: String, optionIds: [String], _id: false }],
    default: [],
  },
  topic: { type: String, default: '' },
  subtopic: { type: String, default: '' },
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' },
  passage: { type: String, default: '' },
  question: { type: String, required: true },
  image: { type: String, default: '' },            // stem figure / graph / table
  imageAlt: { type: String, default: '' },
  options: { type: [examOptionSchema], default: [] },
  correctAnswer: { type: String, required: true },    // option id, or the SPR value
  acceptedAnswers: { type: [String], default: [] },   // SPR: every equivalent form we accept
  explanation: { type: String, default: '' },
  points: { type: Number, default: 1 },
  averageTimeSeconds: { type: Number, default: 60 }
});

examQuestionSchema.index({ exam: 1, section: 1, module: 1, order: 1 });
examQuestionSchema.index({ itemId: 1 }, { unique: true });

// Each exam family keeps its questions in its own collection: sat_questions, gre_questions,
// gmat_questions, act_questions, cat_questions, jee_main_questions, jee_advanced_questions,
// gate_da_questions. The family comes from ExamModule.family.
const FAMILIES = ['sat', 'gre', 'gmat', 'act', 'cat', 'jee-main', 'jee-advanced', 'gate-da'];
const models = {};

// "jee-main" → collection prefix "jee_main", model prefix "JeeMain".
const collectionPrefix = (family) => family.replace(/-/g, '_');
const modelPrefix = (family) => family.split('-').map((w) => w[0].toUpperCase() + w.slice(1)).join('');

function forFamily(family) {
  if (!FAMILIES.includes(family)) throw new Error(`Unknown exam family: ${family}`);
  if (!models[family]) {
    models[family] = mongoose.model(`${modelPrefix(family)}ExamQuestion`, examQuestionSchema, `${collectionPrefix(family)}_questions`);
  }
  return models[family];
}

module.exports = { forFamily, FAMILIES, collectionPrefix, modelPrefix };

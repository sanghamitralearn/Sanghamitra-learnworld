// model/ExamModule.js
// Catalog of exam / section / module combinations, used to drive the Competitive Exams hub page.
// Mirrors MathChapter: exam ~ grade, section ~ chapter, module ~ level.
const mongoose = require('mongoose');

const examModuleSchema = new mongoose.Schema({
  family: { type: String, default: 'sat' },           // course id on the hub: "sat" | "gre" | … | "jee-main" | "gate-da"
  familyLabel: { type: String, default: 'SAT' },
  exam: { type: String, required: true },             // e.g. "psat-8-9-1"
  examLabel: { type: String, required: true },        // "PSAT 8/9 · Test 1"
  examOrder: { type: Number, default: 0 },            // tab order on the hub page
  section: { type: String, required: true },          // "reading-writing" | "math"
  sectionName: { type: String, required: true },      // "Reading and Writing"
  sectionOrder: { type: Number, default: 0 },
  module: { type: Number, required: true },           // 1 | 2
  unitName: { type: String, default: 'Module' },      // what the test calls a timed part: "Module" (SAT) | "Section" (GRE)
  unitNumber: { type: Number, default: 0 },           // number printed in the test booklet (GRE: 1-4); 0 = same as module
  title: { type: String, required: true },
  description: { type: String, default: '' },
  questionCount: { type: Number, default: 0 },
  topics: { type: [String], default: [] },
  timedSeconds: { type: Number, default: 0 },          // official time allowed for the timed run
  sourceCitation: { type: String, default: '' }
});

examModuleSchema.index({ exam: 1, section: 1, module: 1 }, { unique: true });

const ExamModule = mongoose.model('ExamModule', examModuleSchema, 'exam_modules');
module.exports = ExamModule;

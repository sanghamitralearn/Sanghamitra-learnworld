// model/MathChapter.js
// Catalog of grade / chapter / level combinations, used to drive the Math hub page.
const mongoose = require('mongoose');

const mathChapterSchema = new mongoose.Schema({
  grade: { type: String, required: true },          // e.g. "grade-6"
  gradeLabel: { type: String, required: true },      // "Grade 6"
  chapterSlug: { type: String, required: true },     // "ch-4-fractions"
  chapterName: { type: String, required: true },     // "Fractions"
  level: { type: Number, required: true, enum: [1, 2, 3, 4] },
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },    
  description: { type: String, default: '' },
  clusterNames: { type: Map, of: String, default: {} },
  gateReviewHTML: { type: String, default: '' },
  timedSeconds: { type: Number, default: 0 }          // 0 = untimed (levels 1-3), > 0 for level 4
});

mathChapterSchema.index({ grade: 1, chapterSlug: 1, level: 1 }, { unique: true });

const MathChapter = mongoose.model('MathChapter', mathChapterSchema, 'math_chapters');
module.exports = MathChapter;

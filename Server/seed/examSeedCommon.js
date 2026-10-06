// seed/examSeedCommon.js
//
// Shared helpers for the JEE Main, JEE Advanced and GATE DA seeds: LaTeX clean-up for the
// source exports, image lookup, explanation building and the per-family seed routine.

const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const ExamModule = require('../model/ExamModule');
const { forFamily } = require('../model/ExamQuestion');
const { toHtml, PUBLIC_DIR } = require('./examSeedSat');

// Some LaTeX commands were stored with a single backslash, so JSON turned "\neq" into a newline
// followed by "eq", "\theta" into a tab + "heta", and so on. Put the commands back.
// A newline is only treated as a broken "\n…" command inside math, where real line breaks never
// occur — so display math ($$…$$, \[…\]) is turned into single-$ math first.
function repairEscapes(s) {
  return String(s)
    .replace(/\t(?=[a-zA-Z])/g, '\\t')
    .replace(/\x08(?=[a-zA-Z])/g, '\\b')
    .replace(/\f(?=[a-zA-Z])/g, '\\f')
    .replace(/\r(?=[a-zA-Z])/g, '\\r')
    .replace(/\$\$([\s\S]+?)\$\$/g, (_, m) => `\n$\\displaystyle ${m.trim()}$\n`)
    .replace(/\\\[([\s\S]+?)\\\]/g, (_, m) => `\n$\\displaystyle ${m.trim()}$\n`)
    .replace(/\$[^$]+\$/g, (m) => m.replace(/\n(?=[a-zA-Z])/g, '\\n'));
}

// Source text -> the subset of LaTeX that toHtml understands.
function prepare(raw) {
  if (raw == null) return '';
  let s = repairEscapes(raw);
  s = s
    .replace(/\\textquotedbl\\?\s?/g, '"')
    .replace(/\\texttt\{([^{}]*)\}/g, '$1')
    .replace(/\\"i/g, 'ï');
  return s.trim();
}

const html = (raw) => toHtml(prepare(raw), { noPipeTables: true });

// Find a public image by name, ignoring the extension's case and .png/.jpg differences.
function publicImage(folder, file) {
  if (!file) return '';
  const dir = path.join(PUBLIC_DIR, 'exam-images', folder);
  const stem = path.basename(String(file)).replace(/\.[^.]+$/, '').toLowerCase();
  const match = fs.existsSync(dir) && fs.readdirSync(dir).find((f) => f.replace(/\.[^.]+$/, '').toLowerCase() === stem);
  if (match) return `/exam-images/${folder}/${match}`;
  console.warn(`  ! missing image ${folder}/${file}`);
  return '';
}

const list = (arr) => (arr || []).filter(Boolean);

// Worked solution if we have one; otherwise the approach and concepts the source tags.
function explanationHtml(q, own) {
  const parts = [];
  if (own) parts.push(`<p>${html(own)}</p>`);
  else if (q.solution_explanation) {
    parts.push(`<p>${html(q.solution_explanation)}</p>`);
    const steps = list(q.step_by_step_solution);
    if (steps.length > 1) parts.push(`<ol class="exq-steps">${steps.map((t) => `<li>${html(t)}</li>`).join('')}</ol>`);
  } else {
    const approach = list(q.problem_types)[0];
    const ideas = list(q.prerequisite_concepts).length ? list(q.prerequisite_concepts) : list(q.concept_tags);
    if (approach) parts.push(`<p><strong>Approach:</strong> ${html(approach)}.</p>`);
    if (ideas.length) parts.push(`<p><strong>Key ideas:</strong> ${html(ideas.join('; '))}.</p>`);
  }
  const mistake = list(q.common_mistakes)[0];
  if (mistake) parts.push(`<p class="exq-mistake"><strong>Common mistake:</strong> ${html(mistake)}</p>`);
  return parts.join('');
}

// Numerical answers: exact values, or an inclusive range written "a to b" (see ExamRunner).
function numericAnswer(answer) {
  if (answer && typeof answer === 'object' && 'min' in answer) return `${answer.min} to ${answer.max}`;
  return String(answer).trim();
}

// Group built questions into exam/section modules and replace this family's data.
async function seedFamily({ family, familyLabel, built, label }) {
  const groups = new Map();
  built.forEach((q) => {
    const k = `${q.exam}/${q.section}`;
    if (!groups.has(k)) groups.set(k, []);
    groups.get(k).push(q);
  });

  const questionDocs = [];
  const moduleDocs = [];
  for (const items of groups.values()) {
    items.sort((a, b) => a.questionNumber - b.questionNumber);
    const { exam, section } = items[0]._meta;
    items.forEach((q, i) => {
      const { _meta, ...doc } = q;
      questionDocs.push({ ...doc, order: i + 1 });
    });
    moduleDocs.push({
      family,
      familyLabel,
      exam: exam.slug,
      examLabel: exam.label,
      examOrder: exam.order,
      section: section.slug,
      sectionName: section.name,
      sectionOrder: section.order,
      module: 1,
      unitName: 'Section',
      unitNumber: section.order,
      title: `${exam.label} — ${section.name}`,
      description: section.description || '',
      questionCount: items.length,
      topics: [...new Set(items.map((q) => q.topic).filter(Boolean))],
      timedSeconds: typeof section.seconds === 'function' ? section.seconds(items.length) : section.seconds,
      sourceCitation: exam.citation,
    });
  }

  await mongoose.connect(process.env.DATABASE);
  console.log(`Connected to ${mongoose.connection.db.databaseName}`);
  const Question = forFamily(family);
  const delQ = await Question.deleteMany({});
  const delM = await ExamModule.deleteMany({ family });
  console.log(`Removed ${delQ.deletedCount} old questions, ${delM.deletedCount} old modules`);
  await Question.insertMany(questionDocs);
  await ExamModule.insertMany(moduleDocs);

  moduleDocs
    .sort((a, b) => a.examOrder - b.examOrder || a.sectionOrder - b.sectionOrder)
    .forEach((m) => console.log(`  ${m.examLabel.padEnd(30)} ${m.sectionName.padEnd(22)} ${String(m.questionCount).padStart(3)} q  ${m.timedSeconds / 60} min`));
  console.log(`Seeded ${questionDocs.length} ${label} questions into ${Question.collection.collectionName}.`);
  await mongoose.disconnect();
}

function run(seed) {
  seed().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}

module.exports = { prepare, html, publicImage, explanationHtml, numericAnswer, seedFamily, run };

// seed/examSeedSat.js
//
// Populates exam_modules and sat_questions with the official College Board
// PSAT 8/9 (Tests 1 & 2) and PSAT 10 practice tests.
//
// Source: seed/exam-data/sat_questions.json — an export of the
// `sanghamitralearn.sat_questions` collection. That dataset stores one document per
// question but has no module field, so the module is recovered from document order:
// within a paper + subject, the question number restarting (…32, 33, 1, 2…) marks
// the start of Module 2.
//
// Text is normalised here, once, into the same format the math bootcamp uses:
// HTML with inline LaTeX wrapped in \( ... \). LaTeX tables become HTML tables,
// underlined passages get <u>, and PDF-extraction leftovers are stripped.
//
// Run with: node seed/examSeedSat.js   (or: npm run seed:exams)

const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const ExamModule = require('../model/ExamModule');
const ExamQuestion = require('../model/ExamQuestion').forFamily('sat');

const SOURCE_FILE = path.join(__dirname, 'exam-data', 'sat_questions.json');
const PUBLIC_DIR = path.join(__dirname, '..', '..', 'Front', 'client', 'public');

const EXAMS = {
  'PSAT 8/9 #1': { slug: 'psat-8-9-1', label: 'PSAT 8/9 · Test 1', order: 1 },
  'PSAT 8/9 #2': { slug: 'psat-8-9-2', label: 'PSAT 8/9 · Test 2', order: 2 },
  'PSAT 10': { slug: 'psat-10', label: 'PSAT 10', order: 3 },
};

// Digital SAT/PSAT module timings: 32 min per Reading and Writing module and 35 min per
// Math module, i.e. 2h 14m for a full-length paper (2 + 2 modules).
const SECTIONS = {
  'Reading and Writing': {
    slug: 'reading-writing', name: 'Reading and Writing', order: 1, timedSeconds: 32 * 60,
    description: 'Words in context, text structure, evidence, grammar and transitions.',
  },
  Mathematics: {
    slug: 'math', name: 'Math', order: 2, timedSeconds: 35 * 60,
    description: 'Algebra, advanced math, problem solving, data analysis and geometry.',
  },
};

// Known errors in the source dataset, keyed "exam/section/module/question".
const PATCHES = {
  // The survey table was flattened into one line by PDF extraction.
  'psat-8-9-1/math/1/2': {
    question_text: 'Response | Frequency\nOnce a week or more | 3\nTwo or three times a month | 16\nAbout once a month | 26\nA few times a year | 73\nAlmost never | 53\nNever | 29\nTotal | 200\nThe table gives the results of a survey of 200 people who were asked how often they see a movie in a theater. How many people responded either "never" or "almost never"?',
  },
  'psat-8-9-1/math/1/4': {
    question_text: 'What value of $p$ satisfies the equation $5p + 180 = 250$?',
  },
  'psat-8-9-1/math/1/7': {
    question_text: 'The equation $46 = 2a + 2b$ gives the relationship between the side lengths $a$ and $b$ of a certain parallelogram. If $a = 9$, what is the value of $b$?',
  },
  // The worked solution expands to 8d^3 - 3d^2 - 48d + 18, which is choice D.
  'psat-8-9-1/math/1/22': { correct_answer: 'D' },
  // Choices B and D were garbled by PDF extraction.
  'psat-8-9-1/math/2/16': {
    options: {
      B: '$c = \\dfrac{b - 42}{f}$',
      D: '$c = b - 42 - f$',
    },
    explanationReplace: [['$b = -42 - c - f$', '$b = c + 42 + f$']],
  },
};

// ---------------------------------------------------------------------
// Text normalisation
// ---------------------------------------------------------------------

const escapeHtml = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Plain-text run (no $...$ math inside): escape, keep <u> markup, map LaTeX text commands.
function textRun(s) {
  return escapeHtml(s)
    .replace(/&lt;(\/?)u&gt;/g, '<$1u>')
    .replace(/\u0003/g, '<em>').replace(/\u0004/g, '</em>')
    .replace(/\u0005/g, '<strong>').replace(/\u0006/g, '</strong>')
    .replace(/\\text\{([^{}]*)\}/g, '$1')
    .replace(/\\underline\{\\hspace\{[^{}]*\}\}/g, '<span class="exq-blank"></span>')
    .replace(/\\\\/g, '\n')
    .replace(/\\quad\b/g, '&emsp;')
    .replace(/\\_/g, '_')
    .replace(/\\%/g, '%')
    .replace(/\\&amp;/g, '&amp;')
    .replace(/``/g, '“')
    .replace(/''/g, '”')
    .replace(/---/g, '—')
    .replace(/--/g, '–')
    .replace(/\n/g, '<br>');
}

// An escaped dollar (held as \u0002) must stay \$ inside math; in plain text it becomes "$".
const mathRun = (tex) => `\\(${escapeHtml(tex.trim()).replace(/\u0002/g, '\\$')}\\)`;

// \textit{...} / \textbf{...} in running text can wrap inline math ($13^{\circ}$), so they are
// swapped for marker characters with balanced-brace matching before the text/math split.
function markTextCommands(s) {
  const markers = { textit: ['\u0003', '\u0004'], textbf: ['\u0005', '\u0006'] };
  return s
    .replace(/\\(textit|textbf)\{/g, '\u0007$1{')
    .split('\u0007')
    .map((chunk, i) => {
      if (i === 0) return chunk;
      const cmd = chunk.startsWith('textit') ? 'textit' : 'textbf';
      let depth = 0;
      for (let j = cmd.length; j < chunk.length; j++) {
        if (chunk[j] === '{') depth++;
        else if (chunk[j] === '}' && --depth === 0) {
          const [open, close] = markers[cmd];
          return open + chunk.slice(cmd.length + 1, j) + close + chunk.slice(j + 1);
        }
      }
      return `\\${chunk}`;
    })
    .join('');
}

// Inline content: alternating plain text and $...$ math.
function inline(s) {
  let out = '';
  let last = 0;
  const re = /\$([^$]+)\$/g;
  let m;
  while ((m = re.exec(s))) {
    out += textRun(s.slice(last, m.index)) + mathRun(m[1]);
    last = re.lastIndex;
  }
  return out + textRun(s.slice(last));
}

function htmlTable(rows) {
  const [head, ...body] = rows;
  const tr = (cells, tag) => `<tr>${cells.map((c) => `<${tag}>${c}</${tag}>`).join('')}</tr>`;
  return `<table class="exq-table"><thead>${tr(head, 'th')}</thead><tbody>${body.map((r) => tr(r, 'td')).join('')}</tbody></table>`;
}

function splitLatexRows(body) {
  return body
    .replace(/\\hline/g, '')
    .split(/\\\\(?:\[[^\]]*\])?/)
    .map((r) => r.trim())
    .filter(Boolean)
    .map((r) => r.split('&').map((c) => c.trim()));
}

// \begin{array} is math mode: each cell is TeX unless it is a \text / \textbf label.
function arrayCell(c) {
  if (!c) return '';
  if (/\\text(bf)?\{/.test(c)) {
    return escapeHtml(c)
      .replace(/\\textbf\{([^{}]*)\}/g, '<strong>$1</strong>')
      .replace(/\\text\{([^{}]*)\}/g, '$1')
      .trim();
  }
  return mathRun(c);
}

// "a | b | c" lines (markdown-style tables in some passages) -> HTML table.
function pipeTables(s, found) {
  const lines = s.split('\n');
  const out = [];
  for (let i = 0; i < lines.length; i++) {
    if (!lines[i].includes('|') || !(lines[i + 1] || '').includes('|')) { out.push(lines[i]); continue; }
    const rows = [];
    while (i < lines.length && lines[i].includes('|')) {
      const cells = lines[i].replace(/^\s*\|/, '').replace(/\|\s*$/, '').split('|').map((c) => c.trim());
      if (!cells.every((c) => /^:?-{2,}:?$/.test(c))) rows.push(cells.map(inline));
      i++;
    }
    i--;
    found.table = true;
    out.push(`\u0001${found.blocks.push(htmlTable(rows)) - 1}\u0001`);
  }
  return out.join('\n');
}

function toHtml(raw, ctx = {}) {
  if (raw == null || raw === '') return '';
  const blocks = [];
  const found = { blocks, table: false };
  const hold = (html) => `\u0001${blocks.push(html) - 1}\u0001`;

  let s = String(raw).replace(/\\\$/g, '\u0002').replace(/\\checkmark/g, '✓');

  if (ctx.stripFigureText) {
    s = s.replace(/\s*\[(?:Graph|Stem Graph|Histograms?|Scatterplot|Figure)[:\s][\s\S]*?\.\]/g, '');
  }
  if (ctx.bullets) s = s.replace(/\s+•\s+/g, '\n• ');

  s = s.replace(/\$?\\begin\{array\}\{[^}]*\}([\s\S]*?)\\end\{array\}\$?/g, (_, body) => {
    found.table = true;
    return hold(htmlTable(splitLatexRows(body).map((r) => r.map(arrayCell))));
  });
  s = s.replace(/\\begin\{tabular\}\{[^}]*\}([\s\S]*?)\\end\{tabular\}/g, (_, body) => {
    found.table = true;
    return hold(htmlTable(splitLatexRows(body).map((r) => r.map((c) => inline(c)))));
  });
  s = s.replace(/\\begin\{enumerate\}(?:\[([^\]]*)\])?([\s\S]*?)\\end\{enumerate\}/g, (_, label, body) => {
    const type = /^I/.test(label || '') ? ' type="I"' : '';
    const items = body.split('\\item').map((t) => t.trim()).filter(Boolean);
    return hold(`<ol${type}>${items.map((t) => `<li>${inline(t)}</li>`).join('')}</ol>`);
  });
  // JEE/GATE text uses |x| for absolute values, which would look like table rows.
  if (!ctx.noPipeTables) s = pipeTables(s, found);
  s = markTextCommands(s);

  let html = inline(s.trim())
    .replace(/(<br>\s*)*\u0001(\d+)\u0001(\s*<br>)*/g, (_, _a, i) => blocks[Number(i)])
    .replace(/\u0002/g, '$');

  if (ctx.report) ctx.report.table = ctx.report.table || found.table;
  return html;
}

// Underlined passages that the source only lists separately get wrapped in <u> here.
function underline(passage, parts) {
  if (!passage || !parts || !parts.length || /<u>/.test(passage)) return passage;
  let out = passage;
  parts.forEach((p) => {
    const needle = String(p).trim();
    if (needle && out.includes(needle)) out = out.replace(needle, `<u>${needle}</u>`);
  });
  return out;
}

// PDF running headers/footers that leaked into explanations and choices.
function stripPdfJunk(s) {
  if (!s) return s;
  return s
    .replace(/\s*(\d+\s+)?PSAT 8\/9 PRACTICE TEST #\d ANSWER EXPLANATIONS/g, '')
    .replace(/\s*PSAT 8\/9 ANSWER EXPLANATIONS n( READING AND WRITING: MODULE \d(\s+\d+)?)?/g, '')
    .replace(/\s*STOP If you finish before time is called[\s\S]*$/, '')
    .trim();
}

function bestExplanation(q) {
  const candidates = [q.solution_explanation, q.correct_answer_explanation, q.answer_explanation]
    .filter((x) => typeof x === 'string');
  return candidates.sort((a, b) => b.length - a.length)[0] || '';
}

// "Note that .48 and $\frac{12}{25}$ are examples of ways to enter a correct answer."
function acceptedAnswers(q, explanation) {
  const answers = new Set([String(q.correct_answer).trim()]);
  const note = explanation.match(/Note that (.+?) (?:are|is) examples? of ways to enter a correct answer/);
  if (note) {
    note[1].split(/,\s*|\s+and\s+/).forEach((part) => {
      const v = part.trim()
        .replace(/^\$|\$$/g, '')
        .replace(/\\d?frac\{([^}]*)\}\{([^}]*)\}/, '$1/$2');
      if (v) answers.add(v);
    });
  }
  return [...answers];
}

// ---------------------------------------------------------------------
// Image helpers
// ---------------------------------------------------------------------

function publicImage(examSlug, file) {
  if (!file) return '';
  const name = path.basename(String(file));
  const rel = `/exam-images/${examSlug}/${name}`;
  if (fs.existsSync(path.join(PUBLIC_DIR, rel))) return rel;
  console.warn(`  ! missing image ${rel}`);
  return '';
}

function figureText(passage) {
  const m = String(passage || '').match(/\[((?:Graph|Stem Graph|Histograms?|Scatterplot|Figure)[:\s][\s\S]*?\.)\]/);
  return m ? m[1] : '';
}

// ---------------------------------------------------------------------
// Build
// ---------------------------------------------------------------------

function assignModules(docs) {
  // docs are already in _id order; a question number that doesn't increase starts a new module.
  const byGroup = {};
  const result = [];
  docs.forEach((d) => {
    const key = `${d.paper}|${d.subject}`;
    const g = byGroup[key] || (byGroup[key] = { module: 1, last: 0 });
    if (d.question_number <= g.last) g.module += 1;
    g.last = d.question_number;
    result.push({ ...d, module: g.module });
  });
  return result;
}

function loadSource() {
  const raw = JSON.parse(fs.readFileSync(SOURCE_FILE, 'utf8'));
  const flat = assignModules(raw.filter((d) => !d.questions));

  // Bundle documents repeat the per-question documents; use them only to fill gaps.
  const have = new Set(flat.map((d) => `${d.paper}|${d.subject}|${d.module}|${d.question_number}`));
  raw.filter((d) => Array.isArray(d.questions)).forEach((bundle) => {
    const inner = assignModules(bundle.questions.map((q, i) => ({
      ...q, paper: bundle.paper, _id: `${bundle._id}#${i}`, question_id: bundle.question_id,
    })));
    inner.forEach((q) => {
      const key = `${q.paper}|${q.subject}|${q.module}|${q.question_number}`;
      if (!have.has(key)) {
        have.add(key);
        flat.push(q);
      }
    });
  });
  return flat;
}

function buildQuestion(src) {
  const exam = EXAMS[src.paper];
  const section = SECTIONS[src.subject];
  if (!exam || !section) throw new Error(`Unknown paper/subject: ${src.paper} / ${src.subject}`);

  const patchKey = `${exam.slug}/${section.slug}/${src.module}/${src.question_number}`;
  const patch = PATCHES[patchKey] || {};
  const q = { ...src, ...(patch.question_text ? { question_text: patch.question_text } : {}) };
  if (patch.correct_answer) q.correct_answer = patch.correct_answer;

  const image = publicImage(exam.slug, q.image_url || (q.visual_assets && q.visual_assets.image_url));
  const report = {};
  const passageRaw = underline(q.passage || '', q.underlined_passages);
  const passage = toHtml(passageRaw, { stripFigureText: !!image, bullets: true, report });
  // When the passage already carries the data as a real table, the table image is redundant.
  const keepImage = image && !(report.table && /table/i.test(image));

  let explanation = stripPdfJunk(bestExplanation(q));
  (patch.explanationReplace || []).forEach(([from, to]) => { explanation = explanation.split(from).join(to); });

  const options = (q.options || []).map((o) => ({
    id: o.option_id,
    text: toHtml(stripPdfJunk((patch.options && patch.options[o.option_id]) || o.text || '')),
    image: publicImage(exam.slug, (q.option_images || {})[o.option_id]),
  }));

  const type = q.type === 'student_produced_response' ? 'student_produced_response' : 'multiple_choice';

  return {
    exam: exam.slug,
    section: section.slug,
    module: q.module,
    questionNumber: q.question_number,
    itemId: `${exam.slug}:${section.slug}:m${q.module}:q${String(q.question_number).padStart(2, '0')}`,
    sourceId: String(q._id || q.question_id || ''),
    type,
    topic: q.topic && q.topic !== 'General' ? q.topic : '',
    subtopic: q.subtopic && q.subtopic !== 'General' ? q.subtopic : '',
    difficulty: ['easy', 'medium', 'hard'].includes(q.difficulty) ? q.difficulty : 'medium',
    passage,
    question: toHtml(q.question_text || ''),
    image: keepImage ? image : '',
    imageAlt: (q.visual_assets && q.visual_assets.diagram_description) || figureText(q.passage) || 'Figure for this question',
    options,
    correctAnswer: String(q.correct_answer).trim(),
    acceptedAnswers: type === 'student_produced_response' ? acceptedAnswers(q, explanation) : [],
    explanation: toHtml(explanation),
    points: q.points || 1,
    averageTimeSeconds: q.average_time_seconds || 60,
    _meta: { exam, section },
  };
}

async function seed() {
  const source = loadSource();
  const built = source.map(buildQuestion);

  // Order inside each module by question number.
  const modules = new Map();
  built.forEach((q) => {
    const key = `${q.exam}|${q.section}|${q.module}`;
    if (!modules.has(key)) modules.set(key, []);
    modules.get(key).push(q);
  });

  const questionDocs = [];
  const moduleDocs = [];
  for (const items of modules.values()) {
    items.sort((a, b) => a.questionNumber - b.questionNumber);
    const { exam, section } = items[0]._meta;
    items.forEach((q, i) => {
      const { _meta, ...doc } = q;
      questionDocs.push({ ...doc, order: i + 1 });
    });
    const topics = [...new Set(items.map((q) => q.topic).filter(Boolean))];
    moduleDocs.push({
      family: 'sat',
      familyLabel: 'SAT',
      exam: exam.slug,
      examLabel: exam.label,
      examOrder: exam.order,
      section: section.slug,
      sectionName: section.name,
      sectionOrder: section.order,
      module: items[0].module,
      title: `${exam.label} — ${section.name}, Module ${items[0].module}`,
      description: section.description,
      questionCount: items.length,
      topics,
      timedSeconds: section.timedSeconds,
      sourceCitation: 'College Board Official SAT/PSAT Practice Test',
    });
  }

  await mongoose.connect(process.env.DATABASE);
  console.log(`Connected to ${mongoose.connection.db.databaseName}`);

  const slugs = Object.values(EXAMS).map((e) => e.slug);
  const delQ = await ExamQuestion.deleteMany({ exam: { $in: slugs } });
  const delM = await ExamModule.deleteMany({ exam: { $in: slugs } });
  console.log(`Removed ${delQ.deletedCount} old questions, ${delM.deletedCount} old modules`);

  await ExamQuestion.insertMany(questionDocs);
  await ExamModule.insertMany(moduleDocs);

  moduleDocs
    .sort((a, b) => a.examOrder - b.examOrder || a.sectionOrder - b.sectionOrder || a.module - b.module)
    .forEach((m) => console.log(`  ${m.examLabel.padEnd(18)} ${m.sectionName.padEnd(20)} Module ${m.module}: ${m.questionCount} questions`));
  console.log(`Seeded ${questionDocs.length} questions across ${moduleDocs.length} modules.`);

  await mongoose.disconnect();
}

if (require.main === module) {
  seed().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}

module.exports = { toHtml, underline, loadSource, buildQuestion, PUBLIC_DIR };

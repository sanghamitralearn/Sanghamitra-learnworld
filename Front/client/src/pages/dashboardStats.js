import { ALL_COURSES, entriesFor, percentOf } from './admin/adminCourses';

// Turns the catalogs and a learner's raw attempts into what the student dashboard shows.
// Nothing here is estimated: an empty catalog or attempt list yields empty numbers, not placeholders.

const plural = (count, word) => `${count} ${word}${count === 1 ? '' : 's'}`;

// What the vocabulary test stores as the response to a question left unanswered.
const VOCAB_SKIPPED = 'You did not answer this question.';

const summariseEntries = (entries) => {
  const correct = entries.reduce((sum, e) => sum + (e.correct || 0), 0);
  const total = entries.reduce((sum, e) => sum + (e.total || 0), 0);
  return {
    attempts: entries.length,
    accuracy: percentOf(correct, total),
    lastDate: entries.length ? entries[entries.length - 1].date : null
  };
};

const statusOf = (done, total, attempts) => {
  if (total > 0 && done >= total) return 'completed';
  if (attempts > 0) return 'progress';
  return total > 0 ? 'new' : 'soon';
};

function mathsCourse(course, catalog, attempts) {
  const levels = new Set(catalog.map((r) => `${r.grade}/${r.chapterSlug}/${r.level}`));
  const chapters = new Set(catalog.map((r) => `${r.grade}/${r.chapterSlug}`));
  const entries = entriesFor('maths', { attempts });
  const done = new Set(entries.map((a) => `${a.grade}/${a.chapter_slug}/${a.level}`).filter((k) => levels.has(k)));
  return {
    ...course,
    to: '/math',
    unit: 'levels',
    tags: levels.size ? [plural(chapters.size, 'chapter'), plural(levels.size, 'level')] : [],
    done: done.size,
    total: levels.size,
    entries
  };
}

function examCourse(course, catalog, attempts) {
  const rows = catalog.filter((r) => (r.family || 'sat') === course.key);
  const papers = new Set(rows.map((r) => r.exam));
  const questions = rows.reduce((sum, r) => sum + (r.questionCount || 0), 0);
  const entries = entriesFor(course.key, { attempts });
  const done = new Set(entries.filter((a) => a.scope === 'full' && papers.has(a.exam)).map((a) => a.exam));
  return {
    ...course,
    to: `/competitive-exams/${course.key}`,
    unit: 'papers',
    tags: papers.size ? [plural(papers.size, 'paper'), plural(questions, 'question')] : [],
    done: done.size,
    total: papers.size,
    entries
  };
}

// A learner's vocabulary quizzes as attempts, oldest first.
export function vocabEntries(assessments = []) {
  return assessments
    .map((a) => {
      const questions = a.questions || [];
      return {
        id: a._id,
        date: a.date,
        score: a.total_score,
        questions,
        correct: questions.filter((q) => q.is_correct).length,
        total: questions.length,
        unattempted: questions.filter((q) => q.user_response === '' || q.user_response === VOCAB_SKIPPED).length
      };
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date));
}

// Topics from the latest quiz: 75%+ is a strength, under 50% a weakness.
export function vocabTopics(latest) {
  const byTopic = {};
  (latest?.questions || []).forEach((q) => {
    const t = (byTopic[q.topic] ||= { correct: 0, total: 0 });
    t.total += 1;
    if (q.is_correct) t.correct += 1;
  });
  const strengths = [];
  const weaknesses = [];
  Object.entries(byTopic).forEach(([topic, { correct, total }]) => {
    const pct = (correct / total) * 100;
    if (pct >= 75) strengths.push(topic);
    else if (pct < 50) weaknesses.push(topic);
  });
  return { strengths, weaknesses };
}

const skippedOf = (e) => (e.diagnostic_unattempted ?? e.unattempted) || 0;

// Every course we offer, most recently studied first, then not-started, then not-yet-published.
// Vocabulary isn't in the course catalog, so it only appears for learners who already have quizzes.
export function buildCourses({ mathCatalog, examCatalog, mathAttempts, examAttempts, vocab }) {
  const courses = ALL_COURSES.map((course) => (course.key === 'maths'
    ? mathsCourse(course, mathCatalog, mathAttempts)
    : examCourse(course, examCatalog, examAttempts)));

  if (vocab.length) {
    courses.push({
      key: 'vocabulary',
      label: 'Vocabulary',
      icon: 'bi-book-half',
      to: '/vocab-analytics',
      unit: null,
      tags: [plural(vocab.length, 'quiz').replace('quizs', 'quizzes')],
      done: 0,
      total: 0,
      entries: vocab
    });
  }

  const rank = { progress: 0, completed: 1, new: 2, soon: 3 };
  return courses
    .map((c) => {
      const stats = summariseEntries(c.entries);
      const status = statusOf(c.done, c.total, stats.attempts);
      return { ...c, ...stats, status, percent: c.total ? percentOf(c.done, c.total) : null };
    })
    .sort((a, b) => rank[a.status] - rank[b.status]
      || new Date(b.lastDate || 0) - new Date(a.lastDate || 0));
}

export function overallStats(courses) {
  const entries = courses.flatMap((c) => c.entries);
  const correct = entries.reduce((sum, e) => sum + (e.correct || 0), 0);
  const total = entries.reduce((sum, e) => sum + (e.total || 0), 0);
  const skipped = entries.reduce((sum, e) => sum + skippedOf(e), 0);
  const count = (status) => courses.filter((c) => c.status === status).length;
  return {
    attempts: entries.length,
    accuracy: percentOf(correct, total),
    correct,
    wrong: Math.max(total - correct - skipped, 0),
    skipped,
    total,
    inProgress: count('progress'),
    notStarted: count('new'),
    completed: count('completed')
  };
}

const startOfDay = (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());
const shiftDays = (date, days) => new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
const shortDate = (date) => date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

// Attempts per bucket: 'week' is the last 7 days, 'month' the last 4 seven-day spans. Both end today.
export function buildActivity(courses, range, now = new Date()) {
  const size = range === 'month' ? 7 : 1;
  const count = range === 'month' ? 4 : 7;
  const today = startOfDay(now);
  const buckets = Array.from({ length: count }, (_, i) => {
    const start = shiftDays(today, -(count - 1 - i) * size - (size - 1));
    const last = shiftDays(start, size - 1);
    return {
      key: start.toISOString(),
      start,
      end: shiftDays(last, 1),
      label: size === 1 ? start.toLocaleDateString('en-US', { weekday: 'short' }) : shortDate(start),
      detail: size === 1
        ? start.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })
        : `${shortDate(start)} – ${shortDate(last)}`,
      value: 0
    };
  });
  courses.flatMap((c) => c.entries).forEach((e) => {
    const date = new Date(e.date);
    const bucket = buckets.find((b) => date >= b.start && date < b.end);
    if (bucket) bucket.value += 1;
  });
  return buckets;
}

// What to do next: the course studied most recently, otherwise the first one not started.
// Vocabulary has no unit to work through (its card only opens quiz results), so it's never suggested.
export function nextStep(courses) {
  const available = courses.filter((c) => c.unit);
  const course = available.find((c) => c.status === 'progress') || available.find((c) => c.status === 'new');
  if (!course) {
    return available.some((c) => c.status === 'completed')
      ? { title: 'All courses completed', detail: 'Reattempt any paper to beat your best score.', cta: 'Practice', to: '/competitive-exams' }
      : { title: 'Explore our courses', detail: 'Find a course to start learning.', cta: 'Browse', to: '/competitive-exams' };
  }
  const started = course.status === 'progress';
  return {
    title: `${started ? 'Continue' : 'Start'} ${course.label}`,
    detail: started ? `${course.done} of ${course.total} ${course.unit} done` : course.tags.join(' · '),
    cta: started ? 'Continue' : 'Start',
    to: course.to
  };
}

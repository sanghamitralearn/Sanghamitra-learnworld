import { apiFetch } from '../../api/client';

// Courses shown on the admin home, grouped the way the cards are laid out.
export const COURSE_GROUPS = [
  {
    title: 'Core Subjects',
    icon: 'bi-mortarboard-fill',
    courses: [
      { key: 'maths', label: 'Mathematics', icon: 'bi-calculator', tone: 'blue' }
    ]
  },
  {
    title: 'Competitive Exams',
    icon: 'bi-trophy-fill',
    courses: [
      { key: 'sat', label: 'SAT', icon: 'bi-pencil-fill', tone: 'purple' },
      { key: 'gre', label: 'GRE', icon: 'bi-mortarboard', tone: 'teal' },
      { key: 'gmat', label: 'GMAT', icon: 'bi-briefcase-fill', tone: 'slate' },
      { key: 'act', label: 'ACT', icon: 'bi-card-checklist', tone: 'pink' },
      { key: 'cat', label: 'CAT', icon: 'bi-check2-square', tone: 'green' },
      { key: 'jee-main', label: 'JEE Main', icon: 'bi-lightning-charge-fill', tone: 'yellow' },
      { key: 'jee-advanced', label: 'JEE Advanced', icon: 'bi-award-fill', tone: 'red' },
      { key: 'gate-da', label: 'GATE DA', icon: 'bi-cpu-fill', tone: 'blue' }
    ]
  }
];

export const ALL_COURSES = COURSE_GROUPS.flatMap((g) => g.courses);
export const findCourse = (key) => ALL_COURSES.find((c) => c.key === key);
export const isExamCourse = (key) => key !== 'maths';

export const percentOf = (correct, total) => (total ? Math.round((correct / total) * 100) : null);

export function scoreTone(pct) {
  if (pct === null || pct === undefined) return 'muted';
  if (pct >= 70) return 'high';
  if (pct >= 40) return 'mid';
  return 'low';
}

export const formatDate = (date) => new Date(date).toLocaleDateString();

// One student's attempts in a course, oldest first. Every entry carries correct / total / percent
// so the dashboards can score maths and exam attempts the same way.
export function entriesFor(key, doc) {
  let entries;
  if (key === 'maths') {
    entries = (doc.attempts || []).map((a) => {
      const correct = a.warmup_correct + a.diagnostic_correct + a.recheck_correct;
      const total = a.warmup_total + a.diagnostic_total + a.recheck_total;
      return { ...a, correct, total, percent: percentOf(correct, total) ?? 0 };
    });
  } else {
    entries = (doc.attempts || []).filter((a) => a.family === key);
  }
  return entries.sort((a, b) => new Date(a.date) - new Date(b.date));
}

// Students who attempted the course (from /admin/scores), most recently active first.
export function courseStudents(scores, key) {
  const docs = (key === 'maths' ? scores.math : scores.exams) || [];
  return docs
    .map((doc) => ({ username: doc.username, email: doc.email, entries: entriesFor(key, doc) }))
    .filter((r) => r.entries.length > 0)
    .sort((a, b) => new Date(b.entries[b.entries.length - 1].date) - new Date(a.entries[a.entries.length - 1].date));
}

// Sections of an exam family in paper order, e.g. [{ code: 'math', name: 'Math' }]. Sections that only
// appear in attempts (not in the catalog) are appended so no score is ever hidden.
export async function loadSections(family, entries = []) {
  const sections = [];
  const add = (code, name) => {
    if (code && !sections.some((s) => s.code === code)) sections.push({ code, name: name || code });
  };
  try {
    const response = await apiFetch('/exams/catalog');
    if (response.ok) {
      const modules = await response.json();
      modules
        .filter((m) => m.family === family)
        .sort((a, b) => a.sectionOrder - b.sectionOrder)
        .forEach((m) => add(m.section, m.sectionName));
    }
  } catch (err) {
    console.error('Error loading exam catalog:', err);
  }
  entries.forEach((a) => {
    if (a.scope === 'module') add(a.section, a.section_name);
    (a.section_results || []).forEach((s) => add(s.section));
  });
  return sections;
}

export const latestWhere = (entries, test) => [...entries].reverse().find(test) || null;
export const fullTests = (entries) => entries.filter((a) => a.scope === 'full');
export const moduleAttempts = (entries, code) => entries.filter((a) => a.scope === 'module' && a.section === code);

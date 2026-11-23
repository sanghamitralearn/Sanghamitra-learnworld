// Chapter / cluster / gap analytics for maths, shared by the class insights page and the student page.
//
// "Topic" here is a question's `cluster` field (e.g. HCF, ROUND) — the skill a question tests inside a
// chapter. "Cluster" in the UI means a performance band of students (Advanced, Proficient, …).
import { apiFetch } from '../../api/client';
import { gradeNumber } from './adminCourses';

export const DEFAULT_THRESHOLD = 60;

// Performance bands, best first. A student's band comes from their average chapter score.
export const BANDS = [
  { id: 'advanced', label: 'Advanced', min: 85, tone: 'green' },
  { id: 'proficient', label: 'Proficient', min: 70, tone: 'blue' },
  { id: 'developing', label: 'Developing', min: 50, tone: 'amber' },
  { id: 'at-risk', label: 'At-Risk', min: 0, tone: 'red' }
];

export const bandFor = (pct) => BANDS.find((b) => pct >= b.min) || BANDS[BANDS.length - 1];

export const SEVERITIES = ['high', 'medium', 'low'];
export const SEVERITY_LABEL = { high: 'High', medium: 'Medium', low: 'Low' };

// How far below the threshold one student's topic score is.
export function studentSeverity(pct, threshold) {
  if (pct < threshold * 0.6) return 'high';
  if (pct < threshold * 0.85) return 'medium';
  return 'low';
}

export const ACTIONS = {
  high: { label: 'Teacher support', icon: 'bi-person-raised-hand' },
  medium: { label: 'Revision', icon: 'bi-book' },
  low: { label: 'Practice set', icon: 'bi-pencil-square' }
};

// How widespread a topic gap is across the students who attempted the chapter.
export function chapterGapSeverity(affected, attempted) {
  const share = attempted ? affected / attempted : 0;
  if (share >= 0.5) return 'high';
  if (share >= 0.25) return 'medium';
  return 'low';
}

export const STATUS = {
  'on-track': { label: 'On Track', tone: 'green' },
  attention: { label: 'Needs Attention', tone: 'amber' },
  critical: { label: 'Critical', tone: 'red' }
};

// 'green' | 'amber' | 'red' for a score, relative to the gap threshold.
export function ragTone(pct, threshold = DEFAULT_THRESHOLD) {
  if (pct === null || pct === undefined) return 'muted';
  if (pct >= 70 && pct >= threshold) return 'green';
  if (pct >= threshold) return 'amber';
  return 'red';
}

const avg = (nums) => (nums.length ? Math.round(nums.reduce((s, n) => s + n, 0) / nums.length) : 0);
const pctOf = (c, t) => (t ? Math.round((c / t) * 100) : 0);
export const chapterKey = (a) => `${a.grade}|${a.chapter_slug}`;

let catalogPromise = null;
// { chapters: [{ key, grade, chapterName, levels: [1,2,3,4], topics: { HCF: 'Highest Common Factor' } }] }
export function loadMathCatalog() {
  if (!catalogPromise) {
    catalogPromise = apiFetch('/admin/math/catalog')
      .then((r) => (r.ok ? r.json() : { chapters: [] }))
      .catch(() => ({ chapters: [] }));
    catalogPromise.then((c) => { if (!c.chapters.length) catalogPromise = null; });
  }
  return catalogPromise;
}

// One student's results per chapter. Within a chapter, only the latest attempt at each level counts,
// so a student who retook a level and improved isn't still flagged for the old mistakes.
// Questions the student never reached (not_attempted) are left out of topic scores.
export function studentChapters(entries, catalogByKey) {
  const byChapter = new Map();
  entries.forEach((a) => {
    const key = chapterKey(a);
    if (!byChapter.has(key)) byChapter.set(key, []);
    byChapter.get(key).push(a);
  });

  return [...byChapter.entries()].map(([key, attempts]) => {
    const latestByLevel = new Map();
    attempts.forEach((a) => {
      const prev = latestByLevel.get(a.level);
      if (!prev || new Date(a.date) >= new Date(prev.date)) latestByLevel.set(a.level, a);
    });
    const latest = [...latestByLevel.values()];
    const catalog = catalogByKey.get(key);

    const topics = new Map();
    latest.forEach((a) => (a.answers || []).forEach((ans) => {
      if (ans.not_attempted || !ans.cluster) return;
      const t = topics.get(ans.cluster) || {
        code: ans.cluster,
        name: catalog?.topics?.[ans.cluster] || ans.cluster_name || ans.cluster,
        correct: 0,
        total: 0
      };
      t.total += 1;
      if (ans.is_correct) t.correct += 1;
      topics.set(ans.cluster, t);
    }));
    topics.forEach((t) => { t.percent = pctOf(t.correct, t.total); });

    const levelsTotal = catalog?.levels?.length || Math.max(...latest.map((a) => a.level), 1);
    const first = attempts[0];
    return {
      key,
      chapterName: first.chapter_name,
      grade: first.grade,
      percent: avg(latest.map((a) => a.percent)),
      attempts: attempts.length,
      levelsDone: latestByLevel.size,
      levelsTotal,
      completion: Math.min(100, pctOf(latestByLevel.size, levelsTotal)),
      lastDate: attempts.reduce((d, a) => (new Date(a.date) > new Date(d) ? a.date : d), first.date),
      topics: [...topics.values()].sort((x, y) => x.percent - y.percent)
    };
  });
}

// Topics below the threshold, weakest first, each with a severity and suggested action.
export function topicGaps(chapter, threshold) {
  return chapter.topics
    .filter((t) => t.total > 0 && t.percent < threshold)
    .map((t) => {
      const severity = studentSeverity(t.percent, threshold);
      return { ...t, severity, action: ACTIONS[severity] };
    });
}

// ---------- One student's diagnosis (student page) ----------

const SEV_RANK = { high: 0, medium: 1, low: 2 };
const LEVEL_NAMES = { 1: 'Core', 2: 'Advanced Core', 3: 'Synthesis', 4: 'Speed Run' };
export const levelName = (n) => LEVEL_NAMES[n] || `Level ${n}`;

// Diagnostic questions the student actually answered (not skipped, not left unreached).
function diagnosticAnswered(a) {
  const rows = (a.answers || []).filter((x) => x.phase === 'diagnostic');
  if (!rows.length) return a.diagnostic_total - (a.diagnostic_unattempted || 0);
  return rows.filter((x) => !x.not_attempted && !x.skipped).length;
}

// A diagnostic where fewer than half the questions were answered — its score says little about
// what the student knows, so it's flagged as incomplete rather than read as a knowledge gap.
export const isIncompleteDiagnostic = (a) => a.diagnostic_total > 0 && diagnosticAnswered(a) < a.diagnostic_total * 0.5;

export const DIAGNOSIS_STATUS = {
  critical: { label: 'Needs intervention', tone: 'red', icon: 'bi-exclamation-octagon-fill' },
  attention: { label: 'Needs attention', tone: 'amber', icon: 'bi-exclamation-triangle-fill' },
  'on-track': { label: 'On track', tone: 'green', icon: 'bi-check-circle-fill' }
};

// The latest attempt at each chapter + level (what is still true today).
export function currentAttempts(entries) {
  const latest = new Map();
  entries.forEach((a) => {
    const k = `${chapterKey(a)}|${a.level}`;
    if (!latest.has(k) || new Date(a.date) >= new Date(latest.get(k).date)) latest.set(k, a);
  });
  return [...latest.values()];
}

// How much one wrong answer says about a real gap. A slip at a lower level is more foundational
// (Core > Advanced Core > Synthesis > Speed Run), and a mistake made in the recheck, after the
// student already had feedback on that idea, weighs more than one in the warm-up or diagnostic.
const MISTAKE_LEVEL_WEIGHT = { 1: 4, 2: 3, 3: 2, 4: 1 };
const mistakeWeight = (level, phase) => (MISTAKE_LEVEL_WEIGHT[level] || 1) * (phase === 'recheck' ? 1.5 : 1);

export const MISTAKE_SORTS = {
  important: { label: 'Top 5 · Most important', hint: 'Foundational levels and repeated-after-feedback mistakes first, then spread across chapters' },
  frequent: { label: 'Top 5 · Most frequent', hint: 'Mistake types with the most wrong answers first' }
};

// Mistake types (misconception tags) behind wrong answers in the given attempts.
// sort: 'frequent' (most wrong answers first) or 'important' (highest importance score first).
export function mistakePatterns(attempts, limit = 6, sort = 'frequent') {
  const tagMap = new Map();
  attempts.forEach((a) => (a.answers || []).forEach((x) => {
    if (x.is_correct || !x.mistake_tag) return;
    const e = tagMap.get(x.mistake_tag) || { tag: x.mistake_tag, count: 0, weight: 0, fix: x.mistake_fix, why: x.mistake_why || x.mistake_description, chapters: new Set() };
    e.count += 1;
    e.weight += mistakeWeight(a.level, x.phase);
    e.chapters.add(a.chapter_name);
    tagMap.set(x.mistake_tag, e);
  }));
  const list = [...tagMap.values()].map((m) => ({
    ...m,
    // A mistake that shows up in several chapters is a habit, not a one-off.
    importance: Math.round((m.weight + 2 * (m.chapters.size - 1)) * 10) / 10,
    chapters: [...m.chapters]
  }));
  const byCount = (a, b) => b.count - a.count || b.importance - a.importance;
  const byImportance = (a, b) => b.importance - a.importance || b.count - a.count;
  return list.sort(sort === 'important' ? byImportance : byCount).slice(0, limit);
}

export function diagnoseStudent(entries, catalog, threshold = DEFAULT_THRESHOLD) {
  const catalogByKey = new Map((catalog?.chapters || []).map((c) => [c.key, c]));
  const chapters = studentChapters(entries, catalogByKey).map((c) => ({ ...c, gaps: topicGaps(c, threshold) }));

  // Latest attempt at each chapter + level: what's still true today.
  const latest = new Map();
  const perLevel = new Map();
  entries.forEach((a) => {
    const k = `${chapterKey(a)}|${a.level}`;
    if (!latest.has(k) || new Date(a.date) >= new Date(latest.get(k).date)) latest.set(k, a);
    if (!perLevel.has(k)) perLevel.set(k, []);
    perLevel.get(k).push(a);
  });
  const current = [...latest.values()];

  const gaps = chapters
    .flatMap((c) => c.gaps.map((g) => ({ ...g, chapterKey: c.key, chapterName: c.chapterName })))
    .sort((a, b) => SEV_RANK[a.severity] - SEV_RANK[b.severity] || a.percent - b.percent);
  const strengths = chapters
    .flatMap((c) => c.topics.filter((t) => t.total >= 2 && t.percent >= 85).map((t) => ({ ...t, chapterName: c.chapterName })))
    .sort((a, b) => b.percent - a.percent || b.total - a.total);

  const incomplete = current.filter(isIncompleteDiagnostic).map((a) => ({
    chapterKey: chapterKey(a), chapterName: a.chapter_name, level: a.level, date: a.date,
    answered: Math.max(0, diagnosticAnswered(a)), total: a.diagnostic_total
  }));
  const incompleteEver = entries.filter(isIncompleteDiagnostic).length;

  // Warm-up vs diagnostic, on attempts where the diagnostic was actually done.
  const done = entries.filter((a) => !isIncompleteDiagnostic(a));
  const warmup = avg(done.filter((a) => a.warmup_total).map((a) => pctOf(a.warmup_correct, a.warmup_total)));
  const diagnostic = avg(done.filter((a) => a.diagnostic_total).map((a) => pctOf(a.diagnostic_correct, a.diagnostic_total)));

  // Recent trend: last 3 attempts against the ones before.
  let trend = null;
  if (entries.length >= 4) {
    const recent = avg(entries.slice(-3).map((a) => a.percent));
    const before = avg(entries.slice(-8, -3).map((a) => a.percent));
    trend = { recent, before, change: recent - before };
  }

  // Levels retried 3+ times without reaching 70%.
  const stuck = [...perLevel.values()]
    .filter((list) => list.length >= 3 && Math.max(...list.map((a) => a.percent)) < 70)
    .map((list) => ({ chapterName: list[0].chapter_name, level: list[0].level, tries: list.length, best: Math.max(...list.map((a) => a.percent)) }));

  const mistakes = mistakePatterns(current, 4);

  // Per-chapter health.
  chapters.forEach((c) => {
    const inc = incomplete.filter((i) => i.chapterKey === c.key);
    c.incomplete = inc;
    c.status = c.percent < 50 || c.gaps.some((g) => g.severity === 'high') || inc.length ? 'critical'
      : c.gaps.length || c.percent < threshold ? 'attention' : 'on-track';
  });
  const statusRank = { critical: 0, attention: 1, 'on-track': 2 };
  chapters.sort((a, b) => statusRank[a.status] - statusRank[b.status] || a.percent - b.percent);

  const high = gaps.filter((g) => g.severity === 'high');
  const declining = trend && trend.change <= -15;
  let status = 'on-track';
  if (high.length >= 2 || incomplete.length || (trend && trend.recent < 50)) status = 'critical';
  else if (gaps.length || stuck.length || declining) status = 'attention';

  // ---- Findings, most important first ----
  const findings = [];
  if (incomplete.length) {
    findings.push({
      tone: 'red', icon: 'bi-hourglass-split',
      title: `${incomplete.length} diagnostic${incomplete.length > 1 ? 's' : ''} left incomplete`,
      detail: `${incomplete.map((i) => `${i.chapterName} (${levelName(i.level)}: ${i.answered}/${i.total} answered)`).join(', ')}. `
        + 'These scores reflect unanswered questions, not necessarily missing knowledge.'
        + (incompleteEver > incomplete.length ? ` This has happened in ${incompleteEver} of ${entries.length} attempts overall.` : '')
    });
  }
  if (high.length) {
    findings.push({
      tone: 'red', icon: 'bi-bullseye',
      title: `${high.length} high-severity topic gap${high.length > 1 ? 's' : ''}`,
      detail: high.slice(0, 4).map((g) => `${g.name} — ${g.correct}/${g.total} (${g.chapterName})`).join('; ') + '.'
    });
  }
  if (declining) {
    findings.push({
      tone: 'red', icon: 'bi-graph-down-arrow',
      title: `Recent scores dropped ${Math.abs(trend.change)} points`,
      detail: `The last 3 attempts average ${trend.recent}%, against ${trend.before}% before. Check for fatigue, rushing or a harder new chapter.`
    });
  } else if (trend && trend.change >= 15) {
    findings.push({
      tone: 'green', icon: 'bi-graph-up-arrow',
      title: `Improving: up ${trend.change} points recently`,
      detail: `The last 3 attempts average ${trend.recent}%, against ${trend.before}% before.`
    });
  }
  if (done.length && warmup - diagnostic >= 20) {
    findings.push({
      tone: 'amber', icon: 'bi-arrow-down-right',
      title: 'Strong on warm-up, weaker on diagnostic',
      detail: `Warm-up averages ${warmup}% but the diagnostic averages ${diagnostic}%. The basics are in place; the difficulty is with applied, multi-step questions.`
    });
  }
  stuck.forEach((s) => findings.push({
    tone: 'amber', icon: 'bi-arrow-repeat',
    title: `Stuck on ${s.chapterName} · ${levelName(s.level)}`,
    detail: `${s.tries} attempts, best score ${s.best}%. Repeating the same level is not working; re-teach before the next try.`
  }));
  const medium = gaps.filter((g) => g.severity !== 'high');
  if (medium.length) {
    findings.push({
      tone: 'amber', icon: 'bi-journal-minus',
      title: `${medium.length} topic${medium.length > 1 ? 's' : ''} below ${threshold}%`,
      detail: medium.slice(0, 4).map((g) => `${g.name} ${g.percent}%`).join(', ') + (medium.length > 4 ? '…' : '') + '.'
    });
  }
  if (strengths.length) {
    findings.push({
      tone: 'green', icon: 'bi-star-fill',
      title: `Secure in ${strengths.length} topic${strengths.length > 1 ? 's' : ''}`,
      detail: strengths.slice(0, 4).map((t) => `${t.name} ${t.percent}%`).join(', ') + (strengths.length > 4 ? '…' : '') + '.'
    });
  }

  // ---- Recommended next steps ----
  const plan = [];
  incomplete.forEach((i) => plan.push({
    action: 'Retake', icon: 'bi-arrow-clockwise', tone: 'red',
    text: `Complete the ${i.chapterName} ${levelName(i.level)} diagnostic in one sitting`,
    why: `Only ${i.answered} of ${i.total} questions were answered, so the real level is unknown.`
  }));
  gaps.slice(0, 4).forEach((g) => {
    const m = mistakes.find((x) => x.chapters.includes(g.chapterName));
    plan.push({
      action: g.action.label, icon: g.action.icon, tone: g.severity === 'high' ? 'red' : g.severity === 'medium' ? 'amber' : 'green',
      text: `${g.name} (${g.chapterName})`,
      why: `${g.correct}/${g.total} correct.${m?.fix ? ` Focus: ${m.fix}` : ''}`
    });
  });
  stuck.forEach((s) => plan.push({
    action: 'Hold level', icon: 'bi-pause-circle', tone: 'amber',
    text: `Don't advance in ${s.chapterName} yet`,
    why: `${levelName(s.level)} tried ${s.tries} times; best ${s.best}%.`
  }));
  if (!plan.length) {
    plan.push({
      action: 'Advance', icon: 'bi-arrow-up-right-circle', tone: 'green',
      text: 'Move on to the next level or chapter',
      why: `No topic is below ${threshold}% in the latest attempts.`
    });
  }

  // ---- One-paragraph verdict ----
  const parts = [];
  if (done.length && warmup >= 70) parts.push(`has the basics in place (warm-up ${warmup}%)`);
  if (gaps.length) parts.push(`has ${gaps.length} topic gap${gaps.length > 1 ? 's' : ''} across ${new Set(gaps.map((g) => g.chapterKey)).size} chapter${new Set(gaps.map((g) => g.chapterKey)).size > 1 ? 's' : ''}`);
  if (incomplete.length) parts.push(`left ${incomplete.length} diagnostic${incomplete.length > 1 ? 's' : ''} unfinished`);
  if (declining) parts.push(`has dropped from ${trend.before}% to ${trend.recent}% recently`);
  const verdict = parts.length
    ? `${parts.join(', ').replace(/, ([^,]*)$/, ' and $1')}.`
    : `is performing well, with no topic below ${threshold}% in the latest attempts.`;

  return {
    status, verdict, findings, plan: plan.slice(0, 6), gaps, strengths, mistakes, chapters, incomplete, stuck,
    stats: { warmup, diagnostic, trend, attempts: entries.length, high: high.length }
  };
}

// Everything the insights page shows, from the students' attempts and the chapter catalog.
// students: [{ email, username, entries }] with maths entries from entriesFor().
export function buildInsights(students, catalog, threshold = DEFAULT_THRESHOLD) {
  const catalogByKey = new Map((catalog?.chapters || []).map((c) => [c.key, c]));

  const people = students.map((s) => {
    const chapters = studentChapters(s.entries, catalogByKey);
    const gaps = chapters.flatMap((c) => topicGaps(c, threshold).map((g) => ({ ...g, chapterKey: c.key, chapterName: c.chapterName })));
    const percent = avg(chapters.map((c) => c.percent));
    return {
      email: s.email,
      username: s.username,
      percent,
      band: bandFor(percent).id,
      chapters,
      chapterByKey: new Map(chapters.map((c) => [c.key, c])),
      gaps
    };
  });

  // Chapter summaries, in grade then chapter order.
  const chapterKeys = [...new Set(people.flatMap((p) => p.chapters.map((c) => c.key)))];
  const chapters = chapterKeys.map((key) => {
    const rows = people.map((p) => ({ person: p, ch: p.chapterByKey.get(key) })).filter((r) => r.ch);
    const sample = rows[0].ch;
    const percent = avg(rows.map((r) => r.ch.percent));
    const bandCounts = Object.fromEntries(BANDS.map((b) => [b.id, 0]));
    rows.forEach((r) => { bandCounts[bandFor(r.ch.percent).id] += 1; });

    const topicMap = new Map();
    rows.forEach(({ person, ch }) => ch.topics.forEach((t) => {
      const e = topicMap.get(t.code) || { code: t.code, name: t.name, scores: [], affected: [] };
      e.scores.push(t.percent);
      if (t.percent < threshold) e.affected.push({ email: person.email, username: person.username, percent: t.percent });
      topicMap.set(t.code, e);
    }));
    const topics = [...topicMap.values()].map((t) => ({
      code: t.code,
      name: t.name,
      percent: avg(t.scores),
      attempted: t.scores.length,
      affected: t.affected.sort((a, b) => a.percent - b.percent),
      severity: t.affected.length ? chapterGapSeverity(t.affected.length, t.scores.length) : null
    })).sort((a, b) => b.affected.length - a.affected.length || a.percent - b.percent);

    const withGaps = rows.filter((r) => r.ch.topics.some((t) => t.percent < threshold)).length;
    const atRiskShare = rows.length ? bandCounts['at-risk'] / rows.length : 0;
    let status = 'on-track';
    if (percent < 50 || atRiskShare >= 0.4) status = 'critical';
    else if (percent < 70 || topics.some((t) => t.severity === 'high')) status = 'attention';

    return {
      key,
      chapterName: sample.chapterName,
      grade: sample.grade,
      gradeLabel: `Grade ${gradeNumber(sample.grade)}`,
      students: rows.length,
      percent,
      completion: avg(rows.map((r) => r.ch.completion)),
      bandCounts,
      withGaps,
      status,
      topics
    };
  }).sort((a, b) => a.grade.localeCompare(b.grade, undefined, { numeric: true }) || a.key.localeCompare(b.key, undefined, { numeric: true }));

  // Performance clusters (by each student's overall average).
  const clusters = BANDS.map((b) => {
    const members = people.filter((p) => p.band === b.id).sort((x, y) => y.percent - x.percent);
    const weak = new Map();
    members.forEach((p) => p.gaps.forEach((g) => {
      const k = `${g.chapterKey}|${g.code}`;
      const e = weak.get(k) || { name: g.name, chapterName: g.chapterName, count: 0 };
      e.count += 1;
      weak.set(k, e);
    }));
    return {
      ...b,
      members,
      percent: avg(members.map((p) => p.percent)),
      weakTopics: [...weak.values()].sort((x, y) => y.count - x.count).slice(0, 3)
    };
  });

  // Grade-level roll-up for the high-level summary.
  const grades = [...new Set(chapters.map((c) => c.grade))].map((grade) => {
    const gChapters = chapters.filter((c) => c.grade === grade);
    const keys = new Set(gChapters.map((c) => c.key));
    const members = people
      .map((p) => ({ p, chs: p.chapters.filter((c) => keys.has(c.key)) }))
      .filter((m) => m.chs.length);
    const bandCounts = Object.fromEntries(BANDS.map((b) => [b.id, 0]));
    members.forEach((m) => { bandCounts[bandFor(avg(m.chs.map((c) => c.percent))).id] += 1; });
    const statusCounts = { 'on-track': 0, attention: 0, critical: 0 };
    gChapters.forEach((c) => { statusCounts[c.status] += 1; });
    return {
      grade,
      gradeLabel: gChapters[0].gradeLabel,
      chapters: gChapters,
      students: members.length,
      percent: avg(members.map((m) => avg(m.chs.map((c) => c.percent)))),
      withGaps: members.filter((m) => m.p.gaps.some((g) => keys.has(g.chapterKey))).length,
      bandCounts,
      statusCounts
    };
  });

  return { people, chapters, clusters, grades, threshold };
}

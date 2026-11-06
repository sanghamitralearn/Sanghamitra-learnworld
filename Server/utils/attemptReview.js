// Turns stored attempts + question banks into reviewable rows (question text, what the student
// answered, the right answer and why they went wrong). Shared by the admin and student routes.
const { forFamily } = require('../model/ExamQuestion');

const COURSE_LABELS = {
    sat: 'SAT', gre: 'GRE', gmat: 'GMAT', act: 'ACT', cat: 'CAT',
    'jee-main': 'JEE Main', 'jee-advanced': 'JEE Advanced', 'gate-da': 'GATE DA'
};

const examPercent = (a) => (typeof a.percent === 'number' ? a.percent : (a.total ? Math.round((a.correct / a.total) * 100) : 0));

// Question HTML (with \( … \) math) -> short plain text.
function plainText(html, max = 220) {
    const text = String(html || '')
        .replace(/<br\s*\/?>/gi, ' ')
        .replace(/<[^>]+>/g, ' ')
        .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
        .replace(/\\\(|\\\)/g, '')
        // Common LaTeX -> readable symbols ("115^\circ" -> "115°").
        .replace(/\^\{?\\circ\}?/g, '°')
        .replace(/\\(?:d|t)?frac\{([^{}]*)\}\{([^{}]*)\}/g, '$1/$2')
        // Recurring decimals ("0.\overline{27}" -> "0.2̅7̅"), sequences, brackets and blanks.
        .replace(/\\overline\{([^{}]*)\}/g, (m, digits) => [...digits].map((c) => `${c}̅`).join(''))
        .replace(/\\ldots|\\dots|\\cdots/g, '…')
        .replace(/\\left|\\right/g, '')
        .replace(/\\square/g, '□').replace(/\\implies/g, '⇒').replace(/\\approx/g, '≈').replace(/\\to(?![a-z])/g, '→')
        .replace(/\{,\}/g, ',')
        .replace(/\\sqrt\{([^{}]*)\}/g, '√($1)')
        .replace(/\\(?:text|mathrm|mathbf)\{([^{}]*)\}/g, '$1')
        .replace(/\\times/g, '×').replace(/\\div/g, '÷').replace(/\\cdot/g, '·').replace(/\\pm/g, '±')
        .replace(/\\leq?(?![a-z])/g, '≤').replace(/\\geq?(?![a-z])/g, '≥').replace(/\\neq?(?![a-z])/g, '≠')
        .replace(/\\angle/g, '∠').replace(/\\triangle/g, '△').replace(/\\pi/g, 'π').replace(/\\degree/g, '°')
        .replace(/\\[,;!: ]/g, ' ')
        .replace(/\\([a-zA-Z]+)/g, '$1')
        .replace(/\s+/g, ' ')
        .trim();
    return text.length > max ? `${text.slice(0, max - 1)}…` : text;
}

// "B" or "A,C" -> the option text(s); typed answers are returned as typed.
function describeAnswer(question, value) {
    if (!value) return '';
    if (question.type === 'student_produced_response') return String(value);
    return String(value).split(',').map((id) => {
        const opt = (question.options || []).find((o) => o.id === id.trim());
        const text = opt ? plainText(opt.text, 90) : '';
        return text ? `${id.trim()}. ${text}` : id.trim();
    }).join(' · ');
}

// Seed data writes misconception.rootCause as "Short Label — full explanation".
// The label is the short mistake-type tag; the explanation after the dash is the plain-language "why".
function misconceptionTag(rootCause) {
    if (!rootCause) return '';
    const idx = rootCause.indexOf('—');
    return idx === -1 ? rootCause : rootCause.slice(0, idx).trim();
}
function misconceptionExplanation(rootCause) {
    if (!rootCause) return '';
    const idx = rootCause.indexOf('—');
    return idx === -1 ? '' : rootCause.slice(idx + 1).trim();
}

// Copies a misconception's tag / why / fix onto a review row.
function applyMisconception(row, misconception) {
    if (!misconception) return;
    row.mistake_tag = misconceptionTag(misconception.rootCause);
    row.mistake_description = misconception.description || '';
    row.mistake_why = misconceptionExplanation(misconception.rootCause);
    row.mistake_fix = misconception.remediation || '';
}

const MATH_PHASE_ORDER = { warmup: 0, diagnostic: 1, recheck: 2 };

// The option the student picked. chosen_index is a position in the student's shuffled option list,
// so it can't index question.options directly; newer attempts also store option_index (the position
// in question.options). For older attempts, recover it from correctness or the misconception tag.
function chosenMathOption(question, answer) {
    if (answer.skipped || answer.chosen_index < 0) return null;
    const options = question.options || [];
    if (answer.option_index >= 0) return options[answer.option_index] || null;
    if (answer.is_correct) return options.find((o) => o.correct) || null;
    if (answer.misconception_id) return options.find((o) => o.misconceptionId === answer.misconception_id) || null;
    return null;
}

// One review row per question of a maths attempt. `bank` is that level's questions.
// { questionMax, withExplanation } let callers ask for longer text and the worked explanation.
function mathReviewRows(attempt, bank, { questionMax, withExplanation = false } = {}) {
    const ordered = [...bank].sort((a, b) => (MATH_PHASE_ORDER[a.phase] - MATH_PHASE_ORDER[b.phase]) || (a.order - b.order));
    const answered = new Map((attempt.answers || []).map((ans) => [`${ans.phase}|${ans.item_id}`, ans]));

    // Every warmup + diagnostic question of the level, so the review shows what was never
    // reached too. Recheck items are picked per student, so only the ones they were given.
    const rows = ordered
        .filter((q) => q.phase !== 'recheck' || answered.has(`recheck|${q.itemId}`))
        .map((q) => {
            const answer = answered.get(`${q.phase}|${q.itemId}`) || {
                item_id: q.itemId, phase: q.phase, cluster: q.cluster, chosen_index: -1,
                is_correct: false, skipped: true, not_attempted: true, points_awarded: 0
            };
            const chosen = chosenMathOption(q, answer);
            answer.question_text = plainText(q.question, questionMax);
            answer.chosen_text = chosen ? plainText(chosen.text, 90) : null;
            answer.correct_text = plainText(q.options?.find((o) => o.correct)?.text, 90) || null;
            if (!answer.is_correct && answer.misconception_id) {
                applyMisconception(answer, q.misconceptions?.find((m) => m.misconceptionId === answer.misconception_id));
            }
            if (withExplanation) {
                answer.cluster_name = q.clusterName;
                answer.explanation = plainText(q.explanation, 600);
            }
            return answer;
        });
    // Keep answers whose question has since been removed from the bank.
    const inBank = new Set(ordered.map((q) => `${q.phase}|${q.itemId}`));
    (attempt.answers || []).forEach((ans) => {
        if (!inBank.has(`${ans.phase}|${ans.item_id}`)) rows.push(ans);
    });
    return rows;
}

// The questions behind a set of exam answers, keyed by itemId.
async function examQuestionsByItem(family, itemIds) {
    if (!itemIds.length) return new Map();
    const questions = await forFamily(family)
        .find({ itemId: { $in: itemIds } })
        .select('itemId questionNumber type question options correctAnswer acceptedAnswers explanation')
        .lean();
    return new Map(questions.map((q) => [q.itemId, q]));
}

// Adds question text and the readable answers to one exam answer. A question that has since been
// removed from the bank leaves the answer as it is.
function annotateExamAnswer(answer, question, { questionMax, withExplanation = false } = {}) {
    if (!question) return;
    answer.question_number = question.questionNumber;
    answer.question_text = plainText(question.question, questionMax);
    answer.response_text = describeAnswer(question, answer.response);
    answer.correct_text = question.type === 'student_produced_response'
        ? (question.acceptedAnswers?.length ? question.acceptedAnswers.join(' or ') : question.correctAnswer)
        : describeAnswer(question, question.correctAnswer);
    if (withExplanation) answer.explanation = plainText(question.explanation, 600);
}

module.exports = {
    COURSE_LABELS,
    examPercent,
    plainText,
    applyMisconception,
    mathReviewRows,
    examQuestionsByItem,
    annotateExamAnswer
};

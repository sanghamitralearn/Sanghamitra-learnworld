function accuracyForAttempt(attempt) {
    const correct = attempt.warmup_correct + attempt.diagnostic_correct + attempt.recheck_correct;
    const total = attempt.warmup_total + attempt.diagnostic_total + attempt.recheck_total;
    return total > 0 ? (correct / total) * 100 : 0;
}

function accuracyForAssessment(assessment) {
    const total = assessment.questions.length;
    if (total === 0) return 0;
    const correct = assessment.questions.filter((q) => q.is_correct).length;
    return (correct / total) * 100;
}

module.exports = { accuracyForAttempt, accuracyForAssessment };

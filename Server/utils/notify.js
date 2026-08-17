const Notification = require('../model/notificationSchema');
const { accuracyForAttempt, accuracyForAssessment } = require('./scoreStats');

async function notifyNewMathAttempt(username, attempt) {
    const accuracy = Math.round(accuracyForAttempt(attempt));
    const grade = String(attempt.grade || '').replace('grade-', 'Grade ');
    await Notification.create({
        title: 'New Maths score submitted',
        message: `${username} scored ${accuracy}% (${attempt.total_score} pts) in ${attempt.chapter_name} — ${grade}, Level ${attempt.level}.`,
        type: 'info',
        createdBy: 'system'
    });
}

async function notifyNewVocabAssessment(username, assessment) {
    const accuracy = Math.round(accuracyForAssessment(assessment));
    await Notification.create({
        title: 'New English score submitted',
        message: `${username} scored ${accuracy}% (${assessment.total_score} pts) in a Vocabulary assessment.`,
        type: 'info',
        createdBy: 'system'
    });
}

module.exports = { notifyNewMathAttempt, notifyNewVocabAssessment };

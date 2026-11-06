// A real Express app over an in-memory MongoDB, so tests never touch the database in .env.
// "x-test-user" stands in for the login session; everything after it is the production code.
const express = require('express');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const User = require('../../model/userSchema');
const { MathScore } = require('../../model/MathScore');
const MathQuestion = require('../../model/MathQuestion');
const { VocabScore } = require('../../model/vocabScoreSchema');
const VocabQuestion = require('../../model/vocabSchema');
const ExamModule = require('../../model/ExamModule');
const { forFamily } = require('../../model/ExamQuestion');
const { scoresFor } = require('../../model/ExamScore');
const meRouter = require('../../router/me');
const adminRouter = require('../../router/admin');

const ids = {
    satAttempt: new mongoose.Types.ObjectId(),
    otherStudentAttempt: new mongoose.Types.ObjectId(),
    mathAttempt: new mongoose.Types.ObjectId(),
    vocabAttempt: new mongoose.Types.ObjectId(),
    vocabQuestion: new mongoose.Types.ObjectId()
};

const STUDENT = 'asha@example.com';
const OTHER_STUDENT = 'ravi@example.com';

const daysAgo = (n) => new Date(Date.now() - n * 864e5);

async function seed() {
    const [asha, ravi] = await User.insertMany([
        { name: 'Asha Rao', email: STUDENT, password: 'x'.repeat(10) },
        { name: 'Ravi', email: OTHER_STUDENT, password: 'x'.repeat(10) }
    ], { rawResult: false, lean: false });

    await forFamily('sat').insertMany([
        { exam: 'sat-1', section: 'math', module: 1, order: 1, questionNumber: 7, itemId: 'sat-1:math:m1:q07', type: 'multiple_choice', topic: 'Algebra', question: '<p>Solve \\(x + \\frac{1}{2} = 1\\)</p>', options: [{ id: 'A', text: '1/2' }, { id: 'B', text: '<b>2</b>' }], correctAnswer: 'A', explanation: '<p>Subtract one half.</p>' },
        { exam: 'sat-1', section: 'math', module: 1, order: 2, questionNumber: 8, itemId: 'sat-1:math:m1:q08', type: 'student_produced_response', topic: 'Geometry', question: 'Angle sum?', correctAnswer: '180', acceptedAnswers: ['180', '180.0'] },
        { exam: 'sat-1', section: 'math', module: 1, order: 3, questionNumber: 9, itemId: 'sat-1:math:m1:q09', type: 'multiple_choice', topic: 'Geometry', question: 'Sides of a square?', options: [{ id: 'A', text: '4' }, { id: 'B', text: '3' }], correctAnswer: 'A' }
    ]);
    await ExamModule.collection.insertOne({ family: 'sat', exam: 'sat-1', section: 'math', sectionName: 'Mathematics Section', module: 1 });
    const satAnswers = [
        { item_id: 'sat-1:math:m1:q07', section: 'math', module: 1, topic: 'Algebra', response: 'B', is_correct: false },
        { item_id: 'sat-1:math:m1:q08', section: 'math', module: 1, topic: 'Geometry', response: '', is_correct: false, skipped: true },
        { item_id: 'sat-1:math:m1:q09', section: 'math', module: 1, topic: 'Geometry', response: 'A', is_correct: true },
        { item_id: 'sat-1:removed:q99', section: 'math', module: 1, topic: 'Algebra', response: 'C', is_correct: false }
    ];
    const satAttempt = (id, date) => ({ _id: id, date, family: 'sat', exam: 'sat-1', exam_label: 'SAT Practice 1', scope: 'full', mode: 'timed', correct: 1, total: 4, unattempted: 1, percent: 25, time_spent: 1800, answers: satAnswers });
    await scoresFor('sat').create({ username: 'Asha Rao', email: STUDENT, attempts: [satAttempt(ids.satAttempt, daysAgo(0))] });
    await scoresFor('sat').create({ username: 'Ravi', email: OTHER_STUDENT, attempts: [satAttempt(ids.otherStudentAttempt, daysAgo(0))] });

    await MathQuestion.create({
        grade: 'grade-6', chapterSlug: 'ch-1-numbers', chapterName: 'Numbers', level: 1, phase: 'diagnostic', itemId: 'd1', order: 1,
        cluster: 'c1', clusterName: 'Place Value', question: 'What is 1 + 1?', explanation: 'Count up.',
        options: [{ text: '2', correct: true, feedback: 'ok' }, { text: '11', correct: false, feedback: 'no', misconceptionId: 'E-1' }],
        misconceptions: [{ misconceptionId: 'E-1', description: 'Joins the digits', rootCause: 'Digit Joining — treats plus as writing digits side by side', remediation: 'Use a number line.' }]
    });
    await MathScore.create({
        username: 'Asha Rao', email: STUDENT,
        attempts: [{
            _id: ids.mathAttempt, date: daysAgo(1), grade: 'grade-6', chapter_slug: 'ch-1-numbers', chapter_name: 'Numbers', level: 1,
            diagnostic_correct: 0, diagnostic_total: 1, total_score: 0,
            answers: [{ item_id: 'd1', phase: 'diagnostic', cluster: 'c1', chosen_index: 1, option_index: 1, is_correct: false, misconception_id: 'E-1' }]
        }]
    });

    await VocabQuestion.collection.insertOne({
        _id: ids.vocabQuestion, question: 'Big means?', options: { a: 'large', b: 'tiny', c: 'old', d: 'new' }, correctOption: 'a', explanation: 'Big and large are synonyms.'
    });
    await VocabScore.create({
        username: 'Asha Rao', email: STUDENT,
        assessments: [{
            _id: ids.vocabAttempt, date: daysAgo(2), total_score: 0,
            questions: [
                { question_id: ids.vocabQuestion, question_text: 'Big means?', user_response: 'b', correct_option: 'a', is_correct: false, points_awarded: 0, difficulty_level: 'easy', CEFR_level: 'A1', topic: 'Synonyms' },
                { question_id: ids.vocabQuestion, question_text: 'Big means?', user_response: 'You did not answer this question.', correct_option: 'a', is_correct: false, points_awarded: 0, difficulty_level: 'easy', CEFR_level: 'A1', topic: 'Synonyms' }
            ]
        }]
    });

    return { asha, ravi };
}

async function startTestApp(port = 0) {
    const mongo = await MongoMemoryServer.create();
    await mongoose.connect(mongo.getUri());
    const users = await seed();

    const app = express();
    app.use((req, res, next) => {
        const user = users[req.get('x-test-user')];
        req.session = user ? { userId: user._id } : {};
        next();
    });
    app.use('/api/me', meRouter);
    app.use('/api/admin', adminRouter);

    const server = await new Promise((resolve) => {
        const s = app.listen(port, () => resolve(s));
    });
    return {
        app,
        baseUrl: `http://127.0.0.1:${server.address().port}/api`,
        async stop() {
            await new Promise((resolve) => server.close(resolve));
            await mongoose.disconnect();
            await mongo.stop();
        }
    };
}

module.exports = { startTestApp, ids, STUDENT, OTHER_STUDENT };

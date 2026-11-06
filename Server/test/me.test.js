const { test, before, after, describe } = require('node:test');
const assert = require('node:assert/strict');
const { startTestApp, ids, STUDENT } = require('./helpers/testApp');

let ctx;
const get = (path, user = 'asha') => fetch(`${ctx.baseUrl}${path}`, { headers: user ? { 'x-test-user': user } : {} });
const getJson = async (path, user) => {
    const res = await get(path, user);
    assert.equal(res.status, 200, `${path} returned ${res.status}`);
    return res.json();
};

before(async () => { ctx = await startTestApp(); });
after(async () => { await ctx.stop(); });

describe('access control', () => {
    test('rejects requests without a session', async () => {
        assert.equal((await get('/me/attempts', null)).status, 401);
        assert.equal((await get(`/me/attempts/sat/${ids.satAttempt}`, null)).status, 401);
    });

    test("a student cannot open another student's attempt", async () => {
        assert.equal((await get(`/me/attempts/sat/${ids.otherStudentAttempt}`, 'asha')).status, 404);
    });

    test('the list ignores an email in the query string', async () => {
        const mine = await getJson('/me/attempts?limit=50', 'ravi');
        const spoofed = await getJson(`/me/attempts?limit=50&email=${encodeURIComponent(STUDENT)}`, 'ravi');
        assert.deepEqual(spoofed.attempts.map((a) => a.id), mine.attempts.map((a) => a.id));
        assert.equal(mine.total, 1);
    });

    test('responses are not cacheable', async () => {
        assert.equal((await get('/me/attempts')).headers.get('cache-control'), 'private, no-store');
    });
});

describe('input validation', () => {
    for (const query of ['limit=0', 'limit=51', 'limit=abc', 'limit=-1', 'offset=-1', 'offset=1.5', 'limit=1&limit=2', 'limit[$gt]=1']) {
        test(`rejects ${query}`, async () => {
            assert.equal((await get(`/me/attempts?${query}`)).status, 400);
        });
    }

    for (const query of ['course=nope', 'course[$ne]=sat', 'course=sat&course=gre', 'course=__proto__']) {
        test(`rejects ${query}`, async () => {
            assert.equal((await get(`/me/attempts?${query}`)).status, 400);
        });
    }

    test('rejects an unknown course or malformed id in a review', async () => {
        assert.equal((await get(`/me/attempts/nope/${ids.satAttempt}`)).status, 400);
        assert.equal((await get('/me/attempts/sat/not-an-id')).status, 400);
        assert.equal((await get('/me/attempts/sat/123456789012')).status, 400);
    });

    test('an attempt id from a different course is not found', async () => {
        assert.equal((await get(`/me/attempts/gre/${ids.satAttempt}`)).status, 404);
    });
});

describe('attempt list', () => {
    test('merges every course, newest first, without answers', async () => {
        const { attempts, total } = await getJson('/me/attempts');
        assert.equal(total, 3);
        assert.deepEqual(attempts.map((a) => a.course), ['sat', 'maths', 'vocabulary']);
        attempts.forEach((a) => assert.equal(a.answers, undefined));
    });

    test('reports marks', async () => {
        const { attempts: [sat, math, vocab] } = await getJson('/me/attempts');
        assert.deepEqual(
            [sat.correct, sat.wrong, sat.skipped, sat.total, sat.percent, sat.title, sat.detail],
            [1, 2, 1, 4, 25, 'SAT Practice 1', 'Full test']
        );
        assert.equal(sat.retakeUrl, '/competitive-exams/sat-1/test');
        assert.deepEqual([math.correct, math.total, math.detail], [0, 1, 'Grade 6 · Core']);
        assert.equal(math.retakeUrl, '/math/grade-6/ch-1-numbers/1');
        assert.deepEqual([vocab.correct, vocab.wrong, vocab.skipped, vocab.total], [0, 1, 1, 2]);
        assert.match(vocab.analyticsUrl, /^\/vocab-analytics\?quizId=/);
    });

    test('filters by course and paginates', async () => {
        const math = await getJson('/me/attempts?course=maths');
        assert.deepEqual([math.total, math.attempts.length, math.attempts[0].course], [1, 1, 'maths']);

        const page = await getJson('/me/attempts?limit=1&offset=1');
        assert.deepEqual([page.total, page.attempts.length, page.attempts[0].course], [3, 1, 'maths']);
        assert.equal((await getJson('/me/attempts?offset=99')).attempts.length, 0);
    });

    test('a student with no attempts gets an empty list', async () => {
        const res = await getJson('/me/attempts?course=gre');
        assert.deepEqual(res, { attempts: [], total: 0 });
    });
});

describe('attempt review', () => {
    test('exam: shows each mistake with its question and answers', async () => {
        const { attempt, mistakes, topics } = await getJson(`/me/attempts/sat/${ids.satAttempt}`);
        assert.equal(attempt.id, String(ids.satAttempt));
        assert.equal(mistakes.length, 3);

        const [wrong, skipped, removed] = mistakes;
        assert.deepEqual(
            [wrong.status, wrong.questionNumber, wrong.topic, wrong.yourAnswer, wrong.correctAnswer],
            ['wrong', 7, 'Algebra', 'B. 2', 'A. 1/2']
        );
        assert.equal(wrong.section, 'Mathematics Section');
        assert.equal(wrong.question, 'Solve x + 1/2 = 1');
        assert.equal(wrong.explanation, 'Subtract one half.');
        assert.deepEqual([skipped.status, skipped.yourAnswer, skipped.correctAnswer], ['skipped', null, '180 or 180.0']);
        assert.deepEqual([removed.status, removed.question], ['wrong', null]);

        assert.deepEqual(topics.map((t) => [t.name, t.correct, t.total]), [['Algebra', 0, 2], ['Geometry', 1, 2]]);
    });

    test('maths: explains the misconception behind a wrong answer', async () => {
        const { mistakes, topics } = await getJson(`/me/attempts/maths/${ids.mathAttempt}`);
        const [m] = mistakes;
        assert.deepEqual(
            [m.section, m.topic, m.yourAnswer, m.correctAnswer, m.tag, m.why, m.fix, m.explanation],
            ['Diagnostic', 'Place Value', '11', '2', 'Digit Joining', 'treats plus as writing digits side by side', 'Use a number line.', 'Count up.']
        );
        assert.deepEqual(topics.map((t) => t.name), ['Place Value']);
    });

    test('vocabulary: resolves option letters and recognises skipped answers', async () => {
        const { mistakes } = await getJson(`/me/attempts/vocabulary/${ids.vocabAttempt}`);
        const [wrong, skipped] = mistakes;
        assert.deepEqual(
            [wrong.status, wrong.yourAnswer, wrong.correctAnswer, wrong.explanation],
            ['wrong', 'B. tiny', 'A. large', 'Big and large are synonyms.']
        );
        assert.deepEqual([skipped.status, skipped.yourAnswer], ['skipped', null]);
    });
});

describe('admin review after sharing the helpers', () => {
    test('exam rows keep their fields and stay free of explanations', async () => {
        const { attempts } = await getJson(`/admin/scores/exams/${encodeURIComponent(STUDENT)}`);
        const answer = attempts[0].answers[0];
        assert.deepEqual(
            [answer.question_number, answer.question_text, answer.response_text, answer.correct_text],
            [7, 'Solve x + 1/2 = 1', 'B. 2', 'A. 1/2']
        );
        assert.equal(answer.explanation, undefined);
    });

    test('maths rows keep their misconception fields', async () => {
        const { attempts } = await getJson(`/admin/scores/math/${encodeURIComponent(STUDENT)}`);
        const answer = attempts[0].answers[0];
        assert.deepEqual(
            [answer.question_text, answer.chosen_text, answer.correct_text, answer.mistake_tag, answer.mistake_why, answer.mistake_fix],
            ['What is 1 + 1?', '11', '2', 'Digit Joining', 'treats plus as writing digits side by side', 'Use a number line.']
        );
        assert.equal(answer.explanation, undefined);
    });
});

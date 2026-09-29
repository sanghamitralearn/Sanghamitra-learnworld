// seed/mathSeedCh6StatisticalInvestigationsL3.js
//
// Populates math_chapters and math_questions with Grade 8, Chapter 6
// (Statistical Investigations), Level 3 — converted from the
// standalone diagnostic JSON ch6-statistical-investigations-level-3.json.
//
// Run with: node seed/mathSeedCh6StatisticalInvestigationsL3.js

const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-8";
const GRADE_LABEL = "Grade 8";
const CHAPTER_SLUG = "ch-6-statistical-investigations";
const CHAPTER_NAME = "Statistical Investigations";
const LEVEL = 3;

const CLUSTER_NAMES = {
  "dataCollection": "Data collection methods",
  "sampling": "Sampling (random, stratified)",
  "bias": "Bias in sampling and surveys",
  "fairQuestions": "Designing fair questions",
  "critiqueClaims": "Critiquing statistical claims",
  "mixed": "Mixed investigation scenarios (synthesis)"
};

const warmupItems = [
  {
    "itemId": "w1",
    "order": 1,
    "cluster": "sampling",
    "clusterName": "Sampling (random, stratified)",
    "question": "A researcher wants a stratified sample of 60 from a population split 5:3:2 across three groups. How many should come from the largest group?",
    "options": [
      {
        "text": "\\(30\\)",
        "correct": true,
        "feedback": "Correct. Total parts = 10; largest group = \\(5/10 = 1/2\\). \\(1/2 \\times 60 = 30\\)."
      },
      {
        "text": "\\(18\\)",
        "correct": false,
        "feedback": "You gave the middle group’s share (\\(3/10 \\times 60 = 18\\))."
      },
      {
        "text": "\\(12\\)",
        "correct": false,
        "feedback": "You gave the smallest group’s share (\\(2/10 \\times 60 = 12\\))."
      },
      {
        "text": "\\(20\\)",
        "correct": false,
        "feedback": "You split the sample equally across three groups (\\(60 \\div 3 = 20\\))."
      }
    ],
    "retryHint": "Add the parts, then find each group’s fraction of the total.",
    "backward": "Stratified sampling preserves proportions.",
    "forward": "Used whenever the population has known subgroups."
  },
  {
    "itemId": "w2",
    "order": 2,
    "cluster": "dataCollection",
    "clusterName": "Data collection methods",
    "question": "A student wants to know average weekly screen time of students in her school. She has (i) her own survey of a random sample, (ii) published national data. Which is more appropriate, and why?",
    "options": [
      {
        "text": "(i) — primary data matched to her specific population.",
        "correct": true,
        "feedback": "Correct. Data collected from her own target population directly answers her question."
      },
      {
        "text": "(ii) — national data covers a larger sample.",
        "correct": false,
        "feedback": "National data may not describe her specific school."
      },
      {
        "text": "(i) — because her own data is always more reliable.",
        "correct": false,
        "feedback": "Neither is always more reliable — accuracy depends on method, not ownership."
      },
      {
        "text": "Either — they give the same answer.",
        "correct": false,
        "feedback": "The two sources differ in relevance."
      }
    ],
    "retryHint": "Ask “does the data describe the population I care about?”",
    "backward": "The source must match the question.",
    "forward": "Used whenever you choose between data sources."
  },
  {
    "itemId": "w3",
    "order": 3,
    "cluster": "bias",
    "clusterName": "Bias in sampling and surveys",
    "question": "A researcher wants to know the average weekly exercise of adults in a town. Compare two methods: (1) survey gym members only, (2) survey a random sample from the town’s register. Which has less bias?",
    "options": [
      {
        "text": "Method 2 — a random sample of residents represents the population; gym members are a biased subgroup.",
        "correct": true,
        "feedback": "Correct. The random sample covers the whole population; gym members over-represent regular exercisers."
      },
      {
        "text": "Method 1 — gym members know more about exercise.",
        "correct": false,
        "feedback": "Knowledge of exercise doesn’t reduce sampling bias."
      },
      {
        "text": "Both are equally biased.",
        "correct": false,
        "feedback": "The two methods differ substantially in bias."
      },
      {
        "text": "Method 1 — sampling gym members is faster.",
        "correct": false,
        "feedback": "Speed isn’t the criterion."
      }
    ],
    "retryHint": "Which method lets every adult in the town be chosen?",
    "backward": "Sampling frame determines who is included.",
    "forward": "Used whenever you compare sampling methods."
  },
  {
    "itemId": "w4",
    "order": 4,
    "cluster": "fairQuestions",
    "clusterName": "Designing fair questions",
    "question": "A school wants to survey students about homework load. Which question is best?",
    "options": [
      {
        "text": "“How many hours of homework do you do on a typical school night?”",
        "correct": true,
        "feedback": "Correct. Neutral, factual, no leading."
      },
      {
        "text": "“Don’t you think the homework load is too heavy?”",
        "correct": false,
        "feedback": "Leading toward “yes.”"
      },
      {
        "text": "“Why does the school give so much homework?”",
        "correct": false,
        "feedback": "Presumes the load is too heavy."
      },
      {
        "text": "“How much do you hate the homework?”",
        "correct": false,
        "feedback": "Presumes hatred."
      }
    ],
    "retryHint": "A fair question doesn’t hint at the answer.",
    "backward": "Fair questions.",
    "forward": "Neutral wording produces usable data."
  },
  {
    "itemId": "w5",
    "order": 5,
    "cluster": "critiqueClaims",
    "clusterName": "Critiquing statistical claims",
    "question": "A company claims: “Our product improved test scores by 40% in 9 out of 10 students.” What two questions are needed to assess the claim?",
    "options": [
      {
        "text": "How “improved” was measured, and how the 10 students were selected.",
        "correct": true,
        "feedback": "Correct. Both the measurement and the sample determine whether the claim is credible."
      },
      {
        "text": "The product’s price, and whether the study was peer-reviewed.",
        "correct": false,
        "feedback": "Price is irrelevant, and while peer review matters, it doesn’t answer the specific questions about how “improved” was measured or how the students were chosen."
      },
      {
        "text": "The students’ prior scores, and the exact improvement per student.",
        "correct": false,
        "feedback": "Prior scores and per-student figures are useful, but the most fundamental questions are who was in the sample and what “improved” actually means — as option A notes."
      },
      {
        "text": "The study’s duration, and the product’s country of origin.",
        "correct": false,
        "feedback": "Duration might matter at the margin, but country of origin is irrelevant — neither is as fundamental as the questions in option A."
      }
    ],
    "retryHint": "Ask “who was measured?” and “what does ‘improved’ mean?”",
    "backward": "Claims need context — what was measured and who was sampled.",
    "forward": "Standard checks for any percentage claim."
  },
  {
    "itemId": "w6",
    "order": 6,
    "cluster": "bias",
    "clusterName": "Bias in sampling and surveys",
    "question": "A researcher wants a sample of 100 from a town of 5,000 people. He decides to stand outside the town’s only supermarket on a Saturday morning and ask the first 100 people who walk in. What’s the main flaw?",
    "options": [
      {
        "text": "It’s a convenience sample, not a random sample — shoppers on Saturday morning aren’t representative of the whole town.",
        "correct": true,
        "feedback": "Correct. Convenience sampling excludes anyone not shopping at that time and place."
      },
      {
        "text": "The sample size is too small.",
        "correct": false,
        "feedback": "100 is a reasonable size — the issue is who is included."
      },
      {
        "text": "The researcher should have used a different supermarket.",
        "correct": false,
        "feedback": "Changing supermarkets doesn’t fix the fundamental method."
      },
      {
        "text": "There’s no flaw — 100 is a good sample.",
        "correct": false,
        "feedback": "The method is convenience, not random."
      }
    ],
    "retryHint": "Ask “who is completely left out of this sample?”",
    "backward": "Sampling method determines bias.",
    "forward": "Used whenever you evaluate a sampling plan."
  },
  {
    "itemId": "w7",
    "order": 7,
    "cluster": "mixed",
    "clusterName": "Mixed investigation scenarios (synthesis)",
    "question": "A student’s project claims “students who play sport get better grades.” His data comes from 30 members of the school football team. What are the two main issues?",
    "options": [
      {
        "text": "The sample is unrepresentative (only football players) and the data shows association, not proven causation.",
        "correct": true,
        "feedback": "Correct. Football players are a specific subgroup, and an association between sport and grades doesn’t prove that sport causes higher grades."
      },
      {
        "text": "The sample was random and the question was fair.",
        "correct": false,
        "feedback": "The sample was not random; no question is described."
      },
      {
        "text": "The survey was too short.",
        "correct": false,
        "feedback": "Length isn’t mentioned."
      },
      {
        "text": "The result is proven.",
        "correct": false,
        "feedback": "The result is not proven."
      }
    ],
    "backward": "Two distinct issues: sample representativeness + causation.",
    "forward": "Standard synthesis checks."
  },
  {
    "itemId": "w8",
    "order": 8,
    "cluster": "dataCollection",
    "clusterName": "Data collection methods",
    "question": "A student uses statistics from a newspaper article for her project. She can’t find the original study. What type of data is this, and what is the main limitation?",
    "options": [
      {
        "text": "Secondary data — she can’t verify how it was collected.",
        "correct": true,
        "feedback": "Correct. Data reported by someone else is secondary, and without the original study the methodology can’t be checked."
      },
      {
        "text": "Primary data — she’s using it herself.",
        "correct": false,
        "feedback": "She didn’t collect it herself."
      },
      {
        "text": "Both primary and secondary.",
        "correct": false,
        "feedback": "Data can’t be both primary and secondary at once."
      },
      {
        "text": "Neither — it’s not real data.",
        "correct": false,
        "feedback": "It’s a valid type of data — just one with limitations."
      }
    ],
    "backward": "Primary = collected by you.",
    "forward": "Used whenever you evaluate a data source."
  }
];

const diagnosticItems = [
  {
    "itemId": "d1",
    "order": 1,
    "cluster": "dataCollection",
    "clusterName": "Data collection methods",
    "question": "A student’s research question is: “How many hours per week do students at MY school study?” She has two options: (A) use published national data (20 hours/week average) or (B) collect her own survey from a random sample of her school. Why is Option B likely to be more appropriate?",
    "options": [
      {
        "text": "National data averages across all schools and may not reflect her school’s specific context.",
        "correct": true,
        "feedback": "Correct. The question is about her school specifically; national averages may not match."
      },
      {
        "text": "Option B is always more accurate.",
        "correct": false,
        "feedback": "No method is always more accurate."
      },
      {
        "text": "Option B will be quicker to collect.",
        "correct": false,
        "feedback": "Speed isn’t the deciding factor — relevance to the question is."
      },
      {
        "text": "Neither gives useful information.",
        "correct": false,
        "feedback": "Both sources give some information — the choice depends on the question."
      }
    ],
    "backward": "Data must match the research question.",
    "forward": "Used whenever you choose a data source."
  },
  {
    "itemId": "d2",
    "order": 2,
    "cluster": "fairQuestions",
    "clusterName": "Designing fair questions",
    "question": "A student writes: “Should the school ban homework to reduce stress and improve wellbeing?” What two problems does this question have?",
    "options": [
      {
        "text": "It’s leading (assumes homework reduces stress) and double‑barrelled (asks about stress AND wellbeing).",
        "correct": true,
        "feedback": "Correct. Both the leading phrasing and the two-in-one structure bias the answer."
      },
      {
        "text": "It’s too wordy, and it uses jargon.",
        "correct": false,
        "feedback": "Wordiness and jargon aren’t the flaws here — the question isn’t unusually complicated; the issue is its structure."
      },
      {
        "text": "It’s an open-ended question, which is hard to score.",
        "correct": false,
        "feedback": "Being open-ended isn’t the issue — the problem is that the question is leading and double-barrelled."
      },
      {
        "text": "It’s anonymous, which makes it hard to verify.",
        "correct": false,
        "feedback": "Anonymity reduces response bias — it isn’t the flaw."
      }
    ],
    "backward": "Question wording is a common source of bias.",
    "forward": "Neutral, single-issue questions produce usable data."
  },
  {
    "itemId": "d3",
    "order": 3,
    "cluster": "sampling",
    "clusterName": "Sampling (random, stratified)",
    "question": "A town of 6,000 adults is split into three age groups (18–30: 1,500; 31–55: 3,000; 56+: 1,500). A stratified sample of 120 should include how many from the 31–55 group?",
    "options": [
      {
        "text": "\\(60\\)",
        "correct": true,
        "feedback": "Correct. \\(3{,}000/6{,}000 = 1/2\\). \\(1/2 \\times 120 = 60\\). (bw: Stratified sampling preserves proportions.)"
      },
      {
        "text": "\\(30\\)",
        "correct": false,
        "feedback": "You used one of the smaller groups’ share (\\(1{,}500/6{,}000 \\times 120 = 30\\))."
      },
      {
        "text": "\\(40\\)",
        "correct": false,
        "feedback": "You split the sample equally across three groups (\\(120 \\div 3 = 40\\))."
      },
      {
        "text": "\\(90\\)",
        "correct": false,
        "feedback": "You used 4,500 (the combined size of the two smaller groups) instead of 3,000: \\(4{,}500/6{,}000 \\times 120 = 90\\)."
      }
    ]
  },
  {
    "itemId": "d4",
    "order": 4,
    "cluster": "critiqueClaims",
    "clusterName": "Critiquing statistical claims",
    "question": "A poll of 500 people finds that 48% prefer Candidate A and 46% prefer Candidate B, with a margin of error of ±3%. What is the most appropriate conclusion?",
    "options": [
      {
        "text": "The result is too close to call — the ranges overlap.",
        "correct": true,
        "feedback": "Correct. Candidate A’s range is 45–51%; Candidate B’s is 43–49%. These overlap, so the result is not decisive."
      },
      {
        "text": "Candidate A is definitely winning.",
        "correct": false,
        "feedback": "A’s support could be as low as 45%, below B’s upper bound of 49%."
      },
      {
        "text": "Candidate B is definitely losing.",
        "correct": false,
        "feedback": "B’s support could be as high as 49%, above A’s lower bound of 45%."
      },
      {
        "text": "The poll is meaningless.",
        "correct": false,
        "feedback": "The poll is informative — it shows a close race."
      }
    ],
    "backward": "Margin of error gives a plausible range.",
    "forward": "Used whenever you interpret poll results."
  },
  {
    "itemId": "d5",
    "order": 5,
    "cluster": "bias",
    "clusterName": "Bias in sampling and surveys",
    "question": "A researcher compares two sampling methods for a sensitive topic (income): (1) face-to-face interviews with a random sample, (2) anonymous online surveys with a random sample. Which is likely to have LESS bias, and why?",
    "options": [
      {
        "text": "Method 2 — anonymity reduces social-desirability bias for sensitive topics.",
        "correct": true,
        "feedback": "Correct. For sensitive topics, anonymity reduces the tendency to give socially desirable (but false) answers."
      },
      {
        "text": "Method 1 — face-to-face builds rapport.",
        "correct": false,
        "feedback": "Rapport can increase social-desirability pressure, not reduce it."
      },
      {
        "text": "Both are equally biased.",
        "correct": false,
        "feedback": "The two methods differ substantially in bias risk."
      },
      {
        "text": "Method 1 — the researcher can clarify questions.",
        "correct": false,
        "feedback": "Clarifying questions helps comprehension, not sensitive responses."
      }
    ],
    "backward": "Response bias.",
    "forward": "Sensitive surveys often need anonymous methods."
  },
  {
    "itemId": "d6",
    "order": 6,
    "cluster": "mixed",
    "clusterName": "Mixed investigation scenarios (synthesis)",
    "question": "A study finds that students who use library computers after school have better grades than students who don’t. What are the two main issues?",
    "options": [
      {
        "text": "The sample may be self-selected (students who choose library computers may already differ), and the data shows association, not proven causation.",
        "correct": true,
        "feedback": "Correct. Choosing to use library computers is a self-selecting behaviour, and an association doesn’t prove that computer use causes higher grades."
      },
      {
        "text": "The study was random and the results are proven.",
        "correct": false,
        "feedback": "The study was not described as random; the result is not proven."
      },
      {
        "text": "The library is too small.",
        "correct": false,
        "feedback": "Library size isn’t described as the issue."
      },
      {
        "text": "The students are too young.",
        "correct": false,
        "feedback": "Age isn’t described as the issue."
      }
    ],
    "backward": "Self-selection + causation.",
    "forward": "Standard synthesis checks."
  },
  {
    "itemId": "d7",
    "order": 7,
    "cluster": "dataCollection",
    "clusterName": "Data collection methods",
    "question": "A student wants to know how many pets her classmates own. She asks her teacher, who says “probably about 2 per student.” What type of data is this, and what is the main limitation?",
    "options": [
      {
        "text": "Indirect estimate — the teacher isn’t in the target group and is guessing rather than reporting collected data.",
        "correct": true,
        "feedback": "Correct. The teacher’s estimate isn’t collected from the target group and may not be reliable."
      },
      {
        "text": "Primary data — the teacher has direct knowledge.",
        "correct": false,
        "feedback": "The teacher isn’t a classmate and didn’t collect the data from them."
      },
      {
        "text": "Both primary and secondary.",
        "correct": false,
        "feedback": "This is neither primary (collected from target) nor secondary (collected by another researcher)."
      },
      {
        "text": "The best available data.",
        "correct": false,
        "feedback": "Better data is available by asking classmates directly."
      }
    ],
    "backward": "Primary = collected directly from the target population.",
    "forward": "Used whenever you evaluate a data source."
  },
  {
    "itemId": "d8",
    "order": 8,
    "cluster": "mixed",
    "clusterName": "Mixed investigation scenarios (synthesis)",
    "question": "A student designs a survey about screen time. Her plan: “I will ask my friends: ‘Don’t you think we spend too much time on screens?’” What are the two biggest flaws in her plan?",
    "options": [
      {
        "text": "The question is leading, and her friends are a biased sample.",
        "correct": true,
        "feedback": "Correct. Both the leading phrasing and the biased sample undermine the data."
      },
      {
        "text": "The question is too short and too long.",
        "correct": false,
        "feedback": "Length isn’t the flaw."
      },
      {
        "text": "The survey is not anonymous and not on paper.",
        "correct": false,
        "feedback": "Anonymity and medium aren’t the flaws."
      },
      {
        "text": "She should have asked teachers instead.",
        "correct": false,
        "feedback": "Teachers aren’t the target group."
      }
    ],
    "backward": "Question wording + sample bias.",
    "forward": "Two standard checks for any survey."
  },
  {
    "itemId": "d9",
    "order": 9,
    "cluster": "sampling",
    "clusterName": "Sampling (random, stratified)",
    "question": "A school has 500 students: 200 in Year 7, 150 in Year 8, 100 in Year 9, 50 in Year 10. A stratified sample of 100 should include how many from Year 10?",
    "options": [
      {
        "text": "\\(10\\)",
        "correct": true,
        "feedback": "Correct. \\(50/500 = 1/10\\). \\(1/10 \\times 100 = 10\\). (bw: Stratified sampling.)"
      },
      {
        "text": "\\(40\\)",
        "correct": false,
        "feedback": "You gave Year 7’s share (\\(200/500 \\times 100 = 40\\))."
      },
      {
        "text": "\\(20\\)",
        "correct": false,
        "feedback": "You gave Year 9’s share (\\(100/500 \\times 100 = 20\\))."
      },
      {
        "text": "\\(30\\)",
        "correct": false,
        "feedback": "You gave Year 8’s share (\\(150/500 \\times 100 = 30\\))."
      }
    ]
  },
  {
    "itemId": "d10",
    "order": 10,
    "cluster": "mixed",
    "clusterName": "Mixed investigation scenarios (synthesis)",
    "question": "A claim says: “Customers who use our app save an average of £300 per year, based on a survey of 50 app users.” Which two problems make this claim weak?",
    "options": [
      {
        "text": "The sample is small and self-selected (only app users were asked), and “average” may be pulled up by a few extreme savers.",
        "correct": true,
        "feedback": "Correct. Self-selection means the sample may not represent all users, and the mean is sensitive to outliers."
      },
      {
        "text": "The survey was conducted online rather than in person.",
        "correct": false,
        "feedback": "Online vs in-person is a mode question — the main issues here are the sample and the mean."
      },
      {
        "text": "The 50 users weren’t asked to verify their savings with receipts.",
        "correct": false,
        "feedback": "Verification matters, but the deeper issue is who was in the sample, not how their savings were checked."
      },
      {
        "text": "The company didn’t publish the raw data.",
        "correct": false,
        "feedback": "Transparency is a separate concern — the flaw is in the sample and the average itself."
      }
    ],
    "backward": "Sample bias + mean vs outliers.",
    "forward": "Standard checks for any average claim."
  },
  {
    "itemId": "d11",
    "order": 11,
    "cluster": "bias",
    "clusterName": "Bias in sampling and surveys",
    "question": "A researcher surveys people leaving a shopping centre about how much they spent that day. What is the main source of bias?",
    "options": [
      {
        "text": "Shopping-centre visitors on the day of the survey may differ from the general population, and those who spent more may be more willing to talk.",
        "correct": true,
        "feedback": "Correct. Both the sampling frame and response willingness can bias the results."
      },
      {
        "text": "The survey was conducted in person rather than by post.",
        "correct": false,
        "feedback": "Mode is a separate issue from who is present and who agrees to talk."
      },
      {
        "text": "The survey didn’t offer a financial incentive.",
        "correct": false,
        "feedback": "Incentives affect response rates but not the underlying sampling bias."
      },
      {
        "text": "The survey was on paper rather than digital.",
        "correct": false,
        "feedback": "Medium doesn’t affect the source of bias."
      }
    ],
    "backward": "Location + response bias.",
    "forward": "Used whenever you evaluate a survey’s setting."
  },
  {
    "itemId": "d12",
    "order": 12,
    "cluster": "mixed",
    "clusterName": "Mixed investigation scenarios (synthesis)",
    "question": "A student’s report states: “Average family income at our school is £80,000,” based on 20 responses to a voluntary survey. What are the two main issues?",
    "options": [
      {
        "text": "The sample is small and self-selected (voluntary responses over-represent certain families), and the mean can be distorted by a few very high incomes.",
        "correct": true,
        "feedback": "Correct. Voluntary surveys have self-selection bias, small samples are unreliable, and the mean is sensitive to outliers."
      },
      {
        "text": "The sample was random and the question was fair.",
        "correct": false,
        "feedback": "The sample was not random; the question isn’t described."
      },
      {
        "text": "The result is proven.",
        "correct": false,
        "feedback": "The result is not proven."
      },
      {
        "text": "The survey was too long.",
        "correct": false,
        "feedback": "Length isn’t mentioned."
      }
    ],
    "backward": "Sample size + self-selection + mean distortion.",
    "forward": "Standard synthesis checks."
  },
  {
    "itemId": "d13",
    "order": 13,
    "cluster": "dataCollection",
    "clusterName": "Data collection methods",
    "question": "A student wants to research average weekly screen time and has two data sources: (i) her own survey of a random sample, (ii) published national survey results. Which statement is most accurate?",
    "options": [
      {
        "text": "(i) gives data specific to her population but risks her own design errors; (ii) has been vetted but may not match her specific population.",
        "correct": true,
        "feedback": "Correct. Both sources have trade-offs — specificity vs. validation."
      },
      {
        "text": "(i) is always better than (ii).",
        "correct": false,
        "feedback": "Own surveys can have design flaws."
      },
      {
        "text": "The national survey is more reliable because it has a bigger sample.",
        "correct": false,
        "feedback": "Bigger samples don’t automatically make data reliable — the sample must also match the population you care about."
      },
      {
        "text": "Neither is useful.",
        "correct": false,
        "feedback": "Both are useful depending on the question."
      }
    ],
    "backward": "Primary vs secondary, each with strengths and limitations.",
    "forward": "Used whenever you weigh two data sources."
  },
  {
    "itemId": "d14",
    "order": 14,
    "cluster": "fairQuestions",
    "clusterName": "Designing fair questions",
    "question": "A student writes a survey question: “How often do you use social media, and do you think it’s harmful?” What’s wrong with the question?",
    "options": [
      {
        "text": "It’s double-barrelled — asks about two distinct things.",
        "correct": true,
        "feedback": "Correct. The question asks about frequency AND opinion — two separate things. (bw: Double-barrelled questions produce unusable data.)"
      },
      {
        "text": "It’s leading.",
        "correct": false,
        "feedback": "It isn’t leading — neither part suggests an answer."
      },
      {
        "text": "It’s too long.",
        "correct": false,
        "feedback": "Length isn’t the flaw."
      },
      {
        "text": "Nothing — it’s fine.",
        "correct": false,
        "feedback": "The question has a flaw."
      }
    ]
  },
  {
    "itemId": "d15",
    "order": 15,
    "cluster": "sampling",
    "clusterName": "Sampling (random, stratified)",
    "question": "A researcher wants a systematic sample from a register of 600 students, targeting a sample of 30. What interval should she use, and where should she start?",
    "options": [
      {
        "text": "Every 20th student, starting from a randomly chosen point between 1 and 20.",
        "correct": true,
        "feedback": "Correct. Interval = 600 ÷ 30 = 20. A random start avoids bias if the list has any structure."
      },
      {
        "text": "Every 20th student, always starting from student 1.",
        "correct": false,
        "feedback": "The interval is right, but always starting at position 1 risks bias if the list has any pattern."
      },
      {
        "text": "Every 30th student, starting from a randomly chosen point.",
        "correct": false,
        "feedback": "You used the sample size (30) as the interval."
      },
      {
        "text": "Every 60th student, starting from a randomly chosen point.",
        "correct": false,
        "feedback": "You used interval 60 (600 ÷ 10) instead of 600 ÷ 30."
      }
    ],
    "backward": "Systematic sampling + random start.",
    "forward": "Used whenever you design a systematic sample."
  },
  {
    "itemId": "d16",
    "order": 16,
    "cluster": "critiqueClaims",
    "clusterName": "Critiquing statistical claims",
    "question": "A study finds that people who own dogs live longer than people who don’t. Which conclusion is best supported?",
    "options": [
      {
        "text": "There is an association, but the causal direction is unclear — dog ownership might improve health, or healthier people might be more likely to own dogs.",
        "correct": true,
        "feedback": "Correct. Observational data can show a link but can’t establish causal direction."
      },
      {
        "text": "Dogs cause longer life — proven.",
        "correct": false,
        "feedback": "The causal direction isn’t proven."
      },
      {
        "text": "Longer life causes dog ownership — proven.",
        "correct": false,
        "feedback": "The causal direction isn’t proven."
      },
      {
        "text": "The data is invalid.",
        "correct": false,
        "feedback": "The data is valid — the causal claim isn’t supported."
      }
    ],
    "backward": "Correlation ≠ causation, and direction matters.",
    "forward": "Used whenever you evaluate a causal claim."
  },
  {
    "itemId": "d17",
    "order": 17,
    "cluster": "bias",
    "clusterName": "Bias in sampling and surveys",
    "question": "A survey of healthy eating habits is carried out on a Monday morning at a GP surgery waiting room. What’s the main source of bias?",
    "options": [
      {
        "text": "People at a GP surgery may have health conditions that affect their eating habits, and Monday-morning timing may skew the sample.",
        "correct": true,
        "feedback": "Correct. Both the setting and the timing select a subgroup that may differ from the general population."
      },
      {
        "text": "The GP surgery is too small.",
        "correct": false,
        "feedback": "Size isn’t the issue."
      },
      {
        "text": "The survey is too short.",
        "correct": false,
        "feedback": "Length isn’t the issue."
      },
      {
        "text": "The survey asks about food.",
        "correct": false,
        "feedback": "Asking about food is necessary."
      }
    ],
    "backward": "Location + timing bias.",
    "forward": "Used whenever you evaluate a survey’s setting."
  },
  {
    "itemId": "d18",
    "order": 18,
    "cluster": "mixed",
    "clusterName": "Mixed investigation scenarios (synthesis)",
    "question": "A researcher wants to know student opinions on a new policy. He asks: “Don’t you think the new policy is great?” at a school assembly where attendance is required. What are the two main issues?",
    "options": [
      {
        "text": "The question is leading (“Don’t you think... great?”) and the sample may be biased (only students attending assembly are asked).",
        "correct": true,
        "feedback": "Correct. The leading phrase pushes respondents toward “yes,” and assembly attendance isn’t a random sample of the school."
      },
      {
        "text": "The question is fair and the sample is random.",
        "correct": false,
        "feedback": "The question is leading, and the sample isn’t random."
      },
      {
        "text": "The assembly happened on a Friday, which is a bad day.",
        "correct": false,
        "feedback": "Timing doesn’t fix the leading question or the biased sample."
      },
      {
        "text": "The sample size is too small.",
        "correct": false,
        "feedback": "Sample size isn’t the issue — the question and the sample composition are."
      }
    ],
    "backward": "Question-wording bias + sample bias.",
    "forward": "Standard synthesis checks."
  },
  {
    "itemId": "d19",
    "order": 19,
    "cluster": "dataCollection",
    "clusterName": "Data collection methods",
    "question": "A researcher wants to study unauthorised absence (truancy) in her school. The school’s attendance records distinguish authorised from unauthorised absence. She has three data sources: (i) her own survey of a random sample of students, (ii) attendance records kept by the school, (iii) her own observations in the corridors. Which is most appropriate, and why?",
    "options": [
      {
        "text": "(ii) — attendance records are direct, school-collected data on unauthorised absence itself.",
        "correct": true,
        "feedback": "Correct. Attendance records directly measure the phenomenon, whereas surveys rely on self-reporting and observations are partial."
      },
      {
        "text": "(i) — students will be honest about truancy.",
        "correct": false,
        "feedback": "Self-reported truancy is unreliable (students may not admit it)."
      },
      {
        "text": "(iii) — observations are more objective.",
        "correct": false,
        "feedback": "Observations only cover the corridors she watches."
      },
      {
        "text": "All three are equally useful.",
        "correct": false,
        "feedback": "The sources differ substantially in suitability."
      }
    ],
    "backward": "Method must match the phenomenon.",
    "forward": "Used whenever you choose a data source for a specific research question."
  },
  {
    "itemId": "d20",
    "order": 20,
    "cluster": "fairQuestions",
    "clusterName": "Designing fair questions",
    "question": "A student writes the survey question: “How often do you use your phone, and does it help you study?” What is the main problem?",
    "options": [
      {
        "text": "It is double-barrelled — it asks about two distinct things (phone use frequency and effect on study).",
        "correct": true,
        "feedback": "Correct. The question combines a factual count with an opinion about effects."
      },
      {
        "text": "It is too long, and it uses complex language.",
        "correct": false,
        "feedback": "Length and language aren’t the flaws."
      },
      {
        "text": "It is an open-ended question with no fixed response options.",
        "correct": false,
        "feedback": "Being open-ended isn’t the issue — the problem is that it asks two things at once."
      },
      {
        "text": "It is a closed question that limits responses too much.",
        "correct": false,
        "feedback": "The question is not closed — the issue is that it asks two things at once."
      }
    ],
    "backward": "Double-barrelled questions produce unusable data.",
    "forward": "Split into two questions."
  },
  {
    "itemId": "d21",
    "order": 21,
    "cluster": "bias",
    "clusterName": "Bias in sampling and surveys",
    "question": "A researcher samples 200 adults from a city. 40% of the sample is over 60, but only 20% of the city’s population is over 60. Which statement is correct?",
    "options": [
      {
        "text": "The sample is not representative — it over-represents older adults.",
        "correct": true,
        "feedback": "Correct. The sample proportion (40%) differs substantially from the population proportion (20%)."
      },
      {
        "text": "The sample is fine — 40% is a reasonable share.",
        "correct": false,
        "feedback": "40% vs 20% is a large discrepancy."
      },
      {
        "text": "The sample is biased only if the adults were chosen non-randomly.",
        "correct": false,
        "feedback": "The bias is in the composition, not only in the selection method."
      },
      {
        "text": "The sample size is too small.",
        "correct": false,
        "feedback": "Size isn’t the issue — composition is."
      }
    ],
    "backward": "Representativeness compares sample to population.",
    "forward": "Used whenever you evaluate a sample’s composition."
  },
  {
    "itemId": "d22",
    "order": 22,
    "cluster": "critiqueClaims",
    "clusterName": "Critiquing statistical claims",
    "question": "A claim says: “Our course improved students’ grades by 15%.” Which additional information would most help you evaluate this claim?",
    "options": [
      {
        "text": "A comparison with similar students who didn’t take the course.",
        "correct": true,
        "feedback": "Correct. Without a control group, the improvement can’t be attributed to the course."
      },
      {
        "text": "The percentage of students who completed the course.",
        "correct": false,
        "feedback": "Completion rate matters, but it doesn’t tell you whether the course caused the improvement. Only a control group can do that."
      },
      {
        "text": "Whether the same test was used before and after the course.",
        "correct": false,
        "feedback": "Same-test matters for measurement, but the control-group comparison is more fundamental for causal attribution."
      },
      {
        "text": "The exact number of students in the class.",
        "correct": false,
        "feedback": "Class size affects statistical precision but doesn’t address whether the improvement is caused by the course."
      }
    ],
    "backward": "Claims need comparison.",
    "forward": "Standard check for any “improved by X%” claim."
  },
  {
    "itemId": "d23",
    "order": 23,
    "cluster": "bias",
    "clusterName": "Bias in sampling and surveys",
    "question": "A researcher studying public opinion on a new policy surveys people who call into a radio talk show to discuss the policy. What type of bias is this, and why?",
    "options": [
      {
        "text": "Self-selection bias — only people who feel strongly (and know about the show) call in.",
        "correct": true,
        "feedback": "Correct. Voluntary response samples over-represent people with strong opinions."
      },
      {
        "text": "Question-wording bias — the questions are poorly written.",
        "correct": false,
        "feedback": "No question wording is described."
      },
      {
        "text": "Non-response bias — many people don’t call in.",
        "correct": false,
        "feedback": "Non-response bias applies when people don’t reply to a survey — different issue."
      },
      {
        "text": "No bias — the show reaches many people.",
        "correct": false,
        "feedback": "Reach doesn’t equal representation."
      }
    ],
    "backward": "Self-selection bias.",
    "forward": "Any opt-in method risks this."
  },
  {
    "itemId": "d24",
    "order": 24,
    "cluster": "critiqueClaims",
    "clusterName": "Critiquing statistical claims",
    "question": "A researcher takes a random sample of 100 students and asks them to estimate their weekly study time. The average is 12 hours, though a few students report very high values (40+ hours). What are the two main issues with using this average as an estimate of study time?",
    "options": [
      {
        "text": "Students may not accurately recall their study time, and the mean can be pulled up by a few extreme studiers.",
        "correct": true,
        "feedback": "Correct. Recall is imperfect (measurement reliability), and the mean is sensitive to outliers."
      },
      {
        "text": "The sample was not random.",
        "correct": false,
        "feedback": "The sample was described as random."
      },
      {
        "text": "The result is proven.",
        "correct": false,
        "feedback": "The result is an estimate, not a proof."
      },
      {
        "text": "The students are too young.",
        "correct": false,
        "feedback": "Age isn’t described as the issue."
      }
    ],
    "backward": "Measurement reliability + outlier sensitivity.",
    "forward": "Standard synthesis checks for any self-reported average."
  }
];

const recheckItems = [
  {
    "itemId": "r1",
    "order": 1,
    "cluster": "dataCollection",
    "clusterName": "Data collection methods",
    "question": "A student wants to know how many hours her classmates sleep per night. Which method is best?",
    "options": [
      {
        "text": "Ask each classmate to report their own sleep hours.",
        "correct": true,
        "feedback": "Correct. Direct questioning of the target group gives the most relevant data. (bw: Method matches target population.)"
      },
      {
        "text": "Ask her teacher for an estimate.",
        "correct": false,
        "feedback": "Teacher estimates aren’t collected from classmates."
      },
      {
        "text": "Use national averages.",
        "correct": false,
        "feedback": "National data may not describe her classmates."
      },
      {
        "text": "Ask her own family.",
        "correct": false,
        "feedback": "Her family isn’t her classmates."
      }
    ]
  },
  {
    "itemId": "r2",
    "order": 2,
    "cluster": "sampling",
    "clusterName": "Sampling (random, stratified)",
    "question": "A school has 500 students split 2:3 between two groups. A stratified sample of 100 should include how many from the larger group?",
    "options": [
      {
        "text": "\\(60\\)",
        "correct": true,
        "feedback": "Correct. Larger group = \\(3/5\\). \\(3/5 \\times 100 = 60\\). (bw: Stratified sampling.)"
      },
      {
        "text": "\\(40\\)",
        "correct": false,
        "feedback": "You gave the smaller group’s share (\\(2/5 \\times 100 = 40\\))."
      },
      {
        "text": "\\(50\\)",
        "correct": false,
        "feedback": "You split the sample equally (\\(100 \\div 2 = 50\\))."
      },
      {
        "text": "\\(30\\)",
        "correct": false,
        "feedback": "You computed \\(3/10 \\times 100\\)."
      }
    ]
  },
  {
    "itemId": "r3",
    "order": 3,
    "cluster": "bias",
    "clusterName": "Bias in sampling and surveys",
    "question": "A researcher surveys people at an airport about their travel habits. What’s the main source of bias?",
    "options": [
      {
        "text": "Airport passengers are more likely to travel frequently than the general population.",
        "correct": true,
        "feedback": "Correct. The location selects a frequent-traveller subgroup. (bw: Location bias.)"
      },
      {
        "text": "The airport is too noisy.",
        "correct": false,
        "feedback": "Noise isn’t the source of bias."
      },
      {
        "text": "The survey is too short.",
        "correct": false,
        "feedback": "Length isn’t the source of bias."
      },
      {
        "text": "The survey asks about travel.",
        "correct": false,
        "feedback": "Asking about travel is necessary."
      }
    ]
  },
  {
    "itemId": "r4",
    "order": 4,
    "cluster": "fairQuestions",
    "clusterName": "Designing fair questions",
    "question": "Which of these is a fair survey question?",
    "options": [
      {
        "text": "“How many times did you exercise last week?”",
        "correct": true,
        "feedback": "Correct. Neutral and factual."
      },
      {
        "text": "“Don’t you think you should exercise more?”",
        "correct": false,
        "feedback": "Leading."
      },
      {
        "text": "“Why do you avoid exercise?”",
        "correct": false,
        "feedback": "Presumes avoidance."
      },
      {
        "text": "“You exercise daily, right?”",
        "correct": false,
        "feedback": "Presumes daily exercise."
      }
    ]
  },
  {
    "itemId": "r5",
    "order": 5,
    "cluster": "critiqueClaims",
    "clusterName": "Critiquing statistical claims",
    "question": "A claim says: “Our new teaching method doubled test scores.” What’s the most important missing information?",
    "options": [
      {
        "text": "The baseline scores before the method was introduced.",
        "correct": true,
        "feedback": "Correct. Without a baseline, “doubled” can’t be verified. (bw: Claims need context.)"
      },
      {
        "text": "The name of the method.",
        "correct": false,
        "feedback": "Method name isn’t essential."
      },
      {
        "text": "The teacher’s qualifications.",
        "correct": false,
        "feedback": "Qualifications aren’t essential."
      },
      {
        "text": "The size of the classroom.",
        "correct": false,
        "feedback": "Classroom size isn’t essential."
      }
    ]
  },
  {
    "itemId": "r6",
    "order": 6,
    "cluster": "sampling",
    "clusterName": "Sampling (random, stratified)",
    "question": "A population of 900 is systematically sampled with interval 30. What is the sample size?",
    "options": [
      {
        "text": "\\(30\\)",
        "correct": true,
        "feedback": "Correct. \\(900 \\div 30 = 30\\). (bw: Systematic sampling.)"
      },
      {
        "text": "\\(900\\)",
        "correct": false,
        "feedback": "You gave the population size."
      },
      {
        "text": "\\(60\\)",
        "correct": false,
        "feedback": "You used interval 15 instead of 30."
      },
      {
        "text": "\\(45\\)",
        "correct": false,
        "feedback": "You used interval 20 instead of 30."
      }
    ]
  },
  {
    "itemId": "r7",
    "order": 7,
    "cluster": "dataCollection",
    "clusterName": "Data collection methods",
    "question": "A student wants to know about local pollution levels. She can use (i) national environmental data, or (ii) her own sensor readings from her neighbourhood. Which is more appropriate, and why?",
    "options": [
      {
        "text": "(ii) — her neighbourhood data is primary and specific to her question.",
        "correct": true,
        "feedback": "Correct. Local measurements match her local question. (bw: Method matches question.)"
      },
      {
        "text": "(i) — national data is more reliable.",
        "correct": false,
        "feedback": "National data may not describe her neighbourhood."
      },
      {
        "text": "Neither is useful.",
        "correct": false,
        "feedback": "Both are useful, but one is more appropriate here."
      },
      {
        "text": "Both are equally useful.",
        "correct": false,
        "feedback": "Suitability differs."
      }
    ]
  },
  {
    "itemId": "r8",
    "order": 8,
    "cluster": "fairQuestions",
    "clusterName": "Designing fair questions",
    "question": "Which of these is double‑barrelled?",
    "options": [
      {
        "text": "“Do you like the new canteen menu and find it good value?”",
        "correct": true,
        "feedback": "Correct. Asks about liking AND value — two separate things."
      },
      {
        "text": "“How many hours do you study per week?”",
        "correct": false,
        "feedback": "Single-issue question."
      },
      {
        "text": "“What is your favourite food?”",
        "correct": false,
        "feedback": "Single-issue question."
      },
      {
        "text": "“How often do you read?”",
        "correct": false,
        "feedback": "Single-issue question."
      }
    ]
  },
  {
    "itemId": "r9",
    "order": 9,
    "cluster": "bias",
    "clusterName": "Bias in sampling and surveys",
    "question": "A researcher sends a survey to 300 people; only 50 reply. What type of bias is most likely?",
    "options": [
      {
        "text": "Non-response bias — the 250 who didn’t reply may differ from the 50 who did.",
        "correct": true,
        "feedback": "Correct. Low response rates produce non-response bias. (bw: Response rates matter.)"
      },
      {
        "text": "Question-wording bias.",
        "correct": false,
        "feedback": "Wording isn’t described as the issue."
      },
      {
        "text": "Sampling-frame bias.",
        "correct": false,
        "feedback": "Frame isn’t described as the issue."
      },
      {
        "text": "No bias — 50 is enough.",
        "correct": false,
        "feedback": "A 17% response rate is very low."
      }
    ]
  },
  {
    "itemId": "r10",
    "order": 10,
    "cluster": "critiqueClaims",
    "clusterName": "Critiquing statistical claims",
    "question": "A company claims that “customers saved an average of £200 last year.” Which question is most important to ask?",
    "options": [
      {
        "text": "Whether the sample was representative of all customers and whether the mean was distorted by a few high users.",
        "correct": true,
        "feedback": "Correct. Both representativeness and outlier sensitivity matter for an “average” claim. (bw: Claims need context.)"
      },
      {
        "text": "What colour the marketing materials are.",
        "correct": false,
        "feedback": "Marketing colour isn’t relevant to the claim’s validity."
      },
      {
        "text": "How long the company has existed.",
        "correct": false,
        "feedback": "Company age isn’t relevant to the claim’s validity."
      },
      {
        "text": "What the CEO’s name is.",
        "correct": false,
        "feedback": "The CEO’s name isn’t relevant to the claim’s validity."
      }
    ]
  },
  {
    "itemId": "r11",
    "order": 11,
    "cluster": "mixed",
    "clusterName": "Mixed investigation scenarios (synthesis)",
    "question": "A school claims “our anti-bullying programme has reduced bullying by 50%,” based on a survey of students before and after the programme. What are the two main issues?",
    "options": [
      {
        "text": "The survey relies on self-reporting (students may under-report bullying after the programme), and the comparison is before/after only (no control group to rule out other factors).",
        "correct": true,
        "feedback": "Correct. Both measurement bias and lack of control group weaken the causal claim."
      },
      {
        "text": "The sample was random.",
        "correct": false,
        "feedback": "The sample isn’t described as random."
      },
      {
        "text": "The result is proven.",
        "correct": false,
        "feedback": "The result is not proven."
      },
      {
        "text": "The programme is too expensive.",
        "correct": false,
        "feedback": "Cost isn’t the issue."
      }
    ],
    "backward": "Measurement + comparison group.",
    "forward": "Standard synthesis checks."
  },
  {
    "itemId": "r12",
    "order": 12,
    "cluster": "critiqueClaims",
    "clusterName": "Critiquing statistical claims",
    "question": "A study finds that towns with more bookshops also have higher average reading scores. What are the two main issues?",
    "options": [
      {
        "text": "The relationship is likely affected by a third factor (e.g. town wealth or education levels), and the data shows association, not causation.",
        "correct": true,
        "feedback": "Correct. Wealth/education could drive both bookshops and reading scores, and an association alone doesn’t prove causation."
      },
      {
        "text": "Bookshops cause better reading — proven.",
        "correct": false,
        "feedback": "Causation isn’t proven."
      },
      {
        "text": "Reading causes more bookshops — proven.",
        "correct": false,
        "feedback": "Causation isn’t proven."
      },
      {
        "text": "The data is invalid.",
        "correct": false,
        "feedback": "The data is valid; the causal claim isn’t supported."
      }
    ],
    "backward": "Confounding + causation.",
    "forward": "Standard synthesis checks."
  }
];

function buildDocs(phase, items) {
  return items.map((item) => ({
    grade: GRADE,
    chapterSlug: CHAPTER_SLUG,
    chapterName: CHAPTER_NAME,
    level: LEVEL,
    phase,
    ...item
  }));
}

const allQuestions = [
  ...buildDocs('warmup', warmupItems),
  ...buildDocs('diagnostic', diagnosticItems),
  ...buildDocs('recheck', recheckItems)
];

const chapterDocs = [
  {
    grade: GRADE,
    gradeLabel: GRADE_LABEL,
    chapterSlug: CHAPTER_SLUG,
    chapterName: CHAPTER_NAME,
    level: LEVEL,
    title: "Statistical Investigations — Problem-Solving & Synthesis",
    subtitle: "Grade 8 · Level 3 · Problem-Solving & Synthesis",
    description: "Multi-step reasoning comparing data sources and sampling methods, designing systematic samples with a random start, and synthesising sample bias, question wording, and causal-claim critique in unfamiliar scenarios — warm-up, diagnostic, and spaced recheck for synthesis-level fluency.",
    clusterNames: CLUSTER_NAMES,
    gateReviewHTML: "<p>You’ve finished the warm‑up. The next 24 questions are the Problem‑Solving & Synthesis diagnostic for statistical investigations. Each question asks you to construct your own path — compare data sources, weigh sampling methods, spot subtle biases, and evaluate competing explanations. Some items combine two skills at once. Take your time and use the feedback to sharpen your reasoning.</p>",
    timedSeconds: 0
  }
];

async function run() {
  await mongoose.connect(process.env.DATABASE);
  console.log('Connected to MongoDB');

  await Promise.all([
    MathChapter.deleteMany({ grade: GRADE, chapterSlug: CHAPTER_SLUG, level: LEVEL }),
    MathQuestion.deleteMany({ grade: GRADE, chapterSlug: CHAPTER_SLUG, level: LEVEL })
  ]);
  console.log('Cleared existing seed data for', GRADE, CHAPTER_SLUG, 'level', LEVEL);

  await MathChapter.insertMany(chapterDocs);
  await MathQuestion.insertMany(allQuestions);

  console.log(`Inserted ${chapterDocs.length} chapter/level catalog entries.`);
  console.log(`Inserted ${allQuestions.length} questions.`);

  await mongoose.disconnect();
  console.log('Done.');
}

run().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});

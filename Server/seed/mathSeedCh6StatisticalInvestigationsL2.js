// seed/mathSeedCh6StatisticalInvestigationsL2.js
//
// Populates math_chapters and math_questions with Grade 8, Chapter 6
// (Statistical Investigations), Level 2 — converted from the
// standalone diagnostic JSON ch6-statistical-investigations-level-2.json.
//
// Run with: node seed/mathSeedCh6StatisticalInvestigationsL2.js

const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-8";
const GRADE_LABEL = "Grade 8";
const CHAPTER_SLUG = "ch-6-statistical-investigations";
const CHAPTER_NAME = "Statistical Investigations";
const LEVEL = 2;

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
    "question": "A school has 400 students: 150 in Year 7, 120 in Year 8, 130 in Year 9. A stratified sample of 40 students should include how many from Year 9?",
    "options": [
      {
        "text": "\\(13\\)",
        "correct": true,
        "feedback": "Correct. Year 9 is \\(130/400 = 0.325\\). \\(0.325 \\times 40 = 13\\)."
      },
      {
        "text": "\\(15\\)",
        "correct": false,
        "feedback": "You used the Year 7 share (\\(150/400 \\times 40 = 15\\))."
      },
      {
        "text": "\\(12\\)",
        "correct": false,
        "feedback": "You used the Year 8 share (\\(120/400 \\times 40 = 12\\))."
      },
      {
        "text": "\\(10\\)",
        "correct": false,
        "feedback": "You assumed all year groups are roughly equal (\\(40 \\div 4 = 10\\))."
      }
    ],
    "retryHint": "Find the fraction of the school in that year group, then apply it to the sample size.",
    "backward": "Stratified sampling preserves subgroup proportions.",
    "forward": "Used whenever subgroups differ in size."
  },
  {
    "itemId": "w2",
    "order": 2,
    "cluster": "dataCollection",
    "clusterName": "Data collection methods",
    "question": "A student writes a report on climate change. She uses (i) temperature data she recorded daily for a month and (ii) historical temperature records from NASA. Which statement is correct?",
    "options": [
      {
        "text": "(i) is primary; (ii) is secondary.",
        "correct": true,
        "feedback": "Correct. She collected (i) herself; (ii) was collected by others."
      },
      {
        "text": "Both are primary.",
        "correct": false,
        "feedback": "(ii) is not her own data — it’s from NASA."
      },
      {
        "text": "Both are secondary.",
        "correct": false,
        "feedback": "(i) is her own data — that’s primary."
      },
      {
        "text": "(i) is secondary; (ii) is primary.",
        "correct": false,
        "feedback": "You reversed the two categories."
      }
    ],
    "retryHint": "For each source, ask “did she collect it herself?”",
    "backward": "Primary = collected by you.",
    "forward": "Used whenever you plan or evaluate an investigation."
  },
  {
    "itemId": "w3",
    "order": 3,
    "cluster": "bias",
    "clusterName": "Bias in sampling and surveys",
    "question": "A survey about reading habits is carried out in a public library. Why would the results not be representative of the general population?",
    "options": [
      {
        "text": "Because people who don’t use libraries (a large group) are completely excluded from the sample.",
        "correct": true,
        "feedback": "Correct. The sampling frame excludes non-library users entirely."
      },
      {
        "text": "Because the library is too quiet.",
        "correct": false,
        "feedback": "Noise isn’t a source of sampling bias."
      },
      {
        "text": "Because the survey is on paper.",
        "correct": false,
        "feedback": "The medium doesn’t bias the sample."
      },
      {
        "text": "Because the librarian asks the questions.",
        "correct": false,
        "feedback": "Who asks isn’t the issue — who is asked is."
      }
    ],
    "retryHint": "Ask “who is completely left out?”",
    "backward": "Bias arises when the sampling frame doesn’t cover the whole population.",
    "forward": "Used whenever you evaluate a survey’s location."
  },
  {
    "itemId": "w4",
    "order": 4,
    "cluster": "fairQuestions",
    "clusterName": "Designing fair questions",
    "question": "A student writes: “Don’t you agree that the school day should start later, so students can get more sleep?” Which two problems make this a poor question?",
    "options": [
      {
        "text": "It’s leading (“Don’t you agree…?”) and it gives a persuasive reason (“so students can get more sleep”).",
        "correct": true,
        "feedback": "Correct. Both the phrasing and the added reason push the respondent toward “yes.”"
      },
      {
        "text": "It’s too long, and it’s too polite.",
        "correct": false,
        "feedback": "Length and tone aren’t the issues."
      },
      {
        "text": "It mentions the school day, and it mentions students.",
        "correct": false,
        "feedback": "Those mentions are necessary to the question."
      },
      {
        "text": "It’s anonymous, and it’s on paper.",
        "correct": false,
        "feedback": "Anonymity and medium aren’t problems."
      }
    ],
    "retryHint": "Look for wording that hints at the expected answer.",
    "backward": "Leading questions plus persuasive framing produce biased data.",
    "forward": "Neutral wording must avoid both."
  },
  {
    "itemId": "w5",
    "order": 5,
    "cluster": "critiqueClaims",
    "clusterName": "Critiquing statistical claims",
    "question": "A news headline says: “Smoking among teenagers has halved.” What two pieces of information are missing to assess this claim?",
    "options": [
      {
        "text": "The baseline year and how “teenagers” was defined.",
        "correct": true,
        "feedback": "Correct. Without a baseline and a clear definition, the claim can’t be verified."
      },
      {
        "text": "The newspaper’s name and the journalist’s name.",
        "correct": false,
        "feedback": "Those aren’t needed to assess the statistical claim."
      },
      {
        "text": "The weather on the day of the survey and the colour of the newspaper.",
        "correct": false,
        "feedback": "Weather and colour are irrelevant."
      },
      {
        "text": "The price of cigarettes and the brand.",
        "correct": false,
        "feedback": "Price and brand don’t determine whether the claim is valid."
      }
    ],
    "retryHint": "Ask “compared to what?” and “measured how?”",
    "backward": "Claims need context — compared to what, and measured how?",
    "forward": "Standard checks for any “X has changed” claim."
  },
  {
    "itemId": "w6",
    "order": 6,
    "cluster": "mixed",
    "clusterName": "Mixed investigation scenarios (synthesis)",
    "question": "A market research firm surveys 100 shoppers in a shopping centre about their favourite brand of trainers. What are the two main issues?",
    "options": [
      {
        "text": "The sample is restricted to shoppers at that centre (may not represent the wider population), and the sampling method within the centre is not specified (may be convenience).",
        "correct": true,
        "feedback": "Correct. Location restricts who is sampled, and without a stated method the sample may be convenience."
      },
      {
        "text": "The sample was random and the question was fair.",
        "correct": false,
        "feedback": "The sample was not stated to be random; the question isn’t described."
      },
      {
        "text": "The survey is too long.",
        "correct": false,
        "feedback": "Length isn’t mentioned as a problem."
      },
      {
        "text": "The result is proven.",
        "correct": false,
        "feedback": "The result is not proven."
      }
    ],
    "backward": "Two distinct issues: sampling frame and sampling method.",
    "forward": "Standard checks for any survey claim."
  },
  {
    "itemId": "w7",
    "order": 7,
    "cluster": "sampling",
    "clusterName": "Sampling (random, stratified)",
    "question": "A researcher wants a systematic sample of 25 from a population of 500. What sampling interval should she use?",
    "options": [
      {
        "text": "\\(20\\)",
        "correct": true,
        "feedback": "Correct. Interval = population ÷ sample size = \\(500 \\div 25 = 20\\)."
      },
      {
        "text": "\\(25\\)",
        "correct": false,
        "feedback": "You used the sample size as the interval."
      },
      {
        "text": "\\(10\\)",
        "correct": false,
        "feedback": "You halved the correct interval (10 instead of 20)."
      },
      {
        "text": "\\(500\\)",
        "correct": false,
        "feedback": "You gave the population size."
      }
    ],
    "retryHint": "Interval = population size ÷ sample size.",
    "backward": "Systematic sampling takes every kth item.",
    "forward": "Used for large, unordered populations."
  },
  {
    "itemId": "w8",
    "order": 8,
    "cluster": "fairQuestions",
    "clusterName": "Designing fair questions",
    "question": "Which of these is a double‑barrelled question?",
    "options": [
      {
        "text": "“Do you agree that the school should ban phones and extend break time?”",
        "correct": true,
        "feedback": "Correct. This asks about two separate issues at once, so a single answer can’t reflect both."
      },
      {
        "text": "“How many hours do you study per week?”",
        "correct": false,
        "feedback": "Single issue, neutral."
      },
      {
        "text": "“What is your favourite subject?”",
        "correct": false,
        "feedback": "Single issue, neutral."
      },
      {
        "text": "“How often do you exercise?”",
        "correct": false,
        "feedback": "Single issue, neutral."
      }
    ],
    "retryHint": "Look for “and” joining two distinct topics.",
    "backward": "Double‑barrelled questions produce unusable data.",
    "forward": "Split into two questions."
  }
];

const diagnosticItems = [
  {
    "itemId": "d1",
    "order": 1,
    "cluster": "dataCollection",
    "clusterName": "Data collection methods",
    "question": "A student wants to study how much time her classmates spend on social media. She can either (i) design her own survey for her classmates, or (ii) use published national data from a research institute. Which is the better choice and why?",
    "options": [
      {
        "text": "(i), because the data will be primary and specific to her classmates.",
        "correct": true,
        "feedback": "Correct. Primary data collected from the target group matches the research question."
      },
      {
        "text": "(ii), because published data is always more accurate.",
        "correct": false,
        "feedback": "Published national data may not describe her classmates."
      },
      {
        "text": "(i), because her own data is always more accurate than published data.",
        "correct": false,
        "feedback": "Neither is always more accurate — accuracy depends on the method."
      },
      {
        "text": "(ii), because she doesn’t have to collect anything.",
        "correct": false,
        "feedback": "Convenience isn’t the deciding factor."
      }
    ],
    "backward": "The method must match the question.",
    "forward": "Used whenever you plan an investigation."
  },
  {
    "itemId": "d2",
    "order": 2,
    "cluster": "fairQuestions",
    "clusterName": "Designing fair questions",
    "question": "A student writes: “Don’t you agree that the new canteen menu is better and healthier?” What two problems does this question have?",
    "options": [
      {
        "text": "It’s leading (“Don’t you agree”) and double‑barrelled (asks about “better” AND “healthier”).",
        "correct": true,
        "feedback": "Correct. Both the leading phrase and the two-in-one structure bias and muddy the response."
      },
      {
        "text": "It’s too long and too short.",
        "correct": false,
        "feedback": "Length isn’t the problem."
      },
      {
        "text": "It’s anonymous and printed.",
        "correct": false,
        "feedback": "Anonymity and medium aren’t problems."
      },
      {
        "text": "It mentions the canteen and the menu.",
        "correct": false,
        "feedback": "Those mentions are necessary."
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
    "question": "A population of 300 has 180 women and 120 men. In a stratified sample of 40, how many men should be included?",
    "options": [
      {
        "text": "\\(16\\)",
        "correct": true,
        "feedback": "Correct. Men are \\(120/300 = 0.4\\). \\(0.4 \\times 40 = 16\\). (bw: Stratified sampling preserves proportions.)"
      },
      {
        "text": "\\(24\\)",
        "correct": false,
        "feedback": "You used the women’s share (\\(180/300 \\times 40 = 24\\))."
      },
      {
        "text": "\\(20\\)",
        "correct": false,
        "feedback": "You split the sample equally (\\(40 \\div 2 = 20\\))."
      },
      {
        "text": "\\(12\\)",
        "correct": false,
        "feedback": "You used 400 as the population size (\\(120/400 \\times 40 = 12\\))."
      }
    ]
  },
  {
    "itemId": "d4",
    "order": 4,
    "cluster": "critiqueClaims",
    "clusterName": "Critiquing statistical claims",
    "question": "A company claims that “customers saved an average of \\$500 last year using our product.” What two pieces of information are needed to check the claim?",
    "options": [
      {
        "text": "How “customers” was defined and whether the sample was representative.",
        "correct": true,
        "feedback": "Correct. Without a clear population and a representative sample, the average can’t be trusted."
      },
      {
        "text": "The CEO’s name and the company’s address.",
        "correct": false,
        "feedback": "Those details don’t affect the claim’s validity."
      },
      {
        "text": "The product’s colour and packaging.",
        "correct": false,
        "feedback": "Colour and packaging are irrelevant."
      },
      {
        "text": "The weather on the day of the survey.",
        "correct": false,
        "feedback": "Weather isn’t relevant."
      }
    ],
    "backward": "Claims depend on how the data was gathered.",
    "forward": "Standard checks for any average claim."
  },
  {
    "itemId": "d5",
    "order": 5,
    "cluster": "bias",
    "clusterName": "Bias in sampling and surveys",
    "question": "A survey about caffeine consumption is carried out at a coffee shop during the morning rush. What is the main source of bias?",
    "options": [
      {
        "text": "Coffee-shop customers in the morning are more likely to consume caffeine than the general population.",
        "correct": true,
        "feedback": "Correct. The location and time select a subgroup that is not representative."
      },
      {
        "text": "The coffee shop is too small.",
        "correct": false,
        "feedback": "Size isn’t the source of bias."
      },
      {
        "text": "The survey is anonymous.",
        "correct": false,
        "feedback": "Anonymity reduces bias — it doesn’t create it."
      },
      {
        "text": "The survey asks about caffeine.",
        "correct": false,
        "feedback": "Asking about caffeine is necessary to the topic."
      }
    ],
    "backward": "Location and time can bias a sample.",
    "forward": "Always ask who is likely to be present."
  },
  {
    "itemId": "d6",
    "order": 6,
    "cluster": "mixed",
    "clusterName": "Mixed investigation scenarios (synthesis)",
    "question": "A researcher systematically samples every 10th name from his school’s register and finds that 60% of students own smartphones. He publishes a report claiming “60% of teenagers own smartphones.” What are the two main issues?",
    "options": [
      {
        "text": "The sample comes from one school (not representative of all teenagers), and the claim generalises far beyond the sample.",
        "correct": true,
        "feedback": "Correct. One school’s sample can’t represent all teenagers, and the report’s headline generalises beyond the population that was actually sampled."
      },
      {
        "text": "The sample was random and the claim is fair.",
        "correct": false,
        "feedback": "The sample was not random (systematic) and the claim generalises beyond the sample."
      },
      {
        "text": "The sample was too small.",
        "correct": false,
        "feedback": "Sample size isn’t stated as a problem."
      },
      {
        "text": "The result is proven.",
        "correct": false,
        "feedback": "The claim is not proven."
      }
    ],
    "backward": "Two distinct issues: sample representativeness + claim scope.",
    "forward": "Standard checks for any survey claim."
  },
  {
    "itemId": "d7",
    "order": 7,
    "cluster": "dataCollection",
    "clusterName": "Data collection methods",
    "question": "A student wants to know how many students in her school walk to school. She could use (i) her own survey of a random sample, (ii) the local council’s transport data, or (iii) her own observations at the school gate for one morning. Which source is most appropriate for her question?",
    "options": [
      {
        "text": "(i), because it directly samples the target population.",
        "correct": true,
        "feedback": "Correct. A random sample of the school’s students directly matches the research question."
      },
      {
        "text": "(ii), because council data is official.",
        "correct": false,
        "feedback": "The council’s transport data covers the town, not the school — so it can’t answer a question about this school’s students."
      },
      {
        "text": "(iii), because she sees the students herself.",
        "correct": false,
        "feedback": "One morning’s observations don’t represent all students (weather, day of week, etc.)."
      },
      {
        "text": "All three are equally good.",
        "correct": false,
        "feedback": "The three sources vary widely in suitability."
      }
    ],
    "backward": "The source must fit the question.",
    "forward": "Used whenever you choose between data sources."
  },
  {
    "itemId": "d8",
    "order": 8,
    "cluster": "fairQuestions",
    "clusterName": "Designing fair questions",
    "question": "A student wants to know how much time her classmates spend on social media. She writes: “Why do you waste time on social media?” What two problems does this question have?",
    "options": [
      {
        "text": "It presumes the behaviour is a waste of time, and it presumes all classmates use social media.",
        "correct": true,
        "feedback": "Correct. Both presumptions push the respondent toward a specific framing."
      },
      {
        "text": "It’s too long and too detailed.",
        "correct": false,
        "feedback": "Length isn’t the problem."
      },
      {
        "text": "It’s anonymous and on paper.",
        "correct": false,
        "feedback": "Anonymity and medium aren’t problems."
      },
      {
        "text": "It mentions social media and classmates.",
        "correct": false,
        "feedback": "Those mentions are necessary."
      }
    ],
    "backward": "Leading/presumptive wording biases responses.",
    "forward": "Neutral questions avoid both."
  },
  {
    "itemId": "d9",
    "order": 9,
    "cluster": "sampling",
    "clusterName": "Sampling (random, stratified)",
    "question": "A researcher wants a sample of 50 from a population of 1000 arranged alphabetically by surname. Should he use systematic sampling (every 20th name) or simple random sampling?",
    "options": [
      {
        "text": "Either is reasonable — systematic is faster, and the alphabetical list isn’t ordered by a relevant variable.",
        "correct": true,
        "feedback": "Correct. When the list has no relevant order, systematic sampling approximates random."
      },
      {
        "text": "Systematic is always wrong — random is better.",
        "correct": false,
        "feedback": "Systematic is valid here — the alphabetical list isn’t ordered by anything relevant."
      },
      {
        "text": "Simple random is always wrong — systematic is better.",
        "correct": false,
        "feedback": "Simple random is not wrong — it’s a valid method. The point is that systematic is equally valid when the list has no relevant order."
      },
      {
        "text": "Neither works.",
        "correct": false,
        "feedback": "Both methods are valid."
      }
    ],
    "backward": "Systematic ≈ random when the list is unordered.",
    "forward": "Used for large populations where every kth pick is convenient."
  },
  {
    "itemId": "d10",
    "order": 10,
    "cluster": "critiqueClaims",
    "clusterName": "Critiquing statistical claims",
    "question": "A newspaper reports that “drinking coffee reduces the risk of heart disease,” based on an observational study of 10,000 adults. Two weaknesses must be addressed before this claim can be accepted. What are they?",
    "options": [
      {
        "text": "The study is observational (association, not causation), and there may be confounding variables (e.g. diet, lifestyle).",
        "correct": true,
        "feedback": "Correct. Observational studies can’t establish causation on their own, and confounding variables could explain the link."
      },
      {
        "text": "Coffee is bad, and heart disease is serious.",
        "correct": false,
        "feedback": "These are opinions, not methodological issues."
      },
      {
        "text": "The study is too large, and it is too long.",
        "correct": false,
        "feedback": "A large study is usually an advantage, not a weakness — study size and duration aren’t the methodological issues here."
      },
      {
        "text": "The study must be wrong, and it must be biased.",
        "correct": false,
        "feedback": "The study may be valid; the claim is what’s too strong."
      }
    ],
    "backward": "Correlation ≠ causation.",
    "forward": "Standard checks for any causal claim."
  },
  {
    "itemId": "d11",
    "order": 11,
    "cluster": "bias",
    "clusterName": "Bias in sampling and surveys",
    "question": "A postal survey about internet access was sent to 500 households; only 120 replied. Which is the main source of bias?",
    "options": [
      {
        "text": "Non-response bias — the 380 households that didn’t reply may differ from those who did.",
        "correct": true,
        "feedback": "Correct. Non-response bias occurs when respondents differ from non-respondents."
      },
      {
        "text": "Question-wording bias — the questions were poorly written.",
        "correct": false,
        "feedback": "No information about question wording is given."
      },
      {
        "text": "Sampling-frame bias — the addresses were incomplete.",
        "correct": false,
        "feedback": "The addresses aren’t described as incomplete."
      },
      {
        "text": "No bias — 120 replies is enough.",
        "correct": false,
        "feedback": "A 24% response rate is very low, and non-response bias is likely."
      }
    ],
    "backward": "Response rates matter for reliability.",
    "forward": "Used whenever a survey has a low response rate."
  },
  {
    "itemId": "d12",
    "order": 12,
    "cluster": "mixed",
    "clusterName": "Mixed investigation scenarios (synthesis)",
    "question": "A company claims that “students who use our study app get 30% higher grades.” The survey was based on 15 volunteers who downloaded the app. What are the two main issues?",
    "options": [
      {
        "text": "The sample is small and self-selected, and the data shows association, not proven causation.",
        "correct": true,
        "feedback": "Correct. Volunteers who downloaded the app may differ from non-users, and an association doesn’t prove the app caused higher grades."
      },
      {
        "text": "The sample was random and the question was fair.",
        "correct": false,
        "feedback": "The sample was not random; the question isn’t described."
      },
      {
        "text": "The survey was too long.",
        "correct": false,
        "feedback": "Length isn’t mentioned."
      },
      {
        "text": "The result is proven.",
        "correct": false,
        "feedback": "The result is not proven."
      }
    ],
    "backward": "Sample size + self-selection + causation.",
    "forward": "Standard synthesis checks."
  },
  {
    "itemId": "d13",
    "order": 13,
    "cluster": "dataCollection",
    "clusterName": "Data collection methods",
    "question": "A student wants to compare average income of families in her school. Which method is best?",
    "options": [
      {
        "text": "Send an anonymous survey to a random sample of families, asking them to report their income.",
        "correct": true,
        "feedback": "Correct. Anonymous self-reporting from a random sample is the most accurate."
      },
      {
        "text": "Survey students in her class and ask them to estimate their family income.",
        "correct": false,
        "feedback": "One class isn’t representative, and estimates are less accurate."
      },
      {
        "text": "Use national income figures for her town.",
        "correct": false,
        "feedback": "National/town data isn’t specific to her school."
      },
      {
        "text": "Ask teachers to estimate their students’ family incomes.",
        "correct": false,
        "feedback": "Teachers’ estimates are indirect and may not be accurate."
      }
    ],
    "backward": "Method must match the question.",
    "forward": "Sensitive questions need anonymity."
  },
  {
    "itemId": "d14",
    "order": 14,
    "cluster": "fairQuestions",
    "clusterName": "Designing fair questions",
    "question": "Which of these questions is best for a survey about students’ favourite school trip?",
    "options": [
      {
        "text": "“Which school trip did you enjoy most?”",
        "correct": true,
        "feedback": "Correct. Neutral, direct, no leading."
      },
      {
        "text": "“Don’t you think the museum trip was the best?”",
        "correct": false,
        "feedback": "Leading toward the museum trip."
      },
      {
        "text": "“Why do you dislike the museum trip?”",
        "correct": false,
        "feedback": "Presumes dislike."
      },
      {
        "text": "“You enjoyed the museum trip, right?”",
        "correct": false,
        "feedback": "Presumes enjoyment."
      }
    ],
    "backward": "Fair questions.",
    "forward": "Neutral wording produces usable data."
  },
  {
    "itemId": "d15",
    "order": 15,
    "cluster": "sampling",
    "clusterName": "Sampling (random, stratified)",
    "question": "A researcher picks every 12th student from an alphabetical register to obtain a sample of 25. How many students are on the register?",
    "options": [
      {
        "text": "\\(300\\)",
        "correct": true,
        "feedback": "Correct. Population = interval × sample size = \\(12 \\times 25 = 300\\)."
      },
      {
        "text": "\\(25\\)",
        "correct": false,
        "feedback": "You gave the sample size (25), not the population."
      },
      {
        "text": "\\(12\\)",
        "correct": false,
        "feedback": "You gave the interval (12)."
      },
      {
        "text": "\\(312\\)",
        "correct": false,
        "feedback": "You added an extra interval: 300 + 12 = 312."
      }
    ],
    "backward": "Systematic sampling.",
    "forward": "Used whenever you know two of the three quantities."
  },
  {
    "itemId": "d16",
    "order": 16,
    "cluster": "critiqueClaims",
    "clusterName": "Critiquing statistical claims",
    "question": "A study finds that students who read more have better vocabularies. The evidence comes from a survey in which students reported their own reading habits. What is the strongest claim this data can support?",
    "options": [
      {
        "text": "There is an association between reading and vocabulary, but the survey relied on self-reporting.",
        "correct": true,
        "feedback": "Correct. The study shows a link, but self-reported data is a limitation."
      },
      {
        "text": "Reading causes better vocabulary — proven.",
        "correct": false,
        "feedback": "Causation isn’t proven from survey data alone."
      },
      {
        "text": "Better vocabulary causes more reading — proven.",
        "correct": false,
        "feedback": "Direction of causation isn’t established."
      },
      {
        "text": "The data is invalid.",
        "correct": false,
        "feedback": "The data is valid — the causal claim isn’t supported."
      }
    ],
    "backward": "Observational + self-report limits causal claims.",
    "forward": "Used whenever you evaluate the strength of evidence."
  },
  {
    "itemId": "d17",
    "order": 17,
    "cluster": "bias",
    "clusterName": "Bias in sampling and surveys",
    "question": "A researcher asks students face-to-face how often they exercise. Which is the main source of bias?",
    "options": [
      {
        "text": "Response bias — students may overstate their exercise to appear healthier.",
        "correct": true,
        "feedback": "Correct. Face-to-face questioning about health behaviours often triggers social-desirability bias."
      },
      {
        "text": "Sampling-frame bias — the school register is incomplete.",
        "correct": false,
        "feedback": "No information about the register is given."
      },
      {
        "text": "Non-response bias — some students don’t reply.",
        "correct": false,
        "feedback": "Non-response is a different issue."
      },
      {
        "text": "No bias — the questions are neutral.",
        "correct": false,
        "feedback": "Even neutral questions can trigger response bias when the topic is sensitive and the interview is face-to-face — social-desirability pressure can push respondents to overstate exercise."
      }
    ],
    "backward": "Response bias.",
    "forward": "Sensitive topics may need anonymous methods."
  },
  {
    "itemId": "d18",
    "order": 18,
    "cluster": "mixed",
    "clusterName": "Mixed investigation scenarios (synthesis)",
    "question": "A news article uses government health records to claim that “eating vegetables causes lower cancer rates.” What are the two main issues?",
    "options": [
      {
        "text": "The data is secondary (context and methodology are not visible), and the claim asserts causation from what is likely an association.",
        "correct": true,
        "feedback": "Correct. Government health records are secondary — the news article doesn’t show how the underlying study was designed — and observational data on diet and disease can only show association, not causation."
      },
      {
        "text": "The data is primary and the claim is fair.",
        "correct": false,
        "feedback": "Government records are secondary, and the causal claim is not supported by observational data."
      },
      {
        "text": "The data is too old.",
        "correct": false,
        "feedback": "The age of the data is not the primary issue."
      },
      {
        "text": "The claim is proven.",
        "correct": false,
        "feedback": "The claim is not proven."
      }
    ],
    "backward": "Two distinct issues: data provenance + association/causation.",
    "forward": "Standard checks for any health-claim headline."
  },
  {
    "itemId": "d19",
    "order": 19,
    "cluster": "bias",
    "clusterName": "Bias in sampling and surveys",
    "question": "A student wants to know the most popular sport among 14‑year‑olds in his town. He plans to survey a random sample of students from his own school. Why might this not fully answer his question?",
    "options": [
      {
        "text": "His school may not represent all 14‑year‑olds in the town (some attend other schools or are home-schooled).",
        "correct": true,
        "feedback": "Correct. The target population is all 14‑year‑olds in the town; his school is only a subset."
      },
      {
        "text": "His school is too small.",
        "correct": false,
        "feedback": "Size isn’t the issue."
      },
      {
        "text": "The survey is too long.",
        "correct": false,
        "feedback": "Length isn’t the issue."
      },
      {
        "text": "14‑year‑olds don’t like sports.",
        "correct": false,
        "feedback": "This is false."
      }
    ],
    "backward": "Target population vs accessible population.",
    "forward": "Always check that the sample covers the population of interest."
  },
  {
    "itemId": "d20",
    "order": 20,
    "cluster": "fairQuestions",
    "clusterName": "Designing fair questions",
    "question": "Which of these is a double‑barrelled question?",
    "options": [
      {
        "text": "“Do you like the new timetable and find it easier to follow?”",
        "correct": true,
        "feedback": "Correct. This asks about two things at once (“like” and “easier to follow”). (bw: Double-barrelled questions produce unusable answers.)"
      },
      {
        "text": "“How many hours do you study per week?”",
        "correct": false,
        "feedback": "Single issue, neutral."
      },
      {
        "text": "“What is your favourite book?”",
        "correct": false,
        "feedback": "Single issue, neutral."
      },
      {
        "text": "“How often do you exercise?”",
        "correct": false,
        "feedback": "Single issue, neutral."
      }
    ]
  },
  {
    "itemId": "d21",
    "order": 21,
    "cluster": "sampling",
    "clusterName": "Sampling (random, stratified)",
    "question": "A stratified sample needs to be taken from a population split 3:1 between two groups. In a sample of 40, how many should come from the larger group?",
    "options": [
      {
        "text": "\\(30\\)",
        "correct": true,
        "feedback": "Correct. The larger group is \\(3/4\\) of the population. \\(3/4 \\times 40 = 30\\). (bw: Stratified sampling preserves proportions.)"
      },
      {
        "text": "\\(10\\)",
        "correct": false,
        "feedback": "You gave the smaller group’s share (\\(1/4 \\times 40 = 10\\))."
      },
      {
        "text": "\\(20\\)",
        "correct": false,
        "feedback": "You split the sample equally (\\(40 \\div 2 = 20\\))."
      },
      {
        "text": "\\(13\\)",
        "correct": false,
        "feedback": "You treated the ratio as “1 in 3” rather than “1 part in 4” (3:1 means 3 out of every 4 parts). This gives approximately 13 (rounding down from 13.3)."
      }
    ]
  },
  {
    "itemId": "d22",
    "order": 22,
    "cluster": "critiqueClaims",
    "clusterName": "Critiquing statistical claims",
    "question": "A study finds that students in School A have higher average test scores than students in School B. What is the most important missing information?",
    "options": [
      {
        "text": "The characteristics of the two schools’ populations (e.g. socioeconomic mix, class sizes).",
        "correct": true,
        "feedback": "Correct. The difference may reflect the student populations rather than the schools themselves."
      },
      {
        "text": "The exact dates when the tests were taken.",
        "correct": false,
        "feedback": "Timing isn’t the key factor — the composition of each school’s population is what needs to be compared."
      },
      {
        "text": "The colour of the schools’ buildings.",
        "correct": false,
        "feedback": "Building colour is irrelevant."
      },
      {
        "text": "The names of the head teachers.",
        "correct": false,
        "feedback": "Head teachers’ names are irrelevant."
      }
    ],
    "backward": "Comparisons need context.",
    "forward": "Always ask “who is being compared?”"
  },
  {
    "itemId": "d23",
    "order": 23,
    "cluster": "bias",
    "clusterName": "Bias in sampling and surveys",
    "question": "A survey about reading habits is carried out online and only promoted through social media. Which is the main source of bias?",
    "options": [
      {
        "text": "People who don’t use social media are excluded from the sample.",
        "correct": true,
        "feedback": "Correct. The sampling frame (social-media users) excludes a specific subgroup of the population."
      },
      {
        "text": "The survey is too short.",
        "correct": false,
        "feedback": "Length isn’t the main issue."
      },
      {
        "text": "The survey asks about reading.",
        "correct": false,
        "feedback": "Asking about reading is necessary."
      },
      {
        "text": "The results are anonymous.",
        "correct": false,
        "feedback": "Anonymity reduces bias, not introduces it."
      }
    ],
    "backward": "Sampling frame limits who can be included.",
    "forward": "Any method that excludes a group introduces bias."
  },
  {
    "itemId": "d24",
    "order": 24,
    "cluster": "mixed",
    "clusterName": "Mixed investigation scenarios (synthesis)",
    "question": "A study finds that students who eat school‑provided lunches score higher in exams than those who bring packed lunches. The survey is based on 20 volunteers. What are the two main issues?",
    "options": [
      {
        "text": "The sample is small and self-selected, and the data shows association, not proven causation.",
        "correct": true,
        "feedback": "Correct. Twenty volunteers is both small and self-selected, and an association doesn’t prove lunch type causes higher scores."
      },
      {
        "text": "The sample was random.",
        "correct": false,
        "feedback": "The sample was not random."
      },
      {
        "text": "The result is proven.",
        "correct": false,
        "feedback": "The result is not proven."
      },
      {
        "text": "The study covered too long a period.",
        "correct": false,
        "feedback": "Period length isn’t described."
      }
    ],
    "backward": "Sample size + self-selection + causation.",
    "forward": "Standard synthesis checks."
  }
];

const recheckItems = [
  {
    "itemId": "r1",
    "order": 1,
    "cluster": "dataCollection",
    "clusterName": "Data collection methods",
    "question": "A company’s annual sales figures are primary data for:",
    "options": [
      {
        "text": "The company itself, but secondary for an external analyst.",
        "correct": true,
        "feedback": "Correct. Data is primary for the person or organisation that collected it; for anyone else it’s secondary."
      },
      {
        "text": "The external analyst, but secondary for the company.",
        "correct": false,
        "feedback": "You reversed the categories."
      },
      {
        "text": "Both the company and the external analyst.",
        "correct": false,
        "feedback": "Data isn’t primary for both — only for the collector."
      },
      {
        "text": "Neither the company nor the external analyst.",
        "correct": false,
        "feedback": "The company collected the data, so it’s primary for them."
      }
    ],
    "backward": "Primary vs secondary depends on who collected it.",
    "forward": "Used whenever you assess a data source."
  },
  {
    "itemId": "r2",
    "order": 2,
    "cluster": "sampling",
    "clusterName": "Sampling (random, stratified)",
    "question": "A school of 500 students has 200 boys and 300 girls. A stratified sample of 100 should include how many boys?",
    "options": [
      {
        "text": "\\(40\\)",
        "correct": true,
        "feedback": "Correct. Boys are \\(200/500 = 0.4\\). \\(0.4 \\times 100 = 40\\). (bw: Stratified sampling.)"
      },
      {
        "text": "\\(60\\)",
        "correct": false,
        "feedback": "You gave the girls’ share (\\(300/500 \\times 100 = 60\\))."
      },
      {
        "text": "\\(50\\)",
        "correct": false,
        "feedback": "You split the sample equally (\\(100 \\div 2 = 50\\))."
      },
      {
        "text": "\\(20\\)",
        "correct": false,
        "feedback": "You halved the correct answer."
      }
    ]
  },
  {
    "itemId": "r3",
    "order": 3,
    "cluster": "bias",
    "clusterName": "Bias in sampling and surveys",
    "question": "A survey about healthy eating is carried out at a fast‑food restaurant. What is the main source of bias?",
    "options": [
      {
        "text": "Fast-food customers may not represent the general population’s eating habits.",
        "correct": true,
        "feedback": "Correct. The location over-represents a particular subgroup. (bw: Location can bias samples.)"
      },
      {
        "text": "The restaurant is busy.",
        "correct": false,
        "feedback": "Being busy isn’t the source of bias."
      },
      {
        "text": "The survey is short.",
        "correct": false,
        "feedback": "Length isn’t the source of bias."
      },
      {
        "text": "The survey asks about food.",
        "correct": false,
        "feedback": "Asking about food is necessary."
      }
    ]
  },
  {
    "itemId": "r4",
    "order": 4,
    "cluster": "fairQuestions",
    "clusterName": "Designing fair questions",
    "question": "Which of these questions is fair?",
    "options": [
      {
        "text": "“How many servings of fruit did you eat yesterday?”",
        "correct": true,
        "feedback": "Correct. Neutral, factual, no presumptions."
      },
      {
        "text": "“Don’t you think you eat too much junk food?”",
        "correct": false,
        "feedback": "Leading."
      },
      {
        "text": "“Why do you eat so much junk food?”",
        "correct": false,
        "feedback": "Presumes too much junk food."
      },
      {
        "text": "“You eat healthy, right?”",
        "correct": false,
        "feedback": "Presumes healthy eating."
      }
    ]
  },
  {
    "itemId": "r5",
    "order": 5,
    "cluster": "critiqueClaims",
    "clusterName": "Critiquing statistical claims",
    "question": "A claim says: “Our toothpaste is recommended by 4 out of 5 dentists.” What two questions are needed to evaluate the claim?",
    "options": [
      {
        "text": "How the dentists were chosen, and what “recommend” means.",
        "correct": true,
        "feedback": "Correct. The sample and the definition of “recommend” determine whether the claim is credible. (bw: Claims need context.)"
      },
      {
        "text": "The toothpaste’s price and colour.",
        "correct": false,
        "feedback": "Price and colour aren’t relevant to the recommendation."
      },
      {
        "text": "The names of the dentists and their ages.",
        "correct": false,
        "feedback": "Names and ages aren’t essential."
      },
      {
        "text": "The brand and country of manufacture.",
        "correct": false,
        "feedback": "Brand and country aren’t essential."
      }
    ]
  },
  {
    "itemId": "r6",
    "order": 6,
    "cluster": "sampling",
    "clusterName": "Sampling (random, stratified)",
    "question": "A population of 800 is sampled with a systematic interval of 16. What sample size does this give?",
    "options": [
      {
        "text": "\\(50\\)",
        "correct": true,
        "feedback": "Correct. Sample size = population ÷ interval = \\(800 \\div 16 = 50\\). (bw: Systematic sampling.)"
      },
      {
        "text": "\\(16\\)",
        "correct": false,
        "feedback": "You gave the interval."
      },
      {
        "text": "\\(25\\)",
        "correct": false,
        "feedback": "You halved the correct answer."
      },
      {
        "text": "\\(800\\)",
        "correct": false,
        "feedback": "You gave the population size."
      }
    ]
  },
  {
    "itemId": "r7",
    "order": 7,
    "cluster": "dataCollection",
    "clusterName": "Data collection methods",
    "question": "A student wants to know how many hours of TV her classmates watch per week. She has two options: (i) ask them to estimate weekly, or (ii) ask them to log viewing for one week. Which is more reliable, and why?",
    "options": [
      {
        "text": "(ii), because logging actual viewing is more accurate than estimating.",
        "correct": true,
        "feedback": "Correct. Real-time logging avoids recall errors."
      },
      {
        "text": "(i), because it covers a longer period.",
        "correct": false,
        "feedback": "Estimates over a longer period are still estimates."
      },
      {
        "text": "(ii), because it’s quicker to collect.",
        "correct": false,
        "feedback": "Speed isn’t the criterion for reliability."
      },
      {
        "text": "(i), because it’s easier for classmates.",
        "correct": false,
        "feedback": "Ease isn’t the criterion for reliability."
      }
    ],
    "backward": "Method + accuracy.",
    "forward": "Used whenever you design a data collection plan."
  },
  {
    "itemId": "r8",
    "order": 8,
    "cluster": "fairQuestions",
    "clusterName": "Designing fair questions",
    "question": "Which of these is double‑barrelled?",
    "options": [
      {
        "text": "“Do you enjoy science and find it useful?”",
        "correct": true,
        "feedback": "Correct. This asks about enjoyment AND usefulness — two separate issues."
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
    "question": "A researcher wants to know about internet speeds in a town. He surveys people who call to complain about slow internet. What type of bias is this?",
    "options": [
      {
        "text": "Self-selection bias — people who complain aren’t representative of all internet users.",
        "correct": true,
        "feedback": "Correct. Only people who feel strongly enough to complain are sampled."
      },
      {
        "text": "Non-response bias — many people didn’t reply.",
        "correct": false,
        "feedback": "Non-response bias applies when some people don’t reply to a survey — different issue."
      },
      {
        "text": "Question-wording bias — the question was leading.",
        "correct": false,
        "feedback": "Question wording isn’t the problem here."
      },
      {
        "text": "No bias — complaints are valid data.",
        "correct": false,
        "feedback": "The sample is clearly biased."
      }
    ],
    "backward": "Self-selection bias.",
    "forward": "Any opt-in method risks this."
  },
  {
    "itemId": "r10",
    "order": 10,
    "cluster": "critiqueClaims",
    "clusterName": "Critiquing statistical claims",
    "question": "A claim says: “This pill reduces headaches in 90% of users.” What two questions are needed?",
    "options": [
      {
        "text": "How “reduces headaches” was measured, and how the users were selected.",
        "correct": true,
        "feedback": "Correct. Both the measurement and the sample affect the claim. (bw: Claims need context — what was measured and who was sampled.)"
      },
      {
        "text": "How much the pill costs, and where it is made.",
        "correct": false,
        "feedback": "Price and origin aren’t relevant to the claim’s validity."
      },
      {
        "text": "What colour the pill is, and what it tastes like.",
        "correct": false,
        "feedback": "Colour and taste aren’t relevant to the claim’s validity."
      },
      {
        "text": "Who the CEO is, and how many employees the company has.",
        "correct": false,
        "feedback": "Corporate details aren’t relevant to the claim’s validity."
      }
    ]
  },
  {
    "itemId": "r11",
    "order": 11,
    "cluster": "mixed",
    "clusterName": "Mixed investigation scenarios (synthesis)",
    "question": "A student surveys her classmates with the question “Why don’t you read enough books?” and concludes that “teenagers don’t read.” What are the two main issues?",
    "options": [
      {
        "text": "The question is leading (it presumes the classmates don’t read enough), and the sample (one class) doesn’t represent all teenagers.",
        "correct": true,
        "feedback": "Correct. The phrase “don’t you read enough” pushes respondents toward admitting they don’t read, and one class can’t stand in for all teenagers."
      },
      {
        "text": "The question was fair and the sample was random.",
        "correct": false,
        "feedback": "The question was leading, and the sample was not random — one class is a convenience sample."
      },
      {
        "text": "The survey was too short.",
        "correct": false,
        "feedback": "Length isn’t the issue."
      },
      {
        "text": "The conclusion is proven.",
        "correct": false,
        "feedback": "The conclusion is not proven."
      }
    ],
    "backward": "Question-wording bias + sample representativeness.",
    "forward": "Standard synthesis checks for any survey claim."
  },
  {
    "itemId": "r12",
    "order": 12,
    "cluster": "critiqueClaims",
    "clusterName": "Critiquing statistical claims",
    "question": "A shop finds that ice-cream sales and sunscreen sales both peak in July. The shop only has data for one year. What are the two main issues?",
    "options": [
      {
        "text": "Both sales are associated with a third factor (hot weather), and one year of data may not represent long-term patterns.",
        "correct": true,
        "feedback": "Correct. Both vary with temperature — a confounding variable — and one year’s data is a limited basis for general claims."
      },
      {
        "text": "Ice cream causes sunscreen sales.",
        "correct": false,
        "feedback": "Implausible causal direction."
      },
      {
        "text": "Sunscreen causes ice-cream sales.",
        "correct": false,
        "feedback": "Implausible causal direction."
      },
      {
        "text": "The data is invalid.",
        "correct": false,
        "feedback": "The data is valid; the interpretation isn’t fully supported."
      }
    ],
    "backward": "Correlation ≠ causation + sample period.",
    "forward": "Both must be considered."
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
    title: "Statistical Investigations — Advanced Core",
    subtitle: "Grade 8 · Level 2 · Advanced Core",
    description: "Chained investigation reasoning — choosing between data sources, systematic sampling calculations, spotting double-barrelled and leading questions, and evaluating claims combining sample bias with causation — warm-up, diagnostic, and spaced recheck.",
    clusterNames: CLUSTER_NAMES,
    gateReviewHTML: "<p>You’ve finished the warm‑up. The next 24 questions are the Advanced Core diagnostic for statistical investigations. Each question asks you to chain two or more steps — identify the type of data, choose a sampling method, spot sources of bias, design fair questions, and critique statistical claims. Some items combine two skills at once. Take your time and use the feedback to sharpen your reasoning.</p>",
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

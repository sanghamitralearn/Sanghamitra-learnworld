// seed/mathSeedCh6StatisticalInvestigationsL4.js
//
// Populates math_chapters and math_questions with Grade 8, Chapter 6
// (Statistical Investigations), Level 4 — converted from the
// standalone diagnostic JSON ch6-statistical-investigations-level-4.json.
//
// Run with: node seed/mathSeedCh6StatisticalInvestigationsL4.js

const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-8";
const GRADE_LABEL = "Grade 8";
const CHAPTER_SLUG = "ch-6-statistical-investigations";
const CHAPTER_NAME = "Statistical Investigations";
const LEVEL = 4;

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
    "tier": "S",
    "question": "A school has 300 students split equally across 3 year groups. In a stratified sample of 30, how many should come from each group?",
    "options": [
      {
        "text": "\\(10\\)",
        "correct": true,
        "feedback": "Correct. Each group = \\(100/300 = 1/3\\). \\(1/3 \\times 30 = 10\\)."
      },
      {
        "text": "\\(30\\)",
        "correct": false,
        "feedback": "You gave the full sample size."
      },
      {
        "text": "\\(15\\)",
        "correct": false,
        "feedback": "You halved the sample size."
      },
      {
        "text": "\\(5\\)",
        "correct": false,
        "feedback": "You halved the correct answer (10 ÷ 2 = 5)."
      }
    ],
    "retryHint": "Fraction of population × sample size.",
    "backward": "Stratified sampling preserves proportions.",
    "forward": "Used whenever subgroups are equal."
  },
  {
    "itemId": "w2",
    "order": 2,
    "cluster": "dataCollection",
    "clusterName": "Data collection methods",
    "tier": "S",
    "question": "Which of these is primary data?",
    "options": [
      {
        "text": "Responses from a survey you designed and ran.",
        "correct": true,
        "feedback": "Correct. Primary = you collected it yourself."
      },
      {
        "text": "Data from a textbook.",
        "correct": false,
        "feedback": "Textbook data was collected by others."
      },
      {
        "text": "Data from a news article.",
        "correct": false,
        "feedback": "News articles report on data collected by others."
      },
      {
        "text": "Data from a government website.",
        "correct": false,
        "feedback": "Government websites publish data collected by others."
      }
    ],
    "retryHint": "Ask “did I collect this myself?”",
    "backward": "Primary vs secondary.",
    "forward": "Used whenever you plan an investigation."
  },
  {
    "itemId": "w3",
    "order": 3,
    "cluster": "fairQuestions",
    "clusterName": "Designing fair questions",
    "tier": "S",
    "question": "Which survey question is fair?",
    "options": [
      {
        "text": "“How many hours do you exercise per week?”",
        "correct": true,
        "feedback": "Correct. Neutral and factual."
      },
      {
        "text": "“Don’t you think you should exercise more?”",
        "correct": false,
        "feedback": "Leading toward “yes.”"
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
    ],
    "retryHint": "A fair question doesn’t hint at the answer.",
    "backward": "Fair questions don’t lead.",
    "forward": "Neutral wording produces usable data."
  },
  {
    "itemId": "w4",
    "order": 4,
    "cluster": "bias",
    "clusterName": "Bias in sampling and surveys",
    "tier": "S",
    "question": "A survey about favourite books is carried out in a library. Why is this biased?",
    "options": [
      {
        "text": "Library users read more than the general population.",
        "correct": true,
        "feedback": "Correct. Location restricts the sample to a specific subgroup."
      },
      {
        "text": "The library is too quiet.",
        "correct": false,
        "feedback": "Noise isn’t a source of sampling bias."
      },
      {
        "text": "The survey is too short.",
        "correct": false,
        "feedback": "Length isn’t the issue."
      },
      {
        "text": "The survey asks about books.",
        "correct": false,
        "feedback": "Asking about books is necessary."
      }
    ],
    "retryHint": "Ask “who is likely to be here?”",
    "backward": "Location bias.",
    "forward": "Used whenever you evaluate a survey’s setting."
  },
  {
    "itemId": "w5",
    "order": 5,
    "cluster": "critiqueClaims",
    "clusterName": "Critiquing statistical claims",
    "tier": "C",
    "question": "A company claims “90% of our customers are satisfied.” What’s the most important question to ask?",
    "options": [
      {
        "text": "How the customers were chosen.",
        "correct": true,
        "feedback": "Correct. The sampling method determines whether the claim is credible."
      },
      {
        "text": "How long the company has existed.",
        "correct": false,
        "feedback": "Company age may affect reputation, but it doesn’t validate the claim itself — the sampling method does."
      },
      {
        "text": "What the survey question actually asked.",
        "correct": false,
        "feedback": "Question wording matters, but the sample is more fundamental — a well-worded question asked of the wrong people still gives misleading data."
      },
      {
        "text": "How many customers the company has in total.",
        "correct": false,
        "feedback": "Company size doesn’t determine whether this sample is credible."
      }
    ],
    "retryHint": "Ask “who was sampled?”",
    "backward": "Claims depend on how data was gathered.",
    "forward": "Standard check for any percentage claim."
  },
  {
    "itemId": "w6",
    "order": 6,
    "cluster": "bias",
    "clusterName": "Bias in sampling and surveys",
    "tier": "C",
    "question": "A survey is sent to 400 households; only 80 reply. What type of bias is most likely?",
    "options": [
      {
        "text": "Non-response bias — the 320 who didn’t reply may differ.",
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
        "text": "No bias — 80 is enough.",
        "correct": false,
        "feedback": "A 20% response rate is very low."
      }
    ],
    "retryHint": "Ask “who didn’t reply, and how might they differ?”"
  },
  {
    "itemId": "w7",
    "order": 7,
    "cluster": "mixed",
    "clusterName": "Mixed investigation scenarios (synthesis)",
    "tier": "H",
    "question": "A study finds that students who eat breakfast get better grades, based on 12 volunteers. What are the two main issues?",
    "options": [
      {
        "text": "The sample is small and self-selected, and the data shows association, not proven causation.",
        "correct": true,
        "feedback": "Correct. Volunteers differ from the general population, and an association doesn’t prove causation."
      },
      {
        "text": "The sample was random and the question was fair.",
        "correct": false,
        "feedback": "The sample was not random."
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
    "backward": "Sample size + self-selection + causation.",
    "forward": "Standard synthesis checks."
  },
  {
    "itemId": "w8",
    "order": 8,
    "cluster": "dataCollection",
    "clusterName": "Data collection methods",
    "tier": "T",
    "question": "A student uses her school’s own attendance records for a project. For the student, this data is:",
    "options": [
      {
        "text": "Secondary data — the school collected it, not her.",
        "correct": true,
        "feedback": "Correct. Primary is defined by who collected it, not by whose school it is."
      },
      {
        "text": "Primary data — it’s about her own school.",
        "correct": false,
        "feedback": "“It’s about my school” doesn’t make it primary for her — the school collected it, so it’s secondary for her."
      },
      {
        "text": "Both primary and secondary.",
        "correct": false,
        "feedback": "Data can’t be both at once."
      },
      {
        "text": "Not real data.",
        "correct": false,
        "feedback": "It’s a valid type of data."
      }
    ],
    "retryHint": "Ask “who collected it?” not “whose data is it about?”",
    "backward": "Primary = collected by you.",
    "forward": "Used whenever you assess a data source."
  }
];

const diagnosticItems = [
  {
    "itemId": "d1",
    "order": 1,
    "cluster": "dataCollection",
    "clusterName": "Data collection methods",
    "tier": "S",
    "question": "Which of these is secondary data?",
    "options": [
      {
        "text": "Published rainfall figures from the Met Office.",
        "correct": true,
        "feedback": "Correct. Published by another organisation. (bw: Primary = you collected it.)"
      },
      {
        "text": "Temperature measurements you take yourself.",
        "correct": false,
        "feedback": "Your own measurements are primary."
      },
      {
        "text": "Responses to a survey you designed.",
        "correct": false,
        "feedback": "Your own survey responses are primary."
      },
      {
        "text": "Counts of cars you make outside your house.",
        "correct": false,
        "feedback": "Your own counts are primary."
      }
    ]
  },
  {
    "itemId": "d2",
    "order": 2,
    "cluster": "fairQuestions",
    "clusterName": "Designing fair questions",
    "tier": "T",
    "question": "Which question is leading?",
    "options": [
      {
        "text": "“How many hours of TV do you watch per day?”",
        "correct": false,
        "feedback": "Neutral — asks for a factual count."
      },
      {
        "text": "“Don’t you think children watch too much TV?”",
        "correct": true,
        "feedback": "Correct. “Don’t you think…” leads the respondent toward agreement."
      },
      {
        "text": "“What is your favourite TV programme?”",
        "correct": false,
        "feedback": "Neutral — asks for a preference."
      },
      {
        "text": "“How often do you watch TV?”",
        "correct": false,
        "feedback": "Neutral — asks for a frequency, without presuming the answer."
      }
    ],
    "backward": "Leading questions bias responses.",
    "forward": "Split into neutral questions."
  },
  {
    "itemId": "d3",
    "order": 3,
    "cluster": "sampling",
    "clusterName": "Sampling (random, stratified)",
    "tier": "S",
    "question": "A school has 400 students in 4 year groups, 100 in each. A stratified sample of 40 should include how many from each year group?",
    "options": [
      {
        "text": "\\(10\\)",
        "correct": true,
        "feedback": "Correct. \\(100/400 = 1/4\\). \\(1/4 \\times 40 = 10\\). (bw: Stratified sampling.)"
      },
      {
        "text": "\\(40\\)",
        "correct": false,
        "feedback": "You gave the full sample size."
      },
      {
        "text": "\\(20\\)",
        "correct": false,
        "feedback": "You halved the sample size."
      },
      {
        "text": "\\(4\\)",
        "correct": false,
        "feedback": "You gave the number of groups."
      }
    ]
  },
  {
    "itemId": "d4",
    "order": 4,
    "cluster": "critiqueClaims",
    "clusterName": "Critiquing statistical claims",
    "tier": "C",
    "question": "A claim says “our new drug cures 80% of patients.” What two questions are needed to assess the claim?",
    "options": [
      {
        "text": "How “cures” was measured and how the patients were selected.",
        "correct": true,
        "feedback": "Correct. Measurement + sample determine credibility. (bw: Claims need context.)"
      },
      {
        "text": "Whether the study was peer-reviewed and how many patients were involved.",
        "correct": false,
        "feedback": "Peer review and sample size are relevant, but the two most fundamental questions are how “cures” was measured and how patients were selected."
      },
      {
        "text": "The drug’s cost and how it compares to alternatives.",
        "correct": false,
        "feedback": "Cost and alternatives matter for adoption decisions, but not for whether the claim itself is valid."
      },
      {
        "text": "Whether the company has received regulatory approval.",
        "correct": false,
        "feedback": "Regulatory approval is a separate concern from whether the percentage claim is trustworthy."
      }
    ]
  },
  {
    "itemId": "d5",
    "order": 5,
    "cluster": "bias",
    "clusterName": "Bias in sampling and surveys",
    "tier": "S",
    "question": "A researcher wants to survey adults about smartphone use. He draws his sample from a telephone directory listing landline numbers. What’s the main source of bias?",
    "options": [
      {
        "text": "Sampling-frame bias — the directory excludes mobile-only households.",
        "correct": true,
        "feedback": "Correct. The sampling frame determines who can be included. (bw: Sampling frame bias.)"
      },
      {
        "text": "Non-response bias — some people in the directory won’t answer.",
        "correct": false,
        "feedback": "Non-response bias is a related concern, but it’s secondary here — the primary problem is that whole categories of households (mobile-only) are excluded from the frame itself."
      },
      {
        "text": "The survey is too short.",
        "correct": false,
        "feedback": "Length isn’t the issue."
      },
      {
        "text": "The survey asks about smartphones.",
        "correct": false,
        "feedback": "Asking about smartphones is necessary."
      }
    ]
  },
  {
    "itemId": "d6",
    "order": 6,
    "cluster": "mixed",
    "clusterName": "Mixed investigation scenarios (synthesis)",
    "tier": "H",
    "question": "A researcher asks shoppers at a luxury store: “Do you agree that our prices are reasonable given the quality?” What are the two main issues?",
    "options": [
      {
        "text": "The question is leading (suggests the prices are reasonable) and the sample (luxury-store shoppers) is unrepresentative.",
        "correct": true,
        "feedback": "Correct. The phrase “given the quality” pushes toward agreement, and luxury-store shoppers are a specific subgroup."
      },
      {
        "text": "The sample is fine, but the question is leading.",
        "correct": false,
        "feedback": "The sample is NOT fine — luxury-store shoppers are a biased subgroup for a question about prices in general."
      },
      {
        "text": "The question is fine, but the sample is biased.",
        "correct": false,
        "feedback": "The question is NOT fine — “given the quality” is a leading phrase that pushes toward “yes.”"
      },
      {
        "text": "The survey was too long.",
        "correct": false,
        "feedback": "Length isn’t mentioned."
      }
    ],
    "backward": "Question-wording bias + sample bias.",
    "forward": "Two standard checks."
  },
  {
    "itemId": "d7",
    "order": 7,
    "cluster": "dataCollection",
    "clusterName": "Data collection methods",
    "tier": "C",
    "question": "A student wants to study her classmates’ exercise. She could use (i) her own survey of her class, or (ii) published national data. Which is more appropriate?",
    "options": [
      {
        "text": "(i) — matches her specific population.",
        "correct": true,
        "feedback": "Correct. Data must match the question’s target population. (bw: Source must match question.)"
      },
      {
        "text": "(ii) — bigger sample size.",
        "correct": false,
        "feedback": "Bigger sample doesn’t help if it describes a different population."
      },
      {
        "text": "(i) — always more reliable.",
        "correct": false,
        "feedback": "No method is always more reliable."
      },
      {
        "text": "Either works equally well.",
        "correct": false,
        "feedback": "The two sources differ in relevance."
      }
    ]
  },
  {
    "itemId": "d8",
    "order": 8,
    "cluster": "fairQuestions",
    "clusterName": "Designing fair questions",
    "tier": "S",
    "question": "Which of these is double‑barrelled?",
    "options": [
      {
        "text": "“Do you like the new timetable and find it easier to follow?”",
        "correct": true,
        "feedback": "Correct. Asks about liking AND clarity — two distinct things."
      },
      {
        "text": "“How many hours do you study per week?”",
        "correct": false,
        "feedback": "Single issue."
      },
      {
        "text": "“What’s your favourite food?”",
        "correct": false,
        "feedback": "Single issue."
      },
      {
        "text": "“How often do you read?”",
        "correct": false,
        "feedback": "Single issue."
      }
    ]
  },
  {
    "itemId": "d9",
    "order": 9,
    "cluster": "sampling",
    "clusterName": "Sampling (random, stratified)",
    "tier": "C",
    "question": "A town has 2,000 adults: 800 aged 18–30, 700 aged 31–50, 500 aged 51+. A stratified sample of 100 should include how many aged 18–30?",
    "options": [
      {
        "text": "\\(40\\)",
        "correct": true,
        "feedback": "Correct. \\(800/2{,}000 = 0.4\\). \\(0.4 \\times 100 = 40\\). (bw: Stratified sampling.)"
      },
      {
        "text": "\\(35\\)",
        "correct": false,
        "feedback": "You used the 31–50 group’s share (\\(700/2{,}000 \\times 100 = 35\\))."
      },
      {
        "text": "\\(25\\)",
        "correct": false,
        "feedback": "You used the 51+ group’s share (\\(500/2{,}000 \\times 100 = 25\\))."
      },
      {
        "text": "\\(50\\)",
        "correct": false,
        "feedback": "You split the sample equally."
      }
    ]
  },
  {
    "itemId": "d10",
    "order": 10,
    "cluster": "critiqueClaims",
    "clusterName": "Critiquing statistical claims",
    "tier": "T",
    "question": "A study finds that people who own cats have lower stress. What’s the best conclusion?",
    "options": [
      {
        "text": "There is an association, but the causal direction is unclear — stress might affect whether someone owns a cat.",
        "correct": true,
        "feedback": "Correct. Observational data can show a link but not causal direction."
      },
      {
        "text": "Cats cause lower stress — proven.",
        "correct": false,
        "feedback": "The “obvious” direction isn’t proven — observational data can’t establish that cats caused the lower stress."
      },
      {
        "text": "Lower stress causes cat ownership — proven.",
        "correct": false,
        "feedback": "This direction is also unproven — the data doesn’t distinguish between the two."
      },
      {
        "text": "The data is invalid.",
        "correct": false,
        "feedback": "The data is valid — the causal claim isn’t supported."
      }
    ],
    "backward": "Correlation ≠ causation, and direction matters.",
    "forward": "Standard check for any causal claim."
  },
  {
    "itemId": "d11",
    "order": 11,
    "cluster": "bias",
    "clusterName": "Bias in sampling and surveys",
    "tier": "C",
    "question": "A news website posts an online poll asking “Do you support the new tax policy?” and 5,000 readers respond. What’s the main source of bias?",
    "options": [
      {
        "text": "Voluntary response bias — people who feel strongly (or use the site) are over-represented.",
        "correct": true,
        "feedback": "Correct. Voluntary response samples over-represent people with strong opinions."
      },
      {
        "text": "Sampling-frame bias — only the website’s readers can vote.",
        "correct": false,
        "feedback": "Sampling-frame bias is a related concern, but the primary issue here is voluntary response — even among readers, only those who choose to click are counted."
      },
      {
        "text": "The question is confusing.",
        "correct": false,
        "feedback": "The question is clear."
      },
      {
        "text": "There is no bias — 5,000 is a large sample.",
        "correct": false,
        "feedback": "A large sample doesn’t fix self-selection bias."
      }
    ],
    "backward": "Self-selection bias.",
    "forward": "Any opt-in method risks this."
  },
  {
    "itemId": "d12",
    "order": 12,
    "cluster": "bias",
    "clusterName": "Bias in sampling and surveys",
    "tier": "H",
    "question": "A company claims “our app doubles productivity,” based on a survey of 10 users who all rated it 5 stars. What are the two main issues?",
    "options": [
      {
        "text": "The sample is small and self-selected (only satisfied users rated), which is a form of response bias.",
        "correct": true,
        "feedback": "Correct. Small self-selected samples and one-sided response patterns both bias results."
      },
      {
        "text": "The sample was random and the question was fair.",
        "correct": false,
        "feedback": "The sample was not random."
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
    "backward": "Sample size + self-selection + response bias.",
    "forward": "Standard synthesis checks."
  },
  {
    "itemId": "d13",
    "order": 13,
    "cluster": "dataCollection",
    "clusterName": "Data collection methods",
    "tier": "T",
    "question": "A news article uses a government report’s statistics. For the news reporter writing the article, this data is:",
    "options": [
      {
        "text": "Secondary data — the government collected it, not the reporter.",
        "correct": true,
        "feedback": "Correct. Primary is defined by who collected it. (bw: Primary = collected by you.)"
      },
      {
        "text": "Primary data — it’s official.",
        "correct": false,
        "feedback": "“Official” doesn’t make it primary — the government collected it, not the reporter."
      },
      {
        "text": "Both primary and secondary.",
        "correct": false,
        "feedback": "Data can’t be both at once."
      },
      {
        "text": "Not real data.",
        "correct": false,
        "feedback": "It’s a valid type of data."
      }
    ]
  },
  {
    "itemId": "d14",
    "order": 14,
    "cluster": "fairQuestions",
    "clusterName": "Designing fair questions",
    "tier": "C",
    "question": "A student writes: “Do you agree that the school should ban phones to help students focus?” What’s the main problem?",
    "options": [
      {
        "text": "The question is leading — the phrase “to help students focus” pushes toward “yes.”",
        "correct": true,
        "feedback": "Correct. Adding a persuasive reason biases the response. (bw: Leading questions bias data.)"
      },
      {
        "text": "The question is too long.",
        "correct": false,
        "feedback": "Length isn’t the issue."
      },
      {
        "text": "The question mentions phones.",
        "correct": false,
        "feedback": "Mentioning phones is necessary."
      },
      {
        "text": "The question is anonymous.",
        "correct": false,
        "feedback": "Anonymity isn’t the issue."
      }
    ]
  },
  {
    "itemId": "d15",
    "order": 15,
    "cluster": "sampling",
    "clusterName": "Sampling (random, stratified)",
    "tier": "S",
    "question": "A researcher wants a systematic sample of 50 from a population of 500. What interval should she use?",
    "options": [
      {
        "text": "\\(10\\)",
        "correct": true,
        "feedback": "Correct. \\(500 \\div 50 = 10\\). (bw: Systematic sampling.)"
      },
      {
        "text": "\\(50\\)",
        "correct": false,
        "feedback": "You used the sample size as the interval."
      },
      {
        "text": "\\(5\\)",
        "correct": false,
        "feedback": "You halved the correct interval."
      },
      {
        "text": "\\(500\\)",
        "correct": false,
        "feedback": "You gave the population size."
      }
    ]
  },
  {
    "itemId": "d16",
    "order": 16,
    "cluster": "critiqueClaims",
    "clusterName": "Critiquing statistical claims",
    "tier": "C",
    "question": "A poll shows 47% for Candidate A and 45% for Candidate B, with a margin of error of ±4%. What’s the best interpretation?",
    "options": [
      {
        "text": "The result is too close to call — the ranges overlap.",
        "correct": true,
        "feedback": "Correct. A’s range is 43–51%; B’s is 41–49%. They overlap. (bw: Margin of error gives a range.)"
      },
      {
        "text": "Candidate A is definitely winning.",
        "correct": false,
        "feedback": "A’s support could be as low as 43%."
      },
      {
        "text": "The poll is useless.",
        "correct": false,
        "feedback": "The poll is informative — it shows a close race."
      },
      {
        "text": "The margin is exactly 2%.",
        "correct": false,
        "feedback": "The margin applies to each candidate’s estimate, not the gap."
      }
    ]
  },
  {
    "itemId": "d17",
    "order": 17,
    "cluster": "bias",
    "clusterName": "Bias in sampling and surveys",
    "tier": "T",
    "question": "A survey asks “How much do you worry about your health?” in a hospital waiting room. What’s the main source of bias?",
    "options": [
      {
        "text": "The location — hospital patients tend to worry more about health than the general population.",
        "correct": true,
        "feedback": "Correct. The setting selects a specific subgroup. (bw: Location bias.)"
      },
      {
        "text": "The question is too personal.",
        "correct": false,
        "feedback": "The question being personal isn’t the primary issue here — the sample (hospital patients) is the source of bias."
      },
      {
        "text": "The survey is too short.",
        "correct": false,
        "feedback": "Length isn’t the issue."
      },
      {
        "text": "The hospital is too small.",
        "correct": false,
        "feedback": "Size isn’t the issue."
      }
    ]
  },
  {
    "itemId": "d18",
    "order": 18,
    "cluster": "critiqueClaims",
    "clusterName": "Critiquing statistical claims",
    "tier": "H",
    "question": "A study finds that towns with more libraries also have higher reading scores. What are the two main issues?",
    "options": [
      {
        "text": "The relationship is likely driven by a third factor (e.g. town wealth or education levels), and the data shows association, not proven causation.",
        "correct": true,
        "feedback": "Correct. Confounding variables and the association-causation distinction both apply."
      },
      {
        "text": "Libraries cause better reading — proven.",
        "correct": false,
        "feedback": "Causation isn’t proven."
      },
      {
        "text": "Reading causes more libraries — proven.",
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
  },
  {
    "itemId": "d19",
    "order": 19,
    "cluster": "dataCollection",
    "clusterName": "Data collection methods",
    "tier": "C",
    "question": "A student researching urban air quality finds two sources: (i) a government environmental agency report, (ii) a personal blog post with sensor readings. Both are secondary. Which is likely more reliable, and why?",
    "options": [
      {
        "text": "(i) — the agency uses standardised methods and is accountable for accuracy.",
        "correct": true,
        "feedback": "Correct. Standardised methods and accountability make agency data more reliable than an unvetted blog."
      },
      {
        "text": "(ii) — the blogger is more independent.",
        "correct": false,
        "feedback": "Independence isn’t the same as reliability — bloggers aren’t accountable in the way agencies are."
      },
      {
        "text": "Both are equally reliable.",
        "correct": false,
        "feedback": "Reliability varies with method and accountability."
      },
      {
        "text": "Neither — only primary data is useful.",
        "correct": false,
        "feedback": "Secondary data can be useful when assessed for quality."
      }
    ],
    "backward": "Assessing source reliability.",
    "forward": "Used whenever you choose between secondary sources."
  },
  {
    "itemId": "d20",
    "order": 20,
    "cluster": "fairQuestions",
    "clusterName": "Designing fair questions",
    "tier": "C",
    "question": "A researcher wants opinions on a new policy. He asks: “Don’t you think the new policy is a great idea?” What’s the flaw?",
    "options": [
      {
        "text": "The question is leading.",
        "correct": true,
        "feedback": "Correct. “Don’t you think… great?” leads toward agreement. (bw: Leading questions bias data.)"
      },
      {
        "text": "The question is double-barrelled.",
        "correct": false,
        "feedback": "It asks only one thing — not double-barrelled."
      },
      {
        "text": "The question is too long.",
        "correct": false,
        "feedback": "Length isn’t the issue."
      },
      {
        "text": "There’s no flaw.",
        "correct": false,
        "feedback": "The question has a clear flaw."
      }
    ]
  }
];

const recheckItems = [
  {
    "itemId": "r1",
    "order": 1,
    "cluster": "dataCollection",
    "clusterName": "Data collection methods",
    "question": "A student wants to compare her class’s screen time with national averages. Why might using national averages alone be insufficient?",
    "options": [
      {
        "text": "National averages may not reflect her specific class’s context.",
        "correct": true,
        "feedback": "Correct. Averages describe the whole nation, not her specific class."
      },
      {
        "text": "National averages are more reliable than any class-level data, so she should just use those.",
        "correct": false,
        "feedback": "Bigger samples aren’t automatically more relevant — the data must match the population you care about."
      },
      {
        "text": "Averages are always misleading.",
        "correct": false,
        "feedback": "Averages are useful summaries in the right context."
      },
      {
        "text": "Her class is too small to compare.",
        "correct": false,
        "feedback": "Class size doesn’t prevent comparison — relevance does."
      }
    ],
    "backward": "Data applicability.",
    "forward": "Used whenever you judge whether data matches your question."
  },
  {
    "itemId": "r2",
    "order": 2,
    "cluster": "fairQuestions",
    "clusterName": "Designing fair questions",
    "question": "Which of these is a fair question?",
    "options": [
      {
        "text": "“How many books did you read last month?”",
        "correct": true,
        "feedback": "Correct. Neutral and factual."
      },
      {
        "text": "“Don’t you think reading is important?”",
        "correct": false,
        "feedback": "Leading."
      },
      {
        "text": "“Why do you avoid reading?”",
        "correct": false,
        "feedback": "Presumes avoidance."
      },
      {
        "text": "“You read every day, right?”",
        "correct": false,
        "feedback": "Presumes daily reading."
      }
    ]
  },
  {
    "itemId": "r3",
    "order": 3,
    "cluster": "sampling",
    "clusterName": "Sampling (random, stratified)",
    "question": "A school has 600 students: 200 in each of Years 7, 8, 9. A stratified sample of 60 should include how many from Year 7?",
    "options": [
      {
        "text": "\\(20\\)",
        "correct": true,
        "feedback": "Correct. \\(200/600 = 1/3\\). \\(1/3 \\times 60 = 20\\). (bw: Stratified sampling.)"
      },
      {
        "text": "\\(60\\)",
        "correct": false,
        "feedback": "You gave the full sample size."
      },
      {
        "text": "\\(30\\)",
        "correct": false,
        "feedback": "You halved the sample size."
      },
      {
        "text": "\\(15\\)",
        "correct": false,
        "feedback": "You gave a quarter of the sample size."
      }
    ]
  },
  {
    "itemId": "r4",
    "order": 4,
    "cluster": "critiqueClaims",
    "clusterName": "Critiquing statistical claims",
    "question": "A claim says “9 out of 10 doctors recommend our product.” What question is most important to ask?",
    "options": [
      {
        "text": "How the doctors were chosen.",
        "correct": true,
        "feedback": "Correct. The sampling method determines credibility. (bw: Claims need context.)"
      },
      {
        "text": "Whether the doctors were paid by the company.",
        "correct": false,
        "feedback": "Payment could bias responses, but who was selected and how is the more fundamental question."
      },
      {
        "text": "How many doctors were surveyed.",
        "correct": false,
        "feedback": "Sample size matters, but the selection method is the more fundamental issue."
      },
      {
        "text": "When the survey was conducted.",
        "correct": false,
        "feedback": "Timing is secondary to the sampling method."
      }
    ]
  },
  {
    "itemId": "r5",
    "order": 5,
    "cluster": "bias",
    "clusterName": "Bias in sampling and surveys",
    "question": "A survey about eating habits is carried out at a fast-food restaurant. What’s the main source of bias?",
    "options": [
      {
        "text": "Fast-food customers may not represent the general population’s eating habits.",
        "correct": true,
        "feedback": "Correct. Location bias."
      },
      {
        "text": "The restaurant is too busy.",
        "correct": false,
        "feedback": "Being busy isn’t the source of bias."
      },
      {
        "text": "The survey is too short.",
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
    "itemId": "r6",
    "order": 6,
    "cluster": "mixed",
    "clusterName": "Mixed investigation scenarios (synthesis)",
    "question": "A study claims “our new teaching method improves grades by 20%,” but the comparison is between students who volunteered for the new method and students who didn’t. What are the two main issues?",
    "options": [
      {
        "text": "The groups are self-selected (volunteers may differ from non-volunteers), and the comparison doesn’t isolate the teaching method from other factors.",
        "correct": true,
        "feedback": "Correct. Self-selected groups and confounded comparisons both weaken the causal claim."
      },
      {
        "text": "The sample was random.",
        "correct": false,
        "feedback": "The sample wasn’t random — students chose their group."
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
    "backward": "Self-selection + confounding.",
    "forward": "Standard synthesis checks."
  },
  {
    "itemId": "r7",
    "order": 7,
    "cluster": "dataCollection",
    "clusterName": "Data collection methods",
    "question": "A student wants to know her classmates’ typical height. She can (i) measure each classmate with a tape measure, or (ii) ask each classmate to estimate their height. Which is more reliable, and why?",
    "options": [
      {
        "text": "(i) — direct measurement is more accurate than self-reported estimates.",
        "correct": true,
        "feedback": "Correct. Direct measurement avoids the errors that come from self-estimates."
      },
      {
        "text": "(ii) — estimates are quicker to collect.",
        "correct": false,
        "feedback": "Speed isn’t the criterion for reliability."
      },
      {
        "text": "(i) — but only if classmates are measured in private.",
        "correct": false,
        "feedback": "Privacy isn’t required for height measurement — accuracy comes from the method, not the setting."
      },
      {
        "text": "Both give equally reliable data.",
        "correct": false,
        "feedback": "Estimates and measurements differ substantially in reliability."
      }
    ],
    "backward": "Direct vs indirect measurement.",
    "forward": "Used whenever you choose a data collection method."
  },
  {
    "itemId": "r8",
    "order": 8,
    "cluster": "fairQuestions",
    "clusterName": "Designing fair questions",
    "question": "Which of these is double‑barrelled?",
    "options": [
      {
        "text": "“Do you like the new canteen and find it good value?”",
        "correct": true,
        "feedback": "Correct. Asks about liking AND value — two things at once."
      },
      {
        "text": "“How many hours do you study per week?”",
        "correct": false,
        "feedback": "Single-issue question."
      },
      {
        "text": "“What’s your favourite food?”",
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
    "cluster": "sampling",
    "clusterName": "Sampling (random, stratified)",
    "question": "A population of 800 is systematically sampled with interval 20. What is the sample size?",
    "options": [
      {
        "text": "\\(40\\)",
        "correct": true,
        "feedback": "Correct. \\(800 \\div 20 = 40\\). (bw: Systematic sampling.)"
      },
      {
        "text": "\\(800\\)",
        "correct": false,
        "feedback": "You gave the population size."
      },
      {
        "text": "\\(20\\)",
        "correct": false,
        "feedback": "You gave the interval."
      },
      {
        "text": "\\(60\\)",
        "correct": false,
        "feedback": "You used interval 13.33 instead of 20."
      }
    ]
  },
  {
    "itemId": "r10",
    "order": 10,
    "cluster": "bias",
    "clusterName": "Bias in sampling and surveys",
    "question": "A survey is sent to 400 people; only 30 reply. What’s the likely bias?",
    "options": [
      {
        "text": "Non-response bias — the 370 who didn’t reply may differ from the 30 who did.",
        "correct": true,
        "feedback": "Correct. Low response rates produce non-response bias."
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
        "text": "No bias — 30 is enough.",
        "correct": false,
        "feedback": "A 7.5% response rate is very low."
      }
    ]
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
    title: "Statistical Investigations — Speed & Strategy",
    subtitle: "Grade 8 · Level 4 · Speed & Strategy · Olympiad Simulation",
    description: "A 25-minute timed diagnostic mixing Speed, Core, Challenge and Trap items across every statistical investigations cluster.",
    clusterNames: CLUSTER_NAMES,
    gateReviewHTML: "<p>You’ve completed the warm‑up. The next 20 questions are the <strong>Speed &amp; Strategy diagnostic</strong>. You have <strong>25 minutes</strong> in total — a timer starts when you enter. You can <strong>skip</strong> any question and come back later. Items are tiered: <strong>S</strong> (Speed) — answer fast, <strong>C</strong> (Core) — multi‑step, <strong>H</strong> (Challenge) — deeper synthesis, <strong>T</strong> (Trap) — read carefully. Move fast on easy items, slow down on traps, and don’t get stuck.</p>",
    timedSeconds: 1500
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

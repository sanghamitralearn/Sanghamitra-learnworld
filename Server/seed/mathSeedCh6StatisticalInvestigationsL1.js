// seed/mathSeedCh6StatisticalInvestigationsL1.js
//
// Populates math_chapters and math_questions with Grade 8, Chapter 6
// (Statistical Investigations), Level 1 — converted from the
// standalone diagnostic JSON ch6-statistical-investigations-level-1.json.
//
// Run with: node seed/mathSeedCh6StatisticalInvestigationsL1.js

const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-8";
const GRADE_LABEL = "Grade 8";
const CHAPTER_SLUG = "ch-6-statistical-investigations";
const CHAPTER_NAME = "Statistical Investigations";
const LEVEL = 1;

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
    "cluster": "dataCollection",
    "clusterName": "Data collection methods",
    "question": "Which of these is primary data?",
    "options": [
      {
        "text": "Data collected by you through a survey you designed.",
        "correct": true,
        "feedback": "Correct. Primary data is collected first-hand by the person or team using it."
      },
      {
        "text": "Data from a textbook.",
        "correct": false,
        "feedback": "Textbook data is secondary — someone else collected it."
      },
      {
        "text": "Data from a news article.",
        "correct": false,
        "feedback": "News articles report on data someone else gathered."
      },
      {
        "text": "Data from a government statistics website.",
        "correct": false,
        "feedback": "Government sites publish data collected by others — still secondary."
      }
    ],
    "retryHint": "Ask “did I collect this myself?”",
    "backward": "Data is either primary or secondary.",
    "forward": "Used whenever you plan an investigation."
  },
  {
    "itemId": "w2",
    "order": 2,
    "cluster": "sampling",
    "clusterName": "Sampling (random, stratified)",
    "question": "A random sample means:",
    "options": [
      {
        "text": "Every member of the population has an equal chance of being chosen.",
        "correct": true,
        "feedback": "Correct. Random sampling gives every member an equal chance."
      },
      {
        "text": "The sample is chosen by picking whoever is easiest to reach.",
        "correct": false,
        "feedback": "“Easiest to reach” is convenience sampling — not random."
      },
      {
        "text": "The sample is chosen by the researcher’s friends.",
        "correct": false,
        "feedback": "Choosing friends is a biased (non-random) sample."
      },
      {
        "text": "The sample is chosen alphabetically.",
        "correct": false,
        "feedback": "Alphabetical order is systematic but not random (the alphabet has no relation to the variable)."
      }
    ],
    "retryHint": "Randomness means equal chance, not “any old method.”",
    "backward": "Random ≠ arbitrary.",
    "forward": "Random samples reduce bias."
  },
  {
    "itemId": "w3",
    "order": 3,
    "cluster": "bias",
    "clusterName": "Bias in sampling and surveys",
    "question": "A survey about favourite sports is conducted outside a football stadium. Why is this biased?",
    "options": [
      {
        "text": "Only people interested in football are likely to be present.",
        "correct": true,
        "feedback": "Correct. The location restricts the sample to football fans — the sample isn’t representative of the wider population."
      },
      {
        "text": "The weather may have affected the answers.",
        "correct": false,
        "feedback": "Weather doesn’t necessarily bias sports preferences."
      },
      {
        "text": "The sample size is too small.",
        "correct": false,
        "feedback": "The problem isn’t size but who is present."
      },
      {
        "text": "Football is the most popular sport.",
        "correct": false,
        "feedback": "Whether football is popular is irrelevant; the issue is the sample."
      }
    ],
    "retryHint": "Ask “who is likely to be here, and who is left out?”",
    "backward": "Bias means the sample doesn’t represent the population.",
    "forward": "Where you ask matters as much as what you ask."
  },
  {
    "itemId": "w4",
    "order": 4,
    "cluster": "fairQuestions",
    "clusterName": "Designing fair questions",
    "question": "Which survey question is fair (unbiased)?",
    "options": [
      {
        "text": "“How many hours per week do you spend on homework?”",
        "correct": true,
        "feedback": "Correct. This is neutral — it doesn’t lead the respondent."
      },
      {
        "text": "“Don’t you agree that too much homework is bad for students?”",
        "correct": false,
        "feedback": "“Don’t you agree…?” leads the respondent to say yes."
      },
      {
        "text": "“How much do you hate the new homework policy?”",
        "correct": false,
        "feedback": "“Hate” presumes a negative view."
      },
      {
        "text": "“Why is homework a waste of time?”",
        "correct": false,
        "feedback": "“Waste of time” presumes negative."
      }
    ],
    "retryHint": "A fair question doesn’t suggest the answer.",
    "backward": "Leading questions bias responses.",
    "forward": "Fair questions produce usable data."
  },
  {
    "itemId": "w5",
    "order": 5,
    "cluster": "critiqueClaims",
    "clusterName": "Critiquing statistical claims",
    "question": "A newspaper says: “9 out of 10 people prefer Brand X.” What information is missing to check this claim?",
    "options": [
      {
        "text": "How the people were chosen and how many were asked.",
        "correct": true,
        "feedback": "Correct. Without knowing the sampling method and sample size, the claim can’t be assessed."
      },
      {
        "text": "The colour of the packaging.",
        "correct": false,
        "feedback": "Packaging doesn’t validate a statistical claim."
      },
      {
        "text": "The price of Brand X.",
        "correct": false,
        "feedback": "Price isn’t relevant to whether the claim is credible."
      },
      {
        "text": "The name of the newspaper.",
        "correct": false,
        "feedback": "The name of the paper isn’t relevant — the method is."
      }
    ],
    "retryHint": "Ask “how was this data collected?”",
    "backward": "Statistical claims depend on how the data was gathered.",
    "forward": "Used whenever you evaluate a claim."
  },
  {
    "itemId": "w6",
    "order": 6,
    "cluster": "sampling",
    "clusterName": "Sampling (random, stratified)",
    "question": "A school has 600 students: 300 in Year 7, 200 in Year 8, 100 in Year 9. A stratified sample of 60 students should include how many from Year 9?",
    "options": [
      {
        "text": "\\(10\\)",
        "correct": true,
        "feedback": "Correct. Year 9 is \\(100/600 = 1/6\\) of the school. \\(1/6 \\times 60 = 10\\)."
      },
      {
        "text": "\\(30\\)",
        "correct": false,
        "feedback": "30 is the Year 7 share."
      },
      {
        "text": "\\(20\\)",
        "correct": false,
        "feedback": "20 is the Year 8 share."
      },
      {
        "text": "\\(5\\)",
        "correct": false,
        "feedback": "5 doesn’t match any proportion here."
      }
    ],
    "retryHint": "Find the fraction of the population in that subgroup, then apply it to the sample size.",
    "backward": "Stratified sampling keeps proportions.",
    "forward": "Used whenever subgroups differ in size."
  },
  {
    "itemId": "w7",
    "order": 7,
    "cluster": "dataCollection",
    "clusterName": "Data collection methods",
    "question": "A researcher wants to know the average height of students in a school. Which method is most appropriate?",
    "options": [
      {
        "text": "Measure a random sample of students.",
        "correct": true,
        "feedback": "Correct. A random sample avoids bias and gives data representative of the population."
      },
      {
        "text": "Ask students to estimate their own heights.",
        "correct": false,
        "feedback": "Estimates are less accurate than measurements."
      },
      {
        "text": "Measure only the basketball team.",
        "correct": false,
        "feedback": "The basketball team is unrepresentative (taller than average)."
      },
      {
        "text": "Use the heights of students in one class.",
        "correct": false,
        "feedback": "One class is unlikely to represent the school."
      }
    ],
    "retryHint": "Which method gives representative, accurate data?",
    "backward": "Method should match the question.",
    "forward": "Height can be measured directly, so do it."
  },
  {
    "itemId": "w8",
    "order": 8,
    "cluster": "mixed",
    "clusterName": "Mixed investigation scenarios (synthesis)",
    "question": "A survey of 20 people at a coffee shop found that 80% preferred coffee to tea. The headline reads: “80% of people prefer coffee.” What are the two main problems?",
    "options": [
      {
        "text": "The sample is small, and the location (a coffee shop) is biased.",
        "correct": true,
        "feedback": "Correct. A sample of 20 is too small to generalise, and sampling in a coffee shop over-represents coffee drinkers."
      },
      {
        "text": "The question was unclear, and the sample was random.",
        "correct": false,
        "feedback": "The question was clearly about coffee vs tea; the sample was not random."
      },
      {
        "text": "The sample was large enough and the location was neutral.",
        "correct": false,
        "feedback": "The sample is not large, and the location is biased."
      },
      {
        "text": "The headline is accurate.",
        "correct": false,
        "feedback": "The headline generalises far beyond the sample."
      }
    ],
    "retryHint": "Check both the sample size and the sample location.",
    "backward": "Both sample size and sample location matter.",
    "forward": "This is the standard structure for evaluating any survey claim."
  }
];

const diagnosticItems = [
  {
    "itemId": "d1",
    "order": 1,
    "cluster": "dataCollection",
    "clusterName": "Data collection methods",
    "question": "Which of these is secondary data?",
    "options": [
      {
        "text": "Average rainfall figures published by the Met Office.",
        "correct": true,
        "feedback": "Correct. Data published by another organisation is secondary."
      },
      {
        "text": "Measurements you take in a science experiment.",
        "correct": false,
        "feedback": "Data from your own experiment is primary."
      },
      {
        "text": "Responses to a survey you designed.",
        "correct": false,
        "feedback": "Survey responses you collect are primary."
      },
      {
        "text": "Counts you make of cars passing your house.",
        "correct": false,
        "feedback": "Counts you make are primary."
      }
    ],
    "backward": "Primary = collected by you; secondary = collected by someone else.",
    "forward": "Both have uses, but primary is more controllable."
  },
  {
    "itemId": "d2",
    "order": 2,
    "cluster": "fairQuestions",
    "clusterName": "Designing fair questions",
    "question": "Which question is most likely to produce biased responses?",
    "options": [
      {
        "text": "“How often do you exercise each week?”",
        "correct": false,
        "feedback": "This is a neutral question — no leading or presumptive wording."
      },
      {
        "text": "“How often do you fail to exercise each week?”",
        "correct": true,
        "feedback": "Correct. “Fail to exercise” presumes the respondent doesn’t exercise enough, which pushes them toward defensive or apologetic answers."
      },
      {
        "text": "“How many minutes did you exercise yesterday?”",
        "correct": false,
        "feedback": "This is a neutral factual question."
      },
      {
        "text": "“On how many days last week did you exercise?”",
        "correct": false,
        "feedback": "This is a neutral factual question."
      }
    ],
    "backward": "Leading/presumptive wording biases responses.",
    "forward": "Neutral wording produces usable data."
  },
  {
    "itemId": "d3",
    "order": 3,
    "cluster": "sampling",
    "clusterName": "Sampling (random, stratified)",
    "question": "A school has 400 students split evenly across 4 year groups. A stratified sample of 40 students should include how many from each year group?",
    "options": [
      {
        "text": "\\(10\\)",
        "correct": true,
        "feedback": "Correct. Each year group is \\(1/4\\) of the school, so \\(1/4 \\times 40 = 10\\). (bw: Stratified sampling preserves proportions.)"
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
        "feedback": "You gave the number of year groups."
      }
    ]
  },
  {
    "itemId": "d4",
    "order": 4,
    "cluster": "critiqueClaims",
    "clusterName": "Critiquing statistical claims",
    "question": "A website claims: “Our survey of readers shows that 95% of people love our magazine.” What is the most important information missing to evaluate this claim?",
    "options": [
      {
        "text": "Who else was surveyed, since only readers were sampled.",
        "correct": true,
        "feedback": "Correct. The sample was restricted to readers, so the claim generalises far beyond who was actually asked."
      },
      {
        "text": "The colour of the magazine.",
        "correct": false,
        "feedback": "Colour doesn’t affect the claim’s validity."
      },
      {
        "text": "The editor’s name.",
        "correct": false,
        "feedback": "The editor’s name isn’t relevant."
      },
      {
        "text": "The price of the magazine.",
        "correct": false,
        "feedback": "Price isn’t relevant to whether readers love the magazine."
      }
    ],
    "backward": "A claim’s validity depends on who was sampled.",
    "forward": "This is the standard check for any percentage claim."
  },
  {
    "itemId": "d5",
    "order": 5,
    "cluster": "bias",
    "clusterName": "Bias in sampling and surveys",
    "question": "A survey about breakfast habits is conducted at a café between 7 and 9 am. What is the main source of bias?",
    "options": [
      {
        "text": "People at a café in the morning are more likely to eat breakfast than the general population.",
        "correct": true,
        "feedback": "Correct. Sampling at a café in the morning over-represents breakfast eaters."
      },
      {
        "text": "The café is too small.",
        "correct": false,
        "feedback": "Café size isn’t the source of the bias."
      },
      {
        "text": "The survey is too long.",
        "correct": false,
        "feedback": "Survey length isn’t the source."
      },
      {
        "text": "The café only serves hot drinks.",
        "correct": false,
        "feedback": "The café’s menu isn’t the source of bias — who is present at that time is."
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
    "question": "A study finds that students who eat breakfast score higher in tests. The study was based on a group of volunteers. What are the two main issues?",
    "options": [
      {
        "text": "Self-selection bias (volunteers may differ from non-volunteers) and confusion between association and causation.",
        "correct": true,
        "feedback": "Correct. Volunteers may differ from the general population (self-selection bias), and an association doesn’t prove causation — other factors could be involved."
      },
      {
        "text": "The sample was too large and the question was leading.",
        "correct": false,
        "feedback": "The sample is not described as too large; the question is not leading."
      },
      {
        "text": "The study used random sampling and reported an association.",
        "correct": false,
        "feedback": "The study did not use random sampling — it used volunteers."
      },
      {
        "text": "The results prove that breakfast causes higher scores.",
        "correct": false,
        "feedback": "The study shows association, not proven causation."
      }
    ],
    "backward": "Two distinct issues combine here.",
    "forward": "Always check both the sample and the causal claim."
  },
  {
    "itemId": "d7",
    "order": 7,
    "cluster": "dataCollection",
    "clusterName": "Data collection methods",
    "question": "A student wants to find the most popular lunch choice in the school. Which method is best?",
    "options": [
      {
        "text": "Survey a random sample of students across all year groups.",
        "correct": true,
        "feedback": "Correct. A random, cross-year sample represents the school."
      },
      {
        "text": "Ask only the students in her own class.",
        "correct": false,
        "feedback": "One class doesn’t represent the whole school."
      },
      {
        "text": "Ask only her friends.",
        "correct": false,
        "feedback": "Friends form a biased sample."
      },
      {
        "text": "Ask the canteen staff what they think.",
        "correct": false,
        "feedback": "Canteen staff don’t know students’ preferences."
      }
    ],
    "backward": "Method should match the question.",
    "forward": "Representative samples produce reliable results."
  },
  {
    "itemId": "d8",
    "order": 8,
    "cluster": "fairQuestions",
    "clusterName": "Designing fair questions",
    "question": "Which question is least biased?",
    "options": [
      {
        "text": "“How many hours do you spend reading for pleasure each week?”",
        "correct": true,
        "feedback": "Correct. This is neutral and doesn’t presume any behaviour."
      },
      {
        "text": "“Why do you never read books?”",
        "correct": false,
        "feedback": "Presumes the respondent doesn’t read."
      },
      {
        "text": "“Don’t you think reading is a waste of time?”",
        "correct": false,
        "feedback": "“Don’t you think…” is leading."
      },
      {
        "text": "“Why do you prefer screens to books?”",
        "correct": false,
        "feedback": "Presumes a preference for screens."
      }
    ],
    "backward": "Fair questions don’t lead.",
    "forward": "Neutral wording produces usable data."
  },
  {
    "itemId": "d9",
    "order": 9,
    "cluster": "sampling",
    "clusterName": "Sampling (random, stratified)",
    "question": "A researcher wants a sample of 50 from a school with 1000 students. What is the best way to pick a simple random sample?",
    "options": [
      {
        "text": "Assign each student a unique number and use a random number generator to pick 50.",
        "correct": true,
        "feedback": "Correct. Numbering and random selection gives each student an equal chance."
      },
      {
        "text": "Pick the first 50 students who arrive at school.",
        "correct": false,
        "feedback": "The first 50 arrivals are not random (they may be a particular type)."
      },
      {
        "text": "Pick every 20th student on the register.",
        "correct": false,
        "feedback": "Every 20th on the register is systematic sampling — random only if the list has no relevant order."
      },
      {
        "text": "Ask teachers to choose 50 students they know well.",
        "correct": false,
        "feedback": "Teacher selection introduces bias (they know some students better)."
      }
    ],
    "backward": "Random sampling.",
    "forward": "Used whenever you need a truly random sample."
  },
  {
    "itemId": "d10",
    "order": 10,
    "cluster": "critiqueClaims",
    "clusterName": "Critiquing statistical claims",
    "question": "A poll of 200 people finds that 52% support a new policy. The margin of error is 5%. What is the most appropriate interpretation?",
    "options": [
      {
        "text": "The true support could plausibly be anywhere from 47% to 57%.",
        "correct": true,
        "feedback": "Correct. The margin of error gives a plausible range."
      },
      {
        "text": "Exactly 52% of the population supports the policy.",
        "correct": false,
        "feedback": "52% is the sample estimate, not the exact population figure."
      },
      {
        "text": "The policy is definitely supported by the majority.",
        "correct": false,
        "feedback": "With a 5% margin, the true value could be below 50%."
      },
      {
        "text": "The poll is meaningless because it’s not 100%.",
        "correct": false,
        "feedback": "A poll doesn’t need to be 100% to be useful."
      }
    ],
    "backward": "Sampling introduces uncertainty.",
    "forward": "Used whenever you interpret poll results."
  },
  {
    "itemId": "d11",
    "order": 11,
    "cluster": "bias",
    "clusterName": "Bias in sampling and surveys",
    "question": "A survey about internet access is conducted by calling landline phone numbers. What is the main bias?",
    "options": [
      {
        "text": "Households without a landline (often younger adults) are excluded.",
        "correct": true,
        "feedback": "Correct. Landline-only sampling excludes whole categories of households (e.g. mobile-only, often younger adults)."
      },
      {
        "text": "The survey is too long.",
        "correct": false,
        "feedback": "Length isn’t the issue."
      },
      {
        "text": "The question mentions the internet.",
        "correct": false,
        "feedback": "Mentioning the internet is necessary."
      },
      {
        "text": "The calls were made during the day.",
        "correct": false,
        "feedback": "Time-of-day bias is a secondary issue, not the main one here."
      }
    ],
    "backward": "Sampling frame limits who can be included.",
    "forward": "Any method that excludes a group introduces bias."
  },
  {
    "itemId": "d12",
    "order": 12,
    "cluster": "mixed",
    "clusterName": "Mixed investigation scenarios (synthesis)",
    "question": "A shop records umbrella sales for a year and finds sales peak in the rainy season. The shop only has one branch in a rainy city. What are the two main issues?",
    "options": [
      {
        "text": "The sample is not representative (one shop, one city), and the data shows association, not proven causation.",
        "correct": true,
        "feedback": "Correct. One shop in one city can’t represent all shops, and the association between rain and umbrella sales doesn’t on its own prove the causal mechanism."
      },
      {
        "text": "The sample was random and the question was biased.",
        "correct": false,
        "feedback": "The sample was not random; the question isn’t the issue."
      },
      {
        "text": "The data covers too long a period.",
        "correct": false,
        "feedback": "A year is a reasonable period."
      },
      {
        "text": "The conclusion is fully supported.",
        "correct": false,
        "feedback": "The conclusion is plausible but not fully supported."
      }
    ],
    "backward": "Representativeness plus the association/causation distinction.",
    "forward": "Both are standard checks for observational data."
  },
  {
    "itemId": "d13",
    "order": 13,
    "cluster": "dataCollection",
    "clusterName": "Data collection methods",
    "question": "A school wants to know how much time students spend on homework. Which is the most reliable method?",
    "options": [
      {
        "text": "Ask a random sample of students to record their homework time for a week.",
        "correct": true,
        "feedback": "Correct. A random sample plus real-time recording is more accurate than estimates or memories."
      },
      {
        "text": "Ask one class of students to record their homework time for a week.",
        "correct": false,
        "feedback": "One class is not representative of the whole school."
      },
      {
        "text": "Ask teachers to estimate their students’ homework time.",
        "correct": false,
        "feedback": "Teachers’ estimates are indirect and may not match what students actually do."
      },
      {
        "text": "Ask students to recall how much homework they did last year.",
        "correct": false,
        "feedback": "Memory over a year is unreliable."
      }
    ],
    "backward": "Method affects data quality.",
    "forward": "Self-reporting over a fixed period is a strong approach."
  },
  {
    "itemId": "d14",
    "order": 14,
    "cluster": "fairQuestions",
    "clusterName": "Designing fair questions",
    "question": "A student wants to find out how many hours per week her classmates study. Which question is best?",
    "options": [
      {
        "text": "“How many hours per week do you study?”",
        "correct": true,
        "feedback": "Correct. This is neutral and directly asks for the needed information."
      },
      {
        "text": "“Don’t you think you should study more?”",
        "correct": false,
        "feedback": "“Don’t you think…” leads to yes."
      },
      {
        "text": "“Why do you study so little?”",
        "correct": false,
        "feedback": "Presumes too little study."
      },
      {
        "text": "“You do study every day, right?”",
        "correct": false,
        "feedback": "Presumes daily study."
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
    "question": "A population has 60% girls and 40% boys. A stratified sample of 50 should contain:",
    "options": [
      {
        "text": "30 girls and 20 boys.",
        "correct": true,
        "feedback": "Correct. \\(60\\% \\times 50 = 30\\) girls, \\(40\\% \\times 50 = 20\\) boys."
      },
      {
        "text": "25 girls and 25 boys.",
        "correct": false,
        "feedback": "Equal split ignores the proportions."
      },
      {
        "text": "40 girls and 10 boys.",
        "correct": false,
        "feedback": "You used 80% instead of 60%."
      },
      {
        "text": "50 girls and 0 boys.",
        "correct": false,
        "feedback": "You included only girls."
      }
    ],
    "backward": "Stratified sampling preserves proportions.",
    "forward": "Used whenever the population has known subgroups."
  },
  {
    "itemId": "d16",
    "order": 16,
    "cluster": "critiqueClaims",
    "clusterName": "Critiquing statistical claims",
    "question": "A politician says: “Violent crime has fallen by 30% in our city.” What is the most important question to ask before accepting the claim?",
    "options": [
      {
        "text": "What was the starting level, and how was “violent crime” defined?",
        "correct": true,
        "feedback": "Correct. A 30% fall from a high level might still leave crime high; the definition of “violent crime” also matters."
      },
      {
        "text": "Whether the politician is popular.",
        "correct": false,
        "feedback": "Popularity has no bearing on the claim’s accuracy."
      },
      {
        "text": "What colour the campaign posters are.",
        "correct": false,
        "feedback": "Poster design is irrelevant."
      },
      {
        "text": "How long the speech was.",
        "correct": false,
        "feedback": "Speech length is irrelevant."
      }
    ],
    "backward": "Claims need context.",
    "forward": "Always ask “compared to what?”"
  },
  {
    "itemId": "d17",
    "order": 17,
    "cluster": "bias",
    "clusterName": "Bias in sampling and surveys",
    "question": "A radio station asks listeners to text in and vote on a topic. Why might the result be biased?",
    "options": [
      {
        "text": "Only listeners who feel strongly (or are listening at that moment) are likely to respond, so the sample is self-selected.",
        "correct": true,
        "feedback": "Correct. Voluntary response samples over-represent people with strong opinions."
      },
      {
        "text": "The radio audience is too small.",
        "correct": false,
        "feedback": "Audience size isn’t the issue."
      },
      {
        "text": "The topic is controversial.",
        "correct": false,
        "feedback": "Controversy isn’t the issue — self-selection is."
      },
      {
        "text": "The votes are counted electronically.",
        "correct": false,
        "feedback": "Counting method doesn’t bias the votes."
      }
    ],
    "backward": "Self-selection bias.",
    "forward": "Any opt-in method risks this."
  },
  {
    "itemId": "d18",
    "order": 18,
    "cluster": "mixed",
    "clusterName": "Mixed investigation scenarios (synthesis)",
    "question": "A survey asks: “Do you agree that homework should be banned to protect students’ wellbeing?” The survey is completed only by students who visit the library at lunchtime. What are the two main issues?",
    "options": [
      {
        "text": "The question is leading (it suggests homework harms wellbeing), and the sample (library visitors) isn’t representative of all students.",
        "correct": true,
        "feedback": "Correct. The phrase “to protect students’ wellbeing” pushes the respondent toward “yes,” and sampling only library visitors at lunchtime over-represents a particular subgroup."
      },
      {
        "text": "The sample was random and the question was fair.",
        "correct": false,
        "feedback": "The sample was not random (only library visitors were asked), and the question was not fair."
      },
      {
        "text": "The survey was too short.",
        "correct": false,
        "feedback": "Length isn’t one of the two issues here."
      },
      {
        "text": "The conclusion is proven.",
        "correct": false,
        "feedback": "The conclusion is not proven."
      }
    ],
    "backward": "Two distinct issues: question wording and sample bias.",
    "forward": "Always check both when evaluating a survey."
  },
  {
    "itemId": "d19",
    "order": 19,
    "cluster": "dataCollection",
    "clusterName": "Data collection methods",
    "question": "A student wants to find out how many pets each classmate owns. Which is the best method?",
    "options": [
      {
        "text": "Ask each classmate directly.",
        "correct": true,
        "feedback": "Correct. Direct questioning of the target group is the most accurate."
      },
      {
        "text": "Ask one classmate who knows everyone.",
        "correct": false,
        "feedback": "One person may not know accurately."
      },
      {
        "text": "Count pets she sees in her neighbourhood.",
        "correct": false,
        "feedback": "Neighbourhood pets ≠ classmates’ pets."
      },
      {
        "text": "Estimate based on her own family.",
        "correct": false,
        "feedback": "Her own family isn’t representative."
      }
    ],
    "backward": "Method matches the question.",
    "forward": "When possible, go to the source."
  },
  {
    "itemId": "d20",
    "order": 20,
    "cluster": "fairQuestions",
    "clusterName": "Designing fair questions",
    "question": "Which question is best for a survey about students’ favourite school subject?",
    "options": [
      {
        "text": "“Which school subject do you enjoy most?”",
        "correct": true,
        "feedback": "Correct. Neutral, direct, no leading."
      },
      {
        "text": "“Don’t you love maths?”",
        "correct": false,
        "feedback": "Leading toward maths."
      },
      {
        "text": "“Why is PE the best subject?”",
        "correct": false,
        "feedback": "Presumes PE is best."
      },
      {
        "text": "“Which is the least boring subject?”",
        "correct": false,
        "feedback": "“Least boring” is a double-negative and awkward."
      }
    ],
    "backward": "Fair questions.",
    "forward": "Neutral wording produces usable data."
  },
  {
    "itemId": "d21",
    "order": 21,
    "cluster": "sampling",
    "clusterName": "Sampling (random, stratified)",
    "question": "A researcher selects a sample by choosing every 10th name from a list. What type of sample is this?",
    "options": [
      {
        "text": "Systematic sample.",
        "correct": true,
        "feedback": "Correct. Systematic sampling takes every nth item."
      },
      {
        "text": "Simple random sample.",
        "correct": false,
        "feedback": "Simple random requires a random selection method, not a fixed interval."
      },
      {
        "text": "Stratified sample.",
        "correct": false,
        "feedback": "Stratified requires dividing into subgroups first."
      },
      {
        "text": "Convenience sample.",
        "correct": false,
        "feedback": "Convenience uses whoever is easiest."
      }
    ],
    "backward": "A form of random-ish sampling when the list has no relevant order.",
    "forward": "Used for large, unordered populations."
  },
  {
    "itemId": "d22",
    "order": 22,
    "cluster": "critiqueClaims",
    "clusterName": "Critiquing statistical claims",
    "question": "A headline reads: “Number of students passing exams has doubled since 2010.” What could make this claim misleading?",
    "options": [
      {
        "text": "The total number of students taking the exams may also have doubled.",
        "correct": true,
        "feedback": "Correct. If the number of exam-takers doubled, the pass rate might be unchanged. Comparing raw numbers without normalising can mislead."
      },
      {
        "text": "The exams may have been harder in 2010.",
        "correct": false,
        "feedback": "Exam difficulty may differ, but the claim is about the number passing."
      },
      {
        "text": "The weather in 2010 was different.",
        "correct": false,
        "feedback": "Weather isn’t relevant."
      },
      {
        "text": "Students in 2010 studied differently.",
        "correct": false,
        "feedback": "Study habits are unrelated to the count comparison."
      }
    ],
    "backward": "Claims need context — raw counts vs rates.",
    "forward": "Always ask “out of how many?”"
  },
  {
    "itemId": "d23",
    "order": 23,
    "cluster": "bias",
    "clusterName": "Bias in sampling and surveys",
    "question": "A survey about healthy eating is distributed at a gym. Which is the main source of bias?",
    "options": [
      {
        "text": "Gym users are more likely to be health-conscious than the general population.",
        "correct": true,
        "feedback": "Correct. Sampling at a gym over-represents a health-conscious subgroup."
      },
      {
        "text": "The survey is too long.",
        "correct": false,
        "feedback": "Length isn’t the main issue."
      },
      {
        "text": "The gym is too small.",
        "correct": false,
        "feedback": "Gym size isn’t the issue."
      },
      {
        "text": "The survey was on paper.",
        "correct": false,
        "feedback": "The medium doesn’t create this bias."
      }
    ],
    "backward": "Location can bias a sample.",
    "forward": "Always ask who is likely to be present."
  },
  {
    "itemId": "d24",
    "order": 24,
    "cluster": "mixed",
    "clusterName": "Mixed investigation scenarios (synthesis)",
    "question": "A report says: “Town A has the most road accidents in the country.” Town A is also the largest town in the country. What are the two main issues?",
    "options": [
      {
        "text": "Raw counts favour larger towns (rates per person would be fairer), and the source of the data isn’t given.",
        "correct": true,
        "feedback": "Correct. Raw counts are not comparable across towns of different sizes — the report should use rates. And without knowing how the data was gathered, the claim can’t be verified."
      },
      {
        "text": "The sample was random.",
        "correct": false,
        "feedback": "The sample was not described as random."
      },
      {
        "text": "The report is proven.",
        "correct": false,
        "feedback": "The claim is not proven — both issues above weaken it."
      },
      {
        "text": "The data is invalid.",
        "correct": false,
        "feedback": "The data may be valid; the interpretation and source aren’t yet supported."
      }
    ],
    "backward": "Two distinct issues: normalisation and data provenance.",
    "forward": "Both must be resolved before the headline means anything."
  }
];

const recheckItems = [
  {
    "itemId": "r1",
    "order": 1,
    "cluster": "dataCollection",
    "clusterName": "Data collection methods",
    "question": "Which of these is primary data?",
    "options": [
      {
        "text": "The temperature you record each day for a week.",
        "correct": true,
        "feedback": "Correct. You collected it directly. (bw: Primary = collected by you.)"
      },
      {
        "text": "The average temperature published by the Met Office.",
        "correct": false,
        "feedback": "Met Office data is published by another organisation — secondary."
      },
      {
        "text": "The temperature shown in a news article.",
        "correct": false,
        "feedback": "A news article reports on data collected by others — secondary."
      },
      {
        "text": "A friend’s record of temperatures from last year.",
        "correct": false,
        "feedback": "A friend’s record is not collected by you — secondary."
      }
    ]
  },
  {
    "itemId": "r2",
    "order": 2,
    "cluster": "dataCollection",
    "clusterName": "Data collection methods",
    "question": "A student wants to find the most popular pet in the school. Which method is best?",
    "options": [
      {
        "text": "Survey a random sample across the school.",
        "correct": true,
        "feedback": "Correct. A random sample represents the school. (bw: Method matches question.)"
      },
      {
        "text": "Ask her own class.",
        "correct": false,
        "feedback": "One class is not representative."
      },
      {
        "text": "Ask the local pet shop.",
        "correct": false,
        "feedback": "Pet shops don’t know students’ preferences."
      },
      {
        "text": "Estimate from her own pet.",
        "correct": false,
        "feedback": "One person isn’t a sample."
      }
    ]
  },
  {
    "itemId": "r3",
    "order": 3,
    "cluster": "sampling",
    "clusterName": "Sampling (random, stratified)",
    "question": "What does a simple random sample guarantee?",
    "options": [
      {
        "text": "Every member of the population has an equal chance of being chosen.",
        "correct": true,
        "feedback": "Correct. Equal chance is the defining property. (bw: Random sampling reduces bias.)"
      },
      {
        "text": "The sample is small.",
        "correct": false,
        "feedback": "Sample size is separate from randomness."
      },
      {
        "text": "The sample is quick to collect.",
        "correct": false,
        "feedback": "Speed isn’t the point."
      },
      {
        "text": "The results are always accurate.",
        "correct": false,
        "feedback": "No sample guarantees perfect accuracy."
      }
    ]
  },
  {
    "itemId": "r4",
    "order": 4,
    "cluster": "sampling",
    "clusterName": "Sampling (random, stratified)",
    "question": "A school has 200 boys and 300 girls. A stratified sample of 50 should include how many girls?",
    "options": [
      {
        "text": "\\(30\\)",
        "correct": true,
        "feedback": "Correct. Girls are \\(300/500 = 3/5\\). \\(3/5 \\times 50 = 30\\). (bw: Stratified sampling preserves proportions.)"
      },
      {
        "text": "\\(25\\)",
        "correct": false,
        "feedback": "25 is the equal split, ignoring proportions."
      },
      {
        "text": "\\(20\\)",
        "correct": false,
        "feedback": "20 is the boys’ share."
      },
      {
        "text": "\\(40\\)",
        "correct": false,
        "feedback": "40 is \\(4/5\\), not \\(3/5\\)."
      }
    ]
  },
  {
    "itemId": "r5",
    "order": 5,
    "cluster": "bias",
    "clusterName": "Bias in sampling and surveys",
    "question": "A survey about public transport is conducted at a bus station. Why might the results be biased?",
    "options": [
      {
        "text": "People at a bus station are more likely to use public transport than the general population.",
        "correct": true,
        "feedback": "Correct. The location over-represents bus users. (bw: Location can bias samples.)"
      },
      {
        "text": "The station is crowded.",
        "correct": false,
        "feedback": "Crowding isn’t the main source of bias here."
      },
      {
        "text": "The survey is on a weekday.",
        "correct": false,
        "feedback": "Weekday timing isn’t the main source here."
      },
      {
        "text": "The buses are late.",
        "correct": false,
        "feedback": "Late buses aren’t the source of sampling bias."
      }
    ]
  },
  {
    "itemId": "r6",
    "order": 6,
    "cluster": "bias",
    "clusterName": "Bias in sampling and surveys",
    "question": "Which scenario is most likely to produce a biased sample?",
    "options": [
      {
        "text": "Surveying members of a gym about their exercise habits.",
        "correct": true,
        "feedback": "Correct. Gym members are a biased subgroup for exercise habits. (bw: Sampling frame matters.)"
      },
      {
        "text": "Surveying a random selection from the school register.",
        "correct": false,
        "feedback": "Random selection from the register is far less biased."
      },
      {
        "text": "Picking names from a hat.",
        "correct": false,
        "feedback": "Picking names from a hat is random and much less biased."
      },
      {
        "text": "Using a random number generator.",
        "correct": false,
        "feedback": "A random number generator is random and much less biased."
      }
    ]
  },
  {
    "itemId": "r7",
    "order": 7,
    "cluster": "fairQuestions",
    "clusterName": "Designing fair questions",
    "question": "Which survey question is fair (unbiased)?",
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
        "text": "“You do read every day, don’t you?”",
        "correct": false,
        "feedback": "Presumes daily reading."
      }
    ]
  },
  {
    "itemId": "r8",
    "order": 8,
    "cluster": "fairQuestions",
    "clusterName": "Designing fair questions",
    "question": "A survey asks: “Do you agree that the canteen should serve healthier food to help students concentrate better?” Why is this question biased?",
    "options": [
      {
        "text": "The phrase “to help students concentrate better” pushes the respondent toward “yes.”",
        "correct": true,
        "feedback": "Correct. Adding a persuasive reason is a classic source of bias."
      },
      {
        "text": "The canteen is mentioned.",
        "correct": false,
        "feedback": "Mentioning the canteen is necessary to the topic."
      },
      {
        "text": "The question is too short.",
        "correct": false,
        "feedback": "Length isn’t the problem."
      },
      {
        "text": "The question mentions students.",
        "correct": false,
        "feedback": "Mentioning students is unavoidable."
      }
    ]
  },
  {
    "itemId": "r9",
    "order": 9,
    "cluster": "critiqueClaims",
    "clusterName": "Critiquing statistical claims",
    "question": "A newspaper reports: “Average salary in our town is $85,000.” What could make this misleading?",
    "options": [
      {
        "text": "A small number of very high earners can pull the mean up.",
        "correct": true,
        "feedback": "Correct. The mean is sensitive to extreme values — the median might be much lower."
      },
      {
        "text": "The town is too small.",
        "correct": false,
        "feedback": "Town size isn’t the issue here."
      },
      {
        "text": "The question was leading.",
        "correct": false,
        "feedback": "No survey question is mentioned in the claim."
      },
      {
        "text": "The survey was anonymous.",
        "correct": false,
        "feedback": "Anonymity isn’t relevant to the mean."
      }
    ],
    "backward": "Mean vs median.",
    "forward": "Used whenever an average is reported."
  },
  {
    "itemId": "r10",
    "order": 10,
    "cluster": "critiqueClaims",
    "clusterName": "Critiquing statistical claims",
    "question": "A study finds that cities with more ice-cream sales also have more drownings. Which conclusion is best supported?",
    "options": [
      {
        "text": "There is an association, but both may be caused by a third factor (e.g. hot weather).",
        "correct": true,
        "feedback": "Correct. Both vary with temperature — a classic confounding variable. (bw: Correlation ≠ causation.)"
      },
      {
        "text": "Ice cream causes drowning.",
        "correct": false,
        "feedback": "Implausible causal direction."
      },
      {
        "text": "Drowning causes ice-cream sales.",
        "correct": false,
        "feedback": "Implausible causal direction."
      },
      {
        "text": "There is no relationship.",
        "correct": false,
        "feedback": "An association does exist, but it’s not causal."
      }
    ]
  },
  {
    "itemId": "r11",
    "order": 11,
    "cluster": "mixed",
    "clusterName": "Mixed investigation scenarios (synthesis)",
    "question": "A school finds that students who eat school lunches score higher than those who bring packed lunches. The data was collected via a voluntary online survey. What are the two main issues?",
    "options": [
      {
        "text": "Self-selection bias (voluntary responses over-represent certain views) and confounding variables (e.g. socioeconomic status).",
        "correct": true,
        "feedback": "Correct. Voluntary surveys have self-selection bias, and lunch choice correlates with other factors that affect test scores."
      },
      {
        "text": "The sample was random and the question was fair.",
        "correct": false,
        "feedback": "The sample was not random."
      },
      {
        "text": "The data is invalid.",
        "correct": false,
        "feedback": "The data is valid; the interpretation isn’t yet supported."
      },
      {
        "text": "The conclusion is proven.",
        "correct": false,
        "feedback": "The conclusion is not proven."
      }
    ],
    "backward": "Two distinct issues.",
    "forward": "Both must be considered before drawing conclusions."
  },
  {
    "itemId": "r12",
    "order": 12,
    "cluster": "mixed",
    "clusterName": "Mixed investigation scenarios (synthesis)",
    "question": "A survey of 10 people found that 70% preferred apples to oranges. The survey was conducted at an apple orchard. What are the two main issues?",
    "options": [
      {
        "text": "The sample is very small, and the location (an apple orchard) is biased.",
        "correct": true,
        "feedback": "Correct. Ten people is too few to generalise, and sampling at an apple orchard over-represents apple lovers."
      },
      {
        "text": "The sample was large and random.",
        "correct": false,
        "feedback": "The sample is small, not large, and the location is biased."
      },
      {
        "text": "The question was unclear.",
        "correct": false,
        "feedback": "The question (apples vs oranges) is clear."
      },
      {
        "text": "The conclusion is reliable.",
        "correct": false,
        "feedback": "The conclusion is not reliable."
      }
    ],
    "backward": "Sample size plus sample location.",
    "forward": "Both must be addressed before the result means anything."
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
    title: "Statistical Investigations — Core Fluency",
    subtitle: "Grade 8 · Level 1 · Core Fluency",
    description: "Primary vs secondary data, random and stratified sampling, bias in surveys, designing fair questions, and critiquing statistical claims — warm-up, diagnostic, and spaced recheck for core fluency.",
    clusterNames: CLUSTER_NAMES,
    gateReviewHTML: "<p>You’ve finished the warm‑up. The next 24 questions are the Core Fluency diagnostic for statistical investigations. You’ll identify primary and secondary data, choose sampling methods, spot bias, design fair questions, and critique statistical claims. Some questions ask you to combine two skills at once. Take your time and use the feedback to sharpen your reasoning.</p>",
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

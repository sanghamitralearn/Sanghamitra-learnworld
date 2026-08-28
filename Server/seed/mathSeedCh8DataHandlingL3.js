// seed/mathSeedCh8DataHandlingL3.js
//
// Populates math_chapters and math_questions with Grade 5, Chapter 8
// (Data Handling), Level 3 — converted from the standalone HTML file
// ch-8-data-handling-level-3.html.
//
// Run with: node seed/mathSeedCh8DataHandlingL3.js

const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-5";
const GRADE_LABEL = "Grade 5";
const CHAPTER_SLUG = "ch-8-data-handling";
const CHAPTER_NAME = "Data Handling";
const LEVEL = 3;

const CLUSTER_NAMES = {
  PICTO: "Pictographs",
  BAR: "Bar Graphs",
  LINE: "Line Graphs",
  TABLE: "Tables & Tally Charts",
  VOCAB: "Probability Vocabulary",
  SCALE: "Reading Scales & Keys"
};

const warmupItems = [
  {
    itemId: "w1",
    order: 1,
    cluster: "PICTO",
    clusterName: CLUSTER_NAMES.PICTO,
    skillId: "DHPICTO-07",
    question: "Key: 1 sun = 6 sunny days. April: 4 full suns + 1 half sun; May: 3 full suns + 1 half sun. How many more sunny days in April?",
    options: [
        { text: "6", correct: true, feedback: "April = 4×6 + 3 = 27; May = 3×6 + 3 = 21; diff = 6." },
        { text: "1", correct: false, feedback: "You only compared the symbol difference without using the key.", misconceptionId: "E-w1-a" },
        { text: "3", correct: false, feedback: "That's the value of the half sun.", misconceptionId: "E-w1-b" },
        { text: "27", correct: false, feedback: "That's April's total only.", misconceptionId: "E-w1-c" }
      ],
    retryHint: "Calculate sunny days for each month using the key. Then subtract.",
    misconceptions: [
      {
        misconceptionId: "E-w1-a",
        description: "Student subtracts the raw symbol counts (4.5-3.5=1) without first converting them to actual days using the key.",
        rootCause: "Key Conversion Skipped Before Comparing — compares symbol counts directly instead of the actual quantities they represent.",
        remediation: "Convert BOTH months to actual days first (April=4×6+3=27, May=3×6+3=21), THEN subtract: 27-21=6 — don't subtract the raw symbol counts."
      },
      {
        misconceptionId: "E-w1-b",
        description: "Student reports the half symbol's value (3) instead of computing the full difference between the two months' totals.",
        rootCause: "Partial Value Reported Instead of Full Difference — isolates one component instead of computing complete totals.",
        remediation: "3 is only the half sun's value — you must compute EACH month's FULL total (April=27, May=21) and subtract them: 27-21=6, not just the half symbol's value."
      },
      {
        misconceptionId: "E-w1-c",
        description: "Student reports April's total instead of computing the DIFFERENCE between the two months.",
        rootCause: "Final Subtraction Step Omitted — stops after computing one month's total, without comparing to the other.",
        remediation: "The question asks how many MORE sunny days April had — compute BOTH totals AND subtract them: 27-21=6, not just April's total (27)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Compute April's total", hint: "4×6 + 3 = 27." },
      { level: 2, description: "Compute May's total", hint: "3×6 + 3 = 21." },
      { level: 3, description: "Find the difference", hint: "27 - 21 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.3.MD.B.3"]
  },
  {
    itemId: "w2",
    order: 2,
    cluster: "BAR",
    clusterName: CLUSTER_NAMES.BAR,
    skillId: "DHBAR-08",
    question: "A bar graph shows Week 1: 120 visitors; Week 2: 80 visitors. What fraction of the total visitors came in Week 1? (Simplify your answer.)",
    options: [
        { text: "\\(\\frac{3}{5}\\)", correct: true, feedback: "Total = 200. 120/200 = 3/5." },
        { text: "\\(\\frac{2}{3}\\)", correct: false, feedback: "That's 120/180, not the correct total.", misconceptionId: "E-w2-a" },
        { text: "\\(\\frac{1}{2}\\)", correct: false, feedback: "120/200 is more than half.", misconceptionId: "E-w2-b" },
        { text: "\\(\\frac{2}{5}\\)", correct: false, feedback: "That's Week 2's fraction.", misconceptionId: "E-w2-c" }
      ],
    retryHint: "Add the two weeks to get the total. Write Week 1 over total and simplify.",
    misconceptions: [
      {
        misconceptionId: "E-w2-a",
        description: "Student uses the wrong total (180, perhaps computed incorrectly or using only part of the data) instead of the correct total of 200.",
        rootCause: "Total Miscomputed — the denominator used for the fraction is not the actual sum of both weeks.",
        remediation: "The total is the SUM of both weeks: 120+80=200, not 180 — use 200 as the denominator: 120/200=3/5."
      },
      {
        misconceptionId: "E-w2-b",
        description: "Student assumes the fraction is 1/2 without correctly computing and simplifying 120/200.",
        rootCause: "Simplification Skipped or Guessed — estimates a 'nice' fraction instead of computing the actual ratio.",
        remediation: "Actually divide: 120/200 — find the GCF of 120 and 200 (which is 40), then divide both by 40: 120÷40=3, 200÷40=5, giving 3/5, not 1/2."
      },
      {
        misconceptionId: "E-w2-c",
        description: "Student computes Week 2's fraction of the total (80/200=2/5) instead of Week 1's, mixing up which value goes in the numerator.",
        rootCause: "Wrong Category Used as Numerator — computes the fraction for the wrong category.",
        remediation: "The question asks for WEEK 1's fraction — put Week 1 (120) in the numerator, not Week 2 (80): 120/200=3/5, not 80/200=2/5."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the total", hint: "120 + 80 = 200." },
      { level: 2, description: "Write Week 1 over the total", hint: "120/200." },
      { level: 3, description: "Simplify using the GCF", hint: "The GCF of 120 and 200 is 40. Divide both by 40." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.NF.A.1"]
  },
  {
    itemId: "w3",
    order: 3,
    cluster: "LINE",
    clusterName: CLUSTER_NAMES.LINE,
    skillId: "DHLINE-06",
    question: "A line graph shows temperature at 8 AM: 18°C, 10 AM: 24°C, 12 PM: 20°C. Between which two times was the greatest change in temperature?",
    options: [
        { text: "8 AM to 10 AM", correct: true, feedback: "8−10: rise of 6°C; 10−12: drop of 4°C. Greatest change is 6°C." },
        { text: "10 AM to 12 PM", correct: false, feedback: "That's a drop of 4°C, smaller than the 6°C rise.", misconceptionId: "E-w3-a" },
        { text: "Both are equal", correct: false, feedback: "6°C and 4°C are not equal.", misconceptionId: "E-w3-b" },
        { text: "Cannot say", correct: false, feedback: "We can calculate both changes.", misconceptionId: "E-w3-c" }
      ],
    retryHint: "Calculate the difference (ignoring sign) for each interval. The larger difference is the greatest change.",
    misconceptions: [
      {
        misconceptionId: "E-w3-a",
        description: "Student picks the second interval (10 AM to 12 PM, a 4°C drop) without comparing its magnitude to the first interval's 6°C rise.",
        rootCause: "Intervals Not Actually Compared — selects an interval without computing and comparing the magnitude of both changes.",
        remediation: "Compute the SIZE of each change (ignoring direction): 8AM→10AM is 6°C, 10AM→12PM is 4°C — 6°C is LARGER, so the first interval is the answer, not the second."
      },
      {
        misconceptionId: "E-w3-b",
        description: "Student assumes both intervals change by the same amount without actually computing each difference.",
        rootCause: "Intervals Not Actually Compared — assumes equality instead of computing and comparing both changes.",
        remediation: "Compute each change separately: 24-18=6°C for the first interval, |20-24|=4°C for the second — these are NOT equal; 6°C is larger."
      },
      {
        misconceptionId: "E-w3-c",
        description: "Student assumes the changes cannot be determined, when the graph provides enough data to calculate both differences.",
        rootCause: "Available Data Underused — treats calculable data as insufficient.",
        remediation: "All three temperature readings are given (18, 24, 20), so both interval changes CAN be calculated: 6°C and 4°C — compare them to find the answer."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Compute the first interval's change", hint: "8 AM to 10 AM: 24 - 18 = 6°C rise." },
      { level: 2, description: "Compute the second interval's change", hint: "10 AM to 12 PM: 24 - 20 = 4°C drop." },
      { level: 3, description: "Compare the sizes of both changes", hint: "Which change is bigger, 6°C or 4°C — regardless of direction?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "w4",
    order: 4,
    cluster: "TABLE",
    clusterName: CLUSTER_NAMES.TABLE,
    skillId: "DHTABLE-05",
    question: "A table shows three test scores: 25, 35, and 30. What is the average score?",
    options: [
        { text: "30", correct: true, feedback: "(25 + 35 + 30) ÷ 3 = 90 ÷ 3 = 30." },
        { text: "90", correct: false, feedback: "That's the total, not the average.", misconceptionId: "E-w4-a" },
        { text: "35", correct: false, feedback: "That's the highest score, not the average.", misconceptionId: "E-w4-b" },
        { text: "25", correct: false, feedback: "That's the lowest score.", misconceptionId: "E-w4-c" }
      ],
    retryHint: "Add the three numbers, then divide by 3.",
    misconceptions: [
      {
        misconceptionId: "E-w4-a",
        description: "Student computes the total (sum) but forgets the final division step needed to find the average.",
        rootCause: "Division Step Omitted — stops after summing, without dividing by the number of values.",
        remediation: "The average requires dividing the total by the NUMBER of scores — 90 ÷ 3 = 30, don't stop at the total (90) itself."
      },
      {
        misconceptionId: "E-w4-b",
        description: "Student reports the highest score instead of computing the average across all three scores.",
        rootCause: "Individual Value Reported Instead of Average — confuses the maximum with the requested summary statistic.",
        remediation: "The average must use ALL THREE scores, not just the highest — add all three (25+35+30=90) then divide by 3: 90÷3=30, not just 35."
      },
      {
        misconceptionId: "E-w4-c",
        description: "Student reports the lowest score instead of computing the average across all three scores.",
        rootCause: "Individual Value Reported Instead of Average — confuses the minimum with the requested summary statistic.",
        remediation: "The average must use ALL THREE scores, not just the lowest — add all three (25+35+30=90) then divide by 3: 90÷3=30, not just 25."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Add all three values", hint: "25 + 35 + 30 = 90." },
      { level: 2, description: "Count the number of scores", hint: "There are 3 scores." },
      { level: 3, description: "Divide the total by the count", hint: "90 ÷ 3 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.SP.B.5C"]
  },
  {
    itemId: "w5",
    order: 5,
    cluster: "VOCAB",
    clusterName: CLUSTER_NAMES.VOCAB,
    skillId: "DHVOCAB-03",
    question: "A bag has 5 green marbles and 5 other marbles (red and blue). Picking a green marble is:",
    options: [
        { text: "Equally likely", correct: true, feedback: "There are 5 green and 5 non‑green. The chance is 5 out of 10 = 1/2." },
        { text: "Likely", correct: false, feedback: "It's exactly half, so equally likely, not more likely.", misconceptionId: "E-w5-a" },
        { text: "Unlikely", correct: false, feedback: "Half is not unlikely.", misconceptionId: "E-w5-b" },
        { text: "Certain", correct: false, feedback: "It could be non‑green.", misconceptionId: "E-w5-c" }
      ],
    retryHint: "Find the total marbles. If green is exactly half, it's equally likely.",
    misconceptions: [
      {
        misconceptionId: "E-w5-a",
        description: "Student assumes green is 'more likely' since 5 marbles is a solid share, without noticing the other 5 marbles make it an exact 50/50 split.",
        rootCause: "Counts Not Actually Compared — assumes one outcome is more probable without checking the counts are equal.",
        remediation: "Compare the counts: green=5, non-green=5 — they are EQUAL, so green is not more likely than non-green; the correct term is 'equally likely'."
      },
      {
        misconceptionId: "E-w5-b",
        description: "Student assumes green is 'unlikely' perhaps focusing on there being 'other' marbles too, without recognizing green makes up exactly half.",
        rootCause: "Fraction-of-Total Misjudged as Low Probability — treats a fair 1-in-2 share as automatically 'unlikely' without comparing it to the other share.",
        remediation: "Green makes up 5 out of 10 marbles — exactly HALF — since it's neither more nor less than the other half, it's 'equally likely', not unlikely."
      },
      {
        misconceptionId: "E-w5-c",
        description: "Student assumes having 5 green marbles present means picking one is 'certain', ignoring that 5 non-green marbles are also present.",
        rootCause: "Vocabulary Precision Gap — confuses 'possible' with 'certain' (100% guaranteed).",
        remediation: "'Certain' means the ONLY possible outcome — but 5 non-green marbles could also be picked, so green is 'equally likely' (a fair 50/50 chance), not certain."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Count each group", hint: "5 green, 5 non-green, out of 10 total." },
      { level: 2, description: "Compare the two groups", hint: "Are the two counts the same or different?" },
      { level: 3, description: "Choose the matching vocabulary word", hint: "When two counts are exactly equal, each outcome is...?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.7.SP.C.5"]
  },
  {
    itemId: "w6",
    order: 6,
    cluster: "SCALE",
    clusterName: CLUSTER_NAMES.SCALE,
    skillId: "DHPICTO-08",
    question: "Pictograph key: 1 star = 8 points. The total points are 44. How many full stars and half stars are there?",
    options: [
        { text: "5 full + 1 half", correct: true, feedback: "5×8 = 40; half of 8 = 4; total = 44." },
        { text: "6 full", correct: false, feedback: "6×8 = 48, too many.", misconceptionId: "E-w6-a" },
        { text: "4 full + 1 half", correct: false, feedback: "4×8 + 4 = 36, too few.", misconceptionId: "E-w6-b" },
        { text: "5 full", correct: false, feedback: "5×8 = 40, not 44.", misconceptionId: "E-w6-c" }
      ],
    retryHint: "Divide the total by 8. The whole number part is the full stars. If the remainder is 4, that's one half star.",
    misconceptions: [
      {
        misconceptionId: "E-w6-a",
        description: "Student rounds the total UP to the next full-symbol multiple (6×8=48) instead of finding the exact combination of full and half symbols that gives 44.",
        rootCause: "Overshoots Target By Rounding Up — picks a full-symbol count that exceeds the actual total instead of matching it exactly.",
        remediation: "Test your answer: 6 full stars would be 6×8=48, but the total is only 44 — that's too many; try one fewer full star plus a half star: 5×8+4=44."
      },
      {
        misconceptionId: "E-w6-b",
        description: "Student undershoots by using one fewer full symbol than needed (4 full + half = 36) instead of matching the actual total of 44.",
        rootCause: "Undershoots Target — picks a full-symbol count below the actual total instead of matching it exactly.",
        remediation: "Test your answer: 4 full stars + 1 half = (4×8)+4=36, but the total is 44 — that's too few; try one more full star: 5×8+4=44."
      },
      {
        misconceptionId: "E-w6-c",
        description: "Student uses only full symbols (5×8=40) and forgets the leftover 4 points require a half symbol to reach the exact total of 44.",
        rootCause: "Remainder Not Converted to Half Symbol — stops at the whole-number quotient without accounting for the leftover amount.",
        remediation: "5 full stars gives 40, but the total is 44 — there's a REMAINDER of 4, which is exactly half of the key (8), so add one half star: 5 full + 1 half = 44."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Divide the total by the key", hint: "44 ÷ 8 = 5 remainder 4." },
      { level: 2, description: "Interpret the whole-number part", hint: "5 is the number of full stars." },
      { level: 3, description: "Interpret the remainder", hint: "The remainder (4) is half of 8 — so there's 1 half star." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.3.MD.B.3"]
  },
  {
    itemId: "w7",
    order: 7,
    cluster: "LINE",
    clusterName: CLUSTER_NAMES.LINE,
    skillId: "DHLINE-05",
    question: "A distance‑time graph shows 1 PM: 15 km, 3 PM: 45 km. What was the average speed between these times?",
    options: [
        { text: "15 km/h", correct: true, feedback: "Distance = 30 km, time = 2 h. 30 ÷ 2 = 15 km/h." },
        { text: "30 km/h", correct: false, feedback: "That's the total distance, not the speed.", misconceptionId: "E-w7-a" },
        { text: "45 km/h", correct: false, feedback: "That's the final distance.", misconceptionId: "E-w7-b" },
        { text: "10 km/h", correct: false, feedback: "Incorrect division.", misconceptionId: "E-w7-c" }
      ],
    retryHint: "Speed = (final distance − initial distance) ÷ time taken.",
    misconceptions: [
      {
        misconceptionId: "E-w7-a",
        description: "Student computes the change in distance (30 km) but forgets to divide by the elapsed time to get speed.",
        rootCause: "Division-by-Time Step Omitted — stops after finding the distance change, without dividing by the time interval.",
        remediation: "Speed requires dividing the distance CHANGE by the TIME taken — 30 km ÷ 2 hours = 15 km/h, don't stop at the distance change (30) itself."
      },
      {
        misconceptionId: "E-w7-b",
        description: "Student reports the final distance reading (45 km) instead of computing the speed from the change in distance over time.",
        rootCause: "Wrong Value Reported — confuses a raw distance reading with the computed speed.",
        remediation: "Speed is the CHANGE in distance divided by the change in time, not a raw reading — (45-15)÷2=15 km/h, not the final distance (45)."
      },
      {
        misconceptionId: "E-w7-c",
        description: "Student divides by the wrong number of hours (e.g., 3, matching the '3 PM' label) instead of the actual 2-hour elapsed time.",
        rootCause: "Elapsed Time Miscalculated — uses a clock number directly instead of computing the actual time difference.",
        remediation: "The elapsed time is 3 PM minus 1 PM = 2 hours, not 3 — compute 30 km ÷ 2 hours = 15 km/h, not 30÷3=10."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the change in distance", hint: "45 - 15 = 30 km." },
      { level: 2, description: "Find the elapsed time", hint: "3 PM - 1 PM = 2 hours." },
      { level: 3, description: "Divide distance by time", hint: "30 km ÷ 2 hours = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "w8",
    order: 8,
    cluster: "TABLE",
    clusterName: CLUSTER_NAMES.TABLE,
    skillId: "DHTABLE-06",
    question: "Two shops: Shop A sold 120, 150, 130 in three months. Shop B sold 110, 160, 140 in the same months. Which shop sold more in total, and by how much?",
    options: [
        { text: "B by 10", correct: true, feedback: "A total = 400; B total = 410. B sold 10 more." },
        { text: "A by 10", correct: false, feedback: "A total is 400, B is 410.", misconceptionId: "E-w8-a" },
        { text: "Both equal", correct: false, feedback: "400 ≠ 410.", misconceptionId: "E-w8-b" },
        { text: "B by 20", correct: false, feedback: "Incorrect addition.", misconceptionId: "E-w8-c" }
      ],
    retryHint: "Add each shop's sales separately, then compare the totals.",
    misconceptions: [
      {
        misconceptionId: "E-w8-a",
        description: "Student correctly computes both totals (A=400, B=410) but reverses who sold more, saying A instead of B.",
        rootCause: "Comparison Direction Reversed — computes the right numbers but names the wrong winner.",
        remediation: "Compare the two totals carefully: A=400, B=410 — since 410 > 400, Shop B sold MORE and by 10, not Shop A."
      },
      {
        misconceptionId: "E-w8-b",
        description: "Student assumes the two shops sold equal amounts without actually computing and comparing their totals.",
        rootCause: "Totals Not Actually Compared — assumes equality instead of calculating each shop's total.",
        remediation: "Compute each shop's total separately: A = 120+150+130 = 400, B = 110+160+140 = 410 — these are NOT equal; B sold 10 more."
      },
      {
        misconceptionId: "E-w8-c",
        description: "Student makes an arithmetic slip computing one or both totals, landing on a difference of 20 instead of the correct 10.",
        rootCause: "Computation Error — correct approach, but the addition or subtraction is carried out incorrectly.",
        remediation: "Recompute carefully: A = 120+150+130 = 400, B = 110+160+140 = 410, difference = 410-400 = 10, not 20."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Compute Shop A's total", hint: "120 + 150 + 130 = 400." },
      { level: 2, description: "Compute Shop B's total", hint: "110 + 160 + 140 = 410." },
      { level: 3, description: "Compare and find the difference", hint: "410 - 400 = ? Which shop sold more?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  }
];

const diagnosticItems = [
  {
    itemId: "d1",
    order: 1,
    cluster: "PICTO",
    clusterName: CLUSTER_NAMES.PICTO,
    skillId: "DHPICTO-08",
    question: "Key: 1 star = 10 points. The total points are 35. How many full stars and half stars are there?",
    options: [
        { text: "3 full + 1 half", correct: true, feedback: "3×10 = 30; half of 10 = 5; total = 35." },
        { text: "4 full", correct: false, feedback: "4×10 = 40, too many.", misconceptionId: "E-d1-a" },
        { text: "3 full", correct: false, feedback: "30 points, not 35.", misconceptionId: "E-d1-b" },
        { text: "2 full + 1 half", correct: false, feedback: "20+5 = 25, too few.", misconceptionId: "E-d1-c" }
      ],
    backward: "Divide total by the key value; the quotient is full symbols, and if the remainder equals half the key, you have a half symbol.",
    forward: "Working backwards from data to the pictograph representation builds inverse reasoning.",
    misconceptions: [
      {
        misconceptionId: "E-d1-a",
        description: "Student rounds the total UP to the next full-symbol multiple (4×10=40) instead of finding the exact combination of full and half symbols that gives 35.",
        rootCause: "Overshoots Target By Rounding Up — picks a full-symbol count that exceeds the actual total instead of matching it exactly.",
        remediation: "Test your answer: 4 full stars would be 4×10=40, but the total is only 35 — that's too many; try one fewer full star plus a half star: 3×10+5=35."
      },
      {
        misconceptionId: "E-d1-b",
        description: "Student uses only full symbols (3×10=30) and forgets the leftover 5 points require a half symbol to reach the exact total of 35.",
        rootCause: "Remainder Not Converted to Half Symbol — stops at the whole-number quotient without accounting for the leftover amount.",
        remediation: "3 full stars gives 30, but the total is 35 — there's a REMAINDER of 5, which is exactly half of the key (10), so add one half star: 3 full + 1 half = 35."
      },
      {
        misconceptionId: "E-d1-c",
        description: "Student undershoots by using one fewer full symbol than needed (2 full + half = 25) instead of matching the actual total of 35.",
        rootCause: "Undershoots Target — picks a full-symbol count below the actual total instead of matching it exactly.",
        remediation: "Test your answer: 2 full stars + 1 half = (2×10)+5=25, but the total is 35 — that's too few; try one more full star: 3×10+5=35."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Divide the total by the key", hint: "35 ÷ 10 = 3 remainder 5." },
      { level: 2, description: "Interpret the whole-number part", hint: "3 is the number of full stars." },
      { level: 3, description: "Interpret the remainder", hint: "The remainder (5) is half of 10 — so there's 1 half star." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.3.MD.B.3"]
  },
  {
    itemId: "d2",
    order: 2,
    cluster: "BAR",
    clusterName: CLUSTER_NAMES.BAR,
    skillId: "DHBAR-09",
    question: "A bar graph shows School A: 240 students; School B: 180 students. What is the ratio of School A's students to School B's students in simplest form?",
    options: [
        { text: "4 : 3", correct: true, feedback: "240:180 simplifies by dividing both by 60 → 4:3." },
        { text: "3 : 4", correct: false, feedback: "That's B to A, not A to B.", misconceptionId: "E-d2-a" },
        { text: "2 : 1", correct: false, feedback: "240 is not twice 180.", misconceptionId: "E-d2-b" },
        { text: "240 : 180", correct: false, feedback: "Not simplified.", misconceptionId: "E-d2-c" }
      ],
    backward: "Write the two numbers as a ratio and simplify by dividing both by their HCF (60).",
    forward: "Ratios are another way to compare data visually represented in bar graphs.",
    misconceptions: [
      {
        misconceptionId: "E-d2-a",
        description: "Student reverses the order of the ratio, writing School B to School A instead of School A to School B as asked.",
        rootCause: "Ratio Order Reversed — swaps the two quantities instead of matching the order the question specifies.",
        remediation: "The question asks for School A TO School B — A goes first: 240:180 simplifies to 4:3, not 3:4 (which would be B to A)."
      },
      {
        misconceptionId: "E-d2-b",
        description: "Student assumes 240 is exactly double 180, without checking the actual division.",
        rootCause: "Ratio Estimated Instead of Computed — guesses a 'nice' ratio instead of actually simplifying.",
        remediation: "Check: is 240 exactly 2×180? No, 2×180=360, not 240 — actually simplify by dividing both by their HCF (60): 240÷60=4, 180÷60=3, giving 4:3, not 2:1."
      },
      {
        misconceptionId: "E-d2-c",
        description: "Student writes the ratio correctly but leaves it unsimplified instead of reducing to simplest form.",
        rootCause: "Simplification Step Omitted — stops after writing the raw ratio without dividing by the HCF.",
        remediation: "240:180 must be SIMPLIFIED — divide both numbers by their HCF (60): 240÷60=4, 180÷60=3, giving 4:3, not the raw 240:180."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Write the ratio in the order asked", hint: "School A to School B: 240:180." },
      { level: 2, description: "Find the HCF of both numbers", hint: "The HCF of 240 and 180 is 60." },
      { level: 3, description: "Divide both terms by the HCF", hint: "240÷60 : 180÷60 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.RP.A.1"]
  },
  {
    itemId: "d3",
    order: 3,
    cluster: "LINE",
    clusterName: CLUSTER_NAMES.LINE,
    skillId: "DHLINE-07",
    question: "A line graph shows visitors: at 2 PM: 60, at 3 PM: 85, at 4 PM: 100. What was the total increase in visitors from 2 PM to 4 PM?",
    options: [
        { text: "40", correct: true, feedback: "100 − 60 = 40." },
        { text: "25", correct: false, feedback: "That's 85−60, not the total increase.", misconceptionId: "E-d3-a" },
        { text: "15", correct: false, feedback: "That's 100−85.", misconceptionId: "E-d3-b" },
        { text: "100", correct: false, feedback: "That's the final number, not the increase.", misconceptionId: "E-d3-c" }
      ],
    backward: "Subtract the starting value from the ending value.",
    forward: "Total change is often more important than step‑by‑step changes.",
    misconceptions: [
      {
        misconceptionId: "E-d3-a",
        description: "Student computes only the FIRST leg's increase (2 PM to 3 PM) instead of the TOTAL increase across the entire span (2 PM to 4 PM).",
        rootCause: "Partial Interval Used Instead of Full Span — computes one step of the journey instead of the overall change.",
        remediation: "The question asks for the TOTAL increase from 2 PM to 4 PM (the whole span), not just one leg — subtract the very first value from the very last: 100-60=40, not 85-60=25."
      },
      {
        misconceptionId: "E-d3-b",
        description: "Student computes only the SECOND leg's increase (3 PM to 4 PM) instead of the TOTAL increase across the entire span (2 PM to 4 PM).",
        rootCause: "Partial Interval Used Instead of Full Span — computes one step of the journey instead of the overall change.",
        remediation: "The question asks for the TOTAL increase from 2 PM to 4 PM (the whole span), not just the last leg — subtract the very first value from the very last: 100-60=40, not 100-85=15."
      },
      {
        misconceptionId: "E-d3-c",
        description: "Student reports the final reading (100) instead of computing the increase (the difference between start and end).",
        rootCause: "Wrong Value Reported — confuses the ending reading with the requested change.",
        remediation: "'Increase' means the CHANGE from start to end, not the ending value alone — subtract the starting value (60) from the ending value (100): 100-60=40."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the starting and ending values for the full span", hint: "2 PM = 60, 4 PM = 100 (ignore the middle reading for the total)." },
      { level: 2, description: "Recognise 'total increase' spans the whole interval", hint: "Subtract the very first value from the very last value." },
      { level: 3, description: "Compute", hint: "100 - 60 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d4",
    order: 4,
    cluster: "TABLE",
    clusterName: CLUSTER_NAMES.TABLE,
    skillId: "DHTABLE-07",
    question: "The table shows three test scores: 78, 85, and ?. The average is 80. Find the missing score.",
    options: [
        { text: "77", correct: true, feedback: "Total = 3×80 = 240. Sum of known = 78+85 = 163. Missing = 240−163 = 77." },
        { text: "80", correct: false, feedback: "That's the average, not the missing score.", misconceptionId: "E-d4-a" },
        { text: "85", correct: false, feedback: "That's one of the known scores.", misconceptionId: "E-d4-b" },
        { text: "75", correct: false, feedback: "240−163 = 77, not 75.", misconceptionId: "E-d4-c" }
      ],
    backward: "Multiply average by 3 to get total. Subtract the sum of the known scores.",
    forward: "Finding a missing value from an average is a key problem‑solving skill.",
    misconceptions: [
      {
        misconceptionId: "E-d4-a",
        description: "Student reports the average itself (80) as the missing score, without working backward to find what value actually produces that average.",
        rootCause: "Average Confused With Missing Value — assumes the missing score must equal the average.",
        remediation: "The missing score does NOT have to equal the average — work backward: total needed = 3×80=240, known scores sum to 163, so missing = 240-163=77, not 80."
      },
      {
        misconceptionId: "E-d4-b",
        description: "Student reports one of the already-known scores (85) instead of computing the actual missing value.",
        rootCause: "Known Value Reported Instead of Unknown — confuses a given score with the value being solved for.",
        remediation: "85 is already GIVEN as one of the three scores — you need to find the missing THIRD score: total=3×80=240, 240-78-85=77, not 85."
      },
      {
        misconceptionId: "E-d4-c",
        description: "Student makes an arithmetic slip in the final subtraction, landing on 75 instead of the correct 77.",
        rootCause: "Computation Error — correct approach, but the subtraction is carried out incorrectly.",
        remediation: "Recompute carefully: total = 3×80=240, known sum = 78+85=163, missing = 240-163=77, not 75."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the total needed for the average", hint: "3 × 80 = 240." },
      { level: 2, description: "Add the known scores", hint: "78 + 85 = 163." },
      { level: 3, description: "Subtract to find the missing score", hint: "240 - 163 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.SP.B.5C"]
  },
  {
    itemId: "d5",
    order: 5,
    cluster: "VOCAB",
    clusterName: CLUSTER_NAMES.VOCAB,
    skillId: "DHVOCAB-06",
    question: "You spin a spinner with 3 equal sections (red, blue, green) and roll a fair six‑sided die. What is the probability of getting red AND an even number? (Simplify your answer.)",
    options: [
        { text: "\\(\\frac{1}{6}\\)", correct: true, feedback: "Total outcomes = 3×6 = 18. Favourable = 1 (red) × 3 (even: 2,4,6) = 3. Probability = 3/18 = 1/6." },
        { text: "\\(\\frac{1}{3}\\)", correct: false, feedback: "That would be only the spinner part.", misconceptionId: "E-d5-a" },
        { text: "\\(\\frac{1}{2}\\)", correct: false, feedback: "That would be only the die part.", misconceptionId: "E-d5-b" },
        { text: "\\(\\frac{1}{9}\\)", correct: false, feedback: "Incorrect counting.", misconceptionId: "E-d5-c" }
      ],
    backward: "Multiply the number of outcomes for each event to get total possible outcomes. Count the favourable outcomes and simplify.",
    forward: "Combined probability is the foundation of more advanced probability.",
    misconceptions: [
      {
        misconceptionId: "E-d5-a",
        description: "Student computes only the spinner's probability (1/3 for red) and ignores the die's condition entirely.",
        rootCause: "One Event Ignored in Compound Probability — solves for only one of the two required conditions.",
        remediation: "The question requires BOTH conditions (red AND even) — multiply the outcome counts: 3 spinner sections × 6 die faces = 18 total, with 1×3=3 favourable: 3/18=1/6, not just the spinner's 1/3."
      },
      {
        misconceptionId: "E-d5-b",
        description: "Student computes only the die's probability (1/2 for even) and ignores the spinner's condition entirely.",
        rootCause: "One Event Ignored in Compound Probability — solves for only one of the two required conditions.",
        remediation: "The question requires BOTH conditions (red AND even) — multiply the outcome counts: 3 spinner sections × 6 die faces = 18 total, with 1×3=3 favourable: 3/18=1/6, not just the die's 1/2."
      },
      {
        misconceptionId: "E-d5-c",
        description: "Student miscounts either the total outcomes or the favourable outcomes when combining the two events, landing on an incorrect fraction.",
        rootCause: "Compound Sample Space Miscounted — errors in multiplying or counting the combined event space.",
        remediation: "Total outcomes = 3 (spinner) × 6 (die) = 18, not 9 — and favourable outcomes = 1 (red) × 3 (even numbers: 2,4,6) = 3, giving 3/18=1/6, not 1/9."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the total possible outcomes", hint: "3 spinner sections × 6 die faces = 18." },
      { level: 2, description: "Count the favourable outcomes", hint: "1 way to get red × 3 ways to get even (2, 4, 6) = 3." },
      { level: 3, description: "Write and simplify the fraction", hint: "3/18 simplifies to ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.7.SP.C.8"]
  },
  {
    itemId: "d6",
    order: 6,
    cluster: "SCALE",
    clusterName: CLUSTER_NAMES.SCALE,
    skillId: "DHSCALE-05",
    question: "A bar graph's y‑axis has marks at 0, 10, 20, 30, 40. Bar A ends exactly halfway between 20 and 30. Bar B ends at 35. What is the difference between Bar B and Bar A?",
    options: [
        { text: "10", correct: true, feedback: "Bar A = 25; Bar B = 35; diff = 10." },
        { text: "5", correct: false, feedback: "35 − 25 = 10, not 5.", misconceptionId: "E-d6-a" },
        { text: "15", correct: false, feedback: "Incorrect midpoint.", misconceptionId: "E-d6-b" },
        { text: "20", correct: false, feedback: "That's the difference between 35 and 15.", misconceptionId: "E-d6-c" }
      ],
    backward: "First read Bar A's value (midpoint). Then subtract from Bar B's value.",
    forward: "Combining scale reading with comparison is a practical graph skill.",
    misconceptions: [
      {
        misconceptionId: "E-d6-a",
        description: "Student makes an arithmetic slip in the final subtraction, landing on 5 instead of the correct 10.",
        rootCause: "Computation Error — correct approach (midpoint then subtract), but the final subtraction is carried out incorrectly.",
        remediation: "Recompute carefully: Bar A = (20+30)÷2=25, Bar B=35, difference = 35-25=10, not 5."
      },
      {
        misconceptionId: "E-d6-b",
        description: "Student misreads Bar A's midpoint value (e.g., using 20 or 30 directly instead of the true midpoint 25), leading to a wrong difference.",
        rootCause: "Midpoint Not Computed — reads a nearby gridline instead of averaging the two surrounding marks.",
        remediation: "Bar A is HALFWAY between 20 and 30, which is their average: (20+30)÷2=25, not 20 or 30 directly — then 35-25=10."
      },
      {
        misconceptionId: "E-d6-c",
        description: "Student subtracts from the wrong reference point (15, perhaps confusing it with a different gridline) instead of Bar A's actual value of 25.",
        rootCause: "Wrong Reference Value Used — substitutes an incorrect value for Bar A in the final subtraction.",
        remediation: "Bar A's actual value is 25 (the midpoint of 20 and 30), not 15 — the correct difference is 35-25=10, not 35-15=20."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find Bar A's value (the midpoint)", hint: "(20 + 30) ÷ 2 = 25." },
      { level: 2, description: "Identify Bar B's value", hint: "Bar B = 35." },
      { level: 3, description: "Subtract to find the difference", hint: "35 - 25 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d7",
    order: 7,
    cluster: "PICTO",
    clusterName: CLUSTER_NAMES.PICTO,
    skillId: "DHPICTO-09",
    question: "Key: 1 book = 4 books. Section P: 3 full + 1 half book. Section Q: 2 full books. What fraction of the total books are in Section Q? (Simplify.)",
    options: [
        { text: "\\(\\frac{4}{11}\\)", correct: true, feedback: "P = 12+2 = 14; Q = 8; total = 22. Fraction = 8/22 = 4/11." },
        { text: "\\(\\frac{4}{7}\\)", correct: false, feedback: "That's Q compared to P only (8/14).", misconceptionId: "E-d7-a" },
        { text: "\\(\\frac{2}{3}\\)", correct: false, feedback: "Incorrect.", misconceptionId: "E-d7-b" },
        { text: "\\(\\frac{8}{22}\\)", correct: false, feedback: "Not simplified.", misconceptionId: "E-d7-c" }
      ],
    backward: "Calculate each section's books using the key. Add to get total. Write Q's books over total and simplify.",
    forward: "Fractions from pictographs are used in reports and presentations.",
    misconceptions: [
      {
        misconceptionId: "E-d7-a",
        description: "Student writes Q's books over ONLY Section P's books (8/14) instead of over the TOTAL of both sections (8/22).",
        rootCause: "Wrong Denominator Used — compares Q only to P instead of to the combined total.",
        remediation: "The denominator must be the TOTAL of both sections (P+Q=14+8=22), not just Section P alone (14) — the fraction is 8/22=4/11, not 8/14=4/7."
      },
      {
        misconceptionId: "E-d7-b",
        description: "Student guesses or miscalculates the fraction, landing on 2/3 instead of correctly computing and simplifying 8/22.",
        rootCause: "Simplification Skipped or Guessed — estimates a fraction instead of computing the actual ratio.",
        remediation: "Actually divide: 8/22 — find the GCF of 8 and 22 (which is 2), then divide both by 2: 8÷2=4, 22÷2=11, giving 4/11, not 2/3."
      },
      {
        misconceptionId: "E-d7-c",
        description: "Student correctly computes the fraction 8/22 but leaves it unsimplified instead of reducing to lowest terms.",
        rootCause: "Simplification Step Omitted — stops after writing the raw fraction without dividing by the GCF.",
        remediation: "8/22 must be SIMPLIFIED — divide both by their GCF (2): 8÷2=4, 22÷2=11, giving 4/11, not the raw 8/22."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Compute Section P's total", hint: "3×4 + 2 = 14." },
      { level: 2, description: "Compute Section Q's total and the grand total", hint: "Q = 2×4 = 8; total = 14 + 8 = 22." },
      { level: 3, description: "Write and simplify the fraction", hint: "8/22 simplifies to ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.NF.A.1"]
  },
  {
    itemId: "d8",
    order: 8,
    cluster: "BAR",
    clusterName: CLUSTER_NAMES.BAR,
    skillId: "DHBAR-10",
    question: "In a bar graph, a bar representing 25% of the total is 15 cm tall. What is the total?",
    options: [
        { text: "60", correct: true, feedback: "If 25% = 15, then 100% = 15 × 4 = 60." },
        { text: "30", correct: false, feedback: "That would be 50%.", misconceptionId: "E-d8-a" },
        { text: "40", correct: false, feedback: "Incorrect.", misconceptionId: "E-d8-b" },
        { text: "15", correct: false, feedback: "That's the bar for 25%.", misconceptionId: "E-d8-c" }
      ],
    backward: "If 25% is 15, then 100% is 4 times 15.",
    forward: "Percentages are often shown in bar graphs and pie charts.",
    misconceptions: [
      {
        misconceptionId: "E-d8-a",
        description: "Student doubles the given value (15×2=30) as if 25% needed only doubling to reach 100%, confusing it with a 50%-to-100% relationship.",
        rootCause: "Percent Multiplier Miscalculated — uses the wrong multiplier to scale from the given percent to 100%.",
        remediation: "25% needs to be multiplied by 4 to reach 100% (since 4×25=100), not by 2 — 15×4=60, not 15×2=30 (doubling would work if the given percent were 50%)."
      },
      {
        misconceptionId: "E-d8-b",
        description: "Student computes an incorrect multiplier or adds an arbitrary amount to 15, landing on 40 instead of the correct 60.",
        rootCause: "Percent Multiplier Miscalculated — uses an incorrect scaling factor from 25% to 100%.",
        remediation: "Since 25% × 4 = 100%, multiply the given value by 4: 15×4=60, not 40."
      },
      {
        misconceptionId: "E-d8-c",
        description: "Student reports the given bar height (15, which represents only 25%) as if it were the total (100%).",
        rootCause: "Partial Value Confused With Whole — treats a percentage's raw value as the full total.",
        remediation: "15 cm represents only 25% of the total, NOT the whole total — scale it up: since 4×25%=100%, the total is 15×4=60, not 15."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recognise the percent relationship", hint: "25% needs to be multiplied by 4 to reach 100%." },
      { level: 2, description: "Apply the multiplier to the given value", hint: "15 × 4 = ?" },
      { level: 3, description: "Confirm", hint: "Does 25% of your answer equal 15?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.RP.A.3C"]
  },
  {
    itemId: "d9",
    order: 9,
    cluster: "LINE",
    clusterName: CLUSTER_NAMES.LINE,
    skillId: "DHLINE-08",
    question: "A line graph shows at 10 AM: 20°C; at 11 AM: 24°C. If the temperature continues to rise at the same rate, what will it be at 12 PM?",
    options: [
        { text: "28°C", correct: true, feedback: "Rise per hour = 4°C. 24 + 4 = 28°C." },
        { text: "24°C", correct: false, feedback: "No change assumed.", misconceptionId: "E-d9-a" },
        { text: "20°C", correct: false, feedback: "That's the earlier temperature.", misconceptionId: "E-d9-b" },
        { text: "30°C", correct: false, feedback: "Incorrect rise.", misconceptionId: "E-d9-c" }
      ],
    backward: "Find the rate of change per hour. Add that to the last known value.",
    forward: "Extrapolating from a line graph is used in forecasting.",
    misconceptions: [
      {
        misconceptionId: "E-d9-a",
        description: "Student assumes the temperature stays constant at 24°C, ignoring the question's statement that it 'continues to rise at the same rate'.",
        rootCause: "Trend Not Applied — ignores the stated rate of change and assumes no further change.",
        remediation: "The question says the temperature CONTINUES to rise at the same rate — find that rate (24-20=4°C/hour) and add it to the last reading: 24+4=28, not 24 (unchanged)."
      },
      {
        misconceptionId: "E-d9-b",
        description: "Student reports the earlier (10 AM) reading instead of extrapolating forward to 12 PM using the established rate.",
        rootCause: "Wrong Time Point Reported — reports a past reading instead of projecting forward.",
        remediation: "The question asks for the temperature at 12 PM, which is LATER than both given readings — extrapolate forward using the rate: 24+4=28, not the earlier 20°C reading."
      },
      {
        misconceptionId: "E-d9-c",
        description: "Student miscalculates the hourly rate of rise (e.g., using 6°C instead of 4°C), leading to an incorrect projection.",
        rootCause: "Rate of Change Miscalculated — computes the per-hour rise incorrectly.",
        remediation: "The rate is the DIFFERENCE between the two known readings: 24-20=4°C per hour, not 6 — projecting forward: 24+4=28, not 24+6=30."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the rate of change", hint: "24 - 20 = 4°C per hour." },
      { level: 2, description: "Identify the last known reading", hint: "11 AM = 24°C." },
      { level: 3, description: "Project forward one more hour", hint: "24 + 4 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d10",
    order: 10,
    cluster: "TABLE",
    clusterName: CLUSTER_NAMES.TABLE,
    skillId: "DHTABLE-06",
    question: "Table 1: June 45, July 50. Table 2: June 40, July 55. What is the difference between the total of Table 1 and the total of Table 2?",
    options: [
        { text: "0", correct: true, feedback: "Table 1 total = 95; Table 2 total = 95; difference = 0." },
        { text: "5", correct: false, feedback: "One month difference, not total.", misconceptionId: "E-d10-a" },
        { text: "10", correct: false, feedback: "Incorrect addition.", misconceptionId: "E-d10-b" },
        { text: "95", correct: false, feedback: "That's each total, not the difference.", misconceptionId: "E-d10-c" }
      ],
    backward: "Add each table separately, then subtract.",
    forward: "Comparing data from two sources is common in data analysis.",
    misconceptions: [
      {
        misconceptionId: "E-d10-a",
        description: "Student compares only one month's values between the two tables (e.g., June: 45 vs 40, diff=5) instead of comparing the FULL totals.",
        rootCause: "Partial Comparison Instead of Full Totals — compares a single month instead of summing each table first.",
        remediation: "Compute EACH table's FULL total first (Table1=45+50=95, Table2=40+55=95), THEN subtract: 95-95=0 — don't compare just one month's values (5)."
      },
      {
        misconceptionId: "E-d10-b",
        description: "Student makes an arithmetic slip while computing one or both table totals, landing on a nonzero difference instead of the correct 0.",
        rootCause: "Computation Error — correct approach, but the addition or subtraction is carried out incorrectly.",
        remediation: "Recompute carefully: Table1 = 45+50=95, Table2 = 40+55=95 — these are actually EQUAL, so the difference is 0, not 10."
      },
      {
        misconceptionId: "E-d10-c",
        description: "Student reports one table's total (95) instead of computing the DIFFERENCE between the two tables' totals.",
        rootCause: "Final Subtraction Step Omitted — stops after computing one table's total, without comparing to the other.",
        remediation: "The question asks for the DIFFERENCE between the two totals — compute BOTH (95 and 95) AND subtract them: 95-95=0, not just report one total (95)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Compute Table 1's total", hint: "45 + 50 = 95." },
      { level: 2, description: "Compute Table 2's total", hint: "40 + 55 = 95." },
      { level: 3, description: "Subtract to find the difference", hint: "95 - 95 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d11",
    order: 11,
    cluster: "VOCAB",
    clusterName: CLUSTER_NAMES.VOCAB,
    skillId: "DHVOCAB-03",
    question: "A spinner has 4 equal parts numbered 1, 2, 3, 4. Is the chance of getting an odd number equally likely, likely, unlikely, or certain?",
    options: [
        { text: "Equally likely", correct: true, feedback: "Odd numbers: 1,3 (2 outcomes). Even numbers: 2,4 (2 outcomes). Both equal." },
        { text: "Likely", correct: false, feedback: "It's not more likely than even.", misconceptionId: "E-d11-a" },
        { text: "Unlikely", correct: false, feedback: "2 out of 4 is not unlikely.", misconceptionId: "E-d11-b" },
        { text: "Certain", correct: false, feedback: "There are also even numbers.", misconceptionId: "E-d11-c" }
      ],
    backward: "Count the number of odd outcomes and compare with total outcomes.",
    forward: "Spinners are used in games of chance.",
    misconceptions: [
      {
        misconceptionId: "E-d11-a",
        description: "Student assumes odd is 'more likely' without comparing that odd (1,3) and even (2,4) have the exact same count.",
        rootCause: "Counts Not Actually Compared — assumes one outcome is more probable without checking the counts are equal.",
        remediation: "Compare the counts: odd={1,3}=2 numbers, even={2,4}=2 numbers — they are EQUAL, so odd is not more likely than even; the correct term is 'equally likely'."
      },
      {
        misconceptionId: "E-d11-b",
        description: "Student assumes odd is 'unlikely' since it's only 2 out of 4, without recognizing that 2 out of 4 is exactly half.",
        rootCause: "Fraction-of-Total Misjudged as Low Probability — treats a fair 1-in-2 share as automatically 'unlikely' without comparing it to the complementary share.",
        remediation: "2 out of 4 is exactly HALF — since odd and even each make up half, neither is more or less likely than the other; they are 'equally likely', not unlikely."
      },
      {
        misconceptionId: "E-d11-c",
        description: "Student assumes getting an odd number is 'certain', ignoring that even numbers (2, 4) are also possible outcomes.",
        rootCause: "Vocabulary Precision Gap — confuses 'possible' with 'certain' (100% guaranteed).",
        remediation: "'Certain' means the ONLY possible outcome — but 2 and 4 (even numbers) could also be spun, so odd is 'equally likely' among the four numbers, not certain."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "List the odd and even numbers", hint: "Odd: 1, 3. Even: 2, 4." },
      { level: 2, description: "Compare the two counts", hint: "Are the two counts the same or different?" },
      { level: 3, description: "Choose the matching vocabulary word", hint: "When two counts are exactly equal, each outcome is...?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.7.SP.C.5"]
  },
  {
    itemId: "d12",
    order: 12,
    cluster: "SCALE",
    clusterName: CLUSTER_NAMES.SCALE,
    skillId: "DHPICTO-02",
    question: "Key: 1 tree = 6 trees. There are 5 full tree symbols and 2 half tree symbols. How many trees in total?",
    options: [
        { text: "36", correct: true, feedback: "5×6 = 30; 2×3 = 6; total = 36." },
        { text: "30", correct: false, feedback: "Forgot the half symbols.", misconceptionId: "E-d12-a" },
        { text: "42", correct: false, feedback: "Counted half symbols as full (5+2=7, 7×6=42).", misconceptionId: "E-d12-b" },
        { text: "33", correct: false, feedback: "Incorrect half value.", misconceptionId: "E-d12-c" }
      ],
    backward: "Multiply full symbols by 6, half symbols by 3, then add.",
    forward: "Keys with half symbols require careful calculation.",
    misconceptions: [
      {
        misconceptionId: "E-d12-a",
        description: "Student computes the full symbols' total (5×6=30) but forgets to add the two half symbols' contribution.",
        rootCause: "Half-Symbol Contribution Omitted — stops after counting only the full symbols.",
        remediation: "There are ALSO 2 half symbols worth 3 trees each (half of 6) — add this to the full-symbol total: 30+(2×3)=36, not just 30."
      },
      {
        misconceptionId: "E-d12-b",
        description: "Student treats the 2 half symbols as if they were 2 full symbols, using 7 full symbols instead of 5 full plus 2 halves.",
        rootCause: "Half Symbols Miscounted as Full — doesn't distinguish half symbols' reduced value from full symbols' value.",
        remediation: "Each half symbol is worth HALF of 6 (which is 3), not the full 6 — total = (5×6)+(2×3)=36, not (7×6)=42."
      },
      {
        misconceptionId: "E-d12-c",
        description: "Student miscalculates the value of a single half symbol (using a value other than 3), leading to an incorrect total.",
        rootCause: "Half-Symbol Value Miscalculated — computes half of the key value incorrectly.",
        remediation: "Half of 6 is 3, not some other value — with 2 half symbols, that's 2×3=6; total = (5×6)+6=36, not 33."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Compute the full symbols' total", hint: "5 × 6 = 30." },
      { level: 2, description: "Compute both half symbols' total value", hint: "2 half symbols × 3 (half of 6) = 6." },
      { level: 3, description: "Add them together", hint: "30 + 6 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.3.MD.B.3"]
  },
  {
    itemId: "d13",
    order: 13,
    cluster: "PICTO",
    clusterName: CLUSTER_NAMES.PICTO,
    skillId: "DHPICTO-10",
    question: "Key: 1 circle = 5 students. Total students in two classes = 55. Class A has 6 full circles. How many circles (full and half) does Class B have?",
    options: [
        { text: "5 full", correct: true, feedback: "Class A = 6×5 = 30 students. Class B = 55−30 = 25 students. 25÷5 = 5 full circles." },
        { text: "4 full + 1 half", correct: false, feedback: "4×5 + 2.5 = 22.5, not 25.", misconceptionId: "E-d13-a" },
        { text: "6 full", correct: false, feedback: "That would be 30 students.", misconceptionId: "E-d13-b" },
        { text: "5 full + 1 half", correct: false, feedback: "5×5+2.5=27.5, not 25.", misconceptionId: "E-d13-c" }
      ],
    backward: "Find Class B's students by subtracting. Divide by the key to get the number of full circles.",
    forward: "Working backwards from a total is a common data problem.",
    misconceptions: [
      {
        misconceptionId: "E-d13-a",
        description: "Student guesses a full+half combination (4 full + 1 half = 22.5 students) without correctly computing Class B's actual student count (25) first.",
        rootCause: "Target Value Not Computed Before Guessing Symbols — attempts to guess the symbol combination without first finding the exact number it must represent.",
        remediation: "First find Class B's EXACT student count: 55-30=25. THEN figure out which symbols give exactly 25: 5×5=25 (5 full circles, no half needed) — don't guess combinations that give 22.5."
      },
      {
        misconceptionId: "E-d13-b",
        description: "Student reuses Class A's symbol count (6 full) for Class B instead of computing Class B's own value from the remaining students.",
        rootCause: "Wrong Class's Data Reused — copies the other class's count instead of computing this class's own value.",
        remediation: "Class B's circles must be computed from CLASS B's students (25), not copied from Class A — 25÷5=5 full circles, not Class A's 6."
      },
      {
        misconceptionId: "E-d13-c",
        description: "Student adds an unnecessary half symbol (5 full + 1 half = 27.5) when the exact remaining total (25) divides evenly into full symbols only.",
        rootCause: "Unnecessary Half Symbol Added — assumes a half symbol is needed without checking whether the division is exact.",
        remediation: "Check whether 25 divides evenly by the key (5): 25÷5=5 exactly, with NO remainder — so only full symbols are needed, not an extra half symbol (5 full + half = 27.5 is too many)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find Class A's student count", hint: "6 × 5 = 30." },
      { level: 2, description: "Find Class B's student count", hint: "55 - 30 = 25." },
      { level: 3, description: "Convert Class B's students to circles", hint: "25 ÷ 5 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.3.MD.B.3"]
  },
  {
    itemId: "d14",
    order: 14,
    cluster: "BAR",
    clusterName: CLUSTER_NAMES.BAR,
    skillId: "DHBAR-11",
    question: "A bar graph shows City X rainfall: 350 mm; City Y rainfall: 250 mm. How much more rain did City X get? What fraction is City Y's rainfall of City X's? (Simplify.)",
    options: [
        { text: "Diff 100 mm, fraction \\(\\frac{5}{7}\\)", correct: true, feedback: "Difference = 100 mm. Fraction = 250/350 = 5/7." },
        { text: "Diff 100 mm, fraction \\(\\frac{7}{5}\\)", correct: false, feedback: "7/5 > 1, not possible as a fraction of a smaller part.", misconceptionId: "E-d14-a" },
        { text: "Diff 100 mm, fraction \\(\\frac{2}{5}\\)", correct: false, feedback: "Incorrect simplification.", misconceptionId: "E-d14-b" },
        { text: "Diff 150 mm, fraction \\(\\frac{5}{7}\\)", correct: false, feedback: "Difference is 100, not 150.", misconceptionId: "E-d14-c" }
      ],
    backward: "Subtract for difference; write smaller over larger and simplify.",
    forward: "Bar graphs can be used to find both absolute and relative differences.",
    misconceptions: [
      {
        misconceptionId: "E-d14-a",
        description: "Student inverts the fraction, putting City X (the larger value) in the numerator instead of City Y as the question asks.",
        rootCause: "Fraction Inverted — swaps numerator and denominator relative to what the question specifies.",
        remediation: "The question asks for City Y's rainfall AS A FRACTION OF City X's — Y goes in the numerator: 250/350=5/7, not 350/250=7/5 (which would be X as a fraction of Y)."
      },
      {
        misconceptionId: "E-d14-b",
        description: "Student incorrectly simplifies 250/350, landing on 2/5 instead of the correct 5/7.",
        rootCause: "Simplification Error — divides numerator and denominator by different or incorrect factors.",
        remediation: "To simplify 250/350, divide both by their GREATEST COMMON FACTOR (50): 250÷50=5 and 350÷50=7, giving 5/7 — not 2/5, which doesn't come from dividing both parts by the same number."
      },
      {
        misconceptionId: "E-d14-c",
        description: "Student adds the two rainfall values (350+250=600, mistakenly divided or estimated as 150) instead of subtracting to find the difference.",
        rootCause: "Operation Selection Error — computes the difference incorrectly, arriving at an inflated value.",
        remediation: "'How much more' means SUBTRACT: 350-250=100, not 150 — recheck your subtraction."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the difference", hint: "350 - 250 = 100." },
      { level: 2, description: "Write City Y over City X", hint: "250/350." },
      { level: 3, description: "Simplify using the GCF", hint: "The GCF of 250 and 350 is 50. Divide both by 50." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.NF.A.1"]
  },
  {
    itemId: "d15",
    order: 15,
    cluster: "LINE",
    clusterName: CLUSTER_NAMES.LINE,
    skillId: "DHLINE-09",
    question: "A line graph shows temperature: 9 AM: 10°C, 10 AM: 10°C, 11 AM: 12°C. During which hour(s) did the temperature stay the same?",
    options: [
        { text: "9 AM to 10 AM", correct: true, feedback: "The line is horizontal, meaning no change." },
        { text: "10 AM to 11 AM", correct: false, feedback: "That's when it rose.", misconceptionId: "E-d15-a" },
        { text: "Both hours", correct: false, feedback: "Only one hour had no change.", misconceptionId: "E-d15-b" },
        { text: "Neither", correct: false, feedback: "9−10 AM shows no change.", misconceptionId: "E-d15-c" }
      ],
    backward: "A horizontal line segment means the value did not change.",
    forward: "Flat sections of a line graph are as important as rising/falling sections.",
    misconceptions: [
      {
        misconceptionId: "E-d15-a",
        description: "Student picks the interval where the temperature actually ROSE (10 AM to 11 AM: 10°C→12°C) instead of the flat interval.",
        rootCause: "Rise/Flat Confusion — identifies a changing interval as if it were unchanged.",
        remediation: "Check each interval: 9AM(10°C)→10AM(10°C) has NO change (flat); 10AM(10°C)→11AM(12°C) is a RISE — the question asks for the flat one, which is 9 AM to 10 AM."
      },
      {
        misconceptionId: "E-d15-b",
        description: "Student claims both hours show no change, without checking that the second hour (10 AM to 11 AM) actually shows a rise.",
        rootCause: "Both Intervals Not Actually Checked — assumes without verifying each interval's direction.",
        remediation: "Check each hour individually: 9AM→10AM stays at 10°C (no change); 10AM→11AM goes from 10°C to 12°C (a RISE, not flat) — so only one hour is flat."
      },
      {
        misconceptionId: "E-d15-c",
        description: "Student claims neither hour shows a flat period, missing that the first hour (9 AM to 10 AM) has identical readings.",
        rootCause: "Flat Period Overlooked — fails to notice two identical consecutive readings.",
        remediation: "Compare 9 AM (10°C) to 10 AM (10°C): these are the SAME value, so the temperature DID stay the same during that hour."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Compare the first two readings", hint: "9 AM = 10°C, 10 AM = 10°C — are they the same?" },
      { level: 2, description: "Compare the next two readings", hint: "10 AM = 10°C, 11 AM = 12°C — are they the same?" },
      { level: 3, description: "Identify the flat interval", hint: "Which interval had identical start and end readings?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d16",
    order: 16,
    cluster: "TABLE",
    clusterName: CLUSTER_NAMES.TABLE,
    skillId: "DHTABLE-09",
    question: "Table A: four numbers: 12, 18, 24, 30. Table B: two numbers: 16, 20. What is the average of all six numbers?",
    options: [
        { text: "20", correct: true, feedback: "Sum A = 84; Sum B = 36; total = 120; count = 6; average = 20." },
        { text: "21", correct: false, feedback: "That's the average of Table A only.", misconceptionId: "E-d16-a" },
        { text: "18", correct: false, feedback: "That's the average of Table B only.", misconceptionId: "E-d16-b" },
        { text: "120", correct: false, feedback: "That's the total, not the average.", misconceptionId: "E-d16-c" }
      ],
    backward: "Sum all numbers, count all numbers, divide.",
    forward: "Combining data from two tables and finding an overall average is a common statistical task.",
    misconceptions: [
      {
        misconceptionId: "E-d16-a",
        description: "Student computes only Table A's average (84÷4=21), forgetting to combine it with Table B's numbers.",
        rootCause: "Only One Table's Data Used — computes the average of a subset instead of all six combined numbers.",
        remediation: "The average must use ALL SIX numbers from BOTH tables, not just Table A — combine: (12+18+24+30+16+20)=120, then 120÷6=20, not just Table A's average (21)."
      },
      {
        misconceptionId: "E-d16-b",
        description: "Student computes only Table B's average (36÷2=18), forgetting to combine it with Table A's numbers.",
        rootCause: "Only One Table's Data Used — computes the average of a subset instead of all six combined numbers.",
        remediation: "The average must use ALL SIX numbers from BOTH tables, not just Table B — combine: (12+18+24+30+16+20)=120, then 120÷6=20, not just Table B's average (18)."
      },
      {
        misconceptionId: "E-d16-c",
        description: "Student computes the combined total (120) correctly but forgets the final division step needed to find the average.",
        rootCause: "Division Step Omitted — stops after summing all values, without dividing by the count.",
        remediation: "The average requires dividing the total by the NUMBER of values (6) — 120 ÷ 6 = 20, don't stop at the total (120) itself."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Add all numbers from both tables", hint: "12+18+24+30+16+20 = 120." },
      { level: 2, description: "Count all the numbers", hint: "There are 6 numbers total (4 from Table A, 2 from Table B)." },
      { level: 3, description: "Divide the total by the count", hint: "120 ÷ 6 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.SP.B.5C"]
  },
  {
    itemId: "d17",
    order: 17,
    cluster: "VOCAB",
    clusterName: CLUSTER_NAMES.VOCAB,
    skillId: "DHVOCAB-07",
    question: "Two fair six‑sided dice are rolled. What is the probability that the sum is 7? (Simplify your answer.)",
    options: [
        { text: "\\(\\frac{1}{6}\\)", correct: true, feedback: "There are 6 ways to get sum 7 out of 36 possible outcomes: 6/36 = 1/6." },
        { text: "\\(\\frac{1}{12}\\)", correct: false, feedback: "Incorrect counting.", misconceptionId: "E-d17-a" },
        { text: "\\(\\frac{1}{9}\\)", correct: false, feedback: "Incorrect.", misconceptionId: "E-d17-b" },
        { text: "\\(\\frac{1}{4}\\)", correct: false, feedback: "Too high.", misconceptionId: "E-d17-c" }
      ],
    backward: "List the ways to get sum 7: (1,6),(2,5),(3,4),(4,3),(5,2),(6,1) — 6 ways. Total possible = 36.",
    forward: "Dice sums are classic probability problems.",
    misconceptions: [
      {
        misconceptionId: "E-d17-a",
        description: "Student undercounts the favourable outcomes for sum 7, missing that (1,6) and (6,1) are DIFFERENT outcomes (since the dice are distinguishable), leading to only 3 counted instead of 6.",
        rootCause: "Ordered Pairs Not Distinguished — treats (a,b) and (b,a) as the same outcome instead of counting them separately.",
        remediation: "Each die roll is a SEPARATE, ordered outcome — (1,6) and (6,1) are two DIFFERENT ways to get sum 7, along with (2,5),(5,2),(3,4),(4,3): that's 6 ways total, not 3 (giving 6/36=1/6, not 3/36=1/12)."
      },
      {
        misconceptionId: "E-d17-b",
        description: "Student miscounts either the favourable outcomes or the total sample space, landing on 1/9 instead of the correct 1/6.",
        rootCause: "Sample Space Miscounted — errors in counting either the favourable or total outcomes for two dice.",
        remediation: "List ALL 6 ways to get sum 7: (1,6),(2,5),(3,4),(4,3),(5,2),(6,1) — and the total possible outcomes for two dice is 6×6=36, giving 6/36=1/6, not 1/9."
      },
      {
        misconceptionId: "E-d17-c",
        description: "Student significantly overestimates the favourable outcomes, landing on the much larger 1/4 instead of the correct 1/6.",
        rootCause: "Sample Space Miscounted — overcounts the favourable outcomes for the specific sum of 7.",
        remediation: "Only 6 out of 36 total outcomes give a sum of exactly 7 — list them: (1,6),(2,5),(3,4),(4,3),(5,2),(6,1) — giving 6/36=1/6, not the larger 1/4 (which would be 9/36)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the total possible outcomes", hint: "Each die has 6 faces, so 6×6=36 total outcomes." },
      { level: 2, description: "List all ways to get a sum of 7", hint: "(1,6),(2,5),(3,4),(4,3),(5,2),(6,1) — count them." },
      { level: 3, description: "Write and simplify the fraction", hint: "6/36 simplifies to ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.7.SP.C.8"]
  },
  {
    itemId: "d18",
    order: 18,
    cluster: "SCALE",
    clusterName: CLUSTER_NAMES.SCALE,
    skillId: "DHSCALE-05",
    question: "A line graph's y‑axis has labels 0, 20, 40, 60. Point P is exactly halfway between 40 and 60. Point Q is at 50. What is the difference between P and Q?",
    options: [
        { text: "0", correct: true, feedback: "P = 50; Q = 50; difference = 0." },
        { text: "10", correct: false, feedback: "Incorrect midpoint.", misconceptionId: "E-d18-a" },
        { text: "20", correct: false, feedback: "That's the difference between 60 and 40.", misconceptionId: "E-d18-b" },
        { text: "5", correct: false, feedback: "Incorrect.", misconceptionId: "E-d18-c" }
      ],
    backward: "Find the value at P (midpoint). Compare with Q.",
    forward: "Sometimes points are exactly on the midpoint.",
    misconceptions: [
      {
        misconceptionId: "E-d18-a",
        description: "Student misreads Point P's midpoint value (using 40 or 60 directly, or another incorrect value) instead of computing the true midpoint of 50.",
        rootCause: "Midpoint Not Computed — reads a nearby gridline instead of averaging the two surrounding marks.",
        remediation: "Point P is HALFWAY between 40 and 60, which is their average: (40+60)÷2=50 — since Point Q is also 50, the difference is 50-50=0, not 10."
      },
      {
        misconceptionId: "E-d18-b",
        description: "Student computes the gridline interval size (60-40=20) instead of comparing Point P's actual value to Point Q's actual value.",
        rootCause: "Wrong Quantities Compared — subtracts the gridline interval instead of the two points' values.",
        remediation: "The question asks for the difference between POINT P and POINT Q, not between the gridlines — P=50 and Q=50, so the difference is 50-50=0, not the gridline gap (60-40=20)."
      },
      {
        misconceptionId: "E-d18-c",
        description: "Student computes a nonzero difference through a calculation error, when P and Q are actually the same value.",
        rootCause: "Computation Error — fails to recognize both points equal 50, leading to an incorrect nonzero result.",
        remediation: "Recompute: P = (40+60)÷2 = 50, and Q is given as 50 — these are IDENTICAL, so the difference is 50-50=0, not 5."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find Point P's value (the midpoint)", hint: "(40 + 60) ÷ 2 = 50." },
      { level: 2, description: "Identify Point Q's value", hint: "Point Q = 50." },
      { level: 3, description: "Subtract to find the difference", hint: "50 - 50 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d19",
    order: 19,
    cluster: "PICTO",
    clusterName: CLUSTER_NAMES.PICTO,
    skillId: "DHPICTO-11",
    question: "Pictograph 1 key: 1 star = 4 points. Team A has 5 stars. Pictograph 2 key: 1 star = 5 points. Team B has 4 stars. Which team has more points?",
    options: [
        { text: "Equal", correct: true, feedback: "A = 5×4 = 20; B = 4×5 = 20. They are equal." },
        { text: "Team A", correct: false, feedback: "Both are 20.", misconceptionId: "E-d19-a" },
        { text: "Team B", correct: false, feedback: "Both are 20.", misconceptionId: "E-d19-b" },
        { text: "Cannot compare", correct: false, feedback: "We can calculate both using their keys.", misconceptionId: "E-d19-c" }
      ],
    backward: "Calculate the points using each key, then compare.",
    forward: "Different pictographs may use different keys — always check before comparing.",
    misconceptions: [
      {
        misconceptionId: "E-d19-a",
        description: "Student compares the raw star counts (Team A has 5 stars, Team B has 4) and picks the team with more stars, ignoring that the two pictographs use DIFFERENT keys.",
        rootCause: "Different Keys Not Applied Before Comparing — compares symbol counts directly across two graphs with different key values.",
        remediation: "The two pictographs have DIFFERENT keys (4 points/star vs 5 points/star) — convert each to actual points first: A=5×4=20, B=4×5=20 — they're actually EQUAL, not determined by star count alone."
      },
      {
        misconceptionId: "E-d19-b",
        description: "Student assumes the larger key value (5 points/star for Team B) automatically means Team B has more total points, without computing the actual product.",
        rootCause: "Different Keys Not Applied Before Comparing — assumes a bigger key value means a bigger total without multiplying by the actual symbol count.",
        remediation: "A bigger KEY doesn't automatically mean a bigger TOTAL — you must multiply key × symbols for each team: A=5×4=20, B=4×5=20 — these are EQUAL, not determined by the key size alone."
      },
      {
        misconceptionId: "E-d19-c",
        description: "Student assumes the two pictographs cannot be compared because they use different keys, when in fact both can be converted to actual points and compared directly.",
        rootCause: "Available Data Underused — treats convertible data as impossible to compare.",
        remediation: "Even with different keys, BOTH pictographs CAN be converted to real points using key×symbols: A=5×4=20, B=4×5=20 — this allows a direct, valid comparison."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Compute Team A's points using its own key", hint: "5 stars × 4 points/star = 20." },
      { level: 2, description: "Compute Team B's points using its own key", hint: "4 stars × 5 points/star = 20." },
      { level: 3, description: "Compare the two totals", hint: "Are 20 and 20 equal, or is one bigger?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.3.MD.B.3"]
  },
  {
    itemId: "d20",
    order: 20,
    cluster: "BAR",
    clusterName: CLUSTER_NAMES.BAR,
    skillId: "DHBAR-08",
    question: "A bar graph shows Monday 150, Tuesday 100, Wednesday 50. What is the total? Then what fraction of the total is Wednesday? (Simplify.)",
    options: [
        { text: "Total 300, fraction \\(\\frac{1}{6}\\)", correct: true, feedback: "150+100+50 = 300. 50/300 = 1/6." },
        { text: "Total 300, fraction \\(\\frac{1}{5}\\)", correct: false, feedback: "50/300 simplifies to 1/6.", misconceptionId: "E-d20-a" },
        { text: "Total 250, fraction \\(\\frac{1}{5}\\)", correct: false, feedback: "Total is 300, not 250.", misconceptionId: "E-d20-b" },
        { text: "Total 300, fraction \\(\\frac{1}{3}\\)", correct: false, feedback: "50/300 is not 1/3.", misconceptionId: "E-d20-c" }
      ],
    backward: "Add the three bars. Write Wednesday over total and simplify.",
    forward: "Bar graphs can be used to find proportions of a whole.",
    misconceptions: [
      {
        misconceptionId: "E-d20-a",
        description: "Student gets the correct total (300) but incorrectly simplifies 50/300, landing on 1/5 instead of the correct 1/6.",
        rootCause: "Simplification Error — divides numerator and denominator by different or incorrect factors.",
        remediation: "To simplify 50/300, divide both by their GREATEST COMMON FACTOR (50): 50÷50=1 and 300÷50=6, giving 1/6 — not 1/5, which doesn't come from dividing both parts by the same number."
      },
      {
        misconceptionId: "E-d20-b",
        description: "Student adds only two of the three bars (e.g., Monday and Tuesday: 150+100=250), forgetting Wednesday, leading to a wrong total.",
        rootCause: "Incomplete Sum — omits one of the three values from the total.",
        remediation: "The total must include ALL THREE bars — add Monday (150), Tuesday (100), AND Wednesday (50): 150+100+50=300, not just two of them (250)."
      },
      {
        misconceptionId: "E-d20-c",
        description: "Student gets the correct total (300) but guesses or miscalculates the fraction, landing on 1/3 instead of correctly computing and simplifying 50/300.",
        rootCause: "Simplification Skipped or Guessed — estimates a fraction instead of computing the actual ratio.",
        remediation: "Actually divide: 50/300 — find the GCF of 50 and 300 (which is 50), then divide both by 50: 50÷50=1, 300÷50=6, giving 1/6, not 1/3."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Add all three bars for the total", hint: "150 + 100 + 50 = 300." },
      { level: 2, description: "Write Wednesday over the total", hint: "50/300." },
      { level: 3, description: "Simplify using the GCF", hint: "The GCF of 50 and 300 is 50. Divide both by 50." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.NF.A.1"]
  },
  {
    itemId: "d21",
    order: 21,
    cluster: "LINE",
    clusterName: CLUSTER_NAMES.LINE,
    skillId: "DHLINE-10",
    question: "A line graph shows a stock price at 10 AM: ₹500, at 11 AM: ₹450, at 12 PM: ₹480. Between which times was the greatest decrease, and by how much?",
    options: [
        { text: "10 AM−11 AM, ₹50", correct: true, feedback: "10−11: drop ₹50; 11−12: rise ₹30. Greatest decrease is ₹50." },
        { text: "11 AM−12 PM, ₹30", correct: false, feedback: "That's a rise, not a decrease.", misconceptionId: "E-d21-a" },
        { text: "10 AM−12 PM, ₹20", correct: false, feedback: "That's the net change over 2 hours.", misconceptionId: "E-d21-b" },
        { text: "10 AM−11 AM, ₹100", correct: false, feedback: "Incorrect amount.", misconceptionId: "E-d21-c" }
      ],
    backward: "Look for the largest drop. Ignore any increases.",
    forward: "Identifying trends helps in making decisions.",
    misconceptions: [
      {
        misconceptionId: "E-d21-a",
        description: "Student picks the second interval (11 AM to 12 PM), which is actually a RISE of ₹30 (450→480), not a decrease at all.",
        rootCause: "Rise/Fall Confusion — identifies an increasing interval as if it were a decrease.",
        remediation: "Check the DIRECTION of each interval: 10AM→11AM goes DOWN (500→450, a decrease); 11AM→12PM goes UP (450→480, a rise, not a decrease) — only the first interval is a decrease."
      },
      {
        misconceptionId: "E-d21-b",
        description: "Student computes the NET change over the full span (10 AM to 12 PM: 500→480=₹20 drop) instead of identifying the single interval with the greatest decrease.",
        rootCause: "Net Change Confused With Greatest Single-Interval Change — computes the overall change instead of comparing individual intervals.",
        remediation: "The question asks for the interval with the GREATEST decrease, not the overall net change — compare each interval separately: 10AM→11AM is -₹50, 11AM→12PM is +₹30 — the greatest decrease is ₹50 (10AM to 11AM), not the net ₹20."
      },
      {
        misconceptionId: "E-d21-c",
        description: "Student correctly identifies the right interval (10 AM to 11 AM) but miscalculates the amount of the decrease, landing on ₹100 instead of the correct ₹50.",
        rootCause: "Computation Error — correct interval identified, but the subtraction is carried out incorrectly.",
        remediation: "Recompute the drop: 500-450=50, not 100 — double-check your subtraction."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Compute the first interval's change", hint: "10 AM to 11 AM: 450 - 500 = -50 (a drop of ₹50)." },
      { level: 2, description: "Compute the second interval's change", hint: "11 AM to 12 PM: 480 - 450 = +30 (a rise of ₹30)." },
      { level: 3, description: "Identify the greatest decrease", hint: "Which interval actually went DOWN, and by how much?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d22",
    order: 22,
    cluster: "TABLE",
    clusterName: CLUSTER_NAMES.TABLE,
    skillId: "DHTABLE-10",
    question: "A table shows A = 28, B = ?, C = 22. The total is 75. Find B.",
    options: [
        { text: "25", correct: true, feedback: "75 − (28+22) = 75 − 50 = 25." },
        { text: "28", correct: false, feedback: "That's A.", misconceptionId: "E-d22-a" },
        { text: "22", correct: false, feedback: "That's C.", misconceptionId: "E-d22-b" },
        { text: "35", correct: false, feedback: "Incorrect subtraction.", misconceptionId: "E-d22-c" }
      ],
    backward: "Subtract the sum of the known values from the total.",
    forward: "Finding missing data from a total is a basic data‑handling skill.",
    misconceptions: [
      {
        misconceptionId: "E-d22-a",
        description: "Student reports A's value (28) instead of computing the actual missing value B.",
        rootCause: "Known Value Reported Instead of Unknown — confuses a given value with the value being solved for.",
        remediation: "28 is already GIVEN as A's value — you need to find the missing value B: 75-(28+22)=75-50=25, not 28."
      },
      {
        misconceptionId: "E-d22-b",
        description: "Student reports C's value (22) instead of computing the actual missing value B.",
        rootCause: "Known Value Reported Instead of Unknown — confuses a given value with the value being solved for.",
        remediation: "22 is already GIVEN as C's value — you need to find the missing value B: 75-(28+22)=75-50=25, not 22."
      },
      {
        misconceptionId: "E-d22-c",
        description: "Student makes an arithmetic slip in the final subtraction, landing on 35 instead of the correct 25.",
        rootCause: "Computation Error — correct approach, but the subtraction is carried out incorrectly.",
        remediation: "Recompute carefully: 28+22=50, then 75-50=25, not 35."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Add the known values", hint: "28 + 22 = 50." },
      { level: 2, description: "Subtract from the total", hint: "75 - 50 = ?" },
      { level: 3, description: "Check your answer", hint: "Does 28 + your answer + 22 equal 75?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d23",
    order: 23,
    cluster: "VOCAB",
    clusterName: CLUSTER_NAMES.VOCAB,
    skillId: "DHVOCAB-08",
    question: "A bag contains 3 red, 4 blue, and 5 green marbles. You pick one marble. What is the probability that it is NOT red? (Simplify your answer.)",
    options: [
        { text: "\\(\\frac{3}{4}\\)", correct: true, feedback: "Total = 12. Not red = 4+5 = 9. 9/12 = 3/4." },
        { text: "\\(\\frac{1}{4}\\)", correct: false, feedback: "That's the probability of red.", misconceptionId: "E-d23-a" },
        { text: "\\(\\frac{1}{3}\\)", correct: false, feedback: "Incorrect.", misconceptionId: "E-d23-b" },
        { text: "\\(\\frac{2}{3}\\)", correct: false, feedback: "9/12 simplifies to 3/4, not 2/3.", misconceptionId: "E-d23-c" }
      ],
    backward: "Total marbles = 12. Not red = blue + green = 9. Probability = 9/12 = 3/4.",
    forward: "Complementary probability (chance of something not happening) is very useful.",
    misconceptions: [
      {
        misconceptionId: "E-d23-a",
        description: "Student computes the probability OF red (3/12=1/4) instead of the probability of NOT red, which is the complement.",
        rootCause: "Complement Not Applied — solves for the given event instead of its complement.",
        remediation: "The question asks for NOT red, which is the COMPLEMENT of red — not-red count = blue+green = 4+5=9, giving 9/12=3/4, not red's own probability (1/4)."
      },
      {
        misconceptionId: "E-d23-b",
        description: "Student miscounts the 'not red' marbles or the total, landing on 1/3 instead of the correct 3/4.",
        rootCause: "Complement Count Miscalculated — errors in counting the non-red marbles or the total.",
        remediation: "Not-red marbles = blue (4) + green (5) = 9, out of a total of 3+4+5=12 marbles: 9/12=3/4, not 1/3."
      },
      {
        misconceptionId: "E-d23-c",
        description: "Student correctly counts 9 out of 12 but incorrectly simplifies 9/12, landing on 2/3 instead of the correct 3/4.",
        rootCause: "Simplification Error — divides numerator and denominator by different or incorrect factors.",
        remediation: "To simplify 9/12, divide both by their GREATEST COMMON FACTOR (3): 9÷3=3 and 12÷3=4, giving 3/4 — not 2/3, which doesn't come from dividing both parts by the same number."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the total marbles", hint: "3 + 4 + 5 = 12." },
      { level: 2, description: "Find the 'not red' count", hint: "Blue + Green = 4 + 5 = 9." },
      { level: 3, description: "Write and simplify the fraction", hint: "9/12 simplifies to ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.7.SP.C.7"]
  },
  {
    itemId: "d24",
    order: 24,
    cluster: "SCALE",
    clusterName: CLUSTER_NAMES.SCALE,
    skillId: "DHPICTO-08",
    question: "Key: 1 apple = 8 apples. The total number of apples is 52. How many full and half apple symbols are there?",
    options: [
        { text: "6 full + 1 half", correct: true, feedback: "6×8 = 48; half of 8 = 4; total = 52." },
        { text: "7 full", correct: false, feedback: "7×8 = 56, too many.", misconceptionId: "E-d24-a" },
        { text: "5 full + 1 half", correct: false, feedback: "5×8+4 = 44.", misconceptionId: "E-d24-b" },
        { text: "6 full", correct: false, feedback: "48, not 52.", misconceptionId: "E-d24-c" }
      ],
    backward: "Divide total by the key. The quotient is full symbols; if the remainder equals half the key, add a half symbol.",
    forward: "Reverse engineering a pictograph from a given total tests understanding of scales.",
    misconceptions: [
      {
        misconceptionId: "E-d24-a",
        description: "Student rounds the total UP to the next full-symbol multiple (7×8=56) instead of finding the exact combination of full and half symbols that gives 52.",
        rootCause: "Overshoots Target By Rounding Up — picks a full-symbol count that exceeds the actual total instead of matching it exactly.",
        remediation: "Test your answer: 7 full symbols would be 7×8=56, but the total is only 52 — that's too many; try one fewer full symbol plus a half symbol: 6×8+4=52."
      },
      {
        misconceptionId: "E-d24-b",
        description: "Student undershoots by using one fewer full symbol than needed (5 full + half = 44) instead of matching the actual total of 52.",
        rootCause: "Undershoots Target — picks a full-symbol count below the actual total instead of matching it exactly.",
        remediation: "Test your answer: 5 full symbols + 1 half = (5×8)+4=44, but the total is 52 — that's too few; try one more full symbol: 6×8+4=52."
      },
      {
        misconceptionId: "E-d24-c",
        description: "Student uses only full symbols (6×8=48) and forgets the leftover 4 apples require a half symbol to reach the exact total of 52.",
        rootCause: "Remainder Not Converted to Half Symbol — stops at the whole-number quotient without accounting for the leftover amount.",
        remediation: "6 full symbols gives 48, but the total is 52 — there's a REMAINDER of 4, which is exactly half of the key (8), so add one half symbol: 6 full + 1 half = 52."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Divide the total by the key", hint: "52 ÷ 8 = 6 remainder 4." },
      { level: 2, description: "Interpret the whole-number part", hint: "6 is the number of full symbols." },
      { level: 3, description: "Interpret the remainder", hint: "The remainder (4) is half of 8 — so there's 1 half symbol." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.3.MD.B.3"]
  }
];

const recheckItems = [
  {
    itemId: "r1",
    order: 1,
    cluster: "PICTO",
    clusterName: CLUSTER_NAMES.PICTO,
    skillId: "DHPICTO-08",
    question: "Key: 1 car = 6 cars. The total number of cars is 45. How many full and half car symbols are there?",
    options: [
        { text: "7 full + 1 half", correct: true, feedback: "7×6 = 42; half of 6 = 3; total = 45." },
        { text: "8 full", correct: false, feedback: "8×6 = 48, too many.", misconceptionId: "E-r1-a" },
        { text: "7 full", correct: false, feedback: "42, not 45.", misconceptionId: "E-r1-b" },
        { text: "6 full + 1 half", correct: false, feedback: "36+3 = 39.", misconceptionId: "E-r1-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r1-a",
        description: "Student rounds the total UP to the next full-symbol multiple (8×6=48) instead of finding the exact combination of full and half symbols that gives 45.",
        rootCause: "Overshoots Target By Rounding Up — picks a full-symbol count that exceeds the actual total instead of matching it exactly.",
        remediation: "Test your answer: 8 full symbols would be 8×6=48, but the total is only 45 — that's too many; try one fewer full symbol plus a half symbol: 7×6+3=45."
      },
      {
        misconceptionId: "E-r1-b",
        description: "Student uses only full symbols (7×6=42) and forgets the leftover 3 cars require a half symbol to reach the exact total of 45.",
        rootCause: "Remainder Not Converted to Half Symbol — stops at the whole-number quotient without accounting for the leftover amount.",
        remediation: "7 full symbols gives 42, but the total is 45 — there's a REMAINDER of 3, which is exactly half of the key (6), so add one half symbol: 7 full + 1 half = 45."
      },
      {
        misconceptionId: "E-r1-c",
        description: "Student undershoots by using one fewer full symbol than needed (6 full + half = 39) instead of matching the actual total of 45.",
        rootCause: "Undershoots Target — picks a full-symbol count below the actual total instead of matching it exactly.",
        remediation: "Test your answer: 6 full symbols + 1 half = (6×6)+3=39, but the total is 45 — that's too few; try one more full symbol: 7×6+3=45."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Divide the total by the key", hint: "45 ÷ 6 = 7 remainder 3." },
      { level: 2, description: "Interpret the whole-number part", hint: "7 is the number of full symbols." },
      { level: 3, description: "Interpret the remainder", hint: "The remainder (3) is half of 6 — so there's 1 half symbol." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.3.MD.B.3"]
  },
  {
    itemId: "r2",
    order: 2,
    cluster: "BAR",
    clusterName: CLUSTER_NAMES.BAR,
    skillId: "DHBAR-09",
    question: "A bar graph shows Bar A: 200, Bar B: 150. What is the ratio A:B in simplest form?",
    options: [
        { text: "4 : 3", correct: true, feedback: "200:150 ÷50 = 4:3." },
        { text: "3 : 4", correct: false, feedback: "That's B to A, not A to B.", misconceptionId: "E-r2-a" },
        { text: "2 : 1", correct: false, feedback: "200 is not twice 150.", misconceptionId: "E-r2-b" },
        { text: "200 : 150", correct: false, feedback: "Not simplified.", misconceptionId: "E-r2-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r2-a",
        description: "Student reverses the order of the ratio, writing Bar B to Bar A instead of Bar A to Bar B as asked.",
        rootCause: "Ratio Order Reversed — swaps the two quantities instead of matching the order the question specifies.",
        remediation: "The question asks for A TO B — A goes first: 200:150 simplifies to 4:3, not 3:4 (which would be B to A)."
      },
      {
        misconceptionId: "E-r2-b",
        description: "Student assumes 200 is exactly double 150, without checking the actual division.",
        rootCause: "Ratio Estimated Instead of Computed — guesses a 'nice' ratio instead of actually simplifying.",
        remediation: "Check: is 200 exactly 2×150? No, 2×150=300, not 200 — actually simplify by dividing both by their HCF (50): 200÷50=4, 150÷50=3, giving 4:3, not 2:1."
      },
      {
        misconceptionId: "E-r2-c",
        description: "Student writes the ratio correctly but leaves it unsimplified instead of reducing to simplest form.",
        rootCause: "Simplification Step Omitted — stops after writing the raw ratio without dividing by the HCF.",
        remediation: "200:150 must be SIMPLIFIED — divide both numbers by their HCF (50): 200÷50=4, 150÷50=3, giving 4:3, not the raw 200:150."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Write the ratio in the order asked", hint: "A to B: 200:150." },
      { level: 2, description: "Find the HCF of both numbers", hint: "The HCF of 200 and 150 is 50." },
      { level: 3, description: "Divide both terms by the HCF", hint: "200÷50 : 150÷50 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.RP.A.1"]
  },
  {
    itemId: "r3",
    order: 3,
    cluster: "LINE",
    clusterName: CLUSTER_NAMES.LINE,
    skillId: "DHLINE-06",
    question: "A line graph shows 1 PM: 30 km/h, 2 PM: 50 km/h, 3 PM: 40 km/h. Between which times was the greatest increase?",
    options: [
        { text: "1 PM to 2 PM", correct: true, feedback: "Increase of 20 km/h. 2−3 was a decrease." },
        { text: "2 PM to 3 PM", correct: false, feedback: "That interval was a decrease, not an increase.", misconceptionId: "E-r3-a" },
        { text: "Both equal", correct: false, feedback: "20 km/h and a decrease are not equal.", misconceptionId: "E-r3-b" },
        { text: "Cannot say", correct: false, feedback: "We can calculate both changes.", misconceptionId: "E-r3-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r3-a",
        description: "Student picks the second interval (2 PM to 3 PM), which is actually a DECREASE (50→40), not an increase at all.",
        rootCause: "Rise/Fall Confusion — identifies a decreasing interval as if it were an increase.",
        remediation: "Check the DIRECTION of each interval: 1PM→2PM goes UP (30→50, an increase); 2PM→3PM goes DOWN (50→40, a decrease, not an increase) — only the first interval is an increase."
      },
      {
        misconceptionId: "E-r3-b",
        description: "Student assumes both intervals show the same kind of change without checking that one is an increase and the other a decrease.",
        rootCause: "Intervals Not Actually Compared — assumes equality instead of checking each interval's direction and size.",
        remediation: "Check each interval separately: 1PM→2PM is +20 km/h (an increase); 2PM→3PM is -10 km/h (a decrease) — these are NOT the same kind of change, so they can't be 'equal'."
      },
      {
        misconceptionId: "E-r3-c",
        description: "Student assumes the changes cannot be determined, when the graph provides enough data to calculate both differences.",
        rootCause: "Available Data Underused — treats calculable data as insufficient.",
        remediation: "All three speed readings are given (30, 50, 40), so both interval changes CAN be calculated: +20 km/h and -10 km/h — compare them to find the greatest increase."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Compute the first interval's change", hint: "1 PM to 2 PM: 50 - 30 = +20 km/h." },
      { level: 2, description: "Compute the second interval's change", hint: "2 PM to 3 PM: 40 - 50 = -10 km/h." },
      { level: 3, description: "Identify the greatest increase", hint: "Which interval actually went UP, and by how much?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "r4",
    order: 4,
    cluster: "TABLE",
    clusterName: CLUSTER_NAMES.TABLE,
    skillId: "DHTABLE-07",
    question: "The average of four numbers is 25. Three numbers are 20, 30, and 25. Find the fourth number.",
    options: [
        { text: "25", correct: true, feedback: "Total = 4×25 = 100. Sum of known = 75. Missing = 25." },
        { text: "30", correct: false, feedback: "That's one of the known numbers.", misconceptionId: "E-r4-a" },
        { text: "20", correct: false, feedback: "That's one of the known numbers.", misconceptionId: "E-r4-b" },
        { text: "75", correct: false, feedback: "That's the sum of the three known numbers, not the missing one.", misconceptionId: "E-r4-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r4-a",
        description: "Student reports one of the already-known numbers (30) instead of computing the actual missing fourth number.",
        rootCause: "Known Value Reported Instead of Unknown — confuses a given number with the value being solved for.",
        remediation: "30 is already GIVEN as one of the three numbers — you need to find the missing FOURTH number: total=4×25=100, 100-20-30-25=25, not 30."
      },
      {
        misconceptionId: "E-r4-b",
        description: "Student reports one of the already-known numbers (20) instead of computing the actual missing fourth number.",
        rootCause: "Known Value Reported Instead of Unknown — confuses a given number with the value being solved for.",
        remediation: "20 is already GIVEN as one of the three numbers — you need to find the missing FOURTH number: total=4×25=100, 100-20-30-25=25, not 20."
      },
      {
        misconceptionId: "E-r4-c",
        description: "Student reports the sum of the three known numbers (75) instead of subtracting it from the required total to find the missing number.",
        rootCause: "Final Subtraction Step Omitted — stops after summing the known values, without subtracting from the required total.",
        remediation: "75 is only the sum of the THREE known numbers — you still need to subtract it from the total needed (4×25=100): 100-75=25, not 75 itself."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the total needed for the average", hint: "4 × 25 = 100." },
      { level: 2, description: "Add the three known numbers", hint: "20 + 30 + 25 = 75." },
      { level: 3, description: "Subtract to find the missing number", hint: "100 - 75 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.SP.B.5C"]
  },
  {
    itemId: "r5",
    order: 5,
    cluster: "VOCAB",
    clusterName: CLUSTER_NAMES.VOCAB,
    skillId: "DHVOCAB-09",
    question: "A spinner has numbers 1 to 8. What is the probability of getting an odd number? (Simplify.)",
    options: [
        { text: "\\(\\frac{1}{2}\\)", correct: true, feedback: "4 odd (1,3,5,7) out of 8 = 1/2." },
        { text: "\\(\\frac{1}{4}\\)", correct: false, feedback: "That's not the correct count of odd numbers.", misconceptionId: "E-r5-a" },
        { text: "\\(\\frac{3}{8}\\)", correct: false, feedback: "There are 4 odd numbers, not 3.", misconceptionId: "E-r5-b" },
        { text: "\\(\\frac{5}{8}\\)", correct: false, feedback: "There are 4 odd numbers, not 5.", misconceptionId: "E-r5-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r5-a",
        description: "Student undercounts the odd numbers from 1 to 8, arriving at only 2 instead of the actual 4 (1, 3, 5, 7).",
        rootCause: "Favourable Outcomes Miscounted — lists an incomplete set of the numbers satisfying the condition.",
        remediation: "List ALL the odd numbers from 1 to 8: 1, 3, 5, 7 — that's 4 numbers, out of 8 total: 4/8=1/2, not 2/8=1/4."
      },
      {
        misconceptionId: "E-r5-b",
        description: "Student undercounts the odd numbers from 1 to 8, arriving at only 3 instead of the actual 4 (1, 3, 5, 7).",
        rootCause: "Favourable Outcomes Miscounted — lists an incomplete set of the numbers satisfying the condition.",
        remediation: "List ALL the odd numbers from 1 to 8: 1, 3, 5, 7 — that's 4 numbers, out of 8 total: 4/8=1/2, not 3/8."
      },
      {
        misconceptionId: "E-r5-c",
        description: "Student overcounts the odd numbers from 1 to 8, arriving at 5 instead of the actual 4 (1, 3, 5, 7), or confuses odd with even.",
        rootCause: "Favourable Outcomes Miscounted — lists an incorrect set of the numbers satisfying the condition.",
        remediation: "List ALL the odd numbers from 1 to 8: 1, 3, 5, 7 — that's exactly 4 numbers, out of 8 total: 4/8=1/2, not 5/8."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "List all the odd numbers from 1 to 8", hint: "1, 3, 5, 7 — count them." },
      { level: 2, description: "Identify the total possible outcomes", hint: "There are 8 numbers in total." },
      { level: 3, description: "Write and simplify the fraction", hint: "4/8 simplifies to ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.7.SP.C.7"]
  },
  {
    itemId: "r6",
    order: 6,
    cluster: "SCALE",
    clusterName: CLUSTER_NAMES.SCALE,
    skillId: "DHPICTO-08",
    question: "Key: 1 leaf = 10 leaves. Total leaves = 65. How many full and half leaf symbols?",
    options: [
        { text: "6 full + 1 half", correct: true, feedback: "6×10=60; half=5; total=65." },
        { text: "7 full", correct: false, feedback: "7×10=70, too many.", misconceptionId: "E-r6-a" },
        { text: "5 full + 1 half", correct: false, feedback: "5×10+5=55, too few.", misconceptionId: "E-r6-b" },
        { text: "6 full", correct: false, feedback: "60, not 65.", misconceptionId: "E-r6-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r6-a",
        description: "Student rounds the total UP to the next full-symbol multiple (7×10=70) instead of finding the exact combination of full and half symbols that gives 65.",
        rootCause: "Overshoots Target By Rounding Up — picks a full-symbol count that exceeds the actual total instead of matching it exactly.",
        remediation: "Test your answer: 7 full symbols would be 7×10=70, but the total is only 65 — that's too many; try one fewer full symbol plus a half symbol: 6×10+5=65."
      },
      {
        misconceptionId: "E-r6-b",
        description: "Student undershoots by using one fewer full symbol than needed (5 full + half = 55) instead of matching the actual total of 65.",
        rootCause: "Undershoots Target — picks a full-symbol count below the actual total instead of matching it exactly.",
        remediation: "Test your answer: 5 full symbols + 1 half = (5×10)+5=55, but the total is 65 — that's too few; try one more full symbol: 6×10+5=65."
      },
      {
        misconceptionId: "E-r6-c",
        description: "Student uses only full symbols (6×10=60) and forgets the leftover 5 leaves require a half symbol to reach the exact total of 65.",
        rootCause: "Remainder Not Converted to Half Symbol — stops at the whole-number quotient without accounting for the leftover amount.",
        remediation: "6 full symbols gives 60, but the total is 65 — there's a REMAINDER of 5, which is exactly half of the key (10), so add one half symbol: 6 full + 1 half = 65."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Divide the total by the key", hint: "65 ÷ 10 = 6 remainder 5." },
      { level: 2, description: "Interpret the whole-number part", hint: "6 is the number of full symbols." },
      { level: 3, description: "Interpret the remainder", hint: "The remainder (5) is half of 10 — so there's 1 half symbol." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.3.MD.B.3"]
  },
  {
    itemId: "r7",
    order: 7,
    cluster: "PICTO",
    clusterName: CLUSTER_NAMES.PICTO,
    skillId: "DHPICTO-07",
    question: "Key: 1 book = 3 books. Class X: 4 full + 1 half; Class Y: 2 full + 2 half. Which class has more books, and by how much?",
    options: [
        { text: "X by 4.5", correct: true, feedback: "X = 12+1.5=13.5; Y = 6+3=9; diff=4.5." },
        { text: "Y by 4.5", correct: false, feedback: "X has 13.5, Y has 9 — X is ahead, not Y.", misconceptionId: "E-r7-a" },
        { text: "Equal", correct: false, feedback: "13.5 ≠ 9.", misconceptionId: "E-r7-b" },
        { text: "X by 3", correct: false, feedback: "Recheck your subtraction: 13.5 - 9 = 4.5, not 3.", misconceptionId: "E-r7-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r7-a",
        description: "Student correctly computes both totals (X=13.5, Y=9) but reverses who has more, saying Y instead of X.",
        rootCause: "Comparison Direction Reversed — computes the right numbers but names the wrong winner.",
        remediation: "Compare the two totals carefully: X=13.5, Y=9 — since 13.5 > 9, Class X has MORE books and by 4.5, not Class Y."
      },
      {
        misconceptionId: "E-r7-b",
        description: "Student assumes the two classes have equal books without actually computing and comparing their totals.",
        rootCause: "Totals Not Actually Compared — assumes equality instead of calculating each class's total.",
        remediation: "Compute each class's total separately: X = (4×3)+1.5 = 13.5, Y = (2×3)+3 = 9 — these are NOT equal; X has 4.5 more."
      },
      {
        misconceptionId: "E-r7-c",
        description: "Student makes an arithmetic slip in the final subtraction, landing on 3 instead of the correct 4.5.",
        rootCause: "Computation Error — correct approach, but the final subtraction is carried out incorrectly.",
        remediation: "Recompute carefully: X = 12+1.5=13.5, Y = 6+3=9, difference = 13.5-9=4.5, not 3."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Compute Class X's total", hint: "4×3 + half of 3 = 12 + 1.5 = 13.5." },
      { level: 2, description: "Compute Class Y's total", hint: "2×3 + 2×1.5 (two half symbols) = 6 + 3 = 9." },
      { level: 3, description: "Compare and find the difference", hint: "13.5 - 9 = ? Which class has more?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.3.MD.B.3"]
  },
  {
    itemId: "r8",
    order: 8,
    cluster: "BAR",
    clusterName: CLUSTER_NAMES.BAR,
    skillId: "DHBAR-12",
    question: "A bar graph shows Monday 60, Tuesday 90. Monday's value is what fraction of Tuesday's? (Simplify.)",
    options: [
        { text: "\\(\\frac{2}{3}\\)", correct: true, feedback: "60/90 = 2/3." },
        { text: "\\(\\frac{3}{2}\\)", correct: false, feedback: "That's Tuesday as a fraction of Monday, not the other way around.", misconceptionId: "E-r8-a" },
        { text: "\\(\\frac{1}{2}\\)", correct: false, feedback: "60/90 is not 1/2.", misconceptionId: "E-r8-b" },
        { text: "\\(\\frac{2}{5}\\)", correct: false, feedback: "Incorrect simplification of 60/90.", misconceptionId: "E-r8-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r8-a",
        description: "Student inverts the fraction, putting Tuesday (90) in the numerator instead of Monday as the question asks.",
        rootCause: "Fraction Inverted — swaps numerator and denominator relative to what the question specifies.",
        remediation: "The question asks for MONDAY'S value as a fraction OF TUESDAY'S — Monday goes in the numerator: 60/90=2/3, not 90/60=3/2 (which would be Tuesday as a fraction of Monday)."
      },
      {
        misconceptionId: "E-r8-b",
        description: "Student assumes the fraction is 1/2 without correctly computing and simplifying 60/90.",
        rootCause: "Simplification Skipped or Guessed — estimates a 'nice' fraction instead of computing the actual ratio.",
        remediation: "Actually divide: 60/90 — find the GCF of 60 and 90 (which is 30), then divide both by 30: 60÷30=2, 90÷30=3, giving 2/3, not 1/2."
      },
      {
        misconceptionId: "E-r8-c",
        description: "Student incorrectly simplifies 60/90, landing on 2/5 instead of the correct 2/3.",
        rootCause: "Simplification Error — divides numerator and denominator by different or incorrect factors.",
        remediation: "To simplify 60/90, divide both by their GREATEST COMMON FACTOR (30): 60÷30=2 and 90÷30=3, giving 2/3 — not 2/5, which doesn't come from dividing both parts by the same number."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Write Monday over Tuesday", hint: "60/90." },
      { level: 2, description: "Find the GCF of both numbers", hint: "The GCF of 60 and 90 is 30." },
      { level: 3, description: "Divide both by the GCF", hint: "60÷30 / 90÷30 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.NF.A.1"]
  },
  {
    itemId: "r9",
    order: 9,
    cluster: "LINE",
    clusterName: CLUSTER_NAMES.LINE,
    skillId: "DHLINE-09",
    question: "A line graph shows a flat line at 25°C from 9 AM to 11 AM. What was the temperature at 10 AM?",
    options: [
        { text: "25°C", correct: true, feedback: "A flat line means constant temperature." },
        { text: "20°C", correct: false, feedback: "The line is flat at 25°C the whole time.", misconceptionId: "E-r9-a" },
        { text: "30°C", correct: false, feedback: "The line is flat at 25°C the whole time.", misconceptionId: "E-r9-b" },
        { text: "Cannot say", correct: false, feedback: "A flat line tells us the value directly.", misconceptionId: "E-r9-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r9-a",
        description: "Student picks a value lower than the flat line's actual reading, not recognising that a flat/horizontal line stays at the SAME value throughout.",
        rootCause: "Flat Line Meaning Not Applied — doesn't recognise that a horizontal segment means the value is constant everywhere along it.",
        remediation: "A FLAT (horizontal) line segment means the value stays THE SAME the whole time — since it's 25°C at both 9 AM and 11 AM, it must also be 25°C at 10 AM (in between), not 20°C."
      },
      {
        misconceptionId: "E-r9-b",
        description: "Student picks a value higher than the flat line's actual reading, not recognising that a flat/horizontal line stays at the SAME value throughout.",
        rootCause: "Flat Line Meaning Not Applied — doesn't recognise that a horizontal segment means the value is constant everywhere along it.",
        remediation: "A FLAT (horizontal) line segment means the value stays THE SAME the whole time — since it's 25°C at both 9 AM and 11 AM, it must also be 25°C at 10 AM (in between), not 30°C."
      },
      {
        misconceptionId: "E-r9-c",
        description: "Student assumes the in-between value cannot be determined, when a flat line directly shows the constant value at every point along it.",
        rootCause: "Available Data Underused — treats a directly-readable flat line as insufficient information.",
        remediation: "A flat line at 25°C means the temperature is 25°C at EVERY point along that segment, including 10 AM — this CAN be determined directly from the graph."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall what a flat line means", hint: "A horizontal line segment means the value does not change." },
      { level: 2, description: "Check the readings at both ends", hint: "9 AM = 25°C, 11 AM = 25°C — both the same." },
      { level: 3, description: "Apply this to the in-between time", hint: "If it's constant at both ends, what must it be at 10 AM?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "r10",
    order: 10,
    cluster: "TABLE",
    clusterName: CLUSTER_NAMES.TABLE,
    skillId: "DHTABLE-09",
    question: "Table A: 15, 25. Table B: 10, 20, 30. What is the average of all five numbers?",
    options: [
        { text: "20", correct: true, feedback: "Sum = 15+25+10+20+30 = 100; ÷5 = 20." },
        { text: "18", correct: false, feedback: "That's not the correct total divided by 5.", misconceptionId: "E-r10-a" },
        { text: "25", correct: false, feedback: "That's Table A's average only, or one value — not the combined average.", misconceptionId: "E-r10-b" },
        { text: "22", correct: false, feedback: "Recheck your sum and division.", misconceptionId: "E-r10-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r10-a",
        description: "Student computes only Table B's average (60÷3=20 is actually correct, but a slip elsewhere like dividing 100 by the wrong count) leads to 18 instead of the correct combined average.",
        rootCause: "Computation Error — an error in summing or dividing leads to an incorrect combined average.",
        remediation: "Recompute carefully: sum all 5 numbers (15+25+10+20+30=100), then divide by 5 (the total count of numbers): 100÷5=20, not 18."
      },
      {
        misconceptionId: "E-r10-b",
        description: "Student reports Table A's average (or a single value) instead of combining all five numbers from both tables.",
        rootCause: "Only One Table's Data Used — computes using a subset instead of all five combined numbers.",
        remediation: "The average must use ALL FIVE numbers from BOTH tables, not just Table A — combine: (15+25+10+20+30)=100, then 100÷5=20, not just Table A's average (20, coincidentally close, but the reasoning must use all 5)."
      },
      {
        misconceptionId: "E-r10-c",
        description: "Student makes an arithmetic slip while summing or dividing, landing on 22 instead of the correct 20.",
        rootCause: "Computation Error — correct approach, but the addition or division is carried out incorrectly.",
        remediation: "Recompute carefully: 15+25+10+20+30=100, then 100÷5=20, not 22."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Add all numbers from both tables", hint: "15+25+10+20+30 = 100." },
      { level: 2, description: "Count all the numbers", hint: "There are 5 numbers total (2 from Table A, 3 from Table B)." },
      { level: 3, description: "Divide the total by the count", hint: "100 ÷ 5 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.SP.B.5C"]
  },
  {
    itemId: "r11",
    order: 11,
    cluster: "VOCAB",
    clusterName: CLUSTER_NAMES.VOCAB,
    skillId: "DHVOCAB-07",
    question: "Two dice are rolled. What is the probability that the sum is 2? (Simplify.)",
    options: [
        { text: "\\(\\frac{1}{36}\\)", correct: true, feedback: "Only (1,1) gives sum 2 out of 36 outcomes." },
        { text: "\\(\\frac{1}{18}\\)", correct: false, feedback: "There is only 1 way to get sum 2, not 2 ways.", misconceptionId: "E-r11-a" },
        { text: "\\(\\frac{1}{12}\\)", correct: false, feedback: "There is only 1 way to get sum 2, not 3 ways.", misconceptionId: "E-r11-b" },
        { text: "\\(\\frac{1}{6}\\)", correct: false, feedback: "There is only 1 way to get sum 2, not 6 ways.", misconceptionId: "E-r11-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r11-a",
        description: "Student overcounts the ways to get sum 2, counting 2 favourable outcomes instead of the actual 1 (only (1,1) works).",
        rootCause: "Favourable Outcomes Miscounted — lists more ways than actually exist for this specific sum.",
        remediation: "The ONLY way to get a sum of 2 from two dice is (1,1) — since the smallest possible value on each die is 1, there's no other combination: 1/36, not 2/36=1/18."
      },
      {
        misconceptionId: "E-r11-b",
        description: "Student overcounts the ways to get sum 2, counting 3 favourable outcomes instead of the actual 1 (only (1,1) works).",
        rootCause: "Favourable Outcomes Miscounted — confuses the counting method used for other sums (like 7) with this much smaller sum.",
        remediation: "The ONLY way to get a sum of 2 from two dice is (1,1) — since the smallest possible value on each die is 1, there's no other combination: 1/36, not 3/36=1/12."
      },
      {
        misconceptionId: "E-r11-c",
        description: "Student confuses this problem with the sum-of-7 case (which has 6 ways) and applies that count here, where only 1 way actually exists.",
        rootCause: "Wrong Sum's Outcome Count Applied — reuses the favourable-outcome count from a different target sum.",
        remediation: "Sum 7 has 6 ways, but sum 2 is different — the smallest possible sum is 1+1=2, and there's only ONE way to make it: (1,1); giving 1/36, not 6/36=1/6."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the total possible outcomes", hint: "Each die has 6 faces, so 6×6=36 total outcomes." },
      { level: 2, description: "List all ways to get a sum of 2", hint: "What is the smallest number each die can show? Can any other pair give sum 2?" },
      { level: 3, description: "Write the fraction", hint: "1 favourable outcome out of 36 total = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.7.SP.C.8"]
  },
  {
    itemId: "r12",
    order: 12,
    cluster: "SCALE",
    clusterName: CLUSTER_NAMES.SCALE,
    skillId: "DHSCALE-04",
    question: "A bar graph's y‑axis has marks at 0, 5, 10, 15. A bar ends exactly halfway between 10 and 15. What is its value?",
    options: [
        { text: "12.5", correct: true, feedback: "(10+15)÷2 = 12.5." },
        { text: "10", correct: false, feedback: "That's the lower mark.", misconceptionId: "E-r12-a" },
        { text: "15", correct: false, feedback: "That's the upper mark.", misconceptionId: "E-r12-b" },
        { text: "12", correct: false, feedback: "The exact midpoint of 10 and 15 is 12.5, not 12.", misconceptionId: "E-r12-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r12-a",
        description: "Student rounds down to the lower gridline (10) instead of computing the actual midpoint value.",
        rootCause: "Midpoint Not Computed — reads the nearest lower mark instead of averaging the two surrounding marks.",
        remediation: "'Halfway between 10 and 15' means the AVERAGE of the two marks, not the lower one — (10+15)÷2=12.5, not 10."
      },
      {
        misconceptionId: "E-r12-b",
        description: "Student rounds up to the upper gridline (15) instead of computing the actual midpoint value.",
        rootCause: "Midpoint Not Computed — reads the nearest upper mark instead of averaging the two surrounding marks.",
        remediation: "'Halfway between 10 and 15' means the AVERAGE of the two marks, not the upper one — (10+15)÷2=12.5, not 15."
      },
      {
        misconceptionId: "E-r12-c",
        description: "Student rounds the midpoint to a whole number (12) instead of keeping the exact decimal value 12.5.",
        rootCause: "Decimal Midpoint Rounded Incorrectly — truncates or rounds a non-whole-number average instead of reporting the exact value.",
        remediation: "(10+15)÷2 = 12.5 exactly — don't round this to 12; the midpoint between an odd-sum pair of marks is often a decimal, and it should be reported exactly."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the two surrounding marks", hint: "The bar ends between 10 and 15." },
      { level: 2, description: "Recognise 'halfway' means average", hint: "Add the two marks and divide by 2." },
      { level: 3, description: "Compute exactly", hint: "(10 + 15) ÷ 2 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
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
    title: "Data Handling — Problem-Solving & Synthesis",
    subtitle: "Telangana & Cambridge · Level 3 · Problem-Solving & Synthesis",
    description: "Non-routine synthesis problems: working backwards from pictograph totals, ratios and fractions from bar graphs, combined probability, and missing values from averages.",
    clusterNames: CLUSTER_NAMES,
    gateReviewHTML: "<strong>Quick Review — Synthesis Tips</strong><br>\n        • Combine pictograph keys with totals to work backwards to find symbols.<br>\n        • Bar graphs can be used to find ratios, fractions, and percentages.<br>\n        • Line graphs show rate of change; find the steepest part to identify the greatest increase or decrease.<br>\n        • Use totals and averages to find missing values in tables.<br>\n        • For combined probability (e.g., spinner and dice), multiply the number of outcomes.<br>\n        • Reading between scale marks requires finding midpoints or estimating values.",
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

// seed/mathSeedCh8DataHandlingL2.js
//
// Populates math_chapters and math_questions with Grade 5, Chapter 8
// (Data Handling), Level 2 — converted from the standalone HTML file
// ch-8-data-handling-level-2.html.
//
// Run with: node seed/mathSeedCh8DataHandlingL2.js

const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-5";
const GRADE_LABEL = "Grade 5";
const CHAPTER_SLUG = "ch-8-data-handling";
const CHAPTER_NAME = "Data Handling";
const LEVEL = 2;

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
    skillId: "DHPICTO-03",
    question: "Key: 1 circle = 4 students. Monday: 5 circles, Tuesday: 3 circles. How many more students on Monday than Tuesday?",
    options: [
        { text: "8", correct: true, feedback: "Monday = 5×4 = 20; Tuesday = 3×4 = 12. 20 − 12 = 8." },
        { text: "2", correct: false, feedback: "You only looked at the circles (5−3), forgot to multiply by 4.", misconceptionId: "E-w1-a" },
        { text: "20", correct: false, feedback: "That's Monday's total only.", misconceptionId: "E-w1-b" },
        { text: "12", correct: false, feedback: "That's Tuesday's total only.", misconceptionId: "E-w1-c" }
      ],
    retryHint: "First multiply each day's circles by 4, then subtract.",
    misconceptions: [
      {
        misconceptionId: "E-w1-a",
        description: "Student subtracts the raw symbol counts (5-3=2) without first converting them to actual student counts using the key.",
        rootCause: "Key Conversion Skipped Before Comparing — compares symbol counts directly instead of the actual quantities they represent.",
        remediation: "Convert BOTH days to actual students first (Monday=5×4=20, Tuesday=3×4=12), THEN subtract: 20-12=8 — don't subtract the raw symbol counts."
      },
      {
        misconceptionId: "E-w1-b",
        description: "Student reports Monday's total instead of computing the DIFFERENCE between the two days.",
        rootCause: "Final Subtraction Step Omitted — stops after computing one day's total, without comparing to the other.",
        remediation: "The question asks how many MORE students were on Monday — this requires computing BOTH totals AND subtracting them: 20-12=8, not just Monday's total (20)."
      },
      {
        misconceptionId: "E-w1-c",
        description: "Student reports Tuesday's total instead of computing the DIFFERENCE between the two days.",
        rootCause: "Wrong Value Reported — confuses one day's total with the requested difference.",
        remediation: "The question asks for the DIFFERENCE between the two days' totals, not either day's total alone — compute both totals (20 and 12), then subtract."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Convert Monday's symbols to students", hint: "5 × 4 = 20." },
      { level: 2, description: "Convert Tuesday's symbols to students", hint: "3 × 4 = 12." },
      { level: 3, description: "Find the difference", hint: "20 - 12 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.3.MD.B.3"]
  },
  {
    itemId: "w2",
    order: 2,
    cluster: "BAR",
    clusterName: CLUSTER_NAMES.BAR,
    skillId: "DHBAR-05",
    question: "A bar graph shows Apples: 15, Bananas: 25. How many fruit in total?",
    options: [
        { text: "40", correct: true, feedback: "15 + 25 = 40 fruit." },
        { text: "10", correct: false, feedback: "That's the difference (25−15), not the total.", misconceptionId: "E-w2-a" },
        { text: "15", correct: false, feedback: "That's only apples.", misconceptionId: "E-w2-b" },
        { text: "25", correct: false, feedback: "That's only bananas.", misconceptionId: "E-w2-c" }
      ],
    retryHint: "Add the two values together.",
    misconceptions: [
      {
        misconceptionId: "E-w2-a",
        description: "Student subtracts instead of adding, computing the difference rather than the total.",
        rootCause: "Operation Selection Error — subtracts when the question ('total') calls for addition.",
        remediation: "'Total' means the SUM of all values — add 15+25=40, don't subtract them (which would give the difference, not the total)."
      },
      {
        misconceptionId: "E-w2-b",
        description: "Student reports only the Apples value, forgetting to include Bananas in the total.",
        rootCause: "Partial Sum — includes only one category instead of both.",
        remediation: "The total must include BOTH categories — add Apples (15) AND Bananas (25): 15+25=40, not just 15."
      },
      {
        misconceptionId: "E-w2-c",
        description: "Student reports only the Bananas value, forgetting to include Apples in the total.",
        rootCause: "Partial Sum — includes only one category instead of both.",
        remediation: "The total must include BOTH categories — add Apples (15) AND Bananas (25): 15+25=40, not just 25."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify both values", hint: "Apples = 15, Bananas = 25." },
      { level: 2, description: "Recognise 'total' means sum", hint: "Add the two values together." },
      { level: 3, description: "Compute", hint: "15 + 25 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.3.MD.B.3"]
  },
  {
    itemId: "w3",
    order: 3,
    cluster: "LINE",
    clusterName: CLUSTER_NAMES.LINE,
    skillId: "DHLINE-03",
    question: "A line graph shows temperature at 10 AM = 20°C, at 12 PM = 26°C. How much did the temperature rise?",
    options: [
        { text: "6°C", correct: true, feedback: "26 − 20 = 6°C." },
        { text: "20°C", correct: false, feedback: "That's the starting temperature.", misconceptionId: "E-w3-a" },
        { text: "26°C", correct: false, feedback: "That's the later temperature.", misconceptionId: "E-w3-b" },
        { text: "46°C", correct: false, feedback: "You added instead of subtracted.", misconceptionId: "E-w3-c" }
      ],
    retryHint: "Subtract the earlier temperature from the later one.",
    misconceptions: [
      {
        misconceptionId: "E-w3-a",
        description: "Student reports the starting temperature instead of computing the rise (the difference between start and end).",
        rootCause: "Wrong Value Reported — confuses one endpoint value with the requested change.",
        remediation: "'Rise' means the CHANGE in temperature, not either individual reading — subtract the earlier (20) from the later (26): 26-20=6."
      },
      {
        misconceptionId: "E-w3-b",
        description: "Student reports the ending temperature instead of computing the rise (the difference between start and end).",
        rootCause: "Wrong Value Reported — confuses one endpoint value with the requested change.",
        remediation: "'Rise' means the CHANGE in temperature, not either individual reading — subtract the earlier (20) from the later (26): 26-20=6."
      },
      {
        misconceptionId: "E-w3-c",
        description: "Student adds the two temperatures instead of subtracting to find the rise.",
        rootCause: "Operation Selection Error — adds when the question ('how much did it rise') calls for subtraction.",
        remediation: "'Rise' is found by SUBTRACTING the starting value from the ending value, not adding them: 26-20=6, not 26+20=46."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the starting and ending values", hint: "10 AM = 20°C, 12 PM = 26°C." },
      { level: 2, description: "Recognise 'rise' means the change", hint: "Subtract the earlier value from the later value." },
      { level: 3, description: "Compute", hint: "26 - 20 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "w4",
    order: 4,
    cluster: "TABLE",
    clusterName: CLUSTER_NAMES.TABLE,
    skillId: "DHTABLE-03",
    question: "A table shows: Monday 12, Tuesday 18, Wednesday 15. What is the total?",
    options: [
        { text: "45", correct: true, feedback: "12 + 18 + 15 = 45." },
        { text: "30", correct: false, feedback: "You only added Monday and Tuesday.", misconceptionId: "E-w4-a" },
        { text: "33", correct: false, feedback: "You added Tuesday and Wednesday only.", misconceptionId: "E-w4-b" },
        { text: "15", correct: false, feedback: "That's just Wednesday.", misconceptionId: "E-w4-c" }
      ],
    retryHint: "Add all three numbers.",
    misconceptions: [
      {
        misconceptionId: "E-w4-a",
        description: "Student adds only two of the three values (Monday and Tuesday), forgetting Wednesday.",
        rootCause: "Incomplete Sum — omits one of the three values from the total.",
        remediation: "The total must include ALL THREE days — add Monday (12), Tuesday (18), AND Wednesday (15): 12+18+15=45, not just two of them."
      },
      {
        misconceptionId: "E-w4-b",
        description: "Student adds only two of the three values (Tuesday and Wednesday), forgetting Monday.",
        rootCause: "Incomplete Sum — omits one of the three values from the total.",
        remediation: "The total must include ALL THREE days — add Monday (12), Tuesday (18), AND Wednesday (15): 12+18+15=45, not just two of them."
      },
      {
        misconceptionId: "E-w4-c",
        description: "Student reports only Wednesday's individual value instead of the sum of all three days.",
        rootCause: "Individual Value Reported Instead of Total — confuses one value with the requested sum.",
        remediation: "The question asks for the TOTAL (sum of all three days), not any single day's value — add 12+18+15=45, not just Wednesday's 15."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "List all three values", hint: "Monday 12, Tuesday 18, Wednesday 15." },
      { level: 2, description: "Add the first two", hint: "12 + 18 = 30." },
      { level: 3, description: "Add the third", hint: "30 + 15 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "w5",
    order: 5,
    cluster: "VOCAB",
    clusterName: CLUSTER_NAMES.VOCAB,
    skillId: "DHVOCAB-02",
    question: "A bag has 5 red balls and 1 blue ball. You pick one ball. The chance of picking a red ball is:",
    options: [
        { text: "Likely", correct: true, feedback: "Most balls are red, so it is likely, but not certain." },
        { text: "Certain", correct: false, feedback: "There is still a blue ball, so not 100% sure.", misconceptionId: "E-w5-a" },
        { text: "Equally likely", correct: false, feedback: "Red and blue are not equal in number.", misconceptionId: "E-w5-b" },
        { text: "Unlikely", correct: false, feedback: "With 5 out of 6 being red, it's likely, not unlikely.", misconceptionId: "E-w5-c" }
      ],
    retryHint: "If there are more of one colour, that colour is likely.",
    misconceptions: [
      {
        misconceptionId: "E-w5-a",
        description: "Student assumes having MOST of a colour means picking it is 'certain', not recognising some chance of the other colour remains.",
        rootCause: "Vocabulary Precision Gap — confuses 'most likely' with 'certain' (100% guaranteed).",
        remediation: "'Certain' means the ONLY possible outcome — but there's still 1 blue ball, so picking blue remains possible; red is 'likely' (probable but not guaranteed), not certain."
      },
      {
        misconceptionId: "E-w5-b",
        description: "Student assumes 'equally likely' since both colours exist, without recognising red (5 balls) is far more common than blue (1 ball).",
        rootCause: "Vocabulary Precision Gap — confuses 'both are present' with 'both are equally probable'.",
        remediation: "'Equally likely' requires the SAME number for each outcome — but red has 5 balls and blue has only 1, making them NOT equal; red is simply more likely."
      },
      {
        misconceptionId: "E-w5-c",
        description: "Student reverses the meaning, calling the majority colour (red, 5 out of 6) 'unlikely' instead of 'likely'.",
        rootCause: "Vocabulary Precision Gap — mislabels a HIGH-probability event as low-probability.",
        remediation: "'Unlikely' means LESS probable — but red balls (5) vastly outnumber blue (1), making red the MORE probable, 'likely' outcome, not unlikely."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Count each colour", hint: "5 red balls, 1 blue ball." },
      { level: 2, description: "Compare the counts", hint: "Red vastly outnumbers blue, but blue still exists." },
      { level: 3, description: "Choose the matching vocabulary word", hint: "A colour that's more common but not the only one is described as...?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "w6",
    order: 6,
    cluster: "SCALE",
    clusterName: CLUSTER_NAMES.SCALE,
    skillId: "DHPICTO-02",
    question: "Pictograph key: 1 star = 5 points. There are 4 full stars and one half star. How many points?",
    options: [
        { text: "22.5", correct: true, feedback: "4 × 5 = 20; half of 5 = 2.5; total = 22.5." },
        { text: "20", correct: false, feedback: "You forgot the half star.", misconceptionId: "E-w6-a" },
        { text: "25", correct: false, feedback: "You counted the half as a full star.", misconceptionId: "E-w6-b" },
        { text: "4.5", correct: false, feedback: "You forgot to multiply by the key value.", misconceptionId: "E-w6-c" }
      ],
    retryHint: "Multiply full stars by 5; a half star adds 2.5. Sum them.",
    misconceptions: [
      {
        misconceptionId: "E-w6-a",
        description: "Student computes the full stars' total (4×5=20) but forgets to add the half star's contribution.",
        rootCause: "Half-Symbol Contribution Omitted — stops after counting only the full symbols.",
        remediation: "There's ALSO a half star worth 2.5 points (half of 5) — add this to the full-symbol total: 20+2.5=22.5, not just 20."
      },
      {
        misconceptionId: "E-w6-b",
        description: "Student treats the half star as if it were a full star, using 5 full symbols worth 5 each instead of 4 full plus a half.",
        rootCause: "Half Symbol Miscounted as Full — doesn't distinguish a half symbol's reduced value from a full symbol's value.",
        remediation: "The half star is worth HALF of 5 (which is 2.5), not the full 5 — total = (4×5) + 2.5 = 22.5, not (5×5) = 25."
      },
      {
        misconceptionId: "E-w6-c",
        description: "Student adds the symbol counts (4+0.5=4.5) instead of multiplying by the key value.",
        rootCause: "Key Multiplication Omitted — treats the symbol count itself as the final answer without multiplying by the key.",
        remediation: "4.5 is just the NUMBER of symbols (4 full + half) — you must multiply by the key value (5 points per symbol): 4.5×5=22.5, not 4.5 itself."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Compute the full symbols' total", hint: "4 × 5 = 20." },
      { level: 2, description: "Compute the half symbol's value", hint: "Half of 5 = 2.5." },
      { level: 3, description: "Add them together", hint: "20 + 2.5 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.3.MD.B.3"]
  },
  {
    itemId: "w7",
    order: 7,
    cluster: "BAR",
    clusterName: CLUSTER_NAMES.BAR,
    skillId: "DHBAR-06",
    question: "A bar graph shows Monday: 35, Tuesday: 20. How many more on Monday?",
    options: [
        { text: "15", correct: true, feedback: "35 − 20 = 15." },
        { text: "55", correct: false, feedback: "You added the two numbers.", misconceptionId: "E-w7-a" },
        { text: "20", correct: false, feedback: "That's Tuesday's value.", misconceptionId: "E-w7-b" },
        { text: "35", correct: false, feedback: "That's Monday's value.", misconceptionId: "E-w7-c" }
      ],
    retryHint: "Subtract the smaller bar from the larger bar.",
    misconceptions: [
      {
        misconceptionId: "E-w7-a",
        description: "Student adds the two values instead of subtracting to find 'how many more'.",
        rootCause: "Operation Selection Error — adds when the question ('how many more') calls for subtraction.",
        remediation: "'How many more' means the DIFFERENCE, not the sum — subtract 35-20=15, don't add 35+20=55."
      },
      {
        misconceptionId: "E-w7-b",
        description: "Student reports Tuesday's value instead of computing the difference between the two days.",
        rootCause: "Wrong Value Reported — confuses one day's value with the requested difference.",
        remediation: "The question asks how many MORE were on Monday, not either day's value alone — subtract: 35-20=15, not just Tuesday's 20."
      },
      {
        misconceptionId: "E-w7-c",
        description: "Student reports Monday's value instead of computing the difference between the two days.",
        rootCause: "Wrong Value Reported — confuses one day's value with the requested difference.",
        remediation: "The question asks how many MORE were on Monday than Tuesday, which is the DIFFERENCE (15), not Monday's raw value (35)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify both values", hint: "Monday = 35, Tuesday = 20." },
      { level: 2, description: "Recognise 'how many more' means subtraction", hint: "Subtract the smaller from the larger." },
      { level: 3, description: "Compute", hint: "35 - 20 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.3.MD.B.3"]
  },
  {
    itemId: "w8",
    order: 8,
    cluster: "LINE",
    clusterName: CLUSTER_NAMES.LINE,
    skillId: "DHLINE-03",
    question: "A line graph shows a plant's height: week 1 = 5 cm, week 3 = 11 cm. How much did it grow from week 1 to week 3?",
    options: [
        { text: "6 cm", correct: true, feedback: "11 − 5 = 6 cm." },
        { text: "5 cm", correct: false, feedback: "That's the starting height.", misconceptionId: "E-w8-a" },
        { text: "11 cm", correct: false, feedback: "That's the final height.", misconceptionId: "E-w8-b" },
        { text: "16 cm", correct: false, feedback: "You added instead of subtracted.", misconceptionId: "E-w8-c" }
      ],
    retryHint: "Final height minus starting height.",
    misconceptions: [
      {
        misconceptionId: "E-w8-a",
        description: "Student reports the starting height instead of computing the growth (the difference between start and end).",
        rootCause: "Wrong Value Reported — confuses one endpoint value with the requested change.",
        remediation: "'Grow' means the CHANGE in height, not either individual reading — subtract the starting (5) from the final (11): 11-5=6."
      },
      {
        misconceptionId: "E-w8-b",
        description: "Student reports the final height instead of computing the growth (the difference between start and end).",
        rootCause: "Wrong Value Reported — confuses one endpoint value with the requested change.",
        remediation: "'Grow' means the CHANGE in height, not either individual reading — subtract the starting (5) from the final (11): 11-5=6."
      },
      {
        misconceptionId: "E-w8-c",
        description: "Student adds the two heights instead of subtracting to find the growth.",
        rootCause: "Operation Selection Error — adds when the question ('how much did it grow') calls for subtraction.",
        remediation: "Growth is found by SUBTRACTING the starting height from the final height, not adding them: 11-5=6, not 11+5=16."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the starting and ending heights", hint: "Week 1 = 5 cm, week 3 = 11 cm." },
      { level: 2, description: "Recognise 'grow' means the change", hint: "Subtract the starting height from the final height." },
      { level: 3, description: "Compute", hint: "11 - 5 = ?" }
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
    skillId: "DHPICTO-03",
    question: "Key: 1 book symbol = 6 books. Class A has 7 symbols; Class B has 4 symbols. How many more books did Class A read?",
    options: [
        { text: "18", correct: true, feedback: "A = 7×6 = 42; B = 4×6 = 24; 42 − 24 = 18." },
        { text: "3", correct: false, feedback: "You only compared the symbols (7−4) without multiplying by the key.", misconceptionId: "E-d1-a" },
        { text: "42", correct: false, feedback: "That's Class A's total only.", misconceptionId: "E-d1-b" },
        { text: "24", correct: false, feedback: "That's Class B's total only.", misconceptionId: "E-d1-c" }
      ],
    backward: "Multiply the symbols for each class by the key value, then subtract.",
    forward: "Comparing categories is the main purpose of pictographs.",
    misconceptions: [
      {
        misconceptionId: "E-d1-a",
        description: "Student subtracts the raw symbol counts (7-4=3) without first converting them to actual book counts using the key.",
        rootCause: "Key Conversion Skipped Before Comparing — compares symbol counts directly instead of the actual quantities they represent.",
        remediation: "Convert BOTH classes to actual books first (A=7×6=42, B=4×6=24), THEN subtract: 42-24=18 — don't subtract the raw symbol counts."
      },
      {
        misconceptionId: "E-d1-b",
        description: "Student reports Class A's total instead of computing the DIFFERENCE between the two classes.",
        rootCause: "Final Subtraction Step Omitted — stops after computing one class's total, without comparing to the other.",
        remediation: "The question asks how many MORE books Class A read — compute BOTH totals AND subtract them: 42-24=18, not just Class A's total (42)."
      },
      {
        misconceptionId: "E-d1-c",
        description: "Student reports Class B's total instead of computing the DIFFERENCE between the two classes.",
        rootCause: "Wrong Value Reported — confuses one class's total with the requested difference.",
        remediation: "The question asks for the DIFFERENCE between the two classes' totals, not either class's total alone — compute both (42 and 24), then subtract."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Convert Class A's symbols to books", hint: "7 × 6 = 42." },
      { level: 2, description: "Convert Class B's symbols to books", hint: "4 × 6 = 24." },
      { level: 3, description: "Find the difference", hint: "42 - 24 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.3.MD.B.3"]
  },
  {
    itemId: "d2",
    order: 2,
    cluster: "BAR",
    clusterName: CLUSTER_NAMES.BAR,
    skillId: "DHBAR-07",
    question: "A bar graph shows: Monday 45, Tuesday 30, Wednesday 50. What is the total?",
    options: [
        { text: "125", correct: true, feedback: "45 + 30 + 50 = 125." },
        { text: "80", correct: false, feedback: "You only added Monday and Wednesday.", misconceptionId: "E-d2-a" },
        { text: "95", correct: false, feedback: "Tuesday + Wednesday.", misconceptionId: "E-d2-b" },
        { text: "105", correct: false, feedback: "Incorrect addition.", misconceptionId: "E-d2-c" }
      ],
    backward: "Add the values of all three bars.",
    forward: "Totals help summarise data.",
    misconceptions: [
      {
        misconceptionId: "E-d2-a",
        description: "Student adds only two of the three bars (Monday and Wednesday), forgetting Tuesday.",
        rootCause: "Incomplete Sum — omits one of the three values from the total.",
        remediation: "The total must include ALL THREE bars — add Monday (45), Tuesday (30), AND Wednesday (50): 45+30+50=125, not just two of them."
      },
      {
        misconceptionId: "E-d2-b",
        description: "Student adds only two of the three bars (Tuesday and Wednesday), forgetting Monday.",
        rootCause: "Incomplete Sum — omits one of the three values from the total.",
        remediation: "The total must include ALL THREE bars — add Monday (45), Tuesday (30), AND Wednesday (50): 45+30+50=125, not just two of them."
      },
      {
        misconceptionId: "E-d2-c",
        description: "Student makes an arithmetic slip while adding the three values, landing on an incorrect sum.",
        rootCause: "Computation Error — correct approach (adding all three), but the addition itself is carried out incorrectly.",
        remediation: "Re-add carefully, one pair at a time: 45+30=75, then 75+50=125 — double-check each step."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "List all three values", hint: "Monday 45, Tuesday 30, Wednesday 50." },
      { level: 2, description: "Add the first two", hint: "45 + 30 = 75." },
      { level: 3, description: "Add the third", hint: "75 + 50 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d3",
    order: 3,
    cluster: "LINE",
    clusterName: CLUSTER_NAMES.LINE,
    skillId: "DHLINE-03",
    question: "A line graph shows sales: January ₹2,000; February ₹2,500. What is the increase from January to February?",
    options: [
        { text: "₹500", correct: true, feedback: "2500 − 2000 = ₹500." },
        { text: "₹2,000", correct: false, feedback: "That's January's value.", misconceptionId: "E-d3-a" },
        { text: "₹2,500", correct: false, feedback: "That's February's value.", misconceptionId: "E-d3-b" },
        { text: "₹4,500", correct: false, feedback: "You added instead of subtracted.", misconceptionId: "E-d3-c" }
      ],
    backward: "Subtract the earlier value from the later value.",
    forward: "Line graphs are excellent for showing growth.",
    misconceptions: [
      {
        misconceptionId: "E-d3-a",
        description: "Student reports January's value instead of computing the increase (the difference between the two months).",
        rootCause: "Wrong Value Reported — confuses one month's value with the requested change.",
        remediation: "'Increase' means the CHANGE between the two values, not either reading alone — subtract January (2000) from February (2500): 2500-2000=500."
      },
      {
        misconceptionId: "E-d3-b",
        description: "Student reports February's value instead of computing the increase (the difference between the two months).",
        rootCause: "Wrong Value Reported — confuses one month's value with the requested change.",
        remediation: "'Increase' means the CHANGE between the two values, not either reading alone — subtract January (2000) from February (2500): 2500-2000=500."
      },
      {
        misconceptionId: "E-d3-c",
        description: "Student adds the two sales values instead of subtracting to find the increase.",
        rootCause: "Operation Selection Error — adds when the question ('increase') calls for subtraction.",
        remediation: "'Increase' is found by SUBTRACTING the earlier value from the later value, not adding them: 2500-2000=500, not 2500+2000=4500."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify both values", hint: "January = ₹2,000, February = ₹2,500." },
      { level: 2, description: "Recognise 'increase' means the change", hint: "Subtract the earlier value from the later value." },
      { level: 3, description: "Compute", hint: "2500 - 2000 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d4",
    order: 4,
    cluster: "TABLE",
    clusterName: CLUSTER_NAMES.TABLE,
    skillId: "DHTABLE-04",
    question: "A table shows: Class A 28 students, Class B 32 students, Class C 25 students. Which class has the most students?",
    options: [
        { text: "Class B", correct: true, feedback: "32 is the largest number." },
        { text: "Class A", correct: false, feedback: "28 < 32.", misconceptionId: "E-d4-a" },
        { text: "Class C", correct: false, feedback: "25 is the smallest.", misconceptionId: "E-d4-b" },
        { text: "All equal", correct: false, feedback: "The numbers are different.", misconceptionId: "E-d4-c" }
      ],
    backward: "Find the row with the highest number.",
    forward: "Tables organise data for easy comparison.",
    misconceptions: [
      {
        misconceptionId: "E-d4-a",
        description: "Student picks Class A, possibly because it is listed first, without comparing all three values.",
        rootCause: "First-Value Bias — selects the first-listed option instead of comparing all values.",
        remediation: "Compare ALL THREE values before choosing — 28 (A), 32 (B), 25 (C). 32 is the largest, so Class B has the most, not Class A."
      },
      {
        misconceptionId: "E-d4-b",
        description: "Student picks Class C, the class with the SMALLEST number, mistaking 'most' for 'least'.",
        rootCause: "Vocabulary Reversal — confuses 'most' (largest) with 'least' (smallest).",
        remediation: "'Most' means the LARGEST number, not the smallest — 25 is the smallest value (Class C); the largest is 32 (Class B)."
      },
      {
        misconceptionId: "E-d4-c",
        description: "Student assumes the values are equal without actually comparing the numbers 28, 32, and 25.",
        rootCause: "Values Not Actually Compared — fails to notice the numbers differ.",
        remediation: "Look closely: 28, 32, and 25 are three DIFFERENT numbers — they are not equal. Compare them to find the largest, which is 32 (Class B)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "List all three values", hint: "Class A = 28, Class B = 32, Class C = 25." },
      { level: 2, description: "Compare them", hint: "Which number is the largest?" },
      { level: 3, description: "Match to the class", hint: "32 belongs to which class?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d5",
    order: 5,
    cluster: "VOCAB",
    clusterName: CLUSTER_NAMES.VOCAB,
    skillId: "DHVOCAB-02",
    question: "A spinner has 4 equal sections: 3 green, 1 yellow. Landing on yellow is best described as:",
    options: [
        { text: "Unlikely", correct: true, feedback: "Only 1 out of 4 sections is yellow, so it is unlikely." },
        { text: "Likely", correct: false, feedback: "3 green sections make green likely; yellow is not.", misconceptionId: "E-d5-a" },
        { text: "Certain", correct: false, feedback: "It is not certain — green could come.", misconceptionId: "E-d5-b" },
        { text: "Impossible", correct: false, feedback: "It is possible because there is a yellow section.", misconceptionId: "E-d5-c" }
      ],
    backward: "With only 1 out of 4, it is not impossible but less likely.",
    forward: "Probability words help us describe chance events.",
    misconceptions: [
      {
        misconceptionId: "E-d5-a",
        description: "Student confuses the majority colour's likelihood (green) with the minority colour (yellow) being asked about.",
        rootCause: "Wrong Outcome Evaluated — describes the majority outcome's chance instead of the minority outcome actually asked about.",
        remediation: "The question asks about YELLOW, not green — yellow has only 1 out of 4 sections, making it 'unlikely', while green (3 out of 4) would be 'likely'."
      },
      {
        misconceptionId: "E-d5-b",
        description: "Student assumes having ANY section of a colour makes landing on it 'certain', not recognising other outcomes are also possible.",
        rootCause: "Vocabulary Precision Gap — confuses 'possible' with 'certain' (100% guaranteed).",
        remediation: "'Certain' means the ONLY possible outcome — but 3 green sections could also come up, so yellow is merely 'unlikely' (possible but less probable), not certain."
      },
      {
        misconceptionId: "E-d5-c",
        description: "Student assumes a small chance (1 out of 4) means the event cannot happen at all.",
        rootCause: "Vocabulary Precision Gap — confuses 'low probability' with 'zero probability' (impossible).",
        remediation: "'Impossible' means it CANNOT happen at all — but there IS 1 yellow section, so it CAN happen; a small but real chance is 'unlikely', not impossible."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Count each colour", hint: "3 green sections, 1 yellow section, out of 4 total." },
      { level: 2, description: "Compare yellow's share to the whole", hint: "Yellow is only 1 out of 4 — a small share." },
      { level: 3, description: "Choose the matching vocabulary word", hint: "A small but real chance is described as...?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d6",
    order: 6,
    cluster: "SCALE",
    clusterName: CLUSTER_NAMES.SCALE,
    skillId: "DHSCALE-04",
    question: "A bar graph's y‑axis is labelled 0, 10, 20, 30. A bar ends exactly halfway between 20 and 30. What is its value?",
    options: [
        { text: "25", correct: true, feedback: "Halfway between 20 and 30 is (20+30)÷2 = 25." },
        { text: "20", correct: false, feedback: "That's the lower mark.", misconceptionId: "E-d6-a" },
        { text: "30", correct: false, feedback: "That's the upper mark.", misconceptionId: "E-d6-b" },
        { text: "15", correct: false, feedback: "That's halfway between 10 and 20.", misconceptionId: "E-d6-c" }
      ],
    backward: "Halfway between two numbers is their average.",
    forward: "Reading between marks is a key graph skill.",
    misconceptions: [
      {
        misconceptionId: "E-d6-a",
        description: "Student rounds down to the lower gridline (20) instead of computing the actual midpoint value.",
        rootCause: "Midpoint Not Computed — reads the nearest lower mark instead of averaging the two surrounding marks.",
        remediation: "'Halfway between 20 and 30' means the AVERAGE of the two marks, not the lower one — (20+30)÷2=25, not 20."
      },
      {
        misconceptionId: "E-d6-b",
        description: "Student rounds up to the upper gridline (30) instead of computing the actual midpoint value.",
        rootCause: "Midpoint Not Computed — reads the nearest upper mark instead of averaging the two surrounding marks.",
        remediation: "'Halfway between 20 and 30' means the AVERAGE of the two marks, not the upper one — (20+30)÷2=25, not 30."
      },
      {
        misconceptionId: "E-d6-c",
        description: "Student computes the midpoint of the WRONG pair of gridlines (10 and 20) instead of the pair given in the question (20 and 30).",
        rootCause: "Wrong Interval Selected — uses a neighbouring interval instead of the one specified in the question.",
        remediation: "The question specifies halfway between 20 AND 30 — use exactly that pair: (20+30)÷2=25, not the interval below it (10 to 20)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the two surrounding marks", hint: "The point lies between 20 and 30." },
      { level: 2, description: "Recognise 'halfway' means average", hint: "Add the two marks and divide by 2." },
      { level: 3, description: "Compute", hint: "(20 + 30) ÷ 2 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d7",
    order: 7,
    cluster: "PICTO",
    clusterName: CLUSTER_NAMES.PICTO,
    skillId: "DHPICTO-04",
    question: "Key: 1 circle = 5 students. Music: 3 full circles and 1 half circle. Art: 2 full circles. How many students in total?",
    options: [
        { text: "27.5", correct: true, feedback: "Music = 3×5 + 2.5 = 17.5; Art = 2×5 = 10; total = 27.5." },
        { text: "25", correct: false, feedback: "You ignored the half symbol.", misconceptionId: "E-d7-a" },
        { text: "30", correct: false, feedback: "You counted the half as a full symbol.", misconceptionId: "E-d7-b" },
        { text: "5", correct: false, feedback: "You only wrote the key value.", misconceptionId: "E-d7-c" }
      ],
    backward: "Multiply full symbols by 5, half symbols by 2.5; add for each category, then sum.",
    forward: "Totals with half symbols require careful multiplication.",
    misconceptions: [
      {
        misconceptionId: "E-d7-a",
        description: "Student computes Music (3×5=15) and Art (2×5=10) totals but forgets to add the half circle's 2.5 contribution.",
        rootCause: "Half-Symbol Contribution Omitted — stops after counting only the full symbols across both categories.",
        remediation: "Music has a half circle worth 2.5 in ADDITION to its 3 full circles (3×5=15) — Music total is 15+2.5=17.5, then add Art's 10: 17.5+10=27.5, not 25."
      },
      {
        misconceptionId: "E-d7-b",
        description: "Student treats the half circle as if it were a full circle, using 4 full symbols for Music instead of 3 full plus a half.",
        rootCause: "Half Symbol Miscounted as Full — doesn't distinguish a half symbol's reduced value from a full symbol's value.",
        remediation: "The half circle is worth HALF of 5 (which is 2.5), not the full 5 — Music = (3×5)+2.5=17.5, not (4×5)=20; total = 17.5+10=27.5, not 30."
      },
      {
        misconceptionId: "E-d7-c",
        description: "Student reports the key value itself (5) instead of computing and summing both categories' totals.",
        rootCause: "Key Value Confused With Final Answer — stops at the conversion rate instead of applying it to the data.",
        remediation: "5 is just the KEY (points per symbol), not the answer — you must multiply it by the symbol counts for each category and add: (3×5+2.5)+(2×5)=27.5."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Compute Music's total", hint: "3 full circles = 15; half circle = 2.5; Music = 17.5." },
      { level: 2, description: "Compute Art's total", hint: "2 full circles = 2 × 5 = 10." },
      { level: 3, description: "Add both categories", hint: "17.5 + 10 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.3.MD.B.3"]
  },
  {
    itemId: "d8",
    order: 8,
    cluster: "BAR",
    clusterName: CLUSTER_NAMES.BAR,
    skillId: "DHBAR-06",
    question: "A bar graph shows City A: 400 mm rain; City B: 250 mm rain. How much more rain fell in City A?",
    options: [
        { text: "150 mm", correct: true, feedback: "400 − 250 = 150 mm." },
        { text: "650 mm", correct: false, feedback: "You added instead of subtracted.", misconceptionId: "E-d8-a" },
        { text: "400 mm", correct: false, feedback: "That's City A's total.", misconceptionId: "E-d8-b" },
        { text: "250 mm", correct: false, feedback: "That's City B's total.", misconceptionId: "E-d8-c" }
      ],
    backward: "Subtract the smaller value from the larger.",
    forward: "Differences highlight how much more or less.",
    misconceptions: [
      {
        misconceptionId: "E-d8-a",
        description: "Student adds the two rainfall values instead of subtracting to find 'how much more'.",
        rootCause: "Operation Selection Error — adds when the question ('how much more') calls for subtraction.",
        remediation: "'How much more' means the DIFFERENCE, not the sum — subtract 400-250=150, don't add 400+250=650."
      },
      {
        misconceptionId: "E-d8-b",
        description: "Student reports City A's value instead of computing the difference between the two cities.",
        rootCause: "Wrong Value Reported — confuses one city's value with the requested difference.",
        remediation: "The question asks how much MORE rain fell in City A, not City A's raw total — subtract: 400-250=150, not just City A's 400."
      },
      {
        misconceptionId: "E-d8-c",
        description: "Student reports City B's value instead of computing the difference between the two cities.",
        rootCause: "Wrong Value Reported — confuses one city's value with the requested difference.",
        remediation: "The question asks for the difference between the two cities' rainfall, not either city's raw total — subtract: 400-250=150, not just City B's 250."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify both values", hint: "City A = 400 mm, City B = 250 mm." },
      { level: 2, description: "Recognise 'how much more' means subtraction", hint: "Subtract the smaller from the larger." },
      { level: 3, description: "Compute", hint: "400 - 250 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d9",
    order: 9,
    cluster: "LINE",
    clusterName: CLUSTER_NAMES.LINE,
    skillId: "DHLINE-04",
    question: "A line graph shows temperature: 6 AM 18°C, 8 AM 20°C, 10 AM 24°C. Between which two hours did the temperature rise the most?",
    options: [
        { text: "8 AM to 10 AM", correct: true, feedback: "6−8: +2°C; 8−10: +4°C. The largest rise is 4°C." },
        { text: "6 AM to 8 AM", correct: false, feedback: "That rise was only 2°C.", misconceptionId: "E-d9-a" },
        { text: "Both are equal", correct: false, feedback: "2°C and 4°C are not equal.", misconceptionId: "E-d9-b" },
        { text: "Cannot say", correct: false, feedback: "We can calculate the rises.", misconceptionId: "E-d9-c" }
      ],
    backward: "Calculate the rise for each interval; compare.",
    forward: "Identifying the steepest part of a line graph is a key analytical skill.",
    misconceptions: [
      {
        misconceptionId: "E-d9-a",
        description: "Student picks the first interval (6 AM to 8 AM) without comparing its rise (2°C) to the second interval's rise (4°C).",
        rootCause: "Intervals Not Actually Compared — selects an interval without computing and comparing both rises.",
        remediation: "Compute BOTH rises before choosing: 6AM→8AM is +2°C, 8AM→10AM is +4°C — the SECOND interval has the larger rise, so it's the answer, not the first."
      },
      {
        misconceptionId: "E-d9-b",
        description: "Student assumes both intervals rise by the same amount without actually computing each difference.",
        rootCause: "Intervals Not Actually Compared — assumes equality instead of computing and comparing both rises.",
        remediation: "Compute each rise separately: 20-18=2°C for the first interval, 24-20=4°C for the second — these are NOT equal; 4°C is larger."
      },
      {
        misconceptionId: "E-d9-c",
        description: "Student assumes the rises cannot be determined, when the graph provides enough data to calculate both differences.",
        rootCause: "Available Data Underused — treats calculable data as insufficient.",
        remediation: "All three temperature readings are given (18, 20, 24), so both interval rises CAN be calculated: +2°C and +4°C — compare them to find the answer."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Compute the first interval's rise", hint: "6 AM to 8 AM: 20 - 18 = 2°C." },
      { level: 2, description: "Compute the second interval's rise", hint: "8 AM to 10 AM: 24 - 20 = 4°C." },
      { level: 3, description: "Compare the two rises", hint: "Which rise is larger, 2°C or 4°C?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d10",
    order: 10,
    cluster: "TABLE",
    clusterName: CLUSTER_NAMES.TABLE,
    skillId: "DHTABLE-05",
    question: "A daily food bill: Monday ₹120, Tuesday ₹180, Wednesday ₹150. What is the average bill per day?",
    options: [
        { text: "₹150", correct: true, feedback: "(120+180+150) ÷ 3 = 450 ÷ 3 = ₹150." },
        { text: "₹450", correct: false, feedback: "That's the total, not the average.", misconceptionId: "E-d10-a" },
        { text: "₹180", correct: false, feedback: "That's Tuesday's bill only.", misconceptionId: "E-d10-b" },
        { text: "₹120", correct: false, feedback: "That's Monday's bill only.", misconceptionId: "E-d10-c" }
      ],
    backward: "Add the three numbers, then divide by 3.",
    forward: "The average gives a typical value for the data.",
    misconceptions: [
      {
        misconceptionId: "E-d10-a",
        description: "Student computes the total (sum) but forgets the final division step needed to find the average.",
        rootCause: "Division Step Omitted — stops after summing, without dividing by the number of values.",
        remediation: "The average requires dividing the total by the NUMBER of days — 450 ÷ 3 = 150, don't stop at the total (450) itself."
      },
      {
        misconceptionId: "E-d10-b",
        description: "Student reports one day's individual value (Tuesday) instead of computing the average across all three days.",
        rootCause: "Individual Value Reported Instead of Average — confuses one data point with the requested summary statistic.",
        remediation: "The average must use ALL THREE days, not just one — add all three (120+180+150=450) then divide by 3: 450÷3=150, not just Tuesday's 180."
      },
      {
        misconceptionId: "E-d10-c",
        description: "Student reports one day's individual value (Monday) instead of computing the average across all three days.",
        rootCause: "Individual Value Reported Instead of Average — confuses one data point with the requested summary statistic.",
        remediation: "The average must use ALL THREE days, not just one — add all three (120+180+150=450) then divide by 3: 450÷3=150, not just Monday's 120."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Add all three values", hint: "120 + 180 + 150 = 450." },
      { level: 2, description: "Count the number of days", hint: "There are 3 days." },
      { level: 3, description: "Divide the total by the count", hint: "450 ÷ 3 = ?" }
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
    question: "A bag contains 2 red, 2 blue, and 2 green balls. Picking a red ball is:",
    options: [
        { text: "Equally likely", correct: true, feedback: "Each colour has the same number of balls, so all three colours are equally likely." },
        { text: "Certain", correct: false, feedback: "Other colours could also be picked.", misconceptionId: "E-d11-a" },
        { text: "Likely", correct: false, feedback: "It's not more likely than blue or green.", misconceptionId: "E-d11-b" },
        { text: "Unlikely", correct: false, feedback: "It's not unlikely — it has the same chance as the others.", misconceptionId: "E-d11-c" }
      ],
    backward: "Because all colours have the same count, they have the same chance.",
    forward: "Equally likely is the foundation of fair games.",
    misconceptions: [
      {
        misconceptionId: "E-d11-a",
        description: "Student assumes red being present in the bag means picking it is 'certain', ignoring that blue and green balls are also present.",
        rootCause: "Vocabulary Precision Gap — confuses 'possible' with 'certain' (100% guaranteed).",
        remediation: "'Certain' means the ONLY possible outcome — but blue and green balls are also in the bag, so red is merely 'equally likely' among the three colours, not certain."
      },
      {
        misconceptionId: "E-d11-b",
        description: "Student assumes red is 'more likely' without noticing that blue and green have the exact same count (2 each).",
        rootCause: "Counts Not Actually Compared — assumes one outcome is more probable without checking that all counts are equal.",
        remediation: "Compare the counts: red=2, blue=2, green=2 — they are ALL EQUAL, so no colour is more likely than another; the correct term is 'equally likely'."
      },
      {
        misconceptionId: "E-d11-c",
        description: "Student assumes red is 'unlikely' perhaps because there are only 2 out of 6 balls, without recognizing every colour has that same 2-out-of-6 share.",
        rootCause: "Fraction-of-Total Misjudged as Low Probability — treats a fair 1-in-3 share as automatically 'unlikely' without comparing it to the other colours' shares.",
        remediation: "Every colour has the SAME share (2 out of 6) — since none has a bigger or smaller share than another, none is more or less likely; they are 'equally likely', not unlikely."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Count each colour", hint: "2 red, 2 blue, 2 green." },
      { level: 2, description: "Compare the counts", hint: "Are the three counts the same or different?" },
      { level: 3, description: "Choose the matching vocabulary word", hint: "When all counts are equal, each outcome is...?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d12",
    order: 12,
    cluster: "SCALE",
    clusterName: CLUSTER_NAMES.SCALE,
    skillId: "DHPICTO-02",
    question: "Pictograph key: 1 tree symbol = 8 trees. There are 3 full symbols and one half symbol. How many trees?",
    options: [
        { text: "28", correct: true, feedback: "3 × 8 = 24; half of 8 = 4; total = 28." },
        { text: "32", correct: false, feedback: "You counted the half symbol as a full symbol.", misconceptionId: "E-d12-a" },
        { text: "24", correct: false, feedback: "You ignored the half symbol.", misconceptionId: "E-d12-b" },
        { text: "3.5", correct: false, feedback: "You didn't multiply by the key value.", misconceptionId: "E-d12-c" }
      ],
    backward: "Multiply full symbols by 8; half symbol = 4. Add.",
    forward: "Pictographs often use half symbols to show more precise data.",
    misconceptions: [
      {
        misconceptionId: "E-d12-a",
        description: "Student treats the half symbol as if it were a full symbol, using 4 full symbols instead of 3 full plus a half.",
        rootCause: "Half Symbol Miscounted as Full — doesn't distinguish a half symbol's reduced value from a full symbol's value.",
        remediation: "The half symbol is worth HALF of 8 (which is 4), not the full 8 — total = (3×8)+4=28, not (4×8)=32."
      },
      {
        misconceptionId: "E-d12-b",
        description: "Student computes the full symbols' total (3×8=24) but forgets to add the half symbol's contribution.",
        rootCause: "Half-Symbol Contribution Omitted — stops after counting only the full symbols.",
        remediation: "There's ALSO a half symbol worth 4 trees (half of 8) — add this to the full-symbol total: 24+4=28, not just 24."
      },
      {
        misconceptionId: "E-d12-c",
        description: "Student adds the symbol counts (3+0.5=3.5) instead of multiplying by the key value.",
        rootCause: "Key Multiplication Omitted — treats the symbol count itself as the final answer without multiplying by the key.",
        remediation: "3.5 is just the NUMBER of symbols (3 full + half) — you must multiply by the key value (8 trees per symbol): 3.5×8=28, not 3.5 itself."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Compute the full symbols' total", hint: "3 × 8 = 24." },
      { level: 2, description: "Compute the half symbol's value", hint: "Half of 8 = 4." },
      { level: 3, description: "Add them together", hint: "24 + 4 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.3.MD.B.3"]
  },
  {
    itemId: "d13",
    order: 13,
    cluster: "PICTO",
    clusterName: CLUSTER_NAMES.PICTO,
    skillId: "DHPICTO-05",
    question: "Key: 1 star = 10 votes. Candidate X: 2 stars and 1 half star. Candidate Y: 3 stars. Who got more votes, and by how much?",
    options: [
        { text: "Y by 5 votes", correct: true, feedback: "X = 2×10 + 5 = 25; Y = 3×10 = 30; Y wins by 5." },
        { text: "X by 5 votes", correct: false, feedback: "X has 25, Y has 30 — X is behind.", misconceptionId: "E-d13-a" },
        { text: "Y by 10 votes", correct: false, feedback: "Incorrect calculation.", misconceptionId: "E-d13-b" },
        { text: "Both equal", correct: false, feedback: "25 ≠ 30.", misconceptionId: "E-d13-c" }
      ],
    backward: "Calculate votes for each, then subtract.",
    forward: "Election results are often shown in pictographs.",
    misconceptions: [
      {
        misconceptionId: "E-d13-a",
        description: "Student correctly computes both totals (X=25, Y=30) but reverses who is ahead, saying X won instead of Y.",
        rootCause: "Comparison Direction Reversed — computes the right numbers but names the wrong winner.",
        remediation: "Compare the two totals carefully: X=25, Y=30 — since 30 > 25, Y has MORE votes and wins by 5, not X."
      },
      {
        misconceptionId: "E-d13-b",
        description: "Student makes an arithmetic slip computing the difference between the two totals, landing on 10 instead of 5.",
        rootCause: "Computation Error — correct approach, but the subtraction is carried out incorrectly.",
        remediation: "Recompute carefully: X = 2×10+5 = 25, Y = 3×10 = 30, difference = 30-25 = 5, not 10."
      },
      {
        misconceptionId: "E-d13-c",
        description: "Student assumes the two candidates tied without actually computing and comparing their vote totals.",
        rootCause: "Totals Not Actually Computed — assumes equality instead of calculating each candidate's votes.",
        remediation: "Compute each candidate's votes separately: X = (2×10)+5 = 25, Y = 3×10 = 30 — these are NOT equal; Y has 5 more votes."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Compute Candidate X's votes", hint: "2×10 + half of 10 = 20 + 5 = 25." },
      { level: 2, description: "Compute Candidate Y's votes", hint: "3 × 10 = 30." },
      { level: 3, description: "Compare and find the difference", hint: "30 - 25 = ? Who has more?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.3.MD.B.3"]
  },
  {
    itemId: "d14",
    order: 14,
    cluster: "BAR",
    clusterName: CLUSTER_NAMES.BAR,
    skillId: "DHBAR-08",
    question: "A bar graph shows Day 1: 80 and Day 2: 60. What fraction of the total does Day 1 represent? (Simplify your answer.)",
    options: [
        { text: "\\(\\frac{4}{7}\\)", correct: true, feedback: "Total = 80+60 = 140. Day 1 fraction = 80/140 = 8/14 = 4/7." },
        { text: "\\(\\frac{3}{7}\\)", correct: false, feedback: "That's Day 2's fraction (60/140 = 3/7).", misconceptionId: "E-d14-a" },
        { text: "\\(\\frac{1}{2}\\)", correct: false, feedback: "80/140 is not 1/2.", misconceptionId: "E-d14-b" },
        { text: "\\(\\frac{2}{3}\\)", correct: false, feedback: "80/140 simplifies to 4/7, not 2/3.", misconceptionId: "E-d14-c" }
      ],
    backward: "Write Day 1 over the total and simplify.",
    forward: "Bar graphs can be used to find proportions.",
    misconceptions: [
      {
        misconceptionId: "E-d14-a",
        description: "Student computes Day 2's fraction of the total instead of Day 1's, mixing up which value goes in the numerator.",
        rootCause: "Wrong Category Used as Numerator — computes the fraction for the wrong category.",
        remediation: "The question asks for DAY 1's fraction — put Day 1 (80) in the numerator, not Day 2 (60): 80/140=4/7, not 60/140=3/7."
      },
      {
        misconceptionId: "E-d14-b",
        description: "Student assumes the fraction is 1/2 without correctly computing and simplifying 80/140.",
        rootCause: "Simplification Skipped or Guessed — estimates a 'nice' fraction instead of computing the actual ratio.",
        remediation: "Actually divide: 80/140 — find the GCF of 80 and 140 (which is 20), then divide both by 20: 80÷20=4, 140÷20=7, giving 4/7, not 1/2."
      },
      {
        misconceptionId: "E-d14-c",
        description: "Student simplifies 80/140 incorrectly, landing on 2/3 instead of the correct 4/7.",
        rootCause: "Simplification Error — divides numerator and denominator by different or incorrect factors.",
        remediation: "To simplify 80/140, divide both by their GREATEST COMMON FACTOR (20): 80÷20=4 and 140÷20=7, giving 4/7 — not 2/3, which doesn't come from dividing both parts by the same number."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the total", hint: "80 + 60 = 140." },
      { level: 2, description: "Write Day 1 over the total", hint: "80/140." },
      { level: 3, description: "Simplify using the GCF", hint: "The GCF of 80 and 140 is 20. Divide both by 20." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.NF.A.1"]
  },
  {
    itemId: "d15",
    order: 15,
    cluster: "LINE",
    clusterName: CLUSTER_NAMES.LINE,
    skillId: "DHLINE-05",
    question: "A distance‑time graph shows: 2 PM: 10 km, 3 PM: 25 km. What was the speed between 2 PM and 3 PM?",
    options: [
        { text: "15 km/h", correct: true, feedback: "(25 − 10) ÷ 1 = 15 km/h." },
        { text: "10 km/h", correct: false, feedback: "That's the distance at 2 PM, not the speed.", misconceptionId: "E-d15-a" },
        { text: "25 km/h", correct: false, feedback: "That's the distance at 3 PM, not the speed.", misconceptionId: "E-d15-b" },
        { text: "35 km/h", correct: false, feedback: "You added instead of subtracted.", misconceptionId: "E-d15-c" }
      ],
    backward: "Speed = change in distance ÷ change in time.",
    forward: "Distance‑time graphs link data handling with speed.",
    misconceptions: [
      {
        misconceptionId: "E-d15-a",
        description: "Student reports the starting distance reading (10 km) instead of computing the speed from the change in distance.",
        rootCause: "Wrong Value Reported — confuses a raw distance reading with the computed speed.",
        remediation: "Speed is the CHANGE in distance divided by the change in time, not a raw reading — (25-10)÷1=15 km/h, not the starting distance (10)."
      },
      {
        misconceptionId: "E-d15-b",
        description: "Student reports the ending distance reading (25 km) instead of computing the speed from the change in distance.",
        rootCause: "Wrong Value Reported — confuses a raw distance reading with the computed speed.",
        remediation: "Speed is the CHANGE in distance divided by the change in time, not a raw reading — (25-10)÷1=15 km/h, not the ending distance (25)."
      },
      {
        misconceptionId: "E-d15-c",
        description: "Student adds the two distance readings instead of subtracting to find the change in distance.",
        rootCause: "Operation Selection Error — adds when finding the change requires subtraction.",
        remediation: "The change in distance is found by SUBTRACTING the earlier reading from the later one, not adding: 25-10=15, then ÷1 hour = 15 km/h, not 25+10=35."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the change in distance", hint: "25 - 10 = 15 km." },
      { level: 2, description: "Find the change in time", hint: "3 PM - 2 PM = 1 hour." },
      { level: 3, description: "Divide distance by time", hint: "15 km ÷ 1 hour = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d16",
    order: 16,
    cluster: "TABLE",
    clusterName: CLUSTER_NAMES.TABLE,
    skillId: "DHTABLE-03",
    question: "A table of fruit: Apples 20, Oranges 15, Bananas 25. What is the total number of fruits?",
    options: [
        { text: "60", correct: true, feedback: "20 + 15 + 25 = 60." },
        { text: "45", correct: false, feedback: "You missed one fruit.", misconceptionId: "E-d16-a" },
        { text: "50", correct: false, feedback: "Incorrect addition.", misconceptionId: "E-d16-b" },
        { text: "70", correct: false, feedback: "Too high.", misconceptionId: "E-d16-c" }
      ],
    backward: "Add all the numbers in the table.",
    forward: "Totals are the simplest summary statistic.",
    misconceptions: [
      {
        misconceptionId: "E-d16-a",
        description: "Student adds only two of the three fruits (Apples and Oranges), forgetting Bananas.",
        rootCause: "Incomplete Sum — omits one of the three values from the total.",
        remediation: "The total must include ALL THREE fruits — add Apples (20), Oranges (15), AND Bananas (25): 20+15+25=60, not just two of them."
      },
      {
        misconceptionId: "E-d16-b",
        description: "Student makes an arithmetic slip while adding the three values, landing on an incorrect sum lower than 60.",
        rootCause: "Computation Error — correct approach (adding all three), but the addition itself is carried out incorrectly.",
        remediation: "Re-add carefully, one pair at a time: 20+15=35, then 35+25=60 — double-check each step."
      },
      {
        misconceptionId: "E-d16-c",
        description: "Student makes an arithmetic slip while adding the three values, landing on an incorrect sum higher than 60.",
        rootCause: "Computation Error — correct approach (adding all three), but the addition itself is carried out incorrectly.",
        remediation: "Re-add carefully, one pair at a time: 20+15=35, then 35+25=60 — double-check each step, don't overshoot."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "List all three values", hint: "Apples 20, Oranges 15, Bananas 25." },
      { level: 2, description: "Add the first two", hint: "20 + 15 = 35." },
      { level: 3, description: "Add the third", hint: "35 + 25 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d17",
    order: 17,
    cluster: "VOCAB",
    clusterName: CLUSTER_NAMES.VOCAB,
    skillId: "DHVOCAB-04",
    question: "A fair six‑sided die is rolled. The chance of getting a number less than 7 is:",
    options: [
        { text: "Certain", correct: true, feedback: "All numbers on a die (1−6) are less than 7, so it will definitely happen." },
        { text: "Likely", correct: false, feedback: "It's more than likely — it's guaranteed.", misconceptionId: "E-d17-a" },
        { text: "Equally likely", correct: false, feedback: "All outcomes satisfy the condition, so it's certain.", misconceptionId: "E-d17-b" },
        { text: "Impossible", correct: false, feedback: "It will always happen.", misconceptionId: "E-d17-c" }
      ],
    backward: "Every possible outcome satisfies the condition, so it's certain.",
    forward: "Certain and impossible are the two extremes in probability.",
    misconceptions: [
      {
        misconceptionId: "E-d17-a",
        description: "Student underestimates the probability as merely 'likely' without checking that EVERY possible outcome (1-6) satisfies the condition.",
        rootCause: "All-Outcomes Check Skipped — doesn't verify whether every possible roll meets the condition.",
        remediation: "Check EVERY possible outcome: 1,2,3,4,5,6 are ALL less than 7 — since every single outcome satisfies the condition, it is 'certain', not merely 'likely'."
      },
      {
        misconceptionId: "E-d17-b",
        description: "Student picks 'equally likely', confusing it with a scenario where all outcomes are guaranteed rather than comparing outcomes of equal probability.",
        rootCause: "Vocabulary Precision Gap — confuses 'equally likely' (multiple outcomes with the same chance) with 'certain' (guaranteed to happen).",
        remediation: "'Equally likely' compares two or more DIFFERENT outcomes with the same chance — but here we're asking about ONE event that's guaranteed; since all 6 faces satisfy the condition, it's 'certain'."
      },
      {
        misconceptionId: "E-d17-c",
        description: "Student reverses the meaning, calling a guaranteed event 'impossible' instead of 'certain'.",
        rootCause: "Vocabulary Reversal — confuses 'certain' (will always happen) with 'impossible' (can never happen).",
        remediation: "'Impossible' means it can NEVER happen — but every number 1-6 IS less than 7, so this WILL always happen, making it 'certain', the opposite of impossible."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "List all possible outcomes", hint: "A die can show 1, 2, 3, 4, 5, or 6." },
      { level: 2, description: "Check each outcome against the condition", hint: "Is each number less than 7?" },
      { level: 3, description: "Choose the matching vocabulary word", hint: "If EVERY outcome satisfies the condition, the event is...?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d18",
    order: 18,
    cluster: "SCALE",
    clusterName: CLUSTER_NAMES.SCALE,
    skillId: "DHSCALE-04",
    question: "A line graph's y‑axis is labelled 0, 50, 100, 150. A point lies exactly halfway between 50 and 100. What is its value?",
    options: [
        { text: "75", correct: true, feedback: "(50 + 100) ÷ 2 = 75." },
        { text: "50", correct: false, feedback: "That's the lower mark.", misconceptionId: "E-d18-a" },
        { text: "100", correct: false, feedback: "That's the upper mark.", misconceptionId: "E-d18-b" },
        { text: "125", correct: false, feedback: "That's halfway between 100 and 150.", misconceptionId: "E-d18-c" }
      ],
    backward: "Halfway is the average of the two numbers.",
    forward: "Accurate reading is essential for correct interpretation.",
    misconceptions: [
      {
        misconceptionId: "E-d18-a",
        description: "Student rounds down to the lower gridline (50) instead of computing the actual midpoint value.",
        rootCause: "Midpoint Not Computed — reads the nearest lower mark instead of averaging the two surrounding marks.",
        remediation: "'Halfway between 50 and 100' means the AVERAGE of the two marks, not the lower one — (50+100)÷2=75, not 50."
      },
      {
        misconceptionId: "E-d18-b",
        description: "Student rounds up to the upper gridline (100) instead of computing the actual midpoint value.",
        rootCause: "Midpoint Not Computed — reads the nearest upper mark instead of averaging the two surrounding marks.",
        remediation: "'Halfway between 50 and 100' means the AVERAGE of the two marks, not the upper one — (50+100)÷2=75, not 100."
      },
      {
        misconceptionId: "E-d18-c",
        description: "Student computes the midpoint of the WRONG pair of gridlines (100 and 150) instead of the pair given in the question (50 and 100).",
        rootCause: "Wrong Interval Selected — uses a neighbouring interval instead of the one specified in the question.",
        remediation: "The question specifies halfway between 50 AND 100 — use exactly that pair: (50+100)÷2=75, not the interval above it (100 to 150)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the two surrounding marks", hint: "The point lies between 50 and 100." },
      { level: 2, description: "Recognise 'halfway' means average", hint: "Add the two marks and divide by 2." },
      { level: 3, description: "Compute", hint: "(50 + 100) ÷ 2 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d19",
    order: 19,
    cluster: "PICTO",
    clusterName: CLUSTER_NAMES.PICTO,
    skillId: "DHPICTO-06",
    question: "Key: 1 smiley = 2 people. Group A: 8 smileys; Group B: 6 smileys. How many people in total?",
    options: [
        { text: "28", correct: true, feedback: "A = 8×2 = 16; B = 6×2 = 12; total = 28." },
        { text: "14", correct: false, feedback: "You added the symbols only (8+6) without multiplying.", misconceptionId: "E-d19-a" },
        { text: "16", correct: false, feedback: "That's Group A only.", misconceptionId: "E-d19-b" },
        { text: "12", correct: false, feedback: "That's Group B only.", misconceptionId: "E-d19-c" }
      ],
    backward: "Multiply each group's symbols by 2, then add.",
    forward: "Pictographs can show combined totals.",
    misconceptions: [
      {
        misconceptionId: "E-d19-a",
        description: "Student adds the raw symbol counts (8+6=14) without first converting them to actual people using the key.",
        rootCause: "Key Conversion Skipped Before Combining — combines symbol counts directly instead of the actual quantities they represent.",
        remediation: "Convert BOTH groups to actual people first (A=8×2=16, B=6×2=12), THEN add: 16+12=28 — don't add the raw symbol counts (8+6=14)."
      },
      {
        misconceptionId: "E-d19-b",
        description: "Student reports Group A's total instead of computing the COMBINED total of both groups.",
        rootCause: "Final Addition Step Omitted — stops after computing one group's total, without adding the other.",
        remediation: "The question asks for the TOTAL across both groups — compute both totals AND add them: 16+12=28, not just Group A's total (16)."
      },
      {
        misconceptionId: "E-d19-c",
        description: "Student reports Group B's total instead of computing the COMBINED total of both groups.",
        rootCause: "Final Addition Step Omitted — stops after computing one group's total, without adding the other.",
        remediation: "The question asks for the TOTAL across both groups — compute both totals AND add them: 16+12=28, not just Group B's total (12)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Convert Group A's symbols to people", hint: "8 × 2 = 16." },
      { level: 2, description: "Convert Group B's symbols to people", hint: "6 × 2 = 12." },
      { level: 3, description: "Add the two totals", hint: "16 + 12 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.3.MD.B.3"]
  },
  {
    itemId: "d20",
    order: 20,
    cluster: "BAR",
    clusterName: CLUSTER_NAMES.BAR,
    skillId: "DHBAR-06",
    question: "A bar graph shows June: 45, July: 30. How many fewer in July?",
    options: [
        { text: "15", correct: true, feedback: "45 − 30 = 15." },
        { text: "75", correct: false, feedback: "You added the two values.", misconceptionId: "E-d20-a" },
        { text: "30", correct: false, feedback: "That's July's value.", misconceptionId: "E-d20-b" },
        { text: "45", correct: false, feedback: "That's June's value.", misconceptionId: "E-d20-c" }
      ],
    backward: "Subtract the smaller bar from the larger.",
    forward: "Differences are easy to spot in bar graphs.",
    misconceptions: [
      {
        misconceptionId: "E-d20-a",
        description: "Student adds the two values instead of subtracting to find 'how many fewer'.",
        rootCause: "Operation Selection Error — adds when the question ('how many fewer') calls for subtraction.",
        remediation: "'How many fewer' means the DIFFERENCE, not the sum — subtract 45-30=15, don't add 45+30=75."
      },
      {
        misconceptionId: "E-d20-b",
        description: "Student reports July's value instead of computing the difference between the two months.",
        rootCause: "Wrong Value Reported — confuses one month's value with the requested difference.",
        remediation: "The question asks how many FEWER were in July, not July's raw value — subtract: 45-30=15, not just July's 30."
      },
      {
        misconceptionId: "E-d20-c",
        description: "Student reports June's value instead of computing the difference between the two months.",
        rootCause: "Wrong Value Reported — confuses one month's value with the requested difference.",
        remediation: "The question asks for the difference between the two months, not June's raw value alone — subtract: 45-30=15, not just June's 45."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify both values", hint: "June = 45, July = 30." },
      { level: 2, description: "Recognise 'how many fewer' means subtraction", hint: "Subtract the smaller from the larger." },
      { level: 3, description: "Compute", hint: "45 - 30 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d21",
    order: 21,
    cluster: "LINE",
    clusterName: CLUSTER_NAMES.LINE,
    skillId: "DHLINE-04",
    question: "A line graph shows temperature: 8 AM 10°C, 12 PM 22°C, 4 PM 18°C. During which period did the temperature fall?",
    options: [
        { text: "12 PM to 4 PM", correct: true, feedback: "From 12 PM to 4 PM, the temperature went from 22°C down to 18°C." },
        { text: "8 AM to 12 PM", correct: false, feedback: "That's when the temperature rose.", misconceptionId: "E-d21-a" },
        { text: "Both periods", correct: false, feedback: "Only one period shows a fall.", misconceptionId: "E-d21-b" },
        { text: "Neither period", correct: false, feedback: "One period clearly goes down.", misconceptionId: "E-d21-c" }
      ],
    backward: "Look for a downward slope — the value goes down.",
    forward: "Line graphs can show both increases and decreases.",
    misconceptions: [
      {
        misconceptionId: "E-d21-a",
        description: "Student picks the period where the temperature ROSE (8 AM to 12 PM: 10°C→22°C) instead of where it fell.",
        rootCause: "Rise/Fall Confusion — identifies the wrong direction of change.",
        remediation: "Check the DIRECTION of change for each period: 8AM→12PM goes UP (10→22, a rise); 12PM→4PM goes DOWN (22→18, a fall) — the question asks for the fall, so the answer is 12PM to 4PM."
      },
      {
        misconceptionId: "E-d21-b",
        description: "Student claims both periods show a fall, without checking that the first period (8 AM to 12 PM) actually shows a rise.",
        rootCause: "Both Periods Not Actually Checked — assumes without verifying each interval's direction.",
        remediation: "Check each period individually: 8AM(10°C)→12PM(22°C) is a RISE, not a fall; only 12PM(22°C)→4PM(18°C) is a fall — so only one period shows a fall."
      },
      {
        misconceptionId: "E-d21-c",
        description: "Student claims neither period shows a fall, missing that the second period (12 PM to 4 PM) clearly decreases.",
        rootCause: "Direction of Change Overlooked — fails to notice a decreasing trend in the data.",
        remediation: "Compare 12 PM (22°C) to 4 PM (18°C): 18 is LESS than 22, so the temperature DID fall during that period."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Check the first period's direction", hint: "8 AM (10°C) to 12 PM (22°C): did it go up or down?" },
      { level: 2, description: "Check the second period's direction", hint: "12 PM (22°C) to 4 PM (18°C): did it go up or down?" },
      { level: 3, description: "Identify the falling period", hint: "Which period showed a decrease?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d22",
    order: 22,
    cluster: "TABLE",
    clusterName: CLUSTER_NAMES.TABLE,
    skillId: "DHTABLE-03",
    question: "A table shows: A = 35, B = 40, C = 45. What is the total?",
    options: [
        { text: "120", correct: true, feedback: "35 + 40 + 45 = 120." },
        { text: "80", correct: false, feedback: "Only A and B.", misconceptionId: "E-d22-a" },
        { text: "100", correct: false, feedback: "Incorrect addition.", misconceptionId: "E-d22-b" },
        { text: "110", correct: false, feedback: "Incorrect.", misconceptionId: "E-d22-c" }
      ],
    backward: "Add the three numbers.",
    forward: "Totals summarise the data in one number.",
    misconceptions: [
      {
        misconceptionId: "E-d22-a",
        description: "Student adds only two of the three values (A and B), forgetting C.",
        rootCause: "Incomplete Sum — omits one of the three values from the total.",
        remediation: "The total must include ALL THREE values — add A (35), B (40), AND C (45): 35+40+45=120, not just two of them."
      },
      {
        misconceptionId: "E-d22-b",
        description: "Student makes an arithmetic slip while adding the three values, landing on an incorrect sum.",
        rootCause: "Computation Error — correct approach (adding all three), but the addition itself is carried out incorrectly.",
        remediation: "Re-add carefully, one pair at a time: 35+40=75, then 75+45=120 — double-check each step."
      },
      {
        misconceptionId: "E-d22-c",
        description: "Student makes an arithmetic slip while adding the three values, landing on an incorrect sum.",
        rootCause: "Computation Error — correct approach (adding all three), but the addition itself is carried out incorrectly.",
        remediation: "Re-add carefully, one pair at a time: 35+40=75, then 75+45=120 — double-check each step."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "List all three values", hint: "A = 35, B = 40, C = 45." },
      { level: 2, description: "Add the first two", hint: "35 + 40 = 75." },
      { level: 3, description: "Add the third", hint: "75 + 45 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d23",
    order: 23,
    cluster: "VOCAB",
    clusterName: CLUSTER_NAMES.VOCAB,
    skillId: "DHVOCAB-02",
    question: "A bag contains 1 red ball and 9 blue balls. Picking a red ball is:",
    options: [
        { text: "Unlikely", correct: true, feedback: "Only 1 out of 10 balls is red, so the chance is small." },
        { text: "Certain", correct: false, feedback: "It is not certain.", misconceptionId: "E-d23-a" },
        { text: "Likely", correct: false, feedback: "With only 1 red out of 10, it is unlikely, not likely.", misconceptionId: "E-d23-b" },
        { text: "Impossible", correct: false, feedback: "There is a red ball, so it is possible.", misconceptionId: "E-d23-c" }
      ],
    backward: "The chance is small but not zero, so it's unlikely.",
    forward: "Probability words help us make predictions.",
    misconceptions: [
      {
        misconceptionId: "E-d23-a",
        description: "Student assumes having ANY red ball in the bag means picking it is 'certain', not recognising the 9 blue balls make it far more likely to pick blue.",
        rootCause: "Vocabulary Precision Gap — confuses 'possible' with 'certain' (100% guaranteed).",
        remediation: "'Certain' means the ONLY possible outcome — but 9 blue balls could also be picked, so red is 'unlikely' (a small but real chance), not certain."
      },
      {
        misconceptionId: "E-d23-b",
        description: "Student reverses the meaning, calling the minority colour (red, 1 out of 10) 'likely' instead of 'unlikely'.",
        rootCause: "Vocabulary Reversal — mislabels a LOW-probability event as high-probability.",
        remediation: "'Likely' means MORE probable — but red balls (1) are vastly outnumbered by blue (9), making red the LESS probable, 'unlikely' outcome, not likely."
      },
      {
        misconceptionId: "E-d23-c",
        description: "Student assumes a small chance (1 out of 10) means the event cannot happen at all.",
        rootCause: "Vocabulary Precision Gap — confuses 'low probability' with 'zero probability' (impossible).",
        remediation: "'Impossible' means it CANNOT happen at all — but there IS 1 red ball, so it CAN happen; a small but real chance is 'unlikely', not impossible."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Count each colour", hint: "1 red ball, 9 blue balls." },
      { level: 2, description: "Compare red's share to the whole", hint: "Red is only 1 out of 10 — a small share." },
      { level: 3, description: "Choose the matching vocabulary word", hint: "A small but real chance is described as...?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d24",
    order: 24,
    cluster: "SCALE",
    clusterName: CLUSTER_NAMES.SCALE,
    skillId: "DHSCALE-04",
    question: "A bar graph's y‑axis is labelled 0, 20, 40, 60. A bar ends exactly halfway between 40 and 60. What is its value?",
    options: [
        { text: "50", correct: true, feedback: "(40 + 60) ÷ 2 = 50." },
        { text: "40", correct: false, feedback: "That's the lower mark.", misconceptionId: "E-d24-a" },
        { text: "60", correct: false, feedback: "That's the upper mark.", misconceptionId: "E-d24-b" },
        { text: "30", correct: false, feedback: "That's halfway between 20 and 40.", misconceptionId: "E-d24-c" }
      ],
    backward: "Halfway is the midpoint; (40+60)÷2 = 50.",
    forward: "Reading between marks is necessary when bars fall between gridlines.",
    misconceptions: [
      {
        misconceptionId: "E-d24-a",
        description: "Student rounds down to the lower gridline (40) instead of computing the actual midpoint value.",
        rootCause: "Midpoint Not Computed — reads the nearest lower mark instead of averaging the two surrounding marks.",
        remediation: "'Halfway between 40 and 60' means the AVERAGE of the two marks, not the lower one — (40+60)÷2=50, not 40."
      },
      {
        misconceptionId: "E-d24-b",
        description: "Student rounds up to the upper gridline (60) instead of computing the actual midpoint value.",
        rootCause: "Midpoint Not Computed — reads the nearest upper mark instead of averaging the two surrounding marks.",
        remediation: "'Halfway between 40 and 60' means the AVERAGE of the two marks, not the upper one — (40+60)÷2=50, not 60."
      },
      {
        misconceptionId: "E-d24-c",
        description: "Student computes the midpoint of the WRONG pair of gridlines (20 and 40) instead of the pair given in the question (40 and 60).",
        rootCause: "Wrong Interval Selected — uses a neighbouring interval instead of the one specified in the question.",
        remediation: "The question specifies halfway between 40 AND 60 — use exactly that pair: (40+60)÷2=50, not the interval below it (20 to 40)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the two surrounding marks", hint: "The bar ends between 40 and 60." },
      { level: 2, description: "Recognise 'halfway' means average", hint: "Add the two marks and divide by 2." },
      { level: 3, description: "Compute", hint: "(40 + 60) ÷ 2 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  }
];

const recheckItems = [
  {
    itemId: "r1",
    order: 1,
    cluster: "PICTO",
    clusterName: CLUSTER_NAMES.PICTO,
    skillId: "DHPICTO-05",
    question: "Key: 1 apple = 3 kg. Shop A has 6 full apples and 1 half apple. Shop B has 5 full apples. How many more kg does Shop A have?",
    options: [
        { text: "4.5 kg", correct: true, feedback: "A = 6×3 + 1.5 = 19.5; B = 5×3 = 15; difference = 4.5 kg." },
        { text: "1.5 kg", correct: false, feedback: "You only compared the half symbol value.", misconceptionId: "E-r1-a" },
        { text: "15 kg", correct: false, feedback: "That's Shop B's total.", misconceptionId: "E-r1-b" },
        { text: "19.5 kg", correct: false, feedback: "That's Shop A's total.", misconceptionId: "E-r1-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r1-a",
        description: "Student compares only the half-symbol value (1.5) instead of computing and comparing each shop's full total.",
        rootCause: "Partial Value Compared Instead of Full Totals — isolates one component instead of computing each shop's complete total.",
        remediation: "Compute EACH shop's FULL total first: A=(6×3)+1.5=19.5, B=5×3=15, THEN subtract: 19.5-15=4.5 — don't compare just the half-symbol value (1.5) alone."
      },
      {
        misconceptionId: "E-r1-b",
        description: "Student reports Shop B's total instead of computing the DIFFERENCE between the two shops.",
        rootCause: "Final Subtraction Step Omitted — stops after computing one shop's total, without comparing to the other.",
        remediation: "The question asks how many MORE kg Shop A has — compute BOTH totals AND subtract them: 19.5-15=4.5, not just Shop B's total (15)."
      },
      {
        misconceptionId: "E-r1-c",
        description: "Student reports Shop A's total instead of computing the DIFFERENCE between the two shops.",
        rootCause: "Final Subtraction Step Omitted — stops after computing one shop's total, without comparing to the other.",
        remediation: "The question asks how many MORE kg Shop A has than Shop B — compute BOTH totals AND subtract them: 19.5-15=4.5, not just Shop A's total (19.5)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Compute Shop A's total", hint: "6×3 + 1.5 = 19.5." },
      { level: 2, description: "Compute Shop B's total", hint: "5 × 3 = 15." },
      { level: 3, description: "Find the difference", hint: "19.5 - 15 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.3.MD.B.3"]
  },
  {
    itemId: "r2",
    order: 2,
    cluster: "BAR",
    clusterName: CLUSTER_NAMES.BAR,
    skillId: "DHBAR-05",
    question: "A bar graph shows Monday: 55, Tuesday: 45. What is the total?",
    options: [
        { text: "100", correct: true, feedback: "55 + 45 = 100." },
        { text: "10", correct: false, feedback: "That's the difference.", misconceptionId: "E-r2-a" },
        { text: "55", correct: false, feedback: "Monday only.", misconceptionId: "E-r2-b" },
        { text: "45", correct: false, feedback: "Tuesday only.", misconceptionId: "E-r2-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r2-a",
        description: "Student subtracts instead of adding, computing the difference rather than the total.",
        rootCause: "Operation Selection Error — subtracts when the question ('total') calls for addition.",
        remediation: "'Total' means the SUM of all values — add 55+45=100, don't subtract them (which would give the difference, not the total)."
      },
      {
        misconceptionId: "E-r2-b",
        description: "Student reports only Monday's value, forgetting to include Tuesday in the total.",
        rootCause: "Partial Sum — includes only one category instead of both.",
        remediation: "The total must include BOTH days — add Monday (55) AND Tuesday (45): 55+45=100, not just 55."
      },
      {
        misconceptionId: "E-r2-c",
        description: "Student reports only Tuesday's value, forgetting to include Monday in the total.",
        rootCause: "Partial Sum — includes only one category instead of both.",
        remediation: "The total must include BOTH days — add Monday (55) AND Tuesday (45): 55+45=100, not just 45."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify both values", hint: "Monday = 55, Tuesday = 45." },
      { level: 2, description: "Recognise 'total' means sum", hint: "Add the two values together." },
      { level: 3, description: "Compute", hint: "55 + 45 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.3.MD.B.3"]
  },
  {
    itemId: "r3",
    order: 3,
    cluster: "LINE",
    clusterName: CLUSTER_NAMES.LINE,
    skillId: "DHLINE-03",
    question: "A line graph shows Week 1: 30 cm, Week 2: 45 cm. What was the increase?",
    options: [
        { text: "15 cm", correct: true, feedback: "45 − 30 = 15 cm." },
        { text: "30 cm", correct: false, feedback: "That's Week 1's value.", misconceptionId: "E-r3-a" },
        { text: "45 cm", correct: false, feedback: "That's Week 2's value.", misconceptionId: "E-r3-b" },
        { text: "75 cm", correct: false, feedback: "You added instead of subtracted.", misconceptionId: "E-r3-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r3-a",
        description: "Student reports Week 1's value instead of computing the increase (the difference between the two weeks).",
        rootCause: "Wrong Value Reported — confuses one week's value with the requested change.",
        remediation: "'Increase' means the CHANGE between the two values, not either reading alone — subtract Week 1 (30) from Week 2 (45): 45-30=15."
      },
      {
        misconceptionId: "E-r3-b",
        description: "Student reports Week 2's value instead of computing the increase (the difference between the two weeks).",
        rootCause: "Wrong Value Reported — confuses one week's value with the requested change.",
        remediation: "'Increase' means the CHANGE between the two values, not either reading alone — subtract Week 1 (30) from Week 2 (45): 45-30=15."
      },
      {
        misconceptionId: "E-r3-c",
        description: "Student adds the two lengths instead of subtracting to find the increase.",
        rootCause: "Operation Selection Error — adds when the question ('increase') calls for subtraction.",
        remediation: "'Increase' is found by SUBTRACTING the earlier value from the later value, not adding them: 45-30=15, not 45+30=75."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify both values", hint: "Week 1 = 30 cm, Week 2 = 45 cm." },
      { level: 2, description: "Recognise 'increase' means the change", hint: "Subtract the earlier value from the later value." },
      { level: 3, description: "Compute", hint: "45 - 30 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "r4",
    order: 4,
    cluster: "TABLE",
    clusterName: CLUSTER_NAMES.TABLE,
    skillId: "DHTABLE-05",
    question: "A table shows A: 14, B: 16, C: 18. What is the average?",
    options: [
        { text: "16", correct: true, feedback: "(14+16+18) ÷ 3 = 48 ÷ 3 = 16." },
        { text: "48", correct: false, feedback: "That's the total.", misconceptionId: "E-r4-a" },
        { text: "14", correct: false, feedback: "That's A's value only.", misconceptionId: "E-r4-b" },
        { text: "18", correct: false, feedback: "That's C's value only.", misconceptionId: "E-r4-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r4-a",
        description: "Student computes the total (sum) but forgets the final division step needed to find the average.",
        rootCause: "Division Step Omitted — stops after summing, without dividing by the number of values.",
        remediation: "The average requires dividing the total by the NUMBER of values — 48 ÷ 3 = 16, don't stop at the total (48) itself."
      },
      {
        misconceptionId: "E-r4-b",
        description: "Student reports one value (A) instead of computing the average across all three values.",
        rootCause: "Individual Value Reported Instead of Average — confuses one data point with the requested summary statistic.",
        remediation: "The average must use ALL THREE values, not just one — add all three (14+16+18=48) then divide by 3: 48÷3=16, not just A's 14."
      },
      {
        misconceptionId: "E-r4-c",
        description: "Student reports one value (C) instead of computing the average across all three values.",
        rootCause: "Individual Value Reported Instead of Average — confuses one data point with the requested summary statistic.",
        remediation: "The average must use ALL THREE values, not just one — add all three (14+16+18=48) then divide by 3: 48÷3=16, not just C's 18."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Add all three values", hint: "14 + 16 + 18 = 48." },
      { level: 2, description: "Count the number of values", hint: "There are 3 values." },
      { level: 3, description: "Divide the total by the count", hint: "48 ÷ 3 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "r5",
    order: 5,
    cluster: "VOCAB",
    clusterName: CLUSTER_NAMES.VOCAB,
    skillId: "DHVOCAB-02",
    question: "A bag has 8 red balls and 2 blue balls. Picking a blue ball is:",
    options: [
        { text: "Unlikely", correct: true, feedback: "Only 2 out of 10 are blue." },
        { text: "Certain", correct: false, feedback: "There are also red balls, so it is not certain.", misconceptionId: "E-r5-a" },
        { text: "Likely", correct: false, feedback: "With only 2 out of 10, it is unlikely, not likely.", misconceptionId: "E-r5-b" },
        { text: "Equally likely", correct: false, feedback: "Red and blue are not equal in number.", misconceptionId: "E-r5-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r5-a",
        description: "Student assumes having ANY blue ball in the bag means picking it is 'certain', not recognising the 8 red balls make it far more likely to pick red.",
        rootCause: "Vocabulary Precision Gap — confuses 'possible' with 'certain' (100% guaranteed).",
        remediation: "'Certain' means the ONLY possible outcome — but 8 red balls could also be picked, so blue is 'unlikely' (a small but real chance), not certain."
      },
      {
        misconceptionId: "E-r5-b",
        description: "Student reverses the meaning, calling the minority colour (blue, 2 out of 10) 'likely' instead of 'unlikely'.",
        rootCause: "Vocabulary Reversal — mislabels a LOW-probability event as high-probability.",
        remediation: "'Likely' means MORE probable — but blue balls (2) are outnumbered by red (8), making blue the LESS probable, 'unlikely' outcome, not likely."
      },
      {
        misconceptionId: "E-r5-c",
        description: "Student assumes 'equally likely' since both colours exist, without recognising red (8 balls) is far more common than blue (2 balls).",
        rootCause: "Vocabulary Precision Gap — confuses 'both are present' with 'both are equally probable'.",
        remediation: "'Equally likely' requires the SAME number for each outcome — but red has 8 balls and blue has only 2, making them NOT equal; blue is less likely."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Count each colour", hint: "8 red balls, 2 blue balls." },
      { level: 2, description: "Compare blue's share to the whole", hint: "Blue is only 2 out of 10 — a small share." },
      { level: 3, description: "Choose the matching vocabulary word", hint: "A small but real chance is described as...?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "r6",
    order: 6,
    cluster: "SCALE",
    clusterName: CLUSTER_NAMES.SCALE,
    skillId: "DHPICTO-02",
    question: "Key: 1 car symbol = 4 cars. There are 2 full symbols and 1 half symbol. How many cars?",
    options: [
        { text: "10", correct: true, feedback: "2×4 = 8; half = 2; total = 10." },
        { text: "8", correct: false, feedback: "You ignored the half symbol.", misconceptionId: "E-r6-a" },
        { text: "12", correct: false, feedback: "You counted the half symbol as a full symbol.", misconceptionId: "E-r6-b" },
        { text: "2.5", correct: false, feedback: "You didn't multiply by the key value.", misconceptionId: "E-r6-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r6-a",
        description: "Student computes the full symbols' total (2×4=8) but forgets to add the half symbol's contribution.",
        rootCause: "Half-Symbol Contribution Omitted — stops after counting only the full symbols.",
        remediation: "There's ALSO a half symbol worth 2 cars (half of 4) — add this to the full-symbol total: 8+2=10, not just 8."
      },
      {
        misconceptionId: "E-r6-b",
        description: "Student treats the half symbol as if it were a full symbol, using 3 full symbols instead of 2 full plus a half.",
        rootCause: "Half Symbol Miscounted as Full — doesn't distinguish a half symbol's reduced value from a full symbol's value.",
        remediation: "The half symbol is worth HALF of 4 (which is 2), not the full 4 — total = (2×4)+2=10, not (3×4)=12."
      },
      {
        misconceptionId: "E-r6-c",
        description: "Student adds the symbol counts (2+0.5=2.5) instead of multiplying by the key value.",
        rootCause: "Key Multiplication Omitted — treats the symbol count itself as the final answer without multiplying by the key.",
        remediation: "2.5 is just the NUMBER of symbols (2 full + half) — you must multiply by the key value (4 cars per symbol): 2.5×4=10, not 2.5 itself."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Compute the full symbols' total", hint: "2 × 4 = 8." },
      { level: 2, description: "Compute the half symbol's value", hint: "Half of 4 = 2." },
      { level: 3, description: "Add them together", hint: "8 + 2 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.3.MD.B.3"]
  },
  {
    itemId: "r7",
    order: 7,
    cluster: "PICTO",
    clusterName: CLUSTER_NAMES.PICTO,
    skillId: "DHPICTO-05",
    question: "Key: 1 star = 5 points. Team P: 4 stars; Team Q: 3 stars and 1 half star. How many more points for Team P?",
    options: [
        { text: "2.5", correct: true, feedback: "P = 20; Q = 15 + 2.5 = 17.5; difference = 2.5." },
        { text: "1", correct: false, feedback: "You compared symbol counts instead of point totals.", misconceptionId: "E-r7-a" },
        { text: "5", correct: false, feedback: "You forgot to include Q's half star.", misconceptionId: "E-r7-b" },
        { text: "20", correct: false, feedback: "That's Team P's total, not the difference.", misconceptionId: "E-r7-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r7-a",
        description: "Student compares the raw symbol counts (4 vs 3.5=0.5 difference, or similar) instead of computing and comparing each team's actual point totals.",
        rootCause: "Key Conversion Skipped Before Comparing — compares symbol counts directly instead of the actual quantities they represent.",
        remediation: "Convert BOTH teams to actual points first (P=4×5=20, Q=(3×5)+2.5=17.5), THEN subtract: 20-17.5=2.5 — don't compare raw symbol counts."
      },
      {
        misconceptionId: "E-r7-b",
        description: "Student computes Q's total using only the full stars (3×5=15), forgetting to add the half star's 2.5 contribution, leading to an inflated difference.",
        rootCause: "Half-Symbol Contribution Omitted — stops after counting only the full symbols for Team Q.",
        remediation: "Team Q has a half star worth 2.5 IN ADDITION to its 3 full stars (3×5=15) — Q's total is 15+2.5=17.5, so the difference is 20-17.5=2.5, not 20-15=5."
      },
      {
        misconceptionId: "E-r7-c",
        description: "Student reports Team P's total instead of computing the DIFFERENCE between the two teams.",
        rootCause: "Final Subtraction Step Omitted — stops after computing one team's total, without comparing to the other.",
        remediation: "The question asks how many MORE points Team P has — compute BOTH totals AND subtract them: 20-17.5=2.5, not just Team P's total (20)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Compute Team P's total", hint: "4 × 5 = 20." },
      { level: 2, description: "Compute Team Q's total", hint: "3×5 + half of 5 = 15 + 2.5 = 17.5." },
      { level: 3, description: "Find the difference", hint: "20 - 17.5 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.3.MD.B.3"]
  },
  {
    itemId: "r8",
    order: 8,
    cluster: "BAR",
    clusterName: CLUSTER_NAMES.BAR,
    skillId: "DHBAR-06",
    question: "A bar graph shows Day X: 80, Day Y: 50. How many more on Day X?",
    options: [
        { text: "30", correct: true, feedback: "80 − 50 = 30." },
        { text: "130", correct: false, feedback: "You added the two values.", misconceptionId: "E-r8-a" },
        { text: "80", correct: false, feedback: "That's Day X's value.", misconceptionId: "E-r8-b" },
        { text: "50", correct: false, feedback: "That's Day Y's value.", misconceptionId: "E-r8-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r8-a",
        description: "Student adds the two values instead of subtracting to find 'how many more'.",
        rootCause: "Operation Selection Error — adds when the question ('how many more') calls for subtraction.",
        remediation: "'How many more' means the DIFFERENCE, not the sum — subtract 80-50=30, don't add 80+50=130."
      },
      {
        misconceptionId: "E-r8-b",
        description: "Student reports Day X's value instead of computing the difference between the two days.",
        rootCause: "Wrong Value Reported — confuses one day's value with the requested difference.",
        remediation: "The question asks how many MORE were on Day X, not Day X's raw value — subtract: 80-50=30, not just Day X's 80."
      },
      {
        misconceptionId: "E-r8-c",
        description: "Student reports Day Y's value instead of computing the difference between the two days.",
        rootCause: "Wrong Value Reported — confuses one day's value with the requested difference.",
        remediation: "The question asks for the difference between the two days, not Day Y's raw value alone — subtract: 80-50=30, not just Day Y's 50."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify both values", hint: "Day X = 80, Day Y = 50." },
      { level: 2, description: "Recognise 'how many more' means subtraction", hint: "Subtract the smaller from the larger." },
      { level: 3, description: "Compute", hint: "80 - 50 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "r9",
    order: 9,
    cluster: "LINE",
    clusterName: CLUSTER_NAMES.LINE,
    skillId: "DHLINE-04",
    question: "A line graph shows 9 AM: 20°C, 11 AM: 20°C, 1 PM: 24°C. Between which two times was the greatest rise?",
    options: [
        { text: "11 AM to 1 PM", correct: true, feedback: "9−11: 0°C rise; 11−1: +4°C rise." },
        { text: "9 AM to 11 AM", correct: false, feedback: "That interval had no rise at all (0°C).", misconceptionId: "E-r9-a" },
        { text: "All equal", correct: false, feedback: "0°C and 4°C are not equal.", misconceptionId: "E-r9-b" },
        { text: "Cannot say", correct: false, feedback: "We can calculate the rises.", misconceptionId: "E-r9-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r9-a",
        description: "Student picks the first interval (9 AM to 11 AM) without comparing its rise (0°C, no change) to the second interval's rise (4°C).",
        rootCause: "Intervals Not Actually Compared — selects an interval without computing and comparing both rises.",
        remediation: "Compute BOTH rises before choosing: 9AM→11AM is 0°C (no change), 11AM→1PM is +4°C — the SECOND interval has the larger rise, so it's the answer."
      },
      {
        misconceptionId: "E-r9-b",
        description: "Student assumes both intervals rise by the same amount without actually computing each difference.",
        rootCause: "Intervals Not Actually Compared — assumes equality instead of computing and comparing both rises.",
        remediation: "Compute each rise separately: 20-20=0°C for the first interval, 24-20=4°C for the second — these are NOT equal; 4°C is larger."
      },
      {
        misconceptionId: "E-r9-c",
        description: "Student assumes the rises cannot be determined, when the graph provides enough data to calculate both differences.",
        rootCause: "Available Data Underused — treats calculable data as insufficient.",
        remediation: "All three temperature readings are given (20, 20, 24), so both interval rises CAN be calculated: 0°C and +4°C — compare them to find the answer."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Compute the first interval's rise", hint: "9 AM to 11 AM: 20 - 20 = 0°C." },
      { level: 2, description: "Compute the second interval's rise", hint: "11 AM to 1 PM: 24 - 20 = 4°C." },
      { level: 3, description: "Compare the two rises", hint: "Which rise is larger, 0°C or 4°C?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "r10",
    order: 10,
    cluster: "TABLE",
    clusterName: CLUSTER_NAMES.TABLE,
    skillId: "DHTABLE-03",
    question: "A table shows P: ₹250, Q: ₹300, R: ₹200. What is the total?",
    options: [
        { text: "₹750", correct: true, feedback: "250 + 300 + 200 = 750." },
        { text: "₹550", correct: false, feedback: "You only added two of the three values.", misconceptionId: "E-r10-a" },
        { text: "₹500", correct: false, feedback: "Incorrect addition.", misconceptionId: "E-r10-b" },
        { text: "₹800", correct: false, feedback: "Incorrect addition.", misconceptionId: "E-r10-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r10-a",
        description: "Student adds only two of the three values, forgetting one of the three shops.",
        rootCause: "Incomplete Sum — omits one of the three values from the total.",
        remediation: "The total must include ALL THREE values — add P (₹250), Q (₹300), AND R (₹200): 250+300+200=750, not just two of them."
      },
      {
        misconceptionId: "E-r10-b",
        description: "Student makes an arithmetic slip while adding the three values, landing on an incorrect sum lower than 750.",
        rootCause: "Computation Error — correct approach (adding all three), but the addition itself is carried out incorrectly.",
        remediation: "Re-add carefully, one pair at a time: 250+300=550, then 550+200=750 — double-check each step."
      },
      {
        misconceptionId: "E-r10-c",
        description: "Student makes an arithmetic slip while adding the three values, landing on an incorrect sum higher than 750.",
        rootCause: "Computation Error — correct approach (adding all three), but the addition itself is carried out incorrectly.",
        remediation: "Re-add carefully, one pair at a time: 250+300=550, then 550+200=750 — double-check each step, don't overshoot."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "List all three values", hint: "P = ₹250, Q = ₹300, R = ₹200." },
      { level: 2, description: "Add the first two", hint: "250 + 300 = 550." },
      { level: 3, description: "Add the third", hint: "550 + 200 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "r11",
    order: 11,
    cluster: "VOCAB",
    clusterName: CLUSTER_NAMES.VOCAB,
    skillId: "DHVOCAB-05",
    question: "A spinner has 5 red sections and 0 blue sections. Landing on blue is:",
    options: [
        { text: "Impossible", correct: true, feedback: "There are no blue sections." },
        { text: "Certain", correct: false, feedback: "There are no blue sections at all, so it can never happen.", misconceptionId: "E-r11-a" },
        { text: "Likely", correct: false, feedback: "With zero blue sections, it cannot happen at all.", misconceptionId: "E-r11-b" },
        { text: "Unlikely", correct: false, feedback: "'Unlikely' still means it could happen — but here it never can.", misconceptionId: "E-r11-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r11-a",
        description: "Student reverses the meaning, calling an event that can never happen (0 blue sections) 'certain' instead of 'impossible'.",
        rootCause: "Vocabulary Reversal — confuses 'certain' (will always happen) with 'impossible' (can never happen).",
        remediation: "'Certain' means it will ALWAYS happen — but there are 0 blue sections, so landing on blue can NEVER happen, making it 'impossible', the opposite of certain."
      },
      {
        misconceptionId: "E-r11-b",
        description: "Student assumes blue could be picked ('likely') without checking that the spinner has ZERO blue sections.",
        rootCause: "Zero-Count Not Checked — fails to notice the outcome has no sections at all, so can never occur.",
        remediation: "Check the count for blue: there are 0 blue sections — with zero sections, landing on blue can NEVER happen, making it 'impossible', not likely."
      },
      {
        misconceptionId: "E-r11-c",
        description: "Student calls the event 'unlikely' (a small but real chance), not recognising a ZERO count means it cannot happen at all.",
        rootCause: "Vocabulary Precision Gap — confuses 'low probability' (unlikely) with 'zero probability' (impossible).",
        remediation: "'Unlikely' means it CAN still happen, just rarely — but with 0 blue sections, it CANNOT happen at all, which is 'impossible', not merely unlikely."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Count the blue sections", hint: "There are 0 blue sections." },
      { level: 2, description: "Consider whether blue can ever be landed on", hint: "With zero sections, can the spinner ever land there?" },
      { level: 3, description: "Choose the matching vocabulary word", hint: "An event with zero chance is called...?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "r12",
    order: 12,
    cluster: "SCALE",
    clusterName: CLUSTER_NAMES.SCALE,
    skillId: "DHSCALE-04",
    question: "A bar graph's y‑axis has marks at 0, 20, 40, 60, 80. A bar ends exactly halfway between 60 and 80. What is its value?",
    options: [
        { text: "70", correct: true, feedback: "(60 + 80) ÷ 2 = 70." },
        { text: "60", correct: false, feedback: "That's the lower mark.", misconceptionId: "E-r12-a" },
        { text: "80", correct: false, feedback: "That's the upper mark.", misconceptionId: "E-r12-b" },
        { text: "50", correct: false, feedback: "That's halfway between 40 and 60.", misconceptionId: "E-r12-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r12-a",
        description: "Student rounds down to the lower gridline (60) instead of computing the actual midpoint value.",
        rootCause: "Midpoint Not Computed — reads the nearest lower mark instead of averaging the two surrounding marks.",
        remediation: "'Halfway between 60 and 80' means the AVERAGE of the two marks, not the lower one — (60+80)÷2=70, not 60."
      },
      {
        misconceptionId: "E-r12-b",
        description: "Student rounds up to the upper gridline (80) instead of computing the actual midpoint value.",
        rootCause: "Midpoint Not Computed — reads the nearest upper mark instead of averaging the two surrounding marks.",
        remediation: "'Halfway between 60 and 80' means the AVERAGE of the two marks, not the upper one — (60+80)÷2=70, not 80."
      },
      {
        misconceptionId: "E-r12-c",
        description: "Student computes the midpoint of the WRONG pair of gridlines (40 and 60) instead of the pair given in the question (60 and 80).",
        rootCause: "Wrong Interval Selected — uses a neighbouring interval instead of the one specified in the question.",
        remediation: "The question specifies halfway between 60 AND 80 — use exactly that pair: (60+80)÷2=70, not the interval below it (40 to 60)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the two surrounding marks", hint: "The bar ends between 60 and 80." },
      { level: 2, description: "Recognise 'halfway' means average", hint: "Add the two marks and divide by 2." },
      { level: 3, description: "Compute", hint: "(60 + 80) ÷ 2 = ?" }
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
    title: "Data Handling — Advanced Core",
    subtitle: "Telangana & Cambridge · Level 2 · Advanced Core",
    description: "Multi-step comparisons, totals, averages, and midpoint scale readings across every data-handling cluster.",
    clusterNames: CLUSTER_NAMES,
    gateReviewHTML: "<strong>Quick Review — Multi‑Step Data Handling</strong><br>\n        • Pictographs: multiply symbols by the key value; add half symbol values for exact numbers.<br>\n        • Bar graphs: read bar heights, find differences and totals, compare categories.<br>\n        • Line graphs: find the change between two points, identify the period of greatest increase or decrease.<br>\n        • Tables: read values, compute totals and averages.<br>\n        • Probability: certain (will happen), likely, equally likely, unlikely, impossible (cannot happen).<br>\n        • Scales: find the interval between marks; read values halfway between marks.",
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

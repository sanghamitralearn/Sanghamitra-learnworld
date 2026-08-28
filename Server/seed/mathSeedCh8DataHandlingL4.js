// seed/mathSeedCh8DataHandlingL4.js
//
// Populates math_chapters and math_questions with Grade 5, Chapter 8
// (Data Handling), Level 4 — converted from the standalone HTML file
// ch-8-data-handling-level-4.html.
//
// This is the 25-minute timed diagnostic level; diagnostic items carry a
// difficulty tier (S = Speed, C = Core, H = Hard, T = Trap).
//
// Run with: node seed/mathSeedCh8DataHandlingL4.js

const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-5";
const GRADE_LABEL = "Grade 5";
const CHAPTER_SLUG = "ch-8-data-handling";
const CHAPTER_NAME = "Data Handling";
const LEVEL = 4;

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
    skillId: "DHPICTO-01",
    question: "Key: 1 circle = 3 students. How many students do 5 circles represent?",
    options: [
        { text: "15", correct: true, feedback: "5 × 3 = 15 students." },
        { text: "5", correct: false, feedback: "You forgot to multiply by the key value.", misconceptionId: "E-w1-a" },
        { text: "8", correct: false, feedback: "You added instead of multiplying.", misconceptionId: "E-w1-b" },
        { text: "2", correct: false, feedback: "You divided instead of multiplying.", misconceptionId: "E-w1-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-w1-a",
        description: "Student reports the raw symbol count (5) instead of multiplying it by the key value to find the actual number of students.",
        rootCause: "Key Multiplication Omitted — treats the symbol count itself as the final answer without multiplying by the key.",
        remediation: "5 is just the NUMBER of symbols — you must multiply by the key value (3 students per symbol): 5×3=15, not 5 itself."
      },
      {
        misconceptionId: "E-w1-b",
        description: "Student adds the symbol count and the key value (5+3=8) instead of multiplying them.",
        rootCause: "Operation Selection Error — adds when the key relationship requires multiplication.",
        remediation: "The key means each symbol represents 3 students — to find the total, MULTIPLY the symbol count by the key: 5×3=15, don't add them (5+3=8)."
      },
      {
        misconceptionId: "E-w1-c",
        description: "Student divides the symbol count by the key value (5÷3) instead of multiplying them.",
        rootCause: "Operation Selection Error — divides when the key relationship requires multiplication.",
        remediation: "To convert symbols to actual students, MULTIPLY by the key: 5×3=15, don't divide (which would undo the key relationship, not apply it)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the key value", hint: "1 circle = 3 students." },
      { level: 2, description: "Count the symbols", hint: "There are 5 circles." },
      { level: 3, description: "Multiply", hint: "5 × 3 = ?" }
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
    question: "A bar graph shows Monday 20, Tuesday 30. What is the total?",
    options: [
        { text: "50", correct: true, feedback: "20 + 30 = 50." },
        { text: "10", correct: false, feedback: "That's the difference, not the total.", misconceptionId: "E-w2-a" },
        { text: "20", correct: false, feedback: "That's only Monday.", misconceptionId: "E-w2-b" },
        { text: "30", correct: false, feedback: "That's only Tuesday.", misconceptionId: "E-w2-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-w2-a",
        description: "Student subtracts instead of adding, computing the difference rather than the total.",
        rootCause: "Operation Selection Error — subtracts when the question ('total') calls for addition.",
        remediation: "'Total' means the SUM of all values — add 20+30=50, don't subtract them (which would give the difference, not the total)."
      },
      {
        misconceptionId: "E-w2-b",
        description: "Student reports only Monday's value, forgetting to include Tuesday in the total.",
        rootCause: "Partial Sum — includes only one category instead of both.",
        remediation: "The total must include BOTH days — add Monday (20) AND Tuesday (30): 20+30=50, not just 20."
      },
      {
        misconceptionId: "E-w2-c",
        description: "Student reports only Tuesday's value, forgetting to include Monday in the total.",
        rootCause: "Partial Sum — includes only one category instead of both.",
        remediation: "The total must include BOTH days — add Monday (20) AND Tuesday (30): 20+30=50, not just 30."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify both values", hint: "Monday = 20, Tuesday = 30." },
      { level: 2, description: "Recognise 'total' means sum", hint: "Add the two values together." },
      { level: 3, description: "Compute", hint: "20 + 30 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.3.MD.B.3"]
  },
  {
    itemId: "w3",
    order: 3,
    cluster: "LINE",
    clusterName: CLUSTER_NAMES.LINE,
    skillId: "DHLINE-01",
    question: "A line graph shows the temperature at 9 AM is 15°C. What is the temperature at 9 AM?",
    options: [
        { text: "15°C", correct: true, feedback: "Read the value at the 9 AM point." },
        { text: "9°C", correct: false, feedback: "That's the time, not the temperature.", misconceptionId: "E-w3-a" },
        { text: "10°C", correct: false, feedback: "Incorrect reading.", misconceptionId: "E-w3-b" },
        { text: "20°C", correct: false, feedback: "Incorrect reading.", misconceptionId: "E-w3-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-w3-a",
        description: "Student reports the time label (9) as if it were the temperature value, confusing the x-axis label with the y-axis reading.",
        rootCause: "Axis Confusion — reads the horizontal (time) label instead of the vertical (value) reading.",
        remediation: "9 AM is the TIME (x-axis label), not the temperature — the question already tells you the temperature reading is 15°C at that time; read the value, not the time label."
      },
      {
        misconceptionId: "E-w3-b",
        description: "Student reports an incorrect value instead of the temperature explicitly given in the question.",
        rootCause: "Given Value Not Used — substitutes a guessed or misremembered value instead of the one stated.",
        remediation: "The question directly states the temperature at 9 AM is 15°C — use that given value directly, not a different number."
      },
      {
        misconceptionId: "E-w3-c",
        description: "Student reports an incorrect value instead of the temperature explicitly given in the question.",
        rootCause: "Given Value Not Used — substitutes a guessed or misremembered value instead of the one stated.",
        remediation: "The question directly states the temperature at 9 AM is 15°C — use that given value directly, not a different number."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify what's being asked", hint: "The question asks for the temperature, not the time." },
      { level: 2, description: "Find the stated reading", hint: "The question tells you the temperature at 9 AM directly." },
      { level: 3, description: "Report the value", hint: "What temperature was given for 9 AM?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "w4",
    order: 4,
    cluster: "TABLE",
    clusterName: CLUSTER_NAMES.TABLE,
    skillId: "DHTABLE-01",
    question: "A table shows A = 12, B = 18. What is the value for A?",
    options: [
        { text: "12", correct: true, feedback: "The table shows 12 for A." },
        { text: "18", correct: false, feedback: "That's B's value.", misconceptionId: "E-w4-a" },
        { text: "30", correct: false, feedback: "That's the total.", misconceptionId: "E-w4-b" },
        { text: "6", correct: false, feedback: "That's the difference.", misconceptionId: "E-w4-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-w4-a",
        description: "Student reports B's value instead of A's value, mixing up which row/label the question is asking about.",
        rootCause: "Wrong Row Read — reads the value for the wrong label.",
        remediation: "The question asks for A's value specifically, not B's — A = 12, B = 18; report A's own value (12), not B's (18)."
      },
      {
        misconceptionId: "E-w4-b",
        description: "Student computes and reports the sum of A and B (30) instead of reading A's individual value.",
        rootCause: "Sum Reported Instead of Individual Value — computes a derived total instead of reading the requested single value.",
        remediation: "The question asks for A's OWN value, not a computed total — A = 12 directly from the table, not A+B=30."
      },
      {
        misconceptionId: "E-w4-c",
        description: "Student computes and reports the difference between A and B (6) instead of reading A's individual value.",
        rootCause: "Difference Reported Instead of Individual Value — computes a derived difference instead of reading the requested single value.",
        remediation: "The question asks for A's OWN value, not a computed difference — A = 12 directly from the table, not B-A=6."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the row for A", hint: "The table lists A = 12, B = 18." },
      { level: 2, description: "Read A's own value directly", hint: "Don't combine it with B — just read A's row." },
      { level: 3, description: "Report the value", hint: "What number is listed for A?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "w5",
    order: 5,
    cluster: "VOCAB",
    clusterName: CLUSTER_NAMES.VOCAB,
    skillId: "DHVOCAB-01",
    question: "A bag has 8 red balls and 2 blue balls. Picking a red ball is:",
    options: [
        { text: "Likely", correct: true, feedback: "Most balls are red, so red is likely." },
        { text: "Certain", correct: false, feedback: "There are also blue balls.", misconceptionId: "E-w5-a" },
        { text: "Unlikely", correct: false, feedback: "8 out of 10 is likely, not unlikely.", misconceptionId: "E-w5-b" },
        { text: "Impossible", correct: false, feedback: "Red balls exist.", misconceptionId: "E-w5-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-w5-a",
        description: "Student assumes having MOST of a colour means picking it is 'certain', not recognising some chance of the other colour remains.",
        rootCause: "Vocabulary Precision Gap — confuses 'most likely' with 'certain' (100% guaranteed).",
        remediation: "'Certain' means the ONLY possible outcome — but there are 2 blue balls, so picking blue remains possible; red is 'likely' (probable but not guaranteed), not certain."
      },
      {
        misconceptionId: "E-w5-b",
        description: "Student reverses the meaning, calling the majority colour (red, 8 out of 10) 'unlikely' instead of 'likely'.",
        rootCause: "Vocabulary Reversal — mislabels a HIGH-probability event as low-probability.",
        remediation: "'Unlikely' means LESS probable — but red balls (8) vastly outnumber blue (2), making red the MORE probable, 'likely' outcome, not unlikely."
      },
      {
        misconceptionId: "E-w5-c",
        description: "Student assumes a majority colour that isn't the ONLY colour means the minority colour makes it 'impossible', misapplying the term.",
        rootCause: "Vocabulary Precision Gap — confuses 'not certain' with 'impossible' (0% chance).",
        remediation: "'Impossible' would mean red CANNOT be picked at all — but red balls clearly exist (8 of them), so picking red is very much possible, indeed 'likely', not impossible."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Count each colour", hint: "8 red balls, 2 blue balls." },
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
    skillId: "DHPICTO-01",
    question: "Key: 1 star = 5 points. How many points do 3 stars represent?",
    options: [
        { text: "15", correct: true, feedback: "3 × 5 = 15 points." },
        { text: "3", correct: false, feedback: "You forgot the key.", misconceptionId: "E-w6-a" },
        { text: "8", correct: false, feedback: "You added 3+5.", misconceptionId: "E-w6-b" },
        { text: "5", correct: false, feedback: "That's the key value for one star.", misconceptionId: "E-w6-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-w6-a",
        description: "Student reports the raw symbol count (3) instead of multiplying it by the key value to find the actual points.",
        rootCause: "Key Multiplication Omitted — treats the symbol count itself as the final answer without multiplying by the key.",
        remediation: "3 is just the NUMBER of stars — you must multiply by the key value (5 points per star): 3×5=15, not 3 itself."
      },
      {
        misconceptionId: "E-w6-b",
        description: "Student adds the symbol count and the key value (3+5=8) instead of multiplying them.",
        rootCause: "Operation Selection Error — adds when the key relationship requires multiplication.",
        remediation: "The key means each star represents 5 points — to find the total, MULTIPLY the symbol count by the key: 3×5=15, don't add them (3+5=8)."
      },
      {
        misconceptionId: "E-w6-c",
        description: "Student reports the key value itself (5, the value of ONE star) instead of the total for THREE stars.",
        rootCause: "Key Value Confused With Final Answer — stops at the conversion rate instead of applying it to the full symbol count.",
        remediation: "5 is the value of just ONE star — since there are 3 stars, multiply: 3×5=15, not just the single-star value (5)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the key value", hint: "1 star = 5 points." },
      { level: 2, description: "Count the symbols", hint: "There are 3 stars." },
      { level: 3, description: "Multiply", hint: "3 × 5 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.3.MD.B.3"]
  },
  {
    itemId: "w7",
    order: 7,
    cluster: "PICTO",
    clusterName: CLUSTER_NAMES.PICTO,
    skillId: "DHPICTO-12",
    question: "Key: 1 book symbol = 4 books. What does a half book symbol represent?",
    options: [
        { text: "2", correct: true, feedback: "Half of 4 is 2." },
        { text: "4", correct: false, feedback: "That's a full symbol.", misconceptionId: "E-w7-a" },
        { text: "8", correct: false, feedback: "You doubled instead of halving.", misconceptionId: "E-w7-b" },
        { text: "1", correct: false, feedback: "Incorrect fraction.", misconceptionId: "E-w7-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-w7-a",
        description: "Student treats a half symbol as if it were a full symbol, reporting the full key value (4) instead of half of it.",
        rootCause: "Half Symbol Miscounted as Full — doesn't distinguish a half symbol's reduced value from a full symbol's value.",
        remediation: "A HALF symbol represents HALF the key value, not the full value — half of 4 is 2, not 4 (which is the full symbol's value)."
      },
      {
        misconceptionId: "E-w7-b",
        description: "Student doubles the key value (4×2=8) instead of halving it, applying the opposite operation.",
        rootCause: "Operation Direction Reversed — doubles when the question requires halving.",
        remediation: "A HALF symbol means you DIVIDE the key value by 2, not multiply it — half of 4 is 4÷2=2, not 4×2=8."
      },
      {
        misconceptionId: "E-w7-c",
        description: "Student computes an incorrect fraction of the key value (1 instead of 2), miscalculating half of 4.",
        rootCause: "Half Calculated Incorrectly — divides by the wrong number or makes an arithmetic slip.",
        remediation: "Half of 4 means 4÷2, which is 2, not 1 — recheck your division."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the key value", hint: "1 full symbol = 4 books." },
      { level: 2, description: "Recognise 'half symbol' means half the key", hint: "Divide the key value by 2." },
      { level: 3, description: "Compute", hint: "4 ÷ 2 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.3.MD.B.3"]
  },
  {
    itemId: "w8",
    order: 8,
    cluster: "BAR",
    clusterName: CLUSTER_NAMES.BAR,
    skillId: "DHBAR-01",
    question: "Which is more: 40 or 35?",
    options: [
        { text: "40", correct: true, feedback: "40 is greater than 35." },
        { text: "35", correct: false, feedback: "35 is smaller.", misconceptionId: "E-w8-a" },
        { text: "They are equal", correct: false, feedback: "40 ≠ 35.", misconceptionId: "E-w8-b" },
        { text: "Cannot say", correct: false, feedback: "We can compare numbers.", misconceptionId: "E-w8-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-w8-a",
        description: "Student picks the smaller number (35) as the larger one, reversing the comparison.",
        rootCause: "Comparison Direction Reversed — selects the smaller value when asked for the larger.",
        remediation: "Compare the two numbers carefully: 40 is greater than 35 (40 > 35) — pick the LARGER one, not the smaller."
      },
      {
        misconceptionId: "E-w8-b",
        description: "Student assumes the two numbers are equal without actually comparing their digits.",
        rootCause: "Values Not Actually Compared — fails to notice the numbers differ.",
        remediation: "Look closely: 40 and 35 are two DIFFERENT numbers — they are not equal. Compare them digit by digit: 40 has a 4 in the tens place, 35 has a 3, so 40 is larger."
      },
      {
        misconceptionId: "E-w8-c",
        description: "Student assumes two whole numbers cannot be compared, when comparing numbers is always possible.",
        rootCause: "Comparability Doubted Unnecessarily — treats a straightforward comparison as undeterminable.",
        remediation: "Any two whole numbers CAN always be compared — 40 and 35 are both known values, so simply check which is larger: 40 > 35."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Look at the tens digit of each number", hint: "40 has a 4 in the tens place; 35 has a 3." },
      { level: 2, description: "Compare the tens digits", hint: "4 is greater than 3." },
      { level: 3, description: "Choose the larger number", hint: "Which number has the greater tens digit?" }
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
    tier: "S",
    skillId: "DHPICTO-01",
    question: "Key: 1 book symbol = 5 books. There are 4 book symbols. How many books in total?",
    options: [
        { text: "20", correct: true, feedback: "4 × 5 = 20 books." },
        { text: "4", correct: false, feedback: "You forgot to multiply by the key.", misconceptionId: "E-d1-a" },
        { text: "9", correct: false, feedback: "You added 5+4.", misconceptionId: "E-d1-b" },
        { text: "25", correct: false, feedback: "You multiplied 5×5.", misconceptionId: "E-d1-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-d1-a",
        description: "Student reports the raw symbol count (4) instead of multiplying it by the key value to find the actual number of books.",
        rootCause: "Key Multiplication Omitted — treats the symbol count itself as the final answer without multiplying by the key.",
        remediation: "4 is just the NUMBER of symbols — you must multiply by the key value (5 books per symbol): 4×5=20, not 4 itself."
      },
      {
        misconceptionId: "E-d1-b",
        description: "Student adds the symbol count and the key value (5+4=9) instead of multiplying them.",
        rootCause: "Operation Selection Error — adds when the key relationship requires multiplication.",
        remediation: "The key means each symbol represents 5 books — to find the total, MULTIPLY the symbol count by the key: 4×5=20, don't add them (5+4=9)."
      },
      {
        misconceptionId: "E-d1-c",
        description: "Student multiplies the key value by itself (5×5=25) instead of by the actual symbol count (4).",
        rootCause: "Wrong Factor Used — substitutes the key value for the symbol count in the multiplication.",
        remediation: "Multiply the SYMBOL COUNT (4) by the key (5), not the key by itself — 4×5=20, not 5×5=25."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the key value", hint: "1 symbol = 5 books." },
      { level: 2, description: "Count the symbols", hint: "There are 4 symbols." },
      { level: 3, description: "Multiply", hint: "4 × 5 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.3.MD.B.3"]
  },
  {
    itemId: "d2",
    order: 2,
    cluster: "BAR",
    clusterName: CLUSTER_NAMES.BAR,
    tier: "S",
    skillId: "DHBAR-02",
    question: "A bar graph shows Cats: 25. How many cats are there?",
    options: [
        { text: "25", correct: true, feedback: "The bar reaches 25 on the scale." },
        { text: "20", correct: false, feedback: "Incorrect reading of the bar height.", misconceptionId: "E-d2-a" },
        { text: "30", correct: false, feedback: "Incorrect.", misconceptionId: "E-d2-b" },
        { text: "15", correct: false, feedback: "Incorrect.", misconceptionId: "E-d2-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-d2-a",
        description: "Student rounds down to a nearby gridline (20) instead of reading the exact value stated for the bar (25).",
        rootCause: "Given Value Not Used — substitutes a nearby round number instead of the exact stated value.",
        remediation: "The question directly states the Cats bar shows 25 — use that exact given value, not a rounded-down nearby number (20)."
      },
      {
        misconceptionId: "E-d2-b",
        description: "Student rounds up to a nearby gridline (30) instead of reading the exact value stated for the bar (25).",
        rootCause: "Given Value Not Used — substitutes a nearby round number instead of the exact stated value.",
        remediation: "The question directly states the Cats bar shows 25 — use that exact given value, not a rounded-up nearby number (30)."
      },
      {
        misconceptionId: "E-d2-c",
        description: "Student reports an unrelated value instead of the exact value stated for the bar (25).",
        rootCause: "Given Value Not Used — substitutes a guessed or misremembered value instead of the one stated.",
        remediation: "The question directly states the Cats bar shows 25 — use that exact given value, not a different number (15)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify what's being asked", hint: "The question asks how many cats there are." },
      { level: 2, description: "Find the stated bar value", hint: "The question tells you the Cats bar's value directly." },
      { level: 3, description: "Report the value", hint: "What value was given for the Cats bar?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.3.MD.B.3"]
  },
  {
    itemId: "d3",
    order: 3,
    cluster: "LINE",
    clusterName: CLUSTER_NAMES.LINE,
    tier: "S",
    skillId: "DHLINE-01",
    question: "A line graph shows the height of a plant at week 2 is 30 cm. What is the height at week 2?",
    options: [
        { text: "30 cm", correct: true, feedback: "Read the value on the graph at week 2." },
        { text: "2 cm", correct: false, feedback: "That's the week number.", misconceptionId: "E-d3-a" },
        { text: "15 cm", correct: false, feedback: "Incorrect reading.", misconceptionId: "E-d3-b" },
        { text: "60 cm", correct: false, feedback: "Incorrect reading.", misconceptionId: "E-d3-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-d3-a",
        description: "Student reports the week number (2) as if it were the height value, confusing the x-axis label with the y-axis reading.",
        rootCause: "Axis Confusion — reads the horizontal (week) label instead of the vertical (value) reading.",
        remediation: "Week 2 is the TIME label (x-axis), not the height — the question already tells you the height reading is 30 cm at that week; read the value, not the week label."
      },
      {
        misconceptionId: "E-d3-b",
        description: "Student reports an incorrect value (half of the actual) instead of the height explicitly given in the question.",
        rootCause: "Given Value Not Used — substitutes a guessed or halved value instead of the one stated.",
        remediation: "The question directly states the height at week 2 is 30 cm — use that given value directly, not a different number (15 cm)."
      },
      {
        misconceptionId: "E-d3-c",
        description: "Student reports an incorrect value (double the actual) instead of the height explicitly given in the question.",
        rootCause: "Given Value Not Used — substitutes a guessed or doubled value instead of the one stated.",
        remediation: "The question directly states the height at week 2 is 30 cm — use that given value directly, not a different number (60 cm)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify what's being asked", hint: "The question asks for the height, not the week number." },
      { level: 2, description: "Find the stated reading", hint: "The question tells you the height at week 2 directly." },
      { level: 3, description: "Report the value", hint: "What height was given for week 2?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d4",
    order: 4,
    cluster: "TABLE",
    clusterName: CLUSTER_NAMES.TABLE,
    tier: "S",
    skillId: "DHTABLE-01",
    question: "A table shows Monday 14, Tuesday 16. What is Tuesday's value?",
    options: [
        { text: "16", correct: true, feedback: "The row for Tuesday shows 16." },
        { text: "14", correct: false, feedback: "That's Monday.", misconceptionId: "E-d4-a" },
        { text: "30", correct: false, feedback: "That's the total.", misconceptionId: "E-d4-b" },
        { text: "2", correct: false, feedback: "That's the difference.", misconceptionId: "E-d4-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-d4-a",
        description: "Student reports Monday's value instead of Tuesday's value, mixing up which row/label the question is asking about.",
        rootCause: "Wrong Row Read — reads the value for the wrong label.",
        remediation: "The question asks for TUESDAY's value specifically, not Monday's — Monday = 14, Tuesday = 16; report Tuesday's own value (16), not Monday's (14)."
      },
      {
        misconceptionId: "E-d4-b",
        description: "Student computes and reports the sum of Monday and Tuesday (30) instead of reading Tuesday's individual value.",
        rootCause: "Sum Reported Instead of Individual Value — computes a derived total instead of reading the requested single value.",
        remediation: "The question asks for Tuesday's OWN value, not a computed total — Tuesday = 16 directly from the table, not Monday+Tuesday=30."
      },
      {
        misconceptionId: "E-d4-c",
        description: "Student computes and reports the difference between Monday and Tuesday (2) instead of reading Tuesday's individual value.",
        rootCause: "Difference Reported Instead of Individual Value — computes a derived difference instead of reading the requested single value.",
        remediation: "The question asks for Tuesday's OWN value, not a computed difference — Tuesday = 16 directly from the table, not Tuesday-Monday=2."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the row for Tuesday", hint: "The table lists Monday = 14, Tuesday = 16." },
      { level: 2, description: "Read Tuesday's own value directly", hint: "Don't combine it with Monday — just read Tuesday's row." },
      { level: 3, description: "Report the value", hint: "What number is listed for Tuesday?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d5",
    order: 5,
    cluster: "VOCAB",
    clusterName: CLUSTER_NAMES.VOCAB,
    tier: "T",
    skillId: "DHVOCAB-02",
    question: "A bag has 9 red balls and 1 blue ball. You pick one ball without looking. The chance of picking the blue ball is:",
    options: [
        { text: "Unlikely", correct: true, feedback: "Only 1 out of 10 balls is blue — a small chance." },
        { text: "Likely", correct: false, feedback: "It is not likely because there is only 1 blue.", misconceptionId: "E-d5-a" },
        { text: "Impossible", correct: false, feedback: "There is a blue ball, so it is possible.", misconceptionId: "E-d5-b" },
        { text: "Certain", correct: false, feedback: "It is not certain.", misconceptionId: "E-d5-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-d5-a",
        description: "Student reverses the meaning, calling the minority colour (blue, 1 out of 10) 'likely' instead of 'unlikely'.",
        rootCause: "Vocabulary Reversal — mislabels a LOW-probability event as high-probability.",
        remediation: "'Likely' means MORE probable — but blue balls (1) are vastly outnumbered by red (9), making blue the LESS probable, 'unlikely' outcome, not likely."
      },
      {
        misconceptionId: "E-d5-b",
        description: "Student assumes a small chance (1 out of 10) means the event cannot happen at all.",
        rootCause: "Vocabulary Precision Gap — confuses 'low probability' with 'zero probability' (impossible).",
        remediation: "'Impossible' means it CANNOT happen at all — but there IS 1 blue ball, so it CAN happen; a small but real chance is 'unlikely', not impossible."
      },
      {
        misconceptionId: "E-d5-c",
        description: "Student assumes having ANY blue ball in the bag means picking it is 'certain', not recognising the 9 red balls make it far more likely to pick red.",
        rootCause: "Vocabulary Precision Gap — confuses 'possible' with 'certain' (100% guaranteed).",
        remediation: "'Certain' means the ONLY possible outcome — but 9 red balls could also be picked, so blue is 'unlikely' (a small but real chance), not certain."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Count each colour", hint: "9 red balls, 1 blue ball." },
      { level: 2, description: "Compare blue's share to the whole", hint: "Blue is only 1 out of 10 — a small share." },
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
    tier: "T",
    skillId: "DHPICTO-02",
    question: "Key: 1 sun symbol = 6 days. There are 3 full suns and 1 half sun. How many days in total?",
    options: [
        { text: "21", correct: true, feedback: "3×6 = 18; half of 6 = 3; total = 21." },
        { text: "18", correct: false, feedback: "You forgot the half sun.", misconceptionId: "E-d6-a" },
        { text: "24", correct: false, feedback: "You counted the half as a full sun (4×6).", misconceptionId: "E-d6-b" },
        { text: "9", correct: false, feedback: "You added symbols and key incorrectly.", misconceptionId: "E-d6-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-d6-a",
        description: "Student computes the full symbols' total (3×6=18) but forgets to add the half symbol's contribution.",
        rootCause: "Half-Symbol Contribution Omitted — stops after counting only the full symbols.",
        remediation: "There's ALSO a half sun worth 3 days (half of 6) — add this to the full-symbol total: 18+3=21, not just 18."
      },
      {
        misconceptionId: "E-d6-b",
        description: "Student treats the half symbol as if it were a full symbol, using 4 full symbols instead of 3 full plus a half.",
        rootCause: "Half Symbol Miscounted as Full — doesn't distinguish a half symbol's reduced value from a full symbol's value.",
        remediation: "The half sun is worth HALF of 6 (which is 3), not the full 6 — total = (3×6)+3=21, not (4×6)=24."
      },
      {
        misconceptionId: "E-d6-c",
        description: "Student adds the symbol count and key value together (3+6=9, or similar) instead of multiplying and combining correctly.",
        rootCause: "Operation Selection Error — adds symbols and key instead of multiplying and combining full/half contributions.",
        remediation: "Multiply full symbols by the key (3×6=18), find the half symbol's value (half of 6=3), then ADD these two results: 18+3=21 — don't add the raw symbol count to the key value (3+6=9)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Compute the full symbols' total", hint: "3 × 6 = 18." },
      { level: 2, description: "Compute the half symbol's value", hint: "Half of 6 = 3." },
      { level: 3, description: "Add them together", hint: "18 + 3 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.3.MD.B.3"]
  },
  {
    itemId: "d7",
    order: 7,
    cluster: "PICTO",
    clusterName: CLUSTER_NAMES.PICTO,
    tier: "C",
    skillId: "DHPICTO-03",
    question: "Key: 1 star = 4 votes. Candidate A has 5 stars; Candidate B has 3 stars. How many more votes does Candidate A have?",
    options: [
        { text: "8", correct: true, feedback: "A = 5×4 = 20; B = 3×4 = 12; 20 − 12 = 8." },
        { text: "2", correct: false, feedback: "You only compared the stars (5−3).", misconceptionId: "E-d7-a" },
        { text: "20", correct: false, feedback: "That's A's total.", misconceptionId: "E-d7-b" },
        { text: "12", correct: false, feedback: "That's B's total.", misconceptionId: "E-d7-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-d7-a",
        description: "Student subtracts the raw symbol counts (5-3=2) without first converting them to actual votes using the key.",
        rootCause: "Key Conversion Skipped Before Comparing — compares symbol counts directly instead of the actual quantities they represent.",
        remediation: "Convert BOTH candidates to actual votes first (A=5×4=20, B=3×4=12), THEN subtract: 20-12=8 — don't subtract the raw symbol counts."
      },
      {
        misconceptionId: "E-d7-b",
        description: "Student reports Candidate A's total instead of computing the DIFFERENCE between the two candidates.",
        rootCause: "Final Subtraction Step Omitted — stops after computing one candidate's total, without comparing to the other.",
        remediation: "The question asks how many MORE votes Candidate A has — compute BOTH totals AND subtract them: 20-12=8, not just A's total (20)."
      },
      {
        misconceptionId: "E-d7-c",
        description: "Student reports Candidate B's total instead of computing the DIFFERENCE between the two candidates.",
        rootCause: "Wrong Value Reported — confuses one candidate's total with the requested difference.",
        remediation: "The question asks for the DIFFERENCE between the two candidates' totals, not either candidate's total alone — compute both (20 and 12), then subtract."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Convert Candidate A's symbols to votes", hint: "5 × 4 = 20." },
      { level: 2, description: "Convert Candidate B's symbols to votes", hint: "3 × 4 = 12." },
      { level: 3, description: "Find the difference", hint: "20 - 12 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.3.MD.B.3"]
  },
  {
    itemId: "d8",
    order: 8,
    cluster: "BAR",
    clusterName: CLUSTER_NAMES.BAR,
    tier: "C",
    skillId: "DHBAR-06",
    question: "A bar graph shows June: 45, July: 60. How many more in July than June?",
    options: [
        { text: "15", correct: true, feedback: "60 − 45 = 15." },
        { text: "105", correct: false, feedback: "You added the two values.", misconceptionId: "E-d8-a" },
        { text: "45", correct: false, feedback: "That's June's value.", misconceptionId: "E-d8-b" },
        { text: "60", correct: false, feedback: "That's July's value.", misconceptionId: "E-d8-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-d8-a",
        description: "Student adds the two values instead of subtracting to find 'how many more'.",
        rootCause: "Operation Selection Error — adds when the question ('how many more') calls for subtraction.",
        remediation: "'How many more' means the DIFFERENCE, not the sum — subtract 60-45=15, don't add 60+45=105."
      },
      {
        misconceptionId: "E-d8-b",
        description: "Student reports June's value instead of computing the difference between the two months.",
        rootCause: "Wrong Value Reported — confuses one month's value with the requested difference.",
        remediation: "The question asks how many MORE were in July, not June's raw value — subtract: 60-45=15, not just June's 45."
      },
      {
        misconceptionId: "E-d8-c",
        description: "Student reports July's value instead of computing the difference between the two months.",
        rootCause: "Wrong Value Reported — confuses one month's value with the requested difference.",
        remediation: "The question asks for the difference between the two months, not July's raw value alone — subtract: 60-45=15, not just July's 60."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify both values", hint: "June = 45, July = 60." },
      { level: 2, description: "Recognise 'how many more' means subtraction", hint: "Subtract the smaller from the larger." },
      { level: 3, description: "Compute", hint: "60 - 45 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.3.MD.B.3"]
  },
  {
    itemId: "d9",
    order: 9,
    cluster: "LINE",
    clusterName: CLUSTER_NAMES.LINE,
    tier: "T",
    skillId: "DHLINE-03",
    question: "A line graph shows temperature at 8 AM: 10°C, and at 12 PM: 22°C. How much did the temperature rise?",
    options: [
        { text: "12°C", correct: true, feedback: "22 − 10 = 12°C." },
        { text: "10°C", correct: false, feedback: "That's the starting temperature.", misconceptionId: "E-d9-a" },
        { text: "22°C", correct: false, feedback: "That's the later temperature.", misconceptionId: "E-d9-b" },
        { text: "32°C", correct: false, feedback: "You added instead of subtracted.", misconceptionId: "E-d9-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-d9-a",
        description: "Student reports the starting temperature instead of computing the rise (the difference between start and end).",
        rootCause: "Wrong Value Reported — confuses one endpoint value with the requested change.",
        remediation: "'Rise' means the CHANGE in temperature, not either individual reading — subtract the earlier (10) from the later (22): 22-10=12."
      },
      {
        misconceptionId: "E-d9-b",
        description: "Student reports the ending temperature instead of computing the rise (the difference between start and end).",
        rootCause: "Wrong Value Reported — confuses one endpoint value with the requested change.",
        remediation: "'Rise' means the CHANGE in temperature, not either individual reading — subtract the earlier (10) from the later (22): 22-10=12."
      },
      {
        misconceptionId: "E-d9-c",
        description: "Student adds the two temperatures instead of subtracting to find the rise.",
        rootCause: "Operation Selection Error — adds when the question ('how much did it rise') calls for subtraction.",
        remediation: "'Rise' is found by SUBTRACTING the starting value from the ending value, not adding them: 22-10=12, not 22+10=32."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the starting and ending values", hint: "8 AM = 10°C, 12 PM = 22°C." },
      { level: 2, description: "Recognise 'rise' means the change", hint: "Subtract the earlier value from the later value." },
      { level: 3, description: "Compute", hint: "22 - 10 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d10",
    order: 10,
    cluster: "TABLE",
    clusterName: CLUSTER_NAMES.TABLE,
    tier: "C",
    skillId: "DHTABLE-03",
    question: "A table shows A = 20, B = 30, C = 40. What is the total?",
    options: [
        { text: "90", correct: true, feedback: "20 + 30 + 40 = 90." },
        { text: "50", correct: false, feedback: "You only added A and B.", misconceptionId: "E-d10-a" },
        { text: "70", correct: false, feedback: "You only added B and C.", misconceptionId: "E-d10-b" },
        { text: "60", correct: false, feedback: "Incorrect addition.", misconceptionId: "E-d10-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-d10-a",
        description: "Student adds only two of the three values (A and B), forgetting C.",
        rootCause: "Incomplete Sum — omits one of the three values from the total.",
        remediation: "The total must include ALL THREE values — add A (20), B (30), AND C (40): 20+30+40=90, not just two of them."
      },
      {
        misconceptionId: "E-d10-b",
        description: "Student adds only two of the three values (B and C), forgetting A.",
        rootCause: "Incomplete Sum — omits one of the three values from the total.",
        remediation: "The total must include ALL THREE values — add A (20), B (30), AND C (40): 20+30+40=90, not just two of them."
      },
      {
        misconceptionId: "E-d10-c",
        description: "Student makes an arithmetic slip while adding the three values, landing on an incorrect sum.",
        rootCause: "Computation Error — correct approach (adding all three), but the addition itself is carried out incorrectly.",
        remediation: "Re-add carefully, one pair at a time: 20+30=50, then 50+40=90 — double-check each step."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "List all three values", hint: "A = 20, B = 30, C = 40." },
      { level: 2, description: "Add the first two", hint: "20 + 30 = 50." },
      { level: 3, description: "Add the third", hint: "50 + 40 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d11",
    order: 11,
    cluster: "VOCAB",
    clusterName: CLUSTER_NAMES.VOCAB,
    tier: "H",
    skillId: "DHVOCAB-02",
    question: "A spinner has 5 equal sections: 2 red, 2 blue, and 1 green. Landing on green is:",
    options: [
        { text: "Unlikely", correct: true, feedback: "Only 1 out of 5 sections is green — a small chance." },
        { text: "Likely", correct: false, feedback: "It is not likely because there is only 1 green.", misconceptionId: "E-d11-a" },
        { text: "Certain", correct: false, feedback: "Other colours could come.", misconceptionId: "E-d11-b" },
        { text: "Equally likely", correct: false, feedback: "Green has fewer sections than red or blue.", misconceptionId: "E-d11-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-d11-a",
        description: "Student reverses the meaning, calling the minority colour (green, 1 out of 5) 'likely' instead of 'unlikely'.",
        rootCause: "Vocabulary Reversal — mislabels a LOW-probability event as high-probability.",
        remediation: "'Likely' means MORE probable — but green (1 section) is outnumbered by both red (2) and blue (2), making green the LESS probable, 'unlikely' outcome, not likely."
      },
      {
        misconceptionId: "E-d11-b",
        description: "Student assumes having ANY green section means landing on it is 'certain', not recognising red and blue sections are also present and more numerous.",
        rootCause: "Vocabulary Precision Gap — confuses 'possible' with 'certain' (100% guaranteed).",
        remediation: "'Certain' means the ONLY possible outcome — but red and blue sections could also come up, so green is 'unlikely' (a small but real chance), not certain."
      },
      {
        misconceptionId: "E-d11-c",
        description: "Student assumes 'equally likely' since all three colours exist, without recognising green (1 section) has fewer sections than red (2) or blue (2).",
        rootCause: "Vocabulary Precision Gap — confuses 'all colours are present' with 'all colours have equal chance'.",
        remediation: "'Equally likely' requires the SAME count for each outcome — but green has only 1 section while red and blue each have 2, making them NOT equal; green is less likely."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Count each colour", hint: "2 red, 2 blue, 1 green, out of 5 total." },
      { level: 2, description: "Compare green's share to the whole", hint: "Green is only 1 out of 5 — a small share." },
      { level: 3, description: "Choose the matching vocabulary word", hint: "A small but real chance is described as...?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d12",
    order: 12,
    cluster: "SCALE",
    clusterName: CLUSTER_NAMES.SCALE,
    tier: "H",
    skillId: "DHSCALE-04",
    question: "A bar graph's y‑axis is labelled 0, 20, 40, 60. A bar ends exactly halfway between 40 and 60. What is its value?",
    options: [
        { text: "50", correct: true, feedback: "(40 + 60) ÷ 2 = 50." },
        { text: "40", correct: false, feedback: "That's the lower mark.", misconceptionId: "E-d12-a" },
        { text: "60", correct: false, feedback: "That's the upper mark.", misconceptionId: "E-d12-b" },
        { text: "30", correct: false, feedback: "That's halfway between 20 and 40.", misconceptionId: "E-d12-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-d12-a",
        description: "Student rounds down to the lower gridline (40) instead of computing the actual midpoint value.",
        rootCause: "Midpoint Not Computed — reads the nearest lower mark instead of averaging the two surrounding marks.",
        remediation: "'Halfway between 40 and 60' means the AVERAGE of the two marks, not the lower one — (40+60)÷2=50, not 40."
      },
      {
        misconceptionId: "E-d12-b",
        description: "Student rounds up to the upper gridline (60) instead of computing the actual midpoint value.",
        rootCause: "Midpoint Not Computed — reads the nearest upper mark instead of averaging the two surrounding marks.",
        remediation: "'Halfway between 40 and 60' means the AVERAGE of the two marks, not the upper one — (40+60)÷2=50, not 60."
      },
      {
        misconceptionId: "E-d12-c",
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
  },
  {
    itemId: "d13",
    order: 13,
    cluster: "PICTO",
    clusterName: CLUSTER_NAMES.PICTO,
    tier: "T",
    skillId: "DHPICTO-08",
    question: "Key: 1 apple symbol = 4 apples. The total number of apples is 14. How many full and half apple symbols are there?",
    options: [
        { text: "3 full + 1 half", correct: true, feedback: "3×4 = 12; half of 4 = 2; total = 14." },
        { text: "4 full", correct: false, feedback: "4×4 = 16, too many.", misconceptionId: "E-d13-a" },
        { text: "3 full", correct: false, feedback: "12, not 14.", misconceptionId: "E-d13-b" },
        { text: "2 full + 1 half", correct: false, feedback: "8+2=10, too few.", misconceptionId: "E-d13-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-d13-a",
        description: "Student rounds the total UP to the next full-symbol multiple (4×4=16) instead of finding the exact combination of full and half symbols that gives 14.",
        rootCause: "Overshoots Target By Rounding Up — picks a full-symbol count that exceeds the actual total instead of matching it exactly.",
        remediation: "Test your answer: 4 full symbols would be 4×4=16, but the total is only 14 — that's too many; try one fewer full symbol plus a half symbol: 3×4+2=14."
      },
      {
        misconceptionId: "E-d13-b",
        description: "Student uses only full symbols (3×4=12) and forgets the leftover 2 apples require a half symbol to reach the exact total of 14.",
        rootCause: "Remainder Not Converted to Half Symbol — stops at the whole-number quotient without accounting for the leftover amount.",
        remediation: "3 full symbols gives 12, but the total is 14 — there's a REMAINDER of 2, which is exactly half of the key (4), so add one half symbol: 3 full + 1 half = 14."
      },
      {
        misconceptionId: "E-d13-c",
        description: "Student undershoots by using one fewer full symbol than needed (2 full + half = 10) instead of matching the actual total of 14.",
        rootCause: "Undershoots Target — picks a full-symbol count below the actual total instead of matching it exactly.",
        remediation: "Test your answer: 2 full symbols + 1 half = (2×4)+2=10, but the total is 14 — that's too few; try one more full symbol: 3×4+2=14."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Divide the total by the key", hint: "14 ÷ 4 = 3 remainder 2." },
      { level: 2, description: "Interpret the whole-number part", hint: "3 is the number of full symbols." },
      { level: 3, description: "Interpret the remainder", hint: "The remainder (2) is half of 4 — so there's 1 half symbol." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.3.MD.B.3"]
  },
  {
    itemId: "d14",
    order: 14,
    cluster: "BAR",
    clusterName: CLUSTER_NAMES.BAR,
    tier: "T",
    skillId: "DHBAR-06",
    question: "A bar graph shows Monday: 80, Tuesday: 50. How many more on Monday than Tuesday?",
    options: [
        { text: "30", correct: true, feedback: "80 − 50 = 30." },
        { text: "130", correct: false, feedback: "You added the values.", misconceptionId: "E-d14-a" },
        { text: "80", correct: false, feedback: "That's Monday's value.", misconceptionId: "E-d14-b" },
        { text: "50", correct: false, feedback: "That's Tuesday's value.", misconceptionId: "E-d14-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-d14-a",
        description: "Student adds the two values instead of subtracting to find 'how many more'.",
        rootCause: "Operation Selection Error — adds when the question ('how many more') calls for subtraction.",
        remediation: "'How many more' means the DIFFERENCE, not the sum — subtract 80-50=30, don't add 80+50=130."
      },
      {
        misconceptionId: "E-d14-b",
        description: "Student reports Monday's value instead of computing the difference between the two days.",
        rootCause: "Wrong Value Reported — confuses one day's value with the requested difference.",
        remediation: "The question asks how many MORE were on Monday, not Monday's raw value — subtract: 80-50=30, not just Monday's 80."
      },
      {
        misconceptionId: "E-d14-c",
        description: "Student reports Tuesday's value instead of computing the difference between the two days.",
        rootCause: "Wrong Value Reported — confuses one day's value with the requested difference.",
        remediation: "The question asks for the difference between the two days, not Tuesday's raw value alone — subtract: 80-50=30, not just Tuesday's 50."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify both values", hint: "Monday = 80, Tuesday = 50." },
      { level: 2, description: "Recognise 'how many more' means subtraction", hint: "Subtract the smaller from the larger." },
      { level: 3, description: "Compute", hint: "80 - 50 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.3.MD.B.3"]
  },
  {
    itemId: "d15",
    order: 15,
    cluster: "LINE",
    clusterName: CLUSTER_NAMES.LINE,
    tier: "H",
    skillId: "DHLINE-05",
    question: "A distance‑time graph shows: at 2 PM: 10 km, at 4 PM: 30 km. What was the average speed between 2 PM and 4 PM?",
    options: [
        { text: "10 km/h", correct: true, feedback: "Distance = 20 km; time = 2 h. 20 ÷ 2 = 10 km/h." },
        { text: "20 km/h", correct: false, feedback: "You confused distance with speed.", misconceptionId: "E-d15-a" },
        { text: "30 km/h", correct: false, feedback: "That's the final distance.", misconceptionId: "E-d15-b" },
        { text: "15 km/h", correct: false, feedback: "Incorrect calculation.", misconceptionId: "E-d15-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-d15-a",
        description: "Student computes the change in distance (20 km) but forgets to divide by the elapsed time to get speed.",
        rootCause: "Division-by-Time Step Omitted — stops after finding the distance change, without dividing by the time interval.",
        remediation: "Speed requires dividing the distance CHANGE by the TIME taken — 20 km ÷ 2 hours = 10 km/h, don't stop at the distance change (20) itself."
      },
      {
        misconceptionId: "E-d15-b",
        description: "Student reports the final distance reading (30 km) instead of computing the speed from the change in distance over time.",
        rootCause: "Wrong Value Reported — confuses a raw distance reading with the computed speed.",
        remediation: "Speed is the CHANGE in distance divided by the change in time, not a raw reading — (30-10)÷2=10 km/h, not the final distance (30)."
      },
      {
        misconceptionId: "E-d15-c",
        description: "Student divides by the wrong number of hours, leading to an incorrect speed calculation.",
        rootCause: "Elapsed Time Miscalculated — uses an incorrect time interval instead of the actual 2-hour elapsed time.",
        remediation: "The elapsed time is 4 PM minus 2 PM = 2 hours — compute 20 km ÷ 2 hours = 10 km/h, not a value based on a different time interval."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the change in distance", hint: "30 - 10 = 20 km." },
      { level: 2, description: "Find the elapsed time", hint: "4 PM - 2 PM = 2 hours." },
      { level: 3, description: "Divide distance by time", hint: "20 km ÷ 2 hours = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d16",
    order: 16,
    cluster: "TABLE",
    clusterName: CLUSTER_NAMES.TABLE,
    tier: "H",
    skillId: "DHTABLE-07",
    question: "A table shows three numbers: A = 12, B = ?, C = 18. The average of the three numbers is 15. Find B.",
    options: [
        { text: "15", correct: true, feedback: "Total = 3×15 = 45. Sum of A+C = 30. B = 45 − 30 = 15." },
        { text: "12", correct: false, feedback: "That's A.", misconceptionId: "E-d16-a" },
        { text: "18", correct: false, feedback: "That's C.", misconceptionId: "E-d16-b" },
        { text: "10", correct: false, feedback: "Incorrect calculation.", misconceptionId: "E-d16-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-d16-a",
        description: "Student reports A's value (12) instead of computing the actual missing value B.",
        rootCause: "Known Value Reported Instead of Unknown — confuses a given value with the value being solved for.",
        remediation: "12 is already GIVEN as A's value — you need to find the missing value B: total=3×15=45, 45-(12+18)=15, not 12."
      },
      {
        misconceptionId: "E-d16-b",
        description: "Student reports C's value (18) instead of computing the actual missing value B.",
        rootCause: "Known Value Reported Instead of Unknown — confuses a given value with the value being solved for.",
        remediation: "18 is already GIVEN as C's value — you need to find the missing value B: total=3×15=45, 45-(12+18)=15, not 18."
      },
      {
        misconceptionId: "E-d16-c",
        description: "Student makes an arithmetic slip in the final subtraction, landing on 10 instead of the correct 15.",
        rootCause: "Computation Error — correct approach, but the subtraction is carried out incorrectly.",
        remediation: "Recompute carefully: total = 3×15=45, known sum = 12+18=30, missing = 45-30=15, not 10."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the total needed for the average", hint: "3 × 15 = 45." },
      { level: 2, description: "Add the known values", hint: "12 + 18 = 30." },
      { level: 3, description: "Subtract to find the missing value", hint: "45 - 30 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.SP.B.5C"]
  },
  {
    itemId: "d17",
    order: 17,
    cluster: "VOCAB",
    clusterName: CLUSTER_NAMES.VOCAB,
    tier: "C",
    skillId: "DHVOCAB-01",
    question: "A bag contains 5 red and 3 blue marbles. You pick one marble. The chance of picking a red marble is:",
    options: [
        { text: "Likely", correct: true, feedback: "5 out of 8 is more than half, so it is likely." },
        { text: "Certain", correct: false, feedback: "Blue marbles also exist.", misconceptionId: "E-d17-a" },
        { text: "Unlikely", correct: false, feedback: "5 out of 8 is likely, not unlikely.", misconceptionId: "E-d17-b" },
        { text: "Equally likely", correct: false, feedback: "Red and blue are not equal in number.", misconceptionId: "E-d17-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-d17-a",
        description: "Student assumes having MOST marbles be red means picking red is 'certain', not recognising some chance of blue remains.",
        rootCause: "Vocabulary Precision Gap — confuses 'most likely' with 'certain' (100% guaranteed).",
        remediation: "'Certain' means the ONLY possible outcome — but there are 3 blue marbles, so picking blue remains possible; red is 'likely' (probable but not guaranteed), not certain."
      },
      {
        misconceptionId: "E-d17-b",
        description: "Student reverses the meaning, calling the majority colour (red, 5 out of 8) 'unlikely' instead of 'likely'.",
        rootCause: "Vocabulary Reversal — mislabels a HIGH-probability event as low-probability.",
        remediation: "'Unlikely' means LESS probable — but red marbles (5) outnumber blue (3), making red the MORE probable, 'likely' outcome, not unlikely."
      },
      {
        misconceptionId: "E-d17-c",
        description: "Student assumes 'equally likely' since both colours exist, without recognising red (5) is more numerous than blue (3).",
        rootCause: "Vocabulary Precision Gap — confuses 'both are present' with 'both are equally probable'.",
        remediation: "'Equally likely' requires the SAME number for each outcome — but red has 5 marbles and blue has only 3, making them NOT equal; red is more likely."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Count each colour", hint: "5 red marbles, 3 blue marbles." },
      { level: 2, description: "Compare the counts", hint: "Red outnumbers blue, but blue still exists." },
      { level: 3, description: "Choose the matching vocabulary word", hint: "A colour that's more common but not the only one is described as...?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d18",
    order: 18,
    cluster: "SCALE",
    clusterName: CLUSTER_NAMES.SCALE,
    tier: "C",
    skillId: "DHPICTO-02",
    question: "Key: 1 leaf symbol = 10 leaves. There are 4 full leaves and 2 half leaves. How many leaves in total?",
    options: [
        { text: "50", correct: true, feedback: "4×10 = 40; 2×5 = 10; total = 50." },
        { text: "40", correct: false, feedback: "You forgot the half leaves.", misconceptionId: "E-d18-a" },
        { text: "60", correct: false, feedback: "You counted halves as full (6×10).", misconceptionId: "E-d18-b" },
        { text: "42", correct: false, feedback: "You added 40+2.", misconceptionId: "E-d18-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-d18-a",
        description: "Student computes the full symbols' total (4×10=40) but forgets to add the two half symbols' contribution.",
        rootCause: "Half-Symbol Contribution Omitted — stops after counting only the full symbols.",
        remediation: "There are ALSO 2 half symbols worth 5 leaves each (half of 10) — add this to the full-symbol total: 40+(2×5)=50, not just 40."
      },
      {
        misconceptionId: "E-d18-b",
        description: "Student treats the 2 half symbols as if they were 2 full symbols, using 6 full symbols instead of 4 full plus 2 halves.",
        rootCause: "Half Symbols Miscounted as Full — doesn't distinguish half symbols' reduced value from full symbols' value.",
        remediation: "Each half symbol is worth HALF of 10 (which is 5), not the full 10 — total = (4×10)+(2×5)=50, not (6×10)=60."
      },
      {
        misconceptionId: "E-d18-c",
        description: "Student adds the full-symbol total (40) to the raw count of half symbols (2) instead of their actual value (5 each).",
        rootCause: "Half-Symbol Count Used Instead of Half-Symbol Value — adds the number of half symbols rather than what they're worth.",
        remediation: "The 2 half symbols are worth 5 leaves EACH (half of 10), so their contribution is 2×5=10, not just the raw count of 2 — total = 40+10=50, not 40+2=42."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Compute the full symbols' total", hint: "4 × 10 = 40." },
      { level: 2, description: "Compute both half symbols' total value", hint: "2 half symbols × 5 (half of 10) = 10." },
      { level: 3, description: "Add them together", hint: "40 + 10 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.3.MD.B.3"]
  },
  {
    itemId: "d19",
    order: 19,
    cluster: "PICTO",
    clusterName: CLUSTER_NAMES.PICTO,
    tier: "H",
    skillId: "DHPICTO-11",
    question: "Pictograph 1: key = 5, has 4 stars. Pictograph 2: key = 3, has 7 stars. Which pictograph represents a larger total?",
    options: [
        { text: "Pictograph 2", correct: true, feedback: "P1 = 5×4 = 20; P2 = 3×7 = 21. P2 is larger." },
        { text: "Pictograph 1", correct: false, feedback: "20 vs 21 — P2 is larger.", misconceptionId: "E-d19-a" },
        { text: "Both are equal", correct: false, feedback: "20 ≠ 21.", misconceptionId: "E-d19-b" },
        { text: "Cannot compare", correct: false, feedback: "We can calculate both totals using their keys.", misconceptionId: "E-d19-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-d19-a",
        description: "Student compares the raw star counts (Pictograph 1 has 4, Pictograph 2 has 7) or the raw key values, without correctly multiplying and comparing the actual totals.",
        rootCause: "Different Keys Not Applied Before Comparing — compares symbol counts or key values directly across two graphs with different keys instead of computing actual totals.",
        remediation: "The two pictographs have DIFFERENT keys (5 vs 3) — convert each to actual totals first: P1=4×5=20, P2=7×3=21 — P2 is larger (21>20), not P1."
      },
      {
        misconceptionId: "E-d19-b",
        description: "Student assumes the two pictographs are equal without actually computing and comparing their totals.",
        rootCause: "Totals Not Actually Compared — assumes equality instead of calculating each pictograph's total.",
        remediation: "Compute each pictograph's total separately: P1 = 4×5 = 20, P2 = 7×3 = 21 — these are NOT equal; P2 is larger by 1."
      },
      {
        misconceptionId: "E-d19-c",
        description: "Student assumes the two pictographs cannot be compared because they use different keys, when in fact both can be converted to actual totals and compared directly.",
        rootCause: "Available Data Underused — treats convertible data as impossible to compare.",
        remediation: "Even with different keys, BOTH pictographs CAN be converted to real totals using key×symbols: P1=4×5=20, P2=7×3=21 — this allows a direct, valid comparison."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Compute Pictograph 1's total using its own key", hint: "4 stars × 5 = 20." },
      { level: 2, description: "Compute Pictograph 2's total using its own key", hint: "7 stars × 3 = 21." },
      { level: 3, description: "Compare the two totals", hint: "Is 20 or 21 bigger?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.3.MD.B.3"]
  },
  {
    itemId: "d20",
    order: 20,
    cluster: "BAR",
    clusterName: CLUSTER_NAMES.BAR,
    tier: "H",
    skillId: "DHBAR-09",
    question: "A bar graph shows School A: 240 students, School B: 160 students. What is the ratio of School A to School B in simplest form?",
    options: [
        { text: "3 : 2", correct: true, feedback: "240:160 divide both by 80 → 3:2." },
        { text: "2 : 3", correct: false, feedback: "That's B to A, not A to B.", misconceptionId: "E-d20-a" },
        { text: "240 : 160", correct: false, feedback: "Not simplified.", misconceptionId: "E-d20-b" },
        { text: "4 : 3", correct: false, feedback: "Incorrect simplification.", misconceptionId: "E-d20-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-d20-a",
        description: "Student reverses the order of the ratio, writing School B to School A instead of School A to School B as asked.",
        rootCause: "Ratio Order Reversed — swaps the two quantities instead of matching the order the question specifies.",
        remediation: "The question asks for School A TO School B — A goes first: 240:160 simplifies to 3:2, not 2:3 (which would be B to A)."
      },
      {
        misconceptionId: "E-d20-b",
        description: "Student writes the ratio correctly but leaves it unsimplified instead of reducing to simplest form.",
        rootCause: "Simplification Step Omitted — stops after writing the raw ratio without dividing by the HCF.",
        remediation: "240:160 must be SIMPLIFIED — divide both numbers by their HCF (80): 240÷80=3, 160÷80=2, giving 3:2, not the raw 240:160."
      },
      {
        misconceptionId: "E-d20-c",
        description: "Student divides both numbers by an incorrect factor (not their actual HCF), landing on 4:3 instead of the correct 3:2.",
        rootCause: "Simplification Error — divides by a factor that isn't the true HCF of both numbers.",
        remediation: "Find the actual HCF of 240 and 160, which is 80 — dividing both by 80 gives 240÷80=3 and 160÷80=2, so 3:2, not 4:3."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Write the ratio in the order asked", hint: "School A to School B: 240:160." },
      { level: 2, description: "Find the HCF of both numbers", hint: "The HCF of 240 and 160 is 80." },
      { level: 3, description: "Divide both terms by the HCF", hint: "240÷80 : 160÷80 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.RP.A.1"]
  }
];

const recheckItems = [
  {
    itemId: "r1",
    order: 1,
    cluster: "PICTO",
    clusterName: CLUSTER_NAMES.PICTO,
    skillId: "DHPICTO-02",
    question: "Key: 1 car symbol = 6 cars. There are 3 full car symbols and 1 half car symbol. How many cars in total?",
    options: [
        { text: "21", correct: true, feedback: "3×6 = 18; half of 6 = 3; total = 21." },
        { text: "18", correct: false, feedback: "You forgot the half symbol.", misconceptionId: "E-r1-a" },
        { text: "24", correct: false, feedback: "You counted the half symbol as a full symbol.", misconceptionId: "E-r1-b" },
        { text: "9", correct: false, feedback: "You added symbols and key incorrectly.", misconceptionId: "E-r1-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r1-a",
        description: "Student computes the full symbols' total (3×6=18) but forgets to add the half symbol's contribution.",
        rootCause: "Half-Symbol Contribution Omitted — stops after counting only the full symbols.",
        remediation: "There's ALSO a half symbol worth 3 cars (half of 6) — add this to the full-symbol total: 18+3=21, not just 18."
      },
      {
        misconceptionId: "E-r1-b",
        description: "Student treats the half symbol as if it were a full symbol, using 4 full symbols instead of 3 full plus a half.",
        rootCause: "Half Symbol Miscounted as Full — doesn't distinguish a half symbol's reduced value from a full symbol's value.",
        remediation: "The half symbol is worth HALF of 6 (which is 3), not the full 6 — total = (3×6)+3=21, not (4×6)=24."
      },
      {
        misconceptionId: "E-r1-c",
        description: "Student adds the symbol count and key value together (3+6=9, or similar) instead of multiplying and combining correctly.",
        rootCause: "Operation Selection Error — adds symbols and key instead of multiplying and combining full/half contributions.",
        remediation: "Multiply full symbols by the key (3×6=18), find the half symbol's value (half of 6=3), then ADD these two results: 18+3=21 — don't add the raw symbol count to the key value (3+6=9)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Compute the full symbols' total", hint: "3 × 6 = 18." },
      { level: 2, description: "Compute the half symbol's value", hint: "Half of 6 = 3." },
      { level: 3, description: "Add them together", hint: "18 + 3 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.3.MD.B.3"]
  },
  {
    itemId: "r2",
    order: 2,
    cluster: "BAR",
    clusterName: CLUSTER_NAMES.BAR,
    skillId: "DHBAR-06",
    question: "A bar graph shows Day X: 35, Day Y: 50. How many more on Day Y?",
    options: [
        { text: "15", correct: true, feedback: "50 − 35 = 15." },
        { text: "85", correct: false, feedback: "You added the two values.", misconceptionId: "E-r2-a" },
        { text: "35", correct: false, feedback: "That's Day X's value.", misconceptionId: "E-r2-b" },
        { text: "50", correct: false, feedback: "That's Day Y's value.", misconceptionId: "E-r2-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r2-a",
        description: "Student adds the two values instead of subtracting to find 'how many more'.",
        rootCause: "Operation Selection Error — adds when the question ('how many more') calls for subtraction.",
        remediation: "'How many more' means the DIFFERENCE, not the sum — subtract 50-35=15, don't add 50+35=85."
      },
      {
        misconceptionId: "E-r2-b",
        description: "Student reports Day X's value instead of computing the difference between the two days.",
        rootCause: "Wrong Value Reported — confuses one day's value with the requested difference.",
        remediation: "The question asks how many MORE were on Day Y, not Day X's raw value — subtract: 50-35=15, not just Day X's 35."
      },
      {
        misconceptionId: "E-r2-c",
        description: "Student reports Day Y's value instead of computing the difference between the two days.",
        rootCause: "Wrong Value Reported — confuses one day's value with the requested difference.",
        remediation: "The question asks for the difference between the two days, not Day Y's raw value alone — subtract: 50-35=15, not just Day Y's 50."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify both values", hint: "Day X = 35, Day Y = 50." },
      { level: 2, description: "Recognise 'how many more' means subtraction", hint: "Subtract the smaller from the larger." },
      { level: 3, description: "Compute", hint: "50 - 35 = ?" }
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
    question: "A line graph shows temperature at 9 AM: 12°C, and at 11 AM: 20°C. How much did the temperature rise?",
    options: [
        { text: "8°C", correct: true, feedback: "20 − 12 = 8°C." },
        { text: "12°C", correct: false, feedback: "That's the starting temperature.", misconceptionId: "E-r3-a" },
        { text: "20°C", correct: false, feedback: "That's the later temperature.", misconceptionId: "E-r3-b" },
        { text: "32°C", correct: false, feedback: "You added instead of subtracted.", misconceptionId: "E-r3-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r3-a",
        description: "Student reports the starting temperature instead of computing the rise (the difference between start and end).",
        rootCause: "Wrong Value Reported — confuses one endpoint value with the requested change.",
        remediation: "'Rise' means the CHANGE in temperature, not either individual reading — subtract the earlier (12) from the later (20): 20-12=8."
      },
      {
        misconceptionId: "E-r3-b",
        description: "Student reports the ending temperature instead of computing the rise (the difference between start and end).",
        rootCause: "Wrong Value Reported — confuses one endpoint value with the requested change.",
        remediation: "'Rise' means the CHANGE in temperature, not either individual reading — subtract the earlier (12) from the later (20): 20-12=8."
      },
      {
        misconceptionId: "E-r3-c",
        description: "Student adds the two temperatures instead of subtracting to find the rise.",
        rootCause: "Operation Selection Error — adds when the question ('how much did it rise') calls for subtraction.",
        remediation: "'Rise' is found by SUBTRACTING the starting value from the ending value, not adding them: 20-12=8, not 20+12=32."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the starting and ending values", hint: "9 AM = 12°C, 11 AM = 20°C." },
      { level: 2, description: "Recognise 'rise' means the change", hint: "Subtract the earlier value from the later value." },
      { level: 3, description: "Compute", hint: "20 - 12 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "r4",
    order: 4,
    cluster: "TABLE",
    clusterName: CLUSTER_NAMES.TABLE,
    skillId: "DHTABLE-03",
    question: "A table shows A = 10, B = 20, C = 30. What is the total?",
    options: [
        { text: "60", correct: true, feedback: "10 + 20 + 30 = 60." },
        { text: "30", correct: false, feedback: "That's just one value.", misconceptionId: "E-r4-a" },
        { text: "50", correct: false, feedback: "You only added two of the three values.", misconceptionId: "E-r4-b" },
        { text: "40", correct: false, feedback: "You only added two of the three values.", misconceptionId: "E-r4-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r4-a",
        description: "Student reports a single value (30, matching C) instead of the sum of all three values.",
        rootCause: "Individual Value Reported Instead of Total — confuses one value with the requested sum.",
        remediation: "The question asks for the TOTAL (sum of all three values), not any single value — add 10+20+30=60, not just one of them (30)."
      },
      {
        misconceptionId: "E-r4-b",
        description: "Student adds only two of the three values (B and C), forgetting A.",
        rootCause: "Incomplete Sum — omits one of the three values from the total.",
        remediation: "The total must include ALL THREE values — add A (10), B (20), AND C (30): 10+20+30=60, not just two of them."
      },
      {
        misconceptionId: "E-r4-c",
        description: "Student adds only two of the three values (A and B), forgetting C.",
        rootCause: "Incomplete Sum — omits one of the three values from the total.",
        remediation: "The total must include ALL THREE values — add A (10), B (20), AND C (30): 10+20+30=60, not just two of them."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "List all three values", hint: "A = 10, B = 20, C = 30." },
      { level: 2, description: "Add the first two", hint: "10 + 20 = 30." },
      { level: 3, description: "Add the third", hint: "30 + 30 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "r5",
    order: 5,
    cluster: "VOCAB",
    clusterName: CLUSTER_NAMES.VOCAB,
    skillId: "DHVOCAB-01",
    question: "A bag contains 1 red ball and 9 blue balls. You pick one ball. The chance of picking a blue ball is:",
    options: [
        { text: "Likely", correct: true, feedback: "9 out of 10 is very likely." },
        { text: "Certain", correct: false, feedback: "There is also a red ball, so not 100% sure.", misconceptionId: "E-r5-a" },
        { text: "Unlikely", correct: false, feedback: "9 out of 10 is likely, not unlikely.", misconceptionId: "E-r5-b" },
        { text: "Impossible", correct: false, feedback: "Blue balls clearly exist.", misconceptionId: "E-r5-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r5-a",
        description: "Student assumes having MOST balls be blue means picking blue is 'certain', not recognising some chance of red remains.",
        rootCause: "Vocabulary Precision Gap — confuses 'most likely' with 'certain' (100% guaranteed).",
        remediation: "'Certain' means the ONLY possible outcome — but there is 1 red ball, so picking red remains possible; blue is 'likely' (probable but not guaranteed), not certain."
      },
      {
        misconceptionId: "E-r5-b",
        description: "Student reverses the meaning, calling the majority colour (blue, 9 out of 10) 'unlikely' instead of 'likely'.",
        rootCause: "Vocabulary Reversal — mislabels a HIGH-probability event as low-probability.",
        remediation: "'Unlikely' means LESS probable — but blue balls (9) vastly outnumber red (1), making blue the MORE probable, 'likely' outcome, not unlikely."
      },
      {
        misconceptionId: "E-r5-c",
        description: "Student assumes a majority colour that isn't the ONLY colour means it's 'impossible', misapplying the term.",
        rootCause: "Vocabulary Precision Gap — confuses 'not certain' with 'impossible' (0% chance).",
        remediation: "'Impossible' would mean blue CANNOT be picked at all — but blue balls clearly exist (9 of them), so picking blue is very much possible, indeed 'likely', not impossible."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Count each colour", hint: "1 red ball, 9 blue balls." },
      { level: 2, description: "Compare the counts", hint: "Blue vastly outnumbers red, but red still exists." },
      { level: 3, description: "Choose the matching vocabulary word", hint: "A colour that's more common but not the only one is described as...?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "r6",
    order: 6,
    cluster: "SCALE",
    clusterName: CLUSTER_NAMES.SCALE,
    skillId: "DHPICTO-08",
    question: "Key: 1 fish symbol = 8 fish. The total number of fish is 20. How many full and half fish symbols are there?",
    options: [
        { text: "2 full + 1 half", correct: true, feedback: "2×8=16; half=4; total=20." },
        { text: "3 full", correct: false, feedback: "3×8=24, too many.", misconceptionId: "E-r6-a" },
        { text: "2 full", correct: false, feedback: "16, not 20.", misconceptionId: "E-r6-b" },
        { text: "1 full + 1 half", correct: false, feedback: "8+4=12, too few.", misconceptionId: "E-r6-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r6-a",
        description: "Student rounds the total UP to the next full-symbol multiple (3×8=24) instead of finding the exact combination of full and half symbols that gives 20.",
        rootCause: "Overshoots Target By Rounding Up — picks a full-symbol count that exceeds the actual total instead of matching it exactly.",
        remediation: "Test your answer: 3 full symbols would be 3×8=24, but the total is only 20 — that's too many; try one fewer full symbol plus a half symbol: 2×8+4=20."
      },
      {
        misconceptionId: "E-r6-b",
        description: "Student uses only full symbols (2×8=16) and forgets the leftover 4 fish require a half symbol to reach the exact total of 20.",
        rootCause: "Remainder Not Converted to Half Symbol — stops at the whole-number quotient without accounting for the leftover amount.",
        remediation: "2 full symbols gives 16, but the total is 20 — there's a REMAINDER of 4, which is exactly half of the key (8), so add one half symbol: 2 full + 1 half = 20."
      },
      {
        misconceptionId: "E-r6-c",
        description: "Student undershoots by using one fewer full symbol than needed (1 full + half = 12) instead of matching the actual total of 20.",
        rootCause: "Undershoots Target — picks a full-symbol count below the actual total instead of matching it exactly.",
        remediation: "Test your answer: 1 full symbol + 1 half = (1×8)+4=12, but the total is 20 — that's too few; try one more full symbol: 2×8+4=20."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Divide the total by the key", hint: "20 ÷ 8 = 2 remainder 4." },
      { level: 2, description: "Interpret the whole-number part", hint: "2 is the number of full symbols." },
      { level: 3, description: "Interpret the remainder", hint: "The remainder (4) is half of 8 — so there's 1 half symbol." }
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
    question: "Key: 1 star = 4 points. Team A: 6 stars; Team B: 4 stars + 1 half star. Which team has more points?",
    options: [
        { text: "Team A", correct: true, feedback: "A = 24; B = 16+2 = 18. A has more." },
        { text: "Team B", correct: false, feedback: "A has 24, B has 18 — A is ahead, not B.", misconceptionId: "E-r7-a" },
        { text: "Both equal", correct: false, feedback: "24 ≠ 18.", misconceptionId: "E-r7-b" },
        { text: "Cannot compare", correct: false, feedback: "We can calculate both totals using the key.", misconceptionId: "E-r7-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r7-a",
        description: "Student correctly computes both totals (A=24, B=18) but reverses who has more, saying B instead of A.",
        rootCause: "Comparison Direction Reversed — computes the right numbers but names the wrong winner.",
        remediation: "Compare the two totals carefully: A=24, B=18 — since 24 > 18, Team A has MORE points, not Team B."
      },
      {
        misconceptionId: "E-r7-b",
        description: "Student assumes the two teams have equal points without actually computing and comparing their totals.",
        rootCause: "Totals Not Actually Compared — assumes equality instead of calculating each team's total.",
        remediation: "Compute each team's total separately: A = 6×4=24, B = (4×4)+2=18 — these are NOT equal; A has 6 more."
      },
      {
        misconceptionId: "E-r7-c",
        description: "Student assumes the two teams cannot be compared because one has a half symbol, when both CAN be converted to actual points and compared directly.",
        rootCause: "Available Data Underused — treats convertible data as impossible to compare.",
        remediation: "Even with a half symbol, BOTH teams CAN be converted to real points: A=6×4=24, B=(4×4)+2=18 — this allows a direct, valid comparison."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Compute Team A's total", hint: "6 × 4 = 24." },
      { level: 2, description: "Compute Team B's total", hint: "4×4 + half of 4 = 16 + 2 = 18." },
      { level: 3, description: "Compare the two totals", hint: "Is 24 or 18 bigger?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.3.MD.B.3"]
  },
  {
    itemId: "r8",
    order: 8,
    cluster: "BAR",
    clusterName: CLUSTER_NAMES.BAR,
    skillId: "DHBAR-09",
    question: "A bar graph shows School A: 300, School B: 200. What is the ratio A to B in simplest form?",
    options: [
        { text: "3 : 2", correct: true, feedback: "300:200 ÷100 = 3:2." },
        { text: "2 : 3", correct: false, feedback: "That's B to A, not A to B.", misconceptionId: "E-r8-a" },
        { text: "300 : 200", correct: false, feedback: "Not simplified.", misconceptionId: "E-r8-b" },
        { text: "5 : 3", correct: false, feedback: "Incorrect simplification.", misconceptionId: "E-r8-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r8-a",
        description: "Student reverses the order of the ratio, writing School B to School A instead of School A to School B as asked.",
        rootCause: "Ratio Order Reversed — swaps the two quantities instead of matching the order the question specifies.",
        remediation: "The question asks for A TO B — A goes first: 300:200 simplifies to 3:2, not 2:3 (which would be B to A)."
      },
      {
        misconceptionId: "E-r8-b",
        description: "Student writes the ratio correctly but leaves it unsimplified instead of reducing to simplest form.",
        rootCause: "Simplification Step Omitted — stops after writing the raw ratio without dividing by the HCF.",
        remediation: "300:200 must be SIMPLIFIED — divide both numbers by their HCF (100): 300÷100=3, 200÷100=2, giving 3:2, not the raw 300:200."
      },
      {
        misconceptionId: "E-r8-c",
        description: "Student divides both numbers by an incorrect factor (not their actual HCF), landing on 5:3 instead of the correct 3:2.",
        rootCause: "Simplification Error — divides by a factor that isn't the true HCF of both numbers.",
        remediation: "Find the actual HCF of 300 and 200, which is 100 — dividing both by 100 gives 300÷100=3 and 200÷100=2, so 3:2, not 5:3."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Write the ratio in the order asked", hint: "A to B: 300:200." },
      { level: 2, description: "Find the HCF of both numbers", hint: "The HCF of 300 and 200 is 100." },
      { level: 3, description: "Divide both terms by the HCF", hint: "300÷100 : 200÷100 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.RP.A.1"]
  },
  {
    itemId: "r9",
    order: 9,
    cluster: "LINE",
    clusterName: CLUSTER_NAMES.LINE,
    skillId: "DHLINE-05",
    question: "A distance‑time graph shows 1 PM: 5 km, 2 PM: 15 km. What was the average speed?",
    options: [
        { text: "10 km/h", correct: true, feedback: "Distance=10 km; time=1 h; speed=10 km/h." },
        { text: "5 km/h", correct: false, feedback: "That's the starting distance, not the speed.", misconceptionId: "E-r9-a" },
        { text: "15 km/h", correct: false, feedback: "That's the final distance, not the speed.", misconceptionId: "E-r9-b" },
        { text: "20 km/h", correct: false, feedback: "You added instead of subtracted.", misconceptionId: "E-r9-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r9-a",
        description: "Student reports the starting distance reading (5 km) instead of computing the speed from the change in distance.",
        rootCause: "Wrong Value Reported — confuses a raw distance reading with the computed speed.",
        remediation: "Speed is the CHANGE in distance divided by the change in time, not a raw reading — (15-5)÷1=10 km/h, not the starting distance (5)."
      },
      {
        misconceptionId: "E-r9-b",
        description: "Student reports the ending distance reading (15 km) instead of computing the speed from the change in distance.",
        rootCause: "Wrong Value Reported — confuses a raw distance reading with the computed speed.",
        remediation: "Speed is the CHANGE in distance divided by the change in time, not a raw reading — (15-5)÷1=10 km/h, not the ending distance (15)."
      },
      {
        misconceptionId: "E-r9-c",
        description: "Student adds the two distance readings instead of subtracting to find the change in distance.",
        rootCause: "Operation Selection Error — adds when finding the change requires subtraction.",
        remediation: "The change in distance is found by SUBTRACTING the earlier reading from the later one, not adding: 15-5=10, then ÷1 hour = 10 km/h, not 15+5=20."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the change in distance", hint: "15 - 5 = 10 km." },
      { level: 2, description: "Find the change in time", hint: "2 PM - 1 PM = 1 hour." },
      { level: 3, description: "Divide distance by time", hint: "10 km ÷ 1 hour = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "r10",
    order: 10,
    cluster: "VOCAB",
    clusterName: CLUSTER_NAMES.VOCAB,
    skillId: "DHVOCAB-02",
    question: "A spinner has 1 red section and 4 blue sections. Landing on red is:",
    options: [
        { text: "Unlikely", correct: true, feedback: "Only 1 out of 5 sections is red." },
        { text: "Likely", correct: false, feedback: "Only 1 out of 5 sections is red — that's unlikely, not likely.", misconceptionId: "E-r10-a" },
        { text: "Certain", correct: false, feedback: "There are also blue sections.", misconceptionId: "E-r10-b" },
        { text: "Equally likely", correct: false, feedback: "Red has far fewer sections than blue.", misconceptionId: "E-r10-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r10-a",
        description: "Student reverses the meaning, calling the minority colour (red, 1 out of 5) 'likely' instead of 'unlikely'.",
        rootCause: "Vocabulary Reversal — mislabels a LOW-probability event as high-probability.",
        remediation: "'Likely' means MORE probable — but red (1 section) is vastly outnumbered by blue (4), making red the LESS probable, 'unlikely' outcome, not likely."
      },
      {
        misconceptionId: "E-r10-b",
        description: "Student assumes having ANY red section means landing on it is 'certain', not recognising blue sections are also present and more numerous.",
        rootCause: "Vocabulary Precision Gap — confuses 'possible' with 'certain' (100% guaranteed).",
        remediation: "'Certain' means the ONLY possible outcome — but 4 blue sections could also come up, so red is 'unlikely' (a small but real chance), not certain."
      },
      {
        misconceptionId: "E-r10-c",
        description: "Student assumes 'equally likely' since both colours exist, without recognising red (1 section) has far fewer sections than blue (4).",
        rootCause: "Vocabulary Precision Gap — confuses 'both are present' with 'both are equally probable'.",
        remediation: "'Equally likely' requires the SAME count for each outcome — but red has only 1 section while blue has 4, making them NOT equal; red is less likely."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Count each colour", hint: "1 red section, 4 blue sections." },
      { level: 2, description: "Compare red's share to the whole", hint: "Red is only 1 out of 5 — a small share." },
      { level: 3, description: "Choose the matching vocabulary word", hint: "A small but real chance is described as...?" }
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
    title: "Data Handling — Speed & Strategy",
    subtitle: "Telangana & Cambridge · Level 4 · Speed & Strategy",
    description: "A 25-minute timed diagnostic mixing Speed, Core, Challenge and Trap items across every data-handling cluster.",
    clusterNames: CLUSTER_NAMES,
    gateReviewHTML: "",
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

// seed/mathSeedCh8DataHandlingL1.js
//
// Populates math_chapters and math_questions with Grade 5, Chapter 8
// (Data Handling), Level 1 — converted from the standalone HTML file
// ch-8-data-handling-level-1.html.
//
// Run with: node seed/mathSeedCh8DataHandlingL1.js

const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-5";
const GRADE_LABEL = "Grade 5";
const CHAPTER_SLUG = "ch-8-data-handling";
const CHAPTER_NAME = "Data Handling";
const LEVEL = 1;

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
    cluster: "SCALE",
    clusterName: CLUSTER_NAMES.SCALE,
    skillId: "DHSCALE-01",
    question: "A pictograph uses a key: 1 symbol = 4 books. What does one symbol represent?",
    options: [
        { text: "4 books", correct: true, feedback: "The key tells you the value of one symbol." },
        { text: "1 book", correct: false, feedback: "The key says 1 symbol = 4 books.", misconceptionId: "E-w1-a" },
        { text: "2 books", correct: false, feedback: "Check the key carefully.", misconceptionId: "E-w1-b" },
        { text: "8 books", correct: false, feedback: "Don't multiply yet — just read the key value.", misconceptionId: "E-w1-c" }
      ],
    retryHint: "Look at the key: it tells you the number that one symbol stands for.",
    misconceptions: [
      {
        misconceptionId: "E-w1-a",
        description: "Student assumes one symbol always represents one item, ignoring the key's stated value.",
        rootCause: "Key Not Read — defaults to a 1-to-1 assumption instead of checking the actual key value.",
        remediation: "Always read the KEY first — it explicitly states what one symbol represents; here it says 1 symbol = 4 books, not 1 book."
      },
      {
        misconceptionId: "E-w1-b",
        description: "Student guesses a plausible-sounding value (2) instead of reading the key's actual stated number.",
        rootCause: "Key Not Read — guesses instead of checking the given key value.",
        remediation: "The key directly states the value — don't guess; it says 1 symbol = 4 books, not 2."
      },
      {
        misconceptionId: "E-w1-c",
        description: "Student prematurely multiplies the key value by something (like doubling it) instead of simply reading it.",
        rootCause: "Premature Multiplication — applies an unnecessary operation before the question even asks for a total count.",
        remediation: "This question just asks what ONE symbol represents — read the key value directly (4 books), don't multiply it by anything yet."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the key", hint: "Every pictograph has a key explaining the symbol's value." },
      { level: 2, description: "Read the key's statement", hint: "The key says '1 symbol = 4 books'." },
      { level: 3, description: "State the value", hint: "One symbol represents how many books?" }
    ],
    forwardRiskLinks: [
      { targetSkillId: "DHPICTO-01", probability: 0.4, condition: "Not reading the key correctly before answering recurs whenever a pictograph question asks to compute a total using symbol counts." }
    ],
    learningObjectives: ["CCSS.MATH.CONTENT.3.MD.B.3"]
  },
  {
    itemId: "w2",
    order: 2,
    cluster: "PICTO",
    clusterName: CLUSTER_NAMES.PICTO,
    skillId: "DHPICTO-01",
    question: "In the same pictograph, there are 6 symbols for Tuesday. How many books were there on Tuesday?",
    options: [
        { text: "24", correct: true, feedback: "6 × 4 = 24 books." },
        { text: "6", correct: false, feedback: "You forgot to multiply by the key value.", misconceptionId: "E-w2-a" },
        { text: "4", correct: false, feedback: "That's just the key value.", misconceptionId: "E-w2-b" },
        { text: "10", correct: false, feedback: "Don't add — multiply.", misconceptionId: "E-w2-c" }
      ],
    retryHint: "Count the symbols and multiply by the value of one symbol (the key).",
    misconceptions: [
      {
        misconceptionId: "E-w2-a",
        description: "Student reports the symbol count directly as the answer, without multiplying by the key value.",
        rootCause: "Key Multiplication Omitted — treats the number of symbols as if it were the final answer.",
        remediation: "The symbol COUNT (6) is not the final answer — multiply it by the key value (4 books per symbol) to get the actual total: 6×4=24."
      },
      {
        misconceptionId: "E-w2-b",
        description: "Student reports the key value alone, ignoring the number of symbols shown for Tuesday.",
        rootCause: "Symbol Count Ignored — uses only the key value without factoring in how many symbols there are.",
        remediation: "The key value (4) tells you what ONE symbol is worth — you must multiply it by the NUMBER of symbols (6) to find Tuesday's total: 6×4=24."
      },
      {
        misconceptionId: "E-w2-c",
        description: "Student adds the number of symbols and the key value instead of multiplying them.",
        rootCause: "Operation Selection Error — applies addition when repeated groups call for multiplication.",
        remediation: "6 symbols, each worth 4 books, means 6 EQUAL GROUPS of 4 — combine equal groups by MULTIPLYING (6×4), not adding (6+4)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Count the symbols", hint: "There are 6 symbols for Tuesday." },
      { level: 2, description: "Recall the key value", hint: "Each symbol represents 4 books." },
      { level: 3, description: "Multiply", hint: "6 × 4 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.3.MD.B.3"]
  },
  {
    itemId: "w3",
    order: 3,
    cluster: "BAR",
    clusterName: CLUSTER_NAMES.BAR,
    skillId: "DHBAR-01",
    question: "A bar graph shows ice cream sales: Vanilla 30, Chocolate 45, Strawberry 25. Which flavour sold the most?",
    options: [
        { text: "Chocolate", correct: true, feedback: "The tallest bar represents the largest number." },
        { text: "Vanilla", correct: false, feedback: "Vanilla is 30, less than Chocolate.", misconceptionId: "E-w3-a" },
        { text: "Strawberry", correct: false, feedback: "Strawberry is the smallest.", misconceptionId: "E-w3-b" },
        { text: "All equal", correct: false, feedback: "The numbers are different.", misconceptionId: "E-w3-c" }
      ],
    retryHint: "Look for the highest bar.",
    misconceptions: [
      {
        misconceptionId: "E-w3-a",
        description: "Student picks Vanilla without comparing all three values, missing that Chocolate's 45 is larger than Vanilla's 30.",
        rootCause: "Incomplete Comparison — doesn't compare all the given values before selecting the largest.",
        remediation: "Compare ALL three values (30, 45, 25) side by side — 45 (Chocolate) is the largest, not 30 (Vanilla)."
      },
      {
        misconceptionId: "E-w3-b",
        description: "Student picks Strawberry, the smallest value, perhaps confusing 'most' with 'least'.",
        rootCause: "Most/Least Confusion — reverses the meaning of 'sold the most', picking the smallest value instead.",
        remediation: "'Sold the most' means the LARGEST number — among 30, 45, and 25, the largest is 45 (Chocolate), not 25 (Strawberry, the smallest)."
      },
      {
        misconceptionId: "E-w3-c",
        description: "Student assumes all flavours sold equally without checking the actual different values given.",
        rootCause: "Values Not Compared — doesn't verify whether the given numbers are actually the same.",
        remediation: "The three values (30, 45, 25) are clearly different — check each number rather than assuming they're equal."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "List all three values", hint: "Vanilla 30, Chocolate 45, Strawberry 25." },
      { level: 2, description: "Compare them", hint: "Which number is the largest?" },
      { level: 3, description: "Match to the flavour", hint: "45 belongs to which flavour?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.3.MD.B.3"]
  },
  {
    itemId: "w4",
    order: 4,
    cluster: "LINE",
    clusterName: CLUSTER_NAMES.LINE,
    skillId: "DHLINE-01",
    question: "A line graph shows a plant's height over weeks. At week 4, the point is at 12 cm. What is the height at week 4?",
    options: [
        { text: "12 cm", correct: true, feedback: "Read the value on the vertical axis at week 4." },
        { text: "4 cm", correct: false, feedback: "That's the week number.", misconceptionId: "E-w4-a" },
        { text: "10 cm", correct: false, feedback: "Check the graph again.", misconceptionId: "E-w4-b" },
        { text: "16 cm", correct: false, feedback: "That's too high.", misconceptionId: "E-w4-c" }
      ],
    retryHint: "Find week 4 on the horizontal axis, go up to the point, and read across to the vertical axis.",
    misconceptions: [
      {
        misconceptionId: "E-w4-a",
        description: "Student confuses the horizontal-axis label (week number, 4) with the vertical-axis reading (height, 12 cm).",
        rootCause: "Axis Confusion — reports the horizontal position instead of the vertical value at that position.",
        remediation: "The week number (4) is the HORIZONTAL position; the height is read on the VERTICAL axis at that point — these are two different numbers."
      },
      {
        misconceptionId: "E-w4-b",
        description: "Student misreads the graph, reporting an incorrect nearby value instead of the exact stated height.",
        rootCause: "Reading Precision Error — doesn't read the exact value stated for the point.",
        remediation: "The point at week 4 is stated to be at exactly 12 cm — re-check the exact value given, not an approximate nearby number."
      },
      {
        misconceptionId: "E-w4-c",
        description: "Student overestimates the height, reporting a value higher than what's actually stated.",
        rootCause: "Reading Precision Error — doesn't read the exact value stated for the point.",
        remediation: "The point at week 4 is stated to be at exactly 12 cm — re-check the exact value, not an overestimate."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find week 4 on the horizontal axis", hint: "Locate the '4' mark along the bottom." },
      { level: 2, description: "Find the point above it", hint: "The plant's height point sits directly above week 4." },
      { level: 3, description: "Read across to the vertical axis", hint: "What height value lines up with that point?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "w5",
    order: 5,
    cluster: "TABLE",
    clusterName: CLUSTER_NAMES.TABLE,
    skillId: "DHTABLE-01",
    question: "A table shows the number of absent students: Monday 5, Tuesday 3, Wednesday 7. How many were absent on Wednesday?",
    options: [
        { text: "7", correct: true, feedback: "The table shows 7 for Wednesday." },
        { text: "5", correct: false, feedback: "That's Monday.", misconceptionId: "E-w5-a" },
        { text: "3", correct: false, feedback: "That's Tuesday.", misconceptionId: "E-w5-b" },
        { text: "15", correct: false, feedback: "That's the total — not what is asked.", misconceptionId: "E-w5-c" }
      ],
    retryHint: "Find the row for Wednesday and read the number.",
    misconceptions: [
      {
        misconceptionId: "E-w5-a",
        description: "Student reads the wrong row, reporting Monday's value instead of Wednesday's.",
        rootCause: "Wrong Row Read — matches the wrong day to its value.",
        remediation: "Carefully match each day to its exact number — Monday is 5, but the question asks about Wednesday specifically, which is 7."
      },
      {
        misconceptionId: "E-w5-b",
        description: "Student reads the wrong row, reporting Tuesday's value instead of Wednesday's.",
        rootCause: "Wrong Row Read — matches the wrong day to its value.",
        remediation: "Carefully match each day to its exact number — Tuesday is 3, but the question asks about Wednesday specifically, which is 7."
      },
      {
        misconceptionId: "E-w5-c",
        description: "Student sums all three days' values instead of reading just Wednesday's individual value.",
        rootCause: "Total Computed Instead of Individual Value — adds all values when only one specific value was requested.",
        remediation: "The question asks for Wednesday's count SPECIFICALLY, not the total of all three days — read just the Wednesday row (7), don't sum 5+3+7=15."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the Wednesday row", hint: "Look through the table for the label 'Wednesday'." },
      { level: 2, description: "Read the number in that row", hint: "What value is listed next to Wednesday?" },
      { level: 3, description: "State the answer", hint: "Confirm you're reading Wednesday's row, not another day's." }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "w6",
    order: 6,
    cluster: "VOCAB",
    clusterName: CLUSTER_NAMES.VOCAB,
    skillId: "DHVOCAB-01",
    question: "If you toss a fair coin, it can land on heads or tails. The chance of getting heads is best described as:",
    options: [
        { text: "Equally likely", correct: true, feedback: "There are two outcomes, both equally likely." },
        { text: "Certain", correct: false, feedback: "It is not certain — you could get tails.", misconceptionId: "E-w6-a" },
        { text: "Unlikely", correct: false, feedback: "It is not unlikely; it happens half the time.", misconceptionId: "E-w6-b" },
        { text: "Impossible", correct: false, feedback: "It is possible to get heads.", misconceptionId: "E-w6-c" }
      ],
    retryHint: "With two equal choices, each outcome has the same chance.",
    misconceptions: [
      {
        misconceptionId: "E-w6-a",
        description: "Student assumes any event that CAN happen is 'certain', without recognising that certain means it WILL definitely happen with no other possibility.",
        rootCause: "Vocabulary Precision Gap — confuses 'possible' with 'certain'.",
        remediation: "'Certain' means the ONLY possible outcome — but a coin toss has TWO possible outcomes (heads or tails), so getting heads is not certain, just equally likely with tails."
      },
      {
        misconceptionId: "E-w6-b",
        description: "Student mislabels an event with a 50% chance as 'unlikely', not recognising that unlikely means LESS than half the time.",
        rootCause: "Vocabulary Precision Gap — confuses 'equally likely' (50%) with 'unlikely' (less than 50%).",
        remediation: "'Unlikely' means it happens LESS OFTEN than not — but heads happens exactly HALF the time (same as tails), making it 'equally likely', not unlikely."
      },
      {
        misconceptionId: "E-w6-c",
        description: "Student mislabels a possible event as 'impossible', which specifically means it can NEVER happen.",
        rootCause: "Vocabulary Precision Gap — confuses a lower-probability description with 'impossible' (zero probability).",
        remediation: "'Impossible' means it can NEVER happen — but getting heads happens exactly half the time, which is far from impossible."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "List the possible outcomes", hint: "A coin toss can land on heads or tails — two outcomes." },
      { level: 2, description: "Compare their chances", hint: "Are heads and tails equally common, or is one more common?" },
      { level: 3, description: "Choose the matching vocabulary word", hint: "Two equally common outcomes are described as...?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "w7",
    order: 7,
    cluster: "SCALE",
    clusterName: CLUSTER_NAMES.SCALE,
    skillId: "DHSCALE-02",
    question: "On a bar graph, the y‑axis is marked 0, 10, 20, 30. What is the interval between two consecutive marks?",
    options: [
        { text: "10", correct: true, feedback: "20 − 10 = 10; 10 − 0 = 10." },
        { text: "5", correct: false, feedback: "Count the difference carefully.", misconceptionId: "E-w7-a" },
        { text: "20", correct: false, feedback: "That's the gap from 0 to 20, not consecutive.", misconceptionId: "E-w7-b" },
        { text: "30", correct: false, feedback: "That's the largest number, not the interval.", misconceptionId: "E-w7-c" }
      ],
    retryHint: "Subtract one mark value from the next mark value.",
    misconceptions: [
      {
        misconceptionId: "E-w7-a",
        description: "Student guesses a smaller interval (5) without actually subtracting between consecutive marks.",
        rootCause: "Subtraction Not Performed — guesses instead of computing the actual difference between marks.",
        remediation: "Subtract consecutive marks directly: 10-0=10, or 20-10=10 — the interval is 10, not a guessed value like 5."
      },
      {
        misconceptionId: "E-w7-b",
        description: "Student computes the gap between non-consecutive marks (0 to 20) instead of consecutive marks (0 to 10).",
        rootCause: "Non-Consecutive Marks Compared — skips a mark when computing the interval.",
        remediation: "The interval is between CONSECUTIVE (adjacent) marks only — 0 to 10 (not 0 to 20, which skips over the 10 mark)."
      },
      {
        misconceptionId: "E-w7-c",
        description: "Student reports the largest labeled value (30) instead of computing the interval between adjacent marks.",
        rootCause: "Wrong Value Reported — confuses the axis's maximum value with the spacing between marks.",
        remediation: "30 is just the LARGEST value shown on the axis — the interval is the gap between any two ADJACENT marks, which is 10, not 30."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Pick two consecutive marks", hint: "0 and 10 are next to each other." },
      { level: 2, description: "Subtract", hint: "10 - 0 = ?" },
      { level: 3, description: "Verify with another pair", hint: "Does 20 - 10 give the same result?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.3.MD.B.3"]
  },
  {
    itemId: "w8",
    order: 8,
    cluster: "PICTO",
    clusterName: CLUSTER_NAMES.PICTO,
    skillId: "DHPICTO-02",
    question: "A symbol of a car stands for 3 cars. How many cars does a half symbol represent?",
    options: [
        { text: "1.5", correct: true, feedback: "Half of 3 is 1.5." },
        { text: "3", correct: false, feedback: "That's a full symbol.", misconceptionId: "E-w8-a" },
        { text: "1", correct: false, feedback: "Incorrect — half of 3 is 1.5, not 1.", misconceptionId: "E-w8-b" },
        { text: "6", correct: false, feedback: "You doubled instead of halved.", misconceptionId: "E-w8-c" }
      ],
    retryHint: "A half symbol means half the value of a full symbol.",
    misconceptions: [
      {
        misconceptionId: "E-w8-a",
        description: "Student reports the full symbol's value (3) instead of computing half of it for a half symbol.",
        rootCause: "Halving Step Omitted — treats a half symbol as if it were a full symbol.",
        remediation: "A HALF symbol represents HALF the full symbol's value — divide 3 by 2 to get 1.5, don't use the full value of 3."
      },
      {
        misconceptionId: "E-w8-b",
        description: "Student rounds down instead of computing the exact half-value, giving 1 instead of 1.5.",
        rootCause: "Fraction Rounding Error — rounds a non-whole-number half-value down instead of keeping the exact decimal.",
        remediation: "Half of 3 is exactly 1.5 (a decimal), not rounded down to 1 — 3÷2=1.5, keep the decimal."
      },
      {
        misconceptionId: "E-w8-c",
        description: "Student doubles the full symbol's value instead of halving it.",
        rootCause: "Operation Direction Confusion — multiplies instead of dividing when finding half a value.",
        remediation: "A HALF symbol means DIVIDING the full value by 2, not multiplying it — 3÷2=1.5, not 3×2=6."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the full symbol's value", hint: "One full symbol = 3 cars." },
      { level: 2, description: "Identify the operation for 'half'", hint: "Half means divide by 2." },
      { level: 3, description: "Compute", hint: "3 ÷ 2 = ?" }
    ],
    forwardRiskLinks: [
      { targetSkillId: "DHPICTO-01", probability: 0.35, condition: "Confusing half-symbol values with full-symbol values recurs whenever pictographs mix full and partial symbols in a total count." }
    ],
    learningObjectives: ["CCSS.MATH.CONTENT.3.MD.B.3"]
  }
];

const diagnosticItems = [
  {
    itemId: "d1",
    order: 1,
    cluster: "PICTO",
    clusterName: CLUSTER_NAMES.PICTO,
    skillId: "DHPICTO-01",
    question: "In a pictograph, each sun symbol stands for 5 sunny days. March has 7 sun symbols. How many sunny days were there in March?",
    options: [
        { text: "35", correct: true, feedback: "7 × 5 = 35 sunny days." },
        { text: "7", correct: false, feedback: "You forgot to multiply by the key value.", misconceptionId: "E-d1-a" },
        { text: "5", correct: false, feedback: "That's just the key value.", misconceptionId: "E-d1-b" },
        { text: "12", correct: false, feedback: "You added instead of multiplying.", misconceptionId: "E-d1-c" }
      ],
    backward: "Count the symbols and multiply by the value given in the key.",
    forward: "Pictographs are a fun way to represent data with pictures.",
    misconceptions: [
      {
        misconceptionId: "E-d1-a",
        description: "Student reports the symbol count directly as the answer, without multiplying by the key value.",
        rootCause: "Key Multiplication Omitted — treats the number of symbols as if it were the final answer.",
        remediation: "The symbol COUNT (7) is not the final answer — multiply it by the key value (5 days per symbol) to get the actual total: 7×5=35."
      },
      {
        misconceptionId: "E-d1-b",
        description: "Student reports the key value alone, ignoring the number of symbols shown for March.",
        rootCause: "Symbol Count Ignored — uses only the key value without factoring in how many symbols there are.",
        remediation: "The key value (5) tells you what ONE symbol is worth — you must multiply it by the NUMBER of symbols (7) to find March's total: 7×5=35."
      },
      {
        misconceptionId: "E-d1-c",
        description: "Student adds the number of symbols and the key value instead of multiplying them.",
        rootCause: "Operation Selection Error — applies addition when repeated groups call for multiplication.",
        remediation: "7 symbols, each worth 5 days, means 7 EQUAL GROUPS of 5 — combine equal groups by MULTIPLYING (7×5), not adding (7+5)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Count the symbols", hint: "There are 7 sun symbols for March." },
      { level: 2, description: "Recall the key value", hint: "Each symbol represents 5 sunny days." },
      { level: 3, description: "Multiply", hint: "7 × 5 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.3.MD.B.3"]
  },
  {
    itemId: "d2",
    order: 2,
    cluster: "BAR",
    clusterName: CLUSTER_NAMES.BAR,
    skillId: "DHBAR-02",
    question: "A bar graph shows fruit sold: Apples 20, Bananas 35, Oranges 15. How many bananas were sold?",
    options: [
        { text: "35", correct: true, feedback: "The bar for bananas reaches 35 on the scale." },
        { text: "20", correct: false, feedback: "That's the number for apples.", misconceptionId: "E-d2-a" },
        { text: "15", correct: false, feedback: "That's oranges.", misconceptionId: "E-d2-b" },
        { text: "70", correct: false, feedback: "You added the numbers.", misconceptionId: "E-d2-c" }
      ],
    backward: "Read the height of the bar for bananas on the y‑axis scale.",
    forward: "Bar graphs are used to compare data at a glance.",
    misconceptions: [
      {
        misconceptionId: "E-d2-a",
        description: "Student reads the wrong bar, reporting Apples' value instead of Bananas'.",
        rootCause: "Wrong Bar Read — matches the wrong fruit to its value.",
        remediation: "Carefully match each fruit to its exact bar — Apples is 20, but the question asks about Bananas specifically, which is 35."
      },
      {
        misconceptionId: "E-d2-b",
        description: "Student reads the wrong bar, reporting Oranges' value instead of Bananas'.",
        rootCause: "Wrong Bar Read — matches the wrong fruit to its value.",
        remediation: "Carefully match each fruit to its exact bar — Oranges is 15, but the question asks about Bananas specifically, which is 35."
      },
      {
        misconceptionId: "E-d2-c",
        description: "Student sums all three fruits' values instead of reading just Bananas' individual value.",
        rootCause: "Total Computed Instead of Individual Value — adds all values when only one specific value was requested.",
        remediation: "The question asks for Bananas' count SPECIFICALLY, not the total of all three fruits — read just the Bananas bar (35), don't sum 20+35+15=70."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the Bananas bar", hint: "Look for the bar labeled 'Bananas'." },
      { level: 2, description: "Read its height on the y-axis", hint: "What value does the Bananas bar reach?" },
      { level: 3, description: "Confirm", hint: "Double-check you're reading the Bananas bar, not a different fruit." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.3.MD.B.3"]
  },
  {
    itemId: "d3",
    order: 3,
    cluster: "LINE",
    clusterName: CLUSTER_NAMES.LINE,
    skillId: "DHLINE-01",
    question: "A line graph shows the temperature at different times: 9 AM: 22°C, 10 AM: 24°C, 11 AM: 26°C. What was the temperature at 10 AM?",
    options: [
        { text: "24°C", correct: true, feedback: "The point at 10 AM is at 24 on the scale." },
        { text: "22°C", correct: false, feedback: "That's 9 AM.", misconceptionId: "E-d3-a" },
        { text: "26°C", correct: false, feedback: "That's 11 AM.", misconceptionId: "E-d3-b" },
        { text: "28°C", correct: false, feedback: "Too high.", misconceptionId: "E-d3-c" }
      ],
    backward: "Locate the time on the horizontal axis, go up to the line, and read the value on the vertical axis.",
    forward: "Line graphs are useful for showing trends over time.",
    misconceptions: [
      {
        misconceptionId: "E-d3-a",
        description: "Student reads the wrong point, reporting 9 AM's temperature instead of 10 AM's.",
        rootCause: "Wrong Time Point Read — matches the wrong time to its value.",
        remediation: "Carefully match each time to its exact temperature — 9 AM is 22°C, but the question asks about 10 AM specifically, which is 24°C."
      },
      {
        misconceptionId: "E-d3-b",
        description: "Student reads the wrong point, reporting 11 AM's temperature instead of 10 AM's.",
        rootCause: "Wrong Time Point Read — matches the wrong time to its value.",
        remediation: "Carefully match each time to its exact temperature — 11 AM is 26°C, but the question asks about 10 AM specifically, which is 24°C."
      },
      {
        misconceptionId: "E-d3-c",
        description: "Student overestimates the temperature, reporting a value higher than what's actually stated for 10 AM.",
        rootCause: "Reading Precision Error — doesn't read the exact value stated for the point.",
        remediation: "The point at 10 AM is stated to be exactly 24°C — re-check the exact value given, not an overestimate like 28°C."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find 10 AM on the horizontal axis", hint: "Locate the '10 AM' mark along the bottom." },
      { level: 2, description: "Find the point above it", hint: "The temperature point sits directly above 10 AM." },
      { level: 3, description: "Read across to the vertical axis", hint: "What temperature lines up with that point?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d4",
    order: 4,
    cluster: "TABLE",
    clusterName: CLUSTER_NAMES.TABLE,
    skillId: "DHTABLE-01",
    question: "The table shows students' marks: Ravi 78, Sita 85, John 72. What is John's mark?",
    options: [
        { text: "72", correct: true, feedback: "The row for John shows 72." },
        { text: "78", correct: false, feedback: "That's Ravi's mark.", misconceptionId: "E-d4-a" },
        { text: "85", correct: false, feedback: "That's Sita's mark.", misconceptionId: "E-d4-b" },
        { text: "80", correct: false, feedback: "Not in the table.", misconceptionId: "E-d4-c" }
      ],
    backward: "Find the row for John and read the number in that row.",
    forward: "Tables organise data neatly into rows and columns.",
    misconceptions: [
      {
        misconceptionId: "E-d4-a",
        description: "Student reads the wrong row, reporting Ravi's mark instead of John's.",
        rootCause: "Wrong Row Read — matches the wrong student to their mark.",
        remediation: "Carefully match each student to their exact mark — Ravi's mark is 78, but the question asks about John specifically, whose mark is 72."
      },
      {
        misconceptionId: "E-d4-b",
        description: "Student reads the wrong row, reporting Sita's mark instead of John's.",
        rootCause: "Wrong Row Read — matches the wrong student to their mark.",
        remediation: "Carefully match each student to their exact mark — Sita's mark is 85, but the question asks about John specifically, whose mark is 72."
      },
      {
        misconceptionId: "E-d4-c",
        description: "Student reports a value not actually present in the table, perhaps estimating or misremembering.",
        rootCause: "Value Not From Table — reports a number that doesn't actually appear in the given data.",
        remediation: "Only use the EXACT values given in the table (78, 85, 72) — 80 doesn't appear anywhere in the table, so it can't be the correct answer."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find John's row", hint: "Look through the table for the label 'John'." },
      { level: 2, description: "Read the number in that row", hint: "What value is listed next to John?" },
      { level: 3, description: "Confirm", hint: "Double-check you're reading John's row, not another student's." }
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
    question: "A bag contains 8 red balls and 2 blue balls. Without looking, you pick one ball. Which word best describes picking a red ball?",
    options: [
        { text: "Likely", correct: true, feedback: "There are many red balls, so it is likely, but not certain." },
        { text: "Certain", correct: false, feedback: "There are also blue balls, so it is not 100% sure.", misconceptionId: "E-d5-a" },
        { text: "Unlikely", correct: false, feedback: "With 8 red and 2 blue, red is likely, not unlikely.", misconceptionId: "E-d5-b" },
        { text: "Impossible", correct: false, feedback: "There are red balls, so it is possible.", misconceptionId: "E-d5-c" }
      ],
    backward: "If there are more of one colour, picking that colour is likely.",
    forward: "Probability words help describe the chance of everyday events.",
    misconceptions: [
      {
        misconceptionId: "E-d5-a",
        description: "Student assumes having MOST of a colour means picking it is 'certain', not recognising some chance of the other colour remains.",
        rootCause: "Vocabulary Precision Gap — confuses 'most likely' with 'certain' (100% guaranteed).",
        remediation: "'Certain' means the ONLY possible outcome — but there are still 2 blue balls, so picking blue remains possible; red is 'likely' (probable but not guaranteed), not certain."
      },
      {
        misconceptionId: "E-d5-b",
        description: "Student reverses the meaning, calling the majority colour (red, 8 out of 10) 'unlikely' instead of 'likely'.",
        rootCause: "Vocabulary Precision Gap — mislabels a HIGH-probability event as low-probability.",
        remediation: "'Unlikely' means LESS probable — but red balls (8) vastly outnumber blue (2), making red the MORE probable, 'likely' outcome, not unlikely."
      },
      {
        misconceptionId: "E-d5-c",
        description: "Student mislabels a possible (and probable) event as 'impossible', which specifically means it can NEVER happen.",
        rootCause: "Vocabulary Precision Gap — confuses a description with 'impossible' (zero probability).",
        remediation: "'Impossible' means it can NEVER happen — but there are 8 red balls in the bag, making picking red not just possible but likely."
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
    itemId: "d6",
    order: 6,
    cluster: "SCALE",
    clusterName: CLUSTER_NAMES.SCALE,
    skillId: "DHSCALE-02",
    question: "A bar graph has its y‑axis marked: 0, 5, 10, 15. What is the interval between two consecutive marks?",
    options: [
        { text: "5", correct: true, feedback: "10 − 5 = 5; 5 − 0 = 5." },
        { text: "1", correct: false, feedback: "The marks jump by 5 each time, not 1.", misconceptionId: "E-d6-a" },
        { text: "10", correct: false, feedback: "That's the gap from 0 to 10, not between consecutive marks.", misconceptionId: "E-d6-b" },
        { text: "15", correct: false, feedback: "That's the top mark, not the interval.", misconceptionId: "E-d6-c" }
      ],
    backward: "Subtract the value of one mark from the value of the next mark.",
    forward: "Understanding the scale helps you read the values of the bars correctly.",
    misconceptions: [
      {
        misconceptionId: "E-d6-a",
        description: "Student assumes every axis has an interval of 1 by default, without checking the actual marked values.",
        rootCause: "Default Interval Assumption — assumes a standard interval instead of computing it from the given marks.",
        remediation: "Don't assume the interval is 1 — always compute it from the ACTUAL marks given: 5-0=5, so the interval here is 5, not 1."
      },
      {
        misconceptionId: "E-d6-b",
        description: "Student computes the gap between non-consecutive marks (0 to 10) instead of consecutive marks (0 to 5).",
        rootCause: "Non-Consecutive Marks Compared — skips a mark when computing the interval.",
        remediation: "The interval is between CONSECUTIVE (adjacent) marks only — 0 to 5 (not 0 to 10, which skips over the 5 mark)."
      },
      {
        misconceptionId: "E-d6-c",
        description: "Student reports the largest labeled value (15) instead of computing the interval between adjacent marks.",
        rootCause: "Wrong Value Reported — confuses the axis's maximum value with the spacing between marks.",
        remediation: "15 is just the LARGEST value shown on the axis — the interval is the gap between any two ADJACENT marks, which is 5, not 15."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Pick two consecutive marks", hint: "0 and 5 are next to each other." },
      { level: 2, description: "Subtract", hint: "5 - 0 = ?" },
      { level: 3, description: "Verify with another pair", hint: "Does 10 - 5 give the same result?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.3.MD.B.3"]
  },
  {
    itemId: "d7",
    order: 7,
    cluster: "PICTO",
    clusterName: CLUSTER_NAMES.PICTO,
    skillId: "DHPICTO-02",
    question: "A pictograph shows trees planted. Each tree symbol represents 10 trees. A park has 4 full symbols and one half symbol. How many trees were planted?",
    options: [
        { text: "45", correct: true, feedback: "4 × 10 = 40; half = 5; total = 45." },
        { text: "40", correct: false, feedback: "You forgot the half symbol.", misconceptionId: "E-d7-a" },
        { text: "50", correct: false, feedback: "You counted the half as a full symbol.", misconceptionId: "E-d7-b" },
        { text: "4.5", correct: false, feedback: "You forgot to multiply by the key value.", misconceptionId: "E-d7-c" }
      ],
    backward: "Multiply full symbols by the key value, and add half of the key value for half symbols.",
    forward: "Pictographs with half symbols represent fractions of the data.",
    misconceptions: [
      {
        misconceptionId: "E-d7-a",
        description: "Student computes the full symbols' total (4×10=40) but forgets to add the half symbol's contribution.",
        rootCause: "Half-Symbol Contribution Omitted — stops after counting only the full symbols.",
        remediation: "There's ALSO a half symbol worth 5 trees (half of 10) — add this to the full-symbol total: 40+5=45, not just 40."
      },
      {
        misconceptionId: "E-d7-b",
        description: "Student treats the half symbol as if it were a full symbol, using 5 full symbols worth 10 each instead of 4 full plus a half.",
        rootCause: "Half Symbol Miscounted as Full — doesn't distinguish a half symbol's reduced value from a full symbol's value.",
        remediation: "The half symbol is worth HALF of 10 (which is 5), not the full 10 — total = (4×10) + 5 = 45, not (5×10) = 50."
      },
      {
        misconceptionId: "E-d7-c",
        description: "Student adds the symbol counts (4+0.5=4.5) instead of multiplying by the key value.",
        rootCause: "Key Multiplication Omitted — treats the symbol count itself as the final answer without multiplying by the key.",
        remediation: "4.5 is just the NUMBER of symbols (4 full + half) — you must multiply by the key value (10 trees per symbol): 4.5×10=45, not 4.5 itself."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Compute the full symbols' total", hint: "4 × 10 = 40." },
      { level: 2, description: "Compute the half symbol's value", hint: "Half of 10 = 5." },
      { level: 3, description: "Add them together", hint: "40 + 5 = ?" }
    ],
    forwardRiskLinks: [
      { targetSkillId: "DHPICTO-01", probability: 0.35, condition: "Miscounting half-symbol values recurs whenever pictographs mix full and partial symbols in a total count." }
    ],
    learningObjectives: ["CCSS.MATH.CONTENT.3.MD.B.3"]
  },
  {
    itemId: "d8",
    order: 8,
    cluster: "BAR",
    clusterName: CLUSTER_NAMES.BAR,
    skillId: "DHBAR-03",
    question: "In a bar graph, the bar for Class 3 reaches 25, and the bar for Class 4 reaches 30. Which class has the higher value?",
    options: [
        { text: "Class 4", correct: true, feedback: "30 is greater than 25." },
        { text: "Class 3", correct: false, feedback: "25 is less than 30.", misconceptionId: "E-d8-a" },
        { text: "Both are equal", correct: false, feedback: "25 and 30 are different.", misconceptionId: "E-d8-b" },
        { text: "Cannot tell", correct: false, feedback: "The bars clearly show different heights.", misconceptionId: "E-d8-c" }
      ],
    backward: "Compare the numbers shown by the two bars.",
    forward: "Quick comparisons are the main purpose of bar graphs.",
    misconceptions: [
      {
        misconceptionId: "E-d8-a",
        description: "Student picks the smaller value (Class 3, 25) instead of comparing to find the larger one.",
        rootCause: "Comparison Direction Confusion — picks the lower value when asked for the higher one.",
        remediation: "Compare the two values: 25 (Class 3) and 30 (Class 4) — 30 is LARGER, so Class 4 has the higher value, not Class 3."
      },
      {
        misconceptionId: "E-d8-b",
        description: "Student assumes the two bars are equal without actually comparing the given values (25 and 30).",
        rootCause: "Values Not Compared — doesn't verify whether the given numbers are actually the same.",
        remediation: "The two values (25 and 30) are clearly different — check each number rather than assuming they're equal."
      },
      {
        misconceptionId: "E-d8-c",
        description: "Student assumes a bar graph comparison can't be determined, despite both values being clearly given.",
        rootCause: "Comparison Confidence Gap — doesn't recognise that comparing two given numbers is straightforward.",
        remediation: "Both values are clearly given (25 and 30) — comparing them directly IS possible: 30 is larger than 25, so Class 4 has the higher value."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "List both values", hint: "Class 3 = 25, Class 4 = 30." },
      { level: 2, description: "Compare them", hint: "Which number is larger?" },
      { level: 3, description: "Match to the class", hint: "The larger value belongs to which class?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.3.MD.B.3"]
  },
  {
    itemId: "d9",
    order: 9,
    cluster: "LINE",
    clusterName: CLUSTER_NAMES.LINE,
    skillId: "DHLINE-01",
    question: "A line graph shows the number of visitors to a zoo. On Saturday, the point is at 500. How many visitors were there on Saturday?",
    options: [
        { text: "500", correct: true, feedback: "Read the value at the Saturday point." },
        { text: "400", correct: false, feedback: "Not the correct reading.", misconceptionId: "E-d9-a" },
        { text: "600", correct: false, feedback: "Too high.", misconceptionId: "E-d9-b" },
        { text: "Saturday is not on the graph", correct: false, feedback: "Saturday is marked on the horizontal axis.", misconceptionId: "E-d9-c" }
      ],
    backward: "Locate Saturday, find the point, and read its value on the vertical axis.",
    forward: "Line graphs are often used to show daily changes.",
    misconceptions: [
      {
        misconceptionId: "E-d9-a",
        description: "Student underestimates the value, reporting 400 instead of the stated 500.",
        rootCause: "Reading Precision Error — doesn't read the exact value stated for the point.",
        remediation: "The point at Saturday is stated to be exactly 500 — re-check the exact value given, not an underestimate."
      },
      {
        misconceptionId: "E-d9-b",
        description: "Student overestimates the value, reporting 600 instead of the stated 500.",
        rootCause: "Reading Precision Error — doesn't read the exact value stated for the point.",
        remediation: "The point at Saturday is stated to be exactly 500 — re-check the exact value given, not an overestimate."
      },
      {
        misconceptionId: "E-d9-c",
        description: "Student assumes Saturday isn't represented on the graph, despite the question stating it has a data point.",
        rootCause: "Data Presence Denied — incorrectly assumes a day isn't shown, when the question confirms it is.",
        remediation: "The question explicitly states Saturday's point is at 500 — Saturday IS on the graph, with a specific value to read."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find Saturday on the horizontal axis", hint: "Locate the 'Saturday' mark along the bottom." },
      { level: 2, description: "Find the point above it", hint: "The visitor count point sits directly above Saturday." },
      { level: 3, description: "Read across to the vertical axis", hint: "What value lines up with that point?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d10",
    order: 10,
    cluster: "TABLE",
    clusterName: CLUSTER_NAMES.TABLE,
    skillId: "DHTABLE-01",
    question: "A frequency table shows favourite colours: Red 12, Blue 8, Green 5. How many students chose Blue?",
    options: [
        { text: "8", correct: true, feedback: "The table shows 8 for Blue." },
        { text: "12", correct: false, feedback: "That's Red.", misconceptionId: "E-d10-a" },
        { text: "5", correct: false, feedback: "That's Green.", misconceptionId: "E-d10-b" },
        { text: "25", correct: false, feedback: "That's the total of all three.", misconceptionId: "E-d10-c" }
      ],
    backward: "Find the row for Blue and read the frequency.",
    forward: "Tables summarise data clearly.",
    misconceptions: [
      {
        misconceptionId: "E-d10-a",
        description: "Student reads the wrong row, reporting Red's value instead of Blue's.",
        rootCause: "Wrong Row Read — matches the wrong colour to its value.",
        remediation: "Carefully match each colour to its exact frequency — Red is 12, but the question asks about Blue specifically, which is 8."
      },
      {
        misconceptionId: "E-d10-b",
        description: "Student reads the wrong row, reporting Green's value instead of Blue's.",
        rootCause: "Wrong Row Read — matches the wrong colour to its value.",
        remediation: "Carefully match each colour to its exact frequency — Green is 5, but the question asks about Blue specifically, which is 8."
      },
      {
        misconceptionId: "E-d10-c",
        description: "Student sums all three colours' values instead of reading just Blue's individual value.",
        rootCause: "Total Computed Instead of Individual Value — adds all values when only one specific value was requested.",
        remediation: "The question asks for Blue's count SPECIFICALLY, not the total of all colours — read just the Blue row (8), don't sum 12+8+5=25."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the Blue row", hint: "Look through the table for the label 'Blue'." },
      { level: 2, description: "Read the number in that row", hint: "What value is listed next to Blue?" },
      { level: 3, description: "Confirm", hint: "Double-check you're reading Blue's row, not another colour's." }
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
    question: "A bag contains 10 blue balls and no other colours. You pick one ball. The chance of picking a red ball is:",
    options: [
        { text: "Impossible", correct: true, feedback: "There are no red balls, so it cannot happen." },
        { text: "Certain", correct: false, feedback: "You cannot pick a red ball if there are none.", misconceptionId: "E-d11-a" },
        { text: "Likely", correct: false, feedback: "It is not likely — it is impossible.", misconceptionId: "E-d11-b" },
        { text: "Unlikely", correct: false, feedback: "It is impossible, not just unlikely.", misconceptionId: "E-d11-c" }
      ],
    backward: "If there are zero of a kind, picking that kind is impossible.",
    forward: "Understanding impossible events is important in probability.",
    misconceptions: [
      {
        misconceptionId: "E-d11-a",
        description: "Student confuses 'certain' (will definitely happen) with the actual situation, where picking red will definitely NOT happen.",
        rootCause: "Vocabulary Precision Gap — confuses 'certain' with its opposite, 'impossible'.",
        remediation: "'Certain' means it WILL happen — but there are zero red balls, so picking red will NEVER happen, making it 'impossible', the opposite of certain."
      },
      {
        misconceptionId: "E-d11-b",
        description: "Student mislabels a zero-probability event as merely 'likely', vastly overestimating its chance.",
        rootCause: "Vocabulary Precision Gap — confuses a zero-probability event with a high-probability one.",
        remediation: "'Likely' means it probably WILL happen — but with zero red balls in the bag, picking red has ZERO chance, making it 'impossible', not likely."
      },
      {
        misconceptionId: "E-d11-c",
        description: "Student mislabels a zero-probability event as merely 'unlikely' (low chance but still possible), instead of recognising it's truly impossible.",
        rootCause: "Vocabulary Precision Gap — confuses 'unlikely' (low but nonzero chance) with 'impossible' (zero chance).",
        remediation: "'Unlikely' means a SMALL but nonzero chance — but with zero red balls, there is NO chance at all, making the correct term 'impossible', not just unlikely."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Count the red balls in the bag", hint: "There are 10 blue balls and ZERO red balls." },
      { level: 2, description: "Consider the chance of picking red", hint: "With zero red balls, can red ever be picked?" },
      { level: 3, description: "Choose the matching vocabulary word", hint: "An event with zero chance is described as...?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d12",
    order: 12,
    cluster: "SCALE",
    clusterName: CLUSTER_NAMES.SCALE,
    skillId: "DHSCALE-01",
    question: "A pictograph key shows: one star = 5 points. What does one star represent?",
    options: [
        { text: "5 points", correct: true, feedback: "The key tells you exactly that." },
        { text: "1 point", correct: false, feedback: "The key says 5, not 1.", misconceptionId: "E-d12-a" },
        { text: "10 points", correct: false, feedback: "You doubled the key value.", misconceptionId: "E-d12-b" },
        { text: "0 points", correct: false, feedback: "Incorrect.", misconceptionId: "E-d12-c" }
      ],
    backward: "Read the information in the key directly.",
    forward: "Always check the key before reading a pictograph.",
    misconceptions: [
      {
        misconceptionId: "E-d12-a",
        description: "Student assumes one symbol always represents one item, ignoring the key's stated value.",
        rootCause: "Key Not Read — defaults to a 1-to-1 assumption instead of checking the actual key value.",
        remediation: "Always read the KEY first — it explicitly states what one symbol represents; here it says 1 star = 5 points, not 1 point."
      },
      {
        misconceptionId: "E-d12-b",
        description: "Student doubles the key value unnecessarily, reporting 10 instead of the stated 5.",
        rootCause: "Premature Multiplication — applies an unnecessary doubling before the question even asks for a total count.",
        remediation: "This question just asks what ONE star represents — read the key value directly (5 points), don't double it."
      },
      {
        misconceptionId: "E-d12-c",
        description: "Student reports zero, perhaps misreading the key entirely.",
        rootCause: "Key Misread — fails to correctly extract the stated value from the key.",
        remediation: "The key clearly states 'one star = 5 points' — re-read it carefully; the value is 5, not 0."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the key", hint: "Every pictograph has a key explaining the symbol's value." },
      { level: 2, description: "Read the key's statement", hint: "The key says 'one star = 5 points'." },
      { level: 3, description: "State the value", hint: "One star represents how many points?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.3.MD.B.3"]
  },
  {
    itemId: "d13",
    order: 13,
    cluster: "PICTO",
    clusterName: CLUSTER_NAMES.PICTO,
    skillId: "DHPICTO-01",
    question: "Each car symbol in a pictograph stands for 4 cars. A showroom sold 3 car symbols on Monday. How many cars were sold?",
    options: [
        { text: "12", correct: true, feedback: "3 × 4 = 12 cars." },
        { text: "7", correct: false, feedback: "You added 3 + 4.", misconceptionId: "E-d13-a" },
        { text: "3", correct: false, feedback: "You forgot to multiply.", misconceptionId: "E-d13-b" },
        { text: "16", correct: false, feedback: "You multiplied 4 × 4.", misconceptionId: "E-d13-c" }
      ],
    backward: "Multiply the number of symbols by the value each symbol represents.",
    forward: "Pictographs make data visual and easy to compare.",
    misconceptions: [
      {
        misconceptionId: "E-d13-a",
        description: "Student adds the symbol count and the key value instead of multiplying them.",
        rootCause: "Operation Selection Error — applies addition when repeated groups call for multiplication.",
        remediation: "3 symbols, each worth 4 cars, means 3 EQUAL GROUPS of 4 — combine equal groups by MULTIPLYING (3×4), not adding (3+4)."
      },
      {
        misconceptionId: "E-d13-b",
        description: "Student reports the symbol count directly as the answer, without multiplying by the key value.",
        rootCause: "Key Multiplication Omitted — treats the number of symbols as if it were the final answer.",
        remediation: "The symbol COUNT (3) is not the final answer — multiply it by the key value (4 cars per symbol) to get the actual total: 3×4=12."
      },
      {
        misconceptionId: "E-d13-c",
        description: "Student multiplies the key value by itself (4×4) instead of by the symbol count (3×4).",
        rootCause: "Wrong Factors Multiplied — uses the key value twice instead of pairing it with the symbol count.",
        remediation: "Multiply the NUMBER OF SYMBOLS (3) by the key value (4), not the key value by itself: 3×4=12, not 4×4=16."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Count the symbols", hint: "There are 3 car symbols for Monday." },
      { level: 2, description: "Recall the key value", hint: "Each symbol represents 4 cars." },
      { level: 3, description: "Multiply", hint: "3 × 4 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.3.MD.B.3"]
  },
  {
    itemId: "d14",
    order: 14,
    cluster: "BAR",
    clusterName: CLUSTER_NAMES.BAR,
    skillId: "DHBAR-04",
    question: "A bar graph shows the number of books read: Ram 6, Shyam 9, Jadu 4. Who read the fewest books?",
    options: [
        { text: "Jadu", correct: true, feedback: "Jadu has the shortest bar (4 books)." },
        { text: "Ram", correct: false, feedback: "Ram read 6, more than Jadu.", misconceptionId: "E-d14-a" },
        { text: "Shyam", correct: false, feedback: "Shyam read the most.", misconceptionId: "E-d14-b" },
        { text: "All equal", correct: false, feedback: "The numbers are different.", misconceptionId: "E-d14-c" }
      ],
    backward: "The shortest bar corresponds to the smallest number.",
    forward: "Bar graphs make it easy to see the smallest and largest values at a glance.",
    misconceptions: [
      {
        misconceptionId: "E-d14-a",
        description: "Student picks Ram (6 books) without comparing all three values, missing that Jadu's 4 is smaller.",
        rootCause: "Incomplete Comparison — doesn't compare all the given values before selecting the smallest.",
        remediation: "Compare ALL three values (6, 9, 4) side by side — 4 (Jadu) is the smallest, not 6 (Ram)."
      },
      {
        misconceptionId: "E-d14-b",
        description: "Student picks Shyam, who has the MOST books (9), confusing 'fewest' with 'most'.",
        rootCause: "Fewest/Most Confusion — reverses the meaning of 'fewest', picking the largest value instead.",
        remediation: "'Fewest' means the SMALLEST number — among 6, 9, and 4, the smallest is 4 (Jadu), not 9 (Shyam, who has the MOST)."
      },
      {
        misconceptionId: "E-d14-c",
        description: "Student assumes all three read the same amount without checking the actual different values given.",
        rootCause: "Values Not Compared — doesn't verify whether the given numbers are actually the same.",
        remediation: "The three values (6, 9, 4) are clearly different — check each number rather than assuming they're equal."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "List all three values", hint: "Ram 6, Shyam 9, Jadu 4." },
      { level: 2, description: "Compare them", hint: "Which number is the smallest?" },
      { level: 3, description: "Match to the person", hint: "4 belongs to whom?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.3.MD.B.3"]
  },
  {
    itemId: "d15",
    order: 15,
    cluster: "LINE",
    clusterName: CLUSTER_NAMES.LINE,
    skillId: "DHLINE-01",
    question: "A line graph shows the temperature falling from 30°C at noon to 20°C at 6 PM. What was the temperature at 6 PM?",
    options: [
        { text: "20°C", correct: true, feedback: "The point at 6 PM is at 20°C." },
        { text: "30°C", correct: false, feedback: "That's noon.", misconceptionId: "E-d15-a" },
        { text: "25°C", correct: false, feedback: "Not the correct reading.", misconceptionId: "E-d15-b" },
        { text: "10°C", correct: false, feedback: "Too low.", misconceptionId: "E-d15-c" }
      ],
    backward: "Read the value at the specific time you are asked about.",
    forward: "Line graphs show how a value changes over time.",
    misconceptions: [
      {
        misconceptionId: "E-d15-a",
        description: "Student reads the wrong point, reporting noon's temperature instead of 6 PM's.",
        rootCause: "Wrong Time Point Read — matches the wrong time to its value.",
        remediation: "Carefully match each time to its exact temperature — noon is 30°C, but the question asks about 6 PM specifically, which is 20°C."
      },
      {
        misconceptionId: "E-d15-b",
        description: "Student guesses a midpoint value (25°C) instead of reading the exact stated value at 6 PM.",
        rootCause: "Reading Precision Error — averages or estimates instead of using the exact given value.",
        remediation: "The temperature at 6 PM is stated to be exactly 20°C — don't average the noon and 6 PM values (that would give 25); read the exact stated endpoint."
      },
      {
        misconceptionId: "E-d15-c",
        description: "Student underestimates the temperature, reporting a value lower than what's actually stated for 6 PM.",
        rootCause: "Reading Precision Error — doesn't read the exact value stated for the point.",
        remediation: "The temperature at 6 PM is stated to be exactly 20°C — re-check the exact value, not an underestimate like 10°C."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find 6 PM on the horizontal axis", hint: "Locate the '6 PM' mark along the bottom." },
      { level: 2, description: "Find the point above it", hint: "The temperature point sits directly above 6 PM." },
      { level: 3, description: "Read across to the vertical axis", hint: "What temperature lines up with that point?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d16",
    order: 16,
    cluster: "TABLE",
    clusterName: CLUSTER_NAMES.TABLE,
    skillId: "DHTABLE-01",
    question: "The table shows the number of students who like each sport: Cricket 15, Football 10, Tennis 5. How many like Cricket?",
    options: [
        { text: "15", correct: true, feedback: "The table shows 15 for Cricket." },
        { text: "10", correct: false, feedback: "That's Football.", misconceptionId: "E-d16-a" },
        { text: "5", correct: false, feedback: "That's Tennis.", misconceptionId: "E-d16-b" },
        { text: "30", correct: false, feedback: "That's the total.", misconceptionId: "E-d16-c" }
      ],
    backward: "Read the number directly from the row for Cricket.",
    forward: "Tables are the simplest way to record data.",
    misconceptions: [
      {
        misconceptionId: "E-d16-a",
        description: "Student reads the wrong row, reporting Football's value instead of Cricket's.",
        rootCause: "Wrong Row Read — matches the wrong sport to its value.",
        remediation: "Carefully match each sport to its exact count — Football is 10, but the question asks about Cricket specifically, which is 15."
      },
      {
        misconceptionId: "E-d16-b",
        description: "Student reads the wrong row, reporting Tennis's value instead of Cricket's.",
        rootCause: "Wrong Row Read — matches the wrong sport to its value.",
        remediation: "Carefully match each sport to its exact count — Tennis is 5, but the question asks about Cricket specifically, which is 15."
      },
      {
        misconceptionId: "E-d16-c",
        description: "Student sums all three sports' values instead of reading just Cricket's individual value.",
        rootCause: "Total Computed Instead of Individual Value — adds all values when only one specific value was requested.",
        remediation: "The question asks for Cricket's count SPECIFICALLY, not the total of all sports — read just the Cricket row (15), don't sum 15+10+5=30."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the Cricket row", hint: "Look through the table for the label 'Cricket'." },
      { level: 2, description: "Read the number in that row", hint: "What value is listed next to Cricket?" },
      { level: 3, description: "Confirm", hint: "Double-check you're reading Cricket's row, not another sport's." }
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
    question: "Which word best describes the chance that the sun will set today?",
    options: [
        { text: "Certain", correct: true, feedback: "The sun sets every day — it is certain." },
        { text: "Likely", correct: false, feedback: "It is more than likely — it's a sure event.", misconceptionId: "E-d17-a" },
        { text: "Unlikely", correct: false, feedback: "It always happens.", misconceptionId: "E-d17-b" },
        { text: "Impossible", correct: false, feedback: "It definitely happens.", misconceptionId: "E-d17-c" }
      ],
    backward: "Events that happen every day are certain.",
    forward: "Certain and impossible are the two extremes of probability.",
    misconceptions: [
      {
        misconceptionId: "E-d17-a",
        description: "Student underestimates the sun setting as merely 'likely' (probable but not guaranteed), when it actually happens with 100% certainty every day.",
        rootCause: "Vocabulary Precision Gap — confuses 'likely' (high but not 100% chance) with 'certain' (100% guaranteed).",
        remediation: "The sun sets EVERY single day without exception — this 100% guaranteed event is 'certain', a stronger word than 'likely' (which allows for occasional exceptions)."
      },
      {
        misconceptionId: "E-d17-b",
        description: "Student mislabels a guaranteed daily event as 'unlikely', vastly underestimating its certainty.",
        rootCause: "Vocabulary Precision Gap — confuses a guaranteed event with a low-probability one.",
        remediation: "'Unlikely' means it probably WON'T happen — but the sun setting happens every single day without fail, making it 'certain', the complete opposite of unlikely."
      },
      {
        misconceptionId: "E-d17-c",
        description: "Student mislabels a guaranteed daily event as 'impossible', the complete opposite of what actually happens.",
        rootCause: "Vocabulary Precision Gap — confuses a certain event with an impossible one.",
        remediation: "'Impossible' means it can NEVER happen — but the sun setting is a daily guarantee, making it 'certain', the exact opposite of impossible."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Consider how often this event happens", hint: "Does the sun set every single day, without exception?" },
      { level: 2, description: "Compare to the probability scale", hint: "An event happening every time, with no exceptions, is at one extreme end." },
      { level: 3, description: "Choose the matching vocabulary word", hint: "An event that always happens is described as...?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d18",
    order: 18,
    cluster: "SCALE",
    clusterName: CLUSTER_NAMES.SCALE,
    skillId: "DHSCALE-02",
    question: "On a line graph, the vertical axis shows numbers from 0 to 100, with marks every 20 units. What is the value between two consecutive marks?",
    options: [
        { text: "20", correct: true, feedback: "The marks go 0, 20, 40, … so the interval is 20." },
        { text: "10", correct: false, feedback: "Half the interval, but not the mark spacing.", misconceptionId: "E-d18-a" },
        { text: "5", correct: false, feedback: "Too small.", misconceptionId: "E-d18-b" },
        { text: "100", correct: false, feedback: "That's the total range.", misconceptionId: "E-d18-c" }
      ],
    backward: "Look at the difference between two labelled marks next to each other.",
    forward: "Large‑scale graphs often use intervals like 20 to fit all data.",
    misconceptions: [
      {
        misconceptionId: "E-d18-a",
        description: "Student halves the stated interval (20) instead of using the value exactly as given.",
        rootCause: "Unnecessary Halving — applies an extra operation to a value that was already given directly.",
        remediation: "The question states marks appear 'every 20 units' — this IS the interval directly (20), no need to halve it to 10."
      },
      {
        misconceptionId: "E-d18-b",
        description: "Student guesses a much smaller interval (5) without using the stated 'every 20 units' information.",
        rootCause: "Given Information Ignored — guesses instead of using the interval explicitly stated in the question.",
        remediation: "The question directly states the marks appear 'every 20 units' — use this given value (20) directly, don't guess a smaller number like 5."
      },
      {
        misconceptionId: "E-d18-c",
        description: "Student reports the total range (0 to 100) instead of the interval between individual marks.",
        rootCause: "Total Range Confused with Interval — mixes up the axis's full span with the spacing between marks.",
        remediation: "100 is the TOTAL RANGE of the axis (0 to 100) — the interval between individual marks is smaller: 20, as stated in the question."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Re-read the given information", hint: "The question states marks appear 'every 20 units'." },
      { level: 2, description: "Identify what this means", hint: "This directly tells you the spacing between consecutive marks." },
      { level: 3, description: "State the interval", hint: "The interval is exactly what value?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.3.MD.B.3"]
  },
  {
    itemId: "d19",
    order: 19,
    cluster: "PICTO",
    clusterName: CLUSTER_NAMES.PICTO,
    skillId: "DHPICTO-02",
    question: "Each smiley symbol represents 2 students. A club has 5 full smileys and one half smiley. How many students in the club?",
    options: [
        { text: "11", correct: true, feedback: "5 × 2 = 10; half of 2 = 1; total 11." },
        { text: "10", correct: false, feedback: "You forgot the half symbol.", misconceptionId: "E-d19-a" },
        { text: "12", correct: false, feedback: "You counted the half as a full symbol.", misconceptionId: "E-d19-b" },
        { text: "5.5", correct: false, feedback: "You forgot to multiply by the key.", misconceptionId: "E-d19-c" }
      ],
    backward: "Full symbols times the key value; half symbol adds half the key value.",
    forward: "Pictographs can show exact numbers with full and half symbols.",
    misconceptions: [
      {
        misconceptionId: "E-d19-a",
        description: "Student computes the full symbols' total (5×2=10) but forgets to add the half symbol's contribution.",
        rootCause: "Half-Symbol Contribution Omitted — stops after counting only the full symbols.",
        remediation: "There's ALSO a half symbol worth 1 student (half of 2) — add this to the full-symbol total: 10+1=11, not just 10."
      },
      {
        misconceptionId: "E-d19-b",
        description: "Student treats the half symbol as if it were a full symbol, using 6 full symbols worth 2 each instead of 5 full plus a half.",
        rootCause: "Half Symbol Miscounted as Full — doesn't distinguish a half symbol's reduced value from a full symbol's value.",
        remediation: "The half symbol is worth HALF of 2 (which is 1), not the full 2 — total = (5×2) + 1 = 11, not (6×2) = 12."
      },
      {
        misconceptionId: "E-d19-c",
        description: "Student adds the symbol counts (5+0.5=5.5) instead of multiplying by the key value.",
        rootCause: "Key Multiplication Omitted — treats the symbol count itself as the final answer without multiplying by the key.",
        remediation: "5.5 is just the NUMBER of symbols (5 full + half) — you must multiply by the key value (2 students per symbol): 5.5×2=11, not 5.5 itself."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Compute the full symbols' total", hint: "5 × 2 = 10." },
      { level: 2, description: "Compute the half symbol's value", hint: "Half of 2 = 1." },
      { level: 3, description: "Add them together", hint: "10 + 1 = ?" }
    ],
    forwardRiskLinks: [
      { targetSkillId: "DHPICTO-01", probability: 0.35, condition: "Miscounting half-symbol values recurs whenever pictographs mix full and partial symbols in a total count." }
    ],
    learningObjectives: ["CCSS.MATH.CONTENT.3.MD.B.3"]
  },
  {
    itemId: "d20",
    order: 20,
    cluster: "BAR",
    clusterName: CLUSTER_NAMES.BAR,
    skillId: "DHBAR-03",
    question: "In a bar graph, the bar for Monday reaches 40, and the bar for Tuesday reaches 35. Which day had more?",
    options: [
        { text: "Monday", correct: true, feedback: "40 > 35, so Monday is higher." },
        { text: "Tuesday", correct: false, feedback: "35 is less than 40.", misconceptionId: "E-d20-a" },
        { text: "Both are equal", correct: false, feedback: "40 and 35 are different.", misconceptionId: "E-d20-b" },
        { text: "Cannot say", correct: false, feedback: "The bars clearly show the values.", misconceptionId: "E-d20-c" }
      ],
    backward: "Compare the numbers on the y‑axis for the two bars.",
    forward: "Comparing values is the main reason we draw bar graphs.",
    misconceptions: [
      {
        misconceptionId: "E-d20-a",
        description: "Student picks the smaller value (Tuesday, 35) instead of comparing to find the larger one.",
        rootCause: "Comparison Direction Confusion — picks the lower value when asked for the higher one.",
        remediation: "Compare the two values: 40 (Monday) and 35 (Tuesday) — 40 is LARGER, so Monday had more, not Tuesday."
      },
      {
        misconceptionId: "E-d20-b",
        description: "Student assumes the two bars are equal without actually comparing the given values (40 and 35).",
        rootCause: "Values Not Compared — doesn't verify whether the given numbers are actually the same.",
        remediation: "The two values (40 and 35) are clearly different — check each number rather than assuming they're equal."
      },
      {
        misconceptionId: "E-d20-c",
        description: "Student assumes a bar graph comparison can't be determined, despite both values being clearly given.",
        rootCause: "Comparison Confidence Gap — doesn't recognise that comparing two given numbers is straightforward.",
        remediation: "Both values are clearly given (40 and 35) — comparing them directly IS possible: 40 is larger than 35, so Monday had more."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "List both values", hint: "Monday = 40, Tuesday = 35." },
      { level: 2, description: "Compare them", hint: "Which number is larger?" },
      { level: 3, description: "Match to the day", hint: "The larger value belongs to which day?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.3.MD.B.3"]
  },
  {
    itemId: "d21",
    order: 21,
    cluster: "LINE",
    clusterName: CLUSTER_NAMES.LINE,
    skillId: "DHLINE-02",
    question: "A line graph shows a flat line at 25°C from 2 PM to 4 PM. What was the temperature at 3 PM?",
    options: [
        { text: "25°C", correct: true, feedback: "Since the line is flat, the temperature stayed the same." },
        { text: "30°C", correct: false, feedback: "The line didn't go up.", misconceptionId: "E-d21-a" },
        { text: "20°C", correct: false, feedback: "The line didn't go down.", misconceptionId: "E-d21-b" },
        { text: "Cannot say", correct: false, feedback: "A flat line means constant value.", misconceptionId: "E-d21-c" }
      ],
    backward: "A flat horizontal line means the value is not changing.",
    forward: "Line graphs can show steady, increasing, or decreasing trends.",
    misconceptions: [
      {
        misconceptionId: "E-d21-a",
        description: "Student assumes the temperature increased at 3 PM, despite the line being described as flat (constant).",
        rootCause: "Flat-Line Meaning Misunderstood — assumes change occurs even when the line is explicitly flat.",
        remediation: "A FLAT (horizontal) line means the value stays EXACTLY THE SAME throughout — since it's flat at 25°C from 2-4 PM, the value at 3 PM (in between) must also be 25°C, not higher."
      },
      {
        misconceptionId: "E-d21-b",
        description: "Student assumes the temperature decreased at 3 PM, despite the line being described as flat (constant).",
        rootCause: "Flat-Line Meaning Misunderstood — assumes change occurs even when the line is explicitly flat.",
        remediation: "A FLAT (horizontal) line means the value stays EXACTLY THE SAME throughout — since it's flat at 25°C from 2-4 PM, the value at 3 PM (in between) must also be 25°C, not lower."
      },
      {
        misconceptionId: "E-d21-c",
        description: "Student assumes the value at an intermediate time point can't be determined, despite the flat line clearly indicating a constant value.",
        rootCause: "Flat-Line Interpolation Doubt — doesn't recognise a flat line fully determines the value at every point along it.",
        remediation: "A flat line at 25°C means the value is 25°C at EVERY point between 2 PM and 4 PM, including 3 PM — this CAN be determined directly from the flat line."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify what a flat line means", hint: "A flat (horizontal) line means the value doesn't change." },
      { level: 2, description: "Locate 3 PM on this flat segment", hint: "3 PM falls between 2 PM and 4 PM, within the flat section." },
      { level: 3, description: "Read the constant value", hint: "Since the line is flat at 25°C, what is the value at every point, including 3 PM?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d22",
    order: 22,
    cluster: "TABLE",
    clusterName: CLUSTER_NAMES.TABLE,
    skillId: "DHTABLE-01",
    question: "A tally chart shows the number of absent students: Monday: 5, Tuesday: 7, Wednesday: 4. How many were absent on Tuesday?",
    options: [
        { text: "7", correct: true, feedback: "Tuesday's count is 7." },
        { text: "5", correct: false, feedback: "That's Monday.", misconceptionId: "E-d22-a" },
        { text: "4", correct: false, feedback: "That's Wednesday.", misconceptionId: "E-d22-b" },
        { text: "16", correct: false, feedback: "That's the total.", misconceptionId: "E-d22-c" }
      ],
    backward: "Find the row for Tuesday and read the number.",
    forward: "Tally charts are a quick way to record data as it is collected.",
    misconceptions: [
      {
        misconceptionId: "E-d22-a",
        description: "Student reads the wrong row, reporting Monday's value instead of Tuesday's.",
        rootCause: "Wrong Row Read — matches the wrong day to its value.",
        remediation: "Carefully match each day to its exact count — Monday is 5, but the question asks about Tuesday specifically, which is 7."
      },
      {
        misconceptionId: "E-d22-b",
        description: "Student reads the wrong row, reporting Wednesday's value instead of Tuesday's.",
        rootCause: "Wrong Row Read — matches the wrong day to its value.",
        remediation: "Carefully match each day to its exact count — Wednesday is 4, but the question asks about Tuesday specifically, which is 7."
      },
      {
        misconceptionId: "E-d22-c",
        description: "Student sums all three days' values instead of reading just Tuesday's individual value.",
        rootCause: "Total Computed Instead of Individual Value — adds all values when only one specific value was requested.",
        remediation: "The question asks for Tuesday's count SPECIFICALLY, not the total of all three days — read just the Tuesday row (7), don't sum 5+7+4=16."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the Tuesday row", hint: "Look through the tally chart for the label 'Tuesday'." },
      { level: 2, description: "Read the number in that row", hint: "What value is listed next to Tuesday?" },
      { level: 3, description: "Confirm", hint: "Double-check you're reading Tuesday's row, not another day's." }
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
    question: "A spinner is divided into 4 equal parts — 3 red and 1 blue. Spinning the spinner and landing on red is:",
    options: [
        { text: "Likely", correct: true, feedback: "There are more red sections, so it is likely, but not certain." },
        { text: "Certain", correct: false, feedback: "There is still a blue section.", misconceptionId: "E-d23-a" },
        { text: "Equally likely", correct: false, feedback: "Red and blue are not equal.", misconceptionId: "E-d23-b" },
        { text: "Impossible", correct: false, feedback: "There are red sections.", misconceptionId: "E-d23-c" }
      ],
    backward: "More of one colour means that colour is likely.",
    forward: "Spinners are used in games and probability experiments.",
    misconceptions: [
      {
        misconceptionId: "E-d23-a",
        description: "Student assumes having MOST of a colour means landing on it is 'certain', not recognising some chance of the other colour remains.",
        rootCause: "Vocabulary Precision Gap — confuses 'most likely' with 'certain' (100% guaranteed).",
        remediation: "'Certain' means the ONLY possible outcome — but there's still 1 blue section, so landing on blue remains possible; red is 'likely' (probable but not guaranteed), not certain."
      },
      {
        misconceptionId: "E-d23-b",
        description: "Student assumes 'equally likely' since both colours exist, without recognising red (3 sections) is far more common than blue (1 section).",
        rootCause: "Vocabulary Precision Gap — confuses 'both are present' with 'both are equally probable'.",
        remediation: "'Equally likely' requires the SAME number of sections for each outcome — but red has 3 sections and blue has only 1, making them NOT equal; red is simply more likely."
      },
      {
        misconceptionId: "E-d23-c",
        description: "Student mislabels a possible (and probable) event as 'impossible', which specifically means it can NEVER happen.",
        rootCause: "Vocabulary Precision Gap — confuses a description with 'impossible' (zero probability).",
        remediation: "'Impossible' means it can NEVER happen — but there are 3 red sections on the spinner, making landing on red not just possible but likely."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Count each colour's sections", hint: "3 red sections, 1 blue section." },
      { level: 2, description: "Compare the counts", hint: "Red has more sections than blue, but blue still exists." },
      { level: 3, description: "Choose the matching vocabulary word", hint: "A colour that's more common but not the only one is described as...?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d24",
    order: 24,
    cluster: "SCALE",
    clusterName: CLUSTER_NAMES.SCALE,
    skillId: "DHSCALE-02",
    question: "The axis of a bar graph is labelled: 0, 100, 200, 300. What is the step size between consecutive marks?",
    options: [
        { text: "100", correct: true, feedback: "100 − 0 = 100; 200 − 100 = 100." },
        { text: "50", correct: false, feedback: "Half of 100, but the marks jump by 100.", misconceptionId: "E-d24-a" },
        { text: "200", correct: false, feedback: "That's two steps.", misconceptionId: "E-d24-b" },
        { text: "300", correct: false, feedback: "That's the top value.", misconceptionId: "E-d24-c" }
      ],
    backward: "Find the difference between any two neighbouring numbers on the axis.",
    forward: "Large numbers often use a step size of 100 to keep the graph readable.",
    misconceptions: [
      {
        misconceptionId: "E-d24-a",
        description: "Student halves the actual step size (100) without computing it from the given marks.",
        rootCause: "Subtraction Not Performed — guesses instead of computing the actual difference between marks.",
        remediation: "Subtract consecutive marks directly: 100-0=100, or 200-100=100 — the step size is 100, not a guessed half-value like 50."
      },
      {
        misconceptionId: "E-d24-b",
        description: "Student computes the gap between non-consecutive marks (0 to 200) instead of consecutive marks (0 to 100).",
        rootCause: "Non-Consecutive Marks Compared — skips a mark when computing the step size.",
        remediation: "The step size is between CONSECUTIVE (adjacent) marks only — 0 to 100 (not 0 to 200, which skips over the 100 mark)."
      },
      {
        misconceptionId: "E-d24-c",
        description: "Student reports the largest labeled value (300) instead of computing the step size between adjacent marks.",
        rootCause: "Wrong Value Reported — confuses the axis's maximum value with the spacing between marks.",
        remediation: "300 is just the LARGEST value shown on the axis — the step size is the gap between any two ADJACENT marks, which is 100, not 300."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Pick two consecutive marks", hint: "0 and 100 are next to each other." },
      { level: 2, description: "Subtract", hint: "100 - 0 = ?" },
      { level: 3, description: "Verify with another pair", hint: "Does 200 - 100 give the same result?" }
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
    skillId: "DHPICTO-01",
    question: "A pictograph shows fish caught. Each fish symbol = 3 fish. There are 4 fish symbols. How many fish were caught?",
    options: [
        { text: "12", correct: true, feedback: "4 × 3 = 12 fish." },
        { text: "7", correct: false, feedback: "You added instead of multiplied.", misconceptionId: "E-r1-a" },
        { text: "4", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r1-b" },
        { text: "9", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r1-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r1-a",
        description: "Student adds the symbol count and the key value instead of multiplying them.",
        rootCause: "Operation Selection Error — applies addition when repeated groups call for multiplication.",
        remediation: "4 symbols, each worth 3 fish, means 4 EQUAL GROUPS of 3 — combine equal groups by MULTIPLYING (4×3), not adding (4+3)."
      },
      {
        misconceptionId: "E-r1-b",
        description: "Student reports the symbol count directly as the answer, without multiplying by the key value.",
        rootCause: "Key Multiplication Omitted — treats the number of symbols as if it were the final answer.",
        remediation: "The symbol COUNT (4) is not the final answer — multiply it by the key value (3 fish per symbol) to get the actual total: 4×3=12."
      },
      {
        misconceptionId: "E-r1-c",
        description: "Student makes a computational error in the multiplication, landing on 9 instead of 12.",
        rootCause: "Multiplication Computation Error — miscalculates 4×3.",
        remediation: "Recompute: 4 × 3 = 12 — verify by adding 3 four times: 3+3+3+3=12."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Count the symbols", hint: "There are 4 fish symbols." },
      { level: 2, description: "Recall the key value", hint: "Each symbol represents 3 fish." },
      { level: 3, description: "Multiply", hint: "4 × 3 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.3.MD.B.3"]
  },
  {
    itemId: "r2",
    order: 2,
    cluster: "BAR",
    clusterName: CLUSTER_NAMES.BAR,
    skillId: "DHBAR-02",
    question: "A bar graph shows pets: Dogs 8, Cats 5, Birds 3. How many cats are there?",
    options: [
        { text: "5", correct: true, feedback: "The bar for cats is at 5." },
        { text: "8", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r2-a" },
        { text: "3", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r2-b" },
        { text: "16", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r2-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r2-a",
        description: "Student reads the wrong bar, reporting Dogs' value instead of Cats'.",
        rootCause: "Wrong Bar Read — matches the wrong pet to its value.",
        remediation: "Carefully match each pet to its exact bar — Dogs is 8, but the question asks about Cats specifically, which is 5."
      },
      {
        misconceptionId: "E-r2-b",
        description: "Student reads the wrong bar, reporting Birds' value instead of Cats'.",
        rootCause: "Wrong Bar Read — matches the wrong pet to its value.",
        remediation: "Carefully match each pet to its exact bar — Birds is 3, but the question asks about Cats specifically, which is 5."
      },
      {
        misconceptionId: "E-r2-c",
        description: "Student sums all three pets' values instead of reading just Cats' individual value.",
        rootCause: "Total Computed Instead of Individual Value — adds all values when only one specific value was requested.",
        remediation: "The question asks for Cats' count SPECIFICALLY, not the total of all three pets — read just the Cats bar (5), don't sum 8+5+3=16."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the Cats bar", hint: "Look for the bar labeled 'Cats'." },
      { level: 2, description: "Read its height on the y-axis", hint: "What value does the Cats bar reach?" },
      { level: 3, description: "Confirm", hint: "Double-check you're reading the Cats bar, not a different pet." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.3.MD.B.3"]
  },
  {
    itemId: "r3",
    order: 3,
    cluster: "LINE",
    clusterName: CLUSTER_NAMES.LINE,
    skillId: "DHLINE-01",
    question: "A line graph shows rainfall. In July, the point is at 120 mm. What is the rainfall in July?",
    options: [
        { text: "120 mm", correct: true, feedback: "Read the value from the graph." },
        { text: "100 mm", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r3-a" },
        { text: "140 mm", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r3-b" },
        { text: "July", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r3-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r3-a",
        description: "Student underestimates the value, reporting 100 mm instead of the stated 120 mm.",
        rootCause: "Reading Precision Error — doesn't read the exact value stated for the point.",
        remediation: "The point at July is stated to be exactly 120 mm — re-check the exact value given, not an underestimate."
      },
      {
        misconceptionId: "E-r3-b",
        description: "Student overestimates the value, reporting 140 mm instead of the stated 120 mm.",
        rootCause: "Reading Precision Error — doesn't read the exact value stated for the point.",
        remediation: "The point at July is stated to be exactly 120 mm — re-check the exact value given, not an overestimate."
      },
      {
        misconceptionId: "E-r3-c",
        description: "Student reports the month name itself instead of the numerical rainfall value.",
        rootCause: "Wrong Type of Value Reported — confuses the horizontal-axis label (month) with the vertical-axis value (rainfall amount).",
        remediation: "The question asks for the RAINFALL AMOUNT (a number in mm), not the month name — read the numerical value on the vertical axis: 120 mm."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find July on the horizontal axis", hint: "Locate the 'July' mark along the bottom." },
      { level: 2, description: "Find the point above it", hint: "The rainfall point sits directly above July." },
      { level: 3, description: "Read across to the vertical axis", hint: "What rainfall value lines up with that point?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "r4",
    order: 4,
    cluster: "TABLE",
    clusterName: CLUSTER_NAMES.TABLE,
    skillId: "DHTABLE-02",
    question: "The table shows favourite fruits: Apple 20, Banana 15, Mango 25. Which fruit has the highest count?",
    options: [
        { text: "Mango", correct: true, feedback: "25 is the largest number." },
        { text: "Apple", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r4-a" },
        { text: "Banana", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r4-b" },
        { text: "All equal", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r4-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r4-a",
        description: "Student picks Apple without comparing all three values, missing that Mango's 25 is larger than Apple's 20.",
        rootCause: "Incomplete Comparison — doesn't compare all the given values before selecting the largest.",
        remediation: "Compare ALL three values (20, 15, 25) side by side — 25 (Mango) is the largest, not 20 (Apple)."
      },
      {
        misconceptionId: "E-r4-b",
        description: "Student picks Banana, the smallest value, perhaps confusing 'highest' with 'lowest'.",
        rootCause: "Highest/Lowest Confusion — reverses the meaning of 'highest count', picking the smallest value instead.",
        remediation: "'Highest count' means the LARGEST number — among 20, 15, and 25, the largest is 25 (Mango), not 15 (Banana, the smallest)."
      },
      {
        misconceptionId: "E-r4-c",
        description: "Student assumes all fruits have the same count without checking the actual different values given.",
        rootCause: "Values Not Compared — doesn't verify whether the given numbers are actually the same.",
        remediation: "The three values (20, 15, 25) are clearly different — check each number rather than assuming they're equal."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "List all three values", hint: "Apple 20, Banana 15, Mango 25." },
      { level: 2, description: "Compare them", hint: "Which number is the largest?" },
      { level: 3, description: "Match to the fruit", hint: "25 belongs to which fruit?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "r5",
    order: 5,
    cluster: "VOCAB",
    clusterName: CLUSTER_NAMES.VOCAB,
    skillId: "DHVOCAB-04",
    question: "A bag contains only red balls. Picking a red ball is:",
    options: [
        { text: "Certain", correct: true, feedback: "All balls are red, so it will definitely happen." },
        { text: "Likely", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r5-a" },
        { text: "Unlikely", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r5-b" },
        { text: "Impossible", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r5-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r5-a",
        description: "Student underestimates picking red as merely 'likely' (probable but not guaranteed), when it's actually 100% guaranteed since ALL balls are red.",
        rootCause: "Vocabulary Precision Gap — confuses 'likely' (high but not 100% chance) with 'certain' (100% guaranteed).",
        remediation: "Since ALL balls in the bag are red (no other colours exist), picking red is 100% guaranteed — this is 'certain', a stronger word than 'likely' (which allows for some chance of a different outcome)."
      },
      {
        misconceptionId: "E-r5-b",
        description: "Student mislabels a guaranteed event as 'unlikely', vastly underestimating its certainty.",
        rootCause: "Vocabulary Precision Gap — confuses a guaranteed event with a low-probability one.",
        remediation: "'Unlikely' means it probably WON'T happen — but with only red balls in the bag, picking red is guaranteed to happen, making it 'certain', not unlikely."
      },
      {
        misconceptionId: "E-r5-c",
        description: "Student mislabels a guaranteed event as 'impossible', the complete opposite of what actually happens.",
        rootCause: "Vocabulary Precision Gap — confuses a certain event with an impossible one.",
        remediation: "'Impossible' means it can NEVER happen — but with only red balls in the bag, picking red is guaranteed, making it 'certain', the exact opposite of impossible."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Check what colours are in the bag", hint: "The bag contains ONLY red balls — no other colours." },
      { level: 2, description: "Consider the chance of picking red", hint: "Since every ball is red, is there any chance of picking a different colour?" },
      { level: 3, description: "Choose the matching vocabulary word", hint: "An event that will 100% definitely happen is described as...?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "r6",
    order: 6,
    cluster: "SCALE",
    clusterName: CLUSTER_NAMES.SCALE,
    skillId: "DHSCALE-01",
    question: "A pictograph key shows one star = 5 points. What does one star represent?",
    options: [
        { text: "5 points", correct: true, feedback: "The key tells you directly." },
        { text: "1 point", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r6-a" },
        { text: "10 points", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r6-b" },
        { text: "0 points", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r6-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r6-a",
        description: "Student assumes one symbol always represents one item, ignoring the key's stated value.",
        rootCause: "Key Not Read — defaults to a 1-to-1 assumption instead of checking the actual key value.",
        remediation: "Always read the KEY first — it explicitly states what one symbol represents; here it says 1 star = 5 points, not 1 point."
      },
      {
        misconceptionId: "E-r6-b",
        description: "Student doubles the key value unnecessarily, reporting 10 instead of the stated 5.",
        rootCause: "Premature Multiplication — applies an unnecessary doubling before the question even asks for a total count.",
        remediation: "This question just asks what ONE star represents — read the key value directly (5 points), don't double it."
      },
      {
        misconceptionId: "E-r6-c",
        description: "Student reports zero, perhaps misreading the key entirely.",
        rootCause: "Key Misread — fails to correctly extract the stated value from the key.",
        remediation: "The key clearly states 'one star = 5 points' — re-read it carefully; the value is 5, not 0."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the key", hint: "Every pictograph has a key explaining the symbol's value." },
      { level: 2, description: "Read the key's statement", hint: "The key says 'one star = 5 points'." },
      { level: 3, description: "State the value", hint: "One star represents how many points?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.3.MD.B.3"]
  },
  {
    itemId: "r7",
    order: 7,
    cluster: "PICTO",
    clusterName: CLUSTER_NAMES.PICTO,
    skillId: "DHPICTO-02",
    question: "Each circle symbol = 10 students. There are 2 full circles and one half circle. How many students?",
    options: [
        { text: "25", correct: true, feedback: "2 × 10 = 20; half is 5; total 25." },
        { text: "20", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r7-a" },
        { text: "30", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r7-b" },
        { text: "2.5", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r7-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r7-a",
        description: "Student computes the full symbols' total (2×10=20) but forgets to add the half symbol's contribution.",
        rootCause: "Half-Symbol Contribution Omitted — stops after counting only the full symbols.",
        remediation: "There's ALSO a half symbol worth 5 students (half of 10) — add this to the full-symbol total: 20+5=25, not just 20."
      },
      {
        misconceptionId: "E-r7-b",
        description: "Student treats the half symbol as if it were a full symbol, using 3 full symbols worth 10 each instead of 2 full plus a half.",
        rootCause: "Half Symbol Miscounted as Full — doesn't distinguish a half symbol's reduced value from a full symbol's value.",
        remediation: "The half symbol is worth HALF of 10 (which is 5), not the full 10 — total = (2×10) + 5 = 25, not (3×10) = 30."
      },
      {
        misconceptionId: "E-r7-c",
        description: "Student adds the symbol counts (2+0.5=2.5) instead of multiplying by the key value.",
        rootCause: "Key Multiplication Omitted — treats the symbol count itself as the final answer without multiplying by the key.",
        remediation: "2.5 is just the NUMBER of symbols (2 full + half) — you must multiply by the key value (10 students per symbol): 2.5×10=25, not 2.5 itself."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Compute the full symbols' total", hint: "2 × 10 = 20." },
      { level: 2, description: "Compute the half symbol's value", hint: "Half of 10 = 5." },
      { level: 3, description: "Add them together", hint: "20 + 5 = ?" }
    ],
    forwardRiskLinks: [
      { targetSkillId: "DHPICTO-01", probability: 0.35, condition: "Miscounting half-symbol values recurs whenever pictographs mix full and partial symbols in a total count." }
    ],
    learningObjectives: ["CCSS.MATH.CONTENT.3.MD.B.3"]
  },
  {
    itemId: "r8",
    order: 8,
    cluster: "BAR",
    clusterName: CLUSTER_NAMES.BAR,
    skillId: "DHBAR-03",
    question: "A bar graph shows sales: Monday ₹200, Tuesday ₹300. Which day had higher sales?",
    options: [
        { text: "Tuesday", correct: true, feedback: "300 > 200." },
        { text: "Monday", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r8-a" },
        { text: "Equal", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r8-b" },
        { text: "Cannot say", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r8-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r8-a",
        description: "Student picks the smaller value (Monday, ₹200) instead of comparing to find the larger one.",
        rootCause: "Comparison Direction Confusion — picks the lower value when asked for the higher one.",
        remediation: "Compare the two values: ₹200 (Monday) and ₹300 (Tuesday) — ₹300 is LARGER, so Tuesday had higher sales, not Monday."
      },
      {
        misconceptionId: "E-r8-b",
        description: "Student assumes the two days are equal without actually comparing the given values (₹200 and ₹300).",
        rootCause: "Values Not Compared — doesn't verify whether the given numbers are actually the same.",
        remediation: "The two values (₹200 and ₹300) are clearly different — check each number rather than assuming they're equal."
      },
      {
        misconceptionId: "E-r8-c",
        description: "Student assumes a sales comparison can't be determined, despite both values being clearly given.",
        rootCause: "Comparison Confidence Gap — doesn't recognise that comparing two given numbers is straightforward.",
        remediation: "Both values are clearly given (₹200 and ₹300) — comparing them directly IS possible: ₹300 is larger than ₹200, so Tuesday had higher sales."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "List both values", hint: "Monday = ₹200, Tuesday = ₹300." },
      { level: 2, description: "Compare them", hint: "Which number is larger?" },
      { level: 3, description: "Match to the day", hint: "The larger value belongs to which day?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.3.MD.B.3"]
  },
  {
    itemId: "r9",
    order: 9,
    cluster: "LINE",
    clusterName: CLUSTER_NAMES.LINE,
    skillId: "DHLINE-01",
    question: "A line graph shows temperature at 8 AM as 15°C. What is the temperature at 8 AM?",
    options: [
        { text: "15°C", correct: true, feedback: "Read from the graph." },
        { text: "10°C", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r9-a" },
        { text: "20°C", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r9-b" },
        { text: "8°C", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r9-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r9-a",
        description: "Student underestimates the temperature, reporting 10°C instead of the stated 15°C.",
        rootCause: "Reading Precision Error — doesn't read the exact value stated for the point.",
        remediation: "The temperature at 8 AM is stated to be exactly 15°C — re-check the exact value given, not an underestimate."
      },
      {
        misconceptionId: "E-r9-b",
        description: "Student overestimates the temperature, reporting 20°C instead of the stated 15°C.",
        rootCause: "Reading Precision Error — doesn't read the exact value stated for the point.",
        remediation: "The temperature at 8 AM is stated to be exactly 15°C — re-check the exact value given, not an overestimate."
      },
      {
        misconceptionId: "E-r9-c",
        description: "Student confuses the time label (8, from 8 AM) with the temperature value (15°C).",
        rootCause: "Axis Confusion — reports the horizontal position instead of the vertical value at that position.",
        remediation: "8 is part of the TIME label (8 AM), not the temperature — the temperature is a separate value read from the vertical axis: 15°C."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find 8 AM on the horizontal axis", hint: "Locate the '8 AM' mark along the bottom." },
      { level: 2, description: "Find the point above it", hint: "The temperature point sits directly above 8 AM." },
      { level: 3, description: "Read across to the vertical axis", hint: "What temperature lines up with that point?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "r10",
    order: 10,
    cluster: "TABLE",
    clusterName: CLUSTER_NAMES.TABLE,
    skillId: "DHTABLE-01",
    question: "A table shows marks: A 80, B 90, C 70. What is B's mark?",
    options: [
        { text: "90", correct: true, feedback: "The row for B shows 90." },
        { text: "80", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r10-a" },
        { text: "70", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r10-b" },
        { text: "240", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r10-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r10-a",
        description: "Student reads the wrong row, reporting A's mark instead of B's.",
        rootCause: "Wrong Row Read — matches the wrong label to its value.",
        remediation: "Carefully match each label to its exact mark — A's mark is 80, but the question asks about B specifically, whose mark is 90."
      },
      {
        misconceptionId: "E-r10-b",
        description: "Student reads the wrong row, reporting C's mark instead of B's.",
        rootCause: "Wrong Row Read — matches the wrong label to its value.",
        remediation: "Carefully match each label to its exact mark — C's mark is 70, but the question asks about B specifically, whose mark is 90."
      },
      {
        misconceptionId: "E-r10-c",
        description: "Student sums all three marks instead of reading just B's individual value.",
        rootCause: "Total Computed Instead of Individual Value — adds all values when only one specific value was requested.",
        remediation: "The question asks for B's mark SPECIFICALLY, not the total of all three — read just B's row (90), don't sum 80+90+70=240."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find B's row", hint: "Look through the table for the label 'B'." },
      { level: 2, description: "Read the number in that row", hint: "What value is listed next to B?" },
      { level: 3, description: "Confirm", hint: "Double-check you're reading B's row, not another label's." }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "r11",
    order: 11,
    cluster: "VOCAB",
    clusterName: CLUSTER_NAMES.VOCAB,
    skillId: "DHVOCAB-04",
    question: "A spinner has all 4 sections coloured red. Landing on red is:",
    options: [
        { text: "Certain", correct: true, feedback: "Every section is red." },
        { text: "Likely", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r11-a" },
        { text: "Unlikely", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r11-b" },
        { text: "Impossible", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r11-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r11-a",
        description: "Student underestimates landing on red as merely 'likely' (probable but not guaranteed), when it's actually 100% guaranteed since ALL sections are red.",
        rootCause: "Vocabulary Precision Gap — confuses 'likely' (high but not 100% chance) with 'certain' (100% guaranteed).",
        remediation: "Since ALL 4 sections are red (no other colours exist), landing on red is 100% guaranteed — this is 'certain', a stronger word than 'likely'."
      },
      {
        misconceptionId: "E-r11-b",
        description: "Student mislabels a guaranteed event as 'unlikely', vastly underestimating its certainty.",
        rootCause: "Vocabulary Precision Gap — confuses a guaranteed event with a low-probability one.",
        remediation: "'Unlikely' means it probably WON'T happen — but with all sections red, landing on red is guaranteed, making it 'certain', not unlikely."
      },
      {
        misconceptionId: "E-r11-c",
        description: "Student mislabels a guaranteed event as 'impossible', the complete opposite of what actually happens.",
        rootCause: "Vocabulary Precision Gap — confuses a certain event with an impossible one.",
        remediation: "'Impossible' means it can NEVER happen — but with all 4 sections red, landing on red is guaranteed, making it 'certain', the exact opposite of impossible."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Check the spinner's colours", hint: "All 4 sections are red — no other colours." },
      { level: 2, description: "Consider the chance of landing elsewhere", hint: "Since every section is red, is there any chance of landing on a different colour?" },
      { level: 3, description: "Choose the matching vocabulary word", hint: "An event that will 100% definitely happen is described as...?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "r12",
    order: 12,
    cluster: "SCALE",
    clusterName: CLUSTER_NAMES.SCALE,
    skillId: "DHSCALE-02",
    question: "A bar graph's y‑axis is labelled: 0, 2, 4, 6. What is the interval between marks?",
    options: [
        { text: "2", correct: true, feedback: "2 − 0 = 2; 4 − 2 = 2." },
        { text: "1", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r12-a" },
        { text: "4", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r12-b" },
        { text: "6", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r12-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r12-a",
        description: "Student assumes every axis has an interval of 1 by default, without checking the actual marked values.",
        rootCause: "Default Interval Assumption — assumes a standard interval instead of computing it from the given marks.",
        remediation: "Don't assume the interval is 1 — always compute it from the ACTUAL marks given: 2-0=2, so the interval here is 2, not 1."
      },
      {
        misconceptionId: "E-r12-b",
        description: "Student computes the gap between non-consecutive marks (0 to 4) instead of consecutive marks (0 to 2).",
        rootCause: "Non-Consecutive Marks Compared — skips a mark when computing the interval.",
        remediation: "The interval is between CONSECUTIVE (adjacent) marks only — 0 to 2 (not 0 to 4, which skips over the 2 mark)."
      },
      {
        misconceptionId: "E-r12-c",
        description: "Student reports the largest labeled value (6) instead of computing the interval between adjacent marks.",
        rootCause: "Wrong Value Reported — confuses the axis's maximum value with the spacing between marks.",
        remediation: "6 is just the LARGEST value shown on the axis — the interval is the gap between any two ADJACENT marks, which is 2, not 6."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Pick two consecutive marks", hint: "0 and 2 are next to each other." },
      { level: 2, description: "Subtract", hint: "2 - 0 = ?" },
      { level: 3, description: "Verify with another pair", hint: "Does 4 - 2 give the same result?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.3.MD.B.3"]
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
    title: "Data Handling — Core Fluency",
    subtitle: "Telangana & Cambridge · Level 1 · Core Fluency",
    description: "Single-step reading of pictographs, bar graphs, line graphs, tables, probability vocabulary, and scale keys.",
    clusterNames: CLUSTER_NAMES,
    gateReviewHTML: "<strong>Quick Review</strong><br>\n        • Pictographs: Check the key to see what one symbol stands for. Half symbols represent half the value.<br>\n        • Bar graphs: The height of each bar shows the quantity. Read the scale on the y‑axis.<br>\n        • Line graphs: The points show values; read the value at any point by looking across to the axis.<br>\n        • Tables & tally charts: Find the correct row or column and read the number.<br>\n        • Probability vocabulary: Certain (will definitely happen), likely, equally likely, unlikely, impossible (cannot happen).<br>\n        • Reading scales: Look at the labels on the axis or the key to see what each unit or symbol represents.",
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

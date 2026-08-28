// seed/mathSeedCh1PlaceValueL2.js
//
// Populates math_chapters and math_questions with Grade 5, Chapter 1
// (Number Sense & Place Value), Level 2 — converted from the standalone
// HTML file ch-1-place-value-level-2.html.
//
// Run with: node seed/mathSeedCh1PlaceValueL2.js

const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-5";
const GRADE_LABEL = "Grade 5";
const CHAPTER_SLUG = "ch-1-place-value";
const CHAPTER_NAME = "Number Sense & Place Value";
const LEVEL = 2;

const CLUSTER_NAMES = {
  PLACE: "Place Value & Expanded Form",
  COMP: "Comparing & Ordering Numbers",
  ROUND: "Rounding & Estimation",
  ROMAN: "Roman Numerals",
  NEG: "Negative Numbers in Context",
  CONV: "Indian – International System"
};

const warmupItems = [
  {
    itemId: "w1", order: 1, cluster: "PLACE", clusterName: CLUSTER_NAMES.PLACE,
    skillId: "PV-02",
    question: "What is the place value of 7 in 4,73,215?",
    options: [
        { text: "70,000", correct: true, feedback: "The 7 is in the ten-thousands place (Indian system)." },
        { text: "7,000", correct: false, feedback: "That would be the thousands place.", misconceptionId: "E-w1-a" },
        { text: "700", correct: false, feedback: "That's the hundreds place.", misconceptionId: "E-w1-b" },
        { text: "7,00,000", correct: false, feedback: "That's the lakhs place.", misconceptionId: "E-w1-c" }
      ],
    retryHint: "Identify the period of the digit 7: ones, thousands, or lakhs?",
    misconceptions: [
      { misconceptionId: "E-w1-a", description: "Student answers 7,000, one column to the right of ten-thousands.", rootCause: "Adjacent-Column Slip — the student reads the digit as though it sat in the thousands column instead of the ten-thousands column.", remediation: "Chart every digit of 4,73,215 into a labelled place-value chart before naming any single digit's value." },
      { misconceptionId: "E-w1-b", description: "Student answers 700, two columns to the right.", rootCause: "Place Miscounting — under-counts by two columns, landing on hundreds instead of ten-thousands.", remediation: "Mark the number into periods first — 4 | 73 | 215 — and identify which period the target digit falls in before naming its exact column." },
      { misconceptionId: "E-w1-c", description: "Student answers 7,00,000, one full period too high.", rootCause: "Period Promotion — mistakes the comma before the 7 as the start of the lakhs period rather than the ten-thousands column within the thousands period.", remediation: "Read the number aloud in words — \"four lakh, seventy-three thousand, two hundred fifteen\" — to hear which period the 7 actually belongs to." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Split into periods", hint: "Split 4,73,215 into 4 | 73 | 215." },
      { level: 2, description: "Read within the period", hint: "In the group '73', which digit is ten-thousands and which is thousands?" },
      { level: 3, description: "Multiply out", hint: "7 is in the ten-thousands place, so its value is 7 × 10,000 = ?" }
    ],
    forwardRiskLinks: [
      { targetSkillId: "PV-03", probability: 0.7, condition: "If not remediated before expanded-form work" },
      { targetSkillId: "ADD-02", probability: 0.5, condition: "If not remediated before column addition with 5+ digit numbers" }
    ],
    learningObjectives: ["CCSS.MATH.4.NBT.A.1", "CCSS.MATH.4.NBT.A.2"]
  },
  {
    itemId: "w2", order: 2, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    skillId: "COMP-01",
    question: "Which is the largest? \\( 3,45,678 \\) or \\( 3,54,678 \\)?",
    options: [
        { text: "\\( 3,54,678 \\)", correct: true, feedback: "Compare the ten-thousands place: 5 > 4." },
        { text: "\\( 3,45,678 \\)", correct: false, feedback: "Check the digit after 3,45…", misconceptionId: "E-w2-a" },
        { text: "They are equal", correct: false, feedback: "They differ in the ten-thousands place.", misconceptionId: "E-w2-b" },
        { text: "Cannot compare", correct: false, feedback: "They have the same number of digits, so they can be compared.", misconceptionId: "E-w2-c" }
      ],
    retryHint: "Start from the left and compare the first digit that differs.",
    misconceptions: [
      { misconceptionId: "E-w2-a", description: "Student picks the smaller number, 3,45,678.", rootCause: "Last-Digit Comparison — compares the rightmost digits (both end in 678, a tie) instead of scanning left to right from the first place the numbers actually differ, the ten-thousands column.", remediation: "Teach the 'first difference wins' rule: scan strictly left to right and stop at the very first column where the digits differ." },
      { misconceptionId: "E-w2-b", description: "Student answers 'They are equal'.", rootCause: "Digit-Count Equivalence — because both numbers share five of six digits (3,_,678) and have the same digit count, the student assumes matching digit count means matching value.", remediation: "Show that digit count only proves the same order of magnitude — compare column by column regardless." },
      { misconceptionId: "E-w2-c", description: "Student answers 'Cannot compare'.", rootCause: "Comma Overload — the Indian-style commas make the number feel unfamiliar, so the student avoids comparing rather than risk a wrong scan.", remediation: "Rewrite both numbers without commas, aligned by place value, before comparing." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Line up the digits", hint: "Write both numbers one under the other, digit aligned with digit." },
      { level: 2, description: "Scan from the left", hint: "Compare the leftmost digits. Same? Move one column right." },
      { level: 3, description: "Find the first difference", hint: "The digits first differ at the ten-thousands place: 4 vs 5. Which is bigger?" }
    ],
    forwardRiskLinks: [
      { targetSkillId: "FRA-01", probability: 0.5, condition: "If not remediated before comparing fractions with unlike denominators" }
    ],
    learningObjectives: ["CCSS.MATH.4.NBT.A.2"]
  },
  {
    itemId: "w3", order: 3, cluster: "ROUND", clusterName: CLUSTER_NAMES.ROUND,
    skillId: "ROUND-01",
    question: "Round 4,76,230 to the nearest 1,000.",
    options: [
        { text: "4,76,000", correct: true, feedback: "The hundreds digit is 2 (<5), so round down." },
        { text: "4,77,000", correct: false, feedback: "Rounding up would require a hundreds digit of 5 or more.", misconceptionId: "E-w3-a" },
        { text: "4,80,000", correct: false, feedback: "That's rounding to the nearest ten-thousand.", misconceptionId: "E-w3-b" },
        { text: "5,00,000", correct: false, feedback: "Rounding to the nearest lakh would give 5,00,000.", misconceptionId: "E-w3-c" }
      ],
    retryHint: "Look at the hundreds digit (the next smaller place).",
    misconceptions: [
      { misconceptionId: "E-w3-a", description: "Student answers 4,77,000, rounding up regardless of the hundreds digit.", rootCause: "Direction Default — rounds up out of habit without checking the hundreds digit (2), which is the actual decision digit.", remediation: "Re-run the fixed rule every time: check the hundreds digit first, then decide — never guess the direction." },
      { misconceptionId: "E-w3-b", description: "Student answers 4,80,000, one place value too coarse.", rootCause: "Target-Place Slip — rounds to the nearest 10,000 instead of the nearest 1,000.", remediation: "Circle the thousands digit before rounding so the target place is locked in." },
      { misconceptionId: "E-w3-c", description: "Student answers 5,00,000, several place values too coarse.", rootCause: "Target-Place Slip (extreme) — rounds to the nearest lakh, far coarser than asked.", remediation: "Restate the target place before rounding — 'nearest 1,000' means only the thousands digit and beyond may change." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Circle the target place", hint: "Circle the thousands digit in 4,76,230." },
      { level: 2, description: "Check the decision digit", hint: "The hundreds digit is 2. Is it 5 or more?" },
      { level: 3, description: "Round down and clear", hint: "Since 2 < 5, keep the thousands digit the same and zero out the rest." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "EST-01", probability: 0.5, condition: "If not remediated before estimation word problems" }
    ],
    learningObjectives: ["CCSS.MATH.4.NBT.A.3"]
  },
  {
    itemId: "w4", order: 4, cluster: "ROMAN", clusterName: CLUSTER_NAMES.ROMAN,
    skillId: "ROM-01",
    question: "Write 49 in Roman numerals.",
    options: [
        { text: "XLIX", correct: true, feedback: "40 (XL) + 9 (IX)." },
        { text: "IL", correct: false, feedback: "You can't subtract I from L; use XLIX.", misconceptionId: "E-w4-a" },
        { text: "XXXXIX", correct: false, feedback: "We never write four of the same symbol in a row.", misconceptionId: "E-w4-b" },
        { text: "XLIV", correct: false, feedback: "XLIV is 44.", misconceptionId: "E-w4-c" }
      ],
    retryHint: "Break it into 40 + 9 and convert each part.",
    misconceptions: [
      { misconceptionId: "E-w4-a", description: "Student writes IL, subtracting I directly from L.", rootCause: "Double-Subtraction Error — tries to subtract I directly from L, not knowing that I can only be subtracted from V or X, never from L.", remediation: "Teach the fixed subtractive pairs as a short memorised list: IV=4, IX=9, XL=40, XC=90, CD=400, CM=900." },
      { misconceptionId: "E-w4-b", description: "Student writes XXXXIX, using four X's in a row.", rootCause: "Repetition-Limit Violation — writes four X's to reach 40 instead of using the subtractive pair XL, not knowing no symbol may repeat more than three times.", remediation: "State the repetition rule explicitly: I, X, C, M may repeat at most three times." },
      { misconceptionId: "E-w4-c", description: "Student writes XLIV (44), the wrong ones chunk.", rootCause: "Segment Confusion — correctly forms XL (40) but appends IV (4) instead of IX (9), losing track of which part of 49 (40+9) was being converted.", remediation: "Break the target number into tens and ones first (49 = 40 + 9), convert each part separately, then join." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Split into tens and ones", hint: "49 = 40 + 9. Convert each part separately." },
      { level: 2, description: "Convert the tens", hint: "40 = XL (subtractive: 50-10)." },
      { level: 3, description: "Convert the ones and join", hint: "9 = IX (subtractive: 10-1). Join: XL + IX = ?" }
    ],
    forwardRiskLinks: [
      { targetSkillId: "ROM-02", probability: 0.5, condition: "If not remediated before Roman numerals requiring XC/CD/CM subtractive hundreds" }
    ],
    learningObjectives: []
  },
  {
    itemId: "w5", order: 5, cluster: "NEG", clusterName: CLUSTER_NAMES.NEG,
    skillId: "NEG-01",
    question: "Which temperature is colder: \\( -2^\\circ\\text{C} \\) or \\( -7^\\circ\\text{C} \\)?",
    options: [
        { text: "\\( -7^\\circ\\text{C} \\)", correct: true, feedback: "The more negative the number, the colder the temperature." },
        { text: "\\( -2^\\circ\\text{C} \\)", correct: false, feedback: "-2 is warmer than -7.", misconceptionId: "E-w5-a" },
        { text: "They are equally cold", correct: false, feedback: "Negative numbers represent different temperatures.", misconceptionId: "E-w5-b" },
        { text: "Cannot compare", correct: false, feedback: "Both are on the same scale, so they can be compared.", misconceptionId: "E-w5-c" }
      ],
    retryHint: "On a number line, numbers further left are smaller (colder).",
    misconceptions: [
      { misconceptionId: "E-w5-a", description: "Student picks -2°C as colder.", rootCause: "Magnitude-Only Comparison — compares digits 2 and 7 as if positive, picking the smaller digit as colder without flipping the order for negative values.", remediation: "Anchor to a vertical thermometer: further down (more negative) is always colder, regardless of which digit looks bigger." },
      { misconceptionId: "E-w5-b", description: "Student answers 'They are equally cold'.", rootCause: "Sign-Blindness — fails to register that -2 and -7 are meaningfully different quantities.", remediation: "Plot both temperatures on a labelled number line and measure the gap between each one and zero." },
      { misconceptionId: "E-w5-c", description: "Student answers 'Cannot compare'.", rootCause: "Negative-Number Avoidance — treats the comparison as unanswerable rather than applying the same left-is-smaller rule used for positives.", remediation: "State and reuse the single rule: further left on the number line always means smaller (colder)." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Draw a number line", hint: "Mark 0, -2, and -7 on a number line." },
      { level: 2, description: "Compare positions", hint: "Which point is further to the left?" },
      { level: 3, description: "Connect to temperature", hint: "Further left means colder. Which is colder?" }
    ],
    forwardRiskLinks: [
      { targetSkillId: "INT-01", probability: 0.6, condition: "If not remediated before integer operations in Grade 6" }
    ],
    learningObjectives: []
  },
  {
    itemId: "w6", order: 6, cluster: "CONV", clusterName: CLUSTER_NAMES.CONV,
    skillId: "CONV-01",
    question: "Write 6,78,345 in the International system.",
    options: [
        { text: "678,345", correct: true, feedback: "Indian 6,78,345 = 678 thousand 345." },
        { text: "6,783,450", correct: false, feedback: "You've shifted the digits incorrectly.", misconceptionId: "E-w6-a" },
        { text: "67,83,450", correct: false, feedback: "That's a mix of both systems.", misconceptionId: "E-w6-b" },
        { text: "6,78,345 (same)", correct: false, feedback: "Commas differ; international uses groups of three.", misconceptionId: "E-w6-c" }
      ],
    retryHint: "Indian: first comma after hundreds, then after thousands, etc. International: groups of three.",
    misconceptions: [
      { misconceptionId: "E-w6-a", description: "Student writes 6,783,450, an extra digit longer than the original.", rootCause: "Digit Insertion — while regrouping into sets of three, miscounts and inserts an extra placeholder, inflating the number tenfold.", remediation: "Strip all commas first to get the raw digit string (678345), then insert new commas by counting exactly three digits at a time from the right." },
      { misconceptionId: "E-w6-b", description: "Student writes 67,83,450, still partly using Indian-style grouping.", rootCause: "Grouping Habit Persistence — re-applies the familiar Indian comma pattern instead of switching fully to the International groups-of-three rule.", remediation: "Contrast the two rules side by side: Indian = 3, then 2, 2, 2…; International = 3, 3, 3…" },
      { misconceptionId: "E-w6-c", description: "Student writes 6,78,345 unchanged.", rootCause: "System-Invariance Assumption — assumes the digit string and its display format must be identical in every numbering system, since the value doesn't change.", remediation: "Emphasise that only the comma placement changes between systems — the value stays exactly the same." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Strip the commas", hint: "Remove the Indian commas from 6,78,345 to get 678345." },
      { level: 2, description: "Regroup in 3s", hint: "Starting from the right, mark off groups of three digits: 678 | 345." },
      { level: 3, description: "Re-insert commas", hint: "Join the groups with International-style commas: 678,345." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "CONV-02", probability: 0.5, condition: "If not remediated before converting numbers above 1 crore / 10 million" }
    ],
    learningObjectives: []
  },
  {
    itemId: "w7", order: 7, cluster: "PLACE", clusterName: CLUSTER_NAMES.PLACE,
    skillId: "PV-02",
    question: "In the number 9,05,432, what digit is in the ten-thousands place?",
    options: [
        { text: "0", correct: true, feedback: "The ten-thousands place is the second digit from the left (90,5…)." },
        { text: "9", correct: false, feedback: "9 is in the lakhs place.", misconceptionId: "E-w7-a" },
        { text: "5", correct: false, feedback: "5 is in the thousands place.", misconceptionId: "E-w7-b" },
        { text: "4", correct: false, feedback: "4 is in the hundreds place.", misconceptionId: "E-w7-c" }
      ],
    retryHint: "Write the number with place values: L T-Th Th H T O.",
    misconceptions: [
      { misconceptionId: "E-w7-a", description: "Student answers 9, the leftmost digit.", rootCause: "Leftmost-Digit Default — answers with the first digit seen, a common shortcut for 'which digit matters', regardless of which place was actually asked about.", remediation: "Require the student to restate the question in their own words ('which digit is in ten-thousands?') before looking at the number." },
      { misconceptionId: "E-w7-b", description: "Student answers 5, the thousands digit — one column to the right.", rootCause: "Adjacent-Column Slip — points to the digit immediately right of the actual ten-thousands digit.", remediation: "Have the student point to and say the name of each column as they move across the chart, rather than jumping straight to a column by eye." },
      { misconceptionId: "E-w7-c", description: "Student answers 4, the hundreds digit — two columns to the right.", rootCause: "Place Miscounting — loses count partway through the six-digit number and lands two columns short.", remediation: "Use a six-column chart and count out loud: lakhs, ten-thousands, thousands, hundreds — stop and check the digit before answering." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Say the number in words", hint: "9,05,432 is nine lakh, five thousand, four hundred thirty-two." },
      { level: 2, description: "Find the zero's neighbour", hint: "Which digit sits right after the lakhs digit, before the thousands digit?" },
      { level: 3, description: "Confirm on the chart", hint: "Write 9,05,432 into a place-value chart and check the ten-thousands column." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "PV-03", probability: 0.6, condition: "If not remediated before expanded-form work" }
    ],
    learningObjectives: ["CCSS.MATH.4.NBT.A.1"]
  },
  {
    itemId: "w8", order: 8, cluster: "ROUND", clusterName: CLUSTER_NAMES.ROUND,
    skillId: "ROUND-01",
    question: "Round 2,49,999 to the nearest 10,000.",
    options: [
        { text: "2,50,000", correct: true, feedback: "The thousands digit is 9, which is ≥5, so round up." },
        { text: "2,40,000", correct: false, feedback: "That would be rounding down.", misconceptionId: "E-w8-a" },
        { text: "2,49,000", correct: false, feedback: "Rounding to the nearest thousand would give this.", misconceptionId: "E-w8-b" },
        { text: "2,00,000", correct: false, feedback: "Rounding to the nearest lakh would give 2,00,000.", misconceptionId: "E-w8-c" }
      ],
    retryHint: "Look at the thousands digit; rounding to nearest 10,000.",
    misconceptions: [
      { misconceptionId: "E-w8-a", description: "Student answers 2,40,000, rounding down without checking the decision digit.", rootCause: "Direction Default — rounds down out of habit without checking the thousands digit (9), which signals a round up.", remediation: "Check the thousands digit every time before deciding direction: 9 ≥ 5 means round up." },
      { misconceptionId: "E-w8-b", description: "Student answers 2,49,000, one place value too fine.", rootCause: "Target-Place Slip — rounds to the nearest 1,000 instead of the nearest 10,000.", remediation: "Circle the ten-thousands digit before rounding to lock in the correct target place." },
      { misconceptionId: "E-w8-c", description: "Student answers 2,00,000, several place values too coarse.", rootCause: "Target-Place Slip (extreme) — rounds to the nearest lakh, far coarser than asked.", remediation: "Restate the target place explicitly before rounding — 'nearest 10,000' means only the ten-thousands digit and beyond may change." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Circle the target place", hint: "Circle the ten-thousands digit in 2,49,999." },
      { level: 2, description: "Check the decision digit", hint: "The thousands digit is 9. Is it 5 or more?" },
      { level: 3, description: "Round up and carry", hint: "Since the thousands digit is 9, round up — watch the carry cascade through the 9s." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "ADD-02", probability: 0.4, condition: "If not remediated before column addition requiring carries across multiple places" }
    ],
    learningObjectives: ["CCSS.MATH.4.NBT.A.3"]
  }
];

const diagnosticItems = [
  {
    itemId: "d1", order: 1, cluster: "PLACE", clusterName: CLUSTER_NAMES.PLACE,
    skillId: "PV-03",
    question: "A number has 7 lakhs, 3 ten-thousands, 8 hundreds, and 5 ones. The thousands place is empty. What is the number?",
    options: [
        { text: "7,30,805", correct: true, feedback: "7,00,000 + 30,000 + 800 + 5 = 7,30,805." },
        { text: "7,38,005", correct: false, feedback: "You put the 8 in the thousands place instead of hundreds.", misconceptionId: "E-d1-a" },
        { text: "7,30,085", correct: false, feedback: "You swapped the hundreds and tens.", misconceptionId: "E-d1-b" },
        { text: "73,08,005", correct: false, feedback: "That's an incorrect grouping — mixing Indian and International commas.", misconceptionId: "E-d1-c" }
      ],
    backward: "Place value chart: L | T-Th | Th | H | T | O.",
    forward: "This place value awareness will help you master addition and subtraction of large numbers.",
    misconceptions: [
      { misconceptionId: "E-d1-a", description: "Student writes 7,38,005, placing the 8 in the thousands column.", rootCause: "Adjacent-Column Slip — promotes the hundreds digit (8) one column left into the empty thousands place instead of leaving thousands as zero.", remediation: "Build the number column by column on a chart, filling the stated empty thousands place with 0 explicitly before placing the hundreds digit." },
      { misconceptionId: "E-d1-b", description: "Student writes 7,30,085, swapping the hundreds and tens digits.", rootCause: "Neighbor-Column Swap — writes the hundreds digit (8) and the implied tens digit (0) in reversed order, effectively demoting the hundreds digit to tens.", remediation: "Assign each clue to its named column first — hundreds gets 8, tens gets 0 (unstated, so zero) — before writing the digits in sequence." },
      { misconceptionId: "E-d1-c", description: "Student writes 73,08,005, mixing Indian and International comma groupings.", rootCause: "Grouping System Mixing — applies a mixed or incorrect comma pattern, inserting an extra digit group inconsistent with the Indian system.", remediation: "Build the number as one unbroken digit string first (730805), then apply Indian commas afterward — 3 digits, then groups of 2." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "List every column", hint: "List all six columns: Lakhs, Ten-thousands, Thousands, Hundreds, Tens, Ones." },
      { level: 2, description: "Fill in the clues", hint: "Fill each named column with its digit, and any unstated column with 0." },
      { level: 3, description: "Read the number", hint: "Read the six digits left to right and add Indian commas." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "PV-02", probability: 0.5, condition: "If not remediated before digit-identification tasks with embedded zeros" }
    ],
    learningObjectives: ["CCSS.MATH.4.NBT.A.1", "CCSS.MATH.4.NBT.A.2"]
  },
  {
    itemId: "d2", order: 2, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    skillId: "COMP-01",
    question: "Arrange these numbers in descending order: 5,43,210; 5,34,210; 5,43,201; 5,34,201.",
    options: [
        { text: "5,43,210; 5,43,201; 5,34,210; 5,34,201", correct: true, feedback: "Compare lakhs (all 5), then ten-thousands (43 vs 34), then thousands, then hundreds, etc." },
        { text: "5,34,210; 5,34,201; 5,43,210; 5,43,201", correct: false, feedback: "That's ascending order — smallest first.", misconceptionId: "E-d2-a" },
        { text: "5,43,210; 5,34,210; 5,43,201; 5,34,201", correct: false, feedback: "5,34,210 should come after 5,43,201, not before it.", misconceptionId: "E-d2-b" },
        { text: "5,43,201; 5,43,210; 5,34,201; 5,34,210", correct: false, feedback: "5,43,210 is larger than 5,43,201 because 210 > 201.", misconceptionId: "E-d2-c" }
      ],
    backward: "Start from the leftmost digit and compare; only move right when digits are equal.",
    forward: "Ordering numbers is essential for interpreting data and creating graphs.",
    misconceptions: [
      { misconceptionId: "E-d2-a", description: "Student orders the numbers smallest to largest.", rootCause: "Direction Reversal — correctly ranks the four numbers by size but writes the order smallest-to-largest, confusing 'descending' with 'ascending'.", remediation: "Anchor the vocabulary physically: descending = walking down stairs = largest first. Say the meaning aloud before ordering." },
      { misconceptionId: "E-d2-b", description: "Student places 5,34,210 too early, right after 5,43,210.", rootCause: "Column-Priority Confusion — compares only the lakhs digit (5=5 for all) and stops the careful scan too soon, sequencing 5,34,210 before checking that its ten-thousands digit (3) is smaller than every number starting 5,43,***.", remediation: "Insist on comparing every number's ten-thousands digit first, as a full group, before considering any further column." },
      { misconceptionId: "E-d2-c", description: "Student swaps 5,43,210 and 5,43,201.", rootCause: "Last-Digit Comparison — compares only the final digit of each number (0 vs 1) and concludes the smaller last digit means the smaller number overall, ignoring that the tens digit (1 vs 0) already decided the comparison the other way.", remediation: "Teach 'first difference wins, scanning left to right' — the tens digit differs first (1 vs 0), so that decides the order before the ones digit is even considered." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Group by ten-thousands", hint: "Split the four numbers into two groups: those starting 5,43… and those starting 5,34…" },
      { level: 2, description: "Order within each group", hint: "Within 5,43,210 and 5,43,201, compare the tens digit: 1 vs 0." },
      { level: 3, description: "Combine descending", hint: "Place the 5,43,… group first (larger ten-thousands), then the 5,34,… group, each internally ordered." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "COMP-01", probability: 0.3, condition: "If not remediated before multi-key sorting tasks in data handling" }
    ],
    learningObjectives: ["CCSS.MATH.4.NBT.A.2"]
  },
  {
    itemId: "d3", order: 3, cluster: "ROUND", clusterName: CLUSTER_NAMES.ROUND,
    skillId: "ROUND-02",
    question: "A mystery number, when rounded to the nearest 1,000, becomes 48,000. The sum of its digits is 15. Which of these could be the number?",
    options: [
        { text: "48,120", correct: true, feedback: "48,120 rounds to 48,000 (hundreds digit 1 < 5). Digit sum: 4+8+1+2+0 = 15." },
        { text: "47,990", correct: false, feedback: "Rounds to 48,000 (hundreds 9 ≥ 5), but digit sum 4+7+9+9+0 = 29, not 15.", misconceptionId: "E-d3-a" },
        { text: "48,550", correct: false, feedback: "Rounds to 49,000 (hundreds 5 → round up), and sum = 22.", misconceptionId: "E-d3-b" },
        { text: "47,450", correct: false, feedback: "Rounds down to 47,000 (hundreds 4), sum = 20.", misconceptionId: "E-d3-c" }
      ],
    backward: "To round to nearest 1,000, look at the hundreds digit. Sum of digits is just adding each digit once.",
    forward: "This skill is used in real-life estimation: budgeting, distances, time.",
    misconceptions: [
      { misconceptionId: "E-d3-a", description: "Student picks 47,990, which satisfies the rounding condition but not the digit-sum condition.", rootCause: "Condition Neglect — verifies only the rounding constraint and stops checking, forgetting the problem has a second, independent condition (digit sum = 15) that must also hold.", remediation: "List both conditions separately before testing any candidate, and check each candidate against both — not just the first one satisfied." },
      { misconceptionId: "E-d3-b", description: "Student picks 48,550, which fails the rounding condition (it rounds to 49,000, not 48,000).", rootCause: "Rounding-Boundary Oversight — assumes any number that starts with '48' automatically rounds to 48,000, without checking the hundreds digit against the actual round-up threshold.", remediation: "Test the rounding condition first, digit by digit, before even considering the digit-sum condition — a candidate that fails rounding is eliminated immediately." },
      { misconceptionId: "E-d3-c", description: "Student picks 47,450, which fails the rounding condition (it rounds to 47,000, not 48,000).", rootCause: "Rounding-Boundary Oversight — the number is close to 48,000 but its hundreds digit (4) signals rounding down, not up; the student overlooks that boundary check.", remediation: "Anchor the interval explicitly: numbers rounding to 48,000 must fall in [47,500, 48,499] — test candidates against those exact bounds." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "State both conditions", hint: "List what must be true: (1) rounds to 48,000, (2) digit sum = 15." },
      { level: 2, description: "Filter by rounding", hint: "Which candidates actually round to 48,000? Check the hundreds digit of each." },
      { level: 3, description: "Filter by digit sum", hint: "Among the survivors, add the digits of each. Which one sums to 15?" }
    ],
    forwardRiskLinks: [
      { targetSkillId: "ROUND-01", probability: 0.3, condition: "If not remediated before straightforward single-number rounding tasks" }
    ],
    learningObjectives: ["CCSS.MATH.4.NBT.A.3"]
  },
  {
    itemId: "d4", order: 4, cluster: "ROMAN", clusterName: CLUSTER_NAMES.ROMAN,
    skillId: "ROM-02",
    question: "Which of these Roman numerals is written correctly for the number 99?",
    options: [
        { text: "XCIX", correct: true, feedback: "90 = XC (100-10), 9 = IX (10-1) → XCIX." },
        { text: "IC", correct: false, feedback: "You cannot subtract I (1) directly from C (100). The correct subtractive form uses XC for 90.", misconceptionId: "E-d4-a" },
        { text: "LXXXXIX", correct: false, feedback: "We never use four of the same symbol in a row; LXXXX should be XC.", misconceptionId: "E-d4-b" },
        { text: "LXXXIX", correct: false, feedback: "LXXXIX = 89, not 99.", misconceptionId: "E-d4-c" }
      ],
    backward: "Roman rules: I, X, C, M can be subtracted from the next two higher values only.",
    forward: "Roman numerals appear on clocks, book chapters, and movie sequels.",
    misconceptions: [
      { misconceptionId: "E-d4-a", description: "Student writes IC, subtracting I directly from C.", rootCause: "Double-Subtraction Error — tries to subtract I directly from C, not knowing I can only be subtracted from V or X, never from C.", remediation: "Teach the fixed subtractive pairs as a memorised list: IV=4, IX=9, XL=40, XC=90, CD=400, CM=900 — nothing else is ever built by subtraction." },
      { misconceptionId: "E-d4-b", description: "Student writes LXXXXIX, using four X's in a row.", rootCause: "Repetition-Limit Violation — writes four X's to reach 90 (LXXXX) instead of using the subtractive pair XC, not knowing no symbol may repeat more than three times.", remediation: "State the repetition rule explicitly and check every run of identical symbols before finalising an answer." },
      { misconceptionId: "E-d4-c", description: "Student writes LXXXIX (89), one short of the target.", rootCause: "Magnitude Shortfall — builds 90 additively as L+XXX (50+30=80) instead of using the subtractive pair XC (90), landing 10 short before adding IX.", remediation: "Check whether the tens digit (9) requires a subtractive pair before defaulting to additive symbols — 90 always uses XC, never L+XXX+X." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the tens digit", hint: "99 = 90 + 9. Both digits are 9, so both need subtractive pairs." },
      { level: 2, description: "Convert the tens", hint: "90 = XC (100-10), not L+XXXX or LXXXX." },
      { level: 3, description: "Convert the ones and join", hint: "9 = IX (10-1). Join: XC + IX = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d5", order: 5, cluster: "NEG", clusterName: CLUSTER_NAMES.NEG,
    skillId: "NEG-01",
    question: "The temperature at 6 am was \\( -8^\\circ\\text{C} \\). By noon it had risen by \\( 15^\\circ\\text{C} \\). What was the noon temperature?",
    options: [
        { text: "\\( 7^\\circ\\text{C} \\)", correct: true, feedback: "Start at -8, add 15: -8 + 15 = 7." },
        { text: "\\( 23^\\circ\\text{C} \\)", correct: false, feedback: "You added 15 + 8 instead of considering the negative.", misconceptionId: "E-d5-a" },
        { text: "\\( -23^\\circ\\text{C} \\)", correct: false, feedback: "That would be -8 - 15.", misconceptionId: "E-d5-b" },
        { text: "\\( -7^\\circ\\text{C} \\)", correct: false, feedback: "You added incorrectly: -8 + 15 is positive 7.", misconceptionId: "E-d5-c" }
      ],
    backward: "Use a number line: move right for a rise, left for a fall.",
    forward: "This thinking is used in bank balances, altitude changes, and science.",
    misconceptions: [
      { misconceptionId: "E-d5-a", description: "Student answers 23°C, dropping the negative sign entirely.", rootCause: "Sign-Dropping — ignores the negative sign on the starting temperature and adds 8+15 as though starting from positive territory.", remediation: "Circle the negative sign before starting and say 'starting point is below zero' out loud before doing any arithmetic." },
      { misconceptionId: "E-d5-b", description: "Student answers -23°C, moving further negative instead of toward positive.", rootCause: "Same-Sign Default — treats 'risen by' as continuing in the same negative direction, subtracting 15 instead of adding it.", remediation: "State the rule and reuse it: 'risen by' always means add toward positive, regardless of the starting sign." },
      { misconceptionId: "E-d5-c", description: "Student answers -7°C, getting the magnitude right but the sign wrong.", rootCause: "Sign-Assignment Error — correctly computes the numeric difference between 15 and 8 (=7) but affixes a negative sign out of habit rather than tracking the actual crossing of zero.", remediation: "Use a number line: start at -8 and count 15 steps to the right, explicitly marking the moment the count crosses zero into positive territory." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Mark the start", hint: "Mark -8 on a number line." },
      { level: 2, description: "Identify the direction", hint: "A 'rise' always moves right, toward positive numbers." },
      { level: 3, description: "Count and land", hint: "Move 15 steps to the right from -8. Where do you land?" }
    ],
    forwardRiskLinks: [
      { targetSkillId: "NEG-02", probability: 0.5, condition: "If not remediated before multi-step integer word problems" }
    ],
    learningObjectives: []
  },
  {
    itemId: "d6", order: 6, cluster: "CONV", clusterName: CLUSTER_NAMES.CONV,
    skillId: "CONV-02",
    question: "A newspaper reports a population of 'twelve lakh forty-five thousand six hundred'. Write this in the International system.",
    options: [
        { text: "1,245,600", correct: true, feedback: "12 lakh = 1,200,000; 45 thousand = 45,000; 600 → total 1,245,600." },
        { text: "12,45,600", correct: false, feedback: "That's still Indian notation.", misconceptionId: "E-d6-a" },
        { text: "1,024,560", correct: false, feedback: "You misread 'twelve lakh' as 1,024,560.", misconceptionId: "E-d6-b" },
        { text: "124,560", correct: false, feedback: "That's one lakh twenty-four thousand five hundred sixty — missing a zero.", misconceptionId: "E-d6-c" }
      ],
    backward: "1 lakh = 100,000; 10 lakh = 1,000,000.",
    forward: "Understanding both systems is vital for reading international news and data.",
    misconceptions: [
      { misconceptionId: "E-d6-a", description: "Student writes 12,45,600, leaving the answer in Indian notation.", rootCause: "Notation Non-Conversion — correctly parses the words into digits but stops before actually regrouping into International-style commas, submitting the Indian-grouped form instead.", remediation: "Treat 'convert to International' as a required final step, not optional — always regroup in threes from the right before finishing." },
      { misconceptionId: "E-d6-b", description: "Student writes 1,024,560, misreading the word 'lakh'.", rootCause: "Verbal-to-Numeral Misparse — converts 'twelve' as the literal digits 1 and 2 attached directly to the following digits, rather than first computing 12 lakh = 1,200,000 and then adding the remaining parts.", remediation: "Convert each Indian unit word to its full numeral first — 'twelve lakh' = 12 × 1,00,000 = 1,200,000 — before combining with the thousands and hundreds parts." },
      { misconceptionId: "E-d6-c", description: "Student writes 124,560, one digit short.", rootCause: "Digit Loss — drops a zero somewhere while combining the lakh, thousand, and hundred components, understating the total by a factor of 10.", remediation: "Add the three components as full numerals stacked vertically — 1,200,000 + 45,000 + 600 — so no digit can be silently dropped." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Convert each word part", hint: "12 lakh = 1,200,000. 45 thousand = 45,000. Six hundred = 600." },
      { level: 2, description: "Add the parts", hint: "1,200,000 + 45,000 + 600 = ?" },
      { level: 3, description: "Regroup as International", hint: "Write the sum with commas every three digits from the right." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "CONV-01", probability: 0.4, condition: "If not remediated before direct-format Indian–International conversions" }
    ],
    learningObjectives: []
  },
  {
    itemId: "d7", order: 7, cluster: "PLACE", clusterName: CLUSTER_NAMES.PLACE,
    skillId: "PV-02",
    question: "In the International number 4,309,017, what digit is in the hundred-thousands place?",
    options: [
        { text: "3", correct: true, feedback: "In 4,309,017: millions (4), hundred-thousands (3), ten-thousands (0), thousands (9), etc." },
        { text: "0", correct: false, feedback: "0 is in the ten-thousands place.", misconceptionId: "E-d7-a" },
        { text: "9", correct: false, feedback: "9 is in the thousands place.", misconceptionId: "E-d7-b" },
        { text: "4", correct: false, feedback: "4 is in the millions place.", misconceptionId: "E-d7-c" }
      ],
    backward: "International periods: Millions, Thousands, Ones (each group of three).",
    forward: "This precision is needed when interpreting large datasets like population or GDP.",
    misconceptions: [
      { misconceptionId: "E-d7-a", description: "Student answers 0, the ten-thousands digit — one column right of target.", rootCause: "Adjacent-Column Slip — counts one column short from the left, landing on ten-thousands instead of hundred-thousands.", remediation: "Write the number into a labelled International chart and point to each header while reading the matching digit." },
      { misconceptionId: "E-d7-b", description: "Student answers 9, the thousands digit — two columns right of target.", rootCause: "Place Miscounting — counting from the right, stops two columns short of hundred-thousands.", remediation: "Count columns from the right as a cross-check: ones, tens, hundreds, thousands, ten-thousands, hundred-thousands." },
      { misconceptionId: "E-d7-c", description: "Student answers 4, the millions digit — one column too far left.", rootCause: "Column Overshoot — answers with the leading digit regardless of which specific column was named.", remediation: "Point to the named column header first, then slide down to the digit beneath it, before answering." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Group into periods", hint: "Split 4,309,017 into 4 | 309 | 017." },
      { level: 2, description: "Label the middle group", hint: "In '309', which position is hundred-thousands, ten-thousands, thousands?" },
      { level: 3, description: "Read off the digit", hint: "The hundred-thousands digit is the first digit of the middle group — what is it?" }
    ],
    forwardRiskLinks: [
      { targetSkillId: "PV-03", probability: 0.55, condition: "If not remediated before expanded-form work with 7-digit numbers" }
    ],
    learningObjectives: ["CCSS.MATH.4.NBT.A.1", "CCSS.MATH.4.NBT.A.2"]
  },
  {
    itemId: "d8", order: 8, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    skillId: "COMP-02",
    question: "Which digit could replace the □ so that  8,4□,675 > 8,48,999 ?",
    options: [
        { text: "9", correct: true, feedback: "If □=9, the thousands digit becomes 9, making the number 8,49,675 which is indeed > 8,48,999." },
        { text: "7", correct: false, feedback: "8,47,675 < 8,48,999 because 7 < 8 in the thousands place.", misconceptionId: "E-d8-a" },
        { text: "8", correct: false, feedback: "If □=8, we compare next place: 8,48,675 vs 8,48,999 → hundreds 6 vs 9, so 8,48,675 < 8,48,999.", misconceptionId: "E-d8-b" },
        { text: "0", correct: false, feedback: "8,40,675 is much smaller than 8,48,999.", misconceptionId: "E-d8-c" }
      ],
    backward: "When the larger places are equal, move to the next place on the right.",
    forward: "This careful comparison is essential when sorting large datasets.",
    misconceptions: [
      { misconceptionId: "E-d8-a", description: "Student picks 7, a digit smaller than the target.", rootCause: "Direction Reversal — picks a digit smaller than 8, producing a number that is less than, not greater than, the comparison number.", remediation: "State the rule explicitly: for the left side to end up bigger, the replaced digit must be at least as large as 8 — test each candidate against that rule." },
      { misconceptionId: "E-d8-b", description: "Student picks 8, assuming a tie at the thousands digit is enough.", rootCause: "Incomplete-Tie Resolution — stops after matching the thousands digit (8=8) without checking that the following digits (675 vs 999) actually decide the comparison the other way.", remediation: "When a tested digit produces a tie at one column, always continue the scan to the next column before declaring success." },
      { misconceptionId: "E-d8-c", description: "Student picks 0, an even smaller digit.", rootCause: "Direction Reversal (extreme) — picks the smallest available digit, compounding the same reversed-direction error.", remediation: "Trace the inequality with a finger and restate the question as 'which digits make the left side bigger?' before testing candidates." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Compare the fixed part", hint: "Both numbers read 8,4_,675 vs 8,48,999 — only the □ digit, and everything after it, differ." },
      { level: 2, description: "Test the boundary digit", hint: "What happens if □ = 8? Compare the remaining digits (675 vs 999)." },
      { level: 3, description: "Find the safe range", hint: "Since 675 < 999, □=8 doesn't work. Try □=9 — does that make the left side bigger regardless of the rest?" }
    ],
    forwardRiskLinks: [
      { targetSkillId: "COMP-01", probability: 0.4, condition: "If not remediated before multi-number ordering tasks" }
    ],
    learningObjectives: ["CCSS.MATH.4.NBT.A.2"]
  },
  {
    itemId: "d9", order: 9, cluster: "ROUND", clusterName: CLUSTER_NAMES.ROUND,
    skillId: "ROUND-02",
    question: "A shopkeeper rounded the price of a product to the nearest 100 and wrote ₹4,500. What is the maximum possible actual price?",
    options: [
        { text: "₹4,549", correct: true, feedback: "Numbers up to 4,549 round down to 4,500; 4,550 would round up to 4,600." },
        { text: "₹4,599", correct: false, feedback: "4,599 rounds to 4,600, because the tens digit is 9 (≥5).", misconceptionId: "E-d9-a" },
        { text: "₹4,499", correct: false, feedback: "That's the maximum that rounds to 4,400, not 4,500.", misconceptionId: "E-d9-b" },
        { text: "₹4,500", correct: false, feedback: "That's the rounded value; the actual could be higher.", misconceptionId: "E-d9-c" }
      ],
    backward: "Rounding to nearest 100: if tens digit ≥ 5, round up; else down.",
    forward: "Understanding rounding errors is key in finance and science.",
    misconceptions: [
      { misconceptionId: "E-d9-a", description: "Student picks ₹4,599, overshooting the true upper boundary.", rootCause: "Upper-Bound Confusion — assumes the interval rounding to 4,500 extends all the way to 4,599, not realising a tens digit of 5 or more crosses into the next hundred's rounding zone (true boundary is 4,549).", remediation: "State the rule precisely: the interval is [4,450, 4,549] — test the tens digit of each candidate against the exact cutoff, not against a rough sense of 'close'." },
      { misconceptionId: "E-d9-b", description: "Student picks ₹4,499, the wrong interval entirely.", rootCause: "Wrong-Interval Selection — finds the maximum of the interval that rounds to 4,400 (which is 4,449) but miscounts up to 4,499, confusing which target-hundred's interval is being asked about.", remediation: "Anchor to the target value first — 4,500 — then build its interval [4,450, 4,549] from scratch rather than reusing a neighbouring interval." },
      { misconceptionId: "E-d9-c", description: "Student picks ₹4,500, the rounded value itself.", rootCause: "Rounded-Value Confusion — treats the already-rounded figure as if it were also the maximum of the true-value range, not distinguishing the single rounded output from the range of inputs that produce it.", remediation: "Draw the number line: mark 4,500 as the rounded value, then shade the full interval of actual prices that would round to it, showing the interval extends beyond 4,500 itself." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the interval", hint: "Which actual prices round to ₹4,500? The interval is 4,450 up to 4,549." },
      { level: 2, description: "Identify the maximum", hint: "What is the largest number in that interval?" },
      { level: 3, description: "Confirm with the rule", hint: "Check: does 4,549 round to 4,500? Does 4,550 round to 4,600?" }
    ],
    forwardRiskLinks: [
      { targetSkillId: "ROUND-01", probability: 0.3, condition: "If not remediated before straightforward single-number rounding tasks" }
    ],
    learningObjectives: ["CCSS.MATH.4.NBT.A.3"]
  },
  {
    itemId: "d10", order: 10, cluster: "ROMAN", clusterName: CLUSTER_NAMES.ROMAN,
    skillId: "ROM-02",
    question: "A book has chapter numbers in Roman numerals. The last chapter is CCXLVI. What is this in the usual number system?",
    options: [
        { text: "246", correct: true, feedback: "CC=200, XL=40, VI=6 → 246." },
        { text: "256", correct: false, feedback: "You might have misread XL as 50 (L) instead of 40.", misconceptionId: "E-d10-a" },
        { text: "446", correct: false, feedback: "CD would be 400, but here CC=200.", misconceptionId: "E-d10-b" },
        { text: "146", correct: false, feedback: "You might have subtracted C wrongly.", misconceptionId: "E-d10-c" }
      ],
    backward: "C=100, XL=40, VI=6.",
    forward: "Roman numerals are used in outlines, old buildings, and formal titles.",
    misconceptions: [
      { misconceptionId: "E-d10-a", description: "Student answers 256, ten too high.", rootCause: "Tens-Symbol Substitution — misreads the subtractive pair XL (40) as the plain symbol L (50), losing the subtraction and inflating the tens component by 10.", remediation: "Highlight the subtractive pair XL before anything else: X-before-L means 50-10=40, never plain 50." },
      { misconceptionId: "E-d10-b", description: "Student answers 446, two hundred too high.", rootCause: "Hundreds-Symbol Substitution — misreads CC (200) as CD (400), confusing the doubled hundred symbol with a subtractive hundred-symbol pair that isn't present.", remediation: "Count repeated symbols individually: CC is two separate C's (100+100=200), not a subtractive pair — subtractive pairs only occur between two different symbols." },
      { misconceptionId: "E-d10-c", description: "Student answers 146, one hundred short.", rootCause: "Hundreds-Symbol Undercounting — misreads CC as a single C, dropping one of the two hundred-symbols entirely.", remediation: "Underline each individual symbol in CCXLVI before converting, confirming there are two separate C's, not one." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Segment the numeral", hint: "Split CCXLVI into CC | XL | VI." },
      { level: 2, description: "Convert each segment", hint: "CC = 200 (two C's added). XL = 40 (subtractive). VI = 6 (additive)." },
      { level: 3, description: "Add the segments", hint: "200 + 40 + 6 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d11", order: 11, cluster: "NEG", clusterName: CLUSTER_NAMES.NEG,
    skillId: "NEG-02",
    question: "A diver is 12 m below sea level. She ascends 5 m, then descends 3 m. What is her final position relative to sea level?",
    options: [
        { text: "10 m below sea level", correct: true, feedback: "Start at -12, up 5 → -7, down 3 → -10 (10 m below)." },
        { text: "4 m below sea level", correct: false, feedback: "You might have subtracted 12-5-3=4, ignoring the negative start.", misconceptionId: "E-d11-a" },
        { text: "10 m above sea level", correct: false, feedback: "Sign error: -12 + 5 - 3 = -10, not +10.", misconceptionId: "E-d11-b" },
        { text: "20 m below sea level", correct: false, feedback: "You added 12+5+3 instead of tracking direction.", misconceptionId: "E-d11-c" }
      ],
    backward: "Below sea level is negative; ascending means adding, descending means subtracting.",
    forward: "This logic applies to bank balances and elevation changes.",
    misconceptions: [
      { misconceptionId: "E-d11-a", description: "Student answers 4 m below sea level.", rootCause: "Magnitude-Only Arithmetic — treats all three numbers (12, 5, 3) as plain positive quantities to subtract in sequence, never actually tracking that the starting position is negative or that ascending should move toward zero.", remediation: "Track the position on a vertical number line at each step, writing the running signed total after every move, not just the raw magnitudes." },
      { misconceptionId: "E-d11-b", description: "Student answers 10 m above sea level.", rootCause: "Sign-Assignment Error — correctly computes the final magnitude (10) through the chain of moves but attaches the wrong sign, reporting 'above' when the arithmetic (-12+5-3=-10) stays negative throughout.", remediation: "After computing each step's signed value, explicitly ask 'is this still negative?' before writing the final answer's direction." },
      { misconceptionId: "E-d11-c", description: "Student answers 20 m below sea level.", rootCause: "Direction Confusion — adds all three magnitudes together (12+5+3=20) as though every move (including the ascent) increased the depth, not distinguishing 'ascend' (add toward zero) from 'descend' (subtract further from zero).", remediation: "State the rule and reuse it at every step: ascend = add, descend = subtract — apply it move by move rather than combining all the numbers at once." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Mark the start", hint: "Mark -12 on a vertical number line." },
      { level: 2, description: "Apply each move in order", hint: "Ascend 5 (add): -12+5 = ? Then descend 3 (subtract) from that result." },
      { level: 3, description: "Confirm the final sign", hint: "Is the final position above or below sea level? Check the sign of your running total." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "NEG-01", probability: 0.3, condition: "If not remediated before single-step temperature/depth word problems" }
    ],
    learningObjectives: []
  },
  {
    itemId: "d12", order: 12, cluster: "CONV", clusterName: CLUSTER_NAMES.CONV,
    skillId: "CONV-01",
    question: "Convert 3,450,000 (International) into the Indian system.",
    options: [
        { text: "34,50,000", correct: true, feedback: "3,450,000 = 3 million 450 thousand. In Indian: 34 lakh 50 thousand = 34,50,000." },
        { text: "3,45,00,000", correct: false, feedback: "That would be 3 crore 45 lakh, which is 34.5 million, not 3.45 million.", misconceptionId: "E-d12-a" },
        { text: "345,000", correct: false, feedback: "That's just 345 thousand.", misconceptionId: "E-d12-b" },
        { text: "3,45,000", correct: false, feedback: "You lost a zero; 3,45,000 is only 345 thousand.", misconceptionId: "E-d12-c" }
      ],
    backward: "1 million = 10 lakh; 1 hundred-thousand = 1 lakh.",
    forward: "Knowing conversions helps when reading Indian and international financial news.",
    misconceptions: [
      { misconceptionId: "E-d12-a", description: "Student writes 3,45,00,000, a full order of magnitude too high.", rootCause: "Magnitude Inflation — regroups the digits into Indian commas but inserts an extra digit group, inflating 3.45 million to look like 34.5 million.", remediation: "Count total digits before and after conversion — 3,450,000 has 7 digits, so the Indian form must also have exactly 7 digits: 34,50,000." },
      { misconceptionId: "E-d12-b", description: "Student writes 345,000, a full order of magnitude too low.", rootCause: "Digit Loss — drops a digit while regrouping, deflating the value by a factor of 10.", remediation: "Strip all commas first to get the raw digit string (3450000) and count its length before inserting new commas." },
      { misconceptionId: "E-d12-c", description: "Student writes 3,45,000, understating the value by a factor of 10.", rootCause: "Grouping Truncation — keeps only part of the digit string when regrouping into Indian commas, effectively dropping the leading digit's place value.", remediation: "Anchor to the benchmark fact '1 million = 10 lakh' — since 3,450,000 is 3.45 million, the Indian answer must be 34.5 lakh (34,50,000), not 3.45 lakh." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Strip the commas", hint: "Remove the commas from 3,450,000 to get the digit string 3450000." },
      { level: 2, description: "Apply the benchmark", hint: "1 million = 10 lakh, so 3,450,000 (3.45 million) = 34.5 lakh." },
      { level: 3, description: "Regroup with Indian commas", hint: "Write 34 lakh 50 thousand with Indian-style commas." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "CONV-02", probability: 0.4, condition: "If not remediated before compound word-problem conversions" }
    ],
    learningObjectives: []
  },
  {
    itemId: "d13", order: 13, cluster: "PLACE", clusterName: CLUSTER_NAMES.PLACE,
    skillId: "PV-03",
    question: "Write the expanded form of 80,70,306 (Indian system).",
    options: [
        { text: "\\( 8 \\times 10,00,000 + 0 \\times 1,00,000 + 7 \\times 10,000 + 0 \\times 1,000 + 3 \\times 100 + 0 \\times 10 + 6 \\times 1 \\)", correct: true, feedback: "80,70,306 = 8×10,00,000 (80 lakh) + 7×10,000 + 3×100 + 6." },
        { text: "\\( 8 \\times 1,00,000 + 7 \\times 10,000 + 3 \\times 100 + 6 \\)", correct: false, feedback: "That would be 8,70,306, missing the zero in ten-lakhs place.", misconceptionId: "E-d13-a" },
        { text: "\\( 8 \\times 10,00,000 + 7 \\times 1,000 + 3 \\times 100 + 6 \\)", correct: false, feedback: "7 is in ten-thousands, not thousands.", misconceptionId: "E-d13-b" },
        { text: "\\( 8 \\times 10,00,000 + 7 \\times 1,00,000 + 3 \\times 100 + 6 \\)", correct: false, feedback: "That would be 87,00,306.", misconceptionId: "E-d13-c" }
      ],
    backward: "Use the place value chart to find what each digit multiplies.",
    forward: "Expanded form is the basis for algorithms like multiplication.",
    misconceptions: [
      { misconceptionId: "E-d13-a", description: "Student writes 8×1,00,000, dropping the ten-lakhs place entirely.", rootCause: "Leading-Zero Omission — treats the leading 8 as sitting in the lakhs column instead of ten-lakhs, silently skipping the lakhs-place zero that separates them.", remediation: "Write every digit of 80,70,306 into a labelled chart including its zero placeholders before assigning any multiplier to the leading digit." },
      { misconceptionId: "E-d13-b", description: "Student writes 7×1,000, misplacing the 7 in thousands instead of ten-thousands.", rootCause: "Adjacent-Column Slip — assigns the digit 7 to the thousands place instead of its actual ten-thousands place, skipping over the intervening lakhs-place zero.", remediation: "Chart every digit including the zero placeholders so no column can be silently skipped when assigning a multiplier." },
      { misconceptionId: "E-d13-c", description: "Student writes 7×1,00,000, treating 7 as though it were adjacent to the leading 8.", rootCause: "Zero-Skipping — reads the digit sequence 8 and 7 as adjacent, ignoring the zero placeholder between them in the ten-lakhs and lakhs columns, and assigns 7 to the lakhs place.", remediation: "Read the number aloud in words — 'eighty lakh, seventy thousand, three hundred six' — to hear that the lakhs digit is genuinely zero, separate from both 8 and 7." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Chart every digit", hint: "Write all seven digits of 80,70,306 into a place-value chart, including the zeros." },
      { level: 2, description: "Assign digit × place", hint: "For each non-zero digit, write digit × its column value." },
      { level: 3, description: "Sum the non-zero terms", hint: "Add only the terms for digits that are not zero." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "MUL-02", probability: 0.4, condition: "If not remediated before the standard multiplication algorithm" }
    ],
    learningObjectives: ["CCSS.MATH.4.NBT.A.1", "CCSS.MATH.4.NBT.A.2"]
  },
  {
    itemId: "d14", order: 14, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    skillId: "COMP-04",
    question: "Which number is exactly halfway between 3,45,000 and 3,55,000?",
    options: [
        { text: "3,50,000", correct: true, feedback: "Half the difference (10,000) is 5,000, added to the smaller gives 3,50,000." },
        { text: "3,45,500", correct: false, feedback: "That's the midpoint of 3,45,000 and 3,46,000.", misconceptionId: "E-d14-a" },
        { text: "3,52,500", correct: false, feedback: "That is closer to 3,55,000.", misconceptionId: "E-d14-b" },
        { text: "3,47,500", correct: false, feedback: "That's the midpoint of 3,45,000 and 3,50,000.", misconceptionId: "E-d14-c" }
      ],
    backward: "Midpoint = (small + large) ÷ 2.",
    forward: "Finding midpoints is useful for estimating and for understanding mean.",
    misconceptions: [
      { misconceptionId: "E-d14-a", description: "Student answers 3,45,500, using the wrong pair of endpoints.", rootCause: "Endpoint Anchoring — computes a midpoint using 3,45,000 and 3,46,000 (a much smaller, mistakenly-assumed gap) rather than the actual stated endpoints 3,45,000 and 3,55,000.", remediation: "Write both given endpoints explicitly before computing anything, and find their difference first (10,000) to confirm the true gap." },
      { misconceptionId: "E-d14-b", description: "Student answers 3,52,500, a value closer to the larger endpoint.", rootCause: "Skewed Averaging — computes a value weighted toward the larger endpoint rather than the true midpoint, likely from halving only part of the gap or misapplying the addition.", remediation: "Verify with the direct formula: (3,45,000 + 3,55,000) ÷ 2, computed as a single careful sum then division." },
      { misconceptionId: "E-d14-c", description: "Student answers 3,47,500, halving only half of the actual gap.", rootCause: "Endpoint Anchoring — computes the midpoint of 3,45,000 and 3,50,000 (half the true interval) instead of the full stated range up to 3,55,000.", remediation: "Circle both given endpoints in the question text before starting any calculation, to avoid substituting a nearby but incorrect pair." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the gap", hint: "3,55,000 - 3,45,000 = ?" },
      { level: 2, description: "Halve the gap", hint: "Half of the gap is the distance from either endpoint to the midpoint." },
      { level: 3, description: "Add to the smaller endpoint", hint: "3,45,000 + half the gap = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d15", order: 15, cluster: "ROUND", clusterName: CLUSTER_NAMES.ROUND,
    skillId: "ROUND-02",
    question: "A stadium's capacity is 67,845. Round this to the nearest hundred and to the nearest thousand. What is the sum of the two rounded values?",
    options: [
        { text: "1,35,800", correct: true, feedback: "67,845 → nearest 100: 67,800 (tens digit 4). Nearest 1,000: 68,000 (hundreds 8). Sum = 67,800 + 68,000 = 1,35,800." },
        { text: "1,35,900", correct: false, feedback: "Check the rounding: nearest 100 is 67,800, not 67,900.", misconceptionId: "E-d15-a" },
        { text: "1,36,000", correct: false, feedback: "That would be if both rounded to the higher thousand (68,000+68,000).", misconceptionId: "E-d15-b" },
        { text: "1,35,000", correct: false, feedback: "You might have rounded both down (67,000+68,000) or made a similar error.", misconceptionId: "E-d15-c" }
      ],
    backward: "Always check the digit to the right of the target place before rounding.",
    forward: "Double rounding is common when checking totals in budgets.",
    misconceptions: [
      { misconceptionId: "E-d15-a", description: "Student gets 1,35,900, misrounding the nearest-100 value.", rootCause: "Decision-Digit Misread — checks the wrong digit (hundreds instead of tens) when rounding to the nearest 100, incorrectly rounding 67,845 up to 67,900.", remediation: "For nearest-100 rounding, always check the tens digit specifically (4 here, which is <5, so round down) — write down which digit is being checked before deciding." },
      { misconceptionId: "E-d15-b", description: "Student gets 1,36,000, treating both roundings as if they used the same target place.", rootCause: "Uniform-Target Assumption — applies the same 'round to nearest 1,000' procedure to both required roundings, missing that the first rounding target is specifically the nearest hundred.", remediation: "Do the two roundings as two entirely separate steps, restating the target place ('nearest 100' vs 'nearest 1,000') before each one." },
      { misconceptionId: "E-d15-c", description: "Student gets 1,35,000, rounding both values down regardless of their decision digits.", rootCause: "Direction Default — rounds both the hundred and the thousand down out of habit, without checking either decision digit (tens=4 for the first, hundreds=8 for the second).", remediation: "Check the specific decision digit for each rounding separately — they are not always the same direction." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Do the two roundings separately", hint: "First: round 67,845 to the nearest 100. Second: round 67,845 to the nearest 1,000." },
      { level: 2, description: "Check each decision digit", hint: "Nearest 100 checks the tens digit (4). Nearest 1,000 checks the hundreds digit (8)." },
      { level: 3, description: "Add the two results", hint: "Add your two rounded values together." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "ROUND-01", probability: 0.3, condition: "If not remediated before straightforward single-number rounding tasks" }
    ],
    learningObjectives: ["CCSS.MATH.4.NBT.A.3"]
  },
  {
    itemId: "d16", order: 16, cluster: "ROMAN", clusterName: CLUSTER_NAMES.ROMAN,
    skillId: "ROM-03",
    question: "What is the difference between LXXXVIII and XLIV? (Write answer in Roman numerals.)",
    options: [
        { text: "XLIV", correct: true, feedback: "LXXXVIII = 88, XLIV = 44, difference = 44 = XLIV." },
        { text: "XLVI", correct: false, feedback: "That's 46, not the difference.", misconceptionId: "E-d16-a" },
        { text: "XXXXIV", correct: false, feedback: "Roman numeral rule broken; 44 is written XLIV.", misconceptionId: "E-d16-b" },
        { text: "XXXIV", correct: false, feedback: "That's 34, not 44.", misconceptionId: "E-d16-c" }
      ],
    backward: "Convert to numerals, subtract, then convert back.",
    forward: "Performing arithmetic with Roman numerals tests your place value understanding.",
    misconceptions: [
      { misconceptionId: "E-d16-a", description: "Student computes 46 instead of 44.", rootCause: "Off-by-Two Subtraction Error — miscounts by two while subtracting 88-44, likely from a slip converting one of the numerals before subtracting.", remediation: "Convert both numerals fully to Hindu-Arabic first (88 and 44), then subtract using the standard algorithm before converting the result back." },
      { misconceptionId: "E-d16-b", description: "Student writes XXXXIV, the correct value (44) but an invalid numeral form.", rootCause: "Repetition-Limit Violation — computes the correct numeric answer but writes it with four X's instead of using the subtractive pair XL, not knowing no symbol may repeat more than three times.", remediation: "After computing the numeric answer, re-check the Roman numeral form specifically for any symbol repeated four or more times before finalising." },
      { misconceptionId: "E-d16-c", description: "Student computes 34 instead of 44.", rootCause: "Ten's-Digit Drop — loses a ten somewhere in the subtraction, likely from misconverting LXXXVIII as 78 instead of 88, or subtracting an extra ten by mistake.", remediation: "Recount the Roman symbols in LXXXVIII individually — L(50)+X+X+X(30)+V+I+I+I(8) = 88 — before subtracting, to catch any miscounted symbol." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Convert both numerals", hint: "LXXXVIII = 88. XLIV = 44." },
      { level: 2, description: "Subtract", hint: "88 - 44 = ?" },
      { level: 3, description: "Convert back", hint: "Write your numeric answer as a Roman numeral, checking for valid subtractive pairs." }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d17", order: 17, cluster: "NEG", clusterName: CLUSTER_NAMES.NEG,
    skillId: "NEG-01",
    question: "On a winter day, the temperature at midnight was \\( -12^\\circ\\text{C} \\). By 6 am it had fallen by \\( 7^\\circ\\text{C} \\). What was the temperature at 6 am?",
    options: [
        { text: "\\( -19^\\circ\\text{C} \\)", correct: true, feedback: "-12 - 7 = -19." },
        { text: "\\( -5^\\circ\\text{C} \\)", correct: false, feedback: "You added instead of subtracting (or thought fall means rise).", misconceptionId: "E-d17-a" },
        { text: "\\( 19^\\circ\\text{C} \\)", correct: false, feedback: "You ignored the negative sign entirely.", misconceptionId: "E-d17-b" },
        { text: "\\( 5^\\circ\\text{C} \\)", correct: false, feedback: "You subtracted 12 - 7 and forgot the negative.", misconceptionId: "E-d17-c" }
      ],
    backward: "A fall means move left on the number line (more negative).",
    forward: "Negative temperature calculations are common in weather forecasting and science.",
    misconceptions: [
      { misconceptionId: "E-d17-a", description: "Student answers -5°C, treating 'fallen by' as a rise.", rootCause: "Sign-Confusion — misreads 'fallen by' as meaning the temperature moves toward positive, adding 7 to -12 instead of subtracting it.", remediation: "State the rule and reuse it every time: 'fallen' or 'dropped' always means subtract (move left/more negative); 'risen' always means add." },
      { misconceptionId: "E-d17-b", description: "Student answers 19°C, dropping the negative sign entirely.", rootCause: "Sign-Dropping — ignores the negative sign on the starting temperature and adds 12+7 as though starting from positive territory.", remediation: "Circle the negative sign before starting and say 'starting point is below zero' out loud before doing any arithmetic." },
      { misconceptionId: "E-d17-c", description: "Student answers 5°C, computing the magnitude difference and dropping the sign.", rootCause: "Magnitude Subtraction Only — computes 12-7=5 as a plain subtraction, ignoring that a fall from an already-negative temperature should move further negative, not toward positive.", remediation: "Use a number line: start at -12 and count 7 steps to the left (a fall); read the landing point directly rather than subtracting magnitudes." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Mark the start", hint: "Mark -12 on a number line." },
      { level: 2, description: "Identify the direction", hint: "A 'fall' always moves left, further from zero on the negative side." },
      { level: 3, description: "Count and land", hint: "Move 7 steps to the left from -12. Where do you land?" }
    ],
    forwardRiskLinks: [
      { targetSkillId: "NEG-02", probability: 0.5, condition: "If not remediated before multi-step integer word problems" }
    ],
    learningObjectives: []
  },
  {
    itemId: "d18", order: 18, cluster: "CONV", clusterName: CLUSTER_NAMES.CONV,
    skillId: "CONV-02",
    question: "A company's revenue is 4.6 million dollars. Write this number in the Indian system (no currency).",
    options: [
        { text: "46,00,000", correct: true, feedback: "4.6 million = 4,600,000 = 46 lakh = 46,00,000." },
        { text: "4,60,00,000", correct: false, feedback: "That's 46 million, not 4.6 million.", misconceptionId: "E-d18-a" },
        { text: "4,60,000", correct: false, feedback: "That's 4.6 lakh, not 4.6 million.", misconceptionId: "E-d18-b" },
        { text: "46,000", correct: false, feedback: "That's 46 thousand.", misconceptionId: "E-d18-c" }
      ],
    backward: "1 million = 10 lakh.",
    forward: "This conversion is vital for reading global economic data.",
    misconceptions: [
      { misconceptionId: "E-d18-a", description: "Student writes 4,60,00,000, a full order of magnitude too high.", rootCause: "Magnitude Inflation — applies the million-to-lakh benchmark incorrectly, treating 4.6 million as though it were 46 million.", remediation: "Anchor to the exact ratio: 1 million = 10 lakh, so 4.6 million = 4.6 × 10 = 46 lakh, not 460 lakh." },
      { misconceptionId: "E-d18-b", description: "Student writes 4,60,000, a full order of magnitude too low.", rootCause: "Unit Confusion — treats 'million' as though it were 'lakh', writing 4.6 lakh instead of converting the million figure first.", remediation: "Convert the unit itself before writing any digits: 4.6 million must become '46 lakh' in words before it becomes a numeral." },
      { misconceptionId: "E-d18-c", description: "Student writes 46,000, two orders of magnitude too low.", rootCause: "Unit Confusion (compounded) — treats 'million' as though it were 'thousand', losing two full orders of magnitude.", remediation: "Write out the full value in digits first — 4,600,000 — and count its digits (7) before regrouping into Indian commas." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Write the full digit value", hint: "4.6 million = 4,600,000. Write out all seven digits." },
      { level: 2, description: "Apply the benchmark", hint: "1 million = 10 lakh, so 4,600,000 = 46 lakh." },
      { level: 3, description: "Regroup with Indian commas", hint: "Write 46 lakh with Indian-style commas: 46,00,000." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "CONV-01", probability: 0.4, condition: "If not remediated before direct-format Indian–International conversions" }
    ],
    learningObjectives: []
  },
  {
    itemId: "d19", order: 19, cluster: "PLACE", clusterName: CLUSTER_NAMES.PLACE,
    skillId: "PV-02",
    question: "Which number has 3 in the hundred-thousands place (International system)?",
    options: [
        { text: "1,345,678", correct: true, feedback: "In 1,345,678, the hundred-thousands digit is 3 (1 million, 3 hundred-thousands)." },
        { text: "1,354,678", correct: false, feedback: "Here 3 is in the ten-thousands place.", misconceptionId: "E-d19-a" },
        { text: "3,145,678", correct: false, feedback: "3 is in the millions place.", misconceptionId: "E-d19-b" },
        { text: "1,435,678", correct: false, feedback: "Hundred-thousands digit is 4.", misconceptionId: "E-d19-c" }
      ],
    backward: "Break the number into groups of three, starting from the right.",
    forward: "This will help you read large datasets accurately.",
    misconceptions: [
      { misconceptionId: "E-d19-a", description: "Student picks 1,354,678, where 3 is actually in the ten-thousands place.", rootCause: "Adjacent-Column Slip — selects a number where 3 sits one column to the right of hundred-thousands, not checking the exact column before choosing.", remediation: "For each candidate, chart the digits into a labelled International place-value chart before deciding if 3 is truly in hundred-thousands." },
      { misconceptionId: "E-d19-b", description: "Student picks 3,145,678, where 3 is in the millions place.", rootCause: "Column Overshoot — selects a number where 3 is the leading (millions) digit, one column too far left of the target.", remediation: "Point to the hundred-thousands header specifically on a chart, then check which candidate has 3 directly beneath it." },
      { misconceptionId: "E-d19-c", description: "Student picks 1,435,678, where the hundred-thousands digit is actually 4, not 3.", rootCause: "Digit Misidentification — misreads the hundred-thousands digit of the candidate as 3 when it is actually 4, likely confusing it with a nearby 3 elsewhere in the number.", remediation: "Underline only the hundred-thousands digit of each candidate before comparing it to the target digit 3." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Chart each candidate", hint: "For each option, write the digits into a labelled place-value chart." },
      { level: 2, description: "Locate hundred-thousands", hint: "Find the hundred-thousands column specifically in each chart." },
      { level: 3, description: "Match the target digit", hint: "Which candidate has exactly 3 in that column?" }
    ],
    forwardRiskLinks: [
      { targetSkillId: "PV-03", probability: 0.4, condition: "If not remediated before expanded-form work" }
    ],
    learningObjectives: ["CCSS.MATH.4.NBT.A.1"]
  },
  {
    itemId: "d20", order: 20, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    skillId: "COMP-03",
    question: "Find the smallest number that you can form using all the digits 5, 0, 3, 8, 2, 4 exactly once (you cannot start with 0).",
    options: [
        { text: "2,03,458", correct: true, feedback: "Smallest non-zero leading digit is 2, then place remaining in ascending order: 0,3,4,5,8." },
        { text: "0,23,458", correct: false, feedback: "Cannot start with 0; that would be a 5-digit number.", misconceptionId: "E-d20-a" },
        { text: "2,30,458", correct: false, feedback: "That is larger than 2,03,458 because the second digit 3 > 0.", misconceptionId: "E-d20-b" },
        { text: "2,43,058", correct: false, feedback: "You misordered after the first digit.", misconceptionId: "E-d20-c" }
      ],
    backward: "Place the smallest non-zero digit first, then arrange the rest ascending.",
    forward: "Forming smallest/largest numbers is a foundation for permutations and combinations.",
    misconceptions: [
      { misconceptionId: "E-d20-a", description: "Student writes 0 as the leading digit.", rootCause: "Leading-Zero Violation — ignores the stated rule that the number cannot start with 0, applying pure ascending order to all six digits without checking the constraint first.", remediation: "Apply constraints before optimizing: remove 0 from consideration for the leading position, choose the smallest remaining digit (2) to lead, then place 0 next." }
      ,
      { misconceptionId: "E-d20-b", description: "Student writes 2,30,458, placing 3 in the second position instead of 0.", rootCause: "Suboptimal-Digit Ordering — correctly picks 2 as the leading digit but fails to place the next-smallest available digit (0) immediately after it, jumping to 3 instead.", remediation: "After fixing the leading digit, sort all remaining digits (including 0) in ascending order and place them left to right without skipping any." },
      { misconceptionId: "E-d20-c", description: "Student writes 2,43,058, arranging the remaining digits arbitrarily.", rootCause: "Ordering Neglect — fixes the leading digit correctly but does not apply any systematic ascending order to the remaining digits, placing them in an arbitrary sequence.", remediation: "After the leading digit, sort every remaining digit into ascending order explicitly (0, 3, 4, 5, 8) before writing the final number." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Choose the leading digit", hint: "The leading digit must be the smallest non-zero digit available: 2." },
      { level: 2, description: "Sort the rest", hint: "Sort the remaining digits (0, 3, 4, 5, 8) in ascending order." },
      { level: 3, description: "Assemble the number", hint: "Write the leading digit followed by the sorted remaining digits." }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d21", order: 21, cluster: "ROUND", clusterName: CLUSTER_NAMES.ROUND,
    skillId: "ROUND-02",
    question: "When rounded to the nearest 10 m, a train's length is 240 m. Its actual length is a multiple of 5. Which of these could be the actual length?",
    options: [
        { text: "235 m", correct: true, feedback: "235 rounds to 240 (since the ones digit is 5, we round up). Also it's a multiple of 5." },
        { text: "245 m", correct: false, feedback: "245 rounds to 250, not 240.", misconceptionId: "E-d21-a" },
        { text: "230 m", correct: false, feedback: "230 rounds to 230, not 240.", misconceptionId: "E-d21-b" },
        { text: "250 m", correct: false, feedback: "250 rounds to 250.", misconceptionId: "E-d21-c" }
      ],
    backward: "Rounding to nearest 10: look at the ones digit.",
    forward: "This reasoning is used in engineering tolerances and measurement uncertainty.",
    misconceptions: [
      { misconceptionId: "E-d21-a", description: "Student picks 245 m, past the true upper boundary.", rootCause: "Upper-Bound Confusion — assumes numbers close to but above 240 still round down to 240, missing that 245's ones digit (5) signals rounding up to 250.", remediation: "Test the exact rounding rule on 245: ones digit is 5, which rounds up — confirm it does not round to 240." },
      { misconceptionId: "E-d21-b", description: "Student picks 230 m, assuming a 'round' multiple of 10 must round to itself.", rootCause: "Self-Rounding Assumption — assumes any number that is already a multiple of 10 rounds to itself, without checking whether that self-value actually matches the stated target of 240.", remediation: "Apply the rounding rule to every candidate individually, including multiples of 10 — 230 rounds to 230, not 240, regardless of it 'looking round already'." },
      { misconceptionId: "E-d21-c", description: "Student picks 250 m, the value on the other side of the interval.", rootCause: "Off-by-One Interval — believes the interval rounding to 240 extends up to and including 250, missing that 250's ones digit (0) means it rounds to itself, not to 240.", remediation: "Draw the interval on a number line: 235 to 244 are the values that round to 240 — test each candidate against those exact endpoints." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the interval", hint: "Which numbers round to 240 (nearest 10)? The interval is 235 to 244." },
      { level: 2, description: "Check the multiple-of-5 condition", hint: "Which numbers in that interval are also multiples of 5?" },
      { level: 3, description: "Confirm the rounding", hint: "Double-check your answer against the standard rounding rule." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.4.NBT.A.3"]
  },
  {
    itemId: "d22", order: 22, cluster: "ROMAN", clusterName: CLUSTER_NAMES.ROMAN,
    skillId: "ROM-03",
    question: "Solve:  (CXL ÷ X) + IV",
    options: [
        { text: "XVIII", correct: true, feedback: "CXL=140, ÷ X=10 gives 14, + IV=4 gives 18 = XVIII." },
        { text: "XIIV", correct: false, feedback: "XIIV is not a valid Roman numeral (can't subtract I from V twice).", misconceptionId: "E-d22-a" },
        { text: "XVI", correct: false, feedback: "You might have used CXL=120, giving 12+4=16.", misconceptionId: "E-d22-b" },
        { text: "XXII", correct: false, feedback: "That would be 22; check your arithmetic.", misconceptionId: "E-d22-c" }
      ],
    backward: "Convert to Hindu-Arabic, perform operations, convert back.",
    forward: "This exercises your ability to switch between numeral systems, important in programming.",
    misconceptions: [
      { misconceptionId: "E-d22-a", description: "Student writes XIIV, an invalid numeral form.", rootCause: "Invalid-Symbol Construction — computes the correct numeric answer (18) but tries to represent it by stacking two I's before a V, not knowing only a single smaller symbol may ever precede a larger one.", remediation: "After computing the numeric answer, convert it back using the standard tens-then-ones method: 18 = X + VIII, not a made-up subtractive combination." },
      { misconceptionId: "E-d22-b", description: "Student answers XVI (16), miscounting CXL during conversion.", rootCause: "Digit Miscount — misreads CXL as 120 instead of 140, likely dropping the subtractive XL (40) pair and reading only C+X (110) or a similar partial value, then dividing and adding incorrectly.", remediation: "Convert CXL carefully in segments — C=100, XL=40 (subtractive pair) — confirming 140 before dividing by X." },
      { misconceptionId: "E-d22-c", description: "Student answers XXII (22), overshooting the true result.", rootCause: "Division Slip — performs the division step incorrectly (e.g. treating 140 ÷ 10 as though it were a different operation or forgetting to divide fully) before adding IV, landing high at 22.", remediation: "Do each operation as a fully separate step, writing the intermediate result (140 ÷ 10 = 14) explicitly before adding 4." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Convert to numbers", hint: "CXL = 140. X = 10. IV = 4." },
      { level: 2, description: "Divide first", hint: "140 ÷ 10 = ?" },
      { level: 3, description: "Add and convert back", hint: "Add 4 to your division result, then convert the sum back to Roman numerals." }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d23", order: 23, cluster: "NEG", clusterName: CLUSTER_NAMES.NEG,
    skillId: "NEG-01",
    question: "A lift is on the 5th floor. It goes down 8 floors. Which floor is it on now? (Use negative numbers for basement levels; ground floor is 0.)",
    options: [
        { text: "-3 (Basement 3)", correct: true, feedback: "5 - 8 = -3." },
        { text: "3rd floor", correct: false, feedback: "You subtracted 5-8= -3, but misinterpreted as positive.", misconceptionId: "E-d23-a" },
        { text: "13th floor", correct: false, feedback: "You added instead of subtracted.", misconceptionId: "E-d23-b" },
        { text: "-5", correct: false, feedback: "Check: 5-8 = -3, not -5.", misconceptionId: "E-d23-c" }
      ],
    backward: "Downward movement means subtraction; if result is negative, it's below ground.",
    forward: "Elevators in many countries label basement floors as -1, -2, etc.",
    misconceptions: [
      { misconceptionId: "E-d23-a", description: "Student answers '3rd floor', dropping the negative sign.", rootCause: "Sign-Dropping — computes the magnitude of 5-8 correctly (3) but reports it as a positive above-ground floor rather than recognising the negative result means a basement level.", remediation: "Explicitly connect sign to meaning: state 'a negative floor number means basement' before finalising any answer, and check the sign of the computed result first." },
      { misconceptionId: "E-d23-b", description: "Student answers '13th floor', adding instead of subtracting.", rootCause: "Same-Sign Default (reversed) — treats 'goes down' as though it meant 'goes up', adding 8 to 5 instead of subtracting.", remediation: "State the rule and reuse it: 'down' always means subtract, 'up' always means add — regardless of the starting floor." },
      { misconceptionId: "E-d23-c", description: "Student answers -5, miscalculating the subtraction.", rootCause: "Arithmetic Slip — miscomputes 5-8, perhaps dropping the starting floor value entirely and treating the move as 0-5 instead of 5-8.", remediation: "Use a vertical number line marked with floor numbers; start at 5 and count down 8 floors one at a time to the true landing floor." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Mark the start", hint: "Mark floor 5 on a vertical number line, with ground (0) marked." },
      { level: 2, description: "Move down", hint: "Move down 8 floors from 5. Count one floor at a time." },
      { level: 3, description: "Interpret the sign", hint: "If you land below 0, that's a basement level — express it as a negative number." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "NEG-02", probability: 0.4, condition: "If not remediated before multi-step floor/elevation word problems" }
    ],
    learningObjectives: []
  },
  {
    itemId: "d24", order: 24, cluster: "CONV", clusterName: CLUSTER_NAMES.CONV,
    skillId: "CONV-01",
    question: "A cricket stadium seats 1,20,000 people. Express this capacity in the International system.",
    options: [
        { text: "120,000", correct: true, feedback: "1,20,000 Indian = 120,000 International (120 thousand)." },
        { text: "1,200,000", correct: false, feedback: "That would be 12 lakh, not 1.2 lakh.", misconceptionId: "E-d24-a" },
        { text: "12,000", correct: false, feedback: "You dropped a zero.", misconceptionId: "E-d24-b" },
        { text: "102,000", correct: false, feedback: "You misread 1,20,000.", misconceptionId: "E-d24-c" }
      ],
    backward: "Indian 1,20,000 → 1 lakh 20 thousand → 120,000.",
    forward: "Stadium capacities are often reported in international media.",
    misconceptions: [
      { misconceptionId: "E-d24-a", description: "Student writes 1,200,000, a full order of magnitude too high.", rootCause: "Magnitude Inflation — regroups the digits into International commas but inserts an extra digit, treating 1.2 lakh as though it were 12 lakh.", remediation: "Count total digits before and after conversion — 1,20,000 has 6 digits, so the International form must also have exactly 6 digits: 120,000." },
      { misconceptionId: "E-d24-b", description: "Student writes 12,000, dropping a digit.", rootCause: "Digit Loss — drops a zero while regrouping, deflating the value by a factor of 10.", remediation: "Strip all commas first to get the raw digit string (120000) and count its length before inserting new commas." },
      { misconceptionId: "E-d24-c", description: "Student writes 102,000, swapping the order of two digits.", rootCause: "Digit-Order Reversal — misreads the digit sequence while stripping commas, swapping the 2 and 0 and producing an incorrect digit string.", remediation: "Copy the raw digit string carefully one digit at a time from left to right — 1, 2, 0, 0, 0, 0 — before inserting any new commas." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Strip the commas", hint: "Remove the commas from 1,20,000 to get the digit string 120000." },
      { level: 2, description: "Regroup in 3s", hint: "Mark off groups of three from the right: 120 | 000." },
      { level: 3, description: "Re-insert commas", hint: "Join with International-style commas: 120,000." }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  }
];

const recheckItems = [
  {
    itemId: "r1", order: 1, cluster: "PLACE", clusterName: CLUSTER_NAMES.PLACE,
    skillId: "PV-03",
    question: "A number has 9 lakhs, 4 ten-thousands, 6 hundreds, and 3 ones. The thousands and tens places are zero. Write the number.",
    options: [
        { text: "9,40,603", correct: true, feedback: "9,00,000 + 40,000 + 600 + 3 = 9,40,603." },
        { text: "9,46,003", correct: false, feedback: "You placed the hundreds digit in the thousands place.", misconceptionId: "E-r1-a" },
        { text: "9,40,063", correct: false, feedback: "You swapped the hundreds and tens.", misconceptionId: "E-r1-b" },
        { text: "94,06,003", correct: false, feedback: "Incorrect grouping — mix of Indian and International.", misconceptionId: "E-r1-c" }
      ],
    misconceptions: [
      { misconceptionId: "E-r1-a", description: "Student writes 9,46,003, placing the hundreds digit (6) in the thousands column.", rootCause: "Adjacent-Column Slip — promotes the hundreds digit one column left into the (stated-empty) thousands place instead of leaving thousands as zero.", remediation: "Build the number column by column, filling the stated empty thousands place with 0 explicitly before placing the hundreds digit." },
      { misconceptionId: "E-r1-b", description: "Student writes 9,40,063, swapping the hundreds and tens digits.", rootCause: "Neighbor-Column Swap — writes the hundreds digit and the (stated-zero) tens digit in reversed order.", remediation: "Assign each clue to its named column first — hundreds gets 6, tens gets 0 (stated) — before writing the digits in sequence." },
      { misconceptionId: "E-r1-c", description: "Student writes 94,06,003, mixing comma groupings.", rootCause: "Grouping System Mixing — applies an inconsistent comma pattern, inserting an extra digit group.", remediation: "Build the number as one unbroken digit string first (940603), then apply Indian commas afterward." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "List every column", hint: "List all six columns: Lakhs, Ten-thousands, Thousands, Hundreds, Tens, Ones." },
      { level: 2, description: "Fill in the clues", hint: "Fill each named column, and mark the stated-zero columns with 0." },
      { level: 3, description: "Read the number", hint: "Read the six digits left to right and add Indian commas." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "PV-02", probability: 0.4, condition: "If not remediated before digit-identification tasks with embedded zeros" }
    ],
    learningObjectives: ["CCSS.MATH.4.NBT.A.1", "CCSS.MATH.4.NBT.A.2"]
  },
  {
    itemId: "r2", order: 2, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    skillId: "COMP-01",
    question: "Arrange descending: 7,82,543; 7,28,534; 7,82,345; 7,28,543.",
    options: [
        { text: "7,82,543; 7,82,345; 7,28,543; 7,28,534", correct: true, feedback: "Compare ten-thousands: 82 vs 28, then thousands, etc." },
        { text: "7,28,543; 7,28,534; 7,82,345; 7,82,543", correct: false, feedback: "That's ascending.", misconceptionId: "E-r2-a" },
        { text: "7,82,345; 7,82,543; 7,28,534; 7,28,543", correct: false, feedback: "7,82,345 < 7,82,543.", misconceptionId: "E-r2-b" },
        { text: "7,28,534; 7,82,543; 7,28,543; 7,82,345", correct: false, feedback: "Mixed order.", misconceptionId: "E-r2-c" }
      ],
    misconceptions: [
      { misconceptionId: "E-r2-a", description: "Student orders the numbers smallest to largest.", rootCause: "Direction Reversal — correctly ranks the numbers by size but writes the order smallest-to-largest, confusing 'descending' with 'ascending'.", remediation: "Anchor the vocabulary physically: descending = walking down stairs = largest first." },
      { misconceptionId: "E-r2-b", description: "Student swaps 7,82,345 and 7,82,543.", rootCause: "Trailing-Digit Misread — compares only the final digits (5 vs 3) and concludes the wrong order, ignoring that the hundreds digit (5 vs 3 in 543/345) already decided the comparison the other way.", remediation: "Teach 'first difference wins, scanning left to right' — the hundreds digit differs first, so that decides the order." },
      { misconceptionId: "E-r2-c", description: "Student writes a disorganized mixed order.", rootCause: "Compound Error — scans different numbers using different columns each time rather than a consistent left-to-right method, producing an unsystematic sequence.", remediation: "Group by ten-thousands digit first (82 vs 28), order within each group, then combine the groups in descending order." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Group by ten-thousands", hint: "Split into two groups: 7,82,… and 7,28,…" },
      { level: 2, description: "Order within each group", hint: "Within 7,82,543 and 7,82,345, compare the hundreds digit: 5 vs 3." },
      { level: 3, description: "Combine descending", hint: "Place the 7,82,… group first, then the 7,28,… group, each internally ordered." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.4.NBT.A.2"]
  },
  {
    itemId: "r3", order: 3, cluster: "ROUND", clusterName: CLUSTER_NAMES.ROUND,
    skillId: "ROUND-02",
    question: "A mystery number rounds to 74,000 when rounded to the nearest 1,000. Its digit sum is 17. Which could it be?",
    options: [
        { text: "73,610", correct: true, feedback: "73,610 rounds to 74,000 (hundreds 6 ≥5). Digit sum: 7+3+6+1+0 = 17." },
        { text: "73,450", correct: false, feedback: "Rounds to 73,000, sum=19.", misconceptionId: "E-r3-a" },
        { text: "74,210", correct: false, feedback: "Rounds to 74,000, but sum=14.", misconceptionId: "E-r3-b" },
        { text: "74,530", correct: false, feedback: "Rounds to 75,000, sum=19.", misconceptionId: "E-r3-c" }
      ],
    misconceptions: [
      { misconceptionId: "E-r3-a", description: "Student picks 73,450, which fails the rounding condition.", rootCause: "Rounding-Boundary Oversight — assumes any number starting with '73' close to 74,000 rounds to it, without checking the hundreds digit against the actual threshold.", remediation: "Test the rounding condition first, digit by digit, before considering the digit-sum condition." },
      { misconceptionId: "E-r3-b", description: "Student picks 74,210, which satisfies rounding but not the digit-sum condition.", rootCause: "Condition Neglect — verifies only the rounding constraint and forgets the problem has a second, independent condition (digit sum = 17) that must also hold.", remediation: "List both conditions separately before testing any candidate, and check each candidate against both." },
      { misconceptionId: "E-r3-c", description: "Student picks 74,530, which fails the rounding condition (rounds to 75,000, not 74,000).", rootCause: "Rounding-Boundary Oversight — overlooks that the hundreds digit (5) pushes the number up to the next thousand rather than keeping it at 74,000.", remediation: "Anchor the interval explicitly: numbers rounding to 74,000 must fall in [73,500, 74,499] — test candidates against those exact bounds." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "State both conditions", hint: "List what must be true: (1) rounds to 74,000, (2) digit sum = 17." },
      { level: 2, description: "Filter by rounding", hint: "Which candidates actually round to 74,000?" },
      { level: 3, description: "Filter by digit sum", hint: "Among the survivors, which sums to 17?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.4.NBT.A.3"]
  },
  {
    itemId: "r4", order: 4, cluster: "ROMAN", clusterName: CLUSTER_NAMES.ROMAN,
    skillId: "ROM-02",
    question: "Which Roman numeral equals 199?",
    options: [
        { text: "CXCIX", correct: true, feedback: "100 (C) + 90 (XC) + 9 (IX) = CXCIX." },
        { text: "CIC", correct: false, feedback: "Can't subtract I from C directly.", misconceptionId: "E-r4-a" },
        { text: "CCXIX", correct: false, feedback: "CCXIX = 219.", misconceptionId: "E-r4-b" },
        { text: "CLXIX", correct: false, feedback: "CLXIX = 169.", misconceptionId: "E-r4-c" }
      ],
    misconceptions: [
      { misconceptionId: "E-r4-a", description: "Student writes CIC, subtracting I directly from C.", rootCause: "Double-Subtraction Error — tries to subtract I directly from C, not knowing I can only be subtracted from V or X.", remediation: "Teach the fixed subtractive pairs as a memorised list: IV=4, IX=9, XL=40, XC=90, CD=400, CM=900." },
      { misconceptionId: "E-r4-b", description: "Student writes CCXIX (219), twenty too high.", rootCause: "Hundreds-Symbol Substitution — misreads the leading C (100) as CC (200), effectively duplicating the hundreds symbol.", remediation: "Count each hundreds symbol individually — only one C is needed for the hundred here." },
      { misconceptionId: "E-r4-c", description: "Student writes CLXIX (169), thirty too low.", rootCause: "Subtractive-Pair Substitution — misreads the XC (90) portion as smaller symbols like LXX-adjacent forms, losing 30 from the total.", remediation: "Break 199 into C + XC + IX and convert each segment separately, checking that the tens segment (90) genuinely uses the subtractive pair XC." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Break into hundreds, tens, ones", hint: "199 = 100 + 90 + 9." },
      { level: 2, description: "Convert each part", hint: "100 = C. 90 = XC (subtractive). 9 = IX (subtractive)." },
      { level: 3, description: "Join the parts", hint: "C + XC + IX = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "r5", order: 5, cluster: "NEG", clusterName: CLUSTER_NAMES.NEG,
    skillId: "NEG-01",
    question: "The temperature rose from \\( -5^\\circ\\text{C} \\) to \\( 9^\\circ\\text{C} \\). How many degrees did it rise?",
    options: [
        { text: "14°C", correct: true, feedback: "From -5 to 0 is 5°, then 0 to 9 is 9°; total 14°." },
        { text: "4°C", correct: false, feedback: "You subtracted 9-5=4, ignoring the sign.", misconceptionId: "E-r5-a" },
        { text: "-14°C", correct: false, feedback: "Rise is positive, not negative.", misconceptionId: "E-r5-b" },
        { text: "5°C", correct: false, feedback: "That's only the part from -5 to 0.", misconceptionId: "E-r5-c" }
      ],
    misconceptions: [
      { misconceptionId: "E-r5-a", description: "Student answers 4°C.", rootCause: "Endpoint Subtraction Only — computes 9-5=4 treating both numbers as positive, missing that the true distance also includes the 5-unit gap from -5 up to 0.", remediation: "Plot both temperatures on a number line and count every unit crossed from -5 to 9, including the crossing of zero." },
      { misconceptionId: "E-r5-b", description: "Student answers -14°C.", rootCause: "Sign-Assignment Error — computes the correct magnitude (14) but attaches a negative sign despite the temperature clearly rising (getting warmer), not falling.", remediation: "Confirm the direction word first — 'rose' always means the change is positive — before attaching any sign to the computed magnitude." },
      { misconceptionId: "E-r5-c", description: "Student answers 5°C.", rootCause: "Partial-Distance Only — counts only the distance from -5 to 0, stopping the count at zero instead of continuing on to 9.", remediation: "Count the full journey in one continuous pass: from -5, count up through 0, all the way to 9, without stopping at zero." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Plot both points", hint: "Mark -5 and 9 on a number line." },
      { level: 2, description: "Count through zero", hint: "Count the units from -5 to 0, then continue counting from 0 to 9." },
      { level: 3, description: "Add the two parts", hint: "Add the distance from -5 to 0 and the distance from 0 to 9." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "NEG-02", probability: 0.3, condition: "If not remediated before multi-step integer word problems" }
    ],
    learningObjectives: []
  },
  {
    itemId: "r6", order: 6, cluster: "CONV", clusterName: CLUSTER_NAMES.CONV,
    skillId: "CONV-01",
    question: "Write 2,450,000 (International) in the Indian system.",
    options: [
        { text: "24,50,000", correct: true, feedback: "2.45 million = 24.5 lakh = 24,50,000." },
        { text: "2,45,00,000", correct: false, feedback: "That's 24.5 million, not 2.45 million.", misconceptionId: "E-r6-a" },
        { text: "245,000", correct: false, feedback: "Missing a zero.", misconceptionId: "E-r6-b" },
        { text: "2,45,000", correct: false, feedback: "That's 2.45 lakh.", misconceptionId: "E-r6-c" }
      ],
    misconceptions: [
      { misconceptionId: "E-r6-a", description: "Student writes 2,45,00,000, a full order of magnitude too high.", rootCause: "Magnitude Inflation — regroups the digits into Indian commas but inserts an extra digit group, inflating 2.45 million to look like 24.5 million.", remediation: "Count total digits before and after conversion — 2,450,000 has 7 digits, so the Indian form must also have exactly 7 digits: 24,50,000." },
      { misconceptionId: "E-r6-b", description: "Student writes 245,000, a full order of magnitude too low.", rootCause: "Digit Loss — drops a digit while regrouping, deflating the value by a factor of 10.", remediation: "Strip all commas first to get the raw digit string (2450000) and count its length before inserting new commas." },
      { misconceptionId: "E-r6-c", description: "Student writes 2,45,000, understating the value by a factor of 10.", rootCause: "Grouping Truncation — keeps only part of the digit string when regrouping, effectively dropping the leading digit's place value.", remediation: "Anchor to the benchmark fact '1 million = 10 lakh' — since 2,450,000 is 2.45 million, the Indian answer must be 24.5 lakh." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Strip the commas", hint: "Remove the commas from 2,450,000 to get 2450000." },
      { level: 2, description: "Apply the benchmark", hint: "1 million = 10 lakh, so 2,450,000 = 24.5 lakh." },
      { level: 3, description: "Regroup with Indian commas", hint: "Write 24 lakh 50 thousand with Indian-style commas." }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "r7", order: 7, cluster: "PLACE", clusterName: CLUSTER_NAMES.PLACE,
    skillId: "PV-02",
    question: "In the International number 7,056,312, what digit is in the ten-thousands place?",
    options: [
        { text: "5", correct: true, feedback: "Millions:7, hundred-thousands:0, ten-thousands:5, thousands:6." },
        { text: "0", correct: false, feedback: "0 is hundred-thousands.", misconceptionId: "E-r7-a" },
        { text: "6", correct: false, feedback: "6 is thousands.", misconceptionId: "E-r7-b" },
        { text: "3", correct: false, feedback: "3 is hundreds.", misconceptionId: "E-r7-c" }
      ],
    misconceptions: [
      { misconceptionId: "E-r7-a", description: "Student answers 0, the hundred-thousands digit — one column left of target.", rootCause: "Column Overshoot — reads the column immediately to the left of ten-thousands instead of the target column itself.", remediation: "Point to the named column header first, then slide down to the digit beneath it, before answering." },
      { misconceptionId: "E-r7-b", description: "Student answers 6, the thousands digit — one column right of target.", rootCause: "Adjacent-Column Slip — counts one column past ten-thousands into thousands.", remediation: "Write the number into a labelled chart and point to each header while reading the matching digit." },
      { misconceptionId: "E-r7-c", description: "Student answers 3, the hundreds digit — two columns right of target.", rootCause: "Place Miscounting — counting from the right, overshoots two columns past ten-thousands.", remediation: "Count columns from the right as a cross-check: ones, tens, hundreds, thousands, ten-thousands." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Group into periods", hint: "Split 7,056,312 into 7 | 056 | 312." },
      { level: 2, description: "Label the middle group", hint: "In '056', which position is hundred-thousands, ten-thousands, thousands?" },
      { level: 3, description: "Read off the digit", hint: "The ten-thousands digit is the middle digit of the middle group — what is it?" }
    ],
    forwardRiskLinks: [
      { targetSkillId: "PV-03", probability: 0.4, condition: "If not remediated before expanded-form work with 7-digit numbers" }
    ],
    learningObjectives: ["CCSS.MATH.4.NBT.A.1", "CCSS.MATH.4.NBT.A.2"]
  },
  {
    itemId: "r8", order: 8, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    skillId: "COMP-02",
    question: "Which digit can replace the □ to make true?  9,2□,540 < 9,25,399",
    options: [
        { text: "4", correct: true, feedback: "If □=4, we have 9,24,540 vs 9,25,399 → thousands 4 < 5, so true." },
        { text: "5", correct: false, feedback: "If □=5, thousands equal 5; then compare hundreds 5 vs 3, making 9,25,540 > 9,25,399.", misconceptionId: "E-r8-a" },
        { text: "6", correct: false, feedback: "6 > 5, so 9,26,540 > 9,25,399.", misconceptionId: "E-r8-b" },
        { text: "9", correct: false, feedback: "9 > 5, so it would be larger.", misconceptionId: "E-r8-c" }
      ],
    misconceptions: [
      { misconceptionId: "E-r8-a", description: "Student picks 5, assuming a tie at the thousands digit is enough.", rootCause: "Incomplete-Tie Resolution — stops after matching the thousands digit (5=5) without checking that the following digits (540 vs 399) actually decide the number is greater, not less.", remediation: "When a tested digit produces a tie at one column, always continue the scan to the next column before declaring success." },
      { misconceptionId: "E-r8-b", description: "Student picks 6, a digit greater than the target.", rootCause: "Direction Reversal — picks a digit larger than 5, producing a number that is greater than, not less than, the comparison number.", remediation: "State the rule explicitly: for the left side to stay smaller, the replaced digit must be less than 5 — test each candidate against that rule." },
      { misconceptionId: "E-r8-c", description: "Student picks 9, an even larger digit.", rootCause: "Direction Reversal (extreme) — picks the largest available digit, compounding the same reversed-direction error.", remediation: "Trace the inequality with a finger and restate the question as 'which digits keep the left side smaller?' before testing candidates." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Compare the fixed part", hint: "Both numbers read 9,2_,540 vs 9,25,399 — only the □ digit and what follows differ." },
      { level: 2, description: "Test the boundary digit", hint: "What happens if □ = 5? Compare the remaining digits (540 vs 399)." },
      { level: 3, description: "Find the safe range", hint: "Since 540 > 399, □=5 doesn't work for '<'. Try a digit less than 5." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "COMP-01", probability: 0.4, condition: "If not remediated before multi-number ordering tasks" }
    ],
    learningObjectives: ["CCSS.MATH.4.NBT.A.2"]
  },
  {
    itemId: "r9", order: 9, cluster: "ROUND", clusterName: CLUSTER_NAMES.ROUND,
    skillId: "ROUND-02",
    question: "A container holds 23,476 ml, rounded to the nearest 100 ml and to the nearest 1,000 ml. Find the sum of the rounded values.",
    options: [
        { text: "46,500 ml", correct: true, feedback: "23,476 → nearest 100: 23,500; nearest 1,000: 23,000. Sum = 46,500." },
        { text: "46,400 ml", correct: false, feedback: "Nearest 100 would be 23,500, not 23,400.", misconceptionId: "E-r9-a" },
        { text: "47,000 ml", correct: false, feedback: "That would be 23,500+23,500, but nearest 1000 is 23,000.", misconceptionId: "E-r9-b" },
        { text: "46,000 ml", correct: false, feedback: "Rounded both down: 23,400+23,000? Not correct.", misconceptionId: "E-r9-c" }
      ],
    misconceptions: [
      { misconceptionId: "E-r9-a", description: "Student gets 46,400, misrounding the nearest-100 value.", rootCause: "Decision-Digit Misread — checks the wrong digit when rounding to the nearest 100, rounding 23,476 down to 23,400 instead of up to 23,500.", remediation: "For nearest-100 rounding, always check the tens digit specifically (7 here, which is ≥5, so round up)." },
      { misconceptionId: "E-r9-b", description: "Student gets 47,000, treating both roundings as if to the same target place.", rootCause: "Uniform-Target Assumption — applies 'round to nearest 100' to both required roundings, missing that the second rounding target is specifically the nearest 1,000.", remediation: "Do the two roundings as two entirely separate steps, restating the target place before each one." },
      { misconceptionId: "E-r9-c", description: "Student gets 46,000, rounding both values down regardless of their decision digits.", rootCause: "Direction Default — rounds both values down out of habit, without checking either decision digit.", remediation: "Check the specific decision digit for each rounding separately — they are not always the same direction." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Do the two roundings separately", hint: "First: round 23,476 to the nearest 100. Second: round to the nearest 1,000." },
      { level: 2, description: "Check each decision digit", hint: "Nearest 100 checks the tens digit (7). Nearest 1,000 checks the hundreds digit (4)." },
      { level: 3, description: "Add the two results", hint: "Add your two rounded values together." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.4.NBT.A.3"]
  },
  {
    itemId: "r10", order: 10, cluster: "ROMAN", clusterName: CLUSTER_NAMES.ROMAN,
    skillId: "ROM-03",
    question: "Calculate DXL ÷ XII and write the answer in Roman numerals.",
    options: [
        { text: "XLV", correct: true, feedback: "DXL=540, XII=12, 540÷12=45 = XLV." },
        { text: "LIV", correct: false, feedback: "LIV=54, not 45.", misconceptionId: "E-r10-a" },
        { text: "XLIV", correct: false, feedback: "XLIV=44, close but wrong.", misconceptionId: "E-r10-b" },
        { text: "VL", correct: false, feedback: "VL is not a valid Roman numeral.", misconceptionId: "E-r10-c" }
      ],
    misconceptions: [
      { misconceptionId: "E-r10-a", description: "Student answers LIV (54).", rootCause: "Digit-Order Reversal — computes the digits of the answer in the wrong order, or miscomputes the division and lands on a transposed value.", remediation: "Convert DXL and XII to Hindu-Arabic carefully first (540 and 12), then perform the division as a standard written algorithm before converting back." },
      { misconceptionId: "E-r10-b", description: "Student answers XLIV (44), one short of the correct value.", rootCause: "Off-by-One Division Error — makes a small arithmetic slip in the division (540 ÷ 12), landing one below the correct quotient of 45.", remediation: "Verify the division by multiplying back: does 12 × 45 = 540? Check the candidate answer against the original dividend." },
      { misconceptionId: "E-r10-c", description: "Student writes VL, an invalid Roman numeral.", rootCause: "Invalid-Symbol Construction — tries to represent 45 by subtracting V from L, not knowing only I, X, C, M may ever be used as subtractors.", remediation: "After computing the numeric answer, convert it back using the standard method: 45 = XL + V, not a made-up subtractive pair." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Convert to numbers", hint: "DXL = 540. XII = 12." },
      { level: 2, description: "Divide", hint: "540 ÷ 12 = ?" },
      { level: 3, description: "Convert back", hint: "Convert your quotient back to Roman numerals using valid subtractive pairs only." }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "r11", order: 11, cluster: "NEG", clusterName: CLUSTER_NAMES.NEG,
    skillId: "NEG-02",
    question: "A submarine is at -200 m. It rises 75 m, then dives 120 m. What is its new depth?",
    options: [
        { text: "-245 m", correct: true, feedback: "-200 + 75 = -125; -125 - 120 = -245." },
        { text: "-45 m", correct: false, feedback: "You subtracted 200-75-120=5, wrong signs.", misconceptionId: "E-r11-a" },
        { text: "-155 m", correct: false, feedback: "Possibly 200-75+120=245? Not correct with signs.", misconceptionId: "E-r11-b" },
        { text: "-395 m", correct: false, feedback: "You added all as positives: 200+75+120=395, then made negative.", misconceptionId: "E-r11-c" }
      ],
    misconceptions: [
      { misconceptionId: "E-r11-a", description: "Student answers -45 m.", rootCause: "Magnitude-Only Arithmetic — treats all three numbers as plain positive quantities to subtract in sequence, never actually tracking the signed running total.", remediation: "Track the position on a vertical number line at each step, writing the running signed total after every move." },
      { misconceptionId: "E-r11-b", description: "Student answers -155 m.", rootCause: "Direction Confusion (partial) — mishandles one of the two moves, likely adding the dive instead of subtracting it at some point in the chain.", remediation: "State the rule and reuse it at every step: rise = add, dive = subtract — apply it move by move rather than combining all the numbers at once." },
      { misconceptionId: "E-r11-c", description: "Student answers -395 m.", rootCause: "Direction Confusion — adds all three magnitudes together as though every move (including the rise) increased the depth, not distinguishing rise from dive.", remediation: "Walk through each move on a vertical number line individually, confirming the sign changes with rise vs dive before combining." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Mark the start", hint: "Mark -200 on a vertical number line." },
      { level: 2, description: "Apply each move in order", hint: "Rise 75 (add): -200+75 = ? Then dive 120 (subtract) from that result." },
      { level: 3, description: "Confirm the final sign", hint: "Check the sign of your running total at each step." }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "r12", order: 12, cluster: "CONV", clusterName: CLUSTER_NAMES.CONV,
    skillId: "CONV-02",
    question: "A city's population is 7.8 million. Write this in the Indian system.",
    options: [
        { text: "78,00,000", correct: true, feedback: "7.8 million = 7,800,000 = 78 lakh = 78,00,000." },
        { text: "7,80,00,000", correct: false, feedback: "That's 78 million.", misconceptionId: "E-r12-a" },
        { text: "7,80,000", correct: false, feedback: "That's 7.8 lakh.", misconceptionId: "E-r12-b" },
        { text: "7,08,00,000", correct: false, feedback: "Misplaced zeros.", misconceptionId: "E-r12-c" }
      ],
    misconceptions: [
      { misconceptionId: "E-r12-a", description: "Student writes 7,80,00,000, a full order of magnitude too high.", rootCause: "Magnitude Inflation — applies the million-to-lakh benchmark incorrectly, treating 7.8 million as though it were 78 million.", remediation: "Anchor to the exact ratio: 1 million = 10 lakh, so 7.8 million = 7.8 × 10 = 78 lakh." },
      { misconceptionId: "E-r12-b", description: "Student writes 7,80,000, a full order of magnitude too low.", rootCause: "Unit Confusion — treats 'million' as though it were 'lakh', writing 7.8 lakh instead of converting the million figure first.", remediation: "Convert the unit itself before writing any digits: 7.8 million must become '78 lakh' in words before it becomes a numeral." },
      { misconceptionId: "E-r12-c", description: "Student writes 7,08,00,000, with digits transposed.", rootCause: "Digit-Order Reversal — inserts the digits of 78 in the wrong order while regrouping, producing 708 instead of 78 in the leading portion.", remediation: "Write out the full value in digits first — 7,800,000 — and copy each digit in order before regrouping into Indian commas." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Write the full digit value", hint: "7.8 million = 7,800,000. Write out all seven digits." },
      { level: 2, description: "Apply the benchmark", hint: "1 million = 10 lakh, so 7,800,000 = 78 lakh." },
      { level: 3, description: "Regroup with Indian commas", hint: "Write 78 lakh with Indian-style commas: 78,00,000." }
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
    title: "Number Sense & Place Value — Advanced Core",
    subtitle: "Telangana & Cambridge · Level 2 · Advanced Core",
    description: "Multi-clue place value and comparison puzzles, rupee-price rounding, subtractive Roman numerals, multi-step negative-number scenarios, and Indian–International conversions.",
    clusterNames: CLUSTER_NAMES,
    gateReviewHTML: '<strong>Quick Review</strong><br>' +
      "&bull; Indian place value: Ones, Tens, Hundreds, Thousands, Ten-thousands, Lakhs, Ten-lakhs, Crores<br>" +
      "&bull; International: Ones, Tens, Hundreds, Thousands, Ten-thousands, Hundred-thousands, Millions<br>" +
      "&bull; Roman numerals: I=1, V=5, X=10, L=50, C=100, D=500, M=1000. No symbol repeated more than 3 times.<br>" +
      "&bull; Rounding: Look at the digit to the right of the target place. 5 or more → round up.<br>" +
      "&bull; Negative numbers: Used for temperature, depth below sea level, bank overdrafts.<br>",
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

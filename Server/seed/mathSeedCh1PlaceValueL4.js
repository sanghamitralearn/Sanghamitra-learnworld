// seed/mathSeedCh1PlaceValueL4.js
//
// Populates math_chapters and math_questions with Grade 5, Chapter 1
// (Number Sense & Place Value), Level 4 — converted from the standalone
// HTML file ch-1-place-value-level-4.html.
//
// Run with: node seed/mathSeedCh1PlaceValueL4.js

const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-5";
const GRADE_LABEL = "Grade 5";
const CHAPTER_SLUG = "ch-1-place-value";
const CHAPTER_NAME = "Number Sense & Place Value";
const LEVEL = 4;

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
    question: "What is the place value of 4 in 2,43,567?",
    options: [
        { text: "40,000", correct: true, feedback: "The 4 is in the ten-thousands place." },
        { text: "4,000", correct: false, feedback: "That's the thousands place.", misconceptionId: "E-w1-a" },
        { text: "400", correct: false, feedback: "That's the hundreds place.", misconceptionId: "E-w1-b" },
        { text: "4,00,000", correct: false, feedback: "That's the lakhs place.", misconceptionId: "E-w1-c" }
      ],
    retryHint: "",
    misconceptions: [
      { misconceptionId: "E-w1-a", description: "Student answers 4,000, one column to the right of ten-thousands.", rootCause: "Adjacent-Column Slip — reads the digit as though it sat in the thousands column instead of the ten-thousands column.", remediation: "Chart every digit of 2,43,567 into a labelled place-value chart before naming any single digit's value." },
      { misconceptionId: "E-w1-b", description: "Student answers 400, two columns to the right.", rootCause: "Place Miscounting — under-counts by two columns, landing on hundreds instead of ten-thousands.", remediation: "Mark the number into periods first — 2 | 43 | 567 — and identify which period the target digit falls in before naming its exact column." },
      { misconceptionId: "E-w1-c", description: "Student answers 4,00,000, one full period too high.", rootCause: "Period Promotion — mistakes the comma before the 4 as the start of the lakhs period rather than the ten-thousands column within the thousands period.", remediation: "Read the number aloud in words — \"two lakh, forty-three thousand, five hundred sixty-seven\" — to hear which period the 4 actually belongs to." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Split into periods", hint: "Split 2,43,567 into 2 | 43 | 567." },
      { level: 2, description: "Read within the period", hint: "In the group '43', which digit is ten-thousands and which is thousands?" },
      { level: 3, description: "Multiply out", hint: "4 is in the ten-thousands place, so its value is 4 × 10,000 = ?" }
    ],
    forwardRiskLinks: [
      { targetSkillId: "PV-03", probability: 0.6, condition: "If not remediated before expanded-form work" }
    ],
    learningObjectives: ["CCSS.MATH.4.NBT.A.1", "CCSS.MATH.4.NBT.A.2"]
  },
  {
    itemId: "w2", order: 2, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    skillId: "COMP-01",
    question: "Which is smaller? 6,54,321 or 6,45,321?",
    options: [
        { text: "6,45,321", correct: true, feedback: "Compare the ten-thousands place: 4 < 5." },
        { text: "6,54,321", correct: false, feedback: "6,54,321 is larger.", misconceptionId: "E-w2-a" },
        { text: "Both are equal", correct: false, feedback: "They are different numbers.", misconceptionId: "E-w2-b" },
        { text: "Cannot compare", correct: false, feedback: "Both have six digits; comparison is straightforward.", misconceptionId: "E-w2-c" }
      ],
    retryHint: "",
    misconceptions: [
      { misconceptionId: "E-w2-a", description: "Student picks the larger number, 6,54,321.", rootCause: "Direction Reversal — correctly identifies the ten-thousands digit as the deciding column but picks the number with the larger digit there when asked for the smaller number.", remediation: "Restate the question before answering — \"smaller\" means the number with the lower digit at the first differing column, not the higher one." },
      { misconceptionId: "E-w2-b", description: "Student answers 'Both are equal'.", rootCause: "Digit-Count Equivalence — because both numbers share five of six digits and have the same digit count, assumes matching digit count means matching value.", remediation: "Show that digit count only proves the same order of magnitude — compare column by column regardless." },
      { misconceptionId: "E-w2-c", description: "Student answers 'Cannot compare'.", rootCause: "Comma Overload — the Indian-style commas make the number feel unfamiliar, so the student avoids comparing rather than risk a wrong scan.", remediation: "Rewrite both numbers without commas, aligned by place value, before comparing." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Line up the digits", hint: "Write both numbers one under the other, digit aligned with digit." },
      { level: 2, description: "Scan from the left", hint: "Compare the leftmost digits. Same? Move one column right." },
      { level: 3, description: "Find the first difference", hint: "The digits first differ at the ten-thousands place: 5 vs 4. Which is smaller?" }
    ],
    forwardRiskLinks: [
      { targetSkillId: "FRA-01", probability: 0.4, condition: "If not remediated before comparing fractions with unlike denominators" }
    ],
    learningObjectives: ["CCSS.MATH.4.NBT.A.2"]
  },
  {
    itemId: "w3", order: 3, cluster: "ROUND", clusterName: CLUSTER_NAMES.ROUND,
    skillId: "ROUND-01",
    question: "Round 5,678 to the nearest 100.",
    options: [
        { text: "5,700", correct: true, feedback: "The tens digit is 7 (≥5), so round up." },
        { text: "5,600", correct: false, feedback: "That would require the tens digit to be less than 5.", misconceptionId: "E-w3-a" },
        { text: "5,000", correct: false, feedback: "That's rounding to the nearest 1,000.", misconceptionId: "E-w3-b" },
        { text: "5,680", correct: false, feedback: "That's rounding to the nearest 10.", misconceptionId: "E-w3-c" }
      ],
    retryHint: "",
    misconceptions: [
      { misconceptionId: "E-w3-a", description: "Student answers 5,600, rounding down regardless of the tens digit.", rootCause: "Direction Default — rounds down out of habit without checking the tens digit (7), which is the actual decision digit.", remediation: "Re-run the fixed rule every time: check the tens digit first, then decide — never guess the direction." },
      { misconceptionId: "E-w3-b", description: "Student answers 5,000, one place value too coarse.", rootCause: "Target-Place Slip — rounds to the nearest 1,000 instead of the nearest 100.", remediation: "Circle the hundreds digit before rounding so the target place is fixed." },
      { misconceptionId: "E-w3-c", description: "Student answers 5,680, one place value too fine.", rootCause: "Target-Place Slip (too fine) — rounds to the nearest 10 and keeps the digits mostly unchanged instead of making a true hundreds-level rounding decision.", remediation: "Ask \"which digit am I allowed to change?\" — for nearest-100, only the hundreds digit and everything after it may change." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Circle the target place", hint: "Circle the hundreds digit in 5,678." },
      { level: 2, description: "Check the decision digit", hint: "The tens digit is 7. Is it 5 or more?" },
      { level: 3, description: "Round and clear", hint: "Since the tens digit is 7, round the hundreds digit up and zero out the rest." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "EST-01", probability: 0.4, condition: "If not remediated before estimation word problems" }
    ],
    learningObjectives: ["CCSS.MATH.3.NBT.A.1"]
  },
  {
    itemId: "w4", order: 4, cluster: "ROMAN", clusterName: CLUSTER_NAMES.ROMAN,
    skillId: "ROM-01",
    question: "Write 35 in Roman numerals.",
    options: [
        { text: "XXXV", correct: true, feedback: "30 (XXX) + 5 (V) = XXXV." },
        { text: "XXV", correct: false, feedback: "XXV = 25.", misconceptionId: "E-w4-a" },
        { text: "XLV", correct: false, feedback: "XLV = 45.", misconceptionId: "E-w4-b" },
        { text: "XXXIV", correct: false, feedback: "XXXIV = 34.", misconceptionId: "E-w4-c" }
      ],
    retryHint: "",
    misconceptions: [
      { misconceptionId: "E-w4-a", description: "Student writes XXV (25), one ten short.", rootCause: "Tens Digit Shortfall — writes only two X's instead of three, undercounting the tens component by 10.", remediation: "Count the tens component explicitly: 35 has 3 tens, so write three X's (XXX), not two." },
      { misconceptionId: "E-w4-b", description: "Student writes XLV (45), one ten too many.", rootCause: "Tens-Symbol Substitution — misreads the tens component (XXX = 30) as the subtractive pair XL (40), applying a subtraction that is not needed here.", remediation: "Check whether the tens digit (3) requires a subtractive pair before defaulting to one — only 4 and 9 in any place ever need subtraction." },
      { misconceptionId: "E-w4-c", description: "Student writes XXXIV (34), one short.", rootCause: "Segment Confusion — correctly forms XXX (30) but appends IV (4) instead of V (5), losing track of which part of 35 (30+5) was being converted.", remediation: "Break the target number into tens and ones first (35 = 30 + 5), convert each part separately, then join: XXX + V = XXXV." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Split into tens and ones", hint: "35 = 30 + 5. Convert each part separately." },
      { level: 2, description: "Convert the tens", hint: "30 = three X's: XXX." },
      { level: 3, description: "Convert the ones and join", hint: "5 = V. Join: XXX + V = ?" }
    ],
    forwardRiskLinks: [
      { targetSkillId: "ROM-02", probability: 0.4, condition: "If not remediated before Roman numerals requiring XL/XC subtractive tens" }
    ],
    learningObjectives: []
  },
  {
    itemId: "w5", order: 5, cluster: "NEG", clusterName: CLUSTER_NAMES.NEG,
    skillId: "NEG-01",
    question: "Which temperature is warmer? -8°C or -2°C?",
    options: [
        { text: "-2°C", correct: true, feedback: "-2 is closer to zero, so it's warmer." },
        { text: "-8°C", correct: false, feedback: "-8 is colder because it's more negative.", misconceptionId: "E-w5-a" },
        { text: "Both are the same", correct: false, feedback: "The numbers are different.", misconceptionId: "E-w5-b" },
        { text: "Cannot tell", correct: false, feedback: "Negative numbers can be compared on a number line.", misconceptionId: "E-w5-c" }
      ],
    retryHint: "",
    misconceptions: [
      { misconceptionId: "E-w5-a", description: "Student picks -8°C as warmer.", rootCause: "Magnitude-Only Comparison — compares digits 8 and 2 as if positive, picking the larger digit as \"warmer\" without flipping the order for negative values.", remediation: "Anchor to a vertical thermometer: further down (more negative) is always colder, regardless of which digit looks bigger." },
      { misconceptionId: "E-w5-b", description: "Student answers 'Both are the same'.", rootCause: "Sign-Blindness — fails to register that -8 and -2 are meaningfully different quantities.", remediation: "Plot both temperatures on a labelled number line and measure the gap between each one and zero." },
      { misconceptionId: "E-w5-c", description: "Student answers 'Cannot tell'.", rootCause: "Negative-Number Avoidance — treats the comparison as unanswerable rather than applying the same left-is-smaller rule used for positives.", remediation: "State and reuse the single rule: further left on the number line always means smaller (colder)." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Draw a number line", hint: "Mark 0, -2, and -8 on a number line." },
      { level: 2, description: "Compare positions", hint: "Which point is further to the right (closer to 0)?" },
      { level: 3, description: "Connect to temperature", hint: "Further right means warmer. Which is warmer?" }
    ],
    forwardRiskLinks: [
      { targetSkillId: "INT-01", probability: 0.4, condition: "If not remediated before integer operations in Grade 6" }
    ],
    learningObjectives: []
  },
  {
    itemId: "w6", order: 6, cluster: "CONV", clusterName: CLUSTER_NAMES.CONV,
    skillId: "CONV-01",
    question: "Write 3,40,000 (Indian) in the International system.",
    options: [
        { text: "340,000", correct: true, feedback: "3 lakh 40 thousand = 340,000." },
        { text: "3,400,000", correct: false, feedback: "That would be 34 lakh.", misconceptionId: "E-w6-a" },
        { text: "34,000", correct: false, feedback: "You lost a zero.", misconceptionId: "E-w6-b" },
        { text: "3,04,000", correct: false, feedback: "Misplaced digits.", misconceptionId: "E-w6-c" }
      ],
    retryHint: "",
    misconceptions: [
      { misconceptionId: "E-w6-a", description: "Student writes 3,400,000, a full order of magnitude too high.", rootCause: "Digit Insertion — miscounts while regrouping into sets of three and inserts an extra placeholder, inflating the number tenfold.", remediation: "Strip all commas first to get the raw digit string (340000), then insert new commas by counting exactly three digits at a time from the right." },
      { misconceptionId: "E-w6-b", description: "Student writes 34,000, one digit short.", rootCause: "Digit Loss — drops a digit while regrouping, deflating the value by a factor of 10.", remediation: "Count total digits before converting (340000 has 6 digits) and verify the International-grouped answer still has 6 digits." },
      { misconceptionId: "E-w6-c", description: "Student writes 3,04,000, with digits transposed.", rootCause: "Digit-Order Reversal — misreads the digit sequence while stripping commas, swapping the 4 and 0.", remediation: "Copy the raw digit string carefully one digit at a time from left to right before inserting any new commas." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Strip the commas", hint: "Remove the Indian commas from 3,40,000 to get 340000." },
      { level: 2, description: "Regroup in 3s", hint: "Mark off groups of three from the right: 340 | 000." },
      { level: 3, description: "Re-insert commas", hint: "Join with International-style commas: 340,000." }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "w7", order: 7, cluster: "PLACE", clusterName: CLUSTER_NAMES.PLACE,
    skillId: "PV-02",
    question: "In 8,07,543, what digit is in the thousands place?",
    options: [
        { text: "7", correct: true, feedback: "The number is 8 lakh 7 thousand 543, so 7 is in the thousands place." },
        { text: "0", correct: false, feedback: "0 is in the ten-thousands place.", misconceptionId: "E-w7-a" },
        { text: "8", correct: false, feedback: "8 is in the lakhs place.", misconceptionId: "E-w7-b" },
        { text: "5", correct: false, feedback: "5 is in the hundreds place.", misconceptionId: "E-w7-c" }
      ],
    retryHint: "",
    misconceptions: [
      { misconceptionId: "E-w7-a", description: "Student answers 0, the ten-thousands digit — one column to the left.", rootCause: "Adjacent-Column Slip — points to the digit immediately left of the actual thousands digit instead of the one asked about.", remediation: "Have the student point to and say the name of each column as they move across the chart, rather than jumping straight to a column by eye." },
      { misconceptionId: "E-w7-b", description: "Student answers 8, the leftmost digit.", rootCause: "Leftmost-Digit Default — answers with the first digit seen, a common shortcut for \"which digit matters\", regardless of which place was actually asked about.", remediation: "Require the student to restate the question in their own words (\"which digit is in the thousands column?\") before looking at the number." },
      { misconceptionId: "E-w7-c", description: "Student answers 5, the hundreds digit — one column to the right.", rootCause: "Place Miscounting — counts from the right but stops one column short, landing on the hundreds' neighbour instead of thousands.", remediation: "Use a six-column chart and count out loud: ones, tens, hundreds, thousands — stop and check the digit before answering." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Say the number in words", hint: "8,07,543 is eight lakh, seven thousand, five hundred forty-three." },
      { level: 2, description: "Find 'thousand' in the words", hint: "Which part of that sentence names the thousands? What digit goes with it?" },
      { level: 3, description: "Confirm on the chart", hint: "Write 8,07,543 into a place-value chart and check which digit sits in the Thousands column." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "PV-03", probability: 0.5, condition: "If not remediated before expanded-form work" }
    ],
    learningObjectives: ["CCSS.MATH.4.NBT.A.1"]
  },
  {
    itemId: "w8", order: 8, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    skillId: "COMP-01",
    question: "Arrange in ascending order: 1,23,456; 1,32,456; 1,22,456.",
    options: [
        { text: "1,22,456; 1,23,456; 1,32,456", correct: true, feedback: "22 thousand < 23 thousand < 32 thousand." },
        { text: "1,32,456; 1,23,456; 1,22,456", correct: false, feedback: "That's descending order.", misconceptionId: "E-w8-a" },
        { text: "1,23,456; 1,22,456; 1,32,456", correct: false, feedback: "1,22,456 is smaller than 1,23,456.", misconceptionId: "E-w8-b" },
        { text: "1,22,456; 1,32,456; 1,23,456", correct: false, feedback: "1,23,456 should come before 1,32,456.", misconceptionId: "E-w8-c" }
      ],
    retryHint: "",
    misconceptions: [
      { misconceptionId: "E-w8-a", description: "Student orders the numbers largest to smallest.", rootCause: "Direction Reversal — correctly ranks the numbers by size but writes them largest-to-smallest, confusing \"ascending\" with \"descending\".", remediation: "Anchor the vocabulary physically: ascending = climbing stairs upward = smallest first. Say the meaning aloud before ordering." },
      { misconceptionId: "E-w8-b", description: "Student writes 1,23,456; 1,22,456; 1,32,456 — the first two are swapped.", rootCause: "Partial Scan — compares only the first two numbers encountered and stops before checking all three against each other, missing that 1,22,456 is actually the smallest.", remediation: "Insist on comparing every number to every other number at least once before finalising the order." },
      { misconceptionId: "E-w8-c", description: "Student writes 1,22,456; 1,32,456; 1,23,456 — the last two are swapped.", rootCause: "Middle-Value Misplacement — correctly finds the smallest number, then compares the remaining two using the wrong column, swapping their order.", remediation: "After placing the smallest, re-compare only the two numbers left over from scratch, ignoring the one already placed." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Line up all three", hint: "Write all three numbers underneath each other, digits aligned by place value." },
      { level: 2, description: "Find the smallest first", hint: "Compare the thousands-period digits: 23, 32, 22. Which is smallest?" },
      { level: 3, description: "Order what's left", hint: "Compare the remaining two numbers the same way, and place all three smallest-to-largest." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.4.NBT.A.2"]
  }
];

const diagnosticItems = [
  {
    itemId: "d1", order: 1, cluster: "PLACE", clusterName: CLUSTER_NAMES.PLACE, tier: "S",
    skillId: "PV-02",
    question: "What is the place value of 9 in 19,08,765 (Indian system)?",
    options: [
        { text: "9,00,000", correct: true, feedback: "The 9 is in the lakhs place." },
        { text: "90,000", correct: false, feedback: "That's the ten-thousands place.", misconceptionId: "E-d1-a" },
        { text: "9,000", correct: false, feedback: "That's the thousands place.", misconceptionId: "E-d1-b" },
        { text: "9,00,00,000", correct: false, feedback: "That's crores.", misconceptionId: "E-d1-c" }
      ],
    backward: "Indian place value chart: … Crores, Lakhs, Ten-thousands, Thousands, Hundreds, Tens, Ones.",
    forward: "Quick place value identification saves time in more complex calculations.",
    misconceptions: [
      { misconceptionId: "E-d1-a", description: "Student answers 90,000, one column to the right of lakhs.", rootCause: "Adjacent-Column Slip — reads the digit as though it sat in the ten-thousands column instead of the lakhs column.", remediation: "Chart every digit of 19,08,765 into a labelled place-value chart before naming any single digit's value." },
      { misconceptionId: "E-d1-b", description: "Student answers 9,000, two columns to the right.", rootCause: "Place Miscounting — under-counts by two columns, landing on thousands instead of lakhs.", remediation: "Mark the number into periods first — 19 | 08 | 765 — and identify which period the target digit falls in." },
      { misconceptionId: "E-d1-c", description: "Student answers 9,00,00,000, one full period too high.", rootCause: "Period Promotion — mistakes the comma before the 9 as the start of the crores period.", remediation: "Read the number aloud in words — \"nineteen lakh, eight thousand, seven hundred sixty-five\" — to hear which period the 9 belongs to." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Split into periods", hint: "19,08,765 splits into 19 | 08 | 765." },
      { level: 2, description: "Read within the period", hint: "In the group '19', which digit is lakhs and which is ten-lakhs?" },
      { level: 3, description: "Assign the value", hint: "9 is the lakhs digit, so its value is 9 × 1,00,000 = ?" }
    ],
    forwardRiskLinks: [
      { targetSkillId: "PV-03", probability: 0.5, condition: "If not remediated before expanded-form work" }
    ],
    learningObjectives: ["CCSS.MATH.4.NBT.A.1", "CCSS.MATH.4.NBT.A.2"]
  },
  {
    itemId: "d2", order: 2, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP, tier: "S",
    skillId: "COMP-01",
    question: "Which of these numbers is the smallest? 8,76,543; 8,67,543; 8,76,435; 8,67,435.",
    options: [
        { text: "8,67,435", correct: true, feedback: "Ten-thousands digit 6 < 7; and 435 < 543." },
        { text: "8,67,543", correct: false, feedback: "435 is smaller than 543.", misconceptionId: "E-d2-a" },
        { text: "8,76,435", correct: false, feedback: "76 thousand is larger than 67 thousand.", misconceptionId: "E-d2-b" },
        { text: "8,76,543", correct: false, feedback: "This is the largest.", misconceptionId: "E-d2-c" }
      ],
    backward: "Start comparing from the leftmost digit.",
    forward: "Efficient comparison is vital for data interpretation.",
    misconceptions: [
      { misconceptionId: "E-d2-a", description: "Student picks 8,67,543 as smallest.", rootCause: "Trailing-Digit Neglect — correctly narrows to the numbers starting 8,67,… but stops scanning before the final digit (543 vs 435), missing the last difference.", remediation: "Continue the column-by-column scan all the way to the ones digit — do not stop once the numbers \"look similar\"." },
      { misconceptionId: "E-d2-b", description: "Student picks 8,76,435 as smallest.", rootCause: "Digit-Position Neglect — misreads the ten-thousands column (7 vs 6), not checking that the numbers starting 8,67,… are actually smaller.", remediation: "Force a strict left-to-right scan across all four numbers at once, eliminating any number that is not the smallest at each column." },
      { misconceptionId: "E-d2-c", description: "Student picks 8,76,543 as smallest — actually the largest.", rootCause: "Compound Error — combines the ten-thousands mix-up with the trailing-digit neglect, selecting the number that is largest on both counts.", remediation: "Eliminate numbers one comparison at a time: compare two fully to the last digit, discard the larger, then bring in the next number." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Align all four", hint: "Write all four numbers stacked with digits aligned by column." },
      { level: 2, description: "Scan the ten-thousands column", hint: "Compare the ten-thousands digit: 7 vs 6. Which numbers survive?" },
      { level: 3, description: "Break the remaining tie", hint: "Among the survivors, compare the ones digit: 543 vs 435." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.4.NBT.A.2"]
  },
  {
    itemId: "d3", order: 3, cluster: "ROUND", clusterName: CLUSTER_NAMES.ROUND, tier: "S",
    skillId: "ROUND-01",
    question: "Round 2,864 to the nearest 100.",
    options: [
        { text: "2,900", correct: true, feedback: "The tens digit is 6 (≥5), so round up." },
        { text: "2,800", correct: false, feedback: "That would need the tens digit to be ≤4.", misconceptionId: "E-d3-a" },
        { text: "3,000", correct: false, feedback: "That's rounding to the nearest 1,000.", misconceptionId: "E-d3-b" },
        { text: "2,860", correct: false, feedback: "That's rounding to the nearest 10.", misconceptionId: "E-d3-c" }
      ],
    backward: "When rounding to the nearest 100, look at the tens digit.",
    forward: "Rounding is a daily skill for estimation.",
    misconceptions: [
      { misconceptionId: "E-d3-a", description: "Student answers 2,800, rounding down regardless of the tens digit.", rootCause: "Direction Default — rounds down out of habit without checking the tens digit (6), which is the actual decision digit.", remediation: "Re-run the fixed rule every time: check the tens digit first, then decide." },
      { misconceptionId: "E-d3-b", description: "Student answers 3,000, one place value too coarse.", rootCause: "Target-Place Slip — rounds to the nearest 1,000 instead of the nearest 100.", remediation: "Circle the hundreds digit before rounding so the target place is fixed." },
      { misconceptionId: "E-d3-c", description: "Student answers 2,860, one place value too fine.", rootCause: "Target-Place Slip (too fine) — rounds to the nearest 10 instead of a true hundreds-level rounding decision.", remediation: "Ask \"which digit am I allowed to change?\" — for nearest-100, only the hundreds digit and everything after it may change." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Circle the target place", hint: "Circle the hundreds digit in 2,864." },
      { level: 2, description: "Check the decision digit", hint: "The tens digit is 6. Is it 5 or more?" },
      { level: 3, description: "Round and clear", hint: "Since the tens digit is 6, round the hundreds digit up and zero out the rest." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "EST-01", probability: 0.4, condition: "If not remediated before estimation word problems" }
    ],
    learningObjectives: ["CCSS.MATH.3.NBT.A.1"]
  },
  {
    itemId: "d4", order: 4, cluster: "ROMAN", clusterName: CLUSTER_NAMES.ROMAN, tier: "S",
    skillId: "ROM-01",
    question: "What is XLIV in Hindu-Arabic numerals?",
    options: [
        { text: "44", correct: true, feedback: "XL = 40, IV = 4 → 44." },
        { text: "46", correct: false, feedback: "XLVI = 46.", misconceptionId: "E-d4-a" },
        { text: "54", correct: false, feedback: "LIV = 54.", misconceptionId: "E-d4-b" },
        { text: "64", correct: false, feedback: "LXIV = 64.", misconceptionId: "E-d4-c" }
      ],
    backward: "XL means 50-10, IV means 5-1.",
    forward: "Roman numerals appear on clocks and formal documents.",
    misconceptions: [
      { misconceptionId: "E-d4-a", description: "Student answers 46, two too high.", rootCause: "Segment Confusion — misreads the ones segment IV (4) as VI (6), reversing the additive/subtractive symbol order.", remediation: "Compare IV and VI side by side: the symbol written first decides addition or subtraction." },
      { misconceptionId: "E-d4-b", description: "Student answers 54, ten too high.", rootCause: "Tens-Symbol Substitution — misreads the subtractive pair XL (40) as the plain symbol L (50), losing the subtraction.", remediation: "Highlight the subtractive pair XL before anything else: X-before-L means 50-10=40, never plain 50." },
      { misconceptionId: "E-d4-c", description: "Student answers 64, twenty too high.", rootCause: "Tens-Symbol Substitution (opposite) — misreads XL (40) as LX (60), swapping which symbol is subtracted from which.", remediation: "Contrast XL and LX side by side: X-before-L subtracts (40); the reverse order would add." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Split into segments", hint: "Split XLIV into XL | IV." },
      { level: 2, description: "Convert each segment", hint: "XL = 40 (subtractive). IV = 4 (subtractive)." },
      { level: 3, description: "Add the segments", hint: "40 + 4 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d5", order: 5, cluster: "NEG", clusterName: CLUSTER_NAMES.NEG, tier: "S",
    skillId: "NEG-01",
    question: "Which temperature is colder? -5°C or -1°C?",
    options: [
        { text: "-5°C", correct: true, feedback: "The more negative the number, the colder it is." },
        { text: "-1°C", correct: false, feedback: "-1 is warmer than -5.", misconceptionId: "E-d5-a" },
        { text: "Both are the same", correct: false, feedback: "They are different numbers.", misconceptionId: "E-d5-b" },
        { text: "Cannot say", correct: false, feedback: "Negative numbers are easily compared.", misconceptionId: "E-d5-c" }
      ],
    backward: "On a number line, further left means smaller (colder).",
    forward: "Negative numbers describe temperatures, debts, and elevations.",
    misconceptions: [
      { misconceptionId: "E-d5-a", description: "Student picks -1°C as colder.", rootCause: "Magnitude-Only Comparison — compares digits 1 and 5 as if positive, picking the smaller digit as colder without flipping the order for negative values.", remediation: "Anchor to a vertical thermometer: further down (more negative) is always colder, regardless of which digit looks bigger." },
      { misconceptionId: "E-d5-b", description: "Student answers 'Both are the same'.", rootCause: "Sign-Blindness — fails to register that -5 and -1 are meaningfully different quantities.", remediation: "Plot both temperatures on a labelled number line and measure the gap between each one and zero." },
      { misconceptionId: "E-d5-c", description: "Student answers 'Cannot say'.", rootCause: "Negative-Number Avoidance — treats the comparison as unanswerable rather than applying the same left-is-smaller rule used for positives.", remediation: "State and reuse the single rule: further left on the number line always means smaller (colder)." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Draw a number line", hint: "Mark 0, -1, and -5 on a number line." },
      { level: 2, description: "Compare positions", hint: "Which point is further to the left?" },
      { level: 3, description: "Connect to temperature", hint: "Further left means colder. Which is colder?" }
    ],
    forwardRiskLinks: [
      { targetSkillId: "INT-01", probability: 0.4, condition: "If not remediated before integer operations in Grade 6" }
    ],
    learningObjectives: []
  },
  {
    itemId: "d6", order: 6, cluster: "CONV", clusterName: CLUSTER_NAMES.CONV, tier: "S",
    skillId: "CONV-01",
    question: "Write 2,50,000 (Indian) in the International system.",
    options: [
        { text: "250,000", correct: true, feedback: "2.5 lakh = 250,000." },
        { text: "2,500,000", correct: false, feedback: "That would be 25 lakh.", misconceptionId: "E-d6-a" },
        { text: "25,000", correct: false, feedback: "You lost a zero.", misconceptionId: "E-d6-b" },
        { text: "2,05,000", correct: false, feedback: "Incorrect grouping.", misconceptionId: "E-d6-c" }
      ],
    backward: "1 lakh = 100,000.",
    forward: "Converting between systems is needed for reading global data.",
    misconceptions: [
      { misconceptionId: "E-d6-a", description: "Student writes 2,500,000, a full order of magnitude too high.", rootCause: "Digit Insertion — miscounts while regrouping and inserts an extra digit, inflating the value tenfold.", remediation: "Strip all commas first to get the raw digit string (250000) and count its length before inserting new commas." },
      { misconceptionId: "E-d6-b", description: "Student writes 25,000, a full order of magnitude too low.", rootCause: "Digit Loss — drops a digit while regrouping, deflating the value tenfold.", remediation: "Count total digits before converting (250000 has 6 digits) and verify the International-grouped answer still has 6 digits." },
      { misconceptionId: "E-d6-c", description: "Student writes 2,05,000, with digits transposed.", rootCause: "Digit-Order Reversal — misreads the digit sequence while stripping commas, swapping the 5 and 0.", remediation: "Copy the raw digit string carefully one digit at a time from left to right before inserting any new commas." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Strip the commas", hint: "Remove the commas from 2,50,000 to get 250000." },
      { level: 2, description: "Regroup in 3s", hint: "Mark off groups of three from the right: 250 | 000." },
      { level: 3, description: "Re-insert commas", hint: "Join with International-style commas: 250,000." }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d7", order: 7, cluster: "PLACE", clusterName: CLUSTER_NAMES.PLACE, tier: "C",
    skillId: "PV-04",
    question: "How many thousands are there in 45,00,000?",
    options: [
        { text: "4,500", correct: true, feedback: "45,00,000 ÷ 1,000 = 4,500." },
        { text: "450", correct: false, feedback: "You divided by 10,000.", misconceptionId: "E-d7-a" },
        { text: "45,000", correct: false, feedback: "You multiplied by 10.", misconceptionId: "E-d7-b" },
        { text: "45", correct: false, feedback: "You divided by 100,000.", misconceptionId: "E-d7-c" }
      ],
    backward: "Divide by 1,000 to find how many thousands.",
    forward: "This skill helps when converting between large units.",
    misconceptions: [
      { misconceptionId: "E-d7-a", description: "Student answers 450, one order of magnitude too small.", rootCause: "Divisor Slip — divides by 10,000 instead of 1,000, removing one extra zero from the count.", remediation: "Write the division as 45,00,000 ÷ 1,000 explicitly and cancel exactly three zeros (matching the three zeros in 1,000)." },
      { misconceptionId: "E-d7-b", description: "Student answers 45,000, multiplying instead of dividing.", rootCause: "Operation Inversion — multiplies by 10 instead of dividing by 1,000, moving in the opposite direction from what \"how many thousands are in\" requires.", remediation: "Restate the question as a division before touching any digits: \"how many thousands fit into 45,00,000\" means 45,00,000 ÷ 1,000." },
      { misconceptionId: "E-d7-c", description: "Student answers 45, two orders of magnitude too small.", rootCause: "Divisor Slip (compounded) — divides by 100,000 instead of 1,000, removing two extra zeros from the count.", remediation: "Count the zeros in the divisor (1,000 has three zeros) and cancel exactly that many zeros from the dividend, no more." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the operation", hint: "\"How many thousands are in a number\" means divide by 1,000." },
      { level: 2, description: "Cancel the zeros", hint: "1,000 has three zeros. Cancel three zeros from 45,00,000." },
      { level: 3, description: "Read the result", hint: "What is left after cancelling three zeros from 45,00,000?" }
    ],
    forwardRiskLinks: [
      { targetSkillId: "PV-03", probability: 0.4, condition: "If not remediated before expanded-form work" }
    ],
    learningObjectives: ["CCSS.MATH.4.NBT.A.1"]
  },
  {
    itemId: "d8", order: 8, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP, tier: "C",
    skillId: "PV-05",
    question: "Find the largest 5-digit number with all digits different and a digit sum of 15.",
    options: [
        { text: "93,210", correct: true, feedback: "Digits 9,3,2,1,0 sum to 15, all different, and it's the largest possible." },
        { text: "95,310", correct: false, feedback: "Sum = 18, not 15.", misconceptionId: "E-d8-a" },
        { text: "94,320", correct: false, feedback: "Sum = 18.", misconceptionId: "E-d8-b" },
        { text: "98,610", correct: false, feedback: "Sum = 24.", misconceptionId: "E-d8-c" }
      ],
    backward: "Place the largest possible digit in the highest place, then adjust to meet the sum.",
    forward: "Digit constraints are common in logic and Olympiad problems.",
    misconceptions: [
      { misconceptionId: "E-d8-a", description: "Student picks 95,310, maximizing digits without checking the digit-sum condition.", rootCause: "Condition Neglect — arranges large, distinct digits to maximize the number's size without checking whether the digit sum actually equals 15.", remediation: "Compute the digit sum of any candidate explicitly before accepting it — maximizing digit size and satisfying a digit-sum target are two separate checks." },
      { misconceptionId: "E-d8-b", description: "Student picks 94,320, another arrangement that fails the digit-sum condition.", rootCause: "Condition Neglect — similarly prioritizes making the number large without verifying the digit sum equals exactly 15.", remediation: "Work backward from the sum constraint first: choose a leading digit, then figure out what the remaining digits must sum to, before maximizing their arrangement." },
      { misconceptionId: "E-d8-c", description: "Student picks 98,610, an even larger number that also fails the digit-sum condition.", rootCause: "Single-Condition Focus — optimizes purely for size (using the largest possible leading digits) while ignoring the digit-sum constraint entirely.", remediation: "Treat the digit-sum condition as a hard constraint to satisfy first, and only maximize size among the numbers that already satisfy it." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Fix the leading digit", hint: "To maximize the number, try the largest possible leading digit: 9." },
      { level: 2, description: "Find digits that sum correctly", hint: "The remaining four digits must sum to 15-9=6, all distinct and different from 9." },
      { level: 3, description: "Maximize the rest", hint: "Among distinct digits summing to 6, arrange them in the largest possible order." }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d9", order: 9, cluster: "ROUND", clusterName: CLUSTER_NAMES.ROUND, tier: "C",
    skillId: "ROUND-02",
    question: "A number, when rounded to the nearest 100, becomes 7,500. When rounded to the nearest 10, it also becomes 7,500. The number is greater than 7,500 and is odd. What is the number?",
    options: [
        { text: "7,501", correct: true, feedback: "7,501 rounds to 7,500 both ways, and is odd and >7,500." },
        { text: "7,495", correct: false, feedback: "7,495 works but is less than 7,500.", misconceptionId: "E-d9-a" },
        { text: "7,504", correct: false, feedback: "7,504 is even.", misconceptionId: "E-d9-b" },
        { text: "7,510", correct: false, feedback: "Rounds to 7,510 to the nearest 10.", misconceptionId: "E-d9-c" }
      ],
    backward: "Intersect the rounding ranges and apply extra conditions.",
    forward: "Overlapping conditions appear in tolerance analysis.",
    misconceptions: [
      { misconceptionId: "E-d9-a", description: "Student picks 7,495, satisfying the rounding conditions but not the \"greater than 7,500\" condition.", rootCause: "Condition Neglect — verifies both rounding conditions and stops checking, forgetting the problem also requires the number to be strictly greater than 7,500.", remediation: "List every condition stated in the problem, including inequality conditions, and verify a candidate against all of them before finalising." },
      { misconceptionId: "E-d9-b", description: "Student picks 7,504, satisfying the rounding and inequality conditions but not the odd condition.", rootCause: "Condition Neglect — checks the rounding conditions and the inequality but forgets the final \"and is odd\" condition, accepting an even candidate.", remediation: "Build a checklist of every stated condition and verify a candidate against the complete list, including parity." },
      { misconceptionId: "E-d9-c", description: "Student picks 7,510, which fails the nearest-10 rounding condition.", rootCause: "Interval-Boundary Oversight — assumes 7,510 rounds to 7,500 (nearest 10), without checking that its ones digit (0) means it is already at 7,510, not 7,500.", remediation: "Test each candidate directly against the nearest-10 rounding rule rather than assuming closeness is enough." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find both intervals", hint: "Nearest 100 = 7,500 gives one interval. Nearest 10 = 7,500 gives a narrower interval." },
      { level: 2, description: "Intersect and apply the inequality", hint: "Within the overlap, which numbers are greater than 7,500?" },
      { level: 3, description: "Apply the parity condition", hint: "Among those, which one is odd?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.4.NBT.A.3"]
  },
  {
    itemId: "d10", order: 10, cluster: "ROMAN", clusterName: CLUSTER_NAMES.ROMAN, tier: "C",
    skillId: "ROM-03",
    question: "Calculate XXV × III and write the answer in Roman numerals.",
    options: [
        { text: "LXXV", correct: true, feedback: "25 × 3 = 75 = LXXV." },
        { text: "L", correct: false, feedback: "50 is incorrect.", misconceptionId: "E-d10-a" },
        { text: "LXXX", correct: false, feedback: "80 is incorrect.", misconceptionId: "E-d10-b" },
        { text: "C", correct: false, feedback: "100 is incorrect.", misconceptionId: "E-d10-c" }
      ],
    backward: "Convert, multiply, convert back.",
    forward: "Arithmetic with Roman numerals tests mental flexibility.",
    misconceptions: [
      { misconceptionId: "E-d10-a", description: "Student answers L (50), significantly too low.", rootCause: "Multiplication Slip — miscomputes 25×3, likely as 25×2, dropping a full multiple.", remediation: "Perform the multiplication as repeated addition if needed: 25+25+25, checked step by step." },
      { misconceptionId: "E-d10-b", description: "Student answers LXXX (80), five too high.", rootCause: "Addition Slip — computes 25×3 with a small arithmetic error, landing 5 above the correct product.", remediation: "Verify the multiplication by checking: does 3 × 25 = 75? Recompute using the standard written algorithm." },
      { misconceptionId: "E-d10-c", description: "Student answers C (100), significantly too high.", rootCause: "Digit Miscount — misreads XXV during conversion, perhaps as a larger value (e.g. treating it as closer to 33), inflating the product.", remediation: "Convert XXV carefully first: XX (20) + V (5) = 25, confirmed before multiplying." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Convert to numbers", hint: "XXV = 25. III = 3." },
      { level: 2, description: "Multiply", hint: "25 × 3 = ?" },
      { level: 3, description: "Convert back", hint: "Write your product as a Roman numeral." }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d11", order: 11, cluster: "NEG", clusterName: CLUSTER_NAMES.NEG, tier: "C",
    skillId: "NEG-02",
    question: "The temperature at midnight was -6°C. It fell by 8°C, then rose by 11°C. What was the final temperature?",
    options: [
        { text: "-3°C", correct: true, feedback: "-6 - 8 = -14; -14 + 11 = -3." },
        { text: "3°C", correct: false, feedback: "You missed the negative sign.", misconceptionId: "E-d11-a" },
        { text: "-9°C", correct: false, feedback: "Incorrect calculation.", misconceptionId: "E-d11-b" },
        { text: "-13°C", correct: false, feedback: "You might have done -6 - 8 + 11 incorrectly.", misconceptionId: "E-d11-c" }
      ],
    backward: "A fall means subtraction, a rise means addition.",
    forward: "These calculations model real weather changes.",
    misconceptions: [
      { misconceptionId: "E-d11-a", description: "Student answers 3°C, dropping the negative sign.", rootCause: "Sign-Dropping — computes the correct magnitude through the chain but drops the negative sign in the final answer, treating the result as though it started from positive territory.", remediation: "Track the running total's sign explicitly after every step: -6, then -6-8=-14, then -14+11=-3 — the sign never gets dropped mid-calculation." },
      { misconceptionId: "E-d11-b", description: "Student answers -9°C, a miscalculation partway through the chain.", rootCause: "Arithmetic Slip — makes an error in one of the intermediate steps, likely mis-adding 11 to -14.", remediation: "Write the running total explicitly after every single move, checking each addition or subtraction individually." },
      { misconceptionId: "E-d11-c", description: "Student answers -13°C, mishandling one of the direction signs.", rootCause: "Direction Confusion — treats the \"rose by 11\" as though it continued the falling direction, subtracting instead of adding.", remediation: "State the rule and reuse it at every step: fell = subtract, rose = add — apply it move by move, writing the sign explicitly." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Mark the start", hint: "Mark -6 on a number line." },
      { level: 2, description: "Apply the fall", hint: "Fell 8 means subtract 8. Where do you land?" },
      { level: 3, description: "Apply the rise", hint: "Rose 11 means add 11 to your last position. Where do you land now?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d12", order: 12, cluster: "CONV", clusterName: CLUSTER_NAMES.CONV, tier: "C",
    skillId: "CONV-01",
    question: "Express 56,00,000 (Indian) as a number of millions (International).",
    options: [
        { text: "5.6 million", correct: true, feedback: "56 lakh = 5.6 million." },
        { text: "56 million", correct: false, feedback: "10 lakh = 1 million.", misconceptionId: "E-d12-a" },
        { text: "0.56 million", correct: false, feedback: "Incorrect division.", misconceptionId: "E-d12-b" },
        { text: "560 million", correct: false, feedback: "Incorrect multiplication.", misconceptionId: "E-d12-c" }
      ],
    backward: "1 million = 10 lakh.",
    forward: "Large numbers are often expressed in millions internationally.",
    misconceptions: [
      { misconceptionId: "E-d12-a", description: "Student answers 56 million, a full order of magnitude too high.", rootCause: "Magnitude Inflation — treats lakh and million as equivalent units, writing 56 lakh as though it were 56 million.", remediation: "Anchor to the exact ratio: 1 million = 10 lakh, so 56 lakh = 56 ÷ 10 = 5.6 million." },
      { misconceptionId: "E-d12-b", description: "Student answers 0.56 million, a full order of magnitude too low.", rootCause: "Divisor Slip — divides by 100 instead of 10, understating the value by a factor of 10.", remediation: "Recall the exact ratio (1 million = 10 lakh) and divide by exactly 10, not 100." },
      { misconceptionId: "E-d12-c", description: "Student answers 560 million, multiplying instead of dividing.", rootCause: "Operation Inversion — multiplies by 10 instead of dividing, moving in the opposite direction from what converting lakh to million requires.", remediation: "Restate the direction before calculating: converting from a smaller unit (lakh) to a larger one (million) always requires dividing, not multiplying." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the benchmark", hint: "1 million = 10 lakh." },
      { level: 2, description: "Divide", hint: "56 lakh ÷ 10 = ? million." },
      { level: 3, description: "Check the direction", hint: "Converting a smaller unit to a larger one should give a smaller number — does your answer make sense?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d13", order: 13, cluster: "PLACE", clusterName: CLUSTER_NAMES.PLACE, tier: "T",
    skillId: "PV-02",
    question: "In the number 7,05,612 (Indian system), what is the value of the digit 0?",
    options: [
        { text: "0", correct: true, feedback: "The 0 is in the ten-thousands place, so its value is 0 × 10,000 = 0." },
        { text: "10,000", correct: false, feedback: "That's the place value, but the digit is 0.", misconceptionId: "E-d13-a" },
        { text: "0 thousands", correct: false, feedback: "The 0 is in the ten-thousands place, not thousands.", misconceptionId: "E-d13-b" },
        { text: "50,000", correct: false, feedback: "That would be the value if the digit were 5.", misconceptionId: "E-d13-c" }
      ],
    backward: "Value = digit × place value.",
    forward: "Confusing place value with digit value is a common error.",
    misconceptions: [
      { misconceptionId: "E-d13-a", description: "Student answers 10,000, confusing the column's place value with the digit's actual value.", rootCause: "Place-Value/Digit-Value Confusion — reports the value that the ten-thousands column represents (10,000) rather than multiplying it by the actual digit sitting there (0), giving 0 × 10,000 = 0.", remediation: "Always state the value calculation explicitly as digit × column-value, never the column-value alone — here, 0 × 10,000 = 0." },
      { misconceptionId: "E-d13-b", description: "Student answers '0 thousands', naming the wrong column.", rootCause: "Adjacent-Column Slip — correctly identifies the digit as 0 but misnames its column as thousands instead of ten-thousands.", remediation: "Chart the number into a labelled place-value chart and confirm which specific column the digit 0 occupies before naming it." },
      { misconceptionId: "E-d13-c", description: "Student answers 50,000, substituting a different digit's value.", rootCause: "Digit Substitution — confuses the target digit (0) with a nearby digit (5, from the lakhs place), reporting that digit's value instead.", remediation: "Underline the specific digit named in the question (the 0) before doing any calculation, to avoid substituting a different nearby digit." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Locate the digit", hint: "Find the 0 in 7,05,612 and identify its column." },
      { level: 2, description: "State the column value", hint: "That column is ten-thousands, worth 10,000 per unit." },
      { level: 3, description: "Multiply digit by column", hint: "Value = digit × column value = 0 × 10,000 = ?" }
    ],
    forwardRiskLinks: [
      { targetSkillId: "PV-03", probability: 0.4, condition: "If not remediated before expanded-form work with embedded zeros" }
    ],
    learningObjectives: ["CCSS.MATH.4.NBT.A.1"]
  },
  {
    itemId: "d14", order: 14, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP, tier: "H",
    skillId: "COMB-01",
    question: "How many 5-digit numbers between 20,000 and 30,000 have an odd thousands digit and a tens digit that is a multiple of 3?",
    options: [
        { text: "2,000", correct: true, feedback: "Ten-thousands fixed 2. Thousands: 5 odd choices. Hundreds: 10. Tens: 4 multiples of 3. Units: 10. 5×10×4×10 = 2,000." },
        { text: "1,500", correct: false, feedback: "You undercounted.", misconceptionId: "E-d14-a" },
        { text: "1,000", correct: false, feedback: "Only counted some choices.", misconceptionId: "E-d14-b" },
        { text: "2,500", correct: false, feedback: "Overcounted.", misconceptionId: "E-d14-c" }
      ],
    backward: "Use the counting principle: multiply the number of choices for each place.",
    forward: "Combinatorial reasoning is fundamental in probability.",
    misconceptions: [
      { misconceptionId: "E-d14-a", description: "Student answers 1,500, undercounting one of the free digit choices.", rootCause: "Choice-Count Error — miscounts the number of valid options for one of the columns (e.g. treats hundreds or units as having fewer than 10 choices), reducing the final product below the true total.", remediation: "List the exact number of valid choices for each column separately before multiplying: ten-thousands (1 fixed), thousands (5 odd digits), hundreds (10), tens (4 multiples of 3), units (10)." },
      { misconceptionId: "E-d14-b", description: "Student answers 1,000, counting only some of the free columns.", rootCause: "Column Omission — forgets to include one of the unconstrained columns (hundreds or units) in the multiplication, treating it as though it had only 1 choice instead of 10.", remediation: "Write out all five columns explicitly with their choice counts before multiplying, so no column is silently skipped." },
      { misconceptionId: "E-d14-c", description: "Student answers 2,500, overcounting one of the constrained columns.", rootCause: "Choice-Count Error — overstates the number of valid options for the thousands or tens column (e.g. treating all 10 digits as odd, or all 10 as multiples of 3), inflating the final product.", remediation: "Explicitly list the valid digits for each constrained column — odd digits are {1,3,5,7,9} (5 choices), multiples of 3 among 0-9 are {0,3,6,9} (4 choices) — before multiplying." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "List each column's choices", hint: "Ten-thousands is fixed at 2. List the valid choices for thousands, hundreds, tens, and units separately." },
      { level: 2, description: "Count each list", hint: "How many odd digits are there (for thousands)? How many multiples of 3 among 0-9 (for tens)? How many total digits (for hundreds and units)?" },
      { level: 3, description: "Multiply the counts", hint: "Multiply all five counts together (including the 1 choice for ten-thousands)." }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d15", order: 15, cluster: "ROUND", clusterName: CLUSTER_NAMES.ROUND, tier: "H",
    skillId: "ROUND-02",
    question: "A number rounds to 6,400 to the nearest 100, and to 6,000 to the nearest 1,000. Its hundreds digit is 3 and it is a multiple of 7. Find the number.",
    options: [
        { text: "6,356", correct: true, feedback: "Range for 100: 6,350-6,449; for 1,000: 5,500-6,499. Overlap 6,350-6,449. Hundreds=3 → 6,3xx. Multiple of 7: 6,356 (7×908)." },
        { text: "6,349", correct: false, feedback: "Too low; not in overlap (rounds to 6,300).", misconceptionId: "E-d15-a" },
        { text: "6,447", correct: false, feedback: "Not a multiple of 7.", misconceptionId: "E-d15-b" },
        { text: "6,405", correct: false, feedback: "Hundreds digit is 4, not 3.", misconceptionId: "E-d15-c" }
      ],
    backward: "Intersect the two rounding ranges, apply the digit constraint, then test divisibility.",
    forward: "This type of problem appears in number theory contests.",
    misconceptions: [
      { misconceptionId: "E-d15-a", description: "Student picks 6,349, just outside the true interval.", rootCause: "Interval-Boundary Oversight — assumes 6,349 rounds to 6,400 (nearest 100) without checking that its tens digit (4) actually rounds it down to 6,300.", remediation: "Test each candidate directly against the nearest-100 rounding rule (check the tens digit) rather than judging by approximate closeness." },
      { misconceptionId: "E-d15-b", description: "Student picks 6,447, satisfying the rounding and hundreds-digit conditions but not the multiple-of-7 condition.", rootCause: "Condition Neglect — verifies the rounding conditions and the hundreds-digit condition but forgets to check divisibility by 7.", remediation: "Actually divide each remaining candidate by 7 and check for a remainder of zero, rather than assuming a plausible-looking number qualifies." },
      { misconceptionId: "E-d15-c", description: "Student picks 6,405, which fails the hundreds-digit condition.", rootCause: "Digit-Position Neglect — accepts a candidate whose hundreds digit is actually 4, not the required 3, perhaps confusing the hundreds digit with a nearby digit.", remediation: "Underline the hundreds digit specifically for each candidate and compare it directly to the stated requirement (3) before checking anything else." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find both intervals and intersect", hint: "Nearest 100 = 6,400 gives [6,350, 6,449]. Nearest 1,000 = 6,000 gives [5,500, 6,499]. Intersect them." },
      { level: 2, description: "Apply the digit constraint", hint: "Within the overlap, which numbers have hundreds digit exactly 3?" },
      { level: 3, description: "Test divisibility by 7", hint: "Among those, which one divides evenly by 7?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.4.NBT.A.3"]
  },
  {
    itemId: "d16", order: 16, cluster: "ROMAN", clusterName: CLUSTER_NAMES.ROMAN, tier: "T",
    skillId: "ROM-02",
    question: "Which of the following Roman numerals correctly represents 99?",
    options: [
        { text: "XCIX", correct: true, feedback: "XC = 90, IX = 9 → 99." },
        { text: "IC", correct: false, feedback: "You cannot subtract I directly from C; use XC instead.", misconceptionId: "E-d16-a" },
        { text: "VC", correct: false, feedback: "VC is not a valid Roman numeral.", misconceptionId: "E-d16-b" },
        { text: "XCIX is 89", correct: false, feedback: "XCIX is 99, not 89.", misconceptionId: "E-d16-c" }
      ],
    backward: "Only I, X, C, M can be used as subtractors, and only from the next two higher values.",
    forward: "Recognising invalid Roman numerals avoids common mistakes.",
    misconceptions: [
      { misconceptionId: "E-d16-a", description: "Student picks IC, subtracting I directly from C.", rootCause: "Double-Subtraction Error — tries to subtract I directly from C, not knowing that I can only be subtracted from V or X, never from C.", remediation: "Teach the fixed subtractive pairs as a memorised list: IV=4, IX=9, XL=40, XC=90, CD=400, CM=900 — nothing else is ever built by subtraction." },
      { misconceptionId: "E-d16-b", description: "Student picks VC, an invalid numeral form.", rootCause: "Invalid-Subtractor Use — tries to subtract V from C, not knowing V, L, and D are never used as subtractors under any circumstance.", remediation: "State the rule explicitly: only I, X, C, and M may ever appear as the smaller symbol in a subtractive pair — V, L, and D never do." },
      { misconceptionId: "E-d16-c", description: "Student picks 'XCIX is 89', misremembering the value of the correct numeral itself.", rootCause: "Value Misattribution — doubts or misremembers the actual value of the correct numeral XCIX, attaching it to a nearby but incorrect value (89) instead of recomputing it directly.", remediation: "Recompute XCIX directly every time rather than relying on memory: XC (90) + IX (9) = 99, verified by addition." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Break into tens and ones", hint: "99 = 90 + 9." },
      { level: 2, description: "Convert each part", hint: "90 = XC (subtractive pair). 9 = IX (subtractive pair)." },
      { level: 3, description: "Join and verify", hint: "XC + IX = XCIX. Recompute: 90 + 9 = 99." }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d17", order: 17, cluster: "NEG", clusterName: CLUSTER_NAMES.NEG, tier: "H",
    skillId: "NEG-02",
    question: "A diver starts at -45 m. He ascends 18 m, then descends 29 m. What is the total change in his depth from the start? (Negative means deeper.)",
    options: [
        { text: "-11 m", correct: true, feedback: "Final depth = -45+18-29 = -56 m. Change = -56 - (-45) = -11 m." },
        { text: "11 m shallower", correct: false, feedback: "The change is negative, meaning deeper.", misconceptionId: "E-d17-a" },
        { text: "-56 m", correct: false, feedback: "That's the final depth, not the change.", misconceptionId: "E-d17-b" },
        { text: "+11 m", correct: false, feedback: "You subtracted in the wrong order — that flips the sign.", misconceptionId: "E-d17-c" }
      ],
    backward: "Change = final value - initial value.",
    forward: "Calculating change correctly is essential in physics and finance.",
    misconceptions: [
      { misconceptionId: "E-d17-a", description: "Student answers '11 m shallower', getting the magnitude right but the direction backward.", rootCause: "Direction Confusion — correctly computes the size of the change (11) but reports it in the opposite direction, saying \"shallower\" when the negative change actually means the diver ended up deeper.", remediation: "After computing final - initial, check the sign explicitly: a negative result always means \"deeper\" in this depth convention, never \"shallower\"." },
      { misconceptionId: "E-d17-b", description: "Student answers -56 m, the final depth rather than the change.", rootCause: "Final-vs-Change Confusion — correctly computes the final depth (-56 m) but reports it directly as the answer, without subtracting the starting depth to find the actual change.", remediation: "Distinguish the two quantities explicitly: final depth is one number, change in depth is final minus initial — always compute both separately." },
      { misconceptionId: "E-d17-c", description: "Student answers +11 m, the correct magnitude with the sign flipped.", rootCause: "Reversed Subtraction Order — computes initial minus final (-45 - (-56) = 11) instead of final minus initial, which flips the sign of the result.", remediation: "Fix the order as a memorised phrase: change = final minus initial, always in that order. Write both signed values down before subtracting so the order can't be reversed by accident." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the final depth", hint: "Start at -45. Ascend 18 (add), then descend 29 (subtract). Where do you end up?" },
      { level: 2, description: "Subtract to find the change", hint: "Change = final depth - starting depth = ?" },
      { level: 3, description: "Interpret the sign", hint: "Is your change positive or negative? What does that mean for depth?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d18", order: 18, cluster: "CONV", clusterName: CLUSTER_NAMES.CONV, tier: "H",
    skillId: "CONV-03",
    question: "Which number is the largest? A: 2,345,678 (Intl); B: 23,45,678 (Indian); C: 2,465,789 (Intl); D: 24,75,689 (Indian).",
    options: [
        { text: "D", correct: true, feedback: "24,75,689 Indian = 2,475,689, larger than C (2,465,789), A (2,345,678), and B (2,345,678)." },
        { text: "A", correct: false, feedback: "A = 2,345,678.", misconceptionId: "E-d18-a" },
        { text: "B", correct: false, feedback: "B = 2,345,678.", misconceptionId: "E-d18-b" },
        { text: "C", correct: false, feedback: "C = 2,465,789, which is less than D.", misconceptionId: "E-d18-c" }
      ],
    backward: "Convert all to a common system before comparing.",
    forward: "Global data comparisons often require this skill.",
    misconceptions: [
      { misconceptionId: "E-d18-a", description: "Student picks A, without converting D to a common system first.", rootCause: "Cross-System Comparison Error — compares A's digit string directly against D's Indian-grouped digit string without converting D to the same International format first.", remediation: "Convert every number to a single common system (International) before making any comparison, writing all four values in that one format side by side." },
      { misconceptionId: "E-d18-b", description: "Student picks B, treating it as different from A.", rootCause: "Notation-Value Confusion — assumes numbers written in different systems with visually different comma placement must have different values, missing that B is simply A regrouped.", remediation: "Convert B to International notation explicitly and confirm it becomes identical to A, digit for digit." },
      { misconceptionId: "E-d18-c", description: "Student picks C, missing that D converts to a larger value.", rootCause: "Trailing-Digit Neglect — converts D correctly but stops comparing digit by digit before reaching the columns where D actually exceeds C (7 vs 6 in the hundred-thousands, ten-thousands region).", remediation: "After converting all values to the same system, compare column by column all the way through — do not stop once the numbers look similar." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Convert to one system", hint: "Rewrite B and D in the International system to match A and C." },
      { level: 2, description: "Align and compare", hint: "Stack all four converted values and compare digit by digit from the left." },
      { level: 3, description: "Find the largest", hint: "Which number has the largest digit at the first column where they differ?" }
    ],
    forwardRiskLinks: [
      { targetSkillId: "CONV-01", probability: 0.3, condition: "If not remediated before direct-format Indian–International conversions" }
    ],
    learningObjectives: []
  },
  {
    itemId: "d19", order: 19, cluster: "PLACE", clusterName: CLUSTER_NAMES.PLACE, tier: "H",
    skillId: "PV-05",
    question: "Use digits 2, 4, 5, 7, 8, 0, 3 (once each) to form the smallest 7-digit International number where the hundred-thousands digit is even. What is the number?",
    options: [
        { text: "2,034,578", correct: true, feedback: "Smallest lead non-zero 2, then even hundred-thousands: 0, then remaining digits ascending 3,4,5,7,8." },
        { text: "2,034,758", correct: false, feedback: "Not the smallest order after 0.", misconceptionId: "E-d19-a" },
        { text: "2,403,578", correct: false, feedback: "Hundred-thousands 4 is even (valid), but 0 is smaller and also even, so it should be used instead.", misconceptionId: "E-d19-b" },
        { text: "2,305,478", correct: false, feedback: "Hundred-thousands 3 is odd.", misconceptionId: "E-d19-c" }
      ],
    backward: "Place the smallest possible digit in each position while satisfying constraints.",
    forward: "Constrained optimization is a common advanced problem-solving skill.",
    misconceptions: [
      { misconceptionId: "E-d19-a", description: "Student picks 2,034,758, with the trailing digits not fully sorted.", rootCause: "Partial Optimization — correctly fixes the leading digit and the even hundred-thousands digit but does not sort all remaining free digits into ascending order.", remediation: "After placing all constrained digits, sort every remaining free digit into ascending order before writing the rest of the number." },
      { misconceptionId: "E-d19-b", description: "Student picks 2,403,578, placing a larger valid digit (4) in the hundred-thousands column instead of the smaller valid one.", rootCause: "Suboptimal Constraint Satisfaction — chooses 4 for the hundred-thousands digit (satisfying \"even\") without checking whether a smaller even digit (0) is also available and valid there.", remediation: "When a constraint allows multiple valid digits (any even digit), always test the smallest available one first before settling for a larger one." },
      { misconceptionId: "E-d19-c", description: "Student picks 2,305,478, where the hundred-thousands digit is not actually even.", rootCause: "Relationship Misapplication — places 3 in the hundred-thousands position without checking it against the stated \"even\" requirement, confusing an available small digit with a digit that actually satisfies the constraint.", remediation: "Check every digit placed in a constrained position against the exact rule stated (even, in this case: 0, 2, 4, 6, 8) before finalising it there." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Fix the leading digit", hint: "The smallest non-zero digit is 2 — place it first." },
      { level: 2, description: "Apply the constraint", hint: "The hundred-thousands digit must be even. Which is the smallest even digit available?" },
      { level: 3, description: "Minimize the rest", hint: "Sort the remaining digits in ascending order after the constrained ones." }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d20", order: 20, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP, tier: "T",
    skillId: "COMP-06",
    question: "Arrange in ascending order: -2, 5, -7, 0, XL (Roman).",
    options: [
        { text: "-7, -2, 0, 5, XL", correct: true, feedback: "XL = 40, so -7 < -2 < 0 < 5 < 40." },
        { text: "-2, -7, 0, 5, XL", correct: false, feedback: "-7 is smaller than -2.", misconceptionId: "E-d20-a" },
        { text: "0, -2, -7, 5, XL", correct: false, feedback: "Negative numbers come before 0.", misconceptionId: "E-d20-b" },
        { text: "XL, 5, 0, -2, -7", correct: false, feedback: "That's descending.", misconceptionId: "E-d20-c" }
      ],
    backward: "Convert all numbers to Hindu-Arabic before ordering.",
    forward: "Mixing representations is a common trap in contests.",
    misconceptions: [
      { misconceptionId: "E-d20-a", description: "Student swaps -2 and -7, listing -2 as smaller.", rootCause: "Zero-Proximity Reversal — mistakenly treats the value closer to zero (-2) as smaller and the value farther from zero (-7) as larger, reversing the actual rule that further from zero on the negative side means smaller.", remediation: "Plot all values on a number line and read them off left to right — the leftmost point is always smallest, regardless of which digit looks bigger." },
      { misconceptionId: "E-d20-b", description: "Student places 0 before the negative numbers.", rootCause: "Sequential Placement Error — does not recognise that both -2 and -7 are less than 0, placing 0 as if it were the smallest value in the group.", remediation: "Mark 0 explicitly on the number line and confirm that any negative number sits to its left, meaning smaller." },
      { misconceptionId: "E-d20-c", description: "Student writes the values largest to smallest.", rootCause: "Direction Reversal — correctly converts and ranks all five values but writes them largest-to-smallest, confusing \"ascending\" with \"descending\".", remediation: "Anchor the vocabulary physically: ascending = climbing stairs upward = smallest first. Say the meaning aloud before ordering." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Convert everything", hint: "Convert XL to a Hindu-Arabic number before doing anything else." },
      { level: 2, description: "Plot on a number line", hint: "Mark all five values (-2, 5, -7, 0, 40) on a number line." },
      { level: 3, description: "Read left to right", hint: "Ascending order reads the number line from left (smallest) to right (largest)." }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  }
];

const recheckItems = [
  {
    itemId: "r1", order: 1, cluster: "PLACE", clusterName: CLUSTER_NAMES.PLACE,
    skillId: "PV-04",
    question: "How many ten-thousands are there in 98,00,000?",
    options: [
        { text: "980", correct: true, feedback: "98,00,000 ÷ 10,000 = 980." },
        { text: "98", correct: false, feedback: "You divided by 1,00,000.", misconceptionId: "E-r1-a" },
        { text: "9,800", correct: false, feedback: "You multiplied by 10.", misconceptionId: "E-r1-b" },
        { text: "9.8", correct: false, feedback: "Incorrect division.", misconceptionId: "E-r1-c" }
      ],
    misconceptions: [
      { misconceptionId: "E-r1-a", description: "Student answers 98, one order of magnitude too small.", rootCause: "Divisor Slip — divides by 1,00,000 instead of 10,000, removing one extra zero from the count.", remediation: "Write the division as 98,00,000 ÷ 10,000 explicitly and cancel exactly four zeros (matching the four zeros in 10,000)." },
      { misconceptionId: "E-r1-b", description: "Student answers 9,800, multiplying instead of dividing.", rootCause: "Operation Inversion — multiplies by 10 instead of dividing by 10,000.", remediation: "Restate the question as a division before touching any digits: \"how many ten-thousands fit into 98,00,000\" means 98,00,000 ÷ 10,000." },
      { misconceptionId: "E-r1-c", description: "Student answers 9.8, a decimal-error division.", rootCause: "Divisor Slip (compounded) — divides by too large a number (e.g. 1,00,00,000), producing a fractional result instead of a whole number.", remediation: "Count the zeros in the divisor (10,000 has four zeros) and cancel exactly that many zeros from the dividend, no more." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the operation", hint: "\"How many ten-thousands are in a number\" means divide by 10,000." },
      { level: 2, description: "Cancel the zeros", hint: "10,000 has four zeros. Cancel four zeros from 98,00,000." },
      { level: 3, description: "Read the result", hint: "What is left after cancelling four zeros from 98,00,000?" }
    ],
    forwardRiskLinks: [
      { targetSkillId: "PV-03", probability: 0.3, condition: "If not remediated before expanded-form work" }
    ],
    learningObjectives: ["CCSS.MATH.4.NBT.A.1"]
  },
  {
    itemId: "r2", order: 2, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    skillId: "PV-05",
    question: "Find the smallest 5-digit number with all digits different and a digit sum of 14.",
    options: [
        { text: "10,238", correct: true, feedback: "1+0+2+3+8 = 14, all digits distinct, smallest possible." },
        { text: "10,247", correct: false, feedback: "Sum 14 but larger than 10,238.", misconceptionId: "E-r2-a" },
        { text: "12,035", correct: false, feedback: "Sum = 11.", misconceptionId: "E-r2-b" },
        { text: "10,256", correct: false, feedback: "Sum 14 but larger than 10,238.", misconceptionId: "E-r2-c" }
      ],
    misconceptions: [
      { misconceptionId: "E-r2-a", description: "Student picks 10,247, satisfying the digit-sum condition but not fully minimized.", rootCause: "Partial Optimization — finds a valid digit-sum-14 combination but does not search further for a smaller arrangement of the last three digits.", remediation: "After fixing the smallest possible leading digits, systematically try the smallest remaining digits (in ascending order) until the digit-sum condition is met, rather than stopping at the first valid combination found." },
      { misconceptionId: "E-r2-b", description: "Student picks 12,035, where the digit sum does not equal 14.", rootCause: "Condition Neglect — arranges digits to look small without verifying the digit sum actually equals the required 14.", remediation: "Compute the digit sum of any candidate explicitly (1+2+0+3+5=11) before accepting it." },
      { misconceptionId: "E-r2-c", description: "Student picks 10,256, satisfying the digit-sum condition but not fully minimized.", rootCause: "Partial Optimization — finds another valid digit-sum-14 combination but does not compare it against smaller valid alternatives.", remediation: "Once a valid candidate is found, keep searching smaller leading digit combinations systematically before settling on an answer." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Fix the smallest leading digits", hint: "Try leading digits 1 and 0 (the two smallest, with 1 first since it cannot be 0)." },
      { level: 2, description: "Find digits that sum correctly", hint: "The remaining three digits must sum to 14-1-0=13, all distinct and different from 1 and 0." },
      { level: 3, description: "Minimize the rest", hint: "Among distinct digits summing to 13, arrange them in ascending order." }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "r3", order: 3, cluster: "ROUND", clusterName: CLUSTER_NAMES.ROUND,
    skillId: "ROUND-02",
    question: "A number rounds to 9,300 to the nearest 100, and to 9,340 to the nearest 10. It is also a multiple of 9. What is the number?",
    options: [
        { text: "9,342", correct: true, feedback: "Overlap range 9,335-9,344; 9,342 sum 18, so multiple of 9." },
        { text: "9,335", correct: false, feedback: "Not a multiple of 9 (sum 20).", misconceptionId: "E-r3-a" },
        { text: "9,351", correct: false, feedback: "Rounds to 9,400 for nearest 100.", misconceptionId: "E-r3-b" },
        { text: "9,338", correct: false, feedback: "Sum 23, not multiple of 9.", misconceptionId: "E-r3-c" }
      ],
    misconceptions: [
      { misconceptionId: "E-r3-a", description: "Student picks 9,335, the boundary of the interval but not a multiple of 9.", rootCause: "Boundary-Value Assumption — assumes the boundary of a valid interval is automatically the answer, without checking the remaining multiple-of-9 condition.", remediation: "Treat interval boundaries only as the search range, not as automatic answers — still test the additional condition on every candidate within that range." },
      { misconceptionId: "E-r3-b", description: "Student picks 9,351, which fails the nearest-100 condition.", rootCause: "Interval-Boundary Oversight — assumes 9,351 rounds to 9,300, missing that its tens digit (5) actually rounds it up to 9,400.", remediation: "Test each candidate directly against the nearest-100 rounding rule (check the tens digit) rather than judging by approximate closeness." },
      { misconceptionId: "E-r3-c", description: "Student picks 9,338, which falls in the interval but is not a multiple of 9.", rootCause: "Divisibility Mischeck — assumes 9,338 is a multiple of 9 without actually dividing, perhaps estimating from digit appearance.", remediation: "Actually divide each candidate by 9 (or sum its digits and check if that sum is a multiple of 9) rather than guessing from appearance." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find both intervals", hint: "Nearest 100 = 9,300 gives one interval. Nearest 10 = 9,340 gives a narrower interval." },
      { level: 2, description: "Intersect the intervals", hint: "Which numbers fall in both intervals at once?" },
      { level: 3, description: "Apply the multiple-of-9 condition", hint: "Within that overlap, which number's digits sum to a multiple of 9?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.4.NBT.A.3"]
  },
  {
    itemId: "r4", order: 4, cluster: "ROMAN", clusterName: CLUSTER_NAMES.ROMAN,
    skillId: "ROM-03",
    question: "Calculate LX ÷ IV and write the answer in Roman numerals.",
    options: [
        { text: "XV", correct: true, feedback: "60 ÷ 4 = 15 = XV." },
        { text: "XII", correct: false, feedback: "12 is incorrect.", misconceptionId: "E-r4-a" },
        { text: "XVI", correct: false, feedback: "16 is incorrect.", misconceptionId: "E-r4-b" },
        { text: "XX", correct: false, feedback: "20 is incorrect.", misconceptionId: "E-r4-c" }
      ],
    misconceptions: [
      { misconceptionId: "E-r4-a", description: "Student answers XII (12), three too low.", rootCause: "Division Slip — miscomputes 60÷4, likely as 60÷5, dropping the quotient below the correct value.", remediation: "Perform the division as a standard written algorithm: 60 ÷ 4 = 15, checked by multiplying back (4 × 15 = 60)." },
      { misconceptionId: "E-r4-b", description: "Student answers XVI (16), one too high.", rootCause: "Off-by-One Division Error — makes a small arithmetic slip in the division, landing one above the correct quotient.", remediation: "Verify the division by multiplying back: does 4 × 16 = 60? Recompute if not." },
      { misconceptionId: "E-r4-c", description: "Student answers XX (20), five too high.", rootCause: "Digit Miscount — misreads LX during conversion, perhaps as a larger value, inflating the calculation before dividing.", remediation: "Convert LX carefully first: L (50) + X (10) = 60, confirmed before dividing." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Convert to numbers", hint: "LX = 60. IV = 4." },
      { level: 2, description: "Divide", hint: "60 ÷ 4 = ?" },
      { level: 3, description: "Convert back", hint: "Write your quotient as a Roman numeral." }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "r5", order: 5, cluster: "NEG", clusterName: CLUSTER_NAMES.NEG,
    skillId: "NEG-02",
    question: "A lift starts at floor -3. It goes up 7 floors, down 5 floors, then up 2 floors. Final floor?",
    options: [
        { text: "1", correct: true, feedback: "-3 + 7 = 4; 4 - 5 = -1; -1 + 2 = 1." },
        { text: "-1", correct: false, feedback: "You stopped before the last move.", misconceptionId: "E-r5-a" },
        { text: "0", correct: false, feedback: "Incorrect calculation.", misconceptionId: "E-r5-b" },
        { text: "2", correct: false, feedback: "Incorrect.", misconceptionId: "E-r5-c" }
      ],
    misconceptions: [
      { misconceptionId: "E-r5-a", description: "Student answers -1, stopping one move early.", rootCause: "Incomplete Chain — correctly computes the running floor through the first two moves (-3+7-5=-1) but forgets to apply the final \"up 2\" move.", remediation: "Count the number of moves stated in the problem (three) before starting, and check off each one as it is applied." },
      { misconceptionId: "E-r5-b", description: "Student answers 0, a miscalculation partway through the chain.", rootCause: "Arithmetic Slip — makes an error in one of the intermediate steps, losing track of the correct running floor.", remediation: "Write the running floor explicitly after every single move, checking each addition or subtraction individually." },
      { misconceptionId: "E-r5-c", description: "Student answers 2, mishandling one of the direction signs.", rootCause: "Direction Confusion — treats one of the moves with the wrong sign, likely adding when a \"down\" move should subtract.", remediation: "State the rule and reuse it at every step: up = add, down = subtract — apply it move by move, writing the running floor after each one." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Mark the start", hint: "Mark floor -3 on a vertical number line." },
      { level: 2, description: "Apply each move in order", hint: "Up 7, down 5, up 2 — apply them one at a time." },
      { level: 3, description: "Confirm the final floor", hint: "What floor do you reach after all three moves?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "r6", order: 6, cluster: "CONV", clusterName: CLUSTER_NAMES.CONV,
    skillId: "CONV-01",
    question: "Express 4,500,000 (International) in the Indian system.",
    options: [
        { text: "45,00,000", correct: true, feedback: "4.5 million = 45 lakh = 45,00,000." },
        { text: "4,50,00,000", correct: false, feedback: "That would be 45 million.", misconceptionId: "E-r6-a" },
        { text: "450,000", correct: false, feedback: "That's 4.5 lakh.", misconceptionId: "E-r6-b" },
        { text: "4,50,000", correct: false, feedback: "Misplaced digits.", misconceptionId: "E-r6-c" }
      ],
    misconceptions: [
      { misconceptionId: "E-r6-a", description: "Student writes 4,50,00,000, a full order of magnitude too high.", rootCause: "Magnitude Inflation — regroups the digits into Indian commas but inserts an extra digit group, inflating 4.5 million to look like 45 million.", remediation: "Count total digits before and after conversion — 4,500,000 has 7 digits, so the Indian form must also have exactly 7 digits: 45,00,000." },
      { misconceptionId: "E-r6-b", description: "Student writes 450,000, a full order of magnitude too low.", rootCause: "Digit Loss — drops a digit while regrouping, deflating the value by a factor of 10.", remediation: "Strip all commas first to get the raw digit string (4500000) and count its length before inserting new commas." },
      { misconceptionId: "E-r6-c", description: "Student writes 4,50,000, understating the value by a factor of 10.", rootCause: "Grouping Truncation — keeps only part of the digit string when regrouping, effectively dropping the leading digit's place value.", remediation: "Anchor to the benchmark fact \"1 million = 10 lakh\" — since 4,500,000 is 4.5 million, the Indian answer must be 45 lakh." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Strip the commas", hint: "Remove the commas from 4,500,000 to get 4500000." },
      { level: 2, description: "Apply the benchmark", hint: "1 million = 10 lakh, so 4,500,000 = 45 lakh." },
      { level: 3, description: "Regroup with Indian commas", hint: "Write 45 lakh with Indian-style commas: 45,00,000." }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "r7", order: 7, cluster: "PLACE", clusterName: CLUSTER_NAMES.PLACE,
    skillId: "PV-02",
    question: "In 3,20,456 (Indian), what digit is in the ten-thousands place?",
    options: [
        { text: "2", correct: true, feedback: "The number is 3 lakh 20 thousand 456; the 2 is ten-thousands." },
        { text: "0", correct: false, feedback: "0 is in the thousands place.", misconceptionId: "E-r7-a" },
        { text: "3", correct: false, feedback: "3 is in the lakhs place.", misconceptionId: "E-r7-b" },
        { text: "4", correct: false, feedback: "4 is in the hundreds place.", misconceptionId: "E-r7-c" }
      ],
    misconceptions: [
      { misconceptionId: "E-r7-a", description: "Student answers 0, the thousands digit — one column to the right.", rootCause: "Adjacent-Column Slip — points to the digit immediately right of the actual ten-thousands digit.", remediation: "Have the student point to and say the name of each column as they move across the chart." },
      { misconceptionId: "E-r7-b", description: "Student answers 3, the leftmost digit.", rootCause: "Leftmost-Digit Default — answers with the first digit seen, regardless of which place was actually asked about.", remediation: "Require the student to restate the question in their own words before looking at the number." },
      { misconceptionId: "E-r7-c", description: "Student answers 4, the hundreds digit — two columns to the right.", rootCause: "Place Miscounting — loses count partway through the six-digit number and lands two columns short.", remediation: "Use a six-column chart and count out loud: lakhs, ten-thousands, thousands, hundreds — stop and check the digit before answering." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Say the number in words", hint: "3,20,456 is three lakh, twenty thousand, four hundred fifty-six." },
      { level: 2, description: "Find the digit's column", hint: "Which digit sits right after the lakhs digit, before the thousands digit?" },
      { level: 3, description: "Confirm on the chart", hint: "Write 3,20,456 into a place-value chart and check the ten-thousands column." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "PV-03", probability: 0.4, condition: "If not remediated before expanded-form work" }
    ],
    learningObjectives: ["CCSS.MATH.4.NBT.A.1"]
  },
  {
    itemId: "r8", order: 8, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    skillId: "COMP-02",
    question: "Which digit can go in the box: 2,4□,987 < 2,45,000 ?",
    options: [
        { text: "4", correct: true, feedback: "2,44,987 < 2,45,000." },
        { text: "5", correct: false, feedback: "2,45,987 > 2,45,000.", misconceptionId: "E-r8-a" },
        { text: "6", correct: false, feedback: "Any digit ≥5 makes it ≥ 2,45,000.", misconceptionId: "E-r8-b" },
        { text: "9", correct: false, feedback: "2,49,987 is much larger.", misconceptionId: "E-r8-c" }
      ],
    misconceptions: [
      { misconceptionId: "E-r8-a", description: "Student picks 5, assuming a tie at the thousands digit is enough.", rootCause: "Incomplete-Tie Resolution — stops after matching the thousands digit (5=5) without checking that the following digits (987 vs 000) actually decide the number is greater, not less.", remediation: "When a tested digit produces a tie at one column, always continue the scan to the next column before declaring success." },
      { misconceptionId: "E-r8-b", description: "Student picks 6, a digit greater than the target.", rootCause: "Direction Reversal — picks a digit larger than 4, producing a number that is greater than, not less than, the comparison number.", remediation: "State the rule explicitly: for the left side to stay smaller, the replaced digit must be less than 5 — test each candidate against that rule." },
      { misconceptionId: "E-r8-c", description: "Student picks 9, an even larger digit.", rootCause: "Direction Reversal (extreme) — picks the largest available digit, compounding the same reversed-direction error.", remediation: "Trace the inequality with a finger and restate the question as \"which digits keep the left side smaller?\" before testing candidates." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Compare the fixed part", hint: "Both numbers read 2,4_,987 vs 2,45,000 — only the □ digit and what follows differ." },
      { level: 2, description: "Test the boundary digit", hint: "What happens if □ = 5? Compare the remaining digits (987 vs 000)." },
      { level: 3, description: "Find the safe range", hint: "Since 987 > 000, □=5 doesn't work for '<'. Try a digit less than 5." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "COMP-01", probability: 0.3, condition: "If not remediated before multi-number ordering tasks" }
    ],
    learningObjectives: ["CCSS.MATH.4.NBT.A.2"]
  },
  {
    itemId: "r9", order: 9, cluster: "ROUND", clusterName: CLUSTER_NAMES.ROUND,
    skillId: "ROUND-01",
    question: "Round 1,56,789 to the nearest 10,000.",
    options: [
        { text: "1,60,000", correct: true, feedback: "Thousands digit 6 → round up." },
        { text: "1,50,000", correct: false, feedback: "Would need thousands <5.", misconceptionId: "E-r9-a" },
        { text: "1,57,000", correct: false, feedback: "That's to the nearest 1,000.", misconceptionId: "E-r9-b" },
        { text: "2,00,000", correct: false, feedback: "That's to the nearest lakh.", misconceptionId: "E-r9-c" }
      ],
    misconceptions: [
      { misconceptionId: "E-r9-a", description: "Student answers 1,50,000, rounding down without checking the decision digit.", rootCause: "Direction Default — rounds down without checking the thousands digit (6), which signals round up.", remediation: "Check the thousands digit every time before deciding direction: 6 ≥ 5 means round up." },
      { misconceptionId: "E-r9-b", description: "Student answers 1,57,000, one place value too fine.", rootCause: "Target-Place Slip — rounds to the nearest 1,000 instead of the nearest 10,000.", remediation: "Circle the ten-thousands digit before rounding to lock in the correct target place." },
      { misconceptionId: "E-r9-c", description: "Student answers 2,00,000, several place values too coarse.", rootCause: "Target-Place Slip (extreme) — rounds to the nearest lakh, far coarser than asked.", remediation: "Restate the target place explicitly before rounding — \"nearest 10,000\" means only the ten-thousands digit and beyond may change." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Circle the target place", hint: "Circle the ten-thousands digit in 1,56,789." },
      { level: 2, description: "Check the decision digit", hint: "The thousands digit is 6. Is it 5 or more?" },
      { level: 3, description: "Round and clear", hint: "Since the thousands digit is 6, round the ten-thousands digit up and zero out the rest." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "ROUND-02", probability: 0.3, condition: "If not remediated before rounding-range puzzle problems" }
    ],
    learningObjectives: ["CCSS.MATH.4.NBT.A.3"]
  },
  {
    itemId: "r10", order: 10, cluster: "ROMAN", clusterName: CLUSTER_NAMES.ROMAN,
    skillId: "ROM-01",
    question: "Write 76 in Roman numerals.",
    options: [
        { text: "LXXVI", correct: true, feedback: "50 + 20 + 6 = LXXVI." },
        { text: "LXXIV", correct: false, feedback: "74.", misconceptionId: "E-r10-a" },
        { text: "LXXXVI", correct: false, feedback: "86.", misconceptionId: "E-r10-b" },
        { text: "LXV", correct: false, feedback: "65.", misconceptionId: "E-r10-c" }
      ],
    misconceptions: [
      { misconceptionId: "E-r10-a", description: "Student writes LXXIV (74), two too low.", rootCause: "Segment Confusion — correctly forms LXX (70) but appends IV (4) instead of VI (6), reversing the additive/subtractive symbol order for the ones.", remediation: "Compare IV and VI side by side: the symbol written first decides addition or subtraction — 6 needs VI (additive), not IV (subtractive)." },
      { misconceptionId: "E-r10-b", description: "Student writes LXXXVI (86), ten too high.", rootCause: "Tens Digit Inflation — inserts an extra X, treating 76 as if it were 86.", remediation: "Break 76 into 70 + 6 first and convert each part separately (LXX, then VI) so no extra tens symbol can sneak in." },
      { misconceptionId: "E-r10-c", description: "Student writes LXV (65), eleven too low.", rootCause: "Ones-Symbol Undercount — miscounts the ones symbols, writing V (5) alone instead of VI (6), and also drops one X from the tens.", remediation: "Convert the tens and ones separately and recount each: 70 = LXX (two X's after L), 6 = VI (one more than V)." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Split into tens and ones", hint: "76 = 70 + 6. Convert each part separately." },
      { level: 2, description: "Convert the tens", hint: "70 = LXX (L plus two X's)." },
      { level: 3, description: "Convert the ones and join", hint: "6 = VI (additive: 5+1). Join: LXX + VI = ?" }
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
    title: "Number Sense & Place Value — Speed & Strategy",
    subtitle: "Telangana & Cambridge · Level 4 · Speed & Strategy",
    description: "A 25-minute timed diagnostic mixing Speed, Core, Challenge and Trap items across every place-value cluster.",
    clusterNames: CLUSTER_NAMES,
    gateReviewHTML: '',
    timedSeconds: 25 * 60
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

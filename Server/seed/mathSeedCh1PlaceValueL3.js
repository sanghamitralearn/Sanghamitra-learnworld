// seed/mathSeedCh1PlaceValueL3.js
//
// Populates math_chapters and math_questions with Grade 5, Chapter 1
// (Number Sense & Place Value), Level 3 — converted from the standalone
// HTML file ch-1-place-value-level-3.html.
//
// Run with: node seed/mathSeedCh1PlaceValueL3.js

const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-5";
const GRADE_LABEL = "Grade 5";
const CHAPTER_SLUG = "ch-1-place-value";
const CHAPTER_NAME = "Number Sense & Place Value";
const LEVEL = 3;

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
    skillId: "PV-03",
    question: "Write the number that has 4 lakhs, 8 ten-thousands, 2 thousands, 6 hundreds, 5 tens, and 3 ones.",
    options: [
        { text: "4,82,653", correct: true, feedback: "4,00,000 + 80,000 + 2,000 + 600 + 50 + 3 = 4,82,653." },
        { text: "4,82,563", correct: false, feedback: "You swapped the hundreds and tens.", misconceptionId: "E-w1-a" },
        { text: "4,80,263", correct: false, feedback: "The ten-thousands digit is 8, not 0.", misconceptionId: "E-w1-b" },
        { text: "4,28,653", correct: false, feedback: "You swapped lakhs and ten-thousands.", misconceptionId: "E-w1-c" }
      ],
    retryHint: "Align the digits: L, T-Th, Th, H, T, O.",
    misconceptions: [
      { misconceptionId: "E-w1-a", description: "Student writes 4,82,563, swapping the hundreds and tens digits.", rootCause: "Neighbor-Column Swap — writes the hundreds digit (6) and the tens digit (5) in reversed order, effectively demoting each to the other's column.", remediation: "Assign each clue to its named column in a chart first — hundreds gets 6, tens gets 5 — before writing the digits in sequence." },
      { misconceptionId: "E-w1-b", description: "Student writes 4,80,263, replacing the ten-thousands digit with 0.", rootCause: "Clue Omission — ignores the stated ten-thousands clue (8) and defaults that column to zero, perhaps confusing it with an unstated column.", remediation: "Check off each clue against its column as it is used, so no stated digit is accidentally treated as unstated." },
      { misconceptionId: "E-w1-c", description: "Student writes 4,28,653, swapping the lakhs and ten-thousands digits.", rootCause: "Period-Column Swap — writes the lakhs digit (4) and ten-thousands digit (8) in reversed order, confusing which of the two leading columns each clue belongs to.", remediation: "List the six columns in order (Lakhs, Ten-thousands, Thousands, Hundreds, Tens, Ones) before filling in any digit, so the leading two are never swapped." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "List every column", hint: "List all six columns: Lakhs, Ten-thousands, Thousands, Hundreds, Tens, Ones." },
      { level: 2, description: "Fill in each clue", hint: "Match each clue (4 lakhs, 8 ten-thousands, ...) to its column." },
      { level: 3, description: "Read the number", hint: "Read the six digits left to right and add Indian commas." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "PV-02", probability: 0.4, condition: "If not remediated before digit-identification tasks" }
    ],
    learningObjectives: ["CCSS.MATH.4.NBT.A.1", "CCSS.MATH.4.NBT.A.2"]
  },
  {
    itemId: "w2", order: 2, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    skillId: "COMP-01",
    question: "Which is the largest? 7,65,432; 7,56,432; 7,65,423; 7,56,423.",
    options: [
        { text: "7,65,432", correct: true, feedback: "Ten-thousands digit 6 > 5, and among those, 432 > 423." },
        { text: "7,56,432", correct: false, feedback: "5 in ten-thousands is smaller than 6.", misconceptionId: "E-w2-a" },
        { text: "7,65,423", correct: false, feedback: "432 is larger than 423.", misconceptionId: "E-w2-b" },
        { text: "7,56,423", correct: false, feedback: "This is the smallest.", misconceptionId: "E-w2-c" }
      ],
    retryHint: "Compare from the left, digit by digit.",
    misconceptions: [
      { misconceptionId: "E-w2-a", description: "Student picks 7,56,432 as largest.", rootCause: "Digit-Position Neglect — sees two numbers that share the same last three digits (432) and picks between them without first checking the ten-thousands column (6 vs 5), which actually decides the comparison.", remediation: "Force a strict left-to-right scan across all four numbers, eliminating any number that is not the largest at each column before considering later digits." },
      { misconceptionId: "E-w2-b", description: "Student picks 7,65,423 as largest.", rootCause: "Trailing-Digit Misread — correctly narrows to the numbers starting 7,65,… but misreads which of 432 and 423 is larger, comparing the wrong digit within the last three.", remediation: "Compare the last three digits column by column: tens digit 3 vs 2 already decides 432 > 423, no need to look at the ones digit." },
      { misconceptionId: "E-w2-c", description: "Student picks 7,56,423 as largest — actually the smallest.", rootCause: "Compound Error — combines the ten-thousands mix-up with the trailing-digit misread, selecting the number that is smallest on both counts.", remediation: "Eliminate numbers one comparison at a time: compare two fully, discard the smaller, then bring in the next number." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Align all four", hint: "Write all four numbers stacked with digits aligned by column." },
      { level: 2, description: "Scan the ten-thousands column", hint: "Compare the ten-thousands digit: 6 vs 5. Which numbers survive?" },
      { level: 3, description: "Break the remaining tie", hint: "Among the survivors, compare the tens digit of the last three: 3 vs 2." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.4.NBT.A.2"]
  },
  {
    itemId: "w3", order: 3, cluster: "ROUND", clusterName: CLUSTER_NAMES.ROUND,
    skillId: "ROUND-03",
    question: "Round 5,67,890 to the nearest 1,000, then add 200.",
    options: [
        { text: "5,68,200", correct: true, feedback: "5,67,890 → nearest 1,000: 5,68,000 (hundreds 8 ≥5). +200 = 5,68,200." },
        { text: "5,68,090", correct: false, feedback: "You added 200 before rounding or miscalculated.", misconceptionId: "E-w3-a" },
        { text: "5,67,200", correct: false, feedback: "You did not round up.", misconceptionId: "E-w3-b" },
        { text: "5,70,000", correct: false, feedback: "You rounded to the nearest 10,000.", misconceptionId: "E-w3-c" }
      ],
    retryHint: "First round, then add 200.",
    misconceptions: [
      { misconceptionId: "E-w3-a", description: "Student answers 5,68,090, blending the two steps incorrectly.", rootCause: "Operation-Order Error — adds 200 to the original number before rounding, or adds it to only part of the rounded value, instead of completing the rounding fully before the addition.", remediation: "Do the two steps as two entirely separate lines of working: first compute the rounded value in full, then add 200 to that finished result." },
      { misconceptionId: "E-w3-b", description: "Student answers 5,67,200, rounding down instead of up.", rootCause: "Direction Default — rounds down without checking the hundreds digit (8), which signals round up, then adds 200 to the wrong base.", remediation: "Check the hundreds digit before rounding: 8 ≥ 5 means round up to 5,68,000, then add 200." },
      { misconceptionId: "E-w3-c", description: "Student answers 5,70,000, rounding to the wrong place before adding.", rootCause: "Target-Place Slip — rounds to the nearest 10,000 instead of the nearest 1,000, then either forgets to add 200 or adds it in a way that leaves the total unaffected at this scale.", remediation: "Circle the thousands digit before rounding to lock in the correct target place, separate from the addition step that follows." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Round first", hint: "Round 5,67,890 to the nearest 1,000. Do not add anything yet." },
      { level: 2, description: "Check your rounded value", hint: "Confirm your rounded value uses the hundreds digit (8) correctly." },
      { level: 3, description: "Add 200 last", hint: "Add 200 to your finished rounded value." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "ROUND-01", probability: 0.3, condition: "If not remediated before straightforward single-number rounding tasks" }
    ],
    learningObjectives: ["CCSS.MATH.4.NBT.A.3"]
  },
  {
    itemId: "w4", order: 4, cluster: "ROMAN", clusterName: CLUSTER_NAMES.ROMAN,
    skillId: "ROM-03",
    question: "XXVII + XIV = ? (Write the answer in Roman numerals.)",
    options: [
        { text: "XLI", correct: true, feedback: "XXVII = 27, XIV = 14, sum = 41 = XLI." },
        { text: "XXXI", correct: false, feedback: "You might have miscalculated 27+14 as 31.", misconceptionId: "E-w4-a" },
        { text: "XL", correct: false, feedback: "40 is close but incorrect.", misconceptionId: "E-w4-b" },
        { text: "LXI", correct: false, feedback: "61 is far too high.", misconceptionId: "E-w4-c" }
      ],
    retryHint: "Convert each to a number, add, then convert back.",
    misconceptions: [
      { misconceptionId: "E-w4-a", description: "Student answers XXXI (31), ten too low.", rootCause: "Addition Slip — miscomputes 27+14, likely dropping a ten somewhere in the column addition (e.g. adding the ones correctly but missing a carry).", remediation: "Convert both numerals to Hindu-Arabic first (27 and 14), then add using the standard written algorithm with carries shown explicitly." },
      { misconceptionId: "E-w4-b", description: "Student answers XL (40), one short of the correct total.", rootCause: "Off-by-One Addition — computes the sum almost correctly but drops a single unit, likely from miscounting the ones digits (7+4=11) and carrying incorrectly.", remediation: "Add the ones digits first and write down the carry explicitly: 7+4=11, write 1 and carry 1 to the tens." },
      { misconceptionId: "E-w4-c", description: "Student answers LXI (61), twenty too high.", rootCause: "Digit Misread — misreads one of the source numerals during conversion, likely mistaking XIV (14) for a larger value, inflating the sum by 20.", remediation: "Convert each numeral segment by segment before adding: XIV = X(10) + IV(4) = 14, checked separately from XXVII = XX(20) + VII(7) = 27." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Convert both numerals", hint: "XXVII = 27. XIV = 14." },
      { level: 2, description: "Add carefully", hint: "27 + 14 = ? Add ones first, then tens, carrying as needed." },
      { level: 3, description: "Convert back", hint: "Write your numeric sum as a Roman numeral." }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "w5", order: 5, cluster: "NEG", clusterName: CLUSTER_NAMES.NEG,
    skillId: "NEG-02",
    question: "The temperature is -4°C. It rises by 9°C, then falls by 5°C. What is the final temperature?",
    options: [
        { text: "0°C", correct: true, feedback: "-4 + 9 = 5; 5 - 5 = 0." },
        { text: "8°C", correct: false, feedback: "You might have added 9+5-4 incorrectly.", misconceptionId: "E-w5-a" },
        { text: "-8°C", correct: false, feedback: "You subtracted both changes.", misconceptionId: "E-w5-b" },
        { text: "10°C", correct: false, feedback: "You ignored the negative start.", misconceptionId: "E-w5-c" }
      ],
    retryHint: "Start at -4 on a number line, move right 9, then left 5.",
    misconceptions: [
      { misconceptionId: "E-w5-a", description: "Student answers 8°C.", rootCause: "Operation-Order Error — combines the three numbers (4, 9, 5) in an incorrect sequence or with the wrong signs, rather than applying each move to the running total in order.", remediation: "Track the running total after each move on a number line: -4, then -4+9=5, then 5-5=0 — write each intermediate value down." },
      { misconceptionId: "E-w5-b", description: "Student answers -8°C.", rootCause: "Direction Confusion — treats both the rise and the fall as subtractions, moving further negative at every step instead of distinguishing rise (add) from fall (subtract).", remediation: "State the rule and reuse it at every step: rise = add, fall = subtract — apply it move by move rather than combining all the numbers at once." },
      { misconceptionId: "E-w5-c", description: "Student answers 10°C.", rootCause: "Sign-Dropping — ignores the negative starting temperature and adds 9-5+4 or similar, as though the start were positive.", remediation: "Circle the negative sign before starting and say \"starting point is below zero\" out loud before doing any arithmetic." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Mark the start", hint: "Mark -4 on a number line." },
      { level: 2, description: "Apply the rise", hint: "A rise of 9 means add 9. Where do you land?" },
      { level: 3, description: "Apply the fall", hint: "A fall of 5 means subtract 5 from your last position. Where do you land now?" }
    ],
    forwardRiskLinks: [
      { targetSkillId: "NEG-01", probability: 0.3, condition: "If not remediated before single-step temperature/depth word problems" }
    ],
    learningObjectives: []
  },
  {
    itemId: "w6", order: 6, cluster: "CONV", clusterName: CLUSTER_NAMES.CONV,
    skillId: "CONV-01",
    question: "Write 45,67,890 (Indian system) in the International system.",
    options: [
        { text: "4,567,890", correct: true, feedback: "45 lakh 67 thousand 890 = 4,567,890." },
        { text: "45,678,900", correct: false, feedback: "Incorrect grouping.", misconceptionId: "E-w6-a" },
        { text: "456,789", correct: false, feedback: "You lost a zero.", misconceptionId: "E-w6-b" },
        { text: "4,567,89", correct: false, feedback: "Not a valid number.", misconceptionId: "E-w6-c" }
      ],
    retryHint: "Group the digits in sets of three from the right.",
    misconceptions: [
      { misconceptionId: "E-w6-a", description: "Student writes 45,678,900, an extra digit longer than the original.", rootCause: "Digit Insertion — miscounts while regrouping into sets of three and inserts an extra placeholder, inflating the number tenfold.", remediation: "Strip all commas first to get the raw digit string (4567890), then insert new commas by counting exactly three digits at a time from the right." },
      { misconceptionId: "E-w6-b", description: "Student writes 456,789, one digit short.", rootCause: "Digit Loss — drops a digit while regrouping, deflating the value by a factor of 10.", remediation: "Count total digits before converting (4567890 has 7 digits) and verify the International-grouped answer still has exactly 7 digits." },
      { misconceptionId: "E-w6-c", description: "Student writes 4,567,89, an incomplete final group.", rootCause: "Malformed Regrouping — stops the regrouping process before completing the final group of three digits, leaving a truncated two-digit group.", remediation: "After marking off groups of three from the right, check that every group (including the leftmost) has the correct number of digits before finalising." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Strip the commas", hint: "Remove the Indian commas from 45,67,890 to get 4567890." },
      { level: 2, description: "Regroup in 3s", hint: "Starting from the right, mark off groups of three digits: 4,567,890." },
      { level: 3, description: "Check the digit count", hint: "Count the digits in your answer — does it match the original 7 digits?" }
    ],
    forwardRiskLinks: [
      { targetSkillId: "CONV-02", probability: 0.4, condition: "If not remediated before compound word-problem conversions" }
    ],
    learningObjectives: []
  },
  {
    itemId: "w7", order: 7, cluster: "PLACE", clusterName: CLUSTER_NAMES.PLACE,
    skillId: "PV-04",
    question: "How many hundreds are there in 12,00,000?",
    options: [
        { text: "12,000", correct: true, feedback: "12,00,000 ÷ 100 = 12,000." },
        { text: "1,200", correct: false, feedback: "You divided by 1,000.", misconceptionId: "E-w7-a" },
        { text: "120", correct: false, feedback: "Divided by 10,000.", misconceptionId: "E-w7-b" },
        { text: "1,20,000", correct: false, feedback: "You multiplied by 10.", misconceptionId: "E-w7-c" }
      ],
    retryHint: "Divide by 100 to find the number of hundreds.",
    misconceptions: [
      { misconceptionId: "E-w7-a", description: "Student answers 1,200, one order of magnitude too small.", rootCause: "Divisor Slip — divides by 1,000 instead of 100, removing one extra zero from the count.", remediation: "Write the division as 12,00,000 ÷ 100 explicitly and cancel exactly two zeros (matching the two zeros in 100), not three." },
      { misconceptionId: "E-w7-b", description: "Student answers 120, two orders of magnitude too small.", rootCause: "Divisor Slip (compounded) — divides by 10,000 instead of 100, removing two extra zeros from the count.", remediation: "Count the zeros in the divisor (100 has two zeros) and cancel exactly that many zeros from the dividend, no more." },
      { misconceptionId: "E-w7-c", description: "Student answers 1,20,000, multiplying instead of dividing.", rootCause: "Operation Inversion — multiplies by 10 instead of dividing by 100, moving in the opposite direction from what \"how many hundreds are in\" requires.", remediation: "Restate the question as a division before touching any digits: \"how many hundreds fit into 12,00,000\" means 12,00,000 ÷ 100." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the operation", hint: "\"How many hundreds are in a number\" means divide by 100." },
      { level: 2, description: "Cancel the zeros", hint: "100 has two zeros. Cancel two zeros from 12,00,000." },
      { level: 3, description: "Read the result", hint: "What is left after cancelling two zeros from 12,00,000?" }
    ],
    forwardRiskLinks: [
      { targetSkillId: "PV-03", probability: 0.4, condition: "If not remediated before expanded-form work" }
    ],
    learningObjectives: ["CCSS.MATH.4.NBT.A.1"]
  },
  {
    itemId: "w8", order: 8, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    skillId: "COMP-01",
    question: "Arrange these from coldest to warmest: 2°C, -5°C, -1°C, 0°C.",
    options: [
        { text: "-5°C, -1°C, 0°C, 2°C", correct: true, feedback: "Coldest is the most negative." },
        { text: "2°C, 0°C, -1°C, -5°C", correct: false, feedback: "That's warmest to coldest.", misconceptionId: "E-w8-a" },
        { text: "-1°C, -5°C, 0°C, 2°C", correct: false, feedback: "-5 is colder than -1.", misconceptionId: "E-w8-b" },
        { text: "0°C, -1°C, -5°C, 2°C", correct: false, feedback: "Order is mixed.", misconceptionId: "E-w8-c" }
      ],
    retryHint: "Think of a number line: smaller numbers are colder.",
    misconceptions: [
      { misconceptionId: "E-w8-a", description: "Student orders the temperatures warmest to coldest.", rootCause: "Direction Reversal — correctly ranks the temperatures by value but writes the order warmest-to-coldest, confusing which end of the number line \"coldest\" refers to.", remediation: "Anchor the vocabulary physically to a vertical thermometer: coldest = lowest = furthest left on a number line, listed first." },
      { misconceptionId: "E-w8-b", description: "Student swaps -5°C and -1°C, listing -1 as colder.", rootCause: "Zero-Proximity Reversal — mistakenly treats the value closer to zero (-1) as colder and the value farther from zero (-5) as warmer, reversing the actual rule that further from zero on the negative side means colder.", remediation: "Plot all four temperatures on a number line and read them off left to right — the leftmost point is always coldest, regardless of which digit looks bigger." },
      { misconceptionId: "E-w8-c", description: "Student writes 0°C, -1°C, -5°C, 2°C, placing 0 before the negatives.", rootCause: "Sequential Placement Error — does not recognise that both -1 and -5 are less than 0, placing 0 as if it were the smallest value in the group.", remediation: "Mark 0 explicitly on the number line and confirm that any negative number sits to its left, meaning smaller (colder)." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Plot all four", hint: "Mark 2, -5, -1, and 0 on a number line." },
      { level: 2, description: "Read left to right", hint: "Read the marked points from left (smallest/coldest) to right (largest/warmest)." },
      { level: 3, description: "Write the order", hint: "List the temperatures in that left-to-right order." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "NEG-01", probability: 0.4, condition: "If not remediated before single negative-number comparisons" }
    ],
    learningObjectives: []
  }
];

const diagnosticItems = [
  {
    itemId: "d1", order: 1, cluster: "PLACE", clusterName: CLUSTER_NAMES.PLACE,
    skillId: "PV-05",
    question: "A number is between 4,50,000 and 5,00,000. The ten-thousands digit is the square of the thousands digit. The sum of all six digits is 20. Which number could it be?",
    options: [
        { text: "4,93,220", correct: true, feedback: "Ten-thousands 9 = 3² (thousands digit 3). Sum = 4+9+3+2+2+0 = 20." },
        { text: "4,93,401", correct: false, feedback: "Ten-thousands 9, thousands 3, but sum = 4+9+3+4+0+1 = 21.", misconceptionId: "E-d1-a" },
        { text: "4,94,301", correct: false, feedback: "Thousands digit 4, but 4² = 16, not 9.", misconceptionId: "E-d1-b" },
        { text: "4,92,420", correct: false, feedback: "Ten-thousands 9, thousands 2, but 2² = 4, not 9.", misconceptionId: "E-d1-c" }
      ],
    backward: "Use the condition to find possible thousands digits, then check the sum.",
    forward: "This type of puzzle builds algebraic reasoning with place value.",
    misconceptions: [
      { misconceptionId: "E-d1-a", description: "Student picks 4,93,401, which satisfies the squaring condition but not the digit-sum condition.", rootCause: "Condition Neglect — verifies only the squaring relationship between the ten-thousands and thousands digits and stops checking, forgetting the problem has a second, independent condition (digit sum = 20) that must also hold.", remediation: "List both conditions separately before testing any candidate, and check each candidate against both — not just the first one satisfied." },
      { misconceptionId: "E-d1-b", description: "Student picks 4,94,301, where the squaring relationship does not actually hold.", rootCause: "Relationship Misapplication — treats the thousands digit (4) and ten-thousands digit (9) as satisfying \"ten-thousands is the square of thousands\" without actually computing 4² (=16, not 9), applying the condition loosely by feel.", remediation: "Compute the square of the candidate thousands digit explicitly every time before comparing it to the ten-thousands digit — do not just check whether both digits are large." },
      { misconceptionId: "E-d1-c", description: "Student picks 4,92,420, where the squaring relationship does not hold.", rootCause: "Relationship Misapplication — assumes 2² = 9 by pattern-matching digits that appear in the number rather than computing the actual square.", remediation: "Build a small reference table of squares (1²=1, 2²=4, 3²=9, 4²=16) and check the thousands digit against it directly." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "List both conditions", hint: "List what must be true: (1) ten-thousands = (thousands)², (2) digit sum = 20." },
      { level: 2, description: "Test the squaring condition", hint: "For each candidate, check: is the ten-thousands digit really the square of the thousands digit?" },
      { level: 3, description: "Test the digit sum", hint: "Among the survivors, add all six digits. Which one sums to 20?" }
    ],
    forwardRiskLinks: [
      { targetSkillId: "ALG-01", probability: 0.3, condition: "If not remediated before solving simple equations with unknowns" }
    ],
    learningObjectives: []
  },
  {
    itemId: "d2", order: 2, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    skillId: "PV-05",
    question: "Find the smallest 6-digit number in the Indian system that uses all the digits 0, 2, 4, 6, 8, 9 exactly once, and whose last three digits form a number that is a multiple of 8.",
    options: [
        { text: "2,04,896", correct: true, feedback: "The smallest arrangement: 2,04,896. Last three digits 896 = 8 × 112." },
        { text: "2,04,689", correct: false, feedback: "689 is not divisible by 8.", misconceptionId: "E-d2-a" },
        { text: "2,06,489", correct: false, feedback: "489 is not a multiple of 8.", misconceptionId: "E-d2-b" },
        { text: "2,08,469", correct: false, feedback: "469 is not a multiple of 8.", misconceptionId: "E-d2-c" }
      ],
    backward: "Place the smallest non-zero digit first, then arrange the rest to satisfy the condition.",
    forward: "Divisibility combined with ordering is a common Olympiad topic.",
    misconceptions: [
      { misconceptionId: "E-d2-a", description: "Student picks 2,04,689, which minimizes digit order but ignores the divisibility condition.", rootCause: "Condition Neglect — arranges the digits into the smallest possible sequence without checking whether the resulting last-three-digit number actually satisfies the multiple-of-8 condition.", remediation: "Treat divisibility as a filter applied before minimizing: first find which arrangements of the last three digits are multiples of 8, then pick the smallest overall number among those." },
      { misconceptionId: "E-d2-b", description: "Student picks 2,06,489, testing an arrangement that still fails divisibility.", rootCause: "Divisibility Mischeck — assumes an arrangement is divisible by 8 without actually performing the division, or misremembers the divisibility rule for 8.", remediation: "Actually divide the candidate's last three digits by 8 and check for a remainder of zero, rather than guessing from appearance." },
      { misconceptionId: "E-d2-c", description: "Student picks 2,08,469, another arrangement that fails divisibility.", rootCause: "Divisibility Mischeck — similarly assumes divisibility without verifying, likely from testing arrangements in an unsystematic order rather than checking each one.", remediation: "List all valid multiples of 8 using the remaining digits systematically, then verify divisibility for each before comparing overall number size." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Separate the two conditions", hint: "First find which 3-digit combinations of the given digits are multiples of 8; only then think about the smallest overall number." },
      { level: 2, description: "Test candidates for divisibility", hint: "Divide each candidate last-three-digit number by 8. Does it divide evenly?" },
      { level: 3, description: "Minimize the leading digits", hint: "Among the valid last-three-digit groups, place the remaining digits in ascending order at the front." }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d3", order: 3, cluster: "ROUND", clusterName: CLUSTER_NAMES.ROUND,
    skillId: "ROUND-02",
    question: "A number, when rounded to the nearest 100, gives 6,700, and when rounded to the nearest 10, gives 6,650. The number is also a multiple of 5. What is the number?",
    options: [
        { text: "6,650", correct: true, feedback: "Range for nearest 100: 6,650-6,749. For nearest 10: 6,645-6,654. Overlap 6,650-6,654. Multiples of 5: 6,650 works." },
        { text: "6,655", correct: false, feedback: "6,655 rounds to 6,660 to the nearest 10.", misconceptionId: "E-d3-a" },
        { text: "6,645", correct: false, feedback: "6,645 rounds to 6,640 to the nearest 10.", misconceptionId: "E-d3-b" },
        { text: "6,749", correct: false, feedback: "Rounds to 6,700 to the nearest 100, but to 6,750 to the nearest 10.", misconceptionId: "E-d3-c" }
      ],
    backward: "Find the intersection of the two rounding ranges, then apply the additional condition.",
    forward: "Overlapping conditions appear in measurement tolerances.",
    misconceptions: [
      { misconceptionId: "E-d3-a", description: "Student picks 6,655, just outside the true overlap.", rootCause: "Interval-Boundary Oversight — assumes 6,655 falls within the nearest-10 range (6,645-6,654) without checking the exact boundary, missing that it actually rounds up to 6,660.", remediation: "Test each candidate directly against the nearest-10 rounding rule rather than assuming it belongs to the interval by proximity." },
      { misconceptionId: "E-d3-b", description: "Student picks 6,645, just below the true overlap.", rootCause: "Interval-Boundary Oversight — assumes 6,645 falls within the overlap without checking, missing that it actually rounds to 6,640 (nearest 10), one below the required 6,650.", remediation: "Compute both rounding intervals fully first — [6,650, 6,749] and [6,645, 6,654] — then find their exact overlap [6,650, 6,654] before testing candidates." },
      { misconceptionId: "E-d3-c", description: "Student picks 6,749, the upper edge of only one of the two intervals.", rootCause: "Single-Condition Focus — satisfies the nearest-100 condition (which has a wide range up to 6,749) but ignores the much narrower nearest-10 condition entirely.", remediation: "Always intersect both conditions before testing the third (multiple-of-5); a candidate satisfying only one rounding condition is not yet a valid answer." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the nearest-100 interval", hint: "Which numbers round to 6,700 (nearest 100)? That is 6,650 to 6,749." },
      { level: 2, description: "Find the nearest-10 interval", hint: "Which numbers round to 6,650 (nearest 10)? That is 6,645 to 6,654." },
      { level: 3, description: "Intersect and filter", hint: "Overlap both intervals, then pick the multiple of 5 within that overlap." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "ROUND-01", probability: 0.3, condition: "If not remediated before straightforward single-number rounding tasks" }
    ],
    learningObjectives: ["CCSS.MATH.4.NBT.A.3"]
  },
  {
    itemId: "d4", order: 4, cluster: "ROMAN", clusterName: CLUSTER_NAMES.ROMAN,
    skillId: "ROM-03",
    question: "Calculate LXXXIV + XLVI. Then round the result to the nearest 10 and write the answer in Roman numerals.",
    options: [
        { text: "CXXX", correct: true, feedback: "84 + 46 = 130. Rounded to nearest 10 is 130 = CXXX." },
        { text: "CXX", correct: false, feedback: "120 is the sum without rounding? 84+46=130, not 120.", misconceptionId: "E-d4-a" },
        { text: "CXL", correct: false, feedback: "140 would be rounding up to the next ten incorrectly.", misconceptionId: "E-d4-b" },
        { text: "C", correct: false, feedback: "100 is too low.", misconceptionId: "E-d4-c" }
      ],
    backward: "Convert, add, round, then convert back.",
    forward: "Combining Roman numerals with rounding tests flexibility.",
    misconceptions: [
      { misconceptionId: "E-d4-a", description: "Student computes a sum of 120 instead of 130.", rootCause: "Addition Slip — miscomputes 84+46, likely dropping a ten during the carry from the ones column (4+6=10).", remediation: "Add the ones digits first and write the carry explicitly: 4+6=10, write 0 and carry 1 to the tens column." },
      { misconceptionId: "E-d4-b", description: "Student rounds 130 up to 140.", rootCause: "Direction Default — rounds up out of habit without checking the ones digit of the sum (0), which is already at the rounding target and needs no change.", remediation: "Check the ones digit of the computed sum (130 has a ones digit of 0) before rounding — a 0 means the number is already at the nearest 10." },
      { misconceptionId: "E-d4-c", description: "Student answers C (100), far short of the correct sum.", rootCause: "Magnitude Shortfall — significantly undercounts during the addition, possibly misconverting one of the source numerals (e.g. reading LXXXIV as a smaller value) before adding.", remediation: "Convert each numeral segment by segment before adding: LXXXIV = L(50)+XXX(30)+IV(4)=84, checked separately from XLVI=XL(40)+VI(6)=46." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Convert both numerals", hint: "LXXXIV = 84. XLVI = 46." },
      { level: 2, description: "Add carefully", hint: "84 + 46 = ? Add ones first, carrying as needed." },
      { level: 3, description: "Round and convert back", hint: "Is your sum already at a multiple of 10, or does it need rounding? Convert the final value to Roman numerals." }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d5", order: 5, cluster: "NEG", clusterName: CLUSTER_NAMES.NEG,
    skillId: "NEG-02",
    question: "A bank account starts with a balance of -₹200. The owner deposits ₹500, then withdraws ₹350, then deposits ₹100. What is the final balance?",
    options: [
        { text: "₹50", correct: true, feedback: "-200 + 500 = 300; 300 - 350 = -50; -50 + 100 = 50." },
        { text: "-₹50", correct: false, feedback: "You stopped after the withdrawal.", misconceptionId: "E-d5-a" },
        { text: "₹150", correct: false, feedback: "You might have added all positive numbers and subtracted only once.", misconceptionId: "E-d5-b" },
        { text: "-₹150", correct: false, feedback: "Incorrect sign tracking.", misconceptionId: "E-d5-c" }
      ],
    backward: "Track each transaction step by step, keeping the signs correct.",
    forward: "This is the basis for managing personal finances.",
    misconceptions: [
      { misconceptionId: "E-d5-a", description: "Student answers -₹50, stopping the calculation one step early.", rootCause: "Incomplete Chain — correctly tracks the first two transactions (-200+500-350=-50) but forgets to apply the final deposit of ₹100.", remediation: "Count the number of transactions stated in the problem before starting, and check off each one as it is applied, confirming all have been used." },
      { misconceptionId: "E-d5-b", description: "Student answers ₹150, combining the transactions in the wrong order.", rootCause: "Operation-Order Error — adds all the deposits together (500+100=600) and subtracts the withdrawal only once (600-350-200 or similar), rather than applying each transaction to the running balance in the order given.", remediation: "Process transactions strictly in the order given, writing the running balance after each single step, never grouping deposits or withdrawals together." },
      { misconceptionId: "E-d5-c", description: "Student answers -₹150, mishandling the signs throughout.", rootCause: "Sign-Tracking Failure — loses track of whether the running balance is positive or negative partway through the chain, likely treating a withdrawal from a negative balance as making it more negative when it should reduce the (already negative) balance further only by the exact amount.", remediation: "Write the balance and its sign explicitly after every single transaction, and double check: deposit = add, withdraw = subtract, regardless of the current sign." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "List the transactions in order", hint: "Start: -200. Then +500, then -350, then +100." },
      { level: 2, description: "Apply them one at a time", hint: "Compute the running balance after each transaction, writing each one down." },
      { level: 3, description: "Confirm the final value", hint: "What is the balance after all four numbers (start plus three transactions) have been applied?" }
    ],
    forwardRiskLinks: [
      { targetSkillId: "NEG-01", probability: 0.3, condition: "If not remediated before single-step negative-number word problems" }
    ],
    learningObjectives: []
  },
  {
    itemId: "d6", order: 6, cluster: "CONV", clusterName: CLUSTER_NAMES.CONV,
    skillId: "CONV-03",
    question: "Which of these numbers is the largest? A = 3,456,789 (International); B = 34,56,789 (Indian); C = 3,465,798 (International); D = 34,65,789 (Indian).",
    options: [
        { text: "C", correct: true, feedback: "C = 3,465,798. B = 3,456,789, D = 3,465,789. Largest is C." },
        { text: "A", correct: false, feedback: "A = 3,456,789, which is smaller than C.", misconceptionId: "E-d6-a" },
        { text: "B", correct: false, feedback: "B equals A (3,456,789).", misconceptionId: "E-d6-b" },
        { text: "D", correct: false, feedback: "D = 3,465,789, still slightly less than C.", misconceptionId: "E-d6-c" }
      ],
    backward: "Convert all numbers to a common system (International) before comparing.",
    forward: "Real-world datasets often mix formats.",
    misconceptions: [
      { misconceptionId: "E-d6-a", description: "Student picks A, without converting to a common system first.", rootCause: "Cross-System Comparison Error — compares the digit strings of A and C directly without recognising that A and B represent the same value in different notations, and without carefully aligning digit positions across systems.", remediation: "Convert every number to a single common system (say, International) before making any comparison, writing all four values in that one format side by side." },
      { misconceptionId: "E-d6-b", description: "Student picks B, treating it as different from A.", rootCause: "Notation-Value Confusion — assumes numbers written in different systems (Indian vs International) with visually different comma placement must have different values, missing that B is simply A regrouped.", remediation: "Convert B to International notation explicitly and confirm it becomes identical to A, digit for digit." },
      { misconceptionId: "E-d6-c", description: "Student picks D, missing that it is slightly smaller than C.", rootCause: "Trailing-Digit Neglect — converts D correctly to 3,465,789 but stops comparing digit by digit before reaching the final two digits (89 vs 98), missing that C is larger there.", remediation: "After converting all values to the same system, compare column by column all the way to the last digit — do not stop once the numbers look similar." }
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
    itemId: "d7", order: 7, cluster: "PLACE", clusterName: CLUSTER_NAMES.PLACE,
    skillId: "PV-05",
    question: "Using the digits 5, 0, 2, 7, 3, 9 exactly once, form the smallest 6-digit Indian system number such that the number formed by the first two digits is a multiple of 9.",
    options: [
        { text: "2,70,359", correct: true, feedback: "First two digits 27 (multiple of 9). Smallest arrangement after that gives 2,70,359." },
        { text: "2,07,359", correct: false, feedback: "First two digits 20, not a multiple of 9.", misconceptionId: "E-d7-a" },
        { text: "2,75,039", correct: false, feedback: "27 is a multiple of 9, but the remaining digits are not in the smallest order.", misconceptionId: "E-d7-b" },
        { text: "2,70,539", correct: false, feedback: "The last three digits are not the smallest possible.", misconceptionId: "E-d7-c" }
      ],
    backward: "Fix the first two digits so that they form a multiple of 9, then minimize the rest.",
    forward: "Digit constraint puzzles are common in math contests.",
    misconceptions: [
      { misconceptionId: "E-d7-a", description: "Student picks 2,07,359, minimizing the digits without checking the multiple-of-9 condition.", rootCause: "Condition Neglect — arranges the leading two digits into the smallest possible pair (2 then 0) without checking whether 20 is actually a multiple of 9.", remediation: "Test the multiple-of-9 condition on the leading two digits first before minimizing anything else — 20 is not divisible by 9, so it cannot be used." },
      { misconceptionId: "E-d7-b", description: "Student picks 2,75,039, satisfying the leading condition but not minimizing the rest.", rootCause: "Partial Optimization — correctly fixes the first two digits (27, a multiple of 9) but fails to arrange the remaining digits (0, 3, 5, 9) in ascending order, leaving a larger number than necessary.", remediation: "After fixing any required leading digits, sort all remaining digits into ascending order explicitly before writing the rest of the number." },
      { misconceptionId: "E-d7-c", description: "Student picks 2,70,539, an intermediate but not fully minimized arrangement.", rootCause: "Partial Optimization — correctly fixes the first two digits and correctly starts the remaining digits with 0, but does not fully sort the last three digits (3, 5, 9) into ascending order.", remediation: "Double check every digit after the fixed leading portion is placed in strictly ascending order, one digit at a time." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find valid leading pairs", hint: "Which two-digit combinations of the given digits are multiples of 9? (Hint: 27 works.)" },
      { level: 2, description: "Fix the smallest valid pair", hint: "Among valid pairs, which gives the smallest leading two digits?" },
      { level: 3, description: "Minimize the rest", hint: "Sort the remaining digits in ascending order after the fixed pair." }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d8", order: 8, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    skillId: "PV-05",
    question: "I am a 5-digit number less than 50,000. My ten-thousands digit is 3 less than my hundreds digit. My thousands digit is the sum of my hundreds digit and my tens digit. The sum of all my digits is 20. Which number could I be?",
    options: [
        { text: "19451", correct: true, feedback: "Digits: 1 (ten-thousands), 9 (thousands), 4 (hundreds), 5 (tens), 1 (ones). 1 = 4-3; 9 = 4+5; sum = 1+9+4+5+1=20." },
        { text: "28563", correct: false, feedback: "2 = 5-3, but 8 ≠ 5+6.", misconceptionId: "E-d8-a" },
        { text: "17452", correct: false, feedback: "1 = 4-3, but 7 ≠ 4+5.", misconceptionId: "E-d8-b" },
        { text: "20481", correct: false, feedback: "2 ≠ 4-3.", misconceptionId: "E-d8-c" }
      ],
    backward: "Set up equations for the digits and test the options.",
    forward: "Such riddles bridge arithmetic and algebra.",
    misconceptions: [
      { misconceptionId: "E-d8-a", description: "Student picks 28563, which satisfies the first clue but not the second.", rootCause: "Single-Clue Verification — checks only the first relationship (ten-thousands = hundreds - 3) and accepts the candidate without testing the second relationship (thousands = hundreds + tens).", remediation: "Test every stated clue against a candidate in turn, writing out each check as its own line of working, before accepting or rejecting it." },
      { misconceptionId: "E-d8-b", description: "Student picks 17452, which also satisfies only the first clue.", rootCause: "Single-Clue Verification — again checks only the first relationship and stops, missing that the thousands digit (7) does not equal hundreds+tens (4+5=9).", remediation: "Build a checklist of all stated clues before testing any candidate, and work through the checklist completely for each option." },
      { misconceptionId: "E-d8-c", description: "Student picks 20481, which fails even the first clue.", rootCause: "Relationship Misapplication — misreads \"3 less than\" as some other relationship, checking 2 against 4-3=1 loosely rather than computing the difference exactly.", remediation: "Translate each clue into an explicit equation first (ten-thousands = hundreds - 3) and substitute the candidate's actual digits before judging whether it holds." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Translate the clues", hint: "Write each clue as an equation using digit names: T = H - 3; Th = H + Te." },
      { level: 2, description: "Test each candidate fully", hint: "For each option, check both equations, not just the first one." },
      { level: 3, description: "Confirm the digit sum", hint: "Once a candidate passes both equations, check that its digits sum to 20." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "ALG-01", probability: 0.4, condition: "If not remediated before solving simple equations with unknowns" }
    ],
    learningObjectives: []
  },
  {
    itemId: "d9", order: 9, cluster: "ROUND", clusterName: CLUSTER_NAMES.ROUND,
    skillId: "ROUND-02",
    question: "A number rounded to the nearest 100 is 8,200, and rounded to the nearest 10 is 8,250. The sum of its digits is a prime number. What is the number?",
    options: [
        { text: "8,245", correct: true, feedback: "8,245 → nearest 100: 8,200 (tens 4<5); nearest 10: 8,250 (ones 5). Sum = 8+2+4+5 = 19 (prime)." },
        { text: "8,235", correct: false, feedback: "Nearest 10: 8,240, not 8,250.", misconceptionId: "E-d9-a" },
        { text: "8,254", correct: false, feedback: "Nearest 100: 8,300 (tens 5).", misconceptionId: "E-d9-b" },
        { text: "8,250", correct: false, feedback: "Nearest 100: 8,300.", misconceptionId: "E-d9-c" }
      ],
    backward: "Intersect the two rounding ranges, then check digit sums.",
    forward: "Prime numbers often appear as constraints in puzzles.",
    misconceptions: [
      { misconceptionId: "E-d9-a", description: "Student picks 8,235, which fails the nearest-10 condition.", rootCause: "Interval-Boundary Oversight — assumes 8,235 is close enough to round to 8,250, without actually checking that its ones digit (5) rounds it to 8,240, not 8,250.", remediation: "Test each candidate directly against the nearest-10 rule (check the ones digit) rather than judging by approximate closeness." },
      { misconceptionId: "E-d9-b", description: "Student picks 8,254, which fails the nearest-100 condition.", rootCause: "Single-Condition Focus — satisfies the nearest-10 condition but does not check that the tens digit (5) actually rounds this candidate up to 8,300 for the nearest-100 condition, not 8,200.", remediation: "Check both rounding conditions independently for every candidate — passing one does not guarantee the other." },
      { misconceptionId: "E-d9-c", description: "Student picks 8,250, which fails the nearest-100 condition.", rootCause: "Rounding-Boundary Oversight — assumes 8,250 rounds to 8,200 because it starts with '82', without checking that its tens digit (5) actually pushes it to round up to 8,300.", remediation: "Anchor the interval explicitly: numbers rounding to 8,200 (nearest 100) must fall in [8,150, 8,249] — test the exact boundary." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find both intervals", hint: "Nearest 100 = 8,200 means the interval [8,150, 8,249]. Nearest 10 = 8,250 means the interval [8,245, 8,254]." },
      { level: 2, description: "Intersect the intervals", hint: "Which numbers fall in both intervals at once?" },
      { level: 3, description: "Check the digit sum", hint: "Among the overlap, which number's digits sum to a prime number?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.4.NBT.A.3"]
  },
  {
    itemId: "d10", order: 10, cluster: "ROMAN", clusterName: CLUSTER_NAMES.ROMAN,
    skillId: "ROM-04",
    question: "If XLV < N < LXX, and N is the largest multiple of 6 in this range, write N in Roman numerals.",
    options: [
        { text: "LXVI", correct: true, feedback: "Multiples of 6 between 45 and 70: 48, 54, 60, 66. Largest is 66 = LXVI." },
        { text: "LIV", correct: false, feedback: "54, but not the largest.", misconceptionId: "E-d10-a" },
        { text: "LX", correct: false, feedback: "60, but 66 is larger.", misconceptionId: "E-d10-b" },
        { text: "LXXII", correct: false, feedback: "72 is outside the range.", misconceptionId: "E-d10-c" }
      ],
    backward: "Convert to numbers, find the multiples, then pick the required one.",
    forward: "Roman numerals with inequalities test attention to detail.",
    misconceptions: [
      { misconceptionId: "E-d10-a", description: "Student picks LIV (54), a valid multiple of 6 but not the largest.", rootCause: "Premature Stopping — finds one valid multiple of 6 within the range and stops searching, without checking whether a larger multiple also fits.", remediation: "List every multiple of 6 within the range systematically (48, 54, 60, 66) before selecting the largest one." },
      { misconceptionId: "E-d10-b", description: "Student picks LX (60), missing that a larger valid multiple exists.", rootCause: "Premature Stopping — finds a larger multiple of 6 than the first attempt but still stops before checking 66, which is also within range.", remediation: "Continue listing multiples of 6 all the way up to the range's upper bound (70) before choosing the largest that stays under it." },
      { misconceptionId: "E-d10-c", description: "Student picks LXXII (72), outside the stated range.", rootCause: "Boundary Violation — finds the next multiple of 6 after 66 (which is 72) without checking it against the upper bound (N < 70), including a value that violates the inequality.", remediation: "Check every candidate multiple against both inequality bounds (45 < N < 70) before finalising, discarding any that fall outside." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Convert the bounds", hint: "XLV = 45. LXX = 70." },
      { level: 2, description: "List the multiples", hint: "List every multiple of 6 between 45 and 70." },
      { level: 3, description: "Pick the largest", hint: "Which is the largest multiple of 6 that is still less than 70?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d11", order: 11, cluster: "NEG", clusterName: CLUSTER_NAMES.NEG,
    skillId: "NEG-02",
    question: "A submarine is at -150 m. It rises 80 m, then dives 60 m, then rises 40 m. What is its final depth?",
    options: [
        { text: "-90 m", correct: true, feedback: "-150 + 80 = -70; -70 - 60 = -130; -130 + 40 = -90." },
        { text: "-70 m", correct: false, feedback: "You stopped after the first ascent.", misconceptionId: "E-d11-a" },
        { text: "-110 m", correct: false, feedback: "A miscalculation.", misconceptionId: "E-d11-b" },
        { text: "-50 m", correct: false, feedback: "Incorrect sign handling.", misconceptionId: "E-d11-c" }
      ],
    backward: "Add rises and subtract dives step by step.",
    forward: "Underwater navigation uses negative numbers extensively.",
    misconceptions: [
      { misconceptionId: "E-d11-a", description: "Student answers -70 m, stopping after just the first move.", rootCause: "Incomplete Chain — correctly computes the result of the first move (-150+80=-70) but forgets to continue applying the remaining two moves.", remediation: "Count the number of moves stated in the problem before starting, and check off each one as it is applied." },
      { misconceptionId: "E-d11-b", description: "Student answers -110 m, a miscalculation partway through the chain.", rootCause: "Arithmetic Slip — makes an error in one of the intermediate steps, likely in the subtraction -70-60, losing track of the correct running total.", remediation: "Write the running total explicitly after every single move, checking each subtraction or addition individually before moving to the next." },
      { misconceptionId: "E-d11-c", description: "Student answers -50 m, mishandling one of the direction signs.", rootCause: "Direction Confusion — treats one of the moves with the wrong sign, likely adding when a dive should subtract or vice versa, at some point in the three-step chain.", remediation: "State the rule and reuse it at every step: rise = add, dive = subtract — apply it move by move, writing the sign explicitly each time." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Mark the start", hint: "Mark -150 on a vertical number line." },
      { level: 2, description: "Apply each move in order", hint: "Rise 80 (add), then dive 60 (subtract), then rise 40 (add) — one step at a time." },
      { level: 3, description: "Confirm the final total", hint: "What is the running total after all three moves?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d12", order: 12, cluster: "CONV", clusterName: CLUSTER_NAMES.CONV,
    skillId: "CONV-02",
    question: "Convert the sum of 45 lakh and 2.3 million into the Indian system.",
    options: [
        { text: "68,00,000", correct: true, feedback: "45 lakh = 45,00,000; 2.3 million = 23,00,000; sum = 68,00,000." },
        { text: "68,000,000", correct: false, feedback: "That's International notation, not Indian.", misconceptionId: "E-d12-a" },
        { text: "6,80,00,000", correct: false, feedback: "That would be 68 million, not 68 lakh.", misconceptionId: "E-d12-b" },
        { text: "47,30,000", correct: false, feedback: "You added incorrectly.", misconceptionId: "E-d12-c" }
      ],
    backward: "Convert both to the same unit (lakh), then add.",
    forward: "Real-world financial sums often require this dual-system skill.",
    misconceptions: [
      { misconceptionId: "E-d12-a", description: "Student writes 68,000,000, leaving the answer in International-style commas.", rootCause: "Notation Non-Conversion — correctly computes the numeric sum but stops before regrouping into Indian-style commas, submitting the International-grouped form instead.", remediation: "Treat \"convert to Indian system\" as a required final formatting step — regroup as 3, then 2, 2, 2… after computing the sum." },
      { misconceptionId: "E-d12-b", description: "Student writes 6,80,00,000, a full order of magnitude too high.", rootCause: "Magnitude Inflation — misapplies the million-to-lakh benchmark, treating the sum as though it were 68 million rather than 68 lakh.", remediation: "Anchor to the exact ratio: 1 million = 10 lakh, so 2.3 million = 23 lakh; add this to 45 lakh to get 68 lakh, not 680 lakh." },
      { misconceptionId: "E-d12-c", description: "Student writes 47,30,000, computing the wrong sum.", rootCause: "Unit Mismatch Before Adding — adds 45 (lakh) and 2.3 (million) as though they were already the same unit, without first converting 2.3 million to 23 lakh.", remediation: "Convert both quantities to a single common unit (lakh) before adding — 45 lakh + 23 lakh = 68 lakh, never 45 + 2.3." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Convert to a common unit", hint: "2.3 million = ? lakh (use 1 million = 10 lakh)." },
      { level: 2, description: "Add in that unit", hint: "45 lakh + 23 lakh = ? lakh." },
      { level: 3, description: "Write with Indian commas", hint: "Write your answer in lakh using Indian-style commas." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "CONV-01", probability: 0.3, condition: "If not remediated before direct-format Indian–International conversions" }
    ],
    learningObjectives: []
  },
  {
    itemId: "d13", order: 13, cluster: "PLACE", clusterName: CLUSTER_NAMES.PLACE,
    skillId: "PV-05",
    question: "Find the largest 7-digit International system number with millions digit 4, hundred-thousands digit equal to the sum of the millions and ten-thousands digits, and all digits different. What is the number?",
    options: [
        { text: "4,958,763", correct: true, feedback: "Millions=4, hundred-thousands=9 (4+5), ten-thousands=5. Remaining digits 8,7,6,3 in descending order." },
        { text: "4,739,865", correct: false, feedback: "Hundred-thousands 7 = 4+3, valid, but ten-thousands 3 isn't maximized — 5 also works and gives a larger hundred-thousands digit (9).", misconceptionId: "E-d13-a" },
        { text: "4,957,863", correct: false, feedback: "Not the largest arrangement of the last four digits.", misconceptionId: "E-d13-b" },
        { text: "4,985,763", correct: false, feedback: "Hundred-thousands 9=4+5, but ten-thousands 8? 4+8=12, not 9.", misconceptionId: "E-d13-c" }
      ],
    backward: "Maximize the hundred-thousands digit by choosing the largest possible ten-thousands digit that satisfies the condition.",
    forward: "Optimization with constraints is a key mathematical skill.",
    misconceptions: [
      { misconceptionId: "E-d13-a", description: "Student picks 4,739,865, where the digit relationship holds (7 = 4+3) but the ten-thousands digit isn't maximized.", rootCause: "Suboptimal Constraint Satisfaction — finds a valid combination (hundred-thousands = millions + ten-thousands) but does not search for the largest possible ten-thousands digit that still keeps the hundred-thousands digit a valid single digit and all digits distinct.", remediation: "Systematically test ten-thousands digits from largest to smallest, checking each time whether millions+ten-thousands stays a valid single digit and keeps all digits different." },
      { misconceptionId: "E-d13-b", description: "Student picks 4,957,863, correctly satisfying the digit relationship but not maximizing the remaining digits.", rootCause: "Partial Optimization — correctly fixes the millions, hundred-thousands, and ten-thousands digits but fails to arrange the remaining four digits (8, 7, 6, 3) in descending order for the largest possible number.", remediation: "After fixing the constrained digits, sort every remaining digit in descending order explicitly before writing the rest of the number." },
      { misconceptionId: "E-d13-c", description: "Student picks 4,985,763, where the digit relationship does not actually hold.", rootCause: "Relationship Misapplication — checks the constraint loosely, accepting hundred-thousands=9 without recomputing 4+8=12 (not a valid single digit), rather than verifying the arithmetic exactly.", remediation: "Compute millions+ten-thousands explicitly for each candidate and confirm the result is both a single digit and matches the hundred-thousands digit exactly." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Fix the millions digit", hint: "Millions digit is 4 (given)." },
      { level: 2, description: "Maximize the ten-thousands digit", hint: "Try the largest possible ten-thousands digit such that 4 + (that digit) is still a valid single digit for hundred-thousands, and no digits repeat." },
      { level: 3, description: "Maximize the rest", hint: "Arrange the remaining digits in descending order." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "ALG-01", probability: 0.3, condition: "If not remediated before solving simple equations with unknowns" }
    ],
    learningObjectives: []
  },
  {
    itemId: "d14", order: 14, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    skillId: "COMP-04",
    question: "Which number is exactly halfway between 7,50,000 and 8,50,000, when both are written in the Indian system?",
    options: [
        { text: "8,00,000", correct: true, feedback: "(7,50,000 + 8,50,000) ÷ 2 = 16,00,000 ÷ 2 = 8,00,000." },
        { text: "8,50,000", correct: false, feedback: "That's the larger endpoint.", misconceptionId: "E-d14-a" },
        { text: "7,50,000", correct: false, feedback: "The smaller endpoint.", misconceptionId: "E-d14-b" },
        { text: "7,00,000", correct: false, feedback: "Incorrect calculation.", misconceptionId: "E-d14-c" }
      ],
    backward: "Add the two numbers and divide by 2.",
    forward: "Finding midpoints is essential for understanding averages.",
    misconceptions: [
      { misconceptionId: "E-d14-a", description: "Student answers 8,50,000, one of the endpoints itself.", rootCause: "Endpoint Confusion — selects one of the given endpoints directly rather than computing a value between them, perhaps misreading \"halfway between\" as \"the larger of the two\".", remediation: "Compute the midpoint using the explicit formula (small + large) ÷ 2, rather than selecting a value already given in the question." },
      { misconceptionId: "E-d14-b", description: "Student answers 7,50,000, the other endpoint.", rootCause: "Endpoint Confusion — selects the smaller given endpoint directly instead of computing a value between them.", remediation: "Draw a number line with both endpoints marked, and locate the midpoint visually before computing it numerically." },
      { misconceptionId: "E-d14-c", description: "Student answers 7,00,000, below the smaller endpoint entirely.", rootCause: "Formula Misapplication — computes the difference (1,00,000) and subtracts it from the smaller endpoint instead of halving the difference and adding it, landing outside the actual interval.", remediation: "Verify with the direct formula: (7,50,000 + 8,50,000) ÷ 2 = 16,00,000 ÷ 2 = 8,00,000 — check the result falls between the two given endpoints." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Add the endpoints", hint: "7,50,000 + 8,50,000 = ?" },
      { level: 2, description: "Halve the sum", hint: "Divide the sum by 2." },
      { level: 3, description: "Check it falls between", hint: "Does your answer fall between the two original endpoints?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d15", order: 15, cluster: "ROUND", clusterName: CLUSTER_NAMES.ROUND,
    skillId: "ROUND-02",
    question: "A number when rounded to the nearest 1,000 becomes 35,000, and when rounded to the nearest 10 becomes 34,970. The sum of its digits is 27 and the number is odd. What is the number?",
    options: [
        { text: "34,965", correct: true, feedback: "34,965 → nearest 1,000: 35,000 (hundreds 9≥5); nearest 10: 34,970 (ones 5). Sum=3+4+9+6+5=27, odd." },
        { text: "34,974", correct: false, feedback: "Sum is also 27, but it is even.", misconceptionId: "E-d15-a" },
        { text: "35,965", correct: false, feedback: "Rounds to 36,000 for nearest 1,000.", misconceptionId: "E-d15-b" },
        { text: "34,955", correct: false, feedback: "Nearest 10 would be 34,960.", misconceptionId: "E-d15-c" }
      ],
    backward: "The intersection of the ranges is 34,965-34,974; the digit sum and odd condition then pin it down.",
    forward: "Multiple constraints lead to a unique solution, a common problem-solving pattern.",
    misconceptions: [
      { misconceptionId: "E-d15-a", description: "Student picks 34,974, satisfying the rounding and digit-sum conditions but not the odd condition.", rootCause: "Condition Neglect — checks the two rounding conditions and the digit-sum condition but forgets the final \"and the number is odd\" condition, accepting an even candidate.", remediation: "List every condition stated in the problem, including the parity condition, and verify a candidate against all of them before finalising." },
      { misconceptionId: "E-d15-b", description: "Student picks 35,965, outside the nearest-1,000 interval.", rootCause: "Rounding-Boundary Oversight — assumes 35,965 rounds to 35,000 because it is close, without checking that its hundreds digit (9) actually pushes it up to round to 36,000.", remediation: "Test the nearest-1,000 rounding rule directly on each candidate rather than judging by approximate closeness to 35,000." },
      { misconceptionId: "E-d15-c", description: "Student picks 34,955, outside the nearest-10 interval.", rootCause: "Interval-Boundary Oversight — assumes 34,955 rounds to 34,970 without checking, missing that its ones digit (5) actually rounds it to 34,960.", remediation: "Compute the exact nearest-10 interval for the target [34,965, 34,974] and test whether each candidate genuinely falls within it." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find both intervals", hint: "Nearest 1,000 = 35,000 gives [34,500, 35,499]. Nearest 10 = 34,970 gives [34,965, 34,974]." },
      { level: 2, description: "Intersect and filter by digit sum", hint: "Within the overlap, which candidate's digits sum to 27?" },
      { level: 3, description: "Apply the parity condition", hint: "Of the remaining candidates, which one is odd?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.4.NBT.A.3"]
  },
  {
    itemId: "d16", order: 16, cluster: "ROMAN", clusterName: CLUSTER_NAMES.ROMAN,
    skillId: "ROM-03",
    question: "Calculate (CLX ÷ IV) + XXX and write the answer in Roman numerals.",
    options: [
        { text: "LXX", correct: true, feedback: "CLX=160, IV=4, 160÷4=40; +XXX=30 gives 70 = LXX." },
        { text: "LXXX", correct: false, feedback: "80 is incorrect.", misconceptionId: "E-d16-a" },
        { text: "LX", correct: false, feedback: "60.", misconceptionId: "E-d16-b" },
        { text: "C", correct: false, feedback: "100.", misconceptionId: "E-d16-c" }
      ],
    backward: "Perform division first, then addition, following BODMAS.",
    forward: "Mixed operations with Roman numerals build confidence with multiple representations.",
    misconceptions: [
      { misconceptionId: "E-d16-a", description: "Student answers LXXX (80), ten too high.", rootCause: "Division Slip — miscomputes 160÷4 as a value 10 higher than 40, perhaps mis-estimating the division rather than performing it exactly.", remediation: "Perform the division as a standard written algorithm: 160 ÷ 4 = 40, checked by multiplying back (4 × 40 = 160)." },
      { misconceptionId: "E-d16-b", description: "Student answers LX (60), ten too low.", rootCause: "Addition Slip — correctly divides (160÷4=40) but miscomputes the final addition, adding only 20 instead of 30.", remediation: "Convert XXX to its numeric value (30) explicitly before adding, rather than estimating the addend." },
      { misconceptionId: "E-d16-c", description: "Student answers C (100), significantly overshooting.", rootCause: "Operation-Order Error — adds before dividing, computing (160+30)÷4=47.5 or a similarly malformed combination, rather than following the stated order of operations (division first, as indicated by the brackets).", remediation: "Follow the brackets exactly as written: perform the division inside the parentheses first, then add the remaining term." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Convert to numbers", hint: "CLX = 160. IV = 4. XXX = 30." },
      { level: 2, description: "Divide first", hint: "160 ÷ 4 = ?" },
      { level: 3, description: "Add and convert back", hint: "Add 30 to your division result, then convert to Roman numerals." }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d17", order: 17, cluster: "NEG", clusterName: CLUSTER_NAMES.NEG,
    skillId: "NEG-02",
    question: "On Monday, the temperature dropped by 8°C from Sunday's high of 5°C. On Tuesday, it rose by 12°C from Monday's temperature. What was Tuesday's temperature?",
    options: [
        { text: "9°C", correct: true, feedback: "Monday: 5 - 8 = -3°C. Tuesday: -3 + 12 = 9°C." },
        { text: "1°C", correct: false, feedback: "You might have done 5-8+12 incorrectly.", misconceptionId: "E-d17-a" },
        { text: "-3°C", correct: false, feedback: "You only found Monday's temperature.", misconceptionId: "E-d17-b" },
        { text: "17°C", correct: false, feedback: "You added 8+12-5?", misconceptionId: "E-d17-c" }
      ],
    backward: "Work out the temperature step by step.",
    forward: "Temperature changes are a daily example of integer arithmetic.",
    misconceptions: [
      { misconceptionId: "E-d17-a", description: "Student answers 1°C.", rootCause: "Arithmetic Slip — makes an error somewhere in the two-step chain (5-8+12), perhaps miscomputing the first subtraction as -4 instead of -3.", remediation: "Compute Monday's temperature fully first (5-8=-3) and write it down explicitly before starting Tuesday's calculation." },
      { misconceptionId: "E-d17-b", description: "Student answers -3°C, stopping after finding only Monday's temperature.", rootCause: "Incomplete Chain — correctly computes the intermediate value (Monday's temperature) but stops before applying the second step (Tuesday's rise).", remediation: "Re-read the question to identify how many temperatures are asked for, and confirm the final answer corresponds to the last one (Tuesday), not an intermediate one." },
      { misconceptionId: "E-d17-c", description: "Student answers 17°C, combining the numbers without tracking the actual chain.", rootCause: "Magnitude-Only Arithmetic — combines the raw numbers (8, 12, 5) in some order without correctly tracking the signed running temperature through both days.", remediation: "Track the temperature explicitly at each named point: Sunday (5), Monday (5-8=-3), Tuesday (-3+12=9) — write each one down." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find Monday's temperature", hint: "Sunday was 5°C. It dropped 8°C. What is Monday's temperature?" },
      { level: 2, description: "Find Tuesday's temperature", hint: "Monday's temperature rose 12°C. What is Tuesday's temperature?" },
      { level: 3, description: "Confirm the final answer", hint: "Which day's temperature does the question actually ask for?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d18", order: 18, cluster: "CONV", clusterName: CLUSTER_NAMES.CONV,
    skillId: "CONV-02",
    question: "Write the number 'two crore thirty-five lakh' in the International system.",
    options: [
        { text: "23,500,000", correct: true, feedback: "2 crore = 20,000,000; 35 lakh = 3,500,000; total = 23,500,000." },
        { text: "2,350,000", correct: false, feedback: "That would be 23.5 lakh.", misconceptionId: "E-d18-a" },
        { text: "235,000,000", correct: false, feedback: "That's 23.5 crore.", misconceptionId: "E-d18-b" },
        { text: "20,350,000", correct: false, feedback: "You added 2 crore and 35 lakh incorrectly.", misconceptionId: "E-d18-c" }
      ],
    backward: "1 crore = 10 million, 1 lakh = 100,000.",
    forward: "Large numbers in Indian reports often need to be converted for an international audience.",
    misconceptions: [
      { misconceptionId: "E-d18-a", description: "Student writes 2,350,000, a full order of magnitude too low.", rootCause: "Magnitude Deflation — treats \"two crore thirty-five lakh\" as though it were only 23.5 lakh, dropping the crore component's true scale entirely.", remediation: "Convert each unit word to its full numeral separately — 2 crore = 20,000,000; 35 lakh = 3,500,000 — before combining them." },
      { misconceptionId: "E-d18-b", description: "Student writes 235,000,000, a full order of magnitude too high.", rootCause: "Magnitude Inflation — misapplies the crore benchmark, treating the value as though it were 23.5 crore rather than 2 crore 35 lakh.", remediation: "Anchor to the exact ratio: 1 crore = 10,000,000 (10 million), so 2 crore = 20,000,000 — check this figure before adding the lakh component." },
      { misconceptionId: "E-d18-c", description: "Student writes 20,350,000, combining the two components incorrectly.", rootCause: "Component Combination Error — converts each unit word roughly correctly in isolation but combines the digits incorrectly when adding, effectively concatenating digit strings rather than performing true addition.", remediation: "Add the two fully-converted numerals as a vertical sum: 20,000,000 + 3,500,000, aligning by place value rather than concatenating digit strings." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Convert each part", hint: "2 crore = 20,000,000. 35 lakh = 3,500,000." },
      { level: 2, description: "Add the parts", hint: "20,000,000 + 3,500,000 = ?" },
      { level: 3, description: "Check the format", hint: "Confirm your answer uses International-style commas (groups of three)." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "CONV-01", probability: 0.3, condition: "If not remediated before direct-format Indian–International conversions" }
    ],
    learningObjectives: []
  },
  {
    itemId: "d19", order: 19, cluster: "PLACE", clusterName: CLUSTER_NAMES.PLACE,
    skillId: "PV-05",
    question: "Using the digits 3, 0, 8, 5, 2, 7, 1 (each exactly once), form the smallest possible 7-digit number in the International system such that the digit in the thousands place is a multiple of 3.",
    options: [
        { text: "1,023,578", correct: true, feedback: "Smallest start is 1, then 0,2 in the next places; thousands digit must be a multiple of 3 → 3. Then arrange remaining 5,7,8 in smallest order: 578. So 1,023,578." },
        { text: "1,023,587", correct: false, feedback: "Last three digits are not in the smallest order.", misconceptionId: "E-d19-a" },
        { text: "1,203,578", correct: false, feedback: "Hundred-thousands digit 2 instead of 0 makes the number larger.", misconceptionId: "E-d19-b" },
        { text: "1,032,578", correct: false, feedback: "The ten-thousands and thousands are swapped; 0 in ten-thousands is smaller.", misconceptionId: "E-d19-c" }
      ],
    backward: "Place the smallest possible digits from left to right while satisfying the thousands condition.",
    forward: "This exercise sharpens logical sequencing under constraints.",
    misconceptions: [
      { misconceptionId: "E-d19-a", description: "Student picks 1,023,578 with the last three digits not fully sorted.", rootCause: "Partial Optimization — correctly fixes the leading digits and the constrained thousands digit but does not sort the final three free digits into ascending order.", remediation: "After placing all constrained digits, sort every remaining free digit into ascending order before writing the rest of the number." },
      { misconceptionId: "E-d19-b", description: "Student picks 1,203,578, placing a larger digit earlier than necessary.", rootCause: "Suboptimal Leading Placement — places digit 2 in the hundred-thousands position instead of 0, not realising 0 is allowed (and smaller) in any position except the very first.", remediation: "After the mandatory non-zero leading digit, always place the smallest available digit (including 0) in each subsequent position, checking digit by digit from left to right." },
      { misconceptionId: "E-d19-c", description: "Student picks 1,032,578, swapping the ten-thousands and thousands digits.", rootCause: "Neighbor-Column Swap — places the constrained thousands digit (3) before the free digit (0) instead of after it, reversing their correct order.", remediation: "Fill positions strictly left to right: place the smallest free digit first, and only place the constrained digit (3) when its designated column (thousands) is reached." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Fix the leading digit", hint: "The smallest non-zero digit is 1 — place it first." },
      { level: 2, description: "Fill freely until the constraint", hint: "Place the next smallest digits (0, 2) until you reach the thousands position." },
      { level: 3, description: "Apply the constraint, then finish", hint: "The thousands digit must be a multiple of 3 from what's left (3). Then sort the remaining digits ascending." }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d20", order: 20, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    skillId: "COMP-06",
    question: "Arrange the following in descending order: XL (Roman), 36, -5, 0.",
    options: [
        { text: "XL, 36, 0, -5", correct: true, feedback: "XL = 40, then 36, then 0, then -5." },
        { text: "36, XL, 0, -5", correct: false, feedback: "40 is larger than 36.", misconceptionId: "E-d20-a" },
        { text: "0, -5, XL, 36", correct: false, feedback: "That's not descending.", misconceptionId: "E-d20-b" },
        { text: "-5, 0, 36, XL", correct: false, feedback: "That's ascending.", misconceptionId: "E-d20-c" }
      ],
    backward: "Convert all values to the same system before comparing.",
    forward: "Comparing mixed representations is common in data analysis.",
    misconceptions: [
      { misconceptionId: "E-d20-a", description: "Student places 36 before XL.", rootCause: "Notation Bias — treats the Roman numeral XL as though its unfamiliar form makes it smaller than an ordinary Arabic numeral, without actually converting it to 40 and comparing values.", remediation: "Convert every value to a single common representation (Hindu-Arabic) before comparing or ordering — never compare across notations directly." },
      { misconceptionId: "E-d20-b", description: "Student writes 0, -5, XL, 36, mixing the order.", rootCause: "Partial Conversion — converts some values but not others before ordering, leading to an inconsistent comparison where XL is placed among the smaller values without being converted.", remediation: "Convert all four values to numbers first — XL=40, 36, -5, 0 — and only then sort them, rather than sorting some converted and some not." },
      { misconceptionId: "E-d20-c", description: "Student writes -5, 0, 36, XL, which is ascending order.", rootCause: "Direction Reversal — correctly converts and ranks all four values but writes them smallest-to-largest, confusing \"descending\" with \"ascending\".", remediation: "Anchor the vocabulary physically: descending = walking down stairs = largest first. Say the meaning aloud before ordering." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Convert everything", hint: "Convert XL to a Hindu-Arabic number before doing anything else." },
      { level: 2, description: "List all four values", hint: "Write all four as plain numbers: 40, 36, -5, 0." },
      { level: 3, description: "Order descending", hint: "Arrange from largest to smallest." }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d21", order: 21, cluster: "ROUND", clusterName: CLUSTER_NAMES.ROUND,
    skillId: "ROUND-02",
    question: "A number between 500 and 600 is rounded to the nearest 100 and also to the nearest 10. The difference between the two rounded values is 40. The sum of its digits is 13 and the number is odd. What is the number?",
    options: [
        { text: "535", correct: true, feedback: "Rounded to 100: 500, to 10: 540. Difference 40. Sum 5+3+5=13, odd." },
        { text: "544", correct: false, feedback: "Sum is 13, but it's even.", misconceptionId: "E-d21-a" },
        { text: "540", correct: false, feedback: "Sum = 9, not 13, and even.", misconceptionId: "E-d21-b" },
        { text: "525", correct: false, feedback: "Rounded to 10: 530, not 540 (difference would be 30).", misconceptionId: "E-d21-c" }
      ],
    backward: "Find the numbers in the intersection that give a difference of 40, then apply the digit sum and odd condition.",
    forward: "Solving a problem with multiple overlapping conditions is a valuable skill.",
    misconceptions: [
      { misconceptionId: "E-d21-a", description: "Student picks 544, satisfying the difference and digit-sum conditions but not the odd condition.", rootCause: "Condition Neglect — checks the rounding-difference and digit-sum conditions but forgets to verify the final \"and the number is odd\" condition.", remediation: "List every condition stated in the problem, including parity, and verify a candidate against all of them before finalising." },
      { misconceptionId: "E-d21-b", description: "Student picks 540, which fails both the digit-sum and parity conditions.", rootCause: "Rounded-Value Confusion — selects one of the rounded values (540, the nearest-10 result) itself as if it were the original number, rather than finding an original number whose roundings produce that difference.", remediation: "Distinguish clearly between the original unknown number and its rounded results — the rounded values are outputs, not the answer itself." },
      { misconceptionId: "E-d21-c", description: "Student picks 525, which does not actually produce a difference of 40.", rootCause: "Difference Mischeck — assumes the rounding difference works out to 40 without actually computing both roundings for this candidate (rounds to 500 and 530, a difference of only 30).", remediation: "Compute both roundings explicitly for each candidate and subtract them, rather than assuming the difference condition is satisfied." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Set up both roundings", hint: "For a candidate number, compute its nearest-100 and nearest-10 roundings." },
      { level: 2, description: "Check the difference", hint: "Subtract the two rounded values. Does the difference equal 40?" },
      { level: 3, description: "Apply digit sum and parity", hint: "Among candidates with a difference of 40, which has digit sum 13 and is odd?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.4.NBT.A.3"]
  },
  {
    itemId: "d22", order: 22, cluster: "ROMAN", clusterName: CLUSTER_NAMES.ROMAN,
    skillId: "ROM-03",
    question: "Solve: XC ÷ V + XII and write the answer in Roman numerals.",
    options: [
        { text: "XXX", correct: true, feedback: "90 ÷ 5 = 18, 18 + 12 = 30 = XXX." },
        { text: "XX", correct: false, feedback: "20 is too low.", misconceptionId: "E-d22-a" },
        { text: "XL", correct: false, feedback: "40 is incorrect.", misconceptionId: "E-d22-b" },
        { text: "L", correct: false, feedback: "50 is too high.", misconceptionId: "E-d22-c" }
      ],
    backward: "Division first, then addition.",
    forward: "Remembering order of operations across numeral systems is important.",
    misconceptions: [
      { misconceptionId: "E-d22-a", description: "Student answers XX (20), ten too low.", rootCause: "Division Slip — miscomputes 90÷5, likely as 8 instead of 18, before adding 12.", remediation: "Perform the division as a standard written algorithm: 90 ÷ 5 = 18, checked by multiplying back (5 × 18 = 90)." },
      { misconceptionId: "E-d22-b", description: "Student answers XL (40), ten too high.", rootCause: "Addition Slip — correctly divides (90÷5=18) but miscomputes the addition, adding 22 instead of 12, or misconverting XII.", remediation: "Convert XII to its numeric value (12) explicitly and double-check before adding to the division result." },
      { misconceptionId: "E-d22-c", description: "Student answers L (50), significantly overshooting.", rootCause: "Digit Miscount — misreads XC (90) during conversion, perhaps as a larger value, inflating the whole calculation before dividing and adding.", remediation: "Convert XC carefully as a subtractive pair (100-10=90) before performing any further operations." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Convert to numbers", hint: "XC = 90. V = 5. XII = 12." },
      { level: 2, description: "Divide first", hint: "90 ÷ 5 = ?" },
      { level: 3, description: "Add and convert back", hint: "Add 12 to your division result, then convert to Roman numerals." }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d23", order: 23, cluster: "NEG", clusterName: CLUSTER_NAMES.NEG,
    skillId: "NEG-02",
    question: "A lift starts at floor 2. It goes down 5 floors, up 3 floors, down 2 floors, and finally up 4 floors. What floor does it reach?",
    options: [
        { text: "2", correct: true, feedback: "2 - 5 = -3; -3 + 3 = 0; 0 - 2 = -2; -2 + 4 = 2." },
        { text: "0", correct: false, feedback: "You missed the final up 4.", misconceptionId: "E-d23-a" },
        { text: "-2", correct: false, feedback: "You stopped before the last step.", misconceptionId: "E-d23-b" },
        { text: "4", correct: false, feedback: "Incorrect calculation.", misconceptionId: "E-d23-c" }
      ],
    backward: "Track the floor number step by step, using negative numbers for basements.",
    forward: "Lift logic appears in programming and real-world building navigation.",
    misconceptions: [
      { misconceptionId: "E-d23-a", description: "Student answers 0, dropping or misapplying one move in the middle of the chain.", rootCause: "Incomplete Chain — correctly starts the sequence but drops or duplicates one of the four moves partway through, landing at 0 instead of tracking all four moves (down 5, up 3, down 2, up 4) to the true final floor.", remediation: "Count the number of moves stated in the problem (four) before starting, and check off each one as it is applied." },
      { misconceptionId: "E-d23-b", description: "Student answers -2, stopping before the final move.", rootCause: "Incomplete Chain — correctly computes the running floor through the third move (2-5+3-2=-2) but forgets to apply the final \"up 4\" move.", remediation: "Re-read the question to count exactly how many moves are described, and confirm the final answer reflects every single one." },
      { misconceptionId: "E-d23-c", description: "Student answers 4, mishandling the signs partway through.", rootCause: "Direction Confusion — applies one or more of the moves with the wrong sign (e.g. treating a \"down\" as \"up\" or vice versa) somewhere in the four-step chain.", remediation: "State the rule and reuse it at every step: down = subtract, up = add — apply it move by move, writing the running floor number after each one." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Mark the start", hint: "Mark floor 2 on a vertical number line." },
      { level: 2, description: "Apply each move in order", hint: "Down 5, up 3, down 2, up 4 — apply them one at a time, writing the running floor after each." },
      { level: 3, description: "Confirm the final floor", hint: "What floor do you reach after all four moves?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d24", order: 24, cluster: "CONV", clusterName: CLUSTER_NAMES.CONV,
    skillId: "CONV-02",
    question: "A state's population is 8,765,432 (International). Express this in the Indian system and then round it to the nearest lakh.",
    options: [
        { text: "88,00,000", correct: true, feedback: "8,765,432 International = 87,65,432 Indian. Nearest lakh: ten-thousands digit 6 ≥5 → round up to 88,00,000." },
        { text: "87,65,000", correct: false, feedback: "You rounded to the nearest thousand instead.", misconceptionId: "E-d24-a" },
        { text: "87,00,000", correct: false, feedback: "You rounded down incorrectly.", misconceptionId: "E-d24-b" },
        { text: "8,800,000", correct: false, feedback: "That's International notation, not Indian.", misconceptionId: "E-d24-c" }
      ],
    backward: "Convert, then round using the ten-thousands digit.",
    forward: "Census data often needs to be converted and rounded.",
    misconceptions: [
      { misconceptionId: "E-d24-a", description: "Student answers 87,65,000, rounding to the wrong place.", rootCause: "Target-Place Slip — rounds to the nearest thousand instead of the nearest lakh, using the wrong decision digit entirely.", remediation: "Circle the lakhs digit before rounding to lock in the correct target place, and check the ten-thousands digit as the decision digit." },
      { misconceptionId: "E-d24-b", description: "Student answers 87,00,000, rounding down when the digit signals rounding up.", rootCause: "Direction Default — rounds down without checking the ten-thousands digit (6), which is ≥5 and signals a round up.", remediation: "Check the ten-thousands digit every time before deciding direction: 6 ≥ 5 means round up." },
      { misconceptionId: "E-d24-c", description: "Student answers 8,800,000, leaving the answer in International notation.", rootCause: "Notation Non-Conversion — correctly rounds the value but stops before regrouping into Indian-style commas, submitting the International-grouped form instead.", remediation: "Treat \"express in the Indian system\" as a required final formatting step — always regroup as 3, then 2, 2, 2… before finishing." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Convert to Indian first", hint: "Regroup 8,765,432 into Indian-style commas: 87,65,432." },
      { level: 2, description: "Identify the decision digit", hint: "For nearest lakh, check the ten-thousands digit (6)." },
      { level: 3, description: "Round and format", hint: "Round up since 6 ≥ 5, and write the result with Indian commas." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "CONV-01", probability: 0.3, condition: "If not remediated before direct-format Indian–International conversions" }
    ],
    learningObjectives: ["CCSS.MATH.4.NBT.A.3"]
  }
];

const recheckItems = [
  {
    itemId: "r1", order: 1, cluster: "PLACE", clusterName: CLUSTER_NAMES.PLACE,
    skillId: "PV-05",
    question: "A number lies between 3,20,000 and 3,30,000. The thousands digit is the square of the hundreds digit. The sum of all six digits is 16. Which number could it be?",
    options: [
        { text: "3,24,250", correct: true, feedback: "Thousands=4, hundreds=2 (2²=4). Sum=3+2+4+2+5+0=16." },
        { text: "3,24,105", correct: false, feedback: "Sum=3+2+4+1+0+5=15, not 16, and hundreds 1, but 1²=1≠4.", misconceptionId: "E-r1-a" },
        { text: "3,25,150", correct: false, feedback: "Thousands=5, but 5 is not a square of any digit (5²=25).", misconceptionId: "E-r1-b" },
        { text: "3,23,350", correct: false, feedback: "Thousands=3, 3²=9, not 3.", misconceptionId: "E-r1-c" }
      ],
    misconceptions: [
      { misconceptionId: "E-r1-a", description: "Student picks 3,24,105, which fails both conditions.", rootCause: "Relationship Misapplication — accepts thousands=4 and hundreds=1 as satisfying the squaring condition without computing 1²=1 (not 4), and also does not verify the digit-sum condition.", remediation: "Compute the square of the candidate hundreds digit explicitly every time and compare it exactly to the thousands digit before checking any other condition." },
      { misconceptionId: "E-r1-b", description: "Student picks 3,25,150, where the thousands digit is not a perfect square of any single digit.", rootCause: "Relationship Misapplication — treats thousands=5 as satisfying a squaring relationship without checking whether 5 is actually the square of any single digit (it is not, since digit squares are 0,1,4,9,16,25,36,49,64,81 and only 0,1,4,9 are single digits).", remediation: "Build a reference table of single-digit squares (0,1,4,9) and check the thousands digit against that table directly." },
      { misconceptionId: "E-r1-c", description: "Student picks 3,23,350, where the relationship does not hold.", rootCause: "Relationship Misapplication — assumes thousands=3 satisfies \"thousands is the square of hundreds\" without checking that 3²=9, not 3.", remediation: "Compute the square of the hundreds digit explicitly (3²=9) and confirm it matches the thousands digit before accepting a candidate." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "List both conditions", hint: "List: (1) thousands = (hundreds)², (2) digit sum = 16." },
      { level: 2, description: "Test the squaring condition", hint: "For each candidate, compute (hundreds digit)² and compare to the thousands digit." },
      { level: 3, description: "Test the digit sum", hint: "Among the survivors, which one sums to 16?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "r2", order: 2, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    skillId: "PV-05",
    question: "What is the smallest 5-digit number (Indian system) that uses all the digits 1, 2, 3, 4, 5 exactly once, and where the number formed by the first two digits is a multiple of 4?",
    options: [
        { text: "12,345", correct: true, feedback: "First two digits 12, a multiple of 4. Smallest arrangement then 12,345." },
        { text: "13,245", correct: false, feedback: "13 is not a multiple of 4.", misconceptionId: "E-r2-a" },
        { text: "12,354", correct: false, feedback: "Not the smallest order of the last three digits.", misconceptionId: "E-r2-b" },
        { text: "21,345", correct: false, feedback: "21 is not a multiple of 4, and 21,345 is larger.", misconceptionId: "E-r2-c" }
      ],
    misconceptions: [
      { misconceptionId: "E-r2-a", description: "Student picks 13,245, where the leading pair fails the multiple-of-4 condition.", rootCause: "Condition Neglect — arranges the digits into a plausible-looking small number without checking whether the leading two-digit pair (13) is actually a multiple of 4.", remediation: "Test the multiple-of-4 condition on the leading two digits directly (divide by 4 and check for remainder zero) before minimizing anything else." },
      { misconceptionId: "E-r2-b", description: "Student picks 12,354, satisfying the leading condition but not minimizing the rest.", rootCause: "Partial Optimization — correctly fixes the first two digits (12, a multiple of 4) but fails to arrange the remaining digits (3, 4, 5) in ascending order.", remediation: "After fixing any required leading digits, sort all remaining digits into ascending order explicitly before writing the rest of the number." },
      { misconceptionId: "E-r2-c", description: "Student picks 21,345, where the leading pair fails the condition and the number is not smallest.", rootCause: "Divisibility Mischeck — assumes 21 is a multiple of 4 without actually dividing (21÷4=5.25, not a whole number), and does not compare against the smaller valid option.", remediation: "Actually divide each candidate leading pair by 4 and check for a remainder of zero, rather than guessing from appearance." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find valid leading pairs", hint: "Which two-digit combinations of 1,2,3,4,5 are multiples of 4? (Hint: 12 works.)" },
      { level: 2, description: "Fix the smallest valid pair", hint: "Among valid pairs, which gives the smallest leading two digits?" },
      { level: 3, description: "Minimize the rest", hint: "Sort the remaining digits in ascending order after the fixed pair." }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "r3", order: 3, cluster: "ROUND", clusterName: CLUSTER_NAMES.ROUND,
    skillId: "ROUND-02",
    question: "A number rounded to the nearest 100 is 9,400, and rounded to the nearest 10 is 9,350. The number is a multiple of 10. What is it?",
    options: [
        { text: "9,350", correct: true, feedback: "9,350 → nearest 100: 9,400 (tens 5); nearest 10: 9,350; and it's a multiple of 10." },
        { text: "9,345", correct: false, feedback: "Nearest 10: 9,350? 9,345 rounds to 9,350 (ones 5), but not a multiple of 10.", misconceptionId: "E-r3-a" },
        { text: "9,449", correct: false, feedback: "Nearest 10: 9,450.", misconceptionId: "E-r3-b" },
        { text: "9,355", correct: false, feedback: "Nearest 10: 9,360.", misconceptionId: "E-r3-c" }
      ],
    misconceptions: [
      { misconceptionId: "E-r3-a", description: "Student picks 9,345, which satisfies the rounding conditions but not the multiple-of-10 condition.", rootCause: "Condition Neglect — verifies the two rounding conditions and stops checking, forgetting the problem has a third, independent condition (multiple of 10) that must also hold.", remediation: "List every condition stated in the problem, including the multiple-of-10 condition, and verify a candidate against all of them." },
      { misconceptionId: "E-r3-b", description: "Student picks 9,449, which fails the nearest-10 condition.", rootCause: "Interval-Boundary Oversight — assumes 9,449 is close enough to round to 9,350 (nearest 10), without checking that it actually rounds to 9,450.", remediation: "Test each candidate directly against the nearest-10 rounding rule (check the ones digit) rather than judging by approximate closeness." },
      { misconceptionId: "E-r3-c", description: "Student picks 9,355, which fails the nearest-10 condition.", rootCause: "Interval-Boundary Oversight — assumes 9,355 rounds to 9,350, missing that its ones digit (5) actually rounds it up to 9,360.", remediation: "Compute the exact nearest-10 interval for the target and test whether each candidate genuinely falls within it." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find both intervals", hint: "Nearest 100 = 9,400 gives one interval. Nearest 10 = 9,350 gives a narrower interval." },
      { level: 2, description: "Intersect the intervals", hint: "Which numbers fall in both intervals?" },
      { level: 3, description: "Apply the multiple-of-10 condition", hint: "Among the overlap, which is a multiple of 10?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.4.NBT.A.3"]
  },
  {
    itemId: "r4", order: 4, cluster: "ROMAN", clusterName: CLUSTER_NAMES.ROMAN,
    skillId: "ROM-03",
    question: "Find the difference between CXL and LXXIX, then round down to the nearest X and write in Roman numerals.",
    options: [
        { text: "LX", correct: true, feedback: "140 - 79 = 61. Rounded down to nearest 10 is 60 = LX." },
        { text: "L", correct: false, feedback: "50 is too low; the difference is 61, rounding down to 60.", misconceptionId: "E-r4-a" },
        { text: "LXX", correct: false, feedback: "70 is too high.", misconceptionId: "E-r4-b" },
        { text: "XLI", correct: false, feedback: "41 is far too low.", misconceptionId: "E-r4-c" }
      ],
    misconceptions: [
      { misconceptionId: "E-r4-a", description: "Student answers L (50), rounding too far down.", rootCause: "Direction Default — rounds down aggressively past the correct nearest-10 value, perhaps truncating to the nearest 10 below rather than the true nearest 10 (rounding down as instructed but overshooting past 60).", remediation: "First find the exact difference (61), then apply \"round down to nearest 10\" as a specific instruction meaning drop to 60, not further." },
      { misconceptionId: "E-r4-b", description: "Student answers LXX (70), rounding up instead of down.", rootCause: "Instruction Misread — ignores the explicit \"round down\" instruction and instead rounds the difference (61) up to the nearer multiple of 10, landing on 70 rather than obeying the stated direction.", remediation: "Recompute the difference carefully (140-79=61) and follow the explicit \"round down\" instruction literally — 61 rounds down to 60, never up, regardless of standard nearest-10 rules." },
      { misconceptionId: "E-r4-c", description: "Student answers XLI (41), a major miscalculation of the difference.", rootCause: "Subtraction Slip — miscomputes 140-79, likely mishandling the borrow across the tens and hundreds columns.", remediation: "Perform the subtraction as a standard written algorithm with borrowing shown explicitly: 140-79, borrowing from the hundreds and tens columns as needed." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Convert both numerals", hint: "CXL = 140. LXXIX = 79." },
      { level: 2, description: "Subtract", hint: "140 - 79 = ?" },
      { level: 3, description: "Round down and convert back", hint: "Round your difference down to the nearest 10, then convert to Roman numerals." }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "r5", order: 5, cluster: "NEG", clusterName: CLUSTER_NAMES.NEG,
    skillId: "NEG-02",
    question: "A hiker starts at 150 m above sea level. She descends 200 m, then climbs 80 m, then descends 30 m. What is her final elevation?",
    options: [
        { text: "0 m", correct: true, feedback: "150 - 200 = -50; -50 + 80 = 30; 30 - 30 = 0." },
        { text: "-20 m", correct: false, feedback: "Incorrect calculation.", misconceptionId: "E-r5-a" },
        { text: "60 m", correct: false, feedback: "Ignored the negative.", misconceptionId: "E-r5-b" },
        { text: "-80 m", correct: false, feedback: "Sign error.", misconceptionId: "E-r5-c" }
      ],
    misconceptions: [
      { misconceptionId: "E-r5-a", description: "Student answers -20 m, a miscalculation partway through the chain.", rootCause: "Arithmetic Slip — makes an error in one of the intermediate steps, losing track of the correct running total.", remediation: "Write the running total explicitly after every single move, checking each addition or subtraction individually before moving to the next." },
      { misconceptionId: "E-r5-b", description: "Student answers 60 m, dropping the negative sign that appears mid-chain.", rootCause: "Sign-Dropping — after the first descent produces a negative running total (-50), treats subsequent numbers as though the running total were still positive.", remediation: "Track the sign of the running total explicitly at every step — once it goes negative, it stays negative until enough positive moves bring it back above zero." },
      { misconceptionId: "E-r5-c", description: "Student answers -80 m, mishandling one of the direction signs.", rootCause: "Direction Confusion — treats one of the moves with the wrong sign, likely subtracting when a climb should add.", remediation: "State the rule and reuse it at every step: descend = subtract, climb = add — apply it move by move, writing the sign explicitly each time." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Mark the start", hint: "Mark 150 on a vertical number line." },
      { level: 2, description: "Apply each move in order", hint: "Descend 200 (subtract), climb 80 (add), descend 30 (subtract) — one step at a time." },
      { level: 3, description: "Confirm the final total", hint: "What is the running total after all three moves?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "r6", order: 6, cluster: "CONV", clusterName: CLUSTER_NAMES.CONV,
    skillId: "CONV-01",
    question: "A river is 12,34,000 m long (Indian system). Write its length in km using the International system.",
    options: [
        { text: "1,234 km", correct: true, feedback: "12,34,000 m = 1,234 km. International: 1,234 km." },
        { text: "1,23,400 km", correct: false, feedback: "That's Indian grouping and wrong conversion.", misconceptionId: "E-r6-a" },
        { text: "12.34 km", correct: false, feedback: "Divided by 100,000 by mistake.", misconceptionId: "E-r6-b" },
        { text: "123.4 km", correct: false, feedback: "Divided by 10,000 incorrectly.", misconceptionId: "E-r6-c" }
      ],
    misconceptions: [
      { misconceptionId: "E-r6-a", description: "Student writes 1,23,400 km, leaving the answer in Indian notation and not actually converting units.", rootCause: "Notation Non-Conversion — regroups the digits with Indian commas but forgets to actually divide by 1,000 to convert metres to kilometres.", remediation: "Treat unit conversion (m to km, divide by 1,000) and notation conversion (Indian to International commas) as two separate required steps." },
      { misconceptionId: "E-r6-b", description: "Student writes 12.34 km, dividing by the wrong factor.", rootCause: "Divisor Slip — divides by 100,000 instead of 1,000, removing two extra zeros from the conversion.", remediation: "Recall the exact conversion factor: 1 km = 1,000 m, so dividing by 1,000 (moving the decimal three places) converts metres to kilometres." },
      { misconceptionId: "E-r6-c", description: "Student writes 123.4 km, dividing by the wrong factor.", rootCause: "Divisor Slip — divides by 10,000 instead of 1,000, removing one extra zero from the conversion.", remediation: "Count the zeros in the conversion factor (1,000 has three zeros) and move the decimal point exactly three places, not more." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the conversion factor", hint: "1 km = 1,000 m." },
      { level: 2, description: "Divide", hint: "12,34,000 ÷ 1,000 = ?" },
      { level: 3, description: "Format the answer", hint: "Write your answer using International-style commas if needed." }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "r7", order: 7, cluster: "PLACE", clusterName: CLUSTER_NAMES.PLACE,
    skillId: "PV-05",
    question: "What is the greatest 6-digit Indian system number where the lakhs digit is 7, the ten-thousands digit is a prime, the thousands digit is a cube number, and all digits are different?",
    options: [
        { text: "7,58,964", correct: true, feedback: "7, then 5 (largest available prime), 8 (largest available cube), then the remaining 9,6,4 placed descending." },
        { text: "7,85,963", correct: false, feedback: "Ten-thousands 8 is not prime.", misconceptionId: "E-r7-a" },
        { text: "7,57,963", correct: false, feedback: "Thousands 7 is not a cube.", misconceptionId: "E-r7-b" },
        { text: "7,58,963", correct: false, feedback: "Uses 3 in the ones place, but 4 was still available and is larger — not fully maximized.", misconceptionId: "E-r7-c" }
      ],
    misconceptions: [
      { misconceptionId: "E-r7-a", description: "Student picks 7,85,963, where the ten-thousands digit (8) is not prime.", rootCause: "Relationship Misapplication — treats 8 as satisfying the \"prime\" condition without checking against the actual list of single-digit primes (2, 3, 5, 7).", remediation: "Build a reference list of single-digit primes (2, 3, 5, 7) and single-digit cubes (0, 1, 8) and check each candidate digit against the correct list." },
      { misconceptionId: "E-r7-b", description: "Student picks 7,57,963, where the thousands digit (7) is not a cube.", rootCause: "Relationship Misapplication — treats 7 as satisfying the \"cube\" condition, confusing it with a prime digit (which it also happens to be) rather than checking the cube list (0, 1, 8).", remediation: "Keep the prime-digit list and cube-digit list separate and check each condition against its own correct list, not a merged or confused one." },
      { misconceptionId: "E-r7-c", description: "Student picks 7,58,963, correctly satisfying the prime and cube conditions but not fully maximizing the remaining digits.", rootCause: "Partial Optimization — correctly fixes the lakhs, ten-thousands (5), and thousands (8) digits but arranges the remaining pool {9,6,4,3} by using 3 in the ones place instead of the larger available 4, missing that 964 > 963.", remediation: "After fixing the constrained digits, list every remaining unused digit and sort all of them in descending order before writing the rest of the number — don't stop checking once one valid arrangement is found." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Build reference lists", hint: "List single-digit primes (2,3,5,7) and single-digit cubes (0,1,8)." },
      { level: 2, description: "Maximize ten-thousands and thousands", hint: "Pick the largest prime for ten-thousands and largest cube for thousands." },
      { level: 3, description: "Maximize the rest", hint: "Arrange the remaining distinct digits in descending order." }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "r8", order: 8, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    skillId: "PV-05",
    question: "I am a 4-digit number. My thousands digit is twice my tens digit. My hundreds digit is the sum of my thousands and units digits. The tens digit is odd. The number is less than 5,000. Which could I be?",
    options: [
        { text: "2412", correct: true, feedback: "2 = 2×1 (tens 1 odd), hundreds 4 = 2+2, 2412<5000." },
        { text: "4824", correct: false, feedback: "Tens digit 2 is even, so fails the odd condition.", misconceptionId: "E-r8-a" },
        { text: "3621", correct: false, feedback: "3 ≠ 2×2.", misconceptionId: "E-r8-b" },
        { text: "1206", correct: false, feedback: "Thousands 1, tens 0.5 not integer.", misconceptionId: "E-r8-c" }
      ],
    misconceptions: [
      { misconceptionId: "E-r8-a", description: "Student picks 4824, which satisfies some relationships but fails the odd-tens condition.", rootCause: "Single-Clue Verification — checks the thousands-tens relationship and the hundreds relationship without checking the stated \"tens digit is odd\" condition, missing that 2 is even.", remediation: "Build a checklist of all stated clues before testing any candidate, and work through the checklist completely for each option, including parity conditions." },
      { misconceptionId: "E-r8-b", description: "Student picks 3621, where the thousands-tens relationship does not hold.", rootCause: "Relationship Misapplication — accepts thousands=3 and tens=2 as satisfying \"thousands is twice tens\" without computing 2×2=4 (not 3).", remediation: "Translate the clue into an explicit equation (thousands = 2 × tens) and substitute the candidate's actual digits before judging whether it holds." },
      { misconceptionId: "E-r8-c", description: "Student picks 1206, which does not even produce whole-number digits under the stated relationship.", rootCause: "Relationship Misapplication — works backward from the thousands digit to imply a non-integer tens digit rather than testing whether the candidate's actual tens digit satisfies the relationship as given.", remediation: "Always substitute the candidate's actual digits into the stated equation and check both sides match — do not solve for a required digit unless the candidate is already fixed." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Translate the clues", hint: "Write each clue as an equation: Th = 2×Te; H = Th+U; Te is odd; number < 5000." },
      { level: 2, description: "Test each candidate fully", hint: "For each option, check every equation, not just the first one." },
      { level: 3, description: "Confirm all conditions", hint: "Does your chosen candidate satisfy every single clue?" }
    ],
    forwardRiskLinks: [
      { targetSkillId: "ALG-01", probability: 0.3, condition: "If not remediated before solving simple equations with unknowns" }
    ],
    learningObjectives: []
  },
  {
    itemId: "r9", order: 9, cluster: "ROUND", clusterName: CLUSTER_NAMES.ROUND,
    skillId: "ROUND-02",
    question: "A number is rounded to the nearest 100 to get 3,200, and to the nearest 10 to get 3,180. The number is a multiple of 9. What is it?",
    options: [
        { text: "3,177", correct: true, feedback: "Range for 100: 3,150-3,249; for 10: 3,175-3,184. Intersection 3,175-3,184. Multiples of 9 in that range: 3,177 (9×353)." },
        { text: "3,186", correct: false, feedback: "Multiple of 9 but outside the intersection.", misconceptionId: "E-r9-a" },
        { text: "3,181", correct: false, feedback: "Not a multiple of 9.", misconceptionId: "E-r9-b" },
        { text: "3,175", correct: false, feedback: "Not a multiple of 9.", misconceptionId: "E-r9-c" }
      ],
    misconceptions: [
      { misconceptionId: "E-r9-a", description: "Student picks 3,186, a multiple of 9 outside the valid interval.", rootCause: "Single-Condition Focus — checks the multiple-of-9 condition first and finds a valid one, without confirming it also falls inside the intersected rounding interval [3,175, 3,184].", remediation: "Find the intersected interval first, then search for multiples of 9 only within that narrowed range." },
      { misconceptionId: "E-r9-b", description: "Student picks 3,181, which falls in the interval but is not a multiple of 9.", rootCause: "Divisibility Mischeck — assumes 3,181 is a multiple of 9 without actually dividing (3,181÷9 is not a whole number), perhaps estimating based on digit appearance.", remediation: "Actually divide each candidate by 9 and check for a remainder of zero, rather than guessing from appearance." },
      { misconceptionId: "E-r9-c", description: "Student picks 3,175, the boundary of the interval but not a multiple of 9.", rootCause: "Boundary-Value Assumption — assumes the boundary of a valid interval is automatically the answer, without checking the remaining multiple-of-9 condition.", remediation: "Treat the interval boundaries only as the search range, not as automatic answers — still test the additional condition on every candidate within that range." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find both intervals", hint: "Nearest 100 = 3,200 gives one interval. Nearest 10 = 3,180 gives a narrower interval." },
      { level: 2, description: "Intersect the intervals", hint: "Which numbers fall in both intervals at once?" },
      { level: 3, description: "Apply the multiple-of-9 condition", hint: "Within that overlap, which number divides evenly by 9?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.4.NBT.A.3"]
  },
  {
    itemId: "r10", order: 10, cluster: "ROMAN", clusterName: CLUSTER_NAMES.ROMAN,
    skillId: "ROM-03",
    question: "Calculate (C + XXV) ÷ V and write the answer in Roman numerals.",
    options: [
        { text: "XXV", correct: true, feedback: "100+25=125, ÷5=25 = XXV." },
        { text: "V", correct: false, feedback: "5, too small.", misconceptionId: "E-r10-a" },
        { text: "XX", correct: false, feedback: "20, not correct.", misconceptionId: "E-r10-b" },
        { text: "XXX", correct: false, feedback: "30.", misconceptionId: "E-r10-c" }
      ],
    misconceptions: [
      { misconceptionId: "E-r10-a", description: "Student answers V (5), far too small.", rootCause: "Operation-Order Error — divides before adding, computing C÷V+XXV or a similarly malformed combination, rather than following the brackets (addition first).", remediation: "Follow the brackets exactly as written: perform the addition inside the parentheses first, then divide the result." },
      { misconceptionId: "E-r10-b", description: "Student answers XX (20), five too low.", rootCause: "Addition Slip — miscomputes 100+25 as 100, then divides, or makes a similar error before the division step.", remediation: "Compute the addition inside the brackets fully and explicitly (100+25=125) before doing anything else." },
      { misconceptionId: "E-r10-c", description: "Student answers XXX (30), five too high.", rootCause: "Division Slip — miscomputes 125÷5 as a value 5 higher than 25, perhaps mis-estimating the division.", remediation: "Perform the division as a standard written algorithm: 125 ÷ 5 = 25, checked by multiplying back (5 × 25 = 125)." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Add inside the brackets", hint: "C + XXV = 100 + 25 = ?" },
      { level: 2, description: "Divide", hint: "Divide your sum by 5." },
      { level: 3, description: "Convert back", hint: "Write your result as a Roman numeral." }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "r11", order: 11, cluster: "NEG", clusterName: CLUSTER_NAMES.NEG,
    skillId: "NEG-02",
    question: "A bank balance is -₹800. The owner deposits ₹1,500, withdraws ₹1,000, then deposits ₹200. Final balance?",
    options: [
        { text: "-₹100", correct: true, feedback: "-800+1500=700; 700-1000=-300; -300+200=-100." },
        { text: "₹100", correct: false, feedback: "Sign error.", misconceptionId: "E-r11-a" },
        { text: "-₹500", correct: false, feedback: "Miscalculation.", misconceptionId: "E-r11-b" },
        { text: "₹500", correct: false, feedback: "Incorrect.", misconceptionId: "E-r11-c" }
      ],
    misconceptions: [
      { misconceptionId: "E-r11-a", description: "Student answers ₹100, getting the magnitude right but the sign wrong.", rootCause: "Sign-Assignment Error — correctly computes the numeric magnitude through the chain of transactions but attaches the wrong sign to the final answer.", remediation: "Track the running balance's sign explicitly after every single transaction, confirming whether it is positive or negative before writing the final answer." },
      { misconceptionId: "E-r11-b", description: "Student answers -₹500, a miscalculation partway through the chain.", rootCause: "Arithmetic Slip — makes an error in one of the intermediate steps, losing track of the correct running balance.", remediation: "Write the running balance explicitly after every single transaction, checking each addition or subtraction individually." },
      { misconceptionId: "E-r11-c", description: "Student answers ₹500, both magnitude and sign incorrect.", rootCause: "Operation-Order Error — combines the transactions in the wrong order or groups deposits and withdrawals separately rather than applying each one to the running balance in sequence.", remediation: "Process transactions strictly in the order given, writing the running balance after each single step, never grouping deposits or withdrawals together." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "List the transactions in order", hint: "Start: -800. Then +1500, then -1000, then +200." },
      { level: 2, description: "Apply them one at a time", hint: "Compute the running balance after each transaction, writing each one down." },
      { level: 3, description: "Confirm the final value", hint: "What is the balance after all transactions have been applied?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "r12", order: 12, cluster: "CONV", clusterName: CLUSTER_NAMES.CONV,
    skillId: "CONV-02",
    question: "The area of a farm is 56,78,900 sq m (Indian). Round this area to the nearest lakh sq m and write the result in the International system.",
    options: [
        { text: "5,700,000", correct: true, feedback: "56,78,900 → nearest lakh: ten-thousands 7≥5 → round up to 57,00,000 Indian. International = 5,700,000." },
        { text: "5,600,000", correct: false, feedback: "Rounded down incorrectly.", misconceptionId: "E-r12-a" },
        { text: "56,00,000", correct: false, feedback: "Indian notation, not International.", misconceptionId: "E-r12-b" },
        { text: "57,000,000", correct: false, feedback: "57 lakh in Indian is 57,00,000, which is 5,700,000, not 57 million.", misconceptionId: "E-r12-c" }
      ],
    misconceptions: [
      { misconceptionId: "E-r12-a", description: "Student answers 5,600,000, rounding down when the digit signals rounding up.", rootCause: "Direction Default — rounds down without checking the ten-thousands digit (7), which is ≥5 and signals a round up.", remediation: "Check the ten-thousands digit every time before deciding direction: 7 ≥ 5 means round up." },
      { misconceptionId: "E-r12-b", description: "Student answers 56,00,000, leaving the answer in Indian notation and without rounding.", rootCause: "Notation Non-Conversion — regroups the original figure into Indian commas but neither rounds it nor converts it to International format as required.", remediation: "Treat rounding and notation conversion as two separate required steps: round first, then reformat into the requested system." },
      { misconceptionId: "E-r12-c", description: "Student answers 57,000,000, a full order of magnitude too high.", rootCause: "Magnitude Inflation — misapplies the lakh-to-International conversion, treating 57 lakh as though it were 57 million.", remediation: "Anchor to the exact benchmark: 1 lakh = 100,000, so 57 lakh = 57 × 100,000 = 5,700,000, not 57,000,000." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Round first", hint: "Round 56,78,900 to the nearest lakh, checking the ten-thousands digit (7)." },
      { level: 2, description: "Confirm the rounded value", hint: "Your rounded Indian value should be 57,00,000." },
      { level: 3, description: "Convert to International", hint: "Regroup 57,00,000 into International-style commas: 5,700,000." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "CONV-01", probability: 0.3, condition: "If not remediated before direct-format Indian–International conversions" }
    ],
    learningObjectives: ["CCSS.MATH.4.NBT.A.3"]
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
    title: "Number Sense & Place Value — Problem-Solving & Synthesis",
    subtitle: "Telangana & Cambridge · Level 3 · Problem-Solving & Synthesis",
    description: "Multi-step synthesis problems that combine place value, rounding ranges, Roman-numeral arithmetic, multi-transaction negative numbers, and cross-system conversions.",
    clusterNames: CLUSTER_NAMES,
    gateReviewHTML: '<strong>Quick Review – Synthesis Tips</strong><br>' +
      "&bull; Combine place value with comparisons to crack digit puzzles.<br>" +
      "&bull; Use rounding to find possible ranges, then narrow down with digit rules.<br>" +
      "&bull; Convert Roman numerals to numbers, perform operations, and round results.<br>" +
      "&bull; Negative numbers can be part of multi-step problems (temperature, depth, lifts).<br>" +
      "&bull; Switch between Indian and International systems to compare populations or data.<br>",
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

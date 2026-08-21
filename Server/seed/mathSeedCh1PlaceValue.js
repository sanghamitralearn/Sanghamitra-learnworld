// seed/mathSeedCh1PlaceValue.js
//
// Populates math_chapters and math_questions with Grade 5, Chapter 1
// (Number Sense & Place Value), Level 1 (untimed core fluency) — the
// merged Telangana + Cambridge bootcamp originally authored as a
// standalone HTML file (ch-1-place-value-level-1.html).
//
// Run with: node seed/mathSeedCh1PlaceValue.js

const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = 'grade-5';
const GRADE_LABEL = 'Grade 5';
const CHAPTER_SLUG = 'ch-1-place-value';
const CHAPTER_NAME = 'Number Sense & Place Value';

const CLUSTER_NAMES = {
  PLACE: 'Place Value & Expanded Form',
  COMP: 'Comparing & Ordering Numbers',
  ROUND: 'Rounding & Estimation',
  ROMAN: 'Roman Numerals',
  NEG: 'Negative Numbers in Context',
  CONV: 'Indian – International System'
};

function opt(text, correct, feedback, misconceptionId) {
  return { text, correct, feedback, misconceptionId: misconceptionId || '' };
}

// ---------------------------------------------------------------------
// LEVEL 1 - Core Fluency (untimed)
// ---------------------------------------------------------------------

const level1Warmup = [
  {
    itemId: 'w1', order: 1, cluster: 'PLACE', clusterName: CLUSTER_NAMES.PLACE,
    skillId: 'PV-02',
    question: 'What is the place value of 5 in 2,53,410?',
    options: [
      opt('50,000', true, 'The 5 is in the ten-thousands place (Indian system).'),
      opt('5,000', false, 'That would be the thousands place.', 'E-w1-a'),
      opt('500', false, "That's the hundreds place.", 'E-w1-b'),
      opt('5,00,000', false, "That's the lakhs place.", 'E-w1-c')
    ],
    retryHint: 'Identify the period: 2,53,410 – the 5 is the first digit of the thousands period.',
    misconceptions: [
      {
        misconceptionId: 'E-w1-a',
        description: 'Student answers 5,000, reading the digit as if it sat in the thousands column.',
        rootCause: 'Digit-Order Reversal — inside a two-digit period the student names the digits right-to-left instead of left-to-right, so the ten-thousands digit gets read as if it were the thousands digit.',
        remediation: 'Underline each two-digit period as a pair and always read the LEFT digit first: in "53", 5 is ten-thousands and 3 is thousands. Practise with several period pairs before returning to the full number.'
      },
      {
        misconceptionId: 'E-w1-b',
        description: 'Student answers 500, treating 5 as though it sat two columns closer to the ones digit than it actually does.',
        rootCause: 'Place Miscounting — the student loses their column count partway through a six-digit number, often right after a comma, and lands short.',
        remediation: 'Build a six-column place-value chart: Lakhs, Ten-thousands, Thousands, Hundreds, Tens, Ones. Write 2,53,410 into it digit by digit before naming any single digit\'s value.'
      },
      {
        misconceptionId: 'E-w1-c',
        description: 'Student answers 5,00,000, promoting the digit to the very next period up.',
        rootCause: 'Period Promotion — the comma just before the 5 is mistaken for a signal that the 5 starts a new, higher period (lakhs) rather than sitting inside the period it is actually in.',
        remediation: 'Read the number aloud in words first — "two lakh, fifty-three thousand, four hundred ten" — so the student hears which period each digit belongs to before assigning it a numeral value.'
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: 'Mark the periods', hint: 'Split 2,53,410 into its comma groups: 2 | 53 | 410. Which group is the 5 sitting in?' },
      { level: 2, description: 'Read the period left to right', hint: 'Inside the group "53", the left digit (5) is ten-thousands and the right digit (3) is thousands.' },
      { level: 3, description: 'Multiply out', hint: '5 is in the ten-thousands place, so its value is 5 × 10,000 = ?' }
    ],
    forwardRiskLinks: [
      { targetSkillId: 'PV-03', probability: 0.8, condition: 'If not remediated before expanded-form work' },
      { targetSkillId: 'ADD-02', probability: 0.55, condition: 'If not remediated before column addition with 5+ digit numbers' }
    ],
    learningObjectives: ['CCSS.MATH.4.NBT.A.1', 'CCSS.MATH.4.NBT.A.2']
  },
  {
    itemId: 'w2', order: 2, cluster: 'COMP', clusterName: CLUSTER_NAMES.COMP,
    skillId: 'COMP-01',
    question: 'Which is larger? \\( 4,56,789 \\) or \\( 4,65,789 \\)?',
    options: [
      opt('\\( 4,65,789 \\)', true, 'Compare the ten-thousands place: 6 > 5.'),
      opt('\\( 4,56,789 \\)', false, 'Check the digit after 4: 5 < 6.', 'E-w2-a'),
      opt('They are equal', false, 'They differ in the ten-thousands place.', 'E-w2-b'),
      opt('Cannot compare', false, 'Both have six digits, so we can compare.', 'E-w2-c')
    ],
    retryHint: 'Start from the left and find the first place where the digits are different.',
    misconceptions: [
      {
        misconceptionId: 'E-w2-a',
        description: 'Student picks the smaller number, 4,56,789.',
        rootCause: 'Last-Digit Comparison — the student compares the rightmost digits (both 9, a tie) or some arbitrary digit instead of scanning left to right from the first place where the numbers actually differ.',
        remediation: 'Teach the "first difference wins" rule: scan strictly left to right and stop at the very first column where the digits differ — that single comparison decides the whole number.'
      },
      {
        misconceptionId: 'E-w2-b',
        description: 'Student answers "They are equal".',
        rootCause: 'Digit-Count Equivalence — because both numbers have the same number of digits and share several digits (4,_,_789), the student assumes matching digit count means matching value.',
        remediation: 'Show that digit count only proves the numbers are the same order of magnitude — it says nothing about which is bigger. Compare column by column regardless.'
      },
      {
        misconceptionId: 'E-w2-c',
        description: 'Student answers "Cannot compare".',
        rootCause: 'Comma Overload — the Indian-style commas make the number feel unfamiliar, so the student avoids comparing rather than risk a wrong scan.',
        remediation: 'Rewrite both numbers without commas, one above the other and aligned by place value, before comparing. Removing the punctuation often removes the hesitation.'
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: 'Line up the digits', hint: 'Write both numbers one under the other, ones under ones, tens under tens…' },
      { level: 2, description: 'Scan from the left', hint: 'Compare the leftmost digit of each number. The same? Move one column right.' },
      { level: 3, description: 'Find the first difference', hint: 'The digits first differ at the ten-thousands place: 5 vs 6. Which is bigger?' }
    ],
    forwardRiskLinks: [
      { targetSkillId: 'FRA-01', probability: 0.6, condition: 'If not remediated before comparing fractions with unlike denominators' },
      { targetSkillId: 'DEC-01', probability: 0.5, condition: 'If not remediated before ordering decimals' }
    ],
    learningObjectives: ['CCSS.MATH.4.NBT.A.2']
  },
  {
    itemId: 'w3', order: 3, cluster: 'ROUND', clusterName: CLUSTER_NAMES.ROUND,
    skillId: 'ROUND-01',
    question: 'Round 3,462 to the nearest 100.',
    options: [
      opt('3,500', true, 'The tens digit is 6 (≥5), so round up the hundreds digit from 4 to 5.'),
      opt('3,400', false, 'That would be rounding down; but the tens digit is 6, which means round up.', 'E-w3-a'),
      opt('3,000', false, "That's rounding to the nearest 1,000.", 'E-w3-b'),
      opt('3,460', false, "That's rounding to the nearest 10.", 'E-w3-c')
    ],
    retryHint: 'Look at the tens digit (the digit right after the hundreds place).',
    misconceptions: [
      {
        misconceptionId: 'E-w3-a',
        description: 'Student answers 3,400, rounding down regardless of the tens digit.',
        rootCause: 'Direction Default — the student rounds down out of habit without actually checking the deciding digit.',
        remediation: 'Make the rule explicit and non-negotiable: look at the digit right after the target place. 5 or more rounds up; anything less rounds down. Never guess the direction.'
      },
      {
        misconceptionId: 'E-w3-b',
        description: 'Student answers 3,000, one place value too coarse.',
        rootCause: 'Target-Place Slip — the student rounds to the nearest thousand instead of the nearest hundred.',
        remediation: 'Circle the hundreds digit before rounding, so the target place is visually locked in before any rounding decision is made.'
      },
      {
        misconceptionId: 'E-w3-c',
        description: 'Student answers 3,460, one place value too fine.',
        rootCause: 'Target-Place Slip (opposite direction) — the student rounds to the nearest ten and simply keeps the original digits instead of finding the true decision digit.',
        remediation: 'Ask "which digit am I allowed to change?" before rounding — for nearest-100, only the hundreds digit and everything after it may change.'
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: 'Circle the target place', hint: 'Circle the hundreds digit in 3,462.' },
      { level: 2, description: 'Check the decision digit', hint: 'Look at the digit right after the hundreds digit — the tens digit. Is it 5 or more?' },
      { level: 3, description: 'Round and clear', hint: 'Since the tens digit is 6, round the hundreds digit up and change everything after it to zero.' }
    ],
    forwardRiskLinks: [
      { targetSkillId: 'EST-01', probability: 0.65, condition: 'If not remediated before estimation word problems' }
    ],
    learningObjectives: ['CCSS.MATH.3.NBT.A.1']
  },
  {
    itemId: 'w4', order: 4, cluster: 'ROMAN', clusterName: CLUSTER_NAMES.ROMAN,
    skillId: 'ROM-01',
    question: 'Write 24 in Roman numerals.',
    options: [
      opt('XXIV', true, '20 (XX) + 4 (IV) = XXIV.'),
      opt('XIIV', false, 'Invalid; 4 is written as IV, not IIV.', 'E-w4-a'),
      opt('XXVI', false, 'XXVI = 26.', 'E-w4-b'),
      opt('XIV', false, 'XIV = 14.', 'E-w4-c')
    ],
    retryHint: 'Break 24 into 20 + 4 and convert each.',
    misconceptions: [
      {
        misconceptionId: 'E-w4-a',
        description: 'Student writes XIIV, stacking two I\'s before the V.',
        rootCause: 'Repeated Subtraction — the student tries to build 4 by writing two I\'s before the V, not knowing that only a single smaller symbol may ever precede a larger one for subtraction.',
        remediation: 'Teach the fixed subtractive pairs as a short memorised list: IV=4, IX=9, XL=40, XC=90, CD=400, CM=900. Nothing else is ever built by subtraction.'
      },
      {
        misconceptionId: 'E-w4-b',
        description: 'Student writes XXVI, which is actually 26.',
        rootCause: 'Addition Default — the student defaults to pure addition (XX + VI) instead of recognising that 4 needs the subtractive pair IV, effectively adding one symbol too many.',
        remediation: 'Break the target number into tens and ones first (24 = 20 + 4), convert each part separately, then join: XX + IV = XXIV.'
      },
      {
        misconceptionId: 'E-w4-c',
        description: 'Student writes XIV, which is actually 14.',
        rootCause: 'Tens Omission — the student correctly forms the subtractive pair for 4 (IV) but forgets to represent the tens (20) at all.',
        remediation: 'Always convert the largest place value first and write it down before touching the ones digit, so the tens component is never dropped.'
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: 'Split into tens and ones', hint: '24 = 20 + 4. Convert each part separately.' },
      { level: 2, description: 'Convert the tens', hint: '20 in Roman numerals is two X\'s: XX.' },
      { level: 3, description: 'Convert the ones and join', hint: '4 in Roman numerals is IV (one less than V). Join: XX + IV = ?' }
    ],
    forwardRiskLinks: [
      { targetSkillId: 'ROM-02', probability: 0.5, condition: 'If not remediated before Roman numerals above 100 using XC/CM' }
    ],
    learningObjectives: []
  },
  {
    itemId: 'w5', order: 5, cluster: 'NEG', clusterName: CLUSTER_NAMES.NEG,
    skillId: 'NEG-01',
    question: 'Which temperature is colder: \\( -3^\\circ\\text{C} \\) or \\( -1^\\circ\\text{C} \\)?',
    options: [
      opt('\\( -3^\\circ\\text{C} \\)', true, 'The more negative the number, the colder it is.'),
      opt('\\( -1^\\circ\\text{C} \\)', false, '-1 is warmer than -3.', 'E-w5-a'),
      opt('Both are the same', false, 'They are different numbers.', 'E-w5-b'),
      opt('Cannot say', false, 'Negative numbers can be compared on a number line.', 'E-w5-c')
    ],
    retryHint: 'Think of a thermometer: the lower down, the colder.',
    misconceptions: [
      {
        misconceptionId: 'E-w5-a',
        description: 'Student picks -1°C as colder.',
        rootCause: 'Magnitude-Only Comparison — the student compares the digits 3 and 1 as if both numbers were positive, and picks based on the smaller digit without accounting for the negative sign flipping the order.',
        remediation: 'Anchor negative numbers to a vertical thermometer or number line: further down/left always means colder/smaller, regardless of which digit looks bigger.'
      },
      {
        misconceptionId: 'E-w5-b',
        description: 'Student answers "Both are the same".',
        rootCause: 'Sign-Blindness — the student sees two small single-digit negatives and doesn\'t register that -3 and -1 are meaningfully different quantities.',
        remediation: 'Plot both temperatures as points on a labelled number line and physically measure the gap between each one and zero.'
      },
      {
        misconceptionId: 'E-w5-c',
        description: 'Student answers "Cannot say".',
        rootCause: 'Negative-Number Avoidance — unfamiliarity with negative values leads the student to treat the comparison as unanswerable, rather than applying the same left-is-smaller rule used for positives.',
        remediation: 'State the rule once and reuse it every time: on a number line, whichever number sits further to the left is smaller — true for positive or negative numbers alike.'
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: 'Draw a number line', hint: 'Mark 0, then -1, then -3 on a number line.' },
      { level: 2, description: 'Compare positions', hint: 'Which point is further to the left, -3 or -1?' },
      { level: 3, description: 'Connect to temperature', hint: 'Further left means colder. Which is colder?' }
    ],
    forwardRiskLinks: [
      { targetSkillId: 'INT-01', probability: 0.7, condition: 'If not remediated before integer addition/subtraction in Grade 6' }
    ],
    learningObjectives: []
  },
  {
    itemId: 'w6', order: 6, cluster: 'CONV', clusterName: CLUSTER_NAMES.CONV,
    skillId: 'CONV-01',
    question: 'Write 5,43,210 in the International system.',
    options: [
      opt('543,210', true, 'Indian 5,43,210 = 543 thousand 210.'),
      opt('5,432,100', false, 'You shifted the digits incorrectly.', 'E-w6-a'),
      opt('54,32,100', false, "That's still Indian grouping.", 'E-w6-b'),
      opt('5,43,210 (same)', false, 'International uses commas every three digits from the right.', 'E-w6-c')
    ],
    retryHint: 'In International, group the digits in sets of three: 543,210.',
    misconceptions: [
      {
        misconceptionId: 'E-w6-a',
        description: 'Student writes 5,432,100, an extra digit longer than the original.',
        rootCause: 'Digit Insertion — while regrouping into sets of three, the student miscounts and effectively inserts an extra placeholder, inflating the number tenfold.',
        remediation: 'Remove all commas first to get the raw digit string (543210), then insert new commas by counting exactly three digits at a time from the right — no digits are added or removed, only regrouped.'
      },
      {
        misconceptionId: 'E-w6-b',
        description: 'Student writes 54,32,100, still using Indian-style grouping.',
        rootCause: 'Grouping Habit Persistence — the student re-applies the familiar Indian comma pattern (3, then 2, 2, 2…) instead of switching to the International groups-of-three rule.',
        remediation: 'Contrast the two rules side by side: Indian = 3, then 2, 2, 2…; International = 3, 3, 3… Practise converting the same number both ways until the switch becomes automatic.'
      },
      {
        misconceptionId: 'E-w6-c',
        description: 'Student writes 5,43,210 unchanged.',
        rootCause: 'System-Invariance Assumption — the student assumes the digit string and its display format must be identical in every numbering system, since the value doesn\'t change.',
        remediation: 'Emphasise that only the *comma placement* changes between systems, because the two systems group digits differently for reading aloud — the value stays exactly the same.'
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: 'Strip the commas', hint: 'Remove the Indian commas from 5,43,210 to get the digit string 543210.' },
      { level: 2, description: 'Regroup in 3s', hint: 'Starting from the right, mark off groups of three digits: 543 | 210.' },
      { level: 3, description: 'Re-insert commas', hint: 'Join the groups with International-style commas: 543,210.' }
    ],
    forwardRiskLinks: [
      { targetSkillId: 'CONV-02', probability: 0.55, condition: 'If not remediated before converting numbers above 1 crore / 10 million' }
    ],
    learningObjectives: []
  },
  {
    itemId: 'w7', order: 7, cluster: 'PLACE', clusterName: CLUSTER_NAMES.PLACE,
    skillId: 'PV-02',
    question: 'In 8,09,123, what digit is in the thousands place?',
    options: [
      opt('9', true, 'The number is 8 lakh 9 thousand 123, so 9 is in the thousands place.'),
      opt('0', false, '0 is in the ten-thousands place.', 'E-w7-a'),
      opt('8', false, '8 is in the lakhs place.', 'E-w7-b'),
      opt('1', false, '1 is in the hundreds place.', 'E-w7-c')
    ],
    retryHint: 'Read the number: eight lakh nine thousand one hundred twenty-three.',
    misconceptions: [
      {
        misconceptionId: 'E-w7-a',
        description: 'Student answers 0, the digit one column to the left of the correct one.',
        rootCause: 'Adjacent-Column Slip — the student points to the digit immediately left of the actual thousands digit (ten-thousands) instead of the one asked about.',
        remediation: 'Have the student point to and say the name of each column as they move across the chart, rather than jumping straight to a column by eye.'
      },
      {
        misconceptionId: 'E-w7-b',
        description: 'Student answers 8, the leftmost digit of the number.',
        rootCause: 'Leftmost-Digit Default — the student answers with the first digit they see, a common shortcut for "which digit matters", regardless of which place was actually asked about.',
        remediation: 'Require the student to restate the question in their own words ("which digit is in the thousands column?") before looking at the number, breaking the habit of grabbing the leftmost digit.'
      },
      {
        misconceptionId: 'E-w7-c',
        description: 'Student answers 1, stopping one column early while counting from the right.',
        rootCause: 'Place Miscounting — the student counts from the right but stops one column short, landing on the hundreds\' neighbour instead of thousands.',
        remediation: 'Use a six-column chart and count out loud: ones, tens, hundreds, thousands — stop and check the digit before answering.'
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: 'Say the number in words', hint: '8,09,123 is eight lakh, nine thousand, one hundred twenty-three.' },
      { level: 2, description: "Find 'thousand' in the words", hint: 'Which part of that sentence names the thousands? What digit goes with it?' },
      { level: 3, description: 'Confirm on the chart', hint: 'Write 8,09,123 into a place-value chart and check which digit sits in the Thousands column.' }
    ],
    forwardRiskLinks: [
      { targetSkillId: 'PV-03', probability: 0.75, condition: 'If not remediated before expanded-form work' }
    ],
    learningObjectives: ['CCSS.MATH.4.NBT.A.1']
  },
  {
    itemId: 'w8', order: 8, cluster: 'COMP', clusterName: CLUSTER_NAMES.COMP,
    skillId: 'COMP-01',
    question: 'Arrange these in ascending order: 2,34,567; 2,43,567; 2,33,567.',
    options: [
      opt('2,33,567; 2,34,567; 2,43,567', true, 'Compare the thousands period: 33 < 34 < 43.'),
      opt('2,43,567; 2,34,567; 2,33,567', false, "That's descending order.", 'E-w8-a'),
      opt('2,34,567; 2,33,567; 2,43,567', false, '2,33,567 is smaller than 2,34,567.', 'E-w8-b'),
      opt('2,33,567; 2,43,567; 2,34,567', false, 'Check the middle number: 2,34,567 < 2,43,567.', 'E-w8-c')
    ],
    retryHint: 'Ascending means smallest to largest.',
    misconceptions: [
      {
        misconceptionId: 'E-w8-a',
        description: 'Student orders the numbers largest to smallest.',
        rootCause: 'Direction Reversal — the student correctly ranks the three numbers by size but writes the order from largest to smallest, confusing "ascending" with "descending".',
        remediation: 'Anchor the vocabulary physically: "ascending" = climbing a staircase upward = smallest first. Say the meaning out loud every time before ordering.'
      },
      {
        misconceptionId: 'E-w8-b',
        description: 'Student writes 2,34,567; 2,33,567; 2,43,567 — the first two are swapped.',
        rootCause: 'Partial Scan — the student compares only the first two numbers encountered but stops before checking the third, missing that 2,33,567 is actually the smallest of all three.',
        remediation: 'Insist on a full pairwise comparison: compare every number to every other number at least once before finalising an order, not just the first pair encountered.'
      },
      {
        misconceptionId: 'E-w8-c',
        description: 'Student writes 2,33,567; 2,43,567; 2,34,567 — the last two are swapped.',
        rootCause: 'Middle-Value Misplacement — the student correctly finds the smallest number but then compares the remaining two using the wrong column, swapping their correct order.',
        remediation: 'After placing the smallest number, re-compare only the two numbers left over from scratch, ignoring the one already placed.'
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: 'Line up all three', hint: 'Write all three numbers underneath each other, digits aligned by place value.' },
      { level: 2, description: 'Find the smallest first', hint: 'Compare the thousands-period digits: 34, 43, 33. Which is smallest?' },
      { level: 3, description: "Order what's left", hint: 'Now compare the remaining two numbers the same way, and place all three smallest-to-largest.' }
    ],
    forwardRiskLinks: [],
    learningObjectives: ['CCSS.MATH.4.NBT.A.2']
  }
];

const level1Diagnostic = [
  {
    itemId: 'd1', order: 1, cluster: 'PLACE', clusterName: CLUSTER_NAMES.PLACE,
    skillId: 'PV-02',
    question: 'What is the place value of 6 in 16,78,945?',
    options: [
      opt('6,00,000 (6 lakhs)', true, 'The 6 is in the lakhs place: 16,78,945.'),
      opt('60,000', false, 'That would be the ten-thousands place.', 'E-d1-a'),
      opt('6,000', false, 'That would be the thousands place.', 'E-d1-b'),
      opt('6,00,00,000', false, 'That would be crores.', 'E-d1-c')
    ],
    backward: 'Remember the Indian place value chart: … Lakhs, Ten-thousands, Thousands, Hundreds, Tens, Ones.',
    forward: 'Knowing place values helps you read large numbers quickly.',
    misconceptions: [
      {
        misconceptionId: 'E-d1-a',
        description: 'Student answers 60,000, one column to the right of the correct place.',
        rootCause: 'Adjacent-Column Slip — reads 6 as though it sits one column right (ten-thousands) of its actual position (lakhs).',
        remediation: 'Chart the full number and count columns explicitly from the left: 16,78,945 → 1(ten-lakh) 6(lakh) 7(ten-thousand) 8(thousand) 9(hundred) 4(ten) 5(one).'
      },
      {
        misconceptionId: 'E-d1-b',
        description: 'Student answers 6,000, two full columns off.',
        rootCause: 'Place Miscounting — the student under-counts by two columns, treating the lakhs digit as though it were in the thousands column.',
        remediation: 'Use period-grouping: mark 16,78,945 as 16 | 78 | 945 and identify which period the target digit falls in before naming its exact column.'
      },
      {
        misconceptionId: 'E-d1-c',
        description: 'Student answers 6,00,00,000, one full period too high.',
        rootCause: 'Period Promotion — mistakes the comma just before the 6 as the start of the crores period, over-promoting the digit by a full period.',
        remediation: 'Read the number aloud in words — "sixteen lakh, seventy-eight thousand, nine hundred forty-five" — to hear which period 6 actually belongs to.'
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: 'Split into periods', hint: '16,78,945 splits into 16 | 78 | 945 — lakhs period, thousands period, ones period.' },
      { level: 2, description: 'Read within the period', hint: "In the lakhs period '16', which digit is the lakhs digit and which is the ten-lakhs digit?" },
      { level: 3, description: 'Assign the value', hint: '6 is the lakhs digit, so its value is 6 × 1,00,000 = ?' }
    ],
    forwardRiskLinks: [
      { targetSkillId: 'PV-03', probability: 0.82, condition: 'If not remediated before expanded-form work' },
      { targetSkillId: 'MUL-02', probability: 0.5, condition: 'If not remediated before multi-digit multiplication word problems' }
    ],
    learningObjectives: ['CCSS.MATH.4.NBT.A.1', 'CCSS.MATH.4.NBT.A.2']
  },
  {
    itemId: 'd2', order: 2, cluster: 'COMP', clusterName: CLUSTER_NAMES.COMP,
    skillId: 'COMP-01',
    question: 'Which of these numbers is the smallest?',
    options: [
      opt('7,89,012', true, 'Compare: 7,89,012 < 7,89,102 < 7,98,012 < 7,98,102.'),
      opt('7,98,012', false, '7,98,012 is larger because ten-thousands digit is 9 vs 8 in 7,89,012.', 'E-d2-a'),
      opt('7,89,102', false, 'This is larger than 7,89,012 (102 > 012).', 'E-d2-b'),
      opt('7,98,102', false, 'This is the largest.', 'E-d2-c')
    ],
    backward: 'Start from the leftmost digit; the first digit that is smaller makes the whole number smaller.',
    forward: 'Ordering numbers is a key skill for data handling.',
    misconceptions: [
      {
        misconceptionId: 'E-d2-a',
        description: 'Student picks 7,98,012 as smallest.',
        rootCause: 'First-Digit Trust — since all four numbers start with 7 and share the same digit count, the student assumes later digits barely matter and picks based on a rough glance rather than a careful left-to-right scan.',
        remediation: 'Force a strict left-to-right scan across all four numbers at once, column by column, eliminating any number that is not the smallest at each column.'
      },
      {
        misconceptionId: 'E-d2-b',
        description: 'Student picks 7,89,102 as smallest.',
        rootCause: 'Trailing-Digit Comparison — the student compares the last few digits (102 vs 012) instead of continuing the scan from where the numbers first actually differ, the ten-thousands column.',
        remediation: 'Underline the exact column where each pair of numbers first differs before making any decision based on digits further right.'
      },
      {
        misconceptionId: 'E-d2-c',
        description: 'Student picks 7,98,102 as smallest — actually the largest.',
        rootCause: 'Compound Error — combines the first-digit-trust error and the trailing-digit error, comparing the wrong columns twice over.',
        remediation: 'Eliminate numbers one comparison at a time rather than judging all four together: compare two fully, discard the larger, then bring in the next number.'
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: 'Align by place value', hint: 'Write all four numbers stacked with digits aligned by column.' },
      { level: 2, description: 'Scan left to right', hint: 'All four start with 7. Move to the ten-thousands digit — which numbers have the smallest digit there?' },
      { level: 3, description: 'Break remaining ties', hint: 'Among the numbers left, compare the next column (thousands) to find the smallest.' }
    ],
    forwardRiskLinks: [
      { targetSkillId: 'FRA-01', probability: 0.6, condition: 'If not remediated before comparing fractions with unlike denominators' }
    ],
    learningObjectives: ['CCSS.MATH.4.NBT.A.2']
  },
  {
    itemId: 'd3', order: 3, cluster: 'ROUND', clusterName: CLUSTER_NAMES.ROUND,
    skillId: 'ROUND-01',
    question: 'Round 8,734 to the nearest 100.',
    options: [
      opt('8,700', true, 'The tens digit is 3 (<5), so round down.'),
      opt('8,800', false, 'That would need the tens digit to be 5 or more.', 'E-d3-a'),
      opt('8,000', false, "That's rounding to the nearest thousand.", 'E-d3-b'),
      opt('8,730', false, "That's rounding to the nearest ten.", 'E-d3-c')
    ],
    backward: 'When rounding to the nearest 100, look at the tens digit.',
    forward: 'Rounding is used in everyday life when estimating prices, distances, etc.',
    misconceptions: [
      {
        misconceptionId: 'E-d3-a',
        description: 'Student answers 8,800, rounding up regardless of the tens digit.',
        rootCause: 'Direction Default — the student rounds up out of habit, perhaps carrying over the direction from a previous problem instead of checking the decision digit fresh.',
        remediation: 'Re-run the fixed rule every single time: check the tens digit first, then decide. Never carry the previous problem\'s direction forward.'
      },
      {
        misconceptionId: 'E-d3-b',
        description: 'Student answers 8,000, one place value too coarse.',
        rootCause: 'Target-Place Slip — rounds to the nearest thousand instead of the nearest hundred.',
        remediation: 'Circle the hundreds digit before starting, so the target place is fixed and can\'t drift to the wrong column mid-calculation.'
      },
      {
        misconceptionId: 'E-d3-c',
        description: 'Student answers 8,730, one place value too fine.',
        rootCause: 'Target-Place Slip (too fine) — rounds to the nearest ten and keeps the digits mostly unchanged instead of applying a real rounding decision.',
        remediation: 'Ask explicitly: "nearest hundred means only the hundreds digit and everything after it may change" — check that the tens and ones actually became zero.'
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: 'Circle the target place', hint: 'Circle the hundreds digit in 8,734.' },
      { level: 2, description: 'Check the decision digit', hint: 'The tens digit is 3. Is 3 five or more?' },
      { level: 3, description: 'Round down and clear', hint: 'Since 3 < 5, keep the hundreds digit the same and zero out the rest.' }
    ],
    forwardRiskLinks: [
      { targetSkillId: 'EST-01', probability: 0.6, condition: 'If not remediated before estimation word problems' }
    ],
    learningObjectives: ['CCSS.MATH.3.NBT.A.1']
  },
  {
    itemId: 'd4', order: 4, cluster: 'ROMAN', clusterName: CLUSTER_NAMES.ROMAN,
    skillId: 'ROM-01',
    question: 'What is LXXIV in Hindu-Arabic numerals?',
    options: [
      opt('74', true, 'L=50, XX=20, IV=4 → 50+20+4=74.'),
      opt('54', false, 'You might have misread L as 50 and IV as 4 but missed the XX.', 'E-d4-a'),
      opt('76', false, 'That would be LXXVI.', 'E-d4-b'),
      opt('44', false, 'That would be XLIV.', 'E-d4-c')
    ],
    backward: 'Add the values of the symbols from left to right; if a smaller symbol is before a larger one, subtract.',
    forward: 'Roman numerals appear in many formal contexts, like clocks and book chapters.',
    misconceptions: [
      {
        misconceptionId: 'E-d4-a',
        description: 'Student answers 54, skipping the XX block entirely.',
        rootCause: 'Symbol Omission — the student correctly reads L=50 and IV=4 but drops the XX (20), not recognising the repeated symbol as a separate addable chunk.',
        remediation: 'Segment the numeral into additive chunks before evaluating: L | XX | IV, then convert and sum each chunk separately.'
      },
      {
        misconceptionId: 'E-d4-b',
        description: 'Student answers 76, reading IV as addition rather than subtraction.',
        rootCause: 'Subtractive-Pair Misread — the student reads IV as "I after V" and adds (5+1=6) rather than recognising that a smaller symbol placed before a larger one signals subtraction.',
        remediation: 'Highlight every subtractive pair (a smaller symbol immediately before a larger one) before doing any addition, and convert those pairs first.'
      },
      {
        misconceptionId: 'E-d4-c',
        description: 'Student answers 44, treating LXX as though it were XL.',
        rootCause: 'Segment Confusion — the student resolves IV=4 correctly but misreads LXX (70) as the visually similar XL (40), losing the true value of the repeated X\'s.',
        remediation: 'Convert strictly left to right, one symbol-group at a time, and never substitute a segment for a different pattern that merely looks similar.'
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: 'Break into chunks', hint: 'Split LXXIV into L | XX | IV.' },
      { level: 2, description: 'Convert each chunk', hint: 'L = 50. XX = 20. IV = 4 (subtractive pair, one less than 5).' },
      { level: 3, description: 'Add the chunks', hint: '50 + 20 + 4 = ?' }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: 'd5', order: 5, cluster: 'NEG', clusterName: CLUSTER_NAMES.NEG,
    skillId: 'NEG-01',
    question: 'Which is colder: \\( -2^\\circ\\text{C} \\) or \\( -6^\\circ\\text{C} \\)?',
    options: [
      opt('\\( -6^\\circ\\text{C} \\)', true, 'On a number line, -6 is to the left of -2, so it is smaller (colder).'),
      opt('\\( -2^\\circ\\text{C} \\)', false, '-2 is warmer (closer to 0).', 'E-d5-a'),
      opt('Both are the same', false, 'The numbers are different.', 'E-d5-b'),
      opt('Cannot say', false, 'Negative numbers can be compared easily.', 'E-d5-c')
    ],
    backward: 'On a number line, numbers decrease as you go left.',
    forward: 'Understanding negative numbers helps with money (overdraft) and elevation.',
    misconceptions: [
      {
        misconceptionId: 'E-d5-a',
        description: 'Student picks -2°C as colder.',
        rootCause: 'Magnitude-Only Comparison — treats 2 and 6 as if positive, picking the number with the smaller digit as colder without flipping the order for negative values.',
        remediation: 'Reinforce with a vertical thermometer image: further down (more negative) is always colder, even though the digit itself is numerically larger.'
      },
      {
        misconceptionId: 'E-d5-b',
        description: 'Student answers "Both are the same".',
        rootCause: 'Sign-Blindness — fails to register that -2 and -6 are meaningfully different quantities, perhaps distracted by both being small negatives.',
        remediation: 'Plot both values on a number line and measure the visible gap between each one and zero.'
      },
      {
        misconceptionId: 'E-d5-c',
        description: 'Student answers "Cannot say".',
        rootCause: 'Negative-Number Avoidance — treats any negative comparison as unanswerable rather than applying the same left-is-smaller rule used for positive numbers.',
        remediation: 'State and reuse the single rule for every case: further left on the number line always means smaller (colder), positive or negative.'
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: 'Plot on a number line', hint: 'Mark 0, -2, and -6 on a number line.' },
      { level: 2, description: 'Compare positions', hint: 'Which point is further to the left?' },
      { level: 3, description: 'Connect to temperature', hint: 'Further left = colder. Which is colder?' }
    ],
    forwardRiskLinks: [
      { targetSkillId: 'INT-01', probability: 0.7, condition: 'If not remediated before integer operations in Grade 6' }
    ],
    learningObjectives: []
  },
  {
    itemId: 'd6', order: 6, cluster: 'CONV', clusterName: CLUSTER_NAMES.CONV,
    skillId: 'CONV-01',
    question: 'Write 4,50,000 (Indian) in the International system.',
    options: [
      opt('450,000', true, '4,50,000 Indian = 4 lakh 50 thousand = 450,000.'),
      opt('4,500,000', false, 'That would be 45 lakh (4.5 million).', 'E-d6-a'),
      opt('45,000', false, 'You lost a zero.', 'E-d6-b'),
      opt('405,000', false, 'Incorrect grouping of digits.', 'E-d6-c')
    ],
    backward: '1 lakh = 100,000, so 4 lakh = 400,000; 50 thousand = 50,000; total 450,000.',
    forward: 'International format is used in most global reports.',
    misconceptions: [
      {
        misconceptionId: 'E-d6-a',
        description: 'Student writes 4,500,000, a full order of magnitude too high.',
        rootCause: 'Digit Insertion — miscounts while regrouping and inserts an extra zero, inflating the value tenfold.',
        remediation: 'Strip all commas to get the raw digits (450000), then regroup in clean sets of three from the right — the digit count before and after must match exactly.'
      },
      {
        misconceptionId: 'E-d6-b',
        description: 'Student writes 45,000, a full order of magnitude too low.',
        rootCause: 'Digit Loss — drops a digit while regrouping, most often a trailing zero, deflating the value tenfold.',
        remediation: 'Count the total digits before converting (450000 has 6 digits) and verify the International-grouped answer still has exactly 6 digits.'
      },
      {
        misconceptionId: 'E-d6-c',
        description: 'Student writes 405,000, with the comma placed one digit early.',
        rootCause: 'Grouping Misalignment — inserts the International comma one digit too soon, splitting the digit string in the wrong place.',
        remediation: 'Mark off exactly three digits from the right before placing the first comma, then repeat in threes for any digits remaining.'
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: 'Strip the commas', hint: '4,50,000 without commas is 450000.' },
      { level: 2, description: 'Regroup in 3s from the right', hint: '450 | 000 — group the six digits into two sets of three.' },
      { level: 3, description: 'Re-insert commas', hint: 'Join with an International comma: 450,000.' }
    ],
    forwardRiskLinks: [
      { targetSkillId: 'CONV-02', probability: 0.5, condition: 'If not remediated before converting numbers above 1 crore / 10 million' }
    ],
    learningObjectives: []
  },
  {
    itemId: 'd7', order: 7, cluster: 'PLACE', clusterName: CLUSTER_NAMES.PLACE,
    question: 'In the International number 2,056,789, what digit is in the hundred-thousands place?',
    options: [
      opt('0', true, 'Millions: 2, hundred-thousands: 0, ten-thousands: 5, thousands: 6.'),
      opt('5', false, '5 is in the ten-thousands place.'),
      opt('2', false, '2 is in the millions place.'),
      opt('6', false, '6 is in the thousands place.')
    ],
    backward: 'International place values: ... millions, hundred-thousands, ten-thousands, thousands.',
    forward: 'Reading large numbers accurately is essential for data analysis.'
  },
  {
    itemId: 'd8', order: 8, cluster: 'COMP', clusterName: CLUSTER_NAMES.COMP,
    question: 'Which digit could replace the □ so that 5,4□,321 < 5,45,321 ?',
    options: [
      opt('4', true, 'If □=4, we have 5,44,321, which is less than 5,45,321.'),
      opt('5', false, '5,45,321 is not less than 5,45,321; they are equal.'),
      opt('6', false, '5,46,321 is greater than 5,45,321.'),
      opt('7', false, 'Any digit >5 makes it larger.')
    ],
    backward: 'Compare from the left; if the first digits are equal, move to the next place.',
    forward: 'This logic helps you sort numbers in lists and spreadsheets.'
  },
  {
    itemId: 'd9', order: 9, cluster: 'ROUND', clusterName: CLUSTER_NAMES.ROUND,
    question: 'Round 2,35,671 to the nearest 10,000.',
    options: [
      opt('2,40,000', true, 'The thousands digit is 5, so we round up.'),
      opt('2,30,000', false, 'That would be rounding down; but the thousands digit is 5.'),
      opt('2,35,000', false, "That's rounding to the nearest 1,000."),
      opt('2,36,000', false, "Again, that's to the nearest 1,000.")
    ],
    backward: 'Rounding to the nearest 10,000: look at the thousands digit (5 here).',
    forward: 'Rounding is used to simplify numbers in news headlines and reports.'
  },
  {
    itemId: 'd10', order: 10, cluster: 'ROMAN', clusterName: CLUSTER_NAMES.ROMAN,
    question: 'Write 56 in Roman numerals.',
    options: [
      opt('LVI', true, '50 (L) + 6 (VI) = LVI.'),
      opt('LIV', false, 'LIV = 54.'),
      opt('XLVI', false, 'XLVI = 46.'),
      opt('LXVI', false, 'LXVI = 66.')
    ],
    backward: 'L=50, V=5, I=1. Write the largest symbols first.',
    forward: 'Roman numerals are still used in movie copyright years and clock faces.'
  },
  {
    itemId: 'd11', order: 11, cluster: 'NEG', clusterName: CLUSTER_NAMES.NEG,
    question: 'The temperature is \\( -1^\\circ\\text{C} \\). It rises by \\( 3^\\circ\\text{C} \\). What is the new temperature?',
    options: [
      opt('\\( 2^\\circ\\text{C} \\)', true, '-1 + 3 = 2.'),
      opt('\\( -4^\\circ\\text{C} \\)', false, 'That would be -1 - 3.'),
      opt('\\( 4^\\circ\\text{C} \\)', false, 'You added 1 + 3 ignoring the negative sign.'),
      opt('\\( -2^\\circ\\text{C} \\)', false, 'Check your addition: -1 + 3 = 2.')
    ],
    backward: 'A rise means you add the number to the current temperature.',
    forward: 'Temperature changes are a daily application of negative numbers.'
  },
  {
    itemId: 'd12', order: 12, cluster: 'CONV', clusterName: CLUSTER_NAMES.CONV,
    question: 'Convert 2,300,000 (International) into the Indian system.',
    options: [
      opt('23,00,000', true, '2,300,000 = 2.3 million = 23 lakh = 23,00,000.'),
      opt('2,30,00,000', false, 'That would be 23 million.'),
      opt('230,000', false, "That's 230 thousand."),
      opt('2,30,000', false, "That's 2.3 lakh (230,000).")
    ],
    backward: '1 million = 10 lakh, so 2.3 million = 23 lakh.',
    forward: 'Newspapers in India often use both systems.'
  },
  {
    itemId: 'd13', order: 13, cluster: 'PLACE', clusterName: CLUSTER_NAMES.PLACE,
    question: 'Write the expanded form of 5,04,320 (Indian system).',
    options: [
      opt('\\( 5 \\times 1,00,000 + 4 \\times 1,000 + 3 \\times 100 + 2 \\times 10 \\)', true, '5,04,320 = 5 lakhs + 4 thousands + 3 hundreds + 2 tens.'),
      opt('\\( 5 \\times 1,00,000 + 4 \\times 10,000 + 3 \\times 100 + 2 \\times 10 \\)', false, 'The 4 is in the thousands place, not ten-thousands.'),
      opt('\\( 5 \\times 10,00,000 + 4 \\times 1,000 + 3 \\times 100 + 2 \\times 10 \\)', false, 'That would be 50,00,000, which is too big.'),
      opt('\\( 5 \\times 1,00,000 + 4 \\times 1,000 + 3 \\times 100 + 2 \\)', false, 'The last digit 2 is in the tens place, not ones (the number ends in 320).')
    ],
    backward: 'Expanded form shows the value of each digit according to its place.',
    forward: 'Expanded form helps when learning addition and multiplication algorithms.'
  },
  {
    itemId: 'd14', order: 14, cluster: 'COMP', clusterName: CLUSTER_NAMES.COMP,
    question: 'Which statement is true?',
    options: [
      opt('\\( 9,87,654 > 9,87,546 \\)', true, 'Compare the hundreds place: 6 > 5.'),
      opt('\\( 9,87,654 < 9,87,546 \\)', false, '654 is greater than 546.'),
      opt('\\( 9,87,654 = 9,87,546 \\)', false, 'The numbers are different.'),
      opt('Cannot compare', false, 'They have the same number of digits, so they can be compared.')
    ],
    backward: 'Always start from the left and find the first place where digits differ.',
    forward: 'Comparison symbols >, < are used extensively in maths and coding.'
  },
  {
    itemId: 'd15', order: 15, cluster: 'ROUND', clusterName: CLUSTER_NAMES.ROUND,
    question: 'Which number will become 5,000 when rounded to the nearest 1,000?',
    options: [
      opt('4,501', true, '4,501 rounds up to 5,000 because the hundreds digit is 5.'),
      opt('4,499', false, '4,499 rounds down to 4,000 (hundreds digit 4).'),
      opt('5,500', false, '5,500 rounds up to 6,000 (hundreds digit 5).'),
      opt('5,501', false, '5,501 rounds to 6,000 (hundreds digit 5).')
    ],
    backward: 'Numbers from 4,500 to 5,499 round to 5,000.',
    forward: 'Understanding rounding helps with estimating sums and differences.'
  },
  {
    itemId: 'd16', order: 16, cluster: 'ROMAN', clusterName: CLUSTER_NAMES.ROMAN,
    question: 'Which is larger: XL or LX?',
    options: [
      opt('LX', true, 'LX = 60, XL = 40.'),
      opt('XL', false, 'XL = 40, LX = 60, so LX is larger.'),
      opt('Both are equal', false, 'They represent different numbers.'),
      opt('Cannot compare', false, 'Both are valid Roman numerals and can be compared.')
    ],
    backward: 'L=50, X=10; XL means 50-10=40, LX means 50+10=60.',
    forward: 'Comparing Roman numerals is like comparing numbers in any other base.'
  },
  {
    itemId: 'd17', order: 17, cluster: 'NEG', clusterName: CLUSTER_NAMES.NEG,
    question: 'A diver is 5 m below sea level (which we write as -5). She goes up 2 m. Where is she now?',
    options: [
      opt('-3 m', true, '-5 + 2 = -3.'),
      opt('3 m above sea level', false, '-5 + 2 is still negative.'),
      opt('-7 m', false, 'That would be -5 - 2.'),
      opt('7 m below sea level', false, 'You ignored the sign and added.')
    ],
    backward: 'Moving up means adding (becoming less negative).',
    forward: 'This is the same as calculating bank balances or floors in a building.'
  },
  {
    itemId: 'd18', order: 18, cluster: 'CONV', clusterName: CLUSTER_NAMES.CONV,
    question: '1 million = how many lakhs?',
    options: [
      opt('10 lakhs', true, '1 million = 1,000,000; 1 lakh = 100,000, so 10 lakhs.'),
      opt('100 lakhs', false, 'That would be 1 crore (10 million).'),
      opt('1 lakh', false, '1 lakh = 100,000, which is only one-tenth of a million.'),
      opt('5 lakhs', false, "That's half a million.")
    ],
    backward: 'Remember: 1,000,000 ÷ 100,000 = 10.',
    forward: 'This conversion is essential for reading international and Indian financial news.'
  },
  {
    itemId: 'd19', order: 19, cluster: 'PLACE', clusterName: CLUSTER_NAMES.PLACE,
    question: 'How many ten-thousands are there in 4,73,000?',
    options: [
      opt('7', true, '4,73,000 = 4 lakhs + 7 ten-thousands + 3 thousands.'),
      opt('4', false, '4 is the number of lakhs.'),
      opt('3', false, '3 is the number of thousands.'),
      opt('0', false, 'The ten-thousands place is not zero.')
    ],
    backward: 'Break the number into periods: lakhs (4), thousands (73), ones (000).',
    forward: 'Understanding large numbers is vital for topics like population and budgets.'
  },
  {
    itemId: 'd20', order: 20, cluster: 'COMP', clusterName: CLUSTER_NAMES.COMP,
    question: 'Arrange in ascending order: 1,23,456; 1,32,456; 1,22,456.',
    options: [
      opt('1,22,456; 1,23,456; 1,32,456', true, '22 thousand < 23 thousand < 32 thousand.'),
      opt('1,32,456; 1,23,456; 1,22,456', false, "That's descending."),
      opt('1,23,456; 1,22,456; 1,32,456', false, '1,22,456 should come first.'),
      opt('1,22,456; 1,32,456; 1,23,456', false, '1,23,456 should come before 1,32,456.')
    ],
    backward: 'Ascending order means smallest to largest.',
    forward: 'Sorting data is a fundamental skill in statistics.'
  },
  {
    itemId: 'd21', order: 21, cluster: 'ROUND', clusterName: CLUSTER_NAMES.ROUND,
    question: 'Round 49,999 to the nearest 100.',
    options: [
      opt('50,000', true, 'The tens digit is 9 (≥5), so we round up the hundreds place from 9 to 10, carrying over to give 50,000.'),
      opt('49,000', false, 'That would be rounding to the nearest 1,000.'),
      opt('49,900', false, 'Incorrect; the tens digit causes the hundreds to round up.'),
      opt('50,100', false, 'Too high.')
    ],
    backward: "When rounding to nearest 100, look at the tens digit. If it's 5 or more, increase the hundreds digit by 1 and change the rest to zeros.",
    forward: 'Rounding large numbers is common in population estimates.'
  },
  {
    itemId: 'd22', order: 22, cluster: 'ROMAN', clusterName: CLUSTER_NAMES.ROMAN,
    question: 'Convert XXIX to a number.',
    options: [
      opt('29', true, 'XX=20, IX=9 → 29.'),
      opt('31', false, 'That would be XXXI.'),
      opt('19', false, 'XIX = 19.'),
      opt('21', false, 'That would be XXI.')
    ],
    backward: 'I before X means subtract: IX = 9.',
    forward: 'Roman numeral knowledge is useful for history and classic literature references.'
  },
  {
    itemId: 'd23', order: 23, cluster: 'NEG', clusterName: CLUSTER_NAMES.NEG,
    question: 'What is 2 more than -4?',
    options: [
      opt('-2', true, '-4 + 2 = -2.'),
      opt('2', false, 'You forgot the negative sign.'),
      opt('-6', false, 'That would be -4 - 2.'),
      opt('6', false, 'That would be 4 + 2.')
    ],
    backward: 'Adding a positive number moves you to the right on a number line.',
    forward: 'This is the foundation for algebraic addition of integers.'
  },
  {
    itemId: 'd24', order: 24, cluster: 'CONV', clusterName: CLUSTER_NAMES.CONV,
    question: 'Which number is written in the International system?',
    options: [
      opt('1,234,567', true, 'International uses commas every three digits: millions, thousands, ones.'),
      opt('12,34,567', false, "That's the Indian system."),
      opt('1,23,45,678', false, "That's also Indian grouping (crores, lakhs)."),
      opt('12345', false, 'No commas, but if commas were added, it could be either; the presence of commas identifies the system.')
    ],
    backward: 'Indian commas: first after hundreds, then after thousands, then after lakhs. International: every three digits.',
    forward: 'Recognising the system helps when reading foreign or domestic news.'
  }
];

const level1Recheck = [
  {
    itemId: 'r1', order: 1, cluster: 'PLACE', clusterName: CLUSTER_NAMES.PLACE,
    question: 'What is the place value of 3 in 43,21,789?',
    options: [
      opt('3,00,000 (3 lakhs)', true, 'The number is 43 lakh 21 thousand 789. The 3 is in the lakhs place.'),
      opt('30,000', false, 'That would be the ten-thousands place.'),
      opt('3,000', false, 'That would be the thousands place.'),
      opt('3,00,00,000', false, 'That would be crores.')
    ]
  },
  {
    itemId: 'r2', order: 2, cluster: 'COMP', clusterName: CLUSTER_NAMES.COMP,
    question: 'Which is the largest? 6,54,321; 6,45,321; 6,54,312; 6,45,312.',
    options: [
      opt('6,54,321', true, 'Ten-thousands digit 5 > 4; and 321 > 312 in the last comparison.'),
      opt('6,45,321', false, '4 in ten-thousands is smaller than 5.'),
      opt('6,54,312', false, 'It is almost the same but 312 < 321.'),
      opt('6,45,312', false, 'Smallest among these.')
    ]
  },
  {
    itemId: 'r3', order: 3, cluster: 'ROUND', clusterName: CLUSTER_NAMES.ROUND,
    question: 'Round 5,871 to the nearest 100.',
    options: [
      opt('5,900', true, 'The tens digit is 7 (≥5), so round up the hundreds from 8 to 9.'),
      opt('5,800', false, 'That would be rounding down.'),
      opt('6,000', false, "That's to the nearest thousand."),
      opt('5,870', false, "That's to the nearest ten.")
    ]
  },
  {
    itemId: 'r4', order: 4, cluster: 'ROMAN', clusterName: CLUSTER_NAMES.ROMAN,
    question: 'What is XLVIII in Hindu-Arabic numerals?',
    options: [
      opt('48', true, 'XL=40, VIII=8 → 48.'),
      opt('58', false, 'That would be LVIII.'),
      opt('42', false, 'That would be XLII.'),
      opt('68', false, 'That would be LXVIII.')
    ]
  },
  {
    itemId: 'r5', order: 5, cluster: 'NEG', clusterName: CLUSTER_NAMES.NEG,
    question: 'Which is warmer: \\( -9^\\circ\\text{C} \\) or \\( -4^\\circ\\text{C} \\)?',
    options: [
      opt('\\( -4^\\circ\\text{C} \\)', true, '-4 is closer to 0 than -9, so it is warmer.'),
      opt('\\( -9^\\circ\\text{C} \\)', false, '-9 is colder.'),
      opt('Both are equal', false, '-4 > -9.'),
      opt('Cannot say', false, 'We can easily compare negative numbers.')
    ]
  },
  {
    itemId: 'r6', order: 6, cluster: 'CONV', clusterName: CLUSTER_NAMES.CONV,
    question: 'Write 7,89,000 (Indian) in the International system.',
    options: [
      opt('789,000', true, '7 lakh 89 thousand = 789,000.'),
      opt('7,890,000', false, 'That would be 78.9 lakh.'),
      opt('78,900', false, 'Missing a zero.'),
      opt('7,089,000', false, 'Misplaced digits.')
    ]
  },
  {
    itemId: 'r7', order: 7, cluster: 'PLACE', clusterName: CLUSTER_NAMES.PLACE,
    question: 'In the International number 1,604,325, what digit is in the hundred-thousands place?',
    options: [
      opt('6', true, 'Millions: 1, hundred-thousands: 6, ten-thousands: 0, thousands: 4.'),
      opt('0', false, '0 is in the ten-thousands place.'),
      opt('1', false, '1 is in the millions place.'),
      opt('4', false, '4 is in the thousands place.')
    ]
  },
  {
    itemId: 'r8', order: 8, cluster: 'COMP', clusterName: CLUSTER_NAMES.COMP,
    question: 'Which digit can replace the □ so that 3,2□,987 > 3,24,987 ?',
    options: [
      opt('5', true, 'If □=5, we have 3,25,987 > 3,24,987.'),
      opt('4', false, '3,24,987 is equal to 3,24,987.'),
      opt('3', false, '3,23,987 < 3,24,987.'),
      opt('2', false, 'Even smaller.')
    ]
  },
  {
    itemId: 'r9', order: 9, cluster: 'ROUND', clusterName: CLUSTER_NAMES.ROUND,
    question: 'Round 1,56,789 to the nearest 1,000.',
    options: [
      opt('1,57,000', true, 'The hundreds digit is 7 (≥5), so round up the thousands.'),
      opt('1,56,000', false, 'Would need hundreds digit <5.'),
      opt('1,60,000', false, "That's to the nearest 10,000."),
      opt('2,00,000', false, "That's to the nearest lakh.")
    ]
  },
  {
    itemId: 'r10', order: 10, cluster: 'ROMAN', clusterName: CLUSTER_NAMES.ROMAN,
    question: 'Write 39 in Roman numerals.',
    options: [
      opt('XXXIX', true, '30 (XXX) + 9 (IX) = XXXIX.'),
      opt('IXL', false, 'Invalid form; 39 is not written with XL.'),
      opt('XXXXIX', false, "Four X's in a row is not allowed."),
      opt('XLI', false, 'XLI = 41.')
    ]
  },
  {
    itemId: 'r11', order: 11, cluster: 'NEG', clusterName: CLUSTER_NAMES.NEG,
    question: 'The temperature at night was \\( -5^\\circ\\text{C} \\). By afternoon it had risen by \\( 8^\\circ\\text{C} \\). What was the afternoon temperature?',
    options: [
      opt('\\( 3^\\circ\\text{C} \\)', true, '-5 + 8 = 3.'),
      opt('\\( -3^\\circ\\text{C} \\)', false, 'You subtracted 5-8 incorrectly.'),
      opt('\\( 13^\\circ\\text{C} \\)', false, 'You added 5+8.'),
      opt('\\( -13^\\circ\\text{C} \\)', false, 'You did -5 - 8.')
    ]
  },
  {
    itemId: 'r12', order: 12, cluster: 'CONV', clusterName: CLUSTER_NAMES.CONV,
    question: 'Convert 650,000 (International) to the Indian system.',
    options: [
      opt('6,50,000', true, '650,000 = 6.5 lakh = 6,50,000.'),
      opt('65,00,000', false, 'That would be 6.5 million.'),
      opt('6,05,000', false, 'Misplaced digit.'),
      opt('60,50,000', false, 'Incorrect grouping.')
    ]
  }
];

function buildDocs(level, phase, items) {
  return items.map((item) => ({
    grade: GRADE,
    chapterSlug: CHAPTER_SLUG,
    chapterName: CHAPTER_NAME,
    level,
    phase,
    ...item
  }));
}

const allQuestions = [
  ...buildDocs(1, 'warmup', level1Warmup),
  ...buildDocs(1, 'diagnostic', level1Diagnostic),
  ...buildDocs(1, 'recheck', level1Recheck)
];

const chapterDocs = [
  {
    grade: GRADE,
    gradeLabel: GRADE_LABEL,
    chapterSlug: CHAPTER_SLUG,
    chapterName: CHAPTER_NAME,
    level: 1,
    title: 'Number Sense & Place Value — Core Fluency',
    subtitle: 'Telangana & Cambridge · Retention-First Warm-up & Diagnostic',
    description: 'Place value & expanded form, comparing & ordering, rounding & estimation, Roman numerals, negative numbers in context, and the Indian–International numbering systems.',
    clusterNames: CLUSTER_NAMES,
    gateReviewHTML: '<strong>Quick Review</strong><br>' +
      '&bull; Indian place value: Ones, Tens, Hundreds, Thousands, Ten-thousands, Lakhs, Ten-lakhs, Crores<br>' +
      '&bull; International: Ones, Tens, Hundreds, Thousands, Ten-thousands, Hundred-thousands, Millions<br>' +
      '&bull; Roman numerals: I=1, V=5, X=10, L=50, C=100, D=500, M=1000. No symbol repeated more than 3 times.<br>' +
      '&bull; Rounding: Look at the digit to the right of the target place. 5 or more &rarr; round up.<br>' +
      '&bull; Negative numbers: Used for temperature, depth below sea level, bank overdrafts.',
    timedSeconds: 0
  }
];

async function run() {
  await mongoose.connect(process.env.DATABASE);
  console.log('Connected to MongoDB');

  await Promise.all([
    MathChapter.deleteMany({ grade: GRADE, chapterSlug: CHAPTER_SLUG }),
    MathQuestion.deleteMany({ grade: GRADE, chapterSlug: CHAPTER_SLUG })
  ]);
  console.log('Cleared existing seed data for', GRADE, CHAPTER_SLUG);

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

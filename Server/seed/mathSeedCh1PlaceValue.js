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
    skillId: 'PV-02',
    question: 'In the International number 2,056,789, what digit is in the hundred-thousands place?',
    options: [
      opt('0', true, 'Millions: 2, hundred-thousands: 0, ten-thousands: 5, thousands: 6.'),
      opt('5', false, '5 is in the ten-thousands place.', 'E-d7-a'),
      opt('2', false, '2 is in the millions place.', 'E-d7-b'),
      opt('6', false, '6 is in the thousands place.', 'E-d7-c')
    ],
    backward: 'International place values: ... millions, hundred-thousands, ten-thousands, thousands.',
    forward: 'Reading large numbers accurately is essential for data analysis.',
    misconceptions: [
      {
        misconceptionId: 'E-d7-a',
        description: 'Student answers 5, the ten-thousands digit — one column to the right of the target.',
        rootCause: 'Adjacent-Column Slip — the student counts one column short from the left, landing on ten-thousands instead of hundred-thousands.',
        remediation: 'Write the number into a labelled International chart (Millions | Hundred-thousands | Ten-thousands | Thousands | Hundreds | Tens | Ones) and point to each header while reading the matching digit aloud.'
      },
      {
        misconceptionId: 'E-d7-b',
        description: 'Student answers 2, the millions digit — one column too far left.',
        rootCause: 'Column Overshoot — the student answers with the leading digit for any "which digit" question, without checking which specific column was named.',
        remediation: 'Require the student to point to the named column header first, then slide their finger down to the digit beneath it, before answering.'
      },
      {
        misconceptionId: 'E-d7-c',
        description: 'Student answers 6, the thousands digit — two columns to the right of the target.',
        rootCause: 'Place Miscounting — counting from the right, the student stops two columns short of hundred-thousands.',
        remediation: 'Count columns from the right this time as a cross-check: ones, tens, hundreds, thousands, ten-thousands, hundred-thousands — stop and confirm before answering.'
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: 'Group into periods', hint: 'Split 2,056,789 into groups of three from the right: 2 | 056 | 789.' },
      { level: 2, description: 'Label the middle group', hint: 'In the group "056", which position is hundred-thousands, which is ten-thousands, and which is thousands?' },
      { level: 3, description: 'Read off the digit', hint: 'The hundred-thousands digit is the first digit of the middle group — what is it?' }
    ],
    forwardRiskLinks: [
      { targetSkillId: 'PV-03', probability: 0.7, condition: 'If not remediated before expanded-form work with 7-digit numbers' },
      { targetSkillId: 'CONV-01', probability: 0.45, condition: 'If not remediated before Indian–International conversion drills' }
    ],
    learningObjectives: ['CCSS.MATH.4.NBT.A.1', 'CCSS.MATH.4.NBT.A.2']
  },
  {
    itemId: 'd8', order: 8, cluster: 'COMP', clusterName: CLUSTER_NAMES.COMP,
    skillId: 'COMP-02',
    question: 'Which digit could replace the □ so that 5,4□,321 < 5,45,321 ?',
    options: [
      opt('4', true, 'If □=4, we have 5,44,321, which is less than 5,45,321.'),
      opt('5', false, '5,45,321 is not less than 5,45,321; they are equal.', 'E-d8-a'),
      opt('6', false, '5,46,321 is greater than 5,45,321.', 'E-d8-b'),
      opt('7', false, 'Any digit >5 makes it larger.', 'E-d8-c')
    ],
    backward: 'Compare from the left; if the first digits are equal, move to the next place.',
    forward: 'This logic helps you sort numbers in lists and spreadsheets.',
    misconceptions: [
      {
        misconceptionId: 'E-d8-a',
        description: 'Student picks 5, believing 5,45,321 satisfies 5,4□,321 < 5,45,321.',
        rootCause: 'Boundary Confusion — treats "equal to" as satisfying a strict "less than" comparison, missing that □=5 produces the exact same number on both sides.',
        remediation: 'Underline the < symbol and say aloud "strictly smaller — equal does not count" before testing each candidate digit.'
      },
      {
        misconceptionId: 'E-d8-b',
        description: 'Student picks 6, producing 5,46,321, which is larger, not smaller.',
        rootCause: 'Direction Reversal — compares only how close the candidate digit is to 5 without checking whether it lands above or below it, so a digit greater than 5 gets treated as satisfying "less than".',
        remediation: 'State the rule explicitly before testing: digits 0–4 keep the number smaller; 5 makes it equal; 6 or more makes it larger. Test candidates against that rule, not by feel.'
      },
      {
        misconceptionId: 'E-d8-c',
        description: 'Student picks 7, an even larger digit, making the number even further from satisfying "less than".',
        rootCause: 'Inequality-Sign Misread — reads "<" as "greater than" and searches for a large digit rather than working from the correct direction.',
        remediation: 'Have the student trace the inequality arrow with a finger — the open end points to the larger number — and restate the question as "which digits keep the left side smaller?"'
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: 'Compare the fixed part', hint: 'Both numbers read 5,4_,321 vs 5,45,321 — only the □ digit and the fixed 5 differ.' },
      { level: 2, description: 'Test the boundary digit', hint: 'What happens if □ = 5? Are the two numbers equal or different?' },
      { level: 3, description: 'Find the safe range', hint: 'For the left side to be strictly smaller, □ must be less than 5. Which option is less than 5?' }
    ],
    forwardRiskLinks: [
      { targetSkillId: 'COMP-01', probability: 0.5, condition: 'If not remediated before multi-number ordering tasks' },
      { targetSkillId: 'ALG-01', probability: 0.4, condition: 'If not remediated before solving simple inequalities in early algebra' }
    ],
    learningObjectives: ['CCSS.MATH.4.NBT.A.2']
  },
  {
    itemId: 'd9', order: 9, cluster: 'ROUND', clusterName: CLUSTER_NAMES.ROUND,
    skillId: 'ROUND-01',
    question: 'Round 2,35,671 to the nearest 10,000.',
    options: [
      opt('2,40,000', true, 'The thousands digit is 5, so we round up.'),
      opt('2,30,000', false, 'That would be rounding down; but the thousands digit is 5.', 'E-d9-a'),
      opt('2,35,000', false, "That's rounding to the nearest 1,000.", 'E-d9-b'),
      opt('2,36,000', false, "Again, that's to the nearest 1,000.", 'E-d9-c')
    ],
    backward: 'Rounding to the nearest 10,000: look at the thousands digit (5 here).',
    forward: 'Rounding is used to simplify numbers in news headlines and reports.',
    misconceptions: [
      {
        misconceptionId: 'E-d9-a',
        description: 'Student answers 2,30,000, rounding down regardless of the digit that decides direction.',
        rootCause: 'Direction Default — rounds down out of habit without checking the thousands digit (5), the actual decision digit for rounding to the nearest 10,000.',
        remediation: 'State the rule fresh each time: for nearest 10,000, check the thousands digit. 5 or more rounds up. Never carry the direction over from a previous problem.'
      },
      {
        misconceptionId: 'E-d9-b',
        description: 'Student answers 2,35,000, simply deleting the digits after the thousands place.',
        rootCause: 'Truncation Instead of Rounding — chops off the digits after the target place rather than checking whether the next digit (hundreds=6) warrants rounding up, effectively always rounding down.',
        remediation: 'Contrast truncating vs rounding side by side: truncating 2,35,671 gives 2,35,000, but rounding requires checking the hundreds digit (6) first — since 6≥5, the thousands digit must increase by one.'
      },
      {
        misconceptionId: 'E-d9-c',
        description: 'Student answers 2,36,000, correctly rounding up but to the wrong place.',
        rootCause: 'Target-Place Slip — correctly applies the round-up rule but to the nearest 1,000 (using the hundreds digit) instead of the asked-for nearest 10,000 (which uses the thousands digit).',
        remediation: 'Circle the ten-thousands digit before rounding to lock in the correct target place, and make sure the decision digit checked is the one immediately to its right (thousands, not hundreds).'
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: 'Circle the target place', hint: 'Circle the ten-thousands digit in 2,35,671.' },
      { level: 2, description: 'Check the decision digit', hint: 'The digit right after ten-thousands is the thousands digit. Is it 5 or more?' },
      { level: 3, description: 'Round and clear', hint: 'Since the thousands digit is 5, round the ten-thousands digit up and zero out everything after it.' }
    ],
    forwardRiskLinks: [
      { targetSkillId: 'ROUND-02', probability: 0.5, condition: 'If not remediated before rounding-range puzzle problems' }
    ],
    learningObjectives: ['CCSS.MATH.4.NBT.A.3']
  },
  {
    itemId: 'd10', order: 10, cluster: 'ROMAN', clusterName: CLUSTER_NAMES.ROMAN,
    skillId: 'ROM-01',
    question: 'Write 56 in Roman numerals.',
    options: [
      opt('LVI', true, '50 (L) + 6 (VI) = LVI.'),
      opt('LIV', false, 'LIV = 54.', 'E-d10-a'),
      opt('XLVI', false, 'XLVI = 46.', 'E-d10-b'),
      opt('LXVI', false, 'LXVI = 66.', 'E-d10-c')
    ],
    backward: 'L=50, V=5, I=1. Write the largest symbols first.',
    forward: 'Roman numerals are still used in movie copyright years and clock faces.',
    misconceptions: [
      {
        misconceptionId: 'E-d10-a',
        description: 'Student writes LIV (54), reversing the order of the ones-chunk symbols.',
        rootCause: 'Additive-Subtractive Confusion — reverses V and I within the ones chunk, turning the additive pair VI (5+1=6) into the subtractive pair IV (5-1=4).',
        remediation: 'Compare VI and IV side by side: the symbol written first decides addition or subtraction — smaller-then-larger (I-then-V) subtracts, larger-then-smaller (V-then-I) adds.'
      },
      {
        misconceptionId: 'E-d10-b',
        description: 'Student writes XLVI (46), using a subtractive tens symbol where none is needed.',
        rootCause: 'Over-Subtraction Habit — applies the subtractive pattern (XL=40) out of habit even though 50 needs no subtraction at all, understating the tens component by 10.',
        remediation: 'Check first whether the tens digit (5) has its own direct symbol (L=50) before reaching for a subtractive pair — subtraction is only needed for 4 and 9 in each place.'
      },
      {
        misconceptionId: 'E-d10-c',
        description: 'Student writes LXVI (66), one ten too many.',
        rootCause: 'Tens Digit Inflation — inserts an extra X, effectively converting 56 as though it were 66.',
        remediation: 'Break 56 into 50 + 6 first and convert each part separately (L, then VI) so no extra tens symbol can sneak in.'
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: 'Split into tens and ones', hint: '56 = 50 + 6. Convert each part separately.' },
      { level: 2, description: 'Convert the tens', hint: '50 has its own direct symbol: L. No subtraction needed.' },
      { level: 3, description: 'Convert the ones and join', hint: '6 = 5 + 1 = VI (additive, since 6 > 5). Join: L + VI = ?' }
    ],
    forwardRiskLinks: [
      { targetSkillId: 'ROM-02', probability: 0.5, condition: 'If not remediated before Roman numerals requiring XL/XC/CD/CM subtractive tens and hundreds' }
    ],
    learningObjectives: []
  },
  {
    itemId: 'd11', order: 11, cluster: 'NEG', clusterName: CLUSTER_NAMES.NEG,
    skillId: 'NEG-01',
    question: 'The temperature is \\( -1^\\circ\\text{C} \\). It rises by \\( 3^\\circ\\text{C} \\). What is the new temperature?',
    options: [
      opt('\\( 2^\\circ\\text{C} \\)', true, '-1 + 3 = 2.'),
      opt('\\( -4^\\circ\\text{C} \\)', false, 'That would be -1 - 3.', 'E-d11-a'),
      opt('\\( 4^\\circ\\text{C} \\)', false, 'You added 1 + 3 ignoring the negative sign.', 'E-d11-b'),
      opt('\\( -2^\\circ\\text{C} \\)', false, 'Check your addition: -1 + 3 = 2.', 'E-d11-c')
    ],
    backward: 'A rise means you add the number to the current temperature.',
    forward: 'Temperature changes are a daily application of negative numbers.',
    misconceptions: [
      {
        misconceptionId: 'E-d11-a',
        description: 'Student answers -4°C, moving further negative instead of toward positive.',
        rootCause: 'Same-Sign Default — treats "rises by 3" as continuing in the same (negative) direction, subtracting instead of adding, effectively computing -1-3.',
        remediation: 'Walk a physical number line: start at -1, and for a "rise" always step to the right (toward positive), never left, regardless of the starting sign.'
      },
      {
        misconceptionId: 'E-d11-b',
        description: 'Student answers 4°C, dropping the negative sign on the starting temperature entirely.',
        rootCause: 'Sign-Dropping — ignores the negative sign and computes 1+3 as if the starting temperature were positive 1.',
        remediation: 'Circle the negative sign before starting and say "starting point is below zero" out loud before doing any arithmetic.'
      },
      {
        misconceptionId: 'E-d11-c',
        description: 'Student answers -2°C, keeping the result negative out of habit.',
        rootCause: 'Partial Sign Application — expects the answer to stay negative because the start was negative, without actually tracking the 3-unit move toward zero and beyond.',
        remediation: 'Use a labelled number line from -5 to 5; mark the start at -1 and count 3 steps to the right one at a time, landing on the true answer.'
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: 'Mark the start', hint: 'Mark -1 on a number line.' },
      { level: 2, description: 'Identify the direction', hint: 'A "rise" always moves right, toward positive numbers.' },
      { level: 3, description: 'Count and land', hint: 'Move 3 steps to the right from -1. Where do you land?' }
    ],
    forwardRiskLinks: [
      { targetSkillId: 'NEG-02', probability: 0.6, condition: 'If not remediated before multi-step integer word problems' },
      { targetSkillId: 'INT-01', probability: 0.5, condition: 'If not remediated before formal integer addition in Grade 6' }
    ],
    learningObjectives: []
  },
  {
    itemId: 'd12', order: 12, cluster: 'CONV', clusterName: CLUSTER_NAMES.CONV,
    skillId: 'CONV-01',
    question: 'Convert 2,300,000 (International) into the Indian system.',
    options: [
      opt('23,00,000', true, '2,300,000 = 2.3 million = 23 lakh = 23,00,000.'),
      opt('2,30,00,000', false, 'That would be 23 million.', 'E-d12-a'),
      opt('230,000', false, "That's 230 thousand.", 'E-d12-b'),
      opt('2,30,000', false, "That's 2.3 lakh (230,000).", 'E-d12-c')
    ],
    backward: '1 million = 10 lakh, so 2.3 million = 23 lakh.',
    forward: 'Newspapers in India often use both systems.',
    misconceptions: [
      {
        misconceptionId: 'E-d12-a',
        description: 'Student writes 2,30,00,000, a full order of magnitude too high.',
        rootCause: 'Magnitude Inflation — regroups the digits into Indian commas but inserts an extra digit group, inflating 2.3 million to look like 23 million.',
        remediation: 'Count total digits before and after conversion — 2,300,000 has 7 digits, so the Indian form must also have exactly 7 digits: 23,00,000.'
      },
      {
        misconceptionId: 'E-d12-b',
        description: 'Student writes 230,000, a full order of magnitude too low.',
        rootCause: 'Digit Loss — drops a digit while regrouping, deflating the value by a factor of 10.',
        remediation: 'Strip all commas first to get the raw digit string (2300000) and count its length before inserting new commas — a lost digit shows up immediately as the wrong count.'
      },
      {
        misconceptionId: 'E-d12-c',
        description: 'Student writes 2,30,000, understating the value by a factor of 10.',
        rootCause: 'Digit Loss — drops a digit while regrouping and lands on 2.3 lakh instead of 23 lakh.',
        remediation: 'Anchor to the benchmark fact "1 million = 10 lakh" — since 2,300,000 is 2.3 million, the Indian answer must be 23 lakh (23,00,000), not 2.3 lakh.'
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: 'Strip the commas', hint: 'Remove the commas from 2,300,000 to get the digit string 2300000.' },
      { level: 2, description: 'Apply the benchmark', hint: '1 million = 10 lakh, so 2,300,000 (2.3 million) = 23 lakh.' },
      { level: 3, description: 'Regroup with Indian commas', hint: 'Write 23 lakh with Indian-style commas: 23,00,000.' }
    ],
    forwardRiskLinks: [
      { targetSkillId: 'CONV-02', probability: 0.5, condition: 'If not remediated before converting numbers above 1 crore / 10 million' }
    ],
    learningObjectives: []
  },
  {
    itemId: 'd13', order: 13, cluster: 'PLACE', clusterName: CLUSTER_NAMES.PLACE,
    skillId: 'PV-03',
    question: 'Write the expanded form of 5,04,320 (Indian system).',
    options: [
      opt('\\( 5 \\times 1,00,000 + 4 \\times 1,000 + 3 \\times 100 + 2 \\times 10 \\)', true, '5,04,320 = 5 lakhs + 4 thousands + 3 hundreds + 2 tens.'),
      opt('\\( 5 \\times 1,00,000 + 4 \\times 10,000 + 3 \\times 100 + 2 \\times 10 \\)', false, 'The 4 is in the thousands place, not ten-thousands.', 'E-d13-a'),
      opt('\\( 5 \\times 10,00,000 + 4 \\times 1,000 + 3 \\times 100 + 2 \\times 10 \\)', false, 'That would be 50,00,000, which is too big.', 'E-d13-b'),
      opt('\\( 5 \\times 1,00,000 + 4 \\times 1,000 + 3 \\times 100 + 2 \\)', false, 'The last digit 2 is in the tens place, not ones (the number ends in 320).', 'E-d13-c')
    ],
    backward: 'Expanded form shows the value of each digit according to its place.',
    forward: 'Expanded form helps when learning addition and multiplication algorithms.',
    misconceptions: [
      {
        misconceptionId: 'E-d13-a',
        description: 'Student writes the term as 4 × 10,000, promoting the thousands digit up one column.',
        rootCause: 'Adjacent-Column Slip — assigns the digit 4 to the ten-thousands place instead of its actual thousands place, likely because the ten-thousands place (a silent zero) is skipped when reading left to right.',
        remediation: 'Write every digit of 5,04,320 into a labelled place-value chart, including the zero placeholder, before assigning any digit to a multiplier — zeros must occupy their column, not be skipped over.'
      },
      {
        misconceptionId: 'E-d13-b',
        description: 'Student writes the leading term as 5 × 10,00,000, promoting the lakhs digit up one column into ten-lakhs.',
        rootCause: 'Period Promotion — treats the comma right before the leading digit as marking the start of a new, higher period, inflating 5,04,320 as though it began in the ten-lakhs place.',
        remediation: 'Read the number aloud in words first — "five lakh, four thousand, three hundred twenty" — confirming the leading digit is lakhs, not ten-lakhs, before writing any multiplier.'
      },
      {
        misconceptionId: 'E-d13-c',
        description: 'Student writes the last term as plain 2 instead of 2 × 10, demoting the tens digit down one column to ones.',
        rootCause: 'Adjacent-Column Slip (trailing digit) — reads the last non-zero digit as though it sat in the ones place, missing that the actual ones digit is the silent trailing zero in …320.',
        remediation: 'Underline the ones digit explicitly, even when it is zero, so the tens digit is never mistaken for the final (ones) digit of the number.'
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: 'Chart every digit', hint: 'Write all six digits of 5,04,320 into a place-value chart, including the zeros.' },
      { level: 2, description: 'Assign digit × place', hint: 'For each non-zero digit, write digit × its column value (e.g. 5 × 1,00,000).' },
      { level: 3, description: 'Sum the non-zero terms', hint: 'Add only the terms for digits that are not zero.' }
    ],
    forwardRiskLinks: [
      { targetSkillId: 'MUL-02', probability: 0.5, condition: 'If not remediated before the standard multiplication algorithm, which relies on expanded-form reasoning' },
      { targetSkillId: 'ADD-02', probability: 0.4, condition: 'If not remediated before column addition with zero placeholders' }
    ],
    learningObjectives: ['CCSS.MATH.4.NBT.A.1', 'CCSS.MATH.4.NBT.A.2']
  },
  {
    itemId: 'd14', order: 14, cluster: 'COMP', clusterName: CLUSTER_NAMES.COMP,
    skillId: 'COMP-01',
    question: 'Which statement is true?',
    options: [
      opt('\\( 9,87,654 > 9,87,546 \\)', true, 'Compare the hundreds place: 6 > 5.'),
      opt('\\( 9,87,654 < 9,87,546 \\)', false, '654 is greater than 546.', 'E-d14-a'),
      opt('\\( 9,87,654 = 9,87,546 \\)', false, 'The numbers are different.', 'E-d14-b'),
      opt('Cannot compare', false, 'They have the same number of digits, so they can be compared.', 'E-d14-c')
    ],
    backward: 'Always start from the left and find the first place where digits differ.',
    forward: 'Comparison symbols >, < are used extensively in maths and coding.',
    misconceptions: [
      {
        misconceptionId: 'E-d14-a',
        description: 'Student answers 9,87,654 < 9,87,546, reversing the true comparison.',
        rootCause: 'Last-Digit Comparison — compares only the final digit of each number (4 vs 6) and concludes the number with the smaller last digit is smaller overall, ignoring that the hundreds digit (6 vs 5) already decided the comparison the other way.',
        remediation: 'Teach "first difference wins, scanning left to right" — cross out matching digits from the left until the first different column appears, then compare only that pair.'
      },
      {
        misconceptionId: 'E-d14-b',
        description: 'Student answers "They are equal".',
        rootCause: 'Digit-Count Equivalence — since both numbers share five of six digits (9,87,_54 pattern), the student assumes near-identical numbers must be equal without checking the one column that differs.',
        remediation: 'Line the two numbers up vertically, digit under digit, and physically circle the one column where they differ before deciding equal vs. not equal.'
      },
      {
        misconceptionId: 'E-d14-c',
        description: 'Student answers "Cannot compare".',
        rootCause: 'Comma Overload — the six-digit Indian grouping feels unfamiliar enough that the student avoids making a comparison decision rather than risk scanning incorrectly.',
        remediation: 'Rewrite both numbers without commas, stacked and aligned by place value, to strip away the unfamiliar punctuation before comparing.'
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: 'Align the digits', hint: 'Write both numbers one under the other, digit aligned with digit.' },
      { level: 2, description: 'Scan left to right', hint: 'Cross out matching digits from the left until you find the first column that differs.' },
      { level: 3, description: 'Compare the difference', hint: 'The first differing column is hundreds: 6 vs 5. Which is bigger?' }
    ],
    forwardRiskLinks: [
      { targetSkillId: 'FRA-01', probability: 0.5, condition: 'If not remediated before comparing fractions with unlike denominators' }
    ],
    learningObjectives: ['CCSS.MATH.4.NBT.A.2']
  },
  {
    itemId: 'd15', order: 15, cluster: 'ROUND', clusterName: CLUSTER_NAMES.ROUND,
    skillId: 'ROUND-02',
    question: 'Which number will become 5,000 when rounded to the nearest 1,000?',
    options: [
      opt('4,501', true, '4,501 rounds up to 5,000 because the hundreds digit is 5.'),
      opt('4,499', false, '4,499 rounds down to 4,000 (hundreds digit 4).', 'E-d15-a'),
      opt('5,500', false, '5,500 rounds up to 6,000 (hundreds digit 5).', 'E-d15-b'),
      opt('5,501', false, '5,501 rounds to 6,000 (hundreds digit 5).', 'E-d15-c')
    ],
    backward: 'Numbers from 4,500 to 5,499 round to 5,000.',
    forward: 'Understanding rounding helps with estimating sums and differences.',
    misconceptions: [
      {
        misconceptionId: 'E-d15-a',
        description: 'Student picks 4,499, one below the true lower boundary.',
        rootCause: 'Boundary Misjudgment — picks a number that merely looks close to 5,000 rather than checking it against the actual rounding interval [4,500, 5,499].',
        remediation: 'Draw the interval on a number line: mark 4,500 and 5,499 as the two endpoints that round to 5,000, and test each candidate against those exact endpoints rather than by eye.'
      },
      {
        misconceptionId: 'E-d15-b',
        description: 'Student picks 5,500, believing it still rounds down to 5,000.',
        rootCause: 'Off-by-One Interval — believes the interval rounding to 5,000 extends up to and including 5,500, missing that the true upper boundary is 5,499 and 5,500 already rounds up to 6,000.',
        remediation: 'State the rule precisely: for a target of 5,000, the interval is [4,500, 5,499] — check the hundreds digit of each candidate, don\'t estimate by "closeness".'
      },
      {
        misconceptionId: 'E-d15-c',
        description: 'Student picks 5,501, believing numbers just above 5,000 still round down to it.',
        rootCause: 'Upper-Bound Confusion — assumes numbers just above 5,000 still round down to 5,000, not realising any number with a hundreds digit of 5 or more rounds up to the next thousand.',
        remediation: 'Test 5,501 directly against the rule: hundreds digit is 5, which is ≥5, so it rounds up to 6,000 — confirm with the actual procedure rather than intuition about closeness.'
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: 'Find the interval', hint: 'Which numbers round to 5,000? The interval is 4,500 up to 5,499.' },
      { level: 2, description: 'Test each candidate', hint: 'Check each option: does it fall inside [4,500, 5,499]?' },
      { level: 3, description: 'Confirm with the rule', hint: 'Apply the standard rounding rule to your chosen candidate to double-check.' }
    ],
    forwardRiskLinks: [
      { targetSkillId: 'ROUND-01', probability: 0.4, condition: 'If not remediated before straightforward single-number rounding tasks' }
    ],
    learningObjectives: ['CCSS.MATH.4.NBT.A.3']
  },
  {
    itemId: 'd16', order: 16, cluster: 'ROMAN', clusterName: CLUSTER_NAMES.ROMAN,
    skillId: 'ROM-01',
    question: 'Which is larger: XL or LX?',
    options: [
      opt('LX', true, 'LX = 60, XL = 40.'),
      opt('XL', false, 'XL = 40, LX = 60, so LX is larger.', 'E-d16-a'),
      opt('Both are equal', false, 'They represent different numbers.', 'E-d16-b'),
      opt('Cannot compare', false, 'Both are valid Roman numerals and can be compared.', 'E-d16-c')
    ],
    backward: 'L=50, X=10; XL means 50-10=40, LX means 50+10=60.',
    forward: 'Comparing Roman numerals is like comparing numbers in any other base.',
    misconceptions: [
      {
        misconceptionId: 'E-d16-a',
        description: 'Student picks XL as the larger numeral.',
        rootCause: 'Symbol-Order Blindness — treats XL and LX as the same two symbols regardless of order, not registering that placing X before L (subtract) versus after L (add) changes the value by 20.',
        remediation: 'Write both numerals with an arrow showing "before = subtract, after = add": X-before-L means 50-10=40; X-after-L means 50+10=60.'
      },
      {
        misconceptionId: 'E-d16-b',
        description: 'Student answers "Both are equal".',
        rootCause: 'Anagram Assumption — treats XL and LX as interchangeable since they use the same two letters, unaware that symbol order determines addition versus subtraction in Roman numerals.',
        remediation: 'Contrast a clear pair side by side — IV (4) vs VI (6) — to show that reordering the same two Roman symbols changes the value, exactly as with XL vs LX.'
      },
      {
        misconceptionId: 'E-d16-c',
        description: 'Student answers "Cannot compare".',
        rootCause: 'Roman-Numeral Avoidance — unfamiliarity with converting Roman numerals leads the student to treat the comparison as unanswerable rather than converting both to Hindu-Arabic first.',
        remediation: 'Always convert Roman numerals to Hindu-Arabic numbers before comparing, ordering, or operating on them — comparison becomes routine once both are in a trusted numeral system.'
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: 'Convert both', hint: 'Convert XL and LX to Hindu-Arabic numbers.' },
      { level: 2, description: 'Compare the values', hint: 'XL = 40, LX = 60. Which is bigger?' },
      { level: 3, description: 'State the answer', hint: 'Since 60 > 40, which numeral is larger?' }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: 'd17', order: 17, cluster: 'NEG', clusterName: CLUSTER_NAMES.NEG,
    skillId: 'NEG-01',
    question: 'A diver is 5 m below sea level (which we write as -5). She goes up 2 m. Where is she now?',
    options: [
      opt('-3 m', true, '-5 + 2 = -3.'),
      opt('3 m above sea level', false, '-5 + 2 is still negative.', 'E-d17-a'),
      opt('-7 m', false, 'That would be -5 - 2.', 'E-d17-b'),
      opt('7 m below sea level', false, 'You ignored the sign and added.', 'E-d17-c')
    ],
    backward: 'Moving up means adding (becoming less negative).',
    forward: 'This is the same as calculating bank balances or floors in a building.',
    misconceptions: [
      {
        misconceptionId: 'E-d17-a',
        description: 'Student answers 3 m above sea level.',
        rootCause: 'Sign-Dropping — ignores the negative starting depth and computes 5-2=3 as a plain subtraction, then reports the result as though it were automatically above sea level.',
        remediation: 'Anchor the scenario to a vertical number line with sea level at 0; mark the diver\'s start at -5 and move up (toward 0) exactly 2 units to see where she actually lands.'
      },
      {
        misconceptionId: 'E-d17-b',
        description: 'Student answers -7 m.',
        rootCause: 'Same-Sign Default — treats "goes up" as continuing in the same negative direction, subtracting 2 more instead of adding, computing -5-2 rather than -5+2.',
        remediation: 'State the rule and reuse it every time: "up" or "rises" always means add; "down" or "dives" always means subtract — regardless of the current sign.'
      },
      {
        misconceptionId: 'E-d17-c',
        description: 'Student answers 7 m below sea level.',
        rootCause: 'Magnitude-Only Arithmetic — adds the two magnitudes (5+2=7) and keeps the "below sea level" label from the starting position, ignoring that moving up should reduce the depth, not increase it.',
        remediation: 'Use a vertical number line and move a marker in the actual direction of "up" to watch the depth number get smaller, not larger.'
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: 'Mark the start', hint: 'Mark -5 on a vertical number line.' },
      { level: 2, description: 'Identify the direction', hint: '"Up" always moves toward 0 (positive). Which way is that on your line?' },
      { level: 3, description: 'Move and read', hint: 'Move 2 units up from -5. Where do you land?' }
    ],
    forwardRiskLinks: [
      { targetSkillId: 'NEG-02', probability: 0.55, condition: 'If not remediated before multi-step depth/elevation word problems' }
    ],
    learningObjectives: []
  },
  {
    itemId: 'd18', order: 18, cluster: 'CONV', clusterName: CLUSTER_NAMES.CONV,
    skillId: 'CONV-01',
    question: '1 million = how many lakhs?',
    options: [
      opt('10 lakhs', true, '1 million = 1,000,000; 1 lakh = 100,000, so 10 lakhs.'),
      opt('100 lakhs', false, 'That would be 1 crore (10 million).', 'E-d18-a'),
      opt('1 lakh', false, '1 lakh = 100,000, which is only one-tenth of a million.', 'E-d18-b'),
      opt('5 lakhs', false, "That's half a million.", 'E-d18-c')
    ],
    backward: 'Remember: 1,000,000 ÷ 100,000 = 10.',
    forward: 'This conversion is essential for reading international and Indian financial news.',
    misconceptions: [
      {
        misconceptionId: 'E-d18-a',
        description: 'Student answers 100 lakhs.',
        rootCause: 'Unit Overshoot — confuses the million-to-lakh benchmark with the crore-to-lakh benchmark, applying the ×100 relationship (1 crore = 100 lakh) instead of the correct ×10 relationship (1 million = 10 lakh).',
        remediation: 'Build a small conversion ladder and post it: 1 lakh = 1,00,000; 1 million = 10,00,000 (10 lakh); 1 crore = 1,00,00,000 (100 lakh) — always check which two units are actually being compared.'
      },
      {
        misconceptionId: 'E-d18-b',
        description: 'Student answers 1 lakh.',
        rootCause: 'Unit Equivalence Assumption — assumes "million" and "lakh" name the same magnitude since both are large unfamiliar-sounding words, rather than recalling their actual ratio.',
        remediation: 'Anchor both to the same digit count: 1 lakh = 100,000 (6 digits), 1 million = 1,000,000 (7 digits) — different digit counts mean they cannot be equal.'
      },
      {
        misconceptionId: 'E-d18-c',
        description: 'Student answers 5 lakhs.',
        rootCause: 'Halving Guess — guesses a million is "about double" a lakh rather than applying the exact 10:1 ratio between the two units.',
        remediation: 'Verify with exact arithmetic: 1,000,000 ÷ 100,000 = 10, not a rough halving — always compute the ratio rather than estimate it.'
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: 'Write both in full', hint: 'Write 1 lakh (1,00,000) and 1 million (10,00,000) with all their digits.' },
      { level: 2, description: 'Count the extra zero', hint: 'How many extra zeros does 1 million have compared to 1 lakh?' },
      { level: 3, description: 'State the ratio', hint: 'One extra zero means multiplying by 10. So 1 million = ? lakh.' }
    ],
    forwardRiskLinks: [
      { targetSkillId: 'CONV-02', probability: 0.4, condition: 'If not remediated before crore-to-million conversions' }
    ],
    learningObjectives: []
  },
  {
    itemId: 'd19', order: 19, cluster: 'PLACE', clusterName: CLUSTER_NAMES.PLACE,
    skillId: 'PV-04',
    question: 'How many ten-thousands are there in 4,73,000?',
    options: [
      opt('7', true, '4,73,000 = 4 lakhs + 7 ten-thousands + 3 thousands.'),
      opt('4', false, '4 is the number of lakhs.', 'E-d19-a'),
      opt('3', false, '3 is the number of thousands.', 'E-d19-b'),
      opt('0', false, 'The ten-thousands place is not zero.', 'E-d19-c')
    ],
    backward: 'Break the number into periods: lakhs (4), thousands (73), ones (000).',
    forward: 'Understanding large numbers is vital for topics like population and budgets.',
    misconceptions: [
      {
        misconceptionId: 'E-d19-a',
        description: 'Student answers 4, the lakhs digit.',
        rootCause: 'Column Misidentification — reports the leftmost digit (lakhs) as the answer regardless of which place value the question actually names.',
        remediation: 'Have the student restate the question in their own words — "how many ten-thousands" — and point to the ten-thousands header on a place-value chart before answering.'
      },
      {
        misconceptionId: 'E-d19-b',
        description: 'Student answers 3, the thousands digit — one column to the right of ten-thousands.',
        rootCause: 'Adjacent-Column Slip — reads the column immediately to the right of ten-thousands instead of the target column itself.',
        remediation: 'Underline the ten-thousands column specifically on a written place-value chart and read only that column\'s digit.'
      },
      {
        misconceptionId: 'E-d19-c',
        description: 'Student answers 0, assuming the ten-thousands place is empty.',
        rootCause: 'Place Miscounting — loses track of which column is ten-thousands partway through the six-digit number and defaults to a column that actually is zero (hundreds, tens, or ones).',
        remediation: 'Write out all six digits of 4,73,000 into a labelled chart — Lakhs 4, Ten-thousands 7, Thousands 3, Hundreds 0, Tens 0, Ones 0 — confirming the ten-thousands digit is 7, not 0.'
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: 'Chart all six digits', hint: 'Write 4,73,000 into a labelled place-value chart.' },
      { level: 2, description: 'Locate the target column', hint: 'Find the ten-thousands column specifically.' },
      { level: 3, description: 'Read the digit', hint: 'What digit sits in the ten-thousands column?' }
    ],
    forwardRiskLinks: [
      { targetSkillId: 'PV-03', probability: 0.5, condition: 'If not remediated before expanded-form work' }
    ],
    learningObjectives: ['CCSS.MATH.4.NBT.A.1']
  },
  {
    itemId: 'd20', order: 20, cluster: 'COMP', clusterName: CLUSTER_NAMES.COMP,
    skillId: 'COMP-01',
    question: 'Arrange in ascending order: 1,23,456; 1,32,456; 1,22,456.',
    options: [
      opt('1,22,456; 1,23,456; 1,32,456', true, '22 thousand < 23 thousand < 32 thousand.'),
      opt('1,32,456; 1,23,456; 1,22,456', false, "That's descending.", 'E-d20-a'),
      opt('1,23,456; 1,22,456; 1,32,456', false, '1,22,456 should come first.', 'E-d20-b'),
      opt('1,22,456; 1,32,456; 1,23,456', false, '1,23,456 should come before 1,32,456.', 'E-d20-c')
    ],
    backward: 'Ascending order means smallest to largest.',
    forward: 'Sorting data is a fundamental skill in statistics.',
    misconceptions: [
      {
        misconceptionId: 'E-d20-a',
        description: 'Student orders the numbers largest to smallest.',
        rootCause: 'Direction Reversal — correctly ranks the numbers by size but writes them largest-to-smallest, confusing "ascending" with "descending".',
        remediation: 'Anchor the vocabulary physically: ascending = climbing stairs upward = smallest first. Say the meaning aloud before ordering.'
      },
      {
        misconceptionId: 'E-d20-b',
        description: 'Student writes 1,23,456; 1,22,456; 1,32,456 — the first two are swapped.',
        rootCause: 'Partial Scan — compares only the first two numbers encountered and stops before checking all three against each other, missing that 1,22,456 is actually the smallest.',
        remediation: 'Insist on comparing every number to every other number at least once before finalising the order.'
      },
      {
        misconceptionId: 'E-d20-c',
        description: 'Student writes 1,22,456; 1,32,456; 1,23,456 — the last two are swapped.',
        rootCause: 'Middle-Value Misplacement — correctly finds the smallest number, then compares the remaining two using the wrong column, swapping their order.',
        remediation: 'After placing the smallest, re-compare only the two numbers left over from scratch, ignoring the one already placed.'
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: 'Line up all three', hint: 'Write all three numbers underneath each other, digits aligned by place value.' },
      { level: 2, description: 'Find the smallest first', hint: 'Compare the thousands-period digits: 23, 32, 22. Which is smallest?' },
      { level: 3, description: "Order what's left", hint: 'Compare the remaining two numbers the same way, and place all three smallest-to-largest.' }
    ],
    forwardRiskLinks: [],
    learningObjectives: ['CCSS.MATH.4.NBT.A.2']
  },
  {
    itemId: 'd21', order: 21, cluster: 'ROUND', clusterName: CLUSTER_NAMES.ROUND,
    skillId: 'ROUND-01',
    question: 'Round 49,999 to the nearest 100.',
    options: [
      opt('50,000', true, 'The tens digit is 9 (≥5), so we round up the hundreds place from 9 to 10, carrying over to give 50,000.'),
      opt('49,000', false, 'That would be rounding to the nearest 1,000.', 'E-d21-a'),
      opt('49,900', false, 'Incorrect; the tens digit causes the hundreds to round up.', 'E-d21-b'),
      opt('50,100', false, 'Too high.', 'E-d21-c')
    ],
    backward: "When rounding to nearest 100, look at the tens digit. If it's 5 or more, increase the hundreds digit by 1 and change the rest to zeros.",
    forward: 'Rounding large numbers is common in population estimates.',
    misconceptions: [
      {
        misconceptionId: 'E-d21-a',
        description: 'Student answers 49,000, one place value too coarse.',
        rootCause: 'Target-Place Slip — rounds to the nearest 1,000 instead of the nearest 100, sidestepping the carry the correct rounding produces.',
        remediation: 'Circle the hundreds digit (9) before rounding to lock in the correct target place, separate from any carry question.'
      },
      {
        misconceptionId: 'E-d21-b',
        description: 'Student answers 49,900, correctly spotting the round-up but not carrying it through.',
        rootCause: 'Carry Omission — correctly identifies that the tens digit (9) signals a round-up but fails to carry the resulting +1 through the string of 9s in the hundreds, thousands, and ten-thousands places, leaving them unchanged.',
        remediation: 'Practise the "carry the one" cascade explicitly with a string of 9s: rounding 49,999 up forces every 9 to roll over to 0 and the leading 4 to become 5 — write out the carry column by column.'
      },
      {
        misconceptionId: 'E-d21-c',
        description: 'Student answers 50,100, adding an extra hundred beyond the correct rounded value.',
        rootCause: 'Over-Rounding — applies the round-up correctly but adds an extra 100 beyond the target, likely double-counting the carry as though it needed to be added again after the cascade completed.',
        remediation: 'Verify the answer by rounding down first (49,900) then checking that rounding up crosses exactly one increment of 100 to 50,000 — no further addition is needed.'
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: 'Circle target and decision digits', hint: 'Circle the hundreds digit and the tens digit right after it in 49,999.' },
      { level: 2, description: 'Decide the direction', hint: 'The tens digit is 9, which is ≥5, so round up.' },
      { level: 3, description: 'Carry the cascade', hint: 'Rounding up a string of 9s carries all the way through: 49,999 → 50,000.' }
    ],
    forwardRiskLinks: [
      { targetSkillId: 'ADD-02', probability: 0.5, condition: 'If not remediated before column addition problems that require carrying across multiple places' }
    ],
    learningObjectives: ['CCSS.MATH.3.NBT.A.1']
  },
  {
    itemId: 'd22', order: 22, cluster: 'ROMAN', clusterName: CLUSTER_NAMES.ROMAN,
    skillId: 'ROM-01',
    question: 'Convert XXIX to a number.',
    options: [
      opt('29', true, 'XX=20, IX=9 → 29.'),
      opt('31', false, 'That would be XXXI.', 'E-d22-a'),
      opt('19', false, 'XIX = 19.', 'E-d22-b'),
      opt('21', false, 'That would be XXI.', 'E-d22-c')
    ],
    backward: 'I before X means subtract: IX = 9.',
    forward: 'Roman numeral knowledge is useful for history and classic literature references.',
    misconceptions: [
      {
        misconceptionId: 'E-d22-a',
        description: 'Student answers 31, reading the final I and X as separately added symbols.',
        rootCause: 'Subtractive-Pair Misread — reads the final I and X as two separately added symbols (1+10=11) rather than recognising IX as the subtractive pair worth 9, inflating the total by 2.',
        remediation: 'Highlight every subtractive pair (smaller-before-larger) before adding anything: in XXIX, the pair IX must be converted to 9 as a single unit before combining with XX.'
      },
      {
        misconceptionId: 'E-d22-b',
        description: 'Student answers 19, merging the repeated X into a single symbol.',
        rootCause: 'Segment Confusion — misreads the leading XX (20) as a single X (10), visually merging the repeated symbol into one, giving X + IX = 10 + 9 = 19.',
        remediation: 'Count each repeated symbol individually before converting: XX is two separate X\'s (10+10=20), not one.'
      },
      {
        misconceptionId: 'E-d22-c',
        description: 'Student answers 21, dropping the subtractive relationship in the final pair.',
        rootCause: 'Subtractive-Pair Omission — correctly reads XX as 20 but drops the subtractive relationship in the final IX, reading it as a plain I (1) instead of 9, undercounting by 8.',
        remediation: 'Always check the symbol immediately before the last one: if it is smaller than what follows, the two form a subtractive pair and must be converted together, not read as separate symbols.'
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: 'Segment the numeral', hint: 'Split XXIX into XX | IX.' },
      { level: 2, description: 'Convert each segment', hint: 'XX = 20. IX = 9 (subtractive pair, one less than 10).' },
      { level: 3, description: 'Add the segments', hint: '20 + 9 = ?' }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: 'd23', order: 23, cluster: 'NEG', clusterName: CLUSTER_NAMES.NEG,
    skillId: 'NEG-01',
    question: 'What is 2 more than -4?',
    options: [
      opt('-2', true, '-4 + 2 = -2.'),
      opt('2', false, 'You forgot the negative sign.', 'E-d23-a'),
      opt('-6', false, 'That would be -4 - 2.', 'E-d23-b'),
      opt('6', false, 'That would be 4 + 2.', 'E-d23-c')
    ],
    backward: 'Adding a positive number moves you to the right on a number line.',
    forward: 'This is the foundation for algebraic addition of integers.',
    misconceptions: [
      {
        misconceptionId: 'E-d23-a',
        description: 'Student answers 2, dropping the negative sign and subtracting instead of adding.',
        rootCause: 'Sign-Dropping — reads "-4" as though it were 4, and subtracts the 2 instead of adding it, losing the negative context entirely.',
        remediation: 'Restate the phrase as an equation first — "2 more than -4" means -4 + 2 — before touching any signs, and keep the negative sign attached to its digit through every step.'
      },
      {
        misconceptionId: 'E-d23-b',
        description: 'Student answers -6, moving further negative instead of toward positive.',
        rootCause: 'Same-Sign Default — treats "more than" as continuing in the same negative direction, subtracting 2 from -4 instead of adding, computing -4-2.',
        remediation: 'State the rule and reuse it: "more than" always means add, regardless of whether the starting number is negative or positive.'
      },
      {
        misconceptionId: 'E-d23-c',
        description: 'Student answers 6, dropping the negative sign and adding as if the start were positive.',
        rootCause: 'Sign-Dropping (additive) — ignores the negative sign on -4 and simply adds 4+2=6 as though the starting number were positive.',
        remediation: 'Plot -4 on a number line first, then count 2 steps to the right (toward positive), landing on the true answer rather than adding magnitudes blindly.'
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: 'Write as an equation', hint: '"2 more than -4" means -4 + 2.' },
      { level: 2, description: 'Mark the start', hint: 'Mark -4 on a number line.' },
      { level: 3, description: 'Move and read', hint: 'Move 2 steps to the right from -4. Where do you land?' }
    ],
    forwardRiskLinks: [
      { targetSkillId: 'NEG-02', probability: 0.5, condition: 'If not remediated before multi-step integer word problems' },
      { targetSkillId: 'ALG-02', probability: 0.4, condition: 'If not remediated before solving linear equations with negative coefficients' }
    ],
    learningObjectives: []
  },
  {
    itemId: 'd24', order: 24, cluster: 'CONV', clusterName: CLUSTER_NAMES.CONV,
    skillId: 'CONV-01',
    question: 'Which number is written in the International system?',
    options: [
      opt('1,234,567', true, 'International uses commas every three digits: millions, thousands, ones.'),
      opt('12,34,567', false, "That's the Indian system.", 'E-d24-a'),
      opt('1,23,45,678', false, "That's also Indian grouping (crores, lakhs).", 'E-d24-b'),
      opt('12345', false, 'No commas, but if commas were added, it could be either; the presence of commas identifies the system.', 'E-d24-c')
    ],
    backward: 'Indian commas: first after hundreds, then after thousands, then after lakhs. International: every three digits.',
    forward: 'Recognising the system helps when reading foreign or domestic news.',
    misconceptions: [
      {
        misconceptionId: 'E-d24-a',
        description: 'Student picks 12,34,567, which is Indian-grouped.',
        rootCause: 'Grouping-Rule Confusion — recognises the number as large and comma-separated but doesn\'t check the actual comma spacing, missing that groups of two (Indian) rather than three (International) were used.',
        remediation: 'Contrast the two rules side by side: Indian groups as 3, then 2, 2, 2…; International groups as 3, 3, 3… Count the digits between each comma to identify which rule was used.'
      },
      {
        misconceptionId: 'E-d24-b',
        description: 'Student picks 1,23,45,678, which is Indian-grouped (crores/lakhs).',
        rootCause: 'Grouping-Rule Confusion (extended) — the same misidentification applied to a longer Indian-grouped number, missing the repeating groups-of-two pattern after the first three digits.',
        remediation: 'Count digits between commas from the right: International is always 3-3-3…; any 2-digit group signals Indian.'
      },
      {
        misconceptionId: 'E-d24-c',
        description: 'Student picks 12345, a number with no commas at all.',
        rootCause: 'Punctuation-Independent Assumption — assumes an unpunctuated number could represent either system, missing that the presence and spacing of commas is exactly what distinguishes the two systems.',
        remediation: 'Clarify that the question asks which number, as written, follows International comma rules — a number with no commas demonstrates neither system\'s grouping and so cannot be the answer.'
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: 'Find the commas', hint: 'Locate the commas in each option.' },
      { level: 2, description: 'Count between commas', hint: 'Count the digits between commas, working from the right.' },
      { level: 3, description: 'Match the pattern', hint: 'International groups are always 3-3-3… Which option matches?' }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  }
];

const level1Recheck = [
  {
    itemId: 'r1', order: 1, cluster: 'PLACE', clusterName: CLUSTER_NAMES.PLACE,
    skillId: 'PV-02',
    question: 'What is the place value of 3 in 43,21,789?',
    options: [
      opt('3,00,000 (3 lakhs)', true, 'The number is 43 lakh 21 thousand 789. The 3 is in the lakhs place.'),
      opt('30,000', false, 'That would be the ten-thousands place.', 'E-r1-a'),
      opt('3,000', false, 'That would be the thousands place.', 'E-r1-b'),
      opt('3,00,00,000', false, 'That would be crores.', 'E-r1-c')
    ],
    misconceptions: [
      {
        misconceptionId: 'E-r1-a',
        description: 'Student answers 30,000, one column to the right of the lakhs place.',
        rootCause: 'Adjacent-Column Slip — reads the leading digit as though it sat in the ten-thousands column instead of the lakhs column.',
        remediation: 'Chart the digits of 43,21,789 into a labelled place-value chart before naming any single digit\'s value.'
      },
      {
        misconceptionId: 'E-r1-b',
        description: 'Student answers 3,000, two columns to the right.',
        rootCause: 'Place Miscounting — under-counts by two columns, landing on thousands instead of lakhs.',
        remediation: 'Mark the number into periods first — 43 | 21 | 789 — and identify which period the target digit falls in before naming its exact column.'
      },
      {
        misconceptionId: 'E-r1-c',
        description: 'Student answers 3,00,00,000, one full period too high.',
        rootCause: 'Period Promotion — mistakes the comma before the 3 as the start of the crores period.',
        remediation: 'Read the number aloud in words — "forty-three lakh, twenty-one thousand, seven hundred eighty-nine" — to hear which period the 3 actually belongs to.'
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: 'Split into periods', hint: '43,21,789 splits into 43 | 21 | 789.' },
      { level: 2, description: 'Read within the period', hint: "In the leading group '43', which digit is lakhs and which is ten-lakhs?" },
      { level: 3, description: 'Assign the value', hint: '3 is the lakhs digit, so its value is 3 × 1,00,000 = ?' }
    ],
    forwardRiskLinks: [
      { targetSkillId: 'PV-03', probability: 0.6, condition: 'If not remediated before expanded-form work' }
    ],
    learningObjectives: ['CCSS.MATH.4.NBT.A.1']
  },
  {
    itemId: 'r2', order: 2, cluster: 'COMP', clusterName: CLUSTER_NAMES.COMP,
    skillId: 'COMP-01',
    question: 'Which is the largest? 6,54,321; 6,45,321; 6,54,312; 6,45,312.',
    options: [
      opt('6,54,321', true, 'Ten-thousands digit 5 > 4; and 321 > 312 in the last comparison.'),
      opt('6,45,321', false, '4 in ten-thousands is smaller than 5.', 'E-r2-a'),
      opt('6,54,312', false, 'It is almost the same but 312 < 321.', 'E-r2-b'),
      opt('6,45,312', false, 'Smallest among these.', 'E-r2-c')
    ],
    misconceptions: [
      {
        misconceptionId: 'E-r2-a',
        description: 'Student picks 6,45,321 as largest.',
        rootCause: 'First-Digit Trust — all four numbers share the same leading digits pattern, so the student grabs one without scanning the ten-thousands column (4 vs 5) that actually decides the largest.',
        remediation: 'Force a strict left-to-right scan across all four numbers at once, eliminating any number that is not the largest at each column.'
      },
      {
        misconceptionId: 'E-r2-b',
        description: 'Student picks 6,54,312 as largest.',
        rootCause: 'Trailing-Digit Neglect — correctly narrows to the numbers starting 6,54,3.. but stops scanning before the final digit (312 vs 321), missing the last difference.',
        remediation: 'Continue the column-by-column scan all the way to the ones digit — do not stop once the numbers "look similar".'
      },
      {
        misconceptionId: 'E-r2-c',
        description: 'Student picks 6,45,312 as largest — actually the smallest.',
        rootCause: 'Compound Error — combines the ten-thousands mix-up with the trailing-digit neglect, selecting the number that is smallest on both counts.',
        remediation: 'Eliminate numbers one comparison at a time: compare two fully to the last digit, discard the smaller, then bring in the next number.'
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: 'Align all four', hint: 'Write all four numbers stacked with digits aligned by column.' },
      { level: 2, description: 'Scan the ten-thousands column', hint: 'Compare the ten-thousands digit: 4 vs 5. Which numbers survive?' },
      { level: 3, description: 'Break the remaining tie', hint: 'Among the survivors, compare the ones digit: 321 vs 312.' }
    ],
    forwardRiskLinks: [],
    learningObjectives: ['CCSS.MATH.4.NBT.A.2']
  },
  {
    itemId: 'r3', order: 3, cluster: 'ROUND', clusterName: CLUSTER_NAMES.ROUND,
    skillId: 'ROUND-01',
    question: 'Round 5,871 to the nearest 100.',
    options: [
      opt('5,900', true, 'The tens digit is 7 (≥5), so round up the hundreds from 8 to 9.'),
      opt('5,800', false, 'That would be rounding down.', 'E-r3-a'),
      opt('6,000', false, "That's to the nearest thousand.", 'E-r3-b'),
      opt('5,870', false, "That's to the nearest ten.", 'E-r3-c')
    ],
    misconceptions: [
      {
        misconceptionId: 'E-r3-a',
        description: 'Student answers 5,800, rounding down regardless of the tens digit.',
        rootCause: 'Direction Default — rounds down out of habit without checking the tens digit (7), the actual decision digit.',
        remediation: 'Re-run the fixed rule every time: check the tens digit first, then decide — never guess the direction.'
      },
      {
        misconceptionId: 'E-r3-b',
        description: 'Student answers 6,000, one place value too coarse.',
        rootCause: 'Target-Place Slip — rounds to the nearest 1,000 instead of the nearest 100.',
        remediation: 'Circle the hundreds digit before rounding so the target place is fixed.'
      },
      {
        misconceptionId: 'E-r3-c',
        description: 'Student answers 5,870, one place value too fine.',
        rootCause: 'Target-Place Slip (too fine) — rounds to the nearest 10 and keeps the digits mostly unchanged instead of making a true hundreds-level rounding decision.',
        remediation: 'Ask "which digit am I allowed to change?" — for nearest-100, only the hundreds digit and everything after it may change.'
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: 'Circle the target place', hint: 'Circle the hundreds digit in 5,871.' },
      { level: 2, description: 'Check the decision digit', hint: 'The tens digit is 7. Is it 5 or more?' },
      { level: 3, description: 'Round and clear', hint: 'Since the tens digit is 7, round the hundreds digit up and zero out the rest.' }
    ],
    forwardRiskLinks: [
      { targetSkillId: 'EST-01', probability: 0.5, condition: 'If not remediated before estimation word problems' }
    ],
    learningObjectives: ['CCSS.MATH.3.NBT.A.1']
  },
  {
    itemId: 'r4', order: 4, cluster: 'ROMAN', clusterName: CLUSTER_NAMES.ROMAN,
    skillId: 'ROM-01',
    question: 'What is XLVIII in Hindu-Arabic numerals?',
    options: [
      opt('48', true, 'XL=40, VIII=8 → 48.'),
      opt('58', false, 'That would be LVIII.', 'E-r4-a'),
      opt('42', false, 'That would be XLII.', 'E-r4-b'),
      opt('68', false, 'That would be LXVIII.', 'E-r4-c')
    ],
    misconceptions: [
      {
        misconceptionId: 'E-r4-a',
        description: 'Student answers 58, reading XL as L.',
        rootCause: 'Tens-Symbol Substitution — misreads XL (40) as L (50), losing the subtractive relationship and inflating the tens component by 10.',
        remediation: 'Highlight the subtractive pair XL before anything else: X-before-L means 50-10=40, never plain 50.'
      },
      {
        misconceptionId: 'E-r4-b',
        description: 'Student answers 42, undercounting the ones symbols.',
        rootCause: 'Ones-Symbol Undercount — correctly reads XL=40 but miscounts the I\'s in VIII, treating it as fewer than four I\'s after the V.',
        remediation: 'Count each I individually in VIII: V(5) + I + I + I (3 more) = 8 — tally the I\'s one at a time rather than estimating.'
      },
      {
        misconceptionId: 'E-r4-c',
        description: 'Student answers 68, reading XL as LX.',
        rootCause: 'Tens-Symbol Substitution (opposite) — misreads XL (40) as LX (60), swapping which symbol is subtracted from which, adding 10 instead of subtracting it.',
        remediation: 'Contrast XL and LX side by side: X-before-L subtracts (40); the reverse order would add — always check the symbol order.'
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: 'Split into chunks', hint: 'Split XLVIII into XL | VIII.' },
      { level: 2, description: 'Convert each chunk', hint: 'XL = 40 (subtractive). VIII = 8 (additive: 5+1+1+1).' },
      { level: 3, description: 'Add the chunks', hint: '40 + 8 = ?' }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: 'r5', order: 5, cluster: 'NEG', clusterName: CLUSTER_NAMES.NEG,
    skillId: 'NEG-01',
    question: 'Which is warmer: \\( -9^\\circ\\text{C} \\) or \\( -4^\\circ\\text{C} \\)?',
    options: [
      opt('\\( -4^\\circ\\text{C} \\)', true, '-4 is closer to 0 than -9, so it is warmer.'),
      opt('\\( -9^\\circ\\text{C} \\)', false, '-9 is colder.', 'E-r5-a'),
      opt('Both are equal', false, '-4 > -9.', 'E-r5-b'),
      opt('Cannot say', false, 'We can easily compare negative numbers.', 'E-r5-c')
    ],
    misconceptions: [
      {
        misconceptionId: 'E-r5-a',
        description: 'Student picks -9°C as warmer.',
        rootCause: 'Magnitude-Only Comparison — compares digits 9 and 4 as if positive, picking the larger digit as "warmer" without flipping the order for negative values.',
        remediation: 'Anchor to a vertical thermometer: further down (more negative) is always colder, regardless of which digit looks bigger.'
      },
      {
        misconceptionId: 'E-r5-b',
        description: 'Student answers "Both are equal".',
        rootCause: 'Sign-Blindness — fails to register that -9 and -4 are meaningfully different quantities.',
        remediation: 'Plot both temperatures on a labelled number line and measure the gap between each one and zero.'
      },
      {
        misconceptionId: 'E-r5-c',
        description: 'Student answers "Cannot say".',
        rootCause: 'Negative-Number Avoidance — treats the comparison as unanswerable rather than applying the same left-is-smaller rule used for positives.',
        remediation: 'State and reuse the single rule: further left on the number line always means smaller (colder) — positive or negative.'
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: 'Plot on a number line', hint: 'Mark 0, -4, and -9 on a number line.' },
      { level: 2, description: 'Compare positions', hint: 'Which point is further to the right (closer to 0)?' },
      { level: 3, description: 'Connect to temperature', hint: 'Further right = warmer. Which is warmer?' }
    ],
    forwardRiskLinks: [
      { targetSkillId: 'INT-01', probability: 0.6, condition: 'If not remediated before integer operations in Grade 6' }
    ],
    learningObjectives: []
  },
  {
    itemId: 'r6', order: 6, cluster: 'CONV', clusterName: CLUSTER_NAMES.CONV,
    skillId: 'CONV-01',
    question: 'Write 7,89,000 (Indian) in the International system.',
    options: [
      opt('789,000', true, '7 lakh 89 thousand = 789,000.'),
      opt('7,890,000', false, 'That would be 78.9 lakh.', 'E-r6-a'),
      opt('78,900', false, 'Missing a zero.', 'E-r6-b'),
      opt('7,089,000', false, 'Misplaced digits.', 'E-r6-c')
    ],
    misconceptions: [
      {
        misconceptionId: 'E-r6-a',
        description: 'Student writes 7,890,000, a full order of magnitude too high.',
        rootCause: 'Digit Insertion — miscounts while regrouping and inserts an extra digit, inflating the value tenfold.',
        remediation: 'Strip commas to get the raw digit string (789000) and regroup in clean sets of three — the digit count must match exactly.'
      },
      {
        misconceptionId: 'E-r6-b',
        description: 'Student writes 78,900, a full order of magnitude too low.',
        rootCause: 'Digit Loss — drops a trailing zero while regrouping, deflating the value tenfold.',
        remediation: 'Count total digits before converting (789000 has 6 digits) and verify the International-grouped answer still has 6 digits.'
      },
      {
        misconceptionId: 'E-r6-c',
        description: 'Student writes 7,089,000, inserting an extra digit in the middle of the string.',
        rootCause: 'Digit Insertion (misplaced) — inserts an extra 0 partway through the digit string while regrouping, distorting the value.',
        remediation: 'Mark off exactly three digits from the right before placing the first comma, using the original unbroken digit string, not a re-estimated one.'
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: 'Strip the commas', hint: 'Remove the Indian commas from 7,89,000 to get 789000.' },
      { level: 2, description: 'Regroup in 3s', hint: 'Mark off groups of three from the right: 789 | 000.' },
      { level: 3, description: 'Re-insert commas', hint: 'Join with International-style commas: 789,000.' }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: 'r7', order: 7, cluster: 'PLACE', clusterName: CLUSTER_NAMES.PLACE,
    skillId: 'PV-02',
    question: 'In the International number 1,604,325, what digit is in the hundred-thousands place?',
    options: [
      opt('6', true, 'Millions: 1, hundred-thousands: 6, ten-thousands: 0, thousands: 4.'),
      opt('0', false, '0 is in the ten-thousands place.', 'E-r7-a'),
      opt('1', false, '1 is in the millions place.', 'E-r7-b'),
      opt('4', false, '4 is in the thousands place.', 'E-r7-c')
    ],
    misconceptions: [
      {
        misconceptionId: 'E-r7-a',
        description: 'Student answers 0, the ten-thousands digit — one column to the right of the target.',
        rootCause: 'Adjacent-Column Slip — counts one column short from the left, landing on ten-thousands instead of hundred-thousands.',
        remediation: 'Write the number into a labelled International chart and point to each header while reading the matching digit.'
      },
      {
        misconceptionId: 'E-r7-b',
        description: 'Student answers 1, the millions digit — one column too far left.',
        rootCause: 'Column Overshoot — answers with the leading digit regardless of which specific column was named.',
        remediation: 'Point to the named column header first, then slide down to the digit beneath it, before answering.'
      },
      {
        misconceptionId: 'E-r7-c',
        description: 'Student answers 4, the thousands digit — two columns to the right of the target.',
        rootCause: 'Place Miscounting — counting from the right, stops two columns short of hundred-thousands.',
        remediation: 'Count columns from the right as a cross-check: ones, tens, hundreds, thousands, ten-thousands, hundred-thousands.'
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: 'Group into periods', hint: 'Split 1,604,325 into groups of three from the right: 1 | 604 | 325.' },
      { level: 2, description: 'Label the middle group', hint: 'In "604", which position is hundred-thousands, ten-thousands, thousands?' },
      { level: 3, description: 'Read off the digit', hint: 'The hundred-thousands digit is the first digit of the middle group — what is it?' }
    ],
    forwardRiskLinks: [
      { targetSkillId: 'PV-03', probability: 0.55, condition: 'If not remediated before expanded-form work with 7-digit numbers' }
    ],
    learningObjectives: ['CCSS.MATH.4.NBT.A.1', 'CCSS.MATH.4.NBT.A.2']
  },
  {
    itemId: 'r8', order: 8, cluster: 'COMP', clusterName: CLUSTER_NAMES.COMP,
    skillId: 'COMP-02',
    question: 'Which digit can replace the □ so that 3,2□,987 > 3,24,987 ?',
    options: [
      opt('5', true, 'If □=5, we have 3,25,987 > 3,24,987.'),
      opt('4', false, '3,24,987 is equal to 3,24,987.', 'E-r8-a'),
      opt('3', false, '3,23,987 < 3,24,987.', 'E-r8-b'),
      opt('2', false, 'Even smaller.', 'E-r8-c')
    ],
    misconceptions: [
      {
        misconceptionId: 'E-r8-a',
        description: 'Student picks 4, making the two numbers equal rather than greater.',
        rootCause: 'Boundary Confusion — treats "equal to" as satisfying a strict ">" comparison; □=4 makes the two numbers identical, not greater.',
        remediation: 'Underline the > symbol and confirm equality does not satisfy a strict inequality before testing any digit.'
      },
      {
        misconceptionId: 'E-r8-b',
        description: 'Student picks 3, a digit smaller than the target.',
        rootCause: 'Direction Reversal — picks a digit smaller than 4, producing a number that is less than, not greater than, the comparison number.',
        remediation: 'State the rule explicitly: for ">", the replaced digit must be strictly greater than 4 — test each candidate against that rule, not by proximity.'
      },
      {
        misconceptionId: 'E-r8-c',
        description: 'Student picks 2, an even smaller digit.',
        rootCause: 'Direction Reversal (further off) — picks an even smaller digit, compounding the same reversed-direction error.',
        remediation: 'Trace the inequality arrow with a finger — the open end points to the larger number — and restate the question as "which digits keep the left side bigger?"'
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: 'Compare the fixed part', hint: 'Both numbers read 3,2_,987 vs 3,24,987 — only the □ digit and the fixed 4 differ.' },
      { level: 2, description: 'Test the boundary digit', hint: 'What happens if □ = 4? Are the two numbers equal or different?' },
      { level: 3, description: 'Find the safe range', hint: 'For the left side to be strictly greater, □ must be more than 4. Which option is more than 4?' }
    ],
    forwardRiskLinks: [
      { targetSkillId: 'COMP-01', probability: 0.5, condition: 'If not remediated before multi-number ordering tasks' }
    ],
    learningObjectives: ['CCSS.MATH.4.NBT.A.2']
  },
  {
    itemId: 'r9', order: 9, cluster: 'ROUND', clusterName: CLUSTER_NAMES.ROUND,
    skillId: 'ROUND-01',
    question: 'Round 1,56,789 to the nearest 1,000.',
    options: [
      opt('1,57,000', true, 'The hundreds digit is 7 (≥5), so round up the thousands.'),
      opt('1,56,000', false, 'Would need hundreds digit <5.', 'E-r9-a'),
      opt('1,60,000', false, "That's to the nearest 10,000.", 'E-r9-b'),
      opt('2,00,000', false, "That's to the nearest lakh.", 'E-r9-c')
    ],
    misconceptions: [
      {
        misconceptionId: 'E-r9-a',
        description: 'Student answers 1,56,000, rounding down without checking the decision digit.',
        rootCause: 'Direction Default — rounds down without checking the hundreds digit (7), which signals round up.',
        remediation: 'Check the hundreds digit every time before deciding direction: 7 ≥ 5 means round up.'
      },
      {
        misconceptionId: 'E-r9-b',
        description: 'Student answers 1,60,000, one place value too coarse.',
        rootCause: 'Target-Place Slip — rounds to the nearest 10,000 instead of the nearest 1,000.',
        remediation: 'Circle the thousands digit before rounding to lock in the correct target place.'
      },
      {
        misconceptionId: 'E-r9-c',
        description: 'Student answers 2,00,000, several place values too coarse.',
        rootCause: 'Target-Place Slip (extreme) — rounds to the nearest lakh, far coarser than asked.',
        remediation: 'Restate the target place explicitly before rounding — "nearest 1,000" means only the thousands digit and beyond may change, not the lakhs or ten-thousands digits.'
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: 'Circle the target place', hint: 'Circle the thousands digit in 1,56,789.' },
      { level: 2, description: 'Check the decision digit', hint: 'The hundreds digit is 7. Is it 5 or more?' },
      { level: 3, description: 'Round and clear', hint: 'Since the hundreds digit is 7, round the thousands digit up and zero out the rest.' }
    ],
    forwardRiskLinks: [
      { targetSkillId: 'ROUND-02', probability: 0.4, condition: 'If not remediated before rounding-range puzzle problems' }
    ],
    learningObjectives: ['CCSS.MATH.4.NBT.A.3']
  },
  {
    itemId: 'r10', order: 10, cluster: 'ROMAN', clusterName: CLUSTER_NAMES.ROMAN,
    skillId: 'ROM-01',
    question: 'Write 39 in Roman numerals.',
    options: [
      opt('XXXIX', true, '30 (XXX) + 9 (IX) = XXXIX.'),
      opt('IXL', false, 'Invalid form; 39 is not written with XL.', 'E-r10-a'),
      opt('XXXXIX', false, "Four X's in a row is not allowed.", 'E-r10-b'),
      opt('XLI', false, 'XLI = 41.', 'E-r10-c')
    ],
    misconceptions: [
      {
        misconceptionId: 'E-r10-a',
        description: 'Student writes IXL, trying to subtract I directly from L.',
        rootCause: 'Double-Subtraction Error — attempts to subtract I directly from L, not knowing that I can only be subtracted from V or X, never from L.',
        remediation: 'Teach the fixed subtractive pairs as a short memorised list: IV=4, IX=9, XL=40, XC=90, CD=400, CM=900 — nothing else is ever built by subtraction.'
      },
      {
        misconceptionId: 'E-r10-b',
        description: 'Student writes XXXXIX, using four X\'s in a row.',
        rootCause: 'Repetition-Limit Violation — writes four X\'s to reach 40 instead of using the subtractive pair XL, not knowing no symbol may repeat more than three times.',
        remediation: 'State the repetition rule explicitly: I, X, C, M may repeat at most three times; a fourth repetition must be replaced by a subtractive pair with the next symbol up.'
      },
      {
        misconceptionId: 'E-r10-c',
        description: 'Student writes XLI (41), one more than intended.',
        rootCause: 'Segment Confusion — correctly forms XL (40) but appends I (1) instead of IX (9), losing track of which part of 39 (30+9, not 40+1) was being converted.',
        remediation: 'Break the target number into tens and ones first (39 = 30 + 9), convert each part separately, then join: XXX + IX = XXXIX.'
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: 'Split into tens and ones', hint: '39 = 30 + 9. Convert each part separately.' },
      { level: 2, description: 'Convert the tens', hint: '30 = three X\'s: XXX (within the repetition limit).' },
      { level: 3, description: 'Convert the ones and join', hint: '9 = IX (subtractive). Join: XXX + IX = ?' }
    ],
    forwardRiskLinks: [
      { targetSkillId: 'ROM-02', probability: 0.5, condition: 'If not remediated before Roman numerals above 100 using XC/CM' }
    ],
    learningObjectives: []
  },
  {
    itemId: 'r11', order: 11, cluster: 'NEG', clusterName: CLUSTER_NAMES.NEG,
    skillId: 'NEG-01',
    question: 'The temperature at night was \\( -5^\\circ\\text{C} \\). By afternoon it had risen by \\( 8^\\circ\\text{C} \\). What was the afternoon temperature?',
    options: [
      opt('\\( 3^\\circ\\text{C} \\)', true, '-5 + 8 = 3.'),
      opt('\\( -3^\\circ\\text{C} \\)', false, 'You subtracted 5-8 incorrectly.', 'E-r11-a'),
      opt('\\( 13^\\circ\\text{C} \\)', false, 'You added 5+8.', 'E-r11-b'),
      opt('\\( -13^\\circ\\text{C} \\)', false, 'You did -5 - 8.', 'E-r11-c')
    ],
    misconceptions: [
      {
        misconceptionId: 'E-r11-a',
        description: 'Student answers -3°C, keeping the result negative out of habit.',
        rootCause: 'Magnitude Subtraction Only — computes 8-5=3 but keeps the negative sign from the starting value out of habit, without checking whether the result should actually be positive.',
        remediation: 'Use a number line: start at -5 and count 8 steps to the right (a rise); note explicitly when the count crosses zero into positive territory.'
      },
      {
        misconceptionId: 'E-r11-b',
        description: 'Student answers 13°C, dropping the negative sign entirely.',
        rootCause: 'Sign-Dropping — ignores the negative sign on the starting temperature and adds 5+8 as though starting from positive territory.',
        remediation: 'Circle the negative sign before starting and say "starting point is below zero" out loud before doing any arithmetic.'
      },
      {
        misconceptionId: 'E-r11-c',
        description: 'Student answers -13°C, moving further negative instead of toward positive.',
        rootCause: 'Same-Sign Default — treats "risen by" as continuing in the same negative direction, adding to the magnitude instead of moving toward positive, computing -5-8.',
        remediation: 'State the rule and reuse it: "risen by" always means add toward positive, regardless of the starting sign.'
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: 'Mark the start', hint: 'Mark -5 on a number line.' },
      { level: 2, description: 'Identify the direction', hint: 'A "rise" always moves toward positive numbers.' },
      { level: 3, description: 'Count and land', hint: 'Move 8 steps to the right from -5. Where do you land?' }
    ],
    forwardRiskLinks: [
      { targetSkillId: 'NEG-02', probability: 0.5, condition: 'If not remediated before multi-step integer word problems' }
    ],
    learningObjectives: []
  },
  {
    itemId: 'r12', order: 12, cluster: 'CONV', clusterName: CLUSTER_NAMES.CONV,
    skillId: 'CONV-01',
    question: 'Convert 650,000 (International) to the Indian system.',
    options: [
      opt('6,50,000', true, '650,000 = 6.5 lakh = 6,50,000.'),
      opt('65,00,000', false, 'That would be 6.5 million.', 'E-r12-a'),
      opt('6,05,000', false, 'Misplaced digit.', 'E-r12-b'),
      opt('60,50,000', false, 'Incorrect grouping.', 'E-r12-c')
    ],
    misconceptions: [
      {
        misconceptionId: 'E-r12-a',
        description: 'Student writes 65,00,000, a full order of magnitude too high.',
        rootCause: 'Magnitude Inflation — regroups into Indian commas but inflates the value tenfold, mistaking 650,000 (6.5 lakh) for 6.5 million.',
        remediation: 'Count total digits before and after conversion — 650,000 has 6 digits, so the Indian form must also have exactly 6 digits: 6,50,000.'
      },
      {
        misconceptionId: 'E-r12-b',
        description: 'Student writes 6,05,000, with the comma placed one digit early.',
        rootCause: 'Grouping Misalignment — inserts the Indian comma one digit early, splitting the digit string in the wrong place and effectively dropping a digit from the thousands.',
        remediation: 'Mark off exactly three digits for the rightmost group, then group the remaining digits in twos, counting carefully from the right.'
      },
      {
        misconceptionId: 'E-r12-c',
        description: 'Student writes 60,50,000, a full order of magnitude too high with a different grouping error.',
        rootCause: 'Digit Insertion — inserts an extra digit while regrouping, inflating the value by a factor of 10.',
        remediation: 'Strip all commas first to get the raw digit string (650000) and count its length before inserting new commas.'
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: 'Strip the commas', hint: 'Remove the commas from 650,000 to get 650000.' },
      { level: 2, description: 'Regroup with Indian pattern', hint: 'Group as 3, then 2 from the right: 6 | 50 | 000.' },
      { level: 3, description: 'Re-insert commas', hint: 'Join with Indian-style commas: 6,50,000.' }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
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

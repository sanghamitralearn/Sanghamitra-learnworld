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

function opt(text, correct, feedback) {
  return { text, correct, feedback };
}

// ---------------------------------------------------------------------
// LEVEL 1 - Core Fluency (untimed)
// ---------------------------------------------------------------------

const level1Warmup = [
  {
    itemId: 'w1', order: 1, cluster: 'PLACE', clusterName: CLUSTER_NAMES.PLACE,
    question: 'What is the place value of 5 in 2,53,410?',
    options: [
      opt('50,000', true, 'The 5 is in the ten-thousands place (Indian system).'),
      opt('5,000', false, 'That would be the thousands place.'),
      opt('500', false, "That's the hundreds place."),
      opt('5,00,000', false, "That's the lakhs place.")
    ],
    retryHint: 'Identify the period: 2,53,410 – the 5 is the first digit of the thousands period.'
  },
  {
    itemId: 'w2', order: 2, cluster: 'COMP', clusterName: CLUSTER_NAMES.COMP,
    question: 'Which is larger? \\( 4,56,789 \\) or \\( 4,65,789 \\)?',
    options: [
      opt('\\( 4,65,789 \\)', true, 'Compare the ten-thousands place: 6 > 5.'),
      opt('\\( 4,56,789 \\)', false, 'Check the digit after 4: 5 < 6.'),
      opt('They are equal', false, 'They differ in the ten-thousands place.'),
      opt('Cannot compare', false, 'Both have six digits, so we can compare.')
    ],
    retryHint: 'Start from the left and find the first place where the digits are different.'
  },
  {
    itemId: 'w3', order: 3, cluster: 'ROUND', clusterName: CLUSTER_NAMES.ROUND,
    question: 'Round 3,462 to the nearest 100.',
    options: [
      opt('3,500', true, 'The tens digit is 6 (≥5), so round up the hundreds digit from 4 to 5.'),
      opt('3,400', false, 'That would be rounding down; but the tens digit is 6, which means round up.'),
      opt('3,000', false, "That's rounding to the nearest 1,000."),
      opt('3,460', false, "That's rounding to the nearest 10.")
    ],
    retryHint: 'Look at the tens digit (the digit right after the hundreds place).'
  },
  {
    itemId: 'w4', order: 4, cluster: 'ROMAN', clusterName: CLUSTER_NAMES.ROMAN,
    question: 'Write 24 in Roman numerals.',
    options: [
      opt('XXIV', true, '20 (XX) + 4 (IV) = XXIV.'),
      opt('XIIV', false, 'Invalid; 4 is written as IV, not IIV.'),
      opt('XXVI', false, 'XXVI = 26.'),
      opt('XIV', false, 'XIV = 14.')
    ],
    retryHint: 'Break 24 into 20 + 4 and convert each.'
  },
  {
    itemId: 'w5', order: 5, cluster: 'NEG', clusterName: CLUSTER_NAMES.NEG,
    question: 'Which temperature is colder: \\( -3^\\circ\\text{C} \\) or \\( -1^\\circ\\text{C} \\)?',
    options: [
      opt('\\( -3^\\circ\\text{C} \\)', true, 'The more negative the number, the colder it is.'),
      opt('\\( -1^\\circ\\text{C} \\)', false, '-1 is warmer than -3.'),
      opt('Both are the same', false, 'They are different numbers.'),
      opt('Cannot say', false, 'Negative numbers can be compared on a number line.')
    ],
    retryHint: 'Think of a thermometer: the lower down, the colder.'
  },
  {
    itemId: 'w6', order: 6, cluster: 'CONV', clusterName: CLUSTER_NAMES.CONV,
    question: 'Write 5,43,210 in the International system.',
    options: [
      opt('543,210', true, 'Indian 5,43,210 = 543 thousand 210.'),
      opt('5,432,100', false, 'You shifted the digits incorrectly.'),
      opt('54,32,100', false, "That's still Indian grouping."),
      opt('5,43,210 (same)', false, 'International uses commas every three digits from the right.')
    ],
    retryHint: 'In International, group the digits in sets of three: 543,210.'
  },
  {
    itemId: 'w7', order: 7, cluster: 'PLACE', clusterName: CLUSTER_NAMES.PLACE,
    question: 'In 8,09,123, what digit is in the thousands place?',
    options: [
      opt('9', true, 'The number is 8 lakh 9 thousand 123, so 9 is in the thousands place.'),
      opt('0', false, '0 is in the ten-thousands place.'),
      opt('8', false, '8 is in the lakhs place.'),
      opt('1', false, '1 is in the hundreds place.')
    ],
    retryHint: 'Read the number: eight lakh nine thousand one hundred twenty-three.'
  },
  {
    itemId: 'w8', order: 8, cluster: 'COMP', clusterName: CLUSTER_NAMES.COMP,
    question: 'Arrange these in ascending order: 2,34,567; 2,43,567; 2,33,567.',
    options: [
      opt('2,33,567; 2,34,567; 2,43,567', true, 'Compare the thousands period: 33 < 34 < 43.'),
      opt('2,43,567; 2,34,567; 2,33,567', false, "That's descending order."),
      opt('2,34,567; 2,33,567; 2,43,567', false, '2,33,567 is smaller than 2,34,567.'),
      opt('2,33,567; 2,43,567; 2,34,567', false, 'Check the middle number: 2,34,567 < 2,43,567.')
    ],
    retryHint: 'Ascending means smallest to largest.'
  }
];

const level1Diagnostic = [
  {
    itemId: 'd1', order: 1, cluster: 'PLACE', clusterName: CLUSTER_NAMES.PLACE,
    question: 'What is the place value of 6 in 16,78,945?',
    options: [
      opt('6,00,000 (6 lakhs)', true, 'The 6 is in the lakhs place: 16,78,945.'),
      opt('60,000', false, 'That would be the ten-thousands place.'),
      opt('6,000', false, 'That would be the thousands place.'),
      opt('6,00,00,000', false, 'That would be crores.')
    ],
    backward: 'Remember the Indian place value chart: … Lakhs, Ten-thousands, Thousands, Hundreds, Tens, Ones.',
    forward: 'Knowing place values helps you read large numbers quickly.'
  },
  {
    itemId: 'd2', order: 2, cluster: 'COMP', clusterName: CLUSTER_NAMES.COMP,
    question: 'Which of these numbers is the smallest?',
    options: [
      opt('7,89,012', true, 'Compare: 7,89,012 < 7,89,102 < 7,98,012 < 7,98,102.'),
      opt('7,98,012', false, '7,98,012 is larger because ten-thousands digit is 9 vs 8 in 7,89,012.'),
      opt('7,89,102', false, 'This is larger than 7,89,012 (102 > 012).'),
      opt('7,98,102', false, 'This is the largest.')
    ],
    backward: 'Start from the leftmost digit; the first digit that is smaller makes the whole number smaller.',
    forward: 'Ordering numbers is a key skill for data handling.'
  },
  {
    itemId: 'd3', order: 3, cluster: 'ROUND', clusterName: CLUSTER_NAMES.ROUND,
    question: 'Round 8,734 to the nearest 100.',
    options: [
      opt('8,700', true, 'The tens digit is 3 (<5), so round down.'),
      opt('8,800', false, 'That would need the tens digit to be 5 or more.'),
      opt('8,000', false, "That's rounding to the nearest thousand."),
      opt('8,730', false, "That's rounding to the nearest ten.")
    ],
    backward: 'When rounding to the nearest 100, look at the tens digit.',
    forward: 'Rounding is used in everyday life when estimating prices, distances, etc.'
  },
  {
    itemId: 'd4', order: 4, cluster: 'ROMAN', clusterName: CLUSTER_NAMES.ROMAN,
    question: 'What is LXXIV in Hindu-Arabic numerals?',
    options: [
      opt('74', true, 'L=50, XX=20, IV=4 → 50+20+4=74.'),
      opt('54', false, 'You might have misread L as 50 and IV as 4 but missed the XX.'),
      opt('76', false, 'That would be LXXVI.'),
      opt('44', false, 'That would be XLIV.')
    ],
    backward: 'Add the values of the symbols from left to right; if a smaller symbol is before a larger one, subtract.',
    forward: 'Roman numerals appear in many formal contexts, like clocks and book chapters.'
  },
  {
    itemId: 'd5', order: 5, cluster: 'NEG', clusterName: CLUSTER_NAMES.NEG,
    question: 'Which is colder: \\( -2^\\circ\\text{C} \\) or \\( -6^\\circ\\text{C} \\)?',
    options: [
      opt('\\( -6^\\circ\\text{C} \\)', true, 'On a number line, -6 is to the left of -2, so it is smaller (colder).'),
      opt('\\( -2^\\circ\\text{C} \\)', false, '-2 is warmer (closer to 0).'),
      opt('Both are the same', false, 'The numbers are different.'),
      opt('Cannot say', false, 'Negative numbers can be compared easily.')
    ],
    backward: 'On a number line, numbers decrease as you go left.',
    forward: 'Understanding negative numbers helps with money (overdraft) and elevation.'
  },
  {
    itemId: 'd6', order: 6, cluster: 'CONV', clusterName: CLUSTER_NAMES.CONV,
    question: 'Write 4,50,000 (Indian) in the International system.',
    options: [
      opt('450,000', true, '4,50,000 Indian = 4 lakh 50 thousand = 450,000.'),
      opt('4,500,000', false, 'That would be 45 lakh (4.5 million).'),
      opt('45,000', false, 'You lost a zero.'),
      opt('405,000', false, 'Incorrect grouping of digits.')
    ],
    backward: '1 lakh = 100,000, so 4 lakh = 400,000; 50 thousand = 50,000; total 450,000.',
    forward: 'International format is used in most global reports.'
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

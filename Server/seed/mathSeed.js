// seed/mathSeed.js
//
// Populates math_chapters and math_questions with one fully worked example
// (Grade 6, Fractions) at Level 1 (untimed core fluency) and Level 4
// (timed speed & strategy). Run with: node seed/mathSeed.js
//
// This is a starter content set proving the schema/engine end-to-end, not
// the full curriculum described in bootcamp-design.md. Add more chapters by
// following the same shape.

const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = 'grade-6';
const GRADE_LABEL = 'Grade 6';
const CHAPTER_SLUG = 'ch-4-fractions';
const CHAPTER_NAME = 'Fractions';

const CLUSTER_NAMES = {
  EQUIV: 'Equivalent Fractions & Simplifying',
  ADDSUB: 'Adding & Subtracting Fractions',
  MULDIV: 'Multiplying & Dividing Fractions',
  FRACDEC: 'Fractions, Decimals & Comparing'
};

function opt(text, correct, feedback) {
  return { text, correct, feedback };
}

// ---------------------------------------------------------------------
// LEVEL 1 - Core Fluency (untimed)
// ---------------------------------------------------------------------

const level1Warmup = [
  {
    itemId: 'w1', order: 1, cluster: 'EQUIV', clusterName: CLUSTER_NAMES.EQUIV,
    question: 'Which fraction is equivalent to \\(\\frac{1}{2}\\)?',
    options: [
      opt('2/4', true, 'Correct — multiplying top and bottom of 1/2 by 2 gives 2/4.'),
      opt('1/3', false, "1/3 is smaller than 1/2 — it's not an equivalent fraction."),
      opt('3/5', false, "3/5 = 0.6, which isn't equal to 1/2 = 0.5."),
      opt('2/3', false, '2/3 is larger than 1/2 — compare the decimals 0.67 vs 0.5.')
    ],
    retryHint: 'Multiply (or divide) the top and bottom of the fraction by the same number.'
  },
  {
    itemId: 'w2', order: 2, cluster: 'EQUIV', clusterName: CLUSTER_NAMES.EQUIV,
    question: 'Simplify \\(\\frac{6}{8}\\) to lowest terms.',
    options: [
      opt('3/4', true, 'Correct — divide top and bottom by their GCF, 2: 6÷2=3, 8÷2=4.'),
      opt('2/3', false, 'That would come from dividing 6 and 8 by different numbers — they must share the same divisor.'),
      opt('4/6', false, "4/6 isn't in lowest terms either, and it isn't equal to 6/8 (it simplifies to 2/3)."),
      opt('6/8', false, "That's the original fraction — it isn't in lowest terms yet since 6 and 8 share a common factor of 2.")
    ],
    retryHint: 'Find the greatest common factor (GCF) of the numerator and denominator, then divide both by it.'
  },
  {
    itemId: 'w3', order: 3, cluster: 'ADDSUB', clusterName: CLUSTER_NAMES.ADDSUB,
    question: '\\(\\frac{1}{4} + \\frac{1}{4} = ?\\)',
    options: [
      opt('1/2', true, 'Correct — same denominators, so add the numerators: 1+1=2, giving 2/4, which simplifies to 1/2.'),
      opt('2/8', false, 'Adding the denominators too gives the wrong answer — keep the denominator the same when it already matches.'),
      opt('1/4', false, "That's just one of the fractions — remember to add both numerators."),
      opt('1/8', false, "That's too small — check your addition of the numerators.")
    ],
    retryHint: 'When denominators match, add only the numerators and keep the denominator.'
  },
  {
    itemId: 'w4', order: 4, cluster: 'ADDSUB', clusterName: CLUSTER_NAMES.ADDSUB,
    question: '\\(\\frac{3}{5} - \\frac{1}{5} = ?\\)',
    options: [
      opt('2/5', true, 'Correct — subtract the numerators: 3−1=2, denominator stays 5.'),
      opt('2/10', false, "The denominator shouldn't change when it's already the same on both fractions."),
      opt('3/5', false, 'That ignores the subtraction entirely.'),
      opt('1/5', false, 'Check your subtraction: 3−1 is 2, not 1.')
    ],
    retryHint: 'With matching denominators, subtract just like addition — only the numerators change.'
  },
  {
    itemId: 'w5', order: 5, cluster: 'MULDIV', clusterName: CLUSTER_NAMES.MULDIV,
    question: '\\(\\frac{1}{2} \\times \\frac{1}{3} = ?\\)',
    options: [
      opt('1/6', true, 'Correct — multiply numerators (1×1=1) and denominators (2×3=6).'),
      opt('1/5', false, 'That would come from adding the denominators instead of multiplying them.'),
      opt('2/3', false, "That looks like the fractions were added, not multiplied."),
      opt('1/3', false, 'Check both the numerator and denominator multiplication.')
    ],
    retryHint: 'Multiply straight across: numerator × numerator, denominator × denominator.'
  },
  {
    itemId: 'w6', order: 6, cluster: 'MULDIV', clusterName: CLUSTER_NAMES.MULDIV,
    question: '\\(\\frac{1}{2} \\div \\frac{1}{4} = ?\\)',
    options: [
      opt('2', true, 'Correct — dividing by a fraction means multiplying by its reciprocal: 1/2 × 4/1 = 4/2 = 2.'),
      opt('1/8', false, "That's what you'd get by multiplying instead of dividing."),
      opt('1/2', false, 'Dividing by a fraction smaller than 1 makes the answer bigger, not the same.'),
      opt('8', false, "Check the reciprocal step — it's 4/1, not something larger.")
    ],
    retryHint: 'To divide by a fraction, multiply by its reciprocal (flip it).'
  },
  {
    itemId: 'w7', order: 7, cluster: 'FRACDEC', clusterName: CLUSTER_NAMES.FRACDEC,
    question: 'Write \\(\\frac{3}{4}\\) as a decimal.',
    options: [
      opt('0.75', true, 'Correct — 3÷4 = 0.75.'),
      opt('0.34', false, 'That just strings the digits together — actually divide 3 by 4.'),
      opt('0.25', false, '0.25 is 1/4, not 3/4.'),
      opt('1.34', false, "That's too large — 3/4 is less than 1.")
    ],
    retryHint: 'Divide the numerator by the denominator.'
  },
  {
    itemId: 'w8', order: 8, cluster: 'FRACDEC', clusterName: CLUSTER_NAMES.FRACDEC,
    question: 'Which is larger: \\(\\frac{2}{3}\\) or \\(\\frac{3}{5}\\)?',
    options: [
      opt('2/3', true, 'Correct — 2/3 ≈ 0.667 and 3/5 = 0.6, so 2/3 is larger.'),
      opt('3/5', false, '3/5 = 0.6, which is smaller than 2/3 ≈ 0.667.'),
      opt('They are equal', false, "They aren't equal — convert both to decimals or a common denominator to compare."),
      opt('Cannot be determined', false, 'They can always be compared — convert to a common denominator (15ths) or decimals.')
    ],
    retryHint: 'Convert both fractions to decimals or a common denominator to compare them.'
  }
];

const level1Diagnostic = [
  {
    itemId: 'd1', order: 1, cluster: 'EQUIV', clusterName: CLUSTER_NAMES.EQUIV,
    question: 'Which fraction is NOT equivalent to \\(\\frac{2}{3}\\)?',
    options: [
      opt('4/6', false, 'That IS equivalent — 4/6 simplifies to 2/3.'),
      opt('6/9', false, 'That IS equivalent — 6/9 simplifies to 2/3.'),
      opt('8/12', false, 'That IS equivalent — 8/12 simplifies to 2/3.'),
      opt('5/8', true, "Correct — 5/8 = 0.625, while 2/3 ≈ 0.667. They aren't equal.")
    ],
    backward: 'This builds on simplifying fractions from the warm-up.',
    forward: 'Recognizing equivalent fractions is essential for adding fractions with different denominators.'
  },
  {
    itemId: 'd2', order: 2, cluster: 'ADDSUB', clusterName: CLUSTER_NAMES.ADDSUB,
    question: '\\(\\frac{2}{5} + \\frac{1}{10} = ?\\)',
    options: [
      opt('1/2', true, 'Correct — rewrite 2/5 as 4/10, then 4/10+1/10=5/10=1/2.'),
      opt('3/15', false, "You can't add numerators and denominators separately."),
      opt('3/10', false, 'Check that you converted 2/5 to tenths first (it becomes 4/10, not 2/10).'),
      opt('1/10', false, 'That ignores the 2/5 term almost entirely.')
    ],
    backward: 'Uses equivalent fractions to find a common denominator.',
    forward: 'Unlike-denominator addition is the base skill for algebraic fraction addition later on.'
  },
  {
    itemId: 'd3', order: 3, cluster: 'MULDIV', clusterName: CLUSTER_NAMES.MULDIV,
    question: '\\(\\frac{3}{4} \\times \\frac{2}{3} = ?\\)',
    options: [
      opt('1/2', true, 'Correct — 3×2=6 and 4×3=12, giving 6/12, which simplifies to 1/2.'),
      opt('5/7', false, 'Fractions are multiplied straight across, not added.'),
      opt('6/12', false, "6/12 is right before simplifying — it should be reduced to 1/2."),
      opt('9/8', false, 'That would come from multiplying 3×3 and 4×2, mixing up the pairs.')
    ],
    backward: 'Combines multiplication with the simplifying skill from the equivalent-fractions cluster.',
    forward: 'This straight-across multiplication rule stays the same even with algebraic fractions.'
  },
  {
    itemId: 'd4', order: 4, cluster: 'FRACDEC', clusterName: CLUSTER_NAMES.FRACDEC,
    question: 'Order from smallest to largest: 0.4, \\(\\frac{3}{8}\\), \\(\\frac{1}{2}\\)',
    options: [
      opt('3/8, 0.4, 1/2', true, 'Correct — 3/8 = 0.375, then 0.4, then 1/2 = 0.5.'),
      opt('0.4, 3/8, 1/2', false, '3/8 = 0.375 is smaller than 0.4, so it should come first.'),
      opt('1/2, 0.4, 3/8', false, "That's largest to smallest, not smallest to largest."),
      opt('3/8, 1/2, 0.4', false, '1/2 = 0.5 is the largest of the three, so it belongs last.')
    ],
    backward: 'Requires converting fractions to decimals, from the warm-up.',
    forward: 'Ordering mixed fraction/decimal values is common in data and measurement problems.'
  },
  {
    itemId: 'd5', order: 5, cluster: 'EQUIV', clusterName: CLUSTER_NAMES.EQUIV,
    question: 'Which pair of fractions is equivalent?',
    options: [
      opt('3/4 and 9/12', true, 'Correct — 9/12 simplifies to 3/4 (divide both by 3).'),
      opt('2/5 and 3/7', false, 'These simplify to different decimal values (0.4 vs ≈0.43).'),
      opt('1/3 and 2/5', false, '1/3 ≈ 0.33 and 2/5 = 0.4 — not equal.'),
      opt('5/6 and 3/4', false, '5/6 ≈ 0.83 and 3/4 = 0.75 — not equal.')
    ],
    backward: 'Direct extension of simplifying practice.',
    forward: 'Spotting equivalence quickly speeds up every later fraction operation.'
  },
  {
    itemId: 'd6', order: 6, cluster: 'ADDSUB', clusterName: CLUSTER_NAMES.ADDSUB,
    question: '\\(\\frac{5}{6} - \\frac{1}{3} = ?\\)',
    options: [
      opt('1/2', true, 'Correct — rewrite 1/3 as 2/6, then 5/6−2/6=3/6=1/2.'),
      opt('4/3', false, "That's from subtracting numerators and denominators separately."),
      opt('4/6', false, 'Check your conversion of 1/3 to sixths — it should be 2/6, not 1/6.'),
      opt('2/3', false, 'Recheck the subtraction after converting to a common denominator.')
    ],
    backward: 'Combines finding a common denominator with subtraction.',
    forward: 'This is the same process used to combine algebraic fractions later.'
  },
  {
    itemId: 'd7', order: 7, cluster: 'MULDIV', clusterName: CLUSTER_NAMES.MULDIV,
    question: '\\(\\frac{2}{3} \\div \\frac{4}{9} = ?\\)',
    options: [
      opt('3/2', true, 'Correct — flip and multiply: 2/3 × 9/4 = 18/12 = 3/2.'),
      opt('8/27', false, "That's what you'd get by multiplying instead of dividing."),
      opt('2/3', false, 'Dividing by a fraction less than 1 should make the value larger.'),
      opt('4/6', false, 'Double-check the reciprocal step before multiplying.')
    ],
    backward: 'Uses the reciprocal rule and simplifying together.',
    forward: 'Division of fractions underlies solving rate and proportion problems.'
  },
  {
    itemId: 'd8', order: 8, cluster: 'FRACDEC', clusterName: CLUSTER_NAMES.FRACDEC,
    question: 'Convert 0.6 to a fraction in lowest terms.',
    options: [
      opt('3/5', true, 'Correct — 0.6 = 6/10, which simplifies to 3/5.'),
      opt('6/10', false, "6/10 is correct in value but isn't in lowest terms yet."),
      opt('3/4', false, '3/4 = 0.75, not 0.6.'),
      opt('2/3', false, '2/3 ≈ 0.667, not 0.6.')
    ],
    backward: 'Reverses the fraction-to-decimal skill from the warm-up.',
    forward: 'Converting between forms is needed for percent problems next.'
  },
  {
    itemId: 'd9', order: 9, cluster: 'EQUIV', clusterName: CLUSTER_NAMES.EQUIV,
    question: 'Reduce \\(\\frac{18}{24}\\) to lowest terms.',
    options: [
      opt('3/4', true, 'Correct — the GCF of 18 and 24 is 6: 18÷6=3, 24÷6=4.'),
      opt('9/12', false, "9/12 isn't fully reduced — it can still be divided by 3."),
      opt('6/8', false, "6/8 isn't fully reduced either — divide by 2 again to reach 3/4."),
      opt('2/3', false, "That's not equal to 18/24 — recheck the division.")
    ],
    backward: 'Requires finding the GCF, as practiced with 6/8 in the warm-up.',
    forward: 'Full reduction is required before comparing or adding fractions.'
  },
  {
    itemId: 'd10', order: 10, cluster: 'ADDSUB', clusterName: CLUSTER_NAMES.ADDSUB,
    question: 'A recipe needs \\(\\frac{3}{4}\\) cup of flour and \\(\\frac{1}{2}\\) cup of sugar. How many cups of dry ingredients in total?',
    options: [
      opt('5/4 cups', true, 'Correct — 3/4 + 2/4 = 5/4 cups (or 1 1/4 cups).'),
      opt('4/6 cups', false, "You can't add numerators and denominators separately."),
      opt('1/4 cup', false, "That's a subtraction result, not addition."),
      opt('3/8 cup', false, 'That looks like the fractions were multiplied instead of added.')
    ],
    backward: 'Applies unlike-denominator addition to a real context.',
    forward: 'Word problems like this appear throughout ratio and measurement units.'
  },
  {
    itemId: 'd11', order: 11, cluster: 'MULDIV', clusterName: CLUSTER_NAMES.MULDIV,
    question: 'One serving is \\(\\frac{1}{3}\\) of a pizza. How much pizza is eaten in \\(\\frac{3}{4}\\) of a serving?',
    options: [
      opt('1/4 of the pizza', true, 'Correct — 1/3 × 3/4 = 3/12 = 1/4.'),
      opt('4/3 of the pizza', false, "That's the reciprocal — check whether you should multiply or divide."),
      opt('3/12 of the pizza', false, '3/12 is right before simplifying — reduce it to 1/4.'),
      opt('1/12 of the pizza', false, 'Check the multiplication: 1×3=3 (not 1) over 3×4=12.')
    ],
    backward: 'Real-world use of straight-across multiplication.',
    forward: "This 'fraction of a fraction' idea reappears in percentage-of problems."
  },
  {
    itemId: 'd12', order: 12, cluster: 'FRACDEC', clusterName: CLUSTER_NAMES.FRACDEC,
    question: 'Which is smallest: 0.45, \\(\\frac{5}{12}\\), \\(\\frac{2}{5}\\)?',
    options: [
      opt('2/5', true, 'Correct — 2/5 = 0.4, which is less than 5/12 ≈ 0.417 and 0.45.'),
      opt('5/12', false, '5/12 ≈ 0.417 — that is larger than 2/5 = 0.4.'),
      opt('0.45', false, '0.45 is the largest of the three.'),
      opt('They are all equal', false, "They aren't — convert each to a decimal to compare (0.45, ≈0.417, 0.4).")
    ],
    backward: 'Extends the comparing skill from the warm-up to three values including two fraction forms.',
    forward: 'Comparing mixed forms is common in data-handling and statistics tasks.'
  },
  {
    itemId: 'd13', order: 13, cluster: 'EQUIV', clusterName: CLUSTER_NAMES.EQUIV,
    question: 'What value of x makes \\(\\frac{3}{5} = \\frac{x}{20}\\) true?',
    options: [
      opt('12', true, 'Correct — 20 ÷ 5 = 4, so multiply the numerator by 4 too: 3×4=12.'),
      opt('15', false, 'Check the scale factor between the denominators (20÷5=4), then apply it to the numerator.'),
      opt('60', false, 'That multiplies 3 by 20 instead of by the scale factor 4.'),
      opt('8', false, 'Recheck: the denominator scaled by 4, so the numerator should too.')
    ],
    backward: 'Uses the equivalent-fraction scale-factor idea from earlier items.',
    forward: 'Solving for an unknown numerator/denominator is the bridge into solving proportions and simple equations.'
  },
  {
    itemId: 'd14', order: 14, cluster: 'ADDSUB', clusterName: CLUSTER_NAMES.ADDSUB,
    question: '\\(\\frac{7}{8} - \\frac{1}{4} = ?\\)',
    options: [
      opt('5/8', true, 'Correct — 1/4 = 2/8, so 7/8 − 2/8 = 5/8.'),
      opt('6/4', false, 'That subtracts numerators and denominators separately.'),
      opt('3/4', false, 'Recheck the conversion of 1/4 into eighths.'),
      opt('7/4', false, 'That ignores the subtraction of 1/4 almost entirely.')
    ],
    backward: 'Common-denominator subtraction, reinforcing d6.',
    forward: 'This skill directly supports solving equations with fractional coefficients.'
  },
  {
    itemId: 'd15', order: 15, cluster: 'MULDIV', clusterName: CLUSTER_NAMES.MULDIV,
    question: 'Simplify \\(\\frac{4}{9} \\times \\frac{3}{8}\\) fully.',
    options: [
      opt('1/6', true, 'Correct — 4×3=12 and 9×8=72, giving 12/72, which simplifies to 1/6.'),
      opt('12/72', false, '12/72 is correct before simplifying — it still needs to be reduced.'),
      opt('7/17', false, 'Fractions are multiplied, not added.'),
      opt('12/17', false, "The denominators multiply together (9×8=72); they don't add.")
    ],
    backward: 'Combines multiplication with full simplification, tying EQUIV and MULDIV together.',
    forward: 'Simplifying products fully is expected in every later algebra unit.'
  },
  {
    itemId: 'd16', order: 16, cluster: 'FRACDEC', clusterName: CLUSTER_NAMES.FRACDEC,
    question: 'A survey shows 0.3 of students prefer tea and \\(\\frac{2}{5}\\) prefer coffee. Which group is larger?',
    options: [
      opt('Coffee', true, 'Correct — 2/5 = 0.4, which is greater than 0.3.'),
      opt('Tea', false, '0.3 is less than 2/5 = 0.4.'),
      opt('They are equal', false, "0.3 ≠ 0.4, so the groups aren't equal."),
      opt('Cannot be determined', false, 'You can always compare by converting to the same form — here, 2/5 = 0.4.')
    ],
    backward: 'Applies decimal/fraction comparison to a data-interpretation context.',
    forward: 'This kind of comparison appears constantly in statistics and probability.'
  }
];

const level1Recheck = [
  {
    itemId: 'r1', order: 1, cluster: 'EQUIV', clusterName: CLUSTER_NAMES.EQUIV, recheckFor: 'd1',
    question: 'Which fraction is NOT equivalent to \\(\\frac{3}{4}\\)?',
    options: [
      opt('6/8', false, 'That IS equivalent — 6/8 simplifies to 3/4.'),
      opt('9/12', false, 'That IS equivalent — 9/12 simplifies to 3/4.'),
      opt('12/16', false, 'That IS equivalent — 12/16 simplifies to 3/4.'),
      opt('7/10', true, 'Correct — 7/10 = 0.7, while 3/4 = 0.75. Not equal.')
    ]
  },
  {
    itemId: 'r5', order: 2, cluster: 'EQUIV', clusterName: CLUSTER_NAMES.EQUIV, recheckFor: 'd5',
    question: 'Which pair of fractions is equivalent?',
    options: [
      opt('2/5 and 6/15', true, 'Correct — 6/15 simplifies to 2/5 (divide both by 3).'),
      opt('3/8 and 5/12', false, '3/8 = 0.375 and 5/12 ≈ 0.417 — not equal.'),
      opt('1/4 and 2/9', false, '1/4 = 0.25 and 2/9 ≈ 0.222 — not equal.'),
      opt('4/5 and 5/6', false, '4/5 = 0.8 and 5/6 ≈ 0.833 — not equal.')
    ]
  },
  {
    itemId: 'r2', order: 3, cluster: 'ADDSUB', clusterName: CLUSTER_NAMES.ADDSUB, recheckFor: 'd2',
    question: '\\(\\frac{1}{3} + \\frac{1}{6} = ?\\)',
    options: [
      opt('1/2', true, 'Correct — 1/3 = 2/6, so 2/6+1/6=3/6=1/2.'),
      opt('2/9', false, "You can't add numerators and denominators separately."),
      opt('1/6', false, 'That ignores the 1/3 term.'),
      opt('2/6', false, '2/6 is right before simplifying — reduce it to 1/2.')
    ]
  },
  {
    itemId: 'r6', order: 4, cluster: 'ADDSUB', clusterName: CLUSTER_NAMES.ADDSUB, recheckFor: 'd6',
    question: '\\(\\frac{3}{4} - \\frac{1}{2} = ?\\)',
    options: [
      opt('1/4', true, 'Correct — 1/2 = 2/4, so 3/4−2/4=1/4.'),
      opt('2/2', false, "That subtracts denominators separately, which isn't valid."),
      opt('1/2', false, 'Recheck the conversion of 1/2 into fourths before subtracting.'),
      opt('1/8', false, 'Check your subtraction: 3−2 is 1, not something smaller.')
    ]
  },
  {
    itemId: 'r3', order: 5, cluster: 'MULDIV', clusterName: CLUSTER_NAMES.MULDIV, recheckFor: 'd3',
    question: '\\(\\frac{2}{5} \\times \\frac{5}{6} = ?\\)',
    options: [
      opt('1/3', true, 'Correct — 2×5=10 and 5×6=30, giving 10/30, which simplifies to 1/3.'),
      opt('7/11', false, 'Fractions are multiplied straight across, not added.'),
      opt('10/30', false, '10/30 is right before simplifying — reduce it to 1/3.'),
      opt('4/11', false, "Multiply numerators together and denominators together separately, don't mix them.")
    ]
  },
  {
    itemId: 'r7', order: 6, cluster: 'MULDIV', clusterName: CLUSTER_NAMES.MULDIV, recheckFor: 'd7',
    question: '\\(\\frac{3}{5} \\div \\frac{6}{7} = ?\\)',
    options: [
      opt('7/10', true, 'Correct — flip and multiply: 3/5 × 7/6 = 21/30 = 7/10.'),
      opt('18/35', false, "That's from multiplying instead of dividing."),
      opt('5/3', false, 'Check which fraction gets flipped — it is the second one (6/7), not the first.'),
      opt('2/5', false, 'Recheck the reciprocal step before multiplying.')
    ]
  },
  {
    itemId: 'r4', order: 7, cluster: 'FRACDEC', clusterName: CLUSTER_NAMES.FRACDEC, recheckFor: 'd4',
    question: 'Order from largest to smallest: 0.7, \\(\\frac{5}{8}\\), \\(\\frac{3}{4}\\)',
    options: [
      opt('0.7, 3/4, 5/8', false, '3/4 = 0.75 is larger than 0.7, so it should come first.'),
      opt('3/4, 0.7, 5/8', true, 'Correct — 3/4 = 0.75, then 0.7, then 5/8 = 0.625.'),
      opt('5/8, 0.7, 3/4', false, "That's smallest to largest, not largest to smallest."),
      opt('3/4, 5/8, 0.7', false, '5/8 = 0.625 is the smallest of the three, so it belongs last.')
    ]
  },
  {
    itemId: 'r8', order: 8, cluster: 'FRACDEC', clusterName: CLUSTER_NAMES.FRACDEC, recheckFor: 'd8',
    question: 'Convert 0.75 to a fraction in lowest terms.',
    options: [
      opt('3/4', true, 'Correct — 0.75 = 75/100, which simplifies to 3/4.'),
      opt('75/100', false, "That's correct in value but not in lowest terms yet."),
      opt('7/5', false, "That's larger than 1, but 0.75 is less than 1."),
      opt('1/4', false, '1/4 = 0.25, not 0.75.')
    ]
  }
];

// ---------------------------------------------------------------------
// LEVEL 4 - Speed & Strategy (25-minute timed diagnostic, S/C/H/T tiers)
// ---------------------------------------------------------------------

const level4Warmup = [
  {
    itemId: 'w1', order: 1, cluster: 'EQUIV', clusterName: CLUSTER_NAMES.EQUIV,
    question: 'Simplify \\(\\frac{10}{15}\\).',
    options: [
      opt('2/3', true, 'Correct — the GCF of 10 and 15 is 5: 10÷5=2, 15÷5=3.'),
      opt('3/2', false, "That's the reciprocal, not the simplified form."),
      opt('5/10', false, '5/10 simplifies to 1/2, not equal to 10/15.'),
      opt('10/15', false, "That's the original, unsimplified fraction.")
    ]
  },
  {
    itemId: 'w2', order: 2, cluster: 'ADDSUB', clusterName: CLUSTER_NAMES.ADDSUB,
    question: '\\(\\frac{2}{7} + \\frac{3}{7} = ?\\)',
    options: [
      opt('5/7', true, 'Correct — matching denominators, add the numerators: 2+3=5.'),
      opt('6/14', false, '6/14 simplifies to 3/7, not 5/7 — recheck your addition.'),
      opt('1/7', false, 'Check your addition of the numerators: 2+3=5.'),
      opt('6/7', false, 'Recount the numerators — 2+3 is 5, not 6.')
    ]
  },
  {
    itemId: 'w3', order: 3, cluster: 'MULDIV', clusterName: CLUSTER_NAMES.MULDIV,
    question: '\\(\\frac{1}{5} \\times \\frac{2}{3} = ?\\)',
    options: [
      opt('2/15', true, 'Correct — 1×2=2, 5×3=15.'),
      opt('3/8', false, 'Fractions multiply straight across, not by adding.'),
      opt('2/8', false, 'The denominators multiply together (5×3=15), not add.'),
      opt('1/15', false, 'Multiply the numerators too: 1×2=2, not 1.')
    ]
  },
  {
    itemId: 'w4', order: 4, cluster: 'FRACDEC', clusterName: CLUSTER_NAMES.FRACDEC,
    question: 'Write \\(\\frac{1}{4}\\) as a decimal.',
    options: [
      opt('0.25', true, 'Correct — 1÷4=0.25.'),
      opt('0.4', false, "That's 2/5, not 1/4."),
      opt('0.14', false, 'That strings the digits together instead of dividing 1 by 4.'),
      opt('1.4', false, "That's too large — 1/4 is less than 1.")
    ]
  },
  {
    itemId: 'w5', order: 5, cluster: 'EQUIV', clusterName: CLUSTER_NAMES.EQUIV,
    question: 'Which fraction equals \\(\\frac{4}{6}\\) in lowest terms?',
    options: [
      opt('2/3', true, 'Correct — divide top and bottom by their GCF, 2.'),
      opt('1/2', false, '1/2 = 0.5, but 4/6 ≈ 0.667 — not equal.'),
      opt('4/6', false, "That's the original, unsimplified form."),
      opt('3/4', false, '3/4 = 0.75, not equal to 4/6.')
    ]
  },
  {
    itemId: 'w6', order: 6, cluster: 'ADDSUB', clusterName: CLUSTER_NAMES.ADDSUB,
    question: '\\(\\frac{5}{6} - \\frac{1}{6} = ?\\)',
    options: [
      opt('2/3', true, 'Correct — 5/6−1/6=4/6, which simplifies to 2/3.'),
      opt('4/6', false, '4/6 is right before simplifying — reduce it to 2/3.'),
      opt('1', false, 'Check your subtraction: 5−1=4, not 6.'),
      opt('1/6', false, 'Recheck the subtraction of the numerators.')
    ]
  },
  {
    itemId: 'w7', order: 7, cluster: 'MULDIV', clusterName: CLUSTER_NAMES.MULDIV,
    question: '\\(\\frac{3}{4} \\div \\frac{1}{2} = ?\\)',
    options: [
      opt('3/2', true, 'Correct — flip and multiply: 3/4 × 2/1 = 6/4 = 3/2.'),
      opt('3/8', false, "That's multiplication, not division."),
      opt('1/2', false, 'Dividing by a fraction less than 1 should increase the value.'),
      opt('2/3', false, "Check which fraction gets flipped — it's 1/2, not 3/4.")
    ]
  },
  {
    itemId: 'w8', order: 8, cluster: 'FRACDEC', clusterName: CLUSTER_NAMES.FRACDEC,
    question: 'Which is larger, 0.8 or \\(\\frac{3}{4}\\)?',
    options: [
      opt('0.8', true, 'Correct — 3/4 = 0.75, which is less than 0.8.'),
      opt('3/4', false, '3/4 = 0.75, which is less than 0.8.'),
      opt('They are equal', false, "0.8 ≠ 0.75, so they aren't equal."),
      opt('Cannot be determined', false, 'They can be compared directly by converting 3/4 to 0.75.')
    ]
  }
];

const level4Diagnostic = [
  {
    itemId: 'd1', order: 1, cluster: 'EQUIV', clusterName: CLUSTER_NAMES.EQUIV, tier: 'S',
    question: 'Simplify \\(\\frac{4}{10}\\) quickly.',
    options: [
      opt('2/5', true, 'Correct — divide top and bottom by 2.'),
      opt('1/2', false, '1/2 ≠ 4/10 — 4/10 simplifies to 2/5, not 1/2.'),
      opt('4/10', false, "That's unsimplified."),
      opt('5/2', false, "That's the reciprocal.")
    ]
  },
  {
    itemId: 'd2', order: 2, cluster: 'ADDSUB', clusterName: CLUSTER_NAMES.ADDSUB, tier: 'C',
    question: '\\(\\frac{2}{3} + \\frac{1}{6} - \\frac{1}{3} = ?\\)',
    options: [
      opt('1/2', true, 'Correct — convert all to sixths: 4/6+1/6−2/6=3/6=1/2.'),
      opt('5/6', false, "That's after the first two terms — don't forget to subtract 1/3."),
      opt('1/3', false, 'That skips the addition step.'),
      opt('2/3', false, 'Recheck each conversion to sixths before combining.')
    ]
  },
  {
    itemId: 'd3', order: 3, cluster: 'MULDIV', clusterName: CLUSTER_NAMES.MULDIV, tier: 'H',
    question: "A tank is \\(\\frac{3}{5}\\) full. After using \\(\\frac{1}{4}\\) of what's in the tank, what fraction of the WHOLE tank is left?",
    options: [
      opt('9/20', true, 'Correct — used 1/4 of 3/5 = 3/20; remaining = 3/5−3/20 = 12/20−3/20 = 9/20.'),
      opt('3/20', false, "That's the amount USED, not what's left."),
      opt('2/5', false, "That subtracts 1/4 from 3/5 directly, which isn't valid — 1/4 is a fraction of the tank's contents, not of the whole tank."),
      opt('1/4', false, "That's just the fraction used relative to the tank's current contents, not the remaining whole-tank fraction.")
    ]
  },
  {
    itemId: 'd4', order: 4, cluster: 'FRACDEC', clusterName: CLUSTER_NAMES.FRACDEC, tier: 'T',
    question: 'Round \\(\\frac{1}{3}\\) to two decimal places.',
    options: [
      opt('0.33', true, 'Correct — 1/3 = 0.333..., and the third digit (3) rounds down, giving 0.33.'),
      opt('0.34', false, 'The digit after 0.33 is a 3, which rounds DOWN, not up — a classic rounding trap.'),
      opt('0.3', false, "That's only one decimal place — the question asks for two."),
      opt('0.30', false, 'That drops the repeating 3s entirely instead of rounding at the second decimal.')
    ]
  },
  {
    itemId: 'd5', order: 5, cluster: 'ADDSUB', clusterName: CLUSTER_NAMES.ADDSUB, tier: 'S',
    question: '\\(\\frac{1}{9} + \\frac{2}{9} = ?\\)',
    options: [
      opt('1/3', true, 'Correct — 1/9+2/9=3/9=1/3.'),
      opt('3/18', false, "Denominators don't add when they already match."),
      opt('1/9', false, 'Add both numerators: 1+2=3.'),
      opt('2/9', false, "That's only one of the two fractions.")
    ]
  },
  {
    itemId: 'd6', order: 6, cluster: 'MULDIV', clusterName: CLUSTER_NAMES.MULDIV, tier: 'C',
    question: 'Simplify \\(\\frac{2}{3} \\div \\frac{4}{9}\\) fully.',
    options: [
      opt('3/2', true, 'Correct — 2/3 × 9/4 = 18/12, which simplifies to 3/2.'),
      opt('18/12', false, '18/12 is correct before simplifying — reduce it to 3/2.'),
      opt('8/27', false, "That's multiplication, not division."),
      opt('2/3', false, 'Dividing by a fraction less than 1 should make the value bigger, not stay the same.')
    ]
  },
  {
    itemId: 'd7', order: 7, cluster: 'FRACDEC', clusterName: CLUSTER_NAMES.FRACDEC, tier: 'H',
    question: 'Three test scores: 0.62, \\(\\frac{5}{8}\\), \\(\\frac{3}{5}\\). Which is the middle score?',
    options: [
      opt('0.62', true, 'Correct — 3/5=0.6, then 0.62, then 5/8=0.625: 0.62 is in the middle.'),
      opt('5/8', false, '5/8=0.625 is the largest of the three, not the middle.'),
      opt('3/5', false, '3/5=0.6 is the smallest of the three, not the middle.'),
      opt('All are equal', false, 'They are all different: 0.6, 0.62, and 0.625.')
    ]
  },
  {
    itemId: 'd8', order: 8, cluster: 'EQUIV', clusterName: CLUSTER_NAMES.EQUIV, tier: 'T',
    question: 'Is \\(\\frac{2}{3}\\) equivalent to \\(\\frac{2+1}{3+1}\\)?',
    options: [
      opt('No', true, 'Correct — adding the same number to numerator and denominator does NOT keep a fraction equivalent; only multiplying or dividing both by the same number does. 3/4 ≠ 2/3.'),
      opt('Yes', false, 'A classic trap — this only works for multiplying/dividing by the same factor, not adding. 3/4 ≠ 2/3.'),
      opt('Only if the number added is 1', false, 'Adding any number breaks equivalence, not just 1 — the rule requires multiplying or dividing, never adding.'),
      opt('Cannot be determined', false, 'It can be checked directly: 2/3 ≈ 0.667 and 3/4 = 0.75 — not equal, so the answer is No.')
    ]
  },
  {
    itemId: 'd9', order: 9, cluster: 'MULDIV', clusterName: CLUSTER_NAMES.MULDIV, tier: 'S',
    question: '\\(\\frac{1}{2} \\times \\frac{1}{5} = ?\\)',
    options: [
      opt('1/10', true, 'Correct — 1×1=1, 2×5=10.'),
      opt('2/5', false, 'That looks like addition, not multiplication.'),
      opt('1/7', false, "Denominators multiply (2×5=10), they don't add."),
      opt('5/2', false, "That's the reciprocal of the correct answer.")
    ]
  },
  {
    itemId: 'd10', order: 10, cluster: 'FRACDEC', clusterName: CLUSTER_NAMES.FRACDEC, tier: 'C',
    question: "A jug is 0.6 full. Express the empty part as a fraction in lowest terms.",
    options: [
      opt('2/5', true, 'Correct — empty = 1 − 0.6 = 0.4 = 2/5.'),
      opt('3/5', false, '3/5 = 0.6, which is the FULL part, not the empty part.'),
      opt('6/10', false, "That's the full part unreduced — and the question asks for the empty part."),
      opt('4/10', false, '4/10 is correct in value but not in lowest terms — reduce it to 2/5.')
    ]
  },
  {
    itemId: 'd11', order: 11, cluster: 'EQUIV', clusterName: CLUSTER_NAMES.EQUIV, tier: 'H',
    question: 'Which single fraction is equivalent to both \\(\\frac{6}{9}\\) and \\(\\frac{10}{15}\\)?',
    options: [
      opt('2/3', true, 'Correct — both 6/9 and 10/15 simplify to 2/3.'),
      opt('3/5', false, '3/5 = 0.6, but 6/9 and 10/15 both equal 2/3 ≈ 0.667.'),
      opt('4/6', false, "4/6 does equal 2/3, but it's not in lowest terms — 2/3 is the simplest form shared by both."),
      opt('5/9', false, 'Not equal to either 6/9 or 10/15.')
    ]
  },
  {
    itemId: 'd12', order: 12, cluster: 'ADDSUB', clusterName: CLUSTER_NAMES.ADDSUB, tier: 'T',
    question: '\\(\\frac{3}{4} - \\frac{3}{8} = ?\\)',
    options: [
      opt('3/8', true, 'Correct — 3/4 = 6/8, and 6/8 − 3/8 = 3/8.'),
      opt('0', false, 'A common trap: matching numerators (3 and 3) does not mean the difference is 0 — convert to a common denominator first.'),
      opt('3/4', false, 'That ignores the subtraction — recheck after converting to eighths.'),
      opt('6/4', false, 'That subtracts the denominators (8−4) instead of the converted numerators.')
    ]
  },
  {
    itemId: 'd13', order: 13, cluster: 'FRACDEC', clusterName: CLUSTER_NAMES.FRACDEC, tier: 'S',
    question: 'Convert 0.5 to a fraction.',
    options: [
      opt('1/2', true, 'Correct — 0.5 = 5/10, which simplifies to 1/2.'),
      opt('5/10', false, 'Correct in value but not fully reduced — reduce it to 1/2.'),
      opt('5/1', false, "That's 5, not 0.5."),
      opt('1/5', false, '1/5 = 0.2, not 0.5.')
    ]
  },
  {
    itemId: 'd14', order: 14, cluster: 'EQUIV', clusterName: CLUSTER_NAMES.EQUIV, tier: 'C',
    question: 'If \\(\\frac{x}{5} = \\frac{12}{20}\\), what is x?',
    options: [
      opt('3', true, 'Correct — 20÷5=4, and 12÷4=3.'),
      opt('8', false, 'Check the scale factor between denominators (20÷5=4), then divide the numerator by it.'),
      opt('17', false, 'That subtracts instead of using the scale factor.'),
      opt('60', false, 'That multiplies instead of dividing by the scale factor.')
    ]
  },
  {
    itemId: 'd15', order: 15, cluster: 'ADDSUB', clusterName: CLUSTER_NAMES.ADDSUB, tier: 'H',
    question: 'What single fraction, added to \\(\\frac{5}{12}\\), gives a sum of \\(\\frac{3}{4}\\)?',
    options: [
      opt('1/3', true, 'Correct — convert 3/4 to 9/12; 9/12−5/12=4/12=1/3.'),
      opt('4/12', false, '4/12 is correct before simplifying — reduce it to 1/3.'),
      opt('2/3', false, 'Recheck the conversion of 3/4 into twelfths (it is 9/12, not something larger).'),
      opt('1/4', false, "That doesn't satisfy the equation — check by adding it back to 5/12.")
    ]
  },
  {
    itemId: 'd16', order: 16, cluster: 'MULDIV', clusterName: CLUSTER_NAMES.MULDIV, tier: 'T',
    question: '\\(\\left(\\frac{1}{2}\\right)^2 = ?\\)',
    options: [
      opt('1/4', true, 'Correct — squaring means multiplying by itself: 1/2 × 1/2 = 1/4.'),
      opt('1/2', false, 'A classic trap — squaring is NOT the same as leaving the fraction unchanged; you must multiply it by itself.'),
      opt('1', false, 'That would only happen if the base were 1, not 1/2.'),
      opt('2/4', false, '2/4 equals 1/2, which is the un-squared value, not the square.')
    ]
  }
];

const level4Recheck = [
  {
    itemId: 'rr1', order: 1, cluster: 'EQUIV', clusterName: CLUSTER_NAMES.EQUIV, recheckFor: 'd1',
    question: 'Simplify \\(\\frac{6}{15}\\) quickly.',
    options: [
      opt('2/5', true, 'Correct — divide top and bottom by 3.'),
      opt('5/2', false, "That's the reciprocal."),
      opt('6/15', false, "That's unsimplified."),
      opt('3/10', false, '6/15 = 0.4, but 3/10 = 0.3 — not equal.')
    ]
  },
  {
    itemId: 'rr2', order: 2, cluster: 'EQUIV', clusterName: CLUSTER_NAMES.EQUIV, recheckFor: 'd11',
    question: 'Which single fraction equals both \\(\\frac{4}{6}\\) and \\(\\frac{8}{12}\\) in lowest terms?',
    options: [
      opt('2/3', true, 'Correct — both simplify to 2/3.'),
      opt('1/2', false, '1/2 = 0.5, but both fractions equal 2/3 ≈ 0.667.'),
      opt('4/6', false, "That's not in lowest terms."),
      opt('3/4', false, '3/4 = 0.75, not equal to 2/3.')
    ]
  },
  {
    itemId: 'rr3', order: 3, cluster: 'ADDSUB', clusterName: CLUSTER_NAMES.ADDSUB, recheckFor: 'd2',
    question: '\\(\\frac{1}{2} - \\frac{1}{8} + \\frac{1}{4} = ?\\)',
    options: [
      opt('5/8', true, 'Correct — convert to eighths: 4/8−1/8+2/8=5/8.'),
      opt('3/8', false, 'Recheck each conversion to eighths before combining.'),
      opt('1/2', false, 'That skips the last addition step.'),
      opt('7/8', false, 'Recheck the subtraction of 1/8.')
    ]
  },
  {
    itemId: 'rr4', order: 4, cluster: 'ADDSUB', clusterName: CLUSTER_NAMES.ADDSUB, recheckFor: 'd12',
    question: '\\(\\frac{5}{6} - \\frac{5}{12} = ?\\)',
    options: [
      opt('5/12', true, 'Correct — 5/6=10/12, and 10/12−5/12=5/12.'),
      opt('0', false, "A common trap: matching numerators (5 and 5) doesn't mean the difference is 0 — convert to a common denominator first."),
      opt('5/6', false, 'That ignores the subtraction — recheck after converting to twelfths.'),
      opt('10/6', false, 'That subtracts the denominators (12−6) instead of the converted numerators.')
    ]
  },
  {
    itemId: 'rr5', order: 5, cluster: 'MULDIV', clusterName: CLUSTER_NAMES.MULDIV, recheckFor: 'd3',
    question: "A bottle is \\(\\frac{2}{3}\\) full. After pouring out \\(\\frac{1}{2}\\) of what's inside, what fraction of the WHOLE bottle is left?",
    options: [
      opt('1/3', true, 'Correct — poured out 1/2 of 2/3 = 1/3; remaining = 2/3−1/3 = 1/3.'),
      opt('1/2', false, "That's the fraction poured out relative to the bottle's CONTENTS, not the whole bottle remaining."),
      opt('2/3', false, 'That ignores that some was poured out.'),
      opt('1/6', false, 'Recheck: you poured out 1/3 of the whole bottle, and 2/3−1/3=1/3, not 1/6.')
    ]
  },
  {
    itemId: 'rr6', order: 6, cluster: 'MULDIV', clusterName: CLUSTER_NAMES.MULDIV, recheckFor: 'd16',
    question: '\\(\\left(\\frac{1}{3}\\right)^2 = ?\\)',
    options: [
      opt('1/9', true, 'Correct — 1/3 × 1/3 = 1/9.'),
      opt('1/3', false, 'A classic trap — squaring is NOT the same as leaving the fraction unchanged.'),
      opt('2/3', false, 'That would come from doubling, not squaring.'),
      opt('1/6', false, "Denominators multiply (3×3=9), they don't add.")
    ]
  },
  {
    itemId: 'rr7', order: 7, cluster: 'FRACDEC', clusterName: CLUSTER_NAMES.FRACDEC, recheckFor: 'd4',
    question: 'Round \\(\\frac{2}{3}\\) to two decimal places.',
    options: [
      opt('0.67', true, 'Correct — 2/3=0.666..., and the third digit (6) rounds the second decimal up to 0.67.'),
      opt('0.66', false, 'The digit after 0.66 is a 6, which rounds UP, not down.'),
      opt('0.6', false, "That's only one decimal place — the question asks for two."),
      opt('0.60', false, 'That drops the repeating 6s instead of rounding at the second decimal.')
    ]
  },
  {
    itemId: 'rr8', order: 8, cluster: 'FRACDEC', clusterName: CLUSTER_NAMES.FRACDEC, recheckFor: 'd7',
    question: 'Three test scores: 0.58, \\(\\frac{9}{16}\\), \\(\\frac{3}{5}\\). Which is the middle score?',
    options: [
      opt('0.58', true, 'Correct — 9/16=0.5625, then 0.58, then 3/5=0.6: 0.58 is in the middle.'),
      opt('9/16', false, '9/16=0.5625 is the smallest, not the middle.'),
      opt('3/5', false, '3/5=0.6 is the largest, not the middle.'),
      opt('All are equal', false, "They're all different: 0.5625, 0.58, and 0.6.")
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
  ...buildDocs(1, 'recheck', level1Recheck),
  ...buildDocs(4, 'warmup', level4Warmup),
  ...buildDocs(4, 'diagnostic', level4Diagnostic),
  ...buildDocs(4, 'recheck', level4Recheck)
];

const chapterDocs = [
  {
    grade: GRADE,
    gradeLabel: GRADE_LABEL,
    chapterSlug: CHAPTER_SLUG,
    chapterName: CHAPTER_NAME,
    level: 1,
    title: 'Fractions — Core Fluency',
    subtitle: 'Retention-First Warm-up & Diagnostic',
    description: 'Automate equivalence, addition/subtraction, multiplication/division and fraction-decimal conversion.',
    clusterNames: CLUSTER_NAMES,
    gateReviewHTML: '<strong>Quick Review</strong><br>' +
      '&bull; Equivalent fractions: multiply or divide top and bottom by the same number.<br>' +
      '&bull; Add/subtract: match the denominators first, then combine numerators.<br>' +
      '&bull; Multiply: straight across. Divide: flip the second fraction, then multiply.<br>' +
      '&bull; Fraction &harr; decimal: divide numerator by denominator, or read place value.',
    timedSeconds: 0
  },
  {
    grade: GRADE,
    gradeLabel: GRADE_LABEL,
    chapterSlug: CHAPTER_SLUG,
    chapterName: CHAPTER_NAME,
    level: 4,
    title: 'Fractions — Speed & Strategy',
    subtitle: 'Olympiad Simulation',
    description: 'A 25-minute timed diagnostic mixing Speed, Core, Challenge and Trap items across every fractions cluster.',
    clusterNames: CLUSTER_NAMES,
    gateReviewHTML: '',
    timedSeconds: 25 * 60
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

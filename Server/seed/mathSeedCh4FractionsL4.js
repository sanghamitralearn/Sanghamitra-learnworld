// seed/mathSeedCh4FractionsL4.js
//
// Populates math_chapters and math_questions with Grade 5, Chapter 4
// (Fractions), Level 4 — converted from the standalone HTML file
// ch-4-fractions-level-4.html.
//
// This is the 25-minute timed diagnostic level; diagnostic items carry a
// difficulty tier (S = Speed, C = Core, H = Hard, T = Trap).
//
// Run with: node seed/mathSeedCh4FractionsL4.js

const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-5";
const GRADE_LABEL = "Grade 5";
const CHAPTER_SLUG = "ch-4-fractions";
const CHAPTER_NAME = "Fractions";
const LEVEL = 4;

const CLUSTER_NAMES = {
  TYPES: "Types & Conversions",
  EQUIV: "Equivalent Fractions & Simplifying",
  COMP: "Comparing & Ordering",
  ADDSUB: "Addition & Subtraction",
  MUL: "Multiplying Fractions & Mixed Operations",
  DIV: "Dividing Fractions & Applications"
};

const warmupItems = [
  {
    itemId: "w1", order: 1, cluster: "TYPES", clusterName: CLUSTER_NAMES.TYPES,
    question: "Convert \\(2\\frac{1}{5}\\) to an improper fraction.",
    options: [
        { text: "\\( \\frac{11}{5} \\)", correct: true, feedback: "2×5=10, +1=11 → 11/5." },
        { text: "\\( \\frac{10}{5} \\)", correct: false, feedback: "You only multiplied 2×5, forgot the numerator." },
        { text: "\\( \\frac{7}{5} \\)", correct: false, feedback: "You added 2+5=7." },
        { text: "\\( \\frac{5}{11} \\)", correct: false, feedback: "Flipped." }
      ]
  },
  {
    itemId: "w2", order: 2, cluster: "EQUIV", clusterName: CLUSTER_NAMES.EQUIV,
    question: "Simplify \\(\\frac{15}{20}\\).",
    options: [
        { text: "\\( \\frac{3}{4} \\)", correct: true, feedback: "Divide by 5 → 3/4." },
        { text: "\\( \\frac{5}{4} \\)", correct: false, feedback: "Incorrect." },
        { text: "\\( \\frac{15}{20} \\)", correct: false, feedback: "Not simplified." },
        { text: "\\( \\frac{5}{10} \\)", correct: false, feedback: "Wrong." }
      ]
  },
  {
    itemId: "w3", order: 3, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    question: "Which is larger? \\(\\frac{2}{7}\\) or \\(\\frac{3}{7}\\)?",
    options: [
        { text: "\\( \\frac{3}{7} \\)", correct: true, feedback: "Same denominator; 3 > 2." },
        { text: "\\( \\frac{2}{7} \\)", correct: false, feedback: "2 is smaller than 3." },
        { text: "They are equal", correct: false, feedback: "The numerators differ." },
        { text: "Cannot compare", correct: false, feedback: "Same denominator is easy to compare." }
      ]
  },
  {
    itemId: "w4", order: 4, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    question: "\\(\\frac{1}{4} + \\frac{2}{4}\\) = ?",
    options: [
        { text: "\\( \\frac{3}{4} \\)", correct: true, feedback: "1+2=3, denominator stays 4." },
        { text: "\\( \\frac{3}{8} \\)", correct: false, feedback: "Added denominators." },
        { text: "\\( \\frac{1}{2} \\)", correct: false, feedback: "2/4=1/2, but plus 1/4 is 3/4." },
        { text: "\\( \\frac{1}{4} \\)", correct: false, feedback: "Forgot to add the second fraction." }
      ]
  },
  {
    itemId: "w5", order: 5, cluster: "MUL", clusterName: CLUSTER_NAMES.MUL,
    question: "\\(3 \\times \\frac{2}{5}\\) = ? (improper fraction)",
    options: [
        { text: "\\( \\frac{6}{5} \\)", correct: true, feedback: "3×2=6, denominator 5." },
        { text: "\\( \\frac{5}{6} \\)", correct: false, feedback: "Reciprocal." },
        { text: "\\( \\frac{2}{15} \\)", correct: false, feedback: "Multiplied denominator." },
        { text: "\\( \\frac{6}{15} \\)", correct: false, feedback: "Multiplied both." }
      ]
  },
  {
    itemId: "w6", order: 6, cluster: "DIV", clusterName: CLUSTER_NAMES.DIV,
    question: "\\(\\frac{5}{8} \\div 5\\) = ? (simplest form)",
    options: [
        { text: "\\( \\frac{1}{8} \\)", correct: true, feedback: "5/8 × 1/5 = 5/40 = 1/8." },
        { text: "\\( \\frac{25}{8} \\)", correct: false, feedback: "Multiplied by 5." },
        { text: "\\( \\frac{5}{40} \\)", correct: false, feedback: "Not simplified." },
        { text: "\\( \\frac{1}{5} \\)", correct: false, feedback: "Incorrect." }
      ]
  },
  {
    itemId: "w7", order: 7, cluster: "TYPES", clusterName: CLUSTER_NAMES.TYPES,
    question: "Which is an improper fraction? \\(\\frac{3}{5}, \\frac{7}{4}, \\frac{1}{2}, \\frac{2}{3}\\)",
    options: [
        { text: "\\( \\frac{7}{4} \\)", correct: true, feedback: "Numerator > denominator." },
        { text: "\\( \\frac{3}{5} \\)", correct: false, feedback: "3 < 5, proper." },
        { text: "\\( \\frac{1}{2} \\)", correct: false, feedback: "1 < 2, proper." },
        { text: "\\( \\frac{2}{3} \\)", correct: false, feedback: "2 < 3, proper." }
      ]
  },
  {
    itemId: "w8", order: 8, cluster: "MUL", clusterName: CLUSTER_NAMES.MUL,
    question: "What is \\(\\frac{1}{3}\\) of 12?",
    options: [
        { text: "4", correct: true, feedback: "12 ÷ 3 = 4." },
        { text: "36", correct: false, feedback: "Multiplied 12×3." },
        { text: "3", correct: false, feedback: "You copied the denominator." },
        { text: "12", correct: false, feedback: "No operation performed." }
      ]
  }
];

const diagnosticItems = [
  {
    itemId: "d1", order: 1, cluster: "TYPES", clusterName: CLUSTER_NAMES.TYPES, tier: "S",
    question: "Convert \\(3\\frac{2}{5}\\) to an improper fraction.",
    options: [
        { text: "\\( \\frac{17}{5} \\)", correct: true, feedback: "3×5=15, +2=17 → 17/5." },
        { text: "\\( \\frac{15}{5} \\)", correct: false, feedback: "Only multiplied 3×5." },
        { text: "\\( \\frac{6}{5} \\)", correct: false, feedback: "Adding 3+2+5 is not the method." },
        { text: "\\( \\frac{17}{10} \\)", correct: false, feedback: "Doubled the denominator." }
      ]
  },
  {
    itemId: "d2", order: 2, cluster: "EQUIV", clusterName: CLUSTER_NAMES.EQUIV, tier: "S",
    question: "Simplify \\(\\frac{12}{18}\\).",
    options: [
        { text: "\\( \\frac{2}{3} \\)", correct: true, feedback: "Divide by 6 → 2/3." },
        { text: "\\( \\frac{4}{6} \\)", correct: false, feedback: "Not fully simplified." },
        { text: "\\( \\frac{6}{9} \\)", correct: false, feedback: "Also not fully simplified." },
        { text: "\\( \\frac{3}{4} \\)", correct: false, feedback: "Incorrect simplification." }
      ]
  },
  {
    itemId: "d3", order: 3, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP, tier: "S",
    question: "Which is smaller? \\(\\frac{5}{9}\\) or \\(\\frac{4}{9}\\)?",
    options: [
        { text: "\\( \\frac{4}{9} \\)", correct: true, feedback: "4 < 5, same denominator." },
        { text: "\\( \\frac{5}{9} \\)", correct: false, feedback: "5/9 is larger." },
        { text: "They are equal", correct: false, feedback: "Numerators differ." },
        { text: "Cannot compare", correct: false, feedback: "Same denominator, easy to compare." }
      ]
  },
  {
    itemId: "d4", order: 4, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB, tier: "S",
    question: "\\(\\frac{3}{8} + \\frac{2}{8}\\) = ? (simplest form)",
    options: [
        { text: "\\( \\frac{5}{8} \\)", correct: true, feedback: "3+2=5, denominator 8." },
        { text: "\\( \\frac{5}{16} \\)", correct: false, feedback: "Added denominators." },
        { text: "\\( \\frac{1}{8} \\)", correct: false, feedback: "Incorrect addition." },
        { text: "\\( \\frac{1}{4} \\)", correct: false, feedback: "Incorrect." }
      ]
  },
  {
    itemId: "d5", order: 5, cluster: "MUL", clusterName: CLUSTER_NAMES.MUL, tier: "T",
    question: "\\(4 \\times \\frac{3}{10}\\) = ? (simplest form)",
    options: [
        { text: "\\( \\frac{6}{5} \\)", correct: true, feedback: "12/10 = 6/5." },
        { text: "\\( \\frac{12}{10} \\)", correct: false, feedback: "Not simplified." },
        { text: "\\( \\frac{3}{40} \\)", correct: false, feedback: "Multiplied the denominator instead." },
        { text: "\\( \\frac{4}{13} \\)", correct: false, feedback: "Not a valid operation." }
      ]
  },
  {
    itemId: "d6", order: 6, cluster: "DIV", clusterName: CLUSTER_NAMES.DIV, tier: "S",
    question: "\\(\\frac{6}{7} \\div 3\\) = ? (simplest form)",
    options: [
        { text: "\\( \\frac{2}{7} \\)", correct: true, feedback: "6/7 × 1/3 = 6/21 = 2/7." },
        { text: "\\( \\frac{18}{7} \\)", correct: false, feedback: "Multiplied by 3 instead of dividing." },
        { text: "\\( \\frac{3}{7} \\)", correct: false, feedback: "Incorrect." },
        { text: "\\( \\frac{6}{21} \\)", correct: false, feedback: "Not simplified." }
      ]
  },
  {
    itemId: "d7", order: 7, cluster: "TYPES", clusterName: CLUSTER_NAMES.TYPES, tier: "T",
    question: "Which is largest? \\(\\frac{11}{4}, 2\\frac{1}{2}, \\frac{9}{4}\\)",
    options: [
        { text: "\\( \\frac{11}{4} \\)", correct: true, feedback: "11/4=2.75, 2 1/2=2.5, 9/4=2.25." },
        { text: "\\(2\\frac{1}{2}\\)", correct: false, feedback: "2 1/2 = 2.5, but 11/4 = 2.75." },
        { text: "\\(\\frac{9}{4}\\)", correct: false, feedback: "9/4 = 2.25, the smallest." },
        { text: "All equal", correct: false, feedback: "They have different values." }
      ]
  },
  {
    itemId: "d8", order: 8, cluster: "EQUIV", clusterName: CLUSTER_NAMES.EQUIV, tier: "T",
    question: "Find the missing number: \\(\\frac{5}{6} = \\frac{?}{18}\\)",
    options: [
        { text: "15", correct: true, feedback: "6×3=18, so 5×3=15." },
        { text: "3", correct: false, feedback: "You divided 18 by 6 but must multiply the numerator by that same factor." },
        { text: "10", correct: false, feedback: "Incorrect multiplier." },
        { text: "12", correct: false, feedback: "Incorrect multiplier." }
      ]
  },
  {
    itemId: "d9", order: 9, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP, tier: "C",
    question: "Arrange in ascending order: \\(\\frac{2}{3}, \\frac{5}{8}, \\frac{3}{4}\\)",
    options: [
        { text: "\\(\\frac{5}{8}, \\frac{2}{3}, \\frac{3}{4}\\)", correct: true, feedback: "5/8=15/24, 2/3=16/24, 3/4=18/24." },
        { text: "\\(\\frac{2}{3}, \\frac{5}{8}, \\frac{3}{4}\\)", correct: false, feedback: "5/8 is smaller than 2/3." },
        { text: "\\(\\frac{3}{4}, \\frac{2}{3}, \\frac{5}{8}\\)", correct: false, feedback: "That's descending." },
        { text: "\\(\\frac{5}{8}, \\frac{3}{4}, \\frac{2}{3}\\)", correct: false, feedback: "3/4 is larger than 2/3." }
      ]
  },
  {
    itemId: "d10", order: 10, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB, tier: "C",
    question: "\\(\\frac{2}{5} + \\frac{1}{2}\\) = ? (simplest form)",
    options: [
        { text: "\\(\\frac{9}{10}\\)", correct: true, feedback: "4/10 + 5/10 = 9/10." },
        { text: "\\(\\frac{3}{7}\\)", correct: false, feedback: "You added numerators and denominators separately." },
        { text: "\\(\\frac{1}{10}\\)", correct: false, feedback: "Incorrect." },
        { text: "\\(\\frac{4}{10}\\)", correct: false, feedback: "Forgot to add the second fraction." }
      ]
  },
  {
    itemId: "d11", order: 11, cluster: "MUL", clusterName: CLUSTER_NAMES.MUL, tier: "C",
    question: "\\(2 \\times \\frac{3}{5} + \\frac{1}{5}\\) = ? (simplest form)",
    options: [
        { text: "\\(\\frac{7}{5}\\)", correct: true, feedback: "6/5 + 1/5 = 7/5." },
        { text: "\\(\\frac{6}{5}\\)", correct: false, feedback: "Forgot to add 1/5." },
        { text: "\\(\\frac{4}{5}\\)", correct: false, feedback: "Incorrect multiplication." },
        { text: "\\(\\frac{7}{10}\\)", correct: false, feedback: "Added denominators." }
      ]
  },
  {
    itemId: "d12", order: 12, cluster: "DIV", clusterName: CLUSTER_NAMES.DIV, tier: "T",
    question: "\\(\\frac{5}{4} \\div 2\\) = ? (simplest form)",
    options: [
        { text: "\\(\\frac{5}{8}\\)", correct: true, feedback: "5/4 × 1/2 = 5/8." },
        { text: "\\(\\frac{10}{4}\\)", correct: false, feedback: "Multiplied by 2 instead of dividing." },
        { text: "\\(\\frac{5}{2}\\)", correct: false, feedback: "Incorrect." },
        { text: "\\(\\frac{4}{10}\\)", correct: false, feedback: "Flipped incorrectly." }
      ]
  },
  {
    itemId: "d13", order: 13, cluster: "TYPES", clusterName: CLUSTER_NAMES.TYPES, tier: "H",
    question: "When a number is multiplied by 3 and then \\(\\frac{1}{2}\\) is added, the result is 5. Find the number.",
    options: [
        { text: "\\(1\\frac{1}{2}\\)", correct: true, feedback: "5 - 1/2 = 4 1/2 = 9/2. ÷3 = 3/2 = 1 1/2." },
        { text: "\\(2\\frac{1}{2}\\)", correct: false, feedback: "Incorrect reverse operations." },
        { text: "\\(1\\frac{1}{4}\\)", correct: false, feedback: "Incorrect." },
        { text: "\\(1\\frac{2}{3}\\)", correct: false, feedback: "Incorrect." }
      ]
  },
  {
    itemId: "d14", order: 14, cluster: "EQUIV", clusterName: CLUSTER_NAMES.EQUIV, tier: "H",
    question: "Which fraction is NOT equivalent to \\(\\frac{3}{5}\\)? \\(\\frac{6}{10}, \\frac{9}{15}, \\frac{12}{20}, \\frac{10}{16}\\)",
    options: [
        { text: "\\(\\frac{10}{16}\\)", correct: true, feedback: "10/16 = 5/8, not 3/5." },
        { text: "\\(\\frac{6}{10}\\)", correct: false, feedback: "6/10 = 3/5." },
        { text: "\\(\\frac{9}{15}\\)", correct: false, feedback: "9/15 = 3/5." },
        { text: "\\(\\frac{12}{20}\\)", correct: false, feedback: "12/20 = 3/5." }
      ]
  },
  {
    itemId: "d15", order: 15, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP, tier: "H",
    question: "Three friends shared a pizza. A ate \\(\\frac{2}{5}\\), B ate \\(\\frac{3}{8}\\), C ate the rest. Who ate the most?",
    options: [
        { text: "A", correct: true, feedback: "2/5=16/40, 3/8=15/40, C=9/40. A ate the most." },
        { text: "B", correct: false, feedback: "B ate 15/40, less than A." },
        { text: "C", correct: false, feedback: "C ate 9/40, the least." },
        { text: "All equal", correct: false, feedback: "Different amounts." }
      ]
  },
  {
    itemId: "d16", order: 16, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB, tier: "H",
    question: "\\( (2\\frac{1}{2} - 1\\frac{1}{4}) + \\frac{3}{4}\\) = ? (simplest form)",
    options: [
        { text: "2", correct: true, feedback: "5/2 - 5/4 = 10/4 - 5/4 = 5/4; + 3/4 = 8/4 = 2." },
        { text: "\\(1\\frac{1}{2}\\)", correct: false, feedback: "Incorrect bracket evaluation." },
        { text: "\\(1\\frac{3}{4}\\)", correct: false, feedback: "Incorrect." },
        { text: "\\(2\\frac{1}{4}\\)", correct: false, feedback: "Incorrect." }
      ]
  },
  {
    itemId: "d17", order: 17, cluster: "MUL", clusterName: CLUSTER_NAMES.MUL, tier: "H",
    question: "A tank is \\(\\frac{3}{4}\\) full. \\(\\frac{1}{3}\\) of the water is used. What fraction of the tank is now full?",
    options: [
        { text: "\\(\\frac{1}{2}\\)", correct: true, feedback: "Used: 1/3 × 3/4 = 1/4. Remaining: 3/4 - 1/4 = 1/2." },
        { text: "\\(\\frac{1}{4}\\)", correct: false, feedback: "That's the amount used." },
        { text: "\\(\\frac{1}{3}\\)", correct: false, feedback: "Incorrect." },
        { text: "\\(\\frac{2}{3}\\)", correct: false, feedback: "Incorrect." }
      ]
  },
  {
    itemId: "d18", order: 18, cluster: "DIV", clusterName: CLUSTER_NAMES.DIV, tier: "C",
    question: "How many \\(\\frac{2}{5}\\) kg bags can be filled from 4 kg of sugar?",
    options: [
        { text: "10", correct: true, feedback: "4 ÷ 2/5 = 4 × 5/2 = 10." },
        { text: "8", correct: false, feedback: "Incorrect division." },
        { text: "20", correct: false, feedback: "Too large." },
        { text: "5", correct: false, feedback: "Incorrect." }
      ]
  },
  {
    itemId: "d19", order: 19, cluster: "EQUIV", clusterName: CLUSTER_NAMES.EQUIV, tier: "C",
    question: "Complete the pattern: \\(\\frac{1}{2} = \\frac{2}{4} = \\frac{3}{6} = \\frac{?}{8}\\)",
    options: [
        { text: "4", correct: true, feedback: "Pattern: numerator = denominator ÷ 2. 8 ÷ 2 = 4." },
        { text: "3", correct: false, feedback: "Doesn't follow the pattern." },
        { text: "5", correct: false, feedback: "Doesn't follow the pattern." },
        { text: "6", correct: false, feedback: "Doesn't follow the pattern." }
      ]
  },
  {
    itemId: "d20", order: 20, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP, tier: "T",
    question: "Which is larger? \\(\\frac{7}{3}\\) or \\(2\\frac{1}{3}\\)?",
    options: [
        { text: "They are equal", correct: true, feedback: "7/3 = 2 1/3. They are exactly the same." },
        { text: "\\(\\frac{7}{3}\\)", correct: false, feedback: "They are equal." },
        { text: "\\(2\\frac{1}{3}\\)", correct: false, feedback: "They are equal." },
        { text: "Cannot compare", correct: false, feedback: "Convert to the same form to compare." }
      ]
  }
];

const recheckItems = [
  {
    itemId: "r1", order: 1, cluster: "TYPES", clusterName: CLUSTER_NAMES.TYPES,
    question: "Convert \\(4\\frac{1}{3}\\) to an improper fraction.",
    options: [
        { text: "\\(\\frac{13}{3}\\)", correct: true, feedback: "4×3=12, +1=13 → 13/3." },
        { text: "\\(\\frac{12}{3}\\)", correct: false, feedback: "Only multiplied 4×3." },
        { text: "\\(\\frac{7}{3}\\)", correct: false, feedback: "Incorrect addition." },
        { text: "\\(\\frac{3}{13}\\)", correct: false, feedback: "Flipped." }
      ]
  },
  {
    itemId: "r2", order: 2, cluster: "EQUIV", clusterName: CLUSTER_NAMES.EQUIV,
    question: "Simplify \\(\\frac{18}{24}\\).",
    options: [
        { text: "\\(\\frac{3}{4}\\)", correct: true, feedback: "Divide by 6 → 3/4." },
        { text: "\\(\\frac{6}{8}\\)", correct: false, feedback: "Not fully simplified." },
        { text: "\\(\\frac{9}{12}\\)", correct: false, feedback: "Not fully simplified." },
        { text: "\\(\\frac{2}{3}\\)", correct: false, feedback: "Incorrect simplification." }
      ]
  },
  {
    itemId: "r3", order: 3, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    question: "Which is smaller? \\(\\frac{6}{11}\\) or \\(\\frac{5}{11}\\)?",
    options: [
        { text: "\\(\\frac{5}{11}\\)", correct: true, feedback: "5 < 6, same denominator." },
        { text: "\\(\\frac{6}{11}\\)", correct: false, feedback: "6/11 is larger." },
        { text: "Equal", correct: false, feedback: "Numerators differ." },
        { text: "Cannot compare", correct: false, feedback: "Same denominator, easy to compare." }
      ]
  },
  {
    itemId: "r4", order: 4, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    question: "\\(\\frac{7}{12} - \\frac{2}{12}\\) = ? (simplest form)",
    options: [
        { text: "\\(\\frac{5}{12}\\)", correct: true, feedback: "7-2=5, denominator 12." },
        { text: "\\(\\frac{5}{24}\\)", correct: false, feedback: "Added denominators." },
        { text: "\\(\\frac{1}{2}\\)", correct: false, feedback: "Incorrect simplification." },
        { text: "\\(\\frac{5}{6}\\)", correct: false, feedback: "Incorrect." }
      ]
  },
  {
    itemId: "r5", order: 5, cluster: "MUL", clusterName: CLUSTER_NAMES.MUL,
    question: "\\(5 \\times \\frac{2}{7}\\) = ? (improper fraction in simplest form)",
    options: [
        { text: "\\(\\frac{10}{7}\\)", correct: true, feedback: "5×2=10, denominator 7." },
        { text: "\\(\\frac{7}{10}\\)", correct: false, feedback: "Reciprocal." },
        { text: "\\(\\frac{10}{35}\\)", correct: false, feedback: "Multiplied the denominator too." },
        { text: "\\(\\frac{2}{35}\\)", correct: false, feedback: "Incorrect." }
      ]
  },
  {
    itemId: "r6", order: 6, cluster: "DIV", clusterName: CLUSTER_NAMES.DIV,
    question: "\\(\\frac{8}{9} \\div 4\\) = ? (simplest form)",
    options: [
        { text: "\\(\\frac{2}{9}\\)", correct: true, feedback: "8/9 × 1/4 = 8/36 = 2/9." },
        { text: "\\(\\frac{32}{9}\\)", correct: false, feedback: "Multiplied by 4 instead of dividing." },
        { text: "\\(\\frac{8}{36}\\)", correct: false, feedback: "Not simplified." },
        { text: "\\(\\frac{4}{9}\\)", correct: false, feedback: "Incorrect." }
      ]
  },
  {
    itemId: "r7", order: 7, cluster: "TYPES", clusterName: CLUSTER_NAMES.TYPES,
    question: "Which is an improper fraction? \\(\\frac{4}{7}, \\frac{9}{5}, \\frac{3}{8}, \\frac{1}{2}\\)",
    options: [
        { text: "\\(\\frac{9}{5}\\)", correct: true, feedback: "9 > 5." },
        { text: "\\(\\frac{4}{7}\\)", correct: false, feedback: "4 < 7, proper." },
        { text: "\\(\\frac{3}{8}\\)", correct: false, feedback: "3 < 8, proper." },
        { text: "\\(\\frac{1}{2}\\)", correct: false, feedback: "1 < 2, proper." }
      ]
  },
  {
    itemId: "r8", order: 8, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    question: "Arrange in descending order: \\(\\frac{3}{5}, \\frac{4}{7}, \\frac{2}{3}\\)",
    options: [
        { text: "\\(\\frac{2}{3}, \\frac{3}{5}, \\frac{4}{7}\\)", correct: true, feedback: "LCM 105: 70/105, 63/105, 60/105." },
        { text: "\\(\\frac{4}{7}, \\frac{3}{5}, \\frac{2}{3}\\)", correct: false, feedback: "That's ascending." },
        { text: "\\(\\frac{3}{5}, \\frac{2}{3}, \\frac{4}{7}\\)", correct: false, feedback: "Not ordered correctly." },
        { text: "\\(\\frac{2}{3}, \\frac{4}{7}, \\frac{3}{5}\\)", correct: false, feedback: "Not ordered correctly." }
      ]
  },
  {
    itemId: "r9", order: 9, cluster: "MUL", clusterName: CLUSTER_NAMES.MUL,
    question: "\\(3 \\times \\frac{2}{9} + \\frac{1}{9}\\) = ? (simplest form)",
    options: [
        { text: "\\(\\frac{7}{9}\\)", correct: true, feedback: "6/9 + 1/9 = 7/9." },
        { text: "\\(\\frac{6}{9}\\)", correct: false, feedback: "Forgot to add 1/9." },
        { text: "\\(\\frac{7}{18}\\)", correct: false, feedback: "Added denominators." },
        { text: "\\(\\frac{1}{3}\\)", correct: false, feedback: "Incorrect." }
      ]
  },
  {
    itemId: "r10", order: 10, cluster: "DIV", clusterName: CLUSTER_NAMES.DIV,
    question: "\\(\\frac{7}{10} \\div 7 + \\frac{1}{5}\\) = ? (simplest form)",
    options: [
        { text: "\\(\\frac{3}{10}\\)", correct: true, feedback: "7/10÷7=1/10. + 2/10 = 3/10." },
        { text: "\\(\\frac{1}{10}\\)", correct: false, feedback: "Only the division result." },
        { text: "\\(\\frac{2}{10}\\)", correct: false, feedback: "Only the second fraction." },
        { text: "\\(\\frac{7}{10}\\)", correct: false, feedback: "No operation." }
      ]
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
    title: "Fractions — Speed & Strategy",
    subtitle: "Telangana & Cambridge · Level 4 · Speed & Strategy",
    description: "A 25-minute timed diagnostic mixing Speed, Core, Challenge and Trap items across every fractions cluster.",
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

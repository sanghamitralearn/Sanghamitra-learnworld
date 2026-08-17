// seed/mathSeedCh4FractionsL1.js
//
// Populates math_chapters and math_questions with Grade 5, Chapter 4
// (Fractions), Level 1 — converted from the standalone HTML file
// ch-4-fractions-level-1.html.
//
// Run with: node seed/mathSeedCh4FractionsL1.js

const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-5";
const GRADE_LABEL = "Grade 5";
const CHAPTER_SLUG = "ch-4-fractions";
const CHAPTER_NAME = "Fractions";
const LEVEL = 1;

const CLUSTER_NAMES = {
  TYPES: "Types & Conversions",
  EQUIV: "Equivalent Fractions & Simplifying",
  COMP: "Comparing & Ordering",
  ADDSUB: "Addition & Subtraction (Like Denominators)",
  MUL: "Multiplying Fractions by Whole Numbers",
  DIV: "Dividing Fractions by Whole Numbers"
};

const warmupItems = [
  {
    itemId: "w1", order: 1, cluster: "TYPES", clusterName: CLUSTER_NAMES.TYPES,
    question: "Convert \\( 2\\frac{3}{5} \\) to an improper fraction.",
    options: [
        { text: "\\( \\frac{13}{5} \\)", correct: true, feedback: "2×5=10; 10+3=13 → 13/5." },
        { text: "\\( \\frac{10}{5} \\)", correct: false, feedback: "You only multiplied 2×5, forgot to add the numerator 3." },
        { text: "\\( \\frac{6}{5} \\)", correct: false, feedback: "Incorrect addition." },
        { text: "\\( \\frac{5}{13} \\)", correct: false, feedback: "You flipped the fraction." }
      ],
    retryHint: "Multiply the whole number by the denominator, then add the numerator. Write that sum over the denominator."
  },
  {
    itemId: "w2", order: 2, cluster: "EQUIV", clusterName: CLUSTER_NAMES.EQUIV,
    question: "Simplify \\( \\frac{6}{8} \\) to its lowest terms.",
    options: [
        { text: "\\( \\frac{3}{4} \\)", correct: true, feedback: "Divide numerator and denominator by 2: 6÷2=3, 8÷2=4 → 3/4." },
        { text: "\\( \\frac{2}{4} \\)", correct: false, feedback: "You only divided the numerator by 3? Not correct." },
        { text: "\\( \\frac{6}{4} \\)", correct: false, feedback: "You made the fraction improper; did you subtract?" },
        { text: "\\( \\frac{12}{16} \\)", correct: false, feedback: "That's an equivalent fraction, but not simplified." }
      ],
    retryHint: "Find the largest number that divides both 6 and 8 exactly, then divide both by it."
  },
  {
    itemId: "w3", order: 3, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    question: "Which is larger? \\( \\frac{2}{5} \\) or \\( \\frac{3}{5} \\)?",
    options: [
        { text: "\\( \\frac{3}{5} \\)", correct: true, feedback: "Same denominator; 3 > 2, so 3/5 is larger." },
        { text: "\\( \\frac{2}{5} \\)", correct: false, feedback: "2 is smaller than 3." },
        { text: "They are equal", correct: false, feedback: "The numerators are different." },
        { text: "Cannot compare", correct: false, feedback: "They have the same denominator, so they can be compared easily." }
      ],
    retryHint: "When denominators are the same, just compare the numerators."
  },
  {
    itemId: "w4", order: 4, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    question: "Add: \\( \\frac{1}{7} + \\frac{3}{7} \\)",
    options: [
        { text: "\\( \\frac{4}{7} \\)", correct: true, feedback: "Add numerators: 1+3=4; keep denominator 7 → 4/7." },
        { text: "\\( \\frac{4}{14} \\)", correct: false, feedback: "You added the denominators too — never add denominators." },
        { text: "\\( \\frac{3}{7} \\)", correct: false, feedback: "You forgot to add the first numerator." },
        { text: "\\( \\frac{1}{7} \\)", correct: false, feedback: "No operation performed." }
      ],
    retryHint: "Keep the denominator the same; only add the numerators."
  },
  {
    itemId: "w5", order: 5, cluster: "MUL", clusterName: CLUSTER_NAMES.MUL,
    question: "\\( \\frac{3}{4} \\times 2 \\) = ?",
    options: [
        { text: "\\( \\frac{3}{2} \\) (or 1½)", correct: true, feedback: "3/4 × 2 = (3×2)/4 = 6/4 = 3/2." },
        { text: "\\( \\frac{3}{8} \\)", correct: false, feedback: "You multiplied the denominator instead of the numerator." },
        { text: "\\( \\frac{6}{8} \\)", correct: false, feedback: "Correct product but not simplified." },
        { text: "\\( \\frac{4}{6} \\)", correct: false, feedback: "You flipped the fraction." }
      ],
    retryHint: "Multiply the numerator by the whole number; keep the denominator. Then simplify."
  },
  {
    itemId: "w6", order: 6, cluster: "DIV", clusterName: CLUSTER_NAMES.DIV,
    question: "\\( \\frac{2}{5} \\div 2 \\) = ? (simplest form)",
    options: [
        { text: "\\( \\frac{1}{5} \\)", correct: true, feedback: "2/5 ÷ 2 = (2÷2)/5 = 1/5." },
        { text: "\\( \\frac{2}{10} \\)", correct: false, feedback: "You multiplied the denominator by 2 but didn't simplify." },
        { text: "\\( \\frac{4}{5} \\)", correct: false, feedback: "You multiplied instead of divided." },
        { text: "\\( \\frac{5}{2} \\)", correct: false, feedback: "You took the reciprocal incorrectly." }
      ],
    retryHint: "If the numerator is divisible by the whole number, just divide it. Otherwise, multiply by the reciprocal."
  },
  {
    itemId: "w7", order: 7, cluster: "TYPES", clusterName: CLUSTER_NAMES.TYPES,
    question: "Which of these is a proper fraction?",
    options: [
        { text: "\\( \\frac{1}{4} \\)", correct: true, feedback: "Proper fraction: numerator (1) < denominator (4)." },
        { text: "\\( \\frac{3}{2} \\)", correct: false, feedback: "Improper: 3 > 2." },
        { text: "\\( \\frac{5}{3} \\)", correct: false, feedback: "Improper." },
        { text: "\\( \\frac{7}{5} \\)", correct: false, feedback: "Improper." }
      ],
    retryHint: "In a proper fraction, the numerator is smaller than the denominator."
  },
  {
    itemId: "w8", order: 8, cluster: "EQUIV", clusterName: CLUSTER_NAMES.EQUIV,
    question: "Fill in the blank: \\( \\frac{2}{3} = \\frac{?}{9} \\)",
    options: [
        { text: "6", correct: true, feedback: "To get from 3 to 9, multiply by 3. Do the same to the numerator: 2×3 = 6." },
        { text: "3", correct: false, feedback: "You might have added 1? The multiplier is 3." },
        { text: "9", correct: false, feedback: "You just copied the denominator." },
        { text: "12", correct: false, feedback: "You multiplied by 4 instead of 3." }
      ],
    retryHint: "What do you multiply the denominator 3 by to get 9? Multiply the numerator by that same number."
  }
];

const diagnosticItems = [
  {
    itemId: "d1", order: 1, cluster: "TYPES", clusterName: CLUSTER_NAMES.TYPES,
    question: "Write \\( \\frac{11}{4} \\) as a mixed number.",
    options: [
        { text: "\\( 2\\frac{3}{4} \\)", correct: true, feedback: "11 ÷ 4 = 2 remainder 3 → 2 3/4." },
        { text: "\\( 2\\frac{1}{4} \\)", correct: false, feedback: "The remainder is 3, not 1." },
        { text: "\\( 3\\frac{1}{4} \\)", correct: false, feedback: "11 ÷ 4 = 2, not 3." },
        { text: "\\( 1\\frac{3}{4} \\)", correct: false, feedback: "Whole number part is too small." }
      ],
    backward: "Divide the numerator by the denominator: quotient is the whole number, remainder is the numerator.",
    forward: "Mixed numbers make it easier to visualise quantities."
  },
  {
    itemId: "d2", order: 2, cluster: "EQUIV", clusterName: CLUSTER_NAMES.EQUIV,
    question: "Find the missing numerator: \\( \\frac{3}{5} = \\frac{?}{20} \\)",
    options: [
        { text: "12", correct: true, feedback: "5×4=20, so 3×4=12." },
        { text: "15", correct: false, feedback: "You added 12 to the numerator? 3+12=15, not correct." },
        { text: "10", correct: false, feedback: "5×2=10, but that would give denominator 10, not 20." },
        { text: "6", correct: false, feedback: "3×2=6, but that's for denominator 10." }
      ],
    backward: "Multiply numerator and denominator by the same number (here, 4).",
    forward: "Equivalent fractions are the basis for adding and subtracting unlike fractions."
  },
  {
    itemId: "d3", order: 3, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    question: "Which is greater? \\( \\frac{7}{12} \\) or \\( \\frac{5}{12} \\)",
    options: [
        { text: "\\( \\frac{7}{12} \\)", correct: true, feedback: "Same denominator; 7 > 5." },
        { text: "\\( \\frac{5}{12} \\)", correct: false, feedback: "5 is smaller than 7." },
        { text: "They are equal", correct: false, feedback: "Numerators differ." },
        { text: "Cannot compare", correct: false, feedback: "Same denominator, easy to compare." }
      ],
    backward: "Same denominator → compare numerators.",
    forward: "Comparing fractions is essential for ordering data."
  },
  {
    itemId: "d4", order: 4, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    question: "\\( \\frac{1}{5} + \\frac{2}{5} \\) = ?",
    options: [
        { text: "\\( \\frac{3}{5} \\)", correct: true, feedback: "1+2=3; keep denominator 5." },
        { text: "\\( \\frac{3}{10} \\)", correct: false, feedback: "You added denominators (5+5=10). Don't add denominators." },
        { text: "\\( \\frac{2}{5} \\)", correct: false, feedback: "You forgot the first fraction." },
        { text: "\\( \\frac{1}{5} \\)", correct: false, feedback: "No operation." }
      ],
    backward: "Add numerators, keep denominator.",
    forward: "Adding fractions is used in recipes, measurements, and time."
  },
  {
    itemId: "d5", order: 5, cluster: "MUL", clusterName: CLUSTER_NAMES.MUL,
    question: "\\( 4 \\times \\frac{1}{3} \\) = ?",
    options: [
        { text: "\\( \\frac{4}{3} \\)", correct: true, feedback: "4 × 1/3 = (4×1)/3 = 4/3." },
        { text: "\\( \\frac{1}{12} \\)", correct: false, feedback: "You multiplied denominators: 3×4=12, but numerator should be 4×1." },
        { text: "\\( \\frac{4}{12} \\)", correct: false, feedback: "You multiplied both numerator and denominator by 4." },
        { text: "\\( \\frac{3}{4} \\)", correct: false, feedback: "You flipped the fraction." }
      ],
    backward: "Multiply the numerator by the whole number, keep the denominator.",
    forward: "Used to find a fraction of a group."
  },
  {
    itemId: "d6", order: 6, cluster: "DIV", clusterName: CLUSTER_NAMES.DIV,
    question: "\\( \\frac{2}{3} \\div 2 \\) = ? (simplest form)",
    options: [
        { text: "\\( \\frac{1}{3} \\)", correct: true, feedback: "2/3 × 1/2 = 2/6 = 1/3." },
        { text: "\\( \\frac{4}{3} \\)", correct: false, feedback: "You multiplied instead of dividing." },
        { text: "\\( \\frac{1}{6} \\)", correct: false, feedback: "2/3 ÷ 2 = 2/3 × 1/2 = 2/6 = 1/3, not this." },
        { text: "\\( \\frac{3}{2} \\)", correct: false, feedback: "You took the reciprocal of the fraction." }
      ],
    backward: "Dividing by a whole number is multiplying by its reciprocal.",
    forward: "Sharing fractions equally is a common real-world problem."
  },
  {
    itemId: "d7", order: 7, cluster: "TYPES", clusterName: CLUSTER_NAMES.TYPES,
    question: "Which of these is an improper fraction? \\( \\frac{3}{8}, \\frac{7}{4}, \\frac{1}{2}, \\frac{5}{6} \\)",
    options: [
        { text: "\\( \\frac{7}{4} \\)", correct: true, feedback: "7 > 4, so it's improper." },
        { text: "\\( \\frac{3}{8} \\)", correct: false, feedback: "3 < 8, proper." },
        { text: "\\( \\frac{1}{2} \\)", correct: false, feedback: "1 < 2, proper." },
        { text: "\\( \\frac{5}{6} \\)", correct: false, feedback: "5 < 6, proper." }
      ],
    backward: "Improper fractions have numerator ≥ denominator.",
    forward: "They can be converted to mixed numbers for clarity."
  },
  {
    itemId: "d8", order: 8, cluster: "EQUIV", clusterName: CLUSTER_NAMES.EQUIV,
    question: "Write \\( \\frac{8}{12} \\) in simplest form.",
    options: [
        { text: "\\( \\frac{2}{3} \\)", correct: true, feedback: "Divide numerator and denominator by 4 (HCF)." },
        { text: "\\( \\frac{4}{6} \\)", correct: false, feedback: "Not fully simplified; divide by 2 again." },
        { text: "\\( \\frac{8}{12} \\)", correct: false, feedback: "That's the original." },
        { text: "\\( \\frac{3}{4} \\)", correct: false, feedback: "Incorrect simplification." }
      ],
    backward: "Divide numerator and denominator by their HCF (4).",
    forward: "Simplified fractions are easier to compare and operate with."
  },
  {
    itemId: "d9", order: 9, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    question: "Which is smaller? \\( \\frac{1}{4} \\) or \\( \\frac{1}{3} \\)",
    options: [
        { text: "\\( \\frac{1}{4} \\)", correct: true, feedback: "Larger denominator means smaller pieces; 1/4 < 1/3." },
        { text: "\\( \\frac{1}{3} \\)", correct: false, feedback: "1/3 is larger." },
        { text: "They are equal", correct: false, feedback: "Different denominators." },
        { text: "Cannot compare", correct: false, feedback: "Unit fractions can be compared by denominators." }
      ],
    backward: "When numerators are the same, the fraction with the larger denominator is smaller.",
    forward: "Unit fraction comparison builds number sense."
  },
  {
    itemId: "d10", order: 10, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    question: "\\( \\frac{5}{8} - \\frac{3}{8} \\) = ? (simplest form)",
    options: [
        { text: "\\( \\frac{1}{4} \\)", correct: true, feedback: "5-3=2; 2/8 simplifies to 1/4." },
        { text: "\\( \\frac{2}{8} \\)", correct: false, feedback: "Not simplified." },
        { text: "\\( \\frac{1}{2} \\)", correct: false, feedback: "Incorrect simplification." },
        { text: "\\( \\frac{3}{8} \\)", correct: false, feedback: "No operation." }
      ],
    backward: "Subtract numerators, keep denominator, then simplify.",
    forward: "Subtraction appears in many measurement problems."
  },
  {
    itemId: "d11", order: 11, cluster: "MUL", clusterName: CLUSTER_NAMES.MUL,
    question: "What is \\( \\frac{1}{5} \\) of 20?",
    options: [
        { text: "4", correct: true, feedback: "20 ÷ 5 = 4." },
        { text: "5", correct: false, feedback: "You might have read it as 1/4 of 20." },
        { text: "\\( \\frac{1}{5} \\)", correct: false, feedback: "That's the fraction, not the answer." },
        { text: "100", correct: false, feedback: "You multiplied 20×5." }
      ],
    backward: "Divide by the denominator and multiply by the numerator.",
    forward: "Finding a fraction of an amount is used in discounts and sharing."
  },
  {
    itemId: "d12", order: 12, cluster: "DIV", clusterName: CLUSTER_NAMES.DIV,
    question: "\\( \\frac{3}{4} \\div 3 \\) = ? (simplest form)",
    options: [
        { text: "\\( \\frac{1}{4} \\)", correct: true, feedback: "3/4 × 1/3 = 3/12 = 1/4." },
        { text: "\\( \\frac{9}{4} \\)", correct: false, feedback: "You multiplied by 3 instead of dividing." },
        { text: "\\( \\frac{3}{12} \\)", correct: false, feedback: "Not simplified." },
        { text: "\\( \\frac{4}{3} \\)", correct: false, feedback: "You took the reciprocal incorrectly." }
      ],
    backward: "Multiply by reciprocal: 1/3.",
    forward: "Cutting a fraction into equal parts is common in crafts."
  },
  {
    itemId: "d13", order: 13, cluster: "TYPES", clusterName: CLUSTER_NAMES.TYPES,
    question: "Convert \\( 1\\frac{2}{5} \\) to an improper fraction.",
    options: [
        { text: "\\( \\frac{7}{5} \\)", correct: true, feedback: "(1×5)+2 = 7 → 7/5." },
        { text: "\\( \\frac{5}{5} \\)", correct: false, feedback: "Only the whole part converted." },
        { text: "\\( \\frac{3}{5} \\)", correct: false, feedback: "Added incorrectly: 1+2=3." },
        { text: "\\( \\frac{1}{5} \\)", correct: false, feedback: "No operation." }
      ],
    backward: "Multiply whole by denominator, add numerator, place over denominator.",
    forward: "Improper fractions are easier to multiply and divide."
  },
  {
    itemId: "d14", order: 14, cluster: "EQUIV", clusterName: CLUSTER_NAMES.EQUIV,
    question: "Which fraction is equivalent to \\( \\frac{1}{2} \\)? \\( \\frac{2}{3}, \\frac{3}{6}, \\frac{4}{6}, \\frac{1}{3} \\)",
    options: [
        { text: "\\( \\frac{3}{6} \\)", correct: true, feedback: "1/2 × 3/3 = 3/6." },
        { text: "\\( \\frac{2}{3} \\)", correct: false, feedback: "Not equal to 1/2." },
        { text: "\\( \\frac{4}{6} \\)", correct: false, feedback: "Equivalent to 2/3, not 1/2." },
        { text: "\\( \\frac{1}{3} \\)", correct: false, feedback: "Smaller than 1/2." }
      ],
    backward: "Multiply numerator and denominator of 1/2 by 3.",
    forward: "Quick recognition of equivalents speeds up comparison."
  },
  {
    itemId: "d15", order: 15, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    question: "Arrange in ascending order: \\( \\frac{5}{9}, \\frac{2}{9}, \\frac{7}{9} \\)",
    options: [
        { text: "\\( \\frac{2}{9}, \\frac{5}{9}, \\frac{7}{9} \\)", correct: true, feedback: "Same denominator; order numerators 2,5,7." },
        { text: "\\( \\frac{7}{9}, \\frac{5}{9}, \\frac{2}{9} \\)", correct: false, feedback: "Descending order." },
        { text: "\\( \\frac{5}{9}, \\frac{2}{9}, \\frac{7}{9} \\)", correct: false, feedback: "Not ordered." },
        { text: "\\( \\frac{2}{9}, \\frac{7}{9}, \\frac{5}{9} \\)", correct: false, feedback: "Incorrect order." }
      ],
    backward: "Ascending = smallest to largest; compare numerators.",
    forward: "Ordering fractions is key in ranking and data."
  },
  {
    itemId: "d16", order: 16, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    question: "\\( \\frac{3}{10} + \\frac{1}{10} \\) = ? (simplest form)",
    options: [
        { text: "\\( \\frac{2}{5} \\)", correct: true, feedback: "3+1=4; 4/10 = 2/5." },
        { text: "\\( \\frac{4}{10} \\)", correct: false, feedback: "Not simplified." },
        { text: "\\( \\frac{3}{10} \\)", correct: false, feedback: "Forgot the second fraction." },
        { text: "\\( \\frac{1}{5} \\)", correct: false, feedback: "Incorrect simplification." }
      ],
    backward: "Add numerators, keep denominator, simplify.",
    forward: "Always simplify answers as good mathematical practice."
  },
  {
    itemId: "d17", order: 17, cluster: "MUL", clusterName: CLUSTER_NAMES.MUL,
    question: "A recipe uses \\( \\frac{2}{3} \\) cup flour. How much flour for 3 recipes?",
    options: [
        { text: "2 cups", correct: true, feedback: "2/3 × 3 = 6/3 = 2." },
        { text: "\\( \\frac{6}{3} \\) cup", correct: false, feedback: "Correct but not simplified to a whole number." },
        { text: "1 cup", correct: false, feedback: "Half the amount." },
        { text: "\\( \\frac{2}{9} \\) cup", correct: false, feedback: "You divided instead of multiplied." }
      ],
    backward: "Multiply the fraction by the whole number; simplify.",
    forward: "Scaling recipes is a daily use of fraction multiplication."
  },
  {
    itemId: "d18", order: 18, cluster: "DIV", clusterName: CLUSTER_NAMES.DIV,
    question: "\\( \\frac{5}{6} \\div 5 \\) = ? (simplest form)",
    options: [
        { text: "\\( \\frac{1}{6} \\)", correct: true, feedback: "5/6 × 1/5 = 5/30 = 1/6." },
        { text: "\\( \\frac{5}{30} \\)", correct: false, feedback: "Not simplified." },
        { text: "\\( \\frac{1}{5} \\)", correct: false, feedback: "Incorrect." },
        { text: "\\( \\frac{25}{6} \\)", correct: false, feedback: "Multiplied by 5." }
      ],
    backward: "Multiply by reciprocal 1/5, then simplify.",
    forward: "Division of fractions is used when splitting items equally."
  },
  {
    itemId: "d19", order: 19, cluster: "TYPES", clusterName: CLUSTER_NAMES.TYPES,
    question: "Which mixed number equals \\( \\frac{9}{4} \\)?",
    options: [
        { text: "\\( 2\\frac{1}{4} \\)", correct: true, feedback: "9÷4=2 remainder 1 → 2 1/4." },
        { text: "\\( 1\\frac{5}{4} \\)", correct: false, feedback: "The fractional part is improper." },
        { text: "\\( 2\\frac{3}{4} \\)", correct: false, feedback: "That's 11/4." },
        { text: "\\( 1\\frac{1}{4} \\)", correct: false, feedback: "That's 5/4." }
      ],
    backward: "9 ÷ 4 = 2 R 1 → 2 1/4.",
    forward: "Converting between forms helps in estimation."
  },
  {
    itemId: "d20", order: 20, cluster: "EQUIV", clusterName: CLUSTER_NAMES.EQUIV,
    question: "Which fraction is NOT equivalent to \\( \\frac{2}{3} \\)? \\( \\frac{4}{6}, \\frac{6}{9}, \\frac{10}{15}, \\frac{3}{5} \\)",
    options: [
        { text: "\\( \\frac{3}{5} \\)", correct: true, feedback: "2/3 = 0.666, 3/5 = 0.6. Cross-multiplication: 2×5=10, 3×3=9, not equal." },
        { text: "\\( \\frac{4}{6} \\)", correct: false, feedback: "4/6 simplifies to 2/3." },
        { text: "\\( \\frac{6}{9} \\)", correct: false, feedback: "6/9 simplifies to 2/3." },
        { text: "\\( \\frac{10}{15} \\)", correct: false, feedback: "10/15 simplifies to 2/3." }
      ],
    backward: "Check if cross-multiplication gives equal products.",
    forward: "Avoiding common mistakes in equivalence is important for accuracy."
  },
  {
    itemId: "d21", order: 21, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    question: "Which is larger? \\( \\frac{3}{4} \\) or \\( \\frac{5}{8} \\)",
    options: [
        { text: "\\( \\frac{3}{4} \\)", correct: true, feedback: "3/4 = 6/8; 6/8 > 5/8." },
        { text: "\\( \\frac{5}{8} \\)", correct: false, feedback: "5/8 is smaller." },
        { text: "They are equal", correct: false, feedback: "Different values." },
        { text: "Cannot compare", correct: false, feedback: "Make denominators the same: 3/4 = 6/8." }
      ],
    backward: "Convert 3/4 to 6/8; compare with 5/8.",
    forward: "Comparing with different denominators is needed for ordering most fractions."
  },
  {
    itemId: "d22", order: 22, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    question: "\\( \\frac{1}{8} + \\frac{3}{8} + \\frac{2}{8} \\) = ? (simplest form)",
    options: [
        { text: "\\( \\frac{3}{4} \\)", correct: true, feedback: "Sum numerators = 6; 6/8 = 3/4." },
        { text: "\\( \\frac{6}{8} \\)", correct: false, feedback: "Not simplified." },
        { text: "\\( \\frac{5}{8} \\)", correct: false, feedback: "Incorrect sum." },
        { text: "\\( \\frac{1}{2} \\)", correct: false, feedback: "4/8 would be 1/2, but sum is 6/8." }
      ],
    backward: "Add all numerators, keep denominator, simplify.",
    forward: "Adding multiple fractions is common in probability."
  },
  {
    itemId: "d23", order: 23, cluster: "MUL", clusterName: CLUSTER_NAMES.MUL,
    question: "\\( \\frac{2}{5} \\times 5 \\) = ?",
    options: [
        { text: "2", correct: true, feedback: "(2×5)/5 = 10/5 = 2." },
        { text: "\\( \\frac{10}{5} \\)", correct: false, feedback: "Not simplified." },
        { text: "\\( \\frac{2}{25} \\)", correct: false, feedback: "You multiplied denominator by 5." },
        { text: "\\( \\frac{5}{2} \\)", correct: false, feedback: "Reciprocal." }
      ],
    backward: "Multiplying a fraction by its denominator gives the numerator.",
    forward: "This shows the relationship between fractions and whole numbers."
  },
  {
    itemId: "d24", order: 24, cluster: "DIV", clusterName: CLUSTER_NAMES.DIV,
    question: "A ribbon of length \\( \\frac{3}{4} \\) m is cut into 3 equal pieces. How long is each piece?",
    options: [
        { text: "\\( \\frac{1}{4} \\) m", correct: true, feedback: "3/4 ÷ 3 = 3/4 × 1/3 = 3/12 = 1/4." },
        { text: "\\( \\frac{1}{3} \\) m", correct: false, feedback: "Incorrect." },
        { text: "\\( \\frac{3}{7} \\) m", correct: false, feedback: "You added denominators? No." },
        { text: "\\( \\frac{9}{4} \\) m", correct: false, feedback: "You multiplied." }
      ],
    backward: "Divide the length by the number of pieces.",
    forward: "Practical problems involving cutting materials use fraction division."
  }
];

const recheckItems = [
  {
    itemId: "r1", order: 1, cluster: "TYPES", clusterName: CLUSTER_NAMES.TYPES,
    question: "Convert \\( \\frac{17}{5} \\) to a mixed number.",
    options: [
        { text: "\\( 3\\frac{2}{5} \\)", correct: true, feedback: "17 ÷ 5 = 3 R 2 → 3 2/5." },
        { text: "\\( 2\\frac{3}{5} \\)", correct: false, feedback: "Swapped." },
        { text: "\\( 3\\frac{1}{5} \\)", correct: false, feedback: "Wrong remainder." },
        { text: "\\( 4\\frac{2}{5} \\)", correct: false, feedback: "Quotient too large." }
      ]
  },
  {
    itemId: "r2", order: 2, cluster: "TYPES", clusterName: CLUSTER_NAMES.TYPES,
    question: "Which is an improper fraction? \\( \\frac{4}{9}, \\frac{11}{6}, \\frac{2}{3}, \\frac{5}{8} \\)",
    options: [
        { text: "\\( \\frac{11}{6} \\)", correct: true, feedback: "11 > 6." },
        { text: "\\( \\frac{4}{9} \\)", correct: false, feedback: "4 < 9, proper." },
        { text: "\\( \\frac{2}{3} \\)", correct: false, feedback: "2 < 3, proper." },
        { text: "\\( \\frac{5}{8} \\)", correct: false, feedback: "5 < 8, proper." }
      ]
  },
  {
    itemId: "r3", order: 3, cluster: "EQUIV", clusterName: CLUSTER_NAMES.EQUIV,
    question: "Simplify \\( \\frac{12}{18} \\).",
    options: [
        { text: "\\( \\frac{2}{3} \\)", correct: true, feedback: "Divide by 6." },
        { text: "\\( \\frac{4}{6} \\)", correct: false, feedback: "Not fully simplified." },
        { text: "\\( \\frac{6}{9} \\)", correct: false, feedback: "Not fully simplified." },
        { text: "\\( \\frac{3}{4} \\)", correct: false, feedback: "Incorrect simplification." }
      ]
  },
  {
    itemId: "r4", order: 4, cluster: "EQUIV", clusterName: CLUSTER_NAMES.EQUIV,
    question: "Find the missing number: \\( \\frac{4}{7} = \\frac{?}{28} \\)",
    options: [
        { text: "16", correct: true, feedback: "7×4=28, 4×4=16." },
        { text: "12", correct: false, feedback: "Incorrect multiplier." },
        { text: "21", correct: false, feedback: "Incorrect." },
        { text: "7", correct: false, feedback: "You copied the numerator." }
      ]
  },
  {
    itemId: "r5", order: 5, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    question: "Which is smaller? \\( \\frac{3}{8} \\) or \\( \\frac{5}{8} \\)",
    options: [
        { text: "\\( \\frac{3}{8} \\)", correct: true, feedback: "3 < 5." },
        { text: "\\( \\frac{5}{8} \\)", correct: false, feedback: "5/8 is larger." },
        { text: "Equal", correct: false, feedback: "Numerators differ." },
        { text: "Cannot compare", correct: false, feedback: "Same denominator, easy to compare." }
      ]
  },
  {
    itemId: "r6", order: 6, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    question: "Arrange in descending order: \\( \\frac{2}{7}, \\frac{5}{7}, \\frac{1}{7} \\)",
    options: [
        { text: "\\( \\frac{5}{7}, \\frac{2}{7}, \\frac{1}{7} \\)", correct: true, feedback: "Largest to smallest numerators." },
        { text: "\\( \\frac{1}{7}, \\frac{2}{7}, \\frac{5}{7} \\)", correct: false, feedback: "Ascending." },
        { text: "\\( \\frac{2}{7}, \\frac{5}{7}, \\frac{1}{7} \\)", correct: false, feedback: "Not ordered." },
        { text: "\\( \\frac{5}{7}, \\frac{1}{7}, \\frac{2}{7} \\)", correct: false, feedback: "Not ordered." }
      ]
  },
  {
    itemId: "r7", order: 7, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    question: "\\( \\frac{4}{11} + \\frac{5}{11} \\) = ? (simplest form)",
    options: [
        { text: "\\( \\frac{9}{11} \\)", correct: true, feedback: "4+5=9; already in simplest form." },
        { text: "\\( \\frac{9}{22} \\)", correct: false, feedback: "You added denominators." },
        { text: "\\( \\frac{4}{11} \\)", correct: false, feedback: "Forgot to add the second fraction." },
        { text: "\\( \\frac{5}{11} \\)", correct: false, feedback: "Forgot to add the first fraction." }
      ]
  },
  {
    itemId: "r8", order: 8, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    question: "\\( \\frac{7}{10} - \\frac{3}{10} \\) = ? (simplest form)",
    options: [
        { text: "\\( \\frac{2}{5} \\)", correct: true, feedback: "4/10 = 2/5." },
        { text: "\\( \\frac{4}{10} \\)", correct: false, feedback: "Not simplified." },
        { text: "\\( \\frac{1}{5} \\)", correct: false, feedback: "Incorrect subtraction." },
        { text: "\\( \\frac{3}{10} \\)", correct: false, feedback: "No operation." }
      ]
  },
  {
    itemId: "r9", order: 9, cluster: "MUL", clusterName: CLUSTER_NAMES.MUL,
    question: "\\( 3 \\times \\frac{2}{9} \\) = ? (simplest form)",
    options: [
        { text: "\\( \\frac{2}{3} \\)", correct: true, feedback: "6/9 = 2/3." },
        { text: "\\( \\frac{6}{9} \\)", correct: false, feedback: "Not simplified." },
        { text: "\\( \\frac{2}{9} \\)", correct: false, feedback: "No operation." },
        { text: "\\( \\frac{1}{3} \\)", correct: false, feedback: "Incorrect." }
      ]
  },
  {
    itemId: "r10", order: 10, cluster: "MUL", clusterName: CLUSTER_NAMES.MUL,
    question: "What is \\( \\frac{1}{6} \\) of 30?",
    options: [
        { text: "5", correct: true, feedback: "30 ÷ 6 = 5." },
        { text: "6", correct: false, feedback: "You copied the denominator." },
        { text: "\\( \\frac{1}{5} \\)", correct: false, feedback: "That's a fraction, not the answer." },
        { text: "180", correct: false, feedback: "You multiplied instead of divided." }
      ]
  },
  {
    itemId: "r11", order: 11, cluster: "DIV", clusterName: CLUSTER_NAMES.DIV,
    question: "\\( \\frac{5}{8} \\div 5 \\) = ? (simplest form)",
    options: [
        { text: "\\( \\frac{1}{8} \\)", correct: true, feedback: "5/8 × 1/5 = 5/40 = 1/8." },
        { text: "\\( \\frac{5}{40} \\)", correct: false, feedback: "Not simplified." },
        { text: "\\( \\frac{1}{5} \\)", correct: false, feedback: "Incorrect." },
        { text: "\\( \\frac{25}{8} \\)", correct: false, feedback: "You multiplied by 5." }
      ]
  },
  {
    itemId: "r12", order: 12, cluster: "DIV", clusterName: CLUSTER_NAMES.DIV,
    question: "A ribbon \\( \\frac{3}{5} \\) m long is cut into 3 equal pieces. How long is each piece?",
    options: [
        { text: "\\( \\frac{1}{5} \\) m", correct: true, feedback: "3/5 ÷ 3 = 3/5 × 1/3 = 3/15 = 1/5." },
        { text: "\\( \\frac{3}{15} \\) m", correct: false, feedback: "Not simplified." },
        { text: "\\( \\frac{3}{8} \\) m", correct: false, feedback: "Incorrect." },
        { text: "\\( \\frac{5}{3} \\) m", correct: false, feedback: "Reciprocal." }
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
    title: "Fractions — Core Fluency",
    subtitle: "Telangana & Cambridge · Level 1 · Core Fluency",
    description: "Types of fractions, equivalent fractions, simplifying, comparing, and addition/subtraction/multiplication/division with like denominators and whole numbers.",
    clusterNames: CLUSTER_NAMES,
    gateReviewHTML: '<strong>Quick Review</strong><br>' +
      "&bull; Proper fraction: numerator &lt; denominator. Improper: numerator &ge; denominator.<br>" +
      "&bull; Mixed &rarr; improper: whole &times; denominator + numerator, over the denominator.<br>" +
      "&bull; Simplify: divide numerator and denominator by their highest common factor (HCF).<br>" +
      "&bull; Equivalent fractions: multiply or divide numerator and denominator by the same number.<br>" +
      "&bull; Compare: same denominator &rarr; compare numerators; unit fractions &rarr; larger denominator = smaller fraction.<br>" +
      "&bull; Add/subtract like fractions: add/subtract numerators, keep the denominator, simplify.<br>" +
      "&bull; Multiply by whole number: multiply the numerator, keep the denominator, simplify.<br>" +
      "&bull; Divide by whole number: multiply by the reciprocal (or split the numerator if possible).<br>",
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

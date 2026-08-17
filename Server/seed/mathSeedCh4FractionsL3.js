// seed/mathSeedCh4FractionsL3.js
//
// Populates math_chapters and math_questions with Grade 5, Chapter 4
// (Fractions), Level 3 — converted from the standalone HTML file
// ch-4-fractions-level-3.html.
//
// Run with: node seed/mathSeedCh4FractionsL3.js

const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-5";
const GRADE_LABEL = "Grade 5";
const CHAPTER_SLUG = "ch-4-fractions";
const CHAPTER_NAME = "Fractions";
const LEVEL = 3;

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
    question: "A number is added to \\(2\\frac{1}{4}\\) to get \\(3\\frac{1}{2}\\). Find the number.",
    options: [
        { text: "\\(1\\frac{1}{4}\\)", correct: true, feedback: "3 1/2 - 2 1/4 = 7/2 - 9/4 = 14/4 - 9/4 = 5/4 = 1 1/4." },
        { text: "\\(5\\frac{3}{4}\\)", correct: false, feedback: "You added the numbers instead of subtracting." },
        { text: "\\(1\\frac{1}{2}\\)", correct: false, feedback: "Incorrect subtraction; check the conversion." },
        { text: "\\(\\frac{3}{4}\\)", correct: false, feedback: "You forgot the whole number part." }
      ],
    retryHint: "To find the missing addend, subtract the known number from the total. Convert to improper fractions first."
  },
  {
    itemId: "w2", order: 2, cluster: "EQUIV", clusterName: CLUSTER_NAMES.EQUIV,
    question: "Simplify \\(\\frac{36}{48}\\) and then find the sum of the numerator and denominator of the simplified fraction.",
    options: [
        { text: "7", correct: true, feedback: "36/48 = 3/4 (÷12). 3 + 4 = 7." },
        { text: "12", correct: false, feedback: "You multiplied 3×4 instead of adding." },
        { text: "84", correct: false, feedback: "You added the original numerator and denominator." },
        { text: "5", correct: false, feedback: "Incorrect simplification." }
      ],
    retryHint: "Divide numerator and denominator by their HCF (12). Then add the resulting numerator and denominator."
  },
  {
    itemId: "w3", order: 3, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    question: "Which is larger? \\(\\frac{5}{6}\\) or \\(\\frac{13}{15}\\)? Use a common denominator.",
    options: [
        { text: "\\(\\frac{13}{15}\\)", correct: true, feedback: "LCM 30: 5/6=25/30, 13/15=26/30. 13/15 is larger." },
        { text: "\\(\\frac{5}{6}\\)", correct: false, feedback: "5/6 = 25/30, smaller than 26/30." },
        { text: "They are equal", correct: false, feedback: "Different numerators after converting." },
        { text: "Cannot compare", correct: false, feedback: "They can be compared using LCM." }
      ],
    retryHint: "Find LCM of 6 and 15 (30). Convert both fractions to thirtieths and compare numerators."
  },
  {
    itemId: "w4", order: 4, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    question: "\\(3\\frac{1}{4} - 1\\frac{2}{3} + \\frac{1}{2}\\) = ? (mixed number)",
    options: [
        { text: "\\(2\\frac{1}{12}\\)", correct: true, feedback: "13/4 - 5/3 + 1/2 = 39/12 - 20/12 + 6/12 = 25/12 = 2 1/12." },
        { text: "\\(2\\frac{1}{3}\\)", correct: false, feedback: "Check the common denominator and subtraction." },
        { text: "\\(1\\frac{11}{12}\\)", correct: false, feedback: "Incorrect sum." },
        { text: "\\(2\\frac{5}{12}\\)", correct: false, feedback: "Off by a fraction." }
      ],
    retryHint: "Convert all to improper fractions, use common denominator 12, then add/subtract, and convert back."
  },
  {
    itemId: "w5", order: 5, cluster: "MUL", clusterName: CLUSTER_NAMES.MUL,
    question: "\\(\\frac{3}{4}\\) of a cake is left. You eat \\(\\frac{1}{2}\\) of what's left. How much of the whole cake do you eat?",
    options: [
        { text: "\\(\\frac{3}{8}\\)", correct: true, feedback: "1/2 of 3/4 = 3/8." },
        { text: "\\(\\frac{3}{4}\\)", correct: false, feedback: "That's the amount left before eating." },
        { text: "\\(\\frac{1}{2}\\)", correct: false, feedback: "That's the fraction of the leftover, not of the whole." },
        { text: "\\(\\frac{3}{2}\\)", correct: false, feedback: "Impossible — you can't eat more than the cake." }
      ],
    retryHint: "First find the fraction of the whole that is left (3/4), then take half of that."
  },
  {
    itemId: "w6", order: 6, cluster: "DIV", clusterName: CLUSTER_NAMES.DIV,
    question: "A ribbon \\(\\frac{5}{6}\\) m long is divided into pieces of \\(\\frac{1}{12}\\) m each. How many pieces?",
    options: [
        { text: "10", correct: true, feedback: "5/6 ÷ 1/12 = 5/6 × 12 = 60/6 = 10." },
        { text: "5", correct: false, feedback: "You might have multiplied incorrectly." },
        { text: "12", correct: false, feedback: "That's the denominator of the piece length." },
        { text: "60", correct: false, feedback: "You multiplied 5×12 but forgot to divide by 6." }
      ],
    retryHint: "Divide total length by piece length: multiply by the reciprocal of 1/12."
  },
  {
    itemId: "w7", order: 7, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    question: "\\(\\frac{2}{3} \\times \\frac{3}{4}\\) is how much less than \\(\\frac{3}{4}\\)?",
    options: [
        { text: "\\(\\frac{1}{4}\\)", correct: true, feedback: "2/3 × 3/4 = 1/2. 3/4 - 1/2 = 1/4." },
        { text: "\\(\\frac{1}{2}\\)", correct: false, feedback: "That's the product, not the difference." },
        { text: "\\(\\frac{3}{4}\\)", correct: false, feedback: "That's the original fraction." },
        { text: "\\(\\frac{1}{6}\\)", correct: false, feedback: "Incorrect subtraction." }
      ],
    retryHint: "First compute the product. Then subtract it from 3/4."
  },
  {
    itemId: "w8", order: 8, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    question: "\\( \\frac{1}{2} + \\frac{1}{3} \\times \\frac{3}{4} \\) = ? (Remember BODMAS)",
    options: [
        { text: "\\(\\frac{3}{4}\\)", correct: true, feedback: "1/3 × 3/4 = 1/4. 1/2 + 1/4 = 3/4." },
        { text: "\\(\\frac{5}{8}\\)", correct: false, feedback: "You added first: (1/2+1/3)=5/6, then × 3/4 = 5/8. Incorrect order." },
        { text: "\\(\\frac{7}{12}\\)", correct: false, feedback: "Incorrect calculation." },
        { text: "\\(\\frac{2}{3}\\)", correct: false, feedback: "Off." }
      ],
    retryHint: "Multiplication before addition. Compute 1/3 × 3/4 first, then add 1/2."
  }
];

const diagnosticItems = [
  {
    itemId: "d1", order: 1, cluster: "TYPES", clusterName: CLUSTER_NAMES.TYPES,
    question: "A mixed number is multiplied by 2, then \\(\\frac{3}{4}\\) is added. The result is \\(4\\frac{1}{4}\\). Find the original mixed number.",
    options: [
        { text: "\\(1\\frac{3}{4}\\)", correct: true, feedback: "Work backwards: 4 1/4 - 3/4 = 3 1/2. Then ÷2 = 7/2 ÷ 2 = 7/4 = 1 3/4." },
        { text: "\\(2\\frac{1}{4}\\)", correct: false, feedback: "You didn't subtract 3/4 first." },
        { text: "\\(3\\frac{1}{2}\\)", correct: false, feedback: "You stopped after subtracting 3/4." },
        { text: "\\(1\\frac{1}{2}\\)", correct: false, feedback: "Incorrect division by 2." }
      ],
    backward: "Work backwards: undo addition (subtract), then undo multiplication (divide).",
    forward: "Reverse operations build algebraic thinking."
  },
  {
    itemId: "d2", order: 2, cluster: "EQUIV", clusterName: CLUSTER_NAMES.EQUIV,
    question: "A fraction is equivalent to \\(\\frac{5}{8}\\). The sum of its numerator and denominator is 39. Find the fraction.",
    options: [
        { text: "\\(\\frac{15}{24}\\)", correct: true, feedback: "Let fraction = 5k/8k. Sum = 13k = 39 → k=3 → 15/24." },
        { text: "\\(\\frac{20}{19}\\)", correct: false, feedback: "Sum is 39, but numerator and denominator don't match 5:8 ratio." },
        { text: "\\(\\frac{10}{29}\\)", correct: false, feedback: "Sum 39, but not equivalent to 5/8." },
        { text: "\\(\\frac{25}{14}\\)", correct: false, feedback: "No." }
      ],
    backward: "If a fraction is equivalent to 5/8, it can be written as 5k/8k. Use the sum to find k.",
    forward: "This type of problem leads to solving equations with proportions."
  },
  {
    itemId: "d3", order: 3, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    question: "Arrange in ascending order: \\(2\\frac{1}{3}, \\frac{5}{2}, \\frac{9}{4}, 1\\frac{5}{6}\\).",
    options: [
        { text: "\\(1\\frac{5}{6}, \\frac{9}{4}, 2\\frac{1}{3}, \\frac{5}{2}\\)", correct: true, feedback: "Convert: 1 5/6≈1.833, 9/4=2.25, 2 1/3≈2.333, 5/2=2.5. Ascending: 1 5/6, 9/4, 2 1/3, 5/2." },
        { text: "\\(\\frac{5}{2}, 2\\frac{1}{3}, \\frac{9}{4}, 1\\frac{5}{6}\\)", correct: false, feedback: "Descending order." },
        { text: "\\(2\\frac{1}{3}, \\frac{5}{2}, \\frac{9}{4}, 1\\frac{5}{6}\\)", correct: false, feedback: "Mixed order." },
        { text: "\\(1\\frac{5}{6}, 2\\frac{1}{3}, \\frac{9}{4}, \\frac{5}{2}\\)", correct: false, feedback: "9/4=2.25 < 2 1/3=2.333." }
      ],
    backward: "Convert all to improper fractions or decimals for easy comparison.",
    forward: "Ordering mixed numbers and fractions is essential in data analysis."
  },
  {
    itemId: "d4", order: 4, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    question: "\\(\\frac{3}{5} + ? = 1\\frac{1}{10}\\). Find the missing fraction.",
    options: [
        { text: "\\(\\frac{1}{2}\\)", correct: true, feedback: "1 1/10 = 11/10, 3/5 = 6/10. ? = 11/10 - 6/10 = 5/10 = 1/2." },
        { text: "\\(\\frac{1}{5}\\)", correct: false, feedback: "That's too small." },
        { text: "\\(\\frac{4}{5}\\)", correct: false, feedback: "Too large." },
        { text: "\\(1\\frac{1}{2}\\)", correct: false, feedback: "Way too large." }
      ],
    backward: "Subtract the known fraction from the total.",
    forward: "Finding missing parts is the foundation of algebra."
  },
  {
    itemId: "d5", order: 5, cluster: "MUL", clusterName: CLUSTER_NAMES.MUL,
    question: "A tank is \\(\\frac{2}{3}\\) full. \\(\\frac{1}{4}\\) of the water is used. What fraction of the tank is now full?",
    options: [
        { text: "\\(\\frac{1}{2}\\)", correct: true, feedback: "Used: 1/4 × 2/3 = 2/12 = 1/6. Remaining: 2/3 - 1/6 = 4/6 - 1/6 = 3/6 = 1/2." },
        { text: "\\(\\frac{1}{6}\\)", correct: false, feedback: "That's the amount used, not remaining." },
        { text: "\\(\\frac{2}{3}\\)", correct: false, feedback: "That's the original amount." },
        { text: "\\(\\frac{5}{12}\\)", correct: false, feedback: "Incorrect subtraction." }
      ],
    backward: "Find the amount used (fraction of a fraction), then subtract from the original.",
    forward: "Fraction of a remainder problems are common in real life."
  },
  {
    itemId: "d6", order: 6, cluster: "DIV", clusterName: CLUSTER_NAMES.DIV,
    question: "How many \\(1\\frac{1}{4}\\) kg bags can be filled from 10 kg of rice?",
    options: [
        { text: "8", correct: true, feedback: "10 ÷ 1 1/4 = 10 ÷ 5/4 = 10 × 4/5 = 8." },
        { text: "12", correct: false, feedback: "You multiplied by 5/4 instead of its reciprocal." },
        { text: "10", correct: false, feedback: "No operation performed." },
        { text: "40", correct: false, feedback: "You multiplied 10 by 4." }
      ],
    backward: "Divide total weight by weight per bag; convert mixed number to improper first.",
    forward: "Division by mixed numbers appears in packaging and distribution."
  },
  {
    itemId: "d7", order: 7, cluster: "TYPES", clusterName: CLUSTER_NAMES.TYPES,
    question: "\\(\\frac{3}{5}\\) of a number is 18. Find the number.",
    options: [
        { text: "30", correct: true, feedback: "3/5 × N = 18 → N = 18 × 5/3 = 30." },
        { text: "10.8", correct: false, feedback: "You multiplied 18 × 3/5 instead of dividing." },
        { text: "18", correct: false, feedback: "No operation." },
        { text: "45", correct: false, feedback: "Incorrect multiplication." }
      ],
    backward: "Divide 18 by 3/5 (multiply by its reciprocal 5/3).",
    forward: "Finding the whole from a fraction is a key real-world skill."
  },
  {
    itemId: "d8", order: 8, cluster: "EQUIV", clusterName: CLUSTER_NAMES.EQUIV,
    question: "Simplify \\(\\frac{12}{18}\\) and \\(\\frac{8}{12}\\). Then find their difference.",
    options: [
        { text: "0", correct: true, feedback: "12/18=2/3, 8/12=2/3. Difference = 0." },
        { text: "\\(\\frac{1}{3}\\)", correct: false, feedback: "You probably simplified one incorrectly." },
        { text: "\\(\\frac{1}{6}\\)", correct: false, feedback: "No." },
        { text: "\\(\\frac{2}{3}\\)", correct: false, feedback: "That's the value of each." }
      ],
    backward: "Simplify both fully, then subtract.",
    forward: "Simplifying before operating often reveals they are equal."
  },
  {
    itemId: "d9", order: 9, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    question: "Find a fraction between \\(\\frac{1}{2}\\) and \\(\\frac{2}{3}\\) that has denominator 12. What is its numerator?",
    options: [
        { text: "7", correct: true, feedback: "1/2 = 6/12, 2/3 = 8/12. Between them is 7/12. Numerator = 7." },
        { text: "6", correct: false, feedback: "6/12 = 1/2, which is not between, it's the boundary." },
        { text: "8", correct: false, feedback: "8/12 = 2/3, the upper boundary." },
        { text: "5", correct: false, feedback: "5/12 is less than 1/2." }
      ],
    backward: "Convert both fractions to twelfths, then pick a numerator strictly between 6 and 8.",
    forward: "Finding fractions between two given fractions is a valuable number-sense skill."
  },
  {
    itemId: "d10", order: 10, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    question: "\\(2 - \\frac{1}{3} + \\frac{1}{2}\\) = ?",
    options: [
        { text: "\\(2\\frac{1}{6}\\)", correct: true, feedback: "2 = 12/6, 1/3=2/6, 1/2=3/6 → 12/6 - 2/6 + 3/6 = 13/6 = 2 1/6." },
        { text: "\\(2\\frac{1}{2}\\)", correct: false, feedback: "Incorrect." },
        { text: "\\(1\\frac{5}{6}\\)", correct: false, feedback: "You subtracted too much." },
        { text: "\\(1\\frac{2}{3}\\)", correct: false, feedback: "Wrong." }
      ],
    backward: "Convert whole number to fraction; use common denominator 6.",
    forward: "Mixed operations with whole numbers and fractions are common."
  },
  {
    itemId: "d11", order: 11, cluster: "MUL", clusterName: CLUSTER_NAMES.MUL,
    question: "In a class, \\(\\frac{2}{5}\\) of the students are boys. If there are 12 boys, how many students are there?",
    options: [
        { text: "30", correct: true, feedback: "2/5 × total = 12 → total = 12 × 5/2 = 30." },
        { text: "24", correct: false, feedback: "You multiplied 12 × 2." },
        { text: "12", correct: false, feedback: "That's the number of boys." },
        { text: "60", correct: false, feedback: "You multiplied 12 × 5." }
      ],
    backward: "Divide the part by the fraction to find the whole.",
    forward: "This is used in surveys and data analysis."
  },
  {
    itemId: "d12", order: 12, cluster: "DIV", clusterName: CLUSTER_NAMES.DIV,
    question: "\\( (2\\frac{1}{2} \\div 5) + \\frac{1}{4} \\) = ?",
    options: [
        { text: "\\(\\frac{3}{4}\\)", correct: true, feedback: "2 1/2 = 5/2, ÷5 = 1/2. + 1/4 = 3/4." },
        { text: "\\(\\frac{1}{2}\\)", correct: false, feedback: "You forgot to add 1/4." },
        { text: "\\(\\frac{1}{4}\\)", correct: false, feedback: "Only the second fraction." },
        { text: "\\(1\\frac{1}{4}\\)", correct: false, feedback: "Incorrect." }
      ],
    backward: "Convert mixed to improper, divide, then add.",
    forward: "Chaining operations builds fluency."
  },
  {
    itemId: "d13", order: 13, cluster: "TYPES", clusterName: CLUSTER_NAMES.TYPES,
    question: "Multiply \\(1\\frac{3}{5}\\) by 2. How much larger is the result than 3?",
    options: [
        { text: "\\(\\frac{1}{5}\\)", correct: true, feedback: "1 3/5 = 8/5, ×2 = 16/5 = 3 1/5. 3 1/5 - 3 = 1/5." },
        { text: "\\(3\\frac{1}{5}\\)", correct: false, feedback: "That's the result, not the difference." },
        { text: "\\(\\frac{2}{5}\\)", correct: false, feedback: "Off by 1/5." },
        { text: "\\(\\frac{1}{10}\\)", correct: false, feedback: "Incorrect." }
      ],
    backward: "First compute the product, then subtract 3.",
    forward: "Comparing results after operations builds estimation skills."
  },
  {
    itemId: "d14", order: 14, cluster: "EQUIV", clusterName: CLUSTER_NAMES.EQUIV,
    question: "Which fraction is NOT equivalent to \\(\\frac{3}{5}\\)? \\(\\frac{6}{10}, \\frac{9}{15}, \\frac{12}{20}, \\frac{10}{16}\\)",
    options: [
        { text: "\\(\\frac{10}{16}\\)", correct: true, feedback: "10/16 = 5/8, not 3/5." },
        { text: "\\(\\frac{6}{10}\\)", correct: false, feedback: "6/10 = 3/5." },
        { text: "\\(\\frac{9}{15}\\)", correct: false, feedback: "9/15 = 3/5." },
        { text: "\\(\\frac{12}{20}\\)", correct: false, feedback: "12/20 = 3/5." }
      ],
    backward: "Simplify each or cross-multiply with 3/5.",
    forward: "Quick recognition of non-equivalent fractions prevents errors."
  },
  {
    itemId: "d15", order: 15, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    question: "Anita ate \\(\\frac{2}{5}\\) of a pizza, Ravi ate \\(\\frac{1}{3}\\), and Sita ate \\(\\frac{3}{10}\\). Who ate the most?",
    options: [
        { text: "Anita", correct: true, feedback: "LCM 30: Anita 12/30, Ravi 10/30, Sita 9/30. Anita ate the most." },
        { text: "Ravi", correct: false, feedback: "Ravi ate 10/30, less than Anita." },
        { text: "Sita", correct: false, feedback: "Sita ate 9/30, the least." },
        { text: "All ate the same", correct: false, feedback: "Different fractions." }
      ],
    backward: "Convert to a common denominator (30) and compare numerators.",
    forward: "Word problems with fractions appear in everyday comparisons."
  },
  {
    itemId: "d16", order: 16, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    question: "\\(\\frac{1}{3} + \\frac{1}{4} + \\frac{1}{6}\\) = ? What must be added to this sum to make 1?",
    options: [
        { text: "\\(\\frac{1}{4}\\)", correct: true, feedback: "Sum = 4/12+3/12+2/12 = 9/12 = 3/4. 1 - 3/4 = 1/4." },
        { text: "\\(\\frac{3}{4}\\)", correct: false, feedback: "That's the sum, not the amount to add." },
        { text: "\\(\\frac{1}{3}\\)", correct: false, feedback: "Too large." },
        { text: "\\(\\frac{1}{2}\\)", correct: false, feedback: "Too large." }
      ],
    backward: "First find the sum, then subtract from 1.",
    forward: "Finding complements to a whole is a key fraction skill."
  },
  {
    itemId: "d17", order: 17, cluster: "MUL", clusterName: CLUSTER_NAMES.MUL,
    question: "A recipe needs \\(\\frac{3}{4}\\) cup sugar for 4 servings. How much for 10 servings?",
    options: [
        { text: "\\(1\\frac{7}{8}\\) cups", correct: true, feedback: "Per serving: 3/4 ÷ 4 = 3/16. For 10: 3/16 × 10 = 30/16 = 15/8 = 1 7/8." },
        { text: "\\(\\frac{3}{4}\\) cup", correct: false, feedback: "That's for 4 servings." },
        { text: "\\(1\\frac{1}{2}\\) cups", correct: false, feedback: "Incorrect scaling." },
        { text: "\\(2\\frac{1}{2}\\) cups", correct: false, feedback: "Too large." }
      ],
    backward: "First find the amount per serving (divide), then multiply by the new number of servings.",
    forward: "Scaling recipes is a practical use of fraction multiplication."
  },
  {
    itemId: "d18", order: 18, cluster: "DIV", clusterName: CLUSTER_NAMES.DIV,
    question: "A ribbon is \\(5\\frac{1}{4}\\) m long. Each piece is \\(\\frac{3}{4}\\) m. How many full pieces can be cut, and how much is left?",
    options: [
        { text: "7 pieces, 0 m left", correct: true, feedback: "5 1/4 = 21/4. ÷ 3/4 = 21/4 × 4/3 = 84/12 = 7 exactly. No remainder." },
        { text: "6 pieces, \\(\\frac{1}{2}\\) m left", correct: false, feedback: "Incorrect division." },
        { text: "7 pieces, \\(\\frac{1}{4}\\) m left", correct: false, feedback: "The division is exact." },
        { text: "8 pieces", correct: false, feedback: "Too many." }
      ],
    backward: "Convert mixed to improper; divide by piece length. Since the division comes out exact, there is no remainder.",
    forward: "Practical cutting problems use fraction division."
  },
  {
    itemId: "d19", order: 19, cluster: "TYPES", clusterName: CLUSTER_NAMES.TYPES,
    question: "\\(\\frac{4}{7}\\) of a number is 16. What is the number?",
    options: [
        { text: "28", correct: true, feedback: "4/7 × N = 16 → N = 16 × 7/4 = 28." },
        { text: "\\(9\\frac{1}{7}\\)", correct: false, feedback: "You divided 16 by 4/7 incorrectly." },
        { text: "64", correct: false, feedback: "You multiplied 16 by 4." },
        { text: "4", correct: false, feedback: "Incorrect." }
      ],
    backward: "Divide the given number by the fraction (multiply by its reciprocal).",
    forward: "Finding the whole from a part is fundamental in percentages."
  },
  {
    itemId: "d20", order: 20, cluster: "EQUIV", clusterName: CLUSTER_NAMES.EQUIV,
    question: "Simplify \\(\\frac{24}{36}\\). Then write an equivalent fraction whose denominator is 9 more than its numerator.",
    options: [
        { text: "\\(\\frac{18}{27}\\)", correct: true, feedback: "24/36=2/3. Let fraction = 2k/3k. 3k = 2k+9 → k=9 → 18/27." },
        { text: "\\(\\frac{12}{21}\\)", correct: false, feedback: "Denominator is 9 more, but 12/21=4/7, which is not equivalent to 2/3." },
        { text: "\\(\\frac{2}{11}\\)", correct: false, feedback: "No." },
        { text: "\\(\\frac{6}{15}\\)", correct: false, feedback: "6/15=2/5, not 2/3." }
      ],
    backward: "Simplify first, then use the algebraic condition to find k.",
    forward: "Linking equivalent fractions with algebraic conditions."
  },
  {
    itemId: "d21", order: 21, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    question: "Among \\(\\frac{7}{10}, \\frac{3}{4}, \\frac{5}{6}\\), find the difference between the largest and smallest.",
    options: [
        { text: "\\(\\frac{2}{15}\\)", correct: true, feedback: "7/10=0.7, 3/4=0.75, 5/6≈0.833. Largest 5/6, smallest 7/10. 5/6 - 7/10 = 25/30 - 21/30 = 4/30 = 2/15." },
        { text: "\\(\\frac{1}{6}\\)", correct: false, feedback: "Incorrect." },
        { text: "\\(\\frac{1}{4}\\)", correct: false, feedback: "No." },
        { text: "\\(\\frac{1}{10}\\)", correct: false, feedback: "Too small." }
      ],
    backward: "Identify largest and smallest (using LCM or decimal conversion), then subtract.",
    forward: "Comparing and finding differences of fractions is used in measurement errors."
  },
  {
    itemId: "d22", order: 22, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    question: "\\( (2\\frac{1}{3} - 1\\frac{1}{2}) + \\frac{3}{4} \\) = ?",
    options: [
        { text: "\\(1\\frac{7}{12}\\)", correct: true, feedback: "7/3 - 3/2 = 14/6 - 9/6 = 5/6. + 3/4 = 10/12 + 9/12 = 19/12 = 1 7/12." },
        { text: "\\(2\\frac{1}{12}\\)", correct: false, feedback: "Incorrect." },
        { text: "\\(1\\frac{1}{12}\\)", correct: false, feedback: "Off by 1/2." },
        { text: "\\(\\frac{7}{12}\\)", correct: false, feedback: "Forgot the whole number." }
      ],
    backward: "Evaluate inside brackets first, then add.",
    forward: "Order of operations with fractions."
  },
  {
    itemId: "d23", order: 23, cluster: "MUL", clusterName: CLUSTER_NAMES.MUL,
    question: "In a survey, \\(\\frac{2}{5}\\) of people liked tea. Of those, \\(\\frac{3}{4}\\) also liked coffee. What fraction of all people liked both?",
    options: [
        { text: "\\(\\frac{3}{10}\\)", correct: true, feedback: "3/4 × 2/5 = 6/20 = 3/10." },
        { text: "\\(\\frac{5}{9}\\)", correct: false, feedback: "You added fractions." },
        { text: "\\(\\frac{8}{20}\\)", correct: false, feedback: "Not simplified." },
        { text: "\\(\\frac{3}{4}\\)", correct: false, feedback: "That's the fraction of tea-likers, not of all people." }
      ],
    backward: "Multiply the two fractions to find the fraction of the whole.",
    forward: "This is a classic 'fraction of a fraction' problem."
  },
  {
    itemId: "d24", order: 24, cluster: "DIV", clusterName: CLUSTER_NAMES.DIV,
    question: "Divide \\(4\\frac{1}{2}\\) by \\(\\frac{3}{4}\\). Is the result greater than 6?",
    options: [
        { text: "Equal to 6", correct: true, feedback: "4 1/2 = 9/2. ÷ 3/4 = 9/2 × 4/3 = 36/6 = 6. Exactly 6." },
        { text: "Greater than 6", correct: false, feedback: "It's exactly 6." },
        { text: "Less than 6", correct: false, feedback: "It's 6." },
        { text: "Cannot determine", correct: false, feedback: "It can be calculated exactly." }
      ],
    backward: "Divide by multiplying by the reciprocal. Simplify.",
    forward: "Division of mixed numbers by fractions tests multiple skills."
  }
];

const recheckItems = [
  {
    itemId: "r1", order: 1, cluster: "TYPES", clusterName: CLUSTER_NAMES.TYPES,
    question: "A mixed number subtracted from 5 gives \\(2\\frac{1}{3}\\). Find the mixed number.",
    options: [
        { text: "\\(2\\frac{2}{3}\\)", correct: true, feedback: "5 - ? = 2 1/3 → ? = 5 - 2 1/3 = 2 2/3." },
        { text: "\\(7\\frac{1}{3}\\)", correct: false, feedback: "You added." },
        { text: "\\(3\\frac{2}{3}\\)", correct: false, feedback: "Incorrect subtraction." },
        { text: "\\(2\\frac{1}{3}\\)", correct: false, feedback: "That's the result, not the original." }
      ]
  },
  {
    itemId: "r2", order: 2, cluster: "EQUIV", clusterName: CLUSTER_NAMES.EQUIV,
    question: "A fraction equivalent to \\(\\frac{3}{7}\\) has numerator 12. What is the denominator? Then find the sum of numerator and denominator.",
    options: [
        { text: "Denominator 28, sum 40", correct: true, feedback: "3/7 = 12/28, sum = 12+28 = 40." },
        { text: "Denominator 21, sum 33", correct: false, feedback: "3/7 = 12/28, not 12/21." },
        { text: "Denominator 28, sum 12", correct: false, feedback: "Sum is 40, not 12." },
        { text: "Denominator 24, sum 36", correct: false, feedback: "No." }
      ]
  },
  {
    itemId: "r3", order: 3, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    question: "Arrange in descending order: \\(\\frac{11}{8}, 1\\frac{1}{4}, \\frac{5}{3}\\).",
    options: [
        { text: "\\(\\frac{5}{3}, \\frac{11}{8}, 1\\frac{1}{4}\\)", correct: true, feedback: "5/3≈1.667, 11/8=1.375, 1 1/4=1.25. Descending: 5/3, 11/8, 1 1/4." },
        { text: "\\(\\frac{11}{8}, 1\\frac{1}{4}, \\frac{5}{3}\\)", correct: false, feedback: "Ascending, not descending." },
        { text: "\\(1\\frac{1}{4}, \\frac{11}{8}, \\frac{5}{3}\\)", correct: false, feedback: "Increasing order." },
        { text: "\\(\\frac{5}{3}, 1\\frac{1}{4}, \\frac{11}{8}\\)", correct: false, feedback: "11/8 > 1 1/4." }
      ]
  },
  {
    itemId: "r4", order: 4, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    question: "\\(\\frac{2}{5} + ? - \\frac{1}{10} = \\frac{3}{10}\\). Find ?.",
    options: [
        { text: "0", correct: true, feedback: "2/5 = 4/10. 4/10 + ? - 1/10 = 3/10 → ? + 3/10 = 3/10 → ? = 0." },
        { text: "\\(\\frac{1}{5}\\)", correct: false, feedback: "2/10 would give 5/10, not 3/10." },
        { text: "\\(\\frac{1}{10}\\)", correct: false, feedback: "Then sum would be 4/10." },
        { text: "\\(\\frac{2}{5}\\)", correct: false, feedback: "Too large." }
      ]
  },
  {
    itemId: "r5", order: 5, cluster: "MUL", clusterName: CLUSTER_NAMES.MUL,
    question: "A container is \\(\\frac{3}{4}\\) full. \\(\\frac{2}{3}\\) of the liquid is poured out. What fraction of the container remains full?",
    options: [
        { text: "\\(\\frac{1}{4}\\)", correct: true, feedback: "Poured out: 2/3 × 3/4 = 1/2. Remaining: 3/4 - 1/2 = 1/4." },
        { text: "\\(\\frac{1}{2}\\)", correct: false, feedback: "That's the amount poured out." },
        { text: "\\(\\frac{1}{3}\\)", correct: false, feedback: "Incorrect." },
        { text: "\\(\\frac{2}{3}\\)", correct: false, feedback: "The fraction poured out." }
      ]
  },
  {
    itemId: "r6", order: 6, cluster: "DIV", clusterName: CLUSTER_NAMES.DIV,
    question: "How many \\(\\frac{2}{5}\\) m pieces can be cut from a 3 m ribbon? How much is left?",
    options: [
        { text: "7 pieces, \\(\\frac{1}{5}\\) m left", correct: true, feedback: "3 ÷ 2/5 = 15/2 = 7.5. 7 full pieces. 0.5 × 2/5 = 1/5 m left." },
        { text: "7 pieces, 0 m left", correct: false, feedback: "There is a remainder." },
        { text: "8 pieces", correct: false, feedback: "Not enough ribbon." },
        { text: "6 pieces, \\(\\frac{1}{2}\\) m left", correct: false, feedback: "Incorrect division." }
      ]
  },
  {
    itemId: "r7", order: 7, cluster: "TYPES", clusterName: CLUSTER_NAMES.TYPES,
    question: "\\(\\frac{5}{8}\\) of a number is 20. Find the number.",
    options: [
        { text: "32", correct: true, feedback: "20 × 8/5 = 32." },
        { text: "12.5", correct: false, feedback: "You multiplied by 5/8." },
        { text: "20", correct: false, feedback: "No operation." },
        { text: "40", correct: false, feedback: "Incorrect." }
      ]
  },
  {
    itemId: "r8", order: 8, cluster: "EQUIV", clusterName: CLUSTER_NAMES.EQUIV,
    question: "Which fraction is equivalent to \\(\\frac{9}{12}\\)? \\(\\frac{12}{15}, \\frac{10}{14}, \\frac{15}{20}, \\frac{18}{22}\\)",
    options: [
        { text: "\\(\\frac{15}{20}\\)", correct: true, feedback: "15/20 = 3/4, same as 9/12 = 3/4." },
        { text: "\\(\\frac{12}{15}\\)", correct: false, feedback: "12/15 = 4/5." },
        { text: "\\(\\frac{10}{14}\\)", correct: false, feedback: "10/14 = 5/7." },
        { text: "\\(\\frac{18}{22}\\)", correct: false, feedback: "18/22 = 9/11." }
      ]
  },
  {
    itemId: "r9", order: 9, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    question: "Three friends shared a pizza. A ate \\(\\frac{1}{3}\\), B ate \\(\\frac{2}{5}\\), C ate the rest. Who ate the most?",
    options: [
        { text: "B", correct: true, feedback: "A=10/30, B=12/30, C=8/30. B ate the most." },
        { text: "A", correct: false, feedback: "A ate 10/30, less than B." },
        { text: "C", correct: false, feedback: "C ate 8/30, the least." },
        { text: "All equal", correct: false, feedback: "Different amounts." }
      ]
  },
  {
    itemId: "r10", order: 10, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    question: "\\(1\\frac{1}{2} + 2\\frac{2}{3} - 1\\frac{1}{4}\\) = ?",
    options: [
        { text: "\\(2\\frac{11}{12}\\)", correct: true, feedback: "3/2 + 8/3 - 5/4 = 18/12 + 32/12 - 15/12 = 35/12 = 2 11/12." },
        { text: "\\(3\\frac{1}{12}\\)", correct: false, feedback: "Too large." },
        { text: "\\(2\\frac{1}{2}\\)", correct: false, feedback: "Incorrect." },
        { text: "\\(1\\frac{11}{12}\\)", correct: false, feedback: "You forgot the whole number from the first two fractions." }
      ]
  },
  {
    itemId: "r11", order: 11, cluster: "MUL", clusterName: CLUSTER_NAMES.MUL,
    question: "A recipe for 6 uses \\(\\frac{2}{3}\\) cup oil. How much for 15?",
    options: [
        { text: "\\(1\\frac{2}{3}\\) cups", correct: true, feedback: "Per serving: 2/3 ÷ 6 = 2/18 = 1/9. ×15 = 15/9 = 5/3 = 1 2/3." },
        { text: "\\(\\frac{5}{3}\\) cup", correct: false, feedback: "That's the same value as 1 2/3, but not written as a mixed number." },
        { text: "\\(\\frac{2}{3}\\) cup", correct: false, feedback: "That's for 6." },
        { text: "\\(3\\frac{1}{3}\\) cups", correct: false, feedback: "Too large." }
      ]
  },
  {
    itemId: "r12", order: 12, cluster: "DIV", clusterName: CLUSTER_NAMES.DIV,
    question: "A water tank of capacity \\(5\\frac{1}{2}\\) litres is filled using a cup of \\(\\frac{1}{4}\\) litre. How many cups?",
    options: [
        { text: "22", correct: true, feedback: "5 1/2 = 11/2. ÷ 1/4 = 11/2 × 4 = 22." },
        { text: "11", correct: false, feedback: "You divided by 1/2 instead." },
        { text: "44", correct: false, feedback: "You multiplied by 4 twice." },
        { text: "5", correct: false, feedback: "No." }
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
    title: "Fractions — Problem-Solving & Synthesis",
    subtitle: "Telangana & Cambridge · Level 3 · Problem-Solving & Synthesis",
    description: "Multi-step fraction reasoning: reverse operations, fraction-of-a-number problems, order of operations (BODMAS), and word problems combining multiplication and division of fractions.",
    clusterNames: CLUSTER_NAMES,
    gateReviewHTML: '<strong>Quick Review — Synthesis Tips</strong><br>' +
      "&bull; Convert mixed numbers to improper fractions when adding, subtracting, or comparing.<br>" +
      "&bull; Work backwards when a fraction of a number is given to find the original.<br>" +
      "&bull; Use LCM to compare or order fractions with unlike denominators.<br>" +
      "&bull; Remember order of operations: multiply before adding or subtracting.<br>" +
      "&bull; Word problems: read carefully — are you finding a fraction of a whole, or a fraction of a remainder?<br>",
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

// seed/mathSeedCh4FractionsL2.js
//
// Populates math_chapters and math_questions with Grade 5, Chapter 4
// (Fractions), Level 2 — converted from the standalone HTML file
// ch-4-fractions-level-2.html.
//
// Run with: node seed/mathSeedCh4FractionsL2.js

const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-5";
const GRADE_LABEL = "Grade 5";
const CHAPTER_SLUG = "ch-4-fractions";
const CHAPTER_NAME = "Fractions";
const LEVEL = 2;

const CLUSTER_NAMES = {
  TYPES: "Types & Conversions",
  EQUIV: "Equivalent Fractions & Simplifying",
  COMP: "Comparing & Ordering",
  ADDSUB: "Addition & Subtraction (Related Denominators)",
  MUL: "Multiplying Fractions by Whole Numbers",
  DIV: "Dividing Fractions by Whole Numbers"
};

const warmupItems = [
  {
    itemId: "w1", order: 1, cluster: "TYPES", clusterName: CLUSTER_NAMES.TYPES,
    question: "Convert \\(2\\frac{1}{3}\\) to an improper fraction and simplify if possible.",
    options: [
        { text: "\\( \\frac{7}{3} \\)", correct: true, feedback: "(2×3)+1 = 7, over 3. Already simplest." },
        { text: "\\( \\frac{6}{3} \\)", correct: false, feedback: "You only converted the whole part (2×3) and forgot to add the numerator." },
        { text: "\\( \\frac{5}{3} \\)", correct: false, feedback: "Incorrect addition: 2+3=5, but should be 2×3+1." },
        { text: "\\( \\frac{8}{3} \\)", correct: false, feedback: "You added the whole and denominator incorrectly." }
      ],
    retryHint: "Multiply the whole number (2) by the denominator (3), then add the numerator (1). Put that sum over the denominator."
  },
  {
    itemId: "w2", order: 2, cluster: "EQUIV", clusterName: CLUSTER_NAMES.EQUIV,
    question: "Simplify \\( \\frac{12}{16} \\), then write an equivalent fraction with denominator 20.",
    options: [
        { text: "\\( \\frac{3}{4} = \\frac{15}{20} \\)", correct: true, feedback: "12/16 ÷4 = 3/4. 3/4 ×5/5 = 15/20." },
        { text: "\\( \\frac{6}{8} = \\frac{12}{20} \\)", correct: false, feedback: "6/8 is not fully simplified, and 12/20 simplifies to 3/5, not 3/4." },
        { text: "\\( \\frac{12}{20} \\) only", correct: false, feedback: "You forgot to simplify first." },
        { text: "\\( \\frac{3}{4} = \\frac{9}{20} \\)", correct: false, feedback: "3×3=9, but 4×3=12, not 20. You must multiply numerator and denominator by the same number." }
      ],
    retryHint: "First divide numerator and denominator by their HCF (4). Then multiply both by 5 to reach denominator 20."
  },
  {
    itemId: "w3", order: 3, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    question: "Which is larger: \\( \\frac{3}{8} \\) or \\( \\frac{1}{4} \\)? Use a common denominator.",
    options: [
        { text: "\\( \\frac{3}{8} \\)", correct: true, feedback: "1/4 = 2/8. 3/8 > 2/8." },
        { text: "\\( \\frac{1}{4} \\)", correct: false, feedback: "1/4 = 2/8, which is less than 3/8." },
        { text: "They are equal", correct: false, feedback: "3/8 and 2/8 are not equal." },
        { text: "Cannot compare", correct: false, feedback: "You can compare by making denominators the same." }
      ],
    retryHint: "Convert 1/4 to eighths: multiply numerator and denominator by 2. Then compare numerators."
  },
  {
    itemId: "w4", order: 4, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    question: "\\( \\frac{1}{2} + \\frac{1}{4} \\) (simplest form)",
    options: [
        { text: "\\( \\frac{3}{4} \\)", correct: true, feedback: "1/2 = 2/4; 2/4 + 1/4 = 3/4." },
        { text: "\\( \\frac{2}{6} \\)", correct: false, feedback: "You added denominators (2+4=6) and numerators (1+1=2). Never add denominators." },
        { text: "\\( \\frac{1}{2} \\)", correct: false, feedback: "You forgot to add the second fraction." },
        { text: "\\( \\frac{2}{4} \\)", correct: false, feedback: "That's just 1/2, not the sum." }
      ],
    retryHint: "Make denominators the same: 1/2 = 2/4. Then add numerators: 2+1=3, keep denominator 4."
  },
  {
    itemId: "w5", order: 5, cluster: "MUL", clusterName: CLUSTER_NAMES.MUL,
    question: "\\( 3 \\times \\frac{2}{5} \\), then add \\( \\frac{1}{5} \\) to the result.",
    options: [
        { text: "\\( \\frac{7}{5} \\)", correct: true, feedback: "3×2/5 = 6/5. 6/5 + 1/5 = 7/5." },
        { text: "\\( \\frac{6}{5} \\)", correct: false, feedback: "You forgot to add the 1/5." },
        { text: "\\( \\frac{7}{10} \\)", correct: false, feedback: "You added denominators when adding the fractions." },
        { text: "\\( \\frac{3}{5} \\)", correct: false, feedback: "You added the whole number 3 to the numerator? Not correct." }
      ],
    retryHint: "First multiply: 3 × 2/5 = 6/5. Then add 1/5: 6/5 + 1/5 = 7/5."
  },
  {
    itemId: "w6", order: 6, cluster: "DIV", clusterName: CLUSTER_NAMES.DIV,
    question: "\\( \\frac{4}{5} \\div 2 \\), then simplify.",
    options: [
        { text: "\\( \\frac{2}{5} \\)", correct: true, feedback: "4/5 × 1/2 = 4/10 = 2/5." },
        { text: "\\( \\frac{4}{10} \\)", correct: false, feedback: "That's the product before simplifying." },
        { text: "\\( \\frac{8}{5} \\)", correct: false, feedback: "You multiplied by 2 instead of dividing." },
        { text: "\\( \\frac{5}{8} \\)", correct: false, feedback: "You took the reciprocal of 4/5 instead of 2." }
      ],
    retryHint: "Dividing by 2 is the same as multiplying by 1/2. Then simplify the result."
  },
  {
    itemId: "w7", order: 7, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    question: "Arrange in ascending order: \\( \\frac{2}{3}, \\frac{1}{2}, \\frac{5}{6} \\)",
    options: [
        { text: "\\( \\frac{1}{2}, \\frac{2}{3}, \\frac{5}{6} \\)", correct: true, feedback: "LCM 6: 3/6, 4/6, 5/6. Ascending: 1/2, 2/3, 5/6." },
        { text: "\\( \\frac{5}{6}, \\frac{2}{3}, \\frac{1}{2} \\)", correct: false, feedback: "That's descending." },
        { text: "\\( \\frac{2}{3}, \\frac{1}{2}, \\frac{5}{6} \\)", correct: false, feedback: "1/2 is smaller than 2/3." },
        { text: "\\( \\frac{1}{2}, \\frac{5}{6}, \\frac{2}{3} \\)", correct: false, feedback: "5/6 > 4/6 (2/3)." }
      ],
    retryHint: "Find the LCM of denominators (6). Convert each fraction to sixths, then order."
  },
  {
    itemId: "w8", order: 8, cluster: "TYPES", clusterName: CLUSTER_NAMES.TYPES,
    question: "Which is largest? \\( \\frac{11}{4}, 2\\frac{1}{2}, \\frac{9}{4} \\)",
    options: [
        { text: "\\( \\frac{11}{4} \\)", correct: true, feedback: "11/4=2.75; 2 1/2=2.5; 9/4=2.25. Largest is 11/4." },
        { text: "\\( 2\\frac{1}{2} \\)", correct: false, feedback: "2 1/2 = 2.5, but 11/4 = 2.75." },
        { text: "\\( \\frac{9}{4} \\)", correct: false, feedback: "9/4 = 2.25, smaller." },
        { text: "They are all equal", correct: false, feedback: "They have different values." }
      ],
    retryHint: "Convert everything to improper fractions with denominator 4 and compare numerators."
  }
];

const diagnosticItems = [
  {
    itemId: "d1", order: 1, cluster: "TYPES", clusterName: CLUSTER_NAMES.TYPES,
    question: "Convert \\( 3\\frac{2}{5} \\) to an improper fraction. How much must be added to it to make 4?",
    options: [
        { text: "\\( \\frac{3}{5} \\)", correct: true, feedback: "3 2/5 = 17/5. 4 = 20/5. Difference = 3/5." },
        { text: "\\( \\frac{17}{5} \\)", correct: false, feedback: "That's the improper fraction, not the amount to add." },
        { text: "\\( \\frac{1}{5} \\)", correct: false, feedback: "You need to reach 20/5; 17/5 to 20/5 is a difference of 3/5." },
        { text: "\\( \\frac{2}{5} \\)", correct: false, feedback: "Incorrect; 17/5 + 2/5 = 19/5, not 4." }
      ],
    backward: "First convert mixed to improper. Then subtract from the whole expressed as a fraction with the same denominator.",
    forward: "This skill is used in measuring lengths and cooking."
  },
  {
    itemId: "d2", order: 2, cluster: "EQUIV", clusterName: CLUSTER_NAMES.EQUIV,
    question: "Simplify \\( \\frac{18}{24} \\) and then write an equivalent fraction with denominator 16.",
    options: [
        { text: "\\( \\frac{12}{16} \\)", correct: true, feedback: "18/24 = 3/4. 3/4 = ?/16 → ? = 12." },
        { text: "\\( \\frac{9}{16} \\)", correct: false, feedback: "You divided numerator by 2 but didn't adjust correctly." },
        { text: "\\( \\frac{18}{16} \\)", correct: false, feedback: "You only changed the denominator, not the numerator." },
        { text: "\\( \\frac{3}{4} \\)", correct: false, feedback: "That's simplified, but the question asks for the equivalent with denominator 16." }
      ],
    backward: "Divide by HCF (6) to get 3/4. Multiply both by 4 to reach denominator 16 (3×4=12).",
    forward: "Finding equivalents with different denominators is essential for adding unlike fractions."
  },
  {
    itemId: "d3", order: 3, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    question: "Arrange in ascending order: \\( \\frac{3}{8}, \\frac{1}{3}, \\frac{5}{12} \\)",
    options: [
        { text: "\\( \\frac{1}{3}, \\frac{3}{8}, \\frac{5}{12} \\)", correct: true, feedback: "LCM 24: 8/24, 9/24, 10/24 → 1/3, 3/8, 5/12." },
        { text: "\\( \\frac{3}{8}, \\frac{1}{3}, \\frac{5}{12} \\)", correct: false, feedback: "1/3 = 8/24, 3/8 = 9/24; 1/3 is smaller." },
        { text: "\\( \\frac{5}{12}, \\frac{3}{8}, \\frac{1}{3} \\)", correct: false, feedback: "That's descending." },
        { text: "\\( \\frac{1}{3}, \\frac{5}{12}, \\frac{3}{8} \\)", correct: false, feedback: "5/12 = 10/24, 3/8 = 9/24; 3/8 is smaller." }
      ],
    backward: "Find LCM of denominators (24). Convert each fraction, then compare numerators.",
    forward: "Ordering fractions is key in ranking and data analysis."
  },
  {
    itemId: "d4", order: 4, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    question: "\\( \\frac{2}{3} + \\frac{1}{6} \\) = ? (simplest form)",
    options: [
        { text: "\\( \\frac{5}{6} \\)", correct: true, feedback: "2/3 = 4/6. 4/6 + 1/6 = 5/6." },
        { text: "\\( \\frac{3}{9} \\)", correct: false, feedback: "You added numerators (2+1=3) and denominators (3+6=9). Never add denominators." },
        { text: "\\( \\frac{5}{12} \\)", correct: false, feedback: "You added denominators incorrectly." },
        { text: "\\( \\frac{4}{6} \\)", correct: false, feedback: "You only converted the first fraction and forgot to add." }
      ],
    backward: "Make denominators same: 2/3 = 4/6. Add numerators. Simplify if possible.",
    forward: "This is the foundation for adding any fractions."
  },
  {
    itemId: "d5", order: 5, cluster: "MUL", clusterName: CLUSTER_NAMES.MUL,
    question: "\\( 2 \\times \\frac{3}{8} + \\frac{1}{8} \\) = ? (simplest form)",
    options: [
        { text: "\\( \\frac{7}{8} \\)", correct: true, feedback: "2×3/8 = 6/8 = 3/4 = 6/8. + 1/8 = 7/8." },
        { text: "\\( \\frac{6}{8} \\)", correct: false, feedback: "You forgot to add 1/8." },
        { text: "\\( \\frac{1}{2} \\)", correct: false, feedback: "3/4 + 1/8 = 6/8+1/8=7/8, not 1/2." },
        { text: "\\( \\frac{4}{8} \\)", correct: false, feedback: "You only did 3/8+1/8, forgetting the multiplication." }
      ],
    backward: "First perform the multiplication. Then add the fractions, making denominators equal if needed.",
    forward: "This combines two operations that often appear in word problems."
  },
  {
    itemId: "d6", order: 6, cluster: "DIV", clusterName: CLUSTER_NAMES.DIV,
    question: "\\( \\frac{3}{5} \\div 3 \\) and \\( \\frac{2}{10} \\). Which is larger?",
    options: [
        { text: "They are equal", correct: true, feedback: "3/5 ÷ 3 = 1/5 = 2/10. Both equal." },
        { text: "\\( \\frac{3}{5} \\div 3 \\) is larger", correct: false, feedback: "It equals 1/5, which is exactly 2/10." },
        { text: "\\( \\frac{2}{10} \\) is larger", correct: false, feedback: "Both are the same." },
        { text: "Cannot compare", correct: false, feedback: "Both are easily compared after computing." }
      ],
    backward: "Divide first: 3/5 ÷ 3 = 1/5. Then compare with 2/10 = 1/5.",
    forward: "Multiple steps with fractions require careful simplification."
  },
  {
    itemId: "d7", order: 7, cluster: "TYPES", clusterName: CLUSTER_NAMES.TYPES,
    question: "Convert \\( 1\\frac{1}{4} \\) and \\( 2\\frac{1}{2} \\) to improper fractions and find their sum.",
    options: [
        { text: "\\( \\frac{15}{4} \\) (or \\( 3\\frac{3}{4} \\))", correct: true, feedback: "1 1/4 = 5/4; 2 1/2 = 5/2 = 10/4; sum = 15/4 = 3 3/4." },
        { text: "\\( \\frac{5}{4} \\)", correct: false, feedback: "That's only the first number." },
        { text: "\\( \\frac{10}{4} \\)", correct: false, feedback: "Only the second number." },
        { text: "\\( 3\\frac{1}{4} \\)", correct: false, feedback: "Incorrect sum; 5/4+10/4=15/4, not 13/4." }
      ],
    backward: "Convert each to improper, make common denominator, add.",
    forward: "Adding mixed numbers is common in measurement."
  },
  {
    itemId: "d8", order: 8, cluster: "EQUIV", clusterName: CLUSTER_NAMES.EQUIV,
    question: "Which fraction is NOT equivalent to the others? \\( \\frac{4}{6}, \\frac{6}{9}, \\frac{8}{12}, \\frac{3}{5} \\)",
    options: [
        { text: "\\( \\frac{3}{5} \\)", correct: true, feedback: "4/6=2/3, 6/9=2/3, 8/12=2/3. 3/5 ≠ 2/3." },
        { text: "\\( \\frac{4}{6} \\)", correct: false, feedback: "4/6 = 2/3." },
        { text: "\\( \\frac{6}{9} \\)", correct: false, feedback: "6/9 = 2/3." },
        { text: "\\( \\frac{8}{12} \\)", correct: false, feedback: "8/12 = 2/3." }
      ],
    backward: "Simplify each fraction fully; the one that doesn't match is the odd one out.",
    forward: "This sharpens simplification and comparison skills."
  },
  {
    itemId: "d9", order: 9, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    question: "Which fraction lies exactly halfway between \\( \\frac{1}{3} \\) and \\( \\frac{1}{2} \\)?",
    options: [
        { text: "\\( \\frac{5}{12} \\)", correct: true, feedback: "1/3=2/6, 1/2=3/6. Halfway = (2/6+3/6)/2 = (5/6)/2 = 5/12." },
        { text: "\\( \\frac{1}{4} \\)", correct: false, feedback: "1/4 = 3/12, but 5/12 is the midpoint." },
        { text: "\\( \\frac{2}{5} \\)", correct: false, feedback: "2/5 = 0.4, but halfway is about 0.416." },
        { text: "\\( \\frac{3}{8} \\)", correct: false, feedback: "3/8 = 0.375, not the midpoint." }
      ],
    backward: "Find a common denominator, then average the numerators.",
    forward: "Finding midpoints is used in interpolation."
  },
  {
    itemId: "d10", order: 10, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    question: "\\( \\frac{5}{6} - \\frac{1}{3} \\) = ? (simplest form)",
    options: [
        { text: "\\( \\frac{1}{2} \\)", correct: true, feedback: "1/3 = 2/6; 5/6 - 2/6 = 3/6 = 1/2." },
        { text: "\\( \\frac{4}{6} \\)", correct: false, feedback: "That would be 5/6 - 1/6; you didn't convert 1/3 correctly." },
        { text: "\\( \\frac{3}{6} \\)", correct: false, feedback: "Not simplified." },
        { text: "\\( \\frac{2}{6} \\)", correct: false, feedback: "Incorrect subtraction." }
      ],
    backward: "Convert 1/3 to 2/6. Subtract numerators, simplify.",
    forward: "Subtraction with unlike denominators is common in recipes."
  },
  {
    itemId: "d11", order: 11, cluster: "MUL", clusterName: CLUSTER_NAMES.MUL,
    question: "A tank holds 40 litres. \\( \\frac{3}{5} \\) of it is used. How much is left?",
    options: [
        { text: "16 litres", correct: true, feedback: "Used: 3/5 × 40 = 24 L. Left: 40 - 24 = 16 L." },
        { text: "24 litres", correct: false, feedback: "That's the amount used, not left." },
        { text: "40 litres", correct: false, feedback: "The total capacity, nothing used." },
        { text: "8 litres", correct: false, feedback: "Incorrect calculation." }
      ],
    backward: "First find the used amount, then subtract from total.",
    forward: "This type of problem appears in inventory and resource management."
  },
  {
    itemId: "d12", order: 12, cluster: "DIV", clusterName: CLUSTER_NAMES.DIV,
    question: "\\( \\frac{3}{4} \\div 2 + \\frac{1}{8} \\) = ? (simplest form)",
    options: [
        { text: "\\( \\frac{1}{2} \\)", correct: true, feedback: "3/4 ÷ 2 = 3/8. 3/8 + 1/8 = 4/8 = 1/2." },
        { text: "\\( \\frac{3}{8} \\)", correct: false, feedback: "You only did the division." },
        { text: "\\( \\frac{1}{8} \\)", correct: false, feedback: "You only took the second fraction." },
        { text: "\\( \\frac{5}{8} \\)", correct: false, feedback: "3/8+1/8=4/8, not 5/8." }
      ],
    backward: "Divide first, then add.",
    forward: "Chaining operations builds fluency with fractions."
  },
  {
    itemId: "d13", order: 13, cluster: "TYPES", clusterName: CLUSTER_NAMES.TYPES,
    question: "Convert \\( \\frac{17}{5} \\) to a mixed number. How much less than 4 is it?",
    options: [
        { text: "\\( 3\\frac{2}{5} \\); \\( \\frac{3}{5} \\) less", correct: true, feedback: "17/5 = 3 2/5. 4 = 20/5, difference = 3/5." },
        { text: "\\( 3\\frac{2}{5} \\); \\( \\frac{2}{5} \\) less", correct: false, feedback: "3 2/5 + 2/5 = 3 4/5, not 4." },
        { text: "\\( 3\\frac{1}{5} \\); \\( \\frac{4}{5} \\) less", correct: false, feedback: "17/5 = 3 2/5, not 3 1/5." },
        { text: "\\( 3\\frac{3}{5} \\); \\( \\frac{2}{5} \\) less", correct: false, feedback: "17/5 is 3 2/5." }
      ],
    backward: "Convert, then subtract from whole.",
    forward: "Mixed number differences appear in measuring."
  },
  {
    itemId: "d14", order: 14, cluster: "EQUIV", clusterName: CLUSTER_NAMES.EQUIV,
    question: "\\( \\frac{3}{7} = \\frac{?}{28} \\). Then simplify \\( \\frac{12}{28} \\) and compare with \\( \\frac{3}{7} \\).",
    options: [
        { text: "12, they are equal", correct: true, feedback: "3/7 = 12/28. 12/28 simplifies to 3/7. They are equal." },
        { text: "12, but \\( \\frac{12}{28} \\) is larger", correct: false, feedback: "They are the same after simplification." },
        { text: "9, they are equal", correct: false, feedback: "Missing numerator is 12, not 9." },
        { text: "12, but \\( \\frac{3}{7} \\) is larger", correct: false, feedback: "They are equal." }
      ],
    backward: "Multiply numerator and denominator by 4. Then simplify 12/28 to 3/7.",
    forward: "Confirming equivalence through simplification."
  },
  {
    itemId: "d15", order: 15, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    question: "Arrange in descending order: \\( \\frac{11}{3}, 3\\frac{1}{6}, \\frac{7}{2} \\)",
    options: [
        { text: "\\( \\frac{11}{3}, \\frac{7}{2}, 3\\frac{1}{6} \\)", correct: true, feedback: "11/3=22/6, 7/2=21/6, 3 1/6=19/6. Descending: 22/6, 21/6, 19/6." },
        { text: "\\( 3\\frac{1}{6}, \\frac{7}{2}, \\frac{11}{3} \\)", correct: false, feedback: "That's ascending." },
        { text: "\\( \\frac{11}{3}, 3\\frac{1}{6}, \\frac{7}{2} \\)", correct: false, feedback: "7/2 = 21/6 > 3 1/6 = 19/6." },
        { text: "\\( \\frac{7}{2}, \\frac{11}{3}, 3\\frac{1}{6} \\)", correct: false, feedback: "11/3 = 22/6 > 21/6." }
      ],
    backward: "Convert all to improper with common denominator 6, then compare numerators.",
    forward: "Mixed forms need careful conversion before ordering."
  },
  {
    itemId: "d16", order: 16, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    question: "\\( \\frac{1}{2} + \\frac{1}{3} + \\frac{1}{6} \\) = ? (simplest form)",
    options: [
        { text: "1", correct: true, feedback: "LCM 6: 3/6 + 2/6 + 1/6 = 6/6 = 1." },
        { text: "\\( \\frac{6}{6} \\)", correct: false, feedback: "That's 1, but the simplified answer is just 1." },
        { text: "\\( \\frac{3}{6} \\)", correct: false, feedback: "You only added the first two? Not correct." },
        { text: "\\( \\frac{5}{6} \\)", correct: false, feedback: "Missed one fraction." }
      ],
    backward: "Find LCM of all denominators, convert each, add, simplify.",
    forward: "Adding several fractions is common in probability and statistics."
  },
  {
    itemId: "d17", order: 17, cluster: "MUL", clusterName: CLUSTER_NAMES.MUL,
    question: "\\( 4 \\times \\frac{2}{9} \\) and \\( \\frac{5}{9} \\). Which is larger?",
    options: [
        { text: "\\( 4 \\times \\frac{2}{9} \\) is larger", correct: true, feedback: "4×2/9 = 8/9. 8/9 > 5/9." },
        { text: "\\( \\frac{5}{9} \\) is larger", correct: false, feedback: "8/9 is greater." },
        { text: "They are equal", correct: false, feedback: "8/9 ≠ 5/9." },
        { text: "Cannot compare", correct: false, feedback: "Both are ninths, easy to compare." }
      ],
    backward: "Compute product, then compare.",
    forward: "Combining multiplication and comparison."
  },
  {
    itemId: "d18", order: 18, cluster: "DIV", clusterName: CLUSTER_NAMES.DIV,
    question: "A ribbon \\( \\frac{5}{6} \\) m long is cut into 5 equal pieces. Two pieces are used. What fraction of the original ribbon is used?",
    options: [
        { text: "\\( \\frac{2}{5} \\)", correct: true, feedback: "5 equal pieces → each is 1/5 of the ribbon. 2 pieces = 2/5 of the ribbon." },
        { text: "\\( \\frac{1}{3} \\)", correct: false, feedback: "That's the actual length used (1/3 m), but the question asks for the fraction of the original." },
        { text: "\\( \\frac{1}{6} \\)", correct: false, feedback: "That's the length of one piece in metres." },
        { text: "\\( \\frac{5}{6} \\)", correct: false, feedback: "That's the whole ribbon." }
      ],
    backward: "Cutting into 5 equal pieces means each piece is 1/5 of the whole, regardless of length. Two pieces = 2/5.",
    forward: "Distinguishing between actual length and fractional part is a key word-problem skill."
  },
  {
    itemId: "d19", order: 19, cluster: "TYPES", clusterName: CLUSTER_NAMES.TYPES,
    question: "\\( \\frac{23}{6} + 1\\frac{1}{2} \\) = ? (simplest form, as mixed number)",
    options: [
        { text: "\\( 5\\frac{1}{3} \\)", correct: true, feedback: "23/6 = 3 5/6; 1 1/2 = 9/6; sum = 32/6 = 16/3 = 5 1/3." },
        { text: "\\( 4\\frac{1}{2} \\)", correct: false, feedback: "Incorrect addition." },
        { text: "\\( 5\\frac{1}{6} \\)", correct: false, feedback: "32/6 = 5 2/6 = 5 1/3, not 5 1/6." },
        { text: "\\( 5\\frac{5}{6} \\)", correct: false, feedback: "You added whole numbers and fractions incorrectly." }
      ],
    backward: "Convert mixed to improper, find common denominator, add, simplify, convert back.",
    forward: "Multi-step fraction addition combines several core skills."
  },
  {
    itemId: "d20", order: 20, cluster: "EQUIV", clusterName: CLUSTER_NAMES.EQUIV,
    question: "\\( \\frac{4}{9} = \\frac{?}{27} \\). Then simplify \\( \\frac{18}{27} \\) and compare with \\( \\frac{4}{9} \\).",
    options: [
        { text: "12, \\( \\frac{18}{27} \\) is larger", correct: true, feedback: "4/9=12/27. 18/27=2/3=6/9, and 4/9<6/9, so 18/27 is larger." },
        { text: "12, they are equal", correct: false, feedback: "12/27 vs 18/27; 18/27 is larger." },
        { text: "9, \\( \\frac{4}{9} \\) is larger", correct: false, feedback: "Missing numerator is 12, and 4/9 is smaller." },
        { text: "12, \\( \\frac{4}{9} \\) is larger", correct: false, feedback: "4/9 = 12/27, which is less than 18/27." }
      ],
    backward: "Find equivalent by multiplying numerator and denominator by 3. Then simplify 18/27 and compare.",
    forward: "Multi-step equivalence and comparison."
  },
  {
    itemId: "d21", order: 21, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    question: "Which is the largest? \\( \\frac{5}{8}, \\frac{2}{3}, \\frac{7}{12} \\)",
    options: [
        { text: "\\( \\frac{2}{3} \\)", correct: true, feedback: "LCM 24: 15/24, 16/24, 14/24 → 2/3 = 16/24 largest." },
        { text: "\\( \\frac{5}{8} \\)", correct: false, feedback: "5/8 = 15/24, smaller than 16/24." },
        { text: "\\( \\frac{7}{12} \\)", correct: false, feedback: "7/12 = 14/24, smallest." },
        { text: "They are all equal", correct: false, feedback: "Different values." }
      ],
    backward: "Convert all to a common denominator (LCM=24), then compare numerators.",
    forward: "Quick comparison using LCM is a frequent test skill."
  },
  {
    itemId: "d22", order: 22, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    question: "\\( 2\\frac{1}{3} + 1\\frac{1}{2} \\) = ? (simplest form, as mixed number)",
    options: [
        { text: "\\( 3\\frac{5}{6} \\)", correct: true, feedback: "2 1/3 = 7/3 = 14/6; 1 1/2 = 3/2 = 9/6; sum = 23/6 = 3 5/6." },
        { text: "\\( 3\\frac{1}{6} \\)", correct: false, feedback: "14/6+9/6=23/6=3 5/6." },
        { text: "\\( 3\\frac{2}{5} \\)", correct: false, feedback: "Wrong denominator." },
        { text: "\\( 4\\frac{1}{6} \\)", correct: false, feedback: "Overcounted." }
      ],
    backward: "Convert to improper, find common denominator, add, convert back to mixed.",
    forward: "Mixed number addition is used in construction and cooking."
  },
  {
    itemId: "d23", order: 23, cluster: "MUL", clusterName: CLUSTER_NAMES.MUL,
    question: "\\( 3 \\times \\frac{2}{7} + \\frac{3}{7} \\) = ? (simplest form)",
    options: [
        { text: "\\( \\frac{9}{7} \\) (or \\( 1\\frac{2}{7} \\))", correct: true, feedback: "3×2/7 = 6/7. +3/7 = 9/7 = 1 2/7." },
        { text: "\\( \\frac{6}{7} \\)", correct: false, feedback: "Forgot to add 3/7." },
        { text: "\\( \\frac{5}{7} \\)", correct: false, feedback: "Incorrect multiplication." },
        { text: "\\( 1\\frac{1}{7} \\)", correct: false, feedback: "9/7 = 1 2/7, not 1 1/7." }
      ],
    backward: "Multiply first, then add the fractions (same denominator).",
    forward: "Two-step operations with fractions are common."
  },
  {
    itemId: "d24", order: 24, cluster: "DIV", clusterName: CLUSTER_NAMES.DIV,
    question: "\\( \\frac{9}{4} \\div 3 \\) = ? (simplest form)",
    options: [
        { text: "\\( \\frac{3}{4} \\)", correct: true, feedback: "9/4 × 1/3 = 9/12 = 3/4." },
        { text: "\\( \\frac{27}{4} \\)", correct: false, feedback: "You multiplied by 3 instead of dividing." },
        { text: "\\( \\frac{9}{12} \\)", correct: false, feedback: "Not simplified." },
        { text: "\\( 1\\frac{1}{2} \\)", correct: false, feedback: "Incorrect." }
      ],
    backward: "Multiply by reciprocal 1/3; simplify.",
    forward: "Division of improper fractions yields a proper fraction."
  }
];

const recheckItems = [
  {
    itemId: "r1", order: 1, cluster: "TYPES", clusterName: CLUSTER_NAMES.TYPES,
    question: "Convert \\( 2\\frac{3}{4} \\) to an improper fraction, then add \\( \\frac{1}{4} \\). Simplify.",
    options: [
        { text: "3", correct: true, feedback: "2 3/4 = 11/4. + 1/4 = 12/4 = 3." },
        { text: "\\( \\frac{11}{4} \\)", correct: false, feedback: "You forgot to add 1/4." },
        { text: "\\( 2\\frac{1}{2} \\)", correct: false, feedback: "Incorrect addition." },
        { text: "\\( 2\\frac{1}{4} \\)", correct: false, feedback: "Incorrect." }
      ]
  },
  {
    itemId: "r2", order: 2, cluster: "EQUIV", clusterName: CLUSTER_NAMES.EQUIV,
    question: "Simplify \\( \\frac{16}{20} \\) and write an equivalent fraction with denominator 15.",
    options: [
        { text: "\\( \\frac{12}{15} \\)", correct: true, feedback: "16/20 = 4/5. 4/5 = 12/15." },
        { text: "\\( \\frac{8}{10} \\)", correct: false, feedback: "Not fully simplified." },
        { text: "\\( \\frac{16}{15} \\)", correct: false, feedback: "Only changed denominator." },
        { text: "\\( \\frac{12}{20} \\)", correct: false, feedback: "That's 3/5, not 4/5." }
      ]
  },
  {
    itemId: "r3", order: 3, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    question: "Arrange ascending: \\( \\frac{3}{5}, \\frac{2}{3}, \\frac{7}{10} \\)",
    options: [
        { text: "\\( \\frac{3}{5}, \\frac{2}{3}, \\frac{7}{10} \\)", correct: true, feedback: "LCM 30: 18/30, 20/30, 21/30." },
        { text: "\\( \\frac{2}{3}, \\frac{3}{5}, \\frac{7}{10} \\)", correct: false, feedback: "3/5=18/30, 2/3=20/30; 3/5 is smaller." },
        { text: "\\( \\frac{7}{10}, \\frac{2}{3}, \\frac{3}{5} \\)", correct: false, feedback: "Descending." },
        { text: "\\( \\frac{3}{5}, \\frac{7}{10}, \\frac{2}{3} \\)", correct: false, feedback: "7/10=21/30, 2/3=20/30." }
      ]
  },
  {
    itemId: "r4", order: 4, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    question: "\\( \\frac{3}{4} - \\frac{1}{8} + \\frac{1}{2} \\) = ? (simplest form)",
    options: [
        { text: "\\( 1\\frac{1}{8} \\)", correct: true, feedback: "3/4=6/8, 1/2=4/8 → 6/8 - 1/8 + 4/8 = 9/8 = 1 1/8." },
        { text: "\\( \\frac{9}{8} \\)", correct: false, feedback: "That's the same value as 1 1/8, but not written in simplest mixed form." },
        { text: "\\( \\frac{1}{2} \\)", correct: false, feedback: "Incorrect." },
        { text: "1", correct: false, feedback: "Too small." }
      ]
  },
  {
    itemId: "r5", order: 5, cluster: "MUL", clusterName: CLUSTER_NAMES.MUL,
    question: "\\( 5 \\times \\frac{2}{9} + \\frac{1}{9} \\) = ? (simplest form)",
    options: [
        { text: "\\( 1\\frac{2}{9} \\)", correct: true, feedback: "5×2/9=10/9. +1/9=11/9=1 2/9." },
        { text: "\\( \\frac{10}{9} \\)", correct: false, feedback: "Forgot to add 1/9." },
        { text: "\\( \\frac{11}{9} \\)", correct: false, feedback: "Not simplified to mixed number." },
        { text: "\\( \\frac{10}{18} \\)", correct: false, feedback: "Incorrect multiplication." }
      ]
  },
  {
    itemId: "r6", order: 6, cluster: "DIV", clusterName: CLUSTER_NAMES.DIV,
    question: "\\( \\frac{5}{8} \\div 5 + \\frac{1}{8} \\) = ? (simplest form)",
    options: [
        { text: "\\( \\frac{1}{4} \\)", correct: true, feedback: "5/8÷5=1/8. 1/8+1/8=2/8=1/4." },
        { text: "\\( \\frac{1}{8} \\)", correct: false, feedback: "Only the division result." },
        { text: "\\( \\frac{1}{2} \\)", correct: false, feedback: "Incorrect." },
        { text: "\\( \\frac{5}{8} \\)", correct: false, feedback: "No operation." }
      ]
  },
  {
    itemId: "r7", order: 7, cluster: "TYPES", clusterName: CLUSTER_NAMES.TYPES,
    question: "\\( \\frac{19}{6} + 1\\frac{1}{3} \\) = ? (mixed number)",
    options: [
        { text: "\\( 4\\frac{1}{2} \\)", correct: true, feedback: "19/6=3 1/6; 1 1/3=8/6; sum=27/6=4 3/6=4 1/2." },
        { text: "\\( 4\\frac{1}{3} \\)", correct: false, feedback: "Incorrect conversion." },
        { text: "\\( 3\\frac{5}{6} \\)", correct: false, feedback: "Only converted the first." },
        { text: "\\( 5\\frac{1}{6} \\)", correct: false, feedback: "Overcount." }
      ]
  },
  {
    itemId: "r8", order: 8, cluster: "EQUIV", clusterName: CLUSTER_NAMES.EQUIV,
    question: "Which is NOT equivalent to \\( \\frac{5}{8} \\)? \\( \\frac{10}{16}, \\frac{15}{24}, \\frac{20}{32}, \\frac{12}{20} \\)",
    options: [
        { text: "\\( \\frac{12}{20} \\)", correct: true, feedback: "12/20 = 3/5 ≠ 5/8." },
        { text: "\\( \\frac{10}{16} \\)", correct: false, feedback: "10/16 = 5/8." },
        { text: "\\( \\frac{15}{24} \\)", correct: false, feedback: "15/24 = 5/8." },
        { text: "\\( \\frac{20}{32} \\)", correct: false, feedback: "20/32 = 5/8." }
      ]
  },
  {
    itemId: "r9", order: 9, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    question: "Find a fraction between \\( \\frac{1}{4} \\) and \\( \\frac{1}{3} \\).",
    options: [
        { text: "\\( \\frac{7}{24} \\)", correct: true, feedback: "1/4=6/24, 1/3=8/24; between is 7/24." },
        { text: "\\( \\frac{1}{5} \\)", correct: false, feedback: "1/5 = 0.2, smaller than 1/4." },
        { text: "\\( \\frac{2}{7} \\)", correct: false, feedback: "Not the exact midpoint between 1/4 and 1/3." },
        { text: "\\( \\frac{5}{12} \\)", correct: false, feedback: "5/12 ≈ 0.416, larger than 1/3." }
      ]
  },
  {
    itemId: "r10", order: 10, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    question: "\\( 2\\frac{1}{4} - 1\\frac{2}{3} \\) = ? (simplest form)",
    options: [
        { text: "\\( \\frac{7}{12} \\)", correct: true, feedback: "9/4 - 5/3 = 27/12 - 20/12 = 7/12." },
        { text: "\\( 1\\frac{5}{12} \\)", correct: false, feedback: "Incorrect subtraction." },
        { text: "\\( 1\\frac{7}{12} \\)", correct: false, feedback: "Whole part is 0 (since 7/12 <1)." },
        { text: "\\( \\frac{1}{12} \\)", correct: false, feedback: "Incorrect." }
      ]
  },
  {
    itemId: "r11", order: 11, cluster: "MUL", clusterName: CLUSTER_NAMES.MUL,
    question: "A pizza is cut into 8 slices. \\( \\frac{3}{4} \\) of the pizza is eaten. How many slices are left?",
    options: [
        { text: "2", correct: true, feedback: "3/4 of 8 = 6 slices eaten. 8 - 6 = 2 slices left." },
        { text: "6", correct: false, feedback: "That's the number eaten." },
        { text: "4", correct: false, feedback: "That's 1/2 of 8." },
        { text: "8", correct: false, feedback: "No slices eaten." }
      ]
  },
  {
    itemId: "r12", order: 12, cluster: "DIV", clusterName: CLUSTER_NAMES.DIV,
    question: "\\( \\frac{7}{10} \\div 7 \\) then add \\( \\frac{2}{5} \\). Simplify.",
    options: [
        { text: "\\( \\frac{1}{2} \\)", correct: true, feedback: "7/10 ÷ 7 = 1/10; + 4/10 = 5/10 = 1/2." },
        { text: "\\( \\frac{1}{10} \\)", correct: false, feedback: "Only division." },
        { text: "\\( \\frac{3}{10} \\)", correct: false, feedback: "Incorrect addition." },
        { text: "\\( \\frac{7}{10} \\)", correct: false, feedback: "No operation." }
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
    title: "Fractions — Advanced Core",
    subtitle: "Telangana & Cambridge · Level 2 · Advanced Core",
    description: "Multi-step fraction work: mixed-number conversions, equivalence with unlike denominators, comparing via LCM, and combined addition/subtraction/multiplication/division.",
    clusterNames: CLUSTER_NAMES,
    gateReviewHTML: '<strong>Quick Review — Multi-Step Fractions</strong><br>' +
      "&bull; Convert mixed numbers to improper fractions before adding, subtracting, or comparing.<br>" +
      "&bull; Always simplify fractions at the end of a calculation.<br>" +
      "&bull; To compare fractions with unlike denominators, find a common denominator (LCM).<br>" +
      "&bull; Adding/subtracting related denominators: change one fraction so denominators match.<br>" +
      "&bull; Multiply by a whole number: multiply the numerator, keep the denominator, simplify.<br>" +
      "&bull; Divide by a whole number: multiply by the reciprocal (or divide the numerator if possible).<br>" +
      "&bull; Read word problems carefully — sometimes you need to compute a fraction of a quantity, then find the remainder.<br>",
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

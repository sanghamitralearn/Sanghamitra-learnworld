// seed/mathSeedCh2AlgebraExpressionsL4.js
//
// Populates math_chapters and math_questions with Grade 8, Chapter 2
// (Expressions & Formulae), Level 4 — converted from the standalone
// HTML file ch2-algebra-expressions-level-4.html.
//
// This is the 25-minute timed diagnostic level.
//
// Run with: node seed/mathSeedCh2AlgebraExpressionsL4.js

const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-8";
const GRADE_LABEL = "Grade 8";
const CHAPTER_SLUG = "ch-2-algebra-expressions";
const CHAPTER_NAME = "Expressions & Formulae";
const LEVEL = 4;

const CLUSTER_NAMES = {
  SUB: "Substitution",
  INDX: "Index Laws",
  EXP: "Expanding",
  FAC: "Factorising",
  ALGF: "Algebraic Fractions",
  CON: "Constructing",
  REA: "Rearranging & Using",
  EXT: "Extension"
};

const warmupItems = [
  { itemId: "w1", order: 1, cluster: "SUB", clusterName: CLUSTER_NAMES.SUB,
    question: "If \\(x = -3\\), evaluate \\(2x^2 + x - 5\\).",
    options: [
      { text: "10", correct: true, feedback: "2×9 + (-3) - 5 = 18 - 3 - 5 = 10." },
      { text: "16", correct: false, feedback: "You treated x as +3: 2×9+3-5=18+3-5=16. x=-3, so the middle term is -3." },
      { text: "4", correct: false, feedback: "You may have squared -3 as -9: 2(-9)+(-3)-5 = -26." },
      { text: "-10", correct: false, feedback: "You got the sign of the whole expression wrong." }
    ],
    retryHint: "(-3)² = +9; 2×9=18; + (-3) = 15; -5 = 10." },
  { itemId: "w2", order: 2, cluster: "INDX", clusterName: CLUSTER_NAMES.INDX,
    question: "Simplify: \\(x^3 \\times x^4\\).",
    options: [
      { text: "\\(x^7\\)", correct: true, feedback: "Add exponents: 3+4=7." },
      { text: "\\(x^{12}\\)", correct: false, feedback: "You multiplied the exponents. Add them when multiplying powers." },
      { text: "\\(x^1\\)", correct: false, feedback: "You subtracted the exponents. Subtract when dividing, not multiplying." },
      { text: "\\(7x\\)", correct: false, feedback: "The base is x, not a number. Add exponents, not coefficients." }
    ],
    retryHint: "When multiplying powers of the same base, add the exponents." },
  { itemId: "w3", order: 3, cluster: "EXP", clusterName: CLUSTER_NAMES.EXP,
    question: "Expand: \\(3x(2x - 1)\\).",
    options: [
      { text: "\\(6x^2 - 3x\\)", correct: true, feedback: "3x×2x=6x²; 3x×(-1)=-3x." },
      { text: "\\(6x^2 - 1\\)", correct: false, feedback: "You forgot to multiply the -1 by x." },
      { text: "\\(5x^2 - 3x\\)", correct: false, feedback: "3+2=5, but you multiply coefficients, not add them." },
      { text: "\\(6x - 3\\)", correct: false, feedback: "x×x=x², not x. You lost one power of x." }
    ],
    retryHint: "Multiply the outside term by each inside term." },
  { itemId: "w4", order: 4, cluster: "FAC", clusterName: CLUSTER_NAMES.FAC,
    question: "Factorise: \\(4x^2 + 8x\\).",
    options: [
      { text: "\\(4x(x + 2)\\)", correct: true, feedback: "HCF of 4 and 8 is 4; common x." },
      { text: "\\(2x(2x + 4)\\)", correct: false, feedback: "Not fully factorised. The HCF is 4x." },
      { text: "\\(4(x^2 + 2x)\\)", correct: false, feedback: "The common factor x is missing." },
      { text: "\\(4x^2 + 8x\\) is already factorised", correct: false, feedback: "There is a common factor of 4x." }
    ],
    retryHint: "Find the highest common factor — both 4 and x." },
  { itemId: "w5", order: 5, cluster: "ALGF", clusterName: CLUSTER_NAMES.ALGF,
    question: "Simplify: \\(\\frac{6x^2}{3x}\\).",
    options: [
      { text: "\\(2x\\)", correct: true, feedback: "6÷3=2; x²÷x = x." },
      { text: "\\(2x^2\\)", correct: false, feedback: "x²÷x = x, not x². Subtract exponents." },
      { text: "\\(3x\\)", correct: false, feedback: "6÷3=2, not 3." },
      { text: "\\(2\\)", correct: false, feedback: "x²÷x = x, not nothing." }
    ],
    retryHint: "Divide the numbers and subtract the exponents." },
  { itemId: "w6", order: 6, cluster: "CON", clusterName: CLUSTER_NAMES.CON,
    question: "Write an expression for 'five less than three times a number \\(x\\)'.",
    options: [
      { text: "\\(3x - 5\\)", correct: true, feedback: "'Less than' reverses the order." },
      { text: "\\(5 - 3x\\)", correct: false, feedback: "That's 5 minus 3x — reversed order." },
      { text: "\\(3(x - 5)\\)", correct: false, feedback: "That's three times (x-5), a different expression." },
      { text: "\\(3x + 5\\)", correct: false, feedback: "That's five more than." }
    ],
    retryHint: "'Less than' means subtract from what comes after." },
  { itemId: "w7", order: 7, cluster: "REA", clusterName: CLUSTER_NAMES.REA,
    question: "Make \\(x\\) the subject of \\(y = 2x - 5\\).",
    options: [
      { text: "\\(x = \\frac{y+5}{2}\\)", correct: true, feedback: "Add 5, then divide by 2." },
      { text: "\\(x = \\frac{y}{2} + 5\\)", correct: false, feedback: "Add 5 first, then divide the whole thing by 2." },
      { text: "\\(x = 2y + 5\\)", correct: false, feedback: "Use inverse operations." },
      { text: "\\(x = \\frac{y-5}{2}\\)", correct: false, feedback: "Add 5, not subtract." }
    ],
    retryHint: "Add 5 to both sides, then divide by 2." },
  { itemId: "w8", order: 8, cluster: "EXT", clusterName: CLUSTER_NAMES.EXT,
    question: "A student simplified \\(3(x+2) - (x-1)\\) and got \\(2x+5\\). What went wrong?",
    options: [
      { text: "\\(-(x-1)\\) should be \\(-x+1\\), not \\(-x-1\\)", correct: true, feedback: "Correct answer: 2x+7." },
      { text: "3(x+2) was expanded incorrectly", correct: false, feedback: "3x+6 is correct." },
      { text: "The x-terms were combined incorrectly", correct: false, feedback: "3x-x=2x is correct." },
      { text: "Nothing — it is correct", correct: false, feedback: "The constant should be 7, not 5." }
    ],
    retryHint: "A minus sign before a bracket flips the signs inside." }
];

const diagnosticItems = [
  { itemId: "d1", order: 1, cluster: "SUB", clusterName: CLUSTER_NAMES.SUB,
    question: "If \\(x = -3\\), evaluate \\(2x^2 - 3x + 1\\).",
    options: [
      { text: "28", correct: true, feedback: "2×9 - 3×(-3) + 1 = 18 + 9 + 1 = 28." },
      { text: "10", correct: false, feedback: "You treated -3x as -9. (-3)×(-3)=+9." },
      { text: "-8", correct: false, feedback: "You squared -3 as -9." },
      { text: "1", correct: false, feedback: "You only kept the constant." }
    ],
    backward: "(-3)²=+9; -3×(-3)=+9.",
    forward: "Substituting negatives is essential for graphing." },
  { itemId: "d2", order: 2, cluster: "INDX", clusterName: CLUSTER_NAMES.INDX,
    question: "Simplify: \\(\\frac{x^5}{x^2}\\).",
    options: [
      { text: "\\(x^3\\)", correct: true, feedback: "Subtract exponents: 5-2=3." },
      { text: "\\(x^7\\)", correct: false, feedback: "Add exponents when multiplying, not dividing." },
      { text: "\\(x^{10}\\)", correct: false, feedback: "You multiplied the exponents." },
      { text: "\\(2.5\\)", correct: false, feedback: "Don't divide the exponents; subtract them." }
    ],
    backward: "x⁵/x² = x³.",
    forward: "Index laws are essential for algebraic fractions." },
  { itemId: "d3", order: 3, cluster: "EXP", clusterName: CLUSTER_NAMES.EXP,
    question: "Expand: \\(-2x(3 - x)\\).",
    options: [
      { text: "\\(-6x + 2x^2\\)", correct: true, feedback: "-2x×3=-6x; -2x×(-x)=+2x²." },
      { text: "\\(-6x - 2x^2\\)", correct: false, feedback: "-2x×(-x)=+2x², not -2x²." },
      { text: "\\(6x - 2x^2\\)", correct: false, feedback: "-2x×3=-6x, not +6x." },
      { text: "\\(-6x + 2x\\)", correct: false, feedback: "x×x = x², not x." }
    ],
    backward: "Distribute the negative coefficient.",
    forward: "Expanding with negatives is common in quadratics." },
  { itemId: "d4", order: 4, cluster: "FAC", clusterName: CLUSTER_NAMES.FAC,
    question: "Factorise \\(6x^2 + 9x\\) completely.",
    options: [
      { text: "\\(3x(2x + 3)\\)", correct: true, feedback: "HCF of 6 and 9 is 3; common x." },
      { text: "\\(3(2x^2 + 3x)\\)", correct: false, feedback: "x can also be taken out." },
      { text: "\\(x(6x + 9)\\)", correct: false, feedback: "HCF is 3x, not just x." },
      { text: "Already factorised", correct: false, feedback: "There is a common factor of 3x." }
    ],
    backward: "Take out the highest common factor.",
    forward: "Factorising is crucial for solving quadratics." },
  { itemId: "d5", order: 5, cluster: "ALGF", clusterName: CLUSTER_NAMES.ALGF,
    question: "Simplify: \\(\\frac{x^2 + 5x}{x}\\).",
    options: [
      { text: "\\(x + 5\\)", correct: true, feedback: "x²/x = x; 5x/x = 5." },
      { text: "\\(x^2 + 5\\)", correct: false, feedback: "You forgot to divide x² by x." },
      { text: "\\(5x\\)", correct: false, feedback: "x²/x = x, but you also need to divide 5x." },
      { text: "\\(x + 5x\\)", correct: false, feedback: "5x/x = 5, not 5x." }
    ],
    backward: "Divide each term by x.",
    forward: "Simplifying rational expressions." },
  { itemId: "d6", order: 6, cluster: "CON", clusterName: CLUSTER_NAMES.CON,
    question: "Write an expression for 'the product of a number \\(n\\) and three more than the number'.",
    options: [
      { text: "\\(n(n + 3)\\)", correct: true, feedback: "Product of n and (n+3)." },
      { text: "\\(n + 3n\\)", correct: false, feedback: "Product means multiply, not add." },
      { text: "\\(3n^2\\)", correct: false, feedback: "That's 3 times the square of n." },
      { text: "\\(n^2 + 3\\)", correct: false, feedback: "That's the square plus 3." }
    ],
    backward: "Product means multiplication.",
    forward: "Constructing expressions is key for word problems." },
  { itemId: "d7", order: 7, cluster: "REA", clusterName: CLUSTER_NAMES.REA,
    question: "Use \\(v = u + at\\). Find \\(v\\) when \\(u=2, a=5, t=4\\).",
    options: [
      { text: "22", correct: true, feedback: "v = 2 + 5×4 = 2 + 20 = 22." },
      { text: "11", correct: false, feedback: "You added: 2+5+4=11. v=u+at, not u+a+t." },
      { text: "28", correct: false, feedback: "You multiplied u×a=10, then +t=14? No." },
      { text: "40", correct: false, feedback: "You multiplied everything: 2×5×4=40." }
    ],
    backward: "Substitute and follow order of operations.",
    forward: "Using formulas is a key science skill." },
  { itemId: "d8", order: 8, cluster: "EXT", clusterName: CLUSTER_NAMES.EXT,
    question: "A student expanded \\((x+2)(x+3)\\) and got \\(x^2 + 6\\). What went wrong?",
    options: [
      { text: "Forgot the middle terms \\(2x+3x\\)", correct: true, feedback: "The middle terms give 5x." },
      { text: "Multiplied constants wrong", correct: false, feedback: "2×3=6 is correct." },
      { text: "Squared x incorrectly", correct: false, feedback: "x² is correct." },
      { text: "It is correct", correct: false, feedback: "No, the middle terms are missing." }
    ],
    backward: "FOIL ensures every term.",
    forward: "Error spotting sharpens checking skills." },
  { itemId: "d9", order: 9, cluster: "SUB", clusterName: CLUSTER_NAMES.SUB,
    question: "If \\(a = -1, b = 2, c = -3\\), evaluate \\(ab^2 - c^2\\).",
    options: [
      { text: "\\(-13\\)", correct: true, feedback: "(-1)×4 - 9 = -4 - 9 = -13." },
      { text: "5", correct: false, feedback: "You added: -4+9=5. It's minus c²." },
      { text: "\\(-5\\)", correct: false, feedback: "You computed -4 - (-9)=5? No." },
      { text: "13", correct: false, feedback: "You dropped the negative sign." }
    ],
    backward: "Square first, then multiply, then subtract.",
    forward: "Multi-variable substitution in physics." },
  { itemId: "d10", order: 10, cluster: "INDX", clusterName: CLUSTER_NAMES.INDX,
    question: "Simplify: \\((2x^2)^3\\).",
    options: [
      { text: "\\(8x^6\\)", correct: true, feedback: "2³=8; (x²)³=x⁶." },
      { text: "\\(6x^5\\)", correct: false, feedback: "2³=8, not 6. Multiply exponents." },
      { text: "\\(8x^5\\)", correct: false, feedback: "Multiply exponents: 2×3=6." },
      { text: "\\(2x^6\\)", correct: false, feedback: "Don't forget to cube the 2." }
    ],
    backward: "Cube the coefficient, multiply the exponents.",
    forward: "Power of a power rule." },
  { itemId: "d11", order: 11, cluster: "EXP", clusterName: CLUSTER_NAMES.EXP,
    question: "Expand and simplify: \\((x-1)(x+4)\\).",
    options: [
      { text: "\\(x^2 + 3x - 4\\)", correct: true, feedback: "x²+4x-x-4 = x²+3x-4." },
      { text: "\\(x^2 - 5x - 4\\)", correct: false, feedback: "-x+4x=+3x." },
      { text: "\\(x^2 + 3x + 4\\)", correct: false, feedback: "-1×4=-4." },
      { text: "\\(x^2 + 5x - 4\\)", correct: false, feedback: "-x+4x=3x, not 5x." }
    ],
    backward: "FOIL with signs.",
    forward: "Double brackets are the foundation for quadratics." },
  { itemId: "d12", order: 12, cluster: "FAC", clusterName: CLUSTER_NAMES.FAC,
    question: "Factorise completely: \\(-10x - 15\\).",
    options: [
      { text: "\\(-5(2x + 3)\\)", correct: true, feedback: "HCF is -5. Inside signs flip." },
      { text: "\\(5(-2x - 3)\\)", correct: false, feedback: "Take out -5, not 5." },
      { text: "\\(-5(2x - 3)\\)", correct: false, feedback: "-5 × -3 = +15." },
      { text: "\\(-10x - 15\\) cannot be factorised", correct: false, feedback: "It can." }
    ],
    backward: "Factorising with a negative flips signs inside.",
    forward: "Used when solving by dividing by a negative." },
  { itemId: "d13", order: 13, cluster: "ALGF", clusterName: CLUSTER_NAMES.ALGF,
    question: "Simplify: \\(\\frac{4x^2 - 2x}{2x}\\).",
    options: [
      { text: "\\(2x - 1\\)", correct: true, feedback: "4x²/2x=2x; -2x/2x=-1." },
      { text: "\\(2x + 1\\)", correct: false, feedback: "-2x/2x=-1." },
      { text: "\\(2x^2 - 1\\)", correct: false, feedback: "x²/x = x." },
      { text: "\\(4x - 1\\)", correct: false, feedback: "4/2=2." }
    ],
    backward: "Divide each term by 2x.",
    forward: "Simplifying rational expressions." },
  { itemId: "d14", order: 14, cluster: "CON", clusterName: CLUSTER_NAMES.CON,
    question: "A rectangle has length \\(3x+2\\) and width \\(x+1\\). Write its perimeter, simplified.",
    options: [
      { text: "\\(8x + 6\\)", correct: true, feedback: "P=2(3x+2+x+1)=2(4x+3)=8x+6." },
      { text: "\\(4x + 3\\)", correct: false, feedback: "That's the semi-perimeter." },
      { text: "\\(8x + 8\\)", correct: false, feedback: "2+1=3, doubled is 6." },
      { text: "\\(6x + 4\\)", correct: false, feedback: "You added dimensions without doubling." }
    ],
    backward: "Perimeter = 2×(l+w).",
    forward: "Geometric formulas in algebra." },
  { itemId: "d15", order: 15, cluster: "REA", clusterName: CLUSTER_NAMES.REA,
    question: "Make \\(t\\) the subject of \\(v = u + at\\).",
    options: [
      { text: "\\(t = \\frac{v-u}{a}\\)", correct: true, feedback: "Subtract u, then divide by a." },
      { text: "\\(t = \\frac{v}{a} - u\\)", correct: false, feedback: "Subtract u first." },
      { text: "\\(t = (v-u)a\\)", correct: false, feedback: "Divide, don't multiply." },
      { text: "\\(t = v - u - a\\)", correct: false, feedback: "Use inverse operations." }
    ],
    backward: "Reverse BIDMAS: undo addition, then multiplication.",
    forward: "Rearranging is essential in science." },
  { itemId: "d16", order: 16, cluster: "EXT", clusterName: CLUSTER_NAMES.EXT,
    question: "Is \\((x+2)^2 - (x-2)^2 = 8x\\) always true?",
    options: [
      { text: "Yes, it simplifies to \\(8x\\)", correct: true, feedback: "Expand: (x²+4x+4)-(x²-4x+4)=8x." },
      { text: "No, it should be \\(4x\\)", correct: false, feedback: "4x+4x=8x." },
      { text: "No, it should be 0", correct: false, feedback: "The terms don't cancel to zero." },
      { text: "Only when x is positive", correct: false, feedback: "It holds for all x." }
    ],
    backward: "Expand both squares and simplify.",
    forward: "Proof-like identities in competitions." },
  { itemId: "d17", order: 17, cluster: "SUB", clusterName: CLUSTER_NAMES.SUB,
    question: "If \\(p = -2\\), evaluate \\((p^2 + p)(p - 1)\\).",
    options: [
      { text: "\\(-6\\)", correct: true, feedback: "(4-2)×(-3)=2×(-3)=-6." },
      { text: "6", correct: false, feedback: "Sign error." },
      { text: "0", correct: false, feedback: "p²+p=2, not 0." },
      { text: "\\(-12\\)", correct: false, feedback: "p-1=-3, not -6." }
    ],
    backward: "Parentheses first.",
    forward: "Nested brackets in function evaluation." },
  { itemId: "d18", order: 18, cluster: "INDX", clusterName: CLUSTER_NAMES.INDX,
    question: "Simplify: \\(\\frac{x^4 \\times x^2}{x^3}\\).",
    options: [
      { text: "\\(x^3\\)", correct: true, feedback: "x⁴×x²=x⁶; x⁶/x³=x³." },
      { text: "\\(x^5\\)", correct: false, feedback: "6-3=3." },
      { text: "\\(x^6\\)", correct: false, feedback: "Forgot to divide." },
      { text: "\\(x^1\\)", correct: false, feedback: "6-3=3, not 1." }
    ],
    backward: "Multiply first, then divide.",
    forward: "Combining index laws." },
  { itemId: "d19", order: 19, cluster: "EXP", clusterName: CLUSTER_NAMES.EXP,
    question: "Expand and simplify: \\((2x+1)(x-3)\\).",
    options: [
      { text: "\\(2x^2 - 5x - 3\\)", correct: true, feedback: "2x²-6x+x-3 = 2x²-5x-3." },
      { text: "\\(2x^2 - 7x - 3\\)", correct: false, feedback: "-6x+x=-5x." },
      { text: "\\(2x^2 + 5x - 3\\)", correct: false, feedback: "The x term is negative." },
      { text: "\\(2x^2 - 5x + 3\\)", correct: false, feedback: "1×(-3)=-3." }
    ],
    backward: "FOIL with coefficients.",
    forward: "Quadratic expansion." },
  { itemId: "d20", order: 20, cluster: "FAC", clusterName: CLUSTER_NAMES.FAC,
    question: "Factorise: \\(24x^4y^2 - 18x^3y^3\\).",
    options: [
      { text: "\\(6x^3y^2(4x - 3y)\\)", correct: true, feedback: "HCF: 6, x³, y²." },
      { text: "\\(3x^3y^2(8x - 6y)\\)", correct: false, feedback: "HCF is 6, not 3." },
      { text: "\\(6x^4y^2(4 - 3y)\\)", correct: false, feedback: "x-power inside wrong." },
      { text: "\\(6x^3y^2(4x + 3y)\\)", correct: false, feedback: "Sign inside is wrong." }
    ],
    backward: "Highest common factor for numbers and variables.",
    forward: "Factorising with high powers." },
  { itemId: "d21", order: 21, cluster: "ALGF", clusterName: CLUSTER_NAMES.ALGF,
    question: "Simplify: \\(\\frac{6x^2 + 9x}{3x}\\).",
    options: [
      { text: "\\(2x + 3\\)", correct: true, feedback: "6x²/3x=2x; 9x/3x=3." },
      { text: "\\(2x^2 + 3x\\)", correct: false, feedback: "x²/x=x." },
      { text: "\\(2x + 9\\)", correct: false, feedback: "9x/3x=3." },
      { text: "\\(3x + 3\\)", correct: false, feedback: "6/3=2." }
    ],
    backward: "Divide each term by 3x.",
    forward: "Simplifying rational expressions." },
  { itemId: "d22", order: 22, cluster: "CON", clusterName: CLUSTER_NAMES.CON,
    question: "Car rental: £30/day + £0.15/km. Write a formula for cost \\(C\\) for \\(d\\) days and \\(k\\) km.",
    options: [
      { text: "\\(C = 30d + 0.15k\\)", correct: true, feedback: "Days and km are independent." },
      { text: "\\(C = 30 + 0.15dk\\)", correct: false, feedback: "They are added, not multiplied." },
      { text: "\\(C = 30d + 0.15\\)", correct: false, feedback: "Forgot to multiply by k." },
      { text: "\\(C = 30k + 0.15d\\)", correct: false, feedback: "Swapped rates." }
    ],
    backward: "Identify variable and constant parts.",
    forward: "Real-life formulas." },
  { itemId: "d23", order: 23, cluster: "REA", clusterName: CLUSTER_NAMES.REA,
    question: "Make \\(r\\) the subject of \\(C = 2\\pi r\\).",
    options: [
      { text: "\\(r = \\frac{C}{2\\pi}\\)", correct: true, feedback: "Divide both sides by 2π." },
      { text: "\\(r = 2\\pi C\\)", correct: false, feedback: "You multiplied." },
      { text: "\\(r = C - 2\\pi\\)", correct: false, feedback: "You subtracted." },
      { text: "\\(r = \\frac{C}{2}\\)", correct: false, feedback: "Don't forget π." }
    ],
    backward: "C=2πr → r=C/2π.",
    forward: "Rearranging geometry formulas." },
  { itemId: "d24", order: 24, cluster: "EXT", clusterName: CLUSTER_NAMES.EXT,
    question: "A plumber charges \\(C = 40 + 25h\\). A job costs £165. How many hours?",
    options: [
      { text: "5", correct: true, feedback: "165-40=125; 125÷25=5." },
      { text: "6", correct: false, feedback: "25×6=150, +40=190." },
      { text: "4", correct: false, feedback: "25×4=100, +40=140." },
      { text: "7", correct: false, feedback: "25×7=175, +40=215." }
    ],
    backward: "Substitute C=165 and solve.",
    forward: "Solving a formula for an unknown." }
];

const recheckItems = [
  { itemId: "r1", order: 1, cluster: "SUB", clusterName: CLUSTER_NAMES.SUB,
    question: "If \\(x = -4\\), evaluate \\(3x^2 + 2x - 1\\).",
    options: [
      { text: "39", correct: true, feedback: "3×16 + (-8) - 1 = 48 - 8 - 1 = 39." },
      { text: "\\(-39\\)", correct: false, feedback: "(-4)²=+16." },
      { text: "41", correct: false, feedback: "2x=-8, not +8." },
      { text: "47", correct: false, feedback: "48+8-1=55? No." }
    ] },
  { itemId: "r2", order: 2, cluster: "INDX", clusterName: CLUSTER_NAMES.INDX,
    question: "Simplify: \\(\\frac{x^6}{x^2}\\).",
    options: [
      { text: "\\(x^4\\)", correct: true, feedback: "6-2=4." },
      { text: "\\(x^3\\)", correct: false, feedback: "Subtract, don't divide." },
      { text: "\\(x^8\\)", correct: false, feedback: "Add when dividing? No." },
      { text: "\\(x^{12}\\)", correct: false, feedback: "Multiply? No." }
    ] },
  { itemId: "r3", order: 3, cluster: "EXP", clusterName: CLUSTER_NAMES.EXP,
    question: "Expand and simplify: \\((x+4)(x+1)\\).",
    options: [
      { text: "\\(x^2 + 5x + 4\\)", correct: true, feedback: "x²+1x+4x+4." },
      { text: "\\(x^2 + 5x + 5\\)", correct: false, feedback: "4×1=4." },
      { text: "\\(x^2 + 4x + 4\\)", correct: false, feedback: "x+4x=5x." },
      { text: "\\(x^2 + 5\\)", correct: false, feedback: "Don't forget the middle terms." }
    ] },
  { itemId: "r4", order: 4, cluster: "FAC", clusterName: CLUSTER_NAMES.FAC,
    question: "Factorise: \\(20x^2y - 15xy^2\\).",
    options: [
      { text: "\\(5xy(4x - 3y)\\)", correct: true, feedback: "HCF: 5, x, y." },
      { text: "\\(5(4x^2y - 3xy^2)\\)", correct: false, feedback: "xy can be taken out." },
      { text: "\\(5x(4xy - 3y^2)\\)", correct: false, feedback: "y is also common." },
      { text: "\\(5y(4x^2 - 3xy)\\)", correct: false, feedback: "x is also common." }
    ] },
  { itemId: "r5", order: 5, cluster: "ALGF", clusterName: CLUSTER_NAMES.ALGF,
    question: "Simplify: \\(\\frac{8x^2 - 4x}{4x}\\).",
    options: [
      { text: "\\(2x - 1\\)", correct: true, feedback: "8x²/4x=2x; -4x/4x=-1." },
      { text: "\\(2x + 1\\)", correct: false, feedback: "-4x/4x=-1." },
      { text: "\\(2x^2 - 1\\)", correct: false, feedback: "x²/x=x." },
      { text: "\\(8x - 1\\)", correct: false, feedback: "8/4=2." }
    ] },
  { itemId: "r6", order: 6, cluster: "CON", clusterName: CLUSTER_NAMES.CON,
    question: "Write an expression for 'the product of \\(n\\) and two less than \\(n\\)'.",
    options: [
      { text: "\\(n(n-2)\\)", correct: true, feedback: "Correct." },
      { text: "\\(n - 2n\\)", correct: false, feedback: "Product means multiply." },
      { text: "\\(2n - n\\)", correct: false, feedback: "Different expression." },
      { text: "\\(n^2 - 2\\)", correct: false, feedback: "Not the product." }
    ] },
  { itemId: "r7", order: 7, cluster: "REA", clusterName: CLUSTER_NAMES.REA,
    question: "Make \\(x\\) the subject of \\(y = 4x - 3\\).",
    options: [
      { text: "\\(x = \\frac{y+3}{4}\\)", correct: true, feedback: "Add 3, then divide by 4." },
      { text: "\\(x = \\frac{y}{4} + 3\\)", correct: false, feedback: "Add 3 first." },
      { text: "\\(x = 4y + 3\\)", correct: false, feedback: "Inverse operations." },
      { text: "\\(x = \\frac{y-3}{4}\\)", correct: false, feedback: "Add 3, not subtract." }
    ] },
  { itemId: "r8", order: 8, cluster: "EXT", clusterName: CLUSTER_NAMES.EXT,
    question: "\\((x+3)^2 - (x+3)(x-3) = 6x+18\\). Correct?",
    options: [
      { text: "Yes", correct: true, feedback: "(x²+6x+9)-(x²-9)=6x+18." },
      { text: "No, it should be \\(6x\\)", correct: false, feedback: "9-(-9)=18." },
      { text: "No, it should be \\(12x\\)", correct: false, feedback: "6x is correct." },
      { text: "No, it should be 0", correct: false, feedback: "They don't cancel completely." }
    ] },
  { itemId: "r9", order: 9, cluster: "SUB", clusterName: CLUSTER_NAMES.SUB,
    question: "If \\(a=-2, b=3\\), evaluate \\(a^2b + ab^2\\).",
    options: [
      { text: "\\(-6\\)", correct: true, feedback: "4×3 + (-2)×9 = 12-18=-6." },
      { text: "6", correct: false, feedback: "12-18=-6." },
      { text: "30", correct: false, feedback: "ab²=-18." },
      { text: "\\(-30\\)", correct: false, feedback: "a²b=12." }
    ] },
  { itemId: "r10", order: 10, cluster: "INDX", clusterName: CLUSTER_NAMES.INDX,
    question: "Simplify: \\((x^3)^2 \\times x\\).",
    options: [
      { text: "\\(x^7\\)", correct: true, feedback: "(x³)²=x⁶; x⁶×x=x⁷." },
      { text: "\\(x^6\\)", correct: false, feedback: "Don't forget the extra x." },
      { text: "\\(x^5\\)", correct: false, feedback: "3×2=6, +1=7." },
      { text: "\\(x^8\\)", correct: false, feedback: "6+1=7." }
    ] },
  { itemId: "r11", order: 11, cluster: "EXP", clusterName: CLUSTER_NAMES.EXP,
    question: "Expand and simplify: \\((3x-2)(x+1)\\).",
    options: [
      { text: "\\(3x^2 + x - 2\\)", correct: true, feedback: "3x²+3x-2x-2." },
      { text: "\\(3x^2 - x - 2\\)", correct: false, feedback: "3x-2x=+x." },
      { text: "\\(3x^2 + 5x - 2\\)", correct: false, feedback: "-2x+3x=x." },
      { text: "\\(3x^2 + x + 2\\)", correct: false, feedback: "-2×1=-2." }
    ] },
  { itemId: "r12", order: 12, cluster: "ALGF", clusterName: CLUSTER_NAMES.ALGF,
    question: "Simplify: \\(\\frac{3x^2 - 9x}{3x}\\).",
    options: [
      { text: "\\(x - 3\\)", correct: true, feedback: "3x²/3x=x; -9x/3x=-3." },
      { text: "\\(x + 3\\)", correct: false, feedback: "-9x/3x=-3." },
      { text: "\\(x^2 - 3\\)", correct: false, feedback: "x²/x=x." },
      { text: "\\(3x - 3\\)", correct: false, feedback: "3/3=1." }
    ] }
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
    title: "Expressions & Formulae — Speed & Strategy",
    subtitle: "Grade 8 · Level 4 · Speed & Strategy · Olympiad Simulation",
    description: "A 25-minute timed diagnostic mixing substitution, index laws, expanding, factorising, algebraic fractions, constructing, and rearranging formulas, with skip/review and a personalised recheck.",
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

// seed/mathSeedCh2AlgebraExpressionsL3.js
//
// Populates math_chapters and math_questions with Grade 8, Chapter 2
// (Expressions & Formulae), Level 3 — converted from the standalone
// HTML file ch2-algebra-expressions-level-3.html.
//
// Run with: node seed/mathSeedCh2AlgebraExpressionsL3.js

const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-8";
const GRADE_LABEL = "Grade 8";
const CHAPTER_SLUG = "ch-2-algebra-expressions";
const CHAPTER_NAME = "Expressions & Formulae";
const LEVEL = 3;

const CLUSTER_NAMES = {
  SUB: "Substitution",
  INDX: "Index Laws",
  EXP: "Expanding",
  ALGF: "Algebraic Fractions",
  CON: "Constructing",
  REA: "Rearranging & Using",
  EST: "Estimation",
  EXT: "Extension"
};

const warmupItems = [
  { itemId: "w1", order: 1, cluster: "SUB", clusterName: CLUSTER_NAMES.SUB,
    question: "If \\(x = -2\\), evaluate \\(x^2 + 3x - 5\\).",
    options: [
      { text: "\\(-7\\)", correct: true, feedback: "Correct. 4 + (-6) - 5 = -7." },
      { text: "\\(-3\\)", correct: false, feedback: "You treated 3x as +6 instead of -6. 3×(-2)=-6, so 4-6-5=-7." },
      { text: "5", correct: false, feedback: "You squared -2 as -4. (-2)²=+4." },
      { text: "3", correct: false, feedback: "You computed 4+6-5=5 and then took the negative? 4-6-5=-7." }
    ],
    retryHint: "(-2)²=+4; 3×(-2)=-6; 4-6-5=-7." },
  { itemId: "w2", order: 2, cluster: "INDX", clusterName: CLUSTER_NAMES.INDX,
    question: "Simplify: \\((x^2)^3 \\times x^{-1}\\). (Hint: \\(x^{-1} = \\frac{1}{x}\\))",
    options: [
      { text: "\\(x^5\\)", correct: true, feedback: "(x²)³=x⁶; x⁶ × x⁻¹ = x⁵." },
      { text: "\\(x^7\\)", correct: false, feedback: "You added 6+1=7, but x⁻¹ means divide, so subtract: 6-1=5." },
      { text: "\\(x^6\\)", correct: false, feedback: "Don't forget to multiply by x⁻¹. 6-1=5." },
      { text: "\\(x^8\\)", correct: false, feedback: "You multiplied the exponents: 2×3=6, then 6+2=8? x⁻¹ subtracts 1." }
    ],
    retryHint: "(x²)³=x⁶. x⁻¹ = 1/x, so x⁶/x = x⁵." },
  { itemId: "w3", order: 3, cluster: "EXP", clusterName: CLUSTER_NAMES.EXP,
    question: "Expand and simplify: \\((x+2)(x+3)\\).",
    options: [
      { text: "\\(x^2 + 5x + 6\\)", correct: true, feedback: "FOIL: x²+3x+2x+6 = x²+5x+6." },
      { text: "\\(x^2 + 6\\)", correct: false, feedback: "Don't forget the middle terms: 3x and 2x." },
      { text: "\\(x^2 + 5x + 5\\)", correct: false, feedback: "2×3=6, not 5." },
      { text: "\\(x^2 + 6x + 6\\)", correct: false, feedback: "3x+2x=5x, not 6x." }
    ],
    retryHint: "Use FOIL: First, Outer, Inner, Last." },
  { itemId: "w4", order: 4, cluster: "ALGF", clusterName: CLUSTER_NAMES.ALGF,
    question: "Simplify: \\(\\frac{6x^2}{3x}\\).",
    options: [
      { text: "\\(2x\\)", correct: true, feedback: "6÷3=2, x²÷x=x." },
      { text: "\\(2x^2\\)", correct: false, feedback: "x²÷x=x, not x². Subtract exponents." },
      { text: "\\(3x\\)", correct: false, feedback: "6÷3=2, not 3." },
      { text: "\\(2\\)", correct: false, feedback: "x²÷x=x, not nothing. The answer is 2x." }
    ],
    retryHint: "Divide the numbers and subtract the exponents." },
  { itemId: "w5", order: 5, cluster: "CON", clusterName: CLUSTER_NAMES.CON,
    question: "Write an expression for 'the product of a number \\(n\\) and three more than the number'.",
    options: [
      { text: "\\(n(n+3)\\)", correct: true, feedback: "The product of n and (n+3) is n(n+3)." },
      { text: "\\(n + 3n\\)", correct: false, feedback: "Product means multiply, not add." },
      { text: "\\(3n^2\\)", correct: false, feedback: "That's 3 times the square of n — not the product of n and (n+3)." },
      { text: "\\(n^2 + 3\\)", correct: false, feedback: "That's the square of n plus 3 — not the product." }
    ],
    retryHint: "Product of a and b means a × b." },
  { itemId: "w6", order: 6, cluster: "REA", clusterName: CLUSTER_NAMES.REA,
    question: "Make \\(x\\) the subject of \\(y = 2x - 5\\).",
    options: [
      { text: "\\(x = \\frac{y+5}{2}\\)", correct: true, feedback: "Add 5 to both sides: y+5=2x. Then divide by 2." },
      { text: "\\(x = \\frac{y}{2} + 5\\)", correct: false, feedback: "Add 5 first, then divide the whole thing by 2." },
      { text: "\\(x = 2y + 5\\)", correct: false, feedback: "Use inverse operations: the opposite of -5 is +5, the opposite of ×2 is ÷2." },
      { text: "\\(x = \\frac{y-5}{2}\\)", correct: false, feedback: "You subtracted 5. To undo -5, you need to add 5." }
    ],
    retryHint: "Add 5 to both sides, then divide by 2." },
  { itemId: "w7", order: 7, cluster: "EST", clusterName: CLUSTER_NAMES.EST,
    question: "Estimate \\((2.1)^2 + 3(2.1) - 1\\).",
    options: [
      { text: "9", correct: true, feedback: "Round 2.1 to 2. 2²=4, 3×2=6, 4+6-1=9." },
      { text: "10", correct: false, feedback: "4+6-1=9, not 10." },
      { text: "8", correct: false, feedback: "4+6-1=9, not 8." },
      { text: "11", correct: false, feedback: "You rounded 2.1 to 3? 9+9-1=17, not 11." }
    ],
    retryHint: "Round 2.1 to 2. Then substitute and compute." },
  { itemId: "w8", order: 8, cluster: "EXT", clusterName: CLUSTER_NAMES.EXT,
    question: "A student simplified \\(3(x+2) - (x-1)\\) and got \\(2x+5\\). What went wrong?",
    options: [
      { text: "\\(-(x-1)\\) should be \\(-x+1\\), not \\(-x-1\\)", correct: true, feedback: "Correct. The correct answer is 2x+7." },
      { text: "The 3 was not multiplied correctly", correct: false, feedback: "3(x+2)=3x+6 is correct." },
      { text: "The x-terms were combined incorrectly", correct: false, feedback: "3x-x=2x is correct." },
      { text: "The constants were added incorrectly", correct: false, feedback: "6+1=7, and that's what the corrected version gives. The error was making it 6-1=5." }
    ],
    retryHint: "A minus sign before a bracket changes the sign of both terms inside." }
];

const diagnosticItems = [
  { itemId: "d1", order: 1, cluster: "SUB", clusterName: CLUSTER_NAMES.SUB,
    question: "If \\(x = -3\\), evaluate \\(2x^2 + 3x - 4\\).",
    options: [
      { text: "5", correct: true, feedback: "2×9 + (-9) - 4 = 18 - 9 - 4 = 5." },
      { text: "\\(-13\\)", correct: false, feedback: "You squared -3 as -9 AND treated 3x as +9." },
      { text: "23", correct: false, feedback: "You treated both terms as positive: 18+9-4=23. 3x when x=-3 is -9, not +9." },
      { text: "\\(-5\\)", correct: false, feedback: "2(-3)²=18, 3(-3)=-9, 18-9-4=5." }
    ],
    backward: "(-3)²=+9; 3×(-3)=-9.",
    forward: "Substituting negative values is essential for graphing functions." },
  { itemId: "d2", order: 2, cluster: "INDX", clusterName: CLUSTER_NAMES.INDX,
    question: "Simplify: \\(\\frac{x^4 \\times x^2}{x^3}\\).",
    options: [
      { text: "\\(x^3\\)", correct: true, feedback: "x⁴×x²=x⁶; x⁶/x³=x³." },
      { text: "\\(x^5\\)", correct: false, feedback: "You added 4+2=6, then subtracted 3 incorrectly to get 5? 6-3=3." },
      { text: "\\(x^6\\)", correct: false, feedback: "You multiplied but forgot to divide by x³." },
      { text: "\\(x^1\\)", correct: false, feedback: "You subtracted all exponents: 4+2-3=3, not 1." }
    ],
    backward: "Multiply first (add exponents), then divide (subtract).",
    forward: "Index laws are used in standard form and algebraic fractions." },
  { itemId: "d3", order: 3, cluster: "EXP", clusterName: CLUSTER_NAMES.EXP,
    question: "Expand and simplify: \\((x+5)(x-2)\\).",
    options: [
      { text: "\\(x^2 + 3x - 10\\)", correct: true, feedback: "x²-2x+5x-10 = x²+3x-10." },
      { text: "\\(x^2 + 3x + 10\\)", correct: false, feedback: "5×(-2)=-10, not +10." },
      { text: "\\(x^2 + 7x - 10\\)", correct: false, feedback: "-2x+5x=+3x, not +7x." },
      { text: "\\(x^2 - 10\\)", correct: false, feedback: "Don't forget the middle terms: -2x and +5x." }
    ],
    backward: "FOIL: (x+a)(x+b)=x²+(a+b)x+ab.",
    forward: "Double bracket expansion is the foundation for quadratic factorisation." },
  { itemId: "d4", order: 4, cluster: "ALGF", clusterName: CLUSTER_NAMES.ALGF,
    question: "Simplify: \\(\\frac{x^2 + 3x}{x}\\).",
    options: [
      { text: "\\(x + 3\\)", correct: true, feedback: "Divide each term: x²/x=x, 3x/x=3." },
      { text: "\\(x^2 + 3\\)", correct: false, feedback: "You forgot to divide the x² term by x. x²/x=x, not x²." },
      { text: "\\(3x\\)", correct: false, feedback: "x²/x=x, but you also need to divide the 3x term." },
      { text: "\\(x + 3x\\)", correct: false, feedback: "3x/x=3, not 3x. Divide the x as well." }
    ],
    backward: "Factor the numerator: x(x+3)/x = x+3.",
    forward: "Simplifying algebraic fractions is essential for solving rational equations." },
  { itemId: "d5", order: 5, cluster: "CON", clusterName: CLUSTER_NAMES.CON,
    question: "A rectangle has length \\((x+5)\\) and width \\((x+2)\\). Write an expression for its area, expanded.",
    options: [
      { text: "\\(x^2 + 7x + 10\\)", correct: true, feedback: "(x+5)(x+2)=x²+2x+5x+10 = x²+7x+10." },
      { text: "\\(x^2 + 10\\)", correct: false, feedback: "Don't forget the middle terms: 2x and 5x." },
      { text: "\\(2x + 7\\)", correct: false, feedback: "That's the sum of length and width, not the area. Area=length×width." },
      { text: "\\(x^2 + 7x + 7\\)", correct: false, feedback: "5×2=10, not 7." }
    ],
    backward: "Area = length × width. Expand double brackets.",
    forward: "Deriving area formulas builds connections between geometry and algebra." },
  { itemId: "d6", order: 6, cluster: "REA", clusterName: CLUSTER_NAMES.REA,
    question: "Use the formula \\(v = u + at\\). Find \\(v\\) when \\(u=5, a=10, t=3\\).",
    options: [
      { text: "35", correct: true, feedback: "v = 5 + 10×3 = 5 + 30 = 35." },
      { text: "18", correct: false, feedback: "You added all three numbers: 5+10+3=18. The formula is v=u+at, not v=u+a+t." },
      { text: "50", correct: false, feedback: "You multiplied u×a=50. The formula is u + (a×t), not u×a." },
      { text: "80", correct: false, feedback: "5+10×3 = 5+30=35. Multiplication before addition." }
    ],
    backward: "Substitute the known values, then follow order of operations.",
    forward: "Using formulas is a key skill in science and engineering." },
  { itemId: "d7", order: 7, cluster: "EST", clusterName: CLUSTER_NAMES.EST,
    question: "For \\(y = x^2 - 4x\\), estimate \\(y\\) when \\(x = 3.9\\).",
    options: [
      { text: "0", correct: true, feedback: "Round 3.9 to 4. 16-16=0." },
      { text: "1", correct: false, feedback: "16-16=0, not 1. You may have miscalculated." },
      { text: "4", correct: false, feedback: "You used x=4 but forgot to square? 4²=16, 4×4=16, 16-16=0." },
      { text: "\\(-1\\)", correct: false, feedback: "16-16=0, not -1. Check your subtraction." }
    ],
    backward: "Round the input, then substitute and compute.",
    forward: "Estimation helps verify calculator results quickly." },
  { itemId: "d8", order: 8, cluster: "EXT", clusterName: CLUSTER_NAMES.EXT,
    question: "A student expanded \\((x+2)(x+3)\\) and got \\(x^2 + 6\\). What went wrong?",
    options: [
      { text: "Forgot the middle terms \\(2x+3x\\)", correct: true, feedback: "The middle terms 2x+3x=5x are missing." },
      { text: "Multiplied the constants wrong", correct: false, feedback: "2×3=6 is correct. The error is the missing middle terms." },
      { text: "Squared the x incorrectly", correct: false, feedback: "x² is correct." },
      { text: "The expansion is actually correct", correct: false, feedback: "No, the middle terms are missing." }
    ],
    backward: "FOIL ensures every term is multiplied.",
    forward: "Error spotting sharpens checking skills for tests." },
  { itemId: "d9", order: 9, cluster: "SUB", clusterName: CLUSTER_NAMES.SUB,
    question: "If \\(a = -1, b = 2, c = -3\\), evaluate \\(ab^2 - bc^2\\).",
    options: [
      { text: "\\(-22\\)", correct: true, feedback: "(-1)×4 - 2×9 = -4 - 18 = -22." },
      { text: "14", correct: false, feedback: "You added instead of subtracted: -4+18=14. It's minus, not plus." },
      { text: "22", correct: false, feedback: "You dropped the negative sign: 4+18=22." },
      { text: "\\(-14\\)", correct: false, feedback: "-4-18=-22, not -14." }
    ],
    backward: "Square first, then multiply, then subtract.",
    forward: "Multi-variable substitution appears in physics formulas." },
  { itemId: "d10", order: 10, cluster: "INDX", clusterName: CLUSTER_NAMES.INDX,
    question: "Simplify: \\((2x^2)^3 \\div 4x^4\\).",
    options: [
      { text: "\\(2x^2\\)", correct: true, feedback: "(2x²)³=8x⁶; 8x⁶/4x⁴ = 2x²." },
      { text: "\\(2x^3\\)", correct: false, feedback: "x⁶/x⁴=x², not x³. Subtract exponents: 6-4=2." },
      { text: "\\(8x^2\\)", correct: false, feedback: "Don't forget to divide by 4: 8/4=2." },
      { text: "\\(2x^{10}\\)", correct: false, feedback: "You multiplied the exponents: 6×4=24? Divide, don't multiply." }
    ],
    backward: "Apply the power first, then divide coefficients and subtract exponents.",
    forward: "Combining index laws is essential for simplifying complex expressions." },
  { itemId: "d11", order: 11, cluster: "EXP", clusterName: CLUSTER_NAMES.EXP,
    question: "Expand and simplify: \\((2x+1)(x-3)\\).",
    options: [
      { text: "\\(2x^2 - 5x - 3\\)", correct: true, feedback: "2x²-6x+x-3 = 2x²-5x-3." },
      { text: "\\(2x^2 - 7x - 3\\)", correct: false, feedback: "-6x+x=-5x, not -7x." },
      { text: "\\(2x^2 + 5x - 3\\)", correct: false, feedback: "The x term is negative: -6x+x=-5x." },
      { text: "\\(2x^2 - 5x + 3\\)", correct: false, feedback: "1×(-3)=-3, not +3." }
    ],
    backward: "FOIL with a coefficient on the first term.",
    forward: "Expanding with coefficients is essential for quadratic equations." },
  { itemId: "d12", order: 12, cluster: "ALGF", clusterName: CLUSTER_NAMES.ALGF,
    question: "Simplify: \\(\\frac{4x^2 - 2x}{2x}\\).",
    options: [
      { text: "\\(2x - 1\\)", correct: true, feedback: "4x²/2x=2x; -2x/2x=-1." },
      { text: "\\(2x + 1\\)", correct: false, feedback: "-2x/2x=-1, not +1." },
      { text: "\\(2x^2 - 1\\)", correct: false, feedback: "4x²/2x=2x, not 2x². Subtract exponents." },
      { text: "\\(4x - 1\\)", correct: false, feedback: "4/2=2, not 4." }
    ],
    backward: "Divide each term in the numerator by the denominator.",
    forward: "Simplifying algebraic fractions is used in calculus and graphing." },
  { itemId: "d13", order: 13, cluster: "CON", clusterName: CLUSTER_NAMES.CON,
    question: "Write an expression for 'the sum of a number \\(n\\) and its square'.",
    options: [
      { text: "\\(n + n^2\\)", correct: true, feedback: "Sum means addition: n plus n²." },
      { text: "\\(n \\times n^2\\)", correct: false, feedback: "That's the product, not the sum." },
      { text: "\\(2n^2\\)", correct: false, feedback: "That's twice the square — not n + n²." },
      { text: "\\(n^2 - n\\)", correct: false, feedback: "That's the difference, not the sum." }
    ],
    backward: "Sum means addition.",
    forward: "Constructing expressions is the first step in word problems." },
  { itemId: "d14", order: 14, cluster: "REA", clusterName: CLUSTER_NAMES.REA,
    question: "Make \\(t\\) the subject of \\(v = u + at\\).",
    options: [
      { text: "\\(t = \\frac{v-u}{a}\\)", correct: true, feedback: "Subtract u: v-u=at. Then divide by a: (v-u)/a=t." },
      { text: "\\(t = \\frac{v}{a} - u\\)", correct: false, feedback: "You divided by a before subtracting u. Subtract u first." },
      { text: "\\(t = (v-u)a\\)", correct: false, feedback: "You multiplied by a instead of dividing. To undo ×a, you ÷a." },
      { text: "\\(t = v - u - a\\)", correct: false, feedback: "You subtracted both u and a. Use division for the multiplication." }
    ],
    backward: "Perform inverse operations in reverse order.",
    forward: "Rearranging formulas is essential in science for solving for any variable." },
  { itemId: "d15", order: 15, cluster: "EST", clusterName: CLUSTER_NAMES.EST,
    question: "A formula gives \\(P = 2(l+w)\\). If \\(l \\approx 5.1, w \\approx 3.9\\), estimate \\(P\\).",
    options: [
      { text: "18", correct: true, feedback: "5+4=9; 2×9=18." },
      { text: "16", correct: false, feedback: "5.1+3.9=9 exactly, doubled is 18. You may have rounded to 5+3=8." },
      { text: "20", correct: false, feedback: "You rounded 5.1 to 5 and 3.9 to 5? 2×(5+5)=20." },
      { text: "14", correct: false, feedback: "You rounded 3.9 to 2 instead of 4." }
    ],
    backward: "Round each number first, then compute.",
    forward: "Estimation is used to check the reasonableness of answers." },
  { itemId: "d16", order: 16, cluster: "EXT", clusterName: CLUSTER_NAMES.EXT,
    question: "A student simplified \\(2x(x+3) - x(x-2)\\) and got \\(x^2 + 8x\\). Is this correct?",
    options: [
      { text: "Yes, it is correct", correct: true, feedback: "2x²+6x-x²+2x = x²+8x." },
      { text: "No, it should be \\(x^2 + 4x\\)", correct: false, feedback: "6x+2x=8x, not 4x." },
      { text: "No, it should be \\(3x^2 + 8x\\)", correct: false, feedback: "2x²-x²=x², not 3x²." },
      { text: "No, it should be \\(x^2 + 8x + 6\\)", correct: false, feedback: "There is no constant term — the xs cancel the constants." }
    ],
    backward: "Expand each part, then collect like terms.",
    forward: "Sometimes there is no error — verify carefully." },
  { itemId: "d17", order: 17, cluster: "SUB", clusterName: CLUSTER_NAMES.SUB,
    question: "If \\(p = -2\\), evaluate \\((p^2 + p)(p - 1)\\).",
    options: [
      { text: "\\(-6\\)", correct: true, feedback: "(4-2)×(-3)=2×(-3)=-6." },
      { text: "6", correct: false, feedback: "Sign error: 2×(-3)=-6, not +6." },
      { text: "0", correct: false, feedback: "p²+p=4-2=2, not 0." },
      { text: "\\(-12\\)", correct: false, feedback: "p-1=-3, not -6." }
    ],
    backward: "Compute inside parentheses first.",
    forward: "Substitution with nested brackets appears in function evaluation." },
  { itemId: "d18", order: 18, cluster: "INDX", clusterName: CLUSTER_NAMES.INDX,
    question: "Simplify: \\(\\frac{3x^2 \\times 2x^3}{6x^4}\\).",
    options: [
      { text: "\\(x\\)", correct: true, feedback: "3×2=6, x²×x³=x⁵. 6x⁵/6x⁴ = x." },
      { text: "\\(x^2\\)", correct: false, feedback: "x⁵/x⁴=x, not x². Subtract exponents: 5-4=1." },
      { text: "\\(6x\\)", correct: false, feedback: "6/6=1, not 6. The coefficient cancels." },
      { text: "1", correct: false, feedback: "x⁵/x⁴=x, not 1. The x doesn't cancel completely." }
    ],
    backward: "Multiply the numerator first, then divide.",
    forward: "Simplifying complex fractions is a key algebraic skill." },
  { itemId: "d19", order: 19, cluster: "EXP", clusterName: CLUSTER_NAMES.EXP,
    question: "Expand and simplify: \\((x-2)^2\\).",
    options: [
      { text: "\\(x^2 - 4x + 4\\)", correct: true, feedback: "(x-2)(x-2)=x²-4x+4." },
      { text: "\\(x^2 + 4\\)", correct: false, feedback: "Don't forget the middle term: -2x-2x=-4x." },
      { text: "\\(x^2 - 4x - 4\\)", correct: false, feedback: "(-2)×(-2)=+4, not -4." },
      { text: "\\(x^2 + 4x + 4\\)", correct: false, feedback: "The middle term should be negative: -2x-2x=-4x." }
    ],
    backward: "(a-b)² = a² - 2ab + b².",
    forward: "Perfect squares appear in completing the square later." },
  { itemId: "d20", order: 20, cluster: "ALGF", clusterName: CLUSTER_NAMES.ALGF,
    question: "Simplify: \\(\\frac{6x^2 + 9x}{3x}\\).",
    options: [
      { text: "\\(2x + 3\\)", correct: true, feedback: "6x²/3x=2x; 9x/3x=3." },
      { text: "\\(2x^2 + 3x\\)", correct: false, feedback: "x²/x=x, not x². Subtract exponents." },
      { text: "\\(2x + 9\\)", correct: false, feedback: "9x/3x=3, not 9." },
      { text: "\\(3x + 3\\)", correct: false, feedback: "6/3=2, not 3." }
    ],
    backward: "Divide each term by the denominator.",
    forward: "This skill is used in simplifying rational expressions." },
  { itemId: "d21", order: 21, cluster: "CON", clusterName: CLUSTER_NAMES.CON,
    question: "A rectangle has area \\(x^2 + 7x + 10\\) and length \\(x+5\\). Find its width.",
    options: [
      { text: "\\(x + 2\\)", correct: true, feedback: "(x+5)(x+2)=x²+7x+10, so width=x+2." },
      { text: "\\(x + 5\\)", correct: false, feedback: "That's the length, not the width." },
      { text: "\\(x + 10\\)", correct: false, feedback: "(x+5)(x+10)=x²+15x+50, not x²+7x+10." },
      { text: "\\(2x + 7\\)", correct: false, feedback: "That would be the perimeter? Area=length×width." }
    ],
    backward: "Divide the area by the length, or factorise the quadratic.",
    forward: "Reverse reasoning is used in geometric problems and design." },
  { itemId: "d22", order: 22, cluster: "REA", clusterName: CLUSTER_NAMES.REA,
    question: "Make \\(r\\) the subject of \\(C = 2\\pi r\\).",
    options: [
      { text: "\\(r = \\frac{C}{2\\pi}\\)", correct: true, feedback: "Divide both sides by 2π." },
      { text: "\\(r = 2\\pi C\\)", correct: false, feedback: "You multiplied instead of dividing." },
      { text: "\\(r = C - 2\\pi\\)", correct: false, feedback: "You subtracted. Use division to undo multiplication." },
      { text: "\\(r = \\frac{C}{2}\\)", correct: false, feedback: "Don't forget to divide by π as well." }
    ],
    backward: "Circumference formula: C=2πr.",
    forward: "Rearranging formulas is essential in geometry and science." },
  { itemId: "d23", order: 23, cluster: "EST", clusterName: CLUSTER_NAMES.EST,
    question: "Estimate \\(\\sqrt{4x^2}\\) when \\(x = -5.2\\).",
    options: [
      { text: "10", correct: true, feedback: "4×(-5.2)²≈4×25=100; √100=10." },
      { text: "\\(-10\\)", correct: false, feedback: "The square root symbol gives the principal (non-negative) root." },
      { text: "5", correct: false, feedback: "√100=10, not 5." },
      { text: "20", correct: false, feedback: "You doubled the answer: √100=10, not 20." }
    ],
    backward: "Square first (the negative disappears), multiply by 4, then square root.",
    forward: "Estimation with powers and roots is used in physics." },
  { itemId: "d24", order: 24, cluster: "EXT", clusterName: CLUSTER_NAMES.EXT,
    question: "Is it always true that \\((x+2)^2 - (x-2)^2 = 8x\\)?",
    options: [
      { text: "Yes, it simplifies to \\(8x\\)", correct: true, feedback: "(x²+4x+4)-(x²-4x+4)=8x." },
      { text: "No, it should be \\(4x\\)", correct: false, feedback: "Expand carefully: 4x+4x=8x, not 4x." },
      { text: "No, it should be 0", correct: false, feedback: "The terms don't cancel completely — the x terms add." },
      { text: "Only when \\(x\\) is positive", correct: false, feedback: "The identity holds for all values of x." }
    ],
    backward: "Expand both squares, then simplify.",
    forward: "Proof-like identities appear in algebra competitions." }
];

const recheckItems = [
  { itemId: "r1", order: 1, cluster: "SUB", clusterName: CLUSTER_NAMES.SUB,
    question: "If \\(x = -4\\), evaluate \\(3x^2 + 2x - 1\\).",
    options: [
      { text: "39", correct: true, feedback: "3×16 + (-8) - 1 = 48 - 8 - 1 = 39." },
      { text: "\\(-39\\)", correct: false, feedback: "You squared -4 as -16. (-4)²=+16." },
      { text: "41", correct: false, feedback: "You treated 2x as +8. 2×(-4)=-8." },
      { text: "47", correct: false, feedback: "48+8-1=55? No, 39 is correct." }
    ] },
  { itemId: "r2", order: 2, cluster: "INDX", clusterName: CLUSTER_NAMES.INDX,
    question: "Simplify: \\(\\frac{x^6}{x^2}\\).",
    options: [
      { text: "\\(x^4\\)", correct: true, feedback: "Subtract exponents: 6-2=4." },
      { text: "\\(x^3\\)", correct: false, feedback: "You subtract exponents, not divide them." },
      { text: "\\(x^8\\)", correct: false, feedback: "You added the exponents. Subtract when dividing." },
      { text: "\\(x^{12}\\)", correct: false, feedback: "You multiplied the exponents." }
    ] },
  { itemId: "r3", order: 3, cluster: "EXP", clusterName: CLUSTER_NAMES.EXP,
    question: "Expand and simplify: \\((x+4)(x+1)\\).",
    options: [
      { text: "\\(x^2 + 5x + 4\\)", correct: true, feedback: "x²+1x+4x+4 = x²+5x+4." },
      { text: "\\(x^2 + 5x + 5\\)", correct: false, feedback: "4×1=4, not 5." },
      { text: "\\(x^2 + 4x + 4\\)", correct: false, feedback: "x+4x=5x, not 4x." },
      { text: "\\(x^2 + 5\\)", correct: false, feedback: "Don't forget the middle terms." }
    ] },
  { itemId: "r4", order: 4, cluster: "ALGF", clusterName: CLUSTER_NAMES.ALGF,
    question: "Simplify: \\(\\frac{8x^2 - 4x}{4x}\\).",
    options: [
      { text: "\\(2x - 1\\)", correct: true, feedback: "8x²/4x=2x; -4x/4x=-1." },
      { text: "\\(2x + 1\\)", correct: false, feedback: "-4x/4x=-1, not +1." },
      { text: "\\(2x^2 - 1\\)", correct: false, feedback: "x²/x=x, not x²." },
      { text: "\\(8x - 1\\)", correct: false, feedback: "8/4=2, not 8." }
    ] },
  { itemId: "r5", order: 5, cluster: "CON", clusterName: CLUSTER_NAMES.CON,
    question: "Write an expression for 'the product of a number \\(n\\) and two less than the number'.",
    options: [
      { text: "\\(n(n-2)\\)", correct: true, feedback: "Correct. Two less than n is n-2." },
      { text: "\\(n - 2n\\)", correct: false, feedback: "Product means multiplication, not subtraction." },
      { text: "\\(2n - n\\)", correct: false, feedback: "That's two times n minus n — a different expression." },
      { text: "\\(n^2 - 2\\)", correct: false, feedback: "That's the square of n minus 2 — not the product." }
    ] },
  { itemId: "r6", order: 6, cluster: "REA", clusterName: CLUSTER_NAMES.REA,
    question: "Make \\(x\\) the subject of \\(y = 4x - 3\\).",
    options: [
      { text: "\\(x = \\frac{y+3}{4}\\)", correct: true, feedback: "Add 3, then divide by 4." },
      { text: "\\(x = \\frac{y}{4} + 3\\)", correct: false, feedback: "Add 3 first, then divide the whole thing by 4." },
      { text: "\\(x = 4y + 3\\)", correct: false, feedback: "Use inverse operations." },
      { text: "\\(x = \\frac{y-3}{4}\\)", correct: false, feedback: "Add 3 to both sides, not subtract." }
    ] },
  { itemId: "r7", order: 7, cluster: "EST", clusterName: CLUSTER_NAMES.EST,
    question: "Estimate \\((1.9)^2 + 2(1.9) - 3\\).",
    options: [
      { text: "5", correct: true, feedback: "Round 1.9 to 2. 4+4-3=5." },
      { text: "6", correct: false, feedback: "4+4-3=5, not 6." },
      { text: "4", correct: false, feedback: "You forgot the 2(1.9) term." },
      { text: "3", correct: false, feedback: "You rounded 1.9 to 1? 1+2-3=0." }
    ] },
  { itemId: "r8", order: 8, cluster: "EXT", clusterName: CLUSTER_NAMES.EXT,
    question: "\\((x+3)^2 - (x+3)(x-3) = 6x+18\\). Is this correct?",
    options: [
      { text: "Yes", correct: true, feedback: "(x²+6x+9)-(x²-9)=6x+18." },
      { text: "No, it should be \\(6x\\)", correct: false, feedback: "9-(-9)=18, so the constant is 18." },
      { text: "No, it should be \\(12x\\)", correct: false, feedback: "6x is correct for the x term." },
      { text: "No, it should be 0", correct: false, feedback: "The terms don't cancel completely." }
    ] },
  { itemId: "r9", order: 9, cluster: "SUB", clusterName: CLUSTER_NAMES.SUB,
    question: "If \\(a = -2, b = 3\\), evaluate \\(a^2b + ab^2\\).",
    options: [
      { text: "\\(-6\\)", correct: true, feedback: "4×3 + (-2)×9 = 12 - 18 = -6." },
      { text: "6", correct: false, feedback: "12-18=-6, not +6." },
      { text: "30", correct: false, feedback: "You treated ab² as +18. (-2)×9=-18." },
      { text: "\\(-30\\)", correct: false, feedback: "You treated a²b as -12. (-2)²=+4." }
    ] },
  { itemId: "r10", order: 10, cluster: "EXP", clusterName: CLUSTER_NAMES.EXP,
    question: "Expand and simplify: \\((3x-2)(x+1)\\).",
    options: [
      { text: "\\(3x^2 + x - 2\\)", correct: true, feedback: "3x²+3x-2x-2 = 3x²+x-2." },
      { text: "\\(3x^2 - x - 2\\)", correct: false, feedback: "3x-2x=+x, not -x." },
      { text: "\\(3x^2 + 5x - 2\\)", correct: false, feedback: "-2x+3x=x, not 5x." },
      { text: "\\(3x^2 + x + 2\\)", correct: false, feedback: "-2×1=-2, not +2." }
    ] },
  { itemId: "r11", order: 11, cluster: "ALGF", clusterName: CLUSTER_NAMES.ALGF,
    question: "Simplify: \\(\\frac{3x^2 - 9x}{3x}\\).",
    options: [
      { text: "\\(x - 3\\)", correct: true, feedback: "3x²/3x=x; -9x/3x=-3." },
      { text: "\\(x + 3\\)", correct: false, feedback: "-9x/3x=-3, not +3." },
      { text: "\\(x^2 - 3\\)", correct: false, feedback: "3x²/3x=x, not x²." },
      { text: "\\(3x - 3\\)", correct: false, feedback: "3/3=1, not 3." }
    ] },
  { itemId: "r12", order: 12, cluster: "REA", clusterName: CLUSTER_NAMES.REA,
    question: "Make \\(h\\) the subject of \\(A = \\frac{1}{2}bh\\).",
    options: [
      { text: "\\(h = \\frac{2A}{b}\\)", correct: true, feedback: "Multiply both sides by 2: 2A=bh. Then divide by b." },
      { text: "\\(h = \\frac{A}{2b}\\)", correct: false, feedback: "Multiply by 2, not divide by 2." },
      { text: "\\(h = \\frac{b}{2A}\\)", correct: false, feedback: "Invert the formula. Multiply both sides by 2, then divide by b." },
      { text: "\\(h = 2Ab\\)", correct: false, feedback: "You multiplied instead of dividing at the end." }
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
    title: "Expressions & Formulae — Problem-Solving & Synthesis",
    subtitle: "Grade 8 · Level 3 · Problem-Solving & Synthesis",
    description: "Non-routine substitution, index laws, double-bracket expansion, algebraic fractions, constructing and rearranging formulas — synthesis-level warm-up, diagnostic, and spaced recheck.",
    clusterNames: CLUSTER_NAMES,
    gateReviewHTML: '<strong>Quick Review</strong><br>' +
      "&bull; Substitution: replace letters with numbers, then calculate carefully.<br>" +
      "&bull; Index laws: add exponents when multiplying; subtract when dividing.<br>" +
      "&bull; Expanding double brackets: use FOIL or the distributive law.<br>" +
      "&bull; Algebraic fractions: cancel common factors; divide each term.<br>" +
      "&bull; Rearranging: do the same operation to both sides to make a variable the subject.<br>",
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

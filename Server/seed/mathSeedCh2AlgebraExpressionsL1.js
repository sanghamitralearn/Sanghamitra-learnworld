// seed/mathSeedCh2AlgebraExpressionsL1.js
//
// Populates math_chapters and math_questions with Grade 8, Chapter 2
// (Expressions & Formulae), Level 1 — converted from the standalone
// HTML file ch2-algebra-expressions-level-1.html.
//
// Run with: node seed/mathSeedCh2AlgebraExpressionsL1.js

const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-8";
const GRADE_LABEL = "Grade 8";
const CHAPTER_SLUG = "ch-2-algebra-expressions";
const CHAPTER_NAME = "Expressions & Formulae";
const LEVEL = 1;

const CLUSTER_NAMES = {
  SUB: "Substitution",
  INDX: "Index Laws",
  EXP: "Expanding",
  FAC: "Factorising",
  CON: "Constructing",
  DIS: "Expression/Formula/Equation",
  EST: "Estimation",
  EXT: "Extension"
};

const warmupItems = [
  { itemId: "w1", order: 1, cluster: "SUB", clusterName: CLUSTER_NAMES.SUB,
    question: "If \\(x = 5\\), find \\(x + 8\\).",
    options: [
      { text: "13", correct: true, feedback: "Correct. 5 + 8 = 13." },
      { text: "58", correct: false, feedback: "You wrote the numbers together instead of adding them." },
      { text: "3", correct: false, feedback: "You subtracted instead of adding." },
      { text: "-3", correct: false, feedback: "You subtracted and got the sign wrong." }
    ],
    retryHint: "Add 8 to 5." },
  { itemId: "w2", order: 2, cluster: "SUB", clusterName: CLUSTER_NAMES.SUB,
    question: "If \\(y = 10\\), evaluate \\(2y - 3\\).",
    options: [
      { text: "17", correct: true, feedback: "Correct. 2×10 - 3 = 20 - 3 = 17." },
      { text: "7", correct: false, feedback: "You subtracted first (10-3=7) then multiplied. Order is multiply first." },
      { text: "23", correct: false, feedback: "You added instead of subtracting." },
      { text: "-17", correct: false, feedback: "You got the sign of the subtraction wrong." }
    ],
    retryHint: "Replace y with 10, then multiply before subtracting." },
  { itemId: "w3", order: 3, cluster: "INDX", clusterName: CLUSTER_NAMES.INDX,
    question: "Simplify: \\(x^3 \\times x^2\\).",
    options: [
      { text: "\\(x^5\\)", correct: true, feedback: "Add the exponents: 3 + 2 = 5." },
      { text: "\\(x^6\\)", correct: false, feedback: "You multiplied the exponents instead of adding." },
      { text: "\\(x^1\\)", correct: false, feedback: "You subtracted the exponents. Subtract when dividing, not multiplying." },
      { text: "\\(2x^5\\)", correct: false, feedback: "The coefficient is 1, not 2." }
    ],
    retryHint: "When multiplying powers, add the exponents." },
  { itemId: "w4", order: 4, cluster: "INDX", clusterName: CLUSTER_NAMES.INDX,
    question: "Simplify: \\(\\frac{x^5}{x^2}\\).",
    options: [
      { text: "\\(x^3\\)", correct: true, feedback: "Subtract the exponents: 5 - 2 = 3." },
      { text: "\\(x^7\\)", correct: false, feedback: "You added the exponents. Add when multiplying, not dividing." },
      { text: "\\(x^{10}\\)", correct: false, feedback: "You multiplied the exponents." },
      { text: "\\(x^{2.5}\\)", correct: false, feedback: "Don't divide the exponents; subtract them." }
    ],
    retryHint: "When dividing powers, subtract the exponents." },
  { itemId: "w5", order: 5, cluster: "EXP", clusterName: CLUSTER_NAMES.EXP,
    question: "Expand: \\(3(x + 2)\\).",
    options: [
      { text: "\\(3x + 6\\)", correct: true, feedback: "Multiply both terms inside by 3." },
      { text: "\\(3x + 2\\)", correct: false, feedback: "You forgot to multiply the 2 by 3." },
      { text: "\\(x + 6\\)", correct: false, feedback: "You multiplied only the 2 by 3." },
      { text: "\\(5x\\)", correct: false, feedback: "You added inside the brackets first. 3(x+2) means multiply." }
    ],
    retryHint: "Multiply both terms inside the parentheses by 3." },
  { itemId: "w6", order: 6, cluster: "EXP", clusterName: CLUSTER_NAMES.EXP,
    question: "Expand: \\(4(2m - 1)\\).",
    options: [
      { text: "\\(8m - 4\\)", correct: true, feedback: "4×2m=8m, 4×(-1)=-4." },
      { text: "\\(8m - 1\\)", correct: false, feedback: "You only multiplied the first term by 4." },
      { text: "\\(2m - 4\\)", correct: false, feedback: "You only multiplied the second term by 4." },
      { text: "\\(8m + 4\\)", correct: false, feedback: "4×(-1)=-4, not +4." }
    ],
    retryHint: "Multiply both terms inside by 4." },
  { itemId: "w7", order: 7, cluster: "FAC", clusterName: CLUSTER_NAMES.FAC,
    question: "Factorise: \\(5x + 10\\).",
    options: [
      { text: "\\(5(x + 2)\\)", correct: true, feedback: "5 is the common factor." },
      { text: "\\(5x + 10\\) is already factorised", correct: false, feedback: "A common factor of 5 can be taken out." },
      { text: "\\(5(x + 10)\\)", correct: false, feedback: "5×10=50, not 10. The inside should be x+2." },
      { text: "\\(x(5 + 10)\\)", correct: false, feedback: "x is not a common factor of both terms." }
    ],
    retryHint: "Look for the largest number that divides both terms." },
  { itemId: "w8", order: 8, cluster: "FAC", clusterName: CLUSTER_NAMES.FAC,
    question: "Factorise: \\(8a - 12\\).",
    options: [
      { text: "\\(4(2a - 3)\\)", correct: true, feedback: "The highest common factor is 4." },
      { text: "\\(2(4a - 6)\\)", correct: false, feedback: "Not fully factorised; the HCF is 4, not 2." },
      { text: "\\(4(2a + 3)\\)", correct: false, feedback: "The sign inside should be negative, not positive." },
      { text: "\\(8(a - 1.5)\\)", correct: false, feedback: "Not fully factorised, and not using integers." }
    ],
    retryHint: "Find the biggest number that divides both 8 and 12." },
  { itemId: "w9", order: 9, cluster: "CON", clusterName: CLUSTER_NAMES.CON,
    question: "Write an expression for 'a number \\(n\\) plus 6'.",
    options: [
      { text: "\\(n + 6\\)", correct: true, feedback: "Plus means addition." },
      { text: "\\(6n\\)", correct: false, feedback: "That's 6 times n." },
      { text: "\\(n - 6\\)", correct: false, feedback: "That's n minus 6." },
      { text: "\\(6 - n\\)", correct: false, feedback: "That's 6 minus n, the wrong order." }
    ],
    retryHint: "Plus means addition." },
  { itemId: "w10", order: 10, cluster: "DIS", clusterName: CLUSTER_NAMES.DIS,
    question: "Which of these is an expression?",
    options: [
      { text: "\\(2x + 5\\)", correct: true, feedback: "An expression has no equals sign." },
      { text: "\\(2x + 5 = 11\\)", correct: false, feedback: "That's an equation — it has an equals sign." },
      { text: "\\(A = lw\\)", correct: false, feedback: "That's a formula — it shows a relationship." },
      { text: "\\(x =\\)", correct: false, feedback: "Incomplete — not a valid expression." }
    ],
    retryHint: "Expressions do not have an equals sign." }
];

const diagnosticItems = [
  { itemId: "d1", order: 1, cluster: "SUB", clusterName: CLUSTER_NAMES.SUB,
    question: "If \\(x = -3\\), evaluate \\(2x^2 - 3x + 1\\).",
    options: [
      { text: "28", correct: true, feedback: "2×(-3)²=18, -3×(-3)=+9, 18+9+1=28." },
      { text: "10", correct: false, feedback: "You treated -3x as -9. (-3)×(-3)=+9, not -9." },
      { text: "-8", correct: false, feedback: "You treated (-3)² as -9. (-3)²=+9." },
      { text: "1", correct: false, feedback: "You only kept the constant and ignored the other terms." }
    ],
    backward: "Chapter 1: (-a)² = a².",
    forward: "Substituting negative values is essential for graphing functions." },
  { itemId: "d2", order: 2, cluster: "INDX", clusterName: CLUSTER_NAMES.INDX,
    question: "Simplify: \\((x^2)^3\\).",
    options: [
      { text: "\\(x^6\\)", correct: true, feedback: "Multiply the exponents: 2×3=6." },
      { text: "\\(x^5\\)", correct: false, feedback: "You added the exponents. Add when multiplying, not when raising a power." },
      { text: "\\(x^8\\)", correct: false, feedback: "You raised 2 to the power of 3. Multiply exponents, don't use the base." },
      { text: "\\(3x^2\\)", correct: false, feedback: "You multiplied the base by the outer exponent." }
    ],
    backward: "Power of a power: multiply exponents.",
    forward: "Index laws are essential for algebraic fractions and standard form." },
  { itemId: "d3", order: 3, cluster: "EXP", clusterName: CLUSTER_NAMES.EXP,
    question: "Expand: \\(-2(3x - 5)\\).",
    options: [
      { text: "\\(-6x + 10\\)", correct: true, feedback: "-2×3x=-6x, -2×(-5)=+10." },
      { text: "\\(-6x - 10\\)", correct: false, feedback: "-2×(-5)=+10, not -10. Negative × negative = positive." },
      { text: "\\(6x - 10\\)", correct: false, feedback: "-2×3x=-6x, not +6x. Don't drop the negative." },
      { text: "\\(-6x + 5\\)", correct: false, feedback: "You only multiplied the first term." }
    ],
    backward: "Distribute the negative coefficient to every term.",
    forward: "Expanding with negative coefficients is essential for solving equations." },
  { itemId: "d4", order: 4, cluster: "FAC", clusterName: CLUSTER_NAMES.FAC,
    question: "Factorise \\(6x^2 + 9x\\) completely.",
    options: [
      { text: "\\(3x(2x + 3)\\)", correct: true, feedback: "HCF of 6 and 9 is 3; common variable is x." },
      { text: "\\(3(2x^2 + 3x)\\)", correct: false, feedback: "x can also be taken out. The HCF is 3x, not 3." },
      { text: "\\(x(6x + 9)\\)", correct: false, feedback: "The HCF is 3x, not just x." },
      { text: "\\(6x^2 + 9x\\) is already fully factorised", correct: false, feedback: "There is a common factor of 3x." }
    ],
    backward: "Reverse of expanding.",
    forward: "Factorising is crucial for solving quadratics later." },
  { itemId: "d5", order: 5, cluster: "CON", clusterName: CLUSTER_NAMES.CON,
    question: "Write an expression for 'five less than three times a number \\(x\\)'.",
    options: [
      { text: "\\(3x - 5\\)", correct: true, feedback: "'Less than' reverses: three times x, then subtract 5." },
      { text: "\\(5 - 3x\\)", correct: false, feedback: "That's five minus 3x, not five less than." },
      { text: "\\(3(x - 5)\\)", correct: false, feedback: "That's three times (x-5), a different expression." },
      { text: "\\(3x + 5\\)", correct: false, feedback: "That's five more than, not five less than." }
    ],
    backward: "Word order matters: 'less than' reverses.",
    forward: "Translating words into algebra is the first step in word problems." },
  { itemId: "d6", order: 6, cluster: "DIS", clusterName: CLUSTER_NAMES.DIS,
    question: "Which of these is a formula?",
    options: [
      { text: "\\(A = lw\\)", correct: true, feedback: "A formula shows a relationship between variables." },
      { text: "\\(2x + 5 = 11\\)", correct: false, feedback: "That's an equation — one unknown to solve." },
      { text: "\\(3a + 7\\)", correct: false, feedback: "That's an expression — no equals sign." },
      { text: "\\(x = 3\\)", correct: false, feedback: "That's an equation stating x equals 3." }
    ],
    backward: "Expression: no equals. Equation: one solution. Formula: relationship.",
    forward: "Recognising the type tells you what to do." },
  { itemId: "d7", order: 7, cluster: "EST", clusterName: CLUSTER_NAMES.EST,
    question: "Estimate: \\((-4.8) \\times 2.1\\) ≈ ?",
    options: [
      { text: "\\(-10\\)", correct: true, feedback: "Round to 1 s.f.: -5 × 2 = -10." },
      { text: "\\(-7\\)", correct: false, feedback: "You rounded -4.8 to -3.5? Round to -5." },
      { text: "\\(-12\\)", correct: false, feedback: "You rounded -4.8 to -6." },
      { text: "\\(10\\)", correct: false, feedback: "You dropped the negative sign." }
    ],
    backward: "Round each number to 1 significant figure.",
    forward: "Estimation helps check calculator results quickly." },
  { itemId: "d8", order: 8, cluster: "EXT", clusterName: CLUSTER_NAMES.EXT,
    question: "Evaluate: \\((-2)^3 + \\sqrt{81} - (-5)\\).",
    options: [
      { text: "6", correct: true, feedback: "(-2)³=-8, √81=9, -(-5)=+5. -8+9+5=6." },
      { text: "-6", correct: false, feedback: "Check the sign of -(-5). Subtracting a negative is adding." },
      { text: "16", correct: false, feedback: "You treated (-2)³ as +8." },
      { text: "-4", correct: false, feedback: "(-2)³=-8, √81=9, then -8+9-5=-4. -(-5)=+5." }
    ],
    backward: "Combine powers, roots, and sign rules.",
    forward: "Multi-step problems like this appear in algebraic expressions." },
  { itemId: "d9", order: 9, cluster: "SUB", clusterName: CLUSTER_NAMES.SUB,
    question: "If \\(m = -2, n = 5\\), evaluate \\(mn - m^2\\).",
    options: [
      { text: "\\(-14\\)", correct: true, feedback: "(-2)×5=-10; (-2)²=4; -10-4=-14." },
      { text: "\\(-6\\)", correct: false, feedback: "You computed m² as -4. (-2)²=+4." },
      { text: "\\(6\\)", correct: false, feedback: "You computed -10+4=-6 then changed the sign." },
      { text: "\\(14\\)", correct: false, feedback: "You dropped all negative signs." }
    ],
    backward: "m² is always non-negative.",
    forward: "Multi-variable substitution occurs in formulas like A=½bh." },
  { itemId: "d10", order: 10, cluster: "INDX", clusterName: CLUSTER_NAMES.INDX,
    question: "Simplify: \\(\\frac{x^4}{x}\\).",
    options: [
      { text: "\\(x^3\\)", correct: true, feedback: "Subtract exponents: 4-1=3." },
      { text: "\\(x^4\\)", correct: false, feedback: "x in the denominator cancels one x. x⁴/x = x³." },
      { text: "\\(x^5\\)", correct: false, feedback: "You added the exponents. Subtract when dividing." },
      { text: "\\(4\\)", correct: false, feedback: "You divided the coefficient? There is no coefficient." }
    ],
    backward: "x = x¹, so x⁴/x = x³.",
    forward: "Dividing powers is essential for simplifying algebraic fractions." },
  { itemId: "d11", order: 11, cluster: "EXP", clusterName: CLUSTER_NAMES.EXP,
    question: "Expand and simplify: \\(3(2x + 1) - 2(x - 4)\\).",
    options: [
      { text: "\\(4x + 11\\)", correct: true, feedback: "6x+3-2x+8 = 4x+11." },
      { text: "\\(4x - 5\\)", correct: false, feedback: "-2×(-4)=+8, not -8. 3+8=11." },
      { text: "\\(8x + 11\\)", correct: false, feedback: "You added the x-terms: 6x+2x=8x." },
      { text: "\\(4x + 5\\)", correct: false, feedback: "3+8=11, not 5." }
    ],
    backward: "Distribute each term, then collect like terms.",
    forward: "This is the basis for solving equations with brackets." },
  { itemId: "d12", order: 12, cluster: "FAC", clusterName: CLUSTER_NAMES.FAC,
    question: "Factorise \\(12x + 18\\) completely.",
    options: [
      { text: "\\(6(2x + 3)\\)", correct: true, feedback: "The HCF of 12 and 18 is 6." },
      { text: "\\(2(6x + 9)\\)", correct: false, feedback: "Not fully factorised; the HCF is 6, not 2." },
      { text: "\\(3(4x + 6)\\)", correct: false, feedback: "Not fully factorised; the HCF is 6, not 3." },
      { text: "\\(12x + 18\\) cannot be factorised", correct: false, feedback: "It can be factorised — the HCF is 6." }
    ],
    backward: "Always take out the highest common factor.",
    forward: "Complete factorisation simplifies fractions and equation solving." },
  { itemId: "d13", order: 13, cluster: "CON", clusterName: CLUSTER_NAMES.CON,
    question: "A matchstick pattern shows figures 1, 2, and 3, using 4, 7, and 10 sticks respectively. How many sticks are needed for figure 5?",
    options: [
      { text: "16", correct: true, feedback: "Pattern: 4,7,10,… (add 3). Figure 5: 4 + 4×3 = 16." },
      { text: "15", correct: false, feedback: "You added 3 only three times instead of four." },
      { text: "13", correct: false, feedback: "You missed two steps." },
      { text: "19", correct: false, feedback: "You added 5×3=15 plus 4=19? Starting value is 4." }
    ],
    backward: "Look for the constant difference between figures.",
    forward: "Deriving formulas from patterns is the bridge to algebra." },
  { itemId: "d14", order: 14, cluster: "DIS", clusterName: CLUSTER_NAMES.DIS,
    question: "True or false: '\\(2x + 3 = 7\\)' is an expression.",
    options: [
      { text: "False", correct: true, feedback: "It's an equation — it has an equals sign." },
      { text: "True", correct: false, feedback: "Expressions do not have equals signs." }
    ],
    backward: "Expressions are phrases; equations are sentences.",
    forward: "This distinction helps you know whether to simplify or solve." },
  { itemId: "d15", order: 15, cluster: "EST", clusterName: CLUSTER_NAMES.EST,
    question: "Estimate \\(\\sqrt{50}\\) to the nearest whole number.",
    options: [
      { text: "7", correct: true, feedback: "7²=49, very close to 50." },
      { text: "5", correct: false, feedback: "5²=25, too low." },
      { text: "8", correct: false, feedback: "8²=64, further away than 7²=49." },
      { text: "6", correct: false, feedback: "6²=36, further away than 7²=49." }
    ],
    backward: "Find the nearest perfect square.",
    forward: "Estimation of roots is useful in geometry and measurement." },
  { itemId: "d16", order: 16, cluster: "EXT", clusterName: CLUSTER_NAMES.EXT,
    question: "If \\(a = -2, b = 3\\), find the value of \\(a^2 + b^2 - 2ab\\).",
    options: [
      { text: "25", correct: true, feedback: "(-2)²=4, 3²=9, -2ab=-2(-2)(3)=+12. 4+9+12=25." },
      { text: "1", correct: false, feedback: "You computed -2ab as -12 instead of +12." },
      { text: "13", correct: false, feedback: "You forgot the -2ab term entirely." },
      { text: "-25", correct: false, feedback: "You squared -2 as -4. (-2)²=+4." }
    ],
    backward: "Substitute carefully, then use order of operations.",
    forward: "This expression is (a-b)², an important algebraic identity." },
  { itemId: "d17", order: 17, cluster: "SUB", clusterName: CLUSTER_NAMES.SUB,
    question: "Evaluate \\(2(a - 3)^2\\) when \\(a = -1\\).",
    options: [
      { text: "32", correct: true, feedback: "(-1-3)=-4; (-4)²=16; 2×16=32." },
      { text: "16", correct: false, feedback: "You forgot to multiply by 2 at the end." },
      { text: "8", correct: false, feedback: "You squared -4 as -16, or mis-ordered." },
      { text: "-32", correct: false, feedback: "You squared -4 and got -16. A square is never negative." }
    ],
    backward: "Parentheses first, then the square, then multiplication.",
    forward: "Substituting into expressions with powers is used in area and volume." },
  { itemId: "d18", order: 18, cluster: "INDX", clusterName: CLUSTER_NAMES.INDX,
    question: "Simplify: \\((3^2)^3\\).",
    options: [
      { text: "\\(3^6\\)", correct: true, feedback: "Multiply the exponents: 2×3=6." },
      { text: "\\(3^5\\)", correct: false, feedback: "You added the exponents. Multiply when raising a power." },
      { text: "\\(3^8\\)", correct: false, feedback: "2³=8, but multiply exponents, don't use them as powers." },
      { text: "\\(6^3\\)", correct: false, feedback: "The base stays as 3, not 6." }
    ],
    backward: "Power of a power: multiply exponents.",
    forward: "Index laws will be extended to algebra and negative exponents." },
  { itemId: "d19", order: 19, cluster: "EXP", clusterName: CLUSTER_NAMES.EXP,
    question: "Expand: \\(x(x + 4)\\).",
    options: [
      { text: "\\(x^2 + 4x\\)", correct: true, feedback: "x×x=x², x×4=4x." },
      { text: "\\(x^2 + 4\\)", correct: false, feedback: "You forgot to multiply x by the 4." },
      { text: "\\(2x + 4\\)", correct: false, feedback: "You added instead of multiplying." },
      { text: "\\(5x\\)", correct: false, feedback: "x(x+4) means multiply, not add." }
    ],
    backward: "x multiplied by x is x².",
    forward: "This leads to quadratic expressions and factorising." },
  { itemId: "d20", order: 20, cluster: "FAC", clusterName: CLUSTER_NAMES.FAC,
    question: "Factorise completely: \\(-6x - 9\\).",
    options: [
      { text: "\\(-3(2x + 3)\\)", correct: true, feedback: "The common factor is -3. Inside signs flip." },
      { text: "\\(3(-2x - 3)\\)", correct: false, feedback: "Not fully factorised; take out -3, not 3." },
      { text: "\\(-3(2x - 3)\\)", correct: false, feedback: "-3 × -3 = +9, but we need -9." },
      { text: "\\(6(-x - 1.5)\\)", correct: false, feedback: "Not fully factorised, and not using integers." }
    ],
    backward: "Factorising with a negative flips the signs inside.",
    forward: "Used when solving equations by dividing by a negative." },
  { itemId: "d21", order: 21, cluster: "CON", clusterName: CLUSTER_NAMES.CON,
    question: "A taxi costs £2 per mile plus a £3 flag-down charge. Write a formula for the total cost \\(C\\) for \\(m\\) miles.",
    options: [
      { text: "\\(C = 2m + 3\\)", correct: true, feedback: "£2 per mile means 2m; plus £3 gives 2m+3." },
      { text: "\\(C = 5m\\)", correct: false, feedback: "You can't add 2 and 3 — they're not like terms." },
      { text: "\\(C = 3m + 2\\)", correct: false, feedback: "You swapped the per-mile charge and the fixed charge." },
      { text: "\\(C = 2 + 3m\\)", correct: false, feedback: "This has the rates swapped." }
    ],
    backward: "Identify the variable part and the constant part.",
    forward: "Real-life formulas model costs, distances, and scientific relationships." },
  { itemId: "d22", order: 22, cluster: "DIS", clusterName: CLUSTER_NAMES.DIS,
    question: "Which of the following can you solve for \\(x\\)?",
    options: [
      { text: "\\(2x + 5 = 0\\)", correct: true, feedback: "An equation can be solved — there is one unknown." },
      { text: "\\(2x + 5\\)", correct: false, feedback: "That's an expression — nothing to solve." },
      { text: "\\(y = 2x + 5\\)", correct: false, feedback: "That's a formula — it can be rearranged but not solved." },
      { text: "All of them", correct: false, feedback: "Only the equation can be solved." }
    ],
    backward: "Equations have a specific solution.",
    forward: "Identifying solvable equations is key in algebra." },
  { itemId: "d23", order: 23, cluster: "EST", clusterName: CLUSTER_NAMES.EST,
    question: "A cube has volume 60 cm³. Estimate its side length to the nearest whole number.",
    options: [
      { text: "4 cm", correct: true, feedback: "4³=64, close to 60." },
      { text: "3 cm", correct: false, feedback: "3³=27, too small." },
      { text: "5 cm", correct: false, feedback: "5³=125, too big." },
      { text: "2 cm", correct: false, feedback: "2³=8, far too small." }
    ],
    backward: "Side = ³√volume.",
    forward: "Estimation of cube roots is useful in physics and engineering." },
  { itemId: "d24", order: 24, cluster: "EXT", clusterName: CLUSTER_NAMES.EXT,
    question: "A student expanded \\(-2(3x - 5)\\) and got \\(-6x - 10\\). What went wrong?",
    options: [
      { text: "-2 × -5 should be +10, not -10", correct: true, feedback: "Negative × negative = positive. The correct expansion is -6x+10." },
      { text: "-2 × 3x should be +6x", correct: false, feedback: "-2 × 3x = -6x is correct. The error is in the constant." },
      { text: "They forgot to distribute -2 to the 3x term", correct: false, feedback: "They did distribute; the error is the constant sign." },
      { text: "The expansion is correct", correct: false, feedback: "The constant sign is wrong." }
    ],
    backward: "Distributing a negative sign requires careful tracking.",
    forward: "Error spotting sharpens your checking skills." }
];

const recheckItems = [
  { itemId: "r1", order: 1, cluster: "SUB", clusterName: CLUSTER_NAMES.SUB,
    question: "Evaluate \\(2(x + 1)^2\\) when \\(x = -4\\).",
    options: [
      { text: "18", correct: true, feedback: "(-3)²=9; 2×9=18." },
      { text: "-18", correct: false, feedback: "(-3)²=9, not -9." },
      { text: "-6", correct: false, feedback: "You forgot to square the -3." },
      { text: "36", correct: false, feedback: "You doubled before squaring." }
    ] },
  { itemId: "r2", order: 2, cluster: "INDX", clusterName: CLUSTER_NAMES.INDX,
    question: "Simplify: \\(\\frac{x^6}{x^2}\\).",
    options: [
      { text: "\\(x^4\\)", correct: true, feedback: "Subtract exponents: 6-2=4." },
      { text: "\\(x^3\\)", correct: false, feedback: "You divided the exponents. Subtract them." },
      { text: "\\(x^8\\)", correct: false, feedback: "You added the exponents." },
      { text: "\\(x^{12}\\)", correct: false, feedback: "You multiplied the exponents." }
    ] },
  { itemId: "r3", order: 3, cluster: "EXP", clusterName: CLUSTER_NAMES.EXP,
    question: "Expand and simplify: \\(2(3x - 1) + 4(x + 2)\\).",
    options: [
      { text: "\\(10x + 6\\)", correct: true, feedback: "6x-2+4x+8=10x+6." },
      { text: "\\(10x + 2\\)", correct: false, feedback: "-2+8=6, not 2." },
      { text: "\\(14x + 6\\)", correct: false, feedback: "6x+4x=10x, not 14x." },
      { text: "\\(10x + 10\\)", correct: false, feedback: "-2+8=6, not 10." }
    ] },
  { itemId: "r4", order: 4, cluster: "FAC", clusterName: CLUSTER_NAMES.FAC,
    question: "Factorise \\(9x^2 - 3x\\) completely.",
    options: [
      { text: "\\(3x(3x - 1)\\)", correct: true, feedback: "HCF of 9 and 3 is 3; common x." },
      { text: "\\(3(3x^2 - x)\\)", correct: false, feedback: "x can also be taken out." },
      { text: "\\(x(9x - 3)\\)", correct: false, feedback: "The HCF is 3x, not just x." },
      { text: "\\(3x(3x + 1)\\)", correct: false, feedback: "The sign inside should be negative." }
    ] },
  { itemId: "r5", order: 5, cluster: "CON", clusterName: CLUSTER_NAMES.CON,
    question: "Write an expression for 'twice the sum of a number \\(n\\) and 5'.",
    options: [
      { text: "\\(2(n + 5)\\)", correct: true, feedback: "'The sum of n and 5' is n+5, then doubled." },
      { text: "\\(2n + 5\\)", correct: false, feedback: "That's twice n plus 5." },
      { text: "\\(n + 10\\)", correct: false, feedback: "That's n plus 10." },
      { text: "\\(2n + 10\\)", correct: false, feedback: "This is equivalent but the question asks for the expression before expanding." }
    ] },
  { itemId: "r6", order: 6, cluster: "DIS", clusterName: CLUSTER_NAMES.DIS,
    question: "Which of these is a formula?",
    options: [
      { text: "\\(v = u + at\\)", correct: true, feedback: "A formula shows a relationship." },
      { text: "\\(3x - 7\\)", correct: false, feedback: "That's an expression." },
      { text: "\\(3x - 7 = 0\\)", correct: false, feedback: "That's an equation." },
      { text: "\\(x = 5\\)", correct: false, feedback: "That's an equation." }
    ] },
  { itemId: "r7", order: 7, cluster: "EST", clusterName: CLUSTER_NAMES.EST,
    question: "If \\(C = 2\\pi r\\) and \\(\\pi \\approx 3\\), estimate \\(C\\) when \\(r = 10\\).",
    options: [
      { text: "60", correct: true, feedback: "2×3×10=60." },
      { text: "30", correct: false, feedback: "You forgot to double." },
      { text: "90", correct: false, feedback: "2×3×10=60, not 90." },
      { text: "20", correct: false, feedback: "You used π≈2? π≈3." }
    ] },
  { itemId: "r8", order: 8, cluster: "EXT", clusterName: CLUSTER_NAMES.EXT,
    question: "The volume of a cuboid is \\(V = lwh\\). If \\(l=5, w=3, h=2\\), find \\(V\\). Then if each dimension is doubled, find the new \\(V\\).",
    options: [
      { text: "Original 30, doubled 240", correct: true, feedback: "5×3×2=30; 10×6×4=240." },
      { text: "Original 30, doubled 60", correct: false, feedback: "Doubling each multiplies volume by 8." },
      { text: "Original 10, doubled 20", correct: false, feedback: "Check the formula." },
      { text: "Original 30, doubled 120", correct: false, feedback: "10×6×4=240." }
    ] },
  { itemId: "r9", order: 9, cluster: "SUB", clusterName: CLUSTER_NAMES.SUB,
    question: "If \\(x = -2\\), evaluate \\(3x^2 - x + 1\\).",
    options: [
      { text: "15", correct: true, feedback: "3×4 + 2 + 1 = 15." },
      { text: "11", correct: false, feedback: "-x when x=-2 is +2, not -2." },
      { text: "-15", correct: false, feedback: "You squared -2 as -4." },
      { text: "9", correct: false, feedback: "3×4=12, then 12-2+1=11." }
    ] },
  { itemId: "r10", order: 10, cluster: "INDX", clusterName: CLUSTER_NAMES.INDX,
    question: "Simplify: \\((x^3)^2 \\times x\\).",
    options: [
      { text: "\\(x^7\\)", correct: true, feedback: "(x³)²=x⁶; x⁶×x=x⁷." },
      { text: "\\(x^6\\)", correct: false, feedback: "Don't forget to multiply by x." },
      { text: "\\(x^5\\)", correct: false, feedback: "3×2=6, plus 1=7." },
      { text: "\\(x^8\\)", correct: false, feedback: "6+1=7, not 8." }
    ] },
  { itemId: "r11", order: 11, cluster: "FAC", clusterName: CLUSTER_NAMES.FAC,
    question: "Factorise completely: \\(-8x - 12\\).",
    options: [
      { text: "\\(-4(2x + 3)\\)", correct: true, feedback: "The HCF is -4." },
      { text: "\\(4(-2x - 3)\\)", correct: false, feedback: "Take out -4, not 4." },
      { text: "\\(-4(2x - 3)\\)", correct: false, feedback: "-4×-3=+12, not -12." },
      { text: "\\(-2(4x + 6)\\)", correct: false, feedback: "Not the highest common factor." }
    ] },
  { itemId: "r12", order: 12, cluster: "CON", clusterName: CLUSTER_NAMES.CON,
    question: "A pattern uses \\(2n + 3\\) sticks for the nth figure. How many sticks in figure 7?",
    options: [
      { text: "17", correct: true, feedback: "2×7+3=17." },
      { text: "13", correct: false, feedback: "You used n=5." },
      { text: "20", correct: false, feedback: "2×7+6=20." },
      { text: "27", correct: false, feedback: "14+3=17." }
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
    title: "Expressions & Formulae — Core Fluency",
    subtitle: "Grade 8 · Level 1 · Core Fluency",
    description: "Substitution, index laws, expanding, factorising, constructing expressions, and identifying expressions/formulas/equations — warm-up, diagnostic, and spaced recheck for core fluency.",
    clusterNames: CLUSTER_NAMES,
    gateReviewHTML: '<strong>Quick Review</strong><br>' +
      "&bull; Substitution: replace letters with numbers, then calculate.<br>" +
      "&bull; Index laws: add exponents when multiplying; subtract when dividing.<br>" +
      "&bull; Expanding: multiply everything inside the bracket.<br>" +
      "&bull; Factorising: take out the highest common factor.<br>" +
      "&bull; Constructing: translate words into algebra &mdash; watch for &quot;less than&quot;.<br>",
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

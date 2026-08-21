// seed/mathSeedCh2AlgebraExpressionsL2.js
//
// Populates math_chapters and math_questions with Grade 8, Chapter 2
// (Expressions & Formulae), Level 2 — converted from the standalone
// HTML file ch2-algebra-expressions-level-2.html.
//
// Run with: node seed/mathSeedCh2AlgebraExpressionsL2.js

const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-8";
const GRADE_LABEL = "Grade 8";
const CHAPTER_SLUG = "ch-2-algebra-expressions";
const CHAPTER_NAME = "Expressions & Formulae";
const LEVEL = 2;

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
    question: "If \\(x = -3\\), evaluate \\(2x^2 + x - 5\\).",
    options: [
      { text: "10", correct: true, feedback: "2×9 + (-3) - 5 = 18 - 3 - 5 = 10." },
      { text: "16", correct: false, feedback: "You treated x as +3: 2×9+3-5=18+3-5=16. x=-3, so the middle term is -3." },
      { text: "4", correct: false, feedback: "You may have squared -3 as -9: 2(-9)+(-3)-5 = -26." },
      { text: "-10", correct: false, feedback: "You got the sign of the whole expression wrong." }
    ],
    retryHint: "(-3)² = +9; 2×9=18; + (-3) = 15; -5 = 10." },
  { itemId: "w2", order: 2, cluster: "INDX", clusterName: CLUSTER_NAMES.INDX,
    question: "Simplify: \\(x^3 \\times x^4 \\div x^2\\).",
    options: [
      { text: "\\(x^5\\)", correct: true, feedback: "First multiply: x³×x⁴=x⁷. Then divide: x⁷/x²=x⁵." },
      { text: "\\(x^7\\)", correct: false, feedback: "You multiplied but forgot to divide by x²." },
      { text: "\\(x^9\\)", correct: false, feedback: "You added all the exponents: 3+4+2=9. Add for multiplication, subtract for division." },
      { text: "\\(x^2\\)", correct: false, feedback: "You subtracted 4-2=2 and ignored the x³. Work left to right." }
    ],
    retryHint: "Multiply first: x³×x⁴ = x⁷. Then divide: x⁷/x² = x⁵." },
  { itemId: "w3", order: 3, cluster: "EXP", clusterName: CLUSTER_NAMES.EXP,
    question: "Expand: \\(2x(3x - 4)\\).",
    options: [
      { text: "\\(6x^2 - 8x\\)", correct: true, feedback: "2x×3x=6x²; 2x×(-4)=-8x." },
      { text: "\\(6x^2 - 4\\)", correct: false, feedback: "You didn't multiply the -4 by x. 2x×(-4)=-8x, not -4." },
      { text: "\\(5x^2 - 8x\\)", correct: false, feedback: "You added the coefficients: 2+3=5. Multiply, don't add." },
      { text: "\\(6x - 8\\)", correct: false, feedback: "x×x=x², not x. You lost one power of x." }
    ],
    retryHint: "Multiply the outside term by each inside term: 2x×3x and 2x×(-4)." },
  { itemId: "w4", order: 4, cluster: "FAC", clusterName: CLUSTER_NAMES.FAC,
    question: "Factorise: \\(8x^2y - 12xy^2\\).",
    options: [
      { text: "\\(4xy(2x - 3y)\\)", correct: true, feedback: "HCF of 8 and 12 is 4; lowest power of x is x; lowest power of y is y." },
      { text: "\\(2xy(4x - 6y)\\)", correct: false, feedback: "Not fully factorised. The HCF of 8 and 12 is 4, not 2." },
      { text: "\\(4x(2xy - 3y^2)\\)", correct: false, feedback: "The common factor y is missing. Both terms contain y, so y must be in the HCF." },
      { text: "\\(4y(2x^2 - 3xy)\\)", correct: false, feedback: "The common factor x is missing. Both terms contain x, so x must be in the HCF." }
    ],
    retryHint: "Find the HCF of the numbers (8 and 12 → 4) and the lowest power of each variable." },
  { itemId: "w5", order: 5, cluster: "CON", clusterName: CLUSTER_NAMES.CON,
    question: "Write an expression for 'three times the difference between a number \\(n\\) and 5'.",
    options: [
      { text: "\\(3(n - 5)\\)", correct: true, feedback: "'The difference between n and 5' is n-5. Three times that is 3(n-5)." },
      { text: "\\(3n - 5\\)", correct: false, feedback: "That's three times n, then subtract 5 — not three times the difference." },
      { text: "\\(3(5 - n)\\)", correct: false, feedback: "That's three times (5 minus n), the difference the other way around." },
      { text: "\\(n - 15\\)", correct: false, feedback: "You multiplied only the 5 by 3. The 3 multiplies the whole difference." }
    ],
    retryHint: "First write the difference (n-5), then multiply by 3." },
  { itemId: "w6", order: 6, cluster: "DIS", clusterName: CLUSTER_NAMES.DIS,
    question: "Which of these is an equation?",
    options: [
      { text: "\\(3x + 1 = 7\\)", correct: true, feedback: "An equation has an equals sign and one unknown to solve for." },
      { text: "\\(3x + 1\\)", correct: false, feedback: "That's an expression — no equals sign." },
      { text: "\\(y = 3x + 1\\)", correct: false, feedback: "That's a formula — it shows a relationship between variables." },
      { text: "\\(3x\\)", correct: false, feedback: "That's a single term — part of an expression." }
    ],
    retryHint: "An equation has an equals sign and one variable to solve for." },
  { itemId: "w7", order: 7, cluster: "EST", clusterName: CLUSTER_NAMES.EST,
    question: "Estimate \\(3x^2\\) when \\(x = 9.9\\).",
    options: [
      { text: "300", correct: true, feedback: "Round 9.9 to 10. 10²=100. 3×100=300." },
      { text: "297", correct: false, feedback: "That's the exact value. The question asked for an estimate — round first." },
      { text: "270", correct: false, feedback: "You rounded 9.9 to 9 instead of 10. 9²=81, 3×81=243, not 270." },
      { text: "30", correct: false, feedback: "You forgot to square x. 3×10=30." }
    ],
    retryHint: "Round 9.9 to 10; 10²=100; 3×100=300." },
  { itemId: "w8", order: 8, cluster: "EXP", clusterName: CLUSTER_NAMES.EXP,
    question: "Expand and simplify: \\(-2(3 - x) + 4x\\).",
    options: [
      { text: "\\(-6 + 6x\\)", correct: true, feedback: "-2×3=-6; -2×(-x)=+2x; plus 4x gives -6+6x." },
      { text: "\\(-6 - 2x\\)", correct: false, feedback: "-2×(-x)=+2x, not -2x. Negative × negative = positive." },
      { text: "\\(6 + 6x\\)", correct: false, feedback: "-2×3=-6, not +6. Don't drop the negative sign." },
      { text: "\\(-6 + 2x\\)", correct: false, feedback: "You forgot to add the +4x at the end." }
    ],
    retryHint: "-2×3=-6; -2×(-x)=+2x; then add +4x." },
  { itemId: "w9", order: 9, cluster: "INDX", clusterName: CLUSTER_NAMES.INDX,
    question: "Simplify: \\((2x^2)^3\\).",
    options: [
      { text: "\\(8x^6\\)", correct: true, feedback: "2³=8; (x²)³=x⁶." },
      { text: "\\(6x^5\\)", correct: false, feedback: "2³=8, not 6. And multiply exponents (2×3=6), not add." },
      { text: "\\(8x^5\\)", correct: false, feedback: "Multiply exponents: 2×3=6, not add 2+3=5." },
      { text: "\\(2x^6\\)", correct: false, feedback: "Don't forget to cube the 2. 2³=8." }
    ],
    retryHint: "Cube the number and multiply the exponents." },
  { itemId: "w10", order: 10, cluster: "SUB", clusterName: CLUSTER_NAMES.SUB,
    question: "If \\(a = -1, b = 2\\), evaluate \\(a^2b - ab^2\\).",
    options: [
      { text: "6", correct: true, feedback: "a²b=1×2=2; ab²=(-1)×4=-4; 2 - (-4) = 2+4 = 6." },
      { text: "-6", correct: false, feedback: "You computed ab² as +4 instead of -4. (-1)×4=-4, so 2 - (-4)=6." },
      { text: "2", correct: false, feedback: "You only computed a²b and forgot the ab² term." },
      { text: "-2", correct: false, feedback: "You computed a²b=-2 and ab²=-4, giving -2-(-4)=2? Sign error. a²=1 always." }
    ],
    retryHint: "a²=1; b=2; ab² = a×(b×b) = -1×4 = -4. Then a²b - ab² = 2 - (-4) = 6." }
];

const diagnosticItems = [
  { itemId: "d1", order: 1, cluster: "SUB", clusterName: CLUSTER_NAMES.SUB,
    question: "If \\(x = -2\\), evaluate \\(3x^2 - 2x + 1\\).",
    options: [
      { text: "17", correct: true, feedback: "3×4 - 2×(-2) + 1 = 12 + 4 + 1 = 17." },
      { text: "9", correct: false, feedback: "You squared -2 as -4: 3(-4)-2(-2)+1 = -7. Check: (-2)²=+4." },
      { text: "-7", correct: false, feedback: "You squared -2 as -4: 3(-4)-2(-2)+1 = -12+4+1 = -7." },
      { text: "15", correct: false, feedback: "You computed -2×(-2) as -4 instead of +4. Check the sign on -2x." }
    ],
    backward: "Chapter 1: (-a)² = a².",
    forward: "Substituting negative values is essential for graphing functions." },
  { itemId: "d2", order: 2, cluster: "INDX", clusterName: CLUSTER_NAMES.INDX,
    question: "Simplify: \\(\\frac{x^5 \\times x^2}{x^3}\\).",
    options: [
      { text: "\\(x^4\\)", correct: true, feedback: "x⁵×x²=x⁷; x⁷/x³=x⁴." },
      { text: "\\(x^7\\)", correct: false, feedback: "You multiplied but forgot to divide by x³." },
      { text: "\\(x^{10}\\)", correct: false, feedback: "You added all exponents: 5+2+3=10. Subtract when dividing." },
      { text: "\\(x^0\\)", correct: false, feedback: "x⁰=1. You subtracted 7-3=4, not 7-7=0." }
    ],
    backward: "Multiply first (add exponents), then divide (subtract).",
    forward: "Index laws are used in standard form and algebraic fractions." },
  { itemId: "d3", order: 3, cluster: "EXP", clusterName: CLUSTER_NAMES.EXP,
    question: "Expand: \\(-3x(2 - x)\\).",
    options: [
      { text: "\\(-6x + 3x^2\\)", correct: true, feedback: "-3x×2=-6x; -3x×(-x)=+3x²." },
      { text: "\\(-6x - 3x^2\\)", correct: false, feedback: "-3x×(-x)=+3x², not -3x². Negative × negative = positive." },
      { text: "\\(6x - 3x^2\\)", correct: false, feedback: "-3x×2=-6x, not +6x. Don't drop the negative sign." },
      { text: "\\(-6x + 3x\\)", correct: false, feedback: "x×x=x², not x. You lost one power of x." }
    ],
    backward: "Distribute the negative coefficient to every term.",
    forward: "Expanding with variables and negatives is common in quadratics." },
  { itemId: "d4", order: 4, cluster: "FAC", clusterName: CLUSTER_NAMES.FAC,
    question: "Factorise: \\(18x^3 - 12x^2\\).",
    options: [
      { text: "\\(6x^2(3x - 2)\\)", correct: true, feedback: "HCF of 18 and 12 is 6; lowest power of x is x²." },
      { text: "\\(3x^2(6x - 4)\\)", correct: false, feedback: "Not fully factorised. The HCF of 18 and 12 is 6, not 3." },
      { text: "\\(6x(3x^2 - 2x)\\)", correct: false, feedback: "x² is the highest common power of x. Both terms have at least x²." },
      { text: "\\(6x^2(3x + 2)\\)", correct: false, feedback: "The sign inside should be negative: 6x²×(-2)=-12x²." }
    ],
    backward: "Take out the highest common factor including the highest power of x.",
    forward: "Factorising with higher powers is used when solving polynomial equations." },
  { itemId: "d5", order: 5, cluster: "CON", clusterName: CLUSTER_NAMES.CON,
    question: "Car rental: £30 per day plus £0.15 per kilometre. Write a formula for cost \\(C\\) for \\(d\\) days and \\(k\\) km.",
    options: [
      { text: "\\(C = 30d + 0.15k\\)", correct: true, feedback: "The cost depends on days and kilometres independently — they are added." },
      { text: "\\(C = 30 + 0.15dk\\)", correct: false, feedback: "That multiplies days and kilometres. They are separate charges, added together." },
      { text: "\\(C = 30d + 0.15\\)", correct: false, feedback: "You forgot to multiply the per-km rate by k. It's 0.15 per km, so 0.15k." },
      { text: "\\(C = 30k + 0.15d\\)", correct: false, feedback: "You swapped the rates. £30 is per day, not per km." }
    ],
    backward: "Identify the constant part and the variable parts.",
    forward: "Real-life formulas model costs, distances, and scientific relationships." },
  { itemId: "d6", order: 6, cluster: "DIS", clusterName: CLUSTER_NAMES.DIS,
    question: "Which of the following can you solve for \\(x\\)?",
    options: [
      { text: "\\(2x + 3 = 0\\)", correct: true, feedback: "An equation with one unknown can be solved." },
      { text: "\\(2x + 3\\)", correct: false, feedback: "That's an expression — nothing to solve." },
      { text: "\\(y = 2x + 3\\)", correct: false, feedback: "That's a formula — it can be rearranged but not solved for a single value without knowing y." },
      { text: "All of them", correct: false, feedback: "Only the equation can be solved." }
    ],
    backward: "Equations have a specific solution; expressions don't.",
    forward: "Identifying solvable equations is key in algebra." },
  { itemId: "d7", order: 7, cluster: "EST", clusterName: CLUSTER_NAMES.EST,
    question: "Estimate \\(4x^2 - 2x\\) when \\(x = 5.1\\).",
    options: [
      { text: "90", correct: true, feedback: "Round 5.1 to 5. 4×25=100, -2×5=10, 100-10=90." },
      { text: "100", correct: false, feedback: "You forgot to subtract the -2x term." },
      { text: "80", correct: false, feedback: "You rounded 5.1 to 4. Round to the nearest integer: 5.1→5." },
      { text: "85", correct: false, feedback: "4×25=100, -2×5=10, 100-10=90, not 85." }
    ],
    backward: "Round the input, then substitute and compute.",
    forward: "Estimation is a valuable check for calculator errors." },
  { itemId: "d8", order: 8, cluster: "EXT", clusterName: CLUSTER_NAMES.EXT,
    question: "A student expanded \\(3(2x - 1) - 2(x + 3)\\) and got \\(4x - 9\\). Is this correct?",
    options: [
      { text: "Yes, it is correct", correct: true, feedback: "6x-3-2x-6 = 4x-9." },
      { text: "No, it should be \\(4x + 3\\)", correct: false, feedback: "Check the constants: -3-6=-9, not +3." },
      { text: "No, it should be \\(4x - 3\\)", correct: false, feedback: "-3-6=-9, not -3." },
      { text: "No, it should be \\(8x - 9\\)", correct: false, feedback: "6x-2x=4x, not 8x." }
    ],
    backward: "Expand each bracket carefully, then combine like terms.",
    forward: "Error spotting sharpens your checking skills for tests." },
  { itemId: "d9", order: 9, cluster: "SUB", clusterName: CLUSTER_NAMES.SUB,
    question: "If \\(a = -1, b = 2, c = -3\\), evaluate \\(ab^2 - c^2\\).",
    options: [
      { text: "\\(-13\\)", correct: true, feedback: "(-1)×4 - 9 = -4 - 9 = -13." },
      { text: "5", correct: false, feedback: "You computed -4 + 9 = 5. c²=9, but it's minus c², not plus." },
      { text: "\\(-5\\)", correct: false, feedback: "You computed (-1)×4=-4, then -4-(-9)=5? c²=9, so -4-9=-13." },
      { text: "13", correct: false, feedback: "You dropped the negative sign: 4+9=13." }
    ],
    backward: "Square first, then multiply, then subtract.",
    forward: "Multi-variable substitution appears in physics formulas." },
  { itemId: "d10", order: 10, cluster: "INDX", clusterName: CLUSTER_NAMES.INDX,
    question: "Simplify: \\((x^2 y)^3 \\div (x y^2)\\).",
    options: [
      { text: "\\(x^5 y\\)", correct: true, feedback: "(x²y)³=x⁶y³; x⁶y³/xy² = x⁵y." },
      { text: "\\(x^6 y\\)", correct: false, feedback: "You didn't divide by the denominator. x⁶y³/xy² = x⁵y." },
      { text: "\\(x^5 y^2\\)", correct: false, feedback: "y³/y² = y, not y²." },
      { text: "\\(x^7 y^5\\)", correct: false, feedback: "You added exponents instead of subtracting when dividing." }
    ],
    backward: "Apply the power first, then divide term by term.",
    forward: "Combining index laws is essential for simplifying complex expressions." },
  { itemId: "d11", order: 11, cluster: "EXP", clusterName: CLUSTER_NAMES.EXP,
    question: "Expand and simplify: \\((x+2)(x+3)\\).",
    options: [
      { text: "\\(x^2 + 5x + 6\\)", correct: true, feedback: "FOIL: x²+3x+2x+6 = x²+5x+6." },
      { text: "\\(x^2 + 6\\)", correct: false, feedback: "Don't forget the middle terms: 3x and 2x give 5x." },
      { text: "\\(x^2 + 5x + 5\\)", correct: false, feedback: "2×3=6, not 5. Multiply the constant terms." },
      { text: "\\(x^2 + 5x\\)", correct: false, feedback: "You forgot the constant term: 2×3=6." }
    ],
    backward: "Use FOIL or the area model to expand double brackets.",
    forward: "Double brackets appear in area, quadratics, and algebraic identities." },
  { itemId: "d12", order: 12, cluster: "FAC", clusterName: CLUSTER_NAMES.FAC,
    question: "Factorise completely: \\(-10x - 15\\).",
    options: [
      { text: "\\(-5(2x + 3)\\)", correct: true, feedback: "The HCF is -5. Inside signs flip: -5×2x=-10x, -5×3=-15." },
      { text: "\\(5(-2x - 3)\\)", correct: false, feedback: "Not fully factorised. Take out -5, not 5." },
      { text: "\\(-5(2x - 3)\\)", correct: false, feedback: "-5 × -3 = +15, but we need -15. The sign inside should be positive." },
      { text: "\\(-2(5x + 7.5)\\)", correct: false, feedback: "Not fully factorised, and not using integers." }
    ],
    backward: "Factorising with a negative common factor flips the signs inside.",
    forward: "Used when solving equations by dividing by a negative." },
  { itemId: "d13", order: 13, cluster: "CON", clusterName: CLUSTER_NAMES.CON,
    question: "A rectangle has length \\(3x + 2\\) and width \\(x + 1\\). Write an expression for its perimeter, simplified.",
    options: [
      { text: "\\(8x + 6\\)", correct: true, feedback: "P=2(3x+2+x+1)=2(4x+3)=8x+6." },
      { text: "\\(4x + 3\\)", correct: false, feedback: "That's the semi-perimeter (half). Multiply by 2 to get the full perimeter." },
      { text: "\\(8x + 8\\)", correct: false, feedback: "Check the constants: 2+1=3, doubled is 6, not 8." },
      { text: "\\(6x + 4\\)", correct: false, feedback: "You might have added the dimensions without doubling." }
    ],
    backward: "Perimeter = 2×(length + width).",
    forward: "Constructing formulas from geometric situations is a key application." },
  { itemId: "d14", order: 14, cluster: "DIS", clusterName: CLUSTER_NAMES.DIS,
    question: "True or false: \\(A = lw\\) can be rearranged to find \\(l\\) if \\(A\\) and \\(w\\) are known.",
    options: [
      { text: "True", correct: true, feedback: "A formula can be rearranged: l = A/w." },
      { text: "False", correct: false, feedback: "Formulas are designed to be rearranged — that's their purpose." }
    ],
    backward: "Formulas can be rearranged; expressions cannot.",
    forward: "Rearranging formulas is a core skill in science and engineering." },
  { itemId: "d15", order: 15, cluster: "EST", clusterName: CLUSTER_NAMES.EST,
    question: "For \\(d = 5t^2\\), estimate \\(d\\) when \\(t = 4.8\\).",
    options: [
      { text: "125", correct: true, feedback: "Round 4.8 to 5. 5×5²=5×25=125." },
      { text: "120", correct: false, feedback: "You used 5²=24? 5²=25, so 5×25=125." },
      { text: "115", correct: false, feedback: "You rounded 4.8 to 4.7? Round to 5." },
      { text: "100", correct: false, feedback: "You used 5×20=100? 5²=25, not 20." }
    ],
    backward: "Round the input, then compute.",
    forward: "Estimation is used in physics when exact values aren't needed." },
  { itemId: "d16", order: 16, cluster: "EXT", clusterName: CLUSTER_NAMES.EXT,
    question: "A student simplified \\(3(x + 2) - 2(x - 1)\\) and got \\(x + 4\\). What went wrong?",
    options: [
      { text: "They added constants as 6-2=4 instead of 6+2=8", correct: true, feedback: "-2×(-1)=+2, so 3x+6-2x+2 = x+8, not x+4." },
      { text: "They subtracted the x-terms incorrectly", correct: false, feedback: "3x-2x=x is correct. The error is in the constants." },
      { text: "They forgot to expand the brackets", correct: false, feedback: "They did expand — 3(x+2)=3x+6 and -2(x-1)=-2x+2 are correct." },
      { text: "They made an error in the -2(x-1) expansion", correct: false, feedback: "-2×x=-2x and -2×(-1)=+2 are correct. The error is in adding 6+2=8, not 6-2=4." }
    ],
    backward: "Distributing a negative sign flips the sign of each term inside.",
    forward: "Error detection prevents mistakes in exams." },
  { itemId: "d17", order: 17, cluster: "SUB", clusterName: CLUSTER_NAMES.SUB,
    question: "Evaluate \\(5 - 2(x + 3)\\) when \\(x = -5\\).",
    options: [
      { text: "9", correct: true, feedback: "5 - 2(-5+3) = 5 - 2(-2) = 5 - (-4) = 5+4 = 9." },
      { text: "1", correct: false, feedback: "5 - 2(-2) = 5 - (-4) = 9, not 1. You may have forgotten the double negative." },
      { text: "\\(-9\\)", correct: false, feedback: "Check inside the brackets: -5+3=-2." },
      { text: "0", correct: false, feedback: "5 - 2(-2) = 5+4 = 9, not 0." }
    ],
    backward: "Parentheses first: compute inside, then multiply, then subtract.",
    forward: "Substituting into expressions with brackets is used in coordinate geometry." },
  { itemId: "d18", order: 18, cluster: "INDX", clusterName: CLUSTER_NAMES.INDX,
    question: "Simplify: \\(\\frac{6x^3}{3x}\\).",
    options: [
      { text: "\\(2x^2\\)", correct: true, feedback: "6÷3=2; x³/x = x²." },
      { text: "\\(2x^3\\)", correct: false, feedback: "x³/x = x², not x³. Subtract exponents." },
      { text: "\\(3x^2\\)", correct: false, feedback: "6÷3=2, not 3." },
      { text: "\\(2x\\)", correct: false, feedback: "x³/x = x², not x. Subtract exponents: 3-1=2." }
    ],
    backward: "Divide the numbers and subtract the exponents.",
    forward: "Simplifying fractions with powers is used in algebraic fractions." },
  { itemId: "d19", order: 19, cluster: "EXP", clusterName: CLUSTER_NAMES.EXP,
    question: "Expand and simplify: \\((x-1)(x+4)\\).",
    options: [
      { text: "\\(x^2 + 3x - 4\\)", correct: true, feedback: "x²+4x-x-4 = x²+3x-4." },
      { text: "\\(x^2 - 5x - 4\\)", correct: false, feedback: "-x+4x=+3x, not -5x. Check the signs." },
      { text: "\\(x^2 + 3x + 4\\)", correct: false, feedback: "-1×4=-4, not +4." },
      { text: "\\(x^2 + 5x - 4\\)", correct: false, feedback: "-x+4x=+3x, not +5x." }
    ],
    backward: "Watch the signs when multiplying.",
    forward: "Sign errors in expansion lead to incorrect factorisation." },
  { itemId: "d20", order: 20, cluster: "FAC", clusterName: CLUSTER_NAMES.FAC,
    question: "Factorise: \\(24x^4y^2 - 18x^3y^3\\).",
    options: [
      { text: "\\(6x^3y^2(4x - 3y)\\)", correct: true, feedback: "HCF of 24 and 18 is 6; lowest x is x³; lowest y is y²." },
      { text: "\\(3x^3y^2(8x - 6y)\\)", correct: false, feedback: "Not fully factorised. The HCF of 24 and 18 is 6, not 3." },
      { text: "\\(6x^4y^2(4 - 3y)\\)", correct: false, feedback: "The x-power inside is wrong." },
      { text: "\\(6x^3y^2(4x + 3y)\\)", correct: false, feedback: "The sign inside should be negative: 6x³y²×(-3y)=-18x³y³." }
    ],
    backward: "Find the highest common factor for both numbers and variables.",
    forward: "Factorising with high powers is used in algebraic fractions and calculus." },
  { itemId: "d21", order: 21, cluster: "CON", clusterName: CLUSTER_NAMES.CON,
    question: "A plumber charges \\(C = 40 + 25h\\). A job costs £165. How many hours did it take?",
    options: [
      { text: "5", correct: true, feedback: "165=40+25h → 125=25h → h=5." },
      { text: "6", correct: false, feedback: "25×6=150, plus 40=190, not 165." },
      { text: "4", correct: false, feedback: "25×4=100, plus 40=140, not 165." },
      { text: "7", correct: false, feedback: "25×7=175, plus 40=215, not 165." }
    ],
    backward: "Substitute C=165 and solve for h.",
    forward: "Solving a formula for an unknown is a key real-world skill." },
  { itemId: "d22", order: 22, cluster: "DIS", clusterName: CLUSTER_NAMES.DIS,
    question: "Which of these is a formula?",
    options: [
      { text: "\\(v = u + at\\)", correct: true, feedback: "A formula shows a relationship between variables." },
      { text: "\\(3x - 7 = 0\\)", correct: false, feedback: "That's an equation — one unknown to solve." },
      { text: "\\(2a + 3b\\)", correct: false, feedback: "That's an expression." },
      { text: "\\(x = 3\\)", correct: false, feedback: "That's an equation stating x equals 3." }
    ],
    backward: "Expression no equals; equation one solution; formula relationship.",
    forward: "Recognising the type tells you what to do: solve, rearrange, or evaluate." },
  { itemId: "d23", order: 23, cluster: "EST", clusterName: CLUSTER_NAMES.EST,
    question: "Estimate \\((1.9)^2 + 2(1.9) - 3\\).",
    options: [
      { text: "5", correct: true, feedback: "Round 1.9 to 2. 2²+2×2-3 = 4+4-3 = 5." },
      { text: "6", correct: false, feedback: "You computed 4+5-3=6? 2×2=4, not 5." },
      { text: "4", correct: false, feedback: "You forgot the 2(1.9) term." },
      { text: "3", correct: false, feedback: "You rounded 1.9 to 1? Round to 2." }
    ],
    backward: "Round the input, then substitute and compute.",
    forward: "Estimation helps verify calculator results quickly." },
  { itemId: "d24", order: 24, cluster: "EXT", clusterName: CLUSTER_NAMES.EXT,
    question: "Is it always true that \\((x+2)^2 - (x-2)^2 = 8x\\)?",
    options: [
      { text: "Yes, it simplifies to \\(8x\\)", correct: true, feedback: "(x²+4x+4)-(x²-4x+4)=8x." },
      { text: "No, it should be \\(4x\\)", correct: false, feedback: "Expand carefully: 4x+4x=8x, not 4x." },
      { text: "No, it should be 0", correct: false, feedback: "The terms don't cancel to zero." },
      { text: "Only when \\(x\\) is positive", correct: false, feedback: "The identity holds for all values of x." }
    ],
    backward: "Expand both squares, then simplify.",
    forward: "Proof-like identities appear in algebra competitions." }
];

const recheckItems = [
  { itemId: "r1", order: 1, cluster: "SUB", clusterName: CLUSTER_NAMES.SUB,
    question: "Evaluate \\(2x^2 + 3x - 1\\) when \\(x = -3\\).",
    options: [
      { text: "8", correct: true, feedback: "2×9 + (-9) - 1 = 18 - 9 - 1 = 8." },
      { text: "26", correct: false, feedback: "You treated 3x as +9 instead of -9." },
      { text: "-8", correct: false, feedback: "You squared -3 as -9. (-3)²=+9." },
      { text: "-28", correct: false, feedback: "You squared -3 as -9. (-3)²=+9." }
    ] },
  { itemId: "r2", order: 2, cluster: "INDX", clusterName: CLUSTER_NAMES.INDX,
    question: "Simplify: \\(\\frac{x^8}{x^3}\\).",
    options: [
      { text: "\\(x^5\\)", correct: true, feedback: "Subtract exponents: 8-3=5." },
      { text: "\\(x^{11}\\)", correct: false, feedback: "You added the exponents. Subtract when dividing." },
      { text: "\\(x^{24}\\)", correct: false, feedback: "You multiplied the exponents. Subtract, don't multiply." },
      { text: "\\(x^3\\)", correct: false, feedback: "Subtract exponents, don't divide them." }
    ] },
  { itemId: "r3", order: 3, cluster: "EXP", clusterName: CLUSTER_NAMES.EXP,
    question: "Expand and simplify: \\((x+4)(x+1)\\).",
    options: [
      { text: "\\(x^2 + 5x + 4\\)", correct: true, feedback: "x²+1x+4x+4 = x²+5x+4." },
      { text: "\\(x^2 + 5x + 5\\)", correct: false, feedback: "4×1=4, not 5." },
      { text: "\\(x^2 + 4x + 4\\)", correct: false, feedback: "x+4x=5x, not 4x." },
      { text: "\\(x^2 + 5\\)", correct: false, feedback: "Don't forget the middle terms: 1x+4x=5x." }
    ] },
  { itemId: "r4", order: 4, cluster: "FAC", clusterName: CLUSTER_NAMES.FAC,
    question: "Factorise: \\(20x^2y - 15xy^2\\).",
    options: [
      { text: "\\(5xy(4x - 3y)\\)", correct: true, feedback: "HCF of 20 and 15 is 5; lowest x is x; lowest y is y." },
      { text: "\\(5(4x^2y - 3xy^2)\\)", correct: false, feedback: "xy can be taken out. Both terms contain x and y." },
      { text: "\\(5x(4xy - 3y^2)\\)", correct: false, feedback: "y is also a common factor." },
      { text: "\\(5y(4x^2 - 3xy)\\)", correct: false, feedback: "x is also a common factor." }
    ] },
  { itemId: "r5", order: 5, cluster: "CON", clusterName: CLUSTER_NAMES.CON,
    question: "Write an expression for 'twice the difference between a number \\(n\\) and 7'.",
    options: [
      { text: "\\(2(n - 7)\\)", correct: true, feedback: "The difference is n-7, then doubled." },
      { text: "\\(2n - 7\\)", correct: false, feedback: "That's twice n minus 7, not twice the difference." },
      { text: "\\(2(7 - n)\\)", correct: false, feedback: "That's twice the difference the other way around." },
      { text: "\\(n - 14\\)", correct: false, feedback: "You multiplied only the 7 by 2." }
    ] },
  { itemId: "r6", order: 6, cluster: "DIS", clusterName: CLUSTER_NAMES.DIS,
    question: "Which of these can be rearranged to find \\(x\\)?",
    options: [
      { text: "\\(y = 3x - 2\\)", correct: true, feedback: "A formula can be rearranged to make x the subject." },
      { text: "\\(3x - 2\\)", correct: false, feedback: "That's an expression — nothing to rearrange." },
      { text: "\\(3x - 2 = 10\\)", correct: false, feedback: "An equation can be solved, not rearranged." },
      { text: "None of them", correct: false, feedback: "A formula can be rearranged." }
    ] },
  { itemId: "r7", order: 7, cluster: "EST", clusterName: CLUSTER_NAMES.EST,
    question: "Estimate \\(5x^2\\) when \\(x = 3.9\\).",
    options: [
      { text: "80", correct: true, feedback: "Round 3.9 to 4. 5×16=80." },
      { text: "75", correct: false, feedback: "That's close to the exact value. Estimate by rounding." },
      { text: "60", correct: false, feedback: "4²=16, 5×16=80, not 60." },
      { text: "100", correct: false, feedback: "You rounded 3.9 to 5? Round to 4." }
    ] },
  { itemId: "r8", order: 8, cluster: "EXT", clusterName: CLUSTER_NAMES.EXT,
    question: "A plumber charges \\(C = 50 + 30h\\). A job costs £200. How many hours?",
    options: [
      { text: "5", correct: true, feedback: "200-50=150; 150÷30=5." },
      { text: "6", correct: false, feedback: "30×6=180, plus 50=230, not 200." },
      { text: "4", correct: false, feedback: "30×4=120, plus 50=170, not 200." },
      { text: "7", correct: false, feedback: "30×7=210, plus 50=260, not 200." }
    ] },
  { itemId: "r9", order: 9, cluster: "SUB", clusterName: CLUSTER_NAMES.SUB,
    question: "If \\(a = -2, b = 3\\), evaluate \\(a^2b + ab^2\\).",
    options: [
      { text: "-6", correct: true, feedback: "4×3 + (-2)×9 = 12 - 18 = -6." },
      { text: "6", correct: false, feedback: "ab²=(-2)×9=-18. 12+(-18)=-6." },
      { text: "30", correct: false, feedback: "You treated ab² as +18. (-2)×9=-18." },
      { text: "-30", correct: false, feedback: "You treated a²b as -12. (-2)²=+4." }
    ] },
  { itemId: "r10", order: 10, cluster: "INDX", clusterName: CLUSTER_NAMES.INDX,
    question: "Simplify: \\((x^3)^2 \\times x\\).",
    options: [
      { text: "\\(x^7\\)", correct: true, feedback: "(x³)²=x⁶; x⁶×x=x⁷." },
      { text: "\\(x^6\\)", correct: false, feedback: "Don't forget to multiply by the extra x at the end." },
      { text: "\\(x^5\\)", correct: false, feedback: "3×2=6, plus 1=7, not 5." },
      { text: "\\(x^8\\)", correct: false, feedback: "6+1=7, not 8." }
    ] },
  { itemId: "r11", order: 11, cluster: "FAC", clusterName: CLUSTER_NAMES.FAC,
    question: "Factorise completely: \\(-12x - 18\\).",
    options: [
      { text: "-6(2x + 3)", correct: true, feedback: "The HCF is -6. Inside signs flip." },
      { text: "6(-2x - 3)", correct: false, feedback: "Take out -6, not 6." },
      { text: "-6(2x - 3)", correct: false, feedback: "-6 × -3 = +18, but we need -18." },
      { text: "-3(4x + 6)", correct: false, feedback: "Not the highest common factor." }
    ] },
  { itemId: "r12", order: 12, cluster: "EXP", clusterName: CLUSTER_NAMES.EXP,
    question: "Expand and simplify: \\((3x-2)(x+1)\\).",
    options: [
      { text: "\\(3x^2 + x - 2\\)", correct: true, feedback: "3x²+3x-2x-2 = 3x²+x-2." },
      { text: "\\(3x^2 - x - 2\\)", correct: false, feedback: "3x-2x=+x, not -x." },
      { text: "\\(3x^2 + 5x - 2\\)", correct: false, feedback: "-2x+3x=x, not 5x." },
      { text: "\\(3x^2 + x + 2\\)", correct: false, feedback: "-2×1=-2, not +2." }
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
    title: "Expressions & Formulae — Advanced Core",
    subtitle: "Grade 8 · Level 2 · Advanced Core",
    description: "Advanced substitution, index laws, expanding, factorising, constructing formulas, and estimation with algebra — a tougher warm-up, diagnostic, and spaced recheck.",
    clusterNames: CLUSTER_NAMES,
    gateReviewHTML: '<strong>Quick Review</strong><br>' +
      "&bull; Substitution: replace letters with numbers, then calculate carefully.<br>" +
      "&bull; Index laws: add exponents when multiplying; subtract when dividing.<br>" +
      "&bull; Expanding: multiply every term inside the bracket.<br>" +
      "&bull; Factorising: take out the highest common factor, including variables.<br>" +
      "&bull; Constructing: translate words into algebra &mdash; watch for order and brackets.<br>",
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

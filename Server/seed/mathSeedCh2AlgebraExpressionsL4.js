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
    skillId: "SUBEVAL-03",
    question: "If \\(x = -3\\), evaluate \\(2x^2 + x - 5\\).",
    options: [
      { text: "10", correct: true, feedback: "2×9 + (-3) - 5 = 18 - 3 - 5 = 10." },
      { text: "16", correct: false, feedback: "You treated x as +3: 2×9+3-5=18+3-5=16. x=-3, so the middle term is -3.", misconceptionId: "E-w1-a" },
      { text: "4", correct: false, feedback: "You may have squared -3 as -9: 2(-9)+(-3)-5 = -26.", misconceptionId: "E-w1-b" },
      { text: "-10", correct: false, feedback: "You got the sign of the whole expression wrong.", misconceptionId: "E-w1-c" }
    ],
    retryHint: "(-3)² = +9; 2×9=18; + (-3) = 15; -5 = 10.",
    misconceptions: [
      {
        misconceptionId: "E-w1-a",
        description: "Student drops the negative sign on the linear term, treating x (with x=-3) as +3 instead of -3.",
        rootCause: "Negative Substitution Sign Dropped — loses track of the negative sign when substituting x into the linear term.",
        remediation: "x=-3 means the linear term contributes -3 (NEGATIVE), not +3 — the full evaluation is 18+(-3)-5=10, not 18+3-5=16 (which drops the negative sign)."
      },
      {
        misconceptionId: "E-w1-b",
        description: "Student computes x² (with x=-3) as -9 instead of +9, treating the square of a negative number as negative.",
        rootCause: "Squaring Negative Numbers Misunderstood — believes squaring a negative gives a negative result.",
        remediation: "x²=(-3)²=(-3)×(-3)=+9 (negative×negative=positive) — a square is NEVER negative; the full evaluation is 2×9+(-3)-5=10, not 2×(-9)+(-3)-5=-26."
      },
      {
        misconceptionId: "E-w1-c",
        description: "Student makes a sign error somewhere in combining the three terms, landing on a negative result instead of the correct positive 10.",
        rootCause: "Computation Error — a sign is mishandled while combining the terms.",
        remediation: "Recompute step by step: 2(-3)²=18, then +(-3)=15, then -5=10 — the final result is positive 10, not -10."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Substitute x=-3 into each term separately", hint: "2(-3)², (-3), and -5." },
      { level: 2, description: "Evaluate each term carefully with correct signs", hint: "(-3)²=+9, so 2×9=18. The linear term is -3, not +3." },
      { level: 3, description: "Combine all three terms", hint: "18 + (-3) - 5 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.EE.A.2C"] },
  { itemId: "w2", order: 2, cluster: "INDX", clusterName: CLUSTER_NAMES.INDX,
    skillId: "INDXMUL-01",
    question: "Simplify: \\(x^3 \\times x^4\\).",
    options: [
      { text: "\\(x^7\\)", correct: true, feedback: "Add exponents: 3+4=7." },
      { text: "\\(x^{12}\\)", correct: false, feedback: "You multiplied the exponents. Add them when multiplying powers.", misconceptionId: "E-w2-a" },
      { text: "\\(x^1\\)", correct: false, feedback: "You subtracted the exponents. Subtract when dividing, not multiplying.", misconceptionId: "E-w2-b" },
      { text: "\\(7x\\)", correct: false, feedback: "The base is x, not a number. Add exponents, not coefficients.", misconceptionId: "E-w2-c" }
    ],
    retryHint: "When multiplying powers of the same base, add the exponents.",
    misconceptions: [
      {
        misconceptionId: "E-w2-a",
        description: "Student multiplies the exponents (3×4=12) instead of adding them when multiplying two powers with the same base.",
        rootCause: "Exponent Rule Confused — applies the MULTIPLY-exponents rule (for a power raised to another power) instead of the ADD-exponents rule (for multiplying same-base powers).",
        remediation: "When MULTIPLYING two powers with the SAME base, ADD the exponents: x³×x⁴=x^(3+4)=x⁷ — multiplying them (3×4=12) would be the rule for a power raised to another power, like (x³)⁴, not for this expression."
      },
      {
        misconceptionId: "E-w2-b",
        description: "Student subtracts the exponents (4-3=1) instead of adding them, applying the division rule to a multiplication problem.",
        rootCause: "Exponent Rule Confused — applies the SUBTRACT-exponents rule (for dividing same-base powers) instead of the ADD-exponents rule (for multiplying).",
        remediation: "SUBTRACT the exponents only when DIVIDING same-base powers — when MULTIPLYING, ADD them: x³×x⁴=x^(3+4)=x⁷, not x^(4-3)=x¹."
      },
      {
        misconceptionId: "E-w2-c",
        description: "Student adds the exponents (3+4=7) but writes it as a coefficient of x instead of an exponent, producing 7x instead of x⁷.",
        rootCause: "Exponent Confused with Coefficient — writes the correctly-computed exponent value as a multiplying coefficient instead of as a power.",
        remediation: "3+4=7 IS the correct exponent, but it must be written as a POWER of x (x⁷), not as a coefficient multiplying x (7x) — x³×x⁴=x⁷, not 7x."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify that the bases are the same", hint: "Both terms have base x." },
      { level: 2, description: "Recall the product-of-powers rule", hint: "Add the exponents together." },
      { level: 3, description: "Compute the new exponent", hint: "3 + 4 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.EE.A.1"] },
  { itemId: "w3", order: 3, cluster: "EXP", clusterName: CLUSTER_NAMES.EXP,
    skillId: "EXPAND-06",
    question: "Expand: \\(3x(2x - 1)\\).",
    options: [
      { text: "\\(6x^2 - 3x\\)", correct: true, feedback: "3x×2x=6x²; 3x×(-1)=-3x." },
      { text: "\\(6x^2 - 1\\)", correct: false, feedback: "You forgot to multiply the -1 by x.", misconceptionId: "E-w3-a" },
      { text: "\\(5x^2 - 3x\\)", correct: false, feedback: "3+2=5, but you multiply coefficients, not add them.", misconceptionId: "E-w3-b" },
      { text: "\\(6x - 3\\)", correct: false, feedback: "x×x=x², not x. You lost one power of x.", misconceptionId: "E-w3-c" }
    ],
    retryHint: "Multiply the outside term by each inside term.",
    misconceptions: [
      {
        misconceptionId: "E-w3-a",
        description: "Student multiplies 3x by -1 but drops the x factor from the multiplier, treating it as if only the coefficient 3 (not the full 3x) multiplied the -1.",
        rootCause: "Variable Factor Dropped in Distribution — loses the variable part of the multiplier when distributing to the constant term.",
        remediation: "3x must multiply the -1 in FULL (both the 3 and the x): 3x×(-1)=-3x, not just 3×(-1)=-3 (dropping the x) — the full expansion is 6x²-3x, not 6x²-1."
      },
      {
        misconceptionId: "E-w3-b",
        description: "Student adds the coefficients (3+2=5) instead of multiplying them when distributing 3x across 2x.",
        rootCause: "Multiplication Notation Misread as Addition — treats the coefficients as if they should be added rather than multiplied.",
        remediation: "3x(2x-1) means 3x MULTIPLIED by each term — 3x×2x means multiply the coefficients (3×2=6) AND add the exponents of x (1+1=2), giving 6x², not adding the coefficients (3+2=5) to get 5x²."
      },
      {
        misconceptionId: "E-w3-c",
        description: "Student multiplies the coefficients correctly but doesn't track that x×x=x², losing a power of x in the first term, and similarly drops the x from the second term.",
        rootCause: "Variable Power Not Tracked During Multiplication — forgets that multiplying x by x produces x², not just x.",
        remediation: "When multiplying x by x, the powers ADD: x¹×x¹=x², not x — the correct first term is 3×2×x²=6x², and the second term keeps its single x: 3x×(-1)=-3x, giving 6x²-3x, not 6x-3."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify what's being multiplied", hint: "3x must multiply EVERY term inside the bracket, in full." },
      { level: 2, description: "Multiply the first term, tracking coefficients and powers separately", hint: "3x × 2x: multiply coefficients (3×2) and add exponents of x (1+1)." },
      { level: 3, description: "Multiply the second term", hint: "3x × (-1) = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.7.EE.A.1"] },
  { itemId: "w4", order: 4, cluster: "FAC", clusterName: CLUSTER_NAMES.FAC,
    skillId: "FACTOR-02",
    question: "Factorise: \\(4x^2 + 8x\\).",
    options: [
      { text: "\\(4x(x + 2)\\)", correct: true, feedback: "HCF of 4 and 8 is 4; common x." },
      { text: "\\(2x(2x + 4)\\)", correct: false, feedback: "Not fully factorised. The HCF is 4x.", misconceptionId: "E-w4-a" },
      { text: "\\(4(x^2 + 2x)\\)", correct: false, feedback: "The common factor x is missing.", misconceptionId: "E-w4-b" },
      { text: "\\(4x^2 + 8x\\) is already factorised", correct: false, feedback: "There is a common factor of 4x.", misconceptionId: "E-w4-c" }
    ],
    retryHint: "Find the highest common factor — both 4 and x.",
    misconceptions: [
      {
        misconceptionId: "E-w4-a",
        description: "Student factors out 2x, a common factor, but doesn't check that a LARGER common factor (4x) also exists.",
        rootCause: "Not the Highest Common Factor — factors out A common factor but not the HIGHEST one.",
        remediation: "2x IS a common factor of 4x² and 8x, but it's not the HIGHEST — 4x is also common (4x²÷4x=x, 8x÷4x=2) and larger than 2x, so the fully factorised form is 4x(x+2), not the incompletely factorised 2x(2x+4)."
      },
      {
        misconceptionId: "E-w4-b",
        description: "Student factors out only the numeric HCF (4) but doesn't also factor out the common variable x.",
        rootCause: "Variable Factor Not Extracted — factors out the numeric common factor but misses the common variable factor.",
        remediation: "Both terms share not just the number 4 but also a factor of x (4x² has x, 8x has x) — the full common factor is 4x, not just 4: 4x(x+2), not the incompletely factorised 4(x²+2x)."
      },
      {
        misconceptionId: "E-w4-c",
        description: "Student assumes the expression cannot be factorised further, not recognising that both 4x² and 8x share a common factor of 4x.",
        rootCause: "Common Factor Not Recognised — fails to identify that both terms share a factor.",
        remediation: "Check each term: 4x² has factors 4, x (and more), and 8x has factors 4, x — since BOTH terms share 4x, the expression CAN be factorised: 4x(x+2), not left as 4x²+8x."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the numeric HCF of 4 and 8", hint: "The HCF of 4 and 8 is 4." },
      { level: 2, description: "Find the common variable factor", hint: "Both terms have at least one x." },
      { level: 3, description: "Divide each term by the full common factor 4x", hint: "4x²÷4x=x. 8x÷4x=2." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.7.EE.A.1"] },
  { itemId: "w5", order: 5, cluster: "ALGF", clusterName: CLUSTER_NAMES.ALGF,
    skillId: "ALGFRAC-01",
    question: "Simplify: \\(\\frac{6x^2}{3x}\\).",
    options: [
      { text: "\\(2x\\)", correct: true, feedback: "6÷3=2; x²÷x = x." },
      { text: "\\(2x^2\\)", correct: false, feedback: "x²÷x = x, not x². Subtract exponents.", misconceptionId: "E-w5-a" },
      { text: "\\(3x\\)", correct: false, feedback: "6÷3=2, not 3.", misconceptionId: "E-w5-b" },
      { text: "\\(2\\)", correct: false, feedback: "x²÷x = x, not nothing.", misconceptionId: "E-w5-c" }
    ],
    retryHint: "Divide the numbers and subtract the exponents.",
    misconceptions: [
      {
        misconceptionId: "E-w5-a",
        description: "Student correctly divides the numeric coefficients (6÷3=2) but forgets to reduce the exponent on x, keeping x² unchanged instead of x.",
        rootCause: "Exponent Not Reduced During Division — divides the coefficients but leaves the variable's exponent untouched.",
        remediation: "The coefficients divide (6÷3=2) AND the exponents subtract (2-1=1, since x means x¹) — both parts must be simplified: 2x, not 2x² (which leaves the exponent unreduced)."
      },
      {
        misconceptionId: "E-w5-b",
        description: "Student miscalculates the coefficient division, getting 6÷3=3 instead of 2, a basic arithmetic slip.",
        rootCause: "Computation Error — a basic division fact is computed incorrectly.",
        remediation: "6÷3=2, not 3 — recompute the coefficient division carefully: 2x, not 3x."
      },
      {
        misconceptionId: "E-w5-c",
        description: "Student correctly divides the coefficients (6÷3=2) but believes the x term cancels away entirely, giving just a number instead of 2x.",
        rootCause: "Variable Assumed to Cancel Completely — incorrectly believes the variable disappears entirely during division instead of reducing its exponent.",
        remediation: "x²÷x=x (using the exponent rule: 2-1=1), the x does NOT disappear entirely — the full answer is 2x, not just 2 (which drops the remaining x)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Divide the numeric coefficients", hint: "6 ÷ 3 = 2." },
      { level: 2, description: "Identify the implicit exponent of x in the denominator", hint: "x means x¹." },
      { level: 3, description: "Subtract the exponents for the variable part", hint: "x² ÷ x¹: 2 - 1 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.HSA-APR.D.6"] },
  { itemId: "w6", order: 6, cluster: "CON", clusterName: CLUSTER_NAMES.CON,
    skillId: "CONSTRUCT-02",
    question: "Write an expression for 'five less than three times a number \\(x\\)'.",
    options: [
      { text: "\\(3x - 5\\)", correct: true, feedback: "'Less than' reverses the order." },
      { text: "\\(5 - 3x\\)", correct: false, feedback: "That's 5 minus 3x — reversed order.", misconceptionId: "E-w6-a" },
      { text: "\\(3(x - 5)\\)", correct: false, feedback: "That's three times (x-5), a different expression.", misconceptionId: "E-w6-b" },
      { text: "\\(3x + 5\\)", correct: false, feedback: "That's five more than.", misconceptionId: "E-w6-c" }
    ],
    retryHint: "'Less than' means subtract from what comes after.",
    misconceptions: [
      {
        misconceptionId: "E-w6-a",
        description: "Student translates the phrase in its literal reading order, writing 5-3x instead of recognising that 'less than' reverses the order to 3x-5.",
        rootCause: "'Less Than' Order Not Reversed — translates phrases word-by-word in the order they appear instead of recognising the reversal that 'less than' requires.",
        remediation: "'X less than Y' means Y-X (the order REVERSES) — 'five less than three times x' means (three times x) minus five = 3x-5, not 5-3x (which would be 'three times x less than five')."
      },
      {
        misconceptionId: "E-w6-b",
        description: "Student groups '(x-5)' together and multiplies by 3, misreading 'three times a number' as applying to the whole subtraction rather than just to x.",
        rootCause: "Scope of Multiplication Misread — applies the multiplier to an entire subtraction instead of just to the number.",
        remediation: "'Three times a number x' means 3×x=3x on its own, THEN 'five less than' that result subtracts 5 afterward: 3x-5, not 3(x-5), which would mean 'three times a number that is five less than x'."
      },
      {
        misconceptionId: "E-w6-c",
        description: "Student uses the wrong operation, adding 5 instead of subtracting it, treating 'less than' as if it meant 'more than'.",
        rootCause: "Operation Keyword Misread — confuses a subtraction keyword ('less than') with an addition expression.",
        remediation: "'Less than' signals SUBTRACTION, not addition — 'five less than three times x' means 3x-5, not 3x+5 (which would be phrased as 'five more than three times x')."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Translate 'three times a number x'", hint: "This part is simply 3x." },
      { level: 2, description: "Recognise that 'less than' reverses the order", hint: "'A less than B' means B - A, not A - B." },
      { level: 3, description: "Combine the pieces in the correct order", hint: "3x, then subtract 5: 3x - 5." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.EE.A.2A"] },
  { itemId: "w7", order: 7, cluster: "REA", clusterName: CLUSTER_NAMES.REA,
    skillId: "REARRANGE-01",
    question: "Make \\(x\\) the subject of \\(y = 2x - 5\\).",
    options: [
      { text: "\\(x = \\frac{y+5}{2}\\)", correct: true, feedback: "Add 5, then divide by 2." },
      { text: "\\(x = \\frac{y}{2} + 5\\)", correct: false, feedback: "Add 5 first, then divide the whole thing by 2.", misconceptionId: "E-w7-a" },
      { text: "\\(x = 2y + 5\\)", correct: false, feedback: "Use inverse operations.", misconceptionId: "E-w7-b" },
      { text: "\\(x = \\frac{y-5}{2}\\)", correct: false, feedback: "Add 5, not subtract.", misconceptionId: "E-w7-c" }
    ],
    retryHint: "Add 5 to both sides, then divide by 2.",
    misconceptions: [
      {
        misconceptionId: "E-w7-a",
        description: "Student divides by 2 before adding 5, applying the inverse operations in the wrong order.",
        rootCause: "Inverse Operations Applied in Wrong Order — undoes the operations in the same order they were originally applied instead of reverse order.",
        remediation: "Inverse operations must be undone in REVERSE order — since the original was '×2 then -5', undo by first adding 5 (undoing the -5), THEN dividing by 2 (undoing the ×2): x=(y+5)/2, not x=y/2+5 (which divides first)."
      },
      {
        misconceptionId: "E-w7-b",
        description: "Student uses the wrong inverse operations entirely, multiplying by 2 instead of dividing and adding instead of undoing subtraction, producing x=2y+5.",
        rootCause: "Wrong Inverse Operations Used — uses operations that don't correctly undo the original operations.",
        remediation: "To undo '×2', you must DIVIDE by 2 (not multiply) — and to undo '-5', you must ADD 5 (not just append it) — correctly: x=(y+5)/2, not x=2y+5 (which uses multiplication and addition, the same operations as the original, instead of their inverses)."
      },
      {
        misconceptionId: "E-w7-c",
        description: "Student subtracts 5 instead of adding it, using the same operation as the original equation instead of its inverse.",
        rootCause: "Wrong Inverse Operation Used — subtracts instead of adding, failing to undo the original subtraction.",
        remediation: "To undo '-5' (subtracting 5), you must ADD 5 (the inverse operation), not subtract again: y+5=2x, then divide by 2: x=(y+5)/2, not x=(y-5)/2 (which uses subtraction again instead of the inverse)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the operations applied to x, in order", hint: "x was multiplied by 2, then 5 was subtracted." },
      { level: 2, description: "Undo the operations in REVERSE order, using inverses", hint: "First undo the -5 by adding 5 to both sides." },
      { level: 3, description: "Undo the multiplication by dividing both sides", hint: "y+5=2x, so divide both sides by 2." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.HSA-CED.A.4"] },
  { itemId: "w8", order: 8, cluster: "EXT", clusterName: CLUSTER_NAMES.EXT,
    skillId: "EXTDIAG-02",
    question: "A student simplified \\(3(x+2) - (x-1)\\) and got \\(2x+5\\). What went wrong?",
    options: [
      { text: "\\(-(x-1)\\) should be \\(-x+1\\), not \\(-x-1\\)", correct: true, feedback: "Correct answer: 2x+7." },
      { text: "3(x+2) was expanded incorrectly", correct: false, feedback: "3x+6 is correct.", misconceptionId: "E-w8-a" },
      { text: "The x-terms were combined incorrectly", correct: false, feedback: "3x-x=2x is correct.", misconceptionId: "E-w8-b" },
      { text: "Nothing — it is correct", correct: false, feedback: "The constant should be 7, not 5.", misconceptionId: "E-w8-c" }
    ],
    retryHint: "A minus sign before a bracket flips the signs inside.",
    misconceptions: [
      {
        misconceptionId: "E-w8-a",
        description: "Student misdiagnoses the error, claiming 3(x+2) was expanded incorrectly, when in fact 3(x+2)=3x+6 is correct and the actual error is in the second bracket's sign distribution.",
        rootCause: "Error Location Misidentified — flags a correct step as the source of the error instead of the actual incorrect step.",
        remediation: "3(x+2)=3x+6 IS correctly expanded — the actual error is in the SECOND bracket: -(x-1) should distribute the negative sign to BOTH terms inside, giving -x+1, but the student treated it as -x-1 (not flipping the second sign)."
      },
      {
        misconceptionId: "E-w8-b",
        description: "Student misdiagnoses the error, claiming the x-terms were combined incorrectly, when in fact 3x-x=2x is correct and the actual error is in how the constant from the second bracket was handled.",
        rootCause: "Error Location Misidentified — flags a correct step as the source of the error instead of the actual incorrect step.",
        remediation: "3x-x=2x IS correct — the actual error is in the CONSTANT from the second bracket: -(x-1) should give -x+1 (the -1 becomes +1 when distributed), but the student incorrectly kept it as -1, leading to a constant of 6-1=5 instead of the correct 6+1=7."
      },
      {
        misconceptionId: "E-w8-c",
        description: "Student believes the given simplification (2x+5) is correct, not recognising that the leading minus sign before the second bracket was not fully distributed.",
        rootCause: "Sign Distribution Error Not Recognised — accepts an expansion where a leading negative sign wasn't fully distributed as if it were correct.",
        remediation: "-(x-1) means -1×(x-1), which distributes to -x+1 (both terms flip sign) — the student's version treated it as -x-1 (only the first term flipped) — the correct final answer is 2x+7, not 2x+5."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Rewrite the minus sign before the second bracket as multiplying by -1", hint: "-(x-1) = -1×(x-1)." },
      { level: 2, description: "Distribute -1 to both terms inside the bracket", hint: "-1×x=-x. -1×(-1)=+1." },
      { level: 3, description: "Combine the fully-expanded expression", hint: "3x+6+(-x)+1 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: [] }
];

const diagnosticItems = [
  { itemId: "d1", order: 1, cluster: "SUB", clusterName: CLUSTER_NAMES.SUB,
    skillId: "SUBEVAL-03",
    question: "If \\(x = -3\\), evaluate \\(2x^2 - 3x + 1\\).",
    options: [
      { text: "28", correct: true, feedback: "2×9 - 3×(-3) + 1 = 18 + 9 + 1 = 28." },
      { text: "10", correct: false, feedback: "You treated -3x as -9. (-3)×(-3)=+9.", misconceptionId: "E-d1-a" },
      { text: "-8", correct: false, feedback: "You squared -3 as -9.", misconceptionId: "E-d1-b" },
      { text: "1", correct: false, feedback: "You only kept the constant.", misconceptionId: "E-d1-c" }
    ],
    backward: "(-3)²=+9; -3×(-3)=+9.",
    forward: "Substituting negatives is essential for graphing.",
    misconceptions: [
      {
        misconceptionId: "E-d1-a",
        description: "Student computes -3x (with x=-3) as -9 instead of +9, mishandling the sign of a negative times a negative.",
        rootCause: "Sign Rule Confused — treats negative×negative as negative instead of positive.",
        remediation: "-3x with x=-3 means -3×(-3), and negative×negative=POSITIVE: -3×(-3)=+9, not -9 — the full evaluation is 18+9+1=28, not 18-9+1=10."
      },
      {
        misconceptionId: "E-d1-b",
        description: "Student computes (-3)² as -9 instead of +9, treating the square of a negative number as negative.",
        rootCause: "Squaring Negative Numbers Misunderstood — believes squaring a negative gives a negative result.",
        remediation: "(-3)²=(-3)×(-3), and negative×negative=POSITIVE, so (-3)²=+9, not -9 — a square is NEVER negative; the full evaluation is 2×9+9+1=28, not -8."
      },
      {
        misconceptionId: "E-d1-c",
        description: "Student keeps only the constant term (+1) and ignores the 2x² and -3x terms entirely.",
        rootCause: "Variable Terms Dropped — discards terms containing the variable instead of evaluating them.",
        remediation: "EVERY term must be evaluated with x=-3 substituted in, not just the constant — 2x²=18, -3x=+9, and the constant is +1, giving 18+9+1=28, not just the constant 1 alone."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Substitute x=-3 into each term separately", hint: "2(-3)², -3(-3), and +1." },
      { level: 2, description: "Evaluate each term carefully with correct signs", hint: "(-3)²=+9, so 2×9=18. -3×(-3)=+9." },
      { level: 3, description: "Add all three terms", hint: "18 + 9 + 1 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.EE.A.2C"] },
  { itemId: "d2", order: 2, cluster: "INDX", clusterName: CLUSTER_NAMES.INDX,
    skillId: "INDXDIV-01",
    question: "Simplify: \\(\\frac{x^5}{x^2}\\).",
    options: [
      { text: "\\(x^3\\)", correct: true, feedback: "Subtract exponents: 5-2=3." },
      { text: "\\(x^7\\)", correct: false, feedback: "Add exponents when multiplying, not dividing.", misconceptionId: "E-d2-a" },
      { text: "\\(x^{10}\\)", correct: false, feedback: "You multiplied the exponents.", misconceptionId: "E-d2-b" },
      { text: "\\(2.5\\)", correct: false, feedback: "Don't divide the exponents; subtract them.", misconceptionId: "E-d2-c" }
    ],
    backward: "x⁵/x² = x³.",
    forward: "Index laws are essential for algebraic fractions.",
    misconceptions: [
      {
        misconceptionId: "E-d2-a",
        description: "Student adds the exponents (5+2=7) instead of subtracting them when dividing two powers with the same base.",
        rootCause: "Exponent Rule Confused — applies the ADD-exponents rule (for multiplying same-base powers) instead of the SUBTRACT-exponents rule (for dividing).",
        remediation: "When DIVIDING two powers with the SAME base, SUBTRACT the exponents: x⁵÷x²=x^(5-2)=x³ — adding them (5+2=7) would be the rule for MULTIPLYING same-base powers, not dividing."
      },
      {
        misconceptionId: "E-d2-b",
        description: "Student multiplies the exponents (5×2=10) instead of subtracting them.",
        rootCause: "Exponent Rule Confused — applies the MULTIPLY-exponents rule (for a power raised to another power) instead of the SUBTRACT-exponents rule (for dividing same-base powers).",
        remediation: "When DIVIDING same-base powers, SUBTRACT the exponents: x⁵÷x²=x^(5-2)=x³ — multiplying them (5×2=10) would be the rule for a power raised to another power, not for this division."
      },
      {
        misconceptionId: "E-d2-c",
        description: "Student divides the exponents (5÷2=2.5) instead of subtracting them.",
        rootCause: "Exponent Rule Confused — divides the exponents instead of subtracting them.",
        remediation: "When dividing same-base powers, SUBTRACT the exponents (not divide them): x⁵÷x²=x^(5-2)=x³, not x^(5÷2)=x^2.5."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify that the bases are the same", hint: "Both terms have base x." },
      { level: 2, description: "Recall the quotient-of-powers rule", hint: "Subtract the exponents." },
      { level: 3, description: "Compute the new exponent", hint: "5 - 2 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.EE.A.1"] },
  { itemId: "d3", order: 3, cluster: "EXP", clusterName: CLUSTER_NAMES.EXP,
    skillId: "EXPAND-07",
    question: "Expand: \\(-2x(3 - x)\\).",
    options: [
      { text: "\\(-6x + 2x^2\\)", correct: true, feedback: "-2x×3=-6x; -2x×(-x)=+2x²." },
      { text: "\\(-6x - 2x^2\\)", correct: false, feedback: "-2x×(-x)=+2x², not -2x².", misconceptionId: "E-d3-a" },
      { text: "\\(6x - 2x^2\\)", correct: false, feedback: "-2x×3=-6x, not +6x.", misconceptionId: "E-d3-b" },
      { text: "\\(-6x + 2x\\)", correct: false, feedback: "x×x = x², not x.", misconceptionId: "E-d3-c" }
    ],
    backward: "Distribute the negative coefficient.",
    forward: "Expanding with negatives is common in quadratics.",
    misconceptions: [
      {
        misconceptionId: "E-d3-a",
        description: "Student computes -2x×(-x) as -2x² instead of +2x², mishandling the sign of a negative times a negative.",
        rootCause: "Sign Rule Confused — treats negative×negative as negative instead of positive.",
        remediation: "-2x×(-x): negative×negative=POSITIVE, so this equals +2x², not -2x² — the correct expansion is -6x+2x², not -6x-2x²."
      },
      {
        misconceptionId: "E-d3-b",
        description: "Student drops the negative sign on the first term, computing -2x×3 as +6x instead of -6x.",
        rootCause: "Sign Dropped During Distribution — loses track of the negative sign on the outer multiplier.",
        remediation: "-2x×3: negative×positive=NEGATIVE, so this equals -6x, not +6x — the correct expansion is -6x+2x², not 6x-2x²."
      },
      {
        misconceptionId: "E-d3-c",
        description: "Student computes -2x×(-x) but drops one power of x, treating x×x as x instead of x², landing on -6x+2x instead of -6x+2x².",
        rootCause: "Variable Power Not Tracked During Multiplication — forgets that multiplying x by x produces x², not just x.",
        remediation: "When multiplying x by x, the powers ADD: x¹×x¹=x², not x — -2x×(-x)=+2x² (the exponents of x add: 1+1=2), not +2x (which incorrectly loses a power of x)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify what's being multiplied", hint: "-2x must multiply EVERY term inside the bracket, including its sign." },
      { level: 2, description: "Multiply the first term", hint: "-2x × 3 = -6x." },
      { level: 3, description: "Multiply the second term, tracking both the sign and the power of x", hint: "-2x × (-x): negative × negative = positive, and x×x=x²." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.7.EE.A.1"] },
  { itemId: "d4", order: 4, cluster: "FAC", clusterName: CLUSTER_NAMES.FAC,
    skillId: "FACTOR-02",
    question: "Factorise \\(6x^2 + 9x\\) completely.",
    options: [
      { text: "\\(3x(2x + 3)\\)", correct: true, feedback: "HCF of 6 and 9 is 3; common x." },
      { text: "\\(3(2x^2 + 3x)\\)", correct: false, feedback: "x can also be taken out.", misconceptionId: "E-d4-a" },
      { text: "\\(x(6x + 9)\\)", correct: false, feedback: "HCF is 3x, not just x.", misconceptionId: "E-d4-b" },
      { text: "Already factorised", correct: false, feedback: "There is a common factor of 3x.", misconceptionId: "E-d4-c" }
    ],
    backward: "Take out the highest common factor.",
    forward: "Factorising is crucial for solving quadratics.",
    misconceptions: [
      {
        misconceptionId: "E-d4-a",
        description: "Student factors out only the numeric HCF (3) but doesn't also factor out the common variable x, leaving x² inside the bracket instead of x.",
        rootCause: "Variable Factor Not Extracted — factors out the numeric common factor but misses the common variable factor.",
        remediation: "Both terms share not just the number 3 but also a factor of x (6x² has x, 9x has x) — the full common factor is 3x, not just 3: 3x(2x+3), not the incompletely factorised 3(2x²+3x)."
      },
      {
        misconceptionId: "E-d4-b",
        description: "Student factors out only x, the common variable, but doesn't also factor out the numeric common factor (3), leaving coefficients 6 and 9 inside the bracket instead of 2 and 3.",
        rootCause: "Numeric Factor Not Extracted — factors out the common variable but misses the numeric common factor.",
        remediation: "Both terms share not just x but also the number 3 (6=3×2, 9=3×3) — the full common factor is 3x, not just x: 3x(2x+3), not the incompletely factorised x(6x+9)."
      },
      {
        misconceptionId: "E-d4-c",
        description: "Student assumes the expression cannot be factorised further, not recognising that both 6x² and 9x share a common factor of 3x.",
        rootCause: "Common Factor Not Recognised — fails to identify that both terms share a factor.",
        remediation: "Check each term: 6x² has factors 3, x (and more), and 9x has factors 3, x — since BOTH terms share 3x, the expression CAN be factorised: 3x(2x+3), not left as 6x²+9x."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the numeric HCF of 6 and 9", hint: "The HCF of 6 and 9 is 3." },
      { level: 2, description: "Find the common variable factor", hint: "Both terms have at least one x." },
      { level: 3, description: "Divide each term by the full common factor 3x", hint: "6x²÷3x=2x. 9x÷3x=3." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.7.EE.A.1"] },
  { itemId: "d5", order: 5, cluster: "ALGF", clusterName: CLUSTER_NAMES.ALGF,
    skillId: "ALGFRAC-02",
    question: "Simplify: \\(\\frac{x^2 + 5x}{x}\\).",
    options: [
      { text: "\\(x + 5\\)", correct: true, feedback: "x²/x = x; 5x/x = 5." },
      { text: "\\(x^2 + 5\\)", correct: false, feedback: "You forgot to divide x² by x.", misconceptionId: "E-d5-a" },
      { text: "\\(5x\\)", correct: false, feedback: "x²/x = x, but you also need to divide 5x.", misconceptionId: "E-d5-b" },
      { text: "\\(x + 5x\\)", correct: false, feedback: "5x/x = 5, not 5x.", misconceptionId: "E-d5-c" }
    ],
    backward: "Divide each term by x.",
    forward: "Simplifying rational expressions.",
    misconceptions: [
      {
        misconceptionId: "E-d5-a",
        description: "Student divides only the second term (5x/x=5) by the denominator but leaves the first term (x²) undivided.",
        rootCause: "Not Every Term Divided — divides only part of the numerator by the denominator instead of every term.",
        remediation: "EVERY term in the numerator must be divided by x: x²/x=x AND 5x/x=5 — the full simplification is x+5, not x²+5 (which leaves the x² term unmultiplied)."
      },
      {
        misconceptionId: "E-d5-b",
        description: "Student divides only the first term (x²/x=x) by the denominator but leaves the second term (5x) undivided.",
        rootCause: "Not Every Term Divided — divides only part of the numerator by the denominator instead of every term.",
        remediation: "EVERY term in the numerator must be divided by x: x²/x=x AND 5x/x=5 — the full simplification is x+5, not just 5x (which leaves the x² term's division incomplete)."
      },
      {
        misconceptionId: "E-d5-c",
        description: "Student correctly divides the first term (x) but doesn't actually divide the second term, incorrectly copying it over unchanged as 5x instead of simplifying to 5.",
        rootCause: "Division Not Completed on Second Term — copies a term over without applying the required division.",
        remediation: "5x divided by x means the x's cancel: 5x/x=5 (not 5x, which would mean no division happened) — the full simplification is x+5, not x+5x."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recognise that every term in the numerator must be divided by the denominator", hint: "(x²+5x)/x means x²/x + 5x/x." },
      { level: 2, description: "Divide the first term", hint: "x²/x = x (subtract exponents: 2-1=1)." },
      { level: 3, description: "Divide the second term", hint: "5x/x = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.HSA-APR.D.6"] },
  { itemId: "d6", order: 6, cluster: "CON", clusterName: CLUSTER_NAMES.CON,
    skillId: "CONSTRUCT-10",
    question: "Write an expression for 'the product of a number \\(n\\) and three more than the number'.",
    options: [
      { text: "\\(n(n + 3)\\)", correct: true, feedback: "Product of n and (n+3)." },
      { text: "\\(n + 3n\\)", correct: false, feedback: "Product means multiply, not add.", misconceptionId: "E-d6-a" },
      { text: "\\(3n^2\\)", correct: false, feedback: "That's 3 times the square of n.", misconceptionId: "E-d6-b" },
      { text: "\\(n^2 + 3\\)", correct: false, feedback: "That's the square plus 3.", misconceptionId: "E-d6-c" }
    ],
    backward: "Product means multiplication.",
    forward: "Constructing expressions is key for word problems.",
    misconceptions: [
      {
        misconceptionId: "E-d6-a",
        description: "Student translates 'product' as addition, writing n+3n instead of the correct multiplication n(n+3).",
        rootCause: "Operation Keyword Misread — confuses a multiplication keyword ('product') with an addition expression.",
        remediation: "'Product' signals MULTIPLICATION, not addition — 'the product of n and (n+3)' means n×(n+3)=n(n+3), not n+3n (which uses addition instead)."
      },
      {
        misconceptionId: "E-d6-b",
        description: "Student writes 3n² instead of correctly identifying the second factor as (n+3), misreading the phrase's structure.",
        rootCause: "Second Factor Misidentified — doesn't correctly translate 'three more than the number' as (n+3) before forming the product.",
        remediation: "'Three more than the number' means n+3 (not 3×n or n² related) — the product is n×(n+3)=n(n+3), not 3n² (which incorrectly reinterprets the second factor)."
      },
      {
        misconceptionId: "E-d6-c",
        description: "Student writes n²+3, treating 'the number' as squared and 3 as simply added at the end, rather than correctly forming the product n×(n+3).",
        rootCause: "Product Misread as Square Plus Constant — confuses 'product of n and (n+3)' with squaring n and adding 3.",
        remediation: "The PRODUCT of n and (n+3) means MULTIPLYING them together: n×(n+3)=n(n+3) — this is not the same as n² + 3, which would come from squaring n and separately adding 3."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Translate 'three more than the number'", hint: "This part is n+3." },
      { level: 2, description: "Recall what 'product' means", hint: "Product means multiplication." },
      { level: 3, description: "Combine the two factors by multiplying", hint: "n × (n+3) = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.EE.A.2A"] },
  { itemId: "d7", order: 7, cluster: "REA", clusterName: CLUSTER_NAMES.REA,
    skillId: "FORMULAUSE-01",
    question: "Use \\(v = u + at\\). Find \\(v\\) when \\(u=2, a=5, t=4\\).",
    options: [
      { text: "22", correct: true, feedback: "v = 2 + 5×4 = 2 + 20 = 22." },
      { text: "11", correct: false, feedback: "You added: 2+5+4=11. v=u+at, not u+a+t.", misconceptionId: "E-d7-a" },
      { text: "28", correct: false, feedback: "You multiplied u×a=10, then +t=14? No.", misconceptionId: "E-d7-b" },
      { text: "40", correct: false, feedback: "You multiplied everything: 2×5×4=40.", misconceptionId: "E-d7-c" }
    ],
    backward: "Substitute and follow order of operations.",
    forward: "Using formulas is a key science skill.",
    misconceptions: [
      {
        misconceptionId: "E-d7-a",
        description: "Student adds all three values (u+a+t=2+5+4=11), misreading the formula as if a and t were separately added rather than multiplied together first.",
        rootCause: "Formula Structure Misread — treats 'at' as a separate addend instead of a product (a multiplied by t).",
        remediation: "In the formula v=u+at, 'at' means a MULTIPLIED by t, not a separate term to add — first compute a×t=5×4=20, THEN add u: 2+20=22, not adding all three values directly (2+5+4=11)."
      },
      {
        misconceptionId: "E-d7-b",
        description: "Student multiplies u and a together (u×a=2×5=10), misreading which two quantities are meant to be multiplied in the formula.",
        rootCause: "Wrong Variables Multiplied — multiplies the wrong pair of quantities instead of the ones the formula specifies.",
        remediation: "In v=u+at, it's a AND t that multiply together (at=a×t), not u and a — compute a×t=5×4=20, then add u: 2+20=22, not u×a=2×5=10."
      },
      {
        misconceptionId: "E-d7-c",
        description: "Student multiplies all three values together (u×a×t=2×5×4=40), misreading the formula as a triple product instead of u added to the product of a and t.",
        rootCause: "Formula Structure Misread — treats the entire formula as multiplication instead of addition combined with multiplication.",
        remediation: "v=u+at means u is ADDED to the product of a and t, not multiplied by it — compute a×t=5×4=20, THEN add u: 2+20=22, not multiplying all three: 2×5×4=40."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify which quantities multiply together in the formula", hint: "In v=u+at, 'at' means a × t." },
      { level: 2, description: "Compute the product first", hint: "a × t = 5 × 4 = 20." },
      { level: 3, description: "Add u to the product", hint: "2 + 20 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.EE.A.2C"] },
  { itemId: "d8", order: 8, cluster: "EXT", clusterName: CLUSTER_NAMES.EXT,
    skillId: "EXTDIAG-03",
    question: "A student expanded \\((x+2)(x+3)\\) and got \\(x^2 + 6\\). What went wrong?",
    options: [
      { text: "Forgot the middle terms \\(2x+3x\\)", correct: true, feedback: "The middle terms give 5x." },
      { text: "Multiplied constants wrong", correct: false, feedback: "2×3=6 is correct.", misconceptionId: "E-d8-a" },
      { text: "Squared x incorrectly", correct: false, feedback: "x² is correct.", misconceptionId: "E-d8-b" },
      { text: "It is correct", correct: false, feedback: "No, the middle terms are missing.", misconceptionId: "E-d8-c" }
    ],
    backward: "FOIL ensures every term.",
    forward: "Error spotting sharpens checking skills.",
    misconceptions: [
      {
        misconceptionId: "E-d8-a",
        description: "Student misdiagnoses the error, claiming the constants were multiplied incorrectly, when in fact 2×3=6 is correct and the actual error is that the cross terms were skipped entirely.",
        rootCause: "Error Location Misidentified — flags a correct step as the source of the error instead of the actual missing step.",
        remediation: "2×3=6 IS correctly computed for the Last term — the actual error is that the Outer and Inner cross terms (x×3=3x and 2×x=2x) were never computed at all, so the middle term 2x+3x=5x is completely missing from the answer."
      },
      {
        misconceptionId: "E-d8-b",
        description: "Student claims x² was computed incorrectly, when in fact x×x=x² is correct and the actual error is that the cross terms were omitted.",
        rootCause: "Error Location Misidentified — flags a correct step as the source of the error instead of the actual missing step.",
        remediation: "x×x=x² IS correctly computed for the First term — the actual error is that the Outer and Inner cross terms were never computed at all, so the middle term 2x+3x=5x is completely missing from the answer."
      },
      {
        misconceptionId: "E-d8-c",
        description: "Student believes the given expansion (x²+6) is fully correct, not recognising that the Outer and Inner cross-term products were never computed.",
        rootCause: "Cross Terms Omission Not Recognised — accepts an incomplete FOIL expansion as correct without checking that all four products were included.",
        remediation: "A complete expansion of (x+2)(x+3) requires FOUR products: First (x²), Outer (3x), Inner (2x), and Last (6) — the given answer x²+6 only has the First and Last terms, missing the two cross terms (3x+2x=5x) entirely; the correct expansion is x²+5x+6."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "List all four products required by FOIL", hint: "First, Outer, Inner, Last." },
      { level: 2, description: "Check the given answer against this list", hint: "x²+6 only shows First (x²) and Last (6) — what's missing?" },
      { level: 3, description: "Compute the missing terms", hint: "Outer: x×3=3x. Inner: 2×x=2x." }
    ],
    forwardRiskLinks: [],
    learningObjectives: [] },
  { itemId: "d9", order: 9, cluster: "SUB", clusterName: CLUSTER_NAMES.SUB,
    skillId: "SUBEVAL-07",
    question: "If \\(a = -1, b = 2, c = -3\\), evaluate \\(ab^2 - c^2\\).",
    options: [
      { text: "\\(-13\\)", correct: true, feedback: "(-1)×4 - 9 = -4 - 9 = -13." },
      { text: "5", correct: false, feedback: "You added: -4+9=5. It's minus c².", misconceptionId: "E-d9-a" },
      { text: "\\(-5\\)", correct: false, feedback: "You computed -4 - (-9)=5? No.", misconceptionId: "E-d9-b" },
      { text: "13", correct: false, feedback: "You dropped the negative sign.", misconceptionId: "E-d9-c" }
    ],
    backward: "Square first, then multiply, then subtract.",
    forward: "Multi-variable substitution in physics.",
    misconceptions: [
      {
        misconceptionId: "E-d9-a",
        description: "Student adds -4 and 9 (getting 5) instead of subtracting 9 (as c²) from -4, treating the second term as if it were added rather than subtracted.",
        rootCause: "Subtraction Direction Confused — adds the second term instead of correctly subtracting it as the expression specifies.",
        remediation: "The expression is ab² MINUS c², so subtract: -4-9=-13, not -4+9=5 — c² is always subtracted here, never added."
      },
      {
        misconceptionId: "E-d9-b",
        description: "Student treats c² as -9 instead of +9 and subtracts a negative, incorrectly arriving at 5 instead of -13.",
        rootCause: "Squaring Negative Numbers Misunderstood — believes squaring a negative gives a negative result.",
        remediation: "c²=(-3)²=(-3)×(-3)=+9 (negative×negative=positive) — a square is NEVER negative; the full evaluation is -4-9=-13, not -4-(-9)=5 (which incorrectly treats c² as -9)."
      },
      {
        misconceptionId: "E-d9-c",
        description: "Student drops the negative sign on ab², computing it as +4 instead of -4, and correctly computes c²=9 but then adds instead of subtracts.",
        rootCause: "Multiple Sign Errors Combined — both drops a negative sign on one term and mishandles the subtraction between terms.",
        remediation: "ab²=(-1)×4=-4 (NEGATIVE, since a is negative) — and the expression subtracts c²=9: -4-9=-13, not 4+9=13 (which drops the negative on ab² and adds instead of subtracts)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Evaluate each term separately", hint: "ab²=(-1)×2², and c²=(-3)²." },
      { level: 2, description: "Apply the sign rules carefully", hint: "b²=4, so ab²=(-1)×4=-4 (stays negative). c²=(-3)²=+9 (never negative)." },
      { level: 3, description: "Subtract c² from ab²", hint: "-4 - 9 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.EE.A.2C"] },
  { itemId: "d10", order: 10, cluster: "INDX", clusterName: CLUSTER_NAMES.INDX,
    skillId: "INDXPOWPROD-01",
    question: "Simplify: \\((2x^2)^3\\).",
    options: [
      { text: "\\(8x^6\\)", correct: true, feedback: "2³=8; (x²)³=x⁶." },
      { text: "\\(6x^5\\)", correct: false, feedback: "2³=8, not 6. Multiply exponents.", misconceptionId: "E-d10-a" },
      { text: "\\(8x^5\\)", correct: false, feedback: "Multiply exponents: 2×3=6.", misconceptionId: "E-d10-b" },
      { text: "\\(2x^6\\)", correct: false, feedback: "Don't forget to cube the 2.", misconceptionId: "E-d10-c" }
    ],
    backward: "Cube the coefficient, multiply the exponents.",
    forward: "Power of a power rule.",
    misconceptions: [
      {
        misconceptionId: "E-d10-a",
        description: "Student multiplies 2×3=6 instead of cubing 2 (2³=8) for the coefficient, and also adds the exponents instead of multiplying them for the variable part.",
        rootCause: "Power-of-a-Product Rule Not Applied Correctly — mishandles both the coefficient and the exponent when raising a product to a power.",
        remediation: "(2x²)³ means BOTH the 2 and the x² are raised to the power of 3 separately: 2³=8 (not 2×3=6), and (x²)³=x^(2×3)=x⁶ (multiply exponents, not add 2+3=5) — the full answer is 8x⁶, not 6x⁵."
      },
      {
        misconceptionId: "E-d10-b",
        description: "Student correctly cubes the coefficient (2³=8) but adds the exponents (2+3=5) instead of multiplying them for the variable part.",
        rootCause: "Exponent Rule Confused — applies the ADD-exponents rule instead of the MULTIPLY-exponents rule for a power raised to a power.",
        remediation: "(x²)³ requires MULTIPLYING the exponents: 2×3=6, giving x⁶ — adding them (2+3=5) would be the rule for multiplying two separate same-base powers, not for a power raised to another power; the full answer is 8x⁶, not 8x⁵."
      },
      {
        misconceptionId: "E-d10-c",
        description: "Student correctly computes the exponent on x (x⁶) but forgets to cube the numeric coefficient 2, leaving it as 2 instead of 2³=8.",
        rootCause: "Coefficient Not Raised to the Power — forgets that the numeric coefficient must also be raised to the outer power, not just the variable.",
        remediation: "Everything inside the bracket — INCLUDING the coefficient 2 — is raised to the power of 3: 2³=8, not just 2 — the full answer is 8x⁶, not 2x⁶ (which leaves the coefficient unraised)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify that both the coefficient and the variable power are raised to the outer power", hint: "(2x²)³ means 2³ × (x²)³." },
      { level: 2, description: "Cube the numeric coefficient", hint: "2³ = 2×2×2 = 8." },
      { level: 3, description: "Apply the power-of-a-power rule to the variable part", hint: "(x²)³: multiply exponents, 2×3 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.EE.A.1"] },
  { itemId: "d11", order: 11, cluster: "EXP", clusterName: CLUSTER_NAMES.EXP,
    skillId: "EXPANDFOIL-01",
    question: "Expand and simplify: \\((x-1)(x+4)\\).",
    options: [
      { text: "\\(x^2 + 3x - 4\\)", correct: true, feedback: "x²+4x-x-4 = x²+3x-4." },
      { text: "\\(x^2 - 5x - 4\\)", correct: false, feedback: "-x+4x=+3x.", misconceptionId: "E-d11-a" },
      { text: "\\(x^2 + 3x + 4\\)", correct: false, feedback: "-1×4=-4.", misconceptionId: "E-d11-b" },
      { text: "\\(x^2 + 5x - 4\\)", correct: false, feedback: "-x+4x=3x, not 5x.", misconceptionId: "E-d11-c" }
    ],
    backward: "FOIL with signs.",
    forward: "Double brackets are the foundation for quadratics.",
    misconceptions: [
      {
        misconceptionId: "E-d11-a",
        description: "Student combines the cross terms incorrectly, treating -x and +4x as if they should both be subtracted, arriving at -5x instead of +3x.",
        rootCause: "Cross Term Sign Combination Error — mishandles the signs when combining the Outer and Inner products.",
        remediation: "The cross terms are Outer: x×4=4x and Inner: -1×x=-x — combining: 4x+(-x)=4x-x=3x, not -5x (which would require an incorrect sign treatment)."
      },
      {
        misconceptionId: "E-d11-b",
        description: "Student computes the Last term (-1×4) as +4 instead of -4, mishandling the sign of a negative times a positive.",
        rootCause: "Sign Rule Confused — treats negative×positive as positive instead of negative.",
        remediation: "-1×4: negative×positive=NEGATIVE, so this equals -4, not +4 — the correct expansion is x²+3x-4, not x²+3x+4."
      },
      {
        misconceptionId: "E-d11-c",
        description: "Student combines the cross terms incorrectly, adding their magnitudes without accounting for the negative sign on one of them, getting +5x instead of +3x.",
        rootCause: "Cross Term Sign Combination Error — mishandles the signs when combining the Outer and Inner products.",
        remediation: "The cross terms are Outer: x×4=4x and Inner: -1×x=-x — combining: 4x+(-x)=4x-x=3x (the negative sign on the -x must be applied), not 4x+x=5x (which treats both as positive)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Multiply the First terms", hint: "x × x = x²." },
      { level: 2, description: "Multiply the Outer and Inner terms, tracking signs, then combine", hint: "x×4=4x (Outer). -1×x=-x (Inner). 4x + (-x) = 3x." },
      { level: 3, description: "Multiply the Last terms, applying the sign rule", hint: "-1 × 4 = ? (negative × positive = negative)" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.HSA-APR.A.1"] },
  { itemId: "d12", order: 12, cluster: "FAC", clusterName: CLUSTER_NAMES.FAC,
    skillId: "FACTOR-03",
    question: "Factorise completely: \\(-10x - 15\\).",
    options: [
      { text: "\\(-5(2x + 3)\\)", correct: true, feedback: "HCF is -5. Inside signs flip." },
      { text: "\\(5(-2x - 3)\\)", correct: false, feedback: "Take out -5, not 5.", misconceptionId: "E-d12-a" },
      { text: "\\(-5(2x - 3)\\)", correct: false, feedback: "-5 × -3 = +15.", misconceptionId: "E-d12-b" },
      { text: "\\(-10x - 15\\) cannot be factorised", correct: false, feedback: "It can.", misconceptionId: "E-d12-c" }
    ],
    backward: "Factorising with a negative flips signs inside.",
    forward: "Used when solving by dividing by a negative.",
    misconceptions: [
      {
        misconceptionId: "E-d12-a",
        description: "Student factors out the positive HCF (5) instead of the negative HCF (-5), leaving negative signs still inside the bracket instead of flipping them out.",
        rootCause: "Negative HCF Not Extracted — factors out only the positive magnitude of the common factor, not its negative sign.",
        remediation: "When both terms are negative (-10x and -15), factor out the NEGATIVE common factor -5, which flips the signs inside to positive: -5(2x+3) — factoring out just +5 leaves negative signs inside: 5(-2x-3), which is not the conventional fully factorised form."
      },
      {
        misconceptionId: "E-d12-b",
        description: "Student factors out -5 correctly but keeps the wrong sign inside the bracket, writing -3 instead of +3.",
        rootCause: "Sign Dropped During Factoring — loses track of how dividing by a negative flips the sign inside.",
        remediation: "-15 divided by -5 gives POSITIVE 3 (negative÷negative=positive) — the inside should be (2x+3), not (2x-3): -5(2x+3), not -5(2x-3) (which would multiply back to -10x+15, not -10x-15)."
      },
      {
        misconceptionId: "E-d12-c",
        description: "Student assumes the expression cannot be factorised, not recognising that -10x and -15 share a common factor of -5.",
        rootCause: "Common Factor Not Recognised — fails to identify that both terms share a factor.",
        remediation: "Check the numbers: 10 and 15 both share the factor 5 (10=5×2, 15=5×3), and since both terms are negative, the common factor is -5 — since BOTH terms share -5, the expression CAN be factorised: -5(2x+3), not left as -10x-15."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the highest common factor, including the sign", hint: "Both terms are negative, so factor out -5." },
      { level: 2, description: "Divide each term by -5, tracking the sign flip", hint: "-10x÷(-5)=2x. -15÷(-5)=+3 (negative÷negative=positive)." },
      { level: 3, description: "Write the factorised form", hint: "-5(2x + 3)." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.7.EE.A.1"] },
  { itemId: "d13", order: 13, cluster: "ALGF", clusterName: CLUSTER_NAMES.ALGF,
    skillId: "ALGFRAC-02",
    question: "Simplify: \\(\\frac{4x^2 - 2x}{2x}\\).",
    options: [
      { text: "\\(2x - 1\\)", correct: true, feedback: "4x²/2x=2x; -2x/2x=-1." },
      { text: "\\(2x + 1\\)", correct: false, feedback: "-2x/2x=-1.", misconceptionId: "E-d13-a" },
      { text: "\\(2x^2 - 1\\)", correct: false, feedback: "x²/x = x.", misconceptionId: "E-d13-b" },
      { text: "\\(4x - 1\\)", correct: false, feedback: "4/2=2.", misconceptionId: "E-d13-c" }
    ],
    backward: "Divide each term by 2x.",
    forward: "Simplifying rational expressions.",
    misconceptions: [
      {
        misconceptionId: "E-d13-a",
        description: "Student drops the negative sign on the second term, computing -2x/2x as +1 instead of -1.",
        rootCause: "Sign Dropped During Division — loses track of the negative sign on the second term.",
        remediation: "-2x is being divided by 2x, and negative÷positive=NEGATIVE: -2x/2x=-1, not +1 — the full simplification is 2x-1, not 2x+1."
      },
      {
        misconceptionId: "E-d13-b",
        description: "Student correctly reduces the second term (-1) but forgets to reduce the exponent on the first term, keeping x² unchanged instead of x.",
        rootCause: "Exponent Not Reduced During Division — divides the coefficients but leaves the variable's exponent untouched.",
        remediation: "4x²/2x: coefficients divide (4÷2=2) AND exponents subtract (2-1=1, since x means x¹) — the full first term is 2x, not 2x² (which leaves the exponent unreduced)."
      },
      {
        misconceptionId: "E-d13-c",
        description: "Student makes an error dividing the coefficient of the first term, getting 4 instead of 2, perhaps forgetting to divide by the denominator's coefficient of 2.",
        rootCause: "Coefficient Division Skipped — copies the numerator's coefficient over without dividing by the denominator's coefficient.",
        remediation: "4x²/2x requires dividing BOTH the coefficient (4÷2=2) AND the exponent (2-1=1) — the coefficient must be divided, not left as 4: the full first term is 2x, not 4x."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Divide the first term", hint: "4x²/2x: coefficients 4÷2=2, exponents 2-1=1, giving 2x." },
      { level: 2, description: "Divide the second term, keeping the sign", hint: "-2x/2x: coefficients -2÷2=-1." },
      { level: 3, description: "Combine both simplified terms", hint: "2x + (-1) = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.HSA-APR.D.6"] },
  { itemId: "d14", order: 14, cluster: "CON", clusterName: CLUSTER_NAMES.CON,
    skillId: "CONSTRUCT-08",
    question: "A rectangle has length \\(3x+2\\) and width \\(x+1\\). Write its perimeter, simplified.",
    options: [
      { text: "\\(8x + 6\\)", correct: true, feedback: "P=2(3x+2+x+1)=2(4x+3)=8x+6." },
      { text: "\\(4x + 3\\)", correct: false, feedback: "That's the semi-perimeter.", misconceptionId: "E-d14-a" },
      { text: "\\(8x + 8\\)", correct: false, feedback: "2+1=3, doubled is 6.", misconceptionId: "E-d14-b" },
      { text: "\\(6x + 4\\)", correct: false, feedback: "You added dimensions without doubling.", misconceptionId: "E-d14-c" }
    ],
    backward: "Perimeter = 2×(l+w).",
    forward: "Geometric formulas in algebra.",
    misconceptions: [
      {
        misconceptionId: "E-d14-a",
        description: "Student correctly finds length+width=4x+3 but forgets to double it for the full perimeter, stopping at the semi-perimeter.",
        rootCause: "Doubling Step Omitted — stops after finding length+width without applying the required ×2 for perimeter.",
        remediation: "Perimeter is TWICE (length+width), not just length+width — after finding 3x+2+x+1=4x+3, you must multiply by 2: 2(4x+3)=8x+6, not stopping at 4x+3."
      },
      {
        misconceptionId: "E-d14-b",
        description: "Student correctly doubles the x-coefficient (8x) but miscombines the constants, getting 8 instead of 6.",
        rootCause: "Constant Combination Error — mishandles the arithmetic when combining and doubling the constant terms.",
        remediation: "The constants are 2 and 1, which sum to 3, then DOUBLE to 6 (2×3=6) — not 8, which doesn't match 2×(2+1)=6; the full answer is 8x+6, not 8x+8."
      },
      {
        misconceptionId: "E-d14-c",
        description: "Student adds the two dimensions (getting 4x+3) but does not double the result correctly, landing on 6x+4 instead of 8x+6.",
        rootCause: "Doubling Step Omitted or Miscombined — fails to correctly apply the ×2 needed for the perimeter formula.",
        remediation: "Perimeter = 2×(length+width) = 2×(3x+2+x+1) = 2×(4x+3) = 8x+6 — the x-coefficients (3 and 1) must first be combined (3x+x=4x) and THEN doubled (2×4x=8x), not doubled separately in a way that gives 6x."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Add the length and width", hint: "(3x+2) + (x+1) = 4x+3." },
      { level: 2, description: "Recall the perimeter formula", hint: "Perimeter = 2 × (length + width)." },
      { level: 3, description: "Double the combined expression", hint: "2 × (4x+3) = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.EE.A.2A"] },
  { itemId: "d15", order: 15, cluster: "REA", clusterName: CLUSTER_NAMES.REA,
    skillId: "REARRANGE-02",
    question: "Make \\(t\\) the subject of \\(v = u + at\\).",
    options: [
      { text: "\\(t = \\frac{v-u}{a}\\)", correct: true, feedback: "Subtract u, then divide by a." },
      { text: "\\(t = \\frac{v}{a} - u\\)", correct: false, feedback: "Subtract u first.", misconceptionId: "E-d15-a" },
      { text: "\\(t = (v-u)a\\)", correct: false, feedback: "Divide, don't multiply.", misconceptionId: "E-d15-b" },
      { text: "\\(t = v - u - a\\)", correct: false, feedback: "Use inverse operations.", misconceptionId: "E-d15-c" }
    ],
    backward: "Reverse BIDMAS: undo addition, then multiplication.",
    forward: "Rearranging is essential in science.",
    misconceptions: [
      {
        misconceptionId: "E-d15-a",
        description: "Student divides by a before subtracting u, applying the inverse operations in the wrong order.",
        rootCause: "Inverse Operations Applied in Wrong Order — undoes the operations in the wrong sequence relative to how they were originally applied.",
        remediation: "The original formula builds up as: u is added FIRST, THEN at is added — to isolate t, undo in REVERSE: first subtract u from both sides (v-u=at), THEN divide by a: t=(v-u)/a, not t=v/a-u (which divides before subtracting)."
      },
      {
        misconceptionId: "E-d15-b",
        description: "Student multiplies by a instead of dividing, using the wrong inverse operation to undo the multiplication by a.",
        rootCause: "Wrong Inverse Operation Used — multiplies instead of dividing, failing to undo the original multiplication.",
        remediation: "To undo 'at' (a multiplied by t), you must DIVIDE by a (the inverse of multiplication), not multiply again: (v-u)/a=t, not t=(v-u)×a (which uses multiplication again instead of the inverse)."
      },
      {
        misconceptionId: "E-d15-c",
        description: "Student subtracts both u and a from v, treating a as if it were also added to v rather than multiplied by t.",
        rootCause: "Formula Structure Misread — treats 'at' as if a were a separately added term instead of a factor multiplying t.",
        remediation: "In v=u+at, 'at' means a MULTIPLIED by t, not a separately added term — after subtracting u (v-u=at), you must DIVIDE by a (not subtract it) to isolate t: t=(v-u)/a, not t=v-u-a."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the operations applied to t, in order", hint: "t was multiplied by a, and that product had u added to it." },
      { level: 2, description: "Undo the operations in REVERSE order, using inverses", hint: "First undo the '+u' by subtracting u from both sides." },
      { level: 3, description: "Undo the multiplication by dividing both sides", hint: "v-u=at, so divide both sides by a." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.HSA-CED.A.4"] },
  { itemId: "d16", order: 16, cluster: "EXT", clusterName: CLUSTER_NAMES.EXT,
    skillId: "EXTIDENTITY-01",
    question: "Is \\((x+2)^2 - (x-2)^2 = 8x\\) always true?",
    options: [
      { text: "Yes, it simplifies to \\(8x\\)", correct: true, feedback: "Expand: (x²+4x+4)-(x²-4x+4)=8x." },
      { text: "No, it should be \\(4x\\)", correct: false, feedback: "4x+4x=8x.", misconceptionId: "E-d16-a" },
      { text: "No, it should be 0", correct: false, feedback: "The terms don't cancel to zero.", misconceptionId: "E-d16-b" },
      { text: "Only when x is positive", correct: false, feedback: "It holds for all x.", misconceptionId: "E-d16-c" }
    ],
    backward: "Expand both squares and simplify.",
    forward: "Proof-like identities in competitions.",
    misconceptions: [
      {
        misconceptionId: "E-d16-a",
        description: "Student expands both squares but mishandles combining the resulting 4x terms, getting 4x instead of the correct 8x (perhaps by only counting one of the two 4x contributions).",
        rootCause: "Cross Term Combination Error — undercounts the number of 4x terms that result from expanding and subtracting the two squares.",
        remediation: "Expand both squares: (x+2)²=x²+4x+4 and (x-2)²=x²-4x+4 — subtracting: (x²+4x+4)-(x²-4x+4)=x²+4x+4-x²+4x-4=8x (the two 4x terms ADD, since subtracting -4x gives +4x), not just 4x (which only counts one of the two contributions)."
      },
      {
        misconceptionId: "E-d16-b",
        description: "Student assumes the two squared expressions cancel to zero, without correctly expanding and simplifying to see that the 4x terms actually add together.",
        rootCause: "Incorrect Assumption About Cancellation — assumes terms cancel without verifying through actual expansion.",
        remediation: "Expand both squares fully: (x+2)²=x²+4x+4 and (x-2)²=x²-4x+4 — the x² and constant terms (4) DO cancel when subtracted, but the 4x terms do NOT cancel (they combine to 8x, since -(-4x)=+4x) — the result is 8x, not 0."
      },
      {
        misconceptionId: "E-d16-c",
        description: "Student believes the identity only holds for positive x, not recognising that algebraic identities proven through expansion hold for all real values of the variable, positive or negative.",
        rootCause: "Identity Validity Restricted Without Justification — assumes a proven algebraic identity only applies under an unnecessary restriction.",
        remediation: "Since the identity was proven by EXPANDING both squares symbolically (not by plugging in specific numbers), it holds for ALL values of x — positive, negative, or zero — not just positive x."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Expand each square separately", hint: "(x+2)²=x²+4x+4. (x-2)²=x²-4x+4." },
      { level: 2, description: "Subtract the second expansion from the first, distributing the subtraction sign", hint: "(x²+4x+4)-(x²-4x+4) = x²+4x+4-x²+4x-4." },
      { level: 3, description: "Combine like terms", hint: "The x² terms and constant terms cancel; the 4x terms combine: 4x+4x=?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.HSA-APR.C.4"] },
  { itemId: "d17", order: 17, cluster: "SUB", clusterName: CLUSTER_NAMES.SUB,
    skillId: "SUBEVAL-09",
    question: "If \\(p = -2\\), evaluate \\((p^2 + p)(p - 1)\\).",
    options: [
      { text: "\\(-6\\)", correct: true, feedback: "(4-2)×(-3)=2×(-3)=-6." },
      { text: "6", correct: false, feedback: "Sign error.", misconceptionId: "E-d17-a" },
      { text: "0", correct: false, feedback: "p²+p=2, not 0.", misconceptionId: "E-d17-b" },
      { text: "\\(-12\\)", correct: false, feedback: "p-1=-3, not -6.", misconceptionId: "E-d17-c" }
    ],
    backward: "Parentheses first.",
    forward: "Nested brackets in function evaluation.",
    misconceptions: [
      {
        misconceptionId: "E-d17-a",
        description: "Student correctly evaluates both bracketed sub-expressions (2 and -3) but drops the negative sign in the final multiplication, computing 2×(-3) as +6 instead of -6.",
        rootCause: "Sign Rule Confused — treats positive×negative as positive instead of negative.",
        remediation: "2×(-3): positive×negative=NEGATIVE, so this equals -6, not +6 — the final multiplication must preserve this sign."
      },
      {
        misconceptionId: "E-d17-b",
        description: "Student miscalculates the first bracket, treating p²+p (with p=-2) as 0 instead of the correct 2 (4-2).",
        rootCause: "Bracket Evaluation Error — miscalculates the value inside the first set of parentheses.",
        remediation: "p²+p with p=-2 means (-2)²+(-2)=4+(-2)=4-2=2 (not 0) — this must be computed correctly before multiplying by the second bracket's value."
      },
      {
        misconceptionId: "E-d17-c",
        description: "Student miscalculates the second bracket, treating p-1 (with p=-2) as -6 instead of the correct -3.",
        rootCause: "Bracket Evaluation Error — miscalculates the value inside the second set of parentheses.",
        remediation: "p-1 with p=-2 means -2-1=-3 (not -6) — this must be computed correctly before multiplying by the first bracket's value."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Evaluate the first bracket", hint: "p²+p = (-2)²+(-2) = 4+(-2) = 2." },
      { level: 2, description: "Evaluate the second bracket", hint: "p-1 = -2-1 = -3." },
      { level: 3, description: "Multiply the two bracket values, applying the sign rule", hint: "2 × (-3) = ? (positive × negative = negative)" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.EE.A.2C"] },
  { itemId: "d18", order: 18, cluster: "INDX", clusterName: CLUSTER_NAMES.INDX,
    skillId: "INDXCOMBO-02",
    question: "Simplify: \\(\\frac{x^4 \\times x^2}{x^3}\\).",
    options: [
      { text: "\\(x^3\\)", correct: true, feedback: "x⁴×x²=x⁶; x⁶/x³=x³." },
      { text: "\\(x^5\\)", correct: false, feedback: "6-3=3.", misconceptionId: "E-d18-a" },
      { text: "\\(x^6\\)", correct: false, feedback: "Forgot to divide.", misconceptionId: "E-d18-b" },
      { text: "\\(x^1\\)", correct: false, feedback: "6-3=3, not 1.", misconceptionId: "E-d18-c" }
    ],
    backward: "Multiply first, then divide.",
    forward: "Combining index laws.",
    misconceptions: [
      {
        misconceptionId: "E-d18-a",
        description: "Student correctly combines the numerator (x⁴×x²=x⁶) but makes an arithmetic slip in the final subtraction, getting 5 instead of the correct 3.",
        rootCause: "Computation Error — the final subtraction step is mishandled despite correct intermediate values.",
        remediation: "6-3=3 (a basic subtraction fact), not 5 — recompute carefully: x⁶÷x³=x^(6-3)=x³, not x⁵."
      },
      {
        misconceptionId: "E-d18-b",
        description: "Student correctly multiplies x⁴×x²=x⁶ but stops there, forgetting to also divide by x³ as the expression requires.",
        rootCause: "Final Step Omitted — stops after the first operation, forgetting the second operation still needs to be applied.",
        remediation: "The expression has TWO operations: multiply (numerator), THEN divide (by denominator) — after x⁴×x²=x⁶, you still need to divide by x³: x⁶÷x³=x^(6-3)=x³, not stopping at just x⁶."
      },
      {
        misconceptionId: "E-d18-c",
        description: "Student subtracts the exponents incorrectly, arriving at 1 instead of the correct 3.",
        rootCause: "Computation Error — the exponent subtraction is mishandled.",
        remediation: "x⁶÷x³=x^(6-3)=x³ (not x^1) — recompute the subtraction carefully: 6-3=3, not 1."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Simplify the numerator first", hint: "x⁴×x²: add exponents, 4+2=6, giving x⁶." },
      { level: 2, description: "Identify the denominator's exponent", hint: "The denominator is x³." },
      { level: 3, description: "Divide by subtracting exponents", hint: "x⁶÷x³: 6-3=?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.EE.A.1"] },
  { itemId: "d19", order: 19, cluster: "EXP", clusterName: CLUSTER_NAMES.EXP,
    skillId: "EXPANDFOIL-02",
    question: "Expand and simplify: \\((2x+1)(x-3)\\).",
    options: [
      { text: "\\(2x^2 - 5x - 3\\)", correct: true, feedback: "2x²-6x+x-3 = 2x²-5x-3." },
      { text: "\\(2x^2 - 7x - 3\\)", correct: false, feedback: "-6x+x=-5x.", misconceptionId: "E-d19-a" },
      { text: "\\(2x^2 + 5x - 3\\)", correct: false, feedback: "The x term is negative.", misconceptionId: "E-d19-b" },
      { text: "\\(2x^2 - 5x + 3\\)", correct: false, feedback: "1×(-3)=-3.", misconceptionId: "E-d19-c" }
    ],
    backward: "FOIL with coefficients.",
    forward: "Quadratic expansion.",
    misconceptions: [
      {
        misconceptionId: "E-d19-a",
        description: "Student adds the magnitudes of the cross terms (6x+x=7x) instead of correctly combining them with their signs (-6x+x=-5x).",
        rootCause: "Cross Term Sign Combination Error — adds the magnitudes of the cross terms instead of combining them with their correct signs.",
        remediation: "The cross terms are -6x (Outer, negative) and x (Inner, positive) — they must combine WITH their signs: -6x+x=-5x, not 6x+x=7x (which ignores the negative sign on the Outer term)."
      },
      {
        misconceptionId: "E-d19-b",
        description: "Student drops the negative sign when combining the cross terms, getting +5x instead of -5x.",
        rootCause: "Sign Dropped During Cross Term Combination — loses track of the negative sign on the larger-magnitude cross term.",
        remediation: "The cross terms are -6x and +x, and -6x has the larger magnitude, so the combined result stays NEGATIVE: -6x+x=-5x, not +5x."
      },
      {
        misconceptionId: "E-d19-c",
        description: "Student computes the Last term (1×-3) as +3 instead of -3, mishandling the sign of a positive times a negative.",
        rootCause: "Sign Rule Confused — treats positive×negative as positive instead of negative.",
        remediation: "1×(-3): positive×negative=NEGATIVE, so this equals -3, not +3 — the correct expansion is 2x²-5x-3, not 2x²-5x+3."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Multiply the First terms", hint: "2x × x = 2x²." },
      { level: 2, description: "Multiply the Outer and Inner terms, tracking signs, then combine", hint: "2x×(-3)=-6x (Outer). 1×x=x (Inner). -6x+x=-5x." },
      { level: 3, description: "Multiply the Last terms, applying the sign rule", hint: "1 × (-3) = ? (positive × negative = negative)" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.HSA-APR.A.1"] },
  { itemId: "d20", order: 20, cluster: "FAC", clusterName: CLUSTER_NAMES.FAC,
    skillId: "FACTOR-04",
    question: "Factorise: \\(24x^4y^2 - 18x^3y^3\\).",
    options: [
      { text: "\\(6x^3y^2(4x - 3y)\\)", correct: true, feedback: "HCF: 6, x³, y²." },
      { text: "\\(3x^3y^2(8x - 6y)\\)", correct: false, feedback: "HCF is 6, not 3.", misconceptionId: "E-d20-a" },
      { text: "\\(6x^4y^2(4 - 3y)\\)", correct: false, feedback: "x-power inside wrong.", misconceptionId: "E-d20-b" },
      { text: "\\(6x^3y^2(4x + 3y)\\)", correct: false, feedback: "Sign inside is wrong.", misconceptionId: "E-d20-c" }
    ],
    backward: "Highest common factor for numbers and variables.",
    forward: "Factorising with high powers.",
    misconceptions: [
      {
        misconceptionId: "E-d20-a",
        description: "Student factors out 3, a common numeric factor, but doesn't check that a LARGER common factor (6) also exists.",
        rootCause: "Not the Highest Common Factor — factors out A common factor but not the HIGHEST one.",
        remediation: "3 IS a common factor of 24 and 18, but it's not the HIGHEST — 6 is also common (24÷6=4, 18÷6=3) and larger than 3, so the fully factorised form is 6x³y²(4x-3y), not the incompletely factorised 3x³y²(8x-6y)."
      },
      {
        misconceptionId: "E-d20-b",
        description: "Student factors out x⁴ instead of the correct highest common power x³, since the second term (18x³y³) only has x³ available, not x⁴.",
        rootCause: "Common Power Exceeds What's Available in Both Terms — factors out a higher power of x than the smaller term actually contains.",
        remediation: "The common power of x must not exceed what BOTH terms contain — 24x⁴y² has x⁴, but 18x³y³ only has x³, so the highest COMMON power is x³ (the smaller of the two): 6x³y²(4x-3y), not 6x⁴y²(4-3y) (which incorrectly assumes x⁴ is common)."
      },
      {
        misconceptionId: "E-d20-c",
        description: "Student factors out 6x³y² correctly but keeps the wrong sign inside the bracket, writing +3y instead of -3y.",
        rootCause: "Sign Dropped During Factoring — loses track of the negative sign on the second term.",
        remediation: "18x³y³ is being SUBTRACTED (24x⁴y²-18x³y³), so after dividing by 6x³y², the inside should be -3y (since 18x³y³÷6x³y²=3y, and the sign stays negative): 6x³y²(4x-3y), not 6x³y²(4x+3y) (which incorrectly flips the sign)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the numeric HCF of 24 and 18", hint: "The HCF of 24 and 18 is 6." },
      { level: 2, description: "Find the lowest power of each variable present in both terms", hint: "x: min(4,3)=x³. y: min(2,3)=y²." },
      { level: 3, description: "Divide each term by the full common factor 6x³y², keeping the sign", hint: "24x⁴y²÷6x³y²=4x. -18x³y³÷6x³y²=-3y." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.7.EE.A.1"] },
  { itemId: "d21", order: 21, cluster: "ALGF", clusterName: CLUSTER_NAMES.ALGF,
    skillId: "ALGFRAC-02",
    question: "Simplify: \\(\\frac{6x^2 + 9x}{3x}\\).",
    options: [
      { text: "\\(2x + 3\\)", correct: true, feedback: "6x²/3x=2x; 9x/3x=3." },
      { text: "\\(2x^2 + 3x\\)", correct: false, feedback: "x²/x=x.", misconceptionId: "E-d21-a" },
      { text: "\\(2x + 9\\)", correct: false, feedback: "9x/3x=3.", misconceptionId: "E-d21-b" },
      { text: "\\(3x + 3\\)", correct: false, feedback: "6/3=2.", misconceptionId: "E-d21-c" }
    ],
    backward: "Divide each term by 3x.",
    forward: "Simplifying rational expressions.",
    misconceptions: [
      {
        misconceptionId: "E-d21-a",
        description: "Student correctly divides the coefficients (6÷3=2, 9÷3=3) but forgets to reduce the exponent on the first term, keeping x² unchanged and also leaving the second term as 3x instead of 3.",
        rootCause: "Exponent Not Reduced During Division — divides the coefficients but leaves the variables' exponents untouched.",
        remediation: "6x²/3x: coefficients divide (6÷3=2) AND exponents subtract (2-1=1) — giving 2x, not 2x²; similarly 9x/3x should reduce fully to 3, not stay as 3x — the full simplification is 2x+3."
      },
      {
        misconceptionId: "E-d21-b",
        description: "Student correctly simplifies the first term (2x) but doesn't fully divide the second term, leaving it as 9 instead of correctly reducing 9x/3x to 3.",
        rootCause: "Division Not Completed on Second Term — divides only the coefficient of the second term without dividing out the variable x as well.",
        remediation: "9x/3x means BOTH the coefficient AND the x must divide: 9÷3=3 and x/x=1 (cancels), giving 3 — not just 9 (which forgets to account for the x/x cancellation)."
      },
      {
        misconceptionId: "E-d21-c",
        description: "Student makes an error dividing the coefficient of the first term, getting 3 instead of 2, perhaps confusing it with the second term's coefficient.",
        rootCause: "Computation Error — the coefficient division for the first term is mishandled.",
        remediation: "6x²/3x: 6÷3=2 (not 3) — recompute the coefficient division carefully: the full first term is 2x, not 3x."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Divide the first term", hint: "6x²/3x: coefficients 6÷3=2, exponents 2-1=1, giving 2x." },
      { level: 2, description: "Divide the second term", hint: "9x/3x: coefficients 9÷3=3, and the x's cancel." },
      { level: 3, description: "Combine both simplified terms", hint: "2x + 3 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.HSA-APR.D.6"] },
  { itemId: "d22", order: 22, cluster: "CON", clusterName: CLUSTER_NAMES.CON,
    skillId: "CONSTRUCT-04",
    question: "Car rental: £30/day + £0.15/km. Write a formula for cost \\(C\\) for \\(d\\) days and \\(k\\) km.",
    options: [
      { text: "\\(C = 30d + 0.15k\\)", correct: true, feedback: "Days and km are independent." },
      { text: "\\(C = 30 + 0.15dk\\)", correct: false, feedback: "They are added, not multiplied.", misconceptionId: "E-d22-a" },
      { text: "\\(C = 30d + 0.15\\)", correct: false, feedback: "Forgot to multiply by k.", misconceptionId: "E-d22-b" },
      { text: "\\(C = 30k + 0.15d\\)", correct: false, feedback: "Swapped rates.", misconceptionId: "E-d22-c" }
    ],
    backward: "Identify variable and constant parts.",
    forward: "Real-life formulas.",
    misconceptions: [
      {
        misconceptionId: "E-d22-a",
        description: "Student multiplies the two variable quantities (d and k) together instead of treating the day-charge and kilometre-charge as two SEPARATE charges that get added.",
        rootCause: "Independent Charges Treated as Multiplied — combines two separate rate-based charges via multiplication instead of addition.",
        remediation: "Days and kilometres are two INDEPENDENT charges that each add to the total, not multiply each other — C=30d+0.15k (each rate times its own variable, then ADDED), not C=30+0.15dk (which incorrectly multiplies d and k together)."
      },
      {
        misconceptionId: "E-d22-b",
        description: "Student correctly writes the per-day charge (30d) but forgets to multiply the per-kilometre rate by k, leaving 0.15 as a bare constant instead of 0.15k.",
        rootCause: "Variable Not Attached to Rate — leaves a per-unit rate as a constant instead of multiplying it by the corresponding variable.",
        remediation: "£0.15 PER kilometre means the charge scales with k: 0.15×k=0.15k, not just 0.15 alone — C=30d+0.15k, not C=30d+0.15 (which leaves the km rate unmultiplied by k)."
      },
      {
        misconceptionId: "E-d22-c",
        description: "Student swaps which rate goes with which variable, attaching £30 to kilometres and £0.15 to days, reversing the roles given in the problem.",
        rootCause: "Rate and Variable Mismatched — assigns each per-unit rate to the wrong variable.",
        remediation: "£30 is PER DAY (multiplies d) and £0.15 is PER KILOMETRE (multiplies k) — C=30d+0.15k, not C=30k+0.15d (which swaps which rate applies to which variable)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the per-day charge", hint: "£30 per day means the cost scales with d: 30d." },
      { level: 2, description: "Identify the per-kilometre charge", hint: "£0.15 per km means the cost scales with k: 0.15k." },
      { level: 3, description: "Combine the two independent charges by adding", hint: "C = 30d + 0.15k." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.EE.A.2A"] },
  { itemId: "d23", order: 23, cluster: "REA", clusterName: CLUSTER_NAMES.REA,
    skillId: "REARRANGE-03",
    question: "Make \\(r\\) the subject of \\(C = 2\\pi r\\).",
    options: [
      { text: "\\(r = \\frac{C}{2\\pi}\\)", correct: true, feedback: "Divide both sides by 2π." },
      { text: "\\(r = 2\\pi C\\)", correct: false, feedback: "You multiplied.", misconceptionId: "E-d23-a" },
      { text: "\\(r = C - 2\\pi\\)", correct: false, feedback: "You subtracted.", misconceptionId: "E-d23-b" },
      { text: "\\(r = \\frac{C}{2}\\)", correct: false, feedback: "Don't forget π.", misconceptionId: "E-d23-c" }
    ],
    backward: "C=2πr → r=C/2π.",
    forward: "Rearranging geometry formulas.",
    misconceptions: [
      {
        misconceptionId: "E-d23-a",
        description: "Student multiplies by 2π instead of dividing, using the wrong inverse operation to undo the multiplication by 2π.",
        rootCause: "Wrong Inverse Operation Used — multiplies instead of dividing, failing to undo the original multiplication.",
        remediation: "To undo '2πr' (2π multiplied by r), you must DIVIDE by 2π (the inverse of multiplication), not multiply again: r=C/(2π), not r=2πC (which uses multiplication again instead of the inverse)."
      },
      {
        misconceptionId: "E-d23-b",
        description: "Student subtracts 2π from C instead of dividing, using the wrong inverse operation entirely.",
        rootCause: "Wrong Inverse Operation Used — subtracts instead of dividing, failing to undo the original multiplication.",
        remediation: "2πr means 2π MULTIPLIED by r — to isolate r, you must DIVIDE both sides by 2π (the inverse of multiplication), not subtract 2π (which would only be correct if 2π were ADDED, not multiplied): r=C/(2π), not r=C-2π."
      },
      {
        misconceptionId: "E-d23-c",
        description: "Student divides only by 2, forgetting that π is also a factor multiplying r, leaving the π unaccounted for.",
        rootCause: "Not All Factors Divided — divides by only part of the combined coefficient (2π), leaving another factor unaccounted for.",
        remediation: "The full coefficient of r is 2π (2 multiplied by π, both together) — you must divide by the ENTIRE coefficient 2π, not just 2: r=C/(2π), not r=C/2 (which leaves π undivided)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the full coefficient multiplying r", hint: "The coefficient is 2π (2 and π together)." },
      { level: 2, description: "Recall the inverse of multiplication", hint: "To undo multiplication by 2π, divide by 2π." },
      { level: 3, description: "Divide both sides by the full coefficient", hint: "C = 2πr, so r = C ÷ (2π)." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.HSA-CED.A.4"] },
  { itemId: "d24", order: 24, cluster: "EXT", clusterName: CLUSTER_NAMES.EXT,
    skillId: "CONSTRUCT-09",
    question: "A plumber charges \\(C = 40 + 25h\\). A job costs £165. How many hours?",
    options: [
      { text: "5", correct: true, feedback: "165-40=125; 125÷25=5." },
      { text: "6", correct: false, feedback: "25×6=150, +40=190.", misconceptionId: "E-d24-a" },
      { text: "4", correct: false, feedback: "25×4=100, +40=140.", misconceptionId: "E-d24-b" },
      { text: "7", correct: false, feedback: "25×7=175, +40=215.", misconceptionId: "E-d24-c" }
    ],
    backward: "Substitute C=165 and solve.",
    forward: "Solving a formula for an unknown.",
    misconceptions: [
      {
        misconceptionId: "E-d24-a",
        description: "Student guesses h=6, overshooting the correct value; checking 25×6+40=190 does not match the target 165.",
        rootCause: "Equation Not Solved Systematically — guesses a value instead of isolating h algebraically.",
        remediation: "Solve systematically: 165=40+25h, so subtract 40 from both sides (165-40=125=25h), then divide by 25 (125÷25=5) — this gives h=5 directly, rather than guessing values like 6 that don't check out (25×6+40=190≠165)."
      },
      {
        misconceptionId: "E-d24-b",
        description: "Student guesses h=4, undershooting the correct value; checking 25×4+40=140 does not match the target 165.",
        rootCause: "Equation Not Solved Systematically — guesses a value instead of isolating h algebraically.",
        remediation: "Solve systematically: 165=40+25h, so subtract 40 from both sides (165-40=125=25h), then divide by 25 (125÷25=5) — this gives h=5 directly, rather than guessing values like 4 that don't check out (25×4+40=140≠165)."
      },
      {
        misconceptionId: "E-d24-c",
        description: "Student guesses h=7, overshooting the correct value; checking 25×7+40=215 does not match the target 165.",
        rootCause: "Equation Not Solved Systematically — guesses a value instead of isolating h algebraically.",
        remediation: "Solve systematically: 165=40+25h, so subtract 40 from both sides (165-40=125=25h), then divide by 25 (125÷25=5) — this gives h=5 directly, rather than guessing values like 7 that don't check out (25×7+40=215≠165)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Substitute the known cost into the formula", hint: "165 = 40 + 25h." },
      { level: 2, description: "Isolate the term with h by subtracting the constant", hint: "165 - 40 = 25h." },
      { level: 3, description: "Divide to solve for h", hint: "125 ÷ 25 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.7.EE.B.4A"] }
];

const recheckItems = [
  { itemId: "r1", order: 1, cluster: "SUB", clusterName: CLUSTER_NAMES.SUB,
    skillId: "SUBEVAL-03",
    question: "If \\(x = -4\\), evaluate \\(3x^2 + 2x - 1\\).",
    options: [
      { text: "39", correct: true, feedback: "3×16 + (-8) - 1 = 48 - 8 - 1 = 39." },
      { text: "\\(-39\\)", correct: false, feedback: "(-4)²=+16.", misconceptionId: "E-r1-a" },
      { text: "41", correct: false, feedback: "2x=-8, not +8.", misconceptionId: "E-r1-b" },
      { text: "47", correct: false, feedback: "48+8-1=55? No.", misconceptionId: "E-r1-c" }
    ],
    misconceptions: [
      {
        misconceptionId: "E-r1-a",
        description: "Student computes x² (with x=-4) as -16 instead of +16, treating the square of a negative number as negative.",
        rootCause: "Squaring Negative Numbers Misunderstood — believes squaring a negative gives a negative result.",
        remediation: "x²=(-4)²=(-4)×(-4)=+16 (negative×negative=positive) — a square is NEVER negative; the full evaluation is 3×16+(-8)-1=39, not 3×(-16)+(-8)-1=-57 or similar."
      },
      {
        misconceptionId: "E-r1-b",
        description: "Student drops the negative sign on the linear term, treating 2x (with x=-4) as +8 instead of -8.",
        rootCause: "Negative Substitution Sign Dropped — loses track of the negative sign when substituting x into the linear term.",
        remediation: "2x with x=-4 means 2×(-4)=-8 (NEGATIVE), not +8 — the full evaluation is 48+(-8)-1=39, not 48+8-1=55, and the option's stated 41 suggests a further miscalculation on top of the sign drop."
      },
      {
        misconceptionId: "E-r1-c",
        description: "Student makes an arithmetic error combining the correctly-computed values, arriving at 47 instead of the correct 39.",
        rootCause: "Computation Error — the final combination step is mishandled despite correct intermediate values.",
        remediation: "Recompute carefully: 3×16=48, 2×(-4)=-8, then 48+(-8)-1=39 — not 47, which doesn't match this sequence of correct intermediate values."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Substitute x=-4 into each term separately", hint: "3(-4)², 2(-4), and -1." },
      { level: 2, description: "Evaluate each term carefully with correct signs", hint: "(-4)²=+16, so 3×16=48. 2×(-4)=-8 (stays negative)." },
      { level: 3, description: "Combine all three terms", hint: "48 + (-8) - 1 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.EE.A.2C"] },
  { itemId: "r2", order: 2, cluster: "INDX", clusterName: CLUSTER_NAMES.INDX,
    skillId: "INDXDIV-01",
    question: "Simplify: \\(\\frac{x^6}{x^2}\\).",
    options: [
      { text: "\\(x^4\\)", correct: true, feedback: "6-2=4." },
      { text: "\\(x^3\\)", correct: false, feedback: "Subtract, don't divide.", misconceptionId: "E-r2-a" },
      { text: "\\(x^8\\)", correct: false, feedback: "Add when dividing? No.", misconceptionId: "E-r2-b" },
      { text: "\\(x^{12}\\)", correct: false, feedback: "Multiply? No.", misconceptionId: "E-r2-c" }
    ],
    misconceptions: [
      {
        misconceptionId: "E-r2-a",
        description: "Student divides the exponents (6÷2=3) instead of subtracting them.",
        rootCause: "Exponent Rule Confused — divides the exponents instead of subtracting them.",
        remediation: "When dividing same-base powers, SUBTRACT the exponents (not divide them): x⁶÷x²=x^(6-2)=x⁴, not x^(6÷2)=x³."
      },
      {
        misconceptionId: "E-r2-b",
        description: "Student adds the exponents (6+2=8) instead of subtracting them when dividing two powers with the same base.",
        rootCause: "Exponent Rule Confused — applies the ADD-exponents rule (for multiplying same-base powers) instead of the SUBTRACT-exponents rule (for dividing).",
        remediation: "When DIVIDING two powers with the SAME base, SUBTRACT the exponents: x⁶÷x²=x^(6-2)=x⁴ — adding them (6+2=8) would be the rule for MULTIPLYING same-base powers, not dividing."
      },
      {
        misconceptionId: "E-r2-c",
        description: "Student multiplies the exponents (6×2=12) instead of subtracting them.",
        rootCause: "Exponent Rule Confused — applies the MULTIPLY-exponents rule (for a power raised to another power) instead of the SUBTRACT-exponents rule (for dividing same-base powers).",
        remediation: "When DIVIDING same-base powers, SUBTRACT the exponents: x⁶÷x²=x^(6-2)=x⁴ — multiplying them (6×2=12) would be the rule for a power raised to another power, not for this division."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify that the bases are the same", hint: "Both terms have base x." },
      { level: 2, description: "Recall the quotient-of-powers rule", hint: "Subtract the exponents." },
      { level: 3, description: "Compute the new exponent", hint: "6 - 2 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.EE.A.1"] },
  { itemId: "r3", order: 3, cluster: "EXP", clusterName: CLUSTER_NAMES.EXP,
    skillId: "EXPANDFOIL-01",
    question: "Expand and simplify: \\((x+4)(x+1)\\).",
    options: [
      { text: "\\(x^2 + 5x + 4\\)", correct: true, feedback: "x²+1x+4x+4." },
      { text: "\\(x^2 + 5x + 5\\)", correct: false, feedback: "4×1=4.", misconceptionId: "E-r3-a" },
      { text: "\\(x^2 + 4x + 4\\)", correct: false, feedback: "x+4x=5x.", misconceptionId: "E-r3-b" },
      { text: "\\(x^2 + 5\\)", correct: false, feedback: "Don't forget the middle terms.", misconceptionId: "E-r3-c" }
    ],
    misconceptions: [
      {
        misconceptionId: "E-r3-a",
        description: "Student correctly combines the cross terms (5x) but miscalculates the Last term, getting 4×1=5 instead of 4.",
        rootCause: "Computation Error — the final multiplication of the constant terms is mishandled.",
        remediation: "The Last term is 4×1=4 (a basic multiplication fact), not 5 — the full expansion is x²+5x+4, not x²+5x+5."
      },
      {
        misconceptionId: "E-r3-b",
        description: "Student miscombines the cross terms, getting 4x instead of 5x, perhaps by only counting one of the two cross-term contributions (x and 4x).",
        rootCause: "Cross Term Combination Error — undercounts the contributions from the Outer and Inner products.",
        remediation: "Both cross terms must be combined: Outer (x×1=x) and Inner (4×x=4x) — x+4x=5x, not just 4x (which drops the Outer term's contribution of x)."
      },
      {
        misconceptionId: "E-r3-c",
        description: "Student multiplies only the First and Last terms (x×x=x² and 4×1=4), skipping the Outer and Inner cross terms entirely.",
        rootCause: "Cross Terms Omitted — forgets to multiply the outer and inner pairs of terms when expanding double brackets.",
        remediation: "Expanding (x+4)(x+1) requires FOUR products: First (x×x=x²), Outer (x×1=x), Inner (4×x=4x), and Last (4×1=4) — the two middle (cross) terms x+4x=5x must be included, not skipped: x²+5x+4, not just x²+4 (which drops the cross terms entirely)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Multiply the First terms", hint: "x × x = x²." },
      { level: 2, description: "Multiply the Outer and Inner terms, then combine", hint: "x×1=x (Outer). 4×x=4x (Inner). x+4x=5x." },
      { level: 3, description: "Multiply the Last terms", hint: "4 × 1 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.HSA-APR.A.1"] },
  { itemId: "r4", order: 4, cluster: "FAC", clusterName: CLUSTER_NAMES.FAC,
    skillId: "FACTOR-04",
    question: "Factorise: \\(20x^2y - 15xy^2\\).",
    options: [
      { text: "\\(5xy(4x - 3y)\\)", correct: true, feedback: "HCF: 5, x, y." },
      { text: "\\(5(4x^2y - 3xy^2)\\)", correct: false, feedback: "xy can be taken out.", misconceptionId: "E-r4-a" },
      { text: "\\(5x(4xy - 3y^2)\\)", correct: false, feedback: "y is also common.", misconceptionId: "E-r4-b" },
      { text: "\\(5y(4x^2 - 3xy)\\)", correct: false, feedback: "x is also common.", misconceptionId: "E-r4-c" }
    ],
    misconceptions: [
      {
        misconceptionId: "E-r4-a",
        description: "Student factors out only the numeric HCF (5) but doesn't also factor out the common variables x and y.",
        rootCause: "Variable Factors Not Extracted — factors out the numeric common factor but misses the common variable factors.",
        remediation: "Both terms share not just the number 5 but also factors of x AND y (20x²y has x and y, 15xy² has x and y) — the full common factor is 5xy, not just 5: 5xy(4x-3y), not the incompletely factorised 5(4x²y-3xy²)."
      },
      {
        misconceptionId: "E-r4-b",
        description: "Student factors out the numeric HCF and the common x, but omits the common variable y from the factored-out term.",
        rootCause: "One Common Variable Factor Missed — extracts some but not all of the shared variable factors.",
        remediation: "Both terms contain a factor of y (20x²y has y, 15xy² has y) — y must be part of the factored-out term: 5xy(4x-3y), not 5x(4xy-3y²) which leaves y unfactored in the first inside term."
      },
      {
        misconceptionId: "E-r4-c",
        description: "Student factors out the numeric HCF and the common y, but omits the common variable x from the factored-out term.",
        rootCause: "One Common Variable Factor Missed — extracts some but not all of the shared variable factors.",
        remediation: "Both terms contain a factor of x (20x²y has x, 15xy² has x) — x must be part of the factored-out term: 5xy(4x-3y), not 5y(4x²-3xy) which leaves x unfactored in the second inside term."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the numeric HCF of 20 and 15", hint: "The HCF of 20 and 15 is 5." },
      { level: 2, description: "Find the lowest power of each variable present in both terms", hint: "Both terms have at least x¹ and at least y¹." },
      { level: 3, description: "Divide each term by the full common factor 5xy", hint: "20x²y÷5xy=4x. 15xy²÷5xy=3y." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.7.EE.A.1"] },
  { itemId: "r5", order: 5, cluster: "ALGF", clusterName: CLUSTER_NAMES.ALGF,
    skillId: "ALGFRAC-02",
    question: "Simplify: \\(\\frac{8x^2 - 4x}{4x}\\).",
    options: [
      { text: "\\(2x - 1\\)", correct: true, feedback: "8x²/4x=2x; -4x/4x=-1." },
      { text: "\\(2x + 1\\)", correct: false, feedback: "-4x/4x=-1.", misconceptionId: "E-r5-a" },
      { text: "\\(2x^2 - 1\\)", correct: false, feedback: "x²/x=x.", misconceptionId: "E-r5-b" },
      { text: "\\(8x - 1\\)", correct: false, feedback: "8/4=2.", misconceptionId: "E-r5-c" }
    ],
    misconceptions: [
      {
        misconceptionId: "E-r5-a",
        description: "Student drops the negative sign on the second term, computing -4x/4x as +1 instead of -1.",
        rootCause: "Sign Dropped During Division — loses track of the negative sign on the second term.",
        remediation: "-4x is being divided by 4x, and negative÷positive=NEGATIVE: -4x/4x=-1, not +1 — the full simplification is 2x-1, not 2x+1."
      },
      {
        misconceptionId: "E-r5-b",
        description: "Student correctly reduces the second term (-1) but forgets to reduce the exponent on the first term, keeping x² unchanged instead of x.",
        rootCause: "Exponent Not Reduced During Division — divides the coefficients but leaves the variable's exponent untouched.",
        remediation: "8x²/4x: coefficients divide (8÷4=2) AND exponents subtract (2-1=1, since x means x¹) — the full first term is 2x, not 2x² (which leaves the exponent unreduced)."
      },
      {
        misconceptionId: "E-r5-c",
        description: "Student makes an error dividing the coefficient of the first term, getting 8 instead of 2, perhaps forgetting to divide by the denominator's coefficient of 4.",
        rootCause: "Coefficient Division Skipped — copies the numerator's coefficient over without dividing by the denominator's coefficient.",
        remediation: "8x²/4x requires dividing BOTH the coefficient (8÷4=2) AND the exponent (2-1=1) — the coefficient must be divided, not left as 8: the full first term is 2x, not 8x."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Divide the first term", hint: "8x²/4x: coefficients 8÷4=2, exponents 2-1=1, giving 2x." },
      { level: 2, description: "Divide the second term, keeping the sign", hint: "-4x/4x: coefficients -4÷4=-1." },
      { level: 3, description: "Combine both simplified terms", hint: "2x + (-1) = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.HSA-APR.D.6"] },
  { itemId: "r6", order: 6, cluster: "CON", clusterName: CLUSTER_NAMES.CON,
    skillId: "CONSTRUCT-10",
    question: "Write an expression for 'the product of \\(n\\) and two less than \\(n\\)'.",
    options: [
      { text: "\\(n(n-2)\\)", correct: true, feedback: "Correct." },
      { text: "\\(n - 2n\\)", correct: false, feedback: "Product means multiply.", misconceptionId: "E-r6-a" },
      { text: "\\(2n - n\\)", correct: false, feedback: "Different expression.", misconceptionId: "E-r6-b" },
      { text: "\\(n^2 - 2\\)", correct: false, feedback: "Not the product.", misconceptionId: "E-r6-c" }
    ],
    misconceptions: [
      {
        misconceptionId: "E-r6-a",
        description: "Student translates 'product' as subtraction, writing n-2n instead of the correct multiplication n(n-2).",
        rootCause: "Operation Keyword Misread — confuses a multiplication keyword ('product') with a subtraction expression.",
        remediation: "'Product' signals MULTIPLICATION, not subtraction — 'the product of n and (n-2)' means n×(n-2)=n(n-2), not n-2n (which uses subtraction instead)."
      },
      {
        misconceptionId: "E-r6-b",
        description: "Student writes 2n-n, misreading the second factor entirely as 'two times n' rather than 'two less than n'.",
        rootCause: "Second Factor Misidentified — doesn't correctly translate 'two less than n' as (n-2) before forming the product.",
        remediation: "'Two less than n' means n-2 (n minus 2, not 2×n) — the product is n×(n-2)=n(n-2), not 2n-n (which incorrectly reinterprets the second factor as '2n' rather than 'n-2')."
      },
      {
        misconceptionId: "E-r6-c",
        description: "Student writes n²-2, treating 'n' as squared and 2 as simply subtracted at the end, rather than correctly forming the product n×(n-2).",
        rootCause: "Product Misread as Square Minus Constant — confuses 'product of n and (n-2)' with squaring n and subtracting 2.",
        remediation: "The PRODUCT of n and (n-2) means MULTIPLYING them together: n×(n-2)=n(n-2) — this is not the same as n² - 2, which would come from squaring n and separately subtracting 2."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Translate 'two less than n'", hint: "This part is n-2." },
      { level: 2, description: "Recall what 'product' means", hint: "Product means multiplication." },
      { level: 3, description: "Combine the two factors by multiplying", hint: "n × (n-2) = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.EE.A.2A"] },
  { itemId: "r7", order: 7, cluster: "REA", clusterName: CLUSTER_NAMES.REA,
    skillId: "REARRANGE-01",
    question: "Make \\(x\\) the subject of \\(y = 4x - 3\\).",
    options: [
      { text: "\\(x = \\frac{y+3}{4}\\)", correct: true, feedback: "Add 3, then divide by 4." },
      { text: "\\(x = \\frac{y}{4} + 3\\)", correct: false, feedback: "Add 3 first.", misconceptionId: "E-r7-a" },
      { text: "\\(x = 4y + 3\\)", correct: false, feedback: "Inverse operations.", misconceptionId: "E-r7-b" },
      { text: "\\(x = \\frac{y-3}{4}\\)", correct: false, feedback: "Add 3, not subtract.", misconceptionId: "E-r7-c" }
    ],
    misconceptions: [
      {
        misconceptionId: "E-r7-a",
        description: "Student divides by 4 before adding 3, applying the inverse operations in the wrong order.",
        rootCause: "Inverse Operations Applied in Wrong Order — undoes the operations in the same order they were originally applied instead of reverse order.",
        remediation: "Inverse operations must be undone in REVERSE order — since the original was '×4 then -3', undo by first adding 3 (undoing the -3), THEN dividing by 4 (undoing the ×4): x=(y+3)/4, not x=y/4+3 (which divides first)."
      },
      {
        misconceptionId: "E-r7-b",
        description: "Student uses the wrong inverse operations entirely, multiplying by 4 instead of dividing, producing x=4y+3, which doesn't correctly undo either original operation.",
        rootCause: "Wrong Inverse Operations Used — uses operations that don't correctly undo the original operations.",
        remediation: "To undo '×4', you must DIVIDE by 4 (not multiply) — and to undo '-3', you must ADD 3 (not just append it) — correctly: x=(y+3)/4, not x=4y+3 (which uses multiplication and addition, the same operations as the original, instead of their inverses)."
      },
      {
        misconceptionId: "E-r7-c",
        description: "Student subtracts 3 instead of adding it, using the same operation as the original equation instead of its inverse.",
        rootCause: "Wrong Inverse Operation Used — subtracts instead of adding, failing to undo the original subtraction.",
        remediation: "To undo '-3' (subtracting 3), you must ADD 3 (the inverse operation), not subtract again: y+3=4x, then divide by 4: x=(y+3)/4, not x=(y-3)/4 (which uses subtraction again instead of the inverse)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the operations applied to x, in order", hint: "x was multiplied by 4, then 3 was subtracted." },
      { level: 2, description: "Undo the operations in REVERSE order, using inverses", hint: "First undo the -3 by adding 3 to both sides." },
      { level: 3, description: "Undo the multiplication by dividing both sides", hint: "y+3=4x, so divide both sides by 4." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.HSA-CED.A.4"] },
  { itemId: "r8", order: 8, cluster: "EXT", clusterName: CLUSTER_NAMES.EXT,
    skillId: "EXTVERIFY-01",
    question: "\\((x+3)^2 - (x+3)(x-3) = 6x+18\\). Correct?",
    options: [
      { text: "Yes", correct: true, feedback: "(x²+6x+9)-(x²-9)=6x+18." },
      { text: "No, it should be \\(6x\\)", correct: false, feedback: "9-(-9)=18.", misconceptionId: "E-r8-a" },
      { text: "No, it should be \\(12x\\)", correct: false, feedback: "6x is correct.", misconceptionId: "E-r8-b" },
      { text: "No, it should be 0", correct: false, feedback: "They don't cancel completely.", misconceptionId: "E-r8-c" }
    ],
    misconceptions: [
      {
        misconceptionId: "E-r8-a",
        description: "Student believes the constant terms cancel to zero, not recognising that subtracting -9 (from the second expansion) actually adds 9 to the existing +9 (from the first expansion), giving +18.",
        rootCause: "Incorrect Assumption About Cancellation — assumes constant terms cancel without verifying through actual expansion.",
        remediation: "(x+3)²=x²+6x+9 and (x+3)(x-3)=x²-9 — subtracting: (x²+6x+9)-(x²-9)=x²+6x+9-x²+9=6x+18 (the constants 9 and -(-9)=+9 ADD to give 18), not 0 — the constant term does NOT vanish."
      },
      {
        misconceptionId: "E-r8-b",
        description: "Student re-checks the x-coefficient and doubles it incorrectly, believing the answer should be 12x instead of the correct 6x.",
        rootCause: "Computation Error — miscombines or duplicates the x-term when re-verifying.",
        remediation: "Expanding (x+3)²=x²+6x+9 gives ONE 6x term, and (x+3)(x-3)=x²-9 has NO x term at all — so subtracting gives just 6x (from the first expansion only), not 12x (which would require an extra x-term that doesn't exist)."
      },
      {
        misconceptionId: "E-r8-c",
        description: "Student assumes the whole expression cancels to zero, not recognising that (x+3)² and (x+3)(x-3) expand to different polynomials that don't fully cancel.",
        rootCause: "Incorrect Assumption About Cancellation — assumes the entire expression cancels without verifying through actual expansion.",
        remediation: "(x+3)²=x²+6x+9 and (x+3)(x-3)=x²-9 are DIFFERENT expansions (one has a middle term, the other doesn't) — subtracting them does not give zero: (x²+6x+9)-(x²-9)=6x+18, which is nonzero."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Expand each part separately", hint: "(x+3)²=x²+6x+9. (x+3)(x-3)=x²-9 (difference of squares)." },
      { level: 2, description: "Subtract the second expansion from the first, distributing the subtraction sign", hint: "(x²+6x+9)-(x²-9) = x²+6x+9-x²+9." },
      { level: 3, description: "Combine like terms", hint: "The x² terms cancel; the constants combine: 9+9=?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.7.EE.A.1"] },
  { itemId: "r9", order: 9, cluster: "SUB", clusterName: CLUSTER_NAMES.SUB,
    skillId: "SUBEVAL-04",
    question: "If \\(a=-2, b=3\\), evaluate \\(a^2b + ab^2\\).",
    options: [
      { text: "\\(-6\\)", correct: true, feedback: "4×3 + (-2)×9 = 12-18=-6." },
      { text: "6", correct: false, feedback: "12-18=-6.", misconceptionId: "E-r9-a" },
      { text: "30", correct: false, feedback: "ab²=-18.", misconceptionId: "E-r9-b" },
      { text: "\\(-30\\)", correct: false, feedback: "a²b=12.", misconceptionId: "E-r9-c" }
    ],
    misconceptions: [
      {
        misconceptionId: "E-r9-a",
        description: "Student makes a sign error somewhere in combining the two terms, landing on positive 6 instead of the correct negative -6.",
        rootCause: "Computation Error — a sign is mishandled while combining the two terms.",
        remediation: "Recompute carefully: a²b=4×3=12, and ab²=(-2)×9=-18 (negative, since a is negative) — combining: 12+(-18)=-6, not +6."
      },
      {
        misconceptionId: "E-r9-b",
        description: "Student computes ab² as +18 instead of -18, dropping the negative sign on a during the multiplication.",
        rootCause: "Negative Coefficient Sign Dropped — loses track of the negative sign on one of the variables during multiplication.",
        remediation: "ab²=a×b²=(-2)×9=-18 (NEGATIVE, since a is negative) — the full evaluation is 12+(-18)=-6, not 12+18=30 (which uses the incorrect +18)."
      },
      {
        misconceptionId: "E-r9-c",
        description: "Student computes a²b as -12 instead of +12, treating a² (with a=-2) as -4 instead of +4, mishandling the square of a negative number.",
        rootCause: "Squaring Negative Numbers Misunderstood — believes squaring a negative gives a negative result.",
        remediation: "a²=(-2)²=+4 (never negative, since negative×negative=positive) — so a²b=4×3=+12, not -12; the full evaluation is 12+(-18)=-6, not -12+(-18)=-30."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Evaluate a² first", hint: "a²=(-2)²=+4 (never negative)." },
      { level: 2, description: "Evaluate each term separately", hint: "a²b=4×3=12. ab²=(-2)×9=-18 (a is negative, so this stays negative)." },
      { level: 3, description: "Add the two terms", hint: "12 + (-18) = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.EE.A.2C"] },
  { itemId: "r10", order: 10, cluster: "INDX", clusterName: CLUSTER_NAMES.INDX,
    skillId: "INDXCOMBO-01",
    question: "Simplify: \\((x^3)^2 \\times x\\).",
    options: [
      { text: "\\(x^7\\)", correct: true, feedback: "(x³)²=x⁶; x⁶×x=x⁷." },
      { text: "\\(x^6\\)", correct: false, feedback: "Don't forget the extra x.", misconceptionId: "E-r10-a" },
      { text: "\\(x^5\\)", correct: false, feedback: "3×2=6, +1=7.", misconceptionId: "E-r10-b" },
      { text: "\\(x^8\\)", correct: false, feedback: "6+1=7.", misconceptionId: "E-r10-c" }
    ],
    misconceptions: [
      {
        misconceptionId: "E-r10-a",
        description: "Student correctly computes (x³)²=x⁶ via the power-of-a-power rule but forgets to also multiply by the final ×x, stopping at x⁶ instead of x⁷.",
        rootCause: "Final Multiplication Step Omitted — stops after the power-of-a-power step, forgetting the additional factor still needs to be applied.",
        remediation: "After computing (x³)²=x⁶, there is still a ×x to apply — use the product rule (add exponents): x⁶×x¹=x^(6+1)=x⁷, not stopping at just x⁶."
      },
      {
        misconceptionId: "E-r10-b",
        description: "Student makes an error in either the power-of-a-power step or the final multiplication, landing on x⁵ instead of the correct x⁷.",
        rootCause: "Multi-Step Exponent Rule Error — mishandles one of the two exponent rules needed in this two-step simplification.",
        remediation: "Work through both steps in order: first (x³)²=x^(3×2)=x⁶ (multiply exponents for power of a power), then x⁶×x=x^(6+1)=x⁷ (add exponents for multiplying same-base powers) — the final answer is x⁷, not x⁵."
      },
      {
        misconceptionId: "E-r10-c",
        description: "Student miscombines the exponents in the final step, getting 8 instead of 7, perhaps by mishandling the addition of the implicit exponent of 1 on the lone x.",
        rootCause: "Implicit Exponent of 1 Miscounted — miscounts the exponent contributed by the bare x factor.",
        remediation: "The lone x has an implicit exponent of 1 — after (x³)²=x⁶, multiply by x¹: 6+1=7, giving x⁷, not 6+2=8 (which incorrectly treats the bare x as having exponent 2)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Simplify the power-of-a-power part first", hint: "(x³)² = x^(3×2) = x⁶." },
      { level: 2, description: "Identify the exponent of the remaining factor", hint: "The lone x has an implicit exponent of 1." },
      { level: 3, description: "Multiply the two powers together by adding exponents", hint: "x⁶ × x¹ = x^(6+1) = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.EE.A.1"] },
  { itemId: "r11", order: 11, cluster: "EXP", clusterName: CLUSTER_NAMES.EXP,
    skillId: "EXPANDFOIL-02",
    question: "Expand and simplify: \\((3x-2)(x+1)\\).",
    options: [
      { text: "\\(3x^2 + x - 2\\)", correct: true, feedback: "3x²+3x-2x-2." },
      { text: "\\(3x^2 - x - 2\\)", correct: false, feedback: "3x-2x=+x.", misconceptionId: "E-r11-a" },
      { text: "\\(3x^2 + 5x - 2\\)", correct: false, feedback: "-2x+3x=x.", misconceptionId: "E-r11-b" },
      { text: "\\(3x^2 + x + 2\\)", correct: false, feedback: "-2×1=-2.", misconceptionId: "E-r11-c" }
    ],
    misconceptions: [
      {
        misconceptionId: "E-r11-a",
        description: "Student mishandles the sign when combining the cross terms, treating 3x-2x as -x instead of +x.",
        rootCause: "Cross Term Sign Combination Error — mishandles the signs when combining the Outer and Inner products.",
        remediation: "The cross terms are Outer: 3x×1=3x and Inner: -2×x=-2x — combining: 3x+(-2x)=3x-2x=+x (positive, since 3x is larger in magnitude), not -x (which would result from an incorrect sign treatment)."
      },
      {
        misconceptionId: "E-r11-b",
        description: "Student adds the magnitudes of the cross terms (2x+3x=5x) instead of correctly combining them with their signs (3x-2x=x).",
        rootCause: "Cross Term Sign Combination Error — adds the magnitudes of the cross terms instead of combining them with their correct signs.",
        remediation: "The cross terms are 3x (Outer, positive) and -2x (Inner, negative) — they must combine WITH their signs: 3x+(-2x)=x, not 3x+2x=5x (which ignores the negative sign on the Inner term)."
      },
      {
        misconceptionId: "E-r11-c",
        description: "Student computes the Last term (-2×1) as +2 instead of -2, mishandling the sign of a negative times a positive.",
        rootCause: "Sign Rule Confused — treats negative×positive as positive instead of negative.",
        remediation: "-2×1: negative×positive=NEGATIVE, so this equals -2, not +2 — the correct expansion is 3x²+x-2, not 3x²+x+2."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Multiply the First terms", hint: "3x × x = 3x²." },
      { level: 2, description: "Multiply the Outer and Inner terms, tracking signs, then combine", hint: "3x×1=3x (Outer). -2×x=-2x (Inner). 3x + (-2x) = x." },
      { level: 3, description: "Multiply the Last terms, applying the sign rule", hint: "-2 × 1 = ? (negative × positive = negative)" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.HSA-APR.A.1"] },
  { itemId: "r12", order: 12, cluster: "ALGF", clusterName: CLUSTER_NAMES.ALGF,
    skillId: "ALGFRAC-02",
    question: "Simplify: \\(\\frac{3x^2 - 9x}{3x}\\).",
    options: [
      { text: "\\(x - 3\\)", correct: true, feedback: "3x²/3x=x; -9x/3x=-3." },
      { text: "\\(x + 3\\)", correct: false, feedback: "-9x/3x=-3.", misconceptionId: "E-r12-a" },
      { text: "\\(x^2 - 3\\)", correct: false, feedback: "x²/x=x.", misconceptionId: "E-r12-b" },
      { text: "\\(3x - 3\\)", correct: false, feedback: "3/3=1.", misconceptionId: "E-r12-c" }
    ],
    misconceptions: [
      {
        misconceptionId: "E-r12-a",
        description: "Student drops the negative sign on the second term, computing -9x/3x as +3 instead of -3.",
        rootCause: "Sign Dropped During Division — loses track of the negative sign on the second term.",
        remediation: "-9x is being divided by 3x, and negative÷positive=NEGATIVE: -9x/3x=-3, not +3 — the full simplification is x-3, not x+3."
      },
      {
        misconceptionId: "E-r12-b",
        description: "Student correctly reduces the second term (-3) but forgets to reduce the exponent on the first term, keeping x² unchanged instead of x.",
        rootCause: "Exponent Not Reduced During Division — divides the coefficients but leaves the variable's exponent untouched.",
        remediation: "3x²/3x: coefficients divide (3÷3=1) AND exponents subtract (2-1=1, since x means x¹) — the full first term is x, not x² (which leaves the exponent unreduced)."
      },
      {
        misconceptionId: "E-r12-c",
        description: "Student forgets to fully reduce the coefficient of the first term, leaving it as 3x instead of simplifying to x.",
        rootCause: "Coefficient Division Not Completed — doesn't fully divide the coefficient of the first term.",
        remediation: "3x²/3x requires dividing the coefficient: 3÷3=1 (giving just x, since a coefficient of 1 is not written) — the full first term is x, not 3x (which leaves the coefficient undivided)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Divide the first term", hint: "3x²/3x: coefficients 3÷3=1, exponents 2-1=1, giving x." },
      { level: 2, description: "Divide the second term, keeping the sign", hint: "-9x/3x: coefficients -9÷3=-3." },
      { level: 3, description: "Combine both simplified terms", hint: "x + (-3) = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.HSA-APR.D.6"] }
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

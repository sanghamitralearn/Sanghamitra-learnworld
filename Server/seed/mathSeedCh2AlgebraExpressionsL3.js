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
    skillId: "SUBEVAL-03",
    question: "If \\(x = -2\\), evaluate \\(x^2 + 3x - 5\\).",
    options: [
      { text: "\\(-7\\)", correct: true, feedback: "Correct. 4 + (-6) - 5 = -7." },
      { text: "\\(-3\\)", correct: false, feedback: "You treated 3x as +6 instead of -6. 3×(-2)=-6, so 4-6-5=-7.", misconceptionId: "E-w1-a" },
      { text: "5", correct: false, feedback: "You squared -2 as -4. (-2)²=+4.", misconceptionId: "E-w1-b" },
      { text: "3", correct: false, feedback: "You computed 4+6-5=5 and then took the negative? 4-6-5=-7.", misconceptionId: "E-w1-c" }
    ],
    retryHint: "(-2)²=+4; 3×(-2)=-6; 4-6-5=-7.",
    misconceptions: [
      {
        misconceptionId: "E-w1-a",
        description: "Student drops the negative sign on the linear term, treating 3x (with x=-2) as +6 instead of -6.",
        rootCause: "Negative Substitution Sign Dropped — loses track of the negative sign when substituting x into the linear term.",
        remediation: "3x with x=-2 means 3×(-2)=-6 (NEGATIVE), not +6 — the full evaluation is 4+(-6)-5=-7, not 4+6-5=5 or similar (which drops the negative sign)."
      },
      {
        misconceptionId: "E-w1-b",
        description: "Student computes x² (with x=-2) as -4 instead of +4, treating the square of a negative number as negative.",
        rootCause: "Squaring Negative Numbers Misunderstood — believes squaring a negative gives a negative result.",
        remediation: "x²=(-2)²=(-2)×(-2)=+4 (negative×negative=positive) — a square is NEVER negative; the full evaluation is 4+(-6)-5=-7, not -4+(-6)-5=-15 or similar."
      },
      {
        misconceptionId: "E-w1-c",
        description: "Student makes a sign error somewhere in combining the three terms, landing on a positive result instead of the correct negative -7.",
        rootCause: "Computation Error — a sign is mishandled while combining the terms.",
        remediation: "Recompute step by step: (-2)²=4, then +3(-2)=-6, then -5 — combining: 4-6-5=-7, not a positive result like 3 or 5."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Substitute x=-2 into each term separately", hint: "(-2)², 3(-2), and -5." },
      { level: 2, description: "Evaluate each term carefully with correct signs", hint: "(-2)²=+4. 3×(-2)=-6 (stays negative)." },
      { level: 3, description: "Combine all three terms", hint: "4 + (-6) - 5 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.EE.A.2C"] },
  { itemId: "w2", order: 2, cluster: "INDX", clusterName: CLUSTER_NAMES.INDX,
    skillId: "INDXNEGEXP-01",
    question: "Simplify: \\((x^2)^3 \\times x^{-1}\\). (Hint: \\(x^{-1} = \\frac{1}{x}\\))",
    options: [
      { text: "\\(x^5\\)", correct: true, feedback: "(x²)³=x⁶; x⁶ × x⁻¹ = x⁵." },
      { text: "\\(x^7\\)", correct: false, feedback: "You added 6+1=7, but x⁻¹ means divide, so subtract: 6-1=5.", misconceptionId: "E-w2-a" },
      { text: "\\(x^6\\)", correct: false, feedback: "Don't forget to multiply by x⁻¹. 6-1=5.", misconceptionId: "E-w2-b" },
      { text: "\\(x^8\\)", correct: false, feedback: "You multiplied the exponents: 2×3=6, then 6+2=8? x⁻¹ subtracts 1.", misconceptionId: "E-w2-c" }
    ],
    retryHint: "(x²)³=x⁶. x⁻¹ = 1/x, so x⁶/x = x⁵.",
    misconceptions: [
      {
        misconceptionId: "E-w2-a",
        description: "Student adds the exponent of x⁻¹ (treating it as +1) instead of recognising that x⁻¹ means division, which subtracts 1 from the exponent.",
        rootCause: "Negative Exponent Meaning Not Applied — treats x⁻¹ as a positive contribution to add instead of a division that subtracts.",
        remediation: "x⁻¹ means 1/x, which is DIVISION by x — dividing by x SUBTRACTS 1 from the exponent: x⁶×x⁻¹=x^(6-1)=x⁵, not x^(6+1)=x⁷ (which incorrectly adds instead of subtracts)."
      },
      {
        misconceptionId: "E-w2-b",
        description: "Student correctly computes (x²)³=x⁶ but forgets to apply the x⁻¹ factor at all, stopping at x⁶.",
        rootCause: "Final Factor Omitted — stops after the power-of-a-power step, forgetting the additional x⁻¹ factor still needs to be applied.",
        remediation: "After computing (x²)³=x⁶, you must still multiply by x⁻¹ (which subtracts 1 from the exponent): x⁶×x⁻¹=x^(6-1)=x⁵, not stopping at just x⁶."
      },
      {
        misconceptionId: "E-w2-c",
        description: "Student adds an extra 2 to the exponent instead of subtracting 1 for the x⁻¹ factor, landing on x⁸ through a miscombination of steps.",
        rootCause: "Exponent Combination Error — misapplies the rule for combining the x⁻¹ factor's exponent with the power-of-a-power result.",
        remediation: "(x²)³=x^(2×3)=x⁶ (multiply exponents for power of a power), THEN x⁻¹ SUBTRACTS 1: x⁶×x⁻¹=x^(6-1)=x⁵, not x^(6+2)=x⁸ (which uses an incorrect operation on the wrong exponent)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Simplify the power-of-a-power part first", hint: "(x²)³ = x^(2×3) = x⁶." },
      { level: 2, description: "Recall what a negative exponent means", hint: "x⁻¹ = 1/x, which means DIVIDING by x." },
      { level: 3, description: "Apply the division by subtracting 1 from the exponent", hint: "x⁶ ÷ x = x^(6-1) = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.EE.A.1"] },
  { itemId: "w3", order: 3, cluster: "EXP", clusterName: CLUSTER_NAMES.EXP,
    skillId: "EXPANDFOIL-01",
    question: "Expand and simplify: \\((x+2)(x+3)\\).",
    options: [
      { text: "\\(x^2 + 5x + 6\\)", correct: true, feedback: "FOIL: x²+3x+2x+6 = x²+5x+6." },
      { text: "\\(x^2 + 6\\)", correct: false, feedback: "Don't forget the middle terms: 3x and 2x.", misconceptionId: "E-w3-a" },
      { text: "\\(x^2 + 5x + 5\\)", correct: false, feedback: "2×3=6, not 5.", misconceptionId: "E-w3-b" },
      { text: "\\(x^2 + 6x + 6\\)", correct: false, feedback: "3x+2x=5x, not 6x.", misconceptionId: "E-w3-c" }
    ],
    retryHint: "Use FOIL: First, Outer, Inner, Last.",
    misconceptions: [
      {
        misconceptionId: "E-w3-a",
        description: "Student multiplies only the First and Last terms (x×x=x² and 2×3=6), skipping the Outer and Inner cross terms (3x and 2x) entirely.",
        rootCause: "Cross Terms Omitted — forgets to multiply the outer and inner pairs of terms when expanding double brackets.",
        remediation: "Expanding (x+2)(x+3) requires FOUR products: First (x×x=x²), Outer (x×3=3x), Inner (2×x=2x), and Last (2×3=6) — the two middle (cross) terms 3x+2x=5x must be included, not skipped: x²+5x+6, not just x²+6."
      },
      {
        misconceptionId: "E-w3-b",
        description: "Student correctly combines the cross terms (5x) but miscalculates the Last term, getting 2×3=5 instead of 6.",
        rootCause: "Computation Error — the final multiplication of the constant terms is mishandled.",
        remediation: "The Last term is 2×3=6 (a basic multiplication fact), not 5 — the full expansion is x²+5x+6, not x²+5x+5."
      },
      {
        misconceptionId: "E-w3-c",
        description: "Student miscombines the cross terms, getting 6x instead of 5x, perhaps by mishandling the addition of 3x and 2x.",
        rootCause: "Cross Term Combination Error — mishandles the arithmetic when combining the Outer and Inner products.",
        remediation: "The cross terms are 3x (Outer) and 2x (Inner) — combining: 3x+2x=5x, not 6x (which would require an incorrect addition of the coefficients)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Multiply the First terms", hint: "x × x = x²." },
      { level: 2, description: "Multiply the Outer and Inner terms, then combine", hint: "x×3=3x (Outer). 2×x=2x (Inner). 3x+2x=5x." },
      { level: 3, description: "Multiply the Last terms", hint: "2 × 3 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.HSA-APR.A.1"] },
  { itemId: "w4", order: 4, cluster: "ALGF", clusterName: CLUSTER_NAMES.ALGF,
    skillId: "ALGFRAC-01",
    question: "Simplify: \\(\\frac{6x^2}{3x}\\).",
    options: [
      { text: "\\(2x\\)", correct: true, feedback: "6÷3=2, x²÷x=x." },
      { text: "\\(2x^2\\)", correct: false, feedback: "x²÷x=x, not x². Subtract exponents.", misconceptionId: "E-w4-a" },
      { text: "\\(3x\\)", correct: false, feedback: "6÷3=2, not 3.", misconceptionId: "E-w4-b" },
      { text: "\\(2\\)", correct: false, feedback: "x²÷x=x, not nothing. The answer is 2x.", misconceptionId: "E-w4-c" }
    ],
    retryHint: "Divide the numbers and subtract the exponents.",
    misconceptions: [
      {
        misconceptionId: "E-w4-a",
        description: "Student correctly divides the numeric coefficients (6÷3=2) but forgets to reduce the exponent on x, keeping x² unchanged instead of x.",
        rootCause: "Exponent Not Reduced During Division — divides the coefficients but leaves the variable's exponent untouched.",
        remediation: "The coefficients divide (6÷3=2) AND the exponents subtract (2-1=1, since x means x¹) — both parts must be simplified: 2x, not 2x² (which leaves the exponent unreduced)."
      },
      {
        misconceptionId: "E-w4-b",
        description: "Student miscalculates the coefficient division, getting 6÷3=3 instead of 2, a basic arithmetic slip.",
        rootCause: "Computation Error — a basic division fact is computed incorrectly.",
        remediation: "6÷3=2, not 3 — recompute the coefficient division carefully: 2x, not 3x."
      },
      {
        misconceptionId: "E-w4-c",
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
  { itemId: "w5", order: 5, cluster: "CON", clusterName: CLUSTER_NAMES.CON,
    skillId: "CONSTRUCT-10",
    question: "Write an expression for 'the product of a number \\(n\\) and three more than the number'.",
    options: [
      { text: "\\(n(n+3)\\)", correct: true, feedback: "The product of n and (n+3) is n(n+3)." },
      { text: "\\(n + 3n\\)", correct: false, feedback: "Product means multiply, not add.", misconceptionId: "E-w5-a" },
      { text: "\\(3n^2\\)", correct: false, feedback: "That's 3 times the square of n — not the product of n and (n+3).", misconceptionId: "E-w5-b" },
      { text: "\\(n^2 + 3\\)", correct: false, feedback: "That's the square of n plus 3 — not the product.", misconceptionId: "E-w5-c" }
    ],
    retryHint: "Product of a and b means a × b.",
    misconceptions: [
      {
        misconceptionId: "E-w5-a",
        description: "Student translates 'product' as addition, writing n+3n instead of the correct multiplication n(n+3).",
        rootCause: "Operation Keyword Misread — confuses a multiplication keyword ('product') with an addition expression.",
        remediation: "'Product' signals MULTIPLICATION, not addition — 'the product of n and (n+3)' means n×(n+3)=n(n+3), not n+3n (which uses addition instead)."
      },
      {
        misconceptionId: "E-w5-b",
        description: "Student writes 3n² instead of correctly identifying the second factor as (n+3), perhaps distributing incorrectly or misreading the phrase's structure.",
        rootCause: "Second Factor Misidentified — doesn't correctly translate 'three more than the number' as (n+3) before forming the product.",
        remediation: "'Three more than the number' means n+3 (not 3×n or n² related) — the product is n×(n+3)=n(n+3), not 3n² (which incorrectly reinterprets the second factor)."
      },
      {
        misconceptionId: "E-w5-c",
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
  { itemId: "w6", order: 6, cluster: "REA", clusterName: CLUSTER_NAMES.REA,
    skillId: "REARRANGE-01",
    question: "Make \\(x\\) the subject of \\(y = 2x - 5\\).",
    options: [
      { text: "\\(x = \\frac{y+5}{2}\\)", correct: true, feedback: "Add 5 to both sides: y+5=2x. Then divide by 2." },
      { text: "\\(x = \\frac{y}{2} + 5\\)", correct: false, feedback: "Add 5 first, then divide the whole thing by 2.", misconceptionId: "E-w6-a" },
      { text: "\\(x = 2y + 5\\)", correct: false, feedback: "Use inverse operations: the opposite of -5 is +5, the opposite of ×2 is ÷2.", misconceptionId: "E-w6-b" },
      { text: "\\(x = \\frac{y-5}{2}\\)", correct: false, feedback: "You subtracted 5. To undo -5, you need to add 5.", misconceptionId: "E-w6-c" }
    ],
    retryHint: "Add 5 to both sides, then divide by 2.",
    misconceptions: [
      {
        misconceptionId: "E-w6-a",
        description: "Student divides by 2 before adding 5, applying the inverse operations in the wrong order (dividing y by 2 first, then adding 5 outside).",
        rootCause: "Inverse Operations Applied in Wrong Order — undoes the operations in the same order they were originally applied instead of reverse order.",
        remediation: "Inverse operations must be undone in REVERSE order — since the original was '×2 then -5', undo by first adding 5 (undoing the -5), THEN dividing by 2 (undoing the ×2): x=(y+5)/2, not x=y/2+5 (which divides first)."
      },
      {
        misconceptionId: "E-w6-b",
        description: "Student uses the wrong inverse operations entirely, multiplying by 2 instead of dividing and adding instead of... producing x=2y+5, which doesn't correctly undo either original operation.",
        rootCause: "Wrong Inverse Operations Used — uses operations that don't correctly undo the original operations.",
        remediation: "To undo '×2', you must DIVIDE by 2 (not multiply) — and to undo '-5', you must ADD 5 (not just append it) — correctly: x=(y+5)/2, not x=2y+5 (which uses multiplication and addition, the same operations as the original, instead of their inverses)."
      },
      {
        misconceptionId: "E-w6-c",
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
  { itemId: "w7", order: 7, cluster: "EST", clusterName: CLUSTER_NAMES.EST,
    skillId: "ESTROUND-04",
    question: "Estimate \\((2.1)^2 + 3(2.1) - 1\\).",
    options: [
      { text: "9", correct: true, feedback: "Round 2.1 to 2. 2²=4, 3×2=6, 4+6-1=9." },
      { text: "10", correct: false, feedback: "4+6-1=9, not 10.", misconceptionId: "E-w7-a" },
      { text: "8", correct: false, feedback: "4+6-1=9, not 8.", misconceptionId: "E-w7-b" },
      { text: "11", correct: false, feedback: "You rounded 2.1 to 3? 9+9-1=17, not 11.", misconceptionId: "E-w7-c" }
    ],
    retryHint: "Round 2.1 to 2. Then substitute and compute.",
    misconceptions: [
      {
        misconceptionId: "E-w7-a",
        description: "Student computes the correct component values but combines them incorrectly, arriving at 10 instead of the correct 9.",
        rootCause: "Computation Error — the final combination step is mishandled despite correct intermediate values.",
        remediation: "Recompute carefully: 2²=4, 3×2=6 — then 4+6-1=9, not 10 (which suggests an arithmetic slip in the final steps)."
      },
      {
        misconceptionId: "E-w7-b",
        description: "Student computes the correct component values but combines them incorrectly, arriving at 8 instead of the correct 9.",
        rootCause: "Computation Error — the final combination step is mishandled despite correct intermediate values.",
        remediation: "Recompute carefully: 2²=4, 3×2=6 — then 4+6-1=9, not 8 (which suggests an arithmetic slip in the final subtraction)."
      },
      {
        misconceptionId: "E-w7-c",
        description: "Student rounds 2.1 up to 3 instead of down to 2, rounding in the wrong direction and using an inflated value throughout.",
        rootCause: "Rounding Direction Error — rounds away from the nearest whole number instead of to it.",
        remediation: "2.1 is closer to 2 than to 3 (since .1 rounds down) — round to 2, then 2²+3×2-1=4+6-1=9, not using 3 (which gives 3²+3×3-1=17, far from the correct estimate)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Round the input value to the nearest whole number", hint: "2.1 rounds to 2." },
      { level: 2, description: "Evaluate each term separately", hint: "2²=4. 3×2=6. The constant is -1." },
      { level: 3, description: "Combine all three terms", hint: "4 + 6 - 1 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.7.EE.B.3"] },
  { itemId: "w8", order: 8, cluster: "EXT", clusterName: CLUSTER_NAMES.EXT,
    skillId: "EXTDIAG-02",
    question: "A student simplified \\(3(x+2) - (x-1)\\) and got \\(2x+5\\). What went wrong?",
    options: [
      { text: "\\(-(x-1)\\) should be \\(-x+1\\), not \\(-x-1\\)", correct: true, feedback: "Correct. The correct answer is 2x+7." },
      { text: "The 3 was not multiplied correctly", correct: false, feedback: "3(x+2)=3x+6 is correct.", misconceptionId: "E-w8-a" },
      { text: "The x-terms were combined incorrectly", correct: false, feedback: "3x-x=2x is correct.", misconceptionId: "E-w8-b" },
      { text: "The constants were added incorrectly", correct: false, feedback: "6+1=7, and that's what the corrected version gives. The error was making it 6-1=5.", misconceptionId: "E-w8-c" }
    ],
    retryHint: "A minus sign before a bracket changes the sign of both terms inside.",
    misconceptions: [
      {
        misconceptionId: "E-w8-a",
        description: "Student misdiagnoses the error, claiming 3(x+2) was multiplied incorrectly, when in fact 3(x+2)=3x+6 is correct and the actual error is in the second bracket's sign distribution.",
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
        description: "Student claims the constants were 'added incorrectly', but the underlying issue is actually that the sign of the second bracket's constant term wasn't correctly flipped by the leading minus sign, not an addition error per se.",
        rootCause: "Error Type Misidentified — diagnoses the error as a simple addition mistake rather than the root cause: an unflipped sign from incomplete distribution.",
        remediation: "The root cause is that -(x-1) should distribute the negative to BOTH terms, giving -x+1 (not -x-1) — this means the constant contribution is +1, not -1, so 6+1=7 is correct, and the student's 6-1=5 stems from that sign error, not a separate addition mistake."
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
    question: "If \\(x = -3\\), evaluate \\(2x^2 + 3x - 4\\).",
    options: [
      { text: "5", correct: true, feedback: "2×9 + (-9) - 4 = 18 - 9 - 4 = 5." },
      { text: "\\(-13\\)", correct: false, feedback: "You squared -3 as -9 AND treated 3x as +9.", misconceptionId: "E-d1-a" },
      { text: "23", correct: false, feedback: "You treated both terms as positive: 18+9-4=23. 3x when x=-3 is -9, not +9.", misconceptionId: "E-d1-b" },
      { text: "\\(-5\\)", correct: false, feedback: "2(-3)²=18, 3(-3)=-9, 18-9-4=5.", misconceptionId: "E-d1-c" }
    ],
    backward: "(-3)²=+9; 3×(-3)=-9.",
    forward: "Substituting negative values is essential for graphing functions.",
    misconceptions: [
      {
        misconceptionId: "E-d1-a",
        description: "Student makes two sign errors: treating x² (with x=-3) as -9 instead of +9, AND treating 3x as +9 instead of -9.",
        rootCause: "Squaring Negative Numbers Misunderstood — believes squaring a negative gives a negative result, combined with dropping the negative sign on the linear term.",
        remediation: "x²=(-3)²=+9 (never negative) AND 3x=3×(-3)=-9 (stays negative) — the full evaluation is 2×9+(-9)-4=5, not 2×(-9)+9-4=-13 (which flips both signs incorrectly)."
      },
      {
        misconceptionId: "E-d1-b",
        description: "Student drops the negative sign on the linear term, treating 3x (with x=-3) as +9 instead of -9, computing 18+9-4=23.",
        rootCause: "Negative Substitution Sign Dropped — loses track of the negative sign when substituting x into the linear term.",
        remediation: "3x with x=-3 means 3×(-3)=-9 (NEGATIVE), not +9 — the full evaluation is 18+(-9)-4=5, not 18+9-4=23 (which drops the negative sign)."
      },
      {
        misconceptionId: "E-d1-c",
        description: "Student's stated reasoning arrives at the correct steps (2(-3)²=18, 3(-3)=-9, 18-9-4=5) but selects the negated answer -5 instead of the correct 5.",
        rootCause: "Final Sign Flip Error — negates the correctly-computed final answer for no valid reason.",
        remediation: "18-9-4=5 (positive) — the correct steps lead directly to +5; there's no reason to flip the sign of the final result to get -5."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Substitute x=-3 into each term separately", hint: "2(-3)², 3(-3), and -4." },
      { level: 2, description: "Evaluate each term carefully with correct signs", hint: "(-3)²=+9, so 2×9=18. 3×(-3)=-9 (stays negative)." },
      { level: 3, description: "Combine all three terms", hint: "18 + (-9) - 4 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.EE.A.2C"] },
  { itemId: "d2", order: 2, cluster: "INDX", clusterName: CLUSTER_NAMES.INDX,
    skillId: "INDXCOMBO-02",
    question: "Simplify: \\(\\frac{x^4 \\times x^2}{x^3}\\).",
    options: [
      { text: "\\(x^3\\)", correct: true, feedback: "x⁴×x²=x⁶; x⁶/x³=x³." },
      { text: "\\(x^5\\)", correct: false, feedback: "You added 4+2=6, then subtracted 3 incorrectly to get 5? 6-3=3.", misconceptionId: "E-d2-a" },
      { text: "\\(x^6\\)", correct: false, feedback: "You multiplied but forgot to divide by x³.", misconceptionId: "E-d2-b" },
      { text: "\\(x^1\\)", correct: false, feedback: "You subtracted all exponents: 4+2-3=3, not 1.", misconceptionId: "E-d2-c" }
    ],
    backward: "Multiply first (add exponents), then divide (subtract).",
    forward: "Index laws are used in standard form and algebraic fractions.",
    misconceptions: [
      {
        misconceptionId: "E-d2-a",
        description: "Student correctly combines the numerator (x⁴×x²=x⁶) but makes an arithmetic slip in the final subtraction, getting 5 instead of the correct 3.",
        rootCause: "Computation Error — the final subtraction step is mishandled despite correct intermediate values.",
        remediation: "6-3=3 (a basic subtraction fact), not 5 — recompute carefully: x⁶÷x³=x^(6-3)=x³, not x⁵."
      },
      {
        misconceptionId: "E-d2-b",
        description: "Student correctly multiplies x⁴×x²=x⁶ but stops there, forgetting to also divide by x³ as the expression requires.",
        rootCause: "Final Step Omitted — stops after the first operation, forgetting the second operation still needs to be applied.",
        remediation: "The expression has TWO operations: multiply (numerator), THEN divide (by denominator) — after x⁴×x²=x⁶, you still need to divide by x³: x⁶÷x³=x^(6-3)=x³, not stopping at just x⁶."
      },
      {
        misconceptionId: "E-d2-c",
        description: "Student subtracts the denominator's exponent (3) instead of treating the numerator's factors as multiplied (added) first, computing 4+2-3 in one step which happens to give the same numeric result here but reflects an inconsistent method (not truly applying two separate rules).",
        rootCause: "Rules Combined Without Distinguishing Operations — treats all exponents uniformly by adding numerator terms and subtracting the denominator in one blended step rather than applying multiply-then-divide as distinct rules, risking errors on different problems.",
        remediation: "Work through the two operations SEPARATELY: first multiply the numerator (4+2=6, giving x⁶), THEN divide by the denominator (6-3=3, giving x³) — treating this as one combined step (4+2-3=3) happens to work here, but understanding it as two distinct rules (add for ×, subtract for ÷) avoids errors on different problems."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Simplify the numerator first", hint: "x⁴×x²: add exponents, 4+2=6, giving x⁶." },
      { level: 2, description: "Identify the denominator's exponent", hint: "The denominator is x³." },
      { level: 3, description: "Divide by subtracting exponents", hint: "x⁶÷x³: 6-3=?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.EE.A.1"] },
  { itemId: "d3", order: 3, cluster: "EXP", clusterName: CLUSTER_NAMES.EXP,
    skillId: "EXPANDFOIL-01",
    question: "Expand and simplify: \\((x+5)(x-2)\\).",
    options: [
      { text: "\\(x^2 + 3x - 10\\)", correct: true, feedback: "x²-2x+5x-10 = x²+3x-10." },
      { text: "\\(x^2 + 3x + 10\\)", correct: false, feedback: "5×(-2)=-10, not +10.", misconceptionId: "E-d3-a" },
      { text: "\\(x^2 + 7x - 10\\)", correct: false, feedback: "-2x+5x=+3x, not +7x.", misconceptionId: "E-d3-b" },
      { text: "\\(x^2 - 10\\)", correct: false, feedback: "Don't forget the middle terms: -2x and +5x.", misconceptionId: "E-d3-c" }
    ],
    backward: "FOIL: (x+a)(x+b)=x²+(a+b)x+ab.",
    forward: "Double bracket expansion is the foundation for quadratic factorisation.",
    misconceptions: [
      {
        misconceptionId: "E-d3-a",
        description: "Student computes the Last term (5×-2) as +10 instead of -10, mishandling the sign of a positive times a negative.",
        rootCause: "Sign Rule Confused — treats positive×negative as positive instead of negative.",
        remediation: "5×(-2): positive×negative=NEGATIVE, so this equals -10, not +10 — the correct expansion is x²+3x-10, not x²+3x+10."
      },
      {
        misconceptionId: "E-d3-b",
        description: "Student adds the magnitudes of the cross terms (2x+5x=7x) instead of correctly combining them with their signs (-2x+5x=3x).",
        rootCause: "Cross Term Sign Combination Error — adds the magnitudes of the cross terms instead of combining them with their correct signs.",
        remediation: "The cross terms are -2x (Outer, negative) and 5x (Inner, positive) — they must combine WITH their signs: -2x+5x=3x, not 2x+5x=7x (which ignores the negative sign on the Outer term)."
      },
      {
        misconceptionId: "E-d3-c",
        description: "Student multiplies only the First and Last terms (x×x=x² and 5×-2=-10), skipping the Outer and Inner cross terms entirely.",
        rootCause: "Cross Terms Omitted — forgets to multiply the outer and inner pairs of terms when expanding double brackets.",
        remediation: "Expanding (x+5)(x-2) requires FOUR products: First (x×x=x²), Outer (x×-2=-2x), Inner (5×x=5x), and Last (5×-2=-10) — the two middle (cross) terms -2x+5x=3x must be included, not skipped: x²+3x-10, not just x²-10."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Multiply the First terms", hint: "x × x = x²." },
      { level: 2, description: "Multiply the Outer and Inner terms, tracking signs, then combine", hint: "x×(-2)=-2x (Outer). 5×x=5x (Inner). -2x+5x=3x." },
      { level: 3, description: "Multiply the Last terms, applying the sign rule", hint: "5 × (-2) = ? (positive × negative = negative)" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.HSA-APR.A.1"] },
  { itemId: "d4", order: 4, cluster: "ALGF", clusterName: CLUSTER_NAMES.ALGF,
    skillId: "ALGFRAC-02",
    question: "Simplify: \\(\\frac{x^2 + 3x}{x}\\).",
    options: [
      { text: "\\(x + 3\\)", correct: true, feedback: "Divide each term: x²/x=x, 3x/x=3." },
      { text: "\\(x^2 + 3\\)", correct: false, feedback: "You forgot to divide the x² term by x. x²/x=x, not x².", misconceptionId: "E-d4-a" },
      { text: "\\(3x\\)", correct: false, feedback: "x²/x=x, but you also need to divide the 3x term.", misconceptionId: "E-d4-b" },
      { text: "\\(x + 3x\\)", correct: false, feedback: "3x/x=3, not 3x. Divide the x as well.", misconceptionId: "E-d4-c" }
    ],
    backward: "Factor the numerator: x(x+3)/x = x+3.",
    forward: "Simplifying algebraic fractions is essential for solving rational equations.",
    misconceptions: [
      {
        misconceptionId: "E-d4-a",
        description: "Student divides only the second term (3x/x=3) by the denominator but leaves the first term (x²) undivided.",
        rootCause: "Not Every Term Divided — divides only part of the numerator by the denominator instead of every term.",
        remediation: "EVERY term in the numerator must be divided by x: x²/x=x AND 3x/x=3 — the full simplification is x+3, not x²+3 (which leaves the x² term unmultiplied)."
      },
      {
        misconceptionId: "E-d4-b",
        description: "Student divides only the first term (x²/x=x) by the denominator but leaves the second term (3x) undivided.",
        rootCause: "Not Every Term Divided — divides only part of the numerator by the denominator instead of every term.",
        remediation: "EVERY term in the numerator must be divided by x: x²/x=x AND 3x/x=3 — the full simplification is x+3, not just 3x (which leaves the x² term's division incomplete or is otherwise mishandled)."
      },
      {
        misconceptionId: "E-d4-c",
        description: "Student correctly divides the first term (x) but doesn't actually divide the second term, incorrectly copying it over unchanged as 3x instead of simplifying to 3.",
        rootCause: "Division Not Completed on Second Term — copies a term over without applying the required division.",
        remediation: "3x divided by x means the x's cancel: 3x/x=3 (not 3x, which would mean no division happened) — the full simplification is x+3, not x+3x."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recognise that every term in the numerator must be divided by the denominator", hint: "(x²+3x)/x means x²/x + 3x/x." },
      { level: 2, description: "Divide the first term", hint: "x²/x = x (subtract exponents: 2-1=1)." },
      { level: 3, description: "Divide the second term", hint: "3x/x = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.HSA-APR.D.6"] },
  { itemId: "d5", order: 5, cluster: "CON", clusterName: CLUSTER_NAMES.CON,
    skillId: "CONSTRUCT-11",
    question: "A rectangle has length \\((x+5)\\) and width \\((x+2)\\). Write an expression for its area, expanded.",
    options: [
      { text: "\\(x^2 + 7x + 10\\)", correct: true, feedback: "(x+5)(x+2)=x²+2x+5x+10 = x²+7x+10." },
      { text: "\\(x^2 + 10\\)", correct: false, feedback: "Don't forget the middle terms: 2x and 5x.", misconceptionId: "E-d5-a" },
      { text: "\\(2x + 7\\)", correct: false, feedback: "That's the sum of length and width, not the area. Area=length×width.", misconceptionId: "E-d5-b" },
      { text: "\\(x^2 + 7x + 7\\)", correct: false, feedback: "5×2=10, not 7.", misconceptionId: "E-d5-c" }
    ],
    backward: "Area = length × width. Expand double brackets.",
    forward: "Deriving area formulas builds connections between geometry and algebra.",
    misconceptions: [
      {
        misconceptionId: "E-d5-a",
        description: "Student multiplies only the First and Last terms of the two brackets (x×x=x² and 5×2=10), skipping the Outer and Inner cross terms entirely.",
        rootCause: "Cross Terms Omitted — forgets to multiply the outer and inner pairs of terms when expanding double brackets.",
        remediation: "Expanding (x+5)(x+2) requires FOUR products: First (x×x=x²), Outer (x×2=2x), Inner (5×x=5x), and Last (5×2=10) — the two middle (cross) terms 2x+5x=7x must be included, not skipped: x²+7x+10, not just x²+10."
      },
      {
        misconceptionId: "E-d5-b",
        description: "Student adds the length and width instead of multiplying them, confusing area with perimeter-related reasoning.",
        rootCause: "Area Formula Confused with Addition — adds the dimensions instead of multiplying them for area.",
        remediation: "Area = length × width (MULTIPLY, not add) — (x+5) and (x+2) must be MULTIPLIED together and expanded: x²+7x+10, not simply added to get 2x+7 (which would relate to perimeter reasoning, not area)."
      },
      {
        misconceptionId: "E-d5-c",
        description: "Student correctly combines the cross terms (7x) but miscalculates the Last term, getting 5×2=7 instead of 10.",
        rootCause: "Computation Error — the final multiplication of the constant terms is mishandled.",
        remediation: "The Last term is 5×2=10 (a basic multiplication fact), not 7 — the full expansion is x²+7x+10, not x²+7x+7."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall that area = length × width", hint: "Area = (x+5) × (x+2)." },
      { level: 2, description: "Expand using FOIL: First, Outer, Inner, Last", hint: "First: x×x=x². Outer: x×2=2x. Inner: 5×x=5x. Last: 5×2=10." },
      { level: 3, description: "Combine the cross terms", hint: "2x + 5x = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.EE.A.2A"] },
  { itemId: "d6", order: 6, cluster: "REA", clusterName: CLUSTER_NAMES.REA,
    skillId: "FORMULAUSE-01",
    question: "Use the formula \\(v = u + at\\). Find \\(v\\) when \\(u=5, a=10, t=3\\).",
    options: [
      { text: "35", correct: true, feedback: "v = 5 + 10×3 = 5 + 30 = 35." },
      { text: "18", correct: false, feedback: "You added all three numbers: 5+10+3=18. The formula is v=u+at, not v=u+a+t.", misconceptionId: "E-d6-a" },
      { text: "50", correct: false, feedback: "You multiplied u×a=50. The formula is u + (a×t), not u×a.", misconceptionId: "E-d6-b" },
      { text: "80", correct: false, feedback: "5+10×3 = 5+30=35. Multiplication before addition.", misconceptionId: "E-d6-c" }
    ],
    backward: "Substitute the known values, then follow order of operations.",
    forward: "Using formulas is a key skill in science and engineering.",
    misconceptions: [
      {
        misconceptionId: "E-d6-a",
        description: "Student adds all three values (u+a+t=5+10+3=18), misreading the formula as if a and t were separately added rather than multiplied together first.",
        rootCause: "Formula Structure Misread — treats 'at' as a separate addend instead of a product (a multiplied by t).",
        remediation: "In the formula v=u+at, 'at' means a MULTIPLIED by t, not a separate term to add — first compute a×t=10×3=30, THEN add u: 5+30=35, not adding all three values directly (5+10+3=18)."
      },
      {
        misconceptionId: "E-d6-b",
        description: "Student multiplies u and a together (u×a=5×10=50), misreading which two quantities are meant to be multiplied in the formula.",
        rootCause: "Wrong Variables Multiplied — multiplies the wrong pair of quantities instead of the ones the formula specifies.",
        remediation: "In v=u+at, it's a AND t that multiply together (at=a×t), not u and a — compute a×t=10×3=30, then add u: 5+30=35, not u×a=5×10=50."
      },
      {
        misconceptionId: "E-d6-c",
        description: "Student correctly identifies the operations but makes an arithmetic error in the final addition, getting 80 instead of the correct 35.",
        rootCause: "Computation Error — the final addition step is mishandled despite correct order of operations.",
        remediation: "10×3=30, then 5+30=35 — recompute carefully: 80 doesn't match this calculation, suggesting a step was miscalculated (perhaps doubling or another slip)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify which quantities multiply together in the formula", hint: "In v=u+at, 'at' means a × t." },
      { level: 2, description: "Compute the product first", hint: "a × t = 10 × 3 = 30." },
      { level: 3, description: "Add u to the product", hint: "5 + 30 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.EE.A.2C"] },
  { itemId: "d7", order: 7, cluster: "EST", clusterName: CLUSTER_NAMES.EST,
    skillId: "ESTROUND-04",
    question: "For \\(y = x^2 - 4x\\), estimate \\(y\\) when \\(x = 3.9\\).",
    options: [
      { text: "0", correct: true, feedback: "Round 3.9 to 4. 16-16=0." },
      { text: "1", correct: false, feedback: "16-16=0, not 1. You may have miscalculated.", misconceptionId: "E-d7-a" },
      { text: "4", correct: false, feedback: "You used x=4 but forgot to square? 4²=16, 4×4=16, 16-16=0.", misconceptionId: "E-d7-b" },
      { text: "\\(-1\\)", correct: false, feedback: "16-16=0, not -1. Check your subtraction.", misconceptionId: "E-d7-c" }
    ],
    backward: "Round the input, then substitute and compute.",
    forward: "Estimation helps verify calculator results quickly.",
    misconceptions: [
      {
        misconceptionId: "E-d7-a",
        description: "Student rounds correctly and sets up the correct values but makes a subtraction error, arriving at 1 instead of the correct 0.",
        rootCause: "Computation Error — the final subtraction step is mishandled despite correct intermediate values.",
        remediation: "4²=16 and 4×4=16 — recompute the subtraction: 16-16=0, not 1 (which suggests an arithmetic slip in the final step)."
      },
      {
        misconceptionId: "E-d7-b",
        description: "Student rounds x to 4 correctly but doesn't complete the full calculation, perhaps forgetting to square x² for the first term (though the feedback notes this happens to still evaluate correctly if traced through) or stopping partway through the process.",
        rootCause: "Calculation Not Completed — stops the multi-step process partway through instead of finishing all required operations.",
        remediation: "Both terms must be fully evaluated: x²=4²=16 and 4x=4×4=16 — then subtract: 16-16=0 — make sure to complete BOTH the squaring and the multiplication steps before subtracting, rather than stopping early."
      },
      {
        misconceptionId: "E-d7-c",
        description: "Student computes the correct component values (16 and 16) but makes a sign error in the final subtraction, landing on -1 instead of 0.",
        rootCause: "Computation Error — a sign is mishandled in the final subtraction despite correct intermediate values.",
        remediation: "16-16=0 exactly (equal values subtract to zero) — recompute carefully: the result cannot be negative here, since both terms are equal (16 and 16)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Round the input value to the nearest whole number", hint: "3.9 rounds to 4." },
      { level: 2, description: "Evaluate each term separately", hint: "x²=4²=16. 4x=4×4=16." },
      { level: 3, description: "Subtract the second term from the first", hint: "16 - 16 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.7.EE.B.3"] },
  { itemId: "d8", order: 8, cluster: "EXT", clusterName: CLUSTER_NAMES.EXT,
    skillId: "EXTDIAG-03",
    question: "A student expanded \\((x+2)(x+3)\\) and got \\(x^2 + 6\\). What went wrong?",
    options: [
      { text: "Forgot the middle terms \\(2x+3x\\)", correct: true, feedback: "The middle terms 2x+3x=5x are missing." },
      { text: "Multiplied the constants wrong", correct: false, feedback: "2×3=6 is correct. The error is the missing middle terms.", misconceptionId: "E-d8-a" },
      { text: "Squared the x incorrectly", correct: false, feedback: "x² is correct.", misconceptionId: "E-d8-b" },
      { text: "The expansion is actually correct", correct: false, feedback: "No, the middle terms are missing.", misconceptionId: "E-d8-c" }
    ],
    backward: "FOIL ensures every term is multiplied.",
    forward: "Error spotting sharpens checking skills for tests.",
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
    question: "If \\(a = -1, b = 2, c = -3\\), evaluate \\(ab^2 - bc^2\\).",
    options: [
      { text: "\\(-22\\)", correct: true, feedback: "(-1)×4 - 2×9 = -4 - 18 = -22." },
      { text: "14", correct: false, feedback: "You added instead of subtracted: -4+18=14. It's minus, not plus.", misconceptionId: "E-d9-a" },
      { text: "22", correct: false, feedback: "You dropped the negative sign: 4+18=22.", misconceptionId: "E-d9-b" },
      { text: "\\(-14\\)", correct: false, feedback: "-4-18=-22, not -14.", misconceptionId: "E-d9-c" }
    ],
    backward: "Square first, then multiply, then subtract.",
    forward: "Multi-variable substitution appears in physics formulas.",
    misconceptions: [
      {
        misconceptionId: "E-d9-a",
        description: "Student adds -4 and 18 (getting 14) instead of subtracting bc² from ab², treating the second term as if it were added rather than subtracted.",
        rootCause: "Subtraction Direction Confused — adds the second term instead of correctly subtracting it as the expression specifies.",
        remediation: "The expression is ab² MINUS bc², so subtract: -4-18=-22, not -4+18=14 — bc² is always subtracted here, never added."
      },
      {
        misconceptionId: "E-d9-b",
        description: "Student drops the negative sign on ab², computing it as +4 instead of -4, and treats the subtraction as addition, landing on 22 instead of -22.",
        rootCause: "Multiple Sign Errors Combined — both drops a negative sign on one term and mishandles the subtraction between terms.",
        remediation: "ab²=a×b²=(-1)×4=-4 (NEGATIVE, since a is negative) — and the expression subtracts bc²=2×9=18: -4-18=-22, not 4+18=22 (which drops the negative on ab² and adds instead of subtracts)."
      },
      {
        misconceptionId: "E-d9-c",
        description: "Student makes a computation error in the final subtraction, arriving at -14 instead of the correct -22.",
        rootCause: "Computation Error — the final subtraction step is mishandled despite correct intermediate values.",
        remediation: "-4-18=-22 (both magnitudes add since both are effectively negative contributions) — recompute carefully: -14 doesn't match -4-18, suggesting an arithmetic slip."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Evaluate each term separately", hint: "ab²=(-1)×2², and bc²=2×(-3)²." },
      { level: 2, description: "Apply the sign rules carefully", hint: "b²=4, so ab²=(-1)×4=-4 (stays negative). c²=(-3)²=+9 (never negative), so bc²=2×9=18." },
      { level: 3, description: "Subtract bc² from ab²", hint: "-4 - 18 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.EE.A.2C"] },
  { itemId: "d10", order: 10, cluster: "INDX", clusterName: CLUSTER_NAMES.INDX,
    skillId: "INDXCOMBO-04",
    question: "Simplify: \\((2x^2)^3 \\div 4x^4\\).",
    options: [
      { text: "\\(2x^2\\)", correct: true, feedback: "(2x²)³=8x⁶; 8x⁶/4x⁴ = 2x²." },
      { text: "\\(2x^3\\)", correct: false, feedback: "x⁶/x⁴=x², not x³. Subtract exponents: 6-4=2.", misconceptionId: "E-d10-a" },
      { text: "\\(8x^2\\)", correct: false, feedback: "Don't forget to divide by 4: 8/4=2.", misconceptionId: "E-d10-b" },
      { text: "\\(2x^{10}\\)", correct: false, feedback: "You multiplied the exponents: 6×4=24? Divide, don't multiply.", misconceptionId: "E-d10-c" }
    ],
    backward: "Apply the power first, then divide coefficients and subtract exponents.",
    forward: "Combining index laws is essential for simplifying complex expressions.",
    misconceptions: [
      {
        misconceptionId: "E-d10-a",
        description: "Student correctly divides the coefficients (8÷4=2) but mishandles the exponent subtraction, getting x³ instead of x².",
        rootCause: "Exponent Subtraction Error — miscalculates the exponent subtraction during division.",
        remediation: "x⁶÷x⁴=x^(6-4)=x², not x^(6-3)=x³ or any other miscalculated subtraction — recompute the exponent subtraction carefully: 6-4=2."
      },
      {
        misconceptionId: "E-d10-b",
        description: "Student correctly reduces the exponent (x⁶÷x⁴=x²) but forgets to also divide the coefficient (8÷4), leaving it as 8 instead of 2.",
        rootCause: "Coefficient Division Omitted — divides the exponent but forgets to also divide the numeric coefficient.",
        remediation: "The coefficients must ALSO be divided: 8÷4=2 (not left as 8) — the full simplification is 2x², not 8x² (which leaves the coefficient undivided)."
      },
      {
        misconceptionId: "E-d10-c",
        description: "Student multiplies the exponents (6×4=24) instead of subtracting them during division.",
        rootCause: "Exponent Rule Confused — applies the MULTIPLY-exponents rule instead of the SUBTRACT-exponents rule for division.",
        remediation: "When DIVIDING same-base powers, SUBTRACT the exponents: x⁶÷x⁴=x^(6-4)=x² — multiplying them (6×4=24) would be an incorrect rule for this operation; the full simplification is 2x², not 2x^24 or similar."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Apply the power-of-a-product rule first", hint: "(2x²)³ = 2³ × (x²)³ = 8x⁶." },
      { level: 2, description: "Divide the numeric coefficients", hint: "8 ÷ 4 = 2." },
      { level: 3, description: "Subtract the exponents for the variable part", hint: "x⁶ ÷ x⁴: 6 - 4 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.EE.A.1"] },
  { itemId: "d11", order: 11, cluster: "EXP", clusterName: CLUSTER_NAMES.EXP,
    skillId: "EXPANDFOIL-02",
    question: "Expand and simplify: \\((2x+1)(x-3)\\).",
    options: [
      { text: "\\(2x^2 - 5x - 3\\)", correct: true, feedback: "2x²-6x+x-3 = 2x²-5x-3." },
      { text: "\\(2x^2 - 7x - 3\\)", correct: false, feedback: "-6x+x=-5x, not -7x.", misconceptionId: "E-d11-a" },
      { text: "\\(2x^2 + 5x - 3\\)", correct: false, feedback: "The x term is negative: -6x+x=-5x.", misconceptionId: "E-d11-b" },
      { text: "\\(2x^2 - 5x + 3\\)", correct: false, feedback: "1×(-3)=-3, not +3.", misconceptionId: "E-d11-c" }
    ],
    backward: "FOIL with a coefficient on the first term.",
    forward: "Expanding with coefficients is essential for quadratic equations.",
    misconceptions: [
      {
        misconceptionId: "E-d11-a",
        description: "Student adds the magnitudes of the cross terms (6x+x=7x) instead of correctly combining them with their signs (-6x+x=-5x).",
        rootCause: "Cross Term Sign Combination Error — adds the magnitudes of the cross terms instead of combining them with their correct signs.",
        remediation: "The cross terms are -6x (Outer, negative) and x (Inner, positive) — they must combine WITH their signs: -6x+x=-5x, not 6x+x=7x (which ignores the negative sign on the Outer term)."
      },
      {
        misconceptionId: "E-d11-b",
        description: "Student drops the negative sign when combining the cross terms, getting +5x instead of -5x.",
        rootCause: "Sign Dropped During Cross Term Combination — loses track of the negative sign on the larger-magnitude cross term.",
        remediation: "The cross terms are -6x and +x, and -6x has the larger magnitude, so the combined result stays NEGATIVE: -6x+x=-5x, not +5x."
      },
      {
        misconceptionId: "E-d11-c",
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
  { itemId: "d12", order: 12, cluster: "ALGF", clusterName: CLUSTER_NAMES.ALGF,
    skillId: "ALGFRAC-02",
    question: "Simplify: \\(\\frac{4x^2 - 2x}{2x}\\).",
    options: [
      { text: "\\(2x - 1\\)", correct: true, feedback: "4x²/2x=2x; -2x/2x=-1." },
      { text: "\\(2x + 1\\)", correct: false, feedback: "-2x/2x=-1, not +1.", misconceptionId: "E-d12-a" },
      { text: "\\(2x^2 - 1\\)", correct: false, feedback: "4x²/2x=2x, not 2x². Subtract exponents.", misconceptionId: "E-d12-b" },
      { text: "\\(4x - 1\\)", correct: false, feedback: "4/2=2, not 4.", misconceptionId: "E-d12-c" }
    ],
    backward: "Divide each term in the numerator by the denominator.",
    forward: "Simplifying algebraic fractions is used in calculus and graphing.",
    misconceptions: [
      {
        misconceptionId: "E-d12-a",
        description: "Student drops the negative sign on the second term, computing -2x/2x as +1 instead of -1.",
        rootCause: "Sign Dropped During Division — loses track of the negative sign on the second term.",
        remediation: "-2x is being divided by 2x, and negative÷positive=NEGATIVE: -2x/2x=-1, not +1 — the full simplification is 2x-1, not 2x+1."
      },
      {
        misconceptionId: "E-d12-b",
        description: "Student correctly reduces the second term (-1) but forgets to reduce the exponent on the first term, keeping x² unchanged instead of x.",
        rootCause: "Exponent Not Reduced During Division — divides the coefficients but leaves the variable's exponent untouched.",
        remediation: "4x²/2x: coefficients divide (4÷2=2) AND exponents subtract (2-1=1, since x means x¹) — the full first term is 2x, not 2x² (which leaves the exponent unreduced)."
      },
      {
        misconceptionId: "E-d12-c",
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
  { itemId: "d13", order: 13, cluster: "CON", clusterName: CLUSTER_NAMES.CON,
    skillId: "CONSTRUCT-12",
    question: "Write an expression for 'the sum of a number \\(n\\) and its square'.",
    options: [
      { text: "\\(n + n^2\\)", correct: true, feedback: "Sum means addition: n plus n²." },
      { text: "\\(n \\times n^2\\)", correct: false, feedback: "That's the product, not the sum.", misconceptionId: "E-d13-a" },
      { text: "\\(2n^2\\)", correct: false, feedback: "That's twice the square — not n + n².", misconceptionId: "E-d13-b" },
      { text: "\\(n^2 - n\\)", correct: false, feedback: "That's the difference, not the sum.", misconceptionId: "E-d13-c" }
    ],
    backward: "Sum means addition.",
    forward: "Constructing expressions is the first step in word problems.",
    misconceptions: [
      {
        misconceptionId: "E-d13-a",
        description: "Student translates 'sum' as multiplication, writing n×n² instead of the correct addition n+n².",
        rootCause: "Operation Keyword Misread — confuses an addition keyword ('sum') with a multiplication expression.",
        remediation: "'Sum' signals ADDITION, not multiplication — 'the sum of n and its square' means n+n², not n×n² (which would be phrased as 'the product of n and its square')."
      },
      {
        misconceptionId: "E-d13-b",
        description: "Student writes 2n², perhaps confusing 'n and its square' with 'twice the square' rather than adding two distinct terms (n and n²).",
        rootCause: "Distinct Terms Merged Incorrectly — treats n and n² as if they were the same term to be doubled, instead of two separate terms to add.",
        remediation: "n and n² are TWO DIFFERENT terms (one is n to the first power, the other is n squared) — they must be added as separate terms: n+n², not merged into 2n² (which incorrectly treats them as the same term)."
      },
      {
        misconceptionId: "E-d13-c",
        description: "Student translates 'sum' as subtraction, writing n²-n instead of the correct addition n+n².",
        rootCause: "Operation Keyword Misread — confuses an addition keyword ('sum') with a subtraction expression.",
        remediation: "'Sum' signals ADDITION, not subtraction — 'the sum of n and its square' means n+n², not n²-n (which would be phrased as 'the difference between the square of n and n')."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the keyword", hint: "'Sum' signals addition." },
      { level: 2, description: "Identify the two quantities being summed", hint: "The number is n; its square is n²." },
      { level: 3, description: "Write the expression", hint: "n + n²." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.EE.A.2A"] },
  { itemId: "d14", order: 14, cluster: "REA", clusterName: CLUSTER_NAMES.REA,
    skillId: "REARRANGE-02",
    question: "Make \\(t\\) the subject of \\(v = u + at\\).",
    options: [
      { text: "\\(t = \\frac{v-u}{a}\\)", correct: true, feedback: "Subtract u: v-u=at. Then divide by a: (v-u)/a=t." },
      { text: "\\(t = \\frac{v}{a} - u\\)", correct: false, feedback: "You divided by a before subtracting u. Subtract u first.", misconceptionId: "E-d14-a" },
      { text: "\\(t = (v-u)a\\)", correct: false, feedback: "You multiplied by a instead of dividing. To undo ×a, you ÷a.", misconceptionId: "E-d14-b" },
      { text: "\\(t = v - u - a\\)", correct: false, feedback: "You subtracted both u and a. Use division for the multiplication.", misconceptionId: "E-d14-c" }
    ],
    backward: "Perform inverse operations in reverse order.",
    forward: "Rearranging formulas is essential in science for solving for any variable.",
    misconceptions: [
      {
        misconceptionId: "E-d14-a",
        description: "Student divides by a before subtracting u, applying the inverse operations in the wrong order.",
        rootCause: "Inverse Operations Applied in Wrong Order — undoes the operations in the wrong sequence relative to how they were originally applied.",
        remediation: "The original formula builds up as: u is added FIRST, THEN at is added — to isolate t, undo in REVERSE: first subtract u from both sides (v-u=at), THEN divide by a: t=(v-u)/a, not t=v/a-u (which divides before subtracting)."
      },
      {
        misconceptionId: "E-d14-b",
        description: "Student multiplies by a instead of dividing, using the wrong inverse operation to undo the multiplication by a.",
        rootCause: "Wrong Inverse Operation Used — multiplies instead of dividing, failing to undo the original multiplication.",
        remediation: "To undo 'at' (a multiplied by t), you must DIVIDE by a (the inverse of multiplication), not multiply again: (v-u)/a=t, not t=(v-u)×a (which uses multiplication again instead of the inverse)."
      },
      {
        misconceptionId: "E-d14-c",
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
  { itemId: "d15", order: 15, cluster: "EST", clusterName: CLUSTER_NAMES.EST,
    skillId: "ESTROUND-05",
    question: "A formula gives \\(P = 2(l+w)\\). If \\(l \\approx 5.1, w \\approx 3.9\\), estimate \\(P\\).",
    options: [
      { text: "18", correct: true, feedback: "5+4=9; 2×9=18." },
      { text: "16", correct: false, feedback: "5.1+3.9=9 exactly, doubled is 18. You may have rounded to 5+3=8.", misconceptionId: "E-d15-a" },
      { text: "20", correct: false, feedback: "You rounded 5.1 to 5 and 3.9 to 5? 2×(5+5)=20.", misconceptionId: "E-d15-b" },
      { text: "14", correct: false, feedback: "You rounded 3.9 to 2 instead of 4.", misconceptionId: "E-d15-c" }
    ],
    backward: "Round each number first, then compute.",
    forward: "Estimation is used to check the reasonableness of answers.",
    misconceptions: [
      {
        misconceptionId: "E-d15-a",
        description: "Student rounds w down to 3 instead of up to 4, using the wrong rounded value and undercounting the sum.",
        rootCause: "Rounding Direction Error — rounds away from the nearest whole number instead of to it.",
        remediation: "3.9 is closer to 4 than to 3 (since .9 rounds up) — round to 4, then 2×(5+4)=18, not using 3 (which gives 2×(5+3)=16, using the wrong rounded value)."
      },
      {
        misconceptionId: "E-d15-b",
        description: "Student rounds 3.9 up to 5 instead of to the nearest whole number, 4, overshooting the correct rounded value.",
        rootCause: "Rounding Direction Error — rounds to a value farther from the input than the true nearest whole number.",
        remediation: "3.9 rounds to the NEAREST whole number, which is 4 (not 5) — round to 4, then 2×(5+4)=18, not using 5 (which gives 2×(5+5)=20, using an overrounded value)."
      },
      {
        misconceptionId: "E-d15-c",
        description: "Student rounds 3.9 down to 2 instead of to the nearest whole number, 4, a substantial rounding error.",
        rootCause: "Rounding to Nearest Whole Number Not Applied — rounds to a value far from the nearest whole number.",
        remediation: "3.9 rounds to 4 (the NEAREST whole number, since .9 is very close to the next whole number) — round to 4, not 2 (which is far from 3.9): 2×(5+4)=18, not 2×(5+2)=14."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Round each input value to the nearest whole number", hint: "l≈5.1 rounds to 5. w≈3.9 rounds to 4." },
      { level: 2, description: "Add the rounded values", hint: "5 + 4 = 9." },
      { level: 3, description: "Multiply by 2", hint: "2 × 9 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.7.EE.B.3"] },
  { itemId: "d16", order: 16, cluster: "EXT", clusterName: CLUSTER_NAMES.EXT,
    skillId: "EXTVERIFY-01",
    question: "A student simplified \\(2x(x+3) - x(x-2)\\) and got \\(x^2 + 8x\\). Is this correct?",
    options: [
      { text: "Yes, it is correct", correct: true, feedback: "2x²+6x-x²+2x = x²+8x." },
      { text: "No, it should be \\(x^2 + 4x\\)", correct: false, feedback: "6x+2x=8x, not 4x.", misconceptionId: "E-d16-a" },
      { text: "No, it should be \\(3x^2 + 8x\\)", correct: false, feedback: "2x²-x²=x², not 3x².", misconceptionId: "E-d16-b" },
      { text: "No, it should be \\(x^2 + 8x + 6\\)", correct: false, feedback: "There is no constant term — the xs cancel the constants.", misconceptionId: "E-d16-c" }
    ],
    backward: "Expand each part, then collect like terms.",
    forward: "Sometimes there is no error — verify carefully.",
    misconceptions: [
      {
        misconceptionId: "E-d16-a",
        description: "Student re-checks the combination of x-terms incorrectly, computing 6x+2x as 4x instead of 8x.",
        rootCause: "Like-Term Combination Error — mishandles the addition when re-verifying the combination of x-terms.",
        remediation: "6x and 2x are both POSITIVE x-terms and must ADD together: 6x+2x=8x, not 4x (which would require an incorrect subtraction or miscount) — the student's original answer of x²+8x is actually correct."
      },
      {
        misconceptionId: "E-d16-b",
        description: "Student re-checks the combination of x² terms incorrectly, computing 2x²-x² as 3x² instead of x².",
        rootCause: "Like-Term Combination Error — adds instead of subtracts when re-verifying the combination of x² terms.",
        remediation: "2x² and -x² combine by SUBTRACTING (2x²-x²=x², since the second term is being subtracted per -x(x-2)), not adding (2x²+x²=3x²) — the student's original answer of x²+8x is actually correct."
      },
      {
        misconceptionId: "E-d16-c",
        description: "Student assumes there must be a constant term in the answer, not recognising that expanding 2x(x+3)-x(x-2) produces no constant terms at all (since neither original expression has a standalone constant).",
        rootCause: "Assumed Constant Term Without Verification — expects a constant term to appear without checking whether the original expression actually produces one.",
        remediation: "Neither 2x(x+3) nor -x(x-2) produces a standalone constant when expanded — 2x(x+3)=2x²+6x (no constant) and -x(x-2)=-x²+2x (no constant) — so the final simplified expression has NO constant term: x²+8x, not x²+8x+6 (which adds a constant that was never there)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Re-expand each part yourself, independently", hint: "2x(x+3)=2x²+6x. -x(x-2)=-x²+2x." },
      { level: 2, description: "Combine the x² terms", hint: "2x² - x² = x²." },
      { level: 3, description: "Combine the x terms", hint: "6x + 2x = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.7.EE.A.1"] },
  { itemId: "d17", order: 17, cluster: "SUB", clusterName: CLUSTER_NAMES.SUB,
    skillId: "SUBEVAL-09",
    question: "If \\(p = -2\\), evaluate \\((p^2 + p)(p - 1)\\).",
    options: [
      { text: "\\(-6\\)", correct: true, feedback: "(4-2)×(-3)=2×(-3)=-6." },
      { text: "6", correct: false, feedback: "Sign error: 2×(-3)=-6, not +6.", misconceptionId: "E-d17-a" },
      { text: "0", correct: false, feedback: "p²+p=4-2=2, not 0.", misconceptionId: "E-d17-b" },
      { text: "\\(-12\\)", correct: false, feedback: "p-1=-3, not -6.", misconceptionId: "E-d17-c" }
    ],
    backward: "Compute inside parentheses first.",
    forward: "Substitution with nested brackets appears in function evaluation.",
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
    skillId: "INDXCOMBO-05",
    question: "Simplify: \\(\\frac{3x^2 \\times 2x^3}{6x^4}\\).",
    options: [
      { text: "\\(x\\)", correct: true, feedback: "3×2=6, x²×x³=x⁵. 6x⁵/6x⁴ = x." },
      { text: "\\(x^2\\)", correct: false, feedback: "x⁵/x⁴=x, not x². Subtract exponents: 5-4=1.", misconceptionId: "E-d18-a" },
      { text: "\\(6x\\)", correct: false, feedback: "6/6=1, not 6. The coefficient cancels.", misconceptionId: "E-d18-b" },
      { text: "1", correct: false, feedback: "x⁵/x⁴=x, not 1. The x doesn't cancel completely.", misconceptionId: "E-d18-c" }
    ],
    backward: "Multiply the numerator first, then divide.",
    forward: "Simplifying complex fractions is a key algebraic skill.",
    misconceptions: [
      {
        misconceptionId: "E-d18-a",
        description: "Student correctly reduces the coefficient (6/6=1) but mishandles the exponent subtraction, getting x² instead of x.",
        rootCause: "Exponent Subtraction Error — miscalculates the exponent subtraction during division.",
        remediation: "x⁵/x⁴=x^(5-4)=x¹=x, not x² — recompute the exponent subtraction carefully: 5-4=1."
      },
      {
        misconceptionId: "E-d18-b",
        description: "Student correctly reduces the exponent (x⁵/x⁴=x) but forgets to also divide the coefficients, leaving the numeric part as 6 instead of 1.",
        rootCause: "Coefficient Division Omitted — divides the exponent but forgets to also divide the numeric coefficients.",
        remediation: "The coefficients must ALSO be divided: numerator coefficient is 3×2=6, denominator is 6, so 6÷6=1 (not left as 6) — the full simplification is x (since the coefficient of 1 is implied), not 6x."
      },
      {
        misconceptionId: "E-d18-c",
        description: "Student correctly reduces the coefficient to 1 but believes the x term also cancels away entirely, giving just 1 instead of x.",
        rootCause: "Variable Assumed to Cancel Completely — incorrectly believes the variable disappears entirely during division instead of reducing its exponent.",
        remediation: "x⁵/x⁴=x^(5-4)=x¹=x (using the exponent rule), the x does NOT disappear entirely since the exponents aren't equal — the full answer is x, not just 1 (which would only be correct if the exponents matched exactly, e.g., x⁴/x⁴)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Multiply the numerator's coefficients and combine its exponents", hint: "3×2=6. x²×x³=x⁵ (add exponents)." },
      { level: 2, description: "Divide the coefficients", hint: "6 ÷ 6 = 1." },
      { level: 3, description: "Subtract the exponents for the variable part", hint: "x⁵ ÷ x⁴: 5 - 4 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.EE.A.1"] },
  { itemId: "d19", order: 19, cluster: "EXP", clusterName: CLUSTER_NAMES.EXP,
    skillId: "EXPANDSQ-01",
    question: "Expand and simplify: \\((x-2)^2\\).",
    options: [
      { text: "\\(x^2 - 4x + 4\\)", correct: true, feedback: "(x-2)(x-2)=x²-4x+4." },
      { text: "\\(x^2 + 4\\)", correct: false, feedback: "Don't forget the middle term: -2x-2x=-4x.", misconceptionId: "E-d19-a" },
      { text: "\\(x^2 - 4x - 4\\)", correct: false, feedback: "(-2)×(-2)=+4, not -4.", misconceptionId: "E-d19-b" },
      { text: "\\(x^2 + 4x + 4\\)", correct: false, feedback: "The middle term should be negative: -2x-2x=-4x.", misconceptionId: "E-d19-c" }
    ],
    backward: "(a-b)² = a² - 2ab + b².",
    forward: "Perfect squares appear in completing the square later.",
    misconceptions: [
      {
        misconceptionId: "E-d19-a",
        description: "Student squares the two terms separately (x²+4) without realising that (x-2)² means (x-2)(x-2), which requires FULL expansion including the middle cross terms.",
        rootCause: "Binomial Squared Treated as Sum of Squares — incorrectly assumes (a-b)²=a²+b², skipping the middle term entirely.",
        remediation: "(x-2)² means (x-2)×(x-2), NOT x²+(-2)² — you must fully expand: x²-2x-2x+4=x²-4x+4 — squaring a binomial is NOT the same as squaring each term separately and adding, which skips the middle cross terms (-2x-2x=-4x)."
      },
      {
        misconceptionId: "E-d19-b",
        description: "Student computes the Last term (-2)×(-2) as -4 instead of +4, mishandling the sign of a negative times a negative.",
        rootCause: "Sign Rule Confused — treats negative×negative as negative instead of positive.",
        remediation: "(-2)×(-2): negative×negative=POSITIVE, so this equals +4, not -4 — the correct expansion is x²-4x+4, not x²-4x-4."
      },
      {
        misconceptionId: "E-d19-c",
        description: "Student drops the negative signs when combining the cross terms, getting +4x instead of -4x.",
        rootCause: "Sign Dropped During Cross Term Combination — loses track of the negative signs on both cross terms.",
        remediation: "Both cross terms are NEGATIVE (x×-2=-2x for Outer, -2×x=-2x for Inner) — combining: -2x+(-2x)=-4x, not +4x (which incorrectly treats both cross terms as positive)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Rewrite the square as a product of two identical brackets", hint: "(x-2)² = (x-2)(x-2)." },
      { level: 2, description: "Expand using FOIL, tracking signs carefully", hint: "First: x². Outer: x×(-2)=-2x. Inner: -2×x=-2x. Last: (-2)×(-2)=+4." },
      { level: 3, description: "Combine the cross terms", hint: "-2x + (-2x) = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.HSA-APR.A.1"] },
  { itemId: "d20", order: 20, cluster: "ALGF", clusterName: CLUSTER_NAMES.ALGF,
    skillId: "ALGFRAC-02",
    question: "Simplify: \\(\\frac{6x^2 + 9x}{3x}\\).",
    options: [
      { text: "\\(2x + 3\\)", correct: true, feedback: "6x²/3x=2x; 9x/3x=3." },
      { text: "\\(2x^2 + 3x\\)", correct: false, feedback: "x²/x=x, not x². Subtract exponents.", misconceptionId: "E-d20-a" },
      { text: "\\(2x + 9\\)", correct: false, feedback: "9x/3x=3, not 9.", misconceptionId: "E-d20-b" },
      { text: "\\(3x + 3\\)", correct: false, feedback: "6/3=2, not 3.", misconceptionId: "E-d20-c" }
    ],
    backward: "Divide each term by the denominator.",
    forward: "This skill is used in simplifying rational expressions.",
    misconceptions: [
      {
        misconceptionId: "E-d20-a",
        description: "Student correctly divides the coefficients (6÷3=2, 9÷3=3) but forgets to reduce the exponent on the first term, keeping x² unchanged and also leaving the second term as 3x instead of 3.",
        rootCause: "Exponent Not Reduced During Division — divides the coefficients but leaves the variables' exponents untouched.",
        remediation: "6x²/3x: coefficients divide (6÷3=2) AND exponents subtract (2-1=1) — giving 2x, not 2x²; similarly 9x/3x should reduce fully to 3, not stay as 3x — the full simplification is 2x+3."
      },
      {
        misconceptionId: "E-d20-b",
        description: "Student correctly simplifies the first term (2x) but doesn't fully divide the second term, leaving it as 9 instead of correctly reducing 9x/3x to 3.",
        rootCause: "Division Not Completed on Second Term — divides only the coefficient of the second term without dividing out the variable x as well.",
        remediation: "9x/3x means BOTH the coefficient AND the x must divide: 9÷3=3 and x/x=1 (cancels), giving 3 — not just 9 (which forgets to account for the x/x cancellation)."
      },
      {
        misconceptionId: "E-d20-c",
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
  { itemId: "d21", order: 21, cluster: "CON", clusterName: CLUSTER_NAMES.CON,
    skillId: "CONSTRUCT-13",
    question: "A rectangle has area \\(x^2 + 7x + 10\\) and length \\(x+5\\). Find its width.",
    options: [
      { text: "\\(x + 2\\)", correct: true, feedback: "(x+5)(x+2)=x²+7x+10, so width=x+2." },
      { text: "\\(x + 5\\)", correct: false, feedback: "That's the length, not the width.", misconceptionId: "E-d21-a" },
      { text: "\\(x + 10\\)", correct: false, feedback: "(x+5)(x+10)=x²+15x+50, not x²+7x+10.", misconceptionId: "E-d21-b" },
      { text: "\\(2x + 7\\)", correct: false, feedback: "That would be the perimeter? Area=length×width.", misconceptionId: "E-d21-c" }
    ],
    backward: "Divide the area by the length, or factorise the quadratic.",
    forward: "Reverse reasoning is used in geometric problems and design.",
    misconceptions: [
      {
        misconceptionId: "E-d21-a",
        description: "Student repeats the given length (x+5) as the answer, not distinguishing between the given length and the width that needs to be found.",
        rootCause: "Given Value Confused with Value to Find — restates a given quantity instead of solving for the requested unknown.",
        remediation: "The question gives the LENGTH (x+5) and asks for the WIDTH — these are different quantities; you must find what, when multiplied by (x+5), gives x²+7x+10: that's (x+2), not (x+5) again."
      },
      {
        misconceptionId: "E-d21-b",
        description: "Student guesses x+10 as the width by pattern-matching the constant term in the area, without verifying that (x+5)(x+10) actually produces the correct area.",
        rootCause: "Answer Not Verified Against the Area — picks a plausible-looking factor without checking that multiplying it by the length gives the correct area.",
        remediation: "Always CHECK by multiplying: (x+5)(x+10)=x²+15x+50, which does NOT match the given area x²+7x+10 — the correct width is x+2, verified by (x+5)(x+2)=x²+7x+10."
      },
      {
        misconceptionId: "E-d21-c",
        description: "Student confuses this problem with a perimeter-related calculation, producing 2x+7 instead of correctly finding the width via the area relationship.",
        rootCause: "Area Relationship Confused with Perimeter — applies perimeter-style reasoning (doubling/summing dimensions) instead of the area = length × width relationship.",
        remediation: "Since Area = length × width, finding the width means figuring out what (x+5) must be multiplied by to get x²+7x+10 — this is NOT a perimeter calculation (which would involve adding and doubling dimensions); the width is x+2, found by (x+5)(x+2)=x²+7x+10."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the area relationship", hint: "Area = length × width, so width = Area ÷ length." },
      { level: 2, description: "Look for a binomial that, when multiplied by (x+5), gives x²+7x+10", hint: "Try factors of 10 that combine with 5 to give 7 when added." },
      { level: 3, description: "Verify your answer by multiplying", hint: "Does (x+5)(x+2) expand to x²+7x+10?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: [] },
  { itemId: "d22", order: 22, cluster: "REA", clusterName: CLUSTER_NAMES.REA,
    skillId: "REARRANGE-03",
    question: "Make \\(r\\) the subject of \\(C = 2\\pi r\\).",
    options: [
      { text: "\\(r = \\frac{C}{2\\pi}\\)", correct: true, feedback: "Divide both sides by 2π." },
      { text: "\\(r = 2\\pi C\\)", correct: false, feedback: "You multiplied instead of dividing.", misconceptionId: "E-d22-a" },
      { text: "\\(r = C - 2\\pi\\)", correct: false, feedback: "You subtracted. Use division to undo multiplication.", misconceptionId: "E-d22-b" },
      { text: "\\(r = \\frac{C}{2}\\)", correct: false, feedback: "Don't forget to divide by π as well.", misconceptionId: "E-d22-c" }
    ],
    backward: "Circumference formula: C=2πr.",
    forward: "Rearranging formulas is essential in geometry and science.",
    misconceptions: [
      {
        misconceptionId: "E-d22-a",
        description: "Student multiplies by 2π instead of dividing, using the wrong inverse operation to undo the multiplication by 2π.",
        rootCause: "Wrong Inverse Operation Used — multiplies instead of dividing, failing to undo the original multiplication.",
        remediation: "To undo '2πr' (2π multiplied by r), you must DIVIDE by 2π (the inverse of multiplication), not multiply again: r=C/(2π), not r=2πC (which uses multiplication again instead of the inverse)."
      },
      {
        misconceptionId: "E-d22-b",
        description: "Student subtracts 2π from C instead of dividing, using the wrong inverse operation entirely.",
        rootCause: "Wrong Inverse Operation Used — subtracts instead of dividing, failing to undo the original multiplication.",
        remediation: "2πr means 2π MULTIPLIED by r — to isolate r, you must DIVIDE both sides by 2π (the inverse of multiplication), not subtract 2π (which would only be correct if 2π were ADDED, not multiplied): r=C/(2π), not r=C-2π."
      },
      {
        misconceptionId: "E-d22-c",
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
  { itemId: "d23", order: 23, cluster: "EST", clusterName: CLUSTER_NAMES.EST,
    skillId: "ESTROOT-04",
    question: "Estimate \\(\\sqrt{4x^2}\\) when \\(x = -5.2\\).",
    options: [
      { text: "10", correct: true, feedback: "4×(-5.2)²≈4×25=100; √100=10." },
      { text: "\\(-10\\)", correct: false, feedback: "The square root symbol gives the principal (non-negative) root.", misconceptionId: "E-d23-a" },
      { text: "5", correct: false, feedback: "√100=10, not 5.", misconceptionId: "E-d23-b" },
      { text: "20", correct: false, feedback: "You doubled the answer: √100=10, not 20.", misconceptionId: "E-d23-c" }
    ],
    backward: "Square first (the negative disappears), multiply by 4, then square root.",
    forward: "Estimation with powers and roots is used in physics.",
    misconceptions: [
      {
        misconceptionId: "E-d23-a",
        description: "Student gives a negative answer, not recognising that the square root symbol always denotes the principal (non-negative) root, even when the original x value was negative.",
        rootCause: "Principal Root Convention Not Applied — believes the square root should carry the sign of the original input, rather than always giving the non-negative result.",
        remediation: "The √ symbol ALWAYS gives the non-negative (principal) root, regardless of the sign of x — since x is squared first (making it positive), and then the square root of a positive number is always positive: √100=10, not -10."
      },
      {
        misconceptionId: "E-d23-b",
        description: "Student miscalculates the final square root, getting 5 instead of the correct 10.",
        rootCause: "Computation Error — the final square root is computed incorrectly.",
        remediation: "√100=10 (since 10×10=100), not 5 (5×5=25, which is not 100) — recompute the square root carefully."
      },
      {
        misconceptionId: "E-d23-c",
        description: "Student doubles the correct square root value, getting 20 instead of the correct 10.",
        rootCause: "Extraneous Doubling — applies an unnecessary doubling step after correctly computing the square root.",
        remediation: "√100=10 is already the final answer — there's no reason to double it; 20 comes from an unnecessary extra step."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Round the input value to the nearest whole number", hint: "-5.2 rounds to -5." },
      { level: 2, description: "Square the rounded value, then multiply by 4", hint: "(-5)²=25 (positive, since squaring removes the negative). 4×25=100." },
      { level: 3, description: "Take the square root, remembering it's always non-negative", hint: "√100 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.NS.A.2"] },
  { itemId: "d24", order: 24, cluster: "EXT", clusterName: CLUSTER_NAMES.EXT,
    skillId: "EXTIDENTITY-01",
    question: "Is it always true that \\((x+2)^2 - (x-2)^2 = 8x\\)?",
    options: [
      { text: "Yes, it simplifies to \\(8x\\)", correct: true, feedback: "(x²+4x+4)-(x²-4x+4)=8x." },
      { text: "No, it should be \\(4x\\)", correct: false, feedback: "Expand carefully: 4x+4x=8x, not 4x.", misconceptionId: "E-d24-a" },
      { text: "No, it should be 0", correct: false, feedback: "The terms don't cancel completely — the x terms add.", misconceptionId: "E-d24-b" },
      { text: "Only when \\(x\\) is positive", correct: false, feedback: "The identity holds for all values of x.", misconceptionId: "E-d24-c" }
    ],
    backward: "Expand both squares, then simplify.",
    forward: "Proof-like identities appear in algebra competitions.",
    misconceptions: [
      {
        misconceptionId: "E-d24-a",
        description: "Student expands both squares but mishandles combining the resulting 4x terms, getting 4x instead of the correct 8x (perhaps by only counting one of the two 4x contributions).",
        rootCause: "Cross Term Combination Error — undercounts the number of 4x terms that result from expanding and subtracting the two squares.",
        remediation: "Expand both squares: (x+2)²=x²+4x+4 and (x-2)²=x²-4x+4 — subtracting: (x²+4x+4)-(x²-4x+4)=x²+4x+4-x²+4x-4=8x (the two 4x terms ADD, since subtracting -4x gives +4x), not just 4x (which only counts one of the two contributions)."
      },
      {
        misconceptionId: "E-d24-b",
        description: "Student assumes the two squared expressions cancel to zero, without correctly expanding and simplifying to see that the 4x terms actually add together.",
        rootCause: "Incorrect Assumption About Cancellation — assumes terms cancel without verifying through actual expansion.",
        remediation: "Expand both squares fully: (x+2)²=x²+4x+4 and (x-2)²=x²-4x+4 — the x² and constant terms (4) DO cancel when subtracted, but the 4x terms do NOT cancel (they combine to 8x, since -(-4x)=+4x) — the result is 8x, not 0."
      },
      {
        misconceptionId: "E-d24-c",
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
    learningObjectives: ["CCSS.MATH.CONTENT.HSA-APR.C.4"] }
];

const recheckItems = [
  { itemId: "r1", order: 1, cluster: "SUB", clusterName: CLUSTER_NAMES.SUB,
    skillId: "SUBEVAL-03",
    question: "If \\(x = -4\\), evaluate \\(3x^2 + 2x - 1\\).",
    options: [
      { text: "39", correct: true, feedback: "3×16 + (-8) - 1 = 48 - 8 - 1 = 39." },
      { text: "\\(-39\\)", correct: false, feedback: "You squared -4 as -16. (-4)²=+16.", misconceptionId: "E-r1-a" },
      { text: "41", correct: false, feedback: "You treated 2x as +8. 2×(-4)=-8.", misconceptionId: "E-r1-b" },
      { text: "47", correct: false, feedback: "48+8-1=55? No, 39 is correct.", misconceptionId: "E-r1-c" }
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
      { text: "\\(x^4\\)", correct: true, feedback: "Subtract exponents: 6-2=4." },
      { text: "\\(x^3\\)", correct: false, feedback: "You subtract exponents, not divide them.", misconceptionId: "E-r2-a" },
      { text: "\\(x^8\\)", correct: false, feedback: "You added the exponents. Subtract when dividing.", misconceptionId: "E-r2-b" },
      { text: "\\(x^{12}\\)", correct: false, feedback: "You multiplied the exponents.", misconceptionId: "E-r2-c" }
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
      { text: "\\(x^2 + 5x + 4\\)", correct: true, feedback: "x²+1x+4x+4 = x²+5x+4." },
      { text: "\\(x^2 + 5x + 5\\)", correct: false, feedback: "4×1=4, not 5.", misconceptionId: "E-r3-a" },
      { text: "\\(x^2 + 4x + 4\\)", correct: false, feedback: "x+4x=5x, not 4x.", misconceptionId: "E-r3-b" },
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
  { itemId: "r4", order: 4, cluster: "ALGF", clusterName: CLUSTER_NAMES.ALGF,
    skillId: "ALGFRAC-02",
    question: "Simplify: \\(\\frac{8x^2 - 4x}{4x}\\).",
    options: [
      { text: "\\(2x - 1\\)", correct: true, feedback: "8x²/4x=2x; -4x/4x=-1." },
      { text: "\\(2x + 1\\)", correct: false, feedback: "-4x/4x=-1, not +1.", misconceptionId: "E-r4-a" },
      { text: "\\(2x^2 - 1\\)", correct: false, feedback: "x²/x=x, not x².", misconceptionId: "E-r4-b" },
      { text: "\\(8x - 1\\)", correct: false, feedback: "8/4=2, not 8.", misconceptionId: "E-r4-c" }
    ],
    misconceptions: [
      {
        misconceptionId: "E-r4-a",
        description: "Student drops the negative sign on the second term, computing -4x/4x as +1 instead of -1.",
        rootCause: "Sign Dropped During Division — loses track of the negative sign on the second term.",
        remediation: "-4x is being divided by 4x, and negative÷positive=NEGATIVE: -4x/4x=-1, not +1 — the full simplification is 2x-1, not 2x+1."
      },
      {
        misconceptionId: "E-r4-b",
        description: "Student correctly reduces the second term (-1) but forgets to reduce the exponent on the first term, keeping x² unchanged instead of x.",
        rootCause: "Exponent Not Reduced During Division — divides the coefficients but leaves the variable's exponent untouched.",
        remediation: "8x²/4x: coefficients divide (8÷4=2) AND exponents subtract (2-1=1, since x means x¹) — the full first term is 2x, not 2x² (which leaves the exponent unreduced)."
      },
      {
        misconceptionId: "E-r4-c",
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
  { itemId: "r5", order: 5, cluster: "CON", clusterName: CLUSTER_NAMES.CON,
    skillId: "CONSTRUCT-10",
    question: "Write an expression for 'the product of a number \\(n\\) and two less than the number'.",
    options: [
      { text: "\\(n(n-2)\\)", correct: true, feedback: "Correct. Two less than n is n-2." },
      { text: "\\(n - 2n\\)", correct: false, feedback: "Product means multiplication, not subtraction.", misconceptionId: "E-r5-a" },
      { text: "\\(2n - n\\)", correct: false, feedback: "That's two times n minus n — a different expression.", misconceptionId: "E-r5-b" },
      { text: "\\(n^2 - 2\\)", correct: false, feedback: "That's the square of n minus 2 — not the product.", misconceptionId: "E-r5-c" }
    ],
    misconceptions: [
      {
        misconceptionId: "E-r5-a",
        description: "Student translates 'product' as subtraction, writing n-2n instead of the correct multiplication n(n-2).",
        rootCause: "Operation Keyword Misread — confuses a multiplication keyword ('product') with a subtraction expression.",
        remediation: "'Product' signals MULTIPLICATION, not subtraction — 'the product of n and (n-2)' means n×(n-2)=n(n-2), not n-2n (which uses subtraction instead)."
      },
      {
        misconceptionId: "E-r5-b",
        description: "Student writes 2n-n, misreading the second factor entirely as 'two times n' rather than 'two less than n'.",
        rootCause: "Second Factor Misidentified — doesn't correctly translate 'two less than the number' as (n-2) before forming the product.",
        remediation: "'Two less than the number' means n-2 (n minus 2, not 2×n) — the product is n×(n-2)=n(n-2), not 2n-n (which incorrectly reinterprets the second factor as '2n' rather than 'n-2')."
      },
      {
        misconceptionId: "E-r5-c",
        description: "Student writes n²-2, treating 'the number' as squared and 2 as simply subtracted at the end, rather than correctly forming the product n×(n-2).",
        rootCause: "Product Misread as Square Minus Constant — confuses 'product of n and (n-2)' with squaring n and subtracting 2.",
        remediation: "The PRODUCT of n and (n-2) means MULTIPLYING them together: n×(n-2)=n(n-2) — this is not the same as n² - 2, which would come from squaring n and separately subtracting 2."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Translate 'two less than the number'", hint: "This part is n-2." },
      { level: 2, description: "Recall what 'product' means", hint: "Product means multiplication." },
      { level: 3, description: "Combine the two factors by multiplying", hint: "n × (n-2) = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.EE.A.2A"] },
  { itemId: "r6", order: 6, cluster: "REA", clusterName: CLUSTER_NAMES.REA,
    skillId: "REARRANGE-01",
    question: "Make \\(x\\) the subject of \\(y = 4x - 3\\).",
    options: [
      { text: "\\(x = \\frac{y+3}{4}\\)", correct: true, feedback: "Add 3, then divide by 4." },
      { text: "\\(x = \\frac{y}{4} + 3\\)", correct: false, feedback: "Add 3 first, then divide the whole thing by 4.", misconceptionId: "E-r6-a" },
      { text: "\\(x = 4y + 3\\)", correct: false, feedback: "Use inverse operations.", misconceptionId: "E-r6-b" },
      { text: "\\(x = \\frac{y-3}{4}\\)", correct: false, feedback: "Add 3 to both sides, not subtract.", misconceptionId: "E-r6-c" }
    ],
    misconceptions: [
      {
        misconceptionId: "E-r6-a",
        description: "Student divides by 4 before adding 3, applying the inverse operations in the wrong order.",
        rootCause: "Inverse Operations Applied in Wrong Order — undoes the operations in the same order they were originally applied instead of reverse order.",
        remediation: "Inverse operations must be undone in REVERSE order — since the original was '×4 then -3', undo by first adding 3 (undoing the -3), THEN dividing by 4 (undoing the ×4): x=(y+3)/4, not x=y/4+3 (which divides first)."
      },
      {
        misconceptionId: "E-r6-b",
        description: "Student uses the wrong inverse operations entirely, multiplying by 4 instead of dividing, producing x=4y+3, which doesn't correctly undo either original operation.",
        rootCause: "Wrong Inverse Operations Used — uses operations that don't correctly undo the original operations.",
        remediation: "To undo '×4', you must DIVIDE by 4 (not multiply) — and to undo '-3', you must ADD 3 (not just append it) — correctly: x=(y+3)/4, not x=4y+3 (which uses multiplication and addition, the same operations as the original, instead of their inverses)."
      },
      {
        misconceptionId: "E-r6-c",
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
  { itemId: "r7", order: 7, cluster: "EST", clusterName: CLUSTER_NAMES.EST,
    skillId: "ESTROUND-04",
    question: "Estimate \\((1.9)^2 + 2(1.9) - 3\\).",
    options: [
      { text: "5", correct: true, feedback: "Round 1.9 to 2. 4+4-3=5." },
      { text: "6", correct: false, feedback: "4+4-3=5, not 6.", misconceptionId: "E-r7-a" },
      { text: "4", correct: false, feedback: "You forgot the 2(1.9) term.", misconceptionId: "E-r7-b" },
      { text: "3", correct: false, feedback: "You rounded 1.9 to 1? 1+2-3=0.", misconceptionId: "E-r7-c" }
    ],
    misconceptions: [
      {
        misconceptionId: "E-r7-a",
        description: "Student computes the correct component values but combines them incorrectly, arriving at 6 instead of the correct 5.",
        rootCause: "Computation Error — the final combination step is mishandled despite correct intermediate values.",
        remediation: "Recompute carefully: 2²=4, 2×2=4 — then 4+4-3=5, not 6 (which suggests an arithmetic slip in the final steps)."
      },
      {
        misconceptionId: "E-r7-b",
        description: "Student computes only the squared term (2²=4) and the constant (-3), forgetting to include the middle term 2(1.9)≈2×2=4 entirely.",
        rootCause: "Term Omitted — drops an entire term from the expression during evaluation.",
        remediation: "The expression has THREE terms: (1.9)², 2(1.9), AND -3 — all three must be evaluated: 4+4-3=5, not just 4-3=1 or similar (which skips the middle term)."
      },
      {
        misconceptionId: "E-r7-c",
        description: "Student rounds 1.9 down to 1 instead of up to 2, rounding in the wrong direction.",
        rootCause: "Rounding Direction Error — rounds away from the nearest whole number instead of to it.",
        remediation: "1.9 is closer to 2 than to 1 (since .9 rounds up) — round to 2, then 2²+2×2-3=4+4-3=5, not using 1 (which gives 1+2-3=0, far from the correct estimate)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Round the input value to the nearest whole number", hint: "1.9 rounds to 2." },
      { level: 2, description: "Evaluate each term separately", hint: "2²=4. 2×2=4. The constant is -3." },
      { level: 3, description: "Combine all three terms", hint: "4 + 4 - 3 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.7.EE.B.3"] },
  { itemId: "r8", order: 8, cluster: "EXT", clusterName: CLUSTER_NAMES.EXT,
    skillId: "EXTVERIFY-01",
    question: "\\((x+3)^2 - (x+3)(x-3) = 6x+18\\). Is this correct?",
    options: [
      { text: "Yes", correct: true, feedback: "(x²+6x+9)-(x²-9)=6x+18." },
      { text: "No, it should be \\(6x\\)", correct: false, feedback: "9-(-9)=18, so the constant is 18.", misconceptionId: "E-r8-a" },
      { text: "No, it should be \\(12x\\)", correct: false, feedback: "6x is correct for the x term.", misconceptionId: "E-r8-b" },
      { text: "No, it should be 0", correct: false, feedback: "The terms don't cancel completely.", misconceptionId: "E-r8-c" }
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
    question: "If \\(a = -2, b = 3\\), evaluate \\(a^2b + ab^2\\).",
    options: [
      { text: "\\(-6\\)", correct: true, feedback: "4×3 + (-2)×9 = 12 - 18 = -6." },
      { text: "6", correct: false, feedback: "12-18=-6, not +6.", misconceptionId: "E-r9-a" },
      { text: "30", correct: false, feedback: "You treated ab² as +18. (-2)×9=-18.", misconceptionId: "E-r9-b" },
      { text: "\\(-30\\)", correct: false, feedback: "You treated a²b as -12. (-2)²=+4.", misconceptionId: "E-r9-c" }
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
  { itemId: "r10", order: 10, cluster: "EXP", clusterName: CLUSTER_NAMES.EXP,
    skillId: "EXPANDFOIL-02",
    question: "Expand and simplify: \\((3x-2)(x+1)\\).",
    options: [
      { text: "\\(3x^2 + x - 2\\)", correct: true, feedback: "3x²+3x-2x-2 = 3x²+x-2." },
      { text: "\\(3x^2 - x - 2\\)", correct: false, feedback: "3x-2x=+x, not -x.", misconceptionId: "E-r10-a" },
      { text: "\\(3x^2 + 5x - 2\\)", correct: false, feedback: "-2x+3x=x, not 5x.", misconceptionId: "E-r10-b" },
      { text: "\\(3x^2 + x + 2\\)", correct: false, feedback: "-2×1=-2, not +2.", misconceptionId: "E-r10-c" }
    ],
    misconceptions: [
      {
        misconceptionId: "E-r10-a",
        description: "Student mishandles the sign when combining the cross terms, treating 3x-2x as -x instead of +x.",
        rootCause: "Cross Term Sign Combination Error — mishandles the signs when combining the Outer and Inner products.",
        remediation: "The cross terms are Outer: 3x×1=3x and Inner: -2×x=-2x — combining: 3x+(-2x)=3x-2x=+x (positive, since 3x is larger in magnitude), not -x (which would result from an incorrect sign treatment)."
      },
      {
        misconceptionId: "E-r10-b",
        description: "Student adds the magnitudes of the cross terms (2x+3x=5x) instead of correctly combining them with their signs (3x-2x=x).",
        rootCause: "Cross Term Sign Combination Error — adds the magnitudes of the cross terms instead of combining them with their correct signs.",
        remediation: "The cross terms are 3x (Outer, positive) and -2x (Inner, negative) — they must combine WITH their signs: 3x+(-2x)=x, not 3x+2x=5x (which ignores the negative sign on the Inner term)."
      },
      {
        misconceptionId: "E-r10-c",
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
  { itemId: "r11", order: 11, cluster: "ALGF", clusterName: CLUSTER_NAMES.ALGF,
    skillId: "ALGFRAC-02",
    question: "Simplify: \\(\\frac{3x^2 - 9x}{3x}\\).",
    options: [
      { text: "\\(x - 3\\)", correct: true, feedback: "3x²/3x=x; -9x/3x=-3." },
      { text: "\\(x + 3\\)", correct: false, feedback: "-9x/3x=-3, not +3.", misconceptionId: "E-r11-a" },
      { text: "\\(x^2 - 3\\)", correct: false, feedback: "3x²/3x=x, not x².", misconceptionId: "E-r11-b" },
      { text: "\\(3x - 3\\)", correct: false, feedback: "3/3=1, not 3.", misconceptionId: "E-r11-c" }
    ],
    misconceptions: [
      {
        misconceptionId: "E-r11-a",
        description: "Student drops the negative sign on the second term, computing -9x/3x as +3 instead of -3.",
        rootCause: "Sign Dropped During Division — loses track of the negative sign on the second term.",
        remediation: "-9x is being divided by 3x, and negative÷positive=NEGATIVE: -9x/3x=-3, not +3 — the full simplification is x-3, not x+3."
      },
      {
        misconceptionId: "E-r11-b",
        description: "Student correctly reduces the second term (-3) but forgets to reduce the exponent on the first term, keeping x² unchanged instead of x.",
        rootCause: "Exponent Not Reduced During Division — divides the coefficients but leaves the variable's exponent untouched.",
        remediation: "3x²/3x: coefficients divide (3÷3=1) AND exponents subtract (2-1=1, since x means x¹) — the full first term is x, not x² (which leaves the exponent unreduced)."
      },
      {
        misconceptionId: "E-r11-c",
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
    learningObjectives: ["CCSS.MATH.CONTENT.HSA-APR.D.6"] },
  { itemId: "r12", order: 12, cluster: "REA", clusterName: CLUSTER_NAMES.REA,
    skillId: "REARRANGE-04",
    question: "Make \\(h\\) the subject of \\(A = \\frac{1}{2}bh\\).",
    options: [
      { text: "\\(h = \\frac{2A}{b}\\)", correct: true, feedback: "Multiply both sides by 2: 2A=bh. Then divide by b." },
      { text: "\\(h = \\frac{A}{2b}\\)", correct: false, feedback: "Multiply by 2, not divide by 2.", misconceptionId: "E-r12-a" },
      { text: "\\(h = \\frac{b}{2A}\\)", correct: false, feedback: "Invert the formula. Multiply both sides by 2, then divide by b.", misconceptionId: "E-r12-b" },
      { text: "\\(h = 2Ab\\)", correct: false, feedback: "You multiplied instead of dividing at the end.", misconceptionId: "E-r12-c" }
    ],
    misconceptions: [
      {
        misconceptionId: "E-r12-a",
        description: "Student divides by 2 instead of multiplying by 2 to clear the fractional coefficient ½, using the wrong operation to undo it.",
        rootCause: "Wrong Inverse Operation Used for Fractional Coefficient — divides by 2 instead of multiplying, failing to correctly clear the ½ coefficient.",
        remediation: "To undo multiplying by ½ (a fraction), you must MULTIPLY by its reciprocal, 2 (not divide by 2) — 2A=bh, then divide by b: h=2A/b, not h=A/(2b) (which divides by 2 instead of multiplying)."
      },
      {
        misconceptionId: "E-r12-b",
        description: "Student inverts the entire formula, swapping the positions of the variables incorrectly, producing an expression that doesn't correctly isolate h.",
        rootCause: "Formula Inverted Incorrectly — flips the relationship between variables instead of correctly isolating h using inverse operations.",
        remediation: "To isolate h, first multiply both sides by 2 (2A=bh), THEN divide by b: h=2A/b — not h=b/(2A), which incorrectly inverts the relationship between the variables rather than correctly isolating h."
      },
      {
        misconceptionId: "E-r12-c",
        description: "Student multiplies by b instead of dividing by b in the final step, using the wrong inverse operation.",
        rootCause: "Wrong Inverse Operation Used — multiplies instead of dividing, failing to undo the original multiplication by b.",
        remediation: "After clearing the fraction (2A=bh), b is MULTIPLIED by h — to isolate h, you must DIVIDE by b (the inverse of multiplication), not multiply again: h=2A/b, not h=2Ab (which uses multiplication again instead of the inverse)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Clear the fractional coefficient by multiplying both sides by 2", hint: "A = ½bh becomes 2A = bh." },
      { level: 2, description: "Identify what's left multiplying h", hint: "b is multiplied by h." },
      { level: 3, description: "Divide both sides by b to isolate h", hint: "2A = bh, so h = 2A ÷ b." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.HSA-CED.A.4"] }
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

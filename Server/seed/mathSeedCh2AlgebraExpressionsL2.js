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
        description: "Student substitutes x=+3 instead of x=-3 into the linear term, dropping the negative sign.",
        rootCause: "Negative Substitution Sign Dropped — loses track of the negative sign when substituting x into the linear term.",
        remediation: "x=-3, so the middle term is +x=-3 (NEGATIVE), not +3 — the full evaluation is 18+(-3)-5=10, not 18+3-5=16 (which drops the negative sign on x)."
      },
      {
        misconceptionId: "E-w1-b",
        description: "Student computes x² (with x=-3) as -9 instead of +9, treating the square of a negative number as negative.",
        rootCause: "Squaring Negative Numbers Misunderstood — believes squaring a negative gives a negative result.",
        remediation: "x²=(-3)²=(-3)×(-3)=+9 (negative×negative=positive) — a square is NEVER negative; the full evaluation is 2×9+(-3)-5=10, not 2×(-9)+(-3)-5=-26."
      },
      {
        misconceptionId: "E-w1-c",
        description: "Student makes a sign error somewhere in combining the three terms, landing on a negative overall result instead of the correct positive 10.",
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
    skillId: "INDXCOMBO-02",
    question: "Simplify: \\(x^3 \\times x^4 \\div x^2\\).",
    options: [
      { text: "\\(x^5\\)", correct: true, feedback: "First multiply: x³×x⁴=x⁷. Then divide: x⁷/x²=x⁵." },
      { text: "\\(x^7\\)", correct: false, feedback: "You multiplied but forgot to divide by x².", misconceptionId: "E-w2-a" },
      { text: "\\(x^9\\)", correct: false, feedback: "You added all the exponents: 3+4+2=9. Add for multiplication, subtract for division.", misconceptionId: "E-w2-b" },
      { text: "\\(x^2\\)", correct: false, feedback: "You subtracted 4-2=2 and ignored the x³. Work left to right.", misconceptionId: "E-w2-c" }
    ],
    retryHint: "Multiply first: x³×x⁴ = x⁷. Then divide: x⁷/x² = x⁵.",
    misconceptions: [
      {
        misconceptionId: "E-w2-a",
        description: "Student correctly multiplies x³×x⁴=x⁷ but stops there, forgetting to also divide by x² as the expression requires.",
        rootCause: "Final Step Omitted — stops after the first operation, forgetting the second operation still needs to be applied.",
        remediation: "The expression has TWO operations: multiply, THEN divide — after x³×x⁴=x⁷, you still need to divide by x²: x⁷÷x²=x^(7-2)=x⁵, not stopping at just x⁷."
      },
      {
        misconceptionId: "E-w2-b",
        description: "Student adds all three exponents together (3+4+2=9) regardless of whether the operation is multiplication or division.",
        rootCause: "Exponent Rule Applied Uniformly Regardless of Operation — adds every exponent without distinguishing between multiplication (add) and division (subtract).",
        remediation: "ADD exponents only for MULTIPLICATION and SUBTRACT for DIVISION — this expression is x³×x⁴÷x², so add for the × (3+4=7) and then subtract for the ÷ (7-2=5), not add all three (3+4+2=9)."
      },
      {
        misconceptionId: "E-w2-c",
        description: "Student only processes the last two terms (x⁴÷x²=x²), ignoring the leading x³ factor entirely instead of working through the expression from left to right.",
        rootCause: "Leading Term Ignored — processes only part of a multi-term expression, dropping an earlier factor.",
        remediation: "Work through the WHOLE expression in order: first x³×x⁴=x⁷ (using all three terms, starting from the left), THEN x⁷÷x²=x⁵ — you can't skip the x³ and only combine x⁴ and x²."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Work through the expression from left to right", hint: "First handle x³×x⁴, then divide the result by x²." },
      { level: 2, description: "Apply the multiplication rule first", hint: "x³×x⁴: add exponents, 3+4=7, giving x⁷." },
      { level: 3, description: "Apply the division rule to the result", hint: "x⁷÷x²: subtract exponents, 7-2=?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.EE.A.1"] },
  { itemId: "w3", order: 3, cluster: "EXP", clusterName: CLUSTER_NAMES.EXP,
    skillId: "EXPAND-06",
    question: "Expand: \\(2x(3x - 4)\\).",
    options: [
      { text: "\\(6x^2 - 8x\\)", correct: true, feedback: "2x×3x=6x²; 2x×(-4)=-8x." },
      { text: "\\(6x^2 - 4\\)", correct: false, feedback: "You didn't multiply the -4 by x. 2x×(-4)=-8x, not -4.", misconceptionId: "E-w3-a" },
      { text: "\\(5x^2 - 8x\\)", correct: false, feedback: "You added the coefficients: 2+3=5. Multiply, don't add.", misconceptionId: "E-w3-b" },
      { text: "\\(6x - 8\\)", correct: false, feedback: "x×x=x², not x. You lost one power of x.", misconceptionId: "E-w3-c" }
    ],
    retryHint: "Multiply the outside term by each inside term: 2x×3x and 2x×(-4).",
    misconceptions: [
      {
        misconceptionId: "E-w3-a",
        description: "Student multiplies 2x by -4 but drops the x factor from the multiplier, treating it as if only the coefficient 2 (not the full 2x) multiplied the -4.",
        rootCause: "Variable Factor Dropped in Distribution — loses the variable part of the multiplier when distributing to the constant term.",
        remediation: "2x must multiply the -4 in FULL (both the 2 and the x): 2x×(-4)=-8x, not just 2×(-4)=-8 (dropping the x) — the full expansion is 6x²-8x, not 6x²-4."
      },
      {
        misconceptionId: "E-w3-b",
        description: "Student adds the coefficients (2+3=5) instead of multiplying them when distributing 2x across 3x.",
        rootCause: "Multiplication Notation Misread as Addition — treats the coefficients as if they should be added rather than multiplied.",
        remediation: "2x(3x-4) means 2x MULTIPLIED by each term — 2x×3x means multiply the coefficients (2×3=6) AND add the exponents of x (1+1=2), giving 6x², not adding the coefficients (2+3=5) to get 5x²."
      },
      {
        misconceptionId: "E-w3-c",
        description: "Student multiplies the coefficients correctly but doesn't track that x×x=x², losing a power of x in the first term, and similarly drops the x from the second term.",
        rootCause: "Variable Power Not Tracked During Multiplication — forgets that multiplying x by x produces x², not just x.",
        remediation: "When multiplying x by x, the powers ADD: x¹×x¹=x², not x — the correct first term is 2×3×x²=6x², and the second term keeps its single x: 2x×(-4)=-8x, giving 6x²-8x, not 6x-8."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify what's being multiplied", hint: "2x must multiply EVERY term inside the bracket, in full." },
      { level: 2, description: "Multiply the first term, tracking coefficients and powers separately", hint: "2x × 3x: multiply coefficients (2×3) and add exponents of x (1+1)." },
      { level: 3, description: "Multiply the second term", hint: "2x × (-4) = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.7.EE.A.1"] },
  { itemId: "w4", order: 4, cluster: "FAC", clusterName: CLUSTER_NAMES.FAC,
    skillId: "FACTOR-04",
    question: "Factorise: \\(8x^2y - 12xy^2\\).",
    options: [
      { text: "\\(4xy(2x - 3y)\\)", correct: true, feedback: "HCF of 8 and 12 is 4; lowest power of x is x; lowest power of y is y." },
      { text: "\\(2xy(4x - 6y)\\)", correct: false, feedback: "Not fully factorised. The HCF of 8 and 12 is 4, not 2.", misconceptionId: "E-w4-a" },
      { text: "\\(4x(2xy - 3y^2)\\)", correct: false, feedback: "The common factor y is missing. Both terms contain y, so y must be in the HCF.", misconceptionId: "E-w4-b" },
      { text: "\\(4y(2x^2 - 3xy)\\)", correct: false, feedback: "The common factor x is missing. Both terms contain x, so x must be in the HCF.", misconceptionId: "E-w4-c" }
    ],
    retryHint: "Find the HCF of the numbers (8 and 12 → 4) and the lowest power of each variable.",
    misconceptions: [
      {
        misconceptionId: "E-w4-a",
        description: "Student factors out 2, a common numeric factor, but doesn't check that a LARGER common factor (4) also exists.",
        rootCause: "Not the Highest Common Factor — factors out A common factor but not the HIGHEST one.",
        remediation: "2 IS a common factor of 8 and 12, but it's not the HIGHEST — 4 is also common (8÷4=2, 12÷4=3) and larger than 2, so the fully factorised form is 4xy(2x-3y), not the incompletely factorised 2xy(4x-6y)."
      },
      {
        misconceptionId: "E-w4-b",
        description: "Student factors out the numeric HCF and the common x, but omits the common variable y from the factored-out term, leaving y in only one term inside the bracket.",
        rootCause: "One Common Variable Factor Missed — extracts some but not all of the shared variable factors.",
        remediation: "Both terms contain a factor of y (8x²y has y, 12xy² has y) — y must be part of the factored-out term: 4xy(2x-3y), not 4x(2xy-3y²) which leaves y unfactored in the first inside term."
      },
      {
        misconceptionId: "E-w4-c",
        description: "Student factors out the numeric HCF and the common y, but omits the common variable x from the factored-out term, leaving x in only one term inside the bracket unevenly.",
        rootCause: "One Common Variable Factor Missed — extracts some but not all of the shared variable factors.",
        remediation: "Both terms contain a factor of x (8x²y has x, 12xy² has x) — x must be part of the factored-out term: 4xy(2x-3y), not 4y(2x²-3xy) which leaves x unfactored in the second inside term."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the numeric HCF of 8 and 12", hint: "The HCF of 8 and 12 is 4." },
      { level: 2, description: "Find the lowest power of each variable present in both terms", hint: "Both terms have at least x¹ and at least y¹." },
      { level: 3, description: "Divide each term by the full common factor 4xy", hint: "8x²y÷4xy=2x. 12xy²÷4xy=3y." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.7.EE.A.1"] },
  { itemId: "w5", order: 5, cluster: "CON", clusterName: CLUSTER_NAMES.CON,
    skillId: "CONSTRUCT-07",
    question: "Write an expression for 'three times the difference between a number \\(n\\) and 5'.",
    options: [
      { text: "\\(3(n - 5)\\)", correct: true, feedback: "'The difference between n and 5' is n-5. Three times that is 3(n-5)." },
      { text: "\\(3n - 5\\)", correct: false, feedback: "That's three times n, then subtract 5 — not three times the difference.", misconceptionId: "E-w5-a" },
      { text: "\\(3(5 - n)\\)", correct: false, feedback: "That's three times (5 minus n), the difference the other way around.", misconceptionId: "E-w5-b" },
      { text: "\\(n - 15\\)", correct: false, feedback: "You multiplied only the 5 by 3. The 3 multiplies the whole difference.", misconceptionId: "E-w5-c" }
    ],
    retryHint: "First write the difference (n-5), then multiply by 3.",
    misconceptions: [
      {
        misconceptionId: "E-w5-a",
        description: "Student applies 'three times' only to n and not to the entire difference (n-5), writing 3n-5 instead of doubling... tripling the whole difference.",
        rootCause: "Scope of Multiplication Misread — applies the multiplier to only part of the phrase instead of the entire quantity it should scale.",
        remediation: "'Three times THE DIFFERENCE between n and 5' means the ENTIRE difference (n-5) is multiplied by 3, not just the n — find the difference first, then multiply: 3(n-5), not 3n-5 (which only multiplies n)."
      },
      {
        misconceptionId: "E-w5-b",
        description: "Student reverses the order inside the difference, writing 5-n instead of n-5, before multiplying by 3.",
        rootCause: "Difference Order Reversed — computes the difference in the wrong order (constant minus variable instead of variable minus constant).",
        remediation: "'The difference between n and 5' means n-5 (n comes first, matching the order it's named in the phrase) — 3(n-5), not 3(5-n) which reverses the order and gives a different expression."
      },
      {
        misconceptionId: "E-w5-c",
        description: "Student multiplies only the 5 by 3 (getting 15) and subtracts that from n, instead of multiplying the entire difference (n-5) by 3.",
        rootCause: "Scope of Multiplication Misread — applies the multiplier to only one part of the difference instead of the entire bracketed quantity.",
        remediation: "The 3 must multiply the WHOLE difference (n-5), not just the 5 — find n-5 first, then multiply by 3: 3(n-5), not n-15 (which only multiplies the 5 by 3 and leaves n unmultiplied)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Translate 'the difference between n and 5'", hint: "This part is n-5 (n first, since it's named first)." },
      { level: 2, description: "Recognise that 'three times' applies to the whole difference", hint: "'Three times' means the entire quantity (n-5) is multiplied by 3." },
      { level: 3, description: "Combine into an expression", hint: "3(n - 5)." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.EE.A.2A"] },
  { itemId: "w6", order: 6, cluster: "DIS", clusterName: CLUSTER_NAMES.DIS,
    skillId: "DISTINGUISH-03",
    question: "Which of these is an equation?",
    options: [
      { text: "\\(3x + 1 = 7\\)", correct: true, feedback: "An equation has an equals sign and one unknown to solve for." },
      { text: "\\(3x + 1\\)", correct: false, feedback: "That's an expression — no equals sign.", misconceptionId: "E-w6-a" },
      { text: "\\(y = 3x + 1\\)", correct: false, feedback: "That's a formula — it shows a relationship between variables.", misconceptionId: "E-w6-b" },
      { text: "\\(3x\\)", correct: false, feedback: "That's a single term — part of an expression.", misconceptionId: "E-w6-c" }
    ],
    retryHint: "An equation has an equals sign and one variable to solve for.",
    misconceptions: [
      {
        misconceptionId: "E-w6-a",
        description: "Student picks the expression (3x+1), not recognising that it has no equals sign at all, which rules it out as an equation.",
        rootCause: "Expression/Equation Distinction Not Applied — doesn't check for the defining feature (equals sign) that separates the two.",
        remediation: "An EQUATION has an equals sign — 3x+1 has NO equals sign, making it an EXPRESSION, not an equation; 3x+1=7 (with an equals sign) is the equation."
      },
      {
        misconceptionId: "E-w6-b",
        description: "Student picks the formula (y=3x+1), not recognising that it relates two variables (x and y) rather than having a single unknown to solve for.",
        rootCause: "Equation/Formula Distinction Not Applied — doesn't check whether multiple variables are related versus a single unknown being solved.",
        remediation: "A FORMULA (like y=3x+1) relates TWO variables (x and y) — an EQUATION has just ONE unknown to solve for: 3x+1=7 has only x, making it the equation, not y=3x+1."
      },
      {
        misconceptionId: "E-w6-c",
        description: "Student picks the single term (3x), not recognising it's just a fragment, not a complete statement with an equals sign.",
        rootCause: "Incomplete Statement Not Recognised — treats a single term as if it were a complete equation.",
        remediation: "3x is just ONE TERM, not a complete statement — it has no equals sign and is only part of a larger expression or equation; 3x+1=7 is the complete equation."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the defining feature of an equation", hint: "An equation has an equals sign and exactly one unknown." },
      { level: 2, description: "Check each option for an equals sign and a single unknown", hint: "Which option has '=' and only the variable x (no other letters)?" },
      { level: 3, description: "Confirm your choice", hint: "Does 3x+1=7 have an equals sign and just one unknown?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: [] },
  { itemId: "w7", order: 7, cluster: "EST", clusterName: CLUSTER_NAMES.EST,
    skillId: "ESTROUND-04",
    question: "Estimate \\(3x^2\\) when \\(x = 9.9\\).",
    options: [
      { text: "300", correct: true, feedback: "Round 9.9 to 10. 10²=100. 3×100=300." },
      { text: "297", correct: false, feedback: "That's the exact value. The question asked for an estimate — round first.", misconceptionId: "E-w7-a" },
      { text: "270", correct: false, feedback: "You rounded 9.9 to 9 instead of 10. 9²=81, 3×81=243, not 270.", misconceptionId: "E-w7-b" },
      { text: "30", correct: false, feedback: "You forgot to square x. 3×10=30.", misconceptionId: "E-w7-c" }
    ],
    retryHint: "Round 9.9 to 10; 10²=100; 3×100=300.",
    misconceptions: [
      {
        misconceptionId: "E-w7-a",
        description: "Student computes the exact value (3×9.9²=297) instead of rounding x first, missing the point of estimation entirely.",
        rootCause: "Rounding Step Skipped — computes the exact value instead of first rounding the input as an estimation problem requires.",
        remediation: "The question asks for an ESTIMATE, which means round the input FIRST, then compute: 9.9 rounds to 10, so 3×10²=300 — computing the exact value (3×9.9²=297) skips the required rounding step."
      },
      {
        misconceptionId: "E-w7-b",
        description: "Student rounds 9.9 down to 9 instead of up to 10, rounding in the wrong direction.",
        rootCause: "Rounding Direction Error — rounds away from the nearest whole number instead of to it.",
        remediation: "9.9 is closer to 10 than to 9 (since .9 rounds up) — round to 10, then 3×10²=300, not 3×9²=243 (which uses the wrong rounded value, 9)."
      },
      {
        misconceptionId: "E-w7-c",
        description: "Student rounds x correctly to 10 but forgets to square it before multiplying by 3, computing 3×10=30 instead of 3×10²=300.",
        rootCause: "Squaring Step Omitted — forgets to apply the exponent before the final multiplication.",
        remediation: "The expression is 3x², which means x must be SQUARED before multiplying by 3: 10²=100, then 3×100=300 — not skipping the squaring step to get 3×10=30."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Round the input value to the nearest whole number", hint: "9.9 rounds to 10." },
      { level: 2, description: "Square the rounded value", hint: "10² = 100." },
      { level: 3, description: "Multiply by the coefficient", hint: "3 × 100 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.7.EE.B.3"] },
  { itemId: "w8", order: 8, cluster: "EXP", clusterName: CLUSTER_NAMES.EXP,
    skillId: "EXPAND-04",
    question: "Expand and simplify: \\(-2(3 - x) + 4x\\).",
    options: [
      { text: "\\(-6 + 6x\\)", correct: true, feedback: "-2×3=-6; -2×(-x)=+2x; plus 4x gives -6+6x." },
      { text: "\\(-6 - 2x\\)", correct: false, feedback: "-2×(-x)=+2x, not -2x. Negative × negative = positive.", misconceptionId: "E-w8-a" },
      { text: "\\(6 + 6x\\)", correct: false, feedback: "-2×3=-6, not +6. Don't drop the negative sign.", misconceptionId: "E-w8-b" },
      { text: "\\(-6 + 2x\\)", correct: false, feedback: "You forgot to add the +4x at the end.", misconceptionId: "E-w8-c" }
    ],
    retryHint: "-2×3=-6; -2×(-x)=+2x; then add +4x.",
    misconceptions: [
      {
        misconceptionId: "E-w8-a",
        description: "Student computes -2×(-x) as -2x instead of +2x, mishandling the sign of a negative times a negative.",
        rootCause: "Sign Rule Confused — treats negative×negative as negative instead of positive.",
        remediation: "-2×(-x): negative×negative=POSITIVE, so this equals +2x, not -2x — combined with the +4x, this gives +2x+4x=+6x, so the full answer is -6+6x, not -6-2x."
      },
      {
        misconceptionId: "E-w8-b",
        description: "Student drops the negative sign on the first term, computing -2×3 as +6 instead of -6.",
        rootCause: "Sign Dropped During Distribution — loses track of the negative sign on the outer multiplier.",
        remediation: "-2×3: negative×positive=NEGATIVE, so this equals -6, not +6 — the correct expansion begins with -6, not 6."
      },
      {
        misconceptionId: "E-w8-c",
        description: "Student correctly expands the bracket (-6+2x) but forgets to add the separate +4x term that comes after the bracket.",
        rootCause: "Term Outside Bracket Dropped — forgets to include a term that isn't part of the distributed bracket.",
        remediation: "After expanding -2(3-x)=-6+2x, there is still a +4x OUTSIDE the bracket to add: 2x+4x=6x, giving -6+6x — not stopping at -6+2x, which ignores the extra +4x term."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Expand the bracket first", hint: "-2 × 3 = -6. -2 × (-x) = +2x (negative × negative = positive)." },
      { level: 2, description: "Add the remaining term outside the bracket", hint: "There is still a +4x to include." },
      { level: 3, description: "Combine the like terms with x", hint: "2x + 4x = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.7.EE.A.1"] },
  { itemId: "w9", order: 9, cluster: "INDX", clusterName: CLUSTER_NAMES.INDX,
    skillId: "INDXPOWPROD-01",
    question: "Simplify: \\((2x^2)^3\\).",
    options: [
      { text: "\\(8x^6\\)", correct: true, feedback: "2³=8; (x²)³=x⁶." },
      { text: "\\(6x^5\\)", correct: false, feedback: "2³=8, not 6. And multiply exponents (2×3=6), not add.", misconceptionId: "E-w9-a" },
      { text: "\\(8x^5\\)", correct: false, feedback: "Multiply exponents: 2×3=6, not add 2+3=5.", misconceptionId: "E-w9-b" },
      { text: "\\(2x^6\\)", correct: false, feedback: "Don't forget to cube the 2. 2³=8.", misconceptionId: "E-w9-c" }
    ],
    retryHint: "Cube the number and multiply the exponents.",
    misconceptions: [
      {
        misconceptionId: "E-w9-a",
        description: "Student multiplies 2×3=6 instead of cubing 2 (2³=8) for the coefficient, and also adds the exponents instead of multiplying them for the variable part.",
        rootCause: "Power-of-a-Product Rule Not Applied Correctly — mishandles both the coefficient and the exponent when raising a product to a power.",
        remediation: "(2x²)³ means BOTH the 2 and the x² are raised to the power of 3 separately: 2³=8 (not 2×3=6), and (x²)³=x^(2×3)=x⁶ (multiply exponents, not add 2+3=5) — the full answer is 8x⁶, not 6x⁵."
      },
      {
        misconceptionId: "E-w9-b",
        description: "Student correctly cubes the coefficient (2³=8) but adds the exponents (2+3=5) instead of multiplying them for the variable part.",
        rootCause: "Exponent Rule Confused — applies the ADD-exponents rule instead of the MULTIPLY-exponents rule for a power raised to a power.",
        remediation: "(x²)³ requires MULTIPLYING the exponents: 2×3=6, giving x⁶ — adding them (2+3=5) would be the rule for multiplying two separate same-base powers, not for a power raised to another power; the full answer is 8x⁶, not 8x⁵."
      },
      {
        misconceptionId: "E-w9-c",
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
  { itemId: "w10", order: 10, cluster: "SUB", clusterName: CLUSTER_NAMES.SUB,
    skillId: "SUBEVAL-04",
    question: "If \\(a = -1, b = 2\\), evaluate \\(a^2b - ab^2\\).",
    options: [
      { text: "6", correct: true, feedback: "a²b=1×2=2; ab²=(-1)×4=-4; 2 - (-4) = 2+4 = 6." },
      { text: "-6", correct: false, feedback: "You computed ab² as +4 instead of -4. (-1)×4=-4, so 2 - (-4)=6.", misconceptionId: "E-w10-a" },
      { text: "2", correct: false, feedback: "You only computed a²b and forgot the ab² term.", misconceptionId: "E-w10-b" },
      { text: "-2", correct: false, feedback: "You computed a²b=-2 and ab²=-4, giving -2-(-4)=2? Sign error. a²=1 always.", misconceptionId: "E-w10-c" }
    ],
    retryHint: "a²=1; b=2; ab² = a×(b×b) = -1×4 = -4. Then a²b - ab² = 2 - (-4) = 6.",
    misconceptions: [
      {
        misconceptionId: "E-w10-a",
        description: "Student computes ab² (with a=-1,b=2) as +4 instead of -4, dropping the negative sign on a during the multiplication.",
        rootCause: "Negative Coefficient Sign Dropped — loses track of the negative sign on one of the variables during multiplication.",
        remediation: "ab²=a×b²=(-1)×4=-4 (NEGATIVE, since a is negative) — the full evaluation is 2-(-4)=2+4=6, not 2-4=-2 or similar (which uses the incorrect +4)."
      },
      {
        misconceptionId: "E-w10-b",
        description: "Student computes only the first term (a²b=2) and forgets to also compute and subtract the ab² term entirely.",
        rootCause: "Term Omitted — drops an entire term from the expression during evaluation.",
        remediation: "The expression has TWO terms: a²b AND ab² — both must be evaluated: a²b=2, ab²=-4, then 2-(-4)=6 — not just a²b=2 alone (which skips the ab² term)."
      },
      {
        misconceptionId: "E-w10-c",
        description: "Student computes a²b as -2 instead of +2, treating a² (with a=-1) as -1 instead of +1, mishandling the square of a negative number.",
        rootCause: "Squaring Negative Numbers Misunderstood — believes squaring a negative gives a negative result.",
        remediation: "a²=(-1)²=+1 (never negative, since negative×negative=positive) — so a²b=1×2=+2, not -2; the full evaluation is 2-(-4)=6, not -2-(-4)=2."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Evaluate a² first", hint: "a²=(-1)²=+1 (never negative)." },
      { level: 2, description: "Evaluate each term separately", hint: "a²b=1×2=2. ab²=(-1)×4=-4 (a is negative, so this stays negative)." },
      { level: 3, description: "Subtract the second term from the first", hint: "2 - (-4) = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.EE.A.2C"] }
];

const diagnosticItems = [
  { itemId: "d1", order: 1, cluster: "SUB", clusterName: CLUSTER_NAMES.SUB,
    skillId: "SUBEVAL-03",
    question: "If \\(x = -2\\), evaluate \\(3x^2 - 2x + 1\\).",
    options: [
      { text: "17", correct: true, feedback: "3×4 - 2×(-2) + 1 = 12 + 4 + 1 = 17." },
      { text: "9", correct: false, feedback: "You squared -2 as -4: 3(-4)-2(-2)+1 = -7. Check: (-2)²=+4.", misconceptionId: "E-d1-a" },
      { text: "-7", correct: false, feedback: "You squared -2 as -4: 3(-4)-2(-2)+1 = -12+4+1 = -7.", misconceptionId: "E-d1-b" },
      { text: "15", correct: false, feedback: "You computed -2×(-2) as -4 instead of +4. Check the sign on -2x.", misconceptionId: "E-d1-c" }
    ],
    backward: "Chapter 1: (-a)² = a².",
    forward: "Substituting negative values is essential for graphing functions.",
    misconceptions: [
      {
        misconceptionId: "E-d1-a",
        description: "Student's stated reasoning gives -7, but claims the answer is 9; regardless, the underlying error is treating x² (with x=-2) as -4 instead of +4.",
        rootCause: "Squaring Negative Numbers Misunderstood — believes squaring a negative gives a negative result.",
        remediation: "x²=(-2)²=(-2)×(-2)=+4 (negative×negative=positive) — a square is NEVER negative; the full evaluation is 3×4-2×(-2)+1=12+4+1=17, not 3×(-4)-2×(-2)+1=-7."
      },
      {
        misconceptionId: "E-d1-b",
        description: "Student computes x² (with x=-2) as -4 instead of +4, treating the square of a negative number as negative.",
        rootCause: "Squaring Negative Numbers Misunderstood — believes squaring a negative gives a negative result.",
        remediation: "x²=(-2)²=(-2)×(-2)=+4 (negative×negative=positive) — a square is NEVER negative; the full evaluation is 12+4+1=17, not -12+4+1=-7."
      },
      {
        misconceptionId: "E-d1-c",
        description: "Student computes -2×(-2) as -4 instead of +4, mishandling the sign of a negative times a negative for the -2x term.",
        rootCause: "Sign Rule Confused — treats negative×negative as negative instead of positive.",
        remediation: "-2x with x=-2 means -2×(-2), and negative×negative=POSITIVE, so this equals +4, not -4 — the full evaluation is 12+4+1=17, not 12-4+1=9 or 15 (which use the wrong sign for this term)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Substitute x=-2 into each term separately", hint: "3(-2)², -2(-2), and +1." },
      { level: 2, description: "Evaluate each term carefully with correct signs", hint: "(-2)²=+4, so 3×4=12. -2×(-2)=+4 (negative×negative=positive)." },
      { level: 3, description: "Add all three terms", hint: "12 + 4 + 1 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.EE.A.2C"] },
  { itemId: "d2", order: 2, cluster: "INDX", clusterName: CLUSTER_NAMES.INDX,
    skillId: "INDXCOMBO-02",
    question: "Simplify: \\(\\frac{x^5 \\times x^2}{x^3}\\).",
    options: [
      { text: "\\(x^4\\)", correct: true, feedback: "x⁵×x²=x⁷; x⁷/x³=x⁴." },
      { text: "\\(x^7\\)", correct: false, feedback: "You multiplied but forgot to divide by x³.", misconceptionId: "E-d2-a" },
      { text: "\\(x^{10}\\)", correct: false, feedback: "You added all exponents: 5+2+3=10. Subtract when dividing.", misconceptionId: "E-d2-b" },
      { text: "\\(x^0\\)", correct: false, feedback: "x⁰=1. You subtracted 7-3=4, not 7-7=0.", misconceptionId: "E-d2-c" }
    ],
    backward: "Multiply first (add exponents), then divide (subtract).",
    forward: "Index laws are used in standard form and algebraic fractions.",
    misconceptions: [
      {
        misconceptionId: "E-d2-a",
        description: "Student correctly multiplies x⁵×x²=x⁷ but stops there, forgetting to also divide by x³ as the expression requires.",
        rootCause: "Final Step Omitted — stops after the first operation, forgetting the second operation still needs to be applied.",
        remediation: "The expression has TWO operations: multiply (numerator), THEN divide (by denominator) — after x⁵×x²=x⁷, you still need to divide by x³: x⁷÷x³=x^(7-3)=x⁴, not stopping at just x⁷."
      },
      {
        misconceptionId: "E-d2-b",
        description: "Student adds all three exponents together (5+2+3=10) regardless of whether the operation is multiplication or division.",
        rootCause: "Exponent Rule Applied Uniformly Regardless of Operation — adds every exponent without distinguishing between multiplication (add) and division (subtract).",
        remediation: "ADD exponents for MULTIPLICATION (numerator) and SUBTRACT for DIVISION (by the denominator) — first x⁵×x²=x^(5+2)=x⁷, then x⁷÷x³=x^(7-3)=x⁴, not add all three (5+2+3=10)."
      },
      {
        misconceptionId: "E-d2-c",
        description: "Student subtracts the denominator's exponent from itself instead of from the numerator's combined exponent, getting x⁰=1 (via 3-3) instead of correctly subtracting from 7.",
        rootCause: "Wrong Exponents Combined — subtracts the denominator's exponent from an incorrect starting value instead of the numerator's total.",
        remediation: "First combine the NUMERATOR: x⁵×x²=x⁷ — THEN subtract the denominator's exponent from THIS total: 7-3=4, giving x⁴, not 3-3=0 (which subtracts the denominator's exponent from itself instead of from 7)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Simplify the numerator first", hint: "x⁵×x²: add exponents, 5+2=7, giving x⁷." },
      { level: 2, description: "Identify the denominator's exponent", hint: "The denominator is x³." },
      { level: 3, description: "Divide by subtracting exponents", hint: "x⁷÷x³: 7-3=?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.EE.A.1"] },
  { itemId: "d3", order: 3, cluster: "EXP", clusterName: CLUSTER_NAMES.EXP,
    skillId: "EXPAND-07",
    question: "Expand: \\(-3x(2 - x)\\).",
    options: [
      { text: "\\(-6x + 3x^2\\)", correct: true, feedback: "-3x×2=-6x; -3x×(-x)=+3x²." },
      { text: "\\(-6x - 3x^2\\)", correct: false, feedback: "-3x×(-x)=+3x², not -3x². Negative × negative = positive.", misconceptionId: "E-d3-a" },
      { text: "\\(6x - 3x^2\\)", correct: false, feedback: "-3x×2=-6x, not +6x. Don't drop the negative sign.", misconceptionId: "E-d3-b" },
      { text: "\\(-6x + 3x\\)", correct: false, feedback: "x×x=x², not x. You lost one power of x.", misconceptionId: "E-d3-c" }
    ],
    backward: "Distribute the negative coefficient to every term.",
    forward: "Expanding with variables and negatives is common in quadratics.",
    misconceptions: [
      {
        misconceptionId: "E-d3-a",
        description: "Student computes -3x×(-x) as -3x² instead of +3x², mishandling the sign of a negative times a negative.",
        rootCause: "Sign Rule Confused — treats negative×negative as negative instead of positive.",
        remediation: "-3x×(-x): negative×negative=POSITIVE, so this equals +3x², not -3x² — the correct expansion is -6x+3x², not -6x-3x²."
      },
      {
        misconceptionId: "E-d3-b",
        description: "Student drops the negative sign on the first term, computing -3x×2 as +6x instead of -6x.",
        rootCause: "Sign Dropped During Distribution — loses track of the negative sign on the outer multiplier.",
        remediation: "-3x×2: negative×positive=NEGATIVE, so this equals -6x, not +6x — the correct expansion is -6x+3x², not 6x-3x²."
      },
      {
        misconceptionId: "E-d3-c",
        description: "Student computes -3x×(-x) but drops one power of x, treating x×x as x instead of x², landing on -6x+3x instead of -6x+3x².",
        rootCause: "Variable Power Not Tracked During Multiplication — forgets that multiplying x by x produces x², not just x.",
        remediation: "When multiplying x by x, the powers ADD: x¹×x¹=x², not x — -3x×(-x)=+3x² (the exponents of x add: 1+1=2), not +3x (which incorrectly loses a power of x)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify what's being multiplied", hint: "-3x must multiply EVERY term inside the bracket, including its sign." },
      { level: 2, description: "Multiply the first term", hint: "-3x × 2 = -6x." },
      { level: 3, description: "Multiply the second term, tracking both the sign and the power of x", hint: "-3x × (-x): negative × negative = positive, and x×x=x²." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.7.EE.A.1"] },
  { itemId: "d4", order: 4, cluster: "FAC", clusterName: CLUSTER_NAMES.FAC,
    skillId: "FACTOR-05",
    question: "Factorise: \\(18x^3 - 12x^2\\).",
    options: [
      { text: "\\(6x^2(3x - 2)\\)", correct: true, feedback: "HCF of 18 and 12 is 6; lowest power of x is x²." },
      { text: "\\(3x^2(6x - 4)\\)", correct: false, feedback: "Not fully factorised. The HCF of 18 and 12 is 6, not 3.", misconceptionId: "E-d4-a" },
      { text: "\\(6x(3x^2 - 2x)\\)", correct: false, feedback: "x² is the highest common power of x. Both terms have at least x².", misconceptionId: "E-d4-b" },
      { text: "\\(6x^2(3x + 2)\\)", correct: false, feedback: "The sign inside should be negative: 6x²×(-2)=-12x².", misconceptionId: "E-d4-c" }
    ],
    backward: "Take out the highest common factor including the highest power of x.",
    forward: "Factorising with higher powers is used when solving polynomial equations.",
    misconceptions: [
      {
        misconceptionId: "E-d4-a",
        description: "Student factors out 3, a common numeric factor, but doesn't check that a LARGER common factor (6) also exists.",
        rootCause: "Not the Highest Common Factor — factors out A common factor but not the HIGHEST one.",
        remediation: "3 IS a common factor of 18 and 12, but it's not the HIGHEST — 6 is also common (18÷6=3, 12÷6=2) and larger than 3, so the fully factorised form is 6x²(3x-2), not the incompletely factorised 3x²(6x-4)."
      },
      {
        misconceptionId: "E-d4-b",
        description: "Student factors out only x¹ from the variable part instead of the full x² that both terms share (since x³ has x² and x² has x²).",
        rootCause: "Not the Highest Common Power of the Variable — factors out a lower power of the shared variable than is actually common.",
        remediation: "18x³ has x² as a factor (x³=x²×x) and 12x² has x² as a factor — the highest common power of x is x², not just x: 6x²(3x-2), not the incompletely factorised 6x(3x²-2x)."
      },
      {
        misconceptionId: "E-d4-c",
        description: "Student factors out 6x² correctly but keeps the wrong sign inside the bracket, writing +2 instead of -2.",
        rootCause: "Sign Dropped During Factoring — loses track of the negative sign on the second term.",
        remediation: "12x² is being SUBTRACTED (18x³-12x²), so after dividing by 6x², the inside should be -2 (since 12x²÷6x²=2, and the sign stays negative): 6x²(3x-2), not 6x²(3x+2) (which incorrectly flips the sign)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the numeric HCF of 18 and 12", hint: "The HCF of 18 and 12 is 6." },
      { level: 2, description: "Find the highest common power of x", hint: "18x³ and 12x² both contain at least x²." },
      { level: 3, description: "Divide each term by the full common factor 6x², keeping the sign", hint: "18x³÷6x²=3x. -12x²÷6x²=-2." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.7.EE.A.1"] },
  { itemId: "d5", order: 5, cluster: "CON", clusterName: CLUSTER_NAMES.CON,
    skillId: "CONSTRUCT-04",
    question: "Car rental: £30 per day plus £0.15 per kilometre. Write a formula for cost \\(C\\) for \\(d\\) days and \\(k\\) km.",
    options: [
      { text: "\\(C = 30d + 0.15k\\)", correct: true, feedback: "The cost depends on days and kilometres independently — they are added." },
      { text: "\\(C = 30 + 0.15dk\\)", correct: false, feedback: "That multiplies days and kilometres. They are separate charges, added together.", misconceptionId: "E-d5-a" },
      { text: "\\(C = 30d + 0.15\\)", correct: false, feedback: "You forgot to multiply the per-km rate by k. It's 0.15 per km, so 0.15k.", misconceptionId: "E-d5-b" },
      { text: "\\(C = 30k + 0.15d\\)", correct: false, feedback: "You swapped the rates. £30 is per day, not per km.", misconceptionId: "E-d5-c" }
    ],
    backward: "Identify the constant part and the variable parts.",
    forward: "Real-life formulas model costs, distances, and scientific relationships.",
    misconceptions: [
      {
        misconceptionId: "E-d5-a",
        description: "Student multiplies the two variable quantities (d and k) together instead of treating the day-charge and kilometre-charge as two SEPARATE charges that get added.",
        rootCause: "Independent Charges Treated as Multiplied — combines two separate rate-based charges via multiplication instead of addition.",
        remediation: "Days and kilometres are two INDEPENDENT charges that each add to the total, not multiply each other — C=30d+0.15k (each rate times its own variable, then ADDED), not C=30+0.15dk (which incorrectly multiplies d and k together)."
      },
      {
        misconceptionId: "E-d5-b",
        description: "Student correctly writes the per-day charge (30d) but forgets to multiply the per-kilometre rate by k, leaving 0.15 as a bare constant instead of 0.15k.",
        rootCause: "Variable Not Attached to Rate — leaves a per-unit rate as a constant instead of multiplying it by the corresponding variable.",
        remediation: "£0.15 PER kilometre means the charge scales with k: 0.15×k=0.15k, not just 0.15 alone — C=30d+0.15k, not C=30d+0.15 (which leaves the km rate unmultiplied by k)."
      },
      {
        misconceptionId: "E-d5-c",
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
  { itemId: "d6", order: 6, cluster: "DIS", clusterName: CLUSTER_NAMES.DIS,
    skillId: "DISTINGUISH-02",
    question: "Which of the following can you solve for \\(x\\)?",
    options: [
      { text: "\\(2x + 3 = 0\\)", correct: true, feedback: "An equation with one unknown can be solved." },
      { text: "\\(2x + 3\\)", correct: false, feedback: "That's an expression — nothing to solve.", misconceptionId: "E-d6-a" },
      { text: "\\(y = 2x + 3\\)", correct: false, feedback: "That's a formula — it can be rearranged but not solved for a single value without knowing y.", misconceptionId: "E-d6-b" },
      { text: "All of them", correct: false, feedback: "Only the equation can be solved.", misconceptionId: "E-d6-c" }
    ],
    backward: "Equations have a specific solution; expressions don't.",
    forward: "Identifying solvable equations is key in algebra.",
    misconceptions: [
      {
        misconceptionId: "E-d6-a",
        description: "Student picks the expression (2x+3), not recognising that without an equals sign, there is nothing to solve for.",
        rootCause: "Expression Mistaken for Solvable Equation — treats a bare expression as if it could be solved like an equation.",
        remediation: "An EXPRESSION (like 2x+3) has NO equals sign and NOTHING to solve — you can only simplify or evaluate it; 2x+3=0 (with an equals sign and one unknown) is the equation that CAN be solved for x."
      },
      {
        misconceptionId: "E-d6-b",
        description: "Student picks the formula (y=2x+3), not recognising that it relates two variables (x and y) rather than having a single specific solution for x without additional information.",
        rootCause: "Formula Mistaken for Solvable Equation — treats a relationship between multiple variables as if it had one fixed solution.",
        remediation: "A FORMULA (like y=2x+3) relates x and y — without knowing y's value, x cannot be solved for a specific number; 2x+3=0 (a true equation with one unknown) has exactly one numeric solution."
      },
      {
        misconceptionId: "E-d6-c",
        description: "Student believes all three options can be solved, not distinguishing between an expression, a formula, and a true equation with one unknown.",
        rootCause: "Expression/Formula/Equation Distinction Not Applied — fails to recognise that only a true equation with one unknown has a specific numeric solution.",
        remediation: "Only 2x+3=0 is a true EQUATION with exactly one unknown (x) and a specific numeric solution — 2x+3 (no equals sign) and y=2x+3 (relates two variables) cannot be 'solved' the same way."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall what makes something solvable", hint: "You need an equation with exactly one unknown and a specific solution." },
      { level: 2, description: "Check each option for an equals sign and number of unknowns", hint: "Which option has '=' and only the variable x, with no other letters?" },
      { level: 3, description: "Confirm your choice", hint: "Does 2x+3=0 have exactly one unknown?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: [] },
  { itemId: "d7", order: 7, cluster: "EST", clusterName: CLUSTER_NAMES.EST,
    skillId: "ESTROUND-04",
    question: "Estimate \\(4x^2 - 2x\\) when \\(x = 5.1\\).",
    options: [
      { text: "90", correct: true, feedback: "Round 5.1 to 5. 4×25=100, -2×5=10, 100-10=90." },
      { text: "100", correct: false, feedback: "You forgot to subtract the -2x term.", misconceptionId: "E-d7-a" },
      { text: "80", correct: false, feedback: "You rounded 5.1 to 4. Round to the nearest integer: 5.1→5.", misconceptionId: "E-d7-b" },
      { text: "85", correct: false, feedback: "4×25=100, -2×5=10, 100-10=90, not 85.", misconceptionId: "E-d7-c" }
    ],
    backward: "Round the input, then substitute and compute.",
    forward: "Estimation is a valuable check for calculator errors.",
    misconceptions: [
      {
        misconceptionId: "E-d7-a",
        description: "Student computes only the 4x² term (100) and forgets to subtract the -2x term (10), stopping at the first term's value.",
        rootCause: "Term Omitted — drops an entire term from the expression during evaluation.",
        remediation: "The expression has TWO terms: 4x² AND -2x — both must be evaluated and combined: 100-10=90, not just 4x²=100 alone (which skips the -2x term)."
      },
      {
        misconceptionId: "E-d7-b",
        description: "Student rounds 5.1 down to 4 instead of to the nearest whole number, 5, rounding to the wrong nearest integer.",
        rootCause: "Rounding Direction Error — rounds to an incorrect nearest whole number.",
        remediation: "5.1 is closer to 5 than to 4 (since .1 rounds down but 5.1 itself rounds to 5, the nearest whole number) — round to 5, then 4×25-2×5=90, not 4×16-2×4=56ish or 80 (which uses the wrong rounded value, 4)."
      },
      {
        misconceptionId: "E-d7-c",
        description: "Student computes the correct component values (100 and 10) but combines them incorrectly, arriving at 85 instead of the correct 90.",
        rootCause: "Computation Error — the final combination step is mishandled despite correct intermediate values.",
        remediation: "Recompute carefully: 4×5²=100, and 2×5=10 — then 100-10=90, not 85 (which suggests an arithmetic slip in the final subtraction)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Round the input value to the nearest whole number", hint: "5.1 rounds to 5." },
      { level: 2, description: "Evaluate each term separately", hint: "4×5²=100. 2×5=10." },
      { level: 3, description: "Combine the terms", hint: "100 - 10 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.7.EE.B.3"] },
  { itemId: "d8", order: 8, cluster: "EXT", clusterName: CLUSTER_NAMES.EXT,
    skillId: "EXTVERIFY-01",
    question: "A student expanded \\(3(2x - 1) - 2(x + 3)\\) and got \\(4x - 9\\). Is this correct?",
    options: [
      { text: "Yes, it is correct", correct: true, feedback: "6x-3-2x-6 = 4x-9." },
      { text: "No, it should be \\(4x + 3\\)", correct: false, feedback: "Check the constants: -3-6=-9, not +3.", misconceptionId: "E-d8-a" },
      { text: "No, it should be \\(4x - 3\\)", correct: false, feedback: "-3-6=-9, not -3.", misconceptionId: "E-d8-b" },
      { text: "No, it should be \\(8x - 9\\)", correct: false, feedback: "6x-2x=4x, not 8x.", misconceptionId: "E-d8-c" }
    ],
    backward: "Expand each bracket carefully, then combine like terms.",
    forward: "Error spotting sharpens your checking skills for tests.",
    misconceptions: [
      {
        misconceptionId: "E-d8-a",
        description: "Student re-expands the problem incorrectly, computing -3-6 as +3 instead of -9, mishandling the combination of two negative constants.",
        rootCause: "Negative Constants Combination Error — mishandles adding two negative numbers together.",
        remediation: "-3 and -6 are both NEGATIVE, so combining them means -3+(-6)=-9 (they add up in magnitude, staying negative), not -3-6 miscalculated as +3 — the student's original answer of 4x-9 is actually correct."
      },
      {
        misconceptionId: "E-d8-b",
        description: "Student re-expands the problem incorrectly, computing -3-6 as -3 instead of -9, seemingly ignoring one of the two negative constants.",
        rootCause: "Term Dropped During Recombination — loses track of one of the constant terms while re-checking the work.",
        remediation: "Both constants must be included: -3 (from 3×-1) and -6 (from -2×3) — combining: -3+(-6)=-9, not just -3 alone (which drops the -6 term) — the student's original answer of 4x-9 is actually correct."
      },
      {
        misconceptionId: "E-d8-c",
        description: "Student re-checks the x-coefficient combination incorrectly, computing 6x-2x as 8x instead of 4x, mishandling the subtraction of like terms.",
        rootCause: "Like-Term Combination Error — adds instead of subtracts when combining the x-coefficients.",
        remediation: "6x and -2x combine by SUBTRACTING (6x-2x=4x, since the second term is being subtracted per -2(x+3)), not adding (6x+2x=8x) — the student's original answer of 4x-9 is actually correct."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Re-expand each bracket yourself, independently", hint: "3(2x-1)=6x-3. -2(x+3)=-2x-6." },
      { level: 2, description: "Combine the like terms with x", hint: "6x - 2x = 4x." },
      { level: 3, description: "Combine the constant terms", hint: "-3 + (-6) = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.7.EE.A.1"] },
  { itemId: "d9", order: 9, cluster: "SUB", clusterName: CLUSTER_NAMES.SUB,
    skillId: "SUBEVAL-07",
    question: "If \\(a = -1, b = 2, c = -3\\), evaluate \\(ab^2 - c^2\\).",
    options: [
      { text: "\\(-13\\)", correct: true, feedback: "(-1)×4 - 9 = -4 - 9 = -13." },
      { text: "5", correct: false, feedback: "You computed -4 + 9 = 5. c²=9, but it's minus c², not plus.", misconceptionId: "E-d9-a" },
      { text: "\\(-5\\)", correct: false, feedback: "You computed (-1)×4=-4, then -4-(-9)=5? c²=9, so -4-9=-13.", misconceptionId: "E-d9-b" },
      { text: "13", correct: false, feedback: "You dropped the negative sign: 4+9=13.", misconceptionId: "E-d9-c" }
    ],
    backward: "Square first, then multiply, then subtract.",
    forward: "Multi-variable substitution appears in physics formulas.",
    misconceptions: [
      {
        misconceptionId: "E-d9-a",
        description: "Student adds -4 and 9 (getting 5) instead of subtracting 9 (as c²) from -4, treating the second term as if it were added rather than subtracted.",
        rootCause: "Subtraction Direction Confused — adds the second term instead of correctly subtracting it as the expression specifies.",
        remediation: "The expression is ab² MINUS c², so subtract: -4-9=-13, not -4+9=5 — c² is always subtracted here, never added."
      },
      {
        misconceptionId: "E-d9-b",
        description: "Student treats c² as -9 instead of +9, incorrectly applying a negative sign to the squared value of a negative number.",
        rootCause: "Squaring Negative Numbers Misunderstood — believes squaring a negative gives a negative result.",
        remediation: "c²=(-3)²=(-3)×(-3)=+9 (negative×negative=positive) — a square is NEVER negative; the full evaluation is -4-9=-13, not -4-(-9)=5 (which incorrectly treats c² as -9)."
      },
      {
        misconceptionId: "E-d9-c",
        description: "Student drops the negative sign on ab², computing it as +4 instead of -4, and correctly computes c²=9 but then adds instead of subtracts.",
        rootCause: "Multiple Sign Errors Combined — both drops a negative sign on one term and mishandles the subtraction between terms.",
        remediation: "ab²=(-1)×4=-4 (NEGATIVE, since a=-1) — and the expression subtracts c²=9: -4-9=-13, not 4+9=13 (which drops the negative on ab² and adds instead of subtracts)."
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
    skillId: "INDXCOMBO-03",
    question: "Simplify: \\((x^2 y)^3 \\div (x y^2)\\).",
    options: [
      { text: "\\(x^5 y\\)", correct: true, feedback: "(x²y)³=x⁶y³; x⁶y³/xy² = x⁵y." },
      { text: "\\(x^6 y\\)", correct: false, feedback: "You didn't divide by the denominator. x⁶y³/xy² = x⁵y.", misconceptionId: "E-d10-a" },
      { text: "\\(x^5 y^2\\)", correct: false, feedback: "y³/y² = y, not y².", misconceptionId: "E-d10-b" },
      { text: "\\(x^7 y^5\\)", correct: false, feedback: "You added exponents instead of subtracting when dividing.", misconceptionId: "E-d10-c" }
    ],
    backward: "Apply the power first, then divide term by term.",
    forward: "Combining index laws is essential for simplifying complex expressions.",
    misconceptions: [
      {
        misconceptionId: "E-d10-a",
        description: "Student correctly applies the power-of-a-product rule to get x⁶y³ but forgets to also divide by the denominator (xy²), stopping at x⁶y (dropping the y exponent partially too).",
        rootCause: "Division Step Omitted — stops after applying the power, forgetting the division by the denominator still needs to be applied.",
        remediation: "After computing (x²y)³=x⁶y³, you still need to DIVIDE by xy²: for x, 6-1=5; for y, 3-2=1 — giving x⁵y, not stopping at x⁶y (which skips dividing by the denominator properly)."
      },
      {
        misconceptionId: "E-d10-b",
        description: "Student correctly handles the x exponent (getting x⁵) but mishandles the y exponent, keeping it at y² instead of correctly reducing it to y¹.",
        rootCause: "Per-Variable Exponent Tracking Error — correctly processes one variable's exponent but not the other's.",
        remediation: "Each variable's exponents are tracked SEPARATELY — for y: numerator has y³ (from (x²y)³), denominator has y², so y³÷y²=y^(3-2)=y¹=y, not y² (which doesn't apply the subtraction to y at all)."
      },
      {
        misconceptionId: "E-d10-c",
        description: "Student adds the exponents instead of subtracting them during the division step, treating division like multiplication.",
        rootCause: "Exponent Rule Confused — applies the ADD-exponents rule (for multiplying same-base powers) instead of the SUBTRACT-exponents rule (for dividing).",
        remediation: "When DIVIDING same-base powers, SUBTRACT the exponents: x⁶÷x=x^(6-1)=x⁵ and y³÷y²=y^(3-2)=y¹ — adding them (6+1=7 and 3+2=5) would be the rule for MULTIPLYING same-base powers, not dividing."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Apply the power-of-a-product rule to the numerator first", hint: "(x²y)³ = x^(2×3) × y^(1×3) = x⁶y³." },
      { level: 2, description: "Divide each variable's exponent separately", hint: "For x: 6-1. For y: 3-2." },
      { level: 3, description: "Write the simplified result", hint: "x⁵ × y¹ = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.EE.A.1"] },
  { itemId: "d11", order: 11, cluster: "EXP", clusterName: CLUSTER_NAMES.EXP,
    skillId: "EXPANDFOIL-01",
    question: "Expand and simplify: \\((x+2)(x+3)\\).",
    options: [
      { text: "\\(x^2 + 5x + 6\\)", correct: true, feedback: "FOIL: x²+3x+2x+6 = x²+5x+6." },
      { text: "\\(x^2 + 6\\)", correct: false, feedback: "Don't forget the middle terms: 3x and 2x give 5x.", misconceptionId: "E-d11-a" },
      { text: "\\(x^2 + 5x + 5\\)", correct: false, feedback: "2×3=6, not 5. Multiply the constant terms.", misconceptionId: "E-d11-b" },
      { text: "\\(x^2 + 5x\\)", correct: false, feedback: "You forgot the constant term: 2×3=6.", misconceptionId: "E-d11-c" }
    ],
    backward: "Use FOIL or the area model to expand double brackets.",
    forward: "Double brackets appear in area, quadratics, and algebraic identities.",
    misconceptions: [
      {
        misconceptionId: "E-d11-a",
        description: "Student multiplies only the First and Last terms (x×x=x² and 2×3=6), skipping the Outer and Inner cross terms (3x and 2x) entirely.",
        rootCause: "Cross Terms Omitted — forgets to multiply the outer and inner pairs of terms when expanding double brackets.",
        remediation: "Expanding (x+2)(x+3) requires FOUR products: First (x×x=x²), Outer (x×3=3x), Inner (2×x=2x), and Last (2×3=6) — the two middle (cross) terms 3x+2x=5x must be included, not skipped: x²+5x+6, not just x²+6."
      },
      {
        misconceptionId: "E-d11-b",
        description: "Student correctly combines the cross terms (5x) but miscalculates the Last term, getting 2×3=5 instead of 6.",
        rootCause: "Computation Error — the final multiplication of the constant terms is mishandled.",
        remediation: "The Last term is 2×3=6 (a basic multiplication fact), not 5 — the full expansion is x²+5x+6, not x²+5x+5."
      },
      {
        misconceptionId: "E-d11-c",
        description: "Student correctly computes the First and cross terms (x²+5x) but forgets to include the Last term (2×3=6) entirely.",
        rootCause: "Last Term Omitted — forgets to multiply the two constant terms at the end.",
        remediation: "Expanding (x+2)(x+3) requires the Last term too: 2×3=6 — the full expansion is x²+5x+6, not stopping at x²+5x (which drops the constant term)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Multiply the First terms", hint: "x × x = x²." },
      { level: 2, description: "Multiply the Outer and Inner terms, then combine", hint: "x×3=3x (Outer). 2×x=2x (Inner). 3x+2x=5x." },
      { level: 3, description: "Multiply the Last terms", hint: "2 × 3 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.HSA-APR.A.1"] },
  { itemId: "d12", order: 12, cluster: "FAC", clusterName: CLUSTER_NAMES.FAC,
    skillId: "FACTOR-03",
    question: "Factorise completely: \\(-10x - 15\\).",
    options: [
      { text: "\\(-5(2x + 3)\\)", correct: true, feedback: "The HCF is -5. Inside signs flip: -5×2x=-10x, -5×3=-15." },
      { text: "\\(5(-2x - 3)\\)", correct: false, feedback: "Not fully factorised. Take out -5, not 5.", misconceptionId: "E-d12-a" },
      { text: "\\(-5(2x - 3)\\)", correct: false, feedback: "-5 × -3 = +15, but we need -15. The sign inside should be positive.", misconceptionId: "E-d12-b" },
      { text: "\\(-2(5x + 7.5)\\)", correct: false, feedback: "Not fully factorised, and not using integers.", misconceptionId: "E-d12-c" }
    ],
    backward: "Factorising with a negative common factor flips the signs inside.",
    forward: "Used when solving equations by dividing by a negative.",
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
        description: "Student factors out 2 instead of the correct HCF of 5 (with the negative sign), which doesn't divide 15 evenly, producing a non-integer inside the bracket.",
        rootCause: "Wrong Common Factor Identified — picks a factor that doesn't divide both terms evenly.",
        remediation: "2 does NOT divide 15 evenly (15÷2=7.5, not a whole number) — the correct HCF is 5 (with a negative sign), which divides both 10 and 15 evenly: -5(2x+3), not -2(5x+7.5) (which uses a non-integer)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the highest common factor, including the sign", hint: "Both terms are negative, so factor out -5." },
      { level: 2, description: "Divide each term by -5, tracking the sign flip", hint: "-10x÷(-5)=2x. -15÷(-5)=+3 (negative÷negative=positive)." },
      { level: 3, description: "Write the factorised form", hint: "-5(2x + 3)." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.7.EE.A.1"] },
  { itemId: "d13", order: 13, cluster: "CON", clusterName: CLUSTER_NAMES.CON,
    skillId: "CONSTRUCT-08",
    question: "A rectangle has length \\(3x + 2\\) and width \\(x + 1\\). Write an expression for its perimeter, simplified.",
    options: [
      { text: "\\(8x + 6\\)", correct: true, feedback: "P=2(3x+2+x+1)=2(4x+3)=8x+6." },
      { text: "\\(4x + 3\\)", correct: false, feedback: "That's the semi-perimeter (half). Multiply by 2 to get the full perimeter.", misconceptionId: "E-d13-a" },
      { text: "\\(8x + 8\\)", correct: false, feedback: "Check the constants: 2+1=3, doubled is 6, not 8.", misconceptionId: "E-d13-b" },
      { text: "\\(6x + 4\\)", correct: false, feedback: "You might have added the dimensions without doubling.", misconceptionId: "E-d13-c" }
    ],
    backward: "Perimeter = 2×(length + width).",
    forward: "Constructing formulas from geometric situations is a key application.",
    misconceptions: [
      {
        misconceptionId: "E-d13-a",
        description: "Student correctly finds length+width=4x+3 but forgets to double it for the full perimeter, stopping at the semi-perimeter.",
        rootCause: "Doubling Step Omitted — stops after finding length+width without applying the required ×2 for perimeter.",
        remediation: "Perimeter is TWICE (length+width), not just length+width — after finding 3x+2+x+1=4x+3, you must multiply by 2: 2(4x+3)=8x+6, not stopping at 4x+3."
      },
      {
        misconceptionId: "E-d13-b",
        description: "Student correctly doubles the x-coefficient (8x) but miscombines the constants, getting 8 instead of 6.",
        rootCause: "Constant Combination Error — mishandles the arithmetic when combining and doubling the constant terms.",
        remediation: "The constants are 2 and 1, which sum to 3, then DOUBLE to 6 (2×3=6) — not 8, which doesn't match 2×(2+1)=6; the full answer is 8x+6, not 8x+8."
      },
      {
        misconceptionId: "E-d13-c",
        description: "Student adds the two dimensions (getting 4x+3) but does not double the result at all, similarly to option a, or makes an error combining without doubling that lands on 6x+4 instead.",
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
  { itemId: "d14", order: 14, cluster: "DIS", clusterName: CLUSTER_NAMES.DIS,
    skillId: "DISTINGUISH-04",
    question: "True or false: \\(A = lw\\) can be rearranged to find \\(l\\) if \\(A\\) and \\(w\\) are known.",
    options: [
      { text: "True", correct: true, feedback: "A formula can be rearranged: l = A/w." },
      { text: "False", correct: false, feedback: "Formulas are designed to be rearranged — that's their purpose.", misconceptionId: "E-d14-a" }
    ],
    backward: "Formulas can be rearranged; expressions cannot.",
    forward: "Rearranging formulas is a core skill in science and engineering.",
    misconceptions: [
      {
        misconceptionId: "E-d14-a",
        description: "Student believes A=lw cannot be rearranged, not recognising that a formula relating multiple variables can always be algebraically rearranged to isolate any one variable, given the others are known.",
        rootCause: "Formula Rearrangement Not Recognised — doesn't understand that a formula's relationship between variables allows solving for any one of them.",
        remediation: "A FORMULA like A=lw relates three quantities — if A and w are known, you can rearrange to isolate l by dividing both sides by w: l=A/w — formulas ARE designed to be rearranged this way, unlike expressions (which have nothing to solve or rearrange for)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall that formulas relate multiple variables", hint: "A=lw relates area, length, and width." },
      { level: 2, description: "Recall that any variable in a formula can be isolated algebraically", hint: "Divide both sides by w to isolate l." },
      { level: 3, description: "Confirm the rearranged formula", hint: "A=lw becomes l = A/w." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.HSA-CED.A.4"] },
  { itemId: "d15", order: 15, cluster: "EST", clusterName: CLUSTER_NAMES.EST,
    skillId: "ESTROUND-04",
    question: "For \\(d = 5t^2\\), estimate \\(d\\) when \\(t = 4.8\\).",
    options: [
      { text: "125", correct: true, feedback: "Round 4.8 to 5. 5×5²=5×25=125." },
      { text: "120", correct: false, feedback: "You used 5²=24? 5²=25, so 5×25=125.", misconceptionId: "E-d15-a" },
      { text: "115", correct: false, feedback: "You rounded 4.8 to 4.7? Round to 5.", misconceptionId: "E-d15-b" },
      { text: "100", correct: false, feedback: "You used 5×20=100? 5²=25, not 20.", misconceptionId: "E-d15-c" }
    ],
    backward: "Round the input, then compute.",
    forward: "Estimation is used in physics when exact values aren't needed.",
    misconceptions: [
      {
        misconceptionId: "E-d15-a",
        description: "Student makes an arithmetic slip computing 5², arriving at 24 instead of 25, leading to a slightly incorrect final total.",
        rootCause: "Computation Error — a basic squaring fact is computed incorrectly.",
        remediation: "5²=5×5=25, not 24 — recompute carefully: 5×25=125, not 5×24=120."
      },
      {
        misconceptionId: "E-d15-b",
        description: "Student rounds 4.8 to an intermediate, non-whole-number value like 4.7 instead of rounding to the nearest whole number, 5.",
        rootCause: "Rounding to Nearest Whole Number Not Applied — doesn't round the input to a whole number as estimation requires.",
        remediation: "4.8 rounded to the NEAREST WHOLE NUMBER is 5 (since .8 rounds up) — round fully to a whole number, not to another decimal like 4.7: 5×5²=125, not a value based on 4.7."
      },
      {
        misconceptionId: "E-d15-c",
        description: "Student computes 5² as 20 instead of 25, perhaps confusing squaring with doubling or multiplying by 4.",
        rootCause: "Squaring Misunderstood as a Different Operation — computes something other than n×n when squaring.",
        remediation: "5² means 5×5=25 (squaring is multiplying a number by ITSELF), not 5×4=20 or another operation — the full estimate is 5×25=125, not 5×20=100."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Round the input value to the nearest whole number", hint: "4.8 rounds to 5." },
      { level: 2, description: "Square the rounded value", hint: "5² = 5×5 = 25." },
      { level: 3, description: "Multiply by the coefficient", hint: "5 × 25 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.7.EE.B.3"] },
  { itemId: "d16", order: 16, cluster: "EXT", clusterName: CLUSTER_NAMES.EXT,
    skillId: "EXTDIAG-01",
    question: "A student simplified \\(3(x + 2) - 2(x - 1)\\) and got \\(x + 4\\). What went wrong?",
    options: [
      { text: "They added constants as 6-2=4 instead of 6+2=8", correct: true, feedback: "-2×(-1)=+2, so 3x+6-2x+2 = x+8, not x+4." },
      { text: "They subtracted the x-terms incorrectly", correct: false, feedback: "3x-2x=x is correct. The error is in the constants.", misconceptionId: "E-d16-a" },
      { text: "They forgot to expand the brackets", correct: false, feedback: "They did expand — 3(x+2)=3x+6 and -2(x-1)=-2x+2 are correct.", misconceptionId: "E-d16-b" },
      { text: "They made an error in the -2(x-1) expansion", correct: false, feedback: "-2×x=-2x and -2×(-1)=+2 are correct. The error is in adding 6+2=8, not 6-2=4.", misconceptionId: "E-d16-c" }
    ],
    backward: "Distributing a negative sign flips the sign of each term inside.",
    forward: "Error detection prevents mistakes in exams.",
    misconceptions: [
      {
        misconceptionId: "E-d16-a",
        description: "Student misdiagnoses the error, claiming the x-term subtraction (3x-2x=x) is wrong, when in fact it's correct and the actual error lies in combining the constants.",
        rootCause: "Error Location Misidentified — flags a correct step as the source of the error instead of the actual incorrect step.",
        remediation: "3x-2x=x IS correct — the actual error is in the CONSTANTS: 6 (from 3×2) and +2 (from -2×-1) should combine as 6+2=8 (both positive, so ADD), but the student got 6-2=4 (incorrectly subtracting)."
      },
      {
        misconceptionId: "E-d16-b",
        description: "Student claims the brackets weren't expanded at all, when in fact both were expanded correctly — the actual error is in how the resulting constants were combined.",
        rootCause: "Error Type Misidentified — diagnoses the error as an omission (skipped expansion) when it's actually a combination mistake.",
        remediation: "Both brackets WERE expanded correctly: 3(x+2)=3x+6 and -2(x-1)=-2x+2 — the error happens AFTER expansion, when combining 6 and 2: they should ADD (6+2=8, since -2×-1=+2 is positive), but were combined as 6-2=4 instead."
      },
      {
        misconceptionId: "E-d16-c",
        description: "Student claims the -2(x-1) expansion itself is wrong, when in fact -2×x=-2x and -2×(-1)=+2 are both correct — the actual error is in combining the resulting constants afterward.",
        rootCause: "Error Location Misidentified — flags a correct expansion step as the source of the error instead of the actual incorrect combination step.",
        remediation: "-2(x-1)=-2x+2 IS correctly expanded (negative×negative=positive for the constant term) — the actual error happens when COMBINING 6 and 2: they should ADD to 8, not be treated as 6-2=4."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Re-expand each bracket yourself, independently", hint: "3(x+2)=3x+6. -2(x-1)=-2x+2 (negative × negative = positive)." },
      { level: 2, description: "Combine the like terms with x", hint: "3x - 2x = x." },
      { level: 3, description: "Combine the constant terms correctly", hint: "6 + 2 = ? (both are positive, so add)" }
    ],
    forwardRiskLinks: [],
    learningObjectives: [] },
  { itemId: "d17", order: 17, cluster: "SUB", clusterName: CLUSTER_NAMES.SUB,
    skillId: "SUBEVAL-08",
    question: "Evaluate \\(5 - 2(x + 3)\\) when \\(x = -5\\).",
    options: [
      { text: "9", correct: true, feedback: "5 - 2(-5+3) = 5 - 2(-2) = 5 - (-4) = 5+4 = 9." },
      { text: "1", correct: false, feedback: "5 - 2(-2) = 5 - (-4) = 9, not 1. You may have forgotten the double negative.", misconceptionId: "E-d17-a" },
      { text: "\\(-9\\)", correct: false, feedback: "Check inside the brackets: -5+3=-2.", misconceptionId: "E-d17-b" },
      { text: "0", correct: false, feedback: "5 - 2(-2) = 5+4 = 9, not 0.", misconceptionId: "E-d17-c" }
    ],
    backward: "Parentheses first: compute inside, then multiply, then subtract.",
    forward: "Substituting into expressions with brackets is used in coordinate geometry.",
    misconceptions: [
      {
        misconceptionId: "E-d17-a",
        description: "Student treats 5-2(-2) as 5-4=1 instead of correctly handling the double negative (5-(-4)=5+4=9), dropping the sign that arises from multiplying 2 by -2.",
        rootCause: "Double Negative Not Simplified — fails to convert 'subtracting a negative' into 'adding a positive'.",
        remediation: "2×(-2)=-4, so the expression becomes 5-(-4), and subtracting a negative is the SAME as adding: 5-(-4)=5+4=9, not 5-4=1 (which drops the double-negative effect)."
      },
      {
        misconceptionId: "E-d17-b",
        description: "Student miscalculates the value inside the brackets, perhaps computing -5+3 as something other than -2, leading to an incorrect final answer.",
        rootCause: "Bracket Evaluation Error — miscalculates the value inside the parentheses before proceeding.",
        remediation: "Inside the brackets: x+3 with x=-5 gives -5+3=-2 (not a different value) — this must be computed correctly FIRST, before multiplying by -2 and subtracting from 5: 5-2(-2)=5+4=9."
      },
      {
        misconceptionId: "E-d17-c",
        description: "Student makes a combination of sign errors throughout the multi-step evaluation, landing on 0 instead of the correct 9.",
        rootCause: "Multiple Sign Errors Combined — mishandles more than one sign throughout the order-of-operations sequence.",
        remediation: "Work through each step carefully: inside the bracket, -5+3=-2; then 2×(-2)=-4; then 5-(-4)=5+4=9 — checking each step against this sequence catches where the sign errors occurred."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Evaluate inside the bracket first", hint: "x+3 = -5+3 = -2." },
      { level: 2, description: "Multiply by the outer coefficient", hint: "2 × (-2) = -4." },
      { level: 3, description: "Subtract from 5, simplifying the double negative", hint: "5 - (-4) = 5 + 4 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.EE.A.2C"] },
  { itemId: "d18", order: 18, cluster: "INDX", clusterName: CLUSTER_NAMES.INDX,
    skillId: "INDXDIVCOEF-01",
    question: "Simplify: \\(\\frac{6x^3}{3x}\\).",
    options: [
      { text: "\\(2x^2\\)", correct: true, feedback: "6÷3=2; x³/x = x²." },
      { text: "\\(2x^3\\)", correct: false, feedback: "x³/x = x², not x³. Subtract exponents.", misconceptionId: "E-d18-a" },
      { text: "\\(3x^2\\)", correct: false, feedback: "6÷3=2, not 3.", misconceptionId: "E-d18-b" },
      { text: "\\(2x\\)", correct: false, feedback: "x³/x = x², not x. Subtract exponents: 3-1=2.", misconceptionId: "E-d18-c" }
    ],
    backward: "Divide the numbers and subtract the exponents.",
    forward: "Simplifying fractions with powers is used in algebraic fractions.",
    misconceptions: [
      {
        misconceptionId: "E-d18-a",
        description: "Student correctly divides the numeric coefficients (6÷3=2) but forgets to reduce the exponent on x, keeping x³ unchanged instead of x².",
        rootCause: "Exponent Not Reduced During Division — divides the coefficients but leaves the variable's exponent untouched.",
        remediation: "The coefficients divide (6÷3=2) AND the exponents subtract (3-1=2, since x means x¹) — both parts must be simplified: 2x², not 2x³ (which leaves the exponent unreduced)."
      },
      {
        misconceptionId: "E-d18-b",
        description: "Student miscalculates the coefficient division, getting 6÷3=3 instead of 2, a basic arithmetic slip.",
        rootCause: "Computation Error — a basic division fact is computed incorrectly.",
        remediation: "6÷3=2, not 3 — recompute the coefficient division carefully: 2x², not 3x²."
      },
      {
        misconceptionId: "E-d18-c",
        description: "Student correctly divides the coefficients (6÷3=2) but over-reduces the exponent, computing 3-1 incorrectly or otherwise landing on x instead of x².",
        rootCause: "Exponent Subtraction Error — miscalculates the exponent subtraction, reducing it too far.",
        remediation: "x in the denominator has an implicit exponent of 1, so x³÷x¹=x^(3-1)=x², not x^(3-2)=x or a further-reduced power — the full answer is 2x², not 2x."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Divide the numeric coefficients", hint: "6 ÷ 3 = 2." },
      { level: 2, description: "Identify the implicit exponent of x in the denominator", hint: "x means x¹." },
      { level: 3, description: "Subtract the exponents for the variable part", hint: "x³ ÷ x¹: 3 - 1 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.EE.A.1"] },
  { itemId: "d19", order: 19, cluster: "EXP", clusterName: CLUSTER_NAMES.EXP,
    skillId: "EXPANDFOIL-01",
    question: "Expand and simplify: \\((x-1)(x+4)\\).",
    options: [
      { text: "\\(x^2 + 3x - 4\\)", correct: true, feedback: "x²+4x-x-4 = x²+3x-4." },
      { text: "\\(x^2 - 5x - 4\\)", correct: false, feedback: "-x+4x=+3x, not -5x. Check the signs.", misconceptionId: "E-d19-a" },
      { text: "\\(x^2 + 3x + 4\\)", correct: false, feedback: "-1×4=-4, not +4.", misconceptionId: "E-d19-b" },
      { text: "\\(x^2 + 5x - 4\\)", correct: false, feedback: "-x+4x=+3x, not +5x.", misconceptionId: "E-d19-c" }
    ],
    backward: "Watch the signs when multiplying.",
    forward: "Sign errors in expansion lead to incorrect factorisation.",
    misconceptions: [
      {
        misconceptionId: "E-d19-a",
        description: "Student combines the cross terms (-x and +4x) incorrectly, treating them as if they should both be subtracted or otherwise mishandling their signs, arriving at -5x instead of +3x.",
        rootCause: "Cross Term Sign Combination Error — mishandles the signs when combining the Outer and Inner products.",
        remediation: "The cross terms are -x (from x×-1... actually Outer: x×4=4x) and Inner: -1×x=-x — combining: 4x+(-x)=4x-x=3x, not -5x (which would require adding their magnitudes with a wrong sign)."
      },
      {
        misconceptionId: "E-d19-b",
        description: "Student computes the Last term (-1×4) as +4 instead of -4, mishandling the sign of a negative times a positive.",
        rootCause: "Sign Rule Confused — treats negative×positive as positive instead of negative.",
        remediation: "-1×4: negative×positive=NEGATIVE, so this equals -4, not +4 — the correct expansion is x²+3x-4, not x²+3x+4."
      },
      {
        misconceptionId: "E-d19-c",
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
  { itemId: "d20", order: 20, cluster: "FAC", clusterName: CLUSTER_NAMES.FAC,
    skillId: "FACTOR-04",
    question: "Factorise: \\(24x^4y^2 - 18x^3y^3\\).",
    options: [
      { text: "\\(6x^3y^2(4x - 3y)\\)", correct: true, feedback: "HCF of 24 and 18 is 6; lowest x is x³; lowest y is y²." },
      { text: "\\(3x^3y^2(8x - 6y)\\)", correct: false, feedback: "Not fully factorised. The HCF of 24 and 18 is 6, not 3.", misconceptionId: "E-d20-a" },
      { text: "\\(6x^4y^2(4 - 3y)\\)", correct: false, feedback: "The x-power inside is wrong.", misconceptionId: "E-d20-b" },
      { text: "\\(6x^3y^2(4x + 3y)\\)", correct: false, feedback: "The sign inside should be negative: 6x³y²×(-3y)=-18x³y³.", misconceptionId: "E-d20-c" }
    ],
    backward: "Find the highest common factor for both numbers and variables.",
    forward: "Factorising with high powers is used in algebraic fractions and calculus.",
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
  { itemId: "d21", order: 21, cluster: "CON", clusterName: CLUSTER_NAMES.CON,
    skillId: "CONSTRUCT-09",
    question: "A plumber charges \\(C = 40 + 25h\\). A job costs £165. How many hours did it take?",
    options: [
      { text: "5", correct: true, feedback: "165=40+25h → 125=25h → h=5." },
      { text: "6", correct: false, feedback: "25×6=150, plus 40=190, not 165.", misconceptionId: "E-d21-a" },
      { text: "4", correct: false, feedback: "25×4=100, plus 40=140, not 165.", misconceptionId: "E-d21-b" },
      { text: "7", correct: false, feedback: "25×7=175, plus 40=215, not 165.", misconceptionId: "E-d21-c" }
    ],
    backward: "Substitute C=165 and solve for h.",
    forward: "Solving a formula for an unknown is a key real-world skill.",
    misconceptions: [
      {
        misconceptionId: "E-d21-a",
        description: "Student guesses h=6, overshooting the correct value; checking 25×6+40=190 does not match the target 165.",
        rootCause: "Equation Not Solved Systematically — guesses a value instead of isolating h algebraically.",
        remediation: "Solve systematically: 165=40+25h, so subtract 40 from both sides (165-40=125=25h), then divide by 25 (125÷25=5) — this gives h=5 directly, rather than guessing values like 6 that don't check out (25×6+40=190≠165)."
      },
      {
        misconceptionId: "E-d21-b",
        description: "Student guesses h=4, undershooting the correct value; checking 25×4+40=140 does not match the target 165.",
        rootCause: "Equation Not Solved Systematically — guesses a value instead of isolating h algebraically.",
        remediation: "Solve systematically: 165=40+25h, so subtract 40 from both sides (165-40=125=25h), then divide by 25 (125÷25=5) — this gives h=5 directly, rather than guessing values like 4 that don't check out (25×4+40=140≠165)."
      },
      {
        misconceptionId: "E-d21-c",
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
    learningObjectives: ["CCSS.MATH.CONTENT.7.EE.B.4A"] },
  { itemId: "d22", order: 22, cluster: "DIS", clusterName: CLUSTER_NAMES.DIS,
    skillId: "DISTINGUISH-01",
    question: "Which of these is a formula?",
    options: [
      { text: "\\(v = u + at\\)", correct: true, feedback: "A formula shows a relationship between variables." },
      { text: "\\(3x - 7 = 0\\)", correct: false, feedback: "That's an equation — one unknown to solve.", misconceptionId: "E-d22-a" },
      { text: "\\(2a + 3b\\)", correct: false, feedback: "That's an expression.", misconceptionId: "E-d22-b" },
      { text: "\\(x = 3\\)", correct: false, feedback: "That's an equation stating x equals 3.", misconceptionId: "E-d22-c" }
    ],
    backward: "Expression no equals; equation one solution; formula relationship.",
    forward: "Recognising the type tells you what to do: solve, rearrange, or evaluate.",
    misconceptions: [
      {
        misconceptionId: "E-d22-a",
        description: "Student picks the equation (3x-7=0), not recognising that it has only one unknown to solve for, unlike a formula which relates multiple variables.",
        rootCause: "Equation/Formula Distinction Not Applied — doesn't check whether multiple variables are related versus a single unknown being solved.",
        remediation: "A FORMULA relates MULTIPLE variables to each other (like v=u+at, relating velocity, initial velocity, acceleration, and time) — 3x-7=0 has only ONE unknown (x) to solve for, making it an EQUATION, not a formula."
      },
      {
        misconceptionId: "E-d22-b",
        description: "Student picks the expression (2a+3b), not recognising that it has no equals sign at all, which rules it out as a formula.",
        rootCause: "Expression/Formula Distinction Not Applied — doesn't check for the defining feature (equals sign) that separates the two.",
        remediation: "A FORMULA has an equals sign showing a relationship — 2a+3b has NO equals sign, making it an EXPRESSION, not a formula; v=u+at (with an equals sign relating variables) is the formula."
      },
      {
        misconceptionId: "E-d22-c",
        description: "Student picks the equation (x=3), not recognising that it states a single unknown's value rather than a relationship between multiple variables.",
        rootCause: "Equation/Formula Distinction Not Applied — doesn't check whether multiple variables are related versus a single value being stated.",
        remediation: "A FORMULA relates MULTIPLE variables (like v=u+at) — x=3 states the value of a SINGLE unknown, making it an EQUATION, not a formula."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the defining feature of a formula", hint: "A formula shows a relationship between two or more variables." },
      { level: 2, description: "Check each option for multiple related variables", hint: "Which option relates more than one letter/variable to each other?" },
      { level: 3, description: "Confirm your choice", hint: "Does v=u+at relate velocity, initial velocity, acceleration, and time?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: [] },
  { itemId: "d23", order: 23, cluster: "EST", clusterName: CLUSTER_NAMES.EST,
    skillId: "ESTROUND-04",
    question: "Estimate \\((1.9)^2 + 2(1.9) - 3\\).",
    options: [
      { text: "5", correct: true, feedback: "Round 1.9 to 2. 2²+2×2-3 = 4+4-3 = 5." },
      { text: "6", correct: false, feedback: "You computed 4+5-3=6? 2×2=4, not 5.", misconceptionId: "E-d23-a" },
      { text: "4", correct: false, feedback: "You forgot the 2(1.9) term.", misconceptionId: "E-d23-b" },
      { text: "3", correct: false, feedback: "You rounded 1.9 to 1? Round to 2.", misconceptionId: "E-d23-c" }
    ],
    backward: "Round the input, then substitute and compute.",
    forward: "Estimation helps verify calculator results quickly.",
    misconceptions: [
      {
        misconceptionId: "E-d23-a",
        description: "Student miscalculates the second term, computing 2×2 as 5 instead of 4, a basic arithmetic slip.",
        rootCause: "Computation Error — a basic multiplication fact is computed incorrectly.",
        remediation: "2×2=4, not 5 — recompute the second term carefully: 4+4-3=5, not 4+5-3=6."
      },
      {
        misconceptionId: "E-d23-b",
        description: "Student computes only the squared term (2²=4) and the constant (-3), forgetting to include the middle term 2(1.9)≈2×2=4 entirely.",
        rootCause: "Term Omitted — drops an entire term from the expression during evaluation.",
        remediation: "The expression has THREE terms: (1.9)², 2(1.9), AND -3 — all three must be evaluated: 4+4-3=5, not just 4-3=1 or similar (which skips the middle term)."
      },
      {
        misconceptionId: "E-d23-c",
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
  { itemId: "d24", order: 24, cluster: "EXT", clusterName: CLUSTER_NAMES.EXT,
    skillId: "EXTIDENTITY-01",
    question: "Is it always true that \\((x+2)^2 - (x-2)^2 = 8x\\)?",
    options: [
      { text: "Yes, it simplifies to \\(8x\\)", correct: true, feedback: "(x²+4x+4)-(x²-4x+4)=8x." },
      { text: "No, it should be \\(4x\\)", correct: false, feedback: "Expand carefully: 4x+4x=8x, not 4x.", misconceptionId: "E-d24-a" },
      { text: "No, it should be 0", correct: false, feedback: "The terms don't cancel to zero.", misconceptionId: "E-d24-b" },
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
        description: "Student assumes the two squared expressions cancel to zero, perhaps confusing this with a difference-of-squares pattern that equals zero, without correctly expanding and simplifying.",
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
    question: "Evaluate \\(2x^2 + 3x - 1\\) when \\(x = -3\\).",
    options: [
      { text: "8", correct: true, feedback: "2×9 + (-9) - 1 = 18 - 9 - 1 = 8." },
      { text: "26", correct: false, feedback: "You treated 3x as +9 instead of -9.", misconceptionId: "E-r1-a" },
      { text: "-8", correct: false, feedback: "You squared -3 as -9. (-3)²=+9.", misconceptionId: "E-r1-b" },
      { text: "-28", correct: false, feedback: "You squared -3 as -9. (-3)²=+9.", misconceptionId: "E-r1-c" }
    ],
    misconceptions: [
      {
        misconceptionId: "E-r1-a",
        description: "Student drops the negative sign on the linear term, treating 3x (with x=-3) as +9 instead of -9.",
        rootCause: "Negative Substitution Sign Dropped — loses track of the negative sign when substituting x into the linear term.",
        remediation: "3x with x=-3 means 3×(-3)=-9 (NEGATIVE), not +9 — the full evaluation is 18+(-9)-1=8, not 18+9-1=26 (which drops the negative sign)."
      },
      {
        misconceptionId: "E-r1-b",
        description: "Student computes x² (with x=-3) as -9 instead of +9, treating the square of a negative number as negative.",
        rootCause: "Squaring Negative Numbers Misunderstood — believes squaring a negative gives a negative result.",
        remediation: "x²=(-3)²=(-3)×(-3)=+9 (negative×negative=positive) — a square is NEVER negative; the full evaluation is 2×9+(-9)-1=8, not 2×(-9)+(-9)-1=-28."
      },
      {
        misconceptionId: "E-r1-c",
        description: "Student computes x² (with x=-3) as -9 instead of +9, leading to a large negative result.",
        rootCause: "Squaring Negative Numbers Misunderstood — believes squaring a negative gives a negative result.",
        remediation: "x²=(-3)²=+9 (never negative) — the full evaluation is 2×9-9-1=8, not 2×(-9)-9-1=-28."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Substitute x=-3 into each term separately", hint: "2(-3)², 3(-3), and -1." },
      { level: 2, description: "Evaluate each term carefully with correct signs", hint: "(-3)²=+9, so 2×9=18. 3×(-3)=-9 (stays negative)." },
      { level: 3, description: "Combine all three terms", hint: "18 + (-9) - 1 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.EE.A.2C"] },
  { itemId: "r2", order: 2, cluster: "INDX", clusterName: CLUSTER_NAMES.INDX,
    skillId: "INDXDIV-01",
    question: "Simplify: \\(\\frac{x^8}{x^3}\\).",
    options: [
      { text: "\\(x^5\\)", correct: true, feedback: "Subtract exponents: 8-3=5." },
      { text: "\\(x^{11}\\)", correct: false, feedback: "You added the exponents. Subtract when dividing.", misconceptionId: "E-r2-a" },
      { text: "\\(x^{24}\\)", correct: false, feedback: "You multiplied the exponents. Subtract, don't multiply.", misconceptionId: "E-r2-b" },
      { text: "\\(x^3\\)", correct: false, feedback: "Subtract exponents, don't divide them.", misconceptionId: "E-r2-c" }
    ],
    misconceptions: [
      {
        misconceptionId: "E-r2-a",
        description: "Student adds the exponents (8+3=11) instead of subtracting them when dividing two powers with the same base.",
        rootCause: "Exponent Rule Confused — applies the ADD-exponents rule (for multiplying same-base powers) instead of the SUBTRACT-exponents rule (for dividing).",
        remediation: "When DIVIDING two powers with the SAME base, SUBTRACT the exponents: x⁸÷x³=x^(8-3)=x⁵ — adding them (8+3=11) would be the rule for MULTIPLYING same-base powers, not dividing."
      },
      {
        misconceptionId: "E-r2-b",
        description: "Student multiplies the exponents (8×3=24) instead of subtracting them.",
        rootCause: "Exponent Rule Confused — applies the MULTIPLY-exponents rule (for a power raised to another power) instead of the SUBTRACT-exponents rule (for dividing same-base powers).",
        remediation: "When DIVIDING same-base powers, SUBTRACT the exponents: x⁸÷x³=x^(8-3)=x⁵ — multiplying them (8×3=24) would be the rule for a power raised to another power, not for this division."
      },
      {
        misconceptionId: "E-r2-c",
        description: "Student divides the exponents (8÷3, mis-simplified to 3) instead of subtracting them.",
        rootCause: "Exponent Rule Confused — divides the exponents instead of subtracting them.",
        remediation: "When dividing same-base powers, SUBTRACT the exponents (not divide them): x⁸÷x³=x^(8-3)=x⁵, not x^(8÷3) or a rounded/misapplied value like x³."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify that the bases are the same", hint: "Both terms have base x." },
      { level: 2, description: "Recall the quotient-of-powers rule", hint: "Subtract the exponents." },
      { level: 3, description: "Compute the new exponent", hint: "8 - 3 = ?" }
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
      { text: "\\(x^2 + 5\\)", correct: false, feedback: "Don't forget the middle terms: 1x+4x=5x.", misconceptionId: "E-r3-c" }
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
      { text: "\\(5xy(4x - 3y)\\)", correct: true, feedback: "HCF of 20 and 15 is 5; lowest x is x; lowest y is y." },
      { text: "\\(5(4x^2y - 3xy^2)\\)", correct: false, feedback: "xy can be taken out. Both terms contain x and y.", misconceptionId: "E-r4-a" },
      { text: "\\(5x(4xy - 3y^2)\\)", correct: false, feedback: "y is also a common factor.", misconceptionId: "E-r4-b" },
      { text: "\\(5y(4x^2 - 3xy)\\)", correct: false, feedback: "x is also a common factor.", misconceptionId: "E-r4-c" }
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
  { itemId: "r5", order: 5, cluster: "CON", clusterName: CLUSTER_NAMES.CON,
    skillId: "CONSTRUCT-07",
    question: "Write an expression for 'twice the difference between a number \\(n\\) and 7'.",
    options: [
      { text: "\\(2(n - 7)\\)", correct: true, feedback: "The difference is n-7, then doubled." },
      { text: "\\(2n - 7\\)", correct: false, feedback: "That's twice n minus 7, not twice the difference.", misconceptionId: "E-r5-a" },
      { text: "\\(2(7 - n)\\)", correct: false, feedback: "That's twice the difference the other way around.", misconceptionId: "E-r5-b" },
      { text: "\\(n - 14\\)", correct: false, feedback: "You multiplied only the 7 by 2.", misconceptionId: "E-r5-c" }
    ],
    misconceptions: [
      {
        misconceptionId: "E-r5-a",
        description: "Student applies 'twice' only to n and not to the entire difference (n-7), writing 2n-7 instead of doubling the whole difference.",
        rootCause: "Scope of Multiplication Misread — applies the multiplier to only part of the phrase instead of the entire quantity it should scale.",
        remediation: "'Twice THE DIFFERENCE between n and 7' means the ENTIRE difference (n-7) is doubled, not just the n — find the difference first, then multiply: 2(n-7), not 2n-7 (which only doubles n)."
      },
      {
        misconceptionId: "E-r5-b",
        description: "Student reverses the order inside the difference, writing 7-n instead of n-7, before doubling.",
        rootCause: "Difference Order Reversed — computes the difference in the wrong order (constant minus variable instead of variable minus constant).",
        remediation: "'The difference between n and 7' means n-7 (n comes first, matching the order it's named in the phrase) — 2(n-7), not 2(7-n) which reverses the order and gives a different expression."
      },
      {
        misconceptionId: "E-r5-c",
        description: "Student multiplies only the 7 by 2 (getting 14) and subtracts that from n, instead of multiplying the entire difference (n-7) by 2.",
        rootCause: "Scope of Multiplication Misread — applies the multiplier to only one part of the difference instead of the entire bracketed quantity.",
        remediation: "The 2 must multiply the WHOLE difference (n-7), not just the 7 — find n-7 first, then multiply by 2: 2(n-7), not n-14 (which only multiplies the 7 by 2 and leaves n unmultiplied)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Translate 'the difference between n and 7'", hint: "This part is n-7 (n first, since it's named first)." },
      { level: 2, description: "Recognise that 'twice' applies to the whole difference", hint: "'Twice' means the entire quantity (n-7) is multiplied by 2." },
      { level: 3, description: "Combine into an expression", hint: "2(n - 7)." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.EE.A.2A"] },
  { itemId: "r6", order: 6, cluster: "DIS", clusterName: CLUSTER_NAMES.DIS,
    skillId: "DISTINGUISH-04",
    question: "Which of these can be rearranged to find \\(x\\)?",
    options: [
      { text: "\\(y = 3x - 2\\)", correct: true, feedback: "A formula can be rearranged to make x the subject." },
      { text: "\\(3x - 2\\)", correct: false, feedback: "That's an expression — nothing to rearrange.", misconceptionId: "E-r6-a" },
      { text: "\\(3x - 2 = 10\\)", correct: false, feedback: "An equation can be solved, not rearranged.", misconceptionId: "E-r6-b" },
      { text: "None of them", correct: false, feedback: "A formula can be rearranged.", misconceptionId: "E-r6-c" }
    ],
    misconceptions: [
      {
        misconceptionId: "E-r6-a",
        description: "Student picks the expression (3x-2), not recognising that without an equals sign, there is nothing to rearrange.",
        rootCause: "Expression Mistaken for Rearrangeable Formula — treats a bare expression as if it could be rearranged like a formula.",
        remediation: "An EXPRESSION (like 3x-2) has NO equals sign — there is nothing to rearrange or isolate a variable in; y=3x-2 (a formula relating x and y) CAN be rearranged to make x the subject."
      },
      {
        misconceptionId: "E-r6-b",
        description: "Student picks the equation (3x-2=10), not recognising that an equation with one unknown is typically SOLVED for a specific value, whereas a formula relating multiple variables is REARRANGED.",
        rootCause: "Equation/Formula Rearrangement Distinction Not Applied — confuses solving an equation (finding a specific value) with rearranging a formula (isolating a variable symbolically).",
        remediation: "An EQUATION (like 3x-2=10) with one unknown is SOLVED to find a specific number — a FORMULA (like y=3x-2) relating two variables is REARRANGED to isolate one variable in terms of the other, without needing a specific numeric answer."
      },
      {
        misconceptionId: "E-r6-c",
        description: "Student believes none of the options can be rearranged, not recognising that a formula relating multiple variables can be algebraically rearranged to isolate any one of them.",
        rootCause: "Formula Rearrangement Not Recognised — doesn't understand that a formula's relationship between variables allows isolating any one of them.",
        remediation: "y=3x-2 IS a formula relating x and y — it CAN be rearranged algebraically to make x the subject: x=(y+2)/3 — formulas are specifically designed to be rearranged this way."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall that only formulas (relating multiple variables) can be rearranged", hint: "Look for an option with two different letters/variables and an equals sign." },
      { level: 2, description: "Check each option for the defining feature of a formula", hint: "y=3x-2 relates x and y." },
      { level: 3, description: "Confirm your choice", hint: "Can y=3x-2 be algebraically rearranged to isolate x?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.HSA-CED.A.4"] },
  { itemId: "r7", order: 7, cluster: "EST", clusterName: CLUSTER_NAMES.EST,
    skillId: "ESTROUND-04",
    question: "Estimate \\(5x^2\\) when \\(x = 3.9\\).",
    options: [
      { text: "80", correct: true, feedback: "Round 3.9 to 4. 5×16=80." },
      { text: "75", correct: false, feedback: "That's close to the exact value. Estimate by rounding.", misconceptionId: "E-r7-a" },
      { text: "60", correct: false, feedback: "4²=16, 5×16=80, not 60.", misconceptionId: "E-r7-b" },
      { text: "100", correct: false, feedback: "You rounded 3.9 to 5? Round to 4.", misconceptionId: "E-r7-c" }
    ],
    misconceptions: [
      {
        misconceptionId: "E-r7-a",
        description: "Student computes something close to the exact value (using 3.9 directly, or a near-approximation) instead of rounding x first, missing the point of estimation entirely.",
        rootCause: "Rounding Step Skipped — computes using the unrounded input instead of first rounding as an estimation problem requires.",
        remediation: "The question asks for an ESTIMATE, which means round the input FIRST, then compute: 3.9 rounds to 4, so 5×4²=80 — using the unrounded value 3.9 skips the required rounding step."
      },
      {
        misconceptionId: "E-r7-b",
        description: "Student rounds correctly to 4 but makes an arithmetic error computing 5×16, or miscalculates 4² itself, landing on 60 instead of 80.",
        rootCause: "Computation Error — the squaring or final multiplication step is mishandled.",
        remediation: "4²=16, then 5×16=80 — recompute carefully: 60 doesn't match either 4²=16 or 5×16=80, suggesting a step was miscalculated."
      },
      {
        misconceptionId: "E-r7-c",
        description: "Student rounds 3.9 up to 5 instead of to the nearest whole number, 4, rounding by too much.",
        rootCause: "Rounding Direction Error — rounds to a value farther from the input than the true nearest whole number.",
        remediation: "3.9 is closer to 4 than to 5 (since 3.9 rounds to the NEAREST whole number, which is 4, not 5) — round to 4, then 5×4²=80, not 5×5²=125 (which uses the wrong rounded value, 5)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Round the input value to the nearest whole number", hint: "3.9 rounds to 4." },
      { level: 2, description: "Square the rounded value", hint: "4² = 16." },
      { level: 3, description: "Multiply by the coefficient", hint: "5 × 16 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.7.EE.B.3"] },
  { itemId: "r8", order: 8, cluster: "EXT", clusterName: CLUSTER_NAMES.EXT,
    skillId: "CONSTRUCT-09",
    question: "A plumber charges \\(C = 50 + 30h\\). A job costs £200. How many hours?",
    options: [
      { text: "5", correct: true, feedback: "200-50=150; 150÷30=5." },
      { text: "6", correct: false, feedback: "30×6=180, plus 50=230, not 200.", misconceptionId: "E-r8-a" },
      { text: "4", correct: false, feedback: "30×4=120, plus 50=170, not 200.", misconceptionId: "E-r8-b" },
      { text: "7", correct: false, feedback: "30×7=210, plus 50=260, not 200.", misconceptionId: "E-r8-c" }
    ],
    misconceptions: [
      {
        misconceptionId: "E-r8-a",
        description: "Student guesses h=6, overshooting the correct value; checking 30×6+50=230 does not match the target 200.",
        rootCause: "Equation Not Solved Systematically — guesses a value instead of isolating h algebraically.",
        remediation: "Solve systematically: 200=50+30h, so subtract 50 from both sides (200-50=150=30h), then divide by 30 (150÷30=5) — this gives h=5 directly, rather than guessing values like 6 that don't check out (30×6+50=230≠200)."
      },
      {
        misconceptionId: "E-r8-b",
        description: "Student guesses h=4, undershooting the correct value; checking 30×4+50=170 does not match the target 200.",
        rootCause: "Equation Not Solved Systematically — guesses a value instead of isolating h algebraically.",
        remediation: "Solve systematically: 200=50+30h, so subtract 50 from both sides (200-50=150=30h), then divide by 30 (150÷30=5) — this gives h=5 directly, rather than guessing values like 4 that don't check out (30×4+50=170≠200)."
      },
      {
        misconceptionId: "E-r8-c",
        description: "Student guesses h=7, overshooting the correct value; checking 30×7+50=260 does not match the target 200.",
        rootCause: "Equation Not Solved Systematically — guesses a value instead of isolating h algebraically.",
        remediation: "Solve systematically: 200=50+30h, so subtract 50 from both sides (200-50=150=30h), then divide by 30 (150÷30=5) — this gives h=5 directly, rather than guessing values like 7 that don't check out (30×7+50=260≠200)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Substitute the known cost into the formula", hint: "200 = 50 + 30h." },
      { level: 2, description: "Isolate the term with h by subtracting the constant", hint: "200 - 50 = 30h." },
      { level: 3, description: "Divide to solve for h", hint: "150 ÷ 30 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.7.EE.B.4A"] },
  { itemId: "r9", order: 9, cluster: "SUB", clusterName: CLUSTER_NAMES.SUB,
    skillId: "SUBEVAL-04",
    question: "If \\(a = -2, b = 3\\), evaluate \\(a^2b + ab^2\\).",
    options: [
      { text: "-6", correct: true, feedback: "4×3 + (-2)×9 = 12 - 18 = -6." },
      { text: "6", correct: false, feedback: "ab²=(-2)×9=-18. 12+(-18)=-6.", misconceptionId: "E-r9-a" },
      { text: "30", correct: false, feedback: "You treated ab² as +18. (-2)×9=-18.", misconceptionId: "E-r9-b" },
      { text: "-30", correct: false, feedback: "You treated a²b as -12. (-2)²=+4.", misconceptionId: "E-r9-c" }
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
      { text: "\\(x^6\\)", correct: false, feedback: "Don't forget to multiply by the extra x at the end.", misconceptionId: "E-r10-a" },
      { text: "\\(x^5\\)", correct: false, feedback: "3×2=6, plus 1=7, not 5.", misconceptionId: "E-r10-b" },
      { text: "\\(x^8\\)", correct: false, feedback: "6+1=7, not 8.", misconceptionId: "E-r10-c" }
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
  { itemId: "r11", order: 11, cluster: "FAC", clusterName: CLUSTER_NAMES.FAC,
    skillId: "FACTOR-03",
    question: "Factorise completely: \\(-12x - 18\\).",
    options: [
      { text: "-6(2x + 3)", correct: true, feedback: "The HCF is -6. Inside signs flip." },
      { text: "6(-2x - 3)", correct: false, feedback: "Take out -6, not 6.", misconceptionId: "E-r11-a" },
      { text: "-6(2x - 3)", correct: false, feedback: "-6 × -3 = +18, but we need -18.", misconceptionId: "E-r11-b" },
      { text: "-3(4x + 6)", correct: false, feedback: "Not the highest common factor.", misconceptionId: "E-r11-c" }
    ],
    misconceptions: [
      {
        misconceptionId: "E-r11-a",
        description: "Student factors out the positive HCF (6) instead of the negative HCF (-6), leaving negative signs still inside the bracket instead of flipping them out.",
        rootCause: "Negative HCF Not Extracted — factors out only the positive magnitude of the common factor, not its negative sign.",
        remediation: "When both terms are negative (-12x and -18), factor out the NEGATIVE common factor -6, which flips the signs inside to positive: -6(2x+3) — factoring out just +6 leaves negative signs inside: 6(-2x-3), which is not the conventional fully factorised form."
      },
      {
        misconceptionId: "E-r11-b",
        description: "Student factors out -6 correctly but keeps the wrong sign inside the bracket, writing -3 instead of +3.",
        rootCause: "Sign Dropped During Factoring — loses track of how dividing by a negative flips the sign inside.",
        remediation: "-18 divided by -6 gives POSITIVE 3 (negative÷negative=positive) — the inside should be (2x+3), not (2x-3): -6(2x+3), not -6(2x-3) (which would multiply back to -12x+18, not -12x-18)."
      },
      {
        misconceptionId: "E-r11-c",
        description: "Student factors out 3, a common factor, but doesn't check that a LARGER common factor (6, with its sign) also exists.",
        rootCause: "Not the Highest Common Factor — factors out A common factor but not the HIGHEST one.",
        remediation: "3 IS a common factor of 12 and 18, but it's not the HIGHEST — 6 is also common (12÷6=2, 18÷6=3) and larger than 3, so the fully factorised form uses -6: -6(2x+3), not the incompletely factorised -3(4x+6)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the highest common factor, including the sign", hint: "Both terms are negative, so factor out -6." },
      { level: 2, description: "Divide each term by -6, tracking the sign flip", hint: "-12x÷(-6)=2x. -18÷(-6)=+3 (negative÷negative=positive)." },
      { level: 3, description: "Write the factorised form", hint: "-6(2x + 3)." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.7.EE.A.1"] },
  { itemId: "r12", order: 12, cluster: "EXP", clusterName: CLUSTER_NAMES.EXP,
    skillId: "EXPANDFOIL-01",
    question: "Expand and simplify: \\((3x-2)(x+1)\\).",
    options: [
      { text: "\\(3x^2 + x - 2\\)", correct: true, feedback: "3x²+3x-2x-2 = 3x²+x-2." },
      { text: "\\(3x^2 - x - 2\\)", correct: false, feedback: "3x-2x=+x, not -x.", misconceptionId: "E-r12-a" },
      { text: "\\(3x^2 + 5x - 2\\)", correct: false, feedback: "-2x+3x=x, not 5x.", misconceptionId: "E-r12-b" },
      { text: "\\(3x^2 + x + 2\\)", correct: false, feedback: "-2×1=-2, not +2.", misconceptionId: "E-r12-c" }
    ],
    misconceptions: [
      {
        misconceptionId: "E-r12-a",
        description: "Student mishandles the sign when combining the cross terms, treating 3x-2x as -x instead of +x.",
        rootCause: "Cross Term Sign Combination Error — mishandles the signs when combining the Outer and Inner products.",
        remediation: "The cross terms are Outer: 3x×1=3x and Inner: -2×x=-2x — combining: 3x+(-2x)=3x-2x=+x (positive, since 3x is larger in magnitude), not -x (which would result from an incorrect sign treatment)."
      },
      {
        misconceptionId: "E-r12-b",
        description: "Student adds the magnitudes of the cross terms (2x+3x=5x) instead of correctly combining them with their signs (3x-2x=x).",
        rootCause: "Cross Term Sign Combination Error — adds the magnitudes of the cross terms instead of combining them with their correct signs.",
        remediation: "The cross terms are 3x (Outer, positive) and -2x (Inner, negative) — they must combine WITH their signs: 3x+(-2x)=x, not 3x+2x=5x (which ignores the negative sign on the Inner term)."
      },
      {
        misconceptionId: "E-r12-c",
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
    learningObjectives: ["CCSS.MATH.CONTENT.HSA-APR.A.1"] }
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

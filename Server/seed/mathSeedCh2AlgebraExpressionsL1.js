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
    skillId: "SUBEVAL-01",
    question: "If \\(x = 5\\), find \\(x + 8\\).",
    options: [
      { text: "13", correct: true, feedback: "Correct. 5 + 8 = 13." },
      { text: "58", correct: false, feedback: "You wrote the numbers together instead of adding them.", misconceptionId: "E-w1-a" },
      { text: "3", correct: false, feedback: "You subtracted instead of adding.", misconceptionId: "E-w1-b" },
      { text: "-3", correct: false, feedback: "You subtracted and got the sign wrong.", misconceptionId: "E-w1-c" }
    ],
    retryHint: "Add 8 to 5.",
    misconceptions: [
      {
        misconceptionId: "E-w1-a",
        description: "Student concatenates the digits (writing '5' and '8' together as '58') instead of performing the addition operation.",
        rootCause: "Substitution Treated as Concatenation — writes the substituted value next to the other number instead of computing.",
        remediation: "x+8 means ADD the value of x to 8 — after substituting x=5, compute 5+8=13, not write the digits together as 58."
      },
      {
        misconceptionId: "E-w1-b",
        description: "Student subtracts instead of adding, computing 5-8 or 8-5 instead of 5+8.",
        rootCause: "Operation Reversed — subtracts when the expression specifies addition.",
        remediation: "The expression says x PLUS 8, which means ADD — 5+8=13, not subtract (5-8=-3 or 8-5=3)."
      },
      {
        misconceptionId: "E-w1-c",
        description: "Student subtracts instead of adding, and also gets the sign of the subtraction wrong, landing on -3.",
        rootCause: "Operation Reversed — subtracts when the expression specifies addition.",
        remediation: "The expression says x PLUS 8, which means ADD — 5+8=13, not subtract in either direction."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Substitute the value of x", hint: "Replace x with 5: 5 + 8." },
      { level: 2, description: "Identify the operation", hint: "'Plus' means addition." },
      { level: 3, description: "Compute", hint: "5 + 8 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.EE.A.2C"] },
  { itemId: "w2", order: 2, cluster: "SUB", clusterName: CLUSTER_NAMES.SUB,
    skillId: "SUBEVAL-02",
    question: "If \\(y = 10\\), evaluate \\(2y - 3\\).",
    options: [
      { text: "17", correct: true, feedback: "Correct. 2×10 - 3 = 20 - 3 = 17." },
      { text: "7", correct: false, feedback: "You subtracted first (10-3=7) then multiplied. Order is multiply first.", misconceptionId: "E-w2-a" },
      { text: "23", correct: false, feedback: "You added instead of subtracting.", misconceptionId: "E-w2-b" },
      { text: "-17", correct: false, feedback: "You got the sign of the subtraction wrong.", misconceptionId: "E-w2-c" }
    ],
    retryHint: "Replace y with 10, then multiply before subtracting.",
    misconceptions: [
      {
        misconceptionId: "E-w2-a",
        description: "Student subtracts 3 from y first (10-3=7) before multiplying by 2, instead of following the correct order of operations.",
        rootCause: "Order of Operations Not Applied — subtracts before multiplying instead of following precedence rules.",
        remediation: "MULTIPLICATION happens before SUBTRACTION — compute 2×10=20 first, THEN subtract 3: 20-3=17, not (10-3)×2=14 or a similar reversed-order result (7)."
      },
      {
        misconceptionId: "E-w2-b",
        description: "Student adds 3 instead of subtracting, computing 2×10+3=23 instead of 2×10-3=17.",
        rootCause: "Operation Reversed — adds when the expression specifies subtraction.",
        remediation: "The expression says 2y MINUS 3, not plus 3 — 20-3=17, not 20+3=23."
      },
      {
        misconceptionId: "E-w2-c",
        description: "Student makes a sign error in the final subtraction, landing on a negative result instead of the correct positive 17.",
        rootCause: "Computation Error — a sign is mishandled in the final step.",
        remediation: "Recompute carefully: 2×10=20, then 20-3=17, not -17."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Substitute the value of y", hint: "Replace y with 10: 2×10 - 3." },
      { level: 2, description: "Apply order of operations", hint: "Multiplication comes before subtraction." },
      { level: 3, description: "Compute", hint: "20 - 3 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.EE.A.2C"] },
  { itemId: "w3", order: 3, cluster: "INDX", clusterName: CLUSTER_NAMES.INDX,
    skillId: "INDXMUL-01",
    question: "Simplify: \\(x^3 \\times x^2\\).",
    options: [
      { text: "\\(x^5\\)", correct: true, feedback: "Add the exponents: 3 + 2 = 5." },
      { text: "\\(x^6\\)", correct: false, feedback: "You multiplied the exponents instead of adding.", misconceptionId: "E-w3-a" },
      { text: "\\(x^1\\)", correct: false, feedback: "You subtracted the exponents. Subtract when dividing, not multiplying.", misconceptionId: "E-w3-b" },
      { text: "\\(2x^5\\)", correct: false, feedback: "The coefficient is 1, not 2.", misconceptionId: "E-w3-c" }
    ],
    retryHint: "When multiplying powers, add the exponents.",
    misconceptions: [
      {
        misconceptionId: "E-w3-a",
        description: "Student multiplies the exponents (3×2=6) instead of adding them when multiplying two powers with the same base.",
        rootCause: "Exponent Rule Confused — applies the MULTIPLY-exponents rule (for a power raised to another power) instead of the ADD-exponents rule (for multiplying same-base powers).",
        remediation: "When MULTIPLYING two powers with the SAME base, ADD the exponents: x³×x²=x^(3+2)=x⁵ — multiplying them (3×2=6) would be the rule for a power raised to another power, like (x³)², not for this expression."
      },
      {
        misconceptionId: "E-w3-b",
        description: "Student subtracts the exponents (3-2=1) instead of adding them, applying the division rule to a multiplication problem.",
        rootCause: "Exponent Rule Confused — applies the SUBTRACT-exponents rule (for dividing same-base powers) instead of the ADD-exponents rule (for multiplying).",
        remediation: "SUBTRACT the exponents only when DIVIDING same-base powers — when MULTIPLYING, ADD them: x³×x²=x^(3+2)=x⁵, not x^(3-2)=x¹."
      },
      {
        misconceptionId: "E-w3-c",
        description: "Student adds an unnecessary coefficient of 2, perhaps confusing the number of terms being multiplied with a scaling factor.",
        rootCause: "Extraneous Coefficient Added — introduces a coefficient that doesn't belong in the simplified expression.",
        remediation: "x³×x² simplifies to x⁵ with coefficient 1 (implied, not written) — there's no reason to introduce a coefficient of 2; the answer is x⁵, not 2x⁵."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify that the bases are the same", hint: "Both terms have base x." },
      { level: 2, description: "Recall the product-of-powers rule", hint: "Add the exponents together." },
      { level: 3, description: "Compute the new exponent", hint: "3 + 2 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.EE.A.1"] },
  { itemId: "w4", order: 4, cluster: "INDX", clusterName: CLUSTER_NAMES.INDX,
    skillId: "INDXDIV-01",
    question: "Simplify: \\(\\frac{x^5}{x^2}\\).",
    options: [
      { text: "\\(x^3\\)", correct: true, feedback: "Subtract the exponents: 5 - 2 = 3." },
      { text: "\\(x^7\\)", correct: false, feedback: "You added the exponents. Add when multiplying, not dividing.", misconceptionId: "E-w4-a" },
      { text: "\\(x^{10}\\)", correct: false, feedback: "You multiplied the exponents.", misconceptionId: "E-w4-b" },
      { text: "\\(x^{2.5}\\)", correct: false, feedback: "Don't divide the exponents; subtract them.", misconceptionId: "E-w4-c" }
    ],
    retryHint: "When dividing powers, subtract the exponents.",
    misconceptions: [
      {
        misconceptionId: "E-w4-a",
        description: "Student adds the exponents (5+2=7) instead of subtracting them when dividing two powers with the same base.",
        rootCause: "Exponent Rule Confused — applies the ADD-exponents rule (for multiplying same-base powers) instead of the SUBTRACT-exponents rule (for dividing).",
        remediation: "When DIVIDING two powers with the SAME base, SUBTRACT the exponents: x⁵÷x²=x^(5-2)=x³ — adding them (5+2=7) would be the rule for MULTIPLYING same-base powers, not dividing."
      },
      {
        misconceptionId: "E-w4-b",
        description: "Student multiplies the exponents (5×2=10) instead of subtracting them.",
        rootCause: "Exponent Rule Confused — applies the MULTIPLY-exponents rule (for a power raised to another power) instead of the SUBTRACT-exponents rule (for dividing same-base powers).",
        remediation: "When DIVIDING same-base powers, SUBTRACT the exponents: x⁵÷x²=x^(5-2)=x³ — multiplying them (5×2=10) would be the rule for a power raised to another power, not for this division."
      },
      {
        misconceptionId: "E-w4-c",
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
  { itemId: "w5", order: 5, cluster: "EXP", clusterName: CLUSTER_NAMES.EXP,
    skillId: "EXPAND-01",
    question: "Expand: \\(3(x + 2)\\).",
    options: [
      { text: "\\(3x + 6\\)", correct: true, feedback: "Multiply both terms inside by 3." },
      { text: "\\(3x + 2\\)", correct: false, feedback: "You forgot to multiply the 2 by 3.", misconceptionId: "E-w5-a" },
      { text: "\\(x + 6\\)", correct: false, feedback: "You multiplied only the 2 by 3.", misconceptionId: "E-w5-b" },
      { text: "\\(5x\\)", correct: false, feedback: "You added inside the brackets first. 3(x+2) means multiply.", misconceptionId: "E-w5-c" }
    ],
    retryHint: "Multiply both terms inside the parentheses by 3.",
    misconceptions: [
      {
        misconceptionId: "E-w5-a",
        description: "Student multiplies only the first term (x) by 3, forgetting to also multiply the 2, leaving it unchanged.",
        rootCause: "Distribution Incomplete — applies the multiplier to only one of the two terms inside the bracket.",
        remediation: "The 3 must multiply BOTH terms inside the bracket — 3×x=3x AND 3×2=6, giving 3x+6, not just 3x+2 (which leaves the 2 unmultiplied)."
      },
      {
        misconceptionId: "E-w5-b",
        description: "Student multiplies only the second term (2) by 3, forgetting to also multiply the x, leaving it unchanged.",
        rootCause: "Distribution Incomplete — applies the multiplier to only one of the two terms inside the bracket.",
        remediation: "The 3 must multiply BOTH terms inside the bracket — 3×x=3x AND 3×2=6, giving 3x+6, not just x+6 (which leaves the x unmultiplied)."
      },
      {
        misconceptionId: "E-w5-c",
        description: "Student adds x and 2 together first (getting x+2, then combining with the 3 somehow to reach 5x), misreading the bracket notation as requiring addition instead of multiplication.",
        rootCause: "Multiplication Notation Misread as Addition — treats 3(x+2) as if the 3 should be added to the bracket's contents rather than distributed via multiplication.",
        remediation: "3(x+2) means 3 MULTIPLIED by the bracket (x+2), not added to it — distribute: 3×x+3×2=3x+6, not adding 3 to x and 2 to get 5x (which misunderstands the notation entirely)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify what's being multiplied", hint: "3 must multiply EVERY term inside the bracket." },
      { level: 2, description: "Multiply the first term", hint: "3 × x = 3x." },
      { level: 3, description: "Multiply the second term", hint: "3 × 2 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.7.EE.A.1"] },
  { itemId: "w6", order: 6, cluster: "EXP", clusterName: CLUSTER_NAMES.EXP,
    skillId: "EXPAND-02",
    question: "Expand: \\(4(2m - 1)\\).",
    options: [
      { text: "\\(8m - 4\\)", correct: true, feedback: "4×2m=8m, 4×(-1)=-4." },
      { text: "\\(8m - 1\\)", correct: false, feedback: "You only multiplied the first term by 4.", misconceptionId: "E-w6-a" },
      { text: "\\(2m - 4\\)", correct: false, feedback: "You only multiplied the second term by 4.", misconceptionId: "E-w6-b" },
      { text: "\\(8m + 4\\)", correct: false, feedback: "4×(-1)=-4, not +4.", misconceptionId: "E-w6-c" }
    ],
    retryHint: "Multiply both terms inside by 4.",
    misconceptions: [
      {
        misconceptionId: "E-w6-a",
        description: "Student multiplies only the first term (2m) by 4, forgetting to also multiply the -1.",
        rootCause: "Distribution Incomplete — applies the multiplier to only one of the two terms inside the bracket.",
        remediation: "The 4 must multiply BOTH terms — 4×2m=8m AND 4×(-1)=-4, giving 8m-4, not just 8m-1 (which leaves the -1 unmultiplied)."
      },
      {
        misconceptionId: "E-w6-b",
        description: "Student multiplies only the second term (-1) by 4, forgetting to also multiply the 2m.",
        rootCause: "Distribution Incomplete — applies the multiplier to only one of the two terms inside the bracket.",
        remediation: "The 4 must multiply BOTH terms — 4×2m=8m AND 4×(-1)=-4, giving 8m-4, not just 2m-4 (which leaves the 2m unmultiplied)."
      },
      {
        misconceptionId: "E-w6-c",
        description: "Student drops the negative sign on the second term, computing 4×(-1) as +4 instead of -4.",
        rootCause: "Sign Dropped During Distribution — loses track of the negative sign while multiplying.",
        remediation: "4×(-1)=-4 (positive times negative is negative), not +4 — the correct expansion is 8m-4, not 8m+4."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify what's being multiplied", hint: "4 must multiply EVERY term inside the bracket, including its sign." },
      { level: 2, description: "Multiply the first term", hint: "4 × 2m = 8m." },
      { level: 3, description: "Multiply the second term, keeping the sign", hint: "4 × (-1) = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.7.EE.A.1"] },
  { itemId: "w7", order: 7, cluster: "FAC", clusterName: CLUSTER_NAMES.FAC,
    skillId: "FACTOR-01",
    question: "Factorise: \\(5x + 10\\).",
    options: [
      { text: "\\(5(x + 2)\\)", correct: true, feedback: "5 is the common factor." },
      { text: "\\(5x + 10\\) is already factorised", correct: false, feedback: "A common factor of 5 can be taken out.", misconceptionId: "E-w7-a" },
      { text: "\\(5(x + 10)\\)", correct: false, feedback: "5×10=50, not 10. The inside should be x+2.", misconceptionId: "E-w7-b" },
      { text: "\\(x(5 + 10)\\)", correct: false, feedback: "x is not a common factor of both terms.", misconceptionId: "E-w7-c" }
    ],
    retryHint: "Look for the largest number that divides both terms.",
    misconceptions: [
      {
        misconceptionId: "E-w7-a",
        description: "Student assumes the expression cannot be factorised further, not recognising that 5 is a common factor of both 5x and 10.",
        rootCause: "Common Factor Not Recognised — fails to identify that both terms share a factor.",
        remediation: "Check each term: 5x has factor 5, and 10=5×2 also has factor 5 — since BOTH terms share the factor 5, the expression CAN be factorised: 5(x+2), not left as 5x+10."
      },
      {
        misconceptionId: "E-w7-b",
        description: "Student factors out 5 but writes the wrong value inside the bracket, using 10 instead of 2 (forgetting to divide 10 by 5).",
        rootCause: "Division Step Skipped Inside Bracket — factors out the common number but doesn't divide the second term by it.",
        remediation: "After factoring out 5, you must DIVIDE each term by 5: 5x÷5=x and 10÷5=2, giving 5(x+2) — not 5(x+10), which would multiply back to 5x+50, not 5x+10."
      },
      {
        misconceptionId: "E-w7-c",
        description: "Student factors out x instead of the correct numeric common factor 5, even though x is not a factor of the constant term 10.",
        rootCause: "Wrong Common Factor Identified — picks a factor that doesn't actually divide both terms.",
        remediation: "x is a factor of 5x, but x is NOT a factor of 10 (10 is just a number, no x in it) — the actual common factor is 5, giving 5(x+2), not x(5+10) (which incorrectly treats x as dividing 10)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the common factor of 5x and 10", hint: "5 divides both 5x and 10." },
      { level: 2, description: "Divide each term by the common factor", hint: "5x÷5=x. 10÷5=2." },
      { level: 3, description: "Write the factorised form", hint: "5(x + 2)." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.7.EE.A.1"] },
  { itemId: "w8", order: 8, cluster: "FAC", clusterName: CLUSTER_NAMES.FAC,
    skillId: "FACTOR-01",
    question: "Factorise: \\(8a - 12\\).",
    options: [
      { text: "\\(4(2a - 3)\\)", correct: true, feedback: "The highest common factor is 4." },
      { text: "\\(2(4a - 6)\\)", correct: false, feedback: "Not fully factorised; the HCF is 4, not 2.", misconceptionId: "E-w8-a" },
      { text: "\\(4(2a + 3)\\)", correct: false, feedback: "The sign inside should be negative, not positive.", misconceptionId: "E-w8-b" },
      { text: "\\(8(a - 1.5)\\)", correct: false, feedback: "Not fully factorised, and not using integers.", misconceptionId: "E-w8-c" }
    ],
    retryHint: "Find the biggest number that divides both 8 and 12.",
    misconceptions: [
      {
        misconceptionId: "E-w8-a",
        description: "Student factors out 2, a common factor, but doesn't check that a LARGER common factor (4) also exists.",
        rootCause: "Not the Highest Common Factor — factors out A common factor but not the HIGHEST one.",
        remediation: "2 IS a common factor of 8 and 12, but it's not the HIGHEST — 4 is also common (8÷4=2, 12÷4=3) and larger than 2, so the fully factorised form is 4(2a-3), not the incompletely factorised 2(4a-6)."
      },
      {
        misconceptionId: "E-w8-b",
        description: "Student factors out 4 correctly but keeps the wrong sign inside the bracket, writing +3 instead of -3.",
        rootCause: "Sign Dropped During Factoring — loses track of the negative sign on the second term.",
        remediation: "12 is being SUBTRACTED (8a-12), so after dividing by 4, the inside should be -3 (since 12÷4=3, and the sign stays negative): 4(2a-3), not 4(2a+3) (which incorrectly flips the sign)."
      },
      {
        misconceptionId: "E-w8-c",
        description: "Student factors out 8, but this doesn't divide 12 evenly, leading to a non-integer inside the bracket.",
        rootCause: "Wrong Common Factor Identified — picks a factor that doesn't divide both terms evenly.",
        remediation: "8 does NOT divide 12 evenly (12÷8=1.5, not a whole number) — the correct HCF is 4, which divides both 8 and 12 evenly: 4(2a-3), not 8(a-1.5) (which uses a non-integer)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the highest common factor of 8 and 12", hint: "The HCF of 8 and 12 is 4." },
      { level: 2, description: "Divide each term by the HCF, keeping the sign", hint: "8a÷4=2a. -12÷4=-3." },
      { level: 3, description: "Write the factorised form", hint: "4(2a - 3)." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.7.EE.A.1"] },
  { itemId: "w9", order: 9, cluster: "CON", clusterName: CLUSTER_NAMES.CON,
    skillId: "CONSTRUCT-01",
    question: "Write an expression for 'a number \\(n\\) plus 6'.",
    options: [
      { text: "\\(n + 6\\)", correct: true, feedback: "Plus means addition." },
      { text: "\\(6n\\)", correct: false, feedback: "That's 6 times n.", misconceptionId: "E-w9-a" },
      { text: "\\(n - 6\\)", correct: false, feedback: "That's n minus 6.", misconceptionId: "E-w9-b" },
      { text: "\\(6 - n\\)", correct: false, feedback: "That's 6 minus n, the wrong order.", misconceptionId: "E-w9-c" }
    ],
    retryHint: "Plus means addition.",
    misconceptions: [
      {
        misconceptionId: "E-w9-a",
        description: "Student translates 'plus' as multiplication, writing 6n instead of the correct addition n+6.",
        rootCause: "Operation Keyword Misread — confuses an addition keyword ('plus') with a multiplication expression.",
        remediation: "'Plus' signals ADDITION, not multiplication — 'n plus 6' means n+6, not 6×n (which would be phrased as '6 times n')."
      },
      {
        misconceptionId: "E-w9-b",
        description: "Student translates 'plus' as subtraction, writing n-6 instead of the correct addition n+6.",
        rootCause: "Operation Keyword Misread — confuses an addition keyword ('plus') with a subtraction expression.",
        remediation: "'Plus' signals ADDITION, not subtraction — 'n plus 6' means n+6, not n-6 (which would be phrased as 'n minus 6')."
      },
      {
        misconceptionId: "E-w9-c",
        description: "Student reverses the order, writing 6-n instead of the correct n+6, though addition itself is commutative so the operation choice matters more here than order.",
        rootCause: "Wrong Operation and Order — misreads both the operation and which term should be written first.",
        remediation: "'n plus 6' means n+6 (addition, order doesn't matter for addition, but the operation must be right) — 6-n uses SUBTRACTION, which is the wrong operation entirely."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the keyword", hint: "'Plus' signals addition." },
      { level: 2, description: "Identify the variable and the added amount", hint: "The variable is n; the amount added is 6." },
      { level: 3, description: "Write the expression", hint: "n + 6." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.EE.A.2A"] },
  { itemId: "w10", order: 10, cluster: "DIS", clusterName: CLUSTER_NAMES.DIS,
    skillId: "DISTINGUISH-01",
    question: "Which of these is an expression?",
    options: [
      { text: "\\(2x + 5\\)", correct: true, feedback: "An expression has no equals sign." },
      { text: "\\(2x + 5 = 11\\)", correct: false, feedback: "That's an equation — it has an equals sign.", misconceptionId: "E-w10-a" },
      { text: "\\(A = lw\\)", correct: false, feedback: "That's a formula — it shows a relationship.", misconceptionId: "E-w10-b" },
      { text: "\\(x =\\)", correct: false, feedback: "Incomplete — not a valid expression.", misconceptionId: "E-w10-c" }
    ],
    retryHint: "Expressions do not have an equals sign.",
    misconceptions: [
      {
        misconceptionId: "E-w10-a",
        description: "Student picks the equation (2x+5=11), not recognising that the presence of an equals sign makes it an equation, not an expression.",
        rootCause: "Expression/Equation Distinction Not Applied — doesn't check for the defining feature (equals sign) that separates the two.",
        remediation: "An EXPRESSION has NO equals sign — 2x+5=11 HAS an equals sign, making it an EQUATION, not an expression; 2x+5 (without the '=11') is the expression."
      },
      {
        misconceptionId: "E-w10-b",
        description: "Student picks the formula (A=lw), not recognising that it also has an equals sign, making it a relationship (formula) rather than an expression.",
        rootCause: "Expression/Formula Distinction Not Applied — doesn't check for the defining feature (equals sign) that separates the two.",
        remediation: "A FORMULA (like A=lw) HAS an equals sign showing a relationship between variables — it is NOT an expression; 2x+5 (with no equals sign) is the expression."
      },
      {
        misconceptionId: "E-w10-c",
        description: "Student picks the incomplete fragment (x=), not recognising it isn't a valid, complete mathematical statement of any type.",
        rootCause: "Incomplete Statement Not Recognised — treats an incomplete fragment as if it were a valid expression.",
        remediation: "'x=' is INCOMPLETE — it has an equals sign but nothing after it, so it's not a valid expression, equation, or formula; 2x+5 is a complete, valid expression."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the defining feature of an expression", hint: "An expression has NO equals sign." },
      { level: 2, description: "Check each option for an equals sign", hint: "Which option has no '=' anywhere in it?" },
      { level: 3, description: "Confirm your choice", hint: "Does 2x+5 have an equals sign?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: [] }
];

const diagnosticItems = [
  { itemId: "d1", order: 1, cluster: "SUB", clusterName: CLUSTER_NAMES.SUB,
    skillId: "SUBEVAL-03",
    question: "If \\(x = -3\\), evaluate \\(2x^2 - 3x + 1\\).",
    options: [
      { text: "28", correct: true, feedback: "2×(-3)²=18, -3×(-3)=+9, 18+9+1=28." },
      { text: "10", correct: false, feedback: "You treated -3x as -9. (-3)×(-3)=+9, not -9.", misconceptionId: "E-d1-a" },
      { text: "-8", correct: false, feedback: "You treated (-3)² as -9. (-3)²=+9.", misconceptionId: "E-d1-b" },
      { text: "1", correct: false, feedback: "You only kept the constant and ignored the other terms.", misconceptionId: "E-d1-c" }
    ],
    backward: "Chapter 1: (-a)² = a².",
    forward: "Substituting negative values is essential for graphing functions.",
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
        description: "Student keeps only the constant term (+1) and ignores the 2x² and -3x terms entirely, perhaps thinking terms with the variable vanish or cancel when x is negative.",
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
    skillId: "INDXPOW-01",
    question: "Simplify: \\((x^2)^3\\).",
    options: [
      { text: "\\(x^6\\)", correct: true, feedback: "Multiply the exponents: 2×3=6." },
      { text: "\\(x^5\\)", correct: false, feedback: "You added the exponents. Add when multiplying, not when raising a power.", misconceptionId: "E-d2-a" },
      { text: "\\(x^8\\)", correct: false, feedback: "You raised 2 to the power of 3. Multiply exponents, don't use the base.", misconceptionId: "E-d2-b" },
      { text: "\\(3x^2\\)", correct: false, feedback: "You multiplied the base by the outer exponent.", misconceptionId: "E-d2-c" }
    ],
    backward: "Power of a power: multiply exponents.",
    forward: "Index laws are essential for algebraic fractions and standard form.",
    misconceptions: [
      {
        misconceptionId: "E-d2-a",
        description: "Student adds the exponents (2+3=5) instead of multiplying them when raising a power to another power.",
        rootCause: "Exponent Rule Confused — applies the ADD-exponents rule (for multiplying same-base powers) instead of the MULTIPLY-exponents rule (for a power raised to a power).",
        remediation: "For a POWER raised to ANOTHER power, MULTIPLY the exponents: (x²)³=x^(2×3)=x⁶ — adding them (2+3=5) would be the rule for multiplying two separate same-base powers like x²×x³, not for this expression."
      },
      {
        misconceptionId: "E-d2-b",
        description: "Student computes 2³=8 and uses that as the new exponent instead of multiplying 2 and 3 together.",
        rootCause: "Exponent Rule Misapplied as Exponentiation — raises the inner exponent to the power of the outer exponent instead of multiplying them.",
        remediation: "The rule is to MULTIPLY the two exponents (2×3=6), not raise one to the power of the other (2³=8) — (x²)³=x^(2×3)=x⁶, not x⁸."
      },
      {
        misconceptionId: "E-d2-c",
        description: "Student multiplies the base (x) by the outer exponent (3), producing 3x², a completely different kind of expression (coefficient times power instead of a higher power).",
        rootCause: "Base and Exponent Roles Confused — treats the exponent as a coefficient to multiply the base by.",
        remediation: "(x²)³ means the ENTIRE x² is raised to the power of 3, which multiplies the EXPONENTS (2×3=6) to give x⁶ — it does not mean multiplying the base x by 3, which would give an unrelated expression 3x²."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the structure", hint: "This is a power (x²) raised to another power (³)." },
      { level: 2, description: "Recall the power-of-a-power rule", hint: "Multiply the exponents together." },
      { level: 3, description: "Compute the new exponent", hint: "2 × 3 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.EE.A.1"] },
  { itemId: "d3", order: 3, cluster: "EXP", clusterName: CLUSTER_NAMES.EXP,
    skillId: "EXPAND-03",
    question: "Expand: \\(-2(3x - 5)\\).",
    options: [
      { text: "\\(-6x + 10\\)", correct: true, feedback: "-2×3x=-6x, -2×(-5)=+10." },
      { text: "\\(-6x - 10\\)", correct: false, feedback: "-2×(-5)=+10, not -10. Negative × negative = positive.", misconceptionId: "E-d3-a" },
      { text: "\\(6x - 10\\)", correct: false, feedback: "-2×3x=-6x, not +6x. Don't drop the negative.", misconceptionId: "E-d3-b" },
      { text: "\\(-6x + 5\\)", correct: false, feedback: "You only multiplied the first term.", misconceptionId: "E-d3-c" }
    ],
    backward: "Distribute the negative coefficient to every term.",
    forward: "Expanding with negative coefficients is essential for solving equations.",
    misconceptions: [
      {
        misconceptionId: "E-d3-a",
        description: "Student computes -2×(-5) as -10 instead of +10, mishandling the sign of a negative times a negative.",
        rootCause: "Sign Rule Confused — treats negative×negative as negative instead of positive.",
        remediation: "-2×(-5): negative×negative=POSITIVE, so this equals +10, not -10 — the correct expansion is -6x+10, not -6x-10."
      },
      {
        misconceptionId: "E-d3-b",
        description: "Student drops the negative sign on the first term, computing -2×3x as +6x instead of -6x.",
        rootCause: "Sign Dropped During Distribution — loses track of the negative sign on the outer multiplier.",
        remediation: "-2×3x: negative×positive=NEGATIVE, so this equals -6x, not +6x — the correct expansion is -6x+10, not 6x-10."
      },
      {
        misconceptionId: "E-d3-c",
        description: "Student multiplies only the first term (3x) by -2, forgetting to also multiply the -5.",
        rootCause: "Distribution Incomplete — applies the multiplier to only one of the two terms inside the bracket.",
        remediation: "-2 must multiply BOTH terms inside the bracket — -2×3x=-6x AND -2×(-5)=+10, giving -6x+10, not just -6x+5 (which leaves the -5 unmultiplied)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify what's being multiplied", hint: "-2 must multiply EVERY term inside the bracket, including its sign." },
      { level: 2, description: "Multiply the first term", hint: "-2 × 3x = -6x." },
      { level: 3, description: "Multiply the second term, applying the sign rule", hint: "-2 × (-5) = ? (negative × negative = positive)" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.7.EE.A.1"] },
  { itemId: "d4", order: 4, cluster: "FAC", clusterName: CLUSTER_NAMES.FAC,
    skillId: "FACTOR-02",
    question: "Factorise \\(6x^2 + 9x\\) completely.",
    options: [
      { text: "\\(3x(2x + 3)\\)", correct: true, feedback: "HCF of 6 and 9 is 3; common variable is x." },
      { text: "\\(3(2x^2 + 3x)\\)", correct: false, feedback: "x can also be taken out. The HCF is 3x, not 3.", misconceptionId: "E-d4-a" },
      { text: "\\(x(6x + 9)\\)", correct: false, feedback: "The HCF is 3x, not just x.", misconceptionId: "E-d4-b" },
      { text: "\\(6x^2 + 9x\\) is already fully factorised", correct: false, feedback: "There is a common factor of 3x.", misconceptionId: "E-d4-c" }
    ],
    backward: "Reverse of expanding.",
    forward: "Factorising is crucial for solving quadratics later.",
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
  { itemId: "d5", order: 5, cluster: "CON", clusterName: CLUSTER_NAMES.CON,
    skillId: "CONSTRUCT-02",
    question: "Write an expression for 'five less than three times a number \\(x\\)'.",
    options: [
      { text: "\\(3x - 5\\)", correct: true, feedback: "'Less than' reverses: three times x, then subtract 5." },
      { text: "\\(5 - 3x\\)", correct: false, feedback: "That's five minus 3x, not five less than.", misconceptionId: "E-d5-a" },
      { text: "\\(3(x - 5)\\)", correct: false, feedback: "That's three times (x-5), a different expression.", misconceptionId: "E-d5-b" },
      { text: "\\(3x + 5\\)", correct: false, feedback: "That's five more than, not five less than.", misconceptionId: "E-d5-c" }
    ],
    backward: "Word order matters: 'less than' reverses.",
    forward: "Translating words into algebra is the first step in word problems.",
    misconceptions: [
      {
        misconceptionId: "E-d5-a",
        description: "Student translates the phrase in its literal reading order, writing 5-3x instead of recognising that 'less than' reverses the order to 3x-5.",
        rootCause: "'Less Than' Order Not Reversed — translates phrases word-by-word in the order they appear instead of recognising the reversal that 'less than' requires.",
        remediation: "'X less than Y' means Y-X (the order REVERSES) — 'five less than three times x' means (three times x) minus five = 3x-5, not 5-3x (which would be 'three times x less than five')."
      },
      {
        misconceptionId: "E-d5-b",
        description: "Student groups '(x-5)' together and multiplies by 3, misreading 'three times a number' as applying to the whole subtraction rather than just to x.",
        rootCause: "Scope of Multiplication Misread — applies the multiplier to an entire subtraction instead of just to the number.",
        remediation: "'Three times a number x' means 3×x=3x on its own, THEN 'five less than' that result subtracts 5 afterward: 3x-5, not 3(x-5), which would mean 'three times a number that is five less than x'."
      },
      {
        misconceptionId: "E-d5-c",
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
  { itemId: "d6", order: 6, cluster: "DIS", clusterName: CLUSTER_NAMES.DIS,
    skillId: "DISTINGUISH-01",
    question: "Which of these is a formula?",
    options: [
      { text: "\\(A = lw\\)", correct: true, feedback: "A formula shows a relationship between variables." },
      { text: "\\(2x + 5 = 11\\)", correct: false, feedback: "That's an equation — one unknown to solve.", misconceptionId: "E-d6-a" },
      { text: "\\(3a + 7\\)", correct: false, feedback: "That's an expression — no equals sign.", misconceptionId: "E-d6-b" },
      { text: "\\(x = 3\\)", correct: false, feedback: "That's an equation stating x equals 3.", misconceptionId: "E-d6-c" }
    ],
    backward: "Expression: no equals. Equation: one solution. Formula: relationship.",
    forward: "Recognising the type tells you what to do.",
    misconceptions: [
      {
        misconceptionId: "E-d6-a",
        description: "Student picks the equation (2x+5=11), not recognising that it has only one unknown to solve for, unlike a formula which relates multiple variables.",
        rootCause: "Equation/Formula Distinction Not Applied — doesn't check whether multiple variables are related versus a single unknown being solved.",
        remediation: "A FORMULA relates MULTIPLE variables to each other (like A=lw, relating area, length, width) — 2x+5=11 has only ONE unknown (x) to solve for, making it an EQUATION, not a formula."
      },
      {
        misconceptionId: "E-d6-b",
        description: "Student picks the expression (3a+7), not recognising that it has no equals sign at all, which rules it out as a formula.",
        rootCause: "Expression/Formula Distinction Not Applied — doesn't check for the defining feature (equals sign) that separates the two.",
        remediation: "A FORMULA has an equals sign showing a relationship — 3a+7 has NO equals sign, making it an EXPRESSION, not a formula; A=lw (with an equals sign relating variables) is the formula."
      },
      {
        misconceptionId: "E-d6-c",
        description: "Student picks the equation (x=3), not recognising that it states a single unknown's value rather than a relationship between multiple variables.",
        rootCause: "Equation/Formula Distinction Not Applied — doesn't check whether multiple variables are related versus a single value being stated.",
        remediation: "A FORMULA relates MULTIPLE variables (like A=lw) — x=3 states the value of a SINGLE unknown, making it an EQUATION, not a formula."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the defining feature of a formula", hint: "A formula shows a relationship between two or more variables." },
      { level: 2, description: "Check each option for multiple related variables", hint: "Which option relates more than one letter/variable to each other?" },
      { level: 3, description: "Confirm your choice", hint: "Does A=lw relate area, length, and width?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: [] },
  { itemId: "d7", order: 7, cluster: "EST", clusterName: CLUSTER_NAMES.EST,
    skillId: "ESTROUND-01",
    question: "Estimate: \\((-4.8) \\times 2.1\\) ≈ ?",
    options: [
      { text: "\\(-10\\)", correct: true, feedback: "Round to 1 s.f.: -5 × 2 = -10." },
      { text: "\\(-7\\)", correct: false, feedback: "You rounded -4.8 to -3.5? Round to -5.", misconceptionId: "E-d7-a" },
      { text: "\\(-12\\)", correct: false, feedback: "You rounded -4.8 to -6.", misconceptionId: "E-d7-b" },
      { text: "\\(10\\)", correct: false, feedback: "You dropped the negative sign.", misconceptionId: "E-d7-c" }
    ],
    backward: "Round each number to 1 significant figure.",
    forward: "Estimation helps check calculator results quickly.",
    misconceptions: [
      {
        misconceptionId: "E-d7-a",
        description: "Student rounds -4.8 incorrectly (to something like -3.5, an intermediate non-rounded value) instead of rounding it to 1 significant figure (-5), leading to an inaccurate estimate.",
        rootCause: "Rounding to Significant Figures Applied Incorrectly — doesn't round the number to the nearest value with 1 significant figure.",
        remediation: "-4.8 rounded to 1 significant figure is -5 (since 4.8 is closer to 5 than to 4) — then -5×2=-10; using an incorrectly rounded value like -3.5 leads to a wrong estimate."
      },
      {
        misconceptionId: "E-d7-b",
        description: "Student rounds -4.8 to -6 instead of -5, rounding in the wrong direction or by too much.",
        rootCause: "Rounding Direction Error — rounds away from the nearest value instead of to it.",
        remediation: "-4.8 is closer to -5 than to -6 (since 4.8 is closer to 5 than to 6) — round to -5, then -5×2=-10, not -6×2=-12."
      },
      {
        misconceptionId: "E-d7-c",
        description: "Student computes the correct magnitude but drops the negative sign, giving a positive result for what should be negative×positive=negative.",
        rootCause: "Sign Dropped in Final Answer — loses track of the negative sign despite correctly estimating the magnitude.",
        remediation: "Negative × positive = NEGATIVE — since -4.8 is negative and 2.1 is positive, the product must be negative: -10, not 10 (which drops the negative sign)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Round each number to 1 significant figure", hint: "-4.8 rounds to -5. 2.1 rounds to 2." },
      { level: 2, description: "Determine the sign of the product", hint: "Negative × positive = negative." },
      { level: 3, description: "Multiply the rounded values", hint: "-5 × 2 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.7.NS.A.2"] },
  { itemId: "d8", order: 8, cluster: "EXT", clusterName: CLUSTER_NAMES.EXT,
    skillId: "EXTMIX-01",
    question: "Evaluate: \\((-2)^3 + \\sqrt{81} - (-5)\\).",
    options: [
      { text: "6", correct: true, feedback: "(-2)³=-8, √81=9, -(-5)=+5. -8+9+5=6." },
      { text: "-6", correct: false, feedback: "Check the sign of -(-5). Subtracting a negative is adding.", misconceptionId: "E-d8-a" },
      { text: "16", correct: false, feedback: "You treated (-2)³ as +8.", misconceptionId: "E-d8-b" },
      { text: "-4", correct: false, feedback: "(-2)³=-8, √81=9, then -8+9-5=-4. -(-5)=+5.", misconceptionId: "E-d8-c" }
    ],
    backward: "Combine powers, roots, and sign rules.",
    forward: "Multi-step problems like this appear in algebraic expressions.",
    misconceptions: [
      {
        misconceptionId: "E-d8-a",
        description: "Student treats -(-5) as -5 instead of +5, not applying the rule that subtracting a negative is equivalent to adding.",
        rootCause: "Double Negative Not Simplified — fails to convert 'subtracting a negative' into 'adding a positive'.",
        remediation: "Subtracting a negative number is the SAME as adding its positive: -(-5)=+5, not -5 — the full evaluation is -8+9+5=6, not -8+9-5=-4 (or the resulting -6 from other sign errors)."
      },
      {
        misconceptionId: "E-d8-b",
        description: "Student computes (-2)³ as +8 instead of -8, incorrectly treating an odd power of a negative number as positive.",
        rootCause: "Odd Power of Negative Misunderstood — believes any power of a negative number gives a positive result, ignoring that odd powers preserve the negative sign.",
        remediation: "(-2)³=(-2)×(-2)×(-2)=4×(-2)=-8 — an ODD power of a negative number stays NEGATIVE (only even powers become positive); the full evaluation is -8+9+5=6, not 8+9+5=22 or similar (16 likely comes from a different combination of sign errors)."
      },
      {
        misconceptionId: "E-d8-c",
        description: "Student correctly computes (-2)³=-8 and √81=9, but treats -(-5) as -5 instead of +5, landing on -8+9-5=-4.",
        rootCause: "Double Negative Not Simplified — fails to convert 'subtracting a negative' into 'adding a positive'.",
        remediation: "-(-5) means subtracting negative 5, which is the SAME as adding 5: -(-5)=+5 — the full evaluation is -8+9+5=6, not -8+9-5=-4."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Evaluate each part separately", hint: "(-2)³=?, √81=?, and -(-5)=?" },
      { level: 2, description: "Simplify the double negative", hint: "Subtracting a negative is the same as adding: -(-5)=+5." },
      { level: 3, description: "Add all three values", hint: "-8 + 9 + 5 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: [] },
  { itemId: "d9", order: 9, cluster: "SUB", clusterName: CLUSTER_NAMES.SUB,
    skillId: "SUBEVAL-04",
    question: "If \\(m = -2, n = 5\\), evaluate \\(mn - m^2\\).",
    options: [
      { text: "\\(-14\\)", correct: true, feedback: "(-2)×5=-10; (-2)²=4; -10-4=-14." },
      { text: "\\(-6\\)", correct: false, feedback: "You computed m² as -4. (-2)²=+4.", misconceptionId: "E-d9-a" },
      { text: "\\(6\\)", correct: false, feedback: "You computed -10+4=-6 then changed the sign.", misconceptionId: "E-d9-b" },
      { text: "\\(14\\)", correct: false, feedback: "You dropped all negative signs.", misconceptionId: "E-d9-c" }
    ],
    backward: "m² is always non-negative.",
    forward: "Multi-variable substitution occurs in formulas like A=½bh.",
    misconceptions: [
      {
        misconceptionId: "E-d9-a",
        description: "Student computes m² (with m=-2) as -4 instead of +4, treating the square of a negative number as negative.",
        rootCause: "Squaring Negative Numbers Misunderstood — believes squaring a negative gives a negative result.",
        remediation: "m²=(-2)²=(-2)×(-2)=+4 (negative×negative=positive) — a square is NEVER negative; the full evaluation is -10-4=-14, not -10-(-4)=-6."
      },
      {
        misconceptionId: "E-d9-b",
        description: "Student correctly computes mn=-10 and m²=4 but adds them (-10+4=-6) instead of subtracting m² from mn, then possibly flips the sign, mishandling the subtraction step.",
        rootCause: "Subtraction Direction Confused — adds the second term or mishandles the subtraction order instead of correctly subtracting m² from mn.",
        remediation: "The expression is mn MINUS m², so subtract: -10-4=-14, not -10+4=-6 — m² is always subtracted, never added, in this expression."
      },
      {
        misconceptionId: "E-d9-c",
        description: "Student drops all negative signs during the computation, treating m as if it were positive throughout, leading to mn=10 and losing the subtraction's effect.",
        rootCause: "Negative Signs Dropped Throughout — ignores the negative sign on m during multiplication and squaring.",
        remediation: "m=-2 is NEGATIVE and this must be tracked throughout: mn=(-2)×5=-10 (not +10), and m²=(-2)²=+4 — the full evaluation is -10-4=-14, not 10+4=14 (which drops the negative on mn)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Substitute the values of m and n", hint: "mn = (-2)×5. m² = (-2)²." },
      { level: 2, description: "Evaluate each term with correct signs", hint: "(-2)×5=-10. (-2)²=+4 (never negative)." },
      { level: 3, description: "Subtract m² from mn", hint: "-10 - 4 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.EE.A.2C"] },
  { itemId: "d10", order: 10, cluster: "INDX", clusterName: CLUSTER_NAMES.INDX,
    skillId: "INDXDIV-01",
    question: "Simplify: \\(\\frac{x^4}{x}\\).",
    options: [
      { text: "\\(x^3\\)", correct: true, feedback: "Subtract exponents: 4-1=3." },
      { text: "\\(x^4\\)", correct: false, feedback: "x in the denominator cancels one x. x⁴/x = x³.", misconceptionId: "E-d10-a" },
      { text: "\\(x^5\\)", correct: false, feedback: "You added the exponents. Subtract when dividing.", misconceptionId: "E-d10-b" },
      { text: "\\(4\\)", correct: false, feedback: "You divided the coefficient? There is no coefficient.", misconceptionId: "E-d10-c" }
    ],
    backward: "x = x¹, so x⁴/x = x³.",
    forward: "Dividing powers is essential for simplifying algebraic fractions.",
    misconceptions: [
      {
        misconceptionId: "E-d10-a",
        description: "Student doesn't reduce the exponent at all, keeping x⁴ unchanged as if dividing by x (implicitly x¹) has no effect.",
        rootCause: "Implicit Exponent of 1 Not Recognised — fails to treat a bare variable in the denominator as having an exponent of 1.",
        remediation: "x (with no visible exponent) means x¹ — dividing x⁴ by x¹ means subtracting exponents: 4-1=3, giving x³, not leaving it unchanged as x⁴."
      },
      {
        misconceptionId: "E-d10-b",
        description: "Student adds the exponents (4+1=5) instead of subtracting them when dividing two powers with the same base.",
        rootCause: "Exponent Rule Confused — applies the ADD-exponents rule (for multiplying same-base powers) instead of the SUBTRACT-exponents rule (for dividing).",
        remediation: "When DIVIDING same-base powers, SUBTRACT the exponents: x⁴÷x¹=x^(4-1)=x³ — adding them (4+1=5) would be the rule for MULTIPLYING same-base powers, not dividing."
      },
      {
        misconceptionId: "E-d10-c",
        description: "Student attempts to divide a nonexistent numeric coefficient, producing a bare number (4) instead of simplifying the power expression.",
        rootCause: "Nonexistent Coefficient Manipulated — invents a coefficient to operate on where none exists.",
        remediation: "x⁴/x has NO numeric coefficient to divide — this is purely an exponent simplification: subtract exponents, 4-1=3, giving x³, not a plain number like 4."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the implicit exponent of x in the denominator", hint: "x means x¹." },
      { level: 2, description: "Recall the quotient-of-powers rule", hint: "Subtract the exponents." },
      { level: 3, description: "Compute the new exponent", hint: "4 - 1 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.EE.A.1"] },
  { itemId: "d11", order: 11, cluster: "EXP", clusterName: CLUSTER_NAMES.EXP,
    skillId: "EXPAND-04",
    question: "Expand and simplify: \\(3(2x + 1) - 2(x - 4)\\).",
    options: [
      { text: "\\(4x + 11\\)", correct: true, feedback: "6x+3-2x+8 = 4x+11." },
      { text: "\\(4x - 5\\)", correct: false, feedback: "-2×(-4)=+8, not -8. 3+8=11.", misconceptionId: "E-d11-a" },
      { text: "\\(8x + 11\\)", correct: false, feedback: "You added the x-terms: 6x+2x=8x.", misconceptionId: "E-d11-b" },
      { text: "\\(4x + 5\\)", correct: false, feedback: "3+8=11, not 5.", misconceptionId: "E-d11-c" }
    ],
    backward: "Distribute each term, then collect like terms.",
    forward: "This is the basis for solving equations with brackets.",
    misconceptions: [
      {
        misconceptionId: "E-d11-a",
        description: "Student treats -2×(-4) as -8 instead of +8, mishandling the sign of a negative times a negative during the second expansion.",
        rootCause: "Sign Rule Confused — treats negative×negative as negative instead of positive.",
        remediation: "-2×(-4): negative×negative=POSITIVE, so this equals +8, not -8 — the full simplification is 6x+3-2x+8=4x+11, not 6x+3-2x-8=4x-5."
      },
      {
        misconceptionId: "E-d11-b",
        description: "Student adds the two x-coefficients (6x and -2x) instead of subtracting, treating the '-2(x-4)' as if it added 2x rather than subtracted it.",
        rootCause: "Distribution Sign Not Carried to x-Term — loses track that the -2 multiplying x gives -2x, not +2x.",
        remediation: "3(2x+1) gives +6x, and -2(x-4) gives -2x (since -2×x=-2x, negative) — combining: 6x+(-2x)=6x-2x=4x, not 6x+2x=8x."
      },
      {
        misconceptionId: "E-d11-c",
        description: "Student correctly gets the x-term (4x) but miscombines the constants, getting +5 instead of +11.",
        rootCause: "Constant Combination Error — mishandles the arithmetic when combining the constant terms.",
        remediation: "The constants are +3 (from 3×1) and +8 (from -2×-4, which is positive) — combining: 3+8=11, not 3+8 miscalculated as 5; the full answer is 4x+11, not 4x+5."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Expand each bracket separately", hint: "3(2x+1)=6x+3. -2(x-4)=-2x+8 (negative × negative = positive)." },
      { level: 2, description: "Combine the like terms with x", hint: "6x + (-2x) = 4x." },
      { level: 3, description: "Combine the constant terms", hint: "3 + 8 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.7.EE.A.1"] },
  { itemId: "d12", order: 12, cluster: "FAC", clusterName: CLUSTER_NAMES.FAC,
    skillId: "FACTOR-01",
    question: "Factorise \\(12x + 18\\) completely.",
    options: [
      { text: "\\(6(2x + 3)\\)", correct: true, feedback: "The HCF of 12 and 18 is 6." },
      { text: "\\(2(6x + 9)\\)", correct: false, feedback: "Not fully factorised; the HCF is 6, not 2.", misconceptionId: "E-d12-a" },
      { text: "\\(3(4x + 6)\\)", correct: false, feedback: "Not fully factorised; the HCF is 6, not 3.", misconceptionId: "E-d12-b" },
      { text: "\\(12x + 18\\) cannot be factorised", correct: false, feedback: "It can be factorised — the HCF is 6.", misconceptionId: "E-d12-c" }
    ],
    backward: "Always take out the highest common factor.",
    forward: "Complete factorisation simplifies fractions and equation solving.",
    misconceptions: [
      {
        misconceptionId: "E-d12-a",
        description: "Student factors out 2, a common factor, but doesn't check that a LARGER common factor (6) also exists.",
        rootCause: "Not the Highest Common Factor — factors out A common factor but not the HIGHEST one.",
        remediation: "2 IS a common factor of 12 and 18, but it's not the HIGHEST — 6 is also common (12÷6=2, 18÷6=3) and larger than 2, so the fully factorised form is 6(2x+3), not the incompletely factorised 2(6x+9)."
      },
      {
        misconceptionId: "E-d12-b",
        description: "Student factors out 3, a common factor, but doesn't check that a LARGER common factor (6) also exists.",
        rootCause: "Not the Highest Common Factor — factors out A common factor but not the HIGHEST one.",
        remediation: "3 IS a common factor of 12 and 18, but it's not the HIGHEST — 6 is also common (12÷6=2, 18÷6=3) and larger than 3, so the fully factorised form is 6(2x+3), not the incompletely factorised 3(4x+6)."
      },
      {
        misconceptionId: "E-d12-c",
        description: "Student assumes the expression cannot be factorised, not recognising that 12 and 18 share a common factor of 6.",
        rootCause: "Common Factor Not Recognised — fails to identify that both terms share a factor.",
        remediation: "Check the numbers: 12 and 18 both share the factor 6 (12=6×2, 18=6×3) — since BOTH terms share 6, the expression CAN be factorised: 6(2x+3), not left as 12x+18."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the highest common factor of 12 and 18", hint: "The HCF of 12 and 18 is 6." },
      { level: 2, description: "Divide each term by the HCF", hint: "12x÷6=2x. 18÷6=3." },
      { level: 3, description: "Write the factorised form", hint: "6(2x + 3)." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.7.EE.A.1"] },
  { itemId: "d13", order: 13, cluster: "CON", clusterName: CLUSTER_NAMES.CON,
    skillId: "CONSTRUCT-03",
    question: "A matchstick pattern shows figures 1, 2, and 3, using 4, 7, and 10 sticks respectively. How many sticks are needed for figure 5?",
    options: [
      { text: "16", correct: true, feedback: "Pattern: 4,7,10,… (add 3). Figure 5: 4 + 4×3 = 16." },
      { text: "15", correct: false, feedback: "You added 3 only three times instead of four.", misconceptionId: "E-d13-a" },
      { text: "13", correct: false, feedback: "You missed two steps.", misconceptionId: "E-d13-b" },
      { text: "19", correct: false, feedback: "You added 5×3=15 plus 4=19? Starting value is 4.", misconceptionId: "E-d13-c" }
    ],
    backward: "Look for the constant difference between figures.",
    forward: "Deriving formulas from patterns is the bridge to algebra.",
    misconceptions: [
      {
        misconceptionId: "E-d13-a",
        description: "Student adds the common difference (3) only 3 times from figure 1 instead of 4 times, undercounting the number of steps needed to reach figure 5.",
        rootCause: "Step Count Off By One — miscounts how many times the common difference must be added between figure 1 and figure 5.",
        remediation: "From figure 1 to figure 5 is 4 STEPS (1→2→3→4→5), so add 3 four times: 4+4×3=16, not adding it only 3 times (4+3×3=13, or reaching 15 via a different miscount)."
      },
      {
        misconceptionId: "E-d13-b",
        description: "Student skips ahead without correctly tracking all the steps from figure 1 to figure 5, landing on an undercounted total.",
        rootCause: "Step Count Off By More Than One — significantly undercounts the number of steps or terms in the pattern.",
        remediation: "Count carefully: figure 1=4, figure 2=7, figure 3=10, figure 4=13, figure 5=16 — each step adds 3; don't skip steps when extending the pattern."
      },
      {
        misconceptionId: "E-d13-c",
        description: "Student multiplies the figure number by the common difference (5×3=15) and then adds the starting value in a way that overcounts, landing on 19 instead of 16.",
        rootCause: "Starting Value Miscombined — mishandles how the starting value combines with the multiplied common difference.",
        remediation: "The correct formula is: starting value (4) PLUS (number of steps × common difference) — from figure 1 to figure 5 is 4 steps, so 4+4×3=16, not 5×3+4=19 (which double-counts the starting figure)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the common difference between figures", hint: "7-4=3, 10-7=3. The pattern adds 3 each time." },
      { level: 2, description: "Count the number of steps from figure 1 to figure 5", hint: "That's 4 steps (1→2→3→4→5)." },
      { level: 3, description: "Add the common difference that many times to the starting value", hint: "4 + 4×3 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.OA.C.5"] },
  { itemId: "d14", order: 14, cluster: "DIS", clusterName: CLUSTER_NAMES.DIS,
    skillId: "DISTINGUISH-01",
    question: "True or false: '\\(2x + 3 = 7\\)' is an expression.",
    options: [
      { text: "False", correct: true, feedback: "It's an equation — it has an equals sign." },
      { text: "True", correct: false, feedback: "Expressions do not have equals signs.", misconceptionId: "E-d14-a" }
    ],
    backward: "Expressions are phrases; equations are sentences.",
    forward: "This distinction helps you know whether to simplify or solve.",
    misconceptions: [
      {
        misconceptionId: "E-d14-a",
        description: "Student believes 2x+3=7 is an expression, not recognising that the presence of an equals sign makes it an equation.",
        rootCause: "Expression/Equation Distinction Not Applied — doesn't check for the defining feature (equals sign) that separates the two.",
        remediation: "An EXPRESSION has NO equals sign — 2x+3=7 HAS an equals sign, making it an EQUATION, not an expression; 2x+3 (without the '=7') would be the expression."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the defining feature of an expression", hint: "An expression has NO equals sign." },
      { level: 2, description: "Check the statement for an equals sign", hint: "Does '2x+3=7' contain an '=' sign?" },
      { level: 3, description: "Determine the correct classification", hint: "A statement with an equals sign and one unknown is an equation." }
    ],
    forwardRiskLinks: [],
    learningObjectives: [] },
  { itemId: "d15", order: 15, cluster: "EST", clusterName: CLUSTER_NAMES.EST,
    skillId: "ESTROOT-02",
    question: "Estimate \\(\\sqrt{50}\\) to the nearest whole number.",
    options: [
      { text: "7", correct: true, feedback: "7²=49, very close to 50." },
      { text: "5", correct: false, feedback: "5²=25, too low.", misconceptionId: "E-d15-a" },
      { text: "8", correct: false, feedback: "8²=64, further away than 7²=49.", misconceptionId: "E-d15-b" },
      { text: "6", correct: false, feedback: "6²=36, further away than 7²=49.", misconceptionId: "E-d15-c" }
    ],
    backward: "Find the nearest perfect square.",
    forward: "Estimation of roots is useful in geometry and measurement.",
    misconceptions: [
      {
        misconceptionId: "E-d15-a",
        description: "Student guesses 5, perhaps confusing √50 with a related but incorrect benchmark (like thinking of 5²=25 as if it were close to 50), without checking which perfect square is actually nearest to 50.",
        rootCause: "Nearest Perfect Square Not Identified — doesn't compare 50 against nearby perfect squares to find the closest one.",
        remediation: "5²=25, which is far from 50 (a difference of 25) — the closest perfect square to 50 is 49=7², so √50≈7, not 5."
      },
      {
        misconceptionId: "E-d15-b",
        description: "Student guesses 8, overshooting the correct estimate by comparing to a perfect square that is farther from 50 than 49 is.",
        rootCause: "Nearest Perfect Square Not Identified — picks a perfect square that isn't actually the closest to 50.",
        remediation: "8²=64, which is 14 away from 50 — 7²=49 is much closer (only 1 away), so √50≈7, not 8."
      },
      {
        misconceptionId: "E-d15-c",
        description: "Student guesses 6, undershooting the correct estimate by comparing to a perfect square that is farther from 50 than 49 is.",
        rootCause: "Nearest Perfect Square Not Identified — picks a perfect square that isn't actually the closest to 50.",
        remediation: "6²=36, which is 14 away from 50 — 7²=49 is much closer (only 1 away), so √50≈7, not 6."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "List perfect squares near 50", hint: "6²=36, 7²=49, 8²=64." },
      { level: 2, description: "Find which perfect square is closest to 50", hint: "49 is only 1 away from 50; the others are farther." },
      { level: 3, description: "State the estimate", hint: "Since 7²=49 is closest, √50≈?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.NS.A.2"] },
  { itemId: "d16", order: 16, cluster: "EXT", clusterName: CLUSTER_NAMES.EXT,
    skillId: "EXTALG-01",
    question: "If \\(a = -2, b = 3\\), find the value of \\(a^2 + b^2 - 2ab\\).",
    options: [
      { text: "25", correct: true, feedback: "(-2)²=4, 3²=9, -2ab=-2(-2)(3)=+12. 4+9+12=25." },
      { text: "1", correct: false, feedback: "You computed -2ab as -12 instead of +12.", misconceptionId: "E-d16-a" },
      { text: "13", correct: false, feedback: "You forgot the -2ab term entirely.", misconceptionId: "E-d16-b" },
      { text: "-25", correct: false, feedback: "You squared -2 as -4. (-2)²=+4.", misconceptionId: "E-d16-c" }
    ],
    backward: "Substitute carefully, then use order of operations.",
    forward: "This expression is (a-b)², an important algebraic identity.",
    misconceptions: [
      {
        misconceptionId: "E-d16-a",
        description: "Student computes -2ab as -12 instead of +12, mishandling the multiple negative signs in -2×(-2)×3.",
        rootCause: "Multiple Negative Signs Mishandled — loses track of the sign when multiple negative values are multiplied together.",
        remediation: "-2ab = -2×(-2)×3: first -2×(-2)=+4 (negative×negative=positive), then +4×3=+12 — the full evaluation is 4+9+12=25, not 4+9-12=1 (which uses -12 incorrectly)."
      },
      {
        misconceptionId: "E-d16-b",
        description: "Student evaluates only a²+b² (4+9=13) and forgets to include the -2ab term entirely.",
        rootCause: "Term Omitted — drops an entire term from the expression during evaluation.",
        remediation: "The expression has THREE terms: a², b², AND -2ab — all three must be evaluated and combined: 4+9+12=25, not just a²+b²=4+9=13 (which skips the -2ab term)."
      },
      {
        misconceptionId: "E-d16-c",
        description: "Student computes a² (with a=-2) as -4 instead of +4, treating the square of a negative number as negative.",
        rootCause: "Squaring Negative Numbers Misunderstood — believes squaring a negative gives a negative result.",
        remediation: "a²=(-2)²=(-2)×(-2)=+4 (negative×negative=positive) — a square is NEVER negative; the full evaluation is 4+9+12=25, not -4+9+12=17 or a similarly incorrect negative-based total."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Evaluate each term separately", hint: "a²=(-2)², b²=3², and -2ab=-2×(-2)×3." },
      { level: 2, description: "Apply the sign rules carefully", hint: "(-2)²=+4. -2×(-2)×3: negative×negative=positive first, then ×3." },
      { level: 3, description: "Add all three terms", hint: "4 + 9 + 12 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.EE.A.2C"] },
  { itemId: "d17", order: 17, cluster: "SUB", clusterName: CLUSTER_NAMES.SUB,
    skillId: "SUBEVAL-05",
    question: "Evaluate \\(2(a - 3)^2\\) when \\(a = -1\\).",
    options: [
      { text: "32", correct: true, feedback: "(-1-3)=-4; (-4)²=16; 2×16=32." },
      { text: "16", correct: false, feedback: "You forgot to multiply by 2 at the end.", misconceptionId: "E-d17-a" },
      { text: "8", correct: false, feedback: "You squared -4 as -16, or mis-ordered.", misconceptionId: "E-d17-b" },
      { text: "-32", correct: false, feedback: "You squared -4 and got -16. A square is never negative.", misconceptionId: "E-d17-c" }
    ],
    backward: "Parentheses first, then the square, then multiplication.",
    forward: "Substituting into expressions with powers is used in area and volume.",
    misconceptions: [
      {
        misconceptionId: "E-d17-a",
        description: "Student correctly computes the squared bracket value (16) but forgets to multiply by the outer coefficient of 2, stopping at 16 instead of 32.",
        rootCause: "Final Multiplication Step Omitted — stops after squaring, forgetting the outer coefficient still needs to be applied.",
        remediation: "After computing (a-3)²=16, the expression still has a coefficient of 2 OUTSIDE the bracket to apply: 2×16=32, not stopping at just 16."
      },
      {
        misconceptionId: "E-d17-b",
        description: "Student squares -4 incorrectly or applies the order of operations out of sequence, arriving at an inconsistent intermediate value that leads to 8.",
        rootCause: "Order of Operations Not Applied — evaluates the parts of the expression in the wrong sequence, leading to an incorrect intermediate value.",
        remediation: "Follow the order strictly: first (a-3)=(-1-3)=-4, THEN square it: (-4)²=+16, THEN multiply by 2: 2×16=32 — evaluating in a different order (e.g., multiplying by 2 before squaring, or squaring only part of the expression) gives a wrong result like 8."
      },
      {
        misconceptionId: "E-d17-c",
        description: "Student treats (-4)² as -16 instead of +16, incorrectly believing that squaring a negative number gives a negative result.",
        rootCause: "Squaring Negative Numbers Misunderstood — believes squaring a negative gives a negative result.",
        remediation: "(-4)²=(-4)×(-4)=+16 (negative×negative=positive) — a square is NEVER negative; the full evaluation is 2×16=32, not 2×(-16)=-32."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Evaluate inside the bracket first", hint: "a-3 = -1-3 = -4." },
      { level: 2, description: "Square the result", hint: "(-4)² = +16 (never negative)." },
      { level: 3, description: "Multiply by the outer coefficient", hint: "2 × 16 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.EE.A.2C"] },
  { itemId: "d18", order: 18, cluster: "INDX", clusterName: CLUSTER_NAMES.INDX,
    skillId: "INDXPOW-01",
    question: "Simplify: \\((3^2)^3\\).",
    options: [
      { text: "\\(3^6\\)", correct: true, feedback: "Multiply the exponents: 2×3=6." },
      { text: "\\(3^5\\)", correct: false, feedback: "You added the exponents. Multiply when raising a power.", misconceptionId: "E-d18-a" },
      { text: "\\(3^8\\)", correct: false, feedback: "2³=8, but multiply exponents, don't use them as powers.", misconceptionId: "E-d18-b" },
      { text: "\\(6^3\\)", correct: false, feedback: "The base stays as 3, not 6.", misconceptionId: "E-d18-c" }
    ],
    backward: "Power of a power: multiply exponents.",
    forward: "Index laws will be extended to algebra and negative exponents.",
    misconceptions: [
      {
        misconceptionId: "E-d18-a",
        description: "Student adds the exponents (2+3=5) instead of multiplying them when raising a power to another power.",
        rootCause: "Exponent Rule Confused — applies the ADD-exponents rule (for multiplying same-base powers) instead of the MULTIPLY-exponents rule (for a power raised to a power).",
        remediation: "For a POWER raised to ANOTHER power, MULTIPLY the exponents: (3²)³=3^(2×3)=3⁶ — adding them (2+3=5) would be the rule for multiplying two separate same-base powers like 3²×3³, not for this expression."
      },
      {
        misconceptionId: "E-d18-b",
        description: "Student computes 2³=8 and uses that as the new exponent instead of multiplying 2 and 3 together.",
        rootCause: "Exponent Rule Misapplied as Exponentiation — raises the inner exponent to the power of the outer exponent instead of multiplying them.",
        remediation: "The rule is to MULTIPLY the two exponents (2×3=6), not raise one to the power of the other (2³=8) — (3²)³=3^(2×3)=3⁶, not 3⁸."
      },
      {
        misconceptionId: "E-d18-c",
        description: "Student changes the base from 3 to 6, perhaps confusing the correctly-computed new exponent (6) with what should become the base.",
        rootCause: "Base and Exponent Roles Confused — mistakes the computed exponent value for a new base.",
        remediation: "The BASE stays 3 throughout — only the EXPONENT changes (via multiplication, 2×3=6): the answer is 3⁶, not 6³ (which incorrectly changes the base to 6)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the structure", hint: "This is a power (3²) raised to another power (³)." },
      { level: 2, description: "Recall the power-of-a-power rule", hint: "Multiply the exponents; the base stays the same." },
      { level: 3, description: "Compute the new exponent", hint: "2 × 3 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.EE.A.1"] },
  { itemId: "d19", order: 19, cluster: "EXP", clusterName: CLUSTER_NAMES.EXP,
    skillId: "EXPAND-05",
    question: "Expand: \\(x(x + 4)\\).",
    options: [
      { text: "\\(x^2 + 4x\\)", correct: true, feedback: "x×x=x², x×4=4x." },
      { text: "\\(x^2 + 4\\)", correct: false, feedback: "You forgot to multiply x by the 4.", misconceptionId: "E-d19-a" },
      { text: "\\(2x + 4\\)", correct: false, feedback: "You added instead of multiplying.", misconceptionId: "E-d19-b" },
      { text: "\\(5x\\)", correct: false, feedback: "x(x+4) means multiply, not add.", misconceptionId: "E-d19-c" }
    ],
    backward: "x multiplied by x is x².",
    forward: "This leads to quadratic expressions and factorising.",
    misconceptions: [
      {
        misconceptionId: "E-d19-a",
        description: "Student multiplies x by x correctly (x²) but forgets to also multiply x by 4, leaving the 4 unmultiplied.",
        rootCause: "Distribution Incomplete — applies the multiplier to only one of the two terms inside the bracket.",
        remediation: "The outer x must multiply BOTH terms inside the bracket — x×x=x² AND x×4=4x, giving x²+4x, not just x²+4 (which leaves the 4 unmultiplied)."
      },
      {
        misconceptionId: "E-d19-b",
        description: "Student adds x to the terms inside instead of multiplying, treating x(x+4) as x+x+4 rather than distributing via multiplication.",
        rootCause: "Multiplication Notation Misread as Addition — treats the bracket notation as requiring addition instead of distribution.",
        remediation: "x(x+4) means x MULTIPLIED by (x+4), not added to it — distribute: x×x+x×4=x²+4x, not adding x to get 2x+4 (which misunderstands the notation entirely)."
      },
      {
        misconceptionId: "E-d19-c",
        description: "Student combines x and 4 as if they were like terms to be added directly (getting 5x, treating the 4 as if it were 4x), without distributing the outer x.",
        rootCause: "Unlike Terms Incorrectly Combined — combines a variable term and a constant as if they were the same kind of term, and skips the distribution step.",
        remediation: "x(x+4) requires DISTRIBUTING x to each term first: x×x=x² and x×4=4x, giving x²+4x — you cannot skip distribution and add x and 4 directly to get 5x, since x and 4 are not like terms."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify what's being multiplied", hint: "The outer x must multiply EVERY term inside the bracket." },
      { level: 2, description: "Multiply the first term", hint: "x × x = x²." },
      { level: 3, description: "Multiply the second term", hint: "x × 4 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.7.EE.A.1"] },
  { itemId: "d20", order: 20, cluster: "FAC", clusterName: CLUSTER_NAMES.FAC,
    skillId: "FACTOR-03",
    question: "Factorise completely: \\(-6x - 9\\).",
    options: [
      { text: "\\(-3(2x + 3)\\)", correct: true, feedback: "The common factor is -3. Inside signs flip." },
      { text: "\\(3(-2x - 3)\\)", correct: false, feedback: "Not fully factorised; take out -3, not 3.", misconceptionId: "E-d20-a" },
      { text: "\\(-3(2x - 3)\\)", correct: false, feedback: "-3 × -3 = +9, but we need -9.", misconceptionId: "E-d20-b" },
      { text: "\\(6(-x - 1.5)\\)", correct: false, feedback: "Not fully factorised, and not using integers.", misconceptionId: "E-d20-c" }
    ],
    backward: "Factorising with a negative flips the signs inside.",
    forward: "Used when solving equations by dividing by a negative.",
    misconceptions: [
      {
        misconceptionId: "E-d20-a",
        description: "Student factors out the positive HCF (3) instead of the negative HCF (-3), leaving negative signs still inside the bracket instead of flipping them out.",
        rootCause: "Negative HCF Not Extracted — factors out only the positive magnitude of the common factor, not its negative sign.",
        remediation: "When both terms are negative (-6x and -9), factor out the NEGATIVE common factor -3, which flips the signs inside to positive: -3(2x+3) — factoring out just +3 leaves negative signs inside: 3(-2x-3), which is not the conventional fully factorised form."
      },
      {
        misconceptionId: "E-d20-b",
        description: "Student factors out -3 correctly but keeps the wrong sign inside the bracket, writing -3 instead of +3.",
        rootCause: "Sign Dropped During Factoring — loses track of how dividing by a negative flips the sign inside.",
        remediation: "-9 divided by -3 gives POSITIVE 3 (negative÷negative=positive) — the inside should be (2x+3), not (2x-3): -3(2x+3), not -3(2x-3) (which would multiply back to -6x+9, not -6x-9)."
      },
      {
        misconceptionId: "E-d20-c",
        description: "Student factors out 6 instead of the correct HCF of 3 (with the negative sign), which doesn't divide -9 evenly, producing a non-integer inside the bracket.",
        rootCause: "Wrong Common Factor Identified — picks a factor that doesn't divide both terms evenly.",
        remediation: "6 does NOT divide 9 evenly (9÷6=1.5, not a whole number) — the correct HCF is 3 (with a negative sign), which divides both 6 and 9 evenly: -3(2x+3), not 6(-x-1.5) (which uses a non-integer)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the highest common factor, including the sign", hint: "Both terms are negative, so factor out -3." },
      { level: 2, description: "Divide each term by -3, tracking the sign flip", hint: "-6x÷(-3)=2x. -9÷(-3)=+3 (negative÷negative=positive)." },
      { level: 3, description: "Write the factorised form", hint: "-3(2x + 3)." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.7.EE.A.1"] },
  { itemId: "d21", order: 21, cluster: "CON", clusterName: CLUSTER_NAMES.CON,
    skillId: "CONSTRUCT-04",
    question: "A taxi costs £2 per mile plus a £3 flag-down charge. Write a formula for the total cost \\(C\\) for \\(m\\) miles.",
    options: [
      { text: "\\(C = 2m + 3\\)", correct: true, feedback: "£2 per mile means 2m; plus £3 gives 2m+3." },
      { text: "\\(C = 5m\\)", correct: false, feedback: "You can't add 2 and 3 — they're not like terms.", misconceptionId: "E-d21-a" },
      { text: "\\(C = 3m + 2\\)", correct: false, feedback: "You swapped the per-mile charge and the fixed charge.", misconceptionId: "E-d21-b" },
      { text: "\\(C = 2 + 3m\\)", correct: false, feedback: "This has the rates swapped.", misconceptionId: "E-d21-c" }
    ],
    backward: "Identify the variable part and the constant part.",
    forward: "Real-life formulas model costs, distances, and scientific relationships.",
    misconceptions: [
      {
        misconceptionId: "E-d21-a",
        description: "Student combines the £2 per-mile rate and the £3 flag-down charge into a single coefficient (5m), treating them as like terms that can be added together.",
        rootCause: "Unlike Terms Incorrectly Combined — adds a variable rate and a fixed constant as if they were the same kind of quantity.",
        remediation: "2m (the variable per-mile cost) and 3 (the fixed flag-down charge) are NOT like terms — they must stay separate: C=2m+3, not combined into C=5m (which would only be valid if both were multiplied by m)."
      },
      {
        misconceptionId: "E-d21-b",
        description: "Student swaps the roles of the per-mile rate and the fixed charge, using 3 as the coefficient of m and 2 as the constant, reversing the two values from the problem.",
        rootCause: "Rate and Constant Swapped — assigns the per-unit rate and the fixed charge to the wrong roles in the formula.",
        remediation: "The £2 PER MILE is the coefficient of m (since it scales with distance), and the £3 flag-down is the FIXED constant (added once, not scaled) — C=2m+3, not C=3m+2 (which incorrectly makes £3 the per-mile rate)."
      },
      {
        misconceptionId: "E-d21-c",
        description: "Student writes the constant before the variable term but also swaps which number gets multiplied by m, making 3 the per-mile rate instead of 2.",
        rootCause: "Rate and Constant Swapped — assigns the per-unit rate and the fixed charge to the wrong roles in the formula.",
        remediation: "The £2 PER MILE must multiply m (since cost scales with miles), and £3 is the FIXED charge added once — C=2m+3, not C=2+3m (which incorrectly makes £3 scale with miles)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the variable (per-mile) part", hint: "£2 per mile means the cost scales with m: 2m." },
      { level: 2, description: "Identify the fixed (constant) part", hint: "The £3 flag-down charge is added once, regardless of miles." },
      { level: 3, description: "Combine into a formula", hint: "C = 2m + 3." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.EE.A.2A"] },
  { itemId: "d22", order: 22, cluster: "DIS", clusterName: CLUSTER_NAMES.DIS,
    skillId: "DISTINGUISH-02",
    question: "Which of the following can you solve for \\(x\\)?",
    options: [
      { text: "\\(2x + 5 = 0\\)", correct: true, feedback: "An equation can be solved — there is one unknown." },
      { text: "\\(2x + 5\\)", correct: false, feedback: "That's an expression — nothing to solve.", misconceptionId: "E-d22-a" },
      { text: "\\(y = 2x + 5\\)", correct: false, feedback: "That's a formula — it can be rearranged but not solved.", misconceptionId: "E-d22-b" },
      { text: "All of them", correct: false, feedback: "Only the equation can be solved.", misconceptionId: "E-d22-c" }
    ],
    backward: "Equations have a specific solution.",
    forward: "Identifying solvable equations is key in algebra.",
    misconceptions: [
      {
        misconceptionId: "E-d22-a",
        description: "Student picks the expression (2x+5), not recognising that without an equals sign, there is nothing to solve for — it can only be simplified or evaluated.",
        rootCause: "Expression Mistaken for Solvable Equation — treats a bare expression as if it could be solved like an equation.",
        remediation: "An EXPRESSION (like 2x+5) has NO equals sign and NOTHING to solve — you can only simplify or evaluate it; 2x+5=0 (with an equals sign and one unknown) is the equation that CAN be solved for x."
      },
      {
        misconceptionId: "E-d22-b",
        description: "Student picks the formula (y=2x+5), not recognising that it relates two variables (x and y) rather than having a single specific solution for x.",
        rootCause: "Formula Mistaken for Solvable Equation — treats a relationship between multiple variables as if it had one fixed solution.",
        remediation: "A FORMULA (like y=2x+5) relates x and y — it can be REARRANGED to express x in terms of y, but it doesn't have one single numeric SOLUTION the way 2x+5=0 does (which has exactly one value of x that makes it true)."
      },
      {
        misconceptionId: "E-d22-c",
        description: "Student believes all three options can be solved, not distinguishing between an expression, a formula, and a true equation with one unknown.",
        rootCause: "Expression/Formula/Equation Distinction Not Applied — fails to recognise that only a true equation with one unknown has a specific numeric solution.",
        remediation: "Only 2x+5=0 is a true EQUATION with exactly one unknown (x) and a specific numeric solution — 2x+5 (no equals sign) and y=2x+5 (relates two variables) cannot be 'solved' the same way."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall what makes something solvable", hint: "You need an equation with exactly one unknown and a specific solution." },
      { level: 2, description: "Check each option for an equals sign and number of unknowns", hint: "Which option has '=' and only the variable x, with no other letters?" },
      { level: 3, description: "Confirm your choice", hint: "Does 2x+5=0 have exactly one unknown?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: [] },
  { itemId: "d23", order: 23, cluster: "EST", clusterName: CLUSTER_NAMES.EST,
    skillId: "ESTROOT-03",
    question: "A cube has volume 60 cm³. Estimate its side length to the nearest whole number.",
    options: [
      { text: "4 cm", correct: true, feedback: "4³=64, close to 60." },
      { text: "3 cm", correct: false, feedback: "3³=27, too small.", misconceptionId: "E-d23-a" },
      { text: "5 cm", correct: false, feedback: "5³=125, too big.", misconceptionId: "E-d23-b" },
      { text: "2 cm", correct: false, feedback: "2³=8, far too small.", misconceptionId: "E-d23-c" }
    ],
    backward: "Side = ³√volume.",
    forward: "Estimation of cube roots is useful in physics and engineering.",
    misconceptions: [
      {
        misconceptionId: "E-d23-a",
        description: "Student guesses a side length of 3, which is too small since 3³=27, far below the target volume of 60.",
        rootCause: "Nearest Perfect Cube Not Identified — doesn't compare 60 against nearby perfect cubes to find the closest one.",
        remediation: "3³=27, which is far below 60 (a difference of 33) — the closest perfect cube to 60 is 64=4³, so the side length ≈4, not 3."
      },
      {
        misconceptionId: "E-d23-b",
        description: "Student guesses a side length of 5, overshooting since 5³=125, far above the target volume of 60.",
        rootCause: "Nearest Perfect Cube Not Identified — picks a perfect cube that isn't actually the closest to 60.",
        remediation: "5³=125, which is far above 60 (a difference of 65) — 4³=64 is much closer (only 4 away), so the side length ≈4, not 5."
      },
      {
        misconceptionId: "E-d23-c",
        description: "Student guesses a side length of 2, which is far too small since 2³=8, well below the target volume of 60.",
        rootCause: "Nearest Perfect Cube Not Identified — picks a perfect cube that isn't actually the closest to 60.",
        remediation: "2³=8, which is far below 60 (a difference of 52) — 4³=64 is much closer (only 4 away), so the side length ≈4, not 2."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "List perfect cubes near 60", hint: "3³=27, 4³=64, 5³=125." },
      { level: 2, description: "Find which perfect cube is closest to 60", hint: "64 is only 4 away from 60; the others are farther." },
      { level: 3, description: "State the estimate", hint: "Since 4³=64 is closest, the side length ≈?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.NS.A.2"] },
  { itemId: "d24", order: 24, cluster: "EXT", clusterName: CLUSTER_NAMES.EXT,
    skillId: "EXTDIAG-01",
    question: "A student expanded \\(-2(3x - 5)\\) and got \\(-6x - 10\\). What went wrong?",
    options: [
      { text: "-2 × -5 should be +10, not -10", correct: true, feedback: "Negative × negative = positive. The correct expansion is -6x+10." },
      { text: "-2 × 3x should be +6x", correct: false, feedback: "-2 × 3x = -6x is correct. The error is in the constant.", misconceptionId: "E-d24-a" },
      { text: "They forgot to distribute -2 to the 3x term", correct: false, feedback: "They did distribute; the error is the constant sign.", misconceptionId: "E-d24-b" },
      { text: "The expansion is correct", correct: false, feedback: "The constant sign is wrong.", misconceptionId: "E-d24-c" }
    ],
    backward: "Distributing a negative sign requires careful tracking.",
    forward: "Error spotting sharpens your checking skills.",
    misconceptions: [
      {
        misconceptionId: "E-d24-a",
        description: "Student misdiagnoses the error, claiming the first term (-2×3x) is wrong, when in fact -2×3x=-6x is correct and the actual error lies in the second term.",
        rootCause: "Error Location Misidentified — flags a correct step as the source of the error instead of the actual incorrect step.",
        remediation: "-2×3x=-6x IS correct (negative×positive=negative) — the actual error is in the SECOND term: -2×(-5) should be +10 (negative×negative=positive), but the student wrote -10."
      },
      {
        misconceptionId: "E-d24-b",
        description: "Student claims the -2 wasn't distributed to the 3x term at all, when in fact it was distributed correctly there — the actual error is a sign mistake in the second term, not a missed distribution.",
        rootCause: "Error Type Misidentified — diagnoses the error as an omission (skipped distribution) when it's actually a sign-handling mistake.",
        remediation: "The student DID distribute -2 to both terms — the -6x term is correct. The error is specifically that -2×(-5) was computed as -10 instead of +10, a SIGN error, not a missed distribution."
      },
      {
        misconceptionId: "E-d24-c",
        description: "Student believes the given expansion (-6x-10) is correct, not verifying the sign of the constant term against the correct rule for negative×negative.",
        rootCause: "Sign Rule Not Verified — accepts an expansion without checking that negative×negative was correctly computed as positive.",
        remediation: "The given expansion -6x-10 is INCORRECT — -2×(-5) should be +10 (negative×negative=positive), not -10, so the correct expansion is -6x+10, not -6x-10."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Re-expand the expression yourself", hint: "-2 × 3x = -6x. -2 × (-5) = ?" },
      { level: 2, description: "Compare your result to the student's", hint: "Which term differs between your answer and the student's?" },
      { level: 3, description: "Identify the specific sign rule that was broken", hint: "Negative × negative should be positive." }
    ],
    forwardRiskLinks: [],
    learningObjectives: [] }
];

const recheckItems = [
  { itemId: "r1", order: 1, cluster: "SUB", clusterName: CLUSTER_NAMES.SUB,
    skillId: "SUBEVAL-05",
    question: "Evaluate \\(2(x + 1)^2\\) when \\(x = -4\\).",
    options: [
      { text: "18", correct: true, feedback: "(-3)²=9; 2×9=18." },
      { text: "-18", correct: false, feedback: "(-3)²=9, not -9.", misconceptionId: "E-r1-a" },
      { text: "-6", correct: false, feedback: "You forgot to square the -3.", misconceptionId: "E-r1-b" },
      { text: "36", correct: false, feedback: "You doubled before squaring.", misconceptionId: "E-r1-c" }
    ],
    misconceptions: [
      {
        misconceptionId: "E-r1-a",
        description: "Student treats (-3)² as -9 instead of +9, incorrectly believing that squaring a negative number gives a negative result.",
        rootCause: "Squaring Negative Numbers Misunderstood — believes squaring a negative gives a negative result.",
        remediation: "(-3)²=(-3)×(-3)=+9 (negative×negative=positive) — a square is NEVER negative; the full evaluation is 2×9=18, not 2×(-9)=-18."
      },
      {
        misconceptionId: "E-r1-b",
        description: "Student skips the squaring step entirely, multiplying 2 by -3 directly instead of first squaring the bracket's value.",
        rootCause: "Order of Operations Not Applied — skips the squaring step, applying the outer multiplication too early.",
        remediation: "The bracket value (-3) must be SQUARED first: (-3)²=+9, THEN multiplied by 2: 2×9=18 — you cannot skip the squaring step and multiply -3 by 2 directly (which gives -6)."
      },
      {
        misconceptionId: "E-r1-c",
        description: "Student multiplies by 2 before squaring, computing 2×(-3)=-6 then squaring that to get 36, applying the operations in the wrong order.",
        rootCause: "Order of Operations Not Applied — applies the outer multiplication before the squaring, instead of after.",
        remediation: "Follow the correct order: first evaluate inside the bracket (x+1=-4+1=-3), THEN square it ((-3)²=9), THEN multiply by the outer coefficient (2×9=18) — doubling BEFORE squaring changes the calculation and gives the wrong answer, 36."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Evaluate inside the bracket first", hint: "x+1 = -4+1 = -3." },
      { level: 2, description: "Square the result", hint: "(-3)² = +9 (never negative)." },
      { level: 3, description: "Multiply by the outer coefficient", hint: "2 × 9 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.EE.A.2C"] },
  { itemId: "r2", order: 2, cluster: "INDX", clusterName: CLUSTER_NAMES.INDX,
    skillId: "INDXDIV-01",
    question: "Simplify: \\(\\frac{x^6}{x^2}\\).",
    options: [
      { text: "\\(x^4\\)", correct: true, feedback: "Subtract exponents: 6-2=4." },
      { text: "\\(x^3\\)", correct: false, feedback: "You divided the exponents. Subtract them.", misconceptionId: "E-r2-a" },
      { text: "\\(x^8\\)", correct: false, feedback: "You added the exponents.", misconceptionId: "E-r2-b" },
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
    skillId: "EXPAND-04",
    question: "Expand and simplify: \\(2(3x - 1) + 4(x + 2)\\).",
    options: [
      { text: "\\(10x + 6\\)", correct: true, feedback: "6x-2+4x+8=10x+6." },
      { text: "\\(10x + 2\\)", correct: false, feedback: "-2+8=6, not 2.", misconceptionId: "E-r3-a" },
      { text: "\\(14x + 6\\)", correct: false, feedback: "6x+4x=10x, not 14x.", misconceptionId: "E-r3-b" },
      { text: "\\(10x + 10\\)", correct: false, feedback: "-2+8=6, not 10.", misconceptionId: "E-r3-c" }
    ],
    misconceptions: [
      {
        misconceptionId: "E-r3-a",
        description: "Student correctly gets the x-term (10x) but miscombines the constants (-2 and +8), getting +2 instead of +6.",
        rootCause: "Constant Combination Error — mishandles the arithmetic when combining the constant terms.",
        remediation: "The constants are -2 (from 2×-1) and +8 (from 4×2) — combining: -2+8=6, not miscalculated as 2; the full answer is 10x+6, not 10x+2."
      },
      {
        misconceptionId: "E-r3-b",
        description: "Student miscombines the x-coefficients, getting 14x instead of 10x, perhaps by adding an extra term or misreading a coefficient.",
        rootCause: "Like-Term Combination Error — mishandles the arithmetic when combining the x-coefficients.",
        remediation: "The x-coefficients are 6 (from 2×3x) and 4 (from 4×x) — combining: 6x+4x=10x, not 14x (which would require a coefficient error somewhere in the expansion)."
      },
      {
        misconceptionId: "E-r3-c",
        description: "Student correctly gets the x-term (10x) but miscombines the constants (-2 and +8), getting +10 instead of +6.",
        rootCause: "Constant Combination Error — mishandles the arithmetic when combining the constant terms.",
        remediation: "The constants are -2 (from 2×-1) and +8 (from 4×2) — combining: -2+8=6, not miscalculated as 10; the full answer is 10x+6, not 10x+10."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Expand each bracket separately", hint: "2(3x-1)=6x-2. 4(x+2)=4x+8." },
      { level: 2, description: "Combine the like terms with x", hint: "6x + 4x = 10x." },
      { level: 3, description: "Combine the constant terms", hint: "-2 + 8 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.7.EE.A.1"] },
  { itemId: "r4", order: 4, cluster: "FAC", clusterName: CLUSTER_NAMES.FAC,
    skillId: "FACTOR-02",
    question: "Factorise \\(9x^2 - 3x\\) completely.",
    options: [
      { text: "\\(3x(3x - 1)\\)", correct: true, feedback: "HCF of 9 and 3 is 3; common x." },
      { text: "\\(3(3x^2 - x)\\)", correct: false, feedback: "x can also be taken out.", misconceptionId: "E-r4-a" },
      { text: "\\(x(9x - 3)\\)", correct: false, feedback: "The HCF is 3x, not just x.", misconceptionId: "E-r4-b" },
      { text: "\\(3x(3x + 1)\\)", correct: false, feedback: "The sign inside should be negative.", misconceptionId: "E-r4-c" }
    ],
    misconceptions: [
      {
        misconceptionId: "E-r4-a",
        description: "Student factors out only the numeric HCF (3) but doesn't also factor out the common variable x, leaving x² inside the bracket instead of x.",
        rootCause: "Variable Factor Not Extracted — factors out the numeric common factor but misses the common variable factor.",
        remediation: "Both terms share not just the number 3 but also a factor of x (9x² has x, 3x has x) — the full common factor is 3x, not just 3: 3x(3x-1), not the incompletely factorised 3(3x²-x)."
      },
      {
        misconceptionId: "E-r4-b",
        description: "Student factors out only x, the common variable, but doesn't also factor out the numeric common factor (3), leaving coefficients 9 and 3 inside the bracket instead of 3 and 1.",
        rootCause: "Numeric Factor Not Extracted — factors out the common variable but misses the numeric common factor.",
        remediation: "Both terms share not just x but also the number 3 (9=3×3, 3=3×1) — the full common factor is 3x, not just x: 3x(3x-1), not the incompletely factorised x(9x-3)."
      },
      {
        misconceptionId: "E-r4-c",
        description: "Student factors out 3x correctly but keeps the wrong sign inside the bracket, writing +1 instead of -1.",
        rootCause: "Sign Dropped During Factoring — loses track of the negative sign on the second term.",
        remediation: "3x is being SUBTRACTED (9x²-3x), so after dividing by 3x, the inside should be -1 (since 3x÷3x=1, and the sign stays negative): 3x(3x-1), not 3x(3x+1) (which incorrectly flips the sign)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the numeric HCF of 9 and 3", hint: "The HCF of 9 and 3 is 3." },
      { level: 2, description: "Find the common variable factor", hint: "Both terms have at least one x." },
      { level: 3, description: "Divide each term by the full common factor 3x, keeping the sign", hint: "9x²÷3x=3x. -3x÷3x=-1." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.7.EE.A.1"] },
  { itemId: "r5", order: 5, cluster: "CON", clusterName: CLUSTER_NAMES.CON,
    skillId: "CONSTRUCT-05",
    question: "Write an expression for 'twice the sum of a number \\(n\\) and 5'.",
    options: [
      { text: "\\(2(n + 5)\\)", correct: true, feedback: "'The sum of n and 5' is n+5, then doubled." },
      { text: "\\(2n + 5\\)", correct: false, feedback: "That's twice n plus 5.", misconceptionId: "E-r5-a" },
      { text: "\\(n + 10\\)", correct: false, feedback: "That's n plus 10.", misconceptionId: "E-r5-b" },
      { text: "\\(2n + 10\\)", correct: false, feedback: "This is equivalent but the question asks for the expression before expanding.", misconceptionId: "E-r5-c" }
    ],
    misconceptions: [
      {
        misconceptionId: "E-r5-a",
        description: "Student applies 'twice' only to the n and not to the entire sum (n+5), writing 2n+5 instead of doubling the whole sum.",
        rootCause: "Scope of Multiplication Misread — applies the multiplier to only part of the phrase instead of the entire quantity it should scale.",
        remediation: "'Twice THE SUM of n and 5' means the ENTIRE sum (n+5) is doubled, not just the n — the sum n+5 must be found first, then multiplied by 2: 2(n+5), not 2n+5 (which only doubles n)."
      },
      {
        misconceptionId: "E-r5-b",
        description: "Student ignores the 'twice' entirely and just adds 10 to n, missing the doubling operation altogether.",
        rootCause: "Operation Keyword Omitted — fails to translate the 'twice' keyword into a multiplication at all.",
        remediation: "'Twice' means MULTIPLY BY 2 — the sum n+5 must be doubled: 2(n+5), not just n+10 (which ignores the 'twice' instruction and only performs the addition)."
      },
      {
        misconceptionId: "E-r5-c",
        description: "Student writes the fully expanded/simplified form (2n+10) instead of the unexpanded expression 2(n+5) that directly mirrors the phrase's structure.",
        rootCause: "Expanded Form Given Instead of Constructed Expression — jumps to simplifying before writing the expression that matches the phrase structure.",
        remediation: "While 2n+10 is mathematically EQUIVALENT to 2(n+5), the question asks you to CONSTRUCT the expression as described — 'twice the sum' directly translates to 2(n+5), the unexpanded form matching the phrase's structure."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Translate 'the sum of n and 5'", hint: "This part is n+5." },
      { level: 2, description: "Recognise that 'twice' applies to the whole sum", hint: "'Twice' means the entire quantity (n+5) is doubled, not just n." },
      { level: 3, description: "Combine into an expression", hint: "2(n + 5)." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.EE.A.2A"] },
  { itemId: "r6", order: 6, cluster: "DIS", clusterName: CLUSTER_NAMES.DIS,
    skillId: "DISTINGUISH-01",
    question: "Which of these is a formula?",
    options: [
      { text: "\\(v = u + at\\)", correct: true, feedback: "A formula shows a relationship." },
      { text: "\\(3x - 7\\)", correct: false, feedback: "That's an expression.", misconceptionId: "E-r6-a" },
      { text: "\\(3x - 7 = 0\\)", correct: false, feedback: "That's an equation.", misconceptionId: "E-r6-b" },
      { text: "\\(x = 5\\)", correct: false, feedback: "That's an equation.", misconceptionId: "E-r6-c" }
    ],
    misconceptions: [
      {
        misconceptionId: "E-r6-a",
        description: "Student picks the expression (3x-7), not recognising that it has no equals sign at all, which rules it out as a formula.",
        rootCause: "Expression/Formula Distinction Not Applied — doesn't check for the defining feature (equals sign) that separates the two.",
        remediation: "A FORMULA has an equals sign showing a relationship — 3x-7 has NO equals sign, making it an EXPRESSION, not a formula; v=u+at (with an equals sign relating variables) is the formula."
      },
      {
        misconceptionId: "E-r6-b",
        description: "Student picks the equation (3x-7=0), not recognising that it has only one unknown to solve for, unlike a formula which relates multiple variables.",
        rootCause: "Equation/Formula Distinction Not Applied — doesn't check whether multiple variables are related versus a single unknown being solved.",
        remediation: "A FORMULA relates MULTIPLE variables to each other (like v=u+at, relating velocity, initial velocity, acceleration, and time) — 3x-7=0 has only ONE unknown (x) to solve for, making it an EQUATION, not a formula."
      },
      {
        misconceptionId: "E-r6-c",
        description: "Student picks the equation (x=5), not recognising that it states a single unknown's value rather than a relationship between multiple variables.",
        rootCause: "Equation/Formula Distinction Not Applied — doesn't check whether multiple variables are related versus a single value being stated.",
        remediation: "A FORMULA relates MULTIPLE variables (like v=u+at) — x=5 states the value of a SINGLE unknown, making it an EQUATION, not a formula."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the defining feature of a formula", hint: "A formula shows a relationship between two or more variables." },
      { level: 2, description: "Check each option for multiple related variables", hint: "Which option relates more than one letter/variable to each other?" },
      { level: 3, description: "Confirm your choice", hint: "Does v=u+at relate velocity, initial velocity, acceleration, and time?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: [] },
  { itemId: "r7", order: 7, cluster: "EST", clusterName: CLUSTER_NAMES.EST,
    skillId: "SUBEVAL-06",
    question: "If \\(C = 2\\pi r\\) and \\(\\pi \\approx 3\\), estimate \\(C\\) when \\(r = 10\\).",
    options: [
      { text: "60", correct: true, feedback: "2×3×10=60." },
      { text: "30", correct: false, feedback: "You forgot to double.", misconceptionId: "E-r7-a" },
      { text: "90", correct: false, feedback: "2×3×10=60, not 90.", misconceptionId: "E-r7-b" },
      { text: "20", correct: false, feedback: "You used π≈2? π≈3.", misconceptionId: "E-r7-c" }
    ],
    misconceptions: [
      {
        misconceptionId: "E-r7-a",
        description: "Student computes only π×r (3×10=30) and forgets to also multiply by the leading 2 in the formula C=2πr.",
        rootCause: "Factor Omitted from Formula — leaves out one of the three factors when evaluating a multi-factor formula.",
        remediation: "The formula has THREE factors to multiply: 2, π (≈3), and r (10) — all three must be multiplied together: 2×3×10=60, not stopping at just π×r=3×10=30 (which omits the leading 2)."
      },
      {
        misconceptionId: "E-r7-b",
        description: "Student overcomputes, perhaps multiplying an extra factor or miscalculating, arriving at 90 instead of the correct 60.",
        rootCause: "Computation Error — a multiplication step is mishandled, leading to an inflated result.",
        remediation: "Recompute step by step: 2×3=6, then 6×10=60 — not 90, which would require an incorrect extra factor or miscalculation somewhere in the multiplication."
      },
      {
        misconceptionId: "E-r7-c",
        description: "Student uses an incorrect approximation for π (2 instead of the given 3), leading to an underestimate.",
        rootCause: "Given Approximation Not Used — substitutes an incorrect value for π instead of using the one specified in the problem.",
        remediation: "The problem explicitly states π≈3 — use THIS approximation, not a different one like 2: 2×3×10=60, not 2×2×10=40 or similar (20 suggests an even smaller, incorrect substitution)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify all three factors in the formula", hint: "C = 2 × π × r." },
      { level: 2, description: "Substitute the given values", hint: "π≈3, r=10: C ≈ 2 × 3 × 10." },
      { level: 3, description: "Multiply all three factors together", hint: "2 × 3 × 10 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.EE.A.2C"] },
  { itemId: "r8", order: 8, cluster: "EXT", clusterName: CLUSTER_NAMES.EXT,
    skillId: "EXTSCALE-01",
    question: "The volume of a cuboid is \\(V = lwh\\). If \\(l=5, w=3, h=2\\), find \\(V\\). Then if each dimension is doubled, find the new \\(V\\).",
    options: [
      { text: "Original 30, doubled 240", correct: true, feedback: "5×3×2=30; 10×6×4=240." },
      { text: "Original 30, doubled 60", correct: false, feedback: "Doubling each multiplies volume by 8.", misconceptionId: "E-r8-a" },
      { text: "Original 10, doubled 20", correct: false, feedback: "Check the formula.", misconceptionId: "E-r8-b" },
      { text: "Original 30, doubled 120", correct: false, feedback: "10×6×4=240.", misconceptionId: "E-r8-c" }
    ],
    misconceptions: [
      {
        misconceptionId: "E-r8-a",
        description: "Student assumes doubling every dimension simply doubles the volume (30×2=60), not recognising that volume scales by the CUBE of the linear scale factor when all three dimensions are doubled.",
        rootCause: "Linear vs. Cubic Scaling Confused — applies a linear scaling factor to a three-dimensional (volume) quantity instead of the cubic relationship.",
        remediation: "When ALL THREE dimensions of a cuboid are doubled, volume scales by 2³=8 (not just 2), since V=l×w×h and each of the three factors doubles: 30×8=240, not 30×2=60 (which incorrectly treats volume as scaling linearly)."
      },
      {
        misconceptionId: "E-r8-b",
        description: "Student miscalculates the original volume, perhaps adding the dimensions instead of multiplying, getting 10 instead of 30.",
        rootCause: "Volume Formula Misapplied — adds the dimensions instead of multiplying them.",
        remediation: "Volume V=l×w×h means MULTIPLY all three dimensions: 5×3×2=30, not add them (5+3+2=10) — the formula requires multiplication, not addition."
      },
      {
        misconceptionId: "E-r8-c",
        description: "Student correctly identifies the original volume (30) but miscalculates the doubled volume, computing 120 instead of the correct 240 (perhaps doubling only twice instead of the full factor of 8, or making an arithmetic slip).",
        rootCause: "Cubic Scaling Miscalculated — attempts to apply the correct cubic relationship but makes an arithmetic error in computing it.",
        remediation: "With each dimension doubled, the new dimensions are 10, 6, 4: multiply them directly, 10×6×4=240 — or equivalently, 30×2³=30×8=240, not 30×4=120 (which uses an incorrect scale factor of 4 instead of 8)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Compute the original volume", hint: "V = l×w×h = 5×3×2." },
      { level: 2, description: "Find the new dimensions after doubling", hint: "New l=10, w=6, h=4." },
      { level: 3, description: "Compute the new volume directly, or use the cubic scale factor", hint: "10×6×4 = ? (equivalently, 30 × 2³)" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.EE.A.1"] },
  { itemId: "r9", order: 9, cluster: "SUB", clusterName: CLUSTER_NAMES.SUB,
    skillId: "SUBEVAL-03",
    question: "If \\(x = -2\\), evaluate \\(3x^2 - x + 1\\).",
    options: [
      { text: "15", correct: true, feedback: "3×4 + 2 + 1 = 15." },
      { text: "11", correct: false, feedback: "-x when x=-2 is +2, not -2.", misconceptionId: "E-r9-a" },
      { text: "-15", correct: false, feedback: "You squared -2 as -4.", misconceptionId: "E-r9-b" },
      { text: "9", correct: false, feedback: "3×4=12, then 12-2+1=11.", misconceptionId: "E-r9-c" }
    ],
    misconceptions: [
      {
        misconceptionId: "E-r9-a",
        description: "Student computes -x (with x=-2) as -2 instead of +2, not applying the sign rule that negating a negative number gives a positive result.",
        rootCause: "Negation of Negative Not Applied — fails to flip the sign when negating an already-negative value.",
        remediation: "-x with x=-2 means -(-2), and negating a negative gives POSITIVE: -(-2)=+2, not -2 — the full evaluation is 12+2+1=15, not 12-2+1=11."
      },
      {
        misconceptionId: "E-r9-b",
        description: "Student computes x² (with x=-2) as -4 instead of +4, treating the square of a negative number as negative.",
        rootCause: "Squaring Negative Numbers Misunderstood — believes squaring a negative gives a negative result.",
        remediation: "x²=(-2)²=(-2)×(-2)=+4 (negative×negative=positive) — a square is NEVER negative; the full evaluation is 3×4+2+1=15, not 3×(-4)+2+1=-9 or similar (the -15 answer likely combines multiple sign errors)."
      },
      {
        misconceptionId: "E-r9-c",
        description: "Student computes -x (with x=-2) as -2 instead of +2, arriving at 12-2+1=11 instead of the correct 12+2+1=15.",
        rootCause: "Negation of Negative Not Applied — fails to flip the sign when negating an already-negative value.",
        remediation: "-x with x=-2 means -(-2), and negating a negative gives POSITIVE: -(-2)=+2, not -2 — the full evaluation is 12+2+1=15, not 12-2+1=11."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Substitute x=-2 into each term separately", hint: "3(-2)², -(-2), and +1." },
      { level: 2, description: "Evaluate each term carefully with correct signs", hint: "(-2)²=+4, so 3×4=12. -(-2)=+2 (negating a negative gives positive)." },
      { level: 3, description: "Add all three terms", hint: "12 + 2 + 1 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.EE.A.2C"] },
  { itemId: "r10", order: 10, cluster: "INDX", clusterName: CLUSTER_NAMES.INDX,
    skillId: "INDXCOMBO-01",
    question: "Simplify: \\((x^3)^2 \\times x\\).",
    options: [
      { text: "\\(x^7\\)", correct: true, feedback: "(x³)²=x⁶; x⁶×x=x⁷." },
      { text: "\\(x^6\\)", correct: false, feedback: "Don't forget to multiply by x.", misconceptionId: "E-r10-a" },
      { text: "\\(x^5\\)", correct: false, feedback: "3×2=6, plus 1=7.", misconceptionId: "E-r10-b" },
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
    question: "Factorise completely: \\(-8x - 12\\).",
    options: [
      { text: "\\(-4(2x + 3)\\)", correct: true, feedback: "The HCF is -4." },
      { text: "\\(4(-2x - 3)\\)", correct: false, feedback: "Take out -4, not 4.", misconceptionId: "E-r11-a" },
      { text: "\\(-4(2x - 3)\\)", correct: false, feedback: "-4×-3=+12, not -12.", misconceptionId: "E-r11-b" },
      { text: "\\(-2(4x + 6)\\)", correct: false, feedback: "Not the highest common factor.", misconceptionId: "E-r11-c" }
    ],
    misconceptions: [
      {
        misconceptionId: "E-r11-a",
        description: "Student factors out the positive HCF (4) instead of the negative HCF (-4), leaving negative signs still inside the bracket instead of flipping them out.",
        rootCause: "Negative HCF Not Extracted — factors out only the positive magnitude of the common factor, not its negative sign.",
        remediation: "When both terms are negative (-8x and -12), factor out the NEGATIVE common factor -4, which flips the signs inside to positive: -4(2x+3) — factoring out just +4 leaves negative signs inside: 4(-2x-3), which is not the conventional fully factorised form."
      },
      {
        misconceptionId: "E-r11-b",
        description: "Student factors out -4 correctly but keeps the wrong sign inside the bracket, writing -3 instead of +3.",
        rootCause: "Sign Dropped During Factoring — loses track of how dividing by a negative flips the sign inside.",
        remediation: "-12 divided by -4 gives POSITIVE 3 (negative÷negative=positive) — the inside should be (2x+3), not (2x-3): -4(2x+3), not -4(2x-3) (which would multiply back to -8x+12, not -8x-12)."
      },
      {
        misconceptionId: "E-r11-c",
        description: "Student factors out 2, a common factor, but doesn't check that a LARGER common factor (4, with its sign) also exists.",
        rootCause: "Not the Highest Common Factor — factors out A common factor but not the HIGHEST one.",
        remediation: "2 IS a common factor of 8 and 12, but it's not the HIGHEST — 4 is also common (8÷4=2, 12÷4=3) and larger than 2, so the fully factorised form uses -4: -4(2x+3), not the incompletely factorised -2(4x+6)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the highest common factor, including the sign", hint: "Both terms are negative, so factor out -4." },
      { level: 2, description: "Divide each term by -4, tracking the sign flip", hint: "-8x÷(-4)=2x. -12÷(-4)=+3 (negative÷negative=positive)." },
      { level: 3, description: "Write the factorised form", hint: "-4(2x + 3)." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.7.EE.A.1"] },
  { itemId: "r12", order: 12, cluster: "CON", clusterName: CLUSTER_NAMES.CON,
    skillId: "CONSTRUCT-06",
    question: "A pattern uses \\(2n + 3\\) sticks for the nth figure. How many sticks in figure 7?",
    options: [
      { text: "17", correct: true, feedback: "2×7+3=17." },
      { text: "13", correct: false, feedback: "You used n=5.", misconceptionId: "E-r12-a" },
      { text: "20", correct: false, feedback: "2×7+6=20.", misconceptionId: "E-r12-b" },
      { text: "27", correct: false, feedback: "14+3=17.", misconceptionId: "E-r12-c" }
    ],
    misconceptions: [
      {
        misconceptionId: "E-r12-a",
        description: "Student substitutes the wrong value for n (5 instead of 7), perhaps miscounting or misreading the requested figure number.",
        rootCause: "Wrong Value Substituted — plugs in an incorrect number for the variable instead of the one specified in the question.",
        remediation: "The question asks for figure 7, so substitute n=7 (not n=5): 2×7+3=17, not 2×5+3=13 (which uses the wrong figure number)."
      },
      {
        misconceptionId: "E-r12-b",
        description: "Student doubles the constant term as well as the variable term, computing 2×7+2×3=20 instead of only doubling the n term.",
        rootCause: "Constant Term Incorrectly Scaled — multiplies the constant by the coefficient meant only for the variable term.",
        remediation: "In 2n+3, only the n is multiplied by 2 — the +3 is a separate constant added afterward, not also multiplied by 2: 2×7+3=17, not 2×7+2×3=20 (which incorrectly doubles the 3 as well)."
      },
      {
        misconceptionId: "E-r12-c",
        description: "Student computes 2×7=14 correctly but then mishandles the final addition of 3, arriving at 27 instead of 17.",
        rootCause: "Computation Error — the final addition step is mishandled.",
        remediation: "2×7=14 is correct, then add 3: 14+3=17, not 14+3 miscalculated as 27 (perhaps by appending digits rather than adding)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the value to substitute for n", hint: "Figure 7 means n=7." },
      { level: 2, description: "Multiply n by the coefficient", hint: "2 × 7 = 14." },
      { level: 3, description: "Add the constant", hint: "14 + 3 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.EE.A.2C"] }
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

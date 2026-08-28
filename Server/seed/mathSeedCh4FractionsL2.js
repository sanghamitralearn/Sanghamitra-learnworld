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
    skillId: "FRA-T2",
    question: "Convert \\(2\\frac{1}{3}\\) to an improper fraction and simplify if possible.",
    options: [
        { text: "\\( \\frac{7}{3} \\)", correct: true, feedback: "(2×3)+1 = 7, over 3. Already simplest." },
        { text: "\\( \\frac{6}{3} \\)", correct: false, feedback: "You only converted the whole part (2×3) and forgot to add the numerator.", misconceptionId: "E-w1-a" },
        { text: "\\( \\frac{5}{3} \\)", correct: false, feedback: "Incorrect addition: 2+3=5, but should be 2×3+1.", misconceptionId: "E-w1-b" },
        { text: "\\( \\frac{8}{3} \\)", correct: false, feedback: "You added the whole and denominator incorrectly.", misconceptionId: "E-w1-c" }
      ],
    retryHint: "Multiply the whole number (2) by the denominator (3), then add the numerator (1). Put that sum over the denominator.",
    misconceptions: [
      { misconceptionId: "E-w1-a", description: "Student answers 6/3, stopping after multiplying the whole number by the denominator.", rootCause: "Numerator-Drop — multiplies the whole number by the denominator (2×3=6) but never adds the numerator 1, leaving the conversion half-finished.", remediation: "Have the student say the three-step rule aloud — multiply, add, then place over the denominator — circling the '+1' step before computing." },
      { misconceptionId: "E-w1-b", description: "Student answers 5/3, adding the whole number and denominator together instead of multiplying.", rootCause: "Addition-Instead-of-Multiplication — adds the whole number and denominator (2+3=5) rather than multiplying them, then never adds the numerator at all.", remediation: "Contrast the two operations with a worked example, emphasizing the whole number is MULTIPLIED by the denominator, not added to it." },
      { misconceptionId: "E-w1-c", description: "Student answers 8/3, over-adding the whole number, denominator, and numerator.", rootCause: "All-Terms-Added — adds the whole number, denominator, and numerator together in some combination that overshoots the correct value, rather than following multiply-then-add.", remediation: "Have the student compute the multiplication step first and write it down before considering the numerator at all." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the parts", hint: "In 2 1/3, the whole number is 2, the numerator is 1, the denominator is 3." },
      { level: 2, description: "Multiply and add", hint: "Multiply the whole number by the denominator (2×3=6), then add the numerator (6+1=7)." },
      { level: 3, description: "Place over the denominator and check", hint: "7 goes over 3, giving 7/3. Since 7 and 3 share no common factor, it's already simplest." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "ADDSUB-03", probability: 0.5, condition: "If mixed-to-improper conversion errors persist into mixed-number addition/subtraction problems." }
    ],
    learningObjectives: ["CCSS.MATH.CONTENT.4.NF.B.3.C"]
  },
  {
    itemId: "w2", order: 2, cluster: "EQUIV", clusterName: CLUSTER_NAMES.EQUIV,
    skillId: "EQUIV-02",
    question: "Simplify \\( \\frac{12}{16} \\), then write an equivalent fraction with denominator 20.",
    options: [
        { text: "\\( \\frac{3}{4} = \\frac{15}{20} \\)", correct: true, feedback: "12/16 ÷4 = 3/4. 3/4 ×5/5 = 15/20." },
        { text: "\\( \\frac{6}{8} = \\frac{12}{20} \\)", correct: false, feedback: "6/8 is not fully simplified, and 12/20 simplifies to 3/5, not 3/4.", misconceptionId: "E-w2-a" },
        { text: "\\( \\frac{12}{20} \\) only", correct: false, feedback: "You forgot to simplify first.", misconceptionId: "E-w2-b" },
        { text: "\\( \\frac{3}{4} = \\frac{9}{20} \\)", correct: false, feedback: "3×3=9, but 4×3=12, not 20. You must multiply numerator and denominator by the same number.", misconceptionId: "E-w2-c" }
      ],
    retryHint: "First divide numerator and denominator by their HCF (4). Then multiply both by 5 to reach denominator 20.",
    misconceptions: [
      { misconceptionId: "E-w2-a", description: "Student answers 6/8 = 12/20, only partially simplifying and using a wrong scale-up.", rootCause: "Partial-Simplification Cascade — divides 12/16 by 2 instead of the full HCF of 4, getting 6/8, then scales 6/8 up incorrectly to 12/20, compounding the initial under-simplification.", remediation: "Have the student find the full HCF of 12 and 16 (which is 4, not 2) before doing anything else, so the starting fraction is already fully reduced." },
      { misconceptionId: "E-w2-b", description: "Student answers 12/20 only, skipping the simplification step entirely.", rootCause: "Simplification-Skip — jumps straight to scaling 12/16 toward denominator 20 without first reducing it, so the 'simplify' half of the question is never addressed.", remediation: "Have the student complete and write down the simplified fraction as a separate, required first answer before attempting the second part." },
      { misconceptionId: "E-w2-c", description: "Student answers 3/4 = 9/20, scaling the numerator and denominator by different factors.", rootCause: "Mismatched-Scale-Factor — multiplies the numerator by 3 (3×3=9) but the denominator by 5 (4×5=20), using two different multipliers instead of the same one for both.", remediation: "Have the student first find the SINGLE multiplier that takes the denominator 4 to 20 (×5), then apply that exact same multiplier to the numerator." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the HCF", hint: "What is the highest common factor of 12 and 16? It's 4." },
      { level: 2, description: "Simplify", hint: "12÷4=3 and 16÷4=4, so 12/16 = 3/4." },
      { level: 3, description: "Scale to the target denominator", hint: "4×5=20, so multiply the numerator by 5 too: 3×5=15, giving 15/20." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "ADDSUB-02", probability: 0.4, condition: "If simplifying and rescaling in sequence is unreliable, finding common denominators for unlike-denominator addition will inherit the same errors." }
    ],
    learningObjectives: ["CCSS.MATH.CONTENT.4.NF.A.1"]
  },
  {
    itemId: "w3", order: 3, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    skillId: "COMP-01",
    question: "Which is larger: \\( \\frac{3}{8} \\) or \\( \\frac{1}{4} \\)? Use a common denominator.",
    options: [
        { text: "\\( \\frac{3}{8} \\)", correct: true, feedback: "1/4 = 2/8. 3/8 > 2/8." },
        { text: "\\( \\frac{1}{4} \\)", correct: false, feedback: "1/4 = 2/8, which is less than 3/8.", misconceptionId: "E-w3-a" },
        { text: "They are equal", correct: false, feedback: "3/8 and 2/8 are not equal.", misconceptionId: "E-w3-b" },
        { text: "Cannot compare", correct: false, feedback: "You can compare by making denominators the same.", misconceptionId: "E-w3-c" }
      ],
    retryHint: "Convert 1/4 to eighths: multiply numerator and denominator by 2. Then compare numerators.",
    misconceptions: [
      { misconceptionId: "E-w3-a", description: "Student picks 1/4, without converting to a common denominator first.", rootCause: "Unconverted Comparison — compares 1/4 to 3/8 by looking at the denominators (4 vs 8) rather than converting to a shared denominator, mistakenly assuming a smaller denominator number means a larger fraction here.", remediation: "Teach that fractions can only be compared directly by numerator once they share the same denominator — convert first, always." },
      { misconceptionId: "E-w3-b", description: "Student claims the fractions are equal.", rootCause: "Surface-Similarity Assumption — assumes fractions that look close in value must be equal without actually converting 1/4 to eighths to check.", remediation: "Have the student convert 1/4 to eighths (2/8) and directly compare numerators against 3/8." },
      { misconceptionId: "E-w3-c", description: "Student claims the fractions cannot be compared.", rootCause: "Common-Denominator Doubt — believes unlike denominators can't be compared without realizing the conversion step (1/4=2/8) is straightforward.", remediation: "Walk through the conversion explicitly: 1/4 × 2/2 = 2/8, then compare 2/8 to 3/8." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find a common denominator", hint: "8 is a multiple of 4, so convert 1/4 into eighths." },
      { level: 2, description: "Convert", hint: "1/4 = 2/8 (multiply numerator and denominator by 2)." },
      { level: 3, description: "Compare", hint: "3/8 > 2/8, so 3/8 is larger." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.NF.A.2"]
  },
  {
    itemId: "w4", order: 4, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    skillId: "ADDSUB-02",
    question: "\\( \\frac{1}{2} + \\frac{1}{4} \\) (simplest form)",
    options: [
        { text: "\\( \\frac{3}{4} \\)", correct: true, feedback: "1/2 = 2/4; 2/4 + 1/4 = 3/4." },
        { text: "\\( \\frac{2}{6} \\)", correct: false, feedback: "You added denominators (2+4=6) and numerators (1+1=2). Never add denominators.", misconceptionId: "E-w4-a" },
        { text: "\\( \\frac{1}{2} \\)", correct: false, feedback: "You forgot to add the second fraction.", misconceptionId: "E-w4-b" },
        { text: "\\( \\frac{2}{4} \\)", correct: false, feedback: "That's just 1/2, not the sum.", misconceptionId: "E-w4-c" }
      ],
    retryHint: "Make denominators the same: 1/2 = 2/4. Then add numerators: 2+1=3, keep denominator 4.",
    misconceptions: [
      { misconceptionId: "E-w4-a", description: "Student answers 2/6, adding both numerators and denominators directly without converting to a common denominator.", rootCause: "Direct-Addition — adds numerators (1+1=2) and denominators (2+4=6) straight across without first converting to a common denominator, treating fraction addition like adding two separate ratios.", remediation: "Before any unlike-denominator addition, have the student first rewrite both fractions with the same denominator, so there is nothing left to add 'straight across.'" },
      { misconceptionId: "E-w4-b", description: "Student answers 1/2, reporting only the first addend.", rootCause: "Addend-Drop — forgets the second fraction (1/4) entirely and reports only the first term unconverted.", remediation: "Have the student underline both fractions before converting either, so neither term is skipped." },
      { misconceptionId: "E-w4-c", description: "Student answers 2/4, converting the first fraction but never adding the second.", rootCause: "Conversion-Without-Addition — correctly converts 1/2 to 2/4 but then stops, treating the conversion itself as the final answer instead of continuing to add 1/4.", remediation: "Have the student write the addition problem again AFTER converting, so the '+1/4' is still visible and not forgotten." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find a common denominator", hint: "4 is a multiple of 2, so convert 1/2 into fourths." },
      { level: 2, description: "Convert", hint: "1/2 = 2/4 (multiply numerator and denominator by 2)." },
      { level: 3, description: "Add", hint: "2/4 + 1/4 = 3/4." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "ADDSUB-03", probability: 0.4, condition: "If unlike-denominator addition with whole fractions isn't solid, adding mixed numbers (which requires the same conversion step) will compound the error." }
    ],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NF.A.1"]
  },
  {
    itemId: "w5", order: 5, cluster: "MUL", clusterName: CLUSTER_NAMES.MUL,
    skillId: "MUL-04",
    question: "\\( 3 \\times \\frac{2}{5} \\), then add \\( \\frac{1}{5} \\) to the result.",
    options: [
        { text: "\\( \\frac{7}{5} \\)", correct: true, feedback: "3×2/5 = 6/5. 6/5 + 1/5 = 7/5." },
        { text: "\\( \\frac{6}{5} \\)", correct: false, feedback: "You forgot to add the 1/5.", misconceptionId: "E-w5-a" },
        { text: "\\( \\frac{7}{10} \\)", correct: false, feedback: "You added denominators when adding the fractions.", misconceptionId: "E-w5-b" },
        { text: "\\( \\frac{3}{5} \\)", correct: false, feedback: "You added the whole number 3 to the numerator? Not correct.", misconceptionId: "E-w5-c" }
      ],
    retryHint: "First multiply: 3 × 2/5 = 6/5. Then add 1/5: 6/5 + 1/5 = 7/5.",
    misconceptions: [
      { misconceptionId: "E-w5-a", description: "Student answers 6/5, stopping after the multiplication step and never adding 1/5.", rootCause: "Second-Step-Drop — correctly computes 3×2/5=6/5 but stops there, forgetting the problem also asks to add 1/5 to that result.", remediation: "Have the student underline every instruction word ('then add') in the question and check each is addressed before finalizing an answer." },
      { misconceptionId: "E-w5-b", description: "Student answers 7/10, adding denominators during the addition step.", rootCause: "Denominator-Addition — correctly computes the multiplication (6/5) but then adds denominators as well as numerators when adding 1/5 (5+5=10), not realizing the denominator stays fixed.", remediation: "Remind the student that once denominators already match, addition only ever touches the numerators." },
      { misconceptionId: "E-w5-c", description: "Student answers 3/5, treating the whole number 3 as if it were added to the numerator instead of used to multiply.", rootCause: "Whole-Number-As-Addend — misreads '3 × 2/5' as '3 + 2/5' minus something, effectively treating the multiplication as an addition of the whole number 3 into the numerator slot.", remediation: "Have the student read the multiplication symbol aloud and restate it as 'three groups of two-fifths' before computing." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Do the multiplication first", hint: "3 × 2/5 means multiply the numerator: 3×2=6, giving 6/5." },
      { level: 2, description: "Set up the addition", hint: "Now add 1/5 to 6/5 — the denominators already match." },
      { level: 3, description: "Add", hint: "6/5 + 1/5 = 7/5 (add numerators, keep denominator 5)." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NF.B.6"]
  },
  {
    itemId: "w6", order: 6, cluster: "DIV", clusterName: CLUSTER_NAMES.DIV,
    skillId: "DIV-01",
    question: "\\( \\frac{4}{5} \\div 2 \\), then simplify.",
    options: [
        { text: "\\( \\frac{2}{5} \\)", correct: true, feedback: "4/5 × 1/2 = 4/10 = 2/5." },
        { text: "\\( \\frac{4}{10} \\)", correct: false, feedback: "That's the product before simplifying.", misconceptionId: "E-w6-a" },
        { text: "\\( \\frac{8}{5} \\)", correct: false, feedback: "You multiplied by 2 instead of dividing.", misconceptionId: "E-w6-b" },
        { text: "\\( \\frac{5}{8} \\)", correct: false, feedback: "You took the reciprocal of 4/5 instead of 2.", misconceptionId: "E-w6-c" }
      ],
    retryHint: "Dividing by 2 is the same as multiplying by 1/2. Then simplify the result.",
    misconceptions: [
      { misconceptionId: "E-w6-a", description: "Student answers 4/10, the correct unsimplified quotient.", rootCause: "Unsimplified-Quotient — correctly multiplies the denominator by 2 (5×2=10) but stops before reducing 4/10 to its simplest form, 2/5.", remediation: "Add a 'can this be simplified?' check as the last step of every division problem." },
      { misconceptionId: "E-w6-b", description: "Student answers 8/5, doubling the numerator instead of halving.", rootCause: "Operation-Reversal — multiplies the numerator by 2 instead of dividing, treating ÷2 as though it were ×2.", remediation: "Have the student predict whether the answer should be bigger or smaller than the start before computing." },
      { misconceptionId: "E-w6-c", description: "Student answers 5/8, inverting the original fraction instead of the divisor.", rootCause: "Wrong-Reciprocal-Target — takes the reciprocal of the fraction being divided (4/5→5/4-ish confusion) combined with the divisor, muddling which number should be inverted.", remediation: "Clarify explicitly: only the whole-number divisor (2) becomes a reciprocal (1/2); the original fraction (4/5) is never flipped." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Turn the divisor into a reciprocal", hint: "Dividing by 2 is the same as multiplying by 1/2." },
      { level: 2, description: "Multiply across", hint: "4/5 × 1/2 = (4×1)/(5×2) = 4/10." },
      { level: 3, description: "Simplify", hint: "4/10 simplifies to 2/5." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NF.B.7.A"]
  },
  {
    itemId: "w7", order: 7, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    skillId: "COMP-02",
    question: "Arrange in ascending order: \\( \\frac{2}{3}, \\frac{1}{2}, \\frac{5}{6} \\)",
    options: [
        { text: "\\( \\frac{1}{2}, \\frac{2}{3}, \\frac{5}{6} \\)", correct: true, feedback: "LCM 6: 3/6, 4/6, 5/6. Ascending: 1/2, 2/3, 5/6." },
        { text: "\\( \\frac{5}{6}, \\frac{2}{3}, \\frac{1}{2} \\)", correct: false, feedback: "That's descending.", misconceptionId: "E-w7-a" },
        { text: "\\( \\frac{2}{3}, \\frac{1}{2}, \\frac{5}{6} \\)", correct: false, feedback: "1/2 is smaller than 2/3.", misconceptionId: "E-w7-b" },
        { text: "\\( \\frac{1}{2}, \\frac{5}{6}, \\frac{2}{3} \\)", correct: false, feedback: "5/6 > 4/6 (2/3).", misconceptionId: "E-w7-c" }
      ],
    retryHint: "Find the LCM of denominators (6). Convert each fraction to sixths, then order.",
    misconceptions: [
      { misconceptionId: "E-w7-a", description: "Student orders the fractions from largest to smallest.", rootCause: "Direction-Reversal — correctly converts and compares the fractions but arranges largest-to-smallest instead of smallest-to-largest, reversing what 'ascending' means.", remediation: "Have the student picture a staircase going up and label the bottom step 'smallest' before ordering." },
      { misconceptionId: "E-w7-b", description: "Student places 2/3 before 1/2, without converting to a common denominator.", rootCause: "Unconverted Comparison — compares the fractions by their original numerators or denominators without converting to sixths first, misjudging that 2/3 comes before 1/2.", remediation: "Insist on writing all three fractions in sixths (3/6, 4/6, 5/6) BEFORE attempting to order them." },
      { misconceptionId: "E-w7-c", description: "Student places 5/6 before 2/3, mis-ordering the last two values.", rootCause: "Partial-Ordering — correctly identifies 1/2 as smallest but swaps the order of 2/3 (4/6) and 5/6, not comparing the converted numerators 4 and 5 carefully.", remediation: "Have the student compare every adjacent pair of converted numerators (3, 4, 5) explicitly before finalizing the order." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the LCM", hint: "The LCM of 3, 2, and 6 is 6." },
      { level: 2, description: "Convert each fraction", hint: "2/3=4/6, 1/2=3/6, 5/6 stays 5/6." },
      { level: 3, description: "Order the numerators", hint: "3 < 4 < 5, so the order is 1/2, 2/3, 5/6." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.NF.A.2"]
  },
  {
    itemId: "w8", order: 8, cluster: "TYPES", clusterName: CLUSTER_NAMES.TYPES,
    skillId: "COMP-02",
    question: "Which is largest? \\( \\frac{11}{4}, 2\\frac{1}{2}, \\frac{9}{4} \\)",
    options: [
        { text: "\\( \\frac{11}{4} \\)", correct: true, feedback: "11/4=2.75; 2 1/2=2.5; 9/4=2.25. Largest is 11/4." },
        { text: "\\( 2\\frac{1}{2} \\)", correct: false, feedback: "2 1/2 = 2.5, but 11/4 = 2.75.", misconceptionId: "E-w8-a" },
        { text: "\\( \\frac{9}{4} \\)", correct: false, feedback: "9/4 = 2.25, smaller.", misconceptionId: "E-w8-b" },
        { text: "They are all equal", correct: false, feedback: "They have different values.", misconceptionId: "E-w8-c" }
      ],
    retryHint: "Convert everything to improper fractions with denominator 4 and compare numerators.",
    misconceptions: [
      { misconceptionId: "E-w8-a", description: "Student picks 2 1/2, without converting it and the improper fractions to a shared form.", rootCause: "Mixed-Improper Mismatch — compares a mixed number directly against improper fractions without converting either to a common form, misjudging 2 1/2 as larger than 11/4.", remediation: "Have the student convert 2 1/2 to an improper fraction with denominator 4 (2 1/2 = 10/4) so all three values are directly comparable." },
      { misconceptionId: "E-w8-b", description: "Student picks 9/4, the smallest of the three values.", rootCause: "Numerator-Miscompare — compares numerators (11, 9) but somehow selects the smaller one, possibly misreading which fraction has which numerator.", remediation: "Have the student write all three numerators over denominator 4 side by side (11/4, 10/4, 9/4) before choosing the largest." },
      { misconceptionId: "E-w8-c", description: "Student claims all three values are equal.", rootCause: "Surface-Similarity Assumption — assumes fractions that all hover near the value 2.5 must be equal without actually converting and comparing them.", remediation: "Have the student compute a decimal or common-denominator value for each fraction individually and compare the three numbers explicitly." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Convert to a common form", hint: "Rewrite 2 1/2 as an improper fraction with denominator 4." },
      { level: 2, description: "Convert", hint: "2 1/2 = 10/4." },
      { level: 3, description: "Compare numerators", hint: "11/4, 10/4, 9/4 — the largest numerator (11) gives the largest fraction." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.NF.A.2"]
  }
];

const diagnosticItems = [
  {
    itemId: "d1", order: 1, cluster: "TYPES", clusterName: CLUSTER_NAMES.TYPES,
    skillId: "ADDSUB-04",
    question: "Convert \\( 3\\frac{2}{5} \\) to an improper fraction. How much must be added to it to make 4?",
    options: [
        { text: "\\( \\frac{3}{5} \\)", correct: true, feedback: "3 2/5 = 17/5. 4 = 20/5. Difference = 3/5." },
        { text: "\\( \\frac{17}{5} \\)", correct: false, feedback: "That's the improper fraction, not the amount to add.", misconceptionId: "E-d1-a" },
        { text: "\\( \\frac{1}{5} \\)", correct: false, feedback: "You need to reach 20/5; 17/5 to 20/5 is a difference of 3/5.", misconceptionId: "E-d1-b" },
        { text: "\\( \\frac{2}{5} \\)", correct: false, feedback: "Incorrect; 17/5 + 2/5 = 19/5, not 4.", misconceptionId: "E-d1-c" }
      ],
    backward: "First convert mixed to improper. Then subtract from the whole expressed as a fraction with the same denominator.",
    forward: "This skill is used in measuring lengths and cooking.",
    misconceptions: [
      { misconceptionId: "E-d1-a", description: "Student answers 17/5, stopping after the conversion step without computing the required addition.", rootCause: "Second-Step-Drop — correctly converts 3 2/5 to 17/5 but stops there, never computing how much more is needed to reach 4.", remediation: "Have the student underline every instruction word ('how much must be added') and check it's addressed before finalizing an answer." },
      { misconceptionId: "E-d1-b", description: "Student answers 1/5, misjudging the gap between 17/5 and 4.", rootCause: "Complement-Miscount — misjudges how far 17/5 is from 20/5 (4 wholes), guessing a small gap of 1/5 instead of correctly computing 20/5-17/5=3/5.", remediation: "Have the student write 4 as 20/5 explicitly, then subtract 17/5 from 20/5 numerator by numerator." },
      { misconceptionId: "E-d1-c", description: "Student answers 2/5, reusing the original fractional part of the mixed number instead of computing the actual gap.", rootCause: "Original-Fraction Reuse — assumes the amount needed to reach the next whole is simply the mixed number's own fractional part (2/5), without checking that 17/5+2/5=19/5≠4.", remediation: "Have the student verify their answer by adding it back to 17/5 and confirming the result equals exactly 20/5." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Convert to improper", hint: "3 2/5 = (3×5+2)/5 = 17/5." },
      { level: 2, description: "Write 4 with the same denominator", hint: "4 = 20/5." },
      { level: 3, description: "Subtract", hint: "20/5 - 17/5 = 3/5." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "ADDSUB-03", probability: 0.4, condition: "If finding the gap to the next whole number is unreliable, mixed-number subtraction requiring regrouping will be harder." }
    ],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NF.A.2"]
  },
  {
    itemId: "d2", order: 2, cluster: "EQUIV", clusterName: CLUSTER_NAMES.EQUIV,
    skillId: "EQUIV-02",
    question: "Simplify \\( \\frac{18}{24} \\) and then write an equivalent fraction with denominator 16.",
    options: [
        { text: "\\( \\frac{12}{16} \\)", correct: true, feedback: "18/24 = 3/4. 3/4 = ?/16 → ? = 12." },
        { text: "\\( \\frac{9}{16} \\)", correct: false, feedback: "You divided numerator by 2 but didn't adjust correctly.", misconceptionId: "E-d2-a" },
        { text: "\\( \\frac{18}{16} \\)", correct: false, feedback: "You only changed the denominator, not the numerator.", misconceptionId: "E-d2-b" },
        { text: "\\( \\frac{3}{4} \\)", correct: false, feedback: "That's simplified, but the question asks for the equivalent with denominator 16.", misconceptionId: "E-d2-c" }
      ],
    backward: "Divide by HCF (6) to get 3/4. Multiply both by 4 to reach denominator 16 (3×4=12).",
    forward: "Finding equivalents with different denominators is essential for adding unlike fractions.",
    misconceptions: [
      { misconceptionId: "E-d2-a", description: "Student answers 9/16, mishandling the rescaling of the numerator.", rootCause: "Wrong-Multiplier — after correctly simplifying to 3/4, uses an incorrect scale factor (e.g. ×3 instead of ×4) when rescaling to denominator 16, producing 9/16 instead of 12/16.", remediation: "Have the student verify the multiplier first: '4 times what equals 16?' before touching the numerator." },
      { misconceptionId: "E-d2-b", description: "Student answers 18/16, changing only the denominator and leaving the original numerator unchanged.", rootCause: "Denominator-Only Change — swaps in the target denominator (16) but leaves the original numerator (18) untouched, skipping both the simplification and the proportional rescaling.", remediation: "Have the student complete the simplification step fully and write down 3/4 before attempting to change the denominator to 16." },
      { misconceptionId: "E-d2-c", description: "Student answers 3/4, stopping after simplifying and never rescaling to denominator 16.", rootCause: "Second-Step-Drop — correctly simplifies to 3/4 but stops there, never completing the second half of the question (rescale to denominator 16).", remediation: "Have the student underline both instructions ('simplify' AND 'write an equivalent with denominator 16') and check both are addressed." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the HCF", hint: "The highest common factor of 18 and 24 is 6." },
      { level: 2, description: "Simplify", hint: "18÷6=3 and 24÷6=4, so 18/24 = 3/4." },
      { level: 3, description: "Scale to the target denominator", hint: "4×4=16, so multiply the numerator by 4 too: 3×4=12, giving 12/16." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "ADDSUB-02", probability: 0.4, condition: "If simplifying and rescaling in sequence is unreliable, finding common denominators for unlike-denominator addition will inherit the same errors." }
    ],
    learningObjectives: ["CCSS.MATH.CONTENT.4.NF.A.1"]
  },
  {
    itemId: "d3", order: 3, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    skillId: "COMP-02",
    question: "Arrange in ascending order: \\( \\frac{3}{8}, \\frac{1}{3}, \\frac{5}{12} \\)",
    options: [
        { text: "\\( \\frac{1}{3}, \\frac{3}{8}, \\frac{5}{12} \\)", correct: true, feedback: "LCM 24: 8/24, 9/24, 10/24 → 1/3, 3/8, 5/12." },
        { text: "\\( \\frac{3}{8}, \\frac{1}{3}, \\frac{5}{12} \\)", correct: false, feedback: "1/3 = 8/24, 3/8 = 9/24; 1/3 is smaller.", misconceptionId: "E-d3-a" },
        { text: "\\( \\frac{5}{12}, \\frac{3}{8}, \\frac{1}{3} \\)", correct: false, feedback: "That's descending.", misconceptionId: "E-d3-b" },
        { text: "\\( \\frac{1}{3}, \\frac{5}{12}, \\frac{3}{8} \\)", correct: false, feedback: "5/12 = 10/24, 3/8 = 9/24; 3/8 is smaller.", misconceptionId: "E-d3-c" }
      ],
    backward: "Find LCM of denominators (24). Convert each fraction, then compare numerators.",
    forward: "Ordering fractions is key in ranking and data analysis.",
    misconceptions: [
      { misconceptionId: "E-d3-a", description: "Student places 3/8 before 1/3, without converting to the common denominator.", rootCause: "Unconverted Comparison — compares the fractions by their original numerators or denominators rather than converting to twenty-fourths first, misjudging that 3/8 is smaller than 1/3.", remediation: "Insist on writing all three fractions in twenty-fourths (8/24, 9/24, 10/24) BEFORE attempting to order them." },
      { misconceptionId: "E-d3-b", description: "Student orders the fractions from largest to smallest.", rootCause: "Direction-Reversal — correctly converts and compares the fractions but arranges largest-to-smallest instead of smallest-to-largest, reversing what 'ascending' means.", remediation: "Have the student picture a staircase going up and label the bottom step 'smallest' before ordering." },
      { misconceptionId: "E-d3-c", description: "Student places 5/12 before 3/8, mis-ordering the last two values.", rootCause: "Partial-Ordering — correctly identifies 1/3 as smallest but swaps the order of 3/8 (9/24) and 5/12 (10/24), not comparing the converted numerators carefully.", remediation: "Have the student compare every adjacent pair of converted numerators (8, 9, 10) explicitly before finalizing the order." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the LCM", hint: "The LCM of 8, 3, and 12 is 24." },
      { level: 2, description: "Convert each fraction", hint: "3/8=9/24, 1/3=8/24, 5/12=10/24." },
      { level: 3, description: "Order the numerators", hint: "8 < 9 < 10, so the order is 1/3, 3/8, 5/12." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.NF.A.2"]
  },
  {
    itemId: "d4", order: 4, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    skillId: "ADDSUB-02",
    question: "\\( \\frac{2}{3} + \\frac{1}{6} \\) = ? (simplest form)",
    options: [
        { text: "\\( \\frac{5}{6} \\)", correct: true, feedback: "2/3 = 4/6. 4/6 + 1/6 = 5/6." },
        { text: "\\( \\frac{3}{9} \\)", correct: false, feedback: "You added numerators (2+1=3) and denominators (3+6=9). Never add denominators.", misconceptionId: "E-d4-a" },
        { text: "\\( \\frac{5}{12} \\)", correct: false, feedback: "You added denominators incorrectly.", misconceptionId: "E-d4-b" },
        { text: "\\( \\frac{4}{6} \\)", correct: false, feedback: "You only converted the first fraction and forgot to add.", misconceptionId: "E-d4-c" }
      ],
    backward: "Make denominators same: 2/3 = 4/6. Add numerators. Simplify if possible.",
    forward: "This is the foundation for adding any fractions.",
    misconceptions: [
      { misconceptionId: "E-d4-a", description: "Student answers 3/9, adding numerators and denominators straight across without converting.", rootCause: "Direct-Addition — adds numerators (2+1=3) and denominators (3+6=9) straight across without first converting to a common denominator.", remediation: "Before any unlike-denominator addition, have the student first rewrite both fractions with the same denominator, so there is nothing left to add 'straight across.'" },
      { misconceptionId: "E-d4-b", description: "Student answers 5/12, correctly adding numerators after conversion but doubling the denominator anyway.", rootCause: "Numerator-Correct-Denominator-Wrong — correctly figures out the sum of numerators after converting (5) but then multiplies the two original denominators together (3×6... or 6+6) instead of using the already-matched denominator of 6.", remediation: "Remind the student that once both fractions share denominator 6, that denominator is the final answer's denominator — it never changes again during the addition." },
      { misconceptionId: "E-d4-c", description: "Student answers 4/6, converting the first fraction but never adding the second.", rootCause: "Conversion-Without-Addition — correctly converts 2/3 to 4/6 but then stops, treating the conversion itself as the final answer instead of continuing to add 1/6.", remediation: "Have the student write the addition problem again AFTER converting, so the '+1/6' is still visible and not forgotten." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find a common denominator", hint: "6 is a multiple of 3, so convert 2/3 into sixths." },
      { level: 2, description: "Convert", hint: "2/3 = 4/6 (multiply numerator and denominator by 2)." },
      { level: 3, description: "Add", hint: "4/6 + 1/6 = 5/6." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "ADDSUB-03", probability: 0.4, condition: "If unlike-denominator addition with whole fractions isn't solid, adding mixed numbers will compound the error." }
    ],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NF.A.1"]
  },
  {
    itemId: "d5", order: 5, cluster: "MUL", clusterName: CLUSTER_NAMES.MUL,
    skillId: "MUL-04",
    question: "\\( 2 \\times \\frac{3}{8} + \\frac{1}{8} \\) = ? (simplest form)",
    options: [
        { text: "\\( \\frac{7}{8} \\)", correct: true, feedback: "2×3/8 = 6/8 = 3/4 = 6/8. + 1/8 = 7/8." },
        { text: "\\( \\frac{6}{8} \\)", correct: false, feedback: "You forgot to add 1/8.", misconceptionId: "E-d5-a" },
        { text: "\\( \\frac{1}{2} \\)", correct: false, feedback: "3/4 + 1/8 = 6/8+1/8=7/8, not 1/2.", misconceptionId: "E-d5-b" },
        { text: "\\( \\frac{4}{8} \\)", correct: false, feedback: "You only did 3/8+1/8, forgetting the multiplication.", misconceptionId: "E-d5-c" }
      ],
    backward: "First perform the multiplication. Then add the fractions, making denominators equal if needed.",
    forward: "This combines two operations that often appear in word problems.",
    misconceptions: [
      { misconceptionId: "E-d5-a", description: "Student answers 6/8, stopping after the multiplication step and never adding 1/8.", rootCause: "Second-Step-Drop — correctly computes 2×3/8=6/8 but stops there, forgetting the problem also asks to add 1/8 to that result.", remediation: "Have the student underline every instruction word ('then add') and check it's addressed before finalizing an answer." },
      { misconceptionId: "E-d5-b", description: "Student answers 1/2, miscomputing the final addition despite doing the multiplication correctly.", rootCause: "Addition-Miscalculation — correctly reaches 6/8 (or 3/4) from the multiplication but then miscomputes 6/8+1/8, perhaps confusing it with 3/4+1/4=1, landing on 1/2 instead of 7/8.", remediation: "Have the student keep both fractions in eighths throughout: 6/8 + 1/8 = 7/8, without switching to fourths partway through." },
      { misconceptionId: "E-d5-c", description: "Student answers 4/8, skipping the multiplication step entirely.", rootCause: "First-Step-Drop — ignores the '2×' multiplication and simply adds the original 3/8 and 1/8 directly, skipping the first operation.", remediation: "Have the student work through the problem in the order it's written, computing the multiplication result FIRST and writing it down before starting the addition." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Do the multiplication first", hint: "2 × 3/8 means multiply the numerator: 2×3=6, giving 6/8." },
      { level: 2, description: "Set up the addition", hint: "Now add 1/8 to 6/8 — the denominators already match." },
      { level: 3, description: "Add", hint: "6/8 + 1/8 = 7/8." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NF.B.6"]
  },
  {
    itemId: "d6", order: 6, cluster: "DIV", clusterName: CLUSTER_NAMES.DIV,
    skillId: "DIV-04",
    question: "\\( \\frac{3}{5} \\div 3 \\) and \\( \\frac{2}{10} \\). Which is larger?",
    options: [
        { text: "They are equal", correct: true, feedback: "3/5 ÷ 3 = 1/5 = 2/10. Both equal." },
        { text: "\\( \\frac{3}{5} \\div 3 \\) is larger", correct: false, feedback: "It equals 1/5, which is exactly 2/10.", misconceptionId: "E-d6-a" },
        { text: "\\( \\frac{2}{10} \\) is larger", correct: false, feedback: "Both are the same.", misconceptionId: "E-d6-b" },
        { text: "Cannot compare", correct: false, feedback: "Both are easily compared after computing.", misconceptionId: "E-d6-c" }
      ],
    backward: "Divide first: 3/5 ÷ 3 = 1/5. Then compare with 2/10 = 1/5.",
    forward: "Multiple steps with fractions require careful simplification.",
    misconceptions: [
      { misconceptionId: "E-d6-a", description: "Student claims 3/5 ÷ 3 is larger, without simplifying 2/10 to compare correctly.", rootCause: "Unsimplified-Comparison — computes 3/5÷3=1/5 correctly but compares it to 2/10 without simplifying 2/10 down to 1/5 first, mistakenly treating the larger-looking numerator/denominator pair (2/10) as smaller.", remediation: "Have the student simplify BOTH values fully to the same form before comparing, rather than comparing an unsimplified fraction to a simplified one." },
      { misconceptionId: "E-d6-b", description: "Student claims 2/10 is larger, without simplifying it to see it equals 1/5.", rootCause: "Unsimplified-Comparison — fails to simplify 2/10 to 1/5, and separately miscomputes or misjudges the division result, leading to picking the wrong side as larger.", remediation: "Have the student simplify 2/10 by dividing both terms by 2, confirming it equals 1/5 exactly." },
      { misconceptionId: "E-d6-c", description: "Student claims the two values cannot be compared.", rootCause: "Computation-Avoidance — assumes a division and a fraction can't be directly compared without realizing both can be simplified to the same simple form first.", remediation: "Walk through both computations explicitly: 3/5÷3=1/5 and 2/10=1/5, so a direct comparison is not just possible but shows equality." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Compute the division", hint: "3/5 ÷ 3 = 3/5 × 1/3 = 3/15 = 1/5." },
      { level: 2, description: "Simplify the second fraction", hint: "2/10 simplifies to 1/5 (divide both by 2)." },
      { level: 3, description: "Compare", hint: "Both simplify to 1/5, so they are equal." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NF.B.7.A"]
  },
  {
    itemId: "d7", order: 7, cluster: "TYPES", clusterName: CLUSTER_NAMES.TYPES,
    skillId: "ADDSUB-03",
    question: "Convert \\( 1\\frac{1}{4} \\) and \\( 2\\frac{1}{2} \\) to improper fractions and find their sum.",
    options: [
        { text: "\\( \\frac{15}{4} \\) (or \\( 3\\frac{3}{4} \\))", correct: true, feedback: "1 1/4 = 5/4; 2 1/2 = 5/2 = 10/4; sum = 15/4 = 3 3/4." },
        { text: "\\( \\frac{5}{4} \\)", correct: false, feedback: "That's only the first number.", misconceptionId: "E-d7-a" },
        { text: "\\( \\frac{10}{4} \\)", correct: false, feedback: "Only the second number.", misconceptionId: "E-d7-b" },
        { text: "\\( 3\\frac{1}{4} \\)", correct: false, feedback: "Incorrect sum; 5/4+10/4=15/4, not 13/4.", misconceptionId: "E-d7-c" }
      ],
    backward: "Convert each to improper, make common denominator, add.",
    forward: "Adding mixed numbers is common in measurement.",
    misconceptions: [
      { misconceptionId: "E-d7-a", description: "Student answers 5/4, converting only the first mixed number and never adding the second.", rootCause: "Addend-Drop — correctly converts 1 1/4 to 5/4 but forgets to convert and add the second mixed number, 2 1/2, entirely.", remediation: "Have the student convert BOTH mixed numbers first, writing each result down separately, before attempting to add them." },
      { misconceptionId: "E-d7-b", description: "Student answers 10/4, converting only the second mixed number and never adding the first.", rootCause: "Addend-Drop — correctly converts 2 1/2 to 10/4 but forgets to convert and add the first mixed number, 1 1/4, entirely.", remediation: "Have the student underline both mixed numbers in the question before converting either, so neither is skipped." },
      { misconceptionId: "E-d7-c", description: "Student answers 3 1/4, miscomputing the sum of the two improper fractions.", rootCause: "Numerator-Addition-Error — correctly converts both mixed numbers to fifths... rather, to fourths (5/4 and 10/4) but then miscomputes 5+10 as 13 instead of 15 when adding the numerators.", remediation: "Have the student re-add 5+10 carefully, perhaps using a number line or counters, before converting the improper sum back to a mixed number." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Convert both mixed numbers", hint: "1 1/4 = 5/4 and 2 1/2 = 5/2." },
      { level: 2, description: "Find a common denominator", hint: "5/2 = 10/4 (multiply numerator and denominator by 2)." },
      { level: 3, description: "Add and convert back", hint: "5/4 + 10/4 = 15/4 = 3 3/4." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.NF.B.3.C"]
  },
  {
    itemId: "d8", order: 8, cluster: "EQUIV", clusterName: CLUSTER_NAMES.EQUIV,
    skillId: "EQUIV-03",
    question: "Which fraction is NOT equivalent to the others? \\( \\frac{4}{6}, \\frac{6}{9}, \\frac{8}{12}, \\frac{3}{5} \\)",
    options: [
        { text: "\\( \\frac{3}{5} \\)", correct: true, feedback: "4/6=2/3, 6/9=2/3, 8/12=2/3. 3/5 ≠ 2/3." },
        { text: "\\( \\frac{4}{6} \\)", correct: false, feedback: "4/6 = 2/3.", misconceptionId: "E-d8-a" },
        { text: "\\( \\frac{6}{9} \\)", correct: false, feedback: "6/9 = 2/3.", misconceptionId: "E-d8-b" },
        { text: "\\( \\frac{8}{12} \\)", correct: false, feedback: "8/12 = 2/3.", misconceptionId: "E-d8-c" }
      ],
    backward: "Simplify each fraction fully; the one that doesn't match is the odd one out.",
    forward: "This sharpens simplification and comparison skills.",
    misconceptions: [
      { misconceptionId: "E-d8-a", description: "Student picks 4/6, which IS equivalent to the others.", rootCause: "Equivalence-Check Skipped — picks an option without verifying it against the others by simplifying, missing that 4/6 correctly reduces to 2/3.", remediation: "Have the student simplify EVERY option to lowest terms before picking the odd one out, rather than guessing by appearance." },
      { misconceptionId: "E-d8-b", description: "Student picks 6/9, which IS equivalent to the others.", rootCause: "Equivalence-Check Skipped — same verification step is skipped, missing that 6/9 correctly reduces to 2/3.", remediation: "Practice the simplification check explicitly: 6÷3=2 and 9÷3=3, confirming 6/9=2/3." },
      { misconceptionId: "E-d8-c", description: "Student picks 8/12, which IS equivalent to the others.", rootCause: "Equivalence-Check Skipped — same verification step is skipped, missing that 8/12 correctly reduces to 2/3.", remediation: "Have the student divide 8 and 12 by their common factor 4 to confirm 8/12=2/3 before ruling it out." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Simplify each option", hint: "Reduce 4/6, 6/9, 8/12, and 3/5 to lowest terms." },
      { level: 2, description: "Compare the results", hint: "Which three fractions share the same simplified form?" },
      { level: 3, description: "Identify the odd one out", hint: "4/6, 6/9, and 8/12 all simplify to 2/3; 3/5 does not." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.NF.A.1"]
  },
  {
    itemId: "d9", order: 9, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    skillId: "COMP-03",
    question: "Which fraction lies exactly halfway between \\( \\frac{1}{3} \\) and \\( \\frac{1}{2} \\)?",
    options: [
        { text: "\\( \\frac{5}{12} \\)", correct: true, feedback: "1/3=2/6, 1/2=3/6. Halfway = (2/6+3/6)/2 = (5/6)/2 = 5/12." },
        { text: "\\( \\frac{1}{4} \\)", correct: false, feedback: "1/4 = 3/12, but 5/12 is the midpoint.", misconceptionId: "E-d9-a" },
        { text: "\\( \\frac{2}{5} \\)", correct: false, feedback: "2/5 = 0.4, but halfway is about 0.416.", misconceptionId: "E-d9-b" },
        { text: "\\( \\frac{3}{8} \\)", correct: false, feedback: "3/8 = 0.375, not the midpoint.", misconceptionId: "E-d9-c" }
      ],
    backward: "Find a common denominator, then average the numerators.",
    forward: "Finding midpoints is used in interpolation.",
    misconceptions: [
      { misconceptionId: "E-d9-a", description: "Student answers 1/4, a fraction smaller than both 1/3 and 1/2.", rootCause: "Outside-The-Range Guess — picks a fraction that is actually smaller than both endpoints (1/4 < 1/3), rather than one that falls between them, suggesting the midpoint idea was not connected to actually averaging the two values.", remediation: "Have the student first confirm their answer is between 1/3 (≈0.33) and 1/2 (0.5) before checking whether it's exactly the midpoint." },
      { misconceptionId: "E-d9-b", description: "Student answers 2/5, a fraction between the two endpoints but not the exact midpoint.", rootCause: "Approximate-Midpoint — picks a fraction that looks roughly centered between 1/3 and 1/2 by estimation, without doing the common-denominator averaging that gives the exact midpoint 5/12.", remediation: "Teach the exact method: convert both fractions to a common denominator, add the numerators, and divide by 2 (or double the denominator) to get the true midpoint." },
      { misconceptionId: "E-d9-c", description: "Student answers 3/8, another approximate but incorrect midpoint.", rootCause: "Approximate-Midpoint — same estimation-by-feel approach, landing on a plausible-looking but not exact midpoint value.", remediation: "Have the student verify their answer using cross-multiplication or decimal conversion against the true midpoint 5/12." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find a common denominator", hint: "Convert 1/3 and 1/2 to sixths: 2/6 and 3/6." },
      { level: 2, description: "Add the numerators", hint: "2/6 + 3/6 = 5/6." },
      { level: 3, description: "Divide by 2", hint: "The midpoint is half of 5/6, which is 5/12." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NF.A.1"]
  },
  {
    itemId: "d10", order: 10, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    skillId: "ADDSUB-02",
    question: "\\( \\frac{5}{6} - \\frac{1}{3} \\) = ? (simplest form)",
    options: [
        { text: "\\( \\frac{1}{2} \\)", correct: true, feedback: "1/3 = 2/6; 5/6 - 2/6 = 3/6 = 1/2." },
        { text: "\\( \\frac{4}{6} \\)", correct: false, feedback: "That would be 5/6 - 1/6; you didn't convert 1/3 correctly.", misconceptionId: "E-d10-a" },
        { text: "\\( \\frac{3}{6} \\)", correct: false, feedback: "Not simplified.", misconceptionId: "E-d10-b" },
        { text: "\\( \\frac{2}{6} \\)", correct: false, feedback: "Incorrect subtraction.", misconceptionId: "E-d10-c" }
      ],
    backward: "Convert 1/3 to 2/6. Subtract numerators, simplify.",
    forward: "Subtraction with unlike denominators is common in recipes.",
    misconceptions: [
      { misconceptionId: "E-d10-a", description: "Student answers 4/6, treating 1/3 as if it were already 1/6.", rootCause: "Denominator-Ignored Conversion — assumes 1/3 can be subtracted from 5/6 by keeping the numerator 1 and just using the target denominator 6, instead of correctly scaling the numerator too (1/3=2/6, not 1/6).", remediation: "Have the student explicitly compute the scale factor (3→6 is ×2) and apply it to BOTH numerator and denominator of 1/3, not just the denominator." },
      { misconceptionId: "E-d10-b", description: "Student answers 3/6, the correct unsimplified difference.", rootCause: "Unsimplified-Result — correctly subtracts to get 3/6 but doesn't reduce it to 1/2.", remediation: "Add a 'can this be simplified?' check as the last step of every subtraction problem." },
      { misconceptionId: "E-d10-c", description: "Student answers 2/6, subtracting in the wrong order or miscomputing the numerators.", rootCause: "Numerator-Subtraction-Error — after correctly converting to 5/6 - 2/6, miscomputes the subtraction as 5-3=2 instead of 5-2=3, perhaps confusing the converted numerator with the original denominator 3.", remediation: "Have the student rewrite the subtraction cleanly as 5/6 - 2/6 with both converted numerators visible before subtracting." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find a common denominator", hint: "6 is a multiple of 3, so convert 1/3 into sixths." },
      { level: 2, description: "Convert", hint: "1/3 = 2/6 (multiply numerator and denominator by 2)." },
      { level: 3, description: "Subtract and simplify", hint: "5/6 - 2/6 = 3/6, which simplifies to 1/2." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NF.A.1"]
  },
  {
    itemId: "d11", order: 11, cluster: "MUL", clusterName: CLUSTER_NAMES.MUL,
    skillId: "MUL-02",
    question: "A tank holds 40 litres. \\( \\frac{3}{5} \\) of it is used. How much is left?",
    options: [
        { text: "16 litres", correct: true, feedback: "Used: 3/5 × 40 = 24 L. Left: 40 - 24 = 16 L." },
        { text: "24 litres", correct: false, feedback: "That's the amount used, not left.", misconceptionId: "E-d11-a" },
        { text: "40 litres", correct: false, feedback: "The total capacity, nothing used.", misconceptionId: "E-d11-b" },
        { text: "8 litres", correct: false, feedback: "Incorrect calculation.", misconceptionId: "E-d11-c" }
      ],
    backward: "First find the used amount, then subtract from total.",
    forward: "This type of problem appears in inventory and resource management.",
    misconceptions: [
      { misconceptionId: "E-d11-a", description: "Student answers 24 litres, the amount used rather than the amount left.", rootCause: "Wrong-Quantity Reported — correctly computes the amount used (3/5×40=24) but reports it directly as the final answer, without subtracting it from the total to find what remains.", remediation: "Have the student underline the actual question ('how much is left') and treat the used-amount calculation as only an intermediate step." },
      { misconceptionId: "E-d11-b", description: "Student answers 40 litres, the full capacity as if nothing were used.", rootCause: "Operation-Skipped — ignores the fraction used entirely and reports the tank's total capacity, as though the word problem's key detail was not processed.", remediation: "Have the student restate the problem in their own words first, identifying both the total and the used fraction, before computing." },
      { misconceptionId: "E-d11-c", description: "Student answers 8 litres, miscalculating either the used amount or the final subtraction.", rootCause: "Fraction-Miscalculation — computes 3/5 of 40 incorrectly (e.g., as 1/5 of 40=8) rather than 3/5 of 40=24, then reports that wrong intermediate value directly.", remediation: "Have the student compute 1/5 of 40 first (=8), then multiply by 3 to get 3/5 of 40 (=24), checking each step separately." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the amount used", hint: "3/5 of 40 = (40÷5)×3 = 8×3 = 24 litres." },
      { level: 2, description: "Identify what's being asked", hint: "The question asks how much is LEFT, not how much was used." },
      { level: 3, description: "Subtract", hint: "40 - 24 = 16 litres left." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "MUL-03", probability: 0.3, condition: "If 'used vs. remaining' word problems aren't tracked carefully, two-step fraction-of-a-fraction word problems will compound the confusion." }
    ],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NF.B.6"]
  },
  {
    itemId: "d12", order: 12, cluster: "DIV", clusterName: CLUSTER_NAMES.DIV,
    skillId: "DIV-04",
    question: "\\( \\frac{3}{4} \\div 2 + \\frac{1}{8} \\) = ? (simplest form)",
    options: [
        { text: "\\( \\frac{1}{2} \\)", correct: true, feedback: "3/4 ÷ 2 = 3/8. 3/8 + 1/8 = 4/8 = 1/2." },
        { text: "\\( \\frac{3}{8} \\)", correct: false, feedback: "You only did the division.", misconceptionId: "E-d12-a" },
        { text: "\\( \\frac{1}{8} \\)", correct: false, feedback: "You only took the second fraction.", misconceptionId: "E-d12-b" },
        { text: "\\( \\frac{5}{8} \\)", correct: false, feedback: "3/8+1/8=4/8, not 5/8.", misconceptionId: "E-d12-c" }
      ],
    backward: "Divide first, then add.",
    forward: "Chaining operations builds fluency with fractions.",
    misconceptions: [
      { misconceptionId: "E-d12-a", description: "Student answers 3/8, stopping after the division step and never adding 1/8.", rootCause: "Second-Step-Drop — correctly computes 3/4÷2=3/8 but stops there, forgetting the problem also asks to add 1/8 to that result.", remediation: "Have the student underline every instruction word ('+ 1/8') and check it's addressed before finalizing an answer." },
      { misconceptionId: "E-d12-b", description: "Student answers 1/8, skipping the division step entirely.", rootCause: "First-Step-Drop — ignores the division by 2 and simply reports the second fraction, 1/8, skipping the first operation entirely.", remediation: "Have the student work through the problem in the order written, computing the division result FIRST and writing it down before starting the addition." },
      { misconceptionId: "E-d12-c", description: "Student answers 5/8, miscomputing the final addition.", rootCause: "Numerator-Addition-Error — correctly reaches 3/8 from the division but then miscomputes 3/8+1/8 as 5/8 instead of 4/8, misadding the numerators.", remediation: "Have the student re-add 3+1 carefully and confirm the sum is 4, giving 4/8." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Do the division first", hint: "3/4 ÷ 2 = 3/4 × 1/2 = 3/8." },
      { level: 2, description: "Set up the addition", hint: "Now add 1/8 to 3/8 — the denominators already match." },
      { level: 3, description: "Add and simplify", hint: "3/8 + 1/8 = 4/8, which simplifies to 1/2." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NF.B.7.C"]
  },
  {
    itemId: "d13", order: 13, cluster: "TYPES", clusterName: CLUSTER_NAMES.TYPES,
    skillId: "ADDSUB-04",
    question: "Convert \\( \\frac{17}{5} \\) to a mixed number. How much less than 4 is it?",
    options: [
        { text: "\\( 3\\frac{2}{5} \\); \\( \\frac{3}{5} \\) less", correct: true, feedback: "17/5 = 3 2/5. 4 = 20/5, difference = 3/5." },
        { text: "\\( 3\\frac{2}{5} \\); \\( \\frac{2}{5} \\) less", correct: false, feedback: "3 2/5 + 2/5 = 3 4/5, not 4.", misconceptionId: "E-d13-a" },
        { text: "\\( 3\\frac{1}{5} \\); \\( \\frac{4}{5} \\) less", correct: false, feedback: "17/5 = 3 2/5, not 3 1/5.", misconceptionId: "E-d13-b" },
        { text: "\\( 3\\frac{3}{5} \\); \\( \\frac{2}{5} \\) less", correct: false, feedback: "17/5 is 3 2/5.", misconceptionId: "E-d13-c" }
      ],
    backward: "Convert, then subtract from whole.",
    forward: "Mixed number differences appear in measuring.",
    misconceptions: [
      { misconceptionId: "E-d13-a", description: "Student converts correctly to 3 2/5 but then reuses the mixed number's own fractional part (2/5) as the gap to 4.", rootCause: "Original-Fraction Reuse — assumes the amount needed to reach the next whole is simply the mixed number's own fractional part (2/5), without checking that 3 2/5+2/5=3 4/5≠4.", remediation: "Have the student verify their answer by adding it back to 3 2/5 and confirming the result equals exactly 4." },
      { misconceptionId: "E-d13-b", description: "Student miscalculates the conversion itself as 3 1/5 instead of 3 2/5, then compounds the error in the gap.", rootCause: "Remainder-Miscount — divides 17÷5 correctly to get quotient 3 but miscomputes the remainder as 1 instead of 2 (17-15=2, not 1), then computes a gap based on the wrong mixed number.", remediation: "Have the student write out the subtraction explicitly: 17 - (3×5) = remainder, to double-check the value before finding the gap to 4." },
      { misconceptionId: "E-d13-c", description: "Student miscalculates the conversion as 3 3/5, then computes a gap based on that wrong value.", rootCause: "Remainder-Miscount — miscalculates the remainder as 3 instead of 2 (17-15=2, not 3), then compounds the error when finding the gap to 4.", remediation: "Have the student re-derive the remainder from the subtraction 17-15=2 rather than guessing, then use that correct remainder to find the gap." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Convert to a mixed number", hint: "17 ÷ 5 = 3 remainder 2, so 17/5 = 3 2/5." },
      { level: 2, description: "Write 4 with the same denominator", hint: "4 = 3 5/5, or as a fraction, 20/5." },
      { level: 3, description: "Subtract", hint: "20/5 - 17/5 = 3/5, so 17/5 is 3/5 less than 4." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NF.A.2"]
  },
  {
    itemId: "d14", order: 14, cluster: "EQUIV", clusterName: CLUSTER_NAMES.EQUIV,
    skillId: "EQUIV-03",
    question: "\\( \\frac{3}{7} = \\frac{?}{28} \\). Then simplify \\( \\frac{12}{28} \\) and compare with \\( \\frac{3}{7} \\).",
    options: [
        { text: "12, they are equal", correct: true, feedback: "3/7 = 12/28. 12/28 simplifies to 3/7. They are equal." },
        { text: "12, but \\( \\frac{12}{28} \\) is larger", correct: false, feedback: "They are the same after simplification.", misconceptionId: "E-d14-a" },
        { text: "9, they are equal", correct: false, feedback: "Missing numerator is 12, not 9.", misconceptionId: "E-d14-b" },
        { text: "12, but \\( \\frac{3}{7} \\) is larger", correct: false, feedback: "They are equal.", misconceptionId: "E-d14-c" }
      ],
    backward: "Multiply numerator and denominator by 4. Then simplify 12/28 to 3/7.",
    forward: "Confirming equivalence through simplification.",
    misconceptions: [
      { misconceptionId: "E-d14-a", description: "Student correctly finds the missing numerator but claims the unsimplified fraction is larger than the simplified one.", rootCause: "Unsimplified-Looks-Bigger Bias — assumes a fraction with bigger-looking numbers (12/28) must represent a bigger value than its simplified form (3/7), not recognizing that scaling both terms by the same factor never changes the value.", remediation: "Have the student cross-multiply 12/28 and 3/7 directly (12×7=84, 3×28=84) to confirm the values are exactly equal, regardless of how the numbers look." },
      { misconceptionId: "E-d14-b", description: "Student answers 9, using the wrong scale factor for the missing numerator.", rootCause: "Wrong-Multiplier — assumes a scale factor of 3 (3×3=9) instead of correctly finding that 7×4=28, i.e. picks an incorrect multiplier.", remediation: "Have the student verify the multiplier first: '7 times what equals 28?' before touching the numerator." },
      { misconceptionId: "E-d14-c", description: "Student correctly finds the missing numerator but claims the simplified fraction is larger.", rootCause: "Unsimplified-Looks-Bigger Bias (reversed) — assumes one of the two equal forms must be bigger and guesses the simplified one, rather than recognizing that simplifying preserves value exactly.", remediation: "Have the student cross-multiply 3/7 and 12/28 directly to confirm the values are exactly equal." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the missing numerator", hint: "7×4=28, so 3×4=12." },
      { level: 2, description: "Simplify 12/28", hint: "Divide both by their HCF, 4: 12÷4=3, 28÷4=7, giving 3/7." },
      { level: 3, description: "Compare", hint: "12/28 simplifies to exactly 3/7, so the two fractions are equal." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.NF.A.1"]
  },
  {
    itemId: "d15", order: 15, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    skillId: "COMP-02",
    question: "Arrange in descending order: \\( \\frac{11}{3}, 3\\frac{1}{6}, \\frac{7}{2} \\)",
    options: [
        { text: "\\( \\frac{11}{3}, \\frac{7}{2}, 3\\frac{1}{6} \\)", correct: true, feedback: "11/3=22/6, 7/2=21/6, 3 1/6=19/6. Descending: 22/6, 21/6, 19/6." },
        { text: "\\( 3\\frac{1}{6}, \\frac{7}{2}, \\frac{11}{3} \\)", correct: false, feedback: "That's ascending.", misconceptionId: "E-d15-a" },
        { text: "\\( \\frac{11}{3}, 3\\frac{1}{6}, \\frac{7}{2} \\)", correct: false, feedback: "7/2 = 21/6 > 3 1/6 = 19/6.", misconceptionId: "E-d15-b" },
        { text: "\\( \\frac{7}{2}, \\frac{11}{3}, 3\\frac{1}{6} \\)", correct: false, feedback: "11/3 = 22/6 > 21/6.", misconceptionId: "E-d15-c" }
      ],
    backward: "Convert all to improper with common denominator 6, then compare numerators.",
    forward: "Mixed forms need careful conversion before ordering.",
    misconceptions: [
      { misconceptionId: "E-d15-a", description: "Student orders the values from smallest to largest.", rootCause: "Direction-Reversal — correctly converts and compares the values but arranges smallest-to-largest instead of largest-to-smallest, reversing what 'descending' means.", remediation: "Have the student picture a staircase going down and label the top step 'largest' before ordering." },
      { misconceptionId: "E-d15-b", description: "Student places 3 1/6 before 7/2, mis-ordering the last two values.", rootCause: "Mixed-Improper Mismatch — doesn't fully convert the mixed number 3 1/6 to the common denominator (19/6) before comparing it to 7/2 (21/6), misjudging which is larger.", remediation: "Have the student convert every value, including the mixed number, to the SAME denominator before comparing any of them." },
      { misconceptionId: "E-d15-c", description: "Student places 7/2 before 11/3, mis-ordering the first two values.", rootCause: "Numerator-Miscompare — after converting to sixths (22/6 and 21/6), misreads which converted numerator is larger, placing 21/6 ahead of 22/6.", remediation: "Have the student write the converted numerators (22, 21, 19) in a row and order those three numbers explicitly before restating the fractions." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find a common denominator", hint: "The LCM of 3, 6, and 2 is 6." },
      { level: 2, description: "Convert each value", hint: "11/3=22/6, 3 1/6=19/6, 7/2=21/6." },
      { level: 3, description: "Order the numerators", hint: "22 > 21 > 19, so the descending order is 11/3, 7/2, 3 1/6." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.NF.A.2"]
  },
  {
    itemId: "d16", order: 16, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    skillId: "ADDSUB-02",
    question: "\\( \\frac{1}{2} + \\frac{1}{3} + \\frac{1}{6} \\) = ? (simplest form)",
    options: [
        { text: "1", correct: true, feedback: "LCM 6: 3/6 + 2/6 + 1/6 = 6/6 = 1." },
        { text: "\\( \\frac{6}{6} \\)", correct: false, feedback: "That's 1, but the simplified answer is just 1.", misconceptionId: "E-d16-a" },
        { text: "\\( \\frac{3}{6} \\)", correct: false, feedback: "You only added the first two? Not correct.", misconceptionId: "E-d16-b" },
        { text: "\\( \\frac{5}{6} \\)", correct: false, feedback: "Missed one fraction.", misconceptionId: "E-d16-c" }
      ],
    backward: "Find LCM of all denominators, convert each, add, simplify.",
    forward: "Adding several fractions is common in probability and statistics.",
    misconceptions: [
      { misconceptionId: "E-d16-a", description: "Student answers 6/6, the correct unsimplified sum.", rootCause: "Unsimplified-Result — correctly adds to get 6/6 but doesn't state the simplified whole-number value, 1.", remediation: "Remind the student that a fraction with matching numerator and denominator always simplifies to the whole number 1." },
      { misconceptionId: "E-d16-b", description: "Student answers 3/6, adding only two of the three fractions.", rootCause: "Addend-Drop — converts and adds only 1/2 and 1/6 (getting 3/6+... miscounted), or otherwise loses track of one of the three terms, resulting in an incomplete sum.", remediation: "Have the student list all three converted fractions in a column (3/6, 2/6, 1/6) and add them one at a time, checking off each as it's used." },
      { misconceptionId: "E-d16-c", description: "Student answers 5/6, missing one of the three fractions in the sum.", rootCause: "Addend-Drop — adds only two of the three converted numerators (e.g. 3+2=5), missing the third fraction (1/6) entirely.", remediation: "Have the student count the converted numerators being added (3, 2, 1) and confirm there are exactly three terms before finalizing the sum." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the LCM", hint: "The LCM of 2, 3, and 6 is 6." },
      { level: 2, description: "Convert each fraction", hint: "1/2=3/6, 1/3=2/6, 1/6 stays 1/6." },
      { level: 3, description: "Add all three", hint: "3/6 + 2/6 + 1/6 = 6/6 = 1." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NF.A.1"]
  },
  {
    itemId: "d17", order: 17, cluster: "MUL", clusterName: CLUSTER_NAMES.MUL,
    skillId: "COMP-01",
    question: "\\( 4 \\times \\frac{2}{9} \\) and \\( \\frac{5}{9} \\). Which is larger?",
    options: [
        { text: "\\( 4 \\times \\frac{2}{9} \\) is larger", correct: true, feedback: "4×2/9 = 8/9. 8/9 > 5/9." },
        { text: "\\( \\frac{5}{9} \\) is larger", correct: false, feedback: "8/9 is greater.", misconceptionId: "E-d17-a" },
        { text: "They are equal", correct: false, feedback: "8/9 ≠ 5/9.", misconceptionId: "E-d17-b" },
        { text: "Cannot compare", correct: false, feedback: "Both are ninths, easy to compare.", misconceptionId: "E-d17-c" }
      ],
    backward: "Compute product, then compare.",
    forward: "Combining multiplication and comparison.",
    misconceptions: [
      { misconceptionId: "E-d17-a", description: "Student claims 5/9 is larger, without correctly computing 4×2/9.", rootCause: "Multiplication-Skipped-Or-Miscalculated — either skips computing 4×2/9 or miscalculates it as smaller than 8/9, so the comparison is made against a wrong or missing value.", remediation: "Have the student compute and write down 4×2/9=8/9 explicitly BEFORE attempting the comparison." },
      { misconceptionId: "E-d17-b", description: "Student claims the two values are equal.", rootCause: "Computation-Skipped — assumes the two expressions must be equal without actually computing 4×2/9 (=8/9) and comparing it to 5/9.", remediation: "Have the student compute both values fully (8/9 and 5/9) and compare the numerators directly since the denominators already match." },
      { misconceptionId: "E-d17-c", description: "Student claims the values cannot be compared.", rootCause: "Computation-Avoidance — assumes a product and a plain fraction can't be compared without realizing the product simplifies to a fraction with the same denominator.", remediation: "Walk through the computation explicitly: 4×2/9=8/9, then compare 8/9 to 5/9 by their numerators." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Compute the product", hint: "4 × 2/9 = (4×2)/9 = 8/9." },
      { level: 2, description: "Check the denominators", hint: "Both 8/9 and 5/9 have denominator 9." },
      { level: 3, description: "Compare", hint: "8 > 5, so 4×2/9 is larger." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.NF.B.4.B"]
  },
  {
    itemId: "d18", order: 18, cluster: "DIV", clusterName: CLUSTER_NAMES.DIV,
    skillId: "DIV-03",
    question: "A ribbon \\( \\frac{5}{6} \\) m long is cut into 5 equal pieces. Two pieces are used. What fraction of the original ribbon is used?",
    options: [
        { text: "\\( \\frac{2}{5} \\)", correct: true, feedback: "5 equal pieces → each is 1/5 of the ribbon. 2 pieces = 2/5 of the ribbon." },
        { text: "\\( \\frac{1}{3} \\)", correct: false, feedback: "That's the actual length used (1/3 m), but the question asks for the fraction of the original.", misconceptionId: "E-d18-a" },
        { text: "\\( \\frac{1}{6} \\)", correct: false, feedback: "That's the length of one piece in metres.", misconceptionId: "E-d18-b" },
        { text: "\\( \\frac{5}{6} \\)", correct: false, feedback: "That's the whole ribbon.", misconceptionId: "E-d18-c" }
      ],
    backward: "Cutting into 5 equal pieces means each piece is 1/5 of the whole, regardless of length. Two pieces = 2/5.",
    forward: "Distinguishing between actual length and fractional part is a key word-problem skill.",
    misconceptions: [
      { misconceptionId: "E-d18-a", description: "Student answers 1/3, giving the actual length used in metres instead of the fraction of the whole ribbon.", rootCause: "Length-Fraction Confusion — computes the actual length used (2 pieces × 1/6 m each = 1/3 m) and reports that value, mistaking a length in metres for the fraction of the ORIGINAL ribbon that was used.", remediation: "Have the student separate the two questions explicitly: 'how long is the piece' versus 'what fraction of the whole ribbon is that' — the second is always (number of pieces used)/(total pieces)." },
      { misconceptionId: "E-d18-b", description: "Student answers 1/6, the fractional length of a single piece rather than two pieces as a fraction of the whole.", rootCause: "Single-Piece Confusion — reports the length of just one piece (1/6 m) rather than the fraction of the whole ribbon represented by the two pieces used.", remediation: "Have the student count how many of the 5 equal pieces were used (2) and place that over the total number of pieces (5)." },
      { misconceptionId: "E-d18-c", description: "Student answers 5/6, the length of the whole ribbon rather than the fraction used.", rootCause: "Whole-Ribbon Confusion — reports the ribbon's total length (5/6 m) instead of computing what fraction of it was used.", remediation: "Have the student restate the question in their own words: 'out of all 5 pieces, how many fifths were used?'" }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the size of each piece as a fraction of the whole", hint: "Cutting into 5 equal pieces means each piece is 1/5 of the ribbon." },
      { level: 2, description: "Count the pieces used", hint: "2 pieces were used out of 5." },
      { level: 3, description: "State the fraction", hint: "2 pieces out of 5 is 2/5 of the original ribbon." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NF.B.7.C"]
  },
  {
    itemId: "d19", order: 19, cluster: "TYPES", clusterName: CLUSTER_NAMES.TYPES,
    skillId: "ADDSUB-03",
    question: "\\( \\frac{23}{6} + 1\\frac{1}{2} \\) = ? (simplest form, as mixed number)",
    options: [
        { text: "\\( 5\\frac{1}{3} \\)", correct: true, feedback: "23/6 = 3 5/6; 1 1/2 = 9/6; sum = 32/6 = 16/3 = 5 1/3." },
        { text: "\\( 4\\frac{1}{2} \\)", correct: false, feedback: "Incorrect addition.", misconceptionId: "E-d19-a" },
        { text: "\\( 5\\frac{1}{6} \\)", correct: false, feedback: "32/6 = 5 2/6 = 5 1/3, not 5 1/6.", misconceptionId: "E-d19-b" },
        { text: "\\( 5\\frac{5}{6} \\)", correct: false, feedback: "You added whole numbers and fractions incorrectly.", misconceptionId: "E-d19-c" }
      ],
    backward: "Convert mixed to improper, find common denominator, add, simplify, convert back.",
    forward: "Multi-step fraction addition combines several core skills.",
    misconceptions: [
      { misconceptionId: "E-d19-a", description: "Student answers 4 1/2, substantially undercounting the sum.", rootCause: "Whole-Number Mismanagement — mishandles converting 23/6 to a mixed number and/or adding the whole-number parts, landing on a total noticeably smaller than the correct 5 1/3.", remediation: "Have the student convert 23/6 to a mixed number FIRST (3 5/6) before attempting to add it to 1 1/2, rather than working with the improper fraction and a mixed number at the same time." },
      { misconceptionId: "E-d19-b", description: "Student answers 5 1/6, correctly finding the improper sum of 32/6 but misconverting the fractional part.", rootCause: "Unsimplified-Fractional-Part — correctly computes 32/6 as the sum but converts it to 5 2/6 and forgets to simplify the fractional part 2/6 down to 1/3.", remediation: "Add a 'can the fractional part be simplified?' check as the final step whenever converting an improper fraction back to a mixed number." },
      { misconceptionId: "E-d19-c", description: "Student answers 5 5/6, miscomputing the numerator sum during the addition step.", rootCause: "Numerator-Addition-Error — after correctly converting both terms to sixths (5/6 leftover and 9/6 total), miscombines the whole and fractional parts, arriving at 5 5/6 instead of the correct 5 1/3.", remediation: "Have the student add the two improper fractions as a single step (23/6 + 9/6 = 32/6) before converting back to a mixed number, rather than trying to add whole and fractional parts separately." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Convert the mixed number", hint: "1 1/2 = 3/2 = 9/6 (using denominator 6)." },
      { level: 2, description: "Add the improper fractions", hint: "23/6 + 9/6 = 32/6." },
      { level: 3, description: "Convert back and simplify", hint: "32/6 = 5 2/6, which simplifies to 5 1/3." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.NF.B.3.C"]
  },
  {
    itemId: "d20", order: 20, cluster: "EQUIV", clusterName: CLUSTER_NAMES.EQUIV,
    skillId: "EQUIV-03",
    question: "\\( \\frac{4}{9} = \\frac{?}{27} \\). Then simplify \\( \\frac{18}{27} \\) and compare with \\( \\frac{4}{9} \\).",
    options: [
        { text: "12, \\( \\frac{18}{27} \\) is larger", correct: true, feedback: "4/9=12/27. 18/27=2/3=6/9, and 4/9<6/9, so 18/27 is larger." },
        { text: "12, they are equal", correct: false, feedback: "12/27 vs 18/27; 18/27 is larger.", misconceptionId: "E-d20-a" },
        { text: "9, \\( \\frac{4}{9} \\) is larger", correct: false, feedback: "Missing numerator is 12, and 4/9 is smaller.", misconceptionId: "E-d20-b" },
        { text: "12, \\( \\frac{4}{9} \\) is larger", correct: false, feedback: "4/9 = 12/27, which is less than 18/27.", misconceptionId: "E-d20-c" }
      ],
    backward: "Find equivalent by multiplying numerator and denominator by 3. Then simplify 18/27 and compare.",
    forward: "Multi-step equivalence and comparison.",
    misconceptions: [
      { misconceptionId: "E-d20-a", description: "Student correctly finds the missing numerator but claims the two fractions are equal.", rootCause: "Skipped-Second-Comparison — correctly finds 4/9=12/27 but never actually compares that to the separately given 18/27, assuming (incorrectly) that both fractions given in the question must represent the same value.", remediation: "Have the student write both fractions with the same denominator (12/27 and 18/27) and directly compare the numerators 12 and 18." },
      { misconceptionId: "E-d20-b", description: "Student answers 9 for the missing numerator, using the wrong scale factor.", rootCause: "Wrong-Multiplier — assumes a scale factor different from 3 when computing 9×?=27, or otherwise miscalculates, then compounds the error by misjudging the comparison too.", remediation: "Have the student verify the multiplier first: '9 times what equals 27?' before touching the numerator." },
      { misconceptionId: "E-d20-c", description: "Student correctly finds the missing numerator but claims 4/9 is larger than 18/27.", rootCause: "Direction-Reversal — correctly converts 4/9 to 12/27 but then compares 12 and 18 backwards, picking the smaller numerator (12, i.e. 4/9) as the larger value.", remediation: "Have the student restate the comparison rule: with the same denominator, the fraction with the larger numerator is larger — 18 > 12, so 18/27 wins." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the missing numerator", hint: "9×3=27, so 4×3=12." },
      { level: 2, description: "Compare with the same denominator", hint: "Compare 12/27 (which equals 4/9) to 18/27." },
      { level: 3, description: "Decide which is larger", hint: "18 > 12, so 18/27 is larger than 4/9." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.NF.A.1"]
  },
  {
    itemId: "d21", order: 21, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    skillId: "COMP-02",
    question: "Which is the largest? \\( \\frac{5}{8}, \\frac{2}{3}, \\frac{7}{12} \\)",
    options: [
        { text: "\\( \\frac{2}{3} \\)", correct: true, feedback: "LCM 24: 15/24, 16/24, 14/24 → 2/3 = 16/24 largest." },
        { text: "\\( \\frac{5}{8} \\)", correct: false, feedback: "5/8 = 15/24, smaller than 16/24.", misconceptionId: "E-d21-a" },
        { text: "\\( \\frac{7}{12} \\)", correct: false, feedback: "7/12 = 14/24, smallest.", misconceptionId: "E-d21-b" },
        { text: "They are all equal", correct: false, feedback: "Different values.", misconceptionId: "E-d21-c" }
      ],
    backward: "Convert all to a common denominator (LCM=24), then compare numerators.",
    forward: "Quick comparison using LCM is a frequent test skill.",
    misconceptions: [
      { misconceptionId: "E-d21-a", description: "Student picks 5/8, without converting to the common denominator.", rootCause: "Unconverted Comparison — compares the fractions by their original numerators or denominators without converting to twenty-fourths first, misjudging that 5/8 is the largest.", remediation: "Insist on writing all three fractions in twenty-fourths (15/24, 16/24, 14/24) BEFORE attempting to compare them." },
      { misconceptionId: "E-d21-b", description: "Student picks 7/12, the smallest of the three values.", rootCause: "Numerator-Miscompare — converts correctly but then selects the smallest converted numerator (14) instead of the largest (16).", remediation: "Have the student write all three converted numerators (15, 16, 14) side by side and circle the largest one before answering." },
      { misconceptionId: "E-d21-c", description: "Student claims all three fractions are equal.", rootCause: "Surface-Similarity Assumption — assumes fractions that all hover near the same value must be equal without actually converting and comparing them.", remediation: "Have the student compute the common-denominator value for each fraction individually and compare the three numbers explicitly." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the LCM", hint: "The LCM of 8, 3, and 12 is 24." },
      { level: 2, description: "Convert each fraction", hint: "5/8=15/24, 2/3=16/24, 7/12=14/24." },
      { level: 3, description: "Compare the numerators", hint: "16 is the largest numerator, so 2/3 is the largest fraction." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.NF.A.2"]
  },
  {
    itemId: "d22", order: 22, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    skillId: "ADDSUB-03",
    question: "\\( 2\\frac{1}{3} + 1\\frac{1}{2} \\) = ? (simplest form, as mixed number)",
    options: [
        { text: "\\( 3\\frac{5}{6} \\)", correct: true, feedback: "2 1/3 = 7/3 = 14/6; 1 1/2 = 3/2 = 9/6; sum = 23/6 = 3 5/6." },
        { text: "\\( 3\\frac{1}{6} \\)", correct: false, feedback: "14/6+9/6=23/6=3 5/6.", misconceptionId: "E-d22-a" },
        { text: "\\( 3\\frac{2}{5} \\)", correct: false, feedback: "Wrong denominator.", misconceptionId: "E-d22-b" },
        { text: "\\( 4\\frac{1}{6} \\)", correct: false, feedback: "Overcounted.", misconceptionId: "E-d22-c" }
      ],
    backward: "Convert to improper, find common denominator, add, convert back to mixed.",
    forward: "Mixed number addition is used in construction and cooking.",
    misconceptions: [
      { misconceptionId: "E-d22-a", description: "Student answers 3 1/6, miscomputing the sum of the converted numerators.", rootCause: "Numerator-Addition-Error — after correctly converting both fractions to sixths (14/6 and 9/6), miscomputes 14+9 as a value giving remainder 1 instead of the correct 23 (remainder 5 after 3 wholes), losing track partway through.", remediation: "Have the student add 14+9 as a standalone step (=23) before converting the improper fraction 23/6 back to a mixed number." },
      { misconceptionId: "E-d22-b", description: "Student answers 3 2/5, using the wrong common denominator entirely.", rootCause: "Wrong-Common-Denominator — uses a denominator unrelated to the LCM of 3 and 2 (which is 6), perhaps combining the original denominators incorrectly (e.g., 3+2=5), producing a fractional part with denominator 5.", remediation: "Have the student find the LCM of 3 and 2 explicitly (it's 6, not their sum) before converting either mixed number." },
      { misconceptionId: "E-d22-c", description: "Student answers 4 1/6, overcounting the whole-number part.", rootCause: "Whole-Number Miscount — correctly finds the fractional remainder but adds one extra to the whole-number part, perhaps double-counting a carry from converting 23/6.", remediation: "Have the student verify 23÷6 explicitly: 6×3=18, remainder 5, giving whole number 3 (not 4)." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Convert both mixed numbers", hint: "2 1/3 = 7/3 and 1 1/2 = 3/2." },
      { level: 2, description: "Find a common denominator", hint: "The LCM of 3 and 2 is 6: 7/3=14/6, 3/2=9/6." },
      { level: 3, description: "Add and convert back", hint: "14/6 + 9/6 = 23/6 = 3 5/6." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.NF.B.3.C"]
  },
  {
    itemId: "d23", order: 23, cluster: "MUL", clusterName: CLUSTER_NAMES.MUL,
    skillId: "MUL-04",
    question: "\\( 3 \\times \\frac{2}{7} + \\frac{3}{7} \\) = ? (simplest form)",
    options: [
        { text: "\\( \\frac{9}{7} \\) (or \\( 1\\frac{2}{7} \\))", correct: true, feedback: "3×2/7 = 6/7. +3/7 = 9/7 = 1 2/7." },
        { text: "\\( \\frac{6}{7} \\)", correct: false, feedback: "Forgot to add 3/7.", misconceptionId: "E-d23-a" },
        { text: "\\( \\frac{5}{7} \\)", correct: false, feedback: "Incorrect multiplication.", misconceptionId: "E-d23-b" },
        { text: "\\( 1\\frac{1}{7} \\)", correct: false, feedback: "9/7 = 1 2/7, not 1 1/7.", misconceptionId: "E-d23-c" }
      ],
    backward: "Multiply first, then add the fractions (same denominator).",
    forward: "Two-step operations with fractions are common.",
    misconceptions: [
      { misconceptionId: "E-d23-a", description: "Student answers 6/7, stopping after the multiplication step and never adding 3/7.", rootCause: "Second-Step-Drop — correctly computes 3×2/7=6/7 but stops there, forgetting the problem also asks to add 3/7 to that result.", remediation: "Have the student underline every instruction word ('+3/7') and check it's addressed before finalizing an answer." },
      { misconceptionId: "E-d23-b", description: "Student answers 5/7, miscomputing the multiplication step.", rootCause: "Multiplication-Miscalculation — miscomputes 3×2 as 5 instead of 6 (perhaps confusing it with 3+2), producing a wrong intermediate value that then gets compounded in the addition.", remediation: "Have the student compute 3×2 as a standalone multiplication fact before placing it over the denominator." },
      { misconceptionId: "E-d23-c", description: "Student answers 1 1/7, misconverting the improper fraction 9/7 to a mixed number.", rootCause: "Remainder-Miscount — correctly reaches 9/7 as the sum but miscalculates the remainder when converting to a mixed number, writing 1 1/7 instead of 1 2/7 (9-7=2, not 1).", remediation: "Have the student write out the subtraction explicitly: 9 - (1×7) = remainder, to double-check the value." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Do the multiplication first", hint: "3 × 2/7 means multiply the numerator: 3×2=6, giving 6/7." },
      { level: 2, description: "Set up the addition", hint: "Now add 3/7 to 6/7 — the denominators already match." },
      { level: 3, description: "Add and convert", hint: "6/7 + 3/7 = 9/7, which as a mixed number is 1 2/7." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NF.B.6"]
  },
  {
    itemId: "d24", order: 24, cluster: "DIV", clusterName: CLUSTER_NAMES.DIV,
    skillId: "DIV-01",
    question: "\\( \\frac{9}{4} \\div 3 \\) = ? (simplest form)",
    options: [
        { text: "\\( \\frac{3}{4} \\)", correct: true, feedback: "9/4 × 1/3 = 9/12 = 3/4." },
        { text: "\\( \\frac{27}{4} \\)", correct: false, feedback: "You multiplied by 3 instead of dividing.", misconceptionId: "E-d24-a" },
        { text: "\\( \\frac{9}{12} \\)", correct: false, feedback: "Not simplified.", misconceptionId: "E-d24-b" },
        { text: "\\( 1\\frac{1}{2} \\)", correct: false, feedback: "Incorrect.", misconceptionId: "E-d24-c" }
      ],
    backward: "Multiply by reciprocal 1/3; simplify.",
    forward: "Division of improper fractions yields a proper fraction.",
    misconceptions: [
      { misconceptionId: "E-d24-a", description: "Student answers 27/4, multiplying the numerator by 3 instead of dividing.", rootCause: "Operation-Reversal — multiplies the numerator by 3 instead of dividing, treating the whole number as a scale-up factor.", remediation: "Have the student predict whether the answer should be bigger or smaller than the start before computing." },
      { misconceptionId: "E-d24-b", description: "Student answers 9/12, the correct unsimplified quotient.", rootCause: "Unsimplified-Quotient — correctly multiplies the denominator by 3 (4×3=12) but leaves the fraction unsimplified as 9/12 instead of reducing to 3/4.", remediation: "Add a 'can this be simplified?' check as the last step of every division problem." },
      { misconceptionId: "E-d24-c", description: "Student answers 1 1/2, miscalculating the division result entirely.", rootCause: "Division-Miscalculation — miscomputes 9/4÷3 in some other way (e.g., dividing only the whole-number-equivalent part of 9/4), landing on 1 1/2 instead of the correct 3/4.", remediation: "Have the student work through the reciprocal method explicitly: 9/4 × 1/3 = (9×1)/(4×3) = 9/12, then simplify." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Turn the divisor into a reciprocal", hint: "Dividing by 3 is the same as multiplying by 1/3." },
      { level: 2, description: "Multiply across", hint: "9/4 × 1/3 = (9×1)/(4×3) = 9/12." },
      { level: 3, description: "Simplify", hint: "9/12 simplifies to 3/4." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NF.B.7.A"]
  }
];

const recheckItems = [
  {
    itemId: "r1", order: 1, cluster: "TYPES", clusterName: CLUSTER_NAMES.TYPES,
    skillId: "ADDSUB-04",
    question: "Convert \\( 2\\frac{3}{4} \\) to an improper fraction, then add \\( \\frac{1}{4} \\). Simplify.",
    options: [
        { text: "3", correct: true, feedback: "2 3/4 = 11/4. + 1/4 = 12/4 = 3." },
        { text: "\\( \\frac{11}{4} \\)", correct: false, feedback: "You forgot to add 1/4.", misconceptionId: "E-r1-a" },
        { text: "\\( 2\\frac{1}{2} \\)", correct: false, feedback: "Incorrect addition.", misconceptionId: "E-r1-b" },
        { text: "\\( 2\\frac{1}{4} \\)", correct: false, feedback: "Incorrect.", misconceptionId: "E-r1-c" }
      ],
    misconceptions: [
      { misconceptionId: "E-r1-a", description: "Student answers 11/4, stopping after the conversion step and never adding 1/4.", rootCause: "Second-Step-Drop — correctly converts 2 3/4 to 11/4 but stops there, forgetting the problem also asks to add 1/4 to that result.", remediation: "Have the student underline every instruction word ('then add') and check it's addressed before finalizing an answer." },
      { misconceptionId: "E-r1-b", description: "Student answers 2 1/2, miscomputing the final addition.", rootCause: "Numerator-Addition-Error — after correctly converting to 11/4, miscomputes 11/4+1/4 as something smaller than 3, perhaps confusing the addition with a subtraction.", remediation: "Have the student re-add 11+1 carefully, confirming the sum is 12, giving 12/4." },
      { misconceptionId: "E-r1-c", description: "Student answers 2 1/4, reporting the original mixed number's whole part combined with the added fraction incorrectly.", rootCause: "Whole-And-Fraction Confusion — mixes the original whole number (2) with the added fraction (1/4) directly, without actually carrying out the addition of 11/4 and 1/4.", remediation: "Have the student work entirely in improper-fraction form (11/4 + 1/4 = 12/4) before converting the final answer back to a whole number or mixed number." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Convert to improper", hint: "2 3/4 = (2×4+3)/4 = 11/4." },
      { level: 2, description: "Add", hint: "11/4 + 1/4 = 12/4." },
      { level: 3, description: "Simplify", hint: "12/4 = 3." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NF.A.2"]
  },
  {
    itemId: "r2", order: 2, cluster: "EQUIV", clusterName: CLUSTER_NAMES.EQUIV,
    skillId: "EQUIV-02",
    question: "Simplify \\( \\frac{16}{20} \\) and write an equivalent fraction with denominator 15.",
    options: [
        { text: "\\( \\frac{12}{15} \\)", correct: true, feedback: "16/20 = 4/5. 4/5 = 12/15." },
        { text: "\\( \\frac{8}{10} \\)", correct: false, feedback: "Not fully simplified.", misconceptionId: "E-r2-a" },
        { text: "\\( \\frac{16}{15} \\)", correct: false, feedback: "Only changed denominator.", misconceptionId: "E-r2-b" },
        { text: "\\( \\frac{12}{20} \\)", correct: false, feedback: "That's 3/5, not 4/5.", misconceptionId: "E-r2-c" }
      ],
    misconceptions: [
      { misconceptionId: "E-r2-a", description: "Student answers 8/10, only partially simplifying the starting fraction.", rootCause: "Partial-Simplification — divides numerator and denominator by 2 instead of the full HCF of 4, leaving a fraction that is equivalent but not fully reduced, and never rescales to denominator 15.", remediation: "Have the student find the full HCF of 16 and 20 (which is 4, not 2) before doing anything else." },
      { misconceptionId: "E-r2-b", description: "Student answers 16/15, changing only the denominator and leaving the original numerator unchanged.", rootCause: "Denominator-Only Change — swaps in the target denominator (15) but leaves the original numerator (16) untouched, skipping both the simplification and the proportional rescaling.", remediation: "Have the student complete the simplification step fully and write down 4/5 before attempting to change the denominator to 15." },
      { misconceptionId: "E-r2-c", description: "Student answers 12/20, rescaling the wrong intermediate fraction.", rootCause: "Wrong-Base-Fraction — simplifies 16/20 incorrectly (e.g., to 3/5 instead of 4/5) and then correctly rescales that WRONG simplified fraction, compounding the initial error.", remediation: "Have the student verify their simplified fraction by multiplying it back out: does (their fraction) × (their scale factor) really reproduce 16/20?" }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the HCF", hint: "The highest common factor of 16 and 20 is 4." },
      { level: 2, description: "Simplify", hint: "16÷4=4 and 20÷4=5, so 16/20 = 4/5." },
      { level: 3, description: "Scale to the target denominator", hint: "5×3=15, so multiply the numerator by 3 too: 4×3=12, giving 12/15." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.NF.A.1"]
  },
  {
    itemId: "r3", order: 3, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    skillId: "COMP-02",
    question: "Arrange ascending: \\( \\frac{3}{5}, \\frac{2}{3}, \\frac{7}{10} \\)",
    options: [
        { text: "\\( \\frac{3}{5}, \\frac{2}{3}, \\frac{7}{10} \\)", correct: true, feedback: "LCM 30: 18/30, 20/30, 21/30." },
        { text: "\\( \\frac{2}{3}, \\frac{3}{5}, \\frac{7}{10} \\)", correct: false, feedback: "3/5=18/30, 2/3=20/30; 3/5 is smaller.", misconceptionId: "E-r3-a" },
        { text: "\\( \\frac{7}{10}, \\frac{2}{3}, \\frac{3}{5} \\)", correct: false, feedback: "Descending.", misconceptionId: "E-r3-b" },
        { text: "\\( \\frac{3}{5}, \\frac{7}{10}, \\frac{2}{3} \\)", correct: false, feedback: "7/10=21/30, 2/3=20/30.", misconceptionId: "E-r3-c" }
      ],
    misconceptions: [
      { misconceptionId: "E-r3-a", description: "Student places 2/3 before 3/5, without converting to the common denominator.", rootCause: "Unconverted Comparison — compares the fractions by their original numerators or denominators rather than converting to thirtieths first, misjudging that 2/3 is smaller than 3/5.", remediation: "Insist on writing all three fractions in thirtieths (18/30, 20/30, 21/30) BEFORE attempting to order them." },
      { misconceptionId: "E-r3-b", description: "Student orders the fractions from largest to smallest.", rootCause: "Direction-Reversal — correctly converts and compares the fractions but arranges largest-to-smallest instead of smallest-to-largest, reversing what 'ascending' means.", remediation: "Have the student picture a staircase going up and label the bottom step 'smallest' before ordering." },
      { misconceptionId: "E-r3-c", description: "Student places 7/10 before 2/3, mis-ordering the last two values.", rootCause: "Partial-Ordering — correctly identifies 3/5 as smallest but swaps the order of 2/3 (20/30) and 7/10 (21/30), not comparing the converted numerators carefully.", remediation: "Have the student compare every adjacent pair of converted numerators (18, 20, 21) explicitly before finalizing the order." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the LCM", hint: "The LCM of 5, 3, and 10 is 30." },
      { level: 2, description: "Convert each fraction", hint: "3/5=18/30, 2/3=20/30, 7/10=21/30." },
      { level: 3, description: "Order the numerators", hint: "18 < 20 < 21, so the order is 3/5, 2/3, 7/10." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.NF.A.2"]
  },
  {
    itemId: "r4", order: 4, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    skillId: "ADDSUB-02",
    question: "\\( \\frac{3}{4} - \\frac{1}{8} + \\frac{1}{2} \\) = ? (simplest form)",
    options: [
        { text: "\\( 1\\frac{1}{8} \\)", correct: true, feedback: "3/4=6/8, 1/2=4/8 → 6/8 - 1/8 + 4/8 = 9/8 = 1 1/8." },
        { text: "\\( \\frac{9}{8} \\)", correct: false, feedback: "That's the same value as 1 1/8, but not written in simplest mixed form.", misconceptionId: "E-r4-a" },
        { text: "\\( \\frac{1}{2} \\)", correct: false, feedback: "Incorrect.", misconceptionId: "E-r4-b" },
        { text: "1", correct: false, feedback: "Too small.", misconceptionId: "E-r4-c" }
      ],
    misconceptions: [
      { misconceptionId: "E-r4-a", description: "Student answers 9/8, the correct value but not converted to a mixed number.", rootCause: "Improper-Fraction-Left-Unconverted — correctly computes the sum as 9/8 but doesn't convert it to the requested mixed-number form, 1 1/8.", remediation: "When a question doesn't specify a form, teach the default habit: always convert an improper fraction answer to a mixed number as the final step." },
      { misconceptionId: "E-r4-b", description: "Student answers 1/2, likely from mishandling the order of operations or a denominator conversion.", rootCause: "Conversion-Or-Order Error — either fails to convert all three fractions to a common denominator before combining them, or processes the operations in the wrong order, producing a value far from the correct 9/8.", remediation: "Have the student convert ALL THREE fractions to eighths first (6/8, 1/8, 4/8), writing them in a row, before doing any adding or subtracting." },
      { misconceptionId: "E-r4-c", description: "Student answers 1, undercounting the final sum by 1/8.", rootCause: "Numerator-Miscount — after converting to eighths, miscounts the running total (6-1+4) as 8 instead of 9, off by exactly one.", remediation: "Have the student compute the running total step by step: 6-1=5, then 5+4=9, checking each intermediate step." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find a common denominator", hint: "8 is a multiple of 4 and 2, so convert all fractions into eighths." },
      { level: 2, description: "Convert", hint: "3/4=6/8, 1/8 stays 1/8, 1/2=4/8." },
      { level: 3, description: "Combine and convert back", hint: "6/8 - 1/8 + 4/8 = 9/8 = 1 1/8." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NF.A.1"]
  },
  {
    itemId: "r5", order: 5, cluster: "MUL", clusterName: CLUSTER_NAMES.MUL,
    skillId: "MUL-04",
    question: "\\( 5 \\times \\frac{2}{9} + \\frac{1}{9} \\) = ? (simplest form)",
    options: [
        { text: "\\( 1\\frac{2}{9} \\)", correct: true, feedback: "5×2/9=10/9. +1/9=11/9=1 2/9." },
        { text: "\\( \\frac{10}{9} \\)", correct: false, feedback: "Forgot to add 1/9.", misconceptionId: "E-r5-a" },
        { text: "\\( \\frac{11}{9} \\)", correct: false, feedback: "Not simplified to mixed number.", misconceptionId: "E-r5-b" },
        { text: "\\( \\frac{10}{18} \\)", correct: false, feedback: "Incorrect multiplication.", misconceptionId: "E-r5-c" }
      ],
    misconceptions: [
      { misconceptionId: "E-r5-a", description: "Student answers 10/9, stopping after the multiplication step and never adding 1/9.", rootCause: "Second-Step-Drop — correctly computes 5×2/9=10/9 but stops there, forgetting the problem also asks to add 1/9 to that result.", remediation: "Have the student underline every instruction word ('+1/9') and check it's addressed before finalizing an answer." },
      { misconceptionId: "E-r5-b", description: "Student answers 11/9, the correct value but not converted to a mixed number.", rootCause: "Improper-Fraction-Left-Unconverted — correctly computes the sum as 11/9 but doesn't convert it to a mixed number, 1 2/9.", remediation: "Teach the default habit: always convert an improper fraction answer to a mixed number as the final step." },
      { misconceptionId: "E-r5-c", description: "Student answers 10/18, multiplying both numerator and denominator by 5 instead of only the numerator.", rootCause: "Numerator-And-Denominator Scaling — multiplies both the numerator and denominator by 5 (5×2=10, 9×... treating it as scaling to an equivalent fraction) instead of multiplying only the numerator.", remediation: "Clarify the rule with a contrast: multiplying a fraction by a whole number scales only the numerator, not the denominator." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Do the multiplication first", hint: "5 × 2/9 means multiply the numerator: 5×2=10, giving 10/9." },
      { level: 2, description: "Set up the addition", hint: "Now add 1/9 to 10/9 — the denominators already match." },
      { level: 3, description: "Add and convert", hint: "10/9 + 1/9 = 11/9, which as a mixed number is 1 2/9." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NF.B.6"]
  },
  {
    itemId: "r6", order: 6, cluster: "DIV", clusterName: CLUSTER_NAMES.DIV,
    skillId: "DIV-04",
    question: "\\( \\frac{5}{8} \\div 5 + \\frac{1}{8} \\) = ? (simplest form)",
    options: [
        { text: "\\( \\frac{1}{4} \\)", correct: true, feedback: "5/8÷5=1/8. 1/8+1/8=2/8=1/4." },
        { text: "\\( \\frac{1}{8} \\)", correct: false, feedback: "Only the division result.", misconceptionId: "E-r6-a" },
        { text: "\\( \\frac{1}{2} \\)", correct: false, feedback: "Incorrect.", misconceptionId: "E-r6-b" },
        { text: "\\( \\frac{5}{8} \\)", correct: false, feedback: "No operation.", misconceptionId: "E-r6-c" }
      ],
    misconceptions: [
      { misconceptionId: "E-r6-a", description: "Student answers 1/8, stopping after the division step and never adding 1/8.", rootCause: "Second-Step-Drop — correctly computes 5/8÷5=1/8 but stops there, forgetting the problem also asks to add 1/8 to that result.", remediation: "Have the student underline every instruction word ('+1/8') and check it's addressed before finalizing an answer." },
      { misconceptionId: "E-r6-b", description: "Student answers 1/2, miscomputing either the division or the final addition.", rootCause: "Computation-Error — miscalculates one of the two steps (likely doubling the division result incorrectly, or misadding), landing on 1/2 instead of the correct 1/4.", remediation: "Have the student compute and write down each step separately: 5/8÷5=1/8, then 1/8+1/8=2/8=1/4." },
      { misconceptionId: "E-r6-c", description: "Student answers 5/8, reporting the original fraction with no operations performed.", rootCause: "No-Operation — writes down the original fraction unchanged, as though neither the division nor the addition took place.", remediation: "Have the student point to each operation symbol in turn ('÷5', then '+1/8') and explain what each does before writing a final answer." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Do the division first", hint: "5/8 ÷ 5 = 5/8 × 1/5 = 5/40 = 1/8." },
      { level: 2, description: "Set up the addition", hint: "Now add 1/8 to 1/8." },
      { level: 3, description: "Add and simplify", hint: "1/8 + 1/8 = 2/8, which simplifies to 1/4." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NF.B.7.C"]
  },
  {
    itemId: "r7", order: 7, cluster: "TYPES", clusterName: CLUSTER_NAMES.TYPES,
    skillId: "ADDSUB-03",
    question: "\\( \\frac{19}{6} + 1\\frac{1}{3} \\) = ? (mixed number)",
    options: [
        { text: "\\( 4\\frac{1}{2} \\)", correct: true, feedback: "19/6=3 1/6; 1 1/3=8/6; sum=27/6=4 3/6=4 1/2." },
        { text: "\\( 4\\frac{1}{3} \\)", correct: false, feedback: "Incorrect conversion.", misconceptionId: "E-r7-a" },
        { text: "\\( 3\\frac{5}{6} \\)", correct: false, feedback: "Only converted the first.", misconceptionId: "E-r7-b" },
        { text: "\\( 5\\frac{1}{6} \\)", correct: false, feedback: "Overcount.", misconceptionId: "E-r7-c" }
      ],
    misconceptions: [
      { misconceptionId: "E-r7-a", description: "Student answers 4 1/3, reporting the correct whole-number part but the wrong fractional part.", rootCause: "Unsimplified-Fractional-Part — correctly finds a sum equivalent to 4 3/6 but converts the fractional part incorrectly to 1/3 instead of correctly simplifying 3/6 to 1/2.", remediation: "Have the student simplify the fractional part of the mixed-number answer as its own separate step: 3/6 → divide both by 3 → 1/2." },
      { misconceptionId: "E-r7-b", description: "Student answers 3 5/6, converting only the first term (19/6) and never adding the second.", rootCause: "Addend-Drop — correctly converts 19/6 to the mixed number 3 1/6 but forgets to add the second term, 1 1/3, entirely.", remediation: "Have the student underline both terms in the question before converting either, so neither is skipped." },
      { misconceptionId: "E-r7-c", description: "Student answers 5 1/6, overcounting the whole-number part of the sum.", rootCause: "Whole-Number Miscount — correctly finds the fractional remainder but adds one extra to the whole-number part, perhaps double-counting a carry from converting 27/6.", remediation: "Have the student verify 27÷6 explicitly: 6×4=24, remainder 3, giving whole number 4 (not 5)." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Convert both terms to sixths", hint: "19/6 stays as is; 1 1/3 = 4/3 = 8/6." },
      { level: 2, description: "Add", hint: "19/6 + 8/6 = 27/6." },
      { level: 3, description: "Convert back and simplify", hint: "27/6 = 4 3/6, which simplifies to 4 1/2." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.NF.B.3.C"]
  },
  {
    itemId: "r8", order: 8, cluster: "EQUIV", clusterName: CLUSTER_NAMES.EQUIV,
    skillId: "EQUIV-03",
    question: "Which is NOT equivalent to \\( \\frac{5}{8} \\)? \\( \\frac{10}{16}, \\frac{15}{24}, \\frac{20}{32}, \\frac{12}{20} \\)",
    options: [
        { text: "\\( \\frac{12}{20} \\)", correct: true, feedback: "12/20 = 3/5 ≠ 5/8." },
        { text: "\\( \\frac{10}{16} \\)", correct: false, feedback: "10/16 = 5/8.", misconceptionId: "E-r8-a" },
        { text: "\\( \\frac{15}{24} \\)", correct: false, feedback: "15/24 = 5/8.", misconceptionId: "E-r8-b" },
        { text: "\\( \\frac{20}{32} \\)", correct: false, feedback: "20/32 = 5/8.", misconceptionId: "E-r8-c" }
      ],
    misconceptions: [
      { misconceptionId: "E-r8-a", description: "Student picks 10/16, which IS equivalent to 5/8.", rootCause: "Equivalence-Check Skipped — picks an option without verifying it against 5/8 by simplifying, missing that 10/16 correctly reduces to 5/8.", remediation: "Have the student simplify EVERY option to lowest terms before picking the odd one out." },
      { misconceptionId: "E-r8-b", description: "Student picks 15/24, which IS equivalent to 5/8.", rootCause: "Equivalence-Check Skipped — same verification step is skipped, missing that 15/24 correctly reduces to 5/8.", remediation: "Practice the simplification check explicitly: 15÷3=5 and 24÷3=8, confirming 15/24=5/8." },
      { misconceptionId: "E-r8-c", description: "Student picks 20/32, which IS equivalent to 5/8.", rootCause: "Equivalence-Check Skipped — same verification step is skipped, missing that 20/32 correctly reduces to 5/8.", remediation: "Have the student divide 20 and 32 by their common factor 4 to confirm 20/32=5/8 before ruling it out." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Simplify each option", hint: "Reduce 10/16, 15/24, 20/32, and 12/20 to lowest terms." },
      { level: 2, description: "Compare to 5/8", hint: "Which simplified fraction does NOT match 5/8?" },
      { level: 3, description: "Confirm", hint: "12/20 simplifies to 3/5, which is not 5/8." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.NF.A.1"]
  },
  {
    itemId: "r9", order: 9, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    skillId: "COMP-03",
    question: "Find the fraction exactly halfway between \\( \\frac{1}{4} \\) and \\( \\frac{1}{3} \\).",
    options: [
        { text: "\\( \\frac{7}{24} \\)", correct: true, feedback: "1/4=6/24, 1/3=8/24; halfway is 7/24." },
        { text: "\\( \\frac{1}{5} \\)", correct: false, feedback: "1/5 = 0.2, smaller than 1/4.", misconceptionId: "E-r9-a" },
        { text: "\\( \\frac{2}{7} \\)", correct: false, feedback: "2/7 is between 1/4 and 1/3, but it is not the exact midpoint.", misconceptionId: "E-r9-b" },
        { text: "\\( \\frac{5}{12} \\)", correct: false, feedback: "5/12 ≈ 0.416, larger than 1/3.", misconceptionId: "E-r9-c" }
      ],
    misconceptions: [
      { misconceptionId: "E-r9-a", description: "Student answers 1/5, a fraction smaller than both 1/4 and 1/3.", rootCause: "Outside-The-Range Guess — picks a fraction that is actually smaller than both endpoints (1/5 < 1/4), rather than one that falls between them, suggesting the midpoint idea was not connected to actually averaging the two values.", remediation: "Have the student first confirm their answer is between 1/4 (=0.25) and 1/3 (≈0.33) before checking whether it's exactly the midpoint." },
      { misconceptionId: "E-r9-b", description: "Student answers 2/7, a fraction that does lie between 1/4 and 1/3 but is not the exact midpoint.", rootCause: "Approximate-Midpoint — picks a fraction that happens to fall between 1/4 and 1/3 by estimation, without doing the common-denominator averaging that gives the exact midpoint 7/24.", remediation: "Teach the exact method: convert both fractions to a common denominator, add the numerators, and divide by 2 (or double the denominator) to get the true midpoint." },
      { misconceptionId: "E-r9-c", description: "Student answers 5/12, a fraction larger than both endpoints.", rootCause: "Outside-The-Range Guess — picks a fraction that is actually larger than both endpoints (5/12 > 1/3), rather than one that falls between them.", remediation: "Have the student confirm their answer is between 1/4 and 1/3 numerically before finalizing it as the midpoint." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find a common denominator", hint: "Convert 1/4 and 1/3 to twenty-fourths: 6/24 and 8/24." },
      { level: 2, description: "Add the numerators", hint: "6/24 + 8/24 = 14/24." },
      { level: 3, description: "Divide by 2", hint: "The midpoint is half of 14/24, which is 7/24." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NF.A.1"]
  },
  {
    itemId: "r10", order: 10, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    skillId: "ADDSUB-03",
    question: "\\( 2\\frac{1}{4} - 1\\frac{2}{3} \\) = ? (simplest form)",
    options: [
        { text: "\\( \\frac{7}{12} \\)", correct: true, feedback: "9/4 - 5/3 = 27/12 - 20/12 = 7/12." },
        { text: "\\( 1\\frac{5}{12} \\)", correct: false, feedback: "Incorrect subtraction.", misconceptionId: "E-r10-a" },
        { text: "\\( 1\\frac{7}{12} \\)", correct: false, feedback: "Whole part is 0 (since 7/12 <1).", misconceptionId: "E-r10-b" },
        { text: "\\( \\frac{1}{12} \\)", correct: false, feedback: "Incorrect.", misconceptionId: "E-r10-c" }
      ],
    misconceptions: [
      { misconceptionId: "E-r10-a", description: "Student answers 1 5/12, substantially overcounting the difference.", rootCause: "Whole-Number Mismanagement — mishandles converting the two mixed numbers to improper fractions and/or subtracting the whole-number parts, landing on a value with a whole-number part that shouldn't be there.", remediation: "Have the student convert BOTH mixed numbers to improper fractions with a common denominator (27/12 and 20/12) before subtracting, rather than trying to subtract whole and fractional parts separately." },
      { misconceptionId: "E-r10-b", description: "Student answers 1 7/12, retaining a whole-number part of 1 that shouldn't be there.", rootCause: "Improper-Subtraction-Result Mismanaged — correctly computes the numerator difference (27-20=7) but mistakenly attaches an extra whole number to the result, not realizing 7/12 is already less than one whole and needs no whole-number part.", remediation: "Have the student check whether their final numerator (7) is smaller than the denominator (12) — if so, the answer is a proper fraction with no whole number attached." },
      { misconceptionId: "E-r10-c", description: "Student answers 1/12, miscomputing the numerator subtraction.", rootCause: "Numerator-Subtraction-Error — miscomputes 27-20 as 1 instead of 7, likely a basic subtraction slip.", remediation: "Have the student redo the subtraction 27-20 carefully, perhaps using a number line or place-value blocks, confirming the result is 7." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Convert both mixed numbers", hint: "2 1/4 = 9/4 and 1 2/3 = 5/3." },
      { level: 2, description: "Find a common denominator", hint: "The LCM of 4 and 3 is 12: 9/4=27/12, 5/3=20/12." },
      { level: 3, description: "Subtract", hint: "27/12 - 20/12 = 7/12." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NF.A.1"]
  },
  {
    itemId: "r11", order: 11, cluster: "MUL", clusterName: CLUSTER_NAMES.MUL,
    skillId: "MUL-03",
    question: "A pizza is cut into 8 slices. \\( \\frac{3}{4} \\) of the pizza is eaten. How many slices are left?",
    options: [
        { text: "2", correct: true, feedback: "3/4 of 8 = 6 slices eaten. 8 - 6 = 2 slices left." },
        { text: "6", correct: false, feedback: "That's the number eaten.", misconceptionId: "E-r11-a" },
        { text: "4", correct: false, feedback: "That's 1/2 of 8.", misconceptionId: "E-r11-b" },
        { text: "8", correct: false, feedback: "No slices eaten.", misconceptionId: "E-r11-c" }
      ],
    misconceptions: [
      { misconceptionId: "E-r11-a", description: "Student answers 6, the number of slices eaten rather than left.", rootCause: "Wrong-Quantity Reported — correctly computes the number of slices eaten (3/4×8=6) but reports it directly as the final answer, without subtracting it from the total to find what remains.", remediation: "Have the student underline the actual question ('how many are LEFT') and treat the eaten-slices calculation as only an intermediate step." },
      { misconceptionId: "E-r11-b", description: "Student answers 4, using the wrong fraction (1/2 instead of 3/4).", rootCause: "Wrong-Fraction Substitution — mentally swaps 3/4 for the more familiar 1/2 and computes half of 8=4, ignoring the actual fraction given.", remediation: "Have the student underline the fraction given in the question (3/4) before computing, to anchor which fraction is actually being used." },
      { misconceptionId: "E-r11-c", description: "Student answers 8, the full pizza as if nothing were eaten.", rootCause: "Operation-Skipped — ignores the fraction eaten entirely and reports the pizza's total slice count, as though the word problem's key detail was not processed.", remediation: "Have the student restate the problem in their own words first, identifying both the total and the eaten fraction, before computing." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the number eaten", hint: "3/4 of 8 = (8÷4)×3 = 2×3 = 6 slices." },
      { level: 2, description: "Identify what's being asked", hint: "The question asks how many are LEFT, not how many were eaten." },
      { level: 3, description: "Subtract", hint: "8 - 6 = 2 slices left." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NF.B.6"]
  },
  {
    itemId: "r12", order: 12, cluster: "DIV", clusterName: CLUSTER_NAMES.DIV,
    skillId: "DIV-04",
    question: "\\( \\frac{7}{10} \\div 7 \\) then add \\( \\frac{2}{5} \\). Simplify.",
    options: [
        { text: "\\( \\frac{1}{2} \\)", correct: true, feedback: "7/10 ÷ 7 = 1/10; + 4/10 = 5/10 = 1/2." },
        { text: "\\( \\frac{1}{10} \\)", correct: false, feedback: "Only division.", misconceptionId: "E-r12-a" },
        { text: "\\( \\frac{3}{10} \\)", correct: false, feedback: "Incorrect addition.", misconceptionId: "E-r12-b" },
        { text: "\\( \\frac{7}{10} \\)", correct: false, feedback: "No operation.", misconceptionId: "E-r12-c" }
      ],
    misconceptions: [
      { misconceptionId: "E-r12-a", description: "Student answers 1/10, stopping after the division step and never adding 2/5.", rootCause: "Second-Step-Drop — correctly computes 7/10÷7=1/10 but stops there, forgetting the problem also asks to add 2/5 to that result.", remediation: "Have the student underline every instruction word ('then add') and check it's addressed before finalizing an answer." },
      { misconceptionId: "E-r12-b", description: "Student answers 3/10, adding 2/5 to 1/10 without first converting to a common denominator.", rootCause: "Unconverted Addition — adds 1/10 and 2/5 by combining numerators directly (1+2=3) without converting 2/5 to tenths (4/10) first.", remediation: "Have the student convert 2/5 to tenths (4/10) explicitly before adding it to 1/10." },
      { misconceptionId: "E-r12-c", description: "Student answers 7/10, reporting the original fraction with no operations performed.", rootCause: "No-Operation — writes down the original fraction unchanged, as though neither the division nor the addition took place.", remediation: "Have the student point to each operation in turn ('÷7', then '+2/5') and explain what each does before writing a final answer." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Do the division first", hint: "7/10 ÷ 7 = 1/10." },
      { level: 2, description: "Convert the second fraction", hint: "2/5 = 4/10 (multiply numerator and denominator by 2)." },
      { level: 3, description: "Add and simplify", hint: "1/10 + 4/10 = 5/10, which simplifies to 1/2." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NF.B.7.C"]
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

// seed/mathSeedCh4FractionsL1.js
//
// Populates math_chapters and math_questions with Grade 5, Chapter 4
// (Fractions), Level 1 — converted from the standalone HTML file
// ch-4-fractions-level-1.html.
//
// Run with: node seed/mathSeedCh4FractionsL1.js

const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-5";
const GRADE_LABEL = "Grade 5";
const CHAPTER_SLUG = "ch-4-fractions";
const CHAPTER_NAME = "Fractions";
const LEVEL = 1;

const CLUSTER_NAMES = {
  TYPES: "Types & Conversions",
  EQUIV: "Equivalent Fractions & Simplifying",
  COMP: "Comparing & Ordering",
  ADDSUB: "Addition & Subtraction (Like Denominators)",
  MUL: "Multiplying Fractions by Whole Numbers",
  DIV: "Dividing Fractions by Whole Numbers"
};

const warmupItems = [
  {
    itemId: "w1", order: 1, cluster: "TYPES", clusterName: CLUSTER_NAMES.TYPES,
    skillId: "FRA-T2",
    question: "Convert \\( 2\\frac{3}{5} \\) to an improper fraction.",
    options: [
        { text: "\\( \\frac{13}{5} \\)", correct: true, feedback: "2×5=10; 10+3=13 → 13/5." },
        { text: "\\( \\frac{10}{5} \\)", correct: false, feedback: "You only multiplied 2×5, forgot to add the numerator 3.", misconceptionId: "E-w1-a" },
        { text: "\\( \\frac{6}{5} \\)", correct: false, feedback: "Incorrect addition.", misconceptionId: "E-w1-b" },
        { text: "\\( \\frac{5}{13} \\)", correct: false, feedback: "You flipped the fraction.", misconceptionId: "E-w1-c" }
      ],
    retryHint: "Multiply the whole number by the denominator, then add the numerator. Write that sum over the denominator.",
    misconceptions: [
      { misconceptionId: "E-w1-a", description: "Student answers 10/5, stopping after multiplying the whole number by the denominator.", rootCause: "Numerator-Drop — multiplies the whole number by the denominator (2×5=10) but never adds the numerator 3, leaving the conversion half-finished.", remediation: "Have the student say the three-step rule aloud — multiply, add, then place over the denominator — and physically circle the '+3' step before they compute." },
      { misconceptionId: "E-w1-b", description: "Student answers 6/5, multiplying the whole number by the numerator instead of the denominator.", rootCause: "Wrong-Multiplicand — multiplies the whole number by the numerator (2×3=6) instead of by the denominator, then places that over the original denominator.", remediation: "Have the student draw an arrow from the whole number specifically to the denominator, so they don't default to multiplying by the numerator instead." },
      { misconceptionId: "E-w1-c", description: "Student answers 5/13, correctly finding 13 and 5 but writing the fraction upside down.", rootCause: "Reciprocal-Flip — correctly computes 13 and 5 but inverts their positions, confusing which one is the numerator.", remediation: "Remind the student the original denominator always stays the denominator; only the numerator changes during mixed-to-improper conversion." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the parts", hint: "In 2 3/5, the whole number is 2, the numerator is 3, the denominator is 5." },
      { level: 2, description: "Multiply and add", hint: "Multiply the whole number by the denominator (2×5=10), then add the numerator (10+3=13)." },
      { level: 3, description: "Place over the denominator", hint: "13 goes over the original denominator: 13/5." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "ADDSUB-03", probability: 0.5, condition: "If mixed-to-improper conversion errors persist into mixed-number addition/subtraction problems." }
    ],
    learningObjectives: ["CCSS.MATH.CONTENT.4.NF.B.3.C"]
  },
  {
    itemId: "w2", order: 2, cluster: "EQUIV", clusterName: CLUSTER_NAMES.EQUIV,
    skillId: "EQUIV-01",
    question: "Simplify \\( \\frac{6}{8} \\) to its lowest terms.",
    options: [
        { text: "\\( \\frac{3}{4} \\)", correct: true, feedback: "Divide numerator and denominator by 2: 6÷2=3, 8÷2=4 → 3/4." },
        { text: "\\( \\frac{2}{4} \\)", correct: false, feedback: "You only divided the numerator by 3? Not correct.", misconceptionId: "E-w2-a" },
        { text: "\\( \\frac{6}{4} \\)", correct: false, feedback: "You made the fraction improper; did you subtract?", misconceptionId: "E-w2-b" },
        { text: "\\( \\frac{12}{16} \\)", correct: false, feedback: "That's an equivalent fraction, but not simplified.", misconceptionId: "E-w2-c" }
      ],
    retryHint: "Find the largest number that divides both 6 and 8 exactly, then divide both by it.",
    misconceptions: [
      { misconceptionId: "E-w2-a", description: "Student answers 2/4, dividing the numerator and denominator by two different numbers.", rootCause: "Mismatched-Divisor — divides the numerator by 3 (6÷3=2) but divides the denominator by 2 (8÷2=4), using two different divisors instead of the same HCF for both.", remediation: "Have the student find one number that divides BOTH 6 and 8 exactly before dividing either — write it down first, then apply it to both terms." },
      { misconceptionId: "E-w2-b", description: "Student answers 6/4, dividing only the denominator and leaving the numerator unchanged.", rootCause: "Denominator-Only Division — divides only the denominator by 2 (8÷2=4) and leaves the numerator unchanged at 6, instead of dividing both terms by the same factor.", remediation: "Model simplifying as two parallel divisions written side by side, so it's visually obvious both numbers must be touched." },
      { misconceptionId: "E-w2-c", description: "Student answers 12/16, scaling the fraction up instead of down.", rootCause: "Wrong-Direction Scaling — multiplies numerator and denominator by 2 looking for an equivalent fraction, instead of dividing by the HCF, moving away from simplest form rather than toward it.", remediation: "Clarify that 'simplify' always means divide, never multiply — practice sorting a mixed list of operations into 'makes simpler' vs 'makes equivalent but bigger'." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "List common factors", hint: "What numbers divide evenly into both 6 and 8?" },
      { level: 2, description: "Find the HCF", hint: "The highest common factor of 6 and 8 is 2." },
      { level: 3, description: "Divide both terms", hint: "6÷2=3 and 8÷2=4, so the simplest form is 3/4." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "COMP-01", probability: 0.4, condition: "If fractions are left unsimplified, comparing or ordering them by eye becomes harder and error-prone." }
    ],
    learningObjectives: ["CCSS.MATH.CONTENT.4.NF.A.1"]
  },
  {
    itemId: "w3", order: 3, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    skillId: "COMP-01",
    question: "Which is larger? \\( \\frac{2}{5} \\) or \\( \\frac{3}{5} \\)?",
    options: [
        { text: "\\( \\frac{3}{5} \\)", correct: true, feedback: "Same denominator; 3 > 2, so 3/5 is larger." },
        { text: "\\( \\frac{2}{5} \\)", correct: false, feedback: "2 is smaller than 3.", misconceptionId: "E-w3-a" },
        { text: "They are equal", correct: false, feedback: "The numerators are different.", misconceptionId: "E-w3-b" },
        { text: "Cannot compare", correct: false, feedback: "They have the same denominator, so they can be compared easily.", misconceptionId: "E-w3-c" }
      ],
    retryHint: "When denominators are the same, just compare the numerators.",
    misconceptions: [
      { misconceptionId: "E-w3-a", description: "Student picks 2/5, the smaller fraction.", rootCause: "Smaller-Number Bias — picks the fraction with the smaller numerator, possibly reading the comparison direction backwards.", remediation: "Have the student restate the question as 'which numerator wins?' before selecting an option, to anchor the comparison direction." },
      { misconceptionId: "E-w3-b", description: "Student claims the two fractions are equal.", rootCause: "Denominator-Only Focus — notices the denominators match and concludes the fractions must be equal, ignoring that the numerators differ.", remediation: "Ask the student to shade 2/5 and 3/5 on identical fraction bars side by side so the visual difference is unmistakable." },
      { misconceptionId: "E-w3-c", description: "Student claims the fractions cannot be compared.", rootCause: "Same-Denominator Doubt — mistakenly believes comparison always requires converting to decimals or finding a new common denominator, not realizing one is already shared.", remediation: "Explicitly teach the shortcut: same denominator means you only ever need to compare numerators." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Check the denominators", hint: "Both fractions have denominator 5 — the pieces are the same size." },
      { level: 2, description: "Compare the numerators", hint: "Compare 2 and 3. Which is bigger?" },
      { level: 3, description: "Pick the larger", hint: "Since 3 > 2, 3/5 is the larger fraction." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.NF.A.2"]
  },
  {
    itemId: "w4", order: 4, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    skillId: "ADDSUB-01",
    question: "Add: \\( \\frac{1}{7} + \\frac{3}{7} \\)",
    options: [
        { text: "\\( \\frac{4}{7} \\)", correct: true, feedback: "Add numerators: 1+3=4; keep denominator 7 → 4/7." },
        { text: "\\( \\frac{4}{14} \\)", correct: false, feedback: "You added the denominators too — never add denominators.", misconceptionId: "E-w4-a" },
        { text: "\\( \\frac{3}{7} \\)", correct: false, feedback: "You forgot to add the first numerator.", misconceptionId: "E-w4-b" },
        { text: "\\( \\frac{1}{7} \\)", correct: false, feedback: "No operation performed.", misconceptionId: "E-w4-c" }
      ],
    retryHint: "Keep the denominator the same; only add the numerators.",
    misconceptions: [
      { misconceptionId: "E-w4-a", description: "Student answers 4/14, adding both numerators and denominators.", rootCause: "Denominator-Addition — adds the denominators as well as the numerators (7+7=14), not realizing the denominator names the piece size and doesn't change when pieces of the same size are combined.", remediation: "Use a fraction-bar picture: seven equal pieces stay seven equal pieces no matter how many are shaded — only the count of shaded pieces (the numerator) grows." },
      { misconceptionId: "E-w4-b", description: "Student answers 3/7, reporting only the second addend.", rootCause: "Addend-Drop — forgets the first fraction (1/7) entirely and reports only the second term.", remediation: "Have the student underline both numerators before adding, so neither term is skipped." },
      { misconceptionId: "E-w4-c", description: "Student answers 1/7, reporting only the first addend.", rootCause: "No-Operation — writes down the first fraction unchanged, as though no addition took place.", remediation: "Ask the student to point to the '+' sign and explain out loud what it means before writing an answer." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Check the denominators", hint: "Both fractions already have denominator 7." },
      { level: 2, description: "Add the numerators", hint: "1 + 3 = 4." },
      { level: 3, description: "Keep the denominator", hint: "The denominator stays 7, so the answer is 4/7." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "ADDSUB-02", probability: 0.5, condition: "If the denominator-addition habit isn't corrected before unlike-denominator addition is introduced." }
    ],
    learningObjectives: ["CCSS.MATH.CONTENT.4.NF.B.3.A"]
  },
  {
    itemId: "w5", order: 5, cluster: "MUL", clusterName: CLUSTER_NAMES.MUL,
    skillId: "MUL-01",
    question: "\\( \\frac{3}{4} \\times 2 \\) = ?",
    options: [
        { text: "\\( \\frac{3}{2} \\) (or 1½)", correct: true, feedback: "3/4 × 2 = (3×2)/4 = 6/4 = 3/2." },
        { text: "\\( \\frac{3}{8} \\)", correct: false, feedback: "You multiplied the denominator instead of the numerator.", misconceptionId: "E-w5-a" },
        { text: "\\( \\frac{6}{4} \\)", correct: false, feedback: "Correct product but not simplified.", misconceptionId: "E-w5-b" },
        { text: "\\( \\frac{4}{6} \\)", correct: false, feedback: "You flipped the fraction.", misconceptionId: "E-w5-c" }
      ],
    retryHint: "Multiply the numerator by the whole number; keep the denominator. Then simplify.",
    misconceptions: [
      { misconceptionId: "E-w5-a", description: "Student answers 3/8, multiplying the denominator by 2 instead of the numerator.", rootCause: "Denominator-Multiplication — multiplies the denominator by 2 (4×2=8) instead of the numerator, treating the whole number as though it shrinks the pieces rather than scales the count.", remediation: "Have the student say aloud which part of the fraction represents 'how many pieces' before multiplying — only that part changes." },
      { misconceptionId: "E-w5-b", description: "Student answers 6/4, the correct unsimplified product.", rootCause: "Unsimplified-Result — correctly multiplies the numerator by 2 (3×2=6) but stops before reducing 6/4 to its simplest form, 3/2.", remediation: "Make simplifying the final step of a checklist the student runs through every time, right after computing a product." },
      { misconceptionId: "E-w5-c", description: "Student answers 4/6, inverting the correct unsimplified product.", rootCause: "Reciprocal-Flip — computes the correct unsimplified product 6/4 but then writes it upside down as 4/6.", remediation: "Have the student double-check which number came from the original denominator (it must stay on the bottom)." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify what changes", hint: "When multiplying a fraction by a whole number, only the numerator is multiplied." },
      { level: 2, description: "Multiply the numerator", hint: "3 × 2 = 6, so you get 6/4." },
      { level: 3, description: "Simplify", hint: "6/4 simplifies to 3/2 (divide both by 2)." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "DIV-01", probability: 0.3, condition: "If numerator/denominator roles stay confused, dividing a fraction by a whole number is likely to trigger the same mix-up." }
    ],
    learningObjectives: ["CCSS.MATH.CONTENT.4.NF.B.4.B"]
  },
  {
    itemId: "w6", order: 6, cluster: "DIV", clusterName: CLUSTER_NAMES.DIV,
    skillId: "DIV-01",
    question: "\\( \\frac{2}{5} \\div 2 \\) = ? (simplest form)",
    options: [
        { text: "\\( \\frac{1}{5} \\)", correct: true, feedback: "2/5 ÷ 2 = (2÷2)/5 = 1/5." },
        { text: "\\( \\frac{2}{10} \\)", correct: false, feedback: "You multiplied the denominator by 2 but didn't simplify.", misconceptionId: "E-w6-a" },
        { text: "\\( \\frac{4}{5} \\)", correct: false, feedback: "You multiplied instead of divided.", misconceptionId: "E-w6-b" },
        { text: "\\( \\frac{5}{2} \\)", correct: false, feedback: "You took the reciprocal incorrectly.", misconceptionId: "E-w6-c" }
      ],
    retryHint: "If the numerator is divisible by the whole number, just divide it. Otherwise, multiply by the reciprocal.",
    misconceptions: [
      { misconceptionId: "E-w6-a", description: "Student answers 2/10, the correct unsimplified equivalent of 1/5.", rootCause: "Unsimplified-Quotient — correctly divides by multiplying the denominator by 2 (5×2=10) but stops before reducing 2/10 to its simplest form, 1/5.", remediation: "Add a 'can this be simplified?' check as the last step of every division problem." },
      { misconceptionId: "E-w6-b", description: "Student answers 4/5, doubling the numerator instead of halving.", rootCause: "Operation-Reversal — multiplies the numerator by 2 instead of dividing, treating ÷2 as though it were ×2.", remediation: "Have the student predict whether the answer to a division should be bigger or smaller than the start before computing, so they catch the sign of the error." },
      { misconceptionId: "E-w6-c", description: "Student answers 5/2, the reciprocal of the original fraction.", rootCause: "Reciprocal-Confusion — takes the reciprocal of the original fraction (2/5 → 5/2) instead of dividing that fraction by 2.", remediation: "Clarify that the reciprocal trick applies to the whole-number divisor (2 → 1/2), not to the fraction itself." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Check if the numerator divides evenly", hint: "Can 2 be divided by 2 exactly? Yes." },
      { level: 2, description: "Divide the numerator", hint: "2÷2=1, so the numerator becomes 1." },
      { level: 3, description: "Keep the denominator", hint: "The denominator stays 5, giving 1/5." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NF.B.7.A"]
  },
  {
    itemId: "w7", order: 7, cluster: "TYPES", clusterName: CLUSTER_NAMES.TYPES,
    skillId: "FRA-T1",
    question: "Which of these is a proper fraction?",
    options: [
        { text: "\\( \\frac{1}{4} \\)", correct: true, feedback: "Proper fraction: numerator (1) < denominator (4)." },
        { text: "\\( \\frac{3}{2} \\)", correct: false, feedback: "Improper: 3 > 2.", misconceptionId: "E-w7-a" },
        { text: "\\( \\frac{5}{3} \\)", correct: false, feedback: "Improper.", misconceptionId: "E-w7-b" },
        { text: "\\( \\frac{7}{5} \\)", correct: false, feedback: "Improper.", misconceptionId: "E-w7-c" }
      ],
    retryHint: "In a proper fraction, the numerator is smaller than the denominator.",
    misconceptions: [
      { misconceptionId: "E-w7-a", description: "Student picks 3/2, an improper fraction.", rootCause: "Improper-As-Proper Misclassification — doesn't check that the numerator (3) exceeds the denominator (2), misapplying 'proper' to a fraction greater than one.", remediation: "Have the student circle the numerator and denominator and write '<' or '>' between them before classifying." },
      { misconceptionId: "E-w7-b", description: "Student picks 5/3, an improper fraction.", rootCause: "Improper-As-Proper Misclassification — same numerator-vs-denominator check is skipped, so a fraction greater than one is labelled proper.", remediation: "Practice sorting a mixed set of fraction cards into 'proper' and 'improper' piles, checking each one explicitly." },
      { misconceptionId: "E-w7-c", description: "Student picks 7/5, an improper fraction.", rootCause: "Improper-As-Proper Misclassification — the numerator/denominator comparison step is skipped entirely.", remediation: "Anchor the definition with a visual: a proper fraction is always less than one whole shaded region." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the definition", hint: "A proper fraction has numerator smaller than denominator." },
      { level: 2, description: "Check each option", hint: "Compare numerator and denominator in each fraction: 1/4, 3/2, 5/3, 7/5." },
      { level: 3, description: "Pick the proper one", hint: "Only 1/4 has numerator less than denominator." }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "w8", order: 8, cluster: "EQUIV", clusterName: CLUSTER_NAMES.EQUIV,
    skillId: "EQUIV-02",
    question: "Fill in the blank: \\( \\frac{2}{3} = \\frac{?}{9} \\)",
    options: [
        { text: "6", correct: true, feedback: "To get from 3 to 9, multiply by 3. Do the same to the numerator: 2×3 = 6." },
        { text: "3", correct: false, feedback: "You might have added 1? The multiplier is 3.", misconceptionId: "E-w8-a" },
        { text: "9", correct: false, feedback: "You just copied the denominator.", misconceptionId: "E-w8-b" },
        { text: "12", correct: false, feedback: "You multiplied by 4 instead of 3.", misconceptionId: "E-w8-c" }
      ],
    retryHint: "What do you multiply the denominator 3 by to get 9? Multiply the numerator by that same number.",
    misconceptions: [
      { misconceptionId: "E-w8-a", description: "Student answers 3, writing the scale factor itself instead of applying it.", rootCause: "Multiplier-As-Answer — correctly finds that the denominator was scaled by 3 (3×3=9), but writes that multiplier itself as the new numerator instead of multiplying it by the original numerator (2×3=6).", remediation: "Have the student write both operations side by side — 'denominator: 3×3=9' and 'numerator: 2×3=___' — so the same multiplier is visibly applied to both." },
      { misconceptionId: "E-w8-b", description: "Student answers 9, copying the new denominator into the numerator slot.", rootCause: "Denominator-Copy — copies the target denominator (9) directly into the numerator blank instead of computing the scaled numerator.", remediation: "Cover the denominator with a card and ask 'what should go in the blank, using only the numerator and the multiplier?' to separate the two steps." },
      { misconceptionId: "E-w8-c", description: "Student answers 12, using the wrong scale factor.", rootCause: "Wrong-Multiplier — assumes a scale factor of 4 (2×4=8, close to 9) instead of correctly finding that 3×3=9, i.e. picks an incorrect multiplier for the denominator relationship.", remediation: "Have the student verify the multiplier first by asking '3 times what equals 9?' before touching the numerator." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the scale factor", hint: "What do you multiply 3 by to get 9?" },
      { level: 2, description: "Apply it to the numerator", hint: "Multiply 3 by that same factor: 2×3=6." },
      { level: 3, description: "State the answer", hint: "The missing numerator is 6." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "ADDSUB-02", probability: 0.4, condition: "If scaling to a target denominator is unreliable, finding common denominators for unlike-denominator addition will be error-prone." }
    ],
    learningObjectives: ["CCSS.MATH.CONTENT.4.NF.A.1"]
  }
];

const diagnosticItems = [
  {
    itemId: "d1", order: 1, cluster: "TYPES", clusterName: CLUSTER_NAMES.TYPES,
    skillId: "FRA-T2",
    question: "Write \\( \\frac{11}{4} \\) as a mixed number.",
    options: [
        { text: "\\( 2\\frac{3}{4} \\)", correct: true, feedback: "11 ÷ 4 = 2 remainder 3 → 2 3/4." },
        { text: "\\( 2\\frac{1}{4} \\)", correct: false, feedback: "The remainder is 3, not 1.", misconceptionId: "E-d1-a" },
        { text: "\\( 3\\frac{1}{4} \\)", correct: false, feedback: "11 ÷ 4 = 2, not 3.", misconceptionId: "E-d1-b" },
        { text: "\\( 1\\frac{3}{4} \\)", correct: false, feedback: "Whole number part is too small.", misconceptionId: "E-d1-c" }
      ],
    backward: "Divide the numerator by the denominator: quotient is the whole number, remainder is the numerator.",
    forward: "Mixed numbers make it easier to visualise quantities.",
    misconceptions: [
      { misconceptionId: "E-d1-a", description: "Student answers 2 1/4, miscalculating the remainder as 1 instead of 3.", rootCause: "Remainder-Miscount — divides 11÷4 correctly to get quotient 2 but miscomputes the remainder as 1 instead of 3 (11-8=3).", remediation: "Have the student write out the subtraction explicitly: 11 - (2×4) = remainder, so the remainder is always checked by subtracting back." },
      { misconceptionId: "E-d1-b", description: "Student answers 3 1/4, overcounting the quotient.", rootCause: "Quotient-Miscount — rounds the quotient up to 3 instead of truncating down to 2, treating 11÷4 as if it rounds to the nearest whole number.", remediation: "Remind the student that the whole-number part counts only FULL groups — 3 groups of 4 would need 12, but there are only 11." },
      { misconceptionId: "E-d1-c", description: "Student answers 1 3/4, undercounting the quotient.", rootCause: "Quotient-Miscount — writes a whole-number part one less than the true quotient, miscounting how many full groups of 4 fit into 11.", remediation: "Have the student skip-count by 4s (4, 8, 12) and note that 11 falls after 8 but before 12, so exactly 2 full groups fit." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Set up the division", hint: "Divide the numerator 11 by the denominator 4." },
      { level: 2, description: "Find quotient and remainder", hint: "4 goes into 11 two times (2×4=8), with remainder 11-8=3." },
      { level: 3, description: "Write the mixed number", hint: "Quotient is the whole number, remainder is the new numerator: 2 3/4." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "ADDSUB-03", probability: 0.5, condition: "If quotient/remainder errors persist into mixed-number addition or subtraction problems." }
    ],
    learningObjectives: ["CCSS.MATH.CONTENT.4.NF.B.3.C"]
  },
  {
    itemId: "d2", order: 2, cluster: "EQUIV", clusterName: CLUSTER_NAMES.EQUIV,
    skillId: "EQUIV-02",
    question: "Find the missing numerator: \\( \\frac{3}{5} = \\frac{?}{20} \\)",
    options: [
        { text: "12", correct: true, feedback: "5×4=20, so 3×4=12." },
        { text: "15", correct: false, feedback: "You added 12 to the numerator? 3+12=15, not correct.", misconceptionId: "E-d2-a" },
        { text: "10", correct: false, feedback: "5×2=10, but that would give denominator 10, not 20.", misconceptionId: "E-d2-b" },
        { text: "6", correct: false, feedback: "3×2=6, but that's for denominator 10.", misconceptionId: "E-d2-c" }
      ],
    backward: "Multiply numerator and denominator by the same number (here, 4).",
    forward: "Equivalent fractions are the basis for adding and subtracting unlike fractions.",
    misconceptions: [
      { misconceptionId: "E-d2-a", description: "Student answers 15, adding the correct answer (12) to the original numerator (3).", rootCause: "Double-Counting — correctly figures the new numerator should be 12, but then adds it to the original numerator (3+12=15) instead of stopping at 12.", remediation: "Have the student box the final scaled numerator as soon as they compute it, so it isn't accidentally combined with the original number again." },
      { misconceptionId: "E-d2-b", description: "Student answers 10, using the wrong scale factor.", rootCause: "Wrong-Multiplier — uses ×2 as the scale factor (5×2=10) instead of the correct ×4 needed to reach the target denominator of 20.", remediation: "Have the student verify the multiplier first: '5 times what equals 20?' before touching the numerator." },
      { misconceptionId: "E-d2-c", description: "Student answers 6, applying a scale factor of 2 to the numerator, matching the same wrong multiplier as the 10 distractor.", rootCause: "Wrong-Multiplier — reuses the incorrect ×2 scale factor on the numerator (3×2=6) without checking it actually produces the target denominator of 20.", remediation: "Have the student check their work by multiplying the found denominator back out: does 5×(their multiplier) really equal 20?" }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the scale factor", hint: "What do you multiply 5 by to get 20?" },
      { level: 2, description: "Apply it to the numerator", hint: "Multiply 3 by that same factor: 3×4." },
      { level: 3, description: "State the answer", hint: "3×4=12, so the missing numerator is 12." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "ADDSUB-02", probability: 0.4, condition: "If scaling to a target denominator is unreliable, unlike-denominator addition will inherit the same errors." }
    ],
    learningObjectives: ["CCSS.MATH.CONTENT.4.NF.A.1"]
  },
  {
    itemId: "d3", order: 3, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    skillId: "COMP-01",
    question: "Which is greater? \\( \\frac{7}{12} \\) or \\( \\frac{5}{12} \\)",
    options: [
        { text: "\\( \\frac{7}{12} \\)", correct: true, feedback: "Same denominator; 7 > 5." },
        { text: "\\( \\frac{5}{12} \\)", correct: false, feedback: "5 is smaller than 7.", misconceptionId: "E-d3-a" },
        { text: "They are equal", correct: false, feedback: "Numerators differ.", misconceptionId: "E-d3-b" },
        { text: "Cannot compare", correct: false, feedback: "Same denominator, easy to compare.", misconceptionId: "E-d3-c" }
      ],
    backward: "Same denominator → compare numerators.",
    forward: "Comparing fractions is essential for ordering data.",
    misconceptions: [
      { misconceptionId: "E-d3-a", description: "Student picks 5/12, the smaller fraction.", rootCause: "Smaller-Number Bias — picks the fraction with the smaller numerator, possibly misreading which direction 'greater' points.", remediation: "Have the student restate the question as 'which numerator wins?' before selecting an option." },
      { misconceptionId: "E-d3-b", description: "Student claims the fractions are equal.", rootCause: "Denominator-Only Focus — notices the shared denominator and concludes equality without checking the numerators.", remediation: "Ask the student to shade 7/12 and 5/12 on identical fraction bars to make the difference visible." },
      { misconceptionId: "E-d3-c", description: "Student claims the fractions cannot be compared.", rootCause: "Same-Denominator Doubt — mistakenly believes a common-denominator conversion is always needed first, not realizing one is already shared.", remediation: "Explicitly teach the shortcut: same denominator means only the numerators need comparing." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Check the denominators", hint: "Both fractions have denominator 12." },
      { level: 2, description: "Compare the numerators", hint: "Compare 7 and 5." },
      { level: 3, description: "Pick the greater", hint: "Since 7 > 5, 7/12 is greater." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.NF.A.2"]
  },
  {
    itemId: "d4", order: 4, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    skillId: "ADDSUB-01",
    question: "\\( \\frac{1}{5} + \\frac{2}{5} \\) = ?",
    options: [
        { text: "\\( \\frac{3}{5} \\)", correct: true, feedback: "1+2=3; keep denominator 5." },
        { text: "\\( \\frac{3}{10} \\)", correct: false, feedback: "You added denominators (5+5=10). Don't add denominators.", misconceptionId: "E-d4-a" },
        { text: "\\( \\frac{2}{5} \\)", correct: false, feedback: "You forgot the first fraction.", misconceptionId: "E-d4-b" },
        { text: "\\( \\frac{1}{5} \\)", correct: false, feedback: "No operation.", misconceptionId: "E-d4-c" }
      ],
    backward: "Add numerators, keep denominator.",
    forward: "Adding fractions is used in recipes, measurements, and time.",
    misconceptions: [
      { misconceptionId: "E-d4-a", description: "Student answers 3/10, adding both numerators and denominators.", rootCause: "Denominator-Addition — adds the denominators as well as the numerators (5+5=10), not realizing the denominator names the piece size and stays fixed.", remediation: "Use a fraction-bar picture: five equal pieces stay five equal pieces regardless of how many are shaded." },
      { misconceptionId: "E-d4-b", description: "Student answers 2/5, reporting only the second addend.", rootCause: "Addend-Drop — forgets the first fraction (1/5) entirely and reports only the second term.", remediation: "Have the student underline both numerators before adding, so neither term is skipped." },
      { misconceptionId: "E-d4-c", description: "Student answers 1/5, reporting only the first addend.", rootCause: "No-Operation — writes down the first fraction unchanged, as though no addition took place.", remediation: "Ask the student to point to the '+' sign and explain what it means before writing an answer." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Check the denominators", hint: "Both fractions already have denominator 5." },
      { level: 2, description: "Add the numerators", hint: "1 + 2 = 3." },
      { level: 3, description: "Keep the denominator", hint: "The denominator stays 5, so the answer is 3/5." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "ADDSUB-02", probability: 0.5, condition: "If the denominator-addition habit isn't corrected before unlike-denominator addition is introduced." }
    ],
    learningObjectives: ["CCSS.MATH.CONTENT.4.NF.B.3.A"]
  },
  {
    itemId: "d5", order: 5, cluster: "MUL", clusterName: CLUSTER_NAMES.MUL,
    skillId: "MUL-01",
    question: "\\( 4 \\times \\frac{1}{3} \\) = ?",
    options: [
        { text: "\\( \\frac{4}{3} \\)", correct: true, feedback: "4 × 1/3 = (4×1)/3 = 4/3." },
        { text: "\\( \\frac{1}{12} \\)", correct: false, feedback: "You multiplied denominators: 3×4=12, but numerator should be 4×1.", misconceptionId: "E-d5-a" },
        { text: "\\( \\frac{4}{12} \\)", correct: false, feedback: "You multiplied both numerator and denominator by 4.", misconceptionId: "E-d5-b" },
        { text: "\\( \\frac{3}{4} \\)", correct: false, feedback: "You flipped the fraction.", misconceptionId: "E-d5-c" }
      ],
    backward: "Multiply the numerator by the whole number, keep the denominator.",
    forward: "Used to find a fraction of a group.",
    misconceptions: [
      { misconceptionId: "E-d5-a", description: "Student answers 1/12, multiplying the denominator by 4 and leaving the numerator at 1.", rootCause: "Both-Multiplied-Wrong-Slot — treats the whole number as a multiplier for the denominator (3×4=12) while leaving the numerator untouched, instead of multiplying the numerator by 4.", remediation: "Have the student say aloud which part represents 'how many pieces' before multiplying — only that part (the numerator) changes." },
      { misconceptionId: "E-d5-b", description: "Student answers 4/12, scaling both numerator and denominator by 4.", rootCause: "Numerator-And-Denominator Scaling — multiplies both the numerator and denominator by 4, as if finding an equivalent fraction, instead of multiplying only the numerator.", remediation: "Clarify the rule with a contrast: 'equivalent fraction' scales both parts, 'multiply by a whole number' scales only the numerator." },
      { misconceptionId: "E-d5-c", description: "Student answers 3/4, the reciprocal of the correct answer's simplified components.", rootCause: "Reciprocal-Flip — inverts the fraction rather than multiplying it by the whole number.", remediation: "Have the student check which number came from the original denominator (it must stay on the bottom)." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify what changes", hint: "When multiplying a fraction by a whole number, only the numerator is multiplied." },
      { level: 2, description: "Multiply the numerator", hint: "4 × 1 = 4." },
      { level: 3, description: "Keep the denominator", hint: "The denominator stays 3, giving 4/3." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.NF.B.4.B"]
  },
  {
    itemId: "d6", order: 6, cluster: "DIV", clusterName: CLUSTER_NAMES.DIV,
    skillId: "DIV-01",
    question: "\\( \\frac{2}{3} \\div 2 \\) = ? (simplest form)",
    options: [
        { text: "\\( \\frac{1}{3} \\)", correct: true, feedback: "2/3 × 1/2 = 2/6 = 1/3." },
        { text: "\\( \\frac{4}{3} \\)", correct: false, feedback: "You multiplied instead of dividing.", misconceptionId: "E-d6-a" },
        { text: "\\( \\frac{1}{6} \\)", correct: false, feedback: "2/3 ÷ 2 = 2/3 × 1/2 = 2/6 = 1/3, not this.", misconceptionId: "E-d6-b" },
        { text: "\\( \\frac{3}{2} \\)", correct: false, feedback: "You took the reciprocal of the fraction.", misconceptionId: "E-d6-c" }
      ],
    backward: "Dividing by a whole number is multiplying by its reciprocal.",
    forward: "Sharing fractions equally is a common real-world problem.",
    misconceptions: [
      { misconceptionId: "E-d6-a", description: "Student answers 4/3, doubling the numerator instead of halving.", rootCause: "Operation-Reversal — multiplies the numerator by 2 instead of dividing, treating ÷2 as though it were ×2.", remediation: "Have the student predict whether the answer should be bigger or smaller than the start before computing, to catch the sign of the error." },
      { misconceptionId: "E-d6-b", description: "Student answers 1/6, applying the division to both numerator and denominator instead of only via the reciprocal.", rootCause: "Double-Application — divides the numerator by 2 (2÷2=1) and then also multiplies the denominator by 2 (3×2=6), applying the ÷2 twice instead of once, producing 1/6 instead of the correct 1/3.", remediation: "Teach the single clean rule: multiply by the reciprocal (×1/2) exactly once, rather than adjusting numerator and denominator separately." },
      { misconceptionId: "E-d6-c", description: "Student answers 3/2, the reciprocal of the original fraction.", rootCause: "Reciprocal-Confusion — takes the reciprocal of the original fraction (2/3 → 3/2) instead of dividing that fraction by 2.", remediation: "Clarify that the reciprocal trick applies to the whole-number divisor (2 → 1/2), not to the fraction being divided." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Turn the divisor into a reciprocal", hint: "Dividing by 2 is the same as multiplying by 1/2." },
      { level: 2, description: "Multiply across", hint: "2/3 × 1/2 = (2×1)/(3×2) = 2/6." },
      { level: 3, description: "Simplify", hint: "2/6 simplifies to 1/3." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NF.B.7.A"]
  },
  {
    itemId: "d7", order: 7, cluster: "TYPES", clusterName: CLUSTER_NAMES.TYPES,
    skillId: "FRA-T1",
    question: "Which of these is an improper fraction? \\( \\frac{3}{8}, \\frac{7}{4}, \\frac{1}{2}, \\frac{5}{6} \\)",
    options: [
        { text: "\\( \\frac{7}{4} \\)", correct: true, feedback: "7 > 4, so it's improper." },
        { text: "\\( \\frac{3}{8} \\)", correct: false, feedback: "3 < 8, proper.", misconceptionId: "E-d7-a" },
        { text: "\\( \\frac{1}{2} \\)", correct: false, feedback: "1 < 2, proper.", misconceptionId: "E-d7-b" },
        { text: "\\( \\frac{5}{6} \\)", correct: false, feedback: "5 < 6, proper.", misconceptionId: "E-d7-c" }
      ],
    backward: "Improper fractions have numerator ≥ denominator.",
    forward: "They can be converted to mixed numbers for clarity.",
    misconceptions: [
      { misconceptionId: "E-d7-a", description: "Student picks 3/8, a proper fraction.", rootCause: "Proper-As-Improper Misclassification — doesn't check that the numerator (3) is smaller than the denominator (8), misapplying 'improper' to a fraction less than one.", remediation: "Have the student circle the numerator and denominator and write '<' or '>' between them before classifying." },
      { misconceptionId: "E-d7-b", description: "Student picks 1/2, a proper fraction.", rootCause: "Proper-As-Improper Misclassification — the numerator/denominator comparison step is skipped, so a fraction less than one is labelled improper.", remediation: "Practice sorting a mixed set of fraction cards into 'proper' and 'improper' piles, checking each one explicitly." },
      { misconceptionId: "E-d7-c", description: "Student picks 5/6, a proper fraction.", rootCause: "Proper-As-Improper Misclassification — same comparison step is skipped for this option too.", remediation: "Anchor the definition with a visual: an improper fraction always represents one whole shaded region or more." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the definition", hint: "An improper fraction has numerator ≥ denominator." },
      { level: 2, description: "Check each option", hint: "Compare numerator and denominator in each fraction: 3/8, 7/4, 1/2, 5/6." },
      { level: 3, description: "Pick the improper one", hint: "Only 7/4 has numerator greater than denominator." }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d8", order: 8, cluster: "EQUIV", clusterName: CLUSTER_NAMES.EQUIV,
    skillId: "EQUIV-01",
    question: "Write \\( \\frac{8}{12} \\) in simplest form.",
    options: [
        { text: "\\( \\frac{2}{3} \\)", correct: true, feedback: "Divide numerator and denominator by 4 (HCF)." },
        { text: "\\( \\frac{4}{6} \\)", correct: false, feedback: "Not fully simplified; divide by 2 again.", misconceptionId: "E-d8-a" },
        { text: "\\( \\frac{8}{12} \\)", correct: false, feedback: "That's the original.", misconceptionId: "E-d8-b" },
        { text: "\\( \\frac{3}{4} \\)", correct: false, feedback: "Incorrect simplification.", misconceptionId: "E-d8-c" }
      ],
    backward: "Divide numerator and denominator by their HCF (4).",
    forward: "Simplified fractions are easier to compare and operate with.",
    misconceptions: [
      { misconceptionId: "E-d8-a", description: "Student answers 4/6, dividing by 2 instead of the full HCF of 4.", rootCause: "Partial-Simplification — divides numerator and denominator by 2 (the first common factor noticed) instead of by the full HCF of 4, leaving a fraction that is equivalent but not fully reduced.", remediation: "Have the student list ALL common factors of 8 and 12 first, then pick the largest one, rather than dividing by the first factor they spot." },
      { misconceptionId: "E-d8-b", description: "Student answers 8/12, the unsimplified original.", rootCause: "No-Simplification — repeats the original fraction, not recognizing that 8 and 12 share a common factor.", remediation: "Ask the student to check whether numerator and denominator are both even (or both divisible by some small number) before declaring a fraction already simplest." },
      { misconceptionId: "E-d8-c", description: "Student answers 3/4, swapping which number gets divided by which factor.", rootCause: "Cross-Swap Error — mentally swaps which number is treated as the numerator and which as the denominator partway through simplifying, arriving at 3/4 instead of the correctly-oriented 2/3.", remediation: "Have the student label the numerator and denominator with N and D before dividing, and keep those labels through both division steps." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "List common factors", hint: "What numbers divide evenly into both 8 and 12?" },
      { level: 2, description: "Find the HCF", hint: "The highest common factor of 8 and 12 is 4." },
      { level: 3, description: "Divide both terms", hint: "8÷4=2 and 12÷4=3, so the simplest form is 2/3." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "COMP-01", probability: 0.4, condition: "If fractions are left unsimplified, comparing or ordering them by eye becomes harder and error-prone." }
    ],
    learningObjectives: ["CCSS.MATH.CONTENT.4.NF.A.1"]
  },
  {
    itemId: "d9", order: 9, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    skillId: "COMP-01",
    question: "Which is smaller? \\( \\frac{1}{4} \\) or \\( \\frac{1}{3} \\)",
    options: [
        { text: "\\( \\frac{1}{4} \\)", correct: true, feedback: "Larger denominator means smaller pieces; 1/4 < 1/3." },
        { text: "\\( \\frac{1}{3} \\)", correct: false, feedback: "1/3 is larger.", misconceptionId: "E-d9-a" },
        { text: "They are equal", correct: false, feedback: "Different denominators.", misconceptionId: "E-d9-b" },
        { text: "Cannot compare", correct: false, feedback: "Unit fractions can be compared by denominators.", misconceptionId: "E-d9-c" }
      ],
    backward: "When numerators are the same, the fraction with the larger denominator is smaller.",
    forward: "Unit fraction comparison builds number sense.",
    misconceptions: [
      { misconceptionId: "E-d9-a", description: "Student picks 1/3, thinking the larger-looking denominator makes the larger fraction.", rootCause: "Numerator-Match Bias — since numerators are equal (both 1), assumes the fraction with the bigger denominator number must be the bigger fraction, ignoring that more pieces means smaller pieces.", remediation: "Show identical circles split into 4 and 3 pieces side by side, so the student sees that more slices means each slice is smaller." },
      { misconceptionId: "E-d9-b", description: "Student claims the fractions are equal.", rootCause: "Different-Denominator Confusion — assumes unit fractions with different denominators must somehow still be equal, without reasoning about piece size.", remediation: "Have the student physically fold two same-size paper strips into 4ths and 3rds and compare one piece from each." },
      { misconceptionId: "E-d9-c", description: "Student claims the fractions cannot be compared.", rootCause: "Common-Denominator Doubt — believes a common denominator must first be found, not realizing unit fractions can be compared directly by denominator size.", remediation: "Teach the direct rule for unit fractions: bigger denominator, smaller piece, smaller fraction." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Notice the numerators", hint: "Both fractions have numerator 1 — they're unit fractions." },
      { level: 2, description: "Think about piece size", hint: "Splitting into 4 pieces makes each piece smaller than splitting into 3 pieces." },
      { level: 3, description: "Pick the smaller", hint: "1/4 < 1/3 because fourths are smaller pieces than thirds." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.NF.A.2"]
  },
  {
    itemId: "d10", order: 10, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    skillId: "ADDSUB-01",
    question: "\\( \\frac{5}{8} - \\frac{3}{8} \\) = ? (simplest form)",
    options: [
        { text: "\\( \\frac{1}{4} \\)", correct: true, feedback: "5-3=2; 2/8 simplifies to 1/4." },
        { text: "\\( \\frac{2}{8} \\)", correct: false, feedback: "Not simplified.", misconceptionId: "E-d10-a" },
        { text: "\\( \\frac{1}{2} \\)", correct: false, feedback: "Incorrect simplification.", misconceptionId: "E-d10-b" },
        { text: "\\( \\frac{3}{8} \\)", correct: false, feedback: "No operation.", misconceptionId: "E-d10-c" }
      ],
    backward: "Subtract numerators, keep denominator, then simplify.",
    forward: "Subtraction appears in many measurement problems.",
    misconceptions: [
      { misconceptionId: "E-d10-a", description: "Student answers 2/8, the correct unsimplified difference.", rootCause: "Unsimplified-Result — correctly subtracts to get 2/8 but doesn't reduce it to 1/4.", remediation: "Add a 'can this be simplified?' check as the last step of every subtraction problem." },
      { misconceptionId: "E-d10-b", description: "Student answers 1/2, simplifying 2/8 using the wrong factor.", rootCause: "Incorrect-Simplification — attempts to simplify 2/8 but divides by 4 as if the numerator were 4, landing on 1/2 instead of the correct 1/4.", remediation: "Have the student divide both numerator and denominator by the SAME number and check the result: 2÷2=1, 8÷2=4, giving 1/4." },
      { misconceptionId: "E-d10-c", description: "Student answers 3/8, the fraction being subtracted.", rootCause: "Subtrahend-Drop — writes down the fraction being subtracted (3/8) instead of performing the subtraction.", remediation: "Have the student underline the minuend and subtrahend and say 'first minus second' aloud before writing an answer." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Check the denominators", hint: "Both fractions already have denominator 8." },
      { level: 2, description: "Subtract the numerators", hint: "5 - 3 = 2." },
      { level: 3, description: "Simplify", hint: "2/8 simplifies to 1/4 (divide both by 2)." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.NF.B.3.A"]
  },
  {
    itemId: "d11", order: 11, cluster: "MUL", clusterName: CLUSTER_NAMES.MUL,
    skillId: "MUL-02",
    question: "What is \\( \\frac{1}{5} \\) of 20?",
    options: [
        { text: "4", correct: true, feedback: "20 ÷ 5 = 4." },
        { text: "5", correct: false, feedback: "You might have read it as 1/4 of 20.", misconceptionId: "E-d11-a" },
        { text: "\\( \\frac{1}{5} \\)", correct: false, feedback: "That's the fraction, not the answer.", misconceptionId: "E-d11-b" },
        { text: "100", correct: false, feedback: "You multiplied 20×5.", misconceptionId: "E-d11-c" }
      ],
    backward: "Divide by the denominator and multiply by the numerator.",
    forward: "Finding a fraction of an amount is used in discounts and sharing.",
    misconceptions: [
      { misconceptionId: "E-d11-a", description: "Student answers 5, using the wrong unit fraction.", rootCause: "Wrong-Fraction Substitution — mentally swaps 1/5 for the more familiar 1/4 and computes 20÷4=5 instead of 20÷5.", remediation: "Have the student underline the denominator in the question before dividing, to anchor which fraction is actually being used." },
      { misconceptionId: "E-d11-b", description: "Student answers 1/5, writing the fraction itself.", rootCause: "Fraction-As-Answer — writes down the fraction from the question rather than carrying out the 'of' operation on 20.", remediation: "Remind the student that 'of' is an instruction to compute, not a label to copy — ask 'what number is the answer?'" },
      { misconceptionId: "E-d11-c", description: "Student answers 100, multiplying instead of dividing.", rootCause: "Operation-Reversal — multiplies 20×5 instead of dividing, treating 'of' as multiplication by the denominator rather than division.", remediation: "Anchor the rule: finding a unit fraction 'of' a number means dividing by the denominator, not multiplying." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the operation", hint: "'1/5 of 20' means divide 20 by 5." },
      { level: 2, description: "Divide", hint: "20 ÷ 5 = 4." },
      { level: 3, description: "State the answer", hint: "1/5 of 20 is 4." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "FRA-T3", probability: 0.3, condition: "If 'fraction of a number' isn't solid, the reverse problem (finding the whole from a part) will be harder in later levels." }
    ],
    learningObjectives: ["CCSS.MATH.CONTENT.4.NF.B.4.C"]
  },
  {
    itemId: "d12", order: 12, cluster: "DIV", clusterName: CLUSTER_NAMES.DIV,
    skillId: "DIV-01",
    question: "\\( \\frac{3}{4} \\div 3 \\) = ? (simplest form)",
    options: [
        { text: "\\( \\frac{1}{4} \\)", correct: true, feedback: "3/4 × 1/3 = 3/12 = 1/4." },
        { text: "\\( \\frac{9}{4} \\)", correct: false, feedback: "You multiplied by 3 instead of dividing.", misconceptionId: "E-d12-a" },
        { text: "\\( \\frac{3}{12} \\)", correct: false, feedback: "Not simplified.", misconceptionId: "E-d12-b" },
        { text: "\\( \\frac{4}{3} \\)", correct: false, feedback: "You took the reciprocal incorrectly.", misconceptionId: "E-d12-c" }
      ],
    backward: "Multiply by reciprocal: 1/3.",
    forward: "Cutting a fraction into equal parts is common in crafts.",
    misconceptions: [
      { misconceptionId: "E-d12-a", description: "Student answers 9/4, multiplying the numerator by 3 instead of dividing.", rootCause: "Operation-Reversal — multiplies the numerator by 3 instead of dividing, treating the whole number as a scale-up factor.", remediation: "Have the student predict whether the answer should be bigger or smaller than the start before computing." },
      { misconceptionId: "E-d12-b", description: "Student answers 3/12, the correct unsimplified quotient.", rootCause: "Unsimplified-Quotient — correctly multiplies the denominator by 3 (4×3=12) but leaves the fraction unsimplified as 3/12 instead of reducing to 1/4.", remediation: "Add a 'can this be simplified?' check as the last step of every division problem." },
      { misconceptionId: "E-d12-c", description: "Student answers 4/3, the reciprocal of the original fraction.", rootCause: "Reciprocal-Flip — inverts the original fraction instead of dividing it by 3.", remediation: "Clarify that the reciprocal trick applies to the whole-number divisor (3 → 1/3), not to the fraction being divided." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Turn the divisor into a reciprocal", hint: "Dividing by 3 is the same as multiplying by 1/3." },
      { level: 2, description: "Multiply across", hint: "3/4 × 1/3 = (3×1)/(4×3) = 3/12." },
      { level: 3, description: "Simplify", hint: "3/12 simplifies to 1/4." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NF.B.7.A"]
  },
  {
    itemId: "d13", order: 13, cluster: "TYPES", clusterName: CLUSTER_NAMES.TYPES,
    skillId: "FRA-T2",
    question: "Convert \\( 1\\frac{2}{5} \\) to an improper fraction.",
    options: [
        { text: "\\( \\frac{7}{5} \\)", correct: true, feedback: "(1×5)+2 = 7 → 7/5." },
        { text: "\\( \\frac{5}{5} \\)", correct: false, feedback: "Only the whole part converted.", misconceptionId: "E-d13-a" },
        { text: "\\( \\frac{3}{5} \\)", correct: false, feedback: "Added incorrectly: 1+2=3.", misconceptionId: "E-d13-b" },
        { text: "\\( \\frac{1}{5} \\)", correct: false, feedback: "No operation.", misconceptionId: "E-d13-c" }
      ],
    backward: "Multiply whole by denominator, add numerator, place over denominator.",
    forward: "Improper fractions are easier to multiply and divide.",
    misconceptions: [
      { misconceptionId: "E-d13-a", description: "Student answers 5/5, converting only the whole number part and dropping the numerator.", rootCause: "Whole-Only Conversion — converts only the whole number part (1×5=5) and drops the numerator 2 entirely.", remediation: "Have the student say the three-step rule aloud — multiply, add, then place over the denominator — circling the '+2' step before computing." },
      { misconceptionId: "E-d13-b", description: "Student answers 3/5, adding the whole number and numerator without multiplying first.", rootCause: "Addition-Confusion — adds the whole number and numerator directly (1+2=3) without first multiplying the whole number by the denominator.", remediation: "Emphasize the multiply-first order: the whole number must be multiplied by the denominator before anything is added." },
      { misconceptionId: "E-d13-c", description: "Student answers 1/5, keeping the fractional part unchanged and ignoring the whole number.", rootCause: "Numerator-Drop — keeps the original numerator and denominator unchanged, ignoring the whole number entirely.", remediation: "Ask the student to point to the whole number '1' and explain what it contributes before writing the improper fraction." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the parts", hint: "In 1 2/5, the whole number is 1, the numerator is 2, the denominator is 5." },
      { level: 2, description: "Multiply and add", hint: "Multiply the whole number by the denominator (1×5=5), then add the numerator (5+2=7)." },
      { level: 3, description: "Place over the denominator", hint: "7 goes over the original denominator: 7/5." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "ADDSUB-03", probability: 0.5, condition: "If mixed-to-improper conversion errors persist into mixed-number addition/subtraction problems." }
    ],
    learningObjectives: ["CCSS.MATH.CONTENT.4.NF.B.3.C"]
  },
  {
    itemId: "d14", order: 14, cluster: "EQUIV", clusterName: CLUSTER_NAMES.EQUIV,
    skillId: "EQUIV-03",
    question: "Which fraction is equivalent to \\( \\frac{1}{2} \\)? \\( \\frac{2}{3}, \\frac{3}{6}, \\frac{4}{6}, \\frac{1}{3} \\)",
    options: [
        { text: "\\( \\frac{3}{6} \\)", correct: true, feedback: "1/2 × 3/3 = 3/6." },
        { text: "\\( \\frac{2}{3} \\)", correct: false, feedback: "Not equal to 1/2.", misconceptionId: "E-d14-a" },
        { text: "\\( \\frac{4}{6} \\)", correct: false, feedback: "Equivalent to 2/3, not 1/2.", misconceptionId: "E-d14-b" },
        { text: "\\( \\frac{1}{3} \\)", correct: false, feedback: "Smaller than 1/2.", misconceptionId: "E-d14-c" }
      ],
    backward: "Multiply numerator and denominator of 1/2 by 3.",
    forward: "Quick recognition of equivalents speeds up comparison.",
    misconceptions: [
      { misconceptionId: "E-d14-a", description: "Student picks 2/3, a fraction that is not equivalent to 1/2.", rootCause: "Wrong-Target Match — confuses which fraction is equivalent, perhaps judging 2/3 as 'close enough' to 1/2 without cross-multiplying to check.", remediation: "Teach the cross-multiplication check: for 1/2 and 2/3, 1×3=3 and 2×2=4 — since 3≠4, they are not equal." },
      { misconceptionId: "E-d14-b", description: "Student picks 4/6, which simplifies to 2/3, not 1/2.", rootCause: "Equivalent-To-Wrong-Fraction — correctly recognizes 4/6 as equivalent to 2/3 (÷2) but mismatches it to 1/2 instead of checking it against 1/2 directly.", remediation: "Have the student simplify every option fully first, then compare each simplified form directly to 1/2." },
      { misconceptionId: "E-d14-c", description: "Student picks 1/3, a unit fraction close in appearance to 1/2.", rootCause: "Denominator-Match Bias — notices 1/3 and 1/2 look similar as unit fractions and assumes proximity means equivalence, without checking that 1/3 < 1/2.", remediation: "Show identical circles split into 2 and 3 pieces side by side so the student sees 1/3 is visibly smaller than 1/2." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Scale up 1/2", hint: "Multiply 1/2's numerator and denominator by the same number to find matches." },
      { level: 2, description: "Try ×3", hint: "1/2 × 3/3 = 3/6." },
      { level: 3, description: "Match to the list", hint: "3/6 is in the list, so that's the equivalent fraction." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "ADDSUB-02", probability: 0.3, condition: "If equivalence recognition is unreliable, finding common denominators for unlike-denominator addition will be harder." }
    ],
    learningObjectives: ["CCSS.MATH.CONTENT.4.NF.A.1"]
  },
  {
    itemId: "d15", order: 15, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    skillId: "COMP-02",
    question: "Arrange in ascending order: \\( \\frac{5}{9}, \\frac{2}{9}, \\frac{7}{9} \\)",
    options: [
        { text: "\\( \\frac{2}{9}, \\frac{5}{9}, \\frac{7}{9} \\)", correct: true, feedback: "Same denominator; order numerators 2,5,7." },
        { text: "\\( \\frac{7}{9}, \\frac{5}{9}, \\frac{2}{9} \\)", correct: false, feedback: "Descending order.", misconceptionId: "E-d15-a" },
        { text: "\\( \\frac{5}{9}, \\frac{2}{9}, \\frac{7}{9} \\)", correct: false, feedback: "Not ordered.", misconceptionId: "E-d15-b" },
        { text: "\\( \\frac{2}{9}, \\frac{7}{9}, \\frac{5}{9} \\)", correct: false, feedback: "Incorrect order.", misconceptionId: "E-d15-c" }
      ],
    backward: "Ascending = smallest to largest; compare numerators.",
    forward: "Ordering fractions is key in ranking and data.",
    misconceptions: [
      { misconceptionId: "E-d15-a", description: "Student orders the fractions from largest to smallest.", rootCause: "Direction-Reversal — orders correctly by numerator size but arranges largest-to-smallest instead of smallest-to-largest, reversing what 'ascending' means.", remediation: "Have the student picture a staircase going up and label the bottom step 'smallest' before ordering." },
      { misconceptionId: "E-d15-b", description: "Student leaves the fractions in their original, unsorted order.", rootCause: "Partial-Ordering — restates the numbers as given in the question instead of actually comparing and rearranging them.", remediation: "Have the student write the three numerators on separate cards and physically rearrange them from smallest to largest." },
      { misconceptionId: "E-d15-c", description: "Student places the fractions in the order 2/9, 7/9, 5/9, swapping the last two.", rootCause: "Partial-Ordering — starts correctly by placing the smallest fraction first, but swaps the middle and largest values, placing 7/9 before 5/9.", remediation: "Have the student compare every adjacent pair in their list and confirm each pair is in the correct order before finalizing." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Check the denominators", hint: "All three fractions have denominator 9." },
      { level: 2, description: "Order the numerators", hint: "Order 2, 5, 7 from smallest to largest." },
      { level: 3, description: "Write the fractions in that order", hint: "2/9, 5/9, 7/9 is ascending order." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.NF.A.2"]
  },
  {
    itemId: "d16", order: 16, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    skillId: "ADDSUB-01",
    question: "\\( \\frac{3}{10} + \\frac{1}{10} \\) = ? (simplest form)",
    options: [
        { text: "\\( \\frac{2}{5} \\)", correct: true, feedback: "3+1=4; 4/10 = 2/5." },
        { text: "\\( \\frac{4}{10} \\)", correct: false, feedback: "Not simplified.", misconceptionId: "E-d16-a" },
        { text: "\\( \\frac{3}{10} \\)", correct: false, feedback: "Forgot the second fraction.", misconceptionId: "E-d16-b" },
        { text: "\\( \\frac{1}{5} \\)", correct: false, feedback: "Incorrect simplification.", misconceptionId: "E-d16-c" }
      ],
    backward: "Add numerators, keep denominator, simplify.",
    forward: "Always simplify answers as good mathematical practice.",
    misconceptions: [
      { misconceptionId: "E-d16-a", description: "Student answers 4/10, the correct unsimplified sum.", rootCause: "Unsimplified-Result — correctly adds to get 4/10 but doesn't reduce it to 2/5.", remediation: "Add a 'can this be simplified?' check as the last step of every addition problem." },
      { misconceptionId: "E-d16-b", description: "Student answers 3/10, reporting only the first addend.", rootCause: "Addend-Drop — forgets the second fraction (1/10) entirely and reports only the first term.", remediation: "Have the student underline both numerators before adding, so neither term is skipped." },
      { misconceptionId: "E-d16-c", description: "Student answers 1/5, over-reducing the correct sum.", rootCause: "Over-Reduction — divides both numerator and denominator of 4/10 by 4 instead of the correct common factor 2, overshooting the correct simplification of 2/5 down to 1/5.", remediation: "Have the student divide both numerator and denominator by the SAME number and verify: 4÷2=2, 10÷2=5, giving 2/5." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Check the denominators", hint: "Both fractions already have denominator 10." },
      { level: 2, description: "Add the numerators", hint: "3 + 1 = 4." },
      { level: 3, description: "Simplify", hint: "4/10 simplifies to 2/5 (divide both by 2)." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.NF.B.3.A"]
  },
  {
    itemId: "d17", order: 17, cluster: "MUL", clusterName: CLUSTER_NAMES.MUL,
    skillId: "MUL-02",
    question: "A recipe uses \\( \\frac{2}{3} \\) cup flour. How much flour for 3 recipes?",
    options: [
        { text: "2 cups", correct: true, feedback: "2/3 × 3 = 6/3 = 2." },
        { text: "\\( \\frac{6}{3} \\) cup", correct: false, feedback: "Correct but not simplified to a whole number.", misconceptionId: "E-d17-a" },
        { text: "1 cup", correct: false, feedback: "Half the amount.", misconceptionId: "E-d17-b" },
        { text: "\\( \\frac{2}{9} \\) cup", correct: false, feedback: "You divided instead of multiplied.", misconceptionId: "E-d17-c" }
      ],
    backward: "Multiply the fraction by the whole number; simplify.",
    forward: "Scaling recipes is a daily use of fraction multiplication.",
    misconceptions: [
      { misconceptionId: "E-d17-a", description: "Student answers 6/3 cup, the correct unsimplified amount.", rootCause: "Unsimplified-Result — correctly computes 6/3 but doesn't reduce it to the whole number 2.", remediation: "Add a 'can this be simplified to a whole number?' check whenever the numerator turns out to be a multiple of the denominator." },
      { misconceptionId: "E-d17-b", description: "Student answers 1 cup, computing half of the recipe amount instead of tripling it.", rootCause: "Halved-Instead-of-Tripled — computes roughly half of 2/3 rather than three times it, misreading '3 recipes' as a shrinking rather than scaling instruction.", remediation: "Have the student restate the problem in words first: 'I need 3 times as much flour,' before choosing an operation." },
      { misconceptionId: "E-d17-c", description: "Student answers 2/9 cup, dividing instead of multiplying.", rootCause: "Operation-Reversal — divides 2/3 by 3 instead of multiplying, treating 'for 3 recipes' as splitting rather than scaling up.", remediation: "Anchor the rule: making MORE recipes means multiplying the per-recipe amount, not dividing it." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the operation", hint: "Making 3 recipes means multiplying the amount for one recipe by 3." },
      { level: 2, description: "Multiply", hint: "2/3 × 3 = 6/3." },
      { level: 3, description: "Simplify", hint: "6/3 = 2 whole cups." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.NF.B.4.C"]
  },
  {
    itemId: "d18", order: 18, cluster: "DIV", clusterName: CLUSTER_NAMES.DIV,
    skillId: "DIV-01",
    question: "\\( \\frac{5}{6} \\div 5 \\) = ? (simplest form)",
    options: [
        { text: "\\( \\frac{1}{6} \\)", correct: true, feedback: "5/6 × 1/5 = 5/30 = 1/6." },
        { text: "\\( \\frac{5}{30} \\)", correct: false, feedback: "Not simplified.", misconceptionId: "E-d18-a" },
        { text: "\\( \\frac{1}{5} \\)", correct: false, feedback: "Incorrect.", misconceptionId: "E-d18-b" },
        { text: "\\( \\frac{25}{6} \\)", correct: false, feedback: "Multiplied by 5.", misconceptionId: "E-d18-c" }
      ],
    backward: "Multiply by reciprocal 1/5, then simplify.",
    forward: "Division of fractions is used when splitting items equally.",
    misconceptions: [
      { misconceptionId: "E-d18-a", description: "Student answers 5/30, the correct unsimplified quotient.", rootCause: "Unsimplified-Quotient — correctly multiplies the denominator by 5 (6×5=30) but stops before reducing 5/30 to its simplest form, 1/6.", remediation: "Add a 'can this be simplified?' check as the last step of every division problem." },
      { misconceptionId: "E-d18-b", description: "Student answers 1/5, confusing the divisor's reciprocal with the final quotient.", rootCause: "Wrong-Reciprocal — writes the reciprocal of the divisor (1/5) directly as the final answer, skipping the multiplication step with the original fraction entirely.", remediation: "Walk through both steps explicitly: first find the reciprocal of the divisor, THEN multiply it by the original fraction — the reciprocal alone is never the final answer." },
      { misconceptionId: "E-d18-c", description: "Student answers 25/6, multiplying the numerator by 5 instead of dividing.", rootCause: "Operation-Reversal — multiplies the numerator by 5 instead of dividing, treating the whole number as a scale-up factor.", remediation: "Have the student predict whether the answer should be bigger or smaller than the start before computing." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Turn the divisor into a reciprocal", hint: "Dividing by 5 is the same as multiplying by 1/5." },
      { level: 2, description: "Multiply across", hint: "5/6 × 1/5 = (5×1)/(6×5) = 5/30." },
      { level: 3, description: "Simplify", hint: "5/30 simplifies to 1/6." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NF.B.7.A"]
  },
  {
    itemId: "d19", order: 19, cluster: "TYPES", clusterName: CLUSTER_NAMES.TYPES,
    skillId: "FRA-T2",
    question: "Which mixed number equals \\( \\frac{9}{4} \\)?",
    options: [
        { text: "\\( 2\\frac{1}{4} \\)", correct: true, feedback: "9÷4=2 remainder 1 → 2 1/4." },
        { text: "\\( 1\\frac{5}{4} \\)", correct: false, feedback: "The fractional part is improper.", misconceptionId: "E-d19-a" },
        { text: "\\( 2\\frac{3}{4} \\)", correct: false, feedback: "That's 11/4.", misconceptionId: "E-d19-b" },
        { text: "\\( 1\\frac{1}{4} \\)", correct: false, feedback: "That's 5/4.", misconceptionId: "E-d19-c" }
      ],
    backward: "9 ÷ 4 = 2 R 1 → 2 1/4.",
    forward: "Converting between forms helps in estimation.",
    misconceptions: [
      { misconceptionId: "E-d19-a", description: "Student answers 1 5/4, undercounting the quotient and leaving an improper fractional part.", rootCause: "Improper-Remainder — undercounts the quotient by 1 and compensates by leaving an improper fraction (5/4) as the 'remainder,' instead of continuing the division correctly.", remediation: "Remind the student that the fractional part of a mixed number must always be a proper fraction — if it isn't, the whole-number part is wrong." },
      { misconceptionId: "E-d19-b", description: "Student answers 2 3/4, matching the mixed number for 11/4 instead of 9/4.", rootCause: "Remainder-Miscount — miscalculates the remainder as 3 instead of 1 (9-8=1, not 3).", remediation: "Have the student write out the subtraction explicitly: 9 - (2×4) = remainder, to double-check the remainder value." },
      { misconceptionId: "E-d19-c", description: "Student answers 1 1/4, matching the mixed number for 5/4 instead of 9/4.", rootCause: "Quotient-Miscount — undercounts the quotient as 1 instead of 2, as though only one full group of 4 fits into 9.", remediation: "Have the student skip-count by 4s (4, 8, 12) and note that 9 falls after 8 but before 12, so exactly 2 full groups fit." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Set up the division", hint: "Divide the numerator 9 by the denominator 4." },
      { level: 2, description: "Find quotient and remainder", hint: "4 goes into 9 two times (2×4=8), with remainder 9-8=1." },
      { level: 3, description: "Write the mixed number", hint: "Quotient is the whole number, remainder is the new numerator: 2 1/4." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.NF.B.3.C"]
  },
  {
    itemId: "d20", order: 20, cluster: "EQUIV", clusterName: CLUSTER_NAMES.EQUIV,
    skillId: "EQUIV-03",
    question: "Which fraction is NOT equivalent to \\( \\frac{2}{3} \\)? \\( \\frac{4}{6}, \\frac{6}{9}, \\frac{10}{15}, \\frac{3}{5} \\)",
    options: [
        { text: "\\( \\frac{3}{5} \\)", correct: true, feedback: "2/3 = 0.666, 3/5 = 0.6. Cross-multiplication: 2×5=10, 3×3=9, not equal." },
        { text: "\\( \\frac{4}{6} \\)", correct: false, feedback: "4/6 simplifies to 2/3.", misconceptionId: "E-d20-a" },
        { text: "\\( \\frac{6}{9} \\)", correct: false, feedback: "6/9 simplifies to 2/3.", misconceptionId: "E-d20-b" },
        { text: "\\( \\frac{10}{15} \\)", correct: false, feedback: "10/15 simplifies to 2/3.", misconceptionId: "E-d20-c" }
      ],
    backward: "Check if cross-multiplication gives equal products.",
    forward: "Avoiding common mistakes in equivalence is important for accuracy.",
    misconceptions: [
      { misconceptionId: "E-d20-a", description: "Student picks 4/6, which IS equivalent to 2/3.", rootCause: "Equivalence-Check Skipped — picks an option without verifying it against 2/3 by simplifying or cross-multiplying, missing that 4/6 correctly reduces to 2/3.", remediation: "Have the student simplify or cross-multiply EVERY option against 2/3 before picking the odd one out, rather than guessing by appearance." },
      { misconceptionId: "E-d20-b", description: "Student picks 6/9, which IS equivalent to 2/3.", rootCause: "Equivalence-Check Skipped — same verification step is skipped, missing that 6/9 correctly reduces to 2/3.", remediation: "Practice the cross-multiplication check explicitly: 2×9=18 and 3×6=18 — equal, so they match." },
      { misconceptionId: "E-d20-c", description: "Student picks 10/15, which IS equivalent to 2/3.", rootCause: "Equivalence-Check Skipped — same verification step is skipped, missing that 10/15 correctly reduces to 2/3.", remediation: "Have the student divide 10 and 15 by their common factor 5 to confirm 10/15=2/3 before ruling it out." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Simplify each option", hint: "Reduce 4/6, 6/9, 10/15, and 3/5 to lowest terms." },
      { level: 2, description: "Compare to 2/3", hint: "Which simplified fraction does NOT match 2/3?" },
      { level: 3, description: "Confirm with cross-multiplication", hint: "2×5=10 and 3×3=9 — since they're not equal, 3/5 is not equivalent to 2/3." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.NF.A.1"]
  },
  {
    itemId: "d21", order: 21, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    skillId: "COMP-01",
    question: "Which is larger? \\( \\frac{3}{4} \\) or \\( \\frac{5}{8} \\)",
    options: [
        { text: "\\( \\frac{3}{4} \\)", correct: true, feedback: "3/4 = 6/8; 6/8 > 5/8." },
        { text: "\\( \\frac{5}{8} \\)", correct: false, feedback: "5/8 is smaller.", misconceptionId: "E-d21-a" },
        { text: "They are equal", correct: false, feedback: "Different values.", misconceptionId: "E-d21-b" },
        { text: "Cannot compare", correct: false, feedback: "Make denominators the same: 3/4 = 6/8.", misconceptionId: "E-d21-c" }
      ],
    backward: "Convert 3/4 to 6/8; compare with 5/8.",
    forward: "Comparing with different denominators is needed for ordering most fractions.",
    misconceptions: [
      { misconceptionId: "E-d21-a", description: "Student picks 5/8, without converting 3/4 to a common denominator first.", rootCause: "Unconverted Comparison — compares 5/8 to 3/4 without converting to a common denominator, misjudging by numerator size (5 vs 3) alone.", remediation: "Teach that fractions can only be compared directly by numerator once they share the same denominator — convert first, always." },
      { misconceptionId: "E-d21-b", description: "Student claims the fractions are equal.", rootCause: "Surface-Similarity Assumption — assumes fractions that 'look close' in value must be equal, without actually converting to a common denominator to check.", remediation: "Have the student convert 3/4 to eighths (6/8) and directly compare numerators against 5/8." },
      { misconceptionId: "E-d21-c", description: "Student claims the fractions cannot be compared.", rootCause: "Common-Denominator Doubt — believes unlike denominators can't be compared without realizing the conversion step (3/4=6/8) is straightforward.", remediation: "Walk through the conversion explicitly: 3/4 × 2/2 = 6/8, then compare 6/8 to 5/8." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find a common denominator", hint: "8 is a multiple of 4, so convert 3/4 into eighths." },
      { level: 2, description: "Convert", hint: "3/4 = 6/8 (multiply numerator and denominator by 2)." },
      { level: 3, description: "Compare", hint: "6/8 > 5/8, so 3/4 is larger." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "COMP-02", probability: 0.4, condition: "If two-fraction comparison via common denominator isn't solid, ordering three or more unlike fractions will compound the error." }
    ],
    learningObjectives: ["CCSS.MATH.CONTENT.4.NF.A.2"]
  },
  {
    itemId: "d22", order: 22, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    skillId: "ADDSUB-01",
    question: "\\( \\frac{1}{8} + \\frac{3}{8} + \\frac{2}{8} \\) = ? (simplest form)",
    options: [
        { text: "\\( \\frac{3}{4} \\)", correct: true, feedback: "Sum numerators = 6; 6/8 = 3/4." },
        { text: "\\( \\frac{6}{8} \\)", correct: false, feedback: "Not simplified.", misconceptionId: "E-d22-a" },
        { text: "\\( \\frac{5}{8} \\)", correct: false, feedback: "Incorrect sum.", misconceptionId: "E-d22-b" },
        { text: "\\( \\frac{1}{2} \\)", correct: false, feedback: "4/8 would be 1/2, but sum is 6/8.", misconceptionId: "E-d22-c" }
      ],
    backward: "Add all numerators, keep denominator, simplify.",
    forward: "Adding multiple fractions is common in probability.",
    misconceptions: [
      { misconceptionId: "E-d22-a", description: "Student answers 6/8, the correct unsimplified sum.", rootCause: "Unsimplified-Result — correctly adds to get 6/8 but doesn't reduce it to 3/4.", remediation: "Add a 'can this be simplified?' check as the last step of every addition problem." },
      { misconceptionId: "E-d22-b", description: "Student answers 5/8, missing one of the three addends.", rootCause: "Addend-Drop — adds only two of the three numerators (3+2=5), missing the first fraction (1/8) entirely.", remediation: "Have the student underline all three numerators before adding, checking each is counted exactly once." },
      { misconceptionId: "E-d22-c", description: "Student answers 1/2, miscounting the sum as 4/8 instead of 6/8.", rootCause: "Numerator-Miscount — miscounts the sum of 1+3+2 as 4 instead of 6, then correctly simplifies the WRONG sum to 1/2.", remediation: "Have the student add the three numerators one pair at a time and write down each intermediate total: 1+3=4, then 4+2=6." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Check the denominators", hint: "All three fractions already have denominator 8." },
      { level: 2, description: "Add all numerators", hint: "1 + 3 + 2 = 6." },
      { level: 3, description: "Simplify", hint: "6/8 simplifies to 3/4 (divide both by 2)." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.NF.B.3.A"]
  },
  {
    itemId: "d23", order: 23, cluster: "MUL", clusterName: CLUSTER_NAMES.MUL,
    skillId: "MUL-01",
    question: "\\( \\frac{2}{5} \\times 5 \\) = ?",
    options: [
        { text: "2", correct: true, feedback: "(2×5)/5 = 10/5 = 2." },
        { text: "\\( \\frac{10}{5} \\)", correct: false, feedback: "Not simplified.", misconceptionId: "E-d23-a" },
        { text: "\\( \\frac{2}{25} \\)", correct: false, feedback: "You multiplied denominator by 5.", misconceptionId: "E-d23-b" },
        { text: "\\( \\frac{5}{2} \\)", correct: false, feedback: "Reciprocal.", misconceptionId: "E-d23-c" }
      ],
    backward: "Multiplying a fraction by its denominator gives the numerator.",
    forward: "This shows the relationship between fractions and whole numbers.",
    misconceptions: [
      { misconceptionId: "E-d23-a", description: "Student answers 10/5, the correct unsimplified product.", rootCause: "Unsimplified-Result — correctly computes 10/5 but doesn't reduce it to the whole number 2.", remediation: "Add a 'can this be simplified to a whole number?' check whenever the numerator turns out to be a multiple of the denominator." },
      { misconceptionId: "E-d23-b", description: "Student answers 2/25, multiplying the denominator by 5 as well as the numerator.", rootCause: "Denominator-Multiplication — multiplies the denominator by 5 (5×5=25) instead of leaving it unchanged, incorrectly scaling both parts.", remediation: "Clarify the rule with a contrast: multiplying a fraction by a whole number scales only the numerator, not the denominator." },
      { misconceptionId: "E-d23-c", description: "Student answers 5/2, the reciprocal of the intended answer.", rootCause: "Reciprocal-Flip — inverts the fraction instead of multiplying it by the whole number.", remediation: "Have the student check which number came from the original denominator (it must stay on the bottom)." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify what changes", hint: "When multiplying a fraction by a whole number, only the numerator is multiplied." },
      { level: 2, description: "Multiply the numerator", hint: "2 × 5 = 10, so you get 10/5." },
      { level: 3, description: "Simplify", hint: "10/5 = 2." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.NF.B.4.B"]
  },
  {
    itemId: "d24", order: 24, cluster: "DIV", clusterName: CLUSTER_NAMES.DIV,
    skillId: "DIV-02",
    question: "A ribbon of length \\( \\frac{3}{4} \\) m is cut into 3 equal pieces. How long is each piece?",
    options: [
        { text: "\\( \\frac{1}{4} \\) m", correct: true, feedback: "3/4 ÷ 3 = 3/4 × 1/3 = 3/12 = 1/4." },
        { text: "\\( \\frac{1}{3} \\) m", correct: false, feedback: "Incorrect.", misconceptionId: "E-d24-a" },
        { text: "\\( \\frac{3}{7} \\) m", correct: false, feedback: "You added denominators? No.", misconceptionId: "E-d24-b" },
        { text: "\\( \\frac{9}{4} \\) m", correct: false, feedback: "You multiplied.", misconceptionId: "E-d24-c" }
      ],
    backward: "Divide the length by the number of pieces.",
    forward: "Practical problems involving cutting materials use fraction division.",
    misconceptions: [
      { misconceptionId: "E-d24-a", description: "Student answers 1/3 m, writing the number of pieces as the answer's denominator without dividing the given length.", rootCause: "Piece-Count-As-Fraction — confuses the number of pieces (3) with the answer itself, writing 1/3 instead of actually dividing the 3/4 m length by 3.", remediation: "Have the student restate the problem as 'divide 3/4 by 3' explicitly before choosing an operation, rather than reasoning directly from '3 pieces'." },
      { misconceptionId: "E-d24-b", description: "Student answers 3/7 m, adding the denominator and the divisor.", rootCause: "Denominator-Addition — adds the denominator and the divisor (4+3=7), echoing the earlier mistake of adding denominators during addition problems.", remediation: "Remind the student that dividing by a whole number means multiplying by its reciprocal — there is no addition step involved." },
      { misconceptionId: "E-d24-c", description: "Student answers 9/4 m, multiplying instead of dividing.", rootCause: "Operation-Reversal — multiplies 3/4 by 3 instead of dividing, treating 'cut into 3 pieces' as if the ribbon gets 3 times longer.", remediation: "Ask the student whether each piece should be longer or shorter than the whole ribbon before computing, to catch the sign of the error." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the operation", hint: "Cutting into 3 equal pieces means dividing the total length by 3." },
      { level: 2, description: "Turn the divisor into a reciprocal", hint: "3/4 ÷ 3 = 3/4 × 1/3." },
      { level: 3, description: "Multiply and simplify", hint: "3/4 × 1/3 = 3/12 = 1/4 m." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NF.B.7.C"]
  }
];

const recheckItems = [
  {
    itemId: "r1", order: 1, cluster: "TYPES", clusterName: CLUSTER_NAMES.TYPES,
    skillId: "FRA-T2",
    question: "Convert \\( \\frac{17}{5} \\) to a mixed number.",
    options: [
        { text: "\\( 3\\frac{2}{5} \\)", correct: true, feedback: "17 ÷ 5 = 3 R 2 → 3 2/5." },
        { text: "\\( 2\\frac{3}{5} \\)", correct: false, feedback: "Swapped.", misconceptionId: "E-r1-a" },
        { text: "\\( 3\\frac{1}{5} \\)", correct: false, feedback: "Wrong remainder.", misconceptionId: "E-r1-b" },
        { text: "\\( 4\\frac{2}{5} \\)", correct: false, feedback: "Quotient too large.", misconceptionId: "E-r1-c" }
      ],
    misconceptions: [
      { misconceptionId: "E-r1-a", description: "Student answers 2 3/5, swapping the quotient and remainder.", rootCause: "Quotient-Remainder Swap — swaps the computed quotient and remainder, writing 2 3/5 instead of 3 2/5 (17÷5=3 remainder 2, not the reverse).", remediation: "Have the student label which number is the 'how many groups' (quotient) and which is the 'what's left over' (remainder) before writing the mixed number." },
      { misconceptionId: "E-r1-b", description: "Student answers 3 1/5, miscalculating the remainder.", rootCause: "Remainder-Miscount — miscalculates the remainder as 1 instead of 2 (17-15=2, not 1).", remediation: "Have the student write out the subtraction explicitly: 17 - (3×5) = remainder, to double-check the value." },
      { misconceptionId: "E-r1-c", description: "Student answers 4 2/5, overcounting the quotient.", rootCause: "Quotient-Miscount — overcounts the quotient as 4 instead of 3, as though 4 full groups of 5 fit into 17 (4×5=20>17).", remediation: "Have the student skip-count by 5s (5, 10, 15, 20) and note that 17 falls after 15 but before 20, so exactly 3 full groups fit." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Set up the division", hint: "Divide the numerator 17 by the denominator 5." },
      { level: 2, description: "Find quotient and remainder", hint: "5 goes into 17 three times (3×5=15), with remainder 17-15=2." },
      { level: 3, description: "Write the mixed number", hint: "Quotient is the whole number, remainder is the new numerator: 3 2/5." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.NF.B.3.C"]
  },
  {
    itemId: "r2", order: 2, cluster: "TYPES", clusterName: CLUSTER_NAMES.TYPES,
    skillId: "FRA-T1",
    question: "Which is an improper fraction? \\( \\frac{4}{9}, \\frac{11}{6}, \\frac{2}{3}, \\frac{5}{8} \\)",
    options: [
        { text: "\\( \\frac{11}{6} \\)", correct: true, feedback: "11 > 6." },
        { text: "\\( \\frac{4}{9} \\)", correct: false, feedback: "4 < 9, proper.", misconceptionId: "E-r2-a" },
        { text: "\\( \\frac{2}{3} \\)", correct: false, feedback: "2 < 3, proper.", misconceptionId: "E-r2-b" },
        { text: "\\( \\frac{5}{8} \\)", correct: false, feedback: "5 < 8, proper.", misconceptionId: "E-r2-c" }
      ],
    misconceptions: [
      { misconceptionId: "E-r2-a", description: "Student picks 4/9, a proper fraction.", rootCause: "Proper-As-Improper Misclassification — doesn't check that the numerator (4) is smaller than the denominator (9).", remediation: "Have the student circle the numerator and denominator and write '<' or '>' between them before classifying." },
      { misconceptionId: "E-r2-b", description: "Student picks 2/3, a proper fraction.", rootCause: "Proper-As-Improper Misclassification — the comparison step is skipped for this option too.", remediation: "Practice sorting a mixed set of fraction cards into 'proper' and 'improper' piles, checking each one explicitly." },
      { misconceptionId: "E-r2-c", description: "Student picks 5/8, a proper fraction.", rootCause: "Proper-As-Improper Misclassification — same comparison step is skipped.", remediation: "Anchor the definition with a visual: an improper fraction always represents one whole shaded region or more." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the definition", hint: "An improper fraction has numerator ≥ denominator." },
      { level: 2, description: "Check each option", hint: "Compare numerator and denominator in each fraction." },
      { level: 3, description: "Pick the improper one", hint: "Only 11/6 has numerator greater than denominator." }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "r3", order: 3, cluster: "EQUIV", clusterName: CLUSTER_NAMES.EQUIV,
    skillId: "EQUIV-01",
    question: "Simplify \\( \\frac{12}{18} \\).",
    options: [
        { text: "\\( \\frac{2}{3} \\)", correct: true, feedback: "Divide by 6." },
        { text: "\\( \\frac{4}{6} \\)", correct: false, feedback: "Not fully simplified.", misconceptionId: "E-r3-a" },
        { text: "\\( \\frac{6}{9} \\)", correct: false, feedback: "Not fully simplified.", misconceptionId: "E-r3-b" },
        { text: "\\( \\frac{3}{4} \\)", correct: false, feedback: "Incorrect simplification.", misconceptionId: "E-r3-c" }
      ],
    misconceptions: [
      { misconceptionId: "E-r3-a", description: "Student answers 4/6, dividing by 3 instead of the full HCF of 6.", rootCause: "Partial-Simplification — divides numerator and denominator by 3 instead of by the full HCF of 6, leaving a fraction that is equivalent but not fully reduced.", remediation: "Have the student list ALL common factors of 12 and 18, then pick the largest one, rather than dividing by the first factor spotted." },
      { misconceptionId: "E-r3-b", description: "Student answers 6/9, dividing by 2 instead of the full HCF of 6.", rootCause: "Partial-Simplification — divides numerator and denominator by 2 instead of by the full HCF of 6, leaving a fraction that is equivalent but not fully reduced.", remediation: "After each simplification step, have the student ask 'can I divide again?' until no common factor remains." },
      { misconceptionId: "E-r3-c", description: "Student answers 3/4, swapping which number gets divided by which factor.", rootCause: "Cross-Swap Error — mentally swaps which number is treated as the numerator and which as the denominator partway through simplifying.", remediation: "Have the student label the numerator and denominator with N and D before dividing, and keep those labels through both division steps." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "List common factors", hint: "What numbers divide evenly into both 12 and 18?" },
      { level: 2, description: "Find the HCF", hint: "The highest common factor of 12 and 18 is 6." },
      { level: 3, description: "Divide both terms", hint: "12÷6=2 and 18÷6=3, so the simplest form is 2/3." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.NF.A.1"]
  },
  {
    itemId: "r4", order: 4, cluster: "EQUIV", clusterName: CLUSTER_NAMES.EQUIV,
    skillId: "EQUIV-02",
    question: "Find the missing number: \\( \\frac{4}{7} = \\frac{?}{28} \\)",
    options: [
        { text: "16", correct: true, feedback: "7×4=28, 4×4=16." },
        { text: "12", correct: false, feedback: "Incorrect multiplier.", misconceptionId: "E-r4-a" },
        { text: "21", correct: false, feedback: "Incorrect.", misconceptionId: "E-r4-b" },
        { text: "7", correct: false, feedback: "You copied the numerator.", misconceptionId: "E-r4-c" }
      ],
    misconceptions: [
      { misconceptionId: "E-r4-a", description: "Student answers 12, using the wrong scale factor.", rootCause: "Wrong-Multiplier — assumes a scale factor of 3 (4×3=12) instead of correctly finding that 7×4=28, i.e. picks an incorrect multiplier.", remediation: "Have the student verify the multiplier first: '7 times what equals 28?' before touching the numerator." },
      { misconceptionId: "E-r4-b", description: "Student answers 21, subtracting instead of multiplying.", rootCause: "Denominator-Confusion — computes 28-7=21, subtracting the original denominator from the target instead of finding the multiplicative scale factor.", remediation: "Contrast subtraction and multiplication with a worked example, emphasizing that equivalent fractions always come from multiplying, never subtracting." },
      { misconceptionId: "E-r4-c", description: "Student answers 7, copying the original denominator into the numerator slot.", rootCause: "Numerator-Copy — copies the original denominator (7) unchanged into the blank, not scaling it at all.", remediation: "Cover the original fraction with a card and ask 'what should go in the blank, using only the scale factor and the numerator 4?'" }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the scale factor", hint: "What do you multiply 7 by to get 28?" },
      { level: 2, description: "Apply it to the numerator", hint: "Multiply 4 by that same factor: 4×4." },
      { level: 3, description: "State the answer", hint: "4×4=16, so the missing numerator is 16." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.NF.A.1"]
  },
  {
    itemId: "r5", order: 5, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    skillId: "COMP-01",
    question: "Which is smaller? \\( \\frac{3}{8} \\) or \\( \\frac{5}{8} \\)",
    options: [
        { text: "\\( \\frac{3}{8} \\)", correct: true, feedback: "3 < 5." },
        { text: "\\( \\frac{5}{8} \\)", correct: false, feedback: "5/8 is larger.", misconceptionId: "E-r5-a" },
        { text: "Equal", correct: false, feedback: "Numerators differ.", misconceptionId: "E-r5-b" },
        { text: "Cannot compare", correct: false, feedback: "Same denominator, easy to compare.", misconceptionId: "E-r5-c" }
      ],
    misconceptions: [
      { misconceptionId: "E-r5-a", description: "Student picks 5/8, the larger fraction.", rootCause: "Direction-Confusion — picks the fraction with the larger numerator despite the question asking for the smaller one.", remediation: "Have the student restate the question as 'which numerator loses?' before selecting an option." },
      { misconceptionId: "E-r5-b", description: "Student claims the fractions are equal.", rootCause: "Denominator-Only Focus — notices the shared denominator and concludes equality without checking the numerators.", remediation: "Ask the student to shade 3/8 and 5/8 on identical fraction bars to make the difference visible." },
      { misconceptionId: "E-r5-c", description: "Student claims the fractions cannot be compared.", rootCause: "Same-Denominator Doubt — mistakenly believes a conversion step is needed first, not realizing the denominator is already shared.", remediation: "Explicitly teach the shortcut: same denominator means only the numerators need comparing." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Check the denominators", hint: "Both fractions have denominator 8." },
      { level: 2, description: "Compare the numerators", hint: "Compare 3 and 5." },
      { level: 3, description: "Pick the smaller", hint: "Since 3 < 5, 3/8 is smaller." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.NF.A.2"]
  },
  {
    itemId: "r6", order: 6, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    skillId: "COMP-02",
    question: "Arrange in descending order: \\( \\frac{2}{7}, \\frac{5}{7}, \\frac{1}{7} \\)",
    options: [
        { text: "\\( \\frac{5}{7}, \\frac{2}{7}, \\frac{1}{7} \\)", correct: true, feedback: "Largest to smallest numerators." },
        { text: "\\( \\frac{1}{7}, \\frac{2}{7}, \\frac{5}{7} \\)", correct: false, feedback: "Ascending.", misconceptionId: "E-r6-a" },
        { text: "\\( \\frac{2}{7}, \\frac{5}{7}, \\frac{1}{7} \\)", correct: false, feedback: "Not ordered.", misconceptionId: "E-r6-b" },
        { text: "\\( \\frac{5}{7}, \\frac{1}{7}, \\frac{2}{7} \\)", correct: false, feedback: "Not ordered.", misconceptionId: "E-r6-c" }
      ],
    misconceptions: [
      { misconceptionId: "E-r6-a", description: "Student orders the fractions from smallest to largest.", rootCause: "Direction-Reversal — orders correctly by numerator size but arranges smallest-to-largest instead of largest-to-smallest, reversing what 'descending' means.", remediation: "Have the student picture a staircase going down and label the top step 'largest' before ordering." },
      { misconceptionId: "E-r6-b", description: "Student leaves the fractions in their original, unsorted order.", rootCause: "Partial-Ordering — restates the numbers as given in the question instead of actually comparing and rearranging them.", remediation: "Have the student write the three numerators on separate cards and physically rearrange them from largest to smallest." },
      { misconceptionId: "E-r6-c", description: "Student places the fractions in the order 5/7, 1/7, 2/7, swapping the last two.", rootCause: "Partial-Ordering — starts correctly by placing the largest fraction first, but swaps the middle and smallest values.", remediation: "Have the student compare every adjacent pair in their list and confirm each pair is in the correct order before finalizing." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Check the denominators", hint: "All three fractions have denominator 7." },
      { level: 2, description: "Order the numerators", hint: "Order 5, 2, 1 from largest to smallest." },
      { level: 3, description: "Write the fractions in that order", hint: "5/7, 2/7, 1/7 is descending order." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.NF.A.2"]
  },
  {
    itemId: "r7", order: 7, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    skillId: "ADDSUB-01",
    question: "\\( \\frac{4}{11} + \\frac{5}{11} \\) = ? (simplest form)",
    options: [
        { text: "\\( \\frac{9}{11} \\)", correct: true, feedback: "4+5=9; already in simplest form." },
        { text: "\\( \\frac{9}{22} \\)", correct: false, feedback: "You added denominators.", misconceptionId: "E-r7-a" },
        { text: "\\( \\frac{4}{11} \\)", correct: false, feedback: "Forgot to add the second fraction.", misconceptionId: "E-r7-b" },
        { text: "\\( \\frac{5}{11} \\)", correct: false, feedback: "Forgot to add the first fraction.", misconceptionId: "E-r7-c" }
      ],
    misconceptions: [
      { misconceptionId: "E-r7-a", description: "Student answers 9/22, adding both numerators and denominators.", rootCause: "Denominator-Addition — adds the denominators as well as the numerators (11+11=22), not realizing the denominator stays fixed.", remediation: "Use a fraction-bar picture: eleven equal pieces stay eleven equal pieces regardless of how many are shaded." },
      { misconceptionId: "E-r7-b", description: "Student answers 4/11, reporting only the first addend.", rootCause: "Addend-Drop — forgets the second fraction (5/11) entirely and reports only the first term.", remediation: "Have the student underline both numerators before adding, so neither term is skipped." },
      { misconceptionId: "E-r7-c", description: "Student answers 5/11, reporting only the second addend.", rootCause: "Addend-Drop — forgets the first fraction (4/11) entirely and reports only the second term.", remediation: "Ask the student to point to the '+' sign and explain what it means before writing an answer." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Check the denominators", hint: "Both fractions already have denominator 11." },
      { level: 2, description: "Add the numerators", hint: "4 + 5 = 9." },
      { level: 3, description: "Check for simplification", hint: "9 and 11 share no common factor, so 9/11 is already simplest." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.NF.B.3.A"]
  },
  {
    itemId: "r8", order: 8, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    skillId: "ADDSUB-01",
    question: "\\( \\frac{7}{10} - \\frac{3}{10} \\) = ? (simplest form)",
    options: [
        { text: "\\( \\frac{2}{5} \\)", correct: true, feedback: "4/10 = 2/5." },
        { text: "\\( \\frac{4}{10} \\)", correct: false, feedback: "Not simplified.", misconceptionId: "E-r8-a" },
        { text: "\\( \\frac{1}{5} \\)", correct: false, feedback: "Incorrect subtraction.", misconceptionId: "E-r8-b" },
        { text: "\\( \\frac{3}{10} \\)", correct: false, feedback: "No operation.", misconceptionId: "E-r8-c" }
      ],
    misconceptions: [
      { misconceptionId: "E-r8-a", description: "Student answers 4/10, the correct unsimplified difference.", rootCause: "Unsimplified-Result — correctly subtracts to get 4/10 but doesn't reduce it to 2/5.", remediation: "Add a 'can this be simplified?' check as the last step of every subtraction problem." },
      { misconceptionId: "E-r8-b", description: "Student answers 1/5, over-reducing the correct difference.", rootCause: "Over-Reduction — divides both numerator and denominator of 4/10 by 4 instead of the correct common factor 2, overshooting the correct simplification of 2/5.", remediation: "Have the student divide both numerator and denominator by the SAME number and verify: 4÷2=2, 10÷2=5, giving 2/5." },
      { misconceptionId: "E-r8-c", description: "Student answers 3/10, the fraction being subtracted.", rootCause: "Subtrahend-Drop — writes down the fraction being subtracted (3/10) instead of performing the subtraction.", remediation: "Have the student underline the minuend and subtrahend and say 'first minus second' aloud before writing an answer." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Check the denominators", hint: "Both fractions already have denominator 10." },
      { level: 2, description: "Subtract the numerators", hint: "7 - 3 = 4." },
      { level: 3, description: "Simplify", hint: "4/10 simplifies to 2/5 (divide both by 2)." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.NF.B.3.A"]
  },
  {
    itemId: "r9", order: 9, cluster: "MUL", clusterName: CLUSTER_NAMES.MUL,
    skillId: "MUL-01",
    question: "\\( 3 \\times \\frac{2}{9} \\) = ? (simplest form)",
    options: [
        { text: "\\( \\frac{2}{3} \\)", correct: true, feedback: "6/9 = 2/3." },
        { text: "\\( \\frac{6}{9} \\)", correct: false, feedback: "Not simplified.", misconceptionId: "E-r9-a" },
        { text: "\\( \\frac{2}{9} \\)", correct: false, feedback: "No operation.", misconceptionId: "E-r9-b" },
        { text: "\\( \\frac{1}{3} \\)", correct: false, feedback: "Incorrect.", misconceptionId: "E-r9-c" }
      ],
    misconceptions: [
      { misconceptionId: "E-r9-a", description: "Student answers 6/9, the correct unsimplified product.", rootCause: "Unsimplified-Result — correctly computes 6/9 but doesn't reduce it to 2/3.", remediation: "Add a 'can this be simplified?' check as the last step of every multiplication problem." },
      { misconceptionId: "E-r9-b", description: "Student answers 2/9, the original fraction unchanged.", rootCause: "No-Operation — writes down the original fraction as though the multiplication by 3 never happened.", remediation: "Ask the student to point to the '×3' and explain what it means before writing an answer." },
      { misconceptionId: "E-r9-c", description: "Student answers 1/3, over-reducing the correct product.", rootCause: "Over-Reduction — after correctly multiplying to get 6/9, divides by 6 instead of the correct common factor 3, producing 1/3 instead of 2/3.", remediation: "Have the student divide both numerator and denominator by the SAME number and verify: 6÷3=2, 9÷3=3, giving 2/3." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify what changes", hint: "When multiplying a fraction by a whole number, only the numerator is multiplied." },
      { level: 2, description: "Multiply the numerator", hint: "3 × 2 = 6, so you get 6/9." },
      { level: 3, description: "Simplify", hint: "6/9 simplifies to 2/3 (divide both by 3)." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.NF.B.4.B"]
  },
  {
    itemId: "r10", order: 10, cluster: "MUL", clusterName: CLUSTER_NAMES.MUL,
    skillId: "MUL-02",
    question: "What is \\( \\frac{1}{6} \\) of 30?",
    options: [
        { text: "5", correct: true, feedback: "30 ÷ 6 = 5." },
        { text: "6", correct: false, feedback: "You copied the denominator.", misconceptionId: "E-r10-a" },
        { text: "\\( \\frac{1}{5} \\)", correct: false, feedback: "That's a fraction, not the answer.", misconceptionId: "E-r10-b" },
        { text: "180", correct: false, feedback: "You multiplied instead of divided.", misconceptionId: "E-r10-c" }
      ],
    misconceptions: [
      { misconceptionId: "E-r10-a", description: "Student answers 6, the denominator itself.", rootCause: "Denominator-Copy — writes the denominator itself as the answer instead of dividing 30 by 6.", remediation: "Remind the student that the denominator names the operation (divide by 6), not the answer itself." },
      { misconceptionId: "E-r10-b", description: "Student answers 1/5, producing a fraction instead of a whole-number quantity.", rootCause: "Fraction-Miscalculation — attempts to relate 1/6 to 30 as a new fraction instead of carrying out the division, producing a fraction where a whole number was expected.", remediation: "Clarify that 'fraction of a whole number' problems produce a whole-number (or mixed-number) answer, not another fraction — ask 'how many of the 30 are we counting?'" },
      { misconceptionId: "E-r10-c", description: "Student answers 180, multiplying instead of dividing.", rootCause: "Operation-Reversal — multiplies 30×6 instead of dividing, treating 'of' as multiplication by the denominator rather than division.", remediation: "Anchor the rule: finding a unit fraction 'of' a number means dividing by the denominator, not multiplying." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the operation", hint: "'1/6 of 30' means divide 30 by 6." },
      { level: 2, description: "Divide", hint: "30 ÷ 6 = 5." },
      { level: 3, description: "State the answer", hint: "1/6 of 30 is 5." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.NF.B.4.C"]
  },
  {
    itemId: "r11", order: 11, cluster: "DIV", clusterName: CLUSTER_NAMES.DIV,
    skillId: "DIV-01",
    question: "\\( \\frac{5}{8} \\div 5 \\) = ? (simplest form)",
    options: [
        { text: "\\( \\frac{1}{8} \\)", correct: true, feedback: "5/8 × 1/5 = 5/40 = 1/8." },
        { text: "\\( \\frac{5}{40} \\)", correct: false, feedback: "Not simplified.", misconceptionId: "E-r11-a" },
        { text: "\\( \\frac{1}{5} \\)", correct: false, feedback: "Incorrect.", misconceptionId: "E-r11-b" },
        { text: "\\( \\frac{25}{8} \\)", correct: false, feedback: "You multiplied by 5.", misconceptionId: "E-r11-c" }
      ],
    misconceptions: [
      { misconceptionId: "E-r11-a", description: "Student answers 5/40, the correct unsimplified quotient.", rootCause: "Unsimplified-Quotient — correctly multiplies the denominator by 5 (8×5=40) but stops before reducing 5/40 to its simplest form, 1/8.", remediation: "Add a 'can this be simplified?' check as the last step of every division problem." },
      { misconceptionId: "E-r11-b", description: "Student answers 1/5, confusing the divisor's reciprocal with the final quotient.", rootCause: "Wrong-Reciprocal — writes the reciprocal of the divisor (1/5) directly as the final answer, skipping the multiplication step with the original fraction.", remediation: "Walk through both steps explicitly: first find the reciprocal of the divisor, THEN multiply it by the original fraction." },
      { misconceptionId: "E-r11-c", description: "Student answers 25/8, multiplying the numerator by 5 instead of dividing.", rootCause: "Operation-Reversal — multiplies the numerator by 5 instead of dividing, treating the whole number as a scale-up factor.", remediation: "Have the student predict whether the answer should be bigger or smaller than the start before computing." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Turn the divisor into a reciprocal", hint: "Dividing by 5 is the same as multiplying by 1/5." },
      { level: 2, description: "Multiply across", hint: "5/8 × 1/5 = (5×1)/(8×5) = 5/40." },
      { level: 3, description: "Simplify", hint: "5/40 simplifies to 1/8." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NF.B.7.A"]
  },
  {
    itemId: "r12", order: 12, cluster: "DIV", clusterName: CLUSTER_NAMES.DIV,
    skillId: "DIV-02",
    question: "A ribbon \\( \\frac{3}{5} \\) m long is cut into 3 equal pieces. How long is each piece?",
    options: [
        { text: "\\( \\frac{1}{5} \\) m", correct: true, feedback: "3/5 ÷ 3 = 3/5 × 1/3 = 3/15 = 1/5." },
        { text: "\\( \\frac{3}{15} \\) m", correct: false, feedback: "Not simplified.", misconceptionId: "E-r12-a" },
        { text: "\\( \\frac{3}{8} \\) m", correct: false, feedback: "Incorrect.", misconceptionId: "E-r12-b" },
        { text: "\\( \\frac{5}{3} \\) m", correct: false, feedback: "Reciprocal.", misconceptionId: "E-r12-c" }
      ],
    misconceptions: [
      { misconceptionId: "E-r12-a", description: "Student answers 3/15, the correct unsimplified quotient.", rootCause: "Unsimplified-Quotient — correctly multiplies the denominator by 3 (5×3=15) but stops before reducing 3/15 to its simplest form, 1/5.", remediation: "Add a 'can this be simplified?' check as the last step of every division problem." },
      { misconceptionId: "E-r12-b", description: "Student answers 3/8 m, adding the denominator and the divisor.", rootCause: "Denominator-Addition — adds the denominator and the divisor (5+3=8), echoing the earlier mistake of adding denominators during addition problems.", remediation: "Remind the student that dividing by a whole number means multiplying by its reciprocal — there is no addition step involved." },
      { misconceptionId: "E-r12-c", description: "Student answers 5/3 m, the reciprocal of the original fraction.", rootCause: "Reciprocal-Confusion — takes the reciprocal of the original fraction (3/5 → 5/3) instead of dividing that fraction by 3.", remediation: "Clarify that the reciprocal trick applies to the whole-number divisor (3 → 1/3), not to the fraction being divided." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the operation", hint: "Cutting into 3 equal pieces means dividing the total length by 3." },
      { level: 2, description: "Turn the divisor into a reciprocal", hint: "3/5 ÷ 3 = 3/5 × 1/3." },
      { level: 3, description: "Multiply and simplify", hint: "3/5 × 1/3 = 3/15 = 1/5 m." }
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
    title: "Fractions — Core Fluency",
    subtitle: "Telangana & Cambridge · Level 1 · Core Fluency",
    description: "Types of fractions, equivalent fractions, simplifying, comparing, and addition/subtraction/multiplication/division with like denominators and whole numbers.",
    clusterNames: CLUSTER_NAMES,
    gateReviewHTML: '<strong>Quick Review</strong><br>' +
      "&bull; Proper fraction: numerator &lt; denominator. Improper: numerator &ge; denominator.<br>" +
      "&bull; Mixed &rarr; improper: whole &times; denominator + numerator, over the denominator.<br>" +
      "&bull; Simplify: divide numerator and denominator by their highest common factor (HCF).<br>" +
      "&bull; Equivalent fractions: multiply or divide numerator and denominator by the same number.<br>" +
      "&bull; Compare: same denominator &rarr; compare numerators; unit fractions &rarr; larger denominator = smaller fraction.<br>" +
      "&bull; Add/subtract like fractions: add/subtract numerators, keep the denominator, simplify.<br>" +
      "&bull; Multiply by whole number: multiply the numerator, keep the denominator, simplify.<br>" +
      "&bull; Divide by whole number: multiply by the reciprocal (or split the numerator if possible).<br>",
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

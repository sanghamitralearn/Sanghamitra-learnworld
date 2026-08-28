// seed/mathSeedCh4FractionsL4.js
//
// Populates math_chapters and math_questions with Grade 5, Chapter 4
// (Fractions), Level 4 — converted from the standalone HTML file
// ch-4-fractions-level-4.html.
//
// This is the 25-minute timed diagnostic level; diagnostic items carry a
// difficulty tier (S = Speed, C = Core, H = Hard, T = Trap).
//
// Run with: node seed/mathSeedCh4FractionsL4.js

const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-5";
const GRADE_LABEL = "Grade 5";
const CHAPTER_SLUG = "ch-4-fractions";
const CHAPTER_NAME = "Fractions";
const LEVEL = 4;

const CLUSTER_NAMES = {
  TYPES: "Types & Conversions",
  EQUIV: "Equivalent Fractions & Simplifying",
  COMP: "Comparing & Ordering",
  ADDSUB: "Addition & Subtraction",
  MUL: "Multiplying Fractions & Mixed Operations",
  DIV: "Dividing Fractions & Applications"
};

const warmupItems = [
  {
    itemId: "w1", order: 1, cluster: "TYPES", clusterName: CLUSTER_NAMES.TYPES,
    skillId: "FRA-T2",
    question: "Convert \\(2\\frac{1}{5}\\) to an improper fraction.",
    options: [
        { text: "\\( \\frac{11}{5} \\)", correct: true, feedback: "2×5=10, +1=11 → 11/5." },
        { text: "\\( \\frac{10}{5} \\)", correct: false, feedback: "You only multiplied 2×5, forgot the numerator.", misconceptionId: "E-w1-a" },
        { text: "\\( \\frac{7}{5} \\)", correct: false, feedback: "You added 2+5=7.", misconceptionId: "E-w1-b" },
        { text: "\\( \\frac{5}{11} \\)", correct: false, feedback: "Flipped.", misconceptionId: "E-w1-c" }
      ],
    misconceptions: [
      { misconceptionId: "E-w1-a", description: "Student answers 10/5, stopping after multiplying the whole number by the denominator.", rootCause: "Numerator-Drop — multiplies the whole number by the denominator (2×5=10) but never adds the numerator 1, leaving the conversion half-finished.", remediation: "Have the student say the three-step rule aloud — multiply, add, then place over the denominator — circling the '+1' step before computing." },
      { misconceptionId: "E-w1-b", description: "Student answers 7/5, adding the whole number and denominator together instead of multiplying.", rootCause: "Addition-Instead-of-Multiplication — adds the whole number and denominator (2+5=7) rather than multiplying them, then never adds the numerator at all.", remediation: "Contrast the two operations with a worked example, emphasizing the whole number is MULTIPLIED by the denominator, not added to it." },
      { misconceptionId: "E-w1-c", description: "Student answers 5/11, correctly finding 11 and 5 but writing the fraction upside down.", rootCause: "Reciprocal-Flip — correctly computes 11 and 5 but inverts their positions, confusing which one is the numerator.", remediation: "Remind the student the original denominator always stays the denominator; only the numerator changes during mixed-to-improper conversion." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the parts", hint: "In 2 1/5, the whole number is 2, the numerator is 1, the denominator is 5." },
      { level: 2, description: "Multiply and add", hint: "Multiply the whole number by the denominator (2×5=10), then add the numerator (10+1=11)." },
      { level: 3, description: "Place over the denominator", hint: "11 goes over the original denominator: 11/5." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.NF.B.3.C"]
  },
  {
    itemId: "w2", order: 2, cluster: "EQUIV", clusterName: CLUSTER_NAMES.EQUIV,
    skillId: "EQUIV-01",
    question: "Simplify \\(\\frac{15}{20}\\).",
    options: [
        { text: "\\( \\frac{3}{4} \\)", correct: true, feedback: "Divide by 5 → 3/4." },
        { text: "\\( \\frac{5}{4} \\)", correct: false, feedback: "Incorrect.", misconceptionId: "E-w2-a" },
        { text: "\\( \\frac{15}{20} \\)", correct: false, feedback: "Not simplified.", misconceptionId: "E-w2-b" },
        { text: "\\( \\frac{5}{10} \\)", correct: false, feedback: "Wrong.", misconceptionId: "E-w2-c" }
      ],
    misconceptions: [
      { misconceptionId: "E-w2-a", description: "Student answers 5/4, an improper fraction not equivalent to 15/20.", rootCause: "Cross-Swap Error — mentally swaps which number is treated as the numerator and which as the denominator partway through simplifying, arriving at 5/4 instead of the correctly-oriented 3/4.", remediation: "Have the student label the numerator and denominator with N and D before dividing, and keep those labels through both division steps." },
      { misconceptionId: "E-w2-b", description: "Student answers 15/20, the unsimplified original.", rootCause: "No-Simplification — repeats the original fraction, not recognizing that 15 and 20 share a common factor.", remediation: "Ask the student to check whether numerator and denominator are both divisible by 5 before declaring a fraction already simplest." },
      { misconceptionId: "E-w2-c", description: "Student answers 5/10, dividing by an unrelated factor.", rootCause: "Wrong-Divisor — divides the numerator and denominator by different amounts not related to the true HCF of 15 and 20 (which is 5), landing on a fraction that isn't even equivalent to the original.", remediation: "Have the student verify their answer by cross-multiplying with the original: does 5×20 equal 10×15? If not, the simplification is wrong." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "List common factors", hint: "What numbers divide evenly into both 15 and 20?" },
      { level: 2, description: "Find the HCF", hint: "The highest common factor of 15 and 20 is 5." },
      { level: 3, description: "Divide both terms", hint: "15÷5=3 and 20÷5=4, so the simplest form is 3/4." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.NF.A.1"]
  },
  {
    itemId: "w3", order: 3, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    skillId: "COMP-01",
    question: "Which is larger? \\(\\frac{2}{7}\\) or \\(\\frac{3}{7}\\)?",
    options: [
        { text: "\\( \\frac{3}{7} \\)", correct: true, feedback: "Same denominator; 3 > 2." },
        { text: "\\( \\frac{2}{7} \\)", correct: false, feedback: "2 is smaller than 3.", misconceptionId: "E-w3-a" },
        { text: "They are equal", correct: false, feedback: "The numerators differ.", misconceptionId: "E-w3-b" },
        { text: "Cannot compare", correct: false, feedback: "Same denominator is easy to compare.", misconceptionId: "E-w3-c" }
      ],
    misconceptions: [
      { misconceptionId: "E-w3-a", description: "Student picks 2/7, the smaller fraction.", rootCause: "Smaller-Number Bias — picks the fraction with the smaller numerator, possibly reading the comparison direction backwards.", remediation: "Have the student restate the question as 'which numerator wins?' before selecting an option." },
      { misconceptionId: "E-w3-b", description: "Student claims the two fractions are equal.", rootCause: "Denominator-Only Focus — notices the denominators match and concludes the fractions must be equal, ignoring that the numerators differ.", remediation: "Ask the student to shade 2/7 and 3/7 on identical fraction bars side by side so the visual difference is unmistakable." },
      { misconceptionId: "E-w3-c", description: "Student claims the fractions cannot be compared.", rootCause: "Same-Denominator Doubt — mistakenly believes comparison always requires a conversion step, not realizing one is already shared.", remediation: "Explicitly teach the shortcut: same denominator means you only ever need to compare numerators." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Check the denominators", hint: "Both fractions have denominator 7." },
      { level: 2, description: "Compare the numerators", hint: "Compare 2 and 3." },
      { level: 3, description: "Pick the larger", hint: "Since 3 > 2, 3/7 is the larger fraction." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.NF.A.2"]
  },
  {
    itemId: "w4", order: 4, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    skillId: "ADDSUB-01",
    question: "\\(\\frac{1}{4} + \\frac{2}{4}\\) = ?",
    options: [
        { text: "\\( \\frac{3}{4} \\)", correct: true, feedback: "1+2=3, denominator stays 4." },
        { text: "\\( \\frac{3}{8} \\)", correct: false, feedback: "Added denominators.", misconceptionId: "E-w4-a" },
        { text: "\\( \\frac{1}{2} \\)", correct: false, feedback: "2/4=1/2, but plus 1/4 is 3/4.", misconceptionId: "E-w4-b" },
        { text: "\\( \\frac{1}{4} \\)", correct: false, feedback: "Forgot to add the second fraction.", misconceptionId: "E-w4-c" }
      ],
    misconceptions: [
      { misconceptionId: "E-w4-a", description: "Student answers 3/8, adding both numerators and denominators.", rootCause: "Denominator-Addition — adds the denominators as well as the numerators (4+4=8), not realizing the denominator names the piece size and stays fixed.", remediation: "Use a fraction-bar picture: four equal pieces stay four equal pieces regardless of how many are shaded." },
      { misconceptionId: "E-w4-b", description: "Student answers 1/2, reporting only the second fraction simplified.", rootCause: "Addend-Drop — takes the second fraction (2/4) and simplifies it to 1/2, forgetting to add the first fraction (1/4) at all.", remediation: "Have the student underline both numerators before adding, so neither term is skipped." },
      { misconceptionId: "E-w4-c", description: "Student answers 1/4, reporting only the first addend.", rootCause: "No-Operation — writes down the first fraction unchanged, as though no addition took place.", remediation: "Ask the student to point to the '+' sign and explain what it means before writing an answer." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Check the denominators", hint: "Both fractions already have denominator 4." },
      { level: 2, description: "Add the numerators", hint: "1 + 2 = 3." },
      { level: 3, description: "Keep the denominator", hint: "The denominator stays 4, so the answer is 3/4." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.NF.B.3.A"]
  },
  {
    itemId: "w5", order: 5, cluster: "MUL", clusterName: CLUSTER_NAMES.MUL,
    skillId: "MUL-01",
    question: "\\(3 \\times \\frac{2}{5}\\) = ? (improper fraction)",
    options: [
        { text: "\\( \\frac{6}{5} \\)", correct: true, feedback: "3×2=6, denominator 5." },
        { text: "\\( \\frac{5}{6} \\)", correct: false, feedback: "Reciprocal.", misconceptionId: "E-w5-a" },
        { text: "\\( \\frac{2}{15} \\)", correct: false, feedback: "Multiplied denominator.", misconceptionId: "E-w5-b" },
        { text: "\\( \\frac{6}{15} \\)", correct: false, feedback: "Multiplied both.", misconceptionId: "E-w5-c" }
      ],
    misconceptions: [
      { misconceptionId: "E-w5-a", description: "Student answers 5/6, the reciprocal of the correct answer.", rootCause: "Reciprocal-Flip — inverts the fraction rather than multiplying it by the whole number.", remediation: "Have the student check which number came from the original denominator (it must stay on the bottom)." },
      { misconceptionId: "E-w5-b", description: "Student answers 2/15, multiplying the denominator by 3 instead of the numerator.", rootCause: "Denominator-Multiplication — multiplies the denominator by 3 (5×3=15) instead of the numerator, treating the whole number as though it shrinks the pieces rather than scales the count.", remediation: "Have the student say aloud which part of the fraction represents 'how many pieces' before multiplying — only that part changes." },
      { misconceptionId: "E-w5-c", description: "Student answers 6/15, scaling both numerator and denominator by 3.", rootCause: "Numerator-And-Denominator Scaling — multiplies both the numerator and denominator by 3, as if finding an equivalent fraction, instead of multiplying only the numerator.", remediation: "Clarify the rule with a contrast: multiplying a fraction by a whole number scales only the numerator, not the denominator." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify what changes", hint: "When multiplying a fraction by a whole number, only the numerator is multiplied." },
      { level: 2, description: "Multiply the numerator", hint: "3 × 2 = 6, so you get 6/5." },
      { level: 3, description: "Keep the denominator", hint: "The denominator stays 5, giving 6/5." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.NF.B.4.B"]
  },
  {
    itemId: "w6", order: 6, cluster: "DIV", clusterName: CLUSTER_NAMES.DIV,
    skillId: "DIV-01",
    question: "\\(\\frac{5}{8} \\div 5\\) = ? (simplest form)",
    options: [
        { text: "\\( \\frac{1}{8} \\)", correct: true, feedback: "5/8 × 1/5 = 5/40 = 1/8." },
        { text: "\\( \\frac{25}{8} \\)", correct: false, feedback: "Multiplied by 5.", misconceptionId: "E-w6-a" },
        { text: "\\( \\frac{5}{40} \\)", correct: false, feedback: "Not simplified.", misconceptionId: "E-w6-b" },
        { text: "\\( \\frac{1}{5} \\)", correct: false, feedback: "Incorrect.", misconceptionId: "E-w6-c" }
      ],
    misconceptions: [
      { misconceptionId: "E-w6-a", description: "Student answers 25/8, multiplying the numerator by 5 instead of dividing.", rootCause: "Operation-Reversal — multiplies the numerator by 5 instead of dividing, treating the whole number as a scale-up factor.", remediation: "Have the student predict whether the answer should be bigger or smaller than the start before computing." },
      { misconceptionId: "E-w6-b", description: "Student answers 5/40, the correct unsimplified quotient.", rootCause: "Unsimplified-Quotient — correctly multiplies the denominator by 5 (8×5=40) but stops before reducing 5/40 to its simplest form, 1/8.", remediation: "Add a 'can this be simplified?' check as the last step of every division problem." },
      { misconceptionId: "E-w6-c", description: "Student answers 1/5, confusing the divisor's reciprocal with the final quotient.", rootCause: "Wrong-Reciprocal — writes the reciprocal of the divisor (1/5) directly as the final answer, skipping the multiplication step with the original fraction.", remediation: "Walk through both steps explicitly: first find the reciprocal of the divisor, THEN multiply it by the original fraction." }
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
    itemId: "w7", order: 7, cluster: "TYPES", clusterName: CLUSTER_NAMES.TYPES,
    skillId: "FRA-T1",
    question: "Which is an improper fraction? \\(\\frac{3}{5}, \\frac{7}{4}, \\frac{1}{2}, \\frac{2}{3}\\)",
    options: [
        { text: "\\( \\frac{7}{4} \\)", correct: true, feedback: "Numerator > denominator." },
        { text: "\\( \\frac{3}{5} \\)", correct: false, feedback: "3 < 5, proper.", misconceptionId: "E-w7-a" },
        { text: "\\( \\frac{1}{2} \\)", correct: false, feedback: "1 < 2, proper.", misconceptionId: "E-w7-b" },
        { text: "\\( \\frac{2}{3} \\)", correct: false, feedback: "2 < 3, proper.", misconceptionId: "E-w7-c" }
      ],
    misconceptions: [
      { misconceptionId: "E-w7-a", description: "Student picks 3/5, a proper fraction.", rootCause: "Proper-As-Improper Misclassification — doesn't check that the numerator (3) is smaller than the denominator (5).", remediation: "Have the student circle the numerator and denominator and write '<' or '>' between them before classifying." },
      { misconceptionId: "E-w7-b", description: "Student picks 1/2, a proper fraction.", rootCause: "Proper-As-Improper Misclassification — the comparison step is skipped for this option too.", remediation: "Practice sorting a mixed set of fraction cards into 'proper' and 'improper' piles, checking each one explicitly." },
      { misconceptionId: "E-w7-c", description: "Student picks 2/3, a proper fraction.", rootCause: "Proper-As-Improper Misclassification — same comparison step is skipped.", remediation: "Anchor the definition with a visual: an improper fraction always represents one whole shaded region or more." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the definition", hint: "An improper fraction has numerator ≥ denominator." },
      { level: 2, description: "Check each option", hint: "Compare numerator and denominator in each fraction." },
      { level: 3, description: "Pick the improper one", hint: "Only 7/4 has numerator greater than denominator." }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "w8", order: 8, cluster: "MUL", clusterName: CLUSTER_NAMES.MUL,
    skillId: "MUL-02",
    question: "What is \\(\\frac{1}{3}\\) of 12?",
    options: [
        { text: "4", correct: true, feedback: "12 ÷ 3 = 4." },
        { text: "36", correct: false, feedback: "Multiplied 12×3.", misconceptionId: "E-w8-a" },
        { text: "3", correct: false, feedback: "You copied the denominator.", misconceptionId: "E-w8-b" },
        { text: "12", correct: false, feedback: "No operation performed.", misconceptionId: "E-w8-c" }
      ],
    misconceptions: [
      { misconceptionId: "E-w8-a", description: "Student answers 36, multiplying instead of dividing.", rootCause: "Operation-Reversal — multiplies 12×3 instead of dividing, treating 'of' as multiplication by the denominator rather than division.", remediation: "Anchor the rule: finding a unit fraction 'of' a number means dividing by the denominator, not multiplying." },
      { misconceptionId: "E-w8-b", description: "Student answers 3, the denominator itself.", rootCause: "Denominator-Copy — writes the denominator itself as the answer instead of dividing 12 by 3.", remediation: "Remind the student that the denominator names the operation (divide by 3), not the answer itself." },
      { misconceptionId: "E-w8-c", description: "Student answers 12, the original number unchanged.", rootCause: "No-Operation — writes down the original number, as though no operation was performed.", remediation: "Remind the student that 'of' is an instruction to compute, not a label to copy — ask 'what number is the answer?'" }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the operation", hint: "'1/3 of 12' means divide 12 by 3." },
      { level: 2, description: "Divide", hint: "12 ÷ 3 = 4." },
      { level: 3, description: "State the answer", hint: "1/3 of 12 is 4." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.NF.B.4.C"]
  }
];

const diagnosticItems = [
  {
    itemId: "d1", order: 1, cluster: "TYPES", clusterName: CLUSTER_NAMES.TYPES, tier: "S",
    skillId: "FRA-T2",
    question: "Convert \\(3\\frac{2}{5}\\) to an improper fraction.",
    options: [
        { text: "\\( \\frac{17}{5} \\)", correct: true, feedback: "3×5=15, +2=17 → 17/5." },
        { text: "\\( \\frac{15}{5} \\)", correct: false, feedback: "Only multiplied 3×5.", misconceptionId: "E-d1-a" },
        { text: "\\( \\frac{6}{5} \\)", correct: false, feedback: "Adding 3+2+5 is not the method.", misconceptionId: "E-d1-b" },
        { text: "\\( \\frac{17}{10} \\)", correct: false, feedback: "Doubled the denominator.", misconceptionId: "E-d1-c" }
      ],
    misconceptions: [
      { misconceptionId: "E-d1-a", description: "Student answers 15/5, stopping after multiplying the whole number by the denominator.", rootCause: "Numerator-Drop — multiplies the whole number by the denominator (3×5=15) but never adds the numerator 2, leaving the conversion half-finished.", remediation: "Have the student say the three-step rule aloud — multiply, add, then place over the denominator — circling the '+2' step before computing." },
      { misconceptionId: "E-d1-b", description: "Student answers 6/5, adding the whole number, numerator, and denominator together instead of following the multiply-then-add rule.", rootCause: "All-Terms-Added — adds 3+2+... in some combination unrelated to the correct multiply-then-add procedure, landing on a numerator of 6.", remediation: "Have the student compute the multiplication step (3×5=15) first and write it down before considering the numerator at all." },
      { misconceptionId: "E-d1-c", description: "Student answers 17/10, correctly finding the numerator 17 but doubling the denominator.", rootCause: "Denominator-Doubling — correctly computes the numerator (17) but then doubles the original denominator (5×2=10) instead of leaving it unchanged.", remediation: "Remind the student that the original denominator (5) always stays exactly as it is — only the numerator changes during mixed-to-improper conversion." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the parts", hint: "In 3 2/5, the whole number is 3, the numerator is 2, the denominator is 5." },
      { level: 2, description: "Multiply and add", hint: "Multiply the whole number by the denominator (3×5=15), then add the numerator (15+2=17)." },
      { level: 3, description: "Place over the denominator", hint: "17 goes over the original denominator: 17/5." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.NF.B.3.C"]
  },
  {
    itemId: "d2", order: 2, cluster: "EQUIV", clusterName: CLUSTER_NAMES.EQUIV, tier: "S",
    skillId: "EQUIV-01",
    question: "Simplify \\(\\frac{12}{18}\\).",
    options: [
        { text: "\\( \\frac{2}{3} \\)", correct: true, feedback: "Divide by 6 → 2/3." },
        { text: "\\( \\frac{4}{6} \\)", correct: false, feedback: "Not fully simplified.", misconceptionId: "E-d2-a" },
        { text: "\\( \\frac{6}{9} \\)", correct: false, feedback: "Also not fully simplified.", misconceptionId: "E-d2-b" },
        { text: "\\( \\frac{3}{4} \\)", correct: false, feedback: "Incorrect simplification.", misconceptionId: "E-d2-c" }
      ],
    misconceptions: [
      { misconceptionId: "E-d2-a", description: "Student answers 4/6, dividing by 3 instead of the full HCF of 6.", rootCause: "Partial-Simplification — divides numerator and denominator by 3 instead of by the full HCF of 6, leaving a fraction that is equivalent but not fully reduced.", remediation: "Have the student list ALL common factors of 12 and 18, then pick the largest one (6), rather than dividing by the first factor spotted." },
      { misconceptionId: "E-d2-b", description: "Student answers 6/9, dividing by 2 instead of the full HCF of 6.", rootCause: "Partial-Simplification — divides numerator and denominator by 2 instead of by the full HCF of 6, leaving a fraction that is equivalent but not fully reduced.", remediation: "After each simplification step, have the student ask 'can I divide again?' until no common factor remains." },
      { misconceptionId: "E-d2-c", description: "Student answers 3/4, swapping which number gets divided by which factor.", rootCause: "Cross-Swap Error — mentally swaps which number is treated as the numerator and which as the denominator partway through simplifying.", remediation: "Have the student label the numerator and denominator with N and D before dividing, and keep those labels through both division steps." }
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
    itemId: "d3", order: 3, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP, tier: "S",
    skillId: "COMP-01",
    question: "Which is smaller? \\(\\frac{5}{9}\\) or \\(\\frac{4}{9}\\)?",
    options: [
        { text: "\\( \\frac{4}{9} \\)", correct: true, feedback: "4 < 5, same denominator." },
        { text: "\\( \\frac{5}{9} \\)", correct: false, feedback: "5/9 is larger.", misconceptionId: "E-d3-a" },
        { text: "They are equal", correct: false, feedback: "Numerators differ.", misconceptionId: "E-d3-b" },
        { text: "Cannot compare", correct: false, feedback: "Same denominator, easy to compare.", misconceptionId: "E-d3-c" }
      ],
    misconceptions: [
      { misconceptionId: "E-d3-a", description: "Student picks 5/9, the larger fraction.", rootCause: "Direction-Confusion — picks the fraction with the larger numerator despite the question asking for the smaller one.", remediation: "Have the student restate the question as 'which numerator loses?' before selecting an option." },
      { misconceptionId: "E-d3-b", description: "Student claims the fractions are equal.", rootCause: "Denominator-Only Focus — notices the shared denominator and concludes equality without checking the numerators.", remediation: "Ask the student to shade 5/9 and 4/9 on identical fraction bars to make the difference visible." },
      { misconceptionId: "E-d3-c", description: "Student claims the fractions cannot be compared.", rootCause: "Same-Denominator Doubt — mistakenly believes a conversion step is needed first, not realizing the denominator is already shared.", remediation: "Explicitly teach the shortcut: same denominator means only the numerators need comparing." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Check the denominators", hint: "Both fractions have denominator 9." },
      { level: 2, description: "Compare the numerators", hint: "Compare 4 and 5." },
      { level: 3, description: "Pick the smaller", hint: "Since 4 < 5, 4/9 is smaller." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.NF.A.2"]
  },
  {
    itemId: "d4", order: 4, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB, tier: "S",
    skillId: "ADDSUB-01",
    question: "\\(\\frac{3}{8} + \\frac{2}{8}\\) = ? (simplest form)",
    options: [
        { text: "\\( \\frac{5}{8} \\)", correct: true, feedback: "3+2=5, denominator 8." },
        { text: "\\( \\frac{5}{16} \\)", correct: false, feedback: "Added denominators.", misconceptionId: "E-d4-a" },
        { text: "\\( \\frac{1}{8} \\)", correct: false, feedback: "Incorrect addition.", misconceptionId: "E-d4-b" },
        { text: "\\( \\frac{1}{4} \\)", correct: false, feedback: "Incorrect.", misconceptionId: "E-d4-c" }
      ],
    misconceptions: [
      { misconceptionId: "E-d4-a", description: "Student answers 5/16, adding both numerators and denominators.", rootCause: "Denominator-Addition — adds the denominators as well as the numerators (8+8=16), not realizing the denominator stays fixed.", remediation: "Use a fraction-bar picture: eight equal pieces stay eight equal pieces regardless of how many are shaded." },
      { misconceptionId: "E-d4-b", description: "Student answers 1/8, subtracting instead of adding.", rootCause: "Operation-Reversal — subtracts the numerators (3-2=1) instead of adding them, misreading the '+' as a '-'.", remediation: "Have the student point to the '+' sign and explain what it means before writing an answer." },
      { misconceptionId: "E-d4-c", description: "Student answers 1/4, miscounting the sum and then simplifying that wrong sum.", rootCause: "Numerator-Miscount — miscounts the sum of 3+2 as 2 instead of 5, then simplifies the WRONG sum (2/8) down to 1/4.", remediation: "Have the student re-add 3+2 carefully, confirming the sum is 5." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Check the denominators", hint: "Both fractions already have denominator 8." },
      { level: 2, description: "Add the numerators", hint: "3 + 2 = 5." },
      { level: 3, description: "Check for simplification", hint: "5 and 8 share no common factor, so 5/8 is already simplest." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.NF.B.3.A"]
  },
  {
    itemId: "d5", order: 5, cluster: "MUL", clusterName: CLUSTER_NAMES.MUL, tier: "T",
    skillId: "MUL-01",
    question: "\\(4 \\times \\frac{3}{10}\\) = ? (simplest form)",
    options: [
        { text: "\\( \\frac{6}{5} \\)", correct: true, feedback: "12/10 = 6/5." },
        { text: "\\( \\frac{12}{10} \\)", correct: false, feedback: "Not simplified.", misconceptionId: "E-d5-a" },
        { text: "\\( \\frac{3}{40} \\)", correct: false, feedback: "Multiplied the denominator instead.", misconceptionId: "E-d5-b" },
        { text: "\\( \\frac{4}{13} \\)", correct: false, feedback: "Not a valid operation.", misconceptionId: "E-d5-c" }
      ],
    misconceptions: [
      { misconceptionId: "E-d5-a", description: "Student answers 12/10, the correct unsimplified product.", rootCause: "Unsimplified-Result — correctly computes 12/10 but doesn't reduce it to 6/5.", remediation: "Add a 'can this be simplified?' check as the last step of every multiplication problem, this is a trap item designed to catch students who stop early." },
      { misconceptionId: "E-d5-b", description: "Student answers 3/40, multiplying the denominator by 4 instead of the numerator.", rootCause: "Denominator-Multiplication — multiplies the denominator by 4 (10×4=40) instead of the numerator, treating the whole number as though it shrinks the pieces rather than scales the count.", remediation: "Have the student say aloud which part of the fraction represents 'how many pieces' before multiplying — only that part changes." },
      { misconceptionId: "E-d5-c", description: "Student answers 4/13, combining the whole number and denominator in an invalid way.", rootCause: "Invalid-Combination — adds the whole number 4 to the denominator 10 minus something, or otherwise combines the numbers in a way that doesn't correspond to any valid fraction-multiplication rule.", remediation: "Have the student restate the rule explicitly: multiplying a fraction by a whole number means multiplying only the numerator by that whole number." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify what changes", hint: "When multiplying a fraction by a whole number, only the numerator is multiplied." },
      { level: 2, description: "Multiply the numerator", hint: "4 × 3 = 12, so you get 12/10." },
      { level: 3, description: "Simplify", hint: "12/10 simplifies to 6/5 (divide both by 2)." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.NF.B.4.B"]
  },
  {
    itemId: "d6", order: 6, cluster: "DIV", clusterName: CLUSTER_NAMES.DIV, tier: "S",
    skillId: "DIV-01",
    question: "\\(\\frac{6}{7} \\div 3\\) = ? (simplest form)",
    options: [
        { text: "\\( \\frac{2}{7} \\)", correct: true, feedback: "6/7 × 1/3 = 6/21 = 2/7." },
        { text: "\\( \\frac{18}{7} \\)", correct: false, feedback: "Multiplied by 3 instead of dividing.", misconceptionId: "E-d6-a" },
        { text: "\\( \\frac{3}{7} \\)", correct: false, feedback: "Incorrect.", misconceptionId: "E-d6-b" },
        { text: "\\( \\frac{6}{21} \\)", correct: false, feedback: "Not simplified.", misconceptionId: "E-d6-c" }
      ],
    misconceptions: [
      { misconceptionId: "E-d6-a", description: "Student answers 18/7, multiplying the numerator by 3 instead of dividing.", rootCause: "Operation-Reversal — multiplies the numerator by 3 instead of dividing, treating the whole number as a scale-up factor.", remediation: "Have the student predict whether the answer should be bigger or smaller than the start before computing." },
      { misconceptionId: "E-d6-b", description: "Student answers 3/7, confusing the divisor with the numerator of the answer.", rootCause: "Divisor-As-Numerator — writes the divisor itself (3) as the new numerator over the original denominator, rather than actually dividing 6/7 by 3.", remediation: "Have the student work through the reciprocal method explicitly: 6/7 × 1/3 = (6×1)/(7×3) = 6/21." },
      { misconceptionId: "E-d6-c", description: "Student answers 6/21, the correct unsimplified quotient.", rootCause: "Unsimplified-Quotient — correctly multiplies the denominator by 3 (7×3=21) but stops before reducing 6/21 to its simplest form, 2/7.", remediation: "Add a 'can this be simplified?' check as the last step of every division problem." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Turn the divisor into a reciprocal", hint: "Dividing by 3 is the same as multiplying by 1/3." },
      { level: 2, description: "Multiply across", hint: "6/7 × 1/3 = (6×1)/(7×3) = 6/21." },
      { level: 3, description: "Simplify", hint: "6/21 simplifies to 2/7." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NF.B.7.A"]
  },
  {
    itemId: "d7", order: 7, cluster: "TYPES", clusterName: CLUSTER_NAMES.TYPES, tier: "T",
    skillId: "COMP-02",
    question: "Which is largest? \\(\\frac{11}{4}, 2\\frac{1}{2}, \\frac{9}{4}\\)",
    options: [
        { text: "\\( \\frac{11}{4} \\)", correct: true, feedback: "11/4=2.75, 2 1/2=2.5, 9/4=2.25." },
        { text: "\\(2\\frac{1}{2}\\)", correct: false, feedback: "2 1/2 = 2.5, but 11/4 = 2.75.", misconceptionId: "E-d7-a" },
        { text: "\\(\\frac{9}{4}\\)", correct: false, feedback: "9/4 = 2.25, the smallest.", misconceptionId: "E-d7-b" },
        { text: "All equal", correct: false, feedback: "They have different values.", misconceptionId: "E-d7-c" }
      ],
    misconceptions: [
      { misconceptionId: "E-d7-a", description: "Student picks 2 1/2, without converting it and the improper fractions to a shared form.", rootCause: "Mixed-Improper Mismatch — compares a mixed number directly against improper fractions without converting either to a common form, misjudging 2 1/2 as larger than 11/4.", remediation: "Have the student convert 2 1/2 to an improper fraction with denominator 4 (2 1/2 = 10/4) so all three values are directly comparable — this trap item is designed to catch students who skip that conversion." },
      { misconceptionId: "E-d7-b", description: "Student picks 9/4, the smallest of the three values.", rootCause: "Numerator-Miscompare — compares numerators (11, 9) but somehow selects the smaller one, possibly misreading which fraction has which numerator.", remediation: "Have the student write all three numerators over denominator 4 side by side (11/4, 10/4, 9/4) before choosing the largest." },
      { misconceptionId: "E-d7-c", description: "Student claims all three values are equal.", rootCause: "Surface-Similarity Assumption — assumes fractions that all hover near the value 2.5 must be equal without actually converting and comparing them.", remediation: "Have the student compute a decimal or common-denominator value for each fraction individually and compare the three numbers explicitly." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Convert to a common form", hint: "Rewrite 2 1/2 as an improper fraction with denominator 4." },
      { level: 2, description: "Convert", hint: "2 1/2 = 10/4." },
      { level: 3, description: "Compare numerators", hint: "11/4, 10/4, 9/4 — the largest numerator (11) gives the largest fraction." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.NF.A.2"]
  },
  {
    itemId: "d8", order: 8, cluster: "EQUIV", clusterName: CLUSTER_NAMES.EQUIV, tier: "T",
    skillId: "EQUIV-02",
    question: "Find the missing number: \\(\\frac{5}{6} = \\frac{?}{18}\\)",
    options: [
        { text: "15", correct: true, feedback: "6×3=18, so 5×3=15." },
        { text: "3", correct: false, feedback: "You divided 18 by 6 but must multiply the numerator by that same factor.", misconceptionId: "E-d8-a" },
        { text: "10", correct: false, feedback: "Incorrect multiplier.", misconceptionId: "E-d8-b" },
        { text: "12", correct: false, feedback: "Incorrect multiplier.", misconceptionId: "E-d8-c" }
      ],
    misconceptions: [
      { misconceptionId: "E-d8-a", description: "Student answers 3, writing the scale factor itself instead of applying it.", rootCause: "Multiplier-As-Answer — correctly finds that the denominator was scaled by 3 (6×3=18), but writes that multiplier itself as the new numerator instead of multiplying it by the original numerator (5×3=15). This trap item is designed to catch that exact slip.", remediation: "Have the student write both operations side by side — 'denominator: 6×3=18' and 'numerator: 5×3=___' — so the same multiplier is visibly applied to both." },
      { misconceptionId: "E-d8-b", description: "Student answers 10, using an incorrect scale factor.", rootCause: "Wrong-Multiplier — assumes a scale factor of 2 (5×2=10) instead of correctly finding that 6×3=18, i.e. picks an incorrect multiplier for the denominator relationship.", remediation: "Have the student verify the multiplier first by asking '6 times what equals 18?' before touching the numerator." },
      { misconceptionId: "E-d8-c", description: "Student answers 12, using another incorrect scale factor.", rootCause: "Wrong-Multiplier — assumes a scale factor that doesn't actually satisfy 6×?=18, producing a numerator that doesn't correspond to a valid equivalent fraction.", remediation: "Have the student check their multiplier by multiplying the denominator back: does 6×(their multiplier) really equal 18?" }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the scale factor", hint: "What do you multiply 6 by to get 18?" },
      { level: 2, description: "Apply it to the numerator", hint: "Multiply 5 by that same factor: 5×3." },
      { level: 3, description: "State the answer", hint: "5×3=15, so the missing numerator is 15." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.NF.A.1"]
  },
  {
    itemId: "d9", order: 9, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP, tier: "C",
    skillId: "COMP-02",
    question: "Arrange in ascending order: \\(\\frac{2}{3}, \\frac{5}{8}, \\frac{3}{4}\\)",
    options: [
        { text: "\\(\\frac{5}{8}, \\frac{2}{3}, \\frac{3}{4}\\)", correct: true, feedback: "5/8=15/24, 2/3=16/24, 3/4=18/24." },
        { text: "\\(\\frac{2}{3}, \\frac{5}{8}, \\frac{3}{4}\\)", correct: false, feedback: "5/8 is smaller than 2/3.", misconceptionId: "E-d9-a" },
        { text: "\\(\\frac{3}{4}, \\frac{2}{3}, \\frac{5}{8}\\)", correct: false, feedback: "That's descending.", misconceptionId: "E-d9-b" },
        { text: "\\(\\frac{5}{8}, \\frac{3}{4}, \\frac{2}{3}\\)", correct: false, feedback: "3/4 is larger than 2/3.", misconceptionId: "E-d9-c" }
      ],
    misconceptions: [
      { misconceptionId: "E-d9-a", description: "Student places 2/3 before 5/8, without converting to the common denominator.", rootCause: "Unconverted Comparison — compares the fractions by their original numerators or denominators rather than converting to twenty-fourths first, misjudging that 2/3 is smaller than 5/8.", remediation: "Insist on writing all three fractions in twenty-fourths (15/24, 16/24, 18/24) BEFORE attempting to order them." },
      { misconceptionId: "E-d9-b", description: "Student orders the fractions from largest to smallest.", rootCause: "Direction-Reversal — correctly converts and compares the fractions but arranges largest-to-smallest instead of smallest-to-largest, reversing what 'ascending' means.", remediation: "Have the student picture a staircase going up and label the bottom step 'smallest' before ordering." },
      { misconceptionId: "E-d9-c", description: "Student places 3/4 before 2/3, mis-ordering the last two values.", rootCause: "Partial-Ordering — correctly identifies 5/8 as smallest but swaps the order of 2/3 (16/24) and 3/4 (18/24), not comparing the converted numerators carefully.", remediation: "Have the student compare every adjacent pair of converted numerators (15, 16, 18) explicitly before finalizing the order." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the LCM", hint: "The LCM of 3, 8, and 4 is 24." },
      { level: 2, description: "Convert each fraction", hint: "2/3=16/24, 5/8=15/24, 3/4=18/24." },
      { level: 3, description: "Order the numerators", hint: "15 < 16 < 18, so the order is 5/8, 2/3, 3/4." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.NF.A.2"]
  },
  {
    itemId: "d10", order: 10, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB, tier: "C",
    skillId: "ADDSUB-02",
    question: "\\(\\frac{2}{5} + \\frac{1}{2}\\) = ? (simplest form)",
    options: [
        { text: "\\(\\frac{9}{10}\\)", correct: true, feedback: "4/10 + 5/10 = 9/10." },
        { text: "\\(\\frac{3}{7}\\)", correct: false, feedback: "You added numerators and denominators separately.", misconceptionId: "E-d10-a" },
        { text: "\\(\\frac{1}{10}\\)", correct: false, feedback: "Incorrect.", misconceptionId: "E-d10-b" },
        { text: "\\(\\frac{4}{10}\\)", correct: false, feedback: "Forgot to add the second fraction.", misconceptionId: "E-d10-c" }
      ],
    misconceptions: [
      { misconceptionId: "E-d10-a", description: "Student answers 3/7, adding numerators and denominators straight across without converting.", rootCause: "Direct-Addition — adds numerators (2+1=3) and denominators (5+2=7) straight across without first converting to a common denominator.", remediation: "Before any unlike-denominator addition, have the student first rewrite both fractions with the same denominator, so there is nothing left to add 'straight across.'" },
      { misconceptionId: "E-d10-b", description: "Student answers 1/10, subtracting instead of adding after conversion.", rootCause: "Sign-Error — correctly converts both fractions to tenths (4/10 and 5/10) but then subtracts instead of adding, misreading the '+' as a '-'.", remediation: "Have the student point to the '+' sign and explain what it means before combining the converted numerators." },
      { misconceptionId: "E-d10-c", description: "Student answers 4/10, converting the first fraction but never adding the second.", rootCause: "Conversion-Without-Addition — correctly converts 2/5 to 4/10 but then stops, treating the conversion itself as the final answer instead of continuing to add 1/2 (converted to 5/10).", remediation: "Have the student convert BOTH fractions before doing anything else, writing 4/10 and 5/10 side by side, so the addition step is impossible to skip." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find a common denominator", hint: "10 is a multiple of 5 and 2, so convert both fractions into tenths." },
      { level: 2, description: "Convert", hint: "2/5 = 4/10 and 1/2 = 5/10." },
      { level: 3, description: "Add", hint: "4/10 + 5/10 = 9/10." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NF.A.1"]
  },
  {
    itemId: "d11", order: 11, cluster: "MUL", clusterName: CLUSTER_NAMES.MUL, tier: "C",
    skillId: "MUL-04",
    question: "\\(2 \\times \\frac{3}{5} + \\frac{1}{5}\\) = ? (simplest form)",
    options: [
        { text: "\\(\\frac{7}{5}\\)", correct: true, feedback: "6/5 + 1/5 = 7/5." },
        { text: "\\(\\frac{6}{5}\\)", correct: false, feedback: "Forgot to add 1/5.", misconceptionId: "E-d11-a" },
        { text: "\\(\\frac{4}{5}\\)", correct: false, feedback: "Incorrect multiplication.", misconceptionId: "E-d11-b" },
        { text: "\\(\\frac{7}{10}\\)", correct: false, feedback: "Added denominators.", misconceptionId: "E-d11-c" }
      ],
    misconceptions: [
      { misconceptionId: "E-d11-a", description: "Student answers 6/5, stopping after the multiplication step and never adding 1/5.", rootCause: "Second-Step-Drop — correctly computes 2×3/5=6/5 but stops there, forgetting the problem also asks to add 1/5 to that result.", remediation: "Have the student underline every instruction word ('+1/5') and check it's addressed before finalizing an answer." },
      { misconceptionId: "E-d11-b", description: "Student answers 4/5, miscomputing the multiplication step.", rootCause: "Multiplication-Miscalculation — miscomputes 2×3 as 2 instead of 6 (perhaps confusing it with a different operation), producing a wrong intermediate value.", remediation: "Have the student compute 2×3 as a standalone multiplication fact before placing it over the denominator." },
      { misconceptionId: "E-d11-c", description: "Student answers 7/10, adding denominators during the final addition step.", rootCause: "Denominator-Addition — correctly computes the multiplication (6/5) but then adds denominators as well as numerators when adding 1/5 (5+5=10), not realizing the denominator stays fixed.", remediation: "Remind the student that once denominators already match, addition only ever touches the numerators." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Do the multiplication first", hint: "2 × 3/5 means multiply the numerator: 2×3=6, giving 6/5." },
      { level: 2, description: "Set up the addition", hint: "Now add 1/5 to 6/5 — the denominators already match." },
      { level: 3, description: "Add", hint: "6/5 + 1/5 = 7/5." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NF.B.6"]
  },
  {
    itemId: "d12", order: 12, cluster: "DIV", clusterName: CLUSTER_NAMES.DIV, tier: "T",
    skillId: "DIV-01",
    question: "\\(\\frac{5}{4} \\div 2\\) = ? (simplest form)",
    options: [
        { text: "\\(\\frac{5}{8}\\)", correct: true, feedback: "5/4 × 1/2 = 5/8." },
        { text: "\\(\\frac{10}{4}\\)", correct: false, feedback: "Multiplied by 2 instead of dividing.", misconceptionId: "E-d12-a" },
        { text: "\\(\\frac{5}{2}\\)", correct: false, feedback: "Incorrect.", misconceptionId: "E-d12-b" },
        { text: "\\(\\frac{4}{10}\\)", correct: false, feedback: "Flipped incorrectly.", misconceptionId: "E-d12-c" }
      ],
    misconceptions: [
      { misconceptionId: "E-d12-a", description: "Student answers 10/4, multiplying the numerator by 2 instead of dividing.", rootCause: "Operation-Reversal — multiplies the numerator by 2 instead of dividing, treating the whole number as a scale-up factor.", remediation: "Have the student predict whether the answer should be bigger or smaller than the start before computing — this trap item is designed to catch that exact reversal." },
      { misconceptionId: "E-d12-b", description: "Student answers 5/2, doubling the denominator incorrectly instead of the intended operation.", rootCause: "Wrong-Reciprocal-Application — confuses which number should receive the reciprocal treatment, effectively halving the wrong part of the fraction and landing on 5/2 instead of 5/8.", remediation: "Have the student work through the reciprocal method explicitly: 5/4 × 1/2 = (5×1)/(4×2) = 5/8." },
      { misconceptionId: "E-d12-c", description: "Student answers 4/10, inverting the fraction and then applying the division incorrectly.", rootCause: "Premature-Flip — flips the original fraction 5/4 to 4/5 (or similar) before applying the division, then combines it incorrectly with the divisor 2, producing 4/10.", remediation: "Clarify that only the DIVISOR (2 → 1/2) gets flipped into a reciprocal — the original fraction (5/4) is never flipped." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Turn the divisor into a reciprocal", hint: "Dividing by 2 is the same as multiplying by 1/2." },
      { level: 2, description: "Multiply across", hint: "5/4 × 1/2 = (5×1)/(4×2) = 5/8." },
      { level: 3, description: "Check", hint: "5/8 is already in simplest form." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NF.B.7.A"]
  },
  {
    itemId: "d13", order: 13, cluster: "TYPES", clusterName: CLUSTER_NAMES.TYPES, tier: "H",
    skillId: "ADDSUB-04",
    question: "When a number is multiplied by 3 and then \\(\\frac{1}{2}\\) is added, the result is 5. Find the number.",
    options: [
        { text: "\\(1\\frac{1}{2}\\)", correct: true, feedback: "5 - 1/2 = 4 1/2 = 9/2. ÷3 = 3/2 = 1 1/2." },
        { text: "\\(2\\frac{1}{2}\\)", correct: false, feedback: "Incorrect reverse operations.", misconceptionId: "E-d13-a" },
        { text: "\\(1\\frac{1}{4}\\)", correct: false, feedback: "Incorrect.", misconceptionId: "E-d13-b" },
        { text: "\\(1\\frac{2}{3}\\)", correct: false, feedback: "Incorrect.", misconceptionId: "E-d13-c" }
      ],
    misconceptions: [
      { misconceptionId: "E-d13-a", description: "Student answers 2 1/2, dividing 5 by 3 directly without first undoing the addition.", rootCause: "Undo-Order-Reversed — divides the final result (5) by 3 first, without first subtracting the 1/2 that was added last, applying the reverse operations in the wrong order.", remediation: "Have the student list the forward operations in order (×3, then +1/2), then explicitly reverse that list (first -1/2, then ÷3) before computing." },
      { misconceptionId: "E-d13-b", description: "Student answers 1 1/4, miscomputing the division step.", rootCause: "Division-Miscalculation — correctly reaches 4 1/2 after undoing the addition, but miscomputes 4 1/2÷3, perhaps by halving instead of dividing by 3.", remediation: "Have the student convert 4 1/2 to an improper fraction (9/2) before dividing by 3, so the whole number and fraction aren't handled separately by mistake." },
      { misconceptionId: "E-d13-c", description: "Student answers 1 2/3, miscomputing either the subtraction or division step.", rootCause: "Multi-Step Computation Error — makes an error somewhere in the two-step reverse process (subtract then divide), landing on a plausible-looking but incorrect value.", remediation: "Have the student verify their answer by working FORWARD from it: multiply by 3, then add 1/2, and check the result is exactly 5." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the forward operations", hint: "The number was multiplied by 3, then 1/2 was added, to get 5." },
      { level: 2, description: "Undo the addition first", hint: "Subtract 1/2 from 5: 5 - 1/2 = 4 1/2 = 9/2." },
      { level: 3, description: "Undo the multiplication", hint: "Divide 9/2 by 3: 9/2 × 1/3 = 9/6 = 3/2 = 1 1/2." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NF.A.2"]
  },
  {
    itemId: "d14", order: 14, cluster: "EQUIV", clusterName: CLUSTER_NAMES.EQUIV, tier: "H",
    skillId: "EQUIV-03",
    question: "Which fraction is NOT equivalent to \\(\\frac{3}{5}\\)? \\(\\frac{6}{10}, \\frac{9}{15}, \\frac{12}{20}, \\frac{10}{16}\\)",
    options: [
        { text: "\\(\\frac{10}{16}\\)", correct: true, feedback: "10/16 = 5/8, not 3/5." },
        { text: "\\(\\frac{6}{10}\\)", correct: false, feedback: "6/10 = 3/5.", misconceptionId: "E-d14-a" },
        { text: "\\(\\frac{9}{15}\\)", correct: false, feedback: "9/15 = 3/5.", misconceptionId: "E-d14-b" },
        { text: "\\(\\frac{12}{20}\\)", correct: false, feedback: "12/20 = 3/5.", misconceptionId: "E-d14-c" }
      ],
    misconceptions: [
      { misconceptionId: "E-d14-a", description: "Student picks 6/10, which IS equivalent to 3/5.", rootCause: "Equivalence-Check Skipped — picks an option without verifying it against 3/5 by simplifying, missing that 6/10 correctly reduces to 3/5.", remediation: "Have the student simplify EVERY option to lowest terms before picking the odd one out." },
      { misconceptionId: "E-d14-b", description: "Student picks 9/15, which IS equivalent to 3/5.", rootCause: "Equivalence-Check Skipped — same verification step is skipped, missing that 9/15 correctly reduces to 3/5.", remediation: "Practice the simplification check explicitly: 9÷3=3 and 15÷3=5, confirming 9/15=3/5." },
      { misconceptionId: "E-d14-c", description: "Student picks 12/20, which IS equivalent to 3/5.", rootCause: "Equivalence-Check Skipped — same verification step is skipped, missing that 12/20 correctly reduces to 3/5.", remediation: "Have the student divide 12 and 20 by their common factor 4 to confirm 12/20=3/5 before ruling it out." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Simplify each option", hint: "Reduce 6/10, 9/15, 12/20, and 10/16 to lowest terms." },
      { level: 2, description: "Compare to 3/5", hint: "Which simplified fraction does NOT match 3/5?" },
      { level: 3, description: "Confirm", hint: "10/16 simplifies to 5/8, which is not 3/5." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.NF.A.1"]
  },
  {
    itemId: "d15", order: 15, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP, tier: "H",
    skillId: "COMP-03",
    question: "Three friends shared a pizza. A ate \\(\\frac{2}{5}\\), B ate \\(\\frac{3}{8}\\), C ate the rest. Who ate the most?",
    options: [
        { text: "A", correct: true, feedback: "2/5=16/40, 3/8=15/40, C=9/40. A ate the most." },
        { text: "B", correct: false, feedback: "B ate 15/40, less than A.", misconceptionId: "E-d15-a" },
        { text: "C", correct: false, feedback: "C ate 9/40, the least.", misconceptionId: "E-d15-b" },
        { text: "All equal", correct: false, feedback: "Different amounts.", misconceptionId: "E-d15-c" }
      ],
    misconceptions: [
      { misconceptionId: "E-d15-a", description: "Student picks B, without converting all three fractions to the common denominator.", rootCause: "Unconverted Comparison — compares the fractions by their original denominators (5, 8) without converting to fortieths first, misjudging that B's 3/8 is the largest.", remediation: "Insist on writing all three fractions in fortieths (16/40, 15/40, 9/40) BEFORE attempting to compare them." },
      { misconceptionId: "E-d15-b", description: "Student picks C, the person who ate the least.", rootCause: "Remainder-Miscalculation — miscomputes C's share (the 'rest' after A and B) as larger than it actually is, perhaps by mishandling the subtraction 1 - 2/5 - 3/8.", remediation: "Have the student compute C's share explicitly: 1 - 16/40 - 15/40 = 40/40 - 16/40 - 15/40 = 9/40, then compare all three converted numerators." },
      { misconceptionId: "E-d15-c", description: "Student claims all three friends ate the same amount.", rootCause: "Surface-Similarity Assumption — assumes three-way splits are automatically equal shares, without computing that 2/5 and 3/8 are different fractions with an unequal remainder for C.", remediation: "Have the student compute each person's converted numerator (16, 15, 9) and confirm they are different before concluding equality." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find C's share", hint: "C ate 1 - 2/5 - 3/8 of the pizza." },
      { level: 2, description: "Convert to a common denominator", hint: "Using fortieths: A=16/40, B=15/40, so C = 40/40-16/40-15/40 = 9/40." },
      { level: 3, description: "Compare", hint: "16/40 (A) is the largest of the three." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.NF.A.2"]
  },
  {
    itemId: "d16", order: 16, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB, tier: "H",
    skillId: "ADDSUB-03",
    question: "\\( (2\\frac{1}{2} - 1\\frac{1}{4}) + \\frac{3}{4}\\) = ? (simplest form)",
    options: [
        { text: "2", correct: true, feedback: "5/2 - 5/4 = 10/4 - 5/4 = 5/4; + 3/4 = 8/4 = 2." },
        { text: "\\(1\\frac{1}{2}\\)", correct: false, feedback: "Incorrect bracket evaluation.", misconceptionId: "E-d16-a" },
        { text: "\\(1\\frac{3}{4}\\)", correct: false, feedback: "Incorrect.", misconceptionId: "E-d16-b" },
        { text: "\\(2\\frac{1}{4}\\)", correct: false, feedback: "Incorrect.", misconceptionId: "E-d16-c" }
      ],
    misconceptions: [
      { misconceptionId: "E-d16-a", description: "Student answers 1 1/2, miscomputing the bracket subtraction.", rootCause: "Bracket-Miscalculation — miscomputes 2 1/2-1 1/4 as a value 1/2 too small (e.g., getting 3/4 instead of 5/4), then correctly adds 3/4 to that wrong intermediate result.", remediation: "Have the student verify the bracket result independently: 5/2-5/4=10/4-5/4=5/4, before proceeding to the addition." },
      { misconceptionId: "E-d16-b", description: "Student answers 1 3/4, dropping or mishandling the final addition of 3/4.", rootCause: "Second-Step-Drop-Or-Error — either doesn't fully complete the addition of 3/4 to the bracket result, or miscombines the two, landing on a value 1/4 short of the correct 2.", remediation: "Have the student compute the bracket result first (5/4), write it down, then add 3/4 as a separate clean step: 5/4+3/4=8/4." },
      { misconceptionId: "E-d16-c", description: "Student answers 2 1/4, overcounting the final sum.", rootCause: "Numerator-Addition-Error — after correctly finding the bracket result (5/4), miscombines it with 3/4, overshooting by 1/4.", remediation: "Have the student recompute 5+3 carefully, confirming the numerator sum is 8, giving 8/4=2." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Evaluate the bracket first", hint: "2 1/2 - 1 1/4 = 5/2 - 5/4 = 10/4 - 5/4 = 5/4." },
      { level: 2, description: "Set up the addition", hint: "Now add 3/4 to 5/4 — the denominators already match." },
      { level: 3, description: "Add and simplify", hint: "5/4 + 3/4 = 8/4 = 2." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NF.A.1"]
  },
  {
    itemId: "d17", order: 17, cluster: "MUL", clusterName: CLUSTER_NAMES.MUL, tier: "H",
    skillId: "MUL-03",
    question: "A tank is \\(\\frac{3}{4}\\) full. \\(\\frac{1}{3}\\) of the water is used. What fraction of the tank is now full?",
    options: [
        { text: "\\(\\frac{1}{2}\\)", correct: true, feedback: "Used: 1/3 × 3/4 = 1/4. Remaining: 3/4 - 1/4 = 1/2." },
        { text: "\\(\\frac{1}{4}\\)", correct: false, feedback: "That's the amount used.", misconceptionId: "E-d17-a" },
        { text: "\\(\\frac{1}{3}\\)", correct: false, feedback: "Incorrect.", misconceptionId: "E-d17-b" },
        { text: "\\(\\frac{2}{3}\\)", correct: false, feedback: "Incorrect.", misconceptionId: "E-d17-c" }
      ],
    misconceptions: [
      { misconceptionId: "E-d17-a", description: "Student answers 1/4, reporting the amount used rather than the amount remaining.", rootCause: "Wrong-Quantity Reported — correctly computes the amount used (1/3×3/4=1/4) but reports it directly as the final answer, without subtracting it from the original 3/4 to find what's still full.", remediation: "Have the student underline the actual question ('what fraction is now full') and treat the used-amount calculation as only an intermediate step." },
      { misconceptionId: "E-d17-b", description: "Student answers 1/3, reusing the given fraction of water used instead of computing the remaining fraction of the tank.", rootCause: "Given-Fraction Reuse — reports the fraction of water USED relative to itself (1/3) directly, without multiplying by 3/4 to convert it into a fraction of the WHOLE tank, and without subtracting.", remediation: "Have the student draw a diagram: shade 3/4 of the tank as the starting water, then shade 1/3 of THAT shaded region as used, and see what's left unshaded." },
      { misconceptionId: "E-d17-c", description: "Student answers 2/3, likely from a miscalculation in either the multiplication or subtraction step.", rootCause: "Computation-Error — miscalculates one of the two steps, perhaps confusing the fraction relationships, landing on 2/3 instead of the correct 1/2.", remediation: "Have the student compute and write down each step separately: 1/3×3/4=1/4 (used), then 3/4-1/4=1/2 (remaining)." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the amount used", hint: "1/3 of 3/4 means 1/3 × 3/4 = 3/12 = 1/4." },
      { level: 2, description: "Identify what's being asked", hint: "The question asks what fraction is NOW FULL, not how much was used." },
      { level: 3, description: "Subtract", hint: "3/4 - 1/4 = 2/4 = 1/2." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NF.B.4.A", "CCSS.MATH.CONTENT.5.NF.B.6"]
  },
  {
    itemId: "d18", order: 18, cluster: "DIV", clusterName: CLUSTER_NAMES.DIV, tier: "C",
    skillId: "DIV-02",
    question: "How many \\(\\frac{2}{5}\\) kg bags can be filled from 4 kg of sugar?",
    options: [
        { text: "10", correct: true, feedback: "4 ÷ 2/5 = 4 × 5/2 = 10." },
        { text: "8", correct: false, feedback: "Incorrect division.", misconceptionId: "E-d18-a" },
        { text: "20", correct: false, feedback: "Too large.", misconceptionId: "E-d18-b" },
        { text: "5", correct: false, feedback: "Incorrect.", misconceptionId: "E-d18-c" }
      ],
    misconceptions: [
      { misconceptionId: "E-d18-a", description: "Student answers 8, undercounting the number of bags.", rootCause: "Reciprocal-Miscalculation — attempts the reciprocal multiplication but miscomputes 4×5/2, perhaps as 4×2 instead, landing on 8 instead of the correct 10.", remediation: "Have the student compute 4 × 5/2 explicitly as (4×5)/2 = 20/2, rather than approximating." },
      { misconceptionId: "E-d18-b", description: "Student answers 20, using the numerator alone as the multiplier without dividing by the denominator.", rootCause: "Final-Division-Dropped — correctly multiplies 4×5=20 as part of the reciprocal multiplication but forgets to divide by the denominator 2, leaving the answer twice too large.", remediation: "Have the student write out the full fraction multiplication 4 × 5/2 = 20/2 and complete the division to 10, rather than stopping at the numerator." },
      { misconceptionId: "E-d18-c", description: "Student answers 5, dividing by the numerator instead of using the full reciprocal.", rootCause: "Wrong-Reciprocal — divides 4 by the numerator 2... wait, computes something like 4÷... — uses only part of the fraction (like dividing by the denominator's related whole number) instead of correctly multiplying by the full reciprocal 5/2.", remediation: "Have the student state the reciprocal of 2/5 explicitly (5/2, not just 5 or 2) before multiplying 4 by it." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Turn the divisor into a reciprocal", hint: "Dividing by 2/5 is the same as multiplying by 5/2." },
      { level: 2, description: "Multiply", hint: "4 × 5/2 = 20/2." },
      { level: 3, description: "Simplify", hint: "20/2 = 10 bags." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NF.B.7.C"]
  },
  {
    itemId: "d19", order: 19, cluster: "EQUIV", clusterName: CLUSTER_NAMES.EQUIV, tier: "C",
    skillId: "EQUIV-02",
    question: "Complete the pattern: \\(\\frac{1}{2} = \\frac{2}{4} = \\frac{3}{6} = \\frac{?}{8}\\)",
    options: [
        { text: "4", correct: true, feedback: "Pattern: numerator = denominator ÷ 2. 8 ÷ 2 = 4." },
        { text: "3", correct: false, feedback: "Doesn't follow the pattern.", misconceptionId: "E-d19-a" },
        { text: "5", correct: false, feedback: "Doesn't follow the pattern.", misconceptionId: "E-d19-b" },
        { text: "6", correct: false, feedback: "Doesn't follow the pattern.", misconceptionId: "E-d19-c" }
      ],
    misconceptions: [
      { misconceptionId: "E-d19-a", description: "Student answers 3, continuing the numerator sequence (1,2,3) without checking against the denominator.", rootCause: "Sequence-Continuation Bias — notices the numerators go 1,2,3 in the given pattern and continues that surface sequence, without verifying that the ratio to the denominator (8) stays 1:2.", remediation: "Have the student verify each fraction in the pattern equals 1/2 by dividing: 2÷4=0.5, 3÷6=0.5, so the missing value must also give 0.5 when divided by 8." },
      { misconceptionId: "E-d19-b", description: "Student answers 5, guessing a value without checking the ratio.", rootCause: "Arbitrary-Continuation — picks a plausible-looking next number without checking it against the actual mathematical relationship (numerator = denominator ÷ 2).", remediation: "Have the student cross-multiply to check: does 5×2 equal 8×1? (10≠8, so 5 is wrong)." },
      { misconceptionId: "E-d19-c", description: "Student answers 6, copying the previous denominator instead of computing the new numerator.", rootCause: "Denominator-Copy — copies the denominator from the previous fraction in the pattern (3/6) into the new numerator slot instead of computing 8÷2.", remediation: "Have the student focus only on the CURRENT fraction (?/8) and ask '8 divided by 2 is what?' rather than looking at the previous fraction's numbers." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the pattern's rule", hint: "Each fraction equals 1/2. Check: 2÷4=0.5, 3÷6=0.5." },
      { level: 2, description: "Apply the rule to the new denominator", hint: "The numerator must be half of 8." },
      { level: 3, description: "Compute", hint: "8 ÷ 2 = 4, so the missing numerator is 4." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.NF.A.1"]
  },
  {
    itemId: "d20", order: 20, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP, tier: "T",
    skillId: "COMP-01",
    question: "Which is larger? \\(\\frac{7}{3}\\) or \\(2\\frac{1}{3}\\)?",
    options: [
        { text: "They are equal", correct: true, feedback: "7/3 = 2 1/3. They are exactly the same." },
        { text: "\\(\\frac{7}{3}\\)", correct: false, feedback: "They are equal.", misconceptionId: "E-d20-a" },
        { text: "\\(2\\frac{1}{3}\\)", correct: false, feedback: "They are equal.", misconceptionId: "E-d20-b" },
        { text: "Cannot compare", correct: false, feedback: "Convert to the same form to compare.", misconceptionId: "E-d20-c" }
      ],
    misconceptions: [
      { misconceptionId: "E-d20-a", description: "Student picks 7/3 as larger, without converting to check they represent the same value.", rootCause: "Unconverted-Form Bias — assumes the improper fraction 'looks bigger' with its larger numerator (7) without converting 2 1/3 to the same form to verify they're actually equal.", remediation: "Have the student convert 2 1/3 to an improper fraction (2×3+1=7, over 3, giving 7/3) to see it's identical to the other option — this trap item is designed to catch students who don't convert both to the same form." },
      { misconceptionId: "E-d20-b", description: "Student picks 2 1/3 as larger, without converting to check they represent the same value.", rootCause: "Unconverted-Form Bias — assumes the mixed number 'looks more precise or complete' without converting 7/3 to a mixed number to verify they're actually equal.", remediation: "Have the student convert 7/3 to a mixed number (7÷3=2 remainder 1, giving 2 1/3) to see it's identical to the other option." },
      { misconceptionId: "E-d20-c", description: "Student claims the two values cannot be compared.", rootCause: "Different-Form Doubt — believes a fraction and a mixed number can't be directly compared without realizing a simple conversion reveals they're the same value.", remediation: "Walk through the conversion explicitly in both directions: 7/3=2 1/3 and 2 1/3=7/3, showing they are the same number." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Convert to the same form", hint: "Convert 7/3 to a mixed number: 7÷3=2 remainder 1." },
      { level: 2, description: "Write the mixed number", hint: "7/3 = 2 1/3." },
      { level: 3, description: "Compare", hint: "2 1/3 is exactly the same as the other value, 2 1/3 — they are equal." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.NF.A.2"]
  }
];

const recheckItems = [
  {
    itemId: "r1", order: 1, cluster: "TYPES", clusterName: CLUSTER_NAMES.TYPES,
    skillId: "FRA-T2",
    question: "Convert \\(4\\frac{1}{3}\\) to an improper fraction.",
    options: [
        { text: "\\(\\frac{13}{3}\\)", correct: true, feedback: "4×3=12, +1=13 → 13/3." },
        { text: "\\(\\frac{12}{3}\\)", correct: false, feedback: "Only multiplied 4×3.", misconceptionId: "E-r1-a" },
        { text: "\\(\\frac{7}{3}\\)", correct: false, feedback: "Incorrect addition.", misconceptionId: "E-r1-b" },
        { text: "\\(\\frac{3}{13}\\)", correct: false, feedback: "Flipped.", misconceptionId: "E-r1-c" }
      ],
    misconceptions: [
      { misconceptionId: "E-r1-a", description: "Student answers 12/3, stopping after multiplying the whole number by the denominator.", rootCause: "Numerator-Drop — multiplies the whole number by the denominator (4×3=12) but never adds the numerator 1, leaving the conversion half-finished.", remediation: "Have the student say the three-step rule aloud — multiply, add, then place over the denominator — circling the '+1' step before computing." },
      { misconceptionId: "E-r1-b", description: "Student answers 7/3, adding the whole number and denominator together instead of multiplying.", rootCause: "Addition-Instead-of-Multiplication — adds the whole number and denominator (4+3=7) rather than multiplying them, then never adds the numerator at all.", remediation: "Contrast the two operations with a worked example, emphasizing the whole number is MULTIPLIED by the denominator, not added to it." },
      { misconceptionId: "E-r1-c", description: "Student answers 3/13, correctly finding 13 and 3 but writing the fraction upside down.", rootCause: "Reciprocal-Flip — correctly computes 13 and 3 but inverts their positions, confusing which one is the numerator.", remediation: "Remind the student the original denominator always stays the denominator; only the numerator changes during mixed-to-improper conversion." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the parts", hint: "In 4 1/3, the whole number is 4, the numerator is 1, the denominator is 3." },
      { level: 2, description: "Multiply and add", hint: "Multiply the whole number by the denominator (4×3=12), then add the numerator (12+1=13)." },
      { level: 3, description: "Place over the denominator", hint: "13 goes over the original denominator: 13/3." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.NF.B.3.C"]
  },
  {
    itemId: "r2", order: 2, cluster: "EQUIV", clusterName: CLUSTER_NAMES.EQUIV,
    skillId: "EQUIV-01",
    question: "Simplify \\(\\frac{18}{24}\\).",
    options: [
        { text: "\\(\\frac{3}{4}\\)", correct: true, feedback: "Divide by 6 → 3/4." },
        { text: "\\(\\frac{6}{8}\\)", correct: false, feedback: "Not fully simplified.", misconceptionId: "E-r2-a" },
        { text: "\\(\\frac{9}{12}\\)", correct: false, feedback: "Not fully simplified.", misconceptionId: "E-r2-b" },
        { text: "\\(\\frac{2}{3}\\)", correct: false, feedback: "Incorrect simplification.", misconceptionId: "E-r2-c" }
      ],
    misconceptions: [
      { misconceptionId: "E-r2-a", description: "Student answers 6/8, dividing by 3 instead of the full HCF of 6.", rootCause: "Partial-Simplification — divides numerator and denominator by 3 instead of by the full HCF of 6, leaving a fraction that is equivalent but not fully reduced.", remediation: "Have the student list ALL common factors of 18 and 24, then pick the largest one (6), rather than dividing by the first factor spotted." },
      { misconceptionId: "E-r2-b", description: "Student answers 9/12, dividing by 2 instead of the full HCF of 6.", rootCause: "Partial-Simplification — divides numerator and denominator by 2 instead of by the full HCF of 6, leaving a fraction that is equivalent but not fully reduced.", remediation: "After each simplification step, have the student ask 'can I divide again?' until no common factor remains." },
      { misconceptionId: "E-r2-c", description: "Student answers 2/3, swapping which number gets divided by which factor.", rootCause: "Cross-Swap Error — mentally swaps which number is treated as the numerator and which as the denominator partway through simplifying.", remediation: "Have the student label the numerator and denominator with N and D before dividing, and keep those labels through both division steps." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "List common factors", hint: "What numbers divide evenly into both 18 and 24?" },
      { level: 2, description: "Find the HCF", hint: "The highest common factor of 18 and 24 is 6." },
      { level: 3, description: "Divide both terms", hint: "18÷6=3 and 24÷6=4, so the simplest form is 3/4." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.NF.A.1"]
  },
  {
    itemId: "r3", order: 3, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    skillId: "COMP-01",
    question: "Which is smaller? \\(\\frac{6}{11}\\) or \\(\\frac{5}{11}\\)?",
    options: [
        { text: "\\(\\frac{5}{11}\\)", correct: true, feedback: "5 < 6, same denominator." },
        { text: "\\(\\frac{6}{11}\\)", correct: false, feedback: "6/11 is larger.", misconceptionId: "E-r3-a" },
        { text: "Equal", correct: false, feedback: "Numerators differ.", misconceptionId: "E-r3-b" },
        { text: "Cannot compare", correct: false, feedback: "Same denominator, easy to compare.", misconceptionId: "E-r3-c" }
      ],
    misconceptions: [
      { misconceptionId: "E-r3-a", description: "Student picks 6/11, the larger fraction.", rootCause: "Direction-Confusion — picks the fraction with the larger numerator despite the question asking for the smaller one.", remediation: "Have the student restate the question as 'which numerator loses?' before selecting an option." },
      { misconceptionId: "E-r3-b", description: "Student claims the fractions are equal.", rootCause: "Denominator-Only Focus — notices the shared denominator and concludes equality without checking the numerators.", remediation: "Ask the student to shade 6/11 and 5/11 on identical fraction bars to make the difference visible." },
      { misconceptionId: "E-r3-c", description: "Student claims the fractions cannot be compared.", rootCause: "Same-Denominator Doubt — mistakenly believes a conversion step is needed first, not realizing the denominator is already shared.", remediation: "Explicitly teach the shortcut: same denominator means only the numerators need comparing." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Check the denominators", hint: "Both fractions have denominator 11." },
      { level: 2, description: "Compare the numerators", hint: "Compare 5 and 6." },
      { level: 3, description: "Pick the smaller", hint: "Since 5 < 6, 5/11 is smaller." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.NF.A.2"]
  },
  {
    itemId: "r4", order: 4, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    skillId: "ADDSUB-01",
    question: "\\(\\frac{7}{12} - \\frac{2}{12}\\) = ? (simplest form)",
    options: [
        { text: "\\(\\frac{5}{12}\\)", correct: true, feedback: "7-2=5, denominator 12." },
        { text: "\\(\\frac{5}{24}\\)", correct: false, feedback: "Added denominators.", misconceptionId: "E-r4-a" },
        { text: "\\(\\frac{1}{2}\\)", correct: false, feedback: "Incorrect simplification.", misconceptionId: "E-r4-b" },
        { text: "\\(\\frac{5}{6}\\)", correct: false, feedback: "Incorrect.", misconceptionId: "E-r4-c" }
      ],
    misconceptions: [
      { misconceptionId: "E-r4-a", description: "Student answers 5/24, adding both denominators.", rootCause: "Denominator-Addition — adds the denominators as well as subtracting the numerators (12+12=24), not realizing the denominator stays fixed.", remediation: "Use a fraction-bar picture: twelve equal pieces stay twelve equal pieces regardless of how many are shaded." },
      { misconceptionId: "E-r4-b", description: "Student answers 1/2, incorrectly simplifying the correct difference.", rootCause: "Wrong-HCF — attempts to simplify 5/12 but uses an incorrect common factor (5 and 12 actually share no common factor besides 1), producing 1/2 which is not equal to 5/12.", remediation: "Have the student check whether 5 and 12 actually share a common factor before attempting to simplify — since they don't, 5/12 is already in simplest form." },
      { misconceptionId: "E-r4-c", description: "Student answers 5/6, halving the denominator incorrectly.", rootCause: "Denominator-Miscalculation — halves the denominator (12→6) without a valid mathematical reason, perhaps confusing this problem with a different simplification pattern.", remediation: "Have the student verify their answer by cross-multiplying with 5/12: does 5×12 equal 6×5? If not, the fraction is wrong." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Check the denominators", hint: "Both fractions already have denominator 12." },
      { level: 2, description: "Subtract the numerators", hint: "7 - 2 = 5." },
      { level: 3, description: "Check for simplification", hint: "5 and 12 share no common factor, so 5/12 is already simplest." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.NF.B.3.A"]
  },
  {
    itemId: "r5", order: 5, cluster: "MUL", clusterName: CLUSTER_NAMES.MUL,
    skillId: "MUL-01",
    question: "\\(5 \\times \\frac{2}{7}\\) = ? (improper fraction in simplest form)",
    options: [
        { text: "\\(\\frac{10}{7}\\)", correct: true, feedback: "5×2=10, denominator 7." },
        { text: "\\(\\frac{7}{10}\\)", correct: false, feedback: "Reciprocal.", misconceptionId: "E-r5-a" },
        { text: "\\(\\frac{10}{35}\\)", correct: false, feedback: "Multiplied the denominator too.", misconceptionId: "E-r5-b" },
        { text: "\\(\\frac{2}{35}\\)", correct: false, feedback: "Incorrect.", misconceptionId: "E-r5-c" }
      ],
    misconceptions: [
      { misconceptionId: "E-r5-a", description: "Student answers 7/10, the reciprocal of the correct answer.", rootCause: "Reciprocal-Flip — inverts the fraction rather than multiplying it by the whole number.", remediation: "Have the student check which number came from the original denominator (it must stay on the bottom)." },
      { misconceptionId: "E-r5-b", description: "Student answers 10/35, scaling both numerator and denominator by 5.", rootCause: "Numerator-And-Denominator Scaling — multiplies both the numerator and denominator by 5, as if finding an equivalent fraction, instead of multiplying only the numerator.", remediation: "Clarify the rule with a contrast: multiplying a fraction by a whole number scales only the numerator, not the denominator." },
      { misconceptionId: "E-r5-c", description: "Student answers 2/35, multiplying the denominator by 5 instead of the numerator.", rootCause: "Denominator-Multiplication — multiplies the denominator by 5 (7×5=35) instead of the numerator, treating the whole number as though it shrinks the pieces rather than scales the count.", remediation: "Have the student say aloud which part of the fraction represents 'how many pieces' before multiplying — only that part changes." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify what changes", hint: "When multiplying a fraction by a whole number, only the numerator is multiplied." },
      { level: 2, description: "Multiply the numerator", hint: "5 × 2 = 10, so you get 10/7." },
      { level: 3, description: "Check", hint: "10/7 is already an improper fraction in simplest form." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.NF.B.4.B"]
  },
  {
    itemId: "r6", order: 6, cluster: "DIV", clusterName: CLUSTER_NAMES.DIV,
    skillId: "DIV-01",
    question: "\\(\\frac{8}{9} \\div 4\\) = ? (simplest form)",
    options: [
        { text: "\\(\\frac{2}{9}\\)", correct: true, feedback: "8/9 × 1/4 = 8/36 = 2/9." },
        { text: "\\(\\frac{32}{9}\\)", correct: false, feedback: "Multiplied by 4 instead of dividing.", misconceptionId: "E-r6-a" },
        { text: "\\(\\frac{8}{36}\\)", correct: false, feedback: "Not simplified.", misconceptionId: "E-r6-b" },
        { text: "\\(\\frac{4}{9}\\)", correct: false, feedback: "Incorrect.", misconceptionId: "E-r6-c" }
      ],
    misconceptions: [
      { misconceptionId: "E-r6-a", description: "Student answers 32/9, multiplying the numerator by 4 instead of dividing.", rootCause: "Operation-Reversal — multiplies the numerator by 4 instead of dividing, treating the whole number as a scale-up factor.", remediation: "Have the student predict whether the answer should be bigger or smaller than the start before computing." },
      { misconceptionId: "E-r6-b", description: "Student answers 8/36, the correct unsimplified quotient.", rootCause: "Unsimplified-Quotient — correctly multiplies the denominator by 4 (9×4=36) but stops before reducing 8/36 to its simplest form, 2/9.", remediation: "Add a 'can this be simplified?' check as the last step of every division problem." },
      { misconceptionId: "E-r6-c", description: "Student answers 4/9, confusing the divisor with the numerator of the answer.", rootCause: "Divisor-As-Numerator — writes the divisor itself (4) as the new numerator over the original denominator, rather than actually dividing 8/9 by 4.", remediation: "Have the student work through the reciprocal method explicitly: 8/9 × 1/4 = (8×1)/(9×4) = 8/36." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Turn the divisor into a reciprocal", hint: "Dividing by 4 is the same as multiplying by 1/4." },
      { level: 2, description: "Multiply across", hint: "8/9 × 1/4 = (8×1)/(9×4) = 8/36." },
      { level: 3, description: "Simplify", hint: "8/36 simplifies to 2/9." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NF.B.7.A"]
  },
  {
    itemId: "r7", order: 7, cluster: "TYPES", clusterName: CLUSTER_NAMES.TYPES,
    skillId: "FRA-T1",
    question: "Which is an improper fraction? \\(\\frac{4}{7}, \\frac{9}{5}, \\frac{3}{8}, \\frac{1}{2}\\)",
    options: [
        { text: "\\(\\frac{9}{5}\\)", correct: true, feedback: "9 > 5." },
        { text: "\\(\\frac{4}{7}\\)", correct: false, feedback: "4 < 7, proper.", misconceptionId: "E-r7-a" },
        { text: "\\(\\frac{3}{8}\\)", correct: false, feedback: "3 < 8, proper.", misconceptionId: "E-r7-b" },
        { text: "\\(\\frac{1}{2}\\)", correct: false, feedback: "1 < 2, proper.", misconceptionId: "E-r7-c" }
      ],
    misconceptions: [
      { misconceptionId: "E-r7-a", description: "Student picks 4/7, a proper fraction.", rootCause: "Proper-As-Improper Misclassification — doesn't check that the numerator (4) is smaller than the denominator (7).", remediation: "Have the student circle the numerator and denominator and write '<' or '>' between them before classifying." },
      { misconceptionId: "E-r7-b", description: "Student picks 3/8, a proper fraction.", rootCause: "Proper-As-Improper Misclassification — the comparison step is skipped for this option too.", remediation: "Practice sorting a mixed set of fraction cards into 'proper' and 'improper' piles, checking each one explicitly." },
      { misconceptionId: "E-r7-c", description: "Student picks 1/2, a proper fraction.", rootCause: "Proper-As-Improper Misclassification — same comparison step is skipped.", remediation: "Anchor the definition with a visual: an improper fraction always represents one whole shaded region or more." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the definition", hint: "An improper fraction has numerator ≥ denominator." },
      { level: 2, description: "Check each option", hint: "Compare numerator and denominator in each fraction." },
      { level: 3, description: "Pick the improper one", hint: "Only 9/5 has numerator greater than denominator." }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "r8", order: 8, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    skillId: "COMP-02",
    question: "Arrange in descending order: \\(\\frac{3}{5}, \\frac{4}{7}, \\frac{2}{3}\\)",
    options: [
        { text: "\\(\\frac{2}{3}, \\frac{3}{5}, \\frac{4}{7}\\)", correct: true, feedback: "LCM 105: 70/105, 63/105, 60/105." },
        { text: "\\(\\frac{4}{7}, \\frac{3}{5}, \\frac{2}{3}\\)", correct: false, feedback: "That's ascending.", misconceptionId: "E-r8-a" },
        { text: "\\(\\frac{3}{5}, \\frac{2}{3}, \\frac{4}{7}\\)", correct: false, feedback: "Not ordered correctly.", misconceptionId: "E-r8-b" },
        { text: "\\(\\frac{2}{3}, \\frac{4}{7}, \\frac{3}{5}\\)", correct: false, feedback: "Not ordered correctly.", misconceptionId: "E-r8-c" }
      ],
    misconceptions: [
      { misconceptionId: "E-r8-a", description: "Student orders the fractions from smallest to largest.", rootCause: "Direction-Reversal — correctly converts and compares the three fractions but arranges smallest-to-largest instead of largest-to-smallest, reversing what 'descending' means.", remediation: "Have the student picture a staircase going down and label the top step 'largest' before ordering." },
      { misconceptionId: "E-r8-b", description: "Student places 2/3 before 4/7, mis-ordering the last two values.", rootCause: "Partial-Ordering — correctly identifies 2/3 as largest but swaps the order of 3/5 (63/105) and 4/7 (60/105), not comparing the converted numerators carefully.", remediation: "Have the student compare every adjacent pair of converted numerators (70, 63, 60) explicitly before finalizing the order." },
      { misconceptionId: "E-r8-c", description: "Student places 4/7 before 3/5, mis-ordering the last two values in a different way.", rootCause: "Numerator-Miscompare — after converting to a common denominator, misreads which converted numerator (63 vs 60) is larger, placing 4/7 ahead of 3/5.", remediation: "Have the student write the converted numerators (70, 63, 60) in a row and order those three numbers explicitly before restating the fractions." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the LCM", hint: "The LCM of 5, 7, and 3 is 105." },
      { level: 2, description: "Convert each fraction", hint: "3/5=63/105, 4/7=60/105, 2/3=70/105." },
      { level: 3, description: "Order the numerators", hint: "70 > 63 > 60, so the descending order is 2/3, 3/5, 4/7." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.NF.A.2"]
  },
  {
    itemId: "r9", order: 9, cluster: "MUL", clusterName: CLUSTER_NAMES.MUL,
    skillId: "MUL-04",
    question: "\\(3 \\times \\frac{2}{9} + \\frac{1}{9}\\) = ? (simplest form)",
    options: [
        { text: "\\(\\frac{7}{9}\\)", correct: true, feedback: "6/9 + 1/9 = 7/9." },
        { text: "\\(\\frac{6}{9}\\)", correct: false, feedback: "Forgot to add 1/9.", misconceptionId: "E-r9-a" },
        { text: "\\(\\frac{7}{18}\\)", correct: false, feedback: "Added denominators.", misconceptionId: "E-r9-b" },
        { text: "\\(\\frac{1}{3}\\)", correct: false, feedback: "Incorrect.", misconceptionId: "E-r9-c" }
      ],
    misconceptions: [
      { misconceptionId: "E-r9-a", description: "Student answers 6/9, stopping after the multiplication step and never adding 1/9.", rootCause: "Second-Step-Drop — correctly computes 3×2/9=6/9 but stops there, forgetting the problem also asks to add 1/9 to that result.", remediation: "Have the student underline every instruction word ('+1/9') and check it's addressed before finalizing an answer." },
      { misconceptionId: "E-r9-b", description: "Student answers 7/18, adding denominators during the final addition step.", rootCause: "Denominator-Addition — correctly computes the multiplication (6/9) but then adds denominators as well as numerators when adding 1/9 (9+9=18), not realizing the denominator stays fixed.", remediation: "Remind the student that once denominators already match, addition only ever touches the numerators." },
      { misconceptionId: "E-r9-c", description: "Student answers 1/3, over-simplifying the correct sum.", rootCause: "Over-Reduction — after correctly reaching 7/9, incorrectly attempts to simplify it further (7 and 9 share no common factor), landing on an unrelated fraction 1/3.", remediation: "Have the student check whether 7 and 9 actually share a common factor before attempting to simplify — since they don't, 7/9 is already in simplest form." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Do the multiplication first", hint: "3 × 2/9 means multiply the numerator: 3×2=6, giving 6/9." },
      { level: 2, description: "Set up the addition", hint: "Now add 1/9 to 6/9 — the denominators already match." },
      { level: 3, description: "Add", hint: "6/9 + 1/9 = 7/9." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NF.B.6"]
  },
  {
    itemId: "r10", order: 10, cluster: "DIV", clusterName: CLUSTER_NAMES.DIV,
    skillId: "DIV-04",
    question: "\\(\\frac{7}{10} \\div 7 + \\frac{1}{5}\\) = ? (simplest form)",
    options: [
        { text: "\\(\\frac{3}{10}\\)", correct: true, feedback: "7/10÷7=1/10. + 2/10 = 3/10." },
        { text: "\\(\\frac{1}{10}\\)", correct: false, feedback: "Only the division result.", misconceptionId: "E-r10-a" },
        { text: "\\(\\frac{2}{10}\\)", correct: false, feedback: "Only the second fraction.", misconceptionId: "E-r10-b" },
        { text: "\\(\\frac{7}{10}\\)", correct: false, feedback: "No operation.", misconceptionId: "E-r10-c" }
      ],
    misconceptions: [
      { misconceptionId: "E-r10-a", description: "Student answers 1/10, stopping after the division step and never adding 1/5.", rootCause: "Second-Step-Drop — correctly computes 7/10÷7=1/10 but stops there, forgetting the problem also asks to add 1/5 to that result.", remediation: "Have the student underline every instruction word ('+1/5') and check it's addressed before finalizing an answer." },
      { misconceptionId: "E-r10-b", description: "Student answers 2/10, skipping the division step entirely.", rootCause: "First-Step-Drop — ignores the division of 7/10 by 7 and simply reports the converted second fraction (1/5=2/10), skipping the first operation entirely.", remediation: "Have the student work through the problem in the order written, computing the division result FIRST and writing it down before starting the addition." },
      { misconceptionId: "E-r10-c", description: "Student answers 7/10, reporting the original fraction with no operations performed.", rootCause: "No-Operation — writes down the original fraction unchanged, as though neither the division nor the addition took place.", remediation: "Have the student point to each operation in turn ('÷7', then '+1/5') and explain what each does before writing a final answer." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Do the division first", hint: "7/10 ÷ 7 = 1/10." },
      { level: 2, description: "Convert the second fraction", hint: "1/5 = 2/10 (multiply numerator and denominator by 2)." },
      { level: 3, description: "Add", hint: "1/10 + 2/10 = 3/10." }
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
    title: "Fractions — Speed & Strategy",
    subtitle: "Telangana & Cambridge · Level 4 · Speed & Strategy",
    description: "A 25-minute timed diagnostic mixing Speed, Core, Challenge and Trap items across every fractions cluster.",
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

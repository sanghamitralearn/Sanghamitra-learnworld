// seed/mathSeedCh4FractionsL3.js
//
// Populates math_chapters and math_questions with Grade 5, Chapter 4
// (Fractions), Level 3 — converted from the standalone HTML file
// ch-4-fractions-level-3.html.
//
// Run with: node seed/mathSeedCh4FractionsL3.js

const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-5";
const GRADE_LABEL = "Grade 5";
const CHAPTER_SLUG = "ch-4-fractions";
const CHAPTER_NAME = "Fractions";
const LEVEL = 3;

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
    skillId: "ADDSUB-04",
    question: "A number is added to \\(2\\frac{1}{4}\\) to get \\(3\\frac{1}{2}\\). Find the number.",
    options: [
        { text: "\\(1\\frac{1}{4}\\)", correct: true, feedback: "3 1/2 - 2 1/4 = 7/2 - 9/4 = 14/4 - 9/4 = 5/4 = 1 1/4." },
        { text: "\\(5\\frac{3}{4}\\)", correct: false, feedback: "You added the numbers instead of subtracting.", misconceptionId: "E-w1-a" },
        { text: "\\(1\\frac{1}{2}\\)", correct: false, feedback: "Incorrect subtraction; check the conversion.", misconceptionId: "E-w1-b" },
        { text: "\\(\\frac{3}{4}\\)", correct: false, feedback: "You forgot the whole number part.", misconceptionId: "E-w1-c" }
      ],
    retryHint: "To find the missing addend, subtract the known number from the total. Convert to improper fractions first.",
    misconceptions: [
      { misconceptionId: "E-w1-a", description: "Student answers 5 3/4, adding the two mixed numbers instead of subtracting.", rootCause: "Operation-Reversal — adds 2 1/4 and 3 1/2 together instead of subtracting to find the missing addend, misreading what 'a number is added to' is asking for.", remediation: "Have the student restate the problem as an equation, □ + 2 1/4 = 3 1/2, then solve for □ by subtracting 2 1/4 from both sides." },
      { misconceptionId: "E-w1-b", description: "Student answers 1 1/2, miscomputing the subtraction after converting.", rootCause: "Common-Denominator Error — converts both mixed numbers to fourths (14/4 and 9/4) but miscomputes the subtraction, perhaps confusing the numerators, landing on 1 1/2 instead of 1 1/4.", remediation: "Have the student subtract the converted numerators explicitly: 14-9=5, giving 5/4, before converting back to a mixed number." },
      { misconceptionId: "E-w1-c", description: "Student answers 3/4, dropping the whole-number part of the answer.", rootCause: "Whole-Number-Drop — correctly computes the fractional remainder (1/4) but forgets to include the whole-number part of the difference, reporting only 3/4 or a fraction missing the '1'.", remediation: "Have the student double-check their answer by adding it back to 2 1/4 and confirming the result equals exactly 3 1/2." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Set up the equation", hint: "The missing number plus 2 1/4 equals 3 1/2, so subtract 2 1/4 from 3 1/2." },
      { level: 2, description: "Convert to a common denominator", hint: "3 1/2 = 7/2 = 14/4; 2 1/4 = 9/4." },
      { level: 3, description: "Subtract", hint: "14/4 - 9/4 = 5/4 = 1 1/4." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "ADDSUB-03", probability: 0.4, condition: "If finding a missing addend with mixed numbers is unreliable, general mixed-number subtraction will be harder." }
    ],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NF.A.1"]
  },
  {
    itemId: "w2", order: 2, cluster: "EQUIV", clusterName: CLUSTER_NAMES.EQUIV,
    skillId: "EQUIV-01",
    question: "Simplify \\(\\frac{36}{48}\\) and then find the sum of the numerator and denominator of the simplified fraction.",
    options: [
        { text: "7", correct: true, feedback: "36/48 = 3/4 (÷12). 3 + 4 = 7." },
        { text: "12", correct: false, feedback: "You multiplied 3×4 instead of adding.", misconceptionId: "E-w2-a" },
        { text: "84", correct: false, feedback: "You added the original numerator and denominator.", misconceptionId: "E-w2-b" },
        { text: "5", correct: false, feedback: "Incorrect simplification.", misconceptionId: "E-w2-c" }
      ],
    retryHint: "Divide numerator and denominator by their HCF (12). Then add the resulting numerator and denominator.",
    misconceptions: [
      { misconceptionId: "E-w2-a", description: "Student answers 12, multiplying the simplified numerator and denominator instead of adding them.", rootCause: "Multiplication-Instead-of-Addition — correctly simplifies to 3/4 but then multiplies 3×4=12 instead of following the instruction to add them.", remediation: "Have the student underline the word 'sum' in the question and restate what operation it requires before computing." },
      { misconceptionId: "E-w2-b", description: "Student answers 84, adding the original unsimplified numerator and denominator.", rootCause: "Simplification-Skipped — skips the simplification step entirely and adds the original numerator and denominator (36+48=84) instead of the simplified ones.", remediation: "Have the student complete and write down the simplified fraction (3/4) as a required first step before doing any addition." },
      { misconceptionId: "E-w2-c", description: "Student answers 5, using an incorrectly simplified fraction.", rootCause: "Partial-Simplification — divides by a factor smaller than the full HCF of 12 (e.g., by 6, getting 6/8, then further miscombines), arriving at an incorrectly simplified fraction whose parts sum to 5.", remediation: "Have the student list ALL common factors of 36 and 48, then pick the largest one (12), rather than dividing by a smaller factor found first." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the HCF", hint: "The highest common factor of 36 and 48 is 12." },
      { level: 2, description: "Simplify", hint: "36÷12=3 and 48÷12=4, so 36/48 = 3/4." },
      { level: 3, description: "Add", hint: "3 + 4 = 7." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.NF.A.1"]
  },
  {
    itemId: "w3", order: 3, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    skillId: "COMP-02",
    question: "Which is larger? \\(\\frac{5}{6}\\) or \\(\\frac{13}{15}\\)? Use a common denominator.",
    options: [
        { text: "\\(\\frac{13}{15}\\)", correct: true, feedback: "LCM 30: 5/6=25/30, 13/15=26/30. 13/15 is larger." },
        { text: "\\(\\frac{5}{6}\\)", correct: false, feedback: "5/6 = 25/30, smaller than 26/30.", misconceptionId: "E-w3-a" },
        { text: "They are equal", correct: false, feedback: "Different numerators after converting.", misconceptionId: "E-w3-b" },
        { text: "Cannot compare", correct: false, feedback: "They can be compared using LCM.", misconceptionId: "E-w3-c" }
      ],
    retryHint: "Find LCM of 6 and 15 (30). Convert both fractions to thirtieths and compare numerators.",
    misconceptions: [
      { misconceptionId: "E-w3-a", description: "Student picks 5/6, without converting to the common denominator.", rootCause: "Unconverted Comparison — compares the fractions by their original numerators or denominators rather than converting to thirtieths first, misjudging that 5/6 is larger.", remediation: "Insist on writing both fractions in thirtieths (25/30 and 26/30) BEFORE attempting to compare them." },
      { misconceptionId: "E-w3-b", description: "Student claims the fractions are equal.", rootCause: "Surface-Similarity Assumption — assumes fractions that look close in value must be equal, without converting to a common denominator to check.", remediation: "Have the student convert both fractions to thirtieths and directly compare the numerators 25 and 26." },
      { misconceptionId: "E-w3-c", description: "Student claims the fractions cannot be compared.", rootCause: "Common-Denominator Doubt — believes an LCM of 6 and 15 is hard to find or that these particular fractions can't be compared, not realizing the conversion is straightforward.", remediation: "Walk through the LCM computation explicitly (6=2×3, 15=3×5, LCM=30) and the resulting conversion." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the LCM", hint: "The LCM of 6 and 15 is 30." },
      { level: 2, description: "Convert both fractions", hint: "5/6 = 25/30 and 13/15 = 26/30." },
      { level: 3, description: "Compare", hint: "26 > 25, so 13/15 is larger." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.NF.A.2"]
  },
  {
    itemId: "w4", order: 4, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    skillId: "ADDSUB-03",
    question: "\\(3\\frac{1}{4} - 1\\frac{2}{3} + \\frac{1}{2}\\) = ? (mixed number)",
    options: [
        { text: "\\(2\\frac{1}{12}\\)", correct: true, feedback: "13/4 - 5/3 + 1/2 = 39/12 - 20/12 + 6/12 = 25/12 = 2 1/12." },
        { text: "\\(2\\frac{1}{3}\\)", correct: false, feedback: "Check the common denominator and subtraction.", misconceptionId: "E-w4-a" },
        { text: "\\(1\\frac{11}{12}\\)", correct: false, feedback: "Incorrect sum.", misconceptionId: "E-w4-b" },
        { text: "\\(2\\frac{5}{12}\\)", correct: false, feedback: "Off by a fraction.", misconceptionId: "E-w4-c" }
      ],
    retryHint: "Convert all to improper fractions, use common denominator 12, then add/subtract, and convert back.",
    misconceptions: [
      { misconceptionId: "E-w4-a", description: "Student answers 2 1/3, using an incorrect or inconsistent common denominator.", rootCause: "Wrong-Common-Denominator — doesn't convert all three terms to the correct common denominator of 12, instead mixing denominators partway through and landing on a fractional part of 1/3.", remediation: "Have the student find the LCM of 4, 3, and 2 explicitly (it's 12) and convert ALL THREE terms to twelfths before combining them." },
      { misconceptionId: "E-w4-b", description: "Student answers 1 11/12, undercounting the final sum by exactly 2/12.", rootCause: "Numerator-Miscount — after correctly converting to twelfths (39/12, 20/12, 6/12), miscombines the numerators (39-20+6) as 23 instead of 25, off by 2.", remediation: "Have the student compute the running total step by step: 39-20=19, then 19+6=25, checking each intermediate step." },
      { misconceptionId: "E-w4-c", description: "Student answers 2 5/12, overcounting the final sum by exactly 4/12.", rootCause: "Numerator-Miscount — after correctly converting to twelfths, miscombines the numerators as 29 instead of 25, off by 4.", remediation: "Have the student recompute the running total 39-20+6 carefully, perhaps breaking it into two separate steps and verifying each." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Convert everything to improper fractions", hint: "3 1/4 = 13/4, 1 2/3 = 5/3." },
      { level: 2, description: "Find a common denominator", hint: "The LCM of 4, 3, and 2 is 12: 13/4=39/12, 5/3=20/12, 1/2=6/12." },
      { level: 3, description: "Combine and convert back", hint: "39/12 - 20/12 + 6/12 = 25/12 = 2 1/12." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NF.A.1"]
  },
  {
    itemId: "w5", order: 5, cluster: "MUL", clusterName: CLUSTER_NAMES.MUL,
    skillId: "MUL-03",
    question: "\\(\\frac{3}{4}\\) of a cake is left. You eat \\(\\frac{1}{2}\\) of what's left. How much of the whole cake do you eat?",
    options: [
        { text: "\\(\\frac{3}{8}\\)", correct: true, feedback: "1/2 of 3/4 = 3/8." },
        { text: "\\(\\frac{3}{4}\\)", correct: false, feedback: "That's the amount left before eating.", misconceptionId: "E-w5-a" },
        { text: "\\(\\frac{1}{2}\\)", correct: false, feedback: "That's the fraction of the leftover, not of the whole.", misconceptionId: "E-w5-b" },
        { text: "\\(\\frac{3}{2}\\)", correct: false, feedback: "Impossible — you can't eat more than the cake.", misconceptionId: "E-w5-c" }
      ],
    retryHint: "First find the fraction of the whole that is left (3/4), then take half of that.",
    misconceptions: [
      { misconceptionId: "E-w5-a", description: "Student answers 3/4, reporting the amount left rather than the amount eaten.", rootCause: "Wrong-Quantity Reported — reports the fraction of cake that was LEFT (3/4) instead of computing and reporting the fraction actually EATEN.", remediation: "Have the student underline the actual question ('how much do you eat') and treat 3/4 as only the starting amount, not the final answer." },
      { misconceptionId: "E-w5-b", description: "Student answers 1/2, reporting the fraction of the leftover eaten rather than the fraction of the whole cake.", rootCause: "Fraction-Of-A-Fraction Confusion — reports 1/2 (the fraction of the LEFTOVER portion eaten) directly, without multiplying it by 3/4 to find what fraction of the WHOLE cake that represents.", remediation: "Have the student draw a cake, shade 3/4 as what's left, then shade half of THAT shaded region to see the eaten portion is smaller than 1/2 of the whole cake." },
      { misconceptionId: "E-w5-c", description: "Student answers 3/2, an impossible value greater than one whole cake.", rootCause: "Operation-Reversal-Or-Miscalculation — divides instead of multiplies (or otherwise miscalculates), producing a fraction greater than 1, which is impossible since you can't eat more than the whole cake.", remediation: "Teach a sanity check: 'fraction of a fraction' problems always produce an answer smaller than both fractions involved — flag any answer greater than 1 as a red flag." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify what's being asked", hint: "You're eating 1/2 of the 3/4 that's left, and want to know how much of the WHOLE cake that is." },
      { level: 2, description: "Set up the multiplication", hint: "'1/2 of 3/4' means 1/2 × 3/4." },
      { level: 3, description: "Multiply", hint: "1/2 × 3/4 = 3/8." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NF.B.4.A", "CCSS.MATH.CONTENT.5.NF.B.6"]
  },
  {
    itemId: "w6", order: 6, cluster: "DIV", clusterName: CLUSTER_NAMES.DIV,
    skillId: "DIV-02",
    question: "A ribbon \\(\\frac{5}{6}\\) m long is divided into pieces of \\(\\frac{1}{12}\\) m each. How many pieces?",
    options: [
        { text: "10", correct: true, feedback: "5/6 ÷ 1/12 = 5/6 × 12 = 60/6 = 10." },
        { text: "5", correct: false, feedback: "You might have multiplied incorrectly.", misconceptionId: "E-w6-a" },
        { text: "12", correct: false, feedback: "That's the denominator of the piece length.", misconceptionId: "E-w6-b" },
        { text: "60", correct: false, feedback: "You multiplied 5×12 but forgot to divide by 6.", misconceptionId: "E-w6-c" }
      ],
    retryHint: "Divide total length by piece length: multiply by the reciprocal of 1/12.",
    misconceptions: [
      { misconceptionId: "E-w6-a", description: "Student answers 5, likely from an incomplete or miscalculated multiplication.", rootCause: "Incomplete-Reciprocal-Multiplication — starts the correct method (multiply by the reciprocal 12) but stops or errs partway, perhaps using only the numerator 5 without completing the division by 6.", remediation: "Have the student work through the full computation as one expression: 5/6 × 12/1 = 60/6, rather than stopping partway." },
      { misconceptionId: "E-w6-b", description: "Student answers 12, the denominator of the piece length rather than the number of pieces.", rootCause: "Denominator-As-Answer — reports the denominator of the piece-length fraction (12) directly, confusing 'twelfths' as a unit with the actual count of pieces that fit.", remediation: "Have the student restate the problem as a division: 'how many groups of 1/12 fit into 5/6?' rather than reading off a number from the fraction." },
      { misconceptionId: "E-w6-c", description: "Student answers 60, the correct numerator of the intermediate product but never divided by 6.", rootCause: "Final-Division-Dropped — correctly computes 5×12=60 as part of the reciprocal multiplication but forgets the final step of dividing by the denominator 6, leaving the answer 6 times too large.", remediation: "Have the student write out the full fraction multiplication 5/6 × 12/1 = 60/6 and complete the division to 10, rather than stopping at the numerator." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Turn the divisor into a reciprocal", hint: "Dividing by 1/12 is the same as multiplying by 12." },
      { level: 2, description: "Multiply", hint: "5/6 × 12 = 60/6." },
      { level: 3, description: "Simplify", hint: "60/6 = 10 pieces." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NF.B.7.C"]
  },
  {
    itemId: "w7", order: 7, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    skillId: "MUL-03",
    question: "\\(\\frac{2}{3} \\times \\frac{3}{4}\\) is how much less than \\(\\frac{3}{4}\\)?",
    options: [
        { text: "\\(\\frac{1}{4}\\)", correct: true, feedback: "2/3 × 3/4 = 1/2. 3/4 - 1/2 = 1/4." },
        { text: "\\(\\frac{1}{2}\\)", correct: false, feedback: "That's the product, not the difference.", misconceptionId: "E-w7-a" },
        { text: "\\(\\frac{3}{4}\\)", correct: false, feedback: "That's the original fraction.", misconceptionId: "E-w7-b" },
        { text: "\\(\\frac{1}{6}\\)", correct: false, feedback: "Incorrect subtraction.", misconceptionId: "E-w7-c" }
      ],
    retryHint: "First compute the product. Then subtract it from 3/4.",
    misconceptions: [
      { misconceptionId: "E-w7-a", description: "Student answers 1/2, reporting the product rather than the difference.", rootCause: "Second-Step-Drop — correctly computes 2/3×3/4=1/2 but stops there, forgetting the question asks how much LESS this is than 3/4, not just the product itself.", remediation: "Have the student underline the actual question ('how much less') and treat the multiplication as only an intermediate step." },
      { misconceptionId: "E-w7-b", description: "Student answers 3/4, reporting the original fraction rather than performing any computation.", rootCause: "No-Operation — writes down 3/4 unchanged, as though neither the multiplication nor the subtraction took place.", remediation: "Have the student restate the two-step process aloud: 'first multiply, then subtract from 3/4' before writing an answer." },
      { misconceptionId: "E-w7-c", description: "Student answers 1/6, miscomputing the final subtraction.", rootCause: "Subtraction-Miscalculation — correctly computes the product 1/2 but miscomputes 3/4-1/2, perhaps using a wrong common denominator, landing on 1/6 instead of 1/4.", remediation: "Have the student convert both 3/4 and 1/2 to fourths (3/4 and 2/4) before subtracting, to avoid a denominator mismatch." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Compute the product first", hint: "2/3 × 3/4 = 6/12 = 1/2." },
      { level: 2, description: "Set up the subtraction", hint: "Now find how much less 1/2 is than 3/4: 3/4 - 1/2." },
      { level: 3, description: "Subtract", hint: "3/4 - 2/4 = 1/4." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NF.B.4.A"]
  },
  {
    itemId: "w8", order: 8, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    skillId: "MUL-04",
    question: "\\( \\frac{1}{2} + \\frac{1}{3} \\times \\frac{3}{4} \\) = ? (Remember BODMAS)",
    options: [
        { text: "\\(\\frac{3}{4}\\)", correct: true, feedback: "1/3 × 3/4 = 1/4. 1/2 + 1/4 = 3/4." },
        { text: "\\(\\frac{5}{8}\\)", correct: false, feedback: "You added first: (1/2+1/3)=5/6, then × 3/4 = 5/8. Incorrect order.", misconceptionId: "E-w8-a" },
        { text: "\\(\\frac{7}{12}\\)", correct: false, feedback: "Incorrect calculation.", misconceptionId: "E-w8-b" },
        { text: "\\(\\frac{2}{3}\\)", correct: false, feedback: "Off.", misconceptionId: "E-w8-c" }
      ],
    retryHint: "Multiplication before addition. Compute 1/3 × 3/4 first, then add 1/2.",
    misconceptions: [
      { misconceptionId: "E-w8-a", description: "Student answers 5/8, performing the addition before the multiplication.", rootCause: "Order-Of-Operations Violation — adds 1/2 and 1/3 first (getting 5/6) and THEN multiplies by 3/4, ignoring the BODMAS rule that multiplication happens before addition.", remediation: "Have the student circle the multiplication part of the expression first and compute it in isolation before touching the addition." },
      { misconceptionId: "E-w8-b", description: "Student answers 7/12, miscomputing the multiplication step despite doing operations in the right order.", rootCause: "Multiplication-Miscalculation — correctly multiplies before adding but miscomputes 1/3×3/4 (perhaps as 3/12 without simplifying, then mis-adds), landing on 7/12 instead of 3/4.", remediation: "Have the student compute 1/3×3/4 as a standalone step first: (1×3)/(3×4)=3/12=1/4, verifying the simplification before adding." },
      { misconceptionId: "E-w8-c", description: "Student answers 2/3, likely from dropping or mishandling one of the two terms.", rootCause: "Term-Drop-Or-Miscalculation — either drops one of the fractions or miscomputes the final addition after an otherwise reasonable multiplication step, landing on 2/3.", remediation: "Have the student write both terms of the addition explicitly (1/2 and the multiplication result) before combining them, so neither is lost." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the order of operations", hint: "BODMAS says multiplication comes before addition." },
      { level: 2, description: "Multiply first", hint: "1/3 × 3/4 = 3/12 = 1/4." },
      { level: 3, description: "Then add", hint: "1/2 + 1/4 = 2/4 + 1/4 = 3/4." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NF.B.4.A"]
  }
];

const diagnosticItems = [
  {
    itemId: "d1", order: 1, cluster: "TYPES", clusterName: CLUSTER_NAMES.TYPES,
    skillId: "FRA-T3",
    question: "A mixed number is multiplied by 2, then \\(\\frac{3}{4}\\) is added. The result is \\(4\\frac{1}{4}\\). Find the original mixed number.",
    options: [
        { text: "\\(1\\frac{3}{4}\\)", correct: true, feedback: "Work backwards: 4 1/4 - 3/4 = 3 1/2. Then ÷2 = 7/2 ÷ 2 = 7/4 = 1 3/4." },
        { text: "\\(2\\frac{1}{4}\\)", correct: false, feedback: "You didn't subtract 3/4 first.", misconceptionId: "E-d1-a" },
        { text: "\\(3\\frac{1}{2}\\)", correct: false, feedback: "You stopped after subtracting 3/4.", misconceptionId: "E-d1-b" },
        { text: "\\(1\\frac{1}{2}\\)", correct: false, feedback: "Incorrect division by 2.", misconceptionId: "E-d1-c" }
      ],
    backward: "Work backwards: undo addition (subtract), then undo multiplication (divide).",
    forward: "Reverse operations build algebraic thinking.",
    misconceptions: [
      { misconceptionId: "E-d1-a", description: "Student answers 2 1/4, dividing 4 1/4 by 2 directly without first undoing the addition.", rootCause: "Undo-Order-Reversed — divides the final result (4 1/4) by 2 first, without first subtracting the 3/4 that was added last, applying the reverse operations in the wrong order.", remediation: "Have the student list the forward operations in order (×2, then +3/4), then explicitly reverse that list (first -3/4, then ÷2) before computing." },
      { misconceptionId: "E-d1-b", description: "Student answers 3 1/2, correctly undoing the addition but stopping before undoing the multiplication.", rootCause: "Second-Step-Drop — correctly computes 4 1/4-3/4=3 1/2 (undoing the addition) but stops there, forgetting to also undo the multiplication by dividing by 2.", remediation: "Have the student count how many forward operations were applied (two: ×2 and +3/4) and confirm they've undone the same number of operations before finalizing an answer." },
      { misconceptionId: "E-d1-c", description: "Student answers 1 1/2, miscomputing the division step.", rootCause: "Division-Miscalculation — correctly reaches 3 1/2 after undoing the addition, but miscomputes 3 1/2÷2, perhaps by halving only the whole-number part (3÷2≈1) and not the fractional part correctly.", remediation: "Have the student convert 3 1/2 to an improper fraction (7/2) before dividing by 2, so the whole number and fraction aren't handled separately by mistake." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the forward operations", hint: "The number was multiplied by 2, then 3/4 was added, to get 4 1/4." },
      { level: 2, description: "Undo the addition first", hint: "Subtract 3/4 from 4 1/4: 4 1/4 - 3/4 = 3 1/2." },
      { level: 3, description: "Undo the multiplication", hint: "Divide 3 1/2 by 2: 7/2 ÷ 2 = 7/4 = 1 3/4." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "ADDSUB-04", probability: 0.4, condition: "If reverse-operation word problems aren't solid, algebraic missing-value problems in later grades will be harder." }
    ],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NF.A.2"]
  },
  {
    itemId: "d2", order: 2, cluster: "EQUIV", clusterName: CLUSTER_NAMES.EQUIV,
    skillId: "EQUIV-02",
    question: "A fraction is equivalent to \\(\\frac{5}{8}\\). The sum of its numerator and denominator is 39. Find the fraction.",
    options: [
        { text: "\\(\\frac{15}{24}\\)", correct: true, feedback: "Let fraction = 5k/8k. Sum = 13k = 39 → k=3 → 15/24." },
        { text: "\\(\\frac{20}{19}\\)", correct: false, feedback: "Sum is 39, but numerator and denominator don't match 5:8 ratio.", misconceptionId: "E-d2-a" },
        { text: "\\(\\frac{10}{29}\\)", correct: false, feedback: "Sum 39, but not equivalent to 5/8.", misconceptionId: "E-d2-b" },
        { text: "\\(\\frac{25}{14}\\)", correct: false, feedback: "No.", misconceptionId: "E-d2-c" }
      ],
    backward: "If a fraction is equivalent to 5/8, it can be written as 5k/8k. Use the sum to find k.",
    forward: "This type of problem leads to solving equations with proportions.",
    misconceptions: [
      { misconceptionId: "E-d2-a", description: "Student picks 20/19, a fraction that sums to 39 but doesn't preserve the 5:8 ratio.", rootCause: "Sum-Only Focus — finds a numerator and denominator that add to 39 without checking that their ratio actually matches 5:8, satisfying only half the problem's constraints.", remediation: "Have the student verify BOTH conditions explicitly: does the fraction reduce to 5/8, AND does numerator+denominator equal 39?" },
      { misconceptionId: "E-d2-b", description: "Student picks 10/29, a fraction that sums to 39 but doesn't preserve the 5:8 ratio.", rootCause: "Sum-Only Focus — same issue: satisfies the sum constraint (10+29=39) without checking the ratio matches 5:8.", remediation: "Have the student set up the algebraic form 5k/8k explicitly, so both the ratio and the sum are guaranteed to match simultaneously." },
      { misconceptionId: "E-d2-c", description: "Student picks 25/14, a fraction that sums to 39 but doesn't preserve the 5:8 ratio.", rootCause: "Sum-Only Focus — same issue: satisfies the sum constraint (25+14=39) without checking the ratio matches 5:8.", remediation: "Have the student solve for k algebraically (5k+8k=39, so 13k=39, k=3) rather than guessing numerator/denominator pairs that merely sum to 39." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Set up the algebraic form", hint: "A fraction equivalent to 5/8 can be written as 5k/8k for some whole number k." },
      { level: 2, description: "Use the sum condition", hint: "5k + 8k = 39, so 13k = 39." },
      { level: 3, description: "Solve for k and the fraction", hint: "k = 3, so the fraction is 5×3/8×3 = 15/24." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.NF.A.1"]
  },
  {
    itemId: "d3", order: 3, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    skillId: "COMP-02",
    question: "Arrange in ascending order: \\(2\\frac{1}{3}, \\frac{5}{2}, \\frac{9}{4}, 1\\frac{5}{6}\\).",
    options: [
        { text: "\\(1\\frac{5}{6}, \\frac{9}{4}, 2\\frac{1}{3}, \\frac{5}{2}\\)", correct: true, feedback: "Convert: 1 5/6≈1.833, 9/4=2.25, 2 1/3≈2.333, 5/2=2.5. Ascending: 1 5/6, 9/4, 2 1/3, 5/2." },
        { text: "\\(\\frac{5}{2}, 2\\frac{1}{3}, \\frac{9}{4}, 1\\frac{5}{6}\\)", correct: false, feedback: "Descending order.", misconceptionId: "E-d3-a" },
        { text: "\\(2\\frac{1}{3}, \\frac{5}{2}, \\frac{9}{4}, 1\\frac{5}{6}\\)", correct: false, feedback: "Mixed order.", misconceptionId: "E-d3-b" },
        { text: "\\(1\\frac{5}{6}, 2\\frac{1}{3}, \\frac{9}{4}, \\frac{5}{2}\\)", correct: false, feedback: "9/4=2.25 < 2 1/3=2.333.", misconceptionId: "E-d3-c" }
      ],
    backward: "Convert all to improper fractions or decimals for easy comparison.",
    forward: "Ordering mixed numbers and fractions is essential in data analysis.",
    misconceptions: [
      { misconceptionId: "E-d3-a", description: "Student orders the values from largest to smallest.", rootCause: "Direction-Reversal — correctly converts and compares the four values but arranges largest-to-smallest instead of smallest-to-largest, reversing what 'ascending' means.", remediation: "Have the student picture a staircase going up and label the bottom step 'smallest' before ordering." },
      { misconceptionId: "E-d3-b", description: "Student leaves the values in a scrambled, only partially-corrected order.", rootCause: "Partial-Conversion — converts some but not all four values to a comparable form, leading to an order that mixes correctly-placed and incorrectly-placed terms.", remediation: "Have the student convert all four values to a common form (like decimals or twelfths) in a single table before ordering any of them." },
      { misconceptionId: "E-d3-c", description: "Student places 2 1/3 before 9/4, swapping their correct order.", rootCause: "Numerator-Miscompare — after converting, compares 9/4 (2.25) and 2 1/3 (≈2.333) but misjudges which is larger, perhaps because 9/4 has a bigger-looking numerator than 2 1/3's fractional part.", remediation: "Have the student convert both to a shared denominator (twelfths: 9/4=27/12, 2 1/3=28/12) and compare those numerators directly: 27 < 28." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Convert to a common form", hint: "Convert all four values to twelfths, or to decimals, for easy comparison." },
      { level: 2, description: "Compute the values", hint: "1 5/6≈1.83, 9/4=2.25, 2 1/3≈2.33, 5/2=2.5." },
      { level: 3, description: "Order them", hint: "1.83 < 2.25 < 2.33 < 2.5, so the order is 1 5/6, 9/4, 2 1/3, 5/2." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.NF.A.2"]
  },
  {
    itemId: "d4", order: 4, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    skillId: "ADDSUB-04",
    question: "\\(\\frac{3}{5} + ? = 1\\frac{1}{10}\\). Find the missing fraction.",
    options: [
        { text: "\\(\\frac{1}{2}\\)", correct: true, feedback: "1 1/10 = 11/10, 3/5 = 6/10. ? = 11/10 - 6/10 = 5/10 = 1/2." },
        { text: "\\(\\frac{1}{5}\\)", correct: false, feedback: "That's too small.", misconceptionId: "E-d4-a" },
        { text: "\\(\\frac{4}{5}\\)", correct: false, feedback: "Too large.", misconceptionId: "E-d4-b" },
        { text: "\\(1\\frac{1}{2}\\)", correct: false, feedback: "Way too large.", misconceptionId: "E-d4-c" }
      ],
    backward: "Subtract the known fraction from the total.",
    forward: "Finding missing parts is the foundation of algebra.",
    misconceptions: [
      { misconceptionId: "E-d4-a", description: "Student answers 1/5, undercounting the missing addend.", rootCause: "Numerator-Subtraction-Error — converts correctly to 11/10-6/10 but miscomputes the difference as 2 (giving 2/10=1/5) instead of the correct 5.", remediation: "Have the student recompute 11-6 explicitly, confirming the result is 5, giving 5/10." },
      { misconceptionId: "E-d4-b", description: "Student answers 4/5, adding instead of subtracting.", rootCause: "Operation-Reversal — adds 3/5 and 1 1/10 together instead of subtracting to find the missing addend, misreading what the '?' represents.", remediation: "Have the student restate the problem as an equation, 3/5 + □ = 1 1/10, then solve for □ by subtracting 3/5 from both sides." },
      { misconceptionId: "E-d4-c", description: "Student answers 1 1/2, mishandling the whole-number part of the total.", rootCause: "Whole-Number Mismanagement — doesn't convert 1 1/10 to the improper fraction 11/10 before subtracting, instead treating the whole '1' as though it should remain in the answer.", remediation: "Have the student convert 1 1/10 to an improper fraction (11/10) as the very first step, before doing any subtraction." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Convert to a common denominator", hint: "1 1/10 = 11/10, and 3/5 = 6/10." },
      { level: 2, description: "Set up the subtraction", hint: "The missing fraction equals 11/10 - 6/10." },
      { level: 3, description: "Subtract and simplify", hint: "11/10 - 6/10 = 5/10, which simplifies to 1/2." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NF.A.2"]
  },
  {
    itemId: "d5", order: 5, cluster: "MUL", clusterName: CLUSTER_NAMES.MUL,
    skillId: "MUL-03",
    question: "A tank is \\(\\frac{2}{3}\\) full. \\(\\frac{1}{4}\\) of the water is used. What fraction of the tank is now full?",
    options: [
        { text: "\\(\\frac{1}{2}\\)", correct: true, feedback: "Used: 1/4 × 2/3 = 2/12 = 1/6. Remaining: 2/3 - 1/6 = 4/6 - 1/6 = 3/6 = 1/2." },
        { text: "\\(\\frac{1}{6}\\)", correct: false, feedback: "That's the amount used, not remaining.", misconceptionId: "E-d5-a" },
        { text: "\\(\\frac{2}{3}\\)", correct: false, feedback: "That's the original amount.", misconceptionId: "E-d5-b" },
        { text: "\\(\\frac{5}{12}\\)", correct: false, feedback: "Incorrect subtraction.", misconceptionId: "E-d5-c" }
      ],
    backward: "Find the amount used (fraction of a fraction), then subtract from the original.",
    forward: "Fraction of a remainder problems are common in real life.",
    misconceptions: [
      { misconceptionId: "E-d5-a", description: "Student answers 1/6, reporting the amount used rather than the amount remaining.", rootCause: "Wrong-Quantity Reported — correctly computes the amount used (1/4×2/3=1/6) but reports it directly as the final answer, without subtracting it from the original 2/3 to find what's still full.", remediation: "Have the student underline the actual question ('what fraction is now full') and treat the used-amount calculation as only an intermediate step." },
      { misconceptionId: "E-d5-b", description: "Student answers 2/3, the original amount as if nothing were used.", rootCause: "Operation-Skipped — ignores the fraction used entirely and reports the tank's original fullness, as though the word problem's key detail was not processed.", remediation: "Have the student restate the problem in their own words first, identifying both the starting fullness and the used fraction, before computing." },
      { misconceptionId: "E-d5-c", description: "Student answers 5/12, miscomputing the final subtraction.", rootCause: "Common-Denominator Error — correctly computes the amount used as 1/6 but miscomputes 2/3-1/6 using the wrong common denominator, landing on 5/12 instead of 1/2.", remediation: "Have the student convert 2/3 to sixths (4/6) explicitly before subtracting 1/6, so both fractions share the denominator 6." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the amount used", hint: "1/4 of 2/3 means 1/4 × 2/3 = 2/12 = 1/6." },
      { level: 2, description: "Find a common denominator with the original", hint: "2/3 = 4/6, and the amount used is 1/6." },
      { level: 3, description: "Subtract", hint: "4/6 - 1/6 = 3/6 = 1/2." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NF.B.4.A", "CCSS.MATH.CONTENT.5.NF.B.6"]
  },
  {
    itemId: "d6", order: 6, cluster: "DIV", clusterName: CLUSTER_NAMES.DIV,
    skillId: "DIV-03",
    question: "How many \\(1\\frac{1}{4}\\) kg bags can be filled from 10 kg of rice?",
    options: [
        { text: "8", correct: true, feedback: "10 ÷ 1 1/4 = 10 ÷ 5/4 = 10 × 4/5 = 8." },
        { text: "12", correct: false, feedback: "You multiplied by 5/4 instead of its reciprocal.", misconceptionId: "E-d6-a" },
        { text: "10", correct: false, feedback: "No operation performed.", misconceptionId: "E-d6-b" },
        { text: "40", correct: false, feedback: "You multiplied 10 by 4.", misconceptionId: "E-d6-c" }
      ],
    backward: "Divide total weight by weight per bag; convert mixed number to improper first.",
    forward: "Division by mixed numbers appears in packaging and distribution.",
    misconceptions: [
      { misconceptionId: "E-d6-a", description: "Student answers 12, multiplying by the mixed number's improper form instead of its reciprocal.", rootCause: "Wrong-Reciprocal — multiplies 10 by 5/4 (the improper form of the bag size) instead of by its reciprocal 4/5, effectively performing the wrong operation.", remediation: "Have the student state the reciprocal explicitly before multiplying: 'the reciprocal of 5/4 is 4/5,' then multiply 10 by that." },
      { misconceptionId: "E-d6-b", description: "Student answers 10, reporting the total weight as if no division occurred.", rootCause: "No-Operation — writes down the total weight (10) unchanged, as though the division by bag size never happened.", remediation: "Have the student restate the problem as a division: 'how many groups of 1 1/4 kg fit into 10 kg?' before computing." },
      { misconceptionId: "E-d6-c", description: "Student answers 40, multiplying 10 by the whole-number part of the bag size's denominator.", rootCause: "Denominator-As-Multiplier — multiplies the total (10) by the denominator of the bag-size fraction (4) instead of properly dividing by the mixed number 1 1/4, producing a value far too large.", remediation: "Have the student convert 1 1/4 to the improper fraction 5/4 first, then apply the full reciprocal-multiplication method: 10 × 4/5." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Convert the mixed number", hint: "1 1/4 = 5/4." },
      { level: 2, description: "Turn the divisor into a reciprocal", hint: "Dividing by 5/4 is the same as multiplying by 4/5." },
      { level: 3, description: "Multiply", hint: "10 × 4/5 = 40/5 = 8 bags." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NF.B.7.C"]
  },
  {
    itemId: "d7", order: 7, cluster: "TYPES", clusterName: CLUSTER_NAMES.TYPES,
    skillId: "FRA-T3",
    question: "\\(\\frac{3}{5}\\) of a number is 18. Find the number.",
    options: [
        { text: "30", correct: true, feedback: "3/5 × N = 18 → N = 18 × 5/3 = 30." },
        { text: "10.8", correct: false, feedback: "You multiplied 18 × 3/5 instead of dividing.", misconceptionId: "E-d7-a" },
        { text: "18", correct: false, feedback: "No operation.", misconceptionId: "E-d7-b" },
        { text: "45", correct: false, feedback: "Incorrect multiplication.", misconceptionId: "E-d7-c" }
      ],
    backward: "Divide 18 by 3/5 (multiply by its reciprocal 5/3).",
    forward: "Finding the whole from a fraction is a key real-world skill.",
    misconceptions: [
      { misconceptionId: "E-d7-a", description: "Student answers 10.8, multiplying 18 by 3/5 instead of dividing.", rootCause: "Operation-Reversal — multiplies 18 by 3/5 instead of dividing, applying the given fraction the wrong direction and producing a value smaller than 18 instead of larger.", remediation: "Have the student reason about size first: since 3/5 of the number is 18, the whole number must be BIGGER than 18, so the answer should never come out smaller." },
      { misconceptionId: "E-d7-b", description: "Student answers 18, reporting the given part rather than solving for the whole.", rootCause: "No-Operation — writes down 18 unchanged, treating the 'part' given in the problem as if it were already the answer to 'find the number.'", remediation: "Have the student restate the problem as an equation, 3/5 × N = 18, and solve explicitly for N rather than restating the given value." },
      { misconceptionId: "E-d7-c", description: "Student answers 45, using an incorrect reciprocal or multiplier.", rootCause: "Wrong-Reciprocal — multiplies 18 by 5/2 or another incorrect factor instead of the correct reciprocal 5/3, overshooting the correct answer of 30.", remediation: "Have the student state the reciprocal of 3/5 explicitly (5/3) before multiplying 18 by it." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Set up the equation", hint: "3/5 × N = 18, where N is the unknown number." },
      { level: 2, description: "Divide by the fraction", hint: "N = 18 ÷ 3/5, which is the same as 18 × 5/3." },
      { level: 3, description: "Multiply", hint: "18 × 5/3 = 90/3 = 30." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NF.B.3"]
  },
  {
    itemId: "d8", order: 8, cluster: "EQUIV", clusterName: CLUSTER_NAMES.EQUIV,
    skillId: "EQUIV-01",
    question: "Simplify \\(\\frac{12}{18}\\) and \\(\\frac{8}{12}\\). Then find their difference.",
    options: [
        { text: "0", correct: true, feedback: "12/18=2/3, 8/12=2/3. Difference = 0." },
        { text: "\\(\\frac{1}{3}\\)", correct: false, feedback: "You probably simplified one incorrectly.", misconceptionId: "E-d8-a" },
        { text: "\\(\\frac{1}{6}\\)", correct: false, feedback: "No.", misconceptionId: "E-d8-b" },
        { text: "\\(\\frac{2}{3}\\)", correct: false, feedback: "That's the value of each.", misconceptionId: "E-d8-c" }
      ],
    backward: "Simplify both fully, then subtract.",
    forward: "Simplifying before operating often reveals they are equal.",
    misconceptions: [
      { misconceptionId: "E-d8-a", description: "Student answers 1/3, likely simplifying one of the two fractions incorrectly.", rootCause: "Partial-Simplification — simplifies one of the two fractions incompletely (e.g., 8/12 to 4/6 instead of fully to 2/3), leading to a nonzero difference where the true answer is zero.", remediation: "Have the student fully simplify BOTH fractions to lowest terms separately, verifying each against its HCF, before subtracting." },
      { misconceptionId: "E-d8-b", description: "Student answers 1/6, miscomputing the simplification of one fraction.", rootCause: "Wrong-HCF — uses an incorrect HCF for one of the two fractions (e.g., dividing 12/18 by 3 instead of 6), producing a simplified value that doesn't match the other fraction's true simplified form.", remediation: "Have the student list all common factors of each fraction's numerator and denominator separately, confirming the correct HCF for each before dividing." },
      { misconceptionId: "E-d8-c", description: "Student answers 2/3, reporting one of the simplified fractions instead of the difference between them.", rootCause: "Difference-Step-Skipped — correctly simplifies both fractions to 2/3 but stops there, reporting the shared value instead of computing 2/3-2/3.", remediation: "Have the student explicitly write the subtraction 2/3 - 2/3 = 0 as the final step, rather than stopping once both fractions are simplified." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Simplify both fractions", hint: "12/18 ÷ 6 = 2/3, and 8/12 ÷ 4 = 2/3." },
      { level: 2, description: "Compare the simplified fractions", hint: "Both simplify to 2/3." },
      { level: 3, description: "Subtract", hint: "2/3 - 2/3 = 0." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.NF.A.1"]
  },
  {
    itemId: "d9", order: 9, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    skillId: "COMP-03",
    question: "Find a fraction between \\(\\frac{1}{2}\\) and \\(\\frac{2}{3}\\) that has denominator 12. What is its numerator?",
    options: [
        { text: "7", correct: true, feedback: "1/2 = 6/12, 2/3 = 8/12. Between them is 7/12. Numerator = 7." },
        { text: "6", correct: false, feedback: "6/12 = 1/2, which is not between, it's the boundary.", misconceptionId: "E-d9-a" },
        { text: "8", correct: false, feedback: "8/12 = 2/3, the upper boundary.", misconceptionId: "E-d9-b" },
        { text: "5", correct: false, feedback: "5/12 is less than 1/2.", misconceptionId: "E-d9-c" }
      ],
    backward: "Convert both fractions to twelfths, then pick a numerator strictly between 6 and 8.",
    forward: "Finding fractions between two given fractions is a valuable number-sense skill.",
    misconceptions: [
      { misconceptionId: "E-d9-a", description: "Student answers 6, one of the boundary values rather than a numerator strictly between them.", rootCause: "Boundary-Included — picks the lower boundary (6/12=1/2) itself, not realizing 'between' means strictly greater than 6 and strictly less than 8.", remediation: "Have the student list the whole numbers strictly between 6 and 8 (only 7 qualifies) before answering." },
      { misconceptionId: "E-d9-b", description: "Student answers 8, the other boundary value.", rootCause: "Boundary-Included — picks the upper boundary (8/12=2/3) itself, making the same mistake of including an endpoint as though it were 'between.'", remediation: "Have the student check both endpoints explicitly against the word 'between,' confirming neither endpoint counts." },
      { misconceptionId: "E-d9-c", description: "Student answers 5, a value outside the range entirely.", rootCause: "Outside-The-Range Guess — picks a numerator smaller than the lower boundary (5<6), producing a fraction (5/12) that is actually less than 1/2, not between the two given fractions.", remediation: "Have the student convert both endpoints to twelfths first (6/12 and 8/12) and confirm their chosen numerator falls strictly inside that range." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Convert both fractions to twelfths", hint: "1/2 = 6/12 and 2/3 = 8/12." },
      { level: 2, description: "Find numerators strictly between the boundaries", hint: "Which whole number is strictly between 6 and 8?" },
      { level: 3, description: "State the answer", hint: "Only 7 is strictly between 6 and 8, so the fraction is 7/12." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.NF.A.2"]
  },
  {
    itemId: "d10", order: 10, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    skillId: "ADDSUB-02",
    question: "\\(2 - \\frac{1}{3} + \\frac{1}{2}\\) = ?",
    options: [
        { text: "\\(2\\frac{1}{6}\\)", correct: true, feedback: "2 = 12/6, 1/3=2/6, 1/2=3/6 → 12/6 - 2/6 + 3/6 = 13/6 = 2 1/6." },
        { text: "\\(2\\frac{1}{2}\\)", correct: false, feedback: "Incorrect.", misconceptionId: "E-d10-a" },
        { text: "\\(1\\frac{5}{6}\\)", correct: false, feedback: "You subtracted too much.", misconceptionId: "E-d10-b" },
        { text: "\\(1\\frac{2}{3}\\)", correct: false, feedback: "Wrong.", misconceptionId: "E-d10-c" }
      ],
    backward: "Convert whole number to fraction; use common denominator 6.",
    forward: "Mixed operations with whole numbers and fractions are common.",
    misconceptions: [
      { misconceptionId: "E-d10-a", description: "Student answers 2 1/2, likely from dropping or mishandling the subtraction of 1/3.", rootCause: "Term-Drop — drops or mishandles the '-1/3' term, effectively computing only 2+1/2 and ignoring the subtraction, landing on 2 1/2.", remediation: "Have the student list all three terms (2, -1/3, +1/2) explicitly with their signs before combining them, so none is dropped." },
      { misconceptionId: "E-d10-b", description: "Student answers 1 5/6, subtracting both 1/3 and 1/2 instead of adding 1/2.", rootCause: "Sign-Error — treats the '+1/2' as if it were also being subtracted, computing 2-1/3-1/2 instead of 2-1/3+1/2, undershooting the correct answer.", remediation: "Have the student circle the operation signs (- and +) before each fraction to make sure each is applied correctly." },
      { misconceptionId: "E-d10-c", description: "Student answers 1 2/3, mishandling the whole number 2 in the conversion.", rootCause: "Whole-Number Conversion Error — doesn't correctly convert the whole number 2 to sixths (12/6) before combining, instead treating it inconsistently with the fractional terms.", remediation: "Have the student convert the whole number 2 to 12/6 explicitly as the first step, writing all three terms with denominator 6 before combining." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Convert the whole number", hint: "2 = 12/6 (using a common denominator of 6)." },
      { level: 2, description: "Convert the other fractions", hint: "1/3 = 2/6 and 1/2 = 3/6." },
      { level: 3, description: "Combine", hint: "12/6 - 2/6 + 3/6 = 13/6 = 2 1/6." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NF.A.1"]
  },
  {
    itemId: "d11", order: 11, cluster: "MUL", clusterName: CLUSTER_NAMES.MUL,
    skillId: "FRA-T3",
    question: "In a class, \\(\\frac{2}{5}\\) of the students are boys. If there are 12 boys, how many students are there?",
    options: [
        { text: "30", correct: true, feedback: "2/5 × total = 12 → total = 12 × 5/2 = 30." },
        { text: "24", correct: false, feedback: "You multiplied 12 × 2.", misconceptionId: "E-d11-a" },
        { text: "12", correct: false, feedback: "That's the number of boys.", misconceptionId: "E-d11-b" },
        { text: "60", correct: false, feedback: "You multiplied 12 × 5.", misconceptionId: "E-d11-c" }
      ],
    backward: "Divide the part by the fraction to find the whole.",
    forward: "This is used in surveys and data analysis.",
    misconceptions: [
      { misconceptionId: "E-d11-a", description: "Student answers 24, multiplying the given part by the numerator instead of dividing by the fraction.", rootCause: "Wrong-Operation — multiplies 12 by the numerator 2 instead of dividing by the fraction 2/5 (i.e., multiplying by the reciprocal 5/2), producing a value too small.", remediation: "Have the student reason about size first: since 12 boys are only 2/5 of the class, the total must be BIGGER than 12, ruling out any answer smaller than or equal to 12." },
      { misconceptionId: "E-d11-b", description: "Student answers 12, reporting the given part rather than solving for the whole.", rootCause: "No-Operation — writes down 12 unchanged, treating the 'part' given in the problem (number of boys) as if it were already the total number of students.", remediation: "Have the student restate the problem as an equation, 2/5 × Total = 12, and solve explicitly for Total rather than restating the given value." },
      { misconceptionId: "E-d11-c", description: "Student answers 60, multiplying the given part by the denominator instead of by the reciprocal fraction.", rootCause: "Wrong-Multiplier — multiplies 12 by the denominator 5 alone instead of by the full reciprocal 5/2, overshooting the correct answer of 30 by a factor of 2.", remediation: "Have the student state the full reciprocal of 2/5 (which is 5/2, not just 5) before multiplying 12 by it." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Set up the equation", hint: "2/5 × Total = 12, where Total is the unknown number of students." },
      { level: 2, description: "Divide by the fraction", hint: "Total = 12 ÷ 2/5, which is the same as 12 × 5/2." },
      { level: 3, description: "Multiply", hint: "12 × 5/2 = 60/2 = 30." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NF.B.3"]
  },
  {
    itemId: "d12", order: 12, cluster: "DIV", clusterName: CLUSTER_NAMES.DIV,
    skillId: "DIV-04",
    question: "\\( (2\\frac{1}{2} \\div 5) + \\frac{1}{4} \\) = ?",
    options: [
        { text: "\\(\\frac{3}{4}\\)", correct: true, feedback: "2 1/2 = 5/2, ÷5 = 1/2. + 1/4 = 3/4." },
        { text: "\\(\\frac{1}{2}\\)", correct: false, feedback: "You forgot to add 1/4.", misconceptionId: "E-d12-a" },
        { text: "\\(\\frac{1}{4}\\)", correct: false, feedback: "Only the second fraction.", misconceptionId: "E-d12-b" },
        { text: "\\(1\\frac{1}{4}\\)", correct: false, feedback: "Incorrect.", misconceptionId: "E-d12-c" }
      ],
    backward: "Convert mixed to improper, divide, then add.",
    forward: "Chaining operations builds fluency.",
    misconceptions: [
      { misconceptionId: "E-d12-a", description: "Student answers 1/2, stopping after the division step and never adding 1/4.", rootCause: "Second-Step-Drop — correctly computes 2 1/2÷5=1/2 but stops there, forgetting the problem also asks to add 1/4 to that result.", remediation: "Have the student underline every instruction word ('+1/4') and check it's addressed before finalizing an answer." },
      { misconceptionId: "E-d12-b", description: "Student answers 1/4, skipping the division step entirely.", rootCause: "First-Step-Drop — ignores the division of 2 1/2 by 5 and simply reports the second fraction, 1/4, skipping the first operation entirely.", remediation: "Have the student work through the problem in the order written, computing the division result FIRST and writing it down before starting the addition." },
      { misconceptionId: "E-d12-c", description: "Student answers 1 1/4, miscomputing the division step.", rootCause: "Division-Miscalculation — miscomputes 2 1/2÷5, perhaps dividing only the whole-number part (2÷5) and mishandling the remainder, landing on a value larger than the correct 1/2 before adding 1/4.", remediation: "Have the student convert 2 1/2 to the improper fraction 5/2 first, then divide by 5 as a single clean fraction operation: 5/2÷5=5/10=1/2." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Convert and divide", hint: "2 1/2 = 5/2. Dividing by 5 gives 5/2 × 1/5 = 5/10 = 1/2." },
      { level: 2, description: "Set up the addition", hint: "Now add 1/4 to 1/2." },
      { level: 3, description: "Add", hint: "1/2 + 1/4 = 2/4 + 1/4 = 3/4." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NF.B.7.C"]
  },
  {
    itemId: "d13", order: 13, cluster: "TYPES", clusterName: CLUSTER_NAMES.TYPES,
    skillId: "ADDSUB-04",
    question: "Multiply \\(1\\frac{3}{5}\\) by 2. How much larger is the result than 3?",
    options: [
        { text: "\\(\\frac{1}{5}\\)", correct: true, feedback: "1 3/5 = 8/5, ×2 = 16/5 = 3 1/5. 3 1/5 - 3 = 1/5." },
        { text: "\\(3\\frac{1}{5}\\)", correct: false, feedback: "That's the result, not the difference.", misconceptionId: "E-d13-a" },
        { text: "\\(\\frac{2}{5}\\)", correct: false, feedback: "Off by 1/5.", misconceptionId: "E-d13-b" },
        { text: "\\(\\frac{1}{10}\\)", correct: false, feedback: "Incorrect.", misconceptionId: "E-d13-c" }
      ],
    backward: "First compute the product, then subtract 3.",
    forward: "Comparing results after operations builds estimation skills.",
    misconceptions: [
      { misconceptionId: "E-d13-a", description: "Student answers 3 1/5, reporting the product rather than the difference from 3.", rootCause: "Second-Step-Drop — correctly computes 1 3/5×2=3 1/5 but stops there, forgetting the question asks how much LARGER this is than 3, not the product itself.", remediation: "Have the student underline the actual question ('how much larger') and treat the multiplication as only an intermediate step." },
      { misconceptionId: "E-d13-b", description: "Student answers 2/5, miscomputing the multiplication step.", rootCause: "Multiplication-Miscalculation — miscomputes 8/5×2 as 18/5 or similar instead of 16/5, leading to a wrong difference of 2/5 instead of 1/5.", remediation: "Have the student recompute 8×2=16 as a standalone multiplication fact before placing it over the denominator 5." },
      { misconceptionId: "E-d13-c", description: "Student answers 1/10, halving the correct difference.", rootCause: "Over-Reduction-Or-Miscalculation — either miscomputes the subtraction 3 1/5-3, or incorrectly simplifies the correct answer 1/5 by dividing again, landing on 1/10.", remediation: "Have the student verify: 3 1/5 - 3 = 1/5, and confirm 1/5 has no common factor with itself to simplify further." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Convert and multiply", hint: "1 3/5 = 8/5. 8/5 × 2 = 16/5." },
      { level: 2, description: "Convert to a mixed number", hint: "16/5 = 3 1/5." },
      { level: 3, description: "Subtract", hint: "3 1/5 - 3 = 1/5." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.NF.B.4.B"]
  },
  {
    itemId: "d14", order: 14, cluster: "EQUIV", clusterName: CLUSTER_NAMES.EQUIV,
    skillId: "EQUIV-03",
    question: "Which fraction is NOT equivalent to \\(\\frac{3}{5}\\)? \\(\\frac{6}{10}, \\frac{9}{15}, \\frac{12}{20}, \\frac{10}{16}\\)",
    options: [
        { text: "\\(\\frac{10}{16}\\)", correct: true, feedback: "10/16 = 5/8, not 3/5." },
        { text: "\\(\\frac{6}{10}\\)", correct: false, feedback: "6/10 = 3/5.", misconceptionId: "E-d14-a" },
        { text: "\\(\\frac{9}{15}\\)", correct: false, feedback: "9/15 = 3/5.", misconceptionId: "E-d14-b" },
        { text: "\\(\\frac{12}{20}\\)", correct: false, feedback: "12/20 = 3/5.", misconceptionId: "E-d14-c" }
      ],
    backward: "Simplify each or cross-multiply with 3/5.",
    forward: "Quick recognition of non-equivalent fractions prevents errors.",
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
    itemId: "d15", order: 15, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    skillId: "COMP-03",
    question: "Anita ate \\(\\frac{2}{5}\\) of a pizza, Ravi ate \\(\\frac{1}{3}\\), and Sita ate \\(\\frac{3}{10}\\). Who ate the most?",
    options: [
        { text: "Anita", correct: true, feedback: "LCM 30: Anita 12/30, Ravi 10/30, Sita 9/30. Anita ate the most." },
        { text: "Ravi", correct: false, feedback: "Ravi ate 10/30, less than Anita.", misconceptionId: "E-d15-a" },
        { text: "Sita", correct: false, feedback: "Sita ate 9/30, the least.", misconceptionId: "E-d15-b" },
        { text: "All ate the same", correct: false, feedback: "Different fractions.", misconceptionId: "E-d15-c" }
      ],
    backward: "Convert to a common denominator (30) and compare numerators.",
    forward: "Word problems with fractions appear in everyday comparisons.",
    misconceptions: [
      { misconceptionId: "E-d15-a", description: "Student picks Ravi, without converting all three fractions to the common denominator.", rootCause: "Unconverted Comparison — compares the three fractions by their original denominators (5, 3, 10) without converting to thirtieths first, misjudging that Ravi's 1/3 is the largest.", remediation: "Insist on writing all three fractions in thirtieths (12/30, 10/30, 9/30) BEFORE attempting to compare them." },
      { misconceptionId: "E-d15-b", description: "Student picks Sita, the person who ate the least.", rootCause: "Numerator-Miscompare — converts correctly but then selects the smallest converted numerator (9) instead of the largest (12).", remediation: "Have the student write all three converted numerators (12, 10, 9) side by side and circle the largest one before answering." },
      { misconceptionId: "E-d15-c", description: "Student claims all three people ate the same amount.", rootCause: "Surface-Similarity Assumption — assumes fractions that all hover near similar values must be equal without actually converting and comparing them.", remediation: "Have the student compute the common-denominator value for each person's fraction individually and compare the three numbers explicitly." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the LCM", hint: "The LCM of 5, 3, and 10 is 30." },
      { level: 2, description: "Convert each fraction", hint: "Anita 2/5=12/30, Ravi 1/3=10/30, Sita 3/10=9/30." },
      { level: 3, description: "Compare the numerators", hint: "12 is the largest, so Anita ate the most." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.NF.A.2"]
  },
  {
    itemId: "d16", order: 16, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    skillId: "ADDSUB-04",
    question: "\\(\\frac{1}{3} + \\frac{1}{4} + \\frac{1}{6}\\) = ? What must be added to this sum to make 1?",
    options: [
        { text: "\\(\\frac{1}{4}\\)", correct: true, feedback: "Sum = 4/12+3/12+2/12 = 9/12 = 3/4. 1 - 3/4 = 1/4." },
        { text: "\\(\\frac{3}{4}\\)", correct: false, feedback: "That's the sum, not the amount to add.", misconceptionId: "E-d16-a" },
        { text: "\\(\\frac{1}{3}\\)", correct: false, feedback: "Too large.", misconceptionId: "E-d16-b" },
        { text: "\\(\\frac{1}{2}\\)", correct: false, feedback: "Too large.", misconceptionId: "E-d16-c" }
      ],
    backward: "First find the sum, then subtract from 1.",
    forward: "Finding complements to a whole is a key fraction skill.",
    misconceptions: [
      { misconceptionId: "E-d16-a", description: "Student answers 3/4, reporting the sum rather than the amount still needed to reach 1.", rootCause: "Second-Step-Drop — correctly computes the sum 1/3+1/4+1/6=3/4 but stops there, forgetting the question asks what must be ADDED to that sum to make 1.", remediation: "Have the student underline the actual question ('what must be added') and treat the initial sum as only an intermediate step." },
      { misconceptionId: "E-d16-b", description: "Student answers 1/3, overestimating the gap to 1.", rootCause: "Gap-Miscalculation — correctly finds the sum is 3/4 but miscomputes 1-3/4, perhaps confusing it with a different fraction from the original problem (1/3), rather than actually subtracting.", remediation: "Have the student write 1 as 4/4 explicitly, then subtract 3/4 from 4/4 to find the gap." },
      { misconceptionId: "E-d16-c", description: "Student answers 1/2, another overestimate of the gap to 1.", rootCause: "Gap-Miscalculation — miscomputes the difference between 1 and the sum 3/4, perhaps through an arithmetic slip, landing on 1/2 instead of the correct 1/4.", remediation: "Have the student verify their answer by adding it back to 3/4 and confirming the result equals exactly 1." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find a common denominator", hint: "The LCM of 3, 4, and 6 is 12." },
      { level: 2, description: "Add the fractions", hint: "4/12 + 3/12 + 2/12 = 9/12 = 3/4." },
      { level: 3, description: "Find the complement to 1", hint: "1 - 3/4 = 1/4." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NF.A.2"]
  },
  {
    itemId: "d17", order: 17, cluster: "MUL", clusterName: CLUSTER_NAMES.MUL,
    skillId: "MUL-03",
    question: "A recipe needs \\(\\frac{3}{4}\\) cup sugar for 4 servings. How much for 10 servings?",
    options: [
        { text: "\\(1\\frac{7}{8}\\) cups", correct: true, feedback: "Per serving: 3/4 ÷ 4 = 3/16. For 10: 3/16 × 10 = 30/16 = 15/8 = 1 7/8." },
        { text: "\\(\\frac{3}{4}\\) cup", correct: false, feedback: "That's for 4 servings.", misconceptionId: "E-d17-a" },
        { text: "\\(1\\frac{1}{2}\\) cups", correct: false, feedback: "Incorrect scaling.", misconceptionId: "E-d17-b" },
        { text: "\\(2\\frac{1}{2}\\) cups", correct: false, feedback: "Too large.", misconceptionId: "E-d17-c" }
      ],
    backward: "First find the amount per serving (divide), then multiply by the new number of servings.",
    forward: "Scaling recipes is a practical use of fraction multiplication.",
    misconceptions: [
      { misconceptionId: "E-d17-a", description: "Student answers 3/4 cup, reusing the amount for 4 servings without scaling.", rootCause: "Scaling-Skipped — reports the original amount for 4 servings unchanged, not recognizing that 10 servings requires a proportionally larger amount.", remediation: "Have the student find the amount per ONE serving first (3/4÷4=3/16), so the scaling step to 10 servings becomes unavoidable." },
      { misconceptionId: "E-d17-b", description: "Student answers 1 1/2 cups, likely doubling the original amount instead of scaling by the correct ratio.", rootCause: "Wrong-Scale-Factor — doubles the original 3/4 cup (getting 1 1/2) as if 10 servings were twice 4 servings, rather than correctly finding the per-serving amount and scaling by 10.", remediation: "Have the student compute the exact per-serving amount (3/16 cup) and multiply by 10 explicitly, rather than estimating a scale factor from '10 is about double 4.'" },
      { misconceptionId: "E-d17-c", description: "Student answers 2 1/2 cups, overshooting the correct scaled amount.", rootCause: "Per-Serving Miscalculation — miscomputes the amount per serving (e.g., treating 3/4÷4 incorrectly) and then scales that wrong value up by 10, landing on an answer too large.", remediation: "Have the student verify the per-serving amount by checking that (per-serving amount) × 4 = 3/4, before scaling to 10 servings." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the amount per serving", hint: "3/4 ÷ 4 = 3/16 cup per serving." },
      { level: 2, description: "Scale to 10 servings", hint: "Multiply the per-serving amount by 10: 3/16 × 10 = 30/16." },
      { level: 3, description: "Simplify", hint: "30/16 simplifies to 15/8 = 1 7/8 cups." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NF.B.6"]
  },
  {
    itemId: "d18", order: 18, cluster: "DIV", clusterName: CLUSTER_NAMES.DIV,
    skillId: "DIV-03",
    question: "A ribbon is \\(5\\frac{1}{4}\\) m long. Each piece is \\(\\frac{3}{4}\\) m. How many full pieces can be cut, and how much is left?",
    options: [
        { text: "7 pieces, 0 m left", correct: true, feedback: "5 1/4 = 21/4. ÷ 3/4 = 21/4 × 4/3 = 84/12 = 7 exactly. No remainder." },
        { text: "6 pieces, \\(\\frac{1}{2}\\) m left", correct: false, feedback: "Incorrect division.", misconceptionId: "E-d18-a" },
        { text: "7 pieces, \\(\\frac{1}{4}\\) m left", correct: false, feedback: "The division is exact.", misconceptionId: "E-d18-b" },
        { text: "8 pieces", correct: false, feedback: "Too many.", misconceptionId: "E-d18-c" }
      ],
    backward: "Convert mixed to improper; divide by piece length. Since the division comes out exact, there is no remainder.",
    forward: "Practical cutting problems use fraction division.",
    misconceptions: [
      { misconceptionId: "E-d18-a", description: "Student answers 6 pieces with 1/2 m left, undercounting the number of full pieces.", rootCause: "Division-Miscalculation — miscomputes 21/4÷3/4, perhaps forgetting to fully simplify 84/12, and lands on an undercount with an incorrect leftover amount.", remediation: "Have the student compute 21/4 × 4/3 = 84/12 explicitly, then fully simplify 84÷12=7, confirming there's no remainder." },
      { misconceptionId: "E-d18-b", description: "Student answers 7 pieces with 1/4 m left, assuming a remainder exists when the division is exact.", rootCause: "Assumed-Remainder — correctly finds 7 as the piece count but assumes there must be leftover ribbon (defaulting to the piece length's own fractional part, 1/4), without checking that the division 84/12 comes out to exactly 7 with no remainder.", remediation: "Have the student verify their division result by multiplying back: 7 pieces × 3/4 m = 21/4 m, which exactly matches the original ribbon length — confirming zero remainder." },
      { misconceptionId: "E-d18-c", description: "Student answers 8 pieces, overcounting the number of full pieces.", rootCause: "Division-Miscalculation — miscomputes the division, perhaps using an incorrect reciprocal or rounding up, and overcounts the number of pieces that fit.", remediation: "Have the student verify by multiplying their answer back: 8 pieces × 3/4 m = 6 m, which is longer than the original 5 1/4 m ribbon — an impossible result that flags the error." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Convert to an improper fraction", hint: "5 1/4 = 21/4." },
      { level: 2, description: "Divide by the piece length", hint: "21/4 ÷ 3/4 = 21/4 × 4/3 = 84/12." },
      { level: 3, description: "Simplify and check for a remainder", hint: "84/12 = 7 exactly, so there are 7 full pieces with nothing left over." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NF.B.7.C"]
  },
  {
    itemId: "d19", order: 19, cluster: "TYPES", clusterName: CLUSTER_NAMES.TYPES,
    skillId: "FRA-T3",
    question: "\\(\\frac{4}{7}\\) of a number is 16. What is the number?",
    options: [
        { text: "28", correct: true, feedback: "4/7 × N = 16 → N = 16 × 7/4 = 28." },
        { text: "\\(9\\frac{1}{7}\\)", correct: false, feedback: "You divided 16 by 4/7 incorrectly.", misconceptionId: "E-d19-a" },
        { text: "64", correct: false, feedback: "You multiplied 16 by 4.", misconceptionId: "E-d19-b" },
        { text: "4", correct: false, feedback: "Incorrect.", misconceptionId: "E-d19-c" }
      ],
    backward: "Divide the given number by the fraction (multiply by its reciprocal).",
    forward: "Finding the whole from a part is fundamental in percentages.",
    misconceptions: [
      { misconceptionId: "E-d19-a", description: "Student answers 9 1/7, miscomputing the division by the fraction.", rootCause: "Wrong-Reciprocal — multiplies 16 by a wrong factor (e.g., 4/7 itself instead of its reciprocal 7/4), performing the division backwards and producing a value smaller than 16.", remediation: "Have the student reason about size first: since 16 is only 4/7 of the number, the whole number must be BIGGER than 16, ruling out any answer smaller than 16." },
      { misconceptionId: "E-d19-b", description: "Student answers 64, multiplying 16 by the numerator instead of by the correct reciprocal.", rootCause: "Wrong-Multiplier — multiplies 16 by the numerator 4 alone, rather than by the full reciprocal 7/4, overshooting the correct answer of 28.", remediation: "Have the student state the full reciprocal of 4/7 (which is 7/4, not just 4) before multiplying 16 by it." },
      { misconceptionId: "E-d19-c", description: "Student answers 4, reporting the denominator... rather, the numerator of the fraction instead of solving for the whole.", rootCause: "Fraction-Component-As-Answer — writes down a piece of the given fraction (the numerator, 4) instead of solving the equation 4/7×N=16 for N.", remediation: "Have the student restate the problem as an equation, 4/7 × N = 16, and solve explicitly for N rather than restating a number from the fraction." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Set up the equation", hint: "4/7 × N = 16, where N is the unknown number." },
      { level: 2, description: "Divide by the fraction", hint: "N = 16 ÷ 4/7, which is the same as 16 × 7/4." },
      { level: 3, description: "Multiply", hint: "16 × 7/4 = 112/4 = 28." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NF.B.3"]
  },
  {
    itemId: "d20", order: 20, cluster: "EQUIV", clusterName: CLUSTER_NAMES.EQUIV,
    skillId: "EQUIV-02",
    question: "Simplify \\(\\frac{24}{36}\\). Then write an equivalent fraction whose denominator is 9 more than its numerator.",
    options: [
        { text: "\\(\\frac{18}{27}\\)", correct: true, feedback: "24/36=2/3. Let fraction = 2k/3k. 3k = 2k+9 → k=9 → 18/27." },
        { text: "\\(\\frac{12}{21}\\)", correct: false, feedback: "Denominator is 9 more, but 12/21=4/7, which is not equivalent to 2/3.", misconceptionId: "E-d20-a" },
        { text: "\\(\\frac{2}{11}\\)", correct: false, feedback: "No.", misconceptionId: "E-d20-b" },
        { text: "\\(\\frac{6}{15}\\)", correct: false, feedback: "6/15=2/5, not 2/3.", misconceptionId: "E-d20-c" }
      ],
    backward: "Simplify first, then use the algebraic condition to find k.",
    forward: "Linking equivalent fractions with algebraic conditions.",
    misconceptions: [
      { misconceptionId: "E-d20-a", description: "Student picks 12/21, which does satisfy the 'denominator is 9 more' condition but is not equivalent to 2/3.", rootCause: "Single-Condition Focus — checks only that the denominator is 9 more than the numerator (21-12=9) without verifying the fraction is actually equivalent to 2/3, satisfying only half the problem's requirements.", remediation: "Have the student verify BOTH conditions explicitly: does the fraction simplify to 2/3, AND is its denominator 9 more than its numerator?" },
      { misconceptionId: "E-d20-b", description: "Student picks 2/11, an arbitrary fraction that doesn't satisfy either condition properly.", rootCause: "Condition-Ignored — picks a fraction without checking either the equivalence-to-2/3 condition or the denominator-is-9-more condition, essentially guessing.", remediation: "Have the student set up the algebraic form 2k/3k explicitly, so the equivalence to 2/3 is guaranteed, then solve 3k-2k=9 for k." },
      { misconceptionId: "E-d20-c", description: "Student picks 6/15, a fraction that is not equivalent to 2/3.", rootCause: "Wrong-Simplification-Check — doesn't verify that 6/15 actually simplifies to 2/3 (it simplifies to 2/5 instead), missing the equivalence requirement.", remediation: "Have the student simplify 6/15 by dividing both terms by 3, confirming it equals 2/5, not 2/3, before selecting it." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Simplify the original fraction", hint: "24/36 ÷ 12 = 2/3." },
      { level: 2, description: "Set up the algebraic form", hint: "Any fraction equivalent to 2/3 can be written as 2k/3k." },
      { level: 3, description: "Use the condition", hint: "3k - 2k = 9, so k = 9, giving 2×9/3×9 = 18/27." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.NF.A.1"]
  },
  {
    itemId: "d21", order: 21, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    skillId: "COMP-03",
    question: "Among \\(\\frac{7}{10}, \\frac{3}{4}, \\frac{5}{6}\\), find the difference between the largest and smallest.",
    options: [
        { text: "\\(\\frac{2}{15}\\)", correct: true, feedback: "7/10=0.7, 3/4=0.75, 5/6≈0.833. Largest 5/6, smallest 7/10. 5/6 - 7/10 = 25/30 - 21/30 = 4/30 = 2/15." },
        { text: "\\(\\frac{1}{6}\\)", correct: false, feedback: "Incorrect.", misconceptionId: "E-d21-a" },
        { text: "\\(\\frac{1}{4}\\)", correct: false, feedback: "No.", misconceptionId: "E-d21-b" },
        { text: "\\(\\frac{1}{10}\\)", correct: false, feedback: "Too small.", misconceptionId: "E-d21-c" }
      ],
    backward: "Identify largest and smallest (using LCM or decimal conversion), then subtract.",
    forward: "Comparing and finding differences of fractions is used in measurement errors.",
    misconceptions: [
      { misconceptionId: "E-d21-a", description: "Student answers 1/6, likely misidentifying which fraction is largest or smallest.", rootCause: "Wrong-Extremes-Identified — misjudges which of the three fractions is largest and which is smallest (perhaps picking 3/4 as an extreme instead of 5/6 or 7/10), leading to a wrong subtraction.", remediation: "Have the student convert all three fractions to the common denominator 30 (21/30, 22/30... wait, have them recompute: 7/10=21/30, 3/4=22.5/30 is not integer — use decimal or LCM 60) and identify the true largest and smallest before subtracting." },
      { misconceptionId: "E-d21-b", description: "Student answers 1/4, reporting one of the original fractions instead of the computed difference.", rootCause: "Computation-Skipped — reports one of the three given fractions (3/4) directly instead of computing the actual difference between the largest and smallest.", remediation: "Have the student explicitly identify the largest (5/6) and smallest (7/10) fractions first, then perform the subtraction as a separate step." },
      { misconceptionId: "E-d21-c", description: "Student answers 1/10, miscomputing the subtraction after correctly identifying the extremes.", rootCause: "Common-Denominator Error — correctly identifies 5/6 as largest and 7/10 as smallest but miscomputes the subtraction using an incorrect common denominator, landing on 1/10.", remediation: "Have the student find the LCM of 6 and 10 explicitly (30) and convert both fractions before subtracting: 5/6=25/30, 7/10=21/30." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Compare the three fractions", hint: "Convert to decimals or a common denominator to see 7/10=0.7, 3/4=0.75, 5/6≈0.83." },
      { level: 2, description: "Identify largest and smallest", hint: "5/6 is largest, 7/10 is smallest." },
      { level: 3, description: "Subtract", hint: "5/6 - 7/10 = 25/30 - 21/30 = 4/30 = 2/15." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.NF.A.2"]
  },
  {
    itemId: "d22", order: 22, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    skillId: "ADDSUB-03",
    question: "\\( (2\\frac{1}{3} - 1\\frac{1}{2}) + \\frac{3}{4} \\) = ?",
    options: [
        { text: "\\(1\\frac{7}{12}\\)", correct: true, feedback: "7/3 - 3/2 = 14/6 - 9/6 = 5/6. + 3/4 = 10/12 + 9/12 = 19/12 = 1 7/12." },
        { text: "\\(2\\frac{1}{12}\\)", correct: false, feedback: "Incorrect.", misconceptionId: "E-d22-a" },
        { text: "\\(1\\frac{1}{12}\\)", correct: false, feedback: "Off by 1/2.", misconceptionId: "E-d22-b" },
        { text: "\\(\\frac{7}{12}\\)", correct: false, feedback: "Forgot the whole number.", misconceptionId: "E-d22-c" }
      ],
    backward: "Evaluate inside brackets first, then add.",
    forward: "Order of operations with fractions.",
    misconceptions: [
      { misconceptionId: "E-d22-a", description: "Student answers 2 1/12, overcounting the final sum.", rootCause: "Numerator-Addition-Error — after correctly finding the bracket result (5/6=10/12) and converting 3/4 to 9/12, miscombines the numerators as 25 instead of 19, overshooting.", remediation: "Have the student recompute 10+9 carefully, confirming the sum is 19, giving 19/12." },
      { misconceptionId: "E-d22-b", description: "Student answers 1 1/12, undercounting the final sum by exactly 6/12.", rootCause: "Bracket-Miscalculation — miscomputes the bracket subtraction 2 1/3-1 1/2 as a value 1/2 too small, then correctly adds 3/4 to that wrong intermediate result.", remediation: "Have the student verify the bracket result independently: 7/3-3/2=14/6-9/6=5/6, before proceeding to the addition." },
      { misconceptionId: "E-d22-c", description: "Student answers 7/12, dropping the whole-number part of the final answer.", rootCause: "Whole-Number-Drop — correctly computes the fractional remainder (7/12) but forgets to include the whole-number part of the sum, reporting only the fraction.", remediation: "Have the student check whether their final numerator (19) is bigger than the denominator (12) — if so, there must be a whole-number part to extract." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Evaluate the bracket first", hint: "2 1/3 - 1 1/2 = 7/3 - 3/2 = 14/6 - 9/6 = 5/6." },
      { level: 2, description: "Find a common denominator with 3/4", hint: "5/6 = 10/12 and 3/4 = 9/12." },
      { level: 3, description: "Add", hint: "10/12 + 9/12 = 19/12 = 1 7/12." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NF.A.1"]
  },
  {
    itemId: "d23", order: 23, cluster: "MUL", clusterName: CLUSTER_NAMES.MUL,
    skillId: "MUL-03",
    question: "In a survey, \\(\\frac{2}{5}\\) of people liked tea. Of those, \\(\\frac{3}{4}\\) also liked coffee. What fraction of all people liked both?",
    options: [
        { text: "\\(\\frac{3}{10}\\)", correct: true, feedback: "3/4 × 2/5 = 6/20 = 3/10." },
        { text: "\\(\\frac{5}{9}\\)", correct: false, feedback: "You added fractions.", misconceptionId: "E-d23-a" },
        { text: "\\(\\frac{8}{20}\\)", correct: false, feedback: "Not simplified.", misconceptionId: "E-d23-b" },
        { text: "\\(\\frac{3}{4}\\)", correct: false, feedback: "That's the fraction of tea-likers, not of all people.", misconceptionId: "E-d23-c" }
      ],
    backward: "Multiply the two fractions to find the fraction of the whole.",
    forward: "This is a classic 'fraction of a fraction' problem.",
    misconceptions: [
      { misconceptionId: "E-d23-a", description: "Student answers 5/9, adding the two fractions instead of multiplying.", rootCause: "Operation-Reversal — adds 2/5 and 3/4 (using some incorrect combination) instead of multiplying them, misapplying an addition strategy to a 'fraction of a fraction' problem.", remediation: "Have the student recognize the phrase 'of those' as signaling multiplication, not addition — restate the problem as '3/4 of 2/5.'" },
      { misconceptionId: "E-d23-b", description: "Student answers 8/20, the correct unsimplified product with a miscalculated numerator.", rootCause: "Numerator-Miscalculation — attempts the correct multiplication method but miscomputes 3×2 as 8 instead of 6 in the numerator, while correctly getting 20 in the denominator (4×5).", remediation: "Have the student recompute the numerator multiplication (3×2) as a standalone fact, confirming it equals 6, not 8." },
      { misconceptionId: "E-d23-c", description: "Student answers 3/4, reporting the fraction of tea-likers who also like coffee, not the fraction of ALL people.", rootCause: "Reference-Whole Confusion — reports 3/4 (the fraction of tea-likers who like coffee) directly, without multiplying by 2/5 to convert it into a fraction of the entire surveyed population.", remediation: "Have the student draw a diagram: first shade 2/5 of the whole group (tea-likers), then shade 3/4 of THAT shaded region (coffee-likers among them), and compare the final shaded area to the whole." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the operation", hint: "'3/4 of those who liked tea (2/5)' means multiply 3/4 × 2/5." },
      { level: 2, description: "Multiply", hint: "3/4 × 2/5 = (3×2)/(4×5) = 6/20." },
      { level: 3, description: "Simplify", hint: "6/20 simplifies to 3/10." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NF.B.4.A", "CCSS.MATH.CONTENT.5.NF.B.6"]
  },
  {
    itemId: "d24", order: 24, cluster: "DIV", clusterName: CLUSTER_NAMES.DIV,
    skillId: "DIV-03",
    question: "Divide \\(4\\frac{1}{2}\\) by \\(\\frac{3}{4}\\). Is the result greater than 6?",
    options: [
        { text: "Equal to 6", correct: true, feedback: "4 1/2 = 9/2. ÷ 3/4 = 9/2 × 4/3 = 36/6 = 6. Exactly 6." },
        { text: "Greater than 6", correct: false, feedback: "It's exactly 6.", misconceptionId: "E-d24-a" },
        { text: "Less than 6", correct: false, feedback: "It's 6.", misconceptionId: "E-d24-b" },
        { text: "Cannot determine", correct: false, feedback: "It can be calculated exactly.", misconceptionId: "E-d24-c" }
      ],
    backward: "Divide by multiplying by the reciprocal. Simplify.",
    forward: "Division of mixed numbers by fractions tests multiple skills.",
    misconceptions: [
      { misconceptionId: "E-d24-a", description: "Student claims the result is greater than 6, without computing the exact value.", rootCause: "Estimation-Without-Verification — assumes dividing by a fraction less than 1 must produce something 'a lot bigger,' without actually computing the exact quotient to check it's precisely 6.", remediation: "Have the student compute the exact value (9/2 × 4/3 = 36/6 = 6) rather than relying on an intuition about dividing by fractions less than 1." },
      { misconceptionId: "E-d24-b", description: "Student claims the result is less than 6, without computing the exact value.", rootCause: "Estimation-Without-Verification — guesses the result is smaller than 6, perhaps confusing dividing by a fraction with multiplying by one, without computing the exact quotient.", remediation: "Have the student compute the exact value step by step: 4 1/2÷3/4 = 9/2×4/3 = 36/6 = 6, confirming it equals exactly 6." },
      { misconceptionId: "E-d24-c", description: "Student claims the result cannot be determined.", rootCause: "Computation-Avoidance — assumes the comparison requires estimation rather than realizing the exact quotient can be computed directly.", remediation: "Walk through the computation explicitly: 9/2 × 4/3 = 36/6 = 6, showing the exact value is calculable and equals 6." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Convert to an improper fraction", hint: "4 1/2 = 9/2." },
      { level: 2, description: "Turn the divisor into a reciprocal and multiply", hint: "9/2 ÷ 3/4 = 9/2 × 4/3 = 36/6." },
      { level: 3, description: "Simplify and compare", hint: "36/6 = 6 exactly, so the result equals 6." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NF.B.7"]
  }
];

const recheckItems = [
  {
    itemId: "r1", order: 1, cluster: "TYPES", clusterName: CLUSTER_NAMES.TYPES,
    skillId: "ADDSUB-04",
    question: "A mixed number subtracted from 5 gives \\(2\\frac{1}{3}\\). Find the mixed number.",
    options: [
        { text: "\\(2\\frac{2}{3}\\)", correct: true, feedback: "5 - ? = 2 1/3 → ? = 5 - 2 1/3 = 2 2/3." },
        { text: "\\(7\\frac{1}{3}\\)", correct: false, feedback: "You added.", misconceptionId: "E-r1-a" },
        { text: "\\(3\\frac{2}{3}\\)", correct: false, feedback: "Incorrect subtraction.", misconceptionId: "E-r1-b" },
        { text: "\\(2\\frac{1}{3}\\)", correct: false, feedback: "That's the result, not the original.", misconceptionId: "E-r1-c" }
      ],
    misconceptions: [
      { misconceptionId: "E-r1-a", description: "Student answers 7 1/3, adding 5 and 2 1/3 instead of subtracting.", rootCause: "Operation-Reversal — adds 5 and 2 1/3 together instead of subtracting to find the missing number, misreading what 'subtracted from 5' is asking for.", remediation: "Have the student restate the problem as an equation, 5 - □ = 2 1/3, then solve for □ by rearranging." },
      { misconceptionId: "E-r1-b", description: "Student answers 3 2/3, miscomputing the subtraction.", rootCause: "Whole-Number Mismanagement — mishandles converting 5 to a fraction with the correct denominator before subtracting, producing a wrong whole-number part.", remediation: "Have the student convert 5 to thirds (15/3) before subtracting 2 1/3 (7/3), so the whole number is handled correctly." },
      { misconceptionId: "E-r1-c", description: "Student answers 2 1/3, restating the result instead of solving for the original number.", rootCause: "No-Operation — writes down the given result (2 1/3) unchanged, treating it as if it were already the answer to 'find the mixed number.'", remediation: "Have the student restate the problem as an equation and solve explicitly for the unknown, rather than restating a given value." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Set up the equation", hint: "5 minus the mixed number equals 2 1/3, so the mixed number equals 5 minus 2 1/3." },
      { level: 2, description: "Convert to a common denominator", hint: "5 = 15/3, and 2 1/3 = 7/3." },
      { level: 3, description: "Subtract", hint: "15/3 - 7/3 = 8/3 = 2 2/3." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NF.A.2"]
  },
  {
    itemId: "r2", order: 2, cluster: "EQUIV", clusterName: CLUSTER_NAMES.EQUIV,
    skillId: "EQUIV-02",
    question: "A fraction equivalent to \\(\\frac{3}{7}\\) has numerator 12. What is the denominator? Then find the sum of numerator and denominator.",
    options: [
        { text: "Denominator 28, sum 40", correct: true, feedback: "3/7 = 12/28, sum = 12+28 = 40." },
        { text: "Denominator 21, sum 33", correct: false, feedback: "3/7 = 12/28, not 12/21.", misconceptionId: "E-r2-a" },
        { text: "Denominator 28, sum 12", correct: false, feedback: "Sum is 40, not 12.", misconceptionId: "E-r2-b" },
        { text: "Denominator 24, sum 36", correct: false, feedback: "No.", misconceptionId: "E-r2-c" }
      ],
    misconceptions: [
      { misconceptionId: "E-r2-a", description: "Student answers denominator 21, sum 33, using the wrong scale factor.", rootCause: "Wrong-Multiplier — assumes a scale factor of 3 (7×3=21) doesn't match the numerator scale (12=3×4, requiring ×4), applying an inconsistent multiplier between numerator and denominator.", remediation: "Have the student first find the multiplier from the numerator (3→12 is ×4), then apply that SAME multiplier to the denominator (7×4=28)." },
      { misconceptionId: "E-r2-b", description: "Student correctly finds the denominator but reports the wrong sum.", rootCause: "Sum-Miscalculation — correctly finds the denominator (28) but then reports an incorrect sum, perhaps confusing 'sum' with the numerator alone (12).", remediation: "Have the student explicitly add both numbers, 12 and 28, as a separate final step after finding the denominator." },
      { misconceptionId: "E-r2-c", description: "Student answers denominator 24, sum 36, using an incorrect multiplier throughout.", rootCause: "Wrong-Multiplier — uses an incorrect scale factor (e.g., assuming 12 came from 3×4 correctly, but then multiplying 7 by a different number, like something yielding 24), producing a denominator that doesn't match the true equivalent fraction.", remediation: "Have the student verify their fraction by cross-multiplying with 3/7: does numerator×7 equal denominator×3?" }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the scale factor", hint: "3 was multiplied by something to get 12. What is it?" },
      { level: 2, description: "Apply it to the denominator", hint: "3×4=12, so multiply 7 by 4 too: 7×4=28." },
      { level: 3, description: "Find the sum", hint: "12 + 28 = 40." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.NF.A.1"]
  },
  {
    itemId: "r3", order: 3, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    skillId: "COMP-02",
    question: "Arrange in descending order: \\(\\frac{11}{8}, 1\\frac{1}{4}, \\frac{5}{3}\\).",
    options: [
        { text: "\\(\\frac{5}{3}, \\frac{11}{8}, 1\\frac{1}{4}\\)", correct: true, feedback: "5/3≈1.667, 11/8=1.375, 1 1/4=1.25. Descending: 5/3, 11/8, 1 1/4." },
        { text: "\\(\\frac{11}{8}, 1\\frac{1}{4}, \\frac{5}{3}\\)", correct: false, feedback: "Ascending, not descending.", misconceptionId: "E-r3-a" },
        { text: "\\(1\\frac{1}{4}, \\frac{11}{8}, \\frac{5}{3}\\)", correct: false, feedback: "Increasing order.", misconceptionId: "E-r3-b" },
        { text: "\\(\\frac{5}{3}, 1\\frac{1}{4}, \\frac{11}{8}\\)", correct: false, feedback: "11/8 > 1 1/4.", misconceptionId: "E-r3-c" }
      ],
    misconceptions: [
      { misconceptionId: "E-r3-a", description: "Student orders the values from smallest to largest.", rootCause: "Direction-Reversal — correctly converts and compares the three values but arranges smallest-to-largest instead of largest-to-smallest, reversing what 'descending' means.", remediation: "Have the student picture a staircase going down and label the top step 'largest' before ordering." },
      { misconceptionId: "E-r3-b", description: "Student orders the values from smallest to largest, same direction error.", rootCause: "Direction-Reversal — same mistake of arranging ascending instead of descending.", remediation: "Have the student explicitly write 'largest first' at the top of their answer before listing the values." },
      { misconceptionId: "E-r3-c", description: "Student places 1 1/4 before 11/8, mis-ordering the last two values.", rootCause: "Mixed-Improper Mismatch — doesn't fully convert the mixed number 1 1/4 to a comparable form before comparing it to 11/8, misjudging which is larger.", remediation: "Have the student convert every value, including the mixed number, to decimals or a common denominator before comparing any of them." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Convert to a common form", hint: "Convert all three values to decimals or a common denominator." },
      { level: 2, description: "Compute the values", hint: "5/3≈1.67, 11/8=1.375, 1 1/4=1.25." },
      { level: 3, description: "Order them", hint: "1.67 > 1.375 > 1.25, so the descending order is 5/3, 11/8, 1 1/4." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.NF.A.2"]
  },
  {
    itemId: "r4", order: 4, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    skillId: "ADDSUB-04",
    question: "\\(\\frac{2}{5} + ? - \\frac{1}{10} = \\frac{3}{10}\\). Find ?.",
    options: [
        { text: "0", correct: true, feedback: "2/5 = 4/10. 4/10 + ? - 1/10 = 3/10 → ? + 3/10 = 3/10 → ? = 0." },
        { text: "\\(\\frac{1}{5}\\)", correct: false, feedback: "2/10 would give 5/10, not 3/10.", misconceptionId: "E-r4-a" },
        { text: "\\(\\frac{1}{10}\\)", correct: false, feedback: "Then sum would be 4/10.", misconceptionId: "E-r4-b" },
        { text: "\\(\\frac{2}{5}\\)", correct: false, feedback: "Too large.", misconceptionId: "E-r4-c" }
      ],
    misconceptions: [
      { misconceptionId: "E-r4-a", description: "Student answers 1/5, guessing a positive value without solving the equation algebraically.", rootCause: "Equation-Not-Solved — guesses a plausible-looking small fraction instead of algebraically isolating the unknown by rearranging the equation.", remediation: "Have the student rearrange the equation explicitly: ? = 3/10 - 2/5 + 1/10, then compute each term with a common denominator." },
      { misconceptionId: "E-r4-b", description: "Student answers 1/10, another guess without solving algebraically.", rootCause: "Equation-Not-Solved — picks a fraction that appears elsewhere in the problem (1/10) rather than actually isolating the unknown through algebraic rearrangement.", remediation: "Have the student substitute their guess back into the original equation to check whether 2/5 + guess - 1/10 truly equals 3/10." },
      { misconceptionId: "E-r4-c", description: "Student answers 2/5, reusing a known value from the equation instead of solving for the unknown.", rootCause: "Known-Value Reuse — copies one of the given fractions (2/5) as the answer instead of solving the equation, perhaps confusing which term is unknown.", remediation: "Have the student clearly mark which symbol in the equation is the unknown (the '?') before attempting to solve for it." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Convert to a common denominator", hint: "2/5 = 4/10." },
      { level: 2, description: "Rearrange the equation", hint: "4/10 + ? - 1/10 = 3/10, so ? = 3/10 - 4/10 + 1/10." },
      { level: 3, description: "Compute", hint: "3/10 - 4/10 + 1/10 = 0/10 = 0." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NF.A.2"]
  },
  {
    itemId: "r5", order: 5, cluster: "MUL", clusterName: CLUSTER_NAMES.MUL,
    skillId: "MUL-03",
    question: "A container is \\(\\frac{3}{4}\\) full. \\(\\frac{2}{3}\\) of the liquid is poured out. What fraction of the container remains full?",
    options: [
        { text: "\\(\\frac{1}{4}\\)", correct: true, feedback: "Poured out: 2/3 × 3/4 = 1/2. Remaining: 3/4 - 1/2 = 1/4." },
        { text: "\\(\\frac{1}{2}\\)", correct: false, feedback: "That's the amount poured out.", misconceptionId: "E-r5-a" },
        { text: "\\(\\frac{1}{3}\\)", correct: false, feedback: "Incorrect.", misconceptionId: "E-r5-b" },
        { text: "\\(\\frac{2}{3}\\)", correct: false, feedback: "The fraction poured out.", misconceptionId: "E-r5-c" }
      ],
    misconceptions: [
      { misconceptionId: "E-r5-a", description: "Student answers 1/2, reporting the amount poured out rather than the amount remaining.", rootCause: "Wrong-Quantity Reported — correctly computes the amount poured out (2/3×3/4=1/2) but reports it directly as the final answer, without subtracting it from the original 3/4 to find what remains.", remediation: "Have the student underline the actual question ('what fraction remains') and treat the poured-out calculation as only an intermediate step." },
      { misconceptionId: "E-r5-b", description: "Student answers 1/3, miscomputing either the multiplication or the subtraction.", rootCause: "Computation-Error — miscalculates one of the two steps, perhaps confusing 2/3 poured out of 3/4 with a simpler fraction relationship, landing on 1/3 instead of the correct 1/4.", remediation: "Have the student compute and write down each step separately: 2/3×3/4=1/2 (poured out), then 3/4-1/2=1/4 (remaining)." },
      { misconceptionId: "E-r5-c", description: "Student answers 2/3, the fraction poured out relative to the liquid present, not the fraction remaining of the whole container.", rootCause: "Reference-Whole Confusion — reports 2/3 (the fraction of the LIQUID that was poured out) directly, without multiplying by 3/4 to convert it into a fraction of the whole container, and without then subtracting from the original amount.", remediation: "Have the student draw a diagram: shade 3/4 of the container as the starting liquid, then shade 2/3 of THAT shaded region as poured out, and see what's left unshaded." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the amount poured out", hint: "2/3 of 3/4 means 2/3 × 3/4 = 6/12 = 1/2." },
      { level: 2, description: "Identify what's being asked", hint: "The question asks what fraction REMAINS, not how much was poured out." },
      { level: 3, description: "Subtract", hint: "3/4 - 1/2 = 3/4 - 2/4 = 1/4." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NF.B.4.A", "CCSS.MATH.CONTENT.5.NF.B.6"]
  },
  {
    itemId: "r6", order: 6, cluster: "DIV", clusterName: CLUSTER_NAMES.DIV,
    skillId: "DIV-02",
    question: "How many \\(\\frac{2}{5}\\) m pieces can be cut from a 3 m ribbon? How much is left?",
    options: [
        { text: "7 pieces, \\(\\frac{1}{5}\\) m left", correct: true, feedback: "3 ÷ 2/5 = 15/2 = 7.5. 7 full pieces. 0.5 × 2/5 = 1/5 m left." },
        { text: "7 pieces, 0 m left", correct: false, feedback: "There is a remainder.", misconceptionId: "E-r6-a" },
        { text: "8 pieces", correct: false, feedback: "Not enough ribbon.", misconceptionId: "E-r6-b" },
        { text: "6 pieces, \\(\\frac{1}{2}\\) m left", correct: false, feedback: "Incorrect division.", misconceptionId: "E-r6-c" }
      ],
    misconceptions: [
      { misconceptionId: "E-r6-a", description: "Student answers 7 pieces with 0 m left, assuming the division comes out exact when it doesn't.", rootCause: "Assumed-Exact-Division — correctly finds 7 as the piece count but assumes there's no remainder, without checking that 3÷2/5=15/2=7.5, which means there IS leftover ribbon.", remediation: "Have the student verify by multiplying back: 7 pieces × 2/5 m = 14/5 m = 2.8 m, which is less than the original 3 m, so there must be 0.2 m (=1/5 m) left over." },
      { misconceptionId: "E-r6-b", description: "Student answers 8 pieces, overcounting the number of full pieces.", rootCause: "Rounding-Up Error — rounds the division result 7.5 up to 8 instead of down to 7, not realizing only FULL pieces count and a partial piece is leftover, not an extra full piece.", remediation: "Have the student verify by multiplying back: 8 pieces × 2/5 m = 16/5 m = 3.2 m, which is MORE than the original 3 m ribbon — an impossible result that flags the error." },
      { misconceptionId: "E-r6-c", description: "Student answers 6 pieces with 1/2 m left, undercounting the number of full pieces.", rootCause: "Division-Miscalculation — miscomputes 3÷2/5, perhaps using an incorrect reciprocal, and undercounts both the number of pieces and the leftover amount.", remediation: "Have the student recompute the division carefully: 3 ÷ 2/5 = 3 × 5/2 = 15/2 = 7.5, confirming 7 full pieces with 0.5 of a piece (1/5 m) left over." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Turn the divisor into a reciprocal", hint: "Dividing by 2/5 is the same as multiplying by 5/2." },
      { level: 2, description: "Multiply", hint: "3 × 5/2 = 15/2 = 7.5." },
      { level: 3, description: "Interpret the remainder", hint: "7 full pieces fit, with 0.5 of a piece left — that's 0.5 × 2/5 = 1/5 m." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NF.B.7.C"]
  },
  {
    itemId: "r7", order: 7, cluster: "TYPES", clusterName: CLUSTER_NAMES.TYPES,
    skillId: "FRA-T3",
    question: "\\(\\frac{5}{8}\\) of a number is 20. Find the number.",
    options: [
        { text: "32", correct: true, feedback: "20 × 8/5 = 32." },
        { text: "12.5", correct: false, feedback: "You multiplied by 5/8.", misconceptionId: "E-r7-a" },
        { text: "20", correct: false, feedback: "No operation.", misconceptionId: "E-r7-b" },
        { text: "40", correct: false, feedback: "Incorrect.", misconceptionId: "E-r7-c" }
      ],
    misconceptions: [
      { misconceptionId: "E-r7-a", description: "Student answers 12.5, multiplying 20 by 5/8 instead of dividing.", rootCause: "Operation-Reversal — multiplies 20 by 5/8 instead of dividing, applying the given fraction the wrong direction and producing a value smaller than 20 instead of larger.", remediation: "Have the student reason about size first: since 5/8 of the number is 20, the whole number must be BIGGER than 20, so the answer should never come out smaller." },
      { misconceptionId: "E-r7-b", description: "Student answers 20, reporting the given part rather than solving for the whole.", rootCause: "No-Operation — writes down 20 unchanged, treating the 'part' given in the problem as if it were already the answer to 'find the number.'", remediation: "Have the student restate the problem as an equation, 5/8 × N = 20, and solve explicitly for N rather than restating the given value." },
      { misconceptionId: "E-r7-c", description: "Student answers 40, using an incorrect multiplier.", rootCause: "Wrong-Multiplier — multiplies 20 by an incorrect factor (e.g., 2) instead of the correct reciprocal 8/5, overshooting or undershooting the correct answer of 32.", remediation: "Have the student state the reciprocal of 5/8 explicitly (8/5) before multiplying 20 by it." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Set up the equation", hint: "5/8 × N = 20, where N is the unknown number." },
      { level: 2, description: "Divide by the fraction", hint: "N = 20 ÷ 5/8, which is the same as 20 × 8/5." },
      { level: 3, description: "Multiply", hint: "20 × 8/5 = 160/5 = 32." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NF.B.3"]
  },
  {
    itemId: "r8", order: 8, cluster: "EQUIV", clusterName: CLUSTER_NAMES.EQUIV,
    skillId: "EQUIV-03",
    question: "Which fraction is equivalent to \\(\\frac{9}{12}\\)? \\(\\frac{12}{15}, \\frac{10}{14}, \\frac{15}{20}, \\frac{18}{22}\\)",
    options: [
        { text: "\\(\\frac{15}{20}\\)", correct: true, feedback: "15/20 = 3/4, same as 9/12 = 3/4." },
        { text: "\\(\\frac{12}{15}\\)", correct: false, feedback: "12/15 = 4/5.", misconceptionId: "E-r8-a" },
        { text: "\\(\\frac{10}{14}\\)", correct: false, feedback: "10/14 = 5/7.", misconceptionId: "E-r8-b" },
        { text: "\\(\\frac{18}{22}\\)", correct: false, feedback: "18/22 = 9/11.", misconceptionId: "E-r8-c" }
      ],
    misconceptions: [
      { misconceptionId: "E-r8-a", description: "Student picks 12/15, which simplifies to 4/5, not 3/4.", rootCause: "Simplification-Skipped — picks an option without simplifying it to check against 9/12's simplified form (3/4), missing that 12/15 actually reduces to 4/5.", remediation: "Have the student simplify 9/12 first (to 3/4), then simplify EVERY option and compare against that target." },
      { misconceptionId: "E-r8-b", description: "Student picks 10/14, which simplifies to 5/7, not 3/4.", rootCause: "Simplification-Skipped — same verification step is skipped, missing that 10/14 reduces to 5/7, not 3/4.", remediation: "Practice the simplification check explicitly: 10÷2=5 and 14÷2=7, confirming 10/14=5/7≠3/4." },
      { misconceptionId: "E-r8-c", description: "Student picks 18/22, which simplifies to 9/11, not 3/4.", rootCause: "Simplification-Skipped — same verification step is skipped, missing that 18/22 reduces to 9/11, not 3/4.", remediation: "Have the student divide 18 and 22 by their common factor 2 to confirm 18/22=9/11≠3/4 before ruling it in." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Simplify the target fraction", hint: "9/12 ÷ 3 = 3/4." },
      { level: 2, description: "Simplify each option", hint: "Reduce 12/15, 10/14, 15/20, and 18/22 to lowest terms." },
      { level: 3, description: "Find the match", hint: "15/20 simplifies to 3/4, matching 9/12." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.NF.A.1"]
  },
  {
    itemId: "r9", order: 9, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    skillId: "COMP-03",
    question: "Three friends shared a pizza. A ate \\(\\frac{1}{3}\\), B ate \\(\\frac{2}{5}\\), C ate the rest. Who ate the most?",
    options: [
        { text: "B", correct: true, feedback: "A=10/30, B=12/30, C=8/30. B ate the most." },
        { text: "A", correct: false, feedback: "A ate 10/30, less than B.", misconceptionId: "E-r9-a" },
        { text: "C", correct: false, feedback: "C ate 8/30, the least.", misconceptionId: "E-r9-b" },
        { text: "All equal", correct: false, feedback: "Different amounts.", misconceptionId: "E-r9-c" }
      ],
    misconceptions: [
      { misconceptionId: "E-r9-a", description: "Student picks A, without correctly computing C's share or converting to a common denominator.", rootCause: "Unconverted Comparison — compares 1/3 and 2/5 by their original denominators without converting to thirtieths, misjudging that A's share is largest.", remediation: "Insist on writing all three fractions in thirtieths (10/30, 12/30, 8/30) BEFORE attempting to compare them." },
      { misconceptionId: "E-r9-b", description: "Student picks C, the person who ate the least.", rootCause: "Remainder-Miscalculation — miscomputes C's share (the 'rest' after A and B) as larger than it actually is, perhaps by mishandling the subtraction 1 - 1/3 - 2/5.", remediation: "Have the student compute C's share explicitly: 1 - 10/30 - 12/30 = 30/30 - 10/30 - 12/30 = 8/30, then compare all three converted numerators." },
      { misconceptionId: "E-r9-c", description: "Student claims all three friends ate the same amount.", rootCause: "Surface-Similarity Assumption — assumes three-way splits are automatically equal shares, without computing that 1/3 and 2/5 are different fractions with an unequal remainder for C.", remediation: "Have the student compute each person's converted numerator (10, 12, 8) and confirm they are different before concluding equality." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find C's share", hint: "C ate 1 - 1/3 - 2/5 of the pizza." },
      { level: 2, description: "Convert to a common denominator", hint: "Using thirtieths: A=10/30, B=12/30, so C = 30/30-10/30-12/30 = 8/30." },
      { level: 3, description: "Compare", hint: "12/30 (B) is the largest of the three." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.NF.A.2"]
  },
  {
    itemId: "r10", order: 10, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    skillId: "ADDSUB-03",
    question: "\\(1\\frac{1}{2} + 2\\frac{2}{3} - 1\\frac{1}{4}\\) = ?",
    options: [
        { text: "\\(2\\frac{11}{12}\\)", correct: true, feedback: "3/2 + 8/3 - 5/4 = 18/12 + 32/12 - 15/12 = 35/12 = 2 11/12." },
        { text: "\\(3\\frac{1}{12}\\)", correct: false, feedback: "Too large.", misconceptionId: "E-r10-a" },
        { text: "\\(2\\frac{1}{2}\\)", correct: false, feedback: "Incorrect.", misconceptionId: "E-r10-b" },
        { text: "\\(1\\frac{11}{12}\\)", correct: false, feedback: "You forgot the whole number from the first two fractions.", misconceptionId: "E-r10-c" }
      ],
    misconceptions: [
      { misconceptionId: "E-r10-a", description: "Student answers 3 1/12, overcounting the final sum.", rootCause: "Numerator-Addition-Error — after correctly converting all three terms to twelfths (18/12, 32/12, 15/12), miscombines the numerators as 37 instead of 35, overshooting by 2.", remediation: "Have the student compute the running total step by step: 18+32=50, then 50-15=35, checking each intermediate step." },
      { misconceptionId: "E-r10-b", description: "Student answers 2 1/2, substantially miscalculating the combination.", rootCause: "Common-Denominator Error — uses an incorrect common denominator or mishandles one of the three conversions, producing a value far from the correct 2 11/12.", remediation: "Have the student find the LCM of 2, 3, and 4 explicitly (12) and convert ALL THREE terms to twelfths before combining." },
      { misconceptionId: "E-r10-c", description: "Student answers 1 11/12, dropping a whole number from the running total.", rootCause: "Whole-Number-Drop — correctly computes the fractional part (11/12) but loses track of one of the whole-number contributions during the multi-step combination, undercounting by 1.", remediation: "Have the student track the whole-number and fractional parts of the running total separately at each step, rather than trying to combine everything at once." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Convert all three mixed numbers", hint: "1 1/2 = 3/2, 2 2/3 = 8/3, 1 1/4 = 5/4." },
      { level: 2, description: "Find a common denominator", hint: "The LCM of 2, 3, and 4 is 12: 3/2=18/12, 8/3=32/12, 5/4=15/12." },
      { level: 3, description: "Combine", hint: "18/12 + 32/12 - 15/12 = 35/12 = 2 11/12." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NF.A.1"]
  },
  {
    itemId: "r11", order: 11, cluster: "MUL", clusterName: CLUSTER_NAMES.MUL,
    skillId: "MUL-03",
    question: "A recipe for 6 uses \\(\\frac{2}{3}\\) cup oil. How much for 15?",
    options: [
        { text: "\\(1\\frac{2}{3}\\) cups", correct: true, feedback: "Per serving: 2/3 ÷ 6 = 2/18 = 1/9. ×15 = 15/9 = 5/3 = 1 2/3." },
        { text: "\\(\\frac{5}{3}\\) cup", correct: false, feedback: "That's the same value as 1 2/3, but not written as a mixed number.", misconceptionId: "E-r11-a" },
        { text: "\\(\\frac{2}{3}\\) cup", correct: false, feedback: "That's for 6.", misconceptionId: "E-r11-b" },
        { text: "\\(3\\frac{1}{3}\\) cups", correct: false, feedback: "Too large.", misconceptionId: "E-r11-c" }
      ],
    misconceptions: [
      { misconceptionId: "E-r11-a", description: "Student answers 5/3 cup, the correct value but not converted to a mixed number.", rootCause: "Improper-Fraction-Left-Unconverted — correctly computes the amount as 5/3 but doesn't convert it to the requested mixed-number form, 1 2/3.", remediation: "Teach the default habit: always convert an improper fraction answer to a mixed number as the final step, especially for measurement quantities." },
      { misconceptionId: "E-r11-b", description: "Student answers 2/3 cup, reusing the amount for 6 servings without scaling.", rootCause: "Scaling-Skipped — reports the original amount for 6 servings unchanged, not recognizing that 15 servings requires a proportionally larger amount.", remediation: "Have the student find the amount per ONE serving first (2/3÷6=1/9), so the scaling step to 15 servings becomes unavoidable." },
      { misconceptionId: "E-r11-c", description: "Student answers 3 1/3 cups, overshooting the correct scaled amount.", rootCause: "Wrong-Scale-Factor — scales the original amount by an incorrect factor (perhaps 15÷3=5 applied directly to 2/3, giving 10/3), rather than correctly finding the per-serving amount and scaling by 15.", remediation: "Have the student compute the exact per-serving amount (1/9 cup) and multiply by 15 explicitly, rather than estimating a scale factor." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the amount per serving", hint: "2/3 ÷ 6 = 2/18 = 1/9 cup per serving." },
      { level: 2, description: "Scale to 15 servings", hint: "Multiply the per-serving amount by 15: 1/9 × 15 = 15/9." },
      { level: 3, description: "Simplify", hint: "15/9 simplifies to 5/3 = 1 2/3 cups." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NF.B.6"]
  },
  {
    itemId: "r12", order: 12, cluster: "DIV", clusterName: CLUSTER_NAMES.DIV,
    skillId: "DIV-03",
    question: "A water tank of capacity \\(5\\frac{1}{2}\\) litres is filled using a cup of \\(\\frac{1}{4}\\) litre. How many cups?",
    options: [
        { text: "22", correct: true, feedback: "5 1/2 = 11/2. ÷ 1/4 = 11/2 × 4 = 22." },
        { text: "11", correct: false, feedback: "You divided by 1/2 instead.", misconceptionId: "E-r12-a" },
        { text: "44", correct: false, feedback: "You multiplied by 4 twice.", misconceptionId: "E-r12-b" },
        { text: "5", correct: false, feedback: "No.", misconceptionId: "E-r12-c" }
      ],
    misconceptions: [
      { misconceptionId: "E-r12-a", description: "Student answers 11, using the wrong divisor.", rootCause: "Wrong-Divisor — divides 5 1/2 by 1/2 instead of by the correct cup size 1/4, using a mismatched fraction from the mixed number's own fractional part.", remediation: "Have the student underline the cup size given in the question (1/4) and confirm that's the divisor being used, not a fraction copied from elsewhere in the problem." },
      { misconceptionId: "E-r12-b", description: "Student answers 44, applying the reciprocal multiplier twice.", rootCause: "Double-Reciprocal — multiplies by 4 (the reciprocal of 1/4) twice instead of once, perhaps by first converting incorrectly and then multiplying by 4 again.", remediation: "Have the student perform the reciprocal multiplication as a single clean step: 11/2 × 4 = 44/2, and simplify once at the end." },
      { misconceptionId: "E-r12-c", description: "Student answers 5, likely reporting only the whole-number part of the tank's capacity.", rootCause: "Whole-Number-Only Focus — uses only the whole-number part of 5 1/2 (i.e., 5) and ignores the 1/2 litre, then fails to correctly divide by the cup size.", remediation: "Have the student convert 5 1/2 to the improper fraction 11/2 FIRST, ensuring the 1/2 litre isn't dropped before dividing by 1/4." }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Convert to an improper fraction", hint: "5 1/2 = 11/2." },
      { level: 2, description: "Turn the divisor into a reciprocal", hint: "Dividing by 1/4 is the same as multiplying by 4." },
      { level: 3, description: "Multiply", hint: "11/2 × 4 = 44/2 = 22 cups." }
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
    title: "Fractions — Problem-Solving & Synthesis",
    subtitle: "Telangana & Cambridge · Level 3 · Problem-Solving & Synthesis",
    description: "Multi-step fraction reasoning: reverse operations, fraction-of-a-number problems, order of operations (BODMAS), and word problems combining multiplication and division of fractions.",
    clusterNames: CLUSTER_NAMES,
    gateReviewHTML: '<strong>Quick Review — Synthesis Tips</strong><br>' +
      "&bull; Convert mixed numbers to improper fractions when adding, subtracting, or comparing.<br>" +
      "&bull; Work backwards when a fraction of a number is given to find the original.<br>" +
      "&bull; Use LCM to compare or order fractions with unlike denominators.<br>" +
      "&bull; Remember order of operations: multiply before adding or subtracting.<br>" +
      "&bull; Word problems: read carefully — are you finding a fraction of a whole, or a fraction of a remainder?<br>",
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

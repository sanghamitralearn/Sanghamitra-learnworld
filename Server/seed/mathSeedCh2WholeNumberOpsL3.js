// seed/mathSeedCh2WholeNumberOpsL3.js
//
// Populates math_chapters and math_questions with Grade 5, Chapter 2
// (Operations on Whole Numbers), Level 3 — converted from the standalone
// HTML file ch-2-whole-number-ops-3.html.
//
// Run with: node seed/mathSeedCh2WholeNumberOpsL3.js

const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-5";
const GRADE_LABEL = "Grade 5";
const CHAPTER_SLUG = "ch-2-whole-number-ops";
const CHAPTER_NAME = "Operations on Whole Numbers";
const LEVEL = 3;

const CLUSTER_NAMES = {
  ADDSUB: "Addition & Subtraction",
  MULT: "Multiplication",
  DIV: "Division",
  POW10: "× and ÷ by 10, 100, 1000",
  EST: "Estimation",
  WORD: "Word Problems"
};

const warmupItems = [
  {
    itemId: "w1", order: 1, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    skillId: "ADDSUB-04",
    question: "The sum of two numbers is 9,87,654 and their difference is 1,23,456. What is the smaller number?",
    options: [
        { text: "4,32,099", correct: true, feedback: "Larger = (sum + diff)/2 = (9,87,654+1,23,456)/2 = 5,55,555; smaller = sum - larger = 4,32,099." },
        { text: "5,55,555", correct: false, feedback: "That's the larger number.", misconceptionId: "E-w1-a" },
        { text: "4,32,000", correct: false, feedback: "Approximation; exact value is needed.", misconceptionId: "E-w1-b" },
        { text: "5,55,000", correct: false, feedback: "Rough estimate, not exact.", misconceptionId: "E-w1-c" }
      ],
    retryHint: "Find the larger number first: (sum + difference) ÷ 2.",
    misconceptions: [
      {
        misconceptionId: "E-w1-a",
        description: "Student answers 5,55,555, which is the LARGER of the two numbers, not the smaller one the question asks for.",
        rootCause: "Wrong Number Selected — the sum-and-difference method was applied correctly to find both numbers, but the larger one was reported instead of the smaller one requested.",
        remediation: "Have the student find and label BOTH numbers explicitly — 'larger = (sum+diff)/2' and 'smaller = sum − larger' — before answering, then re-read the question to see which one is being asked for."
      },
      {
        misconceptionId: "E-w1-b",
        description: "Student answers 4,32,000, close to but not exactly equal to the correct 4,32,099.",
        rootCause: "Exact-vs-Estimate Confusion — the student rounded the final answer instead of computing (sum+diff)/2 and sum−larger exactly.",
        remediation: "Require every step of the sum-and-difference method to be shown with exact numbers, with no rounding at any stage."
      },
      {
        misconceptionId: "E-w1-c",
        description: "Student answers 5,55,000, close to the larger number (5,55,555) but rounded, and still not the smaller number requested.",
        rootCause: "Combined Error — this both reports the wrong number (the larger, not the smaller) AND rounds it instead of using the exact value.",
        remediation: "Have the student re-read the question to confirm which number is being asked for, then compute that specific number exactly using sum − larger."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the sum-and-difference method", hint: "If you know the sum and difference of two numbers, the larger number = (sum + difference) ÷ 2." },
      { level: 2, description: "Find the larger number", hint: "(9,87,654 + 1,23,456) ÷ 2 = ?" },
      { level: 3, description: "Find the smaller number", hint: "Smaller number = sum − larger number. Make sure you answer with the SMALLER one, as the question asks." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "WORD-04", probability: 0.4, condition: "Multi-step reasoning problems build on comfortably distinguishing which derived quantity is being asked for." }
    ],
    learningObjectives: ["CCSS.MATH.4.OA.A.3"]
  },
  {
    itemId: "w2", order: 2, cluster: "MULT", clusterName: CLUSTER_NAMES.MULT,
    skillId: "MULT-05",
    question: "Multiply 999 by 99, then divide the result by 9. What is the final answer?",
    options: [
        { text: "10,989", correct: true, feedback: "999 × 99 = 98,901; ÷9 = 10,989." },
        { text: "1,09,989", correct: false, feedback: "You forgot to divide by 9.", misconceptionId: "E-w2-a" },
        { text: "9,999", correct: false, feedback: "That's 999 × 10, not 99.", misconceptionId: "E-w2-b" },
        { text: "11,000", correct: false, feedback: "Estimate only.", misconceptionId: "E-w2-c" }
      ],
    retryHint: "999 × 99 = 999 × (100 - 1) = 99,900 - 999 = 98,901; then divide by 9.",
    misconceptions: [
      {
        misconceptionId: "E-w2-a",
        description: "Student answers 1,09,989, which is close to 999 × 99 = 98,901 but not exactly matching — and clearly the '÷9' step was never applied to reach the much smaller correct answer of 10,989.",
        rootCause: "Incomplete Multi-Step — the multiplication step was attempted, but the required division by 9 was skipped entirely.",
        remediation: "Have the student underline both operations in the instruction ('multiply... then divide...') and check off each as it's completed."
      },
      {
        misconceptionId: "E-w2-b",
        description: "Student answers 9,999, which is 999 × 10, not 999 × 99 at all.",
        rootCause: "Multiplier Misread — the student used 10 in place of 99 for the multiplication, then likely never proceeded to the division step either.",
        remediation: "Have the student re-read the problem and confirm the exact multiplier (99) before starting, writing '999 × 99' explicitly."
      },
      {
        misconceptionId: "E-w2-c",
        description: "Student answers 11,000, close to but not equal to the exact answer 10,989.",
        rootCause: "Exact-vs-Estimate Confusion — the student estimated a round number instead of computing 999 × 99 ÷ 9 exactly.",
        remediation: "Require the exact multiplication (using the 999 × 99 = 999 × 100 − 999 shortcut) and the exact division to be shown as separate written steps."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Use a shortcut for ×99", hint: "999 × 99 = 999 × 100 − 999. This avoids long multiplication." },
      { level: 2, description: "Compute the multiplication", hint: "999 × 100 = 99,900. Subtract 999 from that." },
      { level: 3, description: "Divide by 9", hint: "Take your product and divide it by 9 to get the final answer." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "MULT-01", probability: 0.3, condition: "Standard long multiplication remains needed when a shortcut like ×99 isn't recognized." }
    ],
    learningObjectives: ["CCSS.MATH.5.NBT.B.5"]
  },
  {
    itemId: "w3", order: 3, cluster: "DIV", clusterName: CLUSTER_NAMES.DIV,
    skillId: "DIV-03",
    question: "A number divided by 37 gives quotient 123 and remainder 29. Multiply that number by 10. What do you get?",
    options: [
        { text: "45,800", correct: true, feedback: "Number = 37×123+29 = 4,551+29 = 4,580; ×10 = 45,800." },
        { text: "4,580", correct: false, feedback: "That's the original number, not multiplied by 10.", misconceptionId: "E-w3-a" },
        { text: "4,551", correct: false, feedback: "You forgot to add the remainder.", misconceptionId: "E-w3-b" },
        { text: "45,790", correct: false, feedback: "Miscalculation: 37×123 = 4,551, remainder 29, so number = 4,580.", misconceptionId: "E-w3-c" }
      ],
    retryHint: "First reconstruct the dividend: divisor × quotient + remainder. Then multiply by 10.",
    misconceptions: [
      {
        misconceptionId: "E-w3-a",
        description: "Student answers 4,580, the correctly reconstructed original number, with the final '× 10' step never performed.",
        rootCause: "Incomplete Multi-Step — the reconstruction (37 × 123 + 29) was done correctly, but the follow-up multiplication by 10 was skipped.",
        remediation: "Have the student underline every instruction in the problem — 'find the number, then multiply by 10' — and check off each part as it's completed."
      },
      {
        misconceptionId: "E-w3-b",
        description: "Student answers 4,551, exactly 37 × 123, the multiplication step with the remainder (29) never added.",
        rootCause: "Incomplete Reconstruction — the multiplication (divisor × quotient) was done correctly, but the remainder was not added to reconstruct the full original number.",
        remediation: "Have the student write the reconstruction formula explicitly — number = divisor × quotient + remainder — before doing anything else."
      },
      {
        misconceptionId: "E-w3-c",
        description: "Student answers 45,790, which doesn't match 4,580 × 10 = 45,800; it's 10 less than correct.",
        rootCause: "Final Multiplication Slip — the reconstruction (4,580) was likely correct, but multiplying by 10 was carried out with a small error, landing 10 short.",
        remediation: "Remind the student that multiplying by 10 just appends a single zero to the whole number — 4,580 → 45,800."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Reconstruct the number first", hint: "Number = divisor × quotient + remainder = 37 × 123 + 29." },
      { level: 2, description: "Compute step by step", hint: "37 × 123 = ? Then add 29 to that." },
      { level: 3, description: "Multiply by 10", hint: "Take your reconstructed number and append a zero to multiply by 10." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "DIV-05", probability: 0.3, condition: "Remainder-based reasoning problems build on comfortably reconstructing dividends." }
    ],
    learningObjectives: ["CCSS.MATH.5.NBT.B.6"]
  },
  {
    itemId: "w4", order: 4, cluster: "POW10", clusterName: CLUSTER_NAMES.POW10,
    skillId: "POW10-04",
    question: "How many ₹50 notes make ₹2,50,000?",
    options: [
        { text: "5,000", correct: true, feedback: "2,50,000 ÷ 50 = 5,000 notes." },
        { text: "500", correct: false, feedback: "You divided by 500 instead of 50.", misconceptionId: "E-w4-a" },
        { text: "50,000", correct: false, feedback: "You multiplied by 10 instead of dividing.", misconceptionId: "E-w4-b" },
        { text: "5,500", correct: false, feedback: "Incorrect calculation.", misconceptionId: "E-w4-c" }
      ],
    retryHint: "Divide the total amount by the value of one note.",
    misconceptions: [
      {
        misconceptionId: "E-w4-a",
        description: "Student answers 500 — this is 2,50,000 ÷ 500, one zero too many in the divisor for dividing by 50.",
        rootCause: "Zero-Count Error — an extra zero was included in the divisor (500 instead of 50), making the quotient ten times too small.",
        remediation: "Have the student re-read the note value (₹50, not ₹500) before dividing, writing it down explicitly first."
      },
      {
        misconceptionId: "E-w4-b",
        description: "Student answers 50,000, which equals 2,50,000 ÷ 5, not ÷50 — ten times too large.",
        rootCause: "Wrong-Operation / Zero-Count Error — the student divided by 5 instead of 50 (or otherwise multiplied when they should have divided), producing an answer ten times too large.",
        remediation: "Have the student check with a smaller example first ('how many ₹50 notes make ₹500?' → 500 ÷ 50 = 10) before applying the same reasoning to ₹2,50,000."
      },
      {
        misconceptionId: "E-w4-c",
        description: "Student answers 5,500, which doesn't match any clean division of 2,50,000 by 50.",
        rootCause: "Division Slip — the long division 2,50,000 ÷ 50 was carried out with an error, rather than using the zero-cancellation shortcut (2,50,000 ÷ 50 = 25,000 ÷ 5 = 5,000).",
        remediation: "Teach the shortcut: cancel one zero from both the dividend and divisor first (2,50,000 ÷ 50 becomes 25,000 ÷ 5), which is much easier to compute."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Set up the division", hint: "Number of notes = total amount ÷ value of one note = 2,50,000 ÷ 50." },
      { level: 2, description: "Simplify by cancelling a zero", hint: "2,50,000 ÷ 50 is the same as 25,000 ÷ 5 (cancel one zero from each)." },
      { level: 3, description: "Divide the simplified numbers", hint: "25,000 ÷ 5 = ?" }
    ],
    forwardRiskLinks: [
      { targetSkillId: "WORD-04", probability: 0.4, condition: "Currency word problems rely on this same total-divided-by-unit-value reasoning." }
    ],
    learningObjectives: ["CCSS.MATH.5.NBT.A.2"]
  },
  {
    itemId: "w5", order: 5, cluster: "EST", clusterName: CLUSTER_NAMES.EST,
    skillId: "EST-04",
    question: "Estimate 498 × 312 by rounding both to the nearest 100. Then find the difference between the exact product and your estimate.",
    options: [
        { text: "5,376", correct: true, feedback: "Estimate: 500×300=1,50,000. Exact: 498×312=1,55,376. Difference = 5,376." },
        { text: "1,50,000", correct: false, feedback: "That's the estimate, not the difference.", misconceptionId: "E-w5-a" },
        { text: "1,55,376", correct: false, feedback: "That's the exact product, not the difference.", misconceptionId: "E-w5-b" },
        { text: "5,000", correct: false, feedback: "Approximation of the difference, not exact.", misconceptionId: "E-w5-c" }
      ],
    retryHint: "Compute the estimate, then compute the exact product, then subtract.",
    misconceptions: [
      {
        misconceptionId: "E-w5-a",
        description: "Student answers 1,50,000, which is only the estimate, with the final 'find the difference' step never performed.",
        rootCause: "Incomplete Multi-Step — the estimate was found correctly, but the required comparison (exact − estimate) was skipped.",
        remediation: "Have the student underline all three required results — estimate, exact, and difference — and confirm all three are computed before answering."
      },
      {
        misconceptionId: "E-w5-b",
        description: "Student answers 1,55,376, which is only the exact product, with the estimate and the difference between them never computed.",
        rootCause: "Wrong Component Selected — the student reported the exact product alone, missing that the question asks for the DIFFERENCE between exact and estimate.",
        remediation: "Have the student compute and label both values ('estimate = ...', 'exact = ...') before subtracting one from the other."
      },
      {
        misconceptionId: "E-w5-c",
        description: "Student answers 5,000, close to but not equal to the exact difference of 5,376.",
        rootCause: "Exact-vs-Estimate Confusion — the student rounded the final difference instead of computing exact − estimate precisely.",
        remediation: "Require the exact product and the estimate to both be written out fully, then subtracted exactly, with no rounding of the final difference."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Compute the estimate", hint: "Round 498 to 500 and 312 to 300, then multiply: 500 × 300." },
      { level: 2, description: "Compute the exact product", hint: "Multiply the original numbers exactly: 498 × 312." },
      { level: 3, description: "Find the difference", hint: "Subtract the estimate from the exact product (or vice versa, whichever is larger)." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "WORD-04", probability: 0.3, condition: "Error-analysis word problems build on this same estimate-then-compare structure." }
    ],
    learningObjectives: ["CCSS.MATH.4.NBT.A.3", "CCSS.MATH.4.OA.A.3"]
  },
  {
    itemId: "w6", order: 6, cluster: "WORD", clusterName: CLUSTER_NAMES.WORD,
    skillId: "WORD-04",
    question: "Rita bought 4 shirts at ₹475 each and 3 trousers at ₹825 each. She gave ₹5,000. How much change did she get?",
    options: [
        { text: "₹625", correct: true, feedback: "4×475=1,900; 3×825=2,475; total=4,375; change=5,000-4,375=625." },
        { text: "₹4,375", correct: false, feedback: "That's the total cost, not the change.", misconceptionId: "E-w6-a" },
        { text: "₹5,000", correct: false, feedback: "No change at all would mean nothing was purchased.", misconceptionId: "E-w6-b" },
        { text: "₹1,900", correct: false, feedback: "That's only the cost of shirts.", misconceptionId: "E-w6-c" }
      ],
    retryHint: "Add the cost of all items, then subtract from the amount paid.",
    misconceptions: [
      {
        misconceptionId: "E-w6-a",
        description: "Student answers ₹4,375, exactly the total cost of all items, with the '− amount paid' step never performed.",
        rootCause: "Incomplete Multi-Step — both products and their sum were found correctly, but the final subtraction to find change was skipped.",
        remediation: "Have the student underline the question's final phrase, 'how much change did she get', and connect it to amount paid minus total cost."
      },
      {
        misconceptionId: "E-w6-b",
        description: "Student answers ₹5,000, the full amount paid, as if none of it went toward the purchase.",
        rootCause: "Operation Omission — neither the item costs nor their subtraction from the amount paid were computed; the amount tendered was reported unchanged.",
        remediation: "Have the student compute the total cost of all items first (shirts + trousers), then explicitly subtract that from ₹5,000."
      },
      {
        misconceptionId: "E-w6-c",
        description: "Student answers ₹1,900, which is only the cost of the shirts (4 × 475), ignoring the trousers entirely and not computing any change.",
        rootCause: "Missing Item — one of the two item types (trousers) was left out of the total cost calculation.",
        remediation: "Have the student list every item type mentioned in the problem (shirts AND trousers) before computing any totals, to make sure none are missed."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the cost of each item type", hint: "Shirts: 4 × ₹475. Trousers: 3 × ₹825. Compute both." },
      { level: 2, description: "Find the total cost", hint: "Add the shirts total and the trousers total." },
      { level: 3, description: "Find the change", hint: "Change = amount paid (₹5,000) − total cost." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "WORD-03", probability: 0.4, condition: "This multi-item, multiply-then-add-then-subtract structure builds on comfort with simpler two-step problems." }
    ],
    learningObjectives: ["CCSS.MATH.4.OA.A.3"]
  },
  {
    itemId: "w7", order: 7, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    skillId: "ADDSUB-04",
    question: "A 5-digit number has ten-thousands digit 3. Adding 15,000 changes the ten-thousands digit to 5. What is the smallest possible thousands digit of the original number?",
    options: [
        { text: "5", correct: true, feedback: "Adding 15,000 means adding 1 to the ten-thousands and 5 to the thousands. So the thousands digit must have been 5 (or more) to cause a carry into the ten-thousands, giving a net increase of 2 in the ten-thousands (3-5). Thus the smallest thousands digit causing a carry from thousands to ten-thousands when adding 5 is 5." },
        { text: "4", correct: false, feedback: "If thousands = 4, adding 5 gives 9, no carry; ten-thousands would stay 4 (3+1=4), not 5.", misconceptionId: "E-w7-a" },
        { text: "0", correct: false, feedback: "Then adding 5 would give 5 in thousands, no carry, ten-thousands would become 4 (3+1).", misconceptionId: "E-w7-b" },
        { text: "9", correct: false, feedback: "That would cause a carry, but it's not the smallest possible.", misconceptionId: "E-w7-c" }
      ],
    retryHint: "Think about the carry: 15,000 = 1 ten-thousand + 5 thousands. Adding this will increase the ten-thousands digit by 1, plus an additional carry if thousands + 5 ≥ 10.",
    misconceptions: [
      {
        misconceptionId: "E-w7-a",
        description: "Student answers 4. Checking: if the thousands digit were 4, adding 5 gives 4+5=9, which is less than 10, so there is no carry into the ten-thousands column, and the ten-thousands digit would only become 3+1=4, not the required 5.",
        rootCause: "Carry Threshold Not Checked — the student picked a thousands digit without verifying it actually produces a carry (i.e., thousands digit + 5 ≥ 10) that's needed to push the ten-thousands digit up by 2 instead of just 1.",
        remediation: "Have the student explicitly test their chosen digit: 'digit + 5 = ? Is that ≥ 10?' before accepting it as a valid answer."
      },
      {
        misconceptionId: "E-w7-b",
        description: "Student answers 0. Checking: 0+5=5, which is less than 10, so there's no carry, and the ten-thousands digit would only become 3+1=4, not 5.",
        rootCause: "Carry Threshold Not Checked — same issue as with 4: the student did not verify that thousands digit + 5 produces a carry, so this choice also fails to produce the required ten-thousands change.",
        remediation: "Have the student list out the required condition first — 'thousands digit + 5 must be ≥ 10' — and test each candidate digit against it before choosing the smallest that works."
      },
      {
        misconceptionId: "E-w7-c",
        description: "Student answers 9. Checking: 9+5=14 ≥ 10, so this DOES cause the required carry — but 9 is the LARGEST possible digit satisfying the condition (digit ≥ 5), not the smallest.",
        rootCause: "Extremum Confusion — the student correctly found a digit that satisfies the carry condition but picked the largest valid option instead of the smallest, as the question specifically asks for the smallest.",
        remediation: "Have the student list ALL digits from 0–9 that satisfy 'digit + 5 ≥ 10' (which is 5,6,7,8,9), and then explicitly pick the smallest one from that list, not just any valid one."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Understand what adding 15,000 does", hint: "15,000 = 1 ten-thousand + 5 thousands. Adding it always adds 1 to the ten-thousands digit — but if the thousands digit + 5 is 10 or more, there's an EXTRA carry." },
      { level: 2, description: "Find the condition for the extra carry", hint: "The ten-thousands digit needs to go up by 2 (from 3 to 5), so an extra carry from the thousands column is required: thousands digit + 5 ≥ 10." },
      { level: 3, description: "Find the smallest digit satisfying this", hint: "Which digits (0–9) make 'digit + 5 ≥ 10' true? Pick the SMALLEST one from that list." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "WORD-04", probability: 0.3, condition: "Constraint-satisfaction reasoning ('smallest/largest possible') recurs in more complex multi-step word problems." }
    ],
    learningObjectives: ["CCSS.MATH.4.OA.A.3"]
  },
  {
    itemId: "w8", order: 8, cluster: "EST", clusterName: CLUSTER_NAMES.EST,
    skillId: "EST-04",
    question: "Estimate 2,345 + 6,789 by rounding each to the nearest 100. Then find the exact sum, and calculate the difference between the exact sum and the estimate.",
    options: [
        { text: "34", correct: true, feedback: "Estimate: 2,300+6,800=9,100. Exact: 9,134. Difference = 34." },
        { text: "9,100", correct: false, feedback: "That's the estimate.", misconceptionId: "E-w8-a" },
        { text: "9,134", correct: false, feedback: "That's the exact sum.", misconceptionId: "E-w8-b" },
        { text: "66", correct: false, feedback: "You might have rounded incorrectly.", misconceptionId: "E-w8-c" }
      ],
    retryHint: "Round each number, add, then compare with the real sum.",
    misconceptions: [
      {
        misconceptionId: "E-w8-a",
        description: "Student answers 9,100, which is only the estimate, with the final 'find the difference' step never performed.",
        rootCause: "Incomplete Multi-Step — the estimate was found correctly, but the required comparison (exact − estimate) was skipped.",
        remediation: "Have the student underline all three required results — estimate, exact, and difference — and confirm all three are computed before answering."
      },
      {
        misconceptionId: "E-w8-b",
        description: "Student answers 9,134, which is only the exact sum, with the estimate and the difference between them never computed.",
        rootCause: "Wrong Component Selected — the student reported the exact sum alone, missing that the question asks for the DIFFERENCE between exact and estimate.",
        remediation: "Have the student compute and label both values ('estimate = ...', 'exact = ...') before subtracting one from the other."
      },
      {
        misconceptionId: "E-w8-c",
        description: "Student answers 66, which doesn't match the correct difference of 34; it suggests one number was rounded the wrong direction, changing the estimate.",
        rootCause: "Rounding-Direction Error — one of the two numbers was rounded incorrectly (for example, 2,345 rounded up to 2,400 instead of down to 2,300), producing a different estimate and a different final difference.",
        remediation: "Have the student re-check each rounding: 2,345's tens digit is 4 (<5, rounds down to 2,300); 6,789's tens digit is 8 (≥5, rounds up to 6,800)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Compute the estimate", hint: "Round 2,345 to 2,300 and 6,789 to 6,800, then add." },
      { level: 2, description: "Compute the exact sum", hint: "Add the original numbers exactly: 2,345 + 6,789." },
      { level: 3, description: "Find the difference", hint: "Subtract the estimate from the exact sum." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "WORD-04", probability: 0.3, condition: "Error-analysis word problems build on this same estimate-then-compare structure." }
    ],
    learningObjectives: ["CCSS.MATH.4.NBT.A.3", "CCSS.MATH.4.OA.A.3"]
  }
];

const diagnosticItems = [
  {
    itemId: "d1", order: 1, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    skillId: "ADDSUB-04",
    question: "In the addition 2,3A,456 + 4,B6,789 = 6,C7,245, the digits A, B, C are all different. If A is as small as possible, what is C?",
    options: [
        { text: "4", correct: true, feedback: "Units: 6+9=15 (carry 1). Tens: 5+8+1=14 (carry 1). Hundreds: 4+7+1=12 (carry 1). Thousands: A+6+1 = A+7 must give 7 in the sum → A=0 (no carry). Ten-thousands: 3+B+0 = C. Since lakhs sum 2+4=6, no carry. Smallest B distinct from A=0 is 1, giving C=4." },
        { text: "3", correct: false, feedback: "That would require B=0, but A=0 already, so digits not distinct.", misconceptionId: "E-d1-a" },
        { text: "5", correct: false, feedback: "If B=2, C=5; but A=0, B=2, C=5 are distinct, but A could be 0 (smallest), B can be 1 (smaller), so C=4 is smaller.", misconceptionId: "E-d1-b" },
        { text: "6", correct: false, feedback: "That would mean B=3, C=6, but smaller B possible.", misconceptionId: "E-d1-c" }
      ],
    backward: "Work column by column tracking carries; the letters stand for single digits.",
    forward: "Such puzzles build the logical reasoning needed for algebra.",
    misconceptions: [
      {
        misconceptionId: "E-d1-a",
        description: "Choosing C=3 would require B=0 (since C=3+B), but A is already forced to be 0 by the units/tens/hundreds/thousands columns, and the puzzle requires A, B, C all distinct — so B cannot also be 0.",
        rootCause: "Distinctness Constraint Overlooked — a value for B was chosen without checking that it doesn't collide with the already-determined value of A.",
        remediation: "Have the student list out the digits already used (A=0) before choosing a value for B, explicitly checking each candidate against that list."
      },
      {
        misconceptionId: "E-d1-b",
        description: "Choosing C=5 corresponds to B=2, which is a valid distinct digit (A=0, B=2, C=5 are all different) — but it's not the SMALLEST valid choice for B, since B=1 (giving C=4) also works and is smaller.",
        rootCause: "Non-Minimal Choice — a value satisfying the distinctness constraint was found, but the search for the smallest such value was stopped before checking B=1.",
        remediation: "Have the student test candidate values for B in increasing order starting from 1 (since 0 is taken), stopping at the very first one that keeps all three digits distinct."
      },
      {
        misconceptionId: "E-d1-c",
        description: "Choosing C=6 corresponds to B=3, which is valid but even further from minimal than B=2 or B=1.",
        rootCause: "Non-Minimal Choice — the student picked a larger valid value for B without first checking whether a smaller one (like B=1) also satisfies the distinctness requirement.",
        remediation: "Systematically test B=1 first (the smallest digit not yet used), and only move to larger values if B=1 fails the distinctness check."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Solve the fully-known columns first", hint: "Work out the units, tens, and hundreds columns — none of these involve unknown letters, so you can find every carry." },
      { level: 2, description: "Solve for A", hint: "The thousands column equation is A + 6 + (carry) = 7 (plus possibly 10). Find the only valid digit A." },
      { level: 3, description: "Solve for B and C together, minimizing B", hint: "The ten-thousands equation is 3 + B = C. Try the smallest B not equal to A (starting at 1), and check that the resulting C is also different from both A and B." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "WORD-04", probability: 0.3, condition: "Constraint-satisfaction reasoning recurs in more complex multi-step and logic word problems." }
    ],
    learningObjectives: ["CCSS.MATH.4.OA.A.3"]
  },
  {
    itemId: "d2", order: 2, cluster: "MULT", clusterName: CLUSTER_NAMES.MULT,
    skillId: "MULT-04",
    question: "The product of two numbers is 48,600. One number is 24 times the other. What is the larger number?",
    options: [
        { text: "1,080", correct: true, feedback: "Let small = x, large = 24x. Product = 24x² = 48,600 → x² = 2,025 → x = 45, large = 1,080." },
        { text: "45", correct: false, feedback: "That's the smaller number.", misconceptionId: "E-d2-a" },
        { text: "2,025", correct: false, feedback: "That's the square of the smaller number, not the larger.", misconceptionId: "E-d2-b" },
        { text: "540", correct: false, feedback: "Miscalculation; 48,600 ÷ 24 = 2,025, then square root is 45.", misconceptionId: "E-d2-c" }
      ],
    backward: "Divide the product by the ratio to find the square of the smaller number.",
    forward: "This is the foundation of solving equations with squares.",
    misconceptions: [
      {
        misconceptionId: "E-d2-a",
        description: "Student answers 45, which is the SMALLER of the two numbers, not the larger one the question asks for.",
        rootCause: "Wrong Number Selected — the equation 24x² = 48,600 was solved correctly to find x = 45, but the smaller number (x) was reported instead of the larger one (24x = 1,080) requested.",
        remediation: "Have the student explicitly label both numbers after solving — 'smaller = x = 45' and 'larger = 24x = 1,080' — and re-read the question to confirm which is being asked for."
      },
      {
        misconceptionId: "E-d2-b",
        description: "Student answers 2,025, which is x² (an intermediate value in solving for x), not the larger number itself.",
        rootCause: "Intermediate Value Reported — the student stopped at x² = 2,025 without taking the square root to find x, and then without multiplying by 24 to find the larger number.",
        remediation: "Have the student continue past x² = 2,025 by taking the square root to find x = 45, and only then multiply by 24 for the larger number."
      },
      {
        misconceptionId: "E-d2-c",
        description: "Student answers 540, which is 45 × 12, not matching either the smaller number (45) or the correct larger number (24 × 45 = 1,080).",
        rootCause: "Ratio Misapplied — after finding the smaller number (45), it was multiplied by the wrong factor (12, perhaps half of 24) instead of the given ratio of 24.",
        remediation: "Have the student re-read the problem's ratio ('one number is 24 times the other') and use exactly that factor when scaling up from the smaller number."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Set up the equation", hint: "Let the smaller number be x. Then the larger number is 24x, and their product is 24x² = 48,600." },
      { level: 2, description: "Solve for x²", hint: "Divide both sides by 24: x² = 48,600 ÷ 24." },
      { level: 3, description: "Find x, then the larger number", hint: "Take the square root of x² to find x (the smaller number), then multiply by 24 to get the larger number." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "MULT-01", probability: 0.3, condition: "Standard multiplication fluency is needed to verify the final answer (24 × 45 = 1,080)." }
    ],
    learningObjectives: ["CCSS.MATH.4.OA.A.3"]
  },
  {
    itemId: "d3", order: 3, cluster: "DIV", clusterName: CLUSTER_NAMES.DIV,
    skillId: "DIV-05",
    question: "A number divided by 28 gives quotient 56 and remainder R. Adding 5 to the number makes it exactly divisible by 28. What is R?",
    options: [
        { text: "23", correct: true, feedback: "Number = 28×56 + R. Adding 5 gives 28×57 = 28×56 + R + 5, so R+5 = 28 → R = 23." },
        { text: "5", correct: false, feedback: "That's the amount added, not the remainder.", misconceptionId: "E-d3-a" },
        { text: "28", correct: false, feedback: "The divisor, not the remainder.", misconceptionId: "E-d3-b" },
        { text: "33", correct: false, feedback: "R+5=28, not 33.", misconceptionId: "E-d3-c" }
      ],
    backward: "Express the number with remainder, then set up the equation for the new number.",
    forward: "This type of reasoning is used in modular arithmetic.",
    misconceptions: [
      {
        misconceptionId: "E-d3-a",
        description: "Student answers 5, which is simply the amount being added to the number, not the original remainder R that the question asks for.",
        rootCause: "Wrong Quantity Reported — the student correctly identified that 5 is added, but reported that given value instead of solving for R.",
        remediation: "Have the student set up the full equation R + 5 = 28 explicitly, and solve for R rather than reporting one of the numbers already given in the problem."
      },
      {
        misconceptionId: "E-d3-b",
        description: "Student answers 28, the divisor itself, rather than the remainder R.",
        rootCause: "Wrong Quantity Reported — the student reported the divisor (which the remainder must be LESS than) instead of solving the equation R + 5 = 28 for R.",
        remediation: "Have the student clearly label the divisor (28) separately from the unknown remainder (R) before setting up and solving the equation."
      },
      {
        misconceptionId: "E-d3-c",
        description: "Student answers 33, which equals 28 + 5, adding the divisor and the amount added instead of solving for the remainder.",
        rootCause: "Equation Misformed — instead of solving R + 5 = 28 for R (giving R = 23), the student added 28 and 5, producing an unrelated sum.",
        remediation: "Have the student re-derive the equation from the problem statement: since adding 5 makes the number exactly divisible, the remainder R plus 5 must equal the divisor exactly, so R = 28 − 5."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Express the original number", hint: "Number = 28 × 56 + R." },
      { level: 2, description: "Express the new number", hint: "New number = original number + 5 = 28 × 56 + R + 5. This is divisible by 28 exactly, meaning R + 5 must complete a whole group of 28." },
      { level: 3, description: "Solve for R", hint: "Since R + 5 must equal exactly 28 (the next multiple), solve R + 5 = 28." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "DIV-03", probability: 0.4, condition: "Reconstructing numbers from quotient and remainder is the same skill needed here in reverse." }
    ],
    learningObjectives: []
  },
  {
    itemId: "d4", order: 4, cluster: "POW10", clusterName: CLUSTER_NAMES.POW10,
    skillId: "POW10-04",
    question: "How many 25-paise coins make ₹5,000? (1 rupee = 100 paise)",
    options: [
        { text: "20,000", correct: true, feedback: "₹5,000 = 5,00,000 paise. ÷ 25 = 20,000 coins." },
        { text: "2,000", correct: false, feedback: "You divided by 250 instead of 25.", misconceptionId: "E-d4-a" },
        { text: "1,25,000", correct: false, feedback: "You multiplied by 25 instead of dividing.", misconceptionId: "E-d4-b" },
        { text: "50,000", correct: false, feedback: "That's the number of 10-paise coins, not 25-paise.", misconceptionId: "E-d4-c" }
      ],
    backward: "Convert to the same unit (paise), then divide.",
    forward: "Currency and unit conversions are everyday applications of powers of ten.",
    misconceptions: [
      {
        misconceptionId: "E-d4-a",
        description: "Student answers 2,000 — this is 5,00,000 ÷ 250, using a divisor with an extra zero compared to the correct 25.",
        rootCause: "Divisor Misread — an extra zero was included in the divisor (250 instead of 25), making the quotient ten times too small.",
        remediation: "Have the student re-read the coin value (25 paise, not 250 paise) before dividing, writing it down explicitly first."
      },
      {
        misconceptionId: "E-d4-b",
        description: "Student answers 1,25,000, which equals 5,000 × 25 — the total rupees multiplied by the coin value, instead of converting to paise and dividing.",
        rootCause: "Wrong-Operation Substitution — the student multiplied by 25 instead of dividing by it, and also skipped converting rupees to paise first.",
        remediation: "Have the student first convert ₹5,000 to paise (× 100 = 5,00,000 paise), then divide that by the coin's value (25 paise) — never multiply by the coin value."
      },
      {
        misconceptionId: "E-d4-c",
        description: "Student answers 50,000, which is exactly 5,00,000 ÷ 10 — the correct number of 10-paise coins, not 25-paise coins.",
        rootCause: "Divisor Misread — the student divided by 10 instead of 25, effectively solving for a different coin denomination.",
        remediation: "Have the student underline '25-paise' in the question before dividing, confirming the divisor used matches the coin value stated."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Convert to the same unit", hint: "₹5,000 = 5,000 × 100 = ? paise." },
      { level: 2, description: "Set up the division", hint: "Number of coins = total paise ÷ value of one coin (25 paise)." },
      { level: 3, description: "Divide", hint: "5,00,000 ÷ 25 = ? (try cancelling zeros or using 5,00,000 ÷ 25 = 20,000 ÷ 1 after simplifying)." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "WORD-04", probability: 0.4, condition: "Currency word problems rely on this same convert-then-divide reasoning." }
    ],
    learningObjectives: ["CCSS.MATH.5.NBT.A.2", "CCSS.MATH.5.MD.A.1"]
  },
  {
    itemId: "d5", order: 5, cluster: "EST", clusterName: CLUSTER_NAMES.EST,
    skillId: "EST-04",
    question: "Estimate (4,567 + 8,932) × 3 by rounding each number inside the brackets to the nearest 1,000. Then find the exact value, and calculate the difference between the estimate and the exact.",
    options: [
        { text: "1,503", correct: true, feedback: "Estimate: (5,000+9,000)=14,000; ×3 = 42,000. Exact: 4,567+8,932=13,499; ×3=40,497. Difference = 42,000 - 40,497 = 1,503." },
        { text: "42,000", correct: false, feedback: "That's the estimate.", misconceptionId: "E-d5-a" },
        { text: "40,497", correct: false, feedback: "That's the exact value.", misconceptionId: "E-d5-b" },
        { text: "1,500", correct: false, feedback: "Approximately correct but not the exact difference.", misconceptionId: "E-d5-c" }
      ],
    backward: "Round first, then operate; compare with exact calculation.",
    forward: "Error analysis is critical in science and engineering.",
    misconceptions: [
      {
        misconceptionId: "E-d5-a",
        description: "Student answers 42,000, which is only the estimate, with the final 'find the difference' step never performed.",
        rootCause: "Incomplete Multi-Step — the estimate was found correctly, but the required comparison (estimate − exact) was skipped.",
        remediation: "Have the student underline all three required results — estimate, exact, and difference — and confirm all three are computed before answering."
      },
      {
        misconceptionId: "E-d5-b",
        description: "Student answers 40,497, which is only the exact value, with the estimate and the difference between them never computed.",
        rootCause: "Wrong Component Selected — the student reported the exact value alone, missing that the question asks for the DIFFERENCE between estimate and exact.",
        remediation: "Have the student compute and label both values ('estimate = ...', 'exact = ...') before subtracting one from the other."
      },
      {
        misconceptionId: "E-d5-c",
        description: "Student answers 1,500, close to but not equal to the exact difference of 1,503.",
        rootCause: "Exact-vs-Estimate Confusion — the student rounded the final difference instead of computing estimate − exact precisely.",
        remediation: "Require the exact value and the estimate to both be written out fully, then subtracted exactly, with no rounding of the final difference."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Compute the estimate", hint: "Round 4,567 to 5,000 and 8,932 to 9,000, add them, then multiply by 3." },
      { level: 2, description: "Compute the exact value", hint: "Add the original numbers exactly (4,567 + 8,932), then multiply by 3." },
      { level: 3, description: "Find the difference", hint: "Subtract the smaller result from the larger one." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "WORD-04", probability: 0.3, condition: "Error-analysis word problems build on this same estimate-then-compare structure." }
    ],
    learningObjectives: ["CCSS.MATH.4.NBT.A.3", "CCSS.MATH.5.OA.A.1"]
  },
  {
    itemId: "d6", order: 6, cluster: "WORD", clusterName: CLUSTER_NAMES.WORD,
    skillId: "WORD-04",
    question: "A train starts with 2,450 passengers. At station B, 1,230 get off and 980 get on. At station C, 560 get off and 1,100 get on. How many passengers are now on the train?",
    options: [
        { text: "2,740", correct: true, feedback: "After B: 2,450-1,230+980=2,200. After C: 2,200-560+1,100=2,740." },
        { text: "2,200", correct: false, feedback: "That's only after station B.", misconceptionId: "E-d6-a" },
        { text: "3,300", correct: false, feedback: "You added all numbers without considering order.", misconceptionId: "E-d6-b" },
        { text: "1,740", correct: false, feedback: "Incorrect addition or subtraction.", misconceptionId: "E-d6-c" }
      ],
    backward: "Work step-by-step; each stop involves both subtraction and addition.",
    forward: "Such problems model real inventory and passenger flow.",
    misconceptions: [
      {
        misconceptionId: "E-d6-a",
        description: "Student answers 2,200, which is correct only for the count AFTER station B, with the events at station C never applied.",
        rootCause: "Incomplete Multi-Step — the first stop's changes were computed correctly, but the second stop's changes were left out entirely.",
        remediation: "Have the student process the problem stop by stop, writing down the running total after EACH station before moving to the next."
      },
      {
        misconceptionId: "E-d6-b",
        description: "Student answers 3,300, consistent with adding all four change amounts (1,230, 980, 560, 1,100) together without regard to which represent people getting OFF (subtract) versus ON (add).",
        rootCause: "Sign Confusion — every number in the problem was treated as an addition, ignoring that 'get off' should subtract from the running total.",
        remediation: "Have the student label each number with a + or − sign based on whether it's people getting on or off, before combining anything with the starting total."
      },
      {
        misconceptionId: "E-d6-c",
        description: "Student answers 1,740, which doesn't match the correct running total of 2,740 at any intermediate stage — it is 1,000 less than the correct final answer.",
        rootCause: "Running-Total Slip — one of the additions or subtractions in the step-by-step process introduced an error of 1,000, most likely from mishandling one of the larger numbers (1,230 or 1,100).",
        remediation: "Have the student redo the running total one operation at a time, writing the new total after each single addition or subtraction, so an error can be caught immediately at its source."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Process station B", hint: "Start with 2,450. Subtract those who got off (1,230), then add those who got on (980)." },
      { level: 2, description: "Process station C", hint: "Take your new total from station B. Subtract those who got off (560), then add those who got on (1,100)." },
      { level: 3, description: "Check your running totals", hint: "After station B you should have 2,200. After station C, that becomes your final answer." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "WORD-03", probability: 0.4, condition: "Multi-stage running-total problems build on comfort with simpler single-stage add/subtract word problems." }
    ],
    learningObjectives: ["CCSS.MATH.4.OA.A.3"]
  },
  {
    itemId: "d7", order: 7, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    skillId: "ADDSUB-04",
    question: "The sum of four consecutive numbers is 2,346. What is the smallest of these numbers?",
    options: [
        { text: "585", correct: true, feedback: "Let numbers be x, x+1, x+2, x+3. Sum = 4x+6 = 2,346 → x = 585." },
        { text: "586", correct: false, feedback: "That's the second number.", misconceptionId: "E-d7-a" },
        { text: "584", correct: false, feedback: "Off by 1.", misconceptionId: "E-d7-b" },
        { text: "1,173", correct: false, feedback: "That's half the sum, not the smallest.", misconceptionId: "E-d7-c" }
      ],
    backward: "Represent the numbers with a variable; the average is the middle value.",
    forward: "This is a gentle introduction to algebraic sequences.",
    misconceptions: [
      {
        misconceptionId: "E-d7-a",
        description: "Student answers 586, which is the SECOND of the four consecutive numbers (585, 586, 587, 588), not the smallest.",
        rootCause: "Wrong Number Selected — the equation 4x + 6 = 2,346 was solved correctly for x = 585, but 586 (x+1) was reported instead of x itself.",
        remediation: "Have the student write out all four numbers explicitly (x, x+1, x+2, x+3) after solving for x, and identify which one the question is asking for (the smallest, i.e., x)."
      },
      {
        misconceptionId: "E-d7-b",
        description: "Student answers 584, exactly 1 less than the correct smallest number 585.",
        rootCause: "Off-By-One Equation Slip — while solving 4x + 6 = 2,346, an error of 1 was introduced, likely from an arithmetic slip in 2,346 − 6 = 2,340 or in dividing 2,340 ÷ 4.",
        remediation: "Have the student re-solve 4x + 6 = 2,346 step by step: first subtract 6 from 2,346, then divide the result by 4, checking each step."
      },
      {
        misconceptionId: "E-d7-c",
        description: "Student answers 1,173, which is exactly half of 2,346 — a plausible-looking value, but not related to the actual structure of four consecutive numbers.",
        rootCause: "Wrong Model Applied — the student treated this like a simple 'sum of two numbers' problem (dividing by 2) instead of setting up the correct equation for four consecutive numbers (4x + 6 = sum).",
        remediation: "Have the student write out the general form of four consecutive numbers (x, x+1, x+2, x+3) and their sum (4x+6) explicitly before attempting to solve, rather than guessing a shortcut."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Represent the numbers", hint: "Let the smallest number be x. The next three are x+1, x+2, x+3." },
      { level: 2, description: "Set up the sum equation", hint: "x + (x+1) + (x+2) + (x+3) = 4x + 6. This equals 2,346." },
      { level: 3, description: "Solve for x", hint: "Subtract 6 from 2,346, then divide by 4 to find x, the smallest number." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "WORD-04", probability: 0.3, condition: "Algebraic sequence reasoning appears again in more complex multi-step word problems." }
    ],
    learningObjectives: ["CCSS.MATH.4.OA.A.3"]
  },
  {
    itemId: "d8", order: 8, cluster: "MULT", clusterName: CLUSTER_NAMES.MULT,
    skillId: "MULT-04",
    question: "A number is multiplied by 15, and then 4,500 is subtracted. The result is 7,800. Find the original number.",
    options: [
        { text: "820", correct: true, feedback: "Work backwards: 7,800 + 4,500 = 12,300; ÷ 15 = 820." },
        { text: "520", correct: false, feedback: "You might have done 7,800-4,500 = 3,300, then ÷15.", misconceptionId: "E-d8-a" },
        { text: "12,300", correct: false, feedback: "That's the number before dividing by 15.", misconceptionId: "E-d8-b" },
        { text: "8,200", correct: false, feedback: "Incorrect reverse operation.", misconceptionId: "E-d8-c" }
      ],
    backward: "Undo each operation in reverse order: add back, then divide.",
    forward: "Solving two-step equations follows this exact logic.",
    misconceptions: [
      {
        misconceptionId: "E-d8-a",
        description: "Student answers 520, consistent with computing (7,800 − 4,500) ÷ 15 = 3,300 ÷ 15 = 220... actually matching a subtraction instead of the required addition when undoing the original subtraction step.",
        rootCause: "Wrong Reverse Operation — to undo 'subtract 4,500', the correct reverse step is to ADD 4,500 back, but the student subtracted again instead.",
        remediation: "Have the student state the forward operations first ('× 15, then − 4,500'), then explicitly reverse each one in opposite order: '+ 4,500, then ÷ 15'."
      },
      {
        misconceptionId: "E-d8-b",
        description: "Student answers 12,300, which is the correct intermediate value (7,800 + 4,500) before the final division by 15 — the division step was never performed.",
        rootCause: "Incomplete Multi-Step — the first reverse operation (adding back 4,500) was done correctly, but the second reverse operation (dividing by 15) was skipped.",
        remediation: "Have the student count how many operations were in the original problem (two: × 15 and − 4,500) and confirm they've reversed the SAME number of operations before stopping."
      },
      {
        misconceptionId: "E-d8-c",
        description: "Student answers 8,200, which doesn't match either 7,800 + 4,500 = 12,300 or the correct final answer of 820.",
        rootCause: "Operations Not Reversed — the student attempted some combination of the given numbers without correctly undoing the subtraction and multiplication in reverse order.",
        remediation: "Have the student work through the reversal one step at a time: first add 4,500 to 7,800, writing that intermediate result down, then divide that result by 15."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the forward operations", hint: "The original number was multiplied by 15, then 4,500 was subtracted, giving 7,800." },
      { level: 2, description: "Reverse the subtraction first", hint: "To undo 'subtract 4,500', add 4,500 back: 7,800 + 4,500." },
      { level: 3, description: "Reverse the multiplication", hint: "To undo '× 15', divide your result by 15." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "WORD-04", probability: 0.4, condition: "Reverse-engineering / working-backwards problems recur in more complex multi-step word problems." }
    ],
    learningObjectives: ["CCSS.MATH.4.OA.A.3"]
  },
  {
    itemId: "d9", order: 9, cluster: "DIV", clusterName: CLUSTER_NAMES.DIV,
    skillId: "DIV-05",
    question: "Find a number between 200 and 300 that leaves remainder 2 when divided by 7, and remainder 5 when divided by 9.",
    options: [
        { text: "212", correct: true, feedback: "212 ÷ 7 = 30 R2; 212 ÷ 9 = 23 R5." },
        { text: "205", correct: false, feedback: "205 ÷ 7 = 29 R2; 205 ÷ 9 = 22 R7 (not 5).", misconceptionId: "E-d9-a" },
        { text: "207", correct: false, feedback: "207 ÷ 7 = 29 R4; 207 ÷ 9 = 23 R0.", misconceptionId: "E-d9-b" },
        { text: "219", correct: false, feedback: "219 ÷ 7 = 31 R2; 219 ÷ 9 = 24 R3.", misconceptionId: "E-d9-c" }
      ],
    backward: "List numbers satisfying one condition, then test the second.",
    forward: "This is the basis of the Chinese Remainder Theorem.",
    misconceptions: [
      {
        misconceptionId: "E-d9-a",
        description: "Student answers 205: checking, 205 ÷ 7 = 29 remainder 2 (satisfies the first condition), but 205 ÷ 9 = 22 remainder 7, not the required remainder 5.",
        rootCause: "Only First Condition Checked — the number satisfies the ÷7 condition but the ÷9 condition was never verified before selecting it.",
        remediation: "Have the student check EVERY candidate against BOTH conditions before accepting it, writing out both division checks explicitly."
      },
      {
        misconceptionId: "E-d9-b",
        description: "Student answers 207: checking, 207 ÷ 9 = 23 remainder 0 (not the required remainder 5), and 207 ÷ 7 = 29 remainder 4 (not the required remainder 2 either).",
        rootCause: "Neither Condition Verified — the number fails both the ÷7 and ÷9 conditions, suggesting it was chosen without checking either remainder carefully.",
        remediation: "Have the student systematically test numbers starting from 200, checking the ÷7 remainder first, and only checking ÷9 for numbers that already pass the ÷7 test."
      },
      {
        misconceptionId: "E-d9-c",
        description: "Student answers 219: checking, 219 ÷ 7 = 31 remainder 2 (satisfies the first condition), but 219 ÷ 9 = 24 remainder 3, not the required remainder 5.",
        rootCause: "Only First Condition Checked — the number satisfies the ÷7 condition but the ÷9 condition was never verified before selecting it.",
        remediation: "Have the student check EVERY candidate against BOTH conditions before accepting it, writing out both division checks explicitly."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "List numbers satisfying the first condition", hint: "Between 200 and 300, which numbers leave remainder 2 when divided by 7? (Start from a number you know works, then add 7 repeatedly.)" },
      { level: 2, description: "Test each against the second condition", hint: "For each candidate from your list, check: does it leave remainder 5 when divided by 9?" },
      { level: 3, description: "Confirm your answer", hint: "Verify your final answer satisfies BOTH conditions by doing both divisions explicitly." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "DIV-03", probability: 0.3, condition: "Comfort reconstructing numbers from divisor/remainder pairs supports this dual-condition reasoning." }
    ],
    learningObjectives: []
  },
  {
    itemId: "d10", order: 10, cluster: "POW10", clusterName: CLUSTER_NAMES.POW10,
    skillId: "POW10-04",
    question: "A pool holds 25,000 litres. A bucket holds 5 litres. How many buckets are needed to empty half the pool?",
    options: [
        { text: "2,500", correct: true, feedback: "Half of 25,000 = 12,500 litres; ÷ 5 = 2,500 buckets." },
        { text: "5,000", correct: false, feedback: "That's for the full pool.", misconceptionId: "E-d10-a" },
        { text: "1,250", correct: false, feedback: "You divided by 10 instead of 5.", misconceptionId: "E-d10-b" },
        { text: "25,000", correct: false, feedback: "That's the total litres, not buckets.", misconceptionId: "E-d10-c" }
      ],
    backward: "First find the volume to empty, then divide by bucket size.",
    forward: "Capacity problems are common in everyday life and industry.",
    misconceptions: [
      {
        misconceptionId: "E-d10-a",
        description: "Student answers 5,000, which is 25,000 ÷ 5 — the number of buckets for the FULL pool, ignoring the 'half the pool' condition.",
        rootCause: "Ignored Sub-Step — the 'half the pool' step (finding 12,500 litres) was skipped, and the division was performed on the full 25,000 litres instead.",
        remediation: "Have the student find half the pool's volume FIRST (25,000 ÷ 2 = 12,500), writing that down explicitly, before dividing by the bucket size."
      },
      {
        misconceptionId: "E-d10-b",
        description: "Student answers 1,250, which is 12,500 ÷ 10, using the wrong divisor (10 instead of the bucket size, 5).",
        rootCause: "Divisor Misread — the correct half-pool volume was found, but it was divided by 10 instead of the bucket's actual capacity of 5 litres.",
        remediation: "Have the student re-read the bucket size (5 litres, not 10) before dividing, writing it down explicitly first."
      },
      {
        misconceptionId: "E-d10-c",
        description: "Student answers 25,000, the total litres in the full pool, with no division performed at all.",
        rootCause: "Operation Omission — neither the halving nor the division by bucket size was performed; the original total was reported unchanged.",
        remediation: "Have the student identify both required steps explicitly — find half the pool's volume, then divide by the bucket size — before answering."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find half the pool's volume", hint: "25,000 ÷ 2 = ? litres." },
      { level: 2, description: "Identify the bucket size", hint: "Each bucket holds 5 litres." },
      { level: 3, description: "Divide to find the number of buckets", hint: "Buckets needed = half-pool volume ÷ bucket size." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "WORD-04", probability: 0.4, condition: "Multi-step capacity word problems build on this same fraction-then-divide structure." }
    ],
    learningObjectives: ["CCSS.MATH.5.MD.A.1"]
  },
  {
    itemId: "d11", order: 11, cluster: "EST", clusterName: CLUSTER_NAMES.EST,
    skillId: "EST-04",
    question: "Estimate 8,765 ÷ 39 by rounding 8,765 to the nearest 1,000 and 39 to the nearest 10. Then find the exact quotient (ignoring remainder) and calculate the difference between the estimate and the exact quotient.",
    options: [
        { text: "1", correct: true, feedback: "Estimate: 9,000 ÷ 40 = 225. Exact quotient: 8,765 ÷ 39 = 224 (since 39×224=8,736, remainder 29). Difference = 225-224 = 1." },
        { text: "225", correct: false, feedback: "That's the estimate.", misconceptionId: "E-d11-a" },
        { text: "224", correct: false, feedback: "That's the exact quotient.", misconceptionId: "E-d11-b" },
        { text: "29", correct: false, feedback: "That's the remainder, not the difference.", misconceptionId: "E-d11-c" }
      ],
    backward: "Round both numbers, divide, then do the exact division and compare.",
    forward: "Estimation accuracy improves with practice.",
    misconceptions: [
      {
        misconceptionId: "E-d11-a",
        description: "Student answers 225, which is only the estimate, with the final 'find the difference' step never performed.",
        rootCause: "Incomplete Multi-Step — the estimate was found correctly, but the required comparison (estimate − exact) was skipped.",
        remediation: "Have the student underline all three required results — estimate, exact quotient, and difference — and confirm all three are computed before answering."
      },
      {
        misconceptionId: "E-d11-b",
        description: "Student answers 224, which is only the exact quotient, with the estimate and the difference between them never computed.",
        rootCause: "Wrong Component Selected — the student reported the exact quotient alone, missing that the question asks for the DIFFERENCE between estimate and exact quotient.",
        remediation: "Have the student compute and label both values ('estimate = ...', 'exact quotient = ...') before subtracting one from the other."
      },
      {
        misconceptionId: "E-d11-c",
        description: "Student answers 29, the remainder of the exact division, confusing it with the requested difference between the estimate and the exact quotient.",
        rootCause: "Wrong Quantity Reported — the remainder from long division (29) was reported instead of computing estimate − exact quotient (225 − 224 = 1).",
        remediation: "Have the student clearly distinguish the remainder (leftover from division) from the quotient (the whole-number result), and use only the QUOTIENT when comparing to the estimate."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Compute the estimate", hint: "Round 8,765 to 9,000 and 39 to 40, then divide: 9,000 ÷ 40." },
      { level: 2, description: "Compute the exact quotient", hint: "Divide 8,765 ÷ 39 using long division, and take just the whole-number quotient (ignore the remainder)." },
      { level: 3, description: "Find the difference", hint: "Subtract the exact quotient from the estimate." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "WORD-04", probability: 0.3, condition: "Error-analysis word problems build on this same estimate-then-compare structure." }
    ],
    learningObjectives: ["CCSS.MATH.4.NBT.A.3"]
  },
  {
    itemId: "d12", order: 12, cluster: "WORD", clusterName: CLUSTER_NAMES.WORD,
    skillId: "WORD-04",
    question: "Rita bought 3.5 kg of apples at ₹80 per kg and 2.5 kg of oranges at ₹60 per kg. She gave a ₹500 note. How much change did she get?",
    options: [
        { text: "₹70", correct: true, feedback: "Apples: 3.5×80 = 280; oranges: 2.5×60 = 150; total = 430; change = 500-430 = 70." },
        { text: "₹430", correct: false, feedback: "That's the total cost, not change.", misconceptionId: "E-d12-a" },
        { text: "₹500", correct: false, feedback: "No change at all.", misconceptionId: "E-d12-b" },
        { text: "₹30", correct: false, feedback: "Miscalculated total.", misconceptionId: "E-d12-c" }
      ],
    backward: "Multiply weight by price per kg, then sum and subtract from amount tendered.",
    forward: "Shopping bills often involve mixed decimals.",
    misconceptions: [
      {
        misconceptionId: "E-d12-a",
        description: "Student answers ₹430, exactly the total cost of both items, with the '− amount paid' step never performed.",
        rootCause: "Incomplete Multi-Step — both products and their sum were found correctly, but the final subtraction to find change was skipped.",
        remediation: "Have the student underline the question's final phrase, 'how much change did she get', and connect it to amount paid minus total cost."
      },
      {
        misconceptionId: "E-d12-b",
        description: "Student answers ₹500, the full amount paid, as if none of it went toward the purchase.",
        rootCause: "Operation Omission — neither the item costs nor their subtraction from the amount paid were computed; the amount tendered was reported unchanged.",
        remediation: "Have the student compute the total cost of both items first (apples + oranges), then explicitly subtract that from ₹500."
      },
      {
        misconceptionId: "E-d12-c",
        description: "Student answers ₹30, which doesn't match 500 − 430 = 70; it's 40 less than correct, suggesting one of the two item totals was miscalculated.",
        rootCause: "Item-Total Slip — one of the two products (3.5 × 80 = 280, or 2.5 × 60 = 150) was computed with a 40 error, and that wrong total was carried into the final subtraction.",
        remediation: "Have the student verify each product separately: 3.5 × 80 (think of it as 35 × 8 = 280), and 2.5 × 60 (think of it as 25 × 6 = 150), before adding and subtracting."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the cost of each item type", hint: "Apples: 3.5 kg × ₹80. Oranges: 2.5 kg × ₹60. Compute both." },
      { level: 2, description: "Find the total cost", hint: "Add the apples total and the oranges total." },
      { level: 3, description: "Find the change", hint: "Change = amount paid (₹500) − total cost." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "WORD-03", probability: 0.3, condition: "This multi-item, multiply-then-add-then-subtract structure builds on comfort with simpler two-step problems." }
    ],
    learningObjectives: ["CCSS.MATH.4.OA.A.3"]
  },
  {
    itemId: "d13", order: 13, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    skillId: "ADDSUB-04",
    question: "The sum of the digits of a 3-digit number is 14. The number is 198 less than the number formed by reversing its digits, and the number is between 300 and 400. Find the original number.",
    options: [
        { text: "365", correct: true, feedback: "Let number = 100a+10b+c; reverse = 100c+10b+a. Difference = 99(c-a) = 198 → c-a = 2. Also a+b+c=14. The between-300-and-400 condition forces a=3, so c=5, giving b=6 → 365. (Without that range condition, 284, 446, 527, and 608 also satisfy the first two clues — the range is what pins down a single answer.)" },
        { text: "563", correct: false, feedback: "That's the reversed number.", misconceptionId: "E-d13-a" },
        { text: "257", correct: false, feedback: "2+5+7=14, but 752-257=495, not 198.", misconceptionId: "E-d13-b" },
        { text: "455", correct: false, feedback: "4+5+5=14, but 554-455=99, not 198.", misconceptionId: "E-d13-c" }
      ],
    backward: "Set up equations for the digits using place value.",
    forward: "Digit problems are classic algebraic puzzles.",
    misconceptions: [
      {
        misconceptionId: "E-d13-a",
        description: "Student answers 563, which is the REVERSED number (matching the digit-sum condition, since 5+6+3=14), not the original number the question asks for.",
        rootCause: "Wrong Number Selected — the student found a number satisfying the digit-sum condition but reported the reversed form (the larger number) instead of the original (smaller) number that is 198 LESS than its reverse.",
        remediation: "Have the student check which of the two related numbers (365 or 563) is smaller, since the question specifies the original number is 198 LESS than its reverse."
      },
      {
        misconceptionId: "E-d13-b",
        description: "Student answers 257: checking, 2+5+7=14 (satisfies the digit-sum condition), but the reverse of 257 is 752, and 752−257=495, not the required 198.",
        rootCause: "Digit-Sum Condition Checked, Difference Condition Not Verified — a number was found that gets the digit sum right, but wasn't checked against the SECOND condition (that the reverse minus the number equals exactly 198).",
        remediation: "Have the student verify BOTH conditions for any candidate number: does the digit sum equal 14, AND does (reverse − number) equal exactly 198?"
      },
      {
        misconceptionId: "E-d13-c",
        description: "Student answers 455: checking, 4+5+5=14 (satisfies the digit-sum condition), but the reverse of 455 is 554, and 554−455=99, not the required 198.",
        rootCause: "Digit-Sum Condition Checked, Difference Condition Not Verified — same issue as with 257: the digit-sum condition alone was checked, without verifying the reverse-minus-original difference equals 198.",
        remediation: "Have the student set up both equations explicitly (a+b+c=14 and 99(c−a)=198) and solve them together, rather than guessing digit-sum-14 numbers and checking only one condition."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Set up the digit-sum equation", hint: "If the digits are a (hundreds), b (tens), c (ones), then a + b + c = 14." },
      { level: 2, description: "Set up the reversal equation", hint: "Reversed number − original number = 99 × (c − a) = 198. Solve for c − a." },
      { level: 3, description: "Find digits satisfying both, then apply the range", hint: "You need c − a = 2 AND a + b + c = 14 — several (a,b,c) triples work. Use the 'between 300 and 400' clue to fix the hundreds digit a = 3 and pick the one unique answer." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "WORD-04", probability: 0.3, condition: "Digit-based algebraic puzzles recur in more advanced word-problem and pre-algebra contexts." }
    ],
    learningObjectives: []
  },
  {
    itemId: "d14", order: 14, cluster: "MULT", clusterName: CLUSTER_NAMES.MULT,
    skillId: "MULT-04",
    question: "Find the product of the largest 2-digit even number and the smallest 3-digit number that is divisible by 7.",
    options: [
        { text: "10,290", correct: true, feedback: "Largest 2-digit even = 98. Smallest 3-digit divisible by 7 = 105. 98 × 105 = 10,290." },
        { text: "10,190", correct: false, feedback: "Miscalculation.", misconceptionId: "E-d14-a" },
        { text: "9,800", correct: false, feedback: "98 × 100 = 9,800, not 105.", misconceptionId: "E-d14-b" },
        { text: "10,390", correct: false, feedback: "Wrong product.", misconceptionId: "E-d14-c" }
      ],
    backward: "Identify the numbers first, then multiply.",
    forward: "Working with multiples and largest/smallest constraints sharpens number sense.",
    misconceptions: [
      {
        misconceptionId: "E-d14-a",
        description: "Student answers 10,190, which doesn't match 98 × 105 = 10,290; it's 100 less than correct.",
        rootCause: "Multiplication Slip — a partial product within 98 × 105 was computed 100 too low, likely in the hundreds-place partial product (98 × 100 = 9,800 combined incorrectly with 98 × 5 = 490).",
        remediation: "Have the student compute 98 × 105 using partial products: 98 × 100 = 9,800, and 98 × 5 = 490, then add these two exactly."
      },
      {
        misconceptionId: "E-d14-b",
        description: "Student answers 9,800, which is 98 × 100, using 100 instead of the correct 105 as the second factor.",
        rootCause: "Factor Misidentified — the smallest 3-digit number divisible by 7 was mistakenly identified as 100 instead of the correct 105 (100 is not divisible by 7: 100 ÷ 7 = 14 remainder 2).",
        remediation: "Have the student verify divisibility by 7 explicitly: 100 ÷ 7 leaves a remainder, but 105 ÷ 7 = 15 exactly, confirming 105 is the correct smallest 3-digit multiple of 7."
      },
      {
        misconceptionId: "E-d14-c",
        description: "Student answers 10,390, which doesn't match 98 × 105 = 10,290; it's 100 more than correct.",
        rootCause: "Multiplication Slip — a partial product within 98 × 105 was computed 100 too high, likely from an error in combining 98 × 100 = 9,800 with 98 × 5 = 490.",
        remediation: "Have the student re-add the two partial products (9,800 + 490) carefully, checking the hundreds column."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the largest 2-digit even number", hint: "The largest 2-digit number is 99, but that's odd. What's the largest 2-digit EVEN number?" },
      { level: 2, description: "Identify the smallest 3-digit multiple of 7", hint: "100 ÷ 7 leaves a remainder. Try the next few numbers (101, 102, ...) until you find one divisible by 7 exactly." },
      { level: 3, description: "Multiply the two numbers", hint: "Multiply 98 × 105 using partial products: 98 × 100 + 98 × 5." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "MULT-01", probability: 0.3, condition: "Standard multiplication fluency is needed to verify the final answer." }
    ],
    learningObjectives: ["CCSS.MATH.5.NBT.B.5"]
  },
  {
    itemId: "d15", order: 15, cluster: "DIV", clusterName: CLUSTER_NAMES.DIV,
    skillId: "DIV-03",
    question: "A number N divided by 25 gives quotient Q and remainder 12. Q itself divided by 10 gives quotient 4 and remainder 3. Find N.",
    options: [
        { text: "1,087", correct: true, feedback: "Q = 10×4+3 = 43. N = 25×43+12 = 1,075+12 = 1,087." },
        { text: "1,075", correct: false, feedback: "You forgot the remainder.", misconceptionId: "E-d15-a" },
        { text: "1,000", correct: false, feedback: "Estimate only.", misconceptionId: "E-d15-b" },
        { text: "43", correct: false, feedback: "That's Q, not N.", misconceptionId: "E-d15-c" }
      ],
    backward: "Work from the innermost division outward.",
    forward: "Composing and decomposing numbers is essential in algorithms.",
    misconceptions: [
      {
        misconceptionId: "E-d15-a",
        description: "Student answers 1,075, exactly 25 × 43, the multiplication step with the remainder (12) never added.",
        rootCause: "Incomplete Reconstruction — the multiplication (divisor × Q) was done correctly, but the remainder was not added to reconstruct N.",
        remediation: "Have the student write the reconstruction formula explicitly — N = 25 × Q + 12 — before doing anything else."
      },
      {
        misconceptionId: "E-d15-b",
        description: "Student answers 1,000, close to but not equal to the exact answer 1,087.",
        rootCause: "Exact-vs-Estimate Confusion — the student estimated a round number instead of computing both reconstruction steps exactly.",
        remediation: "Require the exact reconstruction of Q (from the inner division) and then N (from the outer division) to be shown as separate written steps."
      },
      {
        misconceptionId: "E-d15-c",
        description: "Student answers 43, which is Q (the intermediate quotient), not N, the number the question actually asks for.",
        rootCause: "Wrong Component Reported — the student correctly found Q = 43 in the first reconstruction step but stopped there instead of using it to find N in the second step.",
        remediation: "Have the student clearly label each reconstructed value — 'Q = ...' and 'N = ...' — and re-read the question to confirm N (not Q) is being asked for."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find Q first", hint: "Q = 10 × 4 + 3 (from the inner division)." },
      { level: 2, description: "Use Q to find N", hint: "N = 25 × Q + 12 (from the outer division)." },
      { level: 3, description: "Compute carefully", hint: "Substitute your value of Q into the formula for N and compute exactly." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "DIV-05", probability: 0.3, condition: "Nested reconstruction problems build toward more advanced modular-arithmetic reasoning." }
    ],
    learningObjectives: []
  },
  {
    itemId: "d16", order: 16, cluster: "POW10", clusterName: CLUSTER_NAMES.POW10,
    skillId: "POW10-03",
    question: "Convert 3.2 lakh into tens. (1 lakh = 1,00,000)",
    options: [
        { text: "32,000", correct: true, feedback: "3.2 lakh = 3,20,000; ÷10 = 32,000 tens." },
        { text: "3,200", correct: false, feedback: "You divided by 100 instead of 10.", misconceptionId: "E-d16-a" },
        { text: "3,20,000", correct: false, feedback: "That's the number of ones.", misconceptionId: "E-d16-b" },
        { text: "32", correct: false, feedback: "You divided by 10,000.", misconceptionId: "E-d16-c" }
      ],
    backward: "Convert to the base unit, then divide by 10.",
    forward: "Large-scale unit conversions are used in geography and economics.",
    misconceptions: [
      {
        misconceptionId: "E-d16-a",
        description: "Student answers 3,200 — this is 3,20,000 ÷ 100, one zero too many removed for counting tens (÷10).",
        rootCause: "Zero-Count Error (Over-Removal) — two zeros were removed instead of the one that dividing by 10 requires.",
        remediation: "Have the student count the zeros in 10 (one) before removing digits, and remove exactly that many."
      },
      {
        misconceptionId: "E-d16-b",
        description: "Student answers 3,20,000, the original number itself, as if it directly counted the number of tens.",
        rootCause: "Unit Confusion — the student reported the number of ONES (3,20,000) instead of dividing by 10 to find the number of TENS.",
        remediation: "Have the student practice with a smaller number first (e.g. 'how many tens in 50?' → 50 ÷ 10 = 5) before applying the same division to 3.2 lakh."
      },
      {
        misconceptionId: "E-d16-c",
        description: "Student answers 32 — this is 3,20,000 ÷ 10,000, three zeros too many removed for counting tens.",
        rootCause: "Zero-Count Error (Over-Removal) — four zeros were removed instead of the one that dividing by 10 requires.",
        remediation: "Line up 10, 100, 1,000, and 10,000 and count zeros in each aloud so the student sees 10 has exactly one zero."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Convert to the base unit", hint: "3.2 lakh = 3,20,000." },
      { level: 2, description: "Recall what 'how many tens' means", hint: "'How many tens' in a number means dividing that number by 10." },
      { level: 3, description: "Divide by 10", hint: "3,20,000 ÷ 10 = ? (remove one zero)." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "POW10-04", probability: 0.4, condition: "Large-scale conversions in geography and economics rely on this same counting-by-place-value reasoning." }
    ],
    learningObjectives: ["CCSS.MATH.5.NBT.A.1"]
  },
  {
    itemId: "d17", order: 17, cluster: "EST", clusterName: CLUSTER_NAMES.EST,
    skillId: "EST-04",
    question: "Estimate (8,234 - 2,345) × 5 by rounding each number inside the brackets to the nearest 1,000. Then find the exact value and the difference between the estimate and the exact.",
    options: [
        { text: "555", correct: true, feedback: "Estimate: (8,000-2,000)=6,000; ×5=30,000. Exact: 8,234-2,345=5,889; ×5=29,445. Difference = 30,000-29,445 = 555." },
        { text: "30,000", correct: false, feedback: "That's the estimate.", misconceptionId: "E-d17-a" },
        { text: "29,445", correct: false, feedback: "That's the exact value.", misconceptionId: "E-d17-b" },
        { text: "600", correct: false, feedback: "Approximation; exact difference is 555.", misconceptionId: "E-d17-c" }
      ],
    backward: "Round first, then operate; compare with the exact result.",
    forward: "Understanding estimation error is key in finance and measurement.",
    misconceptions: [
      {
        misconceptionId: "E-d17-a",
        description: "Student answers 30,000, which is only the estimate, with the final 'find the difference' step never performed.",
        rootCause: "Incomplete Multi-Step — the estimate was found correctly, but the required comparison (estimate − exact) was skipped.",
        remediation: "Have the student underline all three required results — estimate, exact, and difference — and confirm all three are computed before answering."
      },
      {
        misconceptionId: "E-d17-b",
        description: "Student answers 29,445, which is only the exact value, with the estimate and the difference between them never computed.",
        rootCause: "Wrong Component Selected — the student reported the exact value alone, missing that the question asks for the DIFFERENCE between estimate and exact.",
        remediation: "Have the student compute and label both values ('estimate = ...', 'exact = ...') before subtracting one from the other."
      },
      {
        misconceptionId: "E-d17-c",
        description: "Student answers 600, close to but not equal to the exact difference of 555.",
        rootCause: "Exact-vs-Estimate Confusion — the student rounded the final difference instead of computing estimate − exact precisely.",
        remediation: "Require the exact value and the estimate to both be written out fully, then subtracted exactly, with no rounding of the final difference."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Compute the estimate", hint: "Round 8,234 to 8,000 and 2,345 to 2,000, subtract, then multiply by 5." },
      { level: 2, description: "Compute the exact value", hint: "Subtract the original numbers exactly (8,234 − 2,345), then multiply by 5." },
      { level: 3, description: "Find the difference", hint: "Subtract the smaller result from the larger one." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "WORD-04", probability: 0.3, condition: "Error-analysis word problems build on this same estimate-then-compare structure." }
    ],
    learningObjectives: ["CCSS.MATH.4.NBT.A.3", "CCSS.MATH.5.OA.A.1"]
  },
  {
    itemId: "d18", order: 18, cluster: "WORD", clusterName: CLUSTER_NAMES.WORD,
    skillId: "WORD-04",
    question: "A bookshop sold 15 copies of Book A at ₹245 each and 20 copies of Book B at ₹180 each. They gave a discount of ₹500 on the total bill. How much did they receive?",
    options: [
        { text: "₹6,775", correct: true, feedback: "A: 15×245=3,675; B: 20×180=3,600; total=7,275; after discount=6,775." },
        { text: "₹7,275", correct: false, feedback: "That's before discount.", misconceptionId: "E-d18-a" },
        { text: "₹7,775", correct: false, feedback: "Added discount instead of subtracting.", misconceptionId: "E-d18-b" },
        { text: "₹5,775", correct: false, feedback: "Miscalculated.", misconceptionId: "E-d18-c" }
      ],
    backward: "Calculate subtotals, sum, then subtract the discount.",
    forward: "Discounts and taxes are part of everyday commerce.",
    misconceptions: [
      {
        misconceptionId: "E-d18-a",
        description: "Student answers ₹7,275, exactly the total bill before discount, with the '− ₹500 discount' step never performed.",
        rootCause: "Incomplete Multi-Step — both book totals and their sum were found correctly, but the final subtraction of the discount was skipped.",
        remediation: "Have the student underline the phrase 'gave a discount of ₹500' and connect it to a required final subtraction from the total bill."
      },
      {
        misconceptionId: "E-d18-b",
        description: "Student answers ₹7,775, which equals 7,275 + 500.",
        rootCause: "Wrong-Operation Substitution — a discount reduces the amount owed, but the student added the discount to the total instead of subtracting it.",
        remediation: "Have the student restate what a discount means (money taken OFF the price) and connect that directly to subtraction."
      },
      {
        misconceptionId: "E-d18-c",
        description: "Student answers ₹5,775, which is 1,000 less than the correct 6,775, consistent with one of the two book totals (15 × 245 = 3,675 or 20 × 180 = 3,600) being computed 1,000 too low.",
        rootCause: "Item-Total Slip — one of the two products was miscalculated by 1,000, and that wrong total carried into the final sum and discount subtraction.",
        remediation: "Have the student verify each product separately: 15 × 245 (using partial products 15×200 + 15×45) and 20 × 180 (using 2×18 with three zeros), before summing and subtracting the discount."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find each book's total sales", hint: "Book A: 15 × ₹245. Book B: 20 × ₹180. Compute both." },
      { level: 2, description: "Find the total bill", hint: "Add Book A's total and Book B's total." },
      { level: 3, description: "Subtract the discount", hint: "Amount received = total bill − ₹500 discount." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "WORD-03", probability: 0.4, condition: "This multi-item, multiply-then-add-then-subtract structure builds on comfort with simpler two-step problems." }
    ],
    learningObjectives: ["CCSS.MATH.4.OA.A.3"]
  },
  {
    itemId: "d19", order: 19, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    skillId: "ADDSUB-04",
    question: "I am a 4-digit number. My thousands digit is twice the hundreds digit. The tens digit is the sum of the thousands and hundreds digit. The ones digit is the difference between the thousands and hundreds digit. Find the smallest such number.",
    options: [
        { text: "2,131", correct: true, feedback: "Let hundreds=x, thousands=2x, tens=3x, ones=x. x must be 1,2,3. Smallest x=1 → 2,131." },
        { text: "4,262", correct: false, feedback: "x=2 gives 4,262, which is larger.", misconceptionId: "E-d19-a" },
        { text: "6,393", correct: false, feedback: "x=3 gives 6,393, larger still.", misconceptionId: "E-d19-b" },
        { text: "1,231", correct: false, feedback: "Thousands = 1 (not twice hundreds).", misconceptionId: "E-d19-c" }
      ],
    backward: "Express all digits in terms of one variable; test possible values.",
    forward: "This builds the habit of using variables to model relationships.",
    misconceptions: [
      {
        misconceptionId: "E-d19-a",
        description: "Choosing 4,262 corresponds to hundreds digit x=2, which correctly satisfies all the digit relationships, but is not the SMALLEST valid number since x=1 (giving 2,131) also works and is smaller.",
        rootCause: "Non-Minimal Choice — a valid value satisfying all the digit relationships was found, but a smaller valid value (x=1) was not checked before answering.",
        remediation: "Have the student test x=1 first (the smallest possible hundreds digit), and only move to larger values of x if x=1 fails to produce valid digits."
      },
      {
        misconceptionId: "E-d19-b",
        description: "Choosing 6,393 corresponds to hundreds digit x=3, which is valid but even further from minimal than x=1 or x=2.",
        rootCause: "Non-Minimal Choice — the student picked a larger valid value for x without first checking whether x=1 (the smallest option) also satisfies all the digit relationships.",
        remediation: "Systematically test x=1 first, since it's the smallest positive value, before considering x=2 or x=3."
      },
      {
        misconceptionId: "E-d19-c",
        description: "Choosing 1,231 has thousands digit 1, but the hundreds digit is 2, and the condition requires thousands = 2 × hundreds, i.e. 1 should equal 2×2=4, which is false — this number doesn't actually satisfy the stated relationship.",
        rootCause: "Constraint Violated — the digits of 1,231 don't actually satisfy 'thousands digit is twice the hundreds digit' (1 ≠ 2×2); the number was likely chosen because it looked similar to the correct answer 2,131 rather than being derived from the digit relationships.",
        remediation: "Have the student verify EVERY stated condition against their chosen number's actual digits before accepting it: is thousands really twice hundreds? Is tens really the sum? Is ones really the difference?"
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Express digits in terms of one variable", hint: "Let the hundreds digit be x. Then thousands = 2x, tens = 2x + x = 3x, ones = 2x − x = x." },
      { level: 2, description: "Find valid values of x", hint: "Each digit must be 0–9. Since tens = 3x ≤ 9, x can only be 1, 2, or 3." },
      { level: 3, description: "Pick the smallest", hint: "Try x=1 first — does it give valid single digits for every place? If so, that's your smallest number." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "WORD-04", probability: 0.3, condition: "Constraint-satisfaction reasoning ('smallest/largest possible') recurs in more complex multi-step word problems." }
    ],
    learningObjectives: ["CCSS.MATH.4.OA.A.3"]
  },
  {
    itemId: "d20", order: 20, cluster: "MULT", clusterName: CLUSTER_NAMES.MULT,
    skillId: "MULT-05",
    question: "Find the smallest 2-digit number that, when multiplied by 18, gives a perfect square.",
    options: [
        { text: "18", correct: true, feedback: "18 = 2×3². To make a perfect square, we need another factor 2. So the smallest 2-digit multiplier is 18 itself (18×18 = 324 = 18²)." },
        { text: "2", correct: false, feedback: "2 is not a 2-digit number.", misconceptionId: "E-d20-a" },
        { text: "8", correct: false, feedback: "8 is not 2-digit.", misconceptionId: "E-d20-b" },
        { text: "36", correct: false, feedback: "36 does not give a perfect square: 18×36=648, which is not a perfect square.", misconceptionId: "E-d20-c" }
      ],
    backward: "Prime factorisation helps understand when a product is a perfect square.",
    forward: "This is the foundation of surds and square roots in algebra.",
    misconceptions: [
      {
        misconceptionId: "E-d20-a",
        description: "Student answers 2. Checking: 18 × 2 = 36 = 6², which IS a perfect square, but 2 is a 1-digit number, not the required 2-digit number.",
        rootCause: "Digit-Count Constraint Overlooked — a value making 18×N a perfect square was found, but the requirement that N be a 2-digit number was not checked.",
        remediation: "Have the student explicitly check the digit count of any candidate answer against what the question requires before finalizing it."
      },
      {
        misconceptionId: "E-d20-b",
        description: "Student answers 8. Checking: 18 × 8 = 144 = 12², which IS a perfect square, but 8 is a 1-digit number, not the required 2-digit number.",
        rootCause: "Digit-Count Constraint Overlooked — same issue as with 2: a perfect-square-producing value was found, but it doesn't satisfy the 2-digit requirement.",
        remediation: "Have the student list only 2-digit candidates (10-99) when searching, rather than testing small numbers that happen to work mathematically but fail the digit-count rule."
      },
      {
        misconceptionId: "E-d20-c",
        description: "Student answers 36. Checking: 18 × 36 = 648, and since 25²=625 and 26²=676, 648 falls between these and is NOT a perfect square.",
        rootCause: "Perfect-Square Check Skipped — 36 is a valid 2-digit number, but the product 18×36 was never actually verified to be a perfect square before selecting it.",
        remediation: "Have the student compute 18 × (candidate) explicitly and check it against nearby perfect squares (by estimating the square root) before accepting an answer."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Factor 18", hint: "18 = 2 × 3². For 18 × N to be a perfect square, every prime factor needs an EVEN power." },
      { level: 2, description: "Find what N needs to supply", hint: "18 has one factor of 2 (an odd power) and 3² (already even). N needs to supply one more factor of 2 (and keep other factors as perfect squares)." },
      { level: 3, description: "Find the smallest 2-digit N", hint: "N = 2 × (a perfect square) works. Try N = 2×1=2, 2×4=8, 2×9=18 — which is the first one that's 2 digits?" }
    ],
    forwardRiskLinks: [
      { targetSkillId: "MULT-01", probability: 0.3, condition: "Verifying products as perfect squares requires solid multiplication fluency." }
    ],
    learningObjectives: []
  },
  {
    itemId: "d21", order: 21, cluster: "DIV", clusterName: CLUSTER_NAMES.DIV,
    skillId: "DIV-05",
    question: "A number N divided by 28 leaves remainder 19. What is the remainder when N is divided by 14?",
    options: [
        { text: "5", correct: true, feedback: "N = 28k+19 = 14×(2k) + 19. 19 ÷ 14 = 1 remainder 5. So remainder 5." },
        { text: "19", correct: false, feedback: "Remainder must be less than divisor 14.", misconceptionId: "E-d21-a" },
        { text: "9", correct: false, feedback: "19-14 = 5, not 9.", misconceptionId: "E-d21-b" },
        { text: "14", correct: false, feedback: "That's the divisor.", misconceptionId: "E-d21-c" }
      ],
    backward: "Express N in terms of the divisor and remainder, then analyse with the new divisor.",
    forward: "This idea is used in modular arithmetic and cryptography.",
    misconceptions: [
      {
        misconceptionId: "E-d21-a",
        description: "Student answers 19, simply reusing the given remainder for divisor 28, without recognizing that a valid remainder must always be LESS than its divisor — and 19 > 14.",
        rootCause: "Remainder Bound Violated — the student didn't check that a remainder must be strictly less than the new divisor (14), since 19 is impossible as a remainder when dividing by 14.",
        remediation: "Remind the student of the basic rule: any remainder must always be less than the divisor. If a computed 'remainder' is ≥ the divisor, more division is needed."
      },
      {
        misconceptionId: "E-d21-b",
        description: "Student answers 9, which doesn't match 19 − 14 = 5.",
        rootCause: "Subtraction Slip — the correct approach (19 mod 14 = 19 − 14 = 5) was likely attempted, but the subtraction itself was computed incorrectly.",
        remediation: "Have the student re-subtract 19 − 14 carefully to find the true remainder when 19 itself is divided by 14."
      },
      {
        misconceptionId: "E-d21-c",
        description: "Student answers 14, the new divisor itself, rather than the remainder that results from dividing by it.",
        rootCause: "Wrong Quantity Reported — the student reported the divisor instead of computing the actual remainder of 19 ÷ 14.",
        remediation: "Have the student clearly distinguish the divisor (14, the number being divided BY) from the remainder (what's left over), and compute 19 ÷ 14 to find the latter."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Express N using the given information", hint: "N = 28k + 19 for some whole number k." },
      { level: 2, description: "Rewrite 28 in terms of 14", hint: "28 = 14 × 2, so N = 14 × (2k) + 19. The '14 × (2k)' part divides evenly by 14." },
      { level: 3, description: "Reduce the leftover part", hint: "19 itself needs to be divided by 14: 19 = 14 × 1 + 5. So the remainder is 5." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "DIV-03", probability: 0.3, condition: "Comfort reconstructing and re-decomposing numbers supports this modular reasoning." }
    ],
    learningObjectives: []
  },
  {
    itemId: "d22", order: 22, cluster: "POW10", clusterName: CLUSTER_NAMES.POW10,
    skillId: "POW10-04",
    question: "A sheet of paper is 0.1 mm thick. How many sheets make a stack 1 metre high? (1 m = 1,000 mm)",
    options: [
        { text: "10,000", correct: true, feedback: "1,000 mm ÷ 0.1 mm = 10,000 sheets." },
        { text: "100", correct: false, feedback: "Divided by 10 incorrectly.", misconceptionId: "E-d22-a" },
        { text: "1,000", correct: false, feedback: "Divided by 1 mm per sheet, not 0.1.", misconceptionId: "E-d22-b" },
        { text: "10,00,000", correct: false, feedback: "Far too large.", misconceptionId: "E-d22-c" }
      ],
    backward: "Convert to the same unit, then divide.",
    forward: "Working with very small and very large units is common in science.",
    misconceptions: [
      {
        misconceptionId: "E-d22-a",
        description: "Student answers 100, which doesn't match 1,000 ÷ 0.1 = 10,000; it's 100 times too small.",
        rootCause: "Decimal Division Error — dividing by a number less than 1 (0.1) makes the result LARGER than the dividend, but the student's answer is smaller, suggesting 1,000 was divided by 10 instead of 0.1, or multiplied by 0.1.",
        remediation: "Remind the student that dividing by a fraction less than 1 always gives a bigger answer. Rewrite 1,000 ÷ 0.1 as 1,000 × 10 (since dividing by 0.1 is the same as multiplying by 10) to make this concrete."
      },
      {
        misconceptionId: "E-d22-b",
        description: "Student answers 1,000, which is 1,000 mm ÷ 1 mm, treating each sheet as if it were 1 mm thick instead of the actual 0.1 mm.",
        rootCause: "Decimal Value Misread — the sheet thickness (0.1 mm) was rounded or misread as 1 mm, a ten-times overestimate of each sheet's thickness.",
        remediation: "Have the student re-read the sheet thickness carefully (0.1 mm, one-tenth of a millimetre) before setting up the division."
      },
      {
        misconceptionId: "E-d22-c",
        description: "Student answers 10,00,000, which is 100 times larger than the correct 10,000.",
        rootCause: "Decimal Division Error — dividing by 0.1 was likely treated as dividing by 0.001 (or otherwise over-multiplying), producing a result 100 times too large.",
        remediation: "Have the student rewrite 1,000 ÷ 0.1 as 1,000 × 10 = 10,000, a much safer way to handle division by a decimal less than 1."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Convert to the same unit", hint: "1 m = 1,000 mm. The sheet thickness is already given in mm (0.1 mm)." },
      { level: 2, description: "Set up the division", hint: "Number of sheets = total height ÷ thickness of one sheet = 1,000 ÷ 0.1." },
      { level: 3, description: "Handle the decimal divisor", hint: "Dividing by 0.1 is the same as multiplying by 10. So 1,000 ÷ 0.1 = 1,000 × 10." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "WORD-04", probability: 0.3, condition: "Scientific and measurement word problems often involve dividing by decimal unit sizes." }
    ],
    learningObjectives: ["CCSS.MATH.5.MD.A.1"]
  },
  {
    itemId: "d23", order: 23, cluster: "EST", clusterName: CLUSTER_NAMES.EST,
    skillId: "EST-04",
    question: "Estimate 6,789 × 123 by rounding 6,789 to the nearest 1,000 and 123 to the nearest 10. Then find the exact product and the difference between the estimate and the exact.",
    options: [
        { text: "4,953", correct: true, feedback: "Estimate: 7,000 × 120 = 8,40,000. Exact: 6,789×123 = 8,35,047. Difference = 8,40,000 - 8,35,047 = 4,953." },
        { text: "8,40,000", correct: false, feedback: "That's the estimate.", misconceptionId: "E-d23-a" },
        { text: "8,35,047", correct: false, feedback: "That's the exact product.", misconceptionId: "E-d23-b" },
        { text: "5,000", correct: false, feedback: "Approximation, not exact difference.", misconceptionId: "E-d23-c" }
      ],
    backward: "Multiply rounded numbers; compare with the exact result.",
    forward: "Error analysis of estimates is vital in engineering.",
    misconceptions: [
      {
        misconceptionId: "E-d23-a",
        description: "Student answers 8,40,000, which is only the estimate, with the final 'find the difference' step never performed.",
        rootCause: "Incomplete Multi-Step — the estimate was found correctly, but the required comparison (estimate − exact) was skipped.",
        remediation: "Have the student underline all three required results — estimate, exact product, and difference — and confirm all three are computed before answering."
      },
      {
        misconceptionId: "E-d23-b",
        description: "Student answers 8,35,047, which is only the exact product, with the estimate and the difference between them never computed.",
        rootCause: "Wrong Component Selected — the student reported the exact product alone, missing that the question asks for the DIFFERENCE between estimate and exact.",
        remediation: "Have the student compute and label both values ('estimate = ...', 'exact = ...') before subtracting one from the other."
      },
      {
        misconceptionId: "E-d23-c",
        description: "Student answers 5,000, close to but not equal to the exact difference of 4,953.",
        rootCause: "Exact-vs-Estimate Confusion — the student rounded the final difference instead of computing estimate − exact precisely.",
        remediation: "Require the exact product and the estimate to both be written out fully, then subtracted exactly, with no rounding of the final difference."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Compute the estimate", hint: "Round 6,789 to 7,000 and 123 to 120, then multiply: 7,000 × 120." },
      { level: 2, description: "Compute the exact product", hint: "Multiply the original numbers exactly: 6,789 × 123." },
      { level: 3, description: "Find the difference", hint: "Subtract the smaller result from the larger one." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "WORD-04", probability: 0.3, condition: "Error-analysis word problems build on this same estimate-then-compare structure." }
    ],
    learningObjectives: ["CCSS.MATH.4.NBT.A.3"]
  },
  {
    itemId: "d24", order: 24, cluster: "WORD", clusterName: CLUSTER_NAMES.WORD,
    skillId: "WORD-04",
    question: "A farmer has 2,400 eggs. He packs them in trays of 30 eggs each. He sells each tray for ₹120. He also sells 500 loose eggs at ₹4 each. How much money does he make in total?",
    options: [
        { text: "₹11,600", correct: true, feedback: "Trays: 2,400÷30=80; 80×₹120=₹9,600. Loose: 500×₹4=₹2,000. Total=₹11,600." },
        { text: "₹9,600", correct: false, feedback: "That's only the tray sales.", misconceptionId: "E-d24-a" },
        { text: "₹2,000", correct: false, feedback: "Only the loose eggs.", misconceptionId: "E-d24-b" },
        { text: "₹10,000", correct: false, feedback: "Approximation.", misconceptionId: "E-d24-c" }
      ],
    backward: "Calculate packed and loose sales separately, then sum.",
    forward: "Mixed sales models are used in business and farming.",
    misconceptions: [
      {
        misconceptionId: "E-d24-a",
        description: "Student answers ₹9,600, exactly the tray sales alone, with the loose-egg sales (₹2,000) never added.",
        rootCause: "Missing Item — one of the two revenue sources (loose eggs) was left out of the total.",
        remediation: "Have the student list every revenue source mentioned in the problem (trays AND loose eggs) before computing a total, to make sure none are missed."
      },
      {
        misconceptionId: "E-d24-b",
        description: "Student answers ₹2,000, exactly the loose-egg sales alone, with the tray sales (₹9,600) never added.",
        rootCause: "Missing Item — the other revenue source (trays) was left out of the total, with only the smaller loose-egg calculation reported.",
        remediation: "Have the student compute BOTH revenue sources explicitly (trays and loose eggs) before adding them together for a grand total."
      },
      {
        misconceptionId: "E-d24-c",
        description: "Student answers ₹10,000, close to but not equal to the exact total ₹11,600.",
        rootCause: "Exact-vs-Estimate Confusion — the student estimated a round number instead of computing both revenue sources exactly and adding them.",
        remediation: "Point out that a farmer's actual earnings need to be exact, not estimated, and require both exact revenue totals to be shown before adding."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the tray revenue", hint: "First find how many trays (2,400 ÷ 30), then multiply by the price per tray (₹120)." },
      { level: 2, description: "Find the loose-egg revenue", hint: "Multiply 500 loose eggs by ₹4 each." },
      { level: 3, description: "Add both revenue sources", hint: "Total money = tray revenue + loose-egg revenue." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "WORD-03", probability: 0.4, condition: "This multi-source revenue structure builds on comfort with simpler two-step problems." }
    ],
    learningObjectives: ["CCSS.MATH.4.OA.A.3"]
  }
];

const recheckItems = [
  {
    itemId: "r1", order: 1, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    skillId: "ADDSUB-04",
    question: "The sum of two numbers is 8,76,543 and their difference is 2,34,567. What is the larger number?",
    options: [
        { text: "5,55,555", correct: true, feedback: "Larger = (sum + diff)/2 = (8,76,543+2,34,567)/2 = 5,55,555." },
        { text: "3,20,988", correct: false, feedback: "That's the smaller number.", misconceptionId: "E-r1-a" },
        { text: "5,55,000", correct: false, feedback: "Rounded.", misconceptionId: "E-r1-b" },
        { text: "6,55,555", correct: false, feedback: "Miscalculated.", misconceptionId: "E-r1-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r1-a",
        description: "Student answers 3,20,988, which is the SMALLER of the two numbers, not the larger one the question asks for.",
        rootCause: "Wrong Number Selected — both numbers were found correctly using the sum-and-difference method, but the smaller one was reported instead of the larger one requested.",
        remediation: "Have the student find and label BOTH numbers explicitly before answering, then re-read the question to see which one is being asked for."
      },
      {
        misconceptionId: "E-r1-b",
        description: "Student answers 5,55,000, close to but not exactly equal to the correct 5,55,555.",
        rootCause: "Exact-vs-Estimate Confusion — the student rounded the final answer instead of computing (sum+diff)/2 exactly.",
        remediation: "Require every step of the sum-and-difference method to be shown with exact numbers, with no rounding at any stage."
      },
      {
        misconceptionId: "E-r1-c",
        description: "Student answers 6,55,555, which doesn't match (8,76,543+2,34,567)/2 = 5,55,555; it's 1,00,000 more than correct.",
        rootCause: "Addition or Division Slip — an error of exactly 1,00,000 was introduced either while adding the sum and difference, or while dividing the result by 2.",
        remediation: "Have the student re-add 8,76,543 + 2,34,567 carefully, then re-divide that total by 2, checking each step."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the sum-and-difference method", hint: "Larger number = (sum + difference) ÷ 2." },
      { level: 2, description: "Add the sum and difference", hint: "8,76,543 + 2,34,567 = ?" },
      { level: 3, description: "Divide by 2", hint: "Take your total and divide by 2 to get the larger number." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "WORD-04", probability: 0.4, condition: "Multi-step reasoning problems build on comfortably distinguishing which derived quantity is being asked for." }
    ],
    learningObjectives: ["CCSS.MATH.4.OA.A.3"]
  },
  {
    itemId: "r2", order: 2, cluster: "MULT", clusterName: CLUSTER_NAMES.MULT,
    skillId: "MULT-04",
    question: "The product of two numbers is 97,200. One number is 27 times the other. Find the larger number.",
    options: [
        { text: "1,620", correct: true, feedback: "27x²=97,200 → x²=3,600 → x=60, large=27×60=1,620." },
        { text: "60", correct: false, feedback: "That's the small number.", misconceptionId: "E-r2-a" },
        { text: "1,350", correct: false, feedback: "Incorrect calculation.", misconceptionId: "E-r2-b" },
        { text: "2,700", correct: false, feedback: "That's x², not the larger number.", misconceptionId: "E-r2-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r2-a",
        description: "Student answers 60, which is the SMALLER of the two numbers, not the larger one the question asks for.",
        rootCause: "Wrong Number Selected — the equation 27x² = 97,200 was solved correctly to find x = 60, but the smaller number (x) was reported instead of the larger one (27x = 1,620) requested.",
        remediation: "Have the student explicitly label both numbers after solving — 'smaller = x = 60' and 'larger = 27x = 1,620' — and re-read the question to confirm which is being asked for."
      },
      {
        misconceptionId: "E-r2-b",
        description: "Student answers 1,350, which doesn't match 27 × 60 = 1,620.",
        rootCause: "Multiplication Slip — after correctly finding x = 60, multiplying by the ratio 27 was carried out incorrectly.",
        remediation: "Have the student recompute 27 × 60 using partial products (27 × 60 = 27 × 6 × 10)."
      },
      {
        misconceptionId: "E-r2-c",
        description: "Student answers 2,700, which is 90², not related to x² = 3,600 or the correct larger number 1,620.",
        rootCause: "Intermediate Value Confusion — the student appears to have stopped at an intermediate calculation rather than following through to find x and then 27x.",
        remediation: "Have the student work through each step in order: find x² = 97,200 ÷ 27, take the square root to find x, then multiply by 27 for the larger number."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Set up the equation", hint: "Let the smaller number be x. Then the larger number is 27x, and their product is 27x² = 97,200." },
      { level: 2, description: "Solve for x²", hint: "Divide both sides by 27: x² = 97,200 ÷ 27." },
      { level: 3, description: "Find x, then the larger number", hint: "Take the square root of x² to find x, then multiply by 27." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "MULT-01", probability: 0.3, condition: "Standard multiplication fluency is needed to verify the final answer." }
    ],
    learningObjectives: ["CCSS.MATH.4.OA.A.3"]
  },
  {
    itemId: "r3", order: 3, cluster: "DIV", clusterName: CLUSTER_NAMES.DIV,
    skillId: "DIV-03",
    question: "A number divided by 35 gives quotient 62 and remainder 18. Multiply that number by 2. What do you get?",
    options: [
        { text: "4,376", correct: true, feedback: "N = 35×62+18 = 2,170+18 = 2,188. ×2 = 4,376." },
        { text: "2,188", correct: false, feedback: "That's N, not multiplied by 2.", misconceptionId: "E-r3-a" },
        { text: "2,170", correct: false, feedback: "Forgot remainder.", misconceptionId: "E-r3-b" },
        { text: "4,000", correct: false, feedback: "Estimate.", misconceptionId: "E-r3-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r3-a",
        description: "Student answers 2,188, the correctly reconstructed original number, with the final '× 2' step never performed.",
        rootCause: "Incomplete Multi-Step — the reconstruction (35 × 62 + 18) was done correctly, but the follow-up multiplication by 2 was skipped.",
        remediation: "Have the student underline every instruction in the problem — 'find the number, then multiply by 2' — and check off each part as it's completed."
      },
      {
        misconceptionId: "E-r3-b",
        description: "Student answers 2,170, exactly 35 × 62, the multiplication step with the remainder (18) never added.",
        rootCause: "Incomplete Reconstruction — the multiplication (divisor × quotient) was done correctly, but the remainder was not added to reconstruct the full original number.",
        remediation: "Have the student write the reconstruction formula explicitly — number = divisor × quotient + remainder — before doing anything else."
      },
      {
        misconceptionId: "E-r3-c",
        description: "Student answers 4,000, close to but not equal to the exact answer 4,376.",
        rootCause: "Exact-vs-Estimate Confusion — the student estimated a round number instead of computing the exact reconstruction and multiplication.",
        remediation: "Require the exact multiplication, addition, and final multiplication by 2 to be shown as separate written steps."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Reconstruct the number first", hint: "Number = divisor × quotient + remainder = 35 × 62 + 18." },
      { level: 2, description: "Compute step by step", hint: "35 × 62 = ? Then add 18 to that." },
      { level: 3, description: "Multiply by 2", hint: "Take your reconstructed number and multiply it by 2." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "DIV-05", probability: 0.3, condition: "Remainder-based reasoning problems build on comfortably reconstructing dividends." }
    ],
    learningObjectives: ["CCSS.MATH.5.NBT.B.6"]
  },
  {
    itemId: "r4", order: 4, cluster: "POW10", clusterName: CLUSTER_NAMES.POW10,
    skillId: "POW10-04",
    question: "How many ₹20 notes make ₹4,00,000?",
    options: [
        { text: "20,000", correct: true, feedback: "4,00,000 ÷ 20 = 20,000." },
        { text: "2,000", correct: false, feedback: "Divided by 200.", misconceptionId: "E-r4-a" },
        { text: "40,000", correct: false, feedback: "Multiplied by 10.", misconceptionId: "E-r4-b" },
        { text: "20,00,000", correct: false, feedback: "Multiplied instead of divided.", misconceptionId: "E-r4-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r4-a",
        description: "Student answers 2,000 — this is 4,00,000 ÷ 200, one zero too many in the divisor for dividing by 20.",
        rootCause: "Zero-Count Error — an extra zero was included in the divisor (200 instead of 20), making the quotient ten times too small.",
        remediation: "Have the student re-read the note value (₹20, not ₹200) before dividing, writing it down explicitly first."
      },
      {
        misconceptionId: "E-r4-b",
        description: "Student answers 40,000, which equals 4,00,000 ÷ 10, not ÷20.",
        rootCause: "Divisor Misread — the student divided by 10 instead of 20, producing an answer twice too large.",
        remediation: "Have the student re-read the note value (₹20) and use exactly that as the divisor."
      },
      {
        misconceptionId: "E-r4-c",
        description: "Student answers 20,00,000, which equals 4,00,000 × 5, not related to a correct division by 20.",
        rootCause: "Wrong-Operation Substitution — the student multiplied instead of dividing to find the number of notes.",
        remediation: "Have the student restate the situation: number of notes = total amount ÷ value of one note, connecting 'how many notes' to division."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Set up the division", hint: "Number of notes = total amount ÷ value of one note = 4,00,000 ÷ 20." },
      { level: 2, description: "Simplify by cancelling a zero", hint: "4,00,000 ÷ 20 is the same as 40,000 ÷ 2 (cancel one zero from each)." },
      { level: 3, description: "Divide the simplified numbers", hint: "40,000 ÷ 2 = ?" }
    ],
    forwardRiskLinks: [
      { targetSkillId: "WORD-04", probability: 0.4, condition: "Currency word problems rely on this same total-divided-by-unit-value reasoning." }
    ],
    learningObjectives: ["CCSS.MATH.5.NBT.A.2"]
  },
  {
    itemId: "r5", order: 5, cluster: "EST", clusterName: CLUSTER_NAMES.EST,
    skillId: "EST-04",
    question: "Estimate (3,456 + 7,890) × 2 by rounding each number inside to the nearest 1,000. Then find the exact value and the difference.",
    options: [
        { text: "692", correct: true, feedback: "Estimate: (3,000+8,000)×2=22,000. Exact: 11,346×2=22,692. Difference = 692." },
        { text: "22,000", correct: false, feedback: "That's the estimate.", misconceptionId: "E-r5-a" },
        { text: "22,692", correct: false, feedback: "That's the exact value.", misconceptionId: "E-r5-b" },
        { text: "700", correct: false, feedback: "Approximation.", misconceptionId: "E-r5-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r5-a",
        description: "Student answers 22,000, which is only the estimate, with the final 'find the difference' step never performed.",
        rootCause: "Incomplete Multi-Step — the estimate was found correctly, but the required comparison (exact − estimate) was skipped.",
        remediation: "Have the student underline all three required results — estimate, exact, and difference — and confirm all three are computed before answering."
      },
      {
        misconceptionId: "E-r5-b",
        description: "Student answers 22,692, which is only the exact value, with the estimate and the difference between them never computed.",
        rootCause: "Wrong Component Selected — the student reported the exact value alone, missing that the question asks for the DIFFERENCE between exact and estimate.",
        remediation: "Have the student compute and label both values ('estimate = ...', 'exact = ...') before subtracting one from the other."
      },
      {
        misconceptionId: "E-r5-c",
        description: "Student answers 700, close to but not equal to the exact difference of 692.",
        rootCause: "Exact-vs-Estimate Confusion — the student rounded the final difference instead of computing exact − estimate precisely.",
        remediation: "Require the exact value and the estimate to both be written out fully, then subtracted exactly, with no rounding of the final difference."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Compute the estimate", hint: "Round 3,456 to 3,000 and 7,890 to 8,000, add them, then multiply by 2." },
      { level: 2, description: "Compute the exact value", hint: "Add the original numbers exactly (3,456 + 7,890), then multiply by 2." },
      { level: 3, description: "Find the difference", hint: "Subtract the smaller result from the larger one." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "WORD-04", probability: 0.3, condition: "Error-analysis word problems build on this same estimate-then-compare structure." }
    ],
    learningObjectives: ["CCSS.MATH.4.NBT.A.3", "CCSS.MATH.5.OA.A.1"]
  },
  {
    itemId: "r6", order: 6, cluster: "WORD", clusterName: CLUSTER_NAMES.WORD,
    skillId: "WORD-04",
    question: "Ravi bought 5 pens at ₹35 each and 4 notebooks at ₹75 each. He paid with a ₹500 note. How much change did he get?",
    options: [
        { text: "₹25", correct: true, feedback: "Pens: 5×35=175; notebooks: 4×75=300; total=475; change=500-475=25." },
        { text: "₹475", correct: false, feedback: "Total cost, not change.", misconceptionId: "E-r6-a" },
        { text: "₹500", correct: false, feedback: "No change.", misconceptionId: "E-r6-b" },
        { text: "₹75", correct: false, feedback: "Miscalculated.", misconceptionId: "E-r6-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r6-a",
        description: "Student answers ₹475, exactly the total cost of all items, with the '− amount paid' step never performed.",
        rootCause: "Incomplete Multi-Step — both products and their sum were found correctly, but the final subtraction to find change was skipped.",
        remediation: "Have the student underline the question's final phrase, 'how much change did he get', and connect it to amount paid minus total cost."
      },
      {
        misconceptionId: "E-r6-b",
        description: "Student answers ₹500, the full amount paid, as if none of it went toward the purchase.",
        rootCause: "Operation Omission — neither the item costs nor their subtraction from the amount paid were computed; the amount tendered was reported unchanged.",
        remediation: "Have the student compute the total cost of all items first (pens + notebooks), then explicitly subtract that from ₹500."
      },
      {
        misconceptionId: "E-r6-c",
        description: "Student answers ₹75, which doesn't match 500 − 475 = 25; it suggests one of the two item totals was computed incorrectly.",
        rootCause: "Item-Total Slip — one of the two products (5 × 35 = 175, or 4 × 75 = 300) was miscalculated, and that wrong total was carried into the final subtraction.",
        remediation: "Have the student verify each product separately (5 × 35 and 4 × 75) before adding and subtracting from the amount paid."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the cost of each item type", hint: "Pens: 5 × ₹35. Notebooks: 4 × ₹75. Compute both." },
      { level: 2, description: "Find the total cost", hint: "Add the pens total and the notebooks total." },
      { level: 3, description: "Find the change", hint: "Change = amount paid (₹500) − total cost." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "WORD-03", probability: 0.4, condition: "This multi-item, multiply-then-add-then-subtract structure builds on comfort with simpler two-step problems." }
    ],
    learningObjectives: ["CCSS.MATH.4.OA.A.3"]
  },
  {
    itemId: "r7", order: 7, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    skillId: "ADDSUB-04",
    question: "The sum of three consecutive numbers is 369. Find the middle number.",
    options: [
        { text: "123", correct: true, feedback: "x + (x+1) + (x+2) = 3x+3 = 369 → x=122, middle = 123." },
        { text: "122", correct: false, feedback: "That's the smallest.", misconceptionId: "E-r7-a" },
        { text: "124", correct: false, feedback: "The largest.", misconceptionId: "E-r7-b" },
        { text: "121", correct: false, feedback: "Incorrect.", misconceptionId: "E-r7-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r7-a",
        description: "Student answers 122, which is the SMALLEST of the three consecutive numbers (122, 123, 124), not the middle one requested.",
        rootCause: "Wrong Number Selected — the equation 3x + 3 = 369 was solved correctly for x = 122, but x itself (the smallest) was reported instead of the middle number (x+1 = 123).",
        remediation: "Have the student write out all three numbers explicitly (x, x+1, x+2) after solving for x, and identify which one is the MIDDLE value."
      },
      {
        misconceptionId: "E-r7-b",
        description: "Student answers 124, which is the LARGEST of the three consecutive numbers, not the middle one requested.",
        rootCause: "Wrong Number Selected — the student found the correct set of numbers but reported the largest (x+2) instead of the middle (x+1).",
        remediation: "Have the student write out all three numbers explicitly and label them 'smallest', 'middle', 'largest' before answering."
      },
      {
        misconceptionId: "E-r7-c",
        description: "Student answers 121, exactly 1 less than the correct middle number 123, and also 1 less than the smallest number 122.",
        rootCause: "Off-By-One Equation Slip — while solving 3x + 3 = 369, an arithmetic error introduced an off-by-one shift, landing outside the actual three-number sequence.",
        remediation: "Have the student re-solve 3x + 3 = 369 step by step: subtract 3, then divide by 3, and verify by adding all three numbers back together to confirm they total 369."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Represent the numbers", hint: "Let the smallest number be x. The next two are x+1 and x+2." },
      { level: 2, description: "Set up the sum equation", hint: "x + (x+1) + (x+2) = 3x + 3 = 369." },
      { level: 3, description: "Solve and identify the middle", hint: "Solve for x, then remember the MIDDLE number is x+1, not x itself." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "WORD-04", probability: 0.3, condition: "Algebraic sequence reasoning appears again in more complex multi-step word problems." }
    ],
    learningObjectives: ["CCSS.MATH.4.OA.A.3"]
  },
  {
    itemId: "r8", order: 8, cluster: "MULT", clusterName: CLUSTER_NAMES.MULT,
    skillId: "MULT-04",
    question: "A number is multiplied by 12, then 2,400 is subtracted, leaving 3,600. Find the original number.",
    options: [
        { text: "500", correct: true, feedback: "3,600+2,400=6,000; ÷12=500." },
        { text: "300", correct: false, feedback: "Incorrect reverse.", misconceptionId: "E-r8-a" },
        { text: "600", correct: false, feedback: "Off by 100.", misconceptionId: "E-r8-b" },
        { text: "6,000", correct: false, feedback: "That's before dividing.", misconceptionId: "E-r8-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r8-a",
        description: "Student answers 300, consistent with computing (3,600 − 2,400) ÷ 12 = 1,200 ÷ 12 = 100... not matching either, but consistent with subtracting again instead of adding back when reversing.",
        rootCause: "Wrong Reverse Operation — to undo 'subtract 2,400', the correct reverse step is to ADD 2,400 back, but the student subtracted again instead.",
        remediation: "Have the student state the forward operations first ('× 12, then − 2,400'), then explicitly reverse each one in opposite order: '+ 2,400, then ÷ 12'."
      },
      {
        misconceptionId: "E-r8-b",
        description: "Student answers 600, which is 100 more than the correct 500.",
        rootCause: "Division Slip — the correct intermediate value (6,000) was likely found, but dividing by 12 was carried out with a small error.",
        remediation: "Have the student re-divide 6,000 ÷ 12 carefully, perhaps by first dividing by 4 (giving 1,500) then by 3 (giving 500)."
      },
      {
        misconceptionId: "E-r8-c",
        description: "Student answers 6,000, which is the correct intermediate value (3,600 + 2,400) before the final division by 12 — the division step was never performed.",
        rootCause: "Incomplete Multi-Step — the first reverse operation (adding back 2,400) was done correctly, but the second reverse operation (dividing by 12) was skipped.",
        remediation: "Have the student count how many operations were in the original problem (two: × 12 and − 2,400) and confirm they've reversed the SAME number of operations before stopping."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the forward operations", hint: "The original number was multiplied by 12, then 2,400 was subtracted, giving 3,600." },
      { level: 2, description: "Reverse the subtraction first", hint: "To undo 'subtract 2,400', add 2,400 back: 3,600 + 2,400." },
      { level: 3, description: "Reverse the multiplication", hint: "To undo '× 12', divide your result by 12." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "WORD-04", probability: 0.4, condition: "Reverse-engineering / working-backwards problems recur in more complex multi-step word problems." }
    ],
    learningObjectives: ["CCSS.MATH.4.OA.A.3"]
  },
  {
    itemId: "r9", order: 9, cluster: "DIV", clusterName: CLUSTER_NAMES.DIV,
    skillId: "DIV-05",
    question: "Find a number between 100 and 200 that leaves remainder 3 when divided by 8, and remainder 2 when divided by 5.",
    options: [
        { text: "187", correct: true, feedback: "187 ÷ 8 = 23 R3; 187 ÷ 5 = 37 R2." },
        { text: "163", correct: false, feedback: "163 ÷ 8 = 20 R3; 163 ÷ 5 = 32 R3 (not 2).", misconceptionId: "E-r9-a" },
        { text: "155", correct: false, feedback: "155 ÷ 8 = 19 R3; 155 ÷ 5 = 31 R0.", misconceptionId: "E-r9-b" },
        { text: "171", correct: false, feedback: "171 ÷ 8 = 21 R3; 171 ÷ 5 = 34 R1.", misconceptionId: "E-r9-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r9-a",
        description: "Student answers 163: checking, 163 ÷ 8 = 20 remainder 3 (satisfies the first condition), but 163 ÷ 5 = 32 remainder 3, not the required remainder 2.",
        rootCause: "Only First Condition Checked — the number satisfies the ÷8 condition but the ÷5 condition was never verified before selecting it.",
        remediation: "Have the student check EVERY candidate against BOTH conditions before accepting it, writing out both division checks explicitly."
      },
      {
        misconceptionId: "E-r9-b",
        description: "Student answers 155: checking, 155 ÷ 8 = 19 remainder 3 (satisfies the first condition), but 155 ÷ 5 = 31 remainder 0, not the required remainder 2.",
        rootCause: "Only First Condition Checked — the number satisfies the ÷8 condition but the ÷5 condition was never verified before selecting it.",
        remediation: "Have the student check EVERY candidate against BOTH conditions before accepting it, writing out both division checks explicitly."
      },
      {
        misconceptionId: "E-r9-c",
        description: "Student answers 171: checking, 171 ÷ 8 = 21 remainder 3 (satisfies the first condition), but 171 ÷ 5 = 34 remainder 1, not the required remainder 2.",
        rootCause: "Only First Condition Checked — the number satisfies the ÷8 condition but the ÷5 condition was never verified before selecting it.",
        remediation: "Have the student check EVERY candidate against BOTH conditions before accepting it, writing out both division checks explicitly."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "List numbers satisfying the first condition", hint: "Between 100 and 200, which numbers leave remainder 3 when divided by 8?" },
      { level: 2, description: "Test each against the second condition", hint: "For each candidate from your list, check: does it leave remainder 2 when divided by 5?" },
      { level: 3, description: "Confirm your answer", hint: "Verify your final answer satisfies BOTH conditions by doing both divisions explicitly." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "DIV-03", probability: 0.3, condition: "Comfort reconstructing numbers from divisor/remainder pairs supports this dual-condition reasoning." }
    ],
    learningObjectives: []
  },
  {
    itemId: "r10", order: 10, cluster: "POW10", clusterName: CLUSTER_NAMES.POW10,
    skillId: "POW10-03",
    question: "Convert 4.5 lakh into hundreds. (1 lakh = 1,00,000)",
    options: [
        { text: "4,500", correct: true, feedback: "4.5 lakh = 4,50,000; ÷100 = 4,500." },
        { text: "45,000", correct: false, feedback: "That's the number of tens.", misconceptionId: "E-r10-a" },
        { text: "45", correct: false, feedback: "Divided by 10,000.", misconceptionId: "E-r10-b" },
        { text: "4,50,000", correct: false, feedback: "That's the number of ones.", misconceptionId: "E-r10-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r10-a",
        description: "Student answers 45,000 — this is 4,50,000 ÷ 10, one zero short of the two zeros that ÷100 requires.",
        rootCause: "Zero-Count Error (Short) — only one zero was removed instead of the two that dividing by 100 requires.",
        remediation: "Have the student count the zeros in 100 (two) before removing digits, and remove exactly that many."
      },
      {
        misconceptionId: "E-r10-b",
        description: "Student answers 45 — this is 4,50,000 ÷ 10,000, two zeros too many removed for counting hundreds.",
        rootCause: "Zero-Count Error (Over-Removal) — four zeros were removed instead of the two that dividing by 100 requires.",
        remediation: "Line up 100, 1,000, and 10,000 and count zeros in each aloud so the student sees 100 has exactly two zeros."
      },
      {
        misconceptionId: "E-r10-c",
        description: "Student answers 4,50,000, the original number itself, as if it directly counted the number of hundreds.",
        rootCause: "Unit Confusion — the student reported the number of ONES (4,50,000) instead of dividing by 100 to find the number of HUNDREDS.",
        remediation: "Have the student practice with a smaller number first (e.g. 'how many hundreds in 500?' → 500 ÷ 100 = 5) before applying the same division to 4.5 lakh."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Convert to the base unit", hint: "4.5 lakh = 4,50,000." },
      { level: 2, description: "Recall what 'how many hundreds' means", hint: "'How many hundreds' in a number means dividing that number by 100." },
      { level: 3, description: "Divide by 100", hint: "4,50,000 ÷ 100 = ? (remove two zeros)." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "POW10-04", probability: 0.4, condition: "Large-scale conversions rely on this same counting-by-place-value reasoning." }
    ],
    learningObjectives: ["CCSS.MATH.5.NBT.A.1"]
  },
  {
    itemId: "r11", order: 11, cluster: "EST", clusterName: CLUSTER_NAMES.EST,
    skillId: "EST-04",
    question: "Estimate (9,876 - 3,210) × 4 by rounding each inside number to the nearest 1,000. Then find the exact value and the difference.",
    options: [
        { text: "1,336", correct: true, feedback: "Estimate: (10,000-3,000)×4=28,000. Exact: 6,666×4=26,664. Difference = 1,336." },
        { text: "28,000", correct: false, feedback: "That's the estimate.", misconceptionId: "E-r11-a" },
        { text: "26,664", correct: false, feedback: "Exact value.", misconceptionId: "E-r11-b" },
        { text: "1,300", correct: false, feedback: "Approximation.", misconceptionId: "E-r11-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r11-a",
        description: "Student answers 28,000, which is only the estimate, with the final 'find the difference' step never performed.",
        rootCause: "Incomplete Multi-Step — the estimate was found correctly, but the required comparison (estimate − exact) was skipped.",
        remediation: "Have the student underline all three required results — estimate, exact, and difference — and confirm all three are computed before answering."
      },
      {
        misconceptionId: "E-r11-b",
        description: "Student answers 26,664, which is only the exact value, with the estimate and the difference between them never computed.",
        rootCause: "Wrong Component Selected — the student reported the exact value alone, missing that the question asks for the DIFFERENCE between estimate and exact.",
        remediation: "Have the student compute and label both values ('estimate = ...', 'exact = ...') before subtracting one from the other."
      },
      {
        misconceptionId: "E-r11-c",
        description: "Student answers 1,300, close to but not equal to the exact difference of 1,336.",
        rootCause: "Exact-vs-Estimate Confusion — the student rounded the final difference instead of computing estimate − exact precisely.",
        remediation: "Require the exact value and the estimate to both be written out fully, then subtracted exactly, with no rounding of the final difference."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Compute the estimate", hint: "Round 9,876 to 10,000 and 3,210 to 3,000, subtract, then multiply by 4." },
      { level: 2, description: "Compute the exact value", hint: "Subtract the original numbers exactly (9,876 − 3,210), then multiply by 4." },
      { level: 3, description: "Find the difference", hint: "Subtract the smaller result from the larger one." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "WORD-04", probability: 0.3, condition: "Error-analysis word problems build on this same estimate-then-compare structure." }
    ],
    learningObjectives: ["CCSS.MATH.4.NBT.A.3", "CCSS.MATH.5.OA.A.1"]
  },
  {
    itemId: "r12", order: 12, cluster: "WORD", clusterName: CLUSTER_NAMES.WORD,
    skillId: "WORD-04",
    question: "2,500 oranges are packed in bags of 50. Each bag is sold for ₹150. Also 300 loose oranges are sold at ₹5 each. Find the total money received.",
    options: [
        { text: "₹9,000", correct: true, feedback: "Bags: 2,500÷50=50; 50×₹150=₹7,500. Loose: 300×₹5=₹1,500. Total=₹9,000." },
        { text: "₹7,500", correct: false, feedback: "Only bags.", misconceptionId: "E-r12-a" },
        { text: "₹1,500", correct: false, feedback: "Only loose oranges.", misconceptionId: "E-r12-b" },
        { text: "₹8,000", correct: false, feedback: "Estimate.", misconceptionId: "E-r12-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r12-a",
        description: "Student answers ₹7,500, exactly the bag sales alone, with the loose-orange sales (₹1,500) never added.",
        rootCause: "Missing Item — one of the two revenue sources (loose oranges) was left out of the total.",
        remediation: "Have the student list every revenue source mentioned in the problem (bags AND loose oranges) before computing a total, to make sure none are missed."
      },
      {
        misconceptionId: "E-r12-b",
        description: "Student answers ₹1,500, exactly the loose-orange sales alone, with the bag sales (₹7,500) never added.",
        rootCause: "Missing Item — the other revenue source (bags) was left out of the total, with only the smaller loose-orange calculation reported.",
        remediation: "Have the student compute BOTH revenue sources explicitly (bags and loose oranges) before adding them together for a grand total."
      },
      {
        misconceptionId: "E-r12-c",
        description: "Student answers ₹8,000, close to but not equal to the exact total ₹9,000.",
        rootCause: "Exact-vs-Estimate Confusion — the student estimated a round number instead of computing both revenue sources exactly and adding them.",
        remediation: "Point out that actual money received needs to be exact, not estimated, and require both exact revenue totals to be shown before adding."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the bag revenue", hint: "First find how many bags (2,500 ÷ 50), then multiply by the price per bag (₹150)." },
      { level: 2, description: "Find the loose-orange revenue", hint: "Multiply 300 loose oranges by ₹5 each." },
      { level: 3, description: "Add both revenue sources", hint: "Total money = bag revenue + loose-orange revenue." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "WORD-03", probability: 0.4, condition: "This multi-source revenue structure builds on comfort with simpler two-step problems." }
    ],
    learningObjectives: ["CCSS.MATH.4.OA.A.3"]
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
    title: "Operations on Whole Numbers — Problem-Solving & Synthesis",
    subtitle: "Telangana & Cambridge · Level 3 · Problem-Solving & Synthesis",
    description: "Non-routine synthesis problems combining addition, subtraction, multiplication, division, and estimation in sequence, with reverse-operation reasoning.",
    clusterNames: CLUSTER_NAMES,
    gateReviewHTML: '<strong>Quick Review – Non-Routine Synthesis</strong><br>' +
      "&bull; Combine operations to construct a solution path — there is often more than one way.<br>" +
      "&bull; Work backwards when needed; reverse operations carefully.<br>" +
      "&bull; Use estimation to check if your final answer is reasonable.<br>" +
      "&bull; Multi-step problems may require addition, multiplication, subtraction, or division in sequence.<br>" +
      "&bull; Read each problem fully — sometimes you need to find an intermediate value first.<br>",
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

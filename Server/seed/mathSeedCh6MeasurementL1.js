// seed/mathSeedCh6MeasurementL1.js
//
// Populates math_chapters and math_questions with Grade 5, Chapter 6
// (Measurement), Level 1 — converted from the standalone HTML file
// ch-6-measurement-level-1.html.
//
// Run with: node seed/mathSeedCh6MeasurementL1.js

const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-5";
const GRADE_LABEL = "Grade 5";
const CHAPTER_SLUG = "ch-6-measurement";
const CHAPTER_NAME = "Measurement";
const LEVEL = 1;

const CLUSTER_NAMES = {
  LENGTH: "Length",
  MASS: "Mass",
  CAP: "Capacity",
  TIME: "Time",
  MONEY: "Money",
  PAV: "Perimeter, Area & Volume"
};

const warmupItems = [
  {
    itemId: "w1",
    order: 1,
    cluster: "LENGTH",
    clusterName: CLUSTER_NAMES.LENGTH,
    skillId: "MEASLEN-01",
    question: "Convert 5 km to metres.",
    options: [
        { text: "5000 m", correct: true, feedback: "1 km = 1000 m, so 5 × 1000 = 5000 m." },
        { text: "500 m", correct: false, feedback: "You multiplied by 100 instead of 1000.", misconceptionId: "E-w1-a" },
        { text: "50 m", correct: false, feedback: "You multiplied by 10.", misconceptionId: "E-w1-b" },
        { text: "50000 m", correct: false, feedback: "You multiplied by 10000.", misconceptionId: "E-w1-c" }
      ],
    retryHint: "1 km = 1000 m. Multiply the number of kilometres by 1000.",
    misconceptions: [
      {
        misconceptionId: "E-w1-a",
        description: "Student multiplies 5 by 100 instead of 1000, undershooting by a factor of 10.",
        rootCause: "Power-of-Ten Shift Miscount — confuses the km-to-m conversion factor with the km-to-hm (hectometre) factor.",
        remediation: "Count the zeros in 1000 (three zeros) — multiplying by 1000 shifts the decimal point three places right: 5 → 5000."
      },
      {
        misconceptionId: "E-w1-b",
        description: "Student multiplies 5 by 10 instead of 1000, undershooting drastically.",
        rootCause: "Conversion Factor Confusion — applies a ×10 shift (as used for cm-to-mm) instead of the correct ×1000 for km-to-m.",
        remediation: "Memorise the exact conversion fact: 1 km = 1000 m, not 10 m or 100 m — always check the conversion factor before multiplying."
      },
      {
        misconceptionId: "E-w1-c",
        description: "Student multiplies 5 by 10000, overshooting by a factor of 10.",
        rootCause: "Power-of-Ten Shift Miscount — adds an extra zero beyond the correct three-zero shift.",
        remediation: "Recount the zeros in 1000 carefully — there are exactly three, so 5 km becomes 5000 m, not 50000 m."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the conversion fact", hint: "1 km = 1000 m." },
      { level: 2, description: "Set up the multiplication", hint: "5 × 1000 = ?" },
      { level: 3, description: "Shift the decimal", hint: "Multiplying by 1000 moves the decimal three places right." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.MD.A.1"]
  },
  {
    itemId: "w2",
    order: 2,
    cluster: "MASS",
    clusterName: CLUSTER_NAMES.MASS,
    skillId: "MEASMASS-01",
    question: "Convert 3 kg to grams.",
    options: [
        { text: "3000 g", correct: true, feedback: "1 kg = 1000 g, so 3 × 1000 = 3000 g." },
        { text: "300 g", correct: false, feedback: "You multiplied by 100.", misconceptionId: "E-w2-a" },
        { text: "30 g", correct: false, feedback: "You multiplied by 10.", misconceptionId: "E-w2-b" },
        { text: "30000 g", correct: false, feedback: "You multiplied by 10000.", misconceptionId: "E-w2-c" }
      ],
    retryHint: "1 kg = 1000 g. Multiply by 1000.",
    misconceptions: [
      {
        misconceptionId: "E-w2-a",
        description: "Student multiplies 3 by 100 instead of 1000, undershooting by a factor of 10.",
        rootCause: "Power-of-Ten Shift Miscount — applies a two-zero shift instead of the correct three-zero shift.",
        remediation: "Count the zeros in 1000 (three zeros) before multiplying — 3 kg × 1000 = 3000 g, not 300 g."
      },
      {
        misconceptionId: "E-w2-b",
        description: "Student multiplies 3 by 10 instead of 1000, undershooting drastically.",
        rootCause: "Conversion Factor Confusion — mixes up the kg-to-g factor with a smaller metric prefix's factor.",
        remediation: "Memorise the exact fact: 1 kg = 1000 g — always double-check the conversion factor before multiplying."
      },
      {
        misconceptionId: "E-w2-c",
        description: "Student multiplies 3 by 10000, overshooting by a factor of 10.",
        rootCause: "Power-of-Ten Shift Miscount — adds an extra zero beyond the correct three-zero shift.",
        remediation: "Recount the zeros in 1000 — there are exactly three, so 3 kg becomes 3000 g, not 30000 g."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the conversion fact", hint: "1 kg = 1000 g." },
      { level: 2, description: "Set up the multiplication", hint: "3 × 1000 = ?" },
      { level: 3, description: "Shift the decimal", hint: "Multiplying by 1000 moves the decimal three places right." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.MD.A.1"]
  },
  {
    itemId: "w3",
    order: 3,
    cluster: "CAP",
    clusterName: CLUSTER_NAMES.CAP,
    skillId: "MEASCAP-01",
    question: "Convert 2.5 litres to millilitres.",
    options: [
        { text: "2500 ml", correct: true, feedback: "1 l = 1000 ml, so 2.5 × 1000 = 2500 ml." },
        { text: "250 ml", correct: false, feedback: "You multiplied by 100.", misconceptionId: "E-w3-a" },
        { text: "25 ml", correct: false, feedback: "You multiplied by 10.", misconceptionId: "E-w3-b" },
        { text: "25000 ml", correct: false, feedback: "You multiplied by 10000.", misconceptionId: "E-w3-c" }
      ],
    retryHint: "1 litre = 1000 ml. Multiply by 1000.",
    misconceptions: [
      {
        misconceptionId: "E-w3-a",
        description: "Student multiplies 2.5 by 100 instead of 1000, undershooting by a factor of 10.",
        rootCause: "Power-of-Ten Shift Miscount — applies a two-zero shift instead of the correct three-zero shift.",
        remediation: "Count the zeros in 1000 (three zeros) — 2.5 × 1000 = 2500, shifting the decimal three places right."
      },
      {
        misconceptionId: "E-w3-b",
        description: "Student multiplies 2.5 by 10 instead of 1000, undershooting drastically.",
        rootCause: "Conversion Factor Confusion — mixes up the litre-to-ml factor with a smaller metric prefix's factor.",
        remediation: "Memorise the exact fact: 1 litre = 1000 ml — always confirm the conversion factor before multiplying."
      },
      {
        misconceptionId: "E-w3-c",
        description: "Student multiplies 2.5 by 10000, overshooting by a factor of 10.",
        rootCause: "Power-of-Ten Shift Miscount — adds an extra zero beyond the correct three-zero shift.",
        remediation: "Recount the zeros in 1000 — there are exactly three, so 2.5 l becomes 2500 ml, not 25000 ml."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the conversion fact", hint: "1 litre = 1000 ml." },
      { level: 2, description: "Set up the multiplication", hint: "2.5 × 1000 = ?" },
      { level: 3, description: "Shift the decimal", hint: "Multiplying by 1000 moves the decimal three places right: 2.5 → 2500." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.MD.A.1"]
  },
  {
    itemId: "w4",
    order: 4,
    cluster: "TIME",
    clusterName: CLUSTER_NAMES.TIME,
    skillId: "MEASTIME-01",
    question: "How many minutes are there in 2 hours?",
    options: [
        { text: "120 min", correct: true, feedback: "1 hour = 60 min, so 2 × 60 = 120 min." },
        { text: "60 min", correct: false, feedback: "That's only 1 hour.", misconceptionId: "E-w4-a" },
        { text: "180 min", correct: false, feedback: "That's 3 hours.", misconceptionId: "E-w4-b" },
        { text: "200 min", correct: false, feedback: "Incorrect multiplication.", misconceptionId: "E-w4-c" }
      ],
    retryHint: "Multiply the number of hours by 60.",
    misconceptions: [
      {
        misconceptionId: "E-w4-a",
        description: "Student answers as if there is only 1 hour, ignoring that the question asks about 2 hours.",
        rootCause: "Quantity Misread — loses track of the number of hours stated in the question.",
        remediation: "Re-read the question: it asks for 2 HOURS, not 1 — multiply 60 minutes by 2, not by 1."
      },
      {
        misconceptionId: "E-w4-b",
        description: "Student computes minutes for 3 hours instead of 2, overshooting by one hour's worth.",
        rootCause: "Quantity Misread — miscounts the number of hours as one more than stated.",
        remediation: "Double-check the number in the question — it says 2 hours, so multiply 60 × 2, not 60 × 3."
      },
      {
        misconceptionId: "E-w4-c",
        description: "Student uses 100 minutes per hour instead of the correct 60, treating time like a decimal/metric unit.",
        rootCause: "Base-10 Overgeneralization — mistakenly applies the metric base-10 pattern (used for km, kg, litres) to time, which is base-60.",
        remediation: "Time is NOT a base-10 unit — there are 60 minutes in an hour (not 100), so 2 hours = 2 × 60 = 120 minutes."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the conversion fact", hint: "1 hour = 60 minutes." },
      { level: 2, description: "Set up the multiplication", hint: "2 × 60 = ?" },
      { level: 3, description: "Compute", hint: "60 + 60 = ?" }
    ],
    forwardRiskLinks: [
      { targetSkillId: "MEASTIME-03", probability: 0.35, condition: "Treating time as a base-10 unit (like metric measures) instead of base-60 recurs in elapsed-time and clock-conversion problems." }
    ],
    learningObjectives: ["CCSS.MATH.CONTENT.5.MD.A.1"]
  },
  {
    itemId: "w5",
    order: 5,
    cluster: "MONEY",
    clusterName: CLUSTER_NAMES.MONEY,
    skillId: "MEASMONEY-01",
    question: "₹50.50 + ₹25.25 = ?",
    options: [
        { text: "₹75.75", correct: true, feedback: "50.50 + 25.25 = 75.75." },
        { text: "₹75.00", correct: false, feedback: "You ignored the paise.", misconceptionId: "E-w5-a" },
        { text: "₹75.80", correct: false, feedback: "Incorrect addition of paise.", misconceptionId: "E-w5-b" },
        { text: "₹75.50", correct: false, feedback: "Incorrect.", misconceptionId: "E-w5-c" }
      ],
    retryHint: "Add rupees and paise separately. 100 paise = ₹1.",
    misconceptions: [
      {
        misconceptionId: "E-w5-a",
        description: "Student adds only the whole-rupee parts (50+25=75) and drops the paise (decimal) parts entirely.",
        rootCause: "Decimal Part Ignored — treats the amounts as whole numbers, discarding everything after the decimal point.",
        remediation: "Add BOTH parts: rupees (50+25=75) AND paise (0.50+0.25=0.75), then combine: 75+0.75=75.75."
      },
      {
        misconceptionId: "E-w5-b",
        description: "Student makes a small error adding the paise (hundredths) digits, landing on 0.80 instead of 0.75.",
        rootCause: "Decimal Addition Slip — miscalculates 0.50 + 0.25.",
        remediation: "Add the paise parts carefully: 50 paise + 25 paise = 75 paise = ₹0.75 — recompute this addition."
      },
      {
        misconceptionId: "E-w5-c",
        description: "Student adds only part of the paise, arriving at 75.50 instead of 75.75.",
        rootCause: "Decimal Addition Slip — drops or misreads one of the two paise values during addition.",
        remediation: "Align the two amounts by decimal place and add column by column: 50.50 + 25.25, checking the paise column (50+25=75) separately from rupees."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Align by decimal point", hint: "Stack 50.50 and 25.25 with decimal points matching." },
      { level: 2, description: "Add the paise (decimal) parts", hint: "50 + 25 = 75 paise = ₹0.75." },
      { level: 3, description: "Add the rupee parts", hint: "50 + 25 = 75 rupees. Combine: ₹75 + ₹0.75." }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "w6",
    order: 6,
    cluster: "PAV",
    clusterName: CLUSTER_NAMES.PAV,
    skillId: "MEASPAV-01",
    question: "Find the perimeter of a rectangle with length 8 cm and breadth 5 cm.",
    options: [
        { text: "26 cm", correct: true, feedback: "Perimeter = 2 × (8+5) = 2 × 13 = 26 cm." },
        { text: "40 cm", correct: false, feedback: "That's the area (8×5).", misconceptionId: "E-w6-a" },
        { text: "13 cm", correct: false, feedback: "That's half the perimeter.", misconceptionId: "E-w6-b" },
        { text: "20 cm", correct: false, feedback: "Incorrect.", misconceptionId: "E-w6-c" }
      ],
    retryHint: "Perimeter = 2 × (length + breadth).",
    misconceptions: [
      {
        misconceptionId: "E-w6-a",
        description: "Student computes the area (length × breadth) instead of the perimeter.",
        rootCause: "Perimeter/Area Formula Confusion — applies the multiplication formula (area) when the addition-based formula (perimeter) was needed.",
        remediation: "Perimeter measures the distance AROUND a shape (add the sides); area measures the space INSIDE it (multiply length × breadth) — check which one the question asks for."
      },
      {
        misconceptionId: "E-w6-b",
        description: "Student computes length + breadth (13) but forgets to double it, since a rectangle has two of each side.",
        rootCause: "Missing-Doubling Step — stops after adding the two different side lengths once, forgetting the rectangle has TWO of each.",
        remediation: "A rectangle has two lengths and two breadths — after adding length + breadth once, multiply that sum by 2: 2 × (8+5) = 26."
      },
      {
        misconceptionId: "E-w6-c",
        description: "Student adds all sides incorrectly, perhaps adding length + breadth without doubling correctly, or double-counting one side.",
        rootCause: "Perimeter Computation Error — a general miscalculation in applying the perimeter formula.",
        remediation: "Use the formula precisely: Perimeter = 2 × (length + breadth) = 2 × (8 + 5) — compute the bracket first, then double it."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the formula", hint: "Perimeter of rectangle = 2 × (length + breadth)." },
      { level: 2, description: "Add length and breadth", hint: "8 + 5 = 13." },
      { level: 3, description: "Double the sum", hint: "2 × 13 = ?" }
    ],
    forwardRiskLinks: [
      { targetSkillId: "MEASPAV-03", probability: 0.35, condition: "Confusing the perimeter and area formulas recurs whenever both are asked about the same shape in later problems." }
    ],
    learningObjectives: ["CCSS.MATH.CONTENT.5.MD.C.5"]
  },
  {
    itemId: "w7",
    order: 7,
    cluster: "MASS",
    clusterName: CLUSTER_NAMES.MASS,
    skillId: "MEASMASS-02",
    question: "Subtract 2 kg 500 g from 5 kg.",
    options: [
        { text: "2 kg 500 g", correct: true, feedback: "5 kg = 5000 g; minus 2500 g = 2500 g = 2 kg 500 g." },
        { text: "3 kg 500 g", correct: false, feedback: "You added instead of subtracting.", misconceptionId: "E-w7-a" },
        { text: "2 kg", correct: false, feedback: "You forgot the grams.", misconceptionId: "E-w7-b" },
        { text: "2 kg 250 g", correct: false, feedback: "Incorrect subtraction.", misconceptionId: "E-w7-c" }
      ],
    retryHint: "Convert both to grams or kilograms, then subtract.",
    misconceptions: [
      {
        misconceptionId: "E-w7-a",
        description: "Student adds 5 kg and 2 kg 500 g instead of subtracting, producing a result larger than the starting amount.",
        rootCause: "Operation Sign Misread — performs addition when subtraction was requested.",
        remediation: "The question says 'subtract... FROM 5 kg' — this means 5 kg minus the other amount, not plus it."
      },
      {
        misconceptionId: "E-w7-b",
        description: "Student subtracts the whole-kilogram parts (5-2=3, rounds oddly to 2) but drops the grams entirely from the answer.",
        rootCause: "Mixed-Unit Component Dropped — ignores the grams component when working with combined kg+g quantities.",
        remediation: "Convert both amounts fully to grams first (5 kg=5000g, 2kg500g=2500g), subtract, then convert back — this keeps both components tracked."
      },
      {
        misconceptionId: "E-w7-c",
        description: "Student makes an error converting or subtracting, landing 250 g short of the correct answer.",
        rootCause: "Mixed-Unit Subtraction Error — a computational slip when subtracting combined kg+g quantities.",
        remediation: "Convert everything to grams: 5 kg = 5000 g, 2 kg 500 g = 2500 g. Subtract: 5000 - 2500 = 2500 g, then convert back to kg+g."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Convert to a single unit", hint: "5 kg = 5000 g. 2 kg 500 g = 2500 g." },
      { level: 2, description: "Subtract", hint: "5000 - 2500 = ?" },
      { level: 3, description: "Convert back to mixed units", hint: "2500 g = ? kg ? g." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.MD.A.1"]
  },
  {
    itemId: "w8",
    order: 8,
    cluster: "CAP",
    clusterName: CLUSTER_NAMES.CAP,
    skillId: "MEASCAP-02",
    question: "A bottle holds 750 ml. How many ml are there in 4 such bottles?",
    options: [
        { text: "3000 ml", correct: true, feedback: "750 × 4 = 3000 ml." },
        { text: "300 ml", correct: false, feedback: "You divided instead of multiplying.", misconceptionId: "E-w8-a" },
        { text: "30000 ml", correct: false, feedback: "Extra zero.", misconceptionId: "E-w8-b" },
        { text: "754 ml", correct: false, feedback: "You added instead of multiplying.", misconceptionId: "E-w8-c" }
      ],
    retryHint: "Multiply the capacity of one bottle by the number of bottles.",
    misconceptions: [
      {
        misconceptionId: "E-w8-a",
        description: "Student divides 750 by a value instead of multiplying by 4, producing a much smaller result.",
        rootCause: "Operation Selection Error — applies division when the question ('how many in 4 bottles') calls for multiplication.",
        remediation: "Since each of 4 bottles holds 750 ml, the TOTAL is found by multiplying: 750 × 4, not dividing."
      },
      {
        misconceptionId: "E-w8-b",
        description: "Student computes the correct digits (3000) but adds an extra zero, overshooting by a factor of 10.",
        rootCause: "Multiplication Place-Value Slip — miscounts the zeros when multiplying 750 by 4.",
        remediation: "Multiply 75 × 4 = 300 first, then account for the extra zero in 750: 300 × 10 = 3000, not 30000."
      },
      {
        misconceptionId: "E-w8-c",
        description: "Student adds 750 + 4 instead of multiplying, producing a result close to the original single-bottle value.",
        rootCause: "Operation Selection Error — performs addition when multiplication was needed for 'repeated groups of 750'.",
        remediation: "'4 such bottles' means 4 equal groups of 750 ml — repeated groups are combined by MULTIPLICATION (750×4), not addition (750+4)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the operation", hint: "4 equal bottles means multiply." },
      { level: 2, description: "Set up the multiplication", hint: "750 × 4 = ?" },
      { level: 3, description: "Compute", hint: "700×4=2800, 50×4=200, add them." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.MD.A.1"]
  }
];

const diagnosticItems = [
  {
    itemId: "d1",
    order: 1,
    cluster: "LENGTH",
    clusterName: CLUSTER_NAMES.LENGTH,
    skillId: "MEASLEN-02",
    question: "Add: 3 km 250 m + 1 km 750 m",
    options: [
        { text: "5 km", correct: true, feedback: "250 m + 750 m = 1000 m = 1 km. 3 km + 1 km + 1 km = 5 km." },
        { text: "4 km", correct: false, feedback: "You forgot to add the extra 1 km from the metres sum.", misconceptionId: "E-d1-a" },
        { text: "5.1 km", correct: false, feedback: "Carry error in the metres.", misconceptionId: "E-d1-b" },
        { text: "5.01 km", correct: false, feedback: "Incorrect decimal placement.", misconceptionId: "E-d1-c" }
      ],
    backward: "Convert to the same unit or add metres and km separately; 250 m + 750 m = 1000 m = 1 km.",
    forward: "Adding lengths is used in measuring distances and perimeters.",
    misconceptions: [
      {
        misconceptionId: "E-d1-a",
        description: "Student adds the km parts (3+1=4) but forgets that the metres sum (250+750=1000m) itself makes an extra whole kilometre.",
        rootCause: "Carry-Across-Units Omission — doesn't recognise that 1000 m regroups into 1 more km, the way 10 ones regroup into a ten.",
        remediation: "After adding the metres (250+750=1000m), check if the result is 1000 or more — if so, that's an EXTRA km to add on top of the km already summed."
      },
      {
        misconceptionId: "E-d1-b",
        description: "Student adds correctly but expresses the carried km as a decimal fraction (5.1) instead of a whole additional km.",
        rootCause: "Mixed-Unit to Decimal Confusion — mistakenly treats 1000 m as 0.1 km instead of a full 1 km.",
        remediation: "1000 m equals exactly 1 whole km (not 0.1 km) — since 1 km = 1000 m, a full 1000 m carries as +1, not +0.1."
      },
      {
        misconceptionId: "E-d1-c",
        description: "Student adds correctly but misplaces the decimal point when expressing the carried amount, landing on 5.01 km.",
        rootCause: "Mixed-Unit to Decimal Confusion — a more severe decimal misplacement of the carried 1000 m.",
        remediation: "1000 m = 1 km exactly — this carries as a full whole number (+1), so the correct total is a whole number of km: 5 km."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Add the metres first", hint: "250 m + 750 m = ?" },
      { level: 2, description: "Check for a whole km", hint: "Is the metres sum 1000 or more? 1000 m = 1 km." },
      { level: 3, description: "Add all km parts together", hint: "3 km + 1 km + (the extra 1 km from metres) = ?" }
    ],
    forwardRiskLinks: [
      { targetSkillId: "MEASMASS-02", probability: 0.4, condition: "Difficulty carrying a regrouped unit (1000 m → 1 km) recurs in mixed-unit subtraction across mass and capacity." }
    ],
    learningObjectives: ["CCSS.MATH.CONTENT.5.MD.A.1"]
  },
  {
    itemId: "d2",
    order: 2,
    cluster: "MASS",
    clusterName: CLUSTER_NAMES.MASS,
    skillId: "MEASMASS-03",
    question: "Convert 4500 g to kg.",
    options: [
        { text: "4.5 kg", correct: true, feedback: "Divide by 1000: 4500 ÷ 1000 = 4.5 kg." },
        { text: "45 kg", correct: false, feedback: "You divided by 100.", misconceptionId: "E-d2-a" },
        { text: "0.45 kg", correct: false, feedback: "You divided by 10000.", misconceptionId: "E-d2-b" },
        { text: "450 kg", correct: false, feedback: "You multiplied by 100.", misconceptionId: "E-d2-c" }
      ],
    backward: "1 kg = 1000 g, so divide grams by 1000.",
    forward: "Converting between units is essential in science and cooking.",
    misconceptions: [
      {
        misconceptionId: "E-d2-a",
        description: "Student divides 4500 by 100 instead of 1000, overshooting the result by a factor of 10.",
        rootCause: "Power-of-Ten Shift Miscount — applies a two-zero shift instead of the correct three-zero shift.",
        remediation: "Count the zeros in 1000 (three zeros) — dividing by 1000 moves the decimal three places left: 4500 → 4.5."
      },
      {
        misconceptionId: "E-d2-b",
        description: "Student divides 4500 by 10000, undershooting the result by a factor of 10.",
        rootCause: "Power-of-Ten Shift Miscount — applies a four-zero shift instead of the correct three-zero shift.",
        remediation: "Recount the zeros in 1000 — there are exactly three, so 4500 g ÷ 1000 = 4.5 kg, not 0.45 kg."
      },
      {
        misconceptionId: "E-d2-c",
        description: "Student multiplies by 100 instead of dividing by 1000, moving in the wrong direction entirely.",
        rootCause: "Multiplication/Division Direction Confusion — applies the inverse operation to what converting grams (a smaller unit) to kilograms (a larger unit) requires.",
        remediation: "Converting a SMALLER unit (g) to a LARGER unit (kg) always means DIVIDING — 4500 g ÷ 1000 = 4.5 kg."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the conversion fact", hint: "1 kg = 1000 g, so g to kg means dividing by 1000." },
      { level: 2, description: "Set up the division", hint: "4500 ÷ 1000 = ?" },
      { level: 3, description: "Shift the decimal", hint: "Dividing by 1000 moves the decimal three places left." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.MD.A.1"]
  },
  {
    itemId: "d3",
    order: 3,
    cluster: "CAP",
    clusterName: CLUSTER_NAMES.CAP,
    skillId: "MEASCAP-03",
    question: "A jug has 1.5 l of water. 300 ml is poured out. How much is left?",
    options: [
        { text: "1.2 l", correct: true, feedback: "1.5 l = 1500 ml. 1500 − 300 = 1200 ml = 1.2 l." },
        { text: "1.2 ml", correct: false, feedback: "Wrong unit; 1200 ml is 1.2 l, not 1.2 ml.", misconceptionId: "E-d3-a" },
        { text: "1.8 l", correct: false, feedback: "You added instead of subtracting.", misconceptionId: "E-d3-b" },
        { text: "1.5 l", correct: false, feedback: "You didn't subtract.", misconceptionId: "E-d3-c" }
      ],
    backward: "Convert both to the same unit (litres or ml), then subtract.",
    forward: "Subtracting capacities is used in measuring remaining liquid.",
    misconceptions: [
      {
        misconceptionId: "E-d3-a",
        description: "Student computes the correct numeric answer (1.2) but reports the wrong unit, litres versus millilitres.",
        rootCause: "Unit Label Carryover Error — keeps working in ml but forgets to convert the final unit label back to litres.",
        remediation: "After computing 1200 ml, convert back to litres by dividing by 1000: 1200 ml = 1.2 l — always match your final unit to what makes sense for the size of the answer."
      },
      {
        misconceptionId: "E-d3-b",
        description: "Student adds the poured-out amount back instead of subtracting it, treating 'poured out' as adding.",
        rootCause: "Operation Sign Misread — misinterprets 'poured out' (a removal) as an addition.",
        remediation: "'Poured out' means water LEAVES the jug — this is subtraction: the amount left equals the starting amount MINUS the poured-out amount."
      },
      {
        misconceptionId: "E-d3-c",
        description: "Student reports the original amount unchanged, not applying any subtraction.",
        rootCause: "Operation Omitted — doesn't recognise that an action (pouring out) changes the quantity.",
        remediation: "Since some water was poured OUT, the remaining amount must be LESS than 1.5 l — subtract 300 ml (converted appropriately) from the original amount."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Convert to the same unit", hint: "1.5 l = 1500 ml." },
      { level: 2, description: "Subtract the poured-out amount", hint: "1500 - 300 = ?" },
      { level: 3, description: "Convert back to litres", hint: "1200 ml = ? l." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.MD.A.1"]
  },
  {
    itemId: "d4",
    order: 4,
    cluster: "TIME",
    clusterName: CLUSTER_NAMES.TIME,
    skillId: "MEASTIME-02",
    question: "Write 3:15 PM in the 24‑hour clock.",
    options: [
        { text: "15:15", correct: true, feedback: "For PM times after 12 noon, add 12: 3 + 12 = 15 → 15:15." },
        { text: "3:15", correct: false, feedback: "That's 12‑hour format.", misconceptionId: "E-d4-a" },
        { text: "13:15", correct: false, feedback: "That's 1:15 PM.", misconceptionId: "E-d4-b" },
        { text: "14:15", correct: false, feedback: "That's 2:15 PM.", misconceptionId: "E-d4-c" }
      ],
    backward: "For PM times after 12 noon, add 12 to the hour.",
    forward: "24‑hour clock is used in timetables and transport.",
    misconceptions: [
      {
        misconceptionId: "E-d4-a",
        description: "Student leaves the time unchanged in 12-hour format, not applying the +12 conversion at all.",
        rootCause: "Conversion Step Omitted — doesn't perform the required addition to convert to 24-hour format.",
        remediation: "24-hour format requires adding 12 to any PM hour after noon: 3 PM becomes 3+12=15, written as 15:15."
      },
      {
        misconceptionId: "E-d4-b",
        description: "Student adds 10 instead of 12, landing on the 24-hour equivalent of 1:15 PM instead of 3:15 PM.",
        rootCause: "Addition Constant Error — uses the wrong number to add when converting to 24-hour time.",
        remediation: "The conversion rule is always +12 for PM hours — 3 + 12 = 15, not 3 + 10 = 13."
      },
      {
        misconceptionId: "E-d4-c",
        description: "Student adds 11 instead of 12, landing on the 24-hour equivalent of 2:15 PM instead of 3:15 PM.",
        rootCause: "Addition Constant Error — a smaller miscalculation of the +12 conversion constant.",
        remediation: "Double-check the addition: 3 + 12 = 15 exactly — recount to make sure you're adding 12, not 11."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the rule", hint: "For PM times after noon, add 12 to the hour." },
      { level: 2, description: "Apply it", hint: "3 + 12 = ?" },
      { level: 3, description: "Write the full time", hint: "Keep the minutes the same: 15:15." }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d5",
    order: 5,
    cluster: "MONEY",
    clusterName: CLUSTER_NAMES.MONEY,
    skillId: "MEASMONEY-02",
    question: "Find the profit: Cost Price = ₹200, Selling Price = ₹250.",
    options: [
        { text: "₹50", correct: true, feedback: "Profit = SP − CP = 250 − 200 = ₹50." },
        { text: "₹450", correct: false, feedback: "You added SP + CP.", misconceptionId: "E-d5-a" },
        { text: "₹150", correct: false, feedback: "Incorrect subtraction.", misconceptionId: "E-d5-b" },
        { text: "₹250", correct: false, feedback: "That's the Selling Price.", misconceptionId: "E-d5-c" }
      ],
    backward: "Profit = Selling Price − Cost Price.",
    forward: "Profit and loss are used in business and everyday shopping.",
    misconceptions: [
      {
        misconceptionId: "E-d5-a",
        description: "Student adds Cost Price and Selling Price instead of subtracting, producing a value far too large.",
        rootCause: "Formula Operation Confusion — applies addition instead of the subtraction the profit formula requires.",
        remediation: "Profit = Selling Price MINUS Cost Price — always subtract, never add, the two prices."
      },
      {
        misconceptionId: "E-d5-b",
        description: "Student subtracts but makes a computational error, landing 100 more than the correct profit.",
        rootCause: "Subtraction Computation Error — miscalculates 250 - 200.",
        remediation: "Recompute carefully: 250 - 200 = 50 — verify by adding 50 back to 200 to see if it returns 250."
      },
      {
        misconceptionId: "E-d5-c",
        description: "Student reports the Selling Price itself instead of computing the difference between SP and CP.",
        rootCause: "Wrong Value Reported — confuses one of the given quantities with the requested result.",
        remediation: "The question asks for PROFIT, which is the DIFFERENCE between Selling Price and Cost Price — not either price alone."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the formula", hint: "Profit = Selling Price − Cost Price." },
      { level: 2, description: "Identify the values", hint: "SP = 250, CP = 200." },
      { level: 3, description: "Subtract", hint: "250 − 200 = ?" }
    ],
    forwardRiskLinks: [
      { targetSkillId: "MEASMONEY-03", probability: 0.3, condition: "Confusing addition and subtraction in the profit formula recurs when the related loss formula (CP − SP) is introduced." }
    ],
    learningObjectives: []
  },
  {
    itemId: "d6",
    order: 6,
    cluster: "PAV",
    clusterName: CLUSTER_NAMES.PAV,
    skillId: "MEASPAV-02",
    question: "Find the area of a rectangle with length 12 cm and breadth 5 cm.",
    options: [
        { text: "60 cm²", correct: true, feedback: "Area = length × breadth = 12 × 5 = 60 cm²." },
        { text: "34 cm", correct: false, feedback: "That's the perimeter (2×(12+5)).", misconceptionId: "E-d6-a" },
        { text: "60 cm", correct: false, feedback: "Missing square units (should be cm²).", misconceptionId: "E-d6-b" },
        { text: "30 cm²", correct: false, feedback: "You divided by 2.", misconceptionId: "E-d6-c" }
      ],
    backward: "Area of rectangle = length × breadth.",
    forward: "Area is used in flooring, painting, and land measurement.",
    misconceptions: [
      {
        misconceptionId: "E-d6-a",
        description: "Student computes the perimeter instead of the area, applying the wrong formula.",
        rootCause: "Perimeter/Area Formula Confusion — applies the addition-based perimeter formula when the multiplication-based area formula was needed.",
        remediation: "Area measures the space INSIDE a shape and uses multiplication (length × breadth); perimeter measures the distance AROUND and uses addition — check which the question asks for."
      },
      {
        misconceptionId: "E-d6-b",
        description: "Student computes the correct numeric value (60) but omits the required square units (cm²).",
        rootCause: "Missing Square Units — forgets that area is always measured in SQUARE units, not linear units.",
        remediation: "Area is always expressed in square units (cm², m², etc.) because it measures a two-dimensional space — always append the ² to the unit."
      },
      {
        misconceptionId: "E-d6-c",
        description: "Student divides the product by 2, halving the correct area unnecessarily.",
        rootCause: "Extraneous Halving Step — applies a division by 2 that belongs to a different formula (e.g. triangle area), not the rectangle area formula.",
        remediation: "Rectangle area is simply length × breadth with NO division by 2 — that halving step only applies to triangles."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the formula", hint: "Area of rectangle = length × breadth." },
      { level: 2, description: "Multiply", hint: "12 × 5 = ?" },
      { level: 3, description: "Add the units", hint: "Area is measured in square units: cm²." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "MEASPAV-04", probability: 0.35, condition: "Dropping square units on area answers recurs when volume (cubic units) is introduced next." }
    ],
    learningObjectives: ["CCSS.MATH.CONTENT.5.MD.C.5"]
  },
  {
    itemId: "d7",
    order: 7,
    cluster: "LENGTH",
    clusterName: CLUSTER_NAMES.LENGTH,
    skillId: "MEASLEN-01",
    question: "Convert 2.5 m to cm.",
    options: [
        { text: "250 cm", correct: true, feedback: "1 m = 100 cm, so 2.5 × 100 = 250 cm." },
        { text: "25 cm", correct: false, feedback: "You multiplied by 10.", misconceptionId: "E-d7-a" },
        { text: "2500 cm", correct: false, feedback: "You multiplied by 1000.", misconceptionId: "E-d7-b" },
        { text: "0.25 cm", correct: false, feedback: "You divided.", misconceptionId: "E-d7-c" }
      ],
    backward: "1 m = 100 cm, multiply by 100.",
    forward: "Metric conversions are fundamental in measurement.",
    misconceptions: [
      {
        misconceptionId: "E-d7-a",
        description: "Student multiplies 2.5 by 10 instead of 100, undershooting by a factor of 10.",
        rootCause: "Power-of-Ten Shift Miscount — applies a one-zero shift instead of the correct two-zero shift.",
        remediation: "Count the zeros in 100 (two zeros) — 2.5 × 100 = 250, shifting the decimal two places right."
      },
      {
        misconceptionId: "E-d7-b",
        description: "Student multiplies 2.5 by 1000 instead of 100, overshooting by a factor of 10.",
        rootCause: "Conversion Factor Confusion — mixes up the m-to-cm factor (100) with a different metric conversion factor (1000).",
        remediation: "Memorise the exact fact: 1 m = 100 cm (not 1000) — 1000 is used for km-to-m or kg-to-g, not m-to-cm."
      },
      {
        misconceptionId: "E-d7-c",
        description: "Student divides instead of multiplying, moving the decimal the wrong direction entirely.",
        rootCause: "Multiplication/Division Direction Confusion — applies the inverse operation to what converting metres (larger unit) to centimetres (smaller unit) requires.",
        remediation: "Converting a LARGER unit (m) to a SMALLER unit (cm) always means MULTIPLYING — 2.5 × 100 = 250."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the conversion fact", hint: "1 m = 100 cm." },
      { level: 2, description: "Set up the multiplication", hint: "2.5 × 100 = ?" },
      { level: 3, description: "Shift the decimal", hint: "Multiplying by 100 moves the decimal two places right." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.MD.A.1"]
  },
  {
    itemId: "d8",
    order: 8,
    cluster: "MASS",
    clusterName: CLUSTER_NAMES.MASS,
    skillId: "MEASMASS-04",
    question: "3 packets each weigh 250 g. Find the total mass in kg.",
    options: [
        { text: "0.75 kg", correct: true, feedback: "3 × 250 = 750 g. 750 ÷ 1000 = 0.75 kg." },
        { text: "750 kg", correct: false, feedback: "You didn't convert grams to kilograms.", misconceptionId: "E-d8-a" },
        { text: "7.5 kg", correct: false, feedback: "Decimal point misplaced (multiplied by 10?).", misconceptionId: "E-d8-b" },
        { text: "0.075 kg", correct: false, feedback: "Incorrect division by 10000.", misconceptionId: "E-d8-c" }
      ],
    backward: "First find total grams (3×250=750 g), then convert to kg.",
    forward: "Combining multiplication and unit conversion.",
    misconceptions: [
      {
        misconceptionId: "E-d8-a",
        description: "Student correctly finds 750 g but reports it with the wrong unit label (kg) instead of converting the number.",
        rootCause: "Unit Label Swap Without Conversion — changes the unit name without performing the actual division needed to convert the value.",
        remediation: "Finding 750 g and then converting to kg requires DIVIDING by 1000: 750 g ÷ 1000 = 0.75 kg — don't just relabel the number."
      },
      {
        misconceptionId: "E-d8-b",
        description: "Student divides 750 by 100 instead of 1000, overshooting the result by a factor of 10.",
        rootCause: "Power-of-Ten Shift Miscount — applies a two-zero shift instead of the correct three-zero shift.",
        remediation: "Count the zeros in 1000 (three zeros) — 750 ÷ 1000 = 0.75, shifting the decimal three places left."
      },
      {
        misconceptionId: "E-d8-c",
        description: "Student divides 750 by 10000 instead of 1000, undershooting the result by a factor of 10.",
        rootCause: "Power-of-Ten Shift Miscount — applies a four-zero shift instead of the correct three-zero shift.",
        remediation: "Recount the zeros in 1000 — there are exactly three, so 750 g ÷ 1000 = 0.75 kg, not 0.075 kg."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the total mass in grams first", hint: "3 × 250 = ?" },
      { level: 2, description: "Convert to kg", hint: "Divide the grams total by 1000." },
      { level: 3, description: "Shift the decimal", hint: "750 ÷ 1000 moves the decimal three places left." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.MD.A.1"]
  },
  {
    itemId: "d9",
    order: 9,
    cluster: "CAP",
    clusterName: CLUSTER_NAMES.CAP,
    skillId: "MEASCAP-01",
    question: "1 litre = ? millilitres",
    options: [
        { text: "1000 ml", correct: true, feedback: "The prefix 'milli' means one‑thousandth. 1 l = 1000 ml." },
        { text: "10 ml", correct: false, feedback: "That's centilitres.", misconceptionId: "E-d9-a" },
        { text: "100 ml", correct: false, feedback: "Incorrect; 1 l = 1000 ml.", misconceptionId: "E-d9-b" },
        { text: "10000 ml", correct: false, feedback: "Too large.", misconceptionId: "E-d9-c" }
      ],
    backward: "The prefix 'milli' means one‑thousandth.",
    forward: "Basic unit conversion fact.",
    misconceptions: [
      {
        misconceptionId: "E-d9-a",
        description: "Student confuses millilitres with centilitres, using the wrong metric prefix's conversion factor.",
        rootCause: "Metric Prefix Confusion — mixes up 'milli' (one-thousandth) with 'centi' (one-hundredth) or 'deci' (one-tenth).",
        remediation: "'Milli' specifically means one-THOUSANDTH — so 1 litre contains 1000 millilitres, not 10 or 100."
      },
      {
        misconceptionId: "E-d9-b",
        description: "Student answers 100, confusing the litre-to-ml conversion with a different (hundred-based) conversion factor.",
        rootCause: "Metric Prefix Confusion — applies a factor of 100 (associated with 'centi') instead of 1000 (associated with 'milli').",
        remediation: "Memorise the exact fact: 1 litre = 1000 ml — the 'milli' prefix always corresponds to a factor of 1000."
      },
      {
        misconceptionId: "E-d9-c",
        description: "Student overshoots, answering 10000 instead of the correct 1000.",
        rootCause: "Power-of-Ten Miscount — adds an extra zero beyond the correct conversion factor.",
        remediation: "Recount the zeros: 1 litre = 1000 ml exactly (three zeros), not 10000 (four zeros)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall what 'milli' means", hint: "Milli means one-thousandth." },
      { level: 2, description: "Apply it to litres", hint: "1 litre split into thousandths gives 1000 parts." },
      { level: 3, description: "State the fact", hint: "1 litre = ? ml." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.MD.A.1"]
  },
  {
    itemId: "d10",
    order: 10,
    cluster: "TIME",
    clusterName: CLUSTER_NAMES.TIME,
    skillId: "MEASTIME-03",
    question: "A movie starts at 10:00 AM and lasts 2 hours 30 minutes. What time does it end?",
    options: [
        { text: "12:30 PM", correct: true, feedback: "10:00 + 2 h = 12:00 noon; + 30 min = 12:30 PM." },
        { text: "12:00 PM", correct: false, feedback: "You forgot the 30 minutes.", misconceptionId: "E-d10-a" },
        { text: "1:00 PM", correct: false, feedback: "Added 3 hours.", misconceptionId: "E-d10-b" },
        { text: "12:30 AM", correct: false, feedback: "Wrong AM/PM.", misconceptionId: "E-d10-c" }
      ],
    backward: "Add hours first, then minutes.",
    forward: "Calculating end times is an everyday skill.",
    misconceptions: [
      {
        misconceptionId: "E-d10-a",
        description: "Student correctly adds the 2 hours (reaching 12:00 noon) but forgets to add the remaining 30 minutes.",
        rootCause: "Final-Step Omission — stops after adding the hours, dropping the minutes component of the duration.",
        remediation: "The movie lasts 2 hours AND 30 minutes — after adding the 2 hours, you must also add the 30 minutes to reach the final end time."
      },
      {
        misconceptionId: "E-d10-b",
        description: "Student adds an extra hour, treating '2 hours 30 minutes' as closer to 3 hours.",
        rootCause: "Duration Rounding Error — rounds the 30-minute component up to a full extra hour instead of adding it precisely.",
        remediation: "30 minutes is exactly HALF an hour, not a full hour — add 2 hours to reach noon, then add 30 minutes (not a full hour) to reach 12:30 PM."
      },
      {
        misconceptionId: "E-d10-c",
        description: "Student computes the correct time (12:30) but labels it AM instead of PM.",
        rootCause: "AM/PM Boundary Confusion — doesn't track that crossing 12:00 noon switches the time from AM to PM.",
        remediation: "Starting at 10:00 AM and adding over 2 hours crosses 12:00 NOON — after noon, all times are PM, not AM."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Add the hours first", hint: "10:00 AM + 2 hours = ?" },
      { level: 2, description: "Track AM/PM", hint: "Crossing 12:00 noon switches to PM." },
      { level: 3, description: "Add the remaining minutes", hint: "12:00 PM + 30 minutes = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d11",
    order: 11,
    cluster: "MONEY",
    clusterName: CLUSTER_NAMES.MONEY,
    skillId: "MEASMONEY-04",
    question: "Simple interest on ₹500 at 5% per year for 1 year.",
    options: [
        { text: "₹25", correct: true, feedback: "SI = 500 × 5 × 1 / 100 = ₹25." },
        { text: "₹250", correct: false, feedback: "You didn't divide by 100.", misconceptionId: "E-d11-a" },
        { text: "₹50", correct: false, feedback: "You used 10%.", misconceptionId: "E-d11-b" },
        { text: "₹500", correct: false, feedback: "That's the principal, not the interest.", misconceptionId: "E-d11-c" }
      ],
    backward: "Simple Interest = Principal × Rate × Time / 100.",
    forward: "Interest calculations are used in banking.",
    misconceptions: [
      {
        misconceptionId: "E-d11-a",
        description: "Student computes Principal × Rate × Time (500×5×1=2500) but forgets the final division by 100.",
        rootCause: "Formula Step Omission — drops the ÷100 step that converts a percentage rate into its decimal effect.",
        remediation: "The Simple Interest formula ends with ÷100 because the rate is a PERCENTAGE — always divide by 100 as the final step: 2500 ÷ 100 = 25."
      },
      {
        misconceptionId: "E-d11-b",
        description: "Student computes interest as if the rate were 10% instead of the stated 5%.",
        rootCause: "Rate Misread — uses a different percentage value than the one given in the question.",
        remediation: "Double-check the rate stated in the question — it says 5%, not 10% — use 500 × 5 × 1 / 100, not 500 × 10 × 1 / 100."
      },
      {
        misconceptionId: "E-d11-c",
        description: "Student reports the Principal (₹500) itself instead of computing the interest earned on it.",
        rootCause: "Wrong Value Reported — confuses the given principal amount with the requested interest result.",
        remediation: "The question asks for the INTEREST earned, which is calculated FROM the principal using the formula — it is not the principal itself."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the formula", hint: "Simple Interest = Principal × Rate × Time / 100." },
      { level: 2, description: "Substitute the values", hint: "500 × 5 × 1 / 100." },
      { level: 3, description: "Compute step by step", hint: "500 × 5 = 2500. Now divide by 100." }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d12",
    order: 12,
    cluster: "PAV",
    clusterName: CLUSTER_NAMES.PAV,
    skillId: "MEASPAV-03",
    question: "Find the perimeter of a square with side 9 cm.",
    options: [
        { text: "36 cm", correct: true, feedback: "Perimeter of square = 4 × side = 4 × 9 = 36 cm." },
        { text: "18 cm", correct: false, feedback: "You multiplied by 2.", misconceptionId: "E-d12-a" },
        { text: "81 cm", correct: false, feedback: "That's the area (9×9).", misconceptionId: "E-d12-b" },
        { text: "36 cm²", correct: false, feedback: "Perimeter uses cm, not cm².", misconceptionId: "E-d12-c" }
      ],
    backward: "Perimeter of square = 4 × side.",
    forward: "Perimeter is used in fencing and framing.",
    misconceptions: [
      {
        misconceptionId: "E-d12-a",
        description: "Student multiplies the side by 2 instead of 4, as if the square were a rectangle formula applied incorrectly.",
        rootCause: "Wrong Multiplier Applied — uses a factor of 2 instead of the correct factor of 4 for a square's four equal sides.",
        remediation: "A square has FOUR equal sides — perimeter = 4 × side, not 2 × side (2× would undercount by half)."
      },
      {
        misconceptionId: "E-d12-b",
        description: "Student computes the area (side × side) instead of the perimeter (4 × side).",
        rootCause: "Perimeter/Area Formula Confusion — applies the multiplication-based area formula when the perimeter formula was needed.",
        remediation: "Perimeter (distance around) uses 4 × side; area (space inside) uses side × side — these are different formulas for different measurements."
      },
      {
        misconceptionId: "E-d12-c",
        description: "Student computes the correct numeric value (36) but incorrectly appends square units (cm²) as if it were an area.",
        rootCause: "Wrong Unit Type Applied — mistakenly uses square units for a linear (perimeter) measurement.",
        remediation: "Perimeter is a LINEAR measurement (a length), so it uses plain units like cm — square units (cm²) are only for area."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the formula", hint: "Perimeter of square = 4 × side." },
      { level: 2, description: "Substitute", hint: "4 × 9 = ?" },
      { level: 3, description: "Check the units", hint: "Perimeter is a length, so use cm, not cm²." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "MEASPAV-02", probability: 0.3, condition: "Confusing perimeter and area formulas for a square recurs when comparing perimeter and area of the same shape in later problems." }
    ],
    learningObjectives: ["CCSS.MATH.CONTENT.5.MD.C.5"]
  },
  {
    itemId: "d13",
    order: 13,
    cluster: "LENGTH",
    clusterName: CLUSTER_NAMES.LENGTH,
    skillId: "MEASLEN-03",
    question: "Which is longer? 1500 m or 1.2 km",
    options: [
        { text: "1500 m", correct: true, feedback: "1500 m = 1.5 km. 1.5 km > 1.2 km." },
        { text: "1.2 km", correct: false, feedback: "1.2 km = 1200 m, which is less.", misconceptionId: "E-d13-a" },
        { text: "They are equal", correct: false, feedback: "1500 m = 1.5 km ≠ 1.2 km.", misconceptionId: "E-d13-b" },
        { text: "Cannot compare", correct: false, feedback: "Convert to the same unit to compare.", misconceptionId: "E-d13-c" }
      ],
    backward: "Convert both to the same unit before comparing.",
    forward: "Comparison of measurements is common in sports and construction.",
    misconceptions: [
      {
        misconceptionId: "E-d13-a",
        description: "Student assumes the value written as km (1.2) must be larger because km is a bigger unit than m, without converting to compare directly.",
        rootCause: "Unit-Size Bias — reasons about the size of the UNIT rather than converting both values to compare their actual magnitudes.",
        remediation: "Convert both to the same unit first: 1500 m = 1.5 km — now compare 1.5 km to 1.2 km directly, ignoring which unit each was originally written in."
      },
      {
        misconceptionId: "E-d13-b",
        description: "Student assumes the two values are equal because they 'look similar' (both around 1-1.5), without converting to check precisely.",
        rootCause: "Approximate Equality Assumption — treats visually similar quantities as equal without exact comparison.",
        remediation: "Convert 1500 m to km (=1.5 km) and compare precisely to 1.2 km — 1.5 is not equal to 1.2, so the two lengths differ."
      },
      {
        misconceptionId: "E-d13-c",
        description: "Student believes two quantities in different units cannot be compared at all.",
        rootCause: "Cross-Unit Comparison Avoidance — doesn't realise any two length units can be converted to a common unit for comparison.",
        remediation: "Any two lengths CAN be compared once converted to the same unit — convert 1500 m to km (1.5 km) or 1.2 km to m (1200 m), then compare."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Convert to the same unit", hint: "Convert 1500 m to km: 1500 ÷ 1000 = 1.5 km." },
      { level: 2, description: "Compare the values", hint: "Is 1.5 km greater than, less than, or equal to 1.2 km?" },
      { level: 3, description: "State the answer using the original units", hint: "Which original value (1500 m or 1.2 km) is the larger one?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.MD.A.1"]
  },
  {
    itemId: "d14",
    order: 14,
    cluster: "MASS",
    clusterName: CLUSTER_NAMES.MASS,
    skillId: "MEASMASS-02",
    question: "Subtract 1 kg 200 g from 3 kg.",
    options: [
        { text: "1 kg 800 g", correct: true, feedback: "3 kg = 3000 g; minus 1200 g = 1800 g = 1 kg 800 g." },
        { text: "2 kg 200 g", correct: false, feedback: "You subtracted incorrectly.", misconceptionId: "E-d14-a" },
        { text: "2 kg 800 g", correct: false, feedback: "You added instead.", misconceptionId: "E-d14-b" },
        { text: "1 kg 200 g", correct: false, feedback: "That's the amount you subtracted.", misconceptionId: "E-d14-c" }
      ],
    backward: "3 kg = 3000 g; subtract 1200 g = 1800 g = 1 kg 800 g.",
    forward: "Subtracting mixed units appears in recipes and parcels.",
    misconceptions: [
      {
        misconceptionId: "E-d14-a",
        description: "Student subtracts only the whole-kg parts (3-1=2) and mishandles the grams, landing on 2 kg 200 g instead of 1 kg 800 g.",
        rootCause: "Mixed-Unit Subtraction Borrowing Error — doesn't correctly borrow across the kg/g boundary when the grams being subtracted exceed what's available.",
        remediation: "Convert fully to grams first: 3 kg = 3000 g, then subtract 1200 g: 3000 - 1200 = 1800 g = 1 kg 800 g — avoid subtracting the kg and g parts separately without borrowing."
      },
      {
        misconceptionId: "E-d14-b",
        description: "Student adds the two amounts instead of subtracting, producing a result larger than the starting amount.",
        rootCause: "Operation Sign Misread — performs addition when subtraction was requested.",
        remediation: "The question says 'subtract... FROM 3 kg' — this means 3 kg minus the other amount, not plus it."
      },
      {
        misconceptionId: "E-d14-c",
        description: "Student reports the amount that was subtracted (1 kg 200 g) instead of the remaining amount.",
        rootCause: "Wrong Value Reported — confuses the subtrahend (amount taken away) with the actual result of the subtraction.",
        remediation: "The answer should be what's LEFT after subtracting, not the amount you subtracted — compute 3000 g - 1200 g to find what remains."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Convert to a single unit", hint: "3 kg = 3000 g. 1 kg 200 g = 1200 g." },
      { level: 2, description: "Subtract", hint: "3000 - 1200 = ?" },
      { level: 3, description: "Convert back to mixed units", hint: "1800 g = ? kg ? g." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.MD.A.1"]
  },
  {
    itemId: "d15",
    order: 15,
    cluster: "CAP",
    clusterName: CLUSTER_NAMES.CAP,
    skillId: "MEASCAP-03",
    question: "A tank holds 5000 ml. How many litres is that?",
    options: [
        { text: "5 l", correct: true, feedback: "5000 ÷ 1000 = 5 litres." },
        { text: "0.5 l", correct: false, feedback: "You divided by 10000.", misconceptionId: "E-d15-a" },
        { text: "50 l", correct: false, feedback: "You divided by 100.", misconceptionId: "E-d15-b" },
        { text: "500 l", correct: false, feedback: "You divided by 10.", misconceptionId: "E-d15-c" }
      ],
    backward: "Divide by 1000 to convert ml to l.",
    forward: "Large capacities are usually expressed in litres.",
    misconceptions: [
      {
        misconceptionId: "E-d15-a",
        description: "Student divides 5000 by 10000 instead of 1000, undershooting the result by a factor of 10.",
        rootCause: "Power-of-Ten Shift Miscount — applies a four-zero shift instead of the correct three-zero shift.",
        remediation: "Count the zeros in 1000 (three zeros) — 5000 ÷ 1000 = 5, shifting the decimal three places left."
      },
      {
        misconceptionId: "E-d15-b",
        description: "Student divides 5000 by 100 instead of 1000, overshooting the result by a factor of 10.",
        rootCause: "Power-of-Ten Shift Miscount — applies a two-zero shift instead of the correct three-zero shift.",
        remediation: "Recount the zeros in 1000 — there are exactly three, so 5000 ml ÷ 1000 = 5 l, not 50 l."
      },
      {
        misconceptionId: "E-d15-c",
        description: "Student divides 5000 by 10 instead of 1000, overshooting the result by a factor of 100.",
        rootCause: "Conversion Factor Confusion — mixes up the ml-to-litre factor (1000) with a much smaller conversion factor.",
        remediation: "Memorise the exact fact: 1 litre = 1000 ml — converting ml to litres always means dividing by 1000, not 10."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the conversion fact", hint: "1 l = 1000 ml, so ml to l means dividing by 1000." },
      { level: 2, description: "Set up the division", hint: "5000 ÷ 1000 = ?" },
      { level: 3, description: "Shift the decimal", hint: "Dividing by 1000 moves the decimal three places left." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.MD.A.1"]
  },
  {
    itemId: "d16",
    order: 16,
    cluster: "TIME",
    clusterName: CLUSTER_NAMES.TIME,
    skillId: "MEASTIME-04",
    question: "How many days are there in February 2024? (2024 is a leap year.)",
    options: [
        { text: "29", correct: true, feedback: "A leap year is divisible by 4; February has 29 days." },
        { text: "28", correct: false, feedback: "That's a non‑leap year.", misconceptionId: "E-d16-a" },
        { text: "30", correct: false, feedback: "February never has 30 days.", misconceptionId: "E-d16-b" },
        { text: "31", correct: false, feedback: "February never has 31 days.", misconceptionId: "E-d16-c" }
      ],
    backward: "A leap year is divisible by 4; February has 29 days.",
    forward: "Calendar knowledge is used in planning and scheduling.",
    misconceptions: [
      {
        misconceptionId: "E-d16-a",
        description: "Student answers with the standard (non-leap-year) February day count, ignoring that the question specifically states 2024 is a leap year.",
        rootCause: "Leap Year Fact Ignored — applies the default 28-day rule without accounting for the stated leap-year condition.",
        remediation: "The question explicitly says '2024 is a leap year' — in a leap year, February has ONE extra day: 29, not the usual 28."
      },
      {
        misconceptionId: "E-d16-b",
        description: "Student assumes February in a leap year gains 2 extra days instead of 1, landing on 30.",
        rootCause: "Leap Year Adjustment Overcount — adds too many extra days to February for a leap year.",
        remediation: "A leap year adds exactly ONE extra day to February: 28 + 1 = 29, not 30 — February never reaches 30 days."
      },
      {
        misconceptionId: "E-d16-c",
        description: "Student confuses February's leap-year length with the 31-day months (like January or March).",
        rootCause: "Month-Length Confusion — applies the 31-day pattern of other months to February.",
        remediation: "February is always the shortest month — even in a leap year, it only reaches 29 days, never 31 like January or March."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the base fact", hint: "February normally has 28 days." },
      { level: 2, description: "Apply the leap year rule", hint: "A leap year adds exactly 1 extra day to February." },
      { level: 3, description: "Compute", hint: "28 + 1 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d17",
    order: 17,
    cluster: "MONEY",
    clusterName: CLUSTER_NAMES.MONEY,
    skillId: "MEASMONEY-05",
    question: "What is the cost of 5 pens if each pen costs ₹12?",
    options: [
        { text: "₹60", correct: true, feedback: "5 × 12 = ₹60." },
        { text: "₹17", correct: false, feedback: "You added 5 + 12.", misconceptionId: "E-d17-a" },
        { text: "₹48", correct: false, feedback: "You calculated 4 × 12.", misconceptionId: "E-d17-b" },
        { text: "₹6", correct: false, feedback: "You divided 12 by 2.", misconceptionId: "E-d17-c" }
      ],
    backward: "Total cost = number × cost per item.",
    forward: "Multiplication of money is a daily life skill.",
    misconceptions: [
      {
        misconceptionId: "E-d17-a",
        description: "Student adds the number of pens and the cost per pen (5+12) instead of multiplying them.",
        rootCause: "Operation Selection Error — applies addition when the 'total cost of several identical items' calls for multiplication.",
        remediation: "5 pens at ₹12 EACH means 5 equal groups of ₹12 — repeated equal groups are combined by MULTIPLICATION (5×12), not addition (5+12)."
      },
      {
        misconceptionId: "E-d17-b",
        description: "Student multiplies using one fewer pen than stated (4×12 instead of 5×12).",
        rootCause: "Quantity Miscount — loses track of the exact number of items stated in the question.",
        remediation: "Re-read the question: it asks for 5 pens, not 4 — multiply 5 × 12, not 4 × 12."
      },
      {
        misconceptionId: "E-d17-c",
        description: "Student divides the price of one pen by 2 instead of multiplying by the number of pens.",
        rootCause: "Operation Selection Error — applies division when multiplication was needed for the total cost of multiple items.",
        remediation: "To find the TOTAL cost of several pens, multiply the price per pen by the NUMBER of pens — don't divide the single price."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the operation", hint: "5 equal-priced pens means multiply." },
      { level: 2, description: "Set up the multiplication", hint: "5 × 12 = ?" },
      { level: 3, description: "Compute", hint: "5×10=50, 5×2=10, add them." }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d18",
    order: 18,
    cluster: "PAV",
    clusterName: CLUSTER_NAMES.PAV,
    skillId: "MEASPAV-04",
    question: "Find the volume of a cube with side 3 cm.",
    options: [
        { text: "27 cm³", correct: true, feedback: "Volume of cube = side × side × side = 3 × 3 × 3 = 27 cm³." },
        { text: "9 cm³", correct: false, feedback: "That's the area of one face.", misconceptionId: "E-d18-a" },
        { text: "12 cm", correct: false, feedback: "That's the perimeter of one face.", misconceptionId: "E-d18-b" },
        { text: "27 cm", correct: false, feedback: "Missing the cube units (should be cm³).", misconceptionId: "E-d18-c" }
      ],
    backward: "Volume of cube = side × side × side.",
    forward: "Volume is used in packing and capacity.",
    misconceptions: [
      {
        misconceptionId: "E-d18-a",
        description: "Student multiplies only two sides together (3×3=9), computing the area of one face instead of the full three-dimensional volume.",
        rootCause: "Missing-Dimension Error — stops after multiplying two dimensions, forgetting a cube has THREE dimensions to multiply.",
        remediation: "Volume of a cube needs THREE factors of the side length: side × side × side = 3×3×3, not just 3×3."
      },
      {
        misconceptionId: "E-d18-b",
        description: "Student computes the perimeter of one face (4×3=12) instead of the volume.",
        rootCause: "Perimeter/Volume Formula Confusion — applies an addition-based 2D perimeter formula to a 3D volume question.",
        remediation: "Volume measures the SPACE INSIDE a 3D shape using multiplication (side×side×side); perimeter is a 2D, addition-based measurement — these are unrelated formulas."
      },
      {
        misconceptionId: "E-d18-c",
        description: "Student computes the correct numeric value (27) but omits the required cubic units (cm³).",
        rootCause: "Missing Cubic Units — forgets that volume is always measured in CUBIC units, not linear units.",
        remediation: "Volume is always expressed in cubic units (cm³, m³, etc.) because it measures three-dimensional space — always append the ³ to the unit."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the formula", hint: "Volume of cube = side × side × side." },
      { level: 2, description: "Multiply all three factors", hint: "3 × 3 × 3 = ?" },
      { level: 3, description: "Add the units", hint: "Volume is measured in cubic units: cm³." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.MD.C.5"]
  },
  {
    itemId: "d19",
    order: 19,
    cluster: "LENGTH",
    clusterName: CLUSTER_NAMES.LENGTH,
    skillId: "MEASLEN-04",
    question: "Convert 750 mm to cm.",
    options: [
        { text: "75 cm", correct: true, feedback: "10 mm = 1 cm, so 750 ÷ 10 = 75 cm." },
        { text: "7.5 cm", correct: false, feedback: "You divided by 100.", misconceptionId: "E-d19-a" },
        { text: "750 cm", correct: false, feedback: "You multiplied by 10.", misconceptionId: "E-d19-b" },
        { text: "0.75 cm", correct: false, feedback: "You divided by 1000.", misconceptionId: "E-d19-c" }
      ],
    backward: "10 mm = 1 cm, so divide by 10.",
    forward: "Small‑scale conversions are common in crafts.",
    misconceptions: [
      {
        misconceptionId: "E-d19-a",
        description: "Student divides 750 by 100 instead of 10, undershooting the result by a factor of 10.",
        rootCause: "Conversion Factor Confusion — mixes up the mm-to-cm factor (10) with a larger conversion factor (100).",
        remediation: "Memorise the exact fact: 10 mm = 1 cm — converting mm to cm means dividing by 10, not 100."
      },
      {
        misconceptionId: "E-d19-b",
        description: "Student multiplies instead of dividing, moving the decimal the wrong direction entirely.",
        rootCause: "Multiplication/Division Direction Confusion — applies the inverse operation to what converting mm (smaller unit) to cm (larger unit) requires.",
        remediation: "Converting a SMALLER unit (mm) to a LARGER unit (cm) always means DIVIDING — 750 ÷ 10 = 75."
      },
      {
        misconceptionId: "E-d19-c",
        description: "Student divides 750 by 1000 instead of 10, undershooting the result by a factor of 100.",
        rootCause: "Conversion Factor Confusion — mixes up the mm-to-cm factor (10) with the mm-to-m factor (1000).",
        remediation: "10 mm = 1 cm (a factor of 10), while 1000 mm = 1 m (a factor of 1000) — check which unit you're converting to before dividing."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the conversion fact", hint: "10 mm = 1 cm." },
      { level: 2, description: "Set up the division", hint: "750 ÷ 10 = ?" },
      { level: 3, description: "Shift the decimal", hint: "Dividing by 10 moves the decimal one place left." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.MD.A.1"]
  },
  {
    itemId: "d20",
    order: 20,
    cluster: "MASS",
    clusterName: CLUSTER_NAMES.MASS,
    skillId: "MEASMASS-03",
    question: "Which is heavier? 2 kg or 1500 g",
    options: [
        { text: "2 kg", correct: true, feedback: "2 kg = 2000 g > 1500 g." },
        { text: "1500 g", correct: false, feedback: "1500 g = 1.5 kg, which is lighter.", misconceptionId: "E-d20-a" },
        { text: "They are equal", correct: false, feedback: "2000 g ≠ 1500 g.", misconceptionId: "E-d20-b" },
        { text: "Cannot compare", correct: false, feedback: "Convert both to the same unit.", misconceptionId: "E-d20-c" }
      ],
    backward: "Convert both to the same unit to compare.",
    forward: "Weight comparison is used in shopping and postage.",
    misconceptions: [
      {
        misconceptionId: "E-d20-a",
        description: "Student assumes the value written in grams (1500) must be heavier because the number looks bigger than 2, without converting to compare.",
        rootCause: "Raw-Number Bias — compares the bare numbers (1500 vs 2) instead of converting to the same unit first.",
        remediation: "Convert both to the same unit first: 2 kg = 2000 g — now compare 2000 g to 1500 g directly, ignoring which unit each was originally written in."
      },
      {
        misconceptionId: "E-d20-b",
        description: "Student assumes the two values are equal because they 'seem close', without converting to check precisely.",
        rootCause: "Approximate Equality Assumption — treats visually similar quantities as equal without exact comparison.",
        remediation: "Convert 2 kg to grams (=2000 g) and compare precisely to 1500 g — 2000 is not equal to 1500, so the two masses differ."
      },
      {
        misconceptionId: "E-d20-c",
        description: "Student believes two quantities in different units cannot be compared at all.",
        rootCause: "Cross-Unit Comparison Avoidance — doesn't realise any two mass units can be converted to a common unit for comparison.",
        remediation: "Any two masses CAN be compared once converted to the same unit — convert 2 kg to grams (2000 g), then compare to 1500 g."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Convert to the same unit", hint: "Convert 2 kg to grams: 2 × 1000 = 2000 g." },
      { level: 2, description: "Compare the values", hint: "Is 2000 g greater than, less than, or equal to 1500 g?" },
      { level: 3, description: "State the answer using the original units", hint: "Which original value (2 kg or 1500 g) is the heavier one?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.MD.A.1"]
  },
  {
    itemId: "d21",
    order: 21,
    cluster: "CAP",
    clusterName: CLUSTER_NAMES.CAP,
    skillId: "MEASCAP-04",
    question: "Add 250 ml + 750 ml. Express the answer in litres.",
    options: [
        { text: "1 l", correct: true, feedback: "250 + 750 = 1000 ml = 1 l." },
        { text: "1000 l", correct: false, feedback: "You kept the unit as litres instead of converting ml to l.", misconceptionId: "E-d21-a" },
        { text: "10 l", correct: false, feedback: "Incorrect conversion factor.", misconceptionId: "E-d21-b" },
        { text: "0.1 l", correct: false, feedback: "Incorrect decimal placement.", misconceptionId: "E-d21-c" }
      ],
    backward: "1000 ml = 1 l.",
    forward: "Totalling small capacities to make a litre.",
    misconceptions: [
      {
        misconceptionId: "E-d21-a",
        description: "Student correctly adds to get 1000 but relabels it as litres directly without dividing by 1000, giving 1000 l.",
        rootCause: "Unit Label Swap Without Conversion — changes the unit name without performing the actual division needed to convert the value.",
        remediation: "The sum 1000 is in ML — to express it in LITRES, you must divide by 1000: 1000 ml ÷ 1000 = 1 l."
      },
      {
        misconceptionId: "E-d21-b",
        description: "Student divides the sum by 100 instead of 1000, overshooting the result by a factor of 10.",
        rootCause: "Power-of-Ten Shift Miscount — applies a two-zero shift instead of the correct three-zero shift.",
        remediation: "Count the zeros in 1000 (three zeros) — 1000 ml ÷ 1000 = 1 l, shifting the decimal three places left."
      },
      {
        misconceptionId: "E-d21-c",
        description: "Student divides the sum by 10000 instead of 1000, undershooting the result by a factor of 10.",
        rootCause: "Power-of-Ten Shift Miscount — applies a four-zero shift instead of the correct three-zero shift.",
        remediation: "Recount the zeros in 1000 — there are exactly three, so 1000 ml ÷ 1000 = 1 l, not 0.1 l."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Add the ml amounts", hint: "250 + 750 = ?" },
      { level: 2, description: "Convert to litres", hint: "Divide the ml total by 1000." },
      { level: 3, description: "Shift the decimal", hint: "1000 ÷ 1000 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.MD.A.1"]
  },
  {
    itemId: "d22",
    order: 22,
    cluster: "TIME",
    clusterName: CLUSTER_NAMES.TIME,
    skillId: "MEASTIME-05",
    question: "How much time passes from 5:45 PM to 6:15 PM?",
    options: [
        { text: "30 minutes", correct: true, feedback: "From 5:45 to 6:00 is 15 min; to 6:15 is another 15 min. Total 30 min." },
        { text: "45 minutes", correct: false, feedback: "You mis‑calculated.", misconceptionId: "E-d22-a" },
        { text: "1 hour", correct: false, feedback: "That's too long.", misconceptionId: "E-d22-b" },
        { text: "15 minutes", correct: false, feedback: "Only counted to 6:00.", misconceptionId: "E-d22-c" }
      ],
    backward: "From 5:45 to 6:00 is 15 min; plus another 15 min to 6:15 → 30 min.",
    forward: "Calculating short intervals is useful for scheduling.",
    misconceptions: [
      {
        misconceptionId: "E-d22-a",
        description: "Student subtracts the minute digits directly (45 and 15) without accounting for crossing the hour boundary, landing on 45 instead of 30.",
        rootCause: "Hour-Boundary Crossing Error — subtracts minute values directly without bridging through the whole hour (6:00).",
        remediation: "Break the interval into two parts: from 5:45 to 6:00 (15 minutes), then from 6:00 to 6:15 (15 minutes) — add these two parts together."
      },
      {
        misconceptionId: "E-d22-b",
        description: "Student overestimates the interval, rounding up to a full hour instead of the actual 30 minutes.",
        rootCause: "Duration Overestimation — doesn't compute the exact minutes and instead rounds to a familiar larger unit.",
        remediation: "Compute exactly: from 5:45 PM to 6:15 PM is only half an hour — bridge through 6:00 PM to count the minutes precisely."
      },
      {
        misconceptionId: "E-d22-c",
        description: "Student only counts the time from 5:45 to 6:00 (15 minutes) and stops, forgetting the remaining interval to 6:15.",
        rootCause: "Partial Interval Counted — stops at an intermediate landmark (6:00) instead of continuing to the actual end time.",
        remediation: "The end time is 6:15, not 6:00 — after reaching 6:00 (15 min), continue counting the remaining 15 minutes to 6:15."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Bridge to the next hour first", hint: "From 5:45 PM to 6:00 PM is how many minutes?" },
      { level: 2, description: "Continue to the end time", hint: "From 6:00 PM to 6:15 PM is how many minutes?" },
      { level: 3, description: "Add the two parts", hint: "15 min + 15 min = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d23",
    order: 23,
    cluster: "MONEY",
    clusterName: CLUSTER_NAMES.MONEY,
    skillId: "MEASMONEY-03",
    question: "Selling Price = ₹800, Loss = ₹50. Find the Cost Price.",
    options: [
        { text: "₹850", correct: true, feedback: "Cost Price = Selling Price + Loss = 800 + 50 = ₹850." },
        { text: "₹750", correct: false, feedback: "You subtracted Loss from SP (used profit formula).", misconceptionId: "E-d23-a" },
        { text: "₹800", correct: false, feedback: "That's just the Selling Price.", misconceptionId: "E-d23-b" },
        { text: "₹50", correct: false, feedback: "That's the Loss.", misconceptionId: "E-d23-c" }
      ],
    backward: "Cost Price = Selling Price + Loss.",
    forward: "Understanding loss helps in managing finances.",
    misconceptions: [
      {
        misconceptionId: "E-d23-a",
        description: "Student subtracts the Loss from the Selling Price, applying the profit formula (SP-CP) backwards instead of the loss formula (CP=SP+Loss).",
        rootCause: "Profit/Loss Formula Confusion — mixes up how Cost Price relates to Selling Price under a LOSS versus under a PROFIT.",
        remediation: "When there's a LOSS, the seller got LESS than what they paid — so Cost Price must be MORE than Selling Price: CP = SP + Loss, not SP - Loss."
      },
      {
        misconceptionId: "E-d23-b",
        description: "Student reports the Selling Price itself instead of computing the Cost Price using the loss relationship.",
        rootCause: "Wrong Value Reported — confuses a given quantity (SP) with the requested result (CP).",
        remediation: "The question asks for COST PRICE, which is different from Selling Price when there's a loss — compute CP = SP + Loss."
      },
      {
        misconceptionId: "E-d23-c",
        description: "Student reports the Loss amount itself instead of computing the Cost Price.",
        rootCause: "Wrong Value Reported — confuses the given Loss value with the requested Cost Price result.",
        remediation: "The Loss (₹50) is just one piece of information — combine it with the Selling Price using the formula CP = SP + Loss to find the actual Cost Price."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the formula", hint: "When there's a loss: Cost Price = Selling Price + Loss." },
      { level: 2, description: "Identify the values", hint: "SP = 800, Loss = 50." },
      { level: 3, description: "Add", hint: "800 + 50 = ?" }
    ],
    forwardRiskLinks: [
      { targetSkillId: "MEASMONEY-02", probability: 0.3, condition: "Confusing the profit formula (SP-CP) with the loss formula (SP+Loss=CP) recurs whenever profit and loss problems are mixed together." }
    ],
    learningObjectives: []
  },
  {
    itemId: "d24",
    order: 24,
    cluster: "PAV",
    clusterName: CLUSTER_NAMES.PAV,
    skillId: "MEASPAV-02",
    question: "Find the area of a square with side 10 m.",
    options: [
        { text: "100 m²", correct: true, feedback: "Area = side × side = 10 × 10 = 100 m²." },
        { text: "40 m", correct: false, feedback: "That's the perimeter.", misconceptionId: "E-d24-a" },
        { text: "20 m", correct: false, feedback: "That's 2 × side.", misconceptionId: "E-d24-b" },
        { text: "100 m", correct: false, feedback: "Missing square units (should be m²).", misconceptionId: "E-d24-c" }
      ],
    backward: "Area of square = side × side.",
    forward: "Large area units are used in land and floor plans.",
    misconceptions: [
      {
        misconceptionId: "E-d24-a",
        description: "Student computes the perimeter (4×side) instead of the area (side×side).",
        rootCause: "Perimeter/Area Formula Confusion — applies the addition-based perimeter formula when the multiplication-based area formula was needed.",
        remediation: "Area measures the space INSIDE a shape using multiplication (side×side); perimeter measures the distance AROUND using addition (4×side) — check which the question asks for."
      },
      {
        misconceptionId: "E-d24-b",
        description: "Student computes 2 × side instead of side × side, applying an incomplete or wrong multiplier.",
        rootCause: "Wrong Multiplier Applied — uses a factor of 2 instead of multiplying the side by ITSELF for area.",
        remediation: "Area of a square is side MULTIPLIED BY ITSELF (side × side = side²), not side multiplied by 2."
      },
      {
        misconceptionId: "E-d24-c",
        description: "Student computes the correct numeric value (100) but omits the required square units (m²).",
        rootCause: "Missing Square Units — forgets that area is always measured in SQUARE units, not linear units.",
        remediation: "Area is always expressed in square units (m², cm², etc.) because it measures a two-dimensional space — always append the ² to the unit."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the formula", hint: "Area of square = side × side." },
      { level: 2, description: "Multiply", hint: "10 × 10 = ?" },
      { level: 3, description: "Add the units", hint: "Area is measured in square units: m²." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.MD.C.5"]
  }
];

const recheckItems = [
  {
    itemId: "r1",
    order: 1,
    cluster: "LENGTH",
    clusterName: CLUSTER_NAMES.LENGTH,
    skillId: "MEASLEN-02",
    question: "6 km 300 m = ? m",
    options: [
        { text: "6300 m", correct: true, feedback: "6 km = 6000 m; + 300 m = 6300 m." },
        { text: "630 m", correct: false, feedback: "You divided by 10.", misconceptionId: "E-r1-a" },
        { text: "63000 m", correct: false, feedback: "You multiplied by 10.", misconceptionId: "E-r1-b" },
        { text: "6003 m", correct: false, feedback: "You placed 3 incorrectly.", misconceptionId: "E-r1-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r1-a",
        description: "Student divides the correct total by 10, undershooting by a factor of 10.",
        rootCause: "Extraneous Division Step — applies an unnecessary division after correctly combining km and m.",
        remediation: "Once 6 km is converted to 6000 m and added to 300 m, no further division is needed — 6000 + 300 = 6300 directly."
      },
      {
        misconceptionId: "E-r1-b",
        description: "Student multiplies the correct total by 10, overshooting by a factor of 10.",
        rootCause: "Extraneous Multiplication Step — applies an unnecessary multiplication after correctly combining km and m.",
        remediation: "Once 6 km is converted to 6000 m and added to 300 m, no further multiplication is needed — 6000 + 300 = 6300 directly."
      },
      {
        misconceptionId: "E-r1-c",
        description: "Student places the 300 m in the wrong position when combining with 6000 m, e.g. writing 6003 instead of 6300.",
        rootCause: "Place Value Misalignment — doesn't align the 300 with the hundreds column when adding to 6000.",
        remediation: "6000 + 300 means adding to the HUNDREDS column: 6000 has hundreds digit 0, and 300 fills it in as 6300, not the ones column (6003)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Convert km to m", hint: "6 km = 6000 m." },
      { level: 2, description: "Add the metres", hint: "6000 + 300 = ?" },
      { level: 3, description: "Check place value", hint: "300 fills the hundreds column, not the ones column." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.MD.A.1"]
  },
  {
    itemId: "r2",
    order: 2,
    cluster: "MASS",
    clusterName: CLUSTER_NAMES.MASS,
    skillId: "MEASMASS-01",
    question: "2 kg = ? g",
    options: [
        { text: "2000 g", correct: true, feedback: "2 × 1000 = 2000 g." },
        { text: "200 g", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r2-a" },
        { text: "20000 g", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r2-b" },
        { text: "20 g", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r2-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r2-a",
        description: "Student multiplies 2 by 100 instead of 1000, undershooting by a factor of 10.",
        rootCause: "Power-of-Ten Shift Miscount — applies a two-zero shift instead of the correct three-zero shift.",
        remediation: "Count the zeros in 1000 (three zeros) — 2 × 1000 = 2000, not 200."
      },
      {
        misconceptionId: "E-r2-b",
        description: "Student multiplies 2 by 10000 instead of 1000, overshooting by a factor of 10.",
        rootCause: "Power-of-Ten Shift Miscount — adds an extra zero beyond the correct three-zero shift.",
        remediation: "Recount the zeros in 1000 — there are exactly three, so 2 kg becomes 2000 g, not 20000 g."
      },
      {
        misconceptionId: "E-r2-c",
        description: "Student multiplies 2 by 10 instead of 1000, undershooting drastically.",
        rootCause: "Conversion Factor Confusion — mixes up the kg-to-g factor with a much smaller conversion factor.",
        remediation: "Memorise the exact fact: 1 kg = 1000 g — 2 kg × 1000 = 2000 g."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the conversion fact", hint: "1 kg = 1000 g." },
      { level: 2, description: "Set up the multiplication", hint: "2 × 1000 = ?" },
      { level: 3, description: "Shift the decimal", hint: "Multiplying by 1000 moves the decimal three places right." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.MD.A.1"]
  },
  {
    itemId: "r3",
    order: 3,
    cluster: "CAP",
    clusterName: CLUSTER_NAMES.CAP,
    skillId: "MEASCAP-04",
    question: "3 l 500 ml = ? ml",
    options: [
        { text: "3500 ml", correct: true, feedback: "3 l = 3000 ml; + 500 ml = 3500 ml." },
        { text: "35 ml", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r3-a" },
        { text: "350 ml", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r3-b" },
        { text: "35000 ml", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r3-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r3-a",
        description: "Student divides 3 l by 100 instead of multiplying by 1000, then adds 500 incorrectly, landing on 35.",
        rootCause: "Conversion Direction Confusion — divides instead of multiplying when converting litres (larger unit) to ml (smaller unit).",
        remediation: "Converting litres to ml means MULTIPLYING by 1000: 3 l = 3000 ml, then add 500 ml = 3500 ml."
      },
      {
        misconceptionId: "E-r3-b",
        description: "Student converts 3 l using a factor of 100 instead of 1000, landing on 350 instead of 3500.",
        rootCause: "Power-of-Ten Shift Miscount — applies a two-zero shift instead of the correct three-zero shift.",
        remediation: "Count the zeros in 1000 (three zeros) — 3 l = 3000 ml, then add 500 ml to get 3500 ml."
      },
      {
        misconceptionId: "E-r3-c",
        description: "Student converts 3 l using a factor of 10000 instead of 1000, overshooting by a factor of 10.",
        rootCause: "Power-of-Ten Shift Miscount — adds an extra zero beyond the correct three-zero shift.",
        remediation: "Recount the zeros in 1000 — there are exactly three, so 3 l = 3000 ml, then add 500 ml to get 3500 ml, not 35000 ml."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Convert litres to ml", hint: "3 l = 3000 ml." },
      { level: 2, description: "Add the ml", hint: "3000 + 500 = ?" },
      { level: 3, description: "Check place value", hint: "500 fills the hundreds column of 3000." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.MD.A.1"]
  },
  {
    itemId: "r4",
    order: 4,
    cluster: "TIME",
    clusterName: CLUSTER_NAMES.TIME,
    skillId: "MEASTIME-02",
    question: "Convert 14:30 to the 12‑hour clock.",
    options: [
        { text: "2:30 PM", correct: true, feedback: "14 − 12 = 2, so 2:30 PM." },
        { text: "4:30 PM", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r4-a" },
        { text: "2:30 AM", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r4-b" },
        { text: "14:30 PM", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r4-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r4-a",
        description: "Student subtracts 10 instead of 12 from the 24-hour hour value, landing on 4:30 PM instead of 2:30 PM.",
        rootCause: "Subtraction Constant Error — uses the wrong number to subtract when converting from 24-hour to 12-hour format.",
        remediation: "The conversion rule is always -12 for 24-hour times after 12:00 — 14 - 12 = 2, not 14 - 10 = 4."
      },
      {
        misconceptionId: "E-r4-b",
        description: "Student computes the correct hour (2:30) but labels it AM instead of PM.",
        rootCause: "AM/PM Assignment Error — doesn't recognise that any 24-hour time of 13:00 or later is always PM.",
        remediation: "Any 24-hour time from 13:00 to 23:59 is always in the PM half of the day — 14:30 converts to 2:30 PM, not AM."
      },
      {
        misconceptionId: "E-r4-c",
        description: "Student keeps the 24-hour format hour (14) and simply appends 'PM' without actually converting.",
        rootCause: "Conversion Step Omitted — doesn't perform the required -12 subtraction to reach 12-hour format.",
        remediation: "12-hour format never uses hours above 12 — you must subtract 12 from any 24-hour time after 12:00: 14 - 12 = 2."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the rule", hint: "For 24-hour times after 12:00, subtract 12 to get 12-hour format." },
      { level: 2, description: "Apply it", hint: "14 - 12 = ?" },
      { level: 3, description: "Assign AM/PM", hint: "Times from 13:00-23:59 are always PM." }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "r5",
    order: 5,
    cluster: "MONEY",
    clusterName: CLUSTER_NAMES.MONEY,
    skillId: "MEASMONEY-02",
    question: "Cost Price = ₹150, Selling Price = ₹180. Find the profit.",
    options: [
        { text: "₹30", correct: true, feedback: "180 − 150 = ₹30." },
        { text: "₹330", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r5-a" },
        { text: "₹130", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r5-b" },
        { text: "₹180", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r5-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r5-a",
        description: "Student adds Cost Price and Selling Price instead of subtracting, producing a value far too large.",
        rootCause: "Formula Operation Confusion — applies addition instead of the subtraction the profit formula requires.",
        remediation: "Profit = Selling Price MINUS Cost Price — always subtract, never add, the two prices."
      },
      {
        misconceptionId: "E-r5-b",
        description: "Student subtracts but makes a computational error, landing 100 more than the correct profit.",
        rootCause: "Subtraction Computation Error — miscalculates 180 - 150.",
        remediation: "Recompute carefully: 180 - 150 = 30 — verify by adding 30 back to 150 to see if it returns 180."
      },
      {
        misconceptionId: "E-r5-c",
        description: "Student reports the Selling Price itself instead of computing the difference between SP and CP.",
        rootCause: "Wrong Value Reported — confuses one of the given quantities with the requested result.",
        remediation: "The question asks for PROFIT, which is the DIFFERENCE between Selling Price and Cost Price — not either price alone."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the formula", hint: "Profit = Selling Price − Cost Price." },
      { level: 2, description: "Identify the values", hint: "SP = 180, CP = 150." },
      { level: 3, description: "Subtract", hint: "180 − 150 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "r6",
    order: 6,
    cluster: "PAV",
    clusterName: CLUSTER_NAMES.PAV,
    skillId: "MEASPAV-01",
    question: "Perimeter of a rectangle with length 15 cm and breadth 6 cm.",
    options: [
        { text: "42 cm", correct: true, feedback: "2 × (15+6) = 2 × 21 = 42 cm." },
        { text: "21 cm", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r6-a" },
        { text: "90 cm", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r6-b" },
        { text: "42 cm²", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r6-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r6-a",
        description: "Student adds length and breadth (15+6=21) but forgets to double the sum, since a rectangle has two of each side.",
        rootCause: "Missing-Doubling Step — stops after adding the two different side lengths once, forgetting the rectangle has TWO of each.",
        remediation: "A rectangle has two lengths and two breadths — after adding length + breadth once, multiply that sum by 2: 2 × (15+6) = 42."
      },
      {
        misconceptionId: "E-r6-b",
        description: "Student computes the area (length × breadth) instead of the perimeter.",
        rootCause: "Perimeter/Area Formula Confusion — applies the multiplication formula (area) when the addition-based formula (perimeter) was needed.",
        remediation: "Perimeter measures the distance AROUND a shape (add the sides then double); area measures the space INSIDE (multiply length × breadth) — check which the question asks for."
      },
      {
        misconceptionId: "E-r6-c",
        description: "Student computes the correct numeric value (42) but incorrectly appends square units (cm²) as if it were an area.",
        rootCause: "Wrong Unit Type Applied — mistakenly uses square units for a linear (perimeter) measurement.",
        remediation: "Perimeter is a LINEAR measurement (a length), so it uses plain units like cm — square units (cm²) are only for area."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the formula", hint: "Perimeter of rectangle = 2 × (length + breadth)." },
      { level: 2, description: "Add length and breadth", hint: "15 + 6 = 21." },
      { level: 3, description: "Double the sum", hint: "2 × 21 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.MD.C.5"]
  },
  {
    itemId: "r7",
    order: 7,
    cluster: "LENGTH",
    clusterName: CLUSTER_NAMES.LENGTH,
    skillId: "MEASLEN-02",
    question: "Subtract 2 m 20 cm from 5 m.",
    options: [
        { text: "2 m 80 cm", correct: true, feedback: "5 m = 500 cm; − 220 cm = 280 cm = 2 m 80 cm." },
        { text: "3 m 20 cm", correct: false, feedback: "Incorrect subtraction.", misconceptionId: "E-r7-a" },
        { text: "2 m 20 cm", correct: false, feedback: "That's the amount subtracted.", misconceptionId: "E-r7-b" },
        { text: "2 m 90 cm", correct: false, feedback: "Off by 10 cm.", misconceptionId: "E-r7-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r7-a",
        description: "Student subtracts only the whole-metre parts (5-2=3) and drops the cm entirely, keeping the original 20 cm unchanged.",
        rootCause: "Mixed-Unit Component Dropped — ignores the cm component when working with combined m+cm quantities.",
        remediation: "Convert both amounts fully to cm first (5m=500cm, 2m20cm=220cm), subtract, then convert back — this keeps both components tracked."
      },
      {
        misconceptionId: "E-r7-b",
        description: "Student reports the amount that was subtracted (2 m 20 cm) instead of the remaining amount.",
        rootCause: "Wrong Value Reported — confuses the subtrahend (amount taken away) with the actual result of the subtraction.",
        remediation: "The answer should be what's LEFT after subtracting, not the amount you subtracted — compute 500 cm - 220 cm to find what remains."
      },
      {
        misconceptionId: "E-r7-c",
        description: "Student makes a small computational error in the subtraction, landing 10 cm above the correct answer.",
        rootCause: "Mixed-Unit Subtraction Error — a computational slip when subtracting combined m+cm quantities.",
        remediation: "Convert everything to cm: 5 m = 500 cm, 2 m 20 cm = 220 cm. Subtract: 500 - 220 = 280 cm, then convert back to m+cm."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Convert to a single unit", hint: "5 m = 500 cm. 2 m 20 cm = 220 cm." },
      { level: 2, description: "Subtract", hint: "500 - 220 = ?" },
      { level: 3, description: "Convert back to mixed units", hint: "280 cm = ? m ? cm." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.MD.A.1"]
  },
  {
    itemId: "r8",
    order: 8,
    cluster: "MASS",
    clusterName: CLUSTER_NAMES.MASS,
    skillId: "MEASMASS-04",
    question: "500 g × 6 = ? kg",
    options: [
        { text: "3 kg", correct: true, feedback: "500 × 6 = 3000 g = 3 kg." },
        { text: "30 kg", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r8-a" },
        { text: "0.3 kg", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r8-b" },
        { text: "300 kg", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r8-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r8-a",
        description: "Student correctly finds 3000 g but converts to kg using a factor of 100 instead of 1000, overshooting by a factor of 10.",
        rootCause: "Power-of-Ten Shift Miscount — applies a two-zero shift instead of the correct three-zero shift.",
        remediation: "Count the zeros in 1000 (three zeros) — 3000 g ÷ 1000 = 3 kg, not 30 kg."
      },
      {
        misconceptionId: "E-r8-b",
        description: "Student converts 3000 g to kg using a factor of 10000 instead of 1000, undershooting by a factor of 10.",
        rootCause: "Power-of-Ten Shift Miscount — applies a four-zero shift instead of the correct three-zero shift.",
        remediation: "Recount the zeros in 1000 — there are exactly three, so 3000 g ÷ 1000 = 3 kg, not 0.3 kg."
      },
      {
        misconceptionId: "E-r8-c",
        description: "Student multiplies instead of dividing when converting grams to kg, moving in the wrong direction entirely.",
        rootCause: "Multiplication/Division Direction Confusion — applies the inverse operation to what converting grams (smaller unit) to kg (larger unit) requires.",
        remediation: "Converting a SMALLER unit (g) to a LARGER unit (kg) always means DIVIDING — 3000 g ÷ 1000 = 3 kg."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the total in grams first", hint: "500 × 6 = ?" },
      { level: 2, description: "Convert to kg", hint: "Divide the grams total by 1000." },
      { level: 3, description: "Shift the decimal", hint: "3000 ÷ 1000 moves the decimal three places left." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.MD.A.1"]
  },
  {
    itemId: "r9",
    order: 9,
    cluster: "CAP",
    clusterName: CLUSTER_NAMES.CAP,
    skillId: "MEASCAP-03",
    question: "2 l − 750 ml = ? ml",
    options: [
        { text: "1250 ml", correct: true, feedback: "2000 − 750 = 1250 ml." },
        { text: "1750 ml", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r9-a" },
        { text: "750 ml", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r9-b" },
        { text: "125 ml", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r9-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r9-a",
        description: "Student subtracts using an incorrect conversion of 2 l (e.g. treating it as 2000-250 or otherwise misaligning digits), landing on 1750 instead of 1250.",
        rootCause: "Mixed-Unit Subtraction Borrowing Error — mishandles the borrowing when subtracting 750 from 2000.",
        remediation: "Convert 2 l to 2000 ml first, then subtract carefully: 2000 - 750 = 1250, borrowing across the columns as needed."
      },
      {
        misconceptionId: "E-r9-b",
        description: "Student reports the amount that was subtracted (750) instead of the remaining amount.",
        rootCause: "Wrong Value Reported — confuses the subtrahend (amount taken away) with the actual result of the subtraction.",
        remediation: "The answer should be what's LEFT after subtracting, not the amount you subtracted — compute 2000 ml - 750 ml to find what remains."
      },
      {
        misconceptionId: "E-r9-c",
        description: "Student divides the correct result by 10, landing on 125 instead of 1250.",
        rootCause: "Extraneous Division Step — applies an unnecessary division after correctly subtracting.",
        remediation: "Once 2000 - 750 = 1250 is computed, no further division is needed — 1250 ml is the final answer."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Convert to a single unit", hint: "2 l = 2000 ml." },
      { level: 2, description: "Subtract", hint: "2000 - 750 = ?" },
      { level: 3, description: "Check by borrowing", hint: "0 - 750 needs a borrow — work through it column by column." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.MD.A.1"]
  },
  {
    itemId: "r10",
    order: 10,
    cluster: "TIME",
    clusterName: CLUSTER_NAMES.TIME,
    skillId: "MEASTIME-03",
    question: "Start 9:15 AM, end 11:45 AM. Find the duration.",
    options: [
        { text: "2 h 30 min", correct: true, feedback: "9:15 to 10:00 = 45 min; to 11:00 = 1 h 45 min; to 11:45 = 2 h 30 min." },
        { text: "2 h", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r10-a" },
        { text: "3 h", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r10-b" },
        { text: "2 h 15 min", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r10-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r10-a",
        description: "Student subtracts only the whole hours (11-9=2) and drops the minutes difference entirely.",
        rootCause: "Minutes Component Dropped — ignores the minutes when both start and end times have non-zero minute values.",
        remediation: "Since both times have minutes (9:15 and 11:45), you must account for both hours AND minutes — bridge through whole hours to track the total duration precisely."
      },
      {
        misconceptionId: "E-r10-b",
        description: "Student overestimates the duration, rounding up to a full extra hour instead of the actual 2 h 30 min.",
        rootCause: "Duration Rounding Error — rounds the minutes component up to a full extra hour instead of computing precisely.",
        remediation: "Break the interval into steps: 9:15 to 10:00 (45 min), 10:00 to 11:00 (1 hour), 11:00 to 11:45 (45 min) — add these parts, don't round."
      },
      {
        misconceptionId: "E-r10-c",
        description: "Student subtracts the minute digits directly (45-15=30... but miscombines with hours), landing on 2 h 15 min instead of 2 h 30 min.",
        rootCause: "Minutes Subtraction Error — miscalculates the minutes portion of the elapsed time.",
        remediation: "Break the interval into landmark steps and add them: 9:15→10:00 is 45 min, 10:00→11:00 is 60 min, 11:00→11:45 is 45 min — total these three parts."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Bridge to the next whole hour", hint: "From 9:15 AM to 10:00 AM is how many minutes?" },
      { level: 2, description: "Count the whole hours", hint: "From 10:00 AM to 11:00 AM is 1 hour." },
      { level: 3, description: "Bridge to the end time and add all parts", hint: "From 11:00 AM to 11:45 AM is 45 min. Add all three parts." }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "r11",
    order: 11,
    cluster: "MONEY",
    clusterName: CLUSTER_NAMES.MONEY,
    skillId: "MEASMONEY-05",
    question: "8 chocolates at ₹25 each. Total cost?",
    options: [
        { text: "₹200", correct: true, feedback: "8 × 25 = 200." },
        { text: "₹33", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r11-a" },
        { text: "₹160", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r11-b" },
        { text: "₹250", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r11-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r11-a",
        description: "Student adds the number of chocolates and the cost per chocolate (8+25) instead of multiplying them.",
        rootCause: "Operation Selection Error — applies addition when the 'total cost of several identical items' calls for multiplication.",
        remediation: "8 chocolates at ₹25 EACH means 8 equal groups of ₹25 — repeated equal groups are combined by MULTIPLICATION (8×25), not addition (8+25)."
      },
      {
        misconceptionId: "E-r11-b",
        description: "Student computes 8 × 20 instead of 8 × 25, using a rounded-down price per chocolate.",
        rootCause: "Value Rounding Before Multiplying — mistakenly rounds the given price down before multiplying, instead of using the exact value.",
        remediation: "Use the EXACT price given (₹25), not a rounded value — 8 × 25 = 200, not 8 × 20 = 160."
      },
      {
        misconceptionId: "E-r11-c",
        description: "Student multiplies using one fewer chocolate than stated (7×25+25 miscombined, or similar), or confuses it with a single unit price, landing on 250.",
        rootCause: "Quantity Miscount — miscounts the number of items or misapplies the per-item price.",
        remediation: "Re-read the question: it asks for the total cost of 8 chocolates at ₹25 each — multiply 8 × 25 exactly, checking your multiplication table."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the operation", hint: "8 equal-priced chocolates means multiply." },
      { level: 2, description: "Set up the multiplication", hint: "8 × 25 = ?" },
      { level: 3, description: "Compute", hint: "8×20=160, 8×5=40, add them." }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "r12",
    order: 12,
    cluster: "PAV",
    clusterName: CLUSTER_NAMES.PAV,
    skillId: "MEASPAV-04",
    question: "Volume of a cuboid 4 cm × 3 cm × 2 cm.",
    options: [
        { text: "24 cm³", correct: true, feedback: "4 × 3 × 2 = 24 cm³." },
        { text: "9 cm³", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r12-a" },
        { text: "12 cm³", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r12-b" },
        { text: "24 cm", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r12-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r12-a",
        description: "Student adds the three dimensions (4+3+2=9) instead of multiplying them.",
        rootCause: "Operation Selection Error — applies addition instead of the multiplication that volume requires.",
        remediation: "Volume of a cuboid is length × breadth × height (multiplication), not length + breadth + height (addition)."
      },
      {
        misconceptionId: "E-r12-b",
        description: "Student multiplies only two of the three dimensions (4×3=12), forgetting the third dimension.",
        rootCause: "Missing-Dimension Error — stops after multiplying two dimensions, forgetting a cuboid has THREE dimensions to multiply.",
        remediation: "Volume of a cuboid needs ALL THREE dimensions multiplied together: length × breadth × height = 4×3×2, not just 4×3."
      },
      {
        misconceptionId: "E-r12-c",
        description: "Student computes the correct numeric value (24) but omits the required cubic units (cm³).",
        rootCause: "Missing Cubic Units — forgets that volume is always measured in CUBIC units, not linear units.",
        remediation: "Volume is always expressed in cubic units (cm³, m³, etc.) because it measures three-dimensional space — always append the ³ to the unit."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the formula", hint: "Volume of cuboid = length × breadth × height." },
      { level: 2, description: "Multiply all three dimensions", hint: "4 × 3 × 2 = ?" },
      { level: 3, description: "Add the units", hint: "Volume is measured in cubic units: cm³." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.MD.C.5"]
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
    title: "Measurement — Core Fluency",
    subtitle: "Telangana & Cambridge · Level 1 · Core Fluency",
    description: "Single-step unit conversions and facts across length, mass, capacity, time, money, and perimeter/area/volume.",
    clusterNames: CLUSTER_NAMES,
    gateReviewHTML: "<strong>Quick Review</strong><br>\n        • Length: 1 km = 1000 m, 1 m = 100 cm, 1 cm = 10 mm.<br>\n        • Mass: 1 kg = 1000 g.<br>\n        • Capacity: 1 l = 1000 ml.<br>\n        • Time: 24‑hour clock (add 12 to PM hours). Leap year: February has 29 days if year is divisible by 4.<br>\n        • Money: Profit = Selling Price − Cost Price. Loss = Cost Price − Selling Price.<br>\n        • Simple Interest = Principal × Rate × Time / 100.<br>\n        • Perimeter of rectangle = 2 × (length + breadth). Perimeter of square = 4 × side.<br>\n        • Area of rectangle = length × breadth. Area of square = side × side.<br>\n        • Volume of cube = side³. Volume of cuboid = length × breadth × height.",
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

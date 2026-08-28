// seed/mathSeedCh6MeasurementL4.js
//
// Populates math_chapters and math_questions with Grade 5, Chapter 6
// (Measurement), Level 4 — converted from the standalone HTML file
// ch-6-measurement-level-4.html.
//
// This is the 25-minute timed diagnostic level; diagnostic items carry a
// difficulty tier (S = Speed, C = Core, H = Hard, T = Trap).
//
// Run with: node seed/mathSeedCh6MeasurementL4.js

const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-5";
const GRADE_LABEL = "Grade 5";
const CHAPTER_SLUG = "ch-6-measurement";
const CHAPTER_NAME = "Measurement";
const LEVEL = 4;

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
    question: "3.5 km = ? m",
    options: [
        { text: "3500 m", correct: true, feedback: "1 km = 1000 m, so 3.5 × 1000 = 3500 m." },
        { text: "350 m", correct: false, feedback: "You multiplied by 100 instead of 1000.", misconceptionId: "E-w1-a" },
        { text: "35000 m", correct: false, feedback: "You multiplied by 10000.", misconceptionId: "E-w1-b" },
        { text: "35 m", correct: false, feedback: "You multiplied by 10.", misconceptionId: "E-w1-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-w1-a",
        description: "Student multiplies 3.5 by 100 instead of 1000, undershooting by a factor of 10.",
        rootCause: "Power-of-Ten Shift Miscount — applies a two-zero shift instead of the correct three-zero shift.",
        remediation: "Count the zeros in 1000 (three zeros) — multiplying by 1000 shifts the decimal point three places right: 3.5 → 3500."
      },
      {
        misconceptionId: "E-w1-b",
        description: "Student multiplies 3.5 by 10000, overshooting by a factor of 10.",
        rootCause: "Power-of-Ten Shift Miscount — adds an extra zero beyond the correct three-zero shift.",
        remediation: "Recount the zeros in 1000 — there are exactly three, so 3.5 km becomes 3500 m, not 35000 m."
      },
      {
        misconceptionId: "E-w1-c",
        description: "Student multiplies 3.5 by 10 instead of 1000, undershooting drastically.",
        rootCause: "Conversion Factor Confusion — applies a ×10 shift instead of the correct ×1000 for km-to-m.",
        remediation: "Memorise the exact conversion fact: 1 km = 1000 m, not 10 m — always check the conversion factor before multiplying."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the conversion fact", hint: "1 km = 1000 m." },
      { level: 2, description: "Set up the multiplication", hint: "3.5 × 1000 = ?" },
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
    skillId: "MEASMASS-02",
    question: "4 kg 200 g = ? g",
    options: [
        { text: "4200 g", correct: true, feedback: "4 kg = 4000 g, plus 200 g = 4200 g." },
        { text: "420 g", correct: false, feedback: "You only used 4.2 kg incorrectly.", misconceptionId: "E-w2-a" },
        { text: "40200 g", correct: false, feedback: "You misplaced the digits.", misconceptionId: "E-w2-b" },
        { text: "4002 g", correct: false, feedback: "You misaligned the grams.", misconceptionId: "E-w2-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-w2-a",
        description: "Student treats '4 kg 200 g' as if it were 0.42 kg or otherwise drops a factor of 10 in the conversion, landing on 420.",
        rootCause: "Power-of-Ten Shift Miscount — undershoots the correct value by a factor of 10.",
        remediation: "Build the number column by column: 4 kg = 4000 g, then add 200 g = 4200 g — don't shortcut the conversion."
      },
      {
        misconceptionId: "E-w2-b",
        description: "Student overshoots by a factor of 10, landing on 40200 instead of 4200.",
        rootCause: "Power-of-Ten Shift Miscount — adds an extra zero when converting kg to g.",
        remediation: "Recount the zeros: 4 kg = 4000 g (three zeros) — then add 200 g = 4200 g, not 40200 g."
      },
      {
        misconceptionId: "E-w2-c",
        description: "Student places the 200 g in the wrong column, e.g. treating it as 2 g and writing 4002 instead of 4200.",
        rootCause: "Column Shift Error — misaligns the grams component when combining with the kg-derived value.",
        remediation: "4000 + 200 means adding to the HUNDREDS column: 4000 has hundreds digit 0, and 200 fills it in as 4200, not the ones/tens column (4002)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Convert the kg part", hint: "4 kg = 4000 g." },
      { level: 2, description: "Add the g part", hint: "4000 + 200 = ?" },
      { level: 3, description: "Check place value", hint: "200 fills the hundreds column, not the ones or tens column." }
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
    question: "2.5 l = ? ml",
    options: [
        { text: "2500 ml", correct: true, feedback: "1 l = 1000 ml, so 2.5 × 1000 = 2500 ml." },
        { text: "250 ml", correct: false, feedback: "You multiplied by 100.", misconceptionId: "E-w3-a" },
        { text: "25000 ml", correct: false, feedback: "You multiplied by 10000.", misconceptionId: "E-w3-b" },
        { text: "25 ml", correct: false, feedback: "You multiplied by 10.", misconceptionId: "E-w3-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-w3-a",
        description: "Student multiplies 2.5 by 100 instead of 1000, undershooting by a factor of 10.",
        rootCause: "Power-of-Ten Shift Miscount — applies a two-zero shift instead of the correct three-zero shift.",
        remediation: "Count the zeros in 1000 (three zeros) — 2.5 × 1000 = 2500, shifting the decimal three places right."
      },
      {
        misconceptionId: "E-w3-b",
        description: "Student multiplies 2.5 by 10000, overshooting by a factor of 10.",
        rootCause: "Power-of-Ten Shift Miscount — adds an extra zero beyond the correct three-zero shift.",
        remediation: "Recount the zeros in 1000 — there are exactly three, so 2.5 l becomes 2500 ml, not 25000 ml."
      },
      {
        misconceptionId: "E-w3-c",
        description: "Student multiplies 2.5 by 10 instead of 1000, undershooting drastically.",
        rootCause: "Conversion Factor Confusion — mixes up the litre-to-ml factor with a smaller metric prefix's factor.",
        remediation: "Memorise the exact fact: 1 litre = 1000 ml — always confirm the conversion factor before multiplying."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the conversion fact", hint: "1 litre = 1000 ml." },
      { level: 2, description: "Set up the multiplication", hint: "2.5 × 1000 = ?" },
      { level: 3, description: "Shift the decimal", hint: "Multiplying by 1000 moves the decimal three places right." }
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
    question: "90 minutes = ? hours",
    options: [
        { text: "1.5 h", correct: true, feedback: "90 ÷ 60 = 1.5 hours." },
        { text: "1.3 h", correct: false, feedback: "You divided 90 by 100? Not correct.", misconceptionId: "E-w4-a" },
        { text: "1.9 h", correct: false, feedback: "Incorrect.", misconceptionId: "E-w4-b" },
        { text: "0.9 h", correct: false, feedback: "You divided by 100?", misconceptionId: "E-w4-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-w4-a",
        description: "Student divides 90 by 100 instead of 60, treating minutes-to-hours like a base-10 metric conversion.",
        rootCause: "Base-10 Overgeneralization — mistakenly applies the metric base-10 pattern (used for km, kg, litres) to time, which is base-60.",
        remediation: "Time is NOT a base-10 unit — there are 60 minutes in an hour (not 100), so divide 90 by 60, not 100."
      },
      {
        misconceptionId: "E-w4-b",
        description: "Student computes an incorrect quotient, landing on 1.9 instead of 1.5.",
        rootCause: "Division Computation Error — miscalculates 90 ÷ 60.",
        remediation: "Recompute: 90 ÷ 60 = 1.5 — verify by multiplying 1.5 × 60 to see if it returns 90."
      },
      {
        misconceptionId: "E-w4-c",
        description: "Student divides 90 by 100 and gets a value less than 1, another symptom of treating time as base-10.",
        rootCause: "Base-10 Overgeneralization — applies the wrong divisor (100) instead of the correct base-60 divisor (60).",
        remediation: "Always divide by 60 to convert minutes to hours: 90 ÷ 60 = 1.5, not ÷100."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the conversion fact", hint: "1 hour = 60 minutes." },
      { level: 2, description: "Set up the division", hint: "90 ÷ 60 = ?" },
      { level: 3, description: "Interpret the result", hint: "90 minutes is 1 whole hour plus a half hour (30 min) — as a decimal, that's 1.5." }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "w5",
    order: 5,
    cluster: "MONEY",
    clusterName: CLUSTER_NAMES.MONEY,
    skillId: "MEASMONEY-01",
    question: "Cost Price = ₹300, Selling Price = ₹360. Find the profit.",
    options: [
        { text: "₹60", correct: true, feedback: "Profit = 360 − 300 = ₹60." },
        { text: "₹660", correct: false, feedback: "You added instead of subtracting.", misconceptionId: "E-w5-a" },
        { text: "₹300", correct: false, feedback: "That's the Cost Price.", misconceptionId: "E-w5-b" },
        { text: "₹360", correct: false, feedback: "That's the Selling Price.", misconceptionId: "E-w5-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-w5-a",
        description: "Student adds Cost Price and Selling Price instead of subtracting, producing a value far too large.",
        rootCause: "Formula Operation Confusion — applies addition instead of the subtraction the profit formula requires.",
        remediation: "Profit = Selling Price MINUS Cost Price — always subtract, never add, the two prices."
      },
      {
        misconceptionId: "E-w5-b",
        description: "Student reports the Cost Price itself instead of computing the difference between SP and CP.",
        rootCause: "Wrong Value Reported — confuses one of the given quantities with the requested result.",
        remediation: "The question asks for PROFIT, which is the DIFFERENCE between Selling Price and Cost Price — not either price alone."
      },
      {
        misconceptionId: "E-w5-c",
        description: "Student reports the Selling Price itself instead of computing the difference between SP and CP.",
        rootCause: "Wrong Value Reported — confuses one of the given quantities with the requested result.",
        remediation: "The question asks for PROFIT, which is the DIFFERENCE between Selling Price and Cost Price — not either price alone."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the formula", hint: "Profit = Selling Price − Cost Price." },
      { level: 2, description: "Identify the values", hint: "SP = 360, CP = 300." },
      { level: 3, description: "Subtract", hint: "360 − 300 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "w6",
    order: 6,
    cluster: "PAV",
    clusterName: CLUSTER_NAMES.PAV,
    skillId: "MEASPAV-02",
    question: "Area of a square with side 7 cm.",
    options: [
        { text: "49 cm²", correct: true, feedback: "Area = side × side = 7 × 7 = 49 cm²." },
        { text: "28 cm", correct: false, feedback: "That's the perimeter (4 × 7).", misconceptionId: "E-w6-a" },
        { text: "14 cm²", correct: false, feedback: "You added instead of multiplied.", misconceptionId: "E-w6-b" },
        { text: "49 cm", correct: false, feedback: "Missing square units.", misconceptionId: "E-w6-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-w6-a",
        description: "Student computes the perimeter (4 × side) instead of the area (side × side).",
        rootCause: "Perimeter/Area Formula Confusion — applies the addition-based perimeter formula when the multiplication-based area formula was needed.",
        remediation: "Area measures the space INSIDE a shape using multiplication (side×side); perimeter measures the distance AROUND using 4×side — check which the question asks for."
      },
      {
        misconceptionId: "E-w6-b",
        description: "Student adds the side to itself (7+7=14) instead of multiplying it by itself.",
        rootCause: "Multiplication/Addition Confusion — uses addition instead of multiplication when squaring a value.",
        remediation: "Area of a square is side MULTIPLIED BY ITSELF (7×7=49), not side added to itself (7+7=14)."
      },
      {
        misconceptionId: "E-w6-c",
        description: "Student computes the correct numeric value (49) but omits the required square units (cm²).",
        rootCause: "Missing Square Units — forgets that area is always measured in SQUARE units, not linear units.",
        remediation: "Area is always expressed in square units (cm², m², etc.) because it measures a two-dimensional space — always append the ² to the unit."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the formula", hint: "Area of square = side × side." },
      { level: 2, description: "Multiply", hint: "7 × 7 = ?" },
      { level: 3, description: "Add the units", hint: "Area is measured in square units: cm²." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.MD.C.5"]
  },
  {
    itemId: "w7",
    order: 7,
    cluster: "LENGTH",
    clusterName: CLUSTER_NAMES.LENGTH,
    skillId: "MEASLEN-02",
    question: "5 m − 2 m 50 cm = ?",
    options: [
        { text: "2 m 50 cm", correct: true, feedback: "5 m = 500 cm, minus 250 cm = 250 cm = 2 m 50 cm." },
        { text: "3 m 50 cm", correct: false, feedback: "You added instead of subtracting.", misconceptionId: "E-w7-a" },
        { text: "2 m", correct: false, feedback: "You only subtracted the metres.", misconceptionId: "E-w7-b" },
        { text: "2 m 5 cm", correct: false, feedback: "Incorrect subtraction.", misconceptionId: "E-w7-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-w7-a",
        description: "Student adds the two lengths instead of subtracting, producing a result larger than the starting length.",
        rootCause: "Operation Sign Misread — performs addition when subtraction was requested.",
        remediation: "The minus sign means subtract — 5 m minus 2 m 50 cm, not plus."
      },
      {
        misconceptionId: "E-w7-b",
        description: "Student subtracts only the whole-metre parts (5-2=3, then adjusted to 2) and drops the cm component entirely.",
        rootCause: "Mixed-Unit Component Dropped — ignores the cm component when working with combined m+cm quantities.",
        remediation: "Convert both amounts fully to cm first (5m=500cm, 2m50cm=250cm), subtract, then convert back — this keeps both components tracked."
      },
      {
        misconceptionId: "E-w7-c",
        description: "Student misplaces a digit while converting back to mixed units, landing on 2 m 5 cm instead of 2 m 50 cm.",
        rootCause: "Column Shift Error — misplaces a digit when converting the cm remainder back to mixed units.",
        remediation: "250 cm = 2 m 50 cm (2 whole metres, plus 50 cm remaining) — check that the remaining cm value keeps all its digits, not just one."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Convert to a single unit", hint: "5 m = 500 cm. 2 m 50 cm = 250 cm." },
      { level: 2, description: "Subtract", hint: "500 - 250 = ?" },
      { level: 3, description: "Convert back to mixed units", hint: "250 cm = ? m ? cm." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.MD.A.1"]
  },
  {
    itemId: "w8",
    order: 8,
    cluster: "MASS",
    clusterName: CLUSTER_NAMES.MASS,
    skillId: "MEASMASS-01",
    question: "1 kg = ? g",
    options: [
        { text: "1000 g", correct: true, feedback: "1 kilogram = 1000 grams." },
        { text: "100 g", correct: false, feedback: "That would be 1 hectogram? Not correct.", misconceptionId: "E-w8-a" },
        { text: "10 g", correct: false, feedback: "Incorrect.", misconceptionId: "E-w8-b" },
        { text: "10000 g", correct: false, feedback: "Too many zeros.", misconceptionId: "E-w8-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-w8-a",
        description: "Student confuses the kg-to-g conversion factor with a smaller metric prefix's factor (like 'hecto', ×100).",
        rootCause: "Metric Prefix Confusion — mixes up 'kilo' (one thousand) with a different metric prefix.",
        remediation: "'Kilo' specifically means one THOUSAND — so 1 kilogram contains 1000 grams, not 100."
      },
      {
        misconceptionId: "E-w8-b",
        description: "Student severely undershoots, using a factor of 10 instead of 1000.",
        rootCause: "Conversion Factor Confusion — mixes up the kg-to-g factor with a much smaller conversion factor.",
        remediation: "Memorise the exact fact: 1 kg = 1000 g — this is a fixed conversion fact, not 10 g."
      },
      {
        misconceptionId: "E-w8-c",
        description: "Student overshoots, using a factor of 10000 instead of 1000.",
        rootCause: "Power-of-Ten Miscount — adds an extra zero beyond the correct conversion factor.",
        remediation: "Recount the zeros: 1 kg = 1000 g exactly (three zeros), not 10000 (four zeros)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall what 'kilo' means", hint: "Kilo means one thousand." },
      { level: 2, description: "Apply it to grams", hint: "1 kilogram = 1000 × 1 gram." },
      { level: 3, description: "State the fact", hint: "1 kg = ? g." }
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
    tier: "S",
    skillId: "MEASLEN-02",
    question: "Convert 6 km 50 m to metres.",
    options: [
        { text: "6050 m", correct: true, feedback: "6 km = 6000 m, + 50 m = 6050 m." },
        { text: "650 m", correct: false, feedback: "You multiplied 6.5 by 100? Not correct.", misconceptionId: "E-d1-a" },
        { text: "60050 m", correct: false, feedback: "Misplaced digits.", misconceptionId: "E-d1-b" },
        { text: "6500 m", correct: false, feedback: "You forgot the 50 m.", misconceptionId: "E-d1-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-d1-a",
        description: "Student misreads the mixed quantity as 6.5 km and mishandles the conversion, undershooting by a factor of 10.",
        rootCause: "Mixed-Unit Misreading — misinterprets '6 km 50 m' as a decimal value (6.5) instead of two separate components.",
        remediation: "'6 km 50 m' means 6 WHOLE km PLUS 50 metres, not 6.5 km — convert each part separately: 6 km=6000m, then add 50m."
      },
      {
        misconceptionId: "E-d1-b",
        description: "Student places the 50 m in the wrong column, e.g. treating it as 500 m and writing 60050 instead of 6050.",
        rootCause: "Column Shift Error — misaligns the metres component when combining with the km-derived value.",
        remediation: "6000 + 50 means adding to the TENS column: 6000 has tens digit 0, and 50 fills it in as 6050, not a different column."
      },
      {
        misconceptionId: "E-d1-c",
        description: "Student converts the km part correctly (6000 m) but forgets to add the 50 m component entirely.",
        rootCause: "Mixed-Unit Component Dropped — ignores the metres component when converting a combined km+m quantity.",
        remediation: "The quantity has TWO parts: 6 km AND 50 m — convert the km part (6000 m) AND add the metres part (50 m): 6000+50=6050."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Convert the km part", hint: "6 km = 6000 m." },
      { level: 2, description: "Add the m part", hint: "6000 + 50 = ?" },
      { level: 3, description: "Check place value", hint: "50 fills the tens column, not the hundreds column." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.MD.A.1"]
  },
  {
    itemId: "d2",
    order: 2,
    cluster: "MASS",
    clusterName: CLUSTER_NAMES.MASS,
    tier: "S",
    skillId: "MEASMASS-03",
    question: "How many grams are there in 2.5 kg?",
    options: [
        { text: "2500 g", correct: true, feedback: "2.5 × 1000 = 2500 g." },
        { text: "250 g", correct: false, feedback: "You multiplied by 100.", misconceptionId: "E-d2-a" },
        { text: "25000 g", correct: false, feedback: "You multiplied by 10000.", misconceptionId: "E-d2-b" },
        { text: "2.5 g", correct: false, feedback: "No conversion.", misconceptionId: "E-d2-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-d2-a",
        description: "Student multiplies 2.5 by 100 instead of 1000, undershooting by a factor of 10.",
        rootCause: "Power-of-Ten Shift Miscount — applies a two-zero shift instead of the correct three-zero shift.",
        remediation: "Count the zeros in 1000 (three zeros) — 2.5 × 1000 = 2500, shifting the decimal three places right."
      },
      {
        misconceptionId: "E-d2-b",
        description: "Student multiplies 2.5 by 10000, overshooting by a factor of 10.",
        rootCause: "Power-of-Ten Shift Miscount — adds an extra zero beyond the correct three-zero shift.",
        remediation: "Recount the zeros in 1000 — there are exactly three, so 2.5 kg becomes 2500 g, not 25000 g."
      },
      {
        misconceptionId: "E-d2-c",
        description: "Student reports the original value (2.5) unchanged, applying no conversion at all.",
        rootCause: "Conversion Step Omitted — doesn't perform any multiplication to convert kg to g.",
        remediation: "Converting kg to grams requires multiplying by 1000 — 2.5 kg is NOT the same number as 2.5 g, since they're different units."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the conversion fact", hint: "1 kg = 1000 g." },
      { level: 2, description: "Set up the multiplication", hint: "2.5 × 1000 = ?" },
      { level: 3, description: "Shift the decimal", hint: "Multiplying by 1000 moves the decimal three places right." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.MD.A.1"]
  },
  {
    itemId: "d3",
    order: 3,
    cluster: "CAP",
    clusterName: CLUSTER_NAMES.CAP,
    tier: "S",
    skillId: "MEASCAP-02",
    question: "3 l 200 ml = ? ml",
    options: [
        { text: "3200 ml", correct: true, feedback: "3 l = 3000 ml, + 200 ml = 3200 ml." },
        { text: "320 ml", correct: false, feedback: "You divided by 10.", misconceptionId: "E-d3-a" },
        { text: "32000 ml", correct: false, feedback: "You multiplied by 10.", misconceptionId: "E-d3-b" },
        { text: "3020 ml", correct: false, feedback: "Misplaced digits.", misconceptionId: "E-d3-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-d3-a",
        description: "Student divides the correct total by 10, undershooting by a factor of 10.",
        rootCause: "Extraneous Division Step — applies an unnecessary division after correctly combining l and ml.",
        remediation: "Once 3 l is converted to 3000 ml and added to 200 ml, no further division is needed — 3000+200=3200 directly."
      },
      {
        misconceptionId: "E-d3-b",
        description: "Student multiplies the correct total by 10, overshooting by a factor of 10.",
        rootCause: "Extraneous Multiplication Step — applies an unnecessary multiplication after correctly combining l and ml.",
        remediation: "Once 3 l is converted to 3000 ml and added to 200 ml, no further multiplication is needed — 3000+200=3200 directly."
      },
      {
        misconceptionId: "E-d3-c",
        description: "Student places the 200 ml in the wrong column, writing 3020 instead of 3200.",
        rootCause: "Column Shift Error — misaligns the ml component when combining with the litre-derived value.",
        remediation: "3000 + 200 means adding to the HUNDREDS column: 3000 has hundreds digit 0, and 200 fills it in as 3200, not the tens/ones column."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Convert the litre part", hint: "3 l = 3000 ml." },
      { level: 2, description: "Add the ml part", hint: "3000 + 200 = ?" },
      { level: 3, description: "Check place value", hint: "200 fills the hundreds column, not the tens or ones column." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.MD.A.1"]
  },
  {
    itemId: "d4",
    order: 4,
    cluster: "TIME",
    clusterName: CLUSTER_NAMES.TIME,
    tier: "S",
    skillId: "MEASTIME-02",
    question: "Convert 4:30 PM to the 24‑hour clock.",
    options: [
        { text: "16:30", correct: true, feedback: "4 + 12 = 16, so 16:30." },
        { text: "4:30", correct: false, feedback: "That's 12‑hour format.", misconceptionId: "E-d4-a" },
        { text: "14:30", correct: false, feedback: "That's 2:30 PM.", misconceptionId: "E-d4-b" },
        { text: "17:30", correct: false, feedback: "That's 5:30 PM.", misconceptionId: "E-d4-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-d4-a",
        description: "Student leaves the time unchanged in 12-hour format, not applying the +12 conversion at all.",
        rootCause: "Conversion Step Omitted — doesn't perform the required addition to convert to 24-hour format.",
        remediation: "24-hour format requires adding 12 to any PM hour after noon: 4 PM becomes 4+12=16, written as 16:30."
      },
      {
        misconceptionId: "E-d4-b",
        description: "Student adds 10 instead of 12, landing on the 24-hour equivalent of 2:30 PM instead of 4:30 PM.",
        rootCause: "Addition Constant Error — uses the wrong number to add when converting to 24-hour time.",
        remediation: "The conversion rule is always +12 for PM hours — 4 + 12 = 16, not 4 + 10 = 14."
      },
      {
        misconceptionId: "E-d4-c",
        description: "Student adds 13 instead of 12, landing on the 24-hour equivalent of 5:30 PM instead of 4:30 PM.",
        rootCause: "Addition Constant Error — a different miscalculation of the +12 conversion constant.",
        remediation: "Double-check the addition: 4 + 12 = 16 exactly — recount to make sure you're adding 12, not 13."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the rule", hint: "For PM times after noon, add 12 to the hour." },
      { level: 2, description: "Apply it", hint: "4 + 12 = ?" },
      { level: 3, description: "Write the full time", hint: "Keep the minutes the same: 16:30." }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d5",
    order: 5,
    cluster: "MONEY",
    clusterName: CLUSTER_NAMES.MONEY,
    tier: "T",
    skillId: "MEASMONEY-02",
    question: "Cost Price = ₹500, Selling Price = ₹450. Find the loss percentage.",
    options: [
        { text: "10%", correct: true, feedback: "Loss = ₹50. Loss% = (50/500)×100 = 10%." },
        { text: "11.1%", correct: false, feedback: "You divided loss by SP (50/450 ≈ 11.1%).", misconceptionId: "E-d5-a" },
        { text: "20%", correct: false, feedback: "Incorrect calculation.", misconceptionId: "E-d5-b" },
        { text: "5%", correct: false, feedback: "Incorrect.", misconceptionId: "E-d5-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-d5-a",
        description: "Student divides the loss by Selling Price instead of Cost Price, using the wrong base for the percentage.",
        rootCause: "Wrong Percentage Base — uses SP instead of CP as the denominator in the loss percentage formula.",
        remediation: "Loss percentage is always calculated relative to the COST PRICE (what was originally paid), not the Selling Price: Loss % = (Loss ÷ CP) × 100."
      },
      {
        misconceptionId: "E-d5-b",
        description: "Student makes an error either in computing the loss or in the percentage division, landing on 20% instead of 10%.",
        rootCause: "Formula Computation Error — a miscalculation somewhere in the two-step loss-percentage formula.",
        remediation: "Work through the formula in two clear steps: Loss = 500 - 450 = 50. Then Loss % = (50 ÷ 500) × 100 = 10%."
      },
      {
        misconceptionId: "E-d5-c",
        description: "Student computes a percentage too low, perhaps confusing the loss amount with a different, smaller reference value.",
        rootCause: "Formula Computation Error — a different miscalculation in applying the loss-percentage formula.",
        remediation: "Recompute step by step: loss is CP-SP=50, then divide by CP (500) and multiply by 100 to get the percentage: 10%."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the loss", hint: "Loss = CP − SP = 500 − 450." },
      { level: 2, description: "Recall the percentage formula", hint: "Loss % = (Loss ÷ Cost Price) × 100 — always divide by CP." },
      { level: 3, description: "Compute", hint: "(50 ÷ 500) × 100 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d6",
    order: 6,
    cluster: "PAV",
    clusterName: CLUSTER_NAMES.PAV,
    tier: "T",
    skillId: "MEASPAV-01",
    question: "Find the perimeter of a rectangle with length 15 cm and breadth 10 cm.",
    options: [
        { text: "50 cm", correct: true, feedback: "Perimeter = 2 × (15 + 10) = 50 cm." },
        { text: "150 cm", correct: false, feedback: "That's the area (15 × 10).", misconceptionId: "E-d6-a" },
        { text: "30 cm", correct: false, feedback: "You added length and breadth and forgot to double.", misconceptionId: "E-d6-b" },
        { text: "25 cm", correct: false, feedback: "Incorrect.", misconceptionId: "E-d6-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-d6-a",
        description: "Student computes the area (length × breadth) instead of the perimeter.",
        rootCause: "Perimeter/Area Formula Confusion — applies the multiplication formula (area) when the addition-based formula (perimeter) was needed.",
        remediation: "Perimeter measures the distance AROUND a shape (add the sides then double); area measures the space INSIDE (multiply length × breadth) — check which the question asks for."
      },
      {
        misconceptionId: "E-d6-b",
        description: "Student adds length and breadth (15+10=25... wait, this option is 30) but forgets to double the sum, since a rectangle has two of each side.",
        rootCause: "Missing-Doubling Step — stops after adding the two different side lengths once, forgetting the rectangle has TWO of each.",
        remediation: "A rectangle has two lengths and two breadths — after adding length + breadth once, multiply that sum by 2: 2 × (15+10) = 50."
      },
      {
        misconceptionId: "E-d6-c",
        description: "Student makes a different computational error, landing on 25 instead of 50.",
        rootCause: "Perimeter Computation Error — a general miscalculation in applying the perimeter formula.",
        remediation: "Use the formula precisely: Perimeter = 2 × (length + breadth) = 2 × (15 + 10) — compute the bracket first, then double it."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the formula", hint: "Perimeter of rectangle = 2 × (length + breadth)." },
      { level: 2, description: "Add length and breadth", hint: "15 + 10 = 25." },
      { level: 3, description: "Double the sum", hint: "2 × 25 = ?" }
    ],
    forwardRiskLinks: [
      { targetSkillId: "MEASPAV-02", probability: 0.35, condition: "Confusing the perimeter and area formulas recurs whenever both are asked about the same shape in later problems." }
    ],
    learningObjectives: ["CCSS.MATH.CONTENT.5.MD.C.5"]
  },
  {
    itemId: "d7",
    order: 7,
    cluster: "LENGTH",
    clusterName: CLUSTER_NAMES.LENGTH,
    tier: "C",
    skillId: "MEASLEN-05",
    question: "How many full pieces of 1.25 m each can be cut from an 8 m rope?",
    options: [
        { text: "6", correct: true, feedback: "8 ÷ 1.25 = 6.4, so 6 full pieces." },
        { text: "7", correct: false, feedback: "You rounded up, but you can't get a 7th full piece.", misconceptionId: "E-d7-a" },
        { text: "10", correct: false, feedback: "Incorrect division.", misconceptionId: "E-d7-b" },
        { text: "5", correct: false, feedback: "Incorrect.", misconceptionId: "E-d7-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-d7-a",
        description: "Student computes 8 ÷ 1.25 = 6.4 correctly but rounds UP to 7, not realising a partial piece can't be a full piece.",
        rootCause: "Rounding Direction Error in Division-with-Remainder — rounds a division-with-remainder result up instead of down when counting whole usable units.",
        remediation: "When dividing to find how many FULL pieces fit, always round DOWN (truncate), never up — 6.4 means only 6 complete pieces, with some rope left over unused."
      },
      {
        misconceptionId: "E-d7-b",
        description: "Student makes a computational error in the division, landing on 10 instead of 6.",
        rootCause: "Division Computation Error — miscalculates 8 ÷ 1.25.",
        remediation: "Recompute: 8 ÷ 1.25 — think of it as 800 ÷ 125 (multiply both by 100), which gives 6.4 — round down to 6 full pieces."
      },
      {
        misconceptionId: "E-d7-c",
        description: "Student underestimates, landing on 5 instead of 6.",
        rootCause: "Division Computation Error — a different miscalculation of 8 ÷ 1.25.",
        remediation: "Verify by multiplying: 6 × 1.25 = 7.5 m used, leaving 0.5 m unused (not enough for a 7th piece) — this confirms 6 is correct, not 5."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Set up the division", hint: "8 ÷ 1.25 = ?" },
      { level: 2, description: "Compute the quotient", hint: "8 ÷ 1.25 = 6.4." },
      { level: 3, description: "Round down for full pieces", hint: "6.4 means only 6 COMPLETE pieces fit — round down, not up." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.MD.A.1"]
  },
  {
    itemId: "d8",
    order: 8,
    cluster: "MASS",
    clusterName: CLUSTER_NAMES.MASS,
    tier: "C",
    skillId: "MEASMASS-04",
    question: "5 bags each weigh 2.4 kg. What is the total mass in grams?",
    options: [
        { text: "12000 g", correct: true, feedback: "5 × 2.4 = 12 kg = 12000 g." },
        { text: "1200 g", correct: false, feedback: "You divided by 10.", misconceptionId: "E-d8-a" },
        { text: "2400 g", correct: false, feedback: "Only one bag.", misconceptionId: "E-d8-b" },
        { text: "120 g", correct: false, feedback: "Incorrect.", misconceptionId: "E-d8-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-d8-a",
        description: "Student correctly finds the total in kg but divides by 10 somewhere in the gram conversion, undershooting by a factor of 10.",
        rootCause: "Power-of-Ten Shift Miscount — applies an incorrect shift when converting the kg total to grams.",
        remediation: "12 kg × 1000 = 12000 g — count the zeros in 1000 (three) and shift the decimal three places right, not just one."
      },
      {
        misconceptionId: "E-d8-b",
        description: "Student reports the mass of only ONE bag (2400 g) instead of all 5 bags combined.",
        rootCause: "Quantity Not Scaled — forgets to multiply by the number of bags before converting to grams.",
        remediation: "The question asks for the TOTAL mass of 5 bags — first multiply 2.4 kg × 5 = 12 kg, THEN convert to grams: 12000 g."
      },
      {
        misconceptionId: "E-d8-c",
        description: "Student makes a larger computational error, landing far below the correct total.",
        rootCause: "Multi-Step Computation Error — a miscalculation somewhere in the multiplication or conversion chain.",
        remediation: "Work through each step: 5 × 2.4 = 12 kg, then 12 kg × 1000 = 12000 g — recheck each step."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the total mass in kg", hint: "5 × 2.4 = ?" },
      { level: 2, description: "Convert to grams", hint: "12 kg × 1000 = ?" },
      { level: 3, description: "Check", hint: "Does 12000 g make sense for 5 bags around 2.4 kg each?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.MD.A.1"]
  },
  {
    itemId: "d9",
    order: 9,
    cluster: "CAP",
    clusterName: CLUSTER_NAMES.CAP,
    tier: "T",
    skillId: "MEASCAP-03",
    question: "A 5 l can contains 3 l 750 ml of oil. How much more oil is needed to fill it completely?",
    options: [
        { text: "1 l 250 ml", correct: true, feedback: "5 l = 5000 ml; 3750 ml; difference = 1250 ml = 1 l 250 ml." },
        { text: "2 l 250 ml", correct: false, feedback: "You subtracted 5 − 3 = 2 l but miscalculated ml.", misconceptionId: "E-d9-a" },
        { text: "1 l 750 ml", correct: false, feedback: "You used 3.75? No.", misconceptionId: "E-d9-b" },
        { text: "1 l 150 ml", correct: false, feedback: "Incorrect.", misconceptionId: "E-d9-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-d9-a",
        description: "Student subtracts the whole-litre parts (5-3=2) correctly but mishandles the ml part, landing on 2 l 250 ml instead of 1 l 250 ml.",
        rootCause: "Mixed-Unit Subtraction Borrowing Error — doesn't borrow across the l/ml boundary when the ml being subtracted (750) exceeds what's available (0 from the whole 5 l).",
        remediation: "Convert fully to ml first: 5 l = 5000 ml, 3 l 750 ml = 3750 ml. Subtract 5000 - 3750 = 1250 ml, then convert back — this avoids borrowing mistakes."
      },
      {
        misconceptionId: "E-d9-b",
        description: "Student reports the current amount in the can (3 l 750 ml, roughly) instead of computing the amount still needed to fill it.",
        rootCause: "Wrong Value Reported — confuses the current amount with the amount still needed.",
        remediation: "The question asks how much MORE is needed, which is the CAPACITY minus the CURRENT amount — 5000 ml - 3750 ml = 1250 ml, not the current amount itself."
      },
      {
        misconceptionId: "E-d9-c",
        description: "Student makes a smaller computational error in the subtraction, landing 100 ml below the correct answer.",
        rootCause: "Mixed-Unit Subtraction Error — a computational slip when subtracting 3750 ml from 5000 ml.",
        remediation: "Recompute carefully: 5000 ml - 3750 ml = 1250 ml — verify by adding 1250 back to 3750 to see if it returns 5000."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Convert to a single unit", hint: "5 l = 5000 ml. 3 l 750 ml = 3750 ml." },
      { level: 2, description: "Subtract", hint: "5000 - 3750 = ?" },
      { level: 3, description: "Convert back to mixed units", hint: "1250 ml = ? l ? ml." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.MD.A.1"]
  },
  {
    itemId: "d10",
    order: 10,
    cluster: "TIME",
    clusterName: CLUSTER_NAMES.TIME,
    tier: "C",
    skillId: "MEASTIME-03",
    question: "A train starts at 7:45 AM and travels for 3 h 20 min. What time does it arrive?",
    options: [
        { text: "11:05 AM", correct: true, feedback: "7:45 + 3 h = 10:45; + 20 min = 11:05 AM." },
        { text: "11:15 AM", correct: false, feedback: "You added 30 min instead of 20.", misconceptionId: "E-d10-a" },
        { text: "10:65 AM", correct: false, feedback: "65 min is not a valid time.", misconceptionId: "E-d10-b" },
        { text: "11:05 PM", correct: false, feedback: "Wrong AM/PM.", misconceptionId: "E-d10-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-d10-a",
        description: "Student adds 30 minutes instead of the stated 20 minutes to the intermediate time.",
        rootCause: "Value Misread — substitutes a different number of minutes than what the question states.",
        remediation: "Re-check the duration stated: 3 h 20 min — after adding the 3 hours (10:45), add the full 20 minutes, not 30."
      },
      {
        misconceptionId: "E-d10-b",
        description: "Student adds the minutes without carrying the overflow into the next hour, leaving an invalid time like 10:65.",
        rootCause: "Minute Overflow Not Carried — doesn't convert 60+ minutes into an extra hour when the sum exceeds 59.",
        remediation: "When adding minutes results in 60 or more, carry the extra into the hours: 45+20=65 minutes means 1 hour 5 minutes — carry that hour: 10:45+20min=11:05, not 10:65."
      },
      {
        misconceptionId: "E-d10-c",
        description: "Student computes the correct time (11:05) but labels it PM instead of AM.",
        rootCause: "AM/PM Assignment Error — doesn't track that the journey stays within the AM period since it starts at 7:45 AM and the duration doesn't cross into the afternoon.",
        remediation: "Starting at 7:45 AM and adding about 3.5 hours stays before 12:00 noon — the arrival time remains AM: 11:05 AM."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Add the whole hours first", hint: "7:45 AM + 3 hours = 10:45 AM." },
      { level: 2, description: "Add the remaining minutes", hint: "10:45 AM + 20 minutes = ?" },
      { level: 3, description: "Check for carrying", hint: "45 + 20 = 65 minutes — this carries 1 hour and leaves 5 minutes." }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d11",
    order: 11,
    cluster: "MONEY",
    clusterName: CLUSTER_NAMES.MONEY,
    tier: "H",
    skillId: "MEASMONEY-03",
    question: "The selling price of an item is ₹720 after a loss of 10%. What was its cost price?",
    options: [
        { text: "₹800", correct: true, feedback: "SP = 90% of CP → CP = 720 ÷ 0.9 = ₹800." },
        { text: "₹792", correct: false, feedback: "You added 10% of 720 (720 + 72 = 792).", misconceptionId: "E-d11-a" },
        { text: "₹648", correct: false, feedback: "You subtracted 10% of 720 (720 − 72).", misconceptionId: "E-d11-b" },
        { text: "₹880", correct: false, feedback: "Incorrect.", misconceptionId: "E-d11-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-d11-a",
        description: "Student adds 10% of the SELLING price (720) instead of correctly working backwards from the percentage relationship, landing on 792.",
        rootCause: "Percentage-of-Wrong-Base Error — computes 10% of the SP instead of solving for CP using the correct percentage relationship (SP = 90% of CP).",
        remediation: "SP represents 90% of CP (since there's a 10% loss) — to find CP, DIVIDE the SP by 0.9, don't add 10% of the SP: 720 ÷ 0.9 = 800."
      },
      {
        misconceptionId: "E-d11-b",
        description: "Student subtracts 10% of the Selling Price instead of correctly working backwards, landing on 648, which moves in the wrong direction (CP should be MORE than SP for a loss, not less).",
        rootCause: "Direction Confusion — doesn't recognise that CP must be LARGER than SP when there's a loss, so simple subtraction from SP is the wrong direction.",
        remediation: "Since there's a LOSS, the cost price must be GREATER than the selling price — dividing 720 by 0.9 (not subtracting) correctly gives a larger value: 800."
      },
      {
        misconceptionId: "E-d11-c",
        description: "Student makes a different computational error working backwards through the percentage, landing on 880 instead of 800.",
        rootCause: "Reverse-Percentage Computation Error — a miscalculation when dividing SP by the loss factor.",
        remediation: "Recompute: SP = 90% of CP means CP = SP ÷ 0.9 = 720 ÷ 0.9 = 800 — verify by checking that 800 × 0.9 = 720."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Set up the percentage relationship", hint: "A 10% loss means SP = 90% of CP." },
      { level: 2, description: "Write the equation", hint: "720 = 0.9 × CP." },
      { level: 3, description: "Solve for CP", hint: "CP = 720 ÷ 0.9." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "MEASMONEY-02", probability: 0.4, condition: "Working backwards through a loss percentage to find cost price recurs in more advanced reverse-percentage finance problems." }
    ],
    learningObjectives: []
  },
  {
    itemId: "d12",
    order: 12,
    cluster: "PAV",
    clusterName: CLUSTER_NAMES.PAV,
    tier: "H",
    skillId: "MEASPAV-06",
    question: "The volume of a cube is 125 cm³. Find its surface area.",
    options: [
        { text: "150 cm²", correct: true, feedback: "Side = ∛125 = 5 cm. Surface area = 6 × 5² = 150 cm²." },
        { text: "125 cm²", correct: false, feedback: "That's the volume.", misconceptionId: "E-d12-a" },
        { text: "25 cm²", correct: false, feedback: "That's the area of one face.", misconceptionId: "E-d12-b" },
        { text: "30 cm²", correct: false, feedback: "That's the perimeter of one face? No.", misconceptionId: "E-d12-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-d12-a",
        description: "Student reports the given volume (125) directly as if it were the surface area, without any calculation.",
        rootCause: "Wrong Value Reported — confuses the given volume with the requested surface area.",
        remediation: "Volume and surface area are different measurements — work through: side=∛125=5, then surface area=6×5²=150, not just restating the volume."
      },
      {
        misconceptionId: "E-d12-b",
        description: "Student computes only ONE face's area (side²=25) and reports that instead of the total surface area across all 6 faces.",
        rootCause: "Final-Step Omission — stops after finding one face's area, forgetting to multiply by the number of faces.",
        remediation: "One face's area (25 cm²) is only PART of the surface area — multiply by 6 (the number of faces) to get the total: 6×25=150."
      },
      {
        misconceptionId: "E-d12-c",
        description: "Student computes the perimeter of one face (4×side=20, or a related value) instead of the surface area.",
        rootCause: "Perimeter/Surface-Area Confusion — applies a 2D perimeter-style calculation to a 3D surface-area question.",
        remediation: "Surface area uses MULTIPLICATION (6 × side²), not the addition-based perimeter formula — recompute using side²=25, then ×6=150."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the side length", hint: "Side = ∛125 (what number cubed equals 125?)." },
      { level: 2, description: "Find one face's area", hint: "side² = 5² = ?" },
      { level: 3, description: "Multiply by the number of faces", hint: "A cube has 6 faces: 6 × 25 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.MD.C.5"]
  },
  {
    itemId: "d13",
    order: 13,
    cluster: "LENGTH",
    clusterName: CLUSTER_NAMES.LENGTH,
    tier: "T",
    skillId: "MEASLEN-04",
    question: "Convert 0.045 km to cm.",
    options: [
        { text: "4500 cm", correct: true, feedback: "0.045 km = 45 m = 4500 cm." },
        { text: "450 cm", correct: false, feedback: "You multiplied 45 by 10? No.", misconceptionId: "E-d13-a" },
        { text: "45 cm", correct: false, feedback: "You only converted to metres.", misconceptionId: "E-d13-b" },
        { text: "4.5 cm", correct: false, feedback: "You divided by 10 again.", misconceptionId: "E-d13-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-d13-a",
        description: "Student correctly finds 45 m but multiplies by 10 instead of 100 to convert to cm, undershooting by a factor of 10.",
        rootCause: "Power-of-Ten Shift Miscount — applies a one-zero shift instead of the correct two-zero shift for m-to-cm.",
        remediation: "1 m = 100 cm (two zeros) — 45 m × 100 = 4500 cm, not 450 cm."
      },
      {
        misconceptionId: "E-d13-b",
        description: "Student correctly converts km to m (45 m) but stops there without completing the second conversion to cm.",
        rootCause: "Multi-Step Conversion Abandoned — stops after the first of two required conversion steps.",
        remediation: "The question asks for CENTIMETRES, not metres — after finding 45 m, convert AGAIN: 45 m × 100 = 4500 cm."
      },
      {
        misconceptionId: "E-d13-c",
        description: "Student divides instead of multiplying when converting m to cm, moving in the wrong direction.",
        rootCause: "Multiplication/Division Direction Confusion — applies the inverse operation to what converting m (larger unit) to cm (smaller unit) requires.",
        remediation: "Converting a LARGER unit (m) to a SMALLER unit (cm) always means MULTIPLYING — 45 × 100 = 4500, not dividing."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Convert km to m first", hint: "0.045 km × 1000 = 45 m." },
      { level: 2, description: "Convert m to cm", hint: "45 m × 100 = ?" },
      { level: 3, description: "Check", hint: "Does 4500 cm make sense as a length close to 0.045 km?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.MD.A.1"]
  },
  {
    itemId: "d14",
    order: 14,
    cluster: "MASS",
    clusterName: CLUSTER_NAMES.MASS,
    tier: "T",
    skillId: "MEASMASS-05",
    question: "A packet weighs 2 kg 50 g. What is its weight in kg?",
    options: [
        { text: "2.05 kg", correct: true, feedback: "50 g = 0.05 kg, so 2.05 kg." },
        { text: "2.5 kg", correct: false, feedback: "You used 50 g as 0.5 kg.", misconceptionId: "E-d14-a" },
        { text: "2.005 kg", correct: false, feedback: "You used 50 g as 0.005 kg.", misconceptionId: "E-d14-b" },
        { text: "2.50 kg", correct: false, feedback: "You wrote 2.5 kg incorrectly.", misconceptionId: "E-d14-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-d14-a",
        description: "Student converts 50 g to 0.5 kg instead of the correct 0.05 kg, overshooting the decimal by a factor of 10.",
        rootCause: "Power-of-Ten Shift Miscount — treats 50 g as one-tenth of a kg instead of one-twentieth (0.05).",
        remediation: "1000 g = 1 kg, so 50 g = 50/1000 = 0.05 kg (not 0.5 kg) — divide 50 by 1000, shifting the decimal three places left."
      },
      {
        misconceptionId: "E-d14-b",
        description: "Student converts 50 g to 0.005 kg instead of the correct 0.05 kg, undershooting the decimal by a factor of 10.",
        rootCause: "Power-of-Ten Shift Miscount — shifts the decimal one place too many when converting grams to kg.",
        remediation: "50 g ÷ 1000 = 0.05 kg exactly — recount the decimal shift: three places left from 50 gives 0.050, which is 0.05."
      },
      {
        misconceptionId: "E-d14-c",
        description: "Student writes '2.50 kg' as if it were different from the correct 2.05 kg, confusing the placement of the digits.",
        rootCause: "Digit Placement Confusion — misplaces the '5' digit between the tenths and hundredths columns.",
        remediation: "50 g = 0.05 kg means the 5 goes in the HUNDREDTHS place (0.05), giving 2.05 kg — not the tenths place, which would be 2.50 kg (a very different, much larger value)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Convert the grams to a kg decimal", hint: "50 g ÷ 1000 = 0.05 kg." },
      { level: 2, description: "Combine with the whole kg", hint: "2 kg + 0.05 kg = ?" },
      { level: 3, description: "Check the digit placement", hint: "Does the 5 belong in the tenths or hundredths place?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.MD.A.1", "CCSS.MATH.CONTENT.5.NBT.A.3"]
  },
  {
    itemId: "d15",
    order: 15,
    cluster: "CAP",
    clusterName: CLUSTER_NAMES.CAP,
    tier: "H",
    skillId: "MEASCAP-04",
    question: "A 12 l tank is filled by a pipe that delivers 1.5 l per minute. How many minutes will it take to fill the tank from empty?",
    options: [
        { text: "8 min", correct: true, feedback: "12 ÷ 1.5 = 8 minutes." },
        { text: "6 min", correct: false, feedback: "You used 2 l per minute.", misconceptionId: "E-d15-a" },
        { text: "10 min", correct: false, feedback: "Incorrect.", misconceptionId: "E-d15-b" },
        { text: "18 min", correct: false, feedback: "You multiplied 12 × 1.5.", misconceptionId: "E-d15-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-d15-a",
        description: "Student uses a rate of 2 l/min instead of the stated 1.5 l/min, undershooting the required time.",
        rootCause: "Rate Misread — substitutes a different flow rate than the one given in the question.",
        remediation: "Re-check the rate stated: 1.5 l per minute, not 2 l per minute — divide 12 by 1.5, not 2."
      },
      {
        misconceptionId: "E-d15-b",
        description: "Student makes a computational error in the division, landing on 10 instead of 8.",
        rootCause: "Division Computation Error — miscalculates 12 ÷ 1.5.",
        remediation: "Recompute: 12 ÷ 1.5 — think of it as 120 ÷ 15 (multiply both by 10), which gives 8."
      },
      {
        misconceptionId: "E-d15-c",
        description: "Student multiplies instead of dividing, applying the wrong operation to find the time.",
        rootCause: "Operation Selection Error — multiplies volume by rate instead of dividing to find time.",
        remediation: "Time = total volume ÷ rate — divide 12 by 1.5, don't multiply: 12 ÷ 1.5 = 8 minutes."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the operation", hint: "Time = total volume ÷ rate per minute." },
      { level: 2, description: "Set up the division", hint: "12 ÷ 1.5 = ?" },
      { level: 3, description: "Clear the decimal to divide", hint: "Multiply both numbers by 10: 120 ÷ 15." }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d16",
    order: 16,
    cluster: "TIME",
    clusterName: CLUSTER_NAMES.TIME,
    tier: "H",
    skillId: "MEASTIME-04",
    question: "A journey starts at 22:15 and ends at 06:45 the next day. How long is the journey?",
    options: [
        { text: "8 h 30 min", correct: true, feedback: "To midnight: 1 h 45 min; from midnight: 6 h 45 min; total = 8 h 30 min." },
        { text: "8 h 45 min", correct: false, feedback: "You miscalculated the minutes.", misconceptionId: "E-d16-a" },
        { text: "9 h 30 min", correct: false, feedback: "Incorrect.", misconceptionId: "E-d16-b" },
        { text: "7 h 30 min", correct: false, feedback: "Off by an hour.", misconceptionId: "E-d16-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-d16-a",
        description: "Student miscounts the minutes in one of the two bridging segments, landing 15 minutes above the correct total.",
        rootCause: "Midnight-Bridging Error — miscalculates one of the two segments (before or after midnight).",
        remediation: "Break the journey into two parts: 22:15 to midnight (1 h 45 min) and midnight to 06:45 (6 h 45 min) — add both parts carefully."
      },
      {
        misconceptionId: "E-d16-b",
        description: "Student overcounts the total, perhaps by miscounting the pre-midnight segment.",
        rootCause: "Midnight-Bridging Error — a larger miscalculation in one of the two segments.",
        remediation: "From 22:15 to midnight (24:00) is 1 h 45 min (22→23→24, minus the 15 min already past 22:00) — recheck this segment."
      },
      {
        misconceptionId: "E-d16-c",
        description: "Student undercounts the total by 1 hour, perhaps missing part of the pre-midnight segment.",
        rootCause: "Midnight-Bridging Error — a different miscalculation, undercounting by a full hour.",
        remediation: "After bridging through midnight, add BOTH segments: 1 h 45 min + 6 h 45 min = 8 h 30 min (45+45=90 minutes, which carries 1 extra hour)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Bridge to midnight", hint: "From 22:15 to 24:00 (midnight) is how many hours and minutes?" },
      { level: 2, description: "Count from midnight to arrival", hint: "From 00:00 to 06:45 is how many hours and minutes?" },
      { level: 3, description: "Add both parts", hint: "1 h 45 min + 6 h 45 min = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d17",
    order: 17,
    cluster: "MONEY",
    clusterName: CLUSTER_NAMES.MONEY,
    tier: "C",
    skillId: "MEASMONEY-04",
    question: "Find the simple interest on ₹1500 at 6% per annum for 2 years.",
    options: [
        { text: "₹180", correct: true, feedback: "SI = 1500 × 6 × 2 / 100 = 180." },
        { text: "₹90", correct: false, feedback: "Only 1 year.", misconceptionId: "E-d17-a" },
        { text: "₹360", correct: false, feedback: "4 years or rate 12%.", misconceptionId: "E-d17-b" },
        { text: "₹150", correct: false, feedback: "Incorrect.", misconceptionId: "E-d17-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-d17-a",
        description: "Student computes the interest for only 1 year, forgetting to multiply by the stated Time of 2 years.",
        rootCause: "Time Factor Omitted — drops the Time (T) variable from the Simple Interest formula.",
        remediation: "The formula is P × R × T / 100 — Time (2 years) is a required factor, not optional: 1500 × 6 × 2 / 100 = 180."
      },
      {
        misconceptionId: "E-d17-b",
        description: "Student doubles the correct interest, perhaps by using 4 years or a doubled rate instead of the stated values.",
        rootCause: "Rate or Time Value Doubled — uses a doubled version of the given rate or time.",
        remediation: "Use the EXACT values given: rate=6%, time=2 years — 1500 × 6 × 2 / 100 = 180, not doubled to 360."
      },
      {
        misconceptionId: "E-d17-c",
        description: "Student makes a computational error somewhere in the three-factor multiplication or final division, landing on 150 instead of 180.",
        rootCause: "Formula Computation Error — a miscalculation in applying the Simple Interest formula.",
        remediation: "Work through the formula step by step: 1500 × 6 = 9000, then × 2 = 18000, then ÷ 100 = 180 — recheck each multiplication."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the formula", hint: "Simple Interest = Principal × Rate × Time / 100." },
      { level: 2, description: "Substitute the values", hint: "1500 × 6 × 2 / 100." },
      { level: 3, description: "Compute step by step", hint: "1500 × 6 × 2 = 18000. Now divide by 100." }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d18",
    order: 18,
    cluster: "PAV",
    clusterName: CLUSTER_NAMES.PAV,
    tier: "C",
    skillId: "MEASPAV-05",
    question: "The area of a rectangle is 48 cm² and its length is 8 cm. Find its perimeter.",
    options: [
        { text: "28 cm", correct: true, feedback: "Breadth = 48 ÷ 8 = 6 cm. Perimeter = 2 × (8+6) = 28 cm." },
        { text: "14 cm", correct: false, feedback: "That's half the perimeter.", misconceptionId: "E-d18-a" },
        { text: "48 cm", correct: false, feedback: "That's the area.", misconceptionId: "E-d18-b" },
        { text: "24 cm", correct: false, feedback: "Incorrect.", misconceptionId: "E-d18-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-d18-a",
        description: "Student correctly finds the breadth and adds length+breadth (8+6=14) but forgets to double the sum for the perimeter.",
        rootCause: "Missing-Doubling Step — stops after adding length and breadth once, forgetting the rectangle has TWO of each.",
        remediation: "A rectangle has two lengths and two breadths — after adding length + breadth once (14), multiply that sum by 2: 2 × 14 = 28."
      },
      {
        misconceptionId: "E-d18-b",
        description: "Student reports the given area (48) directly as if it were the perimeter, without computing the breadth or applying the perimeter formula.",
        rootCause: "Wrong Value Reported — confuses the given area with the requested perimeter.",
        remediation: "Area and perimeter are different measurements — you must first find the breadth (48÷8=6), then compute perimeter = 2×(8+6), not just restate the area."
      },
      {
        misconceptionId: "E-d18-c",
        description: "Student makes an error finding the breadth or applying the perimeter formula, landing on 24 instead of 28.",
        rootCause: "Multi-Step Computation Error — a miscalculation in the breadth-finding or perimeter step.",
        remediation: "Work through each step: breadth = 48÷8=6, perimeter = 2×(8+6)=2×14=28 — recheck each calculation."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the breadth", hint: "Breadth = Area ÷ length = 48 ÷ 8." },
      { level: 2, description: "Add length and breadth", hint: "8 + 6 = ?" },
      { level: 3, description: "Double the sum", hint: "2 × 14 = ?" }
    ],
    forwardRiskLinks: [
      { targetSkillId: "MEASPAV-01", probability: 0.3, condition: "Deriving a missing dimension from area before computing perimeter recurs whenever only partial shape information is given." }
    ],
    learningObjectives: ["CCSS.MATH.CONTENT.5.MD.C.5"]
  },
  {
    itemId: "d19",
    order: 19,
    cluster: "LENGTH",
    clusterName: CLUSTER_NAMES.LENGTH,
    tier: "H",
    skillId: "MEASPAV-01",
    question: "A rectangular field is 120 m by 80 m. Find the cost of fencing it at ₹15 per metre.",
    options: [
        { text: "₹6000", correct: true, feedback: "Perimeter = 2×(120+80)=400 m. Cost = 400 × 15 = ₹6000." },
        { text: "₹9600", correct: false, feedback: "You used area (120×80=9600) instead of perimeter.", misconceptionId: "E-d19-a" },
        { text: "₹4000", correct: false, feedback: "Incorrect perimeter cost.", misconceptionId: "E-d19-b" },
        { text: "₹1800", correct: false, feedback: "Incorrect.", misconceptionId: "E-d19-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-d19-a",
        description: "Student uses the area instead of the perimeter to compute fencing cost, since fencing wraps AROUND a field, not the space inside.",
        rootCause: "Fencing-Perimeter Confusion — doesn't recognise that fencing cost relates to the boundary (perimeter), not the space inside (area).",
        remediation: "Fencing surrounds the boundary of the field — always use PERIMETER (not area) when computing fencing cost: cost = perimeter × rate per metre."
      },
      {
        misconceptionId: "E-d19-b",
        description: "Student computes the correct perimeter but makes an error in the final multiplication by the rate, landing on ₹4000.",
        rootCause: "Cost Multiplication Error — a computational slip multiplying the perimeter by the rate.",
        remediation: "Recompute: perimeter=400 m, cost=400×15=6000 — recheck this multiplication."
      },
      {
        misconceptionId: "E-d19-c",
        description: "Student uses an incorrect perimeter value (perhaps only length+breadth without doubling) before multiplying by the rate.",
        rootCause: "Missing-Doubling Step — forgets to double (length+breadth) when finding the perimeter.",
        remediation: "Perimeter = 2 × (length + breadth) = 2 × 200 = 400 m — don't forget the doubling before multiplying by the rate."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the perimeter", hint: "2 × (120 + 80) = ?" },
      { level: 2, description: "Identify the operation", hint: "Multiply the perimeter by the cost per metre." },
      { level: 3, description: "Compute", hint: "400 × 15 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.MD.C.5"]
  },
  {
    itemId: "d20",
    order: 20,
    cluster: "MASS",
    clusterName: CLUSTER_NAMES.MASS,
    tier: "H",
    skillId: "MEASMASS-06",
    question: "2 kg of sugar at ₹40/kg is mixed with 3 kg of sugar at ₹60/kg. The mixture is sold at ₹55/kg. Find the profit per kg.",
    options: [
        { text: "₹3", correct: true, feedback: "Total CP = 2×40 + 3×60 = 260. Total kg = 5. CP/kg = 52. SP/kg = 55. Profit/kg = 3." },
        { text: "₹5", correct: false, feedback: "Incorrect calculation of average CP.", misconceptionId: "E-d20-a" },
        { text: "₹2", correct: false, feedback: "Incorrect.", misconceptionId: "E-d20-b" },
        { text: "₹8", correct: false, feedback: "Incorrect.", misconceptionId: "E-d20-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-d20-a",
        description: "Student miscalculates the weighted average cost price per kg, perhaps by simply averaging the two given prices (40+60)/2=50 instead of weighting by quantity.",
        rootCause: "Simple Average Instead of Weighted Average — averages the two prices directly without accounting for the different quantities (2 kg vs 3 kg).",
        remediation: "Since the quantities differ (2 kg vs 3 kg), you must find the WEIGHTED average: total cost ÷ total kg = (2×40+3×60)/5 = 52, not the simple average of 40 and 60."
      },
      {
        misconceptionId: "E-d20-b",
        description: "Student makes a computational error in finding the weighted average or the final profit, landing on ₹2 instead of ₹3.",
        rootCause: "Multi-Step Computation Error — a miscalculation somewhere in the weighted-average or subtraction step.",
        remediation: "Work through each step: total CP=2×40+3×60=260, CP/kg=260÷5=52, profit/kg=55-52=3 — recheck each calculation."
      },
      {
        misconceptionId: "E-d20-c",
        description: "Student makes a different computational error, landing on ₹8 instead of ₹3.",
        rootCause: "Multi-Step Computation Error — a different miscalculation in the weighted-average or subtraction step.",
        remediation: "Verify the weighted average carefully: (2×40+3×60)=(80+180)=260, then 260÷5=52 — the CP per kg is 52, and profit is 55-52=3."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the total cost", hint: "2×40 + 3×60 = ?" },
      { level: 2, description: "Find the cost price per kg", hint: "Total cost ÷ total kg (5) = ?" },
      { level: 3, description: "Find the profit per kg", hint: "Selling price per kg (55) − cost price per kg = ?" }
    ],
    forwardRiskLinks: [
      { targetSkillId: "MEASMONEY-02", probability: 0.35, condition: "Confusing simple average with weighted average recurs whenever quantities at different rates are mixed together." }
    ],
    learningObjectives: []
  }
];

const recheckItems = [
  {
    itemId: "r1",
    order: 1,
    cluster: "LENGTH",
    clusterName: CLUSTER_NAMES.LENGTH,
    skillId: "MEASLEN-02",
    question: "4 km 250 m = ? m",
    options: [
        { text: "4250 m", correct: true, feedback: "4 km = 4000 m, + 250 m = 4250 m." },
        { text: "425 m", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r1-a" },
        { text: "40025 m", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r1-b" },
        { text: "42500 m", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r1-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r1-a",
        description: "Student divides the correct total by 10, undershooting by a factor of 10.",
        rootCause: "Extraneous Division Step — applies an unnecessary division after correctly combining km and m.",
        remediation: "Once 4 km is converted to 4000 m and added to 250 m, no further division is needed — 4000+250=4250 directly."
      },
      {
        misconceptionId: "E-r1-b",
        description: "Student places the 250 m in the wrong column, writing 40025 instead of 4250.",
        rootCause: "Column Shift Error — misaligns the metres component when combining with the km-derived value.",
        remediation: "4000 + 250 means adding to the HUNDREDS column: 4000 has hundreds digit 0, and 250 fills it in as 4250, not a different column."
      },
      {
        misconceptionId: "E-r1-c",
        description: "Student multiplies the correct total by 10, overshooting by a factor of 10.",
        rootCause: "Extraneous Multiplication Step — applies an unnecessary multiplication after correctly combining km and m.",
        remediation: "Once 4 km is converted to 4000 m and added to 250 m, no further multiplication is needed — 4000+250=4250 directly."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Convert the km part", hint: "4 km = 4000 m." },
      { level: 2, description: "Add the m part", hint: "4000 + 250 = ?" },
      { level: 3, description: "Check place value", hint: "250 fills the hundreds column, not another column." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.MD.A.1"]
  },
  {
    itemId: "r2",
    order: 2,
    cluster: "MASS",
    clusterName: CLUSTER_NAMES.MASS,
    skillId: "MEASMASS-03",
    question: "3.2 kg = ? g",
    options: [
        { text: "3200 g", correct: true, feedback: "3.2 × 1000 = 3200 g." },
        { text: "320 g", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r2-a" },
        { text: "32000 g", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r2-b" },
        { text: "32 g", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r2-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r2-a",
        description: "Student multiplies 3.2 by 100 instead of 1000, undershooting by a factor of 10.",
        rootCause: "Power-of-Ten Shift Miscount — applies a two-zero shift instead of the correct three-zero shift.",
        remediation: "Count the zeros in 1000 (three zeros) — 3.2 × 1000 = 3200, shifting the decimal three places right."
      },
      {
        misconceptionId: "E-r2-b",
        description: "Student multiplies 3.2 by 10000, overshooting by a factor of 10.",
        rootCause: "Power-of-Ten Shift Miscount — adds an extra zero beyond the correct three-zero shift.",
        remediation: "Recount the zeros in 1000 — there are exactly three, so 3.2 kg becomes 3200 g, not 32000 g."
      },
      {
        misconceptionId: "E-r2-c",
        description: "Student multiplies 3.2 by 10 instead of 1000, undershooting drastically.",
        rootCause: "Conversion Factor Confusion — mixes up the kg-to-g factor with a much smaller conversion factor.",
        remediation: "Memorise the exact fact: 1 kg = 1000 g — 3.2 × 1000 = 3200."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the conversion fact", hint: "1 kg = 1000 g." },
      { level: 2, description: "Set up the multiplication", hint: "3.2 × 1000 = ?" },
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
    skillId: "MEASCAP-03",
    question: "A 2 l bottle has 1 l 600 ml of water. How much more water is needed to fill it completely?",
    options: [
        { text: "400 ml", correct: true, feedback: "2 l = 2000 ml. 2000 − 1600 = 400 ml." },
        { text: "600 ml", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r3-a" },
        { text: "1.4 l", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r3-b" },
        { text: "1400 ml", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r3-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r3-a",
        description: "Student reports the current fractional/hundred component (600) directly instead of computing the actual amount still needed.",
        rootCause: "Wrong Value Reported — confuses a component of the current amount with the amount still needed.",
        remediation: "The question asks how much MORE is needed, which is the CAPACITY minus the CURRENT amount — 2000 ml - 1600 ml = 400 ml, not just the 600 from the ml digits."
      },
      {
        misconceptionId: "E-r3-b",
        description: "Student subtracts only the whole-litre parts (2-1=1... adjusted incorrectly) instead of properly borrowing, landing on 1.4 l.",
        rootCause: "Mixed-Unit Subtraction Borrowing Error — doesn't correctly borrow across the l/ml boundary.",
        remediation: "Convert fully to ml first: 2 l = 2000 ml, 1 l 600 ml = 1600 ml. Subtract 2000 - 1600 = 400 ml, then convert back if needed — this avoids borrowing mistakes."
      },
      {
        misconceptionId: "E-r3-c",
        description: "Student makes a computational error in the subtraction, landing 1000 ml above the correct answer.",
        rootCause: "Mixed-Unit Subtraction Error — a larger computational slip when subtracting 1600 ml from 2000 ml.",
        remediation: "Recompute carefully: 2000 ml - 1600 ml = 400 ml — verify by adding 400 back to 1600 to see if it returns 2000."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Convert to a single unit", hint: "2 l = 2000 ml. 1 l 600 ml = 1600 ml." },
      { level: 2, description: "Subtract", hint: "2000 - 1600 = ?" },
      { level: 3, description: "Check", hint: "Does 400 ml make sense as a small remaining gap to fill?" }
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
    question: "Convert 8:45 PM to the 24‑hour clock.",
    options: [
        { text: "20:45", correct: true, feedback: "8 + 12 = 20, so 20:45." },
        { text: "8:45", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r4-a" },
        { text: "18:45", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r4-b" },
        { text: "21:45", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r4-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r4-a",
        description: "Student leaves the time unchanged in 12-hour format, not applying the +12 conversion at all.",
        rootCause: "Conversion Step Omitted — doesn't perform the required addition to convert to 24-hour format.",
        remediation: "24-hour format requires adding 12 to any PM hour after noon: 8 PM becomes 8+12=20, written as 20:45."
      },
      {
        misconceptionId: "E-r4-b",
        description: "Student adds 10 instead of 12, landing on the 24-hour equivalent of 6:45 PM instead of 8:45 PM.",
        rootCause: "Addition Constant Error — uses the wrong number to add when converting to 24-hour time.",
        remediation: "The conversion rule is always +12 for PM hours — 8 + 12 = 20, not 8 + 10 = 18."
      },
      {
        misconceptionId: "E-r4-c",
        description: "Student adds 13 instead of 12, landing on the 24-hour equivalent of 9:45 PM instead of 8:45 PM.",
        rootCause: "Addition Constant Error — a different miscalculation of the +12 conversion constant.",
        remediation: "Double-check the addition: 8 + 12 = 20 exactly — recount to make sure you're adding 12, not 13."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the rule", hint: "For PM times after noon, add 12 to the hour." },
      { level: 2, description: "Apply it", hint: "8 + 12 = ?" },
      { level: 3, description: "Write the full time", hint: "Keep the minutes the same: 20:45." }
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
    question: "Cost Price = ₹800, Loss = ₹160. Find the loss percentage.",
    options: [
        { text: "20%", correct: true, feedback: "(160/800)×100 = 20%." },
        { text: "16%", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r5-a" },
        { text: "25%", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r5-b" },
        { text: "15%", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r5-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r5-a",
        description: "Student misreads or misapplies the loss value, perhaps confusing the digits of 160 to get 16%.",
        rootCause: "Percentage Computation Error — a miscalculation dividing the loss by the cost price.",
        remediation: "Recompute carefully: (160 ÷ 800) × 100 — first divide 160 by 800 (=0.2), then multiply by 100 to get 20%, not 16%."
      },
      {
        misconceptionId: "E-r5-b",
        description: "Student computes an incorrect percentage, perhaps dividing by a wrong base value, landing on 25%.",
        rootCause: "Wrong Percentage Base — uses an incorrect denominator instead of the actual Cost Price (800).",
        remediation: "Loss percentage is always calculated relative to the COST PRICE (800), not any other value — (160÷800)×100=20%."
      },
      {
        misconceptionId: "E-r5-c",
        description: "Student makes a smaller computational error, landing on 15% instead of 20%.",
        rootCause: "Percentage Computation Error — a smaller miscalculation in the division or multiplication step.",
        remediation: "Recheck: 160 ÷ 800 = 0.2, and 0.2 × 100 = 20% — verify each step of this calculation."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the formula", hint: "Loss % = (Loss ÷ Cost Price) × 100." },
      { level: 2, description: "Substitute the values", hint: "(160 ÷ 800) × 100." },
      { level: 3, description: "Compute", hint: "160 ÷ 800 = 0.2. Now multiply by 100." }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "r6",
    order: 6,
    cluster: "PAV",
    clusterName: CLUSTER_NAMES.PAV,
    skillId: "MEASPAV-02",
    question: "Area of a square with side 9 cm.",
    options: [
        { text: "81 cm²", correct: true, feedback: "9 × 9 = 81 cm²." },
        { text: "36 cm", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r6-a" },
        { text: "18 cm²", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r6-b" },
        { text: "81 cm", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r6-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r6-a",
        description: "Student computes the perimeter (4 × side = 36) instead of the area (side × side).",
        rootCause: "Perimeter/Area Formula Confusion — applies the addition-based perimeter formula when the multiplication-based area formula was needed.",
        remediation: "Area measures the space INSIDE a shape using multiplication (side×side); perimeter measures the distance AROUND using 4×side — check which the question asks for."
      },
      {
        misconceptionId: "E-r6-b",
        description: "Student adds the side to itself (9+9=18) instead of multiplying it by itself.",
        rootCause: "Multiplication/Addition Confusion — uses addition instead of multiplication when squaring a value.",
        remediation: "Area of a square is side MULTIPLIED BY ITSELF (9×9=81), not side added to itself (9+9=18)."
      },
      {
        misconceptionId: "E-r6-c",
        description: "Student computes the correct numeric value (81) but omits the required square units (cm²).",
        rootCause: "Missing Square Units — forgets that area is always measured in SQUARE units, not linear units.",
        remediation: "Area is always expressed in square units (cm², m², etc.) because it measures a two-dimensional space — always append the ² to the unit."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the formula", hint: "Area of square = side × side." },
      { level: 2, description: "Multiply", hint: "9 × 9 = ?" },
      { level: 3, description: "Add the units", hint: "Area is measured in square units: cm²." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.MD.C.5"]
  },
  {
    itemId: "r7",
    order: 7,
    cluster: "LENGTH",
    clusterName: CLUSTER_NAMES.LENGTH,
    skillId: "MEASLEN-05",
    question: "How many full pieces of 0.5 m can be cut from a 6 m ribbon?",
    options: [
        { text: "12", correct: true, feedback: "6 ÷ 0.5 = 12." },
        { text: "10", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r7-a" },
        { text: "3", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r7-b" },
        { text: "30", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r7-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r7-a",
        description: "Student makes a computational error in the division, landing on 10 instead of 12.",
        rootCause: "Division Computation Error — miscalculates 6 ÷ 0.5.",
        remediation: "Recompute: 6 ÷ 0.5 — think of it as 60 ÷ 5 (multiply both by 10), which gives 12."
      },
      {
        misconceptionId: "E-r7-b",
        description: "Student multiplies instead of dividing, computing 6 × 0.5 = 3.",
        rootCause: "Operation Selection Error — multiplies instead of dividing to find how many pieces fit.",
        remediation: "To find how many pieces of a given length fit into a total length, DIVIDE the total by the piece length: 6 ÷ 0.5, not 6 × 0.5."
      },
      {
        misconceptionId: "E-r7-c",
        description: "Student overestimates significantly, perhaps confusing the divisor with a much smaller value.",
        rootCause: "Decimal Divisor Magnitude Confusion — doesn't correctly account for dividing by a decimal less than 1.",
        remediation: "Dividing by 0.5 (half) doubles the dividend — 6 ÷ 0.5 = 12, not 30, since 0.5 fits into 6 exactly 12 times."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Set up the division", hint: "6 ÷ 0.5 = ?" },
      { level: 2, description: "Clear the decimal", hint: "Multiply both numbers by 10: 60 ÷ 5." },
      { level: 3, description: "Divide", hint: "60 ÷ 5 = ?" }
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
    question: "8 packets each weigh 750 g. What is the total mass in kg?",
    options: [
        { text: "6 kg", correct: true, feedback: "8 × 750 = 6000 g = 6 kg." },
        { text: "60 kg", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r8-a" },
        { text: "6000 g", correct: false, feedback: "Question asks for kg.", misconceptionId: "E-r8-b" },
        { text: "0.6 kg", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r8-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r8-a",
        description: "Student correctly finds 6000 g but converts to kg using a factor of 100 instead of 1000, overshooting by a factor of 10.",
        rootCause: "Power-of-Ten Shift Miscount — applies a two-zero shift instead of the correct three-zero shift.",
        remediation: "Count the zeros in 1000 (three zeros) — 6000 g ÷ 1000 = 6 kg, not 60 kg."
      },
      {
        misconceptionId: "E-r8-b",
        description: "Student correctly computes the total mass in grams (6000 g) but doesn't convert it to kg as the question requests.",
        rootCause: "Unit Conversion Omitted — doesn't convert the final answer to the unit requested by the question.",
        remediation: "The question explicitly asks for the total 'in kg' — convert 6000 g ÷ 1000 = 6 kg before answering."
      },
      {
        misconceptionId: "E-r8-c",
        description: "Student converts 6000 g to kg using a factor of 10000 instead of 1000, undershooting by a factor of 10.",
        rootCause: "Power-of-Ten Shift Miscount — applies a four-zero shift instead of the correct three-zero shift.",
        remediation: "Recount the zeros in 1000 — there are exactly three, so 6000 g ÷ 1000 = 6 kg, not 0.6 kg."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the total mass in grams", hint: "8 × 750 = ?" },
      { level: 2, description: "Convert to kg", hint: "Divide the grams total by 1000." },
      { level: 3, description: "Shift the decimal", hint: "6000 ÷ 1000 moves the decimal three places left." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.MD.A.1"]
  },
  {
    itemId: "r9",
    order: 9,
    cluster: "TIME",
    clusterName: CLUSTER_NAMES.TIME,
    skillId: "MEASTIME-05",
    question: "A film ends at 3:40 PM and lasts 2 h 15 min. What time did it start?",
    options: [
        { text: "1:25 PM", correct: true, feedback: "3:40 − 2 h = 1:40; − 15 min = 1:25 PM." },
        { text: "1:35 PM", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r9-a" },
        { text: "5:55 PM", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r9-b" },
        { text: "1:15 PM", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r9-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r9-a",
        description: "Student subtracts only 5 minutes instead of the stated 15 minutes at the final step.",
        rootCause: "Value Misread — substitutes a different number of minutes than what the question states.",
        remediation: "Re-check the duration stated: 2 h 15 min — after subtracting the 2 hours (1:40), subtract the full 15 minutes, not 5."
      },
      {
        misconceptionId: "E-r9-b",
        description: "Student adds the duration to the end time instead of subtracting, moving forward instead of backward to find the start time.",
        rootCause: "Operation Direction Confusion — adds when finding a START time (working backwards) requires subtraction.",
        remediation: "To find when something STARTED given its END time and duration, SUBTRACT the duration from the end time, don't add it."
      },
      {
        misconceptionId: "E-r9-c",
        description: "Student subtracts only 25 minutes total instead of the full 2 h 15 min, or makes an error mishandling the borrow across the hour.",
        rootCause: "Mixed-Unit Subtraction Borrowing Error — mishandles regrouping when subtracting 15 minutes from a time whose minute value (40) is less than 15... actually needs care in the other direction.",
        remediation: "Subtract in two steps: first the whole 2 hours (3:40→1:40), THEN the 15 minutes (1:40→1:25) — check each step separately."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Subtract the whole hours first", hint: "3:40 PM - 2 hours = 1:40 PM." },
      { level: 2, description: "Subtract the remaining minutes", hint: "1:40 PM - 15 minutes = ?" },
      { level: 3, description: "Check by adding back", hint: "Does your start time + 2 h 15 min return 3:40 PM?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "r10",
    order: 10,
    cluster: "MONEY",
    clusterName: CLUSTER_NAMES.MONEY,
    skillId: "MEASMONEY-04",
    question: "Simple interest on ₹2000 at 5% per annum for 3 years.",
    options: [
        { text: "₹300", correct: true, feedback: "2000 × 5 × 3 / 100 = 300." },
        { text: "₹200", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r10-a" },
        { text: "₹150", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r10-b" },
        { text: "₹1000", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r10-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r10-a",
        description: "Student computes the interest for a shorter time period or makes a computational error, landing on ₹200 instead of ₹300.",
        rootCause: "Formula Computation Error — a miscalculation in applying the Simple Interest formula.",
        remediation: "Work through the formula step by step: 2000 × 5 = 10000, then × 3 = 30000, then ÷ 100 = 300 — recheck each multiplication."
      },
      {
        misconceptionId: "E-r10-b",
        description: "Student makes a different computational error, landing on ₹150 instead of ₹300.",
        rootCause: "Formula Computation Error — a different miscalculation in the multiplication chain.",
        remediation: "Recompute carefully: 2000 × 5 × 3 = 30000, then divide by 100: 30000 ÷ 100 = 300."
      },
      {
        misconceptionId: "E-r10-c",
        description: "Student forgets to divide by 100 at the end, or divides by the wrong number, landing on ₹1000.",
        rootCause: "Formula Step Omitted — drops the ÷100 step that converts a percentage rate into its decimal effect.",
        remediation: "The Simple Interest formula ends with ÷100 because the rate is a PERCENTAGE — always divide by 100 as the final step: 30000 ÷ 100 = 300."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the formula", hint: "Simple Interest = Principal × Rate × Time / 100." },
      { level: 2, description: "Substitute the values", hint: "2000 × 5 × 3 / 100." },
      { level: 3, description: "Compute step by step", hint: "2000 × 5 × 3 = 30000. Now divide by 100." }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
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
    title: "Measurement — Speed & Strategy",
    subtitle: "Telangana & Cambridge · Level 4 · Speed & Strategy",
    description: "A 25-minute timed diagnostic mixing Speed, Core, Challenge and Trap items across every measurement cluster.",
    clusterNames: CLUSTER_NAMES,
    gateReviewHTML: "",
    timedSeconds: 1500
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

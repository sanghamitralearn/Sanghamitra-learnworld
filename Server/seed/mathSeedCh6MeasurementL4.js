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
    question: "3.5 km = ? m",
    options: [
        { text: "3500 m", correct: true, feedback: "1 km = 1000 m, so 3.5 × 1000 = 3500 m." },
        { text: "350 m", correct: false, feedback: "You multiplied by 100 instead of 1000." },
        { text: "35000 m", correct: false, feedback: "You multiplied by 10000." },
        { text: "35 m", correct: false, feedback: "You multiplied by 10." }
      ]
  },
  {
    itemId: "w2",
    order: 2,
    cluster: "MASS",
    clusterName: CLUSTER_NAMES.MASS,
    question: "4 kg 200 g = ? g",
    options: [
        { text: "4200 g", correct: true, feedback: "4 kg = 4000 g, plus 200 g = 4200 g." },
        { text: "420 g", correct: false, feedback: "You only used 4.2 kg incorrectly." },
        { text: "40200 g", correct: false, feedback: "You misplaced the digits." },
        { text: "4002 g", correct: false, feedback: "You misaligned the grams." }
      ]
  },
  {
    itemId: "w3",
    order: 3,
    cluster: "CAP",
    clusterName: CLUSTER_NAMES.CAP,
    question: "2.5 l = ? ml",
    options: [
        { text: "2500 ml", correct: true, feedback: "1 l = 1000 ml, so 2.5 × 1000 = 2500 ml." },
        { text: "250 ml", correct: false, feedback: "You multiplied by 100." },
        { text: "25000 ml", correct: false, feedback: "You multiplied by 10000." },
        { text: "25 ml", correct: false, feedback: "You multiplied by 10." }
      ]
  },
  {
    itemId: "w4",
    order: 4,
    cluster: "TIME",
    clusterName: CLUSTER_NAMES.TIME,
    question: "90 minutes = ? hours",
    options: [
        { text: "1.5 h", correct: true, feedback: "90 ÷ 60 = 1.5 hours." },
        { text: "1.3 h", correct: false, feedback: "You divided 90 by 100? Not correct." },
        { text: "1.9 h", correct: false, feedback: "Incorrect." },
        { text: "0.9 h", correct: false, feedback: "You divided by 100?" }
      ]
  },
  {
    itemId: "w5",
    order: 5,
    cluster: "MONEY",
    clusterName: CLUSTER_NAMES.MONEY,
    question: "Cost Price = ₹300, Selling Price = ₹360. Find the profit.",
    options: [
        { text: "₹60", correct: true, feedback: "Profit = 360 − 300 = ₹60." },
        { text: "₹660", correct: false, feedback: "You added instead of subtracting." },
        { text: "₹300", correct: false, feedback: "That's the Cost Price." },
        { text: "₹360", correct: false, feedback: "That's the Selling Price." }
      ]
  },
  {
    itemId: "w6",
    order: 6,
    cluster: "PAV",
    clusterName: CLUSTER_NAMES.PAV,
    question: "Area of a square with side 7 cm.",
    options: [
        { text: "49 cm²", correct: true, feedback: "Area = side × side = 7 × 7 = 49 cm²." },
        { text: "28 cm", correct: false, feedback: "That's the perimeter (4 × 7)." },
        { text: "14 cm²", correct: false, feedback: "You added instead of multiplied." },
        { text: "49 cm", correct: false, feedback: "Missing square units." }
      ]
  },
  {
    itemId: "w7",
    order: 7,
    cluster: "LENGTH",
    clusterName: CLUSTER_NAMES.LENGTH,
    question: "5 m − 2 m 50 cm = ?",
    options: [
        { text: "2 m 50 cm", correct: true, feedback: "5 m = 500 cm, minus 250 cm = 250 cm = 2 m 50 cm." },
        { text: "3 m 50 cm", correct: false, feedback: "You added instead of subtracting." },
        { text: "2 m", correct: false, feedback: "You only subtracted the metres." },
        { text: "2 m 5 cm", correct: false, feedback: "Incorrect subtraction." }
      ]
  },
  {
    itemId: "w8",
    order: 8,
    cluster: "MASS",
    clusterName: CLUSTER_NAMES.MASS,
    question: "1 kg = ? g",
    options: [
        { text: "1000 g", correct: true, feedback: "1 kilogram = 1000 grams." },
        { text: "100 g", correct: false, feedback: "That would be 1 hectogram? Not correct." },
        { text: "10 g", correct: false, feedback: "Incorrect." },
        { text: "10000 g", correct: false, feedback: "Too many zeros." }
      ]
  }
];

const diagnosticItems = [
  {
    itemId: "d1",
    order: 1,
    cluster: "LENGTH",
    clusterName: CLUSTER_NAMES.LENGTH,
    tier: "S",
    question: "Convert 6 km 50 m to metres.",
    options: [
        { text: "6050 m", correct: true, feedback: "6 km = 6000 m, + 50 m = 6050 m." },
        { text: "650 m", correct: false, feedback: "You multiplied 6.5 by 100? Not correct." },
        { text: "60050 m", correct: false, feedback: "Misplaced digits." },
        { text: "6500 m", correct: false, feedback: "You forgot the 50 m." }
      ]
  },
  {
    itemId: "d2",
    order: 2,
    cluster: "MASS",
    clusterName: CLUSTER_NAMES.MASS,
    tier: "S",
    question: "How many grams are there in 2.5 kg?",
    options: [
        { text: "2500 g", correct: true, feedback: "2.5 × 1000 = 2500 g." },
        { text: "250 g", correct: false, feedback: "You multiplied by 100." },
        { text: "25000 g", correct: false, feedback: "You multiplied by 10000." },
        { text: "2.5 g", correct: false, feedback: "No conversion." }
      ]
  },
  {
    itemId: "d3",
    order: 3,
    cluster: "CAP",
    clusterName: CLUSTER_NAMES.CAP,
    tier: "S",
    question: "3 l 200 ml = ? ml",
    options: [
        { text: "3200 ml", correct: true, feedback: "3 l = 3000 ml, + 200 ml = 3200 ml." },
        { text: "320 ml", correct: false, feedback: "You divided by 10." },
        { text: "32000 ml", correct: false, feedback: "You multiplied by 10." },
        { text: "3020 ml", correct: false, feedback: "Misplaced digits." }
      ]
  },
  {
    itemId: "d4",
    order: 4,
    cluster: "TIME",
    clusterName: CLUSTER_NAMES.TIME,
    tier: "S",
    question: "Convert 4:30 PM to the 24‑hour clock.",
    options: [
        { text: "16:30", correct: true, feedback: "4 + 12 = 16, so 16:30." },
        { text: "4:30", correct: false, feedback: "That's 12‑hour format." },
        { text: "14:30", correct: false, feedback: "That's 2:30 PM." },
        { text: "17:30", correct: false, feedback: "That's 5:30 PM." }
      ]
  },
  {
    itemId: "d5",
    order: 5,
    cluster: "MONEY",
    clusterName: CLUSTER_NAMES.MONEY,
    tier: "T",
    question: "Cost Price = ₹500, Selling Price = ₹450. Find the loss percentage.",
    options: [
        { text: "10%", correct: true, feedback: "Loss = ₹50. Loss% = (50/500)×100 = 10%." },
        { text: "11.1%", correct: false, feedback: "You divided loss by SP (50/450 ≈ 11.1%)." },
        { text: "20%", correct: false, feedback: "Incorrect calculation." },
        { text: "5%", correct: false, feedback: "Incorrect." }
      ]
  },
  {
    itemId: "d6",
    order: 6,
    cluster: "PAV",
    clusterName: CLUSTER_NAMES.PAV,
    tier: "T",
    question: "Find the perimeter of a rectangle with length 15 cm and breadth 10 cm.",
    options: [
        { text: "50 cm", correct: true, feedback: "Perimeter = 2 × (15 + 10) = 50 cm." },
        { text: "150 cm", correct: false, feedback: "That's the area (15 × 10)." },
        { text: "30 cm", correct: false, feedback: "You added length and breadth and forgot to double." },
        { text: "25 cm", correct: false, feedback: "Incorrect." }
      ]
  },
  {
    itemId: "d7",
    order: 7,
    cluster: "LENGTH",
    clusterName: CLUSTER_NAMES.LENGTH,
    tier: "C",
    question: "How many full pieces of 1.25 m each can be cut from an 8 m rope?",
    options: [
        { text: "6", correct: true, feedback: "8 ÷ 1.25 = 6.4, so 6 full pieces." },
        { text: "7", correct: false, feedback: "You rounded up, but you can't get a 7th full piece." },
        { text: "10", correct: false, feedback: "Incorrect division." },
        { text: "5", correct: false, feedback: "Incorrect." }
      ]
  },
  {
    itemId: "d8",
    order: 8,
    cluster: "MASS",
    clusterName: CLUSTER_NAMES.MASS,
    tier: "C",
    question: "5 bags each weigh 2.4 kg. What is the total mass in grams?",
    options: [
        { text: "12000 g", correct: true, feedback: "5 × 2.4 = 12 kg = 12000 g." },
        { text: "1200 g", correct: false, feedback: "You divided by 10." },
        { text: "2400 g", correct: false, feedback: "Only one bag." },
        { text: "120 g", correct: false, feedback: "Incorrect." }
      ]
  },
  {
    itemId: "d9",
    order: 9,
    cluster: "CAP",
    clusterName: CLUSTER_NAMES.CAP,
    tier: "T",
    question: "A 5 l can contains 3 l 750 ml of oil. How much more oil is needed to fill it completely?",
    options: [
        { text: "1 l 250 ml", correct: true, feedback: "5 l = 5000 ml; 3750 ml; difference = 1250 ml = 1 l 250 ml." },
        { text: "2 l 250 ml", correct: false, feedback: "You subtracted 5 − 3 = 2 l but miscalculated ml." },
        { text: "1 l 750 ml", correct: false, feedback: "You used 3.75? No." },
        { text: "1 l 150 ml", correct: false, feedback: "Incorrect." }
      ]
  },
  {
    itemId: "d10",
    order: 10,
    cluster: "TIME",
    clusterName: CLUSTER_NAMES.TIME,
    tier: "C",
    question: "A train starts at 7:45 AM and travels for 3 h 20 min. What time does it arrive?",
    options: [
        { text: "11:05 AM", correct: true, feedback: "7:45 + 3 h = 10:45; + 20 min = 11:05 AM." },
        { text: "11:15 AM", correct: false, feedback: "You added 30 min instead of 20." },
        { text: "10:65 AM", correct: false, feedback: "65 min is not a valid time." },
        { text: "11:05 PM", correct: false, feedback: "Wrong AM/PM." }
      ]
  },
  {
    itemId: "d11",
    order: 11,
    cluster: "MONEY",
    clusterName: CLUSTER_NAMES.MONEY,
    tier: "H",
    question: "The selling price of an item is ₹720 after a loss of 10%. What was its cost price?",
    options: [
        { text: "₹800", correct: true, feedback: "SP = 90% of CP → CP = 720 ÷ 0.9 = ₹800." },
        { text: "₹792", correct: false, feedback: "You added 10% of 720 (720 + 72 = 792)." },
        { text: "₹648", correct: false, feedback: "You subtracted 10% of 720 (720 − 72)." },
        { text: "₹880", correct: false, feedback: "Incorrect." }
      ]
  },
  {
    itemId: "d12",
    order: 12,
    cluster: "PAV",
    clusterName: CLUSTER_NAMES.PAV,
    tier: "H",
    question: "The volume of a cube is 125 cm³. Find its surface area.",
    options: [
        { text: "150 cm²", correct: true, feedback: "Side = ∛125 = 5 cm. Surface area = 6 × 5² = 150 cm²." },
        { text: "125 cm²", correct: false, feedback: "That's the volume." },
        { text: "25 cm²", correct: false, feedback: "That's the area of one face." },
        { text: "30 cm²", correct: false, feedback: "That's the perimeter of one face? No." }
      ]
  },
  {
    itemId: "d13",
    order: 13,
    cluster: "LENGTH",
    clusterName: CLUSTER_NAMES.LENGTH,
    tier: "T",
    question: "Convert 0.045 km to cm.",
    options: [
        { text: "4500 cm", correct: true, feedback: "0.045 km = 45 m = 4500 cm." },
        { text: "450 cm", correct: false, feedback: "You multiplied 45 by 10? No." },
        { text: "45 cm", correct: false, feedback: "You only converted to metres." },
        { text: "4.5 cm", correct: false, feedback: "You divided by 10 again." }
      ]
  },
  {
    itemId: "d14",
    order: 14,
    cluster: "MASS",
    clusterName: CLUSTER_NAMES.MASS,
    tier: "T",
    question: "A packet weighs 2 kg 50 g. What is its weight in kg?",
    options: [
        { text: "2.05 kg", correct: true, feedback: "50 g = 0.05 kg, so 2.05 kg." },
        { text: "2.5 kg", correct: false, feedback: "You used 50 g as 0.5 kg." },
        { text: "2.005 kg", correct: false, feedback: "You used 50 g as 0.005 kg." },
        { text: "2.50 kg", correct: false, feedback: "You wrote 2.5 kg incorrectly." }
      ]
  },
  {
    itemId: "d15",
    order: 15,
    cluster: "CAP",
    clusterName: CLUSTER_NAMES.CAP,
    tier: "H",
    question: "A 12 l tank is filled by a pipe that delivers 1.5 l per minute. How many minutes will it take to fill the tank from empty?",
    options: [
        { text: "8 min", correct: true, feedback: "12 ÷ 1.5 = 8 minutes." },
        { text: "6 min", correct: false, feedback: "You used 2 l per minute." },
        { text: "10 min", correct: false, feedback: "Incorrect." },
        { text: "18 min", correct: false, feedback: "You multiplied 12 × 1.5." }
      ]
  },
  {
    itemId: "d16",
    order: 16,
    cluster: "TIME",
    clusterName: CLUSTER_NAMES.TIME,
    tier: "H",
    question: "A journey starts at 22:15 and ends at 06:45 the next day. How long is the journey?",
    options: [
        { text: "8 h 30 min", correct: true, feedback: "To midnight: 1 h 45 min; from midnight: 6 h 45 min; total = 8 h 30 min." },
        { text: "8 h 45 min", correct: false, feedback: "You miscalculated the minutes." },
        { text: "9 h 30 min", correct: false, feedback: "Incorrect." },
        { text: "7 h 30 min", correct: false, feedback: "Off by an hour." }
      ]
  },
  {
    itemId: "d17",
    order: 17,
    cluster: "MONEY",
    clusterName: CLUSTER_NAMES.MONEY,
    tier: "C",
    question: "Find the simple interest on ₹1500 at 6% per annum for 2 years.",
    options: [
        { text: "₹180", correct: true, feedback: "SI = 1500 × 6 × 2 / 100 = 180." },
        { text: "₹90", correct: false, feedback: "Only 1 year." },
        { text: "₹360", correct: false, feedback: "4 years or rate 12%." },
        { text: "₹150", correct: false, feedback: "Incorrect." }
      ]
  },
  {
    itemId: "d18",
    order: 18,
    cluster: "PAV",
    clusterName: CLUSTER_NAMES.PAV,
    tier: "C",
    question: "The area of a rectangle is 48 cm² and its length is 8 cm. Find its perimeter.",
    options: [
        { text: "28 cm", correct: true, feedback: "Breadth = 48 ÷ 8 = 6 cm. Perimeter = 2 × (8+6) = 28 cm." },
        { text: "14 cm", correct: false, feedback: "That's half the perimeter." },
        { text: "48 cm", correct: false, feedback: "That's the area." },
        { text: "24 cm", correct: false, feedback: "Incorrect." }
      ]
  },
  {
    itemId: "d19",
    order: 19,
    cluster: "LENGTH",
    clusterName: CLUSTER_NAMES.LENGTH,
    tier: "H",
    question: "A rectangular field is 120 m by 80 m. Find the cost of fencing it at ₹15 per metre.",
    options: [
        { text: "₹6000", correct: true, feedback: "Perimeter = 2×(120+80)=400 m. Cost = 400 × 15 = ₹6000." },
        { text: "₹9600", correct: false, feedback: "You used area (120×80=9600) instead of perimeter." },
        { text: "₹4000", correct: false, feedback: "Incorrect perimeter cost." },
        { text: "₹1800", correct: false, feedback: "Incorrect." }
      ]
  },
  {
    itemId: "d20",
    order: 20,
    cluster: "MASS",
    clusterName: CLUSTER_NAMES.MASS,
    tier: "H",
    question: "2 kg of sugar at ₹40/kg is mixed with 3 kg of sugar at ₹60/kg. The mixture is sold at ₹55/kg. Find the profit per kg.",
    options: [
        { text: "₹3", correct: true, feedback: "Total CP = 2×40 + 3×60 = 260. Total kg = 5. CP/kg = 52. SP/kg = 55. Profit/kg = 3." },
        { text: "₹5", correct: false, feedback: "Incorrect calculation of average CP." },
        { text: "₹2", correct: false, feedback: "Incorrect." },
        { text: "₹8", correct: false, feedback: "Incorrect." }
      ]
  }
];

const recheckItems = [
  {
    itemId: "r1",
    order: 1,
    cluster: "LENGTH",
    clusterName: CLUSTER_NAMES.LENGTH,
    question: "4 km 250 m = ? m",
    options: [
        { text: "4250 m", correct: true, feedback: "4 km = 4000 m, + 250 m = 4250 m." },
        { text: "425 m", correct: false, feedback: "Not correct — try the next one." },
        { text: "40025 m", correct: false, feedback: "Not correct — try the next one." },
        { text: "42500 m", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r2",
    order: 2,
    cluster: "MASS",
    clusterName: CLUSTER_NAMES.MASS,
    question: "3.2 kg = ? g",
    options: [
        { text: "3200 g", correct: true, feedback: "3.2 × 1000 = 3200 g." },
        { text: "320 g", correct: false, feedback: "Not correct — try the next one." },
        { text: "32000 g", correct: false, feedback: "Not correct — try the next one." },
        { text: "32 g", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r3",
    order: 3,
    cluster: "CAP",
    clusterName: CLUSTER_NAMES.CAP,
    question: "A 2 l bottle has 1 l 600 ml of water. How much more water is needed to fill it completely?",
    options: [
        { text: "400 ml", correct: true, feedback: "2 l = 2000 ml. 2000 − 1600 = 400 ml." },
        { text: "600 ml", correct: false, feedback: "Not correct — try the next one." },
        { text: "1.4 l", correct: false, feedback: "Not correct — try the next one." },
        { text: "1400 ml", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r4",
    order: 4,
    cluster: "TIME",
    clusterName: CLUSTER_NAMES.TIME,
    question: "Convert 8:45 PM to the 24‑hour clock.",
    options: [
        { text: "20:45", correct: true, feedback: "8 + 12 = 20, so 20:45." },
        { text: "8:45", correct: false, feedback: "Not correct — try the next one." },
        { text: "18:45", correct: false, feedback: "Not correct — try the next one." },
        { text: "21:45", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r5",
    order: 5,
    cluster: "MONEY",
    clusterName: CLUSTER_NAMES.MONEY,
    question: "Cost Price = ₹800, Loss = ₹160. Find the loss percentage.",
    options: [
        { text: "20%", correct: true, feedback: "(160/800)×100 = 20%." },
        { text: "16%", correct: false, feedback: "Not correct — try the next one." },
        { text: "25%", correct: false, feedback: "Not correct — try the next one." },
        { text: "15%", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r6",
    order: 6,
    cluster: "PAV",
    clusterName: CLUSTER_NAMES.PAV,
    question: "Area of a square with side 9 cm.",
    options: [
        { text: "81 cm²", correct: true, feedback: "9 × 9 = 81 cm²." },
        { text: "36 cm", correct: false, feedback: "Not correct — try the next one." },
        { text: "18 cm²", correct: false, feedback: "Not correct — try the next one." },
        { text: "81 cm", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r7",
    order: 7,
    cluster: "LENGTH",
    clusterName: CLUSTER_NAMES.LENGTH,
    question: "How many full pieces of 0.5 m can be cut from a 6 m ribbon?",
    options: [
        { text: "12", correct: true, feedback: "6 ÷ 0.5 = 12." },
        { text: "10", correct: false, feedback: "Not correct — try the next one." },
        { text: "3", correct: false, feedback: "Not correct — try the next one." },
        { text: "30", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r8",
    order: 8,
    cluster: "MASS",
    clusterName: CLUSTER_NAMES.MASS,
    question: "8 packets each weigh 750 g. What is the total mass in kg?",
    options: [
        { text: "6 kg", correct: true, feedback: "8 × 750 = 6000 g = 6 kg." },
        { text: "60 kg", correct: false, feedback: "Not correct — try the next one." },
        { text: "6000 g", correct: false, feedback: "Question asks for kg." },
        { text: "0.6 kg", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r9",
    order: 9,
    cluster: "TIME",
    clusterName: CLUSTER_NAMES.TIME,
    question: "A film ends at 3:40 PM and lasts 2 h 15 min. What time did it start?",
    options: [
        { text: "1:25 PM", correct: true, feedback: "3:40 − 2 h = 1:40; − 15 min = 1:25 PM." },
        { text: "1:35 PM", correct: false, feedback: "Not correct — try the next one." },
        { text: "5:55 PM", correct: false, feedback: "Not correct — try the next one." },
        { text: "1:15 PM", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r10",
    order: 10,
    cluster: "MONEY",
    clusterName: CLUSTER_NAMES.MONEY,
    question: "Simple interest on ₹2000 at 5% per annum for 3 years.",
    options: [
        { text: "₹300", correct: true, feedback: "2000 × 5 × 3 / 100 = 300." },
        { text: "₹200", correct: false, feedback: "Not correct — try the next one." },
        { text: "₹150", correct: false, feedback: "Not correct — try the next one." },
        { text: "₹1000", correct: false, feedback: "Not correct — try the next one." }
      ]
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

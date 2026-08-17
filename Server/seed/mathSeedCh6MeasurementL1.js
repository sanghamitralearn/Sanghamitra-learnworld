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
    question: "Convert 5 km to metres.",
    options: [
        { text: "5000 m", correct: true, feedback: "1 km = 1000 m, so 5 × 1000 = 5000 m." },
        { text: "500 m", correct: false, feedback: "You multiplied by 100 instead of 1000." },
        { text: "50 m", correct: false, feedback: "You multiplied by 10." },
        { text: "50000 m", correct: false, feedback: "You multiplied by 10000." }
      ],
    retryHint: "1 km = 1000 m. Multiply the number of kilometres by 1000."
  },
  {
    itemId: "w2",
    order: 2,
    cluster: "MASS",
    clusterName: CLUSTER_NAMES.MASS,
    question: "Convert 3 kg to grams.",
    options: [
        { text: "3000 g", correct: true, feedback: "1 kg = 1000 g, so 3 × 1000 = 3000 g." },
        { text: "300 g", correct: false, feedback: "You multiplied by 100." },
        { text: "30 g", correct: false, feedback: "You multiplied by 10." },
        { text: "30000 g", correct: false, feedback: "You multiplied by 10000." }
      ],
    retryHint: "1 kg = 1000 g. Multiply by 1000."
  },
  {
    itemId: "w3",
    order: 3,
    cluster: "CAP",
    clusterName: CLUSTER_NAMES.CAP,
    question: "Convert 2.5 litres to millilitres.",
    options: [
        { text: "2500 ml", correct: true, feedback: "1 l = 1000 ml, so 2.5 × 1000 = 2500 ml." },
        { text: "250 ml", correct: false, feedback: "You multiplied by 100." },
        { text: "25 ml", correct: false, feedback: "You multiplied by 10." },
        { text: "25000 ml", correct: false, feedback: "You multiplied by 10000." }
      ],
    retryHint: "1 litre = 1000 ml. Multiply by 1000."
  },
  {
    itemId: "w4",
    order: 4,
    cluster: "TIME",
    clusterName: CLUSTER_NAMES.TIME,
    question: "How many minutes are there in 2 hours?",
    options: [
        { text: "120 min", correct: true, feedback: "1 hour = 60 min, so 2 × 60 = 120 min." },
        { text: "60 min", correct: false, feedback: "That's only 1 hour." },
        { text: "180 min", correct: false, feedback: "That's 3 hours." },
        { text: "200 min", correct: false, feedback: "Incorrect multiplication." }
      ],
    retryHint: "Multiply the number of hours by 60."
  },
  {
    itemId: "w5",
    order: 5,
    cluster: "MONEY",
    clusterName: CLUSTER_NAMES.MONEY,
    question: "₹50.50 + ₹25.25 = ?",
    options: [
        { text: "₹75.75", correct: true, feedback: "50.50 + 25.25 = 75.75." },
        { text: "₹75.00", correct: false, feedback: "You ignored the paise." },
        { text: "₹75.80", correct: false, feedback: "Incorrect addition of paise." },
        { text: "₹75.50", correct: false, feedback: "Incorrect." }
      ],
    retryHint: "Add rupees and paise separately. 100 paise = ₹1."
  },
  {
    itemId: "w6",
    order: 6,
    cluster: "PAV",
    clusterName: CLUSTER_NAMES.PAV,
    question: "Find the perimeter of a rectangle with length 8 cm and breadth 5 cm.",
    options: [
        { text: "26 cm", correct: true, feedback: "Perimeter = 2 × (8+5) = 2 × 13 = 26 cm." },
        { text: "40 cm", correct: false, feedback: "That's the area (8×5)." },
        { text: "13 cm", correct: false, feedback: "That's half the perimeter." },
        { text: "20 cm", correct: false, feedback: "Incorrect." }
      ],
    retryHint: "Perimeter = 2 × (length + breadth)."
  },
  {
    itemId: "w7",
    order: 7,
    cluster: "MASS",
    clusterName: CLUSTER_NAMES.MASS,
    question: "Subtract 2 kg 500 g from 5 kg.",
    options: [
        { text: "2 kg 500 g", correct: true, feedback: "5 kg = 5000 g; minus 2500 g = 2500 g = 2 kg 500 g." },
        { text: "3 kg 500 g", correct: false, feedback: "You added instead of subtracting." },
        { text: "2 kg", correct: false, feedback: "You forgot the grams." },
        { text: "2 kg 250 g", correct: false, feedback: "Incorrect subtraction." }
      ],
    retryHint: "Convert both to grams or kilograms, then subtract."
  },
  {
    itemId: "w8",
    order: 8,
    cluster: "CAP",
    clusterName: CLUSTER_NAMES.CAP,
    question: "A bottle holds 750 ml. How many ml are there in 4 such bottles?",
    options: [
        { text: "3000 ml", correct: true, feedback: "750 × 4 = 3000 ml." },
        { text: "300 ml", correct: false, feedback: "You divided instead of multiplying." },
        { text: "30000 ml", correct: false, feedback: "Extra zero." },
        { text: "754 ml", correct: false, feedback: "You added instead of multiplying." }
      ],
    retryHint: "Multiply the capacity of one bottle by the number of bottles."
  }
];

const diagnosticItems = [
  {
    itemId: "d1",
    order: 1,
    cluster: "LENGTH",
    clusterName: CLUSTER_NAMES.LENGTH,
    question: "Add: 3 km 250 m + 1 km 750 m",
    options: [
        { text: "5 km", correct: true, feedback: "250 m + 750 m = 1000 m = 1 km. 3 km + 1 km + 1 km = 5 km." },
        { text: "4 km", correct: false, feedback: "You forgot to add the extra 1 km from the metres sum." },
        { text: "5.1 km", correct: false, feedback: "Carry error in the metres." },
        { text: "5.01 km", correct: false, feedback: "Incorrect decimal placement." }
      ],
    backward: "Convert to the same unit or add metres and km separately; 250 m + 750 m = 1000 m = 1 km.",
    forward: "Adding lengths is used in measuring distances and perimeters."
  },
  {
    itemId: "d2",
    order: 2,
    cluster: "MASS",
    clusterName: CLUSTER_NAMES.MASS,
    question: "Convert 4500 g to kg.",
    options: [
        { text: "4.5 kg", correct: true, feedback: "Divide by 1000: 4500 ÷ 1000 = 4.5 kg." },
        { text: "45 kg", correct: false, feedback: "You divided by 100." },
        { text: "0.45 kg", correct: false, feedback: "You divided by 10000." },
        { text: "450 kg", correct: false, feedback: "You multiplied by 100." }
      ],
    backward: "1 kg = 1000 g, so divide grams by 1000.",
    forward: "Converting between units is essential in science and cooking."
  },
  {
    itemId: "d3",
    order: 3,
    cluster: "CAP",
    clusterName: CLUSTER_NAMES.CAP,
    question: "A jug has 1.5 l of water. 300 ml is poured out. How much is left?",
    options: [
        { text: "1.2 l", correct: true, feedback: "1.5 l = 1500 ml. 1500 − 300 = 1200 ml = 1.2 l." },
        { text: "1.2 ml", correct: false, feedback: "Wrong unit; 1200 ml is 1.2 l, not 1.2 ml." },
        { text: "1.8 l", correct: false, feedback: "You added instead of subtracting." },
        { text: "1.5 l", correct: false, feedback: "You didn't subtract." }
      ],
    backward: "Convert both to the same unit (litres or ml), then subtract.",
    forward: "Subtracting capacities is used in measuring remaining liquid."
  },
  {
    itemId: "d4",
    order: 4,
    cluster: "TIME",
    clusterName: CLUSTER_NAMES.TIME,
    question: "Write 3:15 PM in the 24‑hour clock.",
    options: [
        { text: "15:15", correct: true, feedback: "For PM times after 12 noon, add 12: 3 + 12 = 15 → 15:15." },
        { text: "3:15", correct: false, feedback: "That's 12‑hour format." },
        { text: "13:15", correct: false, feedback: "That's 1:15 PM." },
        { text: "14:15", correct: false, feedback: "That's 2:15 PM." }
      ],
    backward: "For PM times after 12 noon, add 12 to the hour.",
    forward: "24‑hour clock is used in timetables and transport."
  },
  {
    itemId: "d5",
    order: 5,
    cluster: "MONEY",
    clusterName: CLUSTER_NAMES.MONEY,
    question: "Find the profit: Cost Price = ₹200, Selling Price = ₹250.",
    options: [
        { text: "₹50", correct: true, feedback: "Profit = SP − CP = 250 − 200 = ₹50." },
        { text: "₹450", correct: false, feedback: "You added SP + CP." },
        { text: "₹150", correct: false, feedback: "Incorrect subtraction." },
        { text: "₹250", correct: false, feedback: "That's the Selling Price." }
      ],
    backward: "Profit = Selling Price − Cost Price.",
    forward: "Profit and loss are used in business and everyday shopping."
  },
  {
    itemId: "d6",
    order: 6,
    cluster: "PAV",
    clusterName: CLUSTER_NAMES.PAV,
    question: "Find the area of a rectangle with length 12 cm and breadth 5 cm.",
    options: [
        { text: "60 cm²", correct: true, feedback: "Area = length × breadth = 12 × 5 = 60 cm²." },
        { text: "34 cm", correct: false, feedback: "That's the perimeter (2×(12+5))." },
        { text: "60 cm", correct: false, feedback: "Missing square units (should be cm²)." },
        { text: "30 cm²", correct: false, feedback: "You divided by 2." }
      ],
    backward: "Area of rectangle = length × breadth.",
    forward: "Area is used in flooring, painting, and land measurement."
  },
  {
    itemId: "d7",
    order: 7,
    cluster: "LENGTH",
    clusterName: CLUSTER_NAMES.LENGTH,
    question: "Convert 2.5 m to cm.",
    options: [
        { text: "250 cm", correct: true, feedback: "1 m = 100 cm, so 2.5 × 100 = 250 cm." },
        { text: "25 cm", correct: false, feedback: "You multiplied by 10." },
        { text: "2500 cm", correct: false, feedback: "You multiplied by 1000." },
        { text: "0.25 cm", correct: false, feedback: "You divided." }
      ],
    backward: "1 m = 100 cm, multiply by 100.",
    forward: "Metric conversions are fundamental in measurement."
  },
  {
    itemId: "d8",
    order: 8,
    cluster: "MASS",
    clusterName: CLUSTER_NAMES.MASS,
    question: "3 packets each weigh 250 g. Find the total mass in kg.",
    options: [
        { text: "0.75 kg", correct: true, feedback: "3 × 250 = 750 g. 750 ÷ 1000 = 0.75 kg." },
        { text: "750 kg", correct: false, feedback: "You didn't convert grams to kilograms." },
        { text: "7.5 kg", correct: false, feedback: "Decimal point misplaced (multiplied by 10?)." },
        { text: "0.075 kg", correct: false, feedback: "Incorrect division by 10000." }
      ],
    backward: "First find total grams (3×250=750 g), then convert to kg.",
    forward: "Combining multiplication and unit conversion."
  },
  {
    itemId: "d9",
    order: 9,
    cluster: "CAP",
    clusterName: CLUSTER_NAMES.CAP,
    question: "1 litre = ? millilitres",
    options: [
        { text: "1000 ml", correct: true, feedback: "The prefix 'milli' means one‑thousandth. 1 l = 1000 ml." },
        { text: "10 ml", correct: false, feedback: "That's centilitres." },
        { text: "100 ml", correct: false, feedback: "Incorrect; 1 l = 1000 ml." },
        { text: "10000 ml", correct: false, feedback: "Too large." }
      ],
    backward: "The prefix 'milli' means one‑thousandth.",
    forward: "Basic unit conversion fact."
  },
  {
    itemId: "d10",
    order: 10,
    cluster: "TIME",
    clusterName: CLUSTER_NAMES.TIME,
    question: "A movie starts at 10:00 AM and lasts 2 hours 30 minutes. What time does it end?",
    options: [
        { text: "12:30 PM", correct: true, feedback: "10:00 + 2 h = 12:00 noon; + 30 min = 12:30 PM." },
        { text: "12:00 PM", correct: false, feedback: "You forgot the 30 minutes." },
        { text: "1:00 PM", correct: false, feedback: "Added 3 hours." },
        { text: "12:30 AM", correct: false, feedback: "Wrong AM/PM." }
      ],
    backward: "Add hours first, then minutes.",
    forward: "Calculating end times is an everyday skill."
  },
  {
    itemId: "d11",
    order: 11,
    cluster: "MONEY",
    clusterName: CLUSTER_NAMES.MONEY,
    question: "Simple interest on ₹500 at 5% per year for 1 year.",
    options: [
        { text: "₹25", correct: true, feedback: "SI = 500 × 5 × 1 / 100 = ₹25." },
        { text: "₹250", correct: false, feedback: "You didn't divide by 100." },
        { text: "₹50", correct: false, feedback: "You used 10%." },
        { text: "₹500", correct: false, feedback: "That's the principal, not the interest." }
      ],
    backward: "Simple Interest = Principal × Rate × Time / 100.",
    forward: "Interest calculations are used in banking."
  },
  {
    itemId: "d12",
    order: 12,
    cluster: "PAV",
    clusterName: CLUSTER_NAMES.PAV,
    question: "Find the perimeter of a square with side 9 cm.",
    options: [
        { text: "36 cm", correct: true, feedback: "Perimeter of square = 4 × side = 4 × 9 = 36 cm." },
        { text: "18 cm", correct: false, feedback: "You multiplied by 2." },
        { text: "81 cm", correct: false, feedback: "That's the area (9×9)." },
        { text: "36 cm²", correct: false, feedback: "Perimeter uses cm, not cm²." }
      ],
    backward: "Perimeter of square = 4 × side.",
    forward: "Perimeter is used in fencing and framing."
  },
  {
    itemId: "d13",
    order: 13,
    cluster: "LENGTH",
    clusterName: CLUSTER_NAMES.LENGTH,
    question: "Which is longer? 1500 m or 1.2 km",
    options: [
        { text: "1500 m", correct: true, feedback: "1500 m = 1.5 km. 1.5 km > 1.2 km." },
        { text: "1.2 km", correct: false, feedback: "1.2 km = 1200 m, which is less." },
        { text: "They are equal", correct: false, feedback: "1500 m = 1.5 km ≠ 1.2 km." },
        { text: "Cannot compare", correct: false, feedback: "Convert to the same unit to compare." }
      ],
    backward: "Convert both to the same unit before comparing.",
    forward: "Comparison of measurements is common in sports and construction."
  },
  {
    itemId: "d14",
    order: 14,
    cluster: "MASS",
    clusterName: CLUSTER_NAMES.MASS,
    question: "Subtract 1 kg 200 g from 3 kg.",
    options: [
        { text: "1 kg 800 g", correct: true, feedback: "3 kg = 3000 g; minus 1200 g = 1800 g = 1 kg 800 g." },
        { text: "2 kg 200 g", correct: false, feedback: "You subtracted incorrectly." },
        { text: "2 kg 800 g", correct: false, feedback: "You added instead." },
        { text: "1 kg 200 g", correct: false, feedback: "That's the amount you subtracted." }
      ],
    backward: "3 kg = 3000 g; subtract 1200 g = 1800 g = 1 kg 800 g.",
    forward: "Subtracting mixed units appears in recipes and parcels."
  },
  {
    itemId: "d15",
    order: 15,
    cluster: "CAP",
    clusterName: CLUSTER_NAMES.CAP,
    question: "A tank holds 5000 ml. How many litres is that?",
    options: [
        { text: "5 l", correct: true, feedback: "5000 ÷ 1000 = 5 litres." },
        { text: "0.5 l", correct: false, feedback: "You divided by 10000." },
        { text: "50 l", correct: false, feedback: "You divided by 100." },
        { text: "500 l", correct: false, feedback: "You divided by 10." }
      ],
    backward: "Divide by 1000 to convert ml to l.",
    forward: "Large capacities are usually expressed in litres."
  },
  {
    itemId: "d16",
    order: 16,
    cluster: "TIME",
    clusterName: CLUSTER_NAMES.TIME,
    question: "How many days are there in February 2024? (2024 is a leap year.)",
    options: [
        { text: "29", correct: true, feedback: "A leap year is divisible by 4; February has 29 days." },
        { text: "28", correct: false, feedback: "That's a non‑leap year." },
        { text: "30", correct: false, feedback: "February never has 30 days." },
        { text: "31", correct: false, feedback: "February never has 31 days." }
      ],
    backward: "A leap year is divisible by 4; February has 29 days.",
    forward: "Calendar knowledge is used in planning and scheduling."
  },
  {
    itemId: "d17",
    order: 17,
    cluster: "MONEY",
    clusterName: CLUSTER_NAMES.MONEY,
    question: "What is the cost of 5 pens if each pen costs ₹12?",
    options: [
        { text: "₹60", correct: true, feedback: "5 × 12 = ₹60." },
        { text: "₹17", correct: false, feedback: "You added 5 + 12." },
        { text: "₹48", correct: false, feedback: "You calculated 4 × 12." },
        { text: "₹6", correct: false, feedback: "You divided 12 by 2." }
      ],
    backward: "Total cost = number × cost per item.",
    forward: "Multiplication of money is a daily life skill."
  },
  {
    itemId: "d18",
    order: 18,
    cluster: "PAV",
    clusterName: CLUSTER_NAMES.PAV,
    question: "Find the volume of a cube with side 3 cm.",
    options: [
        { text: "27 cm³", correct: true, feedback: "Volume of cube = side × side × side = 3 × 3 × 3 = 27 cm³." },
        { text: "9 cm³", correct: false, feedback: "That's the area of one face." },
        { text: "12 cm", correct: false, feedback: "That's the perimeter of one face." },
        { text: "27 cm", correct: false, feedback: "Missing the cube units (should be cm³)." }
      ],
    backward: "Volume of cube = side × side × side.",
    forward: "Volume is used in packing and capacity."
  },
  {
    itemId: "d19",
    order: 19,
    cluster: "LENGTH",
    clusterName: CLUSTER_NAMES.LENGTH,
    question: "Convert 750 mm to cm.",
    options: [
        { text: "75 cm", correct: true, feedback: "10 mm = 1 cm, so 750 ÷ 10 = 75 cm." },
        { text: "7.5 cm", correct: false, feedback: "You divided by 100." },
        { text: "750 cm", correct: false, feedback: "You multiplied by 10." },
        { text: "0.75 cm", correct: false, feedback: "You divided by 1000." }
      ],
    backward: "10 mm = 1 cm, so divide by 10.",
    forward: "Small‑scale conversions are common in crafts."
  },
  {
    itemId: "d20",
    order: 20,
    cluster: "MASS",
    clusterName: CLUSTER_NAMES.MASS,
    question: "Which is heavier? 2 kg or 1500 g",
    options: [
        { text: "2 kg", correct: true, feedback: "2 kg = 2000 g > 1500 g." },
        { text: "1500 g", correct: false, feedback: "1500 g = 1.5 kg, which is lighter." },
        { text: "They are equal", correct: false, feedback: "2000 g ≠ 1500 g." },
        { text: "Cannot compare", correct: false, feedback: "Convert both to the same unit." }
      ],
    backward: "Convert both to the same unit to compare.",
    forward: "Weight comparison is used in shopping and postage."
  },
  {
    itemId: "d21",
    order: 21,
    cluster: "CAP",
    clusterName: CLUSTER_NAMES.CAP,
    question: "Add 250 ml + 750 ml. Express the answer in litres.",
    options: [
        { text: "1 l", correct: true, feedback: "250 + 750 = 1000 ml = 1 l." },
        { text: "1000 l", correct: false, feedback: "You kept the unit as litres instead of converting ml to l." },
        { text: "10 l", correct: false, feedback: "Incorrect conversion factor." },
        { text: "0.1 l", correct: false, feedback: "Incorrect decimal placement." }
      ],
    backward: "1000 ml = 1 l.",
    forward: "Totalling small capacities to make a litre."
  },
  {
    itemId: "d22",
    order: 22,
    cluster: "TIME",
    clusterName: CLUSTER_NAMES.TIME,
    question: "How much time passes from 5:45 PM to 6:15 PM?",
    options: [
        { text: "30 minutes", correct: true, feedback: "From 5:45 to 6:00 is 15 min; to 6:15 is another 15 min. Total 30 min." },
        { text: "45 minutes", correct: false, feedback: "You mis‑calculated." },
        { text: "1 hour", correct: false, feedback: "That's too long." },
        { text: "15 minutes", correct: false, feedback: "Only counted to 6:00." }
      ],
    backward: "From 5:45 to 6:00 is 15 min; plus another 15 min to 6:15 → 30 min.",
    forward: "Calculating short intervals is useful for scheduling."
  },
  {
    itemId: "d23",
    order: 23,
    cluster: "MONEY",
    clusterName: CLUSTER_NAMES.MONEY,
    question: "Selling Price = ₹800, Loss = ₹50. Find the Cost Price.",
    options: [
        { text: "₹850", correct: true, feedback: "Cost Price = Selling Price + Loss = 800 + 50 = ₹850." },
        { text: "₹750", correct: false, feedback: "You subtracted Loss from SP (used profit formula)." },
        { text: "₹800", correct: false, feedback: "That's just the Selling Price." },
        { text: "₹50", correct: false, feedback: "That's the Loss." }
      ],
    backward: "Cost Price = Selling Price + Loss.",
    forward: "Understanding loss helps in managing finances."
  },
  {
    itemId: "d24",
    order: 24,
    cluster: "PAV",
    clusterName: CLUSTER_NAMES.PAV,
    question: "Find the area of a square with side 10 m.",
    options: [
        { text: "100 m²", correct: true, feedback: "Area = side × side = 10 × 10 = 100 m²." },
        { text: "40 m", correct: false, feedback: "That's the perimeter." },
        { text: "20 m", correct: false, feedback: "That's 2 × side." },
        { text: "100 m", correct: false, feedback: "Missing square units (should be m²)." }
      ],
    backward: "Area of square = side × side.",
    forward: "Large area units are used in land and floor plans."
  }
];

const recheckItems = [
  {
    itemId: "r1",
    order: 1,
    cluster: "LENGTH",
    clusterName: CLUSTER_NAMES.LENGTH,
    question: "6 km 300 m = ? m",
    options: [
        { text: "6300 m", correct: true, feedback: "6 km = 6000 m; + 300 m = 6300 m." },
        { text: "630 m", correct: false, feedback: "You divided by 10." },
        { text: "63000 m", correct: false, feedback: "You multiplied by 10." },
        { text: "6003 m", correct: false, feedback: "You placed 3 incorrectly." }
      ]
  },
  {
    itemId: "r2",
    order: 2,
    cluster: "MASS",
    clusterName: CLUSTER_NAMES.MASS,
    question: "2 kg = ? g",
    options: [
        { text: "2000 g", correct: true, feedback: "2 × 1000 = 2000 g." },
        { text: "200 g", correct: false, feedback: "Not correct — try the next one." },
        { text: "20000 g", correct: false, feedback: "Not correct — try the next one." },
        { text: "20 g", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r3",
    order: 3,
    cluster: "CAP",
    clusterName: CLUSTER_NAMES.CAP,
    question: "3 l 500 ml = ? ml",
    options: [
        { text: "3500 ml", correct: true, feedback: "3 l = 3000 ml; + 500 ml = 3500 ml." },
        { text: "35 ml", correct: false, feedback: "Not correct — try the next one." },
        { text: "350 ml", correct: false, feedback: "Not correct — try the next one." },
        { text: "35000 ml", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r4",
    order: 4,
    cluster: "TIME",
    clusterName: CLUSTER_NAMES.TIME,
    question: "Convert 14:30 to the 12‑hour clock.",
    options: [
        { text: "2:30 PM", correct: true, feedback: "14 − 12 = 2, so 2:30 PM." },
        { text: "4:30 PM", correct: false, feedback: "Not correct — try the next one." },
        { text: "2:30 AM", correct: false, feedback: "Not correct — try the next one." },
        { text: "14:30 PM", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r5",
    order: 5,
    cluster: "MONEY",
    clusterName: CLUSTER_NAMES.MONEY,
    question: "Cost Price = ₹150, Selling Price = ₹180. Find the profit.",
    options: [
        { text: "₹30", correct: true, feedback: "180 − 150 = ₹30." },
        { text: "₹330", correct: false, feedback: "Not correct — try the next one." },
        { text: "₹130", correct: false, feedback: "Not correct — try the next one." },
        { text: "₹180", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r6",
    order: 6,
    cluster: "PAV",
    clusterName: CLUSTER_NAMES.PAV,
    question: "Perimeter of a rectangle with length 15 cm and breadth 6 cm.",
    options: [
        { text: "42 cm", correct: true, feedback: "2 × (15+6) = 2 × 21 = 42 cm." },
        { text: "21 cm", correct: false, feedback: "Not correct — try the next one." },
        { text: "90 cm", correct: false, feedback: "Not correct — try the next one." },
        { text: "42 cm²", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r7",
    order: 7,
    cluster: "LENGTH",
    clusterName: CLUSTER_NAMES.LENGTH,
    question: "Subtract 2 m 20 cm from 5 m.",
    options: [
        { text: "2 m 80 cm", correct: true, feedback: "5 m = 500 cm; − 220 cm = 280 cm = 2 m 80 cm." },
        { text: "3 m 20 cm", correct: false, feedback: "Incorrect subtraction." },
        { text: "2 m 20 cm", correct: false, feedback: "That's the amount subtracted." },
        { text: "2 m 90 cm", correct: false, feedback: "Off by 10 cm." }
      ]
  },
  {
    itemId: "r8",
    order: 8,
    cluster: "MASS",
    clusterName: CLUSTER_NAMES.MASS,
    question: "500 g × 6 = ? kg",
    options: [
        { text: "3 kg", correct: true, feedback: "500 × 6 = 3000 g = 3 kg." },
        { text: "30 kg", correct: false, feedback: "Not correct — try the next one." },
        { text: "0.3 kg", correct: false, feedback: "Not correct — try the next one." },
        { text: "300 kg", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r9",
    order: 9,
    cluster: "CAP",
    clusterName: CLUSTER_NAMES.CAP,
    question: "2 l − 750 ml = ? ml",
    options: [
        { text: "1250 ml", correct: true, feedback: "2000 − 750 = 1250 ml." },
        { text: "1750 ml", correct: false, feedback: "Not correct — try the next one." },
        { text: "750 ml", correct: false, feedback: "Not correct — try the next one." },
        { text: "125 ml", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r10",
    order: 10,
    cluster: "TIME",
    clusterName: CLUSTER_NAMES.TIME,
    question: "Start 9:15 AM, end 11:45 AM. Find the duration.",
    options: [
        { text: "2 h 30 min", correct: true, feedback: "9:15 to 10:00 = 45 min; to 11:00 = 1 h 45 min; to 11:45 = 2 h 30 min." },
        { text: "2 h", correct: false, feedback: "Not correct — try the next one." },
        { text: "3 h", correct: false, feedback: "Not correct — try the next one." },
        { text: "2 h 15 min", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r11",
    order: 11,
    cluster: "MONEY",
    clusterName: CLUSTER_NAMES.MONEY,
    question: "8 chocolates at ₹25 each. Total cost?",
    options: [
        { text: "₹200", correct: true, feedback: "8 × 25 = 200." },
        { text: "₹33", correct: false, feedback: "Not correct — try the next one." },
        { text: "₹160", correct: false, feedback: "Not correct — try the next one." },
        { text: "₹250", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r12",
    order: 12,
    cluster: "PAV",
    clusterName: CLUSTER_NAMES.PAV,
    question: "Volume of a cuboid 4 cm × 3 cm × 2 cm.",
    options: [
        { text: "24 cm³", correct: true, feedback: "4 × 3 × 2 = 24 cm³." },
        { text: "9 cm³", correct: false, feedback: "Not correct — try the next one." },
        { text: "12 cm³", correct: false, feedback: "Not correct — try the next one." },
        { text: "24 cm", correct: false, feedback: "Not correct — try the next one." }
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

// seed/mathSeedCh6MeasurementL2.js
//
// Populates math_chapters and math_questions with Grade 5, Chapter 6
// (Measurement), Level 2 — converted from the standalone HTML file
// ch-6-measurement-level-2.html.
//
// Run with: node seed/mathSeedCh6MeasurementL2.js

const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-5";
const GRADE_LABEL = "Grade 5";
const CHAPTER_SLUG = "ch-6-measurement";
const CHAPTER_NAME = "Measurement";
const LEVEL = 2;

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
    question: "A rope is 3 m 40 cm long. 1 m 80 cm is cut off. How much is left?",
    options: [
        { text: "1 m 60 cm", correct: true, feedback: "340 cm − 180 cm = 160 cm = 1 m 60 cm." },
        { text: "2 m 20 cm", correct: false, feedback: "You added instead of subtracting." },
        { text: "1 m 40 cm", correct: false, feedback: "You only subtracted the metres correctly but forgot the centimetres." },
        { text: "1 m 80 cm", correct: false, feedback: "That's the amount cut, not remaining." }
      ],
    retryHint: "Convert both to centimetres (340 cm and 180 cm), subtract, then convert back."
  },
  {
    itemId: "w2",
    order: 2,
    cluster: "MASS",
    clusterName: CLUSTER_NAMES.MASS,
    question: "A packet weighs 1 kg 250 g. What is the total weight of 4 such packets?",
    options: [
        { text: "5 kg", correct: true, feedback: "1.25 kg × 4 = 5 kg, or 1250 g × 4 = 5000 g = 5 kg." },
        { text: "5 kg 250 g", correct: false, feedback: "You multiplied the kg by 4 (4 kg) and added the 250 g only once." },
        { text: "4 kg", correct: false, feedback: "You only multiplied the kg part." },
        { text: "5000 g", correct: false, feedback: "That's correct in grams, but the question expects the answer in kg (or both). The answer 5 kg is equivalent; 5000 g is also 5 kg, but we'll use 5 kg as the mixed unit answer." }
      ],
    retryHint: "Convert to grams (1250 g), multiply by 4, then convert back to kg."
  },
  {
    itemId: "w3",
    order: 3,
    cluster: "CAP",
    clusterName: CLUSTER_NAMES.CAP,
    question: "How many 250 ml bottles can be filled from a 2 l jug?",
    options: [
        { text: "8", correct: true, feedback: "2 l = 2000 ml. 2000 ÷ 250 = 8." },
        { text: "4", correct: false, feedback: "You divided by 500 instead of 250." },
        { text: "16", correct: false, feedback: "You doubled the answer." },
        { text: "2", correct: false, feedback: "You divided 2000 by 1000?" }
      ],
    retryHint: "Convert 2 l to 2000 ml, then divide by the bottle capacity."
  },
  {
    itemId: "w4",
    order: 4,
    cluster: "TIME",
    clusterName: CLUSTER_NAMES.TIME,
    question: "A train leaves at 09:45 and arrives at 12:10. How long is the journey?",
    options: [
        { text: "2 h 25 min", correct: true, feedback: "09:45 to 10:00 (15 min), to 12:00 (2 h), to 12:10 (10 min). Total 2 h 25 min." },
        { text: "3 h 25 min", correct: false, feedback: "You added an extra hour." },
        { text: "2 h 35 min", correct: false, feedback: "Miscalculated minutes." },
        { text: "1 h 25 min", correct: false, feedback: "Too short." }
      ],
    retryHint: "Count forward: from 09:45 to 10:00 is 15 min, then from 10:00 to 12:00 is 2 h, then add the extra 10 min."
  },
  {
    itemId: "w5",
    order: 5,
    cluster: "MONEY",
    clusterName: CLUSTER_NAMES.MONEY,
    question: "Cost Price = ₹600, Selling Price = ₹750. Find the profit percentage.",
    options: [
        { text: "25%", correct: true, feedback: "Profit = ₹150. Profit % = (150 / 600) × 100 = 25%." },
        { text: "20%", correct: false, feedback: "You divided profit by Selling Price (150/750 = 20%)." },
        { text: "15%", correct: false, feedback: "Incorrect calculation." },
        { text: "10%", correct: false, feedback: "Incorrect." }
      ],
    retryHint: "First find profit = SP − CP. Then Profit % = (Profit ÷ Cost Price) × 100."
  },
  {
    itemId: "w6",
    order: 6,
    cluster: "PAV",
    clusterName: CLUSTER_NAMES.PAV,
    question: "A rectangular field has length 20 m and breadth 15 m. Find its area and the cost of fencing at ₹10 per metre.",
    options: [
        { text: "Area 300 m², cost ₹700", correct: true, feedback: "Area = 20 × 15 = 300 m². Perimeter = 2 × (20+15) = 70 m. Cost = 70 × 10 = ₹700." },
        { text: "Area 300 m², cost ₹300", correct: false, feedback: "You used the area for fencing cost instead of perimeter." },
        { text: "Perimeter 70 m, cost ₹700 (no area)", correct: false, feedback: "You forgot to state the area." },
        { text: "Area 300 m, cost ₹700", correct: false, feedback: "Area units are incorrect (should be m²)." }
      ],
    retryHint: "First area = length × breadth. Then perimeter = 2 × (length + breadth). Multiply perimeter by cost per metre."
  },
  {
    itemId: "w7",
    order: 7,
    cluster: "LENGTH",
    clusterName: CLUSTER_NAMES.LENGTH,
    question: "Convert 2.5 km to metres, then subtract 300 m.",
    options: [
        { text: "2200 m", correct: true, feedback: "2.5 km = 2500 m. 2500 − 300 = 2200 m." },
        { text: "2500 m", correct: false, feedback: "You forgot to subtract 300 m." },
        { text: "2000 m", correct: false, feedback: "You subtracted 500 m instead of 300 m." },
        { text: "220 m", correct: false, feedback: "Incorrect conversion." }
      ],
    retryHint: "First convert km to m (multiply by 1000), then subtract."
  },
  {
    itemId: "w8",
    order: 8,
    cluster: "CAP",
    clusterName: CLUSTER_NAMES.CAP,
    question: "A tank has 5 l 500 ml water. 2 l 750 ml is used. How much is left?",
    options: [
        { text: "2 l 750 ml", correct: true, feedback: "5500 ml − 2750 ml = 2750 ml = 2 l 750 ml." },
        { text: "3 l 250 ml", correct: false, feedback: "You subtracted incorrectly." },
        { text: "2 l 500 ml", correct: false, feedback: "Off by 250 ml." },
        { text: "2 l 250 ml", correct: false, feedback: "Incorrect subtraction of ml." }
      ],
    retryHint: "Convert both to millilitres (5500 ml and 2750 ml), subtract, then convert back."
  }
];

const diagnosticItems = [
  {
    itemId: "d1",
    order: 1,
    cluster: "LENGTH",
    clusterName: CLUSTER_NAMES.LENGTH,
    question: "A road is 12 km 400 m long. 5 km 800 m is repaired. How much remains to be repaired?",
    options: [
        { text: "6 km 600 m", correct: true, feedback: "12400 m − 5800 m = 6600 m = 6 km 600 m." },
        { text: "6 km 400 m", correct: false, feedback: "You forgot to borrow when subtracting the metres." },
        { text: "7 km 200 m", correct: false, feedback: "You added instead of subtracting." },
        { text: "5 km 600 m", correct: false, feedback: "Incorrect subtraction." }
      ],
    backward: "Convert both to metres, subtract, then convert back.",
    forward: "Real‑life roadwork and measuring use mixed units."
  },
  {
    itemId: "d2",
    order: 2,
    cluster: "MASS",
    clusterName: CLUSTER_NAMES.MASS,
    question: "A shopkeeper has 8 bags of rice, each weighing 2 kg 500 g. What is the total mass in kg?",
    options: [
        { text: "20 kg", correct: true, feedback: "2.5 kg × 8 = 20 kg. Or 2500 g × 8 = 20000 g = 20 kg." },
        { text: "16 kg", correct: false, feedback: "You only multiplied 2 kg by 8, forgot the 500 g." },
        { text: "20 kg 500 g", correct: false, feedback: "You added an extra 500 g." },
        { text: "200 kg", correct: false, feedback: "Decimal error." }
      ],
    backward: "Convert to kg (2.5), multiply, or multiply grams then convert.",
    forward: "Scaling recipes and inventory use this."
  },
  {
    itemId: "d3",
    order: 3,
    cluster: "CAP",
    clusterName: CLUSTER_NAMES.CAP,
    question: "How many 300 ml glasses can be filled from a 2 l 400 ml bottle?",
    options: [
        { text: "8", correct: true, feedback: "2 l 400 ml = 2400 ml. 2400 ÷ 300 = 8." },
        { text: "6", correct: false, feedback: "You used 400 ml only? 400÷300 ≈ 1.3, not 6." },
        { text: "10", correct: false, feedback: "You divided 3000 by 300? The total is 2400, not 3000." },
        { text: "12", correct: false, feedback: "Incorrect conversion." }
      ],
    backward: "Convert total to ml, then divide by capacity per glass.",
    forward: "Catering and party planning use this."
  },
  {
    itemId: "d4",
    order: 4,
    cluster: "TIME",
    clusterName: CLUSTER_NAMES.TIME,
    question: "A meeting starts at 10:15 AM and lasts 1 hour 40 minutes. What time does it end?",
    options: [
        { text: "11:55 AM", correct: true, feedback: "10:15 + 1:00 = 11:15; + 0:40 = 11:55 AM." },
        { text: "11:45 AM", correct: false, feedback: "You added 30 min instead of 40." },
        { text: "12:55 PM", correct: false, feedback: "You added 2 hours instead of 1 h 40 min." },
        { text: "11:55 PM", correct: false, feedback: "Wrong AM/PM." }
      ],
    backward: "Add hours first, then minutes. If minutes ≥60, carry an hour.",
    forward: "Scheduling and daily planning."
  },
  {
    itemId: "d5",
    order: 5,
    cluster: "MONEY",
    clusterName: CLUSTER_NAMES.MONEY,
    question: "Find the simple interest on ₹800 at 5% per annum for 2 years.",
    options: [
        { text: "₹80", correct: true, feedback: "SI = 800 × 5 × 2 / 100 = 8000 / 100 = ₹80." },
        { text: "₹40", correct: false, feedback: "You only calculated for 1 year (800×5/100 = 40)." },
        { text: "₹160", correct: false, feedback: "You used rate 10%." },
        { text: "₹800", correct: false, feedback: "That's the principal." }
      ],
    backward: "SI = P × R × T / 100.",
    forward: "Loans and savings use simple interest."
  },
  {
    itemId: "d6",
    order: 6,
    cluster: "PAV",
    clusterName: CLUSTER_NAMES.PAV,
    question: "A rectangular floor measures 6 m by 4 m. Tiles cost ₹50 per square metre. Find the total cost.",
    options: [
        { text: "₹1200", correct: true, feedback: "Area = 6 × 4 = 24 m². Cost = 24 × 50 = ₹1200." },
        { text: "₹500", correct: false, feedback: "You used perimeter (20 m) × 50 = 1000? Actually 20×50=1000, not 500." },
        { text: "₹2400", correct: false, feedback: "You doubled the cost." },
        { text: "₹240", correct: false, feedback: "You multiplied area by 10." }
      ],
    backward: "Area = length × breadth. Multiply area by cost per square metre.",
    forward: "Home renovation and budgeting."
  },
  {
    itemId: "d7",
    order: 7,
    cluster: "LENGTH",
    clusterName: CLUSTER_NAMES.LENGTH,
    question: "A square field has area 64 m². Find its perimeter.",
    options: [
        { text: "32 m", correct: true, feedback: "Side = √64 = 8 m. Perimeter = 4 × 8 = 32 m." },
        { text: "16 m", correct: false, feedback: "You multiplied the side by 2 instead of 4." },
        { text: "8 m", correct: false, feedback: "That's the side length." },
        { text: "64 m", correct: false, feedback: "That's the area." }
      ],
    backward: "First find side length (√area), then perimeter = 4 × side.",
    forward: "Geometry and measurement combined."
  },
  {
    itemId: "d8",
    order: 8,
    cluster: "MASS",
    clusterName: CLUSTER_NAMES.MASS,
    question: "A box of chocolates weighs 2 kg. The box alone weighs 350 g. What is the weight of the chocolates?",
    options: [
        { text: "1 kg 650 g", correct: true, feedback: "2000 g − 350 g = 1650 g = 1 kg 650 g." },
        { text: "1 kg 750 g", correct: false, feedback: "Subtraction error." },
        { text: "2 kg 350 g", correct: false, feedback: "You added instead of subtracting." },
        { text: "1650 g", correct: false, feedback: "Answer should be in mixed units as per question (1 kg 650 g)." }
      ],
    backward: "Convert to grams, subtract, convert back.",
    forward: "Net weight is important in packaging and trade."
  },
  {
    itemId: "d9",
    order: 9,
    cluster: "CAP",
    clusterName: CLUSTER_NAMES.CAP,
    question: "A jug contains 1 l 200 ml. Another 800 ml is added. Express the total in litres.",
    options: [
        { text: "2 l", correct: true, feedback: "1200 ml + 800 ml = 2000 ml = 2 l." },
        { text: "1.8 l", correct: false, feedback: "You added incorrectly (1200+800=2000, not 1800)." },
        { text: "2.2 l", correct: false, feedback: "Incorrect addition." },
        { text: "2000 l", correct: false, feedback: "Wrong unit." }
      ],
    backward: "Add volumes in ml, then divide by 1000.",
    forward: "Cooking and mixing solutions."
  },
  {
    itemId: "d10",
    order: 10,
    cluster: "TIME",
    clusterName: CLUSTER_NAMES.TIME,
    question: "A flight departs at 23:15 and arrives at 07:45 the next day. How long is the flight?",
    options: [
        { text: "8 h 30 min", correct: true, feedback: "23:15 to 24:00 = 45 min; 00:00 to 07:45 = 7 h 45 min; total = 8 h 30 min." },
        { text: "7 h 30 min", correct: false, feedback: "You miscalculated the minutes." },
        { text: "9 h", correct: false, feedback: "Off by 30 min." },
        { text: "8 h", correct: false, feedback: "Forgot the minutes." }
      ],
    backward: "Calculate to midnight, then add the time after midnight.",
    forward: "International travel and scheduling."
  },
  {
    itemId: "d11",
    order: 11,
    cluster: "MONEY",
    clusterName: CLUSTER_NAMES.MONEY,
    question: "A toy was bought for ₹500 and sold for ₹400. Find the loss percentage.",
    options: [
        { text: "20%", correct: true, feedback: "Loss = ₹100. Loss % = (100 / 500) × 100 = 20%." },
        { text: "25%", correct: false, feedback: "You divided loss by Selling Price (100/400 = 25%)." },
        { text: "10%", correct: false, feedback: "Incorrect calculation." },
        { text: "50%", correct: false, feedback: "Incorrect." }
      ],
    backward: "Loss % = (Loss ÷ Cost Price) × 100.",
    forward: "Understanding discounts and sales."
  },
  {
    itemId: "d12",
    order: 12,
    cluster: "PAV",
    clusterName: CLUSTER_NAMES.PAV,
    question: "A cuboid block of cheese measures 10 cm × 5 cm × 4 cm. 1 cm³ weighs 2 g. Find the total weight in kg.",
    options: [
        { text: "0.4 kg", correct: true, feedback: "Volume = 10×5×4 = 200 cm³. Weight = 200 × 2 = 400 g = 0.4 kg." },
        { text: "400 kg", correct: false, feedback: "You didn't convert grams to kilograms." },
        { text: "0.2 kg", correct: false, feedback: "You used 1 g per cm³ instead of 2 g." },
        { text: "4 kg", correct: false, feedback: "Decimal error." }
      ],
    backward: "Volume = l × b × h. Multiply by weight per cm³, then convert to kg.",
    forward: "Density and weight calculations."
  },
  {
    itemId: "d13",
    order: 13,
    cluster: "LENGTH",
    clusterName: CLUSTER_NAMES.LENGTH,
    question: "A roll of ribbon is 15 m long. How many full pieces of 40 cm each can be cut?",
    options: [
        { text: "37", correct: true, feedback: "15 m = 1500 cm. 1500 ÷ 40 = 37.5, so 37 full pieces." },
        { text: "30", correct: false, feedback: "You divided by 50 instead of 40." },
        { text: "38", correct: false, feedback: "You rounded up, but you cannot get a full 38th piece." },
        { text: "40", correct: false, feedback: "Incorrect calculation." }
      ],
    backward: "Convert metres to cm, divide, take the whole number part.",
    forward: "Cutting materials efficiently."
  },
  {
    itemId: "d14",
    order: 14,
    cluster: "MASS",
    clusterName: CLUSTER_NAMES.MASS,
    question: "Find the total mass in kg: 2 kg 500 g + 3 kg 250 g + 1 kg 750 g.",
    options: [
        { text: "7.5 kg", correct: true, feedback: "Grams total: 500+250+750 = 1500 g = 1.5 kg. Kg total: 2+3+1 = 6 kg. Sum = 7.5 kg." },
        { text: "6.5 kg", correct: false, feedback: "You forgot to convert the grams." },
        { text: "8 kg", correct: false, feedback: "Incorrect addition." },
        { text: "7500 g", correct: false, feedback: "That's the total in grams, but the question asks for kg." }
      ],
    backward: "Add kg and g separately; if g ≥1000, convert to kg and carry.",
    forward: "Adding multiple items in a basket."
  },
  {
    itemId: "d15",
    order: 15,
    cluster: "CAP",
    clusterName: CLUSTER_NAMES.CAP,
    question: "A 5 l container has 3 l 500 ml of water. What fraction of the container is filled? (Simplify your answer.)",
    options: [
        { text: "\\(\\frac{7}{10}\\)", correct: true, feedback: "3.5 l / 5 l = 35/50 = 7/10." },
        { text: "\\(\\frac{3}{5}\\)", correct: false, feedback: "That's 3 l out of 5 l, ignoring the 500 ml." },
        { text: "\\(\\frac{1}{2}\\)", correct: false, feedback: "Too small." },
        { text: "\\(\\frac{5}{7}\\)", correct: false, feedback: "Reciprocal." }
      ],
    backward: "Convert both to the same unit, then divide. Simplify the fraction.",
    forward: "Reading gauges and measuring tanks."
  },
  {
    itemId: "d16",
    order: 16,
    cluster: "TIME",
    clusterName: CLUSTER_NAMES.TIME,
    question: "A school assembly ends at 8:45 AM and lasts 25 minutes. What time did it start?",
    options: [
        { text: "8:20 AM", correct: true, feedback: "8:45 − 25 min = 8:20 AM." },
        { text: "9:10 AM", correct: false, feedback: "You added the duration instead of subtracting." },
        { text: "8:15 AM", correct: false, feedback: "Off by 5 min." },
        { text: "8:25 AM", correct: false, feedback: "Incorrect subtraction." }
      ],
    backward: "Subtract the duration from the end time.",
    forward: "Back‑timing for planning."
  },
  {
    itemId: "d17",
    order: 17,
    cluster: "MONEY",
    clusterName: CLUSTER_NAMES.MONEY,
    question: "Ravi bought 3 shirts at ₹450 each and 2 trousers at ₹800 each. He paid ₹3000. How much change did he get?",
    options: [
        { text: "₹50", correct: true, feedback: "Total = 3×450=1350; 2×800=1600; sum = 2950. Change = 3000−2950 = ₹50." },
        { text: "₹2950", correct: false, feedback: "That's the total cost, not the change." },
        { text: "₹150", correct: false, feedback: "Incorrect subtraction." },
        { text: "₹250", correct: false, feedback: "Incorrect total cost." }
      ],
    backward: "First total cost, then subtract from amount paid.",
    forward: "Budgeting and cash management."
  },
  {
    itemId: "d18",
    order: 18,
    cluster: "PAV",
    clusterName: CLUSTER_NAMES.PAV,
    question: "A rectangle has length 10 cm, breadth 6 cm. A square has the same perimeter as the rectangle. Find the area of the square.",
    options: [
        { text: "64 cm²", correct: true, feedback: "Rectangle perimeter = 2×(10+6) = 32 cm. Square side = 32÷4 = 8 cm. Area = 8² = 64 cm²." },
        { text: "32 cm²", correct: false, feedback: "You used the perimeter as the area." },
        { text: "60 cm²", correct: false, feedback: "That's the area of the rectangle." },
        { text: "16 cm²", correct: false, feedback: "You used side 4 cm (32÷8? mistake)." }
      ],
    backward: "Find perimeter, then side of square (÷4), then area.",
    forward: "Relating different shapes through their perimeters."
  },
  {
    itemId: "d19",
    order: 19,
    cluster: "LENGTH",
    clusterName: CLUSTER_NAMES.LENGTH,
    question: "A rectangular park is 120 m long and 80 m wide. How many kilometres does a person walk in 5 rounds?",
    options: [
        { text: "2 km", correct: true, feedback: "Perimeter = 2×(120+80) = 400 m. 5 rounds = 2000 m = 2 km." },
        { text: "1 km", correct: false, feedback: "You only walked 2.5 rounds? Or miscalculated perimeter." },
        { text: "20 km", correct: false, feedback: "Decimal error." },
        { text: "200 m", correct: false, feedback: "That's just one round in metres? No, perimeter is 400 m." }
      ],
    backward: "Perimeter = 2 × (l+b). Multiply by number of rounds. Convert to km.",
    forward: "Fitness tracking and sports."
  },
  {
    itemId: "d20",
    order: 20,
    cluster: "MASS",
    clusterName: CLUSTER_NAMES.MASS,
    question: "A tank holds 50 l of water. 1 l of water weighs 1 kg. What is the weight of water in grams?",
    options: [
        { text: "50000 g", correct: true, feedback: "50 l = 50 kg. 50 kg = 50 × 1000 = 50000 g." },
        { text: "5000 g", correct: false, feedback: "You multiplied by 100 instead of 1000." },
        { text: "500 g", correct: false, feedback: "Too small." },
        { text: "50 g", correct: false, feedback: "Incorrect." }
      ],
    backward: "Multiply litres by 1 kg/l, then convert kg to g.",
    forward: "Science and engineering mass‑volume relationships."
  },
  {
    itemId: "d21",
    order: 21,
    cluster: "CAP",
    clusterName: CLUSTER_NAMES.CAP,
    question: "A 3 l bottle is full. 750 ml is used, then 1 l 250 ml is used. How much is left?",
    options: [
        { text: "1 l", correct: true, feedback: "Total used = 750+1250 = 2000 ml = 2 l. Remaining = 3 − 2 = 1 l." },
        { text: "2 l", correct: false, feedback: "That's the amount used." },
        { text: "1.5 l", correct: false, feedback: "Incorrect subtraction." },
        { text: "500 ml", correct: false, feedback: "You only subtracted 750? No." }
      ],
    backward: "Sum the amounts used, subtract from total.",
    forward: "Tracking consumption."
  },
  {
    itemId: "d22",
    order: 22,
    cluster: "TIME",
    clusterName: CLUSTER_NAMES.TIME,
    question: "How much time passes from 11:25 AM to 2:10 PM?",
    options: [
        { text: "2 h 45 min", correct: true, feedback: "11:25 to 12:00 = 35 min; 12:00 to 2:10 = 2 h 10 min; total = 2 h 45 min." },
        { text: "3 h 15 min", correct: false, feedback: "You added incorrectly." },
        { text: "2 h 35 min", correct: false, feedback: "Miscalculated minutes." },
        { text: "1 h 45 min", correct: false, feedback: "Too short." }
      ],
    backward: "Calculate to noon, then add the afternoon portion.",
    forward: "Scheduling appointments."
  },
  {
    itemId: "d23",
    order: 23,
    cluster: "MONEY",
    clusterName: CLUSTER_NAMES.MONEY,
    question: "A fruit seller bought 10 kg of apples at ₹60 per kg and sold them at ₹75 per kg. Find the total profit and profit percentage.",
    options: [
        { text: "Profit ₹150, 25%", correct: true, feedback: "CP = 10×60 = ₹600; SP = 10×75 = ₹750; Profit = ₹150; Profit % = (150/600)×100 = 25%." },
        { text: "Profit ₹150, 20%", correct: false, feedback: "20% would be (150/750)×100, which uses SP, not CP." },
        { text: "Profit ₹90, 15%", correct: false, feedback: "Incorrect profit amount." },
        { text: "Profit ₹150, 15%", correct: false, feedback: "Incorrect percentage." }
      ],
    backward: "Find total CP and SP, then profit, then percentage.",
    forward: "Business transactions."
  },
  {
    itemId: "d24",
    order: 24,
    cluster: "PAV",
    clusterName: CLUSTER_NAMES.PAV,
    question: "A cube has total surface area 150 cm². Find its volume.",
    options: [
        { text: "125 cm³", correct: true, feedback: "Surface area = 6 × side² = 150 → side² = 25 → side = 5 cm. Volume = 5³ = 125 cm³." },
        { text: "25 cm³", correct: false, feedback: "You used side² as volume." },
        { text: "150 cm³", correct: false, feedback: "That's the surface area, not volume." },
        { text: "30 cm³", correct: false, feedback: "Incorrect calculation." }
      ],
    backward: "Divide surface area by 6 to get one face area, then square root for side, then cube for volume.",
    forward: "3D geometry and measurement relationships."
  }
];

const recheckItems = [
  {
    itemId: "r1",
    order: 1,
    cluster: "LENGTH",
    clusterName: CLUSTER_NAMES.LENGTH,
    question: "A plank is 5 m 60 cm long. 2 m 80 cm is cut. How much remains?",
    options: [
        { text: "2 m 80 cm", correct: true, feedback: "560 cm − 280 cm = 280 cm = 2 m 80 cm." },
        { text: "3 m 20 cm", correct: false, feedback: "You added instead of subtracting." },
        { text: "2 m 20 cm", correct: false, feedback: "Incorrect subtraction." },
        { text: "3 m", correct: false, feedback: "You only subtracted the metres." }
      ]
  },
  {
    itemId: "r2",
    order: 2,
    cluster: "MASS",
    clusterName: CLUSTER_NAMES.MASS,
    question: "6 bags of flour each weigh 1 kg 250 g. Find the total mass in kg.",
    options: [
        { text: "7.5 kg", correct: true, feedback: "1.25 × 6 = 7.5 kg." },
        { text: "6.5 kg", correct: false, feedback: "You only multiplied the kg part (1×6=6) and added 500 g as 0.5 kg." },
        { text: "7 kg", correct: false, feedback: "Off by 0.5 kg." },
        { text: "7500 g", correct: false, feedback: "That's in grams, but the question asks for kg." }
      ]
  },
  {
    itemId: "r3",
    order: 3,
    cluster: "CAP",
    clusterName: CLUSTER_NAMES.CAP,
    question: "How many 200 ml cups can be filled from 1 l 600 ml?",
    options: [
        { text: "8", correct: true, feedback: "1600 ÷ 200 = 8." },
        { text: "6", correct: false, feedback: "Incorrect division." },
        { text: "10", correct: false, feedback: "1600÷160? No." },
        { text: "16", correct: false, feedback: "Too many." }
      ]
  },
  {
    itemId: "r4",
    order: 4,
    cluster: "TIME",
    clusterName: CLUSTER_NAMES.TIME,
    question: "A film starts at 2:50 PM and lasts 1 hour 25 minutes. What time does it end?",
    options: [
        { text: "4:15 PM", correct: true, feedback: "2:50 + 1:00 = 3:50; + 0:25 = 4:15 PM." },
        { text: "4:05 PM", correct: false, feedback: "You added 15 min instead of 25." },
        { text: "3:15 PM", correct: false, feedback: "You subtracted?" },
        { text: "4:15 AM", correct: false, feedback: "Wrong AM/PM." }
      ]
  },
  {
    itemId: "r5",
    order: 5,
    cluster: "MONEY",
    clusterName: CLUSTER_NAMES.MONEY,
    question: "Simple interest on ₹1200 at 4% per annum for 3 years.",
    options: [
        { text: "₹144", correct: true, feedback: "SI = 1200 × 4 × 3 / 100 = 144." },
        { text: "₹120", correct: false, feedback: "You used rate 5%? 1200×5×3/100=180? Not 120. Actually 1200×4×3/100=144." },
        { text: "₹480", correct: false, feedback: "You forgot to divide by 100? 1200×4×3=14400, then off." },
        { text: "₹1440", correct: false, feedback: "You didn't divide by 100 (1200×4×3=14400, then divided by 10?)." }
      ]
  },
  {
    itemId: "r6",
    order: 6,
    cluster: "PAV",
    clusterName: CLUSTER_NAMES.PAV,
    question: "A rectangular wall is 8 m by 3 m. Painting costs ₹20 per square metre. Find the total cost.",
    options: [
        { text: "₹480", correct: true, feedback: "Area = 8×3 = 24 m². Cost = 24 × 20 = ₹480." },
        { text: "₹240", correct: false, feedback: "You used half the area or wrong rate." },
        { text: "₹960", correct: false, feedback: "You doubled the cost." },
        { text: "₹220", correct: false, feedback: "You used perimeter (22 m) × 10? Not correct." }
      ]
  },
  {
    itemId: "r7",
    order: 7,
    cluster: "LENGTH",
    clusterName: CLUSTER_NAMES.LENGTH,
    question: "A square has area 81 m². Find its perimeter.",
    options: [
        { text: "36 m", correct: true, feedback: "Side = 9 m. Perimeter = 4 × 9 = 36 m." },
        { text: "18 m", correct: false, feedback: "You multiplied side by 2." },
        { text: "9 m", correct: false, feedback: "That's the side." },
        { text: "81 m", correct: false, feedback: "That's the area." }
      ]
  },
  {
    itemId: "r8",
    order: 8,
    cluster: "MASS",
    clusterName: CLUSTER_NAMES.MASS,
    question: "A box of apples weighs 2 kg 200 g. The empty box weighs 400 g. What is the weight of the apples?",
    options: [
        { text: "1 kg 800 g", correct: true, feedback: "2200 g − 400 g = 1800 g = 1 kg 800 g." },
        { text: "2 kg 600 g", correct: false, feedback: "You added instead of subtracting." },
        { text: "1 kg 600 g", correct: false, feedback: "Incorrect subtraction (2200−400=1800)." },
        { text: "2 kg", correct: false, feedback: "You only used the kg part." }
      ]
  },
  {
    itemId: "r9",
    order: 9,
    cluster: "CAP",
    clusterName: CLUSTER_NAMES.CAP,
    question: "Add: 2 l 500 ml + 1 l 750 ml. Express the answer in litres.",
    options: [
        { text: "4.25 l", correct: true, feedback: "2500 ml + 1750 ml = 4250 ml = 4.25 l." },
        { text: "3.25 l", correct: false, feedback: "You only added the litres (2+1=3) and ignored the ml conversion." },
        { text: "4.5 l", correct: false, feedback: "Incorrect addition of ml (500+750=1250, not 1500)." },
        { text: "5.25 l", correct: false, feedback: "Added an extra litre." }
      ]
  },
  {
    itemId: "r10",
    order: 10,
    cluster: "TIME",
    clusterName: CLUSTER_NAMES.TIME,
    question: "A flight departs at 21:30 and arrives at 06:15 the next day. How long is the flight?",
    options: [
        { text: "8 h 45 min", correct: true, feedback: "21:30 to 24:00 = 2 h 30 min; 00:00 to 06:15 = 6 h 15 min; total = 8 h 45 min." },
        { text: "9 h 15 min", correct: false, feedback: "Miscalculated." },
        { text: "7 h 45 min", correct: false, feedback: "Off by 1 h." },
        { text: "8 h 15 min", correct: false, feedback: "Incorrect minutes." }
      ]
  },
  {
    itemId: "r11",
    order: 11,
    cluster: "MONEY",
    clusterName: CLUSTER_NAMES.MONEY,
    question: "Cost Price = ₹2000, Selling Price = ₹1700. Find the loss percentage.",
    options: [
        { text: "15%", correct: true, feedback: "Loss = ₹300. Loss % = (300/2000)×100 = 15%." },
        { text: "10%", correct: false, feedback: "Incorrect (300/3000? No)." },
        { text: "20%", correct: false, feedback: "300/1500=20%, but that uses SP." },
        { text: "17.6%", correct: false, feedback: "300/1700 ≈ 17.6%, wrong denominator." }
      ]
  },
  {
    itemId: "r12",
    order: 12,
    cluster: "PAV",
    clusterName: CLUSTER_NAMES.PAV,
    question: "A cuboid measures 12 cm × 5 cm × 3 cm. 1 cm³ has a mass of 3 g. Find the total mass in kg.",
    options: [
        { text: "0.54 kg", correct: true, feedback: "Volume = 12×5×3 = 180 cm³. Mass = 180×3 = 540 g = 0.54 kg." },
        { text: "0.18 kg", correct: false, feedback: "You used 1 g per cm³ instead of 3 g." },
        { text: "5.4 kg", correct: false, feedback: "Decimal error (5400 g instead of 540 g)." },
        { text: "1.8 kg", correct: false, feedback: "Incorrect volume calculation." }
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
    title: "Measurement — Advanced Core",
    subtitle: "Telangana & Cambridge · Level 2 · Advanced Core",
    description: "Multi-step conversions, mixed-unit arithmetic, and combined perimeter/area/cost problems across every measurement cluster.",
    clusterNames: CLUSTER_NAMES,
    gateReviewHTML: "<strong>Quick Review — Multi‑Step Measurement</strong><br>\n        • Convert to a common unit before adding or subtracting lengths, masses, or capacities.<br>\n        • For perimeter: 2 × (l + b) for rectangles, 4 × side for squares.<br>\n        • For area: length × breadth (rectangle), side × side (square). Remember square units!<br>\n        • For volume: length × breadth × height (cuboid), side³ (cube).<br>\n        • Time intervals: count carefully across the hour; for 24‑hour clock, add 12 to PM hours.<br>\n        • Money: Profit = SP − CP, Loss = CP − SP. Profit % = (Profit / CP) × 100.<br>\n        • Simple Interest = (Principal × Rate × Time) / 100.",
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

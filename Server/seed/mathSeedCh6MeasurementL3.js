// seed/mathSeedCh6MeasurementL3.js
//
// Populates math_chapters and math_questions with Grade 5, Chapter 6
// (Measurement), Level 3 — converted from the standalone HTML file
// ch-6-measurement-level-3.html.
//
// Run with: node seed/mathSeedCh6MeasurementL3.js

const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-5";
const GRADE_LABEL = "Grade 5";
const CHAPTER_SLUG = "ch-6-measurement";
const CHAPTER_NAME = "Measurement";
const LEVEL = 3;

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
    question: "A rectangular garden is 15 m long and 10 m wide. A 2 m wide path is built inside the boundary all around. Find the area of the path.",
    options: [
        { text: "84 m²", correct: true, feedback: "Outer area = 15×10=150 m². Inner length = 15−4=11 m, inner width = 10−4=6 m. Inner area = 11×6=66 m². Path = 150−66=84 m²." },
        { text: "54 m²", correct: false, feedback: "You only subtracted 2 m from each side instead of 4 m." },
        { text: "104 m²", correct: false, feedback: "Incorrect calculation of inner dimensions." },
        { text: "150 m²", correct: false, feedback: "That's the total area of the garden, not just the path." }
      ],
    retryHint: "Draw the garden. The path reduces both length and width by 4 m (2 m on each side). Subtract inner area from outer area."
  },
  {
    itemId: "w2",
    order: 2,
    cluster: "MASS",
    clusterName: CLUSTER_NAMES.MASS,
    question: "A crate contains 24 identical cans. Total mass of filled crate is 15 kg. Empty crate weighs 3 kg. What is the mass of one can in grams?",
    options: [
        { text: "500 g", correct: true, feedback: "Net mass = 12 kg = 12000 g. One can = 12000/24 = 500 g." },
        { text: "625 g", correct: false, feedback: "You divided the total mass (15 kg) by 24, forgetting to subtract the crate." },
        { text: "125 g", correct: false, feedback: "You divided incorrectly." },
        { text: "500 kg", correct: false, feedback: "You forgot to convert to grams." }
      ],
    retryHint: "Subtract crate weight from total to get net weight. Divide by number of cans. Convert to grams."
  },
  {
    itemId: "w3",
    order: 3,
    cluster: "CAP",
    clusterName: CLUSTER_NAMES.CAP,
    question: "A tank is 1/4 full. After adding 35 litres, it becomes 3/4 full. Find the capacity of the tank.",
    options: [
        { text: "70 l", correct: true, feedback: "(3/4 − 1/4) = 1/2 capacity = 35 l → capacity = 70 l." },
        { text: "35 l", correct: false, feedback: "That's the amount added, not the total capacity." },
        { text: "140 l", correct: false, feedback: "You doubled 70." },
        { text: "105 l", correct: false, feedback: "You added fractions incorrectly." }
      ],
    retryHint: "The change in fraction is 3/4 − 1/4 = 1/2. This half corresponds to 35 l."
  },
  {
    itemId: "w4",
    order: 4,
    cluster: "TIME",
    clusterName: CLUSTER_NAMES.TIME,
    question: "A train leaves at 08:45 and reaches at 13:20 the same day. It stops for 25 minutes at a station. Find the actual travel time (moving time).",
    options: [
        { text: "4 h 10 min", correct: true, feedback: "Total time = 13:20−08:45 = 4 h 35 min. Minus 25 min = 4 h 10 min." },
        { text: "4 h 35 min", correct: false, feedback: "You forgot to subtract the stop." },
        { text: "5 h", correct: false, feedback: "Too long." },
        { text: "4 h", correct: false, feedback: "You only subtracted the minutes? No." }
      ],
    retryHint: "Find total journey time, then subtract the stop duration."
  },
  {
    itemId: "w5",
    order: 5,
    cluster: "MONEY",
    clusterName: CLUSTER_NAMES.MONEY,
    question: "A shopkeeper mixes 5 kg of tea costing ₹200/kg with 3 kg of tea costing ₹300/kg. At what price per kg should he sell the mixture to make a profit of 20%?",
    options: [
        { text: "₹285", correct: true, feedback: "Total CP = 5×200 + 3×300 = 1900. Total kg = 8. CP/kg = 1900/8 = 237.50. SP/kg = 237.50×1.2 = 285." },
        { text: "₹237.50", correct: false, feedback: "That's the cost price per kg, not selling price." },
        { text: "₹300", correct: false, feedback: "You used the higher price for all." },
        { text: "₹250", correct: false, feedback: "Incorrect profit margin." }
      ],
    retryHint: "Find total cost, divide by total kg for cost price per kg, then add 20% profit."
  },
  {
    itemId: "w6",
    order: 6,
    cluster: "PAV",
    clusterName: CLUSTER_NAMES.PAV,
    question: "A cuboid has volume 480 cm³. Its length is 10 cm and breadth is 8 cm. Find its height and total surface area.",
    options: [
        { text: "Height 6 cm, surface area 376 cm²", correct: true, feedback: "Height = 480/(10×8) = 6 cm. SA = 2(10×8 + 8×6 + 10×6) = 2(80+48+60) = 376 cm²." },
        { text: "Height 6 cm, surface area 480 cm²", correct: false, feedback: "That's the volume, not surface area." },
        { text: "Height 5 cm, surface area 340 cm²", correct: false, feedback: "Incorrect height." },
        { text: "Height 6 cm, surface area 188 cm²", correct: false, feedback: "You halved the surface area." }
      ],
    retryHint: "First find height using volume formula. Then apply surface area formula."
  },
  {
    itemId: "w7",
    order: 7,
    cluster: "LENGTH",
    clusterName: CLUSTER_NAMES.LENGTH,
    question: "A wire of length 64 cm is bent to form a rectangle. The length is three times the breadth. Find the area of the rectangle.",
    options: [
        { text: "192 cm²", correct: true, feedback: "Let b=x, l=3x. Perimeter = 2(3x+x)=8x=64 → x=8. l=24, b=8. Area = 24×8 = 192 cm²." },
        { text: "256 cm²", correct: false, feedback: "That would be a square of side 16 cm." },
        { text: "48 cm²", correct: false, feedback: "You might have used 1/4 of perimeter as side?" },
        { text: "96 cm²", correct: false, feedback: "Incorrect calculation." }
      ],
    retryHint: "Use perimeter to find length and breadth, then area."
  },
  {
    itemId: "w8",
    order: 8,
    cluster: "CAP",
    clusterName: CLUSTER_NAMES.CAP,
    question: "A tap fills a tank in 4 hours. Another tap empties it in 6 hours. If both are opened together, how long will it take to fill the tank?",
    options: [
        { text: "12 h", correct: true, feedback: "In 1 h, fills 1/4 and empties 1/6. Net fill = 1/4−1/6 = 1/12. Time = 12 h." },
        { text: "2 h", correct: false, feedback: "You added the rates instead of subtracting." },
        { text: "10 h", correct: false, feedback: "You subtracted the times: 6−4=2? No." },
        { text: "24 h", correct: false, feedback: "You multiplied the times." }
      ],
    retryHint: "Find net fraction filled per hour, then take reciprocal for total hours."
  }
];

const diagnosticItems = [
  {
    itemId: "d1",
    order: 1,
    cluster: "LENGTH",
    clusterName: CLUSTER_NAMES.LENGTH,
    question: "A rectangular park is 200 m by 150 m. A 3 m wide path runs along the outside of the boundary. Find the area of the path. Then find the cost of paving it at ₹25 per square metre.",
    options: [
        { text: "₹53,400", correct: true, feedback: "Outer = 206×156 = 32136 m². Inner = 30000 m². Path = 2136 m². Cost = 2136×25 = ₹53,400." },
        { text: "₹15,000", correct: false, feedback: "You multiplied perimeter by width (700×3? No)." },
        { text: "₹26,700", correct: false, feedback: "You halved the cost." },
        { text: "₹50,000", correct: false, feedback: "Approximation, not exact." }
      ],
    backward: "Extend length and width by twice the path width; find difference of areas; multiply by cost.",
    forward: "Construction and landscaping projects use such calculations."
  },
  {
    itemId: "d2",
    order: 2,
    cluster: "MASS",
    clusterName: CLUSTER_NAMES.MASS,
    question: "A grocer mixes 12 kg of rice at ₹45/kg and 8 kg of rice at ₹60/kg. He sells the mixture at a profit of 25%. What is the selling price per kg of the mixture?",
    options: [
        { text: "₹63.75", correct: true, feedback: "Total CP = 12×45 + 8×60 = 1020. Total kg = 20. CP/kg = 51. SP/kg = 51×1.25 = 63.75." },
        { text: "₹51", correct: false, feedback: "That's the cost price per kg." },
        { text: "₹55", correct: false, feedback: "Incorrect profit calculation." },
        { text: "₹76.50", correct: false, feedback: "You applied profit to total CP instead of per kg." }
      ],
    backward: "Find total cost, average cost per kg, then add profit percentage.",
    forward: "Business and commerce use weighted averages with profit."
  },
  {
    itemId: "d3",
    order: 3,
    cluster: "CAP",
    clusterName: CLUSTER_NAMES.CAP,
    question: "A 5‑litre bottle is 2/5 full. 750 ml is used. Then a further 1 l 250 ml is added. What fraction of the bottle is now full?",
    options: [
        { text: "\\(\\frac{1}{2}\\)", correct: true, feedback: "Initial water = 2000 ml. After use → 1250 ml. After add → 2500 ml. Fraction = 2500/5000 = 1/2." },
        { text: "\\(\\frac{1}{5}\\)", correct: false, feedback: "You only considered the initial fraction? No." },
        { text: "\\(\\frac{3}{5}\\)", correct: false, feedback: "Incorrect step." },
        { text: "\\(\\frac{2}{5}\\)", correct: false, feedback: "No change considered." }
      ],
    backward: "Convert to ml, apply changes step‑by‑step, then find final fraction.",
    forward: "Tracking liquid volumes through multiple changes."
  },
  {
    itemId: "d4",
    order: 4,
    cluster: "TIME",
    clusterName: CLUSTER_NAMES.TIME,
    question: "A car travels 120 km in 2.5 hours, then another 80 km in 1.5 hours. Find the average speed for the entire journey in km/h.",
    options: [
        { text: "50 km/h", correct: true, feedback: "Total distance = 200 km. Total time = 4 h. Average speed = 200/4 = 50 km/h." },
        { text: "48 km/h", correct: false, feedback: "You averaged the speeds (48 and 53.33) incorrectly." },
        { text: "53.33 km/h", correct: false, feedback: "That's the speed of the second segment only." },
        { text: "200 km/h", correct: false, feedback: "Incorrect." }
      ],
    backward: "Average speed = total distance ÷ total time.",
    forward: "Physics and travel planning."
  },
  {
    itemId: "d5",
    order: 5,
    cluster: "MONEY",
    clusterName: CLUSTER_NAMES.MONEY,
    question: "₹5000 is deposited at 8% simple interest per annum. After 2 years, ₹2000 is withdrawn. What is the total interest earned over 4 years?",
    options: [
        { text: "₹1280", correct: true, feedback: "First 2 years: 5000×8×2/100 = ₹800. Remaining principal = ₹3000. Next 2 years: 3000×8×2/100 = ₹480. Total = ₹1280." },
        { text: "₹1600", correct: false, feedback: "You assumed the whole ₹5000 earned interest for 4 years." },
        { text: "₹800", correct: false, feedback: "Only the first two years." },
        { text: "₹2080", correct: false, feedback: "Incorrect calculation." }
      ],
    backward: "Calculate interest for each period separately based on the principal during that period.",
    forward: "Banking with partial withdrawals."
  },
  {
    itemId: "d6",
    order: 6,
    cluster: "PAV",
    clusterName: CLUSTER_NAMES.PAV,
    question: "A solid cube of side 10 cm has a smaller cube of side 4 cm removed from one corner. Find the remaining volume and its weight if 1 cm³ weighs 2 g. Express the weight in kg.",
    options: [
        { text: "1.872 kg", correct: true, feedback: "Volume = 1000−64 = 936 cm³. Mass = 936×2 = 1872 g = 1.872 kg." },
        { text: "2 kg", correct: false, feedback: "You used the whole cube's weight (1000×2=2000 g = 2 kg)." },
        { text: "0.936 kg", correct: false, feedback: "You used density 1 g/cm³ instead of 2 g/cm³." },
        { text: "1872 g", correct: false, feedback: "The answer should be in kg as requested." }
      ],
    backward: "Find volume of whole, subtract removed part, multiply by density, convert to kg.",
    forward: "Engineering and material science."
  },
  {
    itemId: "d7",
    order: 7,
    cluster: "LENGTH",
    clusterName: CLUSTER_NAMES.LENGTH,
    question: "The area of a rectangle is 300 cm². Its length is 4/3 of its breadth. Find its perimeter.",
    options: [
        { text: "70 cm", correct: true, feedback: "Let b=x, l=(4/3)x. Area = (4/3)x² = 300 → x²=225 → x=15. b=15 cm, l=20 cm. Perimeter = 2(20+15) = 70 cm." },
        { text: "60 cm", correct: false, feedback: "You might have used l=20,b=10?" },
        { text: "80 cm", correct: false, feedback: "Incorrect." },
        { text: "140 cm", correct: false, feedback: "You doubled the correct perimeter." }
      ],
    backward: "Set up equation using area and ratio. Solve for dimensions, then perimeter.",
    forward: "Linking algebra and geometry."
  },
  {
    itemId: "d8",
    order: 8,
    cluster: "MASS",
    clusterName: CLUSTER_NAMES.MASS,
    question: "A truck carries 250 identical boxes. Total loaded truck mass is 5000 kg; empty truck mass is 1500 kg. Each box contains 24 packets, and the packaging of each box weighs 200 g. Find the mass of one packet in grams.",
    options: [
        { text: "575 g", correct: true, feedback: "Net mass of boxes = 3500 kg = 3,500,000 g. 250×(M+200) = 3,500,000 → M+200 = 14,000 → M = 13,800 g. One packet = 13,800/24 = 575 g." },
        { text: "600 g", correct: false, feedback: "Incorrect calculation." },
        { text: "550 g", correct: false, feedback: "Off by 25 g." },
        { text: "500 g", correct: false, feedback: "You might have forgotten the packaging." }
      ],
    backward: "Subtract truck weight, convert to grams, account for packaging, then divide by number of packets.",
    forward: "Logistics and inventory."
  },
  {
    itemId: "d9",
    order: 9,
    cluster: "CAP",
    clusterName: CLUSTER_NAMES.CAP,
    question: "A cistern has two inlet pipes and one outlet pipe. The first inlet fills it in 3 h, the second in 4 h. The outlet empties it in 6 h. If all three are opened together, how long to fill the cistern?",
    options: [
        { text: "2 h 24 min", correct: true, feedback: "In 1 h: 1/3 + 1/4 − 1/6 = (4+3−2)/12 = 5/12. Time = 12/5 = 2.4 h = 2 h 24 min." },
        { text: "2 h", correct: false, feedback: "You may have added only the inlets." },
        { text: "3 h", correct: false, feedback: "Incorrect." },
        { text: "1 h 12 min", correct: false, feedback: "You added rates incorrectly." }
      ],
    backward: "Add the fill rates, subtract the empty rate; take reciprocal for time.",
    forward: "Classic pipe and cistern problems."
  },
  {
    itemId: "d10",
    order: 10,
    cluster: "TIME",
    clusterName: CLUSTER_NAMES.TIME,
    question: "A and B start from the same point. A walks at 5 km/h, B at 7 km/h in the opposite direction. After how many hours will they be 36 km apart?",
    options: [
        { text: "3 h", correct: true, feedback: "Relative speed = 5+7 = 12 km/h. Time = 36/12 = 3 h." },
        { text: "5 h", correct: false, feedback: "You used average speed? 36/7? No." },
        { text: "2 h", correct: false, feedback: "36/18? No." },
        { text: "1.5 h", correct: false, feedback: "Half of 3." }
      ],
    backward: "Since opposite directions, speeds add. Time = distance / relative speed.",
    forward: "Relative motion in physics."
  },
  {
    itemId: "d11",
    order: 11,
    cluster: "MONEY",
    clusterName: CLUSTER_NAMES.MONEY,
    question: "A shopkeeper marks a shirt at 40% above cost price and then gives a discount of 20% on the marked price. Find his profit percentage.",
    options: [
        { text: "12% profit", correct: true, feedback: "Let CP = ₹100. Marked = ₹140. Discount = 28, SP = ₹112. Profit = 12%." },
        { text: "20% profit", correct: false, feedback: "You ignored the discount." },
        { text: "8% profit", correct: false, feedback: "Incorrect calculation." },
        { text: "10% loss", correct: false, feedback: "Incorrect." }
      ],
    backward: "Calculate marked price, then discount, then compare SP to CP.",
    forward: "Retail markup and discount combined."
  },
  {
    itemId: "d12",
    order: 12,
    cluster: "PAV",
    clusterName: CLUSTER_NAMES.PAV,
    question: "A cuboid has length, breadth, and height in the ratio 2:1:3. Its volume is 384 cm³. If the length is doubled and the height is halved, what is the new volume?",
    options: [
        { text: "384 cm³", correct: true, feedback: "Let dims = 2x, x, 3x. Volume = 6x³=384 → x³=64 → x=4. Original: 8,4,12. New: 16,4,6. Volume = 16×4×6 = 384 cm³. The doubling and halving cancel." },
        { text: "768 cm³", correct: false, feedback: "You doubled the volume." },
        { text: "192 cm³", correct: false, feedback: "You halved the volume." },
        { text: "576 cm³", correct: false, feedback: "Incorrect." }
      ],
    backward: "Find dimensions from ratio and volume, then apply changes and recalculate.",
    forward: "Scaling and transformation."
  },
  {
    itemId: "d13",
    order: 13,
    cluster: "LENGTH",
    clusterName: CLUSTER_NAMES.LENGTH,
    question: "A floor is 5.4 m long and 4.2 m wide. Square tiles of side 30 cm are used to cover it. How many tiles are needed?",
    options: [
        { text: "252", correct: true, feedback: "Area = 540×420 = 226800 cm². Tile area = 900 cm². Number = 226800/900 = 252." },
        { text: "250", correct: false, feedback: "Off by 2." },
        { text: "225", correct: false, feedback: "You divided by 100? No." },
        { text: "260", correct: false, feedback: "Incorrect." }
      ],
    backward: "Convert all to the same unit, find areas, divide.",
    forward: "Tiling and flooring estimates."
  },
  {
    itemId: "d14",
    order: 14,
    cluster: "MASS",
    clusterName: CLUSTER_NAMES.MASS,
    question: "How many kilograms of sugar costing ₹40/kg must be mixed with 10 kg of sugar costing ₹60/kg to get a mixture worth ₹48/kg?",
    options: [
        { text: "15 kg", correct: true, feedback: "Let x kg of ₹40/kg. (40x+600)/(x+10)=48 → 40x+600=48x+480 → 8x=120 → x=15 kg." },
        { text: "20 kg", correct: false, feedback: "Incorrect equation." },
        { text: "10 kg", correct: false, feedback: "Then average would be (40×10+600)/20=50, not 48." },
        { text: "12 kg", correct: false, feedback: "Incorrect." }
      ],
    backward: "Set up weighted average equation.",
    forward: "Mixture and alligation problems."
  },
  {
    itemId: "d15",
    order: 15,
    cluster: "CAP",
    clusterName: CLUSTER_NAMES.CAP,
    question: "A 4.5 l bottle contains juice. 2/3 of the juice is drunk, and then 1/2 of the remaining is drunk. How much juice is left in ml?",
    options: [
        { text: "750 ml", correct: true, feedback: "Initial = 4500 ml. After first drink: 1500 ml left. After second: 750 ml left." },
        { text: "1500 ml", correct: false, feedback: "You only did the first step." },
        { text: "2250 ml", correct: false, feedback: "That's the amount drunk in the first step." },
        { text: "1125 ml", correct: false, feedback: "Incorrect fraction applied." }
      ],
    backward: "Apply fractions sequentially to the remaining amount.",
    forward: "Successive fraction problems."
  },
  {
    itemId: "d16",
    order: 16,
    cluster: "TIME",
    clusterName: CLUSTER_NAMES.TIME,
    question: "A bus starts from town P at 9:00 AM at 40 km/h. Another bus starts from P at 10:30 AM at 60 km/h in the same direction. When will the second bus catch the first?",
    options: [
        { text: "1:30 PM", correct: true, feedback: "Head start = 1.5 h × 40 = 60 km. Relative speed = 20 km/h. Time to catch = 60/20 = 3 h after 10:30 → 1:30 PM." },
        { text: "12:30 PM", correct: false, feedback: "Only 2 h after 10:30." },
        { text: "2:00 PM", correct: false, feedback: "3.5 h after." },
        { text: "1:00 PM", correct: false, feedback: "2.5 h after." }
      ],
    backward: "Find head start distance, then use relative speed.",
    forward: "Catch‑up problems in motion."
  },
  {
    itemId: "d17",
    order: 17,
    cluster: "MONEY",
    clusterName: CLUSTER_NAMES.MONEY,
    question: "A TV is sold at a single discount of 10% on the marked price, but the shop still makes a profit of 25%. If the marked price is ₹36,000, what was the cost price?",
    options: [
        { text: "₹25,920", correct: true, feedback: "SP = 36000×0.9 = 32400. CP = 32400/1.25 = 25920." },
        { text: "₹28,800", correct: false, feedback: "You used 20% profit instead of 25%." },
        { text: "₹24,000", correct: false, feedback: "Incorrect." },
        { text: "₹30,000", correct: false, feedback: "You might have used only discount." }
      ],
    backward: "Find selling price after discount, then work backwards to cost price using profit%.",
    forward: "Layered commercial problems."
  },
  {
    itemId: "d18",
    order: 18,
    cluster: "PAV",
    clusterName: CLUSTER_NAMES.PAV,
    question: "A cube has volume 512 cm³. Find its surface area.",
    options: [
        { text: "384 cm²", correct: true, feedback: "Side = ∛512 = 8 cm. Surface area = 6×8² = 384 cm²." },
        { text: "512 cm²", correct: false, feedback: "That's the volume." },
        { text: "256 cm²", correct: false, feedback: "You might have used 4×side²? No." },
        { text: "64 cm²", correct: false, feedback: "That's one face." }
      ],
    backward: "Cube root the volume to get side, then 6×side².",
    forward: "3D geometry relationships."
  },
  {
    itemId: "d19",
    order: 19,
    cluster: "LENGTH",
    clusterName: CLUSTER_NAMES.LENGTH,
    question: "A rectangular sheet of paper 30 cm by 20 cm has a square of side 8 cm cut from each corner. The remaining part is folded to form an open box. Find the volume of the box.",
    options: [
        { text: "448 cm³", correct: true, feedback: "Base length = 30−16=14 cm, width = 20−16=4 cm, height = 8 cm. Volume = 14×4×8 = 448 cm³." },
        { text: "4800 cm³", correct: false, feedback: "You multiplied 30×20×8." },
        { text: "2240 cm³", correct: false, feedback: "You used 14×20×8." },
        { text: "336 cm³", correct: false, feedback: "Incorrect subtraction." }
      ],
    backward: "Subtract twice the square side from each dimension for the base; height equals square side.",
    forward: "Packaging design."
  },
  {
    itemId: "d20",
    order: 20,
    cluster: "MASS",
    clusterName: CLUSTER_NAMES.MASS,
    question: "A metal block of mass 2.4 kg is melted and recast into a cuboid of length 15 cm and breadth 10 cm. The density of the metal is 8 g/cm³. Find the height of the cuboid.",
    options: [
        { text: "2 cm", correct: true, feedback: "Mass = 2400 g. Volume = 2400/8 = 300 cm³. Height = 300/(15×10) = 2 cm." },
        { text: "1.5 cm", correct: false, feedback: "Incorrect division." },
        { text: "3 cm", correct: false, feedback: "Used density 6? No." },
        { text: "2.5 cm", correct: false, feedback: "Incorrect." }
      ],
    backward: "Use density to find volume, then divide by base area.",
    forward: "Material science and recasting."
  },
  {
    itemId: "d21",
    order: 21,
    cluster: "CAP",
    clusterName: CLUSTER_NAMES.CAP,
    question: "A 15 l container is 2/3 full of water. The water is poured equally into bottles of 500 ml capacity each. How many bottles are filled, and how much water remains?",
    options: [
        { text: "20 bottles, 0 ml remaining", correct: true, feedback: "Water = 2/3 × 15 = 10 l = 10000 ml. 10000/500 = 20 bottles exactly." },
        { text: "15 bottles, 250 ml remaining", correct: false, feedback: "You used 3/4 instead of 2/3? No." },
        { text: "10 bottles, 0 ml", correct: false, feedback: "You only used the fraction directly as number?" },
        { text: "18 bottles, 200 ml", correct: false, feedback: "Incorrect." }
      ],
    backward: "Find total water in ml, divide by bottle capacity.",
    forward: "Distribution and packaging."
  },
  {
    itemId: "d22",
    order: 22,
    cluster: "TIME",
    clusterName: CLUSTER_NAMES.TIME,
    question: "A worker works from 8:00 AM to 5:00 PM with a 45‑minute lunch break. How many hours does he actually work?",
    options: [
        { text: "8 h 15 min", correct: true, feedback: "Total 9 h. Minus 45 min = 8 h 15 min." },
        { text: "9 h", correct: false, feedback: "You forgot the lunch break." },
        { text: "8 h", correct: false, feedback: "Subtracted 1 h." },
        { text: "8 h 45 min", correct: false, feedback: "Subtracted only 15 min." }
      ],
    backward: "Find total time from start to end, then subtract break.",
    forward: "Work hour calculations."
  },
  {
    itemId: "d23",
    order: 23,
    cluster: "MONEY",
    clusterName: CLUSTER_NAMES.MONEY,
    question: "A dealer bought 100 apples at ₹20 each. 20 apples were rotten. He sold the remaining apples at ₹30 each. Find his profit percentage.",
    options: [
        { text: "20% profit", correct: true, feedback: "CP = 2000. Good apples = 80. SP = 80×30 = 2400. Profit = 400. % = (400/2000)×100 = 20%." },
        { text: "25%", correct: false, feedback: "You divided profit by SP (400/2400 ≈ 16.7%? No, not 25%)." },
        { text: "10%", correct: false, feedback: "Incorrect." },
        { text: "15%", correct: false, feedback: "Incorrect." }
      ],
    backward: "Account for wastage, then compute profit on total CP.",
    forward: "Perishable goods business."
  },
  {
    itemId: "d24",
    order: 24,
    cluster: "PAV",
    clusterName: CLUSTER_NAMES.PAV,
    question: "A square garden of side 20 m has a 2 m wide path running along two adjacent sides (L‑shaped) on the inside. Find the area of the path.",
    options: [
        { text: "76 m²", correct: true, feedback: "Area of square = 400 m². Inner square side = 18 m, area = 324 m². Path = 400−324 = 76 m². Or 20×2 + 18×2 = 40+36 = 76 m²." },
        { text: "40 m²", correct: false, feedback: "You only considered one strip." },
        { text: "80 m²", correct: false, feedback: "You didn't account for the overlapping corner." },
        { text: "72 m²", correct: false, feedback: "Off by 4." }
      ],
    backward: "Subtract inner area from outer area, or add areas of the two rectangles minus overlapping square.",
    forward: "Landscape design."
  }
];

const recheckItems = [
  {
    itemId: "r1",
    order: 1,
    cluster: "LENGTH",
    clusterName: CLUSTER_NAMES.LENGTH,
    question: "A rectangular park is 180 m by 120 m. A 4 m wide path is built outside. Find the area of the path and the cost of paving it at ₹30 per m².",
    options: [
        { text: "Path area 2464 m², cost ₹73,920", correct: true, feedback: "Outer = 188×128 = 24064 m². Inner = 180×120 = 21600 m². Path = 2464 m². Cost = 2464×30 = ₹73,920." },
        { text: "Path area 24064 m²", correct: false, feedback: "That's the outer area." },
        { text: "Cost ₹73,920 (without path area)", correct: false, feedback: "Not correct — try the next one." },
        { text: "Path area 3000 m², cost ₹90,000", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r2",
    order: 2,
    cluster: "MASS",
    clusterName: CLUSTER_NAMES.MASS,
    question: "20 kg of tea at ₹150/kg is mixed with 30 kg of tea at ₹200/kg. Find the selling price per kg for a profit of 20%.",
    options: [
        { text: "₹216", correct: true, feedback: "Total CP = 20×150 + 30×200 = 3000+6000 = 9000. Total = 50 kg. CP/kg = 180. SP/kg = 180×1.2 = 216." },
        { text: "₹180", correct: false, feedback: "That's cost price." },
        { text: "₹200", correct: false, feedback: "Incorrect." },
        { text: "₹225", correct: false, feedback: "Used 25% profit." }
      ]
  },
  {
    itemId: "r3",
    order: 3,
    cluster: "CAP",
    clusterName: CLUSTER_NAMES.CAP,
    question: "A tank is 1/3 full. When 50 litres are added, it becomes 2/3 full. What is the capacity of the tank?",
    options: [
        { text: "150 l", correct: true, feedback: "Change = 1/3 capacity = 50 l → capacity = 150 l." },
        { text: "100 l", correct: false, feedback: "2/3 − 1/3 = 1/3, so 50 is 1/3, capacity = 150, not 100." },
        { text: "200 l", correct: false, feedback: "Not correct — try the next one." },
        { text: "75 l", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r4",
    order: 4,
    cluster: "TIME",
    clusterName: CLUSTER_NAMES.TIME,
    question: "A meeting starts at 6:45 PM and ends at 10:20 PM with a 30‑minute break. Find the actual meeting duration.",
    options: [
        { text: "3 h 5 min", correct: true, feedback: "Total = 3 h 35 min. Minus 30 min = 3 h 5 min." },
        { text: "3 h 35 min", correct: false, feedback: "You forgot to subtract the break." },
        { text: "4 h", correct: false, feedback: "Not correct — try the next one." },
        { text: "3 h", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r5",
    order: 5,
    cluster: "MONEY",
    clusterName: CLUSTER_NAMES.MONEY,
    question: "₹8000 is deposited at 6% SI per annum. After 1 year, ₹3000 is withdrawn. What is the total interest after 3 years?",
    options: [
        { text: "₹1080", correct: true, feedback: "Yr1: 8000×6/100=480. Next 2 yrs on 5000: 5000×6×2/100=600. Total=1080." },
        { text: "₹1440", correct: false, feedback: "You assumed no withdrawal." },
        { text: "₹960", correct: false, feedback: "Not correct — try the next one." },
        { text: "₹1200", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r6",
    order: 6,
    cluster: "PAV",
    clusterName: CLUSTER_NAMES.PAV,
    question: "A cube has volume 1000 cm³. Find its surface area.",
    options: [
        { text: "600 cm²", correct: true, feedback: "Side = 10 cm. SA = 6×100 = 600 cm²." },
        { text: "1000 cm²", correct: false, feedback: "Not correct — try the next one." },
        { text: "60 cm²", correct: false, feedback: "Not correct — try the next one." },
        { text: "100 cm²", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r7",
    order: 7,
    cluster: "LENGTH",
    clusterName: CLUSTER_NAMES.LENGTH,
    question: "A rectangle's length and breadth are in ratio 5:3 and its area is 240 m². Find the perimeter.",
    options: [
        { text: "64 m", correct: true, feedback: "5x×3x=15x²=240 → x²=16 → x=4. l=20, b=12. Perim=64 m." },
        { text: "60 m", correct: false, feedback: "Not correct — try the next one." },
        { text: "80 m", correct: false, feedback: "Not correct — try the next one." },
        { text: "48 m", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r8",
    order: 8,
    cluster: "MASS",
    clusterName: CLUSTER_NAMES.MASS,
    question: "The gross weight of a consignment is 850 kg. The tare (packaging) is 50 kg. There are 20 bags. What is the net weight per bag in kg?",
    options: [
        { text: "40 kg", correct: true, feedback: "Net = 800 kg. Per bag = 800/20 = 40 kg." },
        { text: "42.5 kg", correct: false, feedback: "Not correct — try the next one." },
        { text: "45 kg", correct: false, feedback: "Not correct — try the next one." },
        { text: "35 kg", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r9",
    order: 9,
    cluster: "CAP",
    clusterName: CLUSTER_NAMES.CAP,
    question: "A 3 l bottle is 2/5 full. 400 ml is used, then 1.2 l is added. What fraction of the bottle is now full?",
    options: [
        { text: "\\(\\frac{2}{3}\\)", correct: true, feedback: "Initial = 1200 ml. After use = 800 ml. Add 1200 = 2000 ml. Fraction = 2000/3000 = 2/3." },
        { text: "\\(\\frac{1}{2}\\)", correct: false, feedback: "Not correct — try the next one." },
        { text: "\\(\\frac{3}{5}\\)", correct: false, feedback: "Not correct — try the next one." },
        { text: "\\(\\frac{4}{5}\\)", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r10",
    order: 10,
    cluster: "TIME",
    clusterName: CLUSTER_NAMES.TIME,
    question: "A train leaves at 11:20 AM and arrives at 4:05 PM. It stops for 25 minutes. How long was it actually moving?",
    options: [
        { text: "4 h 20 min", correct: true, feedback: "Total = 4 h 45 min. Minus 25 min = 4 h 20 min." },
        { text: "4 h 45 min", correct: false, feedback: "Not correct — try the next one." },
        { text: "5 h", correct: false, feedback: "Not correct — try the next one." },
        { text: "4 h 10 min", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r11",
    order: 11,
    cluster: "MONEY",
    clusterName: CLUSTER_NAMES.MONEY,
    question: "A product's marked price is ₹5000. After a 15% discount, the seller still makes a 25% profit. What was the cost price?",
    options: [
        { text: "₹3400", correct: true, feedback: "SP = 5000×0.85 = 4250. CP = 4250/1.25 = 3400." },
        { text: "₹3750", correct: false, feedback: "Not correct — try the next one." },
        { text: "₹4000", correct: false, feedback: "Not correct — try the next one." },
        { text: "₹3000", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r12",
    order: 12,
    cluster: "PAV",
    clusterName: CLUSTER_NAMES.PAV,
    question: "A cuboid measures 12 cm × 8 cm × 5 cm. If each dimension is doubled, what is the new volume?",
    options: [
        { text: "3840 cm³", correct: true, feedback: "New = 24×16×10 = 3840 cm³." },
        { text: "960 cm³", correct: false, feedback: "Original volume doubled? Original=480, doubled=960." },
        { text: "1920 cm³", correct: false, feedback: "That's 4× the original volume, not 8×." },
        { text: "7680 cm³", correct: false, feedback: "That's 16× the original volume — too large." }
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
    title: "Measurement — Problem-Solving & Synthesis",
    subtitle: "Telangana & Cambridge · Level 3 · Problem-Solving & Synthesis",
    description: "Non-routine synthesis problems: paths around rectangles, mixtures and profit, pipes and cisterns, relative motion, and layered commercial problems.",
    clusterNames: CLUSTER_NAMES,
    gateReviewHTML: "<strong>Quick Review — Synthesis Tips</strong><br>\n        • When a path surrounds a rectangle, the outer dimensions are increased by twice the path width.<br>\n        • For mixtures and profit: find total cost, divide by total quantity for cost price, then apply profit.<br>\n        • Fraction changes in tanks: convert to a common unit, apply changes step‑by‑step, then find final fraction.<br>\n        • Average speed = total distance ÷ total time, not the average of speeds.<br>\n        • Use the relationship product = HCF × LCM when working with numbers of items.<br>\n        • For pipes and cisterns: add fill rates, subtract empty rates, then take reciprocal for time.",
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

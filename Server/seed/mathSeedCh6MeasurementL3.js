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
    skillId: "MEASPAV-08",
    question: "A rectangular garden is 15 m long and 10 m wide. A 2 m wide path is built inside the boundary all around. Find the area of the path.",
    options: [
        { text: "84 m²", correct: true, feedback: "Outer area = 15×10=150 m². Inner length = 15−4=11 m, inner width = 10−4=6 m. Inner area = 11×6=66 m². Path = 150−66=84 m²." },
        { text: "54 m²", correct: false, feedback: "You only subtracted 2 m from each side instead of 4 m.", misconceptionId: "E-w1-a" },
        { text: "104 m²", correct: false, feedback: "Incorrect calculation of inner dimensions.", misconceptionId: "E-w1-b" },
        { text: "150 m²", correct: false, feedback: "That's the total area of the garden, not just the path.", misconceptionId: "E-w1-c" }
      ],
    retryHint: "Draw the garden. The path reduces both length and width by 4 m (2 m on each side). Subtract inner area from outer area.",
    misconceptions: [
      {
        misconceptionId: "E-w1-a",
        description: "Student subtracts only 2 m (one side's worth) from each dimension instead of 4 m (both sides combined), computing inner dimensions as 13×8 instead of 11×6.",
        rootCause: "Single-Side Path Reduction Error — accounts for the path width on only one side of each dimension, forgetting it exists on BOTH sides.",
        remediation: "The 2 m path runs along the INSIDE boundary on all sides — this removes 2 m from EACH side, so each full dimension shrinks by 2+2=4 m total, not just 2 m."
      },
      {
        misconceptionId: "E-w1-b",
        description: "Student miscalculates the inner dimensions, perhaps subtracting the path width incorrectly or applying it inconsistently between length and width.",
        rootCause: "Inner Dimension Computation Error — a general error in deriving the reduced inner rectangle's dimensions.",
        remediation: "Compute each inner dimension separately: inner length = 15 - 2×2 = 11 m, inner width = 10 - 2×2 = 6 m — verify both before finding the inner area."
      },
      {
        misconceptionId: "E-w1-c",
        description: "Student reports the total garden area instead of just the path's area, forgetting to subtract the inner region.",
        rootCause: "Subtraction Step Omitted — stops after computing the outer area, without subtracting the inner area to isolate the path.",
        remediation: "The path is only the RING around the inner region — compute outer area MINUS inner area to isolate just the path: 150 - 66 = 84."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the outer area", hint: "15 × 10 = 150 m²." },
      { level: 2, description: "Find the inner dimensions", hint: "The path removes 2 m from EACH side: inner length = 15-4=11, inner width = 10-4=6." },
      { level: 3, description: "Subtract to isolate the path", hint: "Outer area - inner area = ?" }
    ],
    forwardRiskLinks: [
      { targetSkillId: "MEASPAV-02", probability: 0.4, condition: "Miscounting how many sides a border/path affects recurs in framing, fencing, and border-area problems." }
    ],
    learningObjectives: ["CCSS.MATH.CONTENT.5.MD.C.5"]
  },
  {
    itemId: "w2",
    order: 2,
    cluster: "MASS",
    clusterName: CLUSTER_NAMES.MASS,
    skillId: "MEASMASS-07",
    question: "A crate contains 24 identical cans. Total mass of filled crate is 15 kg. Empty crate weighs 3 kg. What is the mass of one can in grams?",
    options: [
        { text: "500 g", correct: true, feedback: "Net mass = 12 kg = 12000 g. One can = 12000/24 = 500 g." },
        { text: "625 g", correct: false, feedback: "You divided the total mass (15 kg) by 24, forgetting to subtract the crate.", misconceptionId: "E-w2-a" },
        { text: "125 g", correct: false, feedback: "You divided incorrectly.", misconceptionId: "E-w2-b" },
        { text: "500 kg", correct: false, feedback: "You forgot to convert to grams.", misconceptionId: "E-w2-c" }
      ],
    retryHint: "Subtract crate weight from total to get net weight. Divide by number of cans. Convert to grams.",
    misconceptions: [
      {
        misconceptionId: "E-w2-a",
        description: "Student divides the TOTAL mass (15 kg, including the crate) by 24 instead of first subtracting the crate's weight.",
        rootCause: "Container Weight Not Subtracted — forgets that the total mass includes the empty crate, not just the cans.",
        remediation: "Subtract the empty crate's weight FIRST to get the net mass of just the cans: 15 kg - 3 kg = 12 kg, THEN divide by 24."
      },
      {
        misconceptionId: "E-w2-b",
        description: "Student makes a division error, landing on a value much smaller than the correct 500 g.",
        rootCause: "Division Computation Error — miscalculates 12000 ÷ 24.",
        remediation: "Recompute: 12000 ÷ 24 = 500 — verify by multiplying 500 × 24 to see if it returns 12000."
      },
      {
        misconceptionId: "E-w2-c",
        description: "Student correctly computes 500 as the per-can share but leaves the unit as kg instead of converting to grams as requested.",
        rootCause: "Unit Conversion Omitted — doesn't convert the final answer to the unit requested by the question.",
        remediation: "The question asks for the mass 'in grams' — after computing 12 kg ÷ 24 = 0.5 kg, convert to grams: 0.5 kg = 500 g."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the net mass of the cans", hint: "15 kg - 3 kg (crate) = ?" },
      { level: 2, description: "Convert to grams", hint: "12 kg = 12000 g." },
      { level: 3, description: "Divide by the number of cans", hint: "12000 ÷ 24 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.MD.A.1"]
  },
  {
    itemId: "w3",
    order: 3,
    cluster: "CAP",
    clusterName: CLUSTER_NAMES.CAP,
    skillId: "MEASCAP-07",
    question: "A tank is 1/4 full. After adding 35 litres, it becomes 3/4 full. Find the capacity of the tank.",
    options: [
        { text: "70 l", correct: true, feedback: "(3/4 − 1/4) = 1/2 capacity = 35 l → capacity = 70 l." },
        { text: "35 l", correct: false, feedback: "That's the amount added, not the total capacity.", misconceptionId: "E-w3-a" },
        { text: "140 l", correct: false, feedback: "You doubled 70.", misconceptionId: "E-w3-b" },
        { text: "105 l", correct: false, feedback: "You added fractions incorrectly.", misconceptionId: "E-w3-c" }
      ],
    retryHint: "The change in fraction is 3/4 − 1/4 = 1/2. This half corresponds to 35 l.",
    misconceptions: [
      {
        misconceptionId: "E-w3-a",
        description: "Student reports the amount added (35 l) directly as the tank's capacity, without relating it to the fraction it represents.",
        rootCause: "Fraction-of-Capacity Reasoning Skipped — doesn't recognise that 35 l represents only HALF the tank, not the whole capacity.",
        remediation: "35 l represents the CHANGE in fill level (3/4 - 1/4 = 1/2 of the tank) — to find the full capacity, you must relate this fraction back to the whole: if 1/2 = 35 l, then the whole = 70 l."
      },
      {
        misconceptionId: "E-w3-b",
        description: "Student computes 70 l correctly as an intermediate step but then doubles it again, overshooting the actual capacity.",
        rootCause: "Extraneous Doubling Step — applies an unneeded second multiplication by 2 after correctly finding the capacity.",
        remediation: "Once 1/2 of the capacity is found to be 35 l, the full capacity is 35×2=70 l — that IS the final answer, no further doubling needed."
      },
      {
        misconceptionId: "E-w3-c",
        description: "Student adds the fractions 3/4 and 1/4 (getting 1) instead of subtracting them to find the change.",
        rootCause: "Fraction Operation Confusion — adds instead of subtracting when finding the DIFFERENCE between two fill levels.",
        remediation: "The tank goes FROM 1/4 full TO 3/4 full — the amount ADDED corresponds to the DIFFERENCE: 3/4 - 1/4 = 1/2, not the sum."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the fraction change", hint: "3/4 - 1/4 = 1/2 of the tank." },
      { level: 2, description: "Relate the fraction to the known volume", hint: "1/2 of the capacity = 35 l." },
      { level: 3, description: "Find the full capacity", hint: "If half is 35 l, the whole is 35 × 2 = ?" }
    ],
    forwardRiskLinks: [
      { targetSkillId: "DECCONV-07", probability: 0.3, condition: "Relating a known fractional part back to the whole recurs in ratio and percentage-of-total problems." }
    ],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NF.B.3"]
  },
  {
    itemId: "w4",
    order: 4,
    cluster: "TIME",
    clusterName: CLUSTER_NAMES.TIME,
    skillId: "MEASTIME-08",
    question: "A train leaves at 08:45 and reaches at 13:20 the same day. It stops for 25 minutes at a station. Find the actual travel time (moving time).",
    options: [
        { text: "4 h 10 min", correct: true, feedback: "Total time = 13:20−08:45 = 4 h 35 min. Minus 25 min = 4 h 10 min." },
        { text: "4 h 35 min", correct: false, feedback: "You forgot to subtract the stop.", misconceptionId: "E-w4-a" },
        { text: "5 h", correct: false, feedback: "Too long.", misconceptionId: "E-w4-b" },
        { text: "4 h", correct: false, feedback: "You only subtracted the minutes? No.", misconceptionId: "E-w4-c" }
      ],
    retryHint: "Find total journey time, then subtract the stop duration.",
    misconceptions: [
      {
        misconceptionId: "E-w4-a",
        description: "Student correctly finds the total journey time (4 h 35 min) but forgets to subtract the 25-minute stop to find the actual MOVING time.",
        rootCause: "Stop Duration Not Subtracted — treats total elapsed time as the same as moving time, ignoring the stationary period.",
        remediation: "The question asks for MOVING time, which excludes stops — subtract the 25-minute stop from the total journey time: 4 h 35 min - 25 min."
      },
      {
        misconceptionId: "E-w4-b",
        description: "Student overestimates the moving time, perhaps by adding the stop instead of subtracting it, or miscalculating the total journey time.",
        rootCause: "Operation Direction Confusion — adds the stop time instead of subtracting it.",
        remediation: "Stopping REDUCES the moving time relative to the total journey — subtract the 25-minute stop, don't add it: 4 h 35 min - 25 min = 4 h 10 min."
      },
      {
        misconceptionId: "E-w4-c",
        description: "Student subtracts a full hour instead of just 25 minutes, or makes another error that rounds the answer to a clean 4 hours.",
        rootCause: "Duration Rounding Error — rounds the subtraction to a cleaner number instead of computing the exact 25-minute reduction.",
        remediation: "Subtract EXACTLY 25 minutes, not a full hour: 4 h 35 min - 25 min = 4 h 10 min (35-25=10 minutes remain)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the total journey time", hint: "13:20 - 08:45 = ?" },
      { level: 2, description: "Identify what to subtract", hint: "The stop time (25 min) is NOT moving time." },
      { level: 3, description: "Subtract the stop", hint: "4 h 35 min - 25 min = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "w5",
    order: 5,
    cluster: "MONEY",
    clusterName: CLUSTER_NAMES.MONEY,
    skillId: "MEASMONEY-09",
    question: "A shopkeeper mixes 5 kg of tea costing ₹200/kg with 3 kg of tea costing ₹300/kg. At what price per kg should he sell the mixture to make a profit of 20%?",
    options: [
        { text: "₹285", correct: true, feedback: "Total CP = 5×200 + 3×300 = 1900. Total kg = 8. CP/kg = 1900/8 = 237.50. SP/kg = 237.50×1.2 = 285." },
        { text: "₹237.50", correct: false, feedback: "That's the cost price per kg, not selling price.", misconceptionId: "E-w5-a" },
        { text: "₹300", correct: false, feedback: "You used the higher price for all.", misconceptionId: "E-w5-b" },
        { text: "₹250", correct: false, feedback: "Incorrect profit margin.", misconceptionId: "E-w5-c" }
      ],
    retryHint: "Find total cost, divide by total kg for cost price per kg, then add 20% profit.",
    misconceptions: [
      {
        misconceptionId: "E-w5-a",
        description: "Student correctly finds the cost price per kg (₹237.50) but stops there without applying the 20% profit markup.",
        rootCause: "Final-Step Omission — treats the intermediate cost-price calculation as the complete answer.",
        remediation: "The question asks for the SELLING price to achieve a 20% profit — after finding CP/kg (237.50), multiply by 1.2 to get the selling price."
      },
      {
        misconceptionId: "E-w5-b",
        description: "Student uses the higher individual price (₹300/kg) as if it applied to the whole mixture, ignoring the weighted average.",
        rootCause: "Weighted Average Skipped — doesn't blend the two different costs and quantities into a single average cost per kg.",
        remediation: "The mixture has TWO different costs at different quantities — find the weighted average cost per kg first (total cost ÷ total kg), not just the higher individual price."
      },
      {
        misconceptionId: "E-w5-c",
        description: "Student applies an incorrect profit percentage or makes an error in the final multiplication, landing on ₹250 instead of ₹285.",
        rootCause: "Profit Percentage Computation Error — a miscalculation when applying the 20% markup.",
        remediation: "To add 20% profit to the cost price, multiply by 1.2 (not add 20 directly): 237.50 × 1.2 = 285."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the total cost", hint: "5×200 + 3×300 = ?" },
      { level: 2, description: "Find the cost price per kg", hint: "Total cost ÷ total kg (8) = ?" },
      { level: 3, description: "Apply the profit margin", hint: "CP/kg × 1.2 = ?" }
    ],
    forwardRiskLinks: [
      { targetSkillId: "MEASMONEY-06", probability: 0.35, condition: "Skipping the weighted-average step when mixing quantities at different unit prices recurs in blended-rate and alligation problems." }
    ],
    learningObjectives: []
  },
  {
    itemId: "w6",
    order: 6,
    cluster: "PAV",
    clusterName: CLUSTER_NAMES.PAV,
    skillId: "MEASPAV-09",
    question: "A cuboid has volume 480 cm³. Its length is 10 cm and breadth is 8 cm. Find its height and total surface area.",
    options: [
        { text: "Height 6 cm, surface area 376 cm²", correct: true, feedback: "Height = 480/(10×8) = 6 cm. SA = 2(10×8 + 8×6 + 10×6) = 2(80+48+60) = 376 cm²." },
        { text: "Height 6 cm, surface area 480 cm²", correct: false, feedback: "That's the volume, not surface area.", misconceptionId: "E-w6-a" },
        { text: "Height 5 cm, surface area 340 cm²", correct: false, feedback: "Incorrect height.", misconceptionId: "E-w6-b" },
        { text: "Height 6 cm, surface area 188 cm²", correct: false, feedback: "You halved the surface area.", misconceptionId: "E-w6-c" }
      ],
    retryHint: "First find height using volume formula. Then apply surface area formula.",
    misconceptions: [
      {
        misconceptionId: "E-w6-a",
        description: "Student correctly finds the height (6 cm) but reports the original volume (480) as the surface area instead of computing it.",
        rootCause: "Volume/Surface-Area Confusion — confuses the two different 3D measurements, reusing the volume value.",
        remediation: "Surface area and volume are different calculations — after finding height, compute surface area using SA = 2(lb+bh+lh), don't reuse the volume."
      },
      {
        misconceptionId: "E-w6-b",
        description: "Student makes an error finding the height, using an incorrect divisor or miscalculating 480 ÷ 80.",
        rootCause: "Height Computation Error — miscalculates the height from the volume formula.",
        remediation: "Height = Volume ÷ (length × breadth) = 480 ÷ (10×8) = 480 ÷ 80 = 6 — recheck this division."
      },
      {
        misconceptionId: "E-w6-c",
        description: "Student correctly computes each face-pair area but forgets to double the sum, halving the correct surface area.",
        rootCause: "Missing-Doubling Step — forgets the surface area formula requires doubling the sum of the three face areas (since each face has a matching opposite face).",
        remediation: "A cuboid has 6 faces in 3 matching pairs — after summing one of each pair (lb+bh+lh=188), DOUBLE it for all 6 faces: 2×188=376."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the height", hint: "Height = Volume ÷ (length × breadth) = 480 ÷ 80." },
      { level: 2, description: "Find the three face areas", hint: "lb=80, bh=8×6=48, lh=10×6=60." },
      { level: 3, description: "Sum and double", hint: "(80+48+60) × 2 = ?" }
    ],
    forwardRiskLinks: [
      { targetSkillId: "MEASPAV-04", probability: 0.3, condition: "Forgetting to double the summed face areas recurs whenever surface area of a cuboid or cube is computed." }
    ],
    learningObjectives: ["CCSS.MATH.CONTENT.5.MD.C.5"]
  },
  {
    itemId: "w7",
    order: 7,
    cluster: "LENGTH",
    clusterName: CLUSTER_NAMES.LENGTH,
    skillId: "MEASPAV-10",
    question: "A wire of length 64 cm is bent to form a rectangle. The length is three times the breadth. Find the area of the rectangle.",
    options: [
        { text: "192 cm²", correct: true, feedback: "Let b=x, l=3x. Perimeter = 2(3x+x)=8x=64 → x=8. l=24, b=8. Area = 24×8 = 192 cm²." },
        { text: "256 cm²", correct: false, feedback: "That would be a square of side 16 cm.", misconceptionId: "E-w7-a" },
        { text: "48 cm²", correct: false, feedback: "You might have used 1/4 of perimeter as side?", misconceptionId: "E-w7-b" },
        { text: "96 cm²", correct: false, feedback: "Incorrect calculation.", misconceptionId: "E-w7-c" }
      ],
    retryHint: "Use perimeter to find length and breadth, then area.",
    misconceptions: [
      {
        misconceptionId: "E-w7-a",
        description: "Student treats the shape as a square (side 16 cm, from 64÷4) instead of a rectangle with a 3:1 length-to-breadth ratio.",
        rootCause: "Ratio Condition Ignored — applies the simple square perimeter formula, ignoring the stated 3:1 ratio between length and breadth.",
        remediation: "The question specifies length = 3 × breadth, which means the shape is a RECTANGLE, not a square — set up the ratio equation instead of dividing by 4."
      },
      {
        misconceptionId: "E-w7-b",
        description: "Student divides the perimeter by 4 to get a single 'side' value (16), then incorrectly halves or quarters it further to get 8, treating it as an area directly instead of solving the ratio equation.",
        rootCause: "Perimeter Division Misapplied — misapplies the square-perimeter shortcut (÷4) to a non-square rectangle with a ratio condition.",
        remediation: "Since length ≠ breadth here, don't divide by 4 — instead set breadth=x, length=3x, and solve 2(3x+x)=64 for x."
      },
      {
        misconceptionId: "E-w7-c",
        description: "Student sets up the ratio equation but makes a computational error, landing on 96 instead of 192.",
        rootCause: "Equation-Solving Error — a miscalculation somewhere in solving for x or computing the final area.",
        remediation: "Solve step by step: 8x=64, so x=8. Then breadth=8, length=24. Area = 24×8=192 — recheck each step."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Set up the ratio equation", hint: "Let breadth = x, length = 3x." },
      { level: 2, description: "Apply the perimeter formula", hint: "2(3x + x) = 64." },
      { level: 3, description: "Solve for x and find area", hint: "8x=64, so x=8. Then compute length × breadth." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "ALGEBRA-EQ-01", probability: 0.4, condition: "Setting up and solving a ratio-based perimeter equation is a direct precursor to algebraic word-problem skills." }
    ],
    learningObjectives: ["CCSS.MATH.CONTENT.5.MD.C.5"]
  },
  {
    itemId: "w8",
    order: 8,
    cluster: "CAP",
    clusterName: CLUSTER_NAMES.CAP,
    skillId: "MEASCAP-08",
    question: "A tap fills a tank in 4 hours. Another tap empties it in 6 hours. If both are opened together, how long will it take to fill the tank?",
    options: [
        { text: "12 h", correct: true, feedback: "In 1 h, fills 1/4 and empties 1/6. Net fill = 1/4−1/6 = 1/12. Time = 12 h." },
        { text: "2 h", correct: false, feedback: "You added the rates instead of subtracting.", misconceptionId: "E-w8-a" },
        { text: "10 h", correct: false, feedback: "You subtracted the times: 6−4=2? No.", misconceptionId: "E-w8-b" },
        { text: "24 h", correct: false, feedback: "You multiplied the times.", misconceptionId: "E-w8-c" }
      ],
    retryHint: "Find net fraction filled per hour, then take reciprocal for total hours.",
    misconceptions: [
      {
        misconceptionId: "E-w8-a",
        description: "Student adds the fill rate and empty rate (1/4+1/6) instead of subtracting, treating both pipes as filling.",
        rootCause: "Fill/Empty Rate Sign Confusion — doesn't treat the emptying pipe's rate as a SUBTRACTION from the filling rate.",
        remediation: "The emptying pipe works AGAINST the filling pipe — its rate must be SUBTRACTED, not added: net rate = 1/4 - 1/6, not 1/4 + 1/6."
      },
      {
        misconceptionId: "E-w8-b",
        description: "Student subtracts the raw hour values (6-4=2) instead of working with the rates (fractions of the tank filled per hour).",
        rootCause: "Rate vs. Time Confusion — subtracts the TIME values directly instead of converting to per-hour RATES first.",
        remediation: "Don't subtract the hours directly — convert each to a RATE first (1/4 per hour, 1/6 per hour), find the net rate, THEN take the reciprocal for time."
      },
      {
        misconceptionId: "E-w8-c",
        description: "Student multiplies the two times (4×6=24) instead of computing the net rate and its reciprocal.",
        rootCause: "Wrong Operation for Combined Rates — uses multiplication instead of the rate-subtraction-then-reciprocal method for combined fill/empty problems.",
        remediation: "Combined rate problems require finding each pipe's RATE (1/time), combining them (add for both filling, subtract if one empties), then taking the reciprocal of the net rate."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find each pipe's hourly rate", hint: "Filling: 1/4 of tank per hour. Emptying: 1/6 of tank per hour." },
      { level: 2, description: "Find the net rate", hint: "1/4 - 1/6 = ?" },
      { level: 3, description: "Take the reciprocal for time", hint: "If net rate is 1/12 per hour, total time = ?" }
    ],
    forwardRiskLinks: [
      { targetSkillId: "MEASCAP-06", probability: 0.4, condition: "Combined-rate (pipes and cisterns) reasoning is a classic precursor skill for work-rate and speed-time-distance problems." }
    ],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NF.B.3"]
  }
];

const diagnosticItems = [
  {
    itemId: "d1",
    order: 1,
    cluster: "LENGTH",
    clusterName: CLUSTER_NAMES.LENGTH,
    skillId: "MEASPAV-08",
    question: "A rectangular park is 200 m by 150 m. A 3 m wide path runs along the outside of the boundary. Find the area of the path. Then find the cost of paving it at ₹25 per square metre.",
    options: [
        { text: "₹53,400", correct: true, feedback: "Outer = 206×156 = 32136 m². Inner = 30000 m². Path = 2136 m². Cost = 2136×25 = ₹53,400." },
        { text: "₹15,000", correct: false, feedback: "You multiplied perimeter by width (700×3? No).", misconceptionId: "E-d1-a" },
        { text: "₹26,700", correct: false, feedback: "You halved the cost.", misconceptionId: "E-d1-b" },
        { text: "₹50,000", correct: false, feedback: "Approximation, not exact.", misconceptionId: "E-d1-c" }
      ],
    backward: "Extend length and width by twice the path width; find difference of areas; multiply by cost.",
    forward: "Construction and landscaping projects use such calculations.",
    misconceptions: [
      {
        misconceptionId: "E-d1-a",
        description: "Student uses the perimeter × path width shortcut instead of the outer-minus-inner-area method, which doesn't correctly account for the four corner squares.",
        rootCause: "Perimeter-Times-Width Shortcut Error — approximates the path area as a simple strip (perimeter × width), missing the corner overlaps.",
        remediation: "For a path OUTSIDE a rectangle, always compute the FULL outer area (adding 2×path-width to each dimension) minus the inner area — don't use perimeter × width, which misses the corners."
      },
      {
        misconceptionId: "E-d1-b",
        description: "Student computes the correct path area and cost but then halves the final cost unnecessarily.",
        rootCause: "Extraneous Halving Step — applies an unneeded division by 2 after correctly computing the cost.",
        remediation: "Once path area (2136 m²) is multiplied by the rate (₹25) to get ₹53,400, no further halving is needed — that is the final cost."
      },
      {
        misconceptionId: "E-d1-c",
        description: "Student estimates or rounds the answer rather than computing it exactly, landing on an approximate ₹50,000.",
        rootCause: "Estimation Instead of Exact Computation — rounds intermediate values instead of carrying exact numbers through the calculation.",
        remediation: "Work with exact values at each step: outer area = 206×156=32136, inner area=200×150=30000, path=2136, cost=2136×25=53400 — avoid rounding until the final answer."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the outer dimensions", hint: "Path is OUTSIDE, so outer length = 200+2×3=206, outer width = 150+2×3=156." },
      { level: 2, description: "Find both areas and subtract", hint: "Outer area - inner area (200×150) = path area." },
      { level: 3, description: "Compute the cost", hint: "Path area × ₹25 per m² = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.MD.C.5"]
  },
  {
    itemId: "d2",
    order: 2,
    cluster: "MASS",
    clusterName: CLUSTER_NAMES.MASS,
    skillId: "MEASMASS-09",
    question: "A grocer mixes 12 kg of rice at ₹45/kg and 8 kg of rice at ₹60/kg. He sells the mixture at a profit of 25%. What is the selling price per kg of the mixture?",
    options: [
        { text: "₹63.75", correct: true, feedback: "Total CP = 12×45 + 8×60 = 1020. Total kg = 20. CP/kg = 51. SP/kg = 51×1.25 = 63.75." },
        { text: "₹51", correct: false, feedback: "That's the cost price per kg.", misconceptionId: "E-d2-a" },
        { text: "₹55", correct: false, feedback: "Incorrect profit calculation.", misconceptionId: "E-d2-b" },
        { text: "₹76.50", correct: false, feedback: "You applied profit to total CP instead of per kg.", misconceptionId: "E-d2-c" }
      ],
    backward: "Find total cost, average cost per kg, then add profit percentage.",
    forward: "Business and commerce use weighted averages with profit.",
    misconceptions: [
      {
        misconceptionId: "E-d2-a",
        description: "Student correctly finds the cost price per kg (₹51) but stops there without applying the 25% profit markup.",
        rootCause: "Final-Step Omission — treats the intermediate cost-price calculation as the complete answer.",
        remediation: "The question asks for the SELLING price to achieve a 25% profit — after finding CP/kg (51), multiply by 1.25 to get the selling price."
      },
      {
        misconceptionId: "E-d2-b",
        description: "Student applies an incorrect profit calculation, landing on ₹55 instead of ₹63.75.",
        rootCause: "Profit Percentage Computation Error — a miscalculation when applying the 25% markup.",
        remediation: "To add 25% profit to the cost price, multiply by 1.25 (not add a flat amount): 51 × 1.25 = 63.75."
      },
      {
        misconceptionId: "E-d2-c",
        description: "Student applies the 25% profit to the TOTAL cost price (1020) instead of the per-kg cost price, then divides by kg, producing an inflated per-kg result.",
        rootCause: "Order-of-Operations Confusion — applies the profit percentage before dividing by quantity, though the arithmetic still needs to land on a per-kg value at the end.",
        remediation: "Either apply profit to the TOTAL then divide by total kg, or divide by total kg FIRST then apply profit — but check your final answer's magnitude makes sense per kg (around ₹51-65), not ₹76.50."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the total cost", hint: "12×45 + 8×60 = ?" },
      { level: 2, description: "Find the cost price per kg", hint: "Total cost ÷ total kg (20) = ?" },
      { level: 3, description: "Apply the profit margin", hint: "CP/kg × 1.25 = ?" }
    ],
    forwardRiskLinks: [
      { targetSkillId: "MEASMONEY-09", probability: 0.35, condition: "Skipping the weighted-average step when mixing quantities at different unit prices recurs in blended-rate and alligation problems." }
    ],
    learningObjectives: []
  },
  {
    itemId: "d3",
    order: 3,
    cluster: "CAP",
    clusterName: CLUSTER_NAMES.CAP,
    skillId: "MEASCAP-09",
    question: "A 5‑litre bottle is 2/5 full. 750 ml is used. Then a further 1 l 250 ml is added. What fraction of the bottle is now full?",
    options: [
        { text: "\\(\\frac{1}{2}\\)", correct: true, feedback: "Initial water = 2000 ml. After use → 1250 ml. After add → 2500 ml. Fraction = 2500/5000 = 1/2." },
        { text: "\\(\\frac{1}{5}\\)", correct: false, feedback: "You only considered the initial fraction? No.", misconceptionId: "E-d3-a" },
        { text: "\\(\\frac{3}{5}\\)", correct: false, feedback: "Incorrect step.", misconceptionId: "E-d3-b" },
        { text: "\\(\\frac{2}{5}\\)", correct: false, feedback: "No change considered.", misconceptionId: "E-d3-c" }
      ],
    backward: "Convert to ml, apply changes step‑by‑step, then find final fraction.",
    forward: "Tracking liquid volumes through multiple changes.",
    misconceptions: [
      {
        misconceptionId: "E-d3-a",
        description: "Student loses track of the running total through the multi-step process, landing on a fraction much smaller than the correct 1/2.",
        rootCause: "Multi-Step Tracking Error — a computational slip somewhere in the sequence of use/add operations.",
        remediation: "Track the volume step by step: start at 2000 ml, after using 750 ml it's 1250 ml, after adding 1250 ml it's 2500 ml — verify each step."
      },
      {
        misconceptionId: "E-d3-b",
        description: "Student stops after only the first change (using 750 ml) without applying the second change (adding 1 l 250 ml), or makes an error combining the two changes.",
        rootCause: "Multi-Step Process Abandoned — doesn't carry through all the changes described in the question.",
        remediation: "The question describes TWO sequential changes (use, then add) — apply BOTH in order to the running total before finding the final fraction."
      },
      {
        misconceptionId: "E-d3-c",
        description: "Student reports the ORIGINAL fraction (2/5) without applying any of the described changes.",
        rootCause: "Changes Not Applied — ignores the sequence of use/add actions described in the question, using only the starting value.",
        remediation: "The question describes water being used AND added — you must apply both changes to the starting amount before finding the final fraction, not just report the starting fraction."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the starting amount", hint: "2/5 of 5000 ml = 2000 ml." },
      { level: 2, description: "Apply each change in order", hint: "2000 - 750 = 1250 ml, then 1250 + 1250 = 2500 ml." },
      { level: 3, description: "Form the final fraction", hint: "2500 ml out of 5000 ml total = ?" }
    ],
    forwardRiskLinks: [
      { targetSkillId: "DECADDSUB-06", probability: 0.35, condition: "Losing track of a running total through a multi-step sequence recurs in longer chained word problems." }
    ],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NF.A.1"]
  },
  {
    itemId: "d4",
    order: 4,
    cluster: "TIME",
    clusterName: CLUSTER_NAMES.TIME,
    skillId: "MEASTIME-09",
    question: "A car travels 120 km in 2.5 hours, then another 80 km in 1.5 hours. Find the average speed for the entire journey in km/h.",
    options: [
        { text: "50 km/h", correct: true, feedback: "Total distance = 200 km. Total time = 4 h. Average speed = 200/4 = 50 km/h." },
        { text: "48 km/h", correct: false, feedback: "You averaged the speeds (48 and 53.33) incorrectly.", misconceptionId: "E-d4-a" },
        { text: "53.33 km/h", correct: false, feedback: "That's the speed of the second segment only.", misconceptionId: "E-d4-b" },
        { text: "200 km/h", correct: false, feedback: "Incorrect.", misconceptionId: "E-d4-c" }
      ],
    backward: "Average speed = total distance ÷ total time.",
    forward: "Physics and travel planning.",
    misconceptions: [
      {
        misconceptionId: "E-d4-a",
        description: "Student averages the two segment speeds (120/2.5=48 and 80/1.5≈53.33) directly instead of using total distance ÷ total time.",
        rootCause: "Simple Average of Rates Fallacy — incorrectly averages two speeds instead of computing the true weighted average speed.",
        remediation: "Average speed is NEVER the simple average of individual speeds when time segments differ — always use TOTAL distance ÷ TOTAL time: 200 km ÷ 4 h = 50 km/h."
      },
      {
        misconceptionId: "E-d4-b",
        description: "Student reports only the second segment's speed (80÷1.5≈53.33) as if it represented the whole journey's average.",
        rootCause: "Partial Segment Reported — uses only one segment's speed instead of combining both segments.",
        remediation: "Average speed must account for the ENTIRE journey — add both distances (120+80=200) and both times (2.5+1.5=4), then divide."
      },
      {
        misconceptionId: "E-d4-c",
        description: "Student reports the total distance (200) directly as the speed, without dividing by the total time.",
        rootCause: "Division Step Omitted — forgets to divide distance by time to get a speed (a rate), leaving a raw distance value instead.",
        remediation: "Speed = distance ÷ time — after finding total distance (200 km) and total time (4 h), you must DIVIDE them: 200 ÷ 4 = 50 km/h."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the total distance", hint: "120 + 80 = ?" },
      { level: 2, description: "Find the total time", hint: "2.5 + 1.5 = ?" },
      { level: 3, description: "Divide", hint: "Total distance ÷ total time = ?" }
    ],
    forwardRiskLinks: [
      { targetSkillId: "MEASTIME-06", probability: 0.4, condition: "The simple-average-of-rates fallacy recurs whenever average speed, average price, or any rate is computed across unequal segments." }
    ],
    learningObjectives: []
  },
  {
    itemId: "d5",
    order: 5,
    cluster: "MONEY",
    clusterName: CLUSTER_NAMES.MONEY,
    skillId: "MEASMONEY-10",
    question: "₹5000 is deposited at 8% simple interest per annum. After 2 years, ₹2000 is withdrawn. What is the total interest earned over 4 years?",
    options: [
        { text: "₹1280", correct: true, feedback: "First 2 years: 5000×8×2/100 = ₹800. Remaining principal = ₹3000. Next 2 years: 3000×8×2/100 = ₹480. Total = ₹1280." },
        { text: "₹1600", correct: false, feedback: "You assumed the whole ₹5000 earned interest for 4 years.", misconceptionId: "E-d5-a" },
        { text: "₹800", correct: false, feedback: "Only the first two years.", misconceptionId: "E-d5-b" },
        { text: "₹2080", correct: false, feedback: "Incorrect calculation.", misconceptionId: "E-d5-c" }
      ],
    backward: "Calculate interest for each period separately based on the principal during that period.",
    forward: "Banking with partial withdrawals.",
    misconceptions: [
      {
        misconceptionId: "E-d5-a",
        description: "Student computes interest as if the full ₹5000 remained deposited for all 4 years, ignoring the ₹2000 withdrawal after year 2.",
        rootCause: "Principal Change Ignored — doesn't account for the reduced principal after the partial withdrawal.",
        remediation: "The principal CHANGES after the withdrawal — compute interest for the first 2 years on ₹5000, then separately for the next 2 years on the REDUCED principal (₹3000)."
      },
      {
        misconceptionId: "E-d5-b",
        description: "Student computes only the interest for the first 2 years and stops, forgetting the interest continues to accrue (on the reduced principal) for the remaining 2 years.",
        rootCause: "Multi-Period Process Abandoned — doesn't continue the calculation for the second period after the withdrawal.",
        remediation: "The deposit earns interest for the FULL 4 years, just at different principal amounts in each period — compute BOTH periods and add them together."
      },
      {
        misconceptionId: "E-d5-c",
        description: "Student makes a computational error in one of the two period calculations, or miscombines them, landing on ₹2080.",
        rootCause: "Multi-Period Computation Error — a miscalculation in one of the two separate interest calculations.",
        remediation: "Compute each period separately and check: Period 1 = 5000×8×2/100=800. Period 2 = 3000×8×2/100=480. Total = 800+480=1280 — verify each part."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find interest for the first period", hint: "5000 × 8 × 2 / 100 = ?" },
      { level: 2, description: "Find the new principal after withdrawal", hint: "5000 - 2000 = 3000." },
      { level: 3, description: "Find interest for the second period and add", hint: "3000 × 8 × 2 / 100 = ? Then add to the first period's interest." }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d6",
    order: 6,
    cluster: "PAV",
    clusterName: CLUSTER_NAMES.PAV,
    skillId: "MEASPAV-11",
    question: "A solid cube of side 10 cm has a smaller cube of side 4 cm removed from one corner. Find the remaining volume and its weight if 1 cm³ weighs 2 g. Express the weight in kg.",
    options: [
        { text: "1.872 kg", correct: true, feedback: "Volume = 1000−64 = 936 cm³. Mass = 936×2 = 1872 g = 1.872 kg." },
        { text: "2 kg", correct: false, feedback: "You used the whole cube's weight (1000×2=2000 g = 2 kg).", misconceptionId: "E-d6-a" },
        { text: "0.936 kg", correct: false, feedback: "You used density 1 g/cm³ instead of 2 g/cm³.", misconceptionId: "E-d6-b" },
        { text: "1872 g", correct: false, feedback: "The answer should be in kg as requested.", misconceptionId: "E-d6-c" }
      ],
    backward: "Find volume of whole, subtract removed part, multiply by density, convert to kg.",
    forward: "Engineering and material science.",
    misconceptions: [
      {
        misconceptionId: "E-d6-a",
        description: "Student computes the weight of the WHOLE original cube, forgetting to first subtract the removed smaller cube's volume.",
        rootCause: "Removed-Portion Not Subtracted — doesn't account for the smaller cube being removed before computing weight.",
        remediation: "Find the REMAINING volume first (1000 - 64 = 936 cm³), not the whole cube's volume, before multiplying by density."
      },
      {
        misconceptionId: "E-d6-b",
        description: "Student uses a density of 1 g/cm³ instead of the stated 2 g/cm³, halving the correct weight.",
        rootCause: "Rate Misread — substitutes a different density than the one given in the question.",
        remediation: "Re-check the density stated: 1 cm³ weighs 2 g, not 1 g — multiply the remaining volume (936 cm³) by 2, not 1."
      },
      {
        misconceptionId: "E-d6-c",
        description: "Student correctly computes the mass in grams (1872 g) but doesn't convert it to kg as the question requests.",
        rootCause: "Unit Conversion Omitted — doesn't convert the final answer to the unit requested by the question.",
        remediation: "The question explicitly asks to 'express the weight in kg' — convert 1872 g ÷ 1000 = 1.872 kg before answering."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the remaining volume", hint: "1000 cm³ (whole cube) - 64 cm³ (removed cube) = ?" },
      { level: 2, description: "Find the mass in grams", hint: "Multiply remaining volume by the density (2 g/cm³)." },
      { level: 3, description: "Convert to kg", hint: "1872 g ÷ 1000 = ? kg." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.MD.C.5"]
  },
  {
    itemId: "d7",
    order: 7,
    cluster: "LENGTH",
    clusterName: CLUSTER_NAMES.LENGTH,
    skillId: "MEASPAV-10",
    question: "The area of a rectangle is 300 cm². Its length is 4/3 of its breadth. Find its perimeter.",
    options: [
        { text: "70 cm", correct: true, feedback: "Let b=x, l=(4/3)x. Area = (4/3)x² = 300 → x²=225 → x=15. b=15 cm, l=20 cm. Perimeter = 2(20+15) = 70 cm." },
        { text: "60 cm", correct: false, feedback: "You might have used l=20,b=10?", misconceptionId: "E-d7-a" },
        { text: "80 cm", correct: false, feedback: "Incorrect.", misconceptionId: "E-d7-b" },
        { text: "140 cm", correct: false, feedback: "You doubled the correct perimeter.", misconceptionId: "E-d7-c" }
      ],
    backward: "Set up equation using area and ratio. Solve for dimensions, then perimeter.",
    forward: "Linking algebra and geometry.",
    misconceptions: [
      {
        misconceptionId: "E-d7-a",
        description: "Student finds an incorrect breadth (e.g. 10 instead of 15), perhaps from an arithmetic slip solving for x, leading to a wrong perimeter.",
        rootCause: "Equation-Solving Error — a miscalculation when solving x²=225 for x.",
        remediation: "Solve carefully: (4/3)x²=300 means x²=300×(3/4)=225, so x=√225=15 — recheck this square root."
      },
      {
        misconceptionId: "E-d7-b",
        description: "Student sets up the ratio or area equation incorrectly, leading to different (wrong) dimensions and an incorrect perimeter of 80.",
        rootCause: "Ratio Equation Setup Error — misapplies the length-to-breadth ratio when forming the area equation.",
        remediation: "Set breadth=x and length=(4/3)x explicitly, then area = length × breadth = (4/3)x × x = (4/3)x² — verify this setup before solving."
      },
      {
        misconceptionId: "E-d7-c",
        description: "Student correctly finds the dimensions and computes the perimeter but then doubles it unnecessarily.",
        rootCause: "Extraneous Doubling Step — applies an unneeded multiplication by 2 after correctly computing the perimeter.",
        remediation: "Once perimeter = 2×(20+15) = 70 is computed, that IS the final answer — no further doubling is needed."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Set up the ratio equation", hint: "Let breadth = x, length = (4/3)x." },
      { level: 2, description: "Apply the area formula", hint: "(4/3)x × x = 300, so x² = 225." },
      { level: 3, description: "Solve for x and find the perimeter", hint: "x=15 (breadth), so length=20. Perimeter = 2×(20+15)." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "ALGEBRA-EQ-01", probability: 0.4, condition: "Setting up and solving a ratio-based area equation is a direct precursor to algebraic word-problem skills." }
    ],
    learningObjectives: ["CCSS.MATH.CONTENT.5.MD.C.5"]
  },
  {
    itemId: "d8",
    order: 8,
    cluster: "MASS",
    clusterName: CLUSTER_NAMES.MASS,
    skillId: "MEASMASS-08",
    question: "A truck carries 250 identical boxes. Total loaded truck mass is 5000 kg; empty truck mass is 1500 kg. Each box contains 24 packets, and the packaging of each box weighs 200 g. Find the mass of one packet in grams.",
    options: [
        { text: "575 g", correct: true, feedback: "Net mass of boxes = 3500 kg = 3,500,000 g. 250×(M+200) = 3,500,000 → M+200 = 14,000 → M = 13,800 g. One packet = 13,800/24 = 575 g." },
        { text: "600 g", correct: false, feedback: "Incorrect calculation.", misconceptionId: "E-d8-a" },
        { text: "550 g", correct: false, feedback: "Off by 25 g.", misconceptionId: "E-d8-b" },
        { text: "500 g", correct: false, feedback: "You might have forgotten the packaging.", misconceptionId: "E-d8-c" }
      ],
    backward: "Subtract truck weight, convert to grams, account for packaging, then divide by number of packets.",
    forward: "Logistics and inventory.",
    misconceptions: [
      {
        misconceptionId: "E-d8-a",
        description: "Student makes a computational error in the multi-step process (e.g. incorrect net mass or division), landing on 600 g instead of 575 g.",
        rootCause: "Multi-Step Computation Error — a miscalculation somewhere in the chain of subtraction, conversion, and division.",
        remediation: "Work through each step carefully: net mass = 3500 kg = 3,500,000 g. Per box (including packaging) = 3,500,000/250=14,000 g. Subtract packaging (200g) to get 13,800g per box's packets, then divide by 24."
      },
      {
        misconceptionId: "E-d8-b",
        description: "Student makes a smaller computational error, landing 25 g below the correct value.",
        rootCause: "Multi-Step Computation Error — a smaller miscalculation somewhere in the chain.",
        remediation: "Recheck the final division: 13,800 g ÷ 24 packets = 575 g — verify by multiplying 575 × 24 to see if it returns 13,800."
      },
      {
        misconceptionId: "E-d8-c",
        description: "Student forgets to subtract the box's packaging weight (200 g) before dividing by the 24 packets, treating the whole box's contents as pure packets.",
        rootCause: "Packaging Weight Not Subtracted — ignores the packaging component when isolating the packets' total mass.",
        remediation: "Each box's mass (14,000 g) includes BOTH packets AND packaging — subtract the 200 g packaging first: 14,000 - 200 = 13,800 g, THEN divide by 24 packets."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the net mass of the boxes", hint: "5000 kg - 1500 kg (empty truck) = 3500 kg = 3,500,000 g." },
      { level: 2, description: "Find the mass of one box (with packaging)", hint: "3,500,000 ÷ 250 = ?" },
      { level: 3, description: "Subtract packaging and divide by packets", hint: "Mass per box - 200 g = packets' mass, then ÷ 24." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.MD.A.1"]
  },
  {
    itemId: "d9",
    order: 9,
    cluster: "CAP",
    clusterName: CLUSTER_NAMES.CAP,
    skillId: "MEASCAP-08",
    question: "A cistern has two inlet pipes and one outlet pipe. The first inlet fills it in 3 h, the second in 4 h. The outlet empties it in 6 h. If all three are opened together, how long to fill the cistern?",
    options: [
        { text: "2 h 24 min", correct: true, feedback: "In 1 h: 1/3 + 1/4 − 1/6 = (4+3−2)/12 = 5/12. Time = 12/5 = 2.4 h = 2 h 24 min." },
        { text: "2 h", correct: false, feedback: "You may have added only the inlets.", misconceptionId: "E-d9-a" },
        { text: "3 h", correct: false, feedback: "Incorrect.", misconceptionId: "E-d9-b" },
        { text: "1 h 12 min", correct: false, feedback: "You added rates incorrectly.", misconceptionId: "E-d9-c" }
      ],
    backward: "Add the fill rates, subtract the empty rate; take reciprocal for time.",
    forward: "Classic pipe and cistern problems.",
    misconceptions: [
      {
        misconceptionId: "E-d9-a",
        description: "Student adds only the two inlet rates (1/3+1/4=7/12) and forgets to subtract the outlet's emptying rate, undercounting the time needed.",
        rootCause: "Empty Rate Omitted — forgets to account for the outlet pipe working against the two inlets.",
        remediation: "All THREE pipes affect the net rate — combine the two inlet rates AND subtract the outlet rate: 1/3+1/4-1/6, not just 1/3+1/4."
      },
      {
        misconceptionId: "E-d9-b",
        description: "Student makes an error in the combined rate calculation, landing on a net time of 3 h instead of 2 h 24 min.",
        rootCause: "Combined Rate Computation Error — a miscalculation in combining the three individual rates.",
        remediation: "Find a common denominator (12) for all three rates: 1/3=4/12, 1/4=3/12, 1/6=2/12 — then compute (4+3-2)/12=5/12, and take the reciprocal."
      },
      {
        misconceptionId: "E-d9-c",
        description: "Student miscombines the rates (perhaps subtracting an inlet instead of the outlet), landing on 1 h 12 min instead of 2 h 24 min.",
        rootCause: "Rate Sign Confusion — subtracts the wrong pipe's rate or misassigns which pipes are filling versus emptying.",
        remediation: "Both inlet pipes ADD to the fill rate; only the outlet pipe SUBTRACTS — double-check which rate gets the minus sign before combining."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find each pipe's hourly rate", hint: "Inlet 1: 1/3. Inlet 2: 1/4. Outlet: 1/6 (subtracts)." },
      { level: 2, description: "Combine with a common denominator", hint: "1/3=4/12, 1/4=3/12, 1/6=2/12. Net = (4+3-2)/12." },
      { level: 3, description: "Take the reciprocal for time", hint: "If net rate is 5/12 per hour, total time = 12/5 hours." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NF.B.3"]
  },
  {
    itemId: "d10",
    order: 10,
    cluster: "TIME",
    clusterName: CLUSTER_NAMES.TIME,
    skillId: "MEASTIME-10",
    question: "A and B start from the same point. A walks at 5 km/h, B at 7 km/h in the opposite direction. After how many hours will they be 36 km apart?",
    options: [
        { text: "3 h", correct: true, feedback: "Relative speed = 5+7 = 12 km/h. Time = 36/12 = 3 h." },
        { text: "5 h", correct: false, feedback: "You used average speed? 36/7? No.", misconceptionId: "E-d10-a" },
        { text: "2 h", correct: false, feedback: "36/18? No.", misconceptionId: "E-d10-b" },
        { text: "1.5 h", correct: false, feedback: "Half of 3.", misconceptionId: "E-d10-c" }
      ],
    backward: "Since opposite directions, speeds add. Time = distance / relative speed.",
    forward: "Relative motion in physics.",
    misconceptions: [
      {
        misconceptionId: "E-d10-a",
        description: "Student divides 36 by only one person's speed (7) instead of the combined relative speed of both walkers.",
        rootCause: "Relative Speed Not Combined — uses only one walker's speed, ignoring that BOTH are moving apart simultaneously.",
        remediation: "When two people move in OPPOSITE directions, their speeds ADD to give the relative speed at which they separate: 5+7=12 km/h, not just one person's speed."
      },
      {
        misconceptionId: "E-d10-b",
        description: "Student uses an incorrect relative speed value (like 18) instead of the correct sum of 12.",
        rootCause: "Relative Speed Computation Error — miscalculates the combined speed of the two walkers.",
        remediation: "Recompute: relative speed = 5 + 7 = 12 km/h (not 18) — since they move in opposite directions, add their speeds exactly."
      },
      {
        misconceptionId: "E-d10-c",
        description: "Student halves the correct answer, perhaps by using only one walker's contribution to the distance instead of the full 36 km.",
        rootCause: "Distance Halved Incorrectly — assumes only half the 36 km gap needs to be accounted for.",
        remediation: "The FULL 36 km gap is created by both walkers moving apart together — divide the full 36 km by the combined relative speed, not half of it."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the relative speed", hint: "Since they move in opposite directions, add the speeds: 5+7." },
      { level: 2, description: "Set up the time formula", hint: "Time = distance ÷ relative speed." },
      { level: 3, description: "Compute", hint: "36 ÷ 12 = ?" }
    ],
    forwardRiskLinks: [
      { targetSkillId: "MEASTIME-09", probability: 0.35, condition: "Confusing relative speed (opposite-direction motion) with individual speeds recurs in more advanced relative-motion problems." }
    ],
    learningObjectives: []
  },
  {
    itemId: "d11",
    order: 11,
    cluster: "MONEY",
    clusterName: CLUSTER_NAMES.MONEY,
    skillId: "MEASMONEY-11",
    question: "A shopkeeper marks a shirt at 40% above cost price and then gives a discount of 20% on the marked price. Find his profit percentage.",
    options: [
        { text: "12% profit", correct: true, feedback: "Let CP = ₹100. Marked = ₹140. Discount = 28, SP = ₹112. Profit = 12%." },
        { text: "20% profit", correct: false, feedback: "You ignored the discount.", misconceptionId: "E-d11-a" },
        { text: "8% profit", correct: false, feedback: "Incorrect calculation.", misconceptionId: "E-d11-b" },
        { text: "10% loss", correct: false, feedback: "Incorrect.", misconceptionId: "E-d11-c" }
      ],
    backward: "Calculate marked price, then discount, then compare SP to CP.",
    forward: "Retail markup and discount combined.",
    misconceptions: [
      {
        misconceptionId: "E-d11-a",
        description: "Student assumes the markup percentage (40%) simply minus the discount percentage (20%) gives the profit (20%), ignoring that the discount applies to the marked price, not the cost price.",
        rootCause: "Percentage Subtraction Fallacy — incorrectly subtracts two percentages that apply to DIFFERENT base values (markup on CP, discount on marked price).",
        remediation: "Markup and discount don't simply subtract — the discount is applied to the MARKED price (140), not the cost price — compute the actual selling price step by step: 140 × 0.8 = 112, then compare to CP=100."
      },
      {
        misconceptionId: "E-d11-b",
        description: "Student makes a computational error in finding the marked price, discount, or final selling price, landing on 8% instead of 12%.",
        rootCause: "Multi-Step Computation Error — a miscalculation somewhere in the markup-then-discount chain.",
        remediation: "Use CP=100 as a base: Marked = 100×1.4=140. Discount amount = 140×0.2=28. SP = 140-28=112. Profit = SP-CP = 112-100 = 12, which is 12% of CP=100."
      },
      {
        misconceptionId: "E-d11-c",
        description: "Student miscalculates and concludes the shopkeeper actually loses money, when the combined markup and discount still yields a net profit.",
        rootCause: "Sign Error in Combined Markup/Discount — incorrectly concludes a loss when the final SP is still above CP.",
        remediation: "Compare the FINAL selling price (112) to the cost price (100) directly — since 112 > 100, this is a PROFIT, not a loss."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Assume a convenient cost price", hint: "Let CP = ₹100." },
      { level: 2, description: "Find the marked price and the discount", hint: "Marked = 100×1.4=140. Discount = 140×0.2=28." },
      { level: 3, description: "Find SP and compare to CP", hint: "SP = 140-28=112. Profit % = (SP-CP)/CP × 100." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "MEASMONEY-06", probability: 0.4, condition: "The percentage-subtraction fallacy (combining markup and discount incorrectly) recurs whenever successive percentage changes are applied to different base values." }
    ],
    learningObjectives: []
  },
  {
    itemId: "d12",
    order: 12,
    cluster: "PAV",
    clusterName: CLUSTER_NAMES.PAV,
    skillId: "MEASPAV-12",
    question: "A cuboid has length, breadth, and height in the ratio 2:1:3. Its volume is 384 cm³. If the length is doubled and the height is halved, what is the new volume?",
    options: [
        { text: "384 cm³", correct: true, feedback: "Let dims = 2x, x, 3x. Volume = 6x³=384 → x³=64 → x=4. Original: 8,4,12. New: 16,4,6. Volume = 16×4×6 = 384 cm³. The doubling and halving cancel." },
        { text: "768 cm³", correct: false, feedback: "You doubled the volume.", misconceptionId: "E-d12-a" },
        { text: "192 cm³", correct: false, feedback: "You halved the volume.", misconceptionId: "E-d12-b" },
        { text: "576 cm³", correct: false, feedback: "Incorrect.", misconceptionId: "E-d12-c" }
      ],
    backward: "Find dimensions from ratio and volume, then apply changes and recalculate.",
    forward: "Scaling and transformation.",
    misconceptions: [
      {
        misconceptionId: "E-d12-a",
        description: "Student assumes doubling one dimension automatically doubles the whole volume, without recognising that halving another dimension cancels this effect.",
        rootCause: "Single-Change Volume Scaling Fallacy — doesn't account for BOTH simultaneous changes (doubling length AND halving height) when predicting the new volume.",
        remediation: "When one dimension doubles and another halves, their effects on volume CANCEL OUT (×2 × ×0.5 = ×1) — recompute the actual new dimensions and multiply them directly rather than assuming a simple doubling."
      },
      {
        misconceptionId: "E-d12-b",
        description: "Student assumes halving the height automatically halves the whole volume, ignoring that doubling the length cancels this effect.",
        rootCause: "Single-Change Volume Scaling Fallacy — the opposite error, focusing only on the halving effect and ignoring the doubling.",
        remediation: "Both changes happen together — recompute the actual new dimensions (16, 4, 6) and multiply them: 16×4×6=384, which equals the original volume since the changes cancel."
      },
      {
        misconceptionId: "E-d12-c",
        description: "Student makes an error finding the original dimensions from the ratio and volume, leading to an incorrect new volume.",
        rootCause: "Ratio-to-Dimensions Computation Error — a miscalculation solving x³=64 for x, or in applying the ratio.",
        remediation: "Solve x³=64 carefully: x=4 (since 4×4×4=64). Original dimensions are 2x=8, x=4, 3x=12 — verify these multiply to give the stated volume 384 (8×4×12=384) before applying the changes."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the original dimensions", hint: "Let dims = 2x, x, 3x. Solve 6x³=384 for x." },
      { level: 2, description: "Apply the changes", hint: "Double the length (2x→4x), halve the height (3x→1.5x)." },
      { level: 3, description: "Compute the new volume", hint: "Multiply the new dimensions together — do the changes cancel?" }
    ],
    forwardRiskLinks: [
      { targetSkillId: "MEASPAV-09", probability: 0.4, condition: "The single-change volume scaling fallacy recurs whenever multiple simultaneous scale changes are applied to a 3D shape." }
    ],
    learningObjectives: ["CCSS.MATH.CONTENT.5.MD.C.5"]
  },
  {
    itemId: "d13",
    order: 13,
    cluster: "LENGTH",
    clusterName: CLUSTER_NAMES.LENGTH,
    skillId: "MEASLEN-06",
    question: "A floor is 5.4 m long and 4.2 m wide. Square tiles of side 30 cm are used to cover it. How many tiles are needed?",
    options: [
        { text: "252", correct: true, feedback: "Area = 540×420 = 226800 cm². Tile area = 900 cm². Number = 226800/900 = 252." },
        { text: "250", correct: false, feedback: "Off by 2.", misconceptionId: "E-d13-a" },
        { text: "225", correct: false, feedback: "You divided by 100? No.", misconceptionId: "E-d13-b" },
        { text: "260", correct: false, feedback: "Incorrect.", misconceptionId: "E-d13-c" }
      ],
    backward: "Convert all to the same unit, find areas, divide.",
    forward: "Tiling and flooring estimates.",
    misconceptions: [
      {
        misconceptionId: "E-d13-a",
        description: "Student makes a small computational error in the areas or division, landing 2 tiles below the correct count.",
        rootCause: "Area/Division Computation Error — a minor miscalculation in the floor area, tile area, or the final division.",
        remediation: "Recompute each area carefully: floor area = 540×420=226800 cm², tile area = 30×30=900 cm², then divide: 226800÷900=252."
      },
      {
        misconceptionId: "E-d13-b",
        description: "Student uses an incorrect tile area (e.g. dividing by 100 instead of using the tile's actual area of 900 cm²), landing on 225.",
        rootCause: "Tile Area Miscalculated — doesn't correctly compute the tile's own area (side × side) before dividing.",
        remediation: "The tile area is side × side = 30 × 30 = 900 cm², not simply 100 — recompute this before dividing the floor area."
      },
      {
        misconceptionId: "E-d13-c",
        description: "Student makes an error in converting metres to cm or in the final division, overshooting by 8 tiles.",
        rootCause: "Unit Conversion or Division Error — a miscalculation somewhere in the conversion or division chain.",
        remediation: "Convert both floor dimensions to cm first (5.4 m=540 cm, 4.2 m=420 cm), find the floor area, then divide by the tile area (900 cm²) — check each conversion."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Convert to the same unit", hint: "5.4 m = 540 cm. 4.2 m = 420 cm." },
      { level: 2, description: "Find both areas", hint: "Floor area = 540×420. Tile area = 30×30." },
      { level: 3, description: "Divide", hint: "Floor area ÷ tile area = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.MD.C.5"]
  },
  {
    itemId: "d14",
    order: 14,
    cluster: "MASS",
    clusterName: CLUSTER_NAMES.MASS,
    skillId: "MEASMASS-10",
    question: "How many kilograms of sugar costing ₹40/kg must be mixed with 10 kg of sugar costing ₹60/kg to get a mixture worth ₹48/kg?",
    options: [
        { text: "15 kg", correct: true, feedback: "Let x kg of ₹40/kg. (40x+600)/(x+10)=48 → 40x+600=48x+480 → 8x=120 → x=15 kg." },
        { text: "20 kg", correct: false, feedback: "Incorrect equation.", misconceptionId: "E-d14-a" },
        { text: "10 kg", correct: false, feedback: "Then average would be (40×10+600)/20=50, not 48.", misconceptionId: "E-d14-b" },
        { text: "12 kg", correct: false, feedback: "Incorrect.", misconceptionId: "E-d14-c" }
      ],
    backward: "Set up weighted average equation.",
    forward: "Mixture and alligation problems.",
    misconceptions: [
      {
        misconceptionId: "E-d14-a",
        description: "Student sets up the weighted-average equation incorrectly (perhaps mismatching which quantity multiplies which price), leading to a wrong unknown quantity.",
        rootCause: "Weighted-Average Equation Setup Error — misassigns the unknown quantity or the known quantity in the mixture equation.",
        remediation: "Set up carefully: let x = unknown kg at ₹40, mixed with 10 kg at ₹60, target average ₹48 — the equation is (40x+10×60)/(x+10)=48."
      },
      {
        misconceptionId: "E-d14-b",
        description: "Student guesses a plausible quantity (10 kg, matching the known amount) without solving the actual equation.",
        rootCause: "Equation Not Solved — picks a 'nice' or symmetric-looking number instead of algebraically solving for x.",
        remediation: "Don't guess — solve the equation step by step: 40x+600=48(x+10), then 40x+600=48x+480, then 8x=120, so x=15."
      },
      {
        misconceptionId: "E-d14-c",
        description: "Student makes an algebraic error while solving the equation, landing on x=12 instead of x=15.",
        rootCause: "Equation-Solving Error — a miscalculation when isolating x.",
        remediation: "Recheck each algebraic step: 40x+600=48x+480 → subtract 40x from both sides → 600=8x+480 → subtract 480 → 120=8x → x=15."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Set up the equation", hint: "Let x = kg of ₹40/kg sugar. (40x + 10×60)/(x+10) = 48." },
      { level: 2, description: "Clear the fraction", hint: "40x + 600 = 48(x+10) = 48x + 480." },
      { level: 3, description: "Solve for x", hint: "600 - 480 = 8x. What is x?" }
    ],
    forwardRiskLinks: [
      { targetSkillId: "ALGEBRA-EQ-01", probability: 0.45, condition: "Setting up and solving a weighted-average mixture equation is a direct precursor to algebraic equation-solving skills." }
    ],
    learningObjectives: []
  },
  {
    itemId: "d15",
    order: 15,
    cluster: "CAP",
    clusterName: CLUSTER_NAMES.CAP,
    skillId: "MEASCAP-09",
    question: "A 4.5 l bottle contains juice. 2/3 of the juice is drunk, and then 1/2 of the remaining is drunk. How much juice is left in ml?",
    options: [
        { text: "750 ml", correct: true, feedback: "Initial = 4500 ml. After first drink: 1500 ml left. After second: 750 ml left." },
        { text: "1500 ml", correct: false, feedback: "You only did the first step.", misconceptionId: "E-d15-a" },
        { text: "2250 ml", correct: false, feedback: "That's the amount drunk in the first step.", misconceptionId: "E-d15-b" },
        { text: "1125 ml", correct: false, feedback: "Incorrect fraction applied.", misconceptionId: "E-d15-c" }
      ],
    backward: "Apply fractions sequentially to the remaining amount.",
    forward: "Successive fraction problems.",
    misconceptions: [
      {
        misconceptionId: "E-d15-a",
        description: "Student applies only the first fraction (2/3 drunk, leaving 1500 ml) and stops, forgetting the second drinking event.",
        rootCause: "Multi-Step Process Abandoned — doesn't apply the second fraction (1/2 of the remaining) to the already-reduced amount.",
        remediation: "The question describes TWO sequential drinking events — after finding 1500 ml remains from the first, apply the SECOND fraction (1/2) to THAT remaining amount, not stop there."
      },
      {
        misconceptionId: "E-d15-b",
        description: "Student reports the amount DRUNK in the first step (2/3 of 4500 = 3000... wait, actually reports 2250) instead of the amount REMAINING.",
        rootCause: "Wrong Value Reported — confuses the amount consumed with the amount left over.",
        remediation: "Track the REMAINING amount, not the consumed amount — after drinking 2/3, what's LEFT is 1/3 of 4500 = 1500 ml, not the amount drunk."
      },
      {
        misconceptionId: "E-d15-c",
        description: "Student applies the second fraction (1/2) to the ORIGINAL amount (4500) instead of to the already-reduced remaining amount (1500), landing on 1125 ml.",
        rootCause: "Fraction Applied to Wrong Base — uses the original total instead of the current remaining amount as the base for the second fraction.",
        remediation: "The second fraction (1/2) applies to 'the remaining' juice — that means it applies to 1500 ml (what's left after the first drink), not the original 4500 ml."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find what remains after the first drink", hint: "4500 ml × 1/3 (since 2/3 was drunk) = ?" },
      { level: 2, description: "Apply the second fraction to the remaining amount", hint: "1500 ml × 1/2 = ?" },
      { level: 3, description: "State the final amount", hint: "What's left after both drinking events?" }
    ],
    forwardRiskLinks: [
      { targetSkillId: "DECCONV-07", probability: 0.35, condition: "Applying a fraction to the wrong base (original vs. remaining) recurs in successive-percentage and successive-discount problems." }
    ],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NF.B.3"]
  },
  {
    itemId: "d16",
    order: 16,
    cluster: "TIME",
    clusterName: CLUSTER_NAMES.TIME,
    skillId: "MEASTIME-10",
    question: "A bus starts from town P at 9:00 AM at 40 km/h. Another bus starts from P at 10:30 AM at 60 km/h in the same direction. When will the second bus catch the first?",
    options: [
        { text: "1:30 PM", correct: true, feedback: "Head start = 1.5 h × 40 = 60 km. Relative speed = 20 km/h. Time to catch = 60/20 = 3 h after 10:30 → 1:30 PM." },
        { text: "12:30 PM", correct: false, feedback: "Only 2 h after 10:30.", misconceptionId: "E-d16-a" },
        { text: "2:00 PM", correct: false, feedback: "3.5 h after.", misconceptionId: "E-d16-b" },
        { text: "1:00 PM", correct: false, feedback: "2.5 h after.", misconceptionId: "E-d16-c" }
      ],
    backward: "Find head start distance, then use relative speed.",
    forward: "Catch‑up problems in motion.",
    misconceptions: [
      {
        misconceptionId: "E-d16-a",
        description: "Student underestimates the time-to-catch, perhaps miscalculating the head-start distance or relative speed, landing on 2 h instead of 3 h after 10:30.",
        rootCause: "Catch-Up Time Computation Error — a miscalculation in the head-start distance or relative speed.",
        remediation: "Recompute: head start = 1.5 h × 40 km/h = 60 km. Relative speed = 60-40=20 km/h. Time to catch = 60÷20 = 3 h, not 2 h."
      },
      {
        misconceptionId: "E-d16-b",
        description: "Student overestimates the time-to-catch, landing on 3.5 h instead of 3 h after 10:30.",
        rootCause: "Catch-Up Time Computation Error — a different miscalculation in the head-start distance or relative speed.",
        remediation: "Verify each part: the first bus has a 1.5-hour head start covering 60 km, and the second bus gains 20 km/h on the first — 60÷20=3 h exactly."
      },
      {
        misconceptionId: "E-d16-c",
        description: "Student computes a time close to but not exactly matching the correct 3-hour catch-up duration, landing on 2.5 h.",
        rootCause: "Relative Speed or Head-Start Computation Error — a miscalculation in one of the two key quantities.",
        remediation: "Break into two steps: (1) head-start distance = 1.5×40=60 km, (2) relative speed = 60-40=20 km/h, (3) time = 60÷20=3 h — check each step separately."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the head-start distance", hint: "The first bus travels alone for 1.5 h before the second starts: 1.5 × 40 = ?" },
      { level: 2, description: "Find the relative speed", hint: "The second bus gains on the first at a rate of 60-40 km/h." },
      { level: 3, description: "Find the catch-up time and add to the start time", hint: "60 ÷ 20 = 3 h after 10:30 AM." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "MEASTIME-09", probability: 0.35, condition: "Catch-up (same-direction relative motion) problems build on the same relative-speed reasoning used in opposite-direction separation problems." }
    ],
    learningObjectives: []
  },
  {
    itemId: "d17",
    order: 17,
    cluster: "MONEY",
    clusterName: CLUSTER_NAMES.MONEY,
    skillId: "MEASMONEY-12",
    question: "A TV is sold at a single discount of 10% on the marked price, but the shop still makes a profit of 25%. If the marked price is ₹36,000, what was the cost price?",
    options: [
        { text: "₹25,920", correct: true, feedback: "SP = 36000×0.9 = 32400. CP = 32400/1.25 = 25920." },
        { text: "₹28,800", correct: false, feedback: "You used 20% profit instead of 25%.", misconceptionId: "E-d17-a" },
        { text: "₹24,000", correct: false, feedback: "Incorrect.", misconceptionId: "E-d17-b" },
        { text: "₹30,000", correct: false, feedback: "You might have used only discount.", misconceptionId: "E-d17-c" }
      ],
    backward: "Find selling price after discount, then work backwards to cost price using profit%.",
    forward: "Layered commercial problems.",
    misconceptions: [
      {
        misconceptionId: "E-d17-a",
        description: "Student uses an incorrect profit percentage (like 20%) instead of the stated 25% when working backwards from SP to CP.",
        rootCause: "Rate Misread — substitutes a different profit percentage than the one given in the question.",
        remediation: "Re-check the profit percentage stated: 25% — divide the SP by 1.25 (not 1.20) to find the CP: 32400 ÷ 1.25 = 25920."
      },
      {
        misconceptionId: "E-d17-b",
        description: "Student makes a computational error in the discount or the backwards-profit calculation, landing on ₹24,000.",
        rootCause: "Multi-Step Computation Error — a miscalculation in one of the two chained steps (discount, then reverse-profit).",
        remediation: "Work through each step: SP = 36000×0.9=32400 (after discount). Then CP = SP÷1.25 = 32400÷1.25=25920 — recheck each calculation."
      },
      {
        misconceptionId: "E-d17-c",
        description: "Student applies only the discount (getting the selling price, ₹32,400, but reports a rounded or different value like ₹30,000) without working backwards through the profit percentage to find CP.",
        rootCause: "Reverse-Percentage Step Omitted — stops after finding SP, without dividing by 1.25 to find the original CP.",
        remediation: "Finding SP is only step one — you must then work BACKWARDS from SP using the profit percentage to find CP: CP = SP ÷ 1.25, not SP itself."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the selling price after discount", hint: "36000 × 0.9 = ?" },
      { level: 2, description: "Recall the profit relationship", hint: "SP = CP × 1.25, so CP = SP ÷ 1.25." },
      { level: 3, description: "Compute the cost price", hint: "32400 ÷ 1.25 = ?" }
    ],
    forwardRiskLinks: [
      { targetSkillId: "MEASMONEY-11", probability: 0.4, condition: "Working backwards through a profit percentage to find cost price recurs in more advanced layered pricing and finance problems." }
    ],
    learningObjectives: []
  },
  {
    itemId: "d18",
    order: 18,
    cluster: "PAV",
    clusterName: CLUSTER_NAMES.PAV,
    skillId: "MEASPAV-13",
    question: "A cube has volume 512 cm³. Find its surface area.",
    options: [
        { text: "384 cm²", correct: true, feedback: "Side = ∛512 = 8 cm. Surface area = 6×8² = 384 cm²." },
        { text: "512 cm²", correct: false, feedback: "That's the volume.", misconceptionId: "E-d18-a" },
        { text: "256 cm²", correct: false, feedback: "You might have used 4×side²? No.", misconceptionId: "E-d18-b" },
        { text: "64 cm²", correct: false, feedback: "That's one face.", misconceptionId: "E-d18-c" }
      ],
    backward: "Cube root the volume to get side, then 6×side².",
    forward: "3D geometry relationships.",
    misconceptions: [
      {
        misconceptionId: "E-d18-a",
        description: "Student reports the given volume (512) directly as if it were the surface area, without any calculation.",
        rootCause: "Wrong Value Reported — confuses the given volume with the requested surface area.",
        remediation: "Volume and surface area are different measurements — work through: side=∛512=8, then surface area=6×8²=384, not just restating the volume."
      },
      {
        misconceptionId: "E-d18-b",
        description: "Student uses an incorrect multiplier (like 4 instead of 6) when computing surface area from the side length.",
        rootCause: "Wrong Face-Count Multiplier — uses the wrong number of faces (a cube has 6, not 4) when computing surface area.",
        remediation: "A cube has SIX faces, each with area side² — surface area = 6 × side², not 4 × side²."
      },
      {
        misconceptionId: "E-d18-c",
        description: "Student computes only ONE face's area (side²=64) and reports that instead of the total surface area across all 6 faces.",
        rootCause: "Final-Step Omission — stops after finding one face's area, forgetting to multiply by the number of faces.",
        remediation: "One face's area (64 cm²) is only PART of the surface area — multiply by 6 (the number of faces) to get the total: 6×64=384."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the side length", hint: "Side = ∛512 (what number cubed equals 512?)." },
      { level: 2, description: "Find one face's area", hint: "side² = 8² = ?" },
      { level: 3, description: "Multiply by the number of faces", hint: "A cube has 6 faces: 6 × 64 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.MD.C.5"]
  },
  {
    itemId: "d19",
    order: 19,
    cluster: "LENGTH",
    clusterName: CLUSTER_NAMES.LENGTH,
    skillId: "MEASPAV-14",
    question: "A rectangular sheet of paper 30 cm by 20 cm has a square of side 8 cm cut from each corner. The remaining part is folded to form an open box. Find the volume of the box.",
    options: [
        { text: "448 cm³", correct: true, feedback: "Base length = 30−16=14 cm, width = 20−16=4 cm, height = 8 cm. Volume = 14×4×8 = 448 cm³." },
        { text: "4800 cm³", correct: false, feedback: "You multiplied 30×20×8.", misconceptionId: "E-d19-a" },
        { text: "2240 cm³", correct: false, feedback: "You used 14×20×8.", misconceptionId: "E-d19-b" },
        { text: "336 cm³", correct: false, feedback: "Incorrect subtraction.", misconceptionId: "E-d19-c" }
      ],
    backward: "Subtract twice the square side from each dimension for the base; height equals square side.",
    forward: "Packaging design.",
    misconceptions: [
      {
        misconceptionId: "E-d19-a",
        description: "Student multiplies the ORIGINAL sheet dimensions (30×20) by the height (8) directly, without accounting for the corners being cut away.",
        rootCause: "Corner Reduction Ignored — doesn't reduce the base dimensions by the amount removed at the corners before computing volume.",
        remediation: "Cutting squares from the corners REDUCES the base dimensions of the folded box — the base is NOT the full sheet (30×20), it's the reduced base (14×4) after removing 8 cm from each side."
      },
      {
        misconceptionId: "E-d19-b",
        description: "Student reduces only ONE dimension (length: 30→14) but forgets to reduce the other (width: 20 stays as 20 instead of becoming 4).",
        rootCause: "Partial Corner Reduction — applies the corner-cutting reduction to only one of the two base dimensions.",
        remediation: "Corners are cut from ALL FOUR corners, affecting BOTH the length AND the width — reduce both: length 30-16=14, width 20-16=4."
      },
      {
        misconceptionId: "E-d19-c",
        description: "Student makes an error in the base dimension calculation, computing an incorrect base area before multiplying by height.",
        rootCause: "Base Dimension Computation Error — a miscalculation in reducing the length or width by twice the corner square's side.",
        remediation: "Each dimension loses TWICE the corner square's side (once from each end): length = 30 - 2×8 = 14, width = 20 - 2×8 = 4 — recheck this subtraction."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the reduced base dimensions", hint: "Length = 30 - 2×8 = 14. Width = 20 - 2×8 = 4." },
      { level: 2, description: "Identify the height", hint: "The height of the folded box equals the corner square's side: 8 cm." },
      { level: 3, description: "Compute the volume", hint: "14 × 4 × 8 = ?" }
    ],
    forwardRiskLinks: [
      { targetSkillId: "MEASPAV-08", probability: 0.35, condition: "Forgetting to reduce dimensions by twice the removed amount recurs in path/border-area problems that share the same 'remove from both sides' pattern." }
    ],
    learningObjectives: ["CCSS.MATH.CONTENT.5.MD.C.5"]
  },
  {
    itemId: "d20",
    order: 20,
    cluster: "MASS",
    clusterName: CLUSTER_NAMES.MASS,
    skillId: "MEASMASS-11",
    question: "A metal block of mass 2.4 kg is melted and recast into a cuboid of length 15 cm and breadth 10 cm. The density of the metal is 8 g/cm³. Find the height of the cuboid.",
    options: [
        { text: "2 cm", correct: true, feedback: "Mass = 2400 g. Volume = 2400/8 = 300 cm³. Height = 300/(15×10) = 2 cm." },
        { text: "1.5 cm", correct: false, feedback: "Incorrect division.", misconceptionId: "E-d20-a" },
        { text: "3 cm", correct: false, feedback: "Used density 6? No.", misconceptionId: "E-d20-b" },
        { text: "2.5 cm", correct: false, feedback: "Incorrect.", misconceptionId: "E-d20-c" }
      ],
    backward: "Use density to find volume, then divide by base area.",
    forward: "Material science and recasting.",
    misconceptions: [
      {
        misconceptionId: "E-d20-a",
        description: "Student makes a division error somewhere in the chain (mass to volume, or volume to height), landing on 1.5 cm instead of 2 cm.",
        rootCause: "Multi-Step Division Error — a miscalculation in either the mass÷density or volume÷base-area step.",
        remediation: "Work through each step: volume = mass÷density = 2400÷8=300 cm³. Height = volume÷base area = 300÷(15×10)=300÷150=2 cm — recheck each division."
      },
      {
        misconceptionId: "E-d20-b",
        description: "Student uses an incorrect density value (not the stated 8 g/cm³) when finding the volume, leading to a wrong height.",
        rootCause: "Rate Misread — substitutes a different density than the one given in the question.",
        remediation: "Re-check the density stated: 8 g/cm³ — volume = mass ÷ density = 2400 ÷ 8 = 300 cm³, using the exact given rate."
      },
      {
        misconceptionId: "E-d20-c",
        description: "Student makes a smaller computational error in the final division (volume ÷ base area), landing on 2.5 cm instead of 2 cm.",
        rootCause: "Division Computation Error — a miscalculation in the final step dividing volume by base area.",
        remediation: "Recompute: 300 cm³ ÷ (15×10=150 cm²) = 2 cm — verify by multiplying 2 × 150 to see if it returns 300."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Convert mass to grams", hint: "2.4 kg = 2400 g." },
      { level: 2, description: "Find the volume using density", hint: "Volume = mass ÷ density = 2400 ÷ 8." },
      { level: 3, description: "Find the height", hint: "Height = volume ÷ (length × breadth)." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.MD.C.5"]
  },
  {
    itemId: "d21",
    order: 21,
    cluster: "CAP",
    clusterName: CLUSTER_NAMES.CAP,
    skillId: "MEASCAP-10",
    question: "A 15 l container is 2/3 full of water. The water is poured equally into bottles of 500 ml capacity each. How many bottles are filled, and how much water remains?",
    options: [
        { text: "20 bottles, 0 ml remaining", correct: true, feedback: "Water = 2/3 × 15 = 10 l = 10000 ml. 10000/500 = 20 bottles exactly." },
        { text: "15 bottles, 250 ml remaining", correct: false, feedback: "You used 3/4 instead of 2/3? No.", misconceptionId: "E-d21-a" },
        { text: "10 bottles, 0 ml", correct: false, feedback: "You only used the fraction directly as number?", misconceptionId: "E-d21-b" },
        { text: "18 bottles, 200 ml", correct: false, feedback: "Incorrect.", misconceptionId: "E-d21-c" }
      ],
    backward: "Find total water in ml, divide by bottle capacity.",
    forward: "Distribution and packaging.",
    misconceptions: [
      {
        misconceptionId: "E-d21-a",
        description: "Student uses an incorrect fraction of the container's capacity (perhaps 3/4 instead of the stated 2/3) before dividing by bottle capacity.",
        rootCause: "Fraction Value Misread — substitutes a different fraction than the one given in the question.",
        remediation: "Re-check the fraction stated: 2/3 full, not 3/4 — 2/3 × 15 = 10 l = 10000 ml of water available."
      },
      {
        misconceptionId: "E-d21-b",
        description: "Student treats the fraction (2/3) as if it directly indicated the number of bottles, without computing the actual water volume first.",
        rootCause: "Fraction Misapplied as Count — confuses the fraction of the container's capacity with an actual bottle count.",
        remediation: "The fraction 2/3 describes how FULL the container is — you must first compute the actual water volume (2/3 × 15 l = 10 l), THEN divide by the bottle capacity (500 ml) to find the number of bottles."
      },
      {
        misconceptionId: "E-d21-c",
        description: "Student makes a computational error in finding the water volume or in the division, landing on 18 bottles with 200 ml remaining instead of exactly 20 bottles.",
        rootCause: "Multi-Step Computation Error — a miscalculation in the fraction-of-capacity step or the final division.",
        remediation: "Work through each step: water = 2/3 × 15 = 10 l = 10000 ml. Bottles = 10000 ÷ 500 = 20 exactly (with no remainder) — recheck both steps."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the actual water volume", hint: "2/3 × 15 l = ?" },
      { level: 2, description: "Convert to ml", hint: "10 l = 10000 ml." },
      { level: 3, description: "Divide by bottle capacity", hint: "10000 ÷ 500 = ? (check if it divides evenly)." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NF.B.3"]
  },
  {
    itemId: "d22",
    order: 22,
    cluster: "TIME",
    clusterName: CLUSTER_NAMES.TIME,
    skillId: "MEASTIME-08",
    question: "A worker works from 8:00 AM to 5:00 PM with a 45‑minute lunch break. How many hours does he actually work?",
    options: [
        { text: "8 h 15 min", correct: true, feedback: "Total 9 h. Minus 45 min = 8 h 15 min." },
        { text: "9 h", correct: false, feedback: "You forgot the lunch break.", misconceptionId: "E-d22-a" },
        { text: "8 h", correct: false, feedback: "Subtracted 1 h.", misconceptionId: "E-d22-b" },
        { text: "8 h 45 min", correct: false, feedback: "Subtracted only 15 min.", misconceptionId: "E-d22-c" }
      ],
    backward: "Find total time from start to end, then subtract break.",
    forward: "Work hour calculations.",
    misconceptions: [
      {
        misconceptionId: "E-d22-a",
        description: "Student correctly finds the total elapsed time (9 h) but forgets to subtract the 45-minute lunch break to find actual working time.",
        rootCause: "Break Duration Not Subtracted — treats total elapsed time as the same as actual working time, ignoring the break.",
        remediation: "The question asks for hours ACTUALLY worked, which excludes the break — subtract the 45-minute lunch from the total: 9 h - 45 min."
      },
      {
        misconceptionId: "E-d22-b",
        description: "Student subtracts a full hour instead of 45 minutes, rounding the break up.",
        rootCause: "Duration Rounding Error — rounds the 45-minute break to a full hour instead of subtracting the exact amount.",
        remediation: "Subtract EXACTLY 45 minutes, not a full hour: 9 h - 45 min = 8 h 15 min (60-45=15 minutes remain in that hour)."
      },
      {
        misconceptionId: "E-d22-c",
        description: "Student subtracts only 15 minutes instead of the full 45-minute break.",
        rootCause: "Value Misread — substitutes a different break duration than what the question states.",
        remediation: "Re-check the break duration stated: 45 minutes, not 15 minutes — 9 h - 45 min = 8 h 15 min."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the total elapsed time", hint: "8:00 AM to 5:00 PM is how many hours?" },
      { level: 2, description: "Identify what to subtract", hint: "The 45-minute lunch break is not working time." },
      { level: 3, description: "Subtract", hint: "9 h - 45 min = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d23",
    order: 23,
    cluster: "MONEY",
    clusterName: CLUSTER_NAMES.MONEY,
    skillId: "MEASMONEY-13",
    question: "A dealer bought 100 apples at ₹20 each. 20 apples were rotten. He sold the remaining apples at ₹30 each. Find his profit percentage.",
    options: [
        { text: "20% profit", correct: true, feedback: "CP = 2000. Good apples = 80. SP = 80×30 = 2400. Profit = 400. % = (400/2000)×100 = 20%." },
        { text: "25%", correct: false, feedback: "You divided profit by SP (400/2400 ≈ 16.7%? No, not 25%).", misconceptionId: "E-d23-a" },
        { text: "10%", correct: false, feedback: "Incorrect.", misconceptionId: "E-d23-b" },
        { text: "15%", correct: false, feedback: "Incorrect.", misconceptionId: "E-d23-c" }
      ],
    backward: "Account for wastage, then compute profit on total CP.",
    forward: "Perishable goods business.",
    misconceptions: [
      {
        misconceptionId: "E-d23-a",
        description: "Student divides the profit by Selling Price instead of Cost Price, using the wrong base for the percentage.",
        rootCause: "Wrong Percentage Base — uses SP instead of CP as the denominator in the profit percentage formula.",
        remediation: "Profit percentage is always calculated relative to the total COST PRICE (what was originally spent), not the Selling Price: Profit % = (Profit ÷ CP) × 100."
      },
      {
        misconceptionId: "E-d23-b",
        description: "Student makes an error accounting for the rotten apples (e.g. selling all 100 instead of just the 80 good ones), leading to an inflated SP and understated profit percentage.",
        rootCause: "Wastage Not Accounted For — forgets that only the GOOD apples (80, not 100) can be sold.",
        remediation: "Only 80 apples were sold (100 minus 20 rotten) — SP = 80 × 30 = 2400, not 100 × 30 — recompute using the correct number of sellable apples."
      },
      {
        misconceptionId: "E-d23-c",
        description: "Student makes a different computational error accounting for the wastage or the CP/profit calculation, landing on 15%.",
        rootCause: "Multi-Step Computation Error — a miscalculation somewhere in the wastage-adjusted profit calculation.",
        remediation: "Work through each step: CP=100×20=2000 (all 100 bought). Good apples=80. SP=80×30=2400. Profit=2400-2000=400. %=(400/2000)×100=20% — verify each step."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the total cost price", hint: "100 apples × ₹20 each = ? (all 100 were bought, even the rotten ones)." },
      { level: 2, description: "Find the selling price", hint: "Only 80 GOOD apples can be sold: 80 × ₹30." },
      { level: 3, description: "Find the profit percentage", hint: "(SP - CP) ÷ CP × 100." }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d24",
    order: 24,
    cluster: "PAV",
    clusterName: CLUSTER_NAMES.PAV,
    skillId: "MEASPAV-15",
    question: "A square garden of side 20 m has a 2 m wide path running along two adjacent sides (L‑shaped) on the inside. Find the area of the path.",
    options: [
        { text: "76 m²", correct: true, feedback: "Area of square = 400 m². Inner square side = 18 m, area = 324 m². Path = 400−324 = 76 m². Or 20×2 + 18×2 = 40+36 = 76 m²." },
        { text: "40 m²", correct: false, feedback: "You only considered one strip.", misconceptionId: "E-d24-a" },
        { text: "80 m²", correct: false, feedback: "You didn't account for the overlapping corner.", misconceptionId: "E-d24-b" },
        { text: "72 m²", correct: false, feedback: "Off by 4.", misconceptionId: "E-d24-c" }
      ],
    backward: "Subtract inner area from outer area, or add areas of the two rectangles minus overlapping square.",
    forward: "Landscape design.",
    misconceptions: [
      {
        misconceptionId: "E-d24-a",
        description: "Student computes the area of only ONE strip (20×2=40) and forgets the path runs along a SECOND adjacent side too.",
        rootCause: "Second Strip Omitted — accounts for only one of the two path segments described in the L-shaped path.",
        remediation: "The path runs along TWO adjacent sides — compute both strips (one for each side) and combine them, accounting for the corner overlap, not just one strip."
      },
      {
        misconceptionId: "E-d24-b",
        description: "Student adds both strips (20×2 + 20×2 = 80) without subtracting the small square where the two strips overlap at the corner.",
        rootCause: "Corner Overlap Not Subtracted — double-counts the corner square where the two path strips meet.",
        remediation: "When two strips meet at a corner, the small overlapping square (2×2=4 m²) gets counted TWICE if you simply add both strips — subtract it once: 40+40-4=76."
      },
      {
        misconceptionId: "E-d24-c",
        description: "Student makes a small computational error in combining the strips or the corner adjustment, landing 4 m² below the correct answer.",
        rootCause: "L-Shaped Path Computation Error — a minor miscalculation in the strip-plus-strip-minus-corner method.",
        remediation: "Recompute carefully: strip 1 = 20×2=40, strip 2 (avoiding double-counting the corner) = 18×2=36 (using 20-2=18 to skip the already-counted corner). Total = 40+36=76."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find one strip's area", hint: "20 × 2 = 40 m² (along one side)." },
      { level: 2, description: "Find the second strip, avoiding double-counting the corner", hint: "The second strip is (20-2) × 2 = 36 m² (skipping the already-counted 2×2 corner)." },
      { level: 3, description: "Add the two strips", hint: "40 + 36 = ?" }
    ],
    forwardRiskLinks: [
      { targetSkillId: "MEASPAV-08", probability: 0.35, condition: "Handling corner overlaps in L-shaped or border-area problems recurs whenever two adjacent regions share a boundary." }
    ],
    learningObjectives: ["CCSS.MATH.CONTENT.5.MD.C.5"]
  }
];

const recheckItems = [
  {
    itemId: "r1",
    order: 1,
    cluster: "LENGTH",
    clusterName: CLUSTER_NAMES.LENGTH,
    skillId: "MEASPAV-08",
    question: "A rectangular park is 180 m by 120 m. A 4 m wide path is built outside. Find the area of the path and the cost of paving it at ₹30 per m².",
    options: [
        { text: "Path area 2464 m², cost ₹73,920", correct: true, feedback: "Outer = 188×128 = 24064 m². Inner = 180×120 = 21600 m². Path = 2464 m². Cost = 2464×30 = ₹73,920." },
        { text: "Path area 24064 m²", correct: false, feedback: "That's the outer area.", misconceptionId: "E-r1-a" },
        { text: "Cost ₹73,920 (without path area)", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r1-b" },
        { text: "Path area 3000 m², cost ₹90,000", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r1-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r1-a",
        description: "Student reports the outer area (24064) as if it were the path area, forgetting to subtract the inner area.",
        rootCause: "Subtraction Step Omitted — stops after computing the outer area, without subtracting the inner area to isolate the path.",
        remediation: "The path is only the RING around the inner region — compute outer area MINUS inner area to isolate just the path: 24064 - 21600 = 2464."
      },
      {
        misconceptionId: "E-r1-b",
        description: "Student computes the correct cost but doesn't explicitly state the path area as also requested by the question.",
        rootCause: "Partial Answer — completes only part of a multi-part question (cost but not area).",
        remediation: "The question asks for BOTH the path area AND the cost — state both: path area = 2464 m², cost = ₹73,920."
      },
      {
        misconceptionId: "E-r1-c",
        description: "Student estimates or uses an incorrect method (like perimeter × width) instead of the outer-minus-inner-area method, landing on rounded values far from the exact answer.",
        rootCause: "Perimeter-Times-Width Shortcut Error — approximates the path area as a simple strip, missing the corner overlaps.",
        remediation: "For a path OUTSIDE a rectangle, always compute the FULL outer area (adding 2×path-width to each dimension) minus the inner area — don't use perimeter × width, which misses the corners."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the outer dimensions", hint: "Path is OUTSIDE, so outer length = 180+2×4=188, outer width = 120+2×4=128." },
      { level: 2, description: "Find both areas and subtract", hint: "Outer area - inner area (180×120) = path area." },
      { level: 3, description: "Compute the cost", hint: "Path area × ₹30 per m² = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.MD.C.5"]
  },
  {
    itemId: "r2",
    order: 2,
    cluster: "MASS",
    clusterName: CLUSTER_NAMES.MASS,
    skillId: "MEASMASS-09",
    question: "20 kg of tea at ₹150/kg is mixed with 30 kg of tea at ₹200/kg. Find the selling price per kg for a profit of 20%.",
    options: [
        { text: "₹216", correct: true, feedback: "Total CP = 20×150 + 30×200 = 3000+6000 = 9000. Total = 50 kg. CP/kg = 180. SP/kg = 180×1.2 = 216." },
        { text: "₹180", correct: false, feedback: "That's cost price.", misconceptionId: "E-r2-a" },
        { text: "₹200", correct: false, feedback: "Incorrect.", misconceptionId: "E-r2-b" },
        { text: "₹225", correct: false, feedback: "Used 25% profit.", misconceptionId: "E-r2-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r2-a",
        description: "Student correctly finds the cost price per kg (₹180) but stops there without applying the 20% profit markup.",
        rootCause: "Final-Step Omission — treats the intermediate cost-price calculation as the complete answer.",
        remediation: "The question asks for the SELLING price to achieve a 20% profit — after finding CP/kg (180), multiply by 1.2 to get the selling price."
      },
      {
        misconceptionId: "E-r2-b",
        description: "Student reports one of the given individual prices (₹200) instead of computing the weighted average and applying profit.",
        rootCause: "Weighted Average Skipped — doesn't blend the two different costs and quantities into a single average cost per kg.",
        remediation: "The mixture has TWO different costs at different quantities — find the weighted average cost per kg first (total cost ÷ total kg), then apply the profit margin."
      },
      {
        misconceptionId: "E-r2-c",
        description: "Student uses an incorrect profit percentage (25% instead of the stated 20%) when computing the selling price.",
        rootCause: "Rate Misread — substitutes a different profit percentage than the one given in the question.",
        remediation: "Re-check the profit percentage stated: 20%, not 25% — multiply CP/kg by 1.2, not 1.25: 180 × 1.2 = 216."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the total cost", hint: "20×150 + 30×200 = ?" },
      { level: 2, description: "Find the cost price per kg", hint: "Total cost ÷ total kg (50) = ?" },
      { level: 3, description: "Apply the profit margin", hint: "CP/kg × 1.2 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "r3",
    order: 3,
    cluster: "CAP",
    clusterName: CLUSTER_NAMES.CAP,
    skillId: "MEASCAP-07",
    question: "A tank is 1/3 full. When 50 litres are added, it becomes 2/3 full. What is the capacity of the tank?",
    options: [
        { text: "150 l", correct: true, feedback: "Change = 1/3 capacity = 50 l → capacity = 150 l." },
        { text: "100 l", correct: false, feedback: "2/3 − 1/3 = 1/3, so 50 is 1/3, capacity = 150, not 100.", misconceptionId: "E-r3-a" },
        { text: "200 l", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r3-b" },
        { text: "75 l", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r3-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r3-a",
        description: "Student miscalculates the relationship between the fraction and the capacity, landing on 100 instead of 150.",
        rootCause: "Fraction-of-Capacity Reasoning Error — a miscalculation relating the known fraction (1/3) back to the whole.",
        remediation: "50 l represents 1/3 of the capacity (2/3-1/3=1/3) — to find the WHOLE capacity, multiply: if 1/3 = 50 l, then the whole = 50 × 3 = 150 l."
      },
      {
        misconceptionId: "E-r3-b",
        description: "Student overestimates, perhaps by multiplying 50 by 4 instead of 3.",
        rootCause: "Fraction-of-Capacity Reasoning Error — an overestimation when scaling the known fraction to the whole.",
        remediation: "Since 50 l = 1/3 of the capacity, multiply by exactly 3 (not 4) to find the whole: 50 × 3 = 150 l."
      },
      {
        misconceptionId: "E-r3-c",
        description: "Student underestimates, perhaps treating 50 l as representing a larger fraction than 1/3, leading to a smaller computed capacity.",
        rootCause: "Fraction-of-Capacity Reasoning Error — an underestimation when scaling the known fraction to the whole.",
        remediation: "Confirm the fraction that 50 l represents: 2/3 - 1/3 = 1/3 of the tank — then scale up: 50 l × 3 = 150 l."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the fraction change", hint: "2/3 - 1/3 = 1/3 of the tank." },
      { level: 2, description: "Relate the fraction to the known volume", hint: "1/3 of the capacity = 50 l." },
      { level: 3, description: "Find the full capacity", hint: "If 1/3 is 50 l, the whole is 50 × 3 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NF.B.3"]
  },
  {
    itemId: "r4",
    order: 4,
    cluster: "TIME",
    clusterName: CLUSTER_NAMES.TIME,
    skillId: "MEASTIME-08",
    question: "A meeting starts at 6:45 PM and ends at 10:20 PM with a 30‑minute break. Find the actual meeting duration.",
    options: [
        { text: "3 h 5 min", correct: true, feedback: "Total = 3 h 35 min. Minus 30 min = 3 h 5 min." },
        { text: "3 h 35 min", correct: false, feedback: "You forgot to subtract the break.", misconceptionId: "E-r4-a" },
        { text: "4 h", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r4-b" },
        { text: "3 h", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r4-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r4-a",
        description: "Student correctly finds the total elapsed time (3 h 35 min) but forgets to subtract the 30-minute break to find actual meeting time.",
        rootCause: "Break Duration Not Subtracted — treats total elapsed time as the same as actual meeting time, ignoring the break.",
        remediation: "The question asks for the ACTUAL meeting duration, which excludes the break — subtract the 30-minute break from the total: 3 h 35 min - 30 min."
      },
      {
        misconceptionId: "E-r4-b",
        description: "Student overestimates the total elapsed time or the subtraction, landing on 4 h instead of 3 h 5 min.",
        rootCause: "Time Bridging/Subtraction Error — a miscalculation in finding the total elapsed time or subtracting the break.",
        remediation: "Recompute the total elapsed time first (6:45 PM to 10:20 PM = 3 h 35 min), then subtract exactly 30 minutes: 3 h 35 min - 30 min = 3 h 5 min."
      },
      {
        misconceptionId: "E-r4-c",
        description: "Student subtracts too much from the total, perhaps rounding the break up to more than 30 minutes.",
        rootCause: "Duration Rounding Error — rounds the break subtraction to a cleaner number instead of the exact 30 minutes.",
        remediation: "Subtract EXACTLY 30 minutes: 3 h 35 min - 30 min = 3 h 5 min (35-30=5 minutes remain)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the total elapsed time", hint: "6:45 PM to 10:20 PM is how many hours and minutes?" },
      { level: 2, description: "Identify what to subtract", hint: "The 30-minute break is not meeting time." },
      { level: 3, description: "Subtract", hint: "3 h 35 min - 30 min = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "r5",
    order: 5,
    cluster: "MONEY",
    clusterName: CLUSTER_NAMES.MONEY,
    skillId: "MEASMONEY-10",
    question: "₹8000 is deposited at 6% SI per annum. After 1 year, ₹3000 is withdrawn. What is the total interest after 3 years?",
    options: [
        { text: "₹1080", correct: true, feedback: "Yr1: 8000×6/100=480. Next 2 yrs on 5000: 5000×6×2/100=600. Total=1080." },
        { text: "₹1440", correct: false, feedback: "You assumed no withdrawal.", misconceptionId: "E-r5-a" },
        { text: "₹960", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r5-b" },
        { text: "₹1200", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r5-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r5-a",
        description: "Student computes interest as if the full ₹8000 remained deposited for all 3 years, ignoring the ₹3000 withdrawal after year 1.",
        rootCause: "Principal Change Ignored — doesn't account for the reduced principal after the partial withdrawal.",
        remediation: "The principal CHANGES after the withdrawal — compute interest for year 1 on ₹8000, then separately for the next 2 years on the REDUCED principal (₹5000)."
      },
      {
        misconceptionId: "E-r5-b",
        description: "Student makes a computational error in one of the two period calculations, landing 120 below the correct total.",
        rootCause: "Multi-Period Computation Error — a miscalculation in one of the two separate interest calculations.",
        remediation: "Compute each period separately and check: Year 1 = 8000×6×1/100=480. Years 2-3 = 5000×6×2/100=600. Total = 480+600=1080 — verify each part."
      },
      {
        misconceptionId: "E-r5-c",
        description: "Student makes a different computational error combining the two periods, landing 120 above the correct total.",
        rootCause: "Multi-Period Computation Error — a different miscalculation when combining the two periods.",
        remediation: "Recheck each period: does the first year's interest (on 8000) plus the next two years' interest (on the reduced 5000) add up to exactly 1080?"
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find interest for the first year", hint: "8000 × 6 × 1 / 100 = ?" },
      { level: 2, description: "Find the new principal after withdrawal", hint: "8000 - 3000 = 5000." },
      { level: 3, description: "Find interest for the remaining 2 years and add", hint: "5000 × 6 × 2 / 100 = ? Then add to the first year's interest." }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "r6",
    order: 6,
    cluster: "PAV",
    clusterName: CLUSTER_NAMES.PAV,
    skillId: "MEASPAV-13",
    question: "A cube has volume 1000 cm³. Find its surface area.",
    options: [
        { text: "600 cm²", correct: true, feedback: "Side = 10 cm. SA = 6×100 = 600 cm²." },
        { text: "1000 cm²", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r6-a" },
        { text: "60 cm²", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r6-b" },
        { text: "100 cm²", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r6-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r6-a",
        description: "Student reports the given volume (1000) directly as if it were the surface area, without any calculation.",
        rootCause: "Wrong Value Reported — confuses the given volume with the requested surface area.",
        remediation: "Volume and surface area are different measurements — work through: side=∛1000=10, then surface area=6×10²=600, not just restating the volume."
      },
      {
        misconceptionId: "E-r6-b",
        description: "Student computes one face's area correctly relative to a wrong side (or divides incorrectly), landing on 60 instead of 600.",
        rootCause: "Power-of-Ten Shift Miscount — misplaces a decimal or zero somewhere in the side or face-area calculation.",
        remediation: "Recompute carefully: side=10, one face's area = 10×10=100, and surface area = 6 faces × 100 = 600 — recheck each number of zeros."
      },
      {
        misconceptionId: "E-r6-c",
        description: "Student computes only ONE face's area (100) and reports that instead of the total surface area across all 6 faces.",
        rootCause: "Final-Step Omission — stops after finding one face's area, forgetting to multiply by the number of faces.",
        remediation: "One face's area (100 cm²) is only PART of the surface area — multiply by 6 (the number of faces) to get the total: 6×100=600."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the side length", hint: "Side = ∛1000 (what number cubed equals 1000?)." },
      { level: 2, description: "Find one face's area", hint: "side² = 10² = ?" },
      { level: 3, description: "Multiply by the number of faces", hint: "A cube has 6 faces: 6 × 100 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.MD.C.5"]
  },
  {
    itemId: "r7",
    order: 7,
    cluster: "LENGTH",
    clusterName: CLUSTER_NAMES.LENGTH,
    skillId: "MEASPAV-10",
    question: "A rectangle's length and breadth are in ratio 5:3 and its area is 240 m². Find the perimeter.",
    options: [
        { text: "64 m", correct: true, feedback: "5x×3x=15x²=240 → x²=16 → x=4. l=20, b=12. Perim=64 m." },
        { text: "60 m", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r7-a" },
        { text: "80 m", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r7-b" },
        { text: "48 m", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r7-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r7-a",
        description: "Student finds an incorrect side value x, perhaps from an arithmetic slip solving x²=16, leading to a wrong perimeter.",
        rootCause: "Equation-Solving Error — a miscalculation when solving x²=16 for x.",
        remediation: "Solve carefully: 15x²=240 means x²=240÷15=16, so x=√16=4 — recheck this square root."
      },
      {
        misconceptionId: "E-r7-b",
        description: "Student sets up the ratio or area equation incorrectly, leading to different (wrong) dimensions and an incorrect perimeter of 80.",
        rootCause: "Ratio Equation Setup Error — misapplies the length-to-breadth ratio when forming the area equation.",
        remediation: "Set length=5x and breadth=3x explicitly, then area = length × breadth = 5x × 3x = 15x² — verify this setup before solving."
      },
      {
        misconceptionId: "E-r7-c",
        description: "Student correctly finds x but miscalculates the perimeter, perhaps using only length+breadth without doubling.",
        rootCause: "Missing-Doubling Step — forgets to double the sum of length and breadth when computing perimeter.",
        remediation: "Perimeter = 2 × (length + breadth) = 2 × (20+12) = 64 — don't forget the ×2 doubling step."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Set up the ratio equation", hint: "Let length = 5x, breadth = 3x." },
      { level: 2, description: "Apply the area formula", hint: "5x × 3x = 240, so 15x² = 240." },
      { level: 3, description: "Solve for x and find the perimeter", hint: "x=4, so length=20, breadth=12. Perimeter = 2×(20+12)." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "ALGEBRA-EQ-01", probability: 0.4, condition: "Setting up and solving a ratio-based area equation is a direct precursor to algebraic word-problem skills." }
    ],
    learningObjectives: ["CCSS.MATH.CONTENT.5.MD.C.5"]
  },
  {
    itemId: "r8",
    order: 8,
    cluster: "MASS",
    clusterName: CLUSTER_NAMES.MASS,
    skillId: "MEASMASS-07",
    question: "The gross weight of a consignment is 850 kg. The tare (packaging) is 50 kg. There are 20 bags. What is the net weight per bag in kg?",
    options: [
        { text: "40 kg", correct: true, feedback: "Net = 800 kg. Per bag = 800/20 = 40 kg." },
        { text: "42.5 kg", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r8-a" },
        { text: "45 kg", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r8-b" },
        { text: "35 kg", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r8-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r8-a",
        description: "Student divides the GROSS weight (850, including packaging) by 20 instead of first subtracting the tare weight.",
        rootCause: "Container Weight Not Subtracted — forgets that the gross weight includes the tare (packaging), not just the net contents.",
        remediation: "Subtract the tare weight FIRST to get the net weight: 850 kg - 50 kg = 800 kg, THEN divide by 20 bags."
      },
      {
        misconceptionId: "E-r8-b",
        description: "Student makes a computational error, landing on 45 kg instead of 40 kg per bag.",
        rootCause: "Division Computation Error — miscalculates 800 ÷ 20.",
        remediation: "Recompute: 800 ÷ 20 = 40 — verify by multiplying 40 × 20 to see if it returns 800."
      },
      {
        misconceptionId: "E-r8-c",
        description: "Student subtracts the tare weight an extra time or divides by an incorrect number of bags, landing 5 kg below the correct answer.",
        rootCause: "Net Weight or Division Error — a computational slip in the subtraction or division step.",
        remediation: "Work through each step: net = 850-50=800 kg, per bag = 800÷20=40 kg — recheck both the subtraction and division."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the net weight", hint: "850 kg - 50 kg (tare) = ?" },
      { level: 2, description: "Divide by the number of bags", hint: "800 ÷ 20 = ?" },
      { level: 3, description: "Check", hint: "Does 40 kg per bag make sense for a total net weight of 800 kg across 20 bags?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.MD.A.1"]
  },
  {
    itemId: "r9",
    order: 9,
    cluster: "CAP",
    clusterName: CLUSTER_NAMES.CAP,
    skillId: "MEASCAP-09",
    question: "A 3 l bottle is 2/5 full. 400 ml is used, then 1.2 l is added. What fraction of the bottle is now full?",
    options: [
        { text: "\\(\\frac{2}{3}\\)", correct: true, feedback: "Initial = 1200 ml. After use = 800 ml. Add 1200 = 2000 ml. Fraction = 2000/3000 = 2/3." },
        { text: "\\(\\frac{1}{2}\\)", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r9-a" },
        { text: "\\(\\frac{3}{5}\\)", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r9-b" },
        { text: "\\(\\frac{4}{5}\\)", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r9-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r9-a",
        description: "Student loses track of the running total through the multi-step process, landing on a fraction below the correct 2/3.",
        rootCause: "Multi-Step Tracking Error — a computational slip somewhere in the sequence of use/add operations.",
        remediation: "Track the volume step by step: start at 1200 ml, after using 400 ml it's 800 ml, after adding 1200 ml it's 2000 ml — verify each step."
      },
      {
        misconceptionId: "E-r9-b",
        description: "Student reports the ORIGINAL fraction (3/5, misreading the initial 2/5) without applying any of the described changes.",
        rootCause: "Changes Not Applied — ignores the sequence of use/add actions described in the question, using only a (misread) starting value.",
        remediation: "The question describes water being used AND added — you must apply both changes to the starting amount before finding the final fraction, not just report a starting value."
      },
      {
        misconceptionId: "E-r9-c",
        description: "Student stops after only the second change (adding 1.2 l) without correctly accounting for the first change (using 400 ml), overestimating the final fraction.",
        rootCause: "Multi-Step Process Abandoned — doesn't correctly apply both changes in sequence.",
        remediation: "Apply the changes IN ORDER: first the 400 ml used (1200-400=800 ml), THEN the 1.2 l added (800+1200=2000 ml) — don't skip or misorder a step."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the starting amount", hint: "2/5 of 3000 ml = 1200 ml." },
      { level: 2, description: "Apply each change in order", hint: "1200 - 400 = 800 ml, then 800 + 1200 = 2000 ml." },
      { level: 3, description: "Form the final fraction", hint: "2000 ml out of 3000 ml total = ?" }
    ],
    forwardRiskLinks: [
      { targetSkillId: "DECADDSUB-06", probability: 0.35, condition: "Losing track of a running total through a multi-step sequence recurs in longer chained word problems." }
    ],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NF.A.1"]
  },
  {
    itemId: "r10",
    order: 10,
    cluster: "TIME",
    clusterName: CLUSTER_NAMES.TIME,
    skillId: "MEASTIME-08",
    question: "A train leaves at 11:20 AM and arrives at 4:05 PM. It stops for 25 minutes. How long was it actually moving?",
    options: [
        { text: "4 h 20 min", correct: true, feedback: "Total = 4 h 45 min. Minus 25 min = 4 h 20 min." },
        { text: "4 h 45 min", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r10-a" },
        { text: "5 h", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r10-b" },
        { text: "4 h 10 min", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r10-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r10-a",
        description: "Student correctly finds the total journey time (4 h 45 min) but forgets to subtract the 25-minute stop to find actual moving time.",
        rootCause: "Stop Duration Not Subtracted — treats total elapsed time as the same as moving time, ignoring the stationary period.",
        remediation: "The question asks for MOVING time, which excludes stops — subtract the 25-minute stop from the total journey time: 4 h 45 min - 25 min."
      },
      {
        misconceptionId: "E-r10-b",
        description: "Student overestimates the moving time, perhaps by adding the stop instead of subtracting it.",
        rootCause: "Operation Direction Confusion — adds the stop time instead of subtracting it.",
        remediation: "Stopping REDUCES the moving time relative to the total journey — subtract the 25-minute stop, don't add it: 4 h 45 min - 25 min = 4 h 20 min."
      },
      {
        misconceptionId: "E-r10-c",
        description: "Student subtracts too much from the total, landing 10 minutes below the correct answer.",
        rootCause: "Duration Subtraction Error — a computational slip in subtracting the exact 25-minute stop.",
        remediation: "Subtract EXACTLY 25 minutes, not more: 4 h 45 min - 25 min = 4 h 20 min (45-25=20 minutes remain)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the total journey time", hint: "11:20 AM to 4:05 PM is how many hours and minutes?" },
      { level: 2, description: "Identify what to subtract", hint: "The 25-minute stop is NOT moving time." },
      { level: 3, description: "Subtract", hint: "4 h 45 min - 25 min = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "r11",
    order: 11,
    cluster: "MONEY",
    clusterName: CLUSTER_NAMES.MONEY,
    skillId: "MEASMONEY-12",
    question: "A product's marked price is ₹5000. After a 15% discount, the seller still makes a 25% profit. What was the cost price?",
    options: [
        { text: "₹3400", correct: true, feedback: "SP = 5000×0.85 = 4250. CP = 4250/1.25 = 3400." },
        { text: "₹3750", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r11-a" },
        { text: "₹4000", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r11-b" },
        { text: "₹3000", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r11-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r11-a",
        description: "Student computes the selling price after discount (4250) but doesn't correctly work backwards through the profit percentage to find CP, or uses an incorrect divisor.",
        rootCause: "Reverse-Percentage Step Error — a miscalculation when dividing the SP by the profit factor to find CP.",
        remediation: "Recompute: SP = 5000×0.85=4250. CP = SP÷1.25 = 4250÷1.25=3400 — recheck this final division."
      },
      {
        misconceptionId: "E-r11-b",
        description: "Student applies only the discount (getting the selling price, ₹4250, but reports a rounded or different value like ₹4000) without working backwards through the profit percentage to find CP.",
        rootCause: "Reverse-Percentage Step Omitted — stops after finding SP, without dividing by 1.25 to find the original CP.",
        remediation: "Finding SP is only step one — you must then work BACKWARDS from SP using the profit percentage to find CP: CP = SP ÷ 1.25, not SP itself."
      },
      {
        misconceptionId: "E-r11-c",
        description: "Student uses an incorrect profit percentage (like 20% or a different factor) instead of the stated 25% when working backwards from SP to CP.",
        rootCause: "Rate Misread — substitutes a different profit percentage than the one given in the question.",
        remediation: "Re-check the profit percentage stated: 25% — divide the SP by 1.25 (not a different factor) to find the CP: 4250 ÷ 1.25 = 3400."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the selling price after discount", hint: "5000 × 0.85 = ?" },
      { level: 2, description: "Recall the profit relationship", hint: "SP = CP × 1.25, so CP = SP ÷ 1.25." },
      { level: 3, description: "Compute the cost price", hint: "4250 ÷ 1.25 = ?" }
    ],
    forwardRiskLinks: [
      { targetSkillId: "MEASMONEY-11", probability: 0.4, condition: "Working backwards through a profit percentage to find cost price recurs in more advanced layered pricing and finance problems." }
    ],
    learningObjectives: []
  },
  {
    itemId: "r12",
    order: 12,
    cluster: "PAV",
    clusterName: CLUSTER_NAMES.PAV,
    skillId: "MEASPAV-12",
    question: "A cuboid measures 12 cm × 8 cm × 5 cm. If each dimension is doubled, what is the new volume?",
    options: [
        { text: "3840 cm³", correct: true, feedback: "New = 24×16×10 = 3840 cm³." },
        { text: "960 cm³", correct: false, feedback: "Original volume doubled? Original=480, doubled=960.", misconceptionId: "E-r12-a" },
        { text: "1920 cm³", correct: false, feedback: "That's 4× the original volume, not 8×.", misconceptionId: "E-r12-b" },
        { text: "7680 cm³", correct: false, feedback: "That's 16× the original volume — too large.", misconceptionId: "E-r12-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r12-a",
        description: "Student assumes doubling ALL three dimensions only doubles the total volume, not recognising that each dimension's doubling compounds multiplicatively.",
        rootCause: "Linear Scaling Fallacy — incorrectly assumes volume scales linearly (×2) with a single dimension change, ignoring that all three dimensions changed.",
        remediation: "When ALL THREE dimensions double, volume scales by 2×2×2=8, not just ×2 — recompute the actual new dimensions (24,16,10) and multiply them directly: 24×16×10=3840."
      },
      {
        misconceptionId: "E-r12-b",
        description: "Student assumes doubling three dimensions only quadruples (×4) the volume, perhaps only accounting for two of the three doublings.",
        rootCause: "Partial Scaling Factor Applied — accounts for only 2 of the 3 dimension doublings when predicting the volume scale factor.",
        remediation: "Each of the THREE dimensions doubles, so the volume scale factor is 2×2×2=8 (not 2×2=4) — recompute using the actual new dimensions: 24×16×10=3840."
      },
      {
        misconceptionId: "E-r12-c",
        description: "Student overestimates the scale factor, perhaps using 2⁴=16 instead of the correct 2³=8.",
        rootCause: "Scaling Factor Miscount — miscounts the number of dimensions being doubled (using 4 instead of the correct 3).",
        remediation: "There are exactly THREE dimensions (length, breadth, height), each doubling — the volume scale factor is 2³=8, not 2⁴=16: verify by computing 24×16×10 directly."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the new dimensions", hint: "12×2=24, 8×2=16, 5×2=10." },
      { level: 2, description: "Multiply the new dimensions directly", hint: "24 × 16 × 10 = ?" },
      { level: 3, description: "Check against the scaling pattern", hint: "Does your answer equal the original volume (480) times 8?" }
    ],
    forwardRiskLinks: [
      { targetSkillId: "MEASPAV-09", probability: 0.4, condition: "Underestimating how volume scales when multiple dimensions change simultaneously recurs whenever scale factors are applied to 3D shapes." }
    ],
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

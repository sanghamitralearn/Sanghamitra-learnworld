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
    skillId: "MEASLEN-02",
    question: "A rope is 3 m 40 cm long. 1 m 80 cm is cut off. How much is left?",
    options: [
        { text: "1 m 60 cm", correct: true, feedback: "340 cm − 180 cm = 160 cm = 1 m 60 cm." },
        { text: "2 m 20 cm", correct: false, feedback: "You added instead of subtracting.", misconceptionId: "E-w1-a" },
        { text: "1 m 40 cm", correct: false, feedback: "You only subtracted the metres correctly but forgot the centimetres.", misconceptionId: "E-w1-b" },
        { text: "1 m 80 cm", correct: false, feedback: "That's the amount cut, not remaining.", misconceptionId: "E-w1-c" }
      ],
    retryHint: "Convert both to centimetres (340 cm and 180 cm), subtract, then convert back.",
    misconceptions: [
      {
        misconceptionId: "E-w1-a",
        description: "Student adds 3 m 40 cm and 1 m 80 cm instead of subtracting, producing a result larger than the starting length.",
        rootCause: "Operation Sign Misread — performs addition when subtraction was requested.",
        remediation: "The question says '1 m 80 cm is CUT OFF' — this means removal, so subtract, not add."
      },
      {
        misconceptionId: "E-w1-b",
        description: "Student subtracts the metres correctly but doesn't properly handle borrowing for the centimetres, dropping to 1 m 40 cm.",
        rootCause: "Mixed-Unit Subtraction Borrowing Error — doesn't borrow across the m/cm boundary when the cm being subtracted (80) exceeds what's available (40).",
        remediation: "Convert fully to cm first: 3 m 40 cm = 340 cm, 1 m 80 cm = 180 cm. Subtract 340 - 180 = 160 cm, then convert back — this avoids borrowing mistakes."
      },
      {
        misconceptionId: "E-w1-c",
        description: "Student reports the amount that was cut off (1 m 80 cm) instead of what remains.",
        rootCause: "Wrong Value Reported — confuses the subtrahend (amount removed) with the actual result of the subtraction.",
        remediation: "The answer should be what's LEFT after cutting, not the amount cut off — compute 340 cm - 180 cm to find what remains."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Convert to a single unit", hint: "3 m 40 cm = 340 cm. 1 m 80 cm = 180 cm." },
      { level: 2, description: "Subtract", hint: "340 - 180 = ?" },
      { level: 3, description: "Convert back to mixed units", hint: "160 cm = ? m ? cm." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.MD.A.1"]
  },
  {
    itemId: "w2",
    order: 2,
    cluster: "MASS",
    clusterName: CLUSTER_NAMES.MASS,
    skillId: "MEASMASS-05",
    question: "A packet weighs 1 kg 250 g. What is the total weight of 4 such packets?",
    options: [
        { text: "5 kg", correct: true, feedback: "1.25 kg × 4 = 5 kg, or 1250 g × 4 = 5000 g = 5 kg." },
        { text: "5 kg 250 g", correct: false, feedback: "You multiplied the kg by 4 (4 kg) and added the 250 g only once.", misconceptionId: "E-w2-a" },
        { text: "4 kg", correct: false, feedback: "You only multiplied the kg part.", misconceptionId: "E-w2-b" },
        { text: "5000 g", correct: false, feedback: "That's correct in grams, but the question expects the answer in kg (or both). The answer 5 kg is equivalent; 5000 g is also 5 kg, but we'll use 5 kg as the mixed unit answer.", misconceptionId: "E-w2-c" }
      ],
    retryHint: "Convert to grams (1250 g), multiply by 4, then convert back to kg.",
    misconceptions: [
      {
        misconceptionId: "E-w2-a",
        description: "Student multiplies only the kg part (1×4=4kg) and adds the g part just once (250g) instead of multiplying it too, landing on 5kg 250g.",
        rootCause: "Partial-Multiplication Error — multiplies one component of a mixed-unit quantity but not the other.",
        remediation: "Convert the whole quantity to a single unit first (1 kg 250 g = 1250 g), THEN multiply the entire value by 4: 1250 × 4 = 5000 g."
      },
      {
        misconceptionId: "E-w2-b",
        description: "Student multiplies only the kg part (1×4=4kg) and completely drops the g part.",
        rootCause: "Mixed-Unit Component Dropped — ignores the grams component when scaling a combined kg+g quantity.",
        remediation: "Convert fully to grams first (1 kg 250 g = 1250 g), then multiply the WHOLE amount by 4, not just the kg part."
      },
      {
        misconceptionId: "E-w2-c",
        description: "Student correctly computes 5000 g but doesn't recognise this equals exactly 5 kg with no remainder.",
        rootCause: "Unit Equivalence Recognition Gap — doesn't connect the grams total back to a clean kilogram value.",
        remediation: "5000 g ÷ 1000 = 5 kg exactly — always simplify a large gram total back into kg when it divides evenly."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Convert to grams", hint: "1 kg 250 g = 1250 g." },
      { level: 2, description: "Multiply the whole amount", hint: "1250 × 4 = ?" },
      { level: 3, description: "Convert back to kg", hint: "5000 g = ? kg." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "MEASMASS-04", probability: 0.35, condition: "Multiplying only one component of a mixed-unit quantity recurs whenever scaling combined kg+g or m+cm amounts." }
    ],
    learningObjectives: ["CCSS.MATH.CONTENT.5.MD.A.1"]
  },
  {
    itemId: "w3",
    order: 3,
    cluster: "CAP",
    clusterName: CLUSTER_NAMES.CAP,
    skillId: "MEASCAP-05",
    question: "How many 250 ml bottles can be filled from a 2 l jug?",
    options: [
        { text: "8", correct: true, feedback: "2 l = 2000 ml. 2000 ÷ 250 = 8." },
        { text: "4", correct: false, feedback: "You divided by 500 instead of 250.", misconceptionId: "E-w3-a" },
        { text: "16", correct: false, feedback: "You doubled the answer.", misconceptionId: "E-w3-b" },
        { text: "2", correct: false, feedback: "You divided 2000 by 1000?", misconceptionId: "E-w3-c" }
      ],
    retryHint: "Convert 2 l to 2000 ml, then divide by the bottle capacity.",
    misconceptions: [
      {
        misconceptionId: "E-w3-a",
        description: "Student divides 2000 by 500 instead of the stated 250, using double the actual bottle capacity.",
        rootCause: "Divisor Value Misread — substitutes a different (larger) number for the bottle capacity given in the question.",
        remediation: "Re-check the bottle capacity stated in the question — it's 250 ml, not 500 ml — divide 2000 ÷ 250."
      },
      {
        misconceptionId: "E-w3-b",
        description: "Student doubles the correct answer, perhaps by dividing by 125 instead of 250.",
        rootCause: "Divisor Value Misread — uses half the stated bottle capacity, doubling the resulting count.",
        remediation: "Use the EXACT bottle capacity given: 250 ml — 2000 ÷ 250 = 8, not double that."
      },
      {
        misconceptionId: "E-w3-c",
        description: "Student divides 2000 by 1000 instead of 250, confusing the litre-to-ml conversion factor with the bottle capacity.",
        rootCause: "Conversion Factor / Divisor Confusion — mixes up the unit conversion number (1000) with the actual division needed (by 250).",
        remediation: "First convert 2 l to 2000 ml (using 1000), THEN divide by the bottle's capacity (250 ml) — these are two separate steps with different numbers."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Convert litres to ml", hint: "2 l = 2000 ml." },
      { level: 2, description: "Identify the division", hint: "Divide total ml by the capacity of one bottle (250 ml)." },
      { level: 3, description: "Divide", hint: "2000 ÷ 250 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.MD.A.1"]
  },
  {
    itemId: "w4",
    order: 4,
    cluster: "TIME",
    clusterName: CLUSTER_NAMES.TIME,
    skillId: "MEASTIME-03",
    question: "A train leaves at 09:45 and arrives at 12:10. How long is the journey?",
    options: [
        { text: "2 h 25 min", correct: true, feedback: "09:45 to 10:00 (15 min), to 12:00 (2 h), to 12:10 (10 min). Total 2 h 25 min." },
        { text: "3 h 25 min", correct: false, feedback: "You added an extra hour.", misconceptionId: "E-w4-a" },
        { text: "2 h 35 min", correct: false, feedback: "Miscalculated minutes.", misconceptionId: "E-w4-b" },
        { text: "1 h 25 min", correct: false, feedback: "Too short.", misconceptionId: "E-w4-c" }
      ],
    retryHint: "Count forward: from 09:45 to 10:00 is 15 min, then from 10:00 to 12:00 is 2 h, then add the extra 10 min.",
    misconceptions: [
      {
        misconceptionId: "E-w4-a",
        description: "Student counts an extra hour somewhere in the bridging process, overshooting the actual elapsed time by 1 hour.",
        rootCause: "Hour-Bridging Overcount — miscounts the number of whole hours between 10:00 and 12:00.",
        remediation: "Count the whole hours carefully: from 10:00 to 12:00 is exactly 2 hours (10→11→12), not 3."
      },
      {
        misconceptionId: "E-w4-b",
        description: "Student miscounts the minutes in one of the bridging segments, landing 10 minutes over the correct total.",
        rootCause: "Minutes Bridging Error — miscalculates one of the two minute segments (09:45→10:00 or 12:00→12:10).",
        remediation: "Check each segment separately: 09:45 to 10:00 is 15 minutes, and 12:00 to 12:10 is 10 minutes — add these two plus the 2 whole hours."
      },
      {
        misconceptionId: "E-w4-c",
        description: "Student undercounts, perhaps missing one of the three segments (the initial 15 min, the 2 hours, or the final 10 min).",
        rootCause: "Segment Omitted — drops one part of the three-part bridging calculation.",
        remediation: "Break the journey into three parts and add ALL of them: 09:45→10:00 (15 min) + 10:00→12:00 (2 h) + 12:00→12:10 (10 min)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Bridge to the next whole hour", hint: "From 09:45 to 10:00 is how many minutes?" },
      { level: 2, description: "Count the whole hours", hint: "From 10:00 to 12:00 is how many hours?" },
      { level: 3, description: "Bridge to the end time and add all parts", hint: "From 12:00 to 12:10 is 10 min. Add all three parts together." }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "w5",
    order: 5,
    cluster: "MONEY",
    clusterName: CLUSTER_NAMES.MONEY,
    skillId: "MEASMONEY-06",
    question: "Cost Price = ₹600, Selling Price = ₹750. Find the profit percentage.",
    options: [
        { text: "25%", correct: true, feedback: "Profit = ₹150. Profit % = (150 / 600) × 100 = 25%." },
        { text: "20%", correct: false, feedback: "You divided profit by Selling Price (150/750 = 20%).", misconceptionId: "E-w5-a" },
        { text: "15%", correct: false, feedback: "Incorrect calculation.", misconceptionId: "E-w5-b" },
        { text: "10%", correct: false, feedback: "Incorrect.", misconceptionId: "E-w5-c" }
      ],
    retryHint: "First find profit = SP − CP. Then Profit % = (Profit ÷ Cost Price) × 100.",
    misconceptions: [
      {
        misconceptionId: "E-w5-a",
        description: "Student divides the profit by Selling Price instead of Cost Price, using the wrong base for the percentage.",
        rootCause: "Wrong Percentage Base — uses SP instead of CP as the denominator in the profit percentage formula.",
        remediation: "Profit percentage is always calculated relative to the COST PRICE (what was originally paid), not the Selling Price: Profit % = (Profit ÷ CP) × 100."
      },
      {
        misconceptionId: "E-w5-b",
        description: "Student makes an error either in computing the profit or in the percentage division, landing on 15% instead of 25%.",
        rootCause: "Formula Computation Error — a miscalculation somewhere in the two-step profit-percentage formula.",
        remediation: "Work through the formula in two clear steps: Profit = 750 - 600 = 150. Then Profit % = (150 ÷ 600) × 100 = 25%."
      },
      {
        misconceptionId: "E-w5-c",
        description: "Student computes a percentage far too low, perhaps confusing the rate with a different, smaller reference value.",
        rootCause: "Formula Computation Error — a larger miscalculation in applying the profit-percentage formula.",
        remediation: "Recompute step by step: profit is SP-CP=150, then divide by CP (600) and multiply by 100 to get the percentage: 25%."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the profit", hint: "Profit = SP − CP = 750 − 600." },
      { level: 2, description: "Recall the percentage formula", hint: "Profit % = (Profit ÷ Cost Price) × 100 — always divide by CP." },
      { level: 3, description: "Compute", hint: "(150 ÷ 600) × 100 = ?" }
    ],
    forwardRiskLinks: [
      { targetSkillId: "MEASMONEY-03", probability: 0.4, condition: "Using the wrong base (SP instead of CP) recurs when computing loss percentage, which also bases its percentage on CP." }
    ],
    learningObjectives: []
  },
  {
    itemId: "w6",
    order: 6,
    cluster: "PAV",
    clusterName: CLUSTER_NAMES.PAV,
    skillId: "MEASPAV-05",
    question: "A rectangular field has length 20 m and breadth 15 m. Find its area and the cost of fencing at ₹10 per metre.",
    options: [
        { text: "Area 300 m², cost ₹700", correct: true, feedback: "Area = 20 × 15 = 300 m². Perimeter = 2 × (20+15) = 70 m. Cost = 70 × 10 = ₹700." },
        { text: "Area 300 m², cost ₹300", correct: false, feedback: "You used the area for fencing cost instead of perimeter.", misconceptionId: "E-w6-a" },
        { text: "Perimeter 70 m, cost ₹700 (no area)", correct: false, feedback: "You forgot to state the area.", misconceptionId: "E-w6-b" },
        { text: "Area 300 m, cost ₹700", correct: false, feedback: "Area units are incorrect (should be m²).", misconceptionId: "E-w6-c" }
      ],
    retryHint: "First area = length × breadth. Then perimeter = 2 × (length + breadth). Multiply perimeter by cost per metre.",
    misconceptions: [
      {
        misconceptionId: "E-w6-a",
        description: "Student uses the area (300) to compute fencing cost instead of the perimeter, mixing up which measurement fencing relates to.",
        rootCause: "Fencing-Perimeter Confusion — doesn't recognise that fencing wraps AROUND a field (perimeter), not the space inside (area).",
        remediation: "Fencing surrounds the boundary of the field — always use PERIMETER (not area) when computing fencing cost: cost = perimeter × rate per metre."
      },
      {
        misconceptionId: "E-w6-b",
        description: "Student computes the perimeter and cost correctly but never states the area, which the question explicitly also asks for.",
        rootCause: "Partial Answer — completes only part of a multi-part question.",
        remediation: "The question asks for BOTH area and cost — compute area = length × breadth (300 m²) in addition to the fencing cost."
      },
      {
        misconceptionId: "E-w6-c",
        description: "Student computes the correct numeric area value (300) but omits the required square units (m²).",
        rootCause: "Missing Square Units — forgets that area is always measured in SQUARE units, not linear units.",
        remediation: "Area is always expressed in square units (m², cm², etc.) — always append the ² when stating an area."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the area", hint: "Area = length × breadth = 20 × 15." },
      { level: 2, description: "Find the perimeter", hint: "Perimeter = 2 × (length + breadth) = 2 × (20+15)." },
      { level: 3, description: "Compute the fencing cost", hint: "Cost = perimeter × ₹10 per metre." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "MEASPAV-02", probability: 0.35, condition: "Confusing when to apply perimeter versus area recurs in real-world cost problems (fencing vs. flooring/painting)." }
    ],
    learningObjectives: ["CCSS.MATH.CONTENT.5.MD.C.5"]
  },
  {
    itemId: "w7",
    order: 7,
    cluster: "LENGTH",
    clusterName: CLUSTER_NAMES.LENGTH,
    skillId: "MEASLEN-01",
    question: "Convert 2.5 km to metres, then subtract 300 m.",
    options: [
        { text: "2200 m", correct: true, feedback: "2.5 km = 2500 m. 2500 − 300 = 2200 m." },
        { text: "2500 m", correct: false, feedback: "You forgot to subtract 300 m.", misconceptionId: "E-w7-a" },
        { text: "2000 m", correct: false, feedback: "You subtracted 500 m instead of 300 m.", misconceptionId: "E-w7-b" },
        { text: "220 m", correct: false, feedback: "Incorrect conversion.", misconceptionId: "E-w7-c" }
      ],
    retryHint: "First convert km to m (multiply by 1000), then subtract.",
    misconceptions: [
      {
        misconceptionId: "E-w7-a",
        description: "Student correctly converts to 2500 m but stops before subtracting 300 m.",
        rootCause: "Final-Step Omission — treats the conversion as the complete answer.",
        remediation: "The question has two parts: convert AND THEN subtract 300 m — complete both actions."
      },
      {
        misconceptionId: "E-w7-b",
        description: "Student subtracts 500 m instead of the stated 300 m.",
        rootCause: "Value Misread — substitutes a different number for the amount to subtract.",
        remediation: "Re-check the amount to subtract stated in the question — it's 300 m, not 500 m — 2500 - 300 = 2200."
      },
      {
        misconceptionId: "E-w7-c",
        description: "Student makes an error in the initial conversion, perhaps dividing instead of multiplying, landing on a value 10 times too small.",
        rootCause: "Conversion Direction Confusion — divides instead of multiplying when converting km (larger unit) to m (smaller unit).",
        remediation: "Converting km to m means MULTIPLYING by 1000: 2.5 × 1000 = 2500 m, then subtract 300 m."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Convert km to m", hint: "2.5 × 1000 = 2500 m." },
      { level: 2, description: "Subtract", hint: "2500 - 300 = ?" },
      { level: 3, description: "Check", hint: "Does your final answer make sense as a length slightly less than 2.5 km?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.MD.A.1"]
  },
  {
    itemId: "w8",
    order: 8,
    cluster: "CAP",
    clusterName: CLUSTER_NAMES.CAP,
    skillId: "MEASCAP-03",
    question: "A tank has 5 l 500 ml water. 2 l 750 ml is used. How much is left?",
    options: [
        { text: "2 l 750 ml", correct: true, feedback: "5500 ml − 2750 ml = 2750 ml = 2 l 750 ml." },
        { text: "3 l 250 ml", correct: false, feedback: "You subtracted incorrectly.", misconceptionId: "E-w8-a" },
        { text: "2 l 500 ml", correct: false, feedback: "Off by 250 ml.", misconceptionId: "E-w8-b" },
        { text: "2 l 250 ml", correct: false, feedback: "Incorrect subtraction of ml.", misconceptionId: "E-w8-c" }
      ],
    retryHint: "Convert both to millilitres (5500 ml and 2750 ml), subtract, then convert back.",
    misconceptions: [
      {
        misconceptionId: "E-w8-a",
        description: "Student subtracts without properly borrowing across the l/ml boundary, landing 500 ml above the correct answer.",
        rootCause: "Mixed-Unit Subtraction Borrowing Error — mishandles the regrouping needed when subtracting 2750 ml from 5500 ml.",
        remediation: "Convert fully to ml first: 5 l 500 ml = 5500 ml, 2 l 750 ml = 2750 ml. Subtract 5500 - 2750 = 2750 ml, then convert back."
      },
      {
        misconceptionId: "E-w8-b",
        description: "Student makes a smaller subtraction error, landing 250 ml above the correct answer.",
        rootCause: "Mixed-Unit Subtraction Error — a computational slip when subtracting combined l+ml quantities.",
        remediation: "Recompute carefully: 5500 ml - 2750 ml = 2750 ml — verify by adding 2750 back to 2750 to see if it returns 5500."
      },
      {
        misconceptionId: "E-w8-c",
        description: "Student makes an error specifically in the ml portion of the subtraction, landing 500 ml below the correct answer.",
        rootCause: "Mixed-Unit Subtraction Error — a different computational slip in the ml column.",
        remediation: "Convert everything to ml: 5500 ml - 2750 ml = 2750 ml — double-check this subtraction column by column."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Convert to a single unit", hint: "5 l 500 ml = 5500 ml. 2 l 750 ml = 2750 ml." },
      { level: 2, description: "Subtract", hint: "5500 - 2750 = ?" },
      { level: 3, description: "Convert back to mixed units", hint: "2750 ml = ? l ? ml." }
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
    question: "A road is 12 km 400 m long. 5 km 800 m is repaired. How much remains to be repaired?",
    options: [
        { text: "6 km 600 m", correct: true, feedback: "12400 m − 5800 m = 6600 m = 6 km 600 m." },
        { text: "6 km 400 m", correct: false, feedback: "You forgot to borrow when subtracting the metres.", misconceptionId: "E-d1-a" },
        { text: "7 km 200 m", correct: false, feedback: "You added instead of subtracting.", misconceptionId: "E-d1-b" },
        { text: "5 km 600 m", correct: false, feedback: "Incorrect subtraction.", misconceptionId: "E-d1-c" }
      ],
    backward: "Convert both to metres, subtract, then convert back.",
    forward: "Real‑life roadwork and measuring use mixed units.",
    misconceptions: [
      {
        misconceptionId: "E-d1-a",
        description: "Student subtracts the km parts directly (12-5=7, then adjusts down) without properly borrowing when 800 m exceeds 400 m, landing on 6 km 400 m.",
        rootCause: "Mixed-Unit Subtraction Borrowing Error — doesn't borrow across the km/m boundary when the metres being subtracted (800) exceed what's available (400).",
        remediation: "Convert fully to metres first: 12 km 400 m = 12400 m, 5 km 800 m = 5800 m. Subtract 12400 - 5800 = 6600 m, then convert back — this avoids borrowing mistakes."
      },
      {
        misconceptionId: "E-d1-b",
        description: "Student adds the two lengths instead of subtracting, producing a result larger than the starting length.",
        rootCause: "Operation Sign Misread — performs addition when subtraction was requested.",
        remediation: "The question asks how much REMAINS after repairing part of the road — this means subtracting, not adding."
      },
      {
        misconceptionId: "E-d1-c",
        description: "Student makes a computational error in the subtraction, landing 1000 m below the correct answer.",
        rootCause: "Mixed-Unit Subtraction Error — a larger computational slip when subtracting combined km+m quantities.",
        remediation: "Convert everything to metres: 12400 m - 5800 m = 6600 m — double-check this subtraction by adding 6600 back to 5800 to see if it returns 12400."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Convert to a single unit", hint: "12 km 400 m = 12400 m. 5 km 800 m = 5800 m." },
      { level: 2, description: "Subtract", hint: "12400 - 5800 = ?" },
      { level: 3, description: "Convert back to mixed units", hint: "6600 m = ? km ? m." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.MD.A.1"]
  },
  {
    itemId: "d2",
    order: 2,
    cluster: "MASS",
    clusterName: CLUSTER_NAMES.MASS,
    skillId: "MEASMASS-05",
    question: "A shopkeeper has 8 bags of rice, each weighing 2 kg 500 g. What is the total mass in kg?",
    options: [
        { text: "20 kg", correct: true, feedback: "2.5 kg × 8 = 20 kg. Or 2500 g × 8 = 20000 g = 20 kg." },
        { text: "16 kg", correct: false, feedback: "You only multiplied 2 kg by 8, forgot the 500 g.", misconceptionId: "E-d2-a" },
        { text: "20 kg 500 g", correct: false, feedback: "You added an extra 500 g.", misconceptionId: "E-d2-b" },
        { text: "200 kg", correct: false, feedback: "Decimal error.", misconceptionId: "E-d2-c" }
      ],
    backward: "Convert to kg (2.5), multiply, or multiply grams then convert.",
    forward: "Scaling recipes and inventory use this.",
    misconceptions: [
      {
        misconceptionId: "E-d2-a",
        description: "Student multiplies only the kg part (2×8=16kg) and completely drops the g part.",
        rootCause: "Mixed-Unit Component Dropped — ignores the grams component when scaling a combined kg+g quantity.",
        remediation: "Convert fully to grams first (2 kg 500 g = 2500 g), then multiply the WHOLE amount by 8, not just the kg part."
      },
      {
        misconceptionId: "E-d2-b",
        description: "Student multiplies the kg part correctly (2×8=16kg) but then adds the 500 g just once instead of also scaling it by 8, landing on 20 kg 500 g by coincidence of rounding.",
        rootCause: "Partial-Multiplication Error — multiplies one component of a mixed-unit quantity but treats the other as a fixed add-on rather than scaling it too.",
        remediation: "Convert the whole quantity to a single unit first (2 kg 500 g = 2500 g), THEN multiply the entire value by 8: 2500 × 8 = 20000 g = 20 kg."
      },
      {
        misconceptionId: "E-d2-c",
        description: "Student makes a decimal/place-value error while converting, overshooting the result by a factor of 10.",
        rootCause: "Power-of-Ten Shift Miscount — misplaces a decimal or zero somewhere in the conversion or multiplication.",
        remediation: "Work step by step: 2 kg 500 g = 2.5 kg. 2.5 × 8 = 20 kg — recompute this multiplication carefully."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Convert to a single unit", hint: "2 kg 500 g = 2500 g, or 2.5 kg." },
      { level: 2, description: "Multiply the whole amount", hint: "2.5 × 8 = ?" },
      { level: 3, description: "Check your answer", hint: "Does 20 kg make sense for 8 bags around 2.5 kg each?" }
    ],
    forwardRiskLinks: [
      { targetSkillId: "MEASMASS-04", probability: 0.35, condition: "Multiplying only one component of a mixed-unit quantity recurs whenever scaling combined kg+g or m+cm amounts." }
    ],
    learningObjectives: ["CCSS.MATH.CONTENT.5.MD.A.1"]
  },
  {
    itemId: "d3",
    order: 3,
    cluster: "CAP",
    clusterName: CLUSTER_NAMES.CAP,
    skillId: "MEASCAP-05",
    question: "How many 300 ml glasses can be filled from a 2 l 400 ml bottle?",
    options: [
        { text: "8", correct: true, feedback: "2 l 400 ml = 2400 ml. 2400 ÷ 300 = 8." },
        { text: "6", correct: false, feedback: "You used 400 ml only? 400÷300 ≈ 1.3, not 6.", misconceptionId: "E-d3-a" },
        { text: "10", correct: false, feedback: "You divided 3000 by 300? The total is 2400, not 3000.", misconceptionId: "E-d3-b" },
        { text: "12", correct: false, feedback: "Incorrect conversion.", misconceptionId: "E-d3-c" }
      ],
    backward: "Convert total to ml, then divide by capacity per glass.",
    forward: "Catering and party planning use this.",
    misconceptions: [
      {
        misconceptionId: "E-d3-a",
        description: "Student uses only the 400 ml part of the mixed-unit quantity, ignoring the 2 l, before dividing.",
        rootCause: "Mixed-Unit Component Dropped — ignores the litres component when converting a combined l+ml quantity.",
        remediation: "Convert the WHOLE bottle capacity to ml first: 2 l 400 ml = 2400 ml (not just 400 ml), then divide by 300."
      },
      {
        misconceptionId: "E-d3-b",
        description: "Student uses an incorrect total (like 3000 ml) instead of the correct 2400 ml before dividing.",
        rootCause: "Total Quantity Miscalculation — converts the mixed-unit quantity incorrectly before dividing.",
        remediation: "Convert 2 l 400 ml carefully: 2 l = 2000 ml, plus 400 ml = 2400 ml total — this is the number to divide by 300."
      },
      {
        misconceptionId: "E-d3-c",
        description: "Student makes a general conversion or division error, landing on 12 instead of 8.",
        rootCause: "Mixed-Unit Conversion Error — a computational slip somewhere in converting or dividing.",
        remediation: "Convert 2 l 400 ml to 2400 ml, then divide by 300 ml: 2400 ÷ 300 = 8 — recheck each step."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Convert to a single unit", hint: "2 l 400 ml = 2400 ml." },
      { level: 2, description: "Identify the division", hint: "Divide total ml by the capacity of one glass (300 ml)." },
      { level: 3, description: "Divide", hint: "2400 ÷ 300 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.MD.A.1"]
  },
  {
    itemId: "d4",
    order: 4,
    cluster: "TIME",
    clusterName: CLUSTER_NAMES.TIME,
    skillId: "MEASTIME-01",
    question: "A meeting starts at 10:15 AM and lasts 1 hour 40 minutes. What time does it end?",
    options: [
        { text: "11:55 AM", correct: true, feedback: "10:15 + 1:00 = 11:15; + 0:40 = 11:55 AM." },
        { text: "11:45 AM", correct: false, feedback: "You added 30 min instead of 40.", misconceptionId: "E-d4-a" },
        { text: "12:55 PM", correct: false, feedback: "You added 2 hours instead of 1 h 40 min.", misconceptionId: "E-d4-b" },
        { text: "11:55 PM", correct: false, feedback: "Wrong AM/PM.", misconceptionId: "E-d4-c" }
      ],
    backward: "Add hours first, then minutes. If minutes ≥60, carry an hour.",
    forward: "Scheduling and daily planning.",
    misconceptions: [
      {
        misconceptionId: "E-d4-a",
        description: "Student adds only 30 minutes instead of the stated 40 minutes.",
        rootCause: "Value Misread — substitutes a different number of minutes than what the question states.",
        remediation: "Re-check the duration stated: 1 hour 40 minutes — after adding the 1 hour (11:15), add the full 40 minutes, not 30."
      },
      {
        misconceptionId: "E-d4-b",
        description: "Student adds 2 full hours instead of 1 hour 40 minutes, treating the duration as closer to 2 hours.",
        rootCause: "Duration Rounding Error — rounds 1 h 40 min up to a full 2 hours instead of adding it precisely.",
        remediation: "1 hour 40 minutes is NOT 2 hours — add exactly 1 hour first (10:15→11:15), then add the remaining 40 minutes precisely."
      },
      {
        misconceptionId: "E-d4-c",
        description: "Student computes the correct time (11:55) but labels it PM instead of AM.",
        rootCause: "AM/PM Assignment Error — doesn't track that the meeting stays within the AM period since it doesn't cross 12:00 noon.",
        remediation: "Starting at 10:15 AM and adding under 2 hours stays before 12:00 noon — the end time remains AM: 11:55 AM."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Add the whole hour first", hint: "10:15 AM + 1 hour = 11:15 AM." },
      { level: 2, description: "Add the remaining minutes", hint: "11:15 AM + 40 minutes = ?" },
      { level: 3, description: "Check for carrying", hint: "15 + 40 = 55 minutes — no carry into the next hour needed." }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d5",
    order: 5,
    cluster: "MONEY",
    clusterName: CLUSTER_NAMES.MONEY,
    skillId: "MEASMONEY-04",
    question: "Find the simple interest on ₹800 at 5% per annum for 2 years.",
    options: [
        { text: "₹80", correct: true, feedback: "SI = 800 × 5 × 2 / 100 = 8000 / 100 = ₹80." },
        { text: "₹40", correct: false, feedback: "You only calculated for 1 year (800×5/100 = 40).", misconceptionId: "E-d5-a" },
        { text: "₹160", correct: false, feedback: "You used rate 10%.", misconceptionId: "E-d5-b" },
        { text: "₹800", correct: false, feedback: "That's the principal.", misconceptionId: "E-d5-c" }
      ],
    backward: "SI = P × R × T / 100.",
    forward: "Loans and savings use simple interest.",
    misconceptions: [
      {
        misconceptionId: "E-d5-a",
        description: "Student computes the interest for only 1 year, forgetting to multiply by the stated Time of 2 years.",
        rootCause: "Time Factor Omitted — drops the Time (T) variable from the Simple Interest formula.",
        remediation: "The formula is P × R × T / 100 — Time (2 years) is a required factor, not optional: 800 × 5 × 2 / 100 = 80."
      },
      {
        misconceptionId: "E-d5-b",
        description: "Student uses a rate of 10% instead of the stated 5%, doubling the correct interest.",
        rootCause: "Rate Misread — uses a different percentage value than the one given in the question.",
        remediation: "Double-check the rate stated in the question — it says 5%, not 10% — use 800 × 5 × 2 / 100, not 800 × 10 × 2 / 100."
      },
      {
        misconceptionId: "E-d5-c",
        description: "Student reports the Principal (₹800) itself instead of computing the interest earned on it.",
        rootCause: "Wrong Value Reported — confuses the given principal amount with the requested interest result.",
        remediation: "The question asks for the INTEREST earned, which is calculated FROM the principal using the formula — it is not the principal itself."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the formula", hint: "Simple Interest = Principal × Rate × Time / 100." },
      { level: 2, description: "Substitute the values", hint: "800 × 5 × 2 / 100." },
      { level: 3, description: "Compute step by step", hint: "800 × 5 × 2 = 8000. Now divide by 100." }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d6",
    order: 6,
    cluster: "PAV",
    clusterName: CLUSTER_NAMES.PAV,
    skillId: "MEASPAV-05",
    question: "A rectangular floor measures 6 m by 4 m. Tiles cost ₹50 per square metre. Find the total cost.",
    options: [
        { text: "₹1200", correct: true, feedback: "Area = 6 × 4 = 24 m². Cost = 24 × 50 = ₹1200." },
        { text: "₹500", correct: false, feedback: "You used perimeter (20 m) × 50 = 1000? Actually 20×50=1000, not 500.", misconceptionId: "E-d6-a" },
        { text: "₹2400", correct: false, feedback: "You doubled the cost.", misconceptionId: "E-d6-b" },
        { text: "₹240", correct: false, feedback: "You multiplied area by 10.", misconceptionId: "E-d6-c" }
      ],
    backward: "Area = length × breadth. Multiply area by cost per square metre.",
    forward: "Home renovation and budgeting.",
    misconceptions: [
      {
        misconceptionId: "E-d6-a",
        description: "Student uses the perimeter instead of the area to compute tiling cost, since tiles cover a floor's SURFACE, not its boundary.",
        rootCause: "Tiling-Area Confusion — doesn't recognise that tiling cost relates to the space covered (area), not the distance around (perimeter).",
        remediation: "Tiles cover the FLOOR SURFACE — always use AREA (not perimeter) when computing tiling cost: cost = area × rate per m²."
      },
      {
        misconceptionId: "E-d6-b",
        description: "Student computes the correct area and cost but then doubles the final cost unnecessarily.",
        rootCause: "Extraneous Doubling Step — applies an unneeded multiplication by 2 after correctly computing the cost.",
        remediation: "Once area (24 m²) is multiplied by the rate (₹50) to get ₹1200, no further doubling is needed — that is the final cost."
      },
      {
        misconceptionId: "E-d6-c",
        description: "Student multiplies the area by 10 instead of the stated rate of ₹50 per square metre.",
        rootCause: "Rate Misread — substitutes a different number for the cost-per-square-metre rate given in the question.",
        remediation: "Re-check the rate stated in the question — it's ₹50 per m², not ₹10 — 24 × 50 = 1200."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the area", hint: "Area = length × breadth = 6 × 4." },
      { level: 2, description: "Identify the operation", hint: "Multiply area by the cost per square metre." },
      { level: 3, description: "Compute", hint: "24 × 50 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.MD.C.5"]
  },
  {
    itemId: "d7",
    order: 7,
    cluster: "LENGTH",
    clusterName: CLUSTER_NAMES.LENGTH,
    skillId: "MEASPAV-06",
    question: "A square field has area 64 m². Find its perimeter.",
    options: [
        { text: "32 m", correct: true, feedback: "Side = √64 = 8 m. Perimeter = 4 × 8 = 32 m." },
        { text: "16 m", correct: false, feedback: "You multiplied the side by 2 instead of 4.", misconceptionId: "E-d7-a" },
        { text: "8 m", correct: false, feedback: "That's the side length.", misconceptionId: "E-d7-b" },
        { text: "64 m", correct: false, feedback: "That's the area.", misconceptionId: "E-d7-c" }
      ],
    backward: "First find side length (√area), then perimeter = 4 × side.",
    forward: "Geometry and measurement combined.",
    misconceptions: [
      {
        misconceptionId: "E-d7-a",
        description: "Student correctly finds the side (8 m) but multiplies it by 2 instead of 4 to find the perimeter.",
        rootCause: "Wrong Multiplier Applied — uses a factor of 2 instead of the correct factor of 4 for a square's four equal sides.",
        remediation: "A square has FOUR equal sides — perimeter = 4 × side, not 2 × side."
      },
      {
        misconceptionId: "E-d7-b",
        description: "Student correctly finds the side length (8 m) via the square root but stops there without computing the perimeter.",
        rootCause: "Final-Step Omission — treats the intermediate side-length calculation as the complete answer.",
        remediation: "Finding the side is only step one — the question asks for the PERIMETER, which requires multiplying the side by 4."
      },
      {
        misconceptionId: "E-d7-c",
        description: "Student reports the given area (64) directly as if it were the perimeter, without any calculation.",
        rootCause: "Wrong Value Reported — confuses the given area with the requested perimeter.",
        remediation: "Area and perimeter are different measurements — you must first find the side (√64=8), then compute perimeter = 4×8, not just restate the area."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the side length", hint: "Side = √64 (what number times itself equals 64?)." },
      { level: 2, description: "Recall the perimeter formula", hint: "Perimeter of square = 4 × side." },
      { level: 3, description: "Compute", hint: "4 × 8 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.MD.C.5"]
  },
  {
    itemId: "d8",
    order: 8,
    cluster: "MASS",
    clusterName: CLUSTER_NAMES.MASS,
    skillId: "MEASMASS-02",
    question: "A box of chocolates weighs 2 kg. The box alone weighs 350 g. What is the weight of the chocolates?",
    options: [
        { text: "1 kg 650 g", correct: true, feedback: "2000 g − 350 g = 1650 g = 1 kg 650 g." },
        { text: "1 kg 750 g", correct: false, feedback: "Subtraction error.", misconceptionId: "E-d8-a" },
        { text: "2 kg 350 g", correct: false, feedback: "You added instead of subtracting.", misconceptionId: "E-d8-b" },
        { text: "1650 g", correct: false, feedback: "Answer should be in mixed units as per question (1 kg 650 g).", misconceptionId: "E-d8-c" }
      ],
    backward: "Convert to grams, subtract, convert back.",
    forward: "Net weight is important in packaging and trade.",
    misconceptions: [
      {
        misconceptionId: "E-d8-a",
        description: "Student makes a computational error in the subtraction, landing 100 g above the correct answer.",
        rootCause: "Mixed-Unit Subtraction Error — a computational slip when subtracting 350 g from 2000 g.",
        remediation: "Recompute carefully: 2000 g - 350 g = 1650 g — verify by adding 1650 back to 350 to see if it returns 2000."
      },
      {
        misconceptionId: "E-d8-b",
        description: "Student adds the box weight and total weight instead of subtracting, producing a result larger than the starting total.",
        rootCause: "Operation Sign Misread — performs addition when subtraction was requested.",
        remediation: "The total weight (2 kg) includes the box — to find just the chocolates, SUBTRACT the box weight: 2000 g - 350 g."
      },
      {
        misconceptionId: "E-d8-c",
        description: "Student computes the correct numeric value (1650 g) but doesn't convert it into the mixed kg+g format the question implies.",
        rootCause: "Unit Format Mismatch — leaves the answer in a single unit (g) instead of the expected mixed format (kg + g).",
        remediation: "Convert the result to mixed units for clarity: 1650 g = 1 kg 650 g — this matches the format used throughout the question."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Convert to a single unit", hint: "2 kg = 2000 g." },
      { level: 2, description: "Subtract", hint: "2000 - 350 = ?" },
      { level: 3, description: "Convert back to mixed units", hint: "1650 g = ? kg ? g." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.MD.A.1"]
  },
  {
    itemId: "d9",
    order: 9,
    cluster: "CAP",
    clusterName: CLUSTER_NAMES.CAP,
    skillId: "MEASCAP-04",
    question: "A jug contains 1 l 200 ml. Another 800 ml is added. Express the total in litres.",
    options: [
        { text: "2 l", correct: true, feedback: "1200 ml + 800 ml = 2000 ml = 2 l." },
        { text: "1.8 l", correct: false, feedback: "You added incorrectly (1200+800=2000, not 1800).", misconceptionId: "E-d9-a" },
        { text: "2.2 l", correct: false, feedback: "Incorrect addition.", misconceptionId: "E-d9-b" },
        { text: "2000 l", correct: false, feedback: "Wrong unit.", misconceptionId: "E-d9-c" }
      ],
    backward: "Add volumes in ml, then divide by 1000.",
    forward: "Cooking and mixing solutions.",
    misconceptions: [
      {
        misconceptionId: "E-d9-a",
        description: "Student makes a computational error in the addition, landing 200 ml below the correct total.",
        rootCause: "Addition Computation Error — miscalculates 1200 + 800.",
        remediation: "Recompute carefully: 1200 + 800 = 2000 — verify by checking that 2000 - 800 returns 1200."
      },
      {
        misconceptionId: "E-d9-b",
        description: "Student makes a computational error in the addition, landing 200 ml above the correct total.",
        rootCause: "Addition Computation Error — a different miscalculation of 1200 + 800.",
        remediation: "Recompute carefully: 1200 + 800 = 2000, not 2200 — double-check by adding the hundreds columns: 12+8=20 hundreds."
      },
      {
        misconceptionId: "E-d9-c",
        description: "Student correctly computes 2000 ml but reports the wrong unit, using litres as the label for the ml value directly.",
        rootCause: "Unit Label Carryover Error — forgets to convert the final unit label back to litres by dividing by 1000.",
        remediation: "2000 ml must be DIVIDED by 1000 to express it in litres: 2000 ÷ 1000 = 2 l, not 2000 l."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Convert to a single unit", hint: "1 l 200 ml = 1200 ml." },
      { level: 2, description: "Add", hint: "1200 + 800 = ?" },
      { level: 3, description: "Convert to litres", hint: "2000 ml = ? l." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.MD.A.1"]
  },
  {
    itemId: "d10",
    order: 10,
    cluster: "TIME",
    clusterName: CLUSTER_NAMES.TIME,
    skillId: "MEASTIME-06",
    question: "A flight departs at 23:15 and arrives at 07:45 the next day. How long is the flight?",
    options: [
        { text: "8 h 30 min", correct: true, feedback: "23:15 to 24:00 = 45 min; 00:00 to 07:45 = 7 h 45 min; total = 8 h 30 min." },
        { text: "7 h 30 min", correct: false, feedback: "You miscalculated the minutes.", misconceptionId: "E-d10-a" },
        { text: "9 h", correct: false, feedback: "Off by 30 min.", misconceptionId: "E-d10-b" },
        { text: "8 h", correct: false, feedback: "Forgot the minutes.", misconceptionId: "E-d10-c" }
      ],
    backward: "Calculate to midnight, then add the time after midnight.",
    forward: "International travel and scheduling.",
    misconceptions: [
      {
        misconceptionId: "E-d10-a",
        description: "Student undercounts the total by 1 hour, perhaps missing part of the pre-midnight segment.",
        rootCause: "Midnight-Bridging Error — miscounts one of the two segments (before or after midnight).",
        remediation: "Break the journey into two parts: 23:15 to midnight (45 min) and midnight to 07:45 (7 h 45 min) — add both parts carefully."
      },
      {
        misconceptionId: "E-d10-b",
        description: "Student rounds the total up to a clean 9 hours instead of computing the precise 8 h 30 min.",
        rootCause: "Duration Rounding Error — estimates rather than computing the exact elapsed time.",
        remediation: "Compute exactly: 45 min (to midnight) + 7 h 45 min (after midnight) = 8 h 30 min — don't round to a cleaner number."
      },
      {
        misconceptionId: "E-d10-c",
        description: "Student counts the whole hours correctly but drops the 30 minutes remainder.",
        rootCause: "Minutes Component Dropped — computes the hour count but forgets to add the remaining minutes.",
        remediation: "After bridging through midnight, add BOTH the hours and the leftover minutes: 45 min + 7 h 45 min = 8 h 30 min (the minutes combine to a half hour)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Bridge to midnight", hint: "From 23:15 to 24:00 (midnight) is how many minutes?" },
      { level: 2, description: "Count from midnight to arrival", hint: "From 00:00 to 07:45 is how many hours and minutes?" },
      { level: 3, description: "Add both parts", hint: "45 min + 7 h 45 min = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d11",
    order: 11,
    cluster: "MONEY",
    clusterName: CLUSTER_NAMES.MONEY,
    skillId: "MEASMONEY-07",
    question: "A toy was bought for ₹500 and sold for ₹400. Find the loss percentage.",
    options: [
        { text: "20%", correct: true, feedback: "Loss = ₹100. Loss % = (100 / 500) × 100 = 20%." },
        { text: "25%", correct: false, feedback: "You divided loss by Selling Price (100/400 = 25%).", misconceptionId: "E-d11-a" },
        { text: "10%", correct: false, feedback: "Incorrect calculation.", misconceptionId: "E-d11-b" },
        { text: "50%", correct: false, feedback: "Incorrect.", misconceptionId: "E-d11-c" }
      ],
    backward: "Loss % = (Loss ÷ Cost Price) × 100.",
    forward: "Understanding discounts and sales.",
    misconceptions: [
      {
        misconceptionId: "E-d11-a",
        description: "Student divides the loss by Selling Price instead of Cost Price, using the wrong base for the percentage.",
        rootCause: "Wrong Percentage Base — uses SP instead of CP as the denominator in the loss percentage formula.",
        remediation: "Loss percentage is always calculated relative to the COST PRICE (what was originally paid), not the Selling Price: Loss % = (Loss ÷ CP) × 100."
      },
      {
        misconceptionId: "E-d11-b",
        description: "Student makes an error either in computing the loss or in the percentage division, landing on a value too low.",
        rootCause: "Formula Computation Error — a miscalculation somewhere in the two-step loss-percentage formula.",
        remediation: "Work through the formula in two clear steps: Loss = 500 - 400 = 100. Then Loss % = (100 ÷ 500) × 100 = 20%."
      },
      {
        misconceptionId: "E-d11-c",
        description: "Student computes a percentage far too high, perhaps confusing the loss amount with the base incorrectly.",
        rootCause: "Formula Computation Error — a larger miscalculation in applying the loss-percentage formula.",
        remediation: "Recompute step by step: loss is CP-SP=100, then divide by CP (500) and multiply by 100 to get the percentage: 20%."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the loss", hint: "Loss = CP − SP = 500 − 400." },
      { level: 2, description: "Recall the percentage formula", hint: "Loss % = (Loss ÷ Cost Price) × 100 — always divide by CP." },
      { level: 3, description: "Compute", hint: "(100 ÷ 500) × 100 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d12",
    order: 12,
    cluster: "PAV",
    clusterName: CLUSTER_NAMES.PAV,
    skillId: "MEASPAV-04",
    question: "A cuboid block of cheese measures 10 cm × 5 cm × 4 cm. 1 cm³ weighs 2 g. Find the total weight in kg.",
    options: [
        { text: "0.4 kg", correct: true, feedback: "Volume = 10×5×4 = 200 cm³. Weight = 200 × 2 = 400 g = 0.4 kg." },
        { text: "400 kg", correct: false, feedback: "You didn't convert grams to kilograms.", misconceptionId: "E-d12-a" },
        { text: "0.2 kg", correct: false, feedback: "You used 1 g per cm³ instead of 2 g.", misconceptionId: "E-d12-b" },
        { text: "4 kg", correct: false, feedback: "Decimal error.", misconceptionId: "E-d12-c" }
      ],
    backward: "Volume = l × b × h. Multiply by weight per cm³, then convert to kg.",
    forward: "Density and weight calculations.",
    misconceptions: [
      {
        misconceptionId: "E-d12-a",
        description: "Student correctly finds 400 g but reports it with the wrong unit label (kg) instead of dividing by 1000.",
        rootCause: "Unit Label Swap Without Conversion — changes the unit name without performing the actual division needed to convert the value.",
        remediation: "Finding 400 g and then converting to kg requires DIVIDING by 1000: 400 g ÷ 1000 = 0.4 kg — don't just relabel the number."
      },
      {
        misconceptionId: "E-d12-b",
        description: "Student uses 1 g per cm³ instead of the stated 2 g per cm³, halving the correct weight.",
        rootCause: "Rate Misread — substitutes a different weight-per-volume rate than the one given in the question.",
        remediation: "Re-check the rate stated: 1 cm³ weighs 2 g, not 1 g — multiply the volume (200 cm³) by 2, not 1."
      },
      {
        misconceptionId: "E-d12-c",
        description: "Student makes a decimal placement error when converting grams to kg, overshooting by a factor of 10.",
        rootCause: "Power-of-Ten Shift Miscount — misplaces the decimal point when dividing by 1000.",
        remediation: "400 g ÷ 1000 = 0.4 kg exactly — count the zeros in 1000 (three) and shift the decimal three places left."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the volume", hint: "Volume = 10 × 5 × 4 = ? cm³." },
      { level: 2, description: "Find the weight in grams", hint: "Multiply volume by the weight per cm³ (2 g)." },
      { level: 3, description: "Convert to kg", hint: "400 g ÷ 1000 = ? kg." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.MD.C.5"]
  },
  {
    itemId: "d13",
    order: 13,
    cluster: "LENGTH",
    clusterName: CLUSTER_NAMES.LENGTH,
    skillId: "MEASLEN-05",
    question: "A roll of ribbon is 15 m long. How many full pieces of 40 cm each can be cut?",
    options: [
        { text: "37", correct: true, feedback: "15 m = 1500 cm. 1500 ÷ 40 = 37.5, so 37 full pieces." },
        { text: "30", correct: false, feedback: "You divided by 50 instead of 40.", misconceptionId: "E-d13-a" },
        { text: "38", correct: false, feedback: "You rounded up, but you cannot get a full 38th piece.", misconceptionId: "E-d13-b" },
        { text: "40", correct: false, feedback: "Incorrect calculation.", misconceptionId: "E-d13-c" }
      ],
    backward: "Convert metres to cm, divide, take the whole number part.",
    forward: "Cutting materials efficiently.",
    misconceptions: [
      {
        misconceptionId: "E-d13-a",
        description: "Student divides 1500 by 50 instead of the stated 40, using the wrong piece length.",
        rootCause: "Divisor Value Misread — substitutes a different piece length than what the question states.",
        remediation: "Re-check the piece length stated in the question — it's 40 cm, not 50 cm — divide 1500 ÷ 40."
      },
      {
        misconceptionId: "E-d13-b",
        description: "Student computes 1500 ÷ 40 = 37.5 correctly but rounds UP to 38, not realising a half-piece can't be a full piece.",
        rootCause: "Rounding Direction Error in Division-with-Remainder — rounds a division-with-remainder result up instead of down when counting whole usable units.",
        remediation: "When dividing to find how many FULL pieces fit, always round DOWN (truncate), never up — 37.5 means only 37 complete pieces, with 20 cm left over unused."
      },
      {
        misconceptionId: "E-d13-c",
        description: "Student makes a computational error in the conversion or division, landing on 40 instead of 37.",
        rootCause: "Conversion/Division Error — a miscalculation in converting metres to cm or in the division itself.",
        remediation: "Convert 15 m to 1500 cm first, then divide by 40: 1500 ÷ 40 = 37.5 — recheck this calculation and round down to 37."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Convert to a single unit", hint: "15 m = 1500 cm." },
      { level: 2, description: "Divide", hint: "1500 ÷ 40 = ?" },
      { level: 3, description: "Round down for full pieces", hint: "37.5 means only 37 COMPLETE pieces fit — round down, not up." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "MEASCAP-05", probability: 0.35, condition: "Rounding a division-with-remainder result up instead of down recurs in 'how many full containers/groups fit' problems across capacity and mass." }
    ],
    learningObjectives: ["CCSS.MATH.CONTENT.5.MD.A.1"]
  },
  {
    itemId: "d14",
    order: 14,
    cluster: "MASS",
    clusterName: CLUSTER_NAMES.MASS,
    skillId: "MEASMASS-06",
    question: "Find the total mass in kg: 2 kg 500 g + 3 kg 250 g + 1 kg 750 g.",
    options: [
        { text: "7.5 kg", correct: true, feedback: "Grams total: 500+250+750 = 1500 g = 1.5 kg. Kg total: 2+3+1 = 6 kg. Sum = 7.5 kg." },
        { text: "6.5 kg", correct: false, feedback: "You forgot to convert the grams.", misconceptionId: "E-d14-a" },
        { text: "8 kg", correct: false, feedback: "Incorrect addition.", misconceptionId: "E-d14-b" },
        { text: "7500 g", correct: false, feedback: "That's the total in grams, but the question asks for kg.", misconceptionId: "E-d14-c" }
      ],
    backward: "Add kg and g separately; if g ≥1000, convert to kg and carry.",
    forward: "Adding multiple items in a basket.",
    misconceptions: [
      {
        misconceptionId: "E-d14-a",
        description: "Student adds only the kg parts (2+3+1=6) and drops the grams entirely, missing the carried 1.5 kg from the grams total.",
        rootCause: "Carry-Across-Units Omission — doesn't recognise that summing the grams (1500 g) itself contributes an extra 1.5 kg.",
        remediation: "After adding the grams (500+250+750=1500g), check if it's 1000 or more — 1500 g = 1.5 kg, which must be ADDED to the kg total, not dropped."
      },
      {
        misconceptionId: "E-d14-b",
        description: "Student makes a computational error somewhere in the addition, landing 0.5 kg above the correct total.",
        rootCause: "Multi-Term Mixed-Unit Addition Error — miscalculates while combining three separate kg+g quantities.",
        remediation: "Add the grams first (500+250+750=1500g=1.5kg), then add the kg parts (2+3+1=6kg), then combine: 6+1.5=7.5kg — check each step."
      },
      {
        misconceptionId: "E-d14-c",
        description: "Student correctly computes the total in grams (7500 g) but doesn't convert it to kg as the question requests.",
        rootCause: "Unit Format Mismatch — leaves the answer in grams instead of converting to the requested kg format.",
        remediation: "The question explicitly asks for the total 'in kg' — convert 7500 g ÷ 1000 = 7.5 kg before answering."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Add the grams", hint: "500 + 250 + 750 = ?" },
      { level: 2, description: "Convert the grams total to kg", hint: "1500 g = 1.5 kg." },
      { level: 3, description: "Add the kg parts and combine", hint: "2 + 3 + 1 = 6 kg. Then 6 + 1.5 = ?" }
    ],
    forwardRiskLinks: [
      { targetSkillId: "MEASLEN-02", probability: 0.3, condition: "Dropping the carried unit when summing the smaller component recurs in multi-term mixed-unit addition across length and capacity." }
    ],
    learningObjectives: ["CCSS.MATH.CONTENT.5.MD.A.1"]
  },
  {
    itemId: "d15",
    order: 15,
    cluster: "CAP",
    clusterName: CLUSTER_NAMES.CAP,
    skillId: "MEASCAP-06",
    question: "A 5 l container has 3 l 500 ml of water. What fraction of the container is filled? (Simplify your answer.)",
    options: [
        { text: "\\(\\frac{7}{10}\\)", correct: true, feedback: "3.5 l / 5 l = 35/50 = 7/10." },
        { text: "\\(\\frac{3}{5}\\)", correct: false, feedback: "That's 3 l out of 5 l, ignoring the 500 ml.", misconceptionId: "E-d15-a" },
        { text: "\\(\\frac{1}{2}\\)", correct: false, feedback: "Too small.", misconceptionId: "E-d15-b" },
        { text: "\\(\\frac{5}{7}\\)", correct: false, feedback: "Reciprocal.", misconceptionId: "E-d15-c" }
      ],
    backward: "Convert both to the same unit, then divide. Simplify the fraction.",
    forward: "Reading gauges and measuring tanks.",
    misconceptions: [
      {
        misconceptionId: "E-d15-a",
        description: "Student uses only the whole-litre part (3) of the mixed quantity, ignoring the 500 ml, giving 3/5 instead of the correct fraction.",
        rootCause: "Mixed-Unit Component Dropped — ignores the ml component when forming the fraction.",
        remediation: "Convert the full amount to a decimal or single unit first: 3 l 500 ml = 3.5 l, THEN form the fraction 3.5/5, not just 3/5."
      },
      {
        misconceptionId: "E-d15-b",
        description: "Student underestimates the filled fraction, perhaps rounding 3.5/5 down to a familiar simpler fraction like 1/2.",
        rootCause: "Fraction Estimation Without Computation — guesses a 'nice' fraction instead of computing the exact value.",
        remediation: "Compute the exact fraction: 3.5 l out of 5 l = 35/50, which simplifies to 7/10 — don't round to a different familiar fraction."
      },
      {
        misconceptionId: "E-d15-c",
        description: "Student inverts the fraction, computing the container capacity over the water amount instead of water over capacity.",
        rootCause: "Numerator/Denominator Reversal — swaps which quantity is the part (filled) and which is the whole (capacity).",
        remediation: "The fraction filled = (amount of water) ÷ (total capacity) = 3.5/5 — the water amount goes on TOP, the total capacity on the BOTTOM."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Convert to a single unit", hint: "3 l 500 ml = 3.5 l." },
      { level: 2, description: "Form the fraction", hint: "Filled fraction = water amount ÷ total capacity = 3.5/5." },
      { level: 3, description: "Simplify", hint: "35/50 — divide both by their GCF (5)." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "DECCONV-07", probability: 0.3, condition: "Forming a part-to-whole fraction from a mixed-unit measurement recurs in ratio and probability problems." }
    ],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NF.A.1"]
  },
  {
    itemId: "d16",
    order: 16,
    cluster: "TIME",
    clusterName: CLUSTER_NAMES.TIME,
    skillId: "MEASTIME-07",
    question: "A school assembly ends at 8:45 AM and lasts 25 minutes. What time did it start?",
    options: [
        { text: "8:20 AM", correct: true, feedback: "8:45 − 25 min = 8:20 AM." },
        { text: "9:10 AM", correct: false, feedback: "You added the duration instead of subtracting.", misconceptionId: "E-d16-a" },
        { text: "8:15 AM", correct: false, feedback: "Off by 5 min.", misconceptionId: "E-d16-b" },
        { text: "8:25 AM", correct: false, feedback: "Incorrect subtraction.", misconceptionId: "E-d16-c" }
      ],
    backward: "Subtract the duration from the end time.",
    forward: "Back‑timing for planning.",
    misconceptions: [
      {
        misconceptionId: "E-d16-a",
        description: "Student adds the duration to the end time instead of subtracting, moving forward instead of backward.",
        rootCause: "Operation Direction Confusion — adds when finding a START time (working backwards) requires subtraction.",
        remediation: "To find when something STARTED given its END time and duration, SUBTRACT the duration from the end time, don't add it."
      },
      {
        misconceptionId: "E-d16-b",
        description: "Student subtracts only 20 minutes instead of the stated 25 minutes.",
        rootCause: "Value Misread — substitutes a different duration than what the question states.",
        remediation: "Re-check the duration stated: 25 minutes — 8:45 minus 25 minutes, not 20 minutes."
      },
      {
        misconceptionId: "E-d16-c",
        description: "Student makes a small computational error in the subtraction, landing 5 minutes above the correct answer.",
        rootCause: "Time Subtraction Error — a minor miscalculation subtracting minutes.",
        remediation: "Recompute: 8:45 - 25 min — break it down: 8:45 - 45 min = 8:00, but we only subtract 25 min, so 8:45 - 25 min = 8:20."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the direction", hint: "To find the START time, subtract the duration from the END time." },
      { level: 2, description: "Subtract", hint: "8:45 - 25 minutes = ?" },
      { level: 3, description: "Check by adding back", hint: "Does 8:20 + 25 min return 8:45?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d17",
    order: 17,
    cluster: "MONEY",
    clusterName: CLUSTER_NAMES.MONEY,
    skillId: "MEASMONEY-08",
    question: "Ravi bought 3 shirts at ₹450 each and 2 trousers at ₹800 each. He paid ₹3000. How much change did he get?",
    options: [
        { text: "₹50", correct: true, feedback: "Total = 3×450=1350; 2×800=1600; sum = 2950. Change = 3000−2950 = ₹50." },
        { text: "₹2950", correct: false, feedback: "That's the total cost, not the change.", misconceptionId: "E-d17-a" },
        { text: "₹150", correct: false, feedback: "Incorrect subtraction.", misconceptionId: "E-d17-b" },
        { text: "₹250", correct: false, feedback: "Incorrect total cost.", misconceptionId: "E-d17-c" }
      ],
    backward: "First total cost, then subtract from amount paid.",
    forward: "Budgeting and cash management.",
    misconceptions: [
      {
        misconceptionId: "E-d17-a",
        description: "Student correctly computes the total cost (₹2950) but reports it directly instead of subtracting from the amount paid to find the change.",
        rootCause: "Final-Step Omission — treats the intermediate total-cost calculation as the complete answer.",
        remediation: "The question asks for CHANGE, which is amount paid MINUS total cost — after finding the total (2950), subtract it from 3000."
      },
      {
        misconceptionId: "E-d17-b",
        description: "Student computes the correct total cost but makes an error in the final subtraction, landing 100 too high.",
        rootCause: "Subtraction Computation Error — miscalculates 3000 - 2950.",
        remediation: "Recompute carefully: 3000 - 2950 = 50 — verify by adding 50 back to 2950 to see if it returns 3000."
      },
      {
        misconceptionId: "E-d17-c",
        description: "Student miscalculates the total cost (e.g. computing 3×450 or 2×800 incorrectly) before subtracting, leading to a wrong change amount.",
        rootCause: "Total Cost Computation Error — an error in one of the two multiplication steps before combining.",
        remediation: "Recompute each part separately: 3 shirts × ₹450 = 1350, 2 trousers × ₹800 = 1600 — add these (2950), then subtract from 3000."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the cost of each item type", hint: "3 × 450 = ? and 2 × 800 = ?" },
      { level: 2, description: "Find the total cost", hint: "Add the two amounts together." },
      { level: 3, description: "Find the change", hint: "3000 − total cost = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d18",
    order: 18,
    cluster: "PAV",
    clusterName: CLUSTER_NAMES.PAV,
    skillId: "MEASPAV-06",
    question: "A rectangle has length 10 cm, breadth 6 cm. A square has the same perimeter as the rectangle. Find the area of the square.",
    options: [
        { text: "64 cm²", correct: true, feedback: "Rectangle perimeter = 2×(10+6) = 32 cm. Square side = 32÷4 = 8 cm. Area = 8² = 64 cm²." },
        { text: "32 cm²", correct: false, feedback: "You used the perimeter as the area.", misconceptionId: "E-d18-a" },
        { text: "60 cm²", correct: false, feedback: "That's the area of the rectangle.", misconceptionId: "E-d18-b" },
        { text: "16 cm²", correct: false, feedback: "You used side 4 cm (32÷8? mistake).", misconceptionId: "E-d18-c" }
      ],
    backward: "Find perimeter, then side of square (÷4), then area.",
    forward: "Relating different shapes through their perimeters.",
    misconceptions: [
      {
        misconceptionId: "E-d18-a",
        description: "Student computes the perimeter (32) correctly but reports it directly as the area, skipping the steps of finding the square's side and squaring it.",
        rootCause: "Multi-Step Process Abandoned — stops after the first calculation instead of continuing through the remaining steps.",
        remediation: "Finding the perimeter is only step one — you must then find the SQUARE's side (32÷4=8) and finally compute its AREA (8²=64), not stop at the perimeter."
      },
      {
        misconceptionId: "E-d18-b",
        description: "Student computes the rectangle's own area (10×6=60) instead of the square's area, misreading which shape's area is requested.",
        rootCause: "Wrong Shape's Area Computed — computes the area of the original rectangle instead of the new square described in the question.",
        remediation: "The question asks for the area of the SQUARE (which shares the rectangle's perimeter), not the rectangle's own area — follow the full chain: perimeter → square side → square area."
      },
      {
        misconceptionId: "E-d18-c",
        description: "Student divides the perimeter by 8 instead of 4 to find the square's side, landing on an incorrect side length.",
        rootCause: "Wrong Divisor for Square Side — uses an incorrect divisor when converting perimeter to side length.",
        remediation: "A square has 4 equal sides, so side = perimeter ÷ 4 = 32 ÷ 4 = 8 cm, not ÷ 8."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the rectangle's perimeter", hint: "2 × (10 + 6) = ?" },
      { level: 2, description: "Find the square's side", hint: "The square has the SAME perimeter — side = perimeter ÷ 4." },
      { level: 3, description: "Find the square's area", hint: "Area = side × side." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "MEASPAV-02", probability: 0.3, condition: "Stopping mid-way through a multi-step shape-relationship problem recurs whenever one shape's property must feed into another's calculation." }
    ],
    learningObjectives: ["CCSS.MATH.CONTENT.5.MD.C.5"]
  },
  {
    itemId: "d19",
    order: 19,
    cluster: "LENGTH",
    clusterName: CLUSTER_NAMES.LENGTH,
    skillId: "MEASPAV-05",
    question: "A rectangular park is 120 m long and 80 m wide. How many kilometres does a person walk in 5 rounds?",
    options: [
        { text: "2 km", correct: true, feedback: "Perimeter = 2×(120+80) = 400 m. 5 rounds = 2000 m = 2 km." },
        { text: "1 km", correct: false, feedback: "You only walked 2.5 rounds? Or miscalculated perimeter.", misconceptionId: "E-d19-a" },
        { text: "20 km", correct: false, feedback: "Decimal error.", misconceptionId: "E-d19-b" },
        { text: "200 m", correct: false, feedback: "That's just one round in metres? No, perimeter is 400 m.", misconceptionId: "E-d19-c" }
      ],
    backward: "Perimeter = 2 × (l+b). Multiply by number of rounds. Convert to km.",
    forward: "Fitness tracking and sports.",
    misconceptions: [
      {
        misconceptionId: "E-d19-a",
        description: "Student computes the perimeter of one round incorrectly (e.g. only adding length+breadth without doubling), undershooting the total distance.",
        rootCause: "Missing-Doubling Step — forgets to double (length+breadth) when finding the perimeter of one round.",
        remediation: "One round means walking the FULL perimeter: 2 × (length + breadth) = 2 × 200 = 400 m — don't forget the doubling."
      },
      {
        misconceptionId: "E-d19-b",
        description: "Student makes a decimal/place-value error converting the total metres to km, overshooting by a factor of 10.",
        rootCause: "Power-of-Ten Shift Miscount — misplaces the decimal when dividing by 1000 to convert m to km.",
        remediation: "2000 m ÷ 1000 = 2 km exactly — count the zeros in 1000 (three) and shift the decimal three places left."
      },
      {
        misconceptionId: "E-d19-c",
        description: "Student reports only one round's distance in metres, without multiplying by 5 or converting to km.",
        rootCause: "Multi-Step Process Abandoned — stops after finding the perimeter of one round.",
        remediation: "Complete all steps: find one round's perimeter (400 m), multiply by 5 rounds (2000 m), THEN convert to km (2 km)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the perimeter of one round", hint: "2 × (120 + 80) = ?" },
      { level: 2, description: "Multiply by the number of rounds", hint: "400 × 5 = ?" },
      { level: 3, description: "Convert to km", hint: "2000 m = ? km." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.MD.C.5", "CCSS.MATH.CONTENT.5.MD.A.1"]
  },
  {
    itemId: "d20",
    order: 20,
    cluster: "MASS",
    clusterName: CLUSTER_NAMES.MASS,
    skillId: "MEASMASS-04",
    question: "A tank holds 50 l of water. 1 l of water weighs 1 kg. What is the weight of water in grams?",
    options: [
        { text: "50000 g", correct: true, feedback: "50 l = 50 kg. 50 kg = 50 × 1000 = 50000 g." },
        { text: "5000 g", correct: false, feedback: "You multiplied by 100 instead of 1000.", misconceptionId: "E-d20-a" },
        { text: "500 g", correct: false, feedback: "Too small.", misconceptionId: "E-d20-b" },
        { text: "50 g", correct: false, feedback: "Incorrect.", misconceptionId: "E-d20-c" }
      ],
    backward: "Multiply litres by 1 kg/l, then convert kg to g.",
    forward: "Science and engineering mass‑volume relationships.",
    misconceptions: [
      {
        misconceptionId: "E-d20-a",
        description: "Student multiplies 50 kg by 100 instead of 1000, undershooting the result by a factor of 10.",
        rootCause: "Power-of-Ten Shift Miscount — applies a two-zero shift instead of the correct three-zero shift.",
        remediation: "Count the zeros in 1000 (three zeros) — 50 kg × 1000 = 50000 g, not 5000 g."
      },
      {
        misconceptionId: "E-d20-b",
        description: "Student vastly underestimates, perhaps confusing kg-to-g conversion with a much smaller factor.",
        rootCause: "Conversion Factor Confusion — mixes up the kg-to-g factor (1000) with a much smaller number.",
        remediation: "Memorise the exact fact: 1 kg = 1000 g — 50 kg × 1000 = 50000 g."
      },
      {
        misconceptionId: "E-d20-c",
        description: "Student reports a value close to the original litre count without applying the density relationship or the g conversion.",
        rootCause: "Multi-Step Process Abandoned — doesn't work through both steps (litres to kg, then kg to g).",
        remediation: "Two steps are needed: (1) 50 l = 50 kg (since 1 l of water = 1 kg), then (2) convert 50 kg to grams by multiplying by 1000."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Convert litres to kg using the density fact", hint: "1 l of water = 1 kg, so 50 l = 50 kg." },
      { level: 2, description: "Convert kg to g", hint: "50 kg × 1000 = ?" },
      { level: 3, description: "Check", hint: "Does 50000 g make sense for 50 kg?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.MD.A.1"]
  },
  {
    itemId: "d21",
    order: 21,
    cluster: "CAP",
    clusterName: CLUSTER_NAMES.CAP,
    skillId: "MEASCAP-06",
    question: "A 3 l bottle is full. 750 ml is used, then 1 l 250 ml is used. How much is left?",
    options: [
        { text: "1 l", correct: true, feedback: "Total used = 750+1250 = 2000 ml = 2 l. Remaining = 3 − 2 = 1 l." },
        { text: "2 l", correct: false, feedback: "That's the amount used.", misconceptionId: "E-d21-a" },
        { text: "1.5 l", correct: false, feedback: "Incorrect subtraction.", misconceptionId: "E-d21-b" },
        { text: "500 ml", correct: false, feedback: "You only subtracted 750? No.", misconceptionId: "E-d21-c" }
      ],
    backward: "Sum the amounts used, subtract from total.",
    forward: "Tracking consumption.",
    misconceptions: [
      {
        misconceptionId: "E-d21-a",
        description: "Student correctly computes the total used (2 l) but reports it directly instead of subtracting from the starting amount to find what's left.",
        rootCause: "Final-Step Omission — treats the intermediate total-used calculation as the complete answer.",
        remediation: "The question asks how much is LEFT, which is starting amount MINUS total used — after finding the total used (2 l), subtract it from 3 l."
      },
      {
        misconceptionId: "E-d21-b",
        description: "Student makes a computational error in either summing the used amounts or the final subtraction, landing 0.5 l off the correct answer.",
        rootCause: "Multi-Step Subtraction Error — a miscalculation somewhere in the two-part used-amount sum or the final subtraction.",
        remediation: "Work through each step: 750 + 1250 = 2000 ml = 2 l used. Then 3 l - 2 l = 1 l remaining — check each step separately."
      },
      {
        misconceptionId: "E-d21-c",
        description: "Student subtracts only the first used amount (750 ml) and forgets to also subtract the second (1 l 250 ml).",
        rootCause: "Multi-Term Subtraction Omission — accounts for only one of two separate 'used' amounts in the question.",
        remediation: "Two separate amounts were used (750 ml AND 1 l 250 ml) — add BOTH together first before subtracting from the starting 3 l."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Sum the amounts used", hint: "750 ml + 1250 ml = ?" },
      { level: 2, description: "Convert to litres", hint: "2000 ml = 2 l." },
      { level: 3, description: "Subtract from the total", hint: "3 l - 2 l = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.MD.A.1"]
  },
  {
    itemId: "d22",
    order: 22,
    cluster: "TIME",
    clusterName: CLUSTER_NAMES.TIME,
    skillId: "MEASTIME-03",
    question: "How much time passes from 11:25 AM to 2:10 PM?",
    options: [
        { text: "2 h 45 min", correct: true, feedback: "11:25 to 12:00 = 35 min; 12:00 to 2:10 = 2 h 10 min; total = 2 h 45 min." },
        { text: "3 h 15 min", correct: false, feedback: "You added incorrectly.", misconceptionId: "E-d22-a" },
        { text: "2 h 35 min", correct: false, feedback: "Miscalculated minutes.", misconceptionId: "E-d22-b" },
        { text: "1 h 45 min", correct: false, feedback: "Too short.", misconceptionId: "E-d22-c" }
      ],
    backward: "Calculate to noon, then add the afternoon portion.",
    forward: "Scheduling appointments.",
    misconceptions: [
      {
        misconceptionId: "E-d22-a",
        description: "Student overcounts the total, perhaps by miscounting the number of whole hours between noon and 2:10 PM.",
        rootCause: "Hour-Bridging Overcount — miscounts the whole hours in the second segment (noon to 2:10 PM).",
        remediation: "From 12:00 to 2:10 PM is exactly 2 h 10 min (12→1→2, then 10 more minutes) — recount this segment carefully."
      },
      {
        misconceptionId: "E-d22-b",
        description: "Student miscounts the minutes in the first bridging segment (11:25 to noon), landing 10 minutes below the correct total.",
        rootCause: "Minutes Bridging Error — miscalculates the minutes from 11:25 to 12:00.",
        remediation: "From 11:25 AM to 12:00 noon is 35 minutes (25+35=60) — recheck this segment: how many minutes from :25 to :60?"
      },
      {
        misconceptionId: "E-d22-c",
        description: "Student drops one of the two bridging segments, significantly undercounting the total elapsed time.",
        rootCause: "Segment Omitted — misses part of the two-part bridging calculation.",
        remediation: "Break the interval into two parts and add BOTH: 11:25 AM to noon (35 min) PLUS noon to 2:10 PM (2 h 10 min)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Bridge to noon", hint: "From 11:25 AM to 12:00 noon is how many minutes?" },
      { level: 2, description: "Count from noon to the end time", hint: "From 12:00 to 2:10 PM is how many hours and minutes?" },
      { level: 3, description: "Add both parts", hint: "35 min + 2 h 10 min = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d23",
    order: 23,
    cluster: "MONEY",
    clusterName: CLUSTER_NAMES.MONEY,
    skillId: "MEASMONEY-06",
    question: "A fruit seller bought 10 kg of apples at ₹60 per kg and sold them at ₹75 per kg. Find the total profit and profit percentage.",
    options: [
        { text: "Profit ₹150, 25%", correct: true, feedback: "CP = 10×60 = ₹600; SP = 10×75 = ₹750; Profit = ₹150; Profit % = (150/600)×100 = 25%." },
        { text: "Profit ₹150, 20%", correct: false, feedback: "20% would be (150/750)×100, which uses SP, not CP.", misconceptionId: "E-d23-a" },
        { text: "Profit ₹90, 15%", correct: false, feedback: "Incorrect profit amount.", misconceptionId: "E-d23-b" },
        { text: "Profit ₹150, 15%", correct: false, feedback: "Incorrect percentage.", misconceptionId: "E-d23-c" }
      ],
    backward: "Find total CP and SP, then profit, then percentage.",
    forward: "Business transactions.",
    misconceptions: [
      {
        misconceptionId: "E-d23-a",
        description: "Student correctly finds the profit (₹150) but divides by Selling Price (750) instead of Cost Price (600) when computing the percentage.",
        rootCause: "Wrong Percentage Base — uses SP instead of CP as the denominator in the profit percentage formula.",
        remediation: "Profit percentage is always calculated relative to the COST PRICE, not the Selling Price: Profit % = (Profit ÷ CP) × 100 = (150 ÷ 600) × 100 = 25%."
      },
      {
        misconceptionId: "E-d23-b",
        description: "Student miscalculates the total Cost Price or Selling Price (e.g. using per-kg values instead of totals), leading to a wrong profit amount.",
        rootCause: "Total vs. Per-Unit Confusion — forgets to multiply by the 10 kg quantity when finding total CP and SP.",
        remediation: "Find TOTAL cost and selling price first: CP = 10 × 60 = 600, SP = 10 × 75 = 750 — use these totals, not the per-kg rates, to find profit."
      },
      {
        misconceptionId: "E-d23-c",
        description: "Student correctly finds the profit (₹150) and uses CP as the base but makes a computational error in the percentage, landing on 15% instead of 25%.",
        rootCause: "Percentage Computation Error — a miscalculation in the final division/multiplication step.",
        remediation: "Recompute carefully: (150 ÷ 600) × 100 — first divide 150 by 600 (=0.25), then multiply by 100 to get 25%."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find total CP and SP", hint: "CP = 10 × 60. SP = 10 × 75." },
      { level: 2, description: "Find the profit", hint: "Profit = SP − CP." },
      { level: 3, description: "Find the profit percentage", hint: "(Profit ÷ CP) × 100 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d24",
    order: 24,
    cluster: "PAV",
    clusterName: CLUSTER_NAMES.PAV,
    skillId: "MEASPAV-07",
    question: "A cube has total surface area 150 cm². Find its volume.",
    options: [
        { text: "125 cm³", correct: true, feedback: "Surface area = 6 × side² = 150 → side² = 25 → side = 5 cm. Volume = 5³ = 125 cm³." },
        { text: "25 cm³", correct: false, feedback: "You used side² as volume.", misconceptionId: "E-d24-a" },
        { text: "150 cm³", correct: false, feedback: "That's the surface area, not volume.", misconceptionId: "E-d24-b" },
        { text: "30 cm³", correct: false, feedback: "Incorrect calculation.", misconceptionId: "E-d24-c" }
      ],
    backward: "Divide surface area by 6 to get one face area, then square root for side, then cube for volume.",
    forward: "3D geometry and measurement relationships.",
    misconceptions: [
      {
        misconceptionId: "E-d24-a",
        description: "Student correctly finds side² (25, the area of one face) but reports it as the volume instead of continuing to find the side and cube it.",
        rootCause: "Multi-Step Process Abandoned — stops after finding an intermediate value (face area or side²) instead of continuing to compute volume.",
        remediation: "side²=25 is only the AREA of one face — you still need to find the side (√25=5) and then cube it (5³) to get the volume."
      },
      {
        misconceptionId: "E-d24-b",
        description: "Student reports the given surface area (150) directly as if it were the volume, without any calculation.",
        rootCause: "Wrong Value Reported — confuses the given surface area with the requested volume.",
        remediation: "Surface area and volume are different measurements — work through: side²=150÷6=25, side=5, then volume=5³=125."
      },
      {
        misconceptionId: "E-d24-c",
        description: "Student makes an error somewhere in the multi-step process (dividing by 6, finding the square root, or cubing), landing on an incorrect value.",
        rootCause: "Multi-Step Computation Error — a miscalculation in one of the three chained steps.",
        remediation: "Work through each step separately: (1) one face's area = 150÷6=25, (2) side = √25=5, (3) volume = 5×5×5=125 — verify each step."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the area of one face", hint: "Total surface area ÷ 6 faces = ?" },
      { level: 2, description: "Find the side length", hint: "Side = √(face area)." },
      { level: 3, description: "Find the volume", hint: "Volume = side × side × side." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "MEASPAV-04", probability: 0.35, condition: "Stopping mid-way through a multi-step surface-area-to-volume chain recurs whenever one 3D property must be derived from another." }
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
    skillId: "MEASLEN-02",
    question: "A plank is 5 m 60 cm long. 2 m 80 cm is cut. How much remains?",
    options: [
        { text: "2 m 80 cm", correct: true, feedback: "560 cm − 280 cm = 280 cm = 2 m 80 cm." },
        { text: "3 m 20 cm", correct: false, feedback: "You added instead of subtracting.", misconceptionId: "E-r1-a" },
        { text: "2 m 20 cm", correct: false, feedback: "Incorrect subtraction.", misconceptionId: "E-r1-b" },
        { text: "3 m", correct: false, feedback: "You only subtracted the metres.", misconceptionId: "E-r1-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r1-a",
        description: "Student adds the two lengths instead of subtracting, producing a result larger than the starting length.",
        rootCause: "Operation Sign Misread — performs addition when subtraction was requested.",
        remediation: "The question says '2 m 80 cm is CUT' — this means removal, so subtract, not add."
      },
      {
        misconceptionId: "E-r1-b",
        description: "Student makes a computational error in the subtraction, landing 60 cm below the correct answer.",
        rootCause: "Mixed-Unit Subtraction Error — a computational slip when subtracting combined m+cm quantities.",
        remediation: "Convert everything to cm: 560 cm - 280 cm = 280 cm — double-check this subtraction by adding 280 back to 280 to confirm it returns 560."
      },
      {
        misconceptionId: "E-r1-c",
        description: "Student subtracts only the whole-metre parts (5-2=3) and drops the cm component entirely.",
        rootCause: "Mixed-Unit Component Dropped — ignores the cm component when working with combined m+cm quantities.",
        remediation: "Convert both amounts fully to cm first (5m60cm=560cm, 2m80cm=280cm), subtract, then convert back — this keeps both components tracked."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Convert to a single unit", hint: "5 m 60 cm = 560 cm. 2 m 80 cm = 280 cm." },
      { level: 2, description: "Subtract", hint: "560 - 280 = ?" },
      { level: 3, description: "Convert back to mixed units", hint: "280 cm = ? m ? cm." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.MD.A.1"]
  },
  {
    itemId: "r2",
    order: 2,
    cluster: "MASS",
    clusterName: CLUSTER_NAMES.MASS,
    skillId: "MEASMASS-05",
    question: "6 bags of flour each weigh 1 kg 250 g. Find the total mass in kg.",
    options: [
        { text: "7.5 kg", correct: true, feedback: "1.25 × 6 = 7.5 kg." },
        { text: "6.5 kg", correct: false, feedback: "You only multiplied the kg part (1×6=6) and added 500 g as 0.5 kg.", misconceptionId: "E-r2-a" },
        { text: "7 kg", correct: false, feedback: "Off by 0.5 kg.", misconceptionId: "E-r2-b" },
        { text: "7500 g", correct: false, feedback: "That's in grams, but the question asks for kg.", misconceptionId: "E-r2-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r2-a",
        description: "Student multiplies only the kg part (1×6=6kg) and adds a fixed 0.5 kg (misreading the 250g as 500g) instead of scaling the whole quantity by 6.",
        rootCause: "Partial-Multiplication Error — multiplies one component of a mixed-unit quantity but treats the other as a fixed add-on rather than scaling it too.",
        remediation: "Convert the whole quantity to a single unit first (1 kg 250 g = 1.25 kg), THEN multiply the entire value by 6: 1.25 × 6 = 7.5 kg."
      },
      {
        misconceptionId: "E-r2-b",
        description: "Student makes a smaller computational error, landing 0.5 kg below the correct total.",
        rootCause: "Mixed-Unit Multiplication Error — a computational slip when scaling a combined kg+g quantity.",
        remediation: "Recompute: 1.25 kg × 6 = 7.5 kg — verify by breaking it down: 1×6=6, and 0.25×6=1.5, so 6+1.5=7.5."
      },
      {
        misconceptionId: "E-r2-c",
        description: "Student correctly computes the total in grams (7500 g) but doesn't convert it to kg as the question requests.",
        rootCause: "Unit Format Mismatch — leaves the answer in grams instead of converting to the requested kg format.",
        remediation: "The question explicitly asks for the total 'in kg' — convert 7500 g ÷ 1000 = 7.5 kg before answering."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Convert to a single unit", hint: "1 kg 250 g = 1.25 kg." },
      { level: 2, description: "Multiply the whole amount", hint: "1.25 × 6 = ?" },
      { level: 3, description: "Check your answer", hint: "Does 7.5 kg make sense for 6 bags around 1.25 kg each?" }
    ],
    forwardRiskLinks: [
      { targetSkillId: "MEASMASS-04", probability: 0.35, condition: "Multiplying only one component of a mixed-unit quantity recurs whenever scaling combined kg+g or m+cm amounts." }
    ],
    learningObjectives: ["CCSS.MATH.CONTENT.5.MD.A.1"]
  },
  {
    itemId: "r3",
    order: 3,
    cluster: "CAP",
    clusterName: CLUSTER_NAMES.CAP,
    skillId: "MEASCAP-05",
    question: "How many 200 ml cups can be filled from 1 l 600 ml?",
    options: [
        { text: "8", correct: true, feedback: "1600 ÷ 200 = 8." },
        { text: "6", correct: false, feedback: "Incorrect division.", misconceptionId: "E-r3-a" },
        { text: "10", correct: false, feedback: "1600÷160? No.", misconceptionId: "E-r3-b" },
        { text: "16", correct: false, feedback: "Too many.", misconceptionId: "E-r3-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r3-a",
        description: "Student makes a computational error in the division, landing 2 below the correct count.",
        rootCause: "Division Computation Error — miscalculates 1600 ÷ 200.",
        remediation: "Recompute: 1600 ÷ 200 = 8 — verify by multiplying 8 × 200 to see if it returns 1600."
      },
      {
        misconceptionId: "E-r3-b",
        description: "Student divides by 160 instead of the stated 200, using an incorrect cup capacity.",
        rootCause: "Divisor Value Misread — substitutes a different cup capacity than what the question states.",
        remediation: "Re-check the cup capacity stated in the question — it's 200 ml, not 160 ml — divide 1600 ÷ 200."
      },
      {
        misconceptionId: "E-r3-c",
        description: "Student doubles the correct answer, perhaps by dividing by 100 instead of 200.",
        rootCause: "Divisor Value Misread — uses half the stated cup capacity, doubling the resulting count.",
        remediation: "Use the EXACT cup capacity given: 200 ml — 1600 ÷ 200 = 8, not double that."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Convert to a single unit", hint: "1 l 600 ml = 1600 ml." },
      { level: 2, description: "Identify the division", hint: "Divide total ml by the capacity of one cup (200 ml)." },
      { level: 3, description: "Divide", hint: "1600 ÷ 200 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.MD.A.1"]
  },
  {
    itemId: "r4",
    order: 4,
    cluster: "TIME",
    clusterName: CLUSTER_NAMES.TIME,
    skillId: "MEASTIME-01",
    question: "A film starts at 2:50 PM and lasts 1 hour 25 minutes. What time does it end?",
    options: [
        { text: "4:15 PM", correct: true, feedback: "2:50 + 1:00 = 3:50; + 0:25 = 4:15 PM." },
        { text: "4:05 PM", correct: false, feedback: "You added 15 min instead of 25.", misconceptionId: "E-r4-a" },
        { text: "3:15 PM", correct: false, feedback: "You subtracted?", misconceptionId: "E-r4-b" },
        { text: "4:15 AM", correct: false, feedback: "Wrong AM/PM.", misconceptionId: "E-r4-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r4-a",
        description: "Student adds only 15 minutes instead of the stated 25 minutes.",
        rootCause: "Value Misread — substitutes a different number of minutes than what the question states.",
        remediation: "Re-check the duration stated: 1 hour 25 minutes — after adding the 1 hour (3:50), add the full 25 minutes, not 15."
      },
      {
        misconceptionId: "E-r4-b",
        description: "Student subtracts the duration from the start time instead of adding it to find the end time.",
        rootCause: "Operation Direction Confusion — subtracts when finding an END time (working forwards) requires addition.",
        remediation: "To find when something ENDS given its start time and duration, ADD the duration to the start time, don't subtract it."
      },
      {
        misconceptionId: "E-r4-c",
        description: "Student computes the correct time (4:15) but labels it AM instead of PM.",
        rootCause: "AM/PM Assignment Error — doesn't track that the film stays within the PM period since it starts and stays in the afternoon.",
        remediation: "Starting at 2:50 PM and adding under 2 hours stays within the afternoon — the end time remains PM: 4:15 PM."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Add the whole hour first", hint: "2:50 PM + 1 hour = 3:50 PM." },
      { level: 2, description: "Add the remaining minutes", hint: "3:50 PM + 25 minutes = ?" },
      { level: 3, description: "Check for carrying", hint: "50 + 25 = 75 minutes — this carries 1 hour and leaves 15 minutes." }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "r5",
    order: 5,
    cluster: "MONEY",
    clusterName: CLUSTER_NAMES.MONEY,
    skillId: "MEASMONEY-04",
    question: "Simple interest on ₹1200 at 4% per annum for 3 years.",
    options: [
        { text: "₹144", correct: true, feedback: "SI = 1200 × 4 × 3 / 100 = 144." },
        { text: "₹120", correct: false, feedback: "You used rate 5%? 1200×5×3/100=180? Not 120. Actually 1200×4×3/100=144.", misconceptionId: "E-r5-a" },
        { text: "₹480", correct: false, feedback: "You forgot to divide by 100? 1200×4×3=14400, then off.", misconceptionId: "E-r5-b" },
        { text: "₹1440", correct: false, feedback: "You didn't divide by 100 (1200×4×3=14400, then divided by 10?).", misconceptionId: "E-r5-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r5-a",
        description: "Student makes a computational error somewhere in the three-factor multiplication or final division, landing on 120 instead of 144.",
        rootCause: "Formula Computation Error — a miscalculation in applying the Simple Interest formula.",
        remediation: "Work through the formula step by step: 1200 × 4 = 4800, then × 3 = 14400, then ÷ 100 = 144 — recheck each multiplication."
      },
      {
        misconceptionId: "E-r5-b",
        description: "Student divides 14400 by 30 instead of 100, overshooting the correct interest significantly.",
        rootCause: "Wrong Divisor Applied — uses an incorrect number to divide by instead of the required 100.",
        remediation: "The Simple Interest formula always ends with ÷100 (since the rate is a percentage) — 14400 ÷ 100 = 144, not divided by any other number."
      },
      {
        misconceptionId: "E-r5-c",
        description: "Student divides 14400 by 10 instead of 100, overshooting the correct interest by a factor of 10.",
        rootCause: "Power-of-Ten Shift Miscount — applies a one-zero shift instead of the correct two-zero shift when dividing by 100.",
        remediation: "Count the zeros in 100 (two zeros) — 14400 ÷ 100 = 144, not 1440."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the formula", hint: "Simple Interest = Principal × Rate × Time / 100." },
      { level: 2, description: "Substitute the values", hint: "1200 × 4 × 3 / 100." },
      { level: 3, description: "Compute step by step", hint: "1200 × 4 × 3 = 14400. Now divide by 100." }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "r6",
    order: 6,
    cluster: "PAV",
    clusterName: CLUSTER_NAMES.PAV,
    skillId: "MEASPAV-05",
    question: "A rectangular wall is 8 m by 3 m. Painting costs ₹20 per square metre. Find the total cost.",
    options: [
        { text: "₹480", correct: true, feedback: "Area = 8×3 = 24 m². Cost = 24 × 20 = ₹480." },
        { text: "₹240", correct: false, feedback: "You used half the area or wrong rate.", misconceptionId: "E-r6-a" },
        { text: "₹960", correct: false, feedback: "You doubled the cost.", misconceptionId: "E-r6-b" },
        { text: "₹220", correct: false, feedback: "You used perimeter (22 m) × 10? Not correct.", misconceptionId: "E-r6-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r6-a",
        description: "Student halves the area or uses an incorrect rate before multiplying, undershooting the correct cost by half.",
        rootCause: "Value Halved Incorrectly — introduces an unneeded division by 2 somewhere in the area or cost calculation.",
        remediation: "Compute the area exactly (8×3=24 m²) and multiply by the FULL rate (₹20 per m²) — there's no halving step in this formula."
      },
      {
        misconceptionId: "E-r6-b",
        description: "Student computes the correct area and cost but then doubles the final cost unnecessarily.",
        rootCause: "Extraneous Doubling Step — applies an unneeded multiplication by 2 after correctly computing the cost.",
        remediation: "Once area (24 m²) is multiplied by the rate (₹20) to get ₹480, no further doubling is needed — that is the final cost."
      },
      {
        misconceptionId: "E-r6-c",
        description: "Student uses the perimeter instead of the area to compute painting cost, since painting covers a wall's SURFACE, not its boundary.",
        rootCause: "Painting-Area Confusion — doesn't recognise that painting cost relates to the space covered (area), not the distance around (perimeter).",
        remediation: "Painting covers the WALL SURFACE — always use AREA (not perimeter) when computing painting cost: cost = area × rate per m²."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the area", hint: "Area = length × breadth = 8 × 3." },
      { level: 2, description: "Identify the operation", hint: "Multiply area by the cost per square metre." },
      { level: 3, description: "Compute", hint: "24 × 20 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.MD.C.5"]
  },
  {
    itemId: "r7",
    order: 7,
    cluster: "LENGTH",
    clusterName: CLUSTER_NAMES.LENGTH,
    skillId: "MEASPAV-06",
    question: "A square has area 81 m². Find its perimeter.",
    options: [
        { text: "36 m", correct: true, feedback: "Side = 9 m. Perimeter = 4 × 9 = 36 m." },
        { text: "18 m", correct: false, feedback: "You multiplied side by 2.", misconceptionId: "E-r7-a" },
        { text: "9 m", correct: false, feedback: "That's the side.", misconceptionId: "E-r7-b" },
        { text: "81 m", correct: false, feedback: "That's the area.", misconceptionId: "E-r7-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r7-a",
        description: "Student correctly finds the side (9 m) but multiplies it by 2 instead of 4 to find the perimeter.",
        rootCause: "Wrong Multiplier Applied — uses a factor of 2 instead of the correct factor of 4 for a square's four equal sides.",
        remediation: "A square has FOUR equal sides — perimeter = 4 × side, not 2 × side."
      },
      {
        misconceptionId: "E-r7-b",
        description: "Student correctly finds the side length (9 m) via the square root but stops there without computing the perimeter.",
        rootCause: "Final-Step Omission — treats the intermediate side-length calculation as the complete answer.",
        remediation: "Finding the side is only step one — the question asks for the PERIMETER, which requires multiplying the side by 4."
      },
      {
        misconceptionId: "E-r7-c",
        description: "Student reports the given area (81) directly as if it were the perimeter, without any calculation.",
        rootCause: "Wrong Value Reported — confuses the given area with the requested perimeter.",
        remediation: "Area and perimeter are different measurements — you must first find the side (√81=9), then compute perimeter = 4×9, not just restate the area."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the side length", hint: "Side = √81 (what number times itself equals 81?)." },
      { level: 2, description: "Recall the perimeter formula", hint: "Perimeter of square = 4 × side." },
      { level: 3, description: "Compute", hint: "4 × 9 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.MD.C.5"]
  },
  {
    itemId: "r8",
    order: 8,
    cluster: "MASS",
    clusterName: CLUSTER_NAMES.MASS,
    skillId: "MEASMASS-02",
    question: "A box of apples weighs 2 kg 200 g. The empty box weighs 400 g. What is the weight of the apples?",
    options: [
        { text: "1 kg 800 g", correct: true, feedback: "2200 g − 400 g = 1800 g = 1 kg 800 g." },
        { text: "2 kg 600 g", correct: false, feedback: "You added instead of subtracting.", misconceptionId: "E-r8-a" },
        { text: "1 kg 600 g", correct: false, feedback: "Incorrect subtraction (2200−400=1800).", misconceptionId: "E-r8-b" },
        { text: "2 kg", correct: false, feedback: "You only used the kg part.", misconceptionId: "E-r8-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r8-a",
        description: "Student adds the box weight and total weight instead of subtracting, producing a result larger than the starting total.",
        rootCause: "Operation Sign Misread — performs addition when subtraction was requested.",
        remediation: "The total weight (2 kg 200 g) includes the box — to find just the apples, SUBTRACT the box weight: 2200 g - 400 g."
      },
      {
        misconceptionId: "E-r8-b",
        description: "Student makes a computational error in the subtraction, landing 200 g below the correct answer.",
        rootCause: "Mixed-Unit Subtraction Error — a computational slip when subtracting 400 g from 2200 g.",
        remediation: "Recompute carefully: 2200 g - 400 g = 1800 g — verify by adding 1800 back to 400 to see if it returns 2200."
      },
      {
        misconceptionId: "E-r8-c",
        description: "Student uses only the whole-kg part of the total weight (2 kg) and ignores the 200 g, dropping the mixed-unit component.",
        rootCause: "Mixed-Unit Component Dropped — ignores the grams component when working with a combined kg+g quantity.",
        remediation: "Convert the WHOLE total weight to grams first (2 kg 200 g = 2200 g, not just 2000 g), then subtract the box weight."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Convert to a single unit", hint: "2 kg 200 g = 2200 g." },
      { level: 2, description: "Subtract", hint: "2200 - 400 = ?" },
      { level: 3, description: "Convert back to mixed units", hint: "1800 g = ? kg ? g." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.MD.A.1"]
  },
  {
    itemId: "r9",
    order: 9,
    cluster: "CAP",
    clusterName: CLUSTER_NAMES.CAP,
    skillId: "MEASCAP-04",
    question: "Add: 2 l 500 ml + 1 l 750 ml. Express the answer in litres.",
    options: [
        { text: "4.25 l", correct: true, feedback: "2500 ml + 1750 ml = 4250 ml = 4.25 l." },
        { text: "3.25 l", correct: false, feedback: "You only added the litres (2+1=3) and ignored the ml conversion.", misconceptionId: "E-r9-a" },
        { text: "4.5 l", correct: false, feedback: "Incorrect addition of ml (500+750=1250, not 1500).", misconceptionId: "E-r9-b" },
        { text: "5.25 l", correct: false, feedback: "Added an extra litre.", misconceptionId: "E-r9-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r9-a",
        description: "Student adds only the litre parts (2+1=3) and appends a leftover fraction without properly summing and carrying the ml.",
        rootCause: "Carry-Across-Units Omission — doesn't recognise that summing the ml (500+750=1250ml) itself contributes an extra 1.25 l.",
        remediation: "After adding the ml (500+750=1250ml), check if it's 1000 or more — 1250 ml = 1.25 l, which must be ADDED to the litre total, not dropped."
      },
      {
        misconceptionId: "E-r9-b",
        description: "Student makes a computational error adding the ml parts, landing on 1500 instead of the correct 1250.",
        rootCause: "Addition Computation Error — miscalculates 500 + 750.",
        remediation: "Recompute carefully: 500 + 750 = 1250 — double-check this addition column by column."
      },
      {
        misconceptionId: "E-r9-c",
        description: "Student adds an extra litre beyond the correct total, perhaps double-counting the carried litre from the ml sum.",
        rootCause: "Carry-Across-Units Overcount — adds the carried litre value twice instead of once.",
        remediation: "The ml sum (1250 ml = 1.25 l) carries exactly 1.25 l once — add this to the litre total (2+1=3) just one time: 3 + 1.25 = 4.25."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Convert to a single unit", hint: "2 l 500 ml = 2500 ml. 1 l 750 ml = 1750 ml." },
      { level: 2, description: "Add", hint: "2500 + 1750 = ?" },
      { level: 3, description: "Convert to litres", hint: "4250 ml = ? l." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.MD.A.1"]
  },
  {
    itemId: "r10",
    order: 10,
    cluster: "TIME",
    clusterName: CLUSTER_NAMES.TIME,
    skillId: "MEASTIME-06",
    question: "A flight departs at 21:30 and arrives at 06:15 the next day. How long is the flight?",
    options: [
        { text: "8 h 45 min", correct: true, feedback: "21:30 to 24:00 = 2 h 30 min; 00:00 to 06:15 = 6 h 15 min; total = 8 h 45 min." },
        { text: "9 h 15 min", correct: false, feedback: "Miscalculated.", misconceptionId: "E-r10-a" },
        { text: "7 h 45 min", correct: false, feedback: "Off by 1 h.", misconceptionId: "E-r10-b" },
        { text: "8 h 15 min", correct: false, feedback: "Incorrect minutes.", misconceptionId: "E-r10-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r10-a",
        description: "Student overcounts the total, perhaps by miscounting one of the two bridging segments.",
        rootCause: "Midnight-Bridging Error — miscounts one of the two segments (before or after midnight).",
        remediation: "Break the journey into two parts: 21:30 to midnight (2 h 30 min) and midnight to 06:15 (6 h 15 min) — add both parts carefully."
      },
      {
        misconceptionId: "E-r10-b",
        description: "Student undercounts the total by 1 hour, perhaps missing part of the pre-midnight segment.",
        rootCause: "Midnight-Bridging Error — miscounts one of the two segments, undercounting this time.",
        remediation: "From 21:30 to midnight (24:00) is 2 h 30 min (21→22→23→24, minus the 30 min already past 21:00) — recheck this segment."
      },
      {
        misconceptionId: "E-r10-c",
        description: "Student counts the whole hours correctly but drops or miscounts the leftover minutes.",
        rootCause: "Minutes Component Dropped — computes the hour count but mishandles the remaining minutes.",
        remediation: "After bridging through midnight, add BOTH the hours and the leftover minutes: 2 h 30 min + 6 h 15 min = 8 h 45 min (30+15=45 minutes)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Bridge to midnight", hint: "From 21:30 to 24:00 (midnight) is how many hours and minutes?" },
      { level: 2, description: "Count from midnight to arrival", hint: "From 00:00 to 06:15 is how many hours and minutes?" },
      { level: 3, description: "Add both parts", hint: "2 h 30 min + 6 h 15 min = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "r11",
    order: 11,
    cluster: "MONEY",
    clusterName: CLUSTER_NAMES.MONEY,
    skillId: "MEASMONEY-07",
    question: "Cost Price = ₹2000, Selling Price = ₹1700. Find the loss percentage.",
    options: [
        { text: "15%", correct: true, feedback: "Loss = ₹300. Loss % = (300/2000)×100 = 15%." },
        { text: "10%", correct: false, feedback: "Incorrect (300/3000? No).", misconceptionId: "E-r11-a" },
        { text: "20%", correct: false, feedback: "300/1500=20%, but that uses SP.", misconceptionId: "E-r11-b" },
        { text: "17.6%", correct: false, feedback: "300/1700 ≈ 17.6%, wrong denominator.", misconceptionId: "E-r11-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r11-a",
        description: "Student divides the loss by an incorrect value (like 3000) instead of the Cost Price (2000), producing too low a percentage.",
        rootCause: "Wrong Percentage Base — uses an incorrect denominator instead of the Cost Price.",
        remediation: "Loss percentage is always calculated relative to the COST PRICE: Loss % = (Loss ÷ CP) × 100 = (300 ÷ 2000) × 100 = 15%."
      },
      {
        misconceptionId: "E-r11-b",
        description: "Student divides the loss by Selling Price minus something (like 1500) instead of the actual Cost Price (2000).",
        rootCause: "Wrong Percentage Base — uses an incorrect or miscalculated denominator instead of the Cost Price.",
        remediation: "Always use the ORIGINAL Cost Price (₹2000) as the base for loss percentage, not a modified or different value."
      },
      {
        misconceptionId: "E-r11-c",
        description: "Student divides the loss by Selling Price (1700) instead of Cost Price (2000).",
        rootCause: "Wrong Percentage Base — uses SP instead of CP as the denominator in the loss percentage formula.",
        remediation: "Loss percentage is always calculated relative to the COST PRICE (what was originally paid), not the Selling Price: Loss % = (Loss ÷ CP) × 100."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the loss", hint: "Loss = CP − SP = 2000 − 1700." },
      { level: 2, description: "Recall the percentage formula", hint: "Loss % = (Loss ÷ Cost Price) × 100 — always divide by CP." },
      { level: 3, description: "Compute", hint: "(300 ÷ 2000) × 100 = ?" }
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
    question: "A cuboid measures 12 cm × 5 cm × 3 cm. 1 cm³ has a mass of 3 g. Find the total mass in kg.",
    options: [
        { text: "0.54 kg", correct: true, feedback: "Volume = 12×5×3 = 180 cm³. Mass = 180×3 = 540 g = 0.54 kg." },
        { text: "0.18 kg", correct: false, feedback: "You used 1 g per cm³ instead of 3 g.", misconceptionId: "E-r12-a" },
        { text: "5.4 kg", correct: false, feedback: "Decimal error (5400 g instead of 540 g).", misconceptionId: "E-r12-b" },
        { text: "1.8 kg", correct: false, feedback: "Incorrect volume calculation.", misconceptionId: "E-r12-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r12-a",
        description: "Student uses 1 g per cm³ instead of the stated 3 g per cm³, using a third of the correct rate.",
        rootCause: "Rate Misread — substitutes a different weight-per-volume rate than the one given in the question.",
        remediation: "Re-check the rate stated: 1 cm³ has a mass of 3 g, not 1 g — multiply the volume (180 cm³) by 3, not 1."
      },
      {
        misconceptionId: "E-r12-b",
        description: "Student computes the correct mass in grams incorrectly (getting 5400 instead of 540), overshooting by a factor of 10, before converting to kg.",
        rootCause: "Multiplication Place-Value Slip — miscounts a zero when multiplying volume by the rate.",
        remediation: "Multiply 180 × 3 = 540, not 5400 — recheck this multiplication carefully before converting to kg."
      },
      {
        misconceptionId: "E-r12-c",
        description: "Student miscalculates the volume (e.g. using only two dimensions instead of three), leading to a wrong mass.",
        rootCause: "Missing-Dimension Error — doesn't multiply all three dimensions to find the volume.",
        remediation: "Volume of a cuboid needs ALL THREE dimensions multiplied: 12 × 5 × 3 = 180 cm³ — recheck this multiplication before finding mass."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the volume", hint: "Volume = 12 × 5 × 3 = ? cm³." },
      { level: 2, description: "Find the mass in grams", hint: "Multiply volume by the mass per cm³ (3 g)." },
      { level: 3, description: "Convert to kg", hint: "540 g ÷ 1000 = ? kg." }
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

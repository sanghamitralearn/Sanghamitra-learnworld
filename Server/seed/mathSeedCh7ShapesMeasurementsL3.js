// seed/mathSeedCh7ShapesMeasurementsL3.js
//
// Populates math_chapters and math_questions with Grade 8, Chapter 7
// (Shapes and Measurements), Level 3 — converted from the standalone diagnostic
// JSON ch7-shapes-measurements-level-3.json. Diagrams are inlined as SVG HTML
// directly in each question's text (the schema has no separate diagram
// field, and question text is already rendered as raw HTML).
//
// Run with: node seed/mathSeedCh7ShapesMeasurementsL3.js

const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-8";
const GRADE_LABEL = "Grade 8";
const CHAPTER_SLUG = "ch-7-shapes-measurements";
const CHAPTER_NAME = "Shapes and Measurements";
const LEVEL = 3;

const CLUSTER_NAMES = {
  "circumference": "Circumference of a circle",
  "areaCircle": "Area of a circle",
  "compoundArea": "Areas of compound shapes",
  "units": "Large and small units",
  "realContext": "Perimeter and area in real contexts",
  "mixed": "Mixed measurement problems (synthesis)"
};

const warmupItems = [
  {
    "itemId": "w1",
    "order": 1,
    "cluster": "compoundArea",
    "clusterName": "Areas of compound shapes",
    "question": "A rectangle 15 cm × 10 cm has a semicircle of radius 5 cm cut from each long side. Find the remaining area (π ≈ 3.14).<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 313 176\" width=\"438\" height=\"246\" style=\"max-width:100%;height:auto\" font-family=\"Arial, Helvetica, sans-serif\"><path d=\"M 58 16 H 90.5 A 65 65 0 0 0 220.5 16 H 253 V 146 H 220.5 A 65 65 0 0 0 90.5 146 H 58 Z\" fill=\"none\" stroke=\"#222\" stroke-width=\"2\" stroke-linejoin=\"round\"/><line x1=\"155.5\" y1=\"16\" x2=\"201.5\" y2=\"62\" stroke=\"#c0392b\" stroke-width=\"2\" stroke-dasharray=\"5 4\"/><circle cx=\"155.5\" cy=\"16\" r=\"2.5\" fill=\"#222\"/><text x=\"172.5\" y=\"43\" font-size=\"13\" fill=\"#c0392b\" text-anchor=\"end\">r = 5 cm</text><text x=\"155.5\" y=\"166\" font-size=\"13\" fill=\"#222\" text-anchor=\"middle\">15 cm</text><text x=\"50\" y=\"85\" font-size=\"13\" fill=\"#222\" text-anchor=\"end\">10 cm</text></svg></div>",
    "options": [
      {
        "text": "\\(71.5\\) cm²",
        "correct": true,
        "feedback": "Correct. Rectangle \\(= 150\\). Two semicircles = one full circle of radius 5 \\(= 3.14 \\times 25 = 78.5\\). Remaining \\(= 150 - 78.5 = 71.5\\) cm²."
      },
      {
        "text": "\\(150\\) cm²",
        "correct": false,
        "feedback": "You gave only the rectangle."
      },
      {
        "text": "\\(78.5\\) cm²",
        "correct": false,
        "feedback": "You gave only the combined semicircles."
      },
      {
        "text": "\\(228.5\\) cm²",
        "correct": false,
        "feedback": "You added instead of subtracting."
      }
    ],
    "retryHint": "Two semicircles = one full circle. Subtract from the rectangle.",
    "backward": "Two semicircles make one circle.",
    "forward": "Used whenever a shape is split and part removed."
  },
  {
    "itemId": "w2",
    "order": 2,
    "cluster": "compoundArea",
    "clusterName": "Areas of compound shapes",
    "question": "A circular garden of radius 10 m has a square path of side 4 m running through its centre. Find the area of the grass (π ≈ 3.14).",
    "options": [
      {
        "text": "\\(298\\) m²",
        "correct": true,
        "feedback": "Correct. Circle \\(= 3.14 \\times 100 = 314\\). Square \\(= 16\\). Grass \\(= 314 - 16 = 298\\) m²."
      },
      {
        "text": "\\(314\\) m²",
        "correct": false,
        "feedback": "You gave only the circle."
      },
      {
        "text": "\\(16\\) m²",
        "correct": false,
        "feedback": "You gave only the square."
      },
      {
        "text": "\\(330\\) m²",
        "correct": false,
        "feedback": "You added instead of subtracting."
      }
    ],
    "retryHint": "Find circle area, subtract square area.",
    "backward": "Circle area minus an inscribed shape.",
    "forward": "Used in landscape and design."
  },
  {
    "itemId": "w3",
    "order": 3,
    "cluster": "units",
    "clusterName": "Large and small units",
    "question": "A rectangular tank is 2 m long, 1.5 m wide, and 80 cm deep. Find its volume in litres (1 m³ = 1000 L).",
    "options": [
      {
        "text": "\\(2400\\) L",
        "correct": true,
        "feedback": "Correct. Depth \\(= 0.8\\) m. Volume \\(= 2 \\times 1.5 \\times 0.8 = 2.4\\) m³ \\(= 2400\\) L."
      },
      {
        "text": "\\(240\\) L",
        "correct": false,
        "feedback": "You forgot to multiply by 1000."
      },
      {
        "text": "\\(24000\\) L",
        "correct": false,
        "feedback": "You multiplied by 10,000."
      },
      {
        "text": "\\(2.4\\) L",
        "correct": false,
        "feedback": "You didn't convert cm to m."
      }
    ],
    "retryHint": "Convert 80 cm to m first, then compute volume, then × 1000.",
    "backward": "Convert units before computing volume, then convert volume units.",
    "forward": "Used in capacity and fluid problems."
  },
  {
    "itemId": "w4",
    "order": 4,
    "cluster": "realContext",
    "clusterName": "Perimeter and area in real contexts",
    "question": "A wheel of diameter 50 cm travels 785 m. How many complete rotations does it make? (π ≈ 3.14)<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 190 164\" width=\"266\" height=\"230\" style=\"max-width:100%;height:auto\" font-family=\"Arial, Helvetica, sans-serif\"><circle cx=\"95\" cy=\"82\" r=\"62\" fill=\"none\" stroke=\"#222\" stroke-width=\"2\"/><line x1=\"33\" y1=\"82\" x2=\"157\" y2=\"82\" stroke=\"#c0392b\" stroke-width=\"2\" stroke-dasharray=\"5 4\"/><circle cx=\"95\" cy=\"82\" r=\"2.5\" fill=\"#222\"/><text x=\"95\" y=\"74\" font-size=\"13\" fill=\"#c0392b\" text-anchor=\"middle\">d = 50 cm</text></svg></div>",
    "options": [
      {
        "text": "\\(500\\)",
        "correct": true,
        "feedback": "Correct. Circumference \\(= 3.14 \\times 50 = 157\\) cm \\(= 1.57\\) m. \\(785 \\div 1.57 = 500\\) rotations."
      },
      {
        "text": "\\(5000\\)",
        "correct": false,
        "feedback": "You lost a factor of 10 in the unit conversion."
      },
      {
        "text": "\\(50\\)",
        "correct": false,
        "feedback": "You misplaced a decimal."
      },
      {
        "text": "\\(1570\\)",
        "correct": false,
        "feedback": "You divided the distance by the diameter (0.5 m) instead of the circumference (1.57 m)."
      }
    ],
    "retryHint": "Convert circumference to metres, then divide distance by circumference.",
    "backward": "Convert to consistent units first.",
    "forward": "Used in wheel and distance problems."
  },
  {
    "itemId": "w5",
    "order": 5,
    "cluster": "compoundArea",
    "clusterName": "Areas of compound shapes",
    "question": "A circular pond has area 3.14 m². A path of width 1 m is added around it. Find the area of the path (π ≈ 3.14).",
    "options": [
      {
        "text": "\\(9.42\\) m²",
        "correct": true,
        "feedback": "Correct. \\(r_{\\text{inner}}^2 = 1\\), \\(r_{\\text{inner}} = 1\\). Outer radius \\(= 2\\). Outer area \\(= 3.14 \\times 4 = 12.56\\). Path \\(= 12.56 - 3.14 = 9.42\\) m²."
      },
      {
        "text": "\\(3.14\\) m²",
        "correct": false,
        "feedback": "You gave only the inner circle."
      },
      {
        "text": "\\(12.56\\) m²",
        "correct": false,
        "feedback": "You gave only the outer circle."
      },
      {
        "text": "\\(4.71\\) m²",
        "correct": false,
        "feedback": "You halved the correct answer."
      }
    ],
    "retryHint": "Outer radius = inner radius + path width. Subtract inner area from outer.",
    "backward": "Annulus by subtracting two circles.",
    "forward": "Used whenever a ring or border is added."
  },
  {
    "itemId": "w6",
    "order": 6,
    "cluster": "realContext",
    "clusterName": "Perimeter and area in real contexts",
    "question": "A rectangular room is 6 m × 4 m and 3 m high. The four walls (excluding door and windows of total area 8 m²) are to be painted. Find the wall area to paint.",
    "options": [
      {
        "text": "\\(52\\) m²",
        "correct": true,
        "feedback": "Correct. Walls: \\(2 \\times 6 \\times 3 + 2 \\times 4 \\times 3 = 36 + 24 = 60\\) m². Minus 8 = 52 m²."
      },
      {
        "text": "\\(60\\) m²",
        "correct": false,
        "feedback": "You forgot to subtract the door and windows."
      },
      {
        "text": "\\(24\\) m²",
        "correct": false,
        "feedback": "You gave the floor area."
      },
      {
        "text": "\\(44\\) m²",
        "correct": false,
        "feedback": "You subtracted 16 m² instead of 8 m²."
      }
    ],
    "retryHint": "Wall area = perimeter × height. Then subtract openings.",
    "backward": "Perimeter × height = wall area.",
    "forward": "Used in painting, tiling, and wallpapering problems."
  },
  {
    "itemId": "w7",
    "order": 7,
    "cluster": "realContext",
    "clusterName": "Perimeter and area in real contexts",
    "question": "A circular tabletop of diameter 1.4 m is to be varnished at £15 per m². Find the total cost (π ≈ 3.14).",
    "options": [
      {
        "text": "\\(£23.08\\)",
        "correct": true,
        "feedback": "Correct. \\(r = 0.7\\). Area \\(= 3.14 \\times 0.49 = 1.5386\\) m². Cost \\(= 1.5386 \\times 15 \\approx £23.08\\)."
      },
      {
        "text": "\\(£46.16\\)",
        "correct": false,
        "feedback": "You doubled the correct answer."
      },
      {
        "text": "\\(£65.94\\)",
        "correct": false,
        "feedback": "You multiplied the circumference (2πr = 4.396 m) by the cost — that gives the cost of edging, not varnishing."
      },
      {
        "text": "\\(£11.54\\)",
        "correct": false,
        "feedback": "You halved the correct answer."
      }
    ],
    "retryHint": "Area = πr². Cost = area × rate.",
    "backward": "Circle area × cost per unit.",
    "forward": "Used whenever pricing depends on area."
  },
  {
    "itemId": "w8",
    "order": 8,
    "cluster": "compoundArea",
    "clusterName": "Areas of compound shapes",
    "question": "A rectangle 8 m × 6 m has a semicircle (diameter 8 m) attached to one long side. Find the total area (π ≈ 3.14).<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 222 176\" width=\"311\" height=\"246\" style=\"max-width:100%;height:auto\" font-family=\"Arial, Helvetica, sans-serif\"><path d=\"M 58 68 H 162 V 146 H 58 Z\" fill=\"none\" stroke=\"#999\" stroke-width=\"1.2\" stroke-linejoin=\"round\" stroke-dasharray=\"4 3\"/><path d=\"M 58 68 H 58 A 52 52 0 0 1 162 68 H 162 V 146 H 58 Z\" fill=\"none\" stroke=\"#222\" stroke-width=\"2\" stroke-linejoin=\"round\"/><line x1=\"58\" y1=\"68\" x2=\"162\" y2=\"68\" stroke=\"#c0392b\" stroke-width=\"2\" stroke-dasharray=\"5 4\"/><text x=\"110\" y=\"60\" font-size=\"13\" fill=\"#c0392b\" text-anchor=\"middle\">d = 8 m</text><text x=\"110\" y=\"166\" font-size=\"13\" fill=\"#222\" text-anchor=\"middle\">8 m</text><text x=\"50\" y=\"111\" font-size=\"13\" fill=\"#222\" text-anchor=\"end\">6 m</text></svg></div>",
    "options": [
      {
        "text": "\\(73.12\\) m²",
        "correct": true,
        "feedback": "Correct. Rectangle \\(= 48\\). Semicircle \\(= \\tfrac{1}{2} \\times 3.14 \\times 16 = 25.12\\). Total \\(= 73.12\\) m²."
      },
      {
        "text": "\\(48\\) m²",
        "correct": false,
        "feedback": "You gave only the rectangle."
      },
      {
        "text": "\\(25.12\\) m²",
        "correct": false,
        "feedback": "You gave only the semicircle."
      },
      {
        "text": "\\(98.24\\) m²",
        "correct": false,
        "feedback": "You used the full circle (48 + 50.24 = 98.24)."
      }
    ],
    "backward": "Composite area.",
    "forward": "Used in design and construction."
  }
];

const diagnosticItems = [
  {
    "itemId": "d1",
    "order": 1,
    "cluster": "realContext",
    "clusterName": "Perimeter and area in real contexts",
    "question": "A wheel has diameter 80 cm. How many complete rotations does it make in 2 km? (π ≈ 3.14)<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 190 164\" width=\"266\" height=\"230\" style=\"max-width:100%;height:auto\" font-family=\"Arial, Helvetica, sans-serif\"><circle cx=\"95\" cy=\"82\" r=\"62\" fill=\"none\" stroke=\"#222\" stroke-width=\"2\"/><line x1=\"33\" y1=\"82\" x2=\"157\" y2=\"82\" stroke=\"#c0392b\" stroke-width=\"2\" stroke-dasharray=\"5 4\"/><circle cx=\"95\" cy=\"82\" r=\"2.5\" fill=\"#222\"/><text x=\"95\" y=\"74\" font-size=\"13\" fill=\"#c0392b\" text-anchor=\"middle\">d = 80 cm</text></svg></div>",
    "options": [
      {
        "text": "\\(796\\)",
        "correct": true,
        "feedback": "Correct. Circumference \\(= 3.14 \\times 80 = 251.2\\) cm \\(= 2.512\\) m. \\(2000 \\div 2.512 \\approx 796.18\\), so \\(796\\) complete rotations."
      },
      {
        "text": "\\(797\\)",
        "correct": false,
        "feedback": "You rounded up — the question asks for complete rotations."
      },
      {
        "text": "\\(79\\)",
        "correct": false,
        "feedback": "You misplaced the decimal."
      },
      {
        "text": "\\(2512\\)",
        "correct": false,
        "feedback": "You gave the circumference in cm, not the number of rotations."
      }
    ],
    "backward": "Convert to consistent units first, then divide.",
    "forward": "Used in wheel problems requiring rounding down."
  },
  {
    "itemId": "d2",
    "order": 2,
    "cluster": "units",
    "clusterName": "Large and small units",
    "question": "A rectangular plot is 1.5 km × 800 m. Find its area in hectares (1 ha = 10000 m²).",
    "options": [
      {
        "text": "\\(120\\) ha",
        "correct": true,
        "feedback": "Correct. \\(1.5\\) km \\(= 1500\\) m. Area \\(= 1500 \\times 800 = 1200000\\) m². \\(1200000 \\div 10000 = 120\\) ha."
      },
      {
        "text": "\\(1200\\) ha",
        "correct": false,
        "feedback": "You divided by 1000 instead of 10000."
      },
      {
        "text": "\\(12000\\) ha",
        "correct": false,
        "feedback": "You divided by 100."
      },
      {
        "text": "\\(12\\) ha",
        "correct": false,
        "feedback": "You divided by 100,000."
      }
    ],
    "backward": "Convert both lengths to the same unit first.",
    "forward": "Used in agricultural land measurement."
  },
  {
    "itemId": "d3",
    "order": 3,
    "cluster": "areaCircle",
    "clusterName": "Area of a circle",
    "question": "A circle has area 78.5 cm². A second circle has twice the radius. Find the area of the second circle (π ≈ 3.14).",
    "options": [
      {
        "text": "\\(314\\) cm²",
        "correct": true,
        "feedback": "Correct. \\(r_1^2 = 78.5 \\div 3.14 = 25\\), \\(r_1 = 5\\). \\(r_2 = 10\\). Area \\(= 3.14 \\times 100 = 314\\) cm²."
      },
      {
        "text": "\\(78.5\\) cm²",
        "correct": false,
        "feedback": "You gave the original circle's area."
      },
      {
        "text": "\\(157\\) cm²",
        "correct": false,
        "feedback": "You halved the correct answer."
      },
      {
        "text": "\\(628\\) cm²",
        "correct": false,
        "feedback": "You doubled the correct answer (linear scaling instead of quadratic)."
      }
    ],
    "backward": "Doubling the radius quadruples the area.",
    "forward": "Used when scaling circle problems."
  },
  {
    "itemId": "d4",
    "order": 4,
    "cluster": "compoundArea",
    "clusterName": "Areas of compound shapes",
    "question": "A circular fountain has radius 3 m and is surrounded by a circular path of width 2 m. Find the area of the path (π ≈ 3.14).",
    "options": [
      {
        "text": "\\(50.24\\) m²",
        "correct": true,
        "feedback": "Correct. Inner \\(= 3.14 \\times 9 = 28.26\\). Outer \\(r = 5\\): area \\(= 3.14 \\times 25 = 78.5\\). Path \\(= 78.5 - 28.26 = 50.24\\) m². (bw: Annulus formula.)"
      },
      {
        "text": "\\(28.26\\) m²",
        "correct": false,
        "feedback": "You gave only the inner circle."
      },
      {
        "text": "\\(78.5\\) m²",
        "correct": false,
        "feedback": "You gave only the outer circle."
      },
      {
        "text": "\\(25.12\\) m²",
        "correct": false,
        "feedback": "You halved the correct answer."
      }
    ]
  },
  {
    "itemId": "d5",
    "order": 5,
    "cluster": "compoundArea",
    "clusterName": "Areas of compound shapes",
    "question": "A rectangle 20 cm × 12 cm has four quarter-circles of radius 6 cm cut from its corners. Find the remaining area (π ≈ 3.14).<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 246 158\" width=\"344\" height=\"221\" style=\"max-width:100%;height:auto\" font-family=\"Arial, Helvetica, sans-serif\"><path d=\"M 58 26 H 228 V 128 H 58 Z\" fill=\"none\" stroke=\"#999\" stroke-width=\"1.2\" stroke-linejoin=\"round\" stroke-dasharray=\"4 3\"/><path d=\"M 109 26 H 177 A 51 51 0 0 0 228 77 V 77 A 51 51 0 0 0 177 128 H 109 A 51 51 0 0 0 58 77 V 77 A 51 51 0 0 0 109 26 Z\" fill=\"#f8d7d5\" stroke=\"#222\" stroke-width=\"2\" stroke-linejoin=\"round\"/><line x1=\"58\" y1=\"26\" x2=\"94.1\" y2=\"62.1\" stroke=\"#c0392b\" stroke-width=\"1.6\"/><circle cx=\"58\" cy=\"26\" r=\"2.5\" fill=\"#222\"/><text x=\"58\" y=\"17\" font-size=\"12\" fill=\"#c0392b\" text-anchor=\"start\">r = 6 cm</text><text x=\"143\" y=\"148\" font-size=\"13\" fill=\"#222\" text-anchor=\"middle\">20 cm</text><text x=\"50\" y=\"81\" font-size=\"13\" fill=\"#222\" text-anchor=\"end\">12 cm</text></svg></div>",
    "options": [
      {
        "text": "\\(126.96\\) cm²",
        "correct": true,
        "feedback": "Correct. Rectangle \\(= 240\\). Four quarters = one circle of radius 6 \\(= 3.14 \\times 36 = 113.04\\). Remaining \\(= 240 - 113.04 = 126.96\\) cm²."
      },
      {
        "text": "\\(240\\) cm²",
        "correct": false,
        "feedback": "You gave only the rectangle."
      },
      {
        "text": "\\(113.04\\) cm²",
        "correct": false,
        "feedback": "You gave only the circle."
      },
      {
        "text": "\\(353.04\\) cm²",
        "correct": false,
        "feedback": "You added instead of subtracting."
      }
    ],
    "backward": "Four quarters make one circle.",
    "forward": "Used when a shape has repeated arc cuts."
  },
  {
    "itemId": "d6",
    "order": 6,
    "cluster": "compoundArea",
    "clusterName": "Areas of compound shapes",
    "question": "A composite shape is a rectangle 10 m × 4 m with a triangle (base 10 m, height 6 m) on top. Find its total area.<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 238 194\" width=\"333\" height=\"272\" style=\"max-width:100%;height:auto\" font-family=\"Arial, Helvetica, sans-serif\"><line x1=\"58\" y1=\"104\" x2=\"208\" y2=\"104\" stroke=\"#999\" stroke-width=\"1.2\" stroke-dasharray=\"4 3\"/><path d=\"M 58 104 L 133 14 L 208 104 V 164 H 58 Z\" fill=\"none\" stroke=\"#222\" stroke-width=\"2\" stroke-linejoin=\"round\"/><line x1=\"133\" y1=\"14\" x2=\"133\" y2=\"104\" stroke=\"#c0392b\" stroke-width=\"1.6\" stroke-dasharray=\"5 4\"/><text x=\"143\" y=\"18\" font-size=\"12\" fill=\"#c0392b\" text-anchor=\"start\">h = 6 m</text><text x=\"133\" y=\"184\" font-size=\"13\" fill=\"#222\" text-anchor=\"middle\">10 m</text><text x=\"50\" y=\"138\" font-size=\"13\" fill=\"#222\" text-anchor=\"end\">4 m</text></svg></div>",
    "options": [
      {
        "text": "\\(70\\) m²",
        "correct": true,
        "feedback": "Correct. Rectangle \\(= 40\\). Triangle \\(= \\tfrac{1}{2} \\times 10 \\times 6 = 30\\). Total \\(= 70\\) m². (bw: Composite area.)"
      },
      {
        "text": "\\(40\\) m²",
        "correct": false,
        "feedback": "You gave only the rectangle."
      },
      {
        "text": "\\(30\\) m²",
        "correct": false,
        "feedback": "You gave only the triangle."
      },
      {
        "text": "\\(100\\) m²",
        "correct": false,
        "feedback": "You used the full base × height for the triangle (no \\(\\tfrac{1}{2}\\))."
      }
    ]
  },
  {
    "itemId": "d7",
    "order": 7,
    "cluster": "realContext",
    "clusterName": "Perimeter and area in real contexts",
    "question": "A clock has a minute hand 8 cm long. How far does its tip travel in 45 minutes? (π ≈ 3.14)<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 250 200\" width=\"350\" height=\"280\" style=\"max-width:100%;height:auto\" font-family=\"Arial, Helvetica, sans-serif\"><circle cx=\"100\" cy=\"98\" r=\"70\" fill=\"none\" stroke=\"#222\" stroke-width=\"2\"/><text x=\"100\" y=\"45\" font-size=\"12\" fill=\"#555\" text-anchor=\"middle\">12</text><text x=\"157\" y=\"102\" font-size=\"12\" fill=\"#555\" text-anchor=\"middle\">3</text><text x=\"100\" y=\"159\" font-size=\"12\" fill=\"#555\" text-anchor=\"middle\">6</text><text x=\"43\" y=\"102\" font-size=\"12\" fill=\"#555\" text-anchor=\"middle\">9</text><line x1=\"100\" y1=\"98\" x2=\"100\" y2=\"54\" stroke=\"#c0392b\" stroke-width=\"3\"/><circle cx=\"100\" cy=\"98\" r=\"2.5\" fill=\"#222\"/><text x=\"93\" y=\"80\" font-size=\"12\" fill=\"#c0392b\" text-anchor=\"end\">8 cm</text><path d=\"M 100 18 A 80 80 0 1 1 20 98\" fill=\"none\" stroke=\"#1f6fb2\" stroke-width=\"1.6\" stroke-linejoin=\"round\" stroke-dasharray=\"5 4\"/><polygon points=\"20,98 24.5,107 15.5,107\" fill=\"#1f6fb2\"/><text x=\"163.6\" y=\"173.6\" font-size=\"12\" fill=\"#1f6fb2\" text-anchor=\"start\">45 min</text></svg></div>",
    "options": [
      {
        "text": "\\(37.68\\) cm",
        "correct": true,
        "feedback": "Correct. 45 minutes = \\(\\tfrac{3}{4}\\) of a full circle. Distance \\(= \\tfrac{3}{4} \\times 2\\pi r = \\tfrac{3}{4} \\times 50.24 = 37.68\\) cm."
      },
      {
        "text": "\\(50.24\\) cm",
        "correct": false,
        "feedback": "You used the full circumference."
      },
      {
        "text": "\\(25.12\\) cm",
        "correct": false,
        "feedback": "You used half the circumference."
      },
      {
        "text": "\\(12.56\\) cm",
        "correct": false,
        "feedback": "You used a quarter of the circumference."
      }
    ],
    "backward": "Fraction of a circumference.",
    "forward": "Used whenever a hand or wheel turns through part of a circle."
  },
  {
    "itemId": "d8",
    "order": 8,
    "cluster": "units",
    "clusterName": "Large and small units",
    "question": "A cube has side 20 cm. Find its volume in m³.",
    "options": [
      {
        "text": "\\(0.008\\) m³",
        "correct": true,
        "feedback": "Correct. \\(20\\) cm \\(= 0.2\\) m. Volume \\(= 0.2^3 = 0.008\\) m³. (bw: Volume units scale by the cube of the length factor.)"
      },
      {
        "text": "\\(0.04\\) m³",
        "correct": false,
        "feedback": "You used side² (0.2² = 0.04) instead of side³."
      },
      {
        "text": "\\(8000\\) m³",
        "correct": false,
        "feedback": "You left the volume in cm³."
      },
      {
        "text": "\\(0.8\\) m³",
        "correct": false,
        "feedback": "You used 0.2 × 0.2 × 20 (mixed units)."
      }
    ]
  },
  {
    "itemId": "d9",
    "order": 9,
    "cluster": "mixed",
    "clusterName": "Mixed measurement problems (synthesis)",
    "question": "Two circles have areas in the ratio 9:25. Find the ratio of their circumferences in simplest form.",
    "options": [
      {
        "text": "\\(3:5\\)",
        "correct": true,
        "feedback": "Correct. Area ratio 9:25 → radius ratio 3:5. Circumference ratio = radius ratio = 3:5."
      },
      {
        "text": "\\(9:25\\)",
        "correct": false,
        "feedback": "You used the area ratio directly."
      },
      {
        "text": "\\(5:3\\)",
        "correct": false,
        "feedback": "You reversed the ratio."
      },
      {
        "text": "\\(81:625\\)",
        "correct": false,
        "feedback": "You squared the area ratio."
      }
    ],
    "backward": "Area ∝ r², circumference ∝ r.",
    "forward": "Used whenever circles are scaled."
  },
  {
    "itemId": "d10",
    "order": 10,
    "cluster": "realContext",
    "clusterName": "Perimeter and area in real contexts",
    "question": "A rectangular garden 15 m × 8 m is to be paved. A square section 4 m × 4 m in the middle is left as grass. Paving costs £12 per m². Find the total cost.",
    "options": [
      {
        "text": "\\(£1248\\)",
        "correct": true,
        "feedback": "Correct. Paved area \\(= 15 \\times 8 - 16 = 120 - 16 = 104\\) m². Cost \\(= 104 \\times 12 = £1248\\)."
      },
      {
        "text": "\\(£1440\\)",
        "correct": false,
        "feedback": "You forgot to subtract the grass section (used 120 m²)."
      },
      {
        "text": "\\(£192\\)",
        "correct": false,
        "feedback": "You gave the cost of the grass only."
      },
      {
        "text": "\\(£1632\\)",
        "correct": false,
        "feedback": "You added the grass instead of subtracting it (136 m² × 12)."
      }
    ],
    "backward": "Composite area then cost.",
    "forward": "Used when part of a shape is excluded from pricing."
  },
  {
    "itemId": "d11",
    "order": 11,
    "cluster": "compoundArea",
    "clusterName": "Areas of compound shapes",
    "question": "A rectangular garden 10 m × 6 m has a circular pond of diameter 6 m inside. Find the grass area (π ≈ 3.14).<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 246 146\" width=\"344\" height=\"204\" style=\"max-width:100%;height:auto\" font-family=\"Arial, Helvetica, sans-serif\"><path d=\"M 58 14 H 228 V 116 H 58 Z\" fill=\"#f8d7d5\" stroke=\"#222\" stroke-width=\"2\" stroke-linejoin=\"round\"/><circle cx=\"143\" cy=\"65\" r=\"51\" fill=\"#fff\" stroke=\"#222\" stroke-width=\"2\"/><line x1=\"92\" y1=\"65\" x2=\"194\" y2=\"65\" stroke=\"#c0392b\" stroke-width=\"2\" stroke-dasharray=\"5 4\"/><text x=\"143\" y=\"57\" font-size=\"12\" fill=\"#c0392b\" text-anchor=\"middle\">d = 6 m</text><text x=\"143\" y=\"136\" font-size=\"13\" fill=\"#222\" text-anchor=\"middle\">10 m</text><text x=\"50\" y=\"69\" font-size=\"13\" fill=\"#222\" text-anchor=\"end\">6 m</text></svg></div>",
    "options": [
      {
        "text": "\\(31.74\\) m²",
        "correct": true,
        "feedback": "Correct. Rectangle \\(= 60\\). Pond \\(r = 3\\), area \\(= 3.14 \\times 9 = 28.26\\). Grass \\(= 60 - 28.26 = 31.74\\) m²."
      },
      {
        "text": "\\(60\\) m²",
        "correct": false,
        "feedback": "You gave only the rectangle."
      },
      {
        "text": "\\(28.26\\) m²",
        "correct": false,
        "feedback": "You gave only the pond."
      },
      {
        "text": "\\(88.26\\) m²",
        "correct": false,
        "feedback": "You added instead of subtracting."
      }
    ],
    "backward": "Compound shapes with a circle removed.",
    "forward": "Used in garden and landscaping problems."
  },
  {
    "itemId": "d12",
    "order": 12,
    "cluster": "compoundArea",
    "clusterName": "Areas of compound shapes",
    "question": "A ring (annulus) has inner radius 5 cm and outer radius 8 cm. Find the area of the ring (π ≈ 3.14).<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 260 196\" width=\"364\" height=\"274\" style=\"max-width:100%;height:auto\" font-family=\"Arial, Helvetica, sans-serif\"><circle cx=\"98\" cy=\"96\" r=\"82\" fill=\"#f8d7d5\" stroke=\"#222\" stroke-width=\"2\"/><circle cx=\"98\" cy=\"96\" r=\"51.3\" fill=\"#fff\" stroke=\"#222\" stroke-width=\"2\"/><line x1=\"98\" y1=\"96\" x2=\"46.8\" y2=\"96\" stroke=\"#c0392b\" stroke-width=\"1.8\"/><text x=\"72.4\" y=\"88\" font-size=\"11\" fill=\"#c0392b\" text-anchor=\"middle\">r = 5 cm</text><line x1=\"98\" y1=\"96\" x2=\"156\" y2=\"154\" stroke=\"#1f6fb2\" stroke-width=\"1.8\"/><circle cx=\"98\" cy=\"96\" r=\"2.5\" fill=\"#222\"/><text x=\"165\" y=\"169\" font-size=\"12\" fill=\"#1f6fb2\" text-anchor=\"start\">R = 8 cm</text></svg></div>",
    "options": [
      {
        "text": "\\(122.46\\) cm²",
        "correct": true,
        "feedback": "Correct. Area \\(= 3.14 \\times (64 - 25) = 3.14 \\times 39 = 122.46\\) cm². (bw: Annulus = π(R² − r²).)"
      },
      {
        "text": "\\(78.5\\) cm²",
        "correct": false,
        "feedback": "You gave only the inner circle."
      },
      {
        "text": "\\(200.96\\) cm²",
        "correct": false,
        "feedback": "You gave only the outer circle."
      },
      {
        "text": "\\(279.46\\) cm²",
        "correct": false,
        "feedback": "You added instead of subtracting."
      }
    ]
  },
  {
    "itemId": "d13",
    "order": 13,
    "cluster": "realContext",
    "clusterName": "Perimeter and area in real contexts",
    "question": "A wheel of diameter 42 cm travels a distance of 264 m. How many complete rotations does it make? (π ≈ 3.14)",
    "options": [
      {
        "text": "\\(200\\)",
        "correct": true,
        "feedback": "Correct. Circumference \\(= 3.14 \\times 42 = 131.88\\) cm \\(= 1.3188\\) m. \\(264 \\div 1.3188 \\approx 200.18\\), so \\(200\\) complete rotations."
      },
      {
        "text": "\\(201\\)",
        "correct": false,
        "feedback": "You rounded up — the question asks for complete rotations."
      },
      {
        "text": "\\(20\\)",
        "correct": false,
        "feedback": "You misplaced the decimal."
      },
      {
        "text": "\\(132\\)",
        "correct": false,
        "feedback": "You gave the circumference in cm."
      }
    ],
    "backward": "Convert to consistent units first.",
    "forward": "Used in wheel problems."
  },
  {
    "itemId": "d14",
    "order": 14,
    "cluster": "units",
    "clusterName": "Large and small units",
    "question": "A rectangular swimming pool is 25 m × 12 m × 2 m. Find its capacity in litres (1 m³ = 1000 L).",
    "options": [
      {
        "text": "\\(600000\\) L",
        "correct": true,
        "feedback": "Correct. Volume \\(= 25 \\times 12 \\times 2 = 600\\) m³. \\(\\times 1000 = 600000\\) L."
      },
      {
        "text": "\\(60000\\) L",
        "correct": false,
        "feedback": "You multiplied by 100 instead of 1000."
      },
      {
        "text": "\\(300\\) L",
        "correct": false,
        "feedback": "You gave the volume of one dimension."
      },
      {
        "text": "\\(6000000\\) L",
        "correct": false,
        "feedback": "You multiplied by 10,000."
      }
    ],
    "backward": "Volume × conversion.",
    "forward": "Used in capacity problems."
  },
  {
    "itemId": "d15",
    "order": 15,
    "cluster": "circumference",
    "clusterName": "Circumference of a circle",
    "question": "The area of a circle is 154 cm². Find its circumference (π ≈ 3.14).",
    "options": [
      {
        "text": "\\(43.96\\) cm",
        "correct": true,
        "feedback": "Correct. \\(r^2 = 154 \\div 3.14 = 49\\), \\(r = 7\\). Circumference \\(= 2 \\times 3.14 \\times 7 = 43.96\\) cm."
      },
      {
        "text": "\\(21.98\\) cm",
        "correct": false,
        "feedback": "You used \\(\\pi r\\)."
      },
      {
        "text": "\\(14\\) cm",
        "correct": false,
        "feedback": "You gave \\(2r\\)."
      },
      {
        "text": "\\(87.92\\) cm",
        "correct": false,
        "feedback": "You doubled the correct answer."
      }
    ],
    "backward": "Rearrange area first.",
    "forward": "Used whenever circumference is needed from area."
  },
  {
    "itemId": "d16",
    "order": 16,
    "cluster": "realContext",
    "clusterName": "Perimeter and area in real contexts",
    "question": "A circular tabletop has radius 1.5 m. It is to be edged with a metal strip costing £4 per metre. Find the total cost (π ≈ 3.14).",
    "options": [
      {
        "text": "\\(£37.68\\)",
        "correct": true,
        "feedback": "Correct. Circumference \\(= 2 \\times 3.14 \\times 1.5 = 9.42\\) m. Cost \\(= 9.42 \\times 4 = £37.68\\)."
      },
      {
        "text": "\\(£28.26\\)",
        "correct": false,
        "feedback": "You used the area instead of the circumference."
      },
      {
        "text": "\\(£18.84\\)",
        "correct": false,
        "feedback": "You used half the circumference."
      },
      {
        "text": "\\(£75.36\\)",
        "correct": false,
        "feedback": "You doubled the correct answer."
      }
    ],
    "backward": "Circumference × unit cost.",
    "forward": "Used in edging and border problems."
  },
  {
    "itemId": "d17",
    "order": 17,
    "cluster": "compoundArea",
    "clusterName": "Areas of compound shapes",
    "question": "A rectangle 20 cm × 14 cm has a semicircle of radius 7 cm attached to one short end. Find its perimeter (π ≈ 3.14).<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 318 149.7\" width=\"445\" height=\"210\" style=\"max-width:100%;height:auto\" font-family=\"Arial, Helvetica, sans-serif\"><path d=\"M 109.9 16 H 258 V 119.7 H 109.9 Z\" fill=\"none\" stroke=\"#999\" stroke-width=\"1.2\" stroke-linejoin=\"round\" stroke-dasharray=\"4 3\"/><path d=\"M 109.9 16 H 258 V 119.7 H 109.9 V 119.7 A 51.9 51.9 0 0 1 109.9 16 Z\" fill=\"none\" stroke=\"#222\" stroke-width=\"2\" stroke-linejoin=\"round\"/><line x1=\"109.9\" y1=\"67.9\" x2=\"73.2\" y2=\"31.2\" stroke=\"#c0392b\" stroke-width=\"2\" stroke-dasharray=\"5 4\"/><circle cx=\"109.9\" cy=\"67.9\" r=\"2.5\" fill=\"#222\"/><text x=\"67.2\" y=\"26.2\" font-size=\"13\" fill=\"#c0392b\" text-anchor=\"end\">r = 7 cm</text><text x=\"183.9\" y=\"139.7\" font-size=\"13\" fill=\"#222\" text-anchor=\"middle\">20 cm</text><text x=\"266\" y=\"71.9\" font-size=\"13\" fill=\"#222\" text-anchor=\"start\">14 cm</text></svg></div>",
    "options": [
      {
        "text": "\\(75.98\\) cm",
        "correct": true,
        "feedback": "Correct. Perimeter \\(= 20 + 20 + 14 + \\pi r = 40 + 14 + 3.14 \\times 7 = 75.98\\) cm."
      },
      {
        "text": "\\(68\\) cm",
        "correct": false,
        "feedback": "You used the rectangle's full perimeter (both short sides + both long sides)."
      },
      {
        "text": "\\(54\\) cm",
        "correct": false,
        "feedback": "You forgot to add the arc."
      },
      {
        "text": "\\(97.96\\) cm",
        "correct": false,
        "feedback": "You used the full circumference instead of the semicircle arc."
      }
    ],
    "backward": "The semicircle replaces only one short side; the opposite short side remains on the boundary.",
    "forward": "Used whenever composite shapes share a boundary."
  },
  {
    "itemId": "d18",
    "order": 18,
    "cluster": "mixed",
    "clusterName": "Mixed measurement problems (synthesis)",
    "question": "A square has side 10 cm. A circle with the same perimeter as the square has radius r. Find r (π ≈ 3.14).",
    "options": [
      {
        "text": "\\(6.37\\) cm",
        "correct": true,
        "feedback": "Correct. Square perimeter \\(= 40\\) cm. Circle: \\(2\\pi r = 40\\), \\(r = 40 \\div 6.28 \\approx 6.37\\) cm."
      },
      {
        "text": "\\(10\\) cm",
        "correct": false,
        "feedback": "You gave the square's side."
      },
      {
        "text": "\\(3.18\\) cm",
        "correct": false,
        "feedback": "You halved the correct answer."
      },
      {
        "text": "\\(20\\) cm",
        "correct": false,
        "feedback": "You doubled the square's side."
      }
    ],
    "backward": "Equate perimeters.",
    "forward": "Used when two shapes share a perimeter."
  },
  {
    "itemId": "d19",
    "order": 19,
    "cluster": "circumference",
    "clusterName": "Circumference of a circle",
    "question": "A semicircle has perimeter 25.7 cm (including the straight edge). Find its radius (π ≈ 3.14).",
    "options": [
      {
        "text": "\\(5\\) cm",
        "correct": true,
        "feedback": "Correct. Perimeter \\(= \\pi r + 2r = r(\\pi + 2) = 5.14r\\). \\(25.7 \\div 5.14 = 5\\) cm."
      },
      {
        "text": "\\(10\\) cm",
        "correct": false,
        "feedback": "You gave the diameter."
      },
      {
        "text": "\\(2.5\\) cm",
        "correct": false,
        "feedback": "You halved the correct answer."
      },
      {
        "text": "\\(25.7\\) cm",
        "correct": false,
        "feedback": "You used the perimeter as the answer."
      }
    ],
    "backward": "Rearranging the semicircle perimeter formula.",
    "forward": "Used whenever the semicircle's radius is unknown."
  },
  {
    "itemId": "d20",
    "order": 20,
    "cluster": "units",
    "clusterName": "Large and small units",
    "question": "A cuboid has dimensions 50 cm × 30 cm × 20 cm. Find its volume in litres (1 L = 1000 cm³).",
    "options": [
      {
        "text": "\\(30\\) L",
        "correct": true,
        "feedback": "Correct. Volume \\(= 50 \\times 30 \\times 20 = 30000\\) cm³. \\(\\div 1000 = 30\\) L."
      },
      {
        "text": "\\(300\\) L",
        "correct": false,
        "feedback": "You multiplied by 10 instead of dividing."
      },
      {
        "text": "\\(3000\\) L",
        "correct": false,
        "feedback": "You multiplied by 100."
      },
      {
        "text": "\\(30000\\) L",
        "correct": false,
        "feedback": "You forgot to convert."
      }
    ],
    "backward": "Volume unit conversion.",
    "forward": "Used in capacity problems."
  },
  {
    "itemId": "d21",
    "order": 21,
    "cluster": "compoundArea",
    "clusterName": "Areas of compound shapes",
    "question": "A circular disc of radius 5 cm is cut from a larger disc of radius 10 cm. Find the remaining area (π ≈ 3.14).",
    "options": [
      {
        "text": "\\(235.5\\) cm²",
        "correct": true,
        "feedback": "Correct. Large \\(= 3.14 \\times 100 = 314\\). Small \\(= 3.14 \\times 25 = 78.5\\). Remaining \\(= 314 - 78.5 = 235.5\\) cm². (bw: Difference of two circles.)"
      },
      {
        "text": "\\(314\\) cm²",
        "correct": false,
        "feedback": "You gave only the large disc."
      },
      {
        "text": "\\(78.5\\) cm²",
        "correct": false,
        "feedback": "You gave only the small disc."
      },
      {
        "text": "\\(392.5\\) cm²",
        "correct": false,
        "feedback": "You added instead of subtracting."
      }
    ]
  },
  {
    "itemId": "d22",
    "order": 22,
    "cluster": "realContext",
    "clusterName": "Perimeter and area in real contexts",
    "question": "A circular table has radius 1 m. A circular tablecloth hangs 10 cm over the edge all around. Find the diameter of the tablecloth.",
    "options": [
      {
        "text": "\\(2.2\\) m",
        "correct": true,
        "feedback": "Correct. Tablecloth radius \\(= 1 + 0.1 = 1.1\\) m. Diameter \\(= 2.2\\) m."
      },
      {
        "text": "\\(2.1\\) m",
        "correct": false,
        "feedback": "You added only 5 cm of overhang."
      },
      {
        "text": "\\(2\\) m",
        "correct": false,
        "feedback": "You gave the table's diameter."
      },
      {
        "text": "\\(2.4\\) m",
        "correct": false,
        "feedback": "You added 20 cm of overhang."
      }
    ],
    "backward": "Overhang adds to the radius.",
    "forward": "Used in tablecloth and curtain problems."
  },
  {
    "itemId": "d23",
    "order": 23,
    "cluster": "compoundArea",
    "clusterName": "Areas of compound shapes",
    "question": "A circle is inscribed in a square of side 12 cm. Find the area of the shaded region between the circle and the square (π ≈ 3.14).<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 216 184\" width=\"302\" height=\"258\" style=\"max-width:100%;height:auto\" font-family=\"Arial, Helvetica, sans-serif\"><path d=\"M 58 14 H 198 V 154 H 58 Z\" fill=\"#f8d7d5\" stroke=\"#222\" stroke-width=\"2\" stroke-linejoin=\"round\"/><circle cx=\"128\" cy=\"84\" r=\"70\" fill=\"#fff\" stroke=\"#222\" stroke-width=\"2\"/><text x=\"128\" y=\"174\" font-size=\"13\" fill=\"#222\" text-anchor=\"middle\">12 cm</text><text x=\"50\" y=\"88\" font-size=\"13\" fill=\"#222\" text-anchor=\"end\">12 cm</text></svg></div>",
    "options": [
      {
        "text": "\\(30.96\\) cm²",
        "correct": true,
        "feedback": "Correct. Square \\(= 144\\). Circle \\(r = 6\\), area \\(= 3.14 \\times 36 = 113.04\\). Shaded \\(= 144 - 113.04 = 30.96\\) cm². (bw: Composite subtraction.)"
      },
      {
        "text": "\\(144\\) cm²",
        "correct": false,
        "feedback": "You gave only the square."
      },
      {
        "text": "\\(113.04\\) cm²",
        "correct": false,
        "feedback": "You gave only the circle."
      },
      {
        "text": "\\(257.04\\) cm²",
        "correct": false,
        "feedback": "You added instead of subtracting."
      }
    ]
  },
  {
    "itemId": "d24",
    "order": 24,
    "cluster": "compoundArea",
    "clusterName": "Areas of compound shapes",
    "question": "A cylindrical pipe has external diameter 10 cm and internal diameter 8 cm. Find the area of the cross-section of the pipe material (π ≈ 3.14).",
    "options": [
      {
        "text": "\\(28.26\\) cm²",
        "correct": true,
        "feedback": "Correct. Outer \\(r = 5\\), inner \\(r = 4\\). Area \\(= 3.14 \\times (25 - 16) = 3.14 \\times 9 = 28.26\\) cm². (bw: Annulus from cross-section.)"
      },
      {
        "text": "\\(78.5\\) cm²",
        "correct": false,
        "feedback": "You gave only the outer circle."
      },
      {
        "text": "\\(50.24\\) cm²",
        "correct": false,
        "feedback": "You gave only the inner circle."
      },
      {
        "text": "\\(128.74\\) cm²",
        "correct": false,
        "feedback": "You added instead of subtracting."
      }
    ]
  }
];

const recheckItems = [
  {
    "itemId": "r1",
    "order": 1,
    "cluster": "realContext",
    "clusterName": "Perimeter and area in real contexts",
    "question": "A wheel of diameter 60 cm travels 942 m. How many complete rotations? (π ≈ 3.14)",
    "options": [
      {
        "text": "\\(500\\)",
        "correct": true,
        "feedback": "Correct. Circumference \\(= 3.14 \\times 60 = 188.4\\) cm \\(= 1.884\\) m. \\(942 \\div 1.884 = 500\\) rotations. (bw: Consistent units first.)"
      },
      {
        "text": "\\(501\\)",
        "correct": false,
        "feedback": "You rounded up."
      },
      {
        "text": "\\(50\\)",
        "correct": false,
        "feedback": "You misplaced the decimal."
      },
      {
        "text": "\\(1570\\)",
        "correct": false,
        "feedback": "You divided distance by the diameter instead of the circumference."
      }
    ]
  },
  {
    "itemId": "r2",
    "order": 2,
    "cluster": "units",
    "clusterName": "Large and small units",
    "question": "Convert 3.5 m³ to L (1 m³ = 1000 L).",
    "options": [
      {
        "text": "\\(3500\\) L",
        "correct": true,
        "feedback": "Correct. \\(3.5 \\times 1000 = 3500\\) L. (bw: Larger → smaller means multiply.)"
      },
      {
        "text": "\\(350\\) L",
        "correct": false,
        "feedback": "You multiplied by 100."
      },
      {
        "text": "\\(35000\\) L",
        "correct": false,
        "feedback": "You multiplied by 10 000."
      },
      {
        "text": "\\(3.5\\) L",
        "correct": false,
        "feedback": "You didn't convert."
      }
    ]
  },
  {
    "itemId": "r3",
    "order": 3,
    "cluster": "circumference",
    "clusterName": "Circumference of a circle",
    "question": "The area of a circle is 314 cm². Find its circumference (π ≈ 3.14).",
    "options": [
      {
        "text": "\\(62.8\\) cm",
        "correct": true,
        "feedback": "Correct. \\(r^2 = 314 \\div 3.14 = 100\\), \\(r = 10\\). Circumference \\(= 2 \\times 3.14 \\times 10 = 62.8\\) cm. (bw: Rearrange area first.)"
      },
      {
        "text": "\\(31.4\\) cm",
        "correct": false,
        "feedback": "You used \\(\\pi r\\)."
      },
      {
        "text": "\\(20\\) cm",
        "correct": false,
        "feedback": "You gave \\(2r\\)."
      },
      {
        "text": "\\(125.6\\) cm",
        "correct": false,
        "feedback": "You doubled the correct answer."
      }
    ]
  },
  {
    "itemId": "r4",
    "order": 4,
    "cluster": "compoundArea",
    "clusterName": "Areas of compound shapes",
    "question": "A rectangle 15 cm × 8 cm has a semicircle of radius 4 cm attached to one short side. Find its total area (π ≈ 3.14).<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 318 130.2\" width=\"445\" height=\"182\" style=\"max-width:100%;height:auto\" font-family=\"Arial, Helvetica, sans-serif\"><path d=\"M 100.1 16 H 258 V 100.2 H 100.1 Z\" fill=\"none\" stroke=\"#999\" stroke-width=\"1.2\" stroke-linejoin=\"round\" stroke-dasharray=\"4 3\"/><path d=\"M 100.1 16 H 258 V 100.2 H 100.1 V 100.2 A 42.1 42.1 0 0 1 100.1 16 Z\" fill=\"none\" stroke=\"#222\" stroke-width=\"2\" stroke-linejoin=\"round\"/><line x1=\"100.1\" y1=\"58.1\" x2=\"70.3\" y2=\"28.3\" stroke=\"#c0392b\" stroke-width=\"2\" stroke-dasharray=\"5 4\"/><circle cx=\"100.1\" cy=\"58.1\" r=\"2.5\" fill=\"#222\"/><text x=\"64.3\" y=\"23.3\" font-size=\"13\" fill=\"#c0392b\" text-anchor=\"end\">r = 4 cm</text><text x=\"179.1\" y=\"120.2\" font-size=\"13\" fill=\"#222\" text-anchor=\"middle\">15 cm</text><text x=\"266\" y=\"62.1\" font-size=\"13\" fill=\"#222\" text-anchor=\"start\">8 cm</text></svg></div>",
    "options": [
      {
        "text": "\\(145.12\\) cm²",
        "correct": true,
        "feedback": "Correct. Rectangle \\(= 120\\). Semicircle \\(= \\tfrac{1}{2} \\times 3.14 \\times 16 = 25.12\\). Total \\(= 145.12\\) cm². (bw: Composite area.)"
      },
      {
        "text": "\\(120\\) cm²",
        "correct": false,
        "feedback": "You gave only the rectangle."
      },
      {
        "text": "\\(25.12\\) cm²",
        "correct": false,
        "feedback": "You gave only the semicircle."
      },
      {
        "text": "\\(170.24\\) cm²",
        "correct": false,
        "feedback": "You used the full circle (120 + 50.24 = 170.24)."
      }
    ]
  },
  {
    "itemId": "r5",
    "order": 5,
    "cluster": "realContext",
    "clusterName": "Perimeter and area in real contexts",
    "question": "A rectangular room is 6 m × 4 m. Wall height is 2.5 m. Paint costs £3 per m². Find the total cost to paint all four walls (no openings).",
    "options": [
      {
        "text": "\\(£150\\)",
        "correct": true,
        "feedback": "Correct. Perimeter \\(= 20\\) m. Wall area \\(= 20 \\times 2.5 = 50\\) m². Cost \\(= 50 \\times 3 = £150\\)."
      },
      {
        "text": "\\(£72\\)",
        "correct": false,
        "feedback": "You used the floor area (\\(6 \\times 4 = 24\\) m²) instead of the wall area."
      },
      {
        "text": "\\(£300\\)",
        "correct": false,
        "feedback": "You doubled the correct answer."
      },
      {
        "text": "\\(£75\\)",
        "correct": false,
        "feedback": "You used only one long wall and one short wall (\\(6 \\times 2.5 + 4 \\times 2.5 = 25\\) m²)."
      }
    ],
    "backward": "Perimeter × height = wall area.",
    "forward": "Used in painting and wallpapering."
  },
  {
    "itemId": "r6",
    "order": 6,
    "cluster": "compoundArea",
    "clusterName": "Areas of compound shapes",
    "question": "A rectangle 12 m × 5 m has a semicircle (diameter 12 m) attached to one long side. Find the total area (π ≈ 3.14).<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 259.8 176\" width=\"364\" height=\"246\" style=\"max-width:100%;height:auto\" font-family=\"Arial, Helvetica, sans-serif\"><path d=\"M 58 86.9 H 199.8 V 146 H 58 Z\" fill=\"none\" stroke=\"#999\" stroke-width=\"1.2\" stroke-linejoin=\"round\" stroke-dasharray=\"4 3\"/><path d=\"M 58 86.9 H 58 A 70.9 70.9 0 0 1 199.8 86.9 H 199.8 V 146 H 58 Z\" fill=\"none\" stroke=\"#222\" stroke-width=\"2\" stroke-linejoin=\"round\"/><line x1=\"58\" y1=\"86.9\" x2=\"199.8\" y2=\"86.9\" stroke=\"#c0392b\" stroke-width=\"2\" stroke-dasharray=\"5 4\"/><text x=\"128.9\" y=\"78.9\" font-size=\"13\" fill=\"#c0392b\" text-anchor=\"middle\">d = 12 m</text><text x=\"128.9\" y=\"166\" font-size=\"13\" fill=\"#222\" text-anchor=\"middle\">12 m</text><text x=\"50\" y=\"120.5\" font-size=\"13\" fill=\"#222\" text-anchor=\"end\">5 m</text></svg></div>",
    "options": [
      {
        "text": "\\(116.52\\) m²",
        "correct": true,
        "feedback": "Correct. Rectangle \\(= 60\\). Semicircle \\(= \\tfrac{1}{2} \\times 3.14 \\times 36 = 56.52\\). Total \\(= 116.52\\) m². (bw: Composite area.)"
      },
      {
        "text": "\\(60\\) m²",
        "correct": false,
        "feedback": "You gave only the rectangle."
      },
      {
        "text": "\\(56.52\\) m²",
        "correct": false,
        "feedback": "You gave only the semicircle."
      },
      {
        "text": "\\(173.04\\) m²",
        "correct": false,
        "feedback": "You used the full circle (60 + 113.04 = 173.04)."
      }
    ]
  },
  {
    "itemId": "r7",
    "order": 7,
    "cluster": "circumference",
    "clusterName": "Circumference of a circle",
    "question": "A circular track has outer radius 30 m and inner radius 28 m. Find the length of the outer edge (π ≈ 3.14).",
    "options": [
      {
        "text": "\\(188.4\\) m",
        "correct": true,
        "feedback": "Correct. Circumference \\(= 2 \\times 3.14 \\times 30 = 188.4\\) m. (bw: Circumference formula.)"
      },
      {
        "text": "\\(175.84\\) m",
        "correct": false,
        "feedback": "You used the inner radius."
      },
      {
        "text": "\\(94.2\\) m",
        "correct": false,
        "feedback": "You gave half the circumference."
      },
      {
        "text": "\\(376.8\\) m",
        "correct": false,
        "feedback": "You doubled the correct answer."
      }
    ]
  },
  {
    "itemId": "r8",
    "order": 8,
    "cluster": "units",
    "clusterName": "Large and small units",
    "question": "A rectangular tank is 1.2 m long, 0.8 m wide, 0.5 m deep. Find its volume in litres (1 m³ = 1000 L).",
    "options": [
      {
        "text": "\\(480\\) L",
        "correct": true,
        "feedback": "Correct. Volume \\(= 1.2 \\times 0.8 \\times 0.5 = 0.48\\) m³. \\(\\times 1000 = 480\\) L. (bw: Volume × conversion.)"
      },
      {
        "text": "\\(48\\) L",
        "correct": false,
        "feedback": "You multiplied by 100 instead of 1000."
      },
      {
        "text": "\\(4800\\) L",
        "correct": false,
        "feedback": "You multiplied by 10,000."
      },
      {
        "text": "\\(0.48\\) L",
        "correct": false,
        "feedback": "You left the volume in m³."
      }
    ]
  },
  {
    "itemId": "r9",
    "order": 9,
    "cluster": "compoundArea",
    "clusterName": "Areas of compound shapes",
    "question": "A circular pond has circumference 31.4 m. A path of width 1 m is added. Find the area of the path (π ≈ 3.14).",
    "options": [
      {
        "text": "\\(34.54\\) m²",
        "correct": true,
        "feedback": "Correct. Inner \\(r = 5\\), inner area \\(= 78.5\\). Outer \\(r = 6\\), outer area \\(= 113.04\\). Path \\(= 113.04 - 78.5 = 34.54\\) m²."
      },
      {
        "text": "\\(78.5\\) m²",
        "correct": false,
        "feedback": "You gave only the inner circle."
      },
      {
        "text": "\\(113.04\\) m²",
        "correct": false,
        "feedback": "You gave only the outer circle."
      },
      {
        "text": "\\(191.54\\) m²",
        "correct": false,
        "feedback": "You added instead of subtracting."
      }
    ],
    "backward": "Annulus from circumference.",
    "forward": "Used whenever a ring is added around a known circle."
  },
  {
    "itemId": "r10",
    "order": 10,
    "cluster": "compoundArea",
    "clusterName": "Areas of compound shapes",
    "question": "A square of side 10 cm has a circle of radius 5 cm cut out of it. Find the remaining area (π ≈ 3.14).<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 216 184\" width=\"302\" height=\"258\" style=\"max-width:100%;height:auto\" font-family=\"Arial, Helvetica, sans-serif\"><path d=\"M 58 14 H 198 V 154 H 58 Z\" fill=\"#f8d7d5\" stroke=\"#222\" stroke-width=\"2\" stroke-linejoin=\"round\"/><circle cx=\"128\" cy=\"84\" r=\"70\" fill=\"#fff\" stroke=\"#222\" stroke-width=\"2\"/><line x1=\"128\" y1=\"84\" x2=\"198\" y2=\"84\" stroke=\"#c0392b\" stroke-width=\"2\" stroke-dasharray=\"5 4\"/><circle cx=\"128\" cy=\"84\" r=\"2.5\" fill=\"#222\"/><text x=\"163\" y=\"76\" font-size=\"12\" fill=\"#c0392b\" text-anchor=\"middle\">r = 5 cm</text><text x=\"128\" y=\"174\" font-size=\"13\" fill=\"#222\" text-anchor=\"middle\">10 cm</text><text x=\"50\" y=\"88\" font-size=\"13\" fill=\"#222\" text-anchor=\"end\">10 cm</text></svg></div>",
    "options": [
      {
        "text": "\\(21.5\\) cm²",
        "correct": true,
        "feedback": "Correct. Square \\(= 100\\). Circle \\(= 78.5\\). Remaining \\(= 21.5\\) cm². (bw: Composite subtraction.)"
      },
      {
        "text": "\\(100\\) cm²",
        "correct": false,
        "feedback": "You gave only the square."
      },
      {
        "text": "\\(78.5\\) cm²",
        "correct": false,
        "feedback": "You gave only the circle."
      },
      {
        "text": "\\(178.5\\) cm²",
        "correct": false,
        "feedback": "You added instead of subtracting."
      }
    ]
  },
  {
    "itemId": "r11",
    "order": 11,
    "cluster": "realContext",
    "clusterName": "Perimeter and area in real contexts",
    "question": "A circular flowerbed of radius 4 m is surrounded by a gravel path 1 m wide. Gravel costs £5 per m². Find the total cost (π ≈ 3.14).",
    "options": [
      {
        "text": "\\(£141.30\\)",
        "correct": true,
        "feedback": "Correct. Inner area \\(= 3.14 \\times 16 = 50.24\\). Outer \\(r = 5\\), area \\(= 3.14 \\times 25 = 78.5\\). Path \\(= 78.5 - 50.24 = 28.26\\) m². Cost \\(= 28.26 \\times 5 = £141.30\\)."
      },
      {
        "text": "\\(£251.20\\)",
        "correct": false,
        "feedback": "You used the inner circle's area × cost (50.24 × 5 = £251.20)."
      },
      {
        "text": "\\(£392.50\\)",
        "correct": false,
        "feedback": "You used the outer circle's area × cost (78.5 × 5 = £392.50)."
      },
      {
        "text": "\\(£70.65\\)",
        "correct": false,
        "feedback": "You halved the correct answer."
      }
    ],
    "backward": "Annulus + cost.",
    "forward": "Used whenever a ring-shaped region is priced by area."
  },
  {
    "itemId": "r12",
    "order": 12,
    "cluster": "mixed",
    "clusterName": "Mixed measurement problems (synthesis)",
    "question": "A cylindrical can has radius 5 cm and height 10 cm. Find its lateral surface area (the curved side only) (π ≈ 3.14).",
    "options": [
      {
        "text": "\\(314\\) cm²",
        "correct": true,
        "feedback": "Correct. Lateral area \\(= 2\\pi r h = 2 \\times 3.14 \\times 5 \\times 10 = 314\\) cm²."
      },
      {
        "text": "\\(157\\) cm²",
        "correct": false,
        "feedback": "You used \\(\\pi r h\\) instead of \\(2\\pi r h\\) (half the correct answer)."
      },
      {
        "text": "\\(628\\) cm²",
        "correct": false,
        "feedback": "You doubled the correct answer."
      },
      {
        "text": "\\(785\\) cm²",
        "correct": false,
        "feedback": "You used \\(\\pi r^2 h\\) (the volume) instead of \\(2\\pi r h\\) (the lateral area)."
      }
    ],
    "backward": "Unrolled cylinder = rectangle with length = circumference, height = h.",
    "forward": "Used in surface area problems."
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
    title: "Shapes and Measurements — Problem-Solving & Synthesis",
    subtitle: "Grade 8 · Level 3 · Problem-Solving & Synthesis",
    description: "Multi-step reasoning with composite figures, annuli, scaled circles, volume and capacity conversions, and real-world costing in unfamiliar configurations — warm-up, diagnostic, and spaced recheck for synthesis-level fluency.",
    clusterNames: CLUSTER_NAMES,
    gateReviewHTML: "<p>You’ve finished the warm‑up. The next 24 questions are the Problem‑Solving & Synthesis diagnostic for shapes and measurements. Each question asks you to construct your own path — chain formulas, combine units, subtract shapes, or reason through a composite figure. Use π ≈ 3.14. Some items include diagrams — read each one carefully.</p>",
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

// seed/mathSeedCh7ShapesMeasurementsL2.js
//
// Populates math_chapters and math_questions with Grade 8, Chapter 7
// (Shapes and Measurements), Level 2 — converted from the standalone diagnostic
// JSON ch7-shapes-measurements-level-2.json. Diagrams are inlined as SVG HTML
// directly in each question's text (the schema has no separate diagram
// field, and question text is already rendered as raw HTML).
//
// Run with: node seed/mathSeedCh7ShapesMeasurementsL2.js

const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-8";
const GRADE_LABEL = "Grade 8";
const CHAPTER_SLUG = "ch-7-shapes-measurements";
const CHAPTER_NAME = "Shapes and Measurements";
const LEVEL = 2;

const CLUSTER_NAMES = {
  "circumference": "Circumference of a circle",
  "areaCircle": "Area of a circle",
  "compoundArea": "Areas of compound shapes",
  "units": "Large and small units",
  "realContext": "Perimeter and area in real contexts",
  "mixed": "Mixed measurement problems"
};

const warmupItems = [
  {
    "itemId": "w1",
    "order": 1,
    "cluster": "circumference",
    "clusterName": "Circumference of a circle",
    "question": "A circle has circumference 37.68 cm. Find its radius (π ≈ 3.14).",
    "options": [
      {
        "text": "\\(6\\) cm",
        "correct": true,
        "feedback": "Correct. \\(r = C \\div (2\\pi) = 37.68 \\div 6.28 = 6\\) cm."
      },
      {
        "text": "\\(12\\) cm",
        "correct": false,
        "feedback": "You gave the diameter (divided by π instead of 2π)."
      },
      {
        "text": "\\(3\\) cm",
        "correct": false,
        "feedback": "You halved the correct answer."
      },
      {
        "text": "\\(18.84\\) cm",
        "correct": false,
        "feedback": "You gave \\(C \\div 2\\)."
      }
    ],
    "retryHint": "\\(r = C \\div (2\\pi)\\).",
    "backward": "Rearranging the circumference formula.",
    "forward": "Used whenever the circumference is known but the radius isn't."
  },
  {
    "itemId": "w2",
    "order": 2,
    "cluster": "areaCircle",
    "clusterName": "Area of a circle",
    "question": "A semicircle has radius 5 cm. Find its area (π ≈ 3.14).<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 200 116\" width=\"280\" height=\"162\" style=\"max-width:100%;height:auto\" font-family=\"Arial, Helvetica, sans-serif\"><path d=\"M 20 100 A 80 80 0 0 1 180 100 Z\" fill=\"none\" stroke=\"#222\" stroke-width=\"2\" stroke-linejoin=\"round\"/><line x1=\"100\" y1=\"100\" x2=\"100\" y2=\"20\" stroke=\"#c0392b\" stroke-width=\"2\" stroke-dasharray=\"5 4\"/><circle cx=\"100\" cy=\"100\" r=\"2.5\" fill=\"#222\"/><text x=\"107\" y=\"64\" font-size=\"13\" fill=\"#c0392b\" text-anchor=\"start\">r = 5 cm</text></svg></div>",
    "options": [
      {
        "text": "\\(39.25\\) cm²",
        "correct": true,
        "feedback": "Correct. \\(A = \\tfrac{1}{2} \\times 3.14 \\times 25 = 39.25\\) cm²."
      },
      {
        "text": "\\(78.5\\) cm²",
        "correct": false,
        "feedback": "You used the full circle area (forgot to halve)."
      },
      {
        "text": "\\(15.7\\) cm²",
        "correct": false,
        "feedback": "You used \\(\\pi r\\)."
      },
      {
        "text": "\\(19.625\\) cm²",
        "correct": false,
        "feedback": "You halved twice."
      }
    ],
    "retryHint": "Area of a semicircle = \\(\\tfrac{1}{2}\\pi r^2\\).",
    "backward": "A semicircle is half a circle.",
    "forward": "Used whenever half a circle is part of a composite shape."
  },
  {
    "itemId": "w3",
    "order": 3,
    "cluster": "units",
    "clusterName": "Large and small units",
    "question": "Convert 2.5 m² to cm².",
    "options": [
      {
        "text": "\\(25000\\) cm²",
        "correct": true,
        "feedback": "Correct. \\(1\\) m² \\(= 10000\\) cm². \\(2.5 \\times 10000 = 25000\\) cm²."
      },
      {
        "text": "\\(2500\\) cm²",
        "correct": false,
        "feedback": "You used 1000 as the conversion."
      },
      {
        "text": "\\(250\\) cm²",
        "correct": false,
        "feedback": "You used 100 as the conversion."
      },
      {
        "text": "\\(250000\\) cm²",
        "correct": false,
        "feedback": "You used 100 000 as the conversion."
      }
    ],
    "retryHint": "1 m² = 100 cm × 100 cm = 10000 cm².",
    "backward": "Area units scale by the square of the length factor.",
    "forward": "Used whenever area measurements need converting."
  },
  {
    "itemId": "w4",
    "order": 4,
    "cluster": "realContext",
    "clusterName": "Perimeter and area in real contexts",
    "question": "A rectangular floor is 8 m × 6 m. Carpet costs £12.50 per m². Find the total cost.",
    "options": [
      {
        "text": "\\(£600\\)",
        "correct": true,
        "feedback": "Correct. Area \\(= 48\\) m². Cost \\(= 48 \\times 12.50 = £600\\)."
      },
      {
        "text": "\\(£350\\)",
        "correct": false,
        "feedback": "You used the perimeter (28 m) × £12.50."
      },
      {
        "text": "\\(£60\\)",
        "correct": false,
        "feedback": "You multiplied 48 by £1.25 instead of £12.50."
      },
      {
        "text": "\\(£120\\)",
        "correct": false,
        "feedback": "You multiplied 48 by £2.50 instead of £12.50."
      }
    ],
    "retryHint": "Area = length × width. Then × cost per m².",
    "backward": "Area × cost per unit.",
    "forward": "Used whenever pricing depends on area."
  },
  {
    "itemId": "w5",
    "order": 5,
    "cluster": "compoundArea",
    "clusterName": "Areas of compound shapes",
    "question": "A rectangle 12 cm × 8 cm has a semicircle of radius 4 cm cut out of one long side. Find the remaining area (π ≈ 3.14).<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 313 176\" width=\"438\" height=\"246\" style=\"max-width:100%;height:auto\" font-family=\"Arial, Helvetica, sans-serif\"><path d=\"M 58 16 H 90.5 A 65 65 0 0 0 220.5 16 H 253 V 146 H 58 Z\" fill=\"none\" stroke=\"#222\" stroke-width=\"2\" stroke-linejoin=\"round\"/><line x1=\"155.5\" y1=\"16\" x2=\"201.5\" y2=\"62\" stroke=\"#c0392b\" stroke-width=\"2\" stroke-dasharray=\"5 4\"/><circle cx=\"155.5\" cy=\"16\" r=\"2.5\" fill=\"#222\"/><text x=\"172.5\" y=\"43\" font-size=\"13\" fill=\"#c0392b\" text-anchor=\"end\">r = 4 cm</text><text x=\"155.5\" y=\"166\" font-size=\"13\" fill=\"#222\" text-anchor=\"middle\">12 cm</text><text x=\"50\" y=\"85\" font-size=\"13\" fill=\"#222\" text-anchor=\"end\">8 cm</text></svg></div>",
    "options": [
      {
        "text": "\\(70.88\\) cm²",
        "correct": true,
        "feedback": "Correct. Rectangle \\(= 96\\). Semicircle \\(= \\tfrac{1}{2} \\times 3.14 \\times 16 = 25.12\\). Remaining \\(= 96 - 25.12 = 70.88\\) cm²."
      },
      {
        "text": "\\(121.12\\) cm²",
        "correct": false,
        "feedback": "You added the semicircle instead of subtracting it."
      },
      {
        "text": "\\(96\\) cm²",
        "correct": false,
        "feedback": "You gave only the rectangle."
      },
      {
        "text": "\\(45.76\\) cm²",
        "correct": false,
        "feedback": "You subtracted the full circle instead of the semicircle (96 − 50.24 = 45.76)."
      }
    ],
    "retryHint": "Subtract the semicircle's area, not add it.",
    "backward": "Compound shapes with a cut-out.",
    "forward": "Used whenever a region is removed from a shape."
  },
  {
    "itemId": "w6",
    "order": 6,
    "cluster": "realContext",
    "clusterName": "Perimeter and area in real contexts",
    "question": "The minute hand of a clock is 12 cm long. How far does its tip travel in 15 minutes? (π ≈ 3.14)<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 250 200\" width=\"350\" height=\"280\" style=\"max-width:100%;height:auto\" font-family=\"Arial, Helvetica, sans-serif\"><circle cx=\"100\" cy=\"98\" r=\"70\" fill=\"none\" stroke=\"#222\" stroke-width=\"2\"/><text x=\"100\" y=\"45\" font-size=\"12\" fill=\"#555\" text-anchor=\"middle\">12</text><text x=\"157\" y=\"102\" font-size=\"12\" fill=\"#555\" text-anchor=\"middle\">3</text><text x=\"100\" y=\"159\" font-size=\"12\" fill=\"#555\" text-anchor=\"middle\">6</text><text x=\"43\" y=\"102\" font-size=\"12\" fill=\"#555\" text-anchor=\"middle\">9</text><line x1=\"100\" y1=\"98\" x2=\"100\" y2=\"54\" stroke=\"#c0392b\" stroke-width=\"3\"/><circle cx=\"100\" cy=\"98\" r=\"2.5\" fill=\"#222\"/><text x=\"93\" y=\"80\" font-size=\"12\" fill=\"#c0392b\" text-anchor=\"end\">12 cm</text><path d=\"M 100 18 A 80 80 0 0 1 180 98\" fill=\"none\" stroke=\"#1f6fb2\" stroke-width=\"1.6\" stroke-linejoin=\"round\" stroke-dasharray=\"5 4\"/><polygon points=\"180,98 175.5,89 184.5,89\" fill=\"#1f6fb2\"/><text x=\"163.6\" y=\"38.4\" font-size=\"12\" fill=\"#1f6fb2\" text-anchor=\"start\">15 min</text></svg></div>",
    "options": [
      {
        "text": "\\(18.84\\) cm",
        "correct": true,
        "feedback": "Correct. 15 minutes = \\(\\tfrac{1}{4}\\) of a full circle. Distance \\(= \\tfrac{1}{4} \\times 2\\pi r = \\tfrac{1}{2}\\pi \\times 12 = 18.84\\) cm."
      },
      {
        "text": "\\(75.36\\) cm",
        "correct": false,
        "feedback": "You used the full circumference."
      },
      {
        "text": "\\(37.68\\) cm",
        "correct": false,
        "feedback": "You used half the circumference."
      },
      {
        "text": "\\(9.42\\) cm",
        "correct": false,
        "feedback": "You used an eighth of the circumference."
      }
    ],
    "retryHint": "15 minutes is a quarter of the clock face.",
    "backward": "Fraction of a circumference.",
    "forward": "Used whenever a hand or wheel turns through part of a circle."
  },
  {
    "itemId": "w7",
    "order": 7,
    "cluster": "areaCircle",
    "clusterName": "Area of a circle",
    "question": "A circular flower bed has circumference 18.84 m. Find its area (π ≈ 3.14).",
    "options": [
      {
        "text": "\\(28.26\\) m²",
        "correct": true,
        "feedback": "Correct. \\(r = 18.84 \\div 6.28 = 3\\) m. Area \\(= 3.14 \\times 9 = 28.26\\) m²."
      },
      {
        "text": "\\(6\\) m²",
        "correct": false,
        "feedback": "You gave the diameter, not the area."
      },
      {
        "text": "\\(113.04\\) m²",
        "correct": false,
        "feedback": "You used \\(r = 6\\) (forgot to halve the diameter)."
      },
      {
        "text": "\\(9.42\\) m²",
        "correct": false,
        "feedback": "You used \\(\\pi r\\)."
      }
    ],
    "retryHint": "Find the radius first, then use \\(A = \\pi r^2\\).",
    "backward": "Rearranging the circumference formula first.",
    "forward": "Used whenever area must be found from circumference."
  },
  {
    "itemId": "w8",
    "order": 8,
    "cluster": "realContext",
    "clusterName": "Perimeter and area in real contexts",
    "question": "A rectangular room is 10 m × 5 m with a 1 m × 1 m square corner cut out. Flooring costs £20 per m². Find the total cost.<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 256 146\" width=\"358\" height=\"204\" style=\"max-width:100%;height:auto\" font-family=\"Arial, Helvetica, sans-serif\"><path d=\"M 58 26 H 76 V 44 H 58 Z\" fill=\"none\" stroke=\"#c0392b\" stroke-width=\"1.2\" stroke-linejoin=\"round\" stroke-dasharray=\"4 3\"/><path d=\"M 76 26 H 238 V 116 H 58 V 44 H 76 Z\" fill=\"none\" stroke=\"#222\" stroke-width=\"2\" stroke-linejoin=\"round\"/><text x=\"67\" y=\"19\" font-size=\"12\" fill=\"#c0392b\" text-anchor=\"middle\">1 m</text><text x=\"148\" y=\"136\" font-size=\"13\" fill=\"#222\" text-anchor=\"middle\">10 m</text><text x=\"50\" y=\"75\" font-size=\"13\" fill=\"#222\" text-anchor=\"end\">5 m</text></svg></div>",
    "options": [
      {
        "text": "\\(£980\\)",
        "correct": true,
        "feedback": "Correct. Area \\(= 50 - 1 = 49\\) m². Cost \\(= 49 \\times 20 = £980\\)."
      },
      {
        "text": "\\(£1000\\)",
        "correct": false,
        "feedback": "You forgot to subtract the corner (used 50 m²)."
      },
      {
        "text": "\\(£9800\\)",
        "correct": false,
        "feedback": "You multiplied by £200 instead of £20."
      },
      {
        "text": "\\(£800\\)",
        "correct": false,
        "feedback": "You subtracted 10 m² instead of 1 m²."
      }
    ],
    "retryHint": "Find the net area first, then multiply by the cost per m².",
    "backward": "Compound area then cost.",
    "forward": "Used whenever a floor is not a simple rectangle."
  }
];

const diagnosticItems = [
  {
    "itemId": "d1",
    "order": 1,
    "cluster": "realContext",
    "clusterName": "Perimeter and area in real contexts",
    "question": "A wheel has diameter 70 cm. How far does it travel in 100 full rotations, in metres? (π ≈ 3.14)",
    "options": [
      {
        "text": "\\(219.8\\) m",
        "correct": true,
        "feedback": "Correct. Circumference \\(= 3.14 \\times 70 = 219.8\\) cm. \\(100\\) rotations \\(= 21980\\) cm \\(= 219.8\\) m."
      },
      {
        "text": "\\(21.98\\) m",
        "correct": false,
        "feedback": "You divided by 10 somewhere in the unit conversion."
      },
      {
        "text": "\\(2198\\) m",
        "correct": false,
        "feedback": "You divided by 10 instead of 100 when converting cm to m."
      },
      {
        "text": "\\(70\\) m",
        "correct": false,
        "feedback": "You multiplied the diameter by 100 instead of the circumference."
      }
    ],
    "backward": "Circumference × number of rotations.",
    "forward": "Used in wheel and gear problems."
  },
  {
    "itemId": "d2",
    "order": 2,
    "cluster": "units",
    "clusterName": "Large and small units",
    "question": "Convert 450 cm² to m².",
    "options": [
      {
        "text": "\\(0.045\\) m²",
        "correct": true,
        "feedback": "Correct. \\(1\\) m² \\(= 10000\\) cm². \\(450 \\div 10000 = 0.045\\) m²."
      },
      {
        "text": "\\(4.5\\) m²",
        "correct": false,
        "feedback": "You divided by 100."
      },
      {
        "text": "\\(45000\\) m²",
        "correct": false,
        "feedback": "You multiplied instead of dividing."
      },
      {
        "text": "\\(0.45\\) m²",
        "correct": false,
        "feedback": "You divided by 1000."
      }
    ],
    "backward": "Smaller area unit → larger unit means divide.",
    "forward": "Used whenever area measurements are compared across units."
  },
  {
    "itemId": "d3",
    "order": 3,
    "cluster": "circumference",
    "clusterName": "Circumference of a circle",
    "question": "A circle has area 200.96 cm². Find its circumference (π ≈ 3.14).",
    "options": [
      {
        "text": "\\(50.24\\) cm",
        "correct": true,
        "feedback": "Correct. \\(r^2 = 200.96 \\div 3.14 = 64\\), \\(r = 8\\). Circumference \\(= 2 \\times 3.14 \\times 8 = 50.24\\) cm."
      },
      {
        "text": "\\(25.12\\) cm",
        "correct": false,
        "feedback": "You used \\(\\pi r\\) instead of \\(2\\pi r\\)."
      },
      {
        "text": "\\(16\\) cm",
        "correct": false,
        "feedback": "You gave \\(2r\\)."
      },
      {
        "text": "\\(100.48\\) cm",
        "correct": false,
        "feedback": "You doubled the correct answer."
      }
    ],
    "backward": "Rearranging the area formula first.",
    "forward": "Used whenever circumference must be found from area."
  },
  {
    "itemId": "d4",
    "order": 4,
    "cluster": "compoundArea",
    "clusterName": "Areas of compound shapes",
    "question": "A rectangular garden is 20 m × 15 m with a circular pond of radius 3 m inside. Find the area of the grass (π ≈ 3.14).",
    "options": [
      {
        "text": "\\(271.74\\) m²",
        "correct": true,
        "feedback": "Correct. Rectangle \\(= 300\\). Pond \\(= 3.14 \\times 9 = 28.26\\). Grass \\(= 300 - 28.26 = 271.74\\) m²."
      },
      {
        "text": "\\(328.26\\) m²",
        "correct": false,
        "feedback": "You added the pond instead of subtracting."
      },
      {
        "text": "\\(300\\) m²",
        "correct": false,
        "feedback": "You gave only the rectangle."
      },
      {
        "text": "\\(28.26\\) m²",
        "correct": false,
        "feedback": "You gave only the pond."
      }
    ],
    "backward": "Compound shapes with a circle removed.",
    "forward": "Used whenever a shape contains a circular region."
  },
  {
    "itemId": "d5",
    "order": 5,
    "cluster": "compoundArea",
    "clusterName": "Areas of compound shapes",
    "question": "A shape is a rectangle 8 cm × 4 cm with a semicircle of radius 2 cm attached to one short side. Find its total area (π ≈ 3.14).<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 318 126\" width=\"445\" height=\"176\" style=\"max-width:100%;height:auto\" font-family=\"Arial, Helvetica, sans-serif\"><path d=\"M 98 16 H 258 V 96 H 98 Z\" fill=\"none\" stroke=\"#999\" stroke-width=\"1.2\" stroke-linejoin=\"round\" stroke-dasharray=\"4 3\"/><path d=\"M 98 16 H 258 V 96 H 98 V 96 A 40 40 0 0 1 98 16 Z\" fill=\"none\" stroke=\"#222\" stroke-width=\"2\" stroke-linejoin=\"round\"/><line x1=\"98\" y1=\"56\" x2=\"69.7\" y2=\"27.7\" stroke=\"#c0392b\" stroke-width=\"2\" stroke-dasharray=\"5 4\"/><circle cx=\"98\" cy=\"56\" r=\"2.5\" fill=\"#222\"/><text x=\"63.7\" y=\"22.7\" font-size=\"13\" fill=\"#c0392b\" text-anchor=\"end\">r = 2 cm</text><text x=\"178\" y=\"116\" font-size=\"13\" fill=\"#222\" text-anchor=\"middle\">8 cm</text><text x=\"266\" y=\"60\" font-size=\"13\" fill=\"#222\" text-anchor=\"start\">4 cm</text></svg></div>",
    "options": [
      {
        "text": "\\(38.28\\) cm²",
        "correct": true,
        "feedback": "Correct. Rectangle \\(= 32\\). Semicircle \\(= \\tfrac{1}{2} \\times 3.14 \\times 4 = 6.28\\). Total \\(= 38.28\\) cm²."
      },
      {
        "text": "\\(32\\) cm²",
        "correct": false,
        "feedback": "You gave only the rectangle."
      },
      {
        "text": "\\(6.28\\) cm²",
        "correct": false,
        "feedback": "You gave only the semicircle."
      },
      {
        "text": "\\(44.56\\) cm²",
        "correct": false,
        "feedback": "You used the full circle instead of the semicircle (32 + 12.56 = 44.56)."
      }
    ],
    "backward": "Compound shapes with a semicircle attached.",
    "forward": "Used in real-world composite shapes."
  },
  {
    "itemId": "d6",
    "order": 6,
    "cluster": "compoundArea",
    "clusterName": "Areas of compound shapes",
    "question": "A rectangle 12 m × 8 m has a semicircle of diameter 8 m attached to one short side. Find the perimeter of the resulting shape (π ≈ 3.14).<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 318 146\" width=\"445\" height=\"204\" style=\"max-width:100%;height:auto\" font-family=\"Arial, Helvetica, sans-serif\"><path d=\"M 108 16 H 258 V 116 H 108 Z\" fill=\"none\" stroke=\"#999\" stroke-width=\"1.2\" stroke-linejoin=\"round\" stroke-dasharray=\"4 3\"/><path d=\"M 108 16 H 258 V 116 H 108 V 116 A 50 50 0 0 1 108 16 Z\" fill=\"none\" stroke=\"#222\" stroke-width=\"2\" stroke-linejoin=\"round\"/><line x1=\"108\" y1=\"16\" x2=\"108\" y2=\"116\" stroke=\"#c0392b\" stroke-width=\"2\" stroke-dasharray=\"5 4\"/><text x=\"115\" y=\"70\" font-size=\"13\" fill=\"#c0392b\" text-anchor=\"start\">d = 8 m</text><text x=\"183\" y=\"136\" font-size=\"13\" fill=\"#222\" text-anchor=\"middle\">12 m</text><text x=\"266\" y=\"70\" font-size=\"13\" fill=\"#222\" text-anchor=\"start\">8 m</text></svg></div>",
    "options": [
      {
        "text": "\\(44.56\\) m",
        "correct": true,
        "feedback": "Correct. Perimeter \\(= 12 + 12 + 8 + \\pi r = 24 + 8 + 3.14 \\times 4 = 44.56\\) m."
      },
      {
        "text": "\\(36.56\\) m",
        "correct": false,
        "feedback": "You forgot the untouched short side (24 + 12.56 = 36.56)."
      },
      {
        "text": "\\(32\\) m",
        "correct": false,
        "feedback": "You forgot the arc (12 + 12 + 8 = 32)."
      },
      {
        "text": "\\(57.12\\) m",
        "correct": false,
        "feedback": "You used the full circumference instead of the semicircle arc (24 + 8 + 25.12 = 57.12)."
      }
    ],
    "backward": "A semicircle attached to one side replaces only THAT side; the opposite short side remains part of the boundary.",
    "forward": "Used whenever composite shapes share a boundary."
  },
  {
    "itemId": "d7",
    "order": 7,
    "cluster": "circumference",
    "clusterName": "Circumference of a circle",
    "question": "Find the length of the curved edge of a semicircle of radius 9 cm (π ≈ 3.14).",
    "options": [
      {
        "text": "\\(28.26\\) cm",
        "correct": true,
        "feedback": "Correct. Half the circumference: \\(\\tfrac{1}{2} \\times 2\\pi r = \\pi r = 3.14 \\times 9 = 28.26\\) cm."
      },
      {
        "text": "\\(56.52\\) cm",
        "correct": false,
        "feedback": "You used the full circumference."
      },
      {
        "text": "\\(18\\) cm",
        "correct": false,
        "feedback": "You gave the diameter."
      },
      {
        "text": "\\(9\\) cm",
        "correct": false,
        "feedback": "You gave the radius."
      }
    ],
    "backward": "The arc is half the full circumference.",
    "forward": "Used whenever a semicircle's curved edge is part of a perimeter."
  },
  {
    "itemId": "d8",
    "order": 8,
    "cluster": "units",
    "clusterName": "Large and small units",
    "question": "A rectangular field is 250 m × 180 m. Find its area in hectares (1 ha = 10000 m²).",
    "options": [
      {
        "text": "\\(4.5\\) ha",
        "correct": true,
        "feedback": "Correct. Area \\(= 250 \\times 180 = 45000\\) m². \\(45000 \\div 10000 = 4.5\\) ha."
      },
      {
        "text": "\\(45\\) ha",
        "correct": false,
        "feedback": "You divided by 1000 instead of 10000."
      },
      {
        "text": "\\(450\\) ha",
        "correct": false,
        "feedback": "You divided by 100."
      },
      {
        "text": "\\(0.45\\) ha",
        "correct": false,
        "feedback": "You divided by 100,000 instead of 10,000."
      }
    ],
    "backward": "Area unit conversion.",
    "forward": "Used in agricultural and land measurement."
  },
  {
    "itemId": "d9",
    "order": 9,
    "cluster": "areaCircle",
    "clusterName": "Area of a circle",
    "question": "A circular pizza has diameter 30 cm. It is cut into 6 equal slices. Find the area of one slice (π ≈ 3.14).<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 180 194\" width=\"252\" height=\"272\" style=\"max-width:100%;height:auto\" font-family=\"Arial, Helvetica, sans-serif\"><path d=\"M 90 82 L 90 12 A 70 70 0 0 1 150.6 47 Z\" fill=\"#f8d7d5\" stroke=\"#222\" stroke-width=\"0\" stroke-linejoin=\"round\"/><circle cx=\"90\" cy=\"82\" r=\"70\" fill=\"none\" stroke=\"#222\" stroke-width=\"2\"/><line x1=\"90\" y1=\"82\" x2=\"90\" y2=\"12\" stroke=\"#222\" stroke-width=\"1.5\"/><line x1=\"90\" y1=\"82\" x2=\"150.6\" y2=\"47\" stroke=\"#222\" stroke-width=\"1.5\"/><line x1=\"90\" y1=\"82\" x2=\"150.6\" y2=\"117\" stroke=\"#222\" stroke-width=\"1.5\"/><line x1=\"90\" y1=\"82\" x2=\"90\" y2=\"152\" stroke=\"#222\" stroke-width=\"1.5\"/><line x1=\"90\" y1=\"82\" x2=\"29.4\" y2=\"117\" stroke=\"#222\" stroke-width=\"1.5\"/><line x1=\"90\" y1=\"82\" x2=\"29.4\" y2=\"47\" stroke=\"#222\" stroke-width=\"1.5\"/><line x1=\"20\" y1=\"166\" x2=\"160\" y2=\"166\" stroke=\"#c0392b\" stroke-width=\"1.4\"/><line x1=\"20\" y1=\"161\" x2=\"20\" y2=\"171\" stroke=\"#c0392b\" stroke-width=\"1.4\"/><line x1=\"160\" y1=\"161\" x2=\"160\" y2=\"171\" stroke=\"#c0392b\" stroke-width=\"1.4\"/><text x=\"90\" y=\"184\" font-size=\"13\" fill=\"#c0392b\" text-anchor=\"middle\">d = 30 cm</text></svg></div>",
    "options": [
      {
        "text": "\\(117.75\\) cm²",
        "correct": true,
        "feedback": "Correct. \\(r = 15\\). Whole area \\(= 3.14 \\times 225 = 706.5\\). One slice \\(= 706.5 \\div 6 = 117.75\\) cm²."
      },
      {
        "text": "\\(706.5\\) cm²",
        "correct": false,
        "feedback": "You gave the whole pizza."
      },
      {
        "text": "\\(353.25\\) cm²",
        "correct": false,
        "feedback": "You halved the pizza instead of dividing by 6."
      },
      {
        "text": "\\(58.875\\) cm²",
        "correct": false,
        "feedback": "You divided by 12 instead of 6."
      }
    ],
    "backward": "Fraction of a circle.",
    "forward": "Used whenever a circle is split into equal parts."
  },
  {
    "itemId": "d10",
    "order": 10,
    "cluster": "realContext",
    "clusterName": "Perimeter and area in real contexts",
    "question": "A rectangular room is 4.5 m × 3.2 m. Carpet costs £18.50 per m². Find the total cost.",
    "options": [
      {
        "text": "\\(£266.40\\)",
        "correct": true,
        "feedback": "Correct. Area \\(= 4.5 \\times 3.2 = 14.4\\) m². Cost \\(= 14.4 \\times 18.50 = £266.40\\). (bw: Decimal area × cost per unit.)"
      },
      {
        "text": "\\(£296.00\\)",
        "correct": false,
        "feedback": "You used 16 m² (rounding error)."
      },
      {
        "text": "\\(£26.64\\)",
        "correct": false,
        "feedback": "You multiplied by £1.85 instead of £18.50."
      },
      {
        "text": "\\(£2664.00\\)",
        "correct": false,
        "feedback": "You multiplied by £185 instead of £18.50."
      }
    ]
  },
  {
    "itemId": "d11",
    "order": 11,
    "cluster": "compoundArea",
    "clusterName": "Areas of compound shapes",
    "question": "A square has side 10 cm. A circle of diameter 10 cm is cut out of the centre. Find the remaining area (π ≈ 3.14).",
    "options": [
      {
        "text": "\\(21.5\\) cm²",
        "correct": true,
        "feedback": "Correct. Square \\(= 100\\). Circle \\(= 3.14 \\times 25 = 78.5\\). Remaining \\(= 100 - 78.5 = 21.5\\) cm²."
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
    ],
    "backward": "Subtraction of a circle from a square.",
    "forward": "Used in any cut-out shape."
  },
  {
    "itemId": "d12",
    "order": 12,
    "cluster": "compoundArea",
    "clusterName": "Areas of compound shapes",
    "question": "A circular track has an inner radius of 20 m and an outer radius of 22 m. Find the area of the track (π ≈ 3.14).<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 260 196\" width=\"364\" height=\"274\" style=\"max-width:100%;height:auto\" font-family=\"Arial, Helvetica, sans-serif\"><circle cx=\"98\" cy=\"96\" r=\"82\" fill=\"#f8d7d5\" stroke=\"#222\" stroke-width=\"2\"/><circle cx=\"98\" cy=\"96\" r=\"74.5\" fill=\"#fff\" stroke=\"#222\" stroke-width=\"2\"/><line x1=\"98\" y1=\"96\" x2=\"23.5\" y2=\"96\" stroke=\"#c0392b\" stroke-width=\"1.8\"/><text x=\"60.7\" y=\"88\" font-size=\"11\" fill=\"#c0392b\" text-anchor=\"middle\">r = 20 m</text><line x1=\"98\" y1=\"96\" x2=\"156\" y2=\"154\" stroke=\"#1f6fb2\" stroke-width=\"1.8\"/><circle cx=\"98\" cy=\"96\" r=\"2.5\" fill=\"#222\"/><text x=\"165\" y=\"169\" font-size=\"12\" fill=\"#1f6fb2\" text-anchor=\"start\">R = 22 m</text></svg></div>",
    "options": [
      {
        "text": "\\(263.76\\) m²",
        "correct": true,
        "feedback": "Correct. Area \\(= \\pi(22^2 - 20^2) = 3.14 \\times (484 - 400) = 3.14 \\times 84 = 263.76\\) m²."
      },
      {
        "text": "\\(2775.76\\) m²",
        "correct": false,
        "feedback": "You added the squares (\\(484 + 400 = 884\\)) instead of subtracting."
      },
      {
        "text": "\\(1256\\) m²",
        "correct": false,
        "feedback": "You gave only the inner circle's area."
      },
      {
        "text": "\\(26.376\\) m²",
        "correct": false,
        "feedback": "You divided by 10 somewhere."
      }
    ],
    "backward": "Difference of two circle areas.",
    "forward": "Used for tracks, rings, and annuli."
  },
  {
    "itemId": "d13",
    "order": 13,
    "cluster": "realContext",
    "clusterName": "Perimeter and area in real contexts",
    "question": "A bicycle wheel has diameter 60 cm. How many complete rotations does it make in 1 km? (π ≈ 3.14)",
    "options": [
      {
        "text": "\\(530\\)",
        "correct": true,
        "feedback": "Correct. Circumference \\(= 3.14 \\times 60 = 188.4\\) cm. \\(1\\) km \\(= 100000\\) cm. \\(100000 \\div 188.4 = 530.79\\), so \\(530\\) complete rotations."
      },
      {
        "text": "\\(531\\)",
        "correct": false,
        "feedback": "You rounded up — the question asks for complete rotations."
      },
      {
        "text": "\\(53\\)",
        "correct": false,
        "feedback": "You misplaced the decimal in the division."
      },
      {
        "text": "\\(188\\)",
        "correct": false,
        "feedback": "You gave the circumference (188.4 cm), not the number of rotations."
      }
    ],
    "backward": "Distance ÷ circumference, then round down for complete rotations.",
    "forward": "Used in wheel and gear problems."
  },
  {
    "itemId": "d14",
    "order": 14,
    "cluster": "units",
    "clusterName": "Large and small units",
    "question": "Convert 0.5 m³ to cm³.",
    "options": [
      {
        "text": "\\(500000\\) cm³",
        "correct": true,
        "feedback": "Correct. \\(1\\) m³ \\(= 1000000\\) cm³. \\(0.5 \\times 1000000 = 500000\\) cm³."
      },
      {
        "text": "\\(5000\\) cm³",
        "correct": false,
        "feedback": "You used \\(10000\\) as the conversion."
      },
      {
        "text": "\\(50000\\) cm³",
        "correct": false,
        "feedback": "You used \\(100000\\) as the conversion."
      },
      {
        "text": "\\(5000000\\) cm³",
        "correct": false,
        "feedback": "You used \\(10000000\\) as the conversion."
      }
    ],
    "backward": "Volume units scale by the cube of the length factor.",
    "forward": "Used whenever volumes need converting."
  },
  {
    "itemId": "d15",
    "order": 15,
    "cluster": "areaCircle",
    "clusterName": "Area of a circle",
    "question": "A circle has area 78.5 cm². Find its diameter (π ≈ 3.14).",
    "options": [
      {
        "text": "\\(10\\) cm",
        "correct": true,
        "feedback": "Correct. \\(r^2 = 78.5 \\div 3.14 = 25\\), \\(r = 5\\), \\(d = 10\\) cm."
      },
      {
        "text": "\\(5\\) cm",
        "correct": false,
        "feedback": "You gave the radius."
      },
      {
        "text": "\\(25\\) cm",
        "correct": false,
        "feedback": "You gave \\(r^2\\)."
      },
      {
        "text": "\\(20\\) cm",
        "correct": false,
        "feedback": "You doubled the diameter (2 × 10 = 20)."
      }
    ],
    "backward": "Rearranging the area formula, then doubling.",
    "forward": "Used whenever diameter is required from area."
  },
  {
    "itemId": "d16",
    "order": 16,
    "cluster": "realContext",
    "clusterName": "Perimeter and area in real contexts",
    "question": "A rectangular garden 15 m × 8 m is to be fenced. Fencing costs £9 per metre. A gate 1 m wide costs £45. Find the total cost.",
    "options": [
      {
        "text": "\\(£450\\)",
        "correct": true,
        "feedback": "Correct. Perimeter \\(= 46\\) m. Fencing length \\(= 46 - 1 = 45\\) m. Fencing cost \\(= 45 \\times 9 = £405\\). Total \\(= 405 + 45 = £450\\)."
      },
      {
        "text": "\\(£459\\)",
        "correct": false,
        "feedback": "You used the full 46 m for fencing (didn't subtract the gate)."
      },
      {
        "text": "\\(£405\\)",
        "correct": false,
        "feedback": "You forgot to add the gate cost."
      },
      {
        "text": "\\(£414\\)",
        "correct": false,
        "feedback": "You used the full perimeter for fencing AND forgot the gate cost."
      }
    ],
    "backward": "Perimeter × unit cost, minus gate, plus gate cost.",
    "forward": "Used in any perimeter-based pricing problem."
  },
  {
    "itemId": "d17",
    "order": 17,
    "cluster": "compoundArea",
    "clusterName": "Areas of compound shapes",
    "question": "A shape is a rectangle 14 cm × 10 cm with a semicircle of radius 5 cm attached to each short side. Find its total area (π ≈ 3.14).<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 318 129.3\" width=\"445\" height=\"181\" style=\"max-width:100%;height:auto\" font-family=\"Arial, Helvetica, sans-serif\"><path d=\"M 99.7 16 H 216.3 V 99.3 H 99.7 Z\" fill=\"none\" stroke=\"#999\" stroke-width=\"1.2\" stroke-linejoin=\"round\" stroke-dasharray=\"4 3\"/><path d=\"M 99.7 16 H 216.3 V 16 A 41.7 41.7 0 0 1 216.3 99.3 V 99.3 H 99.7 V 99.3 A 41.7 41.7 0 0 1 99.7 16 Z\" fill=\"none\" stroke=\"#222\" stroke-width=\"2\" stroke-linejoin=\"round\"/><line x1=\"99.7\" y1=\"57.7\" x2=\"70.2\" y2=\"28.2\" stroke=\"#c0392b\" stroke-width=\"2\" stroke-dasharray=\"5 4\"/><circle cx=\"99.7\" cy=\"57.7\" r=\"2.5\" fill=\"#222\"/><text x=\"64.2\" y=\"23.2\" font-size=\"13\" fill=\"#c0392b\" text-anchor=\"end\">r = 5 cm</text><text x=\"158\" y=\"119.3\" font-size=\"13\" fill=\"#222\" text-anchor=\"middle\">14 cm</text><text x=\"208.3\" y=\"61.7\" font-size=\"13\" fill=\"#222\" text-anchor=\"end\">10 cm</text></svg></div>",
    "options": [
      {
        "text": "\\(218.5\\) cm²",
        "correct": true,
        "feedback": "Correct. Rectangle \\(= 140\\). Two semicircles = one full circle of radius 5 \\(= 3.14 \\times 25 = 78.5\\). Total \\(= 218.5\\) cm²."
      },
      {
        "text": "\\(140\\) cm²",
        "correct": false,
        "feedback": "You gave only the rectangle."
      },
      {
        "text": "\\(78.5\\) cm²",
        "correct": false,
        "feedback": "You gave only the semicircles."
      },
      {
        "text": "\\(297\\) cm²",
        "correct": false,
        "feedback": "You counted the semicircles as two full circles (140 + 2 × 78.5 = 297)."
      }
    ],
    "backward": "Two semicircles make one circle.",
    "forward": "Used whenever compound shapes contain semicircles."
  },
  {
    "itemId": "d18",
    "order": 18,
    "cluster": "realContext",
    "clusterName": "Perimeter and area in real contexts",
    "question": "A circular tabletop has radius 2 m. Polishing costs £5 per m². Find the total cost.",
    "options": [
      {
        "text": "\\(£62.80\\)",
        "correct": true,
        "feedback": "Correct. Area \\(= 3.14 \\times 4 = 12.56\\) m². Cost \\(= 12.56 \\times 5 = £62.80\\). (bw: Circle area × cost per unit.)"
      },
      {
        "text": "\\(£6.28\\)",
        "correct": false,
        "feedback": "You divided the correct answer by 10."
      },
      {
        "text": "\\(£628\\)",
        "correct": false,
        "feedback": "You multiplied the correct answer by 10."
      },
      {
        "text": "\\(£31.40\\)",
        "correct": false,
        "feedback": "You halved the correct answer."
      }
    ]
  },
  {
    "itemId": "d19",
    "order": 19,
    "cluster": "circumference",
    "clusterName": "Circumference of a circle",
    "question": "Find the perimeter of a semicircle of diameter 12 cm (including the straight edge) (π ≈ 3.14).",
    "options": [
      {
        "text": "\\(30.84\\) cm",
        "correct": true,
        "feedback": "Correct. Arc \\(= \\pi \\times 6 = 18.84\\) cm. Straight edge \\(= 12\\) cm. Perimeter \\(= 18.84 + 12 = 30.84\\) cm."
      },
      {
        "text": "\\(18.84\\) cm",
        "correct": false,
        "feedback": "You gave only the curved edge."
      },
      {
        "text": "\\(24\\) cm",
        "correct": false,
        "feedback": "You used the diameter as the arc length (12 + 12 = 24)."
      },
      {
        "text": "\\(37.68\\) cm",
        "correct": false,
        "feedback": "You used the full circumference instead of the arc (2πr = 37.68) — but you forgot to add the straight edge."
      }
    ],
    "backward": "Perimeter of a semicircle = curved edge + straight edge.",
    "forward": "Used whenever a semicircle's boundary is required."
  },
  {
    "itemId": "d20",
    "order": 20,
    "cluster": "units",
    "clusterName": "Large and small units",
    "question": "A rectangular plot of land is 3 km × 2 km. Find its area in m².",
    "options": [
      {
        "text": "\\(6000000\\) m²",
        "correct": true,
        "feedback": "Correct. \\(3\\) km \\(= 3000\\) m, \\(2\\) km \\(= 2000\\) m. Area \\(= 3000 \\times 2000 = 6000000\\) m²."
      },
      {
        "text": "\\(60000\\) m²",
        "correct": false,
        "feedback": "You divided by 100 instead of converting properly."
      },
      {
        "text": "\\(6000\\) m²",
        "correct": false,
        "feedback": "You multiplied by 1000 only once."
      },
      {
        "text": "\\(600000\\) m²",
        "correct": false,
        "feedback": "You lost a factor of 10 in the multiplication."
      }
    ],
    "backward": "Convert length units before computing area.",
    "forward": "Used whenever large areas need converting."
  },
  {
    "itemId": "d21",
    "order": 21,
    "cluster": "areaCircle",
    "clusterName": "Area of a circle",
    "question": "A circular pond has circumference 25.12 m. Find its area (π ≈ 3.14).",
    "options": [
      {
        "text": "\\(50.24\\) m²",
        "correct": true,
        "feedback": "Correct. \\(r = 25.12 \\div 6.28 = 4\\) m. Area \\(= 3.14 \\times 16 = 50.24\\) m²."
      },
      {
        "text": "\\(25.12\\) m²",
        "correct": false,
        "feedback": "You gave the circumference."
      },
      {
        "text": "\\(8\\) m²",
        "correct": false,
        "feedback": "You gave the diameter."
      },
      {
        "text": "\\(12.56\\) m²",
        "correct": false,
        "feedback": "You used \\(\\pi r\\)."
      }
    ],
    "backward": "Rearranging the circumference formula.",
    "forward": "Used whenever area must be found from circumference."
  },
  {
    "itemId": "d22",
    "order": 22,
    "cluster": "realContext",
    "clusterName": "Perimeter and area in real contexts",
    "question": "A rectangular path is 12 m × 5 m. It is tiled with square tiles of side 20 cm. How many tiles are needed?",
    "options": [
      {
        "text": "\\(1500\\)",
        "correct": true,
        "feedback": "Correct. Path area \\(= 60\\) m². Each tile \\(= 0.2 \\times 0.2 = 0.04\\) m². Tiles \\(= 60 \\div 0.04 = 1500\\)."
      },
      {
        "text": "\\(150\\)",
        "correct": false,
        "feedback": "You divided by 10 somewhere."
      },
      {
        "text": "\\(15000\\)",
        "correct": false,
        "feedback": "You multiplied by 10."
      },
      {
        "text": "\\(300\\)",
        "correct": false,
        "feedback": "You used tile area = 0.2 m² (treated side as area)."
      }
    ],
    "backward": "Divide total area by single-tile area.",
    "forward": "Used whenever flooring requires counting tiles."
  },
  {
    "itemId": "d23",
    "order": 23,
    "cluster": "compoundArea",
    "clusterName": "Areas of compound shapes",
    "question": "A square of side 14 cm has four quarter-circles of radius 7 cm cut from its corners. Find the remaining area (π ≈ 3.14).<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 226 206\" width=\"316\" height=\"288\" style=\"max-width:100%;height:auto\" font-family=\"Arial, Helvetica, sans-serif\"><path d=\"M 58 26 H 208 V 176 H 58 Z\" fill=\"none\" stroke=\"#999\" stroke-width=\"1.2\" stroke-linejoin=\"round\" stroke-dasharray=\"4 3\"/><path d=\"M 133 26 H 133 A 75 75 0 0 0 208 101 V 101 A 75 75 0 0 0 133 176 H 133 A 75 75 0 0 0 58 101 V 101 A 75 75 0 0 0 133 26 Z\" fill=\"#f8d7d5\" stroke=\"#222\" stroke-width=\"2\" stroke-linejoin=\"round\"/><line x1=\"58\" y1=\"26\" x2=\"111\" y2=\"79\" stroke=\"#c0392b\" stroke-width=\"1.6\"/><circle cx=\"58\" cy=\"26\" r=\"2.5\" fill=\"#222\"/><text x=\"58\" y=\"17\" font-size=\"12\" fill=\"#c0392b\" text-anchor=\"start\">r = 7 cm</text><text x=\"133\" y=\"196\" font-size=\"13\" fill=\"#222\" text-anchor=\"middle\">14 cm</text><text x=\"50\" y=\"105\" font-size=\"13\" fill=\"#222\" text-anchor=\"end\">14 cm</text></svg></div>",
    "options": [
      {
        "text": "\\(42.14\\) cm²",
        "correct": true,
        "feedback": "Correct. Square \\(= 196\\). Four quarter-circles \\(=\\) one full circle of radius 7 \\(= 3.14 \\times 49 = 153.86\\). Remaining \\(= 196 - 153.86 = 42.14\\) cm²."
      },
      {
        "text": "\\(196\\) cm²",
        "correct": false,
        "feedback": "You gave only the square."
      },
      {
        "text": "\\(153.86\\) cm²",
        "correct": false,
        "feedback": "You gave only the circle."
      },
      {
        "text": "\\(349.86\\) cm²",
        "correct": false,
        "feedback": "You added instead of subtracting."
      }
    ],
    "backward": "Four quarters make one full circle.",
    "forward": "Used whenever a shape has multiple equal arcs."
  },
  {
    "itemId": "d24",
    "order": 24,
    "cluster": "compoundArea",
    "clusterName": "Areas of compound shapes",
    "question": "A circular garden has radius 6 m. A square paving of side 4 m sits at its centre. Find the area of grass (π ≈ 3.14).<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 190 178\" width=\"266\" height=\"249\" style=\"max-width:100%;height:auto\" font-family=\"Arial, Helvetica, sans-serif\"><circle cx=\"95\" cy=\"88\" r=\"78\" fill=\"#f8d7d5\" stroke=\"#222\" stroke-width=\"2\"/><path d=\"M 69 62 H 121 V 114 H 69 Z\" fill=\"#fff\" stroke=\"#222\" stroke-width=\"2\" stroke-linejoin=\"round\"/><text x=\"95\" y=\"56\" font-size=\"12\" fill=\"#222\" text-anchor=\"middle\">4 m</text><line x1=\"95\" y1=\"88\" x2=\"95\" y2=\"166\" stroke=\"#c0392b\" stroke-width=\"2\" stroke-dasharray=\"5 4\"/><circle cx=\"95\" cy=\"88\" r=\"2.5\" fill=\"#222\"/><text x=\"102\" y=\"144\" font-size=\"12\" fill=\"#c0392b\" text-anchor=\"start\">R = 6 m</text></svg></div>",
    "options": [
      {
        "text": "\\(97.04\\) m²",
        "correct": true,
        "feedback": "Correct. Circle \\(= 3.14 \\times 36 = 113.04\\). Square \\(= 16\\). Grass \\(= 113.04 - 16 = 97.04\\) m²."
      },
      {
        "text": "\\(113.04\\) m²",
        "correct": false,
        "feedback": "You gave only the circle."
      },
      {
        "text": "\\(16\\) m²",
        "correct": false,
        "feedback": "You gave only the square."
      },
      {
        "text": "\\(129.04\\) m²",
        "correct": false,
        "feedback": "You added instead of subtracting."
      }
    ],
    "backward": "Area of a circle minus the area of an inscribed shape.",
    "forward": "Used in landscaping and design."
  }
];

const recheckItems = [
  {
    "itemId": "r1",
    "order": 1,
    "cluster": "realContext",
    "clusterName": "Perimeter and area in real contexts",
    "question": "A wheel has diameter 56 cm. How far does it travel in 200 full rotations, in metres? (π ≈ 3.14)",
    "options": [
      {
        "text": "\\(351.68\\) m",
        "correct": true,
        "feedback": "Correct. Circumference \\(= 3.14 \\times 56 = 175.84\\) cm. 200 rotations \\(= 35168\\) cm \\(= 351.68\\) m. (bw: Circumference × rotations.)"
      },
      {
        "text": "\\(35.168\\) m",
        "correct": false,
        "feedback": "You divided by 10 in the unit conversion."
      },
      {
        "text": "\\(3516.8\\) m",
        "correct": false,
        "feedback": "You multiplied by 10 in the unit conversion."
      },
      {
        "text": "\\(175.84\\) m",
        "correct": false,
        "feedback": "You gave the distance for 100 rotations instead of 200."
      }
    ]
  },
  {
    "itemId": "r2",
    "order": 2,
    "cluster": "units",
    "clusterName": "Large and small units",
    "question": "Convert 320 cm² to m².",
    "options": [
      {
        "text": "\\(0.032\\) m²",
        "correct": true,
        "feedback": "Correct. \\(320 \\div 10000 = 0.032\\) m². (bw: Smaller → larger divide by 10000.)"
      },
      {
        "text": "\\(3.2\\) m²",
        "correct": false,
        "feedback": "You divided by 100."
      },
      {
        "text": "\\(32000\\) m²",
        "correct": false,
        "feedback": "You multiplied instead of dividing."
      },
      {
        "text": "\\(0.32\\) m²",
        "correct": false,
        "feedback": "You divided by 1000."
      }
    ]
  },
  {
    "itemId": "r3",
    "order": 3,
    "cluster": "circumference",
    "clusterName": "Circumference of a circle",
    "question": "A circle has area 113.04 cm². Find its circumference (π ≈ 3.14).",
    "options": [
      {
        "text": "\\(37.68\\) cm",
        "correct": true,
        "feedback": "Correct. \\(r^2 = 36\\), \\(r = 6\\). Circumference \\(= 2 \\times 3.14 \\times 6 = 37.68\\) cm. (bw: Rearrange area first.)"
      },
      {
        "text": "\\(18.84\\) cm",
        "correct": false,
        "feedback": "You used \\(\\pi r\\)."
      },
      {
        "text": "\\(12\\) cm",
        "correct": false,
        "feedback": "You gave \\(2r\\)."
      },
      {
        "text": "\\(75.36\\) cm",
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
    "question": "A rectangular garden is 25 m × 18 m with a circular pond of radius 5 m inside. Find the area of the grass (π ≈ 3.14).",
    "options": [
      {
        "text": "\\(371.5\\) m²",
        "correct": true,
        "feedback": "Correct. Rectangle \\(= 450\\). Pond \\(= 3.14 \\times 25 = 78.5\\). Grass \\(= 450 - 78.5 = 371.5\\) m². (bw: Compound shapes with a circle removed.)"
      },
      {
        "text": "\\(528.5\\) m²",
        "correct": false,
        "feedback": "You added the pond instead of subtracting."
      },
      {
        "text": "\\(450\\) m²",
        "correct": false,
        "feedback": "You gave only the rectangle."
      },
      {
        "text": "\\(78.5\\) m²",
        "correct": false,
        "feedback": "You gave only the pond."
      }
    ]
  },
  {
    "itemId": "r5",
    "order": 5,
    "cluster": "compoundArea",
    "clusterName": "Areas of compound shapes",
    "question": "A shape is a rectangle 10 cm × 5 cm with a semicircle of radius 5 cm attached to one long side. Find its total area (π ≈ 3.14).<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 248 176\" width=\"347\" height=\"246\" style=\"max-width:100%;height:auto\" font-family=\"Arial, Helvetica, sans-serif\"><path d=\"M 58 81 H 188 V 146 H 58 Z\" fill=\"none\" stroke=\"#999\" stroke-width=\"1.2\" stroke-linejoin=\"round\" stroke-dasharray=\"4 3\"/><path d=\"M 58 81 H 58 A 65 65 0 0 1 188 81 H 188 V 146 H 58 Z\" fill=\"none\" stroke=\"#222\" stroke-width=\"2\" stroke-linejoin=\"round\"/><line x1=\"123\" y1=\"81\" x2=\"169\" y2=\"35\" stroke=\"#c0392b\" stroke-width=\"2\" stroke-dasharray=\"5 4\"/><circle cx=\"123\" cy=\"81\" r=\"2.5\" fill=\"#222\"/><text x=\"175\" y=\"30\" font-size=\"13\" fill=\"#c0392b\" text-anchor=\"start\">r = 5 cm</text><text x=\"123\" y=\"166\" font-size=\"13\" fill=\"#222\" text-anchor=\"middle\">10 cm</text><text x=\"50\" y=\"117.5\" font-size=\"13\" fill=\"#222\" text-anchor=\"end\">5 cm</text></svg></div>",
    "options": [
      {
        "text": "\\(89.25\\) cm²",
        "correct": true,
        "feedback": "Correct. Rectangle \\(= 50\\). Semicircle \\(= \\tfrac{1}{2} \\times 3.14 \\times 25 = 39.25\\). Total \\(= 89.25\\) cm². (bw: Compound shapes with a semicircle attached.)"
      },
      {
        "text": "\\(50\\) cm²",
        "correct": false,
        "feedback": "You gave only the rectangle."
      },
      {
        "text": "\\(39.25\\) cm²",
        "correct": false,
        "feedback": "You gave only the semicircle."
      },
      {
        "text": "\\(128.5\\) cm²",
        "correct": false,
        "feedback": "You used the full circle instead of the semicircle."
      }
    ]
  },
  {
    "itemId": "r6",
    "order": 6,
    "cluster": "compoundArea",
    "clusterName": "Areas of compound shapes",
    "question": "A rectangle 10 m × 6 m has a semicircle of diameter 6 m attached to one short side. Find the perimeter of the resulting shape (π ≈ 3.14).<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 318 138.3\" width=\"445\" height=\"194\" style=\"max-width:100%;height:auto\" font-family=\"Arial, Helvetica, sans-serif\"><path d=\"M 104.2 16 H 258 V 108.3 H 104.2 Z\" fill=\"none\" stroke=\"#999\" stroke-width=\"1.2\" stroke-linejoin=\"round\" stroke-dasharray=\"4 3\"/><path d=\"M 104.2 16 H 258 V 108.3 H 104.2 V 108.3 A 46.2 46.2 0 0 1 104.2 16 Z\" fill=\"none\" stroke=\"#222\" stroke-width=\"2\" stroke-linejoin=\"round\"/><line x1=\"104.2\" y1=\"16\" x2=\"104.2\" y2=\"108.3\" stroke=\"#c0392b\" stroke-width=\"2\" stroke-dasharray=\"5 4\"/><text x=\"111.2\" y=\"66.2\" font-size=\"13\" fill=\"#c0392b\" text-anchor=\"start\">d = 6 m</text><text x=\"181.1\" y=\"128.3\" font-size=\"13\" fill=\"#222\" text-anchor=\"middle\">10 m</text><text x=\"266\" y=\"66.2\" font-size=\"13\" fill=\"#222\" text-anchor=\"start\">6 m</text></svg></div>",
    "options": [
      {
        "text": "\\(35.42\\) m",
        "correct": true,
        "feedback": "Correct. Perimeter \\(= 10 + 10 + 6 + \\pi r = 20 + 6 + 3.14 \\times 3 = 35.42\\) m. (bw: The semicircle replaces only one short side; the opposite short side remains part of the boundary.)"
      },
      {
        "text": "\\(29.42\\) m",
        "correct": false,
        "feedback": "You forgot the untouched short side (20 + 9.42 = 29.42)."
      },
      {
        "text": "\\(26\\) m",
        "correct": false,
        "feedback": "You forgot the arc (10 + 10 + 6 = 26)."
      },
      {
        "text": "\\(44.84\\) m",
        "correct": false,
        "feedback": "You used the full circumference instead of the semicircle arc (20 + 6 + 18.84 = 44.84)."
      }
    ]
  },
  {
    "itemId": "r7",
    "order": 7,
    "cluster": "circumference",
    "clusterName": "Circumference of a circle",
    "question": "Find the length of the curved edge of a semicircle of radius 12 cm (π ≈ 3.14).",
    "options": [
      {
        "text": "\\(37.68\\) cm",
        "correct": true,
        "feedback": "Correct. Arc \\(= \\pi r = 3.14 \\times 12 = 37.68\\) cm. (bw: Half the circumference.)"
      },
      {
        "text": "\\(75.36\\) cm",
        "correct": false,
        "feedback": "You used the full circumference."
      },
      {
        "text": "\\(24\\) cm",
        "correct": false,
        "feedback": "You gave the diameter."
      },
      {
        "text": "\\(12\\) cm",
        "correct": false,
        "feedback": "You gave the radius."
      }
    ]
  },
  {
    "itemId": "r8",
    "order": 8,
    "cluster": "units",
    "clusterName": "Large and small units",
    "question": "A rectangular field is 400 m × 250 m. Find its area in hectares (1 ha = 10000 m²).",
    "options": [
      {
        "text": "\\(10\\) ha",
        "correct": true,
        "feedback": "Correct. Area \\(= 400 \\times 250 = 100000\\) m². \\(100000 \\div 10000 = 10\\) ha. (bw: Area unit conversion.)"
      },
      {
        "text": "\\(100\\) ha",
        "correct": false,
        "feedback": "You divided by 1000."
      },
      {
        "text": "\\(1\\) ha",
        "correct": false,
        "feedback": "You divided by 100000."
      },
      {
        "text": "\\(1000\\) ha",
        "correct": false,
        "feedback": "You divided by 100."
      }
    ]
  },
  {
    "itemId": "r9",
    "order": 9,
    "cluster": "areaCircle",
    "clusterName": "Area of a circle",
    "question": "A circular pizza has diameter 40 cm. It is cut into 8 equal slices. Find the area of one slice (π ≈ 3.14).",
    "options": [
      {
        "text": "\\(157\\) cm²",
        "correct": true,
        "feedback": "Correct. \\(r = 20\\). Whole \\(= 3.14 \\times 400 = 1256\\). One slice \\(= 1256 \\div 8 = 157\\) cm². (bw: Fraction of a circle.)"
      },
      {
        "text": "\\(1256\\) cm²",
        "correct": false,
        "feedback": "You gave the whole pizza."
      },
      {
        "text": "\\(628\\) cm²",
        "correct": false,
        "feedback": "You halved the pizza instead of dividing by 8."
      },
      {
        "text": "\\(314\\) cm²",
        "correct": false,
        "feedback": "You divided by 4 instead of 8."
      }
    ]
  },
  {
    "itemId": "r10",
    "order": 10,
    "cluster": "realContext",
    "clusterName": "Perimeter and area in real contexts",
    "question": "A rectangular room is 3.5 m × 4 m. Carpet costs £22 per m². Find the total cost.",
    "options": [
      {
        "text": "\\(£308\\)",
        "correct": true,
        "feedback": "Correct. Area \\(= 14\\) m². Cost \\(= 14 \\times 22 = £308\\). (bw: Area × cost per unit.)"
      },
      {
        "text": "\\(£30.80\\)",
        "correct": false,
        "feedback": "You divided by 10."
      },
      {
        "text": "\\(£3080\\)",
        "correct": false,
        "feedback": "You multiplied by 10."
      },
      {
        "text": "\\(£154\\)",
        "correct": false,
        "feedback": "You halved the correct answer."
      }
    ]
  },
  {
    "itemId": "r11",
    "order": 11,
    "cluster": "compoundArea",
    "clusterName": "Areas of compound shapes",
    "question": "A square has side 8 cm. A circle of diameter 8 cm is cut out of the centre. Find the remaining area (π ≈ 3.14).",
    "options": [
      {
        "text": "\\(13.76\\) cm²",
        "correct": true,
        "feedback": "Correct. Square \\(= 64\\). Circle \\(= 3.14 \\times 16 = 50.24\\). Remaining \\(= 64 - 50.24 = 13.76\\) cm². (bw: Subtraction of a circle from a square.)"
      },
      {
        "text": "\\(64\\) cm²",
        "correct": false,
        "feedback": "You gave only the square."
      },
      {
        "text": "\\(50.24\\) cm²",
        "correct": false,
        "feedback": "You gave only the circle."
      },
      {
        "text": "\\(114.24\\) cm²",
        "correct": false,
        "feedback": "You added instead of subtracting."
      }
    ]
  },
  {
    "itemId": "r12",
    "order": 12,
    "cluster": "compoundArea",
    "clusterName": "Areas of compound shapes",
    "question": "A circular track has an inner radius of 15 m and an outer radius of 17 m. Find the area of the track (π ≈ 3.14).<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 260 196\" width=\"364\" height=\"274\" style=\"max-width:100%;height:auto\" font-family=\"Arial, Helvetica, sans-serif\"><circle cx=\"98\" cy=\"96\" r=\"82\" fill=\"#f8d7d5\" stroke=\"#222\" stroke-width=\"2\"/><circle cx=\"98\" cy=\"96\" r=\"72.4\" fill=\"#fff\" stroke=\"#222\" stroke-width=\"2\"/><line x1=\"98\" y1=\"96\" x2=\"25.6\" y2=\"96\" stroke=\"#c0392b\" stroke-width=\"1.8\"/><text x=\"61.8\" y=\"88\" font-size=\"11\" fill=\"#c0392b\" text-anchor=\"middle\">r = 15 m</text><line x1=\"98\" y1=\"96\" x2=\"156\" y2=\"154\" stroke=\"#1f6fb2\" stroke-width=\"1.8\"/><circle cx=\"98\" cy=\"96\" r=\"2.5\" fill=\"#222\"/><text x=\"165\" y=\"169\" font-size=\"12\" fill=\"#1f6fb2\" text-anchor=\"start\">R = 17 m</text></svg></div>",
    "options": [
      {
        "text": "\\(200.96\\) m²",
        "correct": true,
        "feedback": "Correct. Area \\(= 3.14 \\times (17^2 - 15^2) = 3.14 \\times 64 = 200.96\\) m². (bw: Difference of two circle areas.)"
      },
      {
        "text": "\\(401.92\\) m²",
        "correct": false,
        "feedback": "You doubled the correct answer."
      },
      {
        "text": "\\(706.5\\) m²",
        "correct": false,
        "feedback": "You gave only the inner circle's area (3.14 × 225)."
      },
      {
        "text": "\\(907.46\\) m²",
        "correct": false,
        "feedback": "You gave only the outer circle's area (3.14 × 289)."
      }
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
    title: "Shapes and Measurements — Advanced Core",
    subtitle: "Grade 8 · Level 2 · Advanced Core",
    description: "Chained measurement reasoning — radius from circumference, semicircles and cut-outs, area unit conversions, rotations of wheels, and costing composite floors — warm-up, diagnostic, and spaced recheck.",
    clusterNames: CLUSTER_NAMES,
    gateReviewHTML: "<p>You’ve finished the warm‑up. The next 24 questions are the Advanced Core diagnostic for shapes and measurements. Each question asks you to chain two or more steps — find a radius from a circumference, subtract a circle from a shape, convert units before computing area, or handle a composite figure carefully. Use π ≈ 3.14. Some items include diagrams — read each one carefully.</p>",
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

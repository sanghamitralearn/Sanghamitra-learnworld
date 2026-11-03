// seed/mathSeedCh7ShapesMeasurementsL1.js
//
// Populates math_chapters and math_questions with Grade 8, Chapter 7
// (Shapes and Measurements), Level 1 — converted from the standalone diagnostic
// JSON ch7-shapes-measurements-level-1.json. Diagrams are inlined as SVG HTML
// directly in each question's text (the schema has no separate diagram
// field, and question text is already rendered as raw HTML).
//
// Run with: node seed/mathSeedCh7ShapesMeasurementsL1.js

const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-8";
const GRADE_LABEL = "Grade 8";
const CHAPTER_SLUG = "ch-7-shapes-measurements";
const CHAPTER_NAME = "Shapes and Measurements";
const LEVEL = 1;

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
    "question": "A circle has radius 5 cm. Find its circumference (π ≈ 3.14).<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 190 164\" width=\"266\" height=\"230\" style=\"max-width:100%;height:auto\" font-family=\"Arial, Helvetica, sans-serif\"><circle cx=\"95\" cy=\"82\" r=\"62\" fill=\"none\" stroke=\"#222\" stroke-width=\"2\"/><line x1=\"95\" y1=\"82\" x2=\"157\" y2=\"82\" stroke=\"#c0392b\" stroke-width=\"2\" stroke-dasharray=\"5 4\"/><circle cx=\"95\" cy=\"82\" r=\"2.5\" fill=\"#222\"/><text x=\"124\" y=\"74\" font-size=\"12\" fill=\"#c0392b\" text-anchor=\"middle\">r = 5 cm</text></svg></div>",
    "options": [
      {
        "text": "\\(31.4\\) cm",
        "correct": true,
        "feedback": "Correct. \\(C = 2\\pi r = 2 \\times 3.14 \\times 5 = 31.4\\) cm."
      },
      {
        "text": "\\(15.7\\) cm",
        "correct": false,
        "feedback": "You halved the correct answer (31.4 ÷ 2)."
      },
      {
        "text": "\\(78.5\\) cm",
        "correct": false,
        "feedback": "You used the area formula \\(\\pi r^2\\)."
      },
      {
        "text": "\\(10\\) cm",
        "correct": false,
        "feedback": "You used the diameter (\\(2 \\times 5\\)), not the circumference."
      }
    ],
    "retryHint": "Circumference = \\(2\\pi r\\).",
    "backward": "The circumference is the distance around the circle.",
    "forward": "Used whenever you need the length of a curved edge."
  },
  {
    "itemId": "w2",
    "order": 2,
    "cluster": "areaCircle",
    "clusterName": "Area of a circle",
    "question": "A circle has radius 4 cm. Find its area (π ≈ 3.14).<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 190 164\" width=\"266\" height=\"230\" style=\"max-width:100%;height:auto\" font-family=\"Arial, Helvetica, sans-serif\"><circle cx=\"95\" cy=\"82\" r=\"62\" fill=\"none\" stroke=\"#222\" stroke-width=\"2\"/><line x1=\"95\" y1=\"82\" x2=\"157\" y2=\"82\" stroke=\"#c0392b\" stroke-width=\"2\" stroke-dasharray=\"5 4\"/><circle cx=\"95\" cy=\"82\" r=\"2.5\" fill=\"#222\"/><text x=\"124\" y=\"74\" font-size=\"12\" fill=\"#c0392b\" text-anchor=\"middle\">r = 4 cm</text></svg></div>",
    "options": [
      {
        "text": "\\(50.24\\) cm²",
        "correct": true,
        "feedback": "Correct. \\(A = \\pi r^2 = 3.14 \\times 16 = 50.24\\) cm²."
      },
      {
        "text": "\\(25.12\\) cm²",
        "correct": false,
        "feedback": "You halved the correct answer (50.24 ÷ 2)."
      },
      {
        "text": "\\(12.56\\) cm²",
        "correct": false,
        "feedback": "You used \\(\\pi \\times 4\\) (no squaring)."
      },
      {
        "text": "\\(100.48\\) cm²",
        "correct": false,
        "feedback": "You used \\(2\\pi r^2\\) — doubling was unnecessary."
      }
    ],
    "retryHint": "Area = \\(\\pi r^2\\).",
    "backward": "Area of a circle uses the square of the radius.",
    "forward": "Used whenever you need the space inside a circular region."
  },
  {
    "itemId": "w3",
    "order": 3,
    "cluster": "units",
    "clusterName": "Large and small units",
    "question": "Convert 3.5 m to cm.",
    "options": [
      {
        "text": "\\(350\\) cm",
        "correct": true,
        "feedback": "Correct. \\(1\\) m \\(= 100\\) cm, so \\(3.5 \\times 100 = 350\\) cm."
      },
      {
        "text": "\\(35\\) cm",
        "correct": false,
        "feedback": "You multiplied by 10 instead of 100."
      },
      {
        "text": "\\(3500\\) cm",
        "correct": false,
        "feedback": "You multiplied by 1000."
      },
      {
        "text": "\\(0.035\\) cm",
        "correct": false,
        "feedback": "You divided instead of multiplying."
      }
    ],
    "retryHint": "1 m = 100 cm. Larger → smaller means multiply.",
    "backward": "Larger unit to smaller unit means multiply.",
    "forward": "Used whenever you compare or combine measurements in different units."
  },
  {
    "itemId": "w4",
    "order": 4,
    "cluster": "realContext",
    "clusterName": "Perimeter and area in real contexts",
    "question": "A rectangle is 8 cm long and 5 cm wide. Find its perimeter.<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 246 150.3\" width=\"344\" height=\"210\" style=\"max-width:100%;height:auto\" font-family=\"Arial, Helvetica, sans-serif\"><path d=\"M 58 14 H 228 V 120.3 H 58 Z\" fill=\"none\" stroke=\"#222\" stroke-width=\"2\" stroke-linejoin=\"round\"/><text x=\"143\" y=\"140.3\" font-size=\"13\" fill=\"#222\" text-anchor=\"middle\">8 cm</text><text x=\"50\" y=\"71.1\" font-size=\"13\" fill=\"#222\" text-anchor=\"end\">5 cm</text></svg></div>",
    "options": [
      {
        "text": "\\(26\\) cm",
        "correct": true,
        "feedback": "Correct. \\(P = 2(8 + 5) = 2 \\times 13 = 26\\) cm."
      },
      {
        "text": "\\(13\\) cm",
        "correct": false,
        "feedback": "You gave the semi-perimeter (\\(8 + 5 = 13\\))."
      },
      {
        "text": "\\(40\\) cm",
        "correct": false,
        "feedback": "You gave the area (\\(8 \\times 5 = 40\\))."
      },
      {
        "text": "\\(80\\) cm",
        "correct": false,
        "feedback": "You doubled the area."
      }
    ],
    "retryHint": "Perimeter = \\(2 \\times (\\text{length} + \\text{width})\\).",
    "backward": "Perimeter is the distance around the rectangle.",
    "forward": "Used whenever you need total length of the boundary."
  },
  {
    "itemId": "w5",
    "order": 5,
    "cluster": "circumference",
    "clusterName": "Circumference of a circle",
    "question": "A circle has diameter 10 cm. Find its circumference (π ≈ 3.14).<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 190 164\" width=\"266\" height=\"230\" style=\"max-width:100%;height:auto\" font-family=\"Arial, Helvetica, sans-serif\"><circle cx=\"95\" cy=\"82\" r=\"62\" fill=\"none\" stroke=\"#222\" stroke-width=\"2\"/><line x1=\"33\" y1=\"82\" x2=\"157\" y2=\"82\" stroke=\"#c0392b\" stroke-width=\"2\" stroke-dasharray=\"5 4\"/><circle cx=\"95\" cy=\"82\" r=\"2.5\" fill=\"#222\"/><text x=\"95\" y=\"74\" font-size=\"13\" fill=\"#c0392b\" text-anchor=\"middle\">d = 10 cm</text></svg></div>",
    "options": [
      {
        "text": "\\(31.4\\) cm",
        "correct": true,
        "feedback": "Correct. \\(C = \\pi d = 3.14 \\times 10 = 31.4\\) cm."
      },
      {
        "text": "\\(15.7\\) cm",
        "correct": false,
        "feedback": "You halved the correct answer."
      },
      {
        "text": "\\(78.5\\) cm",
        "correct": false,
        "feedback": "You used the area formula with \\(r = 5\\)."
      },
      {
        "text": "\\(62.8\\) cm",
        "correct": false,
        "feedback": "You used \\(2\\pi d\\) — doubling was unnecessary."
      }
    ],
    "retryHint": "Circumference = \\(\\pi d\\).",
    "backward": "Circumference from diameter is a single multiplication.",
    "forward": "Used whenever the diameter is given instead of the radius."
  },
  {
    "itemId": "w6",
    "order": 6,
    "cluster": "areaCircle",
    "clusterName": "Area of a circle",
    "question": "A circle has diameter 10 cm. Find its area (π ≈ 3.14).<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 190 164\" width=\"266\" height=\"230\" style=\"max-width:100%;height:auto\" font-family=\"Arial, Helvetica, sans-serif\"><circle cx=\"95\" cy=\"82\" r=\"62\" fill=\"none\" stroke=\"#222\" stroke-width=\"2\"/><line x1=\"33\" y1=\"82\" x2=\"157\" y2=\"82\" stroke=\"#c0392b\" stroke-width=\"2\" stroke-dasharray=\"5 4\"/><circle cx=\"95\" cy=\"82\" r=\"2.5\" fill=\"#222\"/><text x=\"95\" y=\"74\" font-size=\"13\" fill=\"#c0392b\" text-anchor=\"middle\">d = 10 cm</text></svg></div>",
    "options": [
      {
        "text": "\\(78.5\\) cm²",
        "correct": true,
        "feedback": "Correct. Radius = \\(10 \\div 2 = 5\\) cm. \\(A = 3.14 \\times 5^2 = 78.5\\) cm²."
      },
      {
        "text": "\\(314\\) cm²",
        "correct": false,
        "feedback": "You used \\(10^2\\) instead of \\(5^2\\)."
      },
      {
        "text": "\\(31.4\\) cm²",
        "correct": false,
        "feedback": "You used the circumference formula with the diameter."
      },
      {
        "text": "\\(15.7\\) cm²",
        "correct": false,
        "feedback": "You used \\(\\pi r\\) (with \\(r = 5\\)) instead of \\(\\pi r^2\\)."
      }
    ],
    "retryHint": "Halve the diameter first, then use \\(A = \\pi r^2\\).",
    "backward": "Always convert diameter to radius before finding area.",
    "forward": "Used whenever the diameter is given but area is needed."
  },
  {
    "itemId": "w7",
    "order": 7,
    "cluster": "compoundArea",
    "clusterName": "Areas of compound shapes",
    "question": "An L-shaped figure is made of two rectangles: 6 cm × 4 cm and 3 cm × 2 cm. Find the total area.<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 298 140.4\" width=\"417\" height=\"197\" style=\"max-width:100%;height:auto\" font-family=\"Arial, Helvetica, sans-serif\"><path d=\"M 58 26 H 184.7 V 68.2 H 248 V 110.4 H 58 Z\" fill=\"none\" stroke=\"#222\" stroke-width=\"2\" stroke-linejoin=\"round\"/><line x1=\"184.7\" y1=\"68.2\" x2=\"184.7\" y2=\"110.4\" stroke=\"#999\" stroke-width=\"1.2\" stroke-dasharray=\"4 3\"/><text x=\"121.3\" y=\"18\" font-size=\"13\" fill=\"#222\" text-anchor=\"middle\">6 cm</text><text x=\"50\" y=\"72.2\" font-size=\"13\" fill=\"#222\" text-anchor=\"end\">4 cm</text><text x=\"216.3\" y=\"130.4\" font-size=\"13\" fill=\"#222\" text-anchor=\"middle\">3 cm</text><text x=\"256\" y=\"93.3\" font-size=\"13\" fill=\"#222\" text-anchor=\"start\">2 cm</text></svg></div>",
    "options": [
      {
        "text": "\\(30\\) cm²",
        "correct": true,
        "feedback": "Correct. \\(6 \\times 4 = 24\\) cm² and \\(3 \\times 2 = 6\\) cm². Total \\(= 24 + 6 = 30\\) cm²."
      },
      {
        "text": "\\(24\\) cm²",
        "correct": false,
        "feedback": "You gave only the larger rectangle."
      },
      {
        "text": "\\(36\\) cm²",
        "correct": false,
        "feedback": "You added 24 + 12 (perhaps doubled the smaller rectangle)."
      },
      {
        "text": "\\(18\\) cm²",
        "correct": false,
        "feedback": "You used 6 cm × 3 cm for one rectangle."
      }
    ],
    "retryHint": "Split the shape, find each area, then add.",
    "backward": "Compound shapes split into simple rectangles.",
    "forward": "Used whenever a shape is made of simpler parts."
  },
  {
    "itemId": "w8",
    "order": 8,
    "cluster": "units",
    "clusterName": "Large and small units",
    "question": "A rectangle is 6 cm × 5 cm. Find its area in mm².",
    "options": [
      {
        "text": "\\(3000\\) mm²",
        "correct": true,
        "feedback": "Correct. \\(6\\) cm \\(= 60\\) mm, \\(5\\) cm \\(= 50\\) mm. Area \\(= 60 \\times 50 = 3000\\) mm²."
      },
      {
        "text": "\\(30\\) mm²",
        "correct": false,
        "feedback": "You computed \\(6 \\times 5 = 30\\) and left the answer in cm² instead of converting to mm²."
      },
      {
        "text": "\\(300\\) mm²",
        "correct": false,
        "feedback": "You multiplied \\(6 \\times 5 \\times 10\\)."
      },
      {
        "text": "\\(30000\\) mm²",
        "correct": false,
        "feedback": "You multiplied \\(6 \\times 5 \\times 1000\\)."
      }
    ],
    "retryHint": "Convert both sides to mm first, then multiply.",
    "backward": "Converting units before computing area.",
    "forward": "Used whenever measurements are given in mixed units."
  }
];

const diagnosticItems = [
  {
    "itemId": "d1",
    "order": 1,
    "cluster": "circumference",
    "clusterName": "Circumference of a circle",
    "question": "A circle has radius 7 cm. Find its circumference (π ≈ 3.14).<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 190 164\" width=\"266\" height=\"230\" style=\"max-width:100%;height:auto\" font-family=\"Arial, Helvetica, sans-serif\"><circle cx=\"95\" cy=\"82\" r=\"62\" fill=\"none\" stroke=\"#222\" stroke-width=\"2\"/><line x1=\"95\" y1=\"82\" x2=\"157\" y2=\"82\" stroke=\"#c0392b\" stroke-width=\"2\" stroke-dasharray=\"5 4\"/><circle cx=\"95\" cy=\"82\" r=\"2.5\" fill=\"#222\"/><text x=\"124\" y=\"74\" font-size=\"12\" fill=\"#c0392b\" text-anchor=\"middle\">r = 7 cm</text></svg></div>",
    "options": [
      {
        "text": "\\(43.96\\) cm",
        "correct": true,
        "feedback": "Correct. \\(C = 2\\pi r = 2 \\times 3.14 \\times 7 = 43.96\\) cm."
      },
      {
        "text": "\\(21.98\\) cm",
        "correct": false,
        "feedback": "You used \\(\\pi r\\) instead of \\(2\\pi r\\)."
      },
      {
        "text": "\\(153.86\\) cm",
        "correct": false,
        "feedback": "You used the area formula."
      },
      {
        "text": "\\(14\\) cm",
        "correct": false,
        "feedback": "You gave the diameter."
      }
    ],
    "backward": "Circumference formula.",
    "forward": "Used for curved boundaries."
  },
  {
    "itemId": "d2",
    "order": 2,
    "cluster": "units",
    "clusterName": "Large and small units",
    "question": "Convert 4.2 kg to g.",
    "options": [
      {
        "text": "\\(4200\\) g",
        "correct": true,
        "feedback": "Correct. \\(1\\) kg \\(= 1000\\) g, so \\(4.2 \\times 1000 = 4200\\) g."
      },
      {
        "text": "\\(420\\) g",
        "correct": false,
        "feedback": "You multiplied by 100."
      },
      {
        "text": "\\(42000\\) g",
        "correct": false,
        "feedback": "You multiplied by 10 000."
      },
      {
        "text": "\\(0.0042\\) g",
        "correct": false,
        "feedback": "You divided instead of multiplying."
      }
    ],
    "backward": "Larger → smaller means multiply.",
    "forward": "Used in recipe and mass problems."
  },
  {
    "itemId": "d3",
    "order": 3,
    "cluster": "areaCircle",
    "clusterName": "Area of a circle",
    "question": "A circle has radius 3 m. Find its area (π ≈ 3.14).<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 190 164\" width=\"266\" height=\"230\" style=\"max-width:100%;height:auto\" font-family=\"Arial, Helvetica, sans-serif\"><circle cx=\"95\" cy=\"82\" r=\"62\" fill=\"none\" stroke=\"#222\" stroke-width=\"2\"/><line x1=\"95\" y1=\"82\" x2=\"157\" y2=\"82\" stroke=\"#c0392b\" stroke-width=\"2\" stroke-dasharray=\"5 4\"/><circle cx=\"95\" cy=\"82\" r=\"2.5\" fill=\"#222\"/><text x=\"124\" y=\"74\" font-size=\"12\" fill=\"#c0392b\" text-anchor=\"middle\">r = 3 m</text></svg></div>",
    "options": [
      {
        "text": "\\(28.26\\) m²",
        "correct": true,
        "feedback": "Correct. \\(A = \\pi r^2 = 3.14 \\times 9 = 28.26\\) m²."
      },
      {
        "text": "\\(18.84\\) m²",
        "correct": false,
        "feedback": "You used the circumference formula."
      },
      {
        "text": "\\(9.42\\) m²",
        "correct": false,
        "feedback": "You used \\(\\pi r\\)."
      },
      {
        "text": "\\(56.52\\) m²",
        "correct": false,
        "feedback": "You used \\(2\\pi r^2\\)."
      }
    ],
    "backward": "Area formula.",
    "forward": "Used for circular surfaces."
  },
  {
    "itemId": "d4",
    "order": 4,
    "cluster": "realContext",
    "clusterName": "Perimeter and area in real contexts",
    "question": "A rectangle is 12 m × 7 m. Find its perimeter.",
    "options": [
      {
        "text": "\\(38\\) m",
        "correct": true,
        "feedback": "Correct. \\(P = 2(12 + 7) = 38\\) m. (bw: Perimeter formula.)"
      },
      {
        "text": "\\(19\\) m",
        "correct": false,
        "feedback": "You gave the semi-perimeter."
      },
      {
        "text": "\\(84\\) m",
        "correct": false,
        "feedback": "You gave the area."
      },
      {
        "text": "\\(26\\) m",
        "correct": false,
        "feedback": "You doubled only one side (12 + 14 = 26)."
      }
    ]
  },
  {
    "itemId": "d5",
    "order": 5,
    "cluster": "compoundArea",
    "clusterName": "Areas of compound shapes",
    "question": "An L-shaped figure consists of rectangles 8 cm × 5 cm and 3 cm × 4 cm. Find its total area.<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 298 142.4\" width=\"417\" height=\"199\" style=\"max-width:100%;height:auto\" font-family=\"Arial, Helvetica, sans-serif\"><path d=\"M 58 26 H 196.2 V 43.3 H 248 V 112.4 H 58 Z\" fill=\"none\" stroke=\"#222\" stroke-width=\"2\" stroke-linejoin=\"round\"/><line x1=\"196.2\" y1=\"43.3\" x2=\"196.2\" y2=\"112.4\" stroke=\"#999\" stroke-width=\"1.2\" stroke-dasharray=\"4 3\"/><text x=\"127.1\" y=\"18\" font-size=\"13\" fill=\"#222\" text-anchor=\"middle\">8 cm</text><text x=\"50\" y=\"73.2\" font-size=\"13\" fill=\"#222\" text-anchor=\"end\">5 cm</text><text x=\"222.1\" y=\"132.4\" font-size=\"13\" fill=\"#222\" text-anchor=\"middle\">3 cm</text><text x=\"256\" y=\"81.8\" font-size=\"13\" fill=\"#222\" text-anchor=\"start\">4 cm</text></svg></div>",
    "options": [
      {
        "text": "\\(52\\) cm²",
        "correct": true,
        "feedback": "Correct. \\(8 \\times 5 = 40\\), \\(3 \\times 4 = 12\\). Total \\(= 52\\) cm². (bw: Compound shapes split into simpler parts.)"
      },
      {
        "text": "\\(40\\) cm²",
        "correct": false,
        "feedback": "You gave only the larger rectangle."
      },
      {
        "text": "\\(60\\) cm²",
        "correct": false,
        "feedback": "You used 4 × 5 for the small rectangle instead of 3 × 4."
      },
      {
        "text": "\\(28\\) cm²",
        "correct": false,
        "feedback": "You subtracted the smaller area."
      }
    ]
  },
  {
    "itemId": "d6",
    "order": 6,
    "cluster": "units",
    "clusterName": "Large and small units",
    "question": "A rectangle is 4 m × 3 m. Find its area in cm².",
    "options": [
      {
        "text": "\\(120000\\) cm²",
        "correct": true,
        "feedback": "Correct. \\(4\\) m \\(= 400\\) cm, \\(3\\) m \\(= 300\\) cm. Area \\(= 400 \\times 300 = 120000\\) cm². (bw: Convert units before computing area.)"
      },
      {
        "text": "\\(1200\\) cm²",
        "correct": false,
        "feedback": "You multiplied by 100 (one unit conversion only)."
      },
      {
        "text": "\\(12000\\) cm²",
        "correct": false,
        "feedback": "You multiplied by 1000."
      },
      {
        "text": "\\(1200000\\) cm²",
        "correct": false,
        "feedback": "You multiplied by 100,000 (12 × 100,000 = 1,200,000)."
      }
    ]
  },
  {
    "itemId": "d7",
    "order": 7,
    "cluster": "circumference",
    "clusterName": "Circumference of a circle",
    "question": "A circle has circumference 31.4 cm. Find its radius (π ≈ 3.14).",
    "options": [
      {
        "text": "\\(5\\) cm",
        "correct": true,
        "feedback": "Correct. \\(r = C / (2\\pi) = 31.4 / 6.28 = 5\\) cm. (bw: Rearranging the circumference formula.)"
      },
      {
        "text": "\\(10\\) cm",
        "correct": false,
        "feedback": "You gave the diameter (divided by π instead of 2π)."
      },
      {
        "text": "\\(15.7\\) cm",
        "correct": false,
        "feedback": "You gave \\(C / 2\\)."
      },
      {
        "text": "\\(2.5\\) cm",
        "correct": false,
        "feedback": "You halved the correct answer."
      }
    ]
  },
  {
    "itemId": "d8",
    "order": 8,
    "cluster": "units",
    "clusterName": "Large and small units",
    "question": "Convert 0.25 L to mL.",
    "options": [
      {
        "text": "\\(250\\) mL",
        "correct": true,
        "feedback": "Correct. \\(1\\) L \\(= 1000\\) mL. \\(0.25 \\times 1000 = 250\\) mL. (bw: Larger → smaller means multiply.)"
      },
      {
        "text": "\\(25\\) mL",
        "correct": false,
        "feedback": "You multiplied by 100."
      },
      {
        "text": "\\(2500\\) mL",
        "correct": false,
        "feedback": "You multiplied by 10 000."
      },
      {
        "text": "\\(0.025\\) mL",
        "correct": false,
        "feedback": "You divided instead of multiplying."
      }
    ]
  },
  {
    "itemId": "d9",
    "order": 9,
    "cluster": "areaCircle",
    "clusterName": "Area of a circle",
    "question": "A circle has diameter 8 cm. Find its area (π ≈ 3.14).<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 190 164\" width=\"266\" height=\"230\" style=\"max-width:100%;height:auto\" font-family=\"Arial, Helvetica, sans-serif\"><circle cx=\"95\" cy=\"82\" r=\"62\" fill=\"none\" stroke=\"#222\" stroke-width=\"2\"/><line x1=\"33\" y1=\"82\" x2=\"157\" y2=\"82\" stroke=\"#c0392b\" stroke-width=\"2\" stroke-dasharray=\"5 4\"/><circle cx=\"95\" cy=\"82\" r=\"2.5\" fill=\"#222\"/><text x=\"95\" y=\"74\" font-size=\"13\" fill=\"#c0392b\" text-anchor=\"middle\">d = 8 cm</text></svg></div>",
    "options": [
      {
        "text": "\\(50.24\\) cm²",
        "correct": true,
        "feedback": "Correct. \\(r = 4\\), \\(A = 3.14 \\times 16 = 50.24\\) cm². (bw: Halve the diameter first.)"
      },
      {
        "text": "\\(25.12\\) cm²",
        "correct": false,
        "feedback": "You used the circumference formula (2πr = 25.12) instead of the area formula."
      },
      {
        "text": "\\(200.96\\) cm²",
        "correct": false,
        "feedback": "You used \\(d^2\\) (8² = 64) instead of \\(r^2\\) (4² = 16)."
      },
      {
        "text": "\\(100.48\\) cm²",
        "correct": false,
        "feedback": "You doubled the correct area."
      }
    ]
  },
  {
    "itemId": "d10",
    "order": 10,
    "cluster": "realContext",
    "clusterName": "Perimeter and area in real contexts",
    "question": "A square has side 15 m. Find its perimeter.",
    "options": [
      {
        "text": "\\(60\\) m",
        "correct": true,
        "feedback": "Correct. \\(P = 4 \\times 15 = 60\\) m. (bw: A square has 4 equal sides.)"
      },
      {
        "text": "\\(225\\) m",
        "correct": false,
        "feedback": "You gave the area."
      },
      {
        "text": "\\(30\\) m",
        "correct": false,
        "feedback": "You doubled the side."
      },
      {
        "text": "\\(15\\) m",
        "correct": false,
        "feedback": "You gave the side length."
      }
    ]
  },
  {
    "itemId": "d11",
    "order": 11,
    "cluster": "compoundArea",
    "clusterName": "Areas of compound shapes",
    "question": "A shape is made of a 10 cm × 6 cm rectangle with a triangle (base 10 cm, height 4 cm) on top. Find the total area.<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 238 194\" width=\"333\" height=\"272\" style=\"max-width:100%;height:auto\" font-family=\"Arial, Helvetica, sans-serif\"><line x1=\"58\" y1=\"74\" x2=\"208\" y2=\"74\" stroke=\"#999\" stroke-width=\"1.2\" stroke-dasharray=\"4 3\"/><path d=\"M 58 74 L 133 14 L 208 74 V 164 H 58 Z\" fill=\"none\" stroke=\"#222\" stroke-width=\"2\" stroke-linejoin=\"round\"/><line x1=\"133\" y1=\"14\" x2=\"133\" y2=\"74\" stroke=\"#c0392b\" stroke-width=\"1.6\" stroke-dasharray=\"5 4\"/><text x=\"143\" y=\"18\" font-size=\"12\" fill=\"#c0392b\" text-anchor=\"start\">h = 4 cm</text><text x=\"133\" y=\"184\" font-size=\"13\" fill=\"#222\" text-anchor=\"middle\">10 cm</text><text x=\"50\" y=\"123\" font-size=\"13\" fill=\"#222\" text-anchor=\"end\">6 cm</text></svg></div>",
    "options": [
      {
        "text": "\\(80\\) cm²",
        "correct": true,
        "feedback": "Correct. Rectangle \\(= 60\\). Triangle \\(= \\tfrac{1}{2} \\times 10 \\times 4 = 20\\). Total \\(= 80\\) cm². (bw: Compound shapes.)"
      },
      {
        "text": "\\(60\\) cm²",
        "correct": false,
        "feedback": "You gave only the rectangle."
      },
      {
        "text": "\\(20\\) cm²",
        "correct": false,
        "feedback": "You gave only the triangle."
      },
      {
        "text": "\\(100\\) cm²",
        "correct": false,
        "feedback": "You used the full base × height for the triangle (no \\(\\tfrac{1}{2}\\))."
      }
    ]
  },
  {
    "itemId": "d12",
    "order": 12,
    "cluster": "units",
    "clusterName": "Large and small units",
    "question": "A rectangle is 5 cm × 8 cm. Find its area in mm².",
    "options": [
      {
        "text": "\\(4000\\) mm²",
        "correct": true,
        "feedback": "Correct. \\(50 \\times 80 = 4000\\) mm². (bw: Convert units before computing area.)"
      },
      {
        "text": "\\(400\\) mm²",
        "correct": false,
        "feedback": "You multiplied by 10 (one conversion only)."
      },
      {
        "text": "\\(40\\) mm²",
        "correct": false,
        "feedback": "You left the area in cm² (5 × 8 = 40) instead of converting to mm²."
      },
      {
        "text": "\\(40000\\) mm²",
        "correct": false,
        "feedback": "You multiplied by 1000."
      }
    ]
  },
  {
    "itemId": "d13",
    "order": 13,
    "cluster": "circumference",
    "clusterName": "Circumference of a circle",
    "question": "A circle has diameter 14 cm. Find its circumference (π ≈ 3.14).<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 190 164\" width=\"266\" height=\"230\" style=\"max-width:100%;height:auto\" font-family=\"Arial, Helvetica, sans-serif\"><circle cx=\"95\" cy=\"82\" r=\"62\" fill=\"none\" stroke=\"#222\" stroke-width=\"2\"/><line x1=\"33\" y1=\"82\" x2=\"157\" y2=\"82\" stroke=\"#c0392b\" stroke-width=\"2\" stroke-dasharray=\"5 4\"/><circle cx=\"95\" cy=\"82\" r=\"2.5\" fill=\"#222\"/><text x=\"95\" y=\"74\" font-size=\"13\" fill=\"#c0392b\" text-anchor=\"middle\">d = 14 cm</text></svg></div>",
    "options": [
      {
        "text": "\\(43.96\\) cm",
        "correct": true,
        "feedback": "Correct. \\(C = \\pi d = 3.14 \\times 14 = 43.96\\) cm. (bw: Circumference from diameter.)"
      },
      {
        "text": "\\(21.98\\) cm",
        "correct": false,
        "feedback": "You halved the answer."
      },
      {
        "text": "\\(153.86\\) cm",
        "correct": false,
        "feedback": "You used the area formula with \\(r = 7\\)."
      },
      {
        "text": "\\(87.92\\) cm",
        "correct": false,
        "feedback": "You used \\(2\\pi d\\)."
      }
    ]
  },
  {
    "itemId": "d14",
    "order": 14,
    "cluster": "units",
    "clusterName": "Large and small units",
    "question": "Convert 6500 mm to m.",
    "options": [
      {
        "text": "\\(6.5\\) m",
        "correct": true,
        "feedback": "Correct. \\(1\\) m \\(= 1000\\) mm. \\(6500 \\div 1000 = 6.5\\) m. (bw: Smaller → larger means divide.)"
      },
      {
        "text": "\\(65\\) m",
        "correct": false,
        "feedback": "You divided by 100."
      },
      {
        "text": "\\(650\\) m",
        "correct": false,
        "feedback": "You divided by 10."
      },
      {
        "text": "\\(0.65\\) m",
        "correct": false,
        "feedback": "You divided by 10 000."
      }
    ]
  },
  {
    "itemId": "d15",
    "order": 15,
    "cluster": "areaCircle",
    "clusterName": "Area of a circle",
    "question": "A circle has area \\(78.5\\) cm². Find its radius (π ≈ 3.14).",
    "options": [
      {
        "text": "\\(5\\) cm",
        "correct": true,
        "feedback": "Correct. \\(r^2 = 78.5 \\div 3.14 = 25\\), \\(r = 5\\) cm. (bw: Rearranging the area formula.)"
      },
      {
        "text": "\\(10\\) cm",
        "correct": false,
        "feedback": "You gave \\(2r\\) (diameter)."
      },
      {
        "text": "\\(25\\) cm",
        "correct": false,
        "feedback": "You gave \\(r^2\\), not \\(r\\)."
      },
      {
        "text": "\\(12.5\\) cm",
        "correct": false,
        "feedback": "You halved 25."
      }
    ]
  },
  {
    "itemId": "d16",
    "order": 16,
    "cluster": "realContext",
    "clusterName": "Perimeter and area in real contexts",
    "question": "A rectangular room is 5 m × 4 m. Carpet costs £12 per m². Find the total cost.",
    "options": [
      {
        "text": "\\(£240\\)",
        "correct": true,
        "feedback": "Correct. Area \\(= 20\\) m². Cost \\(= 20 \\times 12 = £240\\). (bw: Area × cost per unit.)"
      },
      {
        "text": "\\(£108\\)",
        "correct": false,
        "feedback": "You used the semi-perimeter (9 m) instead of the area."
      },
      {
        "text": "\\(£2400\\)",
        "correct": false,
        "feedback": "You multiplied by 120 instead of 12."
      },
      {
        "text": "\\(£20\\)",
        "correct": false,
        "feedback": "You gave the area, not the cost."
      }
    ]
  },
  {
    "itemId": "d17",
    "order": 17,
    "cluster": "compoundArea",
    "clusterName": "Areas of compound shapes",
    "question": "A shape is a rectangle 8 cm × 6 cm with a semicircle of radius 4 cm on top. Find the total area (π ≈ 3.14).<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 222 176\" width=\"311\" height=\"246\" style=\"max-width:100%;height:auto\" font-family=\"Arial, Helvetica, sans-serif\"><path d=\"M 58 68 H 162 V 146 H 58 Z\" fill=\"none\" stroke=\"#999\" stroke-width=\"1.2\" stroke-linejoin=\"round\" stroke-dasharray=\"4 3\"/><path d=\"M 58 68 H 58 A 52 52 0 0 1 162 68 H 162 V 146 H 58 Z\" fill=\"none\" stroke=\"#222\" stroke-width=\"2\" stroke-linejoin=\"round\"/><line x1=\"110\" y1=\"68\" x2=\"146.8\" y2=\"31.2\" stroke=\"#c0392b\" stroke-width=\"2\" stroke-dasharray=\"5 4\"/><circle cx=\"110\" cy=\"68\" r=\"2.5\" fill=\"#222\"/><text x=\"152.8\" y=\"26.2\" font-size=\"13\" fill=\"#c0392b\" text-anchor=\"start\">r = 4 cm</text><text x=\"110\" y=\"166\" font-size=\"13\" fill=\"#222\" text-anchor=\"middle\">8 cm</text><text x=\"50\" y=\"111\" font-size=\"13\" fill=\"#222\" text-anchor=\"end\">6 cm</text></svg></div>",
    "options": [
      {
        "text": "\\(73.12\\) cm²",
        "correct": true,
        "feedback": "Correct. Rectangle \\(= 48\\). Semicircle \\(= \\tfrac{1}{2} \\times 3.14 \\times 16 = 25.12\\). Total \\(= 73.12\\) cm². (bw: Compound shapes with a semicircle.)"
      },
      {
        "text": "\\(48\\) cm²",
        "correct": false,
        "feedback": "You gave only the rectangle."
      },
      {
        "text": "\\(25.12\\) cm²",
        "correct": false,
        "feedback": "You gave only the semicircle."
      },
      {
        "text": "\\(98.24\\) cm²",
        "correct": false,
        "feedback": "You added the full circle instead of the semicircle (48 + 50.24 = 98.24)."
      }
    ]
  },
  {
    "itemId": "d18",
    "order": 18,
    "cluster": "mixed",
    "clusterName": "Mixed measurement problems",
    "question": "A circle has diameter 10 cm. A rectangle is 10 cm × 5 cm. Which has the greater area, and by how much? (π ≈ 3.14)<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 298 136\" width=\"417\" height=\"190\" style=\"max-width:100%;height:auto\" font-family=\"Arial, Helvetica, sans-serif\"><circle cx=\"66\" cy=\"70\" r=\"50\" fill=\"none\" stroke=\"#222\" stroke-width=\"2\"/><line x1=\"16\" y1=\"70\" x2=\"116\" y2=\"70\" stroke=\"#c0392b\" stroke-width=\"2\" stroke-dasharray=\"5 4\"/><text x=\"66\" y=\"62\" font-size=\"12\" fill=\"#c0392b\" text-anchor=\"middle\">d = 10 cm</text><path d=\"M 146 45 H 246 V 95 H 146 Z\" fill=\"none\" stroke=\"#222\" stroke-width=\"2\" stroke-linejoin=\"round\"/><text x=\"196\" y=\"115\" font-size=\"13\" fill=\"#222\" text-anchor=\"middle\">10 cm</text><text x=\"254\" y=\"74\" font-size=\"13\" fill=\"#222\" text-anchor=\"start\">5 cm</text></svg></div>",
    "options": [
      {
        "text": "Circle, by \\(28.5\\) cm²",
        "correct": true,
        "feedback": "Correct. Circle \\(= 3.14 \\times 25 = 78.5\\) cm². Rectangle \\(= 50\\) cm². Difference \\(= 28.5\\), circle larger. (bw: Comparing areas across shapes.)"
      },
      {
        "text": "Rectangle, by \\(78.5\\) cm²",
        "correct": false,
        "feedback": "You reversed the comparison AND used the circle's area instead of the difference."
      },
      {
        "text": "Circle, by \\(78.5\\) cm²",
        "correct": false,
        "feedback": "You gave the circle's area, not the difference."
      },
      {
        "text": "They are equal.",
        "correct": false,
        "feedback": "78.5 ≠ 50, so they're not equal."
      }
    ]
  },
  {
    "itemId": "d19",
    "order": 19,
    "cluster": "realContext",
    "clusterName": "Perimeter and area in real contexts",
    "question": "A wheel has radius 35 cm. How far does it travel in one full rotation? (π ≈ 3.14)<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 190 164\" width=\"266\" height=\"230\" style=\"max-width:100%;height:auto\" font-family=\"Arial, Helvetica, sans-serif\"><circle cx=\"95\" cy=\"82\" r=\"62\" fill=\"none\" stroke=\"#222\" stroke-width=\"2\"/><line x1=\"95\" y1=\"82\" x2=\"157\" y2=\"82\" stroke=\"#c0392b\" stroke-width=\"2\" stroke-dasharray=\"5 4\"/><circle cx=\"95\" cy=\"82\" r=\"2.5\" fill=\"#222\"/><text x=\"124\" y=\"74\" font-size=\"12\" fill=\"#c0392b\" text-anchor=\"middle\">r = 35 cm</text></svg></div>",
    "options": [
      {
        "text": "\\(219.8\\) cm",
        "correct": true,
        "feedback": "Correct. One rotation = circumference \\(= 2\\pi r = 2 \\times 3.14 \\times 35 = 219.8\\) cm. (bw: Circumference in a real context.)"
      },
      {
        "text": "\\(109.9\\) cm",
        "correct": false,
        "feedback": "You gave the semi-circumference."
      },
      {
        "text": "\\(70\\) cm",
        "correct": false,
        "feedback": "You gave the diameter."
      },
      {
        "text": "\\(3846.5\\) cm",
        "correct": false,
        "feedback": "You gave the area."
      }
    ]
  },
  {
    "itemId": "d20",
    "order": 20,
    "cluster": "units",
    "clusterName": "Large and small units",
    "question": "Convert 2.5 m² to cm².",
    "options": [
      {
        "text": "\\(25000\\) cm²",
        "correct": true,
        "feedback": "Correct. \\(1\\) m² \\(= 10000\\) cm². \\(2.5 \\times 10000 = 25000\\) cm². (bw: Area units scale by the square of the length factor.)"
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
    ]
  },
  {
    "itemId": "d21",
    "order": 21,
    "cluster": "areaCircle",
    "clusterName": "Area of a circle",
    "question": "A circle has area \\(314\\) cm². Find its diameter (π ≈ 3.14).",
    "options": [
      {
        "text": "\\(20\\) cm",
        "correct": true,
        "feedback": "Correct. \\(r^2 = 314 \\div 3.14 = 100\\), \\(r = 10\\), \\(d = 20\\) cm. (bw: Rearranging the area formula, then doubling.)"
      },
      {
        "text": "\\(10\\) cm",
        "correct": false,
        "feedback": "You gave \\(r\\)."
      },
      {
        "text": "\\(5\\) cm",
        "correct": false,
        "feedback": "You halved \\(r\\)."
      },
      {
        "text": "\\(40\\) cm",
        "correct": false,
        "feedback": "You doubled \\(r\\) twice."
      }
    ]
  },
  {
    "itemId": "d22",
    "order": 22,
    "cluster": "realContext",
    "clusterName": "Perimeter and area in real contexts",
    "question": "A rectangular field is 25 m × 12 m. Find its area.",
    "options": [
      {
        "text": "\\(300\\) m²",
        "correct": true,
        "feedback": "Correct. \\(25 \\times 12 = 300\\) m². (bw: Area of a rectangle.)"
      },
      {
        "text": "\\(74\\) m²",
        "correct": false,
        "feedback": "You gave the perimeter."
      },
      {
        "text": "\\(150\\) m²",
        "correct": false,
        "feedback": "You halved the correct answer."
      },
      {
        "text": "\\(600\\) m²",
        "correct": false,
        "feedback": "You doubled the correct answer."
      }
    ]
  },
  {
    "itemId": "d23",
    "order": 23,
    "cluster": "compoundArea",
    "clusterName": "Areas of compound shapes",
    "question": "A shape is a rectangle 10 cm × 6 cm with a semicircle of radius 3 cm attached to each short end. Find its total area (π ≈ 3.14).<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 318 121\" width=\"445\" height=\"169\" style=\"max-width:100%;height:auto\" font-family=\"Arial, Helvetica, sans-serif\"><path d=\"M 95.5 16 H 220.5 V 91 H 95.5 Z\" fill=\"none\" stroke=\"#999\" stroke-width=\"1.2\" stroke-linejoin=\"round\" stroke-dasharray=\"4 3\"/><path d=\"M 95.5 16 H 220.5 V 16 A 37.5 37.5 0 0 1 220.5 91 V 91 H 95.5 V 91 A 37.5 37.5 0 0 1 95.5 16 Z\" fill=\"none\" stroke=\"#222\" stroke-width=\"2\" stroke-linejoin=\"round\"/><line x1=\"95.5\" y1=\"53.5\" x2=\"69\" y2=\"27\" stroke=\"#c0392b\" stroke-width=\"2\" stroke-dasharray=\"5 4\"/><circle cx=\"95.5\" cy=\"53.5\" r=\"2.5\" fill=\"#222\"/><text x=\"63\" y=\"22\" font-size=\"13\" fill=\"#c0392b\" text-anchor=\"end\">r = 3 cm</text><text x=\"158\" y=\"111\" font-size=\"13\" fill=\"#222\" text-anchor=\"middle\">10 cm</text><text x=\"212.5\" y=\"57.5\" font-size=\"13\" fill=\"#222\" text-anchor=\"end\">6 cm</text></svg></div>",
    "options": [
      {
        "text": "\\(88.26\\) cm²",
        "correct": true,
        "feedback": "Correct. Rectangle \\(= 60\\). Two semicircles \\(=\\) one full circle of radius 3 \\(= 3.14 \\times 9 = 28.26\\). Total \\(= 88.26\\) cm². (bw: Two semicircles make one circle.)"
      },
      {
        "text": "\\(60\\) cm²",
        "correct": false,
        "feedback": "You gave only the rectangle."
      },
      {
        "text": "\\(28.26\\) cm²",
        "correct": false,
        "feedback": "You gave only the semicircles."
      },
      {
        "text": "\\(116.52\\) cm²",
        "correct": false,
        "feedback": "You counted the semicircles as two full circles."
      }
    ]
  },
  {
    "itemId": "d24",
    "order": 24,
    "cluster": "mixed",
    "clusterName": "Mixed measurement problems",
    "question": "A rectangle is 8 m × 6 m. A diagonal path is drawn across it. How much fencing is needed for the perimeter AND the diagonal?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 229.3 159\" width=\"321\" height=\"223\" style=\"max-width:100%;height:auto\" font-family=\"Arial, Helvetica, sans-serif\"><path d=\"M 58 14 H 211.3 V 129 H 58 Z\" fill=\"none\" stroke=\"#222\" stroke-width=\"2\" stroke-linejoin=\"round\"/><line x1=\"58\" y1=\"14\" x2=\"211.3\" y2=\"129\" stroke=\"#c0392b\" stroke-width=\"2\"/><text x=\"134.7\" y=\"149\" font-size=\"13\" fill=\"#222\" text-anchor=\"middle\">8 m</text><text x=\"50\" y=\"75.5\" font-size=\"13\" fill=\"#222\" text-anchor=\"end\">6 m</text></svg></div>",
    "options": [
      {
        "text": "\\(38\\) m",
        "correct": true,
        "feedback": "Correct. Perimeter \\(= 2(8+6) = 28\\) m. Diagonal \\(= \\sqrt{64+36} = 10\\) m. Total \\(= 38\\) m. (bw: Combining perimeter + Pythagoras.)"
      },
      {
        "text": "\\(28\\) m",
        "correct": false,
        "feedback": "You gave only the perimeter."
      },
      {
        "text": "\\(10\\) m",
        "correct": false,
        "feedback": "You gave only the diagonal."
      },
      {
        "text": "\\(48\\) m",
        "correct": false,
        "feedback": "You used perimeter + 2 diagonals (incorrect)."
      }
    ]
  }
];

const recheckItems = [
  {
    "itemId": "r1",
    "order": 1,
    "cluster": "circumference",
    "clusterName": "Circumference of a circle",
    "question": "A circle has radius 6 cm. Find its circumference (π ≈ 3.14).<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 190 164\" width=\"266\" height=\"230\" style=\"max-width:100%;height:auto\" font-family=\"Arial, Helvetica, sans-serif\"><circle cx=\"95\" cy=\"82\" r=\"62\" fill=\"none\" stroke=\"#222\" stroke-width=\"2\"/><line x1=\"95\" y1=\"82\" x2=\"157\" y2=\"82\" stroke=\"#c0392b\" stroke-width=\"2\" stroke-dasharray=\"5 4\"/><circle cx=\"95\" cy=\"82\" r=\"2.5\" fill=\"#222\"/><text x=\"124\" y=\"74\" font-size=\"12\" fill=\"#c0392b\" text-anchor=\"middle\">r = 6 cm</text></svg></div>",
    "options": [
      {
        "text": "\\(37.68\\) cm",
        "correct": true,
        "feedback": "Correct. \\(C = 2\\pi r = 37.68\\) cm. (bw: Circumference formula.)"
      },
      {
        "text": "\\(18.84\\) cm",
        "correct": false,
        "feedback": "You used \\(\\pi r\\)."
      },
      {
        "text": "\\(113.04\\) cm",
        "correct": false,
        "feedback": "You used the area formula."
      },
      {
        "text": "\\(12\\) cm",
        "correct": false,
        "feedback": "You gave the diameter."
      }
    ]
  },
  {
    "itemId": "r2",
    "order": 2,
    "cluster": "units",
    "clusterName": "Large and small units",
    "question": "Convert 750 g to kg.",
    "options": [
      {
        "text": "\\(0.75\\) kg",
        "correct": true,
        "feedback": "Correct. \\(1\\) kg \\(= 1000\\) g. \\(750 \\div 1000 = 0.75\\) kg. (bw: Smaller → larger means divide.)"
      },
      {
        "text": "\\(7.5\\) kg",
        "correct": false,
        "feedback": "You divided by 100."
      },
      {
        "text": "\\(75\\) kg",
        "correct": false,
        "feedback": "You divided by 10."
      },
      {
        "text": "\\(750000\\) kg",
        "correct": false,
        "feedback": "You multiplied instead of dividing."
      }
    ]
  },
  {
    "itemId": "r3",
    "order": 3,
    "cluster": "areaCircle",
    "clusterName": "Area of a circle",
    "question": "A circle has radius 9 m. Find its area (π ≈ 3.14).<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 190 164\" width=\"266\" height=\"230\" style=\"max-width:100%;height:auto\" font-family=\"Arial, Helvetica, sans-serif\"><circle cx=\"95\" cy=\"82\" r=\"62\" fill=\"none\" stroke=\"#222\" stroke-width=\"2\"/><line x1=\"95\" y1=\"82\" x2=\"157\" y2=\"82\" stroke=\"#c0392b\" stroke-width=\"2\" stroke-dasharray=\"5 4\"/><circle cx=\"95\" cy=\"82\" r=\"2.5\" fill=\"#222\"/><text x=\"124\" y=\"74\" font-size=\"12\" fill=\"#c0392b\" text-anchor=\"middle\">r = 9 m</text></svg></div>",
    "options": [
      {
        "text": "\\(254.34\\) m²",
        "correct": true,
        "feedback": "Correct. \\(A = 3.14 \\times 81 = 254.34\\) m². (bw: Area formula.)"
      },
      {
        "text": "\\(56.52\\) m²",
        "correct": false,
        "feedback": "You used the circumference formula."
      },
      {
        "text": "\\(127.17\\) m²",
        "correct": false,
        "feedback": "You halved the correct answer."
      },
      {
        "text": "\\(81\\) m²",
        "correct": false,
        "feedback": "You gave \\(r^2\\)."
      }
    ]
  },
  {
    "itemId": "r4",
    "order": 4,
    "cluster": "compoundArea",
    "clusterName": "Areas of compound shapes",
    "question": "A shape is a 6 cm × 4 cm rectangle with a triangle (base 6 cm, height 3 cm) on top. Find the total area.<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 216.6 194\" width=\"303\" height=\"272\" style=\"max-width:100%;height:auto\" font-family=\"Arial, Helvetica, sans-serif\"><line x1=\"58\" y1=\"78.3\" x2=\"186.6\" y2=\"78.3\" stroke=\"#999\" stroke-width=\"1.2\" stroke-dasharray=\"4 3\"/><path d=\"M 58 78.3 L 122.3 14 L 186.6 78.3 V 164 H 58 Z\" fill=\"none\" stroke=\"#222\" stroke-width=\"2\" stroke-linejoin=\"round\"/><line x1=\"122.3\" y1=\"14\" x2=\"122.3\" y2=\"78.3\" stroke=\"#c0392b\" stroke-width=\"1.6\" stroke-dasharray=\"5 4\"/><text x=\"132.3\" y=\"18\" font-size=\"12\" fill=\"#c0392b\" text-anchor=\"start\">h = 3 cm</text><text x=\"122.3\" y=\"184\" font-size=\"13\" fill=\"#222\" text-anchor=\"middle\">6 cm</text><text x=\"50\" y=\"125.1\" font-size=\"13\" fill=\"#222\" text-anchor=\"end\">4 cm</text></svg></div>",
    "options": [
      {
        "text": "\\(33\\) cm²",
        "correct": true,
        "feedback": "Correct. Rectangle \\(= 24\\). Triangle \\(= 9\\). Total \\(= 33\\) cm². (bw: Compound shapes.)"
      },
      {
        "text": "\\(24\\) cm²",
        "correct": false,
        "feedback": "You gave only the rectangle."
      },
      {
        "text": "\\(9\\) cm²",
        "correct": false,
        "feedback": "You gave only the triangle."
      },
      {
        "text": "\\(42\\) cm²",
        "correct": false,
        "feedback": "You used \\(6 \\times 7\\) (combined height)."
      }
    ]
  },
  {
    "itemId": "r5",
    "order": 5,
    "cluster": "realContext",
    "clusterName": "Perimeter and area in real contexts",
    "question": "A rectangle is 9 m × 4 m. Find its perimeter.",
    "options": [
      {
        "text": "\\(26\\) m",
        "correct": true,
        "feedback": "Correct. \\(P = 2(9+4) = 26\\) m. (bw: Perimeter formula.)"
      },
      {
        "text": "\\(13\\) m",
        "correct": false,
        "feedback": "You gave the semi-perimeter."
      },
      {
        "text": "\\(36\\) m",
        "correct": false,
        "feedback": "You gave the area."
      },
      {
        "text": "\\(72\\) m",
        "correct": false,
        "feedback": "You doubled the area."
      }
    ]
  },
  {
    "itemId": "r6",
    "order": 6,
    "cluster": "units",
    "clusterName": "Large and small units",
    "question": "A rectangle is 6 cm × 4 cm. Find its area in mm².",
    "options": [
      {
        "text": "\\(2400\\) mm²",
        "correct": true,
        "feedback": "Correct. \\(60 \\times 40 = 2400\\) mm². (bw: Convert units before computing area.)"
      },
      {
        "text": "\\(24\\) mm²",
        "correct": false,
        "feedback": "You kept the cm × cm value."
      },
      {
        "text": "\\(240\\) mm²",
        "correct": false,
        "feedback": "You multiplied by 10."
      },
      {
        "text": "\\(24000\\) mm²",
        "correct": false,
        "feedback": "You multiplied by 1000."
      }
    ]
  },
  {
    "itemId": "r7",
    "order": 7,
    "cluster": "circumference",
    "clusterName": "Circumference of a circle",
    "question": "A circle has circumference 62.8 cm. Find its diameter (π ≈ 3.14).",
    "options": [
      {
        "text": "\\(20\\) cm",
        "correct": true,
        "feedback": "Correct. \\(d = C / \\pi = 62.8 / 3.14 = 20\\) cm. (bw: Rearranging the circumference formula.)"
      },
      {
        "text": "\\(10\\) cm",
        "correct": false,
        "feedback": "You gave the radius."
      },
      {
        "text": "\\(40\\) cm",
        "correct": false,
        "feedback": "You doubled the diameter."
      },
      {
        "text": "\\(62.8\\) cm",
        "correct": false,
        "feedback": "You gave the circumference."
      }
    ]
  },
  {
    "itemId": "r8",
    "order": 8,
    "cluster": "units",
    "clusterName": "Large and small units",
    "question": "Convert 0.08 km to m.",
    "options": [
      {
        "text": "\\(80\\) m",
        "correct": true,
        "feedback": "Correct. \\(1\\) km \\(= 1000\\) m. \\(0.08 \\times 1000 = 80\\) m. (bw: Larger → smaller means multiply.)"
      },
      {
        "text": "\\(800\\) m",
        "correct": false,
        "feedback": "You multiplied by 10 000."
      },
      {
        "text": "\\(8\\) m",
        "correct": false,
        "feedback": "You multiplied by 100."
      },
      {
        "text": "\\(8000\\) m",
        "correct": false,
        "feedback": "You multiplied by 100 000."
      }
    ]
  },
  {
    "itemId": "r9",
    "order": 9,
    "cluster": "areaCircle",
    "clusterName": "Area of a circle",
    "question": "A circle has diameter 12 cm. Find its area (π ≈ 3.14).<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 190 164\" width=\"266\" height=\"230\" style=\"max-width:100%;height:auto\" font-family=\"Arial, Helvetica, sans-serif\"><circle cx=\"95\" cy=\"82\" r=\"62\" fill=\"none\" stroke=\"#222\" stroke-width=\"2\"/><line x1=\"33\" y1=\"82\" x2=\"157\" y2=\"82\" stroke=\"#c0392b\" stroke-width=\"2\" stroke-dasharray=\"5 4\"/><circle cx=\"95\" cy=\"82\" r=\"2.5\" fill=\"#222\"/><text x=\"95\" y=\"74\" font-size=\"13\" fill=\"#c0392b\" text-anchor=\"middle\">d = 12 cm</text></svg></div>",
    "options": [
      {
        "text": "\\(113.04\\) cm²",
        "correct": true,
        "feedback": "Correct. \\(r = 6\\), \\(A = 3.14 \\times 36 = 113.04\\) cm². (bw: Halve the diameter first.)"
      },
      {
        "text": "\\(56.52\\) cm²",
        "correct": false,
        "feedback": "You halved the correct answer."
      },
      {
        "text": "\\(37.68\\) cm²",
        "correct": false,
        "feedback": "You used the circumference formula."
      },
      {
        "text": "\\(452.16\\) cm²",
        "correct": false,
        "feedback": "You used \\(d^2\\) (144) instead of \\(r^2\\) (36)."
      }
    ]
  },
  {
    "itemId": "r10",
    "order": 10,
    "cluster": "compoundArea",
    "clusterName": "Areas of compound shapes",
    "question": "A rectangle 8 cm × 5 cm has a quarter circle of radius 3 cm removed from one corner. Find the remaining area (π ≈ 3.14).<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 246 164.3\" width=\"344\" height=\"230\" style=\"max-width:100%;height:auto\" font-family=\"Arial, Helvetica, sans-serif\"><path d=\"M 164.3 28 H 228 V 91.8\" fill=\"none\" stroke=\"#999\" stroke-width=\"1.2\" stroke-linejoin=\"round\" stroke-dasharray=\"4 3\"/><path d=\"M 58 28 H 164.3 A 63.8 63.8 0 0 0 228 91.8 V 134.3 H 58 Z\" fill=\"none\" stroke=\"#222\" stroke-width=\"2\" stroke-linejoin=\"round\"/><text x=\"196.1\" y=\"20\" font-size=\"12\" fill=\"#c0392b\" text-anchor=\"middle\">r = 3 cm</text><text x=\"143\" y=\"154.3\" font-size=\"13\" fill=\"#222\" text-anchor=\"middle\">8 cm</text><text x=\"50\" y=\"85.1\" font-size=\"13\" fill=\"#222\" text-anchor=\"end\">5 cm</text></svg></div>",
    "options": [
      {
        "text": "\\(32.935\\) cm²",
        "correct": true,
        "feedback": "Correct. Rectangle \\(= 40\\). Quarter circle \\(= \\tfrac{1}{4} \\times 3.14 \\times 9 = 7.065\\). Remaining \\(= 32.935\\) cm². (bw: Compound shapes with a subtraction.)"
      },
      {
        "text": "\\(40\\) cm²",
        "correct": false,
        "feedback": "You gave only the rectangle."
      },
      {
        "text": "\\(7.065\\) cm²",
        "correct": false,
        "feedback": "You gave only the cut area."
      },
      {
        "text": "\\(47.065\\) cm²",
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
    "question": "A square room is 6 m × 6 m. Carpet costs £15 per m². Find the total cost.",
    "options": [
      {
        "text": "\\(£540\\)",
        "correct": true,
        "feedback": "Correct. Area \\(= 36\\) m². Cost \\(= 36 \\times 15 = £540\\). (bw: Area × cost per unit.)"
      },
      {
        "text": "\\(£90\\)",
        "correct": false,
        "feedback": "You used one side (6 m) instead of the area."
      },
      {
        "text": "\\(£360\\)",
        "correct": false,
        "feedback": "You multiplied by 10 instead of 15."
      },
      {
        "text": "\\(£54\\)",
        "correct": false,
        "feedback": "You multiplied by 1.5 instead of 15."
      }
    ]
  },
  {
    "itemId": "r12",
    "order": 12,
    "cluster": "units",
    "clusterName": "Large and small units",
    "question": "A rectangle is 150 cm long and 1.2 m wide. Find its area in m².",
    "options": [
      {
        "text": "\\(1.8\\) m²",
        "correct": true,
        "feedback": "Correct. \\(150\\) cm \\(= 1.5\\) m. Area \\(= 1.5 \\times 1.2 = 1.8\\) m². (bw: Convert to the same unit before computing.)"
      },
      {
        "text": "\\(18\\) m²",
        "correct": false,
        "feedback": "You divided 150 by 10 instead of 100 when converting to metres (used 15 m)."
      },
      {
        "text": "\\(180\\) m²",
        "correct": false,
        "feedback": "You kept the cm value and multiplied by 1.2 (got 180)."
      },
      {
        "text": "\\(0.18\\) m²",
        "correct": false,
        "feedback": "You misplaced the decimal when converting 150 cm to m (used 1.5 but divided area by 10)."
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
    title: "Shapes and Measurements — Core Fluency",
    subtitle: "Grade 8 · Level 1 · Core Fluency",
    description: "Circumference and area of circles, simple compound shapes, metric unit conversions, and perimeter and area in everyday contexts — warm-up, diagnostic, and spaced recheck for core fluency.",
    clusterNames: CLUSTER_NAMES,
    gateReviewHTML: "<p>You’ve finished the warm‑up. The next 24 questions are the Core Fluency diagnostic for shapes and measurements. You’ll work with circles, compound shapes, unit conversions, and real-world perimeter and area. Use π ≈ 3.14. Some items have diagrams — read each one carefully. Take your time and use the feedback to sharpen your understanding.</p>",
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

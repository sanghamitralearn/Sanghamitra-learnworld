// seed/mathSeedCh7ShapesMeasurementsL4.js
//
// Populates math_chapters and math_questions with Grade 8, Chapter 7
// (Shapes and Measurements), Level 4 — converted from the standalone diagnostic
// JSON ch7-shapes-measurements-level-4.json. Diagrams are inlined as SVG HTML
// directly in each question's text (the schema has no separate diagram
// field, and question text is already rendered as raw HTML).
//
// Run with: node seed/mathSeedCh7ShapesMeasurementsL4.js

const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-8";
const GRADE_LABEL = "Grade 8";
const CHAPTER_SLUG = "ch-7-shapes-measurements";
const CHAPTER_NAME = "Shapes and Measurements";
const LEVEL = 4;

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
    "cluster": "circumference",
    "clusterName": "Circumference of a circle",
    "tier": "S",
    "question": "A circle has radius 5 cm. Find its circumference (π ≈ 3.14).",
    "options": [
      {
        "text": "\\(31.4\\) cm",
        "correct": true,
        "feedback": "Correct. \\(C = 2\\pi r = 31.4\\) cm."
      },
      {
        "text": "\\(15.7\\) cm",
        "correct": false,
        "feedback": "You halved the correct answer."
      },
      {
        "text": "\\(78.5\\) cm",
        "correct": false,
        "feedback": "You used the area formula."
      },
      {
        "text": "\\(10\\) cm",
        "correct": false,
        "feedback": "You gave the diameter."
      }
    ],
    "retryHint": "Circumference = \\(2\\pi r\\).",
    "backward": "Circumference formula.",
    "forward": "Used in every circle-perimeter problem."
  },
  {
    "itemId": "w2",
    "order": 2,
    "cluster": "areaCircle",
    "clusterName": "Area of a circle",
    "tier": "S",
    "question": "A circle has radius 2 cm. Find its area (π ≈ 3.14).",
    "options": [
      {
        "text": "\\(12.56\\) cm²",
        "correct": true,
        "feedback": "Correct. \\(A = \\pi r^2 = 3.14 \\times 4 = 12.56\\) cm². (bw: Area formula.)"
      },
      {
        "text": "\\(6.28\\) cm²",
        "correct": false,
        "feedback": "You used \\(\\pi r\\)."
      },
      {
        "text": "\\(25.12\\) cm²",
        "correct": false,
        "feedback": "You used \\(2\\pi r^2\\)."
      },
      {
        "text": "\\(3.14\\) cm²",
        "correct": false,
        "feedback": "You used \\(\\pi \\times 1\\) (forgot to square)."
      }
    ],
    "retryHint": "Area = \\(\\pi r^2\\)."
  },
  {
    "itemId": "w3",
    "order": 3,
    "cluster": "units",
    "clusterName": "Large and small units",
    "tier": "S",
    "question": "Convert 2.5 m to cm.",
    "options": [
      {
        "text": "\\(250\\) cm",
        "correct": true,
        "feedback": "Correct. \\(2.5 \\times 100 = 250\\) cm. (bw: Larger → smaller means multiply.)"
      },
      {
        "text": "\\(25\\) cm",
        "correct": false,
        "feedback": "You multiplied by 10."
      },
      {
        "text": "\\(2500\\) cm",
        "correct": false,
        "feedback": "You multiplied by 1000."
      },
      {
        "text": "\\(0.025\\) cm",
        "correct": false,
        "feedback": "You divided instead of multiplying."
      }
    ],
    "retryHint": "1 m = 100 cm."
  },
  {
    "itemId": "w4",
    "order": 4,
    "cluster": "realContext",
    "clusterName": "Perimeter and area in real contexts",
    "tier": "S",
    "question": "A rectangle is 7 m long and 3 m wide. Find its perimeter.",
    "options": [
      {
        "text": "\\(20\\) m",
        "correct": true,
        "feedback": "Correct. \\(P = 2(7+3) = 20\\) m. (bw: Perimeter formula.)"
      },
      {
        "text": "\\(21\\) m",
        "correct": false,
        "feedback": "You gave the area (\\(7 \\times 3 = 21\\))."
      },
      {
        "text": "\\(10\\) m",
        "correct": false,
        "feedback": "You gave the semi-perimeter."
      },
      {
        "text": "\\(14\\) m",
        "correct": false,
        "feedback": "You doubled only the length."
      }
    ],
    "retryHint": "Perimeter = \\(2(\\text{length} + \\text{width})\\)."
  },
  {
    "itemId": "w5",
    "order": 5,
    "cluster": "compoundArea",
    "clusterName": "Areas of compound shapes",
    "tier": "C",
    "question": "A shape is a rectangle 6 cm × 4 cm with a semicircle of radius 2 cm attached to one short side. Find its total area (π ≈ 3.14).",
    "options": [
      {
        "text": "\\(30.28\\) cm²",
        "correct": true,
        "feedback": "Correct. Rectangle \\(= 24\\). Semicircle \\(= \\tfrac{1}{2} \\times 3.14 \\times 4 = 6.28\\). Total \\(= 30.28\\) cm². (bw: Composite area.)"
      },
      {
        "text": "\\(24\\) cm²",
        "correct": false,
        "feedback": "You gave only the rectangle."
      },
      {
        "text": "\\(6.28\\) cm²",
        "correct": false,
        "feedback": "You gave only the semicircle."
      },
      {
        "text": "\\(36.56\\) cm²",
        "correct": false,
        "feedback": "You used the full circle (24 + 12.56 = 36.56)."
      }
    ]
  },
  {
    "itemId": "w6",
    "order": 6,
    "cluster": "units",
    "clusterName": "Large and small units",
    "tier": "C",
    "question": "A rectangle is 5 m long and 300 cm wide. Find its area in m².",
    "options": [
      {
        "text": "\\(15\\) m²",
        "correct": true,
        "feedback": "Correct. \\(300\\) cm \\(= 3\\) m. Area \\(= 5 \\times 3 = 15\\) m². (bw: Convert to the same unit before computing area.)"
      },
      {
        "text": "\\(150\\) m²",
        "correct": false,
        "feedback": "You multiplied by 10."
      },
      {
        "text": "\\(1500\\) m²",
        "correct": false,
        "feedback": "You kept the cm value and multiplied (5 × 300 = 1500)."
      },
      {
        "text": "\\(1.5\\) m²",
        "correct": false,
        "feedback": "You divided by 10."
      }
    ]
  },
  {
    "itemId": "w7",
    "order": 7,
    "cluster": "realContext",
    "clusterName": "Perimeter and area in real contexts",
    "tier": "H",
    "question": "A wheel has diameter 70 cm. How far does it travel in 500 full rotations, in metres? (π ≈ 3.14)",
    "options": [
      {
        "text": "\\(1099\\) m",
        "correct": true,
        "feedback": "Correct. Circumference \\(= 3.14 \\times 70 = 219.8\\) cm \\(= 2.198\\) m. \\(2.198 \\times 500 = 1099\\) m. (bw: Circumference × rotations, then unit conversion.)"
      },
      {
        "text": "\\(109.9\\) m",
        "correct": false,
        "feedback": "You misplaced a decimal when converting cm to m."
      },
      {
        "text": "\\(10990\\) m",
        "correct": false,
        "feedback": "You divided by 10 instead of 100 when converting cm to m."
      },
      {
        "text": "\\(350\\) m",
        "correct": false,
        "feedback": "You used the diameter (0.7 m) instead of the circumference (2.198 m)."
      }
    ]
  },
  {
    "itemId": "w8",
    "order": 8,
    "cluster": "areaCircle",
    "clusterName": "Area of a circle",
    "tier": "T",
    "question": "A circle's radius is doubled. By what factor does the area increase?",
    "options": [
      {
        "text": "\\(2\\)",
        "correct": false,
        "feedback": "You assumed linear scaling — area depends on \\(r^2\\), so doubling \\(r\\) multiplies area by \\(2^2 = 4\\), not 2."
      },
      {
        "text": "\\(4\\)",
        "correct": true,
        "feedback": "Correct. \\(A_{\\text{new}} = \\pi (2r)^2 = 4\\pi r^2\\), so the area increases by factor \\(4\\). (bw: Area ∝ r².)"
      },
      {
        "text": "\\(8\\)",
        "correct": false,
        "feedback": "You multiplied the linear factor (2) by the area factor (4)."
      },
      {
        "text": "\\(16\\)",
        "correct": false,
        "feedback": "You squared twice (\\(2^4\\))."
      }
    ]
  }
];

const diagnosticItems = [
  {
    "itemId": "d1",
    "order": 1,
    "cluster": "circumference",
    "clusterName": "Circumference of a circle",
    "tier": "S",
    "question": "A circle has radius 6 cm. Find its circumference (π ≈ 3.14).",
    "options": [
      {
        "text": "\\(37.68\\) cm",
        "correct": true,
        "feedback": "Correct. \\(C = 2 \\times 3.14 \\times 6 = 37.68\\) cm. (bw: Circumference formula.)"
      },
      {
        "text": "\\(18.84\\) cm",
        "correct": false,
        "feedback": "You used \\(\\pi r\\) instead of \\(2\\pi r\\)."
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
    "itemId": "d2",
    "order": 2,
    "cluster": "units",
    "clusterName": "Large and small units",
    "tier": "S",
    "question": "Convert 4500 mm to m.",
    "options": [
      {
        "text": "\\(4.5\\) m",
        "correct": true,
        "feedback": "Correct. \\(4500 \\div 1000 = 4.5\\) m. (bw: Smaller → larger means divide.)"
      },
      {
        "text": "\\(45\\) m",
        "correct": false,
        "feedback": "You divided by 100."
      },
      {
        "text": "\\(450\\) m",
        "correct": false,
        "feedback": "You divided by 10."
      },
      {
        "text": "\\(0.45\\) m",
        "correct": false,
        "feedback": "You divided by 10 000."
      }
    ]
  },
  {
    "itemId": "d3",
    "order": 3,
    "cluster": "areaCircle",
    "clusterName": "Area of a circle",
    "tier": "S",
    "question": "A circle has diameter 14 cm. Find its area (π ≈ 3.14).",
    "options": [
      {
        "text": "\\(153.86\\) cm²",
        "correct": true,
        "feedback": "Correct. \\(r = 7\\). \\(A = 3.14 \\times 49 = 153.86\\) cm². (bw: Halve the diameter first.)"
      },
      {
        "text": "\\(43.96\\) cm²",
        "correct": false,
        "feedback": "You used the circumference formula."
      },
      {
        "text": "\\(615.44\\) cm²",
        "correct": false,
        "feedback": "You used \\(d^2\\) (196) instead of \\(r^2\\) (49)."
      },
      {
        "text": "\\(76.93\\) cm²",
        "correct": false,
        "feedback": "You halved the correct answer."
      }
    ]
  },
  {
    "itemId": "d4",
    "order": 4,
    "cluster": "realContext",
    "clusterName": "Perimeter and area in real contexts",
    "tier": "S",
    "question": "A rectangular room is 10 m × 5 m. Carpet costs £10 per m². Find the total cost.",
    "options": [
      {
        "text": "\\(£500\\)",
        "correct": true,
        "feedback": "Correct. Area \\(= 50\\) m². Cost \\(= 50 \\times 10 = £500\\). (bw: Area × cost per unit.)"
      },
      {
        "text": "\\(£150\\)",
        "correct": false,
        "feedback": "You used the semi-perimeter (15 m) instead of the area (50 m²)."
      },
      {
        "text": "\\(£5000\\)",
        "correct": false,
        "feedback": "You multiplied by 100 instead of 10."
      },
      {
        "text": "\\(£250\\)",
        "correct": false,
        "feedback": "You used half the area (25 m²)."
      }
    ]
  },
  {
    "itemId": "d5",
    "order": 5,
    "cluster": "compoundArea",
    "clusterName": "Areas of compound shapes",
    "tier": "C",
    "question": "A shape is a rectangle 20 cm × 10 cm with a semicircle of radius 5 cm attached to one short side. Find its total area (π ≈ 3.14).",
    "options": [
      {
        "text": "\\(239.25\\) cm²",
        "correct": true,
        "feedback": "Correct. Rectangle \\(= 200\\). Semicircle \\(= \\tfrac{1}{2} \\times 3.14 \\times 25 = 39.25\\). Total \\(= 239.25\\) cm². (bw: Composite area.)"
      },
      {
        "text": "\\(200\\) cm²",
        "correct": false,
        "feedback": "You gave only the rectangle."
      },
      {
        "text": "\\(39.25\\) cm²",
        "correct": false,
        "feedback": "You gave only the semicircle."
      },
      {
        "text": "\\(278.5\\) cm²",
        "correct": false,
        "feedback": "You used the full circle (200 + 78.5 = 278.5)."
      }
    ]
  },
  {
    "itemId": "d6",
    "order": 6,
    "cluster": "units",
    "clusterName": "Large and small units",
    "tier": "C",
    "question": "A tank is 1 m long, 0.5 m wide, and 0.4 m deep. Find its volume in litres (1 m³ = 1000 L).",
    "options": [
      {
        "text": "\\(200\\) L",
        "correct": true,
        "feedback": "Correct. Volume \\(= 1 \\times 0.5 \\times 0.4 = 0.2\\) m³ \\(= 200\\) L. (bw: Volume × conversion.)"
      },
      {
        "text": "\\(20\\) L",
        "correct": false,
        "feedback": "You multiplied by 100 instead of 1000."
      },
      {
        "text": "\\(2000\\) L",
        "correct": false,
        "feedback": "You multiplied by 10 000 instead of 1000."
      },
      {
        "text": "\\(2\\) L",
        "correct": false,
        "feedback": "You divided instead of multiplying."
      }
    ]
  },
  {
    "itemId": "d7",
    "order": 7,
    "cluster": "circumference",
    "clusterName": "Circumference of a circle",
    "tier": "T",
    "question": "A semicircle has radius 6 cm. Find its perimeter (including the straight edge) (π ≈ 3.14).",
    "options": [
      {
        "text": "\\(30.84\\) cm",
        "correct": true,
        "feedback": "Correct. Arc \\(= \\pi r = 18.84\\) cm. Straight edge \\(= 2r = 12\\) cm. Total \\(= 30.84\\) cm."
      },
      {
        "text": "\\(18.84\\) cm",
        "correct": false,
        "feedback": "This is just the arc — the perimeter of a semicircle also includes the straight edge (12 cm)."
      },
      {
        "text": "\\(18\\) cm",
        "correct": false,
        "feedback": "You gave the straight edge plus the radius (12 + 6 = 18)."
      },
      {
        "text": "\\(37.68\\) cm",
        "correct": false,
        "feedback": "You used the full circumference instead of just the arc."
      }
    ],
    "backward": "Semicircle perimeter = arc + straight edge.",
    "forward": "Used whenever a semicircle's boundary is required."
  },
  {
    "itemId": "d8",
    "order": 8,
    "cluster": "units",
    "clusterName": "Large and small units",
    "tier": "T",
    "question": "Convert 0.5 m² to cm².",
    "options": [
      {
        "text": "\\(5000\\) cm²",
        "correct": true,
        "feedback": "Correct. \\(1\\) m² \\(= 10000\\) cm². \\(0.5 \\times 10000 = 5000\\) cm². (bw: Area units scale by the square of the length factor.)"
      },
      {
        "text": "\\(50\\) cm²",
        "correct": false,
        "feedback": "You multiplied by 100 (the linear factor) — for area, use 100 × 100 = 10,000."
      },
      {
        "text": "\\(500\\) cm²",
        "correct": false,
        "feedback": "You multiplied by 1000."
      },
      {
        "text": "\\(50000\\) cm²",
        "correct": false,
        "feedback": "You multiplied by 100 000."
      }
    ]
  },
  {
    "itemId": "d9",
    "order": 9,
    "cluster": "circumference",
    "clusterName": "Circumference of a circle",
    "tier": "C",
    "question": "A circle has area 200.96 cm². Find its circumference (π ≈ 3.14).",
    "options": [
      {
        "text": "\\(50.24\\) cm",
        "correct": true,
        "feedback": "Correct. \\(r^2 = 64\\), \\(r = 8\\). \\(C = 2\\pi r = 50.24\\) cm. (bw: Rearrange area first.)"
      },
      {
        "text": "\\(25.12\\) cm",
        "correct": false,
        "feedback": "You used \\(\\pi r\\)."
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
    ]
  },
  {
    "itemId": "d10",
    "order": 10,
    "cluster": "realContext",
    "clusterName": "Perimeter and area in real contexts",
    "tier": "C",
    "question": "A rectangular room is 5 m × 4 m and 3 m high. Find the total area of the four walls (no openings).",
    "options": [
      {
        "text": "\\(54\\) m²",
        "correct": true,
        "feedback": "Correct. Perimeter \\(= 18\\) m. Wall area \\(= 18 \\times 3 = 54\\) m². (bw: Perimeter × height.)"
      },
      {
        "text": "\\(60\\) m²",
        "correct": false,
        "feedback": "You computed the room's volume (5 × 4 × 3 = 60) instead of the wall area."
      },
      {
        "text": "\\(20\\) m²",
        "correct": false,
        "feedback": "You gave the floor area."
      },
      {
        "text": "\\(27\\) m²",
        "correct": false,
        "feedback": "You gave half the correct answer."
      }
    ]
  },
  {
    "itemId": "d11",
    "order": 11,
    "cluster": "compoundArea",
    "clusterName": "Areas of compound shapes",
    "tier": "H",
    "question": "A rectangle 20 cm × 14 cm has a semicircle of radius 7 cm attached to one short end. Find its perimeter (π ≈ 3.14).<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 318 149.7\" width=\"445\" height=\"210\" style=\"max-width:100%;height:auto\" font-family=\"Arial, Helvetica, sans-serif\"><path d=\"M 109.9 16 H 258 V 119.7 H 109.9 Z\" fill=\"none\" stroke=\"#999\" stroke-width=\"1.2\" stroke-linejoin=\"round\" stroke-dasharray=\"4 3\"/><path d=\"M 109.9 16 H 258 V 119.7 H 109.9 V 119.7 A 51.9 51.9 0 0 1 109.9 16 Z\" fill=\"none\" stroke=\"#222\" stroke-width=\"2\" stroke-linejoin=\"round\"/><line x1=\"109.9\" y1=\"67.9\" x2=\"73.2\" y2=\"31.2\" stroke=\"#c0392b\" stroke-width=\"2\" stroke-dasharray=\"5 4\"/><circle cx=\"109.9\" cy=\"67.9\" r=\"2.5\" fill=\"#222\"/><text x=\"67.2\" y=\"26.2\" font-size=\"13\" fill=\"#c0392b\" text-anchor=\"end\">r = 7 cm</text><text x=\"183.9\" y=\"139.7\" font-size=\"13\" fill=\"#222\" text-anchor=\"middle\">20 cm</text><text x=\"266\" y=\"71.9\" font-size=\"13\" fill=\"#222\" text-anchor=\"start\">14 cm</text></svg></div>",
    "options": [
      {
        "text": "\\(75.98\\) cm",
        "correct": true,
        "feedback": "Correct. Perimeter \\(= 20 + 20 + 14 + \\pi \\times 7 = 54 + 21.98 = 75.98\\) cm. (bw: The semicircle replaces one short side; the opposite short side remains on the boundary.)"
      },
      {
        "text": "\\(68\\) cm",
        "correct": false,
        "feedback": "You used the rectangle's full perimeter."
      },
      {
        "text": "\\(54\\) cm",
        "correct": false,
        "feedback": "You forgot to add the arc."
      },
      {
        "text": "\\(97.96\\) cm",
        "correct": false,
        "feedback": "You used the full circumference plus both short sides."
      }
    ]
  },
  {
    "itemId": "d12",
    "order": 12,
    "cluster": "compoundArea",
    "clusterName": "Areas of compound shapes",
    "tier": "H",
    "question": "A ring (annulus) has inner radius 5 cm and outer radius 8 cm. Find its area (π ≈ 3.14).<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 260 196\" width=\"364\" height=\"274\" style=\"max-width:100%;height:auto\" font-family=\"Arial, Helvetica, sans-serif\"><circle cx=\"98\" cy=\"96\" r=\"82\" fill=\"#f8d7d5\" stroke=\"#222\" stroke-width=\"2\"/><circle cx=\"98\" cy=\"96\" r=\"51.3\" fill=\"#fff\" stroke=\"#222\" stroke-width=\"2\"/><line x1=\"98\" y1=\"96\" x2=\"46.8\" y2=\"96\" stroke=\"#c0392b\" stroke-width=\"1.8\"/><text x=\"72.4\" y=\"88\" font-size=\"11\" fill=\"#c0392b\" text-anchor=\"middle\">r = 5 cm</text><line x1=\"98\" y1=\"96\" x2=\"156\" y2=\"154\" stroke=\"#1f6fb2\" stroke-width=\"1.8\"/><circle cx=\"98\" cy=\"96\" r=\"2.5\" fill=\"#222\"/><text x=\"165\" y=\"169\" font-size=\"12\" fill=\"#1f6fb2\" text-anchor=\"start\">R = 8 cm</text></svg></div>",
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
    "cluster": "circumference",
    "clusterName": "Circumference of a circle",
    "tier": "S",
    "question": "A circle has circumference 50.24 cm. Find its radius (π ≈ 3.14).",
    "options": [
      {
        "text": "\\(8\\) cm",
        "correct": true,
        "feedback": "Correct. \\(r = C / (2\\pi) = 50.24 / 6.28 = 8\\) cm. (bw: Rearranging the circumference formula.)"
      },
      {
        "text": "\\(16\\) cm",
        "correct": false,
        "feedback": "You gave the diameter."
      },
      {
        "text": "\\(4\\) cm",
        "correct": false,
        "feedback": "You halved the correct answer."
      },
      {
        "text": "\\(25.12\\) cm",
        "correct": false,
        "feedback": "You gave \\(C / 2\\)."
      }
    ]
  },
  {
    "itemId": "d14",
    "order": 14,
    "cluster": "units",
    "clusterName": "Large and small units",
    "tier": "S",
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
    "itemId": "d15",
    "order": 15,
    "cluster": "areaCircle",
    "clusterName": "Area of a circle",
    "tier": "T",
    "question": "A circle's radius is tripled. By what factor does the area increase?",
    "options": [
      {
        "text": "\\(3\\)",
        "correct": false,
        "feedback": "You assumed linear scaling — area depends on \\(r^2\\), so tripling \\(r\\) multiplies area by \\(3^2 = 9\\)."
      },
      {
        "text": "\\(9\\)",
        "correct": true,
        "feedback": "Correct. \\(A_{\\text{new}} = \\pi (3r)^2 = 9\\pi r^2\\). (bw: Area ∝ r².)"
      },
      {
        "text": "\\(6\\)",
        "correct": false,
        "feedback": "You multiplied 3 × 2 = 6 (mixing factor and exponent)."
      },
      {
        "text": "\\(27\\)",
        "correct": false,
        "feedback": "You cubed 3 (thinking volume)."
      }
    ]
  },
  {
    "itemId": "d16",
    "order": 16,
    "cluster": "compoundArea",
    "clusterName": "Areas of compound shapes",
    "tier": "C",
    "question": "A circular pond of radius 4 m is surrounded by a path 1 m wide. Find the area of the path (π ≈ 3.14).",
    "options": [
      {
        "text": "\\(28.26\\) m²",
        "correct": true,
        "feedback": "Correct. Inner \\(= 3.14 \\times 16 = 50.24\\). Outer \\(r = 5\\), area \\(= 3.14 \\times 25 = 78.5\\). Path \\(= 78.5 - 50.24 = 28.26\\) m². (bw: Annulus formula.)"
      },
      {
        "text": "\\(50.24\\) m²",
        "correct": false,
        "feedback": "You gave only the inner circle."
      },
      {
        "text": "\\(78.5\\) m²",
        "correct": false,
        "feedback": "You gave only the outer circle."
      },
      {
        "text": "\\(14.13\\) m²",
        "correct": false,
        "feedback": "You halved the correct answer."
      }
    ]
  },
  {
    "itemId": "d17",
    "order": 17,
    "cluster": "compoundArea",
    "clusterName": "Areas of compound shapes",
    "tier": "C",
    "question": "A square of side 14 cm has four quarter-circles of radius 7 cm cut from its corners. Find the remaining area (π ≈ 3.14).<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 226 206\" width=\"316\" height=\"288\" style=\"max-width:100%;height:auto\" font-family=\"Arial, Helvetica, sans-serif\"><path d=\"M 58 26 H 208 V 176 H 58 Z\" fill=\"none\" stroke=\"#999\" stroke-width=\"1.2\" stroke-linejoin=\"round\" stroke-dasharray=\"4 3\"/><path d=\"M 133 26 H 133 A 75 75 0 0 0 208 101 V 101 A 75 75 0 0 0 133 176 H 133 A 75 75 0 0 0 58 101 V 101 A 75 75 0 0 0 133 26 Z\" fill=\"#f8d7d5\" stroke=\"#222\" stroke-width=\"2\" stroke-linejoin=\"round\"/><line x1=\"58\" y1=\"26\" x2=\"111\" y2=\"79\" stroke=\"#c0392b\" stroke-width=\"1.6\"/><circle cx=\"58\" cy=\"26\" r=\"2.5\" fill=\"#222\"/><text x=\"58\" y=\"17\" font-size=\"12\" fill=\"#c0392b\" text-anchor=\"start\">r = 7 cm</text><text x=\"133\" y=\"196\" font-size=\"13\" fill=\"#222\" text-anchor=\"middle\">14 cm</text><text x=\"50\" y=\"105\" font-size=\"13\" fill=\"#222\" text-anchor=\"end\">14 cm</text></svg></div>",
    "options": [
      {
        "text": "\\(42.14\\) cm²",
        "correct": true,
        "feedback": "Correct. Square \\(= 196\\). Four quarters = one circle of radius 7 \\(= 3.14 \\times 49 = 153.86\\). Remaining \\(= 196 - 153.86 = 42.14\\) cm². (bw: Four quarters make one circle.)"
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
    ]
  },
  {
    "itemId": "d18",
    "order": 18,
    "cluster": "units",
    "clusterName": "Large and small units",
    "tier": "C",
    "question": "A cube has side 30 cm. Find its volume in m³.",
    "options": [
      {
        "text": "\\(0.027\\) m³",
        "correct": true,
        "feedback": "Correct. \\(30\\) cm \\(= 0.3\\) m. Volume \\(= 0.3^3 = 0.027\\) m³. (bw: Volume units scale by the cube of the length factor.)"
      },
      {
        "text": "\\(0.09\\) m³",
        "correct": false,
        "feedback": "You used \\(0.3^2 = 0.09\\) instead of \\(0.3^3\\)."
      },
      {
        "text": "\\(27000\\) m³",
        "correct": false,
        "feedback": "You left the volume in cm³."
      },
      {
        "text": "\\(2.7\\) m³",
        "correct": false,
        "feedback": "You used \\(0.3 \\times 0.3 \\times 30\\) (mixed units)."
      }
    ]
  },
  {
    "itemId": "d19",
    "order": 19,
    "cluster": "circumference",
    "clusterName": "Circumference of a circle",
    "tier": "C",
    "question": "Find the arc length of a quarter circle of radius 10 cm (π ≈ 3.14).",
    "options": [
      {
        "text": "\\(15.7\\) cm",
        "correct": true,
        "feedback": "Correct. Arc \\(= \\tfrac{1}{4} \\times 2\\pi r = \\tfrac{1}{4} \\times 62.8 = 15.7\\) cm. (bw: Fraction of a circumference.)"
      },
      {
        "text": "\\(31.4\\) cm",
        "correct": false,
        "feedback": "You used half the circumference."
      },
      {
        "text": "\\(62.8\\) cm",
        "correct": false,
        "feedback": "You used the full circumference."
      },
      {
        "text": "\\(7.85\\) cm",
        "correct": false,
        "feedback": "You used an eighth of the circumference."
      }
    ]
  },
  {
    "itemId": "d20",
    "order": 20,
    "cluster": "units",
    "clusterName": "Large and small units",
    "tier": "H",
    "question": "A rectangular field is 2.5 km × 1.2 km. Find its area in hectares (1 ha = 10000 m²).",
    "options": [
      {
        "text": "\\(300\\) ha",
        "correct": true,
        "feedback": "Correct. Area \\(= 2.5 \\times 1.2 = 3\\) km² \\(= 3{,}000{,}000\\) m². \\(3{,}000{,}000 \\div 10{,}000 = 300\\) ha. (bw: Convert km to m before area, then to hectares.)"
      },
      {
        "text": "\\(30\\) ha",
        "correct": false,
        "feedback": "You divided by 100,000 instead of 10,000."
      },
      {
        "text": "\\(3000\\) ha",
        "correct": false,
        "feedback": "You multiplied by 1000."
      },
      {
        "text": "\\(3\\) ha",
        "correct": false,
        "feedback": "You gave the area in km²."
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
    "question": "A circle has radius 9 cm. Find its circumference (π ≈ 3.14).",
    "options": [
      {
        "text": "\\(56.52\\) cm",
        "correct": true,
        "feedback": "Correct. \\(C = 2 \\times 3.14 \\times 9 = 56.52\\) cm. (bw: Circumference formula.)"
      },
      {
        "text": "\\(28.26\\) cm",
        "correct": false,
        "feedback": "You used \\(\\pi r\\)."
      },
      {
        "text": "\\(254.34\\) cm",
        "correct": false,
        "feedback": "You used the area formula."
      },
      {
        "text": "\\(18\\) cm",
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
    "question": "Convert 0.08 km to m.",
    "options": [
      {
        "text": "\\(80\\) m",
        "correct": true,
        "feedback": "Correct. \\(0.08 \\times 1000 = 80\\) m. (bw: Larger → smaller means multiply.)"
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
    "itemId": "r3",
    "order": 3,
    "cluster": "areaCircle",
    "clusterName": "Area of a circle",
    "question": "A circle has area 113.04 cm². Find its radius (π ≈ 3.14).",
    "options": [
      {
        "text": "\\(6\\) cm",
        "correct": true,
        "feedback": "Correct. \\(r^2 = 113.04 \\div 3.14 = 36\\), \\(r = 6\\) cm. (bw: Rearrange area formula.)"
      },
      {
        "text": "\\(12\\) cm",
        "correct": false,
        "feedback": "You gave the diameter."
      },
      {
        "text": "\\(3\\) cm",
        "correct": false,
        "feedback": "You halved the correct answer."
      },
      {
        "text": "\\(36\\) cm",
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
    "question": "A rectangle 15 cm × 8 cm has a semicircle of radius 4 cm attached to one short side. Find its total area (π ≈ 3.14).",
    "options": [
      {
        "text": "\\(145.12\\) cm²",
        "correct": true,
        "feedback": "Correct. Rectangle \\(= 120\\). Semicircle \\(= 25.12\\). Total \\(= 145.12\\) cm². (bw: Composite area.)"
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
        "feedback": "You used the full circle."
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
    "question": "A rectangular tank is 80 cm × 60 cm × 50 cm. Find its volume in litres (1 L = 1000 cm³).",
    "options": [
      {
        "text": "\\(240\\) L",
        "correct": true,
        "feedback": "Correct. Volume \\(= 80 \\times 60 \\times 50 = 240000\\) cm³. \\(\\div 1000 = 240\\) L. (bw: Volume unit conversion.)"
      },
      {
        "text": "\\(24\\) L",
        "correct": false,
        "feedback": "You divided by 10 000 instead of 1000."
      },
      {
        "text": "\\(2400\\) L",
        "correct": false,
        "feedback": "You multiplied by 10."
      },
      {
        "text": "\\(24000\\) L",
        "correct": false,
        "feedback": "You divided by 10 instead of 1000 when converting cm³ to L."
      }
    ]
  },
  {
    "itemId": "r7",
    "order": 7,
    "cluster": "circumference",
    "clusterName": "Circumference of a circle",
    "question": "A circle has area 78.5 cm². Find its circumference (π ≈ 3.14).",
    "options": [
      {
        "text": "\\(31.4\\) cm",
        "correct": true,
        "feedback": "Correct. \\(r^2 = 25\\), \\(r = 5\\). \\(C = 2\\pi r = 31.4\\) cm. (bw: Rearrange area first.)"
      },
      {
        "text": "\\(15.7\\) cm",
        "correct": false,
        "feedback": "You used \\(\\pi r\\)."
      },
      {
        "text": "\\(10\\) cm",
        "correct": false,
        "feedback": "You gave \\(2r\\)."
      },
      {
        "text": "\\(62.8\\) cm",
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
    "question": "Convert 320 cm² to m².",
    "options": [
      {
        "text": "\\(0.032\\) m²",
        "correct": true,
        "feedback": "Correct. \\(320 \\div 10000 = 0.032\\) m². (bw: Smaller → larger means divide by area factor.)"
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
    "itemId": "r9",
    "order": 9,
    "cluster": "areaCircle",
    "clusterName": "Area of a circle",
    "question": "A circle's radius is quadrupled. By what factor does the area increase?",
    "options": [
      {
        "text": "\\(4\\)",
        "correct": false,
        "feedback": "You assumed linear scaling — area depends on \\(r^2\\)."
      },
      {
        "text": "\\(16\\)",
        "correct": true,
        "feedback": "Correct. Area \\(= \\pi (4r)^2 = 16\\pi r^2\\). (bw: Area ∝ r².)"
      },
      {
        "text": "\\(8\\)",
        "correct": false,
        "feedback": "You multiplied 4 × 2 = 8."
      },
      {
        "text": "\\(64\\)",
        "correct": false,
        "feedback": "You cubed 4 (thinking volume)."
      }
    ]
  },
  {
    "itemId": "r10",
    "order": 10,
    "cluster": "realContext",
    "clusterName": "Perimeter and area in real contexts",
    "question": "A circular flowerbed of radius 4 m is surrounded by a gravel path 1 m wide. Gravel costs £5 per m². Find the total cost (π ≈ 3.14).",
    "options": [
      {
        "text": "\\(£141.30\\)",
        "correct": true,
        "feedback": "Correct. Inner \\(= 3.14 \\times 16 = 50.24\\). Outer \\(r = 5\\): area \\(= 78.5\\). Path \\(= 28.26\\) m². Cost \\(= 28.26 \\times 5 = £141.30\\). (bw: Annulus + cost.)"
      },
      {
        "text": "\\(£251.20\\)",
        "correct": false,
        "feedback": "You used the inner circle's area."
      },
      {
        "text": "\\(£392.50\\)",
        "correct": false,
        "feedback": "You used the outer circle's area."
      },
      {
        "text": "\\(£70.65\\)",
        "correct": false,
        "feedback": "You halved the correct answer."
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
    title: "Shapes and Measurements — Speed & Strategy",
    subtitle: "Grade 8 · Level 4 · Speed & Strategy · Olympiad Simulation",
    description: "A 25-minute timed diagnostic mixing Speed, Core, Challenge and Trap items across every shapes and measurements cluster.",
    clusterNames: CLUSTER_NAMES,
    gateReviewHTML: "<p>You’ve completed the warm‑up. The next 20 questions are the <strong>Speed &amp; Strategy diagnostic</strong>. You have <strong>25 minutes</strong> in total — a timer starts when you enter. You can <strong>skip</strong> any question and come back later. Items are tiered: <strong>S</strong> (Speed) — answer fast, <strong>C</strong> (Core) — multi‑step, <strong>H</strong> (Challenge) — deeper synthesis, <strong>T</strong> (Trap) — read carefully. Use π ≈ 3.14. Move fast on easy items, slow down on traps, and don’t get stuck.</p>",
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

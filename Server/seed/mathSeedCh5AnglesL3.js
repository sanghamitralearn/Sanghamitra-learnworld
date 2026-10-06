// seed/mathSeedCh5AnglesL3.js
//
// Populates math_chapters and math_questions with Grade 8, Chapter 5
// (Angles), Level 3 — converted from the standalone diagnostic
// JSON ch5-angles-level-3.json. Diagrams are inlined as SVG HTML
// directly in each question's text (the schema has no separate diagram
// field, and question text is already rendered as raw HTML).
//
// Run with: node seed/mathSeedCh5AnglesL3.js

const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-8";
const GRADE_LABEL = "Grade 8";
const CHAPTER_SLUG = "ch-5-angles";
const CHAPTER_NAME = "Angles";
const LEVEL = 3;

const CLUSTER_NAMES = {
  "angleCalc": "Angle calculations",
  "interiorPoly": "Interior angles of polygons",
  "exteriorPoly": "Exterior angles of polygons",
  "constructions": "Constructions",
  "pythagoras": "Pythagoras' theorem",
  "mixed": "Mixed geometry problems"
};

const warmupItems = [
  {
    "itemId": "w1",
    "order": 1,
    "cluster": "pythagoras",
    "clusterName": "Pythagoras' theorem",
    "question": "An isosceles triangle has two equal sides of length 5 cm and a base of 6 cm. Find its height.",
    "options": [
      {
        "text": "\\(4\\) cm",
        "correct": true,
        "feedback": "Correct. The altitude bisects the base: half-base = 3. \\(h^2 = 25 - 9 = 16\\), \\(h = 4\\) cm."
      },
      {
        "text": "\\(5\\) cm",
        "correct": false,
        "feedback": "You gave the side length, not the height."
      },
      {
        "text": "\\(3\\) cm",
        "correct": false,
        "feedback": "You gave the half-base."
      },
      {
        "text": "\\(6\\) cm",
        "correct": false,
        "feedback": "You gave the base."
      }
    ],
    "retryHint": "The altitude bisects the base. Use Pythagoras on half the base.",
    "backward": "Pythagoras; isosceles symmetry.",
    "forward": "Used whenever a triangle's height is needed for area."
  },
  {
    "itemId": "w2",
    "order": 2,
    "cluster": "angleCalc",
    "clusterName": "Angle calculations",
    "question": "The angles of a triangle are in the ratio \\(1:2:3\\). Find the largest angle.",
    "options": [
      {
        "text": "\\(90^\\circ\\)",
        "correct": true,
        "feedback": "Correct. Sum = 6 parts = 180°, so each part = 30°. Largest = \\(3 \\times 30 = 90^\\circ\\)."
      },
      {
        "text": "\\(60^\\circ\\)",
        "correct": false,
        "feedback": "You gave the middle angle (\\(2 \\times 30 = 60\\))."
      },
      {
        "text": "\\(30^\\circ\\)",
        "correct": false,
        "feedback": "You gave the smallest angle (\\(1 \\times 30 = 30\\))."
      },
      {
        "text": "\\(150^\\circ\\)",
        "correct": false,
        "feedback": "You used 180° − smallest angle, treating the remainder as a triangle angle. The triangle's third angle is \\(3 \\times 30 = 90°\\), not 150°."
      }
    ],
    "retryHint": "Total parts = 1 + 2 + 3. Each part = 180° ÷ total.",
    "backward": "Triangle angle sum; ratio reasoning.",
    "forward": "Used whenever angles are in ratio form."
  },
  {
    "itemId": "w3",
    "order": 3,
    "cluster": "pythagoras",
    "clusterName": "Pythagoras' theorem",
    "question": "A right triangle has hypotenuse 26 cm and one leg 10 cm. Find its perimeter.",
    "options": [
      {
        "text": "\\(60\\) cm",
        "correct": true,
        "feedback": "Correct. Other leg = \\(\\sqrt{676 - 100} = 24\\). Perimeter = \\(26 + 10 + 24 = 60\\) cm."
      },
      {
        "text": "\\(52\\) cm",
        "correct": false,
        "feedback": "You doubled the hypotenuse (\\(2 \\times 26 = 52\\))."
      },
      {
        "text": "\\(36\\) cm",
        "correct": false,
        "feedback": "You omitted the unknown leg (\\(26 + 10 = 36\\))."
      },
      {
        "text": "\\(62\\) cm",
        "correct": false,
        "feedback": "You used the hypotenuse as a leg (\\(26 + 10 + 26 = 62\\))."
      }
    ],
    "retryHint": "Find the missing leg first, then add all three sides.",
    "backward": "Pythagoras; perimeter.",
    "forward": "Used whenever one side is unknown."
  },
  {
    "itemId": "w4",
    "order": 4,
    "cluster": "interiorPoly",
    "clusterName": "Interior angles of polygons",
    "question": "Each exterior angle of a regular polygon is \\(24^\\circ\\). Find the sum of its interior angles.",
    "options": [
      {
        "text": "\\(2340^\\circ\\)",
        "correct": true,
        "feedback": "Correct. n = \\(360 \\div 24 = 15\\). Sum = \\((15 - 2) \\times 180 = 2340^\\circ\\)."
      },
      {
        "text": "\\(2700^\\circ\\)",
        "correct": false,
        "feedback": "You used \\(15 \\times 180\\) (forgot the −2)."
      },
      {
        "text": "\\(2160^\\circ\\)",
        "correct": false,
        "feedback": "You used \\(12 \\times 180\\) (\\(n - 3\\), not \\(n - 2\\))."
      },
      {
        "text": "\\(3240^\\circ\\)",
        "correct": false,
        "feedback": "You used \\(18 \\times 180\\) (\\(n = 20\\))."
      }
    ],
    "retryHint": "First find n from the exterior angle, then apply the interior sum formula.",
    "backward": "Exterior sum; interior sum formula.",
    "forward": "Used whenever exterior is given but interior sum is required."
  },
  {
    "itemId": "w5",
    "order": 5,
    "cluster": "pythagoras",
    "clusterName": "Pythagoras' theorem",
    "question": "The perpendicular bisector of AB (with AB = 16 cm) meets AB at M. A point P is on the perpendicular bisector with PA = 17 cm. Find PM.",
    "options": [
      {
        "text": "\\(15\\) cm",
        "correct": true,
        "feedback": "Correct. AM = 8 cm (midpoint). \\(PM^2 = 289 - 64 = 225\\), \\(PM = 15\\) cm."
      },
      {
        "text": "\\(9\\) cm",
        "correct": false,
        "feedback": "You subtracted AM from PA (\\(17 - 8 = 9\\))."
      },
      {
        "text": "\\(17\\) cm",
        "correct": false,
        "feedback": "You gave PA as the answer."
      },
      {
        "text": "\\(25\\) cm",
        "correct": false,
        "feedback": "You added AM and PA (\\(8 + 17 = 25\\))."
      }
    ],
    "retryHint": "AM is half of AB; then Pythagoras.",
    "backward": "Midpoint property; Pythagoras.",
    "forward": "The defining property of the perpendicular bisector."
  },
  {
    "itemId": "w6",
    "order": 6,
    "cluster": "pythagoras",
    "clusterName": "Pythagoras' theorem",
    "question": "A 25 m ladder reaches 24 m up a wall. How far is its foot from the wall?",
    "options": [
      {
        "text": "\\(7\\) m",
        "correct": true,
        "feedback": "Correct. \\(d^2 = 625 - 576 = 49\\), \\(d = 7\\) m."
      },
      {
        "text": "\\(24\\) m",
        "correct": false,
        "feedback": "You gave the height, not the distance."
      },
      {
        "text": "\\(12\\) m",
        "correct": false,
        "feedback": "You halved the height (\\(24 \\div 2 = 12\\))."
      },
      {
        "text": "\\(1\\) m",
        "correct": false,
        "feedback": "You subtracted the height from the hypotenuse (\\(25 - 24 = 1\\))."
      }
    ],
    "retryHint": "\\(d^2 = \\text{hyp}^2 - \\text{height}^2\\), then take the square root.",
    "backward": "Pythagoras with hypotenuse known.",
    "forward": "Common real-life measurement."
  },
  {
    "itemId": "w7",
    "order": 7,
    "cluster": "interiorPoly",
    "clusterName": "Interior angles of polygons",
    "question": "A polygon has 12 sides. Find the sum of its interior angles.",
    "options": [
      {
        "text": "\\(1800^\\circ\\)",
        "correct": true,
        "feedback": "Correct. \\((12 - 2) \\times 180 = 1800^\\circ\\)."
      },
      {
        "text": "\\(2160^\\circ\\)",
        "correct": false,
        "feedback": "You used \\(12 \\times 180\\) (forgot the −2)."
      },
      {
        "text": "\\(1440^\\circ\\)",
        "correct": false,
        "feedback": "You used the sum for a 10-sided polygon: \\((10 - 2) \\times 180 = 1440\\)."
      },
      {
        "text": "\\(1620^\\circ\\)",
        "correct": false,
        "feedback": "You used the sum for an 11-sided polygon: \\((11 - 2) \\times 180 = 1620\\)."
      }
    ],
    "retryHint": "Subtract 2 from the number of sides, then multiply by 180°.",
    "backward": "Interior angle sum formula.",
    "forward": "Used to find any polygon's interior sum."
  },
  {
    "itemId": "w8",
    "order": 8,
    "cluster": "angleCalc",
    "clusterName": "Angle calculations",
    "question": "The exterior angles of a triangle are in the ratio \\(2:3:4\\). Find the largest interior angle.",
    "options": [
      {
        "text": "\\(100^\\circ\\)",
        "correct": true,
        "feedback": "Correct. Sum of exterior = 360°; 9 parts → each = 40°. Exterior: 80°, 120°, 160°. Interiors: 100°, 60°, 20°. Largest = 100°."
      },
      {
        "text": "\\(160^\\circ\\)",
        "correct": false,
        "feedback": "You gave the largest exterior (160°), not the largest interior."
      },
      {
        "text": "\\(80^\\circ\\)",
        "correct": false,
        "feedback": "You gave the exterior of the largest interior (\\(180 - 100 = 80\\))."
      },
      {
        "text": "\\(20^\\circ\\)",
        "correct": false,
        "feedback": "You gave the smallest interior."
      }
    ],
    "retryHint": "Find each exterior, then convert to interior using 180° − exterior.",
    "backward": "Exterior sum; straight-line fact.",
    "forward": "Used in problems mixing exterior and interior."
  }
];

const diagnosticItems = [
  {
    "itemId": "d1",
    "order": 1,
    "cluster": "angleCalc",
    "clusterName": "Angle calculations",
    "question": "In the diagram, the lower and upper lines are parallel. Find the third angle of the triangle (at the apex).<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 200 180\" width=\"400\" height=\"360\"><!-- Two parallel horizontal lines; triangle with base on lower line and apex on upper line; base angles 72 and 58 --><line x1=\"5\" y1=\"150\" x2=\"195\" y2=\"150\" stroke=\"#222\" stroke-width=\"2\"/><line x1=\"5\" y1=\"34\" x2=\"195\" y2=\"34\" stroke=\"#222\" stroke-width=\"2\"/><polygon points=\"40,150 150,150 78,34\" fill=\"none\" stroke=\"#222\" stroke-width=\"2\"/><polyline points=\"65,150 64.7,146.1 63.8,142.3 62.3,138.7 60.2,135.3 57.7,132.3 54.7,129.8 51.4,127.7 47.7,126.2\" fill=\"none\" stroke=\"#c0392b\" stroke-width=\"2\"/><polyline points=\"125,150 125.3,146.1 126.2,142.3 127.7,138.7 129.8,135.3 132.3,132.3 135.3,129.8 136.8,128.8\" fill=\"none\" stroke=\"#c0392b\" stroke-width=\"2\"/><text x=\"72\" y=\"134\" font-size=\"13\" fill=\"#c0392b\" text-anchor=\"middle\">72&#176;</text><text x=\"114\" y=\"137\" font-size=\"13\" fill=\"#c0392b\" text-anchor=\"middle\">58&#176;</text></svg></div>",
    "options": [
      {
        "text": "\\(50^\\circ\\)",
        "correct": true,
        "feedback": "Correct. \\(180 - 72 - 58 = 50^\\circ\\)."
      },
      {
        "text": "\\(130^\\circ\\)",
        "correct": false,
        "feedback": "You added the two given angles (72 + 58 = 130) and stopped."
      },
      {
        "text": "\\(14^\\circ\\)",
        "correct": false,
        "feedback": "You subtracted one angle from the other (72 − 58 = 14)."
      },
      {
        "text": "\\(230^\\circ\\)",
        "correct": false,
        "feedback": "You used 360° instead of 180° (360 − 130 = 230)."
      }
    ],
    "backward": "Triangle angle sum; angles from parallel lines.",
    "forward": "Used in any parallel-lines + triangle problem."
  },
  {
    "itemId": "d2",
    "order": 2,
    "cluster": "pythagoras",
    "clusterName": "Pythagoras' theorem",
    "question": "In the diagram, the perpendicular bisector of AB meets AB at M. If AM = 24 cm and CM = 10 cm, find CB.<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 200 200\" width=\"300\" height=\"300\"><!-- AB = 48 cm at 4px/cm = 192px; M at (100,150); C at (100,110) so CM=10cm (40px); CA label AM=24cm=96px --><line x1=\"4\" y1=\"150\" x2=\"196\" y2=\"150\" stroke=\"#222\" stroke-width=\"2\"/><line x1=\"100\" y1=\"80\" x2=\"100\" y2=\"175\" stroke=\"#222\" stroke-width=\"1.5\" stroke-dasharray=\"4 4\"/><line x1=\"4\" y1=\"150\" x2=\"100\" y2=\"110\" stroke=\"#c0392b\" stroke-width=\"1.5\"/><path d=\"M 100 150 L 110 150 L 110 140 L 100 140\" fill=\"none\" stroke=\"#222\" stroke-width=\"1\"/><circle cx=\"100\" cy=\"150\" r=\"2\" fill=\"#222\"/><circle cx=\"100\" cy=\"110\" r=\"2.5\" fill=\"#c0392b\"/><text x=\"4\" y=\"165\" font-size=\"12\" text-anchor=\"middle\" fill=\"#222\">A</text><text x=\"196\" y=\"165\" font-size=\"12\" text-anchor=\"middle\" fill=\"#222\">B</text><text x=\"110\" y=\"165\" font-size=\"12\" text-anchor=\"start\" fill=\"#222\">M</text><text x=\"108\" y=\"106\" font-size=\"12\" text-anchor=\"start\" fill=\"#c0392b\">C</text><text x=\"100\" y=\"192\" font-size=\"11\" text-anchor=\"middle\" fill=\"#222\">AM = 24 cm, CM = 10 cm</text></svg></div>",
    "options": [
      {
        "text": "\\(26\\) cm",
        "correct": true,
        "feedback": "Correct. CB = CA (property of the perpendicular bisector) = \\(\\sqrt{24^2 + 10^2} = 26\\) cm."
      },
      {
        "text": "\\(24\\) cm",
        "correct": false,
        "feedback": "You gave AM."
      },
      {
        "text": "\\(34\\) cm",
        "correct": false,
        "feedback": "You added AM and CM (24 + 10 = 34)."
      },
      {
        "text": "\\(10\\) cm",
        "correct": false,
        "feedback": "You gave CM."
      }
    ],
    "backward": "Perpendicular bisector property; Pythagoras.",
    "forward": "Any point on the bisector is equidistant from A and B."
  },
  {
    "itemId": "d3",
    "order": 3,
    "cluster": "interiorPoly",
    "clusterName": "Interior angles of polygons",
    "question": "The interior angle of a regular polygon is 5 times its exterior angle. Find the number of sides.",
    "options": [
      {
        "text": "\\(12\\)",
        "correct": true,
        "feedback": "Correct. I = 5E and I + E = 180 → 6E = 180 → E = 30 → n = 360 ÷ 30 = 12."
      },
      {
        "text": "\\(30\\)",
        "correct": false,
        "feedback": "You gave the exterior angle (30°), not n."
      },
      {
        "text": "\\(5\\)",
        "correct": false,
        "feedback": "You used the ratio value (5) as the number of sides."
      },
      {
        "text": "\\(6\\)",
        "correct": false,
        "feedback": "You used \\(n = 180 \\div E\\) instead of \\(360 \\div E\\)."
      }
    ],
    "backward": "Interior + exterior; exterior sum.",
    "forward": "Used whenever a ratio of interior to exterior is given."
  },
  {
    "itemId": "d4",
    "order": 4,
    "cluster": "pythagoras",
    "clusterName": "Pythagoras' theorem",
    "question": "A right triangle has hypotenuse 30 cm and one leg 18 cm. Find its perimeter.",
    "options": [
      {
        "text": "\\(72\\) cm",
        "correct": true,
        "feedback": "Correct. Other leg = \\(\\sqrt{900 - 324} = 24\\). Perimeter = \\(30 + 18 + 24 = 72\\) cm."
      },
      {
        "text": "\\(60\\) cm",
        "correct": false,
        "feedback": "You doubled the hypotenuse (\\(2 \\times 30 = 60\\))."
      },
      {
        "text": "\\(66\\) cm",
        "correct": false,
        "feedback": "You used the leg twice (\\(30 + 18 + 18 = 66\\))."
      },
      {
        "text": "\\(48\\) cm",
        "correct": false,
        "feedback": "You omitted the unknown leg (\\(30 + 18 = 48\\))."
      }
    ],
    "backward": "Pythagoras; perimeter.",
    "forward": "Standard three‑step problem."
  },
  {
    "itemId": "d5",
    "order": 5,
    "cluster": "exteriorPoly",
    "clusterName": "Exterior angles of polygons",
    "question": "The exterior angles of a pentagon are \\(x\\), \\(2x\\), \\(3x\\), \\(4x\\), and \\(5x\\). Find \\(x\\).",
    "options": [
      {
        "text": "\\(24^\\circ\\)",
        "correct": true,
        "feedback": "Correct. Sum = \\(15x = 360^\\circ\\), \\(x = 24^\\circ\\)."
      },
      {
        "text": "\\(72^\\circ\\)",
        "correct": false,
        "feedback": "You gave \\(3x\\) (\\(3 \\times 24 = 72\\))."
      },
      {
        "text": "\\(15^\\circ\\)",
        "correct": false,
        "feedback": "You gave the sum of the coefficients (15)."
      },
      {
        "text": "\\(120^\\circ\\)",
        "correct": false,
        "feedback": "You gave \\(5x\\) (\\(5 \\times 24 = 120\\))."
      }
    ],
    "backward": "Exterior angle sum.",
    "forward": "Used whenever some exterior angles are unknown."
  },
  {
    "itemId": "d6",
    "order": 6,
    "cluster": "mixed",
    "clusterName": "Mixed geometry problems",
    "question": "A 5 m ladder reaches 4 m up a wall. A second 13 m ladder reaches 12 m up the same wall. How much farther from the wall is the second ladder's foot?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 390 215\" width=\"540\" height=\"298\"><text x=\"13\" y=\"18\" font-size=\"14\" font-weight=\"700\" fill=\"#222\">Ladder 1</text><line x1=\"66\" y1=\"175\" x2=\"140\" y2=\"175\" stroke=\"#222\" stroke-width=\"2\"/><line x1=\"130\" y1=\"111\" x2=\"130\" y2=\"175\" stroke=\"#222\" stroke-width=\"3\"/><path d=\"M 120 175 L 120 165 L 130 165\" fill=\"none\" stroke=\"#222\" stroke-width=\"1.2\"/><line x1=\"94\" y1=\"175\" x2=\"130\" y2=\"127\" stroke=\"#c0392b\" stroke-width=\"3\" stroke-linecap=\"round\"/><text x=\"106.4\" y=\"146.8\" font-size=\"14\" font-weight=\"700\" fill=\"#c0392b\" text-anchor=\"middle\" transform=\"rotate(-53.1 106.4 146.8)\">5 m</text><line x1=\"146\" y1=\"127\" x2=\"146\" y2=\"175\" stroke=\"#555\" stroke-width=\"1.2\"/><line x1=\"141\" y1=\"127\" x2=\"151\" y2=\"127\" stroke=\"#555\" stroke-width=\"1.2\"/><line x1=\"141\" y1=\"175\" x2=\"151\" y2=\"175\" stroke=\"#555\" stroke-width=\"1.2\"/><line x1=\"130\" y1=\"127\" x2=\"151\" y2=\"127\" stroke=\"#555\" stroke-width=\"0.8\" stroke-dasharray=\"2 2\"/><text x=\"155\" y=\"156\" font-size=\"14\" font-weight=\"700\" fill=\"#222\">4 m</text><line x1=\"94\" y1=\"191\" x2=\"130\" y2=\"191\" stroke=\"#555\" stroke-width=\"1.2\"/><line x1=\"94\" y1=\"186\" x2=\"94\" y2=\"196\" stroke=\"#555\" stroke-width=\"1.2\"/><line x1=\"130\" y1=\"186\" x2=\"130\" y2=\"196\" stroke=\"#555\" stroke-width=\"1.2\"/><text x=\"112\" y=\"208\" font-size=\"14\" font-weight=\"700\" fill=\"#222\" text-anchor=\"middle\">?</text><text x=\"208\" y=\"18\" font-size=\"14\" font-weight=\"700\" fill=\"#222\">Ladder 2</text><line x1=\"237\" y1=\"175\" x2=\"335\" y2=\"175\" stroke=\"#222\" stroke-width=\"2\"/><line x1=\"325\" y1=\"15\" x2=\"325\" y2=\"175\" stroke=\"#222\" stroke-width=\"3\"/><path d=\"M 315 175 L 315 165 L 325 165\" fill=\"none\" stroke=\"#222\" stroke-width=\"1.2\"/><line x1=\"265\" y1=\"175\" x2=\"325\" y2=\"31\" stroke=\"#c0392b\" stroke-width=\"3\" stroke-linecap=\"round\"/><text x=\"288.5\" y=\"100.3\" font-size=\"14\" font-weight=\"700\" fill=\"#c0392b\" text-anchor=\"middle\" transform=\"rotate(-67.4 288.5 100.3)\">13 m</text><line x1=\"341\" y1=\"31\" x2=\"341\" y2=\"175\" stroke=\"#555\" stroke-width=\"1.2\"/><line x1=\"336\" y1=\"31\" x2=\"346\" y2=\"31\" stroke=\"#555\" stroke-width=\"1.2\"/><line x1=\"336\" y1=\"175\" x2=\"346\" y2=\"175\" stroke=\"#555\" stroke-width=\"1.2\"/><line x1=\"325\" y1=\"31\" x2=\"346\" y2=\"31\" stroke=\"#555\" stroke-width=\"0.8\" stroke-dasharray=\"2 2\"/><text x=\"350\" y=\"108\" font-size=\"14\" font-weight=\"700\" fill=\"#222\">12 m</text><line x1=\"265\" y1=\"191\" x2=\"325\" y2=\"191\" stroke=\"#555\" stroke-width=\"1.2\"/><line x1=\"265\" y1=\"186\" x2=\"265\" y2=\"196\" stroke=\"#555\" stroke-width=\"1.2\"/><line x1=\"325\" y1=\"186\" x2=\"325\" y2=\"196\" stroke=\"#555\" stroke-width=\"1.2\"/><text x=\"295\" y=\"208\" font-size=\"14\" font-weight=\"700\" fill=\"#222\" text-anchor=\"middle\">?</text></svg></div>",
    "options": [
      {
        "text": "\\(2\\) m",
        "correct": true,
        "feedback": "Correct. Ladder 1 foot: \\(\\sqrt{25 - 16} = 3\\) m. Ladder 2 foot: \\(\\sqrt{169 - 144} = 5\\) m. Difference = 2 m."
      },
      {
        "text": "\\(8\\) m",
        "correct": false,
        "feedback": "You added the two distances (3 + 5 = 8)."
      },
      {
        "text": "\\(4\\) m",
        "correct": false,
        "feedback": "You gave the height of the first ladder (4 m), not the difference in foot distances."
      },
      {
        "text": "\\(12\\) m",
        "correct": false,
        "feedback": "You gave the height of the second ladder (12 m), not the difference in foot distances."
      }
    ],
    "backward": "Two Pythagoras calculations.",
    "forward": "Comparing two setups."
  },
  {
    "itemId": "d7",
    "order": 7,
    "cluster": "interiorPoly",
    "clusterName": "Interior angles of polygons",
    "question": "The angles of a quadrilateral are in the ratio \\(3:5:7:9\\). Find the largest angle.",
    "options": [
      {
        "text": "\\(135^\\circ\\)",
        "correct": true,
        "feedback": "Correct. Sum = 24 parts = 360°, so each part = 15°. Largest = \\(9 \\times 15 = 135^\\circ\\)."
      },
      {
        "text": "\\(105^\\circ\\)",
        "correct": false,
        "feedback": "You gave \\(7 \\times 15 = 105\\)."
      },
      {
        "text": "\\(75^\\circ\\)",
        "correct": false,
        "feedback": "You gave \\(5 \\times 15 = 75\\)."
      },
      {
        "text": "\\(45^\\circ\\)",
        "correct": false,
        "feedback": "You gave \\(3 \\times 15 = 45\\)."
      }
    ],
    "backward": "Quadrilateral sum; ratio reasoning.",
    "forward": "Used whenever angles are in ratio form."
  },
  {
    "itemId": "d8",
    "order": 8,
    "cluster": "pythagoras",
    "clusterName": "Pythagoras' theorem",
    "question": "The perpendicular bisector of AB meets AB at M. Points A and B are such that PA = PB = 25 cm, and AB = 30 cm. Find PM.",
    "options": [
      {
        "text": "\\(20\\) cm",
        "correct": true,
        "feedback": "Correct. AM = 15 cm. PM = \\(\\sqrt{625 - 225} = 20\\) cm."
      },
      {
        "text": "\\(15\\) cm",
        "correct": false,
        "feedback": "You gave AM."
      },
      {
        "text": "\\(25\\) cm",
        "correct": false,
        "feedback": "You gave PA."
      },
      {
        "text": "\\(40\\) cm",
        "correct": false,
        "feedback": "You doubled the correct answer."
      }
    ],
    "backward": "Perpendicular bisector property; Pythagoras.",
    "forward": "Used whenever a point on the bisector is given."
  },
  {
    "itemId": "d9",
    "order": 9,
    "cluster": "interiorPoly",
    "clusterName": "Interior angles of polygons",
    "question": "A heptagon has six equal interior angles and one interior angle of \\(120^\\circ\\). Find each of the equal interior angles.",
    "options": [
      {
        "text": "\\(130^\\circ\\)",
        "correct": true,
        "feedback": "Correct. Sum = \\(5 \\times 180 = 900^\\circ\\). \\(6y + 120 = 900\\), \\(6y = 780\\), \\(y = 130^\\circ\\)."
      },
      {
        "text": "\\(150^\\circ\\)",
        "correct": false,
        "feedback": "You divided 900 by 6 (ignoring the 120°)."
      },
      {
        "text": "\\(120^\\circ\\)",
        "correct": false,
        "feedback": "You gave the stated angle (120°)."
      },
      {
        "text": "\\(110^\\circ\\)",
        "correct": false,
        "feedback": "You subtracted the 120° angle twice: \\((900 - 240) \\div 6 = 110\\)."
      }
    ],
    "backward": "Interior angle sum.",
    "forward": "Used whenever one angle is stated and others are equal."
  },
  {
    "itemId": "d10",
    "order": 10,
    "cluster": "pythagoras",
    "clusterName": "Pythagoras' theorem",
    "question": "An isosceles triangle has two equal sides of 10 cm and a base of 12 cm. Find its area.",
    "options": [
      {
        "text": "\\(48\\text{ cm}^2\\)",
        "correct": true,
        "feedback": "Correct. Height = \\(\\sqrt{100 - 36} = 8\\). Area = \\(\\tfrac{1}{2} \\times 12 \\times 8 = 48\\text{ cm}^2\\)."
      },
      {
        "text": "\\(60\\text{ cm}^2\\)",
        "correct": false,
        "feedback": "You used the side as the height (\\(\\tfrac{1}{2} \\times 12 \\times 10 = 60\\))."
      },
      {
        "text": "\\(96\\text{ cm}^2\\)",
        "correct": false,
        "feedback": "You forgot the \\(\\tfrac{1}{2}\\) (\\(12 \\times 8 = 96\\))."
      },
      {
        "text": "\\(120\\text{ cm}^2\\)",
        "correct": false,
        "feedback": "You used side × base (\\(10 \\times 12 = 120\\))."
      }
    ],
    "backward": "Pythagoras with half the base; area formula.",
    "forward": "Used whenever a triangle's height is needed."
  },
  {
    "itemId": "d11",
    "order": 11,
    "cluster": "interiorPoly",
    "clusterName": "Interior angles of polygons",
    "question": "Each exterior angle of a regular polygon is \\(15^\\circ\\). Find the sum of its interior angles.",
    "options": [
      {
        "text": "\\(3960^\\circ\\)",
        "correct": true,
        "feedback": "Correct. n = \\(360 \\div 15 = 24\\). Sum = \\((24 - 2) \\times 180 = 3960^\\circ\\)."
      },
      {
        "text": "\\(4320^\\circ\\)",
        "correct": false,
        "feedback": "You used \\(24 \\times 180\\) (forgot the −2)."
      },
      {
        "text": "\\(3780^\\circ\\)",
        "correct": false,
        "feedback": "You used \\(21 \\times 180\\) (\\(n - 3\\), not \\(n - 2\\))."
      },
      {
        "text": "\\(3600^\\circ\\)",
        "correct": false,
        "feedback": "You used \\(20 \\times 180\\) (\\(n - 4\\), not \\(n - 2\\))."
      }
    ],
    "backward": "Exterior sum; interior sum formula.",
    "forward": "Used whenever exterior is given but interior sum is required."
  },
  {
    "itemId": "d12",
    "order": 12,
    "cluster": "pythagoras",
    "clusterName": "Pythagoras' theorem",
    "question": "In isosceles triangle ABC with AB = AC = 13 cm and BC = 10 cm, D is the midpoint of BC. Find AD.",
    "options": [
      {
        "text": "\\(12\\) cm",
        "correct": true,
        "feedback": "Correct. BD = 5. AD = \\(\\sqrt{169 - 25} = 12\\) cm."
      },
      {
        "text": "\\(13\\) cm",
        "correct": false,
        "feedback": "You gave the side length."
      },
      {
        "text": "\\(5\\) cm",
        "correct": false,
        "feedback": "You gave the half-base."
      },
      {
        "text": "\\(24\\) cm",
        "correct": false,
        "feedback": "You doubled the correct answer."
      }
    ],
    "backward": "Midpoint; Pythagoras.",
    "forward": "Used whenever a triangle's median meets the base."
  },
  {
    "itemId": "d13",
    "order": 13,
    "cluster": "angleCalc",
    "clusterName": "Angle calculations",
    "question": "In triangle ABC, angle A = 2 × angle B, and angle C = angle B + 40°. Find angle A.",
    "options": [
      {
        "text": "\\(70^\\circ\\)",
        "correct": true,
        "feedback": "Correct. Let B = x. A = 2x, C = x + 40. Sum = 4x + 40 = 180 → x = 35. A = 70°."
      },
      {
        "text": "\\(35^\\circ\\)",
        "correct": false,
        "feedback": "You gave angle B."
      },
      {
        "text": "\\(75^\\circ\\)",
        "correct": false,
        "feedback": "You gave angle C."
      },
      {
        "text": "\\(140^\\circ\\)",
        "correct": false,
        "feedback": "You doubled the correct answer."
      }
    ],
    "backward": "Triangle angle sum; algebraic setup.",
    "forward": "Used whenever angles have algebraic relationships."
  },
  {
    "itemId": "d14",
    "order": 14,
    "cluster": "pythagoras",
    "clusterName": "Pythagoras' theorem",
    "question": "The perpendicular bisector of AB meets AB at M. A point C on the perpendicular bisector has CM = 8 cm. If CA = 17 cm, find AB.",
    "options": [
      {
        "text": "\\(30\\) cm",
        "correct": true,
        "feedback": "Correct. AM = \\(\\sqrt{289 - 64} = 15\\). AB = \\(2 \\times 15 = 30\\) cm."
      },
      {
        "text": "\\(15\\) cm",
        "correct": false,
        "feedback": "You gave AM, not AB."
      },
      {
        "text": "\\(17\\) cm",
        "correct": false,
        "feedback": "You gave CA."
      },
      {
        "text": "\\(16\\) cm",
        "correct": false,
        "feedback": "You doubled CM (2 × 8 = 16), but AB = 2 × AM, not 2 × CM."
      }
    ],
    "backward": "Perpendicular bisector property; Pythagoras.",
    "forward": "Used whenever the perpendicular bisector's midpoint property is needed."
  },
  {
    "itemId": "d15",
    "order": 15,
    "cluster": "interiorPoly",
    "clusterName": "Interior angles of polygons",
    "question": "The sum of the interior angles of a polygon is \\(1800^\\circ\\). Find each exterior angle if the polygon is regular.",
    "options": [
      {
        "text": "\\(30^\\circ\\)",
        "correct": true,
        "feedback": "Correct. n − 2 = 10 → n = 12. Exterior = \\(360 \\div 12 = 30^\\circ\\)."
      },
      {
        "text": "\\(150^\\circ\\)",
        "correct": false,
        "feedback": "You gave the interior angle (\\(180 - 30 = 150\\))."
      },
      {
        "text": "\\(12^\\circ\\)",
        "correct": false,
        "feedback": "You gave n (12)."
      },
      {
        "text": "\\(72^\\circ\\)",
        "correct": false,
        "feedback": "You mis-read the interior sum as 540° (a pentagon) instead of 1800°: \\(360 \\div 5 = 72\\)."
      }
    ],
    "backward": "Interior sum formula; exterior sum.",
    "forward": "Used whenever two formulas must be combined."
  },
  {
    "itemId": "d16",
    "order": 16,
    "cluster": "pythagoras",
    "clusterName": "Pythagoras' theorem",
    "question": "The two legs of a right triangle are in the ratio \\(3:4\\) and the hypotenuse is 25 cm. Find the longer leg.",
    "options": [
      {
        "text": "\\(20\\) cm",
        "correct": true,
        "feedback": "Correct. Legs are 3k and 4k. \\((3k)^2 + (4k)^2 = 625\\), \\(25k^2 = 625\\), \\(k = 5\\). Longer leg = \\(4 \\times 5 = 20\\) cm."
      },
      {
        "text": "\\(15\\) cm",
        "correct": false,
        "feedback": "You gave the shorter leg (\\(3 \\times 5 = 15\\))."
      },
      {
        "text": "\\(16\\) cm",
        "correct": false,
        "feedback": "You used \\(k = 4\\) instead of \\(k = 5\\): \\(4 \\times 4 = 16\\)."
      },
      {
        "text": "\\(24\\) cm",
        "correct": false,
        "feedback": "You used \\(k = 6\\) instead of \\(k = 5\\): \\(4 \\times 6 = 24\\)."
      }
    ],
    "backward": "Ratio + Pythagoras.",
    "forward": "Used whenever sides are in a known ratio."
  },
  {
    "itemId": "d17",
    "order": 17,
    "cluster": "exteriorPoly",
    "clusterName": "Exterior angles of polygons",
    "question": "The exterior angles of a polygon are \\(25^\\circ\\), \\(35^\\circ\\), \\(45^\\circ\\), \\(55^\\circ\\), \\(65^\\circ\\), \\(75^\\circ\\), and \\(x\\). Find \\(x\\).",
    "options": [
      {
        "text": "\\(60^\\circ\\)",
        "correct": true,
        "feedback": "Correct. Sum of known = 300°. \\(x = 360 - 300 = 60^\\circ\\)."
      },
      {
        "text": "\\(50^\\circ\\)",
        "correct": false,
        "feedback": "You used the sum as 350."
      },
      {
        "text": "\\(70^\\circ\\)",
        "correct": false,
        "feedback": "You used the sum as 370."
      },
      {
        "text": "\\(300^\\circ\\)",
        "correct": false,
        "feedback": "You gave the sum of the known angles (300)."
      }
    ],
    "backward": "Exterior angle sum.",
    "forward": "Used whenever some exterior angles are unknown."
  },
  {
    "itemId": "d18",
    "order": 18,
    "cluster": "pythagoras",
    "clusterName": "Pythagoras' theorem",
    "question": "A rectangle is 8 cm by 6 cm. A single diagonal is drawn, splitting the rectangle into two triangles. Find the sum of the perimeters of the two triangles.<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 200 190\" width=\"300\" height=\"285\"><!-- Rectangle 8 cm x 6 cm, scale 15 px/cm: 120 x 90 px; anchored at (40,60) to (160,150) --><polygon points=\"40,60 160,60 160,150 40,150\" fill=\"none\" stroke=\"#222\" stroke-width=\"2\"/><line x1=\"40\" y1=\"60\" x2=\"160\" y2=\"150\" stroke=\"#c0392b\" stroke-width=\"2\"/><text x=\"100\" y=\"175\" font-size=\"13\" text-anchor=\"middle\" fill=\"#222\">8 cm</text><text x=\"33\" y=\"110\" font-size=\"13\" text-anchor=\"end\" fill=\"#222\">6 cm</text></svg></div>",
    "options": [
      {
        "text": "\\(48\\) cm",
        "correct": true,
        "feedback": "Correct. Diagonal = 10. Each triangle perimeter = \\(8 + 6 + 10 = 24\\). Total = \\(2 \\times 24 = 48\\) cm."
      },
      {
        "text": "\\(38\\) cm",
        "correct": false,
        "feedback": "You added the diagonal only once (\\(28 + 10 = 38\\))."
      },
      {
        "text": "\\(28\\) cm",
        "correct": false,
        "feedback": "You gave the rectangle's perimeter (28)."
      },
      {
        "text": "\\(58\\) cm",
        "correct": false,
        "feedback": "You added an extra 10 (\\(48 + 10 = 58\\))."
      }
    ],
    "backward": "Pythagoras; perimeter.",
    "forward": "Used in composite perimeter problems."
  },
  {
    "itemId": "d19",
    "order": 19,
    "cluster": "angleCalc",
    "clusterName": "Angle calculations",
    "question": "In triangle ABC, angle A = 2 × angle B, and angle C = angle A + angle B. Find angle A.",
    "options": [
      {
        "text": "\\(60^\\circ\\)",
        "correct": true,
        "feedback": "Correct. Let B = x, A = 2x, C = 3x. Sum = 6x = 180 → x = 30. A = 60°."
      },
      {
        "text": "\\(30^\\circ\\)",
        "correct": false,
        "feedback": "You gave angle B."
      },
      {
        "text": "\\(90^\\circ\\)",
        "correct": false,
        "feedback": "You gave angle C."
      },
      {
        "text": "\\(120^\\circ\\)",
        "correct": false,
        "feedback": "You doubled the correct answer."
      }
    ],
    "backward": "Triangle angle sum; algebraic setup.",
    "forward": "Used whenever multiple relationships are stated."
  },
  {
    "itemId": "d20",
    "order": 20,
    "cluster": "pythagoras",
    "clusterName": "Pythagoras' theorem",
    "question": "The perpendicular bisector of AB meets AB at M. Points A and B are such that PA = PB = 10 cm, and AB = 16 cm. Find PM.",
    "options": [
      {
        "text": "\\(6\\) cm",
        "correct": true,
        "feedback": "Correct. AM = 8 cm. \\(PM^2 = 100 - 64 = 36\\), \\(PM = 6\\) cm."
      },
      {
        "text": "\\(8\\) cm",
        "correct": false,
        "feedback": "You gave AM."
      },
      {
        "text": "\\(10\\) cm",
        "correct": false,
        "feedback": "You gave PA."
      },
      {
        "text": "\\(12\\) cm",
        "correct": false,
        "feedback": "You doubled the correct answer."
      }
    ],
    "backward": "Perpendicular bisector property; Pythagoras.",
    "forward": "Standard configuration."
  },
  {
    "itemId": "d21",
    "order": 21,
    "cluster": "interiorPoly",
    "clusterName": "Interior angles of polygons",
    "question": "The interior angle of a regular polygon is \\(162^\\circ\\). Find the number of sides.",
    "options": [
      {
        "text": "\\(20\\)",
        "correct": true,
        "feedback": "Correct. Exterior = \\(180 - 162 = 18^\\circ\\); n = \\(360 \\div 18 = 20\\)."
      },
      {
        "text": "\\(18\\)",
        "correct": false,
        "feedback": "You gave \\(n - 2\\)."
      },
      {
        "text": "\\(19\\)",
        "correct": false,
        "feedback": "You added 1 instead of 2."
      },
      {
        "text": "\\(15\\)",
        "correct": false,
        "feedback": "You used exterior = 24°."
      }
    ],
    "backward": "Interior + exterior; exterior sum.",
    "forward": "Used whenever the interior angle is given."
  },
  {
    "itemId": "d22",
    "order": 22,
    "cluster": "mixed",
    "clusterName": "Mixed geometry problems",
    "question": "Two right triangles have hypotenuse 25 cm. Triangle 1 has one leg 7 cm. Triangle 2 has one leg 15 cm. Which triangle has the longer other leg, and by how much?",
    "options": [
      {
        "text": "Triangle 1, by 4 cm",
        "correct": true,
        "feedback": "Correct. Triangle 1: \\(\\sqrt{625 - 49} = 24\\) cm. Triangle 2: \\(\\sqrt{625 - 225} = 20\\) cm. Difference = 4 cm."
      },
      {
        "text": "Triangle 2, by 4 cm",
        "correct": false,
        "feedback": "You reversed the comparison."
      },
      {
        "text": "Triangle 1, by 8 cm",
        "correct": false,
        "feedback": "You subtracted each given leg from its hypotenuse (25 − 7 = 18 and 25 − 15 = 10) and compared the differences: 18 − 10 = 8."
      },
      {
        "text": "Triangle 2, by 8 cm",
        "correct": false,
        "feedback": "You reversed the comparison and subtracted each given leg from its hypotenuse."
      }
    ],
    "backward": "Two Pythagoras; comparison.",
    "forward": "Used whenever two setups must be compared."
  },
  {
    "itemId": "d23",
    "order": 23,
    "cluster": "exteriorPoly",
    "clusterName": "Exterior angles of polygons",
    "question": "Two exterior angles of a pentagon are \\(90^\\circ\\) each, and the other three are equal. Find one of the equal exterior angles.",
    "options": [
      {
        "text": "\\(60^\\circ\\)",
        "correct": true,
        "feedback": "Correct. Sum of exterior = 360°. \\(180 + 3x = 360\\), \\(3x = 180\\), \\(x = 60^\\circ\\)."
      },
      {
        "text": "\\(90^\\circ\\)",
        "correct": false,
        "feedback": "You gave the given angle (90°)."
      },
      {
        "text": "\\(120^\\circ\\)",
        "correct": false,
        "feedback": "You doubled the correct answer."
      },
      {
        "text": "\\(30^\\circ\\)",
        "correct": false,
        "feedback": "You divided 90 by 3."
      }
    ],
    "backward": "Exterior sum.",
    "forward": "Used whenever some exterior angles are known."
  },
  {
    "itemId": "d24",
    "order": 24,
    "cluster": "pythagoras",
    "clusterName": "Pythagoras' theorem",
    "question": "An isosceles right triangle has hypotenuse \\(10\\sqrt{2}\\) cm. Find its area.",
    "options": [
      {
        "text": "\\(50\\text{ cm}^2\\)",
        "correct": true,
        "feedback": "Correct. \\(2L^2 = (10\\sqrt{2})^2 = 200\\), \\(L^2 = 100\\), \\(L = 10\\). Area = \\(\\tfrac{1}{2} \\times 10 \\times 10 = 50\\text{ cm}^2\\)."
      },
      {
        "text": "\\(100\\text{ cm}^2\\)",
        "correct": false,
        "feedback": "You used \\(c^2 \\div 2 = 100\\) as the area."
      },
      {
        "text": "\\(200\\text{ cm}^2\\)",
        "correct": false,
        "feedback": "You used \\(c^2 = 200\\) as the area."
      },
      {
        "text": "\\(12.5\\text{ cm}^2\\)",
        "correct": false,
        "feedback": "You halved the hypotenuse coefficient (using \\(c = 5\\sqrt{2}\\) instead of \\(10\\sqrt{2}\\)), giving \\(L = 5\\) and area \\(12.5\\)."
      }
    ],
    "backward": "Pythagoras on an isosceles right triangle; area.",
    "forward": "Used whenever the hypotenuse is given as a surd."
  }
];

const recheckItems = [
  {
    "itemId": "r1",
    "order": 1,
    "cluster": "angleCalc",
    "clusterName": "Angle calculations",
    "question": "The angles of a triangle are in the ratio \\(3:4:5\\). Find the largest angle.",
    "options": [
      {
        "text": "\\(75^\\circ\\)",
        "correct": true,
        "feedback": "Correct. 12 parts = 180°, each = 15°. Largest = \\(5 \\times 15 = 75^\\circ\\). (bw: Triangle angle sum; ratio.)"
      },
      {
        "text": "\\(60^\\circ\\)",
        "correct": false,
        "feedback": "You gave the middle angle (\\(4 \\times 15 = 60\\))."
      },
      {
        "text": "\\(45^\\circ\\)",
        "correct": false,
        "feedback": "You gave the smallest angle (\\(3 \\times 15 = 45\\))."
      },
      {
        "text": "\\(90^\\circ\\)",
        "correct": false,
        "feedback": "You used the ratio \\(1:2:3\\) instead of \\(3:4:5\\)."
      }
    ]
  },
  {
    "itemId": "r2",
    "order": 2,
    "cluster": "pythagoras",
    "clusterName": "Pythagoras' theorem",
    "question": "The perpendicular bisector of AB meets AB at M. Points A and B are such that PA = PB = 25 cm, and AB = 40 cm. Find PM.",
    "options": [
      {
        "text": "\\(15\\) cm",
        "correct": true,
        "feedback": "Correct. AM = 20 cm. PM = \\(\\sqrt{625 - 400} = 15\\) cm. (bw: Perpendicular bisector; Pythagoras.)"
      },
      {
        "text": "\\(20\\) cm",
        "correct": false,
        "feedback": "You gave AM."
      },
      {
        "text": "\\(25\\) cm",
        "correct": false,
        "feedback": "You gave PA."
      },
      {
        "text": "\\(30\\) cm",
        "correct": false,
        "feedback": "You doubled the correct answer."
      }
    ]
  },
  {
    "itemId": "r3",
    "order": 3,
    "cluster": "interiorPoly",
    "clusterName": "Interior angles of polygons",
    "question": "Each exterior angle of a regular polygon is \\(36^\\circ\\). Find each interior angle.",
    "options": [
      {
        "text": "\\(144^\\circ\\)",
        "correct": true,
        "feedback": "Correct. \\(180 - 36 = 144^\\circ\\). (bw: Interior + exterior.)"
      },
      {
        "text": "\\(36^\\circ\\)",
        "correct": false,
        "feedback": "You gave the exterior angle."
      },
      {
        "text": "\\(10^\\circ\\)",
        "correct": false,
        "feedback": "You gave n (10)."
      },
      {
        "text": "\\(324^\\circ\\)",
        "correct": false,
        "feedback": "You subtracted the exterior from 360° instead of 180° (\\(360 - 36 = 324\\))."
      }
    ]
  },
  {
    "itemId": "r4",
    "order": 4,
    "cluster": "pythagoras",
    "clusterName": "Pythagoras' theorem",
    "question": "A right triangle has hypotenuse 41 cm and one leg 9 cm. Find its perimeter.",
    "options": [
      {
        "text": "\\(90\\) cm",
        "correct": true,
        "feedback": "Correct. Other leg = 40. Perimeter = \\(41 + 9 + 40 = 90\\) cm. (bw: Pythagoras; perimeter.)"
      },
      {
        "text": "\\(82\\) cm",
        "correct": false,
        "feedback": "You doubled the hypotenuse (\\(2 \\times 41 = 82\\))."
      },
      {
        "text": "\\(50\\) cm",
        "correct": false,
        "feedback": "You omitted the unknown leg (\\(41 + 9 = 50\\))."
      },
      {
        "text": "\\(49\\) cm",
        "correct": false,
        "feedback": "You gave the sum of the two legs (\\(40 + 9 = 49\\))."
      }
    ]
  },
  {
    "itemId": "r5",
    "order": 5,
    "cluster": "exteriorPoly",
    "clusterName": "Exterior angles of polygons",
    "question": "The exterior angles of a pentagon are \\(40^\\circ\\), \\(50^\\circ\\), \\(60^\\circ\\), \\(70^\\circ\\), and \\(x\\). Find \\(x\\).",
    "options": [
      {
        "text": "\\(140^\\circ\\)",
        "correct": true,
        "feedback": "Correct. Sum of known = 220°. \\(x = 360 - 220 = 140^\\circ\\). (bw: Exterior angle sum.)"
      },
      {
        "text": "\\(220^\\circ\\)",
        "correct": false,
        "feedback": "You gave the sum of the known angles (220)."
      },
      {
        "text": "\\(120^\\circ\\)",
        "correct": false,
        "feedback": "You used the sum as 340 (\\(340 - 220 = 120\\))."
      },
      {
        "text": "\\(100^\\circ\\)",
        "correct": false,
        "feedback": "You used the sum as 320 (\\(320 - 220 = 100\\))."
      }
    ]
  },
  {
    "itemId": "r6",
    "order": 6,
    "cluster": "mixed",
    "clusterName": "Mixed geometry problems",
    "question": "A 13 m ladder reaches 12 m up a wall. A 25 m ladder reaches 20 m up the same wall. How much farther is the second ladder's foot from the wall?",
    "options": [
      {
        "text": "\\(10\\) m",
        "correct": true,
        "feedback": "Correct. First foot: \\(\\sqrt{169 - 144} = 5\\) m. Second foot: \\(\\sqrt{625 - 400} = 15\\) m. Difference = 10 m. (bw: Two Pythagoras calculations; comparison.)"
      },
      {
        "text": "\\(20\\) m",
        "correct": false,
        "feedback": "You added the two distances (5 + 15 = 20)."
      },
      {
        "text": "\\(5\\) m",
        "correct": false,
        "feedback": "You gave the first ladder's foot distance (5 m)."
      },
      {
        "text": "\\(15\\) m",
        "correct": false,
        "feedback": "You gave the second ladder's foot distance (15 m)."
      }
    ]
  },
  {
    "itemId": "r7",
    "order": 7,
    "cluster": "angleCalc",
    "clusterName": "Angle calculations",
    "question": "In triangle ABC, angle B = angle C, and angle A = angle B + 30°. Find angle A.",
    "options": [
      {
        "text": "\\(80^\\circ\\)",
        "correct": true,
        "feedback": "Correct. Let B = C = x, A = x + 30. Sum = 3x + 30 = 180 → x = 50. A = 80°. (bw: Triangle angle sum; algebraic setup.)"
      },
      {
        "text": "\\(50^\\circ\\)",
        "correct": false,
        "feedback": "You gave angle B."
      },
      {
        "text": "\\(100^\\circ\\)",
        "correct": false,
        "feedback": "You doubled the correct answer."
      },
      {
        "text": "\\(60^\\circ\\)",
        "correct": false,
        "feedback": "You solved \\(3x = 180\\), giving \\(x = 60\\)."
      }
    ]
  },
  {
    "itemId": "r8",
    "order": 8,
    "cluster": "pythagoras",
    "clusterName": "Pythagoras' theorem",
    "question": "The perpendicular bisector of AB meets AB at M. A point C on the perpendicular bisector has CB = 13 cm. If AM = 5 cm, find CM.",
    "options": [
      {
        "text": "\\(12\\) cm",
        "correct": true,
        "feedback": "Correct. CM = \\(\\sqrt{169 - 25} = 12\\) cm. (bw: Perpendicular bisector; Pythagoras.)"
      },
      {
        "text": "\\(5\\) cm",
        "correct": false,
        "feedback": "You gave AM."
      },
      {
        "text": "\\(13\\) cm",
        "correct": false,
        "feedback": "You gave CB."
      },
      {
        "text": "\\(8\\) cm",
        "correct": false,
        "feedback": "You subtracted AM from CB (\\(13 - 5 = 8\\))."
      }
    ]
  },
  {
    "itemId": "r9",
    "order": 9,
    "cluster": "interiorPoly",
    "clusterName": "Interior angles of polygons",
    "question": "A polygon has 15 sides. Find the sum of its interior angles.",
    "options": [
      {
        "text": "\\(2340^\\circ\\)",
        "correct": true,
        "feedback": "Correct. \\((15 - 2) \\times 180 = 2340^\\circ\\). (bw: Interior angle sum formula.)"
      },
      {
        "text": "\\(2700^\\circ\\)",
        "correct": false,
        "feedback": "You used \\(15 \\times 180\\) (forgot the −2)."
      },
      {
        "text": "\\(2160^\\circ\\)",
        "correct": false,
        "feedback": "You used \\(12 \\times 180\\) (\\(n - 3\\), not \\(n - 2\\))."
      },
      {
        "text": "\\(2520^\\circ\\)",
        "correct": false,
        "feedback": "You used \\(14 \\times 180\\) (\\(n - 1\\), not \\(n - 2\\))."
      }
    ]
  },
  {
    "itemId": "r10",
    "order": 10,
    "cluster": "pythagoras",
    "clusterName": "Pythagoras' theorem",
    "question": "A right triangle has hypotenuse 25 cm and one leg 15 cm. Find its perimeter.",
    "options": [
      {
        "text": "\\(60\\) cm",
        "correct": true,
        "feedback": "Correct. Other leg = \\(\\sqrt{625 - 225} = 20\\). Perimeter = \\(25 + 15 + 20 = 60\\) cm. (bw: Pythagoras; perimeter.)"
      },
      {
        "text": "\\(50\\) cm",
        "correct": false,
        "feedback": "You doubled the hypotenuse (\\(2 \\times 25 = 50\\))."
      },
      {
        "text": "\\(40\\) cm",
        "correct": false,
        "feedback": "You omitted the unknown leg (\\(25 + 15 = 40\\))."
      },
      {
        "text": "\\(120\\) cm",
        "correct": false,
        "feedback": "You doubled the perimeter (\\(2 \\times 60 = 120\\))."
      }
    ]
  },
  {
    "itemId": "r11",
    "order": 11,
    "cluster": "interiorPoly",
    "clusterName": "Interior angles of polygons",
    "question": "The interior angle of a regular polygon is \\(170^\\circ\\). Find the number of sides.",
    "options": [
      {
        "text": "\\(36\\)",
        "correct": true,
        "feedback": "Correct. Exterior = \\(10^\\circ\\); n = \\(360 \\div 10 = 36\\). (bw: Interior + exterior; exterior sum.)"
      },
      {
        "text": "\\(18\\)",
        "correct": false,
        "feedback": "You halved the correct answer."
      },
      {
        "text": "\\(10\\)",
        "correct": false,
        "feedback": "You gave the exterior angle (\\(10^\\circ\\))."
      },
      {
        "text": "\\(34\\)",
        "correct": false,
        "feedback": "You gave \\(n - 2\\)."
      }
    ]
  },
  {
    "itemId": "r12",
    "order": 12,
    "cluster": "pythagoras",
    "clusterName": "Pythagoras' theorem",
    "question": "An isosceles triangle has equal sides of 17 cm and a base of 16 cm. Find its area.",
    "options": [
      {
        "text": "\\(120\\text{ cm}^2\\)",
        "correct": true,
        "feedback": "Correct. Height = \\(\\sqrt{289 - 64} = 15\\). Area = \\(\\tfrac{1}{2} \\times 16 \\times 15 = 120\\text{ cm}^2\\). (bw: Pythagoras with half the base; area formula.)"
      },
      {
        "text": "\\(240\\text{ cm}^2\\)",
        "correct": false,
        "feedback": "You forgot the \\(\\tfrac{1}{2}\\) (\\(16 \\times 15 = 240\\))."
      },
      {
        "text": "\\(136\\text{ cm}^2\\)",
        "correct": false,
        "feedback": "You used the side × half-base (\\(17 \\times 8 = 136\\))."
      },
      {
        "text": "\\(60\\text{ cm}^2\\)",
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
    title: "Angles — Problem-Solving & Synthesis",
    subtitle: "Grade 8 · Level 3 · Problem-Solving & Synthesis",
    description: "Multi-step reasoning combining angle facts, polygon angle formulas, Pythagoras, and geometric properties in unfamiliar configurations — warm-up, diagnostic, and spaced recheck for synthesis-level fluency.",
    clusterNames: CLUSTER_NAMES,
    gateReviewHTML: "<p>You’ve finished the warm‑up. The next 24 questions are the Problem‑Solving & Synthesis diagnostic for angles. Each question asks you to construct your own path — combine ideas from different topics, reason through multi‑step problems, and decide which method to apply. Some items include diagrams — read each one carefully. Take your time, build each solution step by step, and use the feedback to deepen your understanding.</p>",
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

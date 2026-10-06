// seed/mathSeedCh5AnglesL2.js
//
// Populates math_chapters and math_questions with Grade 8, Chapter 5
// (Angles), Level 2 — converted from the standalone diagnostic
// JSON ch5-angles-level-2.json. Diagrams are inlined as SVG HTML
// directly in each question's text (the schema has no separate diagram
// field, and question text is already rendered as raw HTML).
//
// Run with: node seed/mathSeedCh5AnglesL2.js

const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-8";
const GRADE_LABEL = "Grade 8";
const CHAPTER_SLUG = "ch-5-angles";
const CHAPTER_NAME = "Angles";
const LEVEL = 2;

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
    "cluster": "angleCalc",
    "clusterName": "Angle calculations",
    "question": "In a triangle, two interior angles are \\(45^\\circ\\) and \\(65^\\circ\\). The exterior angle at the third vertex is \\(x\\). Find \\(x\\).",
    "options": [
      {
        "text": "\\(110^\\circ\\)",
        "correct": true,
        "feedback": "Correct. Exterior angle = sum of the two opposite interior angles: \\(45 + 65 = 110^\\circ\\)."
      },
      {
        "text": "\\(70^\\circ\\)",
        "correct": false,
        "feedback": "You found the third interior angle (\\(180 - 45 - 65 = 70\\)) instead of the exterior angle."
      },
      {
        "text": "\\(180^\\circ\\)",
        "correct": false,
        "feedback": "You used the straight-line fact wrongly — the exterior angle is not 180° unless the interior angle is 0."
      },
      {
        "text": "\\(20^\\circ\\)",
        "correct": false,
        "feedback": "You subtracted 45 from 65."
      }
    ],
    "retryHint": "Exterior angle of a triangle = sum of the two opposite interior angles.",
    "backward": "Exterior angle theorem.",
    "forward": "The same relation gives the third angle when the exterior is known."
  },
  {
    "itemId": "w2",
    "order": 2,
    "cluster": "interiorPoly",
    "clusterName": "Interior angles of polygons",
    "question": "A pentagon has interior angles \\(100^\\circ\\), \\(110^\\circ\\), \\(120^\\circ\\), \\(130^\\circ\\), and \\(x\\). Find \\(x\\).",
    "options": [
      {
        "text": "\\(80^\\circ\\)",
        "correct": true,
        "feedback": "Correct. Sum = \\((5 - 2) \\times 180 = 540^\\circ\\). \\(x = 540 - 100 - 110 - 120 - 130 = 80^\\circ\\)."
      },
      {
        "text": "\\(100^\\circ\\)",
        "correct": false,
        "feedback": "You miscalculated the sum of the interior angles as 560° instead of 540°."
      },
      {
        "text": "\\(540^\\circ\\)",
        "correct": false,
        "feedback": "You gave the sum, not the missing angle."
      },
      {
        "text": "\\(90^\\circ\\)",
        "correct": false,
        "feedback": "You assumed the missing angle was a right angle."
      }
    ],
    "retryHint": "Find the sum of interior angles first, then subtract the known values.",
    "backward": "Interior angle sum.",
    "forward": "Used whenever one angle of a polygon is unknown."
  },
  {
    "itemId": "w3",
    "order": 3,
    "cluster": "interiorPoly",
    "clusterName": "Interior angles of polygons",
    "question": "Each interior angle of a regular polygon is \\(150^\\circ\\). How many sides does it have?",
    "options": [
      {
        "text": "\\(12\\)",
        "correct": true,
        "feedback": "Correct. Exterior angle = \\(180 - 150 = 30^\\circ\\); sides = \\(360 \\div 30 = 12\\)."
      },
      {
        "text": "\\(10\\)",
        "correct": false,
        "feedback": "You used exterior = 36° instead of 30°: \\(360 \\div 36 = 10\\)."
      },
      {
        "text": "\\(6\\)",
        "correct": false,
        "feedback": "You may have mis-read the interior angle as 120° (which would give exterior 60° and 6 sides)."
      },
      {
        "text": "\\(15\\)",
        "correct": false,
        "feedback": "You used exterior = 24° instead of 30°: \\(360 \\div 24 = 15\\)."
      }
    ],
    "retryHint": "First find the exterior angle (\\(180 - \\text{interior}\\)), then divide 360 by it.",
    "backward": "Interior + exterior = 180°; exterior sum = 360°.",
    "forward": "Used to identify polygons from angle data."
  },
  {
    "itemId": "w4",
    "order": 4,
    "cluster": "pythagoras",
    "clusterName": "Pythagoras' theorem",
    "question": "A rectangle has length 12 cm and diagonal 13 cm. Find its perimeter.",
    "options": [
      {
        "text": "\\(34\\) cm",
        "correct": true,
        "feedback": "Correct. Width = \\(\\sqrt{13^2 - 12^2} = \\sqrt{25} = 5\\). Perimeter = \\(2(12+5) = 34\\) cm."
      },
      {
        "text": "\\(17\\) cm",
        "correct": false,
        "feedback": "You gave the semi-perimeter (\\(12 + 5 = 17\\)) instead of the full perimeter."
      },
      {
        "text": "\\(25\\) cm",
        "correct": false,
        "feedback": "You added the length and the diagonal (\\(12 + 13 = 25\\))."
      },
      {
        "text": "\\(26\\) cm",
        "correct": false,
        "feedback": "You doubled the diagonal (\\(2 \\times 13 = 26\\))."
      }
    ],
    "retryHint": "Find the width first with Pythagoras, then use the perimeter formula.",
    "backward": "Pythagoras with the hypotenuse known.",
    "forward": "Used whenever a rectangle's diagonal is given."
  },
  {
    "itemId": "w5",
    "order": 5,
    "cluster": "angleCalc",
    "clusterName": "Angle calculations",
    "question": "In isosceles triangle ABC with AB = AC, the apex angle A is \\(40^\\circ\\). Find the exterior angle at B.",
    "options": [
      {
        "text": "\\(110^\\circ\\)",
        "correct": true,
        "feedback": "Correct. Base angles = \\((180 - 40) \\div 2 = 70^\\circ\\). Exterior at B = \\(180 - 70 = 110^\\circ\\)."
      },
      {
        "text": "\\(70^\\circ\\)",
        "correct": false,
        "feedback": "You stopped at the base angle."
      },
      {
        "text": "\\(140^\\circ\\)",
        "correct": false,
        "feedback": "You doubled the base angle."
      },
      {
        "text": "\\(40^\\circ\\)",
        "correct": false,
        "feedback": "You gave the apex angle."
      }
    ],
    "retryHint": "Find the base angle first, then the exterior angle.",
    "backward": "Isosceles base angles; straight-line fact.",
    "forward": "Used in any isosceles triangle with an exterior angle."
  },
  {
    "itemId": "w6",
    "order": 6,
    "cluster": "pythagoras",
    "clusterName": "Pythagoras' theorem",
    "question": "The perpendicular bisector of AB, with AB = 12 cm, meets AB at M. A point P on the perpendicular bisector is 8 cm from M. Find AP.<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 200 190\" width=\"300\" height=\"285\"><!-- AB = 12 cm (scale 10 px/cm); PM = 8 cm; AP = 10 cm --><line x1=\"40\" y1=\"140\" x2=\"160\" y2=\"140\" stroke=\"#222\" stroke-width=\"2\"/><line x1=\"100\" y1=\"40\" x2=\"100\" y2=\"165\" stroke=\"#222\" stroke-width=\"1.5\" stroke-dasharray=\"4 4\"/><line x1=\"40\" y1=\"140\" x2=\"100\" y2=\"60\" stroke=\"#c0392b\" stroke-width=\"1.5\"/><path d=\"M 100 140 L 110 140 L 110 130 L 100 130\" fill=\"none\" stroke=\"#222\" stroke-width=\"1\"/><circle cx=\"100\" cy=\"140\" r=\"2\" fill=\"#222\"/><circle cx=\"100\" cy=\"60\" r=\"2.5\" fill=\"#c0392b\"/><text x=\"40\" y=\"156\" font-size=\"13\" text-anchor=\"middle\" fill=\"#222\">A</text><text x=\"160\" y=\"156\" font-size=\"13\" text-anchor=\"middle\" fill=\"#222\">B</text><text x=\"110\" y=\"155\" font-size=\"13\" text-anchor=\"start\" fill=\"#222\">M</text><text x=\"108\" y=\"56\" font-size=\"13\" text-anchor=\"start\" fill=\"#c0392b\">P</text><text x=\"100\" y=\"182\" font-size=\"12\" text-anchor=\"middle\" fill=\"#222\">AB = 12 cm, PM = 8 cm</text></svg></div>",
    "options": [
      {
        "text": "\\(10\\) cm",
        "correct": true,
        "feedback": "Correct. AM = 6 cm (midpoint). \\(AP^2 = 6^2 + 8^2 = 100\\), \\(AP = 10\\) cm."
      },
      {
        "text": "\\(14\\) cm",
        "correct": false,
        "feedback": "You added \\(6 + 8\\)."
      },
      {
        "text": "\\(8\\) cm",
        "correct": false,
        "feedback": "You used PM as AP."
      },
      {
        "text": "\\(20\\) cm",
        "correct": false,
        "feedback": "You used \\(2 \\times 10\\)."
      }
    ],
    "retryHint": "First find AM as half of AB, then use Pythagoras with PM.",
    "backward": "Midpoint property; Pythagoras.",
    "forward": "This is the defining property of the perpendicular bisector."
  },
  {
    "itemId": "w7",
    "order": 7,
    "cluster": "interiorPoly",
    "clusterName": "Interior angles of polygons",
    "question": "The sum of the interior angles of a polygon is \\(1260^\\circ\\). How many sides does it have?",
    "options": [
      {
        "text": "\\(9\\)",
        "correct": true,
        "feedback": "Correct. \\((n - 2) \\times 180 = 1260\\), \\(n - 2 = 7\\), \\(n = 9\\)."
      },
      {
        "text": "\\(7\\)",
        "correct": false,
        "feedback": "You stopped at \\(n - 2 = 7\\) and gave 7."
      },
      {
        "text": "\\(10\\)",
        "correct": false,
        "feedback": "You added 3 instead of 2: \\(n = 7 + 3 = 10\\)."
      },
      {
        "text": "\\(11\\)",
        "correct": false,
        "feedback": "You added 4 instead of 2: \\(n = 7 + 4 = 11\\)."
      }
    ],
    "retryHint": "Divide the sum by 180, then add 2.",
    "backward": "Interior angle sum formula.",
    "forward": "Used to identify a polygon from its angle sum."
  },
  {
    "itemId": "w8",
    "order": 8,
    "cluster": "pythagoras",
    "clusterName": "Pythagoras' theorem",
    "question": "A right triangle has legs of length 9 cm and 12 cm. Find its perimeter.",
    "options": [
      {
        "text": "\\(36\\) cm",
        "correct": true,
        "feedback": "Correct. Hypotenuse = \\(\\sqrt{81 + 144} = 15\\). Perimeter = \\(9 + 12 + 15 = 36\\) cm."
      },
      {
        "text": "\\(15\\) cm",
        "correct": false,
        "feedback": "You gave only the hypotenuse (15), not the perimeter."
      },
      {
        "text": "\\(21\\) cm",
        "correct": false,
        "feedback": "You added only the two legs (\\(9 + 12 = 21\\))."
      },
      {
        "text": "\\(108\\) cm",
        "correct": false,
        "feedback": "You multiplied the two legs (\\(9 \\times 12 = 108\\))."
      }
    ],
    "retryHint": "Find the hypotenuse first, then add all three sides.",
    "backward": "Pythagoras.",
    "forward": "Any triangle perimeter problem with an unknown side."
  }
];

const diagnosticItems = [
  {
    "itemId": "d1",
    "order": 1,
    "cluster": "angleCalc",
    "clusterName": "Angle calculations",
    "question": "In a triangle, the exterior angle at one vertex is \\(130^\\circ\\). One of the opposite interior angles is \\(45^\\circ\\). Find the other opposite interior angle.",
    "options": [
      {
        "text": "\\(85^\\circ\\)",
        "correct": true,
        "feedback": "Correct. Exterior = sum of two opposite interior: \\(130 = 45 + x\\), \\(x = 85^\\circ\\)."
      },
      {
        "text": "\\(50^\\circ\\)",
        "correct": false,
        "feedback": "You subtracted the exterior from 180."
      },
      {
        "text": "\\(95^\\circ\\)",
        "correct": false,
        "feedback": "You added 50 to 45."
      },
      {
        "text": "\\(45^\\circ\\)",
        "correct": false,
        "feedback": "You assumed the two opposite interior angles are equal."
      }
    ],
    "backward": "Exterior angle theorem.",
    "forward": "Used whenever one opposite interior angle is unknown."
  },
  {
    "itemId": "d2",
    "order": 2,
    "cluster": "pythagoras",
    "clusterName": "Pythagoras' theorem",
    "question": "The perpendicular bisector of AB meets AB at M. A point P on this bisector is 13 cm from A. If AB = 24 cm, find PM.<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 200 200\" width=\"300\" height=\"300\"><!-- AB = 24 cm (scale 7 px/cm); PM = 5 cm; PA = 13 cm --><line x1=\"16\" y1=\"150\" x2=\"184\" y2=\"150\" stroke=\"#222\" stroke-width=\"2\"/><line x1=\"100\" y1=\"80\" x2=\"100\" y2=\"175\" stroke=\"#222\" stroke-width=\"1.5\" stroke-dasharray=\"4 4\"/><line x1=\"16\" y1=\"150\" x2=\"100\" y2=\"115\" stroke=\"#c0392b\" stroke-width=\"1.5\"/><path d=\"M 100 150 L 110 150 L 110 140 L 100 140\" fill=\"none\" stroke=\"#222\" stroke-width=\"1\"/><circle cx=\"100\" cy=\"150\" r=\"2\" fill=\"#222\"/><circle cx=\"100\" cy=\"115\" r=\"2.5\" fill=\"#c0392b\"/><text x=\"16\" y=\"166\" font-size=\"13\" text-anchor=\"middle\" fill=\"#222\">A</text><text x=\"184\" y=\"166\" font-size=\"13\" text-anchor=\"middle\" fill=\"#222\">B</text><text x=\"110\" y=\"165\" font-size=\"13\" text-anchor=\"start\" fill=\"#222\">M</text><text x=\"108\" y=\"110\" font-size=\"13\" text-anchor=\"start\" fill=\"#c0392b\">P</text><text x=\"100\" y=\"193\" font-size=\"12\" text-anchor=\"middle\" fill=\"#222\">AB = 24 cm, PA = 13 cm</text></svg></div>",
    "options": [
      {
        "text": "\\(5\\) cm",
        "correct": true,
        "feedback": "Correct. AM = 12 cm. \\(PM^2 = 13^2 - 12^2 = 25\\), \\(PM = 5\\) cm."
      },
      {
        "text": "\\(6\\) cm",
        "correct": false,
        "feedback": "You used \\(AM = 6\\)."
      },
      {
        "text": "\\(12\\) cm",
        "correct": false,
        "feedback": "You used AM as the answer."
      },
      {
        "text": "\\(13\\) cm",
        "correct": false,
        "feedback": "You used PA as the answer."
      }
    ],
    "backward": "Midpoint; Pythagoras.",
    "forward": "Used whenever a point on the perpendicular bisector is given."
  },
  {
    "itemId": "d3",
    "order": 3,
    "cluster": "interiorPoly",
    "clusterName": "Interior angles of polygons",
    "question": "The interior angles of a pentagon are \\(2x\\), \\(3x\\), \\(4x\\), \\(5x\\), and \\(6x\\). Find \\(x\\).",
    "options": [
      {
        "text": "\\(27^\\circ\\)",
        "correct": true,
        "feedback": "Correct. Sum = \\(20x = 540^\\circ\\), so \\(x = 27^\\circ\\)."
      },
      {
        "text": "\\(36^\\circ\\)",
        "correct": false,
        "feedback": "You used 720° (the sum for a hexagon) instead of 540°."
      },
      {
        "text": "\\(45^\\circ\\)",
        "correct": false,
        "feedback": "You used 900° (the sum for a heptagon) instead of 540°."
      },
      {
        "text": "\\(54^\\circ\\)",
        "correct": false,
        "feedback": "You used 1080° (the sum for an octagon) instead of 540°."
      }
    ],
    "backward": "Interior angle sum.",
    "forward": "Used in any polygon where angles are in algebraic form."
  },
  {
    "itemId": "d4",
    "order": 4,
    "cluster": "pythagoras",
    "clusterName": "Pythagoras' theorem",
    "question": "A right triangle has hypotenuse 13 cm and one leg 5 cm. Find its area.",
    "options": [
      {
        "text": "\\(30\\text{ cm}^2\\)",
        "correct": true,
        "feedback": "Correct. Other leg = \\(\\sqrt{169 - 25} = 12\\). Area = \\(\\tfrac{1}{2} \\times 5 \\times 12 = 30\\text{ cm}^2\\)."
      },
      {
        "text": "\\(60\\text{ cm}^2\\)",
        "correct": false,
        "feedback": "You used \\(5 \\times 12\\)."
      },
      {
        "text": "\\(32.5\\text{ cm}^2\\)",
        "correct": false,
        "feedback": "You halved the hypotenuse and multiplied by 5."
      },
      {
        "text": "\\(12\\text{ cm}^2\\)",
        "correct": false,
        "feedback": "You used the other leg as the area."
      }
    ],
    "backward": "Pythagoras; area formula.",
    "forward": "Used whenever a triangle's area is required but one side is unknown."
  },
  {
    "itemId": "d5",
    "order": 5,
    "cluster": "interiorPoly",
    "clusterName": "Interior angles of polygons",
    "question": "Each interior angle of a regular polygon is \\(165^\\circ\\). Find the number of sides.",
    "options": [
      {
        "text": "\\(24\\)",
        "correct": true,
        "feedback": "Correct. Exterior = \\(180 - 165 = 15^\\circ\\); sides = \\(360 \\div 15 = 24\\)."
      },
      {
        "text": "\\(30\\)",
        "correct": false,
        "feedback": "You used exterior = 12° instead of 15°: \\(360 \\div 12 = 30\\)."
      },
      {
        "text": "\\(20\\)",
        "correct": false,
        "feedback": "You used exterior = 18° instead of 15°: \\(360 \\div 18 = 20\\)."
      },
      {
        "text": "\\(15\\)",
        "correct": false,
        "feedback": "You gave the exterior angle itself (15°) instead of dividing 360 by it."
      }
    ],
    "backward": "Interior + exterior = 180°; exterior sum = 360°.",
    "forward": "Used whenever the interior angle is given."
  },
  {
    "itemId": "d6",
    "order": 6,
    "cluster": "pythagoras",
    "clusterName": "Pythagoras' theorem",
    "question": "A square has a diagonal of 10 cm. Find its side length in simplest surd form.",
    "options": [
      {
        "text": "\\(5\\sqrt{2}\\) cm",
        "correct": true,
        "feedback": "Correct. \\(s^2 + s^2 = 100\\), so \\(2s^2 = 100\\), \\(s^2 = 50\\), \\(s = 5\\sqrt{2}\\) cm."
      },
      {
        "text": "\\(10\\) cm",
        "correct": false,
        "feedback": "You used the diagonal as the side."
      },
      {
        "text": "\\(5\\) cm",
        "correct": false,
        "feedback": "You halved the diagonal."
      },
      {
        "text": "\\(\\sqrt{10}\\) cm",
        "correct": false,
        "feedback": "You took the square root of the diagonal."
      }
    ],
    "backward": "Pythagoras with a square's diagonal.",
    "forward": "Used whenever a square's diagonal is given."
  },
  {
    "itemId": "d7",
    "order": 7,
    "cluster": "angleCalc",
    "clusterName": "Angle calculations",
    "question": "The angles of a triangle are in the ratio \\(2:3:4\\). Find the largest angle.",
    "options": [
      {
        "text": "\\(80^\\circ\\)",
        "correct": true,
        "feedback": "Correct. Sum = 9 parts = 180°, so each part = 20°. Largest = \\(4 \\times 20 = 80^\\circ\\)."
      },
      {
        "text": "\\(60^\\circ\\)",
        "correct": false,
        "feedback": "You gave the middle angle (\\(3 \\times 20 = 60\\))."
      },
      {
        "text": "\\(40^\\circ\\)",
        "correct": false,
        "feedback": "You gave the smallest angle (\\(2 \\times 20 = 40\\))."
      },
      {
        "text": "\\(90^\\circ\\)",
        "correct": false,
        "feedback": "You assumed the largest was a right angle."
      }
    ],
    "backward": "Triangle angle sum; ratio reasoning.",
    "forward": "Used whenever angles are given in ratio form."
  },
  {
    "itemId": "d8",
    "order": 8,
    "cluster": "angleCalc",
    "clusterName": "Angle calculations",
    "question": "In triangle ABC, angle A = \\(70^\\circ\\) and angle B = \\(60^\\circ\\). The bisector of angle A meets BC at D. Find angle ADB.",
    "options": [
      {
        "text": "\\(85^\\circ\\)",
        "correct": true,
        "feedback": "Correct. Angle C = \\(50^\\circ\\). Angle BAD = 35° (A is bisected). In triangle ABD: \\(180 - 35 - 60 = 85^\\circ\\)."
      },
      {
        "text": "\\(95^\\circ\\)",
        "correct": false,
        "feedback": "You gave the exterior angle at D (\\(180 - 85 = 95\\)), not the interior angle ADB."
      },
      {
        "text": "\\(50^\\circ\\)",
        "correct": false,
        "feedback": "You forgot to bisect angle A: you used angle BAC = 70° in place of BAD = 35°."
      },
      {
        "text": "\\(70^\\circ\\)",
        "correct": false,
        "feedback": "You gave the original angle A (\\(70^\\circ\\)) instead of working in triangle ABD."
      }
    ],
    "backward": "Angle bisector property; triangle angle sum.",
    "forward": "Used whenever a bisector creates a sub-triangle."
  },
  {
    "itemId": "d9",
    "order": 9,
    "cluster": "interiorPoly",
    "clusterName": "Interior angles of polygons",
    "question": "The interior angles of a hexagon are \\(3x\\), \\(4x\\), \\(5x\\), \\(5x\\), \\(6x\\), and \\(7x\\). Find \\(x\\).",
    "options": [
      {
        "text": "\\(24^\\circ\\)",
        "correct": true,
        "feedback": "Correct. Sum = \\(30x = 720^\\circ\\), so \\(x = 24^\\circ\\)."
      },
      {
        "text": "\\(30^\\circ\\)",
        "correct": false,
        "feedback": "You used \\(30x = 900\\) (the sum for a heptagon)."
      },
      {
        "text": "\\(36^\\circ\\)",
        "correct": false,
        "feedback": "You used \\(30x = 1080\\) (the sum for an octagon)."
      },
      {
        "text": "\\(20^\\circ\\)",
        "correct": false,
        "feedback": "You used \\(30x = 600\\)."
      }
    ],
    "backward": "Interior angle sum.",
    "forward": "Used in any hexagon with algebraic angles."
  },
  {
    "itemId": "d10",
    "order": 10,
    "cluster": "pythagoras",
    "clusterName": "Pythagoras' theorem",
    "question": "A right triangle has legs of length 20 cm and 21 cm. Find its perimeter.",
    "options": [
      {
        "text": "\\(70\\) cm",
        "correct": true,
        "feedback": "Correct. Hypotenuse = \\(\\sqrt{400 + 441} = 29\\). Perimeter = \\(20 + 21 + 29 = 70\\) cm."
      },
      {
        "text": "\\(29\\) cm",
        "correct": false,
        "feedback": "You gave only the hypotenuse (29), not the perimeter."
      },
      {
        "text": "\\(420\\) cm",
        "correct": false,
        "feedback": "You multiplied the two legs (\\(20 \\times 21 = 420\\))."
      },
      {
        "text": "\\(41\\) cm",
        "correct": false,
        "feedback": "You added only the two legs (\\(20 + 21 = 41\\))."
      }
    ],
    "backward": "Pythagoras; perimeter.",
    "forward": "20‑21‑29 is a Pythagorean triple."
  },
  {
    "itemId": "d11",
    "order": 11,
    "cluster": "interiorPoly",
    "clusterName": "Interior angles of polygons",
    "question": "The interior angle of a regular polygon is \\(156^\\circ\\). How many sides does the polygon have?",
    "options": [
      {
        "text": "\\(15\\)",
        "correct": true,
        "feedback": "Correct. Exterior = \\(180 - 156 = 24^\\circ\\); sides = \\(360 \\div 24 = 15\\)."
      },
      {
        "text": "\\(12\\)",
        "correct": false,
        "feedback": "You used exterior = 30°."
      },
      {
        "text": "\\(18\\)",
        "correct": false,
        "feedback": "You used exterior = 20°."
      },
      {
        "text": "\\(10\\)",
        "correct": false,
        "feedback": "You used exterior = 36°."
      }
    ],
    "backward": "Interior + exterior = 180°.",
    "forward": "Used to identify a regular polygon from its interior angle."
  },
  {
    "itemId": "d12",
    "order": 12,
    "cluster": "pythagoras",
    "clusterName": "Pythagoras' theorem",
    "question": "A 6.5 m ladder leans against a wall. Its foot is 2.5 m from the wall. How high up the wall does the ladder reach?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 200 215\" width=\"300\" height=\"323\"><line x1=\"47\" y1=\"175\" x2=\"140\" y2=\"175\" stroke=\"#222\" stroke-width=\"2\"/><line x1=\"130\" y1=\"27\" x2=\"130\" y2=\"175\" stroke=\"#222\" stroke-width=\"3\"/><path d=\"M 120 175 L 120 165 L 130 165\" fill=\"none\" stroke=\"#222\" stroke-width=\"1.2\"/><line x1=\"75\" y1=\"175\" x2=\"130\" y2=\"43\" stroke=\"#c0392b\" stroke-width=\"3\" stroke-linecap=\"round\"/><text x=\"96\" y=\"106.3\" font-size=\"14\" font-weight=\"700\" fill=\"#c0392b\" text-anchor=\"middle\" transform=\"rotate(-67.4 96 106.3)\">6.5 m</text><line x1=\"146\" y1=\"43\" x2=\"146\" y2=\"175\" stroke=\"#555\" stroke-width=\"1.2\"/><line x1=\"141\" y1=\"43\" x2=\"151\" y2=\"43\" stroke=\"#555\" stroke-width=\"1.2\"/><line x1=\"141\" y1=\"175\" x2=\"151\" y2=\"175\" stroke=\"#555\" stroke-width=\"1.2\"/><line x1=\"130\" y1=\"43\" x2=\"151\" y2=\"43\" stroke=\"#555\" stroke-width=\"0.8\" stroke-dasharray=\"2 2\"/><text x=\"155\" y=\"114\" font-size=\"14\" font-weight=\"700\" fill=\"#222\">h</text><line x1=\"75\" y1=\"191\" x2=\"130\" y2=\"191\" stroke=\"#555\" stroke-width=\"1.2\"/><line x1=\"75\" y1=\"186\" x2=\"75\" y2=\"196\" stroke=\"#555\" stroke-width=\"1.2\"/><line x1=\"130\" y1=\"186\" x2=\"130\" y2=\"196\" stroke=\"#555\" stroke-width=\"1.2\"/><text x=\"102.5\" y=\"208\" font-size=\"14\" font-weight=\"700\" fill=\"#222\" text-anchor=\"middle\">2.5 m</text></svg></div>",
    "options": [
      {
        "text": "\\(6\\) m",
        "correct": true,
        "feedback": "Correct. \\(h^2 = 6.5^2 - 2.5^2 = 42.25 - 6.25 = 36\\), \\(h = 6\\) m."
      },
      {
        "text": "\\(4\\) m",
        "correct": false,
        "feedback": "You subtracted \\(2.5\\) from \\(6.5\\)."
      },
      {
        "text": "\\(\\sqrt{42.25}\\) m",
        "correct": false,
        "feedback": "You stopped at \\(h^2\\)."
      },
      {
        "text": "\\(4.5\\) m",
        "correct": false,
        "feedback": "You averaged 6.5 and 2.5."
      }
    ],
    "backward": "Pythagoras with the hypotenuse known.",
    "forward": "Common in real-life measurement."
  },
  {
    "itemId": "d13",
    "order": 13,
    "cluster": "angleCalc",
    "clusterName": "Angle calculations",
    "question": "In the diagram, AB ∥ CD. A transversal cuts both lines. The co-interior angle at AB is \\((2x + 10)^\\circ\\). The co-interior angle at CD is \\((3x - 20)^\\circ\\). Find \\(x\\).<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 200 200\" width=\"300\" height=\"300\"><!-- Parallel lines y=60 (AB) and y=140 (CD); transversal (60,20)-(140,180); co-interior angles marked --><line x1=\"10\" y1=\"60\" x2=\"190\" y2=\"60\" stroke=\"#222\" stroke-width=\"2\"/><line x1=\"10\" y1=\"140\" x2=\"190\" y2=\"140\" stroke=\"#222\" stroke-width=\"2\"/><line x1=\"60\" y1=\"20\" x2=\"140\" y2=\"180\" stroke=\"#222\" stroke-width=\"2\"/><circle cx=\"80\" cy=\"60\" r=\"2\" fill=\"#222\"/><circle cx=\"120\" cy=\"140\" r=\"2\" fill=\"#222\"/><path d=\"M 50 60 A 30 30 0 0 1 93.4 86.8\" fill=\"none\" stroke=\"#c0392b\" stroke-width=\"2\"/><path d=\"M 90 140 A 30 30 0 0 0 106.6 113.2\" fill=\"none\" stroke=\"#c0392b\" stroke-width=\"2\"/><text x=\"14\" y=\"55\" font-size=\"13\" text-anchor=\"start\" fill=\"#222\">A</text><text x=\"190\" y=\"55\" font-size=\"13\" text-anchor=\"end\" fill=\"#222\">B</text><text x=\"14\" y=\"158\" font-size=\"13\" text-anchor=\"start\" fill=\"#222\">C</text><text x=\"190\" y=\"158\" font-size=\"13\" text-anchor=\"end\" fill=\"#222\">D</text><text x=\"36\" y=\"100\" font-size=\"11\" text-anchor=\"middle\" fill=\"#c0392b\">(2x+10)&#176;</text><text x=\"60\" y=\"124\" font-size=\"11\" text-anchor=\"middle\" fill=\"#c0392b\">(3x-20)&#176;</text></svg></div>",
    "options": [
      {
        "text": "\\(38\\)",
        "correct": true,
        "feedback": "Correct. Co-interior angles sum to 180°: \\((2x+10) + (3x-20) = 180\\), \\(5x - 10 = 180\\), \\(5x = 190\\), \\(x = 38\\)."
      },
      {
        "text": "\\(30\\)",
        "correct": false,
        "feedback": "You set the sum to 140."
      },
      {
        "text": "\\(40\\)",
        "correct": false,
        "feedback": "You may have set the sum to 190 instead of 180, giving \\(5x = 200\\)."
      },
      {
        "text": "\\(20\\)",
        "correct": false,
        "feedback": "You solved \\(5x = 100\\)."
      }
    ],
    "backward": "Co-interior angles between parallel lines.",
    "forward": "Used in any algebraic parallel-lines problem."
  },
  {
    "itemId": "d14",
    "order": 14,
    "cluster": "pythagoras",
    "clusterName": "Pythagoras' theorem",
    "question": "The perpendicular bisector of AB (with AB = 12 cm) meets AB at M. Points P and Q are on the bisector, with PM = QM = 8 cm. Find PA + QA.<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 200 230\" width=\"300\" height=\"345\"><!-- AB = 12 cm (scale 7 px/cm); PM = QM = 8 cm; PA = QA = 10 cm --><line x1=\"58\" y1=\"130\" x2=\"142\" y2=\"130\" stroke=\"#222\" stroke-width=\"2\"/><line x1=\"100\" y1=\"30\" x2=\"100\" y2=\"215\" stroke=\"#222\" stroke-width=\"1.5\" stroke-dasharray=\"4 4\"/><line x1=\"58\" y1=\"130\" x2=\"100\" y2=\"74\" stroke=\"#c0392b\" stroke-width=\"1.5\"/><line x1=\"58\" y1=\"130\" x2=\"100\" y2=\"186\" stroke=\"#c0392b\" stroke-width=\"1.5\"/><path d=\"M 100 130 L 110 130 L 110 120 L 100 120\" fill=\"none\" stroke=\"#222\" stroke-width=\"1\"/><circle cx=\"100\" cy=\"130\" r=\"2\" fill=\"#222\"/><circle cx=\"100\" cy=\"74\" r=\"2.5\" fill=\"#c0392b\"/><circle cx=\"100\" cy=\"186\" r=\"2.5\" fill=\"#c0392b\"/><text x=\"58\" y=\"145\" font-size=\"13\" text-anchor=\"middle\" fill=\"#222\">A</text><text x=\"142\" y=\"145\" font-size=\"13\" text-anchor=\"middle\" fill=\"#222\">B</text><text x=\"104\" y=\"147\" font-size=\"13\" text-anchor=\"start\" fill=\"#222\">M</text><text x=\"108\" y=\"70\" font-size=\"13\" text-anchor=\"start\" fill=\"#c0392b\">P</text><text x=\"108\" y=\"192\" font-size=\"13\" text-anchor=\"start\" fill=\"#c0392b\">Q</text><text x=\"100\" y=\"224\" font-size=\"12\" text-anchor=\"middle\" fill=\"#222\">AB = 12 cm, PM = QM = 8 cm</text></svg></div>",
    "options": [
      {
        "text": "\\(20\\) cm",
        "correct": true,
        "feedback": "Correct. AM = 6 cm. PA = QA = \\(\\sqrt{6^2 + 8^2} = 10\\) cm. So PA + QA = 20 cm."
      },
      {
        "text": "\\(16\\) cm",
        "correct": false,
        "feedback": "You added \\(2 \\times 8\\)."
      },
      {
        "text": "\\(26\\) cm",
        "correct": false,
        "feedback": "You used \\(2 \\times 13\\)."
      },
      {
        "text": "\\(10\\) cm",
        "correct": false,
        "feedback": "You gave only PA (10 cm), not PA + QA."
      }
    ],
    "backward": "Midpoint; Pythagoras.",
    "forward": "Used whenever equal distances to endpoints of a segment are required."
  },
  {
    "itemId": "d15",
    "order": 15,
    "cluster": "interiorPoly",
    "clusterName": "Interior angles of polygons",
    "question": "Each exterior angle of a regular polygon is \\(18^\\circ\\). Find the sum of its interior angles.",
    "options": [
      {
        "text": "\\(3240^\\circ\\)",
        "correct": true,
        "feedback": "Correct. Sides = \\(360 \\div 18 = 20\\). Sum = \\((20 - 2) \\times 180 = 3240^\\circ\\)."
      },
      {
        "text": "\\(3600^\\circ\\)",
        "correct": false,
        "feedback": "You used \\(20 \\times 180\\)."
      },
      {
        "text": "\\(1800^\\circ\\)",
        "correct": false,
        "feedback": "You used \\(n = 12\\)."
      },
      {
        "text": "\\(1620^\\circ\\)",
        "correct": false,
        "feedback": "You used \\(n = 11\\)."
      }
    ],
    "backward": "Exterior sum; interior sum formula.",
    "forward": "Used whenever exterior angle is given but interior sum is required."
  },
  {
    "itemId": "d16",
    "order": 16,
    "cluster": "pythagoras",
    "clusterName": "Pythagoras' theorem",
    "question": "An isosceles right triangle has legs of length 5 cm. Find its hypotenuse.",
    "options": [
      {
        "text": "\\(5\\sqrt{2}\\) cm",
        "correct": true,
        "feedback": "Correct. \\(h^2 = 5^2 + 5^2 = 50\\), \\(h = 5\\sqrt{2}\\) cm."
      },
      {
        "text": "\\(10\\) cm",
        "correct": false,
        "feedback": "You doubled the leg."
      },
      {
        "text": "\\(5\\) cm",
        "correct": false,
        "feedback": "You used the leg as the hypotenuse."
      },
      {
        "text": "\\(\\sqrt{10}\\) cm",
        "correct": false,
        "feedback": "You took the square root of 10."
      }
    ],
    "backward": "Pythagoras.",
    "forward": "The isosceles right triangle with leg \\(a\\) has hypotenuse \\(a\\sqrt{2}\\)."
  },
  {
    "itemId": "d17",
    "order": 17,
    "cluster": "exteriorPoly",
    "clusterName": "Exterior angles of polygons",
    "question": "The exterior angles of a polygon are \\(30^\\circ\\), \\(40^\\circ\\), \\(50^\\circ\\), \\(60^\\circ\\), \\(70^\\circ\\), and \\(x\\). Find \\(x\\).",
    "options": [
      {
        "text": "\\(110^\\circ\\)",
        "correct": true,
        "feedback": "Correct. Exterior angles sum to 360°: \\(250 + x = 360\\), \\(x = 110^\\circ\\)."
      },
      {
        "text": "\\(100^\\circ\\)",
        "correct": false,
        "feedback": "You used the sum as 350."
      },
      {
        "text": "\\(120^\\circ\\)",
        "correct": false,
        "feedback": "You used the sum as 370."
      },
      {
        "text": "\\(90^\\circ\\)",
        "correct": false,
        "feedback": "You stopped at \\(250 + x = 340\\)."
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
    "question": "A rectangle is 24 cm wide and 10 cm tall. A diagonal is drawn; a second diagonal is drawn, and the two meet at O. Find the distance from O to a corner.",
    "options": [
      {
        "text": "\\(13\\) cm",
        "correct": true,
        "feedback": "Correct. Diagonal = \\(\\sqrt{24^2 + 10^2} = 26\\). Diagonals of a rectangle bisect each other, so O to a corner = \\(26 \\div 2 = 13\\) cm."
      },
      {
        "text": "\\(26\\) cm",
        "correct": false,
        "feedback": "You stopped at the full diagonal."
      },
      {
        "text": "\\(12\\) cm",
        "correct": false,
        "feedback": "You halved only the width."
      },
      {
        "text": "\\(17\\) cm",
        "correct": false,
        "feedback": "You averaged the width and height."
      }
    ],
    "backward": "Pythagoras; diagonals of a rectangle.",
    "forward": "Used in any rectangle with diagonals drawn."
  },
  {
    "itemId": "d19",
    "order": 19,
    "cluster": "angleCalc",
    "clusterName": "Angle calculations",
    "question": "In isosceles triangle ABC with AB = AC, the exterior angle at B is \\(130^\\circ\\). Find the angle at A.",
    "options": [
      {
        "text": "\\(80^\\circ\\)",
        "correct": true,
        "feedback": "Correct. Interior at B = \\(180 - 130 = 50^\\circ\\). Angle C = 50°. Angle A = \\(180 - 50 - 50 = 80^\\circ\\)."
      },
      {
        "text": "\\(50^\\circ\\)",
        "correct": false,
        "feedback": "You gave the base angle, not the apex angle."
      },
      {
        "text": "\\(130^\\circ\\)",
        "correct": false,
        "feedback": "You gave the exterior angle."
      },
      {
        "text": "\\(100^\\circ\\)",
        "correct": false,
        "feedback": "You subtracted 50 from 150."
      }
    ],
    "backward": "Straight-line fact; isosceles base angles; triangle angle sum.",
    "forward": "Used in any isosceles with an exterior angle."
  },
  {
    "itemId": "d20",
    "order": 20,
    "cluster": "constructions",
    "clusterName": "Constructions",
    "question": "In the construction of the perpendicular bisector of AB, arcs of equal radius \\(r\\) are drawn from A and B. If AB = 8 cm, what is the smallest permissible value for \\(r\\)?",
    "options": [
      {
        "text": "Any value greater than 4 cm",
        "correct": true,
        "feedback": "Correct. The arcs must intersect, which requires \\(r > AB/2 = 4\\) cm."
      },
      {
        "text": "Exactly 4 cm",
        "correct": false,
        "feedback": "At exactly \\(r = 4\\), the arcs touch at a single point (the midpoint), which does not give two intersection points."
      },
      {
        "text": "Exactly 8 cm",
        "correct": false,
        "feedback": "\\(r = 8\\) works but is not the smallest."
      },
      {
        "text": "Any value greater than 8 cm",
        "correct": false,
        "feedback": "\\(r > 8\\) works but is not the smallest."
      }
    ],
    "backward": "The construction's geometric requirement.",
    "forward": "Used whenever a construction must produce an intersection."
  },
  {
    "itemId": "d21",
    "order": 21,
    "cluster": "interiorPoly",
    "clusterName": "Interior angles of polygons",
    "question": "A hexagon has interior angles \\(100^\\circ\\), \\(110^\\circ\\), \\(120^\\circ\\), \\(130^\\circ\\), \\(140^\\circ\\), and \\(x\\). Find \\(x\\).",
    "options": [
      {
        "text": "\\(120^\\circ\\)",
        "correct": true,
        "feedback": "Correct. Sum = \\(720^\\circ\\). \\(x = 720 - 100 - 110 - 120 - 130 - 140 = 120^\\circ\\)."
      },
      {
        "text": "\\(140^\\circ\\)",
        "correct": false,
        "feedback": "You used the largest given angle (140°) as the missing one."
      },
      {
        "text": "\\(100^\\circ\\)",
        "correct": false,
        "feedback": "You used the smallest given angle (100°) as the missing one."
      },
      {
        "text": "\\(90^\\circ\\)",
        "correct": false,
        "feedback": "You assumed the missing angle was a right angle."
      }
    ],
    "backward": "Interior angle sum.",
    "forward": "Used whenever a hexagon has an unknown angle."
  },
  {
    "itemId": "d22",
    "order": 22,
    "cluster": "pythagoras",
    "clusterName": "Pythagoras' theorem",
    "question": "An isosceles triangle has two equal sides of length 10 cm and a base of 12 cm. Find its height.<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 200 200\" width=\"300\" height=\"300\"><!-- Equal sides 10 cm; base 12 cm; height 8 cm; scale 10 px/cm --><polygon points=\"40,160 160,160 100,80\" fill=\"none\" stroke=\"#222\" stroke-width=\"2\"/><line x1=\"100\" y1=\"160\" x2=\"100\" y2=\"80\" stroke=\"#c0392b\" stroke-width=\"1.5\" stroke-dasharray=\"4 4\"/><path d=\"M 100 150 L 110 150 L 110 160\" fill=\"none\" stroke=\"#222\" stroke-width=\"1\"/><text x=\"100\" y=\"180\" font-size=\"12\" text-anchor=\"middle\" fill=\"#222\">12 cm</text><text x=\"50\" y=\"115\" font-size=\"12\" text-anchor=\"end\" fill=\"#222\">10 cm</text><text x=\"150\" y=\"115\" font-size=\"12\" text-anchor=\"start\" fill=\"#222\">10 cm</text><text x=\"106\" y=\"125\" font-size=\"13\" text-anchor=\"start\" fill=\"#c0392b\">h</text></svg></div>",
    "options": [
      {
        "text": "\\(8\\) cm",
        "correct": true,
        "feedback": "Correct. The altitude bisects the base: half-base = 6. \\(h^2 = 100 - 36 = 64\\), \\(h = 8\\) cm."
      },
      {
        "text": "\\(6\\) cm",
        "correct": false,
        "feedback": "You gave the half-base, not the height."
      },
      {
        "text": "\\(24\\) cm",
        "correct": false,
        "feedback": "You doubled the base (\\(2 \\times 12 = 24\\))."
      },
      {
        "text": "\\(22\\) cm",
        "correct": false,
        "feedback": "You added the equal side and the base (\\(10 + 12 = 22\\))."
      }
    ],
    "backward": "Pythagoras; symmetry of an isosceles triangle.",
    "forward": "Used whenever a triangle's height is needed for area."
  },
  {
    "itemId": "d23",
    "order": 23,
    "cluster": "exteriorPoly",
    "clusterName": "Exterior angles of polygons",
    "question": "A pentagon has four exterior angles of \\(70^\\circ\\), \\(80^\\circ\\), \\(60^\\circ\\), and \\(50^\\circ\\). Find the fifth exterior angle.",
    "options": [
      {
        "text": "\\(100^\\circ\\)",
        "correct": true,
        "feedback": "Correct. Exterior angles sum to 360°: \\(x = 360 - 70 - 80 - 60 - 50 = 100^\\circ\\)."
      },
      {
        "text": "\\(90^\\circ\\)",
        "correct": false,
        "feedback": "You used the sum as 350."
      },
      {
        "text": "\\(110^\\circ\\)",
        "correct": false,
        "feedback": "You used the sum as 370° instead of 360°: \\(370 - 260 = 110\\)."
      },
      {
        "text": "\\(80^\\circ\\)",
        "correct": false,
        "feedback": "You used the sum as 340° instead of 360°: \\(340 - 260 = 80\\)."
      }
    ],
    "backward": "Exterior angle sum.",
    "forward": "Used when exterior angles of any polygon are partially known."
  },
  {
    "itemId": "d24",
    "order": 24,
    "cluster": "mixed",
    "clusterName": "Mixed geometry problems",
    "question": "A 10 m ladder reaches a height \\(h_1\\) up a wall when its foot is 6 m from the wall. A 13 m ladder reaches a height \\(h_2\\) when its foot is 5 m from the same wall. By how many metres does the second ladder reach higher?",
    "options": [
      {
        "text": "\\(4\\) m",
        "correct": true,
        "feedback": "Correct. \\(h_1 = \\sqrt{10^2 - 6^2} = 8\\) m. \\(h_2 = \\sqrt{13^2 - 5^2} = 12\\) m. Difference = \\(12 - 8 = 4\\) m."
      },
      {
        "text": "\\(20\\) m",
        "correct": false,
        "feedback": "You added the two heights (\\(8 + 12 = 20\\)) instead of subtracting."
      },
      {
        "text": "\\(8\\) m",
        "correct": false,
        "feedback": "You gave \\(h_1\\) (8 m) instead of the difference."
      },
      {
        "text": "\\(12\\) m",
        "correct": false,
        "feedback": "You gave \\(h_2\\) (12 m) instead of the difference."
      }
    ],
    "backward": "Two Pythagoras calculations.",
    "forward": "Used whenever two setups are compared."
  }
];

const recheckItems = [
  {
    "itemId": "r1",
    "order": 1,
    "cluster": "angleCalc",
    "clusterName": "Angle calculations",
    "question": "In a triangle, the exterior angle at one vertex is \\(145^\\circ\\). One opposite interior angle is \\(85^\\circ\\). Find the other.",
    "options": [
      {
        "text": "\\(60^\\circ\\)",
        "correct": true,
        "feedback": "Correct. \\(145 - 85 = 60^\\circ\\). (bw: Exterior angle theorem.)"
      },
      {
        "text": "\\(35^\\circ\\)",
        "correct": false,
        "feedback": "You subtracted 145 from 180."
      },
      {
        "text": "\\(55^\\circ\\)",
        "correct": false,
        "feedback": "You used 200° instead of 180°: \\(200 - 145 = 55^\\circ\\)."
      },
      {
        "text": "\\(65^\\circ\\)",
        "correct": false,
        "feedback": "You used 80° instead of 85° in the sum: \\(145 - 80 = 65^\\circ\\)."
      }
    ]
  },
  {
    "itemId": "r2",
    "order": 2,
    "cluster": "angleCalc",
    "clusterName": "Angle calculations",
    "question": "In the diagram, AB ∥ CD. Co-interior angles are \\((3x + 5)^\\circ\\) and \\((2x + 15)^\\circ\\). Find \\(x\\).",
    "options": [
      {
        "text": "\\(32\\)",
        "correct": true,
        "feedback": "Correct. \\(3x + 5 + 2x + 15 = 180\\), \\(5x + 20 = 180\\), \\(5x = 160\\), \\(x = 32\\). (bw: Co-interior angles between parallel lines.)"
      },
      {
        "text": "\\(30\\)",
        "correct": false,
        "feedback": "You set the sum to 170."
      },
      {
        "text": "\\(36\\)",
        "correct": false,
        "feedback": "You set the co-interior sum to 200°: \\(5x = 180\\), \\(x = 36\\)."
      },
      {
        "text": "\\(20\\)",
        "correct": false,
        "feedback": "You solved \\(5x = 100\\)."
      }
    ]
  },
  {
    "itemId": "r3",
    "order": 3,
    "cluster": "interiorPoly",
    "clusterName": "Interior angles of polygons",
    "question": "The interior angles of a pentagon are in the ratio \\(2:3:4:5:6\\). Find the largest angle.",
    "options": [
      {
        "text": "\\(162^\\circ\\)",
        "correct": true,
        "feedback": "Correct. Sum = 20 parts = 540°, so each part = 27°. Largest = \\(6 \\times 27 = 162^\\circ\\). (bw: Interior angle sum; ratio reasoning.)"
      },
      {
        "text": "\\(180^\\circ\\)",
        "correct": false,
        "feedback": "You assumed the largest could be 180° (impossible for a convex polygon)."
      },
      {
        "text": "\\(108^\\circ\\)",
        "correct": false,
        "feedback": "You used 4 parts (the middle)."
      },
      {
        "text": "\\(216^\\circ\\)",
        "correct": false,
        "feedback": "You used 8 parts per unit instead of 6: \\(8 \\times 27 = 216\\)."
      }
    ]
  },
  {
    "itemId": "r4",
    "order": 4,
    "cluster": "interiorPoly",
    "clusterName": "Interior angles of polygons",
    "question": "The sum of the interior angles of a polygon is \\(1800^\\circ\\). How many sides does it have?",
    "options": [
      {
        "text": "\\(12\\)",
        "correct": true,
        "feedback": "Correct. \\(1800 \\div 180 = 10\\), \\(n = 10 + 2 = 12\\). (bw: Interior angle sum formula.)"
      },
      {
        "text": "\\(10\\)",
        "correct": false,
        "feedback": "You stopped at \\(n - 2 = 10\\) and forgot to add 2."
      },
      {
        "text": "\\(11\\)",
        "correct": false,
        "feedback": "You added 1 instead of 2: \\(n = 10 + 1 = 11\\)."
      },
      {
        "text": "\\(14\\)",
        "correct": false,
        "feedback": "You added 4 instead of 2: \\(n = 10 + 4 = 14\\)."
      }
    ]
  },
  {
    "itemId": "r5",
    "order": 5,
    "cluster": "interiorPoly",
    "clusterName": "Interior angles of polygons",
    "question": "Each interior angle of a regular polygon is \\(144^\\circ\\). Find the number of sides.",
    "options": [
      {
        "text": "\\(10\\)",
        "correct": true,
        "feedback": "Correct. Exterior = \\(180 - 144 = 36^\\circ\\); sides = \\(360 \\div 36 = 10\\)."
      },
      {
        "text": "\\(12\\)",
        "correct": false,
        "feedback": "You used exterior = 30°."
      },
      {
        "text": "\\(8\\)",
        "correct": false,
        "feedback": "You used exterior = 45°."
      },
      {
        "text": "\\(15\\)",
        "correct": false,
        "feedback": "You used exterior = 24°."
      }
    ],
    "backward": "Interior + exterior = 180°.",
    "forward": "Used to identify regular polygons."
  },
  {
    "itemId": "r6",
    "order": 6,
    "cluster": "exteriorPoly",
    "clusterName": "Exterior angles of polygons",
    "question": "The exterior angles of a quadrilateral are \\(x\\), \\(2x\\), \\(3x\\), and \\(4x\\). Find \\(x\\).",
    "options": [
      {
        "text": "\\(36^\\circ\\)",
        "correct": true,
        "feedback": "Correct. Sum = \\(10x = 360^\\circ\\), \\(x = 36^\\circ\\). (bw: Exterior angles sum to 360°.)"
      },
      {
        "text": "\\(30^\\circ\\)",
        "correct": false,
        "feedback": "You used \\(10x = 300\\)."
      },
      {
        "text": "\\(45^\\circ\\)",
        "correct": false,
        "feedback": "You used \\(10x = 450\\)."
      },
      {
        "text": "\\(72^\\circ\\)",
        "correct": false,
        "feedback": "You used the sum as 720° instead of 360°: \\(10x = 720\\), \\(x = 72\\)."
      }
    ]
  },
  {
    "itemId": "r7",
    "order": 7,
    "cluster": "pythagoras",
    "clusterName": "Pythagoras' theorem",
    "question": "The perpendicular bisector of AB (with AB = 20 cm) meets AB at M. A point P is on the perpendicular bisector with PM = 24 cm. Find PA.",
    "options": [
      {
        "text": "\\(26\\) cm",
        "correct": true,
        "feedback": "Correct. AM = 10 cm. PA = \\(\\sqrt{10^2 + 24^2} = \\sqrt{676} = 26\\) cm. (bw: Midpoint; Pythagoras.)"
      },
      {
        "text": "\\(25\\) cm",
        "correct": false,
        "feedback": "You used AM = 7."
      },
      {
        "text": "\\(30\\) cm",
        "correct": false,
        "feedback": "You used AM = 18."
      },
      {
        "text": "\\(13\\) cm",
        "correct": false,
        "feedback": "You gave half of PA."
      }
    ]
  },
  {
    "itemId": "r8",
    "order": 8,
    "cluster": "angleCalc",
    "clusterName": "Angle calculations",
    "question": "In triangle ABC, angle A = \\(80^\\circ\\) and angle B = \\(60^\\circ\\). The bisector of angle A meets BC at D. Find angle ADB.",
    "options": [
      {
        "text": "\\(80^\\circ\\)",
        "correct": true,
        "feedback": "Correct. Angle BAD = 40°. In triangle ABD: \\(180 - 40 - 60 = 80^\\circ\\). (bw: Angle bisector; triangle angle sum.)"
      },
      {
        "text": "\\(100^\\circ\\)",
        "correct": false,
        "feedback": "You gave the exterior angle at D (\\(180 - 80 = 100\\))."
      },
      {
        "text": "\\(90^\\circ\\)",
        "correct": false,
        "feedback": "You assumed a right angle."
      },
      {
        "text": "\\(40^\\circ\\)",
        "correct": false,
        "feedback": "You forgot to bisect angle A: you used angle BAC = 80° in place of BAD = 40°."
      }
    ]
  },
  {
    "itemId": "r9",
    "order": 9,
    "cluster": "pythagoras",
    "clusterName": "Pythagoras' theorem",
    "question": "A right triangle has legs 15 cm and 20 cm. Find its perimeter.",
    "options": [
      {
        "text": "\\(60\\) cm",
        "correct": true,
        "feedback": "Correct. Hypotenuse = \\(\\sqrt{225 + 400} = 25\\). Perimeter = \\(15 + 20 + 25 = 60\\) cm."
      },
      {
        "text": "\\(35\\) cm",
        "correct": false,
        "feedback": "You added the legs."
      },
      {
        "text": "\\(50\\) cm",
        "correct": false,
        "feedback": "You doubled the hypotenuse: \\(2 \\times 25 = 50\\)."
      },
      {
        "text": "\\(120\\) cm",
        "correct": false,
        "feedback": "You doubled the perimeter."
      }
    ],
    "backward": "Pythagoras; perimeter.",
    "forward": "15‑20‑25 is a multiple of 3‑4‑5."
  },
  {
    "itemId": "r10",
    "order": 10,
    "cluster": "pythagoras",
    "clusterName": "Pythagoras' theorem",
    "question": "An isosceles triangle has equal sides of length 13 cm and base 10 cm. Find its area.",
    "options": [
      {
        "text": "\\(60\\text{ cm}^2\\)",
        "correct": true,
        "feedback": "Correct. Height: \\(h^2 = 13^2 - 5^2 = 144\\), \\(h = 12\\). Area = \\(\\tfrac{1}{2} \\times 10 \\times 12 = 60\\text{ cm}^2\\). (bw: Pythagoras with the base halved; area formula.)"
      },
      {
        "text": "\\(65\\text{ cm}^2\\)",
        "correct": false,
        "feedback": "You used \\(\\tfrac{1}{2} \\times 10 \\times 13\\)."
      },
      {
        "text": "\\(120\\text{ cm}^2\\)",
        "correct": false,
        "feedback": "You used \\(10 \\times 12\\)."
      },
      {
        "text": "\\(130\\text{ cm}^2\\)",
        "correct": false,
        "feedback": "You used \\(13 \\times 10\\)."
      }
    ]
  },
  {
    "itemId": "r11",
    "order": 11,
    "cluster": "pythagoras",
    "clusterName": "Pythagoras' theorem",
    "question": "A 17 m ladder reaches 15 m up a wall. How far is the foot from the wall?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 200 215\" width=\"300\" height=\"323\"><line x1=\"31.6\" y1=\"175\" x2=\"140\" y2=\"175\" stroke=\"#222\" stroke-width=\"2\"/><line x1=\"130\" y1=\"27\" x2=\"130\" y2=\"175\" stroke=\"#222\" stroke-width=\"3\"/><path d=\"M 120 175 L 120 165 L 130 165\" fill=\"none\" stroke=\"#222\" stroke-width=\"1.2\"/><line x1=\"59.6\" y1=\"175\" x2=\"130\" y2=\"43\" stroke=\"#c0392b\" stroke-width=\"3\" stroke-linecap=\"round\"/><text x=\"88.6\" y=\"105.7\" font-size=\"14\" font-weight=\"700\" fill=\"#c0392b\" text-anchor=\"middle\" transform=\"rotate(-61.9 88.6 105.7)\">17 m</text><line x1=\"146\" y1=\"43\" x2=\"146\" y2=\"175\" stroke=\"#555\" stroke-width=\"1.2\"/><line x1=\"141\" y1=\"43\" x2=\"151\" y2=\"43\" stroke=\"#555\" stroke-width=\"1.2\"/><line x1=\"141\" y1=\"175\" x2=\"151\" y2=\"175\" stroke=\"#555\" stroke-width=\"1.2\"/><line x1=\"130\" y1=\"43\" x2=\"151\" y2=\"43\" stroke=\"#555\" stroke-width=\"0.8\" stroke-dasharray=\"2 2\"/><text x=\"155\" y=\"114\" font-size=\"14\" font-weight=\"700\" fill=\"#222\">15 m</text><line x1=\"59.6\" y1=\"191\" x2=\"130\" y2=\"191\" stroke=\"#555\" stroke-width=\"1.2\"/><line x1=\"59.6\" y1=\"186\" x2=\"59.6\" y2=\"196\" stroke=\"#555\" stroke-width=\"1.2\"/><line x1=\"130\" y1=\"186\" x2=\"130\" y2=\"196\" stroke=\"#555\" stroke-width=\"1.2\"/><text x=\"94.8\" y=\"208\" font-size=\"14\" font-weight=\"700\" fill=\"#222\" text-anchor=\"middle\">?</text></svg></div>",
    "options": [
      {
        "text": "\\(8\\) m",
        "correct": true,
        "feedback": "Correct. \\(d^2 = 289 - 225 = 64\\), \\(d = 8\\) m. (bw: Pythagoras with the hypotenuse known.)"
      },
      {
        "text": "\\(4\\) m",
        "correct": false,
        "feedback": "You halved the correct answer."
      },
      {
        "text": "\\(16\\) m",
        "correct": false,
        "feedback": "You averaged the two given lengths (\\((15 + 17) \\div 2 = 16\\))."
      },
      {
        "text": "\\(2\\) m",
        "correct": false,
        "feedback": "You subtracted 15 from 17 (2) instead of using Pythagoras."
      }
    ]
  },
  {
    "itemId": "r12",
    "order": 12,
    "cluster": "pythagoras",
    "clusterName": "Pythagoras' theorem",
    "question": "A rectangle is 40 cm by 30 cm. A single diagonal is drawn. Find the distance from the midpoint of the diagonal to a corner.",
    "options": [
      {
        "text": "\\(25\\) cm",
        "correct": true,
        "feedback": "Correct. Diagonal = 50 cm. Half = 25 cm. (bw: Pythagoras; midpoint property.)"
      },
      {
        "text": "\\(50\\) cm",
        "correct": false,
        "feedback": "You gave the full diagonal."
      },
      {
        "text": "\\(35\\) cm",
        "correct": false,
        "feedback": "You averaged the sides."
      },
      {
        "text": "\\(20\\) cm",
        "correct": false,
        "feedback": "You halved the width."
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
    title: "Angles — Advanced Core",
    subtitle: "Grade 8 · Level 2 · Advanced Core",
    description: "Chained angle reasoning (exterior angle theorem, algebraic polygon angles, parallel lines), two-stage Pythagoras, and perpendicular-bisector properties — warm-up, diagnostic, and spaced recheck.",
    clusterNames: CLUSTER_NAMES,
    gateReviewHTML: "<p>You’ve finished the warm‑up. The next 24 questions are the Advanced Core diagnostic for angles. Each question asks you to chain two or more steps — using the exterior angle theorem, combining interior angle sums, applying Pythagoras across two stages, or reasoning inside a construction. Some items include diagrams — read each carefully. Take your time and use the feedback to sharpen your understanding.</p>",
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

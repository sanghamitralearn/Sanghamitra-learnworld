// seed/mathSeedCh5AnglesL4.js
//
// Populates math_chapters and math_questions with Grade 8, Chapter 5
// (Angles), Level 4 — converted from the standalone diagnostic
// JSON ch5-angles-level-4.json. Diagrams are inlined as SVG HTML
// directly in each question's text (the schema has no separate diagram
// field, and question text is already rendered as raw HTML).
//
// Run with: node seed/mathSeedCh5AnglesL4.js

const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-8";
const GRADE_LABEL = "Grade 8";
const CHAPTER_SLUG = "ch-5-angles";
const CHAPTER_NAME = "Angles";
const LEVEL = 4;

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
    "tier": "S",
    "question": "A right triangle has legs of length 6 cm and 8 cm. Find the hypotenuse.",
    "options": [
      {
        "text": "\\(10\\) cm",
        "correct": true,
        "feedback": "Correct. \\(c^2 = 36 + 64 = 100\\), \\(c = 10\\) cm."
      },
      {
        "text": "\\(14\\) cm",
        "correct": false,
        "feedback": "You added the legs."
      },
      {
        "text": "\\(48\\) cm",
        "correct": false,
        "feedback": "You multiplied the legs."
      },
      {
        "text": "\\(100\\) cm",
        "correct": false,
        "feedback": "You stopped at \\(c^2 = 100\\)."
      }
    ],
    "retryHint": "\\(c^2 = a^2 + b^2\\), then take the square root.",
    "backward": "Pythagoras.",
    "forward": "6‑8‑10 is a multiple of 3‑4‑5."
  },
  {
    "itemId": "w2",
    "order": 2,
    "cluster": "interiorPoly",
    "clusterName": "Interior angles of polygons",
    "tier": "S",
    "question": "What is the sum of the interior angles of a quadrilateral?",
    "options": [
      {
        "text": "\\(360^\\circ\\)",
        "correct": true,
        "feedback": "Correct. \\((4 - 2) \\times 180 = 360^\\circ\\). (bw: Interior sum formula.)"
      },
      {
        "text": "\\(180^\\circ\\)",
        "correct": false,
        "feedback": "180° is for a triangle."
      },
      {
        "text": "\\(540^\\circ\\)",
        "correct": false,
        "feedback": "540° is for a pentagon."
      },
      {
        "text": "\\(720^\\circ\\)",
        "correct": false,
        "feedback": "720° is for a hexagon."
      }
    ],
    "retryHint": "\\((n - 2) \\times 180^\\circ\\)."
  },
  {
    "itemId": "w3",
    "order": 3,
    "cluster": "constructions",
    "clusterName": "Constructions",
    "tier": "S",
    "question": "To construct the perpendicular bisector of segment AB, where is the first arc centred?",
    "options": [
      {
        "text": "At A (then at B with the same radius).",
        "correct": true,
        "feedback": "Correct. Equal arcs from A and B intersect above and below. (bw: The standard construction.)"
      },
      {
        "text": "At the midpoint of AB.",
        "correct": false,
        "feedback": "The midpoint isn't known until the bisector is drawn."
      },
      {
        "text": "At B only.",
        "correct": false,
        "feedback": "You need arcs from both endpoints."
      },
      {
        "text": "At any point on AB.",
        "correct": false,
        "feedback": "The centres are fixed at the endpoints."
      }
    ],
    "retryHint": "Arcs are centred at both endpoints."
  },
  {
    "itemId": "w4",
    "order": 4,
    "cluster": "angleCalc",
    "clusterName": "Angle calculations",
    "tier": "S",
    "question": "The two angles lie on a straight line. Find \\(x\\).<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 200 170\" width=\"300\" height=\"255\"><line x1=\"10\" y1=\"130\" x2=\"190\" y2=\"130\" stroke=\"#222\" stroke-width=\"2\"/><line x1=\"100\" y1=\"130\" x2=\"66.2\" y2=\"57.5\" stroke=\"#222\" stroke-width=\"2\"/><circle cx=\"100\" cy=\"130\" r=\"2\" fill=\"#222\"/><path d=\"M 70 130 A 30 30 0 0 0 87.3 102.8\" fill=\"none\" stroke=\"#c0392b\" stroke-width=\"2\"/><path d=\"M 87.3 102.8 A 30 30 0 0 1 130 130\" fill=\"none\" stroke=\"#c0392b\" stroke-width=\"2\"/><text x=\"56\" y=\"116\" font-size=\"14\" fill=\"#c0392b\" text-anchor=\"middle\">65&#176;</text><text x=\"128\" y=\"106\" font-size=\"14\" fill=\"#222\" text-anchor=\"middle\">x</text></svg></div>",
    "options": [
      {
        "text": "\\(115^\\circ\\)",
        "correct": true,
        "feedback": "Correct. \\(180 - 65 = 115^\\circ\\). (bw: Angles on a straight line.)"
      },
      {
        "text": "\\(25^\\circ\\)",
        "correct": false,
        "feedback": "You subtracted from 90."
      },
      {
        "text": "\\(65^\\circ\\)",
        "correct": false,
        "feedback": "You assumed vertically opposite."
      },
      {
        "text": "\\(295^\\circ\\)",
        "correct": false,
        "feedback": "You used 360°."
      }
    ],
    "retryHint": "Angles on a straight line sum to 180°."
  },
  {
    "itemId": "w5",
    "order": 5,
    "cluster": "exteriorPoly",
    "clusterName": "Exterior angles of polygons",
    "tier": "C",
    "question": "Find the size of each exterior angle of a regular octagon.",
    "options": [
      {
        "text": "\\(45^\\circ\\)",
        "correct": true,
        "feedback": "Correct. \\(360 \\div 8 = 45^\\circ\\). (bw: Exterior sum = 360°.)"
      },
      {
        "text": "\\(135^\\circ\\)",
        "correct": false,
        "feedback": "135° is the interior angle."
      },
      {
        "text": "\\(40^\\circ\\)",
        "correct": false,
        "feedback": "40° is the exterior of a regular nonagon."
      },
      {
        "text": "\\(60^\\circ\\)",
        "correct": false,
        "feedback": "60° is the exterior of a regular hexagon."
      }
    ],
    "retryHint": "Exterior sum ÷ n."
  },
  {
    "itemId": "w6",
    "order": 6,
    "cluster": "pythagoras",
    "clusterName": "Pythagoras' theorem",
    "tier": "C",
    "question": "A right triangle has hypotenuse 13 cm and one leg 5 cm. Find the other leg.",
    "options": [
      {
        "text": "\\(12\\) cm",
        "correct": true,
        "feedback": "Correct. \\(x^2 = 169 - 25 = 144\\), \\(x = 12\\) cm. (bw: Pythagoras with hyp known.)"
      },
      {
        "text": "\\(8\\) cm",
        "correct": false,
        "feedback": "You subtracted 5 from 13 (8)."
      },
      {
        "text": "\\(18\\) cm",
        "correct": false,
        "feedback": "You added 13 + 5."
      },
      {
        "text": "\\(\\sqrt{194}\\) cm",
        "correct": false,
        "feedback": "You added 169 + 25."
      }
    ],
    "retryHint": "\\(x^2 = \\text{hyp}^2 - \\text{leg}^2\\)."
  },
  {
    "itemId": "w7",
    "order": 7,
    "cluster": "mixed",
    "clusterName": "Mixed geometry problems",
    "tier": "H",
    "question": "A 5 m ladder reaches 4 m up a wall. A 13 m ladder reaches 12 m up the same wall. How much farther is the second ladder's foot from the wall?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 390 215\" width=\"540\" height=\"298\"><text x=\"13\" y=\"18\" font-size=\"14\" font-weight=\"700\" fill=\"#222\">Ladder 1</text><line x1=\"66\" y1=\"175\" x2=\"140\" y2=\"175\" stroke=\"#222\" stroke-width=\"2\"/><line x1=\"130\" y1=\"111\" x2=\"130\" y2=\"175\" stroke=\"#222\" stroke-width=\"3\"/><path d=\"M 120 175 L 120 165 L 130 165\" fill=\"none\" stroke=\"#222\" stroke-width=\"1.2\"/><line x1=\"94\" y1=\"175\" x2=\"130\" y2=\"127\" stroke=\"#c0392b\" stroke-width=\"3\" stroke-linecap=\"round\"/><text x=\"106.4\" y=\"146.8\" font-size=\"14\" font-weight=\"700\" fill=\"#c0392b\" text-anchor=\"middle\" transform=\"rotate(-53.1 106.4 146.8)\">5 m</text><line x1=\"146\" y1=\"127\" x2=\"146\" y2=\"175\" stroke=\"#555\" stroke-width=\"1.2\"/><line x1=\"141\" y1=\"127\" x2=\"151\" y2=\"127\" stroke=\"#555\" stroke-width=\"1.2\"/><line x1=\"141\" y1=\"175\" x2=\"151\" y2=\"175\" stroke=\"#555\" stroke-width=\"1.2\"/><line x1=\"130\" y1=\"127\" x2=\"151\" y2=\"127\" stroke=\"#555\" stroke-width=\"0.8\" stroke-dasharray=\"2 2\"/><text x=\"155\" y=\"156\" font-size=\"14\" font-weight=\"700\" fill=\"#222\">4 m</text><line x1=\"94\" y1=\"191\" x2=\"130\" y2=\"191\" stroke=\"#555\" stroke-width=\"1.2\"/><line x1=\"94\" y1=\"186\" x2=\"94\" y2=\"196\" stroke=\"#555\" stroke-width=\"1.2\"/><line x1=\"130\" y1=\"186\" x2=\"130\" y2=\"196\" stroke=\"#555\" stroke-width=\"1.2\"/><text x=\"112\" y=\"208\" font-size=\"14\" font-weight=\"700\" fill=\"#222\" text-anchor=\"middle\">?</text><text x=\"208\" y=\"18\" font-size=\"14\" font-weight=\"700\" fill=\"#222\">Ladder 2</text><line x1=\"237\" y1=\"175\" x2=\"335\" y2=\"175\" stroke=\"#222\" stroke-width=\"2\"/><line x1=\"325\" y1=\"15\" x2=\"325\" y2=\"175\" stroke=\"#222\" stroke-width=\"3\"/><path d=\"M 315 175 L 315 165 L 325 165\" fill=\"none\" stroke=\"#222\" stroke-width=\"1.2\"/><line x1=\"265\" y1=\"175\" x2=\"325\" y2=\"31\" stroke=\"#c0392b\" stroke-width=\"3\" stroke-linecap=\"round\"/><text x=\"288.5\" y=\"100.3\" font-size=\"14\" font-weight=\"700\" fill=\"#c0392b\" text-anchor=\"middle\" transform=\"rotate(-67.4 288.5 100.3)\">13 m</text><line x1=\"341\" y1=\"31\" x2=\"341\" y2=\"175\" stroke=\"#555\" stroke-width=\"1.2\"/><line x1=\"336\" y1=\"31\" x2=\"346\" y2=\"31\" stroke=\"#555\" stroke-width=\"1.2\"/><line x1=\"336\" y1=\"175\" x2=\"346\" y2=\"175\" stroke=\"#555\" stroke-width=\"1.2\"/><line x1=\"325\" y1=\"31\" x2=\"346\" y2=\"31\" stroke=\"#555\" stroke-width=\"0.8\" stroke-dasharray=\"2 2\"/><text x=\"350\" y=\"108\" font-size=\"14\" font-weight=\"700\" fill=\"#222\">12 m</text><line x1=\"265\" y1=\"191\" x2=\"325\" y2=\"191\" stroke=\"#555\" stroke-width=\"1.2\"/><line x1=\"265\" y1=\"186\" x2=\"265\" y2=\"196\" stroke=\"#555\" stroke-width=\"1.2\"/><line x1=\"325\" y1=\"186\" x2=\"325\" y2=\"196\" stroke=\"#555\" stroke-width=\"1.2\"/><text x=\"295\" y=\"208\" font-size=\"14\" font-weight=\"700\" fill=\"#222\" text-anchor=\"middle\">?</text></svg></div>",
    "options": [
      {
        "text": "\\(2\\) m",
        "correct": true,
        "feedback": "Correct. First foot = \\(\\sqrt{25 - 16} = 3\\) m. Second foot = \\(\\sqrt{169 - 144} = 5\\) m. Difference = 2 m. (bw: Two Pythagoras; comparison.)"
      },
      {
        "text": "\\(8\\) m",
        "correct": false,
        "feedback": "You added the two distances (3 + 5 = 8)."
      },
      {
        "text": "\\(4\\) m",
        "correct": false,
        "feedback": "You gave the first ladder's height (4 m), not the difference."
      },
      {
        "text": "\\(5\\) m",
        "correct": false,
        "feedback": "You gave the second ladder's foot distance (5 m), not the difference."
      }
    ],
    "retryHint": "Compute each foot distance separately, then subtract."
  },
  {
    "itemId": "w8",
    "order": 8,
    "cluster": "angleCalc",
    "clusterName": "Angle calculations",
    "tier": "T",
    "question": "Two parallel lines are cut by a transversal. One co‑interior angle is \\(60^\\circ\\). What is the other co‑interior angle?",
    "options": [
      {
        "text": "\\(120^\\circ\\)",
        "correct": true,
        "feedback": "Correct. Co‑interior angles sum to 180°."
      },
      {
        "text": "\\(60^\\circ\\)",
        "correct": false,
        "feedback": "You assumed the angles are equal — that's corresponding or alternate angles, not co‑interior."
      },
      {
        "text": "\\(30^\\circ\\)",
        "correct": false,
        "feedback": "You halved 60°."
      },
      {
        "text": "\\(240^\\circ\\)",
        "correct": false,
        "feedback": "You used 360° instead of 180°."
      }
    ],
    "retryHint": "Co‑interior angles between parallel lines sum to 180°.",
    "backward": "Angles between parallel lines.",
    "forward": "The trap is confusing co‑interior with corresponding/alternate."
  }
];

const diagnosticItems = [
  {
    "itemId": "d1",
    "order": 1,
    "cluster": "angleCalc",
    "clusterName": "Angle calculations",
    "tier": "S",
    "question": "An angle on a straight line has a partner of \\(47^\\circ\\). Find the other angle.",
    "options": [
      {
        "text": "\\(133^\\circ\\)",
        "correct": true,
        "feedback": "Correct. \\(180 - 47 = 133^\\circ\\). (bw: Angles on a straight line.)"
      },
      {
        "text": "\\(47^\\circ\\)",
        "correct": false,
        "feedback": "You assumed they are equal."
      },
      {
        "text": "\\(43^\\circ\\)",
        "correct": false,
        "feedback": "You subtracted from 90."
      },
      {
        "text": "\\(313^\\circ\\)",
        "correct": false,
        "feedback": "You used 360°."
      }
    ]
  },
  {
    "itemId": "d2",
    "order": 2,
    "cluster": "constructions",
    "clusterName": "Constructions",
    "tier": "C",
    "question": "P is on the perpendicular bisector of AB. If PA = 15 cm, find PB.",
    "options": [
      {
        "text": "\\(15\\) cm",
        "correct": true,
        "feedback": "Correct. Any point on the perpendicular bisector is equidistant from A and B. (bw: Perpendicular bisector property.)"
      },
      {
        "text": "\\(30\\) cm",
        "correct": false,
        "feedback": "You doubled PA."
      },
      {
        "text": "\\(7.5\\) cm",
        "correct": false,
        "feedback": "You halved PA."
      },
      {
        "text": "Cannot be determined",
        "correct": false,
        "feedback": "The property guarantees \\(PB = PA\\)."
      }
    ]
  },
  {
    "itemId": "d3",
    "order": 3,
    "cluster": "interiorPoly",
    "clusterName": "Interior angles of polygons",
    "tier": "S",
    "question": "Find the sum of the interior angles of a pentagon.",
    "options": [
      {
        "text": "\\(540^\\circ\\)",
        "correct": true,
        "feedback": "Correct. \\((5 - 2) \\times 180 = 540^\\circ\\). (bw: Interior sum formula.)"
      },
      {
        "text": "\\(360^\\circ\\)",
        "correct": false,
        "feedback": "360° is for a quadrilateral."
      },
      {
        "text": "\\(720^\\circ\\)",
        "correct": false,
        "feedback": "720° is for a hexagon."
      },
      {
        "text": "\\(450^\\circ\\)",
        "correct": false,
        "feedback": "\\(5 \\times 90 = 450\\) (assuming all angles are right angles)."
      }
    ]
  },
  {
    "itemId": "d4",
    "order": 4,
    "cluster": "pythagoras",
    "clusterName": "Pythagoras' theorem",
    "tier": "C",
    "question": "A right triangle has legs 8 cm and 15 cm. Find its perimeter.",
    "options": [
      {
        "text": "\\(40\\) cm",
        "correct": true,
        "feedback": "Correct. Hyp = \\(\\sqrt{64 + 225} = 17\\). Perimeter = \\(8 + 15 + 17 = 40\\) cm. (bw: Pythagoras; perimeter.)"
      },
      {
        "text": "\\(23\\) cm",
        "correct": false,
        "feedback": "You added only the legs."
      },
      {
        "text": "\\(46\\) cm",
        "correct": false,
        "feedback": "You doubled the sum of the legs (\\(2 \\times 23 = 46\\))."
      },
      {
        "text": "\\(32\\) cm",
        "correct": false,
        "feedback": "You forgot to include the leg 8: \\(15 + 17 = 32\\)."
      }
    ]
  },
  {
    "itemId": "d5",
    "order": 5,
    "cluster": "exteriorPoly",
    "clusterName": "Exterior angles of polygons",
    "tier": "S",
    "question": "What is the sum of the exterior angles of a convex 15‑gon?",
    "options": [
      {
        "text": "\\(360^\\circ\\)",
        "correct": true,
        "feedback": "Correct. Exterior angles sum to 360° for any convex polygon. (bw: Exterior fact.)"
      },
      {
        "text": "\\(5400^\\circ\\)",
        "correct": false,
        "feedback": "\\(5400° = 15 \\times 360\\) (multiplied by the number of sides)."
      },
      {
        "text": "\\(2340^\\circ\\)",
        "correct": false,
        "feedback": "2340° is the interior sum of a 15‑gon."
      },
      {
        "text": "\\(180^\\circ\\)",
        "correct": false,
        "feedback": "180° is a straight line."
      }
    ]
  },
  {
    "itemId": "d6",
    "order": 6,
    "cluster": "pythagoras",
    "clusterName": "Pythagoras' theorem",
    "tier": "C",
    "question": "A rectangle is 12 cm by 5 cm. Find the length of its diagonal.",
    "options": [
      {
        "text": "\\(13\\) cm",
        "correct": true,
        "feedback": "Correct. \\(\\sqrt{144 + 25} = 13\\). (bw: Pythagoras.)"
      },
      {
        "text": "\\(17\\) cm",
        "correct": false,
        "feedback": "You added 12 + 5."
      },
      {
        "text": "\\(60\\) cm",
        "correct": false,
        "feedback": "You multiplied \\(12 \\times 5\\)."
      },
      {
        "text": "\\(169\\) cm",
        "correct": false,
        "feedback": "You stopped at 169."
      }
    ]
  },
  {
    "itemId": "d7",
    "order": 7,
    "cluster": "angleCalc",
    "clusterName": "Angle calculations",
    "tier": "C",
    "question": "Two angles of a triangle are \\(55^\\circ\\) and \\(65^\\circ\\). Find the third angle.",
    "options": [
      {
        "text": "\\(60^\\circ\\)",
        "correct": true,
        "feedback": "Correct. \\(180 - 55 - 65 = 60^\\circ\\). (bw: Triangle angle sum.)"
      },
      {
        "text": "\\(120^\\circ\\)",
        "correct": false,
        "feedback": "You added the two given angles."
      },
      {
        "text": "\\(70^\\circ\\)",
        "correct": false,
        "feedback": "You used 55° twice: \\(180 - 55 - 55 = 70\\)."
      },
      {
        "text": "\\(90^\\circ\\)",
        "correct": false,
        "feedback": "You assumed a right angle."
      }
    ]
  },
  {
    "itemId": "d8",
    "order": 8,
    "cluster": "constructions",
    "clusterName": "Constructions",
    "tier": "T",
    "question": "In the construction of the perpendicular bisector of AB, which statement is FALSE?",
    "options": [
      {
        "text": "The radius of the arcs must be exactly equal to AB.",
        "correct": true,
        "feedback": "Correct. The radius can be any value greater than half of AB — not necessarily exactly AB."
      },
      {
        "text": "The radius of the arcs must be greater than half of AB.",
        "correct": false,
        "feedback": "This is true."
      },
      {
        "text": "Arcs are drawn from both A and B.",
        "correct": false,
        "feedback": "This is true."
      },
      {
        "text": "The line through the two intersection points is perpendicular to AB.",
        "correct": false,
        "feedback": "This is true."
      }
    ],
    "backward": "Construction requirement.",
    "forward": "This is the trap — \"equal to AB\" sounds precise but is not required."
  },
  {
    "itemId": "d9",
    "order": 9,
    "cluster": "interiorPoly",
    "clusterName": "Interior angles of polygons",
    "tier": "C",
    "question": "Find the size of each interior angle of a regular hexagon.",
    "options": [
      {
        "text": "\\(120^\\circ\\)",
        "correct": true,
        "feedback": "Correct. \\((6 - 2) \\times 180 = 720°\\); \\(720 \\div 6 = 120°\\). (bw: Interior of regular polygon.)"
      },
      {
        "text": "\\(60^\\circ\\)",
        "correct": false,
        "feedback": "60° is the exterior angle."
      },
      {
        "text": "\\(720^\\circ\\)",
        "correct": false,
        "feedback": "720° is the sum."
      },
      {
        "text": "\\(108^\\circ\\)",
        "correct": false,
        "feedback": "108° is the interior of a regular pentagon."
      }
    ]
  },
  {
    "itemId": "d10",
    "order": 10,
    "cluster": "pythagoras",
    "clusterName": "Pythagoras' theorem",
    "tier": "C",
    "question": "An isosceles triangle has equal sides 10 cm and base 12 cm. Find its height.",
    "options": [
      {
        "text": "\\(8\\) cm",
        "correct": true,
        "feedback": "Correct. Half base = 6. \\(h = \\sqrt{100 - 36} = 8\\) cm. (bw: Pythagoras; symmetry.)"
      },
      {
        "text": "\\(6\\) cm",
        "correct": false,
        "feedback": "You gave the half‑base, not the height."
      },
      {
        "text": "\\(10\\) cm",
        "correct": false,
        "feedback": "You gave the side length."
      },
      {
        "text": "\\(12\\) cm",
        "correct": false,
        "feedback": "You gave the base."
      }
    ]
  },
  {
    "itemId": "d11",
    "order": 11,
    "cluster": "interiorPoly",
    "clusterName": "Interior angles of polygons",
    "tier": "H",
    "question": "Each interior angle of a regular polygon is \\(165^\\circ\\). Find the sum of its interior angles.",
    "options": [
      {
        "text": "\\(3960^\\circ\\)",
        "correct": true,
        "feedback": "Correct. Exterior = \\(180 - 165 = 15°\\); \\(n = 360 \\div 15 = 24\\). Sum = \\((24 - 2) \\times 180 = 3960°\\). (bw: Interior + exterior; exterior sum; interior sum formula.)"
      },
      {
        "text": "\\(4320^\\circ\\)",
        "correct": false,
        "feedback": "You used \\(24 \\times 180\\) (forgot the −2)."
      },
      {
        "text": "\\(3240^\\circ\\)",
        "correct": false,
        "feedback": "You misread 165° as 162°, giving exterior = 18° and n = 20, so sum = \\((20 - 2) \\times 180 = 3240°\\)."
      },
      {
        "text": "\\(5040^\\circ\\)",
        "correct": false,
        "feedback": "You divided 360 by 12 instead of 15 (perhaps misreading the exterior as 12°), giving n = 30: \\((30 - 2) \\times 180 = 5040°\\)."
      }
    ]
  },
  {
    "itemId": "d12",
    "order": 12,
    "cluster": "mixed",
    "clusterName": "Mixed geometry problems",
    "tier": "T",
    "question": "A right triangle has hypotenuse 25 cm and one leg 7 cm. A second right triangle has hypotenuse 25 cm and one leg 15 cm. How much longer is the first triangle's other leg than the second's?",
    "options": [
      {
        "text": "\\(4\\) cm",
        "correct": true,
        "feedback": "Correct. First: \\(\\sqrt{625 - 49} = 24\\). Second: \\(\\sqrt{625 - 225} = 20\\). Difference = 4 cm."
      },
      {
        "text": "\\(8\\) cm",
        "correct": false,
        "feedback": "You compared the given legs (15 − 7 = 8)."
      },
      {
        "text": "\\(10\\) cm",
        "correct": false,
        "feedback": "You subtracted the second given leg from the hypotenuse (25 − 15 = 10)."
      },
      {
        "text": "\\(22\\) cm",
        "correct": false,
        "feedback": "You added the given legs (15 + 7 = 22)."
      }
    ],
    "backward": "Two Pythagoras; comparison.",
    "forward": "The trap is comparing the given legs (15 − 7 = 8) instead of the other legs."
  },
  {
    "itemId": "d13",
    "order": 13,
    "cluster": "angleCalc",
    "clusterName": "Angle calculations",
    "tier": "S",
    "question": "Two straight lines intersect. One angle is \\(68^\\circ\\). Find the vertically opposite angle.",
    "options": [
      {
        "text": "\\(68^\\circ\\)",
        "correct": true,
        "feedback": "Correct. Vertically opposite angles are equal. (bw: Vertically opposite angles.)"
      },
      {
        "text": "\\(112^\\circ\\)",
        "correct": false,
        "feedback": "112° is the adjacent angle (\\(180 - 68\\))."
      },
      {
        "text": "\\(22^\\circ\\)",
        "correct": false,
        "feedback": "\\(22° = 90 - 68\\)."
      },
      {
        "text": "\\(136^\\circ\\)",
        "correct": false,
        "feedback": "\\(136° = 2 \\times 68\\)."
      }
    ]
  },
  {
    "itemId": "d14",
    "order": 14,
    "cluster": "pythagoras",
    "clusterName": "Pythagoras' theorem",
    "tier": "C",
    "question": "P is on the perpendicular bisector of AB. If AB = 24 cm and PB = 15 cm, find the distance from P to the midpoint of AB.",
    "options": [
      {
        "text": "\\(9\\) cm",
        "correct": true,
        "feedback": "Correct. AM = 12 cm. PM = \\(\\sqrt{225 - 144} = 9\\) cm. (bw: Perpendicular bisector; Pythagoras.)"
      },
      {
        "text": "\\(12\\) cm",
        "correct": false,
        "feedback": "You gave the half‑base (12 cm) — that's AM, not PM."
      },
      {
        "text": "\\(15\\) cm",
        "correct": false,
        "feedback": "You gave PB."
      },
      {
        "text": "\\(24\\) cm",
        "correct": false,
        "feedback": "You gave AB instead of PM."
      }
    ]
  },
  {
    "itemId": "d15",
    "order": 15,
    "cluster": "interiorPoly",
    "clusterName": "Interior angles of polygons",
    "tier": "T",
    "question": "The interior angle of a regular polygon is 5 times its exterior angle. How many sides does the polygon have?",
    "options": [
      {
        "text": "\\(12\\)",
        "correct": true,
        "feedback": "Correct. I = 5E; I + E = 180 → 6E = 180 → E = 30 → \\(n = 360 \\div 30 = 12\\). (bw: Interior + exterior; exterior sum.)"
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
    ]
  },
  {
    "itemId": "d16",
    "order": 16,
    "cluster": "pythagoras",
    "clusterName": "Pythagoras' theorem",
    "tier": "H",
    "question": "An isosceles right triangle has hypotenuse \\(8\\sqrt{2}\\) cm. Find its area.",
    "options": [
      {
        "text": "\\(32\\text{ cm}^2\\)",
        "correct": true,
        "feedback": "Correct. \\(2L^2 = (8\\sqrt{2})^2 = 128\\), \\(L^2 = 64\\), \\(L = 8\\). Area = \\(\\tfrac{1}{2} \\times 8 \\times 8 = 32\\) cm². (bw: Pythagoras on isosceles right; area.)"
      },
      {
        "text": "\\(64\\text{ cm}^2\\)",
        "correct": false,
        "feedback": "You used \\(c^2 \\div 2 = 64\\) as the area."
      },
      {
        "text": "\\(128\\text{ cm}^2\\)",
        "correct": false,
        "feedback": "You used \\(c^2 = 128\\) as the area."
      },
      {
        "text": "\\(8\\text{ cm}^2\\)",
        "correct": false,
        "feedback": "You halved the coefficient (used \\(c = 4\\sqrt{2}\\)), giving \\(L = 4\\) and area \\(8\\)."
      }
    ]
  },
  {
    "itemId": "d17",
    "order": 17,
    "cluster": "exteriorPoly",
    "clusterName": "Exterior angles of polygons",
    "tier": "S",
    "question": "Each exterior angle of a regular polygon is \\(20^\\circ\\). How many sides?",
    "options": [
      {
        "text": "\\(18\\)",
        "correct": true,
        "feedback": "Correct. \\(n = 360 \\div 20 = 18\\). (bw: Exterior sum.)"
      },
      {
        "text": "\\(20\\)",
        "correct": false,
        "feedback": "You gave the angle itself (20)."
      },
      {
        "text": "\\(9\\)",
        "correct": false,
        "feedback": "You halved the answer."
      },
      {
        "text": "\\(36\\)",
        "correct": false,
        "feedback": "You doubled the answer."
      }
    ]
  },
  {
    "itemId": "d18",
    "order": 18,
    "cluster": "mixed",
    "clusterName": "Mixed geometry problems",
    "tier": "H",
    "question": "A 17 m ladder reaches 15 m up a wall. A 25 m ladder reaches 24 m up the same wall. Which ladder's foot is farther from the wall, and by how much?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 390 215\" width=\"540\" height=\"298\"><text x=\"13\" y=\"18\" font-size=\"14\" font-weight=\"700\" fill=\"#222\">Ladder 1</text><line x1=\"54\" y1=\"175\" x2=\"140\" y2=\"175\" stroke=\"#222\" stroke-width=\"2\"/><line x1=\"130\" y1=\"69\" x2=\"130\" y2=\"175\" stroke=\"#222\" stroke-width=\"3\"/><path d=\"M 120 175 L 120 165 L 130 165\" fill=\"none\" stroke=\"#222\" stroke-width=\"1.2\"/><line x1=\"82\" y1=\"175\" x2=\"130\" y2=\"85\" stroke=\"#c0392b\" stroke-width=\"3\" stroke-linecap=\"round\"/><text x=\"99.8\" y=\"126.7\" font-size=\"14\" font-weight=\"700\" fill=\"#c0392b\" text-anchor=\"middle\" transform=\"rotate(-61.9 99.8 126.7)\">17 m</text><line x1=\"146\" y1=\"85\" x2=\"146\" y2=\"175\" stroke=\"#555\" stroke-width=\"1.2\"/><line x1=\"141\" y1=\"85\" x2=\"151\" y2=\"85\" stroke=\"#555\" stroke-width=\"1.2\"/><line x1=\"141\" y1=\"175\" x2=\"151\" y2=\"175\" stroke=\"#555\" stroke-width=\"1.2\"/><line x1=\"130\" y1=\"85\" x2=\"151\" y2=\"85\" stroke=\"#555\" stroke-width=\"0.8\" stroke-dasharray=\"2 2\"/><text x=\"155\" y=\"135\" font-size=\"14\" font-weight=\"700\" fill=\"#222\">15 m</text><line x1=\"82\" y1=\"191\" x2=\"130\" y2=\"191\" stroke=\"#555\" stroke-width=\"1.2\"/><line x1=\"82\" y1=\"186\" x2=\"82\" y2=\"196\" stroke=\"#555\" stroke-width=\"1.2\"/><line x1=\"130\" y1=\"186\" x2=\"130\" y2=\"196\" stroke=\"#555\" stroke-width=\"1.2\"/><text x=\"106\" y=\"208\" font-size=\"14\" font-weight=\"700\" fill=\"#222\" text-anchor=\"middle\">?</text><text x=\"208\" y=\"18\" font-size=\"14\" font-weight=\"700\" fill=\"#222\">Ladder 2</text><line x1=\"255\" y1=\"175\" x2=\"335\" y2=\"175\" stroke=\"#222\" stroke-width=\"2\"/><line x1=\"325\" y1=\"15\" x2=\"325\" y2=\"175\" stroke=\"#222\" stroke-width=\"3\"/><path d=\"M 315 175 L 315 165 L 325 165\" fill=\"none\" stroke=\"#222\" stroke-width=\"1.2\"/><line x1=\"283\" y1=\"175\" x2=\"325\" y2=\"31\" stroke=\"#c0392b\" stroke-width=\"3\" stroke-linecap=\"round\"/><text x=\"297.3\" y=\"101\" font-size=\"14\" font-weight=\"700\" fill=\"#c0392b\" text-anchor=\"middle\" transform=\"rotate(-73.7 297.3 101)\">25 m</text><line x1=\"341\" y1=\"31\" x2=\"341\" y2=\"175\" stroke=\"#555\" stroke-width=\"1.2\"/><line x1=\"336\" y1=\"31\" x2=\"346\" y2=\"31\" stroke=\"#555\" stroke-width=\"1.2\"/><line x1=\"336\" y1=\"175\" x2=\"346\" y2=\"175\" stroke=\"#555\" stroke-width=\"1.2\"/><line x1=\"325\" y1=\"31\" x2=\"346\" y2=\"31\" stroke=\"#555\" stroke-width=\"0.8\" stroke-dasharray=\"2 2\"/><text x=\"350\" y=\"108\" font-size=\"14\" font-weight=\"700\" fill=\"#222\">24 m</text><line x1=\"283\" y1=\"191\" x2=\"325\" y2=\"191\" stroke=\"#555\" stroke-width=\"1.2\"/><line x1=\"283\" y1=\"186\" x2=\"283\" y2=\"196\" stroke=\"#555\" stroke-width=\"1.2\"/><line x1=\"325\" y1=\"186\" x2=\"325\" y2=\"196\" stroke=\"#555\" stroke-width=\"1.2\"/><text x=\"304\" y=\"208\" font-size=\"14\" font-weight=\"700\" fill=\"#222\" text-anchor=\"middle\">?</text></svg></div>",
    "options": [
      {
        "text": "The first ladder's, by 1 m",
        "correct": true,
        "feedback": "Correct. First foot = \\(\\sqrt{289 - 225} = 8\\) m. Second foot = \\(\\sqrt{625 - 576} = 7\\) m. The first ladder's foot is farther, by 1 m."
      },
      {
        "text": "The second ladder's, by 1 m",
        "correct": false,
        "feedback": "You reversed the comparison — the first ladder's foot is farther, not the second's."
      },
      {
        "text": "The first ladder's, by 8 m",
        "correct": false,
        "feedback": "You picked the correct direction but reported the first ladder's foot distance (8 m) instead of the difference (1 m)."
      },
      {
        "text": "The first ladder's, by 7 m",
        "correct": false,
        "feedback": "You picked the correct direction but reported the second ladder's foot distance (7 m) instead of the difference (1 m)."
      }
    ],
    "backward": "Two Pythagoras; comparison.",
    "forward": "The longer ladder does not automatically have the farther foot — a good trap."
  },
  {
    "itemId": "d19",
    "order": 19,
    "cluster": "angleCalc",
    "clusterName": "Angle calculations",
    "tier": "C",
    "question": "The angles of a triangle are in the ratio \\(2:3:4\\). Find the largest angle.",
    "options": [
      {
        "text": "\\(80^\\circ\\)",
        "correct": true,
        "feedback": "Correct. 9 parts = 180°, each = 20°. Largest = \\(4 \\times 20 = 80°\\). (bw: Triangle angle sum; ratio.)"
      },
      {
        "text": "\\(60^\\circ\\)",
        "correct": false,
        "feedback": "You gave the middle angle."
      },
      {
        "text": "\\(40^\\circ\\)",
        "correct": false,
        "feedback": "You gave the smallest angle."
      },
      {
        "text": "\\(90^\\circ\\)",
        "correct": false,
        "feedback": "You assumed a right angle."
      }
    ]
  },
  {
    "itemId": "d20",
    "order": 20,
    "cluster": "constructions",
    "clusterName": "Constructions",
    "tier": "T",
    "question": "A student says: \"I can construct the perpendicular bisector of AB by drawing arcs of radius exactly \\(AB/2\\) from A and B.\" What actually happens?",
    "options": [
      {
        "text": "The arcs touch at a single point (the midpoint), so no bisector can be drawn.",
        "correct": true,
        "feedback": "Correct. At \\(r = AB/2\\), the arcs touch at exactly one point (the midpoint). Two intersection points are needed."
      },
      {
        "text": "The arcs meet at two points as usual, and the bisector is drawn.",
        "correct": false,
        "feedback": "Two intersections require \\(r > AB/2\\)."
      },
      {
        "text": "The arcs miss each other entirely.",
        "correct": false,
        "feedback": "At exactly \\(r = AB/2\\) the arcs touch — they don't miss."
      },
      {
        "text": "A perpendicular bisector is drawn correctly.",
        "correct": false,
        "feedback": "The construction fails at this radius."
      }
    ],
    "backward": "Construction requirement.",
    "forward": "This is the trap — \"half\" sounds sufficient."
  }
];

const recheckItems = [
  {
    "itemId": "r1",
    "order": 1,
    "cluster": "angleCalc",
    "clusterName": "Angle calculations",
    "question": "An angle on a straight line has a partner of \\(128^\\circ\\). Find the other angle.",
    "options": [
      {
        "text": "\\(52^\\circ\\)",
        "correct": true,
        "feedback": "Correct. \\(180 - 128 = 52^\\circ\\). (bw: Angles on a straight line.)"
      },
      {
        "text": "\\(128^\\circ\\)",
        "correct": false,
        "feedback": "You assumed they are equal."
      },
      {
        "text": "\\(42^\\circ\\)",
        "correct": false,
        "feedback": "You mis-added 128 as 138: \\(180 - 138 = 42\\)."
      },
      {
        "text": "\\(232^\\circ\\)",
        "correct": false,
        "feedback": "You used 360° instead of 180°."
      }
    ]
  },
  {
    "itemId": "r2",
    "order": 2,
    "cluster": "constructions",
    "clusterName": "Constructions",
    "question": "P is on the perpendicular bisector of AB. If PA = 20 cm, find PB.",
    "options": [
      {
        "text": "\\(20\\) cm",
        "correct": true,
        "feedback": "Correct. Any point on the perpendicular bisector is equidistant from A and B. (bw: Perpendicular bisector property.)"
      },
      {
        "text": "\\(40\\) cm",
        "correct": false,
        "feedback": "You doubled PA."
      },
      {
        "text": "\\(10\\) cm",
        "correct": false,
        "feedback": "You halved PA."
      },
      {
        "text": "Cannot be determined",
        "correct": false,
        "feedback": "The property guarantees \\(PB = PA\\)."
      }
    ]
  },
  {
    "itemId": "r3",
    "order": 3,
    "cluster": "interiorPoly",
    "clusterName": "Interior angles of polygons",
    "question": "Find the sum of the interior angles of an octagon.",
    "options": [
      {
        "text": "\\(1080^\\circ\\)",
        "correct": true,
        "feedback": "Correct. \\((8 - 2) \\times 180 = 1080^\\circ\\). (bw: Interior sum formula.)"
      },
      {
        "text": "\\(1440^\\circ\\)",
        "correct": false,
        "feedback": "1440° is for a decagon."
      },
      {
        "text": "\\(720^\\circ\\)",
        "correct": false,
        "feedback": "720° is for a hexagon."
      },
      {
        "text": "\\(900^\\circ\\)",
        "correct": false,
        "feedback": "900° is for a heptagon."
      }
    ]
  },
  {
    "itemId": "r4",
    "order": 4,
    "cluster": "pythagoras",
    "clusterName": "Pythagoras' theorem",
    "question": "A right triangle has legs 9 cm and 12 cm. Find its hypotenuse.",
    "options": [
      {
        "text": "\\(15\\) cm",
        "correct": true,
        "feedback": "Correct. \\(\\sqrt{81 + 144} = 15\\). (bw: Pythagoras.)"
      },
      {
        "text": "\\(21\\) cm",
        "correct": false,
        "feedback": "You added the legs."
      },
      {
        "text": "\\(225\\) cm",
        "correct": false,
        "feedback": "You stopped at 225."
      },
      {
        "text": "\\(108\\) cm",
        "correct": false,
        "feedback": "You multiplied the legs."
      }
    ]
  },
  {
    "itemId": "r5",
    "order": 5,
    "cluster": "exteriorPoly",
    "clusterName": "Exterior angles of polygons",
    "question": "What is the sum of the exterior angles of a convex 20‑gon?",
    "options": [
      {
        "text": "\\(360^\\circ\\)",
        "correct": true,
        "feedback": "Correct. Always 360° for any convex polygon. (bw: Exterior fact.)"
      },
      {
        "text": "\\(7200^\\circ\\)",
        "correct": false,
        "feedback": "\\(7200° = 20 \\times 360\\)."
      },
      {
        "text": "\\(3240^\\circ\\)",
        "correct": false,
        "feedback": "3240° is the interior sum of a 20‑gon."
      },
      {
        "text": "\\(180^\\circ\\)",
        "correct": false,
        "feedback": "180° is a straight line."
      }
    ]
  },
  {
    "itemId": "r6",
    "order": 6,
    "cluster": "pythagoras",
    "clusterName": "Pythagoras' theorem",
    "question": "A rectangular field is 24 m by 10 m. How long is the diagonal path across it?",
    "options": [
      {
        "text": "\\(26\\) m",
        "correct": true,
        "feedback": "Correct. \\(\\sqrt{576 + 100} = 26\\) m. (bw: Pythagoras.)"
      },
      {
        "text": "\\(34\\) m",
        "correct": false,
        "feedback": "You added \\(24 + 10\\)."
      },
      {
        "text": "\\(240\\) m",
        "correct": false,
        "feedback": "You multiplied \\(24 \\times 10\\)."
      },
      {
        "text": "\\(17\\) m",
        "correct": false,
        "feedback": "You averaged 24 and 10."
      }
    ]
  },
  {
    "itemId": "r7",
    "order": 7,
    "cluster": "angleCalc",
    "clusterName": "Angle calculations",
    "question": "Two angles of a triangle are \\(48^\\circ\\) and \\(72^\\circ\\). Find the third angle.",
    "options": [
      {
        "text": "\\(60^\\circ\\)",
        "correct": true,
        "feedback": "Correct. \\(180 - 48 - 72 = 60^\\circ\\). (bw: Triangle angle sum.)"
      },
      {
        "text": "\\(120^\\circ\\)",
        "correct": false,
        "feedback": "You added the two given angles."
      },
      {
        "text": "\\(50^\\circ\\)",
        "correct": false,
        "feedback": "You used 58° instead of 48°: \\(180 - 58 - 72 = 50\\)."
      },
      {
        "text": "\\(240^\\circ\\)",
        "correct": false,
        "feedback": "You used 360° instead of 180°."
      }
    ]
  },
  {
    "itemId": "r8",
    "order": 8,
    "cluster": "constructions",
    "clusterName": "Constructions",
    "question": "To construct the perpendicular bisector of AB, why must both arcs (from A and from B) have the same radius?",
    "options": [
      {
        "text": "So the intersection points are equidistant from A and B.",
        "correct": true,
        "feedback": "Correct. Equal radii guarantee the intersection points are equidistant from both endpoints, which is what defines the perpendicular bisector. (bw: Construction property.)"
      },
      {
        "text": "So the arcs intersect at all.",
        "correct": false,
        "feedback": "Different radii would still intersect — but the intersections wouldn't be equidistant from A and B."
      },
      {
        "text": "So the line is straight.",
        "correct": false,
        "feedback": "Straightness of the bisector follows from the construction, not from the radii."
      },
      {
        "text": "So the construction is faster.",
        "correct": false,
        "feedback": "Speed is not relevant."
      }
    ]
  },
  {
    "itemId": "r9",
    "order": 9,
    "cluster": "interiorPoly",
    "clusterName": "Interior angles of polygons",
    "question": "Find the size of each interior angle of a regular decagon.",
    "options": [
      {
        "text": "\\(144^\\circ\\)",
        "correct": true,
        "feedback": "Correct. Sum = \\((10 - 2) \\times 180 = 1440°\\); each = \\(1440 \\div 10 = 144°\\). (bw: Interior of regular polygon.)"
      },
      {
        "text": "\\(36^\\circ\\)",
        "correct": false,
        "feedback": "36° is the exterior angle."
      },
      {
        "text": "\\(1440^\\circ\\)",
        "correct": false,
        "feedback": "1440° is the sum."
      },
      {
        "text": "\\(135^\\circ\\)",
        "correct": false,
        "feedback": "135° is the interior of a regular octagon."
      }
    ]
  },
  {
    "itemId": "r10",
    "order": 10,
    "cluster": "pythagoras",
    "clusterName": "Pythagoras' theorem",
    "question": "An isosceles triangle has equal sides 13 cm and base 10 cm. Find its height.",
    "options": [
      {
        "text": "\\(12\\) cm",
        "correct": true,
        "feedback": "Correct. Half base = 5. \\(h = \\sqrt{169 - 25} = 12\\) cm. (bw: Pythagoras; symmetry.)"
      },
      {
        "text": "\\(5\\) cm",
        "correct": false,
        "feedback": "You gave the half‑base."
      },
      {
        "text": "\\(13\\) cm",
        "correct": false,
        "feedback": "You gave the side length."
      },
      {
        "text": "\\(24\\) cm",
        "correct": false,
        "feedback": "You doubled the correct answer."
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
    title: "Angles — Speed & Strategy",
    subtitle: "Grade 8 · Level 4 · Speed & Strategy · Olympiad Simulation",
    description: "A 25-minute timed diagnostic mixing Speed, Core, Challenge and Trap items across every angles cluster.",
    clusterNames: CLUSTER_NAMES,
    gateReviewHTML: "<p>You’ve completed the warm‑up. The next 20 questions are the <strong>Speed &amp; Strategy diagnostic</strong>. You have <strong>25 minutes</strong> in total — a timer starts when you enter. You can <strong>skip</strong> any question and come back later. Items are tiered: <strong>S</strong> (Speed) — answer fast, <strong>C</strong> (Core) — multi‑step, <strong>H</strong> (Challenge) — deeper synthesis, <strong>T</strong> (Trap) — read carefully. Move fast on easy items, slow down on traps, and don’t get stuck.</p>",
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

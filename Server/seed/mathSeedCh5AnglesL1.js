// seed/mathSeedCh5AnglesL1.js
//
// Populates math_chapters and math_questions with Grade 8, Chapter 5
// (Angles), Level 1 — converted from the standalone diagnostic
// JSON ch5-angles-level-1.json. Diagrams are inlined as SVG HTML
// directly in each question's text (the schema has no separate diagram
// field, and question text is already rendered as raw HTML).
//
// Run with: node seed/mathSeedCh5AnglesL1.js

const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-8";
const GRADE_LABEL = "Grade 8";
const CHAPTER_SLUG = "ch-5-angles";
const CHAPTER_NAME = "Angles";
const LEVEL = 1;

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
    "question": "The two angles lie on a straight line. Find \\(x\\).<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 200 170\" width=\"300\" height=\"255\"><line x1=\"10\" y1=\"130\" x2=\"190\" y2=\"130\" stroke=\"#222\" stroke-width=\"2\"/><line x1=\"100\" y1=\"130\" x2=\"66.2\" y2=\"57.5\" stroke=\"#222\" stroke-width=\"2\"/><circle cx=\"100\" cy=\"130\" r=\"2\" fill=\"#222\"/><path d=\"M 70 130 A 30 30 0 0 1 87.3 102.8\" fill=\"none\" stroke=\"#c0392b\" stroke-width=\"2\"/><path d=\"M 87.3 102.8 A 30 30 0 0 1 130 130\" fill=\"none\" stroke=\"#c0392b\" stroke-width=\"2\"/><text x=\"56\" y=\"116\" font-size=\"14\" fill=\"#c0392b\" text-anchor=\"middle\">65&#176;</text><text x=\"128\" y=\"106\" font-size=\"14\" fill=\"#222\" text-anchor=\"middle\">x</text></svg></div>",
    "options": [
      {
        "text": "\\(115^\\circ\\)",
        "correct": true,
        "feedback": "Correct. Angles on a straight line sum to 180°: \\(x = 180 - 65 = 115^\\circ\\)."
      },
      {
        "text": "\\(25^\\circ\\)",
        "correct": false,
        "feedback": "You subtracted from 90 instead of 180."
      },
      {
        "text": "\\(65^\\circ\\)",
        "correct": false,
        "feedback": "You assumed vertically opposite angles — but these angles lie on a line, so they sum to 180°."
      },
      {
        "text": "\\(295^\\circ\\)",
        "correct": false,
        "feedback": "You used 360° (angles around a point) instead of 180°."
      }
    ],
    "retryHint": "Angles on a straight line always sum to 180°.",
    "backward": "Angles on a straight line.",
    "forward": "Used whenever two angles form a linear pair."
  },
  {
    "itemId": "w2",
    "order": 2,
    "cluster": "interiorPoly",
    "clusterName": "Interior angles of polygons",
    "question": "What is the sum of the interior angles of a quadrilateral?",
    "options": [
      {
        "text": "\\(360^\\circ\\)",
        "correct": true,
        "feedback": "Correct. \\((4 - 2) \\times 180 = 360^\\circ\\)."
      },
      {
        "text": "\\(180^\\circ\\)",
        "correct": false,
        "feedback": "180° is the sum for a triangle."
      },
      {
        "text": "\\(540^\\circ\\)",
        "correct": false,
        "feedback": "540° is the sum for a pentagon."
      },
      {
        "text": "\\(720^\\circ\\)",
        "correct": false,
        "feedback": "720° is the sum for a hexagon."
      }
    ],
    "retryHint": "Use \\((n - 2) \\times 180^\\circ\\) with \\(n = 4\\).",
    "backward": "Interior angle sum formula.",
    "forward": "Used to find missing angles in any quadrilateral."
  },
  {
    "itemId": "w3",
    "order": 3,
    "cluster": "exteriorPoly",
    "clusterName": "Exterior angles of polygons",
    "question": "What is the sum of the exterior angles of any convex polygon?",
    "options": [
      {
        "text": "\\(360^\\circ\\)",
        "correct": true,
        "feedback": "Correct. The exterior angles of any convex polygon sum to 360°."
      },
      {
        "text": "\\(180^\\circ\\)",
        "correct": false,
        "feedback": "180° is a straight line, not the exterior angle sum."
      },
      {
        "text": "It depends on the number of sides",
        "correct": false,
        "feedback": "The sum is always 360° regardless of the number of sides."
      },
      {
        "text": "\\(540^\\circ\\)",
        "correct": false,
        "feedback": "540° is the interior angle sum for a pentagon."
      }
    ],
    "retryHint": "Imagine walking around the polygon — you turn through a full circle.",
    "backward": "Exterior angle fact.",
    "forward": "Used to find the number of sides from an exterior angle."
  },
  {
    "itemId": "w4",
    "order": 4,
    "cluster": "pythagoras",
    "clusterName": "Pythagoras' theorem",
    "question": "A right triangle has legs of length 3 cm and 4 cm. Find the hypotenuse.",
    "options": [
      {
        "text": "\\(5\\) cm",
        "correct": true,
        "feedback": "Correct. \\(c^2 = 3^2 + 4^2 = 9 + 16 = 25\\), so \\(c = 5\\)."
      },
      {
        "text": "\\(7\\) cm",
        "correct": false,
        "feedback": "You added the legs (\\(3 + 4\\))."
      },
      {
        "text": "\\(12\\) cm",
        "correct": false,
        "feedback": "You multiplied the legs (\\(3 \\times 4\\))."
      },
      {
        "text": "\\(25\\) cm",
        "correct": false,
        "feedback": "You stopped at \\(c^2 = 25\\) without taking the square root."
      }
    ],
    "retryHint": "\\(c^2 = a^2 + b^2\\), then take the square root.",
    "backward": "Pythagoras' theorem.",
    "forward": "The 3‑4‑5 triangle is the smallest Pythagorean triple."
  },
  {
    "itemId": "w5",
    "order": 5,
    "cluster": "angleCalc",
    "clusterName": "Angle calculations",
    "question": "Two angles in a triangle are \\(50^\\circ\\) and \\(60^\\circ\\). Find the third angle.<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 200 180\" width=\"300\" height=\"270\"><polygon points=\"20,160 170,160 109,54\" fill=\"none\" stroke=\"#222\" stroke-width=\"2\"/><path d=\"M 45 160 A 25 25 0 0 0 36.07 140.85\" fill=\"none\" stroke=\"#c0392b\" stroke-width=\"2\"/><path d=\"M 145 160 A 25 25 0 0 1 157.5 138.35\" fill=\"none\" stroke=\"#c0392b\" stroke-width=\"2\"/><text x=\"52\" y=\"146\" font-size=\"14\" fill=\"#c0392b\" text-anchor=\"middle\">50&#176;</text><text x=\"135\" y=\"137\" font-size=\"14\" fill=\"#c0392b\" text-anchor=\"middle\">60&#176;</text><text x=\"105\" y=\"47\" font-size=\"14\" fill=\"#222\" text-anchor=\"middle\">x</text></svg></div>",
    "options": [
      {
        "text": "\\(70^\\circ\\)",
        "correct": true,
        "feedback": "Correct. \\(180 - 50 - 60 = 70^\\circ\\)."
      },
      {
        "text": "\\(110^\\circ\\)",
        "correct": false,
        "feedback": "You stopped at the sum of the two given angles (\\(50 + 60 = 110^\\circ\\)) instead of subtracting from 180°."
      },
      {
        "text": "\\(80^\\circ\\)",
        "correct": false,
        "feedback": "You used 50° instead of 60° twice: \\(180 - 50 - 50 = 80^\\circ\\)."
      },
      {
        "text": "\\(60^\\circ\\)",
        "correct": false,
        "feedback": "You assumed all angles are equal."
      }
    ],
    "retryHint": "The three angles in a triangle sum to 180°.",
    "backward": "Angles in a triangle.",
    "forward": "Any triangle problem uses this."
  },
  {
    "itemId": "w6",
    "order": 6,
    "cluster": "constructions",
    "clusterName": "Constructions",
    "question": "To construct the perpendicular bisector of segment AB, what is the first step?",
    "options": [
      {
        "text": "Draw arcs of equal radius (more than half of AB) centred at A and at B.",
        "correct": true,
        "feedback": "Correct. Equal arcs from A and B (radius > half of AB) intersect above and below the segment."
      },
      {
        "text": "Draw a line through A perpendicular to AB.",
        "correct": false,
        "feedback": "That gives a perpendicular at A, not at the midpoint."
      },
      {
        "text": "Draw a line through the midpoint of AB at any angle.",
        "correct": false,
        "feedback": "The angle is not fixed; the line must be perpendicular."
      },
      {
        "text": "Measure the length of AB with a ruler.",
        "correct": false,
        "feedback": "Measuring the length doesn't construct the bisector."
      }
    ],
    "retryHint": "You need two points equidistant from A and B.",
    "backward": "The standard perpendicular bisector construction.",
    "forward": "Used to find the midpoint of a segment."
  },
  {
    "itemId": "w7",
    "order": 7,
    "cluster": "interiorPoly",
    "clusterName": "Interior angles of polygons",
    "question": "Find the size of each interior angle of a regular hexagon.",
    "options": [
      {
        "text": "\\(120^\\circ\\)",
        "correct": true,
        "feedback": "Correct. Sum \\(= (6 - 2) \\times 180 = 720^\\circ\\). Each interior angle \\(= 720 \\div 6 = 120^\\circ\\)."
      },
      {
        "text": "\\(60^\\circ\\)",
        "correct": false,
        "feedback": "60° is the exterior angle (\\(360 \\div 6\\))."
      },
      {
        "text": "\\(720^\\circ\\)",
        "correct": false,
        "feedback": "720° is the sum, not one angle."
      },
      {
        "text": "\\(108^\\circ\\)",
        "correct": false,
        "feedback": "108° is the interior angle of a regular pentagon."
      }
    ],
    "retryHint": "Find the sum first, then divide by the number of sides.",
    "backward": "Regular polygon interior angle.",
    "forward": "Used in tessellation problems."
  },
  {
    "itemId": "w8",
    "order": 8,
    "cluster": "pythagoras",
    "clusterName": "Pythagoras' theorem",
    "question": "A right triangle has legs of length 5 cm and 12 cm. Find the hypotenuse.",
    "options": [
      {
        "text": "\\(13\\) cm",
        "correct": true,
        "feedback": "Correct. \\(c^2 = 25 + 144 = 169\\), \\(c = 13\\)."
      },
      {
        "text": "\\(17\\) cm",
        "correct": false,
        "feedback": "You added the legs."
      },
      {
        "text": "\\(60\\) cm",
        "correct": false,
        "feedback": "You multiplied the legs."
      },
      {
        "text": "\\(169\\) cm",
        "correct": false,
        "feedback": "You stopped at \\(c^2 = 169\\)."
      }
    ],
    "retryHint": "\\(c^2 = a^2 + b^2\\), then take the square root.",
    "backward": "Pythagoras' theorem.",
    "forward": "5‑12‑13 is another Pythagorean triple."
  }
];

const diagnosticItems = [
  {
    "itemId": "d1",
    "order": 1,
    "cluster": "angleCalc",
    "clusterName": "Angle calculations",
    "question": "The two angles lie on a straight line. Find \\(x\\).<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 200 170\" width=\"300\" height=\"255\"><line x1=\"10\" y1=\"130\" x2=\"190\" y2=\"130\" stroke=\"#222\" stroke-width=\"2\"/><line x1=\"100\" y1=\"130\" x2=\"54.1\" y2=\"64.5\" stroke=\"#222\" stroke-width=\"2\"/><circle cx=\"100\" cy=\"130\" r=\"2\" fill=\"#222\"/><path d=\"M 130 130 A 30 30 0 0 0 82.8 105.4\" fill=\"none\" stroke=\"#c0392b\" stroke-width=\"2\"/><path d=\"M 82.8 105.4 A 30 30 0 0 0 70 130\" fill=\"none\" stroke=\"#c0392b\" stroke-width=\"2\"/><text x=\"120\" y=\"95\" font-size=\"14\" fill=\"#c0392b\" text-anchor=\"middle\">125&#176;</text><text x=\"58\" y=\"108\" font-size=\"14\" fill=\"#222\" text-anchor=\"middle\">x</text></svg></div>",
    "options": [
      {
        "text": "\\(55^\\circ\\)",
        "correct": true,
        "feedback": "Correct. \\(180 - 125 = 55^\\circ\\)."
      },
      {
        "text": "\\(305^\\circ\\)",
        "correct": false,
        "feedback": "You found 55° correctly and then subtracted it from 360° — the two angles lie on a straight line, not around a point."
      },
      {
        "text": "\\(125^\\circ\\)",
        "correct": false,
        "feedback": "You assumed vertically opposite angles — but these angles lie on a line and sum to 180°."
      },
      {
        "text": "\\(235^\\circ\\)",
        "correct": false,
        "feedback": "You used 360° (angles around a point) instead of 180°."
      }
    ],
    "backward": "Angles on a straight line sum to 180°.",
    "forward": "Used when two angles form a linear pair."
  },
  {
    "itemId": "d2",
    "order": 2,
    "cluster": "constructions",
    "clusterName": "Constructions",
    "question": "Which of these is NOT a step in constructing the perpendicular bisector of segment AB?",
    "options": [
      {
        "text": "Measure the length of AB with a ruler.",
        "correct": true,
        "feedback": "Correct. Measuring with a ruler is not part of the straight-edge-and-compass construction."
      },
      {
        "text": "Draw an arc centred at A with radius more than half of AB.",
        "correct": false,
        "feedback": "This is a correct step."
      },
      {
        "text": "Draw an arc centred at B with the same radius as the arc from A.",
        "correct": false,
        "feedback": "This is a correct step (equal radii are essential)."
      },
      {
        "text": "Draw a line through the two points where the arcs intersect.",
        "correct": false,
        "feedback": "This is the final step that produces the perpendicular bisector."
      }
    ],
    "backward": "Straight-edge and compass constructions do not involve measurement.",
    "forward": "The construction works for any segment without knowing its length."
  },
  {
    "itemId": "d3",
    "order": 3,
    "cluster": "interiorPoly",
    "clusterName": "Interior angles of polygons",
    "question": "Find the sum of the interior angles of a pentagon.",
    "options": [
      {
        "text": "\\(540^\\circ\\)",
        "correct": true,
        "feedback": "Correct. \\((5 - 2) \\times 180 = 540^\\circ\\)."
      },
      {
        "text": "\\(360^\\circ\\)",
        "correct": false,
        "feedback": "360° is the sum for a quadrilateral."
      },
      {
        "text": "\\(720^\\circ\\)",
        "correct": false,
        "feedback": "720° is the sum for a hexagon."
      },
      {
        "text": "\\(450^\\circ\\)",
        "correct": false,
        "feedback": "You multiplied the number of sides by 90° (5 × 90 = 450°), treating every angle as a right angle."
      }
    ],
    "backward": "Interior angle sum formula.",
    "forward": "Used to find missing angles in any pentagon."
  },
  {
    "itemId": "d4",
    "order": 4,
    "cluster": "pythagoras",
    "clusterName": "Pythagoras' theorem",
    "question": "A right triangle has legs of length 6 cm and 8 cm. Find the hypotenuse.",
    "options": [
      {
        "text": "\\(10\\) cm",
        "correct": true,
        "feedback": "Correct. \\(c^2 = 36 + 64 = 100\\), \\(c = 10\\)."
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
    "backward": "Pythagoras' theorem.",
    "forward": "6‑8‑10 is a multiple of 3‑4‑5."
  },
  {
    "itemId": "d5",
    "order": 5,
    "cluster": "exteriorPoly",
    "clusterName": "Exterior angles of polygons",
    "question": "What is the sum of the exterior angles of a convex decagon?",
    "options": [
      {
        "text": "\\(360^\\circ\\)",
        "correct": true,
        "feedback": "Correct. The exterior angles of any convex polygon sum to 360°, regardless of the number of sides."
      },
      {
        "text": "\\(1440^\\circ\\)",
        "correct": false,
        "feedback": "1440° is the interior angle sum for a decagon."
      },
      {
        "text": "\\(180^\\circ\\)",
        "correct": false,
        "feedback": "180° is a straight line."
      },
      {
        "text": "\\(3600^\\circ\\)",
        "correct": false,
        "feedback": "3600° = 360 × 10 (multiplying by the number of sides incorrectly)."
      }
    ],
    "backward": "Exterior angle fact.",
    "forward": "Used to find the number of sides from an exterior angle."
  },
  {
    "itemId": "d6",
    "order": 6,
    "cluster": "pythagoras",
    "clusterName": "Pythagoras' theorem",
    "question": "A 5 m ladder leans against a wall. Its foot is 3 m from the wall. How high up the wall does the ladder reach?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 200 215\" width=\"300\" height=\"323\"><line x1=\"12\" y1=\"175\" x2=\"140\" y2=\"175\" stroke=\"#222\" stroke-width=\"2\"/><line x1=\"130\" y1=\"39\" x2=\"130\" y2=\"175\" stroke=\"#222\" stroke-width=\"3\"/><path d=\"M 120 175 L 120 165 L 130 165\" fill=\"none\" stroke=\"#222\" stroke-width=\"1.2\"/><line x1=\"40\" y1=\"175\" x2=\"130\" y2=\"55\" stroke=\"#c0392b\" stroke-width=\"3\" stroke-linecap=\"round\"/><text x=\"79.4\" y=\"110.8\" font-size=\"14\" font-weight=\"700\" fill=\"#c0392b\" text-anchor=\"middle\" transform=\"rotate(-53.1 79.4 110.8)\">5 m</text><line x1=\"146\" y1=\"55\" x2=\"146\" y2=\"175\" stroke=\"#555\" stroke-width=\"1.2\"/><line x1=\"141\" y1=\"55\" x2=\"151\" y2=\"55\" stroke=\"#555\" stroke-width=\"1.2\"/><line x1=\"141\" y1=\"175\" x2=\"151\" y2=\"175\" stroke=\"#555\" stroke-width=\"1.2\"/><line x1=\"130\" y1=\"55\" x2=\"151\" y2=\"55\" stroke=\"#555\" stroke-width=\"0.8\" stroke-dasharray=\"2 2\"/><text x=\"155\" y=\"120\" font-size=\"14\" font-weight=\"700\" fill=\"#222\">h</text><line x1=\"40\" y1=\"191\" x2=\"130\" y2=\"191\" stroke=\"#555\" stroke-width=\"1.2\"/><line x1=\"40\" y1=\"186\" x2=\"40\" y2=\"196\" stroke=\"#555\" stroke-width=\"1.2\"/><line x1=\"130\" y1=\"186\" x2=\"130\" y2=\"196\" stroke=\"#555\" stroke-width=\"1.2\"/><text x=\"85\" y=\"208\" font-size=\"14\" font-weight=\"700\" fill=\"#222\" text-anchor=\"middle\">3 m</text></svg></div>",
    "options": [
      {
        "text": "\\(4\\) m",
        "correct": true,
        "feedback": "Correct. \\(h^2 = 5^2 - 3^2 = 25 - 9 = 16\\), \\(h = 4\\)."
      },
      {
        "text": "\\(8\\) m",
        "correct": false,
        "feedback": "You added \\(5 + 3\\)."
      },
      {
        "text": "\\(\\sqrt{34}\\) m",
        "correct": false,
        "feedback": "You added \\(25 + 9\\) instead of subtracting."
      },
      {
        "text": "\\(3\\) m",
        "correct": false,
        "feedback": "You used the distance from the wall (3 m) as the height."
      }
    ],
    "backward": "Pythagoras with the hypotenuse known.",
    "forward": "Common in real-life measurement problems."
  },
  {
    "itemId": "d7",
    "order": 7,
    "cluster": "angleCalc",
    "clusterName": "Angle calculations",
    "question": "Find the size of angle \\(x\\).<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 200 180\" width=\"300\" height=\"270\"><polygon points=\"20,160 170,160 122,47\" fill=\"none\" stroke=\"#222\" stroke-width=\"2\"/><path d=\"M 45 160 A 25 25 0 0 0 36.7 141.4\" fill=\"none\" stroke=\"#c0392b\" stroke-width=\"2\"/><path d=\"M 145 160 A 25 25 0 0 1 160.2 137\" fill=\"none\" stroke=\"#c0392b\" stroke-width=\"2\"/><text x=\"52\" y=\"145\" font-size=\"14\" fill=\"#c0392b\" text-anchor=\"middle\">48&#176;</text><text x=\"137\" y=\"138\" font-size=\"14\" fill=\"#c0392b\" text-anchor=\"middle\">67&#176;</text><text x=\"122\" y=\"40\" font-size=\"14\" fill=\"#222\" text-anchor=\"middle\">x</text></svg></div>",
    "options": [
      {
        "text": "\\(65^\\circ\\)",
        "correct": true,
        "feedback": "Correct. \\(180 - 48 - 67 = 65^\\circ\\)."
      },
      {
        "text": "\\(115^\\circ\\)",
        "correct": false,
        "feedback": "You added \\(48 + 67\\) and stopped there."
      },
      {
        "text": "\\(245^\\circ\\)",
        "correct": false,
        "feedback": "You used 360° instead of 180°."
      },
      {
        "text": "\\(19^\\circ\\)",
        "correct": false,
        "feedback": "You subtracted the two given angles from each other (\\(67 - 48 = 19\\))."
      }
    ],
    "backward": "Angles in a triangle sum to 180°.",
    "forward": "Used in every triangle problem."
  },
  {
    "itemId": "d8",
    "order": 8,
    "cluster": "constructions",
    "clusterName": "Constructions",
    "question": "To construct the bisector of angle ABC, where is the compass placed first?",
    "options": [
      {
        "text": "At B (the vertex of the angle).",
        "correct": true,
        "feedback": "Correct. The first arc is centred at the vertex B and cuts both arms of the angle."
      },
      {
        "text": "At A.",
        "correct": false,
        "feedback": "The compass goes at the vertex, not at a point on one arm."
      },
      {
        "text": "At C.",
        "correct": false,
        "feedback": "The compass goes at the vertex, not at a point on one arm."
      },
      {
        "text": "At the midpoint of AC.",
        "correct": false,
        "feedback": "The midpoint of AC is not part of the construction."
      }
    ],
    "backward": "The standard angle bisector construction.",
    "forward": "Used to divide any angle into two equal parts."
  },
  {
    "itemId": "d9",
    "order": 9,
    "cluster": "interiorPoly",
    "clusterName": "Interior angles of polygons",
    "question": "Find the size of each interior angle of a regular decagon.",
    "options": [
      {
        "text": "\\(144^\\circ\\)",
        "correct": true,
        "feedback": "Correct. Sum \\(= (10 - 2) \\times 180 = 1440^\\circ\\); each angle \\(= 1440 \\div 10 = 144^\\circ\\)."
      },
      {
        "text": "\\(36^\\circ\\)",
        "correct": false,
        "feedback": "36° is the exterior angle (\\(360 \\div 10\\))."
      },
      {
        "text": "\\(1440^\\circ\\)",
        "correct": false,
        "feedback": "1440° is the sum, not one angle."
      },
      {
        "text": "\\(135^\\circ\\)",
        "correct": false,
        "feedback": "135° is the interior angle of a regular octagon."
      }
    ],
    "backward": "Regular polygon interior angle.",
    "forward": "Used in tessellation problems."
  },
  {
    "itemId": "d10",
    "order": 10,
    "cluster": "pythagoras",
    "clusterName": "Pythagoras' theorem",
    "question": "A right triangle has hypotenuse 13 cm and one leg 5 cm. Find the missing leg.",
    "options": [
      {
        "text": "\\(12\\) cm",
        "correct": true,
        "feedback": "Correct. \\(x^2 = 13^2 - 5^2 = 169 - 25 = 144\\), \\(x = 12\\)."
      },
      {
        "text": "\\(8\\) cm",
        "correct": false,
        "feedback": "You subtracted 5 from 13 (8), not the squares."
      },
      {
        "text": "\\(18\\) cm",
        "correct": false,
        "feedback": "You added \\(13 + 5\\)."
      },
      {
        "text": "\\(\\sqrt{194}\\) cm",
        "correct": false,
        "feedback": "You added \\(169 + 25\\) instead of subtracting."
      }
    ],
    "backward": "Pythagoras with an unknown leg.",
    "forward": "Used when the hypotenuse is known but one leg is not."
  },
  {
    "itemId": "d11",
    "order": 11,
    "cluster": "exteriorPoly",
    "clusterName": "Exterior angles of polygons",
    "question": "Find the size of each exterior angle of a regular pentagon.<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 200 190\" width=\"300\" height=\"285\"><polygon points=\"100,35 157.1,76.5 135.3,143.5 64.7,143.5 42.9,76.5\" fill=\"none\" stroke=\"#222\" stroke-width=\"2\"/><line x1=\"135.3\" y1=\"143.5\" x2=\"126\" y2=\"172\" stroke=\"#222\" stroke-width=\"2\"/><path d=\"M 127.55 167.25 A 25 25 0 0 1 110.3 143.5\" fill=\"none\" stroke=\"#c0392b\" stroke-width=\"2\"/><text x=\"100\" y=\"167\" font-size=\"13\" fill=\"#c0392b\" text-anchor=\"middle\">?</text></svg></div>",
    "options": [
      {
        "text": "\\(72^\\circ\\)",
        "correct": true,
        "feedback": "Correct. \\(360 \\div 5 = 72^\\circ\\)."
      },
      {
        "text": "\\(108^\\circ\\)",
        "correct": false,
        "feedback": "108° is the interior angle (\\(180 - 72\\))."
      },
      {
        "text": "\\(60^\\circ\\)",
        "correct": false,
        "feedback": "60° is the exterior angle of a regular hexagon."
      },
      {
        "text": "\\(90^\\circ\\)",
        "correct": false,
        "feedback": "90° is the exterior angle of a square."
      }
    ],
    "backward": "Exterior angles of a regular polygon sum to 360°.",
    "forward": "Used to work out the number of sides from an exterior angle."
  },
  {
    "itemId": "d12",
    "order": 12,
    "cluster": "angleCalc",
    "clusterName": "Angle calculations",
    "question": "A right-angled triangle has one acute angle of 40°. Find the third angle.<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 200 180\" width=\"300\" height=\"270\"><polygon points=\"40,160 170,160 40,51\" fill=\"none\" stroke=\"#222\" stroke-width=\"2\"/><path d=\"M 50 160 L 50 150 L 40 150\" fill=\"none\" stroke=\"#222\" stroke-width=\"1.5\"/><path d=\"M 145 160 A 25 25 0 0 1 150.85 143.9\" fill=\"none\" stroke=\"#c0392b\" stroke-width=\"2\"/><text x=\"126\" y=\"154\" font-size=\"13\" fill=\"#c0392b\" text-anchor=\"middle\">40&#176;</text><text x=\"25\" y=\"50\" font-size=\"14\" fill=\"#222\" text-anchor=\"middle\">x</text></svg></div>",
    "options": [
      {
        "text": "\\(50^\\circ\\)",
        "correct": true,
        "feedback": "Correct. \\(180 - 90 - 40 = 50^\\circ\\)."
      },
      {
        "text": "\\(40^\\circ\\)",
        "correct": false,
        "feedback": "You assumed the triangle was isosceles."
      },
      {
        "text": "\\(140^\\circ\\)",
        "correct": false,
        "feedback": "You subtracted 40 from 180, forgetting the right angle."
      },
      {
        "text": "\\(90^\\circ\\)",
        "correct": false,
        "feedback": "You assumed the third angle was also a right angle — a triangle can have at most one right angle."
      }
    ],
    "backward": "Angles in a triangle sum to 180°.",
    "forward": "In a right triangle, the two acute angles sum to 90°."
  },
  {
    "itemId": "d13",
    "order": 13,
    "cluster": "angleCalc",
    "clusterName": "Angle calculations",
    "question": "Find \\(x\\).<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 200 200\" width=\"300\" height=\"300\"><line x1=\"10\" y1=\"100\" x2=\"190\" y2=\"100\" stroke=\"#222\" stroke-width=\"2\"/><line x1=\"124.7\" y1=\"23.9\" x2=\"75.3\" y2=\"176.1\" stroke=\"#222\" stroke-width=\"2\"/><circle cx=\"100\" cy=\"100\" r=\"2\" fill=\"#222\"/><path d=\"M 130 100 A 30 30 0 0 0 109.3 71.5\" fill=\"none\" stroke=\"#c0392b\" stroke-width=\"2\"/><path d=\"M 70 100 A 30 30 0 0 0 90.7 128.5\" fill=\"none\" stroke=\"#c0392b\" stroke-width=\"2\"/><text x=\"142\" y=\"84\" font-size=\"14\" fill=\"#c0392b\" text-anchor=\"middle\">72&#176;</text><text x=\"64\" y=\"132\" font-size=\"14\" fill=\"#222\" text-anchor=\"middle\">x</text></svg></div>",
    "options": [
      {
        "text": "\\(72^\\circ\\)",
        "correct": true,
        "feedback": "Correct. Vertically opposite angles are equal, so \\(x = 72^\\circ\\)."
      },
      {
        "text": "\\(108^\\circ\\)",
        "correct": false,
        "feedback": "108° is the adjacent angle (\\(180 - 72\\)), not the vertically opposite."
      },
      {
        "text": "\\(18^\\circ\\)",
        "correct": false,
        "feedback": "18° = \\(90 - 72\\)."
      },
      {
        "text": "\\(144^\\circ\\)",
        "correct": false,
        "feedback": "144° = \\(2 \\times 72\\)."
      }
    ],
    "backward": "Vertically opposite angles.",
    "forward": "Used in any two-line intersection problem."
  },
  {
    "itemId": "d14",
    "order": 14,
    "cluster": "constructions",
    "clusterName": "Constructions",
    "question": "What is being constructed?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 200 220\" width=\"300\" height=\"330\"><line x1=\"50\" y1=\"130\" x2=\"150\" y2=\"130\" stroke=\"#222\" stroke-width=\"2\"/><path d=\"M 100 179 A 70 70 0 0 0 100 81\" fill=\"none\" stroke=\"#c0392b\" stroke-width=\"2\"/><path d=\"M 100 179 A 70 70 0 0 1 100 81\" fill=\"none\" stroke=\"#c0392b\" stroke-width=\"2\"/><line x1=\"100\" y1=\"60\" x2=\"100\" y2=\"200\" stroke=\"#222\" stroke-width=\"1.5\" stroke-dasharray=\"4 4\"/><text x=\"50\" y=\"148\" font-size=\"13\" text-anchor=\"middle\" fill=\"#222\">A</text><text x=\"150\" y=\"148\" font-size=\"13\" text-anchor=\"middle\" fill=\"#222\">B</text><text x=\"108\" y=\"80\" font-size=\"13\" fill=\"#222\">P</text><text x=\"108\" y=\"195\" font-size=\"13\" fill=\"#222\">Q</text></svg></div>",
    "options": [
      {
        "text": "The perpendicular bisector of AB.",
        "correct": true,
        "feedback": "Correct. Equal arcs from A and B, joined through the two intersections, give the perpendicular bisector."
      },
      {
        "text": "The angle bisector of angle A.",
        "correct": false,
        "feedback": "The angle bisector requires arcs from the vertex of an angle, not from both ends of a segment."
      },
      {
        "text": "A perpendicular line through A.",
        "correct": false,
        "feedback": "A perpendicular through A would need arcs centred only at A."
      },
      {
        "text": "A line parallel to AB.",
        "correct": false,
        "feedback": "A parallel line cannot be produced from arcs alone; it requires two perpendiculars."
      }
    ],
    "backward": "Recognition of the standard construction.",
    "forward": "This construction produces the midpoint of AB."
  },
  {
    "itemId": "d15",
    "order": 15,
    "cluster": "interiorPoly",
    "clusterName": "Interior angles of polygons",
    "question": "Find the size of each interior angle of a regular octagon.",
    "options": [
      {
        "text": "\\(135^\\circ\\)",
        "correct": true,
        "feedback": "Correct. Sum \\(= (8 - 2) \\times 180 = 1080^\\circ\\); each angle \\(= 1080 \\div 8 = 135^\\circ\\)."
      },
      {
        "text": "\\(45^\\circ\\)",
        "correct": false,
        "feedback": "45° is the exterior angle (\\(360 \\div 8\\))."
      },
      {
        "text": "\\(1080^\\circ\\)",
        "correct": false,
        "feedback": "1080° is the sum."
      },
      {
        "text": "\\(144^\\circ\\)",
        "correct": false,
        "feedback": "144° is the interior angle of a regular decagon."
      }
    ],
    "backward": "Regular polygon interior angle.",
    "forward": "Used in tiling problems."
  },
  {
    "itemId": "d16",
    "order": 16,
    "cluster": "pythagoras",
    "clusterName": "Pythagoras' theorem",
    "question": "A right triangle has legs of length 9 cm and 12 cm. Find the hypotenuse.",
    "options": [
      {
        "text": "\\(15\\) cm",
        "correct": true,
        "feedback": "Correct. \\(c^2 = 81 + 144 = 225\\), \\(c = 15\\)."
      },
      {
        "text": "\\(21\\) cm",
        "correct": false,
        "feedback": "You added the legs."
      },
      {
        "text": "\\(225\\) cm",
        "correct": false,
        "feedback": "You stopped at \\(c^2 = 225\\)."
      },
      {
        "text": "\\(108\\) cm",
        "correct": false,
        "feedback": "You multiplied the legs."
      }
    ],
    "backward": "Pythagoras.",
    "forward": "9‑12‑15 is a multiple of 3‑4‑5."
  },
  {
    "itemId": "d17",
    "order": 17,
    "cluster": "exteriorPoly",
    "clusterName": "Exterior angles of polygons",
    "question": "Each exterior angle of a regular polygon is 30°. How many sides does it have?",
    "options": [
      {
        "text": "\\(12\\)",
        "correct": true,
        "feedback": "Correct. \\(360 \\div 30 = 12\\) sides."
      },
      {
        "text": "\\(6\\)",
        "correct": false,
        "feedback": "6 sides would give exterior angle 60°."
      },
      {
        "text": "\\(30\\)",
        "correct": false,
        "feedback": "You used the angle itself as the answer."
      },
      {
        "text": "\\(15\\)",
        "correct": false,
        "feedback": "You halved the exterior angle (30 ÷ 2 = 15) instead of dividing 360 by it."
      }
    ],
    "backward": "Exterior angle sum is always 360°.",
    "forward": "Used to identify the polygon from its exterior angle."
  },
  {
    "itemId": "d18",
    "order": 18,
    "cluster": "pythagoras",
    "clusterName": "Pythagoras' theorem",
    "question": "A rectangular field is 40 m by 30 m. How long is the diagonal path across the field?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 200 190\" width=\"300\" height=\"285\"><polygon points=\"40,60 160,60 160,150 40,150\" fill=\"none\" stroke=\"#222\" stroke-width=\"2\"/><line x1=\"40\" y1=\"150\" x2=\"160\" y2=\"60\" stroke=\"#c0392b\" stroke-width=\"2\"/><text x=\"100\" y=\"172\" font-size=\"13\" text-anchor=\"middle\" fill=\"#222\">40 m</text><text x=\"33\" y=\"110\" font-size=\"13\" text-anchor=\"end\" fill=\"#222\">30 m</text></svg></div>",
    "options": [
      {
        "text": "\\(50\\) m",
        "correct": true,
        "feedback": "Correct. \\(d^2 = 40^2 + 30^2 = 1600 + 900 = 2500\\), \\(d = 50\\)."
      },
      {
        "text": "\\(70\\) m",
        "correct": false,
        "feedback": "You added \\(40 + 30\\)."
      },
      {
        "text": "\\(1200\\) m",
        "correct": false,
        "feedback": "You multiplied \\(40 \\times 30\\)."
      },
      {
        "text": "\\(35\\) m",
        "correct": false,
        "feedback": "You averaged 40 and 30."
      }
    ],
    "backward": "Pythagoras.",
    "forward": "Used to find the diagonal of any rectangle."
  },
  {
    "itemId": "d19",
    "order": 19,
    "cluster": "angleCalc",
    "clusterName": "Angle calculations",
    "question": "Find the size of angle \\(x\\).<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 200 200\" width=\"300\" height=\"300\"><line x1=\"100\" y1=\"100\" x2=\"170\" y2=\"100\" stroke=\"#222\" stroke-width=\"2\"/><line x1=\"100\" y1=\"100\" x2=\"106.1\" y2=\"30.3\" stroke=\"#222\" stroke-width=\"2\"/><line x1=\"100\" y1=\"100\" x2=\"42.7\" y2=\"140.2\" stroke=\"#222\" stroke-width=\"2\"/><line x1=\"100\" y1=\"100\" x2=\"145\" y2=\"153.6\" stroke=\"#222\" stroke-width=\"2\"/><circle cx=\"100\" cy=\"100\" r=\"2\" fill=\"#222\"/><path d=\"M 125 100 A 25 25 0 0 0 102.2 75.1\" fill=\"none\" stroke=\"#c0392b\" stroke-width=\"1.8\"/><path d=\"M 102.2 75.1 A 25 25 0 0 0 79.5 114.4\" fill=\"none\" stroke=\"#c0392b\" stroke-width=\"1.8\"/><path d=\"M 79.5 114.4 A 25 25 0 0 0 116.1 119.1\" fill=\"none\" stroke=\"#c0392b\" stroke-width=\"1.8\"/><path d=\"M 116.1 119.1 A 25 25 0 0 0 125 100\" fill=\"none\" stroke=\"#c0392b\" stroke-width=\"1.8\"/><text x=\"133\" y=\"72\" font-size=\"12\" fill=\"#c0392b\" text-anchor=\"middle\">85&#176;</text><text x=\"61\" y=\"80\" font-size=\"12\" fill=\"#c0392b\" text-anchor=\"middle\">130&#176;</text><text x=\"93\" y=\"143\" font-size=\"12\" fill=\"#c0392b\" text-anchor=\"middle\">95&#176;</text><text x=\"142\" y=\"118\" font-size=\"12\" fill=\"#222\" text-anchor=\"middle\">x</text></svg></div>",
    "options": [
      {
        "text": "\\(50^\\circ\\)",
        "correct": true,
        "feedback": "Correct. Angles around a point sum to 360°: \\(x = 360 - 85 - 130 - 95 = 50^\\circ\\)."
      },
      {
        "text": "\\(55^\\circ\\)",
        "correct": false,
        "feedback": "You used 90° instead of 95°: \\(360 - 85 - 130 - 90 = 55^\\circ\\)."
      },
      {
        "text": "\\(45^\\circ\\)",
        "correct": false,
        "feedback": "You used 100° instead of 95°: \\(360 - 85 - 130 - 100 = 45^\\circ\\)."
      },
      {
        "text": "\\(230^\\circ\\)",
        "correct": false,
        "feedback": "You subtracted only the 130° angle from 360°: \\(360 - 130 = 230^\\circ\\)."
      }
    ],
    "backward": "Angles around a point.",
    "forward": "Used when multiple angles meet at a vertex."
  },
  {
    "itemId": "d20",
    "order": 20,
    "cluster": "constructions",
    "clusterName": "Constructions",
    "question": "To construct an equilateral triangle on side AB, what should the compass radius be when drawing arcs from A and B?",
    "options": [
      {
        "text": "The length of AB.",
        "correct": true,
        "feedback": "Correct. Arcs of radius AB from A and B intersect at the third vertex, giving an equilateral triangle."
      },
      {
        "text": "Half the length of AB.",
        "correct": false,
        "feedback": "Half of AB would not reach the third vertex."
      },
      {
        "text": "Twice the length of AB.",
        "correct": false,
        "feedback": "Twice AB is too large; the arcs would not meet at the correct distance."
      },
      {
        "text": "Any radius larger than half of AB.",
        "correct": false,
        "feedback": "Any radius larger than half of AB would give an isosceles triangle, not necessarily equilateral."
      }
    ],
    "backward": "The construction of an equilateral triangle.",
    "forward": "This is also the first step in constructing a 60° angle."
  },
  {
    "itemId": "d21",
    "order": 21,
    "cluster": "interiorPoly",
    "clusterName": "Interior angles of polygons",
    "question": "Find the size of angle \\(x\\).<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 210 190\" width=\"315\" height=\"285\"><polygon points=\"81,33.7 200.7,89.5 175,160 35,160\" fill=\"none\" stroke=\"#222\" stroke-width=\"2\"/><path d=\"M 73.4 54.4 A 22 22 0 0 0 100.9 43\" fill=\"none\" stroke=\"#c0392b\" stroke-width=\"1.8\"/><text x=\"96.3\" y=\"74.7\" font-size=\"12\" fill=\"#c0392b\" text-anchor=\"middle\">85&#176;</text><path d=\"M 180.7 80.2 A 22 22 0 0 0 193.1 110.2\" fill=\"none\" stroke=\"#c0392b\" stroke-width=\"1.8\"/><text x=\"163.7\" y=\"108.8\" font-size=\"12\" fill=\"#c0392b\" text-anchor=\"middle\">95&#176;</text><path d=\"M 182.5 139.3 A 22 22 0 0 0 153 160\" fill=\"none\" stroke=\"#c0392b\" stroke-width=\"1.8\"/><text x=\"152.1\" y=\"131.2\" font-size=\"12\" fill=\"#c0392b\" text-anchor=\"middle\">110&#176;</text><path d=\"M 57 160 A 22 22 0 0 0 42.5 139.3\" fill=\"none\" stroke=\"#c0392b\" stroke-width=\"1.8\"/><text x=\"67.8\" y=\"141.1\" font-size=\"13\" fill=\"#222\" text-anchor=\"middle\">x</text></svg></div>",
    "options": [
      {
        "text": "\\(70^\\circ\\)",
        "correct": true,
        "feedback": "Correct. Sum of interior angles of a quadrilateral = 360°; \\(x = 360 - 85 - 95 - 110 = 70^\\circ\\)."
      },
      {
        "text": "\\(90^\\circ\\)",
        "correct": false,
        "feedback": "You assumed the fourth angle was a right angle."
      },
      {
        "text": "\\(80^\\circ\\)",
        "correct": false,
        "feedback": "You used 100° instead of 110° in the sum: \\(360 - 85 - 95 - 100 = 80^\\circ\\)."
      },
      {
        "text": "\\(100^\\circ\\)",
        "correct": false,
        "feedback": "You used 80° instead of 110° in the sum: \\(360 - 85 - 95 - 80 = 100^\\circ\\)."
      }
    ],
    "backward": "Interior angle sum for a quadrilateral.",
    "forward": "Used in any four-sided figure."
  },
  {
    "itemId": "d22",
    "order": 22,
    "cluster": "pythagoras",
    "clusterName": "Pythagoras' theorem",
    "question": "A right triangle has hypotenuse 17 cm and one leg 8 cm. Find the missing leg.",
    "options": [
      {
        "text": "\\(15\\) cm",
        "correct": true,
        "feedback": "Correct. \\(x^2 = 17^2 - 8^2 = 289 - 64 = 225\\), \\(x = 15\\)."
      },
      {
        "text": "\\(9\\) cm",
        "correct": false,
        "feedback": "You subtracted 8 from 17 (9) instead of subtracting squares."
      },
      {
        "text": "\\(25\\) cm",
        "correct": false,
        "feedback": "You added \\(17 + 8\\)."
      },
      {
        "text": "\\(\\sqrt{353}\\) cm",
        "correct": false,
        "feedback": "You added \\(289 + 64\\) instead of subtracting."
      }
    ],
    "backward": "Pythagoras with unknown leg.",
    "forward": "8‑15‑17 is a Pythagorean triple."
  },
  {
    "itemId": "d23",
    "order": 23,
    "cluster": "exteriorPoly",
    "clusterName": "Exterior angles of polygons",
    "question": "Find the size of each exterior angle of a regular octagon.",
    "options": [
      {
        "text": "\\(45^\\circ\\)",
        "correct": true,
        "feedback": "Correct. \\(360 \\div 8 = 45^\\circ\\)."
      },
      {
        "text": "\\(135^\\circ\\)",
        "correct": false,
        "feedback": "135° is the interior angle."
      },
      {
        "text": "\\(40^\\circ\\)",
        "correct": false,
        "feedback": "40° is the exterior angle of a regular nonagon."
      },
      {
        "text": "\\(60^\\circ\\)",
        "correct": false,
        "feedback": "60° is the exterior angle of a regular hexagon."
      }
    ],
    "backward": "Exterior angle sum = 360°.",
    "forward": "Used to find interior angles of regular polygons."
  },
  {
    "itemId": "d24",
    "order": 24,
    "cluster": "angleCalc",
    "clusterName": "Angle calculations",
    "question": "In an isosceles triangle, the apex angle is 40°. Find each base angle.<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 200 170\" width=\"300\" height=\"255\"><polygon points=\"50,150 150,150 100,13\" fill=\"none\" stroke=\"#222\" stroke-width=\"2\"/><path d=\"M 91.4 36.5 A 25 25 0 0 0 108.5 36.5\" fill=\"none\" stroke=\"#c0392b\" stroke-width=\"2\"/><path d=\"M 75 150 A 25 25 0 0 0 58.6 126.5\" fill=\"none\" stroke=\"#c0392b\" stroke-width=\"2\"/><path d=\"M 125 150 A 25 25 0 0 1 141.4 126.5\" fill=\"none\" stroke=\"#c0392b\" stroke-width=\"2\"/><text x=\"100\" y=\"55\" font-size=\"13\" fill=\"#c0392b\" text-anchor=\"middle\">40&#176;</text><text x=\"69\" y=\"143\" font-size=\"13\" fill=\"#222\" text-anchor=\"middle\">x</text><text x=\"131\" y=\"143\" font-size=\"13\" fill=\"#222\" text-anchor=\"middle\">x</text></svg></div>",
    "options": [
      {
        "text": "\\(70^\\circ\\)",
        "correct": true,
        "feedback": "Correct. \\((180 - 40) \\div 2 = 70^\\circ\\)."
      },
      {
        "text": "\\(40^\\circ\\)",
        "correct": false,
        "feedback": "You assumed the base angles equal the apex angle."
      },
      {
        "text": "\\(100^\\circ\\)",
        "correct": false,
        "feedback": "You treated both base angles as 40° (matching the apex): \\(180 - 40 - 40 = 100^\\circ\\)."
      },
      {
        "text": "\\(140^\\circ\\)",
        "correct": false,
        "feedback": "You subtracted 40 from 180 and stopped."
      }
    ],
    "backward": "Isosceles base angles are equal; angles in a triangle sum to 180°.",
    "forward": "Used in any isosceles triangle problem."
  }
];

const recheckItems = [
  {
    "itemId": "r1",
    "order": 1,
    "cluster": "angleCalc",
    "clusterName": "Angle calculations",
    "question": "Find \\(x\\).<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 200 170\" width=\"300\" height=\"255\"><line x1=\"10\" y1=\"130\" x2=\"190\" y2=\"130\" stroke=\"#222\" stroke-width=\"2\"/><line x1=\"100\" y1=\"130\" x2=\"37\" y2=\"80.8\" stroke=\"#222\" stroke-width=\"2\"/><circle cx=\"100\" cy=\"130\" r=\"2\" fill=\"#222\"/><path d=\"M 70 130 A 30 30 0 0 1 76.4 111.5\" fill=\"none\" stroke=\"#c0392b\" stroke-width=\"2\"/><path d=\"M 76.4 111.5 A 30 30 0 0 1 130 130\" fill=\"none\" stroke=\"#c0392b\" stroke-width=\"2\"/><text x=\"52\" y=\"125\" font-size=\"13\" fill=\"#c0392b\" text-anchor=\"middle\">38&#176;</text><text x=\"127\" y=\"105\" font-size=\"14\" fill=\"#222\" text-anchor=\"middle\">x</text></svg></div>",
    "options": [
      {
        "text": "\\(142^\\circ\\)",
        "correct": true,
        "feedback": "Correct. \\(180 - 38 = 142^\\circ\\)."
      },
      {
        "text": "\\(38^\\circ\\)",
        "correct": false,
        "feedback": "You assumed vertically opposite."
      },
      {
        "text": "\\(52^\\circ\\)",
        "correct": false,
        "feedback": "You subtracted from 90."
      },
      {
        "text": "\\(218^\\circ\\)",
        "correct": false,
        "feedback": "You used 360° instead of 180°."
      }
    ],
    "backward": "Angles on a straight line.",
    "forward": "Standard linear-pair fact."
  },
  {
    "itemId": "r2",
    "order": 2,
    "cluster": "angleCalc",
    "clusterName": "Angle calculations",
    "question": "Find \\(x\\).<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 200 180\" width=\"300\" height=\"270\"><polygon points=\"20,160 170,160 110,31\" fill=\"none\" stroke=\"#222\" stroke-width=\"2\"/><path d=\"M 45 160 A 25 25 0 0 0 34.3 139.5\" fill=\"none\" stroke=\"#c0392b\" stroke-width=\"2\"/><path d=\"M 145 160 A 25 25 0 0 1 159.4 137.3\" fill=\"none\" stroke=\"#c0392b\" stroke-width=\"2\"/><text x=\"50\" y=\"141\" font-size=\"14\" fill=\"#c0392b\" text-anchor=\"middle\">55&#176;</text><text x=\"137\" y=\"136\" font-size=\"14\" fill=\"#c0392b\" text-anchor=\"middle\">65&#176;</text><text x=\"110\" y=\"25\" font-size=\"14\" fill=\"#222\" text-anchor=\"middle\">x</text></svg></div>",
    "options": [
      {
        "text": "\\(60^\\circ\\)",
        "correct": true,
        "feedback": "Correct. \\(180 - 55 - 65 = 60^\\circ\\). (bw: Angles in a triangle.)"
      },
      {
        "text": "\\(120^\\circ\\)",
        "correct": false,
        "feedback": "You stopped at the sum of the two given angles (\\(55 + 65 = 120\\))."
      },
      {
        "text": "\\(125^\\circ\\)",
        "correct": false,
        "feedback": "You subtracted only 55° from 180° and forgot the 65°: \\(180 - 55 = 125^\\circ\\)."
      },
      {
        "text": "\\(115^\\circ\\)",
        "correct": false,
        "feedback": "You subtracted only 65° from 180° and forgot the 55°: \\(180 - 65 = 115^\\circ\\)."
      }
    ]
  },
  {
    "itemId": "r3",
    "order": 3,
    "cluster": "interiorPoly",
    "clusterName": "Interior angles of polygons",
    "question": "Find the sum of the interior angles of a hexagon.",
    "options": [
      {
        "text": "\\(720^\\circ\\)",
        "correct": true,
        "feedback": "Correct. \\((6 - 2) \\times 180 = 720^\\circ\\). (bw: Interior angle sum formula.)"
      },
      {
        "text": "\\(540^\\circ\\)",
        "correct": false,
        "feedback": "540° is for a pentagon."
      },
      {
        "text": "\\(360^\\circ\\)",
        "correct": false,
        "feedback": "360° is for a quadrilateral."
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
    "cluster": "interiorPoly",
    "clusterName": "Interior angles of polygons",
    "question": "Find the size of each interior angle of a regular pentagon.",
    "options": [
      {
        "text": "\\(108^\\circ\\)",
        "correct": true,
        "feedback": "Correct. Sum \\(= 540^\\circ\\); each angle \\(= 108^\\circ\\). (bw: Regular polygon interior angle.)"
      },
      {
        "text": "\\(72^\\circ\\)",
        "correct": false,
        "feedback": "72° is the exterior angle."
      },
      {
        "text": "\\(540^\\circ\\)",
        "correct": false,
        "feedback": "540° is the sum."
      },
      {
        "text": "\\(90^\\circ\\)",
        "correct": false,
        "feedback": "90° is not the interior angle of a regular pentagon."
      }
    ]
  },
  {
    "itemId": "r5",
    "order": 5,
    "cluster": "exteriorPoly",
    "clusterName": "Exterior angles of polygons",
    "question": "What is the sum of the exterior angles of a convex pentagon?",
    "options": [
      {
        "text": "\\(360^\\circ\\)",
        "correct": true,
        "feedback": "Correct. Always 360° for any convex polygon. (bw: Exterior angle fact.)"
      },
      {
        "text": "\\(180^\\circ\\)",
        "correct": false,
        "feedback": "180° is a straight line."
      },
      {
        "text": "It depends on the number of sides",
        "correct": false,
        "feedback": "The sum is constant — it does not depend on the number of sides."
      },
      {
        "text": "\\(540^\\circ\\)",
        "correct": false,
        "feedback": "540° is the interior angle sum for a pentagon."
      }
    ]
  },
  {
    "itemId": "r6",
    "order": 6,
    "cluster": "exteriorPoly",
    "clusterName": "Exterior angles of polygons",
    "question": "Find the size of each exterior angle of a regular nonagon.",
    "options": [
      {
        "text": "\\(40^\\circ\\)",
        "correct": true,
        "feedback": "Correct. \\(360 \\div 9 = 40^\\circ\\). (bw: Exterior angles of regular polygons.)"
      },
      {
        "text": "\\(140^\\circ\\)",
        "correct": false,
        "feedback": "140° is the interior angle."
      },
      {
        "text": "\\(45^\\circ\\)",
        "correct": false,
        "feedback": "45° is the exterior angle of a regular octagon."
      },
      {
        "text": "\\(60^\\circ\\)",
        "correct": false,
        "feedback": "60° is the exterior angle of a regular hexagon."
      }
    ]
  },
  {
    "itemId": "r7",
    "order": 7,
    "cluster": "constructions",
    "clusterName": "Constructions",
    "question": "In the construction of the perpendicular bisector of AB, the two arcs (from A and from B) must have:",
    "options": [
      {
        "text": "equal radii.",
        "correct": true,
        "feedback": "Correct. Equal radii ensure the intersection points are equidistant from A and B. (bw: The key geometric condition.)"
      },
      {
        "text": "different radii.",
        "correct": false,
        "feedback": "Different radii would not give points equidistant from A and B."
      },
      {
        "text": "radii equal to the length of AB.",
        "correct": false,
        "feedback": "The radius can be any length greater than half of AB, not necessarily equal to AB."
      },
      {
        "text": "radii less than half of AB.",
        "correct": false,
        "feedback": "Radii less than half of AB would not allow the arcs to intersect."
      }
    ]
  },
  {
    "itemId": "r8",
    "order": 8,
    "cluster": "constructions",
    "clusterName": "Constructions",
    "question": "In the construction of the bisector of angle ABC, after drawing an arc centred at B that cuts both arms at points P and Q, what is the next step?",
    "options": [
      {
        "text": "Draw arcs of equal radius centred at P and at Q.",
        "correct": true,
        "feedback": "Correct. Equal arcs from P and Q intersect at a point; joining that point to B gives the angle bisector. (bw: The standard construction.)"
      },
      {
        "text": "Draw a line from B to the midpoint of PQ.",
        "correct": false,
        "feedback": "Measuring the midpoint is not part of the construction."
      },
      {
        "text": "Measure the angle with a protractor.",
        "correct": false,
        "feedback": "A protractor is not allowed in a straight-edge-and-compass construction."
      },
      {
        "text": "Draw an arc centred at P through B.",
        "correct": false,
        "feedback": "The arcs must be centred at both P and Q, not just P."
      }
    ]
  },
  {
    "itemId": "r9",
    "order": 9,
    "cluster": "pythagoras",
    "clusterName": "Pythagoras' theorem",
    "question": "A right triangle has legs of length 7 cm and 24 cm. Find the hypotenuse.",
    "options": [
      {
        "text": "\\(25\\) cm",
        "correct": true,
        "feedback": "Correct. \\(c^2 = 49 + 576 = 625\\), \\(c = 25\\)."
      },
      {
        "text": "\\(31\\) cm",
        "correct": false,
        "feedback": "You added the legs."
      },
      {
        "text": "\\(168\\) cm",
        "correct": false,
        "feedback": "You multiplied the legs."
      },
      {
        "text": "\\(625\\) cm",
        "correct": false,
        "feedback": "You stopped at \\(c^2 = 625\\)."
      }
    ],
    "backward": "Pythagoras.",
    "forward": "7‑24‑25 is a Pythagorean triple."
  },
  {
    "itemId": "r10",
    "order": 10,
    "cluster": "pythagoras",
    "clusterName": "Pythagoras' theorem",
    "question": "A right triangle has hypotenuse 41 cm and one leg 9 cm. Find the missing leg.",
    "options": [
      {
        "text": "\\(40\\) cm",
        "correct": true,
        "feedback": "Correct. \\(x^2 = 1681 - 81 = 1600\\), \\(x = 40\\). (bw: Pythagoras with unknown leg.)"
      },
      {
        "text": "\\(32\\) cm",
        "correct": false,
        "feedback": "You subtracted 9 from 41 (32) instead of subtracting squares."
      },
      {
        "text": "\\(50\\) cm",
        "correct": false,
        "feedback": "You added \\(41 + 9\\)."
      },
      {
        "text": "\\(\\sqrt{1762}\\) cm",
        "correct": false,
        "feedback": "You added \\(1681 + 81\\) instead of subtracting."
      }
    ]
  },
  {
    "itemId": "r11",
    "order": 11,
    "cluster": "pythagoras",
    "clusterName": "Pythagoras' theorem",
    "question": "A 13 m ladder leans against a wall. Its foot is 5 m from the wall. How high up the wall does it reach?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 200 215\" width=\"300\" height=\"323\"><line x1=\"47\" y1=\"175\" x2=\"140\" y2=\"175\" stroke=\"#222\" stroke-width=\"2\"/><line x1=\"130\" y1=\"27\" x2=\"130\" y2=\"175\" stroke=\"#222\" stroke-width=\"3\"/><path d=\"M 120 175 L 120 165 L 130 165\" fill=\"none\" stroke=\"#222\" stroke-width=\"1.2\"/><line x1=\"75\" y1=\"175\" x2=\"130\" y2=\"43\" stroke=\"#c0392b\" stroke-width=\"3\" stroke-linecap=\"round\"/><text x=\"96\" y=\"106.3\" font-size=\"14\" font-weight=\"700\" fill=\"#c0392b\" text-anchor=\"middle\" transform=\"rotate(-67.4 96 106.3)\">13 m</text><line x1=\"146\" y1=\"43\" x2=\"146\" y2=\"175\" stroke=\"#555\" stroke-width=\"1.2\"/><line x1=\"141\" y1=\"43\" x2=\"151\" y2=\"43\" stroke=\"#555\" stroke-width=\"1.2\"/><line x1=\"141\" y1=\"175\" x2=\"151\" y2=\"175\" stroke=\"#555\" stroke-width=\"1.2\"/><line x1=\"130\" y1=\"43\" x2=\"151\" y2=\"43\" stroke=\"#555\" stroke-width=\"0.8\" stroke-dasharray=\"2 2\"/><text x=\"155\" y=\"114\" font-size=\"14\" font-weight=\"700\" fill=\"#222\">h</text><line x1=\"75\" y1=\"191\" x2=\"130\" y2=\"191\" stroke=\"#555\" stroke-width=\"1.2\"/><line x1=\"75\" y1=\"186\" x2=\"75\" y2=\"196\" stroke=\"#555\" stroke-width=\"1.2\"/><line x1=\"130\" y1=\"186\" x2=\"130\" y2=\"196\" stroke=\"#555\" stroke-width=\"1.2\"/><text x=\"102.5\" y=\"208\" font-size=\"14\" font-weight=\"700\" fill=\"#222\" text-anchor=\"middle\">5 m</text></svg></div>",
    "options": [
      {
        "text": "\\(12\\) m",
        "correct": true,
        "feedback": "Correct. \\(h^2 = 169 - 25 = 144\\), \\(h = 12\\)."
      },
      {
        "text": "\\(8\\) m",
        "correct": false,
        "feedback": "You subtracted 5 from 13 (8), not the squares."
      },
      {
        "text": "\\(18\\) m",
        "correct": false,
        "feedback": "You added \\(13 + 5\\)."
      },
      {
        "text": "\\(13.9\\) m",
        "correct": false,
        "feedback": "\\(\\sqrt{194} \\approx 13.9\\), but the height is not the hypotenuse."
      }
    ],
    "backward": "Pythagoras with the hypotenuse known.",
    "forward": "Real-life measurement."
  },
  {
    "itemId": "r12",
    "order": 12,
    "cluster": "angleCalc",
    "clusterName": "Angle calculations",
    "question": "In an isosceles triangle, each base angle is 65°. Find the apex angle.<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 200 170\" width=\"300\" height=\"255\"><polygon points=\"50,150 150,150 100,43\" fill=\"none\" stroke=\"#222\" stroke-width=\"2\"/><path d=\"M 89.4 65.7 A 25 25 0 0 0 110.6 65.7\" fill=\"none\" stroke=\"#c0392b\" stroke-width=\"2\"/><path d=\"M 75 150 A 25 25 0 0 0 60.6 127.4\" fill=\"none\" stroke=\"#c0392b\" stroke-width=\"2\"/><path d=\"M 125 150 A 25 25 0 0 1 139.4 127.4\" fill=\"none\" stroke=\"#c0392b\" stroke-width=\"2\"/><text x=\"84\" y=\"137\" font-size=\"13\" fill=\"#c0392b\" text-anchor=\"middle\">65&#176;</text><text x=\"116\" y=\"137\" font-size=\"13\" fill=\"#c0392b\" text-anchor=\"middle\">65&#176;</text><text x=\"100\" y=\"86\" font-size=\"14\" fill=\"#222\" text-anchor=\"middle\">x</text></svg></div>",
    "options": [
      {
        "text": "\\(50^\\circ\\)",
        "correct": true,
        "feedback": "Correct. \\(180 - 65 - 65 = 50^\\circ\\). (bw: Angles in a triangle.)"
      },
      {
        "text": "\\(65^\\circ\\)",
        "correct": false,
        "feedback": "You assumed the apex equals the base angles."
      },
      {
        "text": "\\(115^\\circ\\)",
        "correct": false,
        "feedback": "You subtracted 65 from 180 and stopped."
      },
      {
        "text": "\\(130^\\circ\\)",
        "correct": false,
        "feedback": "You used \\(2 \\times 65\\)."
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
    title: "Angles — Core Fluency",
    subtitle: "Grade 8 · Level 1 · Core Fluency",
    description: "Angles on lines and in triangles, interior and exterior angles of polygons, Pythagoras’ theorem, and standard compass constructions — warm-up, diagnostic, and spaced recheck for core fluency.",
    clusterNames: CLUSTER_NAMES,
    gateReviewHTML: "<p>You’ve finished the warm‑up. The next 24 questions are the Core Fluency diagnostic for angles. You’ll work with angles on lines and in triangles, interior and exterior angles of polygons, Pythagoras’ theorem, and standard constructions. Some questions have diagrams — read each one carefully. Take your time and use the feedback to sharpen your understanding.</p>",
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

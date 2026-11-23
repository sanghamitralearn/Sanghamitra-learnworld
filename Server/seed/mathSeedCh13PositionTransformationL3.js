// Position and Transformation — Grade 8, Level 3 (Problem-Solving & Synthesis).
// Warm-up, diagnostic and spaced recheck items.
// Run with: node seed/mathSeedCh13PositionTransformationL3.js
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-8";
const GRADE_LABEL = "Grade 8";
const CHAPTER_SLUG = "ch-13-position-transformation";
const CHAPTER_NAME = "Position and Transformation";
const LEVEL = 3;

const CLUSTER_NAMES = {
  "C1": "Bearings",
  "C2": "Scale drawings",
  "C3": "Points on a line segment",
  "C4": "Translations and reflections",
  "C5": "Rotations and enlargements",
  "C6": "Mixed position and transformation problems"
};

const warmupItems = [
  {
    "itemId": "w1",
    "order": 1,
    "cluster": "C6",
    "clusterName": "Mixed position and transformation problems",
    "question": "A is the point \\((1, 2)\\) and B is the point \\((6, 7)\\) on a map grid with north up the page. What is the bearing of A from B?",
    "options": [
      {
        "text": "045°",
        "correct": false,
        "feedback": "Gave the bearing of B from A, 045°. The question asks for the bearing of A from B, which is a half turn different."
      },
      {
        "text": "135°",
        "correct": false,
        "feedback": "Used 135°, the bearing of south-east. A is below and to the left of B, so from B the direction to A is south-west, not south-east."
      },
      {
        "text": "315°",
        "correct": false,
        "feedback": "Used 315°, the bearing of north-west. A is below and to the left of B, so from B the direction to A is south-west, not north-west."
      },
      {
        "text": "225°",
        "correct": true,
        "feedback": "Correct. B is \\(6 - 1 = 5\\) across and \\(7 - 2 = 5\\) up from A, so B is due north-east of A, on a bearing of 045°. The bearing of A from B is the back bearing: \\(45^\\circ + 180^\\circ = 225^\\circ\\)."
      }
    ],
    "retryHint": "Find the direction of B from A using how far B is across and up. Then reverse it.",
    "backward": "Coordinates, Ch10, and angles on a straight line, Ch5.",
    "forward": "Later in this chapter you combine bearings with scale drawings."
  },
  {
    "itemId": "w2",
    "order": 2,
    "cluster": "C4",
    "clusterName": "Translations and reflections",
    "question": "The point P\\((2, 1)\\) is reflected in the y-axis. The image is then translated by the column vector \\(\\begin{pmatrix}5\\\\2\\end{pmatrix}\\). What are the coordinates of the final image?",
    "options": [
      {
        "text": "\\((3, 3)\\)",
        "correct": true,
        "feedback": "Correct. Reflect in the y-axis first: \\((2, 1)\\) becomes \\((-2, 1)\\). Then add the vector: \\((-2 + 5, 1 + 2) = (3, 3)\\)."
      },
      {
        "text": "\\((-2, 1)\\)",
        "correct": false,
        "feedback": "Reflected P in the y-axis, \\((-2, 1)\\), but did not translate it. Both transformations are needed."
      },
      {
        "text": "\\((7, 3)\\)",
        "correct": false,
        "feedback": "Translated P to \\((7, 3)\\) but did not reflect it. Both transformations are needed."
      },
      {
        "text": "\\((-7, 3)\\)",
        "correct": false,
        "feedback": "Did the transformations in the wrong order: translating first gives \\((7, 3)\\), and reflecting that in the y-axis gives \\((-7, 3)\\). Reflect first, then translate."
      }
    ],
    "retryHint": "Do the two transformations in the order given. What is the image after the reflection alone?",
    "backward": "Negative coordinates, Ch10.",
    "forward": "Later in this chapter you describe a reflection followed by a translation."
  },
  {
    "itemId": "w3",
    "order": 3,
    "cluster": "C2",
    "clusterName": "Scale drawings",
    "question": "A map has a scale of \\(1:25\\,000\\). A footpath is 8 cm long on the map. A cyclist rides along the footpath and back again. How far does the cyclist ride, in kilometres?",
    "options": [
      {
        "text": "0.4 km",
        "correct": false,
        "feedback": "Changed 200 000 cm into 0.2 km by dividing by 1 000 000, then doubled to 0.4 km. There are 100 000 cm in 1 km."
      },
      {
        "text": "2 km",
        "correct": false,
        "feedback": "Found the one-way distance, 2 km, but the cyclist rides there and back, so double it."
      },
      {
        "text": "4 km",
        "correct": true,
        "feedback": "Correct. One way: \\(8 \\times 25\\,000 = 200\\,000\\text{ cm} = 2\\text{ km}\\). There and back is \\(2 \\times 2 = 4\\text{ km}\\)."
      },
      {
        "text": "40 km",
        "correct": false,
        "feedback": "Changed 200 000 cm into 20 km by dividing by 10 000, then doubled to 40 km. There are 100 000 cm in 1 km."
      }
    ],
    "retryHint": "Find the real length of the path first, in kilometres. Then think about the whole ride.",
    "backward": "Converting centimetres to kilometres, Ch7.",
    "forward": "Later in this chapter you meet scale drawings that need more than one step."
  },
  {
    "itemId": "w4",
    "order": 4,
    "cluster": "C5",
    "clusterName": "Rotations and enlargements",
    "question": "The point A\\((1, 2)\\) is enlarged from the origin by scale factor 3. The image is then rotated 180° about the origin. What are the coordinates of the final image?",
    "options": [
      {
        "text": "\\((-3, -6)\\)",
        "correct": true,
        "feedback": "Correct. Enlarge: \\((1 \\times 3, 2 \\times 3) = (3, 6)\\). A half-turn about the origin changes the sign of both coordinates: \\((-3, -6)\\)."
      },
      {
        "text": "\\((3, 6)\\)",
        "correct": false,
        "feedback": "Enlarged A to \\((3, 6)\\) but did not rotate it. Both transformations are needed."
      },
      {
        "text": "\\((-1, -2)\\)",
        "correct": false,
        "feedback": "Rotated A through 180° to \\((-1, -2)\\) but did not enlarge it. Both transformations are needed."
      },
      {
        "text": "\\((-3, 6)\\)",
        "correct": false,
        "feedback": "Enlarged correctly to \\((3, 6)\\), but changed the sign of only the x-coordinate, giving \\((-3, 6)\\). A half-turn about the origin changes the sign of both coordinates."
      }
    ],
    "retryHint": "Enlarge first by multiplying both coordinates. Then work out what a half-turn does to a point.",
    "backward": "Multiplying coordinates, Ch10.",
    "forward": "Later in this chapter you combine enlargements with other transformations."
  },
  {
    "itemId": "w5",
    "order": 5,
    "cluster": "C6",
    "clusterName": "Mixed position and transformation problems",
    "question": "A is the point \\((1, 1)\\) and P is the point \\((3, 2)\\). P lies on AB so that \\(\\mathrm{AP}:\\mathrm{PB} = 1:2\\). What are the coordinates of B?",
    "options": [
      {
        "text": "\\((9, 5)\\)",
        "correct": false,
        "feedback": "Took the step from P to B as 3 parts, \\((6, 3)\\), giving \\((3 + 6, 2 + 3) = (9, 5)\\). PB is 2 parts, not 3."
      },
      {
        "text": "\\((4, 2)\\)",
        "correct": false,
        "feedback": "Found the step from P to B, \\((4, 2)\\), and stopped. B is the point reached by adding this step to P."
      },
      {
        "text": "\\((5, 3)\\)",
        "correct": false,
        "feedback": "Took the step from P to B as 1 part, \\((2, 1)\\), giving \\((3 + 2, 2 + 1) = (5, 3)\\). PB is 2 parts, twice the step from A to P."
      },
      {
        "text": "\\((7, 4)\\)",
        "correct": true,
        "feedback": "Correct. AP is 1 part and the step from A to P is \\((3 - 1, 2 - 1) = (2, 1)\\). PB is 2 parts, so the step from P to B is \\((4, 2)\\). B = \\((3 + 4, 2 + 2) = (7, 4)\\)."
      }
    ],
    "retryHint": "AP is one part of the ratio. Find the step from A to P, then work out how many of those steps PB needs.",
    "backward": "Ratio, Ch11.",
    "forward": "Later in this chapter you find points that divide lines in other ratios."
  },
  {
    "itemId": "w6",
    "order": 6,
    "cluster": "C6",
    "clusterName": "Mixed position and transformation problems",
    "question": "On a map grid, 1 square represents 2 km. A is at \\((1, 1)\\) and B is at \\((7, 5)\\). A café is at the midpoint of AB. How far east of A is the café, in kilometres?",
    "options": [
      {
        "text": "8 km",
        "correct": false,
        "feedback": "Used the x-coordinate of the midpoint, 4, giving \\(4 \\times 2 = 8\\text{ km}\\). The distance east of A is \\(4 - 1 = 3\\) squares, not 4."
      },
      {
        "text": "6 km",
        "correct": true,
        "feedback": "Correct. The midpoint is \\(((1 + 7) \\div 2, (1 + 5) \\div 2) = (4, 3)\\). The café is \\(4 - 1 = 3\\) squares east of A, and \\(3 \\times 2 = 6\\text{ km}\\)."
      },
      {
        "text": "10 km",
        "correct": false,
        "feedback": "Used the y-coordinate of B, 5, giving \\(5 \\times 2 = 10\\text{ km}\\). The distance east of A depends on the x-coordinates, not the y-coordinates."
      },
      {
        "text": "12 km",
        "correct": false,
        "feedback": "Used the whole distance across from A to B, \\(7 - 1 = 6\\) squares, giving \\(6 \\times 2 = 12\\text{ km}\\). The café is only halfway, at the midpoint."
      }
    ],
    "retryHint": "Find the midpoint first. Then count how many squares east of A it is, and use the scale.",
    "backward": "Reading coordinates, Ch10, and scale, Ch11.",
    "forward": "Later in this chapter you use scales and coordinates together."
  },
  {
    "itemId": "w7",
    "order": 7,
    "cluster": "C1",
    "clusterName": "Bearings",
    "question": "B is due north of A. The bearing of C from B is 140°. What is the size of angle ABC?",
    "options": [
      {
        "text": "140°",
        "correct": false,
        "feedback": "Gave the bearing of C from B, 140°. Angle ABC is the angle between BA, due south, and BC, which is \\(180^\\circ - 140^\\circ = 40^\\circ\\)."
      },
      {
        "text": "320°",
        "correct": false,
        "feedback": "Found the reflex angle, \\(360^\\circ - 40^\\circ = 320^\\circ\\). Angle ABC is the smaller angle between BA and BC."
      },
      {
        "text": "40°",
        "correct": true,
        "feedback": "Correct. From B, the direction to A is due south, which is 180°. The bearing of C is 140°, so angle ABC = \\(180^\\circ - 140^\\circ = 40^\\circ\\)."
      },
      {
        "text": "50°",
        "correct": false,
        "feedback": "Used \\(140^\\circ - 90^\\circ = 50^\\circ\\), measuring from due east instead of from due south. BA points due south, so the angle is 40°."
      }
    ],
    "retryHint": "From B, what is the bearing of A? Then find the gap between that bearing and the bearing of C.",
    "backward": "Angles on a straight line, Ch5.",
    "forward": "Later in this chapter you use angles like this on scale drawings."
  },
  {
    "itemId": "w8",
    "order": 8,
    "cluster": "C4",
    "clusterName": "Translations and reflections",
    "question": "The point P\\((4, 3)\\) is translated by the column vector \\(\\begin{pmatrix}-6\\\\2\\end{pmatrix}\\). The image is then reflected in the x-axis. What are the coordinates of the final image?",
    "options": [
      {
        "text": "\\((-2, -1)\\)",
        "correct": false,
        "feedback": "Did the transformations in the wrong order: reflecting first gives \\((4, -3)\\), and translating that gives \\((-2, -1)\\). Translate first, then reflect."
      },
      {
        "text": "\\((-2, -5)\\)",
        "correct": true,
        "feedback": "Correct. Translate: \\((4 + (-6), 3 + 2) = (-2, 5)\\). Reflect in the x-axis by changing the sign of the y-coordinate: \\((-2, -5)\\)."
      },
      {
        "text": "\\((2, 5)\\)",
        "correct": false,
        "feedback": "Reflected in the y-axis instead of the x-axis, changing the sign of the x-coordinate and giving \\((2, 5)\\). Reflection in the x-axis changes the sign of y."
      },
      {
        "text": "\\((-2, 5)\\)",
        "correct": false,
        "feedback": "Translated P to \\((-2, 5)\\) but did not reflect it. Both transformations are needed."
      }
    ],
    "retryHint": "Do the translation first. Then decide which coordinate changes sign in a reflection in the x-axis.",
    "backward": "Negative numbers and coordinates, Ch10.",
    "forward": "Later in this chapter you describe single reflections by their mirror line."
  }
];

const diagnosticItems = [
  {
    "itemId": "d1",
    "order": 1,
    "cluster": "C1",
    "clusterName": "Bearings",
    "question": "The diagram shows towns B and C and their distances and bearings from town A. What is the bearing of C from B?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 273 428\" width=\"273\" height=\"428\"><rect x=\"0\" y=\"0\" width=\"273\" height=\"428\" fill=\"#ffffff\"/><line x1=\"66\" y1=\"236\" x2=\"66\" y2=\"62\" stroke=\"#666666\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><text x=\"66\" y=\"54\" font-family=\"sans-serif\" font-size=\"15\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"middle\">N</text><line x1=\"66\" y1=\"236\" x2=\"206.95\" y2=\"184.7\" stroke=\"#333333\" stroke-width=\"2\"/><line x1=\"66\" y1=\"236\" x2=\"141\" y2=\"365.9\" stroke=\"#333333\" stroke-width=\"2\"/><line x1=\"206.95\" y1=\"184.7\" x2=\"141\" y2=\"365.9\" stroke=\"#666666\" stroke-width=\"1.8\" stroke-dasharray=\"6 4\"/><text x=\"139.42\" y=\"201.51\" font-family=\"sans-serif\" font-size=\"14\" font-weight=\"bold\" fill=\"#c0392b\" text-anchor=\"end\">070°</text><text x=\"147.63\" y=\"224.06\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"start\">8 km</text><circle cx=\"206.95\" cy=\"184.7\" r=\"4.5\" fill=\"#333333\"/><text x=\"221.99\" y=\"184.22\" font-family=\"sans-serif\" font-size=\"15\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"middle\">B</text><text x=\"96.86\" y=\"318.45\" font-family=\"sans-serif\" font-size=\"14\" font-weight=\"bold\" fill=\"#c0392b\" text-anchor=\"end\">150°</text><text x=\"117.64\" y=\"306.45\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"start\">8 km</text><circle cx=\"141\" cy=\"365.9\" r=\"4.5\" fill=\"#333333\"/><text x=\"149\" y=\"384.76\" font-family=\"sans-serif\" font-size=\"15\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"middle\">C</text><circle cx=\"66\" cy=\"236\" r=\"4.5\" fill=\"#333333\"/><text x=\"48\" y=\"256\" font-family=\"sans-serif\" font-size=\"15\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"middle\">A</text></svg></div>",
    "options": [
      {
        "text": "150°",
        "correct": false,
        "feedback": "Gave the bearing of C from A, 150°. The question asks for the bearing of C from B."
      },
      {
        "text": "50°",
        "correct": false,
        "feedback": "Gave angle ABC, 50°, as the bearing. A bearing is measured clockwise from north at B, so start from the back bearing, 250°, and subtract 50°."
      },
      {
        "text": "200°",
        "correct": true,
        "feedback": "Correct. Angle BAC = \\(150^\\circ - 70^\\circ = 80^\\circ\\). AB = AC, so triangle ABC is isosceles and angle ABC = \\((180^\\circ - 80^\\circ) \\div 2 = 50^\\circ\\). The bearing of A from B is \\(70^\\circ + 180^\\circ = 250^\\circ\\). From B, C lies 50° nearer to due south, so the bearing of C from B is \\(250^\\circ - 50^\\circ = 200^\\circ\\)."
      },
      {
        "text": "130°",
        "correct": false,
        "feedback": "Used \\(180^\\circ - 50^\\circ = 130^\\circ\\). The bearing is measured clockwise from north at B, so start from the back bearing, 250°, and subtract 50°."
      }
    ],
    "backward": "Isosceles triangles, Ch5.",
    "forward": "Later in this chapter you draw journeys like this on scale drawings."
  },
  {
    "itemId": "d2",
    "order": 2,
    "cluster": "C4",
    "clusterName": "Translations and reflections",
    "question": "Triangle PQR is reflected in the line \\(x = 4\\). The image is then translated by the column vector \\(\\begin{pmatrix}-4\\\\1\\end{pmatrix}\\). What are the coordinates of the final image of R?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 388 310\" width=\"388\" height=\"310\"><rect x=\"0\" y=\"0\" width=\"388\" height=\"310\" fill=\"#ffffff\"/><line x1=\"44\" y1=\"266\" x2=\"44\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"84\" y1=\"266\" x2=\"84\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"124\" y1=\"266\" x2=\"124\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"164\" y1=\"266\" x2=\"164\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"204\" y1=\"266\" x2=\"204\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"244\" y1=\"266\" x2=\"244\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"284\" y1=\"266\" x2=\"284\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"324\" y1=\"266\" x2=\"324\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"364\" y1=\"266\" x2=\"364\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"266\" x2=\"364\" y2=\"266\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"226\" x2=\"364\" y2=\"226\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"186\" x2=\"364\" y2=\"186\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"146\" x2=\"364\" y2=\"146\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"106\" x2=\"364\" y2=\"106\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"66\" x2=\"364\" y2=\"66\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"26\" x2=\"364\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"266\" x2=\"364\" y2=\"266\" stroke=\"#333333\" stroke-width=\"1.8\"/><line x1=\"44\" y1=\"266\" x2=\"44\" y2=\"26\" stroke=\"#333333\" stroke-width=\"1.8\"/><text x=\"44\" y=\"282\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">0</text><text x=\"84\" y=\"282\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">1</text><text x=\"124\" y=\"282\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">2</text><text x=\"164\" y=\"282\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">3</text><text x=\"204\" y=\"282\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">4</text><text x=\"244\" y=\"282\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">5</text><text x=\"284\" y=\"282\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">6</text><text x=\"324\" y=\"282\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">7</text><text x=\"364\" y=\"282\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">8</text><text x=\"36\" y=\"270\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">0</text><text x=\"36\" y=\"230\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">1</text><text x=\"36\" y=\"190\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">2</text><text x=\"36\" y=\"150\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">3</text><text x=\"36\" y=\"110\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">4</text><text x=\"36\" y=\"70\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">5</text><text x=\"36\" y=\"30\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">6</text><text x=\"376\" y=\"270\" font-family=\"sans-serif\" font-size=\"14\" font-style=\"italic\" fill=\"#333333\">x</text><text x=\"54\" y=\"18\" font-family=\"sans-serif\" font-size=\"14\" font-style=\"italic\" fill=\"#333333\">y</text><line x1=\"204\" y1=\"266\" x2=\"204\" y2=\"26\" stroke=\"#c0392b\" stroke-width=\"2\" stroke-dasharray=\"7 5\"/><text x=\"209\" y=\"40\" font-family=\"sans-serif\" font-size=\"13\" font-weight=\"bold\" fill=\"#c0392b\" text-anchor=\"start\">x = 4</text><polygon points=\"84,226 164,226 124,146\" fill=\"#d6e6f5\" fill-opacity=\"0.75\" stroke=\"#1f4e79\" stroke-width=\"2.2\" stroke-linejoin=\"round\"/><circle cx=\"84\" cy=\"226\" r=\"3.5\" fill=\"#1f4e79\"/><text x=\"71.52\" y=\"239.32\" font-family=\"sans-serif\" font-size=\"15\" font-weight=\"bold\" fill=\"#1f4e79\" text-anchor=\"middle\">P</text><circle cx=\"164\" cy=\"226\" r=\"3.5\" fill=\"#1f4e79\"/><text x=\"176.48\" y=\"239.32\" font-family=\"sans-serif\" font-size=\"15\" font-weight=\"bold\" fill=\"#1f4e79\" text-anchor=\"middle\">Q</text><circle cx=\"124\" cy=\"146\" r=\"3.5\" fill=\"#1f4e79\"/><text x=\"124\" y=\"136\" font-family=\"sans-serif\" font-size=\"15\" font-weight=\"bold\" fill=\"#1f4e79\" text-anchor=\"middle\">R</text></svg></div>",
    "options": [
      {
        "text": "\\((6, 3)\\)",
        "correct": false,
        "feedback": "Reflected R in the line \\(x = 4\\), giving \\((6, 3)\\), but did not translate it. Both transformations are needed."
      },
      {
        "text": "\\((-2, 4)\\)",
        "correct": false,
        "feedback": "Translated R to \\((-2, 4)\\) but did not reflect it. Both transformations are needed."
      },
      {
        "text": "\\((10, 4)\\)",
        "correct": false,
        "feedback": "Did the transformations in the wrong order: translating first gives \\((-2, 4)\\), and reflecting that in \\(x = 4\\) gives \\((10, 4)\\). Reflect first, then translate."
      },
      {
        "text": "\\((2, 4)\\)",
        "correct": true,
        "feedback": "Correct. R is \\(4 - 2 = 2\\) to the left of the line, so its reflection is 2 to the right: \\(4 + 2 = 6\\), giving \\((6, 3)\\). Translate by \\(\\begin{pmatrix}-4\\\\1\\end{pmatrix}\\): \\((6 + (-4), 3 + 1) = (2, 4)\\)."
      }
    ],
    "backward": "Reading coordinates from a grid, Ch10.",
    "forward": "Later in this chapter you find mirror lines from a shape and its image."
  },
  {
    "itemId": "d3",
    "order": 3,
    "cluster": "C2",
    "clusterName": "Scale drawings",
    "question": "On a map with scale \\(1:40\\,000\\), a route is 12 cm long. Katya has walked \\(\\frac{3}{8}\\) of the route. How far has she walked, in kilometres?",
    "options": [
      {
        "text": "3 km",
        "correct": false,
        "feedback": "Found \\(\\frac{5}{8}\\) of the route instead of \\(\\frac{3}{8}\\), which is 3 km of the 4.8 km. Katya has walked \\(\\frac{3}{8}\\)."
      },
      {
        "text": "4.8 km",
        "correct": false,
        "feedback": "Found the whole route, \\(12 \\times 40\\,000 = 480\\,000\\text{ cm} = 4.8\\text{ km}\\), but Katya has walked only \\(\\frac{3}{8}\\) of it."
      },
      {
        "text": "18 km",
        "correct": false,
        "feedback": "Changed 180 000 cm into kilometres by dividing by 10 000, giving 18 km. There are 100 000 cm in 1 km."
      },
      {
        "text": "1.8 km",
        "correct": true,
        "feedback": "Correct. \\(\\frac{3}{8}\\) of 12 cm is 4.5 cm on the map. Real distance = \\(4.5 \\times 40\\,000 = 180\\,000\\text{ cm}\\). There are 100 000 cm in 1 km, so \\(180\\,000 \\div 100\\,000 = 1.8\\text{ km}\\)."
      }
    ],
    "backward": "Fractions of an amount, Ch8, and converting units, Ch7.",
    "forward": "Later in this chapter you use scales together with bearings."
  },
  {
    "itemId": "d4",
    "order": 4,
    "cluster": "C5",
    "clusterName": "Rotations and enlargements",
    "question": "The point P\\((4, 2)\\) is rotated 90° clockwise about the origin. The image is then enlarged by scale factor 2 with centre \\((1, 1)\\). What are the coordinates of the final image?",
    "options": [
      {
        "text": "\\((3, -7)\\)",
        "correct": false,
        "feedback": "Did the transformations in the wrong order: enlarging first gives \\((7, 3)\\), and rotating that about the origin gives \\((3, -7)\\). Rotate first, then enlarge."
      },
      {
        "text": "\\((3, -9)\\)",
        "correct": true,
        "feedback": "Correct. Rotate 90° clockwise about the origin, \\((x, y)\\) to \\((y, -x)\\): \\((4, 2)\\) becomes \\((2, -4)\\). This is \\(2 - 1 = 1\\) right and \\(-4 - 1 = -5\\) from the centre \\((1, 1)\\). Doubling gives 2 right and \\(-10\\), so the final image is \\((1 + 2, 1 + (-10)) = (3, -9)\\)."
      },
      {
        "text": "\\((4, -8)\\)",
        "correct": false,
        "feedback": "Enlarged from the origin instead of from the centre \\((1, 1)\\), doubling \\((2, -4)\\) to \\((4, -8)\\). The centre of enlargement here is \\((1, 1)\\)."
      },
      {
        "text": "\\((2, -4)\\)",
        "correct": false,
        "feedback": "Rotated P to \\((2, -4)\\) but did not enlarge it. Both transformations are needed."
      }
    ],
    "backward": "Coordinates and multiplying, Ch10 and Ch11.",
    "forward": "Later in this chapter you describe combined transformations."
  },
  {
    "itemId": "d5",
    "order": 5,
    "cluster": "C4",
    "clusterName": "Translations and reflections",
    "question": "A is the point \\((1, 2)\\) and B is the point \\((7, 8)\\). P lies on AB so that \\(\\mathrm{AP}:\\mathrm{PB} = 1:2\\). P is then translated by the column vector \\(\\begin{pmatrix}3\\\\-5\\end{pmatrix}\\). What are the coordinates of the final point?",
    "options": [
      {
        "text": "\\((3, 4)\\)",
        "correct": false,
        "feedback": "Found P, \\((3, 4)\\), but did not translate it. The question asks for the final point."
      },
      {
        "text": "\\((7, 0)\\)",
        "correct": false,
        "feedback": "Used the midpoint \\((4, 5)\\) for P and then translated it to \\((7, 0)\\). A ratio of \\(1:2\\) is not an equal split."
      },
      {
        "text": "\\((6, -1)\\)",
        "correct": true,
        "feedback": "Correct. AP is 1 of the \\(1 + 2 = 3\\) equal parts of AB. The step from A to B is \\((6, 6)\\), so AP = \\(\\frac{1}{3}\\) of it = \\((2, 2)\\) and P = \\((1 + 2, 2 + 2) = (3, 4)\\). Translate: \\((3 + 3, 4 + (-5)) = (6, -1)\\)."
      },
      {
        "text": "\\((8, 1)\\)",
        "correct": false,
        "feedback": "Used \\(\\frac{2}{3}\\) of the way instead of \\(\\frac{1}{3}\\), so P = \\((1 + 4, 2 + 4) = (5, 6)\\), and then translated it to \\((8, 1)\\). AP is the part with 1 share."
      }
    ],
    "backward": "Fractions of an amount, Ch8, and ratio, Ch11.",
    "forward": "Later in this chapter you combine translations with points on a line."
  },
  {
    "itemId": "d6",
    "order": 6,
    "cluster": "C6",
    "clusterName": "Mixed position and transformation problems",
    "question": "The point A\\((3, 2)\\) is rotated 90° anticlockwise about the origin. The image is then reflected in the line \\(y = 1\\). What are the coordinates of the final image?",
    "options": [
      {
        "text": "\\((-2, 3)\\)",
        "correct": false,
        "feedback": "Rotated A to \\((-2, 3)\\) but did not reflect it. Both transformations are needed."
      },
      {
        "text": "\\((-2, -1)\\)",
        "correct": true,
        "feedback": "Correct. Rotate 90° anticlockwise about the origin, \\((x, y)\\) to \\((-y, x)\\): \\((3, 2)\\) becomes \\((-2, 3)\\). The point \\((-2, 3)\\) is \\(3 - 1 = 2\\) above the line \\(y = 1\\), so its reflection is 2 below it: \\(1 - 2 = -1\\). The final image is \\((-2, -1)\\)."
      },
      {
        "text": "\\((0, 3)\\)",
        "correct": false,
        "feedback": "Did the transformations in the wrong order: reflecting first gives \\((3, 0)\\), and rotating that gives \\((0, 3)\\). Rotate first, then reflect."
      },
      {
        "text": "\\((2, 5)\\)",
        "correct": false,
        "feedback": "Rotated clockwise instead of anticlockwise: \\((3, 2)\\) goes to \\((2, -3)\\), and reflecting that in \\(y = 1\\) gives \\((2, 5)\\). The question says anticlockwise."
      }
    ],
    "backward": "Coordinates and equations of lines, Ch10.",
    "forward": "Later in this chapter you describe combined transformations."
  },
  {
    "itemId": "d7",
    "order": 7,
    "cluster": "C6",
    "clusterName": "Mixed position and transformation problems",
    "question": "On a map grid with north up the page, A is the point \\((1, 1)\\), B is the point \\((4, 4)\\) and C is the point \\((7, 1)\\). What is the size of angle ABC?",
    "options": [
      {
        "text": "90°",
        "correct": true,
        "feedback": "Correct. B is 3 across and 3 up from A, so from B the direction to A is south-west, a bearing of 225°. C is 3 across and 3 down from B, so from B it is south-east, a bearing of 135°. Angle ABC = \\(225^\\circ - 135^\\circ = 90^\\circ\\)."
      },
      {
        "text": "135°",
        "correct": false,
        "feedback": "Gave the bearing of C from B, 135°, not the angle between BA and BC."
      },
      {
        "text": "225°",
        "correct": false,
        "feedback": "Gave the bearing of A from B, 225°, not the angle between BA and BC."
      },
      {
        "text": "45°",
        "correct": false,
        "feedback": "Used the 45° between BA and due south. Angle ABC also includes the 45° between due south and BC."
      }
    ],
    "backward": "Coordinates, Ch10, and angles, Ch5.",
    "forward": "Later in this chapter you use bearings on scale drawings."
  },
  {
    "itemId": "d8",
    "order": 8,
    "cluster": "C4",
    "clusterName": "Translations and reflections",
    "question": "The point A\\((5, 2)\\) is reflected in the line \\(x = 1\\) to give A′. A′ is then translated to A″\\((-2, 6)\\). What is the column vector of the translation?",
    "options": [
      {
        "text": "\\(\\begin{pmatrix}1\\\\-4\\end{pmatrix}\\)",
        "correct": false,
        "feedback": "Reversed the vertical move, giving \\(\\begin{pmatrix}1\\\\-4\\end{pmatrix}\\). A″ is 4 above A′, so the bottom entry is \\(+4\\)."
      },
      {
        "text": "\\(\\begin{pmatrix}-1\\\\-4\\end{pmatrix}\\)",
        "correct": false,
        "feedback": "Used the reverse vector, from A″ back to A′, giving \\(\\begin{pmatrix}-1\\\\-4\\end{pmatrix}\\). The vector goes from A′ to A″."
      },
      {
        "text": "\\(\\begin{pmatrix}1\\\\4\\end{pmatrix}\\)",
        "correct": true,
        "feedback": "Correct. A is \\(5 - 1 = 4\\) to the right of the line, so A′ is 4 to the left of it: \\(1 - 4 = -3\\), giving A′\\((-3, 2)\\). The vector from A′ to A″ is \\(-2 - (-3) = 1\\) across and \\(6 - 2 = 4\\) vertically, so \\(\\begin{pmatrix}1\\\\4\\end{pmatrix}\\)."
      },
      {
        "text": "\\(\\begin{pmatrix}-7\\\\4\\end{pmatrix}\\)",
        "correct": false,
        "feedback": "Found the vector from A to A″: \\(-2 - 5 = -7\\) and \\(6 - 2 = 4\\), giving \\(\\begin{pmatrix}-7\\\\4\\end{pmatrix}\\). The translation starts at A′, not at A."
      }
    ],
    "backward": "Reading coordinates, Ch10.",
    "forward": "Later in this chapter you describe translations by column vectors."
  },
  {
    "itemId": "d9",
    "order": 9,
    "cluster": "C2",
    "clusterName": "Scale drawings",
    "question": "A square field is drawn on a plan with a side of 5 cm. The scale of the plan is \\(1:2000\\). A farmer walks once around the edge of the field. How far does the farmer walk, in metres?",
    "options": [
      {
        "text": "20 m",
        "correct": false,
        "feedback": "Found the perimeter on the plan, \\(4 \\times 5 = 20\\text{ cm}\\), and wrote it as 20 m without using the scale. Multiply by 2000 first."
      },
      {
        "text": "400 m",
        "correct": true,
        "feedback": "Correct. Real side = \\(5 \\times 2000 = 10\\,000\\text{ cm} = 100\\text{ m}\\). The farmer walks the perimeter, \\(4 \\times 100 = 400\\text{ m}\\)."
      },
      {
        "text": "100 m",
        "correct": false,
        "feedback": "Found the real length of one side, 100 m, but the farmer walks all four sides."
      },
      {
        "text": "40 m",
        "correct": false,
        "feedback": "Found \\(4 \\times 10\\,000 = 40\\,000\\text{ cm}\\) but divided by 1000 instead of 100, giving 40 m. There are 100 cm in 1 m."
      }
    ],
    "backward": "Perimeter and converting units, Ch7.",
    "forward": "Later in this chapter you compare lengths in enlargements."
  },
  {
    "itemId": "d10",
    "order": 10,
    "cluster": "C5",
    "clusterName": "Rotations and enlargements",
    "question": "The point A\\((2, 5)\\) is enlarged by scale factor 3 with centre C\\((1, 2)\\). The image is then rotated 180° about C. What are the coordinates of the final image?",
    "options": [
      {
        "text": "\\((4, 11)\\)",
        "correct": false,
        "feedback": "Enlarged A to \\((4, 11)\\) but did not rotate it. Both transformations are needed."
      },
      {
        "text": "\\((-2, -7)\\)",
        "correct": true,
        "feedback": "Correct. A is 1 right and 3 up from C. Enlarging gives 3 right and 9 up, so the image is \\((1 + 3, 2 + 9) = (4, 11)\\). A half-turn about C reverses this to 3 left and 9 down: \\((1 - 3, 2 - 9) = (-2, -7)\\)."
      },
      {
        "text": "\\((-4, -11)\\)",
        "correct": false,
        "feedback": "Rotated about the origin instead of about C, changing the signs of \\((4, 11)\\) and giving \\((-4, -11)\\). The centre of rotation here is C\\((1, 2)\\)."
      },
      {
        "text": "\\((-2, 11)\\)",
        "correct": false,
        "feedback": "Reversed only the horizontal movement from C, giving \\((1 - 3, 2 + 9) = (-2, 11)\\). A half-turn reverses both the horizontal and the vertical movement."
      }
    ],
    "backward": "Coordinates and multiplying, Ch10 and Ch11.",
    "forward": "Later in this chapter you find the centre of a rotation."
  },
  {
    "itemId": "d11",
    "order": 11,
    "cluster": "C6",
    "clusterName": "Mixed position and transformation problems",
    "question": "A is the point \\((-5, 1)\\) and P is the point \\((1, 7)\\). P lies on AB so that \\(\\mathrm{AP}:\\mathrm{PB} = 3:2\\). What are the coordinates of B?",
    "options": [
      {
        "text": "\\((3, 9)\\)",
        "correct": false,
        "feedback": "Took PB to be 1 part, \\((2, 2)\\), giving \\((1 + 2, 7 + 2) = (3, 9)\\). PB is 2 parts."
      },
      {
        "text": "\\((9, 15)\\)",
        "correct": false,
        "feedback": "Took PB to be 4 parts, \\((8, 8)\\), giving \\((1 + 8, 7 + 8) = (9, 15)\\). PB is 2 parts, so \\(2 \\times (2, 2) = (4, 4)\\)."
      },
      {
        "text": "\\((7, 13)\\)",
        "correct": false,
        "feedback": "Took PB to be equal to AP, giving \\((1 + 6, 7 + 6) = (7, 13)\\). PB is 2 parts, not 3."
      },
      {
        "text": "\\((5, 11)\\)",
        "correct": true,
        "feedback": "Correct. The step from A to P is \\((1 - (-5), 7 - 1) = (6, 6)\\). AP is 3 parts, so one part is \\((2, 2)\\). PB is 2 parts, \\((4, 4)\\). B = \\((1 + 4, 7 + 4) = (5, 11)\\)."
      }
    ],
    "backward": "Ratio, Ch11.",
    "forward": "Later in this chapter you divide lines in other ratios."
  },
  {
    "itemId": "d12",
    "order": 12,
    "cluster": "C2",
    "clusterName": "Scale drawings",
    "question": "On a map with scale \\(1:50\\,000\\), towns A and B are 8 cm apart. A viewpoint P is on the straight path AB so that \\(\\mathrm{AP}:\\mathrm{PB} = 3:5\\). What is the real distance from A to P, in kilometres?",
    "options": [
      {
        "text": "15 km",
        "correct": false,
        "feedback": "Found AP on the map, 3 cm, then \\(3 \\times 50\\,000 = 150\\,000\\text{ cm}\\), but divided by 10 000 to get 15 km. There are 100 000 cm in 1 km."
      },
      {
        "text": "2.5 km",
        "correct": false,
        "feedback": "Found PB, \\(\\frac{5}{8}\\) of \\(4\\text{ km} = 2.5\\text{ km}\\). AP is the part with 3 shares."
      },
      {
        "text": "1.5 km",
        "correct": true,
        "feedback": "Correct. AB = \\(8 \\times 50\\,000 = 400\\,000\\text{ cm} = 4\\text{ km}\\). AP is 3 of the \\(3 + 5 = 8\\) equal parts, so AP = \\(\\frac{3}{8}\\) of \\(4\\text{ km} = 1.5\\text{ km}\\)."
      },
      {
        "text": "2 km",
        "correct": false,
        "feedback": "Found the midpoint distance, \\(4 \\div 2 = 2\\text{ km}\\). A ratio of \\(3:5\\) is not an equal split."
      }
    ],
    "backward": "Ratio, Ch11, and converting units, Ch7.",
    "forward": "Later in this chapter you use scales with bearings and points on a line."
  },
  {
    "itemId": "d13",
    "order": 13,
    "cluster": "C1",
    "clusterName": "Bearings",
    "question": "B is due east of A. The diagram shows the bearings of C from A and from B. What is the size of angle ACB?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 402 246\" width=\"402\" height=\"246\"><rect x=\"0\" y=\"0\" width=\"402\" height=\"246\" fill=\"#ffffff\"/><line x1=\"86\" y1=\"130\" x2=\"86\" y2=\"60\" stroke=\"#666666\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><text x=\"86\" y=\"54\" font-family=\"sans-serif\" font-size=\"14\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"middle\">N</text><line x1=\"286\" y1=\"130\" x2=\"286\" y2=\"60\" stroke=\"#666666\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><text x=\"286\" y=\"54\" font-family=\"sans-serif\" font-size=\"14\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"middle\">N</text><line x1=\"86\" y1=\"130\" x2=\"286\" y2=\"130\" stroke=\"#333333\" stroke-width=\"2\"/><line x1=\"86\" y1=\"130\" x2=\"186\" y2=\"46.09\" stroke=\"#333333\" stroke-width=\"2\"/><line x1=\"286\" y1=\"130\" x2=\"186\" y2=\"46.09\" stroke=\"#333333\" stroke-width=\"2\"/><path d=\"M 86 96 A 34 34 0 0 1 112.05 108.15\" fill=\"none\" stroke=\"#c0392b\" stroke-width=\"2\"/><text x=\"107.55\" y=\"88.78\" font-family=\"sans-serif\" font-size=\"14\" font-weight=\"bold\" fill=\"#c0392b\" text-anchor=\"middle\">050°</text><path d=\"M 286 100 A 30 30 0 1 1 263.02 110.72\" fill=\"none\" stroke=\"#c0392b\" stroke-width=\"2\"/><text x=\"305.86\" y=\"177.6\" font-family=\"sans-serif\" font-size=\"14\" font-weight=\"bold\" fill=\"#c0392b\" text-anchor=\"middle\">310°</text><circle cx=\"86\" cy=\"130\" r=\"4.5\" fill=\"#333333\"/><text x=\"78.39\" y=\"151.31\" font-family=\"sans-serif\" font-size=\"15\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"middle\">A</text><circle cx=\"286\" cy=\"130\" r=\"4.5\" fill=\"#333333\"/><text x=\"327.41\" y=\"146.58\" font-family=\"sans-serif\" font-size=\"15\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"middle\">B</text><circle cx=\"186\" cy=\"46.09\" r=\"4.5\" fill=\"#333333\"/><text x=\"186\" y=\"34.09\" font-family=\"sans-serif\" font-size=\"15\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"middle\">C</text></svg></div>",
    "options": [
      {
        "text": "100°",
        "correct": true,
        "feedback": "Correct. Angle CAB is the angle from 050° round to due east: \\(90^\\circ - 50^\\circ = 40^\\circ\\). From B, A is due west, 270°, and C is at 310°, so angle CBA = \\(310^\\circ - 270^\\circ = 40^\\circ\\). Angle ACB = \\(180^\\circ - 40^\\circ - 40^\\circ = 100^\\circ\\)."
      },
      {
        "text": "80°",
        "correct": false,
        "feedback": "Used \\(40^\\circ + 40^\\circ = 80^\\circ\\), the sum of the two base angles, and stopped. Angle ACB is the remaining angle in the triangle: \\(180^\\circ - 80^\\circ\\)."
      },
      {
        "text": "40°",
        "correct": false,
        "feedback": "Gave one of the base angles, 40°. Angle ACB is the angle at C, \\(180^\\circ - 40^\\circ - 40^\\circ = 100^\\circ\\)."
      },
      {
        "text": "90°",
        "correct": false,
        "feedback": "Assumed a right angle at C, giving 90°. The angles at A and B are each 40°, so angle ACB = 100°."
      }
    ],
    "backward": "Angles in a triangle, Ch5.",
    "forward": "Later in this chapter you use bearings in scale drawings."
  },
  {
    "itemId": "d14",
    "order": 14,
    "cluster": "C4",
    "clusterName": "Translations and reflections",
    "question": "The point P\\((-2, 5)\\) is reflected in the line \\(y = 1\\). The image is then reflected in the line \\(x = 2\\). What are the coordinates of the final image?",
    "options": [
      {
        "text": "\\((-2, -3)\\)",
        "correct": false,
        "feedback": "Reflected only in the line \\(y = 1\\), giving \\((-2, -3)\\), and missed the reflection in \\(x = 2\\). Both reflections are needed."
      },
      {
        "text": "\\((2, -3)\\)",
        "correct": false,
        "feedback": "Placed the second image on the mirror line \\(x = 2\\), giving \\((2, -3)\\). The image is the same distance on the other side of the line, 4 to the right of it."
      },
      {
        "text": "\\((6, 5)\\)",
        "correct": false,
        "feedback": "Reflected only in the line \\(x = 2\\), giving \\((6, 5)\\), and missed the reflection in \\(y = 1\\). Both reflections are needed."
      },
      {
        "text": "\\((6, -3)\\)",
        "correct": true,
        "feedback": "Correct. P is \\(5 - 1 = 4\\) above the line \\(y = 1\\), so its first image is 4 below it: \\(1 - 4 = -3\\), giving \\((-2, -3)\\). This point is \\(2 - (-2) = 4\\) to the left of \\(x = 2\\), so the final image is 4 to the right: \\(2 + 4 = 6\\), giving \\((6, -3)\\)."
      }
    ],
    "backward": "Equations of lines and coordinates, Ch10.",
    "forward": "Later in this chapter you describe combined transformations."
  },
  {
    "itemId": "d15",
    "order": 15,
    "cluster": "C2",
    "clusterName": "Scale drawings",
    "question": "A lake is 9 cm long on a map with scale \\(1:20\\,000\\). On a second map it is 3 cm long. What is the scale of the second map?",
    "options": [
      {
        "text": "\\(1:6\\,000\\)",
        "correct": false,
        "feedback": "Divided 180 000 by 3 but lost a zero, giving \\(1:6\\,000\\). Dividing correctly, \\(180\\,000 \\div 3 = 60\\,000\\)."
      },
      {
        "text": "\\(1:180\\,000\\)",
        "correct": false,
        "feedback": "Used the real length, 180 000 cm, as the scale number, giving \\(1:180\\,000\\), without comparing it with the 3 cm on the second map. The scale is the ratio \\(3:180\\,000\\), which simplifies."
      },
      {
        "text": "\\(1:120\\,000\\)",
        "correct": false,
        "feedback": "Used the difference in lengths, \\(9 - 3 = 6\\), and found \\(20\\,000 \\times 6 = 120\\,000\\), giving \\(1:120\\,000\\). The scale of the second map comes from comparing 3 cm with the real length."
      },
      {
        "text": "\\(1:60\\,000\\)",
        "correct": true,
        "feedback": "Correct. Real length = \\(9 \\times 20\\,000 = 180\\,000\\text{ cm}\\). On the second map this is 3 cm, so the ratio \\(3:180\\,000\\) simplifies to \\(1:60\\,000\\)."
      }
    ],
    "backward": "Ratio and simplifying, Ch11.",
    "forward": "Later in this chapter you use scales in the other direction too."
  },
  {
    "itemId": "d16",
    "order": 16,
    "cluster": "C5",
    "clusterName": "Rotations and enlargements",
    "question": "Triangle ABC is mapped onto triangle A′B′C′ by an enlargement, as shown. What are the coordinates of the centre of enlargement?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 428 350\" width=\"428\" height=\"350\"><rect x=\"0\" y=\"0\" width=\"428\" height=\"350\" fill=\"#ffffff\"/><line x1=\"44\" y1=\"306\" x2=\"44\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"84\" y1=\"306\" x2=\"84\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"124\" y1=\"306\" x2=\"124\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"164\" y1=\"306\" x2=\"164\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"204\" y1=\"306\" x2=\"204\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"244\" y1=\"306\" x2=\"244\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"284\" y1=\"306\" x2=\"284\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"324\" y1=\"306\" x2=\"324\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"364\" y1=\"306\" x2=\"364\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"404\" y1=\"306\" x2=\"404\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"306\" x2=\"404\" y2=\"306\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"266\" x2=\"404\" y2=\"266\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"226\" x2=\"404\" y2=\"226\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"186\" x2=\"404\" y2=\"186\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"146\" x2=\"404\" y2=\"146\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"106\" x2=\"404\" y2=\"106\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"66\" x2=\"404\" y2=\"66\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"26\" x2=\"404\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"306\" x2=\"404\" y2=\"306\" stroke=\"#333333\" stroke-width=\"1.8\"/><line x1=\"44\" y1=\"306\" x2=\"44\" y2=\"26\" stroke=\"#333333\" stroke-width=\"1.8\"/><text x=\"44\" y=\"322\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">0</text><text x=\"84\" y=\"322\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">1</text><text x=\"124\" y=\"322\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">2</text><text x=\"164\" y=\"322\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">3</text><text x=\"204\" y=\"322\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">4</text><text x=\"244\" y=\"322\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">5</text><text x=\"284\" y=\"322\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">6</text><text x=\"324\" y=\"322\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">7</text><text x=\"364\" y=\"322\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">8</text><text x=\"404\" y=\"322\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">9</text><text x=\"36\" y=\"310\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">0</text><text x=\"36\" y=\"270\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">1</text><text x=\"36\" y=\"230\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">2</text><text x=\"36\" y=\"190\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">3</text><text x=\"36\" y=\"150\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">4</text><text x=\"36\" y=\"110\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">5</text><text x=\"36\" y=\"70\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">6</text><text x=\"36\" y=\"30\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">7</text><text x=\"416\" y=\"310\" font-family=\"sans-serif\" font-size=\"14\" font-style=\"italic\" fill=\"#333333\">x</text><text x=\"54\" y=\"18\" font-family=\"sans-serif\" font-size=\"14\" font-style=\"italic\" fill=\"#333333\">y</text><polygon points=\"164,226 244,226 164,186\" fill=\"#d6e6f5\" fill-opacity=\"0.75\" stroke=\"#1f4e79\" stroke-width=\"2.2\" stroke-linejoin=\"round\"/><circle cx=\"164\" cy=\"226\" r=\"3.5\" fill=\"#1f4e79\"/><text x=\"150.58\" y=\"237.71\" font-family=\"sans-serif\" font-size=\"15\" font-weight=\"bold\" fill=\"#1f4e79\" text-anchor=\"middle\">A</text><circle cx=\"244\" cy=\"226\" r=\"3.5\" fill=\"#1f4e79\"/><text x=\"258.55\" y=\"234.64\" font-family=\"sans-serif\" font-size=\"15\" font-weight=\"bold\" fill=\"#1f4e79\" text-anchor=\"middle\">B</text><circle cx=\"164\" cy=\"186\" r=\"3.5\" fill=\"#1f4e79\"/><text x=\"153.39\" y=\"180.39\" font-family=\"sans-serif\" font-size=\"15\" font-weight=\"bold\" fill=\"#1f4e79\" text-anchor=\"middle\">C</text><polygon points=\"204,146 364,146 204,66\" fill=\"#f7dcdc\" fill-opacity=\"0.75\" stroke=\"#8e2a2a\" stroke-width=\"2.2\" stroke-linejoin=\"round\"/><circle cx=\"204\" cy=\"146\" r=\"3.5\" fill=\"#8e2a2a\"/><text x=\"190.58\" y=\"157.71\" font-family=\"sans-serif\" font-size=\"15\" font-weight=\"bold\" fill=\"#8e2a2a\" text-anchor=\"middle\">A′</text><circle cx=\"364\" cy=\"146\" r=\"3.5\" fill=\"#8e2a2a\"/><text x=\"378.55\" y=\"154.64\" font-family=\"sans-serif\" font-size=\"15\" font-weight=\"bold\" fill=\"#8e2a2a\" text-anchor=\"middle\">B′</text><circle cx=\"204\" cy=\"66\" r=\"3.5\" fill=\"#8e2a2a\"/><text x=\"193.39\" y=\"60.39\" font-family=\"sans-serif\" font-size=\"15\" font-weight=\"bold\" fill=\"#8e2a2a\" text-anchor=\"middle\">C′</text></svg></div>",
    "options": [
      {
        "text": "\\((2, 0)\\)",
        "correct": true,
        "feedback": "Correct. A′ is twice as far from the centre as A is, so A is halfway between the centre and A′. The centre is \\(2 \\times A - A'\\): \\((2 \\times 3 - 4, 2 \\times 2 - 4) = (2, 0)\\). Check: lines through A and A′, B and B′, and C and C′ all pass through \\((2, 0)\\)."
      },
      {
        "text": "\\((3.5, 3)\\)",
        "correct": false,
        "feedback": "Gave the midpoint of A and A′, \\(((3 + 4) \\div 2, (2 + 4) \\div 2) = (3.5, 3)\\). The centre is not the midpoint; A′ must be twice as far from the centre as A is."
      },
      {
        "text": "\\((1, 2)\\)",
        "correct": false,
        "feedback": "Used the movement from A to A′, \\((4 - 3, 4 - 2) = (1, 2)\\). The centre is the fixed point the enlargement stretches away from."
      },
      {
        "text": "\\((5, 6)\\)",
        "correct": false,
        "feedback": "Went on from A′ by the same step, \\(2 \\times 4 - 3 = 5\\) and \\(2 \\times 4 - 2 = 6\\), giving \\((5, 6)\\). That goes away from the centre; go back from A instead: \\(2 \\times A - A'\\)."
      }
    ],
    "backward": "Coordinates and scale factors, Ch10 and Ch11.",
    "forward": "Later in this chapter you describe an enlargement by its centre and scale factor."
  },
  {
    "itemId": "d17",
    "order": 17,
    "cluster": "C6",
    "clusterName": "Mixed position and transformation problems",
    "question": "A is the point \\((0, 0)\\), B is the point \\((12, 8)\\) and P is the point \\((9, 6)\\) on AB. What is the ratio \\(\\mathrm{AP}:\\mathrm{PB}\\) in its simplest form?",
    "options": [
      {
        "text": "\\(3:4\\)",
        "correct": false,
        "feedback": "Gave \\(\\mathrm{AP}:\\mathrm{AB} = 3:4\\), comparing a part with the whole. PB is the remaining \\(\\frac{1}{4}\\) of AB, so \\(\\mathrm{AP}:\\mathrm{PB} = 3:1\\)."
      },
      {
        "text": "\\(3:1\\)",
        "correct": true,
        "feedback": "Correct. AP is \\((9, 6)\\) and AB is \\((12, 8)\\), so AP = \\(\\frac{9}{12} = \\frac{3}{4}\\) of AB. PB is the remaining \\(\\frac{1}{4}\\), so \\(\\mathrm{AP}:\\mathrm{PB} = 3:1\\)."
      },
      {
        "text": "\\(9:6\\)",
        "correct": false,
        "feedback": "Compared the x- and y-coordinates of P, \\(9:6\\). The ratio \\(\\mathrm{AP}:\\mathrm{PB}\\) compares lengths along AB, so find the fraction of AB that AP is."
      },
      {
        "text": "\\(1:3\\)",
        "correct": false,
        "feedback": "Wrote the ratio the wrong way round, \\(1:3\\). AP is the longer part, \\(\\frac{3}{4}\\) of AB, so \\(\\mathrm{AP}:\\mathrm{PB} = 3:1\\)."
      }
    ],
    "backward": "Fractions and simplifying ratios, Ch8 and Ch11.",
    "forward": "Later in this chapter you find points that divide lines in given ratios."
  },
  {
    "itemId": "d18",
    "order": 18,
    "cluster": "C6",
    "clusterName": "Mixed position and transformation problems",
    "question": "On a map with scale \\(1:50\\,000\\), B is 6 cm from A on a bearing of 090°. The point P lies on AB so that \\(\\mathrm{AP}:\\mathrm{PB} = 1:2\\). What is the real distance from A to P, and what is the bearing of A from P?",
    "options": [
      {
        "text": "1 km, 270°",
        "correct": true,
        "feedback": "Correct. AP is 1 of the \\(1 + 2 = 3\\) equal parts of the 6 cm, so AP = 2 cm on the map. Real distance = \\(2 \\times 50\\,000 = 100\\,000\\text{ cm} = 1\\text{ km}\\). P is due east of A, so the bearing of A from P is the back bearing: \\(90^\\circ + 180^\\circ = 270^\\circ\\)."
      },
      {
        "text": "1.5 km, 270°",
        "correct": false,
        "feedback": "Used the midpoint, 3 cm on the map: \\(3 \\times 50\\,000 = 150\\,000\\text{ cm} = 1.5\\text{ km}\\), giving 1.5 km, 270°. A ratio of \\(1:2\\) is not an equal split."
      },
      {
        "text": "2 km, 270°",
        "correct": false,
        "feedback": "Found the distance of PB, \\(4 \\times 50\\,000 = 200\\,000\\text{ cm} = 2\\text{ km}\\), instead of AP, giving 2 km, 270°. AP is the part with 1 share."
      },
      {
        "text": "1 km, 090°",
        "correct": false,
        "feedback": "Found the distance correctly but gave the bearing of P from A, 090°, giving 1 km, 090°. The question asks for the bearing of A from P, a half turn different."
      }
    ],
    "backward": "Ratio and scale, Ch11, and angles on a straight line, Ch5.",
    "forward": "Later problems in this chapter place points on a plan using a distance and a bearing."
  },
  {
    "itemId": "d19",
    "order": 19,
    "cluster": "C1",
    "clusterName": "Bearings",
    "question": "B is due north of A and BC = BA. The bearing of C from B is 110°. What is the bearing of C from A?",
    "options": [
      {
        "text": "055°",
        "correct": true,
        "feedback": "Correct. From B, A is due south (180°), so angle ABC = \\(180^\\circ - 110^\\circ = 70^\\circ\\). BC = BA, so triangle ABC is isosceles and angle BAC = \\((180^\\circ - 70^\\circ) \\div 2 = 55^\\circ\\). B is due north of A, so the bearing of C from A is 55° clockwise from north, written 055°."
      },
      {
        "text": "070°",
        "correct": false,
        "feedback": "Gave the angle at B, 70°, written as the bearing 070°. That is not the bearing of C from A. The bearing from A is the angle at A, 55°."
      },
      {
        "text": "125°",
        "correct": false,
        "feedback": "Found \\(180^\\circ - 55^\\circ = 125^\\circ\\). C is to the north-east of A, so its bearing is 55°, not 125°."
      },
      {
        "text": "110°",
        "correct": false,
        "feedback": "Gave the bearing of C from B, 110°. The question asks for the bearing of C from A."
      }
    ],
    "backward": "Isosceles triangles, Ch5.",
    "forward": "Later in this chapter you draw journeys like this on scale drawings."
  },
  {
    "itemId": "d20",
    "order": 20,
    "cluster": "C4",
    "clusterName": "Translations and reflections",
    "question": "A translation takes A\\((2, 5)\\) to A′\\((-1, 1)\\). The point B\\((5, 3)\\) is translated by the same vector and the image is then reflected in the line \\(x = 1\\). What are the coordinates of the final image of B?",
    "options": [
      {
        "text": "\\((-6, -1)\\)",
        "correct": false,
        "feedback": "Did the transformations in the wrong order: reflecting B in \\(x = 1\\) gives \\((-3, 3)\\), and translating that gives \\((-6, -1)\\). Translate first, then reflect."
      },
      {
        "text": "\\((0, -1)\\)",
        "correct": true,
        "feedback": "Correct. A moves \\(-1 - 2 = -3\\) across and \\(1 - 5 = -4\\) vertically, so the vector is \\(\\begin{pmatrix}-3\\\\-4\\end{pmatrix}\\). B moves to \\((5 + (-3), 3 + (-4)) = (2, -1)\\). This is \\(2 - 1 = 1\\) to the right of \\(x = 1\\), so the final image is 1 to the left of it: \\(1 - 1 = 0\\), giving \\((0, -1)\\)."
      },
      {
        "text": "\\((-2, -1)\\)",
        "correct": false,
        "feedback": "Reflected in the y-axis instead of the line \\(x = 1\\), changing the sign of 2 and giving \\((-2, -1)\\). The mirror line is \\(x = 1\\), so measure the distance from that line."
      },
      {
        "text": "\\((2, -1)\\)",
        "correct": false,
        "feedback": "Translated B to \\((2, -1)\\) but did not reflect it. Both transformations are needed."
      }
    ],
    "backward": "Reading coordinates, Ch10.",
    "forward": "Later in this chapter you describe translations by column vectors."
  },
  {
    "itemId": "d21",
    "order": 21,
    "cluster": "C2",
    "clusterName": "Scale drawings",
    "question": "A rectangular room measures 8 cm by 5 cm on a plan with scale \\(1:60\\). What is the real area of the room, in square metres?",
    "options": [
      {
        "text": "0.24 m²",
        "correct": false,
        "feedback": "Found the area on the plan, \\(8 \\times 5 = 40\\text{ cm}^2\\), and multiplied by 60 to get \\(2400\\text{ cm}^2 = 0.24\\text{ m}^2\\). Both lengths are multiplied by 60, so the area is multiplied by \\(60 \\times 60\\)."
      },
      {
        "text": "144 m²",
        "correct": false,
        "feedback": "Found the real area, \\(480 \\times 300 = 144\\,000\\text{ cm}^2\\), and divided by 1000 to get 144 m². There are \\(100 \\times 100 = 10\\,000\\text{ cm}^2\\) in 1 m²."
      },
      {
        "text": "14.4 m²",
        "correct": true,
        "feedback": "Correct. Real lengths: \\(8 \\times 60 = 480\\text{ cm} = 4.8\\text{ m}\\) and \\(5 \\times 60 = 300\\text{ cm} = 3\\text{ m}\\). Area = \\(4.8 \\times 3 = 14.4\\text{ m}^2\\)."
      },
      {
        "text": "1.44 m²",
        "correct": false,
        "feedback": "Found the real area, \\(480 \\times 300 = 144\\,000\\text{ cm}^2\\), and divided by 100 000 to get 1.44 m². There are \\(100 \\times 100 = 10\\,000\\text{ cm}^2\\) in 1 m²."
      }
    ],
    "backward": "Area and converting units, Ch7.",
    "forward": "Later in this chapter you compare lengths in enlargements."
  },
  {
    "itemId": "d22",
    "order": 22,
    "cluster": "C5",
    "clusterName": "Rotations and enlargements",
    "question": "The point P\\((5, 2)\\) is rotated 90° anticlockwise about the point C\\((1, 2)\\). The image is then enlarged by scale factor \\(\\frac{1}{2}\\) with centre the origin. What are the coordinates of the final image?",
    "options": [
      {
        "text": "\\((2, 3.5)\\)",
        "correct": false,
        "feedback": "Did the transformations in the wrong order: enlarging first gives \\((2.5, 1)\\), and rotating that 90° anticlockwise about C gives \\((2, 3.5)\\). Rotate first, then enlarge."
      },
      {
        "text": "\\((0.5, -1)\\)",
        "correct": false,
        "feedback": "Rotated clockwise instead of anticlockwise: P goes to \\((1, -2)\\), and halving gives \\((0.5, -1)\\). The question says anticlockwise."
      },
      {
        "text": "\\((0.5, 3)\\)",
        "correct": true,
        "feedback": "Correct. P is 4 right of C, so rotating 90° anticlockwise puts the image 4 above C: \\((1, 2 + 4) = (1, 6)\\). Enlarging from the origin by \\(\\frac{1}{2}\\) halves both coordinates: \\((0.5, 3)\\)."
      },
      {
        "text": "\\((1, 6)\\)",
        "correct": false,
        "feedback": "Rotated P to \\((1, 6)\\) but did not enlarge it. Both transformations are needed."
      }
    ],
    "backward": "Coordinates and fractions of an amount, Ch10 and Ch8.",
    "forward": "Later in this chapter you describe combined transformations."
  },
  {
    "itemId": "d23",
    "order": 23,
    "cluster": "C3",
    "clusterName": "Points on a line segment",
    "question": "A is the point \\((-3, 4)\\) and B is the point \\((5, 0)\\). P lies on AB so that \\(\\mathrm{AP}:\\mathrm{PB} = 1:3\\). Q is the midpoint of AP. What are the coordinates of Q?",
    "options": [
      {
        "text": "\\((-2, 3.5)\\)",
        "correct": true,
        "feedback": "Correct. AP is 1 of the \\(1 + 3 = 4\\) equal parts of AB. The step from A to B is \\((8, -4)\\), so AP = \\(\\frac{1}{4}\\) of it = \\((2, -1)\\) and P = \\((-3 + 2, 4 - 1) = (-1, 3)\\). Q is halfway between A and P: \\(((-3 + (-1)) \\div 2, (4 + 3) \\div 2) = (-2, 3.5)\\)."
      },
      {
        "text": "\\((1, 2)\\)",
        "correct": false,
        "feedback": "Found the midpoint of AB, \\((1, 2)\\). Q is the midpoint of AP, not of AB."
      },
      {
        "text": "\\((2, 1.5)\\)",
        "correct": false,
        "feedback": "Found the midpoint of P and B, \\(((-1 + 5) \\div 2, (3 + 0) \\div 2) = (2, 1.5)\\). Q is the midpoint of A and P."
      },
      {
        "text": "\\((-1, 3)\\)",
        "correct": false,
        "feedback": "Found P, \\((-1, 3)\\), but not the midpoint of AP. The question asks for Q."
      }
    ],
    "backward": "Fractions and midpoints, Ch8 and Ch10.",
    "forward": "Later in this chapter you use points on a line in other problems."
  },
  {
    "itemId": "d24",
    "order": 24,
    "cluster": "C5",
    "clusterName": "Rotations and enlargements",
    "question": "A is the point \\((2, 1)\\) and B is the point \\((6, 5)\\). Both are enlarged by scale factor 2 from the origin to give A′ and B′. The point P lies on A′B′ so that \\(\\mathrm{A'P}:\\mathrm{PB'} = 1:3\\). What are the coordinates of P?",
    "options": [
      {
        "text": "\\((3, 2)\\)",
        "correct": false,
        "feedback": "Found the point on AB, not on A′B′: A plus \\(\\frac{1}{4}\\) of \\((4, 4)\\) is \\((2 + 1, 1 + 1) = (3, 2)\\). The question asks for the point on A′B′."
      },
      {
        "text": "\\((8, 6)\\)",
        "correct": false,
        "feedback": "Used the midpoint of A′ and B′, \\((8, 6)\\). A ratio of \\(1:3\\) is not an equal split."
      },
      {
        "text": "\\((10, 8)\\)",
        "correct": false,
        "feedback": "Used \\(\\frac{3}{4}\\) of the way instead of \\(\\frac{1}{4}\\): \\(\\frac{3}{4}\\) of \\((8, 8)\\) is \\((6, 6)\\), giving \\((4 + 6, 2 + 6) = (10, 8)\\). A′P is the part with 1 share."
      },
      {
        "text": "\\((6, 4)\\)",
        "correct": true,
        "feedback": "Correct. A′ = \\((4, 2)\\) and B′ = \\((12, 10)\\). The step from A′ to B′ is \\((8, 8)\\), so A′P = \\(\\frac{1}{4}\\) of it = \\((2, 2)\\). P = \\((4 + 2, 2 + 2) = (6, 4)\\)."
      }
    ],
    "backward": "Coordinates and ratio, Ch10 and Ch11.",
    "forward": "Later in this chapter you combine enlargements with points on a line."
  }
];

const recheckItems = [
  {
    "itemId": "r1",
    "order": 1,
    "cluster": "C1",
    "clusterName": "Bearings",
    "question": "B is due east of A. The bearing of C from B is 330°. What is the size of angle ABC?",
    "options": [
      {
        "text": "30°",
        "correct": false,
        "feedback": "Used \\(360^\\circ - 330^\\circ = 30^\\circ\\), the angle from C round to due north. Angle ABC is the angle between BA, due west, and BC."
      },
      {
        "text": "120°",
        "correct": false,
        "feedback": "Found \\(180^\\circ - 60^\\circ = 120^\\circ\\). Angle ABC is the angle between BA and BC, which is 60°."
      },
      {
        "text": "150°",
        "correct": false,
        "feedback": "Used \\(330^\\circ - 180^\\circ = 150^\\circ\\), measuring from due south. BA points due west, 270°, so the angle is 60°."
      },
      {
        "text": "60°",
        "correct": true,
        "feedback": "Correct. From B, A is due west, a bearing of 270°. The bearing of C is 330°, so angle ABC = \\(330^\\circ - 270^\\circ = 60^\\circ\\)."
      }
    ],
    "backward": "Angles on a straight line, Ch5.",
    "forward": "Later in this chapter you use angles like this on scale drawings."
  },
  {
    "itemId": "r2",
    "order": 2,
    "cluster": "C2",
    "clusterName": "Scale drawings",
    "question": "A map has a scale of \\(1:25\\,000\\). Two villages are 4.5 km apart in real life. How far apart are they on the map, in centimetres?",
    "options": [
      {
        "text": "180 cm",
        "correct": false,
        "feedback": "Changed 4.5 km into 4 500 000 cm instead of 450 000 cm, so \\(4\\,500\\,000 \\div 25\\,000 = 180\\text{ cm}\\). There are 100 000 cm in 1 km."
      },
      {
        "text": "112 500 cm",
        "correct": false,
        "feedback": "Multiplied \\(4.5 \\times 25\\,000\\) to get 112 500 cm instead of changing to centimetres and dividing. A map length is smaller than the real length, so divide by the scale."
      },
      {
        "text": "1.8 cm",
        "correct": false,
        "feedback": "Changed 4.5 km into 45 000 cm instead of 450 000 cm, so \\(45\\,000 \\div 25\\,000 = 1.8\\text{ cm}\\). There are 100 000 cm in 1 km."
      },
      {
        "text": "18 cm",
        "correct": true,
        "feedback": "Correct. \\(4.5\\text{ km} = 450\\,000\\text{ cm}\\). On the map: \\(450\\,000 \\div 25\\,000 = 18\\text{ cm}\\)."
      }
    ],
    "backward": "Converting kilometres to centimetres, Ch7.",
    "forward": "Later in this chapter you use scales in both directions."
  },
  {
    "itemId": "r3",
    "order": 3,
    "cluster": "C6",
    "clusterName": "Mixed position and transformation problems",
    "question": "A is the point \\((2, -1)\\) and B is the point \\((14, 7)\\). P lies on AB so that \\(\\mathrm{AP}:\\mathrm{PB} = 3:1\\). What are the coordinates of P?",
    "options": [
      {
        "text": "\\((11, -1)\\)",
        "correct": false,
        "feedback": "Added \\(\\frac{3}{4}\\) of the horizontal step, 9, to the x-coordinate, \\(2 + 9 = 11\\), but left \\(y = -1\\), giving \\((11, -1)\\). Both coordinates change: \\(-1 + 6 = 5\\)."
      },
      {
        "text": "\\((11, 5)\\)",
        "correct": true,
        "feedback": "Correct. AP is 3 of the \\(3 + 1 = 4\\) equal parts of AB. The step from A to B is \\((12, 8)\\), so AP = \\(\\frac{3}{4}\\) of it = \\((9, 6)\\). P = \\((2 + 9, -1 + 6) = (11, 5)\\)."
      },
      {
        "text": "\\((5, 1)\\)",
        "correct": false,
        "feedback": "Used \\(\\frac{1}{4}\\) of the way instead of \\(\\frac{3}{4}\\): \\(\\frac{1}{4}\\) of \\((12, 8)\\) is \\((3, 2)\\), giving \\((2 + 3, -1 + 2) = (5, 1)\\). AP is the part with 3 shares."
      },
      {
        "text": "\\((8, 3)\\)",
        "correct": false,
        "feedback": "Found the midpoint, \\((8, 3)\\). A ratio of \\(3:1\\) is not an equal split."
      }
    ],
    "backward": "Fractions of an amount, Ch8, and ratio, Ch11.",
    "forward": "Later in this chapter you combine points on a line with other transformations."
  },
  {
    "itemId": "r4",
    "order": 4,
    "cluster": "C4",
    "clusterName": "Translations and reflections",
    "question": "The point P\\((-3, 1)\\) is reflected in the x-axis. The image is then translated by the column vector \\(\\begin{pmatrix}5\\\\2\\end{pmatrix}\\). What are the coordinates of the final image?",
    "options": [
      {
        "text": "\\((2, -3)\\)",
        "correct": false,
        "feedback": "Did the transformations in the wrong order: translating first gives \\((2, 3)\\), and reflecting that in the x-axis gives \\((2, -3)\\). Reflect first, then translate."
      },
      {
        "text": "\\((2, 1)\\)",
        "correct": true,
        "feedback": "Correct. Reflect in the x-axis by changing the sign of y: \\((-3, 1)\\) becomes \\((-3, -1)\\). Then add the vector: \\((-3 + 5, -1 + 2) = (2, 1)\\)."
      },
      {
        "text": "\\((2, 3)\\)",
        "correct": false,
        "feedback": "Translated P to \\((2, 3)\\) but did not reflect it. Both transformations are needed."
      },
      {
        "text": "\\((8, 3)\\)",
        "correct": false,
        "feedback": "Reflected in the y-axis instead of the x-axis, giving \\((3, 1)\\), and then translated it to \\((8, 3)\\). Reflection in the x-axis changes the sign of y."
      }
    ],
    "backward": "Negative coordinates, Ch10.",
    "forward": "Later in this chapter you describe a reflection followed by a translation."
  },
  {
    "itemId": "r5",
    "order": 5,
    "cluster": "C5",
    "clusterName": "Rotations and enlargements",
    "question": "The point A\\((12, 4)\\) is enlarged by scale factor \\(\\frac{1}{2}\\) with centre \\((2, 0)\\). The image is then rotated 90° clockwise about \\((2, 0)\\). What are the coordinates of the final image?",
    "options": [
      {
        "text": "\\((4, -5)\\)",
        "correct": true,
        "feedback": "Correct. A is 10 right and 4 up from the centre \\((2, 0)\\). Halving gives 5 right and 2 up. A 90° clockwise turn about the centre sends this to 2 right and 5 down. The final image is \\((2 + 2, 0 - 5) = (4, -5)\\)."
      },
      {
        "text": "\\((2, -7)\\)",
        "correct": false,
        "feedback": "Rotated about the origin instead of about \\((2, 0)\\), so \\((7, 2)\\) goes to \\((2, -7)\\). The centre of rotation here is \\((2, 0)\\)."
      },
      {
        "text": "\\((4, -4)\\)",
        "correct": false,
        "feedback": "Enlarged from the origin instead of from the centre \\((2, 0)\\), giving \\((6, 2)\\), and then rotated it to \\((4, -4)\\). The centre of enlargement here is \\((2, 0)\\)."
      },
      {
        "text": "\\((7, 2)\\)",
        "correct": false,
        "feedback": "Enlarged A to \\((7, 2)\\) but did not rotate it. Both transformations are needed."
      }
    ],
    "backward": "Coordinates and fractions of an amount, Ch10 and Ch8.",
    "forward": "Later in this chapter you describe combined transformations."
  },
  {
    "itemId": "r6",
    "order": 6,
    "cluster": "C6",
    "clusterName": "Mixed position and transformation problems",
    "question": "A map has scale \\(1:50\\,000\\) and is drawn on a grid with 1 square = 1 cm. A is the point \\((1, 2)\\) and B is the point \\((9, 6)\\). M is the midpoint of AB. How far east of A is M in real life, in kilometres?",
    "options": [
      {
        "text": "2.5 km",
        "correct": false,
        "feedback": "Used the x-coordinate of M, 5 cm, instead of the distance from A, giving \\(5 \\times 50\\,000 = 250\\,000\\text{ cm} = 2.5\\text{ km}\\). The distance east of A is \\(5 - 1 = 4\\text{ cm}\\)."
      },
      {
        "text": "4 km",
        "correct": false,
        "feedback": "Used the full distance across from A to B, \\(9 - 1 = 8\\text{ cm}\\), giving \\(8 \\times 50\\,000 = 400\\,000\\text{ cm} = 4\\text{ km}\\). M is only halfway, 4 cm across."
      },
      {
        "text": "2 km",
        "correct": true,
        "feedback": "Correct. The midpoint is \\(((1 + 9) \\div 2, (2 + 6) \\div 2) = (5, 4)\\). M is \\(5 - 1 = 4\\text{ cm}\\) east of A on the map. Real distance = \\(4 \\times 50\\,000 = 200\\,000\\text{ cm} = 2\\text{ km}\\)."
      },
      {
        "text": "20 km",
        "correct": false,
        "feedback": "Changed 200 000 cm into kilometres by dividing by 10 000, giving 20 km. There are 100 000 cm in 1 km."
      }
    ],
    "backward": "Coordinates, Ch10, and converting units, Ch7.",
    "forward": "Later in this chapter you use scales and coordinates together."
  },
  {
    "itemId": "r7",
    "order": 7,
    "cluster": "C1",
    "clusterName": "Bearings",
    "question": "B is 6 km due north of A. C is 6 km due west of B. What is the bearing of A from C?",
    "options": [
      {
        "text": "135°",
        "correct": true,
        "feedback": "Correct. The two legs are equal, so C is north-west of A, a bearing of 315° from A. The bearing of A from C is the back bearing: \\(315^\\circ - 180^\\circ = 135^\\circ\\)."
      },
      {
        "text": "315°",
        "correct": false,
        "feedback": "Gave the bearing of C from A, 315°. The question asks for the bearing of A from C, a half turn different."
      },
      {
        "text": "225°",
        "correct": false,
        "feedback": "Used 225°, the bearing of south-west. From C, A lies to the south-east, not the south-west."
      },
      {
        "text": "045°",
        "correct": false,
        "feedback": "Used 045°, the bearing of north-east. From C, A lies to the south-east, not the north-east."
      }
    ],
    "backward": "Isosceles right-angled triangles and angles, Ch5.",
    "forward": "Later in this chapter you draw journeys like this on scale drawings."
  },
  {
    "itemId": "r8",
    "order": 8,
    "cluster": "C2",
    "clusterName": "Scale drawings",
    "question": "A model railway carriage is made to a scale of \\(1:76\\). The real carriage is 19 m long. How long is the model, in centimetres?",
    "options": [
      {
        "text": "0.25 cm",
        "correct": false,
        "feedback": "Divided \\(19 \\div 76\\) to get 0.25 cm without changing metres to centimetres. \\(19\\text{ m} = 1900\\text{ cm}\\)."
      },
      {
        "text": "1444 cm",
        "correct": false,
        "feedback": "Multiplied \\(19 \\times 76\\) to get 1444 cm instead of dividing. A model is smaller than the real carriage, so divide by the scale after changing metres to centimetres."
      },
      {
        "text": "25 cm",
        "correct": true,
        "feedback": "Correct. \\(19\\text{ m} = 1900\\text{ cm}\\). Divide by the scale: \\(1900 \\div 76 = 25\\text{ cm}\\)."
      },
      {
        "text": "2.5 cm",
        "correct": false,
        "feedback": "Used \\(19\\text{ m} = 190\\text{ cm}\\) instead of 1900 cm, so \\(190 \\div 76 = 2.5\\text{ cm}\\). There are 100 cm in 1 m."
      }
    ],
    "backward": "Converting metres to centimetres, Ch7.",
    "forward": "Later in this chapter you use scales in both directions."
  },
  {
    "itemId": "r9",
    "order": 9,
    "cluster": "C3",
    "clusterName": "Points on a line segment",
    "question": "A is the point \\((-4, 5)\\) and B is the point \\((2, -1)\\). M is the midpoint of AB. P lies on MB so that \\(\\mathrm{MP}:\\mathrm{PB} = 1:2\\). What are the coordinates of P?",
    "options": [
      {
        "text": "\\((3, -3)\\)",
        "correct": false,
        "feedback": "Found the step from M to B, \\((3, -3)\\), and stopped. P is a third of that step away from M."
      },
      {
        "text": "\\((1, 0)\\)",
        "correct": false,
        "feedback": "Used \\(\\frac{2}{3}\\) of the way from M to B instead of \\(\\frac{1}{3}\\): \\(\\frac{2}{3}\\) of \\((3, -3)\\) is \\((2, -2)\\), giving \\((-1 + 2, 2 - 2) = (1, 0)\\). MP is the part with 1 share."
      },
      {
        "text": "\\((0.5, 0.5)\\)",
        "correct": false,
        "feedback": "Found the midpoint of M and B, \\(((-1 + 2) \\div 2, (2 + (-1)) \\div 2) = (0.5, 0.5)\\). A ratio of \\(1:2\\) is not an equal split."
      },
      {
        "text": "\\((0, 1)\\)",
        "correct": true,
        "feedback": "Correct. M = \\(((-4 + 2) \\div 2, (5 + (-1)) \\div 2) = (-1, 2)\\). The step from M to B is \\((2 - (-1), -1 - 2) = (3, -3)\\). MP is 1 of the \\(1 + 2 = 3\\) equal parts, so MP = \\((1, -1)\\) and P = \\((-1 + 1, 2 + (-1)) = (0, 1)\\)."
      }
    ],
    "backward": "Fractions of an amount and midpoints, Ch8 and Ch10.",
    "forward": "Later in this chapter you use points on a line in other problems."
  },
  {
    "itemId": "r10",
    "order": 10,
    "cluster": "C4",
    "clusterName": "Translations and reflections",
    "question": "The point P\\((-4, 3)\\) is reflected in the line \\(y = -1\\). The image is then translated by the column vector \\(\\begin{pmatrix}6\\\\0\\end{pmatrix}\\). What are the coordinates of the final image?",
    "options": [
      {
        "text": "\\((2, 3)\\)",
        "correct": false,
        "feedback": "Translated P to \\((2, 3)\\) but did not reflect it. Both transformations are needed."
      },
      {
        "text": "\\((2, -3)\\)",
        "correct": false,
        "feedback": "Reflected P in the x-axis, giving \\((-4, -3)\\), and then translated it to \\((2, -3)\\). The mirror line is \\(y = -1\\), so measure the distance from that line."
      },
      {
        "text": "\\((2, -5)\\)",
        "correct": true,
        "feedback": "Correct. P is \\(3 - (-1) = 4\\) above the line \\(y = -1\\), so its reflection is 4 below it: \\(-1 - 4 = -5\\), giving \\((-4, -5)\\). Translate: \\((-4 + 6, -5 + 0) = (2, -5)\\)."
      },
      {
        "text": "\\((2, -1)\\)",
        "correct": false,
        "feedback": "Placed the reflection on the mirror line, \\((-4, -1)\\), and then translated it to \\((2, -1)\\). The image is the same distance on the other side of the line, 4 below it."
      }
    ],
    "backward": "Equations of lines and coordinates, Ch10.",
    "forward": "Later in this chapter you describe a reflection by its mirror line."
  },
  {
    "itemId": "r11",
    "order": 11,
    "cluster": "C5",
    "clusterName": "Rotations and enlargements",
    "question": "The point A\\((3, 3)\\) is enlarged by scale factor 3 to give A′\\((7, 5)\\). What are the coordinates of the centre of enlargement?",
    "options": [
      {
        "text": "\\((4, 2)\\)",
        "correct": false,
        "feedback": "Used the movement from A to A′, \\((7 - 3, 5 - 3) = (4, 2)\\). The centre is the fixed point the enlargement stretches away from."
      },
      {
        "text": "\\((1, 2)\\)",
        "correct": true,
        "feedback": "Correct. A′ is three times as far from the centre as A is, so the centre is \\((3 \\times A - A') \\div 2\\): \\(((3 \\times 3 - 7) \\div 2, (3 \\times 3 - 5) \\div 2) = (1, 2)\\). Check: A is 2 right and 1 up from \\((1, 2)\\), and A′ is 6 right and 3 up from it."
      },
      {
        "text": "\\((2, 4)\\)",
        "correct": false,
        "feedback": "Worked out \\(3 \\times A - A' = (3 \\times 3 - 7, 3 \\times 3 - 5) = (2, 4)\\) but did not divide by 2. The centre is \\((2, 4) \\div 2 = (1, 2)\\)."
      },
      {
        "text": "\\((5, 4)\\)",
        "correct": false,
        "feedback": "Gave the midpoint of A and A′, \\((5, 4)\\). The centre is the point from which A′ is three times as far as A."
      }
    ],
    "backward": "Coordinates and scale factors, Ch10 and Ch11.",
    "forward": "Later in this chapter you describe an enlargement by its centre and scale factor."
  },
  {
    "itemId": "r12",
    "order": 12,
    "cluster": "C6",
    "clusterName": "Mixed position and transformation problems",
    "question": "On a map with scale \\(1:20\\,000\\), B is 9 cm from A on a bearing of 270°. The point P lies on AB so that \\(\\mathrm{AP}:\\mathrm{PB} = 2:1\\). What is the real distance from A to P, and what is the bearing of A from P?",
    "options": [
      {
        "text": "1.2 km, 090°",
        "correct": true,
        "feedback": "Correct. AP is 2 of the \\(2 + 1 = 3\\) equal parts of the 9 cm, so AP = 6 cm on the map. Real distance = \\(6 \\times 20\\,000 = 120\\,000\\text{ cm} = 1.2\\text{ km}\\). P is due west of A, so the bearing of A from P is the back bearing: \\(270^\\circ - 180^\\circ = 90^\\circ\\), written 090°."
      },
      {
        "text": "1.8 km, 090°",
        "correct": false,
        "feedback": "Used the whole distance AB, \\(9 \\times 20\\,000 = 180\\,000\\text{ cm} = 1.8\\text{ km}\\), giving 1.8 km, 090°. AP is only \\(\\frac{2}{3}\\) of AB."
      },
      {
        "text": "0.6 km, 090°",
        "correct": false,
        "feedback": "Found the distance of PB, \\(3 \\times 20\\,000 = 60\\,000\\text{ cm} = 0.6\\text{ km}\\), instead of AP, giving 0.6 km, 090°. AP is the part with 2 shares."
      },
      {
        "text": "1.2 km, 270°",
        "correct": false,
        "feedback": "Found the distance correctly but gave the bearing of P from A, 270°, giving 1.2 km, 270°. The question asks for the bearing of A from P, a half turn different."
      }
    ],
    "backward": "Ratio and scale, Ch11, and angles on a straight line, Ch5.",
    "forward": "Later problems in this chapter place points on a plan using a distance and a bearing."
  }
];

function buildDocs(phase, items) {
  return items.map((item) => ({ grade: GRADE, chapterSlug: CHAPTER_SLUG, chapterName: CHAPTER_NAME, level: LEVEL, phase, ...item }));
}

const allQuestions = [
  ...buildDocs('warmup', warmupItems),
  ...buildDocs('diagnostic', diagnosticItems),
  ...buildDocs('recheck', recheckItems)
];

const chapterDocs = [{
  grade: GRADE,
  gradeLabel: GRADE_LABEL,
  chapterSlug: CHAPTER_SLUG,
  chapterName: CHAPTER_NAME,
  level: LEVEL,
  title: "Position and Transformation — Problem-Solving & Synthesis",
  subtitle: "Grade 8 · Level 3 · Problem-Solving & Synthesis",
  description: "Synthesis items combining bearings, scale drawings, ratio on a line and combined transformations — warm-up, diagnostic, and spaced recheck for synthesis-level fluency.",
  clusterNames: CLUSTER_NAMES,
  gateReviewHTML: "<p><strong>Warm-up done.</strong> Next comes the diagnostic. It is not a test and it is not timed, so there is no prize for speed. In this level many questions bring two topics together, for example a bearing with a scale, a reflection followed by a translation, or a ratio on a line followed by an enlargement. Work out the first part, write the result down, and only then do the second part. If a question feels awkward, that tells us exactly where to look next, so it is useful, not a failure.</p><p>You will meet all six topics, mixed together. Take your time.</p>",
  timedSeconds: 0
}];

async function run() {
  await mongoose.connect(process.env.DATABASE);
  const filter = { grade: GRADE, chapterSlug: CHAPTER_SLUG, level: LEVEL };
  await MathChapter.deleteMany(filter);
  await MathQuestion.deleteMany(filter);
  await MathChapter.insertMany(chapterDocs);
  const inserted = await MathQuestion.insertMany(allQuestions);
  console.log(`Seeded ${CHAPTER_NAME} L${LEVEL}: ${inserted.length} questions (${warmupItems.length} warm-up, ${diagnosticItems.length} diagnostic, ${recheckItems.length} recheck)`);
  await mongoose.disconnect();
}

run().catch(err => { console.error('Seed failed:', err); process.exit(1); });

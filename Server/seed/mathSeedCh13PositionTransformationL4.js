// Position and Transformation — Grade 8, Level 4 (Speed & Strategy).
// Warm-up, diagnostic and spaced recheck items.
// Run with: node seed/mathSeedCh13PositionTransformationL4.js
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-8";
const GRADE_LABEL = "Grade 8";
const CHAPTER_SLUG = "ch-13-position-transformation";
const CHAPTER_NAME = "Position and Transformation";
const LEVEL = 4;

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
    "cluster": "C1",
    "clusterName": "Bearings",
    "tier": "S",
    "question": "The bearing of Q from P is 150°. What is the bearing of P from Q?",
    "options": [
      {
        "text": "030°",
        "correct": false,
        "feedback": "Subtracted from 180° instead, \\(180^\\circ - 150^\\circ = 30^\\circ\\), giving 030°. The back bearing is found by adding or subtracting 180° from the bearing."
      },
      {
        "text": "210°",
        "correct": false,
        "feedback": "Subtracted from 360° instead, \\(360^\\circ - 150^\\circ = 210^\\circ\\), giving 210°. The back bearing is found by adding or subtracting 180° from the bearing."
      },
      {
        "text": "150°",
        "correct": false,
        "feedback": "Gave the same bearing again, 150°. The bearing of P from Q is a half turn different from the bearing of Q from P."
      },
      {
        "text": "330°",
        "correct": true,
        "feedback": "Correct. 150° is less than 180°, so add 180°: \\(150^\\circ + 180^\\circ = 330^\\circ\\)."
      }
    ],
    "retryHint": "Add or subtract 180° from the bearing.",
    "backward": "Angles on a straight line, Ch5.",
    "forward": "Later in this chapter you use back bearings in journeys."
  },
  {
    "itemId": "w2",
    "order": 2,
    "cluster": "C4",
    "clusterName": "Translations and reflections",
    "tier": "S",
    "question": "The point \\((3, -2)\\) is translated by the column vector \\(\\begin{pmatrix}-5\\\\4\\end{pmatrix}\\). What are the coordinates of the image?",
    "options": [
      {
        "text": "\\((-2, -6)\\)",
        "correct": false,
        "feedback": "Subtracted 4 from the y-coordinate, \\(-2 - 4 = -6\\), giving \\((-2, -6)\\). The bottom entry is \\(+4\\), so move 4 up."
      },
      {
        "text": "\\((-2, 2)\\)",
        "correct": true,
        "feedback": "Correct. Add the vector: \\((3 + (-5), -2 + 4) = (-2, 2)\\)."
      },
      {
        "text": "\\((8, -6)\\)",
        "correct": false,
        "feedback": "Used the reverse vector, \\(\\begin{pmatrix}5\\\\-4\\end{pmatrix}\\): \\((3 + 5, -2 - 4) = (8, -6)\\). The vector \\(\\begin{pmatrix}-5\\\\4\\end{pmatrix}\\) means 5 left and 4 up."
      },
      {
        "text": "\\((8, 2)\\)",
        "correct": false,
        "feedback": "Added 5 instead of \\(-5\\) to the x-coordinate, \\(3 + 5 = 8\\), giving \\((8, 2)\\). The top entry is \\(-5\\), so move 5 left."
      }
    ],
    "retryHint": "Add the top entry to x and the bottom entry to y.",
    "backward": "Negative numbers and coordinates, Ch10.",
    "forward": "Later in this chapter you find a vector from a point and its image."
  },
  {
    "itemId": "w3",
    "order": 3,
    "cluster": "C2",
    "clusterName": "Scale drawings",
    "tier": "C",
    "question": "A map has a scale of \\(1:200\\,000\\). Two towns are 4.5 cm apart on the map. How far apart are they in real life, in kilometres?",
    "options": [
      {
        "text": "900 km",
        "correct": false,
        "feedback": "Found \\(4.5 \\times 200\\,000 = 900\\,000\\) and divided by 1000, giving 900 km. The 900 000 is in centimetres; divide by 100 000 to get kilometres."
      },
      {
        "text": "90 km",
        "correct": false,
        "feedback": "Divided 900 000 cm by 10 000 instead of 100 000, giving 90 km. There are 100 000 cm in 1 km."
      },
      {
        "text": "9 km",
        "correct": true,
        "feedback": "Correct. \\(4.5 \\times 200\\,000 = 900\\,000\\text{ cm}\\). There are 100 000 cm in 1 km, so \\(900\\,000 \\div 100\\,000 = 9\\text{ km}\\)."
      },
      {
        "text": "0.9 km",
        "correct": false,
        "feedback": "Divided 900 000 cm by 1 000 000 instead of 100 000, giving 0.9 km. There are 100 000 cm in 1 km."
      }
    ],
    "retryHint": "Multiply by the scale to get centimetres. Then change centimetres to kilometres.",
    "backward": "Converting centimetres to kilometres, Ch7.",
    "forward": "Later in this chapter you use scales with bearings."
  },
  {
    "itemId": "w4",
    "order": 4,
    "cluster": "C5",
    "clusterName": "Rotations and enlargements",
    "tier": "S",
    "question": "A line of length 60 cm is enlarged by scale factor \\(\\frac{3}{4}\\). What is the length of the image?",
    "options": [
      {
        "text": "80 cm",
        "correct": false,
        "feedback": "Multiplied by \\(\\frac{4}{3}\\) instead, \\(60 \\div 3 \\times 4 = 80\\text{ cm}\\). A scale factor less than 1 makes the shape smaller."
      },
      {
        "text": "57 cm",
        "correct": false,
        "feedback": "Subtracted 3 from the length, \\(60 - 3 = 57\\text{ cm}\\). An enlargement multiplies lengths by the scale factor; it does not subtract."
      },
      {
        "text": "15 cm",
        "correct": false,
        "feedback": "Divided by 4 but forgot to multiply by 3, \\(60 \\div 4 = 15\\text{ cm}\\). Three quarters of 60 is \\(60 \\div 4 \\times 3\\)."
      },
      {
        "text": "45 cm",
        "correct": true,
        "feedback": "Correct. Every length is multiplied by the scale factor: \\(60 \\div 4 \\times 3 = 45\\text{ cm}\\)."
      }
    ],
    "retryHint": "Multiply the length by the scale factor.",
    "backward": "Fractions of an amount, Ch8.",
    "forward": "Later in this chapter you enlarge shapes on a grid."
  },
  {
    "itemId": "w5",
    "order": 5,
    "cluster": "C3",
    "clusterName": "Points on a line segment",
    "tier": "S",
    "question": "What are the coordinates of the midpoint of \\((-4, 6)\\) and \\((2, 0)\\)?",
    "options": [
      {
        "text": "\\((3, -3)\\)",
        "correct": false,
        "feedback": "Found half the difference instead: \\((2 - (-4)) \\div 2 = 3\\) and \\((0 - 6) \\div 2 = -3\\), giving \\((3, -3)\\). Add the coordinates, then halve."
      },
      {
        "text": "\\((-1, 3)\\)",
        "correct": true,
        "feedback": "Correct. \\(((-4 + 2) \\div 2, (6 + 0) \\div 2) = (-1, 3)\\)."
      },
      {
        "text": "\\((-1, 6)\\)",
        "correct": false,
        "feedback": "Halved the x-sum, \\((-4 + 2) \\div 2 = -1\\), but did not halve the y-sum, giving \\((-1, 6)\\). Both sums are halved."
      },
      {
        "text": "\\((-2, 6)\\)",
        "correct": false,
        "feedback": "Added the coordinates without halving: \\(-4 + 2 = -2\\) and \\(6 + 0 = 6\\), giving \\((-2, 6)\\). The midpoint is half of each sum."
      }
    ],
    "retryHint": "Add the x-coordinates and halve. Do the same for the y-coordinates.",
    "backward": "Reading coordinates, Ch10.",
    "forward": "Later in this chapter you divide lines in other ratios."
  },
  {
    "itemId": "w6",
    "order": 6,
    "cluster": "C6",
    "clusterName": "Mixed position and transformation problems",
    "tier": "H",
    "question": "The point \\((4, 1)\\) is rotated 90° clockwise about the point \\((1, 1)\\). The image is then translated by the column vector \\(\\begin{pmatrix}-3\\\\2\\end{pmatrix}\\). What are the coordinates of the final image?",
    "options": [
      {
        "text": "\\((-2, 0)\\)",
        "correct": true,
        "feedback": "Correct. The point is 3 right of the centre. A quarter-turn clockwise puts the image 3 below the centre: \\((1, 1 - 3) = (1, -2)\\). Translate: \\((1 + (-3), -2 + 2) = (-2, 0)\\)."
      },
      {
        "text": "\\((1, -2)\\)",
        "correct": false,
        "feedback": "Rotated the point to \\((1, -2)\\) but did not translate it. Both transformations are needed."
      },
      {
        "text": "\\((3, 1)\\)",
        "correct": false,
        "feedback": "Did the transformations in the wrong order: translating first gives \\((1, 3)\\), and rotating that 90° clockwise about \\((1, 1)\\) gives \\((3, 1)\\). Rotate first, then translate."
      },
      {
        "text": "\\((-2, 6)\\)",
        "correct": false,
        "feedback": "Rotated anticlockwise instead of clockwise: the image is 3 above the centre, \\((1, 4)\\), and translating gives \\((-2, 6)\\). The question says clockwise."
      }
    ],
    "retryHint": "Rotate first. How far is the point from the centre, and which way does a clockwise quarter-turn move it?",
    "backward": "Coordinates, Ch10.",
    "forward": "Later in this chapter you describe combined transformations."
  },
  {
    "itemId": "w7",
    "order": 7,
    "cluster": "C1",
    "clusterName": "Bearings",
    "tier": "S",
    "question": "What is the three-figure bearing of due south?",
    "options": [
      {
        "text": "000°",
        "correct": false,
        "feedback": "Gave due north, 000°. Due south is half a turn round from north, 180°."
      },
      {
        "text": "090°",
        "correct": false,
        "feedback": "Gave due east, 090°. Due south is the next compass point round, 180°."
      },
      {
        "text": "180°",
        "correct": true,
        "feedback": "Correct. North is 000°, east is 090° and south is 180°. Due south is half a turn from north."
      },
      {
        "text": "270°",
        "correct": false,
        "feedback": "Gave due west, 270°. Due south is 180°, between east (090°) and west (270°)."
      }
    ],
    "retryHint": "North is 000° and east is 090°. Keep turning clockwise.",
    "backward": "Angles around a point, Ch5.",
    "forward": "Later in this chapter you use bearings on scale drawings."
  },
  {
    "itemId": "w8",
    "order": 8,
    "cluster": "C4",
    "clusterName": "Translations and reflections",
    "tier": "T",
    "question": "The point \\((6, 1)\\) is reflected in the line \\(x = 2\\). What are the coordinates of its image?",
    "options": [
      {
        "text": "\\((-2, 1)\\)",
        "correct": true,
        "feedback": "Correct. The point is \\(6 - 2 = 4\\) to the right of the line, so its image is 4 to the left of it: \\(2 - 4 = -2\\). The y-coordinate stays 1."
      },
      {
        "text": "\\((2, 1)\\)",
        "correct": false,
        "feedback": "Placed the image on the mirror line, giving \\((2, 1)\\). The image is the same distance on the other side of the line, not on it."
      },
      {
        "text": "\\((6, 3)\\)",
        "correct": false,
        "feedback": "Reflected in the horizontal line \\(y = 2\\) instead, giving \\((6, 3)\\). The mirror line \\(x = 2\\) is vertical, so only the x-coordinate changes."
      },
      {
        "text": "\\((-6, 1)\\)",
        "correct": false,
        "feedback": "Reflected in the y-axis by changing the sign of x, giving \\((-6, 1)\\). The mirror line is \\(x = 2\\), not the y-axis."
      }
    ],
    "retryHint": "Find how far the point is from the line, then go the same distance on the other side.",
    "backward": "Equations of vertical lines, Ch10.",
    "forward": "Later in this chapter you find mirror lines from a shape and its image."
  }
];

const diagnosticItems = [
  {
    "itemId": "d1",
    "order": 1,
    "cluster": "C1",
    "clusterName": "Bearings",
    "tier": "S",
    "question": "The bearing of B from A is 300°. What is the bearing of A from B?",
    "options": [
      {
        "text": "060°",
        "correct": false,
        "feedback": "Subtracted from 360° instead, \\(360^\\circ - 300^\\circ = 60^\\circ\\), giving 060°. The back bearing is found by adding or subtracting 180° from the bearing."
      },
      {
        "text": "210°",
        "correct": false,
        "feedback": "Subtracted 90° instead, \\(300^\\circ - 90^\\circ = 210^\\circ\\), giving 210°. The back bearing is a half turn different: subtract 180°."
      },
      {
        "text": "120°",
        "correct": true,
        "feedback": "Correct. 300° is more than 180°, so subtract 180°: \\(300^\\circ - 180^\\circ = 120^\\circ\\)."
      },
      {
        "text": "300°",
        "correct": false,
        "feedback": "Gave the same bearing again, 300°. The bearing of A from B is a half turn different."
      }
    ],
    "backward": "Angles on a straight line, Ch5.",
    "forward": "Later in this chapter you use back bearings in journeys."
  },
  {
    "itemId": "d2",
    "order": 2,
    "cluster": "C4",
    "clusterName": "Translations and reflections",
    "tier": "C",
    "question": "The point P\\((2, 5)\\) is reflected in the x-axis. The image is then translated by the column vector \\(\\begin{pmatrix}4\\\\-1\\end{pmatrix}\\). What are the coordinates of the final image?",
    "options": [
      {
        "text": "\\((2, -5)\\)",
        "correct": false,
        "feedback": "Reflected P in the x-axis, \\((2, -5)\\), but did not translate it. Both transformations are needed."
      },
      {
        "text": "\\((6, -6)\\)",
        "correct": true,
        "feedback": "Correct. Reflect in the x-axis: \\((2, 5)\\) becomes \\((2, -5)\\). Add the vector: \\((2 + 4, -5 + (-1)) = (6, -6)\\)."
      },
      {
        "text": "\\((6, 4)\\)",
        "correct": false,
        "feedback": "Translated P to \\((6, 4)\\) but did not reflect it. Both transformations are needed."
      },
      {
        "text": "\\((6, -4)\\)",
        "correct": false,
        "feedback": "Did the transformations in the wrong order: translating first gives \\((6, 4)\\), and reflecting that in the x-axis gives \\((6, -4)\\). Reflect first, then translate."
      }
    ],
    "backward": "Negative coordinates, Ch10.",
    "forward": "Later in this chapter you describe combined transformations."
  },
  {
    "itemId": "d3",
    "order": 3,
    "cluster": "C2",
    "clusterName": "Scale drawings",
    "tier": "S",
    "question": "A plan has a scale of \\(1:500\\). A wall is 9 cm long on the plan. What is its real length, in metres?",
    "options": [
      {
        "text": "45 m",
        "correct": true,
        "feedback": "Correct. \\(9 \\times 500 = 4500\\text{ cm}\\). There are 100 cm in 1 m, so \\(4500 \\div 100 = 45\\text{ m}\\)."
      },
      {
        "text": "4500 m",
        "correct": false,
        "feedback": "Found \\(9 \\times 500 = 4500\\) but left it in centimetres, writing 4500 m. Divide by 100 to change centimetres to metres."
      },
      {
        "text": "4.5 m",
        "correct": false,
        "feedback": "Divided 4500 cm by 1000 instead of 100, giving 4.5 m. There are 100 cm in 1 m."
      },
      {
        "text": "450 m",
        "correct": false,
        "feedback": "Divided 4500 cm by 10 instead of 100, giving 450 m. There are 100 cm in 1 m."
      }
    ],
    "backward": "Converting centimetres to metres, Ch7.",
    "forward": "Later in this chapter you use scales with bearings."
  },
  {
    "itemId": "d4",
    "order": 4,
    "cluster": "C5",
    "clusterName": "Rotations and enlargements",
    "tier": "C",
    "question": "The point A\\((7, 4)\\) is enlarged by scale factor 2 with centre \\((3, 1)\\). What are the coordinates of the image of A?",
    "options": [
      {
        "text": "\\((11, 7)\\)",
        "correct": true,
        "feedback": "Correct. A is 4 right and 3 up from the centre. Doubling gives 8 right and 6 up, so the image is \\((3 + 8, 1 + 6) = (11, 7)\\)."
      },
      {
        "text": "\\((14, 8)\\)",
        "correct": false,
        "feedback": "Enlarged from the origin instead of from the centre \\((3, 1)\\), doubling \\((7, 4)\\) to \\((14, 8)\\). The centre here is \\((3, 1)\\)."
      },
      {
        "text": "\\((8, 6)\\)",
        "correct": false,
        "feedback": "Doubled the movement from the centre, \\((8, 6)\\), but did not add the centre's coordinates back on."
      },
      {
        "text": "\\((11, 4)\\)",
        "correct": false,
        "feedback": "Doubled only the horizontal movement, giving \\((3 + 8, 4) = (11, 4)\\). Both the horizontal and the vertical movements are doubled."
      }
    ],
    "backward": "Coordinates and multiplying, Ch10 and Ch11.",
    "forward": "Later in this chapter you find the centre of enlargement."
  },
  {
    "itemId": "d5",
    "order": 5,
    "cluster": "C6",
    "clusterName": "Mixed position and transformation problems",
    "tier": "T",
    "question": "A is the point \\((0, 0)\\) and B is the point \\((20, 10)\\). P lies on AB so that \\(\\mathrm{AP}:\\mathrm{PB} = 2:3\\). What are the coordinates of P?",
    "options": [
      {
        "text": "\\((10, 5)\\)",
        "correct": false,
        "feedback": "Found the midpoint, \\((10, 5)\\). A ratio of \\(2:3\\) is not an equal split."
      },
      {
        "text": "\\((8, 4)\\)",
        "correct": true,
        "feedback": "Correct. AP is 2 of the \\(2 + 3 = 5\\) equal parts of AB, so P is 2 parts of the way from A to B: \\((20 \\div 5 \\times 2, 10 \\div 5 \\times 2) = (8, 4)\\)."
      },
      {
        "text": "\\((4, 2)\\)",
        "correct": false,
        "feedback": "Found only one share, \\((20 \\div 5, 10 \\div 5) = (4, 2)\\). AP is 2 shares, so double it."
      },
      {
        "text": "\\((12, 6)\\)",
        "correct": false,
        "feedback": "Used 3 parts instead of 2: \\((20 \\div 5 \\times 3, 10 \\div 5 \\times 3) = (12, 6)\\). AP is the part with 2 shares."
      }
    ],
    "backward": "Ratio, Ch11.",
    "forward": "Later in this chapter you use points on a line with other transformations."
  },
  {
    "itemId": "d6",
    "order": 6,
    "cluster": "C6",
    "clusterName": "Mixed position and transformation problems",
    "tier": "C",
    "question": "On a map with scale \\(1:25\\,000\\), B is 8 cm from A on a bearing of 130°. What is the real distance from A to B, and what is the bearing of A from B?",
    "options": [
      {
        "text": "2 km, 050°",
        "correct": false,
        "feedback": "Found the distance correctly but used \\(180^\\circ - 130^\\circ = 50^\\circ\\) for the bearing, giving 2 km, 050°. The back bearing is found by adding 180°: \\(130^\\circ + 180^\\circ = 310^\\circ\\)."
      },
      {
        "text": "0.2 km, 310°",
        "correct": false,
        "feedback": "Found the bearing correctly but changed 200 000 cm into kilometres by dividing by 1 000 000, giving 0.2 km, 310°. There are 100 000 cm in 1 km."
      },
      {
        "text": "2 km, 310°",
        "correct": true,
        "feedback": "Correct. Real distance = \\(8 \\times 25\\,000 = 200\\,000\\text{ cm}\\). There are 100 000 cm in 1 km, so this is 2 km. The bearing of A from B is the back bearing of 130°: \\(130^\\circ + 180^\\circ = 310^\\circ\\)."
      },
      {
        "text": "2 km, 130°",
        "correct": false,
        "feedback": "Found the distance correctly but gave the bearing of B from A, 130°, giving 2 km, 130°. The question asks for the bearing of A from B, a half turn different."
      }
    ],
    "backward": "Ratio and scale, Ch11, and angles on a straight line, Ch5.",
    "forward": "Later in this chapter you place points on a plan using a distance and a bearing."
  },
  {
    "itemId": "d7",
    "order": 7,
    "cluster": "C1",
    "clusterName": "Bearings",
    "tier": "S",
    "question": "Town A is due south of town B. What is the bearing of B from A?",
    "options": [
      {
        "text": "180°",
        "correct": false,
        "feedback": "Gave the bearing of A from B, 180°. The question asks for the bearing of B from A."
      },
      {
        "text": "000°",
        "correct": true,
        "feedback": "Correct. From A, town B lies due north, which is a bearing of 000°."
      },
      {
        "text": "090°",
        "correct": false,
        "feedback": "Gave due east, 090°. Due north is 000°."
      },
      {
        "text": "270°",
        "correct": false,
        "feedback": "Gave due west, 270°. Due north is 000°."
      }
    ],
    "backward": "Angles around a point, Ch5.",
    "forward": "Later in this chapter you use bearings on scale drawings."
  },
  {
    "itemId": "d8",
    "order": 8,
    "cluster": "C4",
    "clusterName": "Translations and reflections",
    "tier": "C",
    "question": "The point P\\((-3, 4)\\) is translated by the column vector \\(\\begin{pmatrix}7\\\\-2\\end{pmatrix}\\). The image is then reflected in the y-axis. What are the coordinates of the final image?",
    "options": [
      {
        "text": "\\((-4, 2)\\)",
        "correct": true,
        "feedback": "Correct. Translate: \\((-3 + 7, 4 + (-2)) = (4, 2)\\). Reflect in the y-axis by changing the sign of x: \\((-4, 2)\\)."
      },
      {
        "text": "\\((4, 2)\\)",
        "correct": false,
        "feedback": "Translated P to \\((4, 2)\\) but did not reflect it. Both transformations are needed."
      },
      {
        "text": "\\((-4, 6)\\)",
        "correct": false,
        "feedback": "Added 2 instead of \\(-2\\) to the y-coordinate, \\(4 + 2 = 6\\), giving \\((4, 6)\\), and then reflected it to \\((-4, 6)\\). The bottom entry is \\(-2\\)."
      },
      {
        "text": "\\((10, 2)\\)",
        "correct": false,
        "feedback": "Did the transformations in the wrong order: reflecting first gives \\((3, 4)\\), and translating that gives \\((10, 2)\\). Translate first, then reflect."
      }
    ],
    "backward": "Negative numbers and coordinates, Ch10.",
    "forward": "Later in this chapter you describe combined transformations."
  },
  {
    "itemId": "d9",
    "order": 9,
    "cluster": "C2",
    "clusterName": "Scale drawings",
    "tier": "S",
    "question": "A plan has a scale of \\(1:2000\\). A real length is 60 m. How long is it on the plan, in centimetres?",
    "options": [
      {
        "text": "120 000 cm",
        "correct": false,
        "feedback": "Multiplied \\(60 \\times 2000\\) to get 120 000 cm instead of dividing. A plan length is smaller than the real length, so change to centimetres and divide."
      },
      {
        "text": "30 cm",
        "correct": false,
        "feedback": "Used \\(60\\text{ m} = 60\\,000\\text{ cm}\\) instead of 6000 cm, so \\(60\\,000 \\div 2000 = 30\\text{ cm}\\). There are 100 cm in 1 m."
      },
      {
        "text": "300 cm",
        "correct": false,
        "feedback": "Used \\(60\\text{ m} = 600\\,000\\text{ cm}\\) instead of 6000 cm, so \\(600\\,000 \\div 2000 = 300\\text{ cm}\\). There are 100 cm in 1 m."
      },
      {
        "text": "3 cm",
        "correct": true,
        "feedback": "Correct. \\(60\\text{ m} = 6000\\text{ cm}\\). On the plan: \\(6000 \\div 2000 = 3\\text{ cm}\\)."
      }
    ],
    "backward": "Converting metres to centimetres, Ch7.",
    "forward": "Later in this chapter you use scales in both directions."
  },
  {
    "itemId": "d10",
    "order": 10,
    "cluster": "C5",
    "clusterName": "Rotations and enlargements",
    "tier": "T",
    "question": "The point \\((10, 6)\\) is enlarged by scale factor \\(\\frac{1}{2}\\) with centre \\((2, 0)\\). What are the coordinates of the image?",
    "options": [
      {
        "text": "\\((5, 3)\\)",
        "correct": false,
        "feedback": "Enlarged from the origin instead of from the centre \\((2, 0)\\), halving \\((10, 6)\\) to \\((5, 3)\\). The centre here is \\((2, 0)\\)."
      },
      {
        "text": "\\((6, 3)\\)",
        "correct": true,
        "feedback": "Correct. The point is 8 right and 6 up from the centre. Halving gives 4 right and 3 up, so the image is \\((2 + 4, 0 + 3) = (6, 3)\\)."
      },
      {
        "text": "\\((4, 3)\\)",
        "correct": false,
        "feedback": "Halved the movement from the centre, \\((4, 3)\\), but did not add the centre's coordinates back on."
      },
      {
        "text": "\\((18, 12)\\)",
        "correct": false,
        "feedback": "Used scale factor 2 instead of \\(\\frac{1}{2}\\): the movement becomes \\((16, 12)\\), giving \\((2 + 16, 0 + 12) = (18, 12)\\). A scale factor of \\(\\frac{1}{2}\\) halves the distances."
      }
    ],
    "backward": "Fractions of an amount, Ch8, and coordinates, Ch10.",
    "forward": "Later in this chapter you find the centre of enlargement."
  },
  {
    "itemId": "d11",
    "order": 11,
    "cluster": "C6",
    "clusterName": "Mixed position and transformation problems",
    "tier": "T",
    "question": "A is the point \\((0, 5)\\) and B is the point \\((10, 0)\\). P lies on AB so that \\(\\mathrm{AP}:\\mathrm{PB} = 3:2\\). What are the coordinates of P?",
    "options": [
      {
        "text": "\\((5, 2.5)\\)",
        "correct": false,
        "feedback": "Found the midpoint, \\((5, 2.5)\\). A ratio of \\(3:2\\) is not an equal split."
      },
      {
        "text": "\\((2, 4)\\)",
        "correct": false,
        "feedback": "Found only one share, \\((10 \\div 5, -5 \\div 5) = (2, -1)\\), giving \\((0 + 2, 5 - 1) = (2, 4)\\). AP is 3 shares, so triple it."
      },
      {
        "text": "\\((6, 2)\\)",
        "correct": true,
        "feedback": "Correct. AP is 3 of the \\(3 + 2 = 5\\) equal parts of AB. The step from A to B is \\((10, -5)\\), so AP = \\((10 \\div 5 \\times 3, -5 \\div 5 \\times 3) = (6, -3)\\) and P = \\((0 + 6, 5 - 3) = (6, 2)\\)."
      },
      {
        "text": "\\((4, 3)\\)",
        "correct": false,
        "feedback": "Used 2 parts instead of 3: \\((10 \\div 5 \\times 2, -5 \\div 5 \\times 2) = (4, -2)\\), giving \\((0 + 4, 5 - 2) = (4, 3)\\). AP is the part with 3 shares."
      }
    ],
    "backward": "Ratio, Ch11.",
    "forward": "Later in this chapter you use points on a line with other transformations."
  },
  {
    "itemId": "d12",
    "order": 12,
    "cluster": "C6",
    "clusterName": "Mixed position and transformation problems",
    "tier": "H",
    "question": "A is the point \\((1, 2)\\) and B is the point \\((9, 10)\\). P lies on AB so that \\(\\mathrm{AP}:\\mathrm{PB} = 1:3\\). P is translated by the column vector \\(\\begin{pmatrix}-2\\\\3\\end{pmatrix}\\) and the image is then enlarged by scale factor 2 from the origin. What are the coordinates of the final point?",
    "options": [
      {
        "text": "\\((2, 14)\\)",
        "correct": true,
        "feedback": "Correct. The step from A to B is \\((8, 8)\\), so AP = \\(\\frac{1}{4}\\) of it = \\((2, 2)\\) and P = \\((1 + 2, 2 + 2) = (3, 4)\\). Translate: \\((3 + (-2), 4 + 3) = (1, 7)\\). Enlarge from the origin: \\((1 \\times 2, 7 \\times 2) = (2, 14)\\)."
      },
      {
        "text": "\\((10, 22)\\)",
        "correct": false,
        "feedback": "Used \\(\\frac{3}{4}\\) of the way for P, giving \\((1 + 6, 2 + 6) = (7, 8)\\), then translated and enlarged to \\((10, 22)\\). AP is the part with 1 share, so P is \\(\\frac{1}{4}\\) of the way."
      },
      {
        "text": "\\((4, 11)\\)",
        "correct": false,
        "feedback": "Did the last two steps in the wrong order: enlarging P first gives \\((6, 8)\\), and translating that gives \\((6 - 2, 8 + 3) = (4, 11)\\). Translate first, then enlarge."
      },
      {
        "text": "\\((6, 8)\\)",
        "correct": false,
        "feedback": "Found P, \\((3, 4)\\), and enlarged it, giving \\((6, 8)\\), but missed the translation. All three steps are needed."
      }
    ],
    "backward": "Ratio, Ch11, and coordinates, Ch10.",
    "forward": "Later in this chapter you describe combined transformations."
  },
  {
    "itemId": "d13",
    "order": 13,
    "cluster": "C1",
    "clusterName": "Bearings",
    "tier": "H",
    "question": "B is due south of A and BC = BA. The bearing of C from B is 050°. What is the bearing of A from C?",
    "options": [
      {
        "text": "165°",
        "correct": false,
        "feedback": "Turned anticlockwise instead of clockwise from the back bearing, \\(230^\\circ - 65^\\circ = 165^\\circ\\). A lies further round clockwise, so add 65° to 230°."
      },
      {
        "text": "245°",
        "correct": false,
        "feedback": "Used \\(180^\\circ + 65^\\circ = 245^\\circ\\) as the bearing. The bearing is measured clockwise from north at C, so start from the back bearing, 230°, and add 65°."
      },
      {
        "text": "115°",
        "correct": false,
        "feedback": "Added the angles at B and C, \\(50^\\circ + 65^\\circ = 115^\\circ\\). That is not a bearing from C; start from the back bearing, 230°, and add 65°."
      },
      {
        "text": "295°",
        "correct": true,
        "feedback": "Correct. From B, A is due north (000°), so angle ABC = 50°. BC = BA, so the base angles are equal: angle BCA = \\((180^\\circ - 50^\\circ) \\div 2 = 65^\\circ\\). The bearing of B from C is \\(50^\\circ + 180^\\circ = 230^\\circ\\). A lies 65° further round clockwise, so the bearing of A from C is \\(230^\\circ + 65^\\circ = 295^\\circ\\)."
      }
    ],
    "backward": "Isosceles triangles, Ch5.",
    "forward": "Later in this chapter you draw journeys like this on scale drawings."
  },
  {
    "itemId": "d14",
    "order": 14,
    "cluster": "C4",
    "clusterName": "Translations and reflections",
    "tier": "T",
    "question": "The point \\((-1, 4)\\) is reflected in the line \\(y = x\\). What are the coordinates of its image?",
    "options": [
      {
        "text": "\\((-1, -4)\\)",
        "correct": false,
        "feedback": "Reflected in the x-axis instead, changing the sign of y, giving \\((-1, -4)\\). Reflection in \\(y = x\\) swaps the coordinates."
      },
      {
        "text": "\\((4, -1)\\)",
        "correct": true,
        "feedback": "Correct. Reflecting in the line \\(y = x\\) swaps the coordinates: \\((-1, 4)\\) becomes \\((4, -1)\\)."
      },
      {
        "text": "\\((-4, 1)\\)",
        "correct": false,
        "feedback": "Swapped the coordinates and changed both signs, giving \\((-4, 1)\\). That is a reflection in the line \\(y = -x\\). Reflection in \\(y = x\\) swaps the coordinates without changing signs."
      },
      {
        "text": "\\((1, -4)\\)",
        "correct": false,
        "feedback": "Changed both signs, giving \\((1, -4)\\). That is a half-turn about the origin, not a reflection in \\(y = x\\)."
      }
    ],
    "backward": "Coordinates and equations of lines, Ch10.",
    "forward": "Later in this chapter you describe reflections by their mirror line."
  },
  {
    "itemId": "d15",
    "order": 15,
    "cluster": "C2",
    "clusterName": "Scale drawings",
    "tier": "T",
    "question": "On a map, 1 cm represents 2 km. Two towns are 15 km apart in real life. How far apart are they on the map, in centimetres?",
    "options": [
      {
        "text": "75 cm",
        "correct": false,
        "feedback": "Divided 15 by 0.2 to get 75 cm. One centimetre represents 2 km, not 0.2 km, so \\(15 \\div 2 = 7.5\\)."
      },
      {
        "text": "30 cm",
        "correct": false,
        "feedback": "Multiplied \\(15 \\times 2\\) to get 30 cm instead of dividing. The map distance is smaller than the real distance."
      },
      {
        "text": "17 cm",
        "correct": false,
        "feedback": "Added \\(15 + 2\\) to get 17 cm. Scales are about multiplying or dividing, not adding."
      },
      {
        "text": "7.5 cm",
        "correct": true,
        "feedback": "Correct. Each centimetre on the map is 2 km, so the map distance is \\(15 \\div 2 = 7.5\\text{ cm}\\)."
      }
    ],
    "backward": "Ratio and scale, Ch11.",
    "forward": "Later in this chapter you use scales written as ratios."
  },
  {
    "itemId": "d16",
    "order": 16,
    "cluster": "C5",
    "clusterName": "Rotations and enlargements",
    "tier": "H",
    "question": "The point \\((4, -3)\\) is rotated 90° clockwise about the point \\((1, 1)\\). What are the coordinates of the image?",
    "options": [
      {
        "text": "\\((5, 4)\\)",
        "correct": false,
        "feedback": "Turned anticlockwise instead of clockwise: \\((3, -4)\\) goes to \\((4, 3)\\), so the image is \\((1 + 4, 1 + 3) = (5, 4)\\). The question says clockwise."
      },
      {
        "text": "\\((-3, -4)\\)",
        "correct": false,
        "feedback": "Rotated about the origin instead of about \\((1, 1)\\): \\((4, -3)\\) goes to \\((-3, -4)\\). The centre here is \\((1, 1)\\)."
      },
      {
        "text": "\\((-4, -3)\\)",
        "correct": false,
        "feedback": "Turned the movement from the centre correctly, \\((-4, -3)\\), but did not add the centre's coordinates back on."
      },
      {
        "text": "\\((-3, -2)\\)",
        "correct": true,
        "feedback": "Correct. The point is 3 right and 4 down from the centre: \\((3, -4)\\). A quarter-turn clockwise sends \\((x, y)\\) to \\((y, -x)\\), so \\((3, -4)\\) becomes \\((-4, -3)\\). The image is \\((1 + (-4), 1 + (-3)) = (-3, -2)\\)."
      }
    ],
    "backward": "Coordinates, Ch10.",
    "forward": "Later in this chapter you describe a rotation by its centre, angle and direction."
  },
  {
    "itemId": "d17",
    "order": 17,
    "cluster": "C3",
    "clusterName": "Points on a line segment",
    "tier": "S",
    "question": "What are the coordinates of the midpoint of \\((6, -2)\\) and \\((-4, 8)\\)?",
    "options": [
      {
        "text": "\\((1, 3)\\)",
        "correct": true,
        "feedback": "Correct. \\(((6 + (-4)) \\div 2, (-2 + 8) \\div 2) = (1, 3)\\)."
      },
      {
        "text": "\\((5, -5)\\)",
        "correct": false,
        "feedback": "Found half the difference instead: \\((6 - (-4)) \\div 2 = 5\\) and \\((-2 - 8) \\div 2 = -5\\), giving \\((5, -5)\\). Add the coordinates, then halve."
      },
      {
        "text": "\\((1, 5)\\)",
        "correct": false,
        "feedback": "Halved the x-sum correctly, \\((6 + (-4)) \\div 2 = 1\\), but used half the difference for y, \\((8 - (-2)) \\div 2 = 5\\), giving \\((1, 5)\\). Add the y-coordinates, then halve."
      },
      {
        "text": "\\((2, 6)\\)",
        "correct": false,
        "feedback": "Added the coordinates without halving: \\(6 + (-4) = 2\\) and \\(-2 + 8 = 6\\), giving \\((2, 6)\\). The midpoint is half of each sum."
      }
    ],
    "backward": "Negative numbers and coordinates, Ch10.",
    "forward": "Later in this chapter you divide lines in other ratios."
  },
  {
    "itemId": "d18",
    "order": 18,
    "cluster": "C6",
    "clusterName": "Mixed position and transformation problems",
    "tier": "H",
    "question": "The point P\\((4, 1)\\) is rotated 90° clockwise about the origin. The image is reflected in the line \\(x = 3\\) and then translated by the column vector \\(\\begin{pmatrix}-2\\\\5\\end{pmatrix}\\). What are the coordinates of the final image?",
    "options": [
      {
        "text": "\\((-1, 1)\\)",
        "correct": false,
        "feedback": "Rotated and translated but missed the reflection in \\(x = 3\\): \\((1 + (-2), -4 + 5) = (-1, 1)\\). All three transformations are needed."
      },
      {
        "text": "\\((7, 1)\\)",
        "correct": false,
        "feedback": "Did the last two steps in the wrong order: translating \\((1, -4)\\) first gives \\((-1, 1)\\), and reflecting that in \\(x = 3\\) gives \\((7, 1)\\). Reflect first, then translate."
      },
      {
        "text": "\\((3, 1)\\)",
        "correct": true,
        "feedback": "Correct. Rotate 90° clockwise about the origin, \\((x, y)\\) to \\((y, -x)\\): \\((4, 1)\\) becomes \\((1, -4)\\). The point \\((1, -4)\\) is \\(3 - 1 = 2\\) left of \\(x = 3\\), so its reflection is 2 to the right: \\((5, -4)\\). Translate: \\((5 + (-2), -4 + 5) = (3, 1)\\)."
      },
      {
        "text": "\\((5, 9)\\)",
        "correct": false,
        "feedback": "Rotated anticlockwise instead of clockwise: \\((4, 1)\\) goes to \\((-1, 4)\\), reflecting in \\(x = 3\\) gives \\((7, 4)\\), and translating gives \\((5, 9)\\). The question says clockwise."
      }
    ],
    "backward": "Coordinates and equations of lines, Ch10.",
    "forward": "Later in this chapter you describe combined transformations."
  },
  {
    "itemId": "d19",
    "order": 19,
    "cluster": "C1",
    "clusterName": "Bearings",
    "tier": "S",
    "question": "A ship is sailing on a bearing of 120°. It turns right (clockwise) through 85°. What is its new bearing?",
    "options": [
      {
        "text": "035°",
        "correct": false,
        "feedback": "Turned left instead, \\(120^\\circ - 85^\\circ = 35^\\circ\\), giving 035°. Turning right (clockwise) adds to the bearing."
      },
      {
        "text": "085°",
        "correct": false,
        "feedback": "Gave the size of the turn, 085°, as the new bearing. The new bearing is the old bearing plus the turn."
      },
      {
        "text": "325°",
        "correct": false,
        "feedback": "Subtracted the other way round, \\(85^\\circ - 120^\\circ = -35^\\circ\\), which is 325° after adding 360°. Turning right adds to the bearing."
      },
      {
        "text": "205°",
        "correct": true,
        "feedback": "Correct. Turning clockwise adds to the bearing: \\(120^\\circ + 85^\\circ = 205^\\circ\\)."
      }
    ],
    "backward": "Angles around a point, Ch5.",
    "forward": "Later in this chapter you use bearings in journeys."
  },
  {
    "itemId": "d20",
    "order": 20,
    "cluster": "C4",
    "clusterName": "Translations and reflections",
    "tier": "C",
    "question": "A translation takes A\\((1, 3)\\) to A′\\((5, -1)\\). The same translation takes B to B′\\((2, 6)\\). What are the coordinates of B?",
    "options": [
      {
        "text": "\\((-2, 2)\\)",
        "correct": false,
        "feedback": "Undid the horizontal move correctly, \\(2 - 4 = -2\\), but subtracted 4 instead of \\(-4\\) from the y-coordinate, \\(6 - 4 = 2\\), giving \\((-2, 2)\\). Subtracting \\(-4\\) gives \\(6 + 4 = 10\\)."
      },
      {
        "text": "\\((6, 10)\\)",
        "correct": false,
        "feedback": "Undid the vertical move correctly, \\(6 - (-4) = 10\\), but added 4 to the x-coordinate, \\(2 + 4 = 6\\), giving \\((6, 10)\\). Both coordinates must be undone by subtracting."
      },
      {
        "text": "\\((-2, 10)\\)",
        "correct": true,
        "feedback": "Correct. A moves \\(5 - 1 = 4\\) across and \\(-1 - 3 = -4\\) vertically, so the vector is \\(\\begin{pmatrix}4\\\\-4\\end{pmatrix}\\). To undo it, subtract: B = \\((2 - 4, 6 - (-4)) = (-2, 10)\\)."
      },
      {
        "text": "\\((6, 2)\\)",
        "correct": false,
        "feedback": "Added the vector to B′ instead of undoing it: \\((2 + 4, 6 + (-4)) = (6, 2)\\). B′ was reached by adding the vector, so subtract it to go back."
      }
    ],
    "backward": "Undoing an operation with its inverse, Ch4.",
    "forward": "Later in this chapter you describe translations by column vectors."
  }
];

const recheckItems = [
  {
    "itemId": "r1",
    "order": 1,
    "cluster": "C1",
    "clusterName": "Bearings",
    "question": "The bearing of A from B is 065°. What is the bearing of B from A?",
    "options": [
      {
        "text": "295°",
        "correct": false,
        "feedback": "Subtracted from 360° instead, \\(360^\\circ - 65^\\circ = 295^\\circ\\), giving 295°. The back bearing is found by adding or subtracting 180° from the bearing."
      },
      {
        "text": "115°",
        "correct": false,
        "feedback": "Subtracted from 180° instead, \\(180^\\circ - 65^\\circ = 115^\\circ\\), giving 115°. The back bearing is found by adding or subtracting 180° from the bearing."
      },
      {
        "text": "245°",
        "correct": true,
        "feedback": "Correct. 65° is less than 180°, so add 180°: \\(65^\\circ + 180^\\circ = 245^\\circ\\)."
      },
      {
        "text": "065°",
        "correct": false,
        "feedback": "Gave the same bearing again, 065°. The bearing of B from A is a half turn different."
      }
    ],
    "backward": "Angles on a straight line, Ch5.",
    "forward": "Later in this chapter you use back bearings in journeys."
  },
  {
    "itemId": "r2",
    "order": 2,
    "cluster": "C2",
    "clusterName": "Scale drawings",
    "question": "A map has a scale of \\(1:25\\,000\\). Two points are 3.2 cm apart on the map. How far apart are they in real life, in kilometres?",
    "options": [
      {
        "text": "0.08 km",
        "correct": false,
        "feedback": "Divided 80 000 cm by 1 000 000 instead of 100 000, giving 0.08 km. There are 100 000 cm in 1 km."
      },
      {
        "text": "80 km",
        "correct": false,
        "feedback": "Found \\(3.2 \\times 25\\,000 = 80\\,000\\) and divided by 1000, giving 80 km. The 80 000 is in centimetres; divide by 100 000 to get kilometres."
      },
      {
        "text": "0.8 km",
        "correct": true,
        "feedback": "Correct. \\(3.2 \\times 25\\,000 = 80\\,000\\text{ cm}\\). There are 100 000 cm in 1 km, so \\(80\\,000 \\div 100\\,000 = 0.8\\text{ km}\\)."
      },
      {
        "text": "8 km",
        "correct": false,
        "feedback": "Divided 80 000 cm by 10 000 instead of 100 000, giving 8 km. There are 100 000 cm in 1 km."
      }
    ],
    "backward": "Converting centimetres to kilometres, Ch7.",
    "forward": "Later in this chapter you use scales with bearings."
  },
  {
    "itemId": "r3",
    "order": 3,
    "cluster": "C3",
    "clusterName": "Points on a line segment",
    "question": "What are the coordinates of the midpoint of \\((-9, 5)\\) and \\((3, -3)\\)?",
    "options": [
      {
        "text": "\\((-3, 4)\\)",
        "correct": false,
        "feedback": "Halved the x-sum correctly, \\((-9 + 3) \\div 2 = -3\\), but used half the difference for y, \\((5 - (-3)) \\div 2 = 4\\), giving \\((-3, 4)\\). Add the y-coordinates, then halve."
      },
      {
        "text": "\\((-6, 2)\\)",
        "correct": false,
        "feedback": "Added the coordinates without halving: \\(-9 + 3 = -6\\) and \\(5 + (-3) = 2\\), giving \\((-6, 2)\\). The midpoint is half of each sum."
      },
      {
        "text": "\\((6, -4)\\)",
        "correct": false,
        "feedback": "Found half the difference instead: \\((3 - (-9)) \\div 2 = 6\\) and \\((-3 - 5) \\div 2 = -4\\), giving \\((6, -4)\\). Add the coordinates, then halve."
      },
      {
        "text": "\\((-3, 1)\\)",
        "correct": true,
        "feedback": "Correct. \\(((-9 + 3) \\div 2, (5 + (-3)) \\div 2) = (-3, 1)\\)."
      }
    ],
    "backward": "Negative numbers and coordinates, Ch10.",
    "forward": "Later in this chapter you divide lines in other ratios."
  },
  {
    "itemId": "r4",
    "order": 4,
    "cluster": "C4",
    "clusterName": "Translations and reflections",
    "question": "The point \\((1, 4)\\) is reflected in the line \\(x = -2\\). What are the coordinates of its image?",
    "options": [
      {
        "text": "\\((-5, 4)\\)",
        "correct": true,
        "feedback": "Correct. The point is \\(1 - (-2) = 3\\) to the right of the line, so its image is 3 to the left of it: \\(-2 - 3 = -5\\). The y-coordinate stays 4."
      },
      {
        "text": "\\((-1, 4)\\)",
        "correct": false,
        "feedback": "Reflected in the y-axis by changing the sign of x, giving \\((-1, 4)\\). The mirror line is \\(x = -2\\), not the y-axis."
      },
      {
        "text": "\\((-2, 4)\\)",
        "correct": false,
        "feedback": "Placed the image on the mirror line, giving \\((-2, 4)\\). The image is the same distance on the other side of the line, 3 to the left of it."
      },
      {
        "text": "\\((1, -8)\\)",
        "correct": false,
        "feedback": "Reflected in the horizontal line \\(y = -2\\) instead, giving \\((1, -8)\\). The mirror line \\(x = -2\\) is vertical, so only the x-coordinate changes."
      }
    ],
    "backward": "Equations of vertical lines, Ch10.",
    "forward": "Later in this chapter you find mirror lines from a shape and its image."
  },
  {
    "itemId": "r5",
    "order": 5,
    "cluster": "C5",
    "clusterName": "Rotations and enlargements",
    "question": "The point \\((6, 2)\\) is rotated 180° about the point \\((1, 3)\\). What are the coordinates of its image?",
    "options": [
      {
        "text": "\\((-4, 2)\\)",
        "correct": false,
        "feedback": "Reversed only the horizontal movement, giving \\((1 - 5, 2) = (-4, 2)\\). A half-turn reverses both the horizontal and the vertical movement."
      },
      {
        "text": "\\((-4, 4)\\)",
        "correct": true,
        "feedback": "Correct. The point is 5 right and 1 down from the centre. A half-turn reverses both: 5 left and 1 up. The image is \\((1 - 5, 3 + 1) = (-4, 4)\\)."
      },
      {
        "text": "\\((6, 4)\\)",
        "correct": false,
        "feedback": "Reversed only the vertical movement, giving \\((6, 3 + 1) = (6, 4)\\). A half-turn reverses both the horizontal and the vertical movement."
      },
      {
        "text": "\\((-6, -2)\\)",
        "correct": false,
        "feedback": "Rotated about the origin instead of about the centre \\((1, 3)\\), changing both signs, giving \\((-6, -2)\\). The centre here is \\((1, 3)\\)."
      }
    ],
    "backward": "Coordinates, Ch10.",
    "forward": "Later in this chapter you describe a rotation by its centre, angle and direction."
  },
  {
    "itemId": "r6",
    "order": 6,
    "cluster": "C6",
    "clusterName": "Mixed position and transformation problems",
    "question": "A is the point \\((2, 4)\\) and B is the point \\((6, 10)\\). Both are enlarged by scale factor 2 from the origin to give A′ and B′. What are the coordinates of the midpoint of A′B′?",
    "options": [
      {
        "text": "\\((12, 20)\\)",
        "correct": false,
        "feedback": "Gave B′, \\((12, 20)\\), which is an end of the line. The question asks for the midpoint of A′B′."
      },
      {
        "text": "\\((4, 7)\\)",
        "correct": false,
        "feedback": "Found the midpoint of AB, \\((4, 7)\\), but did not enlarge it. The midpoint of A′B′ is needed."
      },
      {
        "text": "\\((6, 9)\\)",
        "correct": false,
        "feedback": "Added the scale factor to each coordinate of the midpoint of AB, \\((4 + 2, 7 + 2) = (6, 9)\\). An enlargement multiplies the coordinates."
      },
      {
        "text": "\\((8, 14)\\)",
        "correct": true,
        "feedback": "Correct. A′ = \\((4, 8)\\) and B′ = \\((12, 20)\\). The midpoint is \\(((4 + 12) \\div 2, (8 + 20) \\div 2) = (8, 14)\\)."
      }
    ],
    "backward": "Coordinates and multiplying, Ch10 and Ch11.",
    "forward": "Later in this chapter you combine enlargements with points on a line."
  },
  {
    "itemId": "r7",
    "order": 7,
    "cluster": "C1",
    "clusterName": "Bearings",
    "question": "A ship is sailing on a bearing of 060°. It turns left (anticlockwise) through 100°. What is its new bearing?",
    "options": [
      {
        "text": "320°",
        "correct": true,
        "feedback": "Correct. Turning anticlockwise subtracts from the bearing: \\(60^\\circ - 100^\\circ = -40^\\circ\\), and \\(-40^\\circ + 360^\\circ = 320^\\circ\\)."
      },
      {
        "text": "160°",
        "correct": false,
        "feedback": "Turned right instead, \\(60^\\circ + 100^\\circ = 160^\\circ\\), giving 160°. Turning left (anticlockwise) subtracts from the bearing."
      },
      {
        "text": "040°",
        "correct": false,
        "feedback": "Subtracted the other way round, \\(100^\\circ - 60^\\circ = 40^\\circ\\), giving 040°. The turn is taken away from the old bearing."
      },
      {
        "text": "240°",
        "correct": false,
        "feedback": "Used \\(180^\\circ + 60^\\circ = 240^\\circ\\), a half turn, giving 240°. The ship turns through 100°, not 180°."
      }
    ],
    "backward": "Angles around a point, Ch5.",
    "forward": "Later in this chapter you use bearings in journeys."
  },
  {
    "itemId": "r8",
    "order": 8,
    "cluster": "C2",
    "clusterName": "Scale drawings",
    "question": "On a map, 1 cm represents 6 km. Two towns are 21 km apart in real life. How far apart are they on the map, in centimetres?",
    "options": [
      {
        "text": "3.5 cm",
        "correct": true,
        "feedback": "Correct. Each centimetre on the map is 6 km, so the map distance is \\(21 \\div 6 = 3.5\\text{ cm}\\)."
      },
      {
        "text": "15 cm",
        "correct": false,
        "feedback": "Subtracted \\(21 - 6\\) to get 15 cm. Scales are about multiplying or dividing, not subtracting."
      },
      {
        "text": "27 cm",
        "correct": false,
        "feedback": "Added \\(21 + 6\\) to get 27 cm. Scales are about multiplying or dividing, not adding."
      },
      {
        "text": "126 cm",
        "correct": false,
        "feedback": "Multiplied \\(21 \\times 6\\) to get 126 cm instead of dividing. The map distance is smaller than the real distance."
      }
    ],
    "backward": "Ratio and scale, Ch11.",
    "forward": "Later in this chapter you use scales written as ratios."
  },
  {
    "itemId": "r9",
    "order": 9,
    "cluster": "C6",
    "clusterName": "Mixed position and transformation problems",
    "question": "A is the point \\((-5, 0)\\) and B is the point \\((5, 10)\\). P lies on AB so that \\(\\mathrm{AP}:\\mathrm{PB} = 1:4\\). What are the coordinates of P?",
    "options": [
      {
        "text": "\\((3, 8)\\)",
        "correct": false,
        "feedback": "Used 4 parts instead of 1: \\((10 \\div 5 \\times 4, 10 \\div 5 \\times 4) = (8, 8)\\), giving \\((-5 + 8, 0 + 8) = (3, 8)\\). AP is the part with 1 share."
      },
      {
        "text": "\\((-2.5, 2.5)\\)",
        "correct": false,
        "feedback": "Compared AP with PB instead of with AB: \\((10 \\div 4, 10 \\div 4) = (2.5, 2.5)\\), giving \\((-2.5, 2.5)\\). AB is \\(1 + 4 = 5\\) parts, not 4."
      },
      {
        "text": "\\((-3, 2)\\)",
        "correct": true,
        "feedback": "Correct. AP is 1 of the \\(1 + 4 = 5\\) equal parts of AB. The step from A to B is \\((10, 10)\\), so AP = \\((10 \\div 5, 10 \\div 5) = (2, 2)\\) and P = \\((-5 + 2, 0 + 2) = (-3, 2)\\)."
      },
      {
        "text": "\\((0, 5)\\)",
        "correct": false,
        "feedback": "Found the midpoint, \\((0, 5)\\). A ratio of \\(1:4\\) is not an equal split."
      }
    ],
    "backward": "Ratio, Ch11.",
    "forward": "Later in this chapter you use points on a line with other transformations."
  },
  {
    "itemId": "r10",
    "order": 10,
    "cluster": "C4",
    "clusterName": "Translations and reflections",
    "question": "A translation takes P\\((2, 7)\\) to P′\\((-1, 3)\\). What are the coordinates of the image of Q\\((3, -1)\\) under the same translation?",
    "options": [
      {
        "text": "\\((6, 3)\\)",
        "correct": false,
        "feedback": "Used the reverse vector, \\(\\begin{pmatrix}3\\\\4\\end{pmatrix}\\): \\((3 + 3, -1 + 4) = (6, 3)\\). The vector goes from P to P′."
      },
      {
        "text": "\\((0, -5)\\)",
        "correct": true,
        "feedback": "Correct. P moves \\(-1 - 2 = -3\\) across and \\(3 - 7 = -4\\) vertically, so the vector is \\(\\begin{pmatrix}-3\\\\-4\\end{pmatrix}\\). Apply it to Q: \\((3 + (-3), -1 + (-4)) = (0, -5)\\)."
      },
      {
        "text": "\\((0, 3)\\)",
        "correct": false,
        "feedback": "Ignored the minus sign on the vertical move: \\((3 + (-3), -1 + 4) = (0, 3)\\). P has moved down, so the bottom entry is \\(-4\\)."
      },
      {
        "text": "\\((-1, 3)\\)",
        "correct": false,
        "feedback": "Gave P′, \\((-1, 3)\\), which is the image of P. The question asks for the image of Q."
      }
    ],
    "backward": "Reading coordinates, Ch10.",
    "forward": "Later in this chapter you describe translations by column vectors."
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
  title: "Position and Transformation — Speed & Strategy",
  subtitle: "Grade 8 · Level 4 · Speed & Strategy · Olympiad Simulation",
  description: "A 25-minute timed diagnostic mixing Speed, Core, Hard and Trap items across every position and transformation cluster.",
  clusterNames: CLUSTER_NAMES,
  gateReviewHTML: "<p><strong>Warm-up done.</strong> The diagnostic is timed: 25 minutes for 20 questions, which is about 75 seconds each. Each question carries a tag. S means speed: answer it on sight. C means core: work it steadily. H means hard: if it is taking more than two minutes, mark it and move on. T means trap: a tempting wrong answer is waiting, so slow down and ask what the question really wants (which point the bearing is from, clockwise or anticlockwise, which centre or mirror line, which part of the ratio, which unit). Skip anything that stalls you and come back at the end. Your timing and your choices tell us as much as your score, so use the full strategy.</p><p>The clock starts when you begin question 1.</p>",
  timedSeconds: 1500
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

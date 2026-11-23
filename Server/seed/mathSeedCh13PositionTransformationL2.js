// Position and Transformation — Grade 8, Level 2 (Advanced Core).
// Warm-up, diagnostic and spaced recheck items.
// Run with: node seed/mathSeedCh13PositionTransformationL2.js
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-8";
const GRADE_LABEL = "Grade 8";
const CHAPTER_SLUG = "ch-13-position-transformation";
const CHAPTER_NAME = "Position and Transformation";
const LEVEL = 2;

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
    "question": "A ship sails from A on a bearing of 050° to B. It then sails from B on a bearing of 160° to C. What is the size of angle ABC?",
    "options": [
      {
        "text": "70°",
        "correct": true,
        "feedback": "Correct. The bearing of A from B is the back bearing, \\(50^\\circ + 180^\\circ = 230^\\circ\\). The bearing of C from B is 160°, so angle ABC = \\(230^\\circ - 160^\\circ = 70^\\circ\\)."
      },
      {
        "text": "110°",
        "correct": false,
        "feedback": "Subtracted the two bearings directly, \\(160^\\circ - 50^\\circ = 110^\\circ\\), without turning the first bearing into the bearing of A from B."
      },
      {
        "text": "290°",
        "correct": false,
        "feedback": "Found the reflex angle, \\(360^\\circ - 70^\\circ = 290^\\circ\\). Angle ABC is the smaller angle between BA and BC, which is 70°."
      },
      {
        "text": "210°",
        "correct": false,
        "feedback": "Added the two bearings, \\(50^\\circ + 160^\\circ = 210^\\circ\\). The angle between the two directions at B is a difference, once the first bearing has been turned into the bearing of A from B."
      }
    ],
    "retryHint": "Turn the first bearing into the bearing of A from B by adding or subtracting 180°. Then find the difference between the two bearings at B.",
    "backward": "Angles on parallel lines and straight lines, Ch5.",
    "forward": "Later in this chapter you combine bearings with scale drawings of journeys."
  },
  {
    "itemId": "w2",
    "order": 2,
    "cluster": "C4",
    "clusterName": "Translations and reflections",
    "question": "A translation takes the point P to P′\\((5, -2)\\). The translation is the column vector \\(\\begin{pmatrix}3\\\\-4\\end{pmatrix}\\). What are the coordinates of P?",
    "options": [
      {
        "text": "\\((8, 2)\\)",
        "correct": false,
        "feedback": "Undid the vertical move correctly, \\(-2 - (-4) = 2\\), but added 3 to the x-coordinate, \\(5 + 3 = 8\\), giving \\((8, 2)\\). Both coordinates must be undone by subtracting."
      },
      {
        "text": "\\((2, 2)\\)",
        "correct": true,
        "feedback": "Correct. To undo the translation, subtract the vector from the image: \\(5 - 3 = 2\\) and \\(-2 - (-4) = 2\\). So P is \\((2, 2)\\)."
      },
      {
        "text": "\\((2, -6)\\)",
        "correct": false,
        "feedback": "Undid the horizontal move correctly, \\(5 - 3 = 2\\), but added \\(-4\\) to the y-coordinate, \\(-2 + (-4) = -6\\), giving \\((2, -6)\\). Both coordinates must be undone by subtracting."
      },
      {
        "text": "\\((8, -6)\\)",
        "correct": false,
        "feedback": "Added the vector to the image instead of undoing it, \\(5 + 3 = 8\\) and \\(-2 + (-4) = -6\\), giving \\((8, -6)\\). The image was reached by adding the vector, so subtract it to go back."
      }
    ],
    "retryHint": "The image was found by adding the vector to P. Which operation undoes adding?",
    "backward": "Undoing an operation with its inverse, Ch4.",
    "forward": "Later in this chapter you find the vector from a shape and its image."
  },
  {
    "itemId": "w3",
    "order": 3,
    "cluster": "C2",
    "clusterName": "Scale drawings",
    "question": "A wall 6 m long is drawn 12 cm long on a plan. What is the scale of the plan, written as \\(1:n\\)?",
    "options": [
      {
        "text": "\\(1:72\\)",
        "correct": false,
        "feedback": "Multiplied \\(6 \\times 12\\) to get 72, giving \\(1:72\\). The scale compares the drawing length with the real length in the same units: 12 cm to 600 cm."
      },
      {
        "text": "\\(1:500\\)",
        "correct": false,
        "feedback": "Changed 6 m into 6000 cm instead of 600 cm, so the ratio \\(12:6000\\) simplified to \\(1:500\\). There are 100 cm in 1 m."
      },
      {
        "text": "\\(1:600\\)",
        "correct": false,
        "feedback": "Used the real length in centimetres, 600, as the scale number, giving \\(1:600\\), without comparing it with the 12 cm drawing. The scale is the ratio \\(12:600\\), which simplifies."
      },
      {
        "text": "\\(1:50\\)",
        "correct": true,
        "feedback": "Correct. \\(6\\text{ m} = 600\\text{ cm}\\). The drawing is 12 cm, so the ratio \\(12:600\\) simplifies to \\(1:50\\)."
      }
    ],
    "retryHint": "Change both lengths to the same unit first. Then write drawing length : real length and simplify to \\(1:n\\).",
    "backward": "Converting metres to centimetres, Ch7, and simplifying ratios, Ch11.",
    "forward": "Later in this chapter you use scales like this to find real lengths."
  },
  {
    "itemId": "w4",
    "order": 4,
    "cluster": "C5",
    "clusterName": "Rotations and enlargements",
    "question": "The point A\\((2, 3)\\) is enlarged from the origin to give A′\\((6, 9)\\). The point B\\((1, 4)\\) is enlarged by the same enlargement. What are the coordinates of the image of B?",
    "options": [
      {
        "text": "\\((5, 10)\\)",
        "correct": false,
        "feedback": "Added the movement of A, \\((+4, +6)\\), to B: \\((1 + 4, 4 + 6) = (5, 10)\\). An enlargement multiplies the coordinates; it does not add a fixed move."
      },
      {
        "text": "\\((3, 4)\\)",
        "correct": false,
        "feedback": "Multiplied only the x-coordinate by 3, \\(1 \\times 3 = 3\\), and left \\(y = 4\\), giving \\((3, 4)\\). Both coordinates are multiplied by the scale factor."
      },
      {
        "text": "\\((3, 12)\\)",
        "correct": true,
        "feedback": "Correct. The scale factor is \\(6 \\div 2 = 3\\) (and \\(9 \\div 3 = 3\\)). Multiply B's coordinates by 3: \\((1 \\times 3, 4 \\times 3) = (3, 12)\\)."
      },
      {
        "text": "\\((6, 9)\\)",
        "correct": false,
        "feedback": "Gave A′, \\((6, 9)\\), which is the image of A. The question asks for the image of B."
      }
    ],
    "retryHint": "Find the scale factor by comparing a coordinate of A with the same coordinate of A′. Then use it on B.",
    "backward": "Multiplying coordinates and comparing lengths by ratio, Ch11.",
    "forward": "Later in this chapter you find the scale factor and centre from a shape and its image."
  },
  {
    "itemId": "w5",
    "order": 5,
    "cluster": "C3",
    "clusterName": "Points on a line segment",
    "question": "M\\((3, 5)\\) is the midpoint of AB. A is the point \\((1, 2)\\). What are the coordinates of B?",
    "options": [
      {
        "text": "\\((4, 7)\\)",
        "correct": false,
        "feedback": "Added the coordinates of M and A, \\(3 + 1 = 4\\) and \\(5 + 2 = 7\\), giving \\((4, 7)\\). B is another step beyond M, the same size as the step from A to M."
      },
      {
        "text": "\\((2, 3)\\)",
        "correct": false,
        "feedback": "Found the step from A to M, \\((2, 3)\\), and stopped. B is another step beyond M, so add this step to M."
      },
      {
        "text": "\\((5, 8)\\)",
        "correct": true,
        "feedback": "Correct. From A to M the coordinates increase by \\(3 - 1 = 2\\) and \\(5 - 2 = 3\\). The same step again gives B: \\((3 + 2, 5 + 3) = (5, 8)\\)."
      },
      {
        "text": "\\((2, 3.5)\\)",
        "correct": false,
        "feedback": "Found the midpoint of A and M, \\(((1 + 3) \\div 2, (2 + 5) \\div 2) = (2, 3.5)\\), instead of continuing past M to B."
      }
    ],
    "retryHint": "M is halfway from A to B, so the step from A to M is the same as the step from M to B. Find that step first.",
    "backward": "Reading coordinates, Ch10.",
    "forward": "Later in this chapter you divide lines in other ratios."
  },
  {
    "itemId": "w6",
    "order": 6,
    "cluster": "C1",
    "clusterName": "Bearings",
    "question": "A hiker walks 5 km due north and then 5 km due east. What is the bearing of the start from the finish?",
    "options": [
      {
        "text": "315°",
        "correct": false,
        "feedback": "Used the 315° bearing of north-west, \\(360^\\circ - 45^\\circ = 315^\\circ\\). From the finish the start lies back towards the south-west."
      },
      {
        "text": "045°",
        "correct": false,
        "feedback": "Gave the bearing of the finish from the start, 045°. The question asks for the bearing of the start from the finish, which is a half turn different."
      },
      {
        "text": "135°",
        "correct": false,
        "feedback": "Used the 135° bearing of south-east, \\(180^\\circ - 45^\\circ = 135^\\circ\\). From the finish the start lies back towards the south-west."
      },
      {
        "text": "225°",
        "correct": true,
        "feedback": "Correct. The two legs are equal, so the finish is north-east of the start, on a bearing of 045° from the start. The bearing of the start from the finish is the back bearing: \\(45^\\circ + 180^\\circ = 225^\\circ\\)."
      }
    ],
    "retryHint": "Sketch the walk with north up. What direction is the finish from the start, and what is the opposite direction?",
    "backward": "Isosceles right-angled triangles and angles, Ch5.",
    "forward": "Later in this chapter you draw journeys like this on scale drawings."
  },
  {
    "itemId": "w7",
    "order": 7,
    "cluster": "C4",
    "clusterName": "Translations and reflections",
    "question": "A translation takes A\\((2, 3)\\) to A′\\((6, 1)\\). What are the coordinates of the image of B\\((-1, 4)\\) under the same translation?",
    "options": [
      {
        "text": "\\((-5, 6)\\)",
        "correct": false,
        "feedback": "Used the reverse vector, \\(\\begin{pmatrix}-4\\\\2\\end{pmatrix}\\): \\((-1 - 4, 4 + 2) = (-5, 6)\\). The vector goes from A to A′, not from A′ back to A."
      },
      {
        "text": "\\((3, 2)\\)",
        "correct": true,
        "feedback": "Correct. A moves \\(6 - 2 = 4\\) across and \\(1 - 3 = -2\\) vertically, so the vector is \\(\\begin{pmatrix}4\\\\-2\\end{pmatrix}\\). Apply it to B: \\((-1 + 4, 4 + (-2)) = (3, 2)\\)."
      },
      {
        "text": "\\((3, 6)\\)",
        "correct": false,
        "feedback": "Ignored the minus sign on the vertical move: \\((-1 + 4, 4 + 2) = (3, 6)\\). A has moved down, so the bottom entry is \\(-2\\)."
      },
      {
        "text": "\\((5, 5)\\)",
        "correct": false,
        "feedback": "Added the coordinates of A′ to B: \\((-1 + 6, 4 + 1) = (5, 5)\\). The vector is the change from A to A′, which is then added to B."
      }
    ],
    "retryHint": "Work out how far A moves across and up or down, then apply that same move to B.",
    "backward": "Reading coordinates, Ch10.",
    "forward": "Later in this chapter you describe a translation by its column vector."
  },
  {
    "itemId": "w8",
    "order": 8,
    "cluster": "C5",
    "clusterName": "Rotations and enlargements",
    "question": "The point P\\((5, 4)\\) is rotated 180° about the point C\\((2, 1)\\). What are the coordinates of its image?",
    "options": [
      {
        "text": "\\((-1, -2)\\)",
        "correct": true,
        "feedback": "Correct. A half-turn about C sends P to the opposite side of C at the same distance. P is 3 right and 3 up from C, so the image is 3 left and 3 down: \\((2 - 3, 1 - 3) = (-1, -2)\\)."
      },
      {
        "text": "\\((-1, 4)\\)",
        "correct": false,
        "feedback": "Went 3 left of C but kept the vertical movement 3 up, \\((2 - 3, 1 + 3) = (-1, 4)\\). A half-turn reverses both the horizontal and the vertical movement."
      },
      {
        "text": "\\((5, -2)\\)",
        "correct": false,
        "feedback": "Went 3 down from C but kept the horizontal movement 3 right, \\((2 + 3, 1 - 3) = (5, -2)\\). A half-turn reverses both the horizontal and the vertical movement."
      },
      {
        "text": "\\((-5, -4)\\)",
        "correct": false,
        "feedback": "Rotated about the origin instead of C, changing both signs, giving \\((-5, -4)\\). The centre here is C\\((2, 1)\\)."
      }
    ],
    "retryHint": "A rotation of 180° sends P to the opposite side of the centre at the same distance. How far is P from C across and up?",
    "backward": "Coordinates, Ch10.",
    "forward": "Later in this chapter you find the centre of a rotation from a shape and its image."
  }
];

const diagnosticItems = [
  {
    "itemId": "d1",
    "order": 1,
    "cluster": "C1",
    "clusterName": "Bearings",
    "question": "The diagram shows the bearings of towns B and C from town A. What is the size of angle BAC?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 289 278\" width=\"289\" height=\"278\"><rect x=\"0\" y=\"0\" width=\"289\" height=\"278\" fill=\"#ffffff\"/><line x1=\"178.58\" y1=\"216\" x2=\"178.58\" y2=\"62\" stroke=\"#666666\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><text x=\"178.58\" y=\"54\" font-family=\"sans-serif\" font-size=\"15\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"middle\">N</text><line x1=\"178.58\" y1=\"216\" x2=\"66\" y2=\"151\" stroke=\"#333333\" stroke-width=\"2\"/><line x1=\"178.58\" y1=\"216\" x2=\"223.05\" y2=\"93.84\" stroke=\"#333333\" stroke-width=\"2\"/><text x=\"110.66\" y=\"195.64\" font-family=\"sans-serif\" font-size=\"14\" font-weight=\"bold\" fill=\"#c0392b\" text-anchor=\"end\">300°</text><circle cx=\"66\" cy=\"151\" r=\"4.5\" fill=\"#333333\"/><text x=\"52.14\" y=\"148\" font-family=\"sans-serif\" font-size=\"15\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"middle\">B</text><text x=\"214.31\" y=\"157.92\" font-family=\"sans-serif\" font-size=\"14\" font-weight=\"bold\" fill=\"#c0392b\" text-anchor=\"start\">020°</text><circle cx=\"223.05\" cy=\"93.84\" r=\"4.5\" fill=\"#333333\"/><text x=\"228.52\" y=\"83.8\" font-family=\"sans-serif\" font-size=\"15\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"middle\">C</text><circle cx=\"178.58\" cy=\"216\" r=\"4.5\" fill=\"#333333\"/><text x=\"160.58\" y=\"236\" font-family=\"sans-serif\" font-size=\"15\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"middle\">A</text></svg></div>",
    "options": [
      {
        "text": "280°",
        "correct": false,
        "feedback": "Subtracted the bearings, \\(300^\\circ - 20^\\circ = 280^\\circ\\). That is the reflex angle going the long way round through south; the angle between AB and AC across north is smaller."
      },
      {
        "text": "320°",
        "correct": false,
        "feedback": "Added the bearings, \\(300^\\circ + 20^\\circ = 320^\\circ\\). Bearings are measured clockwise from north, so the angle across north is found from the part of each bearing either side of north."
      },
      {
        "text": "80°",
        "correct": true,
        "feedback": "Correct. B is \\(360^\\circ - 300^\\circ = 60^\\circ\\) to the left of north and C is 20° to the right of north, so angle BAC = \\(60^\\circ + 20^\\circ = 80^\\circ\\)."
      },
      {
        "text": "40°",
        "correct": false,
        "feedback": "Found \\(60^\\circ - 20^\\circ = 40^\\circ\\). B and C are on opposite sides of north, so the two angles 60° and 20° add."
      }
    ],
    "backward": "Angles around a point, Ch5.",
    "forward": "Later in this chapter you use angles like this to draw scale drawings of journeys."
  },
  {
    "itemId": "d2",
    "order": 2,
    "cluster": "C4",
    "clusterName": "Translations and reflections",
    "question": "The diagram shows triangle ABC and its reflection A′B′C′. The mirror line is vertical. What is the equation of the mirror line?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 388 310\" width=\"388\" height=\"310\"><rect x=\"0\" y=\"0\" width=\"388\" height=\"310\" fill=\"#ffffff\"/><line x1=\"44\" y1=\"266\" x2=\"44\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"84\" y1=\"266\" x2=\"84\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"124\" y1=\"266\" x2=\"124\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"164\" y1=\"266\" x2=\"164\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"204\" y1=\"266\" x2=\"204\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"244\" y1=\"266\" x2=\"244\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"284\" y1=\"266\" x2=\"284\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"324\" y1=\"266\" x2=\"324\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"364\" y1=\"266\" x2=\"364\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"266\" x2=\"364\" y2=\"266\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"226\" x2=\"364\" y2=\"226\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"186\" x2=\"364\" y2=\"186\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"146\" x2=\"364\" y2=\"146\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"106\" x2=\"364\" y2=\"106\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"66\" x2=\"364\" y2=\"66\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"26\" x2=\"364\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"266\" x2=\"364\" y2=\"266\" stroke=\"#333333\" stroke-width=\"1.8\"/><line x1=\"44\" y1=\"266\" x2=\"44\" y2=\"26\" stroke=\"#333333\" stroke-width=\"1.8\"/><text x=\"44\" y=\"282\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">0</text><text x=\"84\" y=\"282\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">1</text><text x=\"124\" y=\"282\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">2</text><text x=\"164\" y=\"282\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">3</text><text x=\"204\" y=\"282\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">4</text><text x=\"244\" y=\"282\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">5</text><text x=\"284\" y=\"282\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">6</text><text x=\"324\" y=\"282\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">7</text><text x=\"364\" y=\"282\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">8</text><text x=\"36\" y=\"270\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">0</text><text x=\"36\" y=\"230\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">1</text><text x=\"36\" y=\"190\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">2</text><text x=\"36\" y=\"150\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">3</text><text x=\"36\" y=\"110\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">4</text><text x=\"36\" y=\"70\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">5</text><text x=\"36\" y=\"30\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">6</text><text x=\"376\" y=\"270\" font-family=\"sans-serif\" font-size=\"14\" font-style=\"italic\" fill=\"#333333\">x</text><text x=\"54\" y=\"18\" font-family=\"sans-serif\" font-size=\"14\" font-style=\"italic\" fill=\"#333333\">y</text><polygon points=\"84,106 84,186 164,186\" fill=\"#d6e6f5\" fill-opacity=\"0.75\" stroke=\"#1f4e79\" stroke-width=\"2.2\" stroke-linejoin=\"round\"/><circle cx=\"84\" cy=\"106\" r=\"3.5\" fill=\"#1f4e79\"/><text x=\"77.29\" y=\"97.58\" font-family=\"sans-serif\" font-size=\"15\" font-weight=\"bold\" fill=\"#1f4e79\" text-anchor=\"middle\">A</text><circle cx=\"84\" cy=\"186\" r=\"3.5\" fill=\"#1f4e79\"/><text x=\"73.39\" y=\"201.61\" font-family=\"sans-serif\" font-size=\"15\" font-weight=\"bold\" fill=\"#1f4e79\" text-anchor=\"middle\">B</text><circle cx=\"164\" cy=\"186\" r=\"3.5\" fill=\"#1f4e79\"/><text x=\"177.42\" y=\"197.71\" font-family=\"sans-serif\" font-size=\"15\" font-weight=\"bold\" fill=\"#1f4e79\" text-anchor=\"middle\">C</text><polygon points=\"324,106 324,186 244,186\" fill=\"#f7dcdc\" fill-opacity=\"0.75\" stroke=\"#8e2a2a\" stroke-width=\"2.2\" stroke-linejoin=\"round\"/><circle cx=\"324\" cy=\"106\" r=\"3.5\" fill=\"#8e2a2a\"/><text x=\"330.71\" y=\"97.58\" font-family=\"sans-serif\" font-size=\"15\" font-weight=\"bold\" fill=\"#8e2a2a\" text-anchor=\"middle\">A′</text><circle cx=\"324\" cy=\"186\" r=\"3.5\" fill=\"#8e2a2a\"/><text x=\"334.61\" y=\"201.61\" font-family=\"sans-serif\" font-size=\"15\" font-weight=\"bold\" fill=\"#8e2a2a\" text-anchor=\"middle\">B′</text><circle cx=\"244\" cy=\"186\" r=\"3.5\" fill=\"#8e2a2a\"/><text x=\"230.58\" y=\"197.71\" font-family=\"sans-serif\" font-size=\"15\" font-weight=\"bold\" fill=\"#8e2a2a\" text-anchor=\"middle\">C′</text></svg></div>",
    "options": [
      {
        "text": "\\(x = 4\\)",
        "correct": true,
        "feedback": "Correct. The mirror line is halfway between A and A′: \\((1 + 7) \\div 2 = 4\\), so the line is \\(x = 4\\)."
      },
      {
        "text": "\\(x = 3\\)",
        "correct": false,
        "feedback": "Halved the distance between A and A′, \\((7 - 1) \\div 2 = 3\\), giving \\(x = 3\\). That is the distance from each point to the mirror line; the line itself is at \\(1 + 3 = 4\\)."
      },
      {
        "text": "\\(y = 4\\)",
        "correct": false,
        "feedback": "Used the common y-coordinate, giving \\(y = 4\\). The points are reflected sideways, so the mirror line is vertical, of the form x = a."
      },
      {
        "text": "\\(x = 7\\)",
        "correct": false,
        "feedback": "Used the x-coordinate of the image, giving \\(x = 7\\). The mirror line is halfway between a point and its image."
      }
    ],
    "backward": "Equations of vertical lines, Ch10.",
    "forward": "Later in this chapter you find the mirror line for any reflection."
  },
  {
    "itemId": "d3",
    "order": 3,
    "cluster": "C2",
    "clusterName": "Scale drawings",
    "question": "A road measures 4 cm on a map with scale \\(1:50\\,000\\). How long will the same road measure on a map with scale \\(1:25\\,000\\)?",
    "options": [
      {
        "text": "4 cm",
        "correct": false,
        "feedback": "Gave the same length, 4 cm, as if both maps were drawn at the same scale. The scales differ, so the lengths differ."
      },
      {
        "text": "2 cm",
        "correct": false,
        "feedback": "Divided by the ratio of the scales, \\(4 \\div 2 = 2\\text{ cm}\\). The new map is twice as detailed, so lengths on it are twice as long, not half."
      },
      {
        "text": "200 000 cm",
        "correct": false,
        "feedback": "Found the real length, \\(4 \\times 50\\,000 = 200\\,000\\text{ cm}\\), and stopped. Divide it by 25 000 to find the length on the new map."
      },
      {
        "text": "8 cm",
        "correct": true,
        "feedback": "Correct. Real length = \\(4 \\times 50\\,000 = 200\\,000\\text{ cm}\\). On the new map: \\(200\\,000 \\div 25\\,000 = 8\\text{ cm}\\). A map with a smaller scale number shows more detail, so the road is longer on it."
      }
    ],
    "backward": "Ratio and scale, Ch11.",
    "forward": "Later in this chapter you convert between maps and real distances."
  },
  {
    "itemId": "d4",
    "order": 4,
    "cluster": "C5",
    "clusterName": "Rotations and enlargements",
    "question": "Triangle PQR is shown on the grid. It is rotated 90° clockwise about the point C\\((2, 1)\\). What are the coordinates of the image of P?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 410 412\" width=\"410\" height=\"412\"><rect x=\"0\" y=\"0\" width=\"410\" height=\"412\" fill=\"#ffffff\"/><line x1=\"44\" y1=\"368\" x2=\"44\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"82\" y1=\"368\" x2=\"82\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"120\" y1=\"368\" x2=\"120\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"158\" y1=\"368\" x2=\"158\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"196\" y1=\"368\" x2=\"196\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"234\" y1=\"368\" x2=\"234\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"272\" y1=\"368\" x2=\"272\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"310\" y1=\"368\" x2=\"310\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"348\" y1=\"368\" x2=\"348\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"386\" y1=\"368\" x2=\"386\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"368\" x2=\"386\" y2=\"368\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"330\" x2=\"386\" y2=\"330\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"292\" x2=\"386\" y2=\"292\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"254\" x2=\"386\" y2=\"254\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"216\" x2=\"386\" y2=\"216\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"178\" x2=\"386\" y2=\"178\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"140\" x2=\"386\" y2=\"140\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"102\" x2=\"386\" y2=\"102\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"64\" x2=\"386\" y2=\"64\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"26\" x2=\"386\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"216\" x2=\"386\" y2=\"216\" stroke=\"#333333\" stroke-width=\"1.8\"/><line x1=\"82\" y1=\"368\" x2=\"82\" y2=\"26\" stroke=\"#333333\" stroke-width=\"1.8\"/><text x=\"44\" y=\"232\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">-1</text><text x=\"120\" y=\"232\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">1</text><text x=\"158\" y=\"232\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">2</text><text x=\"196\" y=\"232\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">3</text><text x=\"234\" y=\"232\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">4</text><text x=\"272\" y=\"232\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">5</text><text x=\"310\" y=\"232\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">6</text><text x=\"348\" y=\"232\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">7</text><text x=\"386\" y=\"232\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">8</text><text x=\"74\" y=\"372\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">-4</text><text x=\"74\" y=\"334\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">-3</text><text x=\"74\" y=\"296\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">-2</text><text x=\"74\" y=\"258\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">-1</text><text x=\"74\" y=\"182\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">1</text><text x=\"74\" y=\"144\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">2</text><text x=\"74\" y=\"106\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">3</text><text x=\"74\" y=\"68\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">4</text><text x=\"74\" y=\"30\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">5</text><text x=\"398\" y=\"220\" font-family=\"sans-serif\" font-size=\"14\" font-style=\"italic\" fill=\"#333333\">x</text><text x=\"92\" y=\"18\" font-family=\"sans-serif\" font-size=\"14\" font-style=\"italic\" fill=\"#333333\">y</text><polygon points=\"272,102 272,178 348,178\" fill=\"#d6e6f5\" fill-opacity=\"0.75\" stroke=\"#1f4e79\" stroke-width=\"2.2\" stroke-linejoin=\"round\"/><circle cx=\"272\" cy=\"102\" r=\"3.5\" fill=\"#1f4e79\"/><text x=\"265.29\" y=\"93.58\" font-family=\"sans-serif\" font-size=\"15\" font-weight=\"bold\" fill=\"#1f4e79\" text-anchor=\"middle\">P</text><circle cx=\"272\" cy=\"178\" r=\"3.5\" fill=\"#1f4e79\"/><text x=\"261.39\" y=\"193.61\" font-family=\"sans-serif\" font-size=\"15\" font-weight=\"bold\" fill=\"#1f4e79\" text-anchor=\"middle\">Q</text><circle cx=\"348\" cy=\"178\" r=\"3.5\" fill=\"#1f4e79\"/><text x=\"361.42\" y=\"189.71\" font-family=\"sans-serif\" font-size=\"15\" font-weight=\"bold\" fill=\"#1f4e79\" text-anchor=\"middle\">R</text><circle cx=\"158\" cy=\"178\" r=\"4.5\" fill=\"#333333\"/><text x=\"168\" y=\"170\" font-family=\"sans-serif\" font-size=\"15\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"start\">C</text></svg></div>",
    "options": [
      {
        "text": "\\((0, 4)\\)",
        "correct": false,
        "feedback": "Turned anticlockwise: \\((3, 2)\\) goes to \\((-2, 3)\\), so the image is \\((2 - 2, 1 + 3) = (0, 4)\\). The question says clockwise."
      },
      {
        "text": "\\((3, -5)\\)",
        "correct": false,
        "feedback": "Rotated about the origin instead of C, so \\((5, 3)\\) goes to \\((3, -5)\\). The centre here is C\\((2, 1)\\)."
      },
      {
        "text": "\\((4, -2)\\)",
        "correct": true,
        "feedback": "Correct. P is 3 right and 2 up from C. A quarter-turn clockwise sends \\((3, 2)\\) to \\((2, -3)\\), which is 2 right and 3 down from C. So the image is \\((2 + 2, 1 - 3) = (4, -2)\\)."
      },
      {
        "text": "\\((2, -3)\\)",
        "correct": false,
        "feedback": "Turned the movement from C correctly, \\((2, -3)\\), but forgot to add C's coordinates back on. The image is C plus this movement: \\((2 + 2, 1 - 3)\\)."
      }
    ],
    "backward": "Coordinates, Ch10.",
    "forward": "Later in this chapter you describe a rotation by its centre, angle and direction."
  },
  {
    "itemId": "d5",
    "order": 5,
    "cluster": "C6",
    "clusterName": "Mixed position and transformation problems",
    "question": "A is the point \\((1, 2)\\) and B is the point \\((11, 12)\\). The point P lies on AB so that \\(\\mathrm{AP}:\\mathrm{PB} = 2:3\\). What are the coordinates of P?",
    "options": [
      {
        "text": "\\((6, 7)\\)",
        "correct": false,
        "feedback": "Found the midpoint, \\((6, 7)\\). A ratio of \\(2:3\\) is not an equal split."
      },
      {
        "text": "\\((3, 4)\\)",
        "correct": false,
        "feedback": "Found only one share, a fifth of the way: \\((10 \\div 5, 10 \\div 5) = (2, 2)\\) from A, giving \\((3, 4)\\). AP is 2 shares, so double that step."
      },
      {
        "text": "\\((5, 6)\\)",
        "correct": true,
        "feedback": "Correct. AP is 2 of the \\(2 + 3 = 5\\) equal parts of AB. The step from A to B is \\((10, 10)\\), so AP = \\(\\frac{2}{5}\\) of it = \\((4, 4)\\). P = \\((1 + 4, 2 + 4) = (5, 6)\\)."
      },
      {
        "text": "\\((7, 8)\\)",
        "correct": false,
        "feedback": "Used \\(\\frac{3}{5}\\) of the way instead of \\(\\frac{2}{5}\\): \\(\\frac{3}{5}\\) of \\((10, 10)\\) is \\((6, 6)\\), giving \\((1 + 6, 2 + 6) = (7, 8)\\). AP is the part with 2 shares."
      }
    ],
    "backward": "Fractions of an amount, Ch8, and ratio, Ch11.",
    "forward": "Later in this chapter you use the same method with other ratios."
  },
  {
    "itemId": "d6",
    "order": 6,
    "cluster": "C6",
    "clusterName": "Mixed position and transformation problems",
    "question": "On a map with scale \\(1:50\\,000\\), town B is 7 cm from town A, on a bearing of 250° from A. How far is B from A in real life, and what is the bearing of A from B?",
    "options": [
      {
        "text": "3.5 km, 110°",
        "correct": false,
        "feedback": "Found the distance correctly but used \\(360^\\circ - 250^\\circ = 110^\\circ\\) for the bearing, giving 3.5 km, 110°. The bearing of A from B is found by subtracting 180°: \\(250^\\circ - 180^\\circ = 70^\\circ\\)."
      },
      {
        "text": "3.5 km, 070°",
        "correct": true,
        "feedback": "Correct. Distance: \\(7 \\times 50\\,000 = 350\\,000\\text{ cm} = 3.5\\text{ km}\\). Back bearing: 250° is more than 180°, so subtract 180°: \\(250^\\circ - 180^\\circ = 70^\\circ\\)."
      },
      {
        "text": "3.5 km, 430°",
        "correct": false,
        "feedback": "Found the distance correctly but added 180° to the bearing, \\(250^\\circ + 180^\\circ = 430^\\circ\\), giving 3.5 km, 430°. A bearing cannot be more than 360°, so subtract 180° instead."
      },
      {
        "text": "35 km, 070°",
        "correct": false,
        "feedback": "Found the back bearing correctly, \\(250^\\circ - 180^\\circ = 70^\\circ\\), but used 10 000 cm in a kilometre, giving 35 km, 070°. There are 100 000 cm in 1 km: \\(350\\,000 \\div 100\\,000 = 3.5\\)."
      }
    ],
    "backward": "Scale as a ratio, Ch11, and angles on parallel lines, Ch5.",
    "forward": "Later problems in this chapter place towns on a plan using a distance and a bearing."
  },
  {
    "itemId": "d7",
    "order": 7,
    "cluster": "C1",
    "clusterName": "Bearings",
    "question": "Two straight roads leave town A. Town B is on a bearing of 070° from A and town C is on a bearing of 120° from A. AB = AC. What is the size of angle ABC?",
    "options": [
      {
        "text": "50°",
        "correct": false,
        "feedback": "Gave angle BAC, 50°, which is the angle at A. The question asks for the angle at B."
      },
      {
        "text": "130°",
        "correct": false,
        "feedback": "Found \\(180^\\circ - 50^\\circ = 130^\\circ\\) and stopped. That is the sum of the two equal base angles; each one is half of it."
      },
      {
        "text": "65°",
        "correct": true,
        "feedback": "Correct. Angle BAC = \\(120^\\circ - 70^\\circ = 50^\\circ\\). Triangle ABC is isosceles with AB = AC, so angle ABC = \\((180^\\circ - 50^\\circ) \\div 2 = 65^\\circ\\)."
      },
      {
        "text": "115°",
        "correct": false,
        "feedback": "Found the base angle 65° but then took \\(180^\\circ - 65^\\circ = 115^\\circ\\), the angle outside the triangle. The angle ABC inside the triangle is 65°."
      }
    ],
    "backward": "Isosceles triangles and angles in a triangle, Ch5.",
    "forward": "Later in this chapter you use triangles like this in scale drawings."
  },
  {
    "itemId": "d8",
    "order": 8,
    "cluster": "C4",
    "clusterName": "Translations and reflections",
    "question": "The point P is shown on the grid. It is reflected in the dashed line. What are the coordinates of its image?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 468 350\" width=\"468\" height=\"350\"><rect x=\"0\" y=\"0\" width=\"468\" height=\"350\" fill=\"#ffffff\"/><line x1=\"44\" y1=\"306\" x2=\"44\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"84\" y1=\"306\" x2=\"84\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"124\" y1=\"306\" x2=\"124\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"164\" y1=\"306\" x2=\"164\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"204\" y1=\"306\" x2=\"204\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"244\" y1=\"306\" x2=\"244\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"284\" y1=\"306\" x2=\"284\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"324\" y1=\"306\" x2=\"324\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"364\" y1=\"306\" x2=\"364\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"404\" y1=\"306\" x2=\"404\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"444\" y1=\"306\" x2=\"444\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"306\" x2=\"444\" y2=\"306\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"266\" x2=\"444\" y2=\"266\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"226\" x2=\"444\" y2=\"226\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"186\" x2=\"444\" y2=\"186\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"146\" x2=\"444\" y2=\"146\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"106\" x2=\"444\" y2=\"106\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"66\" x2=\"444\" y2=\"66\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"26\" x2=\"444\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"306\" x2=\"444\" y2=\"306\" stroke=\"#333333\" stroke-width=\"1.8\"/><line x1=\"284\" y1=\"306\" x2=\"284\" y2=\"26\" stroke=\"#333333\" stroke-width=\"1.8\"/><text x=\"44\" y=\"322\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">-6</text><text x=\"84\" y=\"322\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">-5</text><text x=\"124\" y=\"322\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">-4</text><text x=\"164\" y=\"322\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">-3</text><text x=\"204\" y=\"322\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">-2</text><text x=\"244\" y=\"322\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">-1</text><text x=\"284\" y=\"322\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">0</text><text x=\"324\" y=\"322\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">1</text><text x=\"364\" y=\"322\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">2</text><text x=\"404\" y=\"322\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">3</text><text x=\"444\" y=\"322\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">4</text><text x=\"276\" y=\"310\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">0</text><text x=\"276\" y=\"270\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">1</text><text x=\"276\" y=\"230\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">2</text><text x=\"276\" y=\"190\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">3</text><text x=\"276\" y=\"150\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">4</text><text x=\"276\" y=\"110\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">5</text><text x=\"276\" y=\"70\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">6</text><text x=\"276\" y=\"30\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">7</text><text x=\"456\" y=\"310\" font-family=\"sans-serif\" font-size=\"14\" font-style=\"italic\" fill=\"#333333\">x</text><text x=\"294\" y=\"18\" font-family=\"sans-serif\" font-size=\"14\" font-style=\"italic\" fill=\"#333333\">y</text><line x1=\"244\" y1=\"306\" x2=\"244\" y2=\"26\" stroke=\"#c0392b\" stroke-width=\"2\" stroke-dasharray=\"7 5\"/><text x=\"239\" y=\"40\" font-family=\"sans-serif\" font-size=\"13\" font-weight=\"bold\" fill=\"#c0392b\" text-anchor=\"end\">x = −1</text><circle cx=\"364\" cy=\"106\" r=\"4.5\" fill=\"#333333\"/><text x=\"374\" y=\"98\" font-family=\"sans-serif\" font-size=\"15\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"start\">P</text></svg></div>",
    "options": [
      {
        "text": "\\((-4, 5)\\)",
        "correct": true,
        "feedback": "Correct. P is \\(2 - (-1) = 3\\) to the right of the mirror line, so the image is 3 to the left of it: \\(-1 - 3 = -4\\). The y-coordinate stays 5, so the image is \\((-4, 5)\\)."
      },
      {
        "text": "\\((-3, 5)\\)",
        "correct": false,
        "feedback": "Measured the distance from the y-axis, 2, instead of from the line \\(x = -1\\), giving \\(-1 - 2 = -3\\), so \\((-3, 5)\\). The distance to use is 3."
      },
      {
        "text": "\\((-1, 5)\\)",
        "correct": false,
        "feedback": "Placed the image on the mirror line, giving \\((-1, 5)\\). The image is the same distance on the other side of the line, not on it."
      },
      {
        "text": "\\((-2, 5)\\)",
        "correct": false,
        "feedback": "Reflected in the y-axis by changing the sign of x, giving \\((-2, 5)\\). The mirror line is \\(x = -1\\), not the y-axis."
      }
    ],
    "backward": "Negative coordinates on a grid, Ch10.",
    "forward": "Later in this chapter you find mirror lines from a shape and its image."
  },
  {
    "itemId": "d9",
    "order": 9,
    "cluster": "C2",
    "clusterName": "Scale drawings",
    "question": "A rectangular room is 6 m by 4 m. It is drawn on a plan with scale \\(1:50\\). What is the perimeter of the room on the plan?",
    "options": [
      {
        "text": "0.4 cm",
        "correct": false,
        "feedback": "Divided the real perimeter, \\(2 \\times (6 + 4) = 20\\text{ m}\\), by 50 to get 0.4 cm without changing metres to centimetres. \\(20\\text{ m} = 2000\\text{ cm}\\), and \\(2000 \\div 50 = 40\\)."
      },
      {
        "text": "40 cm",
        "correct": true,
        "feedback": "Correct. \\(6\\text{ m} = 600\\text{ cm}\\) and \\(4\\text{ m} = 400\\text{ cm}\\). On the plan: \\(600 \\div 50 = 12\\text{ cm}\\) and \\(400 \\div 50 = 8\\text{ cm}\\). Perimeter = \\(12 + 8 + 12 + 8 = 40\\text{ cm}\\)."
      },
      {
        "text": "20 cm",
        "correct": false,
        "feedback": "Found the plan lengths, 12 cm and 8 cm, and added them once, \\(12 + 8 = 20\\text{ cm}\\). The perimeter goes all the way round: \\(2 \\times (12 + 8)\\)."
      },
      {
        "text": "2000 cm",
        "correct": false,
        "feedback": "Found the real perimeter, \\(2 \\times (600 + 400) = 2000\\text{ cm}\\), but did not apply the scale. Divide by 50 to get the length on the plan."
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
    "question": "The point A\\((3, 2)\\) is enlarged by scale factor 2 from the centre C\\((1, 1)\\). What are the coordinates of the image of A?",
    "options": [
      {
        "text": "\\((6, 4)\\)",
        "correct": false,
        "feedback": "Enlarged from the origin instead of C, doubling the coordinates, \\((3 \\times 2, 2 \\times 2) = (6, 4)\\). The centre here is C\\((1, 1)\\)."
      },
      {
        "text": "\\((4, 2)\\)",
        "correct": false,
        "feedback": "Doubled the movement from C, \\((4, 2)\\), but did not add C's coordinates back on. The image is C plus the doubled movement."
      },
      {
        "text": "\\((5, 4)\\)",
        "correct": false,
        "feedback": "Added the scale factor to each coordinate of A, \\((3 + 2, 2 + 2) = (5, 4)\\). An enlargement multiplies distances from the centre; it does not add."
      },
      {
        "text": "\\((5, 3)\\)",
        "correct": true,
        "feedback": "Correct. A is 2 right and 1 up from C. Doubling gives 4 right and 2 up from C, so the image is \\((1 + 4, 1 + 2) = (5, 3)\\)."
      }
    ],
    "backward": "Multiplying and coordinates, Ch10 and Ch11.",
    "forward": "Later in this chapter you find the centre of enlargement from a shape and its image."
  },
  {
    "itemId": "d11",
    "order": 11,
    "cluster": "C3",
    "clusterName": "Points on a line segment",
    "question": "M\\((2, 1)\\) is the midpoint of AB. A is the point \\((-1, 5)\\). What are the coordinates of B?",
    "options": [
      {
        "text": "\\((5, -3)\\)",
        "correct": true,
        "feedback": "Correct. From A to M the coordinates change by \\(2 - (-1) = 3\\) and \\(1 - 5 = -4\\). The same step again gives B: \\((2 + 3, 1 + (-4)) = (5, -3)\\)."
      },
      {
        "text": "\\((1, 6)\\)",
        "correct": false,
        "feedback": "Added the coordinates of A and M, \\(-1 + 2 = 1\\) and \\(5 + 1 = 6\\), giving \\((1, 6)\\). B is another step beyond M."
      },
      {
        "text": "\\((3, -4)\\)",
        "correct": false,
        "feedback": "Found the step from A to M, \\((3, -4)\\), and stopped. B is another step beyond M, so add this step to M."
      },
      {
        "text": "\\((0.5, 3)\\)",
        "correct": false,
        "feedback": "Found the midpoint of A and M, \\(((-1 + 2) \\div 2, (5 + 1) \\div 2) = (0.5, 3)\\), instead of continuing past M to B."
      }
    ],
    "backward": "Reading coordinates in all four quadrants, Ch10.",
    "forward": "Later in this chapter you divide lines in other ratios."
  },
  {
    "itemId": "d12",
    "order": 12,
    "cluster": "C6",
    "clusterName": "Mixed position and transformation problems",
    "question": "A is the point \\((2, 1)\\) and B is the point \\((8, 5)\\). The line AB is translated by the column vector \\(\\begin{pmatrix}-3\\\\4\\end{pmatrix}\\) to give A′B′. What are the coordinates of the midpoint of A′B′?",
    "options": [
      {
        "text": "\\((2, 7)\\)",
        "correct": true,
        "feedback": "Correct. The midpoint of AB is \\(((2 + 8) \\div 2, (1 + 5) \\div 2) = (5, 3)\\). Translate it: \\((5 + (-3), 3 + 4) = (2, 7)\\)."
      },
      {
        "text": "\\((5, 9)\\)",
        "correct": false,
        "feedback": "Found B′ = \\((8 - 3, 5 + 4) = (5, 9)\\) but not the midpoint of A′B′. The question asks for the midpoint."
      },
      {
        "text": "\\((5, 3)\\)",
        "correct": false,
        "feedback": "Found the midpoint of AB, \\((5, 3)\\), but did not translate it. The midpoint of A′B′ is needed."
      },
      {
        "text": "\\((8, -1)\\)",
        "correct": false,
        "feedback": "Moved the midpoint the wrong way, \\((5 + 3, 3 - 4) = (8, -1)\\). The vector \\(\\begin{pmatrix}-3\\\\4\\end{pmatrix}\\) means 3 left and 4 up."
      }
    ],
    "backward": "Reading and plotting coordinates, Ch10.",
    "forward": "Later in this chapter you combine translations with points on a line."
  },
  {
    "itemId": "d13",
    "order": 13,
    "cluster": "C1",
    "clusterName": "Bearings",
    "question": "The diagram shows the direction of town B from town A. What is the bearing of A from B?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 320 340\" width=\"320\" height=\"340\"><rect x=\"0\" y=\"0\" width=\"320\" height=\"340\" fill=\"#ffffff\"/><line x1=\"160\" y1=\"35\" x2=\"160\" y2=\"305\" stroke=\"#666666\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><text x=\"160\" y=\"27\" font-family=\"sans-serif\" font-size=\"15\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"middle\">N</text><text x=\"160\" y=\"323\" font-family=\"sans-serif\" font-size=\"15\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"middle\">S</text><line x1=\"160\" y1=\"170\" x2=\"109.29\" y2=\"278.76\" stroke=\"#333333\" stroke-width=\"2\"/><path d=\"M 160 208 A 38 38 0 0 1 143.94 204.44\" fill=\"none\" stroke=\"#c0392b\" stroke-width=\"2\"/><text x=\"148.1\" y=\"228.7\" font-family=\"sans-serif\" font-size=\"14\" font-weight=\"bold\" fill=\"#c0392b\" text-anchor=\"middle\">25°</text><circle cx=\"160\" cy=\"170\" r=\"4.5\" fill=\"#333333\"/><circle cx=\"109.29\" cy=\"278.76\" r=\"4.5\" fill=\"#333333\"/><text x=\"176\" y=\"174\" font-family=\"sans-serif\" font-size=\"15\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"middle\">A</text><text x=\"102.52\" y=\"298.26\" font-family=\"sans-serif\" font-size=\"15\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"middle\">B</text></svg></div>",
    "options": [
      {
        "text": "205°",
        "correct": false,
        "feedback": "Gave the bearing of B from A, 205°. The question asks for the bearing of A from B, which is a half turn different."
      },
      {
        "text": "025°",
        "correct": true,
        "feedback": "Correct. B is \\(180^\\circ + 25^\\circ = 205^\\circ\\) from A. The bearing of A from B is the back bearing: \\(205^\\circ - 180^\\circ = 25^\\circ\\), written 025°."
      },
      {
        "text": "155°",
        "correct": false,
        "feedback": "Subtracted from 180°, \\(180^\\circ - 25^\\circ = 155^\\circ\\). That would be the bearing if B were south-east of A, and it is not the back bearing."
      },
      {
        "text": "335°",
        "correct": false,
        "feedback": "Subtracted from 360°, \\(360^\\circ - 25^\\circ = 335^\\circ\\). That points towards the north-west; from B, A lies towards the north-east."
      }
    ],
    "backward": "Angles on a straight line and parallel lines, Ch5.",
    "forward": "Later in this chapter you use back bearings to plot return journeys."
  },
  {
    "itemId": "d14",
    "order": 14,
    "cluster": "C4",
    "clusterName": "Translations and reflections",
    "question": "The point P is shown on the grid. It is reflected in the dashed line. What are the coordinates of its image?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 340 512\" width=\"340\" height=\"512\"><rect x=\"0\" y=\"0\" width=\"340\" height=\"512\" fill=\"#ffffff\"/><line x1=\"44\" y1=\"468\" x2=\"44\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"78\" y1=\"468\" x2=\"78\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"112\" y1=\"468\" x2=\"112\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"146\" y1=\"468\" x2=\"146\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"180\" y1=\"468\" x2=\"180\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"214\" y1=\"468\" x2=\"214\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"248\" y1=\"468\" x2=\"248\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"282\" y1=\"468\" x2=\"282\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"316\" y1=\"468\" x2=\"316\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"468\" x2=\"316\" y2=\"468\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"434\" x2=\"316\" y2=\"434\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"400\" x2=\"316\" y2=\"400\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"366\" x2=\"316\" y2=\"366\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"332\" x2=\"316\" y2=\"332\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"298\" x2=\"316\" y2=\"298\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"264\" x2=\"316\" y2=\"264\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"230\" x2=\"316\" y2=\"230\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"196\" x2=\"316\" y2=\"196\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"162\" x2=\"316\" y2=\"162\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"128\" x2=\"316\" y2=\"128\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"94\" x2=\"316\" y2=\"94\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"60\" x2=\"316\" y2=\"60\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"26\" x2=\"316\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"196\" x2=\"316\" y2=\"196\" stroke=\"#333333\" stroke-width=\"1.8\"/><line x1=\"112\" y1=\"468\" x2=\"112\" y2=\"26\" stroke=\"#333333\" stroke-width=\"1.8\"/><text x=\"44\" y=\"212\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">-2</text><text x=\"78\" y=\"212\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">-1</text><text x=\"146\" y=\"212\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">1</text><text x=\"180\" y=\"212\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">2</text><text x=\"214\" y=\"212\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">3</text><text x=\"248\" y=\"212\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">4</text><text x=\"282\" y=\"212\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">5</text><text x=\"316\" y=\"212\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">6</text><text x=\"104\" y=\"472\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">-8</text><text x=\"104\" y=\"438\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">-7</text><text x=\"104\" y=\"404\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">-6</text><text x=\"104\" y=\"370\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">-5</text><text x=\"104\" y=\"336\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">-4</text><text x=\"104\" y=\"302\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">-3</text><text x=\"104\" y=\"268\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">-2</text><text x=\"104\" y=\"234\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">-1</text><text x=\"104\" y=\"166\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">1</text><text x=\"104\" y=\"132\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">2</text><text x=\"104\" y=\"98\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">3</text><text x=\"104\" y=\"64\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">4</text><text x=\"104\" y=\"30\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">5</text><text x=\"328\" y=\"200\" font-family=\"sans-serif\" font-size=\"14\" font-style=\"italic\" fill=\"#333333\">x</text><text x=\"122\" y=\"18\" font-family=\"sans-serif\" font-size=\"14\" font-style=\"italic\" fill=\"#333333\">y</text><line x1=\"44\" y1=\"264\" x2=\"316\" y2=\"264\" stroke=\"#c0392b\" stroke-width=\"2\" stroke-dasharray=\"7 5\"/><text x=\"312\" y=\"258\" font-family=\"sans-serif\" font-size=\"13\" font-weight=\"bold\" fill=\"#c0392b\" text-anchor=\"end\">y = −2</text><circle cx=\"214\" cy=\"94\" r=\"4.5\" fill=\"#333333\"/><text x=\"224\" y=\"86\" font-family=\"sans-serif\" font-size=\"15\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"start\">P</text></svg></div>",
    "options": [
      {
        "text": "\\((3, -2)\\)",
        "correct": false,
        "feedback": "Placed the image on the mirror line, giving \\((3, -2)\\). The image is the same distance on the other side of the line, 5 below it."
      },
      {
        "text": "\\((3, -7)\\)",
        "correct": true,
        "feedback": "Correct. P is \\(3 - (-2) = 5\\) above the mirror line, so the image is 5 below it: \\(-2 - 5 = -7\\). The x-coordinate stays 3, so the image is \\((3, -7)\\)."
      },
      {
        "text": "\\((3, -5)\\)",
        "correct": false,
        "feedback": "Used the y-coordinate of P, 3, as the distance from the line, giving \\(-2 - 3 = -5\\), so \\((3, -5)\\). The distance from P to the line is \\(3 - (-2) = 5\\)."
      },
      {
        "text": "\\((3, -3)\\)",
        "correct": false,
        "feedback": "Reflected in the x-axis \\((y = 0)\\) by changing the sign of y, giving \\((3, -3)\\). The mirror line here is \\(y = -2\\), so measure the distance from that line."
      }
    ],
    "backward": "Negative coordinates on a grid, Ch10.",
    "forward": "Ch14 uses mirror planes to describe symmetry in 3D shapes."
  },
  {
    "itemId": "d15",
    "order": 15,
    "cluster": "C2",
    "clusterName": "Scale drawings",
    "question": "On a map, 1 cm represents 400 m. Two villages are 6.5 cm apart on the map. How far apart are they in kilometres?",
    "options": [
      {
        "text": "260 km",
        "correct": false,
        "feedback": "Found 2600 m but divided by 10 to get 260 km. There are 1000 m in 1 km."
      },
      {
        "text": "26 km",
        "correct": false,
        "feedback": "Found 2600 m but divided by 100 instead of 1000 to get 26 km. There are 1000 m in 1 km."
      },
      {
        "text": "2600 km",
        "correct": false,
        "feedback": "Found \\(6.5 \\times 400 = 2600\\) and wrote it as 2600 km. The 2600 is in metres, so divide by 1000."
      },
      {
        "text": "2.6 km",
        "correct": true,
        "feedback": "Correct. \\(6.5 \\times 400 = 2600\\text{ m}\\). There are 1000 m in 1 km, so \\(2600 \\div 1000 = 2.6\\text{ km}\\)."
      }
    ],
    "backward": "Converting metres to kilometres, Ch7.",
    "forward": "Later in this chapter you use scales written as ratios in the same way."
  },
  {
    "itemId": "d16",
    "order": 16,
    "cluster": "C5",
    "clusterName": "Rotations and enlargements",
    "question": "Triangle ABC is mapped onto triangle A′B′C′ by a rotation, as shown. Which of these fully describes the rotation?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 320 430\" width=\"320\" height=\"430\"><rect x=\"0\" y=\"0\" width=\"320\" height=\"430\" fill=\"#ffffff\"/><line x1=\"44\" y1=\"386\" x2=\"44\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"80\" y1=\"386\" x2=\"80\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"116\" y1=\"386\" x2=\"116\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"152\" y1=\"386\" x2=\"152\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"188\" y1=\"386\" x2=\"188\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"224\" y1=\"386\" x2=\"224\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"260\" y1=\"386\" x2=\"260\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"296\" y1=\"386\" x2=\"296\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"386\" x2=\"296\" y2=\"386\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"350\" x2=\"296\" y2=\"350\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"314\" x2=\"296\" y2=\"314\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"278\" x2=\"296\" y2=\"278\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"242\" x2=\"296\" y2=\"242\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"206\" x2=\"296\" y2=\"206\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"170\" x2=\"296\" y2=\"170\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"134\" x2=\"296\" y2=\"134\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"98\" x2=\"296\" y2=\"98\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"62\" x2=\"296\" y2=\"62\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"26\" x2=\"296\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"170\" x2=\"296\" y2=\"170\" stroke=\"#333333\" stroke-width=\"1.8\"/><line x1=\"80\" y1=\"386\" x2=\"80\" y2=\"26\" stroke=\"#333333\" stroke-width=\"1.8\"/><text x=\"44\" y=\"186\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">-1</text><text x=\"116\" y=\"186\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">1</text><text x=\"152\" y=\"186\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">2</text><text x=\"188\" y=\"186\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">3</text><text x=\"224\" y=\"186\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">4</text><text x=\"260\" y=\"186\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">5</text><text x=\"296\" y=\"186\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">6</text><text x=\"72\" y=\"390\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">-6</text><text x=\"72\" y=\"354\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">-5</text><text x=\"72\" y=\"318\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">-4</text><text x=\"72\" y=\"282\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">-3</text><text x=\"72\" y=\"246\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">-2</text><text x=\"72\" y=\"210\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">-1</text><text x=\"72\" y=\"138\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">1</text><text x=\"72\" y=\"102\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">2</text><text x=\"72\" y=\"66\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">3</text><text x=\"72\" y=\"30\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">4</text><text x=\"308\" y=\"174\" font-family=\"sans-serif\" font-size=\"14\" font-style=\"italic\" fill=\"#333333\">x</text><text x=\"90\" y=\"18\" font-family=\"sans-serif\" font-size=\"14\" font-style=\"italic\" fill=\"#333333\">y</text><polygon points=\"152,134 260,134 152,62\" fill=\"#d6e6f5\" fill-opacity=\"0.75\" stroke=\"#1f4e79\" stroke-width=\"2.2\" stroke-linejoin=\"round\"/><circle cx=\"152\" cy=\"134\" r=\"3.5\" fill=\"#1f4e79\"/><text x=\"139.52\" y=\"147.32\" font-family=\"sans-serif\" font-size=\"15\" font-weight=\"bold\" fill=\"#1f4e79\" text-anchor=\"middle\">A</text><circle cx=\"260\" cy=\"134\" r=\"3.5\" fill=\"#1f4e79\"/><text x=\"274.23\" y=\"143.74\" font-family=\"sans-serif\" font-size=\"15\" font-weight=\"bold\" fill=\"#1f4e79\" text-anchor=\"middle\">B</text><circle cx=\"152\" cy=\"62\" r=\"3.5\" fill=\"#1f4e79\"/><text x=\"143\" y=\"55\" font-family=\"sans-serif\" font-size=\"15\" font-weight=\"bold\" fill=\"#1f4e79\" text-anchor=\"middle\">C</text><polygon points=\"116,242 116,350 188,242\" fill=\"#f7dcdc\" fill-opacity=\"0.75\" stroke=\"#8e2a2a\" stroke-width=\"2.2\" stroke-linejoin=\"round\"/><circle cx=\"116\" cy=\"242\" r=\"3.5\" fill=\"#8e2a2a\"/><text x=\"107.68\" y=\"234.52\" font-family=\"sans-serif\" font-size=\"15\" font-weight=\"bold\" fill=\"#8e2a2a\" text-anchor=\"middle\">A′</text><circle cx=\"116\" cy=\"350\" r=\"3.5\" fill=\"#8e2a2a\"/><text x=\"111.26\" y=\"369.23\" font-family=\"sans-serif\" font-size=\"15\" font-weight=\"bold\" fill=\"#8e2a2a\" text-anchor=\"middle\">B′</text><circle cx=\"188\" cy=\"242\" r=\"3.5\" fill=\"#8e2a2a\"/><text x=\"200\" y=\"238\" font-family=\"sans-serif\" font-size=\"15\" font-weight=\"bold\" fill=\"#8e2a2a\" text-anchor=\"middle\">C′</text><circle cx=\"80\" cy=\"170\" r=\"4.5\" fill=\"#333333\"/><text x=\"71\" y=\"187\" font-family=\"sans-serif\" font-size=\"15\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"end\">O</text></svg></div>",
    "options": [
      {
        "text": "90° anticlockwise about the origin",
        "correct": false,
        "feedback": "Chose 90° anticlockwise about the origin, the wrong direction. A 90° anticlockwise turn about the origin sends \\((x, y)\\) to \\((-y, x)\\), so A\\((2, 1)\\) would go to \\((-1, 2)\\), not to A′\\((1, -2)\\)."
      },
      {
        "text": "90° clockwise about the origin",
        "correct": true,
        "feedback": "Correct. A rotation of 90° clockwise about the origin sends \\((x, y)\\) to \\((y, -x)\\). A\\((2, 1)\\) goes to \\((1, -2)\\), which is A′, and C\\((2, 3)\\) goes to \\((3, -2)\\), which is C′. The origin is the point that stays fixed."
      },
      {
        "text": "180° about the origin",
        "correct": false,
        "feedback": "Chose 180° about the origin, a half-turn. A half-turn about the origin sends A\\((2, 1)\\) to \\((-2, -1)\\), not to A′\\((1, -2)\\)."
      },
      {
        "text": "90° clockwise about the point \\((1, 1)\\)",
        "correct": false,
        "feedback": "Chose 90° clockwise about the point \\((1, 1)\\), the right angle and direction but the wrong centre. About \\((1, 1)\\), A\\((2, 1)\\) would go to \\((1, 0)\\), not to A′\\((1, -2)\\). The centre is the point that does not move, which here is the origin."
      }
    ],
    "backward": "Coordinates, Ch10.",
    "forward": "Later in this chapter you describe other transformations by giving all of their details."
  },
  {
    "itemId": "d17",
    "order": 17,
    "cluster": "C6",
    "clusterName": "Mixed position and transformation problems",
    "question": "AB is a line 20 cm long. The point P lies on AB so that \\(\\mathrm{AP}:\\mathrm{PB} = 3:2\\). How long is AP?",
    "options": [
      {
        "text": "10 cm",
        "correct": false,
        "feedback": "Split the length equally, \\(20 \\div 2 = 10\\text{ cm}\\). A ratio of \\(3:2\\) is not an equal split."
      },
      {
        "text": "12 cm",
        "correct": true,
        "feedback": "Correct. AB is split into \\(3 + 2 = 5\\) equal parts, each \\(20 \\div 5 = 4\\text{ cm}\\). AP is 3 parts: \\(3 \\times 4 = 12\\text{ cm}\\)."
      },
      {
        "text": "4 cm",
        "correct": false,
        "feedback": "Found the size of one part, \\(20 \\div 5 = 4\\text{ cm}\\), and stopped. AP is 3 of those parts, so multiply by 3."
      },
      {
        "text": "8 cm",
        "correct": false,
        "feedback": "Found PB, 2 parts of \\(4\\text{ cm} = 8\\text{ cm}\\). AP is the part with 3 shares."
      }
    ],
    "backward": "Sharing in a ratio, Ch11.",
    "forward": "Later in this chapter you divide lines given by coordinates in a ratio."
  },
  {
    "itemId": "d18",
    "order": 18,
    "cluster": "C6",
    "clusterName": "Mixed position and transformation problems",
    "question": "The point P\\((3, 2)\\) is reflected in the y-axis. The image is then rotated 90° clockwise about the origin. What are the coordinates of the final image?",
    "options": [
      {
        "text": "\\((2, -3)\\)",
        "correct": false,
        "feedback": "Rotated P clockwise to \\((2, -3)\\) but did not reflect it first. Both transformations are needed."
      },
      {
        "text": "\\((-2, -3)\\)",
        "correct": false,
        "feedback": "Did the transformations in the wrong order: rotating first gives \\((2, -3)\\), and reflecting that in the y-axis gives \\((-2, -3)\\). Reflect first, then rotate."
      },
      {
        "text": "\\((2, 3)\\)",
        "correct": true,
        "feedback": "Correct. Reflect in the y-axis: \\((3, 2)\\) becomes \\((-3, 2)\\). Rotate 90° clockwise about the origin, \\((x, y)\\) to \\((y, -x)\\): \\((-3, 2)\\) becomes \\((2, 3)\\)."
      },
      {
        "text": "\\((-3, 2)\\)",
        "correct": false,
        "feedback": "Reflected P in the y-axis, \\((-3, 2)\\), but did not rotate it. Both transformations are needed."
      }
    ],
    "backward": "Reflections and coordinates, Ch10.",
    "forward": "Later in this chapter you describe combined transformations."
  },
  {
    "itemId": "d19",
    "order": 19,
    "cluster": "C6",
    "clusterName": "Mixed position and transformation problems",
    "question": "The diagram shows the route of a ship from P to Q to R. What is the size of angle PQR?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 302 300\" width=\"302\" height=\"300\"><rect x=\"0\" y=\"0\" width=\"302\" height=\"300\" fill=\"#ffffff\"/><line x1=\"84\" y1=\"130\" x2=\"84\" y2=\"60\" stroke=\"#666666\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><text x=\"84\" y=\"54\" font-family=\"sans-serif\" font-size=\"14\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"middle\">N</text><line x1=\"187.92\" y1=\"190\" x2=\"187.92\" y2=\"120\" stroke=\"#666666\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><text x=\"187.92\" y=\"114\" font-family=\"sans-serif\" font-size=\"14\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"middle\">N</text><line x1=\"84\" y1=\"130\" x2=\"187.92\" y2=\"190\" stroke=\"#333333\" stroke-width=\"2\"/><line x1=\"187.92\" y1=\"190\" x2=\"84.56\" y2=\"227.62\" stroke=\"#333333\" stroke-width=\"2\"/><path d=\"M 84 98 A 32 32 0 0 1 111.71 146\" fill=\"none\" stroke=\"#c0392b\" stroke-width=\"2\"/><text x=\"126.44\" y=\"110.5\" font-family=\"sans-serif\" font-size=\"14\" font-weight=\"bold\" fill=\"#c0392b\" text-anchor=\"middle\">120°</text><path d=\"M 187.92 162 A 28 28 0 1 1 161.61 199.58\" fill=\"none\" stroke=\"#c0392b\" stroke-width=\"2\"/><text x=\"224.78\" y=\"220.81\" font-family=\"sans-serif\" font-size=\"14\" font-weight=\"bold\" fill=\"#c0392b\" text-anchor=\"middle\">250°</text><circle cx=\"84\" cy=\"130\" r=\"4.5\" fill=\"#333333\"/><text x=\"68.41\" y=\"144\" font-family=\"sans-serif\" font-size=\"15\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"middle\">P</text><circle cx=\"187.92\" cy=\"190\" r=\"4.5\" fill=\"#333333\"/><text x=\"228.69\" y=\"199.4\" font-family=\"sans-serif\" font-size=\"15\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"middle\">Q</text><circle cx=\"84.56\" cy=\"227.62\" r=\"4.5\" fill=\"#333333\"/><text x=\"74.27\" y=\"246.16\" font-family=\"sans-serif\" font-size=\"15\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"middle\">R</text></svg></div>",
    "options": [
      {
        "text": "130°",
        "correct": false,
        "feedback": "Subtracted the bearings, \\(250^\\circ - 120^\\circ = 130^\\circ\\), without turning the first bearing into the bearing of P from Q."
      },
      {
        "text": "310°",
        "correct": false,
        "feedback": "Found the reflex angle, \\(360^\\circ - 50^\\circ = 310^\\circ\\). Angle PQR is the smaller angle between QP and QR."
      },
      {
        "text": "70°",
        "correct": false,
        "feedback": "Subtracted 180° from 250° to get 70°. The direction from Q back to P is \\(120^\\circ + 180^\\circ = 300^\\circ\\), so subtract the bearing of R from that: \\(300^\\circ - 250^\\circ\\)."
      },
      {
        "text": "50°",
        "correct": true,
        "feedback": "Correct. The bearing of P from Q is the back bearing, \\(120^\\circ + 180^\\circ = 300^\\circ\\). The bearing of R from Q is 250°, so angle PQR = \\(300^\\circ - 250^\\circ = 50^\\circ\\)."
      }
    ],
    "backward": "Angles on parallel lines and straight lines, Ch5.",
    "forward": "Later in this chapter you draw journeys like this on scale drawings."
  },
  {
    "itemId": "d20",
    "order": 20,
    "cluster": "C4",
    "clusterName": "Translations and reflections",
    "question": "The diagram shows triangle ABC and its image A′B′C′ after a translation. What are the coordinates of the image of the point \\((6, 6)\\) under the same translation?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 468 350\" width=\"468\" height=\"350\"><rect x=\"0\" y=\"0\" width=\"468\" height=\"350\" fill=\"#ffffff\"/><line x1=\"44\" y1=\"306\" x2=\"44\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"84\" y1=\"306\" x2=\"84\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"124\" y1=\"306\" x2=\"124\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"164\" y1=\"306\" x2=\"164\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"204\" y1=\"306\" x2=\"204\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"244\" y1=\"306\" x2=\"244\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"284\" y1=\"306\" x2=\"284\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"324\" y1=\"306\" x2=\"324\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"364\" y1=\"306\" x2=\"364\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"404\" y1=\"306\" x2=\"404\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"444\" y1=\"306\" x2=\"444\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"306\" x2=\"444\" y2=\"306\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"266\" x2=\"444\" y2=\"266\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"226\" x2=\"444\" y2=\"226\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"186\" x2=\"444\" y2=\"186\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"146\" x2=\"444\" y2=\"146\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"106\" x2=\"444\" y2=\"106\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"66\" x2=\"444\" y2=\"66\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"26\" x2=\"444\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"306\" x2=\"444\" y2=\"306\" stroke=\"#333333\" stroke-width=\"1.8\"/><line x1=\"44\" y1=\"306\" x2=\"44\" y2=\"26\" stroke=\"#333333\" stroke-width=\"1.8\"/><text x=\"44\" y=\"322\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">0</text><text x=\"84\" y=\"322\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">1</text><text x=\"124\" y=\"322\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">2</text><text x=\"164\" y=\"322\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">3</text><text x=\"204\" y=\"322\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">4</text><text x=\"244\" y=\"322\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">5</text><text x=\"284\" y=\"322\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">6</text><text x=\"324\" y=\"322\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">7</text><text x=\"364\" y=\"322\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">8</text><text x=\"404\" y=\"322\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">9</text><text x=\"444\" y=\"322\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">10</text><text x=\"36\" y=\"310\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">0</text><text x=\"36\" y=\"270\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">1</text><text x=\"36\" y=\"230\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">2</text><text x=\"36\" y=\"190\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">3</text><text x=\"36\" y=\"150\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">4</text><text x=\"36\" y=\"110\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">5</text><text x=\"36\" y=\"70\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">6</text><text x=\"36\" y=\"30\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">7</text><text x=\"456\" y=\"310\" font-family=\"sans-serif\" font-size=\"14\" font-style=\"italic\" fill=\"#333333\">x</text><text x=\"54\" y=\"18\" font-family=\"sans-serif\" font-size=\"14\" font-style=\"italic\" fill=\"#333333\">y</text><polygon points=\"84,186 164,186 84,106\" fill=\"#d6e6f5\" fill-opacity=\"0.75\" stroke=\"#1f4e79\" stroke-width=\"2.2\" stroke-linejoin=\"round\"/><circle cx=\"84\" cy=\"186\" r=\"3.5\" fill=\"#1f4e79\"/><text x=\"73.39\" y=\"201.61\" font-family=\"sans-serif\" font-size=\"15\" font-weight=\"bold\" fill=\"#1f4e79\" text-anchor=\"middle\">A</text><circle cx=\"164\" cy=\"186\" r=\"3.5\" fill=\"#1f4e79\"/><text x=\"177.42\" y=\"197.71\" font-family=\"sans-serif\" font-size=\"15\" font-weight=\"bold\" fill=\"#1f4e79\" text-anchor=\"middle\">B</text><circle cx=\"84\" cy=\"106\" r=\"3.5\" fill=\"#1f4e79\"/><text x=\"77.29\" y=\"97.58\" font-family=\"sans-serif\" font-size=\"15\" font-weight=\"bold\" fill=\"#1f4e79\" text-anchor=\"middle\">C</text><polygon points=\"204,266 284,266 204,186\" fill=\"#f7dcdc\" fill-opacity=\"0.75\" stroke=\"#8e2a2a\" stroke-width=\"2.2\" stroke-linejoin=\"round\"/><circle cx=\"204\" cy=\"266\" r=\"3.5\" fill=\"#8e2a2a\"/><text x=\"193.39\" y=\"281.61\" font-family=\"sans-serif\" font-size=\"15\" font-weight=\"bold\" fill=\"#8e2a2a\" text-anchor=\"middle\">A′</text><circle cx=\"284\" cy=\"266\" r=\"3.5\" fill=\"#8e2a2a\"/><text x=\"297.42\" y=\"277.71\" font-family=\"sans-serif\" font-size=\"15\" font-weight=\"bold\" fill=\"#8e2a2a\" text-anchor=\"middle\">B′</text><circle cx=\"204\" cy=\"186\" r=\"3.5\" fill=\"#8e2a2a\"/><text x=\"197.29\" y=\"177.58\" font-family=\"sans-serif\" font-size=\"15\" font-weight=\"bold\" fill=\"#8e2a2a\" text-anchor=\"middle\">C′</text></svg></div>",
    "options": [
      {
        "text": "\\((9, 4)\\)",
        "correct": true,
        "feedback": "Correct. A\\((1, 3)\\) moves to A′\\((4, 1)\\), a change of 3 across and \\(-2\\) vertically, so the vector is \\(\\begin{pmatrix}3\\\\-2\\end{pmatrix}\\). Apply it to \\((6, 6)\\): \\((6 + 3, 6 - 2) = (9, 4)\\)."
      },
      {
        "text": "\\((9, 8)\\)",
        "correct": false,
        "feedback": "Ignored the minus sign on the vertical move, \\((6 + 3, 6 + 2) = (9, 8)\\). The triangle has moved down, so the bottom entry is \\(-2\\)."
      },
      {
        "text": "\\((4, 9)\\)",
        "correct": false,
        "feedback": "Swapped the entries of the vector, \\(\\begin{pmatrix}-2\\\\3\\end{pmatrix}\\), giving \\((6 - 2, 6 + 3) = (4, 9)\\). The top entry is the horizontal move, 3, and the bottom entry is the vertical move, \\(-2\\)."
      },
      {
        "text": "\\((3, 8)\\)",
        "correct": false,
        "feedback": "Used the reverse vector, \\(\\begin{pmatrix}-3\\\\2\\end{pmatrix}\\): \\((6 - 3, 6 + 2) = (3, 8)\\). The vector goes from the original to the image."
      }
    ],
    "backward": "Reading coordinates from a grid, Ch10.",
    "forward": "Later in this chapter you describe translations by column vectors."
  },
  {
    "itemId": "d21",
    "order": 21,
    "cluster": "C2",
    "clusterName": "Scale drawings",
    "question": "The diagram shows a route ABC on a map with scale \\(1:20\\,000\\). What is the real length of the route in kilometres?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 242 169\" width=\"242\" height=\"169\"><rect x=\"0\" y=\"0\" width=\"242\" height=\"169\" fill=\"#ffffff\"/><line x1=\"46\" y1=\"114.94\" x2=\"103.85\" y2=\"46\" stroke=\"#333333\" stroke-width=\"2\"/><line x1=\"103.85\" y1=\"46\" x2=\"195.78\" y2=\"123.13\" stroke=\"#333333\" stroke-width=\"2\"/><text x=\"50.71\" y=\"65.15\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">4.5 cm</text><text x=\"165.82\" y=\"70.49\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">6 cm</text><circle cx=\"46\" cy=\"114.94\" r=\"4.5\" fill=\"#333333\"/><text x=\"29.68\" y=\"124.72\" font-family=\"sans-serif\" font-size=\"15\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"middle\">A</text><circle cx=\"103.85\" cy=\"46\" r=\"4.5\" fill=\"#333333\"/><text x=\"99.99\" y=\"34.44\" font-family=\"sans-serif\" font-size=\"15\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"middle\">B</text><circle cx=\"195.78\" cy=\"123.13\" r=\"4.5\" fill=\"#333333\"/><text x=\"211.81\" y=\"133.79\" font-family=\"sans-serif\" font-size=\"15\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"middle\">C</text></svg></div>",
    "options": [
      {
        "text": "1.2 km",
        "correct": false,
        "feedback": "Found the real length of the 6 cm section only, \\(6 \\times 20\\,000 = 120\\,000\\text{ cm} = 1.2\\text{ km}\\). Both sections are part of the route."
      },
      {
        "text": "0.21 km",
        "correct": false,
        "feedback": "Changed 210 000 cm into kilometres by dividing by 1 000 000, giving 0.21 km. There are 100 000 cm in 1 km."
      },
      {
        "text": "2.1 km",
        "correct": true,
        "feedback": "Correct. Total on the map: \\(4.5 + 6 = 10.5\\text{ cm}\\). Real length = \\(10.5 \\times 20\\,000 = 210\\,000\\text{ cm}\\). There are 100 000 cm in 1 km, so \\(210\\,000 \\div 100\\,000 = 2.1\\text{ km}\\)."
      },
      {
        "text": "0.9 km",
        "correct": false,
        "feedback": "Found the real length of the 4.5 cm section only, \\(4.5 \\times 20\\,000 = 90\\,000\\text{ cm} = 0.9\\text{ km}\\). Both sections are part of the route."
      }
    ],
    "backward": "Converting centimetres to kilometres, Ch7.",
    "forward": "Later in this chapter you use map scales together with bearings."
  },
  {
    "itemId": "d22",
    "order": 22,
    "cluster": "C5",
    "clusterName": "Rotations and enlargements",
    "question": "The diagram shows triangle ABC and its image A′B′C′ after an enlargement with centre O\\((1, 1)\\). What is the scale factor of the enlargement?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 428 430\" width=\"428\" height=\"430\"><rect x=\"0\" y=\"0\" width=\"428\" height=\"430\" fill=\"#ffffff\"/><line x1=\"44\" y1=\"386\" x2=\"44\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"80\" y1=\"386\" x2=\"80\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"116\" y1=\"386\" x2=\"116\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"152\" y1=\"386\" x2=\"152\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"188\" y1=\"386\" x2=\"188\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"224\" y1=\"386\" x2=\"224\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"260\" y1=\"386\" x2=\"260\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"296\" y1=\"386\" x2=\"296\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"332\" y1=\"386\" x2=\"332\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"368\" y1=\"386\" x2=\"368\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"404\" y1=\"386\" x2=\"404\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"386\" x2=\"404\" y2=\"386\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"350\" x2=\"404\" y2=\"350\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"314\" x2=\"404\" y2=\"314\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"278\" x2=\"404\" y2=\"278\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"242\" x2=\"404\" y2=\"242\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"206\" x2=\"404\" y2=\"206\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"170\" x2=\"404\" y2=\"170\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"134\" x2=\"404\" y2=\"134\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"98\" x2=\"404\" y2=\"98\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"62\" x2=\"404\" y2=\"62\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"26\" x2=\"404\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"386\" x2=\"404\" y2=\"386\" stroke=\"#333333\" stroke-width=\"1.8\"/><line x1=\"44\" y1=\"386\" x2=\"44\" y2=\"26\" stroke=\"#333333\" stroke-width=\"1.8\"/><text x=\"44\" y=\"402\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">0</text><text x=\"80\" y=\"402\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">1</text><text x=\"116\" y=\"402\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">2</text><text x=\"152\" y=\"402\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">3</text><text x=\"188\" y=\"402\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">4</text><text x=\"224\" y=\"402\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">5</text><text x=\"260\" y=\"402\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">6</text><text x=\"296\" y=\"402\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">7</text><text x=\"332\" y=\"402\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">8</text><text x=\"368\" y=\"402\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">9</text><text x=\"404\" y=\"402\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">10</text><text x=\"36\" y=\"390\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">0</text><text x=\"36\" y=\"354\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">1</text><text x=\"36\" y=\"318\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">2</text><text x=\"36\" y=\"282\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">3</text><text x=\"36\" y=\"246\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">4</text><text x=\"36\" y=\"210\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">5</text><text x=\"36\" y=\"174\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">6</text><text x=\"36\" y=\"138\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">7</text><text x=\"36\" y=\"102\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">8</text><text x=\"36\" y=\"66\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">9</text><text x=\"36\" y=\"30\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">10</text><text x=\"416\" y=\"390\" font-family=\"sans-serif\" font-size=\"14\" font-style=\"italic\" fill=\"#333333\">x</text><text x=\"54\" y=\"18\" font-family=\"sans-serif\" font-size=\"14\" font-style=\"italic\" fill=\"#333333\">y</text><polygon points=\"116,314 152,314 116,278\" fill=\"#d6e6f5\" fill-opacity=\"0.75\" stroke=\"#1f4e79\" stroke-width=\"2.2\" stroke-linejoin=\"round\"/><circle cx=\"116\" cy=\"314\" r=\"3.5\" fill=\"#1f4e79\"/><text x=\"105.39\" y=\"329.61\" font-family=\"sans-serif\" font-size=\"15\" font-weight=\"bold\" fill=\"#1f4e79\" text-anchor=\"middle\">A</text><circle cx=\"152\" cy=\"314\" r=\"3.5\" fill=\"#1f4e79\"/><text x=\"165.42\" y=\"325.71\" font-family=\"sans-serif\" font-size=\"15\" font-weight=\"bold\" fill=\"#1f4e79\" text-anchor=\"middle\">B</text><circle cx=\"116\" cy=\"278\" r=\"3.5\" fill=\"#1f4e79\"/><text x=\"109.29\" y=\"269.58\" font-family=\"sans-serif\" font-size=\"15\" font-weight=\"bold\" fill=\"#1f4e79\" text-anchor=\"middle\">C</text><polygon points=\"224,206 368,206 224,62\" fill=\"#f7dcdc\" fill-opacity=\"0.75\" stroke=\"#8e2a2a\" stroke-width=\"2.2\" stroke-linejoin=\"round\"/><circle cx=\"224\" cy=\"206\" r=\"3.5\" fill=\"#8e2a2a\"/><text x=\"213.39\" y=\"221.61\" font-family=\"sans-serif\" font-size=\"15\" font-weight=\"bold\" fill=\"#8e2a2a\" text-anchor=\"middle\">A′</text><circle cx=\"368\" cy=\"206\" r=\"3.5\" fill=\"#8e2a2a\"/><text x=\"381.42\" y=\"217.71\" font-family=\"sans-serif\" font-size=\"15\" font-weight=\"bold\" fill=\"#8e2a2a\" text-anchor=\"middle\">B′</text><circle cx=\"224\" cy=\"62\" r=\"3.5\" fill=\"#8e2a2a\"/><text x=\"217.29\" y=\"53.58\" font-family=\"sans-serif\" font-size=\"15\" font-weight=\"bold\" fill=\"#8e2a2a\" text-anchor=\"middle\">C′</text><circle cx=\"80\" cy=\"350\" r=\"4.5\" fill=\"#333333\"/><text x=\"71\" y=\"368\" font-family=\"sans-serif\" font-size=\"15\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"end\">O</text></svg></div>",
    "options": [
      {
        "text": "3",
        "correct": false,
        "feedback": "Compared the coordinates of A and A′ by subtraction, \\(5 - 2 = 3\\). The scale factor compares distances from the centre of enlargement."
      },
      {
        "text": "5",
        "correct": false,
        "feedback": "Used the coordinate of A′, 5, as the scale factor. Compare the distances from O instead: \\(4 \\div 1 = 4\\)."
      },
      {
        "text": "\\(\\frac{1}{4}\\)",
        "correct": false,
        "feedback": "Compared the distances the wrong way round, \\(1 \\div 4 = \\frac{1}{4}\\). The image is larger than the original, so the scale factor is more than 1."
      },
      {
        "text": "4",
        "correct": true,
        "feedback": "Correct. A is 1 across and 1 up from O\\((1, 1)\\); A′ is 4 across and 4 up. The distances from O are multiplied by 4 \\((4 \\div 1 = 4)\\). Check with B: B is 2 across from O and B′ is 8 across, and \\(8 \\div 2 = 4\\)."
      }
    ],
    "backward": "Ratio and comparing lengths, Ch11.",
    "forward": "Later in this chapter you find the centre of enlargement as well as the scale factor."
  },
  {
    "itemId": "d23",
    "order": 23,
    "cluster": "C6",
    "clusterName": "Mixed position and transformation problems",
    "question": "A is the point \\((-4, 1)\\) and B is the point \\((2, 7)\\). The point P lies on AB so that \\(\\mathrm{AP}:\\mathrm{PB} = 1:2\\). What are the coordinates of P?",
    "options": [
      {
        "text": "\\((-1, 4)\\)",
        "correct": false,
        "feedback": "Found the midpoint, \\((-1, 4)\\). A ratio of \\(1:2\\) is not an equal split."
      },
      {
        "text": "\\((2, 2)\\)",
        "correct": false,
        "feedback": "Found one-third of the step, \\((2, 2)\\), but did not add A's coordinates. P is A plus this step."
      },
      {
        "text": "\\((0, 5)\\)",
        "correct": false,
        "feedback": "Used \\(\\frac{2}{3}\\) of the way instead of \\(\\frac{1}{3}\\): \\(\\frac{2}{3}\\) of \\((6, 6)\\) is \\((4, 4)\\), giving \\((-4 + 4, 1 + 4) = (0, 5)\\). AP is the part with 1 share."
      },
      {
        "text": "\\((-2, 3)\\)",
        "correct": true,
        "feedback": "Correct. AB is split into \\(1 + 2 = 3\\) parts. The step from A to B is \\((6, 6)\\), so AP = \\(\\frac{1}{3}\\) of it = \\((2, 2)\\). P = \\((-4 + 2, 1 + 2) = (-2, 3)\\)."
      }
    ],
    "backward": "Fractions of an amount, Ch8, and ratio, Ch11.",
    "forward": "Later in this chapter you use the same method with other ratios."
  },
  {
    "itemId": "d24",
    "order": 24,
    "cluster": "C6",
    "clusterName": "Mixed position and transformation problems",
    "question": "P is the midpoint of A\\((2, 4)\\) and B\\((6, 8)\\). P is enlarged by scale factor 3 from the origin. What are the coordinates of the image of P?",
    "options": [
      {
        "text": "\\((12, 18)\\)",
        "correct": true,
        "feedback": "Correct. The midpoint is \\(((2 + 6) \\div 2, (4 + 8) \\div 2) = (4, 6)\\). Enlarge from the origin: \\((4 \\times 3, 6 \\times 3) = (12, 18)\\)."
      },
      {
        "text": "\\((18, 24)\\)",
        "correct": false,
        "feedback": "Enlarged B instead of the midpoint, \\((6 \\times 3, 8 \\times 3) = (18, 24)\\). The point to enlarge is P, the midpoint of AB."
      },
      {
        "text": "\\((4, 6)\\)",
        "correct": false,
        "feedback": "Found the midpoint, \\((4, 6)\\), but did not enlarge it. The question asks for the image of P."
      },
      {
        "text": "\\((7, 9)\\)",
        "correct": false,
        "feedback": "Added the scale factor to each coordinate of P, \\((4 + 3, 6 + 3) = (7, 9)\\). An enlargement multiplies the coordinates."
      }
    ],
    "backward": "Reading and multiplying coordinates, Ch10.",
    "forward": "Later in this chapter you combine enlargements with points on a line."
  }
];

const recheckItems = [
  {
    "itemId": "r1",
    "order": 1,
    "cluster": "C1",
    "clusterName": "Bearings",
    "question": "Town B is on a bearing of 340° from town A and town C is on a bearing of 025° from A. What is the size of angle BAC?",
    "options": [
      {
        "text": "315°",
        "correct": false,
        "feedback": "Subtracted the bearings, \\(340^\\circ - 25^\\circ = 315^\\circ\\). That is the reflex angle going the long way round through south; the angle across north is smaller."
      },
      {
        "text": "45°",
        "correct": true,
        "feedback": "Correct. B is \\(360^\\circ - 340^\\circ = 20^\\circ\\) to the left of north and C is 25° to the right of north, so angle BAC = \\(20^\\circ + 25^\\circ = 45^\\circ\\)."
      },
      {
        "text": "25°",
        "correct": false,
        "feedback": "Gave the angle of C from north, 25°, and left out the 20° on the other side of north. Angle BAC includes both parts."
      },
      {
        "text": "5°",
        "correct": false,
        "feedback": "Found \\(25^\\circ - 20^\\circ = 5^\\circ\\). B and C are on opposite sides of north, so the angles 20° and 25° add."
      }
    ],
    "backward": "Angles around a point, Ch5.",
    "forward": "Later in this chapter you use angles like this on scale drawings."
  },
  {
    "itemId": "r2",
    "order": 2,
    "cluster": "C2",
    "clusterName": "Scale drawings",
    "question": "A real car is 4.5 m long. A model of it is made to a scale of \\(1:30\\). How long is the model in centimetres?",
    "options": [
      {
        "text": "0.15 cm",
        "correct": false,
        "feedback": "Divided \\(4.5 \\div 30\\) to get 0.15 cm without changing metres to centimetres. \\(4.5\\text{ m} = 450\\text{ cm}\\), and \\(450 \\div 30 = 15\\)."
      },
      {
        "text": "15 cm",
        "correct": true,
        "feedback": "Correct. \\(4.5\\text{ m} = 450\\text{ cm}\\). Divide by the scale: \\(450 \\div 30 = 15\\text{ cm}\\)."
      },
      {
        "text": "1.5 cm",
        "correct": false,
        "feedback": "Used \\(4.5\\text{ m} = 45\\text{ cm}\\) instead of 450 cm, so \\(45 \\div 30 = 1.5\\text{ cm}\\). There are 100 cm in 1 m."
      },
      {
        "text": "135 cm",
        "correct": false,
        "feedback": "Multiplied \\(4.5 \\times 30 = 135\\text{ cm}\\). A model is smaller than the real car, so divide by the scale, after changing metres to centimetres."
      }
    ],
    "backward": "Converting metres to centimetres, Ch7.",
    "forward": "Later in this chapter you reverse this to find real lengths from a model."
  },
  {
    "itemId": "r3",
    "order": 3,
    "cluster": "C3",
    "clusterName": "Points on a line segment",
    "question": "M\\((-1, 4)\\) is the midpoint of AB. B is the point \\((3, 9)\\). What are the coordinates of A?",
    "options": [
      {
        "text": "\\((-5, -1)\\)",
        "correct": true,
        "feedback": "Correct. From B to M the coordinates change by \\(-1 - 3 = -4\\) and \\(4 - 9 = -5\\). The same step again gives A: \\((-1 - 4, 4 - 5) = (-5, -1)\\)."
      },
      {
        "text": "\\((4, 5)\\)",
        "correct": false,
        "feedback": "Found the step from M to B, \\((4, 5)\\), and stopped. A is the point reached by taking the same step the other way from M."
      },
      {
        "text": "\\((1, 6.5)\\)",
        "correct": false,
        "feedback": "Found the midpoint of M and B, \\(((-1 + 3) \\div 2, (4 + 9) \\div 2) = (1, 6.5)\\), instead of continuing past M to A."
      },
      {
        "text": "\\((2, 13)\\)",
        "correct": false,
        "feedback": "Added the coordinates of M and B, \\(-1 + 3 = 2\\) and \\(4 + 9 = 13\\), giving \\((2, 13)\\). A is another step beyond M, the same size as the step from B to M."
      }
    ],
    "backward": "Negative numbers on a grid, Ch10.",
    "forward": "Later in this chapter you divide lines in other ratios."
  },
  {
    "itemId": "r4",
    "order": 4,
    "cluster": "C4",
    "clusterName": "Translations and reflections",
    "question": "A translation takes P\\((-3, 2)\\) to P′\\((1, -1)\\). What are the coordinates of the image of Q\\((4, 5)\\) under the same translation?",
    "options": [
      {
        "text": "\\((0, 8)\\)",
        "correct": false,
        "feedback": "Used the reverse vector, \\(\\begin{pmatrix}-4\\\\3\\end{pmatrix}\\): \\((4 - 4, 5 + 3) = (0, 8)\\). The vector goes from P to P′."
      },
      {
        "text": "\\((8, 2)\\)",
        "correct": true,
        "feedback": "Correct. P moves \\(1 - (-3) = 4\\) across and \\(-1 - 2 = -3\\) vertically, so the vector is \\(\\begin{pmatrix}4\\\\-3\\end{pmatrix}\\). Apply it to Q: \\((4 + 4, 5 + (-3)) = (8, 2)\\)."
      },
      {
        "text": "\\((8, 8)\\)",
        "correct": false,
        "feedback": "Ignored the minus sign on the vertical move: \\((4 + 4, 5 + 3) = (8, 8)\\). P has moved down, so the bottom entry is \\(-3\\)."
      },
      {
        "text": "\\((1, -1)\\)",
        "correct": false,
        "feedback": "Gave P′, \\((1, -1)\\), which is the image of P. The question asks for the image of Q."
      }
    ],
    "backward": "Reading coordinates, Ch10.",
    "forward": "Later in this chapter you describe translations by column vectors."
  },
  {
    "itemId": "r5",
    "order": 5,
    "cluster": "C5",
    "clusterName": "Rotations and enlargements",
    "question": "A triangle has sides 6 cm, 8 cm and 10 cm. It is enlarged by scale factor \\(\\frac{3}{2}\\). What is the perimeter of the enlarged triangle?",
    "options": [
      {
        "text": "36 cm",
        "correct": true,
        "feedback": "Correct. The original perimeter is \\(6 + 8 + 10 = 24\\text{ cm}\\). Every length is multiplied by the scale factor, so the new perimeter is \\(24 \\times \\frac{3}{2} = 36\\text{ cm}\\)."
      },
      {
        "text": "25.5 cm",
        "correct": false,
        "feedback": "Added the scale factor to the perimeter, \\(24 + \\frac{3}{2} = 25.5\\text{ cm}\\). A scale factor multiplies lengths."
      },
      {
        "text": "16 cm",
        "correct": false,
        "feedback": "Divided by the scale factor, which is the same as multiplying by \\(\\frac{2}{3}\\): \\(24 \\times \\frac{2}{3} = 16\\text{ cm}\\). A scale factor greater than 1 makes the shape larger, so multiply."
      },
      {
        "text": "24 cm",
        "correct": false,
        "feedback": "Found the original perimeter, \\(6 + 8 + 10 = 24\\text{ cm}\\), but did not enlarge it."
      }
    ],
    "backward": "Perimeter, Ch7, and fractions of an amount, Ch8.",
    "forward": "Later in this chapter you meet enlargements of other shapes."
  },
  {
    "itemId": "r6",
    "order": 6,
    "cluster": "C6",
    "clusterName": "Mixed position and transformation problems",
    "question": "B is on a bearing of 070° from A. The point B′ is the reflection of B in the vertical line through A (the north-south line). What is the bearing of B′ from A?",
    "options": [
      {
        "text": "070°",
        "correct": false,
        "feedback": "Gave the original bearing, 070°. B′ is on the other side of the mirror line, so its bearing is different."
      },
      {
        "text": "110°",
        "correct": false,
        "feedback": "Used \\(180^\\circ - 70^\\circ = 110^\\circ\\), which reflects B in the east-west line instead. The mirror line here is vertical."
      },
      {
        "text": "250°",
        "correct": false,
        "feedback": "Used \\(180^\\circ + 70^\\circ = 250^\\circ\\), which is a half-turn about A, not a reflection."
      },
      {
        "text": "290°",
        "correct": true,
        "feedback": "Correct. Reflecting in the north-south line through A swaps east and west, so B′ is the same angle from north but on the other side: \\(360^\\circ - 70^\\circ = 290^\\circ\\)."
      }
    ],
    "backward": "Angles around a point and reflection, Ch5 and Ch10.",
    "forward": "Later in this chapter you describe reflections by their mirror line."
  },
  {
    "itemId": "r7",
    "order": 7,
    "cluster": "C1",
    "clusterName": "Bearings",
    "question": "A hiker walks 4 km due south and then 4 km due east. What is the bearing of the start from the finish?",
    "options": [
      {
        "text": "135°",
        "correct": false,
        "feedback": "Gave the bearing of the finish from the start, 135°. The question asks for the bearing of the start from the finish, which is a half turn different."
      },
      {
        "text": "225°",
        "correct": false,
        "feedback": "Used the 225° bearing of south-west. From the finish the start lies back towards the north-west."
      },
      {
        "text": "315°",
        "correct": true,
        "feedback": "Correct. The two legs are equal, so the finish is south-east of the start, on a bearing of 135° from the start. The bearing of the start from the finish is the back bearing: \\(135^\\circ + 180^\\circ = 315^\\circ\\)."
      },
      {
        "text": "045°",
        "correct": false,
        "feedback": "Used the 045° bearing of north-east. From the finish the start lies back towards the north-west."
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
    "question": "On a map with scale \\(1:50\\,000\\), a lake is 2.4 cm wide. What is the real width of the lake in metres?",
    "options": [
      {
        "text": "12 000 m",
        "correct": false,
        "feedback": "Found 120 000 cm but divided by 10 instead of 100, giving 12 000 m. There are 100 cm in 1 m."
      },
      {
        "text": "120 000 m",
        "correct": false,
        "feedback": "Found \\(2.4 \\times 50\\,000 = 120\\,000\\) but did not convert from centimetres to metres, so wrote 120 000 m. Divide by 100."
      },
      {
        "text": "120 m",
        "correct": false,
        "feedback": "Found 120 000 cm but divided by 1000 instead of 100, giving 120 m. There are 100 cm in 1 m."
      },
      {
        "text": "1200 m",
        "correct": true,
        "feedback": "Correct. Real width = \\(2.4 \\times 50\\,000 = 120\\,000\\text{ cm}\\). There are 100 cm in 1 m, so \\(120\\,000 \\div 100 = 1200\\text{ m}\\)."
      }
    ],
    "backward": "Converting centimetres to metres, Ch7.",
    "forward": "Later in this chapter you use map scales with bearings."
  },
  {
    "itemId": "r9",
    "order": 9,
    "cluster": "C6",
    "clusterName": "Mixed position and transformation problems",
    "question": "A is the point \\((2, 3)\\) and B is the point \\((12, 13)\\). The point P lies on AB so that \\(\\mathrm{AP}:\\mathrm{PB} = 3:2\\). What are the coordinates of P?",
    "options": [
      {
        "text": "\\((8, 9)\\)",
        "correct": true,
        "feedback": "Correct. AP is 3 of the \\(3 + 2 = 5\\) equal parts of AB. The step from A to B is \\((10, 10)\\), so AP = \\(\\frac{3}{5}\\) of it = \\((6, 6)\\). P = \\((2 + 6, 3 + 6) = (8, 9)\\)."
      },
      {
        "text": "\\((4, 5)\\)",
        "correct": false,
        "feedback": "Found only one share, a fifth of the way: \\((10 \\div 5, 10 \\div 5) = (2, 2)\\) from A, giving \\((4, 5)\\). AP is 3 shares, so triple that step."
      },
      {
        "text": "\\((6, 7)\\)",
        "correct": false,
        "feedback": "Used \\(\\frac{2}{5}\\) of the way instead of \\(\\frac{3}{5}\\): \\(\\frac{2}{5}\\) of \\((10, 10)\\) is \\((4, 4)\\), giving \\((2 + 4, 3 + 4) = (6, 7)\\). AP is the part with 3 shares."
      },
      {
        "text": "\\((7, 8)\\)",
        "correct": false,
        "feedback": "Found the midpoint, \\((7, 8)\\). A ratio of \\(3:2\\) is not an equal split."
      }
    ],
    "backward": "Fractions of an amount, Ch8, and ratio, Ch11.",
    "forward": "Later in this chapter you use the same method with other ratios."
  },
  {
    "itemId": "r10",
    "order": 10,
    "cluster": "C4",
    "clusterName": "Translations and reflections",
    "question": "The point P\\((6, 3)\\) is reflected to give the image P′\\((6, -1)\\). What is the equation of the mirror line?",
    "options": [
      {
        "text": "\\(y = -1\\)",
        "correct": false,
        "feedback": "Used the y-coordinate of the image, giving \\(y = -1\\). The mirror line is halfway between a point and its image."
      },
      {
        "text": "\\(y = 2\\)",
        "correct": false,
        "feedback": "Halved the distance between P and P′, \\((3 - (-1)) \\div 2 = 2\\), giving \\(y = 2\\). That is the distance from each point to the mirror line; the line is at \\(-1 + 2 = 1\\)."
      },
      {
        "text": "\\(y = 1\\)",
        "correct": true,
        "feedback": "Correct. The mirror line is halfway between P and P′: \\((3 + (-1)) \\div 2 = 1\\), so the line is \\(y = 1\\)."
      },
      {
        "text": "\\(x = 6\\)",
        "correct": false,
        "feedback": "Used the common x-coordinate, giving \\(x = 6\\). The points are reflected up and down, so the mirror line is horizontal, of the form y = b."
      }
    ],
    "backward": "Equations of horizontal lines, Ch10.",
    "forward": "Later in this chapter you find the mirror line for any reflection."
  },
  {
    "itemId": "r11",
    "order": 11,
    "cluster": "C5",
    "clusterName": "Rotations and enlargements",
    "question": "The point A\\((4, 3)\\) is enlarged by scale factor 3 from the centre C\\((2, 1)\\). What are the coordinates of the image of A?",
    "options": [
      {
        "text": "\\((6, 6)\\)",
        "correct": false,
        "feedback": "Tripled the movement from C, \\((6, 6)\\), but did not add C's coordinates back on. The image is C plus the tripled movement."
      },
      {
        "text": "\\((7, 6)\\)",
        "correct": false,
        "feedback": "Added the scale factor to each coordinate of A, \\((4 + 3, 3 + 3) = (7, 6)\\). An enlargement multiplies distances from the centre; it does not add."
      },
      {
        "text": "\\((12, 9)\\)",
        "correct": false,
        "feedback": "Enlarged from the origin instead of C, tripling the coordinates, \\((4 \\times 3, 3 \\times 3) = (12, 9)\\). The centre here is C\\((2, 1)\\)."
      },
      {
        "text": "\\((8, 7)\\)",
        "correct": true,
        "feedback": "Correct. A is 2 right and 2 up from C. Tripling gives 6 right and 6 up from C, so the image is \\((2 + 6, 1 + 6) = (8, 7)\\)."
      }
    ],
    "backward": "Multiplying and coordinates, Ch10 and Ch11.",
    "forward": "Later in this chapter you find the centre of enlargement from a shape and its image."
  },
  {
    "itemId": "r12",
    "order": 12,
    "cluster": "C6",
    "clusterName": "Mixed position and transformation problems",
    "question": "A plan has a scale of \\(1:200\\). It is enlarged on a photocopier by scale factor 2. On the enlarged plan a wall measures 5 cm. What is the real length of the wall in metres?",
    "options": [
      {
        "text": "2.5 m",
        "correct": false,
        "feedback": "Divided by the photocopier factor, \\(5 \\div 2 = 2.5\\text{ cm}\\), but then did not apply the scale \\(1:200\\), so stopped at 2.5 m. Real length = \\(2.5 \\times 200 = 500\\text{ cm} = 5\\text{ m}\\)."
      },
      {
        "text": "20 m",
        "correct": false,
        "feedback": "Multiplied by the photocopier factor, \\(5 \\times 2 = 10\\text{ cm}\\), and then \\(10 \\times 200 = 2000\\text{ cm} = 20\\text{ m}\\). The enlarged plan is bigger than the original, so divide by 2 first."
      },
      {
        "text": "5 m",
        "correct": true,
        "feedback": "Correct. The enlarged plan is twice the size of the original, so the wall measures \\(5 \\div 2 = 2.5\\text{ cm}\\) on the original plan. Real length = \\(2.5 \\times 200 = 500\\text{ cm} = 5\\text{ m}\\)."
      },
      {
        "text": "10 m",
        "correct": false,
        "feedback": "Ignored the photocopier and used the scale on the enlarged plan: \\(5 \\times 200 = 1000\\text{ cm} = 10\\text{ m}\\). The scale \\(1:200\\) belongs to the original plan."
      }
    ],
    "backward": "Ratio and converting units, Ch11 and Ch7.",
    "forward": "Later in this chapter you meet enlargements and scale drawings together."
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
  title: "Position and Transformation — Advanced Core",
  subtitle: "Grade 8 · Level 2 · Advanced Core",
  description: "Bearings with angle facts, map scales, dividing segments in a ratio, and describing translations, reflections, rotations and enlargements — warm-up, diagnostic, and spaced recheck.",
  clusterNames: CLUSTER_NAMES,
  gateReviewHTML: "<p><strong>Warm-up done.</strong> Next comes the diagnostic. It is not a test and it is not timed, so there is no prize for speed. This level asks for two steps in most questions: first find what you need (a back bearing, a scale factor, a vector, the distance to a mirror line), then use it. Write each step down before you choose an answer. For each question, ask yourself first: which direction am I measuring from, and which centre or line is the transformation using? If a question feels awkward, that tells us exactly where to look next, so it is useful, not a failure.</p><p>You will meet all six topics, mixed together. Take your time.</p>",
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

// Position and Transformation — Grade 8, Level 1 (Core Fluency).
// Warm-up, diagnostic and spaced recheck items.
// Run with: node seed/mathSeedCh13PositionTransformationL1.js
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-8";
const GRADE_LABEL = "Grade 8";
const CHAPTER_SLUG = "ch-13-position-transformation";
const CHAPTER_NAME = "Position and Transformation";
const LEVEL = 1;

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
    "question": "What is the three-figure bearing of south-east?",
    "options": [
      {
        "text": "045°",
        "correct": false,
        "feedback": "Gave the bearing of north-east, 045°, which is halfway between north (000°) and east (090°). South-east is between east (090°) and south (180°)."
      },
      {
        "text": "225°",
        "correct": false,
        "feedback": "Gave the bearing of south-west, 225°, which is halfway between south (180°) and west (270°). South-east is between east and south."
      },
      {
        "text": "135°",
        "correct": true,
        "feedback": "Correct. Bearings are measured clockwise from north. East is 090° and south is 180°, and south-east is halfway between them: \\((90^\\circ + 180^\\circ) \\div 2 = 135^\\circ\\)."
      },
      {
        "text": "315°",
        "correct": false,
        "feedback": "Gave the bearing of north-west, 315°, which is halfway between west (270°) and north (360°). South-east is between east (090°) and south (180°)."
      }
    ],
    "retryHint": "Bearings are measured clockwise from north. Write down the bearings of east and south, then decide where south-east sits between them.",
    "backward": "Quarter turns and angles on a straight line, Ch5.",
    "forward": "Later in this chapter you use bearings to plot journeys on scale drawings."
  },
  {
    "itemId": "w2",
    "order": 2,
    "cluster": "C4",
    "clusterName": "Translations and reflections",
    "question": "The point \\((3, 5)\\) is translated by the column vector \\(\\begin{pmatrix}-2\\\\4\\end{pmatrix}\\). What are the coordinates of its image?",
    "options": [
      {
        "text": "\\((1, 1)\\)",
        "correct": false,
        "feedback": "Subtracted the 4 from the y-coordinate, \\(5 - 4 = 1\\), giving \\((1, 1)\\). The bottom entry 4 is positive, so move 4 units up: \\(5 + 4 = 9\\)."
      },
      {
        "text": "\\((-6, 20)\\)",
        "correct": false,
        "feedback": "Multiplied the coordinates by the vector entries, \\(3 \\times (-2) = -6\\) and \\(5 \\times 4 = 20\\), giving \\((-6, 20)\\). A translation adds the entries to the coordinates; it does not multiply."
      },
      {
        "text": "\\((5, 9)\\)",
        "correct": false,
        "feedback": "Ignored the minus sign on \\(-2\\) and added 2 to the x-coordinate, \\(3 + 2 = 5\\), giving \\((5, 9)\\). The top entry \\(-2\\) means move 2 units to the left."
      },
      {
        "text": "\\((1, 9)\\)",
        "correct": true,
        "feedback": "Correct. Add the top entry to the x-coordinate and the bottom entry to the y-coordinate: \\(3 + (-2) = 1\\) and \\(5 + 4 = 9\\), so the image is \\((1, 9)\\)."
      }
    ],
    "retryHint": "A column vector gives the move in x (top entry) and then the move in y (bottom entry). Add each entry to the matching coordinate, keeping its sign.",
    "backward": "Reading and plotting coordinates, Ch10.",
    "forward": "Later in this chapter you work out the vector from a shape and its image."
  },
  {
    "itemId": "w3",
    "order": 3,
    "cluster": "C2",
    "clusterName": "Scale drawings",
    "question": "On a map, 1 cm represents 4 km. Two towns are 5 cm apart on the map. How far apart are they in real life?",
    "options": [
      {
        "text": "0.8 km",
        "correct": false,
        "feedback": "Divided \\(4 \\div 5 = 0.8\\text{ km}\\). Each of the 5 centimetres stands for 4 km, so multiply \\(5 \\times 4\\)."
      },
      {
        "text": "20 km",
        "correct": true,
        "feedback": "Correct. Each centimetre stands for 4 km, so 5 cm stands for \\(5 \\times 4 = 20\\text{ km}\\)."
      },
      {
        "text": "9 km",
        "correct": false,
        "feedback": "Added \\(5 + 4 = 9\\text{ km}\\). The scale says each centimetre stands for 4 km, so multiply the 5 cm by 4."
      },
      {
        "text": "1.25 km",
        "correct": false,
        "feedback": "Divided \\(5 \\div 4 = 1.25\\text{ km}\\). Real distances are bigger than map distances, so multiply by 4 instead."
      }
    ],
    "retryHint": "Each centimetre on the map stands for the same real distance. How many of those distances fit into 5 cm?",
    "backward": "Scaling up a ratio, Ch11.",
    "forward": "Later in this chapter you meet scales written as ratios, such as \\(1:50\\,000\\)."
  },
  {
    "itemId": "w4",
    "order": 4,
    "cluster": "C5",
    "clusterName": "Rotations and enlargements",
    "question": "A rectangle measures 4 cm by 6 cm. It is enlarged by scale factor 3. What are the dimensions of the enlarged rectangle?",
    "options": [
      {
        "text": "7 cm by 9 cm",
        "correct": false,
        "feedback": "Added 3 to each length, \\(4 + 3 = 7\\) and \\(6 + 3 = 9\\), giving 7 cm by 9 cm. A scale factor multiplies every length."
      },
      {
        "text": "12 cm by 6 cm",
        "correct": false,
        "feedback": "Multiplied only the 4 cm side by 3, giving 12 cm by 6 cm. Every side, including the 6 cm side, must be multiplied by the scale factor."
      },
      {
        "text": "\\(\\frac{4}{3}\\text{ cm}\\) by 2 cm",
        "correct": false,
        "feedback": "Divided each length by 3, \\(4 \\div 3\\) and \\(6 \\div 3\\), giving \\(\\frac{4}{3}\\text{ cm}\\) by 2 cm. A scale factor greater than 1 makes the shape larger, so multiply."
      },
      {
        "text": "12 cm by 18 cm",
        "correct": true,
        "feedback": "Correct. Every length is multiplied by the scale factor: \\(4 \\times 3 = 12\\) and \\(6 \\times 3 = 18\\)."
      }
    ],
    "retryHint": "Every length in the shape is multiplied by the scale factor. Do this for both sides of the rectangle.",
    "backward": "Multiplying lengths and ratio, Ch11.",
    "forward": "Later in this chapter you enlarge shapes from a centre of enlargement."
  },
  {
    "itemId": "w5",
    "order": 5,
    "cluster": "C3",
    "clusterName": "Points on a line segment",
    "question": "A is the point \\((2, 4)\\) and B is the point \\((8, 10)\\). What are the coordinates of the midpoint of AB?",
    "options": [
      {
        "text": "\\((5, 7)\\)",
        "correct": true,
        "feedback": "Correct. Add the x-coordinates and halve: \\((2 + 8) \\div 2 = 5\\). Add the y-coordinates and halve: \\((4 + 10) \\div 2 = 7\\). The midpoint is \\((5, 7)\\)."
      },
      {
        "text": "\\((3, 3)\\)",
        "correct": false,
        "feedback": "Halved the differences, \\((8 - 2) \\div 2 = 3\\) and \\((10 - 4) \\div 2 = 3\\), giving \\((3, 3)\\). That is half the move from A to B, not the position of the midpoint."
      },
      {
        "text": "\\((6, 6)\\)",
        "correct": false,
        "feedback": "Found the differences, \\(8 - 2 = 6\\) and \\(10 - 4 = 6\\), giving \\((6, 6)\\), and stopped. These are the full moves from A to B, not the midpoint."
      },
      {
        "text": "\\((10, 14)\\)",
        "correct": false,
        "feedback": "Added the coordinates without halving, \\(2 + 8 = 10\\) and \\(4 + 10 = 14\\), giving \\((10, 14)\\). The midpoint is halfway, so halve each total."
      }
    ],
    "retryHint": "The midpoint's x-coordinate is halfway between the two x-coordinates, and the same goes for y. How do you find the number halfway between two numbers?",
    "backward": "Halving numbers and reading coordinates, Ch10.",
    "forward": "Later in this chapter you find points that divide a line in other ratios."
  },
  {
    "itemId": "w6",
    "order": 6,
    "cluster": "C1",
    "clusterName": "Bearings",
    "question": "The bearing of B from A is 070°. What is the bearing of A from B?",
    "options": [
      {
        "text": "250°",
        "correct": true,
        "feedback": "Correct. Looking back from B points the opposite way, a half turn, so add 180°: \\(70^\\circ + 180^\\circ = 250^\\circ\\)."
      },
      {
        "text": "070°",
        "correct": false,
        "feedback": "Gave the same bearing again, 070°. Looking back from B points the opposite way, so the bearing changes by a half turn."
      },
      {
        "text": "110°",
        "correct": false,
        "feedback": "Subtracted from 180°, \\(180^\\circ - 70^\\circ = 110^\\circ\\). The back bearing is a half turn round from the original, so add 180°."
      },
      {
        "text": "290°",
        "correct": false,
        "feedback": "Subtracted from 360°, \\(360^\\circ - 70^\\circ = 290^\\circ\\). That is the angle going the other way round from north, not the back bearing, which is \\(70^\\circ + 180^\\circ\\)."
      }
    ],
    "retryHint": "Looking back from B points the opposite way, which is a half turn. How many degrees is a half turn?",
    "backward": "Parallel lines and angles on a straight line, Ch5.",
    "forward": "Later in this chapter you use back bearings to plot return journeys."
  },
  {
    "itemId": "w7",
    "order": 7,
    "cluster": "C4",
    "clusterName": "Translations and reflections",
    "question": "The point \\((4, 3)\\) is reflected in the y-axis. What are the coordinates of its image?",
    "options": [
      {
        "text": "\\((4, -3)\\)",
        "correct": false,
        "feedback": "Reflected in the x-axis instead, changing the sign of the y-coordinate to give \\((4, -3)\\). The y-axis is the vertical line, so the point moves to the other side, left or right."
      },
      {
        "text": "\\((-4, -3)\\)",
        "correct": false,
        "feedback": "Changed both signs, giving \\((-4, -3)\\). That is a half-turn about the origin, not a reflection in one axis."
      },
      {
        "text": "\\((-4, 3)\\)",
        "correct": true,
        "feedback": "Correct. A reflection in the y-axis keeps the y-coordinate and changes the sign of the x-coordinate, so \\((4, 3)\\) becomes \\((-4, 3)\\)."
      },
      {
        "text": "\\((3, 4)\\)",
        "correct": false,
        "feedback": "Swapped the coordinates, giving \\((3, 4)\\). That reflects in the line \\(y = x\\). A mirror in the y-axis keeps the height and flips the point to the other side."
      }
    ],
    "retryHint": "The y-axis is the vertical axis. A point reflected in it stays at the same height. Which coordinate changes?",
    "backward": "Negative coordinates on the axes, Ch10.",
    "forward": "Ch14 uses reflection to describe symmetry in 3D shapes."
  },
  {
    "itemId": "w8",
    "order": 8,
    "cluster": "C5",
    "clusterName": "Rotations and enlargements",
    "question": "The point \\((3, 1)\\) is rotated 180° about the origin. What are the coordinates of its image?",
    "options": [
      {
        "text": "\\((3, -1)\\)",
        "correct": false,
        "feedback": "Changed only the sign of the y-coordinate, giving \\((3, -1)\\). That is a reflection in the x-axis. A half-turn needs both signs to change."
      },
      {
        "text": "\\((-3, -1)\\)",
        "correct": true,
        "feedback": "Correct. A half-turn about the origin changes the sign of both coordinates, so \\((3, 1)\\) becomes \\((-3, -1)\\)."
      },
      {
        "text": "\\((1, 3)\\)",
        "correct": false,
        "feedback": "Swapped the coordinates, giving \\((1, 3)\\). That is a reflection in \\(y = x\\). A rotation of 180° gives the point directly opposite through the origin."
      },
      {
        "text": "\\((-3, 1)\\)",
        "correct": false,
        "feedback": "Changed only the sign of the x-coordinate, giving \\((-3, 1)\\). That is a reflection in the y-axis. A half-turn sends the point to the opposite side of the origin, so both signs change."
      }
    ],
    "retryHint": "A rotation of 180° sends a point to the opposite side of the centre, the same distance away. What happens to each coordinate?",
    "backward": "Coordinates in all four quadrants, Ch10.",
    "forward": "Ch14 describes rotational symmetry in 3D shapes using turns like this."
  }
];

const diagnosticItems = [
  {
    "itemId": "d1",
    "order": 1,
    "cluster": "C1",
    "clusterName": "Bearings",
    "question": "The diagram shows the direction of town B from town A. What is the bearing of B from A?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 320 340\" width=\"320\" height=\"340\"><rect x=\"0\" y=\"0\" width=\"320\" height=\"340\" fill=\"#ffffff\"/><line x1=\"160\" y1=\"35\" x2=\"160\" y2=\"305\" stroke=\"#666666\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><text x=\"160\" y=\"27\" font-family=\"sans-serif\" font-size=\"15\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"middle\">N</text><text x=\"160\" y=\"323\" font-family=\"sans-serif\" font-size=\"15\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"middle\">S</text><line x1=\"160\" y1=\"170\" x2=\"228.83\" y2=\"268.3\" stroke=\"#333333\" stroke-width=\"2\"/><path d=\"M 160 208 A 38 38 0 0 0 181.8 201.13\" fill=\"none\" stroke=\"#c0392b\" stroke-width=\"2\"/><text x=\"176.54\" y=\"227.45\" font-family=\"sans-serif\" font-size=\"14\" font-weight=\"bold\" fill=\"#c0392b\" text-anchor=\"middle\">35°</text><circle cx=\"160\" cy=\"170\" r=\"4.5\" fill=\"#333333\"/><circle cx=\"228.83\" cy=\"268.3\" r=\"4.5\" fill=\"#333333\"/><text x=\"144\" y=\"174\" font-family=\"sans-serif\" font-size=\"15\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"middle\">A</text><text x=\"238.01\" y=\"286.4\" font-family=\"sans-serif\" font-size=\"15\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"middle\">B</text></svg></div>",
    "options": [
      {
        "text": "035°",
        "correct": false,
        "feedback": "Used the marked angle, 35°, as the bearing, giving 035°. That angle is measured from south; a bearing is measured clockwise from north."
      },
      {
        "text": "215°",
        "correct": false,
        "feedback": "Added the angle to 180°, \\(180^\\circ + 35^\\circ = 215^\\circ\\). B is east of the south line, so the bearing is less than 180°: \\(180^\\circ - 35^\\circ\\)."
      },
      {
        "text": "325°",
        "correct": false,
        "feedback": "Subtracted the angle from 360°, \\(360^\\circ - 35^\\circ = 325^\\circ\\). That points north-west of A; B is south-east."
      },
      {
        "text": "145°",
        "correct": true,
        "feedback": "Correct. South is 180° clockwise from north, and B is 35° back towards the east, so the bearing is \\(180^\\circ - 35^\\circ = 145^\\circ\\)."
      }
    ],
    "backward": "Angles on a straight line, Ch5.",
    "forward": "Later in this chapter you draw bearings like this on scale drawings."
  },
  {
    "itemId": "d2",
    "order": 2,
    "cluster": "C4",
    "clusterName": "Translations and reflections",
    "question": "Triangle ABC is shown on the grid. It is translated 5 units to the right and 2 units down. What are the coordinates of the image of C?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 428 310\" width=\"428\" height=\"310\"><rect x=\"0\" y=\"0\" width=\"428\" height=\"310\" fill=\"#ffffff\"/><line x1=\"44\" y1=\"266\" x2=\"44\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"84\" y1=\"266\" x2=\"84\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"124\" y1=\"266\" x2=\"124\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"164\" y1=\"266\" x2=\"164\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"204\" y1=\"266\" x2=\"204\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"244\" y1=\"266\" x2=\"244\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"284\" y1=\"266\" x2=\"284\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"324\" y1=\"266\" x2=\"324\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"364\" y1=\"266\" x2=\"364\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"404\" y1=\"266\" x2=\"404\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"266\" x2=\"404\" y2=\"266\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"226\" x2=\"404\" y2=\"226\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"186\" x2=\"404\" y2=\"186\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"146\" x2=\"404\" y2=\"146\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"106\" x2=\"404\" y2=\"106\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"66\" x2=\"404\" y2=\"66\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"26\" x2=\"404\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"266\" x2=\"404\" y2=\"266\" stroke=\"#333333\" stroke-width=\"1.8\"/><line x1=\"44\" y1=\"266\" x2=\"44\" y2=\"26\" stroke=\"#333333\" stroke-width=\"1.8\"/><text x=\"44\" y=\"282\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">0</text><text x=\"84\" y=\"282\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">1</text><text x=\"124\" y=\"282\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">2</text><text x=\"164\" y=\"282\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">3</text><text x=\"204\" y=\"282\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">4</text><text x=\"244\" y=\"282\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">5</text><text x=\"284\" y=\"282\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">6</text><text x=\"324\" y=\"282\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">7</text><text x=\"364\" y=\"282\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">8</text><text x=\"404\" y=\"282\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">9</text><text x=\"36\" y=\"270\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">0</text><text x=\"36\" y=\"230\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">1</text><text x=\"36\" y=\"190\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">2</text><text x=\"36\" y=\"150\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">3</text><text x=\"36\" y=\"110\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">4</text><text x=\"36\" y=\"70\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">5</text><text x=\"36\" y=\"30\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">6</text><text x=\"416\" y=\"270\" font-family=\"sans-serif\" font-size=\"14\" font-style=\"italic\" fill=\"#333333\">x</text><text x=\"54\" y=\"18\" font-family=\"sans-serif\" font-size=\"14\" font-style=\"italic\" fill=\"#333333\">y</text><polygon points=\"84,226 204,226 84,146\" fill=\"#d6e6f5\" fill-opacity=\"0.75\" stroke=\"#1f4e79\" stroke-width=\"2.2\" stroke-linejoin=\"round\"/><circle cx=\"84\" cy=\"226\" r=\"3.5\" fill=\"#1f4e79\"/><text x=\"71.52\" y=\"239.32\" font-family=\"sans-serif\" font-size=\"15\" font-weight=\"bold\" fill=\"#1f4e79\" text-anchor=\"middle\">A</text><circle cx=\"204\" cy=\"226\" r=\"3.5\" fill=\"#1f4e79\"/><text x=\"218.23\" y=\"235.74\" font-family=\"sans-serif\" font-size=\"15\" font-weight=\"bold\" fill=\"#1f4e79\" text-anchor=\"middle\">B</text><circle cx=\"84\" cy=\"146\" r=\"3.5\" fill=\"#1f4e79\"/><text x=\"75\" y=\"139\" font-family=\"sans-serif\" font-size=\"15\" font-weight=\"bold\" fill=\"#1f4e79\" text-anchor=\"middle\">C</text></svg></div>",
    "options": [
      {
        "text": "\\((6, 1)\\)",
        "correct": true,
        "feedback": "Correct. Move C\\((1, 3)\\) 5 to the right, \\(1 + 5 = 6\\), and 2 down, \\(3 - 2 = 1\\), so the image of C is \\((6, 1)\\)."
      },
      {
        "text": "\\((6, 5)\\)",
        "correct": false,
        "feedback": "Moved 5 to the right but 2 up, \\(3 + 2 = 5\\), giving \\((6, 5)\\). Down means the y-coordinate decreases."
      },
      {
        "text": "\\((3, 8)\\)",
        "correct": false,
        "feedback": "Swapped the two moves, 2 right and 5 up, \\(1 + 2 = 3\\) and \\(3 + 5 = 8\\), giving \\((3, 8)\\). The 5 is the horizontal move and the 2 is the vertical move."
      },
      {
        "text": "\\((-4, 5)\\)",
        "correct": false,
        "feedback": "Moved the triangle the wrong way, 5 left and 2 up, \\(1 - 5 = -4\\) and \\(3 + 2 = 5\\), giving \\((-4, 5)\\). Right means add to x and down means subtract from y."
      }
    ],
    "backward": "Reading coordinates from a grid, Ch10.",
    "forward": "Later in this chapter you describe a translation from a shape and its image using a column vector."
  },
  {
    "itemId": "d3",
    "order": 3,
    "cluster": "C2",
    "clusterName": "Scale drawings",
    "question": "A plan uses a scale of \\(1:500\\). A wall measures 8 cm on the plan. How long is the real wall in metres?",
    "options": [
      {
        "text": "400 000 m",
        "correct": false,
        "feedback": "Found \\(8 \\times 500 = 4000\\text{ cm}\\) and then multiplied by 100 instead of dividing, \\(4000 \\times 100 = 400\\,000\\text{ m}\\). To change centimetres to metres, divide by 100."
      },
      {
        "text": "4000 m",
        "correct": false,
        "feedback": "Found \\(8 \\times 500 = 4000\\) but left it in centimetres and wrote 4000 m. Divide by 100 to change centimetres to metres."
      },
      {
        "text": "40 m",
        "correct": true,
        "feedback": "Correct. Real length = \\(8 \\times 500 = 4000\\text{ cm}\\). There are 100 cm in 1 m, so \\(4000 \\div 100 = 40\\text{ m}\\)."
      },
      {
        "text": "400 m",
        "correct": false,
        "feedback": "Found 4000 cm but divided by 10 instead of 100 to get 400 m. There are 100 cm in 1 m, so \\(4000 \\div 100 = 40\\)."
      }
    ],
    "backward": "Converting between centimetres and metres, Ch7.",
    "forward": "Later in this chapter you reverse this to draw a plan at a given scale."
  },
  {
    "itemId": "d4",
    "order": 4,
    "cluster": "C5",
    "clusterName": "Rotations and enlargements",
    "question": "Triangle PQR is shown on the grid. It is rotated 90° clockwise about the origin O. What are the coordinates of the image of P?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 468 470\" width=\"468\" height=\"470\"><rect x=\"0\" y=\"0\" width=\"468\" height=\"470\" fill=\"#ffffff\"/><line x1=\"44\" y1=\"426\" x2=\"44\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"84\" y1=\"426\" x2=\"84\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"124\" y1=\"426\" x2=\"124\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"164\" y1=\"426\" x2=\"164\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"204\" y1=\"426\" x2=\"204\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"244\" y1=\"426\" x2=\"244\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"284\" y1=\"426\" x2=\"284\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"324\" y1=\"426\" x2=\"324\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"364\" y1=\"426\" x2=\"364\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"404\" y1=\"426\" x2=\"404\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"444\" y1=\"426\" x2=\"444\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"426\" x2=\"444\" y2=\"426\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"386\" x2=\"444\" y2=\"386\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"346\" x2=\"444\" y2=\"346\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"306\" x2=\"444\" y2=\"306\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"266\" x2=\"444\" y2=\"266\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"226\" x2=\"444\" y2=\"226\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"186\" x2=\"444\" y2=\"186\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"146\" x2=\"444\" y2=\"146\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"106\" x2=\"444\" y2=\"106\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"66\" x2=\"444\" y2=\"66\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"26\" x2=\"444\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"226\" x2=\"444\" y2=\"226\" stroke=\"#333333\" stroke-width=\"1.8\"/><line x1=\"244\" y1=\"426\" x2=\"244\" y2=\"26\" stroke=\"#333333\" stroke-width=\"1.8\"/><text x=\"44\" y=\"242\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">-5</text><text x=\"84\" y=\"242\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">-4</text><text x=\"124\" y=\"242\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">-3</text><text x=\"164\" y=\"242\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">-2</text><text x=\"204\" y=\"242\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">-1</text><text x=\"284\" y=\"242\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">1</text><text x=\"324\" y=\"242\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">2</text><text x=\"364\" y=\"242\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">3</text><text x=\"404\" y=\"242\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">4</text><text x=\"444\" y=\"242\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">5</text><text x=\"236\" y=\"430\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">-5</text><text x=\"236\" y=\"390\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">-4</text><text x=\"236\" y=\"350\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">-3</text><text x=\"236\" y=\"310\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">-2</text><text x=\"236\" y=\"270\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">-1</text><text x=\"236\" y=\"190\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">1</text><text x=\"236\" y=\"150\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">2</text><text x=\"236\" y=\"110\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">3</text><text x=\"236\" y=\"70\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">4</text><text x=\"236\" y=\"30\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">5</text><text x=\"456\" y=\"230\" font-family=\"sans-serif\" font-size=\"14\" font-style=\"italic\" fill=\"#333333\">x</text><text x=\"254\" y=\"18\" font-family=\"sans-serif\" font-size=\"14\" font-style=\"italic\" fill=\"#333333\">y</text><polygon points=\"324,106 324,186 404,186\" fill=\"#d6e6f5\" fill-opacity=\"0.75\" stroke=\"#1f4e79\" stroke-width=\"2.2\" stroke-linejoin=\"round\"/><circle cx=\"324\" cy=\"106\" r=\"3.5\" fill=\"#1f4e79\"/><text x=\"317.29\" y=\"97.58\" font-family=\"sans-serif\" font-size=\"15\" font-weight=\"bold\" fill=\"#1f4e79\" text-anchor=\"middle\">P</text><circle cx=\"324\" cy=\"186\" r=\"3.5\" fill=\"#1f4e79\"/><text x=\"313.39\" y=\"201.61\" font-family=\"sans-serif\" font-size=\"15\" font-weight=\"bold\" fill=\"#1f4e79\" text-anchor=\"middle\">Q</text><circle cx=\"404\" cy=\"186\" r=\"3.5\" fill=\"#1f4e79\"/><text x=\"417.42\" y=\"197.71\" font-family=\"sans-serif\" font-size=\"15\" font-weight=\"bold\" fill=\"#1f4e79\" text-anchor=\"middle\">R</text><circle cx=\"244\" cy=\"226\" r=\"4.5\" fill=\"#333333\"/><text x=\"235\" y=\"243\" font-family=\"sans-serif\" font-size=\"15\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"end\">O</text></svg></div>",
    "options": [
      {
        "text": "\\((-3, 2)\\)",
        "correct": false,
        "feedback": "Turned anticlockwise instead of clockwise, so \\((x, y)\\) goes to \\((-y, x)\\), giving \\((-3, 2)\\). A clockwise turn takes the point from the top right towards the bottom right."
      },
      {
        "text": "\\((3, -2)\\)",
        "correct": true,
        "feedback": "Correct. A quarter-turn clockwise about the origin sends \\((x, y)\\) to \\((y, -x)\\), so P\\((2, 3)\\) goes to \\((3, -2)\\). The line OP, pointing up and to the right, turns to point down and to the right."
      },
      {
        "text": "\\((-2, -3)\\)",
        "correct": false,
        "feedback": "Turned through 180°, changing both signs, giving \\((-2, -3)\\). A quarter-turn is only half of that."
      },
      {
        "text": "\\((2, -3)\\)",
        "correct": false,
        "feedback": "Changed only the sign of the y-coordinate, giving \\((2, -3)\\). That is a reflection in the x-axis. A rotation also swaps the roles of the coordinates."
      }
    ],
    "backward": "Coordinates in all four quadrants, Ch10.",
    "forward": "Later in this chapter you describe a rotation by giving its centre and angle."
  },
  {
    "itemId": "d5",
    "order": 5,
    "cluster": "C3",
    "clusterName": "Points on a line segment",
    "question": "A is the point \\((-4, 2)\\) and B is the point \\((6, 8)\\). What are the coordinates of the midpoint of AB?",
    "options": [
      {
        "text": "\\((5, 3)\\)",
        "correct": false,
        "feedback": "Halved the differences, \\((6 - (-4)) \\div 2 = 5\\) and \\((8 - 2) \\div 2 = 3\\), giving \\((5, 3)\\). That is half the move from A to B; add it to A to reach the midpoint."
      },
      {
        "text": "\\((5, 5)\\)",
        "correct": false,
        "feedback": "Treated \\(-4\\) as \\(+4\\), so \\(x = (4 + 6) \\div 2 = 5\\), giving \\((5, 5)\\). With the sign, \\(x = (-4 + 6) \\div 2 = 1\\)."
      },
      {
        "text": "\\((1, 5)\\)",
        "correct": true,
        "feedback": "Correct. x: \\((-4 + 6) \\div 2 = 1\\). y: \\((2 + 8) \\div 2 = 5\\). The midpoint is \\((1, 5)\\)."
      },
      {
        "text": "\\((2, 10)\\)",
        "correct": false,
        "feedback": "Added the coordinates without halving, \\(-4 + 6 = 2\\) and \\(2 + 8 = 10\\), giving \\((2, 10)\\). Halve each total to get the midpoint."
      }
    ],
    "backward": "Reading coordinates in all four quadrants, Ch10.",
    "forward": "Later in this chapter you find points a fraction of the way along a line."
  },
  {
    "itemId": "d6",
    "order": 6,
    "cluster": "C6",
    "clusterName": "Mixed position and transformation problems",
    "question": "On a map, 1 cm represents 5 km. Town B is 4 cm from town A, on a bearing of 060° from A. How far is B from A in real life, and what is the bearing of A from B?",
    "options": [
      {
        "text": "20 km, 240°",
        "correct": true,
        "feedback": "Correct. Distance: \\(4 \\times 5 = 20\\text{ km}\\). Back bearing: \\(60^\\circ + 180^\\circ = 240^\\circ\\)."
      },
      {
        "text": "20 km, 120°",
        "correct": false,
        "feedback": "Found the distance correctly but used \\(180^\\circ - 60^\\circ = 120^\\circ\\) for the bearing, giving 20 km, 120°. The bearing of A from B is found by adding 180°: \\(60^\\circ + 180^\\circ = 240^\\circ\\)."
      },
      {
        "text": "20 km, 060°",
        "correct": false,
        "feedback": "Found the distance correctly, \\(4 \\times 5 = 20\\text{ km}\\), but gave the bearing of B from A again, 20 km, 060°. The bearing of A from B is a half turn different: \\(60^\\circ + 180^\\circ\\)."
      },
      {
        "text": "9 km, 240°",
        "correct": false,
        "feedback": "Found the back bearing correctly, \\(60^\\circ + 180^\\circ = 240^\\circ\\), but added \\(4 + 5 = 9\\) for the distance, giving 9 km, 240°. Each centimetre is 5 km, so multiply: \\(4 \\times 5\\)."
      }
    ],
    "backward": "Scales as ratios, Ch11, and angles on parallel lines, Ch5.",
    "forward": "Later problems in this chapter place towns on a plan using a distance and a bearing."
  },
  {
    "itemId": "d7",
    "order": 7,
    "cluster": "C1",
    "clusterName": "Bearings",
    "question": "The diagram shows town B and town A. What is the three-figure bearing of B from A?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 320 340\" width=\"320\" height=\"340\"><rect x=\"0\" y=\"0\" width=\"320\" height=\"340\" fill=\"#ffffff\"/><line x1=\"160\" y1=\"35\" x2=\"160\" y2=\"170\" stroke=\"#666666\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><text x=\"160\" y=\"27\" font-family=\"sans-serif\" font-size=\"15\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"middle\">N</text><line x1=\"160\" y1=\"170\" x2=\"68.07\" y2=\"92.87\" stroke=\"#333333\" stroke-width=\"2\"/><path d=\"M 160 132 A 38 38 0 0 0 130.89 145.57\" fill=\"none\" stroke=\"#c0392b\" stroke-width=\"2\"/><text x=\"136.76\" y=\"125.15\" font-family=\"sans-serif\" font-size=\"14\" font-weight=\"bold\" fill=\"#c0392b\" text-anchor=\"middle\">50°</text><circle cx=\"160\" cy=\"170\" r=\"4.5\" fill=\"#333333\"/><circle cx=\"68.07\" cy=\"92.87\" r=\"4.5\" fill=\"#333333\"/><text x=\"176\" y=\"174\" font-family=\"sans-serif\" font-size=\"15\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"middle\">A</text><text x=\"55.82\" y=\"87.58\" font-family=\"sans-serif\" font-size=\"15\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"middle\">B</text></svg></div>",
    "options": [
      {
        "text": "050°",
        "correct": false,
        "feedback": "Used the marked angle, 50°, as the bearing, giving 050°. That angle is measured anticlockwise from north; bearings go clockwise."
      },
      {
        "text": "130°",
        "correct": false,
        "feedback": "Subtracted from 180°, \\(180^\\circ - 50^\\circ = 130^\\circ\\). That puts B south-east of A; B is north-west."
      },
      {
        "text": "230°",
        "correct": false,
        "feedback": "Added the angle to 180°, \\(180^\\circ + 50^\\circ = 230^\\circ\\). That points south-west; B is north-west of A."
      },
      {
        "text": "310°",
        "correct": true,
        "feedback": "Correct. A bearing is measured clockwise from north, but B is 50° anticlockwise from north. A full turn is 360°, so the bearing is \\(360^\\circ - 50^\\circ = 310^\\circ\\)."
      }
    ],
    "backward": "Angles around a point, Ch5.",
    "forward": "Later in this chapter you read bearings from scale drawings in the same way."
  },
  {
    "itemId": "d8",
    "order": 8,
    "cluster": "C4",
    "clusterName": "Translations and reflections",
    "question": "Triangle PQR is shown on the grid. It is reflected in the dashed line. What are the coordinates of the image of P?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 348 310\" width=\"348\" height=\"310\"><rect x=\"0\" y=\"0\" width=\"348\" height=\"310\" fill=\"#ffffff\"/><line x1=\"44\" y1=\"266\" x2=\"44\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"84\" y1=\"266\" x2=\"84\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"124\" y1=\"266\" x2=\"124\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"164\" y1=\"266\" x2=\"164\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"204\" y1=\"266\" x2=\"204\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"244\" y1=\"266\" x2=\"244\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"284\" y1=\"266\" x2=\"284\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"324\" y1=\"266\" x2=\"324\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"266\" x2=\"324\" y2=\"266\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"226\" x2=\"324\" y2=\"226\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"186\" x2=\"324\" y2=\"186\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"146\" x2=\"324\" y2=\"146\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"106\" x2=\"324\" y2=\"106\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"66\" x2=\"324\" y2=\"66\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"26\" x2=\"324\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"266\" x2=\"324\" y2=\"266\" stroke=\"#333333\" stroke-width=\"1.8\"/><line x1=\"44\" y1=\"266\" x2=\"44\" y2=\"26\" stroke=\"#333333\" stroke-width=\"1.8\"/><text x=\"44\" y=\"282\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">0</text><text x=\"84\" y=\"282\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">1</text><text x=\"124\" y=\"282\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">2</text><text x=\"164\" y=\"282\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">3</text><text x=\"204\" y=\"282\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">4</text><text x=\"244\" y=\"282\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">5</text><text x=\"284\" y=\"282\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">6</text><text x=\"324\" y=\"282\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">7</text><text x=\"36\" y=\"270\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">0</text><text x=\"36\" y=\"230\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">1</text><text x=\"36\" y=\"190\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">2</text><text x=\"36\" y=\"150\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">3</text><text x=\"36\" y=\"110\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">4</text><text x=\"36\" y=\"70\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">5</text><text x=\"36\" y=\"30\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">6</text><text x=\"336\" y=\"270\" font-family=\"sans-serif\" font-size=\"14\" font-style=\"italic\" fill=\"#333333\">x</text><text x=\"54\" y=\"18\" font-family=\"sans-serif\" font-size=\"14\" font-style=\"italic\" fill=\"#333333\">y</text><line x1=\"164\" y1=\"266\" x2=\"164\" y2=\"26\" stroke=\"#c0392b\" stroke-width=\"2\" stroke-dasharray=\"7 5\"/><text x=\"169\" y=\"40\" font-family=\"sans-serif\" font-size=\"13\" font-weight=\"bold\" fill=\"#c0392b\" text-anchor=\"start\">x = 3</text><polygon points=\"84,106 84,186 124,186\" fill=\"#d6e6f5\" fill-opacity=\"0.75\" stroke=\"#1f4e79\" stroke-width=\"2.2\" stroke-linejoin=\"round\"/><circle cx=\"84\" cy=\"106\" r=\"3.5\" fill=\"#1f4e79\"/><text x=\"80.36\" y=\"96.45\" font-family=\"sans-serif\" font-size=\"15\" font-weight=\"bold\" fill=\"#1f4e79\" text-anchor=\"middle\">P</text><circle cx=\"84\" cy=\"186\" r=\"3.5\" fill=\"#1f4e79\"/><text x=\"77.29\" y=\"204.42\" font-family=\"sans-serif\" font-size=\"15\" font-weight=\"bold\" fill=\"#1f4e79\" text-anchor=\"middle\">Q</text><circle cx=\"124\" cy=\"186\" r=\"3.5\" fill=\"#1f4e79\"/><text x=\"134.61\" y=\"201.61\" font-family=\"sans-serif\" font-size=\"15\" font-weight=\"bold\" fill=\"#1f4e79\" text-anchor=\"middle\">R</text></svg></div>",
    "options": [
      {
        "text": "\\((4, 4)\\)",
        "correct": false,
        "feedback": "Moved P 3 units to the right, using the 3 in \\(x = 3\\) as the distance, giving \\((4, 4)\\). The distance to use is from P to the mirror line, \\(3 - 1 = 2\\), and then the same distance on the other side."
      },
      {
        "text": "\\((3, 4)\\)",
        "correct": false,
        "feedback": "Placed the image on the mirror line, giving \\((3, 4)\\). The image is the same distance on the other side of the line, not on it."
      },
      {
        "text": "\\((-1, 4)\\)",
        "correct": false,
        "feedback": "Reflected in the y-axis by changing the sign of x, giving \\((-1, 4)\\). The mirror line here is \\(x = 3\\), so measure the distance from that line."
      },
      {
        "text": "\\((5, 4)\\)",
        "correct": true,
        "feedback": "Correct. P is \\(3 - 1 = 2\\) to the left of the mirror line, so the image is 2 to the right of it: \\(3 + 2 = 5\\). The y-coordinate stays 4, so the image is \\((5, 4)\\)."
      }
    ],
    "backward": "Reading coordinates from a grid, Ch10.",
    "forward": "Later in this chapter you find the mirror line from a shape and its image."
  },
  {
    "itemId": "d9",
    "order": 9,
    "cluster": "C2",
    "clusterName": "Scale drawings",
    "question": "A garden is 12 m long. It is drawn on a plan with a scale of \\(1:200\\). How long is the garden on the plan?",
    "options": [
      {
        "text": "0.6 cm",
        "correct": false,
        "feedback": "Used \\(12\\text{ m} = 120\\text{ cm}\\) instead of 1200 cm, so \\(120 \\div 200 = 0.6\\text{ cm}\\). There are 100 cm in 1 m, so \\(12\\text{ m} = 1200\\text{ cm}\\)."
      },
      {
        "text": "2400 cm",
        "correct": false,
        "feedback": "Multiplied \\(12 \\times 200 = 2400\\) and wrote 2400 cm. A plan is smaller than the real garden, so divide by the scale, after changing metres to centimetres."
      },
      {
        "text": "6 cm",
        "correct": true,
        "feedback": "Correct. \\(12\\text{ m} = 1200\\text{ cm}\\). Divide by the scale: \\(1200 \\div 200 = 6\\text{ cm}\\)."
      },
      {
        "text": "0.06 cm",
        "correct": false,
        "feedback": "Divided \\(12 \\div 200 = 0.06\\text{ cm}\\) without changing 12 m to 1200 cm first. The units must match: \\(1200 \\div 200 = 6\\text{ cm}\\)."
      }
    ],
    "backward": "Converting between metres and centimetres, Ch7.",
    "forward": "Later in this chapter you draw plans and maps at a given scale."
  },
  {
    "itemId": "d10",
    "order": 10,
    "cluster": "C5",
    "clusterName": "Rotations and enlargements",
    "question": "A line of length 6 cm is enlarged to a line of length 15 cm. What is the scale factor of the enlargement?",
    "options": [
      {
        "text": "9",
        "correct": false,
        "feedback": "Subtracted \\(15 - 6 = 9\\). The scale factor compares the lengths by division, not subtraction."
      },
      {
        "text": "21",
        "correct": false,
        "feedback": "Added \\(6 + 15 = 21\\). The scale factor compares the lengths by division, not addition."
      },
      {
        "text": "2.5",
        "correct": true,
        "feedback": "Correct. Scale factor = new length ÷ original length = \\(15 \\div 6 = 2.5\\)."
      },
      {
        "text": "90",
        "correct": false,
        "feedback": "Multiplied \\(6 \\times 15 = 90\\). The scale factor is found by dividing the new length by the original length."
      }
    ],
    "backward": "Dividing to compare quantities, Ch11.",
    "forward": "Later in this chapter you find the scale factor from a shape and its image on a grid."
  },
  {
    "itemId": "d11",
    "order": 11,
    "cluster": "C3",
    "clusterName": "Points on a line segment",
    "question": "A is the point \\((-3, 5)\\) and B is the point \\((7, 5)\\). What are the coordinates of the midpoint of AB?",
    "options": [
      {
        "text": "\\((5, 5)\\)",
        "correct": false,
        "feedback": "Found the length of the line, \\(7 - (-3) = 10\\), and halved it to get 5, then used 5 as the x-coordinate, giving \\((5, 5)\\). Half the length is the distance from A to the midpoint; add it to \\(-3\\): \\(-3 + 5 = 2\\)."
      },
      {
        "text": "\\((2, 5)\\)",
        "correct": true,
        "feedback": "Correct. The line is horizontal, so the y-coordinate stays 5. For x: \\((-3 + 7) \\div 2 = 2\\). The midpoint is \\((2, 5)\\)."
      },
      {
        "text": "\\((2, 10)\\)",
        "correct": false,
        "feedback": "Found x correctly but added the y-coordinates, \\(5 + 5 = 10\\), without halving, giving \\((2, 10)\\). Both coordinates are halved: \\((5 + 5) \\div 2 = 5\\)."
      },
      {
        "text": "\\((4, 5)\\)",
        "correct": false,
        "feedback": "Added \\(-3 + 7 = 4\\) but did not halve, giving \\((4, 5)\\). Halve the total: \\(4 \\div 2 = 2\\)."
      }
    ],
    "backward": "Reading coordinates in all four quadrants, Ch10.",
    "forward": "Later in this chapter you find points a fraction of the way along a line."
  },
  {
    "itemId": "d12",
    "order": 12,
    "cluster": "C6",
    "clusterName": "Mixed position and transformation problems",
    "question": "The point P is \\((-2, 3)\\). It is translated by the column vector \\(\\begin{pmatrix}6\\\\-1\\end{pmatrix}\\) to give P′. What are the coordinates of the midpoint of PP′?",
    "options": [
      {
        "text": "\\((3, -0.5)\\)",
        "correct": false,
        "feedback": "Halved the vector, \\(6 \\div 2 = 3\\) and \\(-1 \\div 2 = -0.5\\), giving \\((3, -0.5)\\), but did not add that to P. The midpoint is P plus half the vector: \\((-2 + 3, 3 - 0.5)\\)."
      },
      {
        "text": "\\((4, 2)\\)",
        "correct": false,
        "feedback": "Found P′ = \\((4, 2)\\) and stopped. The question asks for the midpoint of PP′, not for P′."
      },
      {
        "text": "\\((1, 2.5)\\)",
        "correct": true,
        "feedback": "Correct. P′ = \\((-2 + 6, 3 + (-1)) = (4, 2)\\). Midpoint: \\(x = (-2 + 4) \\div 2 = 1\\) and \\(y = (3 + 2) \\div 2 = 2.5\\), so \\((1, 2.5)\\)."
      },
      {
        "text": "\\((2, 5)\\)",
        "correct": false,
        "feedback": "Found P′ = \\((4, 2)\\) and added the coordinates, \\(-2 + 4 = 2\\) and \\(3 + 2 = 5\\), giving \\((2, 5)\\), without halving."
      }
    ],
    "backward": "Reading and plotting coordinates, Ch10.",
    "forward": "Later in this chapter you combine transformations with points on a line."
  },
  {
    "itemId": "d13",
    "order": 13,
    "cluster": "C1",
    "clusterName": "Bearings",
    "question": "Town B is marked on the diagram relative to town A. What is the bearing of B from A?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 320 340\" width=\"320\" height=\"340\"><rect x=\"0\" y=\"0\" width=\"320\" height=\"340\" fill=\"#ffffff\"/><line x1=\"160\" y1=\"35\" x2=\"160\" y2=\"305\" stroke=\"#666666\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><text x=\"160\" y=\"27\" font-family=\"sans-serif\" font-size=\"15\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"middle\">N</text><text x=\"160\" y=\"323\" font-family=\"sans-serif\" font-size=\"15\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"middle\">S</text><line x1=\"160\" y1=\"170\" x2=\"82.87\" y2=\"261.93\" stroke=\"#333333\" stroke-width=\"2\"/><path d=\"M 160 208 A 38 38 0 0 1 135.57 199.11\" fill=\"none\" stroke=\"#c0392b\" stroke-width=\"2\"/><text x=\"141.19\" y=\"226.68\" font-family=\"sans-serif\" font-size=\"14\" font-weight=\"bold\" fill=\"#c0392b\" text-anchor=\"middle\">40°</text><circle cx=\"160\" cy=\"170\" r=\"4.5\" fill=\"#333333\"/><circle cx=\"82.87\" cy=\"261.93\" r=\"4.5\" fill=\"#333333\"/><text x=\"176\" y=\"174\" font-family=\"sans-serif\" font-size=\"15\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"middle\">A</text><text x=\"72.58\" y=\"279.18\" font-family=\"sans-serif\" font-size=\"15\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"middle\">B</text></svg></div>",
    "options": [
      {
        "text": "040°",
        "correct": false,
        "feedback": "Used the marked angle, 40°, as the bearing, giving 040°. That angle is measured from south, not from north."
      },
      {
        "text": "140°",
        "correct": false,
        "feedback": "Subtracted from 180°, \\(180^\\circ - 40^\\circ = 140^\\circ\\). That puts B south-east of A; B is south-west."
      },
      {
        "text": "220°",
        "correct": true,
        "feedback": "Correct. South is 180°, and B is a further 40° round towards the west, so the bearing is \\(180^\\circ + 40^\\circ = 220^\\circ\\)."
      },
      {
        "text": "320°",
        "correct": false,
        "feedback": "Subtracted the angle from 360°, \\(360^\\circ - 40^\\circ = 320^\\circ\\). That points north-west of A; B is south-west."
      }
    ],
    "backward": "Angles on a straight line, Ch5.",
    "forward": "Later in this chapter you read bearings from scale drawings in the same way."
  },
  {
    "itemId": "d14",
    "order": 14,
    "cluster": "C4",
    "clusterName": "Translations and reflections",
    "question": "The point P is shown on the grid. It is reflected in the dashed line. What are the coordinates of its image?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 356 430\" width=\"356\" height=\"430\"><rect x=\"0\" y=\"0\" width=\"356\" height=\"430\" fill=\"#ffffff\"/><line x1=\"44\" y1=\"386\" x2=\"44\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"80\" y1=\"386\" x2=\"80\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"116\" y1=\"386\" x2=\"116\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"152\" y1=\"386\" x2=\"152\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"188\" y1=\"386\" x2=\"188\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"224\" y1=\"386\" x2=\"224\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"260\" y1=\"386\" x2=\"260\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"296\" y1=\"386\" x2=\"296\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"332\" y1=\"386\" x2=\"332\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"386\" x2=\"332\" y2=\"386\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"350\" x2=\"332\" y2=\"350\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"314\" x2=\"332\" y2=\"314\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"278\" x2=\"332\" y2=\"278\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"242\" x2=\"332\" y2=\"242\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"206\" x2=\"332\" y2=\"206\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"170\" x2=\"332\" y2=\"170\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"134\" x2=\"332\" y2=\"134\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"98\" x2=\"332\" y2=\"98\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"62\" x2=\"332\" y2=\"62\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"26\" x2=\"332\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"242\" x2=\"332\" y2=\"242\" stroke=\"#333333\" stroke-width=\"1.8\"/><line x1=\"152\" y1=\"386\" x2=\"152\" y2=\"26\" stroke=\"#333333\" stroke-width=\"1.8\"/><text x=\"44\" y=\"258\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">-3</text><text x=\"80\" y=\"258\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">-2</text><text x=\"116\" y=\"258\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">-1</text><text x=\"188\" y=\"258\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">1</text><text x=\"224\" y=\"258\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">2</text><text x=\"260\" y=\"258\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">3</text><text x=\"296\" y=\"258\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">4</text><text x=\"332\" y=\"258\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">5</text><text x=\"144\" y=\"390\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">-4</text><text x=\"144\" y=\"354\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">-3</text><text x=\"144\" y=\"318\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">-2</text><text x=\"144\" y=\"282\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">-1</text><text x=\"144\" y=\"210\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">1</text><text x=\"144\" y=\"174\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">2</text><text x=\"144\" y=\"138\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">3</text><text x=\"144\" y=\"102\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">4</text><text x=\"144\" y=\"66\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">5</text><text x=\"144\" y=\"30\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">6</text><text x=\"344\" y=\"246\" font-family=\"sans-serif\" font-size=\"14\" font-style=\"italic\" fill=\"#333333\">x</text><text x=\"162\" y=\"18\" font-family=\"sans-serif\" font-size=\"14\" font-style=\"italic\" fill=\"#333333\">y</text><line x1=\"44\" y1=\"206\" x2=\"332\" y2=\"206\" stroke=\"#c0392b\" stroke-width=\"2\" stroke-dasharray=\"7 5\"/><text x=\"328\" y=\"200\" font-family=\"sans-serif\" font-size=\"13\" font-weight=\"bold\" fill=\"#c0392b\" text-anchor=\"end\">y = 1</text><circle cx=\"224\" cy=\"98\" r=\"4.5\" fill=\"#333333\"/><text x=\"234\" y=\"90\" font-family=\"sans-serif\" font-size=\"15\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"start\">P</text></svg></div>",
    "options": [
      {
        "text": "\\((-2, 4)\\)",
        "correct": false,
        "feedback": "Reflected in the y-axis by changing the sign of x, giving \\((-2, 4)\\). The mirror line is horizontal, so the point moves up or down, not left or right."
      },
      {
        "text": "\\((2, 1)\\)",
        "correct": false,
        "feedback": "Placed the image on the mirror line, giving \\((2, 1)\\). The image is the same distance on the other side of the line: 3 below it."
      },
      {
        "text": "\\((2, -4)\\)",
        "correct": false,
        "feedback": "Reflected in the x-axis \\((y = 0)\\) by changing the sign of y, giving \\((2, -4)\\). The mirror line here is \\(y = 1\\), so measure the distance from that line."
      },
      {
        "text": "\\((2, -2)\\)",
        "correct": true,
        "feedback": "Correct. P is \\(4 - 1 = 3\\) above the mirror line, so the image is 3 below it: \\(1 - 3 = -2\\). The x-coordinate stays 2, so the image is \\((2, -2)\\)."
      }
    ],
    "backward": "Reading coordinates from a grid, Ch10.",
    "forward": "Ch14 uses mirror planes to describe symmetry in 3D shapes."
  },
  {
    "itemId": "d15",
    "order": 15,
    "cluster": "C2",
    "clusterName": "Scale drawings",
    "question": "A map scale is 1 cm to 2 km. Which of these shows the same scale written as a ratio?",
    "options": [
      {
        "text": "\\(1:200\\,000\\)",
        "correct": true,
        "feedback": "Correct. \\(2\\text{ km} = 2000\\text{ m} = 200\\,000\\text{ cm}\\), so 1 cm on the map stands for 200 000 cm in real life: \\(1:200\\,000\\)."
      },
      {
        "text": "\\(1:20\\,000\\)",
        "correct": false,
        "feedback": "Used 10 000 cm in a kilometre, \\(2 \\times 10\\,000 = 20\\,000\\), giving \\(1:20\\,000\\). There are 100 000 cm in 1 km: \\(2 \\times 100\\,000 = 200\\,000\\)."
      },
      {
        "text": "\\(1:2\\)",
        "correct": false,
        "feedback": "Copied the 2 from '2 km' without changing units, giving \\(1:2\\). Both sides of a ratio must use the same unit, so change 2 km to centimetres."
      },
      {
        "text": "\\(1:2000\\)",
        "correct": false,
        "feedback": "Changed 2 km to 2000 m but not to centimetres, giving \\(1:2000\\). The left side is in centimetres, so change 2000 m to 200 000 cm."
      }
    ],
    "backward": "Converting between km, m and cm, Ch7.",
    "forward": "Later in this chapter you use ratio scales to find real distances."
  },
  {
    "itemId": "d16",
    "order": 16,
    "cluster": "C5",
    "clusterName": "Rotations and enlargements",
    "question": "The point \\((5, 2)\\) is rotated 90° anticlockwise about the origin. What are the coordinates of its image?",
    "options": [
      {
        "text": "\\((-2, 5)\\)",
        "correct": true,
        "feedback": "Correct. A quarter-turn anticlockwise about the origin sends \\((x, y)\\) to \\((-y, x)\\), so \\((5, 2)\\) goes to \\((-2, 5)\\)."
      },
      {
        "text": "\\((2, -5)\\)",
        "correct": false,
        "feedback": "Turned clockwise instead of anticlockwise, so \\((x, y)\\) goes to \\((y, -x)\\), giving \\((2, -5)\\)."
      },
      {
        "text": "\\((-5, -2)\\)",
        "correct": false,
        "feedback": "Turned through 180°, changing both signs, giving \\((-5, -2)\\). A quarter-turn is 90°."
      },
      {
        "text": "\\((2, 5)\\)",
        "correct": false,
        "feedback": "Swapped the coordinates only, giving \\((2, 5)\\). That is a reflection in \\(y = x\\). A rotation also changes a sign."
      }
    ],
    "backward": "Coordinates in all four quadrants, Ch10.",
    "forward": "Later in this chapter you describe rotations by their centre, angle and direction."
  },
  {
    "itemId": "d17",
    "order": 17,
    "cluster": "C3",
    "clusterName": "Points on a line segment",
    "question": "A is the point \\((0, 3)\\) and B is the point \\((9, 12)\\). The point P lies on AB, one-third of the way from A to B. What are the coordinates of P?",
    "options": [
      {
        "text": "\\((4.5, 7.5)\\)",
        "correct": false,
        "feedback": "Found the midpoint, halfway from A to B, giving \\((4.5, 7.5)\\). One-third of the way is closer to A than that."
      },
      {
        "text": "\\((3, 4)\\)",
        "correct": false,
        "feedback": "Found one-third of B's coordinates, \\(9 \\div 3 = 3\\) and \\(12 \\div 3 = 4\\), giving \\((3, 4)\\). The move is a third of the change from A to B, added to A's coordinates."
      },
      {
        "text": "\\((6, 9)\\)",
        "correct": false,
        "feedback": "Went two-thirds of the way, \\(2 \\times 3 = 6\\) across and \\(2 \\times 3 = 6\\) up from A, giving \\((6, 9)\\). One-third of the way is 3 across and 3 up from A."
      },
      {
        "text": "\\((3, 6)\\)",
        "correct": true,
        "feedback": "Correct. From A to B the x-coordinate increases by 9 and the y-coordinate by \\(12 - 3 = 9\\). One-third of each is 3, so P = \\((0 + 3, 3 + 3) = (3, 6)\\)."
      }
    ],
    "backward": "Fractions of an amount, Ch8.",
    "forward": "Later in this chapter you divide a line in other ratios."
  },
  {
    "itemId": "d18",
    "order": 18,
    "cluster": "C6",
    "clusterName": "Mixed position and transformation problems",
    "question": "The point A is \\((1, 1)\\). It is enlarged by scale factor 2 from the origin, and the image is then translated by the column vector \\(\\begin{pmatrix}3\\\\-1\\end{pmatrix}\\). What are the coordinates of the final image of A?",
    "options": [
      {
        "text": "\\((2, 2)\\)",
        "correct": false,
        "feedback": "Enlarged A to \\((2, 2)\\) but then did not translate it. Both transformations are needed."
      },
      {
        "text": "\\((5, 1)\\)",
        "correct": true,
        "feedback": "Correct. Enlarge from the origin: \\((1 \\times 2, 1 \\times 2) = (2, 2)\\). Then translate: \\((2 + 3, 2 - 1) = (5, 1)\\)."
      },
      {
        "text": "\\((8, 0)\\)",
        "correct": false,
        "feedback": "Did the steps in the wrong order: translating first gives \\((4, 0)\\), and enlarging that gives \\((8, 0)\\). Enlarge first and then translate, as the question says."
      },
      {
        "text": "\\((4, 0)\\)",
        "correct": false,
        "feedback": "Translated A to \\((4, 0)\\) but never enlarged it. Both transformations are needed."
      }
    ],
    "backward": "Multiplying coordinates and adding vectors, Ch10.",
    "forward": "Later in this chapter you describe combined transformations."
  },
  {
    "itemId": "d19",
    "order": 19,
    "cluster": "C1",
    "clusterName": "Bearings",
    "question": "The bearing of Y from X is 215°. What is the bearing of X from Y?",
    "options": [
      {
        "text": "035°",
        "correct": true,
        "feedback": "Correct. The back bearing is a half turn away. 215° is more than 180°, so subtract 180°: \\(215^\\circ - 180^\\circ = 35^\\circ\\), written 035°."
      },
      {
        "text": "395°",
        "correct": false,
        "feedback": "Added 180°, \\(215^\\circ + 180^\\circ = 395^\\circ\\). A bearing cannot be more than 360°, so subtract 180° instead: \\(215^\\circ - 180^\\circ\\)."
      },
      {
        "text": "145°",
        "correct": false,
        "feedback": "Subtracted from 360°, \\(360^\\circ - 215^\\circ = 145^\\circ\\). That is the angle going the other way round from north, not the back bearing."
      },
      {
        "text": "325°",
        "correct": false,
        "feedback": "Found \\(215^\\circ - 180^\\circ = 35^\\circ\\) and then took \\(360^\\circ - 35^\\circ = 325^\\circ\\). The subtraction of 180° already gives the back bearing, 035°; there is no need to go round again."
      }
    ],
    "backward": "Parallel lines and angles on a straight line, Ch5.",
    "forward": "Later in this chapter you use back bearings to plot return journeys."
  },
  {
    "itemId": "d20",
    "order": 20,
    "cluster": "C4",
    "clusterName": "Translations and reflections",
    "question": "The diagram shows triangle ABC and its image A′B′C′ after a translation. Which column vector describes the translation?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 388 310\" width=\"388\" height=\"310\"><rect x=\"0\" y=\"0\" width=\"388\" height=\"310\" fill=\"#ffffff\"/><line x1=\"44\" y1=\"266\" x2=\"44\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"84\" y1=\"266\" x2=\"84\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"124\" y1=\"266\" x2=\"124\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"164\" y1=\"266\" x2=\"164\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"204\" y1=\"266\" x2=\"204\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"244\" y1=\"266\" x2=\"244\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"284\" y1=\"266\" x2=\"284\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"324\" y1=\"266\" x2=\"324\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"364\" y1=\"266\" x2=\"364\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"266\" x2=\"364\" y2=\"266\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"226\" x2=\"364\" y2=\"226\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"186\" x2=\"364\" y2=\"186\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"146\" x2=\"364\" y2=\"146\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"106\" x2=\"364\" y2=\"106\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"66\" x2=\"364\" y2=\"66\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"26\" x2=\"364\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"266\" x2=\"364\" y2=\"266\" stroke=\"#333333\" stroke-width=\"1.8\"/><line x1=\"44\" y1=\"266\" x2=\"44\" y2=\"26\" stroke=\"#333333\" stroke-width=\"1.8\"/><text x=\"44\" y=\"282\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">0</text><text x=\"84\" y=\"282\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">1</text><text x=\"124\" y=\"282\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">2</text><text x=\"164\" y=\"282\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">3</text><text x=\"204\" y=\"282\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">4</text><text x=\"244\" y=\"282\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">5</text><text x=\"284\" y=\"282\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">6</text><text x=\"324\" y=\"282\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">7</text><text x=\"364\" y=\"282\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">8</text><text x=\"36\" y=\"270\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">0</text><text x=\"36\" y=\"230\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">1</text><text x=\"36\" y=\"190\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">2</text><text x=\"36\" y=\"150\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">3</text><text x=\"36\" y=\"110\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">4</text><text x=\"36\" y=\"70\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">5</text><text x=\"36\" y=\"30\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">6</text><text x=\"376\" y=\"270\" font-family=\"sans-serif\" font-size=\"14\" font-style=\"italic\" fill=\"#333333\">x</text><text x=\"54\" y=\"18\" font-family=\"sans-serif\" font-size=\"14\" font-style=\"italic\" fill=\"#333333\">y</text><polygon points=\"84,146 164,146 84,66\" fill=\"#d6e6f5\" fill-opacity=\"0.75\" stroke=\"#1f4e79\" stroke-width=\"2.2\" stroke-linejoin=\"round\"/><circle cx=\"84\" cy=\"146\" r=\"3.5\" fill=\"#1f4e79\"/><text x=\"73.39\" y=\"161.61\" font-family=\"sans-serif\" font-size=\"15\" font-weight=\"bold\" fill=\"#1f4e79\" text-anchor=\"middle\">A</text><circle cx=\"164\" cy=\"146\" r=\"3.5\" fill=\"#1f4e79\"/><text x=\"177.42\" y=\"157.71\" font-family=\"sans-serif\" font-size=\"15\" font-weight=\"bold\" fill=\"#1f4e79\" text-anchor=\"middle\">B</text><circle cx=\"84\" cy=\"66\" r=\"3.5\" fill=\"#1f4e79\"/><text x=\"77.29\" y=\"57.58\" font-family=\"sans-serif\" font-size=\"15\" font-weight=\"bold\" fill=\"#1f4e79\" text-anchor=\"middle\">C</text><polygon points=\"244,226 324,226 244,146\" fill=\"#f7dcdc\" fill-opacity=\"0.75\" stroke=\"#8e2a2a\" stroke-width=\"2.2\" stroke-linejoin=\"round\"/><circle cx=\"244\" cy=\"226\" r=\"3.5\" fill=\"#8e2a2a\"/><text x=\"233.39\" y=\"241.61\" font-family=\"sans-serif\" font-size=\"15\" font-weight=\"bold\" fill=\"#8e2a2a\" text-anchor=\"middle\">A′</text><circle cx=\"324\" cy=\"226\" r=\"3.5\" fill=\"#8e2a2a\"/><text x=\"337.42\" y=\"237.71\" font-family=\"sans-serif\" font-size=\"15\" font-weight=\"bold\" fill=\"#8e2a2a\" text-anchor=\"middle\">B′</text><circle cx=\"244\" cy=\"146\" r=\"3.5\" fill=\"#8e2a2a\"/><text x=\"237.29\" y=\"137.58\" font-family=\"sans-serif\" font-size=\"15\" font-weight=\"bold\" fill=\"#8e2a2a\" text-anchor=\"middle\">C′</text></svg></div>",
    "options": [
      {
        "text": "\\(\\begin{pmatrix}-2\\\\4\\end{pmatrix}\\)",
        "correct": false,
        "feedback": "Swapped the entries, giving \\(\\begin{pmatrix}-2\\\\4\\end{pmatrix}\\). The top entry is the horizontal move, 4, and the bottom entry is the vertical move, \\(-2\\)."
      },
      {
        "text": "\\(\\begin{pmatrix}4\\\\-2\\end{pmatrix}\\)",
        "correct": true,
        "feedback": "Correct. A\\((1, 3)\\) moves to A′\\((5, 1)\\): the x-coordinate changes by \\(5 - 1 = 4\\) and the y-coordinate by \\(1 - 3 = -2\\), so the vector is \\(\\begin{pmatrix}4\\\\-2\\end{pmatrix}\\)."
      },
      {
        "text": "\\(\\begin{pmatrix}4\\\\2\\end{pmatrix}\\)",
        "correct": false,
        "feedback": "Counted the 2 squares of vertical movement but gave \\(+2\\), giving \\(\\begin{pmatrix}4\\\\2\\end{pmatrix}\\). A move down is negative, so the bottom entry is \\(-2\\)."
      },
      {
        "text": "\\(\\begin{pmatrix}-4\\\\2\\end{pmatrix}\\)",
        "correct": false,
        "feedback": "Found the translation from the image back to the original, A′ to A, giving \\(\\begin{pmatrix}-4\\\\2\\end{pmatrix}\\). The vector must go from the original to the image."
      }
    ],
    "backward": "Reading coordinates from a grid, Ch10.",
    "forward": "Later in this chapter you describe other transformations from a shape and its image."
  },
  {
    "itemId": "d21",
    "order": 21,
    "cluster": "C2",
    "clusterName": "Scale drawings",
    "question": "A road is 3.5 km long. It is drawn on a map with a scale of \\(1:50\\,000\\). How long is the road on the map?",
    "options": [
      {
        "text": "175 000 cm",
        "correct": false,
        "feedback": "Multiplied \\(3.5 \\times 50\\,000 = 175\\,000\\text{ cm}\\). A map is smaller than the real road, so divide the real length in centimetres by 50 000."
      },
      {
        "text": "7 cm",
        "correct": true,
        "feedback": "Correct. \\(3.5\\text{ km} = 350\\,000\\text{ cm}\\). Divide by the scale: \\(350\\,000 \\div 50\\,000 = 7\\text{ cm}\\)."
      },
      {
        "text": "350 000 cm",
        "correct": false,
        "feedback": "Changed 3.5 km into 350 000 cm and stopped, giving 350 000 cm. Divide by the scale to find the length on the map: \\(350\\,000 \\div 50\\,000 = 7\\)."
      },
      {
        "text": "70 cm",
        "correct": false,
        "feedback": "Changed 3.5 km into 3 500 000 cm, ten times too big, so \\(3\\,500\\,000 \\div 50\\,000 = 70\\text{ cm}\\). There are 100 000 cm in 1 km: \\(3.5 \\times 100\\,000 = 350\\,000\\)."
      }
    ],
    "backward": "Converting between km, m and cm, Ch7.",
    "forward": "Later in this chapter you find real distances from map measurements."
  },
  {
    "itemId": "d22",
    "order": 22,
    "cluster": "C5",
    "clusterName": "Rotations and enlargements",
    "question": "The diagram shows rectangle R and its image S after an enlargement from the origin O. What is the scale factor of the enlargement?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 428 430\" width=\"428\" height=\"430\"><rect x=\"0\" y=\"0\" width=\"428\" height=\"430\" fill=\"#ffffff\"/><line x1=\"44\" y1=\"386\" x2=\"44\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"84\" y1=\"386\" x2=\"84\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"124\" y1=\"386\" x2=\"124\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"164\" y1=\"386\" x2=\"164\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"204\" y1=\"386\" x2=\"204\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"244\" y1=\"386\" x2=\"244\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"284\" y1=\"386\" x2=\"284\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"324\" y1=\"386\" x2=\"324\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"364\" y1=\"386\" x2=\"364\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"404\" y1=\"386\" x2=\"404\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"386\" x2=\"404\" y2=\"386\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"346\" x2=\"404\" y2=\"346\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"306\" x2=\"404\" y2=\"306\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"266\" x2=\"404\" y2=\"266\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"226\" x2=\"404\" y2=\"226\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"186\" x2=\"404\" y2=\"186\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"146\" x2=\"404\" y2=\"146\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"106\" x2=\"404\" y2=\"106\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"66\" x2=\"404\" y2=\"66\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"26\" x2=\"404\" y2=\"26\" stroke=\"#dddddd\" stroke-width=\"1\"/><line x1=\"44\" y1=\"386\" x2=\"404\" y2=\"386\" stroke=\"#333333\" stroke-width=\"1.8\"/><line x1=\"44\" y1=\"386\" x2=\"44\" y2=\"26\" stroke=\"#333333\" stroke-width=\"1.8\"/><text x=\"84\" y=\"402\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">1</text><text x=\"124\" y=\"402\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">2</text><text x=\"164\" y=\"402\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">3</text><text x=\"204\" y=\"402\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">4</text><text x=\"244\" y=\"402\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">5</text><text x=\"284\" y=\"402\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">6</text><text x=\"324\" y=\"402\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">7</text><text x=\"364\" y=\"402\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">8</text><text x=\"404\" y=\"402\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"middle\">9</text><text x=\"36\" y=\"350\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">1</text><text x=\"36\" y=\"310\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">2</text><text x=\"36\" y=\"270\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">3</text><text x=\"36\" y=\"230\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">4</text><text x=\"36\" y=\"190\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">5</text><text x=\"36\" y=\"150\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">6</text><text x=\"36\" y=\"110\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">7</text><text x=\"36\" y=\"70\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">8</text><text x=\"36\" y=\"30\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666666\" text-anchor=\"end\">9</text><text x=\"416\" y=\"390\" font-family=\"sans-serif\" font-size=\"14\" font-style=\"italic\" fill=\"#333333\">x</text><text x=\"54\" y=\"18\" font-family=\"sans-serif\" font-size=\"14\" font-style=\"italic\" fill=\"#333333\">y</text><polygon points=\"84,346 164,346 164,306 84,306\" fill=\"#d6e6f5\" fill-opacity=\"0.75\" stroke=\"#1f4e79\" stroke-width=\"2.2\" stroke-linejoin=\"round\"/><text x=\"124\" y=\"332\" font-family=\"sans-serif\" font-size=\"18\" font-weight=\"bold\" fill=\"#1f4e79\" text-anchor=\"middle\">R</text><circle cx=\"84\" cy=\"346\" r=\"3.5\" fill=\"#1f4e79\"/><circle cx=\"164\" cy=\"346\" r=\"3.5\" fill=\"#1f4e79\"/><circle cx=\"164\" cy=\"306\" r=\"3.5\" fill=\"#1f4e79\"/><circle cx=\"84\" cy=\"306\" r=\"3.5\" fill=\"#1f4e79\"/><polygon points=\"164,266 404,266 404,146 164,146\" fill=\"#f7dcdc\" fill-opacity=\"0.75\" stroke=\"#8e2a2a\" stroke-width=\"2.2\" stroke-linejoin=\"round\"/><text x=\"284\" y=\"212\" font-family=\"sans-serif\" font-size=\"18\" font-weight=\"bold\" fill=\"#8e2a2a\" text-anchor=\"middle\">S</text><circle cx=\"164\" cy=\"266\" r=\"3.5\" fill=\"#8e2a2a\"/><circle cx=\"404\" cy=\"266\" r=\"3.5\" fill=\"#8e2a2a\"/><circle cx=\"404\" cy=\"146\" r=\"3.5\" fill=\"#8e2a2a\"/><circle cx=\"164\" cy=\"146\" r=\"3.5\" fill=\"#8e2a2a\"/><circle cx=\"44\" cy=\"386\" r=\"4.5\" fill=\"#333333\"/><text x=\"35\" y=\"403\" font-family=\"sans-serif\" font-size=\"15\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"end\">O</text></svg></div>",
    "options": [
      {
        "text": "4",
        "correct": false,
        "feedback": "Subtracted the base lengths, \\(6 - 2 = 4\\). The scale factor is found by dividing the image length by the original length."
      },
      {
        "text": "\\(\\frac{1}{3}\\)",
        "correct": false,
        "feedback": "Divided the original base by the image base, \\(2 \\div 6 = \\frac{1}{3}\\). The image is larger, so the scale factor is bigger than 1: \\(6 \\div 2\\)."
      },
      {
        "text": "6",
        "correct": false,
        "feedback": "Used the length of the image base, 6, as the scale factor. Compare it with the original base of 2: \\(6 \\div 2 = 3\\)."
      },
      {
        "text": "3",
        "correct": true,
        "feedback": "Correct. The base of R is \\(3 - 1 = 2\\) units and the base of S is \\(9 - 3 = 6\\) units, so the scale factor is \\(6 \\div 2 = 3\\). The height checks: 1 becomes 3."
      }
    ],
    "backward": "Ratio and comparing lengths, Ch11.",
    "forward": "Later in this chapter you find the centre of enlargement as well as the scale factor."
  },
  {
    "itemId": "d23",
    "order": 23,
    "cluster": "C3",
    "clusterName": "Points on a line segment",
    "question": "A is the point \\((1, 2)\\) and B is the point \\((4, 7)\\). What are the coordinates of the midpoint of AB?",
    "options": [
      {
        "text": "\\((2.5, 4.5)\\)",
        "correct": true,
        "feedback": "Correct. x: \\((1 + 4) \\div 2 = 2.5\\). y: \\((2 + 7) \\div 2 = 4.5\\). The midpoint is \\((2.5, 4.5)\\)."
      },
      {
        "text": "\\((1.5, 2.5)\\)",
        "correct": false,
        "feedback": "Halved the differences, \\((4 - 1) \\div 2 = 1.5\\) and \\((7 - 2) \\div 2 = 2.5\\), giving \\((1.5, 2.5)\\). That is half the move from A to B, not the position of the midpoint."
      },
      {
        "text": "\\((2.5, 9)\\)",
        "correct": false,
        "feedback": "Halved the x-total correctly but added the y-coordinates without halving, \\(2 + 7 = 9\\), giving \\((2.5, 9)\\). Halve both totals."
      },
      {
        "text": "\\((5, 9)\\)",
        "correct": false,
        "feedback": "Added the coordinates without halving, \\(1 + 4 = 5\\) and \\(2 + 7 = 9\\), giving \\((5, 9)\\). Halve each total to get the midpoint."
      }
    ],
    "backward": "Reading coordinates, Ch10.",
    "forward": "Later in this chapter you find points a fraction of the way along a line."
  },
  {
    "itemId": "d24",
    "order": 24,
    "cluster": "C6",
    "clusterName": "Mixed position and transformation problems",
    "question": "The line AB joins A\\((0, 0)\\) to B\\((2, 3)\\). It is enlarged by scale factor 4 from the origin to give A′B′. What are the coordinates of the midpoint of A′B′?",
    "options": [
      {
        "text": "\\((4, 1.5)\\)",
        "correct": false,
        "feedback": "Multiplied only the x-coordinate of the midpoint, \\(1 \\times 4 = 4\\), and kept \\(y = 1.5\\), giving \\((4, 1.5)\\). Both coordinates are multiplied by the scale factor."
      },
      {
        "text": "\\((4, 6)\\)",
        "correct": true,
        "feedback": "Correct. B′ = \\((2 \\times 4, 3 \\times 4) = (8, 12)\\) and A′ = \\((0, 0)\\). Midpoint: \\(((0 + 8) \\div 2, (0 + 12) \\div 2) = (4, 6)\\). Check: the midpoint of AB is \\((1, 1.5)\\), and 4 times that is \\((4, 6)\\)."
      },
      {
        "text": "\\((1, 1.5)\\)",
        "correct": false,
        "feedback": "Found the midpoint of AB, \\((1, 1.5)\\), and forgot to enlarge. The midpoint of the enlarged line A′B′ is needed."
      },
      {
        "text": "\\((8, 12)\\)",
        "correct": false,
        "feedback": "Found B′ = \\((8, 12)\\) but not the midpoint. The question asks for the midpoint of A′B′."
      }
    ],
    "backward": "Multiplying coordinates, Ch10.",
    "forward": "Later in this chapter you combine enlargements with points on a line."
  }
];

const recheckItems = [
  {
    "itemId": "r1",
    "order": 1,
    "cluster": "C1",
    "clusterName": "Bearings",
    "question": "What is the three-figure bearing of due west?",
    "options": [
      {
        "text": "090°",
        "correct": false,
        "feedback": "Gave the bearing of east, 090°. West is three quarter-turns clockwise from north, not one."
      },
      {
        "text": "270°",
        "correct": true,
        "feedback": "Correct. Bearings are measured clockwise from north: east is 090°, south is 180° and west is 270°."
      },
      {
        "text": "180°",
        "correct": false,
        "feedback": "Gave the bearing of south, 180°. West is a further quarter-turn, 90°, past south."
      },
      {
        "text": "360°",
        "correct": false,
        "feedback": "Gave a full turn, 360°, which points north again. West is one quarter-turn before a full turn: \\(360^\\circ - 90^\\circ = 270^\\circ\\)."
      }
    ],
    "backward": "Quarter turns, Ch5.",
    "forward": "Later in this chapter you use compass directions to check bearings on scale drawings."
  },
  {
    "itemId": "r2",
    "order": 2,
    "cluster": "C2",
    "clusterName": "Scale drawings",
    "question": "A plan uses a scale of 1 cm to 50 m. A distance measures 7.2 cm on the plan. What is the real distance?",
    "options": [
      {
        "text": "3600 m",
        "correct": false,
        "feedback": "Slipped a place when multiplying \\(7.2 \\times 50\\), getting 3600 m. \\(7 \\times 50 = 350\\) and \\(0.2 \\times 50 = 10\\), so the total is 360."
      },
      {
        "text": "0.144 m",
        "correct": false,
        "feedback": "Divided \\(7.2 \\div 50 = 0.144\\text{ m}\\). Real distances are larger than plan distances, so multiply."
      },
      {
        "text": "57.2 m",
        "correct": false,
        "feedback": "Added \\(7.2 + 50 = 57.2\\text{ m}\\). Each centimetre stands for 50 m, so multiply."
      },
      {
        "text": "360 m",
        "correct": true,
        "feedback": "Correct. Each centimetre stands for 50 m, so 7.2 cm is \\(7.2 \\times 50 = 360\\text{ m}\\)."
      }
    ],
    "backward": "Multiplying decimals, Ch3.",
    "forward": "Later in this chapter you use scales on maps and plans together with bearings."
  },
  {
    "itemId": "r3",
    "order": 3,
    "cluster": "C3",
    "clusterName": "Points on a line segment",
    "question": "A is the point \\((-6, -2)\\) and B is the point \\((4, 10)\\). What are the coordinates of the midpoint of AB?",
    "options": [
      {
        "text": "\\((-5, 4)\\)",
        "correct": false,
        "feedback": "Added \\(6 + 4 = 10\\) and halved to get 5, then made it negative because A's x-coordinate is negative, giving \\((-5, 4)\\). With the signs, \\((-6 + 4) \\div 2 = -1\\)."
      },
      {
        "text": "\\((-2, 8)\\)",
        "correct": false,
        "feedback": "Added the coordinates without halving, \\(-6 + 4 = -2\\) and \\(-2 + 10 = 8\\), giving \\((-2, 8)\\). Halve each total to get the midpoint."
      },
      {
        "text": "\\((-1, 4)\\)",
        "correct": true,
        "feedback": "Correct. x: \\((-6 + 4) \\div 2 = -1\\). y: \\((-2 + 10) \\div 2 = 4\\). The midpoint is \\((-1, 4)\\)."
      },
      {
        "text": "\\((5, 6)\\)",
        "correct": false,
        "feedback": "Halved the differences, \\((4 - (-6)) \\div 2 = 5\\) and \\((10 - (-2)) \\div 2 = 6\\), giving \\((5, 6)\\). That is half the move from A to B, not the midpoint."
      }
    ],
    "backward": "Negative numbers on a grid, Ch10.",
    "forward": "Later in this chapter you divide a line in other ratios."
  },
  {
    "itemId": "r4",
    "order": 4,
    "cluster": "C4",
    "clusterName": "Translations and reflections",
    "question": "The point \\((8, 3)\\) is reflected in the line \\(x = 6\\). What are the coordinates of its image?",
    "options": [
      {
        "text": "\\((4, 3)\\)",
        "correct": true,
        "feedback": "Correct. The point is \\(8 - 6 = 2\\) to the right of the mirror line, so the image is 2 to the left of it: \\(6 - 2 = 4\\). The y-coordinate stays 3, so the image is \\((4, 3)\\)."
      },
      {
        "text": "\\((-8, 3)\\)",
        "correct": false,
        "feedback": "Reflected in the y-axis by changing the sign of x, giving \\((-8, 3)\\). The mirror line here is \\(x = 6\\), so measure the distance from that line."
      },
      {
        "text": "\\((6, 3)\\)",
        "correct": false,
        "feedback": "Placed the image on the mirror line, giving \\((6, 3)\\). The image is the same distance on the other side of the line, 2 to the left of it."
      },
      {
        "text": "\\((8, 9)\\)",
        "correct": false,
        "feedback": "Reflected in the horizontal line \\(y = 6\\) instead, \\(6 + (6 - 3) = 9\\), giving \\((8, 9)\\). The mirror line \\(x = 6\\) is vertical, so only the x-coordinate changes."
      }
    ],
    "backward": "Equations of vertical lines, Ch10.",
    "forward": "Later in this chapter you find the mirror line from a shape and its image."
  },
  {
    "itemId": "r5",
    "order": 5,
    "cluster": "C5",
    "clusterName": "Rotations and enlargements",
    "question": "A line of length 8 cm is enlarged to a line of length 28 cm. What is the scale factor of the enlargement?",
    "options": [
      {
        "text": "36",
        "correct": false,
        "feedback": "Added the lengths, \\(28 + 8 = 36\\). The scale factor is found by dividing the new length by the old length."
      },
      {
        "text": "224",
        "correct": false,
        "feedback": "Multiplied the lengths, \\(28 \\times 8 = 224\\). The scale factor is found by dividing the new length by the old length."
      },
      {
        "text": "3.5",
        "correct": true,
        "feedback": "Correct. The scale factor is the new length divided by the old length: \\(28 \\div 8 = 3.5\\)."
      },
      {
        "text": "20",
        "correct": false,
        "feedback": "Subtracted the lengths, \\(28 - 8 = 20\\). The scale factor is found by dividing the new length by the old length."
      }
    ],
    "backward": "Dividing to compare lengths, Ch11.",
    "forward": "Later in this chapter you find the scale factor from a shape and its image on a grid."
  },
  {
    "itemId": "r6",
    "order": 6,
    "cluster": "C6",
    "clusterName": "Mixed position and transformation problems",
    "question": "The point P is due south of O. P is rotated 50° clockwise about O to give Q. What is the bearing of Q from O?",
    "options": [
      {
        "text": "310°",
        "correct": false,
        "feedback": "Subtracted the angle from 360°, \\(360^\\circ - 50^\\circ = 310^\\circ\\). P starts at 180° (due south) and the clockwise turn adds 50°: \\(180^\\circ + 50^\\circ = 230^\\circ\\)."
      },
      {
        "text": "230°",
        "correct": true,
        "feedback": "Correct. South is 180°, and a rotation of 50° clockwise about O turns the direction on to \\(180^\\circ + 50^\\circ = 230^\\circ\\)."
      },
      {
        "text": "130°",
        "correct": false,
        "feedback": "Turned anticlockwise, \\(180^\\circ - 50^\\circ = 130^\\circ\\). Bearings and clockwise rotations both turn clockwise, so add the angle to 180°."
      },
      {
        "text": "050°",
        "correct": false,
        "feedback": "Used the rotation angle, 50°, as the bearing, giving 050°. P starts due south, at 180°, so the bearing is 50° more than that."
      }
    ],
    "backward": "Angles around a point, Ch5.",
    "forward": "Later in this chapter you describe rotations by their centre, angle and direction."
  },
  {
    "itemId": "r7",
    "order": 7,
    "cluster": "C1",
    "clusterName": "Bearings",
    "question": "The bearing of B from A is 142°. What is the bearing of A from B?",
    "options": [
      {
        "text": "322°",
        "correct": true,
        "feedback": "Correct. 142° is less than 180°, so add a half turn: \\(142^\\circ + 180^\\circ = 322^\\circ\\)."
      },
      {
        "text": "038°",
        "correct": false,
        "feedback": "Subtracted from 180°, \\(180^\\circ - 142^\\circ = 38^\\circ\\), giving 038°. The back bearing is a half turn away, so add 180°."
      },
      {
        "text": "218°",
        "correct": false,
        "feedback": "Subtracted from 360°, \\(360^\\circ - 142^\\circ = 218^\\circ\\). That is the angle going the other way round from north, not the back bearing."
      },
      {
        "text": "232°",
        "correct": false,
        "feedback": "Added a quarter turn, \\(142^\\circ + 90^\\circ = 232^\\circ\\). Looking back from B is a half turn, which is 180°: \\(142^\\circ + 180^\\circ = 322^\\circ\\)."
      }
    ],
    "backward": "Parallel lines and angles on a straight line, Ch5.",
    "forward": "Later in this chapter you use back bearings to plot return journeys."
  },
  {
    "itemId": "r8",
    "order": 8,
    "cluster": "C2",
    "clusterName": "Scale drawings",
    "question": "A model boat is built to a scale of \\(1:20\\). The real boat is 4 m long. How long is the model?",
    "options": [
      {
        "text": "20 cm",
        "correct": true,
        "feedback": "Correct. \\(4\\text{ m} = 400\\text{ cm}\\). Divide by the scale: \\(400 \\div 20 = 20\\text{ cm}\\)."
      },
      {
        "text": "0.2 cm",
        "correct": false,
        "feedback": "Divided \\(4 \\div 20 = 0.2\\text{ cm}\\) without changing metres to centimetres. \\(4\\text{ m} = 400\\text{ cm}\\), and \\(400 \\div 20 = 20\\)."
      },
      {
        "text": "80 cm",
        "correct": false,
        "feedback": "Multiplied \\(4 \\times 20 = 80\\text{ cm}\\). A model is smaller than the real boat, so divide the real length, 400 cm, by 20."
      },
      {
        "text": "8000 cm",
        "correct": false,
        "feedback": "Changed 4 m to 400 cm but then multiplied by 20, \\(400 \\times 20 = 8000\\text{ cm}\\). A model is smaller than the real boat, so divide."
      }
    ],
    "backward": "Converting between metres and centimetres, Ch7.",
    "forward": "Later in this chapter you use scale factors for lengths in enlargements."
  },
  {
    "itemId": "r9",
    "order": 9,
    "cluster": "C3",
    "clusterName": "Points on a line segment",
    "question": "A is the point \\((2, 0)\\) and B is the point \\((10, 8)\\). The point P lies on AB, one-quarter of the way from A to B. What are the coordinates of P?",
    "options": [
      {
        "text": "\\((2.5, 2)\\)",
        "correct": false,
        "feedback": "Found a quarter of B's coordinates, \\(10 \\div 4 = 2.5\\) and \\(8 \\div 4 = 2\\), giving \\((2.5, 2)\\). The move is a quarter of the change from A to B, added to A's coordinates."
      },
      {
        "text": "\\((6, 4)\\)",
        "correct": false,
        "feedback": "Found the midpoint, halfway from A to B, giving \\((6, 4)\\). One-quarter of the way is closer to A than that."
      },
      {
        "text": "\\((4, 2)\\)",
        "correct": true,
        "feedback": "Correct. From A to B the x-coordinate increases by 8 and the y-coordinate by 8. A quarter of each is 2, so P = \\((2 + 2, 0 + 2) = (4, 2)\\)."
      },
      {
        "text": "\\((8, 6)\\)",
        "correct": false,
        "feedback": "Went three-quarters of the way, \\(3 \\times 2 = 6\\) across and 6 up from A, giving \\((8, 6)\\). One-quarter is 2 across and 2 up."
      }
    ],
    "backward": "Fractions of an amount, Ch8.",
    "forward": "Later in this chapter you divide a line in a given ratio."
  },
  {
    "itemId": "r10",
    "order": 10,
    "cluster": "C4",
    "clusterName": "Translations and reflections",
    "question": "The point \\((-1, 6)\\) is translated by the column vector \\(\\begin{pmatrix}5\\\\-9\\end{pmatrix}\\). What are the coordinates of its image?",
    "options": [
      {
        "text": "\\((-6, 15)\\)",
        "correct": false,
        "feedback": "Subtracted the vector entries instead of adding, \\(-1 - 5 = -6\\) and \\(6 - (-9) = 15\\), giving \\((-6, 15)\\). Add the entries to the coordinates."
      },
      {
        "text": "\\((4, 15)\\)",
        "correct": false,
        "feedback": "Added 5 to x correctly but subtracted \\(-9\\) from y, \\(6 - (-9) = 15\\), giving \\((4, 15)\\). The bottom entry \\(-9\\) means move 9 down: \\(6 - 9 = -3\\)."
      },
      {
        "text": "\\((-5, -54)\\)",
        "correct": false,
        "feedback": "Multiplied the coordinates by the entries, \\(-1 \\times 5 = -5\\) and \\(6 \\times (-9) = -54\\), giving \\((-5, -54)\\). A translation adds the entries."
      },
      {
        "text": "\\((4, -3)\\)",
        "correct": true,
        "feedback": "Correct. x: \\(-1 + 5 = 4\\). y: \\(6 + (-9) = -3\\). The image is \\((4, -3)\\)."
      }
    ],
    "backward": "Adding negative numbers and plotting coordinates, Ch10.",
    "forward": "Later in this chapter you work out the vector from a shape and its image."
  },
  {
    "itemId": "r11",
    "order": 11,
    "cluster": "C5",
    "clusterName": "Rotations and enlargements",
    "question": "The point \\((6, -2)\\) is rotated 90° clockwise about the origin. What are the coordinates of its image?",
    "options": [
      {
        "text": "\\((-6, 2)\\)",
        "correct": false,
        "feedback": "Turned through 180°, changing both signs, giving \\((-6, 2)\\). A quarter-turn is 90°."
      },
      {
        "text": "\\((-2, -6)\\)",
        "correct": true,
        "feedback": "Correct. A quarter-turn clockwise about the origin sends \\((x, y)\\) to \\((y, -x)\\), so \\((6, -2)\\) goes to \\((-2, -6)\\)."
      },
      {
        "text": "\\((6, 2)\\)",
        "correct": false,
        "feedback": "Changed only the sign of y, giving \\((6, 2)\\). That is a reflection in the x-axis. A rotation also swaps the roles of the coordinates."
      },
      {
        "text": "\\((2, 6)\\)",
        "correct": false,
        "feedback": "Turned anticlockwise, so \\((x, y)\\) goes to \\((-y, x)\\), giving \\((2, 6)\\). The question says clockwise."
      }
    ],
    "backward": "Coordinates in all four quadrants, Ch10.",
    "forward": "Later in this chapter you describe rotations by their centre, angle and direction."
  },
  {
    "itemId": "r12",
    "order": 12,
    "cluster": "C6",
    "clusterName": "Mixed position and transformation problems",
    "question": "A map uses a scale of 1 cm to 3 km. Town A is at \\((2, 1)\\) and town B is at \\((10, 7)\\), where the coordinates are in centimetres on the map. A service station is at the midpoint of AB. How far east of A is the service station in real life?",
    "options": [
      {
        "text": "7 km",
        "correct": false,
        "feedback": "Added \\(4 + 3 = 7\\text{ km}\\). Each centimetre stands for 3 km, so multiply the 4 cm by 3."
      },
      {
        "text": "24 km",
        "correct": false,
        "feedback": "Used the whole east-west distance from A to B, \\(10 - 2 = 8\\text{ cm}\\), giving \\(8 \\times 3 = 24\\text{ km}\\). The service station is only halfway, 4 cm from A."
      },
      {
        "text": "18 km",
        "correct": false,
        "feedback": "Used the midpoint's x-coordinate, 6 cm, as the distance from A, giving \\(6 \\times 3 = 18\\text{ km}\\). The x-coordinate measures from the y-axis; the distance from A is \\(6 - 2 = 4\\text{ cm}\\)."
      },
      {
        "text": "12 km",
        "correct": true,
        "feedback": "Correct. The midpoint is \\(((2 + 10) \\div 2, (1 + 7) \\div 2) = (6, 4)\\), which is \\(6 - 2 = 4\\text{ cm}\\) east of A on the map. \\(4 \\times 3 = 12\\text{ km}\\)."
      }
    ],
    "backward": "Scaling up a ratio, Ch11, and reading coordinates, Ch10.",
    "forward": "Later in this chapter you combine scales with points on a line."
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
  title: "Position and Transformation — Core Fluency",
  subtitle: "Grade 8 · Level 1 · Core Fluency",
  description: "Bearings, back bearings, scale drawings, points on line segments, and single transformations — warm-up, diagnostic, and spaced recheck for core fluency.",
  clusterNames: CLUSTER_NAMES,
  gateReviewHTML: "<p><strong>Warm-up done.</strong> Next comes the diagnostic. It is not a test and it is not timed, so there is no prize for speed. It is a check on how secure your skills already are with: reading and writing bearings, using map and plan scales, finding midpoints and points on a line, translating and reflecting shapes, and rotating and enlarging them. For each question, ask yourself first: where does this start, and which way round or which direction? Then work it out before you choose. If a question feels awkward, that tells us exactly where to look next, so it is useful, not a failure.</p><p>You will meet all six topics, mixed together. Take your time.</p>",
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

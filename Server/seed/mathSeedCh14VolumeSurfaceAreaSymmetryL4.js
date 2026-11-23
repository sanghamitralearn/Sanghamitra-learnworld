// Volume, Surface Area and Symmetry — Grade 8, Level 4 (Speed & Strategy).
// Warm-up, diagnostic and spaced recheck items.
// Run with: node seed/mathSeedCh14VolumeSurfaceAreaSymmetryL4.js
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-8";
const GRADE_LABEL = "Grade 8";
const CHAPTER_SLUG = "ch-14-volume-surface-area-symmetry";
const CHAPTER_NAME = "Volume, Surface Area and Symmetry";
const LEVEL = 4;

const CLUSTER_NAMES = {
  "C1": "Volume of prisms and cylinders",
  "C2": "Surface area of cuboids and triangular prisms",
  "C3": "Surface area of cylinders",
  "C4": "Surface area of pyramids",
  "C5": "Symmetry in 3D",
  "C6": "Mixed 3D problems"
};

const warmupItems = [
  {
    "itemId": "w1",
    "order": 1,
    "cluster": "C1",
    "clusterName": "Volume of prisms and cylinders",
    "tier": "S",
    "question": "A box is a cuboid with edges of 9 cm, 4 cm and 5 cm. Find its volume.",
    "options": [
      {
        "text": "18 cm³",
        "correct": false,
        "feedback": "Added the three edges, \\(9 + 4 + 5 = 18\\), giving 18 cm³. A volume is found by multiplying the three edges."
      },
      {
        "text": "36 cm³",
        "correct": false,
        "feedback": "Found only the area of the base, \\(9 \\times 4 = 36\\), giving 36 cm³. Multiply by the height, 5, as well."
      },
      {
        "text": "202 cm³",
        "correct": false,
        "feedback": "Found the total surface area, \\(2 \\times (9 \\times 4) + 2 \\times (9 \\times 5) + 2 \\times (4 \\times 5) = 202\\), giving 202 cm³. That is an area. The volume is \\(\\text{length} \\times \\text{width} \\times \\text{height}\\)."
      },
      {
        "text": "180 cm³",
        "correct": true,
        "feedback": "Correct. Volume = \\(\\text{length} \\times \\text{width} \\times \\text{height} = 9 \\times 4 \\times 5 = 180\\text{ cm}^3\\)."
      }
    ],
    "retryHint": "Multiply length, width and height.",
    "backward": "Multiplying whole numbers, Ch1, and units of volume, Ch7.",
    "forward": "Later in this chapter you find the surface area of the same solid."
  },
  {
    "itemId": "w2",
    "order": 2,
    "cluster": "C4",
    "clusterName": "Surface area of pyramids",
    "tier": "S",
    "question": "Find the area of one of the triangular faces of the square-based pyramid in the diagram.<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 394 229\" width=\"394\" height=\"229\" role=\"img\" aria-label=\"Square-based pyramid, base edge 14 cm, slant height 11 cm.\"><rect x=\"0\" y=\"0\" width=\"394\" height=\"229\" fill=\"#ffffff\"/><polygon points=\"58,178.93 235.36,178.93 183,46\" fill=\"#eef4fa\" stroke=\"none\"/><polygon points=\"235.36,178.93 308,128.06 183,46\" fill=\"#eef4fa\" stroke=\"none\"/><line x1=\"130.64\" y1=\"128.06\" x2=\"308\" y2=\"128.06\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"58\" y1=\"178.93\" x2=\"130.64\" y2=\"128.06\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"130.64\" y1=\"128.06\" x2=\"183\" y2=\"46\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"58\" y1=\"178.93\" x2=\"235.36\" y2=\"178.93\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"235.36\" y1=\"178.93\" x2=\"308\" y2=\"128.06\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"183\" y1=\"46\" x2=\"235.36\" y2=\"178.93\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"58\" y1=\"178.93\" x2=\"183\" y2=\"46\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"183\" y1=\"46\" x2=\"308\" y2=\"128.06\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"183\" y1=\"46\" x2=\"146.68\" y2=\"178.93\" stroke=\"#c0392b\" stroke-width=\"1.8\" stroke-dasharray=\"6 4\"/><text x=\"146.68\" y=\"198.93\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">14 cm</text><rect x=\"143.34\" y=\"104.46\" width=\"43\" height=\"18\" fill=\"#ffffff\"/><text x=\"164.84\" y=\"117.46\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">11 cm</text></svg></div>",
    "options": [
      {
        "text": "504 cm²",
        "correct": false,
        "feedback": "Found the total surface area, \\(14 \\times 14 + 4 \\times 77 = 504\\), giving 504 cm². The question asks for one triangular face."
      },
      {
        "text": "77 cm²",
        "correct": true,
        "feedback": "Correct. Each face is a triangle with base 14 cm and height equal to the slant height, 11 cm: \\(\\tfrac{1}{2} \\times 14 \\times 11 = 77\\text{ cm}^2\\)."
      },
      {
        "text": "308 cm²",
        "correct": false,
        "feedback": "Found the area of all four faces, \\(4 \\times 77 = 308\\), giving 308 cm². The question asks for one face."
      },
      {
        "text": "154 cm²",
        "correct": false,
        "feedback": "Forgot the ½: \\(14 \\times 11 = 154\\), giving 154 cm². Each face is a triangle, so use \\(\\tfrac{1}{2} \\times \\text{base} \\times \\text{height}\\)."
      }
    ],
    "retryHint": "Use the area of a triangle: half the base times the slant height.",
    "backward": "Area of a triangle, Ch7.",
    "forward": "Later in this chapter you add all four faces and the base."
  },
  {
    "itemId": "w3",
    "order": 3,
    "cluster": "C2",
    "clusterName": "Surface area of cuboids and triangular prisms",
    "tier": "C",
    "question": "Find the total surface area of a cuboid with edges of 6 cm, 5 cm and 3 cm.",
    "options": [
      {
        "text": "96 cm²",
        "correct": false,
        "feedback": "Left out one pair of faces: \\(2 \\times (6 \\times 5) + 2 \\times (6 \\times 3) = 96\\), giving 96 cm². A cuboid has three pairs of faces. The pair with area \\(5 \\times 3 = 15\\) must be added too."
      },
      {
        "text": "90 cm²",
        "correct": false,
        "feedback": "Found the volume, \\(6 \\times 5 \\times 3 = 90\\), giving 90 cm². Surface area is the total area of the six faces."
      },
      {
        "text": "126 cm²",
        "correct": true,
        "feedback": "Correct. \\(2 \\times (6 \\times 5) + 2 \\times (6 \\times 3) + 2 \\times (5 \\times 3) = 60 + 36 + 30 = 126\\text{ cm}^2\\)."
      },
      {
        "text": "63 cm²",
        "correct": false,
        "feedback": "Added the areas of only three different faces, \\(30 + 18 + 15 = 63\\), giving 63 cm². Every face has an equal partner, so double it."
      }
    ],
    "retryHint": "Find the area of each pair of faces, then add the three pairs.",
    "backward": "Area of a rectangle, Ch7.",
    "forward": "Later in this chapter you find the surface area of other solids."
  },
  {
    "itemId": "w4",
    "order": 4,
    "cluster": "C5",
    "clusterName": "Symmetry in 3D",
    "tier": "S",
    "question": "How many axes of rotational symmetry does a square-based pyramid have?",
    "options": [
      {
        "text": "2 axes",
        "correct": false,
        "feedback": "Gave 2 axes, counting a line through the midpoints of opposite base edges. A turn about that line does not fit the pyramid onto itself, so only 1 axis works."
      },
      {
        "text": "3 axes",
        "correct": false,
        "feedback": "Gave 3 axes, as for a cuboid with three different edges. A pyramid with a point at the top has no axis across its width, so only 1 axis works."
      },
      {
        "text": "4 axes",
        "correct": false,
        "feedback": "Gave 4 axes, counting the 4 planes of symmetry as if they were axes. A plane is a mirror, an axis is a line you turn about, and there is only 1 axis."
      },
      {
        "text": "1 axis",
        "correct": true,
        "feedback": "Correct. The only axis runs from the apex to the centre of the base. The pyramid fits onto itself four times in one turn about it."
      }
    ],
    "retryHint": "An axis of rotation is a line you can turn the solid about so that it fits onto itself.",
    "backward": "Rotation and order of rotational symmetry, Ch13.",
    "forward": "Later in this chapter you count planes of symmetry in other solids."
  },
  {
    "itemId": "w5",
    "order": 5,
    "cluster": "C3",
    "clusterName": "Surface area of cylinders",
    "tier": "C",
    "question": "A label goes once round the curved side of the tin in the diagram, with no overlap. Use \\(\\pi = 3.14\\). What is the area of the label?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 300 274\" width=\"300\" height=\"274\" role=\"img\" aria-label=\"Cylinder, radius 4 cm, height 10 cm.\"><rect x=\"0\" y=\"0\" width=\"300\" height=\"274\" fill=\"#ffffff\"/><ellipse cx=\"130\" cy=\"64\" rx=\"60\" ry=\"18\" fill=\"#eef4fa\" stroke=\"#333333\" stroke-width=\"2\"/><line x1=\"70\" y1=\"64\" x2=\"70\" y2=\"214\" stroke=\"#333333\" stroke-width=\"2\"/><line x1=\"190\" y1=\"64\" x2=\"190\" y2=\"214\" stroke=\"#333333\" stroke-width=\"2\"/><path d=\"M 70 214 A 60 18 0 0 0 190 214\" fill=\"none\" stroke=\"#333333\" stroke-width=\"2\"/><path d=\"M 70 214 A 60 18 0 0 1 190 214\" fill=\"none\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"130\" y1=\"64\" x2=\"190\" y2=\"64\" stroke=\"#333333\" stroke-width=\"1.8\"/><circle cx=\"130\" cy=\"64\" r=\"3\" fill=\"#333333\"/><text x=\"160\" y=\"40\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">4 cm</text><line x1=\"194\" y1=\"64\" x2=\"222\" y2=\"64\" stroke=\"#888888\" stroke-width=\"1\"/><line x1=\"194\" y1=\"214\" x2=\"222\" y2=\"214\" stroke=\"#888888\" stroke-width=\"1\"/><line x1=\"218\" y1=\"64\" x2=\"218\" y2=\"214\" stroke=\"#333333\" stroke-width=\"1.5\"/><polyline points=\"214,72 218,64 222,72\" stroke=\"#333333\" stroke-width=\"1.5\" fill=\"none\"/><polyline points=\"214,206 218,214 222,206\" stroke=\"#333333\" stroke-width=\"1.5\" fill=\"none\"/><text x=\"226\" y=\"144\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"start\">10 cm</text></svg></div>",
    "options": [
      {
        "text": "351.68 cm²",
        "correct": false,
        "feedback": "Included the two circular ends: \\(251.2 + 100.48 = 351.68\\), giving 351.68 cm². The question asks for the curved surface only."
      },
      {
        "text": "251.2 cm²",
        "correct": true,
        "feedback": "Correct. Curved surface = \\(2 \\times \\pi \\times r \\times h = 2 \\times 3.14 \\times 4 \\times 10 = 251.2\\text{ cm}^2\\)."
      },
      {
        "text": "502.4 cm²",
        "correct": false,
        "feedback": "Used the diameter, 8, as the radius: \\(2 \\times 3.14 \\times 8 \\times 10 = 502.4\\), giving 502.4 cm². The radius is 4 cm."
      },
      {
        "text": "125.6 cm²",
        "correct": false,
        "feedback": "Forgot the 2: \\(3.14 \\times 4 \\times 10 = 125.6\\), giving 125.6 cm². The curved surface is a rectangle as long as the circumference, \\(2 \\times \\pi \\times r\\)."
      }
    ],
    "retryHint": "Roll the curved surface out flat. It is a rectangle as long as the circumference.",
    "backward": "Circumference of a circle, Ch7.",
    "forward": "Later in this chapter you add the two circular ends."
  },
  {
    "itemId": "w6",
    "order": 6,
    "cluster": "C1",
    "clusterName": "Volume of prisms and cylinders",
    "tier": "T",
    "question": "The six faces of a cube have a combined area of 150 cm². What is the volume of the cube?",
    "options": [
      {
        "text": "125 cm³",
        "correct": true,
        "feedback": "Correct. A cube has 6 equal faces, so one face is \\(150 \\div 6 = 25\\text{ cm}^2\\). The edge is 5 cm because \\(5 \\times 5 = 25\\). The volume is \\(5 \\times 5 \\times 5 = 125\\text{ cm}^3\\)."
      },
      {
        "text": "750 cm³",
        "correct": false,
        "feedback": "Multiplied the surface area by the edge, \\(150 \\times 5 = 750\\), giving 750 cm³. The edge must come from the faces first: each face is 25 cm², so the edge is 5 cm."
      },
      {
        "text": "5 cm³",
        "correct": false,
        "feedback": "Stopped at the edge, 5, giving 5 cm³. The edge is a length. Cube it to get the volume."
      },
      {
        "text": "25 cm³",
        "correct": false,
        "feedback": "Found the area of one face, \\(150 \\div 6 = 25\\), giving 25 cm³. A face is an area. Multiply by the edge, 5, to get the volume."
      }
    ],
    "retryHint": "Divide by 6 to get one face. Then find the edge before you find the volume.",
    "backward": "Indices and square roots, Ch1.",
    "forward": "Later in this chapter you meet more problems that link area and volume."
  },
  {
    "itemId": "w7",
    "order": 7,
    "cluster": "C1",
    "clusterName": "Volume of prisms and cylinders",
    "tier": "C",
    "question": "A prism is 7 cm long. Its end is a right-angled triangle with shorter sides of 5 cm and 12 cm. What is its volume?",
    "options": [
      {
        "text": "420 cm³",
        "correct": false,
        "feedback": "Forgot the ½ for the triangle: \\(5 \\times 12 \\times 7 = 420\\), giving 420 cm³. The end is a triangle, so its area is \\(\\tfrac{1}{2} \\times 5 \\times 12\\)."
      },
      {
        "text": "30 cm³",
        "correct": false,
        "feedback": "Found only the area of the end, \\(\\tfrac{1}{2} \\times 5 \\times 12 = 30\\), giving 30 cm³. Multiply by the length of the prism, 7."
      },
      {
        "text": "210 cm³",
        "correct": true,
        "feedback": "Correct. The end has area \\(\\tfrac{1}{2} \\times 5 \\times 12 = 30\\text{ cm}^2\\). The volume is \\(30 \\times 7 = 210\\text{ cm}^3\\)."
      },
      {
        "text": "546 cm³",
        "correct": false,
        "feedback": "Used the hypotenuse, 13, as one of the two sides at the right angle: \\(\\tfrac{1}{2} \\times 12 \\times 13 \\times 7 = 546\\), giving 546 cm³. The base and height of the end are the shorter sides, 5 and 12, which meet at the right angle."
      }
    ],
    "retryHint": "Area of the end times the length.",
    "backward": "Area of a triangle, Ch7.",
    "forward": "Later in this chapter you find the surface area of the same prism."
  },
  {
    "itemId": "w8",
    "order": 8,
    "cluster": "C4",
    "clusterName": "Surface area of pyramids",
    "tier": "C",
    "question": "A square-based pyramid has a base edge of 16 cm and a vertical height of 15 cm. What is its slant height?",
    "options": [
      {
        "text": "17 cm",
        "correct": true,
        "feedback": "Correct. Half the base edge is 8 cm. The slant height is the longest side of a right-angled triangle with sides 8 cm and 15 cm, so slant height² = \\(8 \\times 8 + 15 \\times 15 = 64 + 225 = 289\\), and the slant height is 17 cm."
      },
      {
        "text": "7 cm",
        "correct": false,
        "feedback": "Subtracted the lengths, \\(15 - 8 = 7\\), giving 7 cm. The slant height is the longest side, so it is longer than both of the other two sides."
      },
      {
        "text": "31 cm",
        "correct": false,
        "feedback": "Added the vertical height and the whole base edge, \\(15 + 16 = 31\\), giving 31 cm. The right-angled triangle uses half the base edge, 8 cm, not the whole edge."
      },
      {
        "text": "23 cm",
        "correct": false,
        "feedback": "Added the lengths, \\(15 + 8 = 23\\), giving 23 cm. Use Pythagoras: square the lengths, add them, then take the square root."
      }
    ],
    "retryHint": "Draw the right-angled triangle: vertical height, half the base edge and slant height.",
    "backward": "Pythagoras' theorem, Ch5.",
    "forward": "Later in this chapter you use it to find the area of the triangular faces."
  }
];

const diagnosticItems = [
  {
    "itemId": "d1",
    "order": 1,
    "cluster": "C1",
    "clusterName": "Volume of prisms and cylinders",
    "tier": "S",
    "question": "A cuboid has a base area of 45 cm² and a height of 8 cm. What is its volume?",
    "options": [
      {
        "text": "53 cm³",
        "correct": false,
        "feedback": "Added the base area and the height, \\(45 + 8 = 53\\), giving 53 cm³. Multiply them."
      },
      {
        "text": "180 cm³",
        "correct": false,
        "feedback": "Halved the product, \\(45 \\times 8 \\div 2 = 180\\), giving 180 cm³. Halve only for a triangle. This solid is a cuboid, so use the whole product."
      },
      {
        "text": "360 cm³",
        "correct": true,
        "feedback": "Correct. Volume = area of \\(\\text{base} \\times \\text{height} = 45 \\times 8 = 360\\text{ cm}^3\\)."
      },
      {
        "text": "2880 cm³",
        "correct": false,
        "feedback": "Used the height twice, \\(45 \\times 8 \\times 8 = 2880\\), giving 2880 cm³. Multiply the base area by the height once, 8."
      }
    ],
    "backward": "Multiplying whole numbers, Ch1.",
    "forward": "Later in this chapter you use the same idea for cylinders and other prisms."
  },
  {
    "itemId": "d2",
    "order": 2,
    "cluster": "C4",
    "clusterName": "Surface area of pyramids",
    "tier": "S",
    "question": "How much card is needed to make the four sloping faces of the pyramid in the diagram?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 245 306\" width=\"245\" height=\"306\" role=\"img\" aria-label=\"Square-based pyramid, base edge 6 cm, slant height 17 cm.\"><rect x=\"0\" y=\"0\" width=\"245\" height=\"306\" fill=\"#ffffff\"/><polygon points=\"58,256 129.62,256 108.47,46\" fill=\"#eef4fa\" stroke=\"none\"/><polygon points=\"129.62,256 158.95,235.46 108.47,46\" fill=\"#eef4fa\" stroke=\"none\"/><line x1=\"87.33\" y1=\"235.46\" x2=\"158.95\" y2=\"235.46\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"58\" y1=\"256\" x2=\"87.33\" y2=\"235.46\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"87.33\" y1=\"235.46\" x2=\"108.47\" y2=\"46\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"58\" y1=\"256\" x2=\"129.62\" y2=\"256\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"129.62\" y1=\"256\" x2=\"158.95\" y2=\"235.46\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"108.47\" y1=\"46\" x2=\"129.62\" y2=\"256\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"58\" y1=\"256\" x2=\"108.47\" y2=\"46\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"108.47\" y1=\"46\" x2=\"158.95\" y2=\"235.46\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"108.47\" y1=\"46\" x2=\"93.81\" y2=\"256\" stroke=\"#c0392b\" stroke-width=\"1.8\" stroke-dasharray=\"6 4\"/><text x=\"93.81\" y=\"276\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">6 cm</text><rect x=\"79.64\" y=\"143\" width=\"43\" height=\"18\" fill=\"#ffffff\"/><text x=\"101.14\" y=\"156\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">17 cm</text></svg></div>",
    "options": [
      {
        "text": "240 cm²",
        "correct": false,
        "feedback": "Included the square base, \\(204 + 36 = 240\\), giving 240 cm². The question asks for the four triangular faces only."
      },
      {
        "text": "204 cm²",
        "correct": true,
        "feedback": "Correct. Each face is \\(\\tfrac{1}{2} \\times 6 \\times 17 = 51\\text{ cm}^2\\), so four faces are \\(4 \\times 51 = 204\\text{ cm}^2\\)."
      },
      {
        "text": "408 cm²",
        "correct": false,
        "feedback": "Forgot the ½ on each face, \\(4 \\times (6 \\times 17) = 408\\), giving 408 cm². Each face is a triangle, \\(\\tfrac{1}{2} \\times 6 \\times 17\\)."
      },
      {
        "text": "102 cm²",
        "correct": false,
        "feedback": "Found only two faces, \\(2 \\times 51 = 102\\), giving 102 cm². A square-based pyramid has four triangular faces."
      }
    ],
    "backward": "Area of a triangle, Ch7.",
    "forward": "Later in this chapter you add the base to find the total surface area."
  },
  {
    "itemId": "d3",
    "order": 3,
    "cluster": "C2",
    "clusterName": "Surface area of cuboids and triangular prisms",
    "tier": "H",
    "question": "The diagram shows a triangular prism. What is its total surface area?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 250 306\" width=\"250\" height=\"306\" role=\"img\" aria-label=\"Triangular prism with end sides 5 cm, 12 cm and 13 cm and length 4 cm.\"><rect x=\"0\" y=\"0\" width=\"250\" height=\"306\" fill=\"#ffffff\"/><polygon points=\"58,64.32 137.87,256 58,256\" fill=\"#eef4fa\" stroke=\"none\"/><polygon points=\"137.87,256 58,64.32 84.17,46 164.03,237.68\" fill=\"#eef4fa\" stroke=\"none\"/><line x1=\"84.17\" y1=\"237.68\" x2=\"164.03\" y2=\"237.68\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"84.17\" y1=\"237.68\" x2=\"84.17\" y2=\"46\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"58\" y1=\"256\" x2=\"84.17\" y2=\"237.68\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"58\" y1=\"64.32\" x2=\"137.87\" y2=\"256\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"58\" y1=\"256\" x2=\"137.87\" y2=\"256\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"58\" y1=\"256\" x2=\"58\" y2=\"64.32\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"84.17\" y1=\"46\" x2=\"164.03\" y2=\"237.68\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"137.87\" y1=\"256\" x2=\"164.03\" y2=\"237.68\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"58\" y1=\"64.32\" x2=\"84.17\" y2=\"46\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><polyline points=\"69,256 69,245 58,245\" stroke=\"#333333\" stroke-width=\"1.3\" fill=\"none\"/><text x=\"97.93\" y=\"276\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">5 cm</text><text x=\"47\" y=\"165.16\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"end\">12 cm</text><text x=\"109.01\" y=\"159.01\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"start\">13 cm</text><text x=\"160.59\" y=\"259.07\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"start\">4 cm</text></svg></div>",
    "options": [
      {
        "text": "180 cm²",
        "correct": true,
        "feedback": "Correct. The two triangular ends are \\(2 \\times (\\tfrac{1}{2} \\times 5 \\times 12 = 30) = 60\\text{ cm}^2\\). The three rectangles together are \\((5 + 12 + 13) \\times 4 = 120\\text{ cm}^2\\). The total is \\(60 + 120 = 180\\text{ cm}^2\\)."
      },
      {
        "text": "150 cm²",
        "correct": false,
        "feedback": "Counted only one triangular end, \\(30 + 120 = 150\\), giving 150 cm². The prism has two triangular ends."
      },
      {
        "text": "120 cm²",
        "correct": false,
        "feedback": "Found only the three rectangles, \\((5 + 12 + 13) \\times 4 = 120\\), giving 120 cm². Add the two triangular ends, 60 cm² in total."
      },
      {
        "text": "128 cm²",
        "correct": false,
        "feedback": "Left out the 13 cm rectangle: \\(60 + (5 + 12) \\times 4 = 128\\), giving 128 cm². The prism has three rectangles, including the 13 by 4 one."
      }
    ],
    "backward": "Areas of triangles and rectangles, Ch7.",
    "forward": "Later in this chapter you find the volume of the same prism."
  },
  {
    "itemId": "d4",
    "order": 4,
    "cluster": "C5",
    "clusterName": "Symmetry in 3D",
    "tier": "S",
    "question": "Exactly 4 planes of symmetry: which of these solids has them?",
    "options": [
      {
        "text": "A square-based pyramid",
        "correct": true,
        "feedback": "Correct. A square-based pyramid has 2 planes through the midpoints of opposite base edges and 2 through the diagonals, which makes 4. It has no horizontal plane because the top is a point."
      },
      {
        "text": "A cuboid with three different edge lengths",
        "correct": false,
        "feedback": "Chose A cuboid with three different edge lengths. It has 3 planes of symmetry, one parallel to each pair of faces."
      },
      {
        "text": "A cuboid with square ends (not a cube)",
        "correct": false,
        "feedback": "Chose A cuboid with square ends (not a cube). It has 5 planes: 2 through the midpoints of opposite edges, 2 diagonal and 1 across the middle."
      },
      {
        "text": "A cube",
        "correct": false,
        "feedback": "Chose A cube. It has 9 planes of symmetry, 3 parallel to the faces and 6 through opposite edges."
      }
    ],
    "backward": "Reflection and line symmetry, Ch13.",
    "forward": "Later in this chapter you use planes of symmetry to cut solids."
  },
  {
    "itemId": "d5",
    "order": 5,
    "cluster": "C3",
    "clusterName": "Surface area of cylinders",
    "tier": "S",
    "question": "How much metal is needed to make the closed drum in the diagram, including both ends? Use \\(\\pi = 3.14\\).<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 420 220\" width=\"420\" height=\"220\" role=\"img\" aria-label=\"Closed cylinder, radius 10 cm, height 5 cm.\"><rect x=\"0\" y=\"0\" width=\"420\" height=\"220\" fill=\"#ffffff\"/><ellipse cx=\"190\" cy=\"82\" rx=\"120\" ry=\"36\" fill=\"#eef4fa\" stroke=\"#333333\" stroke-width=\"2\"/><line x1=\"70\" y1=\"82\" x2=\"70\" y2=\"142\" stroke=\"#333333\" stroke-width=\"2\"/><line x1=\"310\" y1=\"82\" x2=\"310\" y2=\"142\" stroke=\"#333333\" stroke-width=\"2\"/><path d=\"M 70 142 A 120 36 0 0 0 310 142\" fill=\"none\" stroke=\"#333333\" stroke-width=\"2\"/><path d=\"M 70 142 A 120 36 0 0 1 310 142\" fill=\"none\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"190\" y1=\"82\" x2=\"310\" y2=\"82\" stroke=\"#333333\" stroke-width=\"1.8\"/><circle cx=\"190\" cy=\"82\" r=\"3\" fill=\"#333333\"/><text x=\"250\" y=\"40\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">10 cm</text><line x1=\"314\" y1=\"82\" x2=\"342\" y2=\"82\" stroke=\"#888888\" stroke-width=\"1\"/><line x1=\"314\" y1=\"142\" x2=\"342\" y2=\"142\" stroke=\"#888888\" stroke-width=\"1\"/><line x1=\"338\" y1=\"82\" x2=\"338\" y2=\"142\" stroke=\"#333333\" stroke-width=\"1.5\"/><polyline points=\"334,90 338,82 342,90\" stroke=\"#333333\" stroke-width=\"1.5\" fill=\"none\"/><polyline points=\"334,134 338,142 342,134\" stroke=\"#333333\" stroke-width=\"1.5\" fill=\"none\"/><text x=\"346\" y=\"117\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"start\">5 cm</text></svg></div>",
    "options": [
      {
        "text": "628 cm²",
        "correct": false,
        "feedback": "Found only the two circular ends, \\(2 \\times 3.14 \\times 10 \\times 10 = 628\\), giving 628 cm². The curved surface, 314 cm², must be added."
      },
      {
        "text": "942 cm²",
        "correct": true,
        "feedback": "Correct. The curved surface is \\(2 \\times 3.14 \\times 10 \\times 5 = 314\\text{ cm}^2\\) and the two ends are \\(2 \\times 3.14 \\times 10 \\times 10 = 628\\text{ cm}^2\\). The total is \\(314 + 628 = 942\\text{ cm}^2\\)."
      },
      {
        "text": "3140 cm²",
        "correct": false,
        "feedback": "Used the diameter, 20, as the radius: \\(2 \\times 3.14 \\times 20 \\times 25 = 3140\\), giving 3140 cm². The radius is 10 cm."
      },
      {
        "text": "314 cm²",
        "correct": false,
        "feedback": "Found only the curved surface, \\(2 \\times 3.14 \\times 10 \\times 5 = 314\\), giving 314 cm². The closed cylinder also has two circular ends, 628 cm² in total."
      }
    ],
    "backward": "Circumference and area of a circle, Ch7.",
    "forward": "Later in this chapter you meet the open cylinder."
  },
  {
    "itemId": "d6",
    "order": 6,
    "cluster": "C1",
    "clusterName": "Volume of prisms and cylinders",
    "tier": "T",
    "question": "A cylinder fits exactly inside a cube: its diameter and its height both equal the edge of the cube. Use \\(\\pi = 3.14\\). What percentage of the cube's volume does the cylinder fill?",
    "options": [
      {
        "text": "314%",
        "correct": false,
        "feedback": "Gave 314%, using the edge as the radius. The edge is the diameter, so the radius is half of it. A cylinder inside a cube cannot fill more than 100%."
      },
      {
        "text": "21.5%",
        "correct": false,
        "feedback": "Gave 21.5%, which is the percentage of the cube that is empty, \\(100 - 78.5\\). The question asks for the part the cylinder fills."
      },
      {
        "text": "78.5%",
        "correct": true,
        "feedback": "Correct. Let the edge be 2r, so the cylinder has radius r and height 2r. Its volume is \\(3.14 \\times r \\times r \\times 2r = 6.28r^3\\) and the cube is \\(2r \\times 2r \\times 2r = 8r^3\\). The fraction is \\(6.28 \\div 8 = 0.785\\), which is 78.5%."
      },
      {
        "text": "39.25%",
        "correct": false,
        "feedback": "Gave 39.25%, using a height equal to the radius, r, instead of the diameter, 2r: \\(3.14r^3 \\div 8r^3 = 0.3925\\). The height equals the edge, 2r."
      }
    ],
    "backward": "Percentages, Ch3, and area of a circle, Ch7.",
    "forward": "Later in this chapter you compare other solids that fit inside each other."
  },
  {
    "itemId": "d7",
    "order": 7,
    "cluster": "C1",
    "clusterName": "Volume of prisms and cylinders",
    "tier": "H",
    "question": "The diagram shows a prism whose end is an L-shape. What is its volume?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 394 286\" width=\"394\" height=\"286\" role=\"img\" aria-label=\"Prism with an L-shaped end: outer rectangle 9 cm by 7 cm with a 3 cm by 4 cm rectangle missing from a corner; length 6 cm.\"><rect x=\"0\" y=\"0\" width=\"394\" height=\"286\" fill=\"#ffffff\"/><polygon points=\"58,83.55 188.92,83.55 188.92,170.83 254.38,170.83 254.38,236.29 58,236.29\" fill=\"#eef4fa\" stroke=\"none\"/><polygon points=\"254.38,236.29 254.38,170.83 308,133.28 308,198.74\" fill=\"#eef4fa\" stroke=\"none\"/><polygon points=\"254.38,170.83 188.92,170.83 242.54,133.28 308,133.28\" fill=\"#eef4fa\" stroke=\"none\"/><polygon points=\"188.92,170.83 188.92,83.55 242.54,46 242.54,133.28\" fill=\"#eef4fa\" stroke=\"none\"/><polygon points=\"188.92,83.55 58,83.55 111.62,46 242.54,46\" fill=\"#eef4fa\" stroke=\"none\"/><line x1=\"111.62\" y1=\"198.74\" x2=\"308\" y2=\"198.74\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"111.62\" y1=\"198.74\" x2=\"111.62\" y2=\"46\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"58\" y1=\"236.29\" x2=\"111.62\" y2=\"198.74\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"58\" y1=\"83.55\" x2=\"188.92\" y2=\"83.55\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"188.92\" y1=\"170.83\" x2=\"188.92\" y2=\"83.55\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"188.92\" y1=\"170.83\" x2=\"254.38\" y2=\"170.83\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"254.38\" y1=\"236.29\" x2=\"254.38\" y2=\"170.83\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"58\" y1=\"236.29\" x2=\"254.38\" y2=\"236.29\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"58\" y1=\"236.29\" x2=\"58\" y2=\"83.55\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"308\" y1=\"198.74\" x2=\"308\" y2=\"133.28\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"242.54\" y1=\"133.28\" x2=\"308\" y2=\"133.28\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"242.54\" y1=\"133.28\" x2=\"242.54\" y2=\"46\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"111.62\" y1=\"46\" x2=\"242.54\" y2=\"46\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"254.38\" y1=\"236.29\" x2=\"308\" y2=\"198.74\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"254.38\" y1=\"170.83\" x2=\"308\" y2=\"133.28\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"188.92\" y1=\"170.83\" x2=\"242.54\" y2=\"133.28\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"188.92\" y1=\"83.55\" x2=\"242.54\" y2=\"46\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"58\" y1=\"83.55\" x2=\"111.62\" y2=\"46\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><text x=\"156.19\" y=\"256.29\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">9 cm</text><text x=\"47\" y=\"164.92\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"end\">7 cm</text><text x=\"177.92\" y=\"132.19\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"end\">4 cm</text><text x=\"221.65\" y=\"190.83\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">3 cm</text><text x=\"290.83\" y=\"229.74\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"start\">6 cm</text></svg></div>",
    "options": [
      {
        "text": "378 cm³",
        "correct": false,
        "feedback": "Ignored the missing corner: \\(9 \\times 7 \\times 6 = 378\\), giving 378 cm³. Take away the missing corner, \\(3 \\times 4 = 12\\text{ cm}^2\\), from the end first."
      },
      {
        "text": "306 cm³",
        "correct": true,
        "feedback": "Correct. The area of the L-shape is \\(9 \\times 7 - 3 \\times 4 = 63 - 12 = 51\\text{ cm}^2\\). The volume is \\(51 \\times 6 = 306\\text{ cm}^3\\)."
      },
      {
        "text": "72 cm³",
        "correct": false,
        "feedback": "Found only the missing corner: \\(3 \\times 4 \\times 6 = 72\\), giving 72 cm³. The missing corner is not part of the solid. Subtract it from the whole."
      },
      {
        "text": "51 cm³",
        "correct": false,
        "feedback": "Found only the area of the L-shaped end, 51, giving 51 cm³. Multiply by the length of the prism, 6."
      }
    ],
    "backward": "Area of compound shapes, Ch7.",
    "forward": "Later in this chapter you find the surface area of the same kind of prism."
  },
  {
    "itemId": "d8",
    "order": 8,
    "cluster": "C4",
    "clusterName": "Surface area of pyramids",
    "tier": "C",
    "question": "The diagram shows a square-based pyramid. What is its total surface area?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 394 188\" width=\"394\" height=\"188\" role=\"img\" aria-label=\"Square-based pyramid, base edge 16 cm, vertical height 6 cm.\"><rect x=\"0\" y=\"0\" width=\"394\" height=\"188\" fill=\"#ffffff\"/><polygon points=\"58,137.94 235.36,137.94 183,46\" fill=\"#eef4fa\" stroke=\"none\"/><polygon points=\"235.36,137.94 308,87.08 183,46\" fill=\"#eef4fa\" stroke=\"none\"/><line x1=\"130.64\" y1=\"87.08\" x2=\"308\" y2=\"87.08\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"58\" y1=\"137.94\" x2=\"130.64\" y2=\"87.08\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"130.64\" y1=\"87.08\" x2=\"183\" y2=\"46\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"58\" y1=\"137.94\" x2=\"235.36\" y2=\"137.94\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"235.36\" y1=\"137.94\" x2=\"308\" y2=\"87.08\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"183\" y1=\"46\" x2=\"235.36\" y2=\"137.94\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"58\" y1=\"137.94\" x2=\"183\" y2=\"46\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"183\" y1=\"46\" x2=\"308\" y2=\"87.08\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"183\" y1=\"46\" x2=\"183\" y2=\"112.51\" stroke=\"#c0392b\" stroke-width=\"1.8\" stroke-dasharray=\"6 4\"/><line x1=\"187\" y1=\"46\" x2=\"338\" y2=\"46\" stroke=\"#888888\" stroke-width=\"1\"/><line x1=\"187\" y1=\"112.51\" x2=\"338\" y2=\"112.51\" stroke=\"#888888\" stroke-width=\"1\"/><line x1=\"334\" y1=\"46\" x2=\"334\" y2=\"112.51\" stroke=\"#333333\" stroke-width=\"1.5\"/><polyline points=\"330,54 334,46 338,54\" stroke=\"#333333\" stroke-width=\"1.5\" fill=\"none\"/><polyline points=\"330,104.51 334,112.51 338,104.51\" stroke=\"#333333\" stroke-width=\"1.5\" fill=\"none\"/><text x=\"146.68\" y=\"157.94\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">16 cm</text><text x=\"342\" y=\"84.25\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"start\">6 cm</text></svg></div>",
    "options": [
      {
        "text": "576 cm²",
        "correct": true,
        "feedback": "Correct. Half the base edge is 8, and \\(8 \\times 8 + 6 \\times 6 = 100\\), so the slant height is 10 cm. Each face is \\(\\tfrac{1}{2} \\times 16 \\times 10 = 80\\text{ cm}^2\\), so the four faces are 320. The base is \\(16 \\times 16 = 256\\). The total is \\(256 + 320 = 576\\text{ cm}^2\\)."
      },
      {
        "text": "448 cm²",
        "correct": false,
        "feedback": "Used the vertical height, 6, as the height of each face: \\(256 + 4 \\times (\\tfrac{1}{2} \\times 16 \\times 6 = 48) = 448\\), giving 448 cm². The height of a face is the slant height, 10 cm."
      },
      {
        "text": "416 cm²",
        "correct": false,
        "feedback": "Counted only two triangular faces: \\(256 + 2 \\times (\\tfrac{1}{2} \\times 16 \\times 10 = 80) = 416\\), giving 416 cm². A square-based pyramid has four triangular faces."
      },
      {
        "text": "320 cm²",
        "correct": false,
        "feedback": "Found only the four triangular faces, 320, giving 320 cm². The total surface area also includes the base, 256 cm²."
      }
    ],
    "backward": "Pythagoras' theorem, Ch5.",
    "forward": "Later in this chapter you meet more problems with joined solids."
  },
  {
    "itemId": "d9",
    "order": 9,
    "cluster": "C2",
    "clusterName": "Surface area of cuboids and triangular prisms",
    "tier": "S",
    "question": "Find the total surface area of a cube whose edges are each 11 cm long.",
    "options": [
      {
        "text": "605 cm²",
        "correct": false,
        "feedback": "Counted only 5 faces, \\(5 \\times 121 = 605\\), giving 605 cm². A cube has 6 faces, all of them part of the surface."
      },
      {
        "text": "66 cm²",
        "correct": false,
        "feedback": "Multiplied the edge by 6, \\(6 \\times 11 = 66\\), giving 66 cm². Each face is a square of area edge×edge."
      },
      {
        "text": "121 cm²",
        "correct": false,
        "feedback": "Found the area of one face, \\(11 \\times 11 = 121\\), giving 121 cm². A cube has 6 faces."
      },
      {
        "text": "726 cm²",
        "correct": true,
        "feedback": "Correct. A cube has 6 equal faces, each \\(11 \\times 11 = 121\\text{ cm}^2\\). The total is \\(6 \\times 121 = 726\\text{ cm}^2\\)."
      }
    ],
    "backward": "Area of a square, Ch7.",
    "forward": "Later in this chapter you meet more problems that compare solids."
  },
  {
    "itemId": "d10",
    "order": 10,
    "cluster": "C5",
    "clusterName": "Symmetry in 3D",
    "tier": "C",
    "question": "The diagram shows a cylinder cut along a plane of symmetry that contains its axis. What is the area of the new flat face made by the cut?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 262 263\" width=\"262\" height=\"263\" role=\"img\" aria-label=\"Cylinder, radius 3 cm, height 11 cm, cut lengthways through the centres of both ends.\"><rect x=\"0\" y=\"0\" width=\"262\" height=\"263\" fill=\"#ffffff\"/><polygon points=\"70,58.27 151.82,58.27 151.82,208.27 70,208.27\" fill=\"#c0392b\" fill-opacity=\"0.16\" stroke=\"#c0392b\" stroke-width=\"1.8\" stroke-dasharray=\"6 4\"/><ellipse cx=\"110.91\" cy=\"58.27\" rx=\"40.91\" ry=\"12.27\" fill=\"#eef4fa\" stroke=\"#333333\" stroke-width=\"2\"/><line x1=\"70\" y1=\"58.27\" x2=\"70\" y2=\"208.27\" stroke=\"#333333\" stroke-width=\"2\"/><line x1=\"151.82\" y1=\"58.27\" x2=\"151.82\" y2=\"208.27\" stroke=\"#333333\" stroke-width=\"2\"/><path d=\"M 70 208.27 A 40.91 12.27 0 0 0 151.82 208.27\" fill=\"none\" stroke=\"#333333\" stroke-width=\"2\"/><path d=\"M 70 208.27 A 40.91 12.27 0 0 1 151.82 208.27\" fill=\"none\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"110.91\" y1=\"58.27\" x2=\"110.91\" y2=\"208.27\" stroke=\"#c0392b\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"110.91\" y1=\"58.27\" x2=\"151.82\" y2=\"58.27\" stroke=\"#333333\" stroke-width=\"1.8\"/><circle cx=\"110.91\" cy=\"58.27\" r=\"3\" fill=\"#333333\"/><text x=\"131.36\" y=\"40\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">3 cm</text><line x1=\"155.82\" y1=\"58.27\" x2=\"183.82\" y2=\"58.27\" stroke=\"#888888\" stroke-width=\"1\"/><line x1=\"155.82\" y1=\"208.27\" x2=\"183.82\" y2=\"208.27\" stroke=\"#888888\" stroke-width=\"1\"/><line x1=\"179.82\" y1=\"58.27\" x2=\"179.82\" y2=\"208.27\" stroke=\"#333333\" stroke-width=\"1.5\"/><polyline points=\"175.82,66.27 179.82,58.27 183.82,66.27\" stroke=\"#333333\" stroke-width=\"1.5\" fill=\"none\"/><polyline points=\"175.82,200.27 179.82,208.27 183.82,200.27\" stroke=\"#333333\" stroke-width=\"1.5\" fill=\"none\"/><text x=\"187.82\" y=\"138.27\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"start\">11 cm</text></svg></div>",
    "options": [
      {
        "text": "17 cm²",
        "correct": false,
        "feedback": "Added the diameter and the height, \\(6 + 11 = 17\\), giving 17 cm². The area of a rectangle is found by multiplying."
      },
      {
        "text": "66 cm²",
        "correct": true,
        "feedback": "Correct. The cut goes through the centre, so the new face is a rectangle as wide as the diameter, 6 cm, and as tall as the cylinder, 11 cm. Its area is \\(6 \\times 11 = 66\\text{ cm}^2\\)."
      },
      {
        "text": "33 cm²",
        "correct": false,
        "feedback": "Used the radius, 3, as the width: \\(3 \\times 11 = 33\\), giving 33 cm². The cut passes through the centre, so the width is the diameter, 6 cm."
      },
      {
        "text": "132 cm²",
        "correct": false,
        "feedback": "Found the area of both new faces, \\(2 \\times 66 = 132\\), giving 132 cm². The question asks for one new flat face."
      }
    ],
    "backward": "Reflection and line symmetry, Ch13.",
    "forward": "Later in this chapter you find the surface area after such a cut."
  },
  {
    "itemId": "d11",
    "order": 11,
    "cluster": "C3",
    "clusterName": "Surface area of cylinders",
    "tier": "T",
    "question": "A cylindrical bucket with no lid has a radius of 5 cm and a height of 9 cm. Use \\(\\pi = 3.14\\). What area of metal is needed to make it?",
    "options": [
      {
        "text": "439.6 cm²",
        "correct": false,
        "feedback": "Counted both circular ends: \\(2 \\times \\pi \\times r \\times (r + h) = 2 \\times 3.14 \\times 5 \\times 14 = 439.6\\), giving 439.6 cm². The cylinder has no lid, so only one circular end is included."
      },
      {
        "text": "596.6 cm²",
        "correct": false,
        "feedback": "Used the diameter, 10, as the radius of the base, so the base came to \\(3.14 \\times 10 \\times 10 = 314\\) and the total to \\(282.6 + 314 = 596.6\\), giving 596.6 cm². The radius is 5 cm, so the base is 78.5 cm²."
      },
      {
        "text": "361.1 cm²",
        "correct": true,
        "feedback": "Correct. The curved surface is \\(2 \\times 3.14 \\times 5 \\times 9 = 282.6\\text{ cm}^2\\). There is one circular base, \\(3.14 \\times 5 \\times 5 = 78.5\\text{ cm}^2\\). The total is \\(282.6 + 78.5 = 361.1\\text{ cm}^2\\)."
      },
      {
        "text": "282.6 cm²",
        "correct": false,
        "feedback": "Found only the curved surface, \\(2 \\times 3.14 \\times 5 \\times 9 = 282.6\\), giving 282.6 cm². Add the base, 78.5 cm²."
      }
    ],
    "backward": "Circumference and area of a circle, Ch7.",
    "forward": "Later in this chapter you cost the covering of containers."
  },
  {
    "itemId": "d12",
    "order": 12,
    "cluster": "C2",
    "clusterName": "Surface area of cuboids and triangular prisms",
    "tier": "H",
    "question": "A solid metal cube of edge 15 cm is melted and recast into a cuboid with a base measuring 18 cm by 25 cm. What is the height of the cuboid?",
    "options": [
      {
        "text": "7.5 cm",
        "correct": true,
        "feedback": "Correct. The volume of metal is \\(15 \\times 15 \\times 15 = 3375\\text{ cm}^3\\). The base of the cuboid has area \\(18 \\times 25 = 450\\text{ cm}^2\\), so the height is \\(3375 \\div 450 = 7.5\\text{ cm}\\)."
      },
      {
        "text": "30 cm",
        "correct": false,
        "feedback": "Divided the base area by the edge, \\(450 \\div 15 = 30\\), giving 30 cm. Divide the volume, 3375, by the base area, 450."
      },
      {
        "text": "187.5 cm",
        "correct": false,
        "feedback": "Divided the volume by only one side of the base: \\(3375 \\div 18 = 187.5\\), giving 187.5 cm. Divide by the whole base area, \\(18 \\times 25 = 450\\)."
      },
      {
        "text": "15 cm",
        "correct": false,
        "feedback": "Gave the edge of the cube, 15, giving 15 cm. The cuboid has a different base, so its height changes. Divide the volume by the base area."
      }
    ],
    "backward": "Equations, Ch4.",
    "forward": "Later in this chapter you meet more problems that change one solid into another."
  },
  {
    "itemId": "d13",
    "order": 13,
    "cluster": "C1",
    "clusterName": "Volume of prisms and cylinders",
    "tier": "S",
    "question": "A cube has an edge of 7 cm. What is its volume?",
    "options": [
      {
        "text": "21 cm³",
        "correct": false,
        "feedback": "Multiplied the edge by 3, \\(3 \\times 7 = 21\\), giving 21 cm³. Cubing means multiplying the edge by itself three times."
      },
      {
        "text": "49 cm³",
        "correct": false,
        "feedback": "Found the area of one face, \\(7 \\times 7 = 49\\), giving 49 cm³. Multiply by the edge once more."
      },
      {
        "text": "294 cm³",
        "correct": false,
        "feedback": "Found the total surface area, \\(6 \\times (7 \\times 7) = 294\\), giving 294 cm³. That is an area. The volume is edge×edge×edge."
      },
      {
        "text": "343 cm³",
        "correct": true,
        "feedback": "Correct. Volume = \\(7 \\times 7 \\times 7 = 343\\text{ cm}^3\\)."
      }
    ],
    "backward": "Indices, Ch1.",
    "forward": "Later in this chapter you find the surface area of the same cube."
  },
  {
    "itemId": "d14",
    "order": 14,
    "cluster": "C4",
    "clusterName": "Surface area of pyramids",
    "tier": "C",
    "question": "The four sloping faces of a square-based pyramid cover 120 cm² altogether, and the base edge is 10 cm. How long is the slant height?",
    "options": [
      {
        "text": "12 cm",
        "correct": false,
        "feedback": "Did not divide by 4 first: \\(120 \\div 10 = 12\\), giving 12 cm. 120 cm² covers all four faces. One face is 30 cm²."
      },
      {
        "text": "6 cm",
        "correct": true,
        "feedback": "Correct. Each face has area \\(120 \\div 4 = 30\\text{ cm}^2\\). Since \\(\\tfrac{1}{2} \\times 10 \\times \\text{slant height} = 30\\), the slant height is \\(30 \\times 2 \\div 10 = 6\\text{ cm}\\)."
      },
      {
        "text": "24 cm",
        "correct": false,
        "feedback": "Divided the total by half the base without sharing it between the four faces: \\(120 \\div 5 = 24\\), giving 24 cm. One face has area 30 cm²."
      },
      {
        "text": "60 cm",
        "correct": false,
        "feedback": "Halved the total instead of sharing it between 4 faces: \\(120 \\div 2 = 60\\), giving 60 cm. One face has area 30 cm², so use \\(\\tfrac{1}{2} \\times 10 \\times \\text{slant height} = 30\\)."
      }
    ],
    "backward": "Equations, Ch4.",
    "forward": "Later in this chapter you work backwards from other areas."
  },
  {
    "itemId": "d15",
    "order": 15,
    "cluster": "C2",
    "clusterName": "Surface area of cuboids and triangular prisms",
    "tier": "H",
    "question": "The base of a cuboid is a square of side 4 cm, and the total area of all its faces is 288 cm². How tall is the cuboid?",
    "options": [
      {
        "text": "17 cm",
        "correct": false,
        "feedback": "Took away only one square end: \\((288 - 16) \\div (4 \\times 4) = 17\\), giving 17 cm. The cuboid has two square ends, so take away \\(2 \\times 16\\)."
      },
      {
        "text": "64 cm",
        "correct": false,
        "feedback": "Stopped at the area of one side, 64, giving 64 cm. That is an area. Divide by the width of the side, 4, to get the height."
      },
      {
        "text": "18 cm",
        "correct": false,
        "feedback": "Did not take away the two square ends: \\(288 \\div (4 \\times 4) = 18\\), giving 18 cm. The two ends use 32 cm² of the total, so only 256 cm² is left for the sides."
      },
      {
        "text": "16 cm",
        "correct": true,
        "feedback": "Correct. The two square ends are \\(2 \\times (4 \\times 4) = 32\\text{ cm}^2\\). The four sides share \\(288 - 32 = 256\\text{ cm}^2\\), so each side is 64 cm². Each side is 4 cm wide, so the height is \\(64 \\div 4 = 16\\text{ cm}\\)."
      }
    ],
    "backward": "Equations, Ch4.",
    "forward": "Later in this chapter you work backwards from other surface areas."
  },
  {
    "itemId": "d16",
    "order": 16,
    "cluster": "C5",
    "clusterName": "Symmetry in 3D",
    "tier": "T",
    "question": "A plane of symmetry slices the pyramid in the diagram in half. What is the area of the new flat triangular face?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 303 306\" width=\"303\" height=\"306\" role=\"img\" aria-label=\"Square-based pyramid, base edge 14 cm, vertical height 24 cm, with a dashed plane through the apex and the midpoints of two opposite base edges.\"><rect x=\"0\" y=\"0\" width=\"303\" height=\"306\" fill=\"#ffffff\"/><polygon points=\"58,256 171.04,256 137.67,46\" fill=\"#eef4fa\" stroke=\"none\"/><polygon points=\"171.04,256 217.34,223.58 137.67,46\" fill=\"#eef4fa\" stroke=\"none\"/><polygon points=\"137.67,46 114.52,256 160.82,223.58\" fill=\"#c0392b\" fill-opacity=\"0.16\" stroke=\"#c0392b\" stroke-width=\"1.8\" stroke-dasharray=\"6 4\" stroke-linejoin=\"round\"/><line x1=\"104.3\" y1=\"223.58\" x2=\"217.34\" y2=\"223.58\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"58\" y1=\"256\" x2=\"104.3\" y2=\"223.58\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"104.3\" y1=\"223.58\" x2=\"137.67\" y2=\"46\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"58\" y1=\"256\" x2=\"171.04\" y2=\"256\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"171.04\" y1=\"256\" x2=\"217.34\" y2=\"223.58\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"137.67\" y1=\"46\" x2=\"171.04\" y2=\"256\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"58\" y1=\"256\" x2=\"137.67\" y2=\"46\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"137.67\" y1=\"46\" x2=\"217.34\" y2=\"223.58\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"137.67\" y1=\"46\" x2=\"137.67\" y2=\"239.79\" stroke=\"#c0392b\" stroke-width=\"1.8\" stroke-dasharray=\"6 4\"/><line x1=\"141.67\" y1=\"46\" x2=\"247.34\" y2=\"46\" stroke=\"#888888\" stroke-width=\"1\"/><line x1=\"141.67\" y1=\"239.79\" x2=\"247.34\" y2=\"239.79\" stroke=\"#888888\" stroke-width=\"1\"/><line x1=\"243.34\" y1=\"46\" x2=\"243.34\" y2=\"239.79\" stroke=\"#333333\" stroke-width=\"1.5\"/><polyline points=\"239.34,54 243.34,46 247.34,54\" stroke=\"#333333\" stroke-width=\"1.5\" fill=\"none\"/><polyline points=\"239.34,231.79 243.34,239.79 247.34,231.79\" stroke=\"#333333\" stroke-width=\"1.5\" fill=\"none\"/><text x=\"114.52\" y=\"276\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">14 cm</text><text x=\"251.34\" y=\"147.9\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"start\">24 cm</text></svg></div>",
    "options": [
      {
        "text": "175 cm²",
        "correct": false,
        "feedback": "Used the slant height, 25, as the height of the new face: \\(\\tfrac{1}{2} \\times 14 \\times 25 = 175\\), giving 175 cm². The cut goes through the centre of the base, so its height is the vertical height, 24 cm."
      },
      {
        "text": "336 cm²",
        "correct": false,
        "feedback": "Forgot the ½: \\(14 \\times 24 = 336\\), giving 336 cm². The new face is a triangle, half of the rectangle."
      },
      {
        "text": "84 cm²",
        "correct": false,
        "feedback": "Used half the base edge as the base of the triangle: \\(\\tfrac{1}{2} \\times 7 \\times 24 = 84\\), giving 84 cm². The plane cuts right across the pyramid, so the base of the triangle is the whole edge, 14 cm."
      },
      {
        "text": "168 cm²",
        "correct": true,
        "feedback": "Correct. The plane passes through the apex and the centre of the base, so the new face is a triangle with base 14 cm and height equal to the vertical height, 24 cm. Its area is \\(\\tfrac{1}{2} \\times 14 \\times 24 = 168\\text{ cm}^2\\)."
      }
    ],
    "backward": "Reflection and line symmetry, Ch13, and area of a triangle, Ch7.",
    "forward": "Later in this chapter you use symmetry to simplify more problems."
  },
  {
    "itemId": "d17",
    "order": 17,
    "cluster": "C6",
    "clusterName": "Mixed 3D problems",
    "tier": "H",
    "question": "The diagram shows the net of a closed cylinder: a rectangle and two circles. Use \\(\\pi = 3.14\\). What is the total area of the net?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 351 342\" width=\"351\" height=\"342\" role=\"img\" aria-label=\"Net of a cylinder: a rectangle 12.56 cm by 9 cm with a circle attached to each long edge.\"><rect x=\"0\" y=\"0\" width=\"351\" height=\"342\" fill=\"#ffffff\"/><rect x=\"60\" y=\"83.97\" width=\"200.96\" height=\"144\" fill=\"#eef4fa\" stroke=\"#333333\" stroke-width=\"2\"/><circle cx=\"160.48\" cy=\"51.98\" r=\"31.98\" fill=\"#eef4fa\" stroke=\"#333333\" stroke-width=\"2\"/><circle cx=\"160.48\" cy=\"259.95\" r=\"31.98\" fill=\"#eef4fa\" stroke=\"#333333\" stroke-width=\"2\"/><text x=\"160.48\" y=\"319.94\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">12.56 cm</text><text x=\"270.96\" y=\"160.97\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"start\">9 cm</text></svg></div>",
    "options": [
      {
        "text": "138.16 cm²",
        "correct": true,
        "feedback": "Correct. The circumference is 12.56 cm, so \\(2 \\times \\pi \\times r = 12.56\\) and \\(r = 2\\text{ cm}\\). The rectangle is \\(12.56 \\times 9 = 113.04\\text{ cm}^2\\) and the two circles are \\(2 \\times 3.14 \\times 2 \\times 2 = 25.12\\text{ cm}^2\\). The total is \\(113.04 + 25.12 = 138.16\\text{ cm}^2\\)."
      },
      {
        "text": "125.6 cm²",
        "correct": false,
        "feedback": "Counted only one circle, \\(3.14 \\times 2 \\times 2 = 12.56\\), so the total was \\(113.04 + 12.56 = 125.6\\), giving 125.6 cm². A closed cylinder has two circular ends."
      },
      {
        "text": "25.12 cm²",
        "correct": false,
        "feedback": "Found only the two circles, \\(2 \\times 3.14 \\times 2 \\times 2 = 25.12\\), giving 25.12 cm². The net also has the rectangle, 113.04 cm²."
      },
      {
        "text": "113.04 cm²",
        "correct": false,
        "feedback": "Found only the rectangle, \\(12.56 \\times 9 = 113.04\\), giving 113.04 cm². The net has two circles as well, 25.12 cm² in total."
      }
    ],
    "backward": "Circumference and area of a circle, Ch7.",
    "forward": "Later in this chapter you meet more problems that work back from a measurement."
  },
  {
    "itemId": "d18",
    "order": 18,
    "cluster": "C1",
    "clusterName": "Volume of prisms and cylinders",
    "tier": "T",
    "question": "A cylinder has its radius and its height both doubled. How many times larger is its volume?",
    "options": [
      {
        "text": "16 times",
        "correct": false,
        "feedback": "Gave 16 times, squaring the factor for the height as well. Only the radius is squared: \\(2 \\times 2\\) for r and 2 for h, which is 8."
      },
      {
        "text": "2 times",
        "correct": false,
        "feedback": "Gave 2 times, as if the volume simply doubled with the lengths. The radius is squared in the volume, so doubling it makes 4 times, and the height makes 2 more times."
      },
      {
        "text": "8 times",
        "correct": true,
        "feedback": "Correct. The volume is \\(\\pi \\times r \\times r \\times h\\). Doubling r multiplies the volume by \\(2 \\times 2 = 4\\), and doubling h multiplies it by 2 more, so the volume is \\(4 \\times 2 = 8\\) times as large."
      },
      {
        "text": "4 times",
        "correct": false,
        "feedback": "Gave 4 times, counting only the radius. The height is doubled as well, which doubles the volume again: \\(4 \\times 2 = 8\\)."
      }
    ],
    "backward": "Indices, Ch1.",
    "forward": "Later in this chapter you compare more solids by their measurements."
  },
  {
    "itemId": "d19",
    "order": 19,
    "cluster": "C1",
    "clusterName": "Volume of prisms and cylinders",
    "tier": "C",
    "question": "The tin in the diagram is a cylinder. Use \\(\\pi = 3.14\\). Find its volume.<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 420 260\" width=\"420\" height=\"260\" role=\"img\" aria-label=\"Cylinder, radius 6 cm, height 5 cm.\"><rect x=\"0\" y=\"0\" width=\"420\" height=\"260\" fill=\"#ffffff\"/><ellipse cx=\"190\" cy=\"82\" rx=\"120\" ry=\"36\" fill=\"#eef4fa\" stroke=\"#333333\" stroke-width=\"2\"/><line x1=\"70\" y1=\"82\" x2=\"70\" y2=\"182\" stroke=\"#333333\" stroke-width=\"2\"/><line x1=\"310\" y1=\"82\" x2=\"310\" y2=\"182\" stroke=\"#333333\" stroke-width=\"2\"/><path d=\"M 70 182 A 120 36 0 0 0 310 182\" fill=\"none\" stroke=\"#333333\" stroke-width=\"2\"/><path d=\"M 70 182 A 120 36 0 0 1 310 182\" fill=\"none\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"190\" y1=\"82\" x2=\"310\" y2=\"82\" stroke=\"#333333\" stroke-width=\"1.8\"/><circle cx=\"190\" cy=\"82\" r=\"3\" fill=\"#333333\"/><text x=\"250\" y=\"40\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">6 cm</text><line x1=\"314\" y1=\"82\" x2=\"342\" y2=\"82\" stroke=\"#888888\" stroke-width=\"1\"/><line x1=\"314\" y1=\"182\" x2=\"342\" y2=\"182\" stroke=\"#888888\" stroke-width=\"1\"/><line x1=\"338\" y1=\"82\" x2=\"338\" y2=\"182\" stroke=\"#333333\" stroke-width=\"1.5\"/><polyline points=\"334,90 338,82 342,90\" stroke=\"#333333\" stroke-width=\"1.5\" fill=\"none\"/><polyline points=\"334,174 338,182 342,174\" stroke=\"#333333\" stroke-width=\"1.5\" fill=\"none\"/><text x=\"346\" y=\"137\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"start\">5 cm</text></svg></div>",
    "options": [
      {
        "text": "94.2 cm³",
        "correct": false,
        "feedback": "Used r instead of \\(r \\times r\\): \\(3.14 \\times 6 \\times 5 = 94.2\\), giving 94.2 cm³. The area of the circular end uses the radius squared, \\(6 \\times 6\\)."
      },
      {
        "text": "188.4 cm³",
        "correct": false,
        "feedback": "Found the curved surface area, \\(2 \\times 3.14 \\times 6 \\times 5 = 188.4\\), giving 188.4 cm³. That is an area. The volume uses the circular end, \\(\\pi \\times r \\times r\\), times the height."
      },
      {
        "text": "471 cm³",
        "correct": false,
        "feedback": "Swapped the radius and the height: \\(3.14 \\times 5 \\times 5 \\times 6 = 471\\), giving 471 cm³. The radius is 6 cm and the height is 5 cm: \\(\\pi \\times 6 \\times 6 \\times 5\\)."
      },
      {
        "text": "565.2 cm³",
        "correct": true,
        "feedback": "Correct. Volume = \\(\\pi \\times r \\times r \\times h = 3.14 \\times 6 \\times 6 \\times 5 = 565.2\\text{ cm}^3\\)."
      }
    ],
    "backward": "Area of a circle, Ch7.",
    "forward": "Later in this chapter you meet more problems with cylinders."
  },
  {
    "itemId": "d20",
    "order": 20,
    "cluster": "C4",
    "clusterName": "Surface area of pyramids",
    "tier": "T",
    "question": "A sloping face of the pyramid in the diagram is cut out and laid flat. What is the area of that triangle?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 364 306\" width=\"364\" height=\"306\" role=\"img\" aria-label=\"Square-based pyramid, base edge 10 cm, vertical height 12 cm.\"><rect x=\"0\" y=\"0\" width=\"364\" height=\"306\" fill=\"#ffffff\"/><polygon points=\"58,256 214.32,256 168.17,46\" fill=\"#eef4fa\" stroke=\"none\"/><polygon points=\"214.32,256 278.35,211.17 168.17,46\" fill=\"#eef4fa\" stroke=\"none\"/><line x1=\"122.03\" y1=\"211.17\" x2=\"278.35\" y2=\"211.17\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"58\" y1=\"256\" x2=\"122.03\" y2=\"211.17\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"122.03\" y1=\"211.17\" x2=\"168.17\" y2=\"46\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"58\" y1=\"256\" x2=\"214.32\" y2=\"256\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"214.32\" y1=\"256\" x2=\"278.35\" y2=\"211.17\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"168.17\" y1=\"46\" x2=\"214.32\" y2=\"256\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"58\" y1=\"256\" x2=\"168.17\" y2=\"46\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"168.17\" y1=\"46\" x2=\"278.35\" y2=\"211.17\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"168.17\" y1=\"46\" x2=\"168.17\" y2=\"233.58\" stroke=\"#c0392b\" stroke-width=\"1.8\" stroke-dasharray=\"6 4\"/><line x1=\"172.17\" y1=\"46\" x2=\"308.35\" y2=\"46\" stroke=\"#888888\" stroke-width=\"1\"/><line x1=\"172.17\" y1=\"233.58\" x2=\"308.35\" y2=\"233.58\" stroke=\"#888888\" stroke-width=\"1\"/><line x1=\"304.35\" y1=\"46\" x2=\"304.35\" y2=\"233.58\" stroke=\"#333333\" stroke-width=\"1.5\"/><polyline points=\"300.35,54 304.35,46 308.35,54\" stroke=\"#333333\" stroke-width=\"1.5\" fill=\"none\"/><polyline points=\"300.35,225.58 304.35,233.58 308.35,225.58\" stroke=\"#333333\" stroke-width=\"1.5\" fill=\"none\"/><text x=\"136.16\" y=\"276\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">10 cm</text><text x=\"312.35\" y=\"144.79\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"start\">12 cm</text></svg></div>",
    "options": [
      {
        "text": "120 cm²",
        "correct": false,
        "feedback": "Used the vertical height and forgot the ½: \\(10 \\times 12 = 120\\), giving 120 cm². The face is a triangle with height equal to the slant height, 13 cm."
      },
      {
        "text": "130 cm²",
        "correct": false,
        "feedback": "Forgot the ½: \\(10 \\times 13 = 130\\), giving 130 cm². The face is a triangle, so use \\(\\tfrac{1}{2} \\times 10 \\times 13\\)."
      },
      {
        "text": "65 cm²",
        "correct": true,
        "feedback": "Correct. The height of a face is the slant height, not the vertical height. Half the base is 5, and \\(5 \\times 5 + 12 \\times 12 = 169\\), so the slant height is 13 cm. The face is \\(\\tfrac{1}{2} \\times 10 \\times 13 = 65\\text{ cm}^2\\)."
      },
      {
        "text": "60 cm²",
        "correct": false,
        "feedback": "Used the vertical height, 12, as the height of the face: \\(\\tfrac{1}{2} \\times 10 \\times 12 = 60\\), giving 60 cm². The height of a face is the slant height, 13 cm."
      }
    ],
    "backward": "Pythagoras' theorem, Ch5.",
    "forward": "Later in this chapter you cost the covering of solids."
  }
];

const recheckItems = [
  {
    "itemId": "r1",
    "order": 1,
    "cluster": "C1",
    "clusterName": "Volume of prisms and cylinders",
    "question": "A cuboid has a base area of 56 cm² and a height of 9 cm. What is its volume?",
    "options": [
      {
        "text": "65 cm³",
        "correct": false,
        "feedback": "Added the base area and the height, \\(56 + 9 = 65\\), giving 65 cm³. Multiply them."
      },
      {
        "text": "252 cm³",
        "correct": false,
        "feedback": "Halved the product, \\(56 \\times 9 \\div 2 = 252\\), giving 252 cm³. Halve only for a triangle. This solid is a cuboid, so use the whole product."
      },
      {
        "text": "504 cm³",
        "correct": true,
        "feedback": "Correct. Volume = area of \\(\\text{base} \\times \\text{height} = 56 \\times 9 = 504\\text{ cm}^3\\)."
      },
      {
        "text": "4536 cm³",
        "correct": false,
        "feedback": "Used the height twice, \\(56 \\times 9 \\times 9 = 4536\\), giving 4536 cm³. Multiply the base area by the height once, 9."
      }
    ],
    "backward": "Multiplying whole numbers, Ch1.",
    "forward": "Later in this chapter you use the same idea for cylinders and other prisms."
  },
  {
    "itemId": "r2",
    "order": 2,
    "cluster": "C4",
    "clusterName": "Surface area of pyramids",
    "question": "A model has a square-based pyramid roof. Each of the four sloping faces is a triangle with a base of 8 cm and a height of 11 cm. What is the total area of the four sloping faces?",
    "options": [
      {
        "text": "240 cm²",
        "correct": false,
        "feedback": "Included the square base, \\(176 + 64 = 240\\), giving 240 cm². The question asks for the four triangular faces only."
      },
      {
        "text": "352 cm²",
        "correct": false,
        "feedback": "Forgot the ½ on each face, \\(4 \\times (8 \\times 11) = 352\\), giving 352 cm². Each face is a triangle, \\(\\tfrac{1}{2} \\times 8 \\times 11\\)."
      },
      {
        "text": "176 cm²",
        "correct": true,
        "feedback": "Correct. Each face is \\(\\tfrac{1}{2} \\times 8 \\times 11 = 44\\text{ cm}^2\\), so four faces are \\(4 \\times 44 = 176\\text{ cm}^2\\)."
      },
      {
        "text": "220 cm²",
        "correct": false,
        "feedback": "Counted five faces, \\(5 \\times 44 = 220\\), giving 220 cm². A square-based pyramid has four triangular faces."
      }
    ],
    "backward": "Area of a triangle, Ch7.",
    "forward": "Later in this chapter you add the base to find the total surface area."
  },
  {
    "itemId": "r3",
    "order": 3,
    "cluster": "C2",
    "clusterName": "Surface area of cuboids and triangular prisms",
    "question": "The diagram shows a triangular prism. What is its total surface area?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 272 306\" width=\"272\" height=\"306\" role=\"img\" aria-label=\"Triangular prism with end sides 8 cm, 15 cm and 17 cm and length 5 cm.\"><rect x=\"0\" y=\"0\" width=\"272\" height=\"306\" fill=\"#ffffff\"/><polygon points=\"58,64.32 160.23,256 58,256\" fill=\"#eef4fa\" stroke=\"none\"/><polygon points=\"160.23,256 58,64.32 84.17,46 186.4,237.68\" fill=\"#eef4fa\" stroke=\"none\"/><line x1=\"84.17\" y1=\"237.68\" x2=\"186.4\" y2=\"237.68\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"84.17\" y1=\"237.68\" x2=\"84.17\" y2=\"46\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"58\" y1=\"256\" x2=\"84.17\" y2=\"237.68\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"58\" y1=\"64.32\" x2=\"160.23\" y2=\"256\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"58\" y1=\"256\" x2=\"160.23\" y2=\"256\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"58\" y1=\"256\" x2=\"58\" y2=\"64.32\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"84.17\" y1=\"46\" x2=\"186.4\" y2=\"237.68\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"160.23\" y1=\"256\" x2=\"186.4\" y2=\"237.68\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"58\" y1=\"64.32\" x2=\"84.17\" y2=\"46\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><polyline points=\"69,256 69,245 58,245\" stroke=\"#333333\" stroke-width=\"1.3\" fill=\"none\"/><text x=\"109.11\" y=\"276\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">8 cm</text><text x=\"47\" y=\"165.16\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"end\">15 cm</text><text x=\"119.7\" y=\"157.63\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"start\">17 cm</text><text x=\"182.95\" y=\"259.07\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"start\">5 cm</text></svg></div>",
    "options": [
      {
        "text": "260 cm²",
        "correct": false,
        "feedback": "Counted only one triangular end, \\(60 + 200 = 260\\), giving 260 cm². The prism has two triangular ends."
      },
      {
        "text": "200 cm²",
        "correct": false,
        "feedback": "Found only the three rectangles, \\((8 + 15 + 17) \\times 5 = 200\\), giving 200 cm². Add the two triangular ends, 120 cm² in total."
      },
      {
        "text": "235 cm²",
        "correct": false,
        "feedback": "Left out the 17 cm rectangle: \\(120 + (8 + 15) \\times 5 = 235\\), giving 235 cm². The prism has three rectangles, including the 17 by 5 one."
      },
      {
        "text": "320 cm²",
        "correct": true,
        "feedback": "Correct. The two triangular ends are \\(2 \\times (\\tfrac{1}{2} \\times 8 \\times 15 = 60) = 120\\text{ cm}^2\\). The three rectangles together are \\((8 + 15 + 17) \\times 5 = 200\\text{ cm}^2\\). The total is \\(120 + 200 = 320\\text{ cm}^2\\)."
      }
    ],
    "backward": "Areas of triangles and rectangles, Ch7.",
    "forward": "Later in this chapter you find the volume of the same prism."
  },
  {
    "itemId": "r4",
    "order": 4,
    "cluster": "C5",
    "clusterName": "Symmetry in 3D",
    "question": "A cylinder with a radius of 4 cm and a height of 9 cm is cut along a plane of symmetry that contains its axis. What is the area of the new flat face made by the cut?",
    "options": [
      {
        "text": "72 cm²",
        "correct": true,
        "feedback": "Correct. The cut goes through the centre, so the new face is a rectangle as wide as the diameter, 8 cm, and as tall as the cylinder, 9 cm. Its area is \\(8 \\times 9 = 72\\text{ cm}^2\\)."
      },
      {
        "text": "17 cm²",
        "correct": false,
        "feedback": "Added the diameter and the height, \\(8 + 9 = 17\\), giving 17 cm². The area of a rectangle is found by multiplying."
      },
      {
        "text": "36 cm²",
        "correct": false,
        "feedback": "Used the radius, 4, as the width: \\(4 \\times 9 = 36\\), giving 36 cm². The cut passes through the centre, so the width is the diameter, 8 cm."
      },
      {
        "text": "32 cm²",
        "correct": false,
        "feedback": "Found diameter×radius, \\(8 \\times 4 = 32\\), giving 32 cm². The height of the cut face is the height of the cylinder, 9 cm."
      }
    ],
    "backward": "Reflection and line symmetry, Ch13.",
    "forward": "Later in this chapter you find the surface area after such a cut."
  },
  {
    "itemId": "r5",
    "order": 5,
    "cluster": "C3",
    "clusterName": "Surface area of cylinders",
    "question": "What area of paper is needed to cover the closed can in the diagram completely? Use \\(\\pi = 3.14\\).<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 420 211\" width=\"420\" height=\"211\" role=\"img\" aria-label=\"Closed cylinder, radius 7 cm, height 3 cm.\"><rect x=\"0\" y=\"0\" width=\"420\" height=\"211\" fill=\"#ffffff\"/><ellipse cx=\"190\" cy=\"82\" rx=\"120\" ry=\"36\" fill=\"#eef4fa\" stroke=\"#333333\" stroke-width=\"2\"/><line x1=\"70\" y1=\"82\" x2=\"70\" y2=\"133.43\" stroke=\"#333333\" stroke-width=\"2\"/><line x1=\"310\" y1=\"82\" x2=\"310\" y2=\"133.43\" stroke=\"#333333\" stroke-width=\"2\"/><path d=\"M 70 133.43 A 120 36 0 0 0 310 133.43\" fill=\"none\" stroke=\"#333333\" stroke-width=\"2\"/><path d=\"M 70 133.43 A 120 36 0 0 1 310 133.43\" fill=\"none\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"190\" y1=\"82\" x2=\"310\" y2=\"82\" stroke=\"#333333\" stroke-width=\"1.8\"/><circle cx=\"190\" cy=\"82\" r=\"3\" fill=\"#333333\"/><text x=\"250\" y=\"40\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">7 cm</text><line x1=\"314\" y1=\"82\" x2=\"342\" y2=\"82\" stroke=\"#888888\" stroke-width=\"1\"/><line x1=\"314\" y1=\"133.43\" x2=\"342\" y2=\"133.43\" stroke=\"#888888\" stroke-width=\"1\"/><line x1=\"338\" y1=\"82\" x2=\"338\" y2=\"133.43\" stroke=\"#333333\" stroke-width=\"1.5\"/><polyline points=\"334,90 338,82 342,90\" stroke=\"#333333\" stroke-width=\"1.5\" fill=\"none\"/><polyline points=\"334,125.43 338,133.43 342,125.43\" stroke=\"#333333\" stroke-width=\"1.5\" fill=\"none\"/><text x=\"346\" y=\"112.71\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"start\">3 cm</text></svg></div>",
    "options": [
      {
        "text": "307.72 cm²",
        "correct": false,
        "feedback": "Found only the two circular ends, \\(2 \\times 3.14 \\times 7 \\times 7 = 307.72\\), giving 307.72 cm². The curved surface, 131.88 cm², must be added."
      },
      {
        "text": "439.6 cm²",
        "correct": true,
        "feedback": "Correct. The curved surface is \\(2 \\times 3.14 \\times 7 \\times 3 = 131.88\\text{ cm}^2\\) and the two ends are \\(2 \\times 3.14 \\times 7 \\times 7 = 307.72\\text{ cm}^2\\). The total is \\(131.88 + 307.72 = 439.6\\text{ cm}^2\\)."
      },
      {
        "text": "1494.64 cm²",
        "correct": false,
        "feedback": "Used the diameter, 14, as the radius: \\(2 \\times 3.14 \\times 14 \\times 17 = 1494.64\\), giving 1494.64 cm². The radius is 7 cm."
      },
      {
        "text": "131.88 cm²",
        "correct": false,
        "feedback": "Found only the curved surface, \\(2 \\times 3.14 \\times 7 \\times 3 = 131.88\\), giving 131.88 cm². The closed cylinder also has two circular ends, 307.72 cm² in total."
      }
    ],
    "backward": "Circumference and area of a circle, Ch7.",
    "forward": "Later in this chapter you meet the open cylinder."
  },
  {
    "itemId": "r6",
    "order": 6,
    "cluster": "C1",
    "clusterName": "Volume of prisms and cylinders",
    "question": "A cuboid has all of its edges tripled. How many times larger is its volume?",
    "options": [
      {
        "text": "81 times",
        "correct": false,
        "feedback": "Gave 81 times, multiplying by 3 four times. A cuboid has three edge lengths, so the volume is multiplied by \\(3 \\times 3 \\times 3 = 27\\)."
      },
      {
        "text": "3 times",
        "correct": false,
        "feedback": "Gave 3 times, as if the volume simply tripled with the lengths. Three edges are tripled, so the volume is multiplied by 3 three times."
      },
      {
        "text": "9 times",
        "correct": false,
        "feedback": "Gave 9 times, counting only two of the three edges. The height is tripled as well: \\(3 \\times 3 \\times 3 = 27\\)."
      },
      {
        "text": "27 times",
        "correct": true,
        "feedback": "Correct. The volume is \\(\\text{length} \\times \\text{width} \\times \\text{height}\\). Tripling each of the three edges multiplies the volume by \\(3 \\times 3 \\times 3 = 27\\)."
      }
    ],
    "backward": "Indices, Ch1.",
    "forward": "Later in this chapter you compare more solids by their measurements."
  },
  {
    "itemId": "r7",
    "order": 7,
    "cluster": "C1",
    "clusterName": "Volume of prisms and cylinders",
    "question": "A cube has an edge of 12 cm. What is its volume?",
    "options": [
      {
        "text": "1728 cm³",
        "correct": true,
        "feedback": "Correct. Volume = \\(12 \\times 12 \\times 12 = 1728\\text{ cm}^3\\)."
      },
      {
        "text": "36 cm³",
        "correct": false,
        "feedback": "Multiplied the edge by 3, \\(3 \\times 12 = 36\\), giving 36 cm³. Cubing means multiplying the edge by itself three times."
      },
      {
        "text": "144 cm³",
        "correct": false,
        "feedback": "Found the area of one face, \\(12 \\times 12 = 144\\), giving 144 cm³. Multiply by the edge once more."
      },
      {
        "text": "864 cm³",
        "correct": false,
        "feedback": "Found the total surface area, \\(6 \\times (12 \\times 12) = 864\\), giving 864 cm³. That is an area. The volume is edge×edge×edge."
      }
    ],
    "backward": "Indices, Ch1.",
    "forward": "Later in this chapter you find the surface area of the same cube."
  },
  {
    "itemId": "r8",
    "order": 8,
    "cluster": "C4",
    "clusterName": "Surface area of pyramids",
    "question": "A pyramid has a square base of edge 10 cm. Its four triangular faces have a combined area of 90 cm². Find the slant height.",
    "options": [
      {
        "text": "4.5 cm",
        "correct": true,
        "feedback": "Correct. Each face has area \\(90 \\div 4 = 22.5\\text{ cm}^2\\). Since \\(\\tfrac{1}{2} \\times 10 \\times \\text{slant height} = 22.5\\), the slant height is \\(22.5 \\times 2 \\div 10 = 4.5\\text{ cm}\\)."
      },
      {
        "text": "9 cm",
        "correct": false,
        "feedback": "Did not divide by 4 first: \\(90 \\div 10 = 9\\), giving 9 cm. 90 cm² covers all four faces. One face is 22.5 cm²."
      },
      {
        "text": "22.5 cm",
        "correct": false,
        "feedback": "Stopped at the area of one face, \\(90 \\div 4 = 22.5\\), giving 22.5 cm. That is an area. Use \\(\\tfrac{1}{2} \\times \\text{base} \\times \\text{slant height}\\) to find the length."
      },
      {
        "text": "45 cm",
        "correct": false,
        "feedback": "Halved the total instead of sharing it between 4 faces: \\(90 \\div 2 = 45\\), giving 45 cm. One face has area 22.5 cm², so use \\(\\tfrac{1}{2} \\times 10 \\times \\text{slant height} = 22.5\\)."
      }
    ],
    "backward": "Equations, Ch4.",
    "forward": "Later in this chapter you work backwards from other areas."
  },
  {
    "itemId": "r9",
    "order": 9,
    "cluster": "C2",
    "clusterName": "Surface area of cuboids and triangular prisms",
    "question": "A cube has sides of 13 cm. What is the total area of all its faces?",
    "options": [
      {
        "text": "2197 cm²",
        "correct": false,
        "feedback": "Found the volume, \\(13 \\times 13 \\times 13 = 2197\\), giving 2197 cm². Surface area is the total area of the 6 faces, not the volume."
      },
      {
        "text": "78 cm²",
        "correct": false,
        "feedback": "Multiplied the edge by 6, \\(6 \\times 13 = 78\\), giving 78 cm². Each face is a square of area edge×edge."
      },
      {
        "text": "1014 cm²",
        "correct": true,
        "feedback": "Correct. A cube has 6 equal faces, each \\(13 \\times 13 = 169\\text{ cm}^2\\). The total is \\(6 \\times 169 = 1014\\text{ cm}^2\\)."
      },
      {
        "text": "169 cm²",
        "correct": false,
        "feedback": "Found the area of one face, \\(13 \\times 13 = 169\\), giving 169 cm². A cube has 6 faces."
      }
    ],
    "backward": "Area of a square, Ch7.",
    "forward": "Later in this chapter you meet more problems that compare solids."
  },
  {
    "itemId": "r10",
    "order": 10,
    "cluster": "C3",
    "clusterName": "Surface area of cylinders",
    "question": "A cylindrical pot with no lid has a radius of 4 cm and a height of 10 cm. Use \\(\\pi = 3.14\\). What area of plastic is needed to make it?",
    "options": [
      {
        "text": "251.2 cm²",
        "correct": false,
        "feedback": "Found only the curved surface, \\(2 \\times 3.14 \\times 4 \\times 10 = 251.2\\), giving 251.2 cm². Add the base, 50.24 cm²."
      },
      {
        "text": "301.44 cm²",
        "correct": true,
        "feedback": "Correct. The curved surface is \\(2 \\times 3.14 \\times 4 \\times 10 = 251.2\\text{ cm}^2\\). There is one circular base, \\(3.14 \\times 4 \\times 4 = 50.24\\text{ cm}^2\\). The total is \\(251.2 + 50.24 = 301.44\\text{ cm}^2\\)."
      },
      {
        "text": "351.68 cm²",
        "correct": false,
        "feedback": "Counted both circular ends: \\(2 \\times \\pi \\times r \\times (r + h) = 2 \\times 3.14 \\times 4 \\times 14 = 351.68\\), giving 351.68 cm². The cylinder has no lid, so only one circular end is included."
      },
      {
        "text": "452.16 cm²",
        "correct": false,
        "feedback": "Used the diameter, 8, as the radius of the base, so the base came to \\(3.14 \\times 8 \\times 8 = 200.96\\) and the total to \\(251.2 + 200.96 = 452.16\\), giving 452.16 cm². The radius is 4 cm, so the base is 50.24 cm²."
      }
    ],
    "backward": "Circumference and area of a circle, Ch7.",
    "forward": "Later in this chapter you cost the covering of containers."
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
  title: "Volume, Surface Area and Symmetry — Speed & Strategy",
  subtitle: "Grade 8 · Level 4 · Speed & Strategy · Olympiad Simulation",
  description: "A 25-minute timed diagnostic mixing Speed, Core, Hard and Trap items across every volume, surface area and symmetry cluster.",
  clusterNames: CLUSTER_NAMES,
  gateReviewHTML: "<p><strong>Warm-up done.</strong> The diagnostic is timed: 25 minutes for 20 questions, which is about 75 seconds each. Each question carries a tag. S means speed: answer it on sight. C means core: work it steadily. H means hard: if it is taking more than two minutes, mark it and move on. T means trap: a tempting wrong answer is waiting, so slow down and ask what the question really wants (surface area or volume, which height, a closed or an open solid, which factor). Skip anything that stalls you and come back at the end. Your timing and your choices tell us as much as your score, so use the full strategy.</p><p>The clock starts when you begin question 1.</p>",
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

// Volume, Surface Area and Symmetry — Grade 8, Level 1 (Core Fluency).
// Warm-up, diagnostic and spaced recheck items.
// Run with: node seed/mathSeedCh14VolumeSurfaceAreaSymmetryL1.js
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-8";
const GRADE_LABEL = "Grade 8";
const CHAPTER_SLUG = "ch-14-volume-surface-area-symmetry";
const CHAPTER_NAME = "Volume, Surface Area and Symmetry";
const LEVEL = 1;

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
    "question": "A cuboid measures 5 cm by 4 cm by 3 cm. What is its volume?",
    "options": [
      {
        "text": "12 cm³",
        "correct": false,
        "feedback": "Added the three edges, \\(5 + 4 + 3 = 12\\), giving 12 cm³. Volume comes from multiplying the three edges: \\(5 \\times 4 \\times 3\\)."
      },
      {
        "text": "94 cm³",
        "correct": false,
        "feedback": "Gave 94 cm³, which is the surface area, \\(40 + 30 + 24 = 94\\), with the wrong units. Volume is the space inside, so multiply the three edges: \\(5 \\times 4 \\times 3\\)."
      },
      {
        "text": "60 cm³",
        "correct": true,
        "feedback": "Correct. Volume of a cuboid = \\(\\text{length} \\times \\text{width} \\times \\text{height} = 5 \\times 4 \\times 3 = 60\\text{ cm}^3\\)."
      },
      {
        "text": "20 cm³",
        "correct": false,
        "feedback": "Multiplied only two edges, \\(5 \\times 4 = 20\\), giving 20 cm³. That is the area of the base. Volume also multiplies by the height, 3."
      }
    ],
    "retryHint": "Volume of a cuboid multiplies its three edge lengths. Check that you have used all three.",
    "backward": "Areas of rectangles and units of area, Ch7.",
    "forward": "Later in this chapter you use the same idea for prisms with triangular and circular cross-sections."
  },
  {
    "itemId": "w2",
    "order": 2,
    "cluster": "C4",
    "clusterName": "Surface area of pyramids",
    "question": "The diagram shows a square-based pyramid. What is the area of one triangular face?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 394 240\" width=\"394\" height=\"240\" role=\"img\" aria-label=\"Square-based pyramid, base edge 6 cm, slant height 5 cm.\"><rect x=\"0\" y=\"0\" width=\"394\" height=\"240\" fill=\"#ffffff\"/><polygon points=\"58,189.67 235.36,189.67 183,46\" fill=\"#eef4fa\" stroke=\"none\"/><polygon points=\"235.36,189.67 308,138.81 183,46\" fill=\"#eef4fa\" stroke=\"none\"/><line x1=\"130.64\" y1=\"138.81\" x2=\"308\" y2=\"138.81\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"58\" y1=\"189.67\" x2=\"130.64\" y2=\"138.81\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"130.64\" y1=\"138.81\" x2=\"183\" y2=\"46\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"58\" y1=\"189.67\" x2=\"235.36\" y2=\"189.67\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"235.36\" y1=\"189.67\" x2=\"308\" y2=\"138.81\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"183\" y1=\"46\" x2=\"235.36\" y2=\"189.67\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"58\" y1=\"189.67\" x2=\"183\" y2=\"46\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"183\" y1=\"46\" x2=\"308\" y2=\"138.81\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"183\" y1=\"46\" x2=\"146.68\" y2=\"189.67\" stroke=\"#c0392b\" stroke-width=\"1.8\" stroke-dasharray=\"6 4\"/><text x=\"146.68\" y=\"209.67\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">6 cm</text><rect x=\"147.04\" y=\"109.84\" width=\"35.6\" height=\"18\" fill=\"#ffffff\"/><text x=\"164.84\" y=\"122.84\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">5 cm</text></svg></div>",
    "options": [
      {
        "text": "36 cm²",
        "correct": false,
        "feedback": "Found the area of the square base, \\(6 \\times 6 = 36\\), giving 36 cm². The question asks for one triangular face."
      },
      {
        "text": "60 cm²",
        "correct": false,
        "feedback": "Found the area of all four triangular faces, \\(4 \\times 15 = 60\\), giving 60 cm². The question asks for one face, \\(\\tfrac{1}{2} \\times 6 \\times 5 = 15\\)."
      },
      {
        "text": "15 cm²",
        "correct": true,
        "feedback": "Correct. Each face is a triangle with base 6 cm and height equal to the slant height, 5 cm, so its area is \\(\\tfrac{1}{2} \\times 6 \\times 5 = 15\\text{ cm}^2\\)."
      },
      {
        "text": "30 cm²",
        "correct": false,
        "feedback": "Forgot the ½ and found \\(6 \\times 5 = 30\\), giving 30 cm². A triangle is half of the 6 by 5 rectangle."
      }
    ],
    "retryHint": "Each face is a triangle. Use area = \\(\\tfrac{1}{2} \\times \\text{base} \\times \\text{height}\\), where the height is the slant height shown in the diagram.",
    "backward": "Areas of triangles and compound shapes, Ch7.",
    "forward": "Later in this chapter you add the four faces and the base to find the surface area of a pyramid."
  },
  {
    "itemId": "w3",
    "order": 3,
    "cluster": "C2",
    "clusterName": "Surface area of cuboids and triangular prisms",
    "question": "A cube has edges of length 4 cm. What is its total surface area?",
    "options": [
      {
        "text": "24 cm²",
        "correct": false,
        "feedback": "Multiplied the edge by the number of faces, \\(6 \\times 4 = 24\\), giving 24 cm². Each face has area \\(4 \\times 4 = 16\\), so multiply that by 6."
      },
      {
        "text": "64 cm²",
        "correct": false,
        "feedback": "Found the volume, \\(4 \\times 4 \\times 4 = 64\\), and gave it as 64 cm². Surface area adds up the areas of the 6 faces."
      },
      {
        "text": "16 cm²",
        "correct": false,
        "feedback": "Found the area of just one face, \\(4 \\times 4 = 16\\), giving 16 cm². A cube has 6 faces, so there are 6 of these."
      },
      {
        "text": "96 cm²",
        "correct": true,
        "feedback": "Correct. A cube has 6 identical square faces. Each face has area \\(4 \\times 4 = 16\\text{ cm}^2\\), so the total is \\(6 \\times 16 = 96\\text{ cm}^2\\)."
      }
    ],
    "retryHint": "Find the area of one face first, then count how many faces a cube has.",
    "backward": "Area of a square and units of area, Ch7.",
    "forward": "Later in this chapter you find the surface area of triangular prisms and cylinders."
  },
  {
    "itemId": "w4",
    "order": 4,
    "cluster": "C5",
    "clusterName": "Symmetry in 3D",
    "question": "A cuboid has three different edge lengths: 6 cm, 4 cm and 3 cm. How many planes of symmetry does it have?",
    "options": [
      {
        "text": "6 planes",
        "correct": false,
        "feedback": "Counted the 6 faces, giving 6 planes. A plane of symmetry is a mirror cut through the middle of the solid, and each pair of opposite faces gives just one."
      },
      {
        "text": "3 planes",
        "correct": true,
        "feedback": "Correct. A plane of symmetry cuts the solid into two mirror-image halves. With three different edge lengths, the only such cuts go through the middle parallel to a pair of opposite faces, and there are 3 pairs."
      },
      {
        "text": "12 planes",
        "correct": false,
        "feedback": "Counted the 12 edges, giving 12 planes. A plane of symmetry cuts through the middle of the solid, one parallel to each pair of opposite faces, so there are only 3."
      },
      {
        "text": "8 planes",
        "correct": false,
        "feedback": "Counted the 8 corners, giving 8 planes. A plane of symmetry cuts through the middle of the solid, one parallel to each pair of opposite faces, so there are only 3."
      }
    ],
    "retryHint": "A plane of symmetry splits the solid into two halves that are mirror images. Imagine slicing through the middle, parallel to each pair of opposite faces.",
    "backward": "Reflection and line symmetry, Ch13.",
    "forward": "Later in this chapter you count the planes of symmetry of prisms and pyramids."
  },
  {
    "itemId": "w5",
    "order": 5,
    "cluster": "C3",
    "clusterName": "Surface area of cylinders",
    "question": "The diagram shows a cylinder. Use \\(\\pi = 3.14\\). What is the area of its curved surface?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 270 265\" width=\"270\" height=\"265\" role=\"img\" aria-label=\"Cylinder with radius 3 cm and height 10 cm.\"><rect x=\"0\" y=\"0\" width=\"270\" height=\"265\" fill=\"#ffffff\"/><ellipse cx=\"115\" cy=\"59.5\" rx=\"45\" ry=\"13.5\" fill=\"#eef4fa\" stroke=\"#333333\" stroke-width=\"2\"/><line x1=\"70\" y1=\"59.5\" x2=\"70\" y2=\"209.5\" stroke=\"#333333\" stroke-width=\"2\"/><line x1=\"160\" y1=\"59.5\" x2=\"160\" y2=\"209.5\" stroke=\"#333333\" stroke-width=\"2\"/><path d=\"M 70 209.5 A 45 13.5 0 0 0 160 209.5\" fill=\"none\" stroke=\"#333333\" stroke-width=\"2\"/><path d=\"M 70 209.5 A 45 13.5 0 0 1 160 209.5\" fill=\"none\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"115\" y1=\"59.5\" x2=\"160\" y2=\"59.5\" stroke=\"#333333\" stroke-width=\"1.8\"/><circle cx=\"115\" cy=\"59.5\" r=\"3\" fill=\"#333333\"/><text x=\"137.5\" y=\"40\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">3 cm</text><line x1=\"164\" y1=\"59.5\" x2=\"192\" y2=\"59.5\" stroke=\"#888888\" stroke-width=\"1\"/><line x1=\"164\" y1=\"209.5\" x2=\"192\" y2=\"209.5\" stroke=\"#888888\" stroke-width=\"1\"/><line x1=\"188\" y1=\"59.5\" x2=\"188\" y2=\"209.5\" stroke=\"#333333\" stroke-width=\"1.5\"/><polyline points=\"184,67.5 188,59.5 192,67.5\" stroke=\"#333333\" stroke-width=\"1.5\" fill=\"none\"/><polyline points=\"184,201.5 188,209.5 192,201.5\" stroke=\"#333333\" stroke-width=\"1.5\" fill=\"none\"/><text x=\"196\" y=\"139.5\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"start\">10 cm</text></svg></div>",
    "options": [
      {
        "text": "282.6 cm²",
        "correct": false,
        "feedback": "Used \\(\\pi \\times r \\times r \\times h = 3.14 \\times 9 \\times 10 = 282.6\\), giving 282.6 cm². That is the volume formula. The curved surface is the circumference times the height."
      },
      {
        "text": "188.4 cm²",
        "correct": true,
        "feedback": "Correct. Unrolled, the curved surface is a rectangle. Its width is the circumference of the circle, \\(2 \\times 3.14 \\times 3 = 18.84\\), and its height is 10, so the area is \\(18.84 \\times 10 = 188.4\\text{ cm}^2\\)."
      },
      {
        "text": "56.52 cm²",
        "correct": false,
        "feedback": "Found the area of the two circular ends, \\(2 \\times 3.14 \\times 9 = 56.52\\), giving 56.52 cm². The curved surface is the rectangle between the ends."
      },
      {
        "text": "94.2 cm²",
        "correct": false,
        "feedback": "Used \\(\\pi \\times r \\times h = 3.14 \\times 3 \\times 10 = 94.2\\), giving 94.2 cm², and left out the factor 2. The circumference is \\(2 \\times \\pi \\times r\\), so the rectangle is \\(2 \\times 3.14 \\times 3\\) by 10."
      }
    ],
    "retryHint": "Imagine peeling the label off a can: it is a rectangle. Its width is the circumference of the circle and its height is the height of the cylinder.",
    "backward": "Circumference of a circle, Ch7.",
    "forward": "Later in this chapter you add the two circular ends to find the total surface area."
  },
  {
    "itemId": "w6",
    "order": 6,
    "cluster": "C1",
    "clusterName": "Volume of prisms and cylinders",
    "question": "The diagram shows a prism whose cross-section is a right-angled triangle. What is its volume?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 394 266\" width=\"394\" height=\"266\" role=\"img\" aria-label=\"Triangular prism with legs 6 cm and 4 cm and length 10 cm.\"><rect x=\"0\" y=\"0\" width=\"394\" height=\"266\" fill=\"#ffffff\"/><polygon points=\"58,117.02 206.58,216.07 58,216.07\" fill=\"#eef4fa\" stroke=\"none\"/><polygon points=\"206.58,216.07 58,117.02 159.42,46 308,145.05\" fill=\"#eef4fa\" stroke=\"none\"/><line x1=\"159.42\" y1=\"145.05\" x2=\"308\" y2=\"145.05\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"159.42\" y1=\"145.05\" x2=\"159.42\" y2=\"46\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"58\" y1=\"216.07\" x2=\"159.42\" y2=\"145.05\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"58\" y1=\"117.02\" x2=\"206.58\" y2=\"216.07\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"58\" y1=\"216.07\" x2=\"206.58\" y2=\"216.07\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"58\" y1=\"216.07\" x2=\"58\" y2=\"117.02\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"159.42\" y1=\"46\" x2=\"308\" y2=\"145.05\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"206.58\" y1=\"216.07\" x2=\"308\" y2=\"145.05\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"58\" y1=\"117.02\" x2=\"159.42\" y2=\"46\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><polyline points=\"69,216.07 69,205.07 58,205.07\" stroke=\"#333333\" stroke-width=\"1.3\" fill=\"none\"/><text x=\"132.29\" y=\"236.07\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">6 cm</text><text x=\"47\" y=\"171.54\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"end\">4 cm</text><text x=\"266.93\" y=\"192.79\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"start\">10 cm</text></svg></div>",
    "options": [
      {
        "text": "20 cm³",
        "correct": false,
        "feedback": "Added the three measurements, \\(6 + 4 + 10 = 20\\), giving 20 cm³. Volume multiplies the cross-section area by the length."
      },
      {
        "text": "240 cm³",
        "correct": false,
        "feedback": "Forgot the ½ for the triangle and used \\(6 \\times 4 \\times 10 = 240\\), giving 240 cm³. The cross-section is a triangle, which is half of the 6 by 4 rectangle."
      },
      {
        "text": "12 cm³",
        "correct": false,
        "feedback": "Chose 12 cm³, which is only the area of the triangle, \\(\\tfrac{1}{2} \\times 6 \\times 4 = 12\\). Multiply by the length of the prism, 10, to get a volume."
      },
      {
        "text": "120 cm³",
        "correct": true,
        "feedback": "Correct. Volume of a prism = area of cross-section × length. The triangle has area \\(\\tfrac{1}{2} \\times 6 \\times 4 = 12\\text{ cm}^2\\), so the volume is \\(12 \\times 10 = 120\\text{ cm}^3\\)."
      }
    ],
    "retryHint": "For any prism, volume = area of cross-section × length. First find the area of the triangular cross-section.",
    "backward": "Areas of triangles, Ch7.",
    "forward": "Later in this chapter you find the surface area of triangular prisms."
  },
  {
    "itemId": "w7",
    "order": 7,
    "cluster": "C4",
    "clusterName": "Surface area of pyramids",
    "question": "A square-based pyramid has a base edge of 4 cm. Each triangular face has a slant height of 6 cm. What is the total surface area of the pyramid, including its base?",
    "options": [
      {
        "text": "64 cm²",
        "correct": true,
        "feedback": "Correct. The base is a square: \\(4 \\times 4 = 16\\). Each triangular face has area \\(\\tfrac{1}{2} \\times 4 \\times 6 = 12\\), and there are 4 of them: \\(4 \\times 12 = 48\\). The total is \\(16 + 48 = 64\\text{ cm}^2\\)."
      },
      {
        "text": "48 cm²",
        "correct": false,
        "feedback": "Found only the four triangular faces, \\(4 \\times 12 = 48\\), giving 48 cm². The total surface area also includes the square base, \\(4 \\times 4 = 16\\)."
      },
      {
        "text": "112 cm²",
        "correct": false,
        "feedback": "Forgot the ½ on each triangle: \\(4 \\times (4 \\times 6) = 96\\) and \\(96 + 16 = 112\\), giving 112 cm². Each triangle has area \\(\\tfrac{1}{2} \\times 4 \\times 6 = 12\\)."
      },
      {
        "text": "28 cm²",
        "correct": false,
        "feedback": "Added the base and just one triangle, \\(16 + 12 = 28\\), giving 28 cm². The pyramid has 4 triangular faces."
      }
    ],
    "retryHint": "List the faces: one square and four identical triangles. Find each area and add them.",
    "backward": "Areas of compound shapes, Ch7.",
    "forward": "Later in this chapter the slant height is not given, so you find it using Pythagoras' theorem."
  },
  {
    "itemId": "w8",
    "order": 8,
    "cluster": "C5",
    "clusterName": "Symmetry in 3D",
    "question": "A square-based pyramid has its apex directly above the centre of the base. What is the order of rotational symmetry about the vertical axis through the apex?",
    "options": [
      {
        "text": "order 4",
        "correct": true,
        "feedback": "Correct. Turning the pyramid about the vertical axis through the apex, it looks the same after every quarter turn (90°), so it fits onto itself 4 times in one full turn. The order is 4."
      },
      {
        "text": "order 5",
        "correct": false,
        "feedback": "Counted the 5 faces of the pyramid, giving order 5. The order is the number of times the shape fits onto itself in one full turn, which is 4 for a square base."
      },
      {
        "text": "order 8",
        "correct": false,
        "feedback": "Counted the 8 edges, giving order 8. The order is the number of times the shape fits onto itself in one full turn, which is 4."
      },
      {
        "text": "order 2",
        "correct": false,
        "feedback": "Counted only the half turn, giving order 2. A quarter turn (90°) also fits a square base onto itself, so the pyramid fits 4 times in a full turn."
      }
    ],
    "retryHint": "The order is the number of times the solid looks the same during one full turn. Look down from above and turn it a quarter at a time.",
    "backward": "Rotation through quarter turns, Ch13.",
    "forward": "Later in this chapter you find the order of rotational symmetry for prisms."
  }
];

const diagnosticItems = [
  {
    "itemId": "d1",
    "order": 1,
    "cluster": "C1",
    "clusterName": "Volume of prisms and cylinders",
    "question": "What is the volume of the cuboid shown?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 394 246\" width=\"394\" height=\"246\" role=\"img\" aria-label=\"Cuboid 7 cm by 5 cm by 4 cm.\"><rect x=\"0\" y=\"0\" width=\"394\" height=\"246\" fill=\"#ffffff\"/><polygon points=\"58,85.62 251.42,85.62 251.42,196.14 58,196.14\" fill=\"#eef4fa\" stroke=\"none\"/><polygon points=\"251.42,196.14 251.42,85.62 308,46 308,156.52\" fill=\"#eef4fa\" stroke=\"none\"/><polygon points=\"251.42,85.62 58,85.62 114.58,46 308,46\" fill=\"#eef4fa\" stroke=\"none\"/><line x1=\"114.58\" y1=\"156.52\" x2=\"308\" y2=\"156.52\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"114.58\" y1=\"156.52\" x2=\"114.58\" y2=\"46\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"58\" y1=\"196.14\" x2=\"114.58\" y2=\"156.52\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"58\" y1=\"85.62\" x2=\"251.42\" y2=\"85.62\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"251.42\" y1=\"196.14\" x2=\"251.42\" y2=\"85.62\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"58\" y1=\"196.14\" x2=\"251.42\" y2=\"196.14\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"58\" y1=\"196.14\" x2=\"58\" y2=\"85.62\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"308\" y1=\"156.52\" x2=\"308\" y2=\"46\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"114.58\" y1=\"46\" x2=\"308\" y2=\"46\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"251.42\" y1=\"196.14\" x2=\"308\" y2=\"156.52\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"251.42\" y1=\"85.62\" x2=\"308\" y2=\"46\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"58\" y1=\"85.62\" x2=\"114.58\" y2=\"46\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><text x=\"154.71\" y=\"216.14\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">7 cm</text><text x=\"289.35\" y=\"188.56\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"start\">5 cm</text><text x=\"47\" y=\"145.88\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"end\">4 cm</text></svg></div>",
    "options": [
      {
        "text": "166 cm³",
        "correct": false,
        "feedback": "Gave 166 cm³, which is the surface area, \\(70 + 56 + 40 = 166\\), with the wrong units. Volume multiplies the three edges: \\(7 \\times 5 \\times 4\\)."
      },
      {
        "text": "35 cm³",
        "correct": false,
        "feedback": "Found the area of the base, \\(7 \\times 5 = 35\\), giving 35 cm³. Multiply by the height, 4, to get a volume."
      },
      {
        "text": "16 cm³",
        "correct": false,
        "feedback": "Added the three edges, \\(7 + 5 + 4 = 16\\), giving 16 cm³. Volume comes from multiplying them."
      },
      {
        "text": "140 cm³",
        "correct": true,
        "feedback": "Correct. Volume = \\(\\text{length} \\times \\text{width} \\times \\text{height} = 7 \\times 5 \\times 4 = 140\\text{ cm}^3\\)."
      }
    ],
    "backward": "Areas of rectangles and units of area, Ch7.",
    "forward": "Later in this chapter you meet prisms with trapezium and circular cross-sections."
  },
  {
    "itemId": "d2",
    "order": 2,
    "cluster": "C4",
    "clusterName": "Surface area of pyramids",
    "question": "What is the area of one triangular face of the pyramid shown?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 374 306\" width=\"374\" height=\"306\" role=\"img\" aria-label=\"Square-based pyramid, base edge 8 cm, slant height 10 cm.\"><rect x=\"0\" y=\"0\" width=\"374\" height=\"306\" fill=\"#ffffff\"/><polygon points=\"58,256 220.91,256 172.82,46\" fill=\"#eef4fa\" stroke=\"none\"/><polygon points=\"220.91,256 287.64,209.28 172.82,46\" fill=\"#eef4fa\" stroke=\"none\"/><line x1=\"124.72\" y1=\"209.28\" x2=\"287.64\" y2=\"209.28\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"58\" y1=\"256\" x2=\"124.72\" y2=\"209.28\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"124.72\" y1=\"209.28\" x2=\"172.82\" y2=\"46\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"58\" y1=\"256\" x2=\"220.91\" y2=\"256\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"220.91\" y1=\"256\" x2=\"287.64\" y2=\"209.28\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"172.82\" y1=\"46\" x2=\"220.91\" y2=\"256\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"58\" y1=\"256\" x2=\"172.82\" y2=\"46\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"172.82\" y1=\"46\" x2=\"287.64\" y2=\"209.28\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"172.82\" y1=\"46\" x2=\"139.46\" y2=\"256\" stroke=\"#c0392b\" stroke-width=\"1.8\" stroke-dasharray=\"6 4\"/><text x=\"139.46\" y=\"276\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">8 cm</text><rect x=\"134.64\" y=\"143\" width=\"43\" height=\"18\" fill=\"#ffffff\"/><text x=\"156.14\" y=\"156\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">10 cm</text></svg></div>",
    "options": [
      {
        "text": "160 cm²",
        "correct": false,
        "feedback": "Found the area of all four triangular faces, \\(4 \\times 40 = 160\\), giving 160 cm². The question asks for one face, \\(\\tfrac{1}{2} \\times 8 \\times 10 = 40\\)."
      },
      {
        "text": "40 cm²",
        "correct": true,
        "feedback": "Correct. One face is a triangle with base 8 cm and height equal to the slant height, 10 cm: \\(\\tfrac{1}{2} \\times 8 \\times 10 = 40\\text{ cm}^2\\)."
      },
      {
        "text": "64 cm²",
        "correct": false,
        "feedback": "Found the area of the square base, \\(8 \\times 8 = 64\\), giving 64 cm². The question asks for one triangular face."
      },
      {
        "text": "80 cm²",
        "correct": false,
        "feedback": "Forgot the ½ and found \\(8 \\times 10 = 80\\), giving 80 cm². A triangle is half of that rectangle."
      }
    ],
    "backward": "Areas of triangles, Ch7.",
    "forward": "Later in this chapter you add all five faces for the total surface area."
  },
  {
    "itemId": "d3",
    "order": 3,
    "cluster": "C2",
    "clusterName": "Surface area of cuboids and triangular prisms",
    "question": "What is the total surface area of the cuboid shown?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 394 232\" width=\"394\" height=\"232\" role=\"img\" aria-label=\"Cuboid 6 cm by 4 cm by 3 cm.\"><rect x=\"0\" y=\"0\" width=\"394\" height=\"232\" fill=\"#ffffff\"/><polygon points=\"58,83.55 254.38,83.55 254.38,181.74 58,181.74\" fill=\"#eef4fa\" stroke=\"none\"/><polygon points=\"254.38,181.74 254.38,83.55 308,46 308,144.19\" fill=\"#eef4fa\" stroke=\"none\"/><polygon points=\"254.38,83.55 58,83.55 111.62,46 308,46\" fill=\"#eef4fa\" stroke=\"none\"/><line x1=\"111.62\" y1=\"144.19\" x2=\"308\" y2=\"144.19\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"111.62\" y1=\"144.19\" x2=\"111.62\" y2=\"46\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"58\" y1=\"181.74\" x2=\"111.62\" y2=\"144.19\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"58\" y1=\"83.55\" x2=\"254.38\" y2=\"83.55\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"254.38\" y1=\"181.74\" x2=\"254.38\" y2=\"83.55\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"58\" y1=\"181.74\" x2=\"254.38\" y2=\"181.74\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"58\" y1=\"181.74\" x2=\"58\" y2=\"83.55\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"308\" y1=\"144.19\" x2=\"308\" y2=\"46\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"111.62\" y1=\"46\" x2=\"308\" y2=\"46\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"254.38\" y1=\"181.74\" x2=\"308\" y2=\"144.19\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"254.38\" y1=\"83.55\" x2=\"308\" y2=\"46\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"58\" y1=\"83.55\" x2=\"111.62\" y2=\"46\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><text x=\"156.19\" y=\"201.74\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">6 cm</text><text x=\"290.83\" y=\"175.19\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"start\">4 cm</text><text x=\"47\" y=\"137.64\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"end\">3 cm</text></svg></div>",
    "options": [
      {
        "text": "84 cm²",
        "correct": false,
        "feedback": "Left out one pair of faces: \\(2 \\times 24 + 2 \\times 18 = 48 + 36 = 84\\), giving 84 cm². The 4 by 3 faces at the ends must be included too."
      },
      {
        "text": "108 cm²",
        "correct": true,
        "feedback": "Correct. There are three different pairs of faces: \\(6 \\times 4 = 24\\), \\(6 \\times 3 = 18\\) and \\(4 \\times 3 = 12\\). Each appears twice, so the total is \\(2 \\times (24 + 18 + 12) = 2 \\times 54 = 108\\text{ cm}^2\\)."
      },
      {
        "text": "72 cm²",
        "correct": false,
        "feedback": "Found the volume, \\(6 \\times 4 \\times 3 = 72\\), giving 72 cm². Surface area adds up the areas of all 6 faces."
      },
      {
        "text": "54 cm²",
        "correct": false,
        "feedback": "Counted each different face once, \\(24 + 18 + 12 = 54\\), giving 54 cm². Every face has an identical partner opposite it, so double this."
      }
    ],
    "backward": "Areas of rectangles, Ch7.",
    "forward": "Later in this chapter you apply the same idea to triangular prisms."
  },
  {
    "itemId": "d4",
    "order": 4,
    "cluster": "C5",
    "clusterName": "Symmetry in 3D",
    "question": "The diagram shows a prism with square ends. How many planes of symmetry does it have?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 392 306\" width=\"392\" height=\"306\" role=\"img\" aria-label=\"Prism with square ends of side 4 cm and length 10 cm.\"><rect x=\"0\" y=\"0\" width=\"392\" height=\"306\" fill=\"#ffffff\"/><polygon points=\"58,133.69 180.31,133.69 180.31,256 58,256\" fill=\"#eef4fa\" stroke=\"none\"/><polygon points=\"180.31,256 180.31,133.69 305.54,46 305.54,168.31\" fill=\"#eef4fa\" stroke=\"none\"/><polygon points=\"180.31,133.69 58,133.69 183.24,46 305.54,46\" fill=\"#eef4fa\" stroke=\"none\"/><line x1=\"183.24\" y1=\"168.31\" x2=\"305.54\" y2=\"168.31\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"183.24\" y1=\"168.31\" x2=\"183.24\" y2=\"46\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"58\" y1=\"256\" x2=\"183.24\" y2=\"168.31\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"58\" y1=\"133.69\" x2=\"180.31\" y2=\"133.69\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"180.31\" y1=\"256\" x2=\"180.31\" y2=\"133.69\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"58\" y1=\"256\" x2=\"180.31\" y2=\"256\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"58\" y1=\"256\" x2=\"58\" y2=\"133.69\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"305.54\" y1=\"168.31\" x2=\"305.54\" y2=\"46\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"183.24\" y1=\"46\" x2=\"305.54\" y2=\"46\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"180.31\" y1=\"256\" x2=\"305.54\" y2=\"168.31\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"180.31\" y1=\"133.69\" x2=\"305.54\" y2=\"46\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"58\" y1=\"133.69\" x2=\"183.24\" y2=\"46\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"175.31\" y1=\"194.85\" x2=\"185.31\" y2=\"194.85\" stroke=\"#333333\" stroke-width=\"1.8\"/><line x1=\"119.15\" y1=\"138.69\" x2=\"119.15\" y2=\"128.69\" stroke=\"#333333\" stroke-width=\"1.8\"/><line x1=\"63\" y1=\"194.85\" x2=\"53\" y2=\"194.85\" stroke=\"#333333\" stroke-width=\"1.8\"/><line x1=\"119.15\" y1=\"251\" x2=\"119.15\" y2=\"261\" stroke=\"#333333\" stroke-width=\"1.8\"/><text x=\"119.15\" y=\"276\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">4 cm</text><text x=\"252.57\" y=\"224.38\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"start\">10 cm</text></svg></div>",
    "options": [
      {
        "text": "3 planes",
        "correct": false,
        "feedback": "Gave 3 planes, which is the number for a cuboid with three different edges. Because the ends are squares, two diagonal planes also work, so there are \\(3 + 2 = 5\\)."
      },
      {
        "text": "4 planes",
        "correct": false,
        "feedback": "Counted only the lengthways planes, \\(2 + 2 = 4\\), giving 4 planes. The plane across the middle of the length is a mirror plane too."
      },
      {
        "text": "5 planes",
        "correct": true,
        "feedback": "Correct. Two planes cut lengthways through the midpoints of opposite sides of the square ends, two more cut lengthways along the diagonals of the square ends, and one cuts across the middle of the length: \\(2 + 2 + 1 = 5\\)."
      },
      {
        "text": "9 planes",
        "correct": false,
        "feedback": "Gave 9 planes, which is the number for a cube. This prism is longer than it is wide, so it is not a cube and fewer planes work."
      }
    ],
    "backward": "Line symmetry of a square and reflection, Ch13.",
    "forward": "Later in this chapter you count the planes of symmetry of a cube."
  },
  {
    "itemId": "d5",
    "order": 5,
    "cluster": "C3",
    "clusterName": "Surface area of cylinders",
    "question": "The diagram shows a closed cylinder. Use \\(\\pi = 3.14\\). What is its total surface area?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 330 283\" width=\"330\" height=\"283\" role=\"img\" aria-label=\"Closed cylinder with radius 5 cm and height 10 cm.\"><rect x=\"0\" y=\"0\" width=\"330\" height=\"283\" fill=\"#ffffff\"/><ellipse cx=\"145\" cy=\"68.5\" rx=\"75\" ry=\"22.5\" fill=\"#eef4fa\" stroke=\"#333333\" stroke-width=\"2\"/><line x1=\"70\" y1=\"68.5\" x2=\"70\" y2=\"218.5\" stroke=\"#333333\" stroke-width=\"2\"/><line x1=\"220\" y1=\"68.5\" x2=\"220\" y2=\"218.5\" stroke=\"#333333\" stroke-width=\"2\"/><path d=\"M 70 218.5 A 75 22.5 0 0 0 220 218.5\" fill=\"none\" stroke=\"#333333\" stroke-width=\"2\"/><path d=\"M 70 218.5 A 75 22.5 0 0 1 220 218.5\" fill=\"none\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"145\" y1=\"68.5\" x2=\"220\" y2=\"68.5\" stroke=\"#333333\" stroke-width=\"1.8\"/><circle cx=\"145\" cy=\"68.5\" r=\"3\" fill=\"#333333\"/><text x=\"182.5\" y=\"40\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">5 cm</text><line x1=\"224\" y1=\"68.5\" x2=\"252\" y2=\"68.5\" stroke=\"#888888\" stroke-width=\"1\"/><line x1=\"224\" y1=\"218.5\" x2=\"252\" y2=\"218.5\" stroke=\"#888888\" stroke-width=\"1\"/><line x1=\"248\" y1=\"68.5\" x2=\"248\" y2=\"218.5\" stroke=\"#333333\" stroke-width=\"1.5\"/><polyline points=\"244,76.5 248,68.5 252,76.5\" stroke=\"#333333\" stroke-width=\"1.5\" fill=\"none\"/><polyline points=\"244,210.5 248,218.5 252,210.5\" stroke=\"#333333\" stroke-width=\"1.5\" fill=\"none\"/><text x=\"256\" y=\"148.5\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"start\">10 cm</text></svg></div>",
    "options": [
      {
        "text": "157 cm²",
        "correct": false,
        "feedback": "Found only the two circular ends, \\(2 \\times 3.14 \\times 5 \\times 5 = 157\\), giving 157 cm². The curved surface must be added."
      },
      {
        "text": "471 cm²",
        "correct": true,
        "feedback": "Correct. The curved surface is \\(2 \\times 3.14 \\times 5 \\times 10 = 314\\). The two circular ends are \\(2 \\times 3.14 \\times 5 \\times 5 = 157\\). The total is \\(314 + 157 = 471\\text{ cm}^2\\)."
      },
      {
        "text": "785 cm²",
        "correct": false,
        "feedback": "Used \\(\\pi \\times r \\times r \\times h = 3.14 \\times 25 \\times 10 = 785\\), giving 785 cm². That is the volume formula, not surface area."
      },
      {
        "text": "314 cm²",
        "correct": false,
        "feedback": "Found only the curved surface, \\(2 \\times 3.14 \\times 5 \\times 10 = 314\\), giving 314 cm². A closed cylinder also has two circular ends."
      }
    ],
    "backward": "Circumference and area of a circle, Ch7.",
    "forward": "Later in this chapter you meet cylinders that are open at one end."
  },
  {
    "itemId": "d6",
    "order": 6,
    "cluster": "C6",
    "clusterName": "Mixed 3D problems",
    "question": "A cube has a volume of 125 cm³. What is its total surface area?",
    "options": [
      {
        "text": "150 cm²",
        "correct": true,
        "feedback": "Correct. The edge is the number that multiplies to 125: \\(5 \\times 5 \\times 5 = 125\\), so the edge is 5 cm. Each face has area \\(5 \\times 5 = 25\\), so the total is \\(6 \\times 25 = 150\\text{ cm}^2\\)."
      },
      {
        "text": "100 cm²",
        "correct": false,
        "feedback": "Counted only 4 faces, \\(4 \\times 25 = 100\\), giving 100 cm². The top and the bottom are faces as well."
      },
      {
        "text": "25 cm²",
        "correct": false,
        "feedback": "Found the area of one face, \\(5 \\times 5 = 25\\), giving 25 cm². A cube has 6 faces."
      },
      {
        "text": "125 cm²",
        "correct": false,
        "feedback": "Gave the volume, 125, as an area, giving 125 cm². Surface area comes from the faces: the edge is 5 cm, so \\(6 \\times 25 = 150\\)."
      }
    ],
    "backward": "Indices, Ch1.",
    "forward": "Later in this chapter you combine volume and surface area in longer problems."
  },
  {
    "itemId": "d7",
    "order": 7,
    "cluster": "C1",
    "clusterName": "Volume of prisms and cylinders",
    "question": "The diagram shows a cylinder. Use \\(\\pi = 3.14\\). What is its volume?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 368 294\" width=\"368\" height=\"294\" role=\"img\" aria-label=\"Cylinder with diameter 10 cm and height 8 cm.\"><rect x=\"0\" y=\"0\" width=\"368\" height=\"294\" fill=\"#ffffff\"/><ellipse cx=\"163.75\" cy=\"74.12\" rx=\"93.75\" ry=\"28.12\" fill=\"#eef4fa\" stroke=\"#333333\" stroke-width=\"2\"/><line x1=\"70\" y1=\"74.12\" x2=\"70\" y2=\"224.12\" stroke=\"#333333\" stroke-width=\"2\"/><line x1=\"257.5\" y1=\"74.12\" x2=\"257.5\" y2=\"224.12\" stroke=\"#333333\" stroke-width=\"2\"/><path d=\"M 70 224.12 A 93.75 28.12 0 0 0 257.5 224.12\" fill=\"none\" stroke=\"#333333\" stroke-width=\"2\"/><path d=\"M 70 224.12 A 93.75 28.12 0 0 1 257.5 224.12\" fill=\"none\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"70\" y1=\"74.12\" x2=\"257.5\" y2=\"74.12\" stroke=\"#333333\" stroke-width=\"1.8\"/><text x=\"163.75\" y=\"40\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">10 cm</text><line x1=\"261.5\" y1=\"74.12\" x2=\"289.5\" y2=\"74.12\" stroke=\"#888888\" stroke-width=\"1\"/><line x1=\"261.5\" y1=\"224.12\" x2=\"289.5\" y2=\"224.12\" stroke=\"#888888\" stroke-width=\"1\"/><line x1=\"285.5\" y1=\"74.12\" x2=\"285.5\" y2=\"224.12\" stroke=\"#333333\" stroke-width=\"1.5\"/><polyline points=\"281.5,82.12 285.5,74.12 289.5,82.12\" stroke=\"#333333\" stroke-width=\"1.5\" fill=\"none\"/><polyline points=\"281.5,216.12 285.5,224.12 289.5,216.12\" stroke=\"#333333\" stroke-width=\"1.5\" fill=\"none\"/><text x=\"293.5\" y=\"154.12\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"start\">8 cm</text></svg></div>",
    "options": [
      {
        "text": "628 cm³",
        "correct": true,
        "feedback": "Correct. The diameter is 10 cm, so the radius is 5 cm. The area of the circular end is \\(3.14 \\times 5 \\times 5 = 78.5\\), and the volume is \\(78.5 \\times 8 = 628\\text{ cm}^3\\)."
      },
      {
        "text": "2512 cm³",
        "correct": false,
        "feedback": "Used the diameter as the radius: \\(3.14 \\times 10 \\times 10 = 314\\) and \\(314 \\times 8 = 2512\\), giving 2512 cm³. The radius is half the diameter, 5 cm."
      },
      {
        "text": "251.2 cm³",
        "correct": false,
        "feedback": "Calculated \\(3.14 \\times 10 \\times 8 = 251.2\\), giving 251.2 cm³. That multiplies π, the diameter and the height, which is a curved surface area, not a volume."
      },
      {
        "text": "78.5 cm³",
        "correct": false,
        "feedback": "Found only the area of the circular end, \\(3.14 \\times 5 \\times 5 = 78.5\\), giving 78.5 cm³. Multiply by the height, 8, to get a volume."
      }
    ],
    "backward": "Area of a circle, Ch7.",
    "forward": "Later in this chapter you find the curved and total surface areas of cylinders."
  },
  {
    "itemId": "d8",
    "order": 8,
    "cluster": "C4",
    "clusterName": "Surface area of pyramids",
    "question": "What is the total surface area of the square-based pyramid shown, including its base?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 364 306\" width=\"364\" height=\"306\" role=\"img\" aria-label=\"Square-based pyramid, base edge 10 cm, slant height 13 cm.\"><rect x=\"0\" y=\"0\" width=\"364\" height=\"306\" fill=\"#ffffff\"/><polygon points=\"58,256 214.32,256 168.17,46\" fill=\"#eef4fa\" stroke=\"none\"/><polygon points=\"214.32,256 278.35,211.17 168.17,46\" fill=\"#eef4fa\" stroke=\"none\"/><line x1=\"122.03\" y1=\"211.17\" x2=\"278.35\" y2=\"211.17\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"58\" y1=\"256\" x2=\"122.03\" y2=\"211.17\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"122.03\" y1=\"211.17\" x2=\"168.17\" y2=\"46\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"58\" y1=\"256\" x2=\"214.32\" y2=\"256\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"214.32\" y1=\"256\" x2=\"278.35\" y2=\"211.17\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"168.17\" y1=\"46\" x2=\"214.32\" y2=\"256\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"58\" y1=\"256\" x2=\"168.17\" y2=\"46\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"168.17\" y1=\"46\" x2=\"278.35\" y2=\"211.17\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"168.17\" y1=\"46\" x2=\"136.16\" y2=\"256\" stroke=\"#c0392b\" stroke-width=\"1.8\" stroke-dasharray=\"6 4\"/><text x=\"136.16\" y=\"276\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">10 cm</text><rect x=\"130.67\" y=\"143\" width=\"43\" height=\"18\" fill=\"#ffffff\"/><text x=\"152.17\" y=\"156\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">13 cm</text></svg></div>",
    "options": [
      {
        "text": "620 cm²",
        "correct": false,
        "feedback": "Forgot the ½ on each triangle: \\(4 \\times (10 \\times 13) = 520\\) and \\(520 + 100 = 620\\), giving 620 cm². Each triangle has area \\(\\tfrac{1}{2} \\times 10 \\times 13 = 65\\)."
      },
      {
        "text": "360 cm²",
        "correct": true,
        "feedback": "Correct. The base is \\(10 \\times 10 = 100\\). Each triangular face is \\(\\tfrac{1}{2} \\times 10 \\times 13 = 65\\), so the four faces are \\(4 \\times 65 = 260\\). The total is \\(100 + 260 = 360\\text{ cm}^2\\)."
      },
      {
        "text": "165 cm²",
        "correct": false,
        "feedback": "Added the base and just one triangle, \\(100 + 65 = 165\\), giving 165 cm². The pyramid has 4 triangular faces."
      },
      {
        "text": "260 cm²",
        "correct": false,
        "feedback": "Found only the four triangular faces, \\(4 \\times 65 = 260\\), giving 260 cm². The square base, \\(10 \\times 10 = 100\\), is part of the total surface area."
      }
    ],
    "backward": "Areas of compound shapes, Ch7.",
    "forward": "Later in this chapter you find the slant height yourself using Pythagoras' theorem."
  },
  {
    "itemId": "d9",
    "order": 9,
    "cluster": "C2",
    "clusterName": "Surface area of cuboids and triangular prisms",
    "question": "What is the total surface area of the triangular prism shown?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 361 306\" width=\"361\" height=\"306\" role=\"img\" aria-label=\"Triangular prism with end sides 3 cm, 4 cm and 5 cm and length 10 cm.\"><rect x=\"0\" y=\"0\" width=\"361\" height=\"306\" fill=\"#ffffff\"/><polygon points=\"58,133.69 149.73,256 58,256\" fill=\"#eef4fa\" stroke=\"none\"/><polygon points=\"149.73,256 58,133.69 183.24,46 274.97,168.31\" fill=\"#eef4fa\" stroke=\"none\"/><line x1=\"183.24\" y1=\"168.31\" x2=\"274.97\" y2=\"168.31\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"183.24\" y1=\"168.31\" x2=\"183.24\" y2=\"46\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"58\" y1=\"256\" x2=\"183.24\" y2=\"168.31\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"58\" y1=\"133.69\" x2=\"149.73\" y2=\"256\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"58\" y1=\"256\" x2=\"149.73\" y2=\"256\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"58\" y1=\"256\" x2=\"58\" y2=\"133.69\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"183.24\" y1=\"46\" x2=\"274.97\" y2=\"168.31\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"149.73\" y1=\"256\" x2=\"274.97\" y2=\"168.31\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"58\" y1=\"133.69\" x2=\"183.24\" y2=\"46\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><polyline points=\"69,256 69,245 58,245\" stroke=\"#333333\" stroke-width=\"1.3\" fill=\"none\"/><text x=\"103.87\" y=\"276\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">3 cm</text><text x=\"47\" y=\"199.85\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"end\">4 cm</text><text x=\"113.47\" y=\"190.25\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"start\">5 cm</text><text x=\"221.99\" y=\"224.38\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"start\">10 cm</text></svg></div>",
    "options": [
      {
        "text": "132 cm²",
        "correct": true,
        "feedback": "Correct. The two triangular ends have area \\(2 \\times (\\tfrac{1}{2} \\times 3 \\times 4) = 12\\). The three rectangles have widths 3, 4 and 5, so together they are \\((3 + 4 + 5) \\times 10 = 120\\). The total is \\(12 + 120 = 132\\text{ cm}^2\\)."
      },
      {
        "text": "126 cm²",
        "correct": false,
        "feedback": "Added only one triangular end: \\(6 + 120 = 126\\), giving 126 cm². The prism has two triangular ends, so add \\(2 \\times 6 = 12\\)."
      },
      {
        "text": "82 cm²",
        "correct": false,
        "feedback": "Left out the rectangle on the 5 cm side: \\(12 + (3 + 4) \\times 10 = 12 + 70 = 82\\), giving 82 cm². There are three rectangles, one for each side of the triangle."
      },
      {
        "text": "120 cm²",
        "correct": false,
        "feedback": "Found only the three rectangles, \\((3 + 4 + 5) \\times 10 = 120\\), giving 120 cm². The two triangular ends, 12 in total, must be added."
      }
    ],
    "backward": "Areas of triangles and rectangles, Ch7.",
    "forward": "Later in this chapter you find a missing side of a prism using Pythagoras' theorem."
  },
  {
    "itemId": "d10",
    "order": 10,
    "cluster": "C5",
    "clusterName": "Symmetry in 3D",
    "question": "How many planes of symmetry does the triangular prism shown have?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 394 266\" width=\"394\" height=\"266\" role=\"img\" aria-label=\"Triangular prism with isosceles ends, equal sides 5 cm, third side 6 cm, length 9 cm.\"><rect x=\"0\" y=\"0\" width=\"394\" height=\"266\" fill=\"#ffffff\"/><polygon points=\"135.43,112.62 212.86,215.86 58,215.86\" fill=\"#eef4fa\" stroke=\"none\"/><polygon points=\"212.86,215.86 135.43,112.62 230.57,46 308,149.24\" fill=\"#eef4fa\" stroke=\"none\"/><line x1=\"153.14\" y1=\"149.24\" x2=\"308\" y2=\"149.24\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"153.14\" y1=\"149.24\" x2=\"230.57\" y2=\"46\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"58\" y1=\"215.86\" x2=\"153.14\" y2=\"149.24\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"135.43\" y1=\"112.62\" x2=\"212.86\" y2=\"215.86\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"58\" y1=\"215.86\" x2=\"212.86\" y2=\"215.86\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"58\" y1=\"215.86\" x2=\"135.43\" y2=\"112.62\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"230.57\" y1=\"46\" x2=\"308\" y2=\"149.24\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"212.86\" y1=\"215.86\" x2=\"308\" y2=\"149.24\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"135.43\" y1=\"112.62\" x2=\"230.57\" y2=\"46\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"170.14\" y1=\"167.24\" x2=\"178.14\" y2=\"161.24\" stroke=\"#333333\" stroke-width=\"1.8\"/><line x1=\"100.71\" y1=\"167.24\" x2=\"92.71\" y2=\"161.24\" stroke=\"#333333\" stroke-width=\"1.8\"/><text x=\"135.43\" y=\"235.86\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">6 cm</text><text x=\"86.68\" y=\"163.08\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"end\">5 cm</text><text x=\"270.07\" y=\"194.78\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"start\">9 cm</text></svg></div>",
    "options": [
      {
        "text": "5 planes",
        "correct": false,
        "feedback": "Counted the 5 faces of the prism, giving 5 planes. A plane of symmetry is a mirror cut through the middle of the solid, not a face; here there are \\(1 + 1 = 2\\)."
      },
      {
        "text": "3 planes",
        "correct": false,
        "feedback": "Gave 3 planes, as if the ends had 3 lines of symmetry. This isosceles triangle is not equilateral and has only 1, so there is only \\(1 + 1 = 2\\)."
      },
      {
        "text": "2 planes",
        "correct": true,
        "feedback": "Correct. The triangular end has 1 line of symmetry, so one plane cuts lengthways along it. A second plane cuts across the middle of the length, parallel to the ends. That gives \\(1 + 1 = 2\\)."
      },
      {
        "text": "4 planes",
        "correct": false,
        "feedback": "Gave 4 planes, which is the number for a prism with equilateral triangle ends: \\(3 + 1\\). This triangle has only 1 line of symmetry, so \\(1 + 1 = 2\\)."
      }
    ],
    "backward": "Line symmetry of triangles, Ch13.",
    "forward": "Later in this chapter you compare this with a prism that has equilateral ends."
  },
  {
    "itemId": "d11",
    "order": 11,
    "cluster": "C3",
    "clusterName": "Surface area of cylinders",
    "question": "A cylinder has a diameter of 8 cm and a height of 6 cm. Use \\(\\pi = 3.14\\). What is the area of its curved surface?",
    "options": [
      {
        "text": "200.96 cm²",
        "correct": false,
        "feedback": "Added one circular end, \\(150.72 + 50.24 = 200.96\\), giving 200.96 cm². The question asks only for the curved surface; one circular end is \\(3.14 \\times 4 \\times 4 = 50.24\\)."
      },
      {
        "text": "251.2 cm²",
        "correct": false,
        "feedback": "Added the two circular ends, \\(150.72 + 100.48 = 251.2\\), giving 251.2 cm². The question asks only for the curved surface."
      },
      {
        "text": "301.44 cm²",
        "correct": false,
        "feedback": "Used the diameter as the radius: \\(2 \\times 3.14 \\times 8 \\times 6 = 301.44\\), giving 301.44 cm². The radius is half of the diameter, 4 cm."
      },
      {
        "text": "150.72 cm²",
        "correct": true,
        "feedback": "Correct. The radius is half of 8, so \\(r = 4\\text{ cm}\\). The curved surface is \\(2 \\times 3.14 \\times 4 \\times 6 = 150.72\\text{ cm}^2\\)."
      }
    ],
    "backward": "Circumference of a circle, Ch7.",
    "forward": "Later in this chapter you combine curved and circular areas for open and closed cylinders."
  },
  {
    "itemId": "d12",
    "order": 12,
    "cluster": "C6",
    "clusterName": "Mixed 3D problems",
    "question": "A cylinder has a radius of 5 cm and a volume of 314 cm³. Use \\(\\pi = 3.14\\). What is the area of its curved surface?",
    "options": [
      {
        "text": "125.6 cm²",
        "correct": true,
        "feedback": "Correct. The area of the circular end is \\(3.14 \\times 5 \\times 5 = 78.5\\), so the height is \\(314 \\div 78.5 = 4\\text{ cm}\\). The curved surface is \\(2 \\times 3.14 \\times 5 \\times 4 = 125.6\\text{ cm}^2\\)."
      },
      {
        "text": "282.6 cm²",
        "correct": false,
        "feedback": "Added both circular ends, \\(125.6 + 157 = 282.6\\), giving 282.6 cm². The question asks only for the curved surface."
      },
      {
        "text": "157 cm²",
        "correct": false,
        "feedback": "Found the area of the two circular ends, \\(2 \\times 78.5 = 157\\), giving 157 cm². The question asks for the curved surface, \\(2 \\times 3.14 \\times 5 \\times 4\\)."
      },
      {
        "text": "204.1 cm²",
        "correct": false,
        "feedback": "Added one circular end, \\(125.6 + 78.5 = 204.1\\), giving 204.1 cm². The question asks only for the curved surface."
      }
    ],
    "backward": "Solving equations, Ch4.",
    "forward": "Later in this chapter you find missing lengths from volumes in longer problems."
  },
  {
    "itemId": "d13",
    "order": 13,
    "cluster": "C1",
    "clusterName": "Volume of prisms and cylinders",
    "question": "What is the volume of the prism shown, whose cross-section is a trapezium?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 394 227\" width=\"394\" height=\"227\" role=\"img\" aria-label=\"Prism with trapezium cross-section, parallel sides 5 cm and 9 cm, height 4 cm, length 10 cm.\"><rect x=\"0\" y=\"0\" width=\"394\" height=\"227\" fill=\"#ffffff\"/><polygon points=\"96.18,100.75 191.63,100.75 229.81,177.11 58,177.11\" fill=\"#eef4fa\" stroke=\"none\"/><polygon points=\"229.81,177.11 191.63,100.75 269.82,46 308,122.36\" fill=\"#eef4fa\" stroke=\"none\"/><polygon points=\"191.63,100.75 96.18,100.75 174.37,46 269.82,46\" fill=\"#eef4fa\" stroke=\"none\"/><line x1=\"136.19\" y1=\"122.36\" x2=\"308\" y2=\"122.36\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"136.19\" y1=\"122.36\" x2=\"174.37\" y2=\"46\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"58\" y1=\"177.11\" x2=\"136.19\" y2=\"122.36\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"96.18\" y1=\"100.75\" x2=\"191.63\" y2=\"100.75\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"191.63\" y1=\"100.75\" x2=\"229.81\" y2=\"177.11\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"58\" y1=\"177.11\" x2=\"229.81\" y2=\"177.11\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"58\" y1=\"177.11\" x2=\"96.18\" y2=\"100.75\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"269.82\" y1=\"46\" x2=\"308\" y2=\"122.36\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"174.37\" y1=\"46\" x2=\"269.82\" y2=\"46\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"229.81\" y1=\"177.11\" x2=\"308\" y2=\"122.36\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"191.63\" y1=\"100.75\" x2=\"269.82\" y2=\"46\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"96.18\" y1=\"100.75\" x2=\"174.37\" y2=\"46\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"143.91\" y1=\"100.75\" x2=\"143.91\" y2=\"177.11\" stroke=\"#c0392b\" stroke-width=\"1.8\" stroke-dasharray=\"6 4\"/><polyline points=\"153.91,177.11 153.91,167.11 143.91,167.11\" stroke=\"#333333\" stroke-width=\"1.3\" fill=\"none\"/><text x=\"143.91\" y=\"197.11\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">9 cm</text><text x=\"143.91\" y=\"90.75\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">5 cm</text><text x=\"278.54\" y=\"161.96\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"start\">10 cm</text><rect x=\"126.11\" y=\"130.93\" width=\"35.6\" height=\"18\" fill=\"#ffffff\"/><text x=\"143.91\" y=\"143.93\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">4 cm</text></svg></div>",
    "options": [
      {
        "text": "560 cm³",
        "correct": false,
        "feedback": "Forgot the ½ for the trapezium: \\((5 + 9) \\times 4 \\times 10 = 560\\), giving 560 cm³. The area of a trapezium is half of (sum of parallel sides) × height."
      },
      {
        "text": "28 cm³",
        "correct": false,
        "feedback": "Found only the area of the cross-section, \\(\\tfrac{1}{2} \\times (5 + 9) \\times 4 = 28\\), giving 28 cm³. Multiply by the length, 10, to get a volume."
      },
      {
        "text": "450 cm³",
        "correct": false,
        "feedback": "Multiplied the parallel sides, \\(5 \\times 9 \\times 10 = 450\\), giving 450 cm³. For a trapezium you add the parallel sides, \\(5 + 9\\), then multiply by half the height."
      },
      {
        "text": "280 cm³",
        "correct": true,
        "feedback": "Correct. The trapezium has area \\(\\tfrac{1}{2} \\times (5 + 9) \\times 4 = 28\\text{ cm}^2\\). The volume is the cross-section area times the length: \\(28 \\times 10 = 280\\text{ cm}^3\\)."
      }
    ],
    "backward": "Area of a trapezium, Ch7.",
    "forward": "Later in this chapter you find the surface area of triangular prisms."
  },
  {
    "itemId": "d14",
    "order": 14,
    "cluster": "C4",
    "clusterName": "Surface area of pyramids",
    "question": "A square-based pyramid has a base edge of 6 cm and a slant height of 7 cm. What is the total area of its four triangular faces?",
    "options": [
      {
        "text": "21 cm²",
        "correct": false,
        "feedback": "Found the area of one face, \\(\\tfrac{1}{2} \\times 6 \\times 7 = 21\\), giving 21 cm². There are 4 triangular faces."
      },
      {
        "text": "84 cm²",
        "correct": true,
        "feedback": "Correct. One face is \\(\\tfrac{1}{2} \\times 6 \\times 7 = 21\\text{ cm}^2\\). There are four faces, so \\(4 \\times 21 = 84\\text{ cm}^2\\)."
      },
      {
        "text": "36 cm²",
        "correct": false,
        "feedback": "Found the area of the square base, \\(6 \\times 6 = 36\\), giving 36 cm². The question asks for the four triangular faces."
      },
      {
        "text": "42 cm²",
        "correct": false,
        "feedback": "Found \\(6 \\times 7 = 42\\), the area of a rectangle, giving 42 cm². Each triangular face is half of that, 21, and there are four of them."
      }
    ],
    "backward": "Areas of triangles, Ch7.",
    "forward": "Later in this chapter you find the slant height using Pythagoras' theorem."
  },
  {
    "itemId": "d15",
    "order": 15,
    "cluster": "C2",
    "clusterName": "Surface area of cuboids and triangular prisms",
    "question": "The diagram shows the net of a cuboid. What is the total surface area of the cuboid?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 364 346\" width=\"364\" height=\"346\" role=\"img\" aria-label=\"Net of a cuboid with edges 5 cm, 3 cm and 2 cm.\"><rect x=\"0\" y=\"0\" width=\"364\" height=\"346\" fill=\"#ffffff\"/><rect x=\"92\" y=\"36\" width=\"130\" height=\"78\" fill=\"#eef4fa\" stroke=\"#333333\" stroke-width=\"2\"/><rect x=\"92\" y=\"114\" width=\"130\" height=\"52\" fill=\"#eef4fa\" stroke=\"#333333\" stroke-width=\"2\"/><rect x=\"92\" y=\"166\" width=\"130\" height=\"78\" fill=\"#eef4fa\" stroke=\"#333333\" stroke-width=\"2\"/><rect x=\"92\" y=\"244\" width=\"130\" height=\"52\" fill=\"#eef4fa\" stroke=\"#333333\" stroke-width=\"2\"/><rect x=\"40\" y=\"36\" width=\"52\" height=\"78\" fill=\"#eef4fa\" stroke=\"#333333\" stroke-width=\"2\"/><rect x=\"222\" y=\"36\" width=\"52\" height=\"78\" fill=\"#eef4fa\" stroke=\"#333333\" stroke-width=\"2\"/><text x=\"157\" y=\"28\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">5 cm</text><text x=\"282\" y=\"80\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"start\">3 cm</text><text x=\"66\" y=\"28\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">2 cm</text></svg></div>",
    "options": [
      {
        "text": "62 cm²",
        "correct": true,
        "feedback": "Correct. The net has three pairs of matching rectangles: \\(5 \\times 3 = 15\\), \\(5 \\times 2 = 10\\) and \\(3 \\times 2 = 6\\). The total is \\(2 \\times (15 + 10 + 6) = 2 \\times 31 = 62\\text{ cm}^2\\)."
      },
      {
        "text": "50 cm²",
        "correct": false,
        "feedback": "Left out one pair of rectangles: \\(2 \\times 15 + 2 \\times 10 = 30 + 20 = 50\\), giving 50 cm². The 3 by 2 rectangles are part of the net too."
      },
      {
        "text": "31 cm²",
        "correct": false,
        "feedback": "Counted each different rectangle once, \\(15 + 10 + 6 = 31\\), giving 31 cm². The net has 6 rectangles in 3 matching pairs, so double it."
      },
      {
        "text": "30 cm²",
        "correct": false,
        "feedback": "Found the volume, \\(5 \\times 3 \\times 2 = 30\\), giving 30 cm². Surface area is the total area of all the rectangles in the net."
      }
    ],
    "backward": "Areas of rectangles, Ch7.",
    "forward": "Later in this chapter you use the net of a pyramid in the same way."
  },
  {
    "itemId": "d16",
    "order": 16,
    "cluster": "C5",
    "clusterName": "Symmetry in 3D",
    "question": "A prism has ends that are equilateral triangles. What is the order of rotational symmetry about the axis through the centres of the two triangular ends?",
    "options": [
      {
        "text": "order 2",
        "correct": false,
        "feedback": "Gave order 2, which would mean a half turn fits the prism onto itself. A half turn does not fit an equilateral triangle onto itself; a turn of 120° does."
      },
      {
        "text": "order 6",
        "correct": false,
        "feedback": "Counted the 6 corners of the prism, giving order 6. The order is the number of times the shape fits onto itself in one full turn, which is 3 here."
      },
      {
        "text": "order 1",
        "correct": false,
        "feedback": "Gave order 1, meaning only a full turn fits. A turn of 120° about this axis also fits the prism onto itself, so the order is 3."
      },
      {
        "text": "order 3",
        "correct": true,
        "feedback": "Correct. A turn of 120° about this axis moves each corner of the equilateral triangle onto the next one, so the prism fits onto itself 3 times in one full turn. The order is 3."
      }
    ],
    "backward": "Rotation, Ch13.",
    "forward": "Later in this chapter you meet cuboids and pyramids with different orders of rotation."
  },
  {
    "itemId": "d17",
    "order": 17,
    "cluster": "C3",
    "clusterName": "Surface area of cylinders",
    "question": "An open cylindrical can has a base but no lid. Its radius is 2 cm and its height is 7 cm. Use \\(\\pi = 3.14\\). What is the total area of its outside surface?",
    "options": [
      {
        "text": "87.92 cm²",
        "correct": false,
        "feedback": "Found only the curved surface, \\(2 \\times 3.14 \\times 2 \\times 7 = 87.92\\), giving 87.92 cm². The base is part of the outside surface and must be added."
      },
      {
        "text": "25.12 cm²",
        "correct": false,
        "feedback": "Found the area of two circles, \\(2 \\times 3.14 \\times 2 \\times 2 = 25.12\\), giving 25.12 cm². The curved surface and only one circle are needed."
      },
      {
        "text": "113.04 cm²",
        "correct": false,
        "feedback": "Added two circular ends, \\(87.92 + 25.12 = 113.04\\), giving 113.04 cm². The can has no lid, so there is only one circle, 12.56."
      },
      {
        "text": "100.48 cm²",
        "correct": true,
        "feedback": "Correct. The curved surface is \\(2 \\times 3.14 \\times 2 \\times 7 = 87.92\\). The one circular base is \\(3.14 \\times 2 \\times 2 = 12.56\\). The total is \\(87.92 + 12.56 = 100.48\\text{ cm}^2\\)."
      }
    ],
    "backward": "Circumference and area of a circle, Ch7.",
    "forward": "Later in this chapter you use cylinders in longer problems that mix volume and area."
  },
  {
    "itemId": "d18",
    "order": 18,
    "cluster": "C6",
    "clusterName": "Mixed 3D problems",
    "question": "The diagram shows a solid made by placing a square-based pyramid on top of a cube. The base of the pyramid is the same size as the top face of the cube. What is the total surface area of the solid?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 308 306\" width=\"308\" height=\"306\" role=\"img\" aria-label=\"Cube of edge 6 cm with a square-based pyramid on top; slant height of the pyramid 5 cm.\"><rect x=\"0\" y=\"0\" width=\"308\" height=\"306\" fill=\"#ffffff\"/><polygon points=\"58,139.98 174.02,139.98 174.02,256 58,256\" fill=\"#eef4fa\" stroke=\"none\"/><polygon points=\"174.02,256 174.02,139.98 221.54,106.71 221.54,222.73\" fill=\"#eef4fa\" stroke=\"none\"/><polygon points=\"58,139.98 174.02,139.98 139.77,46\" fill=\"#eef4fa\" stroke=\"none\"/><polygon points=\"174.02,139.98 221.54,106.71 139.77,46\" fill=\"#eef4fa\" stroke=\"none\"/><line x1=\"105.52\" y1=\"222.73\" x2=\"221.54\" y2=\"222.73\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"105.52\" y1=\"106.71\" x2=\"221.54\" y2=\"106.71\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"105.52\" y1=\"222.73\" x2=\"105.52\" y2=\"106.71\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"58\" y1=\"256\" x2=\"105.52\" y2=\"222.73\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"58\" y1=\"139.98\" x2=\"105.52\" y2=\"106.71\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"105.52\" y1=\"106.71\" x2=\"221.54\" y2=\"106.71\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"58\" y1=\"139.98\" x2=\"105.52\" y2=\"106.71\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"105.52\" y1=\"106.71\" x2=\"139.77\" y2=\"46\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"58\" y1=\"139.98\" x2=\"174.02\" y2=\"139.98\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"174.02\" y1=\"256\" x2=\"174.02\" y2=\"139.98\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"58\" y1=\"256\" x2=\"174.02\" y2=\"256\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"58\" y1=\"256\" x2=\"58\" y2=\"139.98\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"221.54\" y1=\"222.73\" x2=\"221.54\" y2=\"106.71\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"174.02\" y1=\"256\" x2=\"221.54\" y2=\"222.73\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"174.02\" y1=\"139.98\" x2=\"221.54\" y2=\"106.71\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"58\" y1=\"139.98\" x2=\"174.02\" y2=\"139.98\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"174.02\" y1=\"139.98\" x2=\"221.54\" y2=\"106.71\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"139.77\" y1=\"46\" x2=\"174.02\" y2=\"139.98\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"58\" y1=\"139.98\" x2=\"139.77\" y2=\"46\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"139.77\" y1=\"46\" x2=\"221.54\" y2=\"106.71\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"139.77\" y1=\"46\" x2=\"116.01\" y2=\"139.98\" stroke=\"#c0392b\" stroke-width=\"1.8\" stroke-dasharray=\"6 4\"/><text x=\"116.01\" y=\"276\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">6 cm</text><rect x=\"110.09\" y=\"84.99\" width=\"35.6\" height=\"18\" fill=\"#ffffff\"/><text x=\"127.89\" y=\"97.99\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">5 cm</text></svg></div>",
    "options": [
      {
        "text": "300 cm²",
        "correct": false,
        "feedback": "Forgot the ½ on each triangle: \\(4 \\times (6 \\times 5) = 120\\), so \\(180 + 120 = 300\\), giving 300 cm². Each triangle has area \\(\\tfrac{1}{2} \\times 6 \\times 5 = 15\\)."
      },
      {
        "text": "276 cm²",
        "correct": false,
        "feedback": "Counted all 6 faces of the cube, \\(6 \\times 36 = 216\\), and then added the pyramid's 60: \\(216 + 60 = 276\\), giving 276 cm². The top face of the cube is covered by the pyramid."
      },
      {
        "text": "240 cm²",
        "correct": true,
        "feedback": "Correct. The top face of the cube is covered, so 5 faces of the cube show: \\(5 \\times 36 = 180\\). The pyramid adds 4 triangles, each \\(\\tfrac{1}{2} \\times 6 \\times 5 = 15\\), so \\(4 \\times 15 = 60\\). The total is \\(180 + 60 = 240\\text{ cm}^2\\)."
      },
      {
        "text": "216 cm²",
        "correct": false,
        "feedback": "Found only the surface area of the cube, \\(6 \\times 36 = 216\\), giving 216 cm². The four triangular faces of the pyramid must be added and the covered top face removed."
      }
    ],
    "backward": "Areas of compound shapes, Ch7.",
    "forward": "Later in this chapter you meet longer problems that join several solids."
  },
  {
    "itemId": "d19",
    "order": 19,
    "cluster": "C1",
    "clusterName": "Volume of prisms and cylinders",
    "question": "A water tank is a cuboid 2 m long, 1.5 m wide and 1 m high. How many litres of water does it hold when full?",
    "options": [
      {
        "text": "3 litres",
        "correct": false,
        "feedback": "Found the volume, \\(2 \\times 1.5 \\times 1 = 3\\), and gave it as 3 litres. That volume is in m³, and each cubic metre holds 1000 litres."
      },
      {
        "text": "300 litres",
        "correct": false,
        "feedback": "Gave 300 litres, which would come from 100 litres in each cubic metre. Each cubic metre holds 1000 litres, so \\(3 \\times 1000 = 3000\\)."
      },
      {
        "text": "3000 litres",
        "correct": true,
        "feedback": "Correct. The volume is \\(2 \\times 1.5 \\times 1 = 3\\text{ m}^3\\). Each cubic metre holds 1000 litres, so the tank holds \\(3 \\times 1000 = 3000\\) litres."
      },
      {
        "text": "30 000 litres",
        "correct": false,
        "feedback": "Gave 30 000 litres, which would come from 10 000 litres in each cubic metre. Each cubic metre holds 1000 litres, so \\(3 \\times 1000 = 3000\\)."
      }
    ],
    "backward": "Large and small units, Ch7.",
    "forward": "Later in this chapter you find missing lengths from capacities."
  },
  {
    "itemId": "d20",
    "order": 20,
    "cluster": "C4",
    "clusterName": "Surface area of pyramids",
    "question": "The diagram shows the net of a square-based pyramid. What is the total surface area of the pyramid?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 348 328\" width=\"348\" height=\"328\" role=\"img\" aria-label=\"Net of a square-based pyramid: square of side 8 cm with triangles of height 5 cm.\"><rect x=\"0\" y=\"0\" width=\"348\" height=\"328\" fill=\"#ffffff\"/><rect x=\"118.75\" y=\"108.75\" width=\"110\" height=\"110\" fill=\"#eef4fa\" stroke=\"#333333\" stroke-width=\"2\"/><polygon points=\"118.75,108.75 228.75,108.75 173.75,40\" fill=\"#eef4fa\" stroke=\"#333333\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"118.75,218.75 228.75,218.75 173.75,287.5\" fill=\"#eef4fa\" stroke=\"#333333\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"118.75,108.75 118.75,218.75 50,163.75\" fill=\"#eef4fa\" stroke=\"#333333\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"228.75,108.75 228.75,218.75 297.5,163.75\" fill=\"#eef4fa\" stroke=\"#333333\" stroke-width=\"2\" stroke-linejoin=\"round\"/><line x1=\"173.75\" y1=\"108.75\" x2=\"173.75\" y2=\"40\" stroke=\"#c0392b\" stroke-width=\"1.8\" stroke-dasharray=\"6 4\"/><text x=\"181.75\" y=\"79.38\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"start\">5 cm</text><text x=\"173.75\" y=\"168.75\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">8 cm</text></svg></div>",
    "options": [
      {
        "text": "224 cm²",
        "correct": false,
        "feedback": "Forgot the ½ on each triangle: \\(4 \\times (8 \\times 5) = 160\\), so \\(64 + 160 = 224\\), giving 224 cm². Each triangle has area \\(\\tfrac{1}{2} \\times 8 \\times 5 = 20\\)."
      },
      {
        "text": "144 cm²",
        "correct": true,
        "feedback": "Correct. The square is \\(8 \\times 8 = 64\\). Each triangle has area \\(\\tfrac{1}{2} \\times 8 \\times 5 = 20\\), so the four triangles are \\(4 \\times 20 = 80\\). The total is \\(64 + 80 = 144\\text{ cm}^2\\)."
      },
      {
        "text": "84 cm²",
        "correct": false,
        "feedback": "Added the square and just one triangle, \\(64 + 20 = 84\\), giving 84 cm². The net has 4 triangles."
      },
      {
        "text": "80 cm²",
        "correct": false,
        "feedback": "Found only the four triangles, \\(4 \\times 20 = 80\\), giving 80 cm². The square in the middle of the net is the base of the pyramid and must be included."
      }
    ],
    "backward": "Areas of compound shapes, Ch7.",
    "forward": "Later in this chapter you work out the height of each triangle with Pythagoras' theorem."
  },
  {
    "itemId": "d21",
    "order": 21,
    "cluster": "C2",
    "clusterName": "Surface area of cuboids and triangular prisms",
    "question": "An open box has no lid. It is a cuboid 10 cm long, 6 cm wide and 4 cm high. What is the total area of its outside surface?",
    "options": [
      {
        "text": "188 cm²",
        "correct": true,
        "feedback": "Correct. The base is \\(10 \\times 6 = 60\\). The two long sides are \\(2 \\times (10 \\times 4) = 80\\), and the two short sides are \\(2 \\times (6 \\times 4) = 48\\). With no lid, the total is \\(60 + 80 + 48 = 188\\text{ cm}^2\\)."
      },
      {
        "text": "240 cm²",
        "correct": false,
        "feedback": "Found the volume, \\(10 \\times 6 \\times 4 = 240\\), giving 240 cm². Surface area is the total area of the faces."
      },
      {
        "text": "248 cm²",
        "correct": false,
        "feedback": "Included a lid as well: \\(2 \\times 60 + 80 + 48 = 248\\), giving 248 cm². The box is open, so there is only the base, 60, and no top."
      },
      {
        "text": "128 cm²",
        "correct": false,
        "feedback": "Found only the four sides, \\(80 + 48 = 128\\), giving 128 cm². The base, \\(10 \\times 6 = 60\\), is part of the outside surface."
      }
    ],
    "backward": "Areas of rectangles, Ch7.",
    "forward": "Later in this chapter you find the surface area of a cylinder with no lid."
  },
  {
    "itemId": "d22",
    "order": 22,
    "cluster": "C5",
    "clusterName": "Symmetry in 3D",
    "question": "How many planes of symmetry does a cube have?",
    "options": [
      {
        "text": "3 planes",
        "correct": false,
        "feedback": "Counted only the planes parallel to the faces, giving 3 planes. A cube also has 6 diagonal planes through opposite edges, so there are \\(3 + 6 = 9\\)."
      },
      {
        "text": "6 planes",
        "correct": false,
        "feedback": "Counted only the diagonal planes, giving 6 planes. Three more planes cut through the middle parallel to the faces, so there are \\(6 + 3 = 9\\)."
      },
      {
        "text": "9 planes",
        "correct": true,
        "feedback": "Correct. Three planes cut through the middle parallel to a pair of faces, and six planes cut diagonally through a pair of opposite edges: \\(3 + 6 = 9\\)."
      },
      {
        "text": "8 planes",
        "correct": false,
        "feedback": "Counted the 8 corners, giving 8 planes. A plane of symmetry is a mirror cut through the middle of the solid, and a cube has 9."
      }
    ],
    "backward": "Reflection and line symmetry, Ch13.",
    "forward": "Later in this chapter you compare the cube with other cuboids."
  },
  {
    "itemId": "d23",
    "order": 23,
    "cluster": "C6",
    "clusterName": "Mixed 3D problems",
    "question": "A label covers the whole curved surface of a tin of beans. The tin has a radius of 5 cm and a height of 16 cm. Use \\(\\pi = 3.14\\). What is the area of the label?",
    "options": [
      {
        "text": "1004.8 cm²",
        "correct": false,
        "feedback": "Used the diameter, 10, as the radius: \\(2 \\times 3.14 \\times 10 \\times 16 = 1004.8\\), giving 1004.8 cm². The radius is 5 cm and is already given."
      },
      {
        "text": "659.4 cm²",
        "correct": false,
        "feedback": "Added the two circular ends, \\(502.4 + 157 = 659.4\\), giving 659.4 cm². A label covers only the curved surface."
      },
      {
        "text": "502.4 cm²",
        "correct": true,
        "feedback": "Correct. The label is a rectangle as wide as the circumference, \\(2 \\times 3.14 \\times 5 = 31.4\\), and as tall as the tin, so its area is \\(31.4 \\times 16 = 502.4\\text{ cm}^2\\)."
      },
      {
        "text": "251.2 cm²",
        "correct": false,
        "feedback": "Used \\(\\pi \\times r \\times h = 3.14 \\times 5 \\times 16 = 251.2\\), giving 251.2 cm², and left out the factor 2. The circumference is \\(2 \\times \\pi \\times r\\)."
      }
    ],
    "backward": "Multiplying decimals, Ch3.",
    "forward": "Later in this chapter you add the circular ends to find the surface area of a whole tin."
  },
  {
    "itemId": "d24",
    "order": 24,
    "cluster": "C6",
    "clusterName": "Mixed 3D problems",
    "question": "A cuboid measures 10 cm by 5 cm by 4 cm. It is cut in half along a plane of symmetry. What is the volume of each half?",
    "options": [
      {
        "text": "20 cm³",
        "correct": false,
        "feedback": "Found the area of the 5 by 4 end, \\(5 \\times 4 = 20\\), giving 20 cm³. Each half has the volume \\(10 \\times 5 \\times 4\\) divided by 2."
      },
      {
        "text": "200 cm³",
        "correct": false,
        "feedback": "Found the volume of the whole cuboid, \\(10 \\times 5 \\times 4 = 200\\), giving 200 cm³. Each half is only half of that."
      },
      {
        "text": "50 cm³",
        "correct": false,
        "feedback": "Halved twice, \\(200 \\div 4 = 50\\), giving 50 cm³. A single cut makes two halves, so divide by 2 only."
      },
      {
        "text": "100 cm³",
        "correct": true,
        "feedback": "Correct. The whole cuboid has volume \\(10 \\times 5 \\times 4 = 200\\text{ cm}^3\\). A plane of symmetry cuts it into two identical halves, so each half has volume \\(200 \\div 2 = 100\\text{ cm}^3\\)."
      }
    ],
    "backward": "Reflection, Ch13.",
    "forward": "Later in this chapter you use symmetry to simplify longer problems."
  }
];

const recheckItems = [
  {
    "itemId": "r1",
    "order": 1,
    "cluster": "C1",
    "clusterName": "Volume of prisms and cylinders",
    "question": "A cylinder has a diameter of 6 cm and a height of 9 cm. Use \\(\\pi = 3.14\\). What is its volume?",
    "options": [
      {
        "text": "1017.36 cm³",
        "correct": false,
        "feedback": "Used the diameter as the radius: \\(3.14 \\times 6 \\times 6 = 113.04\\) and \\(113.04 \\times 9 = 1017.36\\), giving 1017.36 cm³. The radius is half the diameter, 3 cm."
      },
      {
        "text": "84.78 cm³",
        "correct": false,
        "feedback": "Calculated \\(3.14 \\times 3 \\times 9 = 84.78\\), giving 84.78 cm³. The area of the circular end needs the radius squared, \\(3 \\times 3\\), not just 3."
      },
      {
        "text": "254.34 cm³",
        "correct": true,
        "feedback": "Correct. The radius is half of 6, so \\(r = 3\\text{ cm}\\). The area of the circular end is \\(3.14 \\times 3 \\times 3 = 28.26\\), and the volume is \\(28.26 \\times 9 = 254.34\\text{ cm}^3\\)."
      },
      {
        "text": "28.26 cm³",
        "correct": false,
        "feedback": "Found only the area of the circular end, \\(3.14 \\times 3 \\times 3 = 28.26\\), giving 28.26 cm³. Multiply by the height, 9, to get a volume."
      }
    ],
    "backward": "Area of a circle, Ch7.",
    "forward": "Later in this chapter you meet cylinders inside longer volume and area problems."
  },
  {
    "itemId": "r2",
    "order": 2,
    "cluster": "C2",
    "clusterName": "Surface area of cuboids and triangular prisms",
    "question": "What is the total surface area of the triangular prism shown?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 266 306\" width=\"266\" height=\"306\" role=\"img\" aria-label=\"Triangular prism with end sides 5 cm, 12 cm and 13 cm and length 8 cm.\"><rect x=\"0\" y=\"0\" width=\"266\" height=\"306\" fill=\"#ffffff\"/><polygon points=\"58,79.71 131.46,256 58,256\" fill=\"#eef4fa\" stroke=\"none\"/><polygon points=\"131.46,256 58,79.71 106.14,46 179.59,222.29\" fill=\"#eef4fa\" stroke=\"none\"/><line x1=\"106.14\" y1=\"222.29\" x2=\"179.59\" y2=\"222.29\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"106.14\" y1=\"222.29\" x2=\"106.14\" y2=\"46\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"58\" y1=\"256\" x2=\"106.14\" y2=\"222.29\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"58\" y1=\"79.71\" x2=\"131.46\" y2=\"256\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"58\" y1=\"256\" x2=\"131.46\" y2=\"256\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"58\" y1=\"256\" x2=\"58\" y2=\"79.71\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"106.14\" y1=\"46\" x2=\"179.59\" y2=\"222.29\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"131.46\" y1=\"256\" x2=\"179.59\" y2=\"222.29\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"58\" y1=\"79.71\" x2=\"106.14\" y2=\"46\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><polyline points=\"69,256 69,245 58,245\" stroke=\"#333333\" stroke-width=\"1.3\" fill=\"none\"/><text x=\"94.73\" y=\"276\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">5 cm</text><text x=\"47\" y=\"172.85\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"end\">12 cm</text><text x=\"105.8\" y=\"166.7\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"start\">13 cm</text><text x=\"165.16\" y=\"251.38\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"start\">8 cm</text></svg></div>",
    "options": [
      {
        "text": "270 cm²",
        "correct": false,
        "feedback": "Added only one triangular end: \\(30 + 240 = 270\\), giving 270 cm². The prism has two triangular ends, so add \\(2 \\times 30 = 60\\)."
      },
      {
        "text": "196 cm²",
        "correct": false,
        "feedback": "Left out the rectangle on the 13 cm side: \\(60 + (5 + 12) \\times 8 = 60 + 136 = 196\\), giving 196 cm². There are three rectangles, one for each side of the triangle."
      },
      {
        "text": "240 cm²",
        "correct": false,
        "feedback": "Found only the three rectangles, \\((5 + 12 + 13) \\times 8 = 240\\), giving 240 cm². The two triangular ends, 60 in total, must be added."
      },
      {
        "text": "300 cm²",
        "correct": true,
        "feedback": "Correct. The two triangular ends have area \\(2 \\times (\\tfrac{1}{2} \\times 5 \\times 12) = 60\\). The three rectangles together are \\((5 + 12 + 13) \\times 8 = 240\\). The total is \\(60 + 240 = 300\\text{ cm}^2\\)."
      }
    ],
    "backward": "Areas of triangles and rectangles, Ch7.",
    "forward": "Later in this chapter you find a missing side of a prism using Pythagoras' theorem."
  },
  {
    "itemId": "r3",
    "order": 3,
    "cluster": "C3",
    "clusterName": "Surface area of cylinders",
    "question": "A closed cylinder has a radius of 4 cm and a height of 3 cm. Use \\(\\pi = 3.14\\). What is its total surface area?",
    "options": [
      {
        "text": "150.72 cm²",
        "correct": false,
        "feedback": "Used \\(\\pi \\times r \\times r \\times h = 3.14 \\times 16 \\times 3 = 150.72\\), giving 150.72 cm². That is the volume formula, not surface area."
      },
      {
        "text": "175.84 cm²",
        "correct": true,
        "feedback": "Correct. The curved surface is \\(2 \\times 3.14 \\times 4 \\times 3 = 75.36\\). The two circular ends are \\(2 \\times 3.14 \\times 4 \\times 4 = 100.48\\). The total is \\(75.36 + 100.48 = 175.84\\text{ cm}^2\\)."
      },
      {
        "text": "75.36 cm²",
        "correct": false,
        "feedback": "Found only the curved surface, \\(2 \\times 3.14 \\times 4 \\times 3 = 75.36\\), giving 75.36 cm². A closed cylinder also has two circular ends."
      },
      {
        "text": "100.48 cm²",
        "correct": false,
        "feedback": "Found only the two circular ends, \\(2 \\times 3.14 \\times 4 \\times 4 = 100.48\\), giving 100.48 cm². The curved surface must be added."
      }
    ],
    "backward": "Circumference and area of a circle, Ch7.",
    "forward": "Later in this chapter you use cylinders in problems that mix volume and area."
  },
  {
    "itemId": "r4",
    "order": 4,
    "cluster": "C4",
    "clusterName": "Surface area of pyramids",
    "question": "What is the total surface area of the square-based pyramid shown, including its base?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 394 240\" width=\"394\" height=\"240\" role=\"img\" aria-label=\"Square-based pyramid, base edge 12 cm, slant height 10 cm.\"><rect x=\"0\" y=\"0\" width=\"394\" height=\"240\" fill=\"#ffffff\"/><polygon points=\"58,189.67 235.36,189.67 183,46\" fill=\"#eef4fa\" stroke=\"none\"/><polygon points=\"235.36,189.67 308,138.81 183,46\" fill=\"#eef4fa\" stroke=\"none\"/><line x1=\"130.64\" y1=\"138.81\" x2=\"308\" y2=\"138.81\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"58\" y1=\"189.67\" x2=\"130.64\" y2=\"138.81\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"130.64\" y1=\"138.81\" x2=\"183\" y2=\"46\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"58\" y1=\"189.67\" x2=\"235.36\" y2=\"189.67\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"235.36\" y1=\"189.67\" x2=\"308\" y2=\"138.81\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"183\" y1=\"46\" x2=\"235.36\" y2=\"189.67\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"58\" y1=\"189.67\" x2=\"183\" y2=\"46\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"183\" y1=\"46\" x2=\"308\" y2=\"138.81\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"183\" y1=\"46\" x2=\"146.68\" y2=\"189.67\" stroke=\"#c0392b\" stroke-width=\"1.8\" stroke-dasharray=\"6 4\"/><text x=\"146.68\" y=\"209.67\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">12 cm</text><rect x=\"143.34\" y=\"109.84\" width=\"43\" height=\"18\" fill=\"#ffffff\"/><text x=\"164.84\" y=\"122.84\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">10 cm</text></svg></div>",
    "options": [
      {
        "text": "384 cm²",
        "correct": true,
        "feedback": "Correct. The base is \\(12 \\times 12 = 144\\). Each triangular face is \\(\\tfrac{1}{2} \\times 12 \\times 10 = 60\\), so the four faces are \\(4 \\times 60 = 240\\). The total is \\(144 + 240 = 384\\text{ cm}^2\\)."
      },
      {
        "text": "240 cm²",
        "correct": false,
        "feedback": "Found only the four triangular faces, \\(4 \\times 60 = 240\\), giving 240 cm². The square base, \\(12 \\times 12 = 144\\), is part of the total surface area."
      },
      {
        "text": "624 cm²",
        "correct": false,
        "feedback": "Forgot the ½ on each triangle: \\(4 \\times (12 \\times 10) = 480\\) and \\(480 + 144 = 624\\), giving 624 cm². Each triangle has area \\(\\tfrac{1}{2} \\times 12 \\times 10 = 60\\)."
      },
      {
        "text": "204 cm²",
        "correct": false,
        "feedback": "Added the base and just one triangle, \\(144 + 60 = 204\\), giving 204 cm². The pyramid has 4 triangular faces."
      }
    ],
    "backward": "Areas of compound shapes, Ch7.",
    "forward": "Later in this chapter you find the slant height yourself using Pythagoras' theorem."
  },
  {
    "itemId": "r5",
    "order": 5,
    "cluster": "C5",
    "clusterName": "Symmetry in 3D",
    "question": "How many planes of symmetry does the prism shown have?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 394 293\" width=\"394\" height=\"293\" role=\"img\" aria-label=\"Prism with equilateral triangle ends of side 4 cm and length 9 cm.\"><rect x=\"0\" y=\"0\" width=\"394\" height=\"293\" fill=\"#ffffff\"/><polygon points=\"123.05,129.95 188.1,242.63 58,242.63\" fill=\"#eef4fa\" stroke=\"none\"/><polygon points=\"188.1,242.63 123.05,129.95 242.95,46 308,158.67\" fill=\"#eef4fa\" stroke=\"none\"/><line x1=\"177.9\" y1=\"158.67\" x2=\"308\" y2=\"158.67\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"177.9\" y1=\"158.67\" x2=\"242.95\" y2=\"46\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"58\" y1=\"242.63\" x2=\"177.9\" y2=\"158.67\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"123.05\" y1=\"129.95\" x2=\"188.1\" y2=\"242.63\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"58\" y1=\"242.63\" x2=\"188.1\" y2=\"242.63\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"58\" y1=\"242.63\" x2=\"123.05\" y2=\"129.95\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"242.95\" y1=\"46\" x2=\"308\" y2=\"158.67\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"188.1\" y1=\"242.63\" x2=\"308\" y2=\"158.67\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"123.05\" y1=\"129.95\" x2=\"242.95\" y2=\"46\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"151.25\" y1=\"188.79\" x2=\"159.91\" y2=\"183.79\" stroke=\"#333333\" stroke-width=\"1.8\"/><line x1=\"94.86\" y1=\"188.79\" x2=\"86.2\" y2=\"183.79\" stroke=\"#333333\" stroke-width=\"1.8\"/><line x1=\"123.05\" y1=\"237.63\" x2=\"123.05\" y2=\"247.63\" stroke=\"#333333\" stroke-width=\"1.8\"/><text x=\"123.05\" y=\"262.63\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">4 cm</text><text x=\"257.69\" y=\"212.88\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"start\">9 cm</text></svg></div>",
    "options": [
      {
        "text": "4 planes",
        "correct": true,
        "feedback": "Correct. An equilateral triangle has 3 lines of symmetry, so 3 planes cut lengthways through a corner and the middle of the opposite side. One more plane cuts across the middle of the length: \\(3 + 1 = 4\\)."
      },
      {
        "text": "1 plane",
        "correct": false,
        "feedback": "Counted only the plane across the middle of the length, giving 1 plane. An equilateral triangle end has 3 lines of symmetry, so 3 more planes cut lengthways: \\(3 + 1 = 4\\)."
      },
      {
        "text": "2 planes",
        "correct": false,
        "feedback": "Gave 2 planes, which is the number for a prism with isosceles ends that are not equilateral: \\(1 + 1\\). An equilateral triangle has 3 lines of symmetry, so \\(3 + 1 = 4\\)."
      },
      {
        "text": "3 planes",
        "correct": false,
        "feedback": "Counted only the lengthways planes, giving 3 planes. The plane across the middle of the length is a mirror plane too, so there are \\(3 + 1 = 4\\)."
      }
    ],
    "backward": "Line symmetry of triangles, Ch13.",
    "forward": "Later in this chapter you meet orders of rotation for the same prism."
  },
  {
    "itemId": "r6",
    "order": 6,
    "cluster": "C6",
    "clusterName": "Mixed 3D problems",
    "question": "A cube has a volume of 27 cm³. What is its total surface area?",
    "options": [
      {
        "text": "36 cm²",
        "correct": false,
        "feedback": "Counted only 4 faces, \\(4 \\times 9 = 36\\), giving 36 cm². The top and the bottom are faces as well."
      },
      {
        "text": "54 cm²",
        "correct": true,
        "feedback": "Correct. The edge is the number that multiplies to 27: \\(3 \\times 3 \\times 3 = 27\\), so the edge is 3 cm. Each face has area \\(3 \\times 3 = 9\\), so the total is \\(6 \\times 9 = 54\\text{ cm}^2\\)."
      },
      {
        "text": "9 cm²",
        "correct": false,
        "feedback": "Found the area of one face, \\(3 \\times 3 = 9\\), giving 9 cm². A cube has 6 faces."
      },
      {
        "text": "27 cm²",
        "correct": false,
        "feedback": "Gave the volume, 27, as an area, giving 27 cm². Surface area comes from the faces: the edge is 3 cm, so \\(6 \\times 9 = 54\\)."
      }
    ],
    "backward": "Indices, Ch1.",
    "forward": "Later in this chapter you combine volume and surface area in longer problems."
  },
  {
    "itemId": "r7",
    "order": 7,
    "cluster": "C1",
    "clusterName": "Volume of prisms and cylinders",
    "question": "A fish tank is a cuboid 80 cm long, 50 cm wide and 40 cm high. How many litres of water does it hold when full?",
    "options": [
      {
        "text": "160 000 litres",
        "correct": false,
        "feedback": "Found the volume, 160 000, and gave it as 160 000 litres. That volume is in cm³, and 1 litre is 1000 cm³."
      },
      {
        "text": "160 litres",
        "correct": true,
        "feedback": "Correct. The volume is \\(80 \\times 50 \\times 40 = 160\\,000\\text{ cm}^3\\). One litre is 1000 cm³, so the tank holds \\(160\\,000 \\div 1000 = 160\\) litres."
      },
      {
        "text": "16 000 litres",
        "correct": false,
        "feedback": "Gave 16 000 litres, which would come from dividing by 10. One litre is 1000 cm³, so \\(160\\,000 \\div 1000 = 160\\)."
      },
      {
        "text": "1600 litres",
        "correct": false,
        "feedback": "Gave 1600 litres, which would come from dividing by 100. One litre is 1000 cm³, so \\(160\\,000 \\div 1000 = 160\\)."
      }
    ],
    "backward": "Large and small units, Ch7.",
    "forward": "Later in this chapter you find missing lengths from capacities."
  },
  {
    "itemId": "r8",
    "order": 8,
    "cluster": "C2",
    "clusterName": "Surface area of cuboids and triangular prisms",
    "question": "An open-topped box has no lid. It is a cuboid 8 cm long, 5 cm wide and 3 cm high. What is the total area of its outside surface?",
    "options": [
      {
        "text": "78 cm²",
        "correct": false,
        "feedback": "Found only the four sides, \\(48 + 30 = 78\\), giving 78 cm². The base, \\(8 \\times 5 = 40\\), is part of the outside surface."
      },
      {
        "text": "120 cm²",
        "correct": false,
        "feedback": "Found the volume, \\(8 \\times 5 \\times 3 = 120\\), giving 120 cm². Surface area is the total area of the faces."
      },
      {
        "text": "158 cm²",
        "correct": false,
        "feedback": "Included a lid as well: \\(2 \\times 40 + 48 + 30 = 158\\), giving 158 cm². The box is open, so there is only the base, 40, and no top."
      },
      {
        "text": "118 cm²",
        "correct": true,
        "feedback": "Correct. The base is \\(8 \\times 5 = 40\\). The two long sides are \\(2 \\times (8 \\times 3) = 48\\), and the two short sides are \\(2 \\times (5 \\times 3) = 30\\). With no lid, the total is \\(40 + 48 + 30 = 118\\text{ cm}^2\\)."
      }
    ],
    "backward": "Areas of rectangles, Ch7.",
    "forward": "Later in this chapter you find the surface area of a cylinder with no lid."
  },
  {
    "itemId": "r9",
    "order": 9,
    "cluster": "C3",
    "clusterName": "Surface area of cylinders",
    "question": "A cylinder has a diameter of 6 cm and a height of 5 cm. Use \\(\\pi = 3.14\\). What is the area of its curved surface?",
    "options": [
      {
        "text": "141.3 cm²",
        "correct": false,
        "feedback": "Used \\(\\pi \\times r \\times r \\times h = 3.14 \\times 9 \\times 5 = 141.3\\), giving 141.3 cm². That is the volume formula, not a curved surface area."
      },
      {
        "text": "188.4 cm²",
        "correct": false,
        "feedback": "Used the diameter as the radius: \\(2 \\times 3.14 \\times 6 \\times 5 = 188.4\\), giving 188.4 cm². The radius is half of the diameter, 3 cm."
      },
      {
        "text": "122.46 cm²",
        "correct": false,
        "feedback": "Added one circular end, \\(94.2 + 28.26 = 122.46\\), giving 122.46 cm². The question asks only for the curved surface."
      },
      {
        "text": "94.2 cm²",
        "correct": true,
        "feedback": "Correct. The radius is half of 6, so \\(r = 3\\text{ cm}\\). The curved surface is \\(2 \\times 3.14 \\times 3 \\times 5 = 94.2\\text{ cm}^2\\)."
      }
    ],
    "backward": "Circumference of a circle, Ch7.",
    "forward": "Later in this chapter you combine curved and circular areas in longer problems."
  },
  {
    "itemId": "r10",
    "order": 10,
    "cluster": "C4",
    "clusterName": "Surface area of pyramids",
    "question": "A square-based pyramid has a base edge of 10 cm and a slant height of 8 cm. What is the total area of its four triangular faces?",
    "options": [
      {
        "text": "320 cm²",
        "correct": false,
        "feedback": "Forgot the ½ on each triangle: \\(4 \\times (10 \\times 8) = 320\\), giving 320 cm². Each triangle has area \\(\\tfrac{1}{2} \\times 10 \\times 8 = 40\\)."
      },
      {
        "text": "40 cm²",
        "correct": false,
        "feedback": "Found the area of one face, \\(\\tfrac{1}{2} \\times 10 \\times 8 = 40\\), giving 40 cm². There are 4 triangular faces."
      },
      {
        "text": "160 cm²",
        "correct": true,
        "feedback": "Correct. One face is \\(\\tfrac{1}{2} \\times 10 \\times 8 = 40\\text{ cm}^2\\). There are four faces, so \\(4 \\times 40 = 160\\text{ cm}^2\\)."
      },
      {
        "text": "260 cm²",
        "correct": false,
        "feedback": "Added the base as well: \\(160 + 100 = 260\\), giving 260 cm². The question asks only for the four triangular faces."
      }
    ],
    "backward": "Areas of triangles, Ch7.",
    "forward": "Later in this chapter you find the slant height using Pythagoras' theorem."
  },
  {
    "itemId": "r11",
    "order": 11,
    "cluster": "C5",
    "clusterName": "Symmetry in 3D",
    "question": "A cuboid has three different edge lengths: 8 cm, 5 cm and 3 cm. What is the order of rotational symmetry about the axis through the centres of its two largest faces, the 8 cm by 5 cm faces?",
    "options": [
      {
        "text": "order 2",
        "correct": true,
        "feedback": "Correct. A half turn (180°) about this axis fits the cuboid onto itself, because the opposite faces match. A quarter turn would put the 8 cm side where a 5 cm side was, so it does not fit. The cuboid fits 2 times in a full turn: order 2."
      },
      {
        "text": "order 1",
        "correct": false,
        "feedback": "Gave order 1, meaning only a full turn fits. A half turn (180°) about this axis also fits the cuboid onto itself, so the order is 2."
      },
      {
        "text": "order 3",
        "correct": false,
        "feedback": "Counted the 3 different edge lengths, giving order 3. The order is the number of times the shape fits onto itself in one full turn, which is 2 here."
      },
      {
        "text": "order 4",
        "correct": false,
        "feedback": "Gave order 4, which needs a quarter turn to fit. A quarter turn would put the 8 cm side where a 5 cm side was, so it does not fit. Only the half turn works."
      }
    ],
    "backward": "Rotation, Ch13.",
    "forward": "Later in this chapter you meet shapes with higher orders of rotation."
  },
  {
    "itemId": "r12",
    "order": 12,
    "cluster": "C6",
    "clusterName": "Mixed 3D problems",
    "question": "A cylinder has a radius of 5 cm and a volume of 392.5 cm³. Use \\(\\pi = 3.14\\). What is the area of its curved surface?",
    "options": [
      {
        "text": "785 cm²",
        "correct": false,
        "feedback": "Divided 392.5 by \\(3.14 \\times 5 = 15.7\\) instead of \\(3.14 \\times 5 \\times 5 = 78.5\\), so the height came out as 25, and \\(2 \\times 3.14 \\times 5 \\times 25 = 785\\), giving 785 cm². The area of the circular end needs r squared."
      },
      {
        "text": "235.5 cm²",
        "correct": false,
        "feedback": "Added one circular end, \\(157 + 78.5 = 235.5\\), giving 235.5 cm². The question asks only for the curved surface."
      },
      {
        "text": "157 cm²",
        "correct": true,
        "feedback": "Correct. The area of the circular end is \\(3.14 \\times 5 \\times 5 = 78.5\\), so the height is \\(392.5 \\div 78.5 = 5\\text{ cm}\\). The curved surface is \\(2 \\times 3.14 \\times 5 \\times 5 = 157\\text{ cm}^2\\)."
      },
      {
        "text": "314 cm²",
        "correct": false,
        "feedback": "Added both circular ends, \\(157 + 157 = 314\\), giving 314 cm². The question asks only for the curved surface."
      }
    ],
    "backward": "Solving equations, Ch4.",
    "forward": "Later in this chapter you find missing lengths from volumes in longer problems."
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
  title: "Volume, Surface Area and Symmetry — Core Fluency",
  subtitle: "Grade 8 · Level 1 · Core Fluency",
  description: "Volume of prisms and cylinders, surface area of cuboids, prisms, cylinders and pyramids, and symmetry in 3D — warm-up, diagnostic, and spaced recheck for core fluency.",
  clusterNames: CLUSTER_NAMES,
  gateReviewHTML: "<p><strong>Warm-up done.</strong> Next comes the diagnostic. It is not a test and it is not timed, so there is no prize for speed. It is a check on how secure your skills already are with: finding the volume of prisms and cylinders, the surface area of cuboids, prisms, cylinders and pyramids, and the symmetry of 3D shapes. For each question, ask yourself first: which faces or which formula do I need, and what units will the answer have? Then work it out before you choose. If a question feels awkward, that tells us exactly where to look next, so it is useful, not a failure.</p><p>You will meet all six topics, mixed together. Take your time.</p>",
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

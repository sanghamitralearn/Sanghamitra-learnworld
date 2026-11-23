// Volume, Surface Area and Symmetry — Grade 8, Level 3 (Problem-Solving & Synthesis).
// Warm-up, diagnostic and spaced recheck items.
// Run with: node seed/mathSeedCh14VolumeSurfaceAreaSymmetryL3.js
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-8";
const GRADE_LABEL = "Grade 8";
const CHAPTER_SLUG = "ch-14-volume-surface-area-symmetry";
const CHAPTER_NAME = "Volume, Surface Area and Symmetry";
const LEVEL = 3;

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
    "question": "A fish tank is a cuboid 80 cm long, 40 cm wide and 50 cm high. It is three-quarters full of water. How many litres of water are in it?",
    "options": [
      {
        "text": "160 litres",
        "correct": false,
        "feedback": "Gave the capacity of the full tank, 160 litres. The tank is only three-quarters full, so find ¾ of 160."
      },
      {
        "text": "200 litres",
        "correct": false,
        "feedback": "Added a quarter to the full capacity, \\(160 + 40 = 200\\), giving 200 litres. The tank is not more than full; three-quarters of it is \\(160 \\times \\frac{3}{4} = 120\\)."
      },
      {
        "text": "213.3 litres",
        "correct": false,
        "feedback": "Divided by ¾ instead of multiplying: \\(160 \\div 0.75\\) is about 213.3, giving 213.3 litres. A part of the full tank is smaller than the full tank, so multiply by ¾."
      },
      {
        "text": "120 litres",
        "correct": true,
        "feedback": "Correct. The full volume is \\(80 \\times 40 \\times 50 = 160\\,000\\text{ cm}^3\\), which is 160 litres. Three-quarters of that is \\(160 \\times \\frac{3}{4} = 120\\) litres."
      }
    ],
    "retryHint": "Find the capacity of the full tank in litres first, then take three-quarters of it.",
    "backward": "Large and small units, Ch7, and fractions of an amount, Ch8.",
    "forward": "Later in this chapter you find depths from volumes."
  },
  {
    "itemId": "w2",
    "order": 2,
    "cluster": "C6",
    "clusterName": "Mixed 3D problems",
    "question": "The diagram shows a square-based pyramid sitting on top of a cuboid, with its base exactly covering the cuboid's top face. What is the total surface area of the whole solid?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 272 306\" width=\"272\" height=\"306\" role=\"img\" aria-label=\"Cuboid with a square top of side 6 cm and height 9 cm with a square-based pyramid of vertical height 4 cm on top.\"><rect x=\"0\" y=\"0\" width=\"272\" height=\"306\" fill=\"#ffffff\"/><polygon points=\"58,119.64 148.91,119.64 148.91,256 58,256\" fill=\"#eef4fa\" stroke=\"none\"/><polygon points=\"148.91,256 148.91,119.64 186.14,93.57 186.14,229.93\" fill=\"#eef4fa\" stroke=\"none\"/><polygon points=\"58,119.64 148.91,119.64 122.07,46\" fill=\"#eef4fa\" stroke=\"none\"/><polygon points=\"148.91,119.64 186.14,93.57 122.07,46\" fill=\"#eef4fa\" stroke=\"none\"/><line x1=\"95.23\" y1=\"229.93\" x2=\"186.14\" y2=\"229.93\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"95.23\" y1=\"93.57\" x2=\"186.14\" y2=\"93.57\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"95.23\" y1=\"229.93\" x2=\"95.23\" y2=\"93.57\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"58\" y1=\"256\" x2=\"95.23\" y2=\"229.93\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"58\" y1=\"119.64\" x2=\"95.23\" y2=\"93.57\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"95.23\" y1=\"93.57\" x2=\"186.14\" y2=\"93.57\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"58\" y1=\"119.64\" x2=\"95.23\" y2=\"93.57\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"95.23\" y1=\"93.57\" x2=\"122.07\" y2=\"46\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"58\" y1=\"119.64\" x2=\"148.91\" y2=\"119.64\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"148.91\" y1=\"256\" x2=\"148.91\" y2=\"119.64\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"58\" y1=\"256\" x2=\"148.91\" y2=\"256\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"58\" y1=\"256\" x2=\"58\" y2=\"119.64\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"186.14\" y1=\"229.93\" x2=\"186.14\" y2=\"93.57\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"148.91\" y1=\"256\" x2=\"186.14\" y2=\"229.93\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"148.91\" y1=\"119.64\" x2=\"186.14\" y2=\"93.57\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"58\" y1=\"119.64\" x2=\"148.91\" y2=\"119.64\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"148.91\" y1=\"119.64\" x2=\"186.14\" y2=\"93.57\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"122.07\" y1=\"46\" x2=\"148.91\" y2=\"119.64\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"58\" y1=\"119.64\" x2=\"122.07\" y2=\"46\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"122.07\" y1=\"46\" x2=\"186.14\" y2=\"93.57\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"122.07\" y1=\"46\" x2=\"122.07\" y2=\"106.6\" stroke=\"#c0392b\" stroke-width=\"1.8\" stroke-dasharray=\"6 4\"/><line x1=\"126.07\" y1=\"46\" x2=\"216.14\" y2=\"46\" stroke=\"#888888\" stroke-width=\"1\"/><line x1=\"126.07\" y1=\"106.6\" x2=\"216.14\" y2=\"106.6\" stroke=\"#888888\" stroke-width=\"1\"/><line x1=\"212.14\" y1=\"46\" x2=\"212.14\" y2=\"106.6\" stroke=\"#333333\" stroke-width=\"1.5\"/><polyline points=\"208.14,54 212.14,46 216.14,54\" stroke=\"#333333\" stroke-width=\"1.5\" fill=\"none\"/><polyline points=\"208.14,98.6 212.14,106.6 216.14,98.6\" stroke=\"#333333\" stroke-width=\"1.5\" fill=\"none\"/><text x=\"103.45\" y=\"276\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">6 cm</text><text x=\"47\" y=\"192.82\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"end\">9 cm</text><text x=\"220.14\" y=\"81.3\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"start\">4 cm</text></svg></div>",
    "options": [
      {
        "text": "312 cm²",
        "correct": true,
        "feedback": "Correct. The top of the cuboid is covered, so its surface is the base \\(6 \\times 6 = 36\\) and four sides \\(4 \\times (6 \\times 9) = 216\\), which is 252. For the pyramid, half the base is 3 and \\(3 \\times 3 + 4 \\times 4 = 25\\), so the slant height is 5 cm. The four faces are \\(4 \\times (\\tfrac{1}{2} \\times 6 \\times 5 = 15) = 60\\). The total is \\(252 + 60 = 312\\text{ cm}^2\\)."
      },
      {
        "text": "300 cm²",
        "correct": false,
        "feedback": "Used the vertical height, 4, as the height of each triangle: \\(252 + 4 \\times (\\tfrac{1}{2} \\times 6 \\times 4 = 12) = 300\\), giving 300 cm². The height of a face is the slant height, 5 cm."
      },
      {
        "text": "372 cm²",
        "correct": false,
        "feedback": "Forgot the ½ on each triangle: \\(252 + 4 \\times (6 \\times 5 = 30) = 372\\), giving 372 cm². Each triangle has area \\(\\tfrac{1}{2} \\times 6 \\times 5 = 15\\)."
      },
      {
        "text": "348 cm²",
        "correct": false,
        "feedback": "Counted the top of the cuboid as well: \\(252 + 36 + 60 = 348\\), giving 348 cm². The pyramid sits on the top, so that face is covered."
      }
    ],
    "retryHint": "Decide which faces are visible. Then find the slant height of the pyramid with Pythagoras before you work out the triangles.",
    "backward": "Pythagoras' theorem, Ch5.",
    "forward": "Later in this chapter you meet other joined solids."
  },
  {
    "itemId": "w3",
    "order": 3,
    "cluster": "C2",
    "clusterName": "Surface area of cuboids and triangular prisms",
    "question": "A box is a cuboid 10 cm long, 6 cm wide and 4 cm high. It is completely covered with wrapping paper. The paper costs 0.5 cent per cm². What is the cost of the paper?",
    "options": [
      {
        "text": "60 cents",
        "correct": false,
        "feedback": "Found only the top and bottom faces, \\(2 \\times (10 \\times 6) \\times 0.5 = 60\\), giving 60 cents. The box has 6 faces, all covered, so use the whole surface area, 248 cm²."
      },
      {
        "text": "120 cents",
        "correct": false,
        "feedback": "Used the volume, \\(10 \\times 6 \\times 4 = 240\\), giving \\(240 \\times 0.5 = 120\\) cents. Paper covers the surface, so use the surface area, 248 cm²."
      },
      {
        "text": "124 cents",
        "correct": true,
        "feedback": "Correct. The surface area is \\(2 \\times (10 \\times 6) + 2 \\times (10 \\times 4) + 2 \\times (6 \\times 4) = 120 + 80 + 48 = 248\\text{ cm}^2\\). At 0.5 cent per cm², the cost is \\(248 \\times 0.5 = 124\\) cents."
      },
      {
        "text": "62 cents",
        "correct": false,
        "feedback": "Found half of the cost, \\(248 \\times 0.5 \\div 2 = 62\\), giving 62 cents. The box has 3 different pairs of faces, and every face is covered, so use the whole surface area, 248."
      }
    ],
    "retryHint": "Find the total area of all six faces first. Then multiply by the price for each cm².",
    "backward": "Multiplying decimals, Ch3.",
    "forward": "Later in this chapter you cost the covering of cylinders and pyramids."
  },
  {
    "itemId": "w4",
    "order": 4,
    "cluster": "C6",
    "clusterName": "Mixed 3D problems",
    "question": "The diagram shows a prism whose ends are isosceles triangles. It is cut in two identical pieces along its lengthways plane of symmetry. What is the volume of each piece?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 394 266\" width=\"394\" height=\"266\" role=\"img\" aria-label=\"Triangular prism with isosceles ends, base 6 cm, height 4 cm, length 9 cm, with a dashed plane through the apex edge and the middle of the base.\"><rect x=\"0\" y=\"0\" width=\"394\" height=\"266\" fill=\"#ffffff\"/><polygon points=\"135.43,112.62 212.86,215.86 58,215.86\" fill=\"#eef4fa\" stroke=\"none\"/><polygon points=\"212.86,215.86 135.43,112.62 230.57,46 308,149.24\" fill=\"#eef4fa\" stroke=\"none\"/><polygon points=\"135.43,215.86 230.57,149.24 230.57,46 135.43,112.62\" fill=\"#c0392b\" fill-opacity=\"0.16\" stroke=\"#c0392b\" stroke-width=\"1.8\" stroke-dasharray=\"6 4\" stroke-linejoin=\"round\"/><line x1=\"153.14\" y1=\"149.24\" x2=\"308\" y2=\"149.24\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"153.14\" y1=\"149.24\" x2=\"230.57\" y2=\"46\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"58\" y1=\"215.86\" x2=\"153.14\" y2=\"149.24\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"135.43\" y1=\"112.62\" x2=\"212.86\" y2=\"215.86\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"58\" y1=\"215.86\" x2=\"212.86\" y2=\"215.86\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"58\" y1=\"215.86\" x2=\"135.43\" y2=\"112.62\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"230.57\" y1=\"46\" x2=\"308\" y2=\"149.24\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"212.86\" y1=\"215.86\" x2=\"308\" y2=\"149.24\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"135.43\" y1=\"112.62\" x2=\"230.57\" y2=\"46\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"135.43\" y1=\"112.62\" x2=\"135.43\" y2=\"215.86\" stroke=\"#c0392b\" stroke-width=\"1.8\" stroke-dasharray=\"6 4\"/><text x=\"135.43\" y=\"235.86\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">6 cm</text><text x=\"270.07\" y=\"194.78\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"start\">9 cm</text><rect x=\"117.63\" y=\"156.24\" width=\"35.6\" height=\"18\" fill=\"#ffffff\"/><text x=\"135.43\" y=\"169.24\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">4 cm</text></svg></div>",
    "options": [
      {
        "text": "54 cm³",
        "correct": true,
        "feedback": "Correct. The volume of the whole prism is \\(\\tfrac{1}{2} \\times 6 \\times 4 = 12\\) for the end, then \\(12 \\times 9 = 108\\text{ cm}^3\\). The plane of symmetry cuts it into two identical pieces, so each is \\(108 \\div 2 = 54\\text{ cm}^3\\)."
      },
      {
        "text": "108 cm³",
        "correct": false,
        "feedback": "Found the volume of the whole prism, 108, giving 108 cm³. The cut makes two identical pieces, so each is half."
      },
      {
        "text": "27 cm³",
        "correct": false,
        "feedback": "Halved twice, \\(108 \\div 4 = 27\\), giving 27 cm³. One cut makes two pieces, so divide by 2 only."
      },
      {
        "text": "12 cm³",
        "correct": false,
        "feedback": "Found the area of the triangular end, \\(\\tfrac{1}{2} \\times 6 \\times 4 = 12\\), and gave it as 12 cm³. Multiply by the length, 9, and then halve it for one piece."
      }
    ],
    "retryHint": "Find the volume of the whole prism first. A plane of symmetry splits the solid into two identical halves.",
    "backward": "Reflection and line symmetry, Ch13, and area of a triangle, Ch7.",
    "forward": "Later in this chapter you find surface areas of pieces cut by planes of symmetry."
  },
  {
    "itemId": "w5",
    "order": 5,
    "cluster": "C3",
    "clusterName": "Surface area of cylinders",
    "question": "A cylinder has a radius of 5 cm and a height of 12 cm. Its curved surface is cut and rolled out flat to make a rectangle. Use \\(\\pi = 3.14\\). What is the perimeter of the rectangle?",
    "options": [
      {
        "text": "55.4 cm",
        "correct": false,
        "feedback": "Used \\(\\pi \\times r = 15.7\\) as the length instead of \\(2 \\times \\pi \\times r\\), so \\(2 \\times (15.7 + 12) = 55.4\\), giving 55.4 cm. The length of the rectangle is the whole circumference, 31.4 cm."
      },
      {
        "text": "376.8 cm",
        "correct": false,
        "feedback": "Found the area of the rectangle, \\(31.4 \\times 12 = 376.8\\), giving 376.8 cm. The question asks for the perimeter, the distance round the edge."
      },
      {
        "text": "43.4 cm",
        "correct": false,
        "feedback": "Added only one length and one width, \\(31.4 + 12 = 43.4\\), giving 43.4 cm. The perimeter goes all the way round, so double it."
      },
      {
        "text": "86.8 cm",
        "correct": true,
        "feedback": "Correct. The rectangle is as long as the circumference, \\(2 \\times \\pi \\times r = 2 \\times 3.14 \\times 5 = 31.4\\text{ cm}\\), and as wide as the height, 12 cm. Its perimeter is \\(2 \\times (31.4 + 12) = 86.8\\text{ cm}\\)."
      }
    ],
    "retryHint": "The rectangle's length is the circumference of the circular end and its width is the height.",
    "backward": "Circumference of a circle and perimeter, Ch7.",
    "forward": "Later in this chapter you use the same rectangle to find the curved surface area."
  },
  {
    "itemId": "w6",
    "order": 6,
    "cluster": "C6",
    "clusterName": "Mixed 3D problems",
    "question": "A square-based pyramid has a base edge of 6 cm and a slant height of 5 cm. A cube has the same total surface area as the pyramid. What is the volume of the cube?",
    "options": [
      {
        "text": "216 cm³",
        "correct": false,
        "feedback": "Used the pyramid's base edge, 6, as the edge of the cube: \\(6 \\times 6 \\times 6 = 216\\), giving 216 cm³. The cube's edge comes from its surface area, 96 cm², which gives 4 cm."
      },
      {
        "text": "64 cm³",
        "correct": true,
        "feedback": "Correct. The pyramid has base \\(6 \\times 6 = 36\\) and four faces \\(4 \\times (\\tfrac{1}{2} \\times 6 \\times 5 = 15) = 60\\), so its surface area is 96 cm². A cube has 6 faces, so each face is \\(96 \\div 6 = 16\\text{ cm}^2\\), and the edge is 4 cm because \\(4 \\times 4 = 16\\). The volume is \\(4 \\times 4 \\times 4 = 64\\text{ cm}^3\\)."
      },
      {
        "text": "4 cm³",
        "correct": false,
        "feedback": "Stopped at the edge, 4, giving 4 cm³. The edge is a length; cube it to get the volume."
      },
      {
        "text": "16 cm³",
        "correct": false,
        "feedback": "Found the area of one face, \\(96 \\div 6 = 16\\), giving 16 cm³. That is an area. Cube the edge, 4, to get the volume."
      }
    ],
    "retryHint": "Find the total surface area of the pyramid first. Then find the edge of the cube from it, remembering a cube has 6 equal faces.",
    "backward": "Indices and square roots, Ch1.",
    "forward": "Later in this chapter you compare the surface areas of different solids."
  },
  {
    "itemId": "w7",
    "order": 7,
    "cluster": "C1",
    "clusterName": "Volume of prisms and cylinders",
    "question": "The diagram shows a cuboid with a cylindrical hole drilled right through its height. Use \\(\\pi = 3.14\\). What is the volume of the solid that is left?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 394 233\" width=\"394\" height=\"233\" role=\"img\" aria-label=\"Cuboid 10 cm by 8 cm by 5 cm with a cylindrical hole of radius 2 cm through its height, centred on the top face.\"><rect x=\"0\" y=\"0\" width=\"394\" height=\"233\" fill=\"#ffffff\"/><polygon points=\"58,89.2 246.3,89.2 246.3,183.35 58,183.35\" fill=\"#eef4fa\" stroke=\"none\"/><polygon points=\"246.3,183.35 246.3,89.2 308,46 308,140.15\" fill=\"#eef4fa\" stroke=\"none\"/><polygon points=\"246.3,89.2 58,89.2 119.7,46 308,46\" fill=\"#eef4fa\" stroke=\"none\"/><line x1=\"119.7\" y1=\"140.15\" x2=\"308\" y2=\"140.15\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"119.7\" y1=\"140.15\" x2=\"119.7\" y2=\"46\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"58\" y1=\"183.35\" x2=\"119.7\" y2=\"140.15\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"58\" y1=\"89.2\" x2=\"246.3\" y2=\"89.2\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"246.3\" y1=\"183.35\" x2=\"246.3\" y2=\"89.2\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"58\" y1=\"183.35\" x2=\"246.3\" y2=\"183.35\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"58\" y1=\"183.35\" x2=\"58\" y2=\"89.2\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"308\" y1=\"140.15\" x2=\"308\" y2=\"46\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"119.7\" y1=\"46\" x2=\"308\" y2=\"46\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"246.3\" y1=\"183.35\" x2=\"308\" y2=\"140.15\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"246.3\" y1=\"89.2\" x2=\"308\" y2=\"46\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"58\" y1=\"89.2\" x2=\"119.7\" y2=\"46\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><path d=\"M 220.66 67.6 L 222.35 66.19 L 223.37 64.81 L 223.7 63.47 L 223.33 62.2 L 222.27 61.03 L 220.54 59.96 L 218.16 59.03 L 215.19 58.25 L 211.66 57.62 L 207.65 57.17 L 203.21 56.89 L 198.42 56.8 L 193.38 56.89 L 188.15 57.17 L 182.84 57.62 L 177.53 58.25 L 172.31 59.03 L 167.28 59.96 L 162.51 61.03 L 158.1 62.2 L 154.11 63.47 L 150.62 64.81 L 147.68 66.19 L 145.34 67.6 L 143.65 69.01 L 142.63 70.4 L 142.3 71.73 L 142.67 73 L 143.73 74.18 L 145.46 75.24 L 147.84 76.17 L 150.81 76.95 L 154.34 77.58 L 158.35 78.03 L 162.79 78.31 L 167.58 78.4 L 172.62 78.31 L 177.85 78.03 L 183.16 77.58 L 188.47 76.95 L 193.69 76.17 L 198.72 75.24 L 203.49 74.18 L 207.9 73 L 211.89 71.73 L 215.38 70.4 L 218.32 69.01 Z\" fill=\"none\" stroke=\"#333333\" stroke-width=\"2\"/><path d=\"M 220.66 161.75 L 222.35 160.34 L 223.37 158.96 L 223.7 157.62 L 223.33 156.35 L 222.27 155.18 L 220.54 154.11 L 218.16 153.18 L 215.19 152.4 L 211.66 151.77 L 207.65 151.32 L 203.21 151.04 L 198.42 150.95 L 193.38 151.04 L 188.15 151.32 L 182.84 151.77 L 177.53 152.4 L 172.31 153.18 L 167.28 154.11 L 162.51 155.18 L 158.1 156.35 L 154.11 157.62 L 150.62 158.96 L 147.68 160.34 L 145.34 161.75 L 143.65 163.16 L 142.63 164.55 L 142.3 165.88 L 142.67 167.15 L 143.73 168.33 L 145.46 169.39 L 147.84 170.32 L 150.81 171.11 L 154.34 171.73 L 158.35 172.18 L 162.79 172.46 L 167.58 172.55 L 172.62 172.46 L 177.85 172.18 L 183.16 171.73 L 188.47 171.11 L 193.69 170.32 L 198.72 169.39 L 203.49 168.33 L 207.9 167.15 L 211.89 165.88 L 215.38 164.55 L 218.32 163.16 Z\" fill=\"none\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><path d=\"M 142.3 71.73 L 142.3 165.88\" fill=\"none\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><path d=\"M 223.7 63.47 L 223.7 157.62\" fill=\"none\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"183\" y1=\"67.6\" x2=\"220.66\" y2=\"67.6\" stroke=\"#333333\" stroke-width=\"1.8\"/><text x=\"228.32\" y=\"69.15\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"start\">radius 2 cm</text><text x=\"152.15\" y=\"203.35\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">10 cm</text><text x=\"286.79\" y=\"173.98\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"start\">8 cm</text><text x=\"47\" y=\"141.28\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"end\">5 cm</text></svg></div>",
    "options": [
      {
        "text": "462.8 cm³",
        "correct": false,
        "feedback": "Added the hole instead of removing it: \\(400 + 62.8 = 462.8\\), giving 462.8 cm³. The hole takes material away."
      },
      {
        "text": "62.8 cm³",
        "correct": false,
        "feedback": "Found only the volume of the hole, \\(3.14 \\times 2 \\times 2 \\times 5 = 62.8\\), giving 62.8 cm³. The question asks for the solid that is left."
      },
      {
        "text": "337.2 cm³",
        "correct": true,
        "feedback": "Correct. The cuboid has volume \\(10 \\times 8 \\times 5 = 400\\text{ cm}^3\\). The hole is a cylinder of volume \\(3.14 \\times 2 \\times 2 \\times 5 = 62.8\\text{ cm}^3\\). The solid left has volume \\(400 - 62.8 = 337.2\\text{ cm}^3\\)."
      },
      {
        "text": "148.8 cm³",
        "correct": false,
        "feedback": "Used the diameter, 4, as the radius of the hole: \\(3.14 \\times 4 \\times 4 \\times 5 = 251.2\\), and \\(400 - 251.2 = 148.8\\), giving 148.8 cm³. The radius is 2 cm."
      }
    ],
    "retryHint": "Find the volume of the whole cuboid and the volume of the hole separately, then decide whether to add or subtract.",
    "backward": "Area of a circle, Ch7.",
    "forward": "Later in this chapter you find surface areas of solids with holes."
  },
  {
    "itemId": "w8",
    "order": 8,
    "cluster": "C4",
    "clusterName": "Surface area of pyramids",
    "question": "The diagram shows a tent that is a square-based pyramid with no floor. What area of canvas is needed to make the four sloping sides?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 394 188\" width=\"394\" height=\"188\" role=\"img\" aria-label=\"Square-based pyramid, base edge 4 m, vertical height 1.5 m.\"><rect x=\"0\" y=\"0\" width=\"394\" height=\"188\" fill=\"#ffffff\"/><polygon points=\"58,137.94 235.36,137.94 183,46\" fill=\"#eef4fa\" stroke=\"none\"/><polygon points=\"235.36,137.94 308,87.08 183,46\" fill=\"#eef4fa\" stroke=\"none\"/><line x1=\"130.64\" y1=\"87.08\" x2=\"308\" y2=\"87.08\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"58\" y1=\"137.94\" x2=\"130.64\" y2=\"87.08\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"130.64\" y1=\"87.08\" x2=\"183\" y2=\"46\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"58\" y1=\"137.94\" x2=\"235.36\" y2=\"137.94\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"235.36\" y1=\"137.94\" x2=\"308\" y2=\"87.08\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"183\" y1=\"46\" x2=\"235.36\" y2=\"137.94\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"58\" y1=\"137.94\" x2=\"183\" y2=\"46\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"183\" y1=\"46\" x2=\"308\" y2=\"87.08\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"183\" y1=\"46\" x2=\"183\" y2=\"112.51\" stroke=\"#c0392b\" stroke-width=\"1.8\" stroke-dasharray=\"6 4\"/><line x1=\"187\" y1=\"46\" x2=\"338\" y2=\"46\" stroke=\"#888888\" stroke-width=\"1\"/><line x1=\"187\" y1=\"112.51\" x2=\"338\" y2=\"112.51\" stroke=\"#888888\" stroke-width=\"1\"/><line x1=\"334\" y1=\"46\" x2=\"334\" y2=\"112.51\" stroke=\"#333333\" stroke-width=\"1.5\"/><polyline points=\"330,54 334,46 338,54\" stroke=\"#333333\" stroke-width=\"1.5\" fill=\"none\"/><polyline points=\"330,104.51 334,112.51 338,104.51\" stroke=\"#333333\" stroke-width=\"1.5\" fill=\"none\"/><text x=\"146.68\" y=\"157.94\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">4 m</text><text x=\"342\" y=\"84.25\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"start\">1.5 m</text></svg></div>",
    "options": [
      {
        "text": "36 m²",
        "correct": false,
        "feedback": "Added the floor, \\(20 + 16 = 36\\), giving 36 m². The tent has no floor."
      },
      {
        "text": "20 m²",
        "correct": true,
        "feedback": "Correct. Half the base edge is 2 m, and \\(2 \\times 2 + 1.5 \\times 1.5 = 4 + 2.25 = 6.25\\), so the slant height is 2.5 m. Each side is \\(\\tfrac{1}{2} \\times 4 \\times 2.5 = 5\\text{ m}^2\\), so four sides are \\(4 \\times 5 = 20\\text{ m}^2\\)."
      },
      {
        "text": "40 m²",
        "correct": false,
        "feedback": "Forgot the ½ on each side: \\(4 \\times (4 \\times 2.5) = 40\\), giving 40 m². Each side is a triangle, \\(\\tfrac{1}{2} \\times 4 \\times 2.5\\)."
      },
      {
        "text": "12 m²",
        "correct": false,
        "feedback": "Used the vertical height as the height of each side: \\(4 \\times (\\tfrac{1}{2} \\times 4 \\times 1.5) = 12\\), giving 12 m². The height of a sloping side is the slant height, 2.5 m."
      }
    ],
    "retryHint": "The tent has four triangular sides and no floor. Find the slant height of the sides with Pythagoras first.",
    "backward": "Pythagoras' theorem, Ch5.",
    "forward": "Later in this chapter you cost the covering of solids."
  }
];

const diagnosticItems = [
  {
    "itemId": "d1",
    "order": 1,
    "cluster": "C1",
    "clusterName": "Volume of prisms and cylinders",
    "question": "The diagram shows a metal pipe. Use \\(\\pi = 3.14\\). What is the volume of metal in the pipe?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 685 298\" width=\"685\" height=\"298\" role=\"img\" aria-label=\"Hollow pipe, outer radius 5 cm, inner radius 4 cm, length 10 cm.\"><rect x=\"0\" y=\"0\" width=\"685\" height=\"298\" fill=\"#ffffff\"/><line x1=\"90\" y1=\"40\" x2=\"290\" y2=\"40\" stroke=\"#333333\" stroke-width=\"2\"/><line x1=\"90\" y1=\"240\" x2=\"290\" y2=\"240\" stroke=\"#333333\" stroke-width=\"2\"/><ellipse cx=\"90\" cy=\"140\" rx=\"30\" ry=\"100\" fill=\"#eef4fa\" stroke=\"#333333\" stroke-width=\"2\"/><ellipse cx=\"90\" cy=\"140\" rx=\"24\" ry=\"80\" fill=\"#ffffff\" stroke=\"#333333\" stroke-width=\"2\"/><path d=\"M 290 40 A 30 100 0 0 1 290 240\" fill=\"none\" stroke=\"#333333\" stroke-width=\"2\"/><path d=\"M 290 40 A 30 100 0 0 0 290 240\" fill=\"none\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"90\" y1=\"258\" x2=\"290\" y2=\"258\" stroke=\"#333333\" stroke-width=\"1.5\"/><line x1=\"90\" y1=\"254\" x2=\"90\" y2=\"262\" stroke=\"#333333\" stroke-width=\"1.5\"/><line x1=\"290\" y1=\"254\" x2=\"290\" y2=\"262\" stroke=\"#333333\" stroke-width=\"1.5\"/><text x=\"190\" y=\"278\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">10 cm</text><circle cx=\"505\" cy=\"140\" r=\"100\" fill=\"#eef4fa\" stroke=\"#333333\" stroke-width=\"2\"/><circle cx=\"505\" cy=\"140\" r=\"80\" fill=\"#ffffff\" stroke=\"#333333\" stroke-width=\"2\"/><line x1=\"505\" y1=\"140\" x2=\"581.6\" y2=\"75.72\" stroke=\"#333333\" stroke-width=\"1.8\"/><line x1=\"505\" y1=\"140\" x2=\"505\" y2=\"220\" stroke=\"#333333\" stroke-width=\"1.8\"/><circle cx=\"505\" cy=\"140\" r=\"3\" fill=\"#333333\"/><text x=\"613\" y=\"95\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"start\">5 cm</text><rect x=\"512\" y=\"175\" width=\"35.6\" height=\"18\" fill=\"#ffffff\"/><text x=\"512\" y=\"188\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"start\">4 cm</text><text x=\"505\" y=\"264\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">End view</text></svg></div>",
    "options": [
      {
        "text": "1287.4 cm³",
        "correct": false,
        "feedback": "Added the two volumes, \\(785 + 502.4 = 1287.4\\), giving 1287.4 cm³. The hole is empty, so its volume is taken away, not added."
      },
      {
        "text": "785 cm³",
        "correct": false,
        "feedback": "Found the volume of the whole outer cylinder, \\(3.14 \\times 5 \\times 5 \\times 10 = 785\\), giving 785 cm³. The hole is empty, so its volume must be subtracted."
      },
      {
        "text": "282.6 cm³",
        "correct": true,
        "feedback": "Correct. The metal is the outer cylinder minus the hole. The outer cylinder is \\(3.14 \\times 5 \\times 5 \\times 10 = 785\\) and the hole is \\(3.14 \\times 4 \\times 4 \\times 10 = 502.4\\). The metal is \\(785 - 502.4 = 282.6\\text{ cm}^3\\)."
      },
      {
        "text": "502.4 cm³",
        "correct": false,
        "feedback": "Found only the volume of the hole, \\(3.14 \\times 4 \\times 4 \\times 10 = 502.4\\), giving 502.4 cm³. The metal is the outer cylinder minus the hole."
      }
    ],
    "backward": "Area of a circle, Ch7.",
    "forward": "Later in this chapter you find the surface area of the same kind of pipe."
  },
  {
    "itemId": "d2",
    "order": 2,
    "cluster": "C4",
    "clusterName": "Surface area of pyramids",
    "question": "A model pyramid is made from one rectangular sheet of card that is 20 cm by 40 cm. The pyramid has a square base of edge 12 cm and a vertical height of 8 cm. The model uses its total surface area in card. What percentage of the sheet is used?",
    "options": [
      {
        "text": "30%",
        "correct": false,
        "feedback": "Left out the square base: \\(4 \\times 60 = 240\\), and \\(240 \\div 800 \\times 100 = 30\\), giving 30%. The model also needs the base, 144 cm²."
      },
      {
        "text": "18%",
        "correct": false,
        "feedback": "Found only the base: \\(12 \\times 12 = 144\\), and \\(144 \\div 800 \\times 100 = 18\\), giving 18%. The four triangular faces must be included too."
      },
      {
        "text": "52%",
        "correct": false,
        "feedback": "Found the percentage of the sheet left over, \\(100 - 48 = 52\\), giving 52%. The question asks for the percentage used."
      },
      {
        "text": "48%",
        "correct": true,
        "feedback": "Correct. Half the base edge is 6, and \\(6 \\times 6 + 8 \\times 8 = 100\\), so the slant height is 10 cm. The surface area is \\(12 \\times 12 + 4 \\times (\\tfrac{1}{2} \\times 12 \\times 10 = 60) = 144 + 240 = 384\\text{ cm}^2\\). The sheet is \\(20 \\times 40 = 800\\text{ cm}^2\\), so \\(384 \\div 800 \\times 100 = 48\\)%."
      }
    ],
    "backward": "Percentages, Ch3, and Pythagoras' theorem, Ch5.",
    "forward": "Later in this chapter you find areas of other joined solids."
  },
  {
    "itemId": "d3",
    "order": 3,
    "cluster": "C2",
    "clusterName": "Surface area of cuboids and triangular prisms",
    "question": "The diagram shows a small cube cut away from one corner of a large cube. What is the total surface area of the solid that is left?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 374 306\" width=\"374\" height=\"306\" role=\"img\" aria-label=\"Cube of edge 6 cm with a cube of edge 2 cm removed from one corner.\"><rect x=\"0\" y=\"0\" width=\"374\" height=\"306\" fill=\"#ffffff\"/><polygon points=\"58,256 221.2,256 221.2,147.2 166.8,147.2 166.8,92.8 58,92.8\" fill=\"#eef4fa\" stroke=\"none\"/><polygon points=\"221.2,256 288.04,209.2 288.04,46 243.48,77.2 243.48,131.6 221.2,147.2\" fill=\"#eef4fa\" stroke=\"none\"/><polygon points=\"58,92.8 166.8,92.8 189.08,77.2 243.48,77.2 288.04,46 124.84,46\" fill=\"#eef4fa\" stroke=\"none\"/><polygon points=\"166.8,147.2 189.08,131.6 189.08,77.2 166.8,92.8\" fill=\"#eef4fa\" stroke=\"none\"/><polygon points=\"189.08,131.6 243.48,131.6 243.48,77.2 189.08,77.2\" fill=\"#eef4fa\" stroke=\"none\"/><polygon points=\"166.8,147.2 221.2,147.2 243.48,131.6 189.08,131.6\" fill=\"#eef4fa\" stroke=\"none\"/><line x1=\"124.84\" y1=\"209.2\" x2=\"288.04\" y2=\"209.2\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"124.84\" y1=\"209.2\" x2=\"124.84\" y2=\"46\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"58\" y1=\"256\" x2=\"124.84\" y2=\"209.2\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"58\" y1=\"256\" x2=\"221.2\" y2=\"256\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"221.2\" y1=\"256\" x2=\"221.2\" y2=\"147.2\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"166.8\" y1=\"147.2\" x2=\"221.2\" y2=\"147.2\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"166.8\" y1=\"147.2\" x2=\"166.8\" y2=\"92.8\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"58\" y1=\"92.8\" x2=\"166.8\" y2=\"92.8\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"58\" y1=\"256\" x2=\"58\" y2=\"92.8\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"288.04\" y1=\"209.2\" x2=\"288.04\" y2=\"46\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"124.84\" y1=\"46\" x2=\"288.04\" y2=\"46\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"58\" y1=\"92.8\" x2=\"124.84\" y2=\"46\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"221.2\" y1=\"256\" x2=\"288.04\" y2=\"209.2\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"243.48\" y1=\"77.2\" x2=\"288.04\" y2=\"46\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"243.48\" y1=\"131.6\" x2=\"243.48\" y2=\"77.2\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"221.2\" y1=\"147.2\" x2=\"243.48\" y2=\"131.6\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"166.8\" y1=\"92.8\" x2=\"189.08\" y2=\"77.2\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"189.08\" y1=\"77.2\" x2=\"243.48\" y2=\"77.2\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"166.8\" y1=\"147.2\" x2=\"189.08\" y2=\"131.6\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"189.08\" y1=\"131.6\" x2=\"189.08\" y2=\"77.2\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"189.08\" y1=\"131.6\" x2=\"243.48\" y2=\"131.6\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><text x=\"139.6\" y=\"276\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">6 cm</text><text x=\"47\" y=\"179.4\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"end\">6 cm</text><text x=\"194\" y=\"166.2\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">2 cm</text></svg></div>",
    "options": [
      {
        "text": "208 cm²",
        "correct": false,
        "feedback": "Subtracted the volume of the small cube, \\(2 \\times 2 \\times 2 = 8\\): \\(216 - 8 = 208\\), giving 208 cm². A volume cannot be subtracted from an area."
      },
      {
        "text": "204 cm²",
        "correct": false,
        "feedback": "Removed the 3 small squares but did not add the 3 new faces inside the notch: \\(216 - 12 = 204\\), giving 204 cm². The notch has 3 new faces."
      },
      {
        "text": "212 cm²",
        "correct": false,
        "feedback": "Removed the 3 squares but added only 2 of the 3 new faces: \\(216 - 12 + 8 = 212\\), giving 212 cm². The notch has 3 new faces, not 2."
      },
      {
        "text": "216 cm²",
        "correct": true,
        "feedback": "Correct. The original cube has surface area \\(6 \\times (6 \\times 6) = 216\\text{ cm}^2\\). Cutting out the corner removes 3 small squares from the outside, \\(3 \\times (2 \\times 2) = 12\\), but exposes 3 new faces of the same size inside the notch, another 12. So the surface area is unchanged: \\(216 - 12 + 12 = 216\\text{ cm}^2\\)."
      }
    ],
    "backward": "Areas of squares, Ch7.",
    "forward": "Later in this chapter you look at other solids with parts removed."
  },
  {
    "itemId": "d4",
    "order": 4,
    "cluster": "C6",
    "clusterName": "Mixed 3D problems",
    "question": "The diagram shows a cuboid cut into two identical pieces along the dashed plane of symmetry. By how much does the total surface area increase?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 394 178\" width=\"394\" height=\"178\" role=\"img\" aria-label=\"Cuboid 12 cm by 6 cm by 3 cm with a dashed plane across the middle of the length.\"><rect x=\"0\" y=\"0\" width=\"394\" height=\"178\" fill=\"#ffffff\"/><polygon points=\"58,75.76 265.51,75.76 265.51,127.63 58,127.63\" fill=\"#eef4fa\" stroke=\"none\"/><polygon points=\"265.51,127.63 265.51,75.76 308,46 308,97.88\" fill=\"#eef4fa\" stroke=\"none\"/><polygon points=\"265.51,75.76 58,75.76 100.49,46 308,46\" fill=\"#eef4fa\" stroke=\"none\"/><polygon points=\"161.75,127.63 204.25,97.88 204.25,46 161.75,75.76\" fill=\"#c0392b\" fill-opacity=\"0.16\" stroke=\"#c0392b\" stroke-width=\"1.8\" stroke-dasharray=\"6 4\" stroke-linejoin=\"round\"/><line x1=\"100.49\" y1=\"97.88\" x2=\"308\" y2=\"97.88\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"100.49\" y1=\"97.88\" x2=\"100.49\" y2=\"46\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"58\" y1=\"127.63\" x2=\"100.49\" y2=\"97.88\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"58\" y1=\"75.76\" x2=\"265.51\" y2=\"75.76\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"265.51\" y1=\"127.63\" x2=\"265.51\" y2=\"75.76\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"58\" y1=\"127.63\" x2=\"265.51\" y2=\"127.63\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"58\" y1=\"127.63\" x2=\"58\" y2=\"75.76\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"308\" y1=\"97.88\" x2=\"308\" y2=\"46\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"100.49\" y1=\"46\" x2=\"308\" y2=\"46\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"265.51\" y1=\"127.63\" x2=\"308\" y2=\"97.88\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"265.51\" y1=\"75.76\" x2=\"308\" y2=\"46\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"58\" y1=\"75.76\" x2=\"100.49\" y2=\"46\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><text x=\"161.75\" y=\"147.63\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">12 cm</text><text x=\"296.39\" y=\"124.98\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"start\">6 cm</text><text x=\"47\" y=\"106.69\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"end\">3 cm</text></svg></div>",
    "options": [
      {
        "text": "72 cm²",
        "correct": false,
        "feedback": "Used the 12 by 6 face once: \\(12 \\times 6 = 72\\), giving 72 cm². The cut faces are 6 by 3, and there are 2 of them."
      },
      {
        "text": "36 cm²",
        "correct": true,
        "feedback": "Correct. The cut makes two new faces, one on each piece, and each is a 6 by 3 rectangle. The increase is \\(2 \\times (6 \\times 3) = 36\\text{ cm}^2\\)."
      },
      {
        "text": "144 cm²",
        "correct": false,
        "feedback": "Used the 12 by 6 face for the cut: \\(2 \\times (12 \\times 6) = 144\\), giving 144 cm². The plane is parallel to the 6 by 3 faces, so the new faces are 6 by 3."
      },
      {
        "text": "216 cm²",
        "correct": false,
        "feedback": "Found the volume, \\(12 \\times 6 \\times 3 = 216\\), and gave it as 216 cm². The increase in area comes from the two new faces."
      }
    ],
    "backward": "Reflection and line symmetry, Ch13.",
    "forward": "Later in this chapter you cut cylinders in the same way."
  },
  {
    "itemId": "d5",
    "order": 5,
    "cluster": "C3",
    "clusterName": "Surface area of cylinders",
    "question": "Two cylinders have the same height. The first has a radius of 3 cm and the second has a radius of 6 cm. What is the ratio of the curved surface area of the first cylinder to that of the second?",
    "options": [
      {
        "text": "\\(1:8\\)",
        "correct": false,
        "feedback": "Cubed the radii, \\(27:216\\), giving \\(1:8\\). The curved surface uses the radius once, so the ratio is \\(3:6\\)."
      },
      {
        "text": "\\(2:1\\)",
        "correct": false,
        "feedback": "Wrote the ratio the wrong way round, second to first, as \\(2:1\\). The question asks for the first cylinder to the second, \\(3:6\\), which is \\(1:2\\)."
      },
      {
        "text": "\\(1:2\\)",
        "correct": true,
        "feedback": "Correct. The curved surface area is \\(2 \\times \\pi \\times r \\times h\\). With the same height, it depends only on the radius, so the ratio is \\(3:6\\), which simplifies to \\(1:2\\)."
      },
      {
        "text": "\\(1:4\\)",
        "correct": false,
        "feedback": "Squared the radii, \\(9:36\\), as in the area of a circle, giving \\(1:4\\). The curved surface uses \\(2 \\times \\pi \\times r \\times h\\), where the radius appears once."
      }
    ],
    "backward": "Ratio, Ch11.",
    "forward": "Later in this chapter you compare the surface areas of solids in the same way."
  },
  {
    "itemId": "d6",
    "order": 6,
    "cluster": "C1",
    "clusterName": "Volume of prisms and cylinders",
    "question": "A full cylindrical tank has a radius of 1 m and a height of 2 m. Water is pumped out at 50 litres per minute. Use \\(\\pi = 3.14\\). How many minutes does it take to empty the tank?",
    "options": [
      {
        "text": "0.1256 minutes",
        "correct": false,
        "feedback": "Divided the volume in m³ by the rate without converting to litres: \\(6.28 \\div 50 = 0.1256\\), giving 0.1256 minutes. The rate is in litres, and 1 m³ is 1000 litres."
      },
      {
        "text": "125.6 minutes",
        "correct": true,
        "feedback": "Correct. The volume is \\(3.14 \\times 1 \\times 1 \\times 2 = 6.28\\text{ m}^3\\). One m³ is 1000 litres, so the tank holds \\(6.28 \\times 1000 = 6280\\) litres. At 50 litres per minute, the time is \\(6280 \\div 50 = 125.6\\) minutes."
      },
      {
        "text": "6280 minutes",
        "correct": false,
        "feedback": "Found the capacity in litres, 6280, and gave 6280 minutes. That is the number of litres; divide by the pumping rate, 50 litres per minute."
      },
      {
        "text": "502.4 minutes",
        "correct": false,
        "feedback": "Used the diameter, 2 m, as the radius: \\(3.14 \\times 2 \\times 2 \\times 2 = 25.12\\text{ m}^3\\), so 25 120 litres, and \\(25\\,120 \\div 50 = 502.4\\), giving 502.4 minutes. The radius of the tank is 1 m."
      }
    ],
    "backward": "Large and small units, Ch7.",
    "forward": "Later in this chapter you meet other rates of filling and emptying."
  },
  {
    "itemId": "d7",
    "order": 7,
    "cluster": "C3",
    "clusterName": "Surface area of cylinders",
    "question": "A solid metal cylinder of radius 3 cm and height 10 cm is lowered into a tank of water with a rectangular base measuring 20 cm by 15 cm. The cylinder is completely covered by water. Use \\(\\pi = 3.14\\). By how many centimetres does the water level rise?",
    "options": [
      {
        "text": "0.942 cm",
        "correct": true,
        "feedback": "Correct. The water that is pushed up has the same volume as the cylinder: \\(3.14 \\times 3 \\times 3 \\times 10 = 282.6\\text{ cm}^3\\). This spreads over the base of the tank, \\(20 \\times 15 = 300\\text{ cm}^2\\), so the rise is \\(282.6 \\div 300 = 0.942\\text{ cm}\\)."
      },
      {
        "text": "14.13 cm",
        "correct": false,
        "feedback": "Divided by only one side of the tank base, \\(282.6 \\div 20 = 14.13\\), giving 14.13 cm. Divide by the whole base area, \\(20 \\times 15 = 300\\)."
      },
      {
        "text": "282.6 cm",
        "correct": false,
        "feedback": "Found the volume of the cylinder, 282.6, and stopped, giving 282.6 cm. The volume must be divided by the base area of the tank to get a height."
      },
      {
        "text": "0.0942 cm",
        "correct": false,
        "feedback": "Used only the area of the circular end, \\(3.14 \\times 3 \\times 3 = 28.26\\), so \\(28.26 \\div 300 = 0.0942\\), giving 0.0942 cm. The cylinder's whole volume, 282.6, is what pushes the water up."
      }
    ],
    "backward": "Area of a circle, Ch7.",
    "forward": "Later in this chapter you use volumes in other practical problems."
  },
  {
    "itemId": "d8",
    "order": 8,
    "cluster": "C6",
    "clusterName": "Mixed 3D problems",
    "question": "The diagram shows a square-based pyramid and a closed cuboid. They have the same square base and the same vertical height. How much greater is the total surface area of the cuboid than the total surface area of the pyramid?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 432 314\" width=\"432\" height=\"314\" role=\"img\" aria-label=\"Square-based pyramid and closed cuboid with the same base edge 24 cm and the same height 5 cm.\"><rect x=\"0\" y=\"0\" width=\"432\" height=\"314\" fill=\"#ffffff\"/><polygon points=\"96,108.38 273.36,108.38 221,46\" fill=\"#eef4fa\" stroke=\"none\"/><polygon points=\"273.36,108.38 346,57.52 221,46\" fill=\"#eef4fa\" stroke=\"none\"/><polygon points=\"168.64,57.52 96,108.38 221,46\" fill=\"#eef4fa\" stroke=\"none\"/><polygon points=\"96,226.62 273.36,226.62 273.36,263.57 96,263.57\" fill=\"#eef4fa\" stroke=\"none\"/><polygon points=\"273.36,263.57 273.36,226.62 346,175.76 346,212.71\" fill=\"#eef4fa\" stroke=\"none\"/><polygon points=\"273.36,226.62 96,226.62 168.64,175.76 346,175.76\" fill=\"#eef4fa\" stroke=\"none\"/><line x1=\"168.64\" y1=\"57.52\" x2=\"346\" y2=\"57.52\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"168.64\" y1=\"212.71\" x2=\"346\" y2=\"212.71\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"168.64\" y1=\"212.71\" x2=\"168.64\" y2=\"175.76\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"96\" y1=\"263.57\" x2=\"168.64\" y2=\"212.71\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"96\" y1=\"108.38\" x2=\"273.36\" y2=\"108.38\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"273.36\" y1=\"108.38\" x2=\"346\" y2=\"57.52\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"96\" y1=\"108.38\" x2=\"168.64\" y2=\"57.52\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"221\" y1=\"46\" x2=\"273.36\" y2=\"108.38\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"96\" y1=\"108.38\" x2=\"221\" y2=\"46\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"221\" y1=\"46\" x2=\"346\" y2=\"57.52\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"168.64\" y1=\"57.52\" x2=\"221\" y2=\"46\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"96\" y1=\"226.62\" x2=\"273.36\" y2=\"226.62\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"273.36\" y1=\"263.57\" x2=\"273.36\" y2=\"226.62\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"96\" y1=\"263.57\" x2=\"273.36\" y2=\"263.57\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"96\" y1=\"263.57\" x2=\"96\" y2=\"226.62\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"346\" y1=\"212.71\" x2=\"346\" y2=\"175.76\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"168.64\" y1=\"175.76\" x2=\"346\" y2=\"175.76\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"273.36\" y1=\"263.57\" x2=\"346\" y2=\"212.71\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"273.36\" y1=\"226.62\" x2=\"346\" y2=\"175.76\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"96\" y1=\"226.62\" x2=\"168.64\" y2=\"175.76\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"221\" y1=\"46\" x2=\"221\" y2=\"82.95\" stroke=\"#c0392b\" stroke-width=\"1.8\" stroke-dasharray=\"6 4\"/><line x1=\"217\" y1=\"46\" x2=\"70\" y2=\"46\" stroke=\"#888888\" stroke-width=\"1\"/><line x1=\"217\" y1=\"82.95\" x2=\"70\" y2=\"82.95\" stroke=\"#888888\" stroke-width=\"1\"/><line x1=\"74\" y1=\"46\" x2=\"74\" y2=\"82.95\" stroke=\"#333333\" stroke-width=\"1.5\"/><polyline points=\"70,54 74,46 78,54\" stroke=\"#333333\" stroke-width=\"1.5\" fill=\"none\"/><polyline points=\"70,74.95 74,82.95 78,74.95\" stroke=\"#333333\" stroke-width=\"1.5\" fill=\"none\"/><text x=\"184.68\" y=\"128.38\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">24 cm</text><text x=\"184.68\" y=\"283.57\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">24 cm</text><text x=\"357\" y=\"199.23\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"start\">5 cm</text><text x=\"66\" y=\"69.47\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"end\">5 cm</text></svg></div>",
    "options": [
      {
        "text": "1008 cm²",
        "correct": false,
        "feedback": "Left out the base of the pyramid: \\(1632 - 624 = 1008\\), giving 1008 cm². The pyramid's square base is part of its surface, 576 cm²."
      },
      {
        "text": "1632 cm²",
        "correct": false,
        "feedback": "Gave the surface area of the cuboid, 1632, giving 1632 cm². The question asks how much greater it is than the pyramid's, 1200 cm²."
      },
      {
        "text": "432 cm²",
        "correct": true,
        "feedback": "Correct. For the pyramid, half the base edge is 12 and \\(12 \\times 12 + 5 \\times 5 = 169\\), so the slant height is 13 cm. Its surface area is \\(576 + 4 \\times (\\tfrac{1}{2} \\times 24 \\times 13 = 156) = 576 + 624 = 1200\\text{ cm}^2\\). The cuboid has \\(2 \\times (24 \\times 24) + 4 \\times (24 \\times 5) = 1152 + 480 = 1632\\text{ cm}^2\\). The difference is \\(1632 - 1200 = 432\\text{ cm}^2\\)."
      },
      {
        "text": "816 cm²",
        "correct": false,
        "feedback": "Used the vertical height, 5, as the height of each triangular face: the pyramid came to \\(576 + 4 \\times (\\tfrac{1}{2} \\times 24 \\times 5 = 60) = 816\\), so the difference was \\(1632 - 816 = 816\\), giving 816 cm². The height of a face is the slant height, 13 cm."
      }
    ],
    "backward": "Pythagoras' theorem, Ch5.",
    "forward": "Later in this chapter you compare more solids."
  },
  {
    "itemId": "d9",
    "order": 9,
    "cluster": "C6",
    "clusterName": "Mixed 3D problems",
    "question": "A cube of edge 4 cm and a cuboid measuring 8 cm by 4 cm by 2 cm have the same volume. How much more surface area does the cuboid have than the cube?",
    "options": [
      {
        "text": "8 cm²",
        "correct": false,
        "feedback": "Counted each different face once for both solids: \\(8 \\times 4 + 8 \\times 2 + 4 \\times 2 = 56\\) for the cuboid and \\(3 \\times (4 \\times 4) = 48\\) for the cube, and \\(56 - 48 = 8\\), giving 8 cm². Every face has a partner, so double: \\(2 \\times 8 = 16\\)."
      },
      {
        "text": "16 cm²",
        "correct": true,
        "feedback": "Correct. The cube has surface area \\(6 \\times (4 \\times 4) = 96\\text{ cm}^2\\). The cuboid has \\(2 \\times (8 \\times 4) + 2 \\times (8 \\times 2) + 2 \\times (4 \\times 2) = 64 + 32 + 16 = 112\\text{ cm}^2\\). The difference is \\(112 - 96 = 16\\text{ cm}^2\\)."
      },
      {
        "text": "208 cm²",
        "correct": false,
        "feedback": "Added the two surface areas, \\(112 + 96 = 208\\), giving 208 cm². The question asks how much more the cuboid has than the cube, so subtract."
      },
      {
        "text": "96 cm²",
        "correct": false,
        "feedback": "Gave the surface area of the cube, 96, giving 96 cm². The question asks how much more the cuboid has, so subtract: \\(112 - 96\\)."
      }
    ],
    "backward": "Areas of rectangles, Ch7.",
    "forward": "Later in this chapter you compare the surface areas of other solids."
  },
  {
    "itemId": "d10",
    "order": 10,
    "cluster": "C6",
    "clusterName": "Mixed 3D problems",
    "question": "The diagram shows a closed cylinder cut in half along a plane of symmetry. Use \\(\\pi = 3.14\\). What is the total surface area of the two halves together?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 292 272\" width=\"292\" height=\"272\" role=\"img\" aria-label=\"Closed cylinder, radius 3 cm, height 8 cm, cut by a dashed plane through its axis.\"><rect x=\"0\" y=\"0\" width=\"292\" height=\"272\" fill=\"#ffffff\"/><polygon points=\"70,62.88 182.5,62.88 182.5,212.88 70,212.88\" fill=\"#c0392b\" fill-opacity=\"0.16\" stroke=\"#c0392b\" stroke-width=\"1.8\" stroke-dasharray=\"6 4\"/><ellipse cx=\"126.25\" cy=\"62.88\" rx=\"56.25\" ry=\"16.88\" fill=\"#eef4fa\" stroke=\"#333333\" stroke-width=\"2\"/><line x1=\"70\" y1=\"62.88\" x2=\"70\" y2=\"212.88\" stroke=\"#333333\" stroke-width=\"2\"/><line x1=\"182.5\" y1=\"62.88\" x2=\"182.5\" y2=\"212.88\" stroke=\"#333333\" stroke-width=\"2\"/><path d=\"M 70 212.88 A 56.25 16.88 0 0 0 182.5 212.88\" fill=\"none\" stroke=\"#333333\" stroke-width=\"2\"/><path d=\"M 70 212.88 A 56.25 16.88 0 0 1 182.5 212.88\" fill=\"none\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"126.25\" y1=\"62.88\" x2=\"126.25\" y2=\"212.88\" stroke=\"#c0392b\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"126.25\" y1=\"62.88\" x2=\"182.5\" y2=\"62.88\" stroke=\"#333333\" stroke-width=\"1.8\"/><circle cx=\"126.25\" cy=\"62.88\" r=\"3\" fill=\"#333333\"/><text x=\"154.38\" y=\"40\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">3 cm</text><line x1=\"186.5\" y1=\"62.88\" x2=\"214.5\" y2=\"62.88\" stroke=\"#888888\" stroke-width=\"1\"/><line x1=\"186.5\" y1=\"212.88\" x2=\"214.5\" y2=\"212.88\" stroke=\"#888888\" stroke-width=\"1\"/><line x1=\"210.5\" y1=\"62.88\" x2=\"210.5\" y2=\"212.88\" stroke=\"#333333\" stroke-width=\"1.5\"/><polyline points=\"206.5,70.88 210.5,62.88 214.5,70.88\" stroke=\"#333333\" stroke-width=\"1.5\" fill=\"none\"/><polyline points=\"206.5,204.88 210.5,212.88 214.5,204.88\" stroke=\"#333333\" stroke-width=\"1.5\" fill=\"none\"/><text x=\"218.5\" y=\"142.88\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"start\">8 cm</text></svg></div>",
    "options": [
      {
        "text": "207.24 cm²",
        "correct": false,
        "feedback": "Gave the surface area of the whole cylinder, 207.24, giving 207.24 cm². The cut creates two new rectangular faces, 96 cm² in total."
      },
      {
        "text": "303.24 cm²",
        "correct": true,
        "feedback": "Correct. The original surface area is \\(2 \\times \\pi \\times r \\times (r + h) = 2 \\times 3.14 \\times 3 \\times 11 = 207.24\\text{ cm}^2\\). The cut makes two new rectangular faces, each 6 cm (the diameter) by 8 cm, so they add \\(2 \\times (6 \\times 8) = 96\\text{ cm}^2\\). The total is \\(207.24 + 96 = 303.24\\text{ cm}^2\\)."
      },
      {
        "text": "255.24 cm²",
        "correct": false,
        "feedback": "Used the radius instead of the diameter for the width of the cut faces: \\(207.24 + 2 \\times (3 \\times 8) = 207.24 + 48 = 255.24\\), giving 255.24 cm². The cut goes through the centre, so each face is 6 cm wide."
      },
      {
        "text": "111.24 cm²",
        "correct": false,
        "feedback": "Subtracted the new faces instead of adding them: \\(207.24 - 2 \\times (6 \\times 8) = 207.24 - 96 = 111.24\\), giving 111.24 cm². The cut exposes new surface, so the area goes up."
      }
    ],
    "backward": "Circumference and area of a circle, Ch7.",
    "forward": "Later in this chapter you use symmetry to simplify more problems."
  },
  {
    "itemId": "d11",
    "order": 11,
    "cluster": "C3",
    "clusterName": "Surface area of cylinders",
    "question": "A closed cylinder has a height equal to its radius. What fraction of its total surface area is its curved surface?",
    "options": [
      {
        "text": "\\(\\frac{1}{4}\\)",
        "correct": false,
        "feedback": "Gave \\(\\frac{1}{4}\\), as if the curved surface were one of four equal parts. With height equal to radius, the curved surface 2πr² equals the two ends together, 2πr², so it is \\(\\frac{1}{2}\\) of the total."
      },
      {
        "text": "\\(\\frac{2}{3}\\)",
        "correct": false,
        "feedback": "Gave \\(\\frac{2}{3}\\), as if the curved surface were two of three equal parts. The curved surface 2πr² equals the two circular ends together, 2πr², so it is exactly \\(\\frac{1}{2}\\) of the total."
      },
      {
        "text": "\\(\\frac{1}{3}\\)",
        "correct": false,
        "feedback": "Counted three equal parts, one for the curved surface and one for each circular end, giving \\(\\frac{1}{3}\\). The curved surface 2πr² is as large as the two circular ends together, 2πr², so it is half of the total."
      },
      {
        "text": "\\(\\frac{1}{2}\\)",
        "correct": true,
        "feedback": "Correct. Let the radius and the height both be r. The curved surface is \\(2 \\times \\pi \\times r \\times r = 2\\pi r^2\\). Each circular end is πr², so the two ends are 2πr². The curved surface and the two ends are equal, so the curved surface is \\(\\frac{1}{2}\\) of the total."
      }
    ],
    "backward": "Circumference and area of a circle, Ch7, and fractions, Ch8.",
    "forward": "Later in this chapter you compare other solids in the same way."
  },
  {
    "itemId": "d12",
    "order": 12,
    "cluster": "C1",
    "clusterName": "Volume of prisms and cylinders",
    "question": "A cuboid tank 20 cm long, 15 cm wide and 10 cm high is full of water. The water is poured into cylindrical cups, each with a radius of 5 cm and a height of 4 cm. Use \\(\\pi = 3.14\\). How many cups can be filled completely?",
    "options": [
      {
        "text": "47 cups",
        "correct": false,
        "feedback": "Used \\(\\pi \\times r \\times h = 3.14 \\times 5 \\times 4 = 62.8\\) for the volume of a cup instead of \\(\\pi \\times r \\times r \\times h\\), and \\(3000 \\div 62.8\\) is about 47.77, so 47 cups. The area of the circular end needs r squared, \\(5 \\times 5\\)."
      },
      {
        "text": "10 cups",
        "correct": false,
        "feedback": "Rounded 9.55 up to 10, giving 10 cups. The last cup would not be full, so only 9 cups are filled completely."
      },
      {
        "text": "9 cups",
        "correct": true,
        "feedback": "Correct. The tank holds \\(20 \\times 15 \\times 10 = 3000\\text{ cm}^3\\). One cup holds \\(3.14 \\times 5 \\times 5 \\times 4 = 314\\text{ cm}^3\\). The number of cups is \\(3000 \\div 314 \\approx 9.55\\), and only whole cups can be filled completely, so 9 cups."
      },
      {
        "text": "2 cups",
        "correct": false,
        "feedback": "Used the diameter, 10, as the radius of a cup: \\(3.14 \\times 10 \\times 10 \\times 4 = 1256\\), and \\(3000 \\div 1256\\) is about 2.39, so 2 cups. The radius of each cup is 5 cm."
      }
    ],
    "backward": "Area of a circle, Ch7, and rounding, Ch3.",
    "forward": "Later in this chapter you meet more problems that join volumes."
  },
  {
    "itemId": "d13",
    "order": 13,
    "cluster": "C6",
    "clusterName": "Mixed 3D problems",
    "question": "The diagram shows a swimming pool with a rectangular surface and a sloping floor. How many litres of water does it hold when it is full?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 394 167\" width=\"394\" height=\"167\" role=\"img\" aria-label=\"Pool shaped as a prism: depth 1 m at the shallow end and 2 m at the deep end, length 10 m, width 5 m.\"><rect x=\"0\" y=\"0\" width=\"394\" height=\"167\" fill=\"#ffffff\"/><polygon points=\"58,75.76 265.51,75.76 265.51,117.26 58,96.51\" fill=\"#eef4fa\" stroke=\"none\"/><polygon points=\"265.51,117.26 265.51,75.76 308,46 308,87.5\" fill=\"#eef4fa\" stroke=\"none\"/><polygon points=\"265.51,75.76 58,75.76 100.49,46 308,46\" fill=\"#eef4fa\" stroke=\"none\"/><line x1=\"100.49\" y1=\"66.75\" x2=\"308\" y2=\"87.5\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"100.49\" y1=\"66.75\" x2=\"100.49\" y2=\"46\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"58\" y1=\"96.51\" x2=\"100.49\" y2=\"66.75\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"58\" y1=\"75.76\" x2=\"265.51\" y2=\"75.76\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"265.51\" y1=\"117.26\" x2=\"265.51\" y2=\"75.76\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"58\" y1=\"96.51\" x2=\"265.51\" y2=\"117.26\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"58\" y1=\"96.51\" x2=\"58\" y2=\"75.76\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"308\" y1=\"87.5\" x2=\"308\" y2=\"46\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"100.49\" y1=\"46\" x2=\"308\" y2=\"46\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"265.51\" y1=\"117.26\" x2=\"308\" y2=\"87.5\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"265.51\" y1=\"75.76\" x2=\"308\" y2=\"46\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"58\" y1=\"75.76\" x2=\"100.49\" y2=\"46\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><text x=\"161.75\" y=\"126.88\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">10 m</text><text x=\"47\" y=\"91.13\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"end\">1 m</text><text x=\"296.39\" y=\"114.61\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"start\">5 m</text><text x=\"319\" y=\"71.75\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"start\">2 m</text></svg></div>",
    "options": [
      {
        "text": "75 000 litres",
        "correct": true,
        "feedback": "Correct. The side view is a trapezium with parallel sides 1 and 2 and width 10, so its area is \\(\\tfrac{1}{2} \\times (1 + 2) \\times 10 = 15\\text{ m}^2\\). The volume is \\(15 \\times 5 = 75\\text{ m}^3\\). One m³ is 1000 litres, so the pool holds \\(75 \\times 1000 = 75\\,000\\) litres."
      },
      {
        "text": "15 000 litres",
        "correct": false,
        "feedback": "Found the area of the side view, 15 m², and converted it without multiplying by the width: \\(15 \\times 1000 = 15\\,000\\), giving 15 000 litres. The volume needs the width, 5 m, too."
      },
      {
        "text": "75 litres",
        "correct": false,
        "feedback": "Found the volume, 75, and gave it as 75 litres. That volume is in m³, and 1 m³ is 1000 litres."
      },
      {
        "text": "7500 litres",
        "correct": false,
        "feedback": "Gave 7500 litres, which would come from 100 litres in each m³. One m³ is 1000 litres, so \\(75 \\times 1000 = 75\\,000\\)."
      }
    ],
    "backward": "Area of a trapezium, Ch7, and large and small units, Ch7.",
    "forward": "Later in this chapter you meet more composite prisms."
  },
  {
    "itemId": "d14",
    "order": 14,
    "cluster": "C4",
    "clusterName": "Surface area of pyramids",
    "question": "The diagram shows the roof of a tower, a square-based pyramid. Roof tiles are sold in boxes, and each box covers 5 m². How many boxes are needed to cover the four sloping faces of the roof?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 394 188\" width=\"394\" height=\"188\" role=\"img\" aria-label=\"Square-based pyramid roof, base edge 8 m, vertical height 3 m.\"><rect x=\"0\" y=\"0\" width=\"394\" height=\"188\" fill=\"#ffffff\"/><polygon points=\"58,137.94 235.36,137.94 183,46\" fill=\"#eef4fa\" stroke=\"none\"/><polygon points=\"235.36,137.94 308,87.08 183,46\" fill=\"#eef4fa\" stroke=\"none\"/><line x1=\"130.64\" y1=\"87.08\" x2=\"308\" y2=\"87.08\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"58\" y1=\"137.94\" x2=\"130.64\" y2=\"87.08\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"130.64\" y1=\"87.08\" x2=\"183\" y2=\"46\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"58\" y1=\"137.94\" x2=\"235.36\" y2=\"137.94\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"235.36\" y1=\"137.94\" x2=\"308\" y2=\"87.08\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"183\" y1=\"46\" x2=\"235.36\" y2=\"137.94\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"58\" y1=\"137.94\" x2=\"183\" y2=\"46\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"183\" y1=\"46\" x2=\"308\" y2=\"87.08\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"183\" y1=\"46\" x2=\"183\" y2=\"112.51\" stroke=\"#c0392b\" stroke-width=\"1.8\" stroke-dasharray=\"6 4\"/><line x1=\"187\" y1=\"46\" x2=\"338\" y2=\"46\" stroke=\"#888888\" stroke-width=\"1\"/><line x1=\"187\" y1=\"112.51\" x2=\"338\" y2=\"112.51\" stroke=\"#888888\" stroke-width=\"1\"/><line x1=\"334\" y1=\"46\" x2=\"334\" y2=\"112.51\" stroke=\"#333333\" stroke-width=\"1.5\"/><polyline points=\"330,54 334,46 338,54\" stroke=\"#333333\" stroke-width=\"1.5\" fill=\"none\"/><polyline points=\"330,104.51 334,112.51 338,104.51\" stroke=\"#333333\" stroke-width=\"1.5\" fill=\"none\"/><text x=\"146.68\" y=\"157.94\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">8 m</text><text x=\"342\" y=\"84.25\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"start\">3 m</text></svg></div>",
    "options": [
      {
        "text": "32 boxes",
        "correct": false,
        "feedback": "Forgot the ½ on each face: \\(4 \\times (8 \\times 5 = 40) = 160\\text{ m}^2\\), and \\(160 \\div 5 = 32\\), giving 32 boxes. Each face is a triangle, \\(\\tfrac{1}{2} \\times 8 \\times 5\\)."
      },
      {
        "text": "29 boxes",
        "correct": false,
        "feedback": "Included the square base, \\(80 + 64 = 144\\text{ m}^2\\), and \\(144 \\div 5 = 28.8\\), so 29 boxes. The roof covers only the four sloping faces."
      },
      {
        "text": "400 boxes",
        "correct": false,
        "feedback": "Multiplied by the cover per box instead of dividing: \\(80 \\times 5 = 400\\), giving 400 boxes. Each box covers 5 m², so divide 80 by 5."
      },
      {
        "text": "16 boxes",
        "correct": true,
        "feedback": "Correct. Half the base is 4 m, and \\(4 \\times 4 + 3 \\times 3 = 25\\), so the slant height is 5 m. Each face is \\(\\tfrac{1}{2} \\times 8 \\times 5 = 20\\text{ m}^2\\), so the roof is \\(4 \\times 20 = 80\\text{ m}^2\\). The number of boxes is \\(80 \\div 5 = 16\\)."
      }
    ],
    "backward": "Pythagoras' theorem, Ch5.",
    "forward": "Later in this chapter you meet more problems with practical units."
  },
  {
    "itemId": "d15",
    "order": 15,
    "cluster": "C2",
    "clusterName": "Surface area of cuboids and triangular prisms",
    "question": "The diagram shows a tent that is a triangular prism with no floor. What area of canvas is needed to make the two sloping sides and the two triangular ends?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 394 266\" width=\"394\" height=\"266\" role=\"img\" aria-label=\"Tent shaped as a triangular prism: isosceles end with base 6 m and height 4 m, length 10 m.\"><rect x=\"0\" y=\"0\" width=\"394\" height=\"266\" fill=\"#ffffff\"/><polygon points=\"132.29,117.02 206.58,216.07 58,216.07\" fill=\"#eef4fa\" stroke=\"none\"/><polygon points=\"206.58,216.07 132.29,117.02 233.71,46 308,145.05\" fill=\"#eef4fa\" stroke=\"none\"/><line x1=\"159.42\" y1=\"145.05\" x2=\"308\" y2=\"145.05\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"159.42\" y1=\"145.05\" x2=\"233.71\" y2=\"46\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"58\" y1=\"216.07\" x2=\"159.42\" y2=\"145.05\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"132.29\" y1=\"117.02\" x2=\"206.58\" y2=\"216.07\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"58\" y1=\"216.07\" x2=\"206.58\" y2=\"216.07\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"58\" y1=\"216.07\" x2=\"132.29\" y2=\"117.02\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"233.71\" y1=\"46\" x2=\"308\" y2=\"145.05\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"206.58\" y1=\"216.07\" x2=\"308\" y2=\"145.05\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"132.29\" y1=\"117.02\" x2=\"233.71\" y2=\"46\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"132.29\" y1=\"117.02\" x2=\"132.29\" y2=\"216.07\" stroke=\"#c0392b\" stroke-width=\"1.8\" stroke-dasharray=\"6 4\"/><polyline points=\"142.29,216.07 142.29,206.07 132.29,206.07\" stroke=\"#333333\" stroke-width=\"1.3\" fill=\"none\"/><text x=\"132.29\" y=\"236.07\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">6 m</text><text x=\"266.93\" y=\"192.79\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"start\">10 m</text><rect x=\"118.19\" y=\"158.54\" width=\"28.2\" height=\"18\" fill=\"#ffffff\"/><text x=\"132.29\" y=\"171.54\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">4 m</text></svg></div>",
    "options": [
      {
        "text": "112 m²",
        "correct": false,
        "feedback": "Added only one triangular end: \\(100 + 12 = 112\\), giving 112 m². The tent has two triangular ends."
      },
      {
        "text": "74 m²",
        "correct": false,
        "feedback": "Counted only one sloping side: \\(5 \\times 10 + 2 \\times (\\tfrac{1}{2} \\times 6 \\times 4 = 12) = 50 + 24 = 74\\), giving 74 m². The tent has two sloping sides."
      },
      {
        "text": "100 m²",
        "correct": false,
        "feedback": "Found only the two sloping rectangles, \\(2 \\times (5 \\times 10) = 100\\), giving 100 m². The two triangular ends, 24 m² in total, must be added."
      },
      {
        "text": "124 m²",
        "correct": true,
        "feedback": "Correct. Half the base is 3 m, and \\(3 \\times 3 + 4 \\times 4 = 9 + 16 = 25\\), so each sloping side is 5 m. The two sloping rectangles are \\(2 \\times (5 \\times 10) = 100\\text{ m}^2\\). The two triangular ends are \\(2 \\times (\\tfrac{1}{2} \\times 6 \\times 4 = 12) = 24\\text{ m}^2\\). With no floor, the total is \\(100 + 24 = 124\\text{ m}^2\\)."
      }
    ],
    "backward": "Pythagoras' theorem, Ch5.",
    "forward": "Later in this chapter you cost the covering of other solids."
  },
  {
    "itemId": "d16",
    "order": 16,
    "cluster": "C6",
    "clusterName": "Mixed 3D problems",
    "question": "A square-based pyramid is placed on top of a cube of the same width, with its apex above the centre of the cube. Which statement about the combined solid is correct?",
    "options": [
      {
        "text": "4 planes of symmetry and rotational symmetry of order 4",
        "correct": true,
        "feedback": "Correct. The pyramid and the cube share the same vertical axis. Two planes through the midpoints of opposite edges and two diagonal planes all cut both parts in mirror-image halves, giving 4 planes. A quarter turn about the vertical axis fits both parts onto themselves, so the order is 4. A horizontal plane would reflect the pyramid onto empty space, so there is none."
      },
      {
        "text": "9 planes of symmetry and rotational symmetry of order 4",
        "correct": false,
        "feedback": "Not correct: 9 planes of symmetry and rotational symmetry of order 4. A cube alone has 9 planes, but the pyramid on top removes every plane that is not vertical, leaving 4. The order of rotation, 4, is right."
      },
      {
        "text": "5 planes of symmetry and rotational symmetry of order 2",
        "correct": false,
        "feedback": "Not correct: 5 planes of symmetry and rotational symmetry of order 2. 5 planes is the count for a square prism, which has a plane across its middle; the pyramid on top removes that plane, leaving 4. The solid fits after every quarter turn, so the order is 4, not 2."
      },
      {
        "text": "4 planes of symmetry and rotational symmetry of order 8",
        "correct": false,
        "feedback": "Not correct: 4 planes of symmetry and rotational symmetry of order 8. The 4 planes are right, but the order of rotation is the number of times the solid fits onto itself in one full turn: quarter turns of 90° give 4, not 8."
      }
    ],
    "backward": "Reflection and rotation, Ch13.",
    "forward": "Later in this chapter you use symmetry to simplify problems."
  },
  {
    "itemId": "d17",
    "order": 17,
    "cluster": "C6",
    "clusterName": "Mixed 3D problems",
    "question": "The diagram shows a metal pipe. Use \\(\\pi = 3.14\\). What is its total surface area, including the inside curved surface and the two flat ends?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 685 298\" width=\"685\" height=\"298\" role=\"img\" aria-label=\"Hollow pipe, outer radius 5 cm, inner radius 3 cm, length 10 cm.\"><rect x=\"0\" y=\"0\" width=\"685\" height=\"298\" fill=\"#ffffff\"/><line x1=\"90\" y1=\"40\" x2=\"290\" y2=\"40\" stroke=\"#333333\" stroke-width=\"2\"/><line x1=\"90\" y1=\"240\" x2=\"290\" y2=\"240\" stroke=\"#333333\" stroke-width=\"2\"/><ellipse cx=\"90\" cy=\"140\" rx=\"30\" ry=\"100\" fill=\"#eef4fa\" stroke=\"#333333\" stroke-width=\"2\"/><ellipse cx=\"90\" cy=\"140\" rx=\"18\" ry=\"60\" fill=\"#ffffff\" stroke=\"#333333\" stroke-width=\"2\"/><path d=\"M 290 40 A 30 100 0 0 1 290 240\" fill=\"none\" stroke=\"#333333\" stroke-width=\"2\"/><path d=\"M 290 40 A 30 100 0 0 0 290 240\" fill=\"none\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"90\" y1=\"258\" x2=\"290\" y2=\"258\" stroke=\"#333333\" stroke-width=\"1.5\"/><line x1=\"90\" y1=\"254\" x2=\"90\" y2=\"262\" stroke=\"#333333\" stroke-width=\"1.5\"/><line x1=\"290\" y1=\"254\" x2=\"290\" y2=\"262\" stroke=\"#333333\" stroke-width=\"1.5\"/><text x=\"190\" y=\"278\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">10 cm</text><circle cx=\"505\" cy=\"140\" r=\"100\" fill=\"#eef4fa\" stroke=\"#333333\" stroke-width=\"2\"/><circle cx=\"505\" cy=\"140\" r=\"60\" fill=\"#ffffff\" stroke=\"#333333\" stroke-width=\"2\"/><line x1=\"505\" y1=\"140\" x2=\"581.6\" y2=\"75.72\" stroke=\"#333333\" stroke-width=\"1.8\"/><line x1=\"505\" y1=\"140\" x2=\"505\" y2=\"200\" stroke=\"#333333\" stroke-width=\"1.8\"/><circle cx=\"505\" cy=\"140\" r=\"3\" fill=\"#333333\"/><text x=\"613\" y=\"95\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"start\">5 cm</text><rect x=\"512\" y=\"164\" width=\"35.6\" height=\"18\" fill=\"#ffffff\"/><text x=\"512\" y=\"177\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"start\">3 cm</text><text x=\"505\" y=\"264\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">End view</text></svg></div>",
    "options": [
      {
        "text": "659.4 cm²",
        "correct": false,
        "feedback": "Used a full circle of radius 5 for each end instead of a ring: \\(2 \\times 3.14 \\times 5 \\times 5 = 157\\), so \\(502.4 + 157 = 659.4\\), giving 659.4 cm². The hole in each end is empty, so subtract it."
      },
      {
        "text": "602.88 cm²",
        "correct": true,
        "feedback": "Correct. The outer curved surface is \\(2 \\times 3.14 \\times 5 \\times 10 = 314\\) and the inner curved surface is \\(2 \\times 3.14 \\times 3 \\times 10 = 188.4\\). Each flat end is a ring. The circles differ in area by \\(25 - 9 = 16\\) (times π), so one ring is \\(3.14 \\times 16 = 50.24\\) and the two ends are 100.48. The total is \\(314 + 188.4 + 100.48 = 602.88\\text{ cm}^2\\)."
      },
      {
        "text": "527.52 cm²",
        "correct": false,
        "feedback": "Subtracted the radii before squaring, \\((5 - 3) \\times (5 - 3) = 4\\), so the two ends came to \\(2 \\times 3.14 \\times 4 = 25.12\\) and \\(502.4 + 25.12 = 527.52\\), giving 527.52 cm². Subtract the areas of the circles, \\(5 \\times 5 - 3 \\times 3\\), not the radii."
      },
      {
        "text": "502.4 cm²",
        "correct": false,
        "feedback": "Found only the two curved surfaces, \\(314 + 188.4 = 502.4\\), giving 502.4 cm². The two flat ring-shaped ends, 100.48 in total, must be added."
      }
    ],
    "backward": "Circumference and area of a circle, Ch7.",
    "forward": "Later in this chapter you meet more composite solids."
  },
  {
    "itemId": "d18",
    "order": 18,
    "cluster": "C1",
    "clusterName": "Volume of prisms and cylinders",
    "question": "A solid cylinder of radius 5 cm and height 10 cm fits exactly inside a cube of edge 10 cm, touching all the sides. Use \\(\\pi = 3.14\\). What is the volume of the space between the cylinder and the cube?",
    "options": [
      {
        "text": "215 cm³",
        "correct": true,
        "feedback": "Correct. The cube has volume \\(10 \\times 10 \\times 10 = 1000\\text{ cm}^3\\). The cylinder has volume \\(3.14 \\times 5 \\times 5 \\times 10 = 785\\text{ cm}^3\\). The space between them is \\(1000 - 785 = 215\\text{ cm}^3\\)."
      },
      {
        "text": "686 cm³",
        "correct": false,
        "feedback": "Used \\(\\pi \\times 2 \\times r \\times h\\), the curved surface area \\(2 \\times 3.14 \\times 5 \\times 10 = 314\\), for the cylinder: \\(1000 - 314 = 686\\), giving 686 cm³. A volume uses the area of the circular end, \\(\\pi \\times r \\times r\\), times the height."
      },
      {
        "text": "785 cm³",
        "correct": false,
        "feedback": "Found only the volume of the cylinder, \\(3.14 \\times 5 \\times 5 \\times 10 = 785\\), giving 785 cm³. The space is what is left in the cube."
      },
      {
        "text": "1785 cm³",
        "correct": false,
        "feedback": "Added the volumes: \\(1000 + 785 = 1785\\), giving 1785 cm³. The cylinder is inside the cube, so subtract."
      }
    ],
    "backward": "Area of a circle, Ch7.",
    "forward": "Later in this chapter you meet more problems that compare solids."
  },
  {
    "itemId": "d19",
    "order": 19,
    "cluster": "C1",
    "clusterName": "Volume of prisms and cylinders",
    "question": "The diagram shows a shed that is a cuboid with a triangular prism as its roof. What is the total volume of the shed?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 307 306\" width=\"307\" height=\"306\" role=\"img\" aria-label=\"Shed with a cuboid body 3 m long, 2 m wide and 2.4 m high and a triangular-prism roof of height 0.9 m running the full length.\"><rect x=\"0\" y=\"0\" width=\"307\" height=\"306\" fill=\"#ffffff\"/><polygon points=\"58,134.86 108.48,89.43 158.95,134.86 158.95,256 58,256\" fill=\"#eef4fa\" stroke=\"none\"/><polygon points=\"158.95,256 158.95,134.86 220.97,91.43 220.97,212.57\" fill=\"#eef4fa\" stroke=\"none\"/><polygon points=\"158.95,134.86 108.48,89.43 170.5,46 220.97,91.43\" fill=\"#eef4fa\" stroke=\"none\"/><line x1=\"120.02\" y1=\"212.57\" x2=\"220.97\" y2=\"212.57\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"120.02\" y1=\"91.43\" x2=\"170.5\" y2=\"46\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"120.02\" y1=\"212.57\" x2=\"120.02\" y2=\"91.43\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"58\" y1=\"256\" x2=\"120.02\" y2=\"212.57\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"58\" y1=\"134.86\" x2=\"120.02\" y2=\"91.43\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"58\" y1=\"134.86\" x2=\"108.48\" y2=\"89.43\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"108.48\" y1=\"89.43\" x2=\"158.95\" y2=\"134.86\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"158.95\" y1=\"256\" x2=\"158.95\" y2=\"134.86\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"58\" y1=\"256\" x2=\"158.95\" y2=\"256\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"58\" y1=\"256\" x2=\"58\" y2=\"134.86\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"220.97\" y1=\"212.57\" x2=\"220.97\" y2=\"91.43\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"170.5\" y1=\"46\" x2=\"220.97\" y2=\"91.43\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"158.95\" y1=\"256\" x2=\"220.97\" y2=\"212.57\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"158.95\" y1=\"134.86\" x2=\"220.97\" y2=\"91.43\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"108.48\" y1=\"89.43\" x2=\"170.5\" y2=\"46\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"112.48\" y1=\"89.43\" x2=\"250.97\" y2=\"89.43\" stroke=\"#888888\" stroke-width=\"1\"/><line x1=\"162.95\" y1=\"134.86\" x2=\"250.97\" y2=\"134.86\" stroke=\"#888888\" stroke-width=\"1\"/><line x1=\"246.97\" y1=\"89.43\" x2=\"246.97\" y2=\"134.86\" stroke=\"#333333\" stroke-width=\"1.5\"/><polyline points=\"242.97,97.43 246.97,89.43 250.97,97.43\" stroke=\"#333333\" stroke-width=\"1.5\" fill=\"none\"/><polyline points=\"242.97,126.86 246.97,134.86 250.97,126.86\" stroke=\"#333333\" stroke-width=\"1.5\" fill=\"none\"/><text x=\"108.48\" y=\"276\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">2 m</text><text x=\"47\" y=\"200.43\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"end\">2.4 m</text><text x=\"199.6\" y=\"246.51\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"start\">3 m</text><text x=\"254.97\" y=\"117.14\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"start\">0.9 m</text></svg></div>",
    "options": [
      {
        "text": "17.1 m³",
        "correct": true,
        "feedback": "Correct. The cuboid has volume \\(3 \\times 2 \\times 2.4 = 14.4\\text{ m}^3\\). The roof's triangular end has area \\(\\tfrac{1}{2} \\times 2 \\times 0.9 = 0.9\\text{ m}^2\\), so the roof has volume \\(0.9 \\times 3 = 2.7\\text{ m}^3\\). The total is \\(14.4 + 2.7 = 17.1\\text{ m}^3\\)."
      },
      {
        "text": "14.4 m³",
        "correct": false,
        "feedback": "Found only the cuboid body, \\(3 \\times 2 \\times 2.4 = 14.4\\), giving 14.4 m³. The roof is part of the shed, so add its volume, 2.7."
      },
      {
        "text": "16.2 m³",
        "correct": false,
        "feedback": "Used the width of the shed, 2 m, as the length of the roof: \\(0.9 \\times 2 = 1.8\\), so \\(14.4 + 1.8 = 16.2\\), giving 16.2 m³. The roof runs the full 3 m length."
      },
      {
        "text": "15.3 m³",
        "correct": false,
        "feedback": "Added the area of the triangle, \\(\\tfrac{1}{2} \\times 2 \\times 0.9 = 0.9\\), without multiplying by the length: \\(14.4 + 0.9 = 15.3\\), giving 15.3 m³. Multiply by the length of the roof, 3, to get its volume."
      }
    ],
    "backward": "Areas of compound shapes, Ch7.",
    "forward": "Later in this chapter you meet more composite solids."
  },
  {
    "itemId": "d20",
    "order": 20,
    "cluster": "C4",
    "clusterName": "Surface area of pyramids",
    "question": "The four triangular faces of a square-based pyramid have a total area of 700 cm². The base edge is 14 cm. What is the vertical height of the pyramid?",
    "options": [
      {
        "text": "50 cm",
        "correct": false,
        "feedback": "Divided the area by the base edge without halving: \\(700 \\div 14 = 50\\), giving 50 cm. The area of a face is \\(\\tfrac{1}{2} \\times \\text{base} \\times \\text{height}\\), and 700 covers four faces."
      },
      {
        "text": "24 cm",
        "correct": true,
        "feedback": "Correct. Each face has area \\(700 \\div 4 = 175\\), so \\(\\tfrac{1}{2} \\times 14 \\times \\text{slant height} = 175\\), which gives a slant height of \\(175 \\div 7 = 25\\text{ cm}\\). Half the base is 7, so vertical height² = \\(25 \\times 25 - 7 \\times 7 = 625 - 49 = 576\\), and the vertical height is 24 cm."
      },
      {
        "text": "26 cm",
        "correct": false,
        "feedback": "Added the squares, \\(625 + 49 = 674\\), and took the square root, about 26, giving 26 cm. The slant height is the hypotenuse, so subtract the squares."
      },
      {
        "text": "25 cm",
        "correct": false,
        "feedback": "Stopped at the slant height, 25, giving 25 cm. The question asks for the vertical height, which is a shorter side of the right-angled triangle: \\(625 - 49 = 576\\), then the square root."
      }
    ],
    "backward": "Pythagoras' theorem, Ch5.",
    "forward": "Later in this chapter you meet more problems that work backwards from an area."
  },
  {
    "itemId": "d21",
    "order": 21,
    "cluster": "C6",
    "clusterName": "Mixed 3D problems",
    "question": "A square sheet of card has sides of 16 cm. A square of side 3 cm is cut from each corner and the sides are folded up to make an open box with no lid. What is the total area of the outside of the box, including the base?",
    "options": [
      {
        "text": "247 cm²",
        "correct": false,
        "feedback": "Removed only one corner square: \\(16 \\times 16 - 3 \\times 3 = 247\\), giving 247 cm². All four corners are cut away, \\(4 \\times (3 \\times 3) = 36\\)."
      },
      {
        "text": "256 cm²",
        "correct": false,
        "feedback": "Gave the area of the whole sheet, \\(16 \\times 16 = 256\\), giving 256 cm². The four corner squares are cut away and are not part of the box."
      },
      {
        "text": "220 cm²",
        "correct": true,
        "feedback": "Correct. The box is made from the sheet with the four corner squares removed, and folding does not change the area of card. The area is \\(16 \\times 16 - 4 \\times (3 \\times 3) = 256 - 36 = 220\\text{ cm}^2\\)."
      },
      {
        "text": "100 cm²",
        "correct": false,
        "feedback": "Found only the base of the box, \\((16 - 2 \\times 3) \\times (16 - 2 \\times 3) = 10 \\times 10 = 100\\), giving 100 cm². The four folded-up sides are part of the outside too."
      }
    ],
    "backward": "Areas of squares, Ch7.",
    "forward": "Later in this chapter you find the volume of boxes made in this way."
  },
  {
    "itemId": "d22",
    "order": 22,
    "cluster": "C3",
    "clusterName": "Surface area of cylinders",
    "question": "Which of these statements about a solid cylinder is correct?",
    "options": [
      {
        "text": "It has exactly 2 planes of symmetry",
        "correct": false,
        "feedback": "Not correct: It has exactly 2 planes of symmetry. Every plane that contains the axis of a cylinder is a plane of symmetry, and there are infinitely many of them."
      },
      {
        "text": "It has exactly 4 planes of symmetry",
        "correct": false,
        "feedback": "Not correct: It has exactly 4 planes of symmetry. 4 is the count for a square-based pyramid. A cylinder has a circular end with infinitely many lines of symmetry, so it has infinitely many planes through its axis."
      },
      {
        "text": "It has infinitely many planes of symmetry",
        "correct": true,
        "feedback": "Correct. Any plane that contains the axis of the cylinder cuts it into two mirror-image halves, and there are infinitely many such planes. There is also one plane across the middle of the height."
      },
      {
        "text": "It has no planes of symmetry",
        "correct": false,
        "feedback": "Not correct: It has no planes of symmetry. Any plane that contains the axis, and the plane across the middle of the height, cut a cylinder into mirror-image halves."
      }
    ],
    "backward": "Reflection and line symmetry, Ch13.",
    "forward": "Later in this chapter you use symmetry to simplify surface-area problems."
  },
  {
    "itemId": "d23",
    "order": 23,
    "cluster": "C6",
    "clusterName": "Mixed 3D problems",
    "question": "A closed cylinder has a radius of 5 cm and a height of 10 cm. A cube has edges of 10 cm. Use \\(\\pi = 3.14\\). How much greater is the total surface area of the cube than the total surface area of the cylinder?",
    "options": [
      {
        "text": "129 cm²",
        "correct": true,
        "feedback": "Correct. The cylinder has surface area \\(2 \\times \\pi \\times r \\times (r + h) = 2 \\times 3.14 \\times 5 \\times 15 = 471\\text{ cm}^2\\). The cube has surface area \\(6 \\times (10 \\times 10) = 600\\text{ cm}^2\\). The difference is \\(600 - 471 = 129\\text{ cm}^2\\)."
      },
      {
        "text": "471 cm²",
        "correct": false,
        "feedback": "Gave the surface area of the cylinder, 471, giving 471 cm². The question asks for the difference between the cube's area and the cylinder's."
      },
      {
        "text": "286 cm²",
        "correct": false,
        "feedback": "Used only the curved surface of the cylinder, \\(2 \\times 3.14 \\times 5 \\times 10 = 314\\): \\(600 - 314 = 286\\), giving 286 cm². The closed cylinder also has two circular ends, so use its total surface area, 471."
      },
      {
        "text": "600 cm²",
        "correct": false,
        "feedback": "Gave the surface area of the cube, 600, giving 600 cm². The question asks how much greater it is, so subtract the cylinder's surface area, 471."
      }
    ],
    "backward": "Circumference and area of a circle, Ch7.",
    "forward": "Later in this chapter you compare more solids."
  },
  {
    "itemId": "d24",
    "order": 24,
    "cluster": "C2",
    "clusterName": "Surface area of cuboids and triangular prisms",
    "question": "A solid metal cuboid measures 27 cm by 9 cm by 3 cm. It is melted and recast into a solid cube with no loss of metal. What is the total surface area of the cube?",
    "options": [
      {
        "text": "729 cm²",
        "correct": false,
        "feedback": "Gave the volume, 729, as an area, giving 729 cm². Surface area is the total area of the 6 faces, \\(6 \\times (9 \\times 9)\\)."
      },
      {
        "text": "702 cm²",
        "correct": false,
        "feedback": "Found the surface area of the original cuboid, \\(2 \\times (27 \\times 9) + 2 \\times (27 \\times 3) + 2 \\times (9 \\times 3) = 702\\), giving 702 cm². The question asks for the cube, whose edge is 9 cm."
      },
      {
        "text": "81 cm²",
        "correct": false,
        "feedback": "Found the area of one face of the cube, \\(9 \\times 9 = 81\\), giving 81 cm². The cube has 6 faces."
      },
      {
        "text": "486 cm²",
        "correct": true,
        "feedback": "Correct. The volume of metal is \\(27 \\times 9 \\times 3 = 729\\text{ cm}^3\\). The cube has the same volume, so its edge is 9 cm, because \\(9 \\times 9 \\times 9 = 729\\). The cube has 6 faces, so its surface area is \\(6 \\times (9 \\times 9) = 486\\text{ cm}^2\\)."
      }
    ],
    "backward": "Indices, Ch1.",
    "forward": "Later in this chapter you meet more problems that change one solid into another."
  }
];

const recheckItems = [
  {
    "itemId": "r1",
    "order": 1,
    "cluster": "C1",
    "clusterName": "Volume of prisms and cylinders",
    "question": "The diagram shows a metal pipe. Use \\(\\pi = 3.14\\). What is the volume of metal in the pipe?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 618 298\" width=\"618\" height=\"298\" role=\"img\" aria-label=\"Hollow pipe, outer radius 6 cm, inner radius 2 cm, length 8 cm.\"><rect x=\"0\" y=\"0\" width=\"618\" height=\"298\" fill=\"#ffffff\"/><line x1=\"90\" y1=\"40\" x2=\"223.33\" y2=\"40\" stroke=\"#333333\" stroke-width=\"2\"/><line x1=\"90\" y1=\"240\" x2=\"223.33\" y2=\"240\" stroke=\"#333333\" stroke-width=\"2\"/><ellipse cx=\"90\" cy=\"140\" rx=\"30\" ry=\"100\" fill=\"#eef4fa\" stroke=\"#333333\" stroke-width=\"2\"/><ellipse cx=\"90\" cy=\"140\" rx=\"10\" ry=\"33.33\" fill=\"#ffffff\" stroke=\"#333333\" stroke-width=\"2\"/><path d=\"M 223.33 40 A 30 100 0 0 1 223.33 240\" fill=\"none\" stroke=\"#333333\" stroke-width=\"2\"/><path d=\"M 223.33 40 A 30 100 0 0 0 223.33 240\" fill=\"none\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"90\" y1=\"258\" x2=\"223.33\" y2=\"258\" stroke=\"#333333\" stroke-width=\"1.5\"/><line x1=\"90\" y1=\"254\" x2=\"90\" y2=\"262\" stroke=\"#333333\" stroke-width=\"1.5\"/><line x1=\"223.33\" y1=\"254\" x2=\"223.33\" y2=\"262\" stroke=\"#333333\" stroke-width=\"1.5\"/><text x=\"156.67\" y=\"278\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">8 cm</text><circle cx=\"438.33\" cy=\"140\" r=\"100\" fill=\"#eef4fa\" stroke=\"#333333\" stroke-width=\"2\"/><circle cx=\"438.33\" cy=\"140\" r=\"33.33\" fill=\"#ffffff\" stroke=\"#333333\" stroke-width=\"2\"/><line x1=\"438.33\" y1=\"140\" x2=\"514.94\" y2=\"75.72\" stroke=\"#333333\" stroke-width=\"1.8\"/><line x1=\"438.33\" y1=\"140\" x2=\"438.33\" y2=\"173.33\" stroke=\"#333333\" stroke-width=\"1.8\"/><circle cx=\"438.33\" cy=\"140\" r=\"3\" fill=\"#333333\"/><text x=\"546.33\" y=\"95\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"start\">6 cm</text><rect x=\"445.33\" y=\"149.33\" width=\"35.6\" height=\"18\" fill=\"#ffffff\"/><text x=\"445.33\" y=\"162.33\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"start\">2 cm</text><text x=\"438.33\" y=\"264\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">End view</text></svg></div>",
    "options": [
      {
        "text": "401.92 cm³",
        "correct": false,
        "feedback": "Subtracted the radii first, \\(6 - 2 = 4\\), and used \\(3.14 \\times 4 \\times 4 \\times 8 = 401.92\\), giving 401.92 cm³. Subtract the areas of the circles, not the radii."
      },
      {
        "text": "904.32 cm³",
        "correct": false,
        "feedback": "Found the volume of the whole outer cylinder, \\(3.14 \\times 6 \\times 6 \\times 8 = 904.32\\), giving 904.32 cm³. The hole is empty, so its volume must be subtracted."
      },
      {
        "text": "100.48 cm³",
        "correct": false,
        "feedback": "Found only the volume of the hole, \\(3.14 \\times 2 \\times 2 \\times 8 = 100.48\\), giving 100.48 cm³. The metal is the outer cylinder minus the hole."
      },
      {
        "text": "803.84 cm³",
        "correct": true,
        "feedback": "Correct. The metal is the outer cylinder minus the hole. The outer cylinder is \\(3.14 \\times 6 \\times 6 \\times 8 = 904.32\\) and the hole is \\(3.14 \\times 2 \\times 2 \\times 8 = 100.48\\). The metal is \\(904.32 - 100.48 = 803.84\\text{ cm}^3\\)."
      }
    ],
    "backward": "Area of a circle, Ch7.",
    "forward": "Later in this chapter you find the surface area of the same kind of pipe."
  },
  {
    "itemId": "r2",
    "order": 2,
    "cluster": "C4",
    "clusterName": "Surface area of pyramids",
    "question": "A model pyramid is made from one rectangular sheet of card that is 15 cm by 20 cm. The pyramid has a square base of edge 6 cm and a vertical height of 4 cm. The model uses its total surface area in card. What percentage of the sheet is used?",
    "options": [
      {
        "text": "20%",
        "correct": false,
        "feedback": "Left out the square base: \\(4 \\times 15 = 60\\), and \\(60 \\div 300 \\times 100 = 20\\), giving 20%. The model also needs the base, 36 cm²."
      },
      {
        "text": "12%",
        "correct": false,
        "feedback": "Found only the base: \\(6 \\times 6 = 36\\), and \\(36 \\div 300 \\times 100 = 12\\), giving 12%. The four triangular faces must be included too."
      },
      {
        "text": "22%",
        "correct": false,
        "feedback": "Counted only two triangular faces with the base: \\(6 \\times 6 + 2 \\times 15 = 66\\), and \\(66 \\div 300 \\times 100 = 22\\), giving 22%. A pyramid has four triangular faces."
      },
      {
        "text": "32%",
        "correct": true,
        "feedback": "Correct. Half the base edge is 3, and \\(3 \\times 3 + 4 \\times 4 = 25\\), so the slant height is 5 cm. The surface area is \\(6 \\times 6 + 4 \\times (\\tfrac{1}{2} \\times 6 \\times 5 = 15) = 36 + 60 = 96\\text{ cm}^2\\). The sheet is \\(15 \\times 20 = 300\\text{ cm}^2\\), so \\(96 \\div 300 \\times 100 = 32\\)%."
      }
    ],
    "backward": "Percentages, Ch3, and Pythagoras' theorem, Ch5.",
    "forward": "Later in this chapter you find areas of other joined solids."
  },
  {
    "itemId": "r3",
    "order": 3,
    "cluster": "C2",
    "clusterName": "Surface area of cuboids and triangular prisms",
    "question": "The diagram shows a small cube cut away from one corner of a large cube. What is the total surface area of the solid that is left?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 374 306\" width=\"374\" height=\"306\" role=\"img\" aria-label=\"Cube of edge 7 cm with a cube of edge 2 cm removed from one corner.\"><rect x=\"0\" y=\"0\" width=\"374\" height=\"306\" fill=\"#ffffff\"/><polygon points=\"58,256 221.2,256 221.2,139.43 174.57,139.43 174.57,92.8 58,92.8\" fill=\"#eef4fa\" stroke=\"none\"/><polygon points=\"221.2,256 288.04,209.2 288.04,46 240.29,79.43 240.29,126.06 221.2,139.43\" fill=\"#eef4fa\" stroke=\"none\"/><polygon points=\"58,92.8 174.57,92.8 193.67,79.43 240.29,79.43 288.04,46 124.84,46\" fill=\"#eef4fa\" stroke=\"none\"/><polygon points=\"174.57,139.43 193.67,126.06 193.67,79.43 174.57,92.8\" fill=\"#eef4fa\" stroke=\"none\"/><polygon points=\"193.67,126.06 240.29,126.06 240.29,79.43 193.67,79.43\" fill=\"#eef4fa\" stroke=\"none\"/><polygon points=\"174.57,139.43 221.2,139.43 240.29,126.06 193.67,126.06\" fill=\"#eef4fa\" stroke=\"none\"/><line x1=\"124.84\" y1=\"209.2\" x2=\"288.04\" y2=\"209.2\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"124.84\" y1=\"209.2\" x2=\"124.84\" y2=\"46\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"58\" y1=\"256\" x2=\"124.84\" y2=\"209.2\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"58\" y1=\"256\" x2=\"221.2\" y2=\"256\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"221.2\" y1=\"256\" x2=\"221.2\" y2=\"139.43\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"174.57\" y1=\"139.43\" x2=\"221.2\" y2=\"139.43\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"174.57\" y1=\"139.43\" x2=\"174.57\" y2=\"92.8\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"58\" y1=\"92.8\" x2=\"174.57\" y2=\"92.8\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"58\" y1=\"256\" x2=\"58\" y2=\"92.8\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"288.04\" y1=\"209.2\" x2=\"288.04\" y2=\"46\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"124.84\" y1=\"46\" x2=\"288.04\" y2=\"46\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"58\" y1=\"92.8\" x2=\"124.84\" y2=\"46\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"221.2\" y1=\"256\" x2=\"288.04\" y2=\"209.2\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"240.29\" y1=\"79.43\" x2=\"288.04\" y2=\"46\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"240.29\" y1=\"126.06\" x2=\"240.29\" y2=\"79.43\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"221.2\" y1=\"139.43\" x2=\"240.29\" y2=\"126.06\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"174.57\" y1=\"92.8\" x2=\"193.67\" y2=\"79.43\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"193.67\" y1=\"79.43\" x2=\"240.29\" y2=\"79.43\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"174.57\" y1=\"139.43\" x2=\"193.67\" y2=\"126.06\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"193.67\" y1=\"126.06\" x2=\"193.67\" y2=\"79.43\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"193.67\" y1=\"126.06\" x2=\"240.29\" y2=\"126.06\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><text x=\"139.6\" y=\"276\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">7 cm</text><text x=\"47\" y=\"179.4\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"end\">7 cm</text><text x=\"197.88\" y=\"158.43\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">2 cm</text></svg></div>",
    "options": [
      {
        "text": "286 cm²",
        "correct": false,
        "feedback": "Subtracted the volume of the small cube, \\(2 \\times 2 \\times 2 = 8\\): \\(294 - 8 = 286\\), giving 286 cm². A volume cannot be subtracted from an area."
      },
      {
        "text": "294 cm²",
        "correct": true,
        "feedback": "Correct. The original cube has surface area \\(6 \\times (7 \\times 7) = 294\\text{ cm}^2\\). Cutting out the corner removes 3 small squares from the outside, \\(3 \\times (2 \\times 2) = 12\\), but exposes 3 new faces of the same size inside the notch, another 12. So the surface area is unchanged: \\(294 - 12 + 12 = 294\\text{ cm}^2\\)."
      },
      {
        "text": "282 cm²",
        "correct": false,
        "feedback": "Removed the 3 small squares but did not add the 3 new faces inside the notch: \\(294 - 12 = 282\\), giving 282 cm². The notch has 3 new faces."
      },
      {
        "text": "306 cm²",
        "correct": false,
        "feedback": "Added the 3 new faces but did not take away the 3 squares that were cut off: \\(294 + 12 = 306\\), giving 306 cm². Three squares on the outside are gone."
      }
    ],
    "backward": "Areas of squares, Ch7.",
    "forward": "Later in this chapter you look at other solids with parts removed."
  },
  {
    "itemId": "r4",
    "order": 4,
    "cluster": "C6",
    "clusterName": "Mixed 3D problems",
    "question": "The diagram shows a cuboid cut into two identical pieces along the dashed plane of symmetry. By how much does the total surface area increase?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 394 213\" width=\"394\" height=\"213\" role=\"img\" aria-label=\"Cuboid 10 cm by 7 cm by 4 cm with a dashed plane across the middle of the length.\"><rect x=\"0\" y=\"0\" width=\"394\" height=\"213\" fill=\"#ffffff\"/><polygon points=\"58,85.01 252.29,85.01 252.29,162.72 58,162.72\" fill=\"#eef4fa\" stroke=\"none\"/><polygon points=\"252.29,162.72 252.29,85.01 308,46 308,123.72\" fill=\"#eef4fa\" stroke=\"none\"/><polygon points=\"252.29,85.01 58,85.01 113.71,46 308,46\" fill=\"#eef4fa\" stroke=\"none\"/><polygon points=\"155.15,162.72 210.85,123.72 210.85,46 155.15,85.01\" fill=\"#c0392b\" fill-opacity=\"0.16\" stroke=\"#c0392b\" stroke-width=\"1.8\" stroke-dasharray=\"6 4\" stroke-linejoin=\"round\"/><line x1=\"113.71\" y1=\"123.72\" x2=\"308\" y2=\"123.72\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"113.71\" y1=\"123.72\" x2=\"113.71\" y2=\"46\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"58\" y1=\"162.72\" x2=\"113.71\" y2=\"123.72\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"58\" y1=\"85.01\" x2=\"252.29\" y2=\"85.01\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"252.29\" y1=\"162.72\" x2=\"252.29\" y2=\"85.01\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"58\" y1=\"162.72\" x2=\"252.29\" y2=\"162.72\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"58\" y1=\"162.72\" x2=\"58\" y2=\"85.01\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"308\" y1=\"123.72\" x2=\"308\" y2=\"46\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"113.71\" y1=\"46\" x2=\"308\" y2=\"46\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"252.29\" y1=\"162.72\" x2=\"308\" y2=\"123.72\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"252.29\" y1=\"85.01\" x2=\"308\" y2=\"46\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"58\" y1=\"85.01\" x2=\"113.71\" y2=\"46\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><text x=\"155.15\" y=\"182.72\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">10 cm</text><text x=\"289.79\" y=\"155.45\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"start\">7 cm</text><text x=\"47\" y=\"128.86\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"end\">4 cm</text></svg></div>",
    "options": [
      {
        "text": "70 cm²",
        "correct": false,
        "feedback": "Used the 10 by 7 face once: \\(10 \\times 7 = 70\\), giving 70 cm². The cut faces are 7 by 4, and there are 2 of them."
      },
      {
        "text": "56 cm²",
        "correct": true,
        "feedback": "Correct. The cut makes two new faces, one on each piece, and each is a 7 by 4 rectangle. The increase is \\(2 \\times (7 \\times 4) = 56\\text{ cm}^2\\)."
      },
      {
        "text": "140 cm²",
        "correct": false,
        "feedback": "Used the 10 by 7 face for the cut: \\(2 \\times (10 \\times 7) = 140\\), giving 140 cm². The plane is parallel to the 7 by 4 faces, so the new faces are 7 by 4."
      },
      {
        "text": "280 cm²",
        "correct": false,
        "feedback": "Found the volume, \\(10 \\times 7 \\times 4 = 280\\), and gave it as 280 cm². The increase in area comes from the two new faces."
      }
    ],
    "backward": "Reflection and line symmetry, Ch13.",
    "forward": "Later in this chapter you cut cylinders in the same way."
  },
  {
    "itemId": "r5",
    "order": 5,
    "cluster": "C3",
    "clusterName": "Surface area of cylinders",
    "question": "Two cylinders have the same height. The first has a radius of 2 cm and the second has a radius of 10 cm. What is the ratio of the curved surface area of the first cylinder to that of the second?",
    "options": [
      {
        "text": "\\(1:5\\)",
        "correct": true,
        "feedback": "Correct. The curved surface area is \\(2 \\times \\pi \\times r \\times h\\). With the same height, it depends only on the radius, so the ratio is \\(2:10\\), which simplifies to \\(1:5\\)."
      },
      {
        "text": "\\(1:125\\)",
        "correct": false,
        "feedback": "Cubed the radii, \\(8:1000\\), giving \\(1:125\\). The curved surface uses the radius once, so the ratio is \\(2:10\\)."
      },
      {
        "text": "\\(5:1\\)",
        "correct": false,
        "feedback": "Wrote the ratio the wrong way round, second to first, as \\(5:1\\). The question asks for the first cylinder to the second, \\(2:10\\), which is \\(1:5\\)."
      },
      {
        "text": "\\(1:25\\)",
        "correct": false,
        "feedback": "Squared the radii, \\(4:100\\), as in the area of a circle, giving \\(1:25\\). The curved surface uses \\(2 \\times \\pi \\times r \\times h\\), where the radius appears once."
      }
    ],
    "backward": "Ratio, Ch11.",
    "forward": "Later in this chapter you compare the surface areas of solids in the same way."
  },
  {
    "itemId": "r6",
    "order": 6,
    "cluster": "C1",
    "clusterName": "Volume of prisms and cylinders",
    "question": "A full cylindrical tank has a radius of 2 m and a height of 3 m. Water is pumped out at 100 litres per minute. Use \\(\\pi = 3.14\\). How many minutes does it take to empty the tank?",
    "options": [
      {
        "text": "0.3768 minutes",
        "correct": false,
        "feedback": "Divided the volume in m³ by the rate without converting to litres: \\(37.68 \\div 100 = 0.3768\\), giving 0.3768 minutes. The rate is in litres, and 1 m³ is 1000 litres."
      },
      {
        "text": "37.68 minutes",
        "correct": false,
        "feedback": "Found the volume, 37.68 m³, and gave 37.68 minutes. A volume is not a time; convert to litres, 37 680, then divide by the pumping rate, 100 litres per minute."
      },
      {
        "text": "376.8 minutes",
        "correct": true,
        "feedback": "Correct. The volume is \\(3.14 \\times 2 \\times 2 \\times 3 = 37.68\\text{ m}^3\\). One m³ is 1000 litres, so the tank holds \\(37.68 \\times 1000 = 37\\,680\\) litres. At 100 litres per minute, the time is \\(37\\,680 \\div 100 = 376.8\\) minutes."
      },
      {
        "text": "1507.2 minutes",
        "correct": false,
        "feedback": "Used the diameter, 4 m, as the radius: \\(3.14 \\times 4 \\times 4 \\times 3 = 150.72\\text{ m}^3\\), so 150 720 litres, and \\(150\\,720 \\div 100 = 1507.2\\), giving 1507.2 minutes. The radius of the tank is 2 m."
      }
    ],
    "backward": "Large and small units, Ch7.",
    "forward": "Later in this chapter you meet other rates of filling and emptying."
  },
  {
    "itemId": "r7",
    "order": 7,
    "cluster": "C3",
    "clusterName": "Surface area of cylinders",
    "question": "A solid metal cylinder of radius 4 cm and height 5 cm is lowered into a tank of water with a rectangular base measuring 25 cm by 20 cm. The cylinder is completely covered by water. Use \\(\\pi = 3.14\\). By how many centimetres does the water level rise?",
    "options": [
      {
        "text": "0.5024 cm",
        "correct": true,
        "feedback": "Correct. The water that is pushed up has the same volume as the cylinder: \\(3.14 \\times 4 \\times 4 \\times 5 = 251.2\\text{ cm}^3\\). This spreads over the base of the tank, \\(25 \\times 20 = 500\\text{ cm}^2\\), so the rise is \\(251.2 \\div 500 = 0.5024\\text{ cm}\\)."
      },
      {
        "text": "10.048 cm",
        "correct": false,
        "feedback": "Divided by only one side of the tank base, \\(251.2 \\div 25 = 10.048\\), giving 10.048 cm. Divide by the whole base area, \\(25 \\times 20 = 500\\)."
      },
      {
        "text": "251.2 cm",
        "correct": false,
        "feedback": "Found the volume of the cylinder, 251.2, and stopped, giving 251.2 cm. The volume must be divided by the base area of the tank to get a height."
      },
      {
        "text": "0.10048 cm",
        "correct": false,
        "feedback": "Used only the area of the circular end, \\(3.14 \\times 4 \\times 4 = 50.24\\), so \\(50.24 \\div 500 = 0.10048\\), giving 0.10048 cm. The cylinder's whole volume, 251.2, is what pushes the water up."
      }
    ],
    "backward": "Area of a circle, Ch7.",
    "forward": "Later in this chapter you use volumes in other practical problems."
  },
  {
    "itemId": "r8",
    "order": 8,
    "cluster": "C6",
    "clusterName": "Mixed 3D problems",
    "question": "The diagram shows a square-based pyramid and a closed cuboid. They have the same square base and the same vertical height. How much greater is the total surface area of the cuboid than the total surface area of the pyramid?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 454 286\" width=\"454\" height=\"286\" role=\"img\" aria-label=\"Square-based pyramid and closed cuboid with the same base edge 14 cm and the same height 24 cm.\"><rect x=\"0\" y=\"0\" width=\"454\" height=\"286\" fill=\"#ffffff\"/><polygon points=\"96,236 190.95,236 162.92,59.62\" fill=\"#eef4fa\" stroke=\"none\"/><polygon points=\"190.95,236 229.84,208.77 162.92,59.62\" fill=\"#eef4fa\" stroke=\"none\"/><polygon points=\"233.68,73.23 328.63,73.23 328.63,236 233.68,236\" fill=\"#eef4fa\" stroke=\"none\"/><polygon points=\"328.63,236 328.63,73.23 367.51,46 367.51,208.77\" fill=\"#eef4fa\" stroke=\"none\"/><polygon points=\"328.63,73.23 233.68,73.23 272.56,46 367.51,46\" fill=\"#eef4fa\" stroke=\"none\"/><line x1=\"134.89\" y1=\"208.77\" x2=\"229.84\" y2=\"208.77\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"96\" y1=\"236\" x2=\"134.89\" y2=\"208.77\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"134.89\" y1=\"208.77\" x2=\"162.92\" y2=\"59.62\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"272.56\" y1=\"208.77\" x2=\"367.51\" y2=\"208.77\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"272.56\" y1=\"208.77\" x2=\"272.56\" y2=\"46\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"233.68\" y1=\"236\" x2=\"272.56\" y2=\"208.77\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"96\" y1=\"236\" x2=\"190.95\" y2=\"236\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"190.95\" y1=\"236\" x2=\"229.84\" y2=\"208.77\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"162.92\" y1=\"59.62\" x2=\"190.95\" y2=\"236\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"96\" y1=\"236\" x2=\"162.92\" y2=\"59.62\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"162.92\" y1=\"59.62\" x2=\"229.84\" y2=\"208.77\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"233.68\" y1=\"73.23\" x2=\"328.63\" y2=\"73.23\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"328.63\" y1=\"236\" x2=\"328.63\" y2=\"73.23\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"233.68\" y1=\"236\" x2=\"328.63\" y2=\"236\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"233.68\" y1=\"236\" x2=\"233.68\" y2=\"73.23\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"367.51\" y1=\"208.77\" x2=\"367.51\" y2=\"46\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"272.56\" y1=\"46\" x2=\"367.51\" y2=\"46\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"328.63\" y1=\"236\" x2=\"367.51\" y2=\"208.77\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"328.63\" y1=\"73.23\" x2=\"367.51\" y2=\"46\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"233.68\" y1=\"73.23\" x2=\"272.56\" y2=\"46\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"162.92\" y1=\"59.62\" x2=\"162.92\" y2=\"222.38\" stroke=\"#c0392b\" stroke-width=\"1.8\" stroke-dasharray=\"6 4\"/><line x1=\"158.92\" y1=\"59.62\" x2=\"70\" y2=\"59.62\" stroke=\"#888888\" stroke-width=\"1\"/><line x1=\"158.92\" y1=\"222.38\" x2=\"70\" y2=\"222.38\" stroke=\"#888888\" stroke-width=\"1\"/><line x1=\"74\" y1=\"59.62\" x2=\"74\" y2=\"222.38\" stroke=\"#333333\" stroke-width=\"1.5\"/><polyline points=\"70,67.62 74,59.62 78,67.62\" stroke=\"#333333\" stroke-width=\"1.5\" fill=\"none\"/><polyline points=\"70,214.38 74,222.38 78,214.38\" stroke=\"#333333\" stroke-width=\"1.5\" fill=\"none\"/><text x=\"143.47\" y=\"256\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">14 cm</text><text x=\"281.15\" y=\"256\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">14 cm</text><text x=\"378.51\" y=\"132.38\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"start\">24 cm</text><text x=\"66\" y=\"146\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"end\">24 cm</text></svg></div>",
    "options": [
      {
        "text": "1036 cm²",
        "correct": false,
        "feedback": "Left out the base of the pyramid: \\(1736 - 700 = 1036\\), giving 1036 cm². The pyramid's square base is part of its surface, 196 cm²."
      },
      {
        "text": "1736 cm²",
        "correct": false,
        "feedback": "Gave the surface area of the cuboid, 1736, giving 1736 cm². The question asks how much greater it is than the pyramid's, 896 cm²."
      },
      {
        "text": "840 cm²",
        "correct": true,
        "feedback": "Correct. For the pyramid, half the base edge is 7 and \\(7 \\times 7 + 24 \\times 24 = 625\\), so the slant height is 25 cm. Its surface area is \\(196 + 4 \\times (\\tfrac{1}{2} \\times 14 \\times 25 = 175) = 196 + 700 = 896\\text{ cm}^2\\). The cuboid has \\(2 \\times (14 \\times 14) + 4 \\times (14 \\times 24) = 392 + 1344 = 1736\\text{ cm}^2\\). The difference is \\(1736 - 896 = 840\\text{ cm}^2\\)."
      },
      {
        "text": "868 cm²",
        "correct": false,
        "feedback": "Used the vertical height, 24, as the height of each triangular face: the pyramid came to \\(196 + 4 \\times (\\tfrac{1}{2} \\times 14 \\times 24 = 168) = 868\\), so the difference was \\(1736 - 868 = 868\\), giving 868 cm². The height of a face is the slant height, 25 cm."
      }
    ],
    "backward": "Pythagoras' theorem, Ch5.",
    "forward": "Later in this chapter you compare more solids."
  },
  {
    "itemId": "r9",
    "order": 9,
    "cluster": "C6",
    "clusterName": "Mixed 3D problems",
    "question": "A cube of edge 3 cm and a cuboid measuring 9 cm by 3 cm by 1 cm have the same volume. How much more surface area does the cuboid have than the cube?",
    "options": [
      {
        "text": "12 cm²",
        "correct": false,
        "feedback": "Counted each different face once for both solids: \\(9 \\times 3 + 9 \\times 1 + 3 \\times 1 = 39\\) for the cuboid and \\(3 \\times (3 \\times 3) = 27\\) for the cube, and \\(39 - 27 = 12\\), giving 12 cm². Every face has a partner, so double: \\(2 \\times 12 = 24\\)."
      },
      {
        "text": "132 cm²",
        "correct": false,
        "feedback": "Added the two surface areas, \\(78 + 54 = 132\\), giving 132 cm². The question asks how much more the cuboid has than the cube, so subtract."
      },
      {
        "text": "54 cm²",
        "correct": false,
        "feedback": "Gave the surface area of the cube, 54, giving 54 cm². The question asks how much more the cuboid has, so subtract: \\(78 - 54\\)."
      },
      {
        "text": "24 cm²",
        "correct": true,
        "feedback": "Correct. The cube has surface area \\(6 \\times (3 \\times 3) = 54\\text{ cm}^2\\). The cuboid has \\(2 \\times (9 \\times 3) + 2 \\times (9 \\times 1) + 2 \\times (3 \\times 1) = 54 + 18 + 6 = 78\\text{ cm}^2\\). The difference is \\(78 - 54 = 24\\text{ cm}^2\\)."
      }
    ],
    "backward": "Areas of rectangles, Ch7.",
    "forward": "Later in this chapter you compare the surface areas of other solids."
  },
  {
    "itemId": "r10",
    "order": 10,
    "cluster": "C6",
    "clusterName": "Mixed 3D problems",
    "question": "The diagram shows a closed cylinder cut in half along a plane of symmetry. Use \\(\\pi = 3.14\\). What is the total surface area of the two halves together?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 380 298\" width=\"380\" height=\"298\" role=\"img\" aria-label=\"Closed cylinder, radius 4 cm, height 6 cm, cut by a dashed plane through its axis.\"><rect x=\"0\" y=\"0\" width=\"380\" height=\"298\" fill=\"#ffffff\"/><polygon points=\"70,76 270,76 270,226 70,226\" fill=\"#c0392b\" fill-opacity=\"0.16\" stroke=\"#c0392b\" stroke-width=\"1.8\" stroke-dasharray=\"6 4\"/><ellipse cx=\"170\" cy=\"76\" rx=\"100\" ry=\"30\" fill=\"#eef4fa\" stroke=\"#333333\" stroke-width=\"2\"/><line x1=\"70\" y1=\"76\" x2=\"70\" y2=\"226\" stroke=\"#333333\" stroke-width=\"2\"/><line x1=\"270\" y1=\"76\" x2=\"270\" y2=\"226\" stroke=\"#333333\" stroke-width=\"2\"/><path d=\"M 70 226 A 100 30 0 0 0 270 226\" fill=\"none\" stroke=\"#333333\" stroke-width=\"2\"/><path d=\"M 70 226 A 100 30 0 0 1 270 226\" fill=\"none\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"170\" y1=\"76\" x2=\"170\" y2=\"226\" stroke=\"#c0392b\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"170\" y1=\"76\" x2=\"270\" y2=\"76\" stroke=\"#333333\" stroke-width=\"1.8\"/><circle cx=\"170\" cy=\"76\" r=\"3\" fill=\"#333333\"/><text x=\"220\" y=\"40\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">4 cm</text><line x1=\"274\" y1=\"76\" x2=\"302\" y2=\"76\" stroke=\"#888888\" stroke-width=\"1\"/><line x1=\"274\" y1=\"226\" x2=\"302\" y2=\"226\" stroke=\"#888888\" stroke-width=\"1\"/><line x1=\"298\" y1=\"76\" x2=\"298\" y2=\"226\" stroke=\"#333333\" stroke-width=\"1.5\"/><polyline points=\"294,84 298,76 302,84\" stroke=\"#333333\" stroke-width=\"1.5\" fill=\"none\"/><polyline points=\"294,218 298,226 302,218\" stroke=\"#333333\" stroke-width=\"1.5\" fill=\"none\"/><text x=\"306\" y=\"156\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"start\">6 cm</text></svg></div>",
    "options": [
      {
        "text": "251.2 cm²",
        "correct": false,
        "feedback": "Gave the surface area of the whole cylinder, 251.2, giving 251.2 cm². The cut creates two new rectangular faces, 96 cm² in total."
      },
      {
        "text": "299.2 cm²",
        "correct": false,
        "feedback": "Used the radius instead of the diameter for the width of the cut faces: \\(251.2 + 2 \\times (4 \\times 6) = 251.2 + 48 = 299.2\\), giving 299.2 cm². The cut goes through the centre, so each face is 8 cm wide."
      },
      {
        "text": "347.2 cm²",
        "correct": true,
        "feedback": "Correct. The original surface area is \\(2 \\times \\pi \\times r \\times (r + h) = 2 \\times 3.14 \\times 4 \\times 10 = 251.2\\text{ cm}^2\\). The cut makes two new rectangular faces, each 8 cm (the diameter) by 6 cm, so they add \\(2 \\times (8 \\times 6) = 96\\text{ cm}^2\\). The total is \\(251.2 + 96 = 347.2\\text{ cm}^2\\)."
      },
      {
        "text": "155.2 cm²",
        "correct": false,
        "feedback": "Subtracted the new faces instead of adding them: \\(251.2 - 2 \\times (8 \\times 6) = 251.2 - 96 = 155.2\\), giving 155.2 cm². The cut exposes new surface, so the area goes up."
      }
    ],
    "backward": "Circumference and area of a circle, Ch7.",
    "forward": "Later in this chapter you use symmetry to simplify more problems."
  },
  {
    "itemId": "r11",
    "order": 11,
    "cluster": "C3",
    "clusterName": "Surface area of cylinders",
    "question": "A closed cylinder has a height equal to its diameter. What fraction of its total surface area is its curved surface?",
    "options": [
      {
        "text": "\\(\\frac{1}{3}\\)",
        "correct": false,
        "feedback": "Gave \\(\\frac{1}{3}\\), which is the fraction for the two circular ends. The curved surface is the other part, 4πr² out of the total 6πr², which is \\(\\frac{2}{3}\\)."
      },
      {
        "text": "\\(\\frac{2}{3}\\)",
        "correct": true,
        "feedback": "Correct. Let the radius be r, so the height is 2r. The curved surface is \\(2 \\times \\pi \\times r \\times 2r = 4\\pi r^2\\). The two circular ends are \\(2 \\times \\pi r^2 = 2\\pi r^2\\). The total is \\(4\\pi r^2 + 2\\pi r^2 = 6\\pi r^2\\), so the curved surface is \\(\\frac{4}{6} = \\frac{2}{3}\\) of it."
      },
      {
        "text": "\\(\\frac{1}{4}\\)",
        "correct": false,
        "feedback": "Gave \\(\\frac{1}{4}\\). The curved surface is 4πr² and the total is \\(4\\pi r^2 + 2\\pi r^2 = 6\\pi r^2\\), so the fraction is \\(\\frac{4}{6} = \\frac{2}{3}\\)."
      },
      {
        "text": "\\(\\frac{1}{2}\\)",
        "correct": false,
        "feedback": "Gave \\(\\frac{1}{2}\\), which is the answer when the height equals the radius. Here the height is the diameter, 2r, so the curved surface 4πr² is larger than the two ends together, 2πr²."
      }
    ],
    "backward": "Circumference and area of a circle, Ch7, and fractions, Ch8.",
    "forward": "Later in this chapter you compare other solids in the same way."
  },
  {
    "itemId": "r12",
    "order": 12,
    "cluster": "C1",
    "clusterName": "Volume of prisms and cylinders",
    "question": "A cuboid tank 25 cm long, 20 cm wide and 20 cm high is full of water. The water is poured into cylindrical tubs, each with a radius of 5 cm and a height of 8 cm. Use \\(\\pi = 3.14\\). How many tubs can be filled completely?",
    "options": [
      {
        "text": "15 tubs",
        "correct": true,
        "feedback": "Correct. The tank holds \\(25 \\times 20 \\times 20 = 10\\,000\\text{ cm}^3\\). One tub holds \\(3.14 \\times 5 \\times 5 \\times 8 = 628\\text{ cm}^3\\). The number of tubs is \\(10\\,000 \\div 628 \\approx 15.92\\), and only whole tubs can be filled completely, so 15 tubs."
      },
      {
        "text": "79 tubs",
        "correct": false,
        "feedback": "Used \\(\\pi \\times r \\times h = 3.14 \\times 5 \\times 8 = 125.6\\) for the volume of a tub instead of \\(\\pi \\times r \\times r \\times h\\), and \\(10\\,000 \\div 125.6\\) is about 79.62, so 79 tubs. The area of the circular end needs r squared, \\(5 \\times 5\\)."
      },
      {
        "text": "16 tubs",
        "correct": false,
        "feedback": "Rounded 15.92 up to 16, giving 16 tubs. The last tub would not be full, so only 15 tubs are filled completely."
      },
      {
        "text": "3 tubs",
        "correct": false,
        "feedback": "Used the diameter, 10, as the radius of a tub: \\(3.14 \\times 10 \\times 10 \\times 8 = 2512\\), and \\(10\\,000 \\div 2512\\) is about 3.98, so 3 tubs. The radius of each tub is 5 cm."
      }
    ],
    "backward": "Area of a circle, Ch7, and rounding, Ch3.",
    "forward": "Later in this chapter you meet more problems that join volumes."
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
  title: "Volume, Surface Area and Symmetry — Problem-Solving & Synthesis",
  subtitle: "Grade 8 · Level 3 · Problem-Solving & Synthesis",
  description: "Synthesis items mixing volume, surface area of composite solids and 3D symmetry — warm-up, diagnostic, and spaced recheck for synthesis-level fluency.",
  clusterNames: CLUSTER_NAMES,
  gateReviewHTML: "<p><strong>Warm-up done.</strong> Next comes the diagnostic. It is not a test and it is not timed, so there is no prize for speed. In this level many questions bring two topics together, for example a pyramid on top of a cuboid, a cylinder poured into a tank, or a solid cut along a plane of symmetry. Work out the first part, write the result down, and only then do the second part. If a question feels awkward, that tells us exactly where to look next, so it is useful, not a failure.</p><p>You will meet all six topics, mixed together. Take your time.</p>",
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

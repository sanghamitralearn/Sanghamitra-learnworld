// Volume, Surface Area and Symmetry — Grade 8, Level 2 (Advanced Core).
// Warm-up, diagnostic and spaced recheck items.
// Run with: node seed/mathSeedCh14VolumeSurfaceAreaSymmetryL2.js
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-8";
const GRADE_LABEL = "Grade 8";
const CHAPTER_SLUG = "ch-14-volume-surface-area-symmetry";
const CHAPTER_NAME = "Volume, Surface Area and Symmetry";
const LEVEL = 2;

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
    "question": "A cuboid has a volume of 180 cm³. Its base measures 9 cm by 4 cm. What is its height?",
    "options": [
      {
        "text": "5 cm",
        "correct": true,
        "feedback": "Correct. Volume = base area × height. The base area is \\(9 \\times 4 = 36\\text{ cm}^2\\), so the height is \\(180 \\div 36 = 5\\text{ cm}\\)."
      },
      {
        "text": "36 cm",
        "correct": false,
        "feedback": "Stopped after finding the base area, \\(9 \\times 4 = 36\\), giving 36 cm. That is an area. Divide the volume by it: \\(180 \\div 36\\)."
      },
      {
        "text": "20 cm",
        "correct": false,
        "feedback": "Divided the volume by only one side of the base, \\(180 \\div 9 = 20\\), giving 20 cm. Divide by the whole base area, \\(9 \\times 4 = 36\\)."
      },
      {
        "text": "6480 cm",
        "correct": false,
        "feedback": "Multiplied instead of dividing, \\(180 \\times 36 = 6480\\), giving 6480 cm. The volume is the base area times the height, so the height is the volume divided by the base area."
      }
    ],
    "retryHint": "Volume = base area × height. Find the base area first, then divide the volume by it.",
    "backward": "Solving equations, Ch4.",
    "forward": "Later in this chapter you find missing lengths in prisms and cylinders."
  },
  {
    "itemId": "w2",
    "order": 2,
    "cluster": "C4",
    "clusterName": "Surface area of pyramids",
    "question": "The pyramid in the diagram has a square base. Find the slant height of its triangular faces.<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 364 306\" width=\"364\" height=\"306\" role=\"img\" aria-label=\"Square-based pyramid, base edge 10 cm, vertical height 12 cm.\"><rect x=\"0\" y=\"0\" width=\"364\" height=\"306\" fill=\"#ffffff\"/><polygon points=\"58,256 214.32,256 168.17,46\" fill=\"#eef4fa\" stroke=\"none\"/><polygon points=\"214.32,256 278.35,211.17 168.17,46\" fill=\"#eef4fa\" stroke=\"none\"/><line x1=\"122.03\" y1=\"211.17\" x2=\"278.35\" y2=\"211.17\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"58\" y1=\"256\" x2=\"122.03\" y2=\"211.17\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"122.03\" y1=\"211.17\" x2=\"168.17\" y2=\"46\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"58\" y1=\"256\" x2=\"214.32\" y2=\"256\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"214.32\" y1=\"256\" x2=\"278.35\" y2=\"211.17\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"168.17\" y1=\"46\" x2=\"214.32\" y2=\"256\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"58\" y1=\"256\" x2=\"168.17\" y2=\"46\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"168.17\" y1=\"46\" x2=\"278.35\" y2=\"211.17\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"168.17\" y1=\"46\" x2=\"168.17\" y2=\"233.58\" stroke=\"#c0392b\" stroke-width=\"1.8\" stroke-dasharray=\"6 4\"/><line x1=\"172.17\" y1=\"46\" x2=\"308.35\" y2=\"46\" stroke=\"#888888\" stroke-width=\"1\"/><line x1=\"172.17\" y1=\"233.58\" x2=\"308.35\" y2=\"233.58\" stroke=\"#888888\" stroke-width=\"1\"/><line x1=\"304.35\" y1=\"46\" x2=\"304.35\" y2=\"233.58\" stroke=\"#333333\" stroke-width=\"1.5\"/><polyline points=\"300.35,54 304.35,46 308.35,54\" stroke=\"#333333\" stroke-width=\"1.5\" fill=\"none\"/><polyline points=\"300.35,225.58 304.35,233.58 308.35,225.58\" stroke=\"#333333\" stroke-width=\"1.5\" fill=\"none\"/><text x=\"136.16\" y=\"276\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">10 cm</text><text x=\"312.35\" y=\"144.79\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"start\">12 cm</text></svg></div>",
    "options": [
      {
        "text": "169 cm",
        "correct": false,
        "feedback": "Found \\(5 \\times 5 + 12 \\times 12 = 169\\) but did not take the square root, giving 169 cm. The slant height is the square root of that."
      },
      {
        "text": "13 cm",
        "correct": true,
        "feedback": "Correct. The slant height is the hypotenuse of a right-angled triangle with sides 12 (the vertical height) and 5 (half the base edge): \\(5 \\times 5 + 12 \\times 12 = 25 + 144 = 169\\), and the square root of 169 is 13 cm."
      },
      {
        "text": "15.6 cm",
        "correct": false,
        "feedback": "Used the whole base edge, 10, instead of half of it: \\(10 \\times 10 + 12 \\times 12 = 244\\) and the square root is about 15.6, giving 15.6 cm. The right-angled triangle uses half the base edge, 5."
      },
      {
        "text": "17 cm",
        "correct": false,
        "feedback": "Added half the base edge and the vertical height, \\(5 + 12 = 17\\), giving 17 cm. The slant height is the hypotenuse, so use Pythagoras: \\(5 \\times 5 + 12 \\times 12 = 169\\), then take the square root."
      }
    ],
    "retryHint": "The slant height, the vertical height and half of the base edge make a right-angled triangle. Decide which side is the hypotenuse, then use Pythagoras.",
    "backward": "Pythagoras' theorem, Ch5.",
    "forward": "Later in this chapter you use the slant height to find the areas of the triangular faces."
  },
  {
    "itemId": "w3",
    "order": 3,
    "cluster": "C2",
    "clusterName": "Surface area of cuboids and triangular prisms",
    "question": "The diagram shows a triangular prism. What is the area of the rectangular face that lies along the sloping side of the triangle?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 344 306\" width=\"344\" height=\"306\" role=\"img\" aria-label=\"Triangular prism with right-angled ends, shorter sides 6 cm and 8 cm, length 12 cm.\"><rect x=\"0\" y=\"0\" width=\"344\" height=\"306\" fill=\"#ffffff\"/><polygon points=\"58,109.17 168.13,256 58,256\" fill=\"#eef4fa\" stroke=\"none\"/><polygon points=\"168.13,256 58,109.17 148.21,46 258.34,192.83\" fill=\"#eef4fa\" stroke=\"none\"/><line x1=\"148.21\" y1=\"192.83\" x2=\"258.34\" y2=\"192.83\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"148.21\" y1=\"192.83\" x2=\"148.21\" y2=\"46\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"58\" y1=\"256\" x2=\"148.21\" y2=\"192.83\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"58\" y1=\"109.17\" x2=\"168.13\" y2=\"256\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"58\" y1=\"256\" x2=\"168.13\" y2=\"256\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"58\" y1=\"256\" x2=\"58\" y2=\"109.17\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"148.21\" y1=\"46\" x2=\"258.34\" y2=\"192.83\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"168.13\" y1=\"256\" x2=\"258.34\" y2=\"192.83\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"58\" y1=\"109.17\" x2=\"148.21\" y2=\"46\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><polyline points=\"69,256 69,245 58,245\" stroke=\"#333333\" stroke-width=\"1.3\" fill=\"none\"/><text x=\"113.06\" y=\"276\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">6 cm</text><text x=\"47\" y=\"187.58\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"end\">8 cm</text><text x=\"222.87\" y=\"236.65\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"start\">12 cm</text></svg></div>",
    "options": [
      {
        "text": "1200 cm²",
        "correct": false,
        "feedback": "Found \\(6 \\times 6 + 8 \\times 8 = 100\\) but did not take the square root, then used \\(100 \\times 12 = 1200\\), giving 1200 cm². The side is the square root of 100."
      },
      {
        "text": "168 cm²",
        "correct": false,
        "feedback": "Added the two shorter sides to get \\(6 + 8 = 14\\) for the sloping side, then \\(14 \\times 12 = 168\\), giving 168 cm². The sloping side is the hypotenuse, found with Pythagoras."
      },
      {
        "text": "96 cm²",
        "correct": false,
        "feedback": "Used the 8 cm side instead of the sloping side: \\(8 \\times 12 = 96\\), giving 96 cm². The face along the sloping side has the hypotenuse as one dimension."
      },
      {
        "text": "120 cm²",
        "correct": true,
        "feedback": "Correct. The sloping side is the hypotenuse: \\(6 \\times 6 + 8 \\times 8 = 36 + 64 = 100\\), so it is 10 cm. The rectangle is 10 cm by 12 cm, with area \\(10 \\times 12 = 120\\text{ cm}^2\\)."
      }
    ],
    "retryHint": "The rectangle along the sloping side has that side as one of its dimensions. Find the length of the sloping side with Pythagoras first.",
    "backward": "Pythagoras' theorem, Ch5.",
    "forward": "Later in this chapter you find the whole surface area of this prism."
  },
  {
    "itemId": "w4",
    "order": 4,
    "cluster": "C5",
    "clusterName": "Symmetry in 3D",
    "question": "A prism has ends that are regular pentagons. How many planes of symmetry does the prism have?",
    "options": [
      {
        "text": "5 planes",
        "correct": false,
        "feedback": "Counted only the lengthways planes, giving 5 planes. The plane across the middle of the length is a mirror plane too, so there are \\(5 + 1 = 6\\)."
      },
      {
        "text": "1 plane",
        "correct": false,
        "feedback": "Counted only the plane across the middle of the length, giving 1 plane. Each of the 5 lines of symmetry of the pentagon also gives a lengthways plane, so there are \\(5 + 1 = 6\\)."
      },
      {
        "text": "6 planes",
        "correct": true,
        "feedback": "Correct. A regular pentagon has 5 lines of symmetry, so 5 planes cut lengthways, one through each line. One more plane cuts across the middle of the length: \\(5 + 1 = 6\\)."
      },
      {
        "text": "3 planes",
        "correct": false,
        "feedback": "Gave 3 planes, as if the ends were triangles with 3 lines of symmetry. A regular pentagon has 5 lines of symmetry, so there are \\(5 + 1 = 6\\)."
      }
    ],
    "retryHint": "Each line of symmetry of an end gives one lengthways plane. Do not forget the plane that cuts across the middle of the length.",
    "backward": "Reflection and line symmetry, Ch13.",
    "forward": "Later in this chapter you find the planes of symmetry of other prisms."
  },
  {
    "itemId": "w5",
    "order": 5,
    "cluster": "C3",
    "clusterName": "Surface area of cylinders",
    "question": "A cylindrical tin is shown in the diagram. Use \\(\\pi = 3.14\\). Find the area of the curved surface only.<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 305 276\" width=\"305\" height=\"276\" role=\"img\" aria-label=\"Cylinder with diameter 10 cm and height 12 cm.\"><rect x=\"0\" y=\"0\" width=\"305\" height=\"276\" fill=\"#ffffff\"/><ellipse cx=\"132.5\" cy=\"64.75\" rx=\"62.5\" ry=\"18.75\" fill=\"#eef4fa\" stroke=\"#333333\" stroke-width=\"2\"/><line x1=\"70\" y1=\"64.75\" x2=\"70\" y2=\"214.75\" stroke=\"#333333\" stroke-width=\"2\"/><line x1=\"195\" y1=\"64.75\" x2=\"195\" y2=\"214.75\" stroke=\"#333333\" stroke-width=\"2\"/><path d=\"M 70 214.75 A 62.5 18.75 0 0 0 195 214.75\" fill=\"none\" stroke=\"#333333\" stroke-width=\"2\"/><path d=\"M 70 214.75 A 62.5 18.75 0 0 1 195 214.75\" fill=\"none\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"70\" y1=\"64.75\" x2=\"195\" y2=\"64.75\" stroke=\"#333333\" stroke-width=\"1.8\"/><text x=\"132.5\" y=\"40\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">10 cm</text><line x1=\"199\" y1=\"64.75\" x2=\"227\" y2=\"64.75\" stroke=\"#888888\" stroke-width=\"1\"/><line x1=\"199\" y1=\"214.75\" x2=\"227\" y2=\"214.75\" stroke=\"#888888\" stroke-width=\"1\"/><line x1=\"223\" y1=\"64.75\" x2=\"223\" y2=\"214.75\" stroke=\"#333333\" stroke-width=\"1.5\"/><polyline points=\"219,72.75 223,64.75 227,72.75\" stroke=\"#333333\" stroke-width=\"1.5\" fill=\"none\"/><polyline points=\"219,206.75 223,214.75 227,206.75\" stroke=\"#333333\" stroke-width=\"1.5\" fill=\"none\"/><text x=\"231\" y=\"144.75\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"start\">12 cm</text></svg></div>",
    "options": [
      {
        "text": "188.4 cm²",
        "correct": false,
        "feedback": "Used \\(\\pi \\times r \\times h = 3.14 \\times 5 \\times 12 = 188.4\\), giving 188.4 cm², and left out the factor 2. The circumference is \\(2 \\times \\pi \\times r\\)."
      },
      {
        "text": "533.8 cm²",
        "correct": false,
        "feedback": "Added both circular ends, \\(376.8 + 157 = 533.8\\), giving 533.8 cm². The question asks only for the curved surface."
      },
      {
        "text": "376.8 cm²",
        "correct": true,
        "feedback": "Correct. The diameter is 10 cm, so the radius is 5 cm. The curved surface is \\(2 \\times 3.14 \\times 5 \\times 12 = 376.8\\text{ cm}^2\\)."
      },
      {
        "text": "753.6 cm²",
        "correct": false,
        "feedback": "Used the diameter as the radius: \\(2 \\times 3.14 \\times 10 \\times 12 = 753.6\\), giving 753.6 cm². The radius is half of the diameter, 5 cm."
      }
    ],
    "retryHint": "First find the radius from the diameter. Then think of the curved surface as a rectangle: circumference times height.",
    "backward": "Circumference of a circle, Ch7.",
    "forward": "Later in this chapter you add the circular ends to find the total surface area."
  },
  {
    "itemId": "w6",
    "order": 6,
    "cluster": "C1",
    "clusterName": "Volume of prisms and cylinders",
    "question": "A cylindrical water butt has a radius of 40 cm and a height of 100 cm. Use \\(\\pi = 3.14\\). How many litres of water does it hold when full?",
    "options": [
      {
        "text": "5024 litres",
        "correct": false,
        "feedback": "Gave 5024 litres, which would come from dividing by 100. One litre is 1000 cm³, so \\(502\\,400 \\div 1000 = 502.4\\)."
      },
      {
        "text": "502 400 litres",
        "correct": false,
        "feedback": "Found the volume, 502 400, and gave it as 502 400 litres. That volume is in cm³, and 1 litre is 1000 cm³."
      },
      {
        "text": "50.24 litres",
        "correct": false,
        "feedback": "Gave 50.24 litres, which would come from dividing by 10 000. One litre is 1000 cm³, so \\(502\\,400 \\div 1000 = 502.4\\)."
      },
      {
        "text": "502.4 litres",
        "correct": true,
        "feedback": "Correct. The volume is \\(3.14 \\times 40 \\times 40 \\times 100 = 502\\,400\\text{ cm}^3\\). One litre is 1000 cm³, so the butt holds \\(502\\,400 \\div 1000 = 502.4\\) litres."
      }
    ],
    "retryHint": "Find the volume in cm³ first. Then use 1 litre = 1000 cm³.",
    "backward": "Large and small units, Ch7.",
    "forward": "Later in this chapter you find missing lengths from capacities."
  },
  {
    "itemId": "w7",
    "order": 7,
    "cluster": "C4",
    "clusterName": "Surface area of pyramids",
    "question": "Find the area of one triangular face of a square-based pyramid with a base edge of 16 cm and a vertical height of 6 cm.",
    "options": [
      {
        "text": "48 cm²",
        "correct": false,
        "feedback": "Used the vertical height as the height of the triangle: \\(\\tfrac{1}{2} \\times 16 \\times 6 = 48\\), giving 48 cm². The height of a triangular face is the slant height, 10 cm."
      },
      {
        "text": "80 cm²",
        "correct": true,
        "feedback": "Correct. Half the base edge is 8 cm, and \\(8 \\times 8 + 6 \\times 6 = 100\\), so the slant height is 10 cm. The area of one face is \\(\\tfrac{1}{2} \\times 16 \\times 10 = 80\\text{ cm}^2\\)."
      },
      {
        "text": "160 cm²",
        "correct": false,
        "feedback": "Forgot the ½ and found \\(16 \\times 10 = 160\\), giving 160 cm². A triangle is half of that rectangle."
      },
      {
        "text": "136.7 cm²",
        "correct": false,
        "feedback": "Used the whole base edge in Pythagoras: \\(16 \\times 16 + 6 \\times 6 = 292\\), a slant height of about 17.09, which gives about 136.7 cm². The right-angled triangle uses half the base edge, 8."
      }
    ],
    "retryHint": "The height of the triangle is the slant height, not the vertical height. Find it with Pythagoras, using half the base edge.",
    "backward": "Pythagoras' theorem, Ch5.",
    "forward": "Later in this chapter you add four faces and the base for the total surface area."
  },
  {
    "itemId": "w8",
    "order": 8,
    "cluster": "C5",
    "clusterName": "Symmetry in 3D",
    "question": "Find the order of rotational symmetry of a prism with regular hexagonal ends, about the axis through the centres of its two ends.",
    "options": [
      {
        "text": "order 6",
        "correct": true,
        "feedback": "Correct. A regular hexagon fits onto itself after every turn of \\(360^\\circ \\div 6 = 60^\\circ\\), so the prism fits onto itself 6 times in one full turn: order 6."
      },
      {
        "text": "order 3",
        "correct": false,
        "feedback": "Gave order 3, which fits a triangle (turns of 120°). A hexagon fits after every 60° turn, so the order is \\(360 \\div 60 = 6\\)."
      },
      {
        "text": "order 8",
        "correct": false,
        "feedback": "Counted the 8 faces of the prism, giving order 8. The order is the number of times the prism fits onto itself in one full turn: \\(360 \\div 60 = 6\\)."
      },
      {
        "text": "order 12",
        "correct": false,
        "feedback": "Counted the 12 corners of the two hexagons, giving order 12. The order is the number of times the prism fits onto itself in one full turn: \\(360 \\div 60 = 6\\)."
      }
    ],
    "retryHint": "Find the smallest turn that fits the hexagon onto itself, then count how many of those turns make a full turn.",
    "backward": "Rotation, Ch13.",
    "forward": "Later in this chapter you meet prisms with other regular polygons as ends."
  }
];

const diagnosticItems = [
  {
    "itemId": "d1",
    "order": 1,
    "cluster": "C1",
    "clusterName": "Volume of prisms and cylinders",
    "question": "The prism shown has a volume of 168 cm³. What is its length?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 394 298\" width=\"394\" height=\"298\" role=\"img\" aria-label=\"Triangular prism with end base 7 cm and perpendicular height 6 cm.\"><rect x=\"0\" y=\"0\" width=\"394\" height=\"298\" fill=\"#ffffff\"/><polygon points=\"106.65,101.81 228.29,247.78 58,247.78\" fill=\"#eef4fa\" stroke=\"none\"/><polygon points=\"228.29,247.78 106.65,101.81 186.36,46 308,191.96\" fill=\"#eef4fa\" stroke=\"none\"/><line x1=\"137.71\" y1=\"191.96\" x2=\"308\" y2=\"191.96\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"137.71\" y1=\"191.96\" x2=\"186.36\" y2=\"46\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"58\" y1=\"247.78\" x2=\"137.71\" y2=\"191.96\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"106.65\" y1=\"101.81\" x2=\"228.29\" y2=\"247.78\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"58\" y1=\"247.78\" x2=\"228.29\" y2=\"247.78\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"58\" y1=\"247.78\" x2=\"106.65\" y2=\"101.81\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"186.36\" y1=\"46\" x2=\"308\" y2=\"191.96\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"228.29\" y1=\"247.78\" x2=\"308\" y2=\"191.96\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"106.65\" y1=\"101.81\" x2=\"186.36\" y2=\"46\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"106.65\" y1=\"101.81\" x2=\"106.65\" y2=\"247.78\" stroke=\"#c0392b\" stroke-width=\"1.8\" stroke-dasharray=\"6 4\"/><polyline points=\"116.65,247.78 116.65,237.78 106.65,237.78\" stroke=\"#333333\" stroke-width=\"1.3\" fill=\"none\"/><text x=\"143.14\" y=\"267.78\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">7 cm</text><rect x=\"88.85\" y=\"166.8\" width=\"35.6\" height=\"18\" fill=\"#ffffff\"/><text x=\"106.65\" y=\"179.8\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">6 cm</text></svg></div>",
    "options": [
      {
        "text": "28 cm",
        "correct": false,
        "feedback": "Divided the volume by only the height of the triangle, \\(168 \\div 6 = 28\\), giving 28 cm. Divide by the whole cross-section area, 21."
      },
      {
        "text": "24 cm",
        "correct": false,
        "feedback": "Divided the volume by only the base of the triangle, \\(168 \\div 7 = 24\\), giving 24 cm. Divide by the whole cross-section area, 21."
      },
      {
        "text": "8 cm",
        "correct": true,
        "feedback": "Correct. The area of the triangular end is \\(\\tfrac{1}{2} \\times 7 \\times 6 = 21\\text{ cm}^2\\). Volume = area × length, so the length is \\(168 \\div 21 = 8\\text{ cm}\\)."
      },
      {
        "text": "4 cm",
        "correct": false,
        "feedback": "Forgot the ½ for the triangle: \\(168 \\div 42 = 4\\), giving 4 cm. The cross-section area is \\(\\tfrac{1}{2} \\times 7 \\times 6 = 21\\)."
      }
    ],
    "backward": "Area of a triangle, Ch7.",
    "forward": "Later in this chapter you use the same method for cylinders."
  },
  {
    "itemId": "d2",
    "order": 2,
    "cluster": "C4",
    "clusterName": "Surface area of pyramids",
    "question": "Find the total area of the four sloping faces of the pyramid in the diagram.<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 394 240\" width=\"394\" height=\"240\" role=\"img\" aria-label=\"Square-based pyramid, base edge 6 cm, vertical height 4 cm.\"><rect x=\"0\" y=\"0\" width=\"394\" height=\"240\" fill=\"#ffffff\"/><polygon points=\"58,189.67 235.36,189.67 183,46\" fill=\"#eef4fa\" stroke=\"none\"/><polygon points=\"235.36,189.67 308,138.81 183,46\" fill=\"#eef4fa\" stroke=\"none\"/><line x1=\"130.64\" y1=\"138.81\" x2=\"308\" y2=\"138.81\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"58\" y1=\"189.67\" x2=\"130.64\" y2=\"138.81\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"130.64\" y1=\"138.81\" x2=\"183\" y2=\"46\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"58\" y1=\"189.67\" x2=\"235.36\" y2=\"189.67\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"235.36\" y1=\"189.67\" x2=\"308\" y2=\"138.81\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"183\" y1=\"46\" x2=\"235.36\" y2=\"189.67\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"58\" y1=\"189.67\" x2=\"183\" y2=\"46\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"183\" y1=\"46\" x2=\"308\" y2=\"138.81\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"183\" y1=\"46\" x2=\"183\" y2=\"164.24\" stroke=\"#c0392b\" stroke-width=\"1.8\" stroke-dasharray=\"6 4\"/><line x1=\"187\" y1=\"46\" x2=\"338\" y2=\"46\" stroke=\"#888888\" stroke-width=\"1\"/><line x1=\"187\" y1=\"164.24\" x2=\"338\" y2=\"164.24\" stroke=\"#888888\" stroke-width=\"1\"/><line x1=\"334\" y1=\"46\" x2=\"334\" y2=\"164.24\" stroke=\"#333333\" stroke-width=\"1.5\"/><polyline points=\"330,54 334,46 338,54\" stroke=\"#333333\" stroke-width=\"1.5\" fill=\"none\"/><polyline points=\"330,156.24 334,164.24 338,156.24\" stroke=\"#333333\" stroke-width=\"1.5\" fill=\"none\"/><text x=\"146.68\" y=\"209.67\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">6 cm</text><text x=\"342\" y=\"110.12\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"start\">4 cm</text></svg></div>",
    "options": [
      {
        "text": "60 cm²",
        "correct": true,
        "feedback": "Correct. Half the base edge is 3, and \\(3 \\times 3 + 4 \\times 4 = 25\\), so the slant height is 5 cm. One face is \\(\\tfrac{1}{2} \\times 6 \\times 5 = 15\\text{ cm}^2\\), so four faces are \\(4 \\times 15 = 60\\text{ cm}^2\\)."
      },
      {
        "text": "120 cm²",
        "correct": false,
        "feedback": "Forgot the ½ on each triangle: \\(4 \\times (6 \\times 5 = 30) = 120\\), giving 120 cm². Each triangle has area \\(\\tfrac{1}{2} \\times 6 \\times 5 = 15\\)."
      },
      {
        "text": "86.5 cm²",
        "correct": false,
        "feedback": "Used the whole base edge in Pythagoras: \\(6 \\times 6 + 4 \\times 4 = 52\\), a slant height of about 7.21, which gives about 86.5 cm². The right-angled triangle uses half the base edge, 3."
      },
      {
        "text": "48 cm²",
        "correct": false,
        "feedback": "Used the vertical height as the height of each triangle: \\(4 \\times (\\tfrac{1}{2} \\times 6 \\times 4 = 12) = 48\\), giving 48 cm². The height of a face is the slant height, 5 cm."
      }
    ],
    "backward": "Pythagoras' theorem, Ch5.",
    "forward": "Later in this chapter you add the base for the total surface area."
  },
  {
    "itemId": "d3",
    "order": 3,
    "cluster": "C2",
    "clusterName": "Surface area of cuboids and triangular prisms",
    "question": "Find the total surface area of the triangular prism in the diagram.<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 336 306\" width=\"336\" height=\"306\" role=\"img\" aria-label=\"Triangular prism with right-angled ends, shorter sides 6 cm and 8 cm, length 9 cm.\"><rect x=\"0\" y=\"0\" width=\"336\" height=\"306\" fill=\"#ffffff\"/><polygon points=\"58,97.23 177.08,256 58,256\" fill=\"#eef4fa\" stroke=\"none\"/><polygon points=\"177.08,256 58,97.23 131.16,46 250.24,204.77\" fill=\"#eef4fa\" stroke=\"none\"/><line x1=\"131.16\" y1=\"204.77\" x2=\"250.24\" y2=\"204.77\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"131.16\" y1=\"204.77\" x2=\"131.16\" y2=\"46\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"58\" y1=\"256\" x2=\"131.16\" y2=\"204.77\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"58\" y1=\"97.23\" x2=\"177.08\" y2=\"256\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"58\" y1=\"256\" x2=\"177.08\" y2=\"256\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"58\" y1=\"256\" x2=\"58\" y2=\"97.23\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"131.16\" y1=\"46\" x2=\"250.24\" y2=\"204.77\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"177.08\" y1=\"256\" x2=\"250.24\" y2=\"204.77\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"58\" y1=\"97.23\" x2=\"131.16\" y2=\"46\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><polyline points=\"69,256 69,245 58,245\" stroke=\"#333333\" stroke-width=\"1.3\" fill=\"none\"/><text x=\"117.54\" y=\"276\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">6 cm</text><text x=\"47\" y=\"181.61\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"end\">8 cm</text><text x=\"223.3\" y=\"242.62\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"start\">9 cm</text></svg></div>",
    "options": [
      {
        "text": "240 cm²",
        "correct": false,
        "feedback": "Added only one triangular end: \\(24 + 216 = 240\\), giving 240 cm². The prism has two triangular ends, \\(2 \\times 24 = 48\\)."
      },
      {
        "text": "216 cm²",
        "correct": false,
        "feedback": "Found only the three rectangles, \\((6 + 8 + 10) \\times 9 = 216\\), giving 216 cm². The two triangular ends, 48 in total, must be added."
      },
      {
        "text": "174 cm²",
        "correct": false,
        "feedback": "Left out the rectangle on the sloping side: \\(48 + (6 + 8) \\times 9 = 48 + 126 = 174\\), giving 174 cm². There are three rectangles, one for each side of the triangle."
      },
      {
        "text": "264 cm²",
        "correct": true,
        "feedback": "Correct. The sloping side is 10 cm, since \\(6 \\times 6 + 8 \\times 8 = 100\\). The two triangular ends are \\(2 \\times (\\tfrac{1}{2} \\times 6 \\times 8) = 48\\). The three rectangles are \\((6 + 8 + 10) \\times 9 = 216\\). The total is \\(48 + 216 = 264\\text{ cm}^2\\)."
      }
    ],
    "backward": "Pythagoras' theorem, Ch5.",
    "forward": "Later in this chapter you find a missing length from a surface area."
  },
  {
    "itemId": "d4",
    "order": 4,
    "cluster": "C5",
    "clusterName": "Symmetry in 3D",
    "question": "How many planes of symmetry has the prism in the diagram?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 394 296\" width=\"394\" height=\"296\" role=\"img\" aria-label=\"Prism with regular hexagon ends of side 3 cm and length 10 cm.\"><rect x=\"0\" y=\"0\" width=\"394\" height=\"296\" fill=\"#ffffff\"/><polygon points=\"169.43,245.69 95.14,245.69 58,181.35 95.14,117.02 169.43,117.02 206.58,181.35\" fill=\"#eef4fa\" stroke=\"none\"/><polygon points=\"206.58,181.35 169.43,117.02 270.86,46 308,110.34\" fill=\"#eef4fa\" stroke=\"none\"/><polygon points=\"169.43,117.02 95.14,117.02 196.57,46 270.86,46\" fill=\"#eef4fa\" stroke=\"none\"/><polygon points=\"169.43,245.69 206.58,181.35 308,110.34 270.86,174.67\" fill=\"#eef4fa\" stroke=\"none\"/><line x1=\"159.42\" y1=\"110.34\" x2=\"196.57\" y2=\"46\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"159.42\" y1=\"110.34\" x2=\"196.57\" y2=\"174.67\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"196.57\" y1=\"174.67\" x2=\"270.86\" y2=\"174.67\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"58\" y1=\"181.35\" x2=\"159.42\" y2=\"110.34\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"95.14\" y1=\"245.69\" x2=\"196.57\" y2=\"174.67\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"95.14\" y1=\"245.69\" x2=\"169.43\" y2=\"245.69\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"58\" y1=\"181.35\" x2=\"95.14\" y2=\"245.69\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"58\" y1=\"181.35\" x2=\"95.14\" y2=\"117.02\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"95.14\" y1=\"117.02\" x2=\"169.43\" y2=\"117.02\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"169.43\" y1=\"117.02\" x2=\"206.58\" y2=\"181.35\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"169.43\" y1=\"245.69\" x2=\"206.58\" y2=\"181.35\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"270.86\" y1=\"46\" x2=\"308\" y2=\"110.34\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"196.57\" y1=\"46\" x2=\"270.86\" y2=\"46\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"270.86\" y1=\"174.67\" x2=\"308\" y2=\"110.34\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"169.43\" y1=\"117.02\" x2=\"270.86\" y2=\"46\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"206.58\" y1=\"181.35\" x2=\"308\" y2=\"110.34\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"95.14\" y1=\"117.02\" x2=\"196.57\" y2=\"46\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"169.43\" y1=\"245.69\" x2=\"270.86\" y2=\"174.67\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"183.67\" y1=\"151.68\" x2=\"192.34\" y2=\"146.68\" stroke=\"#333333\" stroke-width=\"1.8\"/><line x1=\"132.29\" y1=\"122.02\" x2=\"132.29\" y2=\"112.02\" stroke=\"#333333\" stroke-width=\"1.8\"/><line x1=\"80.9\" y1=\"151.68\" x2=\"72.24\" y2=\"146.68\" stroke=\"#333333\" stroke-width=\"1.8\"/><line x1=\"80.9\" y1=\"211.02\" x2=\"72.24\" y2=\"216.02\" stroke=\"#333333\" stroke-width=\"1.8\"/><line x1=\"132.29\" y1=\"240.69\" x2=\"132.29\" y2=\"250.69\" stroke=\"#333333\" stroke-width=\"1.8\"/><line x1=\"183.67\" y1=\"211.02\" x2=\"192.34\" y2=\"216.02\" stroke=\"#333333\" stroke-width=\"1.8\"/><text x=\"132.29\" y=\"265.69\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">3 cm</text><text x=\"229.78\" y=\"222.41\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"start\">10 cm</text></svg></div>",
    "options": [
      {
        "text": "18 planes",
        "correct": false,
        "feedback": "Counted the 18 edges, giving 18 planes. A plane of symmetry is a mirror cut through the middle; the hexagon has 6 lines of symmetry, so \\(6 + 1 = 7\\)."
      },
      {
        "text": "12 planes",
        "correct": false,
        "feedback": "Counted the 12 corners of the two hexagons, giving 12 planes. A plane of symmetry is a mirror cut through the middle; the hexagon has 6 lines of symmetry, so \\(6 + 1 = 7\\)."
      },
      {
        "text": "7 planes",
        "correct": true,
        "feedback": "Correct. A regular hexagon has 6 lines of symmetry, so 6 planes cut lengthways. One more plane cuts across the middle of the length: \\(6 + 1 = 7\\)."
      },
      {
        "text": "8 planes",
        "correct": false,
        "feedback": "Counted the 8 faces, giving 8 planes. A plane of symmetry is a mirror cut, not a face; there are 6 lengthways planes and 1 across the middle, so \\(6 + 1 = 7\\)."
      }
    ],
    "backward": "Reflection and line symmetry, Ch13.",
    "forward": "Later in this chapter you work backwards from the number of planes to the shape of the ends."
  },
  {
    "itemId": "d5",
    "order": 5,
    "cluster": "C3",
    "clusterName": "Surface area of cylinders",
    "question": "Use \\(\\pi = 3.14\\). Find the total area of the whole surface of the closed cylinder in the diagram.<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 300 274\" width=\"300\" height=\"274\" role=\"img\" aria-label=\"Closed cylinder with diameter 8 cm and height 10 cm.\"><rect x=\"0\" y=\"0\" width=\"300\" height=\"274\" fill=\"#ffffff\"/><ellipse cx=\"130\" cy=\"64\" rx=\"60\" ry=\"18\" fill=\"#eef4fa\" stroke=\"#333333\" stroke-width=\"2\"/><line x1=\"70\" y1=\"64\" x2=\"70\" y2=\"214\" stroke=\"#333333\" stroke-width=\"2\"/><line x1=\"190\" y1=\"64\" x2=\"190\" y2=\"214\" stroke=\"#333333\" stroke-width=\"2\"/><path d=\"M 70 214 A 60 18 0 0 0 190 214\" fill=\"none\" stroke=\"#333333\" stroke-width=\"2\"/><path d=\"M 70 214 A 60 18 0 0 1 190 214\" fill=\"none\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"70\" y1=\"64\" x2=\"190\" y2=\"64\" stroke=\"#333333\" stroke-width=\"1.8\"/><text x=\"130\" y=\"40\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">8 cm</text><line x1=\"194\" y1=\"64\" x2=\"222\" y2=\"64\" stroke=\"#888888\" stroke-width=\"1\"/><line x1=\"194\" y1=\"214\" x2=\"222\" y2=\"214\" stroke=\"#888888\" stroke-width=\"1\"/><line x1=\"218\" y1=\"64\" x2=\"218\" y2=\"214\" stroke=\"#333333\" stroke-width=\"1.5\"/><polyline points=\"214,72 218,64 222,72\" stroke=\"#333333\" stroke-width=\"1.5\" fill=\"none\"/><polyline points=\"214,206 218,214 222,206\" stroke=\"#333333\" stroke-width=\"1.5\" fill=\"none\"/><text x=\"226\" y=\"144\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"start\">10 cm</text></svg></div>",
    "options": [
      {
        "text": "251.2 cm²",
        "correct": false,
        "feedback": "Found only the curved surface, \\(2 \\times 3.14 \\times 4 \\times 10 = 251.2\\), giving 251.2 cm². A closed cylinder also has two circular ends."
      },
      {
        "text": "301.44 cm²",
        "correct": false,
        "feedback": "Added only one circular end, \\(251.2 + 50.24 = 301.44\\), giving 301.44 cm². A closed cylinder has two circular ends."
      },
      {
        "text": "351.68 cm²",
        "correct": true,
        "feedback": "Correct. The radius is 4 cm. The curved surface is \\(2 \\times 3.14 \\times 4 \\times 10 = 251.2\\) and the two circular ends are \\(2 \\times 3.14 \\times 4 \\times 4 = 100.48\\). The total is \\(251.2 + 100.48 = 351.68\\text{ cm}^2\\)."
      },
      {
        "text": "904.32 cm²",
        "correct": false,
        "feedback": "Used the diameter as the radius: \\(2 \\times 3.14 \\times 8 \\times 10 = 502.4\\) and \\(2 \\times 3.14 \\times 8 \\times 8 = 401.92\\), giving \\(502.4 + 401.92 = 904.32\\text{ cm}^2\\). The radius is half of the diameter, 4 cm."
      }
    ],
    "backward": "Circumference and area of a circle, Ch7.",
    "forward": "Later in this chapter you use cylinders in problems that mix volume and area."
  },
  {
    "itemId": "d6",
    "order": 6,
    "cluster": "C6",
    "clusterName": "Mixed 3D problems",
    "question": "A cuboid has a base measuring 6 cm by 4 cm and a volume of 120 cm³. What is its total surface area?",
    "options": [
      {
        "text": "288 cm²",
        "correct": false,
        "feedback": "Found the height by dividing by the sum of the base edges, \\(120 \\div (6 + 4) = 12\\), giving 288 cm². The height is the volume divided by the base area, \\(6 \\times 4 = 24\\)."
      },
      {
        "text": "148 cm²",
        "correct": true,
        "feedback": "Correct. The height is \\(120 \\div (6 \\times 4) = 120 \\div 24 = 5\\text{ cm}\\). Then the surface area is \\(2 \\times (6 \\times 4) + 2 \\times (6 \\times 5) + 2 \\times (4 \\times 5) = 48 + 60 + 40 = 148\\text{ cm}^2\\)."
      },
      {
        "text": "74 cm²",
        "correct": false,
        "feedback": "Counted each different face once, \\(24 + 30 + 20 = 74\\), giving 74 cm². Every face has an identical partner, so double it."
      },
      {
        "text": "108 cm²",
        "correct": false,
        "feedback": "Left out the pair of 4 by 5 faces: \\(48 + 60 = 108\\), giving 108 cm². All three pairs of faces are part of the surface."
      }
    ],
    "backward": "Solving equations, Ch4.",
    "forward": "Later in this chapter you combine volume and surface area for cylinders."
  },
  {
    "itemId": "d7",
    "order": 7,
    "cluster": "C1",
    "clusterName": "Volume of prisms and cylinders",
    "question": "What is the volume of the L-shaped prism shown?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 394 252\" width=\"394\" height=\"252\" role=\"img\" aria-label=\"Prism with an L-shaped end made from a 10 cm by 6 cm rectangle with a 4 cm by 3 cm rectangle removed from a corner, length 7 cm.\"><rect x=\"0\" y=\"0\" width=\"394\" height=\"252\" fill=\"#ffffff\"/><polygon points=\"58,85.01 174.58,85.01 174.58,143.29 252.29,143.29 252.29,201.58 58,201.58\" fill=\"#eef4fa\" stroke=\"none\"/><polygon points=\"252.29,201.58 252.29,143.29 308,104.29 308,162.58\" fill=\"#eef4fa\" stroke=\"none\"/><polygon points=\"252.29,143.29 174.58,143.29 230.28,104.29 308,104.29\" fill=\"#eef4fa\" stroke=\"none\"/><polygon points=\"174.58,143.29 174.58,85.01 230.28,46 230.28,104.29\" fill=\"#eef4fa\" stroke=\"none\"/><polygon points=\"174.58,85.01 58,85.01 113.71,46 230.28,46\" fill=\"#eef4fa\" stroke=\"none\"/><line x1=\"113.71\" y1=\"162.58\" x2=\"308\" y2=\"162.58\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"113.71\" y1=\"162.58\" x2=\"113.71\" y2=\"46\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"58\" y1=\"201.58\" x2=\"113.71\" y2=\"162.58\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"58\" y1=\"85.01\" x2=\"174.58\" y2=\"85.01\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"174.58\" y1=\"143.29\" x2=\"174.58\" y2=\"85.01\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"174.58\" y1=\"143.29\" x2=\"252.29\" y2=\"143.29\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"252.29\" y1=\"201.58\" x2=\"252.29\" y2=\"143.29\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"58\" y1=\"201.58\" x2=\"252.29\" y2=\"201.58\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"58\" y1=\"201.58\" x2=\"58\" y2=\"85.01\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"308\" y1=\"162.58\" x2=\"308\" y2=\"104.29\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"230.28\" y1=\"104.29\" x2=\"308\" y2=\"104.29\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"230.28\" y1=\"104.29\" x2=\"230.28\" y2=\"46\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"113.71\" y1=\"46\" x2=\"230.28\" y2=\"46\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"252.29\" y1=\"201.58\" x2=\"308\" y2=\"162.58\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"252.29\" y1=\"143.29\" x2=\"308\" y2=\"104.29\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"174.58\" y1=\"143.29\" x2=\"230.28\" y2=\"104.29\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"174.58\" y1=\"85.01\" x2=\"230.28\" y2=\"46\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"58\" y1=\"85.01\" x2=\"113.71\" y2=\"46\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><text x=\"155.15\" y=\"221.58\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">10 cm</text><text x=\"47\" y=\"148.29\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"end\">6 cm</text><text x=\"163.58\" y=\"119.15\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"end\">3 cm</text><text x=\"213.44\" y=\"133.29\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">4 cm</text><text x=\"289.79\" y=\"194.31\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"start\">7 cm</text></svg></div>",
    "options": [
      {
        "text": "420 cm³",
        "correct": false,
        "feedback": "Ignored the missing corner: \\(10 \\times 6 \\times 7 = 420\\), giving 420 cm³. The corner 4 by 3 is not part of the prism, so subtract it from the end area."
      },
      {
        "text": "84 cm³",
        "correct": false,
        "feedback": "Found only the removed corner: \\(4 \\times 3 \\times 7 = 84\\), giving 84 cm³. That is the part that is missing, not the prism."
      },
      {
        "text": "336 cm³",
        "correct": true,
        "feedback": "Correct. The area of the L-shaped end is \\(10 \\times 6 - 4 \\times 3 = 60 - 12 = 48\\text{ cm}^2\\). The volume is \\(48 \\times 7 = 336\\text{ cm}^3\\)."
      },
      {
        "text": "48 cm³",
        "correct": false,
        "feedback": "Found only the area of the L-shaped end, 48, giving 48 cm³. Multiply by the length, 7, to get a volume."
      }
    ],
    "backward": "Areas of compound shapes, Ch7.",
    "forward": "Later in this chapter you find surface areas of shapes with missing corners."
  },
  {
    "itemId": "d8",
    "order": 8,
    "cluster": "C4",
    "clusterName": "Surface area of pyramids",
    "question": "Find the area of one sloping face of the pyramid in the diagram.<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 394 240\" width=\"394\" height=\"240\" role=\"img\" aria-label=\"Square-based pyramid, base edge 18 cm, vertical height 12 cm.\"><rect x=\"0\" y=\"0\" width=\"394\" height=\"240\" fill=\"#ffffff\"/><polygon points=\"58,189.67 235.36,189.67 183,46\" fill=\"#eef4fa\" stroke=\"none\"/><polygon points=\"235.36,189.67 308,138.81 183,46\" fill=\"#eef4fa\" stroke=\"none\"/><line x1=\"130.64\" y1=\"138.81\" x2=\"308\" y2=\"138.81\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"58\" y1=\"189.67\" x2=\"130.64\" y2=\"138.81\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"130.64\" y1=\"138.81\" x2=\"183\" y2=\"46\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"58\" y1=\"189.67\" x2=\"235.36\" y2=\"189.67\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"235.36\" y1=\"189.67\" x2=\"308\" y2=\"138.81\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"183\" y1=\"46\" x2=\"235.36\" y2=\"189.67\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"58\" y1=\"189.67\" x2=\"183\" y2=\"46\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"183\" y1=\"46\" x2=\"308\" y2=\"138.81\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"183\" y1=\"46\" x2=\"183\" y2=\"164.24\" stroke=\"#c0392b\" stroke-width=\"1.8\" stroke-dasharray=\"6 4\"/><line x1=\"187\" y1=\"46\" x2=\"338\" y2=\"46\" stroke=\"#888888\" stroke-width=\"1\"/><line x1=\"187\" y1=\"164.24\" x2=\"338\" y2=\"164.24\" stroke=\"#888888\" stroke-width=\"1\"/><line x1=\"334\" y1=\"46\" x2=\"334\" y2=\"164.24\" stroke=\"#333333\" stroke-width=\"1.5\"/><polyline points=\"330,54 334,46 338,54\" stroke=\"#333333\" stroke-width=\"1.5\" fill=\"none\"/><polyline points=\"330,156.24 334,164.24 338,156.24\" stroke=\"#333333\" stroke-width=\"1.5\" fill=\"none\"/><text x=\"146.68\" y=\"209.67\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">18 cm</text><text x=\"342\" y=\"110.12\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"start\">12 cm</text></svg></div>",
    "options": [
      {
        "text": "135 cm²",
        "correct": true,
        "feedback": "Correct. Half the base edge is 9, and \\(9 \\times 9 + 12 \\times 12 = 81 + 144 = 225\\), so the slant height is 15 cm. The area of one face is \\(\\tfrac{1}{2} \\times 18 \\times 15 = 135\\text{ cm}^2\\)."
      },
      {
        "text": "270 cm²",
        "correct": false,
        "feedback": "Forgot the ½ and found \\(18 \\times 15 = 270\\), giving 270 cm². A triangle is half of that rectangle."
      },
      {
        "text": "194.7 cm²",
        "correct": false,
        "feedback": "Used the whole base edge in Pythagoras: \\(18 \\times 18 + 12 \\times 12 = 468\\), a slant height of about 21.63, which gives about 194.7 cm². The right-angled triangle uses half the base edge, 9."
      },
      {
        "text": "108 cm²",
        "correct": false,
        "feedback": "Used the vertical height as the height of the triangle: \\(\\tfrac{1}{2} \\times 18 \\times 12 = 108\\), giving 108 cm². The height of a face is the slant height, 15 cm."
      }
    ],
    "backward": "Pythagoras' theorem, Ch5.",
    "forward": "Later in this chapter you find the total surface area."
  },
  {
    "itemId": "d9",
    "order": 9,
    "cluster": "C2",
    "clusterName": "Surface area of cuboids and triangular prisms",
    "question": "A cuboid has a square base of side 5 cm and a total surface area of 230 cm². What is its height?",
    "options": [
      {
        "text": "46 cm",
        "correct": false,
        "feedback": "Divided the whole surface area by 5, \\(230 \\div 5 = 46\\), giving 46 cm. First remove the two square ends, then divide by the four sides, 20."
      },
      {
        "text": "9 cm",
        "correct": true,
        "feedback": "Correct. The two square ends have area \\(2 \\times (5 \\times 5) = 50\\), so the four sides have area \\(230 - 50 = 180\\). Each side is \\(5 \\times \\text{height}\\), so \\(4 \\times 5 \\times \\text{height} = 20 \\times \\text{height} = 180\\), and the height is \\(180 \\div 20 = 9\\text{ cm}\\)."
      },
      {
        "text": "10.25 cm",
        "correct": false,
        "feedback": "Subtracted only one square end: \\(230 - 25 = 205\\), then \\(205 \\div 20 = 10.25\\), giving 10.25 cm. There are two square ends, \\(2 \\times (5 \\times 5) = 50\\)."
      },
      {
        "text": "36 cm",
        "correct": false,
        "feedback": "Divided the area of the sides by only one side of the base, \\(180 \\div 5 = 36\\), giving 36 cm. The four sides together are \\(20 \\times \\text{height}\\)."
      }
    ],
    "backward": "Solving equations, Ch4.",
    "forward": "Later in this chapter you find missing lengths of prisms and cylinders."
  },
  {
    "itemId": "d10",
    "order": 10,
    "cluster": "C5",
    "clusterName": "Symmetry in 3D",
    "question": "A prism has regular pentagons for its ends. Find the order of rotational symmetry about the axis joining the centres of its ends.",
    "options": [
      {
        "text": "order 10",
        "correct": false,
        "feedback": "Counted the 10 corners of the two pentagons, giving order 10. The order is the number of times the prism fits onto itself in one full turn: \\(360 \\div 72 = 5\\)."
      },
      {
        "text": "order 7",
        "correct": false,
        "feedback": "Counted the 7 faces, giving order 7. The order is the number of times the prism fits onto itself in one full turn: \\(360 \\div 72 = 5\\)."
      },
      {
        "text": "order 6",
        "correct": false,
        "feedback": "Counted the 6 planes of symmetry, giving order 6. The order of rotation is a different count: \\(360 \\div 72 = 5\\) turns fit in a full turn."
      },
      {
        "text": "order 5",
        "correct": true,
        "feedback": "Correct. A regular pentagon fits onto itself after every turn of \\(360^\\circ \\div 5 = 72^\\circ\\), so the prism fits onto itself 5 times in one full turn: order 5."
      }
    ],
    "backward": "Rotation, Ch13.",
    "forward": "Later in this chapter you use the order of rotation to name the shape of the ends."
  },
  {
    "itemId": "d11",
    "order": 11,
    "cluster": "C3",
    "clusterName": "Surface area of cylinders",
    "question": "The curved surface area of a cylinder is 314 cm² and its radius is 5 cm. Use \\(\\pi = 3.14\\). What is its height?",
    "options": [
      {
        "text": "10 cm",
        "correct": true,
        "feedback": "Correct. The curved surface is \\(2 \\times \\pi \\times r \\times \\text{height} = 2 \\times 3.14 \\times 5 = 31.4 \\times \\text{height} = 31.4 \\times \\text{height}\\). So the height is \\(314 \\div 31.4 = 10\\text{ cm}\\)."
      },
      {
        "text": "100 cm",
        "correct": false,
        "feedback": "Divided only by π, \\(314 \\div 3.14 = 100\\), giving 100 cm. The curved surface is \\(2 \\times \\pi \\times r \\times \\text{height}\\), so divide by \\(2 \\times \\pi \\times r = 31.4\\)."
      },
      {
        "text": "62.8 cm",
        "correct": false,
        "feedback": "Divided only by the radius, \\(314 \\div 5 = 62.8\\), giving 62.8 cm. The curved surface is \\(2 \\times \\pi \\times r \\times \\text{height}\\), so divide by \\(2 \\times \\pi \\times r = 31.4\\)."
      },
      {
        "text": "20 cm",
        "correct": false,
        "feedback": "Left out the 2 in the circumference: \\(314 \\div (3.14 \\times 5 = 15.7) = 314 \\div 15.7 = 20\\), giving 20 cm. The circumference is \\(2 \\times \\pi \\times r = 31.4\\)."
      }
    ],
    "backward": "Solving equations, Ch4.",
    "forward": "Later in this chapter you find the height from a total surface area."
  },
  {
    "itemId": "d12",
    "order": 12,
    "cluster": "C1",
    "clusterName": "Volume of prisms and cylinders",
    "question": "A cuboid tank has a base measuring 30 cm by 20 cm. It contains 9 litres of water. What area of the inside of the tank is in contact with the water (the base and the four walls, up to the water level)?",
    "options": [
      {
        "text": "2100 cm²",
        "correct": true,
        "feedback": "Correct. 9 litres is \\(9 \\times 1000 = 9000\\text{ cm}^3\\). The base area is \\(30 \\times 20 = 600\\text{ cm}^2\\), so the depth is \\(9000 \\div 600 = 15\\text{ cm}\\). The four walls have a total width of \\(2 \\times (30 + 20) = 100\\text{ cm}\\), so their wet area is \\(100 \\times 15 = 1500\\text{ cm}^2\\). The total is \\(600 + 1500 = 2100\\text{ cm}^2\\)."
      },
      {
        "text": "2700 cm²",
        "correct": false,
        "feedback": "Counted the water surface as well, \\(2100 + 600 = 2700\\), giving 2700 cm². The top of the water touches air, not the tank."
      },
      {
        "text": "750 cm²",
        "correct": false,
        "feedback": "Used 1 litre = 100 cm³, so the depth came to 1.5 cm and the wet area to \\(600 + 100 \\times 1.5 = 750\\), giving 750 cm². One litre is 1000 cm³."
      },
      {
        "text": "1500 cm²",
        "correct": false,
        "feedback": "Found only the four walls, \\(100 \\times 15 = 1500\\), giving 1500 cm². The base, 600 cm², is in contact with the water too."
      }
    ],
    "backward": "Large and small units, Ch7, and area of a rectangle, Ch7.",
    "forward": "Later in this chapter you meet tanks that are cylinders."
  },
  {
    "itemId": "d13",
    "order": 13,
    "cluster": "C1",
    "clusterName": "Volume of prisms and cylinders",
    "question": "The circumference of the circular end of a cylinder is 31.4 cm and its height is 10 cm. Use \\(\\pi = 3.14\\). What is its volume?",
    "options": [
      {
        "text": "3140 cm³",
        "correct": false,
        "feedback": "Divided the circumference by π only, \\(31.4 \\div 3.14 = 10\\), and used that as the radius: \\(3.14 \\times 10 \\times 10 \\times 10 = 3140\\), giving 3140 cm³. That value is the diameter; the radius is half of it, 5."
      },
      {
        "text": "785 cm³",
        "correct": true,
        "feedback": "Correct. The circumference is \\(2 \\times \\pi \\times r\\), so \\(r = 31.4 \\div 6.28 = 5\\text{ cm}\\). The volume is \\(3.14 \\times 5 \\times 5 \\times 10 = 785\\text{ cm}^3\\)."
      },
      {
        "text": "314 cm³",
        "correct": false,
        "feedback": "Multiplied the circumference by the height, \\(31.4 \\times 10 = 314\\), giving 314 cm³. That is the area of the curved surface, not the volume."
      },
      {
        "text": "78.5 cm³",
        "correct": false,
        "feedback": "Found only the area of the circular end, \\(3.14 \\times 5 \\times 5 = 78.5\\), giving 78.5 cm³. Multiply by the height, 10, to get a volume."
      }
    ],
    "backward": "Circumference of a circle, Ch7.",
    "forward": "Later in this chapter you find the surface areas of cylinders."
  },
  {
    "itemId": "d14",
    "order": 14,
    "cluster": "C4",
    "clusterName": "Surface area of pyramids",
    "question": "What is the vertical height of the pyramid shown?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 394 288\" width=\"394\" height=\"288\" role=\"img\" aria-label=\"Square-based pyramid, base edge 16 cm, slant height 17 cm.\"><rect x=\"0\" y=\"0\" width=\"394\" height=\"288\" fill=\"#ffffff\"/><polygon points=\"58,237.71 235.36,237.71 183,46\" fill=\"#eef4fa\" stroke=\"none\"/><polygon points=\"235.36,237.71 308,186.84 183,46\" fill=\"#eef4fa\" stroke=\"none\"/><line x1=\"130.64\" y1=\"186.84\" x2=\"308\" y2=\"186.84\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"58\" y1=\"237.71\" x2=\"130.64\" y2=\"186.84\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"130.64\" y1=\"186.84\" x2=\"183\" y2=\"46\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"58\" y1=\"237.71\" x2=\"235.36\" y2=\"237.71\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"235.36\" y1=\"237.71\" x2=\"308\" y2=\"186.84\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"183\" y1=\"46\" x2=\"235.36\" y2=\"237.71\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"58\" y1=\"237.71\" x2=\"183\" y2=\"46\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"183\" y1=\"46\" x2=\"308\" y2=\"186.84\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"183\" y1=\"46\" x2=\"146.68\" y2=\"237.71\" stroke=\"#c0392b\" stroke-width=\"1.8\" stroke-dasharray=\"6 4\"/><text x=\"146.68\" y=\"257.71\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">16 cm</text><rect x=\"143.34\" y=\"133.85\" width=\"43\" height=\"18\" fill=\"#ffffff\"/><text x=\"164.84\" y=\"146.85\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">17 cm</text></svg></div>",
    "options": [
      {
        "text": "18.8 cm",
        "correct": false,
        "feedback": "Added the squares, \\(17 \\times 17 + 8 \\times 8 = 353\\), and took the square root, about 18.8, giving 18.8 cm. The slant height is the hypotenuse, so subtract the squares."
      },
      {
        "text": "15 cm",
        "correct": true,
        "feedback": "Correct. Half the base edge is 8. The slant height is the hypotenuse, so vertical height² = \\(17 \\times 17 - 8 \\times 8 = 289 - 64 = 225\\), and the square root of 225 is 15 cm."
      },
      {
        "text": "225 cm",
        "correct": false,
        "feedback": "Found \\(17 \\times 17 - 8 \\times 8 = 225\\) but did not take the square root, giving 225 cm. The height is the square root of that."
      },
      {
        "text": "9 cm",
        "correct": false,
        "feedback": "Subtracted the lengths, \\(17 - 8 = 9\\), giving 9 cm. Use Pythagoras: subtract the squares, \\(17 \\times 17 - 8 \\times 8 = 225\\), then take the square root."
      }
    ],
    "backward": "Pythagoras' theorem, Ch5.",
    "forward": "Later in this chapter you use the vertical height in longer pyramid problems."
  },
  {
    "itemId": "d15",
    "order": 15,
    "cluster": "C2",
    "clusterName": "Surface area of cuboids and triangular prisms",
    "question": "A closed box is a cuboid 20 cm long, 10 cm wide and 5 cm high. All faces except the bottom are painted. What area is painted?",
    "options": [
      {
        "text": "650 cm²",
        "correct": false,
        "feedback": "Subtracted an end face instead of the bottom, \\(700 - 50 = 650\\), giving 650 cm². The face that is not painted is the 20 by 10 bottom, 200."
      },
      {
        "text": "700 cm²",
        "correct": false,
        "feedback": "Found the whole surface area, 700, giving 700 cm². The bottom face, 200, is not painted, so subtract it."
      },
      {
        "text": "300 cm²",
        "correct": false,
        "feedback": "Found only the four sides, \\(2 \\times (20 \\times 5) + 2 \\times (10 \\times 5) = 200 + 100 = 300\\), giving 300 cm². The top face is painted as well."
      },
      {
        "text": "500 cm²",
        "correct": true,
        "feedback": "Correct. The total surface area is \\(2 \\times (20 \\times 10) + 2 \\times (20 \\times 5) + 2 \\times (10 \\times 5) = 400 + 200 + 100 = 700\\). The bottom is \\(20 \\times 10 = 200\\), so the painted area is \\(700 - 200 = 500\\text{ cm}^2\\)."
      }
    ],
    "backward": "Areas of rectangles, Ch7.",
    "forward": "Later in this chapter you find surface areas with faces missing in cylinders."
  },
  {
    "itemId": "d16",
    "order": 16,
    "cluster": "C5",
    "clusterName": "Symmetry in 3D",
    "question": "Which of these solids has exactly 3 planes of symmetry?",
    "options": [
      {
        "text": "A cube",
        "correct": false,
        "feedback": "A cube has 9 planes of symmetry: 3 parallel to the faces and 6 diagonal ones. It has more than 3."
      },
      {
        "text": "A cuboid with unequal edges",
        "correct": true,
        "feedback": "Correct. A cuboid with three different edge lengths has one plane parallel to each pair of opposite faces, and no others: 3 planes."
      },
      {
        "text": "A prism with equilateral triangle ends",
        "correct": false,
        "feedback": "A prism with equilateral triangle ends has 4 planes: 3 lengthways, one through each corner, and 1 across the middle of the length. It has more than 3."
      },
      {
        "text": "A square-based pyramid",
        "correct": false,
        "feedback": "A square-based pyramid has 4 planes: 2 through the midpoints of opposite base edges and 2 through opposite corners. It has more than 3."
      }
    ],
    "backward": "Reflection and line symmetry, Ch13.",
    "forward": "Later in this chapter you count the planes of other solids."
  },
  {
    "itemId": "d17",
    "order": 17,
    "cluster": "C3",
    "clusterName": "Surface area of cylinders",
    "question": "An open cylindrical tank has a diameter of 2 m and a height of 1.5 m. Use \\(\\pi = 3.14\\). What area of the inside surface (the curved surface and the base) needs painting?",
    "options": [
      {
        "text": "9.42 m²",
        "correct": false,
        "feedback": "Found only the curved surface, \\(2 \\times 3.14 \\times 1 \\times 1.5 = 9.42\\), giving 9.42 m². The base is part of the inside surface and must be added."
      },
      {
        "text": "12.56 m²",
        "correct": true,
        "feedback": "Correct. The radius is 1 m. The curved surface is \\(2 \\times 3.14 \\times 1 \\times 1.5 = 9.42\\) and the base is \\(3.14 \\times 1 \\times 1 = 3.14\\). With no lid, the total is \\(9.42 + 3.14 = 12.56\\text{ m}^2\\)."
      },
      {
        "text": "31.4 m²",
        "correct": false,
        "feedback": "Used the diameter as the radius: \\(2 \\times 3.14 \\times 2 \\times 1.5 = 18.84\\) and \\(3.14 \\times 2 \\times 2 = 12.56\\), giving \\(18.84 + 12.56 = 31.4\\text{ m}^2\\). The radius is half of the diameter, 1 m."
      },
      {
        "text": "15.7 m²",
        "correct": false,
        "feedback": "Added a lid as well: \\(9.42 + 6.28 = 15.7\\), giving 15.7 m². The tank is open, so there is only one circle, the base."
      }
    ],
    "backward": "Circumference and area of a circle, Ch7.",
    "forward": "Later in this chapter you use cylinders with no lid in longer problems."
  },
  {
    "itemId": "d18",
    "order": 18,
    "cluster": "C6",
    "clusterName": "Mixed 3D problems",
    "question": "A cube has a total surface area of 384 cm². What is its volume?",
    "options": [
      {
        "text": "384 cm³",
        "correct": false,
        "feedback": "Gave the surface area from the question, 384, with volume units, giving 384 cm³. The volume is the edge cubed, \\(8 \\times 8 \\times 8 = 512\\)."
      },
      {
        "text": "64 cm³",
        "correct": false,
        "feedback": "Found the area of one face, \\(384 \\div 6 = 64\\), and gave it as 64 cm³. That is an area; the edge, 8 cm, is needed for the volume."
      },
      {
        "text": "512 cm³",
        "correct": true,
        "feedback": "Correct. A cube has 6 faces, so each face has area \\(384 \\div 6 = 64\\text{ cm}^2\\). The edge is 8 cm, since \\(8 \\times 8 = 64\\). The volume is \\(8 \\times 8 \\times 8 = 512\\text{ cm}^3\\)."
      },
      {
        "text": "8 cm³",
        "correct": false,
        "feedback": "Stopped at the edge length, 8, giving 8 cm³. The volume is the edge cubed, \\(8 \\times 8 \\times 8 = 512\\)."
      }
    ],
    "backward": "Indices, Ch1.",
    "forward": "Later in this chapter you combine volume and surface area in longer problems."
  },
  {
    "itemId": "d19",
    "order": 19,
    "cluster": "C1",
    "clusterName": "Volume of prisms and cylinders",
    "question": "Find the capacity, in litres, of a cuboid tank that is 1.5 m long, 80 cm wide and 60 cm high.",
    "options": [
      {
        "text": "0.72 litres",
        "correct": false,
        "feedback": "Gave 0.72 litres, which would come from dividing by 1 000 000. One litre is 1000 cm³, so \\(720\\,000 \\div 1000 = 720\\)."
      },
      {
        "text": "7.2 litres",
        "correct": false,
        "feedback": "Used 1.5 without changing it to centimetres: \\(1.5 \\times 80 \\times 60 = 7200\\), and \\(7200 \\div 1000 = 7.2\\), giving 7.2 litres. All three lengths must be in cm first: \\(1.5\\text{ m} = 150\\text{ cm}\\)."
      },
      {
        "text": "72 litres",
        "correct": false,
        "feedback": "Gave 72 litres, which would come from dividing by 10 000. One litre is 1000 cm³, so \\(720\\,000 \\div 1000 = 720\\)."
      },
      {
        "text": "720 litres",
        "correct": true,
        "feedback": "Correct. \\(1.5\\text{ m} = 150\\text{ cm}\\), so the volume is \\(150 \\times 80 \\times 60 = 720\\,000\\text{ cm}^3\\). One litre is 1000 cm³, so the tank holds \\(720\\,000 \\div 1000 = 720\\) litres."
      }
    ],
    "backward": "Large and small units, Ch7.",
    "forward": "Later in this chapter you find depths from capacities."
  },
  {
    "itemId": "d20",
    "order": 20,
    "cluster": "C4",
    "clusterName": "Surface area of pyramids",
    "question": "The square-based pyramid shown has a total surface area of 640 cm². What is the slant height of each triangular face?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 394 221\" width=\"394\" height=\"221\" role=\"img\" aria-label=\"Square-based pyramid with base edge 16 cm.\"><rect x=\"0\" y=\"0\" width=\"394\" height=\"221\" fill=\"#ffffff\"/><polygon points=\"58,170.58 235.36,170.58 183,46\" fill=\"#eef4fa\" stroke=\"none\"/><polygon points=\"235.36,170.58 308,119.71 183,46\" fill=\"#eef4fa\" stroke=\"none\"/><line x1=\"130.64\" y1=\"119.71\" x2=\"308\" y2=\"119.71\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"58\" y1=\"170.58\" x2=\"130.64\" y2=\"119.71\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"130.64\" y1=\"119.71\" x2=\"183\" y2=\"46\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"58\" y1=\"170.58\" x2=\"235.36\" y2=\"170.58\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"235.36\" y1=\"170.58\" x2=\"308\" y2=\"119.71\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"183\" y1=\"46\" x2=\"235.36\" y2=\"170.58\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"58\" y1=\"170.58\" x2=\"183\" y2=\"46\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"183\" y1=\"46\" x2=\"308\" y2=\"119.71\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><text x=\"146.68\" y=\"190.58\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">16 cm</text></svg></div>",
    "options": [
      {
        "text": "12 cm",
        "correct": true,
        "feedback": "Correct. The base is \\(16 \\times 16 = 256\\), so the four faces have area \\(640 - 256 = 384\\), and one face is \\(384 \\div 4 = 96\\). Then \\(\\tfrac{1}{2} \\times 16 \\times \\text{slant height} = 96\\), so \\(8 \\times \\text{slant height} = 96\\) and the slant height is \\(96 \\div 8 = 12\\text{ cm}\\)."
      },
      {
        "text": "6 cm",
        "correct": false,
        "feedback": "Forgot the ½: \\(96 \\div 16 = 6\\), giving 6 cm. The area of a triangle is \\(\\tfrac{1}{2} \\times \\text{base} \\times \\text{height}\\), so divide by 8."
      },
      {
        "text": "48 cm",
        "correct": false,
        "feedback": "Forgot to divide by 4: \\(384 \\div 8 = 48\\), giving 48 cm. The area of the four faces must be shared between 4 triangles first."
      },
      {
        "text": "20 cm",
        "correct": false,
        "feedback": "Did not subtract the base: \\(640 \\div 4 = 160\\) for one face, then \\(160 \\div 8 = 20\\), giving 20 cm. The base, 256, is not part of the four triangles."
      }
    ],
    "backward": "Solving equations, Ch4.",
    "forward": "Later in this chapter you find the vertical height from the slant height."
  },
  {
    "itemId": "d21",
    "order": 21,
    "cluster": "C2",
    "clusterName": "Surface area of cuboids and triangular prisms",
    "question": "The total surface area of the triangular prism shown is 270 cm². What is its length?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 262 306\" width=\"262\" height=\"306\" role=\"img\" aria-label=\"Triangular prism with end sides 5 cm, 12 cm and 13 cm.\"><rect x=\"0\" y=\"0\" width=\"262\" height=\"306\" fill=\"#ffffff\"/><polygon points=\"58,76.1 132.96,256 58,256\" fill=\"#eef4fa\" stroke=\"none\"/><polygon points=\"132.96,256 58,76.1 100.98,46 175.94,225.9\" fill=\"#eef4fa\" stroke=\"none\"/><line x1=\"100.98\" y1=\"225.9\" x2=\"175.94\" y2=\"225.9\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"100.98\" y1=\"225.9\" x2=\"100.98\" y2=\"46\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"58\" y1=\"256\" x2=\"100.98\" y2=\"225.9\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"58\" y1=\"76.1\" x2=\"132.96\" y2=\"256\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"58\" y1=\"256\" x2=\"132.96\" y2=\"256\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"58\" y1=\"256\" x2=\"58\" y2=\"76.1\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"100.98\" y1=\"46\" x2=\"175.94\" y2=\"225.9\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"132.96\" y1=\"256\" x2=\"175.94\" y2=\"225.9\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"58\" y1=\"76.1\" x2=\"100.98\" y2=\"46\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><polyline points=\"69,256 69,245 58,245\" stroke=\"#333333\" stroke-width=\"1.3\" fill=\"none\"/><text x=\"95.48\" y=\"276\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">5 cm</text><text x=\"47\" y=\"171.05\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"end\">12 cm</text><text x=\"106.56\" y=\"164.89\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"start\">13 cm</text></svg></div>",
    "options": [
      {
        "text": "8 cm",
        "correct": false,
        "feedback": "Subtracted only one triangular end: \\((270 - 30) \\div 30 = 240 \\div 30 = 8\\), giving 8 cm. There are two triangular ends, 60 in total."
      },
      {
        "text": "12.4 cm",
        "correct": false,
        "feedback": "Left out the 13 cm side: \\(210 \\div (5 + 12) = 210 \\div 17\\) is about 12.4, giving 12.4 cm. All three rectangles have the same length, so the widths are \\(5 + 12 + 13 = 30\\)."
      },
      {
        "text": "7 cm",
        "correct": true,
        "feedback": "Correct. The two triangular ends are \\(2 \\times (\\tfrac{1}{2} \\times 5 \\times 12) = 60\\). So the three rectangles have area \\(270 - 60 = 210\\). Their widths add to \\(5 + 12 + 13 = 30\\), so \\(30 \\times \\text{length} = 210\\) and the length is \\(210 \\div 30 = 7\\text{ cm}\\)."
      },
      {
        "text": "9 cm",
        "correct": false,
        "feedback": "Forgot the two triangular ends: \\(270 \\div 30 = 9\\), giving 9 cm. Subtract the ends, 60, first."
      }
    ],
    "backward": "Solving equations, Ch4.",
    "forward": "Later in this chapter you find missing lengths in cylinders."
  },
  {
    "itemId": "d22",
    "order": 22,
    "cluster": "C5",
    "clusterName": "Symmetry in 3D",
    "question": "A prism has ends that are regular polygons. It has 11 planes of symmetry in total. How many sides does each end have?",
    "options": [
      {
        "text": "11 sides",
        "correct": false,
        "feedback": "Did not remove the plane across the middle of the length, so used all 11 planes for the ends and gave 11 sides. Only \\(11 - 1 = 10\\) planes are lengthways."
      },
      {
        "text": "12 sides",
        "correct": false,
        "feedback": "Added 1 instead of subtracting it, \\(11 + 1 = 12\\), giving 12 sides. The plane across the middle is one of the 11, so the lengthways planes number \\(11 - 1 = 10\\)."
      },
      {
        "text": "5 sides",
        "correct": false,
        "feedback": "Halved the 10 lengthways planes, thinking each line of symmetry is counted twice, and gave 5 sides. A regular polygon has one line of symmetry for each side, so 10 planes means 10 sides."
      },
      {
        "text": "10 sides",
        "correct": true,
        "feedback": "Correct. One plane cuts across the middle of the length, so the other \\(11 - 1 = 10\\) planes cut lengthways, one for each line of symmetry of the end. A regular polygon has as many lines of symmetry as it has sides, so each end has 10 sides."
      }
    ],
    "backward": "Reflection and line symmetry, Ch13.",
    "forward": "Later in this chapter you use symmetry to simplify volume and area problems."
  },
  {
    "itemId": "d23",
    "order": 23,
    "cluster": "C3",
    "clusterName": "Surface area of cylinders",
    "question": "A closed cylinder has a radius of 5 cm and a total surface area of 282.6 cm². Use \\(\\pi = 3.14\\). What is its height?",
    "options": [
      {
        "text": "6.5 cm",
        "correct": false,
        "feedback": "Subtracted only one circular end, \\(282.6 - 78.5 = 204.1\\), then \\(204.1 \\div 31.4 = 6.5\\), giving 6.5 cm. A closed cylinder has two circular ends, so \\(2 \\times 78.5 = 157\\) must come off the surface area."
      },
      {
        "text": "18 cm",
        "correct": false,
        "feedback": "Left out the 2 in the circumference: \\(282.6 \\div (3.14 \\times 5 = 15.7) = 282.6 \\div 15.7 = 18\\), giving 18 cm. The circumference is \\(2 \\times \\pi \\times r = 31.4\\)."
      },
      {
        "text": "9 cm",
        "correct": false,
        "feedback": "Stopped after dividing, \\(282.6 \\div 31.4 = 9\\), giving 9 cm. That value is the radius plus the height, so subtract the radius, 5."
      },
      {
        "text": "4 cm",
        "correct": true,
        "feedback": "Correct. The total surface area is \\(2 \\times \\pi \\times r \\times (r + \\text{height})\\), and \\(2 \\times \\pi \\times r = 2 \\times 3.14 \\times 5 = 31.4\\). So \\(31.4 \\times (r + \\text{height}) = 282.6\\), which gives \\(r + \\text{height} = 282.6 \\div 31.4 = 9\\). The height is \\(9 - 5 = 4\\text{ cm}\\)."
      }
    ],
    "backward": "Solving equations, Ch4.",
    "forward": "Later in this chapter you use cylinders in problems with several steps."
  },
  {
    "itemId": "d24",
    "order": 24,
    "cluster": "C6",
    "clusterName": "Mixed 3D problems",
    "question": "The volume of a closed cylinder of radius 10 cm is 6280 cm³. Use \\(\\pi = 3.14\\). Find its total surface area.",
    "options": [
      {
        "text": "1884 cm²",
        "correct": true,
        "feedback": "Correct. The area of a circular end is \\(3.14 \\times 10 \\times 10 = 314\\), so the height is \\(6280 \\div 314 = 20\\text{ cm}\\). The curved surface is \\(2 \\times 3.14 \\times 10 \\times 20 = 1256\\) and the two ends are \\(2 \\times 3.14 \\times 10 \\times 10 = 628\\). The total is \\(1256 + 628 = 1884\\text{ cm}^2\\)."
      },
      {
        "text": "942 cm²",
        "correct": false,
        "feedback": "Used the diameter, 20, as the radius when finding the height: \\(6280 \\div (3.14 \\times 20 \\times 20 = 1256) = 5\\text{ cm}\\), so the curved surface was \\(2 \\times 3.14 \\times 10 \\times 5 = 314\\) and the total \\(314 + 628 = 942\\), giving 942 cm². The area of a circular end uses the radius, 10."
      },
      {
        "text": "1256 cm²",
        "correct": false,
        "feedback": "Found only the curved surface, \\(2 \\times 3.14 \\times 10 \\times 20 = 1256\\), giving 1256 cm². A closed cylinder also has two circular ends, 628."
      },
      {
        "text": "628 cm²",
        "correct": false,
        "feedback": "Found only the two circular ends, \\(2 \\times 3.14 \\times 10 \\times 10 = 628\\), giving 628 cm². The curved surface, 1256, must be added."
      }
    ],
    "backward": "Solving equations, Ch4.",
    "forward": "Later in this chapter you meet more problems that join volume and area."
  }
];

const recheckItems = [
  {
    "itemId": "r1",
    "order": 1,
    "cluster": "C1",
    "clusterName": "Volume of prisms and cylinders",
    "question": "The prism shown has a volume of 165 cm³. What is its length?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 394 290\" width=\"394\" height=\"290\" role=\"img\" aria-label=\"Triangular prism with end base 6 cm and perpendicular height 5 cm.\"><rect x=\"0\" y=\"0\" width=\"394\" height=\"290\" fill=\"#ffffff\"/><polygon points=\"105.59,121.07 200.78,240.06 58,240.06\" fill=\"#eef4fa\" stroke=\"none\"/><polygon points=\"200.78,240.06 105.59,121.07 212.81,46 308,164.99\" fill=\"#eef4fa\" stroke=\"none\"/><line x1=\"165.22\" y1=\"164.99\" x2=\"308\" y2=\"164.99\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"165.22\" y1=\"164.99\" x2=\"212.81\" y2=\"46\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"58\" y1=\"240.06\" x2=\"165.22\" y2=\"164.99\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"105.59\" y1=\"121.07\" x2=\"200.78\" y2=\"240.06\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"58\" y1=\"240.06\" x2=\"200.78\" y2=\"240.06\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"58\" y1=\"240.06\" x2=\"105.59\" y2=\"121.07\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"212.81\" y1=\"46\" x2=\"308\" y2=\"164.99\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"200.78\" y1=\"240.06\" x2=\"308\" y2=\"164.99\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"105.59\" y1=\"121.07\" x2=\"212.81\" y2=\"46\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"105.59\" y1=\"121.07\" x2=\"105.59\" y2=\"240.06\" stroke=\"#c0392b\" stroke-width=\"1.8\" stroke-dasharray=\"6 4\"/><polyline points=\"115.59,240.06 115.59,230.06 105.59,230.06\" stroke=\"#333333\" stroke-width=\"1.3\" fill=\"none\"/><text x=\"129.39\" y=\"260.06\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">6 cm</text><rect x=\"87.79\" y=\"172.57\" width=\"35.6\" height=\"18\" fill=\"#ffffff\"/><text x=\"105.59\" y=\"185.57\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">5 cm</text></svg></div>",
    "options": [
      {
        "text": "5.5 cm",
        "correct": false,
        "feedback": "Forgot the ½ for the triangle: \\(165 \\div 30 = 5.5\\), giving 5.5 cm. The cross-section area is \\(\\tfrac{1}{2} \\times 6 \\times 5 = 15\\)."
      },
      {
        "text": "11 cm",
        "correct": true,
        "feedback": "Correct. The area of the triangular end is \\(\\tfrac{1}{2} \\times 6 \\times 5 = 15\\text{ cm}^2\\). Volume = area × length, so the length is \\(165 \\div 15 = 11\\text{ cm}\\)."
      },
      {
        "text": "33 cm",
        "correct": false,
        "feedback": "Divided the volume by only the height of the triangle, \\(165 \\div 5 = 33\\), giving 33 cm. Divide by the whole cross-section area, 15."
      },
      {
        "text": "27.5 cm",
        "correct": false,
        "feedback": "Divided the volume by only the base of the triangle, \\(165 \\div 6 = 27.5\\), giving 27.5 cm. Divide by the whole cross-section area, 15."
      }
    ],
    "backward": "Area of a triangle, Ch7.",
    "forward": "Later in this chapter you use the same method for cylinders."
  },
  {
    "itemId": "r2",
    "order": 2,
    "cluster": "C2",
    "clusterName": "Surface area of cuboids and triangular prisms",
    "question": "A cuboid has a square base of side 6 cm and a total surface area of 408 cm². What is its height?",
    "options": [
      {
        "text": "56 cm",
        "correct": false,
        "feedback": "Divided the area of the sides by only one side of the base, \\(336 \\div 6 = 56\\), giving 56 cm. The four sides together are \\(24 \\times \\text{height}\\)."
      },
      {
        "text": "14 cm",
        "correct": true,
        "feedback": "Correct. The two square ends have area \\(2 \\times (6 \\times 6) = 72\\), so the four sides have area \\(408 - 72 = 336\\). Each side is \\(6 \\times \\text{height}\\), so \\(24 \\times \\text{height} = 336\\), and the height is \\(336 \\div 24 = 14\\text{ cm}\\)."
      },
      {
        "text": "68 cm",
        "correct": false,
        "feedback": "Divided the whole surface area by 6, \\(408 \\div 6 = 68\\), giving 68 cm. First remove the two square ends, then divide by the four sides, 24."
      },
      {
        "text": "15.5 cm",
        "correct": false,
        "feedback": "Subtracted only one square end: \\(408 - 36 = 372\\), then \\(372 \\div 24 = 15.5\\), giving 15.5 cm. There are two square ends, \\(2 \\times (6 \\times 6) = 72\\)."
      }
    ],
    "backward": "Solving equations, Ch4.",
    "forward": "Later in this chapter you find missing lengths of prisms and cylinders."
  },
  {
    "itemId": "r3",
    "order": 3,
    "cluster": "C3",
    "clusterName": "Surface area of cylinders",
    "question": "What is the total outside area of the closed cylinder shown? Use \\(\\pi = 3.14\\).<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 420 208\" width=\"420\" height=\"208\" role=\"img\" aria-label=\"Closed cylinder with diameter 10 cm and height 2 cm.\"><rect x=\"0\" y=\"0\" width=\"420\" height=\"208\" fill=\"#ffffff\"/><ellipse cx=\"190\" cy=\"82\" rx=\"120\" ry=\"36\" fill=\"#eef4fa\" stroke=\"#333333\" stroke-width=\"2\"/><line x1=\"70\" y1=\"82\" x2=\"70\" y2=\"130\" stroke=\"#333333\" stroke-width=\"2\"/><line x1=\"310\" y1=\"82\" x2=\"310\" y2=\"130\" stroke=\"#333333\" stroke-width=\"2\"/><path d=\"M 70 130 A 120 36 0 0 0 310 130\" fill=\"none\" stroke=\"#333333\" stroke-width=\"2\"/><path d=\"M 70 130 A 120 36 0 0 1 310 130\" fill=\"none\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"70\" y1=\"82\" x2=\"310\" y2=\"82\" stroke=\"#333333\" stroke-width=\"1.8\"/><text x=\"190\" y=\"40\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">10 cm</text><line x1=\"314\" y1=\"82\" x2=\"342\" y2=\"82\" stroke=\"#888888\" stroke-width=\"1\"/><line x1=\"314\" y1=\"130\" x2=\"342\" y2=\"130\" stroke=\"#888888\" stroke-width=\"1\"/><line x1=\"338\" y1=\"82\" x2=\"338\" y2=\"130\" stroke=\"#333333\" stroke-width=\"1.5\"/><polyline points=\"334,90 338,82 342,90\" stroke=\"#333333\" stroke-width=\"1.5\" fill=\"none\"/><polyline points=\"334,122 338,130 342,122\" stroke=\"#333333\" stroke-width=\"1.5\" fill=\"none\"/><text x=\"346\" y=\"111\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"start\">2 cm</text></svg></div>",
    "options": [
      {
        "text": "219.8 cm²",
        "correct": true,
        "feedback": "Correct. The radius is 5 cm. The curved surface is \\(2 \\times 3.14 \\times 5 \\times 2 = 62.8\\) and the two circular ends are \\(2 \\times 3.14 \\times 5 \\times 5 = 157\\). The total is \\(62.8 + 157 = 219.8\\text{ cm}^2\\)."
      },
      {
        "text": "141.3 cm²",
        "correct": false,
        "feedback": "Added only one circular end, \\(62.8 + 78.5 = 141.3\\), giving 141.3 cm². A closed cylinder has two circular ends."
      },
      {
        "text": "62.8 cm²",
        "correct": false,
        "feedback": "Found only the curved surface, \\(2 \\times 3.14 \\times 5 \\times 2 = 62.8\\), giving 62.8 cm². A closed cylinder also has two circular ends."
      },
      {
        "text": "157 cm²",
        "correct": false,
        "feedback": "Found only the two circular ends, \\(2 \\times 3.14 \\times 5 \\times 5 = 157\\), giving 157 cm². The curved surface, 62.8, must be added."
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
    "question": "What area of card is needed for one sloping triangular face of the pyramid in the diagram?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 303 306\" width=\"303\" height=\"306\" role=\"img\" aria-label=\"Square-based pyramid, base edge 14 cm, vertical height 24 cm.\"><rect x=\"0\" y=\"0\" width=\"303\" height=\"306\" fill=\"#ffffff\"/><polygon points=\"58,256 171.04,256 137.67,46\" fill=\"#eef4fa\" stroke=\"none\"/><polygon points=\"171.04,256 217.34,223.58 137.67,46\" fill=\"#eef4fa\" stroke=\"none\"/><line x1=\"104.3\" y1=\"223.58\" x2=\"217.34\" y2=\"223.58\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"58\" y1=\"256\" x2=\"104.3\" y2=\"223.58\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"104.3\" y1=\"223.58\" x2=\"137.67\" y2=\"46\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"58\" y1=\"256\" x2=\"171.04\" y2=\"256\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"171.04\" y1=\"256\" x2=\"217.34\" y2=\"223.58\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"137.67\" y1=\"46\" x2=\"171.04\" y2=\"256\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"58\" y1=\"256\" x2=\"137.67\" y2=\"46\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"137.67\" y1=\"46\" x2=\"217.34\" y2=\"223.58\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"137.67\" y1=\"46\" x2=\"137.67\" y2=\"239.79\" stroke=\"#c0392b\" stroke-width=\"1.8\" stroke-dasharray=\"6 4\"/><line x1=\"141.67\" y1=\"46\" x2=\"247.34\" y2=\"46\" stroke=\"#888888\" stroke-width=\"1\"/><line x1=\"141.67\" y1=\"239.79\" x2=\"247.34\" y2=\"239.79\" stroke=\"#888888\" stroke-width=\"1\"/><line x1=\"243.34\" y1=\"46\" x2=\"243.34\" y2=\"239.79\" stroke=\"#333333\" stroke-width=\"1.5\"/><polyline points=\"239.34,54 243.34,46 247.34,54\" stroke=\"#333333\" stroke-width=\"1.5\" fill=\"none\"/><polyline points=\"239.34,231.79 243.34,239.79 247.34,231.79\" stroke=\"#333333\" stroke-width=\"1.5\" fill=\"none\"/><text x=\"114.52\" y=\"276\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">14 cm</text><text x=\"251.34\" y=\"147.9\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"start\">24 cm</text></svg></div>",
    "options": [
      {
        "text": "168 cm²",
        "correct": false,
        "feedback": "Used the vertical height as the height of the triangle: \\(\\tfrac{1}{2} \\times 14 \\times 24 = 168\\), giving 168 cm². The height of a face is the slant height, 25 cm."
      },
      {
        "text": "175 cm²",
        "correct": true,
        "feedback": "Correct. Half the base edge is 7, and \\(7 \\times 7 + 24 \\times 24 = 49 + 576 = 625\\), so the slant height is 25 cm. The area of one face is \\(\\tfrac{1}{2} \\times 14 \\times 25 = 175\\text{ cm}^2\\)."
      },
      {
        "text": "350 cm²",
        "correct": false,
        "feedback": "Forgot the ½ and found \\(14 \\times 25 = 350\\), giving 350 cm². A triangle is half of that rectangle."
      },
      {
        "text": "194.5 cm²",
        "correct": false,
        "feedback": "Used the whole base edge in Pythagoras: \\(14 \\times 14 + 24 \\times 24 = 772\\), a slant height of about 27.78, which gives about 194.5 cm². The right-angled triangle uses half the base edge, 7."
      }
    ],
    "backward": "Pythagoras' theorem, Ch5.",
    "forward": "Later in this chapter you find the total surface area."
  },
  {
    "itemId": "r5",
    "order": 5,
    "cluster": "C5",
    "clusterName": "Symmetry in 3D",
    "question": "A prism has ends that are regular heptagons (7 sides). How many planes of symmetry does it have?",
    "options": [
      {
        "text": "8 planes",
        "correct": true,
        "feedback": "Correct. A regular heptagon has 7 lines of symmetry, so 7 planes cut lengthways. One more plane cuts across the middle of the length: \\(7 + 1 = 8\\)."
      },
      {
        "text": "14 planes",
        "correct": false,
        "feedback": "Counted the 14 corners of the two heptagons, giving 14 planes. A plane of symmetry is a mirror cut through the middle; the heptagon has 7 lines of symmetry, so \\(7 + 1 = 8\\)."
      },
      {
        "text": "9 planes",
        "correct": false,
        "feedback": "Counted the 9 faces, giving 9 planes. A plane of symmetry is a mirror cut, not a face; there are 7 lengthways planes and 1 across the middle, so \\(7 + 1 = 8\\)."
      },
      {
        "text": "21 planes",
        "correct": false,
        "feedback": "Counted the 21 edges, giving 21 planes. A plane of symmetry is a mirror cut through the middle; the heptagon has 7 lines of symmetry, so \\(7 + 1 = 8\\)."
      }
    ],
    "backward": "Reflection and line symmetry, Ch13.",
    "forward": "Later in this chapter you use symmetry to simplify volume and area problems."
  },
  {
    "itemId": "r6",
    "order": 6,
    "cluster": "C6",
    "clusterName": "Mixed 3D problems",
    "question": "A cuboid has a base measuring 5 cm by 3 cm and a volume of 120 cm³. What is its total surface area?",
    "options": [
      {
        "text": "120 cm²",
        "correct": false,
        "feedback": "Gave the volume from the question, 120, with area units, giving 120 cm². Surface area is the total area of all six faces, so work out the height first."
      },
      {
        "text": "79 cm²",
        "correct": false,
        "feedback": "Counted each different face once, \\(15 + 40 + 24 = 79\\), giving 79 cm². Every face has an identical partner, so double it."
      },
      {
        "text": "128 cm²",
        "correct": false,
        "feedback": "Left out the pair of 5 by 3 faces: \\(80 + 48 = 128\\), giving 128 cm². All three pairs of faces are part of the surface."
      },
      {
        "text": "158 cm²",
        "correct": true,
        "feedback": "Correct. The height is \\(120 \\div (5 \\times 3) = 120 \\div 15 = 8\\text{ cm}\\). Then the surface area is \\(2 \\times (5 \\times 3) + 2 \\times (5 \\times 8) + 2 \\times (3 \\times 8) = 30 + 80 + 48 = 158\\text{ cm}^2\\)."
      }
    ],
    "backward": "Solving equations, Ch4.",
    "forward": "Later in this chapter you combine volume and surface area for cylinders."
  },
  {
    "itemId": "r7",
    "order": 7,
    "cluster": "C1",
    "clusterName": "Volume of prisms and cylinders",
    "question": "A cuboid water butt is 2 m long, 50 cm wide and 40 cm high. How many litres can it hold?",
    "options": [
      {
        "text": "4 litres",
        "correct": false,
        "feedback": "Used 2 without changing it to centimetres: \\(2 \\times 50 \\times 40 = 4000\\), and \\(4000 \\div 1000 = 4\\), giving 4 litres. All three lengths must be in cm first: \\(2\\text{ m} = 200\\text{ cm}\\)."
      },
      {
        "text": "0.4 litres",
        "correct": false,
        "feedback": "Gave 0.4 litres, which would come from dividing by 1 000 000. One litre is 1000 cm³, so \\(400\\,000 \\div 1000 = 400\\)."
      },
      {
        "text": "400 litres",
        "correct": true,
        "feedback": "Correct. \\(2\\text{ m} = 200\\text{ cm}\\), so the volume is \\(200 \\times 50 \\times 40 = 400\\,000\\text{ cm}^3\\). One litre is 1000 cm³, so the tank holds \\(400\\,000 \\div 1000 = 400\\) litres."
      },
      {
        "text": "40 litres",
        "correct": false,
        "feedback": "Gave 40 litres, which would come from dividing by 10 000. One litre is 1000 cm³, so \\(400\\,000 \\div 1000 = 400\\)."
      }
    ],
    "backward": "Large and small units, Ch7.",
    "forward": "Later in this chapter you find depths from capacities."
  },
  {
    "itemId": "r8",
    "order": 8,
    "cluster": "C2",
    "clusterName": "Surface area of cuboids and triangular prisms",
    "question": "A closed box is a cuboid 12 cm long, 8 cm wide and 5 cm high. All faces except the bottom are covered with paper. What area of paper is needed?",
    "options": [
      {
        "text": "200 cm²",
        "correct": false,
        "feedback": "Found only the four sides, \\(2 \\times (12 \\times 5) + 2 \\times (8 \\times 5) = 120 + 80 = 200\\), giving 200 cm². The top face is covered as well."
      },
      {
        "text": "352 cm²",
        "correct": false,
        "feedback": "Subtracted an end face instead of the bottom, \\(392 - 40 = 352\\), giving 352 cm². The face that is not covered is the 12 by 8 bottom, 96."
      },
      {
        "text": "392 cm²",
        "correct": false,
        "feedback": "Found the whole surface area, 392, giving 392 cm². The bottom face, 96, is not covered, so subtract it."
      },
      {
        "text": "296 cm²",
        "correct": true,
        "feedback": "Correct. The total surface area is \\(2 \\times (12 \\times 8) + 2 \\times (12 \\times 5) + 2 \\times (8 \\times 5) = 192 + 120 + 80 = 392\\). The bottom is \\(12 \\times 8 = 96\\), so the paper needed is \\(392 - 96 = 296\\text{ cm}^2\\)."
      }
    ],
    "backward": "Areas of rectangles, Ch7.",
    "forward": "Later in this chapter you find surface areas with faces missing in cylinders."
  },
  {
    "itemId": "r9",
    "order": 9,
    "cluster": "C3",
    "clusterName": "Surface area of cylinders",
    "question": "The curved surface area of a cylinder is 188.4 cm² and its radius is 10 cm. Use \\(\\pi = 3.14\\). What is its height?",
    "options": [
      {
        "text": "3 cm",
        "correct": true,
        "feedback": "Correct. The curved surface is \\(2 \\times \\pi \\times r \\times \\text{height} = 2 \\times 3.14 \\times 10 = 62.8 \\times \\text{height} = 62.8 \\times \\text{height}\\). So the height is \\(188.4 \\div 62.8 = 3\\text{ cm}\\)."
      },
      {
        "text": "30 cm",
        "correct": false,
        "feedback": "Divided by \\(2 \\times \\pi\\) only and forgot the radius: \\(188.4 \\div 6.28 = 30\\), giving 30 cm. The curved surface is \\(2 \\times \\pi \\times r \\times \\text{height}\\), so divide by \\(2 \\times \\pi \\times r = 62.8\\)."
      },
      {
        "text": "6 cm",
        "correct": false,
        "feedback": "Left out the 2 in the circumference: \\(188.4 \\div (3.14 \\times 10 = 31.4) = 188.4 \\div 31.4 = 6\\), giving 6 cm. The circumference is \\(2 \\times \\pi \\times r = 62.8\\)."
      },
      {
        "text": "60 cm",
        "correct": false,
        "feedback": "Divided only by π, \\(188.4 \\div 3.14 = 60\\), giving 60 cm. The curved surface is \\(2 \\times \\pi \\times r \\times \\text{height}\\), so divide by \\(2 \\times \\pi \\times r = 62.8\\)."
      }
    ],
    "backward": "Solving equations, Ch4.",
    "forward": "Later in this chapter you find the height from a total surface area."
  },
  {
    "itemId": "r10",
    "order": 10,
    "cluster": "C4",
    "clusterName": "Surface area of pyramids",
    "question": "The square-based pyramid shown has a total surface area of 460 cm². What is the slant height of each triangular face?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 302 306\" width=\"302\" height=\"306\" role=\"img\" aria-label=\"Square-based pyramid with base edge 10 cm.\"><rect x=\"0\" y=\"0\" width=\"302\" height=\"306\" fill=\"#ffffff\"/><polygon points=\"58,256 170.15,256 137.04,46\" fill=\"#eef4fa\" stroke=\"none\"/><polygon points=\"170.15,256 216.08,223.84 137.04,46\" fill=\"#eef4fa\" stroke=\"none\"/><line x1=\"103.93\" y1=\"223.84\" x2=\"216.08\" y2=\"223.84\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"58\" y1=\"256\" x2=\"103.93\" y2=\"223.84\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"103.93\" y1=\"223.84\" x2=\"137.04\" y2=\"46\" stroke=\"#888888\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/><line x1=\"58\" y1=\"256\" x2=\"170.15\" y2=\"256\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"170.15\" y1=\"256\" x2=\"216.08\" y2=\"223.84\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"137.04\" y1=\"46\" x2=\"170.15\" y2=\"256\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"58\" y1=\"256\" x2=\"137.04\" y2=\"46\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"137.04\" y1=\"46\" x2=\"216.08\" y2=\"223.84\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\"/><text x=\"114.07\" y=\"276\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">10 cm</text></svg></div>",
    "options": [
      {
        "text": "23 cm",
        "correct": false,
        "feedback": "Did not subtract the base: \\(460 \\div 4 = 115\\) for one face, then \\(115 \\div 5 = 23\\), giving 23 cm. The base, 100, is not part of the four triangles."
      },
      {
        "text": "9 cm",
        "correct": false,
        "feedback": "Forgot the ½: \\(90 \\div 10 = 9\\), giving 9 cm. The area of a triangle is \\(\\tfrac{1}{2} \\times \\text{base} \\times \\text{height}\\), so divide by 5."
      },
      {
        "text": "18 cm",
        "correct": true,
        "feedback": "Correct. The base is \\(10 \\times 10 = 100\\), so the four faces have area \\(460 - 100 = 360\\), and one face is \\(360 \\div 4 = 90\\). Then \\(\\tfrac{1}{2} \\times 10 \\times \\text{slant height} = 90\\), so \\(5 \\times \\text{slant height} = 90\\) and the slant height is \\(90 \\div 5 = 18\\text{ cm}\\)."
      },
      {
        "text": "72 cm",
        "correct": false,
        "feedback": "Forgot to divide by 4: \\(360 \\div 5 = 72\\), giving 72 cm. The area of the four faces must be shared between 4 triangles first."
      }
    ],
    "backward": "Solving equations, Ch4.",
    "forward": "Later in this chapter you find the vertical height from the slant height."
  },
  {
    "itemId": "r11",
    "order": 11,
    "cluster": "C5",
    "clusterName": "Symmetry in 3D",
    "question": "What is the order of rotational symmetry about the axis joining the centres of the two ends of a prism whose ends are regular octagons?",
    "options": [
      {
        "text": "order 4",
        "correct": false,
        "feedback": "Gave order 4, which would fit a square (turns of 90°). An octagon fits after every 45° turn, so the order is \\(360 \\div 45 = 8\\)."
      },
      {
        "text": "order 10",
        "correct": false,
        "feedback": "Counted the 10 faces of the prism, giving order 10. The order is the number of times the prism fits onto itself in one full turn: \\(360 \\div 45 = 8\\)."
      },
      {
        "text": "order 16",
        "correct": false,
        "feedback": "Counted the 16 corners of the two octagons, giving order 16. The order is the number of times the prism fits onto itself in one full turn: \\(360 \\div 45 = 8\\)."
      },
      {
        "text": "order 8",
        "correct": true,
        "feedback": "Correct. A regular octagon fits onto itself after every turn of \\(360^\\circ \\div 8 = 45^\\circ\\), so the prism fits onto itself 8 times in one full turn: order 8."
      }
    ],
    "backward": "Rotation, Ch13.",
    "forward": "Later in this chapter you use symmetry to simplify volume and area problems."
  },
  {
    "itemId": "r12",
    "order": 12,
    "cluster": "C1",
    "clusterName": "Volume of prisms and cylinders",
    "question": "A cuboid tank has a base measuring 40 cm by 25 cm. It contains 15 litres of water. What area of the inside of the tank is in contact with the water (the base and the four walls, up to the water level)?",
    "options": [
      {
        "text": "3950 cm²",
        "correct": false,
        "feedback": "Counted the water surface as well, \\(2950 + 1000 = 3950\\), giving 3950 cm². The top of the water touches air, not the tank."
      },
      {
        "text": "1195 cm²",
        "correct": false,
        "feedback": "Used 1 litre = 100 cm³, so the depth came to 1.5 cm and the wet area to \\(1000 + 130 \\times 1.5 = 1195\\), giving 1195 cm². One litre is 1000 cm³."
      },
      {
        "text": "2950 cm²",
        "correct": true,
        "feedback": "Correct. 15 litres is \\(15 \\times 1000 = 15\\,000\\text{ cm}^3\\). The base area is \\(40 \\times 25 = 1000\\text{ cm}^2\\), so the depth is \\(15\\,000 \\div 1000 = 15\\text{ cm}\\). The four walls have a total width of \\(2 \\times (40 + 25) = 130\\text{ cm}\\), so their wet area is \\(130 \\times 15 = 1950\\text{ cm}^2\\). The total is \\(1000 + 1950 = 2950\\text{ cm}^2\\)."
      },
      {
        "text": "1950 cm²",
        "correct": false,
        "feedback": "Found only the four walls, \\(130 \\times 15 = 1950\\), giving 1950 cm². The base, 1000 cm², is in contact with the water too."
      }
    ],
    "backward": "Large and small units, Ch7, and area of a rectangle, Ch7.",
    "forward": "Later in this chapter you meet tanks that are cylinders."
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
  title: "Volume, Surface Area and Symmetry — Advanced Core",
  subtitle: "Grade 8 · Level 2 · Advanced Core",
  description: "Two-step volume and surface area problems, unit conversions, and planes and axes of symmetry — warm-up, diagnostic, and spaced recheck.",
  clusterNames: CLUSTER_NAMES,
  gateReviewHTML: "<p><strong>Warm-up done.</strong> Next comes the diagnostic. It is not a test and it is not timed, so there is no prize for speed. This level asks for two steps in most questions: first find what you need (a missing length from a volume, a slant height by Pythagoras, a radius from a diameter), then use it. Write each step down before you choose an answer. For each question, ask yourself first: what do I need to find before I can use the formula, and what units will the answer have? If a question feels awkward, that tells us exactly where to look next, so it is useful, not a failure.</p><p>You will meet all six topics, mixed together. Take your time.</p>",
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

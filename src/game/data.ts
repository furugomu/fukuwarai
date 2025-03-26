import type { Stage } from "./types";
import okameCover from "../assets/stages/okame/cover.png";
import okameFace from "../assets/stages/okame/face.png";
import okameEye1 from "../assets/stages/okame/eye1.png";
import okameEye2 from "../assets/stages/okame/eye2.png";
import okameNose from "../assets/stages/okame/nose.png";
import okameMouth from "../assets/stages/okame/mouth.png";

import mebaeCover from "../assets/stages/mebae/cover.png";
import mebaeEye1 from "../assets/stages/mebae/eye1.png";
import mebaeEye2 from "../assets/stages/mebae/eye2.png";
import mebaeFace from "../assets/stages/mebae/face.png";
import mebaeFlower from "../assets/stages/mebae/flower.png";
import mebaeKe from "../assets/stages/mebae/ke.png";
import mebaeKuki from "../assets/stages/mebae/kuki.png";
import mebaeMayu1 from "../assets/stages/mebae/mayu1.png";
import mebaeMayu2 from "../assets/stages/mebae/mayu2.png";
import mebaeMouth from "../assets/stages/mebae/mouth.png";

export const stage1 = {
  id: "okame",
  name: "おかめ",
  description: "日本の伝統的なお面です。",
  cover: okameCover,
  width: 640,
  height: 640,
  outline: {
    image: okameFace,
    width: 482,
    height: 579,
  },
  parts: [
    {
      id: "eye1",
      name: "目1",
      image: okameEye1,
      width: 90,
      height: 46,
    },
    {
      id: "eye2",
      name: "目2",
      image: okameEye2,
      width: 90,
      height: 46,
    },
    {
      id: "nose",
      name: "鼻",
      image: okameNose,
      width: 108,
      height: 97,
    },
    {
      id: "mouth",
      name: "口",
      image: okameMouth,
      width: 120,
      height: 65,
    },
  ],
} satisfies Stage;

const stage2 = {
  id: "mebae",
  name: "芽生え",
  description: "©姫乃みえる",
  cover: mebaeCover,
  width: 400,
  height: 400,
  outline: {
    image: mebaeFace,
    width: 270,
    height: 380,
  },
  parts: [
    {
      id: "kuki",
      name: "くき",
      image: mebaeKuki,
      width: 124,
      height: 95,
    },
    {
      id: "flower",
      name: "花",
      image: mebaeFlower,
      width: 98,
      height: 86,
    },
    {
      id: "ke",
      name: "毛",
      image: mebaeKe,
      width: 36,
      height: 77,
    },
    {
      id: "mayu1",
      name: "眉1",
      image: mebaeMayu1,
      width: 35,
      height: 8,
    },
    {
      id: "mayu2",
      name: "眉2",
      image: mebaeMayu2,
      width: 39,
      height: 7,
    },
    {
      id: "eye1",
      name: "目1",
      image: mebaeEye1,
      width: 26,
      height: 24,
    },
    {
      id: "eye2",
      name: "目2",
      image: mebaeEye2,
      width: 25,
      height: 23,
    },
    {
      id: "mouth",
      name: "口",
      image: mebaeMouth,
      width: 28,
      height: 11,
    },
  ],
} satisfies Stage;

export const stages = [stage1, stage2] as const;

export const findStageById = (id: string) =>
  stages.find((stage) => stage.id === id);

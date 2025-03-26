import type { Stage } from "./types";
import okameCover from "../assets/stages/okame/cover.png";
import okameFace from "../assets/stages/okame/face.png";
import okameEye1 from "../assets/stages/okame/eye1.png";
import okameEye2 from "../assets/stages/okame/eye2.png";
import okameNose from "../assets/stages/okame/nose.png";
import okameMouth from "../assets/stages/okame/mouth.png";

export const stage1 = {
  id: "stage1",
  name: "おかめ",
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

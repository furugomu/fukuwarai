export type Part = {
  id: string;
  name: string;
  image: string;
  width: number;
  height: number;
};

export type Stage = {
  id: string;
  name: string;
  cover: string;
  width: number;
  height: number;
  outline: { image: string; width: number; height: number };
  parts: Part[];
};

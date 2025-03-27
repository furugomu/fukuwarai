import type { Part } from "./types";

type Props = {
  parts: Part[];
};
export function Parts({ parts }: Props) {
  // 横に並べてはみ出た分はスクロール
  return (
    <div className="flex gap-2 overflow-x-auto w-[100%] max-w-[100vw] px-4 min-h-16">
      {parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
    </div>
  );
}

type PartProps = {
  part: Part;
};
const Part = ({ part }: PartProps) => {
  return (
    <div className="flex flex-col items-center gap-2 rounded-lg p-2 bg-gray-100">
      <div className="w-16 h-16">
        <img
          src={part.image}
          alt={part.name}
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
};

import { Arrow as KonvaArrow } from "react-konva";

type Props = {
  x: number;
  y: number;
  angle: number;
  ratio: number;
};

export function Arrow({ x, y, angle, ratio }: Props) {
  const color = `hsl(${90 - ratio * 90}, 70%, 50%)`;
  const length = (20 + ratio * 80) ** 1.1;
  const width = 6 + ratio * 3;
  const pointer = 5 + ratio * 15;

  return (
    <KonvaArrow
      x={x}
      y={y}
      points={[0, 0, Math.cos(angle) * length, Math.sin(angle) * length]}
      pointerLength={pointer}
      pointerWidth={pointer}
      fill={color}
      stroke={color}
      strokeWidth={width}
    />
  );
}

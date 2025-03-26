import type { ReactNode } from "react";
import { Image, Stage as KonvaStage, Layer } from "react-konva";
import useImage from "use-image";
import { type Stage } from "./types";

type Props = {
  stage: Stage;
  maxWidth?: number;
  maxHeight?: number;
  children: ReactNode;
};
export function Field({
  stage,
  maxWidth = 360,
  maxHeight = 360,
  children,
}: Props) {
  const { outline } = stage;
  const [outlineImage] = useImage(outline.image);

  const width = Math.min(stage.width, maxWidth);
  const height = Math.min(stage.height, maxHeight);
  const scale = Math.min(width / stage.width, height / stage.height);

  return (
    <KonvaStage width={width} height={height} scaleX={scale} scaleY={scale}>
      <Layer>
        <Image
          x={(stage.width - outline.width) / 2}
          y={(stage.height - outline.height) / 2}
          image={outlineImage}
          width={outline.width}
          height={outline.height}
        />
      </Layer>
      {children}
    </KonvaStage>
  );
}

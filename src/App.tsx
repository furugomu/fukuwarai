import { useState } from "react";
import { Layer } from "react-konva";
import { Ball, MovingBall } from "./game/Ball";
import { Controller } from "./game/Controller";
import { stage1 } from "./game/data";
import { Field } from "./game/Field";
import { Parts } from "./game/Parts";
import { Arrow } from "./game/Arrow";
import title from "./assets/title.png";

export function App() {
  return (
    <div>
      <Demo />
    </div>
  );
}

function Demo() {
  const stage = stage1;
  const part = stage.parts[0];

  const [ballPosition, setBallPosition] = useState({
    x: stage.width / 2 - part.width / 2,
    y: stage.height - part.height,
  });
  const [ballVelocity, setBallVelocity] = useState({ x: 0, y: 0 });
  const [isPlaying, setIsPlaying] = useState(false);
  const [angle, setAngle] = useState(0);
  const [force, setForce] = useState(0);

  const handleChange = (angle: number, force: number) => {
    setAngle(angle);
    setForce(force);
  };

  const handleShoot = (angle: number, force: number) => {
    const speed = force ** 1.1;
    setBallVelocity({
      x: Math.cos(angle) * speed,
      y: Math.sin(angle) * speed,
    });
    setIsPlaying(true);
  };

  const handleStop = (finalPosition: { x: number; y: number }) => {
    setBallPosition(finalPosition);
    setIsPlaying(false);
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <h1 className="text-2xl font-bold">
        <img src={title} alt="福笑い" height={69} />
      </h1>

      <div className="flex items-center gap-4">
        <Field stage={stage}>
          <Layer>
            {isPlaying ? (
              <MovingBall
                position={ballPosition}
                velocity={ballVelocity}
                size={{ width: part.width, height: part.height }}
                fieldSize={{ width: stage.width, height: stage.height }}
                image={part.image}
                friction={0.98}
                stopThreshold={0.4}
                onStop={handleStop}
              />
            ) : (
              <Ball
                position={ballPosition}
                size={{ width: part.width, height: part.height }}
                image={part.image}
              />
            )}
          </Layer>
          <Layer>
            <Arrow
              x={stage.width / 2}
              y={stage.height - 10}
              angle={angle}
              ratio={force / 20}
            />
          </Layer>
        </Field>
      </div>

      <div className="w-64">
        <Controller onChange={handleChange} onShoot={handleShoot} />
      </div>
      <Parts parts={stage.parts} />
    </div>
  );
}

import { useState } from "react";
import { Layer, Stage } from "react-konva";
import ballImage from "./assets/react.svg";
import { Ball, MovingBall } from "./game/Ball";

export function App() {
  return (
    <div>
      <Demo />
    </div>
  );
}

function Demo() {
  const fieldSize = { width: 600, height: 400 };
  const ballSize = { width: 40, height: 40 };

  const [ballPosition, setBallPosition] = useState({ x: 100, y: 100 });
  const [ballVelocity, setBallVelocity] = useState({ x: 0, y: 0 });
  const [isPlaying, setIsPlaying] = useState(false);

  const handleShoot = () => {
    // Generate random velocity
    const angle = Math.random() * Math.PI * 2;
    const speed = 5 + Math.random() * 10;

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
      <h1 className="text-2xl font-bold">Billiard Ball Simulation</h1>

      <div
        className="relative border-2 border-gray-800 rounded-md bg-green-700"
        style={{
          width: `${fieldSize.width}px`,
          height: `${fieldSize.height}px`,
        }}
      >
        <Stage width={fieldSize.width} height={fieldSize.height}>
          <Layer>
            {isPlaying ? (
              <MovingBall
                position={ballPosition}
                velocity={ballVelocity}
                size={ballSize}
                fieldSize={fieldSize}
                image={ballImage}
                friction={0.98}
                stopThreshold={0.4}
                onStop={handleStop}
              />
            ) : (
              <Ball position={ballPosition} size={ballSize} image={ballImage} />
            )}
          </Layer>
        </Stage>
      </div>

      <button onClick={handleShoot} disabled={isPlaying} className="mt-4">
        Shoot Ball
      </button>
    </div>
  );
}

import Konva from "konva";
import { useReducer, useRef, useState } from "react";
import type { Part, Stage } from "./types";
import { Field } from "./Field";
import { Layer } from "react-konva";
import { Ball, MovingBall } from "./Ball";
import { Arrow } from "./Arrow";
import { Controller } from "./Controller";
import { Parts } from "./Parts";
import { Dekiagari } from "./Dekiagari";

type FixedPart = Part & { x: number; y: number };

const useGame = (stage: Stage) => {
  if (stage.parts[0] == null) throw new Error("parts[0] is null");

  type Phase = "aiming" | "shooting" | "won";
  type State = {
    currentPartIndex: number;
    fixedParts: FixedPart[];
    phase: Phase;
    angle: number;
    speed: number;
  };
  const initialState: State = {
    currentPartIndex: 0,
    fixedParts: [],
    phase: "aiming",
    angle: 0,
    speed: 0,
  };
  type Action =
    | { type: "shoot"; angle: number; speed: number }
    | { type: "finishShooting"; position: { x: number; y: number } };
  const [state, dispatch] = useReducer(
    (state: State, action: Action): State => {
      switch (action.type) {
        case "shoot":
          if (state.phase !== "aiming") return state;
          return {
            ...state,
            phase: "shooting",
            angle: action.angle,
            speed: action.speed,
          };
        case "finishShooting": {
          console.debug("finishShooting", action, state);
          if (state.phase !== "shooting") return state;
          const currentPart = stage.parts[state.currentPartIndex];
          if (!currentPart) return state;
          const phase =
            state.currentPartIndex >= stage.parts.length - 1 ? "won" : "aiming";
          return {
            ...state,
            currentPartIndex: state.currentPartIndex + 1,
            fixedParts: [
              ...state.fixedParts,
              {
                ...currentPart,
                x: action.position.x,
                y: action.position.y,
              },
            ],
            phase,
          };
        }
        default:
          return state;
      }
    },
    initialState
  );
  const currentPart = stage.parts[state.currentPartIndex];

  const verocity = {
    x: Math.cos(state.angle) * state.speed,
    y: Math.sin(state.angle) * state.speed,
  };
  const restParts = stage.parts.slice(state.currentPartIndex + 1);
  return {
    ...state,
    currentPart,
    verocity,
    restParts,
    dispatch,
  };
};

export function GamePlay({ stage }: { stage: Stage }) {
  const { currentPart, fixedParts, restParts, phase, verocity, dispatch } =
    useGame(stage);

  const [angle, setAngle] = useState(Math.PI * 1.5);
  const [force, setForce] = useState(50); // 10 - 100

  const handleControllerChange = (angle: number, force: number) => {
    setAngle(angle);
    setForce(force);
  };
  const handleShoot = (angle: number, force: number) => {
    dispatch({ type: "shoot", angle, speed: (force / 5) ** 1.1 });
  };

  const konvaRef = useRef<Konva.Stage>(null);

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <div className="flex items-center gap-4">
        <Field stage={stage} ref={konvaRef}>
          <Layer>
            {fixedParts.map((part) => (
              <Ball
                key={part.id}
                position={{ x: part.x, y: part.y }}
                size={{ width: part.width, height: part.height }}
                image={part.image}
              />
            ))}
          </Layer>
          <Layer>
            {currentPart && phase === "shooting" && (
              <MovingBall
                key={currentPart.id}
                position={{
                  x: stage.width / 2 - currentPart.width / 2,
                  y: stage.height - currentPart.height,
                }}
                size={{ width: currentPart.width, height: currentPart.height }}
                fieldSize={{ width: stage.width, height: stage.height }}
                image={currentPart.image}
                friction={0.98}
                stopThreshold={0.4}
                velocity={verocity}
                onStop={(position) => {
                  dispatch({ type: "finishShooting", position });
                }}
              />
            )}
          </Layer>
          {phase === "aiming" && currentPart && (
            <Layer>
              <Ball
                position={{
                  x: stage.width / 2 - currentPart.width / 2,
                  y: stage.height - currentPart.height,
                }}
                size={{ width: currentPart.width, height: currentPart.height }}
                image={currentPart.image}
              />
              <Arrow
                x={stage.width / 2}
                y={stage.height - 10}
                angle={angle}
                ratio={force / 100}
              />
            </Layer>
          )}
        </Field>
      </div>
      {phase === "won" && <Dekiagari />}
      {phase === "won" && (
        <div className="flex flex-col items-center gap-2">
          <div className="text-2xl font-bold text-center">
            ともだちにみせてあげよう！
          </div>
          {konvaRef.current && (
            <div>
              <a
                href={konvaRef.current.toDataURL()}
                download="fukuwarai.png"
                className="btn btn-secondary"
              >
                絵を保存する
              </a>
            </div>
          )}
        </div>
      )}
      {(phase === "aiming" || phase === "shooting") && (
        <div className="w-64">
          <Controller
            angle={angle}
            force={force}
            onChange={handleControllerChange}
            onShoot={handleShoot}
            disabled={phase !== "aiming"}
          />
        </div>
      )}
      <Parts parts={restParts} />
      <div className="w-64 text-left">
        <a href="/" className="btn">
          &lt; 顔を選びなおす
        </a>
      </div>
    </div>
  );
}

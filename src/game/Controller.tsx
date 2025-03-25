import { CSSProperties, useState } from "react";

type Props = {
  /** 角度の初期値 */
  angle?: number;
  /** 力の初期値 */
  force?: number;
  onChange: (angle: number, force: number) => void;
  onShoot: (
    /** 0 - pi */
    angle: number,
    force: number
  ) => void;
};
export function Controller({
  angle: initialAngle = Math.PI / 4,
  force: initialForce = 5,
  onChange,
  onShoot,
}: Props) {
  const [degree, setDegree] = useState((180 * initialAngle) / Math.PI);
  const [force, setForce] = useState(initialForce);
  const angle = (degree * Math.PI) / 180 + Math.PI;
  const handleClick = () => {
    onShoot(angle, force);
  };
  // パワーに応じて色を変える
  const minForce = 1;
  const maxForce = 20;
  const ratio = (force - minForce) / (maxForce - minForce);
  const color = `hsl(${90 - ratio * 90}, 70%, 50%)`;
  return (
    <div className="flex flex-col gap-4">
      <label>
        角度
        <input
          type="range"
          min={0}
          max={180}
          className="range range-primary [--range-fill:0]"
          onChange={(e) => {
            setDegree(e.currentTarget.valueAsNumber);
            onChange(angle, force);
          }}
        />
      </label>
      <label>
        パワー
        <input
          type="range"
          min={1}
          max={20}
          step={0.5}
          style={
            {
              "--range-progress": color,
            } as CSSProperties
          }
          onChange={(e) => {
            setForce(e.currentTarget.valueAsNumber);
            onChange(angle, force);
          }}
          className="range range-primary"
        />
      </label>
      <button onClick={handleClick} className="btn btn-primary">
        発射
      </button>
    </div>
  );
}

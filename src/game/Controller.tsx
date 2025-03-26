import { type ChangeEvent, type CSSProperties, useState } from "react";

type Props = {
  /** 角度の初期値 */
  angle?: number;
  /** 力の初期値 */
  force?: number;
  disabled?: boolean;
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
  disabled = false,
  onChange,
  onShoot,
}: Props) {
  const [degree, setDegree] = useState(
    (180 * (initialAngle - Math.PI)) / Math.PI
  );
  const [force, setForce] = useState(initialForce);

  const handleChangeAngle = (e: ChangeEvent<HTMLInputElement>) => {
    const d = e.currentTarget.valueAsNumber;
    setDegree(d);
    onChange(toAngle(d), force);
  };
  const minForce = 10;
  const maxForce = 100;
  const handleChangeForce = (e: ChangeEvent<HTMLInputElement>) => {
    const f = Math.max(e.currentTarget.valueAsNumber, minForce);
    setForce(f);
    onChange(toAngle(degree), f);
  };
  const handleClick = () => {
    onShoot(toAngle(degree), force);
  };

  // パワーに応じて色を変える
  const ratio = force / maxForce;
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
          onChange={handleChangeAngle}
          disabled={disabled}
        />
      </label>
      <label>
        パワー
        <input
          type="range"
          min={0}
          max={maxForce}
          step={1}
          value={force}
          style={
            {
              "--range-progress": color,
            } as CSSProperties
          }
          onChange={handleChangeForce}
          className="range range-primary"
          disabled={disabled}
        />
      </label>
      <button
        onClick={handleClick}
        className="btn btn-primary"
        disabled={disabled}
      >
        発射
      </button>
    </div>
  );
}

const toAngle = (degree: number) => (degree * Math.PI) / 180 + Math.PI;

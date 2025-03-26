import { useEffect, useState } from "react";

export function Dekiagari() {
  const [visible, setVisible] = useState(true);
  const opacity = visible ? 1 : 0;
  const handlePointerDown = () => setVisible(false);
  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      onPointerDown={handlePointerDown}
      className="fixed inset-0 flex items-center justify-center transition-opacity transform duration-1000"
      style={{
        pointerEvents: visible ? "auto" : "none",
        opacity,
        background: [
          `radial-gradient(circle, white 0%, white 20%, transparent 50%, transparent)`,
          `
            repeating-conic-gradient(
              from 3deg at 50% 50%,
              transparent 0deg 10deg,
              rgba(255,192,203,0.5) 10deg 12deg,
              transparent 12deg
            )
          `,
          `
            repeating-conic-gradient(
              from 9deg at 50% 50%,
              transparent 0deg 13deg,
              rgba(255,192,203,0.5) 13deg 17deg,
              transparent 17deg
            )
          `,
        ].join(","),
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center text-9xl font-bold">
        できあがり！
      </div>
    </div>
  );
}

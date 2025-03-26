import title from "./assets/title.png";
import { stage1 } from "./game/data";
import { GamePlay } from "./game/GamePlay";

export function App() {
  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <h1 className="text-2xl font-bold">
        <img src={title} alt="福笑い" height={69} />
      </h1>
      <GamePlay stage={stage1} />
    </div>
  );
}

import { useParams } from "wouter";
import { findStageById } from "../game/data";
import { GamePlay } from "../game/GamePlay";

export default function StageRoute() {
  const { id } = useParams();
  if (!id) return <NotFound />;
  const stage = findStageById(id);
  if (!stage) return <NotFound />;
  return <GamePlay stage={stage} />;
}

const NotFound = () => {
  return (
    <div className="flex flex-col items-center gap-4 py-4">
      <h1 className="text-2xl font-bold">ないです</h1>
      <a href="/" className="text-blue-500">
        もどる
      </a>
    </div>
  );
};

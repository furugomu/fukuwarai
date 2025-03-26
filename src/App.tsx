import title from "./assets/title.png";
import { Routing } from "./Routing";

export function App() {
  return (
    <div className="flex flex-col items-center gap-4 py-4">
      <h1 className="text-2xl font-bold flex justify-center">
        <img src={title} alt="福笑い" height={69} />
      </h1>
      <Routing />
    </div>
  );
}

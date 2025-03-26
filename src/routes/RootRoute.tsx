import { stages } from "../game/data";

export function RootRoute() {
  return (
    <div className="flex flex-col w-80 items-center gap-4 py-4">
      <div className="text-2xl">遊びたい顔を選んでね</div>
      <ul>
        {stages.map((stage) => (
          <li key={stage.id}>
            <a href={`/stages/${stage.id}`}>
              <div className="card w-60 bg-white shadow-sm">
                <figure>
                  <img
                    src={stage.cover}
                    alt=""
                    className="h-32 object-contain"
                  />
                </figure>

                <div className="card-body items-center">
                  <h2 className="card-title">{stage.name}</h2>
                </div>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

import { BuildingCard } from "../components/building/BuildingCard";
import { useGameState } from "../state/GameState";

export default function BuildingPage() {
  const buildings = useGameState((s) => s.buildings.state);

  return (
    <div className="h-full overflow-y-auto p-1">
      <div className="columns-2 md:columns-4 gap-x-1 md:gap-x-2">
        {buildings.map((building) => (
          <BuildingCard key={building.key} building={building} />
        ))}
      </div>
    </div>
  );
}

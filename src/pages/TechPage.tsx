import { TechCard } from "../components/tech/TechCard";
import { useGameState } from "../state/GameState";
import type { Tech } from "../state/tech/Tech";

export default function TechPage() {
  const techState = useGameState((s) => s.tech.state);

  const techColumns = techState.reduce<Record<number, Tech[]>>(
    (acc, tech) => ({
      ...acc,
      [tech.position]: [...(acc[tech.position] || []), tech],
    }),
    []
  );

  return (
    <div className="overflow-x-auto whitespace-nowrap">
      <div className="flex flex-row gap-8">
        {Object.entries(techColumns).map(([col, techs]) => (
          <div key={col} className="flex flex-col justify-center">
            {techs.map((tech) => (
              <div key={tech.key} className="mb-4">
                <TechCard tech={tech} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

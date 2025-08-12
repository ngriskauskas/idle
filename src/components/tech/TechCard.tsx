import { useGameState } from "../../state/GameState";
import type { Tech } from "../../state/tech/Tech";
import { PurchaseButton } from "../PurchaseButton";
import { ResourceCostDisplay } from "../resource/ResourceCostDisplay";

export const TechCard = ({ tech }: { tech: Tech }) => {
  const purchase = useGameState((s) => s.tech.purchase);
  return (
    <div className="bg-gray-700 rounded-xl p-2 md:p-3 w-64 md:w-72 shadow-lg flex flex-col justify-between">
      <div>
        <h3 className="md:text-xl font-bold text-gray-100 md:mb-1">
          {tech.key}
        </h3>
        <p className="text-sm text-gray-300 md:mb-2 text-wrap">
          {tech.description}
        </p>

        <div className="flex text-sm text-gray-300 bg-slate-600 rounded mt-1 max-w-fit mb-2">
          <div className="flex flex-col gap-1">
            {tech.costs.map((cost) => (
              <ResourceCostDisplay key={cost.resource} cost={cost} />
            ))}
          </div>
        </div>

        {tech.requires && tech.requires.length > 0 && (
          <div className="flex flex-row mb-2">
            <span className="block text-sm font-semibold text-gray-400 mb-1 mr-2">
              Requires:
            </span>
            <div className="flex flex-wrap gap-1">
              {tech.requires.map((req) => (
                <span
                  key={req}
                  className="bg-gray-600 text-gray-200 px-2 py-1 rounded-full text-xs font-medium"
                >
                  {req}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <PurchaseButton
        onClick={() => purchase(tech)}
        canAfford={tech.canAfford}
        canBuy={tech.max === undefined || tech.owned! < tech.max}
      />
    </div>
  );
};

import type { Building } from "../../state/buildings/Buildings";
import { useGameState } from "../../state/GameState";
import { PurchaseButton } from "../PurchaseButton";
import { ResourceCostDisplay } from "../resource/ResourceCostDisplay";

export const BuildingCard = ({ building }: { building: Building }) => {
  const purchase = useGameState((s) => s.buildings.purchase);
  return (
    <div className="bg-gray-600 break-inside-avoid w-full p-1 md:p-6 rounded-xl space-y-1 md:space-y-4 md:mb-2 mb-1">
      <div className="font-semibold text-lg text-gray-100 capitalize">
        {building.key}
      </div>
      <div className="flex text-sm text-gray-300 bg-slate-700 rounded mt-2 max-w-fit">
        <div className="flex flex-col gap-1">
          {building.costs.map((cost) => (
            <ResourceCostDisplay key={cost.resource} cost={cost} />
          ))}
        </div>
      </div>
      <PurchaseButton
        onClick={() => purchase(building)}
        canAfford={building.canAfford}
      />
    </div>
  );
};

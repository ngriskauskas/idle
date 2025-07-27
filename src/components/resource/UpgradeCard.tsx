import { useGameState } from "../../state/GameState";
import type { Upgrade } from "../../state/upgrades/Upgrades";
import { EffectDisplay } from "../EffectDisplay";
import { PurchaseButton } from "../PurchaseButton";
import { ResourceCostDisplay } from "./ResourceCostDisplay";

export function UpgradeCard({ upgrade }: { upgrade: Upgrade }) {
  const { name, costs, maxBuyable, numberBought, canAfford, effects } = upgrade;
  const purchase = useGameState((s) => s.upgrades.purchase);

  return (
    <div className="bg-gray-700 p-4 rounded-lg shadow-inner space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-white font-semibold">{name}</span>
        <span className="text-sm font-normal text-gray-300">
          {numberBought} {maxBuyable ? `/ ${maxBuyable}` : ""}
        </span>
      </div>
      <div className="text-sm text-white my-3">
        <ul className="flex gap-4 flex-wrap capitalize">
          {costs.map((cost) => (
            <div className="bg-gray-800 rounded">
              <ResourceCostDisplay key={cost.resource} cost={cost} />
            </div>
          ))}
        </ul>
      </div>
      <div className="text-white capitalize bg-slate-800 p-2 px-3 my-3 rounded space-y-1 w-fit">
        {effects.map((effect, i) => (
          <EffectDisplay key={i} effect={effect} />
        ))}
      </div>
      <PurchaseButton
        onClick={() => purchase(upgrade)}
        canAfford={canAfford}
        canBuy={maxBuyable === undefined || numberBought < maxBuyable}
      />
    </div>
  );
}

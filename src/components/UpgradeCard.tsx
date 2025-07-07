import { TickRate } from "../state/GameLoop";
import { ResourceIcons } from "../state/Resources";
import { useGameState } from "../state/StateProvider";
import type { Upgrade, UpgradeEffect } from "../state/Upgrades";

export function UpgradeCard({ upgrade }: { upgrade: Upgrade }) {
  const { name, costs, maxBuyable, numberBought, canAfford, effects } = upgrade;
  const { purchaseUpgrade } = useGameState();

  const generateEffectDescription = (effect: UpgradeEffect) => {
    switch (effect.type) {
      case "addRate":
        return `+${(effect.value / TickRate) * 1000}  ${
          ResourceIcons[effect.resource]
        } ${effect.resource} / sec`;
      case "increaseMax":
        return `+${effect.value} ${ResourceIcons[effect.resource]} ${
          effect.resource
        } max`;
    }
  };

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
          {costs.map(({ resource, amount }) => (
            <li
              key={resource}
              className="flex items-center space-x-2 bg-gray-800 rounded px-2 py-1"
            >
              <span className="text-xl">{ResourceIcons[resource]}</span>
              <span className="">{resource}</span>
              <span className="ml-1 bg-yellow-400 text-black rounded px-2 py-0.5 font-semibold">
                {amount}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="text-white capitalize bg-slate-800 p-2 px-3 my-3 rounded-md space-y-1 w-fit">
        {effects.map((effect, i) => (
          <div key={i} className="text-sm text-slate-200">
            {effect.description ?? generateEffectDescription(effect)}{" "}
          </div>
        ))}
      </div>
      <button
        onClick={() => purchaseUpgrade(upgrade)}
        className={`px-3 py-2 rounded transition font-medium
    ${
      maxBuyable !== undefined && numberBought >= maxBuyable
        ? "bg-yellow-400 hover:bg-yellow-500"
        : !canAfford
        ? "bg-gray-400"
        : "bg-blue-300 hover:bg-blue-400"
    }`}
        disabled={
          !canAfford || (maxBuyable !== undefined && numberBought >= maxBuyable)
        }
      >
        {maxBuyable !== undefined && numberBought >= maxBuyable
          ? "Maxed"
          : !canAfford
          ? "Can't Afford"
          : "Purchase"}
      </button>
    </div>
  );
}

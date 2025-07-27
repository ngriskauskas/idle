import { TickRate } from "../state/GameLoop";
import { ResourceIcons } from "../state/resources/Resources";
import type { UpgradeEffect } from "../state/upgrades/Upgrades";

export const EffectDisplay = ({ effect }: { effect: UpgradeEffect }) => {
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
    <div className="text-sm text-slate-200">
      {effect.description ?? generateEffectDescription(effect)}
    </div>
  );
};

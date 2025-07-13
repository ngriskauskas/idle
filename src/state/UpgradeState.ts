import { useState } from "react";
import { InitialUpgrades, type Upgrade, type UpgradeEffect } from "./Upgrades";
import type { ResourceState } from "./ResourceState";
import type { ResourceCost } from "./Resources";
import { canAfford } from "../utils/helpers";

export type UpgradeState = {
  available: Upgrade[];
};

export const useUpgradeState = (
  getResources: () => ResourceState,
  spendResources: (costs: ResourceCost[]) => boolean,
  setResources: React.Dispatch<React.SetStateAction<ResourceState>>
) => {
  const [upgrades, setUpgrades] = useState<UpgradeState>({
    available: InitialUpgrades,
  });

  const calcUpgradeAfford = () => {
    const currentResources = getResources();
    setUpgrades((prev) => ({
      ...prev,
      available: prev.available.map((x) => ({
        ...x,
        canAfford: canAfford(currentResources, x.costs),
      })),
    }));
  };

  const updateUpgrades = (upgradeName: string) => {
    setUpgrades((prev) => ({
      ...prev,
      available: prev.available.map((x) => {
        if (x.name !== upgradeName) return x;
        const max = x.maxBuyable ?? Infinity;
        if (x.numberBought >= max) return x;
        return {
          ...x,
          numberBought: x.numberBought + 1,
        };
      }),
    }));
  };

  const applyEffects = (effects: UpgradeEffect[]) => {
    effects.forEach((effect) => {
      switch (effect.type) {
        case "addRate":
          setResources((prev) => ({
            ...prev,
            [effect.resource]: {
              ...prev[effect.resource],
              rate: prev[effect.resource]!.rate + effect.value,
            },
          }));
          break;
        case "increaseMax":
          setResources((prev) => ({
            ...prev,
            [effect.resource]: {
              ...prev[effect.resource],
              max: prev[effect.resource]!.max + effect.value,
            },
          }));
      }
    });
  };

  const purchaseUpgrade = (upgrade: Upgrade) => {
    if (!spendResources(upgrade.costs)) return false;
    updateUpgrades(upgrade.name);
    applyEffects(upgrade.effects);
    return true;
  };

  return { upgrades, calcUpgradeAfford, purchaseUpgrade };
};

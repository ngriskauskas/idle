import { useState } from "react";
import type { ResourceState } from "./Resources";
import {
  InitialUpgrades,
  type Upgrade,
  type UpgradeCost,
  type UpgradeEffect,
  type UpgradeState,
} from "./Upgrades";

export const useUpgradeState = (
  getResources: () => ResourceState,
  spendResources: (costs: UpgradeCost[]) => boolean,
  setResources: React.Dispatch<React.SetStateAction<ResourceState>>
) => {
  const [upgrades, setUpgrades] = useState<UpgradeState>(InitialUpgrades);

  const recalculateAffordability = () => {
    const currentResources = getResources();
    setUpgrades((prev) => ({
      ...prev,
      available: prev.available.map((x) => ({
        ...x,
        canAfford: x.costs.every(
          ({ resource, amount }) => currentResources[resource].amount >= amount
        ),
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
              rate: prev[effect.resource].rate + effect.value,
            },
          }));
          break;
        case "increaseMax":
          setResources((prev) => ({
            ...prev,
            [effect.resource]: {
              ...prev[effect.resource],
              max: prev[effect.resource].max + effect.value,
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

  return { upgrades, recalculateAffordability, purchaseUpgrade };
};

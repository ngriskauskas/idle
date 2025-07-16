import { useState } from "react";
import { InitialUpgrades, type Upgrade, type UpgradeEffect } from "./Upgrades";
import { canAfford } from "../../utils/helpers";
import type { ResourceContext } from "../resources/ResourceState";

export type UpgradeState = Upgrade[];

export interface UpgradeContext {
  state: UpgradeState;
  purchase: (upgrade: Upgrade) => boolean;
  calcAfford: () => void;
}

export const useUpgradeState = (
  resourceContext: ResourceContext
): UpgradeContext => {
  const [upgrades, setUpgrades] = useState<UpgradeState>(InitialUpgrades);

  const calcUpgradeAfford = () => {
    const currentResources = resourceContext.get();
    setUpgrades((prev) =>
      prev.map((x) => ({
        ...x,
        canAfford: canAfford(currentResources, x.costs),
      }))
    );
  };

  const updateUpgrades = (upgradeName: string) => {
    setUpgrades((prev) =>
      prev.map((x) => {
        if (x.name !== upgradeName) return x;
        const max = x.maxBuyable ?? Infinity;
        if (x.numberBought >= max) return x;
        return {
          ...x,
          numberBought: x.numberBought + 1,
        };
      })
    );
  };

  const applyEffects = (effects: UpgradeEffect[]) => {
    effects.forEach((effect) => {
      switch (effect.type) {
        case "addRate":
          resourceContext.set((prev) => ({
            ...prev,
            [effect.resource]: {
              ...prev[effect.resource],
              rate: prev[effect.resource]!.rate + effect.value,
            },
          }));
          break;
        case "increaseMax":
          resourceContext.set((prev) => ({
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
    if (!resourceContext.spend(upgrade.costs)) return false;
    updateUpgrades(upgrade.name);
    applyEffects(upgrade.effects);
    return true;
  };

  return {
    state: upgrades,
    calcAfford: calcUpgradeAfford,
    purchase: purchaseUpgrade,
  };
};

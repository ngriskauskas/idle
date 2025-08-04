import type { StateCreator } from "zustand";
import type { GameState } from "../GameState";
import { InitialUpgrades, type Upgrade, type UpgradeEffect } from "./Upgrades";
import type { Resources } from "../resources/ResourceState";
import { buyPurchasable, calcAffordPurchasable } from "../Purchasable";

export type UpgradeState = {
  upgrades: {
    state: Upgrade[];
    purchase: (upgrade: Upgrade) => void;
    calcAfford: () => void;
  };
};

const applyEffects = (
  resourceState: Resources,
  effects: UpgradeEffect[]
): Resources => {
  const updated = { ...resourceState };
  for (const effect of effects) {
    const res = resourceState[effect.resource];
    if (!res) continue;
    updated[effect.resource] = {
      ...res,
      rate: effect.type === "addRate" ? res.rate + effect.value : res.rate,
      max: effect.type === "increaseMax" ? res.max + effect.value : res.max,
    };
  }
  return updated;
};

export const createUpgradeState: StateCreator<
  GameState,
  [],
  [],
  UpgradeState
> = (set, get) => ({
  upgrades: {
    state: InitialUpgrades,
    purchase: (upgrade) => {
      buyPurchasable("upgrades", upgrade, get, set);
      set((s) => ({
        resources: {
          ...s.resources,
          state: applyEffects(s.resources.state, upgrade.effects),
        },
      }));
    },
    calcAfford: () => calcAffordPurchasable("upgrades", get, set),
  },
});

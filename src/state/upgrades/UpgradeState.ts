import type { StateCreator } from "zustand";
import type { GameState } from "../GameState";
import { InitialUpgrades, type Upgrade } from "./Upgrades";
import { buyPurchasable, calcAffordPurchasable } from "../Purchasable";

export type UpgradeState = {
  upgrades: {
    state: Upgrade[];
    purchase: (upgrade: Upgrade) => void;
    calcAfford: () => void;
  };
};

export const createUpgradeState: StateCreator<
  GameState,
  [["zustand/immer", never]],
  [],
  UpgradeState
> = (set, get) => ({
  upgrades: {
    state: InitialUpgrades,
    purchase: (upgrade) => {
      buyPurchasable("upgrades", upgrade, get, set);
      set((state) => {
        const resources = state.resources.state;
        for (const effect of upgrade.effects) {
          const res = resources[effect.resource];
          if (!res) continue;

          if (effect.type === "addRate") {
            res.baseRate += effect.value;
          } else if (effect.type === "increaseMax") {
            res.max += effect.value;
          }
        }
      });
    },
    calcAfford: () => calcAffordPurchasable("upgrades", get, set),
  },
});

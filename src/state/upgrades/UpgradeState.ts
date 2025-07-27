import type { StateCreator } from "zustand";
import { canAfford } from "../../utils/helpers";
import type { GameState } from "../GameState";
import type { Resources } from "../resource/ResourceState";
import { InitialUpgrades, type Upgrade, type UpgradeEffect } from "./Upgrades";

export type UpgradeState = {
  upgrades: {
    state: Upgrade[];
    purchase: (upgrade: Upgrade) => void;
    calcAfford: () => void;
  };
};

const updateUpgrades = (
  upgrades: Upgrade[],
  upgradeName: string
): Upgrade[] => {
  return upgrades.map((x) => {
    if (x.name !== upgradeName) return x;
    const max = x.maxBuyable ?? Infinity;
    if (x.numberBought >= max) return x;
    return {
      ...x,
      numberBought: x.numberBought + 1,
    };
  });
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
> = (set) => ({
  upgrades: {
    state: InitialUpgrades,
    purchase: (upgrade) => {
      set((s) => {
        s.resources.spend(upgrade.costs);
        return {
          upgrades: {
            ...s.upgrades,
            state: updateUpgrades(s.upgrades.state, upgrade.name),
          },
          resources: {
            ...s.resources,
            state: applyEffects(s.resources.state, upgrade.effects),
          },
        };
      });
    },
    calcAfford: () => {
      set((s) => ({
        upgrades: {
          ...s.upgrades,
          state: s.upgrades.state.map((upgrade) => ({
            ...upgrade,
            canAfford: canAfford(s.resources.state, upgrade.costs),
          })),
        },
      }));
    },
  },
});

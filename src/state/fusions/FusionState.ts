import type { StateCreator } from "zustand";
import { InitialFusionRecipes, type Fusion } from "../../state/fusions/Fusions";
import type { GameState } from "../../state/GameState";
import { buyPurchasable, calcAffordPurchasable } from "../Purchasable";

export type FusionState = {
  fusions: {
    state: Fusion[];
    purchase: (fusion: Fusion) => void;
    calcAfford: () => void;
  };
};

export const createFusionState: StateCreator<
  GameState,
  [["zustand/immer", never]],
  [],
  FusionState
> = (set, get) => ({
  fusions: {
    state: InitialFusionRecipes,
    purchase: (fusion) => {
      buyPurchasable("fusions", fusion, get, set);
      get().resources.add(fusion.output);
    },
    calcAfford: () => calcAffordPurchasable("fusions", get, set),
  },
});

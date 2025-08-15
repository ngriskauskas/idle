import type { StateCreator } from "zustand";
import { InitialTechs, type Tech } from "./Tech";
import type { GameState } from "../GameState";
import { buyPurchasable, calcAffordPurchasable } from "../Purchasable";

export type TechState = {
  tech: {
    state: Tech[];
    purchase: (tech: Tech) => void;
    calcAfford: () => void;
  };
};

export const createTechState: StateCreator<
  GameState,
  [["zustand/immer", never]],
  [],
  TechState
> = (set, get) => ({
  tech: {
    state: InitialTechs,
    calcAfford: () => calcAffordPurchasable("tech", get, set),
    purchase: (tech) => buyPurchasable("tech", tech, get, set),
  },
});

import type { StateCreator } from "zustand";
import type { GameState } from "../GameState";
import { InitialBuildings, type Building } from "./Buildings";
import { buyPurchasable, calcAffordPurchasable } from "../Purchasable";

export type BuildingState = {
  buildings: {
    state: Building[];
    purchase: (building: Building) => void;
    calcAfford: () => void;
  };
};

export const createBuildingState: StateCreator<
  GameState,
  [["zustand/immer", never]],
  [],
  BuildingState
> = (set, get) => ({
  buildings: {
    state: InitialBuildings,
    purchase: (building) => buyPurchasable("buildings", building, get, set),
    calcAfford: () => calcAffordPurchasable("buildings", get, set),
  },
});

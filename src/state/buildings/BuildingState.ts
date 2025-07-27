import type { StateCreator } from "zustand";
import { canAfford } from "../../utils/helpers";
import type { GameState } from "../GameState";
import { InitialBuildings, type Building } from "./Buildings";

export type BuildingState = {
  buildings: {
    state: Building[];
    purchase: (building: Building) => void;
    calcAfford: () => void;
  };
};

export const createBuildingState: StateCreator<
  GameState,
  [],
  [],
  BuildingState
> = (set) => ({
  buildings: {
    state: InitialBuildings,
    purchase: (building) => {
      set((s) => {
        s.resources.spend(building.costs);
        return {
          buildings: {
            ...s.buildings,
            state: s.buildings.state.map((b) =>
              b.key === building.key ? { ...b, built: true } : b
            ),
          },
        };
      });
    },
    calcAfford: () => {
      set((s) => ({
        buildings: {
          ...s.buildings,
          state: s.buildings.state.map((b) => ({
            ...b,
            canAfford: canAfford(s.resources.state, b.costs),
          })),
        },
      }));
    },
  },
});

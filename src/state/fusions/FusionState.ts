import type { StateCreator } from "zustand";
import { InitialFusionRecipes, type Fusion } from "../../state/fusions/Fusions";
import type { GameState } from "../../state/GameState";
import { canAfford } from "../../utils/helpers";

export type FusionState = {
  fusions: {
    state: Fusion[];
    do: (fusion: Fusion) => void;
    calcAfford: () => void;
  };
};

export const createFusionState: StateCreator<GameState, [], [], FusionState> = (
  set
) => ({
  fusions: {
    state: InitialFusionRecipes,
    do: (fusion) =>
      set((s) => {
        s.resources.spend(fusion.recipe.costs);
        return {
          fusions: {
            ...s.fusions,
            state: s.fusions.state.map((f) =>
              f.key === fusion.key ? { ...f, discovered: true } : f
            ),
          },
          resources: {
            ...s.resources,
            state: {
              ...s.resources.state,
              [fusion.recipe.output.key]: fusion.recipe.output,
            },
          },
        };
      }),
    calcAfford: () => {
      set((s) => ({
        fusions: {
          ...s.fusions,
          state: s.fusions.state.map((fusion) => ({
            ...fusion,
            canAfford: canAfford(s.resources.state, fusion.recipe.costs),
          })),
        },
      }));
    },
  },
});

import type { StateCreator } from "zustand";
import type { GameState } from "../../state/GameState";
import {
  InitialResources,
  type Resource,
  type ResourceCost,
  type ResourceKey,
} from "../../state/resources/Resources";
import { canAfford } from "../../utils/helpers";

export type Resources = Partial<Record<ResourceKey, Resource>>;

export type ResourceState = {
  resources: {
    state: Resources;
    update: () => void;
    spend: (costs: ResourceCost[]) => void;
  };
};

export const createResourceState: StateCreator<
  GameState,
  [],
  [],
  ResourceState
> = (set) => ({
  resources: {
    state: InitialResources,
    update: () =>
      set((state) => ({
        resources: {
          ...state.resources,
          state: Object.fromEntries(
            Object.entries(state.resources.state).map(([key, resc]) => [
              key,
              {
                ...resc,
                amount: Math.min(resc.amount + resc.rate, resc.max),
              },
            ])
          ) as Resources,
        },
      })),
    spend: (costs) =>
      set((s) => {
        if (!canAfford(s.resources.state, costs)) return s;

        const updatedResources = { ...s.resources.state };
        costs.forEach(({ resource, amount }) => {
          updatedResources[resource]!.amount -= amount;
        });

        return {
          resources: {
            ...s.resources,
            state: updatedResources,
          },
        };
      }),
  },
});

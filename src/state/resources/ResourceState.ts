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
    add: (resource: Resource) => void;
  };
};

export const createResourceState: StateCreator<
  GameState,
  [["zustand/immer", never]],
  [],
  ResourceState
> = (set, get) => ({
  resources: {
    state: InitialResources,
    update: () => {
      for (const [_, resc] of Object.entries(get().resources.state)) {
        const updater = resc.update;
        if (updater) updater(get, set);
      }

      set((state) => {
        for (const [_, resc] of Object.entries(state.resources.state))
          resc.amount = Math.min(resc.amount + resc.rate, resc.max);
      });
    },
    spend: (costs) =>
      set((state) => {
        if (!canAfford(state.resources.state, costs)) return;
        for (const { resource, amount } of costs) {
          state.resources.state[resource]!.amount -= amount;
        }
      }),
    add: (resource) =>
      set((state) => {
        state.resources.state[resource.key] = resource;
      }),
  },
});

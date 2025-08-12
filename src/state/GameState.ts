import { create, type StateCreator } from "zustand";
import {
  createBuildingState,
  type BuildingState,
} from "./buildings/BuildingState";
import { createFusionState, type FusionState } from "./fusions/FusionState";
import {
  createResourceState,
  type ResourceState,
} from "./resources/ResourceState";
import { createUpgradeState, type UpgradeState } from "./upgrades/UpgradeState";
import { createTechState, type TechState } from "./tech/TechState";

export type GameStateSet = {
  (
    partial:
      | GameState
      | Partial<GameState>
      | ((state: GameState) => GameState | Partial<GameState>),
    replace?: false
  ): void;
  (partial: GameState | ((state: GameState) => GameState), replace: true): void;
};

export type GameState = ResourceState &
  UpgradeState &
  FusionState &
  BuildingState &
  TechState &
  TabState;

interface TabState {
  tabs: {
    state: {
      resources: boolean;
      fusions: boolean;
      buildings: boolean;
      tech: boolean;
      prestige: boolean;
    };
    unlock: (tab: string) => void;
    reset: () => void;
  };
}

const createTabState: StateCreator<GameState, [], [], TabState> = (
  set,
  get
) => ({
  tabs: {
    state: {
      resources: true,
      buildings: false,
      fusions: false,
      tech: false,
      prestige: false,
    },
    unlock: (tab) =>
      set((s) => ({
        ...s,
        state: {
          ...s.tabs.state,
          [tab]: true,
        },
      })),
    reset: () =>
      set((s) => ({
        ...s,
        state: {
          resources: true,
          buildings: false,
          fusions: false,
          tech: false,
          prestige: false,
        },
      })),
  },
});

export const useGameState = create<GameState>()((...args) => ({
  ...createResourceState(...args),
  ...createUpgradeState(...args),
  ...createFusionState(...args),
  ...createBuildingState(...args),
  ...createTechState(...args),
  ...createTabState(...args),
}));

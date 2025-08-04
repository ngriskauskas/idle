import { create } from "zustand";
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
  TechState;

export const useGameState = create<GameState>()((...args) => ({
  ...createResourceState(...args),
  ...createUpgradeState(...args),
  ...createFusionState(...args),
  ...createBuildingState(...args),
  ...createTechState(...args),
}));

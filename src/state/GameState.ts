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

export type GameState = ResourceState &
  UpgradeState &
  FusionState &
  BuildingState;

export const useGameState = create<GameState>()((...args) => ({
  ...createResourceState(...args),
  ...createUpgradeState(...args),
  ...createFusionState(...args),
  ...createBuildingState(...args),
}));

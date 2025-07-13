import { useState } from "react";
import { InitialFusionRecipes, type Fusion } from "./Fusions";
import type { ResourceState } from "./ResourceState";
import { canAfford } from "../utils/helpers";
import type { ResourceCost, ResourceKey } from "./Resources";

export type FusionState = Fusion[];
export const useFusionState = (
  getResources: () => ResourceState,
  spendResources: (costs: ResourceCost[]) => boolean,
  setResources: React.Dispatch<React.SetStateAction<ResourceState>>
) => {
  const [fusions, setFusions] = useState<FusionState>(InitialFusionRecipes);

  const calcFusionAfford = () => {
    const currentResources = getResources();
    setFusions((prev) =>
      prev.map((fusion) => ({
        ...fusion,
        canAfford: canAfford(currentResources, fusion.recipe.costs),
      }))
    );
  };

  const doFusion = (fusion: Fusion) => {
    const currentResources = getResources();
    if (!canAfford(currentResources, fusion.recipe.costs)) return;
    spendResources(fusion.recipe.costs);
    setFusions((prev) =>
      prev.map((f) => (f.key === fusion.key ? { ...f, discovered: true } : f))
    );
    setResources((prev) => ({
      ...prev,
      [fusion.recipe.output.key]: fusion.recipe.output,
    }));
  };

  return { fusions, calcFusionAfford, doFusion };
};

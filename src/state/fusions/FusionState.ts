import { useState } from "react";
import { InitialFusionRecipes, type Fusion } from "./Fusions";
import { canAfford } from "../../utils/helpers";
import type { ResourceContext } from "../resources/ResourceState";

export type FusionState = Fusion[];

export interface FusionContext {
  state: FusionState;
  calcAfford: () => void;
  do: (fusion: Fusion) => void;
}

export const useFusionState = (
  resourceContext: ResourceContext
): FusionContext => {
  const [fusions, setFusions] = useState<FusionState>(InitialFusionRecipes);

  const calcFusionAfford = () => {
    const currentResources = resourceContext.get();
    setFusions((prev) =>
      prev.map((fusion) => ({
        ...fusion,
        canAfford: canAfford(currentResources, fusion.recipe.costs),
      }))
    );
  };

  const doFusion = (fusion: Fusion) => {
    const currentResources = resourceContext.get();
    if (!canAfford(currentResources, fusion.recipe.costs)) return;
    resourceContext.spend(fusion.recipe.costs);
    setFusions((prev) =>
      prev.map((f) => (f.key === fusion.key ? { ...f, discovered: true } : f))
    );
    resourceContext.set((prev) => ({
      ...prev,
      [fusion.recipe.output.key]: fusion.recipe.output,
    }));
  };

  return { state: fusions, calcAfford: calcFusionAfford, do: doFusion };
};

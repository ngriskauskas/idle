import { useEffect, useRef, useState } from "react";
import {
  InitialResources,
  type Resource,
  type ResourceCost,
  type ResourceKey,
} from "./Resources";
import { canAfford } from "../../utils/helpers";

export type ResourceState = Partial<Record<ResourceKey, Resource>>;
export interface ResourceContext {
  state: ResourceState;
  update: () => void;
  spend: (costs: ResourceCost[]) => boolean;
  set: React.Dispatch<React.SetStateAction<ResourceState>>;
  get: () => ResourceState;
}

export const useResourceState = (): ResourceContext => {
  const [resources, setResources] = useState<ResourceState>(InitialResources);
  const resourcesRef = useRef(resources);

  useEffect(() => {
    resourcesRef.current = resources;
  }, [resources]);

  const updateResources = () => {
    setResources(
      (prev) =>
        Object.fromEntries(
          Object.entries(prev).map(([key, resc]) => [
            key,
            {
              ...resc,
              amount: Math.min(resc.amount + resc.rate, resc.max),
            },
          ])
        ) as ResourceState
    );
  };

  const spendResources = (costs: ResourceCost[]) => {
    if (!canAfford(resources, costs)) return false;

    setResources((prev) => {
      const updated = { ...prev };
      costs.forEach(({ resource, amount }) => {
        updated[resource] = {
          ...updated[resource],
          amount: updated[resource]!.amount - amount,
        } as Resource;
      });
      return updated;
    });
    return true;
  };

  const getResources = () => resourcesRef.current;

  return {
    state: resources,
    update: updateResources,
    get: getResources,
    spend: spendResources,
    set: setResources,
  };
};

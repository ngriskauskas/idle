import { useEffect, useRef, useState } from "react";
import { InitialResources, type ResourceState } from "./Resources";
import type { UpgradeCost } from "./Upgrades";

export const useResourceState = () => {
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

  const spendResources = (costs: UpgradeCost[]) => {
    const canAfford = costs.every(
      ({ resource, amount }) => resources[resource].amount >= amount
    );
    if (!canAfford) return false;

    setResources((prev) => {
      const updated = { ...prev };
      costs.forEach(({ resource, amount }) => {
        updated[resource] = {
          ...updated[resource],
          amount: updated[resource].amount - amount,
        };
      });
      return updated;
    });
    return true;
  };

  const getResources = () => resourcesRef.current;

  return {
    resources,
    updateResources,
    getResources,
    spendResources,
    setResources,
  };
};

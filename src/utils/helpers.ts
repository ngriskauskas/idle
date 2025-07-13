import type { ResourceCost, ResourceKey } from "../state/Resources";
import type { ResourceState } from "../state/ResourceState";

export const canAfford = (
  resources: ResourceState,
  costs: ResourceCost[]
): boolean =>
  costs.every(({ resource, amount }) => {
    const resc = resources[resource as ResourceKey];
    if (!resc) return false;
    return resc.amount >= amount;
  });

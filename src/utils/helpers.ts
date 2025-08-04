import type { ResourceCost, ResourceKey } from "../state/resources/Resources";
import type { Resources } from "../state/resources/ResourceState";

export const canAfford = (
  resources: Resources,
  costs: ResourceCost[]
): boolean =>
  costs.every(({ resource, amount }) => {
    const resc = resources[resource as ResourceKey];
    if (!resc) return false;
    return resc.amount >= amount;
  });

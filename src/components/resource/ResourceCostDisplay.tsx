import {
  ResourceIcons,
  type ResourceCost,
  type ResourceKey,
} from "../../state/resources/Resources";

export const ResourceCostDisplay = ({ cost }: { cost: ResourceCost }) => {
  return (
    <span
      key={cost.resource}
      className="inline-flex items-center px-2 py-1 rounded"
    >
      <span className="mr-1 md:text-lg">
        {ResourceIcons[cost.resource as ResourceKey]}
      </span>
      <span>
        {cost.amount} {cost.resource}
      </span>
    </span>
  );
};

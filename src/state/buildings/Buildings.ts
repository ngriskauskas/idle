import type { ResourceCost } from "../resources/Resources";

export interface Building {
  key: string;
  description: string;
  cost: ResourceCost[];
}

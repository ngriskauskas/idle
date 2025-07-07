export type ResourceKey = "fire" | "water" | "air" | "earth";

export interface Resource {
  name: ResourceKey;
  amount: number;
  max: number;
  color: string;
  rate: number;
}

export const ResourceIcons: Record<ResourceKey, string> = {
  fire: "🔥",
  water: "💧",
  earth: "⛰️",
  air: "💨",
};

export type ResourceState = Record<ResourceKey, Resource>;

export const InitialResources: ResourceState = {
  fire: {
    name: "fire",
    amount: 0,
    max: 100,
    color: "#e25822",
    rate: 1,
  },
  water: {
    name: "water",
    amount: 0,
    max: 100,
    color: "#1e90ff",
    rate: 1,
  },
  air: {
    name: "air",
    amount: 0,
    max: 100,
    color: "#c0fefe",
    rate: 1,
  },
  earth: {
    name: "earth",
    amount: 0,
    max: 100,
    color: "#654321",
    rate: 1,
  },
};

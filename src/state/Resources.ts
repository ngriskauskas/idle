export type ResourceKey =
  | "fire"
  | "water"
  | "air"
  | "earth"
  | "steam"
  | "mud"
  | "energy"
  | "dust"
  | "cloud";

export interface Resource {
  key: ResourceKey;
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
  steam: "🌫️",
  mud: "💩",
  dust: "🌪️",
  energy: "⚡",
  cloud: "☁️",
};

export type ResourceCost = { resource: ResourceKey; amount: number };

export const InitialResources: Partial<Record<ResourceKey, Resource>> = {
  fire: {
    key: "fire",
    amount: 0,
    max: 100,
    color: "#e25822",
    rate: 1,
  },
  water: {
    key: "water",
    amount: 0,
    max: 100,
    color: "#1e90ff",
    rate: 1,
  },
  air: {
    key: "air",
    amount: 0,
    max: 100,
    color: "#c0fefe",
    rate: 1,
  },
  earth: {
    key: "earth",
    amount: 0,
    max: 100,
    color: "#654321",
    rate: 1,
  },
};

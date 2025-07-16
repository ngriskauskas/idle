import type {
  Resource,
  ResourceCost,
  ResourceKey,
} from "../resources/Resources";

export interface Fusion {
  key: string;
  recipe: FusionRecipe;
  discovered: boolean;
  canAfford: boolean;
}

export interface FusionRecipe {
  input: [ResourceKey, ResourceKey];
  output: Resource;
  costs: ResourceCost[];
}

export const InitialFusionRecipes: Fusion[] = [
  {
    key: "steam",
    recipe: {
      input: ["fire", "water"],
      output: {
        key: "steam",
        amount: 0,
        max: 10,
        rate: 1,
        color: "#d0e2f2",
      },
      costs: [
        { resource: "fire", amount: 100 },
        { resource: "water", amount: 10 },
      ],
    },
    canAfford: false,
    discovered: false,
  },
  {
    key: "mud",
    recipe: {
      input: ["water", "earth"],
      output: {
        key: "mud",
        amount: 0,
        max: 15,
        rate: 0.8,
        color: "#7b5e3c",
      },
      costs: [
        { resource: "water", amount: 50 },
        { resource: "earth", amount: 50 },
      ],
    },
    canAfford: false,
    discovered: false,
  },
  {
    key: "dust",
    recipe: {
      input: ["earth", "air"],
      output: {
        key: "dust",
        amount: 0,
        max: 20,
        rate: 0.5,
        color: "#c2b280",
      },
      costs: [
        { resource: "earth", amount: 60 },
        { resource: "air", amount: 40 },
      ],
    },
    canAfford: false,
    discovered: false,
  },
  {
    key: "energy",
    recipe: {
      input: ["fire", "air"],
      output: {
        key: "energy",
        amount: 0,
        max: 12,
        rate: 1.2,
        color: "#ffdd57",
      },
      costs: [
        { resource: "fire", amount: 80 },
        { resource: "air", amount: 30 },
      ],
    },
    canAfford: false,
    discovered: false,
  },
  {
    key: "cloud",
    recipe: {
      input: ["steam", "air"],
      output: {
        key: "cloud",
        amount: 0,
        max: 8,
        rate: 0.7,
        color: "#d9e8f5",
      },
      costs: [
        { resource: "steam", amount: 40 },
        { resource: "air", amount: 50 },
      ],
    },
    canAfford: false,
    discovered: false,
  },
];

import type { Purchasable } from "../Purchasable";
import type { Resource, ResourceKey } from "../resources/Resources";

export interface Fusion extends Purchasable {
  input: [ResourceKey, ResourceKey];
  output: Resource;
}

export const InitialFusionRecipes: Fusion[] = [
  {
    key: "steam",

    input: ["fire", "water"],
    output: {
      key: "steam",
      amount: 0,
      max: 10,
      rate: 1,
      color: "#d0e2f2",
    },
    canAfford: false,
    bought: false,
    costs: [
      { resource: "fire", amount: 100 },
      { resource: "water", amount: 10 },
    ],
  },
  {
    key: "mud",
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
    canAfford: false,
    bought: false,
  },
  {
    key: "dust",
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
    canAfford: false,
    bought: false,
  },
  {
    key: "energy",
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
    canAfford: false,
    bought: false,
  },
  {
    key: "cloud",
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
    canAfford: false,
    bought: false,
  },
];

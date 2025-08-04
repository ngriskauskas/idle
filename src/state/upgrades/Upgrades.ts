import type { Purchasable } from "../Purchasable";
import type { ResourceKey } from "../resources/Resources";

export interface Upgrade extends Purchasable {
  resource: ResourceKey;
  effects: UpgradeEffect[];
}

export type EffectType = "addRate" | "increaseMax" | "cyclic" | "custom";

export type UpgradeEffect = {
  type: EffectType;
  resource: ResourceKey;
  value: number;
  description?: string;
  run?: () => void;
};

export const InitialUpgrades: Upgrade[] = [
  {
    key: "Blazing Furnace",
    resource: "fire",
    costs: [
      { resource: "fire", amount: 100 },
      { resource: "earth", amount: 20 },
    ],
    owned: 0,
    max: 3,
    bought: false,
    canAfford: false,
    effects: [
      {
        type: "addRate",
        resource: "fire",
        value: 2,
      },
    ],
  },
  {
    key: "Flame Jet",
    resource: "fire",
    costs: [
      { resource: "fire", amount: 80 },
      { resource: "air", amount: 10 },
    ],
    owned: 0,
    max: 5,
    canAfford: false,
    bought: false,

    effects: [
      {
        type: "addRate",
        resource: "fire",
        value: 1,
      },
    ],
  },
  {
    key: "Inferno Reactor",
    resource: "fire",
    costs: [
      { resource: "fire", amount: 200 },
      { resource: "earth", amount: 50 },
      { resource: "water", amount: 25 },
    ],
    owned: 0,
    canAfford: false,
    bought: false,

    effects: [
      {
        type: "addRate",
        resource: "fire",
        value: 5,
      },
      {
        type: "increaseMax",
        resource: "fire",
        value: 50,
      },
    ],
  },

  // 💧 Water Upgrades
  {
    key: "Hydro Pump",
    resource: "water",
    costs: [
      { resource: "water", amount: 120 },
      { resource: "air", amount: 10 },
    ],
    owned: 0,
    max: 2,
    canAfford: false,
    bought: false,

    effects: [
      {
        type: "addRate",
        resource: "water",
        value: 3,
      },
    ],
  },
  {
    key: "Aqua Shield",
    resource: "water",
    costs: [
      { resource: "water", amount: 150 },
      { resource: "earth", amount: 30 },
    ],
    owned: 0,
    canAfford: false,
    bought: false,

    effects: [
      {
        type: "increaseMax",
        resource: "water",
        value: 100,
      },
    ],
  },

  // 🌍 Earth Upgrades
  {
    key: "Earth Core Drill",
    resource: "earth",
    costs: [
      { resource: "earth", amount: 150 },
      { resource: "fire", amount: 30 },
    ],
    owned: 0,
    max: 4,
    canAfford: false,
    bought: false,

    effects: [
      {
        type: "addRate",
        resource: "earth",
        value: 2,
      },
    ],
  },
  {
    key: "Stone Compactor",
    resource: "earth",
    costs: [{ resource: "earth", amount: 100 }],
    owned: 0,
    canAfford: false,
    bought: false,

    effects: [
      {
        type: "increaseMax",
        resource: "earth",
        value: 75,
      },
    ],
  },
  {
    key: "Seismic Stabilizer",
    resource: "earth",
    costs: [
      { resource: "earth", amount: 180 },
      { resource: "air", amount: 30 },
    ],
    owned: 0,
    max: 1,
    canAfford: false,
    bought: false,

    effects: [
      {
        type: "addRate",
        resource: "earth",
        value: 4,
      },
      {
        type: "increaseMax",
        resource: "earth",
        value: 100,
      },
    ],
  },

  // 🌬️ Air Upgrades
  {
    key: "Wind Turbine",
    resource: "air",
    costs: [
      { resource: "air", amount: 90 },
      { resource: "water", amount: 25 },
    ],
    owned: 0,
    max: 3,
    canAfford: false,
    bought: false,

    effects: [
      {
        type: "addRate",
        resource: "air",
        value: 2,
      },
    ],
  },
  {
    key: "Sky Blaster",
    resource: "air",
    costs: [
      { resource: "air", amount: 110 },
      { resource: "fire", amount: 20 },
    ],
    owned: 0,
    canAfford: false,
    bought: false,

    effects: [
      {
        type: "increaseMax",
        resource: "air",
        value: 60,
      },
    ],
  },
];

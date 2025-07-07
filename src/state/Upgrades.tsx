import type { ResourceKey } from "./Resources";

export interface Upgrade {
  name: string;
  resource: ResourceKey;
  costs: UpgradeCost[];
  numberBought: number;
  maxBuyable?: number;
  canAfford: boolean;
  effects: UpgradeEffect[];
}

export type UpgradeState = {
  available: Upgrade[];
};

export type UpgradeCost = { resource: ResourceKey; amount: number };

export type EffectType = "addRate" | "increaseMax" | "cyclic" | "custom";

export type UpgradeEffect = {
  type: EffectType;
  resource: ResourceKey;
  value: number;
  description?: string;
  run?: () => void;
};

export const InitialUpgrades: UpgradeState = {
  available: [
    // 🔥 Fire Upgrades
    {
      name: "Blazing Furnace",
      resource: "fire",
      costs: [
        { resource: "fire", amount: 100 },
        { resource: "earth", amount: 20 },
      ],
      numberBought: 0,
      maxBuyable: 3,
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
      name: "Flame Jet",
      resource: "fire",
      costs: [
        { resource: "fire", amount: 80 },
        { resource: "air", amount: 10 },
      ],
      numberBought: 0,
      maxBuyable: 5,
      canAfford: false,
      effects: [
        {
          type: "addRate",
          resource: "fire",
          value: 1,
        },
      ],
    },
    {
      name: "Inferno Reactor",
      resource: "fire",
      costs: [
        { resource: "fire", amount: 200 },
        { resource: "earth", amount: 50 },
        { resource: "water", amount: 25 },
      ],
      numberBought: 0,
      canAfford: false,
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
      name: "Hydro Pump",
      resource: "water",
      costs: [
        { resource: "water", amount: 120 },
        { resource: "air", amount: 10 },
      ],
      numberBought: 0,
      maxBuyable: 2,
      canAfford: false,
      effects: [
        {
          type: "addRate",
          resource: "water",
          value: 3,
        },
      ],
    },
    {
      name: "Aqua Shield",
      resource: "water",
      costs: [
        { resource: "water", amount: 150 },
        { resource: "earth", amount: 30 },
      ],
      numberBought: 0,
      canAfford: false,
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
      name: "Earth Core Drill",
      resource: "earth",
      costs: [
        { resource: "earth", amount: 150 },
        { resource: "fire", amount: 30 },
      ],
      numberBought: 0,
      maxBuyable: 4,
      canAfford: false,
      effects: [
        {
          type: "addRate",
          resource: "earth",
          value: 2,
        },
      ],
    },
    {
      name: "Stone Compactor",
      resource: "earth",
      costs: [{ resource: "earth", amount: 100 }],
      numberBought: 0,
      canAfford: false,
      effects: [
        {
          type: "increaseMax",
          resource: "earth",
          value: 75,
        },
      ],
    },
    {
      name: "Seismic Stabilizer",
      resource: "earth",
      costs: [
        { resource: "earth", amount: 180 },
        { resource: "air", amount: 30 },
      ],
      numberBought: 0,
      maxBuyable: 1,
      canAfford: false,
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
      name: "Wind Turbine",
      resource: "air",
      costs: [
        { resource: "air", amount: 90 },
        { resource: "water", amount: 25 },
      ],
      numberBought: 0,
      maxBuyable: 3,
      canAfford: false,
      effects: [
        {
          type: "addRate",
          resource: "air",
          value: 2,
        },
      ],
    },
    {
      name: "Sky Blaster",
      resource: "air",
      costs: [
        { resource: "air", amount: 110 },
        { resource: "fire", amount: 20 },
      ],
      numberBought: 0,
      canAfford: false,
      effects: [
        {
          type: "increaseMax",
          resource: "air",
          value: 60,
        },
      ],
    },
  ],
};

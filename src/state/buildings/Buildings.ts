import type { Purchasable } from "../Purchasable";

export interface Building extends Purchasable {
  description: string;
}

export const InitialBuildings: Building[] = [
  {
    key: "farm",
    description: "Produces food",
    costs: [
      { resource: "earth", amount: 100 },
      { resource: "water", amount: 100 },
    ],
    owned: 0,
    bought: false,
    canAfford: false,
    effect: (set) => {
      setTimeout(() => {
        set((s) => {
          s.resources.spend([{ resource: "water", amount: 50 }]);
          return s;
        });
      }, 5000);
    },
  },
  {
    key: "mine",
    description: "Produces minerals",
    costs: [{ resource: "mud", amount: 200 }],
    owned: 0,
    bought: false,
    canAfford: false,
    effect: () => {},
  },
  {
    key: "factory",
    description: "Produces goods",
    costs: [{ resource: "steam", amount: 300 }],
    owned: 0,
    canAfford: false,
    bought: false,
    effect: () => {},
  },
  {
    key: "powerPlant",
    description: "Produces energy",
    costs: [{ resource: "energy", amount: 400 }],
    owned: 0,
    canAfford: false,
    bought: false,
    effect: () => {},
  },
  {
    key: "researchLab",
    description: "Produces research points",
    costs: [{ resource: "energy", amount: 500 }],
    owned: 0,
    canAfford: false,
    bought: false,
    effect: () => {},
  },
  {
    key: "spaceport",
    description: "Enables space exploration",
    costs: [
      { resource: "energy", amount: 1000 },
      { resource: "fire", amount: 500 },
    ],
    owned: 0,
    canAfford: false,
    bought: false,
    effect: () => {},
  },
  {
    key: "roboticsFactory",
    description: "Produces robots",
    costs: [
      { resource: "energy", amount: 1500 },
      { resource: "earth", amount: 1000 },
    ],
    owned: 0,
    canAfford: false,
    bought: false,
    effect: () => {},
  },
];

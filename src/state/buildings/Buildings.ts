import type { ResourceCost } from "../resources/Resources";
import type { ResourceContext } from "../resources/ResourceState";

export interface Building {
  key: string;
  description: string;
  costs: ResourceCost[];
  owned: number;
  canAfford: boolean;
  effect: (ctx: { resources: ResourceContext }) => void;
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
    canAfford: false,
    effect: ({ resources }) => {},
  },
  {
    key: "mine",
    description: "Produces minerals",
    costs: [{ resource: "mud", amount: 200 }],
    owned: 0,
    canAfford: false,
    effect: ({ resources }) => {},
  },
  {
    key: "factory",
    description: "Produces goods",
    costs: [{ resource: "steam", amount: 300 }],
    owned: 0,
    canAfford: false,
    effect: ({ resources }) => {},
  },
  {
    key: "powerPlant",
    description: "Produces energy",
    costs: [{ resource: "energy", amount: 400 }],
    owned: 0,
    canAfford: false,
    effect: ({ resources }) => {},
  },
  {
    key: "researchLab",
    description: "Produces research points",
    costs: [{ resource: "energy", amount: 500 }],
    owned: 0,
    canAfford: false,
    effect: ({ resources }) => {},
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
    effect: ({ resources }) => {},
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
    effect: ({ resources }) => {},
  },
];

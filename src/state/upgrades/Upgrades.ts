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
};

const fireUpgrades: Upgrade[] = [];
const airUpgrades: Upgrade[] = [];
const waterUpgrades: Upgrade[] = [];
const earthUpgrades: Upgrade[] = [];

export const InitialUpgrades: Upgrade[] = [
  ...fireUpgrades,
  ...airUpgrades,
  ...waterUpgrades,
  ...earthUpgrades,
];

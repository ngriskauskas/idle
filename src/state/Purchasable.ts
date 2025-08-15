import { canAfford } from "../utils/helpers";
import type { GameState, GameStateSet } from "./GameState";
import type { ResourceCost } from "./resources/Resources";

export interface Purchasable {
  key: string;
  costs: ResourceCost[];
  canAfford: boolean;
  owned?: number;
  max?: number;
  bought: boolean;
  effect?: (set: GameStateSet) => void;
}

type PurchaseableKeys = {
  [K in keyof GameState]: GameState[K] extends { state: Purchasable[] }
    ? K
    : never;
}[keyof GameState];

export const calcAffordPurchasable = <K extends PurchaseableKeys>(
  key: K,
  get: () => GameState,
  set: GameStateSet
) => {
  const resources = get().resources.state;
  set((state) => {
    const slice = state[key] as { state: Purchasable[] };
    slice.state.forEach((item, i) => {
      item.canAfford = canAfford(resources, item.costs);
    });
  });
};

export const buyPurchasable = <K extends PurchaseableKeys>(
  key: K,
  item: Purchasable,
  get: () => GameState,
  set: GameStateSet
) => {
  get().resources.spend(item.costs);
  set((state) => {
    const sliceState = state[key] as { state: Purchasable[] };
    sliceState.state.forEach((x) => {
      if (x.key === item.key) {
        x.bought = true;
        if (x.owned !== undefined) {
          x.owned =
            x.max !== undefined ? Math.min(x.owned + 1, x.max) : x.owned + 1;
        }
      }
    });
  });
  item.effect?.(set);
};

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
  const slice = get()[key] as { state: Purchasable[] };
  const resources = get().resources.state;
  set((s) => ({
    [key]: {
      ...(s[key] as { state: Purchasable[] }),
      state: slice.state.map((item) => ({
        ...item,
        canAfford: canAfford(resources, item.costs),
      })),
    },
  }));
};

export const buyPurchasable = <K extends PurchaseableKeys>(
  key: K,
  item: Purchasable,
  get: () => GameState,
  set: GameStateSet
) => {
  get().resources.spend(item.costs);
  const slice = get()[key] as { state: Purchasable[] };
  set((s) => ({
    [key]: {
      ...(s[key] as { state: Purchasable[] }),
      state: slice.state.map((x) =>
        x.key !== item.key
          ? x
          : {
              ...x,
              bought: true,
              owned:
                x.owned === undefined
                  ? undefined
                  : x.max
                  ? Math.min(x.owned + 1, x.max!)
                  : x.owned + 1,
            }
      ),
    },
  }));
  item.effect?.(set);
};

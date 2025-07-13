import { createContext, useContext, type ReactNode } from "react";
import { InitialResources, type ResourceKey } from "./Resources";
import { InitialUpgrades, type Upgrade } from "./Upgrades";
import { useResourceState, type ResourceState } from "./ResourceState";
import { useUpgradeState, type UpgradeState } from "./UpgradeState";
import { useGameLoop } from "./GameLoop";
import { useFusionState, type FusionState } from "./FusionState";
import { InitialFusionRecipes, type Fusion } from "./Fusions";

interface ContextType {
  resources: ResourceState;
  upgrades: UpgradeState;
  fusions: FusionState;
  doFusion: (fusion: Fusion) => void;
  purchaseUpgrade: (upgrade: Upgrade) => Boolean;
}

const Context = createContext<ContextType>({
  resources: InitialResources,
  upgrades: { available: InitialUpgrades },
  fusions: InitialFusionRecipes,
  doFusion: (_) => {},
  purchaseUpgrade: (_) => false,
});

export const Provider = ({ children }: { children: ReactNode }) => {
  const {
    resources,
    getResources,
    spendResources,
    updateResources,
    setResources,
  } = useResourceState();

  const { upgrades, purchaseUpgrade, calcUpgradeAfford } = useUpgradeState(
    getResources,
    spendResources,
    setResources
  );

  const { fusions, calcFusionAfford, doFusion } = useFusionState(
    getResources,
    spendResources,
    setResources
  );

  useGameLoop({ updateResources, calcUpgradeAfford, calcFusionAfford });

  return (
    <Context.Provider
      value={{
        resources,
        upgrades,
        fusions,
        doFusion,
        purchaseUpgrade,
      }}
    >
      {children}
    </Context.Provider>
  );
};
export const useGameState = () => useContext(Context);

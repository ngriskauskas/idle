import { createContext, useContext, type ReactNode } from "react";
import { InitialResources, type ResourceState } from "./Resources";
import { InitialUpgrades, type Upgrade, type UpgradeState } from "./Upgrades";
import { useResourceState } from "./ResourceState";
import { useUpgradeState } from "./UpgradeState";
import { useGameLoop } from "./GameLoop";

interface ContextType {
  resources: ResourceState;
  upgrades: UpgradeState;
  purchaseUpgrade: (upgrade: Upgrade) => Boolean;
}

const Context = createContext<ContextType>({
  resources: InitialResources,
  upgrades: InitialUpgrades,
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
  const { upgrades, purchaseUpgrade, recalculateAffordability } =
    useUpgradeState(getResources, spendResources, setResources);

  useGameLoop({ updateResources, recalculateAffordability });

  return (
    <Context.Provider
      value={{
        resources,
        upgrades,
        purchaseUpgrade,
      }}
    >
      {children}
    </Context.Provider>
  );
};
export const useGameState = () => useContext(Context);

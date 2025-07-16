import { createContext, useContext, type ReactNode } from "react";
import { useUpgradeState, type UpgradeContext } from "./upgrades/UpgradeState";
import { useGameLoop } from "./GameLoop";
import { useFusionState, type FusionContext } from "./fusions/FusionState";
import {
  useResourceState,
  type ResourceContext,
} from "./resources/ResourceState";

interface ContextType {
  resources: ResourceContext;
  upgrades: UpgradeContext;
  fusions: FusionContext;
}

const Context = createContext<ContextType | undefined>(undefined);

export const Provider = ({ children }: { children: ReactNode }) => {
  const resourceContext = useResourceState();
  const upgradeContext = useUpgradeState(resourceContext);
  const fusionContext = useFusionState(resourceContext);

  useGameLoop([
    resourceContext.update,
    upgradeContext.calcAfford,
    fusionContext.calcAfford,
  ]);

  return (
    <Context.Provider
      value={{
        resources: resourceContext,
        upgrades: upgradeContext,
        fusions: fusionContext,
      }}
    >
      {children}
    </Context.Provider>
  );
};
export const useGameState = () => {
  const ctx = useContext(Context);
  if (!ctx) throw new Error("useGameState must be used within a <Provider>");
  return ctx;
};

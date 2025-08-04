import { useEffect } from "react";
import { useGameState } from "./GameState";

export const TickRate = 1000;

export const useGameLoop = () => {
  const updateResources = useGameState((s) => s.resources.update);
  const calcUpgradeAfford = useGameState((s) => s.upgrades.calcAfford);
  const calcFusionAfford = useGameState((s) => s.buildings.calcAfford);
  const calcBuildingAfford = useGameState((s) => s.fusions.calcAfford);
  const calcTechAfford = useGameState((s) => s.tech.calcAfford);

  useEffect(() => {
    const interval = setInterval(() => {
      updateResources();
      calcUpgradeAfford();
      calcFusionAfford();
      calcBuildingAfford();
      calcTechAfford();
    }, TickRate);

    return () => clearInterval(interval);
  }, [
    updateResources,
    calcUpgradeAfford,
    calcFusionAfford,
    calcTechAfford,
    calcBuildingAfford,
  ]);
};

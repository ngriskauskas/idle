import { useEffect } from "react";

export const TickRate = 100;

export const useGameLoop = ({
  updateResources,
  calcUpgradeAfford,
  calcFusionAfford,
}: {
  updateResources: () => void;
  calcUpgradeAfford: () => void;
  calcFusionAfford: () => void;
}) => {
  useEffect(() => {
    const interval = setInterval(() => {
      updateResources();
      calcUpgradeAfford();
      calcFusionAfford();
    }, TickRate);

    return () => clearInterval(interval);
  }, []);
};

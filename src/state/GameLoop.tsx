import { useEffect } from "react";

export const TickRate = 100;

export const useGameLoop = ({
  updateResources,
  recalculateAffordability,
}: {
  updateResources: () => void;
  recalculateAffordability: () => void;
}) => {
  useEffect(() => {
    const interval = setInterval(() => {
      updateResources();
      recalculateAffordability();
    }, TickRate);

    return () => clearInterval(interval);
  }, []);
};

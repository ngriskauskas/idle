import { useEffect } from "react";

export const TickRate = 100;

export const useGameLoop = (tickFns: Array<() => void>) => {
  useEffect(() => {
    const interval = setInterval(() => {
      for (const fn of tickFns) fn();
    }, TickRate);

    return () => clearInterval(interval);
  }, []);
};

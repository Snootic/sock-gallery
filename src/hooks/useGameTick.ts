import { useEffect, useRef } from "react";
import { useUpdateGame } from "./updateGame";

export const useGameTick = () => {
  const TICK_RATE = 5;
  const TICK_INTERVAL = 1000 / TICK_RATE;

  const updateGame = useUpdateGame();
  const updateGameRef = useRef(updateGame);

  useEffect(() => {
    updateGameRef.current = updateGame;
  }, [updateGame]);

  useEffect(() => {
    let lastTick = Date.now();

    const intervalId = setInterval(() => {
      const now = Date.now();
      const delta = (now - lastTick) / 1000;
      lastTick = now;

      updateGameRef.current(false);
    }, TICK_INTERVAL);

    return () => clearInterval(intervalId);
  }, [TICK_INTERVAL]);
};

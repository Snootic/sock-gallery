import { useEffect, useRef } from "react";
import { useUpdateGame } from "./updateGame";

export const useGameTick = () => {
  const TICK_RATE = 20 ;
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
      const delta = (now - lastTick) / TICK_RATE;
      lastTick = now;

      updateGameRef.current(delta);
    }, TICK_INTERVAL);

    return () => clearInterval(intervalId);
  }, [TICK_INTERVAL]);
};

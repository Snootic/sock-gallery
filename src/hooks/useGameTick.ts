import { useEffect, useRef } from "react";
import { useUpdateGame } from "./updateGame";

export const useGameTick = (host: boolean) => {
  const TICK_RATE = 20 ;
  const TICK_INTERVAL = 1000 / TICK_RATE;

  const updateGame = useUpdateGame();
  const updateGameRef = useRef(updateGame);

  useEffect(() => {
    updateGameRef.current = updateGame;
  }, [updateGame]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      updateGameRef.current(host);
    }, TICK_INTERVAL);

    return () => clearInterval(intervalId);
  }, [TICK_INTERVAL, host]);
};

import { useEffect, useRef, useCallback, useState } from "react";
import { useUpdateGame } from "./updateGame";

export const useGameTick = (host: boolean) => {
  const TICK_RATE = 20;
  const TICK_INTERVAL = 1000 / TICK_RATE;
  const [, forceUpdate] = useState({});

  const updateGame = useUpdateGame();
  const updateGameRef = useRef(updateGame);

  const triggerRerender = useCallback(() => {
    forceUpdate({});
  }, []);

  useEffect(() => {
    updateGameRef.current = updateGame;
  }, [updateGame]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      updateGameRef.current(host);
      // this will force re-render because
      // updategame was not getting updated meshes data
      // because scene was not being re-rendered
      // do not know why, but this works
      triggerRerender();
    }, TICK_INTERVAL);

    return () => clearInterval(intervalId);
  }, [TICK_INTERVAL, host, triggerRerender]);
};

import { PlayerCamera } from "./camera";
import { PlayerBody } from "./body";
import { useEffect, useState } from "react";
import { usePlayer } from "../../hooks/player/usePlayer"; // Assuming you create a new hook file
import type { Player } from "../../types";
import type { Socket } from "socket.io-client";

export function Player({ id, position, color, socket }: Player & { socket: Socket | null}) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { playerBody, playerCamera, playerPosition } = usePlayer({ id, position, color }, socket);
  const [cameraType, setCameraType] = useState<'firstPerson' | 'thirdPerson'>('firstPerson');

  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      if (event.key === "v") {
        setCameraType((prev) => {
          const next = prev === 'firstPerson' ? 'thirdPerson' : 'firstPerson';
          return next;
        });
      }
    };
    
    window.addEventListener('keydown', keyDownHandler);

    return () => {
      window.removeEventListener('keydown', keyDownHandler);
    };
  }, []);

  return (
    <>
      {cameraType === 'firstPerson' && <PlayerCamera ref={playerCamera} CameraPosition={{x:0, y:0.5, z:0}}  />}
      {cameraType === 'thirdPerson' && <PlayerCamera ref={playerCamera} CameraPosition={{x:5, y:1, z:10}}  />}
      <PlayerBody ref={playerBody} position={position} color={color} />
    </>
  );
}
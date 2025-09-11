import { PlayerCamera } from "./camera";
import { PlayerBody } from "./body";
import { useEffect, useState } from "react";
import { usePlayer } from "../../hooks/player/usePlayer";
import type { Player } from "../../types";
import type { Socket } from "socket.io-client";

export function Player({ socket, ...props }: { socket: Socket | null} & Partial<Player>) {
  const playerData = usePlayer({ ...props }, socket);
  const playerBody = playerData.playerBody
  const playerCamera = playerData.playerCamera
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
    <group name="player">
      <PlayerCamera ref={playerCamera} CameraPosition={{x:0, y:0.5, z:0}}/>
      {playerCamera.current && (playerCamera.current.CameraType = cameraType)}
      <PlayerBody playerId={props.id!} ref={playerBody} position={props.position!} color={props.color} />
    </group>
  );
}
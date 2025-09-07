import { PlayerCamera } from "./camera";
import { PlayerBody } from "./body";
import { useEffect, useState } from "react";
import { usePlayer } from "../../hooks/player/usePlayer"; // Assuming you create a new hook file

type PlayerProps = {
  position: [number, number, number];
  color?: string;
};

export function Player({ position, color }: PlayerProps) {
  const { playerBody, playerCamera, playerPosition } = usePlayer(position);
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
import { useEffect, useState } from "react";
import { useSocketContext } from "../../hooks/socketProvider";
import type { WorldObject } from "../../types";
import { Player } from "../../components";
import { useGameTick } from "../../hooks/useGameTick";
import { LoadedObject } from "../../components";
import { mergeWorldObjects } from "../../hooks/mergeWorldObjects";

export const GuestScene = () => {
  const { socket, worldObjects } = useSocketContext();
  const [mergedObjects, setMergedObjects] = useState<WorldObject[]>([]);

  useGameTick(false)

  useEffect(() => {
    setMergedObjects((prev) => mergeWorldObjects(prev, worldObjects));
  }, [worldObjects]);

  return (
    <>
      <ambientLight intensity={0.5} />
      {mergedObjects
        .filter((wo: WorldObject) => wo.object.userData?.id !== socket?.id)
        .map((wo) => (
          <LoadedObject key={wo.object.uuid} objectData={wo} />
        ))}
      {socket?.id && mergedObjects && (
        <Player id={socket.id as string} position={[0, 0, 0]} socket={socket} color="red"/>
      )}
    </>
  );
};

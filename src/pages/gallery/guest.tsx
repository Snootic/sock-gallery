import { useEffect, useState } from "react";
import { useSocketContext } from "../../hooks/socketProvider";
import { Player } from "../../components";
import { useGameTick } from "../../hooks/useGameTick";
import { LoadedObject } from "../../components";
import { mergeWorldObjects } from "../../hooks/mergeWorldObjects";
import type { MinimalObjectData } from "../../hooks/useMeshes";

export const GuestScene = () => {
  const { socket, worldObjects } = useSocketContext();
  const [mergedObjects, setMergedObjects] = useState<MinimalObjectData[]>([]);

  useGameTick(false)

  useEffect(() => {
    setMergedObjects((prev) => mergeWorldObjects(prev, worldObjects));
  }, [worldObjects]);

  return (
    <>
      <ambientLight intensity={0.5} />
      {mergedObjects
        .filter((wo: MinimalObjectData) => wo.userData?.id !== socket?.id)
        .map((wo) => (
          <LoadedObject key={wo.group} objectData={wo} />
        ))}
      {socket?.id && mergedObjects && (
        <Player id={socket.id as string} position={[0, 0, 0]} socket={socket} color="red"/>
      )}
    </>
  );
};

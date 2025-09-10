import { useEffect, useMemo, useState } from "react";
import { useSocketContext } from "../../hooks/socketProvider";
import * as THREE from "three";
import type { WorldObject } from "../../types";
import { Player } from "../../components";
import { MeshObject } from "../../components/MeshObject";
import { Frame, Lamp } from "../../components/blocks";

const LoadedObject = ({ objectData }: { objectData: WorldObject }) => {
  const obj = useMemo(
    () => new THREE.ObjectLoader().parse(objectData),
    [objectData]
  ) as THREE.Mesh;

  const {
    uuid,
    geometry,
    material,
    position,
    quaternion,
    scale,
    castShadow,
    receiveShadow,
    userData,
  } = obj;
  const props = {
    geometry,
    material,
    position,
    quaternion,
    scale,
    castShadow,
    receiveShadow,
    userData,
  };

  switch (obj.userData.componentType) {
    case "Frame":
      return (
        <Frame
          key={uuid}
          {...(props as React.ComponentProps<typeof Frame>)}
          color={"blue"}
        />
      );
    case "Lamp":
      return (
        <Lamp key={uuid} {...(props as React.ComponentProps<typeof Lamp>)} />
      );
    case "Player":
      return <MeshObject key={uuid} {...props} />;
    default:
      return <MeshObject key={uuid} {...props} />;
  }
};

function mergeWorldObjects(
  prev: WorldObject[],
  updates: WorldObject[]
): WorldObject[] {
  const map = new Map(prev.map((obj) => [obj.object.uuid, obj]));
  console.log(map)
  updates.forEach((obj) => {
    if (!map.has(obj.object.uuid)) {
      map.set(obj.object.uuid, obj);
    } else {
      map.set(obj.object.uuid, obj);
    }
  });

  console.log(updates)
  return Array.from(map.values());
}

export const GuestScene = () => {
  const { socket, worldObjects } = useSocketContext();
  const [mergedObjects, setMergedObjects] = useState<WorldObject[]>([]);

  useEffect(() => {
    setMergedObjects((prev) => mergeWorldObjects(prev, worldObjects));
  }, [worldObjects]);

  return (
    <>
      <ambientLight intensity={0.5} />
      {mergedObjects
        .filter((wo: WorldObject) => wo.uuid !== socket?.id)
        .map((wo) => (
          <LoadedObject key={wo.uuid} objectData={wo} />
        ))}
      {socket?.id && mergedObjects && (
        <Player id={socket.id as string} position={[0, 0, 0]} socket={socket} />
      )}
    </>
  );
};

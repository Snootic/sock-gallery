import { Frame, Lamp } from "../../components/blocks";
import { useGameTick } from "../../hooks/useGameTick";
import { Player, MeshObject } from "../../components";
import { useSocketContext } from "../../hooks/socketProvider";
import { LoadedObject } from "../../components";
import { useEffect, useState } from "react";
import type { WorldObject } from "../../types";
import { mergeWorldObjects } from "../../hooks/mergeWorldObjects";

export const HostScene = () => {
  const { socket, worldObjects } = useSocketContext();
  const [mergedObjects, setMergedObjects] = useState<WorldObject[]>([]);
  
  useGameTick(true);
  const sceneBox = [
    {
      // chao
      rotation: [-Math.PI / 2, 0, 0],
      position: [0, -0.5, 0],
      geometry: [50, 50],
      color: "red",
    },
    {
      //teto
      rotation: [Math.PI / 2, 0, 0],
      position: [0, 5, 0],
      geometry: [50, 50],
      color: "purple",
    },
    {
      rotation: [0, -Math.PI / 2, 0],
      position: [25, 2, 0],
      geometry: [50, 12],
      color: "green",
    },
    {
      rotation: [0, Math.PI / 2, 0],
      position: [-25, 2, 0],
      geometry: [50, 12],
      color: "yellow",
    },
    {
      rotation: [0, Math.PI, 0],
      position: [0, 2, 25],
      geometry: [50, 12],
      color: "pink",
    },
    {
      rotation: [0, 0, Math.PI],
      position: [0, 2, -25],
      geometry: [50, 12],
      color: "orange",
    },
  ];

  useEffect(() => {
    setMergedObjects((prev) => mergeWorldObjects(prev, worldObjects));
  }, [worldObjects]);

  return (
    <>
      <group name={"scene-box"}>
        {sceneBox.map((props, idx) => (
          <MeshObject
            key={idx}
            rotation={props.rotation as [number, number, number]}
            position={props.position as [number, number, number]}
          >
            <planeGeometry args={props.geometry as [number, number, number]} />
            <meshStandardMaterial color={props.color} />
          </MeshObject>
        ))}
      </group>
      <ambientLight intensity={0.5} />
      <Lamp position={[0, 4.8, 0]} />
      <Lamp position={[0, 4.8, 20]} />
      <Lamp position={[20, 4.8, -20]} />
      <Lamp position={[20, 4.8, 0]} />
      <Lamp position={[20, 4.8, -20]} />
      <Lamp position={[20, 4.8, 20]} />
      <Lamp position={[-20, 4.8, 0]} />
      <Lamp position={[-20, 4.8, 20]} />
      <Lamp position={[-20, 4.8, -20]} />
      {socket?.id && (
        <Player id={socket.id as string} position={[0, 0, 0]} socket={socket} />
      )}

      {mergedObjects.map((wo) => (
        <LoadedObject key={wo.object.uuid} objectData={wo} />
      ))}

      <Frame color={"blue"} position={[0, 0.5, 0]} />
    </>
  );
};

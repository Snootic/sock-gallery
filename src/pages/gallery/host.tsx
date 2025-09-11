import { Frame, Lamp } from "../../components/blocks";
import { useGameTick } from "../../hooks/useGameTick";
import { Player, MeshObject } from "../../components";
import { useSocketContext } from "../../hooks/socketProvider";
import { LoadedObject } from "../../components";
import { useEffect, useMemo, useState } from "react";
import type { WorldObject } from "../../types";
import { mergeWorldObjects } from "../../hooks/mergeWorldObjects";
import { useTexture } from "@react-three/drei";
import { RepeatWrapping, Vector3 } from "three";
import { floorTexturePaths, wallTexturePaths } from "../../constants/textures";

export const HostScene = () => {
  const { socket, worldObjects } = useSocketContext();
  const [mergedObjects, setMergedObjects] = useState<WorldObject[]>([]);
  useGameTick(true);

  const floorTexture = useTexture(floorTexturePaths);
  const wallTexture = useTexture(wallTexturePaths);

  const sceneBox = useMemo(() => [
    {
      // chao
      rotation: [-Math.PI / 2, 0, 0],
      position: [0, -0.5, 0],
      geometry: [50, 50],
      texture: floorTexture
    },
    {
      //teto
      rotation: [Math.PI / 2, 0, 0],
      position: [0, 5, 0],
      geometry: [50, 50],
      texture: wallTexture
    },
    {
      rotation: [0, -Math.PI / 2, 0],
      position: [25, 2, 0],
      geometry: [50, 12],
      texture: wallTexture
    },
    {
      rotation: [0, Math.PI / 2, 0],
      position: [-25, 2, 0],
      geometry: [50, 12],
      texture: wallTexture
    },
    {
      rotation: [0, Math.PI, 0],
      position: [0, 2, 25],
      geometry: [50, 12],
      texture: wallTexture
    },
    {
      rotation: [0, 0, Math.PI],
      position: [0, 2, -25],
      geometry: [50, 12],
      texture: wallTexture
    },
  ], [floorTexture, wallTexture]);

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
            receiveShadow
          >
            <planeGeometry args={[props.geometry[0], props.geometry[1]]}/>
            <meshStandardMaterial
            {...props.texture}
            />
            {props.texture?.map && (
            <primitive
              object={props.texture.map}
              attach="map"
              repeat={[props.geometry[0] / 8, props.geometry[1] / 8]}
              wrapS={RepeatWrapping}
              wrapT={RepeatWrapping}
            />
            )}
          </MeshObject>
        ))}
      </group>
      <ambientLight intensity={0.5} />
      <Lamp position={[0, 4.8, 0]} />
      {/* <Lamp position={[0, 4.8, 20]} />
      <Lamp position={[20, 4.8, -20]} />
      <Lamp position={[20, 4.8, 0]} />
      <Lamp position={[20, 4.8, -20]} />
      <Lamp position={[20, 4.8, 20]} />
      <Lamp position={[-20, 4.8, 0]} />
      <Lamp position={[-20, 4.8, 20]} />
      <Lamp position={[-20, 4.8, -20]} /> */}
      {socket?.id && (
        <Player id={socket.id as string} position={[0, 0, 0]} socket={socket} />
      )}

      {mergedObjects.map((wo) => (
        <LoadedObject key={wo.object.uuid} objectData={wo} />
      ))}

      <Frame picturePath={"/src/assets/monalisa.jpg"} position={new Vector3(0, 1, 0)} />
    </>
  );  
};

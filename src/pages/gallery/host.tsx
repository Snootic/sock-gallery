import { Frame, GalleryBox, Lamp } from "../../components/blocks";
import { useGameTick } from "../../hooks/useGameTick";
import { Player } from "../../components";
import { useSocketContext } from "../../hooks/socketProvider";
import { LoadedObject } from "../../components";
import { useEffect, useState } from "react";
import { mergeWorldObjects } from "../../hooks/mergeWorldObjects";
import { Euler, Vector3 } from "three";
import { pictures } from "../../constants/pictures";
import type { MinimalObjectData } from "../../hooks/useMeshes";

const galleryItems = [
  {
    position: new Vector3(0, 1, -9.9),
    rotation: [0, 0, 0],
    lampOffset: new Vector3(0, 1.8, 1.9),
    picture: pictures.monalisa,
  },
  {
    position: new Vector3(5, 1, -9.9),
    rotation: [0, 0, 0],
    lampOffset: new Vector3(0, 1.8, 1.9),
    picture: pictures.monalisa,
  },
  {
    position: new Vector3(-5, 1, -9.9),
    rotation: [0, 0, 0],
    lampOffset: new Vector3(0, 1.8, 1.9),
    picture: pictures.monalisa,
  },
  {
    position: new Vector3(0, 1, 9.9),
    rotation: [0, Math.PI, 0],
    lampOffset: new Vector3(0, 1.8, -1.9),
    picture: pictures.monalisa,
  },
  {
    position: new Vector3(5, 1, 9.9),
    rotation: [0, Math.PI, 0],
    lampOffset: new Vector3(0, 1.8, -1.9),
    picture: pictures.monalisa,
  },
  {
    position: new Vector3(-5, 1, 9.9),
    rotation: [0, Math.PI, 0],
    lampOffset: new Vector3(0, 1.8, -1.9),
    picture: pictures.monalisa,
  },
  {
    position: new Vector3(-9.9, 1, 0),
    rotation: [0, Math.PI / 2, 0],
    lampOffset: new Vector3(1.9, 1.8, 0),
    picture: pictures.monalisa,
  },
  {
    position: new Vector3(-9.9, 1, 5),
    rotation: [0, Math.PI / 2, 0],
    lampOffset: new Vector3(1.9, 1.8, 0),
    picture: pictures.monalisa,
  },
  {
    position: new Vector3(-9.9, 1, -5),
    rotation: [0, Math.PI / 2, 0],
    lampOffset: new Vector3(1.9, 1.8, 0),
    picture: pictures.monalisa,
  },
  {
    position: new Vector3(9.9, 1, 0),
    rotation: [0, -Math.PI / 2, 0],
    lampOffset: new Vector3(-1.9, 1.8, 0),
    picture: pictures.monalisa,
  },
  {
    position: new Vector3(9.9, 1, 5),
    rotation: [0, -Math.PI / 2, 0],
    lampOffset: new Vector3(-1.9, 1.8, 0),
    picture: pictures.monalisa,
  },
  {
    position: new Vector3(9.9, 1, -5),
    rotation: [0, -Math.PI / 2, 0],
    lampOffset: new Vector3(-1.9, 1.8, 0),
    picture: pictures.monalisa,
  },
];

export const HostScene = () => {
  const { socket, worldObjects } = useSocketContext();
  const [mergedObjects, setMergedObjects] = useState<MinimalObjectData[]>([]);
  
  useEffect(() => {
    setMergedObjects((prev) => mergeWorldObjects(prev, worldObjects));
  }, [worldObjects]);
  
  useGameTick(true);
  return (
    <>
      <GalleryBox/>
      <ambientLight intensity={0.5} />
      {socket?.id && (
        <Player id={socket.id as string} position={[0, 0, 0]} socket={socket} />
      )}

      {mergedObjects.map((wo) => (
        <LoadedObject key={wo.group} objectData={wo} />
      ))}

      {galleryItems.map((item, index) => (
        <group key={index}>
          <Frame
            picturePath={item.picture.path}
            about={item.picture.about}
            position={item.position}
            rotation={new Euler(...item.rotation)}
          />
          <Lamp
            position={new Vector3().copy(item.position).add(item.lampOffset)}
            target={item.position}
          />
        </group>
      ))}
    </>
  );
};

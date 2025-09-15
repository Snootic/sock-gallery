import { useTexture } from "@react-three/drei";
import type React from "react"
import { floorTexturePaths, wallTexturePaths } from "../../constants/textures";
import { MeshObject } from "../MeshObject";
import { RepeatWrapping } from "three";

export const GalleryBox:React.FC = () => {
  const floorTexture = useTexture(floorTexturePaths);
  const wallTexture = useTexture(wallTexturePaths);
  
  const sceneBox =
  [
    {
      // chao
      rotation: [-Math.PI / 2, 0, 0],
      position: [0, -0.5, 0],
      geometry: [20, 20],
      texture: floorTexture,
    },
    {
      //teto
      rotation: [Math.PI / 2, 0, 0],
      position: [0, 3, 0],
      geometry: [20, 20],
      texture: wallTexture,
    },
    {
      rotation: [0, -Math.PI / 2, 0],
      position: [10, 2, 0],
      geometry: [20, 12],
      texture: wallTexture,
    },
    {
      rotation: [0, Math.PI / 2, 0],
      position: [-10, 2, 0],
      geometry: [20, 12],
      texture: wallTexture,
    },
    {
      rotation: [0, Math.PI, 0],
      position: [0, 2, 10],
      geometry: [20, 12],
      texture: wallTexture,
    },
    {
      rotation: [0, 0, Math.PI],
      position: [0, 2, -10],
      geometry: [20, 12],
      texture: wallTexture,
    },
  ]
  
  return (
    <group name="GalleryBox">
      {sceneBox.map((props, idx) => (
        <MeshObject
          key={idx}
          rotation={props.rotation as [number, number, number]}
          position={props.position as [number, number, number]}
          receiveShadow
        >
        <planeGeometry args={[props.geometry[0], props.geometry[1]]} />
        <meshStandardMaterial {...props.texture} />
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
  )
}
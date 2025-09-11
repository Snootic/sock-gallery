import type React from "react";
import { MeshObject } from "../MeshObject";
import type { Mesh } from "three";
import { useTexture } from "@react-three/drei";

interface FrameProps extends Partial<Mesh> {
  picturePath: string
}

export const Frame: React.FC<FrameProps> = ( props ) => {
  const frameTexture = useTexture({
    map: "/src/assets/textures/lamp/blue_metal_plate_diff_1k.jpg",
    aoMap: "/src/assets/textures/lamp/blue_metal_plate_arm_1k.jpg",
    roughnessMap: "/src/assets/textures/lamp/blue_metal_plate_arm_1k.jpg",
    metalnessMap: "/src/assets/textures/lamp/blue_metal_plate_arm_1k.jpg",
    normalMap: "/src/assets/textures/lamp/blue_metal_plate_nor_gl_1k.jpg",
  })

  return (
    <group name="frame">
      <MeshObject position={[props.position!.x, props.position!.y, props.position!.z - 0.1]} userData={{ componentType: "framepicture" }}>
        <boxGeometry args={[0.7, 1, 0.01]} />
        <meshLambertMaterial {...frameTexture} />
      </MeshObject>
      <MeshObject position={[props.position!.x, props.position!.y, props.position!.z + 0.05]} userData={{ componentType: "Frameback" }}>
        <boxGeometry args={[0.7, 1, 0.1]} />
        <meshLambertMaterial map={useTexture(props.picturePath!)} />
      </MeshObject>
      <MeshObject position={[props.position!.x - 0.35, props.position!.y, props.position!.z]} userData={{ componentType: "FrameBorderLeft" }}>
        <boxGeometry args={[0.05, 1, 0.2]} />
        <meshLambertMaterial {...frameTexture}/>
      </MeshObject>
      <MeshObject position={[props.position!.x + 0.35, props.position!.y, props.position!.z]} userData={{ componentType: "FrameBorderRight" }}>
        <boxGeometry args={[0.05, 1, 0.2]} />
        <meshLambertMaterial {...frameTexture}/>
      </MeshObject>
      <MeshObject position={[props.position!.x, props.position!.y + 0.5, props.position!.z]} userData={{ componentType: "FrameBorderTop" }}>
        <boxGeometry args={[0.7, 0.05, 0.2]} />
        <meshLambertMaterial {...frameTexture}/>
      </MeshObject>
      <MeshObject position={[props.position!.x, props.position!.y - 0.5, props.position!.z]} userData={{ componentType: "FrameBorderBottom" }}>
        <boxGeometry args={[0.7, 0.05, 0.2]} />
        <meshLambertMaterial {...frameTexture}/>
      </MeshObject>
    </group>
  );
};

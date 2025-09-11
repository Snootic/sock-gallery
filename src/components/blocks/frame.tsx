import type React from "react";
import { MeshObject } from "../MeshObject";
import type { Mesh } from "three";
import { useTexture, Html } from "@react-three/drei";
import { Box } from "@mui/material";
import { useState } from "react";

interface FrameProps extends Partial<Mesh> {
  picturePath: string;
}

export const Frame: React.FC<FrameProps> = (props) => {
  const [isHovered, setIsHovered] = useState(false);
  const frameTexture = useTexture({
    map: "/src/assets/textures/lamp/blue_metal_plate_diff_1k.jpg",
    aoMap: "/src/assets/textures/lamp/blue_metal_plate_arm_1k.jpg",
    roughnessMap: "/src/assets/textures/lamp/blue_metal_plate_arm_1k.jpg",
    metalnessMap: "/src/assets/textures/lamp/blue_metal_plate_arm_1k.jpg",
    normalMap: "/src/assets/textures/lamp/blue_metal_plate_nor_gl_1k.jpg",
  });

  return (
    <group name="frame">
      <MeshObject
        position={[
          props.position!.x,
          props.position!.y,
          props.position!.z - 0.1,
        ]}
        userData={{ componentType: "framepicture" }}
      >
        <boxGeometry args={[0.7, 1, 0.01]} />
        <meshLambertMaterial {...frameTexture} />
      </MeshObject>
      <MeshObject
        position={[
          props.position!.x,
          props.position!.y,
          props.position!.z + 0.05,
        ]}
        userData={{ componentType: "Frameback" }}
      >
        <boxGeometry args={[0.7, 1, 0.1]} />
        <meshLambertMaterial map={useTexture(props.picturePath!)} />
      </MeshObject>
      <mesh
        position={[
          props.position!.x,
          props.position!.y + 0.7,
          props.position!.z,
        ]}
        onPointerOver={(e) => {
          e.stopPropagation();
          setIsHovered(true);
          console.log("hihi hehe")
        }}
        onPointerOut={() => setIsHovered(false)}
      >
        <boxGeometry args={[0.8, 0.2, 0.05]} />
        <meshBasicMaterial transparent opacity={0} />
        {isHovered && (
          <Html center>
            <Box sx={{ bgcolor: "white", p: 1, borderRadius: 1, boxShadow: 2, zIndex: 2000 }}>
              <span>{props.picturePath}</span>
            </Box>
          </Html>
        )}
      </mesh>
      <MeshObject
        position={[
          props.position!.x - 0.35,
          props.position!.y,
          props.position!.z,
        ]}
        userData={{ componentType: "FrameBorderLeft" }}
      >
        <boxGeometry args={[0.05, 1, 0.2]} />
        <meshLambertMaterial {...frameTexture} />
      </MeshObject>
      <MeshObject
        position={[
          props.position!.x + 0.35,
          props.position!.y,
          props.position!.z,
        ]}
        userData={{ componentType: "FrameBorderRight" }}
      >
        <boxGeometry args={[0.05, 1, 0.2]} />
        <meshLambertMaterial {...frameTexture} />
      </MeshObject>
      <MeshObject
        position={[
          props.position!.x,
          props.position!.y + 0.5,
          props.position!.z,
        ]}
        userData={{ componentType: "FrameBorderTop" }}
      >
        <boxGeometry args={[0.7, 0.05, 0.2]} />
        <meshLambertMaterial {...frameTexture} />
      </MeshObject>
      <MeshObject
        position={[
          props.position!.x,
          props.position!.y - 0.5,
          props.position!.z,
        ]}
        userData={{ componentType: "FrameBorderBottom" }}
      >
        <boxGeometry args={[0.7, 0.05, 0.2]} />
        <meshLambertMaterial {...frameTexture} />
      </MeshObject>
    </group>
  );
};

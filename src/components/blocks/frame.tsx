import type React from "react";
import { MeshObject } from "../MeshObject";
import type { Mesh } from "three";
import { useTexture, Html } from "@react-three/drei";
import { Box } from "@mui/material";
import { useState } from "react";

interface FrameProps extends Partial<Mesh> {
  picturePath: string;
  about: string;
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
    <group name="Frame">
      <MeshObject
      position={[
        props.position?.x ?? 0,
        props.position?.y ?? 0,
        (props.position?.z ?? 0) - 0.1,
      ]}
      rotation={props.rotation}
      userData={{ componentType: "Frame", picture: props.picturePath, about: props.about }}
      >
      <mesh
        position={[0, 0, 0.06]}
        userData={{ componentType: "FrameFront" }}
        onPointerEnter={(e) => {
         e.stopPropagation();
         setIsHovered(true);
        }}
        onPointerLeave={(e) => {
        e.stopPropagation();
        setIsHovered(false);
        }}
      >
        <boxGeometry args={[0.68, 0.98, 0.01]} />
        <meshLambertMaterial map={useTexture(props.picturePath!)} transparent opacity={isHovered ? 0.8 : 0.99} />
        {isHovered && (
        <Html center>
          <Box sx={{ bgcolor: "white", p: 2, borderRadius: 2, boxShadow: 4, zIndex: 2000, width: 400, mt: 70 }}>
          <Box sx={{ width: '100%' }}>
            {props.about}
          </Box>
          </Box>
        </Html>
        )}
      </mesh>
      {/* Frame back */}
      <mesh
        position={[0, 0, 0]}
        userData={{ componentType: "FrameBack" }}
      >
        <boxGeometry args={[0.7, 1, 0.08]} />
        <meshLambertMaterial {...frameTexture} />
      </mesh>
      {/* Borders */}
      <mesh
        position={[-0.35, 0, 0.04]}
        userData={{ componentType: "FrameBorderLeft" }}
      >
        <boxGeometry args={[0.05, 1, 0.16]} />
        <meshLambertMaterial {...frameTexture} />
      </mesh>
      <mesh
        position={[0.35, 0, 0.04]}
        userData={{ componentType: "FrameBorderRight" }}
      >
        <boxGeometry args={[0.05, 1, 0.16]} />
        <meshLambertMaterial {...frameTexture} />
      </mesh>
      <mesh
        position={[0, 0.5, 0.04]}
        userData={{ componentType: "FrameBorderTop" }}
      >
        <boxGeometry args={[0.7, 0.05, 0.16]} />
        <meshLambertMaterial {...frameTexture} />
      </mesh>
      <mesh
        position={[0, -0.5, 0.04]}
        userData={{ componentType: "FrameBorderBottom" }}
      >
        <boxGeometry args={[0.7, 0.05, 0.16]} />
        <meshLambertMaterial {...frameTexture} />
      </mesh>
      </MeshObject>
    </group>
  );
};

import { SpotLight, useTexture } from "@react-three/drei";
import React, { useMemo, useRef } from "react";
import { Vector3, Object3D, SpotLight as SpotLightImpl } from "three";
import { MeshObject } from "../MeshObject";

type LampProps = {
  position: Vector3;
  target: Vector3;
  castShadow?: boolean;
  volumetric?: boolean;
};

export const Lamp: React.FC<LampProps> = ({
  position,
  target: targetPosition,
  castShadow = false,
  volumetric = false,
}) => {
  const lightRef = useRef<SpotLightImpl>(null!);

  // A single Object3D can be used as a target for the light
  const target = useMemo(() => {
    const t = new Object3D();
    t.position.copy(targetPosition);
    return t;
  }, [targetPosition]);

  const lampTextures = useTexture({
    map: "/src/assets/textures/lamp/blue_metal_plate_diff_1k.jpg",
    aoMap: "/src/assets/textures/lamp/blue_metal_plate_arm_1k.jpg",
    roughnessMap: "/src/assets/textures/lamp/blue_metal_plate_arm_1k.jpg",
    metalnessMap: "/src/assets/textures/lamp/blue_metal_plate_arm_1k.jpg",
    normalMap: "/src/assets/textures/lamp/blue_metal_plate_nor_gl_1k.jpg",
  });

  return (
    <group name="lamp">
      <primitive object={target} />
      <MeshObject position={position} userData={{ componentType: "Lamp" }}>
        <cylinderGeometry args={[0.05, 0.195, 0.4]} />
        <meshStandardMaterial {...lampTextures} />
        <mesh position={[0, -0.2, 0]} rotation={[Math.PI, 0, 0]}>
          <sphereGeometry
            args={[0.2, 10, 5, 0, 2 * Math.PI, 0, 0.5 * Math.PI]}
          />
          <meshStandardMaterial emissive="white" emissiveIntensity={10} />
          <SpotLight
            ref={lightRef}
            target={target}
            castShadow={castShadow}
            position={[0, 0, 0]}
            angle={0.5}
            distance={15}
            intensity={0.5}
            penumbra={0.5}
            decay={2}
            {...(volumetric && { volumetric })}
            {...(castShadow && {
              "shadow-mapSize": [512, 512],
              "shadow-bias": -0.0001,
              "shadow-camera-near": 0.1,
              "shadow-camera-far": 20,
            })}
          />
        </mesh>
      </MeshObject>
    </group>
  );
};

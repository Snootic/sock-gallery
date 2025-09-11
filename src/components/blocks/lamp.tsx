import { SpotLight } from "@react-three/drei";
import React, { useMemo } from "react";
import { Vector3, Object3D } from "three";
import { MeshObject } from "../MeshObject";

type LampProps = {
  position: [number, number, number] | Vector3;
};

export const Lamp: React.FC<LampProps> = ({ position }) => {
  const posArr: [number, number, number] = Array.isArray(position)
    ? position
    : [position.x, position.y, position.z];

  const target = useMemo(() => {
    const t = new Object3D();
    t.position.set(posArr[0], posArr[1] - 5, posArr[2]);
    return t;
  }, [posArr]);

  return (
    <group name="lamp">
      <primitive object={target} />
      <MeshObject position={posArr} userData={{ componentType: "Lamp" }}>
        <cylinderGeometry args={[0.05, 0.195, 0.4]} />
        <meshBasicMaterial color={"blue"} />
        <MeshObject
          position={[0, -0.2, 0]}
          rotation={[Math.PI, 0, 0]}
        >
          <sphereGeometry
            args={[0.2, 10, 5, 0, 2 * Math.PI, 0, 0.5 * Math.PI]}
          />
          <meshStandardMaterial emissive="white" emissiveIntensity={20} />
          <SpotLight
            target={target}
            castShadow
            position={[0, 0, 0]}
            radiusTop={0.2}
            radiusBottom={10}
            angle={Math.atan(80 / 5)}
            distance={70}
            intensity={0.5}
            decay={0}
            penumbra={1}
            volumetric
            shadow-mapSize={[2048, 2048]}
            shadow-bias={-0.0001}
            shadow-camera-near={1}
            shadow-camera-far={5}
          />
        </MeshObject>
      </MeshObject>
    </group>
  );
};

import React from "react";
import { Vector3 } from "three";

type LampProps = {
  position?: [number, number, number] | Vector3;
};

export const Lamp: React.FC<LampProps> = ({ position }) => {
  return (
    <>
      <mesh position={position}>
        <coneGeometry args={[1, 3, 1]} />
        <meshBasicMaterial color={"blue"} />
      </mesh>
      <spotLight
        castShadow
        position={position}
        angle={Math.atan(80 / 5)}
        distance={70}
        intensity={3}
        decay={0}
        penumbra={1}
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0001}
        shadow-camera-near={1}
        shadow-camera-far={5}
      />
    </>
  );
};
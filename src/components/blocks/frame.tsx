import type React from "react";
import { MeshObject } from "../MeshObject";
import type { Mesh } from "three";

interface FrameProps extends Mesh {
  color: string;
}

export const Frame: React.FC<FrameProps> = ({ color, ...props }) => {
  return (
    <group name="frame">
      <MeshObject {...props} userData={{ componentType: "Frame" }}>
        <boxGeometry args={[0.7, 1, 0.2]} />
        <meshLambertMaterial color={color} />
      </MeshObject>
    </group>
  );
};

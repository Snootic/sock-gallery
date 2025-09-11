import { forwardRef, type ForwardedRef } from "react";
import type { Mesh } from "three";
import { MeshObject } from "../MeshObject";
import type { Player } from "../../types";

type PlayerBodyProps = {
  playerId: string
  position: [number, number, number];
  color?: string;
  rotation?: Player["rotation"];
};

export type PlayerBody = Mesh;

export const PlayerBody = forwardRef(function PlayerBody(
  { ...props }: PlayerBodyProps,
  ref: ForwardedRef<PlayerBody>
) {
  return (
    <group name="player_body">
      <MeshObject
        ref={ref}
        position={props.position}
        quaternion={props.rotation ?? undefined}
        userData={{ componentType: "Player", id: props.playerId }}
      >
        <boxGeometry args={[1, 1.5, 0.5]} />
        <meshStandardMaterial color={props.color} />
      </MeshObject>
    </group>
  );
});

export default PlayerBody;

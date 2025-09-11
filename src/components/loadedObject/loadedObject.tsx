import { useMemo } from "react";
import type { WorldObject } from "../../types";
import * as THREE from 'three'
import { Frame, Lamp, MeshObject } from '../index'
import PlayerBody from "../player/body";

export const LoadedObject = ({ objectData }: { objectData: WorldObject }) => {
  const obj = useMemo(
    () => new THREE.ObjectLoader().parse(objectData),
    [objectData]
  ) as THREE.Mesh;

  const {
    uuid,
    geometry,
    material,
    position,
    quaternion,
    scale,
    castShadow,
    receiveShadow,
    userData,
  } = obj;
  const props = {
    geometry,
    material,
    position,
    quaternion,
    scale,
    castShadow,
    receiveShadow,
    userData,
  };

  switch (obj.userData.componentType) {
    case "Frame":
      return (
        <Frame
          key={uuid}
          {...(props as React.ComponentProps<typeof Frame>)}
          color={"blue"}
        />
      );
    case "Lamp":
      return (
        <Lamp key={uuid} {...(props as React.ComponentProps<typeof Lamp>)} />
      );
    case "Player":
      const { position: _position, ...playerProps } = props;
      return (
        <PlayerBody
          playerId={obj.userData.id}
          key={uuid}
          position={obj.position.toArray()}
          {...playerProps}
        />
      );
    default:
      return <MeshObject key={uuid} {...props} />;
  }
};
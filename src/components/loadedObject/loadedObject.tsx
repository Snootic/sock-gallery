import * as THREE from 'three'
import { Frame, Lamp } from '../index'
import PlayerBody from "../player/body";
import type { MinimalObjectData } from "../../hooks/useMeshes";
import { GalleryBox } from '../blocks';

export const LoadedObject = ({ objectData }: { objectData: MinimalObjectData }) => {
  const position = new THREE.Vector3(...objectData.position);
  const quarternion = new THREE.Quaternion(...objectData.quarternion);
  const scale = new THREE.Vector3(...objectData.scale);

  const props = {
    position,
    quarternion,
    scale,
    userData: objectData.userData,
  };

  switch (objectData.groupName) {
    case "Frame":
      return (
        <Frame
          key={objectData.group}
          picturePath={props.userData.picture}
          about={props.userData.about}
          rotation={new THREE.Euler().setFromQuaternion(quarternion)}
          position={position}
        />
      );
    case "Lamp":
      return (
        <Lamp
          key={objectData.group}
          position={position}
          target={new THREE.Vector3(...objectData.userData.target)}
          castShadow={objectData.userData.castShadow}
          volumetric={objectData.userData.volumetric}
        />
      );
    case "player_body":
      return (
        <PlayerBody
          playerId={objectData.userData.id}
          key={objectData.group}
          position={objectData.position}
          rotation={quarternion}
        />
      );
    case "GalleryBox":
        return (
          <GalleryBox/>
        )
    default:
      return (
        null
      )
  }
};
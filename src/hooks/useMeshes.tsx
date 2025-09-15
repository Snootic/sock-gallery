import { useContext, useRef, useEffect } from "react";
import type { Mesh, QuaternionTuple, Vector3Tuple } from "three";
import { MeshesContext } from "../context/meshesContext";

export function useMeshes() {
  return useContext(MeshesContext);
}

export interface MinimalObjectData {
  group: string;
  groupName: string;
  position: Vector3Tuple;
  quarternion: QuaternionTuple;
  scale: Vector3Tuple;
  userData: Record<string, any>;
}

export function useMeshesData(): MinimalObjectData[] {
  const meshes = useContext(MeshesContext).current;
  const groups = new Set<string>();
  return meshes
    .filter((mesh) => {
      const groupId = mesh.parent!.uuid;
      if (groups.has(groupId)) return false;
      groups.add(groupId);
      return true;
    })
    .map((mesh) => ({
      group: mesh.parent!.uuid,
      groupName: mesh.parent!.name,
      position: mesh.position.toArray(),
      quarternion: mesh.quaternion.toArray(),
      scale: mesh.scale.toArray(),
      userData: mesh.userData
    }));
}

export function useRegisterMesh() {
  const meshRef = useRef<Mesh>(null!);
  const meshesContextRef = useMeshes();

  useEffect(() => {
    const mesh = meshRef.current;
    if (mesh && meshesContextRef?.current) {
      meshesContextRef.current.push(mesh);
    }

    return () => {
      if (mesh && meshesContextRef?.current) {
        meshesContextRef.current = meshesContextRef.current.filter(
          (m) => m.uuid !== mesh.uuid
        );
      }
    };
  }, [meshesContextRef]);

  return meshRef;
}
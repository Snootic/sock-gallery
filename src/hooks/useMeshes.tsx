import { useContext, useRef, useEffect } from "react";
import type { Mesh } from "three";
import { MeshesContext } from "../context/meshesContext";


export function useMeshes() {
  return useContext(MeshesContext);
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
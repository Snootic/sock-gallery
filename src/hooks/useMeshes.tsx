import { useContext, useRef, useEffect } from "react";
import type { Mesh } from "three";
import { MeshesContext } from "../context/meshesContext";


export function useMeshes() {
  return useContext(MeshesContext);
}

export function useMeshesData() {
  return useContext(MeshesContext).current.map((mesh) => {
    const json = mesh.toJSON();
    if ("images" in json) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (json as any).images;
    }
    return json;
  });
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
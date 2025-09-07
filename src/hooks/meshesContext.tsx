import { createContext, useContext, useRef, useEffect } from "react";
import type { Mesh } from "three";

const MeshesContext = createContext<React.RefObject<Mesh[]>>(null!);

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

export function MeshesProvider({ children }: { children: React.ReactNode }) {
  const meshesRef = useRef<Mesh[]>([]);
  return (
    <MeshesContext.Provider value={meshesRef}>
      {children}
    </MeshesContext.Provider>
  );
}
import { useRef } from "react";
import type { Mesh } from "three";
import { MeshesContext } from "../context/meshesContext";

export function MeshesProvider({ children }: { children: React.ReactNode }) {
  const meshesRef = useRef<Mesh[]>([]);
  return (
    <MeshesContext.Provider value={meshesRef}>
      {children}
    </MeshesContext.Provider>
  );
}
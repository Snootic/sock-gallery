import { createContext } from "react";
import type { Mesh } from "three";

export const MeshesContext = createContext<React.RefObject<Mesh[]>>(null!);

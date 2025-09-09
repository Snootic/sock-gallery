import { forwardRef, type JSX } from "react";
import { useRegisterMesh } from "../../hooks/useMeshes";
import { Mesh } from "three";

export const MeshObject = forwardRef<Mesh, JSX.IntrinsicElements["mesh"]>(
  (props, ref) => {
    const internalRef = useRegisterMesh();
    return (
      <mesh
        ref={(node) => {
          (internalRef as React.RefObject<Mesh | null>).current = node;
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        {...props}
      />
    );
  }
);

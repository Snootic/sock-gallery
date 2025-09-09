import { Mesh, Vector3, Raycaster, Object3D } from "three";
import { useMeshes } from "./useMeshes";

export function useCollision() {
  const meshesRef = useMeshes();

  return (mesh: Mesh) => {
    const positionAttribute = mesh.geometry.attributes.position;
    const vector = new Vector3();
    const originPoint = mesh.position.clone();
    const collisionNormals: Vector3[] = [];

    for (let i = 0; i < positionAttribute.count; i++) {
      const localVertex = vector.fromBufferAttribute(positionAttribute, i);
      const globalVertex = localVertex.applyMatrix4(mesh.matrixWorld);
      const directionVector = globalVertex.clone().sub(originPoint);

      const ray = new Raycaster(
        originPoint,
        directionVector.clone().normalize()
      );
      const collisionResults = ray.intersectObjects(
        meshesRef.current.filter((m) => m !== mesh)
      );
      if (
        collisionResults.length > 0 &&
        collisionResults[0].distance < directionVector.length()
      ) {
        if (collisionResults[0].face && collisionResults[0].face.normal) {
          const worldNormal = collisionResults[0].face.normal.clone();
          worldNormal.transformDirection(
            (collisionResults[0].object as Object3D).matrixWorld
          );
          collisionNormals.push(worldNormal);
        }
      }
    }
    return collisionNormals;
  };
}

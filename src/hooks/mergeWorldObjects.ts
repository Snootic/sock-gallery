import type { MinimalObjectData } from "./useMeshes";

export function mergeWorldObjects(
  prev: MinimalObjectData[],
  updates: MinimalObjectData[]
): MinimalObjectData[] {
  const map = new Map(prev.map((obj) => [obj.group, obj]));
  
  updates.forEach((obj) => {
    map.set(obj.group, obj);
  });

  return Array.from(map.values());
}

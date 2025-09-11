import type { WorldObject } from "../types";

export function mergeWorldObjects(
  prev: WorldObject[],
  updates: WorldObject[]
): WorldObject[] {
  const map = new Map(prev.map((obj) => [obj.object.uuid, obj]));
  updates.forEach((obj) => {
    if (!map.has(obj.object.uuid)) {
      map.set(obj.object.uuid, obj);
    } else {
      map.set(obj.object.uuid, obj);
    }
  });

  return Array.from(map.values());
}

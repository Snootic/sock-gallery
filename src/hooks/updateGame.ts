import { useCallback, useRef } from "react";
import { useSocketContext } from "./socketProvider";
import { useMeshes } from "./useMeshes";
import type { WorldObject } from "../types";
import { useRooms } from "./useRooms";

export const useUpdateGame = () => {
  const meshesRef = useMeshes();
  const { socket, room } = useSocketContext();
  const {room: [currentRoom, setRoom]} = useRooms();
  const prevStateRef = useRef(new Map<string, unknown>());

  const sendAllWorldData = useCallback(() => {
    if (!socket) return;
    const worldObjects = meshesRef.current.map((mesh) => mesh.toJSON());
    if (worldObjects.length > 0) {
      socket.emit("world-data", worldObjects);
    }
  }, [socket, meshesRef]);

  const sendUpdatedWorldData = useCallback(() => {
    if (!socket) return;

    const updatedMeshes = meshesRef.current.filter((mesh) => {
      const prev = prevStateRef.current.get(mesh.uuid);
      const curr = mesh.toJSON();
      prevStateRef.current.set(mesh.uuid, curr);
      return !prev || JSON.stringify(prev) !== JSON.stringify(curr);
    });

    if (updatedMeshes.length > 0) {
      const worldObjects: WorldObject[] = updatedMeshes.map((mesh) => mesh.toJSON());
      socket.emit("world-data", worldObjects);
    }
  }, [socket, meshesRef]);

  return useCallback(
    (delta: number) => {
      
      const prevPlayers = prevStateRef.current.get("players") as Record<string, unknown> | undefined;
      const currPlayers = currentRoom?.players ?? {};

      const newPlayerExists = Object.keys(currPlayers).some(
        (playerId) => !prevPlayers || !(playerId in prevPlayers)
      );

      prevStateRef.current.set("players", { ...currPlayers });

      if (newPlayerExists) {
        sendAllWorldData();
        console.log('sent all')
      } else {
        console.log('sent updated only')
        sendUpdatedWorldData();
      }

    },
    [sendUpdatedWorldData, sendAllWorldData, currentRoom]
  );
};
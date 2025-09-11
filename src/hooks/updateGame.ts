import { useCallback, useRef } from "react";
import { useSocketContext } from "./socketProvider";
import { useMeshes } from "./useMeshes";
import type { WorldObject } from "../types";
import { useRooms } from "./useRooms";

export const useUpdateGame = () => {
  const meshesRef = useMeshes();
  const { socket } = useSocketContext();
  const {room: [currentRoom]} = useRooms();
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

  const sendGuestData = useCallback(() => {
    if (!socket) return;
    const updatedMeshes = meshesRef.current.filter((mesh) => {
      if (!mesh.uuid) return false;
      if (mesh.userData?.id === undefined) return false;
      const prev = prevStateRef.current.get(mesh.uuid);
      const curr = mesh.toJSON();
      prevStateRef.current.set(mesh.uuid, curr);
      return !prev || JSON.stringify(prev) !== JSON.stringify(curr);
    });

    if (updatedMeshes.length < 1) {
      return
    }

    const worldObjects = updatedMeshes.map((mesh) => mesh.toJSON());
    const playerObjects = worldObjects.filter(
      obj => obj.object &&
      obj.object.userData &&
      obj.object.userData.componentType === "Player" &&
      obj.object.userData.id === socket.id
    );

    if (playerObjects.length > 0) {
      socket.emit("player-data", playerObjects)
    }
  }, [socket, meshesRef])

  return useCallback(
    (host: boolean) => {
      
      if(host) {
        const prevPlayers = prevStateRef.current.get("players") as Record<string, unknown> | undefined;
        const currPlayers = currentRoom?.players ?? {};
  
        const newPlayerExists = Object.keys(currPlayers).some(
          (playerId) => !prevPlayers || !(playerId in prevPlayers)
        );
  
        prevStateRef.current.set("players", { ...currPlayers });
  
        if (newPlayerExists) {
          sendAllWorldData();
        } else {
          sendUpdatedWorldData();
        }
      } else {
        sendGuestData()
      }
    },
    [sendUpdatedWorldData, sendAllWorldData, currentRoom]
  );
};
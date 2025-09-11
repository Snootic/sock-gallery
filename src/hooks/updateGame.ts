import { useCallback, useRef } from "react";
import { useSocketContext } from "./socketProvider";
import { useMeshesData } from "./useMeshes";
import type { WorldObject } from "../types";
import { useRooms } from "./useRooms";
import type { Socket } from "socket.io-client";

export const useUpdateGame = () => {
  const meshesData = useMeshesData();
  const { socket } = useSocketContext();
  const {room: [currentRoom]} = useRooms();
  const prevStateRef = useRef(new Map<string, unknown>());

  const sendAllWorldData = (socket: Socket, meshesData: WorldObject[]) => {
    if (!socket) return;
    const worldObjects = meshesData;
    if (worldObjects.length > 0) {
      socket.emit("world-data", worldObjects);
    }
  };

  const sendUpdatedWorldData = (socket: Socket, meshesData: WorldObject[], prevStateRef: React.RefObject<Map<string, unknown>>) => {
    if (!socket) return;

    const updatedMeshes = meshesData.filter((mesh) => {
      const prev = prevStateRef.current.get(mesh.object.uuid);
      const curr = mesh;
      prevStateRef.current.set(mesh.object.uuid, curr);
      return !prev || JSON.stringify(prev) !== JSON.stringify(curr);
    });

    if (updatedMeshes.length > 0) {
      const worldObjects: WorldObject[] = updatedMeshes;
      socket.emit("world-data", worldObjects);
    }
  };

  const sendGuestData = (socket: Socket, meshesData: WorldObject[], prevStateRef: React.RefObject<Map<string, unknown>>) => {
    const updatedMeshes = meshesData.filter((mesh) => {
      if (!mesh.object.uuid) return false;
      if (mesh.object.userData?.id === undefined) return false;
      const prev = prevStateRef.current.get(mesh.object.uuid);
      const curr = mesh;
      prevStateRef.current.set(mesh.object.uuid, curr);
      return !prev || JSON.stringify(prev) !== JSON.stringify(curr);
    });

    if (updatedMeshes.length < 1) {
      return
    }

    const worldObjects = updatedMeshes
    const playerObjects = worldObjects.filter(
      obj => obj.object &&
      obj.object.userData &&
      obj.object.userData.componentType === "Player" &&
      obj.object.userData.id === socket.id
    );

    if (playerObjects.length > 0) {
      socket.emit("player-data", playerObjects)
    }
  }

  return useCallback(
    (host: boolean) => {
      if (!socket) return;

      if(host) {
        const prevPlayers = prevStateRef.current.get("players") as Record<string, unknown> | undefined;
        const currPlayers = currentRoom?.players ?? {};
  
        const newPlayerExists = Object.keys(currPlayers).some(
          (playerId) => !prevPlayers || !(playerId in prevPlayers)
        );
  
        prevStateRef.current.set("players", { ...currPlayers });
  
        if (newPlayerExists) {
          sendAllWorldData(socket, meshesData);
        } else {
          sendUpdatedWorldData(socket, meshesData, prevStateRef);
        }
      } else {
        sendGuestData(socket, meshesData, prevStateRef)
      }
    },
    [socket, meshesData, currentRoom]
  );
};
import { useCallback, useRef } from "react";
import { useSocketContext } from "./socketProvider";
import { useMeshesData, type MinimalObjectData } from "./useMeshes";
import { useRooms } from "./useRooms";
import type { Socket } from "socket.io-client";

export const useUpdateGame = () => {
  const meshesData = useMeshesData();
  const { socket } = useSocketContext();
  const {room: [currentRoom]} = useRooms();
  const prevStateRef = useRef(new Map<string, MinimalObjectData>());
  const prevPlayersRef = useRef<Record<string, unknown>>({});

  const sendAllWorldData = (socket: Socket, meshesData: MinimalObjectData[]) => {
    if (!socket) return;
    if (meshesData.length > 0) {
      socket.emit("world-data", meshesData);
    }
  };

  const sendUpdatedWorldData = (socket: Socket, meshesData: MinimalObjectData[], prevStateRef: React.RefObject<Map<string, MinimalObjectData>>) => {
    if (!socket) return;

    const updatedMeshes = meshesData.filter((mesh) => {
      const prev = prevStateRef.current.get(mesh.group);
      const curr = mesh;
      prevStateRef.current.set(mesh.group, curr);
      
      if (!prev) return true;
      
      return (
        prev.position.some((val, i) => Math.abs(val - curr.position[i]) > 0.001) ||
        prev.quarternion.some((val, i) => Math.abs(val - curr.quarternion[i]) > 0.001) ||
        prev.scale.some((val, i) => Math.abs(val - curr.scale[i]) > 0.001) ||
        JSON.stringify(prev.userData) !== JSON.stringify(curr.userData)
      );
    });

    if (updatedMeshes.length > 0) {
      socket.emit("world-data", updatedMeshes);
    }
  };

  const sendGuestData = (socket: Socket, meshesData: MinimalObjectData[], prevStateRef: React.RefObject<Map<string, MinimalObjectData>>) => {
    const updatedMeshes = meshesData.filter((mesh) => {
      if (!mesh.group) return false;
      if (mesh.userData?.id === undefined) return false;
      
      const prev = prevStateRef.current.get(mesh.group);
      const curr = mesh;
      prevStateRef.current.set(mesh.group, curr);
      
      if (!prev) return true;
      
      return (
        prev.position.some((val, i) => Math.abs(val - curr.position[i]) > 0.001) ||
        prev.quarternion.some((val, i) => Math.abs(val - curr.quarternion[i]) > 0.001)
      );
    });

    if (updatedMeshes.length < 1) {
      return;
    }

    const playerObjects = updatedMeshes.filter(
      obj => obj.groupName === "Player" && obj.userData.id === socket.id
    );

    if (playerObjects.length > 0) {
      socket.emit("player-data", playerObjects);
    }
  };

  return useCallback(
    (host: boolean) => {
      if (!socket) return;

      if(host) {
        const prevPlayers = prevPlayersRef.current;
        const currPlayers = currentRoom?.players ?? {};

        const newPlayerExists = Object.keys(currPlayers).some(
          (playerId) => !(playerId in prevPlayers)
        );

        prevPlayersRef.current = { ...currPlayers };

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
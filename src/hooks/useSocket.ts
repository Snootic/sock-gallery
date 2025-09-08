import { useEffect, useRef, useState } from "react";
import type { Socket } from "socket.io-client";
import { io } from "socket.io-client";
import type { Player as PlayerData, Room } from "../types";

export const useSocket = (roomId?: string) => {
  const socketRef = useRef<Socket | null>(null);
  const [room, setRoom] = useState<Room | undefined>(undefined);
  const [players, setPlayers] = useState<PlayerData[]>([]);

  useEffect(() => {
    socketRef.current = io('http://localhost:3001');
    const socket = socketRef.current;

    if (roomId) {
      socket.emit("join-room", roomId);

      socket.on("not-found", ({ roomId }) => {
        console.log("Room not found", roomId);
      });

      socket.on("joined-room", ({ room }) => {
        console.log("Joined room:", room);
        setRoom(room);
      });
    } else {
      const roomName = "My Gallery Room";

      socket.emit("create-room", roomName);
      
      socket.on("room-created", ({ room }) => {
        console.log("Room created:", room);
        setRoom(room);
      });
    }

    socket.on("user-joined", ({ userId }) => {
      console.log("joined:", userId);
    });

    socket.on("user-disconnected", ({ userId }) => {
      console.log("user disconnected", userId);
    });

    socket.on("player-moved", (playerData) => {
      setPlayers((prevPlayers) => {
        const existingIndex = prevPlayers.findIndex(
          (p) => p.id === playerData.id
        );
        if (existingIndex !== -1) {
          const updatedPlayers = [...prevPlayers];
          updatedPlayers[existingIndex] = playerData;
          return updatedPlayers;
        }
        return [...prevPlayers, playerData];
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return { socket: socketRef.current, room, players };
};

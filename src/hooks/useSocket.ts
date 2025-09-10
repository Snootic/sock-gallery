import { useEffect, useRef, useState } from "react";
import type { Socket } from "socket.io-client";
import { io } from "socket.io-client";
import type { Room, WorldObject } from "../types";
import { signalingServer } from "../constants/server";
import { useRooms } from "./useRooms";

export const useSocket = (roomId?: string) => {
  const socketRef = useRef<Socket | null>(null);
  const { room: [currentRoom, setRoom] } = useRooms();
  const [worldObjects, setWorldObjects] = useState<WorldObject[]>([]);
  const roomJoinedRef = useRef(false);

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io(signalingServer);
    }

    const socket = socketRef.current;

    if (roomId && !roomJoinedRef.current) {
      roomJoinedRef.current = true;
      socket.emit("join-room", roomId);

      socket.on("not-found", ({ roomId }) => {
        console.log("Room not found", roomId);
      });

      socket.on("joined-room", ({ room }) => {
        console.log("Joined room:", room);
        setRoom(room);
      });
    } else if (!roomJoinedRef.current) {
      roomJoinedRef.current = true;
      const roomName = "My Gallery Room";
      socket.emit("create-room", roomName);

      socket.on("room-created", ({ room }) => {
        console.log("Room created:", room);
        setRoom(room);
      });
    }

    const handleUserJoined = ({ userId, room }: { userId: string, room: Room }) => {
      console.log("user joined", userId);
      setRoom(room)
    };

    const handleUserDisconnected = ({ userId, room }: { userId: string, room: Room }) => {
      console.log("user disconnected", userId);
      setRoom(room)
    };

    const handleWorldData = (newWorldObjects: WorldObject[]) => {
      setWorldObjects(newWorldObjects);
    };

    socket.on("user-joined", handleUserJoined);
    socket.on("user-disconnected", handleUserDisconnected);
    socket.on("world-data", handleWorldData);

    return () => {
      socket.off("user-joined", handleUserJoined);
      socket.off("user-disconnected", handleUserDisconnected);
      socket.off("world-data", handleWorldData);
    };
  }, [roomId]);

  return { socket: socketRef.current, room: currentRoom, worldObjects };
};

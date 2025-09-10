import { createContext, useContext } from "react";
import type { Socket } from "socket.io-client";
import type { Room, WorldObject } from "../types";

export interface SocketContextProps {
  socket: Socket | null;
  room?: Room;
  worldObjects: WorldObject[];
}

export const SocketContext = createContext<SocketContextProps>(null!);

export function useSocketContext() {
  return useContext(SocketContext);
}
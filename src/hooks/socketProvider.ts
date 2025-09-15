import { createContext, useContext } from "react";
import type { Socket } from "socket.io-client";
import type { Room } from "../types";
import type { MinimalObjectData } from "./useMeshes";

export interface SocketContextProps {
  socket: Socket | null;
  room?: Room;
  worldObjects: MinimalObjectData[];
}

export const SocketContext = createContext<SocketContextProps>(null!);

export function useSocketContext() {
  return useContext(SocketContext);
}
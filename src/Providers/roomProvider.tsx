import { useState } from "react";
import { RoomContext, RoomListContext } from "../context/roomContext";
import type { Room } from "../types";

export function RoomProvider({ children }: { children: React.ReactNode }) {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [currentRoom, setCurrentRoom] = useState<Room>(null!);
  return (
    <RoomListContext.Provider value={[rooms, setRooms]}>
      <RoomContext.Provider value={[currentRoom, setCurrentRoom]}>
        {children}
      </RoomContext.Provider>
    </RoomListContext.Provider>
  );
}

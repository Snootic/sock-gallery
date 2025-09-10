import { useContext } from "react";
import { RoomContext, RoomListContext } from "../context/roomContext";

export function useRooms() {
  const roomList = useContext(RoomListContext);
  const room = useContext(RoomContext);
  return {
    roomList,
    room
  };
}
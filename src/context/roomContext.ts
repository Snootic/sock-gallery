import { createContext } from "react";
import type { Room } from "../types";

export const RoomListContext = createContext<[Room[], React.Dispatch<React.SetStateAction<Room[]>>]>(null!);
export const RoomContext = createContext<[Room, React.Dispatch<React.SetStateAction<Room>>]>(null!);

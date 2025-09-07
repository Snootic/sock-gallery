import {type Player} from "./player"

export type Room = {
  id: string,
  name: string,
  hostId: string,
  players: Player[]
}
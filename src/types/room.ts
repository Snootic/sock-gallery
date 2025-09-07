import {type Player} from "./player"

export type Room = {
  id: string,
  name: string,
  host: Player,
  players: Player[]
}
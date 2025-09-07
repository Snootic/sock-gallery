import type { Socket } from "socket.io";
import { RoomRepository } from "../repository/room.repository";
// @ts-ignore
import { Room } from '@types'

export class RoomService {
  private repository: RoomRepository;

  constructor() {
    this.repository = new RoomRepository()
  }

  async getAll() {
    await this.repository.getAll();
  }

  async createRoom(roomName: string, host: Socket) {
    const generateId = () => {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let result = '';
      for (let i = 0; i < 12; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return result;
    };

    const roomId = generateId();

    const room: Room = {
      id: roomId,
      name: roomName,
      host: { id: host.id },
      players: [{ id: host.id }]
    }

    await this.repository.save(roomId, room);

    return room;
  }

  async getRoom(roomId: string): Promise<Room | null> {
    return await this.repository.getById(roomId);
  }

  async getAllRooms(): Promise<Room[]> {
    return this.repository.getAll()
  }

  async setPlayer(player: Socket, room: Room) {
    room.players.push({id: player.id})

    await this.repository.save(room.id, room)

    return room
  }

  async findPeerRoom(player: Socket): Promise<Room | null> {
    const rooms = await this.repository.getAll()

    for (const room of rooms) {
      if (room.players.some((p: Room['host']) => p.id === player.id)) {
        return room;
      }
    }

    return null;
  }

  async removePlayer(player: Socket, room: Room) {
    let idx = room.players.length

    while (idx--) {
      if (room.players[idx].id === player.id) {
        room.players.splice(idx, 1);
        break;
      }
    }

    if (room.players.length < 1) {
      await this.repository.remove(room.id)
    } else {
      await this.repository.save(room.id, room)
    }

    return room
  }
}
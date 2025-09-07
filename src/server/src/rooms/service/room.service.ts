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
      hostId: host.id,
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
}
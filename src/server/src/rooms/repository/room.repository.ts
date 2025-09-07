import Redis from "ioredis";

export class RoomRepository {
  private client: Redis;

  constructor() {
    this.client = new Redis();
  }

  async getAll(): Promise<object[]> {
    const keys = await this.client.keys("*");
    const rooms = await this.client.mget(...keys);
    return rooms
      .filter((room) => room !== null)
      .map((room) => JSON.parse(room as string));
  }

  async save(roomId: string, room: object): Promise<void> {
    await this.client.set(roomId, JSON.stringify(room));
  }

  async getById(roomId: string): Promise<object | null> {
    const data = await this.client.get(roomId);
    return data ? JSON.parse(data) : null;
  }

}

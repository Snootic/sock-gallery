import { Server as SocketIOServer } from 'socket.io';
import http from 'http';
import { RoomService } from '../rooms/service/room.service';

export class IOServer {
  private io: SocketIOServer
  private roomService: RoomService

  constructor(server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>) {
    this.io = new SocketIOServer(server, {
      cors: {
        origin: "*",
      },
    });
    this.roomService = new RoomService()
  }

  init() {
    this.io.on('connection', (socket) => {      
      socket.on('create-room', async (roomName: string) => {
        const room = await this.roomService.createRoom(roomName, socket);
        socket.join(room.id);
        socket.emit('room-created', { room });
      });

      socket.on('join-room', async (roomId: string) => {
        const room = await this.roomService.getRoom(roomId);

        if (!room) {
          return socket.emit('not-found', {roomId})
        }

        socket.join(roomId);
        socket.to(roomId).emit('user-joined', { userId: socket.id });
        socket.emit('joined-room', { room });
        
      });

      socket.on('offer', ({ target, caller, sdp }) => {
        this.io.to(target).emit('offer', { caller, sdp });
      });

      socket.on('answer', ({ target, sdp }) => {
        this.io.to(target).emit('answer', sdp);
      });

      socket.on('ice-candidate', ({ target, candidate }) => {
        this.io.to(target).emit('ice-candidate', candidate);
      });
    });
  }

}
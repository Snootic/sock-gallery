import { Socket, Server as SocketIOServer } from 'socket.io';
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
        await this.handleCreateRoom(socket, roomName)
      });

      socket.on('join-room', async (roomId: string) => {
        await this.handleJoinRoom(socket, roomId)
      });

      socket.on('disconnect', async () => {
        await this.handleDisconnection(socket);
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

  private async handleCreateRoom(socket: Socket, roomName: string) {
    const room = await this.roomService.createRoom(roomName, socket);
    socket.join(room.id);
    socket.emit('room-created', { room });
  }

  private async handleJoinRoom(socket: Socket, roomId: string) {
    let room = await this.roomService.getRoom(roomId);

    if (!room) {
      return socket.emit('not-found', {roomId})
    }

    socket.join(roomId);
    room = await this.roomService.setPlayer(socket, room);
    socket.to(roomId).emit('user-joined', { userId: socket.id });

    return socket.emit('joined-room', { room });
  }

  private async handleDisconnection(socket: Socket) {
    let room = await this.roomService.findPeerRoom(socket);

    if (!room) {
      return socket.emit('not-found-peer', { userId: socket.id })
    }
    socket.leave(room.id);
    room = await this.roomService.removePlayer(socket, room);
    socket.to(room.id).emit('user-disconnected', { userId: socket.id });
    
    return socket.emit('joined-room', { room });
  }
}
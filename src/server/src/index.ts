import express from 'express';
import cors from 'cors'
import http from 'http';
import { IOServer } from './io/handleIoConnections';
import { RoomService } from './rooms/service/room.service';

const app = express();
const server = http.createServer(app);
const io = new IOServer(server)
const roomService = new RoomService()
const PORT = 3001;

io.init()

app.use(cors())

app.get('/rooms', async (_req, res) => {
  const rooms = await roomService.getAllRooms()
  res.json(rooms);
});

server.listen(PORT, () => console.log(`Signaling server is running on port ${PORT}`));
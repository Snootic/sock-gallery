import { Canvas } from '@react-three/fiber'
import { useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { Box, Container } from '@mui/material';
import { useTheme, type Theme } from '@mui/material/styles';
import type {Room} from  '../../types'


function Gallery() {
  const theme = useTheme();
  const styles = getStyles(theme)

  const { roomId } = useParams();
  const socketRef = useRef<Socket | null>(null);
  const [room, setRoom] = useState<Room | undefined>(undefined)

  useEffect(() => {
    socketRef.current = io('http://localhost:3001');
    if (roomId) {
      socketRef.current.emit('join-room', roomId);

      socketRef.current.on('not-found', ({ roomId }) => {
        console.log('Room not found', roomId)
      })

      socketRef.current.on('joined-room', ({ roomId }) => {
        console.log('Joined room:', roomId);
        setRoom(room)
      });
      
    } else {
      const roomName = 'My Gallery Room';
      socketRef.current.emit('create-room', roomName);
      socketRef.current.on('room-created', ({ room }) => {
        console.log('Room created:', room);
        setRoom(room)
      });
    }

    return () => {
      socketRef.current?.disconnect();
    };
    
  }, []);


  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on('user-joined', ({userId}) => {
        console.log("joined:", userId)
      });
    }
  }, [socketRef]);

  return (
    <Box component="main">
      <Container sx={styles.ui}>
        <Box>
          Current Room: {room?.id}
        </Box>
      </Container>
      <Canvas>

      </Canvas>
    </Box>
  )
}

const getStyles = (theme: Theme) => ({
  ui: {
    position: "absolute",
    top: 0
  }
})

export default Gallery
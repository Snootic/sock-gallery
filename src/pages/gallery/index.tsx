import { MeshesProvider } from '../../hooks/meshesContext';
import { Canvas } from '@react-three/fiber'
import { useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { Box, Container } from '@mui/material';
import { useTheme, type Theme } from '@mui/material/styles';
import type {Room} from  '../../types'
import { Player, MeshObject } from '../../components'

function Gallery() {
  const theme = useTheme();
  const styles = getStyles(theme)

  const { roomId } = useParams();
  const socketRef = useRef<Socket | null>(null);
  const canvasRef = useRef(null)
  const [room, setRoom] = useState<Room | undefined>(undefined)

  useEffect(() => {
    socketRef.current = io('http://localhost:3001');
    if (roomId) {
      socketRef.current.emit('join-room', roomId);

      socketRef.current.on('not-found', ({ roomId }) => {
        console.log('Room not found', roomId)
      })

      socketRef.current.on('joined-room', ({ room }) => {
        console.log('Joined room:', room);
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

      socketRef.current.on('user-disconnected', ({userId}) => {
        console.log("user disconnected", userId)
      })
    }
  }, [socketRef]);

  return (
    <Box component="main">
      <Container sx={styles.ui}>
        <Box>
          Current Room: {room ? room.id : "..."}
        </Box>
      </Container>
      <MeshesProvider>
        <Canvas ref={canvasRef} style={styles.canvas} onClick={() => {canvasRef.current? canvasRef.current.requestPointerLock() : null}}>
          <ambientLight intensity={Math.PI / 2} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
          <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
          <Player position={[0,0,0]}/>
            <MeshObject position={[2, 0, 2]}>
              <boxGeometry args={[1,1,1]}/>
              <meshStandardMaterial color="#ff0000" />
            </MeshObject>
          <MeshObject rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
            <planeGeometry args={[50, 50]} />
            <meshStandardMaterial color="#e0e0e0" />
          </MeshObject>
        </Canvas>
      </MeshesProvider>
    </Box>
  )
}

const getStyles = (_theme: Theme) => ({
  ui: {
    position: "absolute",
    top: 0,
    userSelect: "none"
  },
  canvas: {
    height: '100vh',
    width: '100vw'
  }
})

export default Gallery
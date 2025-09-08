import { MeshesProvider } from '../../hooks/meshesContext';
import { Canvas } from '@react-three/fiber'
import { useParams } from 'react-router-dom';
import { useRef } from 'react';
import { Box, Container } from '@mui/material';
import { useTheme, type Theme } from '@mui/material/styles';
import { Player, MeshObject } from '../../components'
import { useSocket } from '../../hooks/useSocket';

function Gallery() {
  const theme = useTheme();
  const styles = getStyles(theme)
  const { roomId } = useParams();
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const {socket, room, players} = useSocket(roomId)

  return (
    <Box component="main">
      <Container sx={styles.ui}>
        <Box>
          Current Room: {room ? room.id : "..."}
        </Box>
      </Container>
      <MeshesProvider>
        <Canvas
          ref={canvasRef}
          style={styles.canvas}
          onClick={() => {
            if (canvasRef.current) {
              canvasRef.current.requestPointerLock();
            }
          }}
        >
          <ambientLight intensity={Math.PI / 2} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
          <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
          {socket?.id &&
            <Player id={socket.id as string} position={[0,0,0]} socket={socket}/>
          }
          {Object.entries(players).map(([id, playerData]) => (
            <Player key={id} id={id} position={playerData.position} socket={null}/>
          ))}
          <MeshObject rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
            <planeGeometry args={[50, 50]} />
            <meshStandardMaterial color="#e0e0e0" />
          </MeshObject>
        </Canvas>
      </MeshesProvider>
    </Box>
  )
}

const getStyles = (theme: Theme) => ({
  ui: {
    position: "absolute",
    top: 0,
    userSelect: "none",
    color: theme.palette.text.primary
  },
  canvas: {
    height: '100vh',
    width: '100vw'
  }
})

export default Gallery
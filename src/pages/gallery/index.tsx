import { MeshesProvider } from "../../hooks/meshesProvider";
import { Canvas } from "@react-three/fiber";
import { useParams } from "react-router-dom";
import { useRef } from "react";
import { Box, Container } from "@mui/material";
import { useTheme, type Theme } from "@mui/material/styles";
import { Player, MeshObject } from "../../components";
import { useSocket } from "../../hooks/useSocket";
import PlayerBody from "../../components/player/body";
import { Frame, Lamp } from "../../components/blocks";
import type { Socket } from "socket.io-client";
import type { Player as PlayerType } from "../../types";

const SceneContent = ({
  socket,
  players,
}: {
  socket: Socket;
  players: PlayerType[];
}) => {

  const sceneBox = [
    {
      // chao
      rotation: [-Math.PI / 2, 0, 0],
      position: [0, -0.5, 0],
      geometry: [50, 50],
      color: "red",
    },
    {
      //teto
      rotation: [-Math.PI / 2, 0, 0],
      position: [0, 6, 0],
      geometry: [50, 50],
      color: "blue",
    },
    {
      rotation: [0, -Math.PI / 2, 0],
      position: [25, 2, 0],
      geometry: [50, 12],
      color: "green",
    },
    {
      rotation: [0, Math.PI / 2, 0],
      position: [-25, 2, 0],
      geometry: [50, 12],
      color: "yellow",
    },
    {
      rotation: [0, Math.PI, 0],
      position: [0, 2, 25],
      geometry: [50, 12],
      color: "pink",
    },
    {
      rotation: [0, 0, Math.PI],
      position: [0, 2, -25],
      geometry: [50, 12],
      color: "orange",
    },
  ];

  return (
    <>
      <group name={"scene-box"}>
        {sceneBox.map((props, idx) => (
          <MeshObject
            key={idx}
            rotation={props.rotation as [number, number, number]}
            position={props.position as [number, number, number]}
          >
            <planeGeometry args={props.geometry as [number, number, number]} />
            <meshStandardMaterial color={props.color} />
          </MeshObject>
        ))}
      </group>
      <ambientLight intensity={0.5} />
      <Lamp position={[0,3,0]} />
      {socket?.id && (
        <Player id={socket.id as string} position={[0, 0, 0]} socket={socket} />
      )}
      {Object.entries(players).map(([id, playerData]) => (
        <PlayerBody key={id} position={playerData.position} />
      ))}

      <Frame color={"blue"} position={[0, 0.5, 0]} />
    </>
  );
};

function Gallery() {
  const theme = useTheme();
  const styles = getStyles(theme);
  const { roomId } = useParams();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const { socket, room, players } = useSocket(roomId);

  return (
    <Box component="main">
      <Container sx={styles.ui}>
        <Box>Current Room: {room ? room.id : "..."}</Box>
      </Container>
      <MeshesProvider>
        <Canvas
          id="canvas"
          ref={canvasRef}
          style={styles.canvas}
          onClick={() => {
            if (canvasRef.current) {
              canvasRef.current.requestPointerLock();
            }
          }}
          shadows={"soft"}
        >
          <SceneContent socket={socket!} players={players} />
        </Canvas>
      </MeshesProvider>
    </Box>
  );
}

const getStyles = (theme: Theme) => ({
  ui: {
    position: "absolute",
    zIndex: 100,
    top: 0,
    // userSelect: "none",
    color: theme.palette.text.primary,
  },
  canvas: {
    height: "100vh",
    width: "100vw",
  },
});

export default Gallery;

import { MeshesProvider } from "../../Providers/meshesProvider";
import { Canvas } from "@react-three/fiber";
import { useParams } from "react-router-dom";
import { useRef } from "react";
import { Box, Container } from "@mui/material";
import { useTheme, type Theme } from "@mui/material/styles";
import { useSocket } from "../../hooks/useSocket";
import { HostScene } from "./host";
import { GuestScene } from "./guest";
import { SocketContext } from "../../hooks/socketProvider";

function Gallery() {
  const theme = useTheme();
  const styles = getStyles(theme);
  const { roomId } = useParams();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const socketState = useSocket(roomId);

  return (
    <Box component="main">
      <Container sx={styles.ui}>
          <Box sx={{ fontWeight: "bold" }}>Session Info</Box>
          <Box>
            <strong>Room:</strong>{" "}
            {socketState.room ? socketState.room.id : <span style={{ color: "#888" }}>Loading...</span>}
          </Box>
          <Box>
            <strong>User ID:</strong>{" "}
            {socketState.socket ? socketState.socket.id : <span style={{ color: "#888" }}>Loading...</span>}
          </Box>
      </Container>
      <MeshesProvider>
        <SocketContext.Provider value={socketState}>
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
            {roomId ? <GuestScene /> : <HostScene />}
          </Canvas>
        </SocketContext.Provider>
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

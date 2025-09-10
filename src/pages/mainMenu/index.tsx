import React, { useEffect } from "react";
import { Button, InputBase, Box } from "@mui/material";
import { GameSelect } from "../../components";
import type { Room } from "../../types";
import { useTheme, type Theme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { signalingServer } from "../../constants/server";
import { useRooms } from "../../hooks/useRooms";

export default function MainMenu() {
  const [showRoomsVisible, setShowRoomsVisible] = React.useState(false);
  const [host, setHost] = React.useState<string>("");
  const { roomList: [rooms, setRooms], room: [room, setRoom] } = useRooms();
  const navigate = useNavigate();

  const handleShowRooms = () => {
    setShowRoomsVisible(!showRoomsVisible);
  };

  const theme = useTheme();
  const styles = getStyles(theme);

  const handleJoinRoom = () => {
    if (!host && !room) {
      console.log("NONE");
      return null;
    }

    navigate(`/gallery/${host || room}`);
  };

  useEffect(() => {
    fetch(`${signalingServer}/rooms`)
      .then((res) => res.json())
      .then((data) => (Array.isArray(data) ? setRooms(data) : setRooms([])))
      .catch(() => setRooms([]));
  }, []);

  useEffect(() => {
    handleJoinRoom();
  }, [room]);

  return (
    <Box component="main" sx={styles.main}>
      <Box component="div" sx={styles.menu}>
        <Button
          variant="contained"
          onClick={() => navigate("/gallery")}
          sx={{ width: "50%" }}
        >
          Host a Gallery
        </Button>
        <Button
          variant="contained"
          onClick={handleShowRooms}
          sx={{ width: "50%" }}
        >
          Join a Gallery
        </Button>
        {showRoomsVisible && (
          <Box
            component="div"
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "50%",
              gap: "5px",
            }}
          >
            <Box
              component="div"
              sx={{ display: "flex", flexDirection: "row", gap: 1 }}
            >
              <InputBase
                placeholder="Game Code"
                value={host}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setHost(e.target.value)
                }
              />
              <Button
                variant="contained"
                onClick={() => handleJoinRoom()}
                sx={{ width: "35%" }}
              >
                Join
              </Button>
            </Box>
            <GameSelect
              values={rooms}
              selectedValue={room}
              setSelectedvalue={setRoom}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
}

const getStyles = (theme: Theme) => ({
  menu: {
    width: "400px",
    height: "400px",
    flexDirection: "column",
    borderRadius: "8px",
    border: "1px solid #00dfae",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: `linear-gradient(160deg, ${theme.palette.background.paper} 20%, ${theme.palette.green.dark} 90%)`,
    backdropFilter: "blur(100px)",
    gap: "10px",
  },
  main: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
  },
});

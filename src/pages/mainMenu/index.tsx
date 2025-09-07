import React, {useEffect} from "react";
import { Button, InputBase, Box } from "@mui/material";
import { GameSelect } from "../../components";
import type { Room } from "../../types";
import { useTheme, type Theme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

export default function MainMenu() {
  const [showRoomsVisible, setShowRoomsVisible] = React.useState(false);
  const [host, setHost] = React.useState<string>("");

  const navigate = useNavigate();

  const handleShowRooms = () => {
    setShowRoomsVisible(!showRoomsVisible);
  };

  const theme = useTheme();
  const styles = getStyles(theme)

  const [games, setGames] = React.useState<Room[]>([]);
  const [selectedGame, setSelectedGame] = React.useState<
    Room["id"] | undefined
  >(undefined);


  useEffect(() => {
    fetch("http://localhost:3001/rooms")
      .then(res => res.json())
      .then(data => Array.isArray(data) ? setGames(data) : setGames([]))
      .catch(() => setGames([]));
  }, [])

  const handleJoinRoom = () => {
    if (!host) {
      return null
    }

    navigate(`/gallery/${host}`)
  }

  return (
    <Box component="main" sx={styles.main}>
      <Box
        component="div"
        sx={styles.menu}
      >
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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setHost(e.target.value)}
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
              values={games}
              selectedValue={selectedGame}
              setSelectedvalue={setSelectedGame}
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
    background: `linear-gradient(160deg, ${theme.palette.background.paper} 20%, ${theme.palette.background.deepGreen} 90%)`,
    backdropFilter: 'blur(100px)',
    gap: "10px",
  },
  main: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
  }
});
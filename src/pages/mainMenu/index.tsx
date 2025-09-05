import React from "react";
import { Button, InputBase, Box } from "@mui/material";
import { GameSelect } from "../../components";
import type { Host } from "../../types";
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

  const [games, setGames] = React.useState<Host[]>([]);
  const [selectedGame, setSelectedGame] = React.useState<
    Host["address"] | undefined
  >(undefined);

  React.useEffect(() => {
    setGames([
      { address: "host1", name: "Gallery One" },
      { address: "host2", name: "Gallery Two" },
      { address: "host3", name: "Gallery Three" },
    ]);
  }, []);

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
                onChange={(e) => setHost(e.target.value)}
              />
              <Button
                variant="contained"
                onClick={() => null}
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
    backgroundColor: theme.palette.background.paper,
    gap: "10px",
  },
  main: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
  }
});
import { useState, useMemo, StrictMode } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { getTheme } from "./constants/theme";
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainMenu from "./pages/mainMenu";
import Gallery from './pages/gallery'
import IconButton from "@mui/material/IconButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

function App() {
  const [mode, setMode] = useState<"light" | "dark">("dark");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(() => getTheme(mode), [mode]);

    
  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainMenu />,
    },
    {
      path: '/gallery',
      element: <Gallery />,
    },
    {
      path: '/gallery/:roomId',
      element: <Gallery />,
    },
  ])

  return (
    <StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div style={{ position: "absolute", top: 16, right: 16 }}>
          <IconButton
            sx={{ ml: 1 }}
            onClick={colorMode.toggleColorMode}
            color="inherit"
          >
            {theme.palette.mode === "dark" ? (
              <Brightness7Icon />
            ) : (
              <Brightness4Icon />
            )}
          </IconButton>
        </div>
        <RouterProvider router={router} />
      </ThemeProvider>
    </StrictMode>
  );
}

export default App;

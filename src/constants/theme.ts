import { createTheme, type ThemeOptions, type Theme } from "@mui/material/styles";

const commonSettings: ThemeOptions = {
    components: {
        MuiButton: {
            styleOverrides: {
                root: ({ theme }: { theme: Theme }) => ({
                    background: `linear-gradient(130deg, ${theme.palette.green.main} 40%, ${theme.palette.green.light} 60%)`,
                    boxShadow:
                        "0 2px 8px rgba(0, 0, 0, 0.18), 0 0 24px 4px rgba(0,255,255,0.12)",
                    borderRadius: "8px",
                    padding: "2px",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                    position: "relative",
                    overflow: "hidden",
                    transition: "border-color 0.35s",
                    color: theme.palette.text.primary,
                    border: `2px solid ${theme.palette.input.border}`,
                    "&:hover": {
                        background: `linear-gradient(130deg, ${theme.palette.green.light} 40%, ${theme.palette.green.main} 60%)`,
                        border: `2px solid ${theme.palette.info.main}`,
                    },
                }),
            },
        },
        MuiInputBase: {
            styleOverrides: {
                root: ({ theme }: { theme: Theme }) => ({
                    background: theme.palette.input.main,
                    color: theme.palette.text.primary,
                    borderRadius: "8px",
                    border: `2px solid ${theme.palette.input.border}`,
                    paddingLeft: "6px",
                    "&:hover": {
                        background: theme.palette.background.default,
                        color: theme.palette.text.secondary,
                        border: `2px solid ${theme.palette.success.main}`,
                    },
                }),
            },
        }
    },
};

export const getTheme = (mode: "light" | "dark") => {
  const theme = createTheme({
    palette: {
      mode,
      ...(mode === "dark"
        ? {
            background: {
              default: "#242424",
              paper: "#2f4f4f"
            },
            input: {
              main: "#1c2b2bff",
              hover: "#2a3f3fff",
              border: "#7e7e7eff"
            },
            info: {
              main: "#5c04ff",
            },
            text: {
              primary: "#e0e0e0",
              secondary: "#ffffff",
            },
            green: {
              light: "#00dfae",
              main: "#078f5b",
              dark: "#035338"
            }
          }
        : {
            background: {
              default: "#ffffff",
              paper: "#f5f5f5",
            },
            input: {
              main: "#e0f7fa",
              hover: "#a8b6b8ff",
              border: "#7e7e7eff"
            },
            info: {
              main: "#5c04ff",
            },
            text: {
              primary: "#000000",
              secondary: "#242424",
            },
            green: {
              light: "#00dfae",
              main: "#078f5b",
              dark: "#035338"
            }
          }),
    },
    ...commonSettings,
  });
  return theme;
};

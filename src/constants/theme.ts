import { createTheme, type ThemeOptions } from "@mui/material/styles";

const commonSettings: ThemeOptions = {
    components: {
        MuiButton: {
            styleOverrides: {
                root: ({ theme }) => ({
                    background: `linear-gradient(130deg, ${theme.palette.primary.main} 40%, ${theme.palette.secondary.main} 60%)`,
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
                    border: `2px solid ${theme.palette.custom.inputBorder}`,
                    "&:hover": {
                        background: `linear-gradient(130deg, ${theme.palette.secondary.main} 40%, ${theme.palette.success.main} 60%)`,
                        border: `2px solid ${theme.palette.info.main}`,
                    },
                }),
            },
        },
        MuiInputBase: {
            styleOverrides: {
                root: ({ theme }) => ({
                    background: theme.palette.custom.input,
                    color: theme.palette.text.primary,
                    borderRadius: "8px",
                    border: `2px solid ${theme.palette.custom.inputBorder}`,
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
              paper: "#2f4f4f",
            },
            custom: {
              input: "#1c2b2bff",
              inputHover: "#2a3f3fff",
              inputBorder: "#7e7e7eff"
            },
            primary: {
              main: "#035338", // dark-green
            },
            secondary: {
              main: "#078f5b", // mid-green
            },
            info: {
              main: "#5c04ff", // indigo
            },
            success: {
              main: "#00dfae", // light-green
            },
            text: {
              primary: "#e0e0e0",
              secondary: "#ffffff",
            },
          }
        : {
            background: {
              default: "#ffffff",
              paper: "#f5f5f5",
            },
            custom: {
              input: "#e0f7fa",
              inputBorder: "#7e7e7eff"
            },
            primary: {
              main: "#078f5b", // mid-green
            },
            secondary: {
              main: "#035338", // dark-green
            },
            info: {
              main: "#5c04ff", // indigo
            },
            success: {
              main: "#00dfae", // light-green
            },
            text: {
              primary: "#000000",
              secondary: "#242424",
            },
          }),
    },
    ...commonSettings,
  });
  return theme;
};

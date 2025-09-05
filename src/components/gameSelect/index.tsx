import type React from "react";
import type { Host } from "../../types";
import {Box} from "@mui/material"
import { useTheme, type Theme } from "@mui/material/styles";

type SelectProps = {
  values: Host[]
  selectedValue: Host['address'] | undefined
  setSelectedvalue: React.Dispatch<React.SetStateAction<Host['address'] | undefined>>
}

export const GameSelect: React.FC<SelectProps> = (props) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <Box component='div' sx={styles.select}>
      {props.values.map((host) => (
        <Box
          component='div'
          key={host.address}
          sx={{
            ...styles.option,
            "&:hover": styles.optionHover,
          }}
          onClick={() => props.setSelectedvalue(host.address)}
        >
          {host.name} [{host.address}]
        </Box>
      ))}
    </Box>
  );
};

const getStyles = (theme: Theme) => ({
  select: {
    display: "flex",
    position: "relative",
    flexDirection: "column",
    boxSizing: "border-box",
    width: "192px",
    borderRadius: "8px",
    backgroundColor: theme.palette.custom.input,
  },
  option: {
    cursor: "pointer",
    backgroundColor: theme.palette.custom.input,
    color: theme.palette.text.primary,
    textAlign: "center",
    borderRadius: "8px",
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: theme.palette.custom.input,
    transition: "border-color 0.35s",
    padding: "4px",
  },
  optionHover: {
    backgroundColor: theme.palette.custom.inputHover,
    color: theme.palette.text.primary,
    borderColor: theme.palette.success.main,
  },
});
import type React from "react";
import type { Room } from "../../types";
import {Box} from "@mui/material"
import { useTheme, type Theme } from "@mui/material/styles";

type SelectProps = {
  values: Room[]
  selectedValue: Room
  setSelectedvalue: React.Dispatch<React.SetStateAction<Room>>
}

export const GameSelect: React.FC<SelectProps> = (props) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <Box component='div' sx={styles.select}>
      {props.values.map((host) => (
        <Box
          component='div'
          key={host.id}
          sx={{
            ...styles.option,
            "&:hover": styles.optionHover,
          }}
          onClick={() => props.setSelectedvalue(host)}
        >
          {host.name} [{host.id}]
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
    backgroundColor: theme.palette.input.main,
    maxHeight: "180px",
    overflowY: "auto"
  },
  option: {
    cursor: "pointer",
    backgroundColor: theme.palette.input.main,
    color: theme.palette.text.primary,
    textAlign: "center",
    borderRadius: "8px",
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: theme.palette.input.main,
    transition: "border-color 0.35s",
    padding: "4px",
  },
  optionHover: {
    backgroundColor: theme.palette.input.hover,
    color: theme.palette.text.primary,
    borderColor: theme.palette.success.main,
  },
});
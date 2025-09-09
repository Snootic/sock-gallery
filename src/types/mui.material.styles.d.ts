import type {} from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    green: Palette['primary'];
    input: Palette['primary'] & { border: string; hover: string };
  }

  interface PaletteOptions {
    green?: PaletteOptions['primary'];
    input?: PaletteOptions['primary'] & { border?: string; hover?: string };
  }

  interface PaletteColor {
    hover?: string;
    border?: string;
  }

  interface SimplePaletteColorOptions {
    hover?: string;
    border?: string;
  }
}
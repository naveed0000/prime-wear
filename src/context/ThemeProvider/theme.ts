import { createTheme } from "@mui/material/styles";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin-ext"],
});

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: `
      *{
        transition: color 0.15s ease, background-color 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease;
      },
      html{
        font-size: 14px;
      },
      .gm-style iframe + div { border:none !important; },
      `,
    },
    MuiLink: {
      styleOverrides: {
        root: {
          fontWeight: 600,
        },
      },
      defaultProps: {
        underline: "none",
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          height: 2,
        },
      },
    },
    MuiContainer: {
      defaultProps: {
        maxWidth: "xl",
      },
    },
    MuiButton: {
      defaultProps: {
        disableRipple: true,
        disableElevation: true,
      },
    },
  },
  typography: {
    fontFamily: `${poppins.style.fontFamily}`,
  },
  palette: {
    primary: {
      dark: "#275d4c",
      main: "#479f8a",
      light: "#56bca6",
    },
    secondary: {
      main: "#eb5181",
      light: "#fbe5fd",
      100: "#f396b5",
    },
    common: {
      white: "#ffffff",
      black: "#000000",
    },
    grey: {
      50: "#f5f5f5",
      100: "#ebebeb",
      200: "#e4e4e4",
      300: "#c2c2c2",
      400: "#5c5c5c",
      500: "#333333",
    },
  },
});

export default theme;

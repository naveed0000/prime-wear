import { createTheme } from "@mui/material/styles";
import {  Cairo, Solway } from "next/font/google";

// const inter = Inter({
//   subsets: ["latin"], // or "latin-ext" if needed
//   weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], // optional
//   variable: "--font-inter", // optional CSS variable
// });

// const comfortaa = Comfortaa({
//   subsets: ["latin"], // required
//   weight: ["300", "400", "500", "600", "700"], // optional: choose weights
// });
const cairo = Cairo({
  subsets: ["arabic", "latin"], // include subsets you need
  weight: ["300", "400", "500", "600", "700", "800", "900"], // choose weights
  variable: "--font-cairo", // optional CSS variable
});

const solway = Solway({
  subsets: ["latin"], // choose subsets needed
  weight: ["300", "400","500","700"], // choose weights you need
  variable: "--font-solway", // optional CSS variable
});

const theme = createTheme({
  // components: {
  //   MuiCssBaseline: {
  //     styleOverrides: `
  //     *{
  //       transition: color 0.15s ease, background-color 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease;
  //     },
  //     html{
  //       font-size: 14px;
  //     },
  //     .gm-style iframe + div { border:none !important; },
  //     `,
  //   },
  //   MuiLink: {
  //     styleOverrides: {
  //       root: {
  //         fontWeight: 600,
  //       },
  //     },
  //     defaultProps: {
  //       underline: "none",
  //     },
  //   },
  //   MuiLinearProgress: {
  //     styleOverrides: {
  //       root: {
  //         height: 2,
  //       },
  //     },
  //   },
  //   // MuiContainer: {
  //   //   defaultProps: {
  //   //     maxWidth: "xl",
  //   //   },
  //   // },
  //   MuiButton: {
  //     defaultProps: {
  //       disableRipple: true,
  //       disableElevation: true,
  //     },
  //   },
  // },
  typography: {
    // fontFamily: `${comfortaa.style.fontFamily} ${inter.style.fontFamily}`,
    fontFamily: `${solway.style.fontFamily}`,
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

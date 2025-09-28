"use client";
import { Box, CssBaseline, GlobalStyles } from "@mui/material";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { PropsWithChildren } from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import theme from "./theme";

function ThemeProvider({
  children,
}: PropsWithChildren<{
  isRtl?: boolean;
}>) {
  return (
    <AppRouterCacheProvider
      options={{
        key: "csa",
      }}
    >
      <MuiThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <GlobalStyles
            styles={{
              ":root": {
                "--bg-gradiant":
                  "-webkit-linear-gradient(45deg, hsla(0, 0%, 100%, 1) 6%, hsla(219, 100%, 95%, 1) 100%)",
              },
            }}
          />
          <CssBaseline />
          <Box component={"body"} bgcolor={"white"} suppressHydrationWarning>
            {children}
          </Box>
        </LocalizationProvider>
      </MuiThemeProvider>
    </AppRouterCacheProvider>
  );
}
export default ThemeProvider;

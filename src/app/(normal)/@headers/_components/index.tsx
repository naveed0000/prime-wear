"use client";

import { Box, Stack, Typography } from "@mui/material";
import React from "react";
const Navbar = () => {
  return (
    <Stack sx={{ height: 60, flexDirection: "row", justifyContent: "space-between" }}>
      {/* <Box>
        <TextField variant="outlined" size="small" />
      </Box> */}
      <Box>
        <Typography variant="h5" fontWeight={"bold"}>
          Logo
        </Typography>
      </Box>
      {/* <Box sx={{ position: "relative", width: "auto", height: "auto", aspectRatio: "16/9" }}>
        <Image fill src={Logo.src} alt="logo" style={{ objectFit: "contain" }} />
      </Box> */}
      <Box>sdf</Box>
    </Stack>
  );
};

export default Navbar;

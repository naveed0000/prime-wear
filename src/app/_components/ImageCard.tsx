import { Box } from "@mui/material";
import Image from "next/image";
import React from "react";
import ImageOne from "@/assets/heroSection/SliderImage1.jpg";

export default function ImageCard() {
  return (
    <Box>
      <Box sx={{ width: "100%", height: "100%", maxHeight: 400, maxWidth: 300 }}>
        <Image src={ImageOne.src} alt="SliderImage1" width={300} height={400} />
      </Box>
    </Box>
  );
}

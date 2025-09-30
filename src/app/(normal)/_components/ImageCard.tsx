"use client";

import { Box, Grid } from "@mui/material";
import Image, { StaticImageData } from "next/image";
import React from "react";

interface ImageCardProps {
  image: StaticImageData;
}
export default function ImageCard({ image }: ImageCardProps) {
  return (
    <Box>
      <Box
        sx={{
          width: "auto",
          position: "relative",
          aspectRatio: "4/5",
        }}
      >
        <Image
          src={image?.src}
          priority
          alt="SliderImage1"
          fill
          sizes="
          (min-width: 1200px) 23vw,
          (min-width: 1000px) 30vw,
          (min-width: 600px) 75vw,
          100vw
          "
          style={{ objectFit: "contain" }}
        />
      </Box>
    </Box>
  );
}

"use client";

import React from "react";
import Image from "next/image";

import { Box, Grid } from "@mui/material";
import HeroSwiper from "./HeroSwiper";
import products from "@/seed/ProductData";
export default function HeroSection() {
  return (
    <Grid
      container
      sx={{
        width: "100%",
        height: "100%",
        marginBlockEnd: 5,
      }}
    >
      <Grid size={12}>
        <HeroSwiper
          autoplay
          items={products}
          renderItem={(item) => {
            return (
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  paddingBlock: { xs: 1, sm: 2.5, md: 5, lg: 5 },
                  // paddingInline: { xs: 1, sm: 2.5, md: 5, lg: 5 },
                }}
              >
                <Image
                  src={item?.image?.src}
                  alt="SliderImage1"
                  width={item?.image?.width}
                  height={item?.image?.height}
                  style={{
                    maxHeight: "100%", // prevent overflow
                    maxWidth: "100%",
                    objectFit: "unset", // maintain aspect ratio
                    objectPosition: "center",
                  }}
                />
              </Box>
            );
          }}
        />
      </Grid>
    </Grid>
  );
}

import React from "react";
import ImageCard from "./ImageCard";
import { Grid, Typography } from "@mui/material";
import ImageOne from "@/assets/128.webp";
export default function MostPopularSection() {
  const images = [ImageOne, ImageOne, ImageOne, ImageOne];
  return (
    <Grid container spacing={1.5}>
      <Grid size={12}>
        <Typography variant="h3" sx={{ fontWeight: "bold", textAlign: "center" }}>
          Most Popular
        </Typography>
        <Typography variant="body1" sx={{ textAlign: "center" }}>
          Check this out→
        </Typography>
      </Grid>

      <Grid container size={12} spacing={1.5} justifyContent={"center"}>
        {images.map((image, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <ImageCard key={index} image={image} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}

import { Avatar, Box, Stack, Typography } from "@mui/material";
import React from "react";
import collectionSlider from "@/json/CollectionSlider";

export default function CollectionSlider() {
  return (
    <Stack
      sx={{
        flexDirection: "row",
        overflowX: "auto",
        justifyContent: "space-evenly",
        paddingBlock: 1.5,
        "&::-webkit-scrollbar": { display: "none" }, // hides scrollbar
      }}
    >
      {collectionSlider.map((collect) => (
        <Box
          key={collect.id}
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
            minWidth: 100,
            gap: 1,
            width: "fit-content",
            flexGrow: 1,
          }}
        >
          <Avatar
            alt={collect.name}
            src={collect.image.src}
            sx={{
              width: { xs: 55, sm: 65, md: 75, lg: 100, xl: 100 }, // responsive width
              height: { xs: 55, sm: 65, md: 75, lg: 100, xl: 100 }, // responsive height
            }}
          />
          <Typography
            variant="subtitle1"
            sx={{
              fontSize: "clamp(0.75rem, 1.5vw, 1.8rem)",
              fontWeight: 700,
              textAlign: "center",
              textWrap: "wrap",
              textTransform: "uppercase",
            }}
          >
            {collect.name}
          </Typography>
        </Box>
      ))}
    </Stack>
  );
}

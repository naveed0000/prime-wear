"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { SwiperProps } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Box, IconButton } from "@mui/material";

interface HeroSwiperProps<T> extends Omit<SwiperProps, "children"> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
}

export default function HeroSwiper<T>({ items, renderItem, ...swiperProps }: HeroSwiperProps<T>) {
  return (
    <Box
      sx={{
        width: "100%",
        // responsive heights
        height: {
          xs: 200, // mobile
          sm: 300, // tablets
          md: 400, // small laptops
          lg: 500, // desktops
        },
        position: "relative", // important for absolute nav buttons
      }}
    >
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        slidesPerView={1} // single slide per view
        spaceBetween={20}
        navigation={{
          prevEl: ".custom-prev",
          nextEl: ".custom-next",
        }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        style={{
          width: "100%",
          height: "100%", // fixed height for all slides
        }}
        {...swiperProps}
      >
        {items.map((item, index) => (
          <SwiperSlide
            key={index}
            style={{
              height: "auto",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {renderItem(item, index)}
          </SwiperSlide>
        ))}
      </Swiper>
      {/* Custom Navigation Buttons */}
      <IconButton
        className="custom-prev"
        sx={{
          position: "absolute",
          top: "50%",
          zIndex: 10000,
          left: { xs: 4, sm: 10, md: 20 }, // responsive left spacing
          transform: "translateY(-50%)",
          color: "#fff",
          backgroundColor: "rgba(0,0,0,0.4)",
          width: { xs: 28, sm: 36, md: 44 }, // responsive button size
          height: { xs: 28, sm: 36, md: 44 },
          "&:hover": { backgroundColor: "rgba(0,0,0,0.6)" },
          "& svg": {
            fontSize: { xs: "0.9rem", sm: "1rem", md: "1.25rem" }, // responsive icon size
          },
        }}
      >
        <ArrowBackIos />
      </IconButton>

      <IconButton
        className="custom-next"
        sx={{
          position: "absolute",
          top: "50%",
          zIndex: 10000,
          right: { xs: 4, sm: 10, md: 20 }, // responsive right spacing
          transform: "translateY(-50%)",
          color: "#fff",
          backgroundColor: "rgba(0,0,0,0.4)",
          width: { xs: 28, sm: 36, md: 44 },
          height: { xs: 28, sm: 36, md: 44 },
          "&:hover": { backgroundColor: "rgba(0,0,0,0.6)" },
          "& svg": {
            fontSize: { xs: "0.9rem", sm: "1rem", md: "1.25rem" },
          },
        }}
      >
        <ArrowForwardIos />
      </IconButton>
    </Box>
  );
}

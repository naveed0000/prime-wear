"use client";

import React, { createContext, useContext, useState } from "react";

// Define possible modes for clarity and TS safety
type SwiperDisplayMode = "auto" | "grid" | "swiper" | "fallback";

// 1. Create the context with default value
const SwiperModeContext = createContext<{
  mode: SwiperDisplayMode;
  setMode: (mode: SwiperDisplayMode) => void;
}>({
  mode: "fallback", // Default to fallback
  setMode: () => {},
});

/**
 * SwiperModeProvider is a React context provider that tracks the current
 * display mode (swiper, grid, fallback) for the Swiper section.
 *
 * Why? So that any component (navigation, header, etc.) can access and react
 * to the current display mode, without prop drilling or tight coupling!
 */
export function SwiperModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<SwiperDisplayMode>("fallback");
  return (
    <SwiperModeContext.Provider value={{ mode, setMode }}>{children}</SwiperModeContext.Provider>
  );
}

// Hook for easy access
export const useSwiperMode = () => useContext(SwiperModeContext);

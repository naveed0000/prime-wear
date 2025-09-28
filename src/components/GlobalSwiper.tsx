"use client";

import React from "react";
import { Alert, Breakpoint, GridSize, Grid as MuiGrid } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid as SwiperGrid, Navigation } from "swiper/modules";
import type { SwiperProps } from "swiper/react";
// import "swiper/css"; // base styles
// import "swiper/css/grid"; // grid styles
import "swiper/css";
import "swiper/css/grid";
import { useSwiperMode } from "@/context/SwiperModeProvider";
import { SwiperOptions } from "swiper/types";
// import ShowMessage from "./ShowMessage";

// Possible display modes (keep in sync with SwiperModeContext type)
type TGlobalSwiperDisplay = "auto" | "grid" | "swiper" | "fallback";

type SwiperBreakpoints = NonNullable<SwiperOptions["breakpoints"]>;

type ResponsiveStyleValue<T> = T | Array<T | null> | { [key in Breakpoint]?: T | null };

type GlobalSwiperProps<T> = {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  display?: TGlobalSwiperDisplay;
  gridRows?: number;
  swiperProps?: Omit<SwiperProps, "children">;
  breakpoints?: SwiperBreakpoints;
  navigationClasses?: { next: string; prev: string };
  fallbackGridSizes?: ResponsiveStyleValue<GridSize>;
  emptyState?: React.ReactNode;
};

/**
 * Utility to get the effective slidesPerView for the current window width,
 * considering Swiper's breakpoints object. Fallbacks to static slidesPerView if no breakpoints match.
 */
function getCurrentSlidesPerView(
  slidesPerView: number | undefined,
  breakpoints: SwiperBreakpoints | undefined
): number {
  if (typeof window === "undefined") return slidesPerView || 1; // SSR-safe default
  if (!breakpoints) return slidesPerView || 1;

  const width = window.innerWidth;
  // Find the largest breakpoint not greater than current width
  let matched = slidesPerView || 1;
  Object.entries(breakpoints).forEach(([point, config]) => {
    if (width >= Number(point) && typeof config.slidesPerView === "number") {
      matched = config.slidesPerView;
    }
  });
  return matched;
}

/**
 * A highly flexible and generic Swiper/Grid component for displaying a collection of items.
 *
 * Supports three display modes: Swiper carousel, grid layout, or a simple fallback grid,
 * with intelligent auto-switching based on item count and configuration.
 *
 * @template T The type of items to display.
 *
 * @param props.items - The array of items to render.
 * @param props.renderItem - Function to render each item.
 * @param props.display - Display mode: 'auto' (default), 'swiper', or 'grid'.
 * @param props.gridRows - Number of rows in grid mode (default: 2).
 * @param props.swiperProps - Additional props to pass to the Swiper component.
 * @param props.breakpoints - Swiper breakpoints for responsive slidesPerView.
 * @param props.navigationClasses - CSS selectors for custom navigation buttons.
 * @param props.fallbackGridSizes - Grid size mapping for fallback grid mode.
 * @param props.emptyState - Optional React node to display when items is empty.
 *
 * @returns A Swiper, grid, or fallback grid component displaying the provided items.
 *
 * @remarks
 * - Automatically falls back to grid or simple grid if Swiper/grid is not feasible.
 * - Handles empty state gracefully.
 * - Integrates with Swiper's Navigation and Grid modules.
 */
function GlobalSwiper<T>({
  items,
  renderItem,
  display = "auto",
  gridRows = 2,
  swiperProps = {},
  breakpoints,
  navigationClasses = {
    next: ".swiper-button-next",
    prev: ".swiper-button-prev",
  },
  fallbackGridSizes = { xs: 12, sm: 6, md: 4, lg: 3 },
  emptyState = null,
}: GlobalSwiperProps<T>) {
  const totalItems = items.length;
  const defaultBreakpoints: SwiperBreakpoints = {
    640: { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
    1280: { slidesPerView: 4 },
  };
  const bp = breakpoints || defaultBreakpoints;

  // -- Get responsive slidesPerView (accounts for breakpoints!) --
  const [currentSlidesPerView, setCurrentSlidesPerView] = React.useState(
    typeof swiperProps.slidesPerView === "number"
      ? swiperProps.slidesPerView
      : getCurrentSlidesPerView(undefined, bp)
  );

  React.useEffect(() => {
    // Update slidesPerView on resize or prop change
    function handleResize() {
      setCurrentSlidesPerView(
        getCurrentSlidesPerView(
          typeof swiperProps.slidesPerView === "number" ? swiperProps.slidesPerView : undefined,
          swiperProps.breakpoints || bp
        )
      );
    }
    window.addEventListener("resize", handleResize);
    handleResize(); // Call once on mount
    return () => window.removeEventListener("resize", handleResize);
  }, [swiperProps.slidesPerView, swiperProps.breakpoints, bp]);

  // Enhanced swiper props with custom navigation
  const finalSwiperProps = {
    ...swiperProps,
    navigation: {
      nextEl: navigationClasses.next,
      prevEl: navigationClasses.prev,
      // class to show the disable styles in navigation component
      disabledClass: "swiper-button-disabled",
    },
    // automatically manage navigation state
    watchOverflow: true,
  };

  // Calculate if grid mode is feasible

  /**
   * Helper: Is grid feasible?
   * - Returns true if there are enough items for a full grid page + 1 (so navigation makes sense)
   */
  function isGridFeasible() {
    return totalItems >= currentSlidesPerView * gridRows + 1;
  }

  /**
   * Helper: Is swiper feasible?
   * - Returns true if there are enough items for a swipe (full view + 1 extra)
   */
  function isSwiperFeasible() {
    return totalItems >= currentSlidesPerView + 1;
  }

  // Decide mode with intelligent fallback
  let mode: TGlobalSwiperDisplay = display;

  if (display === "auto") {
    mode = isSwiperFeasible() ? "swiper" : "fallback";
  } else if (display === "grid") {
    if (isGridFeasible()) {
      mode = "grid";
    } else if (isSwiperFeasible()) {
      // Not enough items for grid, fallback to swiper (not Grid!)
      mode = "swiper";
    } else {
      // Not enough items for swiper, fallback to fallback (not swiper!)
      mode = "fallback";
    }
  } else if (display === "swiper") {
    mode = isSwiperFeasible() ? "swiper" : "fallback";
  }

  // We set the mode in context so other components (like navigation)
  // can know the current display mode and update themselves accordingly.
  const { setMode } = useSwiperMode();
  React.useEffect(() => {
    setMode(mode);
  }, [mode, setMode]);

  if (totalItems === 0) {
    return emptyState ? <>{emptyState}</> : <Alert severity="error">No Data Found</Alert>;
  }

  // Handle grid mode with loop warning fix
  if (mode === "grid") {
    // Disable loop for grid mode
    const gridProps = {
      ...finalSwiperProps,
      loop: false,
    };

    return (
      <Swiper
        modules={[Navigation, SwiperGrid]}
        spaceBetween={20}
        grid={{ rows: gridRows, fill: "row" }}
        breakpoints={bp}
        {...gridProps}
      >
        {items.map((item, idx) => (
          <SwiperSlide
            key={idx}
            style={{
              height: "auto",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {renderItem(item)}
          </SwiperSlide>
        ))}
      </Swiper>
    );
  }

  if (mode === "swiper") {
    return (
      <Swiper modules={[Navigation]} spaceBetween={20} breakpoints={bp} {...finalSwiperProps}>
        {items.map((item, idx) => (
          <SwiperSlide
            key={idx}
            style={{
              justifyContent: "center",
              display: "flex",
              height: "auto",
            }}
          >
            {renderItem(item)}
          </SwiperSlide>
        ))}
      </Swiper>
    );
  }

  // Fallback: just a Grid container (for 0 or 1 item)
  return (
    <MuiGrid size={12} container justifyContent="center" spacing={2}>
      {items.map((item, idx) => (
        <MuiGrid key={idx} size={fallbackGridSizes}>
          {renderItem(item)}
        </MuiGrid>
      ))}
    </MuiGrid>
  );
}

export default GlobalSwiper;

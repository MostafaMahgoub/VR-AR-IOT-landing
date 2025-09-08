/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { useTheme } from "next-themes";
import clsx from "clsx";

type Variant = "solid" | "outline";
type Size = "sm" | "md" | "lg";

type StarBorderProps<T extends React.ElementType> =
  React.ComponentPropsWithoutRef<T> & {
    as?: T;
    className?: string;
    children?: React.ReactNode;

    /** Glow color in light mode (CSS color) */
    color?: string;
    /** Glow color in dark mode (falls back to `color` if not provided) */
    colorDark?: string;

    /** Animation duration, e.g. "6s" or 6000 */
    speed?: React.CSSProperties["animationDuration"];
    /** Border “halo” thickness (px). This is the outer padding that reveals the glow. */
    thickness?: number;

    /** Corner radius (px) for both outer container and inner chip */
    radius?: number;

    /** Prebuilt looks that match the screenshot */
    variant?: Variant;

    /** Padding presets */
    size?: Size;

    /** Disable the moving glow without changing padding */
    disableGlow?: boolean;

    /** Override the inner content chip classes completely */
    contentClassName?: string;
  };

const sizeToPadding: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-2.5 text-[15px]",
  lg: "px-4 sm:px-8 py-1.5 text-sm sm:text-base",
};

const StarBorder = <T extends React.ElementType = "button">({
  as,
  className = "",
  color = "rgba(255,255,255,0.7)",
  colorDark,
  speed = "6s",
  thickness = 1,
  radius = 9999,
  variant = "solid",
  size = "lg",
  disableGlow = false,
  contentClassName,
  children,
  ...rest
}: StarBorderProps<T>) => {
  const Component = as || "button";
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const glow = isDark ? (colorDark ?? color) : color;
  const r = `${radius}px`;

  // Defaults that match the screenshot
  const presetClasses =
    variant === "solid"
      ? // Get Started: white fill, dark text
        "bg-[#000] text-white shadow-sm " +
        "hover:shadow-md active:translate-y-[0.5px] " +
        "dark:bg-white dark:text-[#000] dark:border-white/80"
      : // Learn More: transparent, soft border, muted text
        "bg-white text-[#000] border border-[#000]/20 flex gap-2 " +
        "hover:border-[#000]/30 hover:text-[#000] " +
        "dark:text-gray-400 dark:border-white/15 dark:hover:border-white/25 dark:hover:text-gray-100";

  return (
    <Component
      className={clsx("relative inline-block overflow-hidden", className)}
      {...(rest as any)}
      style={{
        padding: thickness > 0 ? `${thickness}px 0` : 0,
        borderRadius: r,
        ...(rest as any).style,
      }}
    >
      {/* moving glow - bottom */}
      {!disableGlow && thickness > 0 && (
        <div
          className="pointer-events-none absolute w-[300%] h-[50%] opacity-70 bottom-[-11px] right-[-250%] animate-star-movement-bottom z-0"
          style={{
            background: `radial-gradient(circle, ${glow}, transparent 10%)`,
            animationDuration: speed,
            borderRadius: r,
          }}
        />
      )}

      {/* moving glow - top */}
      {!disableGlow && thickness > 0 && (
        <div
          className="pointer-events-none absolute w-[300%] h-[50%] opacity-70 top-[-10px] left-[-250%] animate-star-movement-top z-0"
          style={{
            background: `radial-gradient(circle, ${glow}, transparent 10%)`,
            animationDuration: speed,
            borderRadius: r,
          }}
        />
      )}

      {/* Inner chip */}
      <div
        className={
          contentClassName ??
          clsx(
            "relative z-[1] inline-flex items-center justify-center rounded-[inherit] transition",
            sizeToPadding[size],
            presetClasses
          )
        }
        style={{ borderRadius: r }}
      >
        {children}
      </div>
    </Component>
  );
};

export default StarBorder;

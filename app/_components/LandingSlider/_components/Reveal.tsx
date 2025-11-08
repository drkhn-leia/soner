// Reveal.tsx
"use client";
import { HTMLAttributes, ReactNode, CSSProperties } from "react";
import clsx from "clsx";
import { useIntersectOnce } from "@/app/_hooks/useIntersectOnce";

type Direction = "up" | "down" | "left" | "right";

type Props = {
  children: ReactNode;
  as?: keyof JSX.IntrinsicElements;
  direction?: Direction;
  delayMs?: number;
  durationMs?: number; // 🔑 yeni
  once?: boolean;
} & HTMLAttributes<HTMLElement>;

export default function Reveal({
  children,
  as: Tag = "div",
  direction = "up",
  delayMs = 0,
  durationMs,
  once = true,
  className,
  style,
  ...rest
}: Props) {
  const { ref, visible } = useIntersectOnce<HTMLElement>({ once });

  const mergedStyle: CSSProperties = {
    ...style,
    ["--rv-delay" as any]: `${delayMs}ms`,
    ...(durationMs != null
      ? { ["--rv-duration" as any]: `${durationMs}ms` }
      : {}),
  };

  return (
    <Tag
      ref={ref}
      style={mergedStyle}
      className={clsx(
        "reveal-base",
        direction === "up" && "reveal-up",
        direction === "down" && "reveal-down",
        direction === "left" && "reveal-left",
        direction === "right" && "reveal-right",
        visible && "reveal-visible",
        className
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}

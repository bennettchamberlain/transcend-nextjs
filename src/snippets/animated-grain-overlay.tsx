"use client";

import { useEffect, useRef } from "react";

interface AnimatedGrainOverlayProps {
  className?: string;
  /** Alpha (0-255) of each grain speck. */
  alpha?: number;
  /** Milliseconds between frame swaps - lower is more "alive" but busier. */
  frameMs?: number;
}

function makeNoiseFrame(alpha: number): string {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return "";
  }

  canvas.width = 200;
  canvas.height = 200;

  const imageData = ctx.createImageData(canvas.width, canvas.height);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const noise = Math.random() * 255;
    data[i] = noise;
    data[i + 1] = noise;
    data[i + 2] = noise;
    data[i + 3] = alpha;
  }

  ctx.putImageData(imageData, 0, 0);
  return canvas.toDataURL();
}

// A handful of pre-rendered noise frames, cycled on an interval to read as
// moving film grain / video static rather than a flat, still texture.
export function AnimatedGrainOverlay({ className = "", alpha = 22, frameMs = 90 }: AnimatedGrainOverlayProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const frames = Array.from({ length: 6 }, () => makeNoiseFrame(alpha));
    let index = 0;

    container.style.backgroundRepeat = "repeat";
    container.style.backgroundSize = "200px 200px";
    container.style.backgroundImage = `url(${frames[0]})`;

    const interval = setInterval(() => {
      index = (index + 1) % frames.length;
      container.style.backgroundImage = `url(${frames[index]})`;
    }, frameMs);

    return () => clearInterval(interval);
  }, [alpha, frameMs]);

  return <div ref={containerRef} className={`pointer-events-none absolute inset-0 ${className}`} />;
}

export default AnimatedGrainOverlay;

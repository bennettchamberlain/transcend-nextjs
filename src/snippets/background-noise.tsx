"use client";

import { useEffect, useRef } from "react";

interface BackgroundNoiseProps {
  className?: string;
  /** Alpha (0-255) of each grain speck. Defaults to a subtle 30, matching the footer/nav. */
  alpha?: number;
}

// Static TV-grain texture, matching the footer's noise effect.
function applyGrainTexture(container: HTMLDivElement, alpha: number) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return;
  }

  canvas.width = 200;
  canvas.height = 200;

  const imageData = ctx.createImageData(canvas.width, canvas.height);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const noise = Math.random() * 50;
    data[i] = noise;
    data[i + 1] = noise;
    data[i + 2] = noise;
    data[i + 3] = alpha;
  }

  ctx.putImageData(imageData, 0, 0);
  container.style.backgroundImage = `url(${canvas.toDataURL()})`;
  container.style.backgroundRepeat = "repeat";
  container.style.backgroundSize = `${canvas.width}px ${canvas.height}px`;
}

export function BackgroundNoise({ className = "", alpha = 30 }: BackgroundNoiseProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    applyGrainTexture(container, alpha);
  }, [alpha]);

  return <div ref={containerRef} className={`pointer-events-none absolute inset-0 z-0 ${className}`} />;
}

export default BackgroundNoise;

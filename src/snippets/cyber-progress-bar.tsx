"use client";

import { useRouter } from "next/router";
import React, { useCallback, useEffect, useRef, useState } from "react";

interface CyberProgressBarProps {
  color?: string;
  className?: string;
  size?: number;
  type?: 1 | 2 | 3 | 4;
}

const CyberProgressBar: React.FC<CyberProgressBarProps> = ({
  color = "#dcff07",
  className = "",
  size = 60,
  type = 1,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const isInitialMount = useRef(true);
  const router = useRouter();

  const center = size / 2;
  const radius = (size * 1.5) / 2;

  // Utility functions
  const r = (circumference: number) => circumference / (2 * Math.PI);
  const s = (circumference: number, count: number, w: number = 5, spaceAfter?: boolean) => {
    const res = [w, circumference / count - w];
    return spaceAfter ? [circumference / count - w, w] : res;
  };

  // Animation timing function
  const timingFunc = (t: number) => {
    // Smooth easing function for more natural animation
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  };

  // Additional easing function for even smoother animations
  const smoothEasing = (t: number) => {
    // Ease-out function that starts fast and slows down
    return 1 - (1 - t) ** 3;
  };

  const animateType1 = useCallback(
    (easedProgress: number) => {
      const c12 = svgRef.current?.querySelector("#c12") as SVGElement;
      if (!c12) {
        return;
      }

      const currentRadius = radius + 60 * easedProgress;
      const rotation = easedProgress * 360;

      c12.setAttribute("r", r(currentRadius).toString());
      c12.setAttribute("stroke-dasharray", s(currentRadius, 4, 5).join(","));
      c12.setAttribute("transform", `rotate(${rotation - 5 * (2 / 3)}, ${center}, ${center})`);
    },
    [radius, center],
  );

  const animateType2 = useCallback(
    (easedProgress: number) => {
      const c22 = svgRef.current?.querySelector("#c22") as SVGElement;
      const c23 = svgRef.current?.querySelector("#c23") as SVGElement;
      if (!c22 || !c23) {
        return;
      }

      const currentRadius = radius * 0.93 - 30 * easedProgress;
      const radiusDiff = Math.abs(currentRadius - radius * 0.93);
      const rotation = easedProgress * 360;

      c22.setAttribute("r", r(currentRadius).toString());
      c22.setAttribute("stroke-dasharray", (currentRadius / 4).toString());
      c22.setAttribute("transform", `rotate(-${radiusDiff * 3 + rotation}, ${center}, ${center})`);

      c23.setAttribute("stroke-width", (radiusDiff * 0.2).toString());
      c23.setAttribute("transform", `rotate(${radiusDiff * 3 * 2 + rotation * 2}, ${center}, ${center})`);
    },
    [radius, center],
  );

  const animateType3 = useCallback(
    (easedProgress: number) => {
      const elements = {
        c31: svgRef.current?.querySelector("#c31") as SVGElement,
        c33: svgRef.current?.querySelector("#c33") as SVGElement,
        c36: svgRef.current?.querySelector("#c36") as SVGElement,
        c38: svgRef.current?.querySelector("#c38") as SVGElement,
        c34: svgRef.current?.querySelector("#c34") as SVGElement,
        c35: svgRef.current?.querySelector("#c35") as SVGElement,
      };

      if (!elements.c31 || !elements.c33) {
        return;
      }

      const v = easedProgress * 100;
      const rotation = easedProgress * 360;

      elements.c31.setAttribute("r", r(radius + v).toString());
      elements.c31.setAttribute("stroke-dasharray", `${(radius + v) / 3}, ${(radius + v) * (2 / 3)}`);

      elements.c33.setAttribute("r", r(radius * 0.87 + v / 2).toString());
      elements.c33.setAttribute("stroke-width", (14 + v / 6).toString());

      elements.c36.setAttribute("r", r(radius + v).toString());
      elements.c36.setAttribute("stroke-dasharray", `${(radius + v) / 3}, ${(radius + v) * (2 / 3)}`);

      elements.c38.setAttribute("r", r(radius * 0.87 + v / 2).toString());
      elements.c38.setAttribute("stroke-width", (14 + v / 6).toString());

      elements.c34.setAttribute("transform", `rotate(-${v * 3.6 + rotation}, ${center}, ${center})`);
      elements.c35.setAttribute("r", r(40 + v).toString());
    },
    [radius, center],
  );

  const animateType4 = useCallback(
    (easedProgress: number) => {
      const c71 = svgRef.current?.querySelector("#c71") as SVGElement;
      const c74 = svgRef.current?.querySelector("#c74") as SVGElement;
      if (!c71 || !c74) {
        return;
      }

      const v = easedProgress * 100;
      const rotation = easedProgress * 360;

      c74.setAttribute("r", r(radius * 1.07 - v).toString());
      c74.setAttribute("stroke-dasharray", ((radius * 1.07 - v) / 100).toString());
      c74.setAttribute("transform", `rotate(${rotation}, ${center}, ${center})`);

      c71.setAttribute("r", r(radius + v).toString());
      c71.setAttribute("stroke-dasharray", `8, ${(radius + v) / 4 - 8}`);
      c71.setAttribute("transform", `rotate(${rotation * 0.5}, ${center}, ${center})`);
    },
    [radius, center],
  );

  useEffect(() => {
    // Only run on initial mount
    if (!isInitialMount.current) {
      return;
    }
    isInitialMount.current = false;

    // Simulate initial page load progress with smoother animation
    const startTime = Date.now();
    const duration = 3000; // 3 seconds total duration
    let hideTimeout: NodeJS.Timeout;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Use smooth easing function for more natural animation
      const easedProgress = smoothEasing(progress);
      const currentProgress = easedProgress * 100;

      setProgress(currentProgress);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Hide after completion
        hideTimeout = setTimeout(() => {
          setIsVisible(false);
          setProgress(0);
        }, 500);
      }
    };

    // Start the animation
    requestAnimationFrame(animate);

    // Cleanup function
    return () => {
      if (hideTimeout) {
        clearTimeout(hideTimeout);
      }
    };
  }, []);

  useEffect(() => {
    let hideTimeout: NodeJS.Timeout;

    const handleStart = () => {
      setIsVisible(true);
      setProgress(0);
    };

    const handleComplete = () => {
      setProgress(100);
      // Hide after completion animation
      hideTimeout = setTimeout(() => {
        setIsVisible(false);
        setProgress(0);
      }, 500);
    };

    const handleError = () => {
      setProgress(100);
      hideTimeout = setTimeout(() => {
        setIsVisible(false);
        setProgress(0);
      }, 500);
    };

    // Listen to router events
    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleError);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleError);
      if (hideTimeout) {
        clearTimeout(hideTimeout);
      }
    };
  }, [router]);

  useEffect(() => {
    if (!isVisible) {
      return;
    }

    // Simulate progress when navigation starts with smoother animation
    const startTime = Date.now();
    const duration = 2000; // 2 seconds for navigation

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Use smooth easing function
      const easedProgress = smoothEasing(progress);
      const currentProgress = easedProgress * 90; // Cap at 90% until route change completes

      setProgress(currentProgress);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible || !svgRef.current) {
      return;
    }

    const animateProgress = () => {
      const easedProgress = timingFunc(progress / 100);

      switch (type) {
        case 1:
          animateType1(easedProgress);
          break;
        case 2:
          animateType2(easedProgress);
          break;
        case 3:
          animateType3(easedProgress);
          break;
        case 4:
          animateType4(easedProgress);
          break;
      }
    };

    animateProgress();
  }, [progress, isVisible, type, animateType1, animateType2, animateType3, animateType4]);

  const renderButton1 = () => (
    <>
      <circle id="c11" cx={center} cy={center} r={r(radius)} fill="transparent" stroke={color} strokeWidth="2" />
      <circle
        id="c12"
        cx={center}
        cy={center}
        r={r(radius)}
        fill="transparent"
        stroke={color}
        strokeWidth="6"
        strokeDasharray={s(radius, 4, 5).join(",")}
        transform={`rotate(-${5 * (2 / 3)}, ${center}, ${center})`}
      />
    </>
  );

  const renderButton2 = () => (
    <>
      <circle id="c21" cx={center} cy={center} r={r(radius)} fill="transparent" stroke={color} strokeWidth="2" />
      <circle
        id="c22"
        cx={center}
        cy={center}
        r={r(radius * 0.93)}
        fill="transparent"
        stroke={color}
        strokeWidth="6"
        strokeDasharray={((radius * 0.93) / 4).toString()}
      />
      <circle
        id="c23"
        cx={center}
        cy={center}
        r={r(radius * 1.13)}
        fill="none"
        stroke={color}
        strokeWidth="0"
        strokeDasharray={((radius * 1.13) / 4).toString()}
        transform={`rotate(90, ${center}, ${center})`}
      />
    </>
  );

  const renderButton3 = () => (
    <>
      <circle
        id="c31"
        cx={center}
        cy={center}
        r={r(radius)}
        fill="transparent"
        stroke={color}
        strokeWidth="2"
        strokeDasharray={`${radius / 3}, ${radius * (2 / 3)}`}
      />
      <circle
        id="c32"
        cx={center}
        cy={center}
        r={r(radius * 0.73)}
        fill="transparent"
        stroke={color}
        strokeWidth="2"
        strokeDasharray={`${(radius * 0.73) / 3}, ${radius * 0.73 * (2 / 3)}`}
      />
      <circle
        id="c34"
        cx={center}
        cy={center}
        r={r(radius * 0.53)}
        fill="transparent"
        stroke={color}
        strokeWidth="2"
        strokeDasharray={`${(radius * 0.53) / 3}, ${(radius * 0.53) / 6}`}
      />
      <circle id="c35" cx={center} cy={center} r={r(40)} fill="transparent" stroke={color} strokeWidth="2" />
      <circle
        id="c36"
        cx={center}
        cy={center}
        r={r(radius)}
        fill="transparent"
        stroke={color}
        strokeWidth="2"
        strokeDasharray={`${radius / 3}, ${radius * (2 / 3)}`}
        transform={`rotate(180, ${center}, ${center})`}
      />
      <circle
        id="c37"
        cx={center}
        cy={center}
        r={r(radius * 0.73)}
        fill="transparent"
        stroke={color}
        strokeWidth="2"
        strokeDasharray={`${(radius * 0.73) / 3}, ${radius * 0.73 * (2 / 3)}`}
        transform={`rotate(180, ${center}, ${center})`}
      />
      <circle
        id="c38"
        cx={center}
        cy={center}
        r={r(radius * 0.87)}
        fill="transparent"
        stroke={color}
        strokeWidth="14"
        strokeDasharray={`${`${(radius * 0.87) / 180}, ${(radius * 0.87) / 60}`.repeat(15)}, ${(radius * 0.87) / 180}, ${240}`}
        transform={`rotate(180, ${center}, ${center})`}
      />
      <circle
        id="c33"
        cx={center}
        cy={center}
        r={r(radius * 0.87)}
        fill="transparent"
        stroke={color}
        strokeWidth="14"
        strokeDasharray={`${`${(radius * 0.87) / 180}, ${(radius * 0.87) / 60}`.repeat(15)}, ${(radius * 0.87) / 180}, ${240}`}
      />
    </>
  );

  const renderButton4 = () => (
    <>
      <circle
        id="c71"
        cx={center}
        cy={center}
        r={r(radius)}
        fill="transparent"
        stroke={color}
        strokeWidth="16"
        strokeDasharray={`8, ${radius / 4 - 8}`}
      />
      <circle id="c72" cx={center} cy={center} r={r(radius)} fill="transparent" stroke={color} strokeWidth="2" />
      <circle id="c73" cx={center} cy={center} r={r(radius * 0.87)} fill="transparent" stroke={color} strokeWidth="1" />
      <circle
        id="c74"
        cx={center}
        cy={center}
        r={r(radius * 1.07)}
        fill="transparent"
        stroke={color}
        strokeWidth="10"
        strokeOpacity="0.65"
        strokeDasharray={((radius * 1.07) / 100).toString()}
      />
      <circle id="c75" cx={center} cy={center} r={r(20)} fill="transparent" stroke={color} strokeWidth="1" />
    </>
  );

  const renderButton = () => {
    switch (type) {
      case 1:
        return renderButton1();
      case 2:
        return renderButton2();
      case 3:
        return renderButton3();
      case 4:
        return renderButton4();
      default:
        return renderButton1();
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={`cyber-progress-bar ${className}`}
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: 9999,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "10px",
      }}
    >
      <div
        style={{
          position: "relative",
          width: size,
          height: size,
          display: "inline-block",
        }}
      >
        <svg ref={svgRef} width={size} height={size} style={{ display: "block" }}>
          {renderButton()}
        </svg>
        {type === 1 && (
          <>
            <div
              style={{
                position: "absolute",
                top: "5%",
                right: "5%",
                width: "10px",
                height: "10px",
                borderBottom: `1px solid ${color}`,
                borderLeft: `1px solid ${color}`,
                opacity: 0.75,
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "5%",
                left: "5%",
                width: "10px",
                height: "10px",
                borderTop: `1px solid ${color}`,
                borderRight: `1px solid ${color}`,
                opacity: 0.75,
              }}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default CyberProgressBar;

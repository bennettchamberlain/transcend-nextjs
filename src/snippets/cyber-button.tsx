"use client";

import React, { useEffect, useRef, useState } from "react";

interface CyberButtonProps {
  type: 1 | 2 | 3 | 4;
  size?: number;
  color?: string;
  className?: string;
  onClick?: () => void;
}

const CyberButton: React.FC<CyberButtonProps> = ({ type, size = 200, color = "#ff0000", className = "", onClick }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const center = size / 2;
  const radius = (size * 1.5) / 2; // 300px equivalent for 200px size

  // Utility functions
  const r = (circumference: number) => circumference / (2 * Math.PI);
  const s = (circumference: number, count: number, w: number = 5, spaceAfter?: boolean) => {
    const res = [w, circumference / count - w];
    return spaceAfter ? [circumference / count - w, w] : res;
  };

  // Animation timing functions
  const timingFunc = (t: number) => {
    // Bezier curve approximation
    return t * t * (3 - 2 * t);
  };

  const timingFunc2 = (t: number) => {
    return t;
  };

  const timingFunc3 = (t: number) => {
    return t * t * t;
  };

  // Button type 1 animation
  const animateButton1 = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    const c12 = svgRef.current?.querySelector("#c12") as SVGElement;
    if (!c12) return;

    // Initial state
    c12.setAttribute("r", r(radius).toString());
    c12.setAttribute("stroke-dasharray", s(radius, 4, 5).join(","));
    c12.setAttribute("transform", `rotate(-${5 * (2 / 3)}, ${center}, ${center})`);

    // Animate to 360
    let startTime = Date.now();
    const duration = 800;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = timingFunc2(progress);

      const currentRadius = radius + 60 * easedProgress;
      const vc = currentRadius - radius;

      c12.setAttribute("r", r(currentRadius).toString());
      c12.setAttribute("stroke-dasharray", s(currentRadius, 4, 5).join(","));
      c12.setAttribute("transform", `rotate(${vc * 1.5 - 5 * (2 / 3)}, ${center}, ${center})`);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Bounce back animation
        c12.style.transition = "transform 800ms cubic-bezier(0.68, -0.55, 0.265, 1.55)";
        c12.setAttribute("transform", `rotate(${180 - 5 * (2 / 3)}, ${center}, ${center})`);

        setTimeout(() => {
          // Return to original size
          c12.style.transition = "r 800ms ease-in-out";
          c12.setAttribute("r", r(radius).toString());
          c12.setAttribute("stroke-dasharray", s(radius, 4, 5).join(","));
          c12.setAttribute("transform", `rotate(-${5 * (2 / 3)}, ${center}, ${center})`);
          setIsAnimating(false);
        }, 800);
      }
    };

    requestAnimationFrame(animate);
  };

  // Button type 2 animation
  const animateButton2 = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    const c22 = svgRef.current?.querySelector("#c22") as SVGElement;
    const c23 = svgRef.current?.querySelector("#c23") as SVGElement;
    if (!c22 || !c23) return;

    // Initial state
    c22.setAttribute("r", r(radius * 0.93).toString());
    c22.setAttribute("stroke-dasharray", ((radius * 0.93) / 4).toString());
    c22.setAttribute("transform", `rotate(0, ${center}, ${center})`);

    let startTime = Date.now();
    const duration = 800;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = timingFunc2(progress);

      const currentRadius = radius * 0.93 - 30 * easedProgress;
      const radiusDiff = Math.abs(currentRadius - radius * 0.93);

      c22.setAttribute("r", r(currentRadius).toString());
      c22.setAttribute("stroke-dasharray", (currentRadius / 4).toString());
      c22.setAttribute("transform", `rotate(-${radiusDiff * 3}, ${center}, ${center})`);

      c23.setAttribute("stroke-width", (radiusDiff * 0.2).toString());
      c23.setAttribute("transform", `rotate(${radiusDiff * 3 * 2}, ${center}, ${center})`);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Return animation
        setTimeout(() => {
          let returnStartTime = Date.now();
          const returnAnimate = () => {
            const returnElapsed = Date.now() - returnStartTime;
            const returnProgress = Math.min(returnElapsed / duration, 1);
            const returnEasedProgress = timingFunc2(returnProgress);

            const returnRadius = radius * 0.93 - 30 * (1 - returnEasedProgress);
            const returnRadiusDiff = Math.abs(returnRadius - radius * 0.93);

            c22.setAttribute("r", r(returnRadius).toString());
            c22.setAttribute("stroke-dasharray", (returnRadius / 4).toString());
            c23.setAttribute("stroke-width", (returnRadiusDiff * 0.2).toString());
            c23.setAttribute("transform", `rotate(${returnRadiusDiff * 6 * 2}, ${center}, ${center})`);

            if (returnProgress < 1) {
              requestAnimationFrame(returnAnimate);
            } else {
              // Final rotation
              c22.style.transition = "transform 800ms ease-in-out";
              c22.setAttribute("transform", `rotate(-180, ${center}, ${center})`);
              setIsAnimating(false);
            }
          };
          requestAnimationFrame(returnAnimate);
        }, 100);
      }
    };

    requestAnimationFrame(animate);
  };

  // Button type 3 animation
  const animateButton3 = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    const elements = {
      c31: svgRef.current?.querySelector("#c31") as SVGElement,
      c33: svgRef.current?.querySelector("#c33") as SVGElement,
      c36: svgRef.current?.querySelector("#c36") as SVGElement,
      c38: svgRef.current?.querySelector("#c38") as SVGElement,
      c34: svgRef.current?.querySelector("#c34") as SVGElement,
      c35: svgRef.current?.querySelector("#c35") as SVGElement,
    };

    if (!elements.c31 || !elements.c33) return;

    let startTime = Date.now();
    const duration = 800;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = timingFunc2(progress);

      const v = easedProgress * 100;

      // Update radii and stroke dasharrays
      elements.c31.setAttribute("r", r(radius + v).toString());
      elements.c31.setAttribute("stroke-dasharray", `${(radius + v) / 3}, ${(radius + v) * (2 / 3)}`);

      elements.c33.setAttribute("r", r(radius * 0.87 + v / 2).toString());
      elements.c33.setAttribute("stroke-width", (14 + v / 6).toString());

      elements.c36.setAttribute("r", r(radius + v).toString());
      elements.c36.setAttribute("stroke-dasharray", `${(radius + v) / 3}, ${(radius + v) * (2 / 3)}`);

      elements.c38.setAttribute("r", r(radius * 0.87 + v / 2).toString());
      elements.c38.setAttribute("stroke-width", (14 + v / 6).toString());

      // Rotate elements
      elements.c34.setAttribute("transform", `rotate(-${v * 3.6}, ${center}, ${center})`);
      elements.c35.setAttribute("r", r(40 + v).toString());

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Return animation
        setTimeout(() => {
          let returnStartTime = Date.now();
          const returnAnimate = () => {
            const returnElapsed = Date.now() - returnStartTime;
            const returnProgress = Math.min(returnElapsed / duration, 1);
            const returnEasedProgress = timingFunc2(returnProgress);

            const returnV = (1 - returnEasedProgress) * 100;

            elements.c31.setAttribute("r", r(radius + returnV).toString());
            elements.c31.setAttribute("stroke-dasharray", `${(radius + returnV) / 3}, ${(radius + returnV) * (2 / 3)}`);

            elements.c33.setAttribute("r", r(radius * 0.87 + returnV / 2).toString());
            elements.c33.setAttribute("stroke-width", (14 + returnV / 6).toString());

            elements.c36.setAttribute("r", r(radius + returnV).toString());
            elements.c36.setAttribute("stroke-dasharray", `${(radius + returnV) / 3}, ${(radius + returnV) * (2 / 3)}`);

            elements.c38.setAttribute("r", r(radius * 0.87 + returnV / 2).toString());
            elements.c38.setAttribute("stroke-width", (14 + returnV / 6).toString());

            elements.c35.setAttribute("r", r(40 + returnV).toString());
            elements.c34.setAttribute("transform", `rotate(-${returnV * 1.8}, ${center}, ${center})`);

            if (returnProgress < 1) {
              requestAnimationFrame(returnAnimate);
            } else {
              setIsAnimating(false);
            }
          };
          requestAnimationFrame(returnAnimate);
        }, 100);
      }
    };

    requestAnimationFrame(animate);
  };

  // Button type 4 animation (using button 7 from original)
  const animateButton4 = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    const c71 = svgRef.current?.querySelector("#c71") as SVGElement;
    const c74 = svgRef.current?.querySelector("#c74") as SVGElement;
    if (!c71 || !c74) return;

    // Initial state
    c71.setAttribute("transform", `rotate(0, ${center}, ${center})`);
    c74.setAttribute("transform", `rotate(0, ${center}, ${center})`);

    let startTime = Date.now();
    const duration = 800;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = timingFunc2(progress);

      const v = easedProgress * 100;

      c74.setAttribute("r", r(radius * 1.07 - v).toString());
      c74.setAttribute("stroke-dasharray", ((radius * 1.07 - v) / 100).toString());

      c71.setAttribute("r", r(radius + v).toString());
      c71.setAttribute("stroke-dasharray", `8, ${(radius + v) / 4 - 8}`);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Continue with rotation animations
        c74.style.transition = "transform 3500ms ease-in-out";
        c74.setAttribute("transform", `rotate(-360, ${center}, ${center})`);

        c71.style.transition = "transform 1200ms ease-in-out";
        c71.setAttribute("transform", `rotate(135, ${center}, ${center})`);

        setTimeout(() => {
          c71.style.transition = "transform 500ms ease-in-out";
          c71.setAttribute("transform", `rotate(225, ${center}, ${center})`);

          setTimeout(() => {
            c71.style.transition = "transform 1000ms ease-in-out";
            c71.setAttribute("transform", `rotate(90, ${center}, ${center})`);

            // Final size animation
            setTimeout(() => {
              let finalStartTime = Date.now();
              const finalDuration = 1500;
              const finalAnimate = () => {
                const finalElapsed = Date.now() - finalStartTime;
                const finalProgress = Math.min(finalElapsed / finalDuration, 1);
                const finalEasedProgress = timingFunc(finalProgress);

                const finalV = finalEasedProgress * 100;

                c74.setAttribute("r", r(220 + finalV).toString());
                c74.setAttribute("stroke-dasharray", ((220 + finalV) / 100).toString());

                c71.setAttribute("r", r(400 - finalV).toString());
                c71.setAttribute("stroke-dasharray", `8, ${(400 - finalV) / 4 - 8}`);

                if (finalProgress < 1) {
                  requestAnimationFrame(finalAnimate);
                } else {
                  setIsAnimating(false);
                }
              };
              requestAnimationFrame(finalAnimate);
            }, 1000);
          }, 500);
        }, 1200);
      }
    };

    requestAnimationFrame(animate);
  };

  const handleClick = () => {
    switch (type) {
      case 1:
        animateButton1();
        break;
      case 2:
        animateButton2();
        break;
      case 3:
        animateButton3();
        break;
      case 4:
        animateButton4();
        break;
    }
    onClick?.();
  };

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
        style={{ cursor: "pointer" }}
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
        style={{ cursor: "pointer" }}
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
        strokeDasharray={
          `${(radius * 0.87) / 180}, ${(radius * 0.87) / 60}`.repeat(15) + `, ${(radius * 0.87) / 180}, ${240}`
        }
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
        strokeDasharray={
          `${(radius * 0.87) / 180}, ${(radius * 0.87) / 60}`.repeat(15) + `, ${(radius * 0.87) / 180}, ${240}`
        }
        style={{ cursor: "pointer" }}
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
        style={{ cursor: "pointer" }}
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

  return (
    <div
      className={`cyber-button ${className}`}
      style={{
        position: "relative",
        width: size,
        height: size,
        display: "inline-block",
        cursor: "pointer",
      }}
      onClick={handleClick}
    >
      <svg ref={svgRef} width={size} height={size} style={{ display: "block" }}>
        {renderButton()}
      </svg>
      {type === 1 && (
        <>
          <div
            style={{
              position: "absolute",
              top: "15%",
              right: "15%",
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
              bottom: "15%",
              left: "15%",
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
  );
};

export default CyberButton;

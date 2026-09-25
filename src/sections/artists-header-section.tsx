import { useEffect, useRef, useState } from "react";

import { HeroButtonRow } from "./hero-button-row";

const pulseGlowKeyframes = `
  @keyframes pulseGlow {
    0%, 100% {
      opacity: 1;
      box-shadow: 0 0 20px #dcff07, 0 0 40px #dcff07, 0 0 60px #dcff07;
    }
    50% {
      opacity: 0.6;
      box-shadow: 0 0 30px #dcff07, 0 0 60px #dcff07, 0 0 90px #dcff07;
    }
  }
`;

export function ArtistsHeaderSection() {
  const ellipseRef = useRef<HTMLDivElement>(null);
  const ellipseBackRef = useRef<HTMLDivElement>(null);
  const mobileEllipseRef = useRef<HTMLDivElement>(null);
  const mobileEllipseBackRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const [animationTriggered, setAnimationTriggered] = useState(false);
  const desktopVideoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const createAnimation = ({
      duration = 21,
      target,
      text,
      textProperties = undefined,
    }: {
      duration?: number;
      target: Element;
      text: string;
      textProperties?: any;
    }) => {
      const pathId = `path-${window.gsap.utils.random(100000, 999999, 1)}`;
      const props = { duration, ease: "none", repeat: -1 };

      window.gsap.set(target.querySelector("path"), {
        attr: { fill: "none", id: pathId, stroke: "none" },
      });

      target.insertAdjacentHTML(
        "beforeend",
        `
          <text>
            <textPath href='#${pathId}' startOffset="0%">${text}</textPath>
            <textPath href='#${pathId}' startOffset="0%">${text}</textPath>
          </text>
          `,
      );

      if (textProperties) {
        window.gsap.set(target.querySelectorAll("textPath"), textProperties);
      }

      window.gsap.fromTo(
        target.querySelectorAll("textPath")[0],
        { attr: { startOffset: "0%" } },
        { attr: { startOffset: "100%" }, ...props },
      );
      window.gsap.fromTo(
        target.querySelectorAll("textPath")[1],
        { attr: { startOffset: "-100%" } },
        { attr: { startOffset: "0%" }, ...props },
      );
    };

    const triggerAnimation = async () => {
      if (animationTriggered) {
        return;
      }

      // SVG <textPath> lays out glyph advances once, so the font must be ready
      // before the text is inserted - otherwise it can get stuck on the fallback.
      if (typeof document !== "undefined" && document.fonts) {
        try {
          await document.fonts.load('400 17px "Enfonix"');
          await document.fonts.ready;
        } catch {
          // Ignore font loading errors and fall through to the fallback font
        }
      }

      const desktopText = "Designs that push the boundaries for creatives.".toUpperCase();
      const mobileText = "Designs that push boundaries for creatives ".toUpperCase();
      const fontSize = { fontSize: /iPhone/.test(navigator.userAgent) ? "13px" : "12px" };

      // Apply animation to desktop ellipse (front and back halves, kept in sync)
      if (ellipseRef.current && window.gsap) {
        createAnimation({
          duration: 21,
          target: ellipseRef.current.querySelector("svg")!,
          text: desktopText,
          textProperties: fontSize,
        });
      }
      if (ellipseBackRef.current && window.gsap) {
        createAnimation({
          duration: 21,
          target: ellipseBackRef.current.querySelector("svg")!,
          text: desktopText,
          textProperties: fontSize,
        });
      }

      // Apply animation to mobile ellipse (front and back halves, kept in sync)
      if (mobileEllipseRef.current && window.gsap) {
        createAnimation({
          duration: 21,
          target: mobileEllipseRef.current.querySelector("svg")!,
          text: mobileText,
          textProperties: fontSize,
        });
      }
      if (mobileEllipseBackRef.current && window.gsap) {
        createAnimation({
          duration: 21,
          target: mobileEllipseBackRef.current.querySelector("svg")!,
          text: mobileText,
          textProperties: fontSize,
        });
      }

      setAnimationTriggered(true);
    };

    // Set up Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            triggerAnimation();
          }
        });
      },
      {
        threshold: 0.3, // Trigger when 30% of the section is visible
        rootMargin: "0px 0px -100px 0px", // Trigger slightly before center
      },
    );

    const currentHeaderRef = headerRef.current;
    if (currentHeaderRef) {
      observer.observe(currentHeaderRef);
    }

    return () => {
      if (currentHeaderRef) {
        observer.unobserve(currentHeaderRef);
      }
    };
  }, [animationTriggered]);

  return (
    <>
      <style>{pulseGlowKeyframes}</style>
      <header
        ref={headerRef}
        className="relative z-50 min-h-[600px] overflow-hidden bg-black pb-20 shadow-sm lg:min-h-[600px] lg:pb-20"
      >
        {/* Video Background - Full Width - Positioned below navigation */}
        <div className="absolute inset-x-0 top-[0px] w-full lg:top-[0px]" style={{ bottom: "80px" }}>
          {/* Desktop Video */}
          <video
            ref={desktopVideoRef}
            className="absolute inset-0 hidden h-full w-full object-cover lg:block"
            autoPlay
            loop
            muted
            playsInline
            onLoadedMetadata={(e) => {
              e.currentTarget.currentTime = 5;
            }}
          >
            <source src="https://cdn.shopify.com/videos/c/o/v/fe32cdc9c6694f3b80600c0624b4bf85.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Mobile Video */}
          <video
            ref={mobileVideoRef}
            className="absolute inset-0 h-full w-full object-cover lg:hidden"
            autoPlay
            loop
            muted
            playsInline
            onLoadedMetadata={(e) => {
              e.currentTarget.currentTime = 5;
            }}
          >
            <source src="https://cdn.shopify.com/videos/c/o/v/fe32cdc9c6694f3b80600c0624b4bf85.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Translucent Grid Overlay */}
          <div className="absolute inset-0 bg-black/40">
            <div
              className="h-full w-full"
              style={{
                backgroundImage: `
                linear-gradient(rgba(0, 255, 255, 0.10) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 255, 255, 0.10) 1px, transparent 1px)
              `,
                backgroundSize: "40px 40px",
              }}
            />
          </div>

          {/* Glow effect at top of video - z-index to appear above navigation */}
          <div
            className="mb-5px absolute top-0 right-0 left-0 z-90 h-0.5"
            style={{
              boxShadow:
                "0 0 4px rgba(220, 255, 7, 0.9), 0 0 12px rgba(220, 255, 7, 0.5), 0 0 24px rgba(220, 255, 7, 0.25), 0 0 40px rgba(220, 255, 7, 0.1)",
              background: "linear-gradient(to bottom, rgba(220, 255, 7, 0.8), transparent)",
              animation: "pulseGlow 2s ease-in-out infinite",
            }}
          ></div>

          {/* Glow effect at bottom of video */}
          <div
            className="mt-5px absolute right-0 bottom-0 left-0 z-30 h-0.5"
            style={{
              boxShadow:
                "0 0 4px rgba(220, 255, 7, 0.9), 0 0 12px rgba(220, 255, 7, 0.5), 0 0 24px rgba(220, 255, 7, 0.25), 0 0 40px rgba(220, 255, 7, 0.1)",
              background: "linear-gradient(to bottom, rgba(220, 255, 7, 0.8), transparent)",
              animation: "pulseGlow 2s ease-in-out infinite",
            }}
          ></div>

          {/* Divider line at bottom of video */}
          <div className="absolute right-0 bottom-0 left-0 border-t border-white/70"></div>
        </div>

        {/* Black section below video - no borders */}
        <div className="absolute inset-x-0 bottom-0 h-20 w-full bg-black"></div>

        {/* Animated Circle with Symbol - Centered - Positioned below navigation */}
        <div className="pointer-events-none absolute inset-x-0 top-[2px] bottom-[80px] z-10">
          {/* Desktop Animated Ellipse - back half (behind the symbol) */}
          <div
            className="absolute inset-0 hidden items-center justify-center lg:flex"
            style={{ zIndex: 1, clipPath: "inset(0 0 50% 0)" }}
          >
            <div ref={ellipseBackRef} className="ellipse" style={{ width: "min(80vw, 80vh)", maxWidth: "450px", position: "relative" }}>
              <svg
                viewBox="0 0 240 240"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  transform: "rotate(-33deg)",
                  width: "100%",
                  height: "100%",
                }}
              >
                <path
                  d="M227 120C227 142.091 178.871 160 119.5 160C60.1294 160 12 142.091 12 120C12 97.9086 60.1294 80 119.5 80C178.871 80 227 97.9086 227 120Z"
                  fill="none"
                />
                <style>
                  {`
                  text, textPath {
                    fill: #ffffff !important;
                    font-family: "Enfonix", Arial, sans-serif;
                  }
                `}
                </style>
              </svg>
            </div>
          </div>

          {/* Desktop Symbol - Positioned independently to stay upright */}
          <div
            className="pointer-events-none absolute hidden items-center justify-center lg:flex"
            style={{
              left: "50%",
              top: "47%",
              transform: "translate(-50%, -50%)",
              fontSize: "10rem",
              color: "#dcff07",
              textShadow: "0 0 20px #dcff07, 0 0 40px #dcff07",
              zIndex: 2,
            }}
          >
            🜁
          </div>

          {/* Desktop Animated Ellipse - front half (in front of the symbol) */}
          <div
            className="absolute inset-0 hidden items-center justify-center lg:flex"
            style={{ zIndex: 3, clipPath: "inset(50% 0 0 0)" }}
          >
            <div ref={ellipseRef} className="ellipse" style={{ width: "min(80vw, 80vh)", maxWidth: "450px", position: "relative" }}>
              <svg
                viewBox="0 0 240 240"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  transform: "rotate(-33deg)",
                  width: "100%",
                  height: "100%",
                }}
              >
                <path
                  d="M227 120C227 142.091 178.871 160 119.5 160C60.1294 160 12 142.091 12 120C12 97.9086 60.1294 80 119.5 80C178.871 80 227 97.9086 227 120Z"
                  fill="none"
                />
                <style>
                  {`
                  text, textPath {
                    fill: #ffffff !important;
                    font-family: "Enfonix", Arial, sans-serif;
                  }
                `}
                </style>
              </svg>
            </div>
          </div>

          {/* Mobile Animated Ellipse - back half (behind the symbol) */}
          <div
            className="absolute inset-0 flex items-center justify-center lg:hidden"
            style={{ zIndex: 1, clipPath: "inset(0 0 50% 0)" }}
          >
            <div ref={mobileEllipseBackRef} className="ellipse" style={{ width: "min(80vw, 80vh)", maxWidth: "350px", position: "relative" }}>
              <svg
                viewBox="0 0 240 240"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  transform: "rotate(-40deg)",
                  width: "100%",
                  height: "100%",
                }}
              >
                <path
                  d="M227 120C227 142.091 178.871 160 119.5 160C60.1294 160 12 142.091 12 120C12 97.9086 60.1294 80 119.5 80C178.871 80 227 97.9086 227 120Z"
                  fill="none"
                />
                <style>
                  {`
                  text, textPath {
                    fill: #ffffff !important;
                    font-family: "Enfonix", Arial, sans-serif;
                  }
                `}
                </style>
              </svg>
            </div>
          </div>

          {/* Mobile Symbol - Positioned independently to stay upright */}
          <div
            className="pointer-events-none absolute flex items-center justify-center lg:hidden"
            style={{
              left: "50%",
              top: "47%",
              transform: "translate(-50%, -50%)",
              fontSize: "7.5rem",
              color: "#dcff07",
              textShadow: "0 0 20px #dcff07, 0 0 40px #dcff07",
              zIndex: 2,
            }}
          >
            🜁
          </div>

          {/* Mobile Animated Ellipse - front half (in front of the symbol) */}
          <div
            className="absolute inset-0 flex items-center justify-center lg:hidden"
            style={{ zIndex: 3, clipPath: "inset(50% 0 0 0)" }}
          >
            <div ref={mobileEllipseRef} className="ellipse" style={{ width: "min(80vw, 80vh)", maxWidth: "350px", position: "relative" }}>
              <svg
                viewBox="0 0 240 240"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  transform: "rotate(-40deg)",
                  width: "100%",
                  height: "100%",
                }}
              >
                <path
                  d="M227 120C227 142.091 178.871 160 119.5 160C60.1294 160 12 142.091 12 120C12 97.9086 60.1294 80 119.5 80C178.871 80 227 97.9086 227 120Z"
                  fill="none"
                />
                <style>
                  {`
                  text, textPath {
                    fill: #ffffff !important;
                    font-family: "Enfonix", Arial, sans-serif;
                  }
                `}
                </style>
              </svg>
            </div>
          </div>
        </div>

        {/* All Products Button - Split between video and black section */}
        <div className="absolute right-0 left-0 z-30" style={{ bottom: "40px" }}>
          <div className="mx-auto max-w-7xl px-6 py-4 lg:px-8">
            <div className="flex justify-center lg:justify-start">
              <HeroButtonRow />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

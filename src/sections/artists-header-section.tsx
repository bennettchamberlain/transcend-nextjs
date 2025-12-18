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
  const mobileEllipseRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const [animationTriggered, setAnimationTriggered] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const desktopVideoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);

  const toggleSound = () => {
    setIsMuted(!isMuted);
    if (mobileVideoRef.current) {
      mobileVideoRef.current.muted = !isMuted;
    }
    if (desktopVideoRef.current) {
      desktopVideoRef.current.muted = !isMuted;
    }
  };

  useEffect(() => {
    const createAnimation = ({
      duration = 21,
      reversed: _reversed = false,
      target,
      text,
      textProperties = undefined,
    }: {
      duration?: number;
      reversed?: boolean;
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
        { attr: { startOffset: "-100%" }, ...props },
      );
      window.gsap.fromTo(
        target.querySelectorAll("textPath")[1],
        { attr: { startOffset: "100%" } },
        { attr: { startOffset: "0%" }, ...props },
      );
    };

    const triggerAnimation = () => {
      if (animationTriggered) {
        return;
      }

      // Apply animation to desktop ellipse
      if (ellipseRef.current && window.gsap) {
        createAnimation({
          duration: 21,
          reversed: true,
          target: ellipseRef.current.querySelector("svg")!,
          text: "Designs that push the boundaries for creatives.".toUpperCase(),
          textProperties: { fontSize: /iPhone/.test(navigator.userAgent) ? "19px" : "17px" },
        });
      }

      // Apply animation to mobile ellipse
      if (mobileEllipseRef.current && window.gsap) {
        createAnimation({
          duration: 21,
          reversed: true,
          target: mobileEllipseRef.current.querySelector("svg")!,
          text: "Designs that push boundaries for creatives ".toUpperCase(),
          textProperties: { fontSize: /iPhone/.test(navigator.userAgent) ? "19px" : "17px" },
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

          {/* Sound Toggle Button - Desktop */}
          <button
            type="button"
            onClick={toggleSound}
            className="absolute right-4 bottom-4 z-20 hidden h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-all hover:bg-black/70 lg:flex"
            aria-label={isMuted ? "Unmute video" : "Mute video"}
          >
            {isMuted ? (
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
              </svg>
            ) : (
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
              </svg>
            )}
          </button>

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

          {/* Sound Toggle Button - Mobile */}
          <button
            type="button"
            onClick={toggleSound}
            className="absolute right-4 bottom-4 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-all hover:bg-black/70 lg:hidden"
            aria-label={isMuted ? "Unmute video" : "Mute video"}
          >
            {isMuted ? (
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
              </svg>
            ) : (
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
              </svg>
            )}
          </button>

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
              boxShadow: "0 0 20px #dcff07, 0 0 40px #dcff07, 0 0 60px #dcff07",
              background: "linear-gradient(to bottom, rgba(220, 255, 7, 0.8), transparent)",
              animation: "pulseGlow 2s ease-in-out infinite",
            }}
          ></div>

          {/* Glow effect at bottom of video */}
          <div
            className="mt-5px absolute right-0 bottom-0 left-0 z-30 h-0.5"
            style={{
              boxShadow: "0 0 20px #dcff07, 0 0 40px #dcff07, 0 0 60px #dcff07",
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
        <div className="pointer-events-none absolute inset-x-0 top-[2px] bottom-[80px] z-10 flex items-center justify-center">
          {/* Desktop Animated Ellipse */}
          <div
            ref={ellipseRef}
            className="ellipse hidden items-center justify-center lg:flex"
            style={{
              width: "min(80vw, 80vh)",
              maxWidth: "450px",
              position: "relative",
            }}
          >
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
                text {
                  fill: #ffffff !important;
                  font-family: Arial, sans-serif;
                }
              `}
              </style>
            </svg>
          </div>
          {/* Desktop Symbol - Positioned independently to stay upright */}
          <div
            className="pointer-events-none absolute hidden items-center justify-center lg:flex"
            style={{
              left: "50%",
              top: "47%",
              transform: "translate(-50%, -50%)",
              fontSize: "4rem",
              color: "#dcff07",
              textShadow: "0 0 20px #dcff07, 0 0 40px #dcff07",
            }}
          >
            🜁
          </div>

          {/* Mobile Animated Ellipse */}
          <div
            ref={mobileEllipseRef}
            className="ellipse flex items-center justify-center lg:hidden"
            style={{
              width: "min(80vw, 80vh)",
              maxWidth: "350px",
              margin: "0 auto",
              position: "relative",
            }}
          >
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
                text {
                  fill: #ffffff !important;
                  font-family: Arial, sans-serif;
                }
              `}
              </style>
            </svg>
          </div>
          {/* Mobile Symbol - Positioned independently to stay upright */}
          <div
            className="pointer-events-none absolute flex items-center justify-center lg:hidden"
            style={{
              left: "50%",
              top: "47%",
              transform: "translate(-50%, -50%)",
              fontSize: "3rem",
              color: "#dcff07",
              textShadow: "0 0 20px #dcff07, 0 0 40px #dcff07",
            }}
          >
            🜁
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

import { useEffect, useRef, useState } from "react";

import { HeroButtonRow } from "./hero-button-row";

export function HeroSection() {
  const ellipseRef = useRef<HTMLDivElement>(null);
  const mobileEllipseRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [animationTriggered, setAnimationTriggered] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);
  const desktopVideoRef = useRef<HTMLVideoElement>(null);
  // const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const toggleSound = () => {
    setIsMuted(!isMuted);
    if (mobileVideoRef.current) {
      mobileVideoRef.current.muted = !isMuted;
    }
    if (desktopVideoRef.current) {
      desktopVideoRef.current.muted = !isMuted;
    }
  };

  // // Slideshow images - Desktop (keep the same)
  // const desktopSlideshowImages = ["/images/hero.JPG", "/images/TRANSCEND_TEAM.jpg", "/images/cover3.png"];

  // // Slideshow images - Mobile (new images as requested)
  // const mobileSlideshowImages = [
  //   "/images/hero.JPG",
  //   "/images/cover.jpg",
  //   "/images/section4.png",
  //   "/images/mobile-cover.jpg",
  // ];

  // Auto-advance slideshow
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentImageIndex((prevIndex) => {
  //       // Use mobile images length for mobile, desktop images length for desktop
  //       const isMobile = window.innerWidth < 1024; // lg breakpoint
  //       const maxIndex = isMobile ? mobileSlideshowImages.length - 1 : desktopSlideshowImages.length - 1;
  //       return (prevIndex + 1) % (maxIndex + 1);
  //     });
  //   }, 5000); // Change image every 5 seconds

  //   return () => clearInterval(interval);
  // }, [mobileSlideshowImages.length, desktopSlideshowImages.length]);

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

    const currentSectionRef = sectionRef.current;
    if (currentSectionRef) {
      observer.observe(currentSectionRef);
    }

    return () => {
      if (currentSectionRef) {
        observer.unobserve(currentSectionRef);
      }
    };
  }, [animationTriggered]);

  return (
    <>
      <section
        ref={sectionRef}
        className="relative m-0 min-h-[350px] w-full overflow-visible border-b border-white/70 bg-black lg:min-h-[600px]"
      >
        {/* Mobile Background - Video Background (full height on mobile) */}
        <div className="absolute inset-0 h-full w-full overflow-hidden lg:hidden">
          <video
            ref={mobileVideoRef}
            className="absolute inset-0 h-full w-full object-cover"
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
            onClick={toggleSound}
            className="absolute right-4 bottom-4 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-all hover:bg-black/70"
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
        </div>

        {/* Mobile Background - Cyber Grid Overlay (full height on mobile) */}
        <div className="absolute inset-0 h-full w-full lg:hidden">
          <div className="h-full w-full bg-black/40">
            <div
              className="h-full w-full"
              style={{
                backgroundImage: `
                linear-gradient(rgba(0, 255, 255, 0.10) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 255, 255, 0.10) 1px, transparent 1px)
              `,
                backgroundSize: "30px 30px",
              }}
            />
          </div>
        </div>

        {/* Responsive Layout - Stacked on Mobile, Two Columns on Desktop */}
        <div className="relative flex flex-col lg:h-[600px] lg:flex-row">
          {/* Left Column - Text Content Only (40% on desktop, full width on mobile) */}
          <div className="relative z-10 flex w-full items-center justify-center px-6 py-8 lg:w-2/5 lg:px-16 lg:py-0">
            <div className="w-full max-w-md space-y-4 lg:min-w-[400px]">
              <div className="space-y-4">
                {/* Animated Ellipse - Hidden on mobile, shown on desktop */}
                <div
                  ref={ellipseRef}
                  className="ellipse hidden lg:block"
                  style={{
                    width: "min(80vw, 80vh)",
                    maxWidth: "450px",
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

                {/* Animated Ellipse for Mobile - Shown only on mobile */}
                <div
                  ref={mobileEllipseRef}
                  className="ellipse lg:hidden"
                  style={{
                    width: "min(80vw, 80vh)",
                    maxWidth: "350px",
                    margin: "0 auto",
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
              </div>
            </div>
          </div>

          {/* Right Column - Video Background (60% on desktop, full width on mobile) */}
          <div className="relative hidden h-auto w-3/5 overflow-hidden lg:block">
            <video
              ref={desktopVideoRef}
              className="absolute inset-0 h-full w-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              onLoadedMetadata={(e) => {
                e.currentTarget.currentTime = 5;
              }}
            >
              <source
                src="https://cdn.shopify.com/videos/c/o/v/fe32cdc9c6694f3b80600c0624b4bf85.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>

            {/* Sound Toggle Button - Desktop */}
            <button
              onClick={toggleSound}
              className="absolute right-4 bottom-4 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-all hover:bg-black/70"
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

            {/* Cyber Grid Overlay - Only on desktop */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `
                  linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
                `,
                  backgroundSize: "50px 50px",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Hero Button Row - Positioned to hang off the bottom on mobile */}
      <div className="xs:-mt-20 relative -mt-8 sm:-mt-16 lg:-mt-8 lg:-mb-6">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex justify-center lg:ml-[-20px] lg:justify-start">
            <HeroButtonRow />
          </div>
        </div>
      </div>
    </>
  );
}

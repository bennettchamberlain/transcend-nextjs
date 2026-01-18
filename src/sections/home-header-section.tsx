import { useRef } from "react";

import { HeroButtonRow } from "./hero-button-row";
import { NavigationSection } from "./navigation-section";

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

export function HomeHeaderSection() {
  const desktopVideoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);

  return (
    <>
      <style>{pulseGlowKeyframes}</style>
      <header className="relative z-50 min-h-[700px] overflow-hidden bg-black pb-1 shadow-sm lg:min-h-[800px] lg:pb-1">
        {/* Navigation */}
        <NavigationSection />

        {/* Video Background - Full Width - Positioned below navigation */}
        <div className="absolute inset-x-0 top-[152px] w-full bg-black lg:top-[152px]" style={{ bottom: "80px" }}>
          {/* Desktop Video */}
          <video
            ref={desktopVideoRef}
            className="absolute inset-0 z-0 hidden h-full w-full object-cover lg:block"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
          >
            <source src="/videos/transcend-home-banner.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Mobile Video */}
          <video
            ref={mobileVideoRef}
            className="absolute inset-0 z-0 h-full w-full object-cover lg:hidden"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
          >
            <source src="/videos/transcend-home-banner.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Glow effect at top of video - z-index to appear above navigation */}
          <div
            className="animate-pulse-glow absolute top-0 right-0 left-0 z-40 h-0.5"
            style={{
              boxShadow: "0 0 20px #dcff07, 0 0 40px #dcff07, 0 0 60px #dcff07",
              background: "linear-gradient(to top, rgba(220, 255, 7, 0.8), transparent)",
              animation: "pulseGlow 2s ease-in-out infinite",
            }}
          ></div>

          {/* Glow effect at bottom of video */}
          <div
            className="animate-pulse-glow absolute right-0 bottom-0 left-0 z-30 h-0.5"
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

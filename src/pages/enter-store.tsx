import { CyberButton } from "@site/snippets";
import { useEffect, useRef, useRouter, useState } from "@site/utilities/deps";

import CyberProgressBar from "../snippets/cyber-progress-bar";

export default function EnterStorePage() {
  const router = useRouter();
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const desktopVideoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Set up video load handlers for both desktop and mobile videos
    const desktopVideo = desktopVideoRef.current;
    const mobileVideo = mobileVideoRef.current;

    const handleVideoLoad = (video: HTMLVideoElement) => {
      setIsVideoLoaded(true);
      // Fade in the video
      if (window.gsap) {
        window.gsap.fromTo(
          video,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 1.5,
            ease: "power2.out",
          },
        );
      }
    };

    const handleDesktopLoad = () => handleVideoLoad(desktopVideo!);
    const handleMobileLoad = () => handleVideoLoad(mobileVideo!);

    if (desktopVideo) {
      desktopVideo.addEventListener("loadeddata", handleDesktopLoad);
      desktopVideo.addEventListener("canplaythrough", handleDesktopLoad);
    }

    if (mobileVideo) {
      mobileVideo.addEventListener("loadeddata", handleMobileLoad);
      mobileVideo.addEventListener("canplaythrough", handleMobileLoad);
    }

    return () => {
      if (desktopVideo) {
        desktopVideo.removeEventListener("loadeddata", handleDesktopLoad);
        desktopVideo.removeEventListener("canplaythrough", handleDesktopLoad);
      }
      if (mobileVideo) {
        mobileVideo.removeEventListener("loadeddata", handleMobileLoad);
        mobileVideo.removeEventListener("canplaythrough", handleMobileLoad);
      }
    };
  }, []);

  const handleEnterStore = () => {
    if (window.gsap && containerRef.current) {
      // Smooth transition out
      window.gsap.to(containerRef.current, {
        opacity: 0,
        scale: 0.95,
        duration: 0.8,
        ease: "power2.inOut",
        onComplete: () => {
          router.push("/store");
        },
      });
    } else {
      router.push("/store");
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative flex min-h-screen w-full cursor-pointer items-end justify-center overflow-hidden bg-black"
      onClick={handleEnterStore}
    >
      {/* Video Background */}
      <div className="absolute inset-0 h-full w-full">
        {/* Desktop Video */}
        <video
          ref={desktopVideoRef}
          className="hidden h-full w-full object-cover opacity-0 lg:block"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source src="/videos/TRANSCEND 2.0 Lockup Intro.mp4" type="video/mp4" />
        </video>

        {/* Mobile Video */}
        <video
          ref={mobileVideoRef}
          className="h-full w-full object-cover opacity-0 lg:hidden"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source src="/videos/TRANSCEND 2.0 Vertical Lockup.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[0.5px]" />

      {/* Cyber Grid Overlay */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Enter Store Button - Fixed from top on desktop, bottom on mobile */}
      <div className="fixed bottom-20 left-1/2 z-10 -translate-x-1/2 transform md:top-82 lg:top-82 xl:top-82">
        <div className="relative">
          {/* Glowing background effect */}
          <div
            className="absolute -inset-1 animate-pulse bg-gradient-to-r from-green-400/20 via-cyan-400/20 to-purple-400/20 blur-xl"
            style={{
              clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))",
            }}
          ></div>

          <div
            className="relative bg-black/80 p-1 backdrop-blur-sm"
            style={{
              clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))",
            }}
          >
            {/* Custom beveled borders */}
            <div className="pointer-events-none absolute inset-0">
              {/* Top border */}
              <div className="absolute top-0 right-[10px] left-0 h-[1px] bg-gray-700"></div>
              {/* Right border */}
              <div className="absolute top-[10px] right-0 bottom-0 w-[1px] bg-gray-700"></div>
              {/* Bottom border */}
              <div className="absolute right-0 bottom-0 left-[10px] h-[1px] bg-gray-700"></div>
              {/* Left border */}
              <div className="absolute top-0 bottom-[10px] left-0 w-[1px] bg-gray-700"></div>

              {/* Top-right beveled corner line */}
              <div className="absolute top-0 right-[-4px] h-[1px] w-[14px] origin-top-left rotate-45 transform bg-gray-700"></div>
              {/* Bottom-left beveled corner line */}
              <div className="absolute top-[35px] right-[134px] h-[1px] w-[14px] origin-top-left rotate-45 transform bg-gray-700"></div>

              {/* White border overlays */}
              <div className="absolute top-0 right-[10px] left-0 h-[1px] bg-white opacity-30"></div>
              <div className="absolute top-[10px] right-0 bottom-0 w-[1px] bg-white opacity-30"></div>
              <div className="absolute right-0 bottom-0 left-[10px] h-[1px] bg-white opacity-30"></div>
              <div className="absolute top-0 bottom-[10px] left-0 w-[1px] bg-white opacity-30"></div>

              {/* White beveled corner lines */}
              <div className="absolute top-0 right-[-5px] h-[1px] w-[14px] origin-top-left rotate-45 transform bg-white opacity-30"></div>
              <div className="absolute bottom-0 left-[10px] h-[1px] w-[14px] origin-bottom-right -rotate-45 transform bg-white opacity-30"></div>
            </div>
            <div className="flex items-center gap-2 px-2 py-1">
              <CyberButton
                type={3}
                size={30}
                color="#00ff88"
                onClick={handleEnterStore}
                className="cyber-enter-button"
              />
              <span className="text-xs font-bold tracking-wider text-white">ENTER STORE</span>
            </div>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {!isVideoLoaded && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black">
          <div className="text-center">
            <div className="mb-6 flex justify-center">
              <CyberProgressBar color="#00ff88" size={120} type={3} className="cyber-loading-progress" />
            </div>
            <p className="text-lg text-white">Loading Experience...</p>
            <p className="mt-2 text-sm text-gray-400">Preparing your journey into the future</p>
          </div>
        </div>
      )}

      <style jsx>{`
        .cyber-enter-button {
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .cyber-enter-button:hover {
          transform: scale(1.05);
        }

        @media (max-width: 1024px) {
          .cyber-enter-button {
            transform: scale(0.8);
          }
        }

        :global(.cyber-loading-progress) {
          position: static !important;
          bottom: auto !important;
          right: auto !important;
          z-index: auto !important;
        }
      `}</style>
    </div>
  );
}

import { useEffect, useRef } from "react";

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
  const timeoutIdsRef = useRef<NodeJS.Timeout[]>([]);
  const retryPlayHandlersRef = useRef<Array<() => void>>([]);

  // Force play videos even in low power mode
  useEffect(() => {
    const playVideo = async (video: HTMLVideoElement | null) => {
      if (!video) {
        return;
      }

      try {
        const playPromise = video.play();
        if (playPromise !== undefined) {
          await playPromise;
        }
      } catch {
        const timeoutId = setTimeout(() => {
          video.play().catch(() => {
            const retryPlay = () => {
              video.play().catch(() => {});
              document.removeEventListener("touchstart", retryPlay);
              document.removeEventListener("click", retryPlay);
            };
            retryPlayHandlersRef.current.push(retryPlay);
            document.addEventListener("touchstart", retryPlay, { once: true });
            document.addEventListener("click", retryPlay, { once: true });
          });
        }, 100);
        timeoutIdsRef.current.push(timeoutId);
      }
    };

    // Play desktop video
    if (desktopVideoRef.current) {
      playVideo(desktopVideoRef.current);
    }

    // Play mobile video
    if (mobileVideoRef.current) {
      playVideo(mobileVideoRef.current);
    }

    // Retry play on video load events
    const desktopVideo = desktopVideoRef.current;
    const mobileVideo = mobileVideoRef.current;

    const handleDesktopLoaded = () => {
      playVideo(desktopVideo);
    };

    const handleMobileLoaded = () => {
      playVideo(mobileVideo);
    };

    desktopVideo?.addEventListener("loadeddata", handleDesktopLoaded);
    mobileVideo?.addEventListener("loadeddata", handleMobileLoaded);

    // Also retry on canplay event
    desktopVideo?.addEventListener("canplay", handleDesktopLoaded);
    mobileVideo?.addEventListener("canplay", handleMobileLoaded);

    return () => {
      // Cleanup timeouts
      timeoutIdsRef.current.forEach((id) => {
        clearTimeout(id);
      });
      timeoutIdsRef.current = [];
      // Cleanup event listeners
      retryPlayHandlersRef.current.forEach((handler) => {
        document.removeEventListener("touchstart", handler);
        document.removeEventListener("click", handler);
      });
      retryPlayHandlersRef.current = [];
      desktopVideo?.removeEventListener("loadeddata", handleDesktopLoaded);
      mobileVideo?.removeEventListener("loadeddata", handleMobileLoaded);
      desktopVideo?.removeEventListener("canplay", handleDesktopLoaded);
      mobileVideo?.removeEventListener("canplay", handleMobileLoaded);
    };
  }, []);

  return (
    <>
      <style>{pulseGlowKeyframes}</style>
      <header className="relative z-50 min-h-[700px] overflow-hidden bg-black pb-1 shadow-sm lg:min-h-[800px] lg:pb-1">
        {/* Navigation */}
        <NavigationSection />

        {/* Video Background - Full Width - Positioned below navigation */}
        <div className="absolute inset-x-0 top-[152px] w-full lg:top-[152px]" style={{ bottom: "80px" }}>
          {/* Desktop Video */}
          <video
            ref={desktopVideoRef}
            className="absolute inset-0 hidden h-full w-full object-cover lg:block"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            onLoadedMetadata={(e) => {
              e.currentTarget.currentTime = 5;
              // Force play after setting currentTime
              e.currentTarget.play().catch(() => {
                // Retry play if it fails
              });
            }}
            onCanPlay={(e) => {
              e.currentTarget.play().catch(() => {
                // Retry play if it fails
              });
            }}
            onError={(e) => {
              const error = e.currentTarget.error;
              console.error("Desktop video error:", {
                code: error?.code,
                message: error?.message,
                MEDIA_ERR_ABORTED: error?.code === MediaError.MEDIA_ERR_ABORTED,
                MEDIA_ERR_NETWORK: error?.code === MediaError.MEDIA_ERR_NETWORK,
                MEDIA_ERR_DECODE: error?.code === MediaError.MEDIA_ERR_DECODE,
                MEDIA_ERR_SRC_NOT_SUPPORTED: error?.code === MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED,
              });
            }}
          >
            {/* Try MP4 first (better browser support) */}
            <source src="https://cdn.shopify.com/videos/c/o/v/c701a320de2b4149aae2c157dd695596.mp4" type="video/mp4" />
            {/* Fallback to MOV if MP4 doesn't exist */}
            <source
              src="https://cdn.shopify.com/videos/c/o/v/c701a320de2b4149aae2c157dd695596.mov"
              type="video/quicktime"
            />
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
            preload="auto"
            onLoadedMetadata={(e) => {
              e.currentTarget.currentTime = 5;
              // Force play after setting currentTime
              e.currentTarget.play().catch(() => {
                // Retry play if it fails
              });
            }}
            onCanPlay={(e) => {
              e.currentTarget.play().catch(() => {
                // Retry play if it fails
              });
            }}
            onError={(e) => {
              const error = e.currentTarget.error;
              console.error("Mobile video error:", {
                code: error?.code,
                message: error?.message,
                MEDIA_ERR_ABORTED: error?.code === MediaError.MEDIA_ERR_ABORTED,
                MEDIA_ERR_NETWORK: error?.code === MediaError.MEDIA_ERR_NETWORK,
                MEDIA_ERR_DECODE: error?.code === MediaError.MEDIA_ERR_DECODE,
                MEDIA_ERR_SRC_NOT_SUPPORTED: error?.code === MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED,
              });
            }}
          >
            {/* Try MP4 first (better browser support) */}
            <source src="https://cdn.shopify.com/videos/c/o/v/ac7b0dedafcb44a6b311e539ef87591e.mp4" type="video/mp4" />
            {/* Fallback to MOV if MP4 doesn't exist */}
            <source
              src="https://cdn.shopify.com/videos/c/o/v/ac7b0dedafcb44a6b311e539ef87591e.mov"
              type="video/quicktime"
            />
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

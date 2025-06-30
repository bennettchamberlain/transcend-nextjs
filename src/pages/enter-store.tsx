import { useEffect, useState, useRef, useRouter } from "@site/utilities/deps";
import { CyberButton } from "@site/snippets";

export default function EnterStorePage() {
  const router = useRouter();
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Set up video load handler
    const video = videoRef.current;
    if (video) {
      const handleVideoLoad = () => {
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
              onComplete: () => {
                setShowContent(true);
              }
            }
          );
        }
      };

      video.addEventListener('loadeddata', handleVideoLoad);
      video.addEventListener('canplaythrough', handleVideoLoad);

      return () => {
        video.removeEventListener('loadeddata', handleVideoLoad);
        video.removeEventListener('canplaythrough', handleVideoLoad);
      };
    }
  }, []);

  useEffect(() => {
    if (showContent && window.gsap && contentRef.current) {
      // Animate content entrance
      const tl = window.gsap.timeline();
      
      tl.fromTo(
        contentRef.current.querySelector('.brand-tagline'),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
      )
      .fromTo(
        contentRef.current.querySelector('.social-proof'),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.5"
      )
      .fromTo(
        contentRef.current.querySelector('.value-props'),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.3"
      )
      .fromTo(
        contentRef.current.querySelector('.enter-button-container'),
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1, ease: "back.out(1.7)" },
        "-=0.2"
      );
    }
  }, [showContent]);

  const handleEnterStore = () => {
    if (window.gsap && containerRef.current) {
      // Smooth transition out
      window.gsap.to(containerRef.current, {
        opacity: 0,
        scale: 0.95,
        duration: 0.8,
        ease: "power2.inOut",
        onComplete: () => {
          router.push('/store');
        }
      });
    } else {
      router.push('/store');
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden bg-black flex items-center justify-center"
    >
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        {/* Desktop Video */}
        <video
          ref={videoRef}
          className="hidden lg:block w-full h-full object-cover opacity-0"
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
          className="lg:hidden w-full h-full object-cover opacity-0"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onLoadedData={() => setIsVideoLoaded(true)}
          onCanPlayThrough={() => setIsVideoLoaded(true)}
        >
          <source src="/videos/TRANSCEND 2.0 Vertical Lockup.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[0.5px]" />

      {/* Cyber Grid Overlay */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Content */}
      {showContent && (
        <div 
          ref={contentRef}
          className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-12 text-center"
        >
          {/* Brand Tagline */}
          <div className="brand-tagline mb-8 opacity-0">
            <h1 className="text-4xl lg:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-green-400 via-emerald-500 to-lime-400 bg-clip-text text-transparent">
                TRANSCEND
              </span>
              <br />
              <span className="text-white">THE ORDINARY</span>
            </h1>
            <p className="text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Where digital meets fashion. Evolve your style with designs crafted for the future.
            </p>
          </div>

          {/* Social Proof */}
          <div className="social-proof mb-8 opacity-0">
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>10K+ Digital Natives</span>
              </div>
              <div className="w-px h-4 bg-gray-600"></div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                <span>Limited Drops</span>
              </div>
              <div className="w-px h-4 bg-gray-600"></div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                <span>Exclusive Access</span>
              </div>
            </div>
          </div>

          {/* Value Propositions */}
          <div className="value-props mb-12 opacity-0">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-4xl mx-auto text-sm">
              <div className="border border-gray-700 bg-black/50 backdrop-blur-sm rounded-lg p-4">
                <div className="text-green-400 font-bold mb-2">⚡ INSTANT ACCESS</div>
                <p className="text-gray-300">Skip the queue. First access to limited drops and exclusive pieces.</p>
              </div>
              <div className="border border-gray-700 bg-black/50 backdrop-blur-sm rounded-lg p-4">
                <div className="text-cyan-400 font-bold mb-2">🎯 CURATED FOR YOU</div>
                <p className="text-gray-300">AI-powered recommendations based on your digital footprint.</p>
              </div>
              <div className="border border-gray-700 bg-black/50 backdrop-blur-sm rounded-lg p-4">
                <div className="text-purple-400 font-bold mb-2">🚀 FUTURE READY</div>
                <p className="text-gray-300">Designs that adapt to tomorrow's world. Be ahead of the curve.</p>
              </div>
            </div>
          </div>

          {/* Enter Store Button */}
          <div className="enter-button-container opacity-0">
            <div className="relative">
              {/* Glowing background effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-green-400/20 via-cyan-400/20 to-purple-400/20 rounded-full blur-xl animate-pulse"></div>
              
              <div className="relative bg-black/80 backdrop-blur-sm rounded-full p-2 border border-gray-700">
                <CyberButton
                  type={3}
                  size={120}
                  color="#00ff88"
                  onClick={handleEnterStore}
                  className="cyber-enter-button"
                />
              </div>
              
              <div className="mt-4 text-center">
                <span className="text-white font-bold text-lg tracking-wider">ENTER STORE</span>
                <div className="text-xs text-gray-400 mt-1">
                  Join the digital fashion revolution
                </div>
              </div>
            </div>
          </div>

          {/* Bottom CTA Elements */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="flex items-center space-x-4 text-xs text-gray-500">
              <span>Free worldwide shipping on orders over $100</span>
              <div className="w-px h-3 bg-gray-600"></div>
              <span>30-day returns</span>
              <div className="w-px h-3 bg-gray-600"></div>
              <span>Secure checkout</span>
            </div>
          </div>
        </div>
      )}

      {/* Loading State */}
      {!isVideoLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-black z-20">
          <div className="text-center">
            <div className="w-16 h-16 border-2 border-green-400 border-t-transparent rounded-full animate-spin mb-4 mx-auto"></div>
            <p className="text-white text-lg">Loading Experience...</p>
            <p className="text-gray-400 text-sm mt-2">Preparing your journey into the future</p>
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
      `}</style>
    </div>
  );
}
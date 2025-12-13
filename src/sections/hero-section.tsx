import { useRef } from "react";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

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

  return (
    <>
      <section ref={sectionRef} className="relative z-40 m-0 w-full overflow-visible bg-black">
        {/* Empty section - content removed */}
      </section>
    </>
  );
}

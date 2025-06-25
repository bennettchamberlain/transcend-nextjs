import { NextLink } from "@site/utilities/deps";
import { Zap, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { HeroButtonRow } from "./hero-button-row";

export function HeroSection() {
  const ellipseRef = useRef<HTMLDivElement>(null);
  const mobileEllipseRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [animationTriggered, setAnimationTriggered] = useState(false);

  useEffect(() => {
    const createAnimation = ({
      duration = 21,
      reversed = false,
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
      if (animationTriggered) return;

      // Apply animation to desktop ellipse
      if (ellipseRef.current && window.gsap) {
        createAnimation({
          duration: 21,
          reversed: true,
          target: ellipseRef.current.querySelector("svg")!,
          text: "Intelligent Design for Digital Minds. Evolve.",
          textProperties: { fontSize: /iPhone/.test(navigator.userAgent) ? "19px" : "17px" },
        });
      }

      // Apply animation to mobile ellipse
      if (mobileEllipseRef.current && window.gsap) {
        createAnimation({
          duration: 21,
          reversed: true,
          target: mobileEllipseRef.current.querySelector("svg")!,
          text: "Intelligent Design for Digital Minds. Evolve.",
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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [animationTriggered]);

  return (
    <>
      <section
        ref={sectionRef}
        className="relative m-0 min-h-[500px] w-full overflow-visible border-b-2 border-white bg-black lg:min-h-[600px]"
      >
        {/* Mobile Background - Hero Image (full height on mobile) */}
        <div className="absolute inset-0 h-[500px] w-full overflow-hidden lg:hidden">
          <div
            className="h-full w-full bg-cover bg-center"
            style={{
              backgroundImage: "url(/images/hero.JPG)",
              backgroundPosition: "center center",
              backgroundSize: "cover",
              filter: "saturate(1.3)",
            }}
          />
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

        {/* Mobile Darkened Overlay - positioned above image but below text */}
        <div className="absolute inset-0 z-100 lg:hidden"></div>

        {/* Responsive Layout - Stacked on Mobile, Two Columns on Desktop */}
        <div className="relative flex flex-col lg:h-[600px] lg:flex-row">
          {/* Left Column - Text Content Only (40% on desktop, full width on mobile) */}
          <div className="relative z-10 flex w-full items-center justify-center px-6 py-8 lg:w-2/5 lg:px-16 lg:py-0">
            <div className="w-full max-w-md space-y-4 lg:min-w-[400px]">
              <div className="space-y-4">
                <h1 className="text-center text-4xl leading-tight font-bold text-white lg:text-left lg:text-5xl">
                  <span className="bg-gradient-to-r from-green-400 via-emerald-500 to-lime-400 bg-clip-text text-transparent">
                    Intelligent
                  </span>
                  <br />
                  <span className="text-white">Design</span>
                </h1>

                {/* Animated Ellipse - Hidden on mobile, shown on desktop */}
                <div
                  ref={ellipseRef}
                  className="ellipse hidden lg:block"
                  style={{
                    width: "min(63vw, 63vh)",
                    maxWidth: "300px",
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
                    width: "min(63vw, 63vh)",
                    maxWidth: "250px",
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

          {/* Right Column - Hero Image (60% on desktop, full width on mobile) */}
          <div className="relative hidden h-auto w-3/5 overflow-hidden lg:block">
            <div
              className="absolute inset-0 bg-cover bg-center object-cover"
              style={{
                backgroundImage: "url(/images/hero.JPG)",
                backgroundPosition: "left center",
                backgroundSize: "cover",
                filter: "saturate(1.3)",
              }}
            />

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
        <HeroButtonRow />
      </div>
    </>
  );
}

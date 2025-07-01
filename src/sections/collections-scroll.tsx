"use client";

import { ChevronLeft, ChevronRight, Zap } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import { storefront } from "@site/utilities/storefront";

interface CollectionsScrollProps {
  collections: {
    id: string;
    handle: string;
    title: string;
    description: string;
    image?: {
      url: string;
      altText?: string | null;
      width?: number | null;
      height?: number | null;
    } | null;
  }[];
}

export async function fetchCollections() {
  try {
    const { collections } = await storefront.query({
      collections: [
        { first: 10 },
        {
          nodes: {
            id: true,
            handle: true,
            title: true,
            description: [{ truncateAt: 200 }, true],
            image: {
              url: [{ transform: { maxWidth: 500 } }, true],
              altText: true,
              width: true,
              height: true,
            },
          },
        },
      ],
    });

    return collections?.nodes || [];
  } catch (error) {
    console.error("Error fetching collections:", error);
    return [];
  }
}

export function CollectionsScroll({ collections }: CollectionsScrollProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [isAnimated, setIsAnimated] = useState(false);
  const [displayText, setDisplayText] = useState("COLLECTIONS");

  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const targetText = "COLLECTIONS";

  const triggerAnimation = useCallback(() => {
    let iterations = 0;
    const interval = setInterval(() => {
      setDisplayText(
        targetText
          .split("")
          .map((_, index) => {
            if (index <= iterations + 1) {
              return targetText[index];
            }
            return letters[Math.floor(Math.random() * letters.length)];
          })
          .join(""),
      );

      if (iterations >= targetText.length) {
        clearInterval(interval);
        setDisplayText(targetText);
      }

      iterations += 1 / 3;
    }, 30);
  }, [targetText, letters]);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Apply initial scroll offset
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = 70; // Small initial scroll
    }
  }, []);

  // Scroll-triggered animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isAnimated) {
            setIsAnimated(true);
            triggerAnimation();
          }
        });
      },
      {
        threshold: 0.5, // Trigger when 50% of the element is visible
        rootMargin: "0px 0px -400px 0px", // Trigger slightly before center
      },
    );

    const currentTitleRef = titleRef.current;
    if (currentTitleRef) {
      observer.observe(currentTitleRef);
    }

    return () => {
      if (currentTitleRef) {
        observer.unobserve(currentTitleRef);
      }
    };
  }, [isAnimated, triggerAnimation]);

  // Handle case where collections is undefined or null
  const safeCollections = collections || [];

  // Don't render anything if there are no collections
  if (safeCollections.length === 0) {
    return null;
  }

  return (
    <div className="bg-dark-gradient relative pt-10 pb-2 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-right">
          <h2
            ref={titleRef}
            className="mb-4 cursor-pointer text-4xl font-black text-white transition-all duration-200 md:text-5xl"
            style={{ fontFamily: "Modeseven", fontWeight: "900" }}
          >
            {/* <span className="text-neon-green neon-glow" style={{ fontFamily: "AOMono", fontWeight: "900" }}>
              {displayText}
            </span> */}
            {displayText}
          </h2>
        </div>

        <div className="relative">
          {/* Left Scroll Button */}
          <button
            type="button"
            onClick={() => scroll("left")}
            className="bg-card-bg/80 border-border-color hover:border-neon-green hover:text-neon-green hover:bg-card-bg glass-effect group hover:shadow-neon-green/20 absolute top-8 left-4 z-10 flex h-14 w-14 items-center justify-center rounded-full border backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:shadow-lg"
          >
            <ChevronLeft className="h-7 w-7 transition-all duration-200 group-hover:-translate-x-1 group-hover:scale-110" />
          </button>

          {/* Collections Scroll */}
          <div ref={scrollRef} className="scrollbar-hide flex space-x-6 overflow-x-auto px-20 pb-8">
            {safeCollections.map((collection, index) => (
              <Link
                key={collection.id}
                href={`/collections/${collection.handle}`}
                className="group w-[280px] flex-none"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div
                  className="tech-card relative h-80 overflow-hidden"
                  style={{
                    clipPath: "polygon(0 0, calc(100% - 18px) 0, 100% 18px, 100% 100%, 0 100%)",
                  }}
                >
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    {collection.image ? (
                      <img
                        src={collection.image.url}
                        alt={collection.image.altText || collection.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="bg-darker-bg flex h-full w-full items-center justify-center">
                        <Zap className="text-neon-green/50 h-12 w-12" />
                      </div>
                    )}

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="relative flex h-full flex-col justify-end p-6">
                    {/* <h3
                      className="group-hover:text-neon-green mb-2 text-2xl font-black text-white transition-colors duration-200"
                      style={{ fontFamily: "nt1972" }}
                    >
                      {collection.title}
                    </h3> */}

                    <p className="mb-4 line-clamp-2 text-sm text-gray-300" style={{ fontFamily: "Modeseven" }}>
                      {collection.title || "Discover cutting-edge fashion technology"}
                    </p>

                    {/* Explore Button */}
                    <div className="text-neon-green flex items-center text-sm font-bold tracking-wider uppercase transition-transform duration-200">
                      Explore Collection
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </div>
                  </div>

                  <div
                    className="absolute inset-0 border border-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      clipPath: "polygon(0 0, calc(100% - 19px) 0, 100% 18px, 100% 100%, 0 100%)",
                    }}
                  />
                </div>
              </Link>
            ))}
          </div>

          {/* Right Scroll Button */}
          <button
            type="button"
            onClick={() => scroll("right")}
            className="bg-card-bg/80 border-border-color hover:border-neon-green hover:text-neon-green hover:bg-card-bg glass-effect group hover:shadow-neon-green/20 absolute top-8 right-4 z-10 flex h-14 w-14 items-center justify-center rounded-full border backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:shadow-lg"
          >
            <ChevronRight className="h-7 w-7 transition-all duration-200 group-hover:translate-x-1 group-hover:scale-110" />
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-8 flex justify-center">
          <div className="flex space-x-2">
            {safeCollections.map((collection) => (
              <div key={collection.id} className="bg-border-color h-2 w-2 rounded-full transition-all duration-300" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

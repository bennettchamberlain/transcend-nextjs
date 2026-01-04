"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import type { Collection } from "@site/utilities/collections";

import { NextImage, NextLink } from "@site/utilities/deps";

interface CollectionsPageHeroProps {
  collections: Collection[];
}

export function CollectionsPageHero({ collections }: CollectionsPageHeroProps) {
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
        threshold: 0.5,
        rootMargin: "0px 0px -400px 0px",
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

  // Define the desired order for collections
  const collectionOrder = ["2-0", "tops", "hoodies-crewnecl", "bottom", "home-page", "art"];

  // Sort collections based on the defined order
  const sortedCollections = safeCollections.sort((a, b) => {
    const aIndex = collectionOrder.indexOf(a.handle.toLowerCase());
    const bIndex = collectionOrder.indexOf(b.handle.toLowerCase());

    // If both collections are in the order list, sort by their position
    if (aIndex !== -1 && bIndex !== -1) {
      return aIndex - bIndex;
    }

    // If only one is in the order list, prioritize it
    if (aIndex !== -1) {
      return -1;
    }
    if (bIndex !== -1) {
      return 1;
    }

    // If neither is in the order list, maintain original order
    return 0;
  });

  // Don't render anything if there are no collections
  if (safeCollections.length === 0) {
    return null;
  }

  return (
    <section className="bg-black">
      {/* Animated Title - Centered in container */}
      <div className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2
            ref={titleRef}
            className="mb-4 cursor-pointer text-4xl font-black text-white transition-all duration-200 md:text-5xl lg:text-6xl"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            <span className="text-neon-green neon-glow" style={{ fontFamily: "AOMono" }}>
              {displayText}
            </span>
          </h2>
        </div>
      </div>

      {/* Collections List - Full Width Banners */}
      <div className="space-y-6 pb-16">
          {sortedCollections.map((collection) => (
            <NextLink
              key={collection.id}
              href={`/collections/${collection.handle}`}
              className="group block"
            >
              <div className="relative w-full overflow-hidden">
                {/* Collection Banner Image */}
                {collection.image ? (
                  <div className="relative h-[400px] w-full overflow-hidden md:h-[500px] lg:h-[600px]">
                    <NextImage
                      src={collection.image.url}
                      alt={collection.image.altText || collection.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="100vw"
                      quality={90}
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                    
                    {/* Content Overlay */}
                    <div className="absolute inset-0 flex flex-col justify-end">
                      <div className="mx-auto w-full max-w-7xl px-4 pb-8 sm:px-6 md:pb-12 lg:px-8 lg:pb-16">
                        <h3
                          className="mb-4 text-2xl font-bold text-white transition-colors duration-200 md:text-3xl lg:text-4xl group-hover:text-[#dcff07]"
                          style={{ fontFamily: "Shapiro" }}
                        >
                          {(() => {
                            const title = collection.title || "Collection";
                            // Check if title starts with [ and ends with ]
                            if (title.startsWith("[") && title.endsWith("]")) {
                              const bracketStart = title[0];
                              const bracketEnd = title[title.length - 1];
                              const name = title.slice(1, -1);
                              return (
                                <>
                                  <span style={{ fontFamily: "AOMono" }}>{bracketStart}</span>
                                  {name}
                                  <span style={{ fontFamily: "AOMono" }}>{bracketEnd}</span>
                                </>
                              );
                            }
                            return title;
                          })()}
                        </h3>
                        
                        {collection.description && (
                          <p
                            className="mb-6 max-w-2xl text-lg text-gray-300 line-clamp-2"
                            style={{ fontFamily: "AOMono" }}
                          >
                            {collection.description}
                          </p>
                        )}
                        
                        {/* Explore Button */}
                        <div className="flex items-center text-[#dcff07] transition-transform duration-200 group-hover:translate-x-2">
                          <span
                            className="text-sm font-bold uppercase tracking-wider"
                            style={{ fontFamily: "Modeseven" }}
                          >
                            Explore Collection
                          </span>
                          <svg
                            className="ml-2 h-5 w-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                    
                    {/* Border on hover */}
                    <div className="absolute inset-0 border-2 border-[#dcff07] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>
                ) : (
                  <div className="flex h-[400px] w-full items-center justify-center bg-gray-900 md:h-[500px] lg:h-[600px]">
                    <div className="text-center">
                      <h3
                        className="mb-2 text-2xl font-bold text-white md:text-3xl"
                        style={{ fontFamily: "Shapiro" }}
                      >
                        {collection.title}
                      </h3>
                      <p className="text-gray-400" style={{ fontFamily: "AOMono" }}>
                        No image available
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </NextLink>
          ))}
      </div>
    </section>
  );
}

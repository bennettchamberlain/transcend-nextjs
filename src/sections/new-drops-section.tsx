import { Money, ProductProvider } from "@shopify/hydrogen-react";
import { useCallback, useEffect, useRef, useState } from "react";

import type { DataProps } from "@site/utilities/deps";

import { NextImage, NextLink } from "@site/utilities/deps";
import { storefront } from "@site/utilities/storefront";

export async function fetchNewDropsSection(cursor?: string) {
  try {
    const { collection } = await storefront.query({
      collection: [
        { handle: "2-0" },
        {
          id: true,
          handle: true,
          title: true,
          products: [
            { first: 12, after: cursor || null },
            {
              pageInfo: {
                hasNextPage: true,
              },
              edges: {
                cursor: true,
                node: {
                  handle: true,
                  title: true,
                  priceRange: {
                    minVariantPrice: {
                      amount: true,
                      currencyCode: true,
                    },
                  },
                  featuredImage: {
                    url: [{ transform: { maxWidth: 1200, maxHeight: 1200, scale: 2 } }, true],
                    altText: true,
                    width: true,
                    height: true,
                  },
                  images: [
                    { first: 2 },
                    {
                      nodes: {
                        url: [{ transform: { maxWidth: 1200, maxHeight: 1200, scale: 2 } }, true],
                        altText: true,
                        width: true,
                        height: true,
                      },
                    },
                  ],
                  options: [
                    { first: 250 },
                    {
                      id: true,
                      name: true,
                      values: true,
                    },
                  ],
                  variants: [
                    { first: 1 },
                    {
                      nodes: {
                        id: true,
                        availableForSale: true,
                        priceV2: {
                          amount: true,
                          currencyCode: true,
                        },
                        selectedOptions: {
                          name: true,
                          value: true,
                        },
                        image: {
                          id: true,
                        },
                      },
                    },
                  ],
                },
              },
            },
          ],
        },
      ],
    });

    if (!collection) {
      console.error("Collection '2-0' not found");
      return null;
    }

    return collection.products;
  } catch (error) {
    console.error("Error fetching 2-0 collection:", error);
    return null;
  }
}

export function NewDropsSection(props: DataProps<typeof fetchNewDropsSection>) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const [isAnimated, setIsAnimated] = useState(false);
  const [displayText, setDisplayText] = useState("NEW DROPS");
  const [pages, setPages] = useState([props.data || { edges: [], pageInfo: { hasNextPage: false } }]);
  const [imageStates, setImageStates] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(false);

  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const targetText = "NEW DROPS";

  const triggerAnimation = useCallback(() => {
    let iterations = 0;
    const interval = setInterval(() => {
      setDisplayText(
        targetText
          .split("")
          .map((letter, index) => {
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

  const lastPage = pages[pages.length - 1];
  const lastCursor = lastPage.edges[lastPage.edges.length - 1]?.cursor;
  const hasNextPage = lastPage.pageInfo.hasNextPage;

  const loadMore = useCallback(async () => {
    if (isLoading || !hasNextPage) {
      return;
    }

    setIsLoading(true);
    try {
      const productList = await fetchNewDropsSection(lastCursor);
      if (productList) {
        setPages([...pages, productList]);
      }
    } catch (error) {
      console.error("Error loading more products:", error);
    } finally {
      setIsLoading(false);
    }
  }, [lastCursor, pages, hasNextPage, isLoading]);

  // Auto-load more when scrolling near bottom
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && hasNextPage && !isLoading) {
            loadMore();
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of the load more area is visible
        rootMargin: "100px", // Start loading 100px before reaching the bottom
      },
    );

    const currentLoadMoreRef = loadMoreRef.current;
    if (currentLoadMoreRef && hasNextPage) {
      observer.observe(currentLoadMoreRef);
    }

    return () => {
      if (currentLoadMoreRef) {
        observer.unobserve(currentLoadMoreRef);
      }
    };
  }, [hasNextPage, isLoading, loadMore]);

  const toggleImage = (productHandle: string, hasSecondImage: boolean) => {
    if (!hasSecondImage) {
      return;
    }

    setImageStates((prev) => ({
      ...prev,
      [productHandle]: prev[productHandle] === 1 ? 0 : 1,
    }));
  };

  // Handle case where collection doesn't exist
  if (!props.data) {
    return (
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-4 md:mb-8">
          <h2
            ref={titleRef}
            className="mb-4 cursor-pointer text-4xl font-black text-white transition-all duration-200 md:text-5xl"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            <span className="text-neon-green neon-glow">{displayText}</span>
          </h2>
          <p className="text-gray-300" style={{ fontFamily: "Shapiro", letterSpacing: "1px" }}>
            LATEST DROPS - THE NEWEST ARRIVALS
          </p>
        </div>
        <p className="text-gray-300">No products found in 2-0 collection.</p>
      </section>
    );
  }

  return (
    <section className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-30">
      <div className="mb-4 md:mb-8">
        <h2
          ref={titleRef}
          className="mb-4 cursor-pointer text-5xl font-black text-white uppercase transition-all duration-200 md:text-6xl lg:text-7xl"
          style={{ fontFamily: "Modeseven", fontWeight: "900", letterSpacing: "-1px" }}
        >
          <span className="text-neon-green neon-glow">{displayText}</span>
        </h2>
        <p className="text-gray-300 uppercase" style={{ fontFamily: "Shapiro", letterSpacing: "1px" }}>
          LATEST DROPS - THE NEWEST ARRIVALS
        </p>
      </div>

      <div className="mb-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {pages
          .flatMap(({ edges }) => edges)
          .map(({ node }) => {
            const images = node.images?.nodes || [];
            const firstImage = images[0] || node.featuredImage;
            const secondImage = images[1];
            const hasSecondImage = !!secondImage;
            const currentImageIndex = imageStates[node.handle] || 0;
            const currentImage = currentImageIndex === 1 && secondImage ? secondImage : firstImage;
            const nextImage = currentImageIndex === 0 && secondImage ? secondImage : firstImage;

            return (
              <ProductProvider key={node.handle} data={node}>
                <div className="group">
                  <NextLink href={`/products/${node.handle}`} className="block">
                    <div
                      className="relative w-full overflow-hidden bg-gray-800"
                      style={{
                        clipPath: "polygon(18px 0, 100% 0, 100% calc(100% - 18px), calc(100% - 18px) 100%, 0 100%, 0 18px)",
                      }}
                    >
                      {/* Hover glow border overlay */}
                      <div
                        className="product-card-glow-overlay absolute inset-0 z-10"
                        style={{
                          clipPath: "polygon(18px 0, 100% 0, 100% calc(100% - 18px), calc(100% - 18px) 100%, 0 100%, 0 18px)",
                          border: "1px solid transparent",
                        }}
                      />
                      {/* Mobile-only image toggle button */}
                      {hasSecondImage && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleImage(node.handle, hasSecondImage);
                          }}
                          className="absolute top-2 right-2 z-10 block bg-black/50 p-1 text-white backdrop-blur-sm transition-all hover:bg-black/70 sm:hidden"
                        >
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M23 4v6h-6" />
                            <path d="M1 20v-6h6" />
                            <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" />
                          </svg>
                        </button>
                      )}

                      <NextImage
                        src={currentImage!.url as string}
                        alt={currentImage!.altText as string}
                        height={currentImage!.height as number}
                        width={currentImage!.width as number}
                        quality={100}
                        className="h-full w-full object-cover object-center transition-opacity duration-300 group-hover:opacity-0 sm:group-hover:opacity-0"
                      />
                      {hasSecondImage && (
                        <NextImage
                          src={nextImage!.url as string}
                          alt={nextImage!.altText as string}
                          height={nextImage!.height as number}
                          width={nextImage!.width as number}
                          quality={100}
                          className="absolute inset-0 h-full w-full object-cover object-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:group-hover:opacity-100"
                        />
                      )}
                    </div>
                    <div className="mt-4 text-xs text-gray-300" style={{ fontFamily: "AOMono" }}>
                      {node.title}
                    </div>

                    <div className="mt-1 font-mono text-lg font-medium text-white">
                      <Money data={node.priceRange.minVariantPrice}></Money>
                    </div>
                  </NextLink>
                </div>
              </ProductProvider>
            );
          })}
      </div>

      {/* Auto-load trigger element */}
      {hasNextPage && (
        <div ref={loadMoreRef} className="py-8 text-center">
          {isLoading && (
            <div className="flex items-center justify-center space-x-2">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#dcff07] border-t-transparent"></div>
              <span className="text-[#dcff07]">Loading more products...</span>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

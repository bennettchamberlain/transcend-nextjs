import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { AddToCartButton, Money, ProductProvider } from "@shopify/hydrogen-react";
import { useCallback, useEffect, useRef, useState } from "react";

import type { DataProps } from "@site/utilities/deps";

import { Button } from "@site/snippets";
import { NextImage, NextLink, useAsyncFn } from "@site/utilities/deps";
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
                    url: [{ transform: { maxWidth: 500 } }, true],
                    altText: true,
                    width: true,
                    height: true,
                  },
                  images: [
                    { first: 2 },
                    {
                      nodes: {
                        url: [{ transform: { maxWidth: 500 } }, true],
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
  const [isAnimated, setIsAnimated] = useState(false);
  const [displayText, setDisplayText] = useState("NEW DROPS");
  const [pages, setPages] = useState([props.data || { edges: [], pageInfo: { hasNextPage: false } }]);

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

  const [loader, load] = useAsyncFn(async () => {
    const productList = await fetchNewDropsSection(lastCursor);
    if (productList) {
      setPages([...pages, productList]);
    }
  }, [lastCursor, pages]);

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
          <p className="text-gray-400">Latest drops - the newest arrivals</p>
        </div>
        <p className="text-gray-400">No products found in 2-0 collection.</p>
      </section>
    );
  }

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
        <p className="text-gray-400">Latest drops - the newest arrivals</p>
      </div>

      <div className="mb-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {pages
          .flatMap(({ edges }) => edges)
          .map(({ node }) => {
            const images = node.images?.nodes || [];
            const firstImage = images[0] || node.featuredImage;
            const secondImage = images[1];
            const firstVariant = node.variants?.nodes?.[0];

            return (
              <ProductProvider key={node.handle} data={node}>
                <div className="group">
                  <NextLink href={`/products/${node.handle}`} className="block">
                    <div
                      className="relative w-full overflow-hidden border border-gray-700 bg-gray-800"
                      style={{
                        clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 18px), calc(100% - 18px) 100%, 0 100%)",
                      }}
                    >
                      <NextImage
                        src={firstImage!.url as string}
                        alt={firstImage!.altText as string}
                        height={firstImage!.height as number}
                        width={firstImage!.width as number}
                        className="h-full w-full object-cover object-center transition-opacity duration-300 group-hover:opacity-0"
                      />
                      {secondImage && (
                        <NextImage
                          src={secondImage.url as string}
                          alt={secondImage.altText as string}
                          height={secondImage.height as number}
                          width={secondImage.width as number}
                          className="absolute inset-0 h-full w-full object-cover object-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        />
                      )}
                    </div>
                    <div className="mt-4 text-sm text-gray-300">{node.title}</div>

                    <div className="mt-1 flex items-baseline justify-between">
                      <div className="font-mono text-lg font-medium text-white">
                        <Money data={node.priceRange.minVariantPrice}></Money>
                      </div>
                      {firstVariant && (
                        <AddToCartButton
                          variantId={firstVariant.id}
                          className="text-lime-400 transition-colors duration-200 hover:text-lime-300 focus:outline-none disabled:text-gray-400"
                        >
                          <ShoppingCartIcon className="h-5 w-5" />
                        </AddToCartButton>
                      )}
                    </div>
                  </NextLink>
                </div>
              </ProductProvider>
            );
          })}
      </div>

      {hasNextPage && (
        <div className="text-center">
          <Button
            size="md"
            onClick={load}
            disabled={loader.loading}
            className="hover:text-underline rounded-none border-0 bg-[#dcff07] text-black"
            style={{
              clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%)",
            }}
          >
            {loader.loading ? "Loading" : loader.error ? "Try Again" : "Load More"}
          </Button>
        </div>
      )}
    </section>
  );
}

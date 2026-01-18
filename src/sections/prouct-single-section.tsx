import { AddToCartButton, ProductPrice, ProductProvider } from "@shopify/hydrogen-react";
import { useEffect, useRef, useState } from "react";

import type { DataProps } from "@site/utilities/deps";

import { Button } from "@site/snippets";
import { formatTitle, invariant, NextImage, useVariantSelector } from "@site/utilities/deps";
import { storefront } from "@site/utilities/storefront";

import { fetchProductRecommendationsSection, ProductRecommendationsSection } from "./product-recommendations-section";

export async function fetchProductSingleSection(handle: string) {
  const { productByHandle } = await storefront.query({
    productByHandle: [
      { handle },
      {
        id: true,
        title: true,
        descriptionHtml: true,
        seo: {
          title: true,
          description: true,
        },
        priceRange: {
          minVariantPrice: {
            amount: true,
            currencyCode: true,
          },
        },
        images: [
          { first: 250 },
          {
            nodes: {
              id: true,
              url: [
                {
                  transform: {
                    maxHeight: 1200,
                    maxWidth: 1200,
                    scale: 2,
                  },
                },
                true,
              ],
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
          { first: 250 },
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
    ],
  });

  invariant(productByHandle, `Product not found: ${handle}`);

  const { seo, title, descriptionHtml } = productByHandle;

  // Fetch product recommendations
  const recommendations = await fetchProductRecommendationsSection(productByHandle.id);

  return {
    ...productByHandle,
    descriptionHtml: descriptionHtml as string | undefined,
    recommendations: recommendations as any[],
    seo: {
      title: formatTitle(seo.title || title),
      description: (seo.description || descriptionHtml) as string | undefined,
    },
  };
}

export function ProductSingleSection(props: DataProps<typeof fetchProductSingleSection>) {
  const { variantId, options, selectOption } = useVariantSelector(props.data);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const hasInitialized = useRef(false);
  const slideshowIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const userInteractedRef = useRef(false);

  const productImages = props.data.images.nodes;

  // Automatically select the first option for each option type only once when component mounts
  useEffect(() => {
    if (!hasInitialized.current && options.length > 0) {
      options.forEach(({ name, values }) => {
        const firstAvailableValue = values.find((value) => !value.disabled);
        if (firstAvailableValue) {
          selectOption(name, firstAvailableValue.value);
        }
      });
      hasInitialized.current = true;
    }
  }, [options, selectOption]);

  // Auto-slideshow: advance to next image every 4 seconds
  useEffect(() => {
    // Only start slideshow if there are multiple images and user hasn't manually interacted
    if (productImages.length <= 1 || userInteractedRef.current) {
      return;
    }

    // Clear any existing interval
    if (slideshowIntervalRef.current) {
      clearInterval(slideshowIntervalRef.current);
    }

    // Set up interval to advance images (starts from index 0 which is the initial state)
    slideshowIntervalRef.current = setInterval(() => {
      setSelectedImageIndex((currentIndex) => {
        const nextIndex = currentIndex + 1;
        
        // If we've reached the last image, loop back to first and stop
        if (nextIndex >= productImages.length) {
          if (slideshowIntervalRef.current) {
            clearInterval(slideshowIntervalRef.current);
            slideshowIntervalRef.current = null;
          }
          // Loop back to first image and stop there
          return 0;
        }
        
        return nextIndex;
      });
    }, 3000); // 3 seconds

    // Cleanup on unmount
    return () => {
      if (slideshowIntervalRef.current) {
        clearInterval(slideshowIntervalRef.current);
        slideshowIntervalRef.current = null;
      }
    };
  }, [productImages.length]);

  // Handle manual image selection - stop auto-slideshow
  const handleImageSelect = (index: number) => {
    userInteractedRef.current = true;
    if (slideshowIntervalRef.current) {
      clearInterval(slideshowIntervalRef.current);
      slideshowIntervalRef.current = null;
    }
    setSelectedImageIndex(index);
  };

  return (
    <ProductProvider data={props.data}>
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="flex flex-col rounded-lg shadow-sm md:flex-row md:space-x-8">
          <div className="md:basis-6/12">
            <div className="relative h-full w-full overflow-hidden border border-gray-700 bg-black">
              <div className="relative min-h-[600px] w-full">
                {productImages.map((image, index) => (
                  <NextImage
                    key={image.id}
                    src={image.url}
                    alt={image.altText || ""}
                    width={image.width as number}
                    height={image.height as number}
                    quality={100}
                    className={`absolute inset-0 w-full object-contain object-center transition-opacity duration-500 ${
                      index === selectedImageIndex ? "opacity-100" : "opacity-0"
                    }`}
                  />
                ))}
              </div>

              {/* Plus Icon */}
              <div className="absolute bottom-4 left-4 z-10">
                <img
                  src="/images/plus.png"
                  alt="Plus icon"
                  className="h-8 w-8 opacity-80 transition-opacity duration-200 hover:opacity-100"
                />
              </div>
            </div>

            {/* Image Gallery Thumbnails */}
            {productImages.length > 1 && (
              <div className="mt-4 flex gap-2 overflow-x-auto">
                {productImages.map((image, index) => (
                  <button
                    type="button"
                    key={image.id}
                    onClick={() => handleImageSelect(index)}
                    className={`flex-shrink-0 overflow-hidden border-2 transition-all duration-200 hover:opacity-80 ${
                      index === selectedImageIndex ? "border-[#dcff07]" : "border-gray-600 hover:border-gray-500"
                    }`}
                  >
                    <NextImage
                      src={image.url}
                      alt={image.altText || ""}
                      width={80}
                      height={80}
                      quality={100}
                      className="h-20 w-20 object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="md:basis-6/12">
            <div className="mt-4 pt-5 md:pt-10">
              <h2 className="sr-only">Product information</h2>

              <h1 className="mb-5 text-2xl font-bold tracking-tight text-white uppercase sm:text-3xl" style={{ fontFamily: "Shapiro" }}>
                {props.data.title}
              </h1>

              {props.data.descriptionHtml && (
                <div
                  className="mb-5 text-base text-gray-300"
                  // eslint-disable-next-line react-dom/no-dangerously-set-innerhtml
                  dangerouslySetInnerHTML={{
                    __html: props.data.descriptionHtml
                      .replace(/<ul>/g, "<br><ul>")
                      .replace(/<\/ul>/g, "</ul><br>")
                      // Remove size chart table and related content, but preserve spacing
                      .replace(
                        /<p><span[^>]*>Size Chart<\/span><\/p>[\s\S]*?<div[^>]*id="item-id"[^>]*>[\s\S]*?<\/div>/,
                        "<br><br>",
                      )
                      .replace(/<div[^>]*style="overflow: auto;">[\s\S]*?<\/div>/, "")
                      // Also remove any standalone "Size Chart" text that might appear
                      .replace(/Size Chart/g, "")
                      // Add line breaks between HTML tags
                      .replace(/></g, ">\n<")
                      .replace(/\n\s*\n/g, "\n"),
                  }}
                />
              )}

              <div className="mb-5 text-3xl tracking-tight text-white">
                <ProductPrice data={props.data}></ProductPrice>
              </div>

              <div className="">
                {options.map(({ name, values }) => (
                  <div className="mb-3" key={name}>
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-white">{name}</h3>
                    </div>

                    {values.map(({ value, selected, disabled }) => {
                      return (
                        <Button
                          className="beveled-corner mr-2 rounded-none"
                          color={selected ? "neon" : "dark"}
                          size="sm"
                          key={value}
                          disabled={disabled}
                          onClick={() => selectOption(name, value)}
                        >
                          <p className="pt-1">{value}</p>
                        </Button>
                      );
                    })}
                  </div>
                ))}
              </div>

              {/* Size selection helper message */}
              {(() => {
                const sizeOption = options.find(({ name }) => name.toLowerCase() === "size");
                const hasSizeSelected = sizeOption?.values.some(({ selected }) => selected) ?? false;
                return (
                  sizeOption &&
                  !hasSizeSelected && <p className="mt-4 text-sm text-[#dcff07]">Please select a size to add to cart</p>
                );
              })()}

              <AddToCartButton
                variantId={variantId}
                className="beveled-corner mt-10 flex w-full items-center justify-center border border-transparent bg-lime-400 p-3 text-base font-semibold text-black transition-colors duration-200 hover:bg-lime-300 focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 focus:outline-none disabled:bg-gray-700"
              >
                <p className="pt-1 uppercase">Add to Cart</p>
              </AddToCartButton>
            </div>
          </div>
        </div>
      </section>

      {/* Product Recommendations Section */}
      {props.data.recommendations && (props.data.recommendations as any[]).length > 0 && (
        <ProductRecommendationsSection data={props.data.recommendations as any} />
      )}
    </ProductProvider>
  );
}

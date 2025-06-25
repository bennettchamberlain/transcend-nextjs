import { AddToCartButton, ProductPrice, ProductProvider } from "@shopify/hydrogen-react";
import { truncate } from "lodash";
import { useEffect, useState } from "react";

import type { DataProps } from "@site/utilities/deps";

import { Button } from "@site/snippets";
import { formatTitle, invariant, NextImage, useVariantSelector } from "@site/utilities/deps";
import { storefront } from "@site/utilities/storefront";
import { ProductRecommendationsSection, fetchProductRecommendationsSection } from "./product-recommendations-section";

export async function fetchProductSingleSection(handle: string) {
  const { productByHandle } = await storefront.query({
    productByHandle: [
      { handle },
      {
        id: true,
        title: true,
        description: [{ truncateAt: 256 }, true],
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
                    maxHeight: 600,
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

  const { seo, title, description } = productByHandle;

  // Fetch product recommendations
  const recommendations = await fetchProductRecommendationsSection(productByHandle.id);

  return {
    ...productByHandle,
    recommendations: recommendations as any[],
    seo: {
      title: formatTitle(seo.title || title),
      description: seo.description || truncate(description, { length: 256 }),
    },
  };
}

export function ProductSingleSection(props: DataProps<typeof fetchProductSingleSection>) {
  const { variantId, options, selectOption } = useVariantSelector(props.data);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Automatically select the first option for each option type only once when component mounts
  useEffect(() => {
    options.forEach(({ name, values }) => {
      const firstAvailableValue = values.find((value) => !value.disabled);
      if (firstAvailableValue) {
        selectOption(name, firstAvailableValue.value);
      }
    });
  }, []); // Empty dependency array - only run once on mount

  const productImages = props.data.images.nodes;

  return (
    <ProductProvider data={props.data}>
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="flex flex-col rounded-lg shadow-sm md:flex-row md:space-x-8">
          <div className="md:basis-6/12">
            <div className="relative h-full w-full overflow-hidden border border-gray-700 bg-black">
              <NextImage
                src={productImages[selectedImageIndex].url}
                alt={productImages[selectedImageIndex].altText || ""}
                width={productImages[selectedImageIndex].width as number}
                height={productImages[selectedImageIndex].height as number}
                className="min-h-[600px] w-full object-contain object-center"
              />

              {/* Plus Icon */}
              <div className="absolute bottom-4 left-4 z-10">
                <img
                  src="/images/plus.png"
                  alt="Plus"
                  className="h-8 w-8 opacity-80 transition-opacity duration-200 hover:opacity-100"
                />
              </div>
            </div>

            {/* Image Gallery Thumbnails */}
            {productImages.length > 1 && (
              <div className="mt-4 flex gap-2 overflow-x-auto">
                {productImages.map((image, index) => (
                  <button
                    key={image.id}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 overflow-hidden border-2 transition-all duration-200 hover:opacity-80 ${
                      index === selectedImageIndex ? "border-[#dcff07]" : "border-gray-600 hover:border-gray-500"
                    }`}
                  >
                    <NextImage
                      src={image.url}
                      alt={image.altText || ""}
                      width={80}
                      height={80}
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

              <h1 className="mb-5 text-2xl font-bold tracking-tight text-white sm:text-3xl">{props.data.title}</h1>

              <p className="mb-5 text-base text-gray-300">{props.data.description}</p>

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

              <AddToCartButton
                variantId={variantId}
                className="beveled-corner mt-10 flex w-full items-center justify-center border border-transparent bg-lime-400 p-3 text-base font-semibold text-black transition-colors duration-200 hover:bg-lime-300 focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 focus:outline-none disabled:bg-gray-700"
              >
                <p className="pt-1">Add to Cart</p>
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

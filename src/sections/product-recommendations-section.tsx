import { Money, AddToCartButton, ProductProvider } from "@shopify/hydrogen-react";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

import type { DataProps } from "@site/utilities/deps";

import { Button } from "@site/snippets";
import { NextImage, NextLink } from "@site/utilities/deps";
import { storefront } from "@site/utilities/storefront";

export async function fetchProductRecommendationsSection(productId: string) {
  try {
    const { productRecommendations } = await storefront.query({
      productRecommendations: [
        { productId, intent: "RELATED" as any },
        {
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
        },
      ],
    });

    return productRecommendations || [];
  } catch (error) {
    console.error("Error fetching product recommendations:", error);
    return [];
  }
}

export function ProductRecommendationsSection(props: DataProps<typeof fetchProductRecommendationsSection>) {
  const recommendations = props.data as any[];

  if (!recommendations || recommendations.length === 0) {
    return null;
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 pt-10">
        <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">You Might Also Like</h2>
        <p className="mt-2 text-base text-gray-300">Discover more products that complement your style</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {recommendations.slice(0, 4).map((product: any) => (
          <ProductProvider key={product.handle} data={product}>
            <div className="group relative overflow-hidden border border-gray-700 bg-black transition-all duration-300 hover:border-gray-600 hover:shadow-lg">
              <div className="aspect-square overflow-hidden">
                <NextImage
                  src={product.featuredImage?.url || product.images?.nodes[0]?.url || ""}
                  alt={product.featuredImage?.altText || product.title}
                  width={product.featuredImage?.width || 500}
                  height={product.featuredImage?.height || 500}
                  className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div className="p-4">
                <h3 className="mb-2 line-clamp-2 text-lg font-semibold text-white">{product.title}</h3>

                <div className="mb-4 flex items-center justify-between">
                  <div className="text-xl font-bold text-white">
                    <Money data={product.priceRange.minVariantPrice} />
                  </div>
                </div>

                <div className="flex gap-2">
                  <NextLink
                    href={`/products/${product.handle}`}
                    className="flex-1 border border-gray-600 bg-transparent px-4 py-2 text-center text-sm font-medium text-white transition-colors duration-200 hover:border-gray-500 hover:bg-gray-800"
                  >
                    View Details
                  </NextLink>
                </div>
              </div>
            </div>
          </ProductProvider>
        ))}
      </div>
    </section>
  );
}

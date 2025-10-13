import { Money, ProductProvider } from "@shopify/hydrogen-react";

import type { DataProps } from "@site/utilities/deps";

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
        <p className="mt-2 text-base text-gray-300 uppercase">Discover similar products that complement your style</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {recommendations.slice(0, 4).map((product: any) => (
          <ProductProvider key={product.handle} data={product}>
            <div className="group">
              <NextLink href={`/products/${product.handle}`} className="block">
                <div
                  className="relative w-full overflow-hidden border border-gray-700 bg-gray-800"
                  style={{
                    clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 18px), calc(100% - 18px) 100%, 0 100%)",
                  }}
                >
                  <NextImage
                    src={product.featuredImage?.url || product.images?.nodes[0]?.url || ""}
                    alt={product.featuredImage?.altText || product.title}
                    width={product.featuredImage?.width || 500}
                    height={product.featuredImage?.height || 500}
                    quality={100}
                    className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <div className="mt-4 text-xs text-gray-300">
                  <span className="text-neon-green neon-glow" style={{ fontFamily: "bc-sklonar" }}>
                    {product.title}
                  </span>
                </div>

                <div className="mt-1 text-base font-medium text-white" style={{ fontFamily: "AOMono" }}>
                  <Money data={product.priceRange.minVariantPrice} />
                </div>
              </NextLink>
            </div>
          </ProductProvider>
        ))}
      </div>
    </section>
  );
}

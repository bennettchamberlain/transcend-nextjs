import { Money } from "@shopify/hydrogen-react";
import { useMemo } from "react";

import type { DataProps } from "@site/utilities/deps";

import { Button } from "@site/snippets";
import { NextImage, NextLink, useAsyncFn, useState } from "@site/utilities/deps";
import { storefront } from "@site/utilities/storefront";

import type { SortOption } from "./product-search-sort-section";

import { ProductSearchSortSection } from "./product-search-sort-section";

export async function fetchProductListSection(cursor?: string, searchQuery?: string, sortOption?: SortOption) {
  // Build sort parameters based on sort option
  let sortKey = "BEST_SELLING";
  let reverse = false;

  if (sortOption) {
    switch (sortOption) {
      case "best-selling":
        sortKey = "BEST_SELLING";
        break;
      case "title-asc":
        sortKey = "TITLE";
        reverse = false;
        break;
      case "title-desc":
        sortKey = "TITLE";
        reverse = true;
        break;
      case "price-asc":
        sortKey = "PRICE";
        reverse = false;
        break;
      case "price-desc":
        sortKey = "PRICE";
        reverse = true;
        break;
      case "created-asc":
        sortKey = "CREATED_AT";
        reverse = false;
        break;
      case "created-desc":
        sortKey = "CREATED_AT";
        reverse = true;
        break;
    }
  }

  // Build query parameters
  const queryParams: any = {
    first: 12,
    after: cursor || null,
    sortKey,
    reverse,
  };

  // Add search query if provided
  if (searchQuery && searchQuery.trim()) {
    queryParams.query = searchQuery.trim();
  }

  const { products } = await storefront.query({
    products: [
      queryParams,
      {
        pageInfo: {
          hasNextPage: true,
        },
        edges: {
          cursor: true,
          node: {
            handle: true,
            title: true,
            createdAt: true,
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
        },
      },
    ],
  });

  return products;
}

export function ProductListSection(props: DataProps<typeof fetchProductListSection>) {
  const [pages, setPages] = useState([props.data]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>("best-selling");
  const [isSearching, setIsSearching] = useState(false);

  const lastPage = pages[pages.length - 1];
  const lastCursor =
    lastPage.edges.length > 0 ? lastPage.edges[lastPage.edges.length - 1].cursor || undefined : undefined;
  const hasNextPage = lastPage.pageInfo.hasNextPage;

  // Debounced search effect
  const [searchLoader, performSearch] = useAsyncFn(async () => {
    setIsSearching(true);
    const productList = await fetchProductListSection(undefined, searchQuery, sortOption);
    setPages([productList]);
    setIsSearching(false);
  }, [searchQuery, sortOption]);

  // Sort effect
  const [sortLoader, _performSort] = useAsyncFn(async () => {
    setIsSearching(true);
    const productList = await fetchProductListSection(undefined, searchQuery, sortOption);
    setPages([productList]);
    setIsSearching(false);
  }, [searchQuery, sortOption]);

  const [loader, load] = useAsyncFn(async () => {
    const productList = await fetchProductListSection(lastCursor, searchQuery, sortOption);
    setPages([...pages, productList]);
  }, [lastCursor, searchQuery, sortOption]);

  // Handle search changes
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    // Reset pages when searching
    if (query !== searchQuery) {
      setPages([props.data]);
    }
  };

  // Handle sort changes
  const handleSortChange = (option: SortOption) => {
    setSortOption(option);
    // Reset pages when sorting
    if (option !== sortOption) {
      setPages([props.data]);
    }
  };

  // Perform search/sort when dependencies change
  useMemo(() => {
    if (searchQuery || sortOption !== "best-selling") {
      performSearch();
    }
  }, [searchQuery, sortOption, performSearch]);

  const allProducts = pages.flatMap(({ edges }) => edges);

  return (
    <div className="mt-8">
      <ProductSearchSortSection
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        sortOption={sortOption}
        onSortChange={handleSortChange}
      />

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="sr-only">Products</h2>

        {/* Loading state */}
        {(searchLoader.loading || sortLoader.loading || isSearching) && (
          <div className="py-8 text-center">
            <div className="text-gray-400">Loading products...</div>
          </div>
        )}

        {/* No results state */}
        {!searchLoader.loading && !sortLoader.loading && !isSearching && allProducts.length === 0 && (
          <div className="py-8 text-center">
            <div className="text-gray-400">
              {searchQuery ? `No products found for "${searchQuery}"` : "No products found"}
            </div>
          </div>
        )}

        {/* Products grid */}
        {!searchLoader.loading && !sortLoader.loading && !isSearching && allProducts.length > 0 && (
          <>
            <div className="mb-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {allProducts.map(({ node }) => {
                const images = node.images?.nodes || [];
                const firstImage = images[0] || node.featuredImage;
                const secondImage = images[1];

                return (
                  <div key={node.handle} className="group">
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
                      <div className="mt-4 text-xs text-gray-300">
                        <span className="text-neon-green neon-glow" style={{ fontFamily: "bc-sklonar" }}>
                          {node.title}
                        </span>
                      </div>

                      <div className="mt-1 font-mono text-base font-medium text-white" style={{ fontFamily: "AOMono" }}>
                        <Money data={node.priceRange.minVariantPrice}></Money>
                      </div>
                    </NextLink>
                  </div>
                );
              })}
            </div>

            {hasNextPage && (
              <div className="text-center">
                <Button
                  size="md"
                  onClick={load}
                  disabled={loader.loading}
                  className="rounded-none border-0 bg-[#dcff07] text-black hover:underline"
                  style={{
                    clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 18px), calc(100% - 18px) 100%, 0 100%)",
                  }}
                >
                  {loader.loading ? "Loading" : loader.error ? "Try Again" : "Load More"}
                </Button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}

import { Money } from "@shopify/hydrogen-react";
import { useCallback, useEffect, useState as useReactState, useRef } from "react";

import type { DataProps } from "@site/utilities/deps";

import { NextImage, NextLink, useAsyncFn, useState } from "@site/utilities/deps";
import { storefront } from "@site/utilities/storefront";

import type { SortOption } from "./product-search-sort-section";

import { ProductSearchSortSection } from "./product-search-sort-section";

export async function fetchProductListSection(
  cursor?: string,
  searchQuery?: string,
  sortOption?: SortOption,
  limit?: number,
) {
  // Build sort parameters based on sort option
  let sortKey = "CREATED_AT";
  let reverse = true;

  if (sortOption) {
    switch (sortOption) {
      case "best-selling":
        sortKey = "BEST_SELLING";
        reverse = false;
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
    first: limit || 20, // Default to 20 for initial load, 16 for pagination
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
        },
      },
    ],
  });

  return products;
}

export function ProductListSection(_props: DataProps<typeof fetchProductListSection>) {
  const [pages, setPages] = useState<Array<typeof _props.data>>([_props.data]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>("created-desc");
  const [isSearching, setIsSearching] = useState(false);
  const [imageStates, setImageStates] = useReactState<Record<string, number>>({});
  const [originalData] = useState(_props.data); // Store original server data
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const lastPage = pages[pages.length - 1];
  const hasNextPage = lastPage?.pageInfo.hasNextPage || false;

  // Debounced search effect
  const [searchLoader, performSearch] = useAsyncFn(async () => {
    setIsSearching(true);
    const productList = await fetchProductListSection(undefined, searchQuery, sortOption, 20);
    setPages([productList]);
    setIsSearching(false);
  }, [searchQuery, sortOption]);

  // Sort effect
  const [sortLoader, performSort] = useAsyncFn(async () => {
    setIsSearching(true);
    const productList = await fetchProductListSection(undefined, searchQuery, sortOption, 20);
    setPages([productList]);
    setIsSearching(false);
  }, [searchQuery, sortOption]);

  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  const loadMore = useCallback(async () => {
    if (isLoading || !hasNextPage) {
      return;
    }

    setIsLoading(true);
    setLoadError(null);

    try {
      // Get the cursor from the last page
      const cursorToUse =
        lastPage?.edges.length > 0 ? lastPage.edges[lastPage.edges.length - 1].cursor || undefined : undefined;

      console.log("Load more clicked - cursor:", cursorToUse, "sort:", sortOption, "search:", searchQuery);

      const productList = await fetchProductListSection(cursorToUse, searchQuery, sortOption, 16);

      console.log("Received products:", productList?.edges?.length, "hasNextPage:", productList?.pageInfo?.hasNextPage);

      setPages((prevPages) => [...prevPages, productList]);
    } catch (error) {
      console.error("Error loading more products:", error);
      setLoadError("Failed to load more products");
    } finally {
      setIsLoading(false);
    }
  }, [lastPage, searchQuery, sortOption, hasNextPage, isLoading]);

  // Auto-load more when scrolling near bottom
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (
            entry.isIntersecting &&
            hasNextPage &&
            !isLoading &&
            !isSearching &&
            !searchLoader.loading &&
            !sortLoader.loading
          ) {
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
  }, [hasNextPage, isLoading, isSearching, searchLoader.loading, sortLoader.loading, loadMore]);

  // Handle search changes
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    // Reset pages when searching
    setPages([]);
  };

  // Handle sort changes
  const handleSortChange = (option: SortOption) => {
    setSortOption(option);
    // Reset pages when sorting
    setPages([]);
  };

  // Perform search/sort when dependencies change
  useEffect(() => {
    // If we have a search query, always perform search
    if (searchQuery) {
      performSearch();
    }
    // If we're switching to a non-default sort, perform sort
    else if (sortOption !== "created-desc") {
      performSort();
    }
    // If we're back to default sort with no search and no pages, restore original data
    else if (pages.length === 0) {
      setPages([originalData]);
    }
  }, [searchQuery, sortOption, performSearch, performSort, originalData]);

  const allProducts = pages.flatMap(({ edges }) => edges);

  const toggleImage = (productHandle: string, hasSecondImage: boolean) => {
    if (!hasSecondImage) {
      return;
    }

    setImageStates((prev) => ({
      ...prev,
      [productHandle]: prev[productHandle] === 1 ? 0 : 1,
    }));
  };

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
            <div className="text-gray-300">Loading products...</div>
          </div>
        )}

        {/* No results state */}
        {!searchLoader.loading && !sortLoader.loading && !isSearching && allProducts.length === 0 && (
          <div className="py-8 text-center">
            <div className="text-gray-300">
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
                const hasSecondImage = !!secondImage;
                const currentImageIndex = imageStates[node.handle] || 0;
                const currentImage = currentImageIndex === 1 && secondImage ? secondImage : firstImage;
                const nextImage = currentImageIndex === 0 && secondImage ? secondImage : firstImage;

                return (
                  <div key={node.handle} className="group">
                    <NextLink href={`/products/${node.handle}`} className="block">
                      <div
                        className="relative w-full overflow-hidden border border-gray-700 bg-gray-800"
                        style={{
                          clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 18px), calc(100% - 18px) 100%, 0 100%)",
                        }}
                      >
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

            {/* Auto-load trigger element */}
            {hasNextPage && (
              <div ref={loadMoreRef} className="py-8 text-center">
                {isLoading && (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#dcff07] border-t-transparent"></div>
                    <span className="text-[#dcff07]">Loading more products...</span>
                  </div>
                )}
                {loadError && (
                  <div className="mt-4 text-red-400">
                    <p>{loadError}</p>
                    <button
                      onClick={loadMore}
                      className="mt-2 rounded bg-red-600 px-4 py-2 text-sm text-white transition-colors hover:bg-red-700"
                    >
                      Try Again
                    </button>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}

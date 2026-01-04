import { storefront } from "./storefront";

export interface Collection {
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
}

export async function fetchCollections(): Promise<Collection[]> {
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
              url: [{ transform: { maxWidth: 2000, maxHeight: 1200 } }, true],
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



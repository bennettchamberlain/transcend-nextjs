import type { GetStaticProps } from "next";

import { StoreLayout } from "@site/layouts/store-layout";
import { CollectionsScroll, fetchCollections } from "@site/sections/collections-scroll";
import { NextSeo } from "@site/utilities/deps";

interface PageProps {
  collections: Awaited<ReturnType<typeof fetchCollections>>;
}

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const collections = await fetchCollections();

  return {
    props: {
      collections,
    },
    revalidate: 60, // Revalidate every minute
  };
};

export default function Page(props: PageProps) {
  return (
    <StoreLayout>
      <NextSeo title="Collections" description="Explore our curated tech-forward collections" />
      <CollectionsScroll collections={props.collections} />
    </StoreLayout>
  );
}

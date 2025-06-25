import { GetStaticProps } from "next";


import { NextSeo } from "@site/utilities/deps";
import { CollectionsScroll, fetchCollections } from "@site/sections/collections-scroll";
import { StoreLayout } from "@site/layouts/store-layout";

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

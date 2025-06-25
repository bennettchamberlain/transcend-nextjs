import type { GetStaticProps } from "next";

import { StoreLayout } from "@site/layouts/store-layout";
import { CollectionsScroll, fetchCollections } from "@site/sections/collections-scroll";
import { HeroSection } from "@site/sections/hero-section";
import { fetchNewDropsSection, NewDropsSection } from "@site/sections/new-drops-section";

interface PageProps {
  collections: Awaited<ReturnType<typeof fetchCollections>>;
  newDrops: Awaited<ReturnType<typeof fetchNewDropsSection>>;
}

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const collections = await fetchCollections();
  const newDrops = await fetchNewDropsSection();

  return {
    props: {
      collections,
      newDrops,
    },
    revalidate: 60, // Revalidate every minute
  };
};

export default function Page(props: PageProps) {
  return (
    <StoreLayout>
      <HeroSection />
      <CollectionsScroll collections={props.collections} />
      <NewDropsSection data={props.newDrops} />
    </StoreLayout>
  );
}

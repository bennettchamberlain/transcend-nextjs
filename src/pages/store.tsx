import type { GetServerSideProps as GetStaticProps } from "@site/utilities/deps";

import { StoreLayout } from "@site/layouts/store-layout";
import { CollectionsScroll, fetchCollections } from "@site/sections/collections-scroll";
import { HeroSection } from "@site/sections/hero-section";
import { fetchNewDropsSection, NewDropsSection } from "@site/sections/new-drops-section";
import { SelectPhotosShowcase } from "@site/components/select-photos-showcase";

interface PageProps {
  collections: Awaited<ReturnType<typeof fetchCollections>>;
  newDrops: Awaited<ReturnType<typeof fetchNewDropsSection>>;
}

export const getServerSideProps: GetStaticProps<PageProps> = async () => {
  const [collections, newDrops] = await Promise.all([
    fetchCollections(),
    fetchNewDropsSection(),
  ]);

  return {
    props: {
      collections,
      newDrops,
    },
  };
};

export default function StorePage(props: PageProps) {
  return (
    <StoreLayout>
      <HeroSection />
      <CollectionsScroll collections={props.collections} />
      <NewDropsSection data={props.newDrops} />
      
      {/* Select Photos Showcase */}
      <div className="bg-black py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SelectPhotosShowcase 
            title="Behind the Scenes"
            layout="horizontal"
            className="mb-8"
          />
        </div>
      </div>
    </StoreLayout>
  );
}

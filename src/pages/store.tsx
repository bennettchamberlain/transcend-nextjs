import type { GetServerSideProps as GetStaticProps } from "@site/utilities/deps";

import { CollectionsScroll } from "@site/sections/collections-scroll";
import Footer from "@site/sections/footer";
import { HeroSection } from "@site/sections/hero-section";
import { HomeHeaderSection } from "@site/sections/home-header-section";
import { fetchNewDropsSection, NewDropsSection } from "@site/sections/new-drops-section";
import { fetchCollections } from "@site/utilities/collections";
import { NextSeo } from "@site/utilities/deps";

interface PageProps {
  collections: Awaited<ReturnType<typeof fetchCollections>>;
  newDrops: Awaited<ReturnType<typeof fetchNewDropsSection>>;
}

export const getServerSideProps: GetStaticProps<PageProps> = async () => {
  const [collections, newDrops] = await Promise.all([fetchCollections(), fetchNewDropsSection()]);

  return {
    props: {
      collections,
      newDrops,
    },
  };
};

export default function StorePage(props: PageProps) {
  return (
    <>
      <NextSeo 
        title="Shop the Collection"
        description="Explore Transcend Collective's latest drops. Streetwear and apparel designed for the modern creative in a digital world."
        openGraph={{
          title: 'Shop Transcend Collective',
          description: 'Explore Transcend Collective's latest drops. Streetwear and apparel designed for the modern creative in a digital world.',
          url: 'https://transcendcollective.la/store',
        }}
      />
      <HomeHeaderSection />
      <main className="mx-auto">
      <HeroSection />
      <CollectionsScroll collections={props.collections} />
      <NewDropsSection data={props.newDrops} />
      </main>
      <Footer />
    </>
  );
}

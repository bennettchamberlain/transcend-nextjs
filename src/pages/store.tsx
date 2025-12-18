import type { GetServerSideProps as GetStaticProps } from "@site/utilities/deps";

import { CollectionsScroll } from "@site/sections/collections-scroll";
import Footer from "@site/sections/footer";
import { HeroSection } from "@site/sections/hero-section";
import { HomeHeaderSection } from "@site/sections/home-header-section";
import { fetchNewDropsSection, NewDropsSection } from "@site/sections/new-drops-section";
import { fetchCollections } from "@site/utilities/collections";

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

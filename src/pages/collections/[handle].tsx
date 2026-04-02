import type { PageProps } from "@site/utilities/deps";

import { StoreLayout } from "@site/layouts/store-layout";
import { CollectionSection, fetchCollectionSection } from "@site/sections/collection-section";
import { fetchStaticPaths, fetchStaticProps, invariant, NextSeo } from "@site/utilities/deps";

export const getStaticPaths = fetchStaticPaths(async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
});

export const getStaticProps = fetchStaticProps(async ({ params }) => {
  invariant(typeof params?.handle === "string", `params.handle is required`);

  return {
    props: {
      data: {
        collectionSection: await fetchCollectionSection(params?.handle),
      },
    },
    revalidate: 60,
  };
});

export default function Page(props: PageProps<typeof getStaticProps>) {
  const { seo, title, description, handle } = props.data.collectionSection || {};

  return (
    <StoreLayout>
      <NextSeo 
        title={seo?.title as string || title} 
        description={seo?.description as string || description?.substring(0, 160)}
        openGraph={{
          title: seo?.title as string || title,
          description: seo?.description as string || description?.substring(0, 160),
          type: 'website',
          url: `https://transcendcollective.la/collections/${handle}`,
        }}
        twitter={{
          cardType: 'summary_large_image',
          handle: '@transcendcollective',
          site: '@transcendcollective',
        }}
      />
      <CollectionSection data={props.data.collectionSection} />
    </StoreLayout>
  );
}

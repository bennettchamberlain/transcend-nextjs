import type { PageProps } from "@site/utilities/deps";

import { StoreLayout } from "@site/layouts/store-layout";
import { fetchProductSingleSection, ProductSingleSection } from "@site/sections/prouct-single-section";
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
        productSingleSection: await fetchProductSingleSection(params?.handle),
      },
    },
    revalidate: 60,
  };
});

export default function Page(props: PageProps<typeof getStaticProps>) {
  const { seo, images, title, descriptionHtml } = props.data.productSingleSection;
  
  // Get first image for OG/Twitter
  const firstImage = images?.nodes?.[0];
  const ogImage = firstImage?.url;
  const ogImageAlt = firstImage?.altText || title;

  return (
    <StoreLayout>
      <NextSeo 
        title={seo.title || title} 
        description={seo.description?.toString() || descriptionHtml?.toString().replace(/<[^>]*>/g, '').substring(0, 160) || undefined}
        openGraph={{
          title: seo.title || title,
          description: seo.description?.toString() || descriptionHtml?.toString().replace(/<[^>]*>/g, '').substring(0, 160),
          type: 'product',
          url: `https://transcendcollective.la/products/${props.data.productSingleSection.handle}`,
          images: ogImage ? [{
            url: ogImage,
            alt: ogImageAlt,
            width: firstImage?.width,
            height: firstImage?.height,
          }] : undefined,
        }}
        twitter={{
          cardType: 'summary_large_image',
          handle: '@transcendcollective',
          site: '@transcendcollective',
        }}
      />
      <ProductSingleSection data={props.data.productSingleSection} />
    </StoreLayout>
  );
}

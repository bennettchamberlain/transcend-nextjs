import { StoreLayout } from "@site/layouts/StoreLayout";

import type { PageProps } from "@site/utilities/deps";

import { fetchProductListSection, ProductListSection } from "@site/sections/product-list-section";
import { fetchServerSideProps, NextSeo } from "@site/utilities/deps";

export const getStaticProps = fetchServerSideProps(async () => {
  return {
    props: {
      data: {
        productListSection: await fetchProductListSection(),
      },
    },
    revalidate: 60,
  };
});

export default function Page(props: PageProps<typeof getStaticProps>) {
  return (
    <StoreLayout>
      <NextSeo title="Products" description="All Products from Next Shopify Storefront" />
      <ProductListSection data={props.data.productListSection} />
    </StoreLayout>
  );
}

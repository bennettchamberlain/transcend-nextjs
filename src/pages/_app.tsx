import "@site/assets/style.css";
import { CartProvider, ShopifyProvider } from "@shopify/hydrogen-react";
import ProgressBar from "nextjs-progressbar";

import type { NextAppProps } from "@site/utilities/deps";

import { DefaultSeo } from "@site/utilities/deps";
import { publicStorefrontToken, storeDomain, storefrontApiVersion } from "@site/utilities/storefront";

export default function App({ Component, pageProps }: NextAppProps) {
  return (
    <ShopifyProvider
      languageIsoCode="EN"
      countryIsoCode="US"
      storeDomain={storeDomain}
      storefrontToken={publicStorefrontToken}
      storefrontApiVersion={storefrontApiVersion}
    >
      <DefaultSeo
        defaultTitle="Next Shopify Storefront"
        titleTemplate="%s • Next Shopify Storefront"
        description="🛍 A Shopping Cart built with TypeScript, Tailwind CSS, Headless UI, Next.js, React.js, Shopify Hydrogen React,... and Shopify Storefront GraphQL API."
      />
      <CartProvider>
        <ProgressBar color="orange" />
        <Component {...pageProps} />
      </CartProvider>
    </ShopifyProvider>
  );
}

import { CartProvider, ShopifyProvider } from "@shopify/hydrogen-react";
import { gsap } from "gsap";
import Head from "next/head";
import "@site/assets/style.css";
import { useEffect } from "react";

import type { NextAppProps } from "@site/utilities/deps";

import { CyberProgressBar } from "@site/snippets";
import { DefaultSeo } from "@site/utilities/deps";
import { env } from "@site/utilities/env";

// Extend Window interface to include gsap
declare global {
  interface Window {
    gsap: any;
  }
}

export default function App({ Component, pageProps }: NextAppProps) {
  useEffect(() => {
    // Make GSAP available globally
    window.gsap = gsap;
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <Head>
        <link rel="stylesheet" href="https://use.typekit.net/fsr7gex.css" />
      </Head>
      <ShopifyProvider
        languageIsoCode="EN"
        countryIsoCode="US"
        storeDomain={env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}
        storefrontToken={env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_TOKEN}
        storefrontApiVersion={env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_VERSION}
      >
        <DefaultSeo
          defaultTitle="Next Shopify Storefront"
          titleTemplate="%s • Next Shopify Storefront"
          description="🛍 A Shopping Cart built with TypeScript, Tailwind CSS, Headless UI, Next.js, React.js, Shopify Hydrogen React,... and Shopify Storefront GraphQL API."
        />
        <CartProvider>
          <CyberProgressBar color="#dcff07" type={1} size={60} />
          <Component {...pageProps} />
        </CartProvider>
      </ShopifyProvider>
    </div>
  );
}

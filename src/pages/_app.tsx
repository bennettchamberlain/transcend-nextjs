import { CartProvider, ShopifyProvider } from "@shopify/hydrogen-react";
import { gsap } from "gsap";
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
      <ShopifyProvider
        languageIsoCode="EN"
        countryIsoCode="US"
        storeDomain={env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}
        storefrontToken={env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_TOKEN}
        storefrontApiVersion={env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_VERSION}
      >
        <DefaultSeo
          defaultTitle="Transcend Collective"
          titleTemplate="Clothing for the modern creative"
          description="Clothing for a digital world. Transcend Collective is a group of individuals that seek a higher calling and purpose to their lives"
          openGraph={{
            type: "website",
            locale: "en_US",
            url: "https://transcendcollective.la",
            siteName: "Transcend Collective",
            title: "Transcend Collective",
            description:
              "Clothing for a digital world. Transcend Collective is a group of individuals that seek a higher calling and purpose to their lives",
            images: [
              {
                url: "/images/link.JPEG",
                alt: "Transcend Collective",
                type: "image/jpeg",
              },
            ],
          }}
          twitter={{
            handle: "@transcendcollective",
            site: "@transcendcollective",
            cardType: "summary_large_image",
          }}
        />
        <CartProvider>
          <CyberProgressBar color="#dcff07" type={1} size={60} />
          <Component {...pageProps} />
        </CartProvider>
      </ShopifyProvider>
    </div>
  );
}

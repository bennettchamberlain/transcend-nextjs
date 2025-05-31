import { createStorefrontClient } from "@shopify/hydrogen-react";

import { env } from "../env";
import { Chain, ZeusScalars } from "./zeus";

const { getStorefrontApiUrl, getPublicTokenHeaders } = createStorefrontClient({
  storeDomain: env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN,
  storefrontApiVersion: env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_VERSION,
  publicStorefrontToken: env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_TOKEN,
});

const chain = Chain(getStorefrontApiUrl(), {
  headers: getPublicTokenHeaders(),
});

const scalars = ZeusScalars({
  ID: {
    encode: (e) => e as string,
    decode: (e) => e as string,
  },
  URL: {
    encode: (e) => e as string,
    decode: (e) => e as string,
  },
  Decimal: {
    encode: (e) => e as string,
    decode: (e) => e as string,
  },
});

export const storefront = {
  query: chain("query", {
    scalars,
  }),
  mutation: chain("mutation", {
    scalars,
  }),
};

export * from "./zeus";

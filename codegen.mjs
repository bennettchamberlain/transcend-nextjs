import "dotenv/config";
import { execSync } from "node:child_process";
import { env } from "node:process";

const storeDomain = env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const publicStorefrontToken = env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_TOKEN;
const storefrontApiVersion = env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_VERSION;

const apiEndpoint = `${storeDomain}/api/${storefrontApiVersion}/graphql.json`;

execSync(
  `node_modules/.bin/zeus ${apiEndpoint} ./src/utilities/storefront --header=X-Shopify-Storefront-Access-Token:${publicStorefrontToken}`,
  {
    stdio: "inherit",
  },
);

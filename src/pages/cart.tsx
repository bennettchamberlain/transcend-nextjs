import { StoreLayout } from "@site/layouts/StoreLayout";

import { CartSection } from "@site/sections/cart-section";
import { NextSeo } from "@site/utilities/deps";

export default function Page() {
  return (
    <StoreLayout>
      <NextSeo title="Cart" />
      <CartSection />
    </StoreLayout>
  );
}

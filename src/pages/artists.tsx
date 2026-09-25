import NextLink from "next/link";

import { StoreLayout } from "@site/layouts/store-layout";
import { ArtistMerchPromotionalSection } from "@site/sections/artist-merch-promotional-section";
import { ArtistsHeaderSection } from "@site/sections/artists-header-section";

export default function ArtistsPage() {
  return (
    <StoreLayout>
      <div className="h-0.5 w-full border-b border-white/60"></div>
      <ArtistsHeaderSection />

      {/* Artist Merch Promotional Section */}
      <ArtistMerchPromotionalSection />

      <div className="bg-black py-12 text-center">
        <NextLink
          href="/artist-dashboard"
          className="text-lime-400 uppercase underline transition-colors hover:text-lime-300"
        >
          Login to Dashboard Here
        </NextLink>
      </div>
    </StoreLayout>
  );
}

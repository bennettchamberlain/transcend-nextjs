import NextLink from "next/link";

import { StoreLayout } from "@site/layouts/store-layout";
import { ArtistMerchPromotionalSection } from "@site/sections/artist-merch-promotional-section";
import { ArtistsHeaderSection } from "@site/sections/artists-header-section";
import { MulticamIntakeSection } from "@site/sections/multicam-intake-section";
import { MulticamPromotionalSection } from "@site/sections/multicam-promotional-section";

export default function ArtistsPage() {
  return (
    <StoreLayout>
      <div className="h-0.5 w-full border-b border-white/60"></div>
      <ArtistsHeaderSection />

      {/* Multicam Promotional Section */}
      <MulticamPromotionalSection />

      {/* Multicam Intake Form */}
      <MulticamIntakeSection />

      {/* Artist Merch Promotional Section */}
      <ArtistMerchPromotionalSection />

      <div className="bg-black py-12 text-center">
        <NextLink href="/artist-dashboard" className="text-lime-400 underline transition-colors hover:text-lime-300">
          Login to Dashboard Here
        </NextLink>
      </div>
    </StoreLayout>
  );
}

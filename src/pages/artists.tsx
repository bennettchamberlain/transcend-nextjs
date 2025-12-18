import NextLink from "next/link";

import { StoreLayout } from "@site/layouts/store-layout";
import { ArtistsHeaderSection } from "@site/sections/artists-header-section";
import { MulticamIntakeSection } from "@site/sections/multicam-intake-section";

export default function ArtistsPage() {
  return (
    <StoreLayout>
      <div className="h-0.5 w-full border-b border-white/60"></div>
      <ArtistsHeaderSection />
      <MulticamIntakeSection />
      <div className="bg-black py-12 text-center">
        <NextLink href="/multicam-dashboard" className="text-lime-400 underline transition-colors hover:text-lime-300">
          Login to Multicam Dashboard
        </NextLink>
      </div>
    </StoreLayout>
  );
}

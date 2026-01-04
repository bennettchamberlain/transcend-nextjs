import { StoreLayout } from "@site/layouts/store-layout";
import { ArtistMerchIntakeSection } from "@site/sections/artist-merch-intake-section";

export default function ArtistMerchIntakePage() {
  return (
    <StoreLayout>
      <div className="h-0.5 w-full border-b border-white/60"></div>
      <ArtistMerchIntakeSection />
    </StoreLayout>
  );
}

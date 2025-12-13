import { StoreLayout } from "@site/layouts/store-layout";
import { ArtistsHeaderSection } from "@site/sections/artists-header-section";

export default function ArtistsPage() {
  return (
    <StoreLayout>
      <div className="h-0.5 w-full border-b border-white/60"></div>
      <ArtistsHeaderSection />
    </StoreLayout>
  );
}

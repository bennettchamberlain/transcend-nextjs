import { StoreLayout } from "@site/layouts/store-layout";
import { HeroSection } from "@site/sections/hero-section";

export default function ArtistsPage() {
  return (
    <StoreLayout>
      <HeroSection />
      <div className="h-0.5 w-full border-b border-white/60"></div>
    </StoreLayout>
  );
}

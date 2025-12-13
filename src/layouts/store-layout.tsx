import { Analytics } from "@vercel/analytics/next";

import type { ReactNode } from "@site/utilities/deps";

import Footer from "@site/sections/footer";
import { NavigationSection } from "@site/sections/navigation-section";

interface Props {
  children: ReactNode;
}

export function StoreLayout(props: Props) {
  return (
    <>
      <Analytics />
      <NavigationSection />
      <main className="mx-auto">{props.children}</main>
      <Footer />
    </>
  );
}

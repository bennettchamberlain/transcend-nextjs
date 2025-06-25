import type { ReactNode } from "@site/utilities/deps";

import { HeaderSection } from "@site/sections/header-section";
import Footer from "@site/sections/footer";

interface Props {
  children: ReactNode;
}

export function StoreLayout(props: Props) {
  return (
    <>
      <HeaderSection />
      <main className="mx-auto">{props.children}</main>
      <Footer />
    </>
  );
}

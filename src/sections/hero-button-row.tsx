import { Zap } from "lucide-react";

import { NextLink } from "@site/utilities/deps";

export function HeroButtonRow() {
  return (
    <section className="mx-auto flex max-w-2xl items-center justify-center lg:-ml-8">
      <div className="text-center">
        <div className="flex items-center justify-center gap-x-6">
          <NextLink
            href="/products"
            className="group relative flex items-center justify-center bg-lime-400 px-6 py-3 text-lg font-bold text-black shadow-lg transition-colors duration-200 hover:bg-lime-300 hover:underline"
            style={{
              clipPath: "polygon(0 0, calc(100% - 18px) 0, 100% 18px, 100% 100%, 18px 100%, 0 calc(100% - 18px))",
            }}
          >
            <Zap className="mr-2 inline-block h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
            <p className="pt-2 text-lg font-bold text-black">ALL PRODUCTS</p>
          </NextLink>
        </div>
      </div>
    </section>
  );
}

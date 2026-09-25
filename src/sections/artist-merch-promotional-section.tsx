import NextLink from "next/link";

import { BackgroundNoise } from "@site/snippets";
import { NextImage } from "@site/utilities/deps";

export function ArtistMerchPromotionalSection() {
  return (
    <>
      {/* Merch Design for Artists */}
      <section className="relative overflow-hidden border-b border-gray-800 bg-black py-16 lg:py-24">
        {/* Neon grid texture, matching the site's other hero sections */}
        <div
          className="pointer-events-none absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(220, 255, 7, 0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(220, 255, 7, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left Column - Visual */}
            <div className="group relative">
              <div
                className="relative h-[420px] w-full overflow-hidden bg-gray-900 lg:h-[520px]"
                style={{
                  clipPath: "polygon(18px 0, 100% 0, 100% calc(100% - 18px), calc(100% - 18px) 100%, 0 100%, 0 18px)",
                }}
              >
                <NextImage
                  src="/images/merch-design-showcase.jpg"
                  alt="Custom Transcend merch design printed on an artist's tee"
                  fill
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
                <BackgroundNoise alpha={50} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Hover glow border overlay */}
                <div
                  className="product-card-glow-overlay absolute inset-0 z-10"
                  style={{
                    clipPath:
                      "polygon(18px 0, 100% 0, 100% calc(100% - 18px), calc(100% - 18px) 100%, 0 100%, 0 18px)",
                    border: "1px solid transparent",
                  }}
                />
              </div>
              {/* Corner overlay layer - diagonal borders on the cut-off corners */}
              <div className="pointer-events-none absolute inset-0 z-20">
                <div className="product-card-corner product-card-corner-tl" />
                <div className="product-card-corner product-card-corner-br" />
              </div>

              <div className="absolute bottom-6 left-0 z-30">
                <span
                  className="inline-block bg-black/80 px-3 py-1 text-xs font-bold tracking-widest text-lime-400 uppercase backdrop-blur-sm"
                  style={{ fontFamily: "AOMono" }}
                >
                  [ Custom Artist Merch ]
                </span>
              </div>
            </div>

            {/* Right Column - Content */}
            <div className="flex flex-col justify-center">
              <span
                className="mb-3 text-xs font-bold tracking-widest text-lime-400 uppercase"
                style={{ fontFamily: "AOMono" }}
              >
                [ Artist Services ]
              </span>
              <h2
                className="mb-6 text-3xl font-black text-white uppercase lg:text-4xl"
                style={{ fontFamily: "Modeseven", letterSpacing: "-1px" }}
              >
                <span className="text-neon-green neon-glow">Merchandise Design</span>
              </h2>
              <p className="mb-8 text-lg leading-relaxed text-gray-300" style={{ fontFamily: "AOMono" }}>
                Transform your artistic vision into wearable art. From concept to print-ready files, we create custom
                merchandise designs that resonate with your fans and amplify your brand.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="h-2 w-2 rounded-full bg-lime-400" style={{ boxShadow: "0 0 8px #dcff07" }}></div>
                  <span className="text-gray-300" style={{ fontFamily: "AOMono" }}>
                    Custom artwork & typography design
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="h-2 w-2 rounded-full bg-lime-400" style={{ boxShadow: "0 0 8px #dcff07" }}></div>
                  <span className="text-gray-300" style={{ fontFamily: "AOMono" }}>
                    Print-ready file preparation
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="h-2 w-2 rounded-full bg-lime-400" style={{ boxShadow: "0 0 8px #dcff07" }}></div>
                  <span className="text-gray-300" style={{ fontFamily: "AOMono" }}>
                    Mockup previews & revisions
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Artist Merch Intake CTA */}
      <section className="relative border-b border-gray-800">
        <div className="relative mx-auto aspect-[5/2] w-full max-w-[2500px]">
          <NextImage
            src="/images/artist-merch-cta-banner.png"
            alt="Ready to start? Start your merch project today."
            fill
            className="object-cover"
            priority
          />

          {/* Real clickable button, positioned over the "REQUEST HERE" graphic */}
          <NextLink
            href="/artist-merch-intake"
            className="group absolute flex items-center justify-center"
            style={{ left: "41.04%", top: "73.3%", width: "17.92%", height: "15.4%" }}
          >
            <span className="sr-only">Start Design Request</span>
            <span
              className="h-full w-full rounded-sm bg-lime-300/0 transition-all duration-200 group-hover:bg-lime-300/10"
              style={{ boxShadow: "0 0 0 rgba(220, 255, 7, 0)", transition: "box-shadow 200ms, background 200ms" }}
            />
            <span className="pointer-events-none absolute inset-0 rounded-sm opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-hover:shadow-[0_0_30px_rgba(220,255,7,0.7)]" />
          </NextLink>
        </div>
      </section>
    </>
  );
}

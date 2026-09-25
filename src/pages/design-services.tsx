import {
  Box,
  Calendar,
  Clock,
  DollarSign,
  Folder,
  Target,
  User,
  Zap,
} from "lucide-react";

import { StoreLayout } from "@site/layouts/store-layout";
import { NextImage, NextLink, NextSeo } from "@site/utilities/deps";

interface Package {
  number: string;
  title: string;
  price: string;
  description: string;
  bestFor: string[];
  timeline: string;
  deliverables: string[];
  addOns?: { label: string; price: string }[];
}

const packages: Package[] = [
  {
    number: "01",
    title: "Essential Artist Identity",
    price: "Starting at $750",
    description:
      "Your entry point into a professional visual identity. Clean, focused, and built to stand out.",
    bestFor: ["Emerging artists", "Single releases", "New aliases", "Smaller rebrands"],
    timeline: "1-2 weeks",
    deliverables: [
      "1 custom logo design",
      "2 logo variations",
      "Typography direction",
      "Basic color direction",
      "Social profile assets",
      "Export package for streaming + socials",
      "2 revision rounds",
    ],
  },
  {
    number: "02",
    title: "Artist Brand System",
    price: "Starting at $1,500-2,500",
    description:
      "A full-scale brand system to elevate your presence across every platform and release.",
    bestFor: ["Established artists", "Label-backed projects", "Artists preparing for releases/tours", "Full visual refreshes"],
    timeline: "2-4 weeks",
    deliverables: [
      "Full custom logo system",
      "Secondary logo marks",
      "Typography system",
      "Brand color palette",
      "Moodboard + visual direction",
      "Cover art direction",
      "Social media branding assets",
      "Story/post templates",
      "Press/banner graphics",
      "Mini brand guideline PDF",
      "3 revision rounds",
    ],
    addOns: [
      { label: "Motion logo animation", price: "$200-500" },
      { label: "Merchandise mockups", price: "$300-600" },
      { label: "Spotify canvas visuals", price: "$100-200" },
      { label: "Visualizer loops", price: "$300-1000" },
    ],
  },
  {
    number: "03",
    title: "Tour / Festival Visual Experience",
    price: "Starting at $3,000-7,500+",
    description:
      "Immersive visual experiences built for stages, screens, and unforgettable moments.",
    bestFor: ["Touring artists", "Festival performances", "Headline shows", "Album campaigns", "Larger management-backed acts"],
    timeline: "3-8 weeks, depending on scope",
    deliverables: [
      "Creative direction for full visual identity",
      "Custom animated show visuals",
      "Intro sequences + interlude visuals",
      "Loop packages + typography motion system",
      "LED screen formatting + performance visual pacing",
      "Visual world/mood development",
      "Branded assets for marketing rollout",
      "Technical export formatting",
      "Collaboration support with VJs/lighting teams",
      "4 revision rounds",
    ],
  },
];

const premiumAddOns = ["Tour Poster", "Social Rollout Package", "Teaser Rollout Assets", "Electronic Press Kits"];

const aLaCarteServices = [
  { label: "Cover Art", price: "$250" },
  { label: "Premium Cover Art", price: "$400" },
  { label: "Animated Cover Art", price: "$400" },
  { label: "Logo Design", price: "$750" },
  { label: "EPK", price: "$500" },
  { label: "Brand Deck", price: "$500" },
  { label: "Motion Logo Animation", price: "$300" },
  { label: "Social Promo", price: "$250" },
  { label: "Spotify Canvas", price: "$100" },
  { label: "Visualizer Loop", price: "$300" },
  { label: "Tour Poster", price: "$200" },
  { label: "Merch Design", price: "$500" },
  { label: "Intro Visual Sequence", price: "$750" },
  { label: "Full Visual Package", price: "$1000" },
];

const revisionPolicy = [
  { icon: Box, label: "Recommended Structure", highlight: true },
  { icon: DollarSign, label: "50% non-refundable deposit upfront" },
  { icon: Calendar, label: "Remaining 50% due before final delivery" },
  { icon: Clock, label: "Additional revisions billed hourly after included rounds" },
  { icon: Zap, label: "Rush delivery fee: +25-50%" },
  { icon: Folder, label: "No raw project files unless negotiated" },
  { icon: User, label: "Usage rights expand based on project scope" },
];

export default function DesignServicesPage() {
  return (
    <>
      <NextSeo
        title="Design Services"
        description="Transcend Collective Creative Services - Branding, Visual Direction, Tour Visuals, and Artist Identity Packages."
      />
      <StoreLayout>
        <div className="min-h-screen bg-black text-white">
          {/* Hero */}
          <section className="relative overflow-hidden border-b border-gray-800 py-20 lg:py-28">
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
            <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
              <span
                className="mb-3 inline-block text-xs font-bold tracking-widest text-lime-400 uppercase"
                style={{ fontFamily: "AOMono" }}
              >
                [ Creative Services ]
              </span>
              <h1
                className="mb-6 text-5xl font-black text-white uppercase md:text-6xl lg:text-7xl"
                style={{ fontFamily: "Modeseven", letterSpacing: "-1px" }}
              >
                <span className="text-neon-green neon-glow">Design Services</span>
              </h1>
              <p className="mx-auto mb-4 max-w-2xl text-lg text-gray-300 uppercase" style={{ fontFamily: "Shapiro" }}>
                Branding &bull; Visual Direction &bull; Tour Visuals &bull; Artist Identity Package
              </p>
              <p className="mx-auto max-w-xl text-sm text-gray-500 italic" style={{ fontFamily: "AOMono" }}>
                &ldquo;Unity in fragments, creation from parts.&rdquo;
              </p>
              <p className="mt-6 text-xs text-gray-500 uppercase" style={{ fontFamily: "AOMono" }}>
                Founded in 2018 &middot; transcendcollective.la
              </p>
            </div>
          </section>

          {/* Packages */}
          <section className="border-b border-gray-800 py-16 lg:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mb-12 text-center">
                <h2
                  className="mb-3 text-3xl font-black text-white uppercase lg:text-4xl"
                  style={{ fontFamily: "Modeseven", letterSpacing: "-1px" }}
                >
                  Choose Your Right Package
                </h2>
                <p className="text-sm text-gray-400 uppercase" style={{ fontFamily: "AOMono" }}>
                  Branding &bull; Visual Direction &bull; Tour Visuals &bull; Artist Identity Packages
                </p>
              </div>

              <div className="space-y-10">
                {packages.map((pkg) => (
                  <div key={pkg.number} className="group relative">
                    <div
                      className="relative overflow-hidden bg-gray-900 p-8 lg:p-10"
                      style={{
                        clipPath:
                          "polygon(24px 0, 100% 0, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0 100%, 0 24px)",
                        backgroundImage: "url('/images/metal-texture-card-bg.jpg')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    >
                      {/* Dark tint over the metal texture, so text stays legible */}
                      <div className="absolute inset-0 bg-black/90" />

                      {/* Hover glow border overlay */}
                      <div
                        className="product-card-glow-overlay pointer-events-none absolute inset-0 z-10"
                        style={{
                          clipPath:
                            "polygon(24px 0, 100% 0, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0 100%, 0 24px)",
                          border: "1px solid transparent",
                        }}
                      />

                      <div
                        className="relative grid grid-cols-1 gap-8 lg:grid-cols-[auto_1fr_1fr_1fr]"
                        style={{ textShadow: "0 2px 4px rgba(0, 0, 0, 0.85)" }}
                      >
                        {/* Number + title + price */}
                        <div className="lg:w-56">
                          <span
                            className="block text-6xl leading-none font-black text-lime-400/90 lg:text-7xl"
                            style={{ fontFamily: "Modeseven" }}
                          >
                            {pkg.number}
                          </span>
                          <h3
                            className="mt-4 mb-3 text-xl font-bold text-white uppercase lg:text-2xl"
                            style={{ fontFamily: "Modeseven" }}
                          >
                            {pkg.title}
                          </h3>
                          <span
                            className="mb-4 inline-block bg-lime-400 px-3 py-1 text-xs font-bold text-black uppercase"
                            style={{ fontFamily: "AOMono", textShadow: "none" }}
                          >
                            {pkg.price}
                          </span>
                          <p className="text-sm text-gray-400" style={{ fontFamily: "AOMono" }}>
                            {pkg.description}
                          </p>
                        </div>

                        {/* Best for + timeline */}
                        <div>
                          <div className="mb-2 flex items-center gap-2">
                            <Target className="h-6 w-6 text-lime-400" />
                            <span
                              className="text-lg font-bold tracking-widest text-lime-400 uppercase"
                              style={{ fontFamily: "AOMono" }}
                            >
                              Best For
                            </span>
                          </div>
                          <ul className="mb-6 space-y-1.5">
                            {pkg.bestFor.map((item) => (
                              <li key={item} className="text-sm text-gray-300" style={{ fontFamily: "AOMono" }}>
                                {item}
                              </li>
                            ))}
                          </ul>
                          <div className="mb-2 flex items-center gap-2">
                            <Clock className="h-6 w-6 text-lime-400" />
                            <span
                              className="text-lg font-bold tracking-widest text-lime-400 uppercase"
                              style={{ fontFamily: "AOMono" }}
                            >
                              Timeline
                            </span>
                          </div>
                          <p className="text-sm text-gray-300" style={{ fontFamily: "AOMono" }}>
                            {pkg.timeline}
                          </p>
                        </div>

                        {/* Deliverables */}
                        <div>
                          <div className="mb-2 flex items-center gap-2">
                            <Zap className="h-6 w-6 text-lime-400" />
                            <span
                              className="text-lg font-bold tracking-widest text-lime-400 uppercase"
                              style={{ fontFamily: "AOMono" }}
                            >
                              Deliverables
                            </span>
                          </div>
                          <ul className="space-y-1.5">
                            {pkg.deliverables.map((item) => (
                              <li
                                key={item}
                                className="flex items-start gap-2 text-sm text-gray-300"
                                style={{ fontFamily: "AOMono" }}
                              >
                                <span className="mt-1.5 h-1 w-1 flex-none rounded-full bg-lime-400" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Add-ons, if any */}
                        <div>
                          {pkg.addOns && (
                            <>
                              <div className="mb-2 flex items-center gap-2">
                                <DollarSign className="h-6 w-6 text-lime-400" />
                                <span
                                  className="text-lg font-bold tracking-widest text-lime-400 uppercase"
                                  style={{ fontFamily: "AOMono" }}
                                >
                                  Add-On Options
                                </span>
                              </div>
                              <ul className="space-y-1.5">
                                {pkg.addOns.map((addOn) => (
                                  <li
                                    key={addOn.label}
                                    className="flex items-center justify-between gap-3 text-sm text-gray-300"
                                    style={{ fontFamily: "AOMono" }}
                                  >
                                    <span>{addOn.label}</span>
                                    <span className="text-lime-400">{addOn.price}</span>
                                  </li>
                                ))}
                              </ul>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    {/* Corner overlay - diagonal borders on the cut-off corners */}
                    <div className="pointer-events-none absolute inset-0 z-20">
                      <div className="product-card-corner product-card-corner-tl" />
                      <div className="product-card-corner product-card-corner-br" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Premium add-ons */}
              <div className="mt-12 flex flex-wrap items-center justify-center gap-3 border-t border-gray-800 pt-10">
                <span
                  className="mr-2 text-xs font-bold tracking-widest text-gray-500 uppercase"
                  style={{ fontFamily: "AOMono" }}
                >
                  Optional Premium Add-Ons:
                </span>
                {premiumAddOns.map((label) => (
                  <span
                    key={label}
                    className="border border-gray-700 px-3 py-1 text-xs text-gray-300 uppercase"
                    style={{ fontFamily: "AOMono" }}
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* A La Carte Services */}
          <section className="border-b border-gray-800 py-16 lg:py-24">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
              <div className="mb-10 text-center">
                <h2
                  className="mb-3 text-3xl font-black uppercase lg:text-4xl"
                  style={{ fontFamily: "Modeseven", letterSpacing: "-1px" }}
                >
                  <span className="text-neon-green neon-glow">Not Ready to Commit to a Package?</span>
                </h2>
                <p className="text-sm text-gray-400 uppercase" style={{ fontFamily: "AOMono" }}>
                  A La Carte Services
                </p>
              </div>

              <div className="group relative">
                <div
                  className="relative overflow-hidden bg-gray-900 p-6 lg:p-10"
                  style={{
                    clipPath:
                      "polygon(24px 0, 100% 0, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0 100%, 0 24px)",
                    backgroundImage: "url('/images/metal-texture-card-bg.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    boxShadow:
                      "0 25px 50px rgba(0, 0, 0, 0.65), inset 0 1px 0 rgba(255, 255, 255, 0.12), inset 0 -2px 6px rgba(0, 0, 0, 0.6)",
                  }}
                >
                  {/* Dark tint over the brushed-metal texture, so text stays legible */}
                  <div className="absolute inset-0 bg-black/85" />

                  {/* Hover glow border overlay */}
                  <div
                    className="product-card-glow-overlay pointer-events-none absolute inset-0 z-10"
                    style={{
                      clipPath:
                        "polygon(24px 0, 100% 0, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0 100%, 0 24px)",
                      border: "1px solid transparent",
                    }}
                  />

                  <div
                    className="relative grid grid-cols-1 gap-x-12 gap-y-1 md:grid-cols-2"
                    style={{ textShadow: "0 2px 4px rgba(0, 0, 0, 0.85)" }}
                  >
                    {aLaCarteServices.map((service) => (
                      <div
                        key={service.label}
                        className="flex items-center justify-between border-b border-gray-700/60 py-3 last:border-b-0"
                      >
                        <span className="text-sm text-gray-300 uppercase" style={{ fontFamily: "AOMono" }}>
                          {service.label}
                        </span>
                        <span
                          className="bg-lime-400 px-2.5 py-0.5 text-sm font-bold text-black"
                          style={{ fontFamily: "AOMono", textShadow: "none" }}
                        >
                          {service.price}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Corner overlay - diagonal borders on the cut-off corners */}
                <div className="pointer-events-none absolute inset-0 z-20">
                  <div className="product-card-corner product-card-corner-tl" />
                  <div className="product-card-corner product-card-corner-br" />
                </div>
              </div>

              <p className="mt-6 text-center text-sm text-gray-500" style={{ fontFamily: "AOMono" }}>
                Custom quotes available based on scope and timeline.
              </p>
            </div>
          </section>

          {/* Revision Policy */}
          <section className="border-b border-gray-800 py-16 lg:py-24">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <h2
                className="mb-10 text-center text-3xl font-black text-white uppercase lg:text-4xl"
                style={{ fontFamily: "Modeseven", letterSpacing: "-1px" }}
              >
                Revision Policy
              </h2>
              <div className="group relative">
                <div
                  className="relative overflow-hidden bg-gray-900 p-8 lg:p-10"
                  style={{
                    clipPath:
                      "polygon(24px 0, 100% 0, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0 100%, 0 24px)",
                    backgroundImage: "url('/images/metal-texture-card-bg.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    boxShadow:
                      "0 25px 50px rgba(0, 0, 0, 0.65), inset 0 1px 0 rgba(255, 255, 255, 0.12), inset 0 -2px 6px rgba(0, 0, 0, 0.6)",
                  }}
                >
                  {/* Dark tint over the brushed-metal texture, so text stays legible */}
                  <div className="absolute inset-0 bg-black/85" />

                  {/* Hover glow border overlay */}
                  <div
                    className="product-card-glow-overlay pointer-events-none absolute inset-0 z-10"
                    style={{
                      clipPath:
                        "polygon(24px 0, 100% 0, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0 100%, 0 24px)",
                      border: "1px solid transparent",
                    }}
                  />

                  <div
                    className="relative grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-7"
                    style={{ textShadow: "0 2px 4px rgba(0, 0, 0, 0.85)" }}
                  >
                    {revisionPolicy.map(({ icon: Icon, label, highlight }) => (
                      <div key={label} className="flex flex-col items-center text-center">
                        <Icon className={`mb-3 h-6 w-6 ${highlight ? "text-lime-400" : "text-gray-400"}`} />
                        <span
                          className={`text-xs ${highlight ? "font-bold text-lime-400 underline" : "text-gray-400"}`}
                          style={{ fontFamily: "AOMono" }}
                        >
                          {label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Corner overlay - diagonal borders on the cut-off corners */}
                <div className="pointer-events-none absolute inset-0 z-20">
                  <div className="product-card-corner product-card-corner-tl" />
                  <div className="product-card-corner product-card-corner-br" />
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="relative border-b border-gray-800">
            <div className="relative mx-auto aspect-[5/2] w-full max-w-[2500px]">
              <NextImage
                src="/images/design-services-cta-banner.png"
                alt="Ready to start your project? Tell us about your vision and we'll help you find the right package."
                fill
                className="object-cover"
                priority
              />

              {/* Real clickable button, positioned over the "REQUEST HERE" graphic */}
              <NextLink
                href="/artist-merch-intake"
                className="group absolute flex items-center justify-center"
                style={{ left: "41.04%", top: "74.3%", width: "17.92%", height: "15.4%" }}
              >
                <span className="sr-only">Start Design Request</span>
                <span
                  className="h-full w-full rounded-sm bg-lime-300/0 transition-all duration-200 group-hover:bg-lime-300/10"
                  style={{ boxShadow: "0 0 0 rgba(220, 255, 7, 0)", transition: "box-shadow 200ms, background 200ms" }}
                />
                <span className="pointer-events-none absolute inset-0 rounded-sm opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-hover:shadow-[0_0_30px_rgba(220,255,7,0.7)]" />
              </NextLink>
            </div>
            <div className="py-8 text-center">
              <NextLink
                href="mailto:aaron.transcend@gmail.com"
                className="text-sm text-gray-400 uppercase underline transition-colors hover:text-white"
                style={{ fontFamily: "AOMono" }}
              >
                Or contact us directly
              </NextLink>
            </div>
          </section>
        </div>
      </StoreLayout>
    </>
  );
}

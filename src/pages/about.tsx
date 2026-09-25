import { Palette, TrendingUp, Users } from "lucide-react";
import Image from "next/image";

import { StoreLayout } from "@site/layouts/store-layout";
import { AnimatedGrainOverlay } from "@site/snippets";
import { NextSeo } from "@site/utilities/deps";

const cardClipPath = "polygon(24px 0, 100% 0, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0 100%, 0 24px)";
const cardShadow =
  "0 25px 50px rgba(0, 0, 0, 0.65), inset 0 1px 0 rgba(255, 255, 255, 0.12), inset 0 -2px 6px rgba(0, 0, 0, 0.6)";
const tileClipPath = "polygon(18px 0, 100% 0, 100% calc(100% - 18px), calc(100% - 18px) 100%, 0 100%, 0 18px)";

const values = [
  {
    icon: TrendingUp,
    label: "Growth",
    description:
      "We believe in continuous improvement and helping others reach their full potential through mentorship, resources, and community support.",
  },
  {
    icon: Users,
    label: "Community",
    description:
      "Building meaningful connections and fostering a supportive environment where creativity thrives and collaboration leads to innovation.",
  },
  {
    icon: Palette,
    label: "Design",
    description:
      "Spreading good design principles and creating beautiful, functional experiences that inspire and elevate the world around us.",
  },
];

function About() {
  // All select photos to feature in the gallery
  const selectPhotos = [
    // Warren shoot photos interspersed throughout
    { src: "/images/selects/warren_shoot/WDS00252.jpg", alt: "Transcend Collective - Warren Shoot" },
    { src: "/images/selects/warren_shoot/WDS00677.jpg", alt: "Transcend Collective - Warren Shoot" },
    { src: "/images/selects/warren_shoot/WDS00542.jpg", alt: "Transcend Collective - Warren Shoot" },
    { src: "/images/selects/warren_shoot/WDS00603.jpg", alt: "Transcend Collective - Warren Shoot" },
    { src: "/images/selects/warren_shoot/WDS00128.jpg", alt: "Transcend Collective - Warren Shoot" },
    { src: "/images/selects/warren_shoot/CaptureOne0116.JPG", alt: "Transcend Collective - Warren Shoot" },
    { src: "/images/selects/warren_shoot/WDS00075.JPEG", alt: "Transcend Collective - Warren Shoot" },
    { src: "/images/selects/warren_shoot/WDS00303.jpg", alt: "Transcend Collective - Warren Shoot" },
    { src: "/images/selects/warren_shoot/WDS00394.jpg", alt: "Transcend Collective - Warren Shoot" },
    { src: "/images/selects/warren_shoot/WDS00414.jpg", alt: "Transcend Collective - Warren Shoot" },
    { src: "/images/selects/warren_shoot/WDS00463.jpg", alt: "Transcend Collective - Warren Shoot" },
    { src: "/images/selects/warren_shoot/WDS00716.jpg", alt: "Transcend Collective - Warren Shoot" },
    { src: "/images/selects/IMG_6488.JPG", alt: "Transcend Collective - Artistic Vision" },
    { src: "/images/selects/DSC09111.jpg", alt: "Transcend Collective - Team Collaboration" },
    { src: "/images/selects/Copy of DSC08855.jpg", alt: "Transcend Collective - Creative Collaboration" },
    { src: "/images/selects/Copy of DSC09125.jpg", alt: "Transcend Collective - Growth" },
    { src: "/images/selects/Copy of DSC08983-3.jpg", alt: "Transcend Collective - Inspiration" },
    { src: "/images/selects/DSC09414.jpg", alt: "Transcend Collective - Creative Vision" },
    { src: "/images/selects/Copy of DSC09077.jpg", alt: "Transcend Collective - Creative Energy" },
    { src: "/images/selects/IMG_7979.jpg", alt: "Transcend Collective - Design Excellence" },
    { src: "/images/selects/DSC09172.jpg", alt: "Transcend Collective - Innovation" },
    { src: "/images/selects/Copy of IMG_6493.JPG", alt: "Transcend Collective - Creative Moments" },
    // Previous featured/banner images moved to bottom
    { src: "/images/selects/DSC08094.jpg", alt: "Transcend Collective - Creative Flow" },
  ];

  return (
    <>
      <NextSeo
        title="About Us"
        description="Learn about Transcend Collective's mission to help others grow and spread good design through community and creativity. Clothing for a digital world."
        openGraph={{
          title: 'About Transcend Collective',
          description: 'Learn about Transcend Collective\'s mission to help others grow and spread good design through community and creativity. Clothing for a digital world.',
          url: 'https://transcendcollective.la/about',
          type: 'website',
        }}
      />

      <StoreLayout>
        <div className="min-h-screen bg-black text-white">
          {/* Hero Section */}
          <div className="mx-auto max-w-6xl px-4 pt-16 pb-10">
            <section className="text-center">
              <div
                className="relative right-1/2 left-1/2 mb-6 -mx-[50vw] w-screen"
                style={{ marginTop: "-150px" }}
              >
                <div className="relative aspect-[3200/1638] w-full">
                  <Image
                    src="/images/transcend-banner-design.png"
                    alt="TRANSCEND COLLECTIVE"
                    fill
                    className="object-cover"
                    sizes="100vw"
                    quality={100}
                    priority
                  />
                  {/* Subtle animated grain, masks any residual compression banding in the dark areas and adds movement */}
                  <AnimatedGrainOverlay alpha={6} className="mix-blend-screen" />
                </div>
              </div>
              <p className="mx-auto max-w-2xl text-lg text-gray-300 uppercase" style={{ fontFamily: "Shapiro" }}>
                A movement dedicated to growth, helping others, and spreading good design through community and
                creativity.
              </p>
            </section>
          </div>

          {/* Our Story */}
          <section className="border-t border-b border-gray-800 py-16 lg:py-24">
            <div className="mx-auto grid max-w-6xl gap-12 px-4 lg:grid-cols-2 lg:gap-16">
              <div className="space-y-6">
                <div>
                  <span
                    className="mb-3 inline-block text-xs font-bold tracking-widest text-lime-400 uppercase"
                    style={{ fontFamily: "AOMono" }}
                  >
                    [ Since 2018 ]
                  </span>
                  <h2
                    className="text-4xl font-black text-white uppercase lg:text-5xl"
                    style={{ fontFamily: "Modeseven", letterSpacing: "-1px" }}
                  >
                    Our Story
                  </h2>
                </div>

                <div className="group relative">
                  <div
                    className="relative overflow-hidden bg-gray-900 p-6 lg:p-8"
                    style={{
                      clipPath: cardClipPath,
                      backgroundImage: "url('/images/metal-texture-card-bg.jpg')",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      boxShadow: cardShadow,
                    }}
                  >
                    {/* Dark tint over the brushed-metal texture, so text stays legible */}
                    <div className="absolute inset-0 bg-black/85" />

                    {/* Hover glow border overlay */}
                    <div
                      className="product-card-glow-overlay pointer-events-none absolute inset-0 z-10"
                      style={{ clipPath: cardClipPath, border: "1px solid transparent" }}
                    />

                    <div
                      className="relative space-y-4 leading-relaxed text-gray-300 uppercase"
                      style={{ fontFamily: "AOMono", fontSize: "13px", textShadow: "0 2px 4px rgba(0, 0, 0, 0.85)" }}
                    >
                      <p>
                        <span style={{ fontFamily: "Modeseven", fontSize: "22px", color: "#cbff41" }}>
                          Transcend Collective{" "}
                        </span>
                        was born from a simple yet powerful vision: to create a platform where growth, community, and
                        good design converge. We believe that true success comes not just from individual
                        achievement, but from lifting others up and creating meaningful connections.
                      </p>
                      <p>
                        What started as a passion project has evolved into a movement that transcends traditional
                        boundaries. We're not just a brand&mdash;we're a collective of creators, dreamers, and doers
                        who believe in the power of collaboration and shared growth.
                      </p>
                      <p>
                        <span style={{ fontFamily: "Modeseven", fontSize: "22px", color: "#cbff41" }}>
                          Our mission is clear:{" "}
                        </span>
                        to help others grow, to spread good design, and to build a community where everyone has the
                        opportunity to thrive. We're committed to creating spaces where creativity flourishes and
                        where every voice has the chance to be heard.
                      </p>
                    </div>
                  </div>
                  {/* Corner overlay - diagonal borders on the cut-off corners */}
                  <div className="pointer-events-none absolute inset-0 z-20">
                    <div className="product-card-corner product-card-corner-tl" />
                    <div className="product-card-corner product-card-corner-br" />
                  </div>
                </div>
              </div>

              <div className="relative aspect-[3/4] h-full min-h-[400px] lg:aspect-auto">
                <Image
                  src="/images/transcend-for-site.png"
                  alt="Transcend Collective Story"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="beveled-corner-large object-cover"
                />
              </div>
            </div>
          </section>

          {/* Our Mission */}
          <section className="border-b border-gray-800 py-16 lg:py-24">
            <div className="mx-auto max-w-6xl px-4">
              {/* Mission Statement Banner */}
              <div className="relative mb-10 aspect-[5/2] w-full overflow-hidden rounded-lg">
                <Image
                  src="/images/mission-hero-banner.png"
                  alt="Our Mission. We are focused on growth and helping others. Our commitment is to spread good design, foster meaningful connections, and create opportunities for creative minds to flourish. We believe that by supporting each other, we can achieve more than we ever could alone."
                  fill
                  className="object-cover"
                />
              </div>

              {/* Values */}
              <div className="group relative">
                <div
                  className="relative overflow-hidden bg-gray-900 p-8 lg:p-10"
                  style={{
                    clipPath: cardClipPath,
                    backgroundImage: "url('/images/metal-texture-card-bg.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    boxShadow: cardShadow,
                  }}
                >
                  <div className="absolute inset-0 bg-black/85" />
                  <div
                    className="product-card-glow-overlay pointer-events-none absolute inset-0 z-10"
                    style={{ clipPath: cardClipPath, border: "1px solid transparent" }}
                  />
                  <div className="relative grid gap-10 sm:grid-cols-3">
                    {values.map(({ icon: Icon, label, description }) => (
                      <div key={label} className="text-center">
                        <Icon className="mx-auto mb-4 h-8 w-8 text-lime-400" />
                        <h3
                          className="mb-3 text-lg font-bold tracking-widest text-white uppercase"
                          style={{ fontFamily: "Modeseven", textShadow: "0 2px 4px rgba(0, 0, 0, 0.85)" }}
                        >
                          {label}
                        </h3>
                        <p
                          className="text-sm text-gray-300 uppercase"
                          style={{ fontFamily: "AOMono", textShadow: "0 2px 4px rgba(0, 0, 0, 0.85)" }}
                        >
                          {description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="pointer-events-none absolute inset-0 z-20">
                  <div className="product-card-corner product-card-corner-tl" />
                  <div className="product-card-corner product-card-corner-br" />
                </div>
              </div>
            </div>
          </section>

          {/* Banner Image Section */}
          <section className="relative border-b border-gray-800">
            <div className="relative h-[350px] w-full overflow-hidden py-10 md:h-[492px]">
              <Image
                src="/images/selects/warren_shoot/WDS00630.jpg"
                alt="Transcend Collective - Behind the Scenes"
                fill
                className="beveled-corner-large object-contain object-top md:object-cover md:object-bottom"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
          </section>

          {/* Extended Image Gallery - All Select Photos */}
          <section className="border-b border-gray-800 py-16 lg:py-24">
            <div className="mx-auto max-w-6xl space-y-10 px-4">
              <div className="text-center">
                <span
                  className="mb-3 inline-block text-xs font-bold tracking-widest text-lime-400 uppercase"
                  style={{ fontFamily: "AOMono" }}
                >
                  [ Behind The Brand ]
                </span>
                <h2
                  className="text-3xl font-black text-white uppercase lg:text-4xl"
                  style={{ fontFamily: "Modeseven", letterSpacing: "-1px" }}
                >
                  Our Journey
                </h2>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {selectPhotos.map((photo) => (
                  <div key={`select-${photo.src}`} className="group relative">
                    <div className="relative h-72 w-full overflow-hidden bg-gray-800" style={{ clipPath: tileClipPath }}>
                      <div
                        className="product-card-glow-overlay pointer-events-none absolute inset-0 z-10"
                        style={{ clipPath: tileClipPath, border: "1px solid transparent" }}
                      />
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="pointer-events-none absolute inset-0 z-20">
                      <div className="product-card-corner product-card-corner-tl" />
                      <div className="product-card-corner product-card-corner-br" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="py-16 lg:py-24">
            <div className="mx-auto max-w-4xl px-4 text-center">
              <div className="group relative">
                <div
                  className="relative overflow-hidden bg-gray-900 p-8 lg:p-12"
                  style={{
                    clipPath: cardClipPath,
                    backgroundImage: "url('/images/metal-texture-card-bg.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    boxShadow: cardShadow,
                  }}
                >
                  <div className="absolute inset-0 bg-black/85" />
                  <div
                    className="product-card-glow-overlay pointer-events-none absolute inset-0 z-10"
                    style={{ clipPath: cardClipPath, border: "1px solid transparent" }}
                  />
                  <div className="relative" style={{ textShadow: "0 2px 4px rgba(0, 0, 0, 0.85)" }}>
                    <span
                      className="mb-3 inline-block text-xs font-bold tracking-widest text-lime-400 uppercase"
                      style={{ fontFamily: "AOMono" }}
                    >
                      [ Join Us ]
                    </span>
                    <h2
                      className="mb-4 text-3xl font-black text-white uppercase lg:text-4xl"
                      style={{ fontFamily: "Modeseven", letterSpacing: "-1px" }}
                    >
                      Join Our Movement
                    </h2>
                    <p
                      className="mx-auto mb-8 max-w-2xl text-sm text-gray-300 uppercase lg:text-base"
                      style={{ fontFamily: "AOMono" }}
                    >
                      Ready to be part of something bigger? Join our community of creators, designers, and innovators
                      who are committed to growth, helping others, and spreading good design.
                    </p>
                    <div className="flex flex-col justify-center gap-4 sm:flex-row">
                      <a
                        href="/products"
                        className="group/btn relative inline-flex cursor-pointer items-center justify-center bg-white/70 px-px py-px shadow-lg transition-colors duration-200 hover:bg-gray-100/70"
                        style={{
                          clipPath: "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))",
                        }}
                      >
                        <span
                          className="flex items-center justify-center bg-black px-8 py-3 text-sm font-bold tracking-widest text-white uppercase transition-all duration-200 group-hover/btn:bg-gray-900 group-hover/btn:shadow-[inset_0_0_16px_rgba(220,255,7,0.35)]"
                          style={{
                            fontFamily: "AOMono",
                            clipPath:
                              "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))",
                          }}
                        >
                          Shop Our Collection
                        </span>
                      </a>
                      <a
                        href="mailto:aaron.transcend@gmail.com?subject=Transcend%20Collective%20Collaboration"
                        className="border border-gray-700 px-8 py-3 text-sm font-bold tracking-widest text-gray-300 uppercase transition-colors duration-200 hover:border-lime-400 hover:text-lime-400"
                        style={{ fontFamily: "AOMono" }}
                      >
                        Get In Touch
                      </a>
                    </div>
                  </div>
                </div>
                <div className="pointer-events-none absolute inset-0 z-20">
                  <div className="product-card-corner product-card-corner-tl" />
                  <div className="product-card-corner product-card-corner-br" />
                </div>
              </div>
            </div>
          </section>
        </div>
      </StoreLayout>
    </>
  );
}

export default About;

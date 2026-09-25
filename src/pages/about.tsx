import Image from "next/image";
import React, { useCallback, useEffect, useRef, useState } from "react";

import { StoreLayout } from "@site/layouts/store-layout";
import { AnimatedGrainOverlay } from "@site/snippets";
import { NextSeo } from "@site/utilities/deps";

function About() {
  const storyRef = useRef<HTMLHeadingElement>(null);
  const journeyRef = useRef<HTMLHeadingElement>(null);

  const [isStoryAnimated, setIsStoryAnimated] = useState(false);
  const [isJourneyAnimated, setIsJourneyAnimated] = useState(false);

  const [storyText, setStoryText] = useState("OUR STORY");
  const [journeyText, setJourneyText] = useState("OUR JOURNEY");

  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const storyTarget = "OUR STORY";
  const journeyTarget = "OUR JOURNEY";

  const triggerStoryAnimation = useCallback(() => {
    let iterations = 0;
    const interval = setInterval(() => {
      setStoryText(
        storyTarget
          .split("")
          .map((_, index) => {
            if (index <= iterations + 1) {
              return storyTarget[index];
            }
            return letters[Math.floor(Math.random() * letters.length)];
          })
          .join(""),
      );

      if (iterations >= storyTarget.length) {
        clearInterval(interval);
        setStoryText(storyTarget);
      }

      iterations += 1 / 3;
    }, 30);
  }, [storyTarget, letters]);

  const triggerJourneyAnimation = useCallback(() => {
    let iterations = 0;
    const interval = setInterval(() => {
      setJourneyText(
        journeyTarget
          .split("")
          .map((_, index) => {
            if (index <= iterations + 1) {
              return journeyTarget[index];
            }
            return letters[Math.floor(Math.random() * letters.length)];
          })
          .join(""),
      );

      if (iterations >= journeyTarget.length) {
        clearInterval(interval);
        setJourneyText(journeyTarget);
      }

      iterations += 1 / 3;
    }, 30);
  }, [journeyTarget, letters]);

  // Scroll-triggered animation for Our Story
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isStoryAnimated) {
            setIsStoryAnimated(true);
            triggerStoryAnimation();
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: "0px 0px -400px 0px",
      },
    );

    const currentStoryRef = storyRef.current;
    if (currentStoryRef) {
      observer.observe(currentStoryRef);
    }

    return () => {
      if (currentStoryRef) {
        observer.unobserve(currentStoryRef);
      }
    };
  }, [isStoryAnimated, triggerStoryAnimation]);

  // Scroll-triggered animation for Our Journey
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isJourneyAnimated) {
            setIsJourneyAnimated(true);
            triggerJourneyAnimation();
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: "0px 0px -400px 0px",
      },
    );

    const currentJourneyRef = journeyRef.current;
    if (currentJourneyRef) {
      observer.observe(currentJourneyRef);
    }

    return () => {
      if (currentJourneyRef) {
        observer.unobserve(currentJourneyRef);
      }
    };
  }, [isJourneyAnimated, triggerJourneyAnimation]);

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
          {/* Main Content */}
          <main className="mx-auto max-w-6xl px-4 py-16">
            <div className="">
              {/* Hero Section */}
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
                <p className="mx-auto max-w-3xl text-xl text-gray-300 uppercase" style={{ fontFamily: "Modeseven" }}>
                  A movement dedicated to growth, helping others, and spreading good design through community and
                  creativity.
                </p>
              </section>

              {/* Main Story Section */}
              <section className="grid gap-12 pb-10 lg:grid-cols-2 lg:gap-16">
                <div className="space-y-6 pt-40">
                  <h2
                    ref={storyRef}
                    className="cursor-pointer text-5xl font-semibold text-white uppercase transition-all duration-200"
                    style={{ fontFamily: "Divine", letterSpacing: "0px" }}
                  >
                    {storyText}
                  </h2>
                  <div className="space-y-4 leading-relaxed text-gray-300 uppercase" style={{ fontFamily: "Shapiro" }}>
                    <p>
                      <span
                        style={{
                          fontFamily: "Modeseven",
                          textTransform: "uppercase",
                          fontSize: "24px",
                          color: "white",
                        }}
                      >
                        Transcend Collective{" "}
                      </span>
                      <span
                        style={{ fontFamily: "AOMono", textTransform: "uppercase", fontSize: "14px", lineHeight: "0" }}
                      >
                        {" "}
                        was born from a simple yet powerful vision: to create a platform where growth, community, and
                        good design converge. We believe that true success comes not just from individual achievement,
                        but from lifting others up and creating meaningful connections.
                      </span>
                    </p>
                    <p style={{ fontFamily: "AOMono", textTransform: "uppercase", fontSize: "14px" }}>
                      What started as a passion project has evolved into a movement that transcends traditional
                      boundaries. We're not just a brand—we're a collective of creators, dreamers, and doers who believe
                      in the power of collaboration and shared growth.
                    </p>
                    <p style={{ fontFamily: "AOMono", textTransform: "uppercase", fontSize: "14px" }}>
                      <span
                        style={{
                          fontFamily: "Modeseven",
                          textTransform: "uppercase",
                          fontSize: "24px",
                          color: "white",
                        }}
                      >
                        Our mission is clear:{" "}
                      </span>{" "}
                      to help others grow, to spread good design, and to build a community where everyone has the
                      opportunity to thrive. We're committed to creating spaces where creativity flourishes and where
                      every voice has the chance to be heard.
                    </p>
                  </div>
                </div>
                <div className="relative" >
                  <Image
                    src="/images/selects/warren_shoot/WDS00174.jpg"
                    alt="Transcend Collective Story"
                    width={600}
                    height={400}
                    className="beveled-corner-large object-cover"
                  />
                </div>
              </section>

              {/* Mission Section */}
              <section className="relative mb-10 aspect-[5/2] w-full overflow-hidden rounded-lg">
                <Image
                  src="/images/mission-hero-banner.png"
                  alt="Our Mission. We are focused on growth and helping others. Our commitment is to spread good design, foster meaningful connections, and create opportunities for creative minds to flourish. We believe that by supporting each other, we can achieve more than we ever could alone."
                  fill
                  className="object-cover"
                />
              </section>

              {/* Values Section */}
              <section className="grid gap-8 md:grid-cols-3">
                <div className="space-y-4 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-700">
                    <svg className="h-8 w-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-white uppercase" style={{ fontFamily: "Shapiro" }}>
                    Growth
                  </h3>
                  <p className="text-gray-300 uppercase" style={{ fontFamily: "Modeseven" }}>
                    We believe in continuous improvement and helping others reach their full potential through
                    mentorship, resources, and community support.
                  </p>
                </div>
                <div className="space-y-4 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-700">
                    <svg className="h-8 w-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-white uppercase" style={{ fontFamily: "Shapiro" }}>
                    Community
                  </h3>
                  <p className="text-gray-300 uppercase" style={{ fontFamily: "Modeseven" }}>
                    Building meaningful connections and fostering a supportive environment where creativity thrives and
                    collaboration leads to innovation.
                  </p>
                </div>
                <div className="space-y-4 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-700">
                    <svg className="h-8 w-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-white uppercase" style={{ fontFamily: "Shapiro" }}>
                    Design
                  </h3>
                  <p className="text-gray-300 uppercase" style={{ fontFamily: "Modeseven" }}>
                    Spreading good design principles and creating beautiful, functional experiences that inspire and
                    elevate the world around us.
                  </p>
                </div>
              </section>

              {/* Banner Image Section */}
              <section className="relative pt-10">
                <div className="relative h-[350px] w-full overflow-hidden pt-20 pb-10 md:h-[492px]">
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
              <section className="space-y-8 pt-10">
                <h2
                  ref={journeyRef}
                  className="cursor-pointer text-center text-3xl font-semibold text-white uppercase transition-all duration-200"
                  style={{ fontFamily: "Divine" }}
                >
                  {journeyText}
                </h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {selectPhotos.map((photo) => (
                    <div key={`select-${photo.src}`} className="group relative overflow-hidden">
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        width={400}
                        height={300}
                        className="beveled-corner-large h-72 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        style={
                          (photo as any).objectPosition ? { objectPosition: (photo as any).objectPosition } : undefined
                        }
                      />
                      <div className="beveled-corner-large absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    </div>
                  ))}
                </div>
              </section>

              {/* Call to Action */}
              <section className="text-center">
                <div className="rounded-lg border border-gray-700 bg-gradient-to-r from-gray-900/50 to-gray-800/50 p-8">
                  <h2
                    className="mb-4 text-3xl font-semibold text-white uppercase"
                    style={{ fontFamily: "Shapiro", letterSpacing: "0px" }}
                  >
                    Join Our Movement
                  </h2>
                  <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-300 uppercase">
                    Ready to be part of something bigger? Join our community of creators, designers, and innovators who
                    are committed to growth, helping others, and spreading good design.
                  </p>
                  <div className="flex flex-col justify-center gap-4 sm:flex-row">
                    <a
                      href="/products"
                      className="rounded bg-lime-500 px-8 py-3 font-semibold text-black uppercase transition-colors hover:bg-lime-400"
                    >
                      Shop Our Collection
                    </a>
                    <a
                      href="mailto:aaron.transcend@gmail.com?subject=Transcend%20Collective%20Collaboration"
                      className="rounded border border-gray-400 px-8 py-3 font-semibold text-gray-300 uppercase transition-colors hover:bg-gray-700 hover:text-white"
                    >
                      Get In Touch
                    </a>
                  </div>
                </div>
              </section>
            </div>
          </main>
        </div>
      </StoreLayout>
    </>
  );
}

export default About;

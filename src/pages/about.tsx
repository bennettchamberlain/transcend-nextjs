import Head from "next/head";
import Image from "next/image";
import React from "react";

import { StoreLayout } from "@site/layouts/store-layout";

function About() {
  return (
    <>
      <Head>
        <title>About - Transcend Collective</title>
        <meta
          name="description"
          content="Learn about Transcend Collective's mission to help others grow and spread good design through community and creativity."
        />
      </Head>

      <StoreLayout>
        <div className="min-h-screen bg-black text-white">
          {/* Main Content */}
          <main className="mx-auto max-w-6xl px-4 py-16">
            <div className="space-y-16">
              {/* Hero Section */}
              <section className="text-center">
                <h1 className="mb-6 text-5xl font-bold text-lime-500">About Transcend Collective</h1>
                <p className="mx-auto max-w-3xl text-xl text-gray-300">
                  A movement dedicated to growth, helping others, and spreading good design through community and
                  creativity.
                </p>
              </section>

              {/* Main Story Section */}
              <section className="grid gap-12 lg:grid-cols-2 lg:gap-16">
                <div className="space-y-6">
                  <h2 className="text-3xl font-semibold text-lime-400">Our Story</h2>
                  <div className="space-y-4 leading-relaxed text-gray-300">
                    <p>
                      Transcend Collective was born from a simple yet powerful vision: to create a platform where
                      growth, community, and good design converge. We believe that true success comes not just from
                      individual achievement, but from lifting others up and creating meaningful connections.
                    </p>
                    <p>
                      What started as a passion project has evolved into a movement that transcends traditional
                      boundaries. We're not just a brand—we're a collective of creators, dreamers, and doers who believe
                      in the power of collaboration and shared growth.
                    </p>
                    <p>
                      Our mission is clear: to help others grow, to spread good design, and to build a community where
                      everyone has the opportunity to thrive. We're committed to creating spaces where creativity
                      flourishes and where every voice has the chance to be heard.
                    </p>
                  </div>
                </div>
                <div className="relative">
                  <Image
                    src="https://checkout.transcendcollective.la/cdn/shop/files/Untitled-2.png?v=1716979542&width=1426"
                    alt="Transcend Collective Story"
                    width={600}
                    height={400}
                    className="rounded-lg object-cover"
                  />
                </div>
              </section>

              {/* Mission Section */}
              <section className="rounded-lg border border-gray-700 bg-gradient-to-r from-gray-900/50 to-gray-800/50 p-8">
                <div className="space-y-6 text-center">
                  <h2 className="text-3xl font-semibold text-lime-400">Our Mission</h2>
                  <p className="mx-auto max-w-4xl text-lg leading-relaxed text-gray-300">
                    We are focused on growth and helping others. Our commitment is to spread good design, foster
                    meaningful connections, and create opportunities for creative minds to flourish. We believe that by
                    supporting each other, we can achieve more than we ever could alone.
                  </p>
                </div>
              </section>

              {/* Values Section */}
              <section className="grid gap-8 md:grid-cols-3">
                <div className="space-y-4 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-lime-500/20">
                    <svg className="h-8 w-8 text-lime-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-lime-400">Growth</h3>
                  <p className="text-gray-300">
                    We believe in continuous improvement and helping others reach their full potential through
                    mentorship, resources, and community support.
                  </p>
                </div>
                <div className="space-y-4 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-lime-500/20">
                    <svg className="h-8 w-8 text-lime-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-lime-400">Community</h3>
                  <p className="text-gray-300">
                    Building meaningful connections and fostering a supportive environment where creativity thrives and
                    collaboration leads to innovation.
                  </p>
                </div>
                <div className="space-y-4 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-lime-500/20">
                    <svg className="h-8 w-8 text-lime-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-lime-400">Design</h3>
                  <p className="text-gray-300">
                    Spreading good design principles and creating beautiful, functional experiences that inspire and
                    elevate the world around us.
                  </p>
                </div>
              </section>

              {/* Image Gallery */}
              <section className="space-y-8">
                <h2 className="text-center text-3xl font-semibold text-lime-400">Our Journey</h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <div className="relative">
                    <Image
                      src="https://checkout.transcendcollective.la/cdn/shop/files/Untitled-2.png?v=1716979542&width=1426"
                      alt="Transcend Collective Journey"
                      width={400}
                      height={300}
                      className="rounded-lg object-cover"
                    />
                  </div>
                  <div className="relative">
                    <Image
                      src="https://checkout.transcendcollective.la/cdn/shop/files/Untitled-2.png?v=1716979542&width=1426"
                      alt="Transcend Collective Journey"
                      width={400}
                      height={300}
                      className="rounded-lg object-cover"
                    />
                  </div>
                  <div className="relative">
                    <Image
                      src="https://checkout.transcendcollective.la/cdn/shop/files/Untitled-2.png?v=1716979542&width=1426"
                      alt="Transcend Collective Journey"
                      width={400}
                      height={300}
                      className="rounded-lg object-cover"
                    />
                  </div>
                  <div className="relative">
                    <Image
                      src="https://checkout.transcendcollective.la/cdn/shop/files/Untitled-2.png?v=1716979542&width=1426"
                      alt="Transcend Collective Journey"
                      width={400}
                      height={300}
                      className="rounded-lg object-cover"
                    />
                  </div>
                  <div className="relative">
                    <Image
                      src="https://checkout.transcendcollective.la/cdn/shop/files/Untitled-2.png?v=1716979542&width=1426"
                      alt="Transcend Collective Journey"
                      width={400}
                      height={300}
                      className="rounded-lg object-cover"
                    />
                  </div>
                  <div className="relative">
                    <Image
                      src="https://checkout.transcendcollective.la/cdn/shop/files/Untitled-2.png?v=1716979542&width=1426"
                      alt="Transcend Collective Journey"
                      width={400}
                      height={300}
                      className="rounded-lg object-cover"
                    />
                  </div>
                </div>
              </section>

              {/* Call to Action */}
              <section className="text-center">
                <div className="rounded-lg border border-gray-700 bg-gradient-to-r from-gray-900/50 to-gray-800/50 p-8">
                  <h2 className="mb-4 text-3xl font-semibold text-lime-400">Join Our Movement</h2>
                  <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-300">
                    Ready to be part of something bigger? Join our community of creators, designers, and innovators who
                    are committed to growth, helping others, and spreading good design.
                  </p>
                  <div className="flex flex-col justify-center gap-4 sm:flex-row">
                    <a
                      href="/store"
                      className="rounded bg-lime-500 px-8 py-3 font-semibold text-black transition-colors hover:bg-lime-400"
                    >
                      Shop Our Collection
                    </a>
                    <a
                      href="mailto:aaron.transcend@gmail.com?subject=Transcend%20Collective%20Collaboration"
                      className="rounded border border-lime-500 px-8 py-3 font-semibold text-lime-500 transition-colors hover:bg-lime-500 hover:text-black"
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

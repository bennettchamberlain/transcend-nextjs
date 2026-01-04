import NextLink from "next/link";

export function ArtistsPromotionalSections() {
  return (
    <div className="bg-black">
      {/* Section 1: Multicam Business Promotion */}
      <section className="border-b border-gray-800 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left Column - Content */}
            <div className="flex flex-col justify-center">
              <h2 className="mb-6 text-3xl font-bold text-lime-400 lg:text-4xl" style={{ fontFamily: "Shapiro" }}>
                Professional Multicam Services
              </h2>
              <p className="mb-8 text-lg leading-relaxed text-gray-300" style={{ fontFamily: "AOMono" }}>
                Elevate your live performances with our cutting-edge multicam production services. Professional camera
                work, real-time switching, and broadcast-quality streaming for concerts, events, and live performances.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="h-2 w-2 rounded-full bg-lime-400"></div>
                  <span className="text-gray-300" style={{ fontFamily: "AOMono" }}>
                    Multiple camera angles & professional switching
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="h-2 w-2 rounded-full bg-lime-400"></div>
                  <span className="text-gray-300" style={{ fontFamily: "AOMono" }}>
                    Live streaming & recording capabilities
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="h-2 w-2 rounded-full bg-lime-400"></div>
                  <span className="text-gray-300" style={{ fontFamily: "AOMono" }}>
                    Post-production editing & color grading
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column - Visual */}
            <div className="flex items-center justify-center">
              <div className="relative">
                <div
                  className="rounded-lg border border-gray-700 bg-gray-900 p-8 shadow-lg"
                  style={{
                    boxShadow: "0 0 20px rgba(220, 255, 7, 0.1)",
                  }}
                >
                  <div className="text-center">
                    <div
                      className="mb-4 text-6xl"
                      style={{
                        filter: "drop-shadow(0 0 10px #dcff07)",
                      }}
                    >
                      🎥
                    </div>
                    <h3 className="mb-2 text-xl font-semibold text-lime-400" style={{ fontFamily: "Modeseven" }}>
                      Live Production
                    </h3>
                    <p className="text-sm text-gray-400" style={{ fontFamily: "AOMono" }}>
                      Professional multicam coverage
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Multicam Business with Intake CTA */}
      <section className="border-b border-gray-800 bg-gray-900 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="mb-6 text-3xl font-bold text-lime-400 lg:text-4xl" style={{ fontFamily: "Shapiro" }}>
              Ready to Level Up Your Live Shows?
            </h2>
            <p
              className="mx-auto mb-12 max-w-3xl text-lg leading-relaxed text-gray-300"
              style={{ fontFamily: "AOMono" }}
            >
              From intimate venue performances to large-scale festivals, our multicam services ensure your audience gets
              the cinematic experience they deserve. Start your project today and see the difference professional
              production makes.
            </p>

            <div className="flex flex-col items-center space-y-6 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-6">
              <NextLink
                href="/multicam-dashboard"
                className="inline-flex items-center rounded border border-lime-400 bg-lime-400 px-8 py-4 text-lg font-semibold text-black transition-all hover:bg-lime-300 hover:shadow-lg"
                style={{
                  fontFamily: "Modeseven",
                  boxShadow: "0 0 20px rgba(220, 255, 7, 0.3)",
                }}
              >
                Get Started
                <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </NextLink>

              <NextLink
                href="/artist-merch-intake"
                className="inline-flex items-center rounded border border-gray-600 bg-gray-800 px-8 py-4 text-lg font-semibold text-white transition-all hover:border-gray-500 hover:bg-gray-700"
                style={{ fontFamily: "Modeseven" }}
              >
                Start Design Request
                <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </NextLink>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Merch Design for Artists */}
      <section className="border-b border-gray-800 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left Column - Visual */}
            <div className="flex items-center justify-center">
              <div className="relative">
                <div
                  className="rounded-lg border border-gray-700 bg-gray-900 p-8 shadow-lg"
                  style={{
                    boxShadow: "0 0 20px rgba(220, 255, 7, 0.1)",
                  }}
                >
                  <div className="text-center">
                    <div
                      className="mb-4 text-6xl"
                      style={{
                        filter: "drop-shadow(0 0 10px #dcff07)",
                      }}
                    >
                      🎨
                    </div>
                    <h3 className="mb-2 text-xl font-semibold text-lime-400" style={{ fontFamily: "Modeseven" }}>
                      Custom Merch Design
                    </h3>
                    <p className="text-sm text-gray-400" style={{ fontFamily: "AOMono" }}>
                      Unique designs that represent your brand
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Content */}
            <div className="flex flex-col justify-center">
              <h2 className="mb-6 text-3xl font-bold text-lime-400 lg:text-4xl" style={{ fontFamily: "Shapiro" }}>
                Merchandise Design Services
              </h2>
              <p className="mb-8 text-lg leading-relaxed text-gray-300" style={{ fontFamily: "AOMono" }}>
                Transform your artistic vision into wearable art. From concept to print-ready files, we create custom
                merchandise designs that resonate with your fans and amplify your brand.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="h-2 w-2 rounded-full bg-lime-400"></div>
                  <span className="text-gray-300" style={{ fontFamily: "AOMono" }}>
                    Custom artwork & typography design
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="h-2 w-2 rounded-full bg-lime-400"></div>
                  <span className="text-gray-300" style={{ fontFamily: "AOMono" }}>
                    Print-ready file preparation
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="h-2 w-2 rounded-full bg-lime-400"></div>
                  <span className="text-gray-300" style={{ fontFamily: "AOMono" }}>
                    Mockup previews & revisions
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Artist Collections CTA */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="mb-6 text-3xl font-bold text-lime-400 lg:text-4xl" style={{ fontFamily: "Shapiro" }}>
              Explore Our Artist Collections
            </h2>
            <p
              className="mx-auto mb-12 max-w-3xl text-lg leading-relaxed text-gray-300"
              style={{ fontFamily: "AOMono" }}
            >
              Discover unique merchandise from talented artists in our community. Each piece tells a story and supports
              independent creators. Find your next favorite design or get inspired for your own collection.
            </p>

            <div className="flex flex-col items-center space-y-6 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-6">
              <NextLink
                href="/collections/artists"
                className="inline-flex items-center rounded border border-lime-400 bg-lime-400 px-8 py-4 text-lg font-semibold text-black transition-all hover:bg-lime-300 hover:shadow-lg"
                style={{
                  fontFamily: "Modeseven",
                  boxShadow: "0 0 20px rgba(220, 255, 7, 0.3)",
                }}
              >
                Check Out Artist Collections
                <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </NextLink>

              <NextLink
                href="/store"
                className="inline-flex items-center rounded border border-gray-600 bg-gray-800 px-8 py-4 text-lg font-semibold text-white transition-all hover:border-gray-500 hover:bg-gray-700"
                style={{ fontFamily: "Modeseven" }}
              >
                Browse All Products
                <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </NextLink>
            </div>

            <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-lg border border-gray-700 bg-gray-900 p-6 text-center">
                <div className="mb-4 text-4xl">👕</div>
                <h3 className="mb-2 font-semibold text-white" style={{ fontFamily: "Modeseven" }}>
                  Apparel
                </h3>
                <p className="text-sm text-gray-400" style={{ fontFamily: "AOMono" }}>
                  T-shirts, hoodies, and more
                </p>
              </div>
              <div className="rounded-lg border border-gray-700 bg-gray-900 p-6 text-center">
                <div className="mb-4 text-4xl">💿</div>
                <h3 className="mb-2 font-semibold text-white" style={{ fontFamily: "Modeseven" }}>
                  Music
                </h3>
                <p className="text-sm text-gray-400" style={{ fontFamily: "AOMono" }}>
                  Vinyls, CDs, and digital releases
                </p>
              </div>
              <div className="rounded-lg border border-gray-700 bg-gray-900 p-6 text-center sm:col-span-2 lg:col-span-1">
                <div className="mb-4 text-4xl">🎨</div>
                <h3 className="mb-2 font-semibold text-white" style={{ fontFamily: "Modeseven" }}>
                  Art Prints
                </h3>
                <p className="text-sm text-gray-400" style={{ fontFamily: "AOMono" }}>
                  Limited edition artwork
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

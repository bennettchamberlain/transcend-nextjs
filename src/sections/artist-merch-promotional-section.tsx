import NextLink from "next/link";

export function ArtistMerchPromotionalSection() {
  return (
    <>
      {/* Merch Design for Artists */}
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

      {/* Artist Merch Intake CTA */}
      <section className="border-b border-gray-800 bg-gray-900 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="mb-6 text-3xl font-bold text-lime-400 lg:text-4xl" style={{ fontFamily: "Shapiro" }}>
              Ready to Create Your Merch?
            </h2>
            <p
              className="mx-auto mb-12 max-w-3xl text-lg leading-relaxed text-gray-300"
              style={{ fontFamily: "AOMono" }}
            >
              Start your design project today. Our team will work with you to bring your vision to life with professional
              designs that your fans will love.
            </p>

            <div className="flex flex-col items-center justify-center space-y-6 sm:flex-row sm:space-x-6 sm:space-y-0">
              <NextLink
                href="/artist-merch-intake"
                className="inline-flex items-center rounded border border-lime-400 bg-lime-400 px-8 py-4 text-lg font-semibold text-black transition-all hover:bg-lime-300 hover:shadow-lg"
                style={{
                  fontFamily: "Modeseven",
                  boxShadow: "0 0 20px rgba(220, 255, 7, 0.3)",
                }}
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
    </>
  );
}

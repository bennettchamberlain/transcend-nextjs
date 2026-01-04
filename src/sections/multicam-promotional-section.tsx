export function MulticamPromotionalSection() {
  return (
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
  );
}

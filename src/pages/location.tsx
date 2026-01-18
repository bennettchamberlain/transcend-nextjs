import Image from "next/image";

import { ArtistsHeaderSection } from "@site/sections/artists-header-section";
import Footer from "@site/sections/footer";
import { NavigationSection } from "@site/sections/navigation-section";

export default function LocationPage() {
  const locationPhotos = [
    { src: "/images/selects/DSC07176-2.jpg", alt: "Silver Lake neighborhood" },
    { src: "/images/selects/Copy of DSC07092-2.jpg", alt: "Transcend Store exterior" },
    { src: "/images/selects/IMG_2972.jpeg", alt: "Store interior" },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <NavigationSection />
      <ArtistsHeaderSection />

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold uppercase" style={{ fontFamily: "Modeseven" }}>
            Silver Lake Location
          </h1>
          <p className="mb-8 text-xl text-gray-300">Visit our flagship store in the heart of Silver Lake</p>
        </div>

        {/* Location Photos */}
        <div className="mb-12 grid gap-6 md:grid-cols-3">
          {locationPhotos.map((photo) => (
            <div key={`location-${photo.src}`} className="relative overflow-hidden rounded-lg">
              <Image
                src={photo.src}
                alt={photo.alt}
                width={400}
                height={400}
                className="h-96 w-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          ))}
        </div>

        <div className="grid w-full items-start gap-12 lg:grid-cols-2">
          {/* Map */}
          <div className="space-y-6">
            {/* North Hills Image */}
            <div className="overflow-hidden rounded-lg">
              <Image
                src="/images/selects/North-Hills.jpg"
                alt="North Hills view of Silver Lake"
                width={800}
                height={600}
                className="h-96 w-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>

            <div className="overflow-hidden rounded-lg bg-gray-900">
              <div className="aspect-video">
                <iframe
                  src="https://maps.google.com/maps?q=1750+Glendale+Blvd,+Los+Angeles,+CA+90026&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{
                    border: 0,
                    clipPath: "polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 0 100%)",
                  }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  // eslint-disable-next-line react-dom/no-unsafe-iframe-sandbox
                  sandbox="allow-same-origin allow-scripts allow-popups allow-popups-to-escape-sandbox"
                  title="Transcend Silver Lake Location"
                  className="h-full w-full"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Store Information */}
          <div className="space-y-8">
            {/* Call to Action - Moved to second column */}
            <div className="rounded-lg border border-gray-700 bg-gradient-to-r from-gray-900/50 to-gray-800/50 p-6">
              <h3 className="mb-3 text-xl font-semibold text-lime-400 uppercase" style={{ fontFamily: "Divine" }}>
                Visit Us Today
              </h3>
              <p className="mb-4 text-gray-300" style={{ fontFamily: "Shapiro" }}>
                Experience the Transcend Collective difference in person. Browse our latest collections, get
                personalized styling advice, and connect with our community.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href="https://maps.google.com/maps?q=1750+Glendale+Blvd,+Los+Angeles,+CA+90026"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded bg-lime-500 px-6 py-2 font-semibold text-black transition-colors hover:bg-lime-400"
                >
                  Get Directions
                </a>
                <a
                  href="tel:+18043576709"
                  className="rounded border border-lime-500 px-6 py-2 font-semibold text-lime-500 transition-colors hover:bg-lime-500 hover:text-black"
                >
                  Call Store
                </a>
              </div>
            </div>
            <div>
              <h2 className="mb-4 text-2xl font-semibold uppercase" style={{ fontFamily: "Divine" }}>
                Store Details
              </h2>
              <div className="space-y-4 text-gray-300" style={{ fontFamily: "Shapiro" }}>
                <div>
                  <h3 className="mb-2 font-semibold text-white uppercase" style={{ fontFamily: "Shapiro" }}>
                    Address
                  </h3>
                  <p>1750 Glendale Blvd</p>
                  <p>Silver Lake, Los Angeles, CA 90026</p>
                </div>

                <div>
                  <h3 className="mb-2 font-semibold text-white uppercase" style={{ fontFamily: "Shapiro" }}>
                    Hours
                  </h3>
                  <p>Monday - Friday: 10:00 AM - 8:00 PM</p>
                  <p>Saturday: 11:00 AM - 7:00 PM</p>
                  <p>Sunday: 12:00 PM - 6:00 PM</p>
                </div>

                <div>
                  <h3 className="mb-2 font-semibold text-white uppercase" style={{ fontFamily: "Shapiro" }}>
                    Contact
                  </h3>
                  <p>Phone: (804) 357-6709</p>
                  <p>Email: aaron.transcend@gmail.com</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-semibold uppercase" style={{ fontFamily: "Divine" }}>
                Services
              </h2>
              <ul className="space-y-2 text-gray-300" style={{ fontFamily: "Shapiro" }}>
                <li>• In-store pickup for online orders</li>
                <li>• Personal styling consultations</li>
                <li>• Returns and exchanges</li>
                <li>• Gift wrapping</li>
                <li>• Local delivery within 5 miles</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

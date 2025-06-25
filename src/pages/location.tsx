import { NextLink } from "@site/utilities/deps";
import { HeaderSection } from "@site/sections/header-section";
import Footer from "@site/sections/footer";

export default function LocationPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <HeaderSection />

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold">Silver Lake Location</h1>
          <p className="mb-8 text-xl text-gray-300">Visit our flagship store in the heart of Silver Lake</p>
        </div>

        <div className="grid items-start gap-12 lg:grid-cols-2">
          {/* Map */}
          <div className="overflow-hidden bg-gray-900">
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
                title="Transcend Silver Lake Location"
                className="h-full w-full"
              ></iframe>
            </div>
          </div>

          {/* Store Information */}
          <div className="space-y-8">
            <div>
              <h2 className="mb-4 text-2xl font-semibold">Store Details</h2>
              <div className="space-y-4 text-gray-300">
                <div>
                  <h3 className="mb-2 font-semibold text-white">Address</h3>
                  <p>1750 Glendale Blvd</p>
                  <p>Silver Lake, Los Angeles, CA 90026</p>
                </div>

                <div>
                  <h3 className="mb-2 font-semibold text-white">Hours</h3>
                  <p>Monday - Friday: 10:00 AM - 8:00 PM</p>
                  <p>Saturday: 11:00 AM - 7:00 PM</p>
                  <p>Sunday: 12:00 PM - 6:00 PM</p>
                </div>

                <div>
                  <h3 className="mb-2 font-semibold text-white">Contact</h3>
                  <p>Phone: (323) 555-0123</p>
                  <p>Email: silverlake@transcend.com</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-semibold">Services</h2>
              <ul className="space-y-2 text-gray-300">
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

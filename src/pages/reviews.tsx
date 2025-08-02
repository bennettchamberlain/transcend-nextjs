import Head from "next/head";
import React from "react";

import { StoreLayout } from "@site/layouts/store-layout";

function Reviews() {
  // Sample reviews data - you can replace these with real reviews
  const reviews = [
    {
      name: "Sarah M.",
      blurb:
        "Absolutely love the quality and fit! Transcend Collective has become my go-to for streetwear that actually feels premium.",
    },
    {
      name: "Marcus K.",
      blurb:
        "The community aspect is what sets them apart. It's not just clothing, it's a movement I'm proud to be part of.",
    },
    {
      name: "Alex R.",
      blurb:
        "Incredible designs that speak to my creative soul. Every piece tells a story and connects me to something bigger.",
    },
    {
      name: "Jordan L.",
      blurb:
        "Finally found a brand that understands the intersection of style, comfort, and meaningful design. Obsessed!",
    },
    {
      name: "Taylor B.",
      blurb:
        "The attention to detail is unmatched. From the fabric quality to the thoughtful design elements, everything is perfect.",
    },
    {
      name: "Casey W.",
      blurb: "Transcend Collective isn't just selling clothes, they're building a community of creators and dreamers.",
    },
    {
      name: "Riley M.",
      blurb:
        "Love how each piece feels unique yet cohesive. The brand's commitment to helping others grow really shows.",
    },
    {
      name: "Quinn J.",
      blurb: "The oversized fit is exactly what I've been looking for. Comfortable, stylish, and makes a statement.",
    },
    {
      name: "Morgan K.",
      blurb:
        "Beyond the amazing clothes, the customer service and community support is incredible. Truly a brand that cares.",
    },
    {
      name: "Drew P.",
      blurb: "The acid wash treatments and distressed details give each piece so much character. Quality that lasts.",
    },
    {
      name: "Skylar T.",
      blurb:
        "Found my tribe with Transcend Collective. The designs resonate with my creative journey and personal growth.",
    },
    {
      name: "Blake R.",
      blurb:
        "Every time I wear their pieces, I get compliments and feel confident. The brand's mission really shines through.",
    },
    {
      name: "Avery M.",
      blurb: "The unisex fit is perfect for my style. Love how inclusive and thoughtful the design approach is.",
    },
    {
      name: "Rowan L.",
      blurb:
        "Transcend Collective has redefined what streetwear means to me. It's about community, creativity, and connection.",
    },
    {
      name: "Parker J.",
      blurb: "The vintage charm with modern edge is exactly my aesthetic. Can't get enough of their collections!",
    },
    {
      name: "Hayden W.",
      blurb:
        "Supporting a brand that actually walks the talk when it comes to helping others grow and spreading good design.",
    },
    {
      name: "Emery K.",
      blurb: "The fabric quality is incredible - soft, breathable, and the perfect weight. Worth every penny.",
    },
    {
      name: "Finley T.",
      blurb: "Love being part of a movement that's bigger than just fashion. Transcend Collective gets it right.",
    },
    {
      name: "River M.",
      blurb: "The designs are so thoughtful and intentional. You can tell every detail has been considered.",
    },
    {
      name: "Sage L.",
      blurb:
        "Finally found streetwear that doesn't compromise on quality or meaning. Transcend Collective delivers on both.",
    },
  ];

  // Split reviews into three rows for different scroll speeds
  const row1 = reviews.slice(0, 4);
  const row2 = reviews.slice(4, 7);
  const row3 = reviews.slice(7, 10);

  const createReviewKey = (review: { name: string; blurb: string }, index: number, row: number) => {
    return `${review.name}-${index}-${row}`;
  };

  return (
    <>
      <Head>
        <title>Customer Reviews - Transcend Collective</title>
        <meta
          name="description"
          content="See what our community says about Transcend Collective. Real reviews from real customers."
        />
      </Head>

      <StoreLayout>
        <div className="min-h-screen overflow-hidden bg-black text-white">
          {/* Header Section */}
          <section className="px-4 py-16 text-center">
            <h1 className="mb-6 text-5xl font-bold text-lime-500 font-[Druk] uppercase">What Our Community Says</h1>
            <p className="mx-auto max-w-2xl text-xl text-gray-300">
              Real reviews from real people who are part of our movement. Hear from the creators, dreamers, and doers
              who make Transcend Collective what it is.
            </p>
          </section>

          {/* Reviews Marquees */}
          <section className="space-y-8 py-16">
            {/* Row 1 */}
            <div className="mb-8">
              <div className="marquee-container">
                <div className="marquee-content">
                  {[...row1, ...row1].map((review, index) => (
                    <div key={createReviewKey(review, index, 1)} className="review-card">
                      <div className="mx-4 max-w-[350px] min-w-[300px] rounded-lg border border-gray-800 bg-gray-900/50 p-6">
                        <p className="mb-4 text-gray-300 italic">"{review.blurb}"</p>
                        <p className="font-semibold text-lime-400">— {review.name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Row 2 */}
            <div className="mb-8">
              <div className="marquee-container">
                <div className="marquee-content marquee-reverse">
                  {[...row2, ...row2].map((review, index) => (
                    <div key={createReviewKey(review, index, 2)} className="review-card">
                      <div className="mx-4 max-w-[350px] min-w-[300px] rounded-lg border border-gray-800 bg-gray-900/50 p-6">
                        <p className="mb-4 text-gray-300 italic">"{review.blurb}"</p>
                        <p className="font-semibold text-lime-400">— {review.name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Row 3 */}
            <div className="mb-8">
              <div className="marquee-container">
                <div className="marquee-content">
                  {[...row3, ...row3].map((review, index) => (
                    <div key={createReviewKey(review, index, 3)} className="review-card">
                      <div className="mx-4 max-w-[350px] min-w-[300px] rounded-lg border border-gray-800 bg-gray-900/50 p-6">
                        <p className="mb-4 text-gray-300 italic">"{review.blurb}"</p>
                        <p className="font-semibold text-lime-400">— {review.name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="px-4 py-16 text-center">
            <div className="mx-auto max-w-4xl rounded-lg border border-gray-700 bg-gradient-to-r from-gray-900/50 to-gray-800/50 p-8">
              <h2 className="mb-4 text-3xl font-semibold text-lime-400 font-[Druk] uppercase">Join Our Community</h2>
              <p className="mb-8 text-lg text-gray-300">
                Ready to experience what everyone's talking about? Join thousands of creators, dreamers, and doers who
                have found their tribe with Transcend Collective.
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <a
                  href="/store"
                  className="rounded bg-lime-500 px-8 py-3 font-semibold text-black transition-colors hover:bg-lime-400"
                >
                  Shop Now
                </a>
                <a
                  href="/about"
                  className="rounded border border-lime-500 px-8 py-3 font-semibold text-lime-500 transition-colors hover:bg-lime-500 hover:text-black"
                >
                  Learn More
                </a>
              </div>
            </div>
          </section>
        </div>
      </StoreLayout>

      <style jsx>{`
        .marquee-container {
          width: 100%;
          overflow: hidden;
          position: relative;
        }

        .marquee-content {
          display: flex;
          width: fit-content;
          animation: marquee 30s linear infinite;
        }

        .marquee-reverse {
          animation: marquee-reverse 25s linear infinite;
        }

        .review-card {
          flex-shrink: 0;
        }

        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes marquee-reverse {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .marquee-container::before,
        .marquee-container::after {
          content: "";
          position: absolute;
          top: 0;
          width: 50px;
          height: 100%;
          z-index: 2;
        }

        .marquee-container::before {
          left: 0;
          background: linear-gradient(to right, black, transparent);
        }

        .marquee-container::after {
          right: 0;
          background: linear-gradient(to left, black, transparent);
        }
      `}</style>
    </>
  );
}

export default Reviews;

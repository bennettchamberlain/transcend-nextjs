import Head from "next/head";
import Link from "next/link";
import React from "react";

import { StoreLayout } from "@site/layouts/store-layout";

function ReturnPolicy() {
  return (
    <>
      <Head>
        <title>Return Policy - Transcend Collective</title>
        <meta
          name="description"
          content="Learn about our return policy and how to return your Transcend Collective items."
        />
      </Head>

      <StoreLayout>
        <div className="min-h-screen bg-black text-white">
          {/* Main Content */}
          <main className="mx-auto max-w-4xl px-4 py-16">
            <div className="space-y-12">
              {/* Page Header */}
              <div className="text-center">
                <h1 className="mb-4 text-4xl font-bold text-lime-500 font-[Druk] uppercase">Return Policy</h1>
                <p className="mx-auto max-w-2xl text-xl text-gray-300">
                  We want you to be completely satisfied with your Transcend Collective purchase. Here's everything you
                  need to know about our return process.
                </p>
              </div>

              {/* Return Process */}
              <section className="space-y-8">
                <div>
                  <h2 className="mb-4 text-2xl font-semibold text-lime-400 font-[Druk] uppercase">30-Day Return Window</h2>
                  <p className="leading-relaxed text-gray-300">
                    You have 30 days from the date of delivery to return your items. All items must be unworn, unwashed,
                    and in their original condition with all tags attached. We're committed to making sure you're
                    completely happy with your purchase.
                  </p>
                </div>

                <div>
                  <h2 className="mb-4 text-2xl font-semibold text-lime-400 font-[Druk] uppercase">Return Process</h2>
                  <div className="space-y-4">
                    <div className="rounded-lg border border-gray-700 bg-gray-900/30 p-6">
                      <h3 className="mb-2 text-lg font-semibold text-white font-[Druk] uppercase">Step 1: Contact Us</h3>
                      <p className="text-gray-300">
                        Email us at{" "}
                        <a
                          href="mailto:aaron.transcend@gmail.com?subject=Return Request - Order Return&body=Hi there! I would like to return my order and would appreciate a prepaid shipping label. Thank you!"
                          className="text-lime-400 hover:text-lime-300 underline"
                        >
                          aaron.transcend@gmail.com
                        </a>{" "}
                        with your order number and reason for return. Don't forget to ask for a prepaid shipping label - we'll provide one for you! We'll respond within 24 hours with return instructions and your prepaid label.
                      </p>
                    </div>

                    <div className="rounded-lg border border-gray-700 bg-gray-900/30 p-6">
                      <h3 className="mb-2 text-lg font-semibold text-white font-[Druk] uppercase">Step 2: Pack Your Items</h3>
                      <p className="text-gray-300">
                        Carefully pack your items in their original packaging or a suitable replacement. Make sure to include all tags, accessories, and documentation that came with your order. This helps us process your return quickly and ensures everything arrives safely.
                      </p>
                    </div>

                    <div className="rounded-lg border border-gray-700 bg-gray-900/30 p-6">
                      <h3 className="mb-2 text-lg font-semibold text-white font-[Druk] uppercase">Step 3: Ship Your Return</h3>
                      <p className="text-gray-300">
                        When you contact us, please ask for a prepaid shipping label - we'll provide one for you! Use the prepaid return label we send, or ship to our returns address if you prefer. For returns over $75, we recommend using a trackable shipping method so you can keep an eye on your package.
                      </p>
                    </div>

                    <div className="rounded-lg border border-gray-700 bg-gray-900/30 p-6">
                      <h3 className="mb-2 text-lg font-semibold text-white font-[Druk] uppercase">Step 4: Processing</h3>
                      <p className="text-gray-300">
                        Once we receive your return, we'll inspect the items to make sure everything is in good condition. We'll process your refund within 5-7 business days, and you'll receive an email confirmation as soon as your refund has been issued. We'll keep you updated every step of the way!
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="mb-4 text-2xl font-semibold text-lime-400 font-[Druk] uppercase">Exchanges</h2>
                  <p className="leading-relaxed text-gray-300">
                    We don't offer direct exchanges, but we're happy to process a return and help you place a new order
                    for the item you want. This ensures you get exactly what you're looking for and helps us process
                    your request faster.
                  </p>
                </div>

                <div>
                  <h2 className="mb-4 text-2xl font-semibold text-lime-400 font-[Druk] uppercase">Return Shipping</h2>
                  <div className="space-y-4 text-gray-300">
                    <p>
                      <strong>Free Returns:</strong> We provide prepaid return labels for all returns within the United
                      States.
                    </p>
                    <p>
                      <strong>International Returns:</strong> International customers are responsible for return shipping
                      costs. Please contact us for specific instructions for your country.
                    </p>
                    <p>
                      <strong>Damaged or Defective Items:</strong> If you received a damaged or defective item, we'll
                      cover all return shipping costs and priority process your replacement or refund.
                    </p>
                  </div>
                </div>

                <div>
                  <h2 className="mb-4 text-2xl font-semibold text-lime-400 font-[Druk] uppercase">Non-Returnable Items</h2>
                  <ul className="list-disc space-y-2 pl-6 text-gray-300">
                    <li>Items that have been worn, washed, or altered</li>
                    <li>Items without original tags</li>
                    <li>Items returned after 30 days</li>
                    <li>Final sale items (clearly marked on product pages)</li>
                    <li>Gift cards</li>
                  </ul>
                </div>
              </section>

              {/* Contact Section */}
              <section className="rounded-lg border border-gray-700 bg-gradient-to-r from-gray-900/50 to-gray-800/50 p-8 text-center">
                <h2 className="mb-4 text-2xl font-semibold text-lime-400 font-[Druk] uppercase">Questions?</h2>
                <p className="mb-6 text-gray-300">
                  Our customer service team is here to help. We're committed to making your experience with Transcend
                  Collective as smooth as possible.
                </p>
                <div className="flex flex-col justify-center gap-4 sm:flex-row">
                  <a
                    href="mailto:aaron.transcend@gmail.com?subject=Return%20Policy%20Question"
                    className="rounded bg-lime-500 px-8 py-3 font-semibold text-black transition-colors hover:bg-lime-400"
                  >
                    Email Support
                  </a>
                  <Link
                    href="/location"
                    className="rounded border border-lime-500 px-8 py-3 font-semibold text-lime-500 transition-colors hover:bg-lime-500 hover:text-black"
                  >
                    Visit Our Store
                  </Link>
                </div>
              </section>
            </div>
          </main>
        </div>
      </StoreLayout>
    </>
  );
}

export default ReturnPolicy;

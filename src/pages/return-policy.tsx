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
                <h1 className="mb-4 text-4xl font-bold text-lime-500">Return Policy</h1>
                <p className="mx-auto max-w-2xl text-xl text-gray-400">
                  We want you to be completely satisfied with your Transcend Collective purchase. Here's everything you
                  need to know about our return process.
                </p>
              </div>

              {/* Return Process */}
              <section className="space-y-8">
                <h2 className="border-b border-gray-800 pb-4 text-3xl font-semibold text-lime-400">
                  How to Return Your Order
                </h2>

                <div className="grid gap-8 md:grid-cols-2">
                  <div className="space-y-6">
                    <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
                      <h3 className="mb-3 text-xl font-semibold text-lime-400">Step 1: Prepare Your Return</h3>
                      <ul className="space-y-2 text-gray-300">
                        <li>• Ensure the item is in original condition</li>
                        <li>• Include all original packaging and tags</li>
                        <li>• Write your order number on the package</li>
                        <li>• Include a brief reason for the return</li>
                      </ul>
                    </div>

                    <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
                      <h3 className="mb-3 text-xl font-semibold text-lime-400">Step 2: Package Securely</h3>
                      <ul className="space-y-2 text-gray-300">
                        <li>• Use a sturdy shipping box</li>
                        <li>• Include padding to prevent damage</li>
                        <li>• Seal the package properly</li>
                        <li>• Consider adding tracking insurance</li>
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
                      <h3 className="mb-3 text-xl font-semibold text-lime-400">Step 3: Ship to Our Address</h3>
                      <div className="space-y-2 text-gray-300">
                        <p className="font-medium">Mail your return to:</p>
                        <div className="rounded border border-gray-700 bg-black/30 p-4">
                          <p className="font-semibold text-lime-400">Transcend Collective</p>
                          <p>1750 Glendale Blvd</p>
                          <p>Los Angeles, CA 90026</p>
                          <p className="mt-2 text-sm text-gray-400">United States</p>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
                      <h3 className="mb-3 text-xl font-semibold text-lime-400">Step 4: Refund Process</h3>
                      <ul className="space-y-2 text-gray-300">
                        <li>• We'll inspect your return upon arrival</li>
                        <li>• Processing takes 3-5 business days</li>
                        <li>• Refund will be issued to original payment method</li>
                        <li>• You'll receive email confirmation</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Return Policy Details */}
              <section className="space-y-8">
                <h2 className="border-b border-gray-800 pb-4 text-3xl font-semibold text-lime-400">
                  Return Policy Details
                </h2>

                <div className="grid gap-8 md:grid-cols-2">
                  <div className="space-y-6">
                    <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
                      <h3 className="mb-3 text-xl font-semibold text-lime-400">Eligible for Return</h3>
                      <ul className="space-y-2 text-gray-300">
                        <li>• Items in original, unworn condition</li>
                        <li>• All original tags and packaging included</li>
                        <li>• Returns within 30 days of delivery</li>
                        <li>• Items not marked as final sale</li>
                      </ul>
                    </div>

                    <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
                      <h3 className="mb-3 text-xl font-semibold text-lime-400">Not Eligible for Return</h3>
                      <ul className="space-y-2 text-gray-300">
                        <li>• Worn, damaged, or altered items</li>
                        <li>• Items missing tags or packaging</li>
                        <li>• Final sale items</li>
                        <li>• Items purchased more than 30 days ago</li>
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
                      <h3 className="mb-3 text-xl font-semibold text-lime-400">Refund Information</h3>
                      <ul className="space-y-2 text-gray-300">
                        <li>• Full refund to original payment method</li>
                        <li>• Processing time: 3-5 business days</li>
                        <li>• Shipping costs are non-refundable</li>
                        <li>• You're responsible for return shipping</li>
                      </ul>
                    </div>

                    <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
                      <h3 className="mb-3 text-xl font-semibold text-lime-400">Contact Information</h3>
                      <div className="space-y-2 text-gray-300">
                        <p>Questions about your return?</p>
                        <p className="font-medium">Email: support@transcendcollective.com</p>
                        <p className="font-medium">Phone: (323) 555-0123</p>
                        <p className="text-sm text-gray-400">Response within 24 hours</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Important Notes */}
              <section className="rounded-lg border border-gray-700 bg-gradient-to-r from-gray-900/50 to-gray-800/50 p-8">
                <h2 className="mb-4 text-2xl font-semibold text-lime-400">Important Notes</h2>
                <div className="space-y-4 text-gray-300">
                  <p>
                    <strong className="text-lime-400">Shipping Responsibility:</strong> Customers are responsible for
                    the cost of return shipping. We recommend using a trackable shipping method to ensure your return
                    reaches us safely.
                  </p>
                  <p>
                    <strong className="text-lime-400">Processing Time:</strong> Once we receive your return, we'll
                    inspect the item and process your refund within 3-5 business days. You'll receive an email
                    confirmation when your refund is processed.
                  </p>
                  <p>
                    <strong className="text-lime-400">Damaged Items:</strong> If you receive a damaged item, please
                    contact us immediately with photos of the damage. We'll provide a prepaid return label for damaged
                    items.
                  </p>
                  <p>
                    <strong className="text-lime-400">International Returns:</strong> International customers are
                    responsible for all return shipping costs and any applicable customs duties or taxes.
                  </p>
                </div>
              </section>

              {/* CTA */}
              <section className="text-center">
                <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-8">
                  <h3 className="mb-4 text-2xl font-semibold text-lime-400">Need Help?</h3>
                  <p className="mx-auto mb-6 max-w-2xl text-gray-300">
                    If you have any questions about our return policy or need assistance with your return, our customer
                    service team is here to help.
                  </p>
                  <div className="flex flex-col justify-center gap-4 sm:flex-row">
                    <Link
                      href="/contact"
                      className="rounded bg-lime-500 px-8 py-3 font-semibold text-black transition-colors hover:bg-lime-400"
                    >
                      Contact Support
                    </Link>
                    <Link
                      href="/store"
                      className="rounded border border-lime-500 px-8 py-3 font-semibold text-lime-500 transition-colors hover:bg-lime-500 hover:text-black"
                    >
                      Continue Shopping
                    </Link>
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

export default ReturnPolicy;

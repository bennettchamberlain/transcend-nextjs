import type { MoneyV2 } from "@shopify/hydrogen-react/storefront-api-types";

import {
  CartCheckoutButton,
  CartCost,
  CartLineProvider,
  CartLineQuantity,
  CartLineQuantityAdjustButton,
  Money,
  useCart,
} from "@shopify/hydrogen-react";

import { FreeShippingBanner } from "@site/components/free-shipping-banner";
import { formatRemainingForFreeShippingFromCart, qualifiesForFreeShippingFromCart } from "@site/utilities/cart-utils";
import { NextImage, NextLink } from "@site/utilities/deps";

export function CartSection() {
  const cart = useCart();
  const subtotal = cart.cost?.subtotalAmount;
  const hasFreeShipping = subtotal ? qualifiesForFreeShippingFromCart(subtotal) : false;
  const remainingForFreeShipping = subtotal ? formatRemainingForFreeShippingFromCart(subtotal) : null;

  return (
    <section className="mt-8 flex justify-center">
      <div className="w-full max-w-7xl">
        {/* Free Shipping Banner */}
        <FreeShippingBanner subtotal={subtotal} className="mb-6" />

        {!cart.lines || cart.lines.length === 0 ? (
          <div className="py-12 text-center">
            <h2 className="mb-4 text-2xl font-medium text-white">Your cart is empty</h2>
            <p className="mb-6 text-gray-400">Looks like you haven't added any items to your cart yet.</p>
            <NextLink
              href="/products"
              className="inline-flex items-center rounded-md border border-transparent bg-lime-400 px-6 py-3 text-base font-medium text-black transition-colors duration-200 hover:bg-lime-300"
            >
              Start Shopping
            </NextLink>
          </div>
        ) : (
          <ul role="list" className="-my-6 mb-2 items-center divide-y divide-gray-700">
            {cart.lines?.map((line) => (
              <li key={line?.id} className="flex py-6">
                <CartLineProvider line={line!}>
                  <div className="h-24 w-24 shrink-0 overflow-hidden rounded-md border border-gray-700">
                    <NextImage
                      src={line?.merchandise?.image?.url as string}
                      alt={line?.merchandise?.image?.altText as string}
                      width={line?.merchandise?.image?.width as number}
                      height={line?.merchandise?.image?.height as number}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-white">
                        <h3>
                          <NextLink
                            href={`/products/${line?.merchandise?.product?.handle}`}
                            className="text-gray-300 transition-colors duration-200 hover:text-white"
                          >
                            {line?.merchandise?.product?.title}
                          </NextLink>
                        </h3>
                        <Money className="ml-4" data={line?.cost?.totalAmount as MoneyV2}></Money>
                      </div>
                      <p className="mt-1 text-sm text-gray-400">
                        {line?.merchandise?.selectedOptions?.map((option, index) => (
                          <span key={option?.name}>
                            {index ? " / " : ""}
                            {option?.value}
                          </span>
                        ))}
                      </p>
                    </div>

                    <div className="flex flex-1 items-end justify-between text-sm">
                      <div className="text-gray-400">
                        Qty <CartLineQuantity></CartLineQuantity>
                      </div>

                      <div className="flex">
                        <CartLineQuantityAdjustButton
                          className="font-medium text-lime-400 transition-colors duration-200 hover:text-lime-300"
                          adjust="remove"
                        >
                          Remove
                        </CartLineQuantityAdjustButton>

                        {/* <CartLineQuantityAdjustButton adjust="increase">Increase</CartLineQuantityAdjustButton>
              <CartLineQuantityAdjustButton adjust="decrease">Decrease</CartLineQuantityAdjustButton> */}
                      </div>
                    </div>
                  </div>
                </CartLineProvider>
              </li>
            ))}
          </ul>
        )}

        {cart.lines && cart.lines.length > 0 && (
          <div className="border-t border-gray-700 pt-4">
            <div className="flex justify-between text-base font-medium text-white">
              <p>Subtotal</p>
              <div>
                <CartCost amountType="subtotal" />
              </div>
            </div>

            {/* Shipping Information */}
            <div className="mt-2">
              {hasFreeShipping ? (
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-green-400">
                    <svg className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Free shipping applied!</span>
                  </div>
                  <span className="font-medium text-green-400">FREE</span>
                </div>
              ) : (
                <div className="flex items-center justify-between text-sm">
                  <div className="text-gray-400">
                    <span>Add </span>
                    {remainingForFreeShipping && (
                      <Money data={remainingForFreeShipping as MoneyV2} className="font-medium text-lime-400" />
                    )}
                    <span> more for free shipping</span>
                  </div>
                  <span className="text-gray-400">Shipping calculated at checkout</span>
                </div>
              )}
            </div>

            <p className="mt-0.5 text-sm text-gray-400">Taxes calculated at checkout.</p>
            <div className="mt-6 flex">
              <CartCheckoutButton className="flex-1 rounded-md border border-transparent bg-lime-400 px-6 py-3 text-base font-medium text-black shadow-sm transition-colors duration-200 hover:bg-lime-300">
                Checkout
              </CartCheckoutButton>
            </div>
            <div className="mt-6 flex justify-center text-center text-sm text-gray-400">
              <p>
                <span>or</span>
                <span> </span>
                <NextLink
                  href="/products"
                  className="font-medium text-lime-400 transition-colors duration-200 hover:text-lime-300"
                >
                  Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </NextLink>
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

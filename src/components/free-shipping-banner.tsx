import type { MoneyV2 } from "@shopify/hydrogen-react/storefront-api-types";
import { Money } from "@shopify/hydrogen-react";
import {
  qualifiesForFreeShippingFromCart,
  getRemainingForFreeShipping,
  moneyToNumber,
} from "@site/utilities/cart-utils";

interface FreeShippingBannerProps {
  subtotal: { amount?: string; currencyCode?: string } | null | undefined;
  className?: string;
}

export function FreeShippingBanner({ subtotal, className = "" }: FreeShippingBannerProps) {
  const hasFreeShipping = qualifiesForFreeShippingFromCart(subtotal);
  const remaining = getRemainingForFreeShipping(subtotal);
  const subtotalAmount = moneyToNumber(subtotal);
  const progressPercentage = Math.min((subtotalAmount / 150) * 100, 100);

  if (hasFreeShipping) {
    return (
      <div className={`rounded-lg border border-green-500/30 bg-green-900/20 p-3 ${className}`}>
        <div className="flex items-center justify-center text-sm font-medium text-green-400">
          <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          🎉 You've qualified for free shipping!
        </div>
      </div>
    );
  }

  if (subtotalAmount === 0) {
    return null; // Don't show banner if cart is empty
  }

  return (
    <div className={`rounded-lg border border-lime-500/30 bg-lime-900/20 p-3 ${className}`}>
      <div className="text-center">
        <div className="mb-2 text-sm font-medium text-lime-400">
          Add{" "}
          <Money
            data={
              {
                amount: remaining.toFixed(2),
                currencyCode: subtotal?.currencyCode || "USD",
              } as MoneyV2
            }
            className="font-bold"
          />{" "}
          more for free shipping!
        </div>
        <div className="h-2 w-full rounded-full bg-gray-700">
          <div
            className="h-2 rounded-full bg-lime-400 transition-all duration-300 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <div className="mt-1 text-xs text-gray-400">{subtotalAmount.toFixed(2)} / $150.00</div>
      </div>
    </div>
  );
}

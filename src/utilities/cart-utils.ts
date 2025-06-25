import type { MoneyV2 } from "@shopify/hydrogen-react/storefront-api-types";

import { CurrencyCode } from "./storefront/zeus";

const FREE_SHIPPING_THRESHOLD = 150; // $150 USD

/**
 * Converts a MoneyV2 object to a number for calculations
 */
export function moneyToNumber(money: MoneyV2 | null | undefined): number {
    if (!money?.amount) {
        return 0;
    }
    return Number.parseFloat(money.amount);
}

/**
 * Checks if the cart subtotal qualifies for free shipping
 */
export function qualifiesForFreeShipping(subtotal: MoneyV2 | null | undefined): boolean {
    const subtotalAmount = moneyToNumber(subtotal);
    return subtotalAmount >= FREE_SHIPPING_THRESHOLD;
}

/**
 * Gets the remaining amount needed to qualify for free shipping
 */
export function getRemainingForFreeShipping(subtotal: MoneyV2 | null | undefined): number {
    const subtotalAmount = moneyToNumber(subtotal);
    const remaining = FREE_SHIPPING_THRESHOLD - subtotalAmount;
    return Math.max(0, remaining);
}

/**
 * Formats the remaining amount as a MoneyV2 object for display
 */
export function formatRemainingForFreeShipping(
    subtotal: MoneyV2 | null | undefined
): MoneyV2 | null {
    const remaining = getRemainingForFreeShipping(subtotal);
    if (remaining === 0) {
        return null;
    }

    return {
        amount: remaining.toFixed(2),
        currencyCode: subtotal?.currencyCode || CurrencyCode.USD,
    };
}

/**
 * Type-safe version for Shopify Hydrogen cart cost types
 */
export function qualifiesForFreeShippingFromCart(
    subtotal: { amount?: string; currencyCode?: string } | null | undefined
): boolean {
    if (!subtotal?.amount) {
        return false;
    }
    const subtotalAmount = Number.parseFloat(subtotal.amount);
    return subtotalAmount >= FREE_SHIPPING_THRESHOLD;
}

/**
 * Type-safe version for Shopify Hydrogen cart cost types
 */
export function formatRemainingForFreeShippingFromCart(
    subtotal: { amount?: string; currencyCode?: string } | null | undefined
): MoneyV2 | null {
    if (!subtotal?.amount) {
        return null;
    }
    const subtotalAmount = Number.parseFloat(subtotal.amount);
    const remaining = FREE_SHIPPING_THRESHOLD - subtotalAmount;
    if (remaining <= 0) {
        return null;
    }

    return {
        amount: remaining.toFixed(2),
        currencyCode: (subtotal.currencyCode as CurrencyCode) || CurrencyCode.USD,
    };
} 
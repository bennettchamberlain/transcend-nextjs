import { useCart } from "@shopify/hydrogen-react";
import { useState } from "react";

import {
  applyDiscountCodesToCart,
  FREE_SHIPPING_DISCOUNT_CODE,
  qualifiesForFreeShippingFromCart,
} from "@site/utilities/cart-utils";

interface CustomCheckoutButtonProps {
  className?: string;
  children?: React.ReactNode;
}

export function CustomCheckoutButton({ className = "", children = "Checkout" }: CustomCheckoutButtonProps) {
  const cart = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const subtotal = cart.cost?.subtotalAmount;
  const hasFreeShipping = subtotal ? qualifiesForFreeShippingFromCart(subtotal) : false;

  const handleCheckout = async () => {
    if (!cart.id || !cart.checkoutUrl) {
      console.error("Cart ID or checkout URL is missing");
      return;
    }

    setIsProcessing(true);

    try {
      // If cart qualifies for free shipping, apply the discount code
      if (hasFreeShipping) {
        // Check if discount is already applied
        const hasDiscountApplied = cart.discountCodes?.some(
          (discount) => discount?.code?.toUpperCase() === FREE_SHIPPING_DISCOUNT_CODE.toUpperCase(),
        );

        if (!hasDiscountApplied) {
          // Apply the free shipping discount code
          const updatedCart = await applyDiscountCodesToCart(cart.id, [FREE_SHIPPING_DISCOUNT_CODE]);

          if (updatedCart?.checkoutUrl) {
            // Redirect to checkout with the discount applied
            window.location.href = updatedCart.checkoutUrl;
            return;
          }
        }
      }

      // If no discount needed or already applied, proceed to checkout normally
      window.location.href = cart.checkoutUrl;
    } catch (error) {
      console.error("Error during checkout:", error);
      // Fallback to normal checkout if there's an error
      if (cart.checkoutUrl) {
        window.location.href = cart.checkoutUrl;
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <button type="button" onClick={handleCheckout} disabled={isProcessing || !cart.checkoutUrl} className={className}>
      {isProcessing ? "Processing..." : children}
    </button>
  );
}

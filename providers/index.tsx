"use client";

import { CartProvider } from "./cart-provider";
import { CompareProvider } from "./compare-provider";
import { SavedProductsProvider } from "./saved-products-provider";
import { SessionProvider } from "./session-provider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <CartProvider>
        <CompareProvider>
          <SavedProductsProvider>{children}</SavedProductsProvider>
        </CompareProvider>
      </CartProvider>
    </SessionProvider>
  );
}

export { CartProvider, useCart } from "./cart-provider";
export { CheckoutProvider, useCheckout } from "./checkout-provider";
export { CompareProvider, useCompare } from "./compare-provider";
export { SavedProductsProvider, useSavedProducts } from "./saved-products-provider";
export { SessionProvider, useSession } from "./session-provider";

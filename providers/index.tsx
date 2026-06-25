"use client";

import { CartProvider } from "./cart-provider";

import { SavedProductsProvider } from "./saved-products-provider";
import { SessionProvider } from "./session-provider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <CartProvider>
        <SavedProductsProvider>{children}</SavedProductsProvider>
      </CartProvider>
    </SessionProvider>
  );
}

export { CartProvider, useCart } from "./cart-provider";
export { CheckoutProvider, useCheckout } from "./checkout-provider";

export { SavedProductsProvider, useSavedProducts } from "./saved-products-provider";
export { SessionProvider, useSession } from "./session-provider";

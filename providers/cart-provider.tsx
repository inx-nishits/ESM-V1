"use client";

import { createContext, useCallback, useContext, useMemo, useSyncExternalStore } from "react";
import { CART_STORAGE_KEY } from "@/lib/constants";
import type { Cart, CartLine, CartTotals, CartValidationResult } from "@/types/cart";

interface CartContextValue {
  cart: Cart;
  itemCount: number;
  caseCount: number;
  addLine: (line: Omit<CartLine, "id">) => void;
  updateQuantity: (lineId: string, quantityCases: number) => void;
  removeLine: (lineId: string) => void;
  clearCart: () => void;
  getTotals: () => CartTotals;
  validate: () => CartValidationResult;
}

const emptyCart: Cart = { lines: [], updatedAt: new Date(0).toISOString() };

const CartContext = createContext<CartContextValue | null>(null);

function loadCart(): Cart {
  if (typeof window === "undefined") return emptyCart;
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return emptyCart;
    return JSON.parse(raw) as Cart;
  } catch {
    return emptyCart;
  }
}

let cartStore: Cart = emptyCart;
let hydrated = false;
const listeners = new Set<() => void>();

function hydrateCartStore() {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;
  cartStore = loadCart();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  hydrateCartStore();
  return cartStore;
}

function getServerSnapshot() {
  return emptyCart;
}

function setCartStore(cart: Cart) {
  cartStore = cart.lines.length === 0 ? emptyCart : cart;
  if (typeof window !== "undefined") {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartStore));
  }
  listeners.forEach((listener) => listener());
}

function computeTotals(cart: Cart): CartTotals {
  const merchandiseSubtotal = cart.lines.reduce(
    (sum, line) => sum + line.effectivePricePerCase * line.quantityCases,
    0,
  );
  const listSubtotal = cart.lines.reduce(
    (sum, line) => sum + line.listPricePerCase * line.quantityCases,
    0,
  );
  const contractSavings = Math.max(0, listSubtotal - merchandiseSubtotal);

  return {
    merchandiseSubtotal,
    listSubtotal,
    savings: {
      contractSavings,
      volumeSavings: 0,
      totalSavings: contractSavings,
    },
    itemCount: cart.lines.length,
    caseCount: cart.lines.reduce((sum, line) => sum + line.quantityCases, 0),
  };
}

function validateCart(cart: Cart): CartValidationResult {
  const issues: CartValidationResult["issues"] = [];

  for (const line of cart.lines) {
    if (line.quantityCases < 1) {
      issues.push({
        lineId: line.id,
        code: "moq",
        message: "Minimum order is 1 case.",
      });
    }
    if (line.inventoryStatus === "out_of_stock") {
      issues.push({
        lineId: line.id,
        code: "inventory",
        message: "This item is out of stock.",
      });
    }
  }

  return { valid: issues.length === 0, issues };
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const cart = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const addLine = useCallback((line: Omit<CartLine, "id">) => {
    const id = crypto.randomUUID();
    const existing = cartStore.lines.find((l) => l.variantId === line.variantId);

    if (existing) {
      setCartStore({
        lines: cartStore.lines.map((l) =>
          l.id === existing.id
            ? { ...l, quantityCases: l.quantityCases + line.quantityCases }
            : l,
        ),
        updatedAt: new Date().toISOString(),
      });
    } else {
      setCartStore({
        lines: [...cartStore.lines, { ...line, id }],
        updatedAt: new Date().toISOString(),
      });
    }
  }, []);

  const updateQuantity = useCallback((lineId: string, quantityCases: number) => {
    setCartStore({
      lines: cartStore.lines
        .map((l) =>
          l.id === lineId ? { ...l, quantityCases: Math.max(0, quantityCases) } : l,
        )
        .filter((l) => l.quantityCases > 0),
      updatedAt: new Date().toISOString(),
    });
  }, []);

  const removeLine = useCallback((lineId: string) => {
    setCartStore({
      lines: cartStore.lines.filter((l) => l.id !== lineId),
      updatedAt: new Date().toISOString(),
    });
  }, []);

  const clearCart = useCallback(() => {
    setCartStore(emptyCart);
  }, []);

  const value = useMemo<CartContextValue>(
    () => ({
      cart,
      itemCount: cart.lines.length,
      caseCount: cart.lines.reduce((s, l) => s + l.quantityCases, 0),
      addLine,
      updateQuantity,
      removeLine,
      clearCart,
      getTotals: () => computeTotals(cart),
      validate: () => validateCart(cart),
    }),
    [cart, addLine, updateQuantity, removeLine, clearCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

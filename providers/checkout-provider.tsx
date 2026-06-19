"use client";

import { createContext, useCallback, useContext, useMemo, useSyncExternalStore } from "react";
import { CHECKOUT_STORAGE_KEY } from "@/lib/constants";
import type { CheckoutSession, CheckoutStep } from "@/types/checkout";

interface CheckoutContextValue {
  session: CheckoutSession;
  setStep: (step: CheckoutStep) => void;
  updateSession: (partial: Partial<CheckoutSession>) => void;
  reset: () => void;
}

const defaultSession: CheckoutSession = { step: "delivery" };

const CheckoutContext = createContext<CheckoutContextValue | null>(null);

function loadSession(): CheckoutSession {
  if (typeof window === "undefined") return defaultSession;
  try {
    const raw = sessionStorage.getItem(CHECKOUT_STORAGE_KEY);
    if (!raw) return defaultSession;
    return JSON.parse(raw) as CheckoutSession;
  } catch {
    return defaultSession;
  }
}

let checkoutStore: CheckoutSession = defaultSession;
let hydrated = false;
const listeners = new Set<() => void>();

function hydrateCheckoutStore() {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;
  checkoutStore = loadSession();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  hydrateCheckoutStore();
  return checkoutStore;
}

function getServerSnapshot() {
  return defaultSession;
}

function persist(session: CheckoutSession) {
  checkoutStore = session;
  if (typeof window !== "undefined") {
    sessionStorage.setItem(CHECKOUT_STORAGE_KEY, JSON.stringify(session));
  }
  listeners.forEach((listener) => listener());
}

export function CheckoutProvider({ children }: { children: React.ReactNode }) {
  const session = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setStep = useCallback((step: CheckoutStep) => {
    persist({ ...checkoutStore, step });
  }, []);

  const updateSession = useCallback((partial: Partial<CheckoutSession>) => {
    persist({ ...checkoutStore, ...partial });
  }, []);

  const reset = useCallback(() => persist(defaultSession), []);

  const value = useMemo<CheckoutContextValue>(
    () => ({ session, setStep, updateSession, reset }),
    [session, setStep, updateSession, reset],
  );

  return <CheckoutContext.Provider value={value}>{children}</CheckoutContext.Provider>;
}

export function useCheckout() {
  const ctx = useContext(CheckoutContext);
  if (!ctx) throw new Error("useCheckout must be used within CheckoutProvider");
  return ctx;
}

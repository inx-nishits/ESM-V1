"use client";

import { createContext, useCallback, useContext, useMemo, useSyncExternalStore } from "react";
import { SAVED_PRODUCTS_STORAGE_KEY } from "@/lib/constants";

interface SavedProductsContextValue {
  productIds: string[];
  count: number;
  toggle: (productId: string) => void;
  isSaved: (productId: string) => boolean;
  remove: (productId: string) => void;
}

const SavedProductsContext = createContext<SavedProductsContextValue | null>(null);

const EMPTY_IDS: string[] = [];

function loadSaved(): string[] {
  if (typeof window === "undefined") return EMPTY_IDS;
  try {
    const raw = localStorage.getItem(SAVED_PRODUCTS_STORAGE_KEY);
    if (!raw) return EMPTY_IDS;
    const parsed = JSON.parse(raw) as string[];
    return parsed.length > 0 ? parsed : EMPTY_IDS;
  } catch {
    return EMPTY_IDS;
  }
}

let savedStore: string[] = EMPTY_IDS;
let hydrated = false;
const listeners = new Set<() => void>();

function hydrateSavedStore() {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;
  savedStore = loadSaved();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  hydrateSavedStore();
  return savedStore;
}

function getServerSnapshot() {
  return EMPTY_IDS;
}

function persist(ids: string[]) {
  savedStore = ids.length > 0 ? ids : EMPTY_IDS;
  if (typeof window !== "undefined") {
    localStorage.setItem(SAVED_PRODUCTS_STORAGE_KEY, JSON.stringify(savedStore));
  }
  listeners.forEach((listener) => listener());
}

export function SavedProductsProvider({ children }: { children: React.ReactNode }) {
  const productIds = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = useCallback((productId: string) => {
    if (savedStore.includes(productId)) {
      persist(savedStore.filter((id) => id !== productId));
    } else {
      persist([...savedStore, productId]);
    }
  }, []);

  const remove = useCallback((productId: string) => {
    persist(savedStore.filter((id) => id !== productId));
  }, []);

  const value = useMemo<SavedProductsContextValue>(
    () => ({
      productIds,
      count: productIds.length,
      toggle,
      isSaved: (id) => productIds.includes(id),
      remove,
    }),
    [productIds, toggle, remove],
  );

  return (
    <SavedProductsContext.Provider value={value}>{children}</SavedProductsContext.Provider>
  );
}

export function useSavedProducts() {
  const ctx = useContext(SavedProductsContext);
  if (!ctx) throw new Error("useSavedProducts must be used within SavedProductsProvider");
  return ctx;
}

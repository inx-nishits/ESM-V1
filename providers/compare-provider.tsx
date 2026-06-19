"use client";

import { createContext, useCallback, useContext, useMemo, useSyncExternalStore } from "react";
import { COMPARE_STORAGE_KEY, MAX_COMPARE_ITEMS } from "@/lib/constants";

interface CompareContextValue {
  ids: string[];
  count: number;
  add: (productId: string) => boolean;
  remove: (productId: string) => void;
  clear: () => void;
  isInCompare: (productId: string) => boolean;
}

const CompareContext = createContext<CompareContextValue | null>(null);

const EMPTY_IDS: string[] = [];

function loadIds(): string[] {
  if (typeof window === "undefined") return EMPTY_IDS;
  try {
    const raw = sessionStorage.getItem(COMPARE_STORAGE_KEY);
    if (!raw) return EMPTY_IDS;
    const parsed = JSON.parse(raw) as string[];
    return parsed.length > 0 ? parsed : EMPTY_IDS;
  } catch {
    return EMPTY_IDS;
  }
}

let compareStore: string[] = EMPTY_IDS;
let hydrated = false;
const listeners = new Set<() => void>();

function hydrateCompareStore() {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;
  compareStore = loadIds();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  hydrateCompareStore();
  return compareStore;
}

function getServerSnapshot() {
  return EMPTY_IDS;
}

function persist(ids: string[]) {
  compareStore = ids.length > 0 ? ids : EMPTY_IDS;
  if (typeof window !== "undefined") {
    sessionStorage.setItem(COMPARE_STORAGE_KEY, JSON.stringify(compareStore));
  }
  listeners.forEach((listener) => listener());
}

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const ids = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const add = useCallback((productId: string) => {
    if (compareStore.includes(productId)) return true;
    if (compareStore.length >= MAX_COMPARE_ITEMS) return false;
    persist([...compareStore, productId]);
    return true;
  }, []);

  const remove = useCallback((productId: string) => {
    persist(compareStore.filter((id) => id !== productId));
  }, []);

  const clear = useCallback(() => persist(EMPTY_IDS), []);

  const value = useMemo<CompareContextValue>(
    () => ({
      ids,
      count: ids.length,
      add,
      remove,
      clear,
      isInCompare: (productId) => ids.includes(productId),
    }),
    [ids, add, remove, clear],
  );

  return <CompareContext.Provider value={value}>{children}</CompareContext.Provider>;
}

export function useCompare() {
  const ctx = useContext(CompareContext);
  if (!ctx) throw new Error("useCompare must be used within CompareProvider");
  return ctx;
}

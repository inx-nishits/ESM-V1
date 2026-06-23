"use client";

import { ArrowRight, Loader2, Package, Search } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { ApiResponse, PaginatedResult } from "@/types/api";
import type { Product } from "@/types/product";

interface GlobalSearchProps {
  className?: string;
}

export function GlobalSearch({ className }: GlobalSearchProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<PaginatedResult<Product> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const runSearch = useCallback(async (q: string) => {
    if (q.trim().length < 2) {
      setResults(null);
      setError(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(q.trim())}`);
      const json = (await response.json()) as ApiResponse<PaginatedResult<Product>>;

      if (!response.ok || !json.success) {
        setResults(null);
        setError("Unable to search. Try again.");
        return;
      }

      setResults(json.data);
    } catch {
      setResults(null);
      setError("Unable to search. Try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(timer);
    }

    setQuery("");
    setResults(null);
    setError(null);
    setLoading(false);
  }, [open]);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (query.trim().length < 2) {
      setResults(null);
      setError(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    debounceRef.current = setTimeout(() => {
      void runSearch(query);
    }, 300);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, runSearch]);

  const showEmpty = query.trim().length >= 2 && !loading && results?.items.length === 0;

  return (
    <>
      <Button
        variant="outline"
        className={cn(
          "hidden h-10 w-56 justify-start gap-2 border-border bg-muted/50 px-3 text-muted-foreground hover:bg-muted md:inline-flex lg:w-64",
          className,
        )}
        onClick={() => setOpen(true)}
      >
        <Search className="h-4 w-4 shrink-0" />
        <span className="flex-1 truncate text-left text-sm">Search products, SKUs…</span>
        <kbd className="hidden rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground lg:inline">
          ⌘K
        </kbd>
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={() => setOpen(true)}
        aria-label="Search products"
      >
        <Search className="h-5 w-5" />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="gap-0 overflow-hidden p-0 w-full max-w-full sm:max-w-xl !top-0 !translate-y-0 sm:!top-[50%] sm:!translate-y-[-50%] rounded-none rounded-b-xl sm:rounded-lg sm:border border-x-0 border-t-0 data-[state=open]:!slide-in-from-top-0 sm:data-[state=open]:!slide-in-from-top-[48%]">
          <DialogHeader className="border-b border-border px-4 py-4 bg-muted/30">
            <DialogTitle className="sr-only">Search products</DialogTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                ref={inputRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by product name or SKU…"
                className="h-12 border-0 bg-transparent pl-10 pr-10 shadow-none focus-visible:ring-0"
                autoComplete="off"
              />
              {loading && (
                <Loader2 className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-muted-foreground" />
              )}
            </div>
          </DialogHeader>

          <div className="max-h-[min(60vh,420px)] overflow-y-auto p-2">
            {query.trim().length < 2 && (
              <p className="px-3 py-6 text-center text-sm text-muted-foreground">
                Type at least 2 characters to search our catalog.
              </p>
            )}

            {error && (
              <p className="px-3 py-6 text-center text-sm text-destructive">{error}</p>
            )}

            {showEmpty && (
              <div className="px-3 py-8 text-center">
                <Package className="mx-auto h-8 w-8 text-muted-foreground/50" />
                <p className="mt-3 text-sm font-medium text-foreground">No products found</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Try a different SKU or browse by category.
                </p>
                <Button variant="link" className="mt-2" asChild>
                  <Link href="/shop" onClick={() => setOpen(false)}>
                    Browse all products
                  </Link>
                </Button>
              </div>
            )}

            {results && results.items.length > 0 && (
              <ul className="space-y-1">
                {results.items.slice(0, 8).map((product) => (
                  <li key={product.id}>
                    <Link
                      href={`/products/${product.slug}`}
                      className="flex items-center gap-3 rounded-md px-3 py-2.5 transition-colors hover:bg-muted"
                      onClick={() => setOpen(false)}
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-secondary">
                        <Package className="h-4 w-4 text-primary" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-semibold text-foreground">
                          {product.name}
                        </span>
                        <span className="font-mono text-xs text-muted-foreground">
                          SKU {product.sku}
                        </span>
                      </span>
                      <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                    </Link>
                  </li>
                ))}
              </ul>
            )}

            {results && results.items.length > 0 && (
              <div className="border-t border-border p-2">
                <Button variant="ghost" className="w-full justify-between" asChild>
                  <Link
                    href={`/search?q=${encodeURIComponent(query.trim())}`}
                    onClick={() => setOpen(false)}
                  >
                    View all results
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

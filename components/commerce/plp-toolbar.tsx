"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { SlidersHorizontal, LayoutGrid, List } from "lucide-react";
import type { ProductSortOption } from "@/types/product";

const SORT_OPTIONS: { value: ProductSortOption; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "best-selling", label: "Best selling" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "name-asc", label: "Name: A–Z" },
  { value: "newest", label: "Newest" },
];

interface PlpToolbarProps {
  total: number;
  page: number;
  pageSize: number;
  sort: ProductSortOption;
  inStock?: boolean;
}

export function PlpToolbar({ total, page, pageSize, sort, inStock }: PlpToolbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const start = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);

  function updateParams(updates: Record<string, string | null>) {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(updates)) {
      if (value === null) params.delete(key);
      else params.set(key, value);
    }
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  }

  const layout = searchParams.get("layout") ?? "grid";

  return (
    <div className="mb-8 flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-muted-foreground">
        Showing{" "}
        <span className="font-semibold text-foreground">
          {start}–{end}
        </span>{" "}
        of <span className="font-semibold text-foreground">{total}</span> products
      </p>

      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center rounded-md border border-input bg-background p-0.5">
          <button
            type="button"
            className={`flex h-8 w-8 items-center justify-center rounded-sm transition-colors ${layout === "grid" ? "bg-muted text-foreground" : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"}`}
            onClick={() => updateParams({ layout: null })}
            aria-label="Grid view"
          >
            <LayoutGrid className="h-4 w-4" />
          </button>
          <button
            type="button"
            className={`flex h-8 w-8 items-center justify-center rounded-sm transition-colors ${layout === "list" ? "bg-muted text-foreground" : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"}`}
            onClick={() => updateParams({ layout: "list" })}
            aria-label="List view"
          >
            <List className="h-4 w-4" />
          </button>
        </div>
        <label className="inline-flex cursor-pointer items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={inStock ?? false}
            onChange={(e) =>
              updateParams({ inStock: e.target.checked ? "true" : null })
            }
            className="h-4 w-4 rounded border-input accent-[var(--esm-coral-500)]"
          />
          In stock only
        </label>

        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-muted-foreground" aria-hidden />
          <label htmlFor="sort-select" className="sr-only">
            Sort products
          </label>
          <select
            id="sort-select"
            value={sort}
            onChange={(e) => updateParams({ sort: e.target.value })}
            className="h-10 rounded-md border border-input bg-background px-3 text-sm font-medium text-foreground shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { SlidersHorizontal, LayoutGrid, List } from "lucide-react";
import type { ProductSortOption } from "@/types/product";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
        <div className="md:hidden flex items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="h-9">
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Filter & Sort
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[50vh] rounded-t-xl">
              <SheetHeader>
                <SheetTitle>Filter & Sort</SheetTitle>
              </SheetHeader>
              <div className="mt-6 flex flex-col gap-6">
                <div className="flex flex-col space-y-3">
                  <label htmlFor="sort-select-mobile" className="text-sm font-semibold">
                    Sort by
                  </label>
                  <Select 
                    value={sort} 
                    onValueChange={(value) => updateParams({ sort: value as ProductSortOption })}
                  >
                    <SelectTrigger id="sort-select-mobile" className="w-full">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      {SORT_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="inStockOnly-mobile"
                    checked={inStock ?? false}
                    onCheckedChange={(checked) =>
                      updateParams({ inStock: checked ? "true" : null })
                    }
                  />
                  <label
                    htmlFor="inStockOnly-mobile"
                    className="text-sm font-medium leading-none cursor-pointer"
                  >
                    In stock only
                  </label>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="hidden md:flex items-center space-x-2">
          <Checkbox
            id="inStockOnly"
            checked={inStock ?? false}
            onCheckedChange={(checked) =>
              updateParams({ inStock: checked ? "true" : null })
            }
          />
          <label
            htmlFor="inStockOnly"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
          >
            In stock only
          </label>
        </div>

        <div className="hidden md:flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-muted-foreground" aria-hidden />
          <label htmlFor="sort-select" className="sr-only">
            Sort products
          </label>
          <Select 
            value={sort} 
            onValueChange={(value) => updateParams({ sort: value as ProductSortOption })}
          >
            <SelectTrigger id="sort-select" className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {SORT_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}

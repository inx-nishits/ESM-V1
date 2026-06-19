import { Suspense } from "react";
import { Breadcrumbs } from "@/components/commerce/breadcrumbs";
import { CatalogPagination } from "@/components/commerce/catalog-pagination";
import { PlpToolbar } from "@/components/commerce/plp-toolbar";
import { ProductGrid } from "@/components/commerce/product-grid";
import { SectionHeader } from "@/components/homepage/section-header";
import type { PaginatedResult } from "@/types/api";
import type { Category } from "@/types/category";
import type { Product, ProductSortOption } from "@/types/product";

interface SearchPageViewProps {
  query: string;
  result: PaginatedResult<Product>;
  categories: Category[];
  sort: ProductSortOption;
  inStock?: boolean;
  searchParams?: Record<string, string>;
}

export function SearchPageView({
  query,
  result,
  categories,
  sort,
  inStock,
  searchParams,
}: SearchPageViewProps) {
  const categoryNames = new Map(categories.map((c) => [c.slug, c.name]));

  return (
    <div className="site-container site-page">
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Search", href: "/search" },
        ]}
      />

      <SectionHeader
        overline="Search"
        headline={query ? `Results for “${query}”` : "Search products"}
        subheadline={
          query
            ? `${result.total} product${result.total === 1 ? "" : "s"} matched your search.`
            : "Enter a product name or SKU in the search bar above."
        }
      />

      {query && (
        <>
          <Suspense fallback={<div className="mb-8 h-16 animate-pulse rounded-md bg-muted" />}>
            <PlpToolbar
              total={result.total}
              page={result.page}
              pageSize={result.pageSize}
              sort={sort}
              inStock={inStock}
            />
          </Suspense>
          <ProductGrid products={result.items} categoryNames={categoryNames} />
          <CatalogPagination
            basePath="/search"
            page={result.page}
            totalPages={result.totalPages}
            searchParams={searchParams}
          />
        </>
      )}
    </div>
  );
}

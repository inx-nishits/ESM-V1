import { Suspense } from "react";
import { CatalogPagination } from "@/components/commerce/catalog-pagination";
import { PlpToolbar } from "@/components/commerce/plp-toolbar";
import { ProductGrid } from "@/components/commerce/product-grid";
import { PageHeader } from "@/components/layout/page-header";
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
    <div>
      <PageHeader
        title={query ? `Results for “${query}”` : "Search products"}
        description={
          query
            ? `${result.total} product${result.total === 1 ? "" : "s"} matched your search.`
            : "Enter a product name or SKU in the search bar above."
        }
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Search", href: "/search" },
        ]}
        overline="Search"
      />

      <div className="site-container mb-10 md:mb-16">

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
    </div>
  );
}

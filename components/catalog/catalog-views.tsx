import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CatalogPagination } from "@/components/commerce/catalog-pagination";
import { PlpToolbar } from "@/components/commerce/plp-toolbar";
import { ProductGrid } from "@/components/commerce/product-grid";
import { PageHeader } from "@/components/layout/page-header";
import type { PaginatedResult } from "@/types/api";
import type { Category } from "@/types/category";
import type { Product, ProductSortOption } from "@/types/product";

interface PlpPageViewProps {
  title: string;
  description?: string;
  breadcrumbs: { name: string; href: string }[];
  result: PaginatedResult<Product>;
  categories: Category[];
  basePath: string;
  sort: ProductSortOption;
  inStock?: boolean;
  searchParams?: Record<string, string>;
  heroImage?: string;
  overline?: string;
}

export function PlpPageView({
  title,
  description,
  breadcrumbs,
  result,
  categories,
  basePath,
  sort,
  inStock,
  searchParams,
  heroImage,
  overline,
}: PlpPageViewProps) {
  const categoryNames = new Map(categories.map((c) => [c.slug, c.name]));

  return (
    <div>
      <PageHeader
        title={title}
        description={description}
        breadcrumbs={breadcrumbs}
        overline={overline}
        heroImage={heroImage}
      >
        {heroImage && (
          <p className="text-sm font-semibold text-[var(--esm-coral-400)]">
            {result.total} products · Case-quantity pricing
          </p>
        )}
      </PageHeader>

      <section className="site-section-compact site-container">
        <Suspense fallback={<div className="mb-8 h-16 animate-pulse rounded-md bg-muted" />}>
          <PlpToolbar
            total={result.total}
            page={result.page}
            pageSize={result.pageSize}
            sort={sort}
            inStock={inStock}
          />
        </Suspense>

        <ProductGrid 
          products={result.items} 
          categoryNames={categoryNames} 
          layout={(searchParams?.layout as "grid" | "list") ?? "grid"} 
        />

        <CatalogPagination
          basePath={basePath}
          page={result.page}
          totalPages={result.totalPages}
          searchParams={searchParams}
        />
      </section>
    </div>
  );
}

interface CollectionsPageViewProps {
  categories: Category[];
}

export function CollectionsPageView({ categories }: CollectionsPageViewProps) {
  return (
    <div>
      <PageHeader
        title="Shop by protection category"
        description="Six core categories covering hand, face, head, body, foot, and FDA-compliant gear — all available in case quantities."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Collections", href: "/collections" },
        ]}
        overline="Catalog"
      />

      <section className="site-section-compact site-container">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category, index) => (
          <li
            key={category.slug}
            className="animate-in fade-in slide-in-from-bottom-2 fill-mode-both"
            style={{ animationDelay: `${index * 75}ms`, animationDuration: "600ms" }}
          >
            <Link
              href={`/collections/${category.slug}`}
              className="group relative block overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-shadow hover:shadow-lg"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--esm-navy-900)]/90 via-[var(--esm-navy-900)]/30 to-transparent" />
                <span className="absolute left-4 top-4 inline-flex items-center justify-center rounded-full bg-black/40 px-2.5 py-1 font-mono text-xs font-medium text-white backdrop-blur-md">
                  {category.number}
                </span>
              </div>
              <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
                <h2 className="font-display text-lg font-bold text-white md:text-xl">
                  {category.name}
                </h2>
                <p className="mt-1 line-clamp-2 text-sm text-white/75">{category.description}</p>
                <p className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[var(--esm-coral-400)]">
                  {category.productCount} products
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </p>
              </div>
            </Link>
          </li>
        ))}
        </ul>
      </section>
    </div>
  );
}

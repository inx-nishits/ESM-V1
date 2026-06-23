import { ProductCard } from "@/components/commerce/product-card";
import type { Product } from "@/types/product";

interface ProductGridProps {
  products: Product[];
  categoryNames?: Map<string, string>;
  compact?: boolean;
  layout?: "grid" | "list";
}

export function ProductGrid({ products, categoryNames, compact, layout = "grid" }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border bg-muted/30 px-6 py-16 text-center">
        <p className="font-display text-lg font-bold text-primary">No products found</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Try adjusting filters or browse all collections.
        </p>
      </div>
    );
  }

  const isList = layout === "list";

  return (
    <ul className={isList ? "flex flex-col gap-6" : "grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"}>
      {products.map((product) => (
        <li key={product.id} className={isList ? "" : "h-full"}>
          <ProductCard
            product={product}
            categoryName={categoryNames?.get(product.categorySlug)}
            compact={compact}
          />
        </li>
      ))}
    </ul>
  );
}

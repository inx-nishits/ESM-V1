import { ProductCard } from "@/components/commerce/product-card";
import type { Product } from "@/types/product";

interface ProductGridProps {
  products: Product[];
  categoryNames?: Map<string, string>;
  compact?: boolean;
}

export function ProductGrid({ products, categoryNames, compact }: ProductGridProps) {
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

  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <li key={product.id} className="h-full">
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

"use client";

import { Breadcrumbs } from "@/components/commerce/breadcrumbs";
import { ProductGrid } from "@/components/commerce/product-grid";
import { useSavedProducts } from "@/providers/saved-products-provider";
import type { Product } from "@/types/product";

interface SavedProductsViewProps {
  allProducts: Product[];
}

export function SavedProductsView({ allProducts }: SavedProductsViewProps) {
  const saved = useSavedProducts();
  const products = allProducts.filter((product) => saved.isSaved(product.id));

  return (
    <div className="site-container site-page">
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Saved products", href: "/account/saved" },
        ]}
      />
      <h1 className="mt-4 font-display text-3xl font-extrabold text-primary">Saved products</h1>
      <p className="mt-2 text-muted-foreground">
        {products.length} product{products.length === 1 ? "" : "s"} saved for later.
      </p>
      <div className="mt-8">
        <ProductGrid products={products} compact />
      </div>
    </div>
  );
}

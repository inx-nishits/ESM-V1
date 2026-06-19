"use client";

import { ComparePageView } from "@/components/compare/compare-page-view";
import { useCompare } from "@/providers/compare-provider";
import type { Product } from "@/types/product";

interface ComparePageClientProps {
  allProducts: Product[];
}

export function ComparePageClient({ allProducts }: ComparePageClientProps) {
  const compare = useCompare();
  const products = allProducts.filter((product) => compare.ids.includes(product.id));
  return <ComparePageView products={products} />;
}

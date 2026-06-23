import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/commerce/product-card";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "./section-header";
import type { Category } from "@/types/category";
import type { Product } from "@/types/product";

interface FeaturedProductsProps {
  products: Product[];
  categories: Category[];
}

export function FeaturedProducts({ products, categories }: FeaturedProductsProps) {
  const categoryMap = new Map(categories.map((category) => [category.slug, category.name]));

  if (products.length === 0) return null;

  return (
    <section className="bg-muted/30 site-section" aria-labelledby="featured-heading">
      <div className="site-container">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeader
          overline="Featured"
          headline="Top picks for restock orders"
          subheadline="Best-selling SKUs with published case pricing — ready to add to cart or quote."
          headlineId="featured-heading"
        />
          <Button variant="outline" className="shrink-0 self-start md:self-auto" asChild>
            <Link href="/shop">
              View all products
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <ul className="mt-6 sm:mt-10 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">
          {products.map((product) => (
            <li key={product.id} className="h-full">
              <ProductCard
                product={product}
                categoryName={categoryMap.get(product.categorySlug)}
                compact
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

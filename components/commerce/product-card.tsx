import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ProductCardAddButton } from "@/components/commerce/product-card-add-button";
import { formatCurrency } from "@/lib/utils";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
  categoryName?: string;
  /** Tighter layout for homepage featured grid */
  compact?: boolean;
  /** Render as a grid card or a list row */
  layout?: "grid" | "list";
}

const inventoryLabels: Record<Product["inventoryStatus"], string> = {
  in_stock: "In stock",
  low_stock: "Low stock",
  out_of_stock: "Out of stock",
  made_to_order: "Made to order",
};

export function ProductCard({ product, categoryName, compact = false, layout = "grid" }: ProductCardProps) {
  const primaryImage = product.images.find((img) => img.isPrimary) ?? product.images[0];
  const isList = layout === "list";

  if (isList) {
    return (
      <Card className="group flex flex-col overflow-hidden transition-shadow duration-300 hover:shadow-lg sm:flex-row p-4 gap-4 sm:gap-6 items-center">
        {/* Left Column: Image */}
        <Link href={`/products/${product.slug}`} className="block w-full sm:w-[160px] shrink-0">
          <div className="relative aspect-[4/3] sm:aspect-square overflow-hidden rounded-md bg-muted">
            {primaryImage && (
              <Image
                src={primaryImage.url}
                alt={primaryImage.alt}
                fill
                sizes="(max-width: 768px) 100vw, 160px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            )}
            <div className="absolute left-2 top-2 flex flex-col gap-1.5">
              {product.fdaGear && (
                <Badge variant="coral" className="bg-accent text-accent-foreground text-[10px] px-1.5 py-0">
                  FDA Gear
                </Badge>
              )}
              <Badge
                variant={product.inventoryStatus === "in_stock" ? "success" : "outline"}
                className="bg-white/95 backdrop-blur-sm text-[10px] px-1.5 py-0"
              >
                {inventoryLabels[product.inventoryStatus]}
              </Badge>
            </div>
          </div>
        </Link>

        {/* Middle Column: Details */}
        <div className="flex flex-1 flex-col justify-center min-w-0">
          <Link href={`/products/${product.slug}`} className="block">
            {categoryName && (
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {categoryName}
              </p>
            )}
            <h3 className="mt-1 font-display text-base font-bold leading-snug text-primary group-hover:text-[var(--esm-navy-600)] md:text-lg">
              {product.name}
            </h3>
            <p className="mt-1 font-mono text-xs text-muted-foreground">SKU {product.sku}</p>
            {!compact && (
              <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                {product.shortDescription}
              </p>
            )}
          </Link>
        </div>

        {/* Right Column: Price and Action */}
        <div className="flex flex-col sm:items-end justify-center w-full sm:w-[220px] shrink-0 sm:border-l sm:border-gray-100 sm:pl-6 pt-4 sm:pt-0 border-t border-gray-100 sm:border-t-0">
          <div className="mb-4 sm:text-right flex items-center sm:block justify-between w-full sm:w-auto">
            <div>
              <p className="font-display text-xl font-extrabold text-primary">
                {formatCurrency(product.basePrice)}
              </p>
              <p className="text-xs text-muted-foreground">
                per case · {product.caseQuantity.toLocaleString()} units
              </p>
            </div>
          </div>
          <div className="w-full">
            <ProductCardAddButton product={product} />
          </div>
        </div>
      </Card>
    );
  }

  // Grid Layout
  return (
    <Card className="group flex h-full flex-col overflow-hidden transition-shadow duration-300 hover:shadow-lg">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          {primaryImage && (
            <Image
              src={primaryImage.url}
              alt={primaryImage.alt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}
          <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
            {product.fdaGear && (
              <Badge variant="coral" className="bg-accent text-accent-foreground">
                FDA Gear
              </Badge>
            )}
            <Badge
              variant={product.inventoryStatus === "in_stock" ? "success" : "outline"}
              className="bg-white/95 backdrop-blur-sm"
            >
              {inventoryLabels[product.inventoryStatus]}
            </Badge>
          </div>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-4 md:p-5">
        <Link href={`/products/${product.slug}`} className="flex flex-1 flex-col">
          {categoryName && (
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {categoryName}
            </p>
          )}
          <h3 className="mt-1 line-clamp-2 min-h-[2.75rem] font-display text-base font-bold leading-snug text-primary group-hover:text-[var(--esm-navy-600)] md:text-lg">
            {product.name}
          </h3>
          <p className="mt-1 font-mono text-xs text-muted-foreground">SKU {product.sku}</p>
          {!compact && (
            <p className="mt-2 line-clamp-2 min-h-[2.5rem] text-sm leading-relaxed text-muted-foreground">
              {product.shortDescription}
            </p>
          )}

          <div className="mt-auto pt-4">
            <p className="font-display text-xl font-extrabold text-primary">
              {formatCurrency(product.basePrice)}
            </p>
            <p className="text-xs text-muted-foreground">
              per case · {product.caseQuantity.toLocaleString()} units
            </p>
          </div>
        </Link>

        <ProductCardAddButton product={product} className="mt-3" />
      </div>
    </Card>
  );
}

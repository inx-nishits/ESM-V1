"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import { cn, formatCurrency } from "@/lib/utils";
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
  const [activeImage, setActiveImage] = useState(primaryImage);
  const isList = layout === "list";

  if (isList) {
    return (
      <Card className="group flex flex-col overflow-hidden transition-shadow duration-300 hover:shadow-lg sm:flex-row p-4 gap-4 sm:gap-6 items-center">
        {/* Left Column: Image */}
        <div className="w-full sm:w-[160px] shrink-0">
          <div className="relative aspect-[4/3] sm:aspect-square overflow-hidden rounded-md bg-muted">
            <Link href={`/products/${product.slug}`} className="absolute inset-0 z-0 block">
              {activeImage && (
                <Image
                  src={activeImage.url}
                  alt={activeImage.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 160px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              )}
            </Link>
            <div className="absolute left-2 top-2 flex flex-col gap-1.5">
              {product.fdaGear && (
                <Badge variant="coral" className="bg-accent text-accent-foreground text-[10px] px-1.5 py-0">
                  FDA Gear
                </Badge>
              )}
              <Badge
                variant={product.inventoryStatus === "in_stock" ? "success" : "outline"}
                className="bg-white/95 backdrop-blur-sm text-[10px] px-1.5 py-0 pointer-events-none"
              >
                {inventoryLabels[product.inventoryStatus]}
              </Badge>
            </div>
          </div>
        </div>

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
            <Button asChild className="w-full bg-[var(--esm-coral-500)] hover:bg-[var(--esm-coral-600)] text-white font-bold h-10 rounded-full px-5 transition-transform hover:scale-[1.02]">
              <Link href={`/products/${product.slug}`} className="flex items-center justify-between">
                <span>Add to cart</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  // Grid Layout
  return (
    <div className={cn(
      "group flex w-full h-full flex-col rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden transition-shadow duration-300 hover:shadow-lg",
      compact ? "max-w-sm" : ""
    )}>
      <div className={cn("relative overflow-hidden bg-muted", compact ? "aspect-[3/2]" : "aspect-[4/3]")}>
        <Link href={`/products/${product.slug}`} className="absolute inset-0 z-0 block">
          {activeImage && (
            <Image
              src={activeImage.url}
              alt={activeImage.alt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}
        </Link>
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5 pointer-events-none">
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
          {/* Variant Swatches */}
          {product.images.length > 1 && (
            <div className="absolute right-2 top-3 bottom-3 flex flex-col gap-2 items-center justify-start z-10">
              {product.images.slice(0, 5).map((img) => {
                const isActive = activeImage?.url === img.url;
                return (
                  <button
                    type="button"
                    key={img.url}
                    onMouseEnter={() => setActiveImage(img)}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setActiveImage(img);
                    }}
                    className={cn(
                      "h-7 w-7 rounded-full bg-white overflow-hidden relative transition-transform hover:scale-110",
                      isActive ? "ring-2 ring-[var(--esm-coral-500)] ring-offset-1 ring-offset-white" : "border border-border/50 shadow-sm"
                    )}
                  >
                    <Image
                      src={img.url}
                      alt={img.alt}
                      fill
                      sizes="28px"
                      className="object-cover"
                    />
                  </button>
                );
              })}
              {product.images.length > 5 && (
                <div className="flex h-6 w-6 items-center justify-center rounded-full border border-border bg-white shadow-sm text-[9px] font-bold text-[var(--esm-navy-900)]">
                  +{product.images.length - 5}
                </div>
              )}
            </div>
          )}
          
          {/* Removed Overlay Quick View to simplify and make it standard one-box */}
        </div>

      <div className={cn("flex flex-1 flex-col", compact ? "p-3" : "p-4 md:p-5")}>
        <Link href={`/products/${product.slug}`} className="flex flex-1 flex-col">
          {categoryName && (
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {categoryName}
            </p>
          )}
          <h3 className={cn("font-display font-bold leading-snug text-primary group-hover:text-[var(--esm-navy-600)]", compact ? "mt-1 text-sm md:text-base line-clamp-1" : "mt-1 text-base md:text-lg line-clamp-2 min-h-[2.75rem]")}>
            {product.name}
          </h3>
          <p className="mt-1 font-mono text-xs text-muted-foreground">SKU {product.sku}</p>
          {!compact && (
            <p className="mt-2 line-clamp-2 min-h-[2.5rem] text-sm leading-relaxed text-muted-foreground">
              {product.shortDescription}
            </p>
          )}
        </Link>

        <div className="mt-auto pt-3 flex items-center justify-between gap-2">
          <Link href={`/products/${product.slug}`} className="block">
            <p className={cn("font-display font-extrabold text-primary shrink-0", compact ? "text-[15px]" : "text-lg xl:text-xl")}>
              {formatCurrency(product.basePrice)}
            </p>
          </Link>
          <Button asChild className={cn(
            "bg-[var(--esm-coral-500)] hover:bg-[var(--esm-coral-600)] text-white font-bold rounded-full transition-transform hover:scale-[1.02] shrink-0 flex-1 max-w-[140px]",
            compact ? "h-8 px-3 text-[11px]" : "h-10 px-4 text-sm"
          )}>
            <Link href={`/products/${product.slug}`} className="flex items-center justify-center gap-1.5 w-full">
              <ShoppingCart className={cn("shrink-0", compact ? "h-3.5 w-3.5" : "h-4 w-4")} />
              <span className="truncate">Add to cart</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

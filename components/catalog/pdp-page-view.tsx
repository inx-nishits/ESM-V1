"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { GitCompare, Heart, Minus, Plus, ShoppingCart } from "lucide-react";
import { Breadcrumbs } from "@/components/commerce/breadcrumbs";
import { ProductGrid } from "@/components/commerce/product-grid";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/providers/cart-provider";
import { useCompare } from "@/providers/compare-provider";
import { useSavedProducts } from "@/providers/saved-products-provider";
import { cn, formatCurrency } from "@/lib/utils";
import type { Category } from "@/types/category";
import type { Product } from "@/types/product";

interface PdpPageViewProps {
  product: Product;
  categoryName: string;
  relatedProducts: Product[];
  categories: Category[];
}

export function PdpPageView({
  product,
  categoryName,
  relatedProducts,
  categories,
}: PdpPageViewProps) {
  const { addLine } = useCart();
  const compare = useCompare();
  const saved = useSavedProducts();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantityCases, setQuantityCases] = useState(product.moqCases);
  const variant = product.variants[0];
  const primaryImage = product.images[selectedImageIndex] ?? product.images[0];

  function handleAddToCart() {
    if (!variant || !primaryImage) return;
    addLine({
      productId: product.id,
      variantId: variant.id,
      slug: product.slug,
      name: product.name,
      sku: variant.sku,
      categorySlug: product.categorySlug,
      imageUrl: primaryImage.url,
      variantAttributes: variant.attributes,
      caseQuantity: product.caseQuantity,
      quantityCases,
      listPricePerCase: variant.price,
      effectivePricePerCase: variant.price,
      fdaGear: product.fdaGear,
      inventoryStatus: variant.inventoryStatus,
    });
  }

  const categoryNames = new Map(categories.map((c) => [c.slug, c.name]));

  return (
    <div className="site-container site-page">
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Shop", href: "/shop" },
          { name: categoryName, href: `/collections/${product.categorySlug}` },
          { name: product.name, href: `/products/${product.slug}` },
        ]}
      />

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
        <div>
          <div className="relative aspect-square overflow-hidden rounded-lg border border-border bg-muted">
            {primaryImage && (
              <Image
                src={primaryImage.url}
                alt={primaryImage.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            )}
          </div>
          {product.images.length > 1 && (
            <ul className="mt-4 flex gap-2 overflow-x-auto pb-1">
              {product.images.map((image, index) => (
                <li key={image.url}>
                  <button
                    type="button"
                    onClick={() => setSelectedImageIndex(index)}
                    className={cn(
                      "relative h-16 w-16 shrink-0 overflow-hidden rounded-md border-2 transition-colors",
                      index === selectedImageIndex
                        ? "border-accent"
                        : "border-border hover:border-muted-foreground/50",
                    )}
                  >
                    <Image src={image.url} alt={image.alt} fill sizes="64px" className="object-cover" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <div className="flex flex-wrap gap-2">
            {product.fdaGear && <Badge variant="coral">FDA Gear</Badge>}
            <Badge variant={product.inventoryStatus === "in_stock" ? "success" : "outline"}>
              {product.inventoryStatus === "in_stock" ? "In stock" : "Check availability"}
            </Badge>
          </div>

          <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {categoryName}
          </p>
          <h1 className="mt-1 font-display text-2xl font-extrabold tracking-tight text-primary md:text-3xl lg:text-4xl">
            {product.name}
          </h1>
          <p className="mt-2 font-mono text-sm text-muted-foreground">SKU {product.sku}</p>

          <div className="mt-6 flex items-end gap-3">
            <p className="font-display text-3xl font-extrabold text-primary">
              {formatCurrency(product.basePrice)}
            </p>
            <p className="pb-1 text-sm text-muted-foreground">
              per case · {product.caseQuantity.toLocaleString()} units
            </p>
          </div>

          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            {product.shortDescription}
          </p>

          {product.volumeTiers.length > 0 && (
            <div className="mt-6 rounded-lg border border-border bg-muted/30 p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Volume pricing
              </p>
              <ul className="mt-2 space-y-1 text-sm">
                {product.volumeTiers.map((tier) => (
                  <li key={tier.minCases} className="flex justify-between gap-4">
                    <span>
                      {tier.minCases}
                      {tier.maxCases ? `–${tier.maxCases}` : "+"} cases
                    </span>
                    <span className="font-semibold text-primary">
                      {tier.pricePerCase ? formatCurrency(tier.pricePerCase) : "Contact sales"}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-8 flex items-center gap-4">
            <div className="flex items-center rounded-md border border-input">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-11 w-11 rounded-none"
                onClick={() => setQuantityCases(Math.max(product.moqCases, quantityCases - 1))}
                aria-label="Decrease quantity"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="min-w-12 text-center font-semibold">{quantityCases}</span>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-11 w-11 rounded-none"
                onClick={() => setQuantityCases(quantityCases + 1)}
                aria-label="Increase quantity"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <span className="text-sm text-muted-foreground">cases (MOQ {product.moqCases})</span>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" className="flex-1" onClick={handleAddToCart}>
              <ShoppingCart className="h-4 w-4" />
              Add to cart
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/contact">Request quote</Link>
            </Button>
          </div>

          <div className="mt-4 flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => compare.add(product.id)}
              disabled={compare.isInCompare(product.id)}
            >
              <GitCompare className="h-4 w-4" />
              {compare.isInCompare(product.id) ? "In compare" : "Compare"}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => saved.toggle(product.id)}
            >
              <Heart className={cn("h-4 w-4", saved.isSaved(product.id) && "fill-accent text-accent")} />
              {saved.isSaved(product.id) ? "Saved" : "Save"}
            </Button>
          </div>

          {product.certifications.length > 0 && (
            <>
              <Separator className="my-8" />
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Certifications
              </p>
              <ul className="mt-2 flex flex-wrap gap-2">
                {product.certifications.map((cert) => (
                  <li key={cert}>
                    <Badge variant="outline">{cert.replace(/-/g, " ")}</Badge>
                  </li>
                ))}
              </ul>
            </>
          )}

          {product.description && (
            <>
              <Separator className="my-8" />
              <h2 className="font-display text-lg font-bold text-primary">Description</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{product.description}</p>
            </>
          )}
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <section className="mt-20 border-t border-border pt-16" aria-labelledby="related-heading">
          <h2 id="related-heading" className="font-display text-2xl font-extrabold text-primary">
            Related products
          </h2>
          <div className="mt-8">
            <ProductGrid products={relatedProducts} categoryNames={categoryNames} compact />
          </div>
        </section>
      )}
    </div>
  );
}

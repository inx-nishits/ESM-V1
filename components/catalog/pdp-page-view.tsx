"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, Heart, Minus, Plus, ShoppingCart, ZoomIn } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { ProductGrid } from "@/components/commerce/product-grid";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useCart } from "@/providers/cart-provider";

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
  const { addLine, cart } = useCart();

  const saved = useSavedProducts();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantityCases, setQuantityCases] = useState(product.moqCases);
  
  // Initialize with the first variant's attributes
  const [selectedAttributes, setSelectedAttributes] = useState<Record<string, string>>(
    (product.variants[0]?.attributes as Record<string, string>) || {}
  );
  
  // Find the exact variant based on selected attributes
  const variant = product.variants.find((v) => 
    Object.entries(selectedAttributes).every(([key, value]) => v.attributes[key as keyof typeof v.attributes] === value)
  ) || product.variants[0];

  const primaryImage = product.images[selectedImageIndex] ?? product.images[0];
  const isAddedToCart = cart.lines.some((line) => line.variantId === variant?.id);

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
    <div className="pb-24 md:pb-0">
      <PageHeader
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Shop", href: "/shop" },
          { name: categoryName, href: `/collections/${product.categorySlug}` },
          { name: product.name, href: `/products/${product.slug}` },
        ]}
      />

      <section className="site-container py-6 md:py-8 lg:py-12">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
        <div>
          <Dialog>
            <DialogTrigger asChild>
              <button
                type="button"
                className="group relative aspect-[4/3] md:aspect-square w-full overflow-hidden rounded-lg border border-border bg-muted cursor-zoom-in"
              >
                {primaryImage && (
                  <>
                    <Image
                      src={primaryImage.url}
                      alt={primaryImage.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      priority
                    />
                    <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
                    <div className="absolute right-4 top-4 rounded-full bg-background/80 p-2 text-foreground backdrop-blur-sm opacity-0 transition-opacity group-hover:opacity-100 shadow-sm border border-border/50">
                      <ZoomIn className="h-5 w-5" />
                    </div>
                  </>
                )}
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-[90vw] md:max-w-4xl border-none bg-transparent p-0 shadow-none">
              <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-black/20">
                {primaryImage && (
                  <Image
                    src={primaryImage.url}
                    alt={primaryImage.alt}
                    fill
                    className="object-contain"
                    quality={100}
                  />
                )}
              </div>
            </DialogContent>
          </Dialog>
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
          <p className="mt-2 font-mono text-sm text-muted-foreground">SKU {variant?.sku || product.sku}</p>

          {/* Variant Selectors */}
          {Object.entries(product.variantOptions).length > 0 && (
            <div className="mt-8 space-y-5">
              {Object.entries(product.variantOptions).map(([key, options]) => {
                if (!options || options.length === 0) return null;
                const attrKey = key as keyof typeof variant.attributes;
                return (
                  <div key={key}>
                    <p className="text-sm font-semibold capitalize text-primary">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {options.map((option) => {
                        const isSelected = selectedAttributes[attrKey] === option;
                        return (
                          <button
                            key={option}
                            type="button"
                            onClick={() => setSelectedAttributes((prev) => ({ ...prev, [attrKey]: option }))}
                            className={cn(
                              "rounded-md border px-4 py-2 text-sm font-medium transition-all duration-200 cursor-pointer",
                              isSelected
                                ? "border-accent bg-accent/10 text-accent ring-1 ring-accent"
                                : "border-border bg-card text-muted-foreground hover:border-accent/50 hover:bg-accent/5",
                            )}
                          >
                            {option}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

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

          <div className="fixed bottom-0 left-0 right-0 z-50 flex flex-col gap-2 border-t border-border bg-background p-3 shadow-[0_-4px_12px_rgba(0,0,0,0.08)] md:relative md:bottom-auto md:z-auto md:mt-6 md:flex-row md:border-none md:bg-transparent md:p-0 md:shadow-none">
            {isAddedToCart ? (
              <Button className="flex-1 bg-success hover:bg-success/90 h-[36px] font-semibold" asChild>
                <Link href="/cart">
                  <Check className="h-4 w-4 mr-2" />
                  View in cart
                </Link>
              </Button>
            ) : (
              <Button className="flex-1 h-[36px] font-semibold" onClick={handleAddToCart} disabled={!variant || product.inventoryStatus === "out_of_stock"}>
                <ShoppingCart className="h-4 w-4 mr-2" />
                {product.inventoryStatus === "out_of_stock" ? "Out of stock" : "Add to cart"}
              </Button>
            )}
            <Button variant="outline" size="lg" className="hidden md:flex" asChild>
              <Link href="/contact">Request quote</Link>
            </Button>
          </div>

          <div className="mt-4 flex gap-2">

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
      </section>

      {relatedProducts.length > 0 && (
        <section className="site-section site-container border-t border-border pt-16" aria-labelledby="related-heading">
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

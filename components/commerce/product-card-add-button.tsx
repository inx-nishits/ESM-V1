"use client";

import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCart } from "@/providers/cart-provider";
import type { Product } from "@/types/product";

interface ProductCardAddButtonProps {
  product: Product;
  className?: string;
}

export function ProductCardAddButton({ product, className }: ProductCardAddButtonProps) {
  const { addLine } = useCart();
  const [added, setAdded] = useState(false);
  const variant = product.variants[0];
  const primaryImage = product.images.find((img) => img.isPrimary) ?? product.images[0];
  const outOfStock = product.inventoryStatus === "out_of_stock";

  function handleAddToCart(event: React.MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    if (!variant || !primaryImage || outOfStock) return;

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
      quantityCases: product.moqCases,
      listPricePerCase: variant.price,
      effectivePricePerCase: variant.price,
      fdaGear: product.fdaGear,
      inventoryStatus: variant.inventoryStatus,
    });

    setAdded(true);
    window.setTimeout(() => setAdded(false), 2000);
  }

  return (
    <Button
      type="button"
      size="sm"
      className={cn("w-full", className)}
      disabled={outOfStock || !variant}
      onClick={handleAddToCart}
    >
      <ShoppingCart className="h-4 w-4" />
      {added ? "Added" : outOfStock ? "Out of stock" : "Add to cart"}
    </Button>
  );
}

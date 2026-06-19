"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Breadcrumbs } from "@/components/commerce/breadcrumbs";
import { Button } from "@/components/ui/button";
import { useCart } from "@/providers/cart-provider";
import { formatCurrency } from "@/lib/utils";

export function CartPageView() {
  const { cart, updateQuantity, removeLine, getTotals, clearCart } = useCart();
  const totals = getTotals();

  if (cart.lines.length === 0) {
    return (
      <div className="site-container py-16 text-center">
        <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground" aria-hidden />
        <h1 className="mt-4 font-display text-2xl font-extrabold text-primary">Your cart is empty</h1>
        <p className="mt-2 text-muted-foreground">Browse our catalog to add case-quantity PPE.</p>
        <Button className="mt-8" size="lg" asChild>
          <Link href="/shop">Shop all products</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="site-container site-page">
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Cart", href: "/cart" },
        ]}
      />

      <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <h1 className="font-display text-3xl font-extrabold text-primary">Your cart</h1>
        <Button variant="ghost" size="sm" onClick={clearCart}>
          Clear cart
        </Button>
      </div>

      <ul className="mt-8 divide-y divide-border">
        {cart.lines.map((line) => (
          <li key={line.id} className="flex gap-4 py-6 sm:gap-6">
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md border border-border bg-muted sm:h-24 sm:w-24">
              <Image src={line.imageUrl} alt={line.name} fill sizes="96px" className="object-cover" />
            </div>
            <div className="min-w-0 flex-1">
              <Link
                href={`/products/${line.slug}`}
                className="font-display font-bold text-primary hover:underline"
              >
                {line.name}
              </Link>
              <p className="mt-0.5 font-mono text-xs text-muted-foreground">SKU {line.sku}</p>
              <p className="mt-2 font-display font-extrabold text-primary">
                {formatCurrency(line.effectivePricePerCase)}{" "}
                <span className="text-sm font-normal text-muted-foreground">/ case</span>
              </p>
              <div className="mt-3 flex items-center gap-3">
                <div className="flex items-center rounded-md border border-input">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9"
                    onClick={() => updateQuantity(line.id, line.quantityCases - 1)}
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </Button>
                  <span className="min-w-8 text-center text-sm font-semibold">{line.quantityCases}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9"
                    onClick={() => updateQuantity(line.id, line.quantityCases + 1)}
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </Button>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground"
                  onClick={() => removeLine(line.id)}
                >
                  <Trash2 className="h-4 w-4" />
                  Remove
                </Button>
              </div>
            </div>
            <p className="shrink-0 font-display font-extrabold text-primary">
              {formatCurrency(line.effectivePricePerCase * line.quantityCases)}
            </p>
          </li>
        ))}
      </ul>

      <div className="mt-8 ml-auto max-w-sm rounded-lg border border-border bg-card p-6 shadow-sm">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal ({totals.caseCount} cases)</span>
          <span className="font-semibold">{formatCurrency(totals.merchandiseSubtotal)}</span>
        </div>
        {totals.savings.totalSavings > 0 && (
          <div className="mt-2 flex justify-between text-sm text-accent">
            <span>Contract savings</span>
            <span>-{formatCurrency(totals.savings.totalSavings)}</span>
          </div>
        )}
        <div className="mt-4 flex justify-between border-t border-border pt-4">
          <span className="font-display font-bold text-primary">Estimated total</span>
          <span className="font-display text-xl font-extrabold text-primary">
            {formatCurrency(totals.merchandiseSubtotal)}
          </span>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">Shipping and tax calculated at checkout.</p>
        <Button className="mt-6 w-full" size="lg" asChild>
          <Link href="/checkout/delivery">Proceed to checkout</Link>
        </Button>
        <Button variant="outline" className="mt-3 w-full" asChild>
          <Link href="/shop">Continue shopping</Link>
        </Button>
      </div>
    </div>
  );
}

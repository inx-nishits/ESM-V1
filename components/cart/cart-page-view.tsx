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

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <h1 className="font-display text-4xl font-extrabold text-primary tracking-tight">Your cart</h1>
      </div>

      <div className="mt-10 grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
        {/* Left Column: Cart Items */}
        <div className="lg:col-span-8">
          <div className="rounded-2xl border border-gray-100 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
            <div className="bg-gray-50/50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <h2 className="font-semibold text-primary">Cart Items ({totals.caseCount})</h2>
              <Button variant="ghost" size="sm" onClick={clearCart} className="text-muted-foreground hover:text-destructive transition-colors">
                Clear cart
              </Button>
            </div>
            <ul className="divide-y divide-gray-100">
              {cart.lines.map((line) => (
                <li key={line.id} className="flex gap-4 p-6 sm:gap-6 hover:bg-gray-50/30 transition-colors">
                  <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg border border-gray-100 bg-white sm:h-28 sm:w-28 shadow-sm">
                    <Image src={line.imageUrl} alt={line.name} fill sizes="112px" className="object-cover" />
                  </div>
                  <div className="min-w-0 flex-1 flex flex-col">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <Link
                          href={`/products/${line.slug}`}
                          className="font-display text-lg font-bold text-primary hover:text-accent transition-colors"
                        >
                          {line.name}
                        </Link>
                        <p className="mt-1 font-mono text-xs text-muted-foreground">SKU {line.sku}</p>
                        
                        {line.variantAttributes && Object.keys(line.variantAttributes).length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
                            {Object.entries(line.variantAttributes).map(([key, value]) => {
                              if (!value) return null;
                              return (
                                <span key={key} className="flex items-center gap-1.5 bg-gray-100/50 px-2 py-0.5 rounded-md">
                                  <span className="font-medium capitalize text-primary">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                                  <span>{value}</span>
                                </span>
                              );
                            })}
                          </div>
                        )}
                      </div>
                      <p className="shrink-0 font-display text-lg font-extrabold text-primary">
                        {formatCurrency(line.effectivePricePerCase * line.quantityCases)}
                      </p>
                    </div>

                    <div className="mt-auto pt-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-4">
                          <p className="font-display font-bold text-primary">
                            {formatCurrency(line.effectivePricePerCase)}{" "}
                            <span className="text-sm font-normal text-muted-foreground">/ case</span>
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="flex items-center rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden h-10">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-10 w-10 rounded-none hover:bg-gray-50 text-primary"
                            onClick={() => updateQuantity(line.id, line.quantityCases - 1)}
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="min-w-10 text-center text-sm font-bold text-primary border-x border-gray-100 flex items-center justify-center h-full bg-gray-50/30">
                            {line.quantityCases}
                          </span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-10 w-10 rounded-none hover:bg-gray-50 text-primary"
                            onClick={() => updateQuantity(line.id, line.quantityCases + 1)}
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 h-10 w-10 rounded-lg transition-colors"
                          onClick={() => removeLine(line.id)}
                          aria-label="Remove item"
                        >
                          <Trash2 className="h-4.5 w-4.5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: Order Summary (Sticky) */}
        <div className="lg:col-span-4 lg:sticky lg:top-24">
          <div className="rounded-2xl border border-gray-100 bg-white p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <h2 className="font-display text-xl font-bold text-primary mb-6">Order Summary</h2>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal ({totals.caseCount} cases)</span>
                <span className="font-medium text-primary">{formatCurrency(totals.merchandiseSubtotal)}</span>
              </div>
              {totals.savings.totalSavings > 0 && (
                <div className="flex justify-between text-accent font-medium">
                  <span>Contract savings</span>
                  <span>-{formatCurrency(totals.savings.totalSavings)}</span>
                </div>
              )}
            </div>
            
            <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-6">
              <span className="font-display font-bold text-primary text-lg">Estimated total</span>
              <span className="font-display text-2xl font-extrabold text-primary">
                {formatCurrency(totals.merchandiseSubtotal)}
              </span>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">Shipping and tax calculated at checkout.</p>
            
            <div className="mt-8 space-y-3">
              <Button className="w-full h-12 text-base font-bold shadow-md hover:shadow-lg transition-all" size="lg" asChild>
                <Link href="/checkout/delivery">Proceed to checkout</Link>
              </Button>
              <Button variant="outline" className="w-full h-12 text-base font-medium border-gray-200 hover:bg-gray-50 transition-colors" asChild>
                <Link href="/shop">Continue shopping</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

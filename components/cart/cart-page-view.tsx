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

      <div className="mt-2 sm:mt-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-primary tracking-tight">Your cart</h1>
      </div>

      <div className="mt-4 sm:mt-8 grid grid-cols-1 items-start gap-6 lg:gap-10 lg:grid-cols-12">
        {/* Left Column: Cart Items */}
        <div className="lg:col-span-8">
          <div className="rounded-xl sm:rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
            <div className="bg-gray-50/50 px-3 py-2.5 sm:px-5 sm:py-4 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-base sm:text-lg font-semibold text-primary">Cart Items ({totals.caseCount})</h2>
              <Button variant="ghost" size="sm" onClick={clearCart} className="text-muted-foreground hover:text-destructive transition-colors">
                Clear cart
              </Button>
            </div>
            <ul className="divide-y divide-gray-100">
              {cart.lines.map((line) => (
                <li key={line.id} className="flex gap-3 sm:gap-5 p-3 sm:p-5 hover:bg-gray-50/30 transition-colors">
                  <div className="relative h-20 w-20 sm:h-24 sm:w-24 shrink-0 overflow-hidden rounded-md border border-gray-100 bg-white shadow-sm">
                    <Image src={line.imageUrl} alt={line.name} fill sizes="(max-width: 640px) 80px, 96px" className="object-cover" />
                  </div>
                  
                  <div className="min-w-0 flex-1 flex flex-col">
                    <div className="flex justify-between items-start gap-2">
                      <Link
                        href={`/products/${line.slug}`}
                        className="text-[13px] sm:text-base font-semibold text-primary hover:text-accent transition-colors leading-snug line-clamp-2"
                      >
                        {line.name}
                      </Link>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground hover:text-destructive -mr-2 -mt-2 h-8 w-8 sm:hidden"
                        onClick={() => removeLine(line.id)}
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <p className="mt-1 font-mono text-[10px] sm:text-xs text-muted-foreground">SKU {line.sku}</p>
                    
                    <div className="mt-1 sm:mt-1.5">
                      <p className="text-[13px] sm:text-sm font-semibold text-primary">
                        {formatCurrency(line.effectivePricePerCase)}{" "}
                        <span className="text-[10px] sm:text-xs font-normal text-muted-foreground">/ case</span>
                      </p>
                    </div>

                    {line.variantAttributes && Object.keys(line.variantAttributes).length > 0 && (
                      <div className="mt-1 flex flex-wrap gap-x-2 gap-y-1 text-[10px] sm:text-xs text-muted-foreground">
                        {Object.entries(line.variantAttributes).map(([key, value]) => {
                          if (!value) return null;
                          return (
                            <span key={key} className="flex items-center gap-1 bg-gray-100/50 px-1.5 py-0.5 rounded-sm">
                              <span className="font-medium capitalize text-primary">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                              <span>{value}</span>
                            </span>
                          );
                        })}
                      </div>
                    )}

                    <div className="mt-2.5 sm:mt-auto sm:pt-3 flex items-center justify-between">
                      <div className="flex items-center rounded-md border border-gray-200 bg-white shadow-sm overflow-hidden h-7 sm:h-9">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 sm:h-9 sm:w-9 rounded-none hover:bg-gray-50 text-primary"
                          onClick={() => updateQuantity(line.id, line.quantityCases - 1)}
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
                        </Button>
                        <span className="min-w-7 sm:min-w-9 text-center text-xs sm:text-sm font-semibold text-primary border-x border-gray-100 flex items-center justify-center h-full bg-gray-50/30">
                          {line.quantityCases}
                        </span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 sm:h-9 sm:w-9 rounded-none hover:bg-gray-50 text-primary"
                          onClick={() => updateQuantity(line.id, line.quantityCases + 1)}
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                        </Button>
                      </div>

                      <div className="flex items-center gap-2 sm:gap-3">
                        <p className="text-sm sm:text-base font-bold text-primary">
                          {formatCurrency(line.effectivePricePerCase * line.quantityCases)}
                        </p>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 h-10 w-10 rounded-lg transition-colors hidden sm:flex"
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
          <div className="rounded-xl sm:rounded-2xl border border-gray-100 bg-white p-4 sm:p-6 shadow-sm">
            <h2 className="text-lg sm:text-xl font-bold text-primary mb-4 sm:mb-6">Order Summary</h2>
            
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

"use client";

import { useCart } from "@/providers/cart-provider";
import { formatCurrency } from "@/lib/utils";
import Image from "next/image";

export function CheckoutSummary() {
  const { cart, getTotals } = useCart();
  const totals = getTotals();

  return (
    <div className="rounded-[2rem] border border-border bg-white shadow-2xl shadow-black/5 overflow-hidden">
      <div className="bg-muted/30 p-6 sm:p-8 border-b border-border">
        <h2 className="font-display text-xl font-bold text-primary">Order Summary</h2>
      </div>
      
      {/* Cart Items List */}
      <div className="max-h-[320px] overflow-y-auto p-6 sm:p-8 border-b border-border">
        <ul className="space-y-6">
          {cart.lines.map((line) => (
            <li key={line.id} className="flex gap-4">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md border border-border bg-white">
                <Image src={line.imageUrl} alt={line.name} fill sizes="64px" className="object-cover" />
              </div>
              <div className="flex flex-1 flex-col justify-center min-w-0">
                <p className="truncate text-sm font-bold text-primary">{line.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {line.quantityCases} {line.quantityCases === 1 ? 'case' : 'cases'}
                </p>
              </div>
              <div className="flex flex-col justify-center text-right">
                <p className="text-sm font-bold text-primary">
                  {formatCurrency(line.effectivePricePerCase * line.quantityCases)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="p-6 sm:p-8 bg-white">
        <div className="space-y-3 text-sm">
          <div className="flex justify-between text-muted-foreground">
            <span>Subtotal ({totals.caseCount} cases)</span>
            <span className="font-medium text-primary">{formatCurrency(totals.merchandiseSubtotal)}</span>
          </div>
          {totals.savings.totalSavings > 0 && (
            <div className="flex justify-between text-[var(--esm-coral-600)] font-bold">
              <span>Contract savings</span>
              <span>-{formatCurrency(totals.savings.totalSavings)}</span>
            </div>
          )}
        </div>
        
        <div className="mt-6 flex items-center justify-between border-t border-border pt-6">
          <span className="font-display font-bold text-primary text-lg">Estimated total</span>
          <span className="font-display text-2xl font-extrabold text-primary">
            {formatCurrency(totals.merchandiseSubtotal)}
          </span>
        </div>
        <p className="mt-3 text-xs text-muted-foreground text-center">Shipping and tax calculated at checkout.</p>
      </div>
    </div>
  );
}

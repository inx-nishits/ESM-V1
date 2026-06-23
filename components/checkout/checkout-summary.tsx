"use client";

import { useCart } from "@/providers/cart-provider";
import { formatCurrency } from "@/lib/utils";

export function CheckoutSummary() {
  const { getTotals } = useCart();
  const totals = getTotals();

  return (
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
    </div>
  );
}

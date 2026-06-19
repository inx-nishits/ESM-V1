"use client";

import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { cn, formatCurrency } from "@/lib/utils";
import { useCart } from "@/providers/cart-provider";

interface CartBadgeButtonProps {
  className?: string;
}

export function CartBadgeButton({ className }: CartBadgeButtonProps) {
  const { caseCount, getTotals } = useCart();
  const subtotal = getTotals().merchandiseSubtotal;
  const hasItems = caseCount > 0;
  const countLabel = caseCount > 99 ? "99+" : String(caseCount);

  return (
    <Link
      href="/cart"
      className={cn(
        "group/cart inline-flex items-center rounded-lg border border-border py-1.5 pl-2.5 pr-3 transition-colors hover:bg-muted/50",
        hasItems && "border-accent/30 bg-[var(--esm-coral-100)]/50 hover:bg-[var(--esm-coral-100)]/80",
        className,
      )}
      aria-label={
        hasItems
          ? `Cart, ${caseCount} ${caseCount === 1 ? "case" : "cases"}, ${formatCurrency(subtotal)}`
          : "Cart, empty"
      }
    >
      {/* Fixed-width icon slot so badge never overlaps label */}
      <span className="relative flex h-8 w-8 shrink-0 items-center justify-center">
        <ShoppingCart
          className={cn("h-5 w-5", hasItems ? "text-accent" : "text-primary")}
          aria-hidden
        />
        <span
          className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold leading-none text-white shadow-sm"
          aria-hidden
        >
          {countLabel}
        </span>
      </span>

      <span className="ml-3 hidden flex-col leading-none sm:flex">
        <span className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
          Cart
        </span>
        <span className="mt-1 text-sm font-extrabold tabular-nums text-primary">
          {formatCurrency(subtotal)}
        </span>
      </span>
    </Link>
  );
}

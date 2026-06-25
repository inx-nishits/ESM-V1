"use client";

import { usePathname } from "next/navigation";
import { CheckoutSummary } from "@/components/checkout/checkout-summary";

export function CheckoutLayoutGrid({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isConfirmation = pathname.includes("/confirmation");

  if (isConfirmation) {
    return <section className="site-page site-container">{children}</section>;
  }

  return (
    <section className="site-page site-container">
      <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7 xl:col-span-8">
          {children}
        </div>
        <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-8">
          <CheckoutSummary />
        </div>
      </div>
    </section>
  );
}

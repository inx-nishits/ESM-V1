import { CheckoutDeliveryForm } from "@/components/checkout/checkout-delivery-form";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Checkout — Delivery",
  path: "/checkout/delivery",
  noIndex: true,
});

export default function CheckoutDeliveryPage() {
  return (
    <div className="max-w-xl">
      <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Step 1 of 5</p>
      <h1 className="mt-2 font-display text-2xl font-extrabold text-primary">Delivery address</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Where should we ship your order?
      </p>
      <div className="mt-8">
        <CheckoutDeliveryForm />
      </div>
    </div>
  );
}

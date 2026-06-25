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
      <nav aria-label="Progress" className="mb-8">
        <ol className="flex items-center space-x-2 text-sm font-bold text-muted-foreground">
          <li className="text-primary">Delivery</li>
          <li aria-hidden="true" className="opacity-40">/</li>
          <li>Shipping</li>
          <li aria-hidden="true" className="opacity-40">/</li>
          <li>Payment</li>
        </ol>
      </nav>
      <h1 className="font-display text-3xl font-extrabold text-primary md:text-4xl">Delivery address</h1>
      <p className="mt-3 text-base text-muted-foreground">
        Where should we ship your order?
      </p>
      <div className="mt-10">
        <CheckoutDeliveryForm />
      </div>
    </div>
  );
}

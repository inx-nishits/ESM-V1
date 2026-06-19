import { CheckoutStepForm } from "@/components/checkout/checkout-step-form";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Checkout — Shipping",
  path: "/checkout/shipping",
  noIndex: true,
});

export default function CheckoutShippingPage() {
  return (
    <CheckoutStepForm
      step={2}
      totalSteps={5}
      title="Shipping method"
      description="Select how you'd like your order delivered."
      nextHref="/checkout/billing"
      backHref="/checkout/delivery"
    >
      <fieldset className="space-y-3">
        <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-border p-4 has-[:checked]:border-accent has-[:checked]:bg-accent/5">
          <input type="radio" name="shipping" defaultChecked className="mt-1" />
          <span>
            <span className="block font-semibold text-primary">Standard ground</span>
            <span className="text-sm text-muted-foreground">3–5 business days · Calculated at review</span>
          </span>
        </label>
        <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-border p-4 has-[:checked]:border-accent has-[:checked]:bg-accent/5">
          <input type="radio" name="shipping" className="mt-1" />
          <span>
            <span className="block font-semibold text-primary">Expedited</span>
            <span className="text-sm text-muted-foreground">1–2 business days · Contact for quote</span>
          </span>
        </label>
      </fieldset>
    </CheckoutStepForm>
  );
}

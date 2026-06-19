import { CheckoutStepForm } from "@/components/checkout/checkout-step-form";
import { Input } from "@/components/ui/input";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Checkout — Billing",
  path: "/checkout/billing",
  noIndex: true,
});

export default function CheckoutBillingPage() {
  return (
    <CheckoutStepForm
      step={3}
      totalSteps={5}
      title="Billing information"
      description="Enter billing details for your purchase order or invoice."
      nextHref="/checkout/payment"
      backHref="/checkout/shipping"
    >
      <div className="space-y-4">
        <div>
          <label htmlFor="po" className="mb-1.5 block text-sm font-medium">
            PO number (optional)
          </label>
          <Input id="po" name="po" placeholder="PO-12345" />
        </div>
        <div>
          <label htmlFor="billingEmail" className="mb-1.5 block text-sm font-medium">
            Billing email
          </label>
          <Input id="billingEmail" name="billingEmail" type="email" required />
        </div>
      </div>
    </CheckoutStepForm>
  );
}

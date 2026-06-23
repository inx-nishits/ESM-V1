import { CheckoutStepForm } from "@/components/checkout/checkout-step-form";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Checkout — Payment",
  path: "/checkout/payment",
  noIndex: true,
});

export default function CheckoutPaymentPage() {
  return (
    <CheckoutStepForm
      step={4}
      totalSteps={5}
      title="Payment method"
      description="Choose how you'd like to pay for this order."
      nextHref="/checkout/review"
      backHref="/checkout/billing"
    >
      <fieldset className="space-y-3">
        <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-border p-4 has-[:checked]:border-accent has-[:checked]:bg-accent/5">
          <input type="radio" name="payment" value="stripe" defaultChecked className="mt-1" />
          <span>
            <span className="block font-semibold text-primary">Credit Card (Stripe)</span>
            <span className="text-sm text-muted-foreground">Secure payment via Stripe</span>
          </span>
        </label>
        <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-border p-4 has-[:checked]:border-accent has-[:checked]:bg-accent/5">
          <input type="radio" name="payment" value="gpay" className="mt-1" />
          <span>
            <span className="block font-semibold text-primary">Google Pay</span>
            <span className="text-sm text-muted-foreground">Fast and secure checkout with Google</span>
          </span>
        </label>
      </fieldset>
    </CheckoutStepForm>
  );
}

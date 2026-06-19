import Link from "next/link";
import { CheckoutStepForm } from "@/components/checkout/checkout-step-form";
import { Button } from "@/components/ui/button";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Checkout — Review",
  path: "/checkout/review",
  noIndex: true,
});

export default function CheckoutReviewPage() {
  return (
    <CheckoutStepForm
      step={5}
      totalSteps={5}
      title="Review order"
      description="Confirm your order details before placing."
      backHref="/checkout/payment"
      hideNext
    >
      <div className="rounded-lg border border-border bg-muted/30 p-4 text-sm text-muted-foreground">
        <p>Order summary will appear here based on your cart items.</p>
        <p className="mt-2">Shipping and tax calculated on confirmation.</p>
      </div>
      <Button size="lg" className="mt-6 w-full sm:w-auto" asChild>
        <Link href="/checkout/confirmation/demo-order">Place order</Link>
      </Button>
    </CheckoutStepForm>
  );
}

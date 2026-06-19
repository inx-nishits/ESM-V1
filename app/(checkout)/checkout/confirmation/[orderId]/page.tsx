import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { buildPageMetadata } from "@/lib/seo/metadata";

interface PageProps {
  params: Promise<{ orderId: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { orderId } = await params;
  return buildPageMetadata({
    title: "Order Confirmed",
    path: `/checkout/confirmation/${orderId}`,
    noIndex: true,
  });
}

export default async function CheckoutConfirmationPage({ params }: PageProps) {
  const { orderId } = await params;

  return (
    <div className="site-container max-w-lg site-page text-center md:py-24">
      <CheckCircle2 className="mx-auto h-14 w-14 text-accent" aria-hidden />
      <h1 className="mt-6 font-display text-3xl font-extrabold text-primary">Order confirmed</h1>
      <p className="mt-3 text-muted-foreground">
        Thank you for your order. Confirmation #{orderId} has been sent to your billing email.
      </p>
      <p className="mt-2 text-sm text-muted-foreground">
        In-stock items ship within 1 business day from West Chicago, IL.
      </p>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Button size="lg" asChild>
          <Link href="/account/orders">View orders</Link>
        </Button>
        <Button variant="outline" size="lg" asChild>
          <Link href="/shop">Continue shopping</Link>
        </Button>
      </div>
    </div>
  );
}

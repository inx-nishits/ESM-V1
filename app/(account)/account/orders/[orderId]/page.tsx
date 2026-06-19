import Link from "next/link";
import { Breadcrumbs } from "@/components/commerce/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { formatCurrency } from "@/lib/utils";

interface PageProps {
  params: Promise<{ orderId: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { orderId } = await params;
  return buildPageMetadata({
    title: `Order ${orderId}`,
    path: `/account/orders/${orderId}`,
    noIndex: true,
  });
}

export default async function AccountOrderDetailPage({ params }: PageProps) {
  const { orderId } = await params;

  return (
    <div className="site-container site-page">
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Orders", href: "/account/orders" },
          { name: orderId, href: `/account/orders/${orderId}` },
        ]}
      />

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <h1 className="font-display text-3xl font-extrabold text-primary">Order {orderId}</h1>
        <Badge variant="success">Shipped</Badge>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">Placed June 12, 2026 · 3 cases</p>

      <Card className="mt-8 p-6">
        <h2 className="font-display font-bold text-primary">Line items</h2>
        <ul className="mt-4 divide-y divide-border text-sm">
          <li className="flex justify-between py-3">
            <span>Nitrile Glove 5 mil — 2 cases</span>
            <span className="font-semibold">{formatCurrency(384)}</span>
          </li>
          <li className="flex justify-between py-3">
            <span>3-Ply Face Mask — 1 case</span>
            <span className="font-semibold">{formatCurrency(28.6)}</span>
          </li>
        </ul>
        <div className="mt-4 flex justify-between border-t border-border pt-4 font-display font-extrabold text-primary">
          <span>Total</span>
          <span>{formatCurrency(412.6)}</span>
        </div>
      </Card>

      <Button className="mt-6" variant="outline" asChild>
        <Link href="/account/orders">Back to orders</Link>
      </Button>
    </div>
  );
}

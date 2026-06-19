import Link from "next/link";
import { Breadcrumbs } from "@/components/commerce/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { formatCurrency } from "@/lib/utils";

export const metadata = buildPageMetadata({
  title: "Order History",
  path: "/account/orders",
  noIndex: true,
});

const demoOrders = [
  {
    id: "ESM-10482",
    date: "2026-06-12",
    status: "Shipped",
    total: 556.6,
    items: 3,
  },
  {
    id: "ESM-10391",
    date: "2026-05-28",
    status: "Delivered",
    total: 192,
    items: 1,
  },
];

export default function AccountOrdersPage() {
  return (
    <div className="site-container site-page">
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Orders", href: "/account/orders" },
        ]}
      />
      <h1 className="mt-4 font-display text-3xl font-extrabold text-primary">Orders</h1>

      <ul className="mt-8 space-y-4">
        {demoOrders.map((order) => (
          <li key={order.id}>
            <Card className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <Link
                  href={`/account/orders/${order.id}`}
                  className="font-display font-bold text-primary hover:underline"
                >
                  Order {order.id}
                </Link>
                <p className="mt-1 text-sm text-muted-foreground">
                  {order.date} · {order.items} item{order.items === 1 ? "" : "s"}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Badge variant="success">{order.status}</Badge>
                <span className="font-display font-extrabold text-primary">
                  {formatCurrency(order.total)}
                </span>
              </div>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
}

import Link from "next/link";
import { Breadcrumbs } from "@/components/commerce/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { SITE_EMAIL, SITE_PHONE } from "@/lib/constants";

export const metadata = buildPageMetadata({
  title: "Account Profile",
  path: "/account/profile",
  noIndex: true,
});

export default function AccountProfilePage() {
  return (
    <div className="site-container site-page">
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Account", href: "/account/profile" },
        ]}
      />
      <h1 className="mt-4 font-display text-3xl font-extrabold text-primary">My account</h1>

      <div className="mt-8 grid gap-6 lg:grid-cols-[240px_1fr]">
        <nav className="space-y-1">
          {[
            { label: "Profile", href: "/account/profile" },
            { label: "Orders", href: "/account/orders" },
            { label: "Addresses", href: "/account/addresses" },
            { label: "Saved products", href: "/account/saved" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Card className="p-6">
          <h2 className="font-display text-lg font-bold text-primary">Profile</h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div>
              <dt className="text-muted-foreground">Company</dt>
              <dd className="font-medium">Demo Procurement Co.</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Email</dt>
              <dd className="font-medium">{SITE_EMAIL}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Phone</dt>
              <dd className="font-medium">{SITE_PHONE}</dd>
            </div>
          </dl>
          <Button className="mt-6" variant="outline" asChild>
            <Link href="/contact">Update via sales</Link>
          </Button>
        </Card>
      </div>
    </div>
  );
}

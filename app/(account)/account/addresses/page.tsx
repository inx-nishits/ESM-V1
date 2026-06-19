import { Breadcrumbs } from "@/components/commerce/breadcrumbs";
import { Card } from "@/components/ui/card";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Addresses",
  path: "/account/addresses",
  noIndex: true,
});

export default function AccountAddressesPage() {
  return (
    <div className="site-container site-page">
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Addresses", href: "/account/addresses" },
        ]}
      />
      <h1 className="mt-4 font-display text-3xl font-extrabold text-primary">Addresses</h1>

      <Card className="mt-8 max-w-lg p-6">
        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Default shipping</p>
        <p className="mt-2 font-medium text-primary">Demo Procurement Co.</p>
        <p className="mt-1 text-sm text-muted-foreground">
          1130 Carolina Drive Unit A<br />
          West Chicago, IL 60185
        </p>
      </Card>
    </div>
  );
}

import { Breadcrumbs } from "@/components/commerce/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { Plus, Edit2, Trash2 } from "lucide-react";

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
      <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <h1 className="font-display text-3xl font-extrabold text-primary">Addresses</h1>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add new address
        </Button>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <Card className="relative p-6 border-accent ring-1 ring-accent shadow-sm">
          <div className="absolute right-4 top-4 flex gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary"><Edit2 className="h-4 w-4" /></Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></Button>
          </div>
          <Badge variant="success" className="mb-2">Default Shipping</Badge>
          <p className="mt-2 font-medium text-primary">Demo Procurement Co.</p>
          <p className="mt-1 text-sm text-muted-foreground">
            1130 Carolina Drive Unit A<br />
            West Chicago, IL 60185
          </p>
        </Card>
        
        <Card className="relative p-6">
          <div className="absolute right-4 top-4 flex gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary"><Edit2 className="h-4 w-4" /></Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></Button>
          </div>
          <p className="mt-2 font-medium text-primary pt-8">Secondary Warehouse</p>
          <p className="mt-1 text-sm text-muted-foreground">
            400 Logistics Way<br />
            Dallas, TX 75001
          </p>
          <Button variant="link" className="px-0 mt-3 text-xs h-auto">Set as default</Button>
        </Card>
      </div>
    </div>
  );
}

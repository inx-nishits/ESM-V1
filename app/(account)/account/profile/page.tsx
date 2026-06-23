import Link from "next/link";
import { UserCircle, Upload } from "lucide-react";
import { Breadcrumbs } from "@/components/commerce/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
          <h2 className="font-display text-lg font-bold text-primary">Profile Details</h2>
          <div className="mt-6 flex flex-col sm:flex-row gap-8 items-start">
            <div className="flex flex-col items-center gap-3">
              <div className="relative h-24 w-24 overflow-hidden rounded-full border-2 border-border bg-muted flex items-center justify-center">
                <UserCircle className="h-12 w-12 text-muted-foreground" />
              </div>
              <Button variant="outline" size="sm" className="relative overflow-hidden">
                <Upload className="h-4 w-4 mr-2" />
                Upload photo
                <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" accept="image/*" />
              </Button>
            </div>
            
            <form className="flex-1 space-y-4 w-full" onSubmit={(e) => e.preventDefault()}>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="firstName" className="mb-1.5 block text-sm font-medium">First name</label>
                  <Input id="firstName" name="firstName" defaultValue="John" />
                </div>
                <div>
                  <label htmlFor="lastName" className="mb-1.5 block text-sm font-medium">Last name</label>
                  <Input id="lastName" name="lastName" defaultValue="Doe" />
                </div>
              </div>
              
              <div>
                <label htmlFor="company" className="mb-1.5 block text-sm font-medium">Company</label>
                <Input id="company" name="company" defaultValue="Demo Procurement Co." />
              </div>
              
              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-medium">Email</label>
                <Input id="email" name="email" type="email" defaultValue={SITE_EMAIL} disabled className="bg-muted cursor-not-allowed" />
              </div>

              <div>
                <label htmlFor="phone" className="mb-1.5 block text-sm font-medium">Phone</label>
                <Input id="phone" name="phone" type="tel" defaultValue={SITE_PHONE} />
              </div>
              
              <div className="pt-2">
                <Button type="button">Save changes</Button>
              </div>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
}

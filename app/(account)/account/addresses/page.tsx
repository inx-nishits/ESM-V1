import { Breadcrumbs } from "@/components/commerce/breadcrumbs";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { AddressesView } from "@/components/account/addresses-view";

export const metadata = buildPageMetadata({
  title: "Addresses",
  path: "/account/addresses",
  noIndex: true,
});

import { AccountSidebar } from "@/components/account/account-sidebar";

export default function AccountAddressesPage() {
  return (
    <div className="site-container site-page">
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Addresses", href: "/account/addresses" },
        ]}
      />
      <div className="mt-8 grid gap-8 lg:grid-cols-[260px_1fr]">
        <aside>
          <AccountSidebar />
        </aside>
        <div className="min-w-0">
          <AddressesView />
        </div>
      </div>
    </div>
  );
}

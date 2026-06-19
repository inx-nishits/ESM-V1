import { Breadcrumbs } from "@/components/commerce/breadcrumbs";

interface MarketingPageHeaderProps {
  title: string;
  slug: string;
}

export function MarketingPageHeader({ title, slug }: MarketingPageHeaderProps) {
  return (
    <div className="border-b border-border bg-muted/30">
      <div className="site-container py-4 md:py-5">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: title, href: `/${slug}` },
          ]}
        />
      </div>
    </div>
  );
}

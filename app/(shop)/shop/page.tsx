import { PlpPageView } from "@/components/catalog/catalog-views";
import { getContentProvider } from "@/lib/content/get-content-provider";
import { parsePlpParams } from "@/lib/catalog/parse-plp-params";
import { buildPageMetadata } from "@/lib/seo/metadata";

interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export const metadata = buildPageMetadata({
  title: "Shop All Products",
  description:
    "Browse the full ESM Products catalog — nitrile gloves, masks, bouffants, gowns, and more. Case pricing with volume tiers for B2B accounts.",
  path: "/shop",
});

export default async function ShopPage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const provider = getContentProvider();
  const filters = parsePlpParams(resolvedSearchParams, { sort: "featured" });
  const [result, categories] = await Promise.all([
    provider.getProducts(filters),
    provider.getCategories(),
  ]);

  const flatParams: Record<string, string> = {};
  for (const [key, value] of Object.entries(resolvedSearchParams)) {
    if (typeof value === "string") flatParams[key] = value;
  }

  return (
    <PlpPageView
      title="All products"
      description="Full catalog of disposable PPE — gloves, masks, head covers, body protection, and FDA Gear. Published case pricing for qualified business accounts."
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Shop", href: "/shop" },
      ]}
      result={result}
      categories={categories}
      basePath="/shop"
      sort={filters.sort ?? "featured"}
      inStock={filters.inStock}
      searchParams={flatParams}
    />
  );
}

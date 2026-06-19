import { ComparePageClient } from "@/components/compare/compare-page-client";
import { getContentProvider } from "@/lib/content/get-content-provider";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Compare Products",
  description: "Compare ESM Products side by side.",
  path: "/compare",
  noIndex: true,
});

export default async function ComparePage() {
  const provider = getContentProvider();
  const { items } = await provider.getProducts({ pageSize: 100 });

  return <ComparePageClient allProducts={items} />;
}

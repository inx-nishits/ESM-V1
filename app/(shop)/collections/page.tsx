import { CollectionsPageView } from "@/components/catalog/catalog-views";
import { getContentProvider } from "@/lib/content/get-content-provider";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Collections",
  description:
    "Browse ESM Products by protection category — hand, face, head, body, foot, and FDA Gear. Case-quantity PPE for B2B buyers.",
  path: "/collections",
});

export default async function CollectionsIndexPage() {
  const provider = getContentProvider();
  const categories = await provider.getCategories();

  return <CollectionsPageView categories={categories} />;
}

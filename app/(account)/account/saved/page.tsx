import { SavedProductsView } from "@/components/account/saved-products-view";
import { getContentProvider } from "@/lib/content/get-content-provider";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Saved Products",
  path: "/account/saved",
  noIndex: true,
});

export default async function AccountSavedPage() {
  const provider = getContentProvider();
  const { items } = await provider.getProducts({ pageSize: 100 });

  return <SavedProductsView allProducts={items} />;
}

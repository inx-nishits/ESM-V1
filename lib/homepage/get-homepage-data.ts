import { getContentProvider } from "@/lib/content/get-content-provider";
import type { Category } from "@/types/category";
import type { Certification, HomepageContent } from "@/types/cms";
import type { Product } from "@/types/product";

export interface HomepageData {
  content: HomepageContent;
  categories: Category[];
  certifications: Certification[];
  featuredProducts: Product[];
  fdaProducts: Product[];
}

export async function getHomepageData(): Promise<HomepageData> {
  const provider = getContentProvider();

  const [content, categories, certifications, allProducts] = await Promise.all([
    provider.getHomepage(),
    provider.getCategories(),
    provider.getCertifications(),
    provider.getProducts({ pageSize: 100 }),
  ]);

  const productMap = new Map(allProducts.items.map((product) => [product.id, product]));

  const featuredProducts = content.featuredProductIds
    .map((id) => productMap.get(id))
    .filter((product): product is Product => product !== undefined);

  const fdaProducts = content.fdaGearSpotlight.productIds
    .map((id) => productMap.get(id))
    .filter((product): product is Product => product !== undefined);

  return {
    content,
    categories,
    certifications,
    featuredProducts,
    fdaProducts,
  };
}

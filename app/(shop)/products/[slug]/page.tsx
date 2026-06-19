import { notFound } from "next/navigation";
import { PdpPageView } from "@/components/catalog/pdp-page-view";
import { getContentProvider } from "@/lib/content/get-content-provider";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { buildBreadcrumbJsonLd, buildProductJsonLd } from "@/lib/seo/json-ld";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const provider = getContentProvider();
  const { items } = await provider.getProducts({ pageSize: 100 });
  return items.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const provider = getContentProvider();
  const product = await provider.getProductBySlug(slug);
  if (!product) return {};

  const image = product.images.find((img) => img.isPrimary) ?? product.images[0];

  return buildPageMetadata({
    title: product.name,
    description: product.shortDescription,
    path: `/products/${slug}`,
    image: image?.url,
  });
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const provider = getContentProvider();
  const product = await provider.getProductBySlug(slug);

  if (!product) notFound();

  const [categories, category, allProducts] = await Promise.all([
    provider.getCategories(),
    provider.getCategoryBySlug(product.categorySlug),
    provider.getProducts({ categorySlug: product.categorySlug, pageSize: 8 }),
  ]);

  const relatedIds = new Set(
    product.relatedProductIds.length > 0
      ? product.relatedProductIds
      : allProducts.items.filter((p) => p.id !== product.id).map((p) => p.id),
  );
  relatedIds.delete(product.id);

  const relatedProducts = allProducts.items.filter((p) => relatedIds.has(p.id)).slice(0, 4);

  const categoryName = category?.name ?? product.categorySlug;
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: categoryName, href: `/collections/${product.categorySlug}` },
    { name: product.name, href: `/products/${slug}` },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildProductJsonLd(product)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildBreadcrumbJsonLd(breadcrumbs)) }}
      />
      <PdpPageView
        product={product}
        categoryName={categoryName}
        relatedProducts={relatedProducts}
        categories={categories}
      />
    </>
  );
}

import { notFound } from "next/navigation";
import { PlpPageView } from "@/components/catalog/catalog-views";
import { getContentProvider } from "@/lib/content/get-content-provider";
import { parsePlpParams } from "@/lib/catalog/parse-plp-params";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { buildBreadcrumbJsonLd } from "@/lib/seo/json-ld";

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export async function generateStaticParams() {
  const provider = getContentProvider();
  const categories = await provider.getCategories();
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const provider = getContentProvider();
  const category = await provider.getCategoryBySlug(slug);
  if (!category) return {};

  return buildPageMetadata({
    title: category.name,
    description: category.description,
    path: `/collections/${slug}`,
    image: category.image,
  });
}

export default async function CategoryPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;
  const provider = getContentProvider();

  const [category, categories] = await Promise.all([
    provider.getCategoryBySlug(slug),
    provider.getCategories(),
  ]);

  if (!category) notFound();

  const filters = parsePlpParams(resolvedSearchParams, {
    categorySlug: slug,
    sort: "featured",
  });
  const result = await provider.getProducts(filters);

  const flatParams: Record<string, string> = {};
  for (const [key, value] of Object.entries(resolvedSearchParams)) {
    if (typeof value === "string") flatParams[key] = value;
  }

  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Collections", href: "/collections" },
    { name: category.name, href: `/collections/${slug}` },
  ];

  const jsonLd = buildBreadcrumbJsonLd(breadcrumbs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PlpPageView
        title={category.name}
        description={category.description}
        breadcrumbs={breadcrumbs}
        result={result}
        categories={categories}
        basePath={`/collections/${slug}`}
        sort={filters.sort ?? "featured"}
        inStock={filters.inStock}
        searchParams={flatParams}
        heroImage={category.heroImage ?? category.image}
        overline={`Category ${category.number}`}
      />
    </>
  );
}

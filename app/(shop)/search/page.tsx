import { Suspense } from "react";
import { SearchPageView } from "@/components/catalog/search-page-view";
import { getContentProvider } from "@/lib/content/get-content-provider";
import { parsePlpParams } from "@/lib/catalog/parse-plp-params";
import { buildPageMetadata } from "@/lib/seo/metadata";

interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export const metadata = buildPageMetadata({
  title: "Search",
  description: "Search ESM Products by name or SKU. Case-quantity disposable PPE for B2B buyers.",
  path: "/search",
  noIndex: true,
});

async function SearchResults({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const query = (Array.isArray(searchParams.q) ? searchParams.q[0] : searchParams.q)?.trim() ?? "";
  const provider = getContentProvider();
  const filters = parsePlpParams(searchParams, { sort: "relevance", search: query });

  const [result, categories] = await Promise.all([
    query ? provider.searchProducts(query, filters) : Promise.resolve({
      items: [],
      total: 0,
      page: 1,
      pageSize: filters.pageSize ?? 24,
      totalPages: 1,
    }),
    provider.getCategories(),
  ]);

  const flatParams: Record<string, string> = {};
  for (const [key, value] of Object.entries(searchParams)) {
    if (typeof value === "string") flatParams[key] = value;
  }

  return (
    <SearchPageView
      query={query}
      result={result}
      categories={categories}
      sort={filters.sort ?? "relevance"}
      inStock={filters.inStock}
      searchParams={flatParams}
    />
  );
}

export default async function SearchPage({ searchParams }: PageProps) {
  const resolved = await searchParams;

  return (
    <Suspense fallback={<div className="site-container site-page">Loading…</div>}>
      <SearchResults searchParams={resolved} />
    </Suspense>
  );
}

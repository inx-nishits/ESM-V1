import { DEFAULT_PAGE_SIZE } from "@/lib/constants";
import type { ProductFilters, ProductSortOption } from "@/types/product";

const VALID_SORTS: ProductSortOption[] = [
  "featured",
  "best-selling",
  "price-asc",
  "price-desc",
  "name-asc",
  "name-desc",
  "newest",
  "relevance",
];

function getParam(
  searchParams: Record<string, string | string[] | undefined>,
  key: string,
): string | undefined {
  const value = searchParams[key];
  if (Array.isArray(value)) return value[0];
  return value;
}

export function parsePlpParams(
  searchParams: Record<string, string | string[] | undefined>,
  defaults: Partial<ProductFilters> = {},
): ProductFilters {
  const page = Math.max(1, Number(getParam(searchParams, "page")) || 1);
  const sortParam = getParam(searchParams, "sort") as ProductSortOption | undefined;
  const sort =
    sortParam && VALID_SORTS.includes(sortParam) ? sortParam : defaults.sort ?? "featured";

  return {
    ...defaults,
    page,
    pageSize: defaults.pageSize ?? DEFAULT_PAGE_SIZE,
    sort,
    inStock: getParam(searchParams, "inStock") === "true" ? true : defaults.inStock,
    search: getParam(searchParams, "q") ?? defaults.search,
  };
}

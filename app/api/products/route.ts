import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getContentProvider } from "@/lib/content/get-content-provider";
import { apiSuccess } from "@/types/api";
import type { ProductFilters, ProductSortOption } from "@/types/product";

function parseFilters(searchParams: URLSearchParams): ProductFilters {
  return {
    categorySlug: searchParams.get("category") ?? undefined,
    page: searchParams.get("page") ? Number(searchParams.get("page")) : undefined,
    pageSize: searchParams.get("pageSize")
      ? Number(searchParams.get("pageSize"))
      : undefined,
    sort: (searchParams.get("sort") as ProductSortOption) ?? undefined,
    inStock: searchParams.get("inStock") === "true",
    search: searchParams.get("q") ?? undefined,
  };
}

export async function GET(request: NextRequest) {
  const provider = getContentProvider();
  const filters = parseFilters(request.nextUrl.searchParams);
  const data = await provider.getProducts(filters);
  return NextResponse.json(apiSuccess(data));
}

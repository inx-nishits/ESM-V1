import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getContentProvider } from "@/lib/content/get-content-provider";
import { apiError, apiSuccess } from "@/types/api";
import type { ProductSortOption } from "@/types/product";

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q");

  if (!q || q.trim().length < 2) {
    return NextResponse.json(
      apiError("INVALID_QUERY", "Search query must be at least 2 characters"),
      { status: 400 },
    );
  }

  const provider = getContentProvider();
  const sort = request.nextUrl.searchParams.get("sort") as ProductSortOption | null;
  const page = request.nextUrl.searchParams.get("page");

  const data = await provider.searchProducts(q, {
    sort: sort ?? "relevance",
    page: page ? Number(page) : undefined,
  });

  return NextResponse.json(apiSuccess(data));
}

import { NextResponse } from "next/server";
import { getContentProvider } from "@/lib/content/get-content-provider";
import { apiError, apiSuccess } from "@/types/api";

interface RouteParams {
  params: Promise<{ slug: string }>;
}

export async function GET(_request: Request, { params }: RouteParams) {
  const { slug } = await params;
  const provider = getContentProvider();
  const category = await provider.getCategoryBySlug(slug);

  if (!category) {
    return NextResponse.json(apiError("NOT_FOUND", "Category not found"), {
      status: 404,
    });
  }

  return NextResponse.json(apiSuccess(category));
}

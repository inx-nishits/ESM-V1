import { NextResponse } from "next/server";
import { getContentProvider } from "@/lib/content/get-content-provider";
import { apiError, apiSuccess } from "@/types/api";

interface RouteParams {
  params: Promise<{ slug: string }>;
}

export async function GET(_request: Request, { params }: RouteParams) {
  const { slug } = await params;
  const provider = getContentProvider();
  const product = await provider.getProductBySlug(slug);

  if (!product) {
    return NextResponse.json(apiError("NOT_FOUND", "Product not found"), {
      status: 404,
    });
  }

  return NextResponse.json(apiSuccess(product));
}

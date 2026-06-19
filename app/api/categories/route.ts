import { NextResponse } from "next/server";
import { getContentProvider } from "@/lib/content/get-content-provider";
import { apiSuccess } from "@/types/api";

export async function GET() {
  const provider = getContentProvider();
  const data = await provider.getCategories();
  return NextResponse.json(apiSuccess(data));
}

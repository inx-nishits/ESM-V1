import { NextResponse } from "next/server";
import { apiSuccess } from "@/types/api";

interface RouteParams {
  params: Promise<{ lineId: string }>;
}

export async function PATCH(request: Request, { params }: RouteParams) {
  const { lineId } = await params;
  const body = await request.json();
  return NextResponse.json(apiSuccess({ lineId, ...body }));
}

export async function DELETE(_request: Request, { params }: RouteParams) {
  const { lineId } = await params;
  return NextResponse.json(apiSuccess({ removed: lineId }));
}

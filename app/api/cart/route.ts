import { NextResponse } from "next/server";
import { apiSuccess } from "@/types/api";
import type { Cart } from "@/types/cart";

export async function GET() {
  const emptyCart: Cart = { lines: [], updatedAt: new Date().toISOString() };
  return NextResponse.json(apiSuccess(emptyCart));
}

export async function POST(request: Request) {
  const body = (await request.json()) as Cart;
  return NextResponse.json(apiSuccess(body));
}

export async function DELETE() {
  const emptyCart: Cart = { lines: [], updatedAt: new Date().toISOString() };
  return NextResponse.json(apiSuccess(emptyCart));
}

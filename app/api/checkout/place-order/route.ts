import { NextResponse } from "next/server";
import { apiSuccess } from "@/types/api";
import type { OrderConfirmation } from "@/types/checkout";

export async function POST() {
  const confirmation: OrderConfirmation = {
    orderId: crypto.randomUUID(),
    orderNumber: `ESM-${Date.now()}`,
    email: "guest@example.com",
    total: 0,
    placedAt: new Date().toISOString(),
  };

  return NextResponse.json(apiSuccess(confirmation));
}

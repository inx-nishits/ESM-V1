import { NextResponse } from "next/server";
import shippingMethods from "@/content/mock/shipping-methods.mock.json";
import { apiSuccess } from "@/types/api";
import type { ShippingMethod } from "@/types/checkout";

export async function POST() {
  return NextResponse.json(apiSuccess(shippingMethods as ShippingMethod[]));
}

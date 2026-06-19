import { NextResponse } from "next/server";
import { apiSuccess } from "@/types/api";

export async function POST() {
  return NextResponse.json(
    apiSuccess({
      valid: true,
      issues: [],
      priceRefreshRequired: false,
    }),
  );
}

import { NextResponse } from "next/server";
import { apiSuccess } from "@/types/api";

export async function POST(request: Request) {
  const body = await request.json();
  return NextResponse.json(
    apiSuccess({
      reference: `Q-${Date.now()}`,
      received: true,
      payload: body,
    }),
  );
}

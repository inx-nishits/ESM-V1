import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/checkout") && pathname !== "/checkout/confirmation") {
    const response = NextResponse.next();
    response.headers.set("x-checkout-route", "true");
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/checkout/:path*"],
};

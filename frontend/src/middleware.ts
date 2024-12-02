import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  console.log("middleware running");
  //just true for now!
  const isAuthenticated = true;
  const url = request.nextUrl.clone();

  if (!isAuthenticated && url.pathname !== "/login") {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/protected-route/:path*"],
};

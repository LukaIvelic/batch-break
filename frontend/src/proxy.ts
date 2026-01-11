import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const AUTH_CONFIG = {
  tokenKey: "access_token",
  loginPath: "/login",
  defaultPath: "/dashboard",
  publicRoutes: ["/login", "/login/email", "/signup"],
};

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(AUTH_CONFIG.tokenKey)?.value;

  const isPublicRoute = AUTH_CONFIG.publicRoutes.includes(pathname);

  if (!token && !isPublicRoute) {
    const loginUrl = new URL(AUTH_CONFIG.loginPath, request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (token && isPublicRoute) {
    return NextResponse.redirect(new URL(AUTH_CONFIG.defaultPath, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};

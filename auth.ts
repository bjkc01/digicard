import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { NextResponse } from "next/server";

const protectedRoutes = ["/dashboard", "/create-card", "/settings", "/templates"];

export const googleAuthEnabled = Boolean(
  process.env.AUTH_SECRET && process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET,
);

function isProtectedRoute(pathname: string) {
  return protectedRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`));
}

function getSafeCallbackUrl(callbackUrl: string | null) {
  return callbackUrl && callbackUrl.startsWith("/") ? callbackUrl : "/dashboard";
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: googleAuthEnabled
    ? [
        Google({
          clientId: process.env.AUTH_GOOGLE_ID!,
          clientSecret: process.env.AUTH_GOOGLE_SECRET!,
        }),
      ]
    : [],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  trustHost: true,
  callbacks: {
    authorized({ request, auth }) {
      const { pathname, search } = request.nextUrl;
      const isAuthenticated = Boolean(auth?.user);
      const callbackUrl = getSafeCallbackUrl(request.nextUrl.searchParams.get("callbackUrl"));

      if (pathname === "/login" && isAuthenticated) {
        return NextResponse.redirect(new URL(callbackUrl, request.nextUrl.origin));
      }

      if (isProtectedRoute(pathname) && !isAuthenticated) {
        const loginUrl = new URL("/login", request.nextUrl.origin);
        loginUrl.searchParams.set("callbackUrl", `${pathname}${search}`);
        return NextResponse.redirect(loginUrl);
      }

      return true;
    },
  },
});

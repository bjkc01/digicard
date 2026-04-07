import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { NextResponse } from "next/server";
import {
  emailAuthEnabled,
  emailAuthUsesConsoleFallback,
  normalizeEmail,
  verifyEmailLoginToken,
} from "@/lib/email-auth";

const protectedRoutes = ["/dashboard", "/create-card", "/settings", "/templates"];

export const googleAuthEnabled = Boolean(
  process.env.AUTH_SECRET && process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET,
);
export const temporaryAccessEnabled = Boolean(
  process.env.AUTH_SECRET &&
    process.env.AUTH_TEMP_LOGIN_ID &&
    process.env.AUTH_TEMP_LOGIN_PASSWORD,
);
export const devAuthBypassEnabled =
  process.env.NODE_ENV !== "production" && process.env.AUTH_DEV_BYPASS === "true";
export { emailAuthEnabled, emailAuthUsesConsoleFallback };

function isProtectedRoute(pathname: string) {
  return protectedRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`));
}

function getSafeCallbackUrl(callbackUrl: string | null) {
  return callbackUrl && callbackUrl.startsWith("/") ? callbackUrl : "/dashboard";
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    ...(googleAuthEnabled
      ? [
          Google({
            clientId: process.env.AUTH_GOOGLE_ID!,
            clientSecret: process.env.AUTH_GOOGLE_SECRET!,
          }),
        ]
      : []),
    ...(emailAuthEnabled
      ? [
          Credentials({
            id: "email-code",
            name: "Email",
            credentials: {
              email: { label: "Email", type: "email" },
              token: { label: "Token", type: "text" },
            },
            async authorize(credentials) {
              const email =
                typeof credentials.email === "string" ? normalizeEmail(credentials.email) : null;
              const token =
                typeof credentials.token === "string" ? credentials.token : undefined;

              return verifyEmailLoginToken(token, email ?? undefined);
            },
          }),
        ]
      : []),
    ...(temporaryAccessEnabled
      ? [
          Credentials({
            id: "temp-access",
            name: "Temporary Access",
            credentials: {
              loginId: { label: "Temporary ID", type: "text" },
              password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
              const loginId =
                typeof credentials.loginId === "string" ? credentials.loginId.trim() : "";
              const password =
                typeof credentials.password === "string" ? credentials.password : "";

              if (
                loginId !== process.env.AUTH_TEMP_LOGIN_ID ||
                password !== process.env.AUTH_TEMP_LOGIN_PASSWORD
              ) {
                return null;
              }

              return {
                email: process.env.AUTH_TEMP_LOGIN_EMAIL ?? `${loginId}@temporary.local`,
                id: `temp-access:${loginId}`,
                name: process.env.AUTH_TEMP_LOGIN_NAME ?? "Temporary Access",
              };
            },
          }),
        ]
      : []),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  trustHost: true,
  callbacks: {
    jwt({ token, user, account }) {
      if (account?.provider) {
        token.authProvider = account.provider;
      }

      if (typeof user?.id === "string") {
        token.userId = user.id;
      } else if (!token.userId && typeof token.sub === "string") {
        token.userId = token.sub;
      }

      return token;
    },
    session({ session, token }) {
      if (session.user) {
        if (typeof token.userId === "string") {
          session.user.id = token.userId;
        }

        if (typeof token.authProvider === "string") {
          session.user.authProvider = token.authProvider;
        }
      }

      return session;
    },
    authorized({ request, auth }) {
      const { pathname, search } = request.nextUrl;
      const isAuthenticated = Boolean(auth?.user);
      const callbackUrl = getSafeCallbackUrl(request.nextUrl.searchParams.get("callbackUrl"));

      if (devAuthBypassEnabled && isProtectedRoute(pathname)) {
        return true;
      }

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

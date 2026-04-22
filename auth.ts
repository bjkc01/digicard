import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { NextResponse } from "next/server";
import { authSecret, googleClientId, googleClientSecret } from "@/lib/auth-env";
import { getLoginUrl } from "@/lib/login-flow";
import {
  emailAuthEnabled,
  emailAuthUsesConsoleFallback,
  normalizeEmail,
  verifyEmailLoginToken,
} from "@/lib/email-auth";

const protectedRoutes = ["/dashboard", "/cards", "/create-card", "/settings", "/templates"];

export const googleAuthEnabled = Boolean(
  authSecret && googleClientId && googleClientSecret,
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
            clientId: googleClientId!,
            clientSecret: googleClientSecret!,
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
  ],
  pages: {
    error: "/login",
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  trustHost: true,
  callbacks: {
    async signIn({ user }) {
      const userId = user.id;
      const email = user.email;
      const name = user.name;
      if (!userId || !email) return true;
      try {
        const { createSupabaseProfileIfNew } = await import("@/lib/supabase/profiles");
        await createSupabaseProfileIfNew(userId, email, name ?? email);
      } catch (err) {
        console.error("Failed to auto-create profile on sign-in:", err);
      }
      return true;
    },
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
        const loginUrl = new URL(
          getLoginUrl({
            authView: "modal",
            callbackUrl: `${pathname}${search}`,
            originPath: "/",
          }),
          request.nextUrl.origin,
        );
        return NextResponse.redirect(loginUrl);
      }

      return true;
    },
  },
});

"use server";

import { cookies, headers } from "next/headers";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { emailAuthEnabled, googleAuthEnabled, signIn } from "@/auth";
import {
  createEmailLoginToken,
  createPendingEmailCode,
  emailAuthCookieName,
  getPendingEmailCodeCookieOptions,
  normalizeEmail,
  sendEmailSignInCode,
  verifyPendingEmailCode,
} from "@/lib/email-auth";

function getSafeCallbackUrl(value: FormDataEntryValue | null) {
  return typeof value === "string" && value.startsWith("/") ? value : "/dashboard";
}

function getLoginUrl({
  callbackUrl,
  email,
  error,
  notice,
  step,
}: {
  callbackUrl: string;
  email?: string;
  error?: string;
  notice?: string;
  step?: "verify";
}) {
  const params = new URLSearchParams({ callbackUrl });

  if (email) {
    params.set("email", email);
  }

  if (error) {
    params.set("error", error);
  }

  if (notice) {
    params.set("notice", notice);
  }

  if (step) {
    params.set("method", "email");
    params.set("step", step);
  }

  return `/login?${params.toString()}`;
}

export async function signInWithGoogle(formData: FormData) {
  if (!googleAuthEnabled) {
    redirect("/login?error=GoogleOAuthNotConfigured");
  }

  await signIn("google", {
    redirectTo: getSafeCallbackUrl(formData.get("callbackUrl")),
  });
}

export async function requestEmailSignIn(formData: FormData) {
  const callbackUrl = getSafeCallbackUrl(formData.get("callbackUrl"));
  const email = normalizeEmail(formData.get("email"));

  if (!email) {
    redirect(getLoginUrl({ callbackUrl, error: "EmailInvalid" }));
  }

  if (!emailAuthEnabled) {
    redirect(getLoginUrl({ callbackUrl, email, error: "EmailSigninUnavailable" }));
  }

  const pendingCode = await createPendingEmailCode(email);
  const cookieStore = await cookies();

  cookieStore.set(
    emailAuthCookieName,
    pendingCode.cookieValue,
    getPendingEmailCodeCookieOptions(pendingCode.expiresAt),
  );

  try {
    const headerStore = await headers();
    const host = headerStore.get("host") ?? "your DigiCard workspace";

    await sendEmailSignInCode({
      code: pendingCode.code,
      email,
      host,
    });
  } catch {
    cookieStore.delete(emailAuthCookieName);
    redirect(getLoginUrl({ callbackUrl, email, error: "EmailSendFailed" }));
  }

  redirect(
    getLoginUrl({
      callbackUrl,
      email,
      notice: "EmailCodeSent",
      step: "verify",
    }),
  );
}

export async function verifyEmailSignIn(formData: FormData) {
  const callbackUrl = getSafeCallbackUrl(formData.get("callbackUrl"));
  const email = normalizeEmail(formData.get("email"));
  const submittedCode = formData.get("code");
  const code = typeof submittedCode === "string" ? submittedCode.trim() : "";

  if (!email) {
    redirect(getLoginUrl({ callbackUrl, error: "EmailInvalid" }));
  }

  if (!code) {
    redirect(getLoginUrl({ callbackUrl, email, error: "EmailCodeRequired", step: "verify" }));
  }

  const cookieStore = await cookies();
  const verification = await verifyPendingEmailCode(
    cookieStore.get(emailAuthCookieName)?.value,
    email,
    code,
  );

  if (!verification.ok) {
    if (verification.reason === "EmailCodeExpired") {
      cookieStore.delete(emailAuthCookieName);
    }

    redirect(
      getLoginUrl({
        callbackUrl,
        email,
        error: verification.reason,
        step: "verify",
      }),
    );
  }

  cookieStore.delete(emailAuthCookieName);

  try {
    await signIn("email-code", {
      email,
      redirectTo: callbackUrl,
      token: await createEmailLoginToken(email),
    });
  } catch (error) {
    if (error instanceof AuthError) {
      redirect(
        getLoginUrl({
          callbackUrl,
          email,
          error: "EmailSigninFailed",
          step: "verify",
        }),
      );
    }

    throw error;
  }
}

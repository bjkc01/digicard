"use server";

import { cookies, headers } from "next/headers";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { emailAuthEnabled, googleAuthEnabled, signIn, temporaryAccessEnabled } from "@/auth";
import {
  createEmailLoginToken,
  createPendingEmailCode,
  emailAuthCookieName,
  getPendingEmailCodeCookieOptions,
  normalizeEmail,
  sendEmailSignInCode,
  verifyPendingEmailCode,
} from "@/lib/email-auth";
import { isGoogleAuthSupportedHost } from "@/lib/google-auth";
import { getAuthView, getLoginUrl, getSafeCallbackUrl, getSafeOriginPath } from "@/lib/login-flow";

export async function signInWithGoogle(formData: FormData) {
  const callbackUrl = getSafeCallbackUrl(formData.get("callbackUrl"));
  const authView = getAuthView(formData.get("authView"));
  const originPath = getSafeOriginPath(formData.get("originPath"));
  const headerStore = await headers();
  const requestHost = headerStore.get("x-forwarded-host") ?? headerStore.get("host");

  if (!googleAuthEnabled) {
    redirect(
      getLoginUrl({
        authView,
        callbackUrl,
        error: "GoogleOAuthNotConfigured",
        originPath,
      }),
    );
  }

  if (!isGoogleAuthSupportedHost(requestHost)) {
    redirect(
      getLoginUrl({
        authView,
        callbackUrl,
        error: "GoogleOAuthHostUnsupported",
        originPath,
      }),
    );
  }

  await signIn("google", {
    redirectTo: callbackUrl,
  });
}

export async function signInWithTemporaryAccess(formData: FormData) {
  const callbackUrl = getSafeCallbackUrl(formData.get("callbackUrl"));
  const authView = getAuthView(formData.get("authView"));
  const originPath = getSafeOriginPath(formData.get("originPath"));
  const loginId = typeof formData.get("loginId") === "string" ? formData.get("loginId")?.toString().trim() : "";
  const password = typeof formData.get("password") === "string" ? formData.get("password")?.toString() : "";

  if (!loginId || !password) {
    redirect(getLoginUrl({ authView, callbackUrl, error: "TempCredentialsRequired", originPath }));
  }

  if (!temporaryAccessEnabled) {
    redirect(getLoginUrl({ authView, callbackUrl, error: "TempCredentialsUnavailable", originPath }));
  }

  try {
    await signIn("temp-access", {
      loginId,
      password,
      redirectTo: callbackUrl,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      redirect(getLoginUrl({ authView, callbackUrl, error: "TempCredentialsInvalid", originPath }));
    }

    throw error;
  }
}

export async function requestEmailSignIn(formData: FormData) {
  const callbackUrl = getSafeCallbackUrl(formData.get("callbackUrl"));
  const authView = getAuthView(formData.get("authView"));
  const originPath = getSafeOriginPath(formData.get("originPath"));
  const email = normalizeEmail(formData.get("email"));

  if (!email) {
    redirect(getLoginUrl({ authView, callbackUrl, error: "EmailInvalid", originPath }));
  }

  if (!emailAuthEnabled) {
    redirect(
      getLoginUrl({
        authView,
        callbackUrl,
        email,
        error: "EmailSigninUnavailable",
        originPath,
      }),
    );
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
    redirect(getLoginUrl({ authView, callbackUrl, email, error: "EmailSendFailed", originPath }));
  }

  redirect(
    getLoginUrl({
      authView,
      callbackUrl,
      email,
      notice: "EmailCodeSent",
      originPath,
      step: "verify",
    }),
  );
}

export async function verifyEmailSignIn(formData: FormData) {
  const callbackUrl = getSafeCallbackUrl(formData.get("callbackUrl"));
  const authView = getAuthView(formData.get("authView"));
  const originPath = getSafeOriginPath(formData.get("originPath"));
  const email = normalizeEmail(formData.get("email"));
  const submittedCode = formData.get("code");
  const code = typeof submittedCode === "string" ? submittedCode.trim() : "";

  if (!email) {
    redirect(getLoginUrl({ authView, callbackUrl, error: "EmailInvalid", originPath }));
  }

  if (!code) {
    redirect(
      getLoginUrl({
        authView,
        callbackUrl,
        email,
        error: "EmailCodeRequired",
        originPath,
        step: "verify",
      }),
    );
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
        authView,
        callbackUrl,
        email,
        error: verification.reason,
        originPath,
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
          authView,
          callbackUrl,
          email,
          error: "EmailSigninFailed",
          originPath,
          step: "verify",
        }),
      );
    }

    throw error;
  }
}

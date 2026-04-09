"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  KeyRound,
  Mail,
  Sparkles,
} from "lucide-react";
import {
  requestEmailSignIn,
  signInWithGoogle,
  signInWithTemporaryAccess,
  verifyEmailSignIn,
} from "@/app/login/actions";
import { AuthBenefitsShowcase } from "@/components/login/auth-benefits-showcase";
import { cn } from "@/lib/utils";

export type AuthModalPanel = "choices" | "email" | "verify" | "temporary";

type HomeAuthModalCardProps = {
  callbackUrl: string;
  destinationLabel: string;
  devAuthBypassEnabled: boolean;
  emailAddress: string;
  emailAuthUsesConsoleFallback: boolean;
  errorCode?: string;
  errorMessage?: string | null;
  googleConfigured: boolean;
  hasAnySignInMethod: boolean;
  initialPanel: AuthModalPanel;
  isEmailConfigured: boolean;
  isTemporaryAccessAvailable: boolean;
  noticeCode?: string;
  noticeMessage?: string | null;
  originPath: string;
};

function ModalAuthContextFields({
  callbackUrl,
  originPath,
}: {
  callbackUrl: string;
  originPath: string;
}) {
  return (
    <>
      <input type="hidden" name="authView" value="modal" />
      <input type="hidden" name="callbackUrl" value={callbackUrl} />
      <input type="hidden" name="originPath" value={originPath} />
    </>
  );
}

function StatusMessage({
  message,
  tone = "neutral",
}: {
  message: string;
  tone?: "neutral" | "error" | "success";
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border px-4 py-3 text-sm leading-6",
        tone === "error" &&
          "border-[rgba(199,68,92,0.18)] bg-[rgba(255,238,242,0.94)] text-[#8a2a43]",
        tone === "success" &&
          "border-[rgba(34,197,94,0.18)] bg-[rgba(240,253,244,0.94)] text-[#166534]",
        tone === "neutral" &&
          "border-[rgba(82,103,217,0.14)] bg-[rgba(241,244,255,0.92)] text-[var(--ink)]",
      )}
    >
      {message}
    </div>
  );
}

function ActionSurface({
  description,
  disabled = false,
  icon,
  title,
  trailing,
}: {
  description: string;
  disabled?: boolean;
  icon: React.ReactNode;
  title: string;
  trailing?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-3 rounded-[1.3rem] border border-[rgba(25,35,61,0.1)] bg-white px-3.5 py-3 shadow-[0_8px_20px_rgba(21,32,58,0.04)] transition",
        disabled
          ? "cursor-not-allowed opacity-70"
          : "hover:-translate-y-0.5 hover:border-[rgba(82,103,217,0.24)] hover:shadow-[0_16px_30px_rgba(21,32,58,0.08)]",
      )}
    >
      <span className="flex min-w-0 items-center gap-3">
        <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-[var(--soft)]">
          {icon}
        </span>
        <span className="min-w-0">
          <span className="block text-left text-[0.98rem] font-semibold text-[var(--ink)]">{title}</span>
          <span className="mt-1 block text-left text-xs leading-5 text-[var(--muted)]">{description}</span>
        </span>
      </span>
      <span className="flex-shrink-0 text-[var(--muted)]">{trailing}</span>
    </div>
  );
}

export function HomeAuthModalCard({
  callbackUrl,
  destinationLabel,
  devAuthBypassEnabled,
  emailAddress,
  emailAuthUsesConsoleFallback,
  errorCode,
  errorMessage,
  googleConfigured,
  hasAnySignInMethod,
  initialPanel,
  isEmailConfigured,
  isTemporaryAccessAvailable,
  noticeCode,
  noticeMessage,
  originPath,
}: HomeAuthModalCardProps) {
  const [panel, setPanel] = useState<AuthModalPanel>(initialPanel);

  useEffect(() => {
    setPanel(initialPanel);
  }, [initialPanel]);

  const isChoicesPanel = panel === "choices";
  const isEmailPanel = panel === "email";
  const isVerifyPanel = panel === "verify";
  const isTemporaryPanel = panel === "temporary";

  const showChoiceError =
    isChoicesPanel &&
    Boolean(errorMessage) &&
    !errorCode?.startsWith("Email") &&
    !errorCode?.startsWith("TempCredentials");
  const showEmailError =
    (isEmailPanel || isVerifyPanel) && Boolean(errorMessage) && errorCode?.startsWith("Email");
  const showTemporaryError =
    isTemporaryPanel && Boolean(errorMessage) && errorCode?.startsWith("TempCredentials");
  const showVerifyNotice = isVerifyPanel && Boolean(noticeMessage) && noticeCode === "EmailCodeSent";

  return (
    <div className="w-[min(calc(100vw-2rem),27rem)] sm:w-[min(calc(100vw-3rem),29rem)] lg:w-[min(calc(100vw-5rem),54rem)]">
      <div className="flex max-h-[min(88vh,42rem)] overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.22),0_4px_16px_rgba(15,23,42,0.08)]">
        <div className="min-w-0 flex-1 overflow-y-auto px-5 py-5 sm:px-6 sm:py-6 lg:basis-[29rem] lg:shrink-0">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(82,103,217,0.14)] bg-[var(--soft)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--brand)]">
              <Sparkles className="h-3 w-3" />
              {hasAnySignInMethod ? "Welcome" : "Setup needed"}
            </div>

            {isChoicesPanel ? (
              <div className="mt-4">
                <h2 className="text-[1.6rem] font-semibold leading-[1.06] tracking-[-0.05em] text-[var(--ink)]">
                  Log in or sign up in seconds
                </h2>
                <p className="mt-2 max-w-[22rem] text-sm leading-6 text-[var(--muted)]">
                  Continue to {destinationLabel} without leaving the page.
                </p>
              </div>
            ) : null}

            {isEmailPanel ? (
              <div className="mt-4">
                <button
                  type="button"
                  onClick={() => setPanel("choices")}
                  className="inline-flex items-center gap-2 rounded-full border border-[rgba(25,35,61,0.1)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)] transition hover:border-[rgba(82,103,217,0.24)] hover:text-[var(--ink)]"
                >
                  <ArrowLeft className="h-3 w-3" />
                  Back
                </button>
                <h2 className="mt-3 text-[1.5rem] font-semibold leading-[1.06] tracking-[-0.05em] text-[var(--ink)]">
                  Continue with email
                </h2>
                <p className="mt-1.5 max-w-[22rem] text-sm leading-6 text-[var(--muted)]">
                  Enter your email and we&apos;ll send a secure sign-in code.
                </p>
              </div>
            ) : null}

            {isVerifyPanel ? (
              <div className="mt-4">
                <button
                  type="button"
                  onClick={() => setPanel("email")}
                  className="inline-flex items-center gap-2 rounded-full border border-[rgba(25,35,61,0.1)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)] transition hover:border-[rgba(82,103,217,0.24)] hover:text-[var(--ink)]"
                >
                  <ArrowLeft className="h-3 w-3" />
                  Back
                </button>
                <h2 className="mt-3 text-[1.5rem] font-semibold leading-[1.06] tracking-[-0.05em] text-[var(--ink)]">
                  Check your email
                </h2>
                <p className="mt-1.5 max-w-[22rem] text-sm leading-6 text-[var(--muted)]">
                  Enter the 6-digit code sent to{" "}
                  <span className="font-semibold text-[var(--ink)]">{emailAddress}</span>.
                </p>
              </div>
            ) : null}

            {isTemporaryPanel ? (
              <div className="mt-4">
                <button
                  type="button"
                  onClick={() => setPanel("choices")}
                  className="inline-flex items-center gap-2 rounded-full border border-[rgba(25,35,61,0.1)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)] transition hover:border-[rgba(82,103,217,0.24)] hover:text-[var(--ink)]"
                >
                  <ArrowLeft className="h-3 w-3" />
                  Back
                </button>
                <h2 className="mt-3 text-[1.5rem] font-semibold leading-[1.06] tracking-[-0.05em] text-[var(--ink)]">
                  Temporary access
                </h2>
                <p className="mt-1.5 max-w-[22rem] text-sm leading-6 text-[var(--muted)]">
                  Use short-term credentials for a fallback route into the workspace.
                </p>
              </div>
            ) : null}

            <div className="mt-4 space-y-3">
              {showChoiceError && errorMessage ? <StatusMessage message={errorMessage} tone="error" /> : null}
              {showEmailError && errorMessage ? <StatusMessage message={errorMessage} tone="error" /> : null}
              {showTemporaryError && errorMessage ? <StatusMessage message={errorMessage} tone="error" /> : null}
              {showVerifyNotice && noticeMessage ? <StatusMessage message={noticeMessage} tone="success" /> : null}
            </div>
          </div>

          <div className="mt-4">
            {isChoicesPanel ? (
              <div className="space-y-2.5">
                {googleConfigured ? (
                  <form action={signInWithGoogle}>
                    <ModalAuthContextFields callbackUrl={callbackUrl} originPath={originPath} />
                    <button type="submit" className="w-full text-left">
                      <ActionSurface
                        title="Continue with Google"
                        description="Secure handoff only when Google takes over."
                        icon={<span className="text-xl font-bold leading-none text-[#4285F4]">G</span>}
                        trailing={<ArrowRight className="h-4 w-4" />}
                      />
                    </button>
                  </form>
                ) : (
                  <ActionSurface
                    disabled
                    title="Continue with Google"
                    description="Google sign-in is not available on this deployment yet."
                    icon={<span className="text-xl font-bold leading-none text-[#4285F4]">G</span>}
                  />
                )}

                {isEmailConfigured ? (
                  <button type="button" className="w-full text-left" onClick={() => setPanel("email")}>
                    <ActionSurface
                      title="Continue with email"
                      description="Get a one-time code and finish inside this modal."
                      icon={<Mail className="h-5 w-5 text-[var(--brand)]" />}
                      trailing={<ArrowRight className="h-4 w-4" />}
                    />
                  </button>
                ) : (
                  <ActionSurface
                    disabled
                    title="Continue with email"
                    description="Email sign-in is not available on this deployment yet."
                    icon={<Mail className="h-5 w-5 text-[var(--brand)]" />}
                  />
                )}

                {isTemporaryAccessAvailable ? (
                  <button
                    type="button"
                    onClick={() => setPanel("temporary")}
                    className="inline-flex items-center gap-2 rounded-full px-1 py-1 text-sm font-medium text-[var(--muted)] transition hover:text-[var(--ink)]"
                  >
                    <KeyRound className="h-4 w-4" />
                    Use temporary access
                  </button>
                ) : null}

                {!hasAnySignInMethod ? (
                  <StatusMessage
                    message="Sign-in methods are still being configured for this deployment."
                    tone="neutral"
                  />
                ) : null}
              </div>
            ) : null}

            {isEmailPanel ? (
              <div className="rounded-[1.7rem] border border-[rgba(25,35,61,0.08)] bg-[#f6f8ff] p-4 sm:p-5">
                <form action={requestEmailSignIn} className="space-y-4">
                  <ModalAuthContextFields callbackUrl={callbackUrl} originPath={originPath} />
                  <label className="block space-y-2">
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                      Email address
                    </span>
                    <input
                      name="email"
                      type="email"
                      defaultValue={emailAddress}
                      autoComplete="email"
                      autoFocus
                      placeholder="you@example.com"
                      disabled={!isEmailConfigured}
                      className="h-12 w-full rounded-2xl border border-[rgba(25,35,61,0.1)] px-4 text-base text-[var(--ink)] outline-none transition focus:border-[rgba(82,103,217,0.4)] focus:ring-4 focus:ring-[rgba(82,103,217,0.12)] disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                    />
                  </label>

                  <button
                    type="submit"
                    disabled={!isEmailConfigured}
                    className="flex w-full items-center justify-between rounded-2xl bg-[var(--brand)] px-5 py-4 text-left text-white shadow-[0_16px_34px_rgba(82,103,217,0.18)] transition hover:bg-[#4459cb] disabled:cursor-not-allowed disabled:bg-[rgba(82,103,217,0.55)]"
                  >
                    <span>
                      <span className="block text-base font-semibold">Send sign-in code</span>
                      <span className="mt-1 block text-xs text-white/82">
                        {isEmailConfigured
                          ? "We'll email you a 6-digit code right away."
                          : "Email sign-in will appear here once the deployment is configured."}
                      </span>
                    </span>
                    <ArrowRight className="h-4 w-4 text-white/80" />
                  </button>
                </form>

                {emailAuthUsesConsoleFallback ? (
                  <p className="mt-4 text-xs leading-6 text-[var(--muted)]">
                    Local development mode is active, so sign-in codes are printed to the server console.
                  </p>
                ) : null}
              </div>
            ) : null}

            {isVerifyPanel ? (
              <div className="rounded-[1.7rem] border border-[rgba(25,35,61,0.08)] bg-[#f6f8ff] p-4 sm:p-5">
                <form action={verifyEmailSignIn} className="space-y-4">
                  <ModalAuthContextFields callbackUrl={callbackUrl} originPath={originPath} />
                  <input type="hidden" name="email" value={emailAddress} />
                  <label className="block space-y-2">
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                      Verification code
                    </span>
                    <input
                      name="code"
                      type="text"
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      autoFocus
                      maxLength={6}
                      placeholder="123456"
                      className="h-12 w-full rounded-2xl border border-[rgba(25,35,61,0.1)] px-4 text-base tracking-[0.28em] text-[var(--ink)] outline-none transition focus:border-[rgba(82,103,217,0.4)] focus:ring-4 focus:ring-[rgba(82,103,217,0.12)]"
                    />
                  </label>

                  <button
                    type="submit"
                    className="flex w-full items-center justify-between rounded-2xl bg-[var(--brand)] px-5 py-4 text-left text-white shadow-[0_16px_34px_rgba(82,103,217,0.18)] transition hover:bg-[#4459cb]"
                  >
                    <span>
                      <span className="block text-base font-semibold">Verify and continue</span>
                      <span className="mt-1 block text-xs text-white/82">
                        Finish signing in and continue to {destinationLabel}.
                      </span>
                    </span>
                    <ArrowRight className="h-4 w-4 text-white/80" />
                  </button>
                </form>

                <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
                  <form action={requestEmailSignIn}>
                    <ModalAuthContextFields callbackUrl={callbackUrl} originPath={originPath} />
                    <input type="hidden" name="email" value={emailAddress} />
                    <button
                      type="submit"
                      className="rounded-full border border-[rgba(25,35,61,0.12)] px-4 py-2 font-medium text-[var(--ink)] transition hover:border-[rgba(82,103,217,0.22)] hover:bg-[var(--soft)]"
                    >
                      Resend code
                    </button>
                  </form>
                  <button
                    type="button"
                    onClick={() => setPanel("email")}
                    className="rounded-full px-2 py-2 font-medium text-[var(--muted)] transition hover:text-[var(--ink)]"
                  >
                    Use a different email
                  </button>
                </div>

                {emailAuthUsesConsoleFallback ? (
                  <p className="mt-4 text-xs leading-6 text-[var(--muted)]">
                    Local development mode is active, so sign-in codes are printed to the server console.
                  </p>
                ) : null}
              </div>
            ) : null}

            {isTemporaryPanel ? (
              <div className="rounded-[1.7rem] border border-[rgba(25,35,61,0.08)] bg-[#f6f8ff] p-4 sm:p-5">
                <form action={signInWithTemporaryAccess} className="space-y-4">
                  <ModalAuthContextFields callbackUrl={callbackUrl} originPath={originPath} />
                  <label className="block space-y-2">
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                      Temporary ID
                    </span>
                    <input
                      name="loginId"
                      type="text"
                      autoComplete="username"
                      placeholder="temp-admin"
                      autoFocus
                      disabled={!isTemporaryAccessAvailable}
                      className="h-12 w-full rounded-2xl border border-[rgba(25,35,61,0.1)] px-4 text-base text-[var(--ink)] outline-none transition focus:border-[rgba(82,103,217,0.4)] focus:ring-4 focus:ring-[rgba(82,103,217,0.12)] disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                    />
                  </label>
                  <label className="block space-y-2">
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                      Password
                    </span>
                    <input
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      placeholder="Temporary password"
                      disabled={!isTemporaryAccessAvailable}
                      className="h-12 w-full rounded-2xl border border-[rgba(25,35,61,0.1)] px-4 text-base text-[var(--ink)] outline-none transition focus:border-[rgba(82,103,217,0.4)] focus:ring-4 focus:ring-[rgba(82,103,217,0.12)] disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                    />
                  </label>

                  <button
                    type="submit"
                    disabled={!isTemporaryAccessAvailable}
                    className="flex w-full items-center justify-between rounded-2xl bg-[var(--brand)] px-5 py-4 text-left text-white shadow-[0_16px_34px_rgba(82,103,217,0.18)] transition hover:bg-[#4459cb] disabled:cursor-not-allowed disabled:bg-[rgba(82,103,217,0.55)]"
                  >
                    <span>
                      <span className="block text-base font-semibold">Continue with temporary access</span>
                      <span className="mt-1 block text-xs text-white/82">
                        {isTemporaryAccessAvailable
                          ? `We'll continue to ${destinationLabel}.`
                          : "Temporary access is not available on this deployment yet."}
                      </span>
                    </span>
                    <ArrowRight className="h-4 w-4 text-white/80" />
                  </button>
                </form>
              </div>
            ) : null}
          </div>

          <div className="mt-5 flex flex-col gap-2.5 border-t border-[rgba(25,35,61,0.08)] pt-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs leading-6 text-[var(--muted)] sm:text-sm">
              By continuing, you agree to DigiCard&apos;s Terms of Use and Privacy Policy.
            </p>

            {devAuthBypassEnabled ? (
              <Link
                href={callbackUrl}
                className="inline-flex items-center gap-2 rounded-full bg-[#059669] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#047857]"
              >
                Open preview
                <ArrowRight className="h-4 w-4" />
              </Link>
            ) : null}
          </div>
        </div>

        <AuthBenefitsShowcase />
      </div>
    </div>
  );
}

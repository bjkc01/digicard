"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  CreditCard,
  KeyRound,
  Mail,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import {
  requestEmailSignIn,
  signInWithGoogle,
  signInWithTemporaryAccess,
  verifyEmailSignIn,
} from "@/app/login/actions";
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
          "border-[rgba(82,103,217,0.14)] bg-[rgba(241,244,255,0.9)] text-[var(--ink)]",
      )}
    >
      {message}
    </div>
  );
}

function ProviderRow({
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
        "flex items-center justify-between gap-4 rounded-[1.4rem] border border-[rgba(25,35,61,0.1)] bg-white px-4 py-3.5 shadow-[0_10px_24px_rgba(21,32,58,0.04)] transition",
        disabled
          ? "cursor-not-allowed opacity-70"
          : "hover:border-[rgba(82,103,217,0.24)] hover:shadow-[0_16px_34px_rgba(21,32,58,0.08)]",
      )}
    >
      <span className="flex min-w-0 items-center gap-3.5">
        <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-[var(--soft)]">
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

function DesktopVisualPanel({ destinationLabel }: { destinationLabel: string }) {
  return (
    <div className="relative hidden overflow-hidden bg-[linear-gradient(180deg,_#172340_0%,_#243967_44%,_#5267d9_100%)] p-8 text-white lg:flex lg:flex-col lg:justify-between">
      <div className="absolute left-10 top-10 h-32 w-32 rounded-full bg-white/14 blur-3xl" />
      <div className="absolute bottom-12 right-8 h-40 w-40 rounded-full bg-[rgba(255,141,87,0.18)] blur-3xl" />

      <div className="relative z-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80">
          <Sparkles className="h-3.5 w-3.5" />
          Smooth auth flow
        </div>
        <h3 className="mt-5 max-w-[14rem] text-[2rem] font-semibold leading-[1.02] tracking-[-0.05em]">
          Stay on the page while you sign in.
        </h3>
        <p className="mt-4 max-w-[15rem] text-sm leading-7 text-white/76">
          Open auth in a polished modal, then continue straight to {destinationLabel}.
        </p>
      </div>

      <div className="relative z-10 space-y-4">
        <div className="rounded-[1.8rem] border border-white/12 bg-white/10 p-4 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/74">
              <CreditCard className="h-3.5 w-3.5" />
              DigiCard
            </div>
            <ShieldCheck className="h-4 w-4 text-white/72" />
          </div>

          <div className="mt-5 rounded-[1.5rem] border border-white/10 bg-[rgba(10,14,26,0.26)] p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-lg font-semibold tracking-[-0.03em] text-white">Maya Carter</p>
                <p className="mt-1 text-sm text-white/72">Computer Science Student</p>
              </div>
              <div className="rounded-2xl bg-white/12 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/72">
                Ready
              </div>
            </div>

            <div className="mt-4 grid gap-2.5">
              {[
                "Share your profile with one scan",
                "Keep resume, links, and contact details together",
                "Move from hello to follow-up much faster",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl bg-white/8 px-3 py-3">
                  <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-white/14">
                    <CheckCircle2 className="h-3.5 w-3.5 text-white" />
                  </div>
                  <p className="text-sm leading-6 text-white/80">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
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

  const showingEmailPanel = panel === "email";
  const showingVerifyPanel = panel === "verify";
  const showingTemporaryPanel = panel === "temporary";

  const showChoiceError =
    panel === "choices" &&
    Boolean(errorMessage) &&
    !errorCode?.startsWith("Email") &&
    !errorCode?.startsWith("TempCredentials");

  const showEmailError = Boolean(errorMessage) && errorCode?.startsWith("Email");
  const showTemporaryError = Boolean(errorMessage) && errorCode?.startsWith("TempCredentials");
  const showVerifyNotice = showingVerifyPanel && Boolean(noticeMessage) && noticeCode === "EmailCodeSent";

  return (
    <div className="w-full max-w-[34rem] lg:max-w-[54rem]">
      <div className="grid max-h-[min(90vh,760px)] overflow-hidden rounded-[2rem] border border-white/75 bg-white/96 shadow-[0_40px_120px_rgba(15,23,42,0.24)] backdrop-blur-xl lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="overflow-y-auto px-5 py-5 sm:px-7 sm:py-7">
          <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(82,103,217,0.14)] bg-[var(--soft)] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--brand)]">
            <Sparkles className="h-3.5 w-3.5" />
            {hasAnySignInMethod ? "Welcome" : "Setup needed"}
          </div>

          {panel === "choices" ? (
            <div className="mt-5">
              <h2 className="text-[2rem] font-semibold leading-[1.02] tracking-[-0.05em] text-[var(--ink)] sm:text-[2.15rem]">
                Log in or sign up in seconds
              </h2>
              <p className="mt-3 max-w-[28rem] text-sm leading-7 text-[var(--muted)] sm:text-[0.96rem]">
                Continue to {destinationLabel} without losing the page behind you.
              </p>
            </div>
          ) : null}

          {showingEmailPanel ? (
            <div className="mt-5">
              <button
                type="button"
                onClick={() => setPanel("choices")}
                className="inline-flex items-center gap-2 rounded-full border border-[rgba(25,35,61,0.1)] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)] transition hover:border-[rgba(82,103,217,0.24)] hover:text-[var(--ink)]"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Back
              </button>
              <h2 className="mt-4 text-[1.8rem] font-semibold leading-[1.04] tracking-[-0.05em] text-[var(--ink)]">
                Continue with email
              </h2>
              <p className="mt-3 max-w-[28rem] text-sm leading-7 text-[var(--muted)] sm:text-[0.96rem]">
                Enter your email and we&apos;ll send a secure sign-in code without leaving this modal.
              </p>
            </div>
          ) : null}

          {showingVerifyPanel ? (
            <div className="mt-5">
              <button
                type="button"
                onClick={() => setPanel("email")}
                className="inline-flex items-center gap-2 rounded-full border border-[rgba(25,35,61,0.1)] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)] transition hover:border-[rgba(82,103,217,0.24)] hover:text-[var(--ink)]"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Use a different email
              </button>
              <h2 className="mt-4 text-[1.8rem] font-semibold leading-[1.04] tracking-[-0.05em] text-[var(--ink)]">
                Check your email
              </h2>
              <p className="mt-3 max-w-[28rem] text-sm leading-7 text-[var(--muted)] sm:text-[0.96rem]">
                Enter the 6-digit code sent to <span className="font-semibold text-[var(--ink)]">{emailAddress}</span>.
              </p>
            </div>
          ) : null}

          {showingTemporaryPanel ? (
            <div className="mt-5">
              <button
                type="button"
                onClick={() => setPanel("choices")}
                className="inline-flex items-center gap-2 rounded-full border border-[rgba(25,35,61,0.1)] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)] transition hover:border-[rgba(82,103,217,0.24)] hover:text-[var(--ink)]"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Back
              </button>
              <h2 className="mt-4 text-[1.8rem] font-semibold leading-[1.04] tracking-[-0.05em] text-[var(--ink)]">
                Temporary access
              </h2>
              <p className="mt-3 max-w-[28rem] text-sm leading-7 text-[var(--muted)] sm:text-[0.96rem]">
                Use short-term credentials if you need a fallback path into the workspace.
              </p>
            </div>
          ) : null}

          <div className="mt-6 space-y-4">
            {showChoiceError && errorMessage ? <StatusMessage message={errorMessage} tone="error" /> : null}
            {showEmailError && errorMessage ? <StatusMessage message={errorMessage} tone="error" /> : null}
            {showTemporaryError && errorMessage ? <StatusMessage message={errorMessage} tone="error" /> : null}
            {showVerifyNotice && noticeMessage ? <StatusMessage message={noticeMessage} tone="success" /> : null}

            {panel === "choices" ? (
              <>
                {googleConfigured ? (
                  <form action={signInWithGoogle}>
                    <ModalAuthContextFields callbackUrl={callbackUrl} originPath={originPath} />
                    <button type="submit" className="w-full text-left">
                      <ProviderRow
                        title="Continue with Google"
                        description="Secure handoff only when Google takes over."
                        icon={<span className="text-xl font-bold leading-none text-[#4285F4]">G</span>}
                        trailing={<ArrowRight className="h-4 w-4" />}
                      />
                    </button>
                  </form>
                ) : (
                  <ProviderRow
                    disabled
                    title="Continue with Google"
                    description="Google sign-in is not available on this deployment yet."
                    icon={<span className="text-xl font-bold leading-none text-[#4285F4]">G</span>}
                  />
                )}

                <button type="button" className="w-full text-left" onClick={() => setPanel("email")}>
                  <ProviderRow
                    title="Continue with email"
                    description={
                      isEmailConfigured
                        ? "Receive a one-time code and finish right here."
                        : "Email sign-in is not available on this deployment yet."
                    }
                    icon={<Mail className="h-5 w-5 text-[var(--brand)]" />}
                    trailing={<ArrowRight className="h-4 w-4" />}
                  />
                </button>

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

                {devAuthBypassEnabled ? (
                  <Link
                    href={callbackUrl}
                    className="inline-flex items-center gap-2 rounded-full bg-[#059669] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#047857]"
                  >
                    Open preview without sign-in
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                ) : null}

                {!hasAnySignInMethod ? (
                  <StatusMessage
                    message="Sign-in methods are still being configured for this deployment."
                    tone="neutral"
                  />
                ) : null}
              </>
            ) : null}

            {showingEmailPanel ? (
              <div className="rounded-[1.6rem] border border-[rgba(25,35,61,0.08)] bg-[linear-gradient(180deg,_rgba(255,255,255,0.98),_rgba(246,248,255,0.94))] p-4 sm:p-5">
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

            {showingVerifyPanel ? (
              <div className="rounded-[1.6rem] border border-[rgba(25,35,61,0.08)] bg-[linear-gradient(180deg,_rgba(255,255,255,0.98),_rgba(246,248,255,0.94))] p-4 sm:p-5">
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

            {showingTemporaryPanel ? (
              <div className="rounded-[1.6rem] border border-[rgba(25,35,61,0.08)] bg-[linear-gradient(180deg,_rgba(255,255,255,0.98),_rgba(246,248,255,0.94))] p-4 sm:p-5">
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

          <p className="mt-6 text-xs leading-6 text-[var(--muted)] sm:text-sm">
            By continuing, you agree to DigiCard&apos;s Terms of Use and Privacy Policy.
          </p>
        </div>

        <DesktopVisualPanel destinationLabel={destinationLabel} />
      </div>
    </div>
  );
}

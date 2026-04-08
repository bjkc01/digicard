import Link from "next/link";
import { headers } from "next/headers";
import {
  devAuthBypassEnabled,
  emailAuthEnabled,
  emailAuthUsesConsoleFallback,
  googleAuthEnabled,
  temporaryAccessConfigured,
  temporaryAccessEnabled,
} from "@/auth";
import {
  requestEmailSignIn,
  signInWithGoogle,
  signInWithTemporaryAccess,
  verifyEmailSignIn,
} from "@/app/login/actions";
import {
  getDestinationLabel,
  getLoginErrorMessage,
  getLoginNoticeMessage,
  getLoginUrl,
  getSafeCallbackUrl,
  type LoginSearchParams,
} from "@/lib/login-flow";
import { siteConfig } from "@/lib/site-config";
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  CreditCard,
  GraduationCap,
  KeyRound,
  Mail,
  MoveRight,
  ScanLine,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";

type HomeAuthModalContentProps = {
  originPath?: string;
  searchParams?: LoginSearchParams;
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

const visualBullets = [
  "Open sign-in without leaving the marketing page",
  "Keep email verification and auth errors inside the modal",
  "Redirect only when Google or another provider requires it",
] as const;

export async function HomeAuthModalContent({
  originPath = "/",
  searchParams,
}: HomeAuthModalContentProps) {
  const resolvedSearchParams = searchParams ?? {};
  const headerStore = await headers();
  const forwardedProto = headerStore.get("x-forwarded-proto");
  const host = headerStore.get("x-forwarded-host") ?? headerStore.get("host");
  const protocol =
    forwardedProto ?? (process.env.NODE_ENV === "production" ? "https" : "http");
  const deploymentOrigin = host ? `${protocol}://${host}` : siteConfig.url;
  const callbackUrl = getSafeCallbackUrl(resolvedSearchParams.callbackUrl);
  const emailAddress = resolvedSearchParams.email ?? "";
  const loginErrorMessage = getLoginErrorMessage(resolvedSearchParams.error);
  const loginNoticeMessage = getLoginNoticeMessage(resolvedSearchParams.notice);
  const isGoogleConfigured = googleAuthEnabled;
  const isEmailConfigured = emailAuthEnabled;
  const isTemporaryAccessAvailable = temporaryAccessEnabled;
  const showEmailVerification =
    resolvedSearchParams.method === "email" && resolvedSearchParams.step === "verify";
  const hasAnySignInMethod =
    isGoogleConfigured || isEmailConfigured || isTemporaryAccessAvailable;
  const missingGoogleEnv = [
    !process.env.AUTH_SECRET ? "AUTH_SECRET" : null,
    !process.env.AUTH_GOOGLE_ID ? "AUTH_GOOGLE_ID" : null,
    !process.env.AUTH_GOOGLE_SECRET ? "AUTH_GOOGLE_SECRET" : null,
  ].filter(Boolean) as string[];
  const missingEmailEnv = [
    !process.env.AUTH_SECRET ? "AUTH_SECRET" : null,
    !process.env.AUTH_EMAIL_FROM ? "AUTH_EMAIL_FROM" : null,
    !process.env.AUTH_RESEND_API_KEY ? "AUTH_RESEND_API_KEY" : null,
  ].filter(Boolean) as string[];
  const resetEmailHref = getLoginUrl({
    authView: "modal",
    callbackUrl,
    originPath,
  });

  return (
    <div className="grid max-h-[min(88vh,860px)] w-full overflow-hidden rounded-[2rem] border border-white/70 bg-white shadow-[0_40px_120px_rgba(15,23,42,0.24)] md:grid-cols-[minmax(0,1fr)_390px]">
      <div className="overflow-y-auto px-5 py-5 sm:px-7 sm:py-7 md:px-8 md:py-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(82,103,217,0.14)] bg-[var(--soft)] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--brand)]">
          <Sparkles className="h-3.5 w-3.5" />
          {hasAnySignInMethod ? "Welcome back" : "Setup needed"}
        </div>

        <div className="mt-5 max-w-xl">
          <h2 className="text-[1.9rem] font-semibold leading-[1.02] tracking-[-0.05em] text-[var(--ink)] sm:text-[2.3rem]">
            Sign in without leaving the page.
          </h2>
          <p className="mt-3 text-[0.98rem] leading-7 text-[var(--muted)]">
            Start authentication right here, keep the background context in view, and return to{" "}
            {getDestinationLabel(callbackUrl)} as soon as sign-in is complete.
          </p>
        </div>

        <div className="mt-6 space-y-4">
          {loginErrorMessage ? (
            <div className="rounded-[1.5rem] border border-[rgba(199,68,92,0.18)] bg-[rgba(255,238,242,0.92)] px-5 py-4 text-sm font-medium text-[#8a2a43]">
              {loginErrorMessage}
            </div>
          ) : null}

          {loginNoticeMessage ? (
            <div className="rounded-[1.5rem] border border-[rgba(37,99,235,0.14)] bg-[rgba(239,246,255,0.96)] px-5 py-4 text-sm font-medium text-[#1d4ed8]">
              {loginNoticeMessage}
            </div>
          ) : null}

          {devAuthBypassEnabled ? (
            <div className="rounded-[1.6rem] border border-[rgba(16,185,129,0.16)] bg-[rgba(236,253,245,0.9)] px-5 py-5 text-sm shadow-[0_12px_30px_rgba(16,185,129,0.08)]">
              <p className="font-semibold text-[#065f46]">Local preview mode is on</p>
              <p className="mt-2 leading-7 text-[#0f766e]">
                Protected pages are currently unlocked in development, so you can inspect the
                workspace while auth is still being wired up.
              </p>
              <Link
                href={callbackUrl}
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#059669] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#047857]"
              >
                Open preview
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ) : null}
        </div>

        <div className="mt-6 space-y-4">
          {isGoogleConfigured ? (
            <form action={signInWithGoogle}>
              <ModalAuthContextFields callbackUrl={callbackUrl} originPath={originPath} />
              <button
                type="submit"
                className="flex w-full items-center justify-between rounded-[1.7rem] border border-[rgba(25,35,61,0.1)] bg-white px-5 py-4 text-left shadow-[0_14px_34px_rgba(21,32,58,0.05)] transition hover:border-[rgba(82,103,217,0.24)] hover:shadow-[0_18px_40px_rgba(21,32,58,0.08)]"
              >
                <span className="flex items-center gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--soft)]">
                    <span className="text-xl font-bold leading-none text-[#4285F4]">G</span>
                  </span>
                  <span>
                    <span className="block text-base font-semibold text-[var(--ink)]">
                      Continue with Google
                    </span>
                    <span className="mt-1 block text-xs text-[var(--muted)]">
                      Secure redirect only when Google takes over the final handoff.
                    </span>
                  </span>
                </span>
                <MoveRight className="h-4 w-4 text-[var(--muted)]" />
              </button>
            </form>
          ) : (
            <div className="rounded-[1.7rem] border border-[rgba(25,35,61,0.08)] bg-white/92 px-5 py-5 shadow-[0_12px_30px_rgba(21,32,58,0.04)]">
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--soft)]">
                  <span className="text-xl font-bold leading-none text-[#4285F4]">G</span>
                </span>
                <div className="min-w-0">
                  <p className="text-base font-semibold text-[var(--ink)]">Google sign-in unavailable</p>
                  <p className="mt-1 text-sm leading-7 text-[var(--muted)]">
                    Add {missingGoogleEnv.length > 0 ? missingGoogleEnv.join(", ") : "the Google OAuth values"} for{" "}
                    <span className="font-medium text-[var(--ink)]">{deploymentOrigin}</span>.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="rounded-[1.8rem] border border-[rgba(25,35,61,0.08)] bg-[linear-gradient(180deg,_rgba(255,255,255,0.98),_rgba(246,248,255,0.94))] p-5 shadow-[0_18px_38px_rgba(21,32,58,0.05)]">
            <div className="flex items-start gap-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--soft)] text-[var(--brand)]">
                <Mail className="h-5 w-5" />
              </span>
              <div>
                <p className="text-base font-semibold text-[var(--ink)]">Continue with email</p>
                <p className="mt-1 text-sm leading-7 text-[var(--muted)]">
                  {showEmailVerification
                    ? `Enter the 6-digit code sent to ${emailAddress || "your inbox"} to finish signing in.`
                    : "Use a one-time code and keep the whole flow inside this modal."}
                </p>
              </div>
            </div>

            {showEmailVerification ? (
              <div className="mt-5 space-y-4">
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
                      <span className="block text-base font-semibold">Continue with email</span>
                      <span className="mt-1 block text-xs text-white/80">
                        We&apos;ll send you back to {getDestinationLabel(callbackUrl)}.
                      </span>
                    </span>
                    <MoveRight className="h-4 w-4 text-white/80" />
                  </button>
                </form>

                <div className="flex flex-wrap items-center gap-3 text-sm">
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
                  <Link
                    href={resetEmailHref}
                    className="rounded-full border border-transparent px-2 py-2 font-medium text-[var(--muted)] transition hover:text-[var(--ink)]"
                  >
                    Use a different email
                  </Link>
                </div>
              </div>
            ) : (
              <form action={requestEmailSignIn} className="mt-5 space-y-4">
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
                    placeholder="you@example.com"
                    disabled={!isEmailConfigured}
                    className="h-12 w-full rounded-2xl border border-[rgba(25,35,61,0.1)] px-4 text-base text-[var(--ink)] outline-none transition focus:border-[rgba(82,103,217,0.4)] focus:ring-4 focus:ring-[rgba(82,103,217,0.12)] disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                  />
                </label>
                <button
                  type="submit"
                  disabled={!isEmailConfigured}
                  className="flex w-full items-center justify-between rounded-2xl border border-[rgba(25,35,61,0.1)] bg-white px-5 py-4 text-left shadow-[0_12px_30px_rgba(21,32,58,0.04)] transition hover:border-[rgba(82,103,217,0.24)] hover:shadow-[0_16px_34px_rgba(21,32,58,0.06)] disabled:cursor-not-allowed disabled:opacity-75"
                >
                  <span>
                    <span className="block text-base font-semibold text-[var(--ink)]">
                      Send sign-in code
                    </span>
                    <span className="mt-1 block text-xs text-[var(--muted)]">
                      {isEmailConfigured
                        ? "We will email you a 6-digit code without leaving this page."
                        : `Add ${missingEmailEnv.length > 0 ? missingEmailEnv.join(", ") : "the email auth values"} to enable this.`}
                    </span>
                  </span>
                  <MoveRight className="h-4 w-4 text-[var(--muted)]" />
                </button>
              </form>
            )}

            {emailAuthUsesConsoleFallback ? (
              <p className="mt-4 rounded-2xl bg-[var(--soft)] px-4 py-3 text-xs leading-6 text-[var(--muted)]">
                Local development mode is active, so sign-in codes are printed to the server console
                until you add a real email sender.
              </p>
            ) : null}
          </div>

          <div className="rounded-[1.8rem] border border-[rgba(25,35,61,0.08)] bg-white p-5 shadow-[0_14px_34px_rgba(21,32,58,0.04)]">
            <div className="flex items-start gap-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--soft)] text-[var(--brand)]">
                <KeyRound className="h-5 w-5" />
              </span>
              <div>
                <p className="text-base font-semibold text-[var(--ink)]">Temporary access</p>
                <p className="mt-1 text-sm leading-7 text-[var(--muted)]">
                  {isTemporaryAccessAvailable
                    ? "Use a short-term ID and password while the primary sign-in flow is still being finalized."
                    : temporaryAccessConfigured
                      ? "Temporary credentials exist, but production fallback access stays locked until AUTH_TEMP_LOGIN_ENABLED=true."
                      : "Add temporary credentials if you need a short-term fallback for demos or review."}
                </p>
              </div>
            </div>

            <form action={signInWithTemporaryAccess} className="mt-5 space-y-4">
              <ModalAuthContextFields callbackUrl={callbackUrl} originPath={originPath} />
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                    Temporary ID
                  </span>
                  <input
                    name="loginId"
                    type="text"
                    autoComplete="username"
                    placeholder="temp-admin"
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
              </div>

              <button
                type="submit"
                disabled={!isTemporaryAccessAvailable}
                className="flex w-full items-center justify-between rounded-2xl border border-[rgba(25,35,61,0.1)] bg-white px-5 py-4 text-left shadow-[0_12px_30px_rgba(21,32,58,0.04)] transition hover:border-[rgba(82,103,217,0.24)] hover:shadow-[0_16px_34px_rgba(21,32,58,0.06)] disabled:cursor-not-allowed disabled:opacity-75"
              >
                <span>
                  <span className="block text-base font-semibold text-[var(--ink)]">
                    Continue with temporary access
                  </span>
                  <span className="mt-1 block text-xs text-[var(--muted)]">
                    {isTemporaryAccessAvailable
                      ? `We will take you back to ${getDestinationLabel(callbackUrl)}.`
                      : "Temporary access is unavailable until the matching environment variables are ready."}
                  </span>
                </span>
                <MoveRight className="h-4 w-4 text-[var(--muted)]" />
              </button>
            </form>
          </div>
        </div>

        <p className="mt-6 text-sm leading-7 text-[var(--muted)]">
          {hasAnySignInMethod
            ? "By continuing, you agree to DigiCard's Terms of Use and Privacy Policy."
            : "Once the auth values are in place, this modal switches from setup state to working sign-in actions immediately."}
        </p>
      </div>

      <div className="relative hidden overflow-hidden bg-[linear-gradient(180deg,_#172340_0%,_#243967_38%,_#5267d9_100%)] p-8 text-white md:flex md:flex-col md:justify-between">
        <div className="absolute left-8 top-8 h-36 w-36 rounded-full bg-[rgba(255,255,255,0.12)] blur-3xl" />
        <div className="absolute bottom-10 right-10 h-40 w-40 rounded-full bg-[rgba(255,141,87,0.18)] blur-3xl" />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/78">
            <ScanLine className="h-3.5 w-3.5" />
            Smooth auth flow
          </div>

          <h3 className="mt-5 max-w-xs text-[2rem] font-semibold leading-[1.02] tracking-[-0.05em]">
            Stay in context while you sign in.
          </h3>
          <p className="mt-4 max-w-xs text-sm leading-7 text-white/74">
            DigiCard now keeps the first step of authentication inside the landing experience,
            then hands off securely only when your provider needs it.
          </p>
        </div>

        <div className="relative z-10 mt-8 space-y-4">
          <div className="rounded-[1.8rem] border border-white/12 bg-white/10 p-4 backdrop-blur">
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/12">
                <UserRound className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Modern sign-in handoff</p>
                <p className="mt-1 text-sm leading-6 text-white/72">
                  Open auth in a modal, keep the page visible, and reduce the feeling of being sent somewhere else.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[1.8rem] border border-white/12 bg-[linear-gradient(180deg,_rgba(255,255,255,0.12),_rgba(255,255,255,0.08))] p-4 backdrop-blur">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">
                <CreditCard className="h-3.5 w-3.5" />
                DigiCard auth
              </div>
              <ShieldCheck className="h-4 w-4 text-white/70" />
            </div>

            <div className="mt-5 space-y-3">
              {visualBullets.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl bg-black/10 px-3 py-3">
                  <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-white/12">
                    <CheckCircle2 className="h-3.5 w-3.5 text-white" />
                  </div>
                  <p className="text-sm leading-6 text-white/78">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.8rem] border border-white/12 bg-white/10 p-4 backdrop-blur">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/12">
                <GraduationCap className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Built for event-ready sharing</p>
                <p className="mt-1 text-sm leading-6 text-white/72">
                  Sign in, update your card, and head right back to the workspace without breaking momentum.
                </p>
              </div>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 text-sm font-semibold text-white/80">
            Powered for {siteConfig.name}
            <BriefcaseBusiness className="h-4 w-4" />
          </div>
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";
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
} from "./actions";
import {
  ArrowLeft,
  CreditCard,
  GraduationCap,
  KeyRound,
  Link2,
  Mail,
  MoveRight,
  QrCode,
  ScanLine,
  UserRound,
} from "lucide-react";

const previewItems = ["LinkedIn", "Portfolio", "Resume", "Email"];
const comingSoonOptions = [{ label: "Continue with LinkedIn", icon: Link2 }] as const;

type LoginPageProps = {
  searchParams?: Promise<{
    callbackUrl?: string;
    email?: string;
    error?: string;
    method?: string;
    notice?: string;
    step?: string;
  }>;
};

function getSafeCallbackUrl(value?: string) {
  return value && value.startsWith("/") ? value : "/dashboard";
}

function getDestinationLabel(callbackUrl: string) {
  if (callbackUrl === "/dashboard") return "your dashboard";
  if (callbackUrl.startsWith("/cards")) return "your saved cards";
  if (callbackUrl.startsWith("/create-card")) return "the create-card flow";
  if (callbackUrl.startsWith("/settings")) return "settings";
  if (callbackUrl.startsWith("/templates")) return "template selection";
  return "your workspace";
}

function getLoginErrorMessage(error?: string) {
  switch (error) {
    case "AccessDenied":
      return "Google sign-in was canceled before it finished. Please try again.";
    case "Configuration":
    case "GoogleOAuthNotConfigured":
      return "Google sign-in is not configured for this deployment yet.";
    case "EmailInvalid":
      return "Enter a valid email address to continue.";
    case "EmailSigninUnavailable":
      return "Email sign-in is not configured for this deployment yet.";
    case "EmailSendFailed":
      return "We could not send your sign-in code. Please try again.";
    case "EmailCodeRequired":
      return "Enter the 6-digit code we sent to your email.";
    case "EmailCodeInvalid":
      return "That code did not match. Please try again.";
    case "EmailCodeExpired":
      return "That code expired. Request a new one and try again.";
    case "EmailSigninFailed":
      return "We could not finish email sign-in. Please try again.";
    case "TempCredentialsRequired":
      return "Enter the temporary ID and password to continue.";
    case "TempCredentialsUnavailable":
      return "Temporary access is not configured for this deployment yet.";
    case "TempCredentialsInvalid":
      return "That temporary ID or password was not correct.";
    default:
      return error ? "We couldn't complete sign-in. Please try again." : null;
  }
}

function getLoginNoticeMessage(notice?: string) {
  switch (notice) {
    case "EmailCodeSent":
      return "A 6-digit sign-in code is ready for you.";
    default:
      return null;
  }
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const resolvedSearchParams = (await searchParams) ?? {};
  const callbackUrl = getSafeCallbackUrl(resolvedSearchParams.callbackUrl);
  const emailAddress = resolvedSearchParams.email ?? "";
  const loginErrorMessage = getLoginErrorMessage(resolvedSearchParams.error);
  const loginNoticeMessage = getLoginNoticeMessage(resolvedSearchParams.notice);
  const isGoogleConfigured = googleAuthEnabled;
  const isEmailConfigured = emailAuthEnabled;
  const isTemporaryAccessConfigured = temporaryAccessConfigured;
  const isTemporaryAccessAvailable = temporaryAccessEnabled;
  const hasAnySignInMethod =
    isGoogleConfigured || isEmailConfigured || isTemporaryAccessAvailable;
  const showEmailVerification =
    resolvedSearchParams.method === "email" && resolvedSearchParams.step === "verify";
  const badgeLabel = hasAnySignInMethod ? "Welcome back" : "Setup needed";
  const title = hasAnySignInMethod ? "Log in or sign up in seconds." : "Sign-in is not configured yet.";
  const description = hasAnySignInMethod
    ? "Sign in to manage your DigiCard, refresh your profile, and stay ready for the next career fair, meetup, or campus event."
    : "This deployment is ready for sign-in, but it still needs authentication environment variables before anyone can log in.";
  const googleSupportCopy = isGoogleConfigured
    ? `We will take you back to ${getDestinationLabel(callbackUrl)} after sign-in.`
    : "Add the Google OAuth credentials for this deployment to turn on Google sign-in.";
  const emailSupportCopy = showEmailVerification
    ? `Enter the code sent to ${emailAddress || "your inbox"} to finish signing in.`
    : "Use a one-time code instead of a social login.";
  const temporaryAccessCopy = isTemporaryAccessAvailable
    ? "Use a temporary ID and password until the main sign-in flow is fully ready."
    : isTemporaryAccessConfigured
      ? "Temporary credentials are configured, but production fallback access stays locked until AUTH_TEMP_LOGIN_ENABLED is set to true."
      : "Add temporary credentials and explicitly enable them if you need a short-term fallback login.";
  const secondaryPanelTitle = hasAnySignInMethod ? "Why sign in?" : "What still needs to be connected";
  const secondaryPanelBody = hasAnySignInMethod
    ? "Save your profile, update your resume link anytime, and make sure your card is always ready before an important event."
    : "Add AUTH_SECRET plus Google OAuth credentials, email-delivery variables, or explicitly enabled temporary access to turn on sign-in.";

  return (
    <main className="min-h-screen bg-[var(--canvas)] text-[var(--ink)]">
      <div className="mx-auto grid min-h-screen max-w-[1600px] lg:grid-cols-[minmax(420px,540px)_1fr]">
        <section className="flex min-h-screen flex-col justify-between border-b border-[rgba(25,35,61,0.06)] bg-white px-6 py-6 sm:px-10 lg:border-b-0 lg:border-r lg:px-12 lg:py-10">
          <div>
            <div className="flex items-center justify-between gap-4">
              <Link href="/" className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,_#172340,_#5267d9)] shadow-[0_16px_30px_rgba(82,103,217,0.18)]">
                  <CreditCard className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-lg font-semibold tracking-tight text-[var(--ink)]">DigiCard</p>
                  <p className="text-xs font-medium text-[var(--muted)]">Student-first networking cards</p>
                </div>
              </Link>

              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-full border border-[rgba(25,35,61,0.08)] px-4 py-2 text-sm font-medium text-[var(--muted)] transition hover:border-[rgba(82,103,217,0.18)] hover:text-[var(--ink)]"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Link>
            </div>

            <div className="mt-14 max-w-md">
              <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(82,103,217,0.12)] bg-[var(--soft)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand)]">
                <GraduationCap className="h-4 w-4" />
                {badgeLabel}
              </div>

              <h1 className="mt-6 text-4xl font-semibold tracking-[-0.05em] text-[var(--ink)] sm:text-5xl">
                {title}
              </h1>
              <p className="mt-5 text-lg leading-8 text-[var(--muted)]">
                {description}
              </p>

              <div className="mt-10 space-y-4">
                {loginErrorMessage ? (
                  <div className="rounded-2xl border border-[rgba(199,68,92,0.18)] bg-[rgba(255,238,242,0.92)] px-5 py-4 text-sm font-medium text-[#8a2a43]">
                    {loginErrorMessage}
                  </div>
                ) : null}
                {loginNoticeMessage ? (
                  <div className="rounded-2xl border border-[rgba(37,99,235,0.14)] bg-[rgba(239,246,255,0.96)] px-5 py-4 text-sm font-medium text-[#1d4ed8]">
                    {loginNoticeMessage}
                  </div>
                ) : null}
                {devAuthBypassEnabled ? (
                  <div className="rounded-[1.7rem] border border-[rgba(16,185,129,0.16)] bg-[rgba(236,253,245,0.9)] px-5 py-5 shadow-[0_12px_30px_rgba(16,185,129,0.08)]">
                    <p className="text-sm font-semibold text-[#065f46]">Local preview mode is on</p>
                    <p className="mt-2 text-sm leading-7 text-[#0f766e]">
                      Protected pages are temporarily unlocked in development so you can inspect the product while sign-in is still being fixed.
                    </p>
                    <Link
                      href={callbackUrl}
                      className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#059669] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#047857]"
                    >
                      Open preview
                      <MoveRight className="h-4 w-4" />
                    </Link>
                  </div>
                ) : null}

                <div className="rounded-[1.7rem] border border-[rgba(25,35,61,0.08)] bg-white px-5 py-5 shadow-[0_12px_30px_rgba(21,32,58,0.04)]">
                  <div className="flex items-start gap-4">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--soft)] text-[var(--brand)]">
                      <KeyRound className="h-5 w-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-base font-semibold text-[var(--ink)]">Temporary access</p>
                      <p className="mt-1 text-xs text-[var(--muted)]">{temporaryAccessCopy}</p>
                    </div>
                  </div>

                  <form action={signInWithTemporaryAccess} className="mt-5 space-y-4">
                    <input type="hidden" name="callbackUrl" value={callbackUrl} />
                    <div className="space-y-2">
                      <label
                        htmlFor="temp-login-id"
                        className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]"
                      >
                        Temporary ID
                      </label>
                      <input
                        id="temp-login-id"
                        name="loginId"
                        type="text"
                        autoComplete="username"
                        placeholder="temp-admin"
                        disabled={!isTemporaryAccessAvailable}
                        className="h-12 w-full rounded-2xl border border-[rgba(25,35,61,0.1)] px-4 text-base text-[var(--ink)] outline-none transition focus:border-[rgba(82,103,217,0.4)] focus:ring-4 focus:ring-[rgba(82,103,217,0.12)] disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="temp-login-password"
                        className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]"
                      >
                        Password
                      </label>
                      <input
                        id="temp-login-password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        placeholder="Temporary password"
                        disabled={!isTemporaryAccessAvailable}
                        className="h-12 w-full rounded-2xl border border-[rgba(25,35,61,0.1)] px-4 text-base text-[var(--ink)] outline-none transition focus:border-[rgba(82,103,217,0.4)] focus:ring-4 focus:ring-[rgba(82,103,217,0.12)] disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                      />
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
                            : isTemporaryAccessConfigured
                              ? "Temporary access is intentionally disabled in production until AUTH_TEMP_LOGIN_ENABLED=true."
                              : "Temporary access is disabled until the matching environment variables are added."}
                        </span>
                      </span>
                      <MoveRight className="h-4 w-4 text-[var(--muted)]" />
                    </button>
                  </form>
                </div>

                {isGoogleConfigured ? (
                  <form action={signInWithGoogle}>
                    <input type="hidden" name="callbackUrl" value={callbackUrl} />
                    <button
                      type="submit"
                      className="flex w-full items-center justify-between rounded-2xl border border-[rgba(25,35,61,0.1)] bg-white px-5 py-4 text-left shadow-[0_12px_30px_rgba(21,32,58,0.04)] transition hover:border-[rgba(82,103,217,0.24)] hover:shadow-[0_16px_34px_rgba(21,32,58,0.06)]"
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
                            {googleSupportCopy}
                          </span>
                        </span>
                      </span>
                      <MoveRight className="h-4 w-4 text-[var(--muted)]" />
                    </button>
                  </form>
                ) : (
                  <button
                    type="button"
                    disabled
                    className="flex w-full cursor-not-allowed items-center justify-between rounded-2xl border border-[rgba(25,35,61,0.08)] bg-white/80 px-5 py-4 text-left opacity-80 shadow-[0_12px_30px_rgba(21,32,58,0.04)]"
                  >
                    <span className="flex items-center gap-4">
                      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--soft)]">
                        <span className="text-xl font-bold leading-none text-[#4285F4]">G</span>
                      </span>
                      <span>
                        <span className="block text-base font-semibold text-[var(--ink)]">
                          Google sign-in unavailable
                        </span>
                        <span className="mt-1 block text-xs text-[var(--muted)]">
                          {googleSupportCopy}
                        </span>
                      </span>
                    </span>
                  </button>
                )}

                <div className="rounded-[1.7rem] border border-[rgba(25,35,61,0.08)] bg-white px-5 py-5 shadow-[0_12px_30px_rgba(21,32,58,0.04)]">
                  <div className="flex items-start gap-4">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--soft)] text-[var(--brand)]">
                      <Mail className="h-5 w-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-base font-semibold text-[var(--ink)]">Continue with email</p>
                      <p className="mt-1 text-xs text-[var(--muted)]">{emailSupportCopy}</p>
                    </div>
                  </div>

                  {showEmailVerification ? (
                    <div className="mt-5 space-y-4">
                      <form action={verifyEmailSignIn} className="space-y-4">
                        <input type="hidden" name="callbackUrl" value={callbackUrl} />
                        <input type="hidden" name="email" value={emailAddress} />
                        <div className="space-y-2">
                          <label
                            htmlFor="email-code"
                            className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]"
                          >
                            Verification code
                          </label>
                          <input
                            id="email-code"
                            name="code"
                            type="text"
                            inputMode="numeric"
                            autoComplete="one-time-code"
                            maxLength={6}
                            placeholder="123456"
                            className="h-12 w-full rounded-2xl border border-[rgba(25,35,61,0.1)] px-4 text-base tracking-[0.32em] text-[var(--ink)] outline-none transition focus:border-[rgba(82,103,217,0.4)] focus:ring-4 focus:ring-[rgba(82,103,217,0.12)]"
                          />
                        </div>
                        <button
                          type="submit"
                          className="flex w-full items-center justify-between rounded-2xl bg-[var(--brand)] px-5 py-4 text-left text-white shadow-[0_16px_34px_rgba(82,103,217,0.18)] transition hover:bg-[#4459cb]"
                        >
                          <span>
                            <span className="block text-base font-semibold">Continue with email</span>
                            <span className="mt-1 block text-xs text-white/80">
                              We will take you back to {getDestinationLabel(callbackUrl)}.
                            </span>
                          </span>
                          <MoveRight className="h-4 w-4 text-white/80" />
                        </button>
                      </form>

                      <div className="flex flex-wrap items-center gap-3 text-sm">
                        <form action={requestEmailSignIn}>
                          <input type="hidden" name="callbackUrl" value={callbackUrl} />
                          <input type="hidden" name="email" value={emailAddress} />
                          <button
                            type="submit"
                            className="rounded-full border border-[rgba(25,35,61,0.12)] px-4 py-2 font-medium text-[var(--ink)] transition hover:border-[rgba(82,103,217,0.22)] hover:bg-[var(--soft)]"
                          >
                            Resend code
                          </button>
                        </form>
                        <Link
                          href={`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`}
                          className="rounded-full border border-transparent px-2 py-2 font-medium text-[var(--muted)] transition hover:text-[var(--ink)]"
                        >
                          Use a different email
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <form action={requestEmailSignIn} className="mt-5 space-y-4">
                      <input type="hidden" name="callbackUrl" value={callbackUrl} />
                      <div className="space-y-2">
                        <label
                          htmlFor="email-address"
                          className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]"
                        >
                          Email address
                        </label>
                        <input
                          id="email-address"
                          name="email"
                          type="email"
                          defaultValue={emailAddress}
                          autoComplete="email"
                          placeholder="you@example.com"
                          disabled={!isEmailConfigured}
                          className="h-12 w-full rounded-2xl border border-[rgba(25,35,61,0.1)] px-4 text-base text-[var(--ink)] outline-none transition focus:border-[rgba(82,103,217,0.4)] focus:ring-4 focus:ring-[rgba(82,103,217,0.12)] disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                        />
                      </div>
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
                              ? "We will email you a 6-digit code."
                              : "Add the email auth environment variables to enable this option."}
                          </span>
                        </span>
                        <MoveRight className="h-4 w-4 text-[var(--muted)]" />
                      </button>
                    </form>
                  )}

                  {emailAuthUsesConsoleFallback ? (
                    <p className="mt-4 rounded-2xl bg-[var(--soft)] px-4 py-3 text-xs leading-6 text-[var(--muted)]">
                      Local development mode is active, so sign-in codes are printed to the server console until you add a real email sender.
                    </p>
                  ) : null}
                </div>

                {isGoogleConfigured
                  ? comingSoonOptions.map(({ label, icon: Icon }) => (
                      <button
                        key={label}
                        type="button"
                        disabled
                        className="flex w-full items-center justify-between rounded-2xl border border-[rgba(25,35,61,0.08)] bg-white/70 px-5 py-4 text-left opacity-75"
                      >
                        <span className="flex items-center gap-4">
                          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--soft)] text-[var(--brand)]">
                            <Icon className="h-5 w-5" />
                          </span>
                          <span>
                            <span className="block text-base font-semibold text-[var(--ink)]">{label}</span>
                            <span className="block text-xs text-[var(--muted)]">Coming soon</span>
                          </span>
                        </span>
                      </button>
                    ))
                  : null}
              </div>

              <p className="mt-8 text-sm leading-7 text-[var(--muted)]">
                {hasAnySignInMethod
                  ? "By continuing, you agree to DigiCard&apos;s Terms of Use and Privacy Policy."
                  : "Once those values are in place, this page will immediately switch from setup mode to working sign-in actions."}
              </p>

              <div className="mt-10 rounded-[1.6rem] border border-[rgba(25,35,61,0.08)] bg-[var(--soft)] p-5">
                <p className="text-sm font-semibold text-[var(--ink)]">{secondaryPanelTitle}</p>
                <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
                  {secondaryPanelBody}
                </p>
                {!hasAnySignInMethod ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {[
                      "AUTH_SECRET",
                      "AUTH_TEMP_LOGIN_ID",
                      "AUTH_TEMP_LOGIN_PASSWORD",
                      "AUTH_TEMP_LOGIN_ENABLED",
                      "AUTH_GOOGLE_ID",
                      "AUTH_GOOGLE_SECRET",
                      "AUTH_EMAIL_FROM",
                      "AUTH_RESEND_API_KEY",
                    ].map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-[rgba(82,103,217,0.14)] bg-white px-3 py-1.5 text-xs font-semibold tracking-[0.08em] text-[var(--brand)]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          <p className="mt-12 text-sm text-[var(--muted)]">Built for students, grads, and early professionals.</p>
        </section>

        <section className="relative hidden overflow-hidden bg-[linear-gradient(180deg,_#f6f8ff_0%,_#eef2ff_100%)] lg:flex lg:min-h-screen lg:items-center lg:justify-center lg:px-12 xl:px-20">
          <div className="absolute left-12 top-12 h-40 w-40 rounded-full bg-[rgba(82,103,217,0.18)] blur-3xl" />
          <div className="absolute bottom-12 right-16 h-48 w-48 rounded-full bg-[rgba(255,141,87,0.16)] blur-3xl" />

          <div className="relative w-full max-w-3xl">
            <div className="rounded-[2.4rem] border border-[rgba(25,35,61,0.08)] bg-[linear-gradient(180deg,_rgba(255,255,255,0.88),_rgba(245,248,255,0.96))] p-6 shadow-[0_30px_80px_rgba(18,31,66,0.14)]">
              <div className="rounded-[2rem] border border-[rgba(25,35,61,0.08)] bg-white p-6 xl:p-8">
                <div className="grid gap-5 xl:grid-cols-[0.82fr_1.18fr]">
                  <div className="rounded-[1.7rem] bg-[linear-gradient(165deg,_#172340_0%,_#2d4177_44%,_#5267d9_100%)] p-6 text-white shadow-[0_20px_40px_rgba(49,69,127,0.22)]">
                    <div className="flex items-center justify-between">
                      <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/78">
                        <UserRound className="h-3.5 w-3.5" />
                        Active card
                      </div>
                      <ScanLine className="h-4 w-4 text-white/72" />
                    </div>

                    <div className="mt-10">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/14">
                        <GraduationCap className="h-7 w-7 text-white" />
                      </div>
                      <h2 className="mt-5 text-2xl font-semibold tracking-[-0.04em]">Jordan Lee</h2>
                      <p className="mt-1 text-sm text-white/74">Computer Science Student</p>
                      <p className="mt-1 text-sm text-white/68">University of Maryland</p>
                    </div>

                    <div className="mt-8 rounded-[1.4rem] border border-white/12 bg-white/8 p-4">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/62">
                        Quick scan
                      </p>
                      <div className="mt-3 flex items-center gap-4">
                        <div className="rounded-2xl bg-white p-3">
                          <QrCode className="h-16 w-16 text-[#172340]" />
                        </div>
                        <p className="max-w-[9rem] text-sm leading-6 text-white/74">
                          Ready for career fairs and campus events.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-5">
                    <div className="rounded-[1.6rem] border border-[rgba(25,35,61,0.08)] bg-[var(--soft)] p-5">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                        Signed-in benefits
                      </p>
                      <h3 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-[var(--ink)]">
                        Keep your profile polished and event-ready.
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                        Update your resume, refresh your links, and open your DigiCard quickly whenever a new opportunity shows up.
                      </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      {previewItems.map((item) => (
                        <div
                          key={item}
                          className="rounded-[1.35rem] border border-[rgba(25,35,61,0.08)] bg-white px-5 py-5 shadow-[0_12px_28px_rgba(21,32,58,0.04)]"
                        >
                          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                            Included
                          </p>
                          <p className="mt-2 text-base font-semibold text-[var(--ink)]">{item}</p>
                        </div>
                      ))}
                    </div>

                    <div className="rounded-[1.6rem] border border-[rgba(25,35,61,0.08)] bg-white p-5 shadow-[0_12px_28px_rgba(21,32,58,0.04)]">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                        Student-first use
                      </p>
                      <p className="mt-3 text-lg font-semibold tracking-[-0.03em] text-[var(--ink)]">
                        Better for recruiters, alumni, mentors, and speakers who want your profile right away.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

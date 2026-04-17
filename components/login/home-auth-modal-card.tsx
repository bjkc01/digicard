"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Mail, Sparkles } from "lucide-react";
import {
  requestEmailSignIn,
  signInWithGoogle,
  verifyEmailSignIn,
} from "@/app/login/actions";
import { cn } from "@/lib/utils";

export type AuthModalPanel = "choices" | "email" | "verify";

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
          "border-red-500/20 bg-red-500/10 text-red-300",
        tone === "success" &&
          "border-green-500/20 bg-green-500/10 text-green-300",
        tone === "neutral" &&
          "border-white/10 bg-white/[0.06] text-white/70",
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
        "flex items-center justify-between gap-3 rounded-[1.3rem] border border-white/10 bg-white/[0.06] px-3.5 py-3 backdrop-blur-sm transition",
        disabled
          ? "cursor-not-allowed opacity-50"
          : "hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.10]",
      )}
    >
      <span className="flex min-w-0 items-center gap-3">
        <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-white/[0.08]">
          {icon}
        </span>
        <span className="min-w-0">
          <span className="block text-left text-[0.98rem] font-semibold text-white">{title}</span>
          <span className="mt-1 block text-left text-xs leading-5 text-white/50">{description}</span>
        </span>
      </span>
      <span className="flex-shrink-0 text-white/40">{trailing}</span>
    </div>
  );
}

const beamDelay = [0, 0.6, 1.2, 1.8] as const;

function TravelingBeams() {
  return (
    <div className="pointer-events-none absolute -inset-px overflow-hidden rounded-[2rem]">
      {/* Top */}
      <motion.div
        className="absolute top-0 left-0 h-[2px] w-[45%] bg-gradient-to-r from-transparent via-white to-transparent"
        animate={{ left: ["-45%", "100%"] }}
        transition={{ duration: 2.6, ease: "easeInOut", repeat: Infinity, repeatDelay: 1, delay: beamDelay[0] }}
      />
      {/* Right */}
      <motion.div
        className="absolute top-0 right-0 h-[45%] w-[2px] bg-gradient-to-b from-transparent via-white to-transparent"
        animate={{ top: ["-45%", "100%"] }}
        transition={{ duration: 2.6, ease: "easeInOut", repeat: Infinity, repeatDelay: 1, delay: beamDelay[1] }}
      />
      {/* Bottom */}
      <motion.div
        className="absolute bottom-0 right-0 h-[2px] w-[45%] bg-gradient-to-r from-transparent via-white to-transparent"
        animate={{ right: ["-45%", "100%"] }}
        transition={{ duration: 2.6, ease: "easeInOut", repeat: Infinity, repeatDelay: 1, delay: beamDelay[2] }}
      />
      {/* Left */}
      <motion.div
        className="absolute bottom-0 left-0 h-[45%] w-[2px] bg-gradient-to-b from-transparent via-white to-transparent"
        animate={{ bottom: ["-45%", "100%"] }}
        transition={{ duration: 2.6, ease: "easeInOut", repeat: Infinity, repeatDelay: 1, delay: beamDelay[3] }}
      />
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

  const showChoiceError =
    isChoicesPanel && Boolean(errorMessage) && !errorCode?.startsWith("Email");
  const showEmailError =
    (isEmailPanel || isVerifyPanel) && Boolean(errorMessage) && errorCode?.startsWith("Email");
  const showVerifyNotice =
    isVerifyPanel && Boolean(noticeMessage) && noticeCode === "EmailCodeSent";

  return (
    <div className="w-[min(calc(100vw-2rem),26rem)]">
      <div className="relative rounded-[2rem] border border-white/[0.12] bg-[rgba(13,21,40,0.82)] p-6 shadow-[0_32px_80px_rgba(0,0,0,0.5)] backdrop-blur-xl sm:p-7">
        <TravelingBeams />

        {/* Header */}
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7b97ff]">
            <Sparkles className="h-3 w-3" />
            {hasAnySignInMethod ? "Welcome" : "Setup needed"}
          </div>

          {isChoicesPanel && (
            <div className="mt-4">
              <h2 className="text-[1.6rem] font-semibold leading-[1.06] tracking-[-0.05em] text-white">
                Log in or sign up in seconds
              </h2>
              <p className="mt-2 max-w-[22rem] text-sm leading-6 text-white/50">
                Continue to {destinationLabel} without leaving the page.
              </p>
            </div>
          )}

          {isEmailPanel && (
            <div className="mt-4">
              <button
                type="button"
                onClick={() => setPanel("choices")}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white/50 transition hover:border-white/20 hover:text-white"
              >
                <ArrowLeft className="h-3 w-3" />
                Back
              </button>
              <h2 className="mt-3 text-[1.5rem] font-semibold leading-[1.06] tracking-[-0.05em] text-white">
                Continue with email
              </h2>
              <p className="mt-1.5 max-w-[22rem] text-sm leading-6 text-white/50">
                Enter your email and we&apos;ll send a secure sign-in code.
              </p>
            </div>
          )}

          {isVerifyPanel && (
            <div className="mt-4">
              <button
                type="button"
                onClick={() => setPanel("email")}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white/50 transition hover:border-white/20 hover:text-white"
              >
                <ArrowLeft className="h-3 w-3" />
                Back
              </button>
              <h2 className="mt-3 text-[1.5rem] font-semibold leading-[1.06] tracking-[-0.05em] text-white">
                Check your email
              </h2>
              <p className="mt-1.5 max-w-[22rem] text-sm leading-6 text-white/50">
                Enter the 6-digit code sent to{" "}
                <span className="font-semibold text-white">{emailAddress}</span>.
              </p>
            </div>
          )}

          <div className="mt-4 space-y-3">
            {showChoiceError && errorMessage ? <StatusMessage message={errorMessage} tone="error" /> : null}
            {showEmailError && errorMessage ? <StatusMessage message={errorMessage} tone="error" /> : null}
            {showVerifyNotice && noticeMessage ? <StatusMessage message={noticeMessage} tone="success" /> : null}
          </div>
        </div>

        {/* Panels */}
        <div className="mt-4">
          {isChoicesPanel && (
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
                    icon={<Mail className="h-5 w-5 text-[#7b97ff]" />}
                    trailing={<ArrowRight className="h-4 w-4" />}
                  />
                </button>
              ) : (
                <ActionSurface
                  disabled
                  title="Continue with email"
                  description="Email sign-in is not available on this deployment yet."
                  icon={<Mail className="h-5 w-5 text-[#7b97ff]" />}
                />
              )}

              {!hasAnySignInMethod && (
                <StatusMessage
                  message="Sign-in methods are still being configured for this deployment."
                  tone="neutral"
                />
              )}
            </div>
          )}

          {isEmailPanel && (
            <div className="rounded-[1.4rem] border border-white/[0.08] bg-white/[0.04] p-4 sm:p-5">
              <form action={requestEmailSignIn} className="space-y-4">
                <ModalAuthContextFields callbackUrl={callbackUrl} originPath={originPath} />
                <label className="block space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40">
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
                    className="h-12 w-full rounded-2xl border border-white/10 bg-white/[0.06] px-4 text-base text-white placeholder:text-white/30 outline-none transition focus:border-[#7b97ff]/40 focus:ring-4 focus:ring-[#7b97ff]/10 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </label>
                <button
                  type="submit"
                  disabled={!isEmailConfigured}
                  className="flex w-full items-center justify-between rounded-2xl bg-[#5267d9] px-5 py-4 text-left text-white shadow-[0_16px_34px_rgba(82,103,217,0.25)] transition hover:bg-[#4459cb] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <span>
                    <span className="block text-base font-semibold">Send sign-in code</span>
                    <span className="mt-1 block text-xs text-white/70">
                      {isEmailConfigured
                        ? "We'll email you a 6-digit code right away."
                        : "Email sign-in will appear here once configured."}
                    </span>
                  </span>
                  <ArrowRight className="h-4 w-4 text-white/80" />
                </button>
              </form>
              {emailAuthUsesConsoleFallback && (
                <p className="mt-4 text-xs leading-6 text-white/40">
                  Local development mode — codes print to the server console.
                </p>
              )}
            </div>
          )}

          {isVerifyPanel && (
            <div className="rounded-[1.4rem] border border-white/[0.08] bg-white/[0.04] p-4 sm:p-5">
              <form action={verifyEmailSignIn} className="space-y-4">
                <ModalAuthContextFields callbackUrl={callbackUrl} originPath={originPath} />
                <input type="hidden" name="email" value={emailAddress} />
                <label className="block space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40">
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
                    className="h-12 w-full rounded-2xl border border-white/10 bg-white/[0.06] px-4 text-base tracking-[0.28em] text-white placeholder:text-white/30 outline-none transition focus:border-[#7b97ff]/40 focus:ring-4 focus:ring-[#7b97ff]/10"
                  />
                </label>
                <button
                  type="submit"
                  className="flex w-full items-center justify-between rounded-2xl bg-[#5267d9] px-5 py-4 text-left text-white shadow-[0_16px_34px_rgba(82,103,217,0.25)] transition hover:bg-[#4459cb]"
                >
                  <span>
                    <span className="block text-base font-semibold">Verify and continue</span>
                    <span className="mt-1 block text-xs text-white/70">
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
                    className="rounded-full border border-white/10 px-4 py-2 font-medium text-white/60 transition hover:border-white/20 hover:text-white"
                  >
                    Resend code
                  </button>
                </form>
                <button
                  type="button"
                  onClick={() => setPanel("email")}
                  className="rounded-full px-2 py-2 font-medium text-white/40 transition hover:text-white"
                >
                  Use a different email
                </button>
              </div>

              {emailAuthUsesConsoleFallback && (
                <p className="mt-4 text-xs leading-6 text-white/40">
                  Local development mode — codes print to the server console.
                </p>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-5 flex flex-col gap-2.5 border-t border-white/[0.07] pt-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs leading-6 text-white/30">
            By continuing, you agree to DigiCard&apos;s Terms of Use and Privacy Policy.
          </p>
          {devAuthBypassEnabled && (
            <Link
              href={callbackUrl}
              className="inline-flex items-center gap-2 rounded-full bg-[#059669] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#047857]"
            >
              Open preview
              <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

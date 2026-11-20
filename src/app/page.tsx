import Link from "next/link";
import { auth } from "@/backend/auth/config";
import { InteractiveHeroPreview } from "@/frontend/landing/hero-phone/interactive-hero-preview";
import { PremiumHeader } from "@/frontend/landing/premium-header";
import { ScrollReveal } from "@/frontend/landing/scroll-reveal";
import { UseCasesList, type UseCase } from "@/frontend/landing/use-cases-list";
import { HowItWorks } from "@/frontend/landing/how-it-works";
import type { LoginSearchParams } from "@/backend/auth/login-flow";
import { ArrowDown, ArrowRight } from "lucide-react";
import QRCode from "react-qr-code";
import { getAbsoluteUrl } from "@/backend/site-config";

const useCaseDetails: UseCase[] = [
  {
    copy: "Have your QR code ready while you wait in line. The recruiter scans it, and you spend your minute talking about the role.",
    qr: "LinkedIn",
    title: "Career fairs",
  },
  {
    copy: "Nobody has to search LinkedIn for your name and guess which profile is yours. They scan, and it's the right one.",
    qr: "LinkedIn",
    title: "Campus networking events",
  },
  {
    copy: "Set your QR code to open your GitHub or portfolio, so judges and teammates can see what you built after the demo.",
    qr: "Website",
    title: "Clubs and hackathons",
  },
  {
    copy: "When a mentor offers to stay in touch, they scan and save you as a contact, with your phone number and email already filled in.",
    qr: "Phone",
    title: "Mentor and alumni meetups",
  },
];

type LandingPageProps = {
  searchParams?: Promise<LoginSearchParams>;
};

function shouldOpenAuthModal(searchParams: LoginSearchParams) {
  return (
    searchParams.auth === "login" ||
    Boolean(
      searchParams.error ||
        searchParams.notice ||
        searchParams.method ||
        searchParams.step ||
        searchParams.email,
    )
  );
}

export default async function LandingPage({ searchParams }: LandingPageProps) {
  const resolvedSearchParams = (await searchParams) ?? {};
  const signedIn = Boolean((await auth())?.user);
  const showAuthModal = !signedIn && shouldOpenAuthModal(resolvedSearchParams);
  const AuthModalContent = showAuthModal
    ? (await import("@/frontend/login/home-auth-modal-content")).HomeAuthModalContent
    : null;

  return (
    <main className="min-h-screen overflow-x-clip bg-[var(--canvas)] text-[var(--ink)]">
      <div className="absolute inset-x-0 top-0 -z-10 h-[620px] overflow-hidden">
        <div className="orb-drift-1 absolute -top-24 left-[6%] h-[260px] w-[260px] rounded-full bg-[rgba(82,103,217,0.13)] blur-[65px] sm:h-[520px] sm:w-[520px] sm:blur-[130px]" />
        <div className="orb-drift-2 absolute -top-12 right-[4%] h-[200px] w-[200px] rounded-full bg-[rgba(255,141,87,0.08)] blur-[55px] sm:h-[400px] sm:w-[400px] sm:blur-[110px]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,_#f8f9fd_0%,_#fbfbfd_58%,_#ffffff_100%)]" />
      </div>

      <PremiumHeader showAuthModal={showAuthModal} signedIn={signedIn}>
        {AuthModalContent ? (
          <AuthModalContent originPath="/" searchParams={resolvedSearchParams} />
        ) : null}
      </PremiumHeader>

      <section className="mx-auto max-w-7xl px-5 pb-4 pt-8 sm:px-8 lg:pt-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.96fr] lg:items-start">
          <div>
            <h1 className="anim-2 max-w-[34rem] text-[2.35rem] font-semibold leading-[1.08] tracking-[-0.06em] text-[var(--ink)] sm:text-[3.25rem] lg:text-[4rem]">
              Stop spelling your email out loud.
            </h1>

            <p className="anim-3 mt-5 max-w-[32rem] text-[0.98rem] leading-7 text-[var(--muted)] sm:text-[1.02rem]">
              Next time someone says &quot;send me your info,&quot; hold up your phone. They scan your QR code, and your LinkedIn, website, or phone number opens on theirs. You pick which one.
            </p>

            <div className="anim-5 mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/dashboard"
                className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full bg-[var(--brand)] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-200/50 transition hover:bg-[var(--brand-dark)] sm:w-auto"
              >
                {signedIn ? "Open my workspace" : "Make my card"}
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex min-h-[48px] items-center justify-center gap-1.5 py-4 text-sm font-medium text-[var(--muted)] transition hover:text-[var(--ink)]"
              >
                See how it works
                <ArrowDown className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          <InteractiveHeroPreview />
        </div>
      </section>

      <HowItWorks />

      <section id="use-cases" className="scroll-mt-24 mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 sm:pb-20 lg:pb-24 sm:scroll-mt-28">
        <ScrollReveal className="max-w-3xl">
          <h2 className="text-[2.2rem] font-semibold tracking-[-0.05em] text-[var(--ink)] sm:text-4xl lg:text-5xl">
            When you&apos;ll use it
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--muted)]">
            A few common moments, and the QR setting that suits each one.
          </p>
        </ScrollReveal>

        <UseCasesList items={useCaseDetails} />
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
        <ScrollReveal className="rounded-[2rem] bg-[radial-gradient(120%_140%_at_0%_0%,_#1f2a4b_0%,_#141c33_55%)] px-6 py-10 text-white ring-1 ring-[rgba(25,35,61,0.12)] sm:px-10 sm:py-12 md:px-14">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <h2 className="text-[2.2rem] font-semibold tracking-[-0.05em] text-white sm:text-4xl lg:text-5xl">
                Make your card before the next career fair.
              </h2>
              <p className="mt-4 text-lg leading-8 text-white/70">
                It&apos;s the same card you tried above, with your real details.
              </p>
              <Link
                href="/dashboard"
                className="mt-8 inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-[var(--ink)] transition hover:bg-[#eef1ff] sm:w-auto"
              >
                {signedIn ? "Open my workspace" : "Make my card"}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Desktop visitors can carry on where they'll actually use the card: on their phone. */}
            <div className="hidden items-center gap-5 lg:flex">
              <div className="rounded-2xl bg-white p-3">
                <QRCode aria-label="QR code that opens DigiCard on your phone" bgColor="#ffffff" fgColor="#141c33" size={112} value={getAbsoluteUrl("/dashboard")} />
              </div>
              <p className="max-w-[11rem] text-sm leading-6 text-white/70">On a computer? Scan to continue on your phone.</p>
            </div>
          </div>
        </ScrollReveal>
      </section>
      <footer className="border-t border-slate-200 bg-white"><div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-8 text-sm sm:px-6"><Link href="/" className="font-semibold">DigiCard</Link><nav aria-label="Legal" className="flex gap-6 text-[var(--muted)]"><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></nav></div></footer>
    </main>
  );
}

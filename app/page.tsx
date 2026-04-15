import Link from "next/link";
import { InteractiveHeroPreview } from "@/components/landing/interactive-hero-preview";
import { PremiumHeader } from "@/components/landing/premium-header";
import { ScrollReveal } from "@/components/landing/scroll-reveal";
import { HomeAuthModalContent } from "@/components/login/home-auth-modal-content";
import type { LoginSearchParams } from "@/lib/login-flow";
import {
  ArrowRight,
  Check,
  Sparkles,
  SquareArrowOutUpRight,
} from "lucide-react";

const quickPoints = [
  "Share LinkedIn, resume, and portfolio with one scan",
  "Make a better first impression in short conversations",
  "Give recruiters and professionals an easy way to remember you",
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
  const showAuthModal = shouldOpenAuthModal(resolvedSearchParams);

  return (
    <main className="min-h-screen overflow-hidden bg-[var(--canvas)] text-[var(--ink)]">
      {/* Animated ambient background */}
      <div className="absolute inset-x-0 top-0 -z-10 h-[620px] overflow-hidden">
        <div className="orb-drift-1 absolute -top-24 left-[6%] h-[520px] w-[520px] rounded-full bg-[rgba(82,103,217,0.13)] blur-[130px]" />
        <div className="orb-drift-2 absolute -top-12 right-[4%] h-[400px] w-[400px] rounded-full bg-[rgba(255,141,87,0.08)] blur-[110px]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,_#f8f9fd_0%,_#fbfbfd_58%,_#ffffff_100%)]" />
      </div>

      <div className="border-b border-[rgba(25,35,61,0.08)] bg-[#5267d9] text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-4 px-6 py-3 text-center text-sm font-medium">
          <span className="hidden sm:inline">
            Built for students and early professionals meeting people in real-world events.
          </span>
          <span className="sm:hidden">Built for real-world networking.</span>
          <a
            href="#live-preview"
            className="inline-flex items-center rounded-full border border-white/35 px-4 py-1.5 text-xs font-semibold transition hover:bg-white/10"
          >
            View preview
          </a>
        </div>
      </div>

      <PremiumHeader showAuthModal={showAuthModal}>
        <HomeAuthModalContent originPath="/" searchParams={resolvedSearchParams} />
      </PremiumHeader>

      <section className="mx-auto max-w-7xl px-6 pb-12 pt-5 lg:pt-6">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.96fr] lg:items-start">
          <div>
            <div className="anim-1 inline-flex items-center gap-2 rounded-full border border-[rgba(82,103,217,0.14)] bg-white/90 px-4 py-2 text-sm font-semibold text-[var(--ink)] shadow-[0_10px_24px_rgba(21,32,58,0.05)]">
              <Sparkles className="h-4 w-4 text-[var(--brand)]" />
              Made for career fairs, campus events, and networking meetups
            </div>

            <h1 className="anim-2 mt-5 max-w-[34rem] text-[2.7rem] font-semibold leading-[0.96] tracking-[-0.065em] text-[var(--ink)] sm:text-[3.5rem] lg:text-[4.2rem]">
              Share your profile
              <br />
              <span className="text-[var(--brand)]">in one scan.</span>
            </h1>

            <p className="anim-3 mt-5 max-w-[32rem] text-[0.98rem] leading-7 text-[var(--muted)] sm:text-[1.02rem]">
              Your digital networking card — LinkedIn, portfolio, resume, and contact details in one place.
              Perfect for career fairs, campus events, and meetups.
            </p>

            <div className="anim-4 mt-6 grid gap-2.5 text-sm text-[var(--ink)]">
              {quickPoints.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-2xl border border-[rgba(25,35,61,0.06)] bg-white/88 px-4 py-2.5 shadow-[0_10px_24px_rgba(21,32,58,0.04)]"
                >
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[rgba(82,103,217,0.12)]">
                    <Check className="h-4 w-4 text-[var(--brand)]" />
                  </div>
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </div>

            <div className="anim-5 mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-8 py-4 text-base font-semibold text-[var(--ink)] shadow-[0_20px_40px_rgba(255,141,87,0.32)] transition hover:scale-[1.03] hover:bg-[#ff9a67] hover:shadow-[0_24px_48px_rgba(255,141,87,0.4)] active:scale-[0.98]"
              >
                Create my card — it&apos;s free
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#live-preview"
                className="inline-flex items-center justify-center gap-1.5 py-4 text-sm font-medium text-[var(--muted)] transition hover:text-[var(--ink)]"
              >
                Preview the card
                <SquareArrowOutUpRight className="h-3.5 w-3.5" />
              </a>
            </div>

            <p className="anim-6 mt-4 text-xs text-[var(--muted)]">
              No app download needed &middot; Works instantly at any event
            </p>
          </div>

          <InteractiveHeroPreview />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <ScrollReveal className="rounded-[2.4rem] border border-[rgba(255,255,255,0.18)] bg-[linear-gradient(135deg,_#172340_0%,_#2d4177_36%,_#5267d9_72%,_#8ca0ff_100%)] px-8 py-10 text-white shadow-[0_32px_80px_rgba(35,51,103,0.22)] md:px-12 md:py-14">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-white/60">Build your own version</p>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-white sm:text-5xl">
                Launch a card that feels ready before the next opportunity even starts.
              </h2>
              <p className="mt-5 text-lg leading-8 text-white/74">
                Start with the same polished experience you just explored, customize it in minutes, and walk into your next event already prepared.
              </p>
              <div className="mt-6 flex flex-wrap gap-3 text-sm text-white/78">
                {["Live profile", "QR share", "Resume links", "Instant follow-up"].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/18 bg-white/10 px-4 py-2 font-medium backdrop-blur"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-semibold text-[var(--brand)] transition hover:bg-[#f2f5ff]"
              >
                Create my card
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#live-preview"
                className="inline-flex items-center justify-center rounded-full border border-white/20 px-7 py-4 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                View live preview
              </a>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </main>
  );
}


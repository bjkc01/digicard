import Link from "next/link";
import {
  ArrowRight,
  AtSign,
  BriefcaseBusiness,
  Code2,
  CreditCard,
  FileText,
  MessageCircle,
  Phone,
  QrCode,
  Scan,
  Smartphone,
  StickyNote,
  Users,
  UserRound,
} from "lucide-react";
import { InteractiveHeroPreview } from "@/components/landing/interactive-hero-preview";
import { PremiumHeader } from "@/components/landing/premium-header";
import { ScrollReveal } from "@/components/landing/scroll-reveal";
import { UseCasesTicketGrid } from "@/components/landing/use-cases-ticket-grid";
import { HomeAuthModalContent } from "@/components/login/home-auth-modal-content";
import type { LoginSearchParams } from "@/lib/login-flow";

const useCaseDetails = [
  {
    title: "Career Fair",
    copy: "Hand off your links before the recruiter line builds.",
  },
  {
    title: "Campus Event",
    copy: "Skip the awkward search. Jump straight to the conversation.",
  },
  {
    title: "Hackathon",
    copy: "Let teammates and judges revisit your work after the pitch.",
  },
  {
    title: "Mentor Meetup",
    copy: "Show up polished when talking to alumni or program reps.",
  },
] as const;

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
    <main className="min-h-screen overflow-x-clip bg-[#06070d] text-white">
      <PremiumHeader showAuthModal={showAuthModal}>
        <HomeAuthModalContent originPath="/" searchParams={resolvedSearchParams} />
      </PremiumHeader>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="orb-drift-1 absolute -top-40 left-[8%] h-[480px] w-[480px] rounded-full bg-[#5267d9]/16 blur-[130px]" />
          <div className="orb-drift-2 absolute top-[15%] right-[4%] h-[360px] w-[360px] rounded-full bg-[#7c3aed]/9 blur-[110px]" />
          <div className="absolute bottom-0 left-1/2 h-[200px] w-[700px] -translate-x-1/2 rounded-full bg-[#5267d9]/7 blur-[80px]" />
        </div>

        <div className="mx-auto max-w-7xl px-4 pb-10 pt-16 sm:px-6 sm:pb-14 sm:pt-20 lg:pb-16 lg:pt-24">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.96fr] lg:items-start">
            <div className="flex flex-col">
              <h1 className="anim-1 text-[3.4rem] font-semibold leading-[0.9] tracking-[-0.055em] sm:text-[5rem] lg:text-[5.8rem]">
                Share yourself
                <br />
                <span className="bg-gradient-to-r from-white to-[#8da0ff] bg-clip-text text-transparent">
                  in one scan.
                </span>
              </h1>

              <p className="anim-2 mt-5 text-base text-white/45 sm:text-lg">
                Your card. Your links. Instant.
              </p>

              <div className="anim-3 mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href="/dashboard"
                  className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-semibold text-[#06070d] transition-all duration-200 hover:bg-white/90 active:scale-[0.98] sm:w-auto"
                >
                  Create my card
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="#live-preview"
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-white/12 px-7 py-4 text-sm font-semibold text-white/60 transition-all duration-200 hover:border-white/22 hover:text-white"
                >
                  See it live
                </a>
              </div>
            </div>

            <InteractiveHeroPreview />
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="how-it-works" className="scroll-mt-20 border-t border-white/[0.06]">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:py-28">
          <ScrollReveal>
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-white/30">
              How it works
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl lg:text-5xl">
              Three steps. No friction.
            </h2>
          </ScrollReveal>

          <div className="mt-14 grid items-center gap-4 lg:grid-cols-[1fr_auto_1fr_auto_1fr]">
            <ScrollReveal className="relative overflow-hidden rounded-[1.6rem] border border-white/[0.07] bg-white/[0.03] p-7 text-center transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.055]">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#5267d9]/14 text-[#8da0ff]">
                <Smartphone className="h-7 w-7" />
              </div>
              <p className="mt-5 text-sm font-semibold text-white">Build your card</p>
              <p className="mt-1.5 text-xs text-white/35">Set up once.</p>
              <p className="absolute right-5 top-4 select-none text-[2rem] font-semibold leading-none tracking-[-0.06em] text-white/[0.05]">
                01
              </p>
            </ScrollReveal>

            <div className="hidden items-center justify-center lg:flex">
              <ArrowRight className="h-5 w-5 text-white/20" />
            </div>

            <ScrollReveal delayMs={100} className="relative overflow-hidden rounded-[1.6rem] border border-white/[0.07] bg-white/[0.03] p-7 text-center transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.055]">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#5267d9]/14 text-[#8da0ff]">
                <Scan className="h-7 w-7" />
              </div>
              <p className="mt-5 text-sm font-semibold text-white">Show the QR</p>
              <p className="mt-1.5 text-xs text-white/35">At any event.</p>
              <p className="absolute right-5 top-4 select-none text-[2rem] font-semibold leading-none tracking-[-0.06em] text-white/[0.05]">
                02
              </p>
            </ScrollReveal>

            <div className="hidden items-center justify-center lg:flex">
              <ArrowRight className="h-5 w-5 text-white/20" />
            </div>

            <ScrollReveal delayMs={200} className="relative overflow-hidden rounded-[1.6rem] border border-white/[0.07] bg-white/[0.03] p-7 text-center transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.055]">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#5267d9]/14 text-[#8da0ff]">
                <UserRound className="h-7 w-7" />
              </div>
              <p className="mt-5 text-sm font-semibold text-white">They&apos;ve got you</p>
              <p className="mt-1.5 text-xs text-white/35">Instantly.</p>
              <p className="absolute right-5 top-4 select-none text-[2rem] font-semibold leading-none tracking-[-0.06em] text-white/[0.05]">
                03
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Why It Matters ── */}
      <section id="why-it-matters" className="scroll-mt-20 border-t border-white/[0.06] bg-white/[0.018]">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:py-28">
          <ScrollReveal>
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-white/30">
              Why it matters
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl lg:text-5xl">
              Stop juggling apps.
            </h2>
          </ScrollReveal>

          <ScrollReveal className="mt-12 grid gap-4 lg:grid-cols-2" delayMs={120}>
            {/* Before — messy */}
            <div className="relative overflow-hidden rounded-[1.8rem] border border-white/[0.06] bg-white/[0.025] p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/28">
                The old way
              </p>
              <div className="relative mt-6 h-52 select-none">
                <div className="absolute left-1 top-2 flex rotate-[-8deg] items-center gap-2.5 rounded-2xl border border-[#0a66c2]/30 bg-[#0a66c2]/14 px-4 py-2.5 shadow-[0_8px_24px_rgba(0,0,0,0.35)]">
                  <AtSign className="h-5 w-5 text-[#4a96e2]" />
                  <span className="text-sm font-medium text-white/65">LinkedIn</span>
                </div>
                <div className="absolute right-3 top-14 flex rotate-[7deg] items-center gap-2.5 rounded-2xl border border-red-500/25 bg-red-500/12 px-4 py-2.5 shadow-[0_8px_24px_rgba(0,0,0,0.35)]">
                  <FileText className="h-5 w-5 text-red-400" />
                  <span className="text-sm font-medium text-white/65">Resume.pdf</span>
                </div>
                <div className="absolute bottom-8 left-8 flex rotate-[-4deg] items-center gap-2.5 rounded-2xl border border-amber-500/22 bg-amber-500/10 px-4 py-2.5 shadow-[0_8px_24px_rgba(0,0,0,0.35)]">
                  <StickyNote className="h-5 w-5 text-amber-400" />
                  <span className="text-sm font-medium text-white/65">Notes app</span>
                </div>
                <div className="absolute bottom-6 right-6 flex rotate-[5deg] items-center gap-2.5 rounded-2xl border border-green-500/22 bg-green-500/10 px-4 py-2.5 shadow-[0_8px_24px_rgba(0,0,0,0.35)]">
                  <Phone className="h-5 w-5 text-green-400" />
                  <span className="text-sm font-medium text-white/65">Save contact</span>
                </div>
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(6,7,13,0.55)_100%)]" />
              </div>
              <p className="mt-3 text-sm text-white/35">Four apps. One awkward exchange.</p>
            </div>

            {/* After — clean */}
            <div className="relative overflow-hidden rounded-[1.8rem] border border-[#5267d9]/28 bg-[#5267d9]/[0.07] p-8">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_60%_-10%,rgba(82,103,217,0.18),transparent_55%)]" />
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8da0ff]/70">
                With DigiCard
              </p>
              <div className="relative mt-6 flex h-52 items-center justify-center">
                <div className="w-full max-w-[230px] overflow-hidden rounded-2xl border border-white/10 bg-[#0d1220] p-5 shadow-[0_24px_64px_rgba(0,0,0,0.55)]">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-xs font-bold text-white">
                      JL
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">Jordan Lin</p>
                      <p className="text-[0.7rem] text-white/40">CS Student · State University</p>
                    </div>
                  </div>
                  <div className="mt-3.5 space-y-1.5">
                    <div className="flex items-center gap-2.5 text-[0.7rem] text-white/40">
                      <div className="h-2.5 w-2.5 flex-shrink-0 rounded-sm bg-white/15" />
                      j.lin@example.edu
                    </div>
                    <div className="flex items-center gap-2.5 text-[0.7rem] text-white/40">
                      <div className="h-2.5 w-2.5 flex-shrink-0 rounded-sm bg-white/15" />
                      linkedin.com/in/jordan-lin-cs
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white p-1.5">
                      <QrCode className="h-full w-full text-[#0d1220]" />
                    </div>
                    <p className="text-[0.58rem] font-medium uppercase tracking-[0.28em] text-white/22">
                      Scan to connect · DigiCard
                    </p>
                  </div>
                </div>
              </div>
              <p className="mt-3 text-sm text-[#8da0ff]/60">One card. One scan. Done.</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Use Cases ── */}
      <section id="use-cases" className="scroll-mt-20 border-t border-white/[0.06]">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:py-28">
          <ScrollReveal>
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-white/30">
              Use cases
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl lg:text-5xl">
              Built for every room.
            </h2>
          </ScrollReveal>

          <UseCasesTicketGrid items={useCaseDetails} />
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="border-t border-white/[0.06]">
        <ScrollReveal>
          <div className="relative overflow-hidden py-24 sm:py-32">
            <div className="pointer-events-none absolute inset-0 bg-[#06070d]">
              <div className="absolute left-[20%] top-0 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-[#5267d9]/16 blur-[120px]" />
              <div className="absolute bottom-0 right-[20%] h-[400px] w-[400px] translate-y-1/2 rounded-full bg-[#7c3aed]/12 blur-[100px]" />
            </div>
            <div className="relative mx-auto max-w-2xl px-4 text-center sm:px-6">
              <h2 className="text-4xl font-semibold leading-[1.05] tracking-[-0.05em] sm:text-5xl lg:text-6xl">
                Ready for your
                <br />
                next event?
              </h2>
              <div className="mt-10">
                <Link
                  href="/dashboard"
                  className="inline-flex min-h-[56px] items-center justify-center gap-2 rounded-full bg-white px-9 py-4 text-base font-semibold text-[#06070d] transition-all duration-200 hover:bg-white/90 active:scale-[0.98]"
                >
                  Create my card — it&apos;s free
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-white/[0.06] bg-[#06070d]">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-5 gap-y-3 px-4 py-6 sm:px-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-semibold text-white/50 transition-colors hover:text-white/80"
          >
            <div className="flex h-6 w-6 items-center justify-center rounded-[0.4rem] bg-[#5267d9]/24">
              <CreditCard className="h-3.5 w-3.5 text-[#8da0ff]" />
            </div>
            DigiCard
          </Link>
          <span className="text-white/15" aria-hidden="true">·</span>
          <a href="/privacy" className="text-sm text-white/32 transition-colors hover:text-white/60">
            Privacy
          </a>
          <span className="text-white/15" aria-hidden="true">·</span>
          <a href="/terms" className="text-sm text-white/32 transition-colors hover:text-white/60">
            Terms
          </a>
          <span className="text-white/15" aria-hidden="true">·</span>
          <a
            href="mailto:hello@digicard.me"
            className="text-sm text-white/32 transition-colors hover:text-white/60"
          >
            Contact
          </a>
        </div>
      </footer>
    </main>
  );
}

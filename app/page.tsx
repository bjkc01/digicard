import Link from "next/link";
import {
  ArrowRight,
  AtSign,
  Code2,
  CreditCard,
  FileText,
  MessageCircle,
  Phone,
  QrCode,
  ScanLine,
  Smartphone,
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
    copy: "Share everything before the line moves.",
  },
  {
    title: "Campus Event",
    copy: "Trade links without pausing the conversation.",
  },
  {
    title: "Hackathon",
    copy: "Let judges revisit your build after the demo.",
  },
  {
    title: "Mentor Meetup",
    copy: "Leave one clean profile instead of four apps.",
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
    <main className="min-h-screen overflow-x-clip bg-[var(--canvas)] text-[var(--ink)]">
      <div className="absolute inset-x-0 top-0 -z-10 h-[640px] overflow-hidden">
        <div className="orb-drift-1 absolute -top-24 left-[6%] h-[260px] w-[260px] rounded-full bg-[rgba(82,103,217,0.13)] blur-[65px] sm:h-[520px] sm:w-[520px] sm:blur-[130px]" />
        <div className="orb-drift-2 absolute -top-12 right-[4%] h-[200px] w-[200px] rounded-full bg-[rgba(255,141,87,0.08)] blur-[55px] sm:h-[400px] sm:w-[400px] sm:blur-[110px]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,_#f8f9fd_0%,_#fbfbfd_58%,_#ffffff_100%)]" />
      </div>

      <PremiumHeader showAuthModal={showAuthModal}>
        <HomeAuthModalContent originPath="/" searchParams={resolvedSearchParams} />
      </PremiumHeader>

      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 pb-12 pt-8 sm:px-6 sm:pb-14 sm:pt-12 lg:pb-16 lg:pt-16">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.96fr] lg:items-start">
            <div className="flex max-w-xl flex-col">
              <h1 className="anim-1 text-[3.2rem] font-semibold leading-[0.9] tracking-[-0.055em] text-[var(--ink)] sm:text-[4.7rem] lg:text-[5.4rem]">
                Share yourself
                <br />
                <span className="bg-gradient-to-r from-[var(--ink)] to-[#5267d9] bg-clip-text text-transparent">
                  in one scan.
                </span>
              </h1>

              <p className="anim-2 mt-5 text-base text-[var(--muted)] sm:text-lg">
                Your card. Your links. Instant.
              </p>

              <div className="anim-3 mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href="/dashboard"
                  className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-7 py-4 text-sm font-semibold text-[var(--ink)] shadow-[0_20px_40px_rgba(255,141,87,0.28)] transition-all duration-200 hover:-translate-y-px hover:bg-[#ff9a67] active:scale-[0.98] sm:w-auto"
                >
                  Create my card
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="#live-preview"
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-[rgba(25,35,61,0.09)] bg-white/80 px-7 py-4 text-sm font-semibold text-[var(--muted)] shadow-[0_10px_28px_rgba(21,32,58,0.06)] transition-all duration-200 hover:border-[rgba(82,103,217,0.18)] hover:text-[var(--ink)]"
                >
                  See it live
                </a>
              </div>
            </div>

            <InteractiveHeroPreview />
          </div>
        </div>
      </section>

      <section id="how-it-works" className="scroll-mt-20 border-t border-[rgba(25,35,61,0.06)]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
          <ScrollReveal>
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[var(--muted)]">
              How it works
            </p>
          </ScrollReveal>

          <div className="mt-8 grid items-stretch gap-4 lg:grid-cols-[1fr_auto_1fr_auto_1fr]">
            <ScrollReveal className="overflow-hidden rounded-[1.8rem] border border-[rgba(25,35,61,0.07)] bg-white p-6 shadow-[0_18px_40px_rgba(21,32,58,0.06)]">
              <div className="flex h-[220px] items-center justify-center rounded-[1.4rem] bg-[linear-gradient(180deg,_rgba(82,103,217,0.08),_rgba(255,255,255,0))]">
                <div className="relative aspect-[9/18] w-[132px] rounded-[2rem] border border-white/14 bg-[#090d16] p-[6px] shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
                  <div className="absolute left-1/2 top-3 h-1.5 w-12 -translate-x-1/2 rounded-full bg-white/10" />
                  <div className="h-full rounded-[1.6rem] bg-[linear-gradient(165deg,#151b2d_0%,#0d1220_46%,#070b14_100%)] px-3 pb-4 pt-8">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 text-xs font-semibold text-white">
                        JL
                      </div>
                      <div className="space-y-1">
                        <div className="h-2 w-14 rounded-full bg-white/16" />
                        <div className="h-2 w-10 rounded-full bg-white/8" />
                      </div>
                    </div>
                    <div className="mt-6 flex justify-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white p-2 shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
                        <QrCode className="h-full w-full text-[#0d1220]" />
                      </div>
                    </div>
                    <div className="mt-5 space-y-2">
                      <div className="h-2 rounded-full bg-white/14" />
                      <div className="h-2 w-4/5 rounded-full bg-white/10" />
                    </div>
                  </div>
                </div>
              </div>
              <p className="mt-5 text-sm font-medium text-[var(--ink)]">Show your QR</p>
            </ScrollReveal>

            <div className="hidden items-center justify-center lg:flex">
              <ArrowRight className="h-5 w-5 text-slate-300" />
            </div>

            <ScrollReveal
              delayMs={100}
              className="overflow-hidden rounded-[1.8rem] border border-[rgba(25,35,61,0.07)] bg-white p-6 shadow-[0_18px_40px_rgba(21,32,58,0.06)]"
            >
              <div className="relative flex h-[220px] items-center justify-center rounded-[1.4rem] bg-[linear-gradient(180deg,_rgba(82,103,217,0.08),_rgba(255,255,255,0))]">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-24 w-24 rounded-full border border-[#8da0ff]/35" />
                  <div className="absolute h-14 w-14 rounded-full border border-[#8da0ff]/55" />
                  <ScanLine className="absolute h-6 w-6 text-[#5267d9]" />
                </div>
                <div className="absolute left-8 top-10 aspect-[9/18] w-[92px] rotate-[-8deg] rounded-[1.7rem] border border-white/14 bg-[#090d16] p-[5px] shadow-[0_18px_45px_rgba(0,0,0,0.38)]">
                  <div className="h-full rounded-[1.35rem] bg-[linear-gradient(165deg,#151b2d_0%,#0d1220_46%,#070b14_100%)] p-3">
                    <div className="flex h-full items-center justify-center rounded-[1rem] border border-dashed border-white/14">
                      <QrCode className="h-10 w-10 text-white/82" />
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-10 right-8 aspect-[9/18] w-[92px] rotate-[10deg] rounded-[1.7rem] border border-white/14 bg-[#090d16] p-[5px] shadow-[0_18px_45px_rgba(0,0,0,0.38)]">
                  <div className="flex h-full items-center justify-center rounded-[1.35rem] bg-[linear-gradient(165deg,#161616_0%,#0f0f12_100%)]">
                    <Smartphone className="h-9 w-9 text-white/82" />
                  </div>
                </div>
              </div>
              <p className="mt-5 text-sm font-medium text-[var(--ink)]">They scan</p>
            </ScrollReveal>

            <div className="hidden items-center justify-center lg:flex">
              <ArrowRight className="h-5 w-5 text-slate-300" />
            </div>

            <ScrollReveal
              delayMs={200}
              className="overflow-hidden rounded-[1.8rem] border border-[rgba(25,35,61,0.07)] bg-white p-6 shadow-[0_18px_40px_rgba(21,32,58,0.06)]"
            >
              <div className="flex h-[220px] items-center justify-center rounded-[1.4rem] bg-[linear-gradient(180deg,_rgba(82,103,217,0.08),_rgba(255,255,255,0))]">
                <div className="w-full max-w-[240px] overflow-hidden rounded-[1.4rem] border border-[#5267d9]/20 bg-[#101626] shadow-[0_24px_64px_rgba(0,0,0,0.42)]">
                  <div className="border-b border-white/8 px-4 py-3">
                    <div className="h-2 w-24 rounded-full bg-white/16" />
                  </div>
                  <div className="space-y-4 px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-sm font-semibold text-white">
                        JL
                      </div>
                      <div className="space-y-2">
                        <div className="h-2.5 w-24 rounded-full bg-white/18" />
                        <div className="h-2 w-16 rounded-full bg-white/10" />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <div className="h-10 rounded-2xl bg-white/6" />
                      <div className="h-10 rounded-2xl bg-white/6" />
                      <div className="h-10 rounded-2xl bg-white/6" />
                    </div>
                  </div>
                </div>
              </div>
              <p className="mt-5 text-sm font-medium text-[var(--ink)]">Profile opens</p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section
        id="why-it-matters"
        className="scroll-mt-20 border-t border-[rgba(25,35,61,0.06)] bg-[linear-gradient(180deg,_rgba(255,255,255,0.96),_rgba(246,248,255,0.9))]"
      >
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
          <ScrollReveal>
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[var(--muted)]">
              Why it matters
            </p>
          </ScrollReveal>

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            <ScrollReveal className="relative overflow-hidden rounded-[1.9rem] border border-[rgba(25,35,61,0.07)] bg-white p-7 shadow-[0_18px_40px_rgba(21,32,58,0.06)]">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                Too many apps
              </p>
              <div className="relative mt-6 h-60 select-none">
                <div className="absolute left-1 top-2 flex rotate-[-8deg] items-center gap-2.5 rounded-2xl border border-[#0a66c2]/20 bg-[#0a66c2]/10 px-4 py-2.5 shadow-[0_8px_24px_rgba(21,32,58,0.08)]">
                  <AtSign className="h-5 w-5 text-[#4a96e2]" />
                  <span className="text-sm font-medium text-[var(--ink)]/70">LinkedIn</span>
                </div>
                <div className="absolute right-3 top-14 flex rotate-[7deg] items-center gap-2.5 rounded-2xl border border-red-500/20 bg-red-500/8 px-4 py-2.5 shadow-[0_8px_24px_rgba(21,32,58,0.08)]">
                  <FileText className="h-5 w-5 text-red-400" />
                  <span className="text-sm font-medium text-[var(--ink)]/70">Resume.pdf</span>
                </div>
                <div className="absolute bottom-8 left-8 flex rotate-[-4deg] items-center gap-2.5 rounded-2xl border border-amber-500/18 bg-amber-500/8 px-4 py-2.5 shadow-[0_8px_24px_rgba(21,32,58,0.08)]">
                  <MessageCircle className="h-5 w-5 text-amber-500" />
                  <span className="text-sm font-medium text-[var(--ink)]/70">Notes</span>
                </div>
                <div className="absolute bottom-6 right-6 flex rotate-[5deg] items-center gap-2.5 rounded-2xl border border-green-500/18 bg-green-500/8 px-4 py-2.5 shadow-[0_8px_24px_rgba(21,32,58,0.08)]">
                  <Phone className="h-5 w-5 text-green-500" />
                  <span className="text-sm font-medium text-[var(--ink)]/70">Contact</span>
                </div>
                <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 rotate-[-3deg] items-center gap-2.5 rounded-2xl border border-cyan-500/18 bg-cyan-500/8 px-4 py-2.5 shadow-[0_8px_24px_rgba(21,32,58,0.08)]">
                  <Code2 className="h-5 w-5 text-cyan-500" />
                  <span className="text-sm font-medium text-[var(--ink)]/70">Portfolio</span>
                </div>
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_24%,rgba(248,249,253,0.94)_100%)]" />
              </div>
            </ScrollReveal>

            <ScrollReveal
              delayMs={100}
              className="relative overflow-hidden rounded-[1.9rem] border border-[rgba(82,103,217,0.16)] bg-[linear-gradient(160deg,_rgba(82,103,217,0.12),_rgba(255,255,255,0.98))] p-7 shadow-[0_18px_40px_rgba(21,32,58,0.06)]"
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_60%_-10%,rgba(82,103,217,0.16),transparent_55%)]" />
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--brand)]">
                One clean card
              </p>
              <div className="relative mt-6 flex h-60 items-center justify-center">
                <div className="w-full max-w-[240px] overflow-hidden rounded-2xl border border-white/10 bg-[#0d1220] p-5 shadow-[0_24px_64px_rgba(0,0,0,0.4)]">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-xs font-bold text-white">
                      JL
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">Jordan Lin</p>
                      <p className="text-[0.7rem] text-white/40">CS Student</p>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2.5 text-[0.72rem] text-white/42">
                      <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-white/8">
                        <AtSign className="h-3.5 w-3.5 text-white/70" />
                      </div>
                      linkedin.com/in/jordan-lin-cs
                    </div>
                    <div className="flex items-center gap-2.5 text-[0.72rem] text-white/42">
                      <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-white/8">
                        <FileText className="h-3.5 w-3.5 text-white/70" />
                      </div>
                      Resume
                    </div>
                    <div className="flex items-center gap-2.5 text-[0.72rem] text-white/42">
                      <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-white/8">
                        <Phone className="h-3.5 w-3.5 text-white/70" />
                      </div>
                      Contact
                    </div>
                  </div>
                  <div className="mt-5 flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white p-1.5">
                      <QrCode className="h-full w-full text-[#0d1220]" />
                    </div>
                    <p className="text-[0.58rem] font-medium uppercase tracking-[0.28em] text-white/24">
                      Scan to connect &middot; DigiCard
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section id="use-cases" className="scroll-mt-20 border-t border-[rgba(25,35,61,0.06)]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
          <ScrollReveal>
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[var(--muted)]">
              Use cases
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[var(--ink)] sm:text-4xl lg:text-5xl">
              Four rooms. Same move.
            </h2>
          </ScrollReveal>

          <UseCasesTicketGrid items={useCaseDetails} />
        </div>
      </section>

      <section className="border-t border-[rgba(25,35,61,0.06)]">
        <ScrollReveal>
          <div className="relative overflow-hidden py-24 sm:py-32">
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,_#172340_0%,_#2d4177_36%,_#5267d9_72%,_#8ca0ff_100%)]" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(255,255,255,0.2),transparent_30%),radial-gradient(circle_at_80%_100%,rgba(255,255,255,0.16),transparent_35%)]" />
            <div className="relative mx-auto max-w-2xl px-4 text-center text-white sm:px-6">
              <h2 className="text-4xl font-semibold leading-[1.05] tracking-[-0.05em] sm:text-5xl lg:text-6xl">
                Ready for your next event?
              </h2>
              <div className="mt-10">
                <Link
                  href="/dashboard"
                  className="inline-flex min-h-[56px] items-center justify-center gap-2 rounded-full bg-white px-9 py-4 text-base font-semibold text-[var(--ink)] transition-all duration-200 hover:bg-white/92 active:scale-[0.98]"
                >
                  Create my card &mdash; it&apos;s free
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <footer className="border-t border-[rgba(25,35,61,0.06)] bg-white/70">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-4 gap-y-2 px-4 py-6 text-sm text-[var(--muted)] sm:px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-semibold text-[var(--ink)] transition-colors hover:text-[var(--brand)]"
          >
            <div className="flex h-6 w-6 items-center justify-center rounded-[0.4rem] bg-[#5267d9]/14">
              <CreditCard className="h-3.5 w-3.5 text-[#5267d9]" />
            </div>
            DigiCard
          </Link>
          <span aria-hidden="true">|</span>
          <Link href="/privacy" className="transition-colors hover:text-[var(--ink)]">
            Privacy
          </Link>
          <span aria-hidden="true">|</span>
          <Link href="/terms" className="transition-colors hover:text-[var(--ink)]">
            Terms
          </Link>
          <span aria-hidden="true">|</span>
          <a href="mailto:hello@digicard.me" className="transition-colors hover:text-[var(--ink)]">
            Contact
          </a>
        </div>
      </footer>
    </main>
  );
}

import Link from "next/link";
import { FloatingPaths } from "@/components/ui/background-paths";
import { GlowCard } from "@/components/ui/spotlight-card";
import { ShineBorder } from "@/components/ui/shine-border";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { InteractiveHeroPreview } from "@/components/landing/interactive-hero-preview";
import { PremiumHeader } from "@/components/landing/premium-header";
import { ScrollReveal } from "@/components/landing/scroll-reveal";
import { UseCasesTicketGrid } from "@/components/landing/use-cases-ticket-grid";
import { HomeAuthModalContent } from "@/components/login/home-auth-modal-content";
import type { LoginSearchParams } from "@/lib/login-flow";
import {
  ArrowRight,
  BriefcaseBusiness,
  Check,
  CheckCircle2,
  GraduationCap,
  QrCode,
  Sparkles,
  SquareArrowOutUpRight,
  UserRound,
} from "lucide-react";

const quickPoints = [
  "LinkedIn, resume, and portfolio — one tap, no typing",
  "Share while the conversation is still happening",
  "Make it easy for recruiters to find you after the event",
];

const comparisonColumns = [
  {
    label: "Without DigiCard",
    points: [
      "You spell your name out loud while someone opens LinkedIn.",
      "Your resume, portfolio, and contact info live in different places.",
      "The conversation ends before the follow-up feels easy.",
    ],
    tone: "muted",
  },
  {
    label: "With DigiCard",
    points: [
      "One scan opens your intro, links, and professional identity instantly.",
      "Recruiters can review your profile while the conversation is still fresh.",
      "You leave the moment looking prepared, organized, and memorable.",
    ],
    tone: "brand",
  },
] as const;

const includedFeatures = [
  {
    description: "Keep your full name and the version of your professional identity you want people to remember.",
    title: "Identity-first intro",
  },
  {
    description: "Show the school, program, and focus area that give your story immediate context.",
    title: "Academic context",
  },
  {
    description: "Put LinkedIn, portfolio, and resume in one clean place instead of scattering them across apps.",
    title: "One-tap proof of work",
  },
  {
    description: "Share instantly through a phone-friendly card and QR flow that feels ready for real events.",
    title: "Fast share moment",
  },
] as const;

const useCaseDetails = [
  {
    copy: "Open your profile before the recruiter line gets crowded and hand off your key links in one scan.",
    title: "Career fairs",
  },
  {
    copy: "Skip the awkward search step and move straight into talking about classes, projects, and goals.",
    title: "Campus networking events",
  },
  {
    copy: "Make it easy for teammates, judges, and alumni to revisit your work after a club or hackathon conversation.",
    title: "Clubs and hackathons",
  },
  {
    copy: "Share a polished student profile when speaking with mentors, alumni, or internship program reps.",
    title: "Mentor and alumni meetups",
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
    <main className="min-h-screen overflow-hidden text-[var(--ink)]">
      {/* Full-page dark background */}
      <div className="fixed inset-0 -z-50 bg-[#0d1528]" />

      {/* Hero floating paths */}
      <div
        className="absolute inset-x-0 top-[60px] -z-10 h-[1400px] pointer-events-none"
        style={{
          maskImage: "linear-gradient(to bottom, transparent 0%, black 6%, black 32%, transparent 72%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 6%, black 32%, transparent 72%)",
        }}
      >
        <div className="absolute inset-0 opacity-[0.4]">
          <FloatingPaths position={1} svgClassName="w-full h-full text-white" />
          <FloatingPaths position={-1} svgClassName="w-full h-full text-white" />
        </div>
      </div>

<PremiumHeader showAuthModal={showAuthModal}>
        <HomeAuthModalContent originPath="/" searchParams={resolvedSearchParams} />
      </PremiumHeader>

      <section className="mx-auto max-w-7xl px-4 pb-12 pt-5 sm:px-6 lg:pt-6">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.96fr] lg:items-start">
          <div>
            <div className="anim-1 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.08] px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-[#7b97ff]" />
              Built for career fairs and campus events
            </div>

            <h1 className="anim-2 mt-5 max-w-[34rem] text-[2.7rem] font-semibold leading-[0.96] tracking-[-0.065em] text-white sm:text-[3.5rem] lg:text-[4.2rem]">
              Your whole profile,
              <br />
              <span className="text-[#7b97ff]">one scan away.</span>
            </h1>

            <p className="anim-3 mt-5 max-w-[32rem] text-[0.98rem] leading-7 text-white/60 sm:text-[1.02rem]">
              Stop scrambling for your LinkedIn. One QR scan hands recruiters your portfolio, resume, and contact info — while the conversation is still going.
            </p>

            <div className="anim-4 mt-6 grid gap-2.5 text-sm">
              {quickPoints.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-2xl border border-white/[0.12] bg-[rgba(13,21,40,0.65)] px-4 py-3 backdrop-blur-md"
                >
                  <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-[#7b97ff]/30 bg-[#5267d9]/30">
                    <Check className="h-3.5 w-3.5 text-[#7b97ff]" />
                  </div>
                  <span className="font-medium text-white/90">{item}</span>
                </div>
              ))}
            </div>

            <div className="anim-5 mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#5267d9] px-8 py-4 text-base font-semibold text-white shadow-[0_20px_40px_rgba(82,103,217,0.35)] transition hover:scale-[1.03] hover:bg-[#6278e8] hover:shadow-[0_24px_48px_rgba(82,103,217,0.45)] active:scale-[0.98]"
              >
                Create my card - it&apos;s free
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-1.5 py-4 text-sm font-medium text-white/50 transition hover:text-white"
              >
                See how it works
                <SquareArrowOutUpRight className="h-3.5 w-3.5" />
              </a>
            </div>

            <p className="anim-6 mt-4 text-xs text-white/35">
              Works from any phone &middot; No app download needed
            </p>
          </div>

          <InteractiveHeroPreview />
        </div>
      </section>

      <section id="why-it-matters">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <ScrollReveal className="max-w-3xl">
            <div className="max-w-3xl">
              <h2 className="text-4xl font-semibold tracking-[-0.05em] text-white sm:text-5xl">
                Great networking opportunities are often lost in small, awkward moments.
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal
            className="mt-12 rounded-[2rem] border border-white/[0.08] bg-white/[0.04] p-5 sm:p-7"
            delayMs={120}
          >
            <div className="grid grid-cols-2 gap-2 sm:gap-4 stagger-children">
              {comparisonColumns.map((column) => (
                <ShineBorder
                  key={column.label}
                  borderRadius={26}
                  borderWidth={1}
                  duration={column.tone === "brand" ? 18 : 26}
                  color={column.tone === "brand" ? ["#7b97ff", "#5267d9", "#a5b8ff"] : ["#ffffff22", "#ffffff11", "#ffffff33"]}
                  className="w-full"
                >
                  <GlowCard
                    glowColor="blue"
                    borderRadius={26}
                    className={`w-full px-5 py-5 ${
                      column.tone === "brand"
                        ? "bg-[linear-gradient(160deg,_rgba(82,103,217,0.2),_rgba(82,103,217,0.04))]"
                        : "bg-white/[0.05]"
                    }`}
                  >
                    <p
                      className={`text-xs font-semibold uppercase tracking-[0.24em] ${
                        column.tone === "brand" ? "text-[#7b97ff]" : "text-white/40"
                      }`}
                    >
                      {column.label}
                    </p>
                    <div className="mt-4 space-y-3">
                      {column.points.map((point) => (
                        <div key={point} className="flex items-start gap-3">
                          <div
                            className={`mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full ${
                              column.tone === "brand"
                                ? "bg-[rgba(82,103,217,0.3)] text-[#7b97ff]"
                                : "bg-white/[0.08] text-white/40"
                            }`}
                          >
                            <CheckCircle2 className="h-4 w-4" />
                          </div>
                          <p className="text-sm leading-7 text-white/75">{point}</p>
                        </div>
                      ))}
                    </div>
                  </GlowCard>
                </ShineBorder>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <HowItWorksSection />

      <section className="border-y border-white/[0.07]">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 py-24 lg:grid-cols-[0.92fr_1.08fr]">
          <ScrollReveal>
            <h2 className="text-4xl font-semibold tracking-[-0.05em] text-white sm:text-5xl">
              Everything needed to make a strong first impression.
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-white/60">
              Keep the essentials in one place so the person who scans your code can understand who you are and how to reach you immediately.
            </p>
          </ScrollReveal>

          <ScrollReveal className="grid gap-4 sm:grid-cols-2 stagger-children">
            {includedFeatures.map((item, index) => (
              <ShineBorder
                key={item.title}
                borderRadius={24}
                borderWidth={1}
                duration={22}
                color={["#7b97ff", "#5267d9", "#a5b8ff"]}
                className="w-full"
              >
                <GlowCard
                  glowColor="blue"
                  borderRadius={24}
                  className="w-full bg-white/[0.06] px-5 py-5 backdrop-blur-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/[0.1] text-[#7b97ff]">
                      {index === 0 ? <UserRound className="h-4 w-4" /> : null}
                      {index === 1 ? <GraduationCap className="h-4 w-4" /> : null}
                      {index === 2 ? <BriefcaseBusiness className="h-4 w-4" /> : null}
                      {index === 3 ? <QrCode className="h-4 w-4" /> : null}
                    </div>
                    <p className="text-sm font-semibold text-white">{item.title}</p>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-white/60">{item.description}</p>
                </GlowCard>
              </ShineBorder>
            ))}
          </ScrollReveal>
        </div>
      </section>

      <section id="use-cases" className="scroll-mt-24 mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:py-24 sm:scroll-mt-28">
        <ScrollReveal className="max-w-3xl">
          <h2 className="text-4xl font-semibold tracking-[-0.05em] text-white sm:text-5xl">
            Built for the places where students meet real opportunities.
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/60">
            DigiCard is designed for fast, in-person moments where a clean profile and quick QR share can make networking easier.
          </p>
        </ScrollReveal>

        <UseCasesTicketGrid items={useCaseDetails} />
      </section>

      {/* Final CTA — full-bleed, blends into page background */}
      <section className="relative overflow-hidden px-6 py-32 text-center">
        {/* Ambient glow orbs */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#5267d9] opacity-[0.12] blur-[120px]" />
          <div className="absolute left-1/4 top-1/3 h-[300px] w-[300px] rounded-full bg-[#7b97ff] opacity-[0.07] blur-[90px]" />
          <div className="absolute right-1/4 top-1/2 h-[280px] w-[280px] rounded-full bg-[#5267d9] opacity-[0.08] blur-[80px]" />
        </div>

        {/* Faint grid lines */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        <ScrollReveal className="relative z-10 mx-auto max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#7b97ff]">
            Ready when you are
          </p>
          <h2 className="mt-5 text-5xl font-semibold leading-[0.95] tracking-[-0.055em] text-white sm:text-6xl lg:text-7xl">
            Your card.<br />
            <span className="text-white/40">One scan.</span><br />
            Every opportunity.
          </h2>
          <p className="mx-auto mt-7 max-w-xl text-lg leading-8 text-white/50">
            Set it up in 60 seconds and walk into your next career fair already prepared.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-full bg-[#5267d9] px-8 py-4 text-base font-semibold text-white shadow-[0_20px_50px_rgba(82,103,217,0.4)] transition hover:scale-[1.03] hover:bg-[#6278e8] hover:shadow-[0_24px_60px_rgba(82,103,217,0.5)] active:scale-[0.98]"
            >
              Create my card — it&apos;s free
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="#live-preview"
              className="inline-flex items-center gap-1.5 py-4 text-sm font-medium text-white/40 transition hover:text-white"
            >
              See live preview
              <SquareArrowOutUpRight className="h-3.5 w-3.5" />
            </a>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs font-medium text-white/25">
            {["No app download", "Works on any phone", "Free to start", "Share in seconds"].map((item) => (
              <span key={item} className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-white/20" />
                {item}
              </span>
            ))}
          </div>
        </ScrollReveal>
      </section>
    </main>
  );
}

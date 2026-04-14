import Link from "next/link";
import { InteractiveHeroPreview } from "@/components/landing/interactive-hero-preview";
import { ScrollReveal } from "@/components/landing/scroll-reveal";
import { HomeAuthModalContent } from "@/components/login/home-auth-modal-content";
import { HomeAuthModal } from "@/components/login/home-auth-modal";
import type { LoginSearchParams } from "@/lib/login-flow";
import {
  ArrowRight,
  BriefcaseBusiness,
  Check,
  CheckCircle2,
  CreditCard,
  GraduationCap,
  Menu,
  QrCode,
  Sparkles,
  SquareArrowOutUpRight,
  UserRound,
} from "lucide-react";


const steps = [
  {
    id: "01",
    title: "Create your profile",
    body: "Set up a clean digital card with your name, university, major, and professional identity.",
  },
  {
    id: "02",
    title: "Add your links and details",
    body: "Include LinkedIn, portfolio, resume, email, and the contact information you want people to see first.",
  },
  {
    id: "03",
    title: "Share it instantly with QR",
    body: "Open your card at an event, let someone scan it, and give them everything they need in one tap.",
  },
];

const quickPoints = [
  "Share LinkedIn, resume, and portfolio with one scan",
  "Make a better first impression in short conversations",
  "Give recruiters and professionals an easy way to remember you",
];

const networkingQuote = {
  line: "If you're not networking, you're not working.",
  source: "A reminder students hear for a reason",
  body: "DigiCard helps you turn that idea into something practical by making it easier to share your profile in the moment, not after the opportunity has passed.",
};

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
            href="#how-it-works"
            className="inline-flex items-center rounded-full border border-white/35 px-4 py-1.5 text-xs font-semibold transition hover:bg-white/10"
          >
            See how it works
          </a>
        </div>
      </div>

      <header className="sticky top-0 z-50 border-b border-[rgba(25,35,61,0.06)] bg-white/88 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-5">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,_#172340,_#5267d9)] shadow-[0_16px_30px_rgba(82,103,217,0.18)]">
              <CreditCard className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-lg font-semibold tracking-tight text-[var(--ink)]">DigiCard</p>
              <p className="text-xs font-medium text-[var(--muted)]">Student-first networking cards</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-medium text-[var(--muted)] lg:flex">
            <a href="#live-preview" className="transition hover:text-[var(--ink)]">
              Preview
            </a>
            <a href="#why-it-matters" className="transition hover:text-[var(--ink)]">
              Why it matters
            </a>
            <a href="#how-it-works" className="transition hover:text-[var(--ink)]">
              How it works
            </a>
            <a href="#use-cases" className="transition hover:text-[var(--ink)]">
              Use cases
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <HomeAuthModal
              initiallyOpen={showAuthModal}
              buttonClassName="hidden rounded-full px-4 py-2 text-sm font-semibold text-[var(--muted)] transition hover:bg-[var(--soft)] hover:text-[var(--ink)] sm:inline-flex"
              callbackUrl="/dashboard"
            >
              <HomeAuthModalContent originPath="/" searchParams={resolvedSearchParams} />
            </HomeAuthModal>
            <Link
              href="/dashboard"
              className="hidden rounded-full bg-[var(--brand)] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_14px_28px_rgba(82,103,217,0.2)] transition hover:bg-[#4459cb] sm:inline-flex"
            >
              Create my card
            </Link>
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(25,35,61,0.08)] text-[var(--ink)] lg:hidden"
              aria-label="Open navigation"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 pb-10 pt-10 lg:pt-12">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.96fr]">
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
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-1.5 py-4 text-sm font-medium text-[var(--muted)] transition hover:text-[var(--ink)]"
              >
                See how it works
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

      <section id="why-it-matters" className="border-y border-[rgba(25,35,61,0.06)] bg-white/88">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <ScrollReveal className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end stagger-children">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--brand)]">Why this matters</p>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-[var(--ink)] sm:text-5xl">
                Great networking opportunities are often lost in small, awkward moments.
              </h2>
            </div>

            <div className="rounded-[1.9rem] border border-[rgba(82,103,217,0.12)] bg-[linear-gradient(135deg,_rgba(82,103,217,0.1),_rgba(255,255,255,0.96))] p-7 shadow-[0_18px_40px_rgba(21,32,58,0.05)] sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--brand)]">
                {networkingQuote.source}
              </p>
              <blockquote className="mt-3 max-w-3xl text-2xl font-semibold leading-tight tracking-[-0.04em] text-[var(--ink)] sm:text-[2rem]">
                &ldquo;{networkingQuote.line}&rdquo;
              </blockquote>
              <p className="mt-4 max-w-3xl text-base leading-7 text-[var(--muted)]">{networkingQuote.body}</p>
            </div>
          </ScrollReveal>

          <ScrollReveal className="mt-12 rounded-[2rem] border border-[rgba(25,35,61,0.08)] bg-[linear-gradient(180deg,_#ffffff_0%,_#f8faff_100%)] p-5 shadow-[0_22px_50px_rgba(21,32,58,0.06)] sm:p-7" delayMs={120}>
            <div className="grid gap-4 lg:grid-cols-2 stagger-children">
              {comparisonColumns.map((column) => (
                <div
                  key={column.label}
                  className={`rounded-[1.6rem] border px-5 py-5 ${
                    column.tone === "brand"
                      ? "border-[rgba(82,103,217,0.16)] bg-[linear-gradient(160deg,_rgba(82,103,217,0.12),_rgba(255,255,255,0.96))]"
                      : "border-[rgba(25,35,61,0.08)] bg-white"
                  }`}
                >
                  <p
                    className={`text-xs font-semibold uppercase tracking-[0.24em] ${
                      column.tone === "brand" ? "text-[var(--brand)]" : "text-[var(--muted)]"
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
                              ? "bg-[rgba(82,103,217,0.12)] text-[var(--brand)]"
                              : "bg-[var(--soft)] text-[var(--muted)]"
                          }`}
                        >
                          <CheckCircle2 className="h-4 w-4" />
                        </div>
                        <p className="text-sm leading-7 text-[var(--ink)]">{point}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section id="how-it-works" className="mx-auto max-w-7xl px-6 py-24">
        <ScrollReveal className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--brand)]">How it works</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-[var(--ink)] sm:text-5xl">
            A simple flow built for the way networking actually happens.
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--muted)]">
            Set up your card once, open it in seconds, and share it when the conversation matters most.
          </p>
        </ScrollReveal>

        <ScrollReveal className="mt-14 grid gap-5 lg:grid-cols-3 stagger-children">
          {steps.map((step) => (
            <article
              key={step.id}
              className="hover-lift relative overflow-hidden rounded-[1.9rem] border border-[rgba(25,35,61,0.07)] bg-white p-6 shadow-[0_18px_40px_rgba(21,32,58,0.05)] hover:shadow-[0_28px_56px_rgba(21,32,58,0.1)]"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,_#5267d9,_#8da0ff)]" />
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[rgba(82,103,217,0.1)] text-sm font-semibold text-[var(--brand)]">
                {step.id}
              </div>
              <h3 className="mt-6 text-2xl font-semibold tracking-[-0.04em] text-[var(--ink)]">{step.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{step.body}</p>
              {step.id !== "03" ? (
                <div className="mt-6 hidden items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand)] lg:inline-flex">
                  Next step
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              ) : null}
            </article>
          ))}
        </ScrollReveal>
      </section>

      <section className="border-y border-[rgba(25,35,61,0.06)] bg-[linear-gradient(180deg,_#ffffff_0%,_#f6f8ff_100%)]">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 py-24 lg:grid-cols-[0.92fr_1.08fr]">
          <ScrollReveal>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--brand)]">
              What your card includes
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-[var(--ink)] sm:text-5xl">
              Everything needed to make a strong first impression.
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-[var(--muted)]">
              Keep the essentials in one place so the person who scans your code can understand who you are and how to reach you immediately.
            </p>
          </ScrollReveal>

          <ScrollReveal className="grid gap-4 sm:grid-cols-2 stagger-children">
            {includedFeatures.map((item, index) => (
              <div
                key={item.title}
                className="hover-lift rounded-[1.5rem] border border-[rgba(25,35,61,0.07)] bg-white px-5 py-5 shadow-[0_16px_35px_rgba(21,32,58,0.05)] hover:shadow-[0_24px_48px_rgba(21,32,58,0.1)]"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--soft)] text-[var(--brand)]">
                    {index === 0 ? <UserRound className="h-4 w-4" /> : null}
                    {index === 1 ? <GraduationCap className="h-4 w-4" /> : null}
                    {index === 2 ? <BriefcaseBusiness className="h-4 w-4" /> : null}
                    {index === 3 ? <QrCode className="h-4 w-4" /> : null}
                  </div>
                  <p className="text-sm font-semibold text-[var(--ink)]">{item.title}</p>
                </div>
                <p className="mt-4 text-sm leading-7 text-[var(--muted)]">{item.description}</p>
              </div>
            ))}
          </ScrollReveal>
        </div>
      </section>

      <section id="use-cases" className="mx-auto max-w-7xl px-6 py-24">
        <ScrollReveal className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--brand)]">Use cases</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-[var(--ink)] sm:text-5xl">
            Built for the places where students meet real opportunities.
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--muted)]">
            DigiCard is designed for fast, in-person moments where a clean profile and quick QR share can make networking easier.
          </p>
        </ScrollReveal>

        <ScrollReveal className="mt-14 grid gap-5 lg:grid-cols-2 stagger-children">
          {useCaseDetails.map((item, index) => (
            <article
              key={item.title}
              className="hover-lift rounded-[1.9rem] border border-[rgba(25,35,61,0.07)] bg-white p-6 shadow-[0_18px_40px_rgba(21,32,58,0.05)] hover:shadow-[0_28px_56px_rgba(21,32,58,0.1)]"
            >
              <div className="flex items-center justify-between gap-4">
                <p className="text-lg font-semibold tracking-[-0.03em] text-[var(--ink)]">{item.title}</p>
                <span className="rounded-full bg-[rgba(82,103,217,0.1)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand)]">
                  0{index + 1}
                </span>
              </div>
              <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{item.copy}</p>
              <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand)]">
                Designed for quick follow-up
                <ArrowRight className="h-4 w-4" />
              </div>
            </article>
          ))}
        </ScrollReveal>
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

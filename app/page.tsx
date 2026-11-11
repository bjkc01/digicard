import Link from "next/link";
import { auth } from "@/auth";
import { InteractiveHeroPreview } from "@/components/landing/interactive-hero-preview";
import { PremiumHeader } from "@/components/landing/premium-header";
import { ScrollReveal } from "@/components/landing/scroll-reveal";
import { UseCasesTicketGrid } from "@/components/landing/use-cases-ticket-grid";
import type { LoginSearchParams } from "@/lib/login-flow";
import {
  ArrowRight,
  BriefcaseBusiness,
  GraduationCap,
  QrCode,
  SquareArrowOutUpRight,
  UserRound,
} from "lucide-react";

const steps = [
  {
    id: "01",
    title: "Create your profile",
    body: "Add your name, school or workplace, and a short description of what you do.",
  },
  {
    id: "02",
    title: "Add your links and details",
    body: "Choose which contact details and links to include on your card.",
  },
  {
    id: "03",
    title: "Choose a QR destination",
    body: "Link your QR code to a website, LinkedIn profile, or phone number.",
  },
];

const quickPoints = [
  "Make it: Add your name and where the QR should go.",
  'Show it: Open your card when someone asks for your details.',
  "Scan it: Their camera opens the destination you chose.",
];

const includedFeatures = [
  {
    description: "Include your name and a short bio so people know whose card they have.",
    title: "Name and bio",
  },
  {
    description: "Add your school, major, or job title.",
    title: "School or work",
  },
  {
    description: "Add links to your portfolio or LinkedIn profile so people can see your work.",
    title: "Website and LinkedIn",
  },
  {
    description: "Show your QR code on your phone for someone else to scan.",
    title: "QR code",
  },
] as const;

const useCaseDetails = [
  {
    copy: "Share your LinkedIn profile or portfolio with a recruiter after you talk.",
    title: "Career fairs",
  },
  {
    copy: "Exchange contact details with someone you meet at a talk or workshop.",
    title: "Events and conferences",
  },
  {
    copy: "Give teammates or judges a link to your project.",
    title: "Clubs and hackathons",
  },
  {
    copy: "Share your contact details with a client or colleague at the end of a meeting.",
    title: "Client meetings",
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
  const signedIn = Boolean((await auth())?.user);
  const showAuthModal = !signedIn && shouldOpenAuthModal(resolvedSearchParams);
  const AuthModalContent = showAuthModal
    ? (await import("@/components/login/home-auth-modal-content")).HomeAuthModalContent
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

      <section className="mx-auto max-w-7xl px-5 pb-16 pt-8 sm:px-8 lg:pt-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.96fr] lg:items-start">
          <div>
            <h1 className="anim-2 max-w-[34rem] text-[2.35rem] font-semibold leading-[1.08] tracking-[-0.06em] text-[var(--ink)] sm:text-[3.25rem] lg:text-[4rem]">
              Stop spelling your email out loud.
            </h1>

            <p className="anim-3 mt-5 max-w-[32rem] text-[0.98rem] leading-7 text-[var(--muted)] sm:text-[1.02rem]">
              Make a digital card with your name, contact details, and links to your work. Choose where your QR code leads, then show your card when you meet someone who wants to keep in touch.
            </p>

            <div className="anim-4 mt-6 grid gap-4 border-t border-[rgba(25,35,61,0.12)] pt-4 text-sm leading-6 text-[var(--ink)] sm:grid-cols-3">
              {quickPoints.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>

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
                <SquareArrowOutUpRight className="h-3.5 w-3.5" />
              </a>
            </div>

            <p className="anim-6 mt-4 text-xs text-[var(--muted)]">
              No app to download. It&apos;s just a link.
            </p>
          </div>

          <InteractiveHeroPreview />
        </div>
      </section>

      <section id="how-it-works" className="scroll-mt-24 mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:py-24 sm:scroll-mt-28">
        <ScrollReveal className="max-w-3xl">
          <h2 className="text-[2.2rem] font-semibold tracking-[-0.05em] text-[var(--ink)] sm:text-4xl lg:text-5xl">
            How to make your card
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--muted)]">
            Fill in your details and choose what your QR code opens.
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
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14 lg:py-24">
          <ScrollReveal>
            <h2 className="text-[2.2rem] font-semibold tracking-[-0.05em] text-[var(--ink)] sm:text-4xl lg:text-5xl">
              What goes on your card
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-[var(--muted)]">
              Choose the information you want to share. Your card can include:
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

      <section id="use-cases" className="scroll-mt-24 mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:py-24 sm:scroll-mt-28">
        <ScrollReveal className="max-w-3xl">
          <h2 className="text-[2.2rem] font-semibold tracking-[-0.05em] text-[var(--ink)] sm:text-4xl lg:text-5xl">
            Where you can use it
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--muted)]">
            Use your card whenever you need to exchange contact details, at work or on campus.
          </p>
        </ScrollReveal>

        <UseCasesTicketGrid items={useCaseDetails} />
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
        <ScrollReveal className="rounded-[2rem] border border-[rgba(255,255,255,0.18)] bg-[linear-gradient(135deg,_#172340_0%,_#2d4177_36%,_#5267d9_72%,_#8ca0ff_100%)] px-5 py-8 text-white shadow-[0_32px_80px_rgba(35,51,103,0.22)] sm:px-8 sm:py-10 md:px-12 md:py-14">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-white/60">Make a card</p>
              <h2 className="mt-4 text-[2.2rem] font-semibold tracking-[-0.05em] text-white sm:text-4xl lg:text-5xl">
                Put your details on a card.
              </h2>
              <p className="mt-5 text-lg leading-8 text-white/74">
                Add your information and choose a template. Open your card from your phone when you need it.
              </p>
              <div className="mt-6 flex flex-wrap gap-3 text-sm text-white/78">
                {["Contact details", "QR code", "Website links", "Card templates"].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/18 bg-white/10 px-4 py-2 font-medium backdrop-blur"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Link
                href="/dashboard"
                className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-semibold text-[var(--brand)] transition hover:bg-[#f2f5ff]"
              >
                Create my card
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#live-preview"
                className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-white/20 px-7 py-4 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                View live preview
              </a>
            </div>
          </div>
        </ScrollReveal>
      </section>
      <footer className="border-t border-slate-200 bg-white"><div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-8 text-sm sm:px-6"><Link href="/" className="font-semibold">DigiCard</Link><nav aria-label="Legal" className="flex gap-6 text-[var(--muted)]"><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></nav></div></footer>
    </main>
  );
}

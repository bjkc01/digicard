import Link from "next/link";
import { QRCode } from "@/components/ui/qr-code";
import {
  ArrowRight,
  Check,
  CreditCard,
  GraduationCap,
  Link2,
  Mail,
  Menu,
  QrCode,
  ScanLine,
  Sparkles,
  SquareArrowOutUpRight,
  UserRound,
} from "lucide-react";

const whyItMatters = [
  {
    title: "Real moments move fast",
    body: "Career fairs, speaker sessions, and networking events rarely give you more than a minute to make the connection.",
  },
  {
    title: "Awkward sharing breaks momentum",
    body: "Spelling your name, asking someone to search LinkedIn, or digging through your phone can make the moment feel clumsy.",
  },
  {
    title: "Follow-up gets harder later",
    body: "If the connection does not happen on the spot, it often gets lost once the event ends and everyone moves on.",
  },
];

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

const cardIncludes = [
  "Full name",
  "University",
  "Major or title",
  "LinkedIn",
  "Portfolio",
  "Resume",
  "Email and contact details",
  "QR share",
];

const useCases = [
  "Career fairs",
  "Campus networking events",
  "Club events",
  "Hackathons",
  "Alumni meetups",
  "Internship events",
];

const quickPoints = [
  "Share LinkedIn, resume, and portfolio with one scan",
  "Make a better first impression in short conversations",
  "Give recruiters and professionals an easy way to remember you",
];

const profileLinks = [
  { label: "LinkedIn", value: "linkedin.com/in/jordan-lee" },
  { label: "Portfolio", value: "jordanlee.design" },
  { label: "Resume", value: "View PDF" },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[var(--canvas)] text-[var(--ink)]">
      <div className="absolute inset-x-0 top-0 -z-10 h-[560px] bg-[radial-gradient(circle_at_top_left,_rgba(82,103,217,0.14),_transparent_34%),radial-gradient(circle_at_top_right,_rgba(255,141,87,0.12),_transparent_26%),linear-gradient(180deg,_#f8f9fd_0%,_#fbfbfd_58%,_#ffffff_100%)]" />

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
            <Link
              href="/login"
              className="hidden rounded-full px-4 py-2 text-sm font-semibold text-[var(--muted)] transition hover:bg-[var(--soft)] hover:text-[var(--ink)] sm:inline-flex"
            >
              Sign in
            </Link>
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

      <section className="mx-auto max-w-7xl px-6 pb-20 pt-16 lg:pt-20">
        <div className="grid items-center gap-16 lg:grid-cols-[1fr_0.95fr]">
          <div className="anim-1">
            <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(82,103,217,0.14)] bg-white/90 px-4 py-2 text-sm font-semibold text-[var(--ink)] shadow-[0_10px_24px_rgba(21,32,58,0.05)]">
              <Sparkles className="h-4 w-4 text-[var(--brand)]" />
              Made for career fairs, campus events, and networking meetups
            </div>

            <h1 className="mt-7 max-w-3xl text-[3.35rem] font-semibold leading-[0.98] tracking-[-0.06em] text-[var(--ink)] sm:text-[4.35rem] lg:text-[5rem]">
              Your professional profile, ready to share with one QR scan.
            </h1>

            <p className="mt-7 max-w-xl text-[1.05rem] leading-8 text-[var(--muted)] sm:text-[1.12rem]">
              Create a digital networking card that opens instantly and lets recruiters, alumni, speakers,
              and professionals view your LinkedIn, portfolio, resume, and contact details in one place.
            </p>

            <div className="mt-8 grid gap-3 text-sm text-[var(--ink)]">
              {quickPoints.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-2xl border border-[rgba(25,35,61,0.06)] bg-white/88 px-4 py-3 shadow-[0_10px_24px_rgba(21,32,58,0.04)]"
                >
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[rgba(82,103,217,0.12)]">
                    <Check className="h-4 w-4 text-[var(--brand)]" />
                  </div>
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-7 py-4 text-sm font-semibold text-[var(--ink)] shadow-[0_16px_34px_rgba(255,141,87,0.24)] transition hover:bg-[#ff9a67]"
              >
                Create my card
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[rgba(25,35,61,0.14)] bg-white/88 px-7 py-4 text-sm font-semibold text-[var(--ink)] transition hover:border-[rgba(82,103,217,0.3)] hover:text-[var(--brand)]"
              >
                See how it works
                <SquareArrowOutUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="anim-2 relative" id="live-preview">
            <div className="absolute -left-8 top-12 hidden h-32 w-32 rounded-full bg-[rgba(255,141,87,0.16)] blur-3xl lg:block" />
            <div className="absolute -right-6 bottom-2 hidden h-36 w-36 rounded-full bg-[rgba(82,103,217,0.16)] blur-3xl lg:block" />

            <div className="relative rounded-[2rem] border border-[rgba(25,35,61,0.08)] bg-[linear-gradient(180deg,_rgba(255,255,255,0.92),_rgba(244,247,255,0.94))] p-5 shadow-[0_30px_80px_rgba(18,31,66,0.14)]">
              <div className="rounded-[1.75rem] border border-[rgba(25,35,61,0.08)] bg-[#eef3ff] p-4">
                <div className="grid gap-4 lg:grid-cols-[0.84fr_1.06fr]">
                  <div className="rounded-[1.5rem] bg-[linear-gradient(165deg,_#172340_0%,_#2d4177_48%,_#5267d9_100%)] p-5 text-white shadow-[0_20px_40px_rgba(49,69,127,0.22)]">
                    <div className="flex items-center justify-between">
                      <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80">
                        <GraduationCap className="h-3.5 w-3.5" />
                        Student profile
                      </div>
                      <ScanLine className="h-4 w-4 text-white/72" />
                    </div>

                    <div className="mt-9">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/14">
                        <UserRound className="h-7 w-7 text-white" />
                      </div>
                      <h2 className="mt-5 text-2xl font-semibold tracking-[-0.04em]">Jordan Lee</h2>
                      <p className="mt-1 text-sm text-white/74">Computer Science Student</p>
                      <p className="mt-1 text-sm text-white/68">University of Maryland</p>
                      <p className="mt-4 max-w-[16rem] text-sm leading-6 text-white/74">
                        Looking for software engineering internships and student networking opportunities.
                      </p>
                    </div>

                    <div className="mt-8 rounded-[1.35rem] border border-white/12 bg-white/8 p-4">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/62">
                        Quick share
                      </p>
                      <div className="mt-3 flex items-center gap-4">
                        <div className="rounded-2xl bg-white p-3">
                          <QRCode value="https://digicard.app/jordan-lee" size={72} fgColor="#172340" />
                        </div>
                        <p className="max-w-[9rem] text-sm leading-6 text-white/74">
                          Scan to open Jordan&apos;s profile instantly.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="rounded-[1.45rem] border border-[rgba(25,35,61,0.08)] bg-white p-5 shadow-[0_16px_35px_rgba(21,32,58,0.06)]">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                        Live profile preview
                      </p>
                      <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-[var(--ink)]">
                        Everything someone needs after a quick conversation
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                        Open one profile with your core information already organized and ready to review.
                      </p>
                    </div>

                    <div className="rounded-[1.45rem] border border-[rgba(25,35,61,0.08)] bg-white p-5 shadow-[0_16px_35px_rgba(21,32,58,0.06)]">
                      <div className="grid gap-3 sm:grid-cols-2">
                        <div className="rounded-2xl bg-[var(--soft)] px-4 py-4">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                            Email
                          </p>
                          <p className="mt-2 text-sm font-medium text-[var(--ink)]">jordanlee@umaryland.edu</p>
                        </div>
                        <div className="rounded-2xl bg-[var(--soft)] px-4 py-4">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                            Focus
                          </p>
                          <p className="mt-2 text-sm font-medium text-[var(--ink)]">Software Engineering</p>
                        </div>
                      </div>

                      <div className="mt-4 grid gap-3">
                        {profileLinks.map((item) => (
                          <div
                            key={item.label}
                            className="flex items-center justify-between rounded-2xl border border-[rgba(25,35,61,0.07)] px-4 py-3"
                          >
                            <div>
                              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                                {item.label}
                              </p>
                              <p className="mt-1 text-sm font-medium text-[var(--ink)]">{item.value}</p>
                            </div>
                            <Link2 className="h-4 w-4 text-[var(--brand)]" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -left-8 bottom-10 hidden w-48 rounded-[1.5rem] border border-[rgba(25,35,61,0.08)] bg-white/96 p-4 shadow-[0_18px_32px_rgba(21,32,58,0.1)] xl:block">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">Event ready</p>
                <p className="mt-3 text-xl font-semibold tracking-[-0.04em] text-[var(--ink)]">No awkward searching</p>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                  Share one clean profile instead of spelling everything out.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="why-it-matters" className="border-y border-[rgba(25,35,61,0.06)] bg-white/88">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--brand)]">Why this matters</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-[var(--ink)] sm:text-5xl">
              Great networking opportunities are often lost in small, awkward moments.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--muted)]">
              Students and early professionals already do the hard part by showing up. The problem is making
              the connection feel easy while the moment is still there.
            </p>
          </div>

          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {whyItMatters.map((item) => (
              <article
                key={item.title}
                className="rounded-[1.75rem] border border-[rgba(25,35,61,0.07)] bg-white p-6 shadow-[0_18px_40px_rgba(21,32,58,0.05)]"
              >
                <h3 className="text-xl font-semibold tracking-[-0.03em] text-[var(--ink)]">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="mx-auto max-w-7xl px-6 py-24">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--brand)]">How it works</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-[var(--ink)] sm:text-5xl">
            A simple flow built for the way networking actually happens.
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--muted)]">
            Set up your card once, open it in seconds, and share it when the conversation matters most.
          </p>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {steps.map((step) => (
            <article
              key={step.id}
              className="rounded-[1.75rem] border border-[rgba(25,35,61,0.07)] bg-white p-6 shadow-[0_18px_40px_rgba(21,32,58,0.05)]"
            >
              <p className="text-sm font-semibold text-[var(--brand)]">{step.id}</p>
              <h3 className="mt-6 text-2xl font-semibold tracking-[-0.04em] text-[var(--ink)]">{step.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{step.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-[rgba(25,35,61,0.06)] bg-[linear-gradient(180deg,_#ffffff_0%,_#f6f8ff_100%)]">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 py-24 lg:grid-cols-[0.92fr_1.08fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--brand)]">
              What your card includes
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-[var(--ink)] sm:text-5xl">
              Everything needed to make a strong first impression.
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-[var(--muted)]">
              Keep the essentials in one place so the person who scans your code can understand who you are and how to reach you immediately.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {cardIncludes.map((item) => (
              <div
                key={item}
                className="rounded-[1.5rem] border border-[rgba(25,35,61,0.07)] bg-white px-5 py-5 shadow-[0_16px_35px_rgba(21,32,58,0.05)]"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--soft)] text-[var(--brand)]">
                    {item === "QR share" ? <QrCode className="h-4 w-4" /> : <Mail className="h-4 w-4" />}
                  </div>
                  <p className="text-sm font-semibold text-[var(--ink)]">{item}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="use-cases" className="mx-auto max-w-7xl px-6 py-24">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--brand)]">Use cases</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-[var(--ink)] sm:text-5xl">
            Built for the places where students meet real opportunities.
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--muted)]">
            DigiCard is designed for fast, in-person moments where a clean profile and quick QR share can make networking easier.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {useCases.map((item) => (
            <article
              key={item}
              className="rounded-[1.75rem] border border-[rgba(25,35,61,0.07)] bg-white p-6 shadow-[0_18px_40px_rgba(21,32,58,0.05)]"
            >
              <p className="text-lg font-semibold tracking-[-0.03em] text-[var(--ink)]">{item}</p>
              <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                Open your profile quickly, let someone scan it, and keep the connection moving naturally.
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="rounded-[2.2rem] bg-[linear-gradient(135deg,_#172340_0%,_#2d4177_44%,_#5267d9_100%)] px-8 py-10 text-white shadow-[0_32px_80px_rgba(35,51,103,0.22)] md:px-12 md:py-14">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-white/60">Final CTA</p>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-white sm:text-5xl">
                Make it easy for the next recruiter, alum, or speaker to remember you.
              </h2>
              <p className="mt-5 text-lg leading-8 text-white/74">
                Create a digital networking card that helps you show up professionally and share your profile in seconds.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center rounded-full bg-white px-7 py-4 text-sm font-semibold text-[var(--brand)] transition hover:bg-[#f2f5ff]"
              >
                Create my card
              </Link>
              <a
                href="#live-preview"
                className="inline-flex items-center justify-center rounded-full border border-white/20 px-7 py-4 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                View live preview
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

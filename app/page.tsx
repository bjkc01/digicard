import Link from "next/link";
import { auth } from "@/auth";
import { InteractiveHeroPreview } from "@/components/landing/interactive-hero-preview";
import { PremiumHeader } from "@/components/landing/premium-header";
import type { LoginSearchParams } from "@/lib/login-flow";
import { ArrowRight, ArrowUpRight, Check, QrCode, Sparkles } from "lucide-react";

const steps = [
  { title: "Make it yours", copy: "Add your name, what you do, and the details you want to share when you meet someone new." },
  { title: "Choose your destination", copy: "Point your QR code to your website, LinkedIn, or phone number. You decide where a scan goes." },
  { title: "Be ready to share", copy: "Pull up your card at a career fair, campus event, or any conversation worth continuing." },
];

const moments = [
  { title: "Career fairs", copy: "A quick way to share your work when every conversation counts." },
  { title: "Campus events", copy: "Meet someone interesting and make the next step easy." },
  { title: "Mentor meetups", copy: "Keep your introduction and the right link close at hand." },
];

type LandingPageProps = { searchParams?: Promise<LoginSearchParams> };

function shouldOpenAuthModal(params: LoginSearchParams) {
  return params.auth === "login" || Boolean(
    params.error || params.notice || params.method || params.step || params.email,
  );
}

export default async function LandingPage({ searchParams }: LandingPageProps) {
  const params = (await searchParams) ?? {};
  const signedIn = Boolean((await auth())?.user);
  const showAuthModal = !signedIn && shouldOpenAuthModal(params);
  const AuthModalContent = showAuthModal
    ? (await import("@/components/login/home-auth-modal-content")).HomeAuthModalContent
    : null;

  return (
    <main className="landing-editorial min-h-screen overflow-x-clip bg-[#f6f4ee] text-[#20261f]">
      <PremiumHeader showAuthModal={showAuthModal} signedIn={signedIn}>
        {AuthModalContent ? <AuthModalContent originPath="/" searchParams={params} /> : null}
      </PremiumHeader>

      <section className="relative overflow-hidden border-b border-[#d9d9ce]">
        <div className="landing-grid pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-[1440px] lg:min-h-[740px] lg:grid-cols-[0.95fr_1.05fr]">
          <div className="flex flex-col justify-between px-5 pb-12 pt-12 sm:px-10 sm:pt-16 lg:px-16 lg:pb-16 lg:pt-20">
            <div>
              <p className="landing-kicker flex items-center gap-3 text-[#696d62]">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#bd6348]" />
                YOUR INTRODUCTION, REIMAGINED
              </p>
              <h1 className="landing-display mt-8 max-w-[660px] text-[clamp(3.6rem,6.8vw,7rem)] leading-[0.96] tracking-[-0.065em]">
                Make an <em className="font-normal text-[#bd6348]">introduction</em> that stays.
              </h1>
              <p className="mt-8 max-w-[440px] text-base leading-[1.8] text-[#62675d] sm:text-lg">
                A digital networking card for the moments that open doors. Keep your details together, choose where your QR goes, and show up ready.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Link href="/dashboard" className="landing-button inline-flex min-h-14 items-center gap-8 rounded-full bg-[#253a32] px-7 text-sm font-semibold text-white transition hover:bg-[#38584a]">
                  {signedIn ? "Open my workspace" : "Create your card"} <ArrowUpRight className="h-4 w-4" />
                </Link>
                <a href="#how-it-works" className="inline-flex min-h-12 items-center gap-2 border-b border-[#898d82] text-sm font-semibold text-[#253a32] transition hover:border-[#bd6348] hover:text-[#bd6348]">
                  See how it works <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
            <div className="mt-14 flex items-center gap-4 border-t border-[#d9d9ce] pt-5 text-xs text-[#72766c] lg:mt-10">
              <span className="landing-kicker text-[#bd6348]">01 / 03</span>
              <span className="h-px w-9 bg-[#c8c9bb]" />
              <span>Made for the next hello.</span>
            </div>
          </div>
          <div className="relative flex items-center justify-center border-t border-[#d9d9ce] bg-[#e9e9df] px-5 py-12 sm:px-10 lg:border-l lg:border-t-0 lg:px-14 lg:py-16">
            <div className="landing-grid pointer-events-none absolute inset-0 opacity-55" aria-hidden="true" />
            <InteractiveHeroPreview />
          </div>
        </div>
      </section>

      <section className="border-b border-[#d9d9ce] bg-[#fdfcf8]">
        <div className="mx-auto grid max-w-[1440px] gap-6 px-5 py-7 text-sm text-[#4e564c] sm:grid-cols-3 sm:px-10 lg:px-16">
          {["One card for your essentials", "A QR with a destination you choose", "Ready for real-life conversations"].map((item) => (
            <div key={item} className="flex items-center gap-3"><Check className="h-4 w-4 flex-none text-[#bd6348]" />{item}</div>
          ))}
        </div>
      </section>

      <section id="how-it-works" className="scroll-mt-24 px-5 py-20 sm:px-10 sm:py-28 lg:px-16">
        <div className="mx-auto max-w-[1312px]">
          <div className="grid gap-8 lg:grid-cols-[0.7fr_1fr] lg:gap-20">
            <p className="landing-kicker flex items-start gap-3 pt-2 text-[#bd6348]"><Sparkles className="h-4 w-4" /> THE SIMPLE PART</p>
            <div>
              <h2 className="landing-display max-w-[780px] text-[clamp(2.8rem,5vw,5.5rem)] leading-[1.03] tracking-[-0.055em]">A better way to be <em className="font-normal text-[#bd6348]">remembered.</em></h2>
              <p className="mt-6 max-w-xl leading-8 text-[#62675d]">Your card keeps the essentials close. Getting started takes just a few steps.</p>
            </div>
          </div>
          <div className="mt-14 grid border-t border-[#cdd0c3] md:grid-cols-3">
            {steps.map((step, index) => (
              <article key={step.title} className="border-b border-[#cdd0c3] px-1 py-9 md:border-r md:px-7 md:py-11 md:last:border-r-0 lg:px-10 first:md:pl-0">
                <span className="landing-kicker text-[#bd6348]">0{index + 1} / 03</span>
                <h3 className="landing-display mt-12 text-3xl tracking-[-0.04em] sm:text-4xl">{step.title}</h3>
                <p className="mt-4 max-w-sm text-sm leading-7 text-[#62675d]">{step.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="use-cases" className="scroll-mt-24 bg-[#253a32] px-5 py-20 text-[#f8f6ef] sm:px-10 sm:py-28 lg:px-16">
        <div className="mx-auto max-w-[1312px]">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="landing-kicker text-[#dbad99]">WHERE CONNECTIONS BEGIN</p>
              <h2 className="landing-display mt-6 max-w-[750px] text-[clamp(2.8rem,5vw,5.5rem)] leading-[1.02] tracking-[-0.055em]">Made for moments that matter.</h2>
            </div>
            <p className="max-w-[280px] text-sm leading-7 text-[#c1c9be]">A simple way to carry your introduction wherever opportunity shows up.</p>
          </div>
          <div className="mt-14 grid gap-px border border-[#607367] bg-[#607367] md:grid-cols-3">
            {moments.map((moment, index) => (
              <article key={moment.title} className="group min-h-[270px] bg-[#253a32] p-7 transition hover:bg-[#30483b] sm:p-9">
                <div className="flex items-start justify-between"><span className="landing-kicker text-[#dbad99]">0{index + 1} / 03</span><ArrowUpRight className="h-5 w-5 text-[#a8baaa] transition group-hover:translate-x-1 group-hover:-translate-y-1" /></div>
                <h3 className="landing-display mt-16 text-3xl tracking-[-0.03em] sm:text-4xl">{moment.title}</h3>
                <p className="mt-4 max-w-xs text-sm leading-7 text-[#c1c9be]">{moment.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-10 sm:py-28 lg:px-16">
        <div className="mx-auto flex max-w-[1312px] flex-col gap-9 border-b border-[#cdd0c3] pb-20 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="landing-kicker flex items-center gap-3 text-[#bd6348]"><QrCode className="h-4 w-4" /> YOUR NEXT INTRODUCTION</p>
            <h2 className="landing-display mt-6 max-w-[850px] text-[clamp(3.2rem,6vw,6.5rem)] leading-[0.98] tracking-[-0.06em]">Have your card <em className="font-normal text-[#bd6348]">ready.</em></h2>
          </div>
          <Link href="/dashboard" className="landing-button inline-flex min-h-14 flex-none items-center justify-between gap-8 self-start rounded-full bg-[#253a32] px-7 text-sm font-semibold text-white transition hover:bg-[#38584a] md:self-auto">
            {signedIn ? "Open my workspace" : "Create your card"} <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <footer className="px-5 pb-9 text-sm text-[#62675d] sm:px-10 lg:px-16">
        <div className="mx-auto flex max-w-[1312px] flex-wrap items-center justify-between gap-5">
          <Link href="/" className="font-bold tracking-tight text-[#253a32]">DigiCard<span className="text-[#bd6348]">.</span></Link>
          <span>Make an introduction that stays.</span>
          <nav aria-label="Legal" className="flex gap-6"><Link className="hover:text-[#bd6348]" href="/privacy">Privacy</Link><Link className="hover:text-[#bd6348]" href="/terms">Terms</Link></nav>
        </div>
      </footer>
    </main>
  );
}

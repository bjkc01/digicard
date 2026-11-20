import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, Check, Wallet } from "lucide-react";
import QRCode from "react-qr-code";
import { templates } from "@/backend/data";
import { siteConfig } from "@/backend/site-config";
import { ScrollReveal } from "@/frontend/landing/scroll-reveal";

// Homepage "How it works": the three things you actually do in DigiCard, each with a small sketch
// of the real interface. The sketches are decorative; the steps read in order, joined by a line.

const fieldClass = "flex items-center rounded-xl border border-[rgba(25,35,61,0.08)] bg-white px-3 py-2 text-[13px]";

function DetailsSketch() {
  return (
    <div className="space-y-2" aria-hidden="true">
      <div className={`${fieldClass} font-medium text-[var(--ink)]`}>
        Jordan Lin<span className="ml-px h-4 w-px animate-pulse bg-[var(--brand)]" />
      </div>
      <div className={`${fieldClass} text-[var(--muted)]`}>Computer Science · State University</div>
      <div className={`${fieldClass} text-[var(--muted)]`}>linkedin.com/in/jordanlin</div>
    </div>
  );
}

function DesignSketch() {
  return (
    <div aria-hidden="true">
      <p className="text-[11px] font-medium text-[var(--muted)]">A scan opens</p>
      <div className="mt-1.5 grid grid-cols-3 gap-1 rounded-xl border border-[rgba(25,35,61,0.08)] bg-white p-1 text-[12px] font-semibold">
        <span className="flex items-center justify-center gap-1 rounded-lg bg-[var(--brand)] py-1.5 text-white"><Check className="h-3 w-3" /> LinkedIn</span>
        <span className="py-1.5 text-center text-[var(--muted)]">Website</span>
        <span className="py-1.5 text-center text-[var(--muted)]">Phone</span>
      </div>
      <p className="mt-3 text-[11px] font-medium text-[var(--muted)]">Design</p>
      <div className="mt-1.5 flex gap-2">
        {templates.slice(0, 6).map((template, index) => (
          <span
            className={`h-7 w-7 rounded-full bg-gradient-to-br ${template.accent} ${index === 3 ? "ring-2 ring-[var(--brand)] ring-offset-2" : ""}`}
            key={template.id}
          />
        ))}
      </div>
    </div>
  );
}

function ShareSketch() {
  return (
    <div className="flex items-center gap-3" aria-hidden="true">
      <div className="shrink-0 rounded-xl border border-[rgba(25,35,61,0.08)] bg-white p-2">
        <QRCode bgColor="#ffffff" fgColor="#19233d" size={64} value={siteConfig.url} />
      </div>
      <ArrowRight className="h-4 w-4 shrink-0 text-[var(--muted)]" />
      <div className="min-w-0 flex-1 space-y-2">
        <div className="rounded-xl border border-[rgba(25,35,61,0.08)] bg-white px-3 py-2">
          <p className="truncate text-[13px] font-semibold text-[var(--ink)]">Jordan Lin</p>
          <p className="truncate text-[11px] text-[var(--muted)]">Opened on their phone</p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-black px-2.5 py-1 text-[11px] font-semibold text-white">
          <Wallet className="h-3 w-3" /> Apple Wallet
        </span>
      </div>
    </div>
  );
}

const steps: { title: string; body: string; sketch: ReactNode }[] = [
  {
    title: "Add your details",
    body: "Type your name, what you study or do, and the links you want people to have: LinkedIn, website, email, phone.",
    sketch: <DetailsSketch />,
  },
  {
    title: "Pick a design",
    body: `Choose one of ${templates.length} designs, then decide what a scan opens: your LinkedIn, your website, or your phone number. You can change either later.`,
    sketch: <DesignSketch />,
  },
  {
    title: "Hold up your phone",
    body: "They point their camera at your QR code and your card opens on their phone. You can also add the card to Apple Wallet so it's quick to pull up.",
    sketch: <ShareSketch />,
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-24 mx-auto max-w-7xl px-4 pb-10 pt-10 sm:scroll-mt-28 sm:px-6 sm:pb-12 lg:pb-14 lg:pt-12">
      <ScrollReveal className="max-w-3xl">
        <h2 className="text-[2.2rem] font-semibold tracking-[-0.05em] text-[var(--ink)] sm:text-4xl lg:text-5xl">
          Three steps to set up your card
        </h2>
      </ScrollReveal>

      <ScrollReveal className="mt-14">
        <ol className="grid gap-10 lg:grid-cols-3 lg:gap-5 stagger-children">
          {steps.map((step, index) => (
            <li className="flex flex-col" key={step.title}>
              <div className="flex items-center gap-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[var(--ink)] text-sm font-semibold text-white">{index + 1}</span>
                <h3 className="text-base font-semibold tracking-[-0.02em] text-[var(--ink)]">{step.title}</h3>
                {/* Line joining this step to the next, running across the gap on wide screens. */}
                {index < steps.length - 1 ? (
                  <span aria-hidden="true" className="hidden flex-1 border-t border-dashed border-[rgba(25,35,61,0.2)] lg:-mr-5 lg:ml-1 lg:block" />
                ) : null}
              </div>
              <article className="mt-4 flex flex-1 flex-col rounded-[1.75rem] border border-[rgba(25,35,61,0.07)] bg-white p-5 shadow-[0_18px_40px_rgba(21,32,58,0.05)]">
                <div className="flex min-h-[148px] flex-col justify-center rounded-[1.25rem] bg-[#f4f6fb] p-4">{step.sketch}</div>
                <p className="mt-5 text-sm leading-6 text-[var(--muted)]">{step.body}</p>
              </article>
            </li>
          ))}
        </ol>
      </ScrollReveal>

      <Link
        href="/dashboard"
        className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand)] transition hover:text-[var(--brand-dark)]"
      >
        Start with step 1 <ArrowRight className="h-4 w-4" />
      </Link>
    </section>
  );
}

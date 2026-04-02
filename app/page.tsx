import { Button } from "@/components/ui/button";
import { featureItems, templates } from "@/lib/data";

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col px-6 py-8 lg:px-8">
          <header className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-sm font-bold text-white">
                DC
              </div>
              <div>
                <p className="text-base font-semibold text-slate-900">DigiCard</p>
                <p className="text-sm text-slate-500">Digital professional cards</p>
              </div>
            </div>
            <div className="hidden items-center gap-6 sm:flex">
              <a href="#features" className="text-sm font-medium text-slate-600 transition hover:text-slate-900">
                Features
              </a>
              <a href="#templates" className="text-sm font-medium text-slate-600 transition hover:text-slate-900">
                Templates
              </a>
              <Button href="/dashboard">Get Started</Button>
            </div>
          </header>

          <div className="grid items-center gap-16 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
            <div className="max-w-2xl">
              <p className="eyebrow">Modern networking for professionals</p>
              <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-950 md:text-6xl">
                Create Your Digital Professional Card
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
                Create a professional card your team can share with a QR code, keep up to
                date in one place, and use across meetings, events, and follow-ups.
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Button href="/dashboard" className="px-6">
                  Get Started
                </Button>
                <Button href="/templates" variant="secondary" className="px-6">
                  View Templates
                </Button>
              </div>
              <div className="mt-12 grid max-w-xl gap-6 border-t border-slate-200 pt-8 sm:grid-cols-3">
                {[
                  ["12k+", "monthly shares"],
                  ["3 min", "average setup"],
                  ["99.9%", "link availability"],
                ].map(([value, label]) => (
                  <div key={label}>
                    <p className="text-2xl font-semibold tracking-tight text-slate-900">{value}</p>
                    <p className="mt-1 text-sm text-slate-500">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="panel overflow-hidden p-0">
              <div className="border-b border-slate-200 bg-slate-50 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Published card</p>
                    <p className="mt-1 text-sm text-slate-500">Preview of a live profile</p>
                  </div>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-600">
                    Active
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="rounded-[28px] border border-slate-200 bg-white">
                  <div className="h-2 rounded-t-[28px] bg-slate-900" />
                  <div className="space-y-8 p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-2xl font-semibold tracking-tight text-slate-900">
                          Sofia Bennett
                        </p>
                        <p className="mt-1 text-sm text-slate-600">
                          Founder & Growth Advisor
                        </p>
                        <p className="mt-1 text-sm text-slate-500">DigiCard</p>
                      </div>
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-xs font-semibold tracking-[0.22em] text-slate-500">
                        QR
                      </div>
                    </div>

                    <div className="grid gap-3 text-sm text-slate-600">
                      <div className="rounded-2xl bg-slate-50 px-4 py-3">sofia@digicard.app</div>
                      <div className="rounded-2xl bg-slate-50 px-4 py-3">+1 (212) 555-0147</div>
                      <div className="rounded-2xl bg-slate-50 px-4 py-3">linkedin.com/in/sofiabennett</div>
                      <div className="rounded-2xl bg-slate-50 px-4 py-3">digicard.app</div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  {[
                    ["Share", "Send a single link or QR code."],
                    ["Update", "Edit details without replacing the card."],
                    ["Track", "See scans and profile activity."],
                  ].map(([title, copy]) => (
                    <div key={title} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <p className="text-sm font-semibold text-slate-900">{title}</p>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{copy}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-6xl px-6 py-24 lg:px-8">
        <div className="max-w-2xl">
          <p className="eyebrow">Core features</p>
          <h2 className="section-title mt-4">Built for professional first impressions</h2>
          <p className="section-copy mt-5">
            DigiCard gives teams a simple way to publish contact details, keep them
            current, and share them in a format that looks consistent everywhere.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {featureItems.map((feature) => (
            <article key={feature.title} className="subtle-panel p-6">
              <h3 className="text-lg font-semibold text-slate-900">{feature.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{feature.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="templates" className="mx-auto max-w-6xl px-6 pb-24 lg:px-8">
        <div className="panel overflow-hidden p-8 md:p-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="eyebrow">Templates</p>
              <h2 className="section-title mt-4">Choose a layout that matches your brand</h2>
              <p className="section-copy mt-5">
                Start from a small set of clean templates with restrained color, clear
                typography, and enough flexibility for different teams.
              </p>
            </div>
            <Button href="/templates" variant="secondary">
              View all templates
            </Button>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {templates.slice(0, 3).map((template) => (
              <div key={template.id} className="rounded-[24px] border border-slate-200 bg-slate-50 p-4">
                <div className={`h-44 rounded-[20px] bg-gradient-to-br ${template.accent} p-5 text-white`}>
                  <div className="flex h-full flex-col justify-between rounded-[16px] border border-white/15 bg-black/10 p-4">
                    <span className="text-xs font-medium uppercase tracking-[0.2em]">
                      {template.name}
                    </span>
                    <p className="max-w-[13rem] text-base font-semibold leading-6">
                      {template.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>(c) 2026 DigiCard. Professional digital cards for modern teams.</p>
          <div className="flex gap-5">
            <a href="#" className="transition hover:text-slate-900">
              Privacy
            </a>
            <a href="#" className="transition hover:text-slate-900">
              Terms
            </a>
            <a href="#" className="transition hover:text-slate-900">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}

import { Button } from "@/components/ui/button";
import { SectionBadge } from "@/components/ui/section-badge";
import { featureItems, templates } from "@/lib/data";

export default function LandingPage() {
  return (
    <main className="overflow-hidden">
      <section className="relative border-b border-slate-200/80">
        <div className="absolute inset-0 bg-hero-grid bg-[size:48px_48px] opacity-60" />
        <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-8 lg:px-10">
          <header className="flex items-center justify-between py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-sm font-bold text-white">
                DC
              </div>
              <div>
                <p className="text-lg font-semibold text-slate-900">DigiCard</p>
                <p className="text-sm text-slate-500">Digital business cards</p>
              </div>
            </div>
            <div className="hidden items-center gap-3 sm:flex">
              <Button href="/templates" variant="ghost">
                Browse Templates
              </Button>
              <Button href="/dashboard">Get Started</Button>
            </div>
          </header>

          <div className="grid flex-1 items-center gap-14 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
            <div className="max-w-2xl">
              <SectionBadge>Professional identity, reimagined</SectionBadge>
              <h1 className="mt-8 text-5xl font-semibold tracking-tight text-slate-950 md:text-6xl">
                Create Your Digital Professional Card
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
                Share your contact details through a polished digital card with QR codes,
                modern templates, and instant updates that make networking effortless.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Button href="/dashboard" className="px-7">
                  Get Started
                </Button>
                <Button href="/create-card" variant="secondary" className="px-7">
                  Design a Card
                </Button>
              </div>
              <div className="mt-10 flex flex-wrap gap-6 text-sm text-slate-500">
                <div>
                  <p className="text-2xl font-semibold text-slate-900">12k+</p>
                  <p>cards shared monthly</p>
                </div>
                <div>
                  <p className="text-2xl font-semibold text-slate-900">4.9/5</p>
                  <p>average team satisfaction</p>
                </div>
                <div>
                  <p className="text-2xl font-semibold text-slate-900">3 min</p>
                  <p>to publish a new card</p>
                </div>
              </div>
            </div>

            <div className="panel mx-auto w-full max-w-xl p-5">
              <div className="rounded-[32px] border border-slate-200 bg-slate-50 p-4">
                <div className="rounded-[28px] bg-gradient-to-br from-slate-950 via-slate-900 to-blue-700 p-5 text-white shadow-2xl">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold uppercase tracking-[0.28em]">
                      DigiCard
                    </span>
                    <div className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em]">
                      Live QR
                    </div>
                  </div>

                  <div className="mt-16">
                    <p className="text-3xl font-semibold">Sofia Bennett</p>
                    <p className="mt-2 text-base text-blue-100">
                      Founder & Growth Advisor at DigiCard
                    </p>
                  </div>

                  <div className="mt-12 grid gap-3 text-sm text-slate-200 sm:grid-cols-2">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      sofia@digicard.app
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      linkedin.com/in/sofiabennett
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      +1 (212) 555-0147
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      digicard.app
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                {["Scan to connect", "Save instantly", "Always updated"].map((item) => (
                  <div key={item} className="rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-600">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="max-w-2xl">
          <SectionBadge>Core features</SectionBadge>
          <h2 className="section-title mt-6">Built for polished first impressions</h2>
          <p className="section-copy mt-5">
            DigiCard helps teams and individuals present a clean professional profile
            with flexible templates and instant sharing tools.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {featureItems.map((feature) => (
            <article key={feature.title} className="panel p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-sm font-semibold text-blue-700">
                {feature.title.slice(0, 2).toUpperCase()}
              </div>
              <h3 className="mt-6 text-xl font-semibold text-slate-900">{feature.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{feature.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-10">
        <div className="panel overflow-hidden p-8 md:p-10">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <SectionBadge>Template spotlight</SectionBadge>
              <h2 className="section-title mt-6">Choose a look that matches your brand</h2>
              <p className="section-copy mt-5">
                Start from thoughtfully designed templates and customize the details that
                matter without cluttering the experience.
              </p>
            </div>
            <Button href="/templates" variant="secondary">
              View all templates
            </Button>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {templates.slice(0, 3).map((template) => (
              <div key={template.id} className="rounded-[28px] border border-slate-200 bg-slate-50 p-4">
                <div className={`h-52 rounded-[24px] bg-gradient-to-br ${template.accent} p-5 text-white`}>
                  <div className="flex h-full flex-col justify-between rounded-[18px] border border-white/20 bg-white/10 p-4">
                    <span className="text-xs font-semibold uppercase tracking-[0.24em]">
                      {template.name}
                    </span>
                    <p className="max-w-[12rem] text-lg font-semibold">{template.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200/80">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between lg:px-10">
          <p>© 2026 DigiCard. Modern digital business cards for professional teams.</p>
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

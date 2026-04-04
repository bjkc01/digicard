import { CardsSection } from "@/components/cards/cards-section";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  return (
    <main className="mx-auto grid max-w-7xl gap-6 px-4 py-4 lg:grid-cols-[280px_minmax(0,1fr)] lg:px-6 lg:py-6">
      <Sidebar activePath="/dashboard" />

      <section className="space-y-6">
        <DashboardHeader />

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
          <div className="panel p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="eyebrow">Dashboard</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
                  Your digital cards
                </h2>
                <p className="mt-2 text-sm text-slate-500">
                  Manage published profiles, duplicate templates, and keep details current.
                </p>
              </div>
              <Button href="/create-card">Create New Card</Button>
            </div>

            <CardsSection />
          </div>

          <div className="space-y-6">
            <div className="panel p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-slate-900">Profile performance</p>
                  <p className="mt-1 text-sm text-slate-500">Weekly engagement snapshot</p>
                </div>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                  +18.4%
                </span>
              </div>

              <div className="mt-8 space-y-3">
                {[
                  ["842", "Card opens"],
                  ["214", "QR scans"],
                  ["56", "New saves"],
                ].map(([value, label]) => (
                  <div
                    key={label}
                    className="flex items-center justify-between rounded-2xl bg-slate-50 p-4"
                  >
                    <p className="text-sm font-medium text-slate-600">{label}</p>
                    <p className="text-xl font-semibold text-slate-900">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            <QuickActions />
          </div>
        </div>
      </section>
    </main>
  );
}

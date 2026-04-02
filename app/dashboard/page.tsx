import { CardTile } from "@/components/digicard/card-tile";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { Sidebar } from "@/components/layout/sidebar";
import { Button } from "@/components/ui/button";
import { cards } from "@/lib/data";

export default function DashboardPage() {
  return (
    <main className="mx-auto grid max-w-7xl gap-6 px-4 py-4 lg:grid-cols-[280px_minmax(0,1fr)] lg:px-6 lg:py-6">
      <Sidebar activePath="/dashboard" />

      <section className="space-y-6">
        <DashboardHeader />

        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="panel p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.22em] text-slate-400">
                  Dashboard
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
                  Your digital cards
                </h2>
              </div>
              <Button href="/create-card">Create New Card</Button>
            </div>

            <div id="cards" className="mt-8 grid gap-5 md:grid-cols-2">
              {cards.map((card) => (
                <CardTile key={card.id} card={card} />
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="panel p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-900">Profile performance</p>
                  <p className="mt-1 text-sm text-slate-500">Weekly engagement snapshot</p>
                </div>
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                  +18%
                </span>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {[
                  ["842", "Card opens"],
                  ["214", "QR scans"],
                  ["56", "New saves"],
                ].map(([value, label]) => (
                  <div key={label} className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-2xl font-semibold text-slate-900">{value}</p>
                    <p className="mt-2 text-sm text-slate-500">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div id="settings" className="panel p-6">
              <p className="text-sm font-medium uppercase tracking-[0.22em] text-slate-400">
                Quick actions
              </p>
              <div className="mt-5 space-y-3">
                {[
                  "Update company branding",
                  "Generate new QR assets",
                  "Invite a team member",
                ].map((action) => (
                  <button
                    key={action}
                    className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-4 text-left text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:text-slate-900"
                  >
                    {action}
                    <span className="text-slate-400">→</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

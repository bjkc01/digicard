import { QrCode, ScanLine, UserRound } from "lucide-react";
import { devAuthBypassEnabled } from "@/auth";
import { CardsSection } from "@/components/cards/cards-section";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Button } from "@/components/ui/button";
import { requireWorkspaceUser } from "@/lib/workspace-auth";

const metrics = [
  { value: "842", label: "Card opens", icon: UserRound },
  { value: "214", label: "QR scans", icon: QrCode },
  { value: "56", label: "New saves", icon: ScanLine },
];

export default async function DashboardPage() {
  await requireWorkspaceUser("/dashboard");

  return (
    <main className="mx-auto grid max-w-7xl gap-6 px-4 py-4 lg:grid-cols-[280px_minmax(0,1fr)] lg:px-6 lg:py-6">
      <Sidebar activePath="/dashboard" />

      <section className="space-y-6">
        <DashboardHeader />

        {devAuthBypassEnabled ? (
          <div className="rounded-[1.6rem] border border-[rgba(16,185,129,0.16)] bg-[rgba(236,253,245,0.9)] px-5 py-4 text-sm text-[#065f46] shadow-[0_12px_30px_rgba(16,185,129,0.08)]">
            Preview mode is enabled in local development, so this dashboard is temporarily visible without sign-in.
          </div>
        ) : null}

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
          <div className="panel border-[rgba(82,103,217,0.08)] bg-[linear-gradient(180deg,_rgba(255,255,255,0.94),_rgba(244,247,255,0.92))] p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="eyebrow text-[var(--brand)]">Dashboard</p>
                <h2 className="mt-2 max-w-[34rem] text-[2rem] font-semibold tracking-tight text-[var(--ink)]">
                  Your active networking cards
                </h2>
                <p className="mt-2 max-w-xl text-[0.98rem] leading-7 text-[var(--muted)]">
                  Manage the cards you share at career fairs, campus events, and networking sessions.
                </p>
              </div>
              <Button
                href="/create-card"
                className="rounded-full bg-[var(--brand)] px-5 py-3 text-white shadow-[0_16px_34px_rgba(82,103,217,0.22)] hover:bg-[#4459cb]"
              >
                Create New Card
              </Button>
            </div>

            <CardsSection />
          </div>

          <div className="space-y-6">
            <div className="panel border-[rgba(82,103,217,0.08)] bg-white p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-[var(--ink)]">Profile performance</p>
                  <p className="mt-1 text-sm text-[var(--muted)]">Weekly engagement snapshot</p>
                </div>
                <span className="rounded-full bg-[rgba(82,103,217,0.1)] px-3 py-1 text-xs font-semibold text-[var(--brand)]">
                  +18.4%
                </span>
              </div>

              <div className="mt-8 space-y-3">
                {metrics.map(({ value, label, icon: Icon }) => (
                  <div
                    key={label}
                    className="flex items-center justify-between rounded-[1.35rem] bg-[var(--soft)] p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-[var(--brand)] shadow-[0_10px_22px_rgba(21,32,58,0.05)]">
                        <Icon className="h-4 w-4" />
                      </div>
                      <p className="text-sm font-medium text-[var(--muted)]">{label}</p>
                    </div>
                    <p className="text-xl font-semibold text-[var(--ink)]">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="panel overflow-hidden border-[rgba(82,103,217,0.08)] bg-[linear-gradient(135deg,_#172340_0%,_#2d4177_44%,_#5267d9_100%)] p-6 text-white shadow-[0_24px_54px_rgba(35,51,103,0.22)]">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/58">
                Career Flow
              </p>
              <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em]">
                Keep one card ready for every opportunity.
              </h3>
              <p className="mt-3 text-sm leading-7 text-white/72">
                Update your profile once, then open the same polished card during fairs, mentor chats, and recruiter conversations.
              </p>
              <Button
                href="/create-card"
                variant="secondary"
                className="mt-6 rounded-full border-white/15 bg-white text-[var(--brand)] hover:bg-[#f4f6ff]"
              >
                Refresh my card
              </Button>
            </div>

            <QuickActions />
          </div>
        </div>
      </section>
    </main>
  );
}

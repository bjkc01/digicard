import { UserRound } from "lucide-react";
import { devAuthBypassEnabled } from "@/auth";
import { CardsSection } from "@/components/cards/cards-section";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { Sidebar } from "@/components/dashboard/sidebar";
import { WalletComingSoon } from "@/components/dashboard/wallet-coming-soon";
import { Button } from "@/components/ui/button";
import { requireWorkspaceUser } from "@/lib/workspace-auth";
import { getWorkspaceView } from "@/lib/workspace-view";

export default async function DashboardPage() {
  const workspaceUser = await requireWorkspaceUser("/dashboard");
  const workspaceView = await getWorkspaceView(workspaceUser);
  const displayName = workspaceView.settings.profile.name || workspaceUser.name;
  const displayEmail = workspaceView.settings.profile.email || workspaceUser.email;
  const avatarUrl = workspaceView.settings.profile.avatarUrl;
  const hasActiveCard = workspaceView.summary.activeCardCount > 0;
  const activeCardCount = workspaceView.summary.activeCardCount;
  const profileCompletion = workspaceView.summary.profileCompletion;
  const profileChecksCompleted = workspaceView.summary.profileChecksCompleted;
  const profileChecksTotal = workspaceView.summary.profileChecksTotal;
  const metrics = [
    {
      icon: UserRound,
      label: "Setup progress",
      value: `${profileCompletion}%`,
      helper: `${profileChecksCompleted} of ${profileChecksTotal} setup checks done: name, email, title, company, link, phone, QR target, template, and one saved card.`,
      progress: profileCompletion,
    },
  ];

  return (
    <main className="mx-auto grid w-full max-w-7xl min-w-0 gap-4 px-3 py-3 sm:px-4 sm:py-4 lg:gap-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:px-6 lg:py-6">
      <Sidebar
        activePath="/dashboard"
        avatarUrl={avatarUrl}
        email={displayEmail}
        userName={displayName}
      />

      <section className="min-w-0 space-y-4 sm:space-y-6">
        <DashboardHeader
          avatarUrl={avatarUrl}
          email={displayEmail}
          userName={displayName}
        />

        {devAuthBypassEnabled ? (
          <div className="rounded-[1.6rem] border border-[rgba(16,185,129,0.16)] bg-[rgba(236,253,245,0.9)] px-5 py-4 text-sm text-[#065f46] shadow-[0_12px_30px_rgba(16,185,129,0.08)]">
            Preview mode is enabled in local development, so this dashboard is temporarily visible without sign-in.
          </div>
        ) : null}

        <div className="grid min-w-0 gap-4 sm:gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
          <div className="panel border-[rgba(82,103,217,0.08)] bg-[linear-gradient(180deg,_rgba(255,255,255,0.94),_rgba(244,247,255,0.92))] p-5 sm:p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h2 className="max-w-[34rem] text-[2rem] font-semibold tracking-tight text-[var(--ink)]">
                  Your saved cards
                </h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded-full border border-[rgba(82,103,217,0.14)] bg-white px-3 py-1 text-xs font-semibold text-[var(--brand)] shadow-[0_8px_20px_rgba(21,32,58,0.04)]">
                    {workspaceView.summary.cardStatusLabel}
                  </span>
                  {hasActiveCard ? (
                    <span className="rounded-full border border-[rgba(82,103,217,0.1)] bg-[var(--soft)] px-3 py-1 text-xs font-medium text-[var(--muted)]">
                      Last saved {workspaceView.summary.lastUpdatedLabel}
                    </span>
                  ) : null}
                </div>
              </div>
              <Button
                href={hasActiveCard ? "/create-card?cardId=new" : "/create-card"}
                className="whitespace-nowrap rounded-full bg-[var(--brand)] px-5 py-3 text-white shadow-[0_16px_34px_rgba(82,103,217,0.22)] hover:bg-[#4459cb]"
              >
                {hasActiveCard ? "+ Add card" : "Create first card"}
              </Button>
            </div>

            <CardsSection
              cards={workspaceView.cards}
              emptyDescription="Finish your details to create your first card."
              emptyTitle="No saved cards yet"
              showAddButton={false}
              showEmptyButton={false}
            />
          </div>

          <div className="min-w-0 space-y-4 sm:space-y-6">
            <WalletComingSoon />

            <div className="panel border-[rgba(82,103,217,0.08)] bg-white p-5 sm:p-6">
              <p className="text-sm font-semibold text-[var(--ink)]">Profile overview</p>

              <div className="mt-6 space-y-3">
                {metrics.map(({ value, label, helper, icon: Icon, progress }) => (
                  <div
                    key={label}
                    className="rounded-[1.35rem] bg-[var(--soft)] p-4"
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-[var(--brand)] shadow-[0_10px_22px_rgba(21,32,58,0.05)]">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-col gap-1">
                          <p className="text-sm font-medium text-[var(--muted)]">{label}</p>
                          <p className="text-sm font-semibold text-[var(--ink)]">{value}</p>
                        </div>
                        <p className="mt-2 text-xs leading-5 text-[var(--muted)]">{helper}</p>
                      </div>
                    </div>
                    {progress !== undefined ? (
                      <div className="mt-3 overflow-hidden rounded-full bg-white shadow-[inset_0_1px_3px_rgba(21,32,58,0.06)]" style={{ height: 6 }}>
                        <div
                          className="h-full rounded-full bg-[linear-gradient(90deg,_#5267d9,_#8da0ff)] transition-all duration-300"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>

            <div className="panel border-[rgba(82,103,217,0.08)] bg-[linear-gradient(180deg,_rgba(255,255,255,0.98),_rgba(244,247,255,0.92))] p-5 sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-[var(--ink)]">Share readiness</p>
                <span className="shrink-0 whitespace-nowrap rounded-full bg-[rgba(82,103,217,0.1)] px-3 py-1 text-xs font-semibold leading-none text-[var(--brand)]">
                  {activeCardCount === 1 ? "1 live card" : `${activeCardCount} live cards`}
                </span>
              </div>

              <p className="mt-4 text-sm leading-6 text-[var(--muted)]">
                {hasActiveCard
                  ? `Last updated ${workspaceView.summary.lastUpdatedLabel}. Your saved cards are ready for your next event.`
                  : "Create your first card to start sharing in person."}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

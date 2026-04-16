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
  const metrics = [
    {
      icon: UserRound,
      label: "Profile complete",
      value: `${profileCompletion}%`,
      helper: "More complete details make every card more useful in person.",
      progress: profileCompletion,
    },
  ];
  const topSubtitle = hasActiveCard
    ? activeCardCount === 1
      ? "Your card is ready to share. Keep it updated before your next event."
      : "Your cards are ready to share. Keep them updated before your next event."
    : "Complete your profile to generate your first shareable card.";

  return (
    <main className="mx-auto grid max-w-7xl gap-6 px-4 py-4 lg:grid-cols-[280px_minmax(0,1fr)] lg:px-6 lg:py-6">
      <Sidebar
        activePath="/dashboard"
        avatarUrl={avatarUrl}
        email={displayEmail}
        userName={displayName}
      />

      <section className="space-y-6">
        <DashboardHeader
          avatarUrl={avatarUrl}
          email={displayEmail}
          subtitle={topSubtitle}
          userName={displayName}
        />

        {devAuthBypassEnabled ? (
          <div className="rounded-[1.6rem] border border-[rgba(16,185,129,0.16)] bg-[rgba(236,253,245,0.9)] px-5 py-4 text-sm text-[#065f46] shadow-[0_12px_30px_rgba(16,185,129,0.08)]">
            Preview mode is enabled in local development, so this dashboard is temporarily visible without sign-in.
          </div>
        ) : null}

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
          <div className="panel border-[rgba(82,103,217,0.08)] bg-[linear-gradient(180deg,_rgba(255,255,255,0.94),_rgba(244,247,255,0.92))] p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h2 className="max-w-[34rem] text-[2rem] font-semibold tracking-tight text-[var(--ink)]">
                  Your saved cards
                </h2>
                <p className="mt-2 max-w-xl text-[0.98rem] leading-7 text-[var(--muted)]">
                  Keep your main card and event-specific versions polished, current, and ready to share.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-full border border-[rgba(82,103,217,0.14)] bg-white px-3 py-1 text-xs font-semibold text-[var(--brand)] shadow-[0_8px_20px_rgba(21,32,58,0.04)]">
                    {workspaceView.summary.cardStatusLabel}
                  </span>
                  <span className="rounded-full border border-[rgba(82,103,217,0.1)] bg-[var(--soft)] px-3 py-1 text-xs font-medium text-[var(--muted)]">
                    Last saved {workspaceView.summary.lastUpdatedLabel}
                  </span>
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
              emptyDescription="Complete your profile details in the card builder to generate the first saved workspace card."
              emptyTitle="No active card yet"
              showAddButton={false}
            />
          </div>

          <div className="space-y-6">
            <WalletComingSoon />

            <div className="panel border-[rgba(82,103,217,0.08)] bg-white p-6">
              <div>
                <p className="text-sm font-semibold text-[var(--ink)]">Profile overview</p>
                <p className="mt-1 text-sm text-[var(--muted)]">
                  A quick look at how complete your card details are right now.
                </p>
              </div>

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

            <div className="panel border-[rgba(82,103,217,0.08)] bg-[linear-gradient(180deg,_rgba(255,255,255,0.98),_rgba(244,247,255,0.92))] p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-[var(--ink)]">Share readiness</p>
                  <p className="mt-1 text-sm text-[var(--muted)]">
                    Keep each version targeted for the role, event, or audience you are walking into.
                  </p>
                </div>
                <span className="rounded-full bg-[rgba(82,103,217,0.1)] px-3 py-1 text-xs font-semibold text-[var(--brand)]">
                  {activeCardCount === 1 ? "1 live card" : `${activeCardCount} live cards`}
                </span>
              </div>

              <p className="mt-5 text-sm leading-7 text-[var(--muted)]">
                {hasActiveCard
                  ? `Last updated ${workspaceView.summary.lastUpdatedLabel}. Your saved cards are ready for career fairs, classes, coffee chats, and campus events.`
                  : `Your profile is ${profileCompletion}% complete. Fill in the remaining details to generate a card you can share at career fairs, campus events, and meetups.`}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

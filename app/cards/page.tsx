import type { ComponentType } from "react";
import { ArrowRight, CreditCard, LayoutTemplate, Plus, ShieldCheck } from "lucide-react";
import { CardsSection } from "@/components/cards/cards-section";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Button } from "@/components/ui/button";
import { requireWorkspaceUser } from "@/lib/workspace-auth";
import { getWorkspaceView } from "@/lib/workspace-view";

export default async function CardsPage() {
  const workspaceUser = await requireWorkspaceUser("/cards");
  const workspaceView = await getWorkspaceView(workspaceUser);
  const displayName = workspaceView.settings.profile.name || workspaceUser.name;
  const displayEmail = workspaceView.settings.profile.email || workspaceUser.email;
  const avatarUrl = workspaceView.settings.profile.avatarUrl;
  const hasPrimaryCard = workspaceView.cards.some((card) => card.id === "primary");
  const hasCards = workspaceView.cards.length > 0;
  const primaryActionLabel = hasPrimaryCard ? "Edit main card" : "Create first card";

  return (
    <main className="workspace-shell">
      <Sidebar activePath="/cards" avatarUrl={avatarUrl} email={displayEmail} userName={displayName} />

      <section className="workspace-content space-y-4 sm:space-y-6">
        <header className="panel flex flex-col gap-5 border-[rgba(82,103,217,0.08)] bg-[linear-gradient(180deg,_rgba(255,255,255,0.96),_rgba(244,247,255,0.92))] p-5 sm:p-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0">
            <h1 className="page-title">
              Your cards
            </h1>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full border border-[rgba(82,103,217,0.14)] bg-white px-3 py-1 text-xs font-semibold text-[var(--brand)] shadow-[0_8px_20px_rgba(21,32,58,0.04)]">
                {workspaceView.summary.cardStatusLabel}
              </span>
              {hasCards ? (
                <span className="rounded-full border border-[rgba(82,103,217,0.1)] bg-[var(--soft)] px-3 py-1 text-xs font-medium text-[var(--muted)]">
                  Last saved {workspaceView.summary.lastUpdatedLabel}
                </span>
              ) : null}
            </div>
          </div>

          <div className="flex w-full shrink-0 flex-col gap-3 sm:flex-row sm:flex-wrap lg:w-auto lg:justify-end">
            <Button
              href="/create-card"
              className={hasPrimaryCard
                ? "w-full whitespace-nowrap sm:w-auto"
                : "w-full whitespace-nowrap sm:w-auto"}
              variant={hasPrimaryCard ? "secondary" : "primary"}
            >
              {primaryActionLabel}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            {hasCards ? (
              <Button
                href="/create-card?cardId=new"
                className="w-full whitespace-nowrap sm:w-auto"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add card
              </Button>
            ) : null}
          </div>
        </header>

        <div className="grid min-w-0 gap-4 sm:gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
          <div className="panel border-[rgba(82,103,217,0.08)] bg-white p-5 sm:p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="min-w-0">
                <h2 className="content-title max-w-[34rem]">
                  All cards
                </h2>
                <p className="mt-2 max-w-xl text-[0.98rem] leading-6 text-[var(--muted)]">
                  {hasCards
                    ? "Manage every saved version in one place."
                    : "Your workspace card will show up here first."}
                </p>
              </div>
            </div>

            <CardsSection
              cards={workspaceView.cards}
              emptyDescription="Create your workspace card first. Add extra cards later when you need them."
              emptyKicker={workspaceView.summary.cardStatusLabel}
              emptyTitle="No cards yet"
              showAddButton={false}
              showControls
            />
          </div>

          <aside className="min-w-0 space-y-4 sm:space-y-6">
            <SummaryCard
              description="Your current saved-card status."
              icon={CreditCard}
              title="Card status"
              value={workspaceView.summary.cardStatusLabel}
            />
            <SummaryCard
              description="Default style for your workspace card."
              icon={LayoutTemplate}
              title="Selected style"
              value={workspaceView.summary.selectedTemplateName}
            />
            <SummaryCard
              description="How your workspace data is currently saved."
              icon={ShieldCheck}
              title="Storage scope"
              value={workspaceView.summary.storageScopeLabel}
            />
          </aside>
        </div>
      </section>
    </main>
  );
}

function SummaryCard({
  description,
  icon: Icon,
  title,
  value,
}: {
  description: string;
  icon: ComponentType<{ className?: string }>;
  title: string;
  value: string;
}) {
  return (
    <div className="panel border-[rgba(82,103,217,0.08)] bg-white p-5 sm:p-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--soft)] text-[var(--brand)] shadow-[0_10px_22px_rgba(21,32,58,0.05)]">
          <Icon className="h-4 w-4" />
        </div>
        <p className="text-sm font-semibold text-[var(--ink)]">{title}</p>
      </div>
      <p className="mt-4 break-words text-base font-semibold leading-6 text-[var(--ink)]">{value}</p>
      <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{description}</p>
    </div>
  );
}

import type { ComponentType } from "react";
import { CreditCard, LayoutTemplate, ShieldCheck } from "lucide-react";
import { CardsSection } from "@/components/cards/cards-section";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Button } from "@/components/ui/button";
import { requireWorkspaceUser } from "@/lib/workspace-auth";
import { getWorkspaceView } from "@/lib/workspace-view";

export default async function CardsPage() {
  const workspaceUser = await requireWorkspaceUser("/cards");
  const workspaceView = await getWorkspaceView(workspaceUser);

  return (
    <main className="mx-auto grid max-w-7xl gap-6 px-4 py-4 lg:grid-cols-[280px_minmax(0,1fr)] lg:px-6 lg:py-6">
      <Sidebar
        activePath="/cards"
        statusCopy={workspaceView.summary.sidebarStatusCopy}
        userLabel={workspaceUser.name}
        userSubcopy={workspaceUser.email}
      />

      <section className="space-y-6">
        <header className="panel flex flex-col gap-5 border-[rgba(82,103,217,0.08)] bg-[linear-gradient(180deg,_rgba(255,255,255,0.96),_rgba(244,247,255,0.92))] p-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow text-[var(--brand)]">My Cards</p>
            <h1 className="mt-2 text-[2rem] font-semibold tracking-tight text-[var(--ink)]">
              Saved cards for this workspace
            </h1>
            <p className="mt-2 max-w-2xl text-[0.98rem] leading-7 text-[var(--muted)]">
              This view shows the real card generated from your saved workspace profile,
              template choice, and contact details.
            </p>
          </div>

          <Button
            href="/create-card"
            className="rounded-full bg-[var(--brand)] px-5 py-3 text-white shadow-[0_16px_34px_rgba(82,103,217,0.22)] hover:bg-[#4459cb]"
          >
            Edit card
          </Button>
        </header>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
          <div className="panel border-[rgba(82,103,217,0.08)] bg-white p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="eyebrow text-[var(--brand)]">Card library</p>
                <h2 className="mt-2 max-w-[34rem] text-[2rem] font-semibold tracking-tight text-[var(--ink)]">
                  Keep one polished card ready to share
                </h2>
                <p className="mt-2 max-w-xl text-[0.98rem] leading-7 text-[var(--muted)]">
                  When you update the builder or Settings, this saved card view refreshes from the
                  same validated workspace record.
                </p>
              </div>
            </div>

            <CardsSection
              cards={workspaceView.cards}
              emptyDescription="Complete your name, email, and title in the card builder to create your first saved card."
              emptyTitle="No saved workspace card yet"
            />
          </div>

          <aside className="space-y-6">
            <SummaryCard
              description="Cards currently generated from the active workspace profile."
              icon={CreditCard}
              title="Saved cards"
              value={`${workspaceView.summary.activeCardCount}`}
            />
            <SummaryCard
              description="The template your workspace will keep using by default."
              icon={LayoutTemplate}
              title="Selected style"
              value={workspaceView.summary.selectedTemplateName}
            />
            <SummaryCard
              description="Current access method and storage checks are still enforced on save."
              icon={ShieldCheck}
              title="Session"
              value={workspaceView.summary.authLabel}
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
    <div className="panel border-[rgba(82,103,217,0.08)] bg-white p-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--soft)] text-[var(--brand)] shadow-[0_10px_22px_rgba(21,32,58,0.05)]">
          <Icon className="h-4 w-4" />
        </div>
        <p className="text-sm font-semibold text-[var(--ink)]">{title}</p>
      </div>
      <p className="mt-4 text-2xl font-semibold text-[var(--ink)]">{value}</p>
      <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{description}</p>
    </div>
  );
}

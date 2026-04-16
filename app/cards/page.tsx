import type { ComponentType } from "react";
import { CreditCard, LayoutTemplate, ShieldCheck } from "lucide-react";
import { CardsSection } from "@/components/cards/cards-section";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Button } from "@/components/ui/button";
import { supabaseEnabled } from "@/lib/supabase-env";
import { getSupabaseProfileByUserId } from "@/lib/supabase/profiles";
import { requireWorkspaceUser } from "@/lib/workspace-auth";
import { getWorkspaceView } from "@/lib/workspace-view";

export default async function CardsPage() {
  const workspaceUser = await requireWorkspaceUser("/cards");
  const [workspaceView, supabaseProfile] = await Promise.all([
    getWorkspaceView(workspaceUser),
    supabaseEnabled ? getSupabaseProfileByUserId(workspaceUser.id).catch(() => null) : Promise.resolve(null),
  ]);
  const profileId = supabaseProfile?.id;
  const displayName = workspaceView.settings.profile.name || workspaceUser.name;
  const displayEmail = workspaceView.settings.profile.email || workspaceUser.email;
  const avatarUrl = workspaceView.settings.profile.avatarUrl;

  return (
    <main className="mx-auto grid max-w-7xl gap-6 px-4 py-4 lg:grid-cols-[280px_minmax(0,1fr)] lg:px-6 lg:py-6">
      <Sidebar activePath="/cards" avatarUrl={avatarUrl} email={displayEmail} userName={displayName} />

      <section className="space-y-6">
        <header className="panel flex flex-col gap-5 border-[rgba(82,103,217,0.08)] bg-[linear-gradient(180deg,_rgba(255,255,255,0.96),_rgba(244,247,255,0.92))] p-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow text-[var(--brand)]">My Cards</p>
            <h1 className="mt-2 text-[2rem] font-semibold tracking-tight text-[var(--ink)]">
              Your cards
            </h1>
            <p className="mt-2 max-w-2xl text-[0.98rem] leading-7 text-[var(--muted)]">
              Manage all your digital cards. Your workspace card stays in sync with your profile.
              Extra cards are fully independent — each with their own details and template.
            </p>
          </div>

          <div className="flex shrink-0 gap-3">
            <Button
              href="/create-card"
              className="whitespace-nowrap rounded-full border border-[rgba(82,103,217,0.22)] bg-white px-5 py-3 text-[var(--brand)] hover:bg-[var(--soft)]"
            >
              Edit workspace card
            </Button>
            <Button
              href="/create-card?cardId=new"
              className="whitespace-nowrap rounded-full bg-[var(--brand)] px-5 py-3 text-white shadow-[0_16px_34px_rgba(82,103,217,0.22)] hover:bg-[#4459cb]"
            >
              + Add card
            </Button>
          </div>
        </header>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
          <div className="panel border-[rgba(82,103,217,0.08)] bg-white p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="eyebrow text-[var(--brand)]">All cards</p>
                <h2 className="mt-2 max-w-[34rem] text-[2rem] font-semibold tracking-tight text-[var(--ink)]">
                  {workspaceView.cards.length === 0
                    ? "No cards yet"
                    : workspaceView.cards.length === 1
                      ? "1 card ready to share"
                      : `${workspaceView.cards.length} cards ready to share`}
                </h2>
                <p className="mt-2 max-w-xl text-[0.98rem] leading-7 text-[var(--muted)]">
                  Each card can have its own template, contact details, and portrait.
                  Use extra cards for different roles, events, or contexts.
                </p>
              </div>
            </div>

            <CardsSection
              cards={workspaceView.cards}
              emptyDescription="Complete your name, email, and title in the card builder to create your workspace card."
              emptyTitle="No workspace card yet"
              profileId={profileId}
            />
          </div>

          <aside className="space-y-6">
            <SummaryCard
              description="Total cards generated from your workspace profile and extra cards."
              icon={CreditCard}
              title="Card status"
              value={workspaceView.summary.cardStatusLabel}
            />
            <SummaryCard
              description="The template your workspace will keep using by default."
              icon={LayoutTemplate}
              title="Selected style"
              value={workspaceView.summary.selectedTemplateName}
            />
            <SummaryCard
              description="Workspace data is currently saved and reused on this browser."
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

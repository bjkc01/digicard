import type { DigiCard } from "@/lib/data";
import { DashboardCardSurface } from "@/components/cards/dashboard-card-surface";
import { Button } from "@/components/ui/button";

type CardsSectionProps = {
  cards: DigiCard[];
  emptyDescription?: string;
  emptyTitle?: string;
};

export function CardsSection({
  cards,
  emptyDescription = "Create your first digital card to get started.",
  emptyTitle = "No cards yet",
}: CardsSectionProps) {
  if (cards.length === 0) {
    return (
      <div className="mt-8 flex min-h-48 flex-col items-center justify-center rounded-[28px] border border-dashed border-[rgba(82,103,217,0.22)] bg-[var(--soft)] p-8 text-center">
        <p className="text-sm font-semibold text-[var(--ink)]">{emptyTitle}</p>
        <p className="mt-2 text-sm text-[var(--muted)]">{emptyDescription}</p>
        <Button
          href="/create-card"
          className="mt-5 rounded-full bg-[var(--brand)] px-5 py-3 text-white hover:bg-[#4459cb]"
        >
          Create card
        </Button>
      </div>
    );
  }

  return (
    <div className="mt-8 grid gap-5 md:grid-cols-2">
      {cards.map((card) => (
        <DashboardCardSurface
          key={card.id}
          card={card}
          action={
            <div className="flex flex-wrap gap-2">
              <Button
                href="/create-card"
                className="rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm font-medium text-white transition hover:border-white/20 hover:bg-white/[0.1]"
              >
                Edit
              </Button>
              <Button
                href="/settings"
                className="rounded-full border border-white/10 bg-transparent px-4 py-2 text-sm font-medium text-white transition hover:border-white/20 hover:bg-white/[0.06]"
              >
                Settings
              </Button>
            </div>
          }
        />
      ))}
    </div>
  );
}

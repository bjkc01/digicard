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
        />
      ))}
    </div>
  );
}

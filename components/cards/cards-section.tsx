import type { DigiCard } from "@/lib/data";
import { DashboardCardSurface } from "@/components/cards/dashboard-card-surface";
import { Button } from "@/components/ui/button";

type CardsSectionProps = {
  cards: DigiCard[];
  emptyDescription?: string;
  emptyActionHref?: string;
  emptyActionLabel?: string;
  emptyTitle?: string;
  showAddButton?: boolean;
  showEmptyButton?: boolean;
};

export function CardsSection({
  cards,
  emptyDescription = "Create your first digital card to get started.",
  emptyActionHref = "/create-card",
  emptyActionLabel = "Create card",
  emptyTitle = "No cards yet",
  showAddButton = true,
  showEmptyButton = true,
}: CardsSectionProps) {
  if (cards.length === 0) {
    return (
      <div className="mt-6 flex min-h-48 w-full max-w-full flex-col items-center justify-center rounded-[28px] border border-dashed border-[rgba(82,103,217,0.22)] bg-[var(--soft)] p-6 text-center sm:mt-8 sm:p-8">
        <p className="text-sm font-semibold text-[var(--ink)]">{emptyTitle}</p>
        <p className="mt-2 text-sm text-[var(--muted)]">{emptyDescription}</p>
        {showEmptyButton ? (
          <Button
            href={emptyActionHref}
            className="mt-5 rounded-full bg-[var(--brand)] px-5 py-3 text-white hover:bg-[#4459cb]"
          >
            {emptyActionLabel}
          </Button>
        ) : null}
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-5 sm:mt-8">
      <div className="grid min-w-0 gap-5 md:grid-cols-2">
        {cards.map((card) => (
          <DashboardCardSurface
            key={card.id}
            card={card}
          />
        ))}
      </div>

      {showAddButton ? (
        <div className="flex items-center justify-end">
          <Button
            href="/create-card?cardId=new"
            className="rounded-full border border-dashed border-[rgba(82,103,217,0.3)] bg-[var(--soft)] px-5 py-2.5 text-sm text-[var(--brand)] hover:border-[var(--brand)] hover:bg-white"
          >
            + Add another card
          </Button>
        </div>
      ) : null}
    </div>
  );
}

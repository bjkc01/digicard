"use client";

import { Plus, Search } from "lucide-react";
import { useMemo, useState } from "react";
import type { DigiCard } from "@/lib/data";
import { DashboardCardSurface } from "@/components/cards/dashboard-card-surface";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";

type CardsSectionProps = {
  cards: DigiCard[];
  emptyActionHref?: string;
  emptyActionLabel?: string;
  emptyDescription?: string;
  emptyKicker?: string;
  emptyTitle?: string;
  showAddButton?: boolean;
  showControls?: boolean;
  showEmptyButton?: boolean;
};

type SortMode = "recent" | "name" | "template";

export function CardsSection({
  cards,
  emptyActionHref = "/create-card",
  emptyActionLabel = "Create card",
  emptyDescription = "Create your first digital card to get started.",
  emptyKicker = "No cards ready",
  emptyTitle = "No cards yet",
  showAddButton = true,
  showControls = false,
  showEmptyButton = true,
}: CardsSectionProps) {
  const [query, setQuery] = useState("");
  const [sortMode, setSortMode] = useState<SortMode>("recent");

  const visibleCards = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const filtered = normalizedQuery
      ? cards.filter((card) =>
          [card.name, card.title, card.company, card.template, card.email]
            .join(" ")
            .toLowerCase()
            .includes(normalizedQuery),
        )
      : cards;

    return [...filtered].sort((a, b) => {
      if (sortMode === "name") {
        return a.name.localeCompare(b.name);
      }

      if (sortMode === "template") {
        return a.template.localeCompare(b.template);
      }

      return 0;
    });
  }, [cards, query, sortMode]);

  if (cards.length === 0) {
    return (
      <div className="mt-6 space-y-4 sm:mt-8">
        {showControls ? (
          <div className="grid gap-3 rounded-2xl border border-slate-200 bg-[var(--soft)] p-3 opacity-70 sm:grid-cols-[minmax(0,1fr)_12rem]">
            <label className="relative min-w-0">
              <span className="sr-only">Search cards</span>
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted)]" />
              <input
                disabled
                placeholder="Search cards"
                className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm text-[var(--ink)] outline-none placeholder:text-slate-400"
              />
            </label>
            <select
              disabled
              aria-label="Sort cards"
              className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-[var(--ink)] outline-none"
            >
              <option>Recently saved</option>
            </select>
          </div>
        ) : null}
        <EmptyState
          actionHref={emptyActionHref}
          actionLabel={emptyActionLabel}
          className="mt-0"
          description={emptyDescription}
          kicker={emptyKicker}
          showAction={showEmptyButton}
          title={emptyTitle}
        />
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-5 sm:mt-8">
      {showControls ? (
        <div className="grid gap-3 rounded-2xl border border-slate-200 bg-[var(--soft)] p-3 sm:grid-cols-[minmax(0,1fr)_12rem]">
          <label className="relative min-w-0">
            <span className="sr-only">Search cards</span>
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted)]" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by name, role, or template"
              className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm text-[var(--ink)] outline-none transition placeholder:text-slate-400 focus:border-[var(--brand)] focus:ring-4 focus:ring-[rgba(82,103,217,0.12)]"
            />
          </label>
          <label className="min-w-0">
            <span className="sr-only">Sort cards</span>
            <select
              value={sortMode}
              onChange={(event) => setSortMode(event.target.value as SortMode)}
              className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-[var(--ink)] outline-none transition focus:border-[var(--brand)] focus:ring-4 focus:ring-[rgba(82,103,217,0.12)]"
            >
              <option value="recent">Recently saved</option>
              <option value="name">Name A-Z</option>
              <option value="template">Template</option>
            </select>
          </label>
        </div>
      ) : null}

      {visibleCards.length > 0 ? (
        <div className="grid min-w-0 gap-5 md:grid-cols-2">
          {visibleCards.map((card) => (
            <DashboardCardSurface key={card.id} card={card} />
          ))}
        </div>
      ) : (
        <EmptyState
          actionHref="/create-card?cardId=new"
          actionLabel="Add card"
          description="Try a different search term or create a new card for this workspace."
          kicker="No matches"
          title="No cards match your search"
        />
      )}

      {showAddButton ? (
        <div className="flex items-center justify-end">
          <Button href="/create-card?cardId=new" variant="secondary">
            <Plus className="mr-2 h-4 w-4" />
            Add another card
          </Button>
        </div>
      ) : null}
    </div>
  );
}

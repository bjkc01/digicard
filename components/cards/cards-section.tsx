"use client";

import { useState } from "react";
import { DigiCard, cards as initialCards } from "@/lib/data";
import { DashboardCardTile } from "@/components/cards/dashboard-card-tile";
import { Button } from "@/components/ui/button";

export function CardsSection() {
  const [cards, setCards] = useState<DigiCard[]>(initialCards);

  const handleDelete = (id: number) => {
    setCards((prev) => prev.filter((c) => c.id !== id));
  };

  if (cards.length === 0) {
    return (
      <div className="mt-8 flex min-h-48 flex-col items-center justify-center rounded-[28px] border border-dashed border-[rgba(82,103,217,0.22)] bg-[var(--soft)] p-8 text-center">
        <p className="text-sm font-semibold text-[var(--ink)]">No cards yet</p>
        <p className="mt-2 text-sm text-[var(--muted)]">Create your first digital card to get started.</p>
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
        <DashboardCardTile key={card.id} card={card} onDelete={handleDelete} />
      ))}
    </div>
  );
}

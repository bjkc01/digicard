"use client";

import { useState } from "react";
import { DigiCard, cards as initialCards } from "@/lib/data";
import { CardTile } from "@/components/digicard/card-tile";
import { Button } from "@/components/ui/button";

export function CardsSection() {
  const [cards, setCards] = useState<DigiCard[]>(initialCards);

  const handleDelete = (id: number) => {
    setCards((prev) => prev.filter((c) => c.id !== id));
  };

  if (cards.length === 0) {
    return (
      <div className="mt-8 flex min-h-48 flex-col items-center justify-center rounded-[28px] border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
        <p className="text-sm font-semibold text-slate-700">No cards yet</p>
        <p className="mt-2 text-sm text-slate-500">Create your first digital card to get started.</p>
        <Button href="/create-card" className="mt-5">
          Create card
        </Button>
      </div>
    );
  }

  return (
    <div className="mt-8 grid gap-5 md:grid-cols-2">
      {cards.map((card) => (
        <CardTile key={card.id} card={card} onDelete={handleDelete} />
      ))}
    </div>
  );
}

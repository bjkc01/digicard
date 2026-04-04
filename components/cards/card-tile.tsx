"use client";

import { useState } from "react";
import { DigiCard } from "@/lib/data";
import { CardPreview } from "@/components/cards/card-preview";
import { ManageModal } from "@/components/cards/manage-modal";

type CardTileProps = {
  card: DigiCard;
  onDelete: (id: number) => void;
};

export function CardTile({ card, onDelete }: CardTileProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="subtle-panel overflow-hidden border-[rgba(82,103,217,0.08)] bg-white p-4">
        <CardPreview card={card} compact />
        <div className="mt-4 flex items-center justify-between px-1">
          <div>
            <p className="font-semibold text-[var(--ink)]">{card.name}</p>
            <p className="text-sm text-[var(--muted)]">{card.template}</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="rounded-full border border-[rgba(82,103,217,0.12)] px-4 py-2 text-sm font-medium text-[var(--muted)] transition hover:border-[rgba(82,103,217,0.22)] hover:bg-[var(--soft)] hover:text-[var(--ink)]"
          >
            Manage
          </button>
        </div>
      </div>

      {showModal && <ManageModal card={card} onClose={() => setShowModal(false)} onDelete={onDelete} />}
    </>
  );
}

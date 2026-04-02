"use client";

import { useState } from "react";
import { DigiCard } from "@/lib/data";
import { CardPreview } from "@/components/digicard/card-preview";
import { ManageModal } from "@/components/digicard/manage-modal";

type CardTileProps = {
  card: DigiCard;
  onDelete: (id: number) => void;
};

export function CardTile({ card, onDelete }: CardTileProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="subtle-panel overflow-hidden p-4">
        <CardPreview card={card} compact />
        <div className="mt-4 flex items-center justify-between px-1">
          <div>
            <p className="font-semibold text-slate-900">{card.name}</p>
            <p className="text-sm text-slate-500">{card.template}</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
          >
            Manage
          </button>
        </div>
      </div>

      {showModal && (
        <ManageModal
          card={card}
          onClose={() => setShowModal(false)}
          onDelete={onDelete}
        />
      )}
    </>
  );
}

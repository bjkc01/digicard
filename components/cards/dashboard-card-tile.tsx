"use client";

import { useState } from "react";
import { ManageModal } from "@/components/cards/manage-modal";
import { DashboardCardSurface } from "@/components/cards/dashboard-card-surface";
import { DigiCard } from "@/lib/data";
import { cn } from "@/lib/utils";

type DashboardCardTileProps = {
  card: DigiCard;
  onDelete: (id: number) => void;
};

export function DashboardCardTile({ card, onDelete }: DashboardCardTileProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <DashboardCardSurface
        card={card}
        action={
          <button
            onClick={() => setShowModal(true)}
            className={cn(
              "rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm font-medium text-white transition",
              "hover:border-white/20 hover:bg-white/[0.1]",
            )}
          >
            Manage
          </button>
        }
      />

      {showModal && <ManageModal card={card} onClose={() => setShowModal(false)} onDelete={onDelete} />}
    </>
  );
}

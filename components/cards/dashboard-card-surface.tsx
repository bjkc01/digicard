"use client";

import { useState, useTransition } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { deleteWorkspaceCardAction } from "@/app/create-card/actions";
import { deleteExtraCardAction } from "@/app/create-card/extra-card-actions";
import { CardPreview } from "@/components/cards/card-preview";
import { DigiCard } from "@/lib/data";

type DashboardCardSurfaceProps = {
  card: DigiCard;
};

export function DashboardCardSurface({ card }: DashboardCardSurfaceProps) {
  const isPrimary = card.id === "primary";

  // Primary card: legacy email-based key. Extra cards: ID-based key.
  const portraitKey = isPrimary
    ? "digicard-portrait-primary"
    : `digicard-portrait-${card.id}`;
  const legacyPrimaryPortraitKey = `digicard-portrait-${card.email}`;

  const [imageUrl] = useState<string | undefined>(() => {
    if (typeof window === "undefined") return undefined;
    return localStorage.getItem(portraitKey) ?? (isPrimary ? localStorage.getItem(legacyPrimaryPortraitKey) : null) ?? undefined;
  });
  const [isPending, startTransition] = useTransition();
  const [confirmDelete, setConfirmDelete] = useState(false);

  function handleDelete() {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    startTransition(async () => {
      if (isPrimary) {
        await deleteWorkspaceCardAction();
        localStorage.removeItem(portraitKey);
        localStorage.removeItem(legacyPrimaryPortraitKey);
        return;
      }

      await deleteExtraCardAction(card.id);
      localStorage.removeItem(portraitKey);
    });
  }

  return (
    <div className="group relative">
      <CardPreview card={card} compact imageUrl={imageUrl} />

      {card.label ? (
        <div className="absolute left-3 top-3 rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-white backdrop-blur-sm">
          {card.label}
        </div>
      ) : null}

      <div className="absolute right-3 top-3 flex items-center gap-1.5 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
        <a
          href={isPrimary ? "/create-card" : `/create-card?cardId=${card.id}`}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition-colors hover:bg-black/80"
          aria-label="Edit card"
          title="Edit card"
        >
          <Pencil className="h-3.5 w-3.5" />
        </a>

        <button
          type="button"
          onClick={handleDelete}
          disabled={isPending}
          className={`flex h-8 items-center justify-center gap-1 rounded-full px-2.5 text-white backdrop-blur-sm transition-colors disabled:opacity-50 ${
            confirmDelete
              ? "bg-red-600 hover:bg-red-700"
              : "bg-black/60 hover:bg-red-600"
          }`}
          aria-label={confirmDelete ? "Confirm delete" : "Delete card"}
          title={confirmDelete ? "Click again to confirm" : "Delete card"}
          onBlur={() => setConfirmDelete(false)}
        >
          <Trash2 className="h-3.5 w-3.5" />
          {confirmDelete ? (
            <span className="text-[11px] font-semibold">Confirm</span>
          ) : null}
        </button>
      </div>
    </div>
  );
}

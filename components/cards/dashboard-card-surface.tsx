"use client";

import { useEffect, useState, useTransition } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { deleteWorkspaceCardAction } from "@/app/create-card/actions";
import { deleteExtraCardAction } from "@/app/create-card/extra-card-actions";
import { CardPreview } from "@/components/cards/card-preview";
import { DigiCard } from "@/lib/data";
import { cn } from "@/lib/utils";

type DashboardCardSurfaceProps = {
  card: DigiCard;
};

export function DashboardCardSurface({ card }: DashboardCardSurfaceProps) {
  const isPrimary = card.id === "primary";

  // Primary card: legacy email-based key. Extra cards: ID-based key.
  const portraitKey = isPrimary
    ? `digicard-portrait-${card.email}`
    : `digicard-portrait-${card.id}`;

  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [isPending, startTransition] = useTransition();
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(portraitKey);
    if (stored) setImageUrl(stored);
  }, [portraitKey]);

  function handleDelete() {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    startTransition(async () => {
      if (isPrimary) {
        await deleteWorkspaceCardAction();
        return;
      }

      await deleteExtraCardAction(card.id);
    });
  }

  return (
    <div className="group rounded-[28px] border border-[rgba(82,103,217,0.1)] bg-white p-4 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
      <div className="overflow-hidden rounded-[24px]">
        <CardPreview card={card} imageUrl={imageUrl} />
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p className="truncate text-sm font-semibold text-[var(--ink)]">
              {card.label || (isPrimary ? "Primary card" : "Saved card")}
            </p>
            {card.lastSavedLabel ? (
              <span className="rounded-full bg-[var(--soft)] px-2.5 py-1 text-[11px] font-medium text-[var(--muted)]">
                {card.lastSavedLabel}
              </span>
            ) : null}
          </div>
          <p className="mt-1 text-sm text-[var(--muted)]">
            {isPrimary
              ? "This version stays linked to your main workspace profile."
              : "Independent card for a different role, event, or audience."}
          </p>
        </div>

        <div className="flex items-center gap-2 sm:flex-shrink-0">
          <a
            href={isPrimary ? "/create-card" : `/create-card?cardId=${card.id}`}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-[rgba(82,103,217,0.18)] bg-white px-4 text-sm font-medium text-[var(--ink)] transition-colors hover:bg-[var(--soft)]"
            aria-label="Edit card"
            title="Edit card"
          >
            <Pencil className="h-4 w-4" />
            Edit
          </a>

          <button
            type="button"
            onClick={handleDelete}
            disabled={isPending}
            className={cn(
              "inline-flex h-10 items-center justify-center gap-2 rounded-full px-4 text-sm font-medium text-white transition-colors disabled:opacity-50",
              confirmDelete ? "bg-red-600 hover:bg-red-700" : "bg-[#111827] hover:bg-red-600",
            )}
            aria-label={confirmDelete ? "Confirm delete" : "Delete card"}
            title={confirmDelete ? "Click again to confirm" : "Delete card"}
            onBlur={() => setConfirmDelete(false)}
          >
            <Trash2 className="h-4 w-4" />
            {confirmDelete ? "Confirm delete" : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { ArrowRight, X } from "lucide-react";
import { toast } from "sonner";
import { DashboardCardSurface } from "@/components/cards/dashboard-card-surface";
import { DigiCard, templates } from "@/lib/data";
import { Button } from "@/components/ui/button";

type ManageModalProps = {
  card: DigiCard;
  onClose: () => void;
  onDelete: (id: number) => void;
};

export function ManageModal({ card, onClose, onDelete }: ManageModalProps) {
  const [confirmDelete, setConfirmDelete] = useState(false);

  const templateId = templates.find((t) => t.name === card.template)?.id ?? "blueprint";

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(`https://digicard.app/card/${card.id}`);
    toast.success("Card link copied", { description: "Paste it anywhere to share." });
  };

  const handleDelete = () => {
    onDelete(card.id);
    toast.success("Card deleted", {
      description: `${card.name}'s card has been removed.`,
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="panel w-full max-w-[540px] max-h-[calc(100vh-2rem)] overflow-y-auto border-[rgba(82,103,217,0.08)] bg-[linear-gradient(180deg,_rgba(255,255,255,0.98),_rgba(244,247,255,0.95))] p-6">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="eyebrow text-[var(--brand)]">Manage card</p>
            <h2 className="mt-2 text-xl font-semibold text-[var(--ink)]">{card.name}</h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="flex h-9 w-9 items-center justify-center rounded-2xl text-[var(--muted)] transition hover:bg-[var(--soft)] hover:text-[var(--ink)]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <DashboardCardSurface card={card} />

        <div className="mt-5 flex flex-col gap-3">
          <button
            onClick={handleCopyLink}
            className="flex w-full items-center justify-between rounded-[1.35rem] border border-[rgba(82,103,217,0.1)] bg-white px-4 py-3.5 text-left text-sm font-medium text-[var(--ink)] transition hover:border-[rgba(82,103,217,0.22)] hover:bg-[var(--soft)]"
          >
            Copy card link
            <ArrowRight className="h-4 w-4 text-[var(--brand)]" />
          </button>

          <Button
            href={`/create-card?template=${templateId}`}
            variant="secondary"
            className="w-full justify-between rounded-[1.35rem] border-[rgba(82,103,217,0.1)] py-3.5 text-[var(--ink)] hover:border-[rgba(82,103,217,0.22)] hover:bg-[var(--soft)]"
          >
            Edit card
            <ArrowRight className="h-4 w-4 text-[var(--brand)]" />
          </Button>

          {!confirmDelete ? (
            <button
              onClick={() => setConfirmDelete(true)}
              className="mt-1 w-full rounded-[1.35rem] border border-red-100 bg-white px-4 py-3.5 text-sm font-medium text-red-600 transition hover:border-red-200 hover:bg-red-50"
            >
              Delete card
            </button>
          ) : (
            <div className="mt-1 rounded-[1.35rem] border border-red-200 bg-red-50 p-4">
              <p className="text-sm font-medium text-red-700">
                Delete {card.name}&apos;s card? This cannot be undone.
              </p>
              <div className="mt-3 flex gap-2">
                <button
                  onClick={handleDelete}
                  className="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
                >
                  Yes, delete
                </button>
                <button
                  onClick={() => setConfirmDelete(false)}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

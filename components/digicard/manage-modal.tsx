"use client";

import { useState } from "react";
import { toast } from "sonner";
import { DigiCard, templates } from "@/lib/data";
import { CardPreview } from "@/components/digicard/card-preview";
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="panel w-full max-w-md p-6">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">Manage card</h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="flex h-8 w-8 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            ✕
          </button>
        </div>

        <CardPreview card={card} compact />

        <div className="mt-5 flex flex-col gap-2">
          <button
            onClick={handleCopyLink}
            className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
          >
            Copy card link
            <span className="text-slate-400">→</span>
          </button>

          <Button
            href={`/create-card?template=${templateId}`}
            variant="secondary"
            className="w-full justify-between"
          >
            Edit card
            <span className="text-slate-400">→</span>
          </Button>

          {!confirmDelete ? (
            <button
              onClick={() => setConfirmDelete(true)}
              className="mt-2 w-full rounded-2xl border border-red-100 px-4 py-3 text-sm font-medium text-red-600 transition hover:border-red-200 hover:bg-red-50"
            >
              Delete card
            </button>
          ) : (
            <div className="mt-2 rounded-2xl border border-red-200 bg-red-50 p-4">
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

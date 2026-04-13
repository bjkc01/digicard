"use client";

import { useEffect, useState } from "react";
import { CardPreview } from "@/components/cards/card-preview";
import { DigiCard } from "@/lib/data";
import { getCardShareTarget } from "@/lib/site-config";

type DashboardCardSurfaceProps = {
  card: DigiCard;
  action?: React.ReactNode;
};

export function DashboardCardSurface({ card, action }: DashboardCardSurfaceProps) {
  const shareTarget = getCardShareTarget(card);
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    const stored = localStorage.getItem(`digicard-portrait-${card.email}`);
    if (stored) setImageUrl(stored);
  }, [card.email]);

  return (
    <article className="flex flex-col gap-3">
      <CardPreview card={card} compact imageUrl={imageUrl} />

      {action ? (
        <div className="flex items-center justify-between gap-3 rounded-[1.4rem] border border-[rgba(82,103,217,0.1)] bg-white px-5 py-3.5">
          <p className="text-xs text-[var(--muted)]">
            QR opens your {shareTarget.label}
          </p>
          {action}
        </div>
      ) : null}
    </article>
  );
}

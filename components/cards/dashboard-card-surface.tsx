"use client";

import { useEffect, useState } from "react";
import { CardPreview } from "@/components/cards/card-preview";
import { DigiCard } from "@/lib/data";

type DashboardCardSurfaceProps = {
  card: DigiCard;
};

export function DashboardCardSurface({ card }: DashboardCardSurfaceProps) {
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    const stored = localStorage.getItem(`digicard-portrait-${card.email}`);
    if (stored) setImageUrl(stored);
  }, [card.email]);

  return <CardPreview card={card} compact imageUrl={imageUrl} />;
}

"use client";

import { QRCodeSVG } from "qrcode.react";
import { DigiCard } from "@/lib/data";
import { cn } from "@/lib/utils";

type CardPreviewProps = {
  card: DigiCard;
  compact?: boolean;
  imageUrl?: string;
};

export function CardPreview({ card, compact = false, imageUrl }: CardPreviewProps) {
  const qrValue = `https://digicard.app/view/${card.id}`;

  return (
    <div
      className={cn(
        "overflow-hidden rounded-[28px] border border-slate-200 bg-white",
        compact ? "min-h-[240px]" : "min-h-[320px]",
      )}
    >
      <div className={cn("h-2 w-full bg-gradient-to-r", card.color)} />
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            {imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={imageUrl}
                alt={card.name}
                className="h-12 w-12 rounded-full object-cover ring-2 ring-slate-100"
              />
            ) : null}
            <div>
              <p className="text-[22px] font-semibold tracking-tight text-slate-900">{card.name}</p>
              <p className="mt-1 text-sm text-slate-600">{card.title}</p>
              <p className="mt-1 text-sm text-slate-500">{card.company}</p>
            </div>
          </div>
          <div className="flex-shrink-0 rounded-2xl border border-slate-200 bg-slate-50 p-1.5">
            <QRCodeSVG
              value={qrValue}
              size={44}
              bgColor="transparent"
              fgColor="#475569"
              level="M"
            />
          </div>
        </div>

        <div className="mt-8 grid gap-3 text-sm text-slate-600">
          {card.email && <div className="rounded-2xl bg-slate-50 px-4 py-3">{card.email}</div>}
          {card.phone && <div className="rounded-2xl bg-slate-50 px-4 py-3">{card.phone}</div>}
          {card.linkedin && <div className="rounded-2xl bg-slate-50 px-4 py-3">{card.linkedin}</div>}
          {card.website && <div className="rounded-2xl bg-slate-50 px-4 py-3">{card.website}</div>}
        </div>

        <div className="mt-8 flex items-center justify-between border-t border-slate-200 pt-4">
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
            {card.template}
          </span>
          <span className="text-xs font-medium uppercase tracking-[0.22em] text-slate-400">
            DigiCard
          </span>
        </div>
      </div>
    </div>
  );
}

import { DigiCard } from "@/lib/data";
import { cn } from "@/lib/utils";

type CardPreviewProps = {
  card: DigiCard;
  compact?: boolean;
};

export function CardPreview({ card, compact = false }: CardPreviewProps) {
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
          <div>
            <p className="text-[22px] font-semibold tracking-tight text-slate-900">{card.name}</p>
            <p className="mt-1 text-sm text-slate-600">{card.title}</p>
            <p className="mt-1 text-sm text-slate-500">{card.company}</p>
          </div>
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
            QR
          </div>
        </div>

        <div className="mt-8 grid gap-3 text-sm text-slate-600">
          <div className="rounded-2xl bg-slate-50 px-4 py-3">{card.email}</div>
          <div className="rounded-2xl bg-slate-50 px-4 py-3">{card.phone}</div>
          <div className="rounded-2xl bg-slate-50 px-4 py-3">{card.linkedin}</div>
          <div className="rounded-2xl bg-slate-50 px-4 py-3">{card.website}</div>
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

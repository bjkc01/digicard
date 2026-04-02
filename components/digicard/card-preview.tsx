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
        "relative overflow-hidden rounded-[28px] border border-white/60 bg-white p-5 shadow-soft",
        compact ? "min-h-[240px]" : "min-h-[320px]",
      )}
    >
      <div className={cn("absolute inset-x-0 top-0 h-28 bg-gradient-to-r opacity-95", card.color)} />
      <div className="relative">
        <div className="flex items-start justify-between">
          <div className="mt-14">
            <p className="text-xl font-semibold text-slate-900">{card.name}</p>
            <p className="mt-1 text-sm text-slate-600">
              {card.title} at {card.company}
            </p>
          </div>
          <div className="rounded-2xl bg-white/90 p-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-500 shadow">
            QR
          </div>
        </div>

        <div className="mt-8 space-y-2 text-sm text-slate-600">
          <p>{card.email}</p>
          <p>{card.phone}</p>
          <p>{card.linkedin}</p>
          <p>{card.website}</p>
        </div>

        <div className="mt-8 flex items-center justify-between">
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

import Link from "next/link";
import { ArrowRight, Eye } from "lucide-react";
import type { DigiCard, DigiCardTemplate } from "@/lib/data";
import { CardPreview } from "@/components/cards/card-preview";
import { cn } from "@/lib/utils";

function TemplateCardPreview({
  previewCard,
}: {
  previewCard: DigiCard;
}) {
  return (
    <div className="mx-auto w-[208px] max-w-full">
      <CardPreview card={previewCard} compact />
    </div>
  );
}

export function TemplateTile({
  isSelected = false,
  previewCard,
  template,
}: {
  isSelected?: boolean;
  previewCard: DigiCard;
  template: DigiCardTemplate;
}) {
  return (
    <Link
      href={`/create-card?template=${template.id}`}
      aria-current={isSelected ? "true" : undefined}
      className={cn(
        "group subtle-panel block overflow-hidden border p-4 transition-[transform,box-shadow,border-color,background-color] duration-200 ease-out hover:-translate-y-1 hover:border-[rgba(82,103,217,0.24)] hover:shadow-[0_16px_36px_rgba(15,23,42,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(82,103,217,0.28)] focus-visible:ring-offset-2",
        isSelected &&
          "border-[rgba(82,103,217,0.3)] bg-[linear-gradient(180deg,_rgba(246,248,255,0.98),_rgba(255,255,255,1))] shadow-[0_18px_42px_rgba(82,103,217,0.12)] ring-2 ring-[rgba(82,103,217,0.16)]",
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-[1rem] p-5 transition-[box-shadow,transform] duration-200",
          template.tone,
          isSelected &&
            "shadow-[inset_0_0_0_1px_rgba(82,103,217,0.12),0_12px_30px_rgba(82,103,217,0.08)]",
        )}
      >
        <TemplateCardPreview previewCard={previewCard} />
        <span className="pointer-events-none absolute inset-x-4 bottom-4 flex translate-y-2 items-center justify-center gap-2 rounded-full bg-white/95 px-4 py-2 text-sm font-semibold text-[var(--ink)] opacity-0 shadow-[0_12px_26px_rgba(15,23,42,0.12)] transition group-hover:translate-y-0 group-hover:opacity-100">
          <Eye className="h-4 w-4 text-[var(--brand)]" />
          Preview
        </span>
      </div>

      <div className="mt-4 flex min-h-[11rem] flex-col px-1">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold leading-snug text-slate-900">
            {template.name}
          </h3>
          {isSelected ? (
            <span className="inline-flex shrink-0 whitespace-nowrap rounded-full border border-[rgba(82,103,217,0.18)] bg-[var(--brand-soft)] px-3 py-1 text-xs font-semibold text-[var(--brand)]">
              Default
            </span>
          ) : null}
        </div>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          {template.description}
        </p>
        <span
          className={cn(
            "mt-auto inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition",
            isSelected
              ? "bg-[var(--brand-soft)] text-[var(--brand)]"
              : "bg-[var(--brand)] text-white shadow-[0_12px_26px_rgba(82,103,217,0.18)] group-hover:bg-[var(--brand-dark)]",
          )}
        >
          {isSelected ? "Use again" : "Use template"}
          <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}

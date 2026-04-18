import Link from "next/link";
import type { DigiCard, DigiCardTemplate } from "@/lib/data";
import { CardPreview } from "@/components/cards/card-preview";
import { cn } from "@/lib/utils";

function TemplateCardPreview({
  previewCard,
}: {
  previewCard: DigiCard;
}) {
  return (
    <div className="mx-auto w-[148px] max-w-full">
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
        "group subtle-panel block overflow-hidden border p-4 transition-[transform,box-shadow,border-color,background-color] duration-200 ease-out hover:-translate-y-1 hover:border-[rgba(82,103,217,0.18)] hover:shadow-[0_16px_36px_rgba(15,23,42,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(82,103,217,0.28)] focus-visible:ring-offset-2",
        isSelected && "border-[rgba(82,103,217,0.24)] bg-[linear-gradient(180deg,_rgba(246,248,255,0.98),_rgba(255,255,255,1))] shadow-[0_18px_42px_rgba(82,103,217,0.12)] ring-2 ring-[rgba(82,103,217,0.16)]",
      )}
    >
      <div
        className={cn(
          "rounded-[22px] p-4 transition-[box-shadow,transform] duration-200",
          template.tone,
          isSelected && "shadow-[inset_0_0_0_1px_rgba(82,103,217,0.12),0_12px_30px_rgba(82,103,217,0.08)]",
        )}
      >
        <TemplateCardPreview previewCard={previewCard} />
      </div>

      <div className="mt-4 px-1">
        <div className="grid min-h-[3.2rem] grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
          <h3 className="text-lg font-semibold leading-tight text-slate-900">{template.name}</h3>
          {isSelected ? (
            <span className="inline-flex shrink-0 whitespace-nowrap rounded-full border border-[rgba(82,103,217,0.18)] bg-[linear-gradient(180deg,_rgba(240,243,255,1),_rgba(231,236,255,0.92))] px-3 py-1 text-xs font-semibold text-[var(--brand)] shadow-[0_10px_22px_rgba(82,103,217,0.12)]">
              Current default
            </span>
          ) : (
            <span className="inline-flex shrink-0 whitespace-nowrap rounded-full border border-slate-200 bg-white px-3 py-1 text-sm font-semibold text-slate-900 transition-[transform,border-color,background-color] duration-200 group-hover:translate-x-1 group-hover:border-slate-300 group-hover:bg-slate-50">
              Use template
            </span>
          )}
        </div>
        <p className="mt-3 text-sm leading-6 text-slate-600 sm:min-h-[4.5rem]">{template.description}</p>
      </div>
    </Link>
  );
}

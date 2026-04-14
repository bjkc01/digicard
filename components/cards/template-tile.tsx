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
      className={cn(
        "group subtle-panel block overflow-hidden p-4 transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(15,23,42,0.08)]",
        isSelected && "ring-2 ring-[rgba(82,103,217,0.18)]",
      )}
    >
      <div className={cn("rounded-[22px] p-4", template.tone)}>
        <TemplateCardPreview previewCard={previewCard} />
      </div>

      <div className="mt-4 px-1">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-lg font-semibold text-slate-900">{template.name}</h3>
          {isSelected ? (
            <span className="rounded-full bg-[rgba(82,103,217,0.1)] px-3 py-1 text-xs font-semibold text-[var(--brand)]">
              Current default
            </span>
          ) : (
            <span className="text-sm font-medium text-slate-900 transition-transform duration-300 group-hover:translate-x-1">
              Use template
            </span>
          )}
        </div>
        <p className="mt-2 text-sm leading-6 text-slate-600">{template.description}</p>
      </div>
    </Link>
  );
}

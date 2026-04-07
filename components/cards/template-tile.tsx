import Link from "next/link";
import { DigiCardTemplate } from "@/lib/data";

export function TemplateTile({
  isSelected = false,
  template,
}: {
  isSelected?: boolean;
  template: DigiCardTemplate;
}) {
  return (
    <Link
      href={`/create-card?template=${template.id}`}
      className={`group subtle-panel block overflow-hidden p-4 transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(15,23,42,0.08)] ${
        isSelected ? "ring-2 ring-[rgba(82,103,217,0.18)]" : ""
      }`}
    >
      <div className={`rounded-[26px] ${template.tone} p-4`}>
        <div className={`h-44 rounded-[22px] bg-gradient-to-br ${template.accent} p-4`}>
          <div className="flex h-full flex-col justify-between rounded-[18px] border border-white/15 bg-black/10 p-4 text-white">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-[0.2em]">DigiCard</span>
              <span className="rounded-full bg-white/15 px-2 py-1 text-[10px] uppercase tracking-[0.18em]">
                QR
              </span>
            </div>
            <div>
              <p className="text-lg font-semibold">{template.name}</p>
              <p className="mt-1 text-sm text-white/80">Template preview</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 px-1">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900">{template.name}</h3>
          {isSelected ? (
            <span className="rounded-full bg-[rgba(82,103,217,0.1)] px-3 py-1 text-xs font-semibold text-[var(--brand)]">
              Current default
            </span>
          ) : (
            <span className="text-sm font-medium text-slate-900 transition group-hover:translate-x-1">
              Use template
            </span>
          )}
        </div>
        <p className="mt-2 text-sm leading-6 text-slate-600">{template.description}</p>
      </div>
    </Link>
  );
}

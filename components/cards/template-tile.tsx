import Link from "next/link";
import { Globe, Mail, Phone } from "lucide-react";
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
      {/* Card preview */}
      <div className={`rounded-[22px] ${template.tone} p-3`}>
        <div className={`h-44 rounded-[18px] bg-gradient-to-br ${template.accent} p-4`}>
          <div className="flex h-full flex-col justify-between text-white">
            {/* Header row */}
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70">
                DigiCard
              </span>
              <span className="rounded-full bg-white/15 px-2 py-0.5 text-[9px] uppercase tracking-[0.18em]">
                QR
              </span>
            </div>

            {/* Avatar + name */}
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 flex-shrink-0 rounded-full bg-white/20 ring-1 ring-white/30" />
              <div>
                <div className="h-2.5 w-[72px] rounded-full bg-white/80" />
                <div className="mt-1.5 h-2 w-[48px] rounded-full bg-white/45" />
              </div>
            </div>

            {/* Contact icon row */}
            <div className="flex items-center gap-2">
              {[Mail, Phone, Globe].map((Icon, i) => (
                <div
                  key={i}
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-white/15"
                >
                  <Icon className="h-3 w-3 text-white/70" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Label row */}
      <div className="mt-4 px-1">
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

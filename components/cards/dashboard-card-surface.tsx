import { AtSign, Globe, Mail, Phone } from "lucide-react";
import { QRCode } from "@/components/ui/qr-code";
import { DigiCard } from "@/lib/data";
import { getCardShareTarget } from "@/lib/site-config";
import { cn } from "@/lib/utils";

type DashboardCardSurfaceProps = {
  card: DigiCard;
  action?: React.ReactNode;
};

const contactItems = [
  { key: "email", label: "Email", icon: Mail },
  { key: "phone", label: "Phone", icon: Phone },
  { key: "linkedin", label: "LinkedIn", icon: AtSign },
  { key: "website", label: "Website", icon: Globe },
] as const;

export function DashboardCardSurface({ card, action }: DashboardCardSurfaceProps) {
  const shareTarget = getCardShareTarget(card);
  const filledContacts = contactItems.filter((item) => Boolean(card[item.key]));
  const initials = card.name.split(" ").slice(0, 2).map((p) => p[0]).join("");

  return (
    <article className="flex flex-col gap-3">
      {/* Card */}
      <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[linear-gradient(160deg,rgba(18,22,38,0.99),rgba(9,11,20,1))] shadow-[0_32px_80px_rgba(0,0,0,0.6)]">
        <div className={cn("absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r", card.color)} />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.05),transparent_55%)]" />

        <div className="relative flex flex-col p-7">
          {/* Avatar */}
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[16px] border border-white/10 bg-white/[0.07] text-base font-bold text-white shadow-[0_12px_28px_rgba(0,0,0,0.3)]">
            {initials}
          </div>

          {/* Name */}
          <p className="mt-6 text-[38px] font-bold leading-[1.05] tracking-[-0.04em] text-white">
            {card.name}
          </p>

          {/* Title + company */}
          {card.title ? (
            <p className="mt-3 text-base font-medium text-slate-400">{card.title}</p>
          ) : null}
          {card.company ? (
            <p className="mt-1 text-sm text-slate-600">{card.company}</p>
          ) : null}

          {/* Contact rows */}
          {filledContacts.length > 0 && (
            <div className="mt-8 flex flex-col">
              {filledContacts.map((item, i) => {
                const value = card[item.key];
                const Icon = item.icon;
                return (
                  <div key={item.key} className={cn("flex items-center gap-3.5 py-3", i > 0 && "border-t border-white/[0.07]")}>
                    <Icon className="h-4 w-4 shrink-0 text-slate-500" />
                    <p className="truncate text-sm text-slate-300">{value}</p>
                  </div>
                );
              })}
            </div>
          )}

          {/* QR code */}
          <div className="mt-10 flex justify-center">
            <div className="rounded-[22px] bg-white p-4 shadow-[0_16px_48px_rgba(0,0,0,0.4)]">
              <QRCode value={shareTarget.url} size={120} fgColor="#0f172a" />
            </div>
          </div>

          {/* DigiCard branding footer */}
          <div className="mt-5 flex items-center justify-center gap-2">
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-slate-600">Scan to connect</span>
            <span className="text-slate-700">·</span>
            <span className="text-[11px] font-extrabold uppercase tracking-[0.28em] text-slate-300">DigiCard</span>
          </div>
        </div>
      </div>

      {/* Action row */}
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

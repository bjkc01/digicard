"use client";

import { AtSign, Globe, Mail, Phone, ScanLine } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { DigiCard } from "@/lib/data";
import { getCardShareTarget } from "@/lib/site-config";
import { cn } from "@/lib/utils";

type CardPreviewProps = {
  card: DigiCard;
  compact?: boolean;
  imageUrl?: string;
};

const contactItems = [
  { key: "email", label: "Email", icon: Mail, color: "from-violet-500/20 to-violet-400/5 border-violet-400/20 text-violet-300" },
  { key: "phone", label: "Phone", icon: Phone, color: "from-emerald-500/20 to-emerald-400/5 border-emerald-400/20 text-emerald-300" },
  { key: "linkedin", label: "LinkedIn", icon: AtSign, color: "from-sky-500/20 to-sky-400/5 border-sky-400/20 text-sky-300" },
  { key: "website", label: "Website", icon: Globe, color: "from-amber-500/20 to-amber-400/5 border-amber-400/20 text-amber-300" },
] as const;

function Avatar({ name, imageUrl, size }: { name: string; imageUrl?: string; size: "sm" | "lg" }) {
  const initials = name.split(" ").slice(0, 2).map((p) => p[0]).join("");
  if (imageUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={imageUrl}
        alt={name}
        className={cn(
          "shrink-0 object-cover ring-2 ring-white/10",
          size === "lg" ? "h-16 w-16 rounded-[22px] shadow-[0_18px_40px_rgba(0,0,0,0.4)]" : "h-10 w-10 rounded-[14px] shadow-[0_8px_20px_rgba(0,0,0,0.3)]",
        )}
      />
    );
  }
  return (
    <div
      className={cn(
        "shrink-0 flex items-center justify-center font-bold text-white bg-gradient-to-br from-white/10 to-white/[0.04] border border-white/10",
        size === "lg" ? "h-16 w-16 rounded-[22px] text-lg shadow-[0_18px_40px_rgba(0,0,0,0.3)]" : "h-10 w-10 rounded-[14px] text-sm shadow-[0_8px_20px_rgba(0,0,0,0.2)]",
      )}
    >
      {initials}
    </div>
  );
}

export function CardPreview({ card, compact = false, imageUrl }: CardPreviewProps) {
  const shareTarget = getCardShareTarget(card);
  const qrValue = shareTarget.url;
  const filledContacts = contactItems.filter((item) => Boolean(card[item.key]));

  if (compact) {
    return (
      <div className="relative w-full max-w-[280px] overflow-hidden rounded-[28px] bg-[linear-gradient(160deg,rgba(18,21,36,0.99),rgba(8,10,18,1))] shadow-[0_24px_60px_rgba(0,0,0,0.5)]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(34,211,238,0.1),transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(139,92,246,0.08),transparent_50%)]" />
        <div className={cn("absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r", card.color)} />

        <div className="relative flex flex-col p-3.5 gap-3">
          {/* Header */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <Avatar name={card.name} imageUrl={imageUrl} size="sm" />
              <div className="min-w-0">
                <p className="truncate text-[13px] font-bold leading-tight tracking-[-0.03em] text-white">{card.name}</p>
                <p className="mt-0.5 truncate text-[10px] text-cyan-200/70">{card.title || "—"}</p>
                {card.company ? <p className="mt-0.5 truncate text-[10px] text-slate-500">{card.company}</p> : null}
              </div>
            </div>
            <div className="shrink-0 rounded-[14px] border border-white/10 bg-white/[0.04] p-1.5">
              <QRCodeSVG value={qrValue} size={36} bgColor="transparent" fgColor="#cbd5e1" />
            </div>
          </div>

          {/* Template pill */}
          <div className="inline-flex w-fit items-center gap-1.5 rounded-full border border-white/8 bg-white/[0.04] px-2.5 py-1">
            <span className={cn("h-1.5 w-1.5 rounded-full bg-gradient-to-r", card.color)} />
            <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-400">{card.template}</span>
          </div>

          {/* Contacts */}
          {filledContacts.length > 0 && (
            <div className="overflow-hidden rounded-[18px] border border-white/[0.07] bg-white/[0.03]">
              {filledContacts.map((item, i) => {
                const value = card[item.key];
                const Icon = item.icon;
                return (
                  <div key={item.key} className={cn("flex items-center gap-2.5 px-3 py-2.5", i > 0 && "border-t border-white/[0.06]")}>
                    <div className={cn("flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br border", item.color)}>
                      <Icon className="h-3 w-3" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[8px] font-semibold uppercase tracking-[0.14em] text-slate-600">{item.label}</p>
                      <p className="truncate text-[10px] font-medium text-slate-200">{value}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between pt-0.5">
            <div className="flex items-center gap-1.5">
              <ScanLine className="h-3 w-3 text-slate-600" />
              <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-600">QR → {shareTarget.label}</span>
            </div>
            <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-700">DigiCard</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-[32px] bg-[linear-gradient(160deg,rgba(18,21,36,0.99),rgba(8,10,18,1))] shadow-[0_32px_80px_rgba(0,0,0,0.6)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(34,211,238,0.12),transparent_45%),radial-gradient(ellipse_at_bottom_left,rgba(139,92,246,0.1),transparent_45%)]" />
      <div className={cn("absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r", card.color)} />

      <div className="relative flex flex-col p-6">
        {/* Header */}
        <div className="flex items-start gap-4">
          <Avatar name={card.name} imageUrl={imageUrl} size="lg" />
          <div className="flex-1 min-w-0">
            {/* Template pill */}
            <div className="inline-flex items-center gap-1.5 rounded-full border border-white/8 bg-white/[0.04] px-3 py-1 mb-2">
              <span className={cn("h-1.5 w-1.5 rounded-full bg-gradient-to-r", card.color)} />
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">{card.template}</span>
            </div>
            <p className="text-[26px] font-bold tracking-[-0.04em] leading-tight text-white">{card.name}</p>
            <p className="mt-1 text-sm font-medium text-cyan-200/80">{card.title}</p>
            {card.company ? <p className="mt-0.5 text-sm text-slate-500">{card.company}</p> : null}
          </div>
          <div className="shrink-0 rounded-[20px] border border-white/10 bg-white/[0.04] p-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
            <QRCodeSVG value={qrValue} size={60} bgColor="transparent" fgColor="#cbd5e1" />
          </div>
        </div>

        {/* Contacts — unified panel with row separators */}
        {filledContacts.length > 0 && (
          <div className="mt-6 overflow-hidden rounded-[24px] border border-white/[0.08] bg-white/[0.03]">
            {filledContacts.map((item, i) => {
              const value = card[item.key];
              const Icon = item.icon;
              return (
                <div key={item.key} className={cn("flex items-center gap-4 px-5 py-4", i > 0 && "border-t border-white/[0.06]")}>
                  <div className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br border", item.color)}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-600">{item.label}</p>
                    <p className="mt-0.5 truncate text-sm font-medium text-slate-100">{value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Footer */}
        <div className="mt-6 flex items-center justify-between border-t border-white/[0.07] pt-4">
          <div className="flex items-center gap-2">
            <ScanLine className="h-3.5 w-3.5 text-slate-600" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-600">QR opens {shareTarget.label}</span>
          </div>
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-700">DigiCard</span>
        </div>
      </div>
    </div>
  );
}

"use client";

import { AtSign, Globe, Mail, Phone } from "lucide-react";
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
  { key: "email", label: "Email", icon: Mail },
  { key: "phone", label: "Phone", icon: Phone },
  { key: "linkedin", label: "LinkedIn", icon: AtSign },
  { key: "website", label: "Website", icon: Globe },
] as const;

export function CardPreview({ card, compact = false, imageUrl }: CardPreviewProps) {
  const shareTarget = getCardShareTarget(card);
  const qrValue = shareTarget.url;
  const filledContacts = contactItems.filter((item) => Boolean(card[item.key]));
  const initials = card.name.split(" ").slice(0, 2).map((p) => p[0]).join("");

  if (compact) {
    return (
      <div className="relative w-full max-w-[280px] overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(160deg,rgba(18,22,38,0.99),rgba(9,11,20,1))] shadow-[0_24px_60px_rgba(0,0,0,0.5)]">
        <div className={cn("absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r", card.color)} />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.04),transparent_60%)]" />

        <div className="relative flex flex-col p-4">
          {/* Avatar + template */}
          <div className="flex items-center gap-2.5">
            {imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={imageUrl} alt={card.name} className="h-9 w-9 shrink-0 rounded-[12px] object-cover ring-1 ring-white/10" />
            ) : (
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] border border-white/10 bg-white/[0.07] text-sm font-bold text-white">
                {initials}
              </div>
            )}
            <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-slate-500">{card.template}</span>
          </div>

          {/* Name + title + company */}
          <div className="mt-4">
            <p className="text-[22px] font-bold leading-[1.1] tracking-[-0.04em] text-white">{card.name}</p>
            {card.title ? <p className="mt-1.5 text-[11px] font-medium text-slate-400">{card.title}</p> : null}
            {card.company ? <p className="mt-0.5 text-[10px] text-slate-600">{card.company}</p> : null}
          </div>

          {/* Contact rows */}
          {filledContacts.length > 0 && (
            <div className="mt-4 flex flex-col">
              {filledContacts.map((item, i) => {
                const value = card[item.key];
                const Icon = item.icon;
                return (
                  <div key={item.key} className={cn("flex items-center gap-2.5 py-2", i > 0 && "border-t border-white/[0.06]")}>
                    <Icon className="h-3 w-3 shrink-0 text-slate-600" />
                    <p className="truncate text-[11px] text-slate-300">{value}</p>
                  </div>
                );
              })}
            </div>
          )}

          {/* QR code — bottom center */}
          <div className="mt-5 flex justify-center">
            <div className="rounded-[16px] bg-white p-2.5 shadow-[0_8px_24px_rgba(0,0,0,0.3)]">
              <QRCodeSVG value={qrValue} size={72} bgColor="#ffffff" fgColor="#0f172a" />
            </div>
          </div>

          {/* Footer */}
          <p className="mt-3 text-center text-[8px] font-semibold uppercase tracking-[0.2em] text-slate-700">DigiCard</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[linear-gradient(160deg,rgba(18,22,38,0.99),rgba(9,11,20,1))] shadow-[0_32px_80px_rgba(0,0,0,0.6)]">
      <div className={cn("absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r", card.color)} />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.05),transparent_55%)]" />

      <div className="relative flex flex-col p-7">
        {/* Avatar + template badge */}
        <div className="flex items-center gap-3">
          {imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={imageUrl} alt={card.name} className="h-12 w-12 shrink-0 rounded-[16px] object-cover ring-1 ring-white/10 shadow-[0_12px_28px_rgba(0,0,0,0.35)]" />
          ) : (
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[16px] border border-white/10 bg-white/[0.07] text-base font-bold text-white shadow-[0_12px_28px_rgba(0,0,0,0.3)]">
              {initials}
            </div>
          )}
          <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">{card.template}</span>
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

        {/* Contact rows — clean lines, no boxes */}
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

        {/* QR code — large, centered, bottom */}
        <div className="mt-10 flex flex-col items-center gap-3">
          <div className="rounded-[22px] bg-white p-4 shadow-[0_16px_48px_rgba(0,0,0,0.4)]">
            <QRCodeSVG value={qrValue} size={120} bgColor="#ffffff" fgColor="#0f172a" />
          </div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-700">
            Scan to connect · DigiCard
          </p>
        </div>
      </div>
    </div>
  );
}

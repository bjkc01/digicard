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
  phoneHero?: boolean;
};

const contactItems = [
  { key: "email", label: "Email", icon: Mail },
  { key: "phone", label: "Phone", icon: Phone },
  { key: "linkedin", label: "LinkedIn", icon: AtSign },
  { key: "website", label: "Website", icon: Globe },
] as const;

export function CardPreview({ card, compact = false, imageUrl, phoneHero = false }: CardPreviewProps) {
  const shareTarget = getCardShareTarget(card);
  const qrValue = shareTarget.url;
  const filledContacts = contactItems.filter((item) => Boolean(card[item.key]));
  const shareLabel = shareTarget.label === "DigiCard home" ? "Home" : shareTarget.label;
  const statusItems = [
    { value: shareLabel, label: "QR" },
    { value: `${filledContacts.length}`, label: "Links" },
    { value: card.title ? "Ready" : "Draft", label: "Status" },
  ];
  const initials = card.name.split(" ").slice(0, 2).map((p) => p[0]).join("");

  if (compact && phoneHero) {
    return (
      <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[1.85rem] border border-white/10 bg-[linear-gradient(180deg,rgba(16,19,31,0.99),rgba(8,10,18,1))] shadow-[0_18px_36px_rgba(0,0,0,0.35)]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.18),transparent_34%),radial-gradient(circle_at_85%_12%,rgba(34,211,238,0.1),transparent_20%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))]" />
        <div className={cn("absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r", card.color)} />

        <div className="relative flex h-full flex-col gap-2 p-2.5">
          <div className="flex items-start gap-2">
            {imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={imageUrl}
                alt={card.name}
                className="h-8 w-8 shrink-0 rounded-2xl object-cover ring-1 ring-white/10"
              />
            ) : (
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.08] text-[11px] font-semibold text-white">
                {card.name
                  .split(" ")
                  .slice(0, 2)
                  .map((part) => part[0])
                  .join("")}
              </div>
            )}

            <div className="min-w-0">
              <p className="truncate text-[8px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                DigiCard
              </p>
              <p className="truncate text-[13px] font-semibold leading-[1.1] tracking-[-0.04em] text-white">
                {card.name}
              </p>
              <p className="mt-0.5 text-[9px] font-medium leading-3 text-cyan-100/85">{card.title}</p>
              {card.company ? (
                <p className="mt-1 text-[8px] leading-3 text-slate-400">{card.company}</p>
              ) : null}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {contactItems.map((item) => {
              const value = card[item.key];
              if (!value) return null;
              const Icon = item.icon;

              return (
                <div
                  key={item.key}
                  className="rounded-[14px] border border-white/10 bg-white/[0.05] px-2 py-1.5 backdrop-blur"
                >
                  <div className="flex items-center gap-1.5">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-black/20 text-cyan-100">
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[7px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                        {item.label}
                      </p>
                      <p className="truncate text-[9px] font-medium leading-3 text-slate-100">
                        {value}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-3 gap-2">
            {statusItems.map((metric) => (
              <div
                key={metric.label}
                className="rounded-[14px] border border-white/10 bg-black/20 px-1.5 py-1.5 text-center"
              >
                <p className="truncate text-[10px] font-semibold text-white">{metric.value}</p>
                <p className="mt-0.5 text-[7px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-auto rounded-[16px] border border-white/10 bg-[linear-gradient(180deg,rgba(41,48,78,0.95),rgba(24,28,51,0.98))] px-2.5 py-2 shadow-[0_16px_28px_rgba(0,0,0,0.3)]">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-[rgba(82,103,217,0.28)] text-cyan-100">
                <QRCodeSVG value={qrValue} size={12} bgColor="transparent" fgColor="#c7d2fe" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-[10px] font-semibold leading-3 text-white">Scan to connect</p>
                <p className="truncate text-[8px] leading-3 text-slate-400">Opens your profile instantly</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (compact) {
    return (
      <div className="relative w-full max-w-[280px] overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(160deg,rgba(18,22,38,0.99),rgba(9,11,20,1))] shadow-[0_24px_60px_rgba(0,0,0,0.5)]">
        <div className={cn("absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r", card.color)} />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.04),transparent_60%)]" />

        <div className="relative flex flex-col p-4">
          {/* Avatar */}
          <div className="flex items-center gap-2.5">
            {imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={imageUrl} alt={card.name} className="h-9 w-9 shrink-0 rounded-[12px] object-cover ring-1 ring-white/10" />
            ) : (
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] border border-white/10 bg-white/[0.07] text-sm font-bold text-white">
                {initials}
              </div>
            )}
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
                    <Icon className="h-3 w-3 shrink-0 text-slate-500" />
                    <p className="truncate text-[11px] text-slate-300">{value}</p>
                  </div>
                );
              })}
            </div>
          )}

          {/* QR code */}
          <div className="mt-5 flex justify-center">
            <div className="rounded-[16px] bg-white p-2.5 shadow-[0_8px_24px_rgba(0,0,0,0.3)]">
              <QRCodeSVG value={qrValue} size={72} bgColor="#ffffff" fgColor="#0f172a" />
            </div>
          </div>

          {/* DigiCard branding */}
          <div className="mt-3 flex items-center justify-center gap-1.5">
            <span className="text-[8px] font-medium uppercase tracking-[0.18em] text-slate-600">Scan to connect ·</span>
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400">DigiCard</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[linear-gradient(160deg,rgba(18,22,38,0.99),rgba(9,11,20,1))] shadow-[0_32px_80px_rgba(0,0,0,0.6)]">
      <div className={cn("absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r", card.color)} />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.05),transparent_55%)]" />

      <div className="relative flex flex-col p-7">
        {/* Avatar */}
        <div className="flex items-center gap-3">
          {imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={imageUrl} alt={card.name} className="h-12 w-12 shrink-0 rounded-[16px] object-cover ring-1 ring-white/10 shadow-[0_12px_28px_rgba(0,0,0,0.35)]" />
          ) : (
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[16px] border border-white/10 bg-white/[0.07] text-base font-bold text-white shadow-[0_12px_28px_rgba(0,0,0,0.3)]">
              {initials}
            </div>
          )}
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

        {/* QR code — large, centered */}
        <div className="mt-10 flex justify-center">
          <div className="rounded-[22px] bg-white p-4 shadow-[0_16px_48px_rgba(0,0,0,0.4)]">
            <QRCodeSVG value={qrValue} size={120} bgColor="#ffffff" fgColor="#0f172a" />
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
  );
}

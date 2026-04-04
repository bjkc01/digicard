"use client";

import { AtSign, Globe, Mail, Phone } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { DigiCard } from "@/lib/data";
import { cn } from "@/lib/utils";

type CardPreviewProps = {
  card: DigiCard;
  compact?: boolean;
  imageUrl?: string;
};

const contactItems = [
  { key: "email", label: "Email", icon: Mail },
  { key: "linkedin", label: "LinkedIn", icon: AtSign },
  { key: "website", label: "Website", icon: Globe },
  { key: "phone", label: "Phone", icon: Phone },
] as const;

export function CardPreview({ card, compact = false, imageUrl }: CardPreviewProps) {
  const qrValue = `https://digicard.app/view/${card.id}`;

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[30px] border border-white/12 bg-[linear-gradient(180deg,rgba(16,19,31,0.96),rgba(8,10,18,0.98))] shadow-[0_28px_80px_rgba(0,0,0,0.52)]",
        compact ? "min-h-[280px]" : "min-h-[620px]",
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.12),transparent_22%),radial-gradient(circle_at_85%_12%,rgba(34,211,238,0.14),transparent_24%),radial-gradient(circle_at_50%_100%,rgba(59,130,246,0.12),transparent_34%)]" />
      <div className={cn("absolute inset-x-0 top-0 h-1 bg-gradient-to-r", card.color)} />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:86px_86px] opacity-30" />

      <div className="relative flex h-full flex-col p-5 md:p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            {imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={imageUrl}
                alt={card.name}
                className="h-16 w-16 rounded-[22px] object-cover shadow-[0_18px_40px_rgba(0,0,0,0.32)] ring-1 ring-white/10"
              />
            ) : (
              <div className="flex h-16 w-16 items-center justify-center rounded-[22px] border border-white/10 bg-white/[0.08] text-lg font-semibold text-white shadow-[0_18px_40px_rgba(0,0,0,0.28)]">
                {card.name
                  .split(" ")
                  .slice(0, 2)
                  .map((part) => part[0])
                  .join("")}
              </div>
            )}

            <div>
              <div className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-300">
                {card.template}
              </div>
              <p className="mt-3 text-[30px] font-semibold tracking-[-0.05em] text-white">
                {card.name}
              </p>
              <p className="mt-1 text-sm font-medium text-cyan-100/85">{card.title}</p>
              <p className="mt-1 text-sm text-slate-400">{card.company}</p>
            </div>
          </div>

          <div className="rounded-[22px] border border-white/10 bg-white/[0.06] p-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
            <QRCodeSVG value={qrValue} size={56} bgColor="transparent" fgColor="#e2e8f0" />
          </div>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {contactItems.map((item) => {
            const value = card[item.key];
            if (!value) return null;
            const Icon = item.icon;

            return (
              <div
                key={item.key}
                className="rounded-[22px] border border-white/10 bg-white/[0.05] px-4 py-4 backdrop-blur"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-black/20 text-cyan-100">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                      {item.label}
                    </p>
                    <p className="mt-1 truncate text-sm text-slate-200">{value}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {[
            { value: "142", label: "Views" },
            { value: "38", label: "Taps" },
            { value: "12", label: "Saves" },
          ].map((metric) => (
            <div
              key={metric.label}
              className="rounded-[22px] border border-white/10 bg-black/20 px-4 py-4 text-center"
            >
              <p className="text-2xl font-semibold tracking-[-0.04em] text-white">
                {metric.value}
              </p>
              <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-500">
                {metric.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-auto pt-8">
          <div className="flex items-center justify-between border-t border-white/10 pt-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
                Share identity
              </p>
              <p className="mt-1 text-sm text-slate-300">Designed to look sharp on first tap.</p>
            </div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
              DigiCard
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

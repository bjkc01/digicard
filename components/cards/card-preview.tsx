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
  const contactPointCount = contactItems.filter((item) => Boolean(card[item.key])).length;
  const statusItems = [
    { value: card.template, label: "Template" },
    { value: `${contactPointCount}`, label: "Links" },
    { value: card.title ? "Ready" : "Draft", label: "Status" },
  ];

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[30px] border border-white/12 bg-[linear-gradient(180deg,rgba(16,19,31,0.96),rgba(8,10,18,0.98))] shadow-[0_28px_80px_rgba(0,0,0,0.52)]",
        compact ? "min-h-[520px]" : "min-h-[620px]",
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.12),transparent_22%),radial-gradient(circle_at_85%_12%,rgba(34,211,238,0.14),transparent_24%),radial-gradient(circle_at_50%_100%,rgba(59,130,246,0.12),transparent_34%)]" />
      <div className={cn("absolute inset-x-0 top-0 h-1 bg-gradient-to-r", card.color)} />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:86px_86px] opacity-30" />

      <div className={cn("relative flex h-full flex-col", compact ? "p-4" : "p-5 md:p-6")}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            {imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={imageUrl}
                alt={card.name}
                className={cn(
                  "object-cover shadow-[0_18px_40px_rgba(0,0,0,0.32)] ring-1 ring-white/10",
                  compact ? "h-12 w-12 rounded-[18px]" : "h-16 w-16 rounded-[22px]",
                )}
              />
            ) : (
              <div
                className={cn(
                  "flex items-center justify-center border border-white/10 bg-white/[0.08] font-semibold text-white shadow-[0_18px_40px_rgba(0,0,0,0.28)]",
                  compact ? "h-12 w-12 rounded-[18px] text-base" : "h-16 w-16 rounded-[22px] text-lg",
                )}
              >
                {card.name
                  .split(" ")
                  .slice(0, 2)
                  .map((part) => part[0])
                  .join("")}
              </div>
            )}

            <div>
              <div
                className={cn(
                  "inline-flex items-center rounded-full border border-white/10 bg-white/[0.06] font-semibold uppercase tracking-[0.22em] text-slate-300",
                  compact ? "px-3 py-1 text-[8.5px]" : "px-3 py-1 text-[10px]",
                )}
              >
                {card.template}
              </div>
              <p
                className={cn(
                  "font-semibold tracking-[-0.05em] text-white",
                  compact ? "mt-2 text-[22px] leading-[1.02]" : "mt-3 text-[30px]",
                )}
              >
                {card.name}
              </p>
              <p className={cn("mt-1 font-medium text-cyan-100/85", compact ? "text-[11px]" : "text-sm")}>
                {card.title}
              </p>
              {card.company ? (
                <p className={cn("mt-1 text-slate-400", compact ? "text-[11px]" : "text-sm")}>
                  {card.company}
                </p>
              ) : null}
            </div>
          </div>

          {!compact ? (
            <div className="rounded-[22px] border border-white/10 bg-white/[0.06] p-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
              <QRCodeSVG value={qrValue} size={56} bgColor="transparent" fgColor="#e2e8f0" />
            </div>
          ) : null}
        </div>

        <div className={cn("grid gap-3 sm:grid-cols-2", compact ? "mt-5" : "mt-8")}>
          {contactItems.map((item) => {
            const value = card[item.key];
            if (!value) return null;
            const Icon = item.icon;

            return (
              <div
                key={item.key}
                className={cn(
                  "rounded-[22px] border border-white/10 bg-white/[0.05] backdrop-blur",
                  compact ? "px-3 py-3" : "px-4 py-4",
                )}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "flex items-center justify-center rounded-2xl border border-white/10 bg-black/20 text-cyan-100",
                      compact ? "h-9 w-9" : "h-10 w-10",
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <p
                      className={cn(
                        "font-semibold uppercase tracking-[0.22em] text-slate-500",
                        compact ? "text-[9px]" : "text-[11px]",
                      )}
                    >
                      {item.label}
                    </p>
                    <p className={cn("mt-1 truncate text-slate-200", compact ? "text-[12px]" : "text-sm")}>
                      {value}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className={cn("grid gap-3 sm:grid-cols-3", compact ? "mt-5" : "mt-8")}>
          {statusItems.map((metric) => (
            <div
              key={metric.label}
              className={cn(
                "rounded-[22px] border border-white/10 bg-black/20 text-center",
                compact ? "px-3 py-3" : "px-4 py-4",
              )}
            >
              <p className={cn("font-semibold tracking-[-0.04em] text-white", compact ? "text-[16px]" : "text-2xl")}>
                {metric.value}
              </p>
              <p className={cn("mt-1 uppercase tracking-[0.2em] text-slate-500", compact ? "text-[10px]" : "text-xs")}>
                {metric.label}
              </p>
            </div>
          ))}
        </div>

        <div className={cn("mt-auto", compact ? "pt-5" : "pt-8")}>
          <div className="flex items-center justify-between border-t border-white/10 pt-4">
            <div>
              <p className={cn("font-semibold uppercase tracking-[0.24em] text-slate-500", compact ? "text-[9px]" : "text-[11px]")}>
                Share identity
              </p>
              <p className={cn("mt-1 text-slate-300", compact ? "text-[12px]" : "text-sm")}>
                Built from the latest saved workspace details.
              </p>
            </div>
            <span className={cn("font-semibold uppercase tracking-[0.24em] text-slate-500", compact ? "text-[9px]" : "text-[11px]")}>
              DigiCard
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

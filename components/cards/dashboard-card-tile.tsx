"use client";

import { useState } from "react";
import { AtSign, Globe, Mail, Phone, QrCode, ScanLine } from "lucide-react";
import { DigiCard } from "@/lib/data";
import { ManageModal } from "@/components/cards/manage-modal";
import { cn } from "@/lib/utils";

type DashboardCardTileProps = {
  card: DigiCard;
  onDelete: (id: number) => void;
};

const quickLinks = [
  { key: "email", label: "Email", icon: Mail },
  { key: "linkedin", label: "LinkedIn", icon: AtSign },
] as const;

export function DashboardCardTile({ card, onDelete }: DashboardCardTileProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <article className="relative overflow-hidden rounded-[1.9rem] border border-[rgba(82,103,217,0.08)] bg-[linear-gradient(180deg,rgba(22,28,48,0.96),rgba(16,20,36,0.98))] p-5 shadow-[0_20px_50px_rgba(10,14,26,0.2)]">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#5267d9] via-[#7c8eff] to-[#9bb0ff]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(126,146,255,0.18),transparent_26%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.06),transparent_28%)]" />

        <div className="relative">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.07] text-lg font-semibold text-white">
                {card.name
                  .split(" ")
                  .slice(0, 2)
                  .map((part) => part[0])
                  .join("")}
              </div>
              <div>
                <div className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.24em] text-slate-300">
                  {card.template}
                </div>
                <h3 className="mt-3 text-[1.9rem] font-semibold leading-[1] tracking-[-0.05em] text-white">
                  {card.name}
                </h3>
                <p className="mt-2 text-sm font-medium text-cyan-100/80">{card.title}</p>
                <p className="mt-1 text-sm text-slate-400">{card.company}</p>
              </div>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] text-slate-200">
              <QrCode className="h-5 w-5" />
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {quickLinks.map((item) => {
              const value = card[item.key];
              const Icon = item.icon;

              return (
                <div key={item.key} className="rounded-[1.3rem] border border-white/10 bg-white/[0.05] px-4 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-2xl border border-white/10 bg-black/20 text-cyan-100">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-slate-500">
                        {item.label}
                      </p>
                      <p className="mt-1 truncate text-sm text-slate-200">{value}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
              <ScanLine className="h-3.5 w-3.5" />
              Event-ready
            </div>
            <div className="rounded-full bg-white/[0.06] px-3 py-1 text-xs font-medium text-slate-300">
              142 opens
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
            <p className="max-w-[13rem] text-sm leading-6 text-slate-300">
              Ready to share at fairs, mentor chats, and networking events.
            </p>
            <button
              onClick={() => setShowModal(true)}
              className={cn(
                "rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm font-medium text-white transition",
                "hover:border-white/20 hover:bg-white/[0.1]",
              )}
            >
              Manage
            </button>
          </div>
        </div>
      </article>

      {showModal && <ManageModal card={card} onClose={() => setShowModal(false)} onDelete={onDelete} />}
    </>
  );
}

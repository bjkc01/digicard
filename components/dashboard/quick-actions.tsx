"use client";

import { ArrowRight, Layers3, QrCode, UserPlus } from "lucide-react";
import { toast } from "sonner";

const actions = [
  {
    label: "Update profile links",
    description: "Refresh your resume, portfolio, and LinkedIn before your next event.",
    icon: Layers3,
  },
  {
    label: "Generate new QR assets",
    description: "Export QR codes in high-res PNG and SVG formats.",
    icon: QrCode,
  },
  {
    label: "Prepare for a new event",
    description: "Duplicate a card and tailor it for a fair, meetup, or application season.",
    icon: UserPlus,
  },
];

export function QuickActions() {
  return (
    <div className="panel border-[rgba(82,103,217,0.08)] bg-white p-6">
      <p className="eyebrow text-[var(--brand)]">Quick actions</p>
      <div className="mt-5 space-y-3">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.label}
              type="button"
              onClick={() => toast.info(action.label, { description: action.description })}
              className="flex w-full items-center justify-between rounded-[1.4rem] border border-[rgba(82,103,217,0.1)] bg-[var(--soft)] px-4 py-4 text-left text-sm font-medium text-[var(--ink)] transition hover:border-[rgba(82,103,217,0.22)] hover:bg-white"
            >
              <span className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-[var(--brand)] shadow-[0_10px_22px_rgba(21,32,58,0.05)]">
                  <Icon className="h-4 w-4" />
                </span>
                {action.label}
              </span>
              <ArrowRight className="h-4 w-4 text-[var(--brand)]" />
            </button>
          );
        })}
      </div>
    </div>
  );
}

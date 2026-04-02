"use client";

import { toast } from "sonner";

const actions = [
  {
    label: "Update company branding",
    description: "Sync your logo and brand colors across all cards.",
  },
  {
    label: "Generate new QR assets",
    description: "Export QR codes in high-res PNG and SVG formats.",
  },
  {
    label: "Invite a team member",
    description: "Add colleagues to your DigiCard workspace.",
  },
];

export function QuickActions() {
  return (
    <div className="panel p-6">
      <p className="eyebrow">Quick actions</p>
      <div className="mt-5 space-y-3">
        {actions.map((action) => (
          <button
            key={action.label}
            type="button"
            onClick={() =>
              toast.info(action.label, { description: action.description })
            }
            className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-4 text-left text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
          >
            {action.label}
            <span className="text-slate-400">→</span>
          </button>
        ))}
      </div>
    </div>
  );
}

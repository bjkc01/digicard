import { ArrowRight, LayoutTemplate, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

const actions = [
  {
    description: "Refresh your title, contact details, and default workspace identity.",
    href: "/settings",
    icon: Settings,
    label: "Open settings",
  },
  {
    description: "Review the template catalog and keep your default style consistent.",
    href: "/templates",
    icon: LayoutTemplate,
    label: "Browse templates",
  },
] as const;

export function QuickActions() {
  return (
    <div className="panel border-[rgba(82,103,217,0.08)] bg-white p-6">
      <p className="eyebrow text-[var(--brand)]">Quick actions</p>
      <div className="mt-5 space-y-3">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Button
              key={action.label}
              href={action.href}
              variant="ghost"
              className="flex h-auto w-full items-center justify-between rounded-[1.4rem] border border-[rgba(82,103,217,0.1)] bg-[var(--soft)] px-4 py-4 text-left text-sm font-medium text-[var(--ink)] transition hover:border-[rgba(82,103,217,0.22)] hover:bg-white"
            >
              <span className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-[var(--brand)] shadow-[0_10px_22px_rgba(21,32,58,0.05)]">
                  <Icon className="h-4 w-4" />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-[var(--ink)]">{action.label}</span>
                  <span className="mt-1 block text-sm font-normal leading-6 text-[var(--muted)]">
                    {action.description}
                  </span>
                </span>
              </span>
              <ArrowRight className="h-4 w-4 shrink-0 text-[var(--brand)]" />
            </Button>
          );
        })}
      </div>
    </div>
  );
}

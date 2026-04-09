import Link from "next/link";
import { CreditCard, LayoutTemplate, LogOut, Settings, Sparkles, WalletCards } from "lucide-react";
import { navigationItems } from "@/lib/data";
import { cn } from "@/lib/utils";
import { signOutFromWorkspace } from "@/lib/workspace-actions";

type SidebarProps = {
  activePath: string;
};

const icons = {
  Dashboard: Sparkles,
  "My Card": WalletCards,
  Templates: LayoutTemplate,
  Settings: Settings,
} as const;

export function Sidebar({ activePath }: SidebarProps) {
  return (
    <aside className="panel flex h-fit flex-col gap-8 border-[rgba(82,103,217,0.08)] bg-[linear-gradient(180deg,_rgba(255,255,255,0.96),_rgba(244,247,255,0.92))] p-6 lg:sticky lg:top-6">
      <div className="flex items-center gap-3 border-b border-[rgba(82,103,217,0.1)] pb-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,_#172340,_#5267d9)] text-white shadow-[0_16px_30px_rgba(82,103,217,0.2)]">
          <CreditCard className="h-5 w-5" />
        </div>
        <div>
          <p className="text-lg font-semibold text-[var(--ink)]">DigiCard</p>
          <p className="text-sm text-[var(--muted)]">Student networking workspace</p>
        </div>
      </div>

      <nav className="flex flex-col gap-2">
        {navigationItems.map((item) => {
          const Icon = icons[item.label as keyof typeof icons];
          const isActive = activePath === item.href;

          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition",
                isActive
                  ? "bg-[rgba(82,103,217,0.12)] text-[var(--ink)]"
                  : "text-[var(--muted)] hover:bg-white hover:text-[var(--ink)]",
              )}
            >
              {Icon ? <Icon className="h-4 w-4" /> : null}
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto rounded-[1.6rem] border border-[rgba(82,103,217,0.08)] bg-white p-5 shadow-[0_12px_30px_rgba(21,32,58,0.04)]">
        <p className="text-sm font-semibold text-[var(--ink)]">Session</p>
        <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
          Sign out from the current workspace session on this browser.
        </p>

        <form action={signOutFromWorkspace} className="mt-4">
          <button
            type="submit"
            className="flex w-full items-center justify-between rounded-[1.25rem] border border-[rgba(25,35,61,0.08)] bg-[var(--soft)] px-4 py-3 text-left text-sm font-semibold text-[var(--ink)] transition hover:border-[rgba(82,103,217,0.18)] hover:bg-white"
          >
            <span className="inline-flex items-center gap-3">
              <LogOut className="h-4 w-4 text-[var(--brand)]" />
              Sign out
            </span>
            <span className="text-xs font-medium text-[var(--muted)]">Account</span>
          </button>
        </form>
      </div>
    </aside>
  );
}

import Link from "next/link";
import { CreditCard, LayoutTemplate, LogOut, Settings, Sparkles, WalletCards } from "lucide-react";
import { navigationItems } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { signOutFromWorkspace } from "@/lib/workspace-actions";

type SidebarProps = {
  activePath: string;
  email: string;
  userName: string;
};

const icons = {
  Dashboard: Sparkles,
  "My Card": WalletCards,
  Templates: LayoutTemplate,
  Settings: Settings,
} as const;

export function Sidebar({ activePath, email, userName }: SidebarProps) {
  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <aside className="panel flex h-fit flex-col gap-8 border-[rgba(82,103,217,0.08)] bg-[linear-gradient(180deg,_rgba(255,255,255,0.96),_rgba(244,247,255,0.92))] p-6 lg:sticky lg:top-6">
      <div className="flex items-center gap-3 border-b border-[rgba(82,103,217,0.1)] pb-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,_#172340,_#5267d9)] text-white shadow-[0_16px_30px_rgba(82,103,217,0.2)]">
          <CreditCard className="h-5 w-5" />
        </div>
        <div>
          <p className="text-lg font-semibold text-[var(--ink)]">DigiCard</p>
        </div>
      </div>

      <nav className="flex flex-col gap-1">
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
                  ? "bg-[var(--brand)] text-white shadow-[0_8px_20px_rgba(82,103,217,0.28)]"
                  : "text-[var(--muted)] hover:bg-white hover:text-[var(--ink)]",
              )}
            >
              {Icon ? <Icon className="h-4 w-4" /> : null}
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto border-t border-[rgba(82,103,217,0.08)] pt-6">
        <div className="rounded-[1.35rem] bg-[var(--soft)] px-4 py-4 shadow-[0_10px_24px_rgba(21,32,58,0.04)]">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,_#172340,_#5267d9)] text-xs font-bold text-white shadow-[0_12px_24px_rgba(82,103,217,0.22)]">
              {initials}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-[var(--ink)]">{userName}</p>
              <p className="truncate text-xs text-[var(--muted)]">{email}</p>
            </div>
          </div>

          <form action={signOutFromWorkspace} className="mt-4">
            <Button
              type="submit"
              variant="secondary"
              className="w-full justify-center rounded-2xl border-[rgba(25,35,61,0.08)] bg-white px-4 py-2.5 text-[var(--ink)] shadow-[0_10px_24px_rgba(21,32,58,0.04)] hover:border-red-200 hover:bg-red-50 hover:text-red-600"
            >
              <span className="inline-flex items-center gap-2">
                <LogOut className="h-4 w-4" />
                Sign out
              </span>
            </Button>
          </form>
        </div>
      </div>
    </aside>
  );
}

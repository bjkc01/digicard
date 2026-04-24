import Link from "next/link";
import { LayoutTemplate, LogOut, Settings, Sparkles, WalletCards } from "lucide-react";
import { navigationItems } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { BrandMark } from "@/components/ui/brand-mark";
import { ProfileAvatar } from "@/components/ui/profile-avatar";
import { cn } from "@/lib/utils";
import { signOutFromWorkspace } from "@/lib/workspace-actions";
import { MobileNav } from "@/components/dashboard/mobile-nav";

type SidebarProps = {
  activePath: string;
  avatarUrl?: string;
  email: string;
  userName: string;
};

const icons = {
  Dashboard: Sparkles,
  "My Cards": WalletCards,
  Templates: LayoutTemplate,
  Settings: Settings,
} as const;

export function Sidebar({ activePath, avatarUrl, email, userName }: SidebarProps) {
  return (
    <>
      <MobileNav
        activePath={activePath}
        avatarUrl={avatarUrl}
        className="lg:hidden"
        email={email}
        userName={userName}
      />
      <aside className="hidden h-full min-h-dvh flex-col border-r border-slate-200/80 bg-white p-5 shadow-none lg:flex">
        <div className="border-b border-slate-200/80 pb-5">
          <BrandMark />
        </div>

        <nav className="mt-5 flex flex-col gap-1.5">
          {navigationItems.map((item) => {
            const Icon = icons[item.label as keyof typeof icons];
            const isActive = activePath === item.href;

            return (
              <Link
                key={item.label}
                href={item.href}
                prefetch
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium transition",
                  isActive
                    ? "bg-[var(--brand)] text-white shadow-[0_8px_18px_rgba(82,103,217,0.24)]"
                    : "text-[var(--muted)] hover:bg-[var(--brand-soft)] hover:text-[var(--ink)]",
                )}
              >
                {Icon ? <Icon className="h-4 w-4" /> : null}
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-6 border-t border-slate-200/80 pt-5">
          <div className="rounded-2xl bg-[var(--soft)] px-3.5 py-4">
            <div className="flex items-center gap-3">
              <ProfileAvatar
                avatarUrl={avatarUrl}
                className="h-10 w-10 flex-shrink-0 rounded-full text-xs shadow-[0_12px_24px_rgba(82,103,217,0.22)]"
                name={userName}
                textClassName="text-xs font-bold"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-[var(--ink)]">{userName}</p>
                <p className="truncate text-[11px] leading-5 text-[var(--muted)]" title={email}>
                  {email}
                </p>
              </div>
            </div>

            <form action={signOutFromWorkspace} className="mt-4">
              <Button
                type="submit"
                variant="ghost"
                className="w-full justify-center px-4 py-2.5 text-red-600 hover:bg-red-50 hover:text-red-700"
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
    </>
  );
}

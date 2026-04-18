"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { CreditCard, LayoutTemplate, LogOut, Menu, Settings, Sparkles, WalletCards, X } from "lucide-react";
import { useState } from "react";
import { navigationItems } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { ProfileAvatar } from "@/components/ui/profile-avatar";
import { cn } from "@/lib/utils";
import { signOutFromWorkspace } from "@/lib/workspace-actions";

type MobileNavProps = {
  activePath: string;
  avatarUrl?: string;
  className?: string;
  email: string;
  userName: string;
};

const icons = {
  Dashboard: Sparkles,
  "My Cards": WalletCards,
  Templates: LayoutTemplate,
  Settings: Settings,
} as const;

export function MobileNav({ activePath, avatarUrl, className, email, userName }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={cn("w-full min-w-0 max-w-full", className)}>
      {/* Compact top bar — sits in normal flow as a grid item on mobile */}
      <div className="flex items-center justify-between rounded-2xl border border-[rgba(82,103,217,0.08)] bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(244,247,255,0.92))] px-4 py-3 shadow-[0_8px_20px_rgba(21,32,58,0.04)]">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[linear-gradient(135deg,_#172340,_#5267d9)] text-white shadow-[0_8px_20px_rgba(82,103,217,0.2)]">
            <CreditCard className="h-4 w-4" />
          </div>
          <p className="text-base font-semibold text-[var(--ink)]">DigiCard</p>
        </div>
        <button
          type="button"
          aria-label="Open navigation"
          onClick={() => setIsOpen(true)}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-[rgba(25,35,61,0.08)] text-[var(--ink)] transition hover:bg-[var(--soft)]"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      <AnimatePresence>
        {isOpen ? (
          <>
            {/* Backdrop */}
            <motion.div
              aria-hidden
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-[rgba(15,23,42,0.3)] backdrop-blur-[2px]"
              onClick={() => setIsOpen(false)}
            />

            {/* Left drawer */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
              className="fixed inset-y-0 left-0 z-50 flex w-[min(85vw,20rem)] flex-col border-r border-[rgba(82,103,217,0.08)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(244,247,255,0.95))] p-5 shadow-[18px_0_48px_rgba(15,23,42,0.12)]"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between border-b border-[rgba(82,103,217,0.1)] pb-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,_#172340,_#5267d9)] text-white shadow-[0_16px_30px_rgba(82,103,217,0.2)]">
                    <CreditCard className="h-5 w-5" />
                  </div>
                  <p className="text-lg font-semibold text-[var(--ink)]">DigiCard</p>
                </div>
                <button
                  type="button"
                  aria-label="Close navigation"
                  onClick={() => setIsOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-[rgba(25,35,61,0.08)] text-[var(--muted)] transition hover:bg-[var(--soft)] hover:text-[var(--ink)]"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Nav links */}
              <nav className="mt-4 flex flex-col gap-1">
                {navigationItems.map((item) => {
                  const Icon = icons[item.label as keyof typeof icons];
                  const isActive = activePath === item.href;
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
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

              {/* User info + sign out */}
              <div className="mt-auto border-t border-[rgba(82,103,217,0.08)] pt-5">
                <div className="rounded-[1.35rem] bg-[var(--soft)] px-4 py-4 shadow-[0_10px_24px_rgba(21,32,58,0.04)]">
                  <div className="flex items-center gap-3">
                    <ProfileAvatar
                      avatarUrl={avatarUrl}
                      className="h-10 w-10 flex-shrink-0 rounded-full text-xs shadow-[0_12px_24px_rgba(82,103,217,0.22)]"
                      name={userName}
                      textClassName="text-xs font-bold"
                    />
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
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  LayoutTemplate,
  LogOut,
  Menu,
  Settings,
  Sparkles,
  WalletCards,
  X,
} from "lucide-react";
import { useState } from "react";
import { navigationItems } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { BrandMark } from "@/components/ui/brand-mark";
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

export function MobileNav({
  activePath,
  avatarUrl,
  className,
  email,
  userName,
}: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={cn("w-full min-w-0 max-w-full", className)}>
      <div className="flex items-center justify-between rounded-2xl border border-slate-200/80 bg-white px-4 py-3 shadow-[0_8px_20px_rgba(21,32,58,0.04)]">
        <BrandMark markClassName="h-9 w-9 rounded-xl" />
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
            <motion.div
              aria-hidden
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-[rgba(15,23,42,0.3)] backdrop-blur-[2px]"
              onClick={() => setIsOpen(false)}
            />

            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
              className="fixed inset-y-0 left-0 z-50 flex w-[min(85vw,20rem)] flex-col border-r border-[rgba(82,103,217,0.08)] bg-white p-5 shadow-[18px_0_48px_rgba(15,23,42,0.12)]"
            >
              <div className="flex items-center justify-between border-b border-[rgba(82,103,217,0.1)] pb-5">
                <BrandMark />
                <button
                  type="button"
                  aria-label="Close navigation"
                  onClick={() => setIsOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-[rgba(25,35,61,0.08)] text-[var(--muted)] transition hover:bg-[var(--soft)] hover:text-[var(--ink)]"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <nav className="mt-4 flex flex-col gap-1">
                {navigationItems.map((item) => {
                  const Icon = icons[item.label as keyof typeof icons];
                  const isActive = activePath === item.href;

                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      prefetch
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition",
                        isActive
                          ? "bg-[var(--brand)] text-white shadow-[0_8px_20px_rgba(82,103,217,0.28)]"
                          : "text-[var(--muted)] hover:bg-[var(--brand-soft)] hover:text-[var(--ink)]",
                      )}
                    >
                      {Icon ? <Icon className="h-4 w-4" /> : null}
                      {item.label}
                    </Link>
                  );
                })}
              </nav>

              <div className="mt-auto border-t border-[rgba(82,103,217,0.08)] pt-5">
                <div className="rounded-2xl bg-[var(--soft)] px-4 py-4">
                  <div className="flex items-center gap-3">
                    <ProfileAvatar
                      avatarUrl={avatarUrl}
                      className="h-10 w-10 flex-shrink-0 rounded-full text-xs shadow-[0_12px_24px_rgba(82,103,217,0.22)]"
                      name={userName}
                      textClassName="text-xs font-bold"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-[var(--ink)]">
                        {userName}
                      </p>
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
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

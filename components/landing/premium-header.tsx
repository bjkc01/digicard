"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { CreditCard, Menu, X } from "lucide-react";
import { useState } from "react";
import { HomeAuthModal } from "@/components/login/home-auth-modal";

type PremiumHeaderProps = {
  children: React.ReactNode;
  showAuthModal: boolean;
};

const navLinks = [
  { href: "#live-preview", label: "Preview" },
  { href: "#why-it-matters", label: "Why it matters" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#use-cases", label: "Use cases" },
] as const;

export function PremiumHeader({ children, showAuthModal }: PremiumHeaderProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 sm:py-5">
        <Link href="/" className="flex min-h-[44px] min-w-0 items-center gap-3" onClick={closeMenu}>
          <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,_#172340,_#5267d9)] shadow-[0_16px_30px_rgba(82,103,217,0.18)]">
            <CreditCard className="h-5 w-5 text-white" />
          </div>
          <div className="min-w-0">
            <p className="text-lg font-semibold tracking-tight text-[var(--ink)]">DigiCard</p>
            <p className="hidden text-xs font-medium text-[var(--muted)] sm:block">
              Student-first networking cards
            </p>
          </div>
        </Link>

        <nav
          className="hidden items-center gap-2 lg:flex"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {navLinks.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              className="relative inline-flex min-h-[44px] items-center rounded-full px-4 py-2 text-sm font-medium text-gray-500 transition-colors duration-200 ease-in-out hover:text-gray-900"
              onFocus={() => setHoveredIndex(index)}
              onMouseEnter={() => setHoveredIndex(index)}
            >
              {hoveredIndex === index ? (
                <motion.div
                  layoutId="navHighlight"
                  className="absolute inset-0 -z-10 rounded-full bg-gray-100"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              ) : null}
              <span className="relative z-10">{link.label}</span>
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <HomeAuthModal
            initiallyOpen={showAuthModal}
            buttonClassName="hidden min-h-[44px] rounded-full px-4 py-2 text-sm font-semibold text-[var(--muted)] transition hover:bg-[var(--soft)] hover:text-[var(--ink)] sm:inline-flex sm:items-center"
            callbackUrl="/dashboard"
          >
            {children}
          </HomeAuthModal>
          <Link
            href="/dashboard"
            className="hidden min-h-[44px] items-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg sm:inline-flex"
          >
            Create my card
          </Link>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(25,35,61,0.08)] text-[var(--ink)] transition hover:bg-[var(--soft)] lg:hidden"
            aria-controls="mobile-navigation"
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
            onClick={() => setIsMenuOpen((current) => !current)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {isMenuOpen ? (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, height: 0, y: -8 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="border-t border-[rgba(25,35,61,0.08)] bg-white lg:hidden"
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 sm:px-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="inline-flex min-h-[48px] items-center rounded-2xl px-4 py-3 text-sm font-semibold text-[var(--ink)] transition hover:bg-[var(--soft)]"
                  onClick={closeMenu}
                >
                  {link.label}
                </a>
              ))}

              <div className="mt-2 grid gap-2 sm:grid-cols-2">
                <HomeAuthModal
                  initiallyOpen={showAuthModal}
                  buttonClassName="inline-flex min-h-[48px] w-full items-center justify-center rounded-2xl border border-[rgba(25,35,61,0.08)] bg-white px-4 py-3 text-sm font-semibold text-[var(--ink)] transition hover:bg-[var(--soft)]"
                  callbackUrl="/dashboard"
                >
                  {children}
                </HomeAuthModal>
                <Link
                  href="/dashboard"
                  className="inline-flex min-h-[48px] items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-md transition hover:shadow-lg"
                  onClick={closeMenu}
                >
                  Create my card
                </Link>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

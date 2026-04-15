"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CreditCard, Menu } from "lucide-react";
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

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-5">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,_#172340,_#5267d9)] shadow-[0_16px_30px_rgba(82,103,217,0.18)]">
            <CreditCard className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="text-lg font-semibold tracking-tight text-[var(--ink)]">DigiCard</p>
            <p className="text-xs font-medium text-[var(--muted)]">Student-first networking cards</p>
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
              className="relative rounded-full px-4 py-2 text-sm font-medium text-gray-500 transition-colors duration-200 ease-in-out hover:text-gray-900"
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

        <div className="flex items-center gap-3">
          <HomeAuthModal
            initiallyOpen={showAuthModal}
            buttonClassName="hidden rounded-full px-4 py-2 text-sm font-semibold text-[var(--muted)] transition hover:bg-[var(--soft)] hover:text-[var(--ink)] sm:inline-flex"
            callbackUrl="/dashboard"
          >
            {children}
          </HomeAuthModal>
          <Link
            href="/dashboard"
            className="hidden rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg sm:inline-flex"
          >
            Create my card
          </Link>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(25,35,61,0.08)] text-[var(--ink)] lg:hidden"
            aria-label="Open navigation"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}

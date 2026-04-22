"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CreditCard } from "lucide-react";
import { useState } from "react";
import { HomeAuthModal } from "@/components/login/home-auth-modal";

type PremiumHeaderProps = {
  children: React.ReactNode;
  showAuthModal: boolean;
};

const navLinks = [
  { href: "#live-preview", label: "Preview" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#why-it-matters", label: "Why it matters" },
  { href: "#use-cases", label: "Use cases" },
] as const;

export function PremiumHeader({ children, showAuthModal }: PremiumHeaderProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.06] bg-[#0a0a0a]/90 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex items-center justify-between gap-3 py-3 sm:gap-4 sm:py-4">
          <Link href="/" className="flex min-h-[44px] min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,_#172340,_#5267d9)] shadow-[0_8px_20px_rgba(82,103,217,0.3)] sm:h-11 sm:w-11">
              <CreditCard className="h-4 w-4 text-white sm:h-5 sm:w-5" />
            </div>
            <p className="text-base font-semibold tracking-tight text-white sm:text-lg">DigiCard</p>
          </Link>

          <nav
            className="hidden items-center gap-1 lg:flex"
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {navLinks.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                className="relative inline-flex min-h-[44px] items-center rounded-full px-4 py-2 text-sm font-medium text-white/50 transition-colors duration-200 hover:text-white"
                onFocus={() => setHoveredIndex(index)}
                onMouseEnter={() => setHoveredIndex(index)}
              >
                {hoveredIndex === index ? (
                  <motion.div
                    layoutId="navHighlight"
                    className="absolute inset-0 -z-10 rounded-full bg-white/[0.07]"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                ) : null}
                <span className="relative z-10">{link.label}</span>
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <HomeAuthModal
              initiallyOpen={showAuthModal}
              buttonClassName="inline-flex min-h-[38px] items-center rounded-full px-3 py-2 text-sm font-semibold text-white/50 transition hover:bg-white/[0.07] hover:text-white sm:min-h-[44px] sm:px-4"
              callbackUrl="/dashboard"
            >
              {children}
            </HomeAuthModal>
            <Link
              href="/dashboard"
              className="inline-flex rounded-full bg-[#5267d9] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(82,103,217,0.28)] transition-all duration-200 hover:bg-[#6376e0] hover:-translate-y-px sm:px-5"
            >
              Create my card
            </Link>
          </div>
        </div>

        <nav
          className="flex gap-2 overflow-x-auto pb-3 lg:hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          aria-label="Homepage sections"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="inline-flex min-h-[38px] shrink-0 items-center rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-2 text-sm font-medium text-white/55 transition-colors hover:border-white/18 hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

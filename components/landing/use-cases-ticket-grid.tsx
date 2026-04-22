"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

type UseCaseTicketGridProps = {
  items: ReadonlyArray<{
    title: string;
    copy: string;
  }>;
};

const viewportConfig = { once: true, margin: "-50px" } as const;

export function UseCasesTicketGrid({ items }: UseCaseTicketGridProps) {
  return (
    <motion.div
      className="mt-14 grid gap-5 lg:grid-cols-2"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportConfig}
      transition={{ type: "spring", stiffness: 96, damping: 17 }}
    >
      {items.map((item, index) => (
        <motion.div
          key={item.title}
          className="group relative overflow-hidden rounded-[1.9rem] border border-dashed border-[rgba(25,35,61,0.12)] bg-white p-6 [box-shadow:inset_0_1px_0_rgba(255,255,255,0.92),inset_0_-1px_0_rgba(25,35,61,0.04),0_18px_40px_rgba(21,32,58,0.05)] transition-all duration-300 hover:-translate-y-1 hover:[box-shadow:inset_0_1px_0_rgba(255,255,255,0.92),inset_0_-1px_0_rgba(25,35,61,0.06),0_28px_56px_rgba(21,32,58,0.1)]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{
            type: "spring",
            stiffness: 110,
            damping: 16,
            delay: index * 0.08,
          }}
        >
          <div className="pointer-events-none absolute inset-x-8 top-[4.55rem] border-t border-dashed border-[rgba(25,35,61,0.12)]" />
          <div className="pointer-events-none absolute -left-2 top-[4.55rem] h-4 w-4 -translate-y-1/2 rounded-full bg-[var(--canvas)] ring-1 ring-[rgba(25,35,61,0.08)]" />
          <div className="pointer-events-none absolute -right-2 top-[4.55rem] h-4 w-4 -translate-y-1/2 rounded-full bg-[var(--canvas)] ring-1 ring-[rgba(25,35,61,0.08)]" />

          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.26em] text-[var(--brand)]/70">
                Event pass
              </p>
              <p className="mt-3 text-lg font-semibold tracking-[-0.03em] text-[var(--ink)]">{item.title}</p>
            </div>
            <span className="rounded-full border border-[rgba(82,103,217,0.14)] bg-[rgba(82,103,217,0.08)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand)]">
              0{index + 1}
            </span>
          </div>

          <p className="mt-7 text-sm leading-7 text-[var(--muted)]">{item.copy}</p>

          <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand)]/75 transition-colors duration-300 group-hover:text-[var(--ink)]/82">
            Designed for quick follow-up
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

"use client";

import { motion } from "framer-motion";
import { BriefcaseBusiness, Code2, MessageCircle, Users } from "lucide-react";

type UseCaseTicketGridProps = {
  items: ReadonlyArray<{
    title: string;
    copy: string;
  }>;
};

const icons = [BriefcaseBusiness, Users, Code2, MessageCircle] as const;

const viewportConfig = { once: true, margin: "-40px" } as const;

export function UseCasesTicketGrid({ items }: UseCaseTicketGridProps) {
  return (
    <div className="mt-12 grid gap-4 sm:grid-cols-2">
      {items.map((item, index) => {
        const Icon = icons[index] ?? BriefcaseBusiness;
        return (
          <motion.div
            key={item.title}
            className="rounded-[1.6rem] border border-[rgba(25,35,61,0.07)] bg-white p-7 shadow-[0_16px_35px_rgba(21,32,58,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(82,103,217,0.14)] hover:shadow-[0_24px_48px_rgba(21,32,58,0.09)]"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportConfig}
            transition={{
              type: "spring",
              stiffness: 110,
              damping: 16,
              delay: index * 0.08,
            }}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#5267d9]/10 text-[#5267d9]">
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="mt-5 text-base font-semibold tracking-[-0.02em] text-[var(--ink)]">
              {item.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{item.copy}</p>
          </motion.div>
        );
      })}
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { GlowCard } from "@/components/ui/spotlight-card";
import { ShineBorder } from "@/components/ui/shine-border";

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
          <ShineBorder
            borderRadius={30}
            borderWidth={1}
            duration={24}
            color={["#7b97ff", "#5267d9", "#a5b8ff"]}
            className="w-full"
          >
            <GlowCard
              glowColor="blue"
              borderRadius={30}
              className="group relative w-full overflow-hidden bg-white/[0.06] p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start justify-between gap-4">
                <p className="text-lg font-semibold tracking-[-0.03em] text-white">{item.title}</p>
                <span className="rounded-full border border-[rgba(123,151,255,0.3)] bg-[rgba(123,151,255,0.12)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#7b97ff]">
                  0{index + 1}
                </span>
              </div>
              <p className="mt-4 text-sm leading-7 text-white/60">{item.copy}</p>
            </GlowCard>
          </ShineBorder>
        </motion.div>
      ))}
    </motion.div>
  );
}

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
            className="rounded-[1.6rem] border border-white/[0.07] bg-white/[0.03] p-7 transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.055]"
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
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#5267d9]/12 text-[#8da0ff]">
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="mt-5 text-base font-semibold tracking-[-0.02em] text-white">
              {item.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-white/45">{item.copy}</p>
          </motion.div>
        );
      })}
    </div>
  );
}

"use client";

import { motion, type Variants } from "framer-motion";
import { UserPen, LayoutList, ScanLine } from "lucide-react";
import type { ComponentType } from "react";
import { GlowCard } from "@/components/ui/spotlight-card";
import { ShineBorder } from "@/components/ui/shine-border";

type Step = {
  body: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  id: string;
  title: string;
};

const viewport = { once: true, margin: "-100px" } as const;

const gridVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.2,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  hover: {
    y: -5,
    boxShadow: "0 18px 44px rgba(17, 24, 39, 0.1), 0 8px 22px rgba(17, 24, 39, 0.06)",
    transition: {
      duration: 0.22,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const baseCardShadow = "0 10px 30px rgba(17, 24, 39, 0.06), 0 2px 8px rgba(17, 24, 39, 0.03)";

const steps = [
  {
    id: "01",
    title: "Create your profile",
    body: "Add your name, role, school, and a short bio. Takes 60 seconds \u2014 no app download needed.",
    Icon: UserPen,
  },
  {
    id: "02",
    title: "Add your links",
    body: "Drop in LinkedIn, portfolio, resume, GitHub, email \u2014 whatever makes your story complete.",
    Icon: LayoutList,
  },
  {
    id: "03",
    title: "Share with one scan",
    body: "Open your QR at any event. No fumbling, no spelling, no awkward pauses \u2014 just connect.",
    Icon: ScanLine,
  },
] satisfies ReadonlyArray<Step>;

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="mx-auto max-w-7xl px-6 py-24">
      <div className="max-w-3xl">
        <h2 className="text-4xl font-semibold tracking-[-0.05em] text-white sm:text-5xl">
          A simple flow built for the way networking actually happens.
        </h2>
        <p className="mt-5 max-w-2xl text-[1.05rem] leading-8 text-white/60">
          Set up your card once, open it in seconds, and share it when the conversation matters most.
        </p>
      </div>

      <motion.div
        className="mt-14 grid gap-5 lg:grid-cols-3"
        variants={gridVariants}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
      >
        {steps.map((step) => (
          <motion.div key={step.id} variants={cardVariants} whileHover="hover">
            <ShineBorder
              borderRadius={20}
              borderWidth={1}
              duration={22}
              color={["#7b97ff", "#5267d9", "#a5b8ff"]}
              className="w-full"
            >
              <GlowCard
                glowColor="blue"
                borderRadius={20}
                className="relative flex min-h-[20.5rem] w-full flex-col items-start overflow-hidden bg-white/[0.06] px-7 py-7 backdrop-blur-sm"
              >
                <span className="mb-4 inline-block text-[0.88rem] font-extrabold tracking-[0.12em] text-[#7b97ff]">
                  {step.id}
                </span>

                <step.Icon aria-hidden="true" className="mb-6 h-8 w-8 text-[#7b97ff]" />

                <h3 className="max-w-[13rem] text-[1.9rem] font-bold leading-[1.02] tracking-[-0.045em] text-white">
                  {step.title}
                </h3>

                <p className="mt-3 max-w-[16rem] text-base leading-[1.85] text-white/60">
                  {step.body}
                </p>
              </GlowCard>
            </ShineBorder>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

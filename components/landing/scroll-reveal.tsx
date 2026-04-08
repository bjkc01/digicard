"use client";

import type { HTMLAttributes } from "react";
import { useEffect, useRef, useState } from "react";

type ScrollRevealProps = HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
  delayMs?: number;
};

export function ScrollReveal({
  children,
  className,
  delayMs = 0,
  style,
  ...props
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;

    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.15 },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      {...props}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0px)" : "translateY(28px)",
        transition: `opacity 720ms ease, transform 720ms ease`,
        transitionDelay: `${delayMs}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

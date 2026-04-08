"use client";

import { type ComponentPropsWithoutRef, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type ScrollRevealProps = ComponentPropsWithoutRef<"div"> & {
  delayMs?: number;
};

export function ScrollReveal({
  children,
  className,
  delayMs = 0,
  style,
  ...props
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (mediaQuery.matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsVisible(true);
        observer.disconnect();
      },
      {
        threshold: 0.16,
        rootMargin: "0px 0px -72px 0px",
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={elementRef}
      className={cn("scroll-reveal", isVisible && "scroll-reveal--visible", className)}
      style={
        {
          ...style,
          "--scroll-reveal-delay": `${delayMs}ms`,
        } as ComponentPropsWithoutRef<"div">["style"]
      }
      {...props}
    >
      {children}
    </div>
  );
}

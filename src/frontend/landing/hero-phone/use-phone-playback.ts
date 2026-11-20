"use client";

import { useEffect, useState, type RefObject } from "react";

export type Scene = "card" | "wallet" | "pass";

// One loop of the phone's "screen recording". Each step shows a scene; the finger
// gesture for that step plays during its last TOUCH_MS, then the next step starts.
export const TIMELINE: readonly { scene: Scene; ms: number }[] = [
  { scene: "card", ms: 4200 }, // live card, finger taps "Add to Apple Wallet"
  { scene: "wallet", ms: 3000 }, // Wallet opens, passes slide in, finger taps the DigiCard pass
  { scene: "pass", ms: 4600 }, // pass opens with its QR code, finger taps "Done"
  { scene: "wallet", ms: 1500 }, // back to the stack, finger swipes up to go home
];
export const TOUCH_MS = 820;

/**
 * Plays the phone demo on a loop, always. It only holds still when the visitor's device
 * asks for reduced motion (stays on the live card) or while the phone is scrolled out of view.
 */
export function usePhonePlayback(stageRef: RefObject<HTMLElement | null>) {
  const [step, setStep] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [inView, setInView] = useState(true);
  const running = inView && !reducedMotion;

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      setReducedMotion(query.matches);
      if (query.matches) setStep(0);
    };
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.15 });
    observer.observe(stage);
    return () => observer.disconnect();
  }, [stageRef]);

  useEffect(() => {
    if (!running) return;
    const timer = window.setTimeout(() => setStep((current) => (current + 1) % TIMELINE.length), TIMELINE[step].ms);
    return () => window.clearTimeout(timer);
  }, [step, running]);

  return {
    step,
    scene: TIMELINE[step].scene,
    running,
    // When the finger gesture of the current step begins.
    touchDelayMs: TIMELINE[step].ms - TOUCH_MS,
  };
}

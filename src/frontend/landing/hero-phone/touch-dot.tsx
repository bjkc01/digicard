import styles from "./touch-dot.module.css";

// The grey "finger" circle iOS draws in screen recordings. Place it inside the element being
// touched; it plays once, starting at the inherited --touch-delay, whenever `active` turns on.

type TouchDotProps = {
  active: boolean;
  gesture?: "tap" | "swipe";
  className?: string;
};

export function TouchDot({ active, gesture = "tap", className = "" }: TouchDotProps) {
  return <span aria-hidden="true" className={`${styles.dot} ${className}`} data-active={active} data-gesture={gesture} />;
}

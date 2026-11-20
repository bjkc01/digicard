import type { CSSProperties, ReactNode } from "react";
import { Coffee, Plane } from "lucide-react";
import styles from "./sample-passes.module.css";

// Made-up cards and passes that fill out the Wallet stack around the DigiCard pass.
// Listed top of the stack first. Only the top strip of each is visible in the stack.

function Field({ label, value }: { label: string; value: string }) {
  return (
    <span className={styles.field}>
      <span>{label}</span>
      {value}
    </span>
  );
}

const SAMPLE_PASSES: { id: string; className: string; logo: ReactNode; detail: ReactNode }[] = [
  {
    id: "air",
    className: styles.air,
    logo: <span className={styles.airLogo}><Plane size={12} strokeWidth={2.4} /> SKYLINE</span>,
    detail: <Field label="SFO → JFK" value="Gate B12" />,
  },
  {
    id: "nova",
    className: styles.nova,
    logo: (
      <svg className={styles.novaMark} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path d="M10 0l2.2 7.8L20 10l-7.8 2.2L10 20l-2.2-7.8L0 10l7.8-2.2z" />
      </svg>
    ),
    detail: <span className={styles.novaName}>NOVA<span>REWARDS</span></span>,
  },
  {
    id: "brew",
    className: styles.brew,
    logo: <span className={styles.brewLogo}><Coffee size={12} strokeWidth={2.2} /> Bean &amp; Brew</span>,
    detail: <Field label="Stars" value="8 of 10" />,
  },
  {
    id: "orbit",
    className: styles.orbit,
    logo: (
      <span className={styles.orbitLogo}>
        <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
          <circle cx="8" cy="8" r="3" fill="currentColor" stroke="none" />
          <ellipse cx="8" cy="8" rx="7" ry="3.2" transform="rotate(-28 8 8)" />
        </svg>
        Orbit Pay
      </span>
    ),
    detail: <span className={styles.balance}>$126.40</span>,
  },
  {
    id: "fair",
    className: styles.fair,
    logo: <span className={styles.fairName}>Spring<br />Career Fair</span>,
    detail: <Field label="Hall B" value="Mar 14" />,
  },
  {
    id: "metro",
    className: styles.metro,
    logo: <span className={styles.metroLogo}><span>M</span>metro</span>,
    detail: <Field label="Adult" value="$18.50" />,
  },
];

export const SAMPLE_PASS_COUNT = SAMPLE_PASSES.length;

/** `stackClassName` positions each card in the Wallet stack; `--i` is its place from the top. */
export function SamplePasses({ stackClassName }: { stackClassName: string }) {
  return (
    <>
      {SAMPLE_PASSES.map((pass, index) => (
        <div
          aria-hidden="true"
          className={`${stackClassName} ${styles.pass} ${pass.className}`}
          key={pass.id}
          style={{ "--i": index, "--ri": SAMPLE_PASS_COUNT - 1 - index } as CSSProperties}
        >
          <div className={styles.strip}>
            {pass.logo}
            {pass.detail}
          </div>
        </div>
      ))}
    </>
  );
}

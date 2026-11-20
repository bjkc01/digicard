import { memo, type CSSProperties } from "react";
import { CreditCard, Ellipsis, Plus, Search } from "lucide-react";
import QRCode from "react-qr-code";
import { siteConfig } from "@/backend/site-config";
import type { PreviewPerson } from "@/frontend/landing/hero-phone/preview-person";
import { SAMPLE_PASS_COUNT, SamplePasses } from "@/frontend/landing/hero-phone/sample-passes";
import { TouchDot } from "@/frontend/landing/hero-phone/touch-dot";
import { TOUCH_MS, type Scene } from "@/frontend/landing/hero-phone/use-phone-playback";
import styles from "./wallet-screen.module.css";

type WalletScreenProps = {
  person: PreviewPerson;
  scene: Scene;
  /** Index into TIMELINE, used to pick which finger gesture plays. */
  step: number;
  running: boolean;
  touchDelayMs: number;
};

/**
 * The Wallet app. "wallet" shows the stack of passes with the DigiCard pass in front;
 * "pass" lifts the DigiCard pass to the top (laid out like the real pass DigiCard generates)
 * and tucks the other cards away at the bottom.
 */
export const WalletScreen = memo(function WalletScreen({ person, scene, step, running, touchDelayMs }: WalletScreenProps) {
  return (
    <div
      className={styles.wallet}
      aria-hidden={scene === "card"}
      data-scene={scene}
      style={{ "--touch-delay": `${touchDelayMs}ms`, "--touch-ms": `${TOUCH_MS}ms` } as CSSProperties}
    >
      <div className={styles.homeHeader} aria-hidden="true">
        <span className={styles.largeTitle}>Wallet</span>
        <span className={styles.glassButton} data-shape="circle"><Plus size={15} strokeWidth={2.2} /></span>
        <span className={styles.glassButton}><Search size={13} strokeWidth={2.4} /><Ellipsis size={14} strokeWidth={2.6} /></span>
      </div>
      <div className={styles.passHeader} aria-hidden="true">
        <span className={styles.glassButton}>Done<TouchDot active={running && step === 2} /></span>
        <span className={styles.glassButton} data-shape="circle"><Ellipsis size={14} strokeWidth={2.6} /></span>
      </div>

      <SamplePasses stackClassName={styles.stackCard} />

      <div
        className={`${styles.stackCard} ${styles.digicard}`}
        data-pressing={running && step === 1}
        style={{ "--i": SAMPLE_PASS_COUNT } as CSSProperties}
      >
        <TouchDot active={running && step === 1} className={styles.passTouch} />
        <div className={styles.passTop}>
          <span className={styles.passLogo}><CreditCard size={12} /> DigiCard</span>
          <div className={styles.field} data-align="end"><span>Website</span><p>{person.handle}.example.com</p></div>
        </div>
        <div className={styles.passPrimary}>
          <div className={styles.field}>
            <span>{person.title}</span>
            <p className={styles.passName} style={{ fontSize: person.passNameSize }}>{person.name}</p>
          </div>
          <div className={styles.passThumb} aria-hidden="true">{person.initials}</div>
        </div>
        <div className={styles.passSecondary}>
          <div className={styles.field}><span>Email</span><p>{person.email}</p></div>
          <div className={styles.field}><span>LinkedIn</span><p>in/{person.handle}</p></div>
        </div>
        <div className={styles.passBarcode}>
          <div className={styles.passQr} aria-label="Sample QR code linking to the DigiCard homepage" role="img">
            <QRCode aria-hidden="true" bgColor="#ffffff" fgColor="#000000" size={104} value={siteConfig.url} />
          </div>
          <span>Scan to save {person.firstName}&apos;s details</span>
        </div>
      </div>

      <TouchDot active={running && step === 3} gesture="swipe" className={styles.homeSwipe} />
    </div>
  );
});

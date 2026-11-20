import { memo, type CSSProperties } from "react";
import { AtSign, Globe, Mail, Wallet } from "lucide-react";
import QRCode from "react-qr-code";
import { siteConfig } from "@/backend/site-config";
import type { PreviewPerson } from "@/frontend/landing/hero-phone/preview-person";
import { TouchDot } from "@/frontend/landing/hero-phone/touch-dot";
import { TOUCH_MS } from "@/frontend/landing/hero-phone/use-phone-playback";
import { LogoMark } from "@/frontend/ui/brand-mark";
import styles from "./card-screen.module.css";

type CardScreenProps = {
  person: PreviewPerson;
  /** The live card is on screen (otherwise it sits dimmed behind the Wallet app). */
  active: boolean;
  /** Play the finger tap on "Add to Apple Wallet". */
  touching: boolean;
  touchDelayMs: number;
};

/** The visitor's DigiCard as it appears on a phone, updated live as they type. */
export const CardScreen = memo(function CardScreen({ person, active, touching, touchDelayMs }: CardScreenProps) {
  return (
    <div
      className={styles.card}
      aria-hidden={!active}
      data-active={active}
      data-touch={touching}
      style={{ "--touch-delay": `${touchDelayMs}ms`, "--touch-ms": `${TOUCH_MS}ms` } as CSSProperties}
    >
      <div className={styles.cardBrand}><LogoMark size={14} /> DigiCard <span>Your digital introduction</span></div>
      <div className={styles.avatar} aria-hidden="true">{person.initials}</div>
      <div className={styles.identity}>
        {/* Keyed on the name so the "just updated" glow replays on every change. */}
        <p className={styles.name} key={person.name} style={{ fontSize: person.cardNameSize }}>{person.name}</p>
        <p className={styles.title}>{person.title}</p>
        <p className={styles.university}>State University</p>
      </div>
      <div className={styles.contactRows}>
        <div><Mail size={14} /><span title={person.email}>{person.email}</span></div>
        <div><AtSign size={14} /><span title={`linkedin.com/in/${person.handle}`}>linkedin.com/in/{person.handle}</span></div>
        <div><Globe size={14} /><span title={`${person.handle}.example.com`}>{person.handle}.example.com</span></div>
      </div>
      <div className={styles.qrRow}>
        <div className={styles.qr} aria-label="Sample QR code linking to the DigiCard homepage" role="img">
          <QRCode aria-hidden="true" bgColor="#ffffff" fgColor="#19233d" size={72} value={siteConfig.url} />
        </div>
        <div>
          <p>Scan to save {person.firstName}&apos;s details.</p>
          <span className={styles.qrHint}>Sample QR · DigiCard home</span>
          <span className={styles.addButton} aria-hidden="true">
            <Wallet size={10} /> Add to Apple Wallet
            <TouchDot active={touching} />
          </span>
        </div>
      </div>
    </div>
  );
});

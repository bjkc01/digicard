import type { CSSProperties, ReactNode } from "react";
import styles from "./iphone-model.module.css";

// A CSS-3D iPhone in the Pro Max style (full-width camera plateau, dark finish).
// The screen content is passed in as children.

const FRAME_LAYERS = 49; // closely spaced rounded planes form a solid metal frame at every angle
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

function CameraLens({ className }: { className: string }) {
  return (
    <span className={`${styles.lens} ${className}`}>
      {Array.from({ length: 12 }, (_, index) => (
        <span className={styles.lensBarrel} key={index} style={{ transform: `translateZ(${index * 0.5}px)` }} />
      ))}
      <span className={styles.lensRim}>
        <span className={styles.lensGlass}>
          <span className={styles.lensOptics} />
          <span className={styles.lensReflection} />
        </span>
      </span>
    </span>
  );
}

function SideButton({ className }: { className: string }) {
  return (
    <span className={`${styles.sideButton} ${className}`}>
      <span className={styles.buttonWell} />
      <span className={styles.buttonEdge} />
      <span className={styles.buttonCap} />
    </span>
  );
}

/** iOS status bar: time in the left "ear", signal / Wi-Fi / battery in the right. */
function StatusBar() {
  return (
    <div className={styles.statusBar} aria-hidden="true">
      <span className={styles.time}>9:41</span>
      <span />
      <span className={styles.statusIcons}>
        <svg viewBox="0 0 17 11" width="12.5" height="8" fill="currentColor">
          <rect x="0" y="7" width="3" height="4" rx="0.9" />
          <rect x="4.6" y="4.8" width="3" height="6.2" rx="0.9" />
          <rect x="9.2" y="2.5" width="3" height="8.5" rx="0.9" />
          <rect x="13.8" y="0" width="3" height="11" rx="0.9" />
        </svg>
        <svg viewBox="0 0 15 11" width="11.5" height="8.4" fill="none" stroke="currentColor" strokeLinecap="round">
          <path d="M1.56 4.46A8.4 8.4 0 0 1 13.44 4.46" strokeWidth="1.9" />
          <path d="M3.75 6.65A5.3 5.3 0 0 1 11.25 6.65" strokeWidth="1.9" />
          <path d="M7.5 10.4L5.73 8.63A2.5 2.5 0 0 1 9.27 8.63Z" fill="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
        </svg>
        <svg viewBox="0 0 27 13" width="19.5" height="9.4" fill="currentColor">
          <rect x="0.6" y="0.6" width="22.6" height="11.8" rx="3.6" fill="none" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.1" />
          <rect x="2.3" y="2.3" width="19.2" height="8.4" rx="2.2" />
          <path d="M24.6 4.4v4.2c.85-.3 1.5-1.15 1.5-2.1s-.65-1.8-1.5-2.1z" fillOpacity="0.45" />
        </svg>
      </span>
    </div>
  );
}

type IPhoneModelProps = {
  rotation: { x: number; y: number };
  /** Animate the next rotation change (used to ease back to the front after a drag). */
  settling: boolean;
  /** Colour of the status bar and home indicator: "light" over dark screens, "dark" over light ones. */
  tone: "light" | "dark";
  children: ReactNode;
};

export function IPhoneModel({ rotation, settling, tone, children }: IPhoneModelProps) {
  // Slide the glass reflection as the phone turns, like light catching real glass.
  const facing = (((rotation.y % 360) + 540) % 360) - 180;
  const glareShift = clamp(facing / 70, -1, 1) * 28;
  // -1…1 as the phone turns; moves the specular highlights on the metal frame, rims and lens rings.
  const sheen = Math.sin((rotation.y * Math.PI) / 180);

  return (
    <div
      className={styles.phone}
      data-settling={settling}
      style={{ "--rotate-x": `${rotation.x}deg`, "--rotate-y": `${rotation.y}deg`, "--glare-shift": `${glareShift}%`, "--sheen": sheen.toFixed(3) } as CSSProperties}
    >
      {Array.from({ length: FRAME_LAYERS }, (_, index) => (
        <div aria-hidden="true" className={styles.frameLayer} key={index} style={{ transform: `translateZ(${index * 0.5 - 12}px)` }} />
      ))}

      <div className={styles.back} aria-hidden="true">
        {/* Glass panel (wireless charging area) below the camera plateau. */}
        <div className={styles.glassPanel} />
        {/* Full-width camera plateau, raised by stacked layers: lenses sit directly on it at the left;
            flash, mic and LiDAR form a column at the right. */}
        <div className={styles.plateau}>
          {Array.from({ length: 8 }, (_, index) => (
            <span className={styles.plateauLayer} key={index} style={{ transform: `translateZ(${index * 0.5}px)` }} />
          ))}
          <span className={styles.plateauTop} />
          <CameraLens className={styles.lensOne} />
          <CameraLens className={styles.lensTwo} />
          <CameraLens className={styles.lensThree} />
          <span className={styles.flash} />
          <span className={styles.sensor} />
          <span className={styles.microphone} />
        </div>
        <svg className={styles.backLogo} viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
        </svg>
      </div>

      <div className={`${styles.side} ${styles.leftSide}`} aria-hidden="true">
        <span className={styles.sideGlint} />
        <SideButton className={styles.actionButton} />
        <SideButton className={styles.volumeUp} />
        <SideButton className={styles.volumeDown} />
      </div>
      <div className={`${styles.side} ${styles.rightSide}`} aria-hidden="true">
        <span className={styles.sideGlint} />
        <SideButton className={styles.powerButton} />
        <span className={styles.cameraControl} />
      </div>
      <div className={`${styles.endRail} ${styles.topRail}`} aria-hidden="true" />
      <div className={`${styles.endRail} ${styles.bottomRail}`} aria-hidden="true">
        <span className={styles.chargingPort} />
        <span className={`${styles.speakerHoles} ${styles.speakerLeft}`} />
        <span className={`${styles.speakerHoles} ${styles.speakerRight}`} />
        <span className={`${styles.portScrew} ${styles.screwLeft}`} />
        <span className={`${styles.portScrew} ${styles.screwRight}`} />
      </div>

      <div className={styles.front}>
        <div className={styles.bezel}>
          <div className={styles.screen} data-tone={tone}>
            {children}
            <StatusBar />
            <div className={styles.island} aria-hidden="true"><span /></div>
            <div className={styles.homeIndicator} aria-hidden="true" />
          </div>
        </div>
        <div className={styles.glass} aria-hidden="true" />
      </div>
    </div>
  );
}

"use client";

import { useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { ArrowLeftRight, AtSign, BatteryFull, CreditCard, Globe, Mail, Signal, Wifi } from "lucide-react";
import QRCode from "react-qr-code";
import { siteConfig } from "@/lib/site-config";
import styles from "./interactive-hero-preview.module.css";

const INITIAL_ROTATION = { x: 5, y: -18 };
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

function CameraLens({ className }: { className: string }) {
  return (
    <span className={`${styles.lens} ${className}`}>
      {Array.from({ length: 8 }, (_, index) => (
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

export function InteractiveHeroPreview() {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [rotation, setRotation] = useState(INITIAL_ROTATION);
  const [dragging, setDragging] = useState(false);
  const drag = useRef<{ id: number; x: number; y: number; rotation: typeof INITIAL_ROTATION } | null>(null);

  const displayName = name.trim() || "Jordan Lin";
  const displayTitle = title.trim() || "Computer Science Student";
  const parts = displayName.split(/\s+/);
  const initials = [parts[0], ...(parts.length > 1 ? [parts[parts.length - 1]] : [])]
    .map((part) => Array.from(part)[0] ?? "")
    .join("")
    .toLocaleUpperCase();
  const handle = displayName.toLowerCase().replace(/[^a-z0-9]+/g, "") || "yourname";
  const displayEmail = email.trim() || `${handle}@example.com`;
  const nameSize = displayName.length > 36 ? "1.25rem" : displayName.length > 22 ? "1.55rem" : "1.95rem";

  function startDrag(event: PointerEvent<HTMLDivElement>) {
    if (!event.isPrimary || event.button !== 0) return;
    drag.current = { id: event.pointerId, x: event.clientX, y: event.clientY, rotation };
    event.currentTarget.setPointerCapture(event.pointerId);
    setDragging(true);
  }

  function moveDrag(event: PointerEvent<HTMLDivElement>) {
    const start = drag.current;
    if (!start || start.id !== event.pointerId) return;
    setRotation({
      x: clamp(start.rotation.x - (event.clientY - start.y) * 0.16, -18, 18),
      y: start.rotation.y + (event.clientX - start.x) * 0.65,
    });
  }

  function endDrag(event: PointerEvent<HTMLDivElement>) {
    if (drag.current?.id !== event.pointerId) return;
    drag.current = null;
    setDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }

  return (
    <div className={`anim-card ${styles.preview}`} id="live-preview">
      <div className={styles.editor}>
        <div className={styles.editorHeading}>
          <label htmlFor="preview-name">Try it with your name</label>
          <span className={styles.live}><span /> Live preview</span>
        </div>
        <input
          id="preview-name"
          autoComplete="off"
          className={styles.input}
          maxLength={60}
          onChange={(event) => setName(event.target.value)}
          placeholder="Your name"
          type="text"
          value={name}
        />
        <details className={styles.details}>
          <summary>Add your title &amp; email</summary>
          <div className={styles.extraFields}>
            <label htmlFor="preview-title">Title or major</label>
            <input id="preview-title" className={styles.input} maxLength={70} onChange={(event) => setTitle(event.target.value)} placeholder="Computer Science Student" value={title} />
            <label htmlFor="preview-email">Email</label>
            <input id="preview-email" autoComplete="off" className={styles.input} maxLength={100} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" type="email" value={email} />
          </div>
        </details>
      </div>

      <div className={styles.stage}>
        <div className={styles.glow} aria-hidden="true" />
        <div className={styles.shadow} aria-hidden="true" />
        <div
          aria-describedby="phone-instructions"
          aria-label="Interactive 3D iPhone preview"
          className={styles.dragArea}
          data-dragging={dragging}
          onLostPointerCapture={endDrag}
          onPointerCancel={endDrag}
          onPointerDown={startDrag}
          onPointerMove={moveDrag}
          onPointerUp={endDrag}
          role="group"
        >
          <div
            className={styles.phone}
            style={{ "--rotate-x": `${rotation.x}deg`, "--rotate-y": `${rotation.y}deg` } as CSSProperties}
          >
            {/* Closely spaced rounded planes form a solid metal frame at every angle. */}
            {Array.from({ length: 49 }, (_, index) => (
              <div
                aria-hidden="true"
                className={styles.frameLayer}
                key={index}
                style={{ transform: `translateZ(${index * 0.5 - 12}px)` }}
              />
            ))}

            <div className={styles.back} aria-hidden="true">
              <div className={styles.cameraPlate}>
                {Array.from({ length: 8 }, (_, index) => (
                  <span className={styles.cameraBumpLayer} key={index} style={{ transform: `translateZ(${index * 0.5}px)` }} />
                ))}
                <span className={styles.cameraDeck} />
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
              <SideButton className={styles.actionButton} />
              <SideButton className={styles.volumeUp} />
              <SideButton className={styles.volumeDown} />
            </div>
            <div className={`${styles.side} ${styles.rightSide}`} aria-hidden="true"><SideButton className={styles.powerButton} /></div>
            <div className={`${styles.endRail} ${styles.topRail}`} aria-hidden="true" />
            <div className={`${styles.endRail} ${styles.bottomRail}`} aria-hidden="true">
              <span className={styles.chargingPort} />
              <span className={`${styles.speakerHoles} ${styles.speakerLeft}`} />
              <span className={`${styles.speakerHoles} ${styles.speakerRight}`} />
              <span className={`${styles.portScrew} ${styles.screwLeft}`} />
              <span className={`${styles.portScrew} ${styles.screwRight}`} />
            </div>

            <div className={styles.front}>
              <div className={styles.screen}>
                <div className={styles.statusBar} aria-hidden="true">
                  <span>9:41</span>
                  <div><Signal size={12} /><Wifi size={12} /><BatteryFull size={17} /></div>
                </div>
                <div className={styles.island} aria-hidden="true"><span /></div>
                <div className={styles.card}>
                  <div className={styles.cardBrand}><CreditCard size={14} /> DigiCard <span>Your digital introduction</span></div>
                  <div className={styles.avatar} aria-hidden="true">{initials}</div>
                  <div className={styles.identity}>
                    <p className={styles.name} style={{ fontSize: nameSize }}>{displayName}</p>
                    <p className={styles.title}>{displayTitle}</p>
                    <p className={styles.university}>State University</p>
                  </div>
                  <div className={styles.contactRows}>
                    <div><Mail size={14} /><span title={displayEmail}>{displayEmail}</span></div>
                    <div><AtSign size={14} /><span title={`linkedin.com/in/${handle}`}>linkedin.com/in/{handle}</span></div>
                    <div><Globe size={14} /><span title={`${handle}.example.com`}>{handle}.example.com</span></div>
                  </div>
                  <div className={styles.qrRow}>
                    <div className={styles.qr} aria-label="Sample QR code linking to the DigiCard homepage" role="img">
                      <QRCode aria-hidden="true" bgColor="#ffffff" fgColor="#19233d" size={72} value={siteConfig.url} />
                    </div>
                    <div><p>Scan to save {parts[0]}&apos;s details.</p><span>Sample QR · DigiCard home</span></div>
                  </div>
                </div>
                <div className={styles.homeIndicator} aria-hidden="true" />
                <div className={styles.glass} aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className={styles.instructions} id="phone-instructions"><ArrowLeftRight size={14} /> Drag the phone to look around</p>
      <p className={styles.note}>Try it out. Your preview details aren&apos;t saved.</p>
      <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">Card preview: {displayName}, {displayTitle}, {displayEmail}.</p>
    </div>
  );
}

"use client";

import { useEffect, useMemo, useRef, useState, type PointerEvent } from "react";
import { ArrowLeftRight } from "lucide-react";
import { CardScreen } from "@/frontend/landing/hero-phone/card-screen";
import { IPhoneModel } from "@/frontend/landing/hero-phone/iphone-model";
import { getPreviewPerson } from "@/frontend/landing/hero-phone/preview-person";
import { usePhonePlayback } from "@/frontend/landing/hero-phone/use-phone-playback";
import { WalletScreen } from "@/frontend/landing/hero-phone/wallet-screen";
import styles from "./hero-preview.module.css";

// Hero preview: type your name, watch it on a 3D iPhone that loops like a screen recording
// (live card → Add to Apple Wallet → Wallet stack → DigiCard pass). Drag to turn the phone.

const INITIAL_ROTATION = { x: 5, y: -18 };
const DRAG_DEGREES_PER_PX = 0.65;
const SETTLE_DELAY_MS = 2600; // after a drag, wait this long before turning back to face the visitor
const SETTLE_MS = 1300; // keep in sync with .phone[data-settling] in iphone-model.module.css
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

type Drag = { id: number; x: number; y: number; rotation: typeof INITIAL_ROTATION; lastX: number; lastTime: number; velocity: number };

export function InteractiveHeroPreview() {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const person = useMemo(() => getPreviewPerson(name, title, email), [name, title, email]);

  const stageRef = useRef<HTMLDivElement>(null);
  const { step, scene, running, touchDelayMs } = usePhonePlayback(stageRef);
  const showWallet = scene !== "card";

  const [rotation, setRotation] = useState(INITIAL_ROTATION);
  const [dragging, setDragging] = useState(false);
  const [settling, setSettling] = useState(false);
  const drag = useRef<Drag | null>(null);
  const motion = useRef({ frame: 0, timer: 0 });

  useEffect(() => {
    const pending = motion.current;
    return () => {
      cancelAnimationFrame(pending.frame);
      window.clearTimeout(pending.timer);
    };
  }, []);

  function stopMotion() {
    cancelAnimationFrame(motion.current.frame);
    window.clearTimeout(motion.current.timer);
    setSettling(false);
  }

  // Once the phone comes to rest, ease it back to the nearest front-facing angle.
  function settleLater() {
    motion.current.timer = window.setTimeout(() => {
      setSettling(true);
      setRotation((current) => ({
        x: INITIAL_ROTATION.x,
        y: INITIAL_ROTATION.y + Math.round((current.y - INITIAL_ROTATION.y) / 360) * 360,
      }));
      motion.current.timer = window.setTimeout(() => setSettling(false), SETTLE_MS);
    }, SETTLE_DELAY_MS);
  }

  // A flick keeps the phone spinning briefly, slowing down with friction.
  function coast(startVelocity: number) {
    let velocity = clamp(startVelocity, -2, 2); // degrees per ms
    let last = performance.now();
    const tick = (now: number) => {
      const elapsed = Math.min(now - last, 32);
      last = now;
      velocity *= Math.pow(0.994, elapsed);
      if (Math.abs(velocity) < 0.02) {
        settleLater();
        return;
      }
      setRotation((current) => ({ ...current, y: current.y + velocity * elapsed }));
      motion.current.frame = requestAnimationFrame(tick);
    };
    motion.current.frame = requestAnimationFrame(tick);
  }

  function startDrag(event: PointerEvent<HTMLDivElement>) {
    if (!event.isPrimary || event.button !== 0) return;
    stopMotion();
    drag.current = { id: event.pointerId, x: event.clientX, y: event.clientY, rotation, lastX: event.clientX, lastTime: event.timeStamp, velocity: 0 };
    event.currentTarget.setPointerCapture(event.pointerId);
    setDragging(true);
  }

  function moveDrag(event: PointerEvent<HTMLDivElement>) {
    const start = drag.current;
    if (!start || start.id !== event.pointerId) return;
    const elapsed = event.timeStamp - start.lastTime;
    if (elapsed > 0) {
      const instant = ((event.clientX - start.lastX) * DRAG_DEGREES_PER_PX) / elapsed;
      start.velocity = start.velocity * 0.6 + instant * 0.4;
      start.lastX = event.clientX;
      start.lastTime = event.timeStamp;
    }
    setRotation({
      x: clamp(start.rotation.x - (event.clientY - start.y) * 0.16, -18, 18),
      y: start.rotation.y + (event.clientX - start.x) * DRAG_DEGREES_PER_PX,
    });
  }

  function endDrag(event: PointerEvent<HTMLDivElement>) {
    const start = drag.current;
    if (start?.id !== event.pointerId) return;
    drag.current = null;
    setDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    // A pointer that stopped before letting go shouldn't fling the phone.
    const released = event.timeStamp - start.lastTime > 80 ? 0 : start.velocity;
    if (Math.abs(released) > 0.05) coast(released);
    else settleLater();
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

      <div className={styles.stage} ref={stageRef} data-float={running && !dragging ? "running" : "paused"}>
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
          <div className={styles.float}>
            <IPhoneModel rotation={rotation} settling={settling} tone={showWallet ? "dark" : "light"}>
              <CardScreen person={person} active={!showWallet} touching={running && step === 0} touchDelayMs={touchDelayMs} />
              <WalletScreen person={person} scene={scene} step={step} running={running} touchDelayMs={touchDelayMs} />
            </IPhoneModel>
          </div>
        </div>
      </div>

      <p className={styles.instructions} id="phone-instructions"><ArrowLeftRight size={14} /> Drag the phone to look around</p>
      <p className={styles.note}>Try it out. Your preview details aren&apos;t saved.</p>
      <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {showWallet ? "Apple Wallet pass preview" : "Card preview"}: {person.name}, {person.title}, {person.email}.
      </p>
    </div>
  );
}

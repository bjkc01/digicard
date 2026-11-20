"use client";

import { useId, useState } from "react";
import { BriefcaseBusiness, Mail, Plus, UserRound, X } from "lucide-react";
import styles from "./preview-editor.module.css";

// The "Try it with your name" form above the hero phone. Whatever is typed shows up
// live on the phone; nothing is saved.

type PreviewEditorProps = {
  name: string;
  /** Initials of the typed name (shown in place of the person icon), or null before typing. */
  initials: string | null;
  title: string;
  email: string;
  onNameChange: (value: string) => void;
  onTitleChange: (value: string) => void;
  onEmailChange: (value: string) => void;
};

export function PreviewEditor({ name, initials, title, email, onNameChange, onTitleChange, onEmailChange }: PreviewEditorProps) {
  const [moreOpen, setMoreOpen] = useState(false);
  const moreId = useId();

  return (
    <div className={styles.editor}>
      <div className={styles.heading}>
        <label htmlFor="preview-name">Try it with your name</label>
        <span className={styles.live}><span aria-hidden="true" /> Live preview</span>
      </div>

      <div className={styles.group}>
        <div className={styles.row}>
          {initials ? <span className={styles.initials} aria-hidden="true">{initials}</span> : <UserRound aria-hidden="true" size={16} />}
          <input
            id="preview-name"
            autoComplete="off"
            maxLength={60}
            onChange={(event) => onNameChange(event.target.value)}
            placeholder="Your name"
            type="text"
            value={name}
          />
          {name ? (
            <button type="button" className={styles.clear} aria-label="Clear name" onClick={() => onNameChange("")}>
              <X size={12} strokeWidth={2.6} />
            </button>
          ) : null}
        </div>

        {/* Extra fields slide open; `inert` keeps them out of the tab order while closed. */}
        <div className={styles.more} data-open={moreOpen} id={moreId} inert={!moreOpen}>
          <div className={styles.moreInner}>
            <div className={styles.row}>
              <BriefcaseBusiness aria-hidden="true" size={16} />
              <label className="sr-only" htmlFor="preview-title">Title or major</label>
              <input id="preview-title" maxLength={70} onChange={(event) => onTitleChange(event.target.value)} placeholder="Title or major" value={title} />
            </div>
            <div className={styles.row}>
              <Mail aria-hidden="true" size={16} />
              <label className="sr-only" htmlFor="preview-email">Email</label>
              <input id="preview-email" autoComplete="off" maxLength={100} onChange={(event) => onEmailChange(event.target.value)} placeholder="Email address" type="email" value={email} />
            </div>
          </div>
        </div>

        <button type="button" className={styles.toggleRow} aria-controls={moreId} aria-expanded={moreOpen} onClick={() => setMoreOpen((open) => !open)}>
          <Plus aria-hidden="true" size={14} strokeWidth={2.4} />
          {moreOpen ? "Hide title & email" : "Add title & email"}
        </button>
      </div>
    </div>
  );
}

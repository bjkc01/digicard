"use client";

import {
  BellRing,
  Check,
  ChevronRight,
  LayoutTemplate,
  ShieldCheck,
  Trash2,
  UserRound,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formDefaults, templates } from "@/lib/data";
import { cn } from "@/lib/utils";

const initialProfile = {
  name: formDefaults.name,
  email: formDefaults.email,
  title: formDefaults.title,
  website: formDefaults.website,
  role: "Admin",
};

const initialNotifications = {
  cardOpens: true,
  qrScans: true,
  newSaves: false,
  weeklyDigest: true,
};

type ProfileState = typeof initialProfile;
type NotificationState = typeof initialNotifications;
type NotificationKey = keyof NotificationState;

const notificationOptions: Array<{
  key: NotificationKey;
  label: string;
  description: string;
}> = [
  {
    key: "cardOpens",
    label: "Card opens",
    description: "Get a heads-up when someone opens a shared card.",
  },
  {
    key: "qrScans",
    label: "QR code scans",
    description: "Track in-person interest from flyers, badges, and handouts.",
  },
  {
    key: "newSaves",
    label: "New contact saves",
    description: "Know when a viewer saves your card to their contacts list.",
  },
  {
    key: "weeklyDigest",
    label: "Weekly digest",
    description: "Receive a concise recap of profile activity each week.",
  },
];

function hasProfileChanges(current: ProfileState, saved: ProfileState) {
  return (Object.keys(saved) as (keyof ProfileState)[]).some((key) => current[key] !== saved[key]);
}

function hasNotificationChanges(current: NotificationState, saved: NotificationState) {
  return (Object.keys(saved) as NotificationKey[]).some((key) => current[key] !== saved[key]);
}

export default function SettingsPage() {
  const [profile, setProfile] = useState(initialProfile);
  const [savedProfile, setSavedProfile] = useState(initialProfile);
  const [selectedTemplate, setSelectedTemplate] = useState("blueprint");
  const [savedTemplate, setSavedTemplate] = useState("blueprint");
  const [notifications, setNotifications] = useState(initialNotifications);
  const [savedNotifications, setSavedNotifications] = useState(initialNotifications);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const profileDirty = hasProfileChanges(profile, savedProfile);
  const notificationDirty = hasNotificationChanges(notifications, savedNotifications);
  const templateDirty = selectedTemplate !== savedTemplate;
  const pendingSections = [profileDirty, templateDirty, notificationDirty].filter(Boolean).length;
  const enabledNotifications = Object.values(notifications).filter(Boolean).length;
  const selectedTemplateDetails =
    templates.find((template) => template.id === selectedTemplate) ?? templates[0];
  const initials = profile.name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
  const profileCompletion = Math.round(
    ([profile.name, profile.email, profile.title, profile.website].filter(Boolean).length / 4) * 100,
  );

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedProfile(profile);
    toast.success("Profile updated", {
      description: "Changes are saved for this workspace preview.",
    });
  };

  const handleTemplateSave = () => {
    setSavedTemplate(selectedTemplate);
    toast.success("Default template updated", {
      description: `New cards in this preview will start with ${selectedTemplateDetails.name}.`,
    });
  };

  const handleNotificationSave = () => {
    setSavedNotifications(notifications);
    toast.success("Notification preferences updated", {
      description: "Alert changes are saved for this workspace preview.",
    });
  };

  const toggleNotification = (key: NotificationKey) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const showPreviewToast = (label: string) => {
    toast.info(`${label} is not connected yet`, {
      description: "This screen is a polished preview until the account backend is wired up.",
    });
  };

  return (
    <main className="mx-auto grid max-w-7xl gap-6 px-4 py-4 lg:grid-cols-[280px_minmax(0,1fr)] lg:px-6 lg:py-6">
      <Sidebar activePath="/settings" />

      <section className="space-y-6">
        <header className="panel flex flex-col gap-5 border-[rgba(82,103,217,0.08)] bg-[linear-gradient(180deg,_rgba(255,255,255,0.96),_rgba(244,247,255,0.92))] p-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow text-[var(--brand)]">Settings</p>
            <h1 className="mt-2 text-[2rem] font-semibold tracking-tight text-[var(--ink)]">
              Account & preferences
            </h1>
            <p className="mt-2 max-w-2xl text-[0.98rem] leading-7 text-[var(--muted)]">
              Update your profile details, choose the default card style, and decide
              which activity deserves your attention.
            </p>
          </div>

          <div className="subtle-panel flex items-center gap-4 px-4 py-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[rgba(82,103,217,0.12)] text-[var(--brand)]">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[var(--ink)]">Workspace status</p>
              <p className="mt-1 text-sm text-[var(--muted)]">
                {pendingSections === 0
                  ? "Everything on this page is up to date."
                  : `${pendingSections} section${pendingSections === 1 ? "" : "s"} still need to be saved.`}
              </p>
            </div>
          </div>
        </header>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-6">
            <div className="panel border-[rgba(82,103,217,0.08)] bg-white p-6">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-[var(--ink)]">Profile</h2>
                  <p className="mt-1 text-sm text-[var(--muted)]">
                    This information appears across your workspace and shared cards.
                  </p>
                </div>
                <span className="inline-flex h-fit rounded-full bg-[rgba(82,103,217,0.1)] px-3 py-1 text-xs font-semibold text-[var(--brand)]">
                  {profileCompletion}% complete
                </span>
              </div>

              <form onSubmit={handleProfileSave} className="mt-6 space-y-5">
                <div className="grid gap-5 md:grid-cols-2">
                  <Input
                    label="Display name"
                    value={profile.name}
                    onChange={(e) => setProfile((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="Your name"
                    name="displayName"
                  />
                  <Input
                    label="Email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile((prev) => ({ ...prev, email: e.target.value }))}
                    placeholder="you@company.com"
                    name="email"
                  />
                </div>

                <div className="rounded-[1.6rem] border border-[rgba(82,103,217,0.08)] bg-[linear-gradient(180deg,_rgba(247,249,255,0.94),_rgba(255,255,255,0.96))] p-4">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[linear-gradient(135deg,_#172340,_#5267d9)] text-sm font-semibold text-white shadow-[0_16px_32px_rgba(82,103,217,0.18)]">
                      {initials || "DC"}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-base font-semibold text-[var(--ink)]">
                        {profile.name}
                      </p>
                      <p className="mt-1 text-sm text-[var(--muted)]">
                        {profile.title} / {profile.role}
                      </p>
                      <p className="mt-2 truncate text-sm text-[var(--muted)]">
                        {profile.email}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => showPreviewToast("Avatar uploads")}
                      className="sm:ml-auto inline-flex rounded-full border border-[rgba(82,103,217,0.14)] bg-white px-4 py-2 text-sm font-medium text-[var(--ink)] transition hover:border-[rgba(82,103,217,0.24)] hover:bg-[var(--soft)]"
                    >
                      Change avatar
                    </button>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button
                    type="submit"
                    disabled={!profileDirty}
                    className="rounded-full bg-[var(--brand)] px-5 py-3 shadow-[0_16px_34px_rgba(82,103,217,0.2)] hover:bg-[#4459cb] disabled:bg-slate-300 disabled:shadow-none"
                  >
                    Save profile
                  </Button>
                </div>
              </form>
            </div>

            <div className="panel border-[rgba(82,103,217,0.08)] bg-white p-6">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-[var(--ink)]">Default template</h2>
                  <p className="mt-1 text-sm text-[var(--muted)]">
                    New cards will start with this style selected.
                  </p>
                </div>
                <span
                  className={cn(
                    "inline-flex h-fit rounded-full px-3 py-1 text-xs font-semibold",
                    templateDirty
                      ? "bg-amber-100 text-amber-700"
                      : "bg-[rgba(82,103,217,0.1)] text-[var(--brand)]",
                  )}
                >
                  {templateDirty ? "Selection not saved" : "Current default"}
                </span>
              </div>

              <div role="radiogroup" aria-label="Default card template" className="mt-6 grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
                {templates.map((template) => {
                  const isSelected = selectedTemplate === template.id;
                  const isSaved = savedTemplate === template.id;

                  return (
                    <button
                      key={template.id}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      onClick={() => setSelectedTemplate(template.id)}
                      className={cn(
                        "rounded-[1.7rem] border p-4 text-left transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(82,103,217,0.16)]",
                        isSelected
                          ? "border-[var(--ink)] bg-white shadow-[0_18px_40px_rgba(15,23,42,0.08)]"
                          : "border-transparent bg-[var(--soft)] hover:border-[rgba(82,103,217,0.14)] hover:bg-white",
                      )}
                    >
                      <div className={cn("rounded-[1.5rem] p-3", template.tone)}>
                        <div
                          className={cn(
                            "h-24 rounded-[1.2rem] bg-gradient-to-br shadow-[inset_0_1px_0_rgba(255,255,255,0.22)]",
                            template.accent,
                          )}
                        />
                        <div className="mt-3 space-y-2 px-1">
                          <div className="h-2 w-20 rounded-full bg-slate-300/80" />
                          <div className="h-2 w-28 rounded-full bg-slate-200/90" />
                        </div>
                      </div>

                      <div className="mt-4 flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-[var(--ink)]">{template.name}</p>
                          <p className="mt-1 text-sm leading-6 text-[var(--muted)]">
                            {template.description}
                          </p>
                        </div>
                        <span
                          className={cn(
                            "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border",
                            isSelected
                              ? "border-[var(--brand)] bg-[var(--brand)] text-white"
                              : "border-slate-300 bg-white text-transparent",
                          )}
                        >
                          <Check className="h-4 w-4" />
                        </span>
                      </div>

                      <div className="mt-4 flex items-center justify-between text-xs font-medium">
                        <span className={isSaved ? "text-[var(--brand)]" : "text-[var(--muted)]"}>
                          {isSaved ? "Saved default" : isSelected ? "Selected" : "Available"}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[var(--brand)]">
                          Preview
                          <ChevronRight className="h-3.5 w-3.5" />
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 flex justify-end">
                <Button
                  type="button"
                  onClick={handleTemplateSave}
                  disabled={!templateDirty}
                  className="rounded-full bg-[var(--brand)] px-5 py-3 shadow-[0_16px_34px_rgba(82,103,217,0.2)] hover:bg-[#4459cb] disabled:bg-slate-300 disabled:shadow-none"
                >
                  Save template
                </Button>
              </div>
            </div>

            <div className="panel border-[rgba(82,103,217,0.08)] bg-white p-6">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-[var(--ink)]">Notifications</h2>
                  <p className="mt-1 text-sm text-[var(--muted)]">
                    Choose which activity should surface in your workspace.
                  </p>
                </div>
                <span className="inline-flex h-fit rounded-full bg-[rgba(82,103,217,0.1)] px-3 py-1 text-xs font-semibold text-[var(--brand)]">
                  {enabledNotifications} of {notificationOptions.length} enabled
                </span>
              </div>

              <div className="mt-6 space-y-3">
                {notificationOptions.map((item) => {
                  const enabled = notifications[item.key];

                  return (
                    <div
                      key={item.key}
                      className="flex flex-col gap-4 rounded-[1.5rem] border border-[rgba(82,103,217,0.08)] bg-white px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="max-w-2xl">
                        <p className="text-sm font-semibold text-[var(--ink)]">{item.label}</p>
                        <p className="mt-1 text-sm leading-6 text-[var(--muted)]">
                          {item.description}
                        </p>
                      </div>

                      <button
                        type="button"
                        role="switch"
                        aria-checked={enabled}
                        aria-label={`Toggle ${item.label.toLowerCase()}`}
                        onClick={() => toggleNotification(item.key)}
                        className={cn(
                          "relative inline-flex h-7 w-12 shrink-0 items-center rounded-full border transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(82,103,217,0.16)]",
                          enabled
                            ? "border-[var(--brand)] bg-[var(--brand)]"
                            : "border-slate-200 bg-slate-200",
                        )}
                      >
                        <span
                          className={cn(
                            "inline-block h-5 w-5 rounded-full bg-white shadow-[0_6px_16px_rgba(15,23,42,0.16)] transition-transform",
                            enabled ? "translate-x-6" : "translate-x-1",
                          )}
                        />
                      </button>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 flex justify-end">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleNotificationSave}
                  disabled={!notificationDirty}
                  className="rounded-full border-[rgba(82,103,217,0.14)] px-5 py-3 disabled:border-slate-200"
                >
                  Save alerts
                </Button>
              </div>
            </div>

            <div className="panel border-red-100 bg-[linear-gradient(180deg,_rgba(255,248,248,0.96),_rgba(255,255,255,0.98))] p-6">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-[var(--ink)]">Danger zone</h2>
                  <p className="mt-1 text-sm text-[var(--muted)]">
                    Sensitive account actions stay locked until a real backend workflow exists.
                  </p>
                </div>
                <span className="inline-flex h-fit rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                  Protected flow
                </span>
              </div>

              <div className="mt-6 rounded-[1.6rem] border border-red-200 bg-white/80 p-5">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-2xl bg-red-100 text-red-600">
                      <Trash2 className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-red-700">Delete account</p>
                      <p className="mt-1 max-w-2xl text-sm leading-6 text-red-600">
                        The previous version pretended deletion succeeded even though nothing
                        actually happened. This flow now stays honest until the real account
                        deletion endpoint is wired up.
                      </p>
                    </div>
                  </div>

                  {!showDeleteConfirm ? (
                    <button
                      type="button"
                      onClick={() => setShowDeleteConfirm(true)}
                      className="inline-flex shrink-0 rounded-full border border-red-200 bg-white px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                    >
                      Request deletion
                    </button>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          toast.info("Deletion workflow unavailable", {
                            description:
                              "A backend confirmation flow is still needed before this can be enabled.",
                          });
                          setShowDeleteConfirm(false);
                        }}
                        className="rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
                      >
                        I understand
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowDeleteConfirm(false)}
                        className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="panel border-[rgba(82,103,217,0.08)] bg-white p-6">
              <p className="eyebrow text-[var(--brand)]">Workspace snapshot</p>
              <div className="mt-5 space-y-3">
                <div className="rounded-[1.4rem] bg-[var(--soft)] p-4">
                  <p className="text-sm font-semibold text-[var(--ink)]">Profile status</p>
                  <p className="mt-1 text-2xl font-semibold tracking-tight text-[var(--ink)]">
                    {profileCompletion}%
                  </p>
                  <p className="mt-1 text-sm text-[var(--muted)]">
                    Core identity fields are filled and ready to publish.
                  </p>
                </div>
                <div className="rounded-[1.4rem] bg-[var(--soft)] p-4">
                  <p className="text-sm font-semibold text-[var(--ink)]">Default style</p>
                  <p className="mt-1 text-lg font-semibold text-[var(--ink)]">
                    {selectedTemplateDetails.name}
                  </p>
                  <p className="mt-1 text-sm text-[var(--muted)]">
                    {templateDirty ? "Selected but not saved yet." : "Saved as the starting point for new cards."}
                  </p>
                </div>
                <div className="rounded-[1.4rem] bg-[var(--soft)] p-4">
                  <p className="text-sm font-semibold text-[var(--ink)]">Alerts</p>
                  <p className="mt-1 text-lg font-semibold text-[var(--ink)]">
                    {enabledNotifications} active signals
                  </p>
                  <p className="mt-1 text-sm text-[var(--muted)]">
                    Keep the signals that matter and mute the noise.
                  </p>
                </div>
              </div>
            </div>

            <div className="panel overflow-hidden border-[rgba(82,103,217,0.08)] bg-white p-6">
              <p className="eyebrow text-[var(--brand)]">Selected style</p>
              <div className={cn("mt-5 rounded-[1.8rem] p-4", selectedTemplateDetails.tone)}>
                <div
                  className={cn(
                    "rounded-[1.5rem] bg-gradient-to-br p-5 text-white shadow-[0_18px_40px_rgba(15,23,42,0.16)]",
                    selectedTemplateDetails.accent,
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-white/75">{profile.name}</p>
                      <p className="mt-2 text-xl font-semibold tracking-tight">{profile.title}</p>
                    </div>
                    <LayoutTemplate className="h-5 w-5 text-white/80" />
                  </div>
                  <div className="mt-10 space-y-2 text-sm text-white/75">
                    <p>{profile.email}</p>
                    <p>{profile.website}</p>
                  </div>
                </div>
              </div>
              <p className="mt-4 text-sm leading-6 text-[var(--muted)]">
                {selectedTemplateDetails.description}
              </p>
            </div>

            <div className="panel border-[rgba(82,103,217,0.08)] bg-[linear-gradient(135deg,_#172340_0%,_#2d4177_48%,_#5267d9_100%)] p-6 text-white shadow-[0_24px_54px_rgba(35,51,103,0.22)]">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/58">
                Account safety
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em]">
                Keep the essentials within reach.
              </h2>
              <p className="mt-3 text-sm leading-7 text-white/72">
                When password resets, device reviews, and recovery options get wired up,
                this will become the control center for account security.
              </p>
              <div className="mt-6 space-y-3">
                <button
                  type="button"
                  onClick={() => showPreviewToast("Password resets")}
                  className="flex w-full items-center justify-between rounded-[1.3rem] border border-white/15 bg-white/10 px-4 py-3 text-left text-sm font-medium text-white transition hover:bg-white/14"
                >
                  <span className="inline-flex items-center gap-3">
                    <UserRound className="h-4 w-4" />
                    Reset password
                  </span>
                  <ChevronRight className="h-4 w-4 text-white/70" />
                </button>
                <button
                  type="button"
                  onClick={() => showPreviewToast("Notification routing")}
                  className="flex w-full items-center justify-between rounded-[1.3rem] border border-white/15 bg-white/10 px-4 py-3 text-left text-sm font-medium text-white transition hover:bg-white/14"
                >
                  <span className="inline-flex items-center gap-3">
                    <BellRing className="h-4 w-4" />
                    Manage alert delivery
                  </span>
                  <ChevronRight className="h-4 w-4 text-white/70" />
                </button>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

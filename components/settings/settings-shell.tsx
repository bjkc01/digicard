"use client";

import type { ChangeEvent } from "react";
import { useActionState, useEffect, useRef, useState } from "react";
import {
  AlertTriangle,
  BellRing,
  Camera,
  CreditCard,
  QrCode,
  Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";
import { CardPreview } from "@/components/cards/card-preview";
import { ProfileAvatar } from "@/components/ui/profile-avatar";
import type { WorkspaceView } from "@/lib/workspace-view";
import type { WorkspaceUser } from "@/lib/workspace-auth";
import { templates } from "@/lib/data";
import { cn } from "@/lib/utils";
import {
  maxWorkspaceAvatarDataUrlLength,
  maxWorkspaceAvatarFileSizeBytes,
  workspaceAvatarStorageKey,
} from "@/lib/workspace-avatar";
import {
  notificationSettingOptions,
  qrPreferenceOptions,
  type WorkspaceNotificationKey,
  type WorkspaceQrPreference,
} from "@/lib/workspace-settings-options";
import {
  saveNotificationSettings,
  saveProfileSettings,
} from "@/app/settings/actions";
import {
  initialSettingsActionState,
  type SettingsActionState,
} from "@/app/settings/action-state";

type SettingsShellProps = {
  user: WorkspaceUser;
  workspaceView: WorkspaceView;
};

type ProfileFormData = {
  avatarUrl: string;
  company: string;
  email: string;
  linkedin: string;
  name: string;
  phone: string;
  qrPreference: WorkspaceQrPreference;
  title: string;
  website: string;
};

function getActionTone(state: SettingsActionState) {
  if (state.status === "success") {
    return "border-[rgba(16,185,129,0.16)] bg-[rgba(236,253,245,0.92)] text-[#065f46]";
  }

  if (state.status === "warning") {
    return "border-[rgba(245,158,11,0.18)] bg-[rgba(255,251,235,0.95)] text-[#92400e]";
  }

  if (state.status === "error") {
    return "border-[rgba(239,68,68,0.16)] bg-[rgba(254,242,242,0.95)] text-[#991b1b]";
  }

  return "";
}

function buildPreviewCard(
  templateId: string,
  profile: ProfileFormData,
  fallbackTemplateId: string,
) {
  const template =
    templates.find((item) => item.id === templateId) ??
    templates.find((item) => item.id === fallbackTemplateId) ??
    templates[0]!;

  return {
    color: template.accent,
    company: profile.company,
    email: profile.email || "you@example.com",
    id: `settings-preview-${template.id}`,
    linkedin: profile.linkedin,
    name: profile.name || "Your Name",
    phone: profile.phone,
    qrPreference: profile.qrPreference,
    template: template.name,
    title: profile.title || "Student or Early Professional",
    website: profile.website,
  };
}

const manualQrOptions = qrPreferenceOptions.filter((o) => o.key !== "auto");

async function createAvatarDataUrl(file: File) {
  const objectUrl = URL.createObjectURL(file);

  try {
    const image = await new Promise<HTMLImageElement>((resolve, reject) => {
      const nextImage = new Image();
      nextImage.onload = () => resolve(nextImage);
      nextImage.onerror = () => reject(new Error("Image could not be loaded."));
      nextImage.src = objectUrl;
    });

    const size = 320;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const context = canvas.getContext("2d");

    if (!context) {
      throw new Error("Image editor is unavailable.");
    }

    const sourceSize = Math.min(image.naturalWidth, image.naturalHeight);
    const sourceX = (image.naturalWidth - sourceSize) / 2;
    const sourceY = (image.naturalHeight - sourceSize) / 2;

    context.drawImage(image, sourceX, sourceY, sourceSize, sourceSize, 0, 0, size, size);

    const primaryDataUrl = canvas.toDataURL("image/webp", 0.82);
    const fallbackDataUrl = canvas.toDataURL("image/jpeg", 0.86);
    const chosenDataUrl =
      primaryDataUrl.length <= maxWorkspaceAvatarDataUrlLength
        ? primaryDataUrl
        : fallbackDataUrl;

    if (chosenDataUrl.length > maxWorkspaceAvatarDataUrlLength) {
      throw new Error("Photo is still too large after compression.");
    }

    return chosenDataUrl;
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

export function SettingsShell({ user, workspaceView }: SettingsShellProps) {
  const router = useRouter();
  const { settings, summary } = workspaceView;

  const initialQr: WorkspaceQrPreference =
    settings.card.qrPreference === "auto" ? "website" : settings.card.qrPreference;

  const [profileForm, setProfileForm] = useState<ProfileFormData>({
    avatarUrl: settings.profile.avatarUrl,
    company: settings.card.company,
    email: settings.profile.email,
    linkedin: settings.card.linkedin,
    name: settings.profile.name,
    phone: settings.card.phone,
    qrPreference: initialQr,
    title: settings.profile.title,
    website: settings.profile.website,
  });
  const [avatarError, setAvatarError] = useState<string | null>(null);
  const [notificationState, setNotificationState] = useState(settings.notifications);
  const [profileState, profileAction] = useActionState(saveProfileSettings, initialSettingsActionState);
  const [notificationSaveState, notificationAction] = useActionState(
    saveNotificationSettings,
    initialSettingsActionState,
  );
  const avatarInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const qr: WorkspaceQrPreference =
      settings.card.qrPreference === "auto" ? "website" : settings.card.qrPreference;
    const storedAvatar =
      typeof window === "undefined"
        ? ""
        : window.localStorage.getItem(workspaceAvatarStorageKey) ?? "";
    setProfileForm({
      avatarUrl: settings.profile.avatarUrl || storedAvatar,
      company: settings.card.company,
      email: settings.profile.email,
      linkedin: settings.card.linkedin,
      name: settings.profile.name,
      phone: settings.card.phone,
      qrPreference: qr,
      title: settings.profile.title,
      website: settings.profile.website,
    });
    setAvatarError(null);
    setNotificationState(settings.notifications);
  }, [
    settings.card.company,
    settings.card.linkedin,
    settings.card.phone,
    settings.card.qrPreference,
    settings.notifications,
    settings.profile.avatarUrl,
    settings.profile.email,
    settings.profile.name,
    settings.profile.title,
    settings.profile.website,
  ]);

  useEffect(() => {
    if (
      profileState.status === "success" ||
      profileState.status === "warning" ||
      notificationSaveState.status === "success" ||
      notificationSaveState.status === "warning"
    ) {
      router.refresh();
    }
  }, [notificationSaveState.status, profileState.status, router]);

  const selectedTemplate =
    templates.find((t) => t.id === settings.defaultTemplateId) ?? templates[0]!;
  const previewCard = buildPreviewCard(settings.defaultTemplateId, profileForm, settings.defaultTemplateId);
  const enabledNotificationCount = Object.values(notificationState).filter(Boolean).length;

  const handleProfileChange =
    (field: keyof ProfileFormData) => (event: ChangeEvent<HTMLInputElement>) => {
      setProfileForm((current) => ({ ...current, [field]: event.target.value }));
    };

  const handleAvatarChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!["image/png", "image/jpeg", "image/webp"].includes(file.type)) {
      setAvatarError("Choose a PNG, JPG, or WEBP photo.");
      return;
    }

    if (file.size > maxWorkspaceAvatarFileSizeBytes) {
      setAvatarError("Photo must be under 5 MB.");
      return;
    }

    try {
      const avatarUrl = await createAvatarDataUrl(file);
      setProfileForm((current) => ({ ...current, avatarUrl }));
      setAvatarError(null);
      window.localStorage.setItem(workspaceAvatarStorageKey, avatarUrl);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "We could not process that photo.";
      setAvatarError(message);
    } finally {
      event.target.value = "";
    }
  };

  const handleAvatarRemove = () => {
    setProfileForm((current) => ({ ...current, avatarUrl: "" }));
    setAvatarError(null);
    window.localStorage.removeItem(workspaceAvatarStorageKey);

    if (avatarInputRef.current) {
      avatarInputRef.current.value = "";
    }
  };

  return (
    <section className="space-y-6">
      <header className="panel border-[rgba(82,103,217,0.08)] bg-[linear-gradient(180deg,_rgba(255,255,255,0.96),_rgba(244,247,255,0.92))] p-6">
        <h1 className="text-[2rem] font-semibold tracking-tight text-[var(--ink)]">
          Account and card settings
        </h1>
        <p className="mt-2 max-w-2xl text-[0.98rem] leading-7 text-[var(--muted)]">
          Update your profile details, notification preferences, and card defaults.
        </p>
      </header>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-6">

          {/* Profile */}
          <form action={profileAction} className="panel border-[rgba(82,103,217,0.08)] bg-white p-6">
            <h2 className="text-lg font-semibold text-[var(--ink)]">Profile</h2>
            <ActionBanner state={profileState} />

            <input name="avatarUrl" type="hidden" value={profileForm.avatarUrl} />

            <div className="mt-6 rounded-[1.6rem] border border-[rgba(82,103,217,0.08)] bg-[var(--soft)] p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <ProfileAvatar
                  avatarUrl={profileForm.avatarUrl}
                  className="h-20 w-20 rounded-full shadow-[0_18px_36px_rgba(82,103,217,0.18)]"
                  name={profileForm.name || user.name}
                  textClassName="text-lg"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-[var(--ink)]">Photo</p>
                  <p className="mt-1 text-sm leading-6 text-[var(--muted)]">
                    Appears in your account summary and dashboard.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => avatarInputRef.current?.click()}
                      className="inline-flex items-center gap-2 rounded-full border border-[rgba(82,103,217,0.14)] bg-white px-4 py-2.5 text-sm font-semibold text-[var(--ink)] shadow-[0_10px_24px_rgba(21,32,58,0.04)] transition hover:border-[rgba(82,103,217,0.24)] hover:bg-[rgba(82,103,217,0.04)]"
                    >
                      <Camera className="h-4 w-4" />
                      {profileForm.avatarUrl ? "Change photo" : "Upload photo"}
                    </button>
                    {profileForm.avatarUrl ? (
                      <button
                        type="button"
                        onClick={handleAvatarRemove}
                        className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-[var(--muted)] transition hover:bg-white hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                        Remove photo
                      </button>
                    ) : null}
                  </div>
                </div>
              </div>

              <input
                ref={avatarInputRef}
                accept="image/png,image/jpeg,image/webp"
                className="hidden"
                onChange={handleAvatarChange}
                type="file"
              />

              {avatarError || profileState.fieldErrors.avatarUrl ? (
                <p className="mt-3 text-sm text-[#991b1b]">
                  {avatarError ?? profileState.fieldErrors.avatarUrl}
                </p>
              ) : null}
            </div>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <ProfileField label="Display name" name="name" value={profileForm.name} onChange={handleProfileChange("name")} error={profileState.fieldErrors.name} required />
              <ProfileField label="Email" name="email" type="email" value={profileForm.email} onChange={handleProfileChange("email")} error={profileState.fieldErrors.email} required />
              <ProfileField label="Professional title" name="title" value={profileForm.title} onChange={handleProfileChange("title")} error={profileState.fieldErrors.title} required />
              <ProfileField label="School or company" name="company" value={profileForm.company} onChange={handleProfileChange("company")} error={profileState.fieldErrors.company} />
              <ProfileField label="Website" name="website" value={profileForm.website} onChange={handleProfileChange("website")} error={profileState.fieldErrors.website} />
              <ProfileField label="LinkedIn" name="linkedin" value={profileForm.linkedin} onChange={handleProfileChange("linkedin")} error={profileState.fieldErrors.linkedin} />
              <ProfileField className="md:col-span-2" label="Phone" name="phone" value={profileForm.phone} onChange={handleProfileChange("phone")} error={profileState.fieldErrors.phone} />
            </div>

            {/* QR destination */}
            <div className="mt-6 rounded-[1.6rem] border border-[rgba(82,103,217,0.08)] bg-[var(--soft)] p-5">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-[var(--brand)] shadow-[0_10px_22px_rgba(21,32,58,0.05)]">
                  <QrCode className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[var(--ink)]">QR destination</p>
                  <p className="mt-1 text-sm leading-6 text-[var(--muted)]">
                    Choose where your QR code takes people when they scan your card.
                  </p>
                </div>
              </div>
              {profileState.fieldErrors.qrPreference ? (
                <p className="mt-3 text-sm text-[#991b1b]">{profileState.fieldErrors.qrPreference}</p>
              ) : null}
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                {manualQrOptions.map((option) => {
                  const isSelected = profileForm.qrPreference === option.key;
                  return (
                    <label key={option.key} className="cursor-pointer">
                      <input
                        className="sr-only"
                        name="qrPreference"
                        type="radio"
                        value={option.key}
                        checked={isSelected}
                        onChange={() => setProfileForm((current) => ({ ...current, qrPreference: option.key }))}
                      />
                      <div className={cn("rounded-[1.3rem] border bg-white p-4 transition", isSelected ? "border-[var(--brand)] bg-[rgba(82,103,217,0.04)] shadow-[0_12px_30px_rgba(15,23,42,0.05)]" : "border-[rgba(82,103,217,0.08)] hover:border-[rgba(82,103,217,0.18)]")}>
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-sm font-semibold text-[var(--ink)]">{option.label}</p>
                          {isSelected ? <span className="rounded-full bg-[rgba(82,103,217,0.1)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--brand)]">Selected</span> : null}
                        </div>
                        <p className="mt-2 text-xs leading-5 text-[var(--muted)]">{option.description}</p>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <FormSubmitButton label="Save profile" />
            </div>
          </form>

          {/* Notifications */}
          <form action={notificationAction} className="panel border-[rgba(82,103,217,0.08)] bg-white p-6">
            <SectionHeader
              title="Notifications"
              description="Choose which updates you'd like to receive for this account."
              badge={`${enabledNotificationCount} of ${notificationSettingOptions.length} enabled`}
            />
            <ActionBanner state={notificationSaveState} />

            <div className="mt-6 space-y-3">
              {notificationSettingOptions.map((option) => {
                const enabled = notificationState[option.key];
                return (
                  <label key={option.key} className="flex cursor-pointer flex-col gap-4 rounded-[1.5rem] border border-[rgba(82,103,217,0.08)] bg-white px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="max-w-2xl">
                      <p className="text-sm font-semibold text-[var(--ink)]">{option.label}</p>
                      <p className="mt-1 text-sm leading-6 text-[var(--muted)]">{option.description}</p>
                    </div>
                    <span className="relative inline-flex h-7 w-12 shrink-0 items-center">
                      <input
                        className="peer sr-only"
                        name="notifications"
                        type="checkbox"
                        value={option.key}
                        checked={enabled}
                        onChange={() =>
                          setNotificationState((current) => ({
                            ...current,
                            [option.key]: !current[option.key as WorkspaceNotificationKey],
                          }))
                        }
                      />
                      <span className="absolute inset-0 rounded-full border border-slate-200 bg-slate-200 transition peer-checked:border-[var(--brand)] peer-checked:bg-[var(--brand)]" />
                      <span className="absolute left-1 h-5 w-5 rounded-full bg-white shadow-[0_6px_16px_rgba(15,23,42,0.16)] transition-transform peer-checked:translate-x-5" />
                    </span>
                  </label>
                );
              })}
            </div>

            <div className="mt-6 flex justify-end">
              <FormSubmitButton label="Save alerts" secondary />
            </div>
          </form>

          {/* Danger zone */}
          <div className="panel border-red-100 bg-[linear-gradient(180deg,_rgba(255,248,248,0.96),_rgba(255,255,255,0.98))] p-6">
            <SectionHeader
              title="Danger zone"
              description="Permanent actions that cannot be undone."
            />

            <div className="mt-6 max-w-sm rounded-[1.6rem] border border-red-200 bg-white/80 p-5">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-red-100 text-red-600">
                  <AlertTriangle className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-red-700">Delete account</p>
                  <p className="mt-1 text-sm leading-6 text-red-600">
                    Permanently removes your account and all saved cards. Contact support to request deletion.
                  </p>
                </div>
              </div>
              <button
                type="button"
                disabled
                className="mt-5 rounded-full border border-red-200 px-4 py-2 text-sm font-semibold text-red-400 disabled:cursor-not-allowed"
              >
                Contact support
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6 xl:sticky xl:top-6 xl:h-fit">
          <div className="panel border-[rgba(82,103,217,0.08)] bg-white p-6">
            <p className="text-sm font-semibold text-[var(--ink)]">Account summary</p>
            <div className="mt-5 space-y-3">
              <SummaryCard
                label="Cards ready"
                value={summary.cardStatusLabel}
                detail="Saved cards available from your dashboard and My Card pages."
                icon={CreditCard}
              />
              <SummaryCard
                label="Last saved"
                value={summary.lastUpdatedLabel}
                detail="Most recent profile, notification, or card update."
                icon={BellRing}
              />
            </div>
          </div>

          <div className="panel border-[rgba(82,103,217,0.08)] bg-white p-6">
            <p className="text-sm font-semibold text-[var(--ink)]">Selected style</p>
            <div className="mt-5">
              <CardPreview card={previewCard} compact />
            </div>
            <p className="mt-4 text-sm leading-6 text-[var(--muted)]">{selectedTemplate.description}</p>
          </div>
        </aside>
      </div>
    </section>
  );
}

function SectionHeader({
  title,
  description,
  badge,
}: {
  title: string;
  description: string;
  badge?: string;
}) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
      <div>
        <h2 className="text-lg font-semibold text-[var(--ink)]">{title}</h2>
        <p className="mt-1 text-sm text-[var(--muted)]">{description}</p>
      </div>
      {badge ? (
        <span className="inline-flex h-fit w-fit rounded-full bg-[rgba(82,103,217,0.1)] px-3 py-1 text-xs font-semibold text-[var(--brand)]">
          {badge}
        </span>
      ) : null}
    </div>
  );
}

function ActionBanner({ state }: { state: SettingsActionState }) {
  if (state.status === "idle" || !state.message) {
    return null;
  }

  return (
    <div className={cn("mt-5 rounded-[1.2rem] border px-4 py-3 text-sm font-medium", getActionTone(state))}>
      {state.message}
    </div>
  );
}

function SummaryCard({
  label,
  value,
  detail,
  icon: Icon,
}: {
  detail: string;
  icon: typeof CreditCard;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-[1.4rem] bg-[var(--soft)] p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-[var(--brand)] shadow-[0_10px_22px_rgba(21,32,58,0.05)]">
          <Icon className="h-4 w-4" />
        </div>
        <p className="text-sm font-semibold text-[var(--ink)]">{label}</p>
      </div>
      <p className="mt-3 text-xl font-semibold text-[var(--ink)]">{value}</p>
      <p className="mt-1 text-sm leading-6 text-[var(--muted)]">{detail}</p>
    </div>
  );
}

function ProfileField({
  className,
  error,
  hint,
  label,
  name,
  onChange,
  required,
  type = "text",
  value,
}: {
  className?: string;
  error?: string;
  hint?: string;
  label: string;
  name: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  type?: string;
  value: string;
}) {
  const id = `settings-${name}`;

  return (
    <label className={cn("flex flex-col gap-2 text-sm font-medium text-slate-700", className)}>
      {label}
      <input
        id={id}
        className={cn("h-12 rounded-2xl border bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100", error ? "border-red-300 focus:border-red-500 focus:ring-red-100" : "border-slate-200")}
        name={name}
        onChange={onChange}
        required={required}
        type={type}
        value={value}
      />
      {error ? <span className="text-xs font-normal leading-5 text-[#991b1b]">{error}</span> : null}
      {!error && hint ? <span className="text-xs font-normal leading-5 text-[var(--muted)]">{hint}</span> : null}
    </label>
  );
}

function FormSubmitButton({ label, secondary = false }: { label: string; secondary?: boolean }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={cn(
        "rounded-full px-5 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60",
        secondary
          ? "border border-[rgba(82,103,217,0.14)] bg-white text-[var(--ink)] hover:bg-[var(--soft)]"
          : "bg-[var(--brand)] text-white shadow-[0_16px_34px_rgba(82,103,217,0.2)] hover:bg-[#4459cb]",
      )}
    >
      {pending ? "Saving..." : label}
    </button>
  );
}

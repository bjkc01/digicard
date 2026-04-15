"use client";

import type { ChangeEvent } from "react";
import { useActionState, useEffect, useState } from "react";
import {
  AlertTriangle,
  BellRing,
  CreditCard,
  Globe,
  LayoutTemplate,
  Mail,
  Phone,
  QrCode,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";
import { CardPreview } from "@/components/cards/card-preview";
import type { WorkspaceView } from "@/lib/workspace-view";
import type { WorkspaceUser } from "@/lib/workspace-auth";
import { templates } from "@/lib/data";
import { formatWorkspaceTimestamp } from "@/lib/workspace-format";
import { cn } from "@/lib/utils";
import {
  notificationSettingOptions,
  qrPreferenceOptions,
  type WorkspaceNotificationKey,
  type WorkspaceQrPreference,
} from "@/lib/workspace-settings-options";
import {
  clearSavedCardsSettingsAction,
  saveNotificationSettings,
  saveProfileSettings,
  saveTemplateSettings,
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

function formatSectionTimestamp(value: string | null) {
  const formatted = formatWorkspaceTimestamp(value);
  return formatted === "Not saved yet" ? formatted : `Updated ${formatted}`;
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

export function SettingsShell({ user, workspaceView }: SettingsShellProps) {
  const router = useRouter();
  const { settings, summary } = workspaceView;
  const [profileForm, setProfileForm] = useState<ProfileFormData>({
    company: settings.card.company,
    email: settings.profile.email,
    linkedin: settings.card.linkedin,
    name: settings.profile.name,
    phone: settings.card.phone,
    qrPreference: settings.card.qrPreference,
    title: settings.profile.title,
    website: settings.profile.website,
  });
  const [selectedTemplateId, setSelectedTemplateId] = useState(settings.defaultTemplateId);
  const [notificationState, setNotificationState] = useState(settings.notifications);
  const [confirmClearCards, setConfirmClearCards] = useState(false);
  const [browserResetMessage, setBrowserResetMessage] = useState("");
  const [profileState, profileAction] = useActionState(saveProfileSettings, initialSettingsActionState);
  const [templateState, templateAction] = useActionState(saveTemplateSettings, initialSettingsActionState);
  const [notificationSaveState, notificationAction] = useActionState(
    saveNotificationSettings,
    initialSettingsActionState,
  );
  const [clearCardsState, clearCardsAction] = useActionState(
    clearSavedCardsSettingsAction,
    initialSettingsActionState,
  );

  useEffect(() => {
    setProfileForm({
      company: settings.card.company,
      email: settings.profile.email,
      linkedin: settings.card.linkedin,
      name: settings.profile.name,
      phone: settings.card.phone,
      qrPreference: settings.card.qrPreference,
      title: settings.profile.title,
      website: settings.profile.website,
    });
    setSelectedTemplateId(settings.defaultTemplateId);
    setNotificationState(settings.notifications);
  }, [
    settings.card.company,
    settings.card.linkedin,
    settings.card.phone,
    settings.card.qrPreference,
    settings.defaultTemplateId,
    settings.notifications,
    settings.profile.email,
    settings.profile.name,
    settings.profile.title,
    settings.profile.website,
  ]);

  useEffect(() => {
    if (
      profileState.status === "success" ||
      profileState.status === "warning" ||
      templateState.status === "success" ||
      templateState.status === "warning" ||
      notificationSaveState.status === "success" ||
      notificationSaveState.status === "warning" ||
      clearCardsState.status === "success" ||
      clearCardsState.status === "warning"
    ) {
      router.refresh();
    }
  }, [
    clearCardsState.status,
    notificationSaveState.status,
    profileState.status,
    router,
    templateState.status,
  ]);

  const selectedTemplate =
    templates.find((template) => template.id === selectedTemplateId) ??
    templates.find((template) => template.id === settings.defaultTemplateId) ??
    templates[0]!;
  const previewCard = buildPreviewCard(selectedTemplateId, profileForm, settings.defaultTemplateId);
  const enabledNotificationCount = Object.values(notificationState).filter(Boolean).length;

  const handleProfileChange =
    (field: keyof ProfileFormData) => (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setProfileForm((current) => ({
        ...current,
        [field]: value,
      }));
    };

  const handleClearBrowserMedia = () => {
    const keysToRemove: string[] = [];

    for (let index = 0; index < window.localStorage.length; index += 1) {
      const key = window.localStorage.key(index);
      if (key?.startsWith("digicard-portrait-")) {
        keysToRemove.push(key);
      }
    }

    keysToRemove.forEach((key) => window.localStorage.removeItem(key));
    setBrowserResetMessage(
      keysToRemove.length > 0 ? "Saved portrait images were removed from this browser." : "No saved portrait images were found on this browser.",
    );
  };

  return (
    <section className="space-y-6">
      <header className="panel flex flex-col gap-5 border-[rgba(82,103,217,0.08)] bg-[linear-gradient(180deg,_rgba(255,255,255,0.96),_rgba(244,247,255,0.92))] p-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-[2rem] font-semibold tracking-tight text-[var(--ink)]">
            Account and card settings
          </h1>
          <p className="mt-2 max-w-2xl text-[0.98rem] leading-7 text-[var(--muted)]">
            Update your details, default style, and alert preferences. Extra cards can still override these defaults in the card editor.
          </p>
        </div>

        <div className="subtle-panel flex items-center gap-4 px-4 py-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[rgba(82,103,217,0.12)] text-[var(--brand)]">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold text-[var(--ink)]">Storage</p>
            <p className="mt-1 text-sm text-[var(--muted)]">{summary.storageScopeLabel}</p>
          </div>
        </div>
      </header>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-6">
          <div className="panel border-[rgba(82,103,217,0.08)] bg-white p-6">
            <div className="grid gap-4 md:grid-cols-3">
              <SummaryCard label="Signed in as" value={user.name} detail={user.email} icon={UserRound} />
              <SummaryCard label="Provider" value={user.authLabel} detail={user.authDescription} icon={ShieldCheck} />
              <SummaryCard label="Cards ready" value={summary.cardStatusLabel} detail="Your saved cards stay available from the dashboard and My Card views." icon={CreditCard} />
            </div>
          </div>

          <form action={profileAction} className="panel border-[rgba(82,103,217,0.08)] bg-white p-6">
            <SectionHeader
              title="Profile"
              description="Edit the details used for your main card. New cards start from these defaults."
              badge={`${summary.profileCompletion}% complete`}
              updatedLabel={formatSectionTimestamp(settings.sectionUpdatedAt.profile)}
            />
            <ActionBanner state={profileState} />

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <ProfileField label="Display name" name="name" value={profileForm.name} onChange={handleProfileChange("name")} error={profileState.fieldErrors.name} required />
              <ProfileField label="Profile email" name="email" type="email" value={profileForm.email} onChange={handleProfileChange("email")} error={profileState.fieldErrors.email} required />
              <ProfileField label="Professional title" name="title" value={profileForm.title} onChange={handleProfileChange("title")} error={profileState.fieldErrors.title} required />
              <ProfileField label="School or company" name="company" value={profileForm.company} onChange={handleProfileChange("company")} error={profileState.fieldErrors.company} />
              <ProfileField label="Website" name="website" value={profileForm.website} onChange={handleProfileChange("website")} error={profileState.fieldErrors.website} />
              <ProfileField label="LinkedIn" name="linkedin" value={profileForm.linkedin} onChange={handleProfileChange("linkedin")} error={profileState.fieldErrors.linkedin} hint="Use a LinkedIn username or full profile URL." />
              <ProfileField className="md:col-span-2" label="Phone" name="phone" value={profileForm.phone} onChange={handleProfileChange("phone")} error={profileState.fieldErrors.phone} />
            </div>

            <div className="mt-6 rounded-[1.6rem] border border-[rgba(82,103,217,0.08)] bg-[var(--soft)] p-5">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-[var(--brand)] shadow-[0_10px_22px_rgba(21,32,58,0.05)]">
                  <QrCode className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[var(--ink)]">QR destination</p>
                  <p className="mt-1 text-sm leading-6 text-[var(--muted)]">
                    Pick the link your QR should prefer when someone scans your card.
                  </p>
                </div>
              </div>
              {profileState.fieldErrors.qrPreference ? (
                <p className="mt-3 text-sm text-[#991b1b]">{profileState.fieldErrors.qrPreference}</p>
              ) : null}
              <div className="mt-4 grid gap-3 md:grid-cols-3">
                {qrPreferenceOptions.map((option) => {
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

          <form action={templateAction} className="panel border-[rgba(82,103,217,0.08)] bg-white p-6">
            <SectionHeader
              title="Default template"
              description="Choose the design every new card should start from."
              badge={selectedTemplate.name}
              updatedLabel={formatSectionTimestamp(settings.sectionUpdatedAt.template)}
            />
            <ActionBanner state={templateState} />

            <input type="hidden" name="defaultTemplateId" value={selectedTemplateId} />

            <div className="mt-6 grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
              {templates.map((template) => {
                const isSelected = template.id === selectedTemplateId;
                return (
                  <button
                    key={template.id}
                    type="button"
                    onClick={() => setSelectedTemplateId(template.id)}
                    className={cn("rounded-[1.7rem] border p-4 text-left transition", isSelected ? "border-[var(--brand)] bg-white shadow-[0_18px_40px_rgba(15,23,42,0.08)]" : "border-transparent bg-[var(--soft)] hover:border-[rgba(82,103,217,0.14)] hover:bg-white")}
                  >
                    <div className="mx-auto w-[118px]">
                      <CardPreview card={buildPreviewCard(template.id, profileForm, settings.defaultTemplateId)} compact />
                    </div>
                    <div className="mt-4 flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-[var(--ink)]">{template.name}</p>
                        <p className="mt-1 text-sm leading-6 text-[var(--muted)]">{template.description}</p>
                      </div>
                      {isSelected ? <span className="rounded-full bg-[rgba(82,103,217,0.1)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--brand)]">Selected</span> : null}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 flex justify-end">
              <FormSubmitButton label="Save template" />
            </div>
          </form>

          <form action={notificationAction} className="panel border-[rgba(82,103,217,0.08)] bg-white p-6">
            <SectionHeader
              title="Notifications"
              description="Choose which updates should stay enabled for this account."
              badge={`${enabledNotificationCount} of ${notificationSettingOptions.length} enabled`}
              updatedLabel={formatSectionTimestamp(settings.sectionUpdatedAt.notifications)}
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

          <div className="panel border-red-100 bg-[linear-gradient(180deg,_rgba(255,248,248,0.96),_rgba(255,255,255,0.98))] p-6">
            <SectionHeader title="Danger zone" description="Sensitive actions are split clearly so card cleanup is available without pretending full account deletion is ready." />
            <ActionBanner state={clearCardsState} />

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <form action={clearCardsAction} className="rounded-[1.6rem] border border-red-200 bg-white/80 p-5">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-2xl bg-red-100 text-red-600">
                    <CreditCard className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-red-700">Delete saved cards</p>
                    <p className="mt-1 text-sm leading-6 text-red-600">Clears your main card and every extra saved card, but keeps your account access.</p>
                  </div>
                </div>
                <button
                  type="submit"
                  onClick={(event) => {
                    if (!confirmClearCards) {
                      event.preventDefault();
                      setConfirmClearCards(true);
                    }
                  }}
                  className="mt-5 rounded-full border border-red-200 px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-50"
                >
                  {confirmClearCards ? "Confirm delete" : "Delete cards"}
                </button>
              </form>

              <div className="rounded-[1.6rem] border border-[rgba(82,103,217,0.08)] bg-white/80 p-5">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--soft)] text-[var(--brand)]">
                    <Globe className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[var(--ink)]">Reset browser media</p>
                    <p className="mt-1 text-sm leading-6 text-[var(--muted)]">Removes locally saved portrait images from this browser without touching your account data.</p>
                  </div>
                </div>
                <button type="button" onClick={handleClearBrowserMedia} className="mt-5 rounded-full border border-[rgba(82,103,217,0.14)] px-4 py-2 text-sm font-semibold text-[var(--brand)] transition hover:bg-[var(--soft)]">
                  Clear browser media
                </button>
                {browserResetMessage ? <p className="mt-3 text-sm text-[var(--muted)]">{browserResetMessage}</p> : null}
              </div>

              <div className="rounded-[1.6rem] border border-red-200 bg-white/80 p-5">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-2xl bg-red-100 text-red-600">
                    <AlertTriangle className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-red-700">Delete account</p>
                    <p className="mt-1 text-sm leading-6 text-red-600">Still unavailable until ownership verification, safe data removal, and audit history are fully built.</p>
                  </div>
                </div>
                <button type="button" disabled className="mt-5 rounded-full border border-red-200 px-4 py-2 text-sm font-semibold text-red-400">
                  Not available yet
                </button>
              </div>
            </div>
          </div>
        </div>

        <aside className="space-y-6 xl:sticky xl:top-6 xl:h-fit">
          <div className="panel border-[rgba(82,103,217,0.08)] bg-white p-6">
            <p className="text-sm font-semibold text-[var(--ink)]">Account summary</p>
            <div className="mt-5 space-y-3">
              <SummaryCard label="Cards ready" value={summary.cardStatusLabel} detail="Saved cards available from your dashboard and My Card pages." icon={CreditCard} />
              <SummaryCard label="Last saved" value={summary.lastUpdatedLabel} detail="Most recent profile, template, notification, or card update." icon={BellRing} />
              <SummaryCard label="Storage" value={summary.storageScopeLabel} detail="Cloud sync is preferred, with signed browser fallback when needed." icon={ShieldCheck} />
            </div>
          </div>

          <div className="panel border-[rgba(82,103,217,0.08)] bg-white p-6">
            <p className="text-sm font-semibold text-[var(--ink)]">Selected style</p>
            <div className="mt-5">
              <CardPreview card={previewCard} compact />
            </div>
            <p className="mt-4 text-sm leading-6 text-[var(--muted)]">{selectedTemplate.description}</p>
          </div>

          <div className="panel border-[rgba(82,103,217,0.08)] bg-white p-6">
            <p className="text-sm font-semibold text-[var(--ink)]">Section activity</p>
            <div className="mt-4 space-y-3 text-sm text-[var(--muted)]">
              <ActivityRow label="Profile" value={formatSectionTimestamp(settings.sectionUpdatedAt.profile)} />
              <ActivityRow label="Template" value={formatSectionTimestamp(settings.sectionUpdatedAt.template)} />
              <ActivityRow label="Notifications" value={formatSectionTimestamp(settings.sectionUpdatedAt.notifications)} />
              <ActivityRow label="Cards" value={formatSectionTimestamp(settings.sectionUpdatedAt.cards)} />
            </div>
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
  updatedLabel,
}: {
  title: string;
  description: string;
  badge?: string;
  updatedLabel?: string;
}) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
      <div>
        <h2 className="text-lg font-semibold text-[var(--ink)]">{title}</h2>
        <p className="mt-1 text-sm text-[var(--muted)]">{description}</p>
      </div>
      <div className="flex flex-wrap gap-2 md:justify-end">
        {updatedLabel ? <span className="inline-flex h-fit rounded-full bg-[var(--soft)] px-3 py-1 text-xs font-semibold text-[var(--muted)]">{updatedLabel}</span> : null}
        {badge ? <span className="inline-flex h-fit rounded-full bg-[rgba(82,103,217,0.1)] px-3 py-1 text-xs font-semibold text-[var(--brand)]">{badge}</span> : null}
      </div>
    </div>
  );
}

function ActionBanner({ state }: { state: SettingsActionState }) {
  if (state.status === "idle" || !state.message) {
    return null;
  }

  return <div className={cn("mt-5 rounded-[1.2rem] border px-4 py-3 text-sm font-medium", getActionTone(state))}>{state.message}</div>;
}

function SummaryCard({
  label,
  value,
  detail,
  icon: Icon,
}: {
  detail: string;
  icon: typeof UserRound;
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

function ActivityRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-[1rem] bg-[var(--soft)] px-4 py-3">
      <span className="font-medium text-[var(--ink)]">{label}</span>
      <span className="text-right">{value}</span>
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

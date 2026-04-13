import {
  AlertTriangle,
  BadgeCheck,
  BellRing,
  Clock3,
  Globe,
  LayoutTemplate,
  LockKeyhole,
  LogOut,
  Mail,
  ShieldCheck,
  Smartphone,
  UserRound,
} from "lucide-react";
import type { ComponentType } from "react";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Button } from "@/components/ui/button";
import { templates } from "@/lib/data";
import { cn } from "@/lib/utils";
import { requireWorkspaceUser } from "@/lib/workspace-auth";
import { getWorkspaceView } from "@/lib/workspace-view";
import { notificationSettingOptions } from "@/lib/workspace-settings";
import {
  saveNotificationSettings,
  saveProfileSettings,
  saveTemplateSettings,
  signOutFromSettings,
} from "./actions";

type SettingsPageProps = {
  searchParams?: Promise<{
    notice?: string;
  }>;
};

function getNoticeContent(notice?: string) {
  switch (notice) {
    case "profile-saved":
      return {
        body: "Your workspace identity, card details, and contact links were saved.",
        tone: "border-[rgba(16,185,129,0.16)] bg-[rgba(236,253,245,0.92)] text-[#065f46]",
        title: "Profile updated",
      };
    case "profile-invalid":
      return {
        body: "Check the name, email, and title fields before saving again.",
        tone: "border-[rgba(245,158,11,0.18)] bg-[rgba(255,251,235,0.95)] text-[#92400e]",
        title: "Profile needs attention",
      };
    case "template-saved":
      return {
        body: "The default template for this workspace was updated.",
        tone: "border-[rgba(16,185,129,0.16)] bg-[rgba(236,253,245,0.92)] text-[#065f46]",
        title: "Default template updated",
      };
    case "template-invalid":
      return {
        body: "Choose one of the available templates before saving.",
        tone: "border-[rgba(245,158,11,0.18)] bg-[rgba(255,251,235,0.95)] text-[#92400e]",
        title: "Template selection was not saved",
      };
    case "notifications-saved":
      return {
        body: "Alert preferences were saved for this workspace on the current browser.",
        tone: "border-[rgba(16,185,129,0.16)] bg-[rgba(236,253,245,0.92)] text-[#065f46]",
        title: "Notification settings updated",
      };
    case "profile-error":
    case "template-error":
    case "notifications-error":
      return {
        body: "Something went wrong while saving. Please try again.",
        tone: "border-[rgba(239,68,68,0.16)] bg-[rgba(254,242,242,0.95)] text-[#991b1b]",
        title: "Save failed",
      };
    default:
      return null;
  }
}

function getSessionTone(provider: string) {
  if (provider === "dev-bypass") {
    return {
      badge: "bg-[rgba(14,165,233,0.12)] text-[#0369a1]",
      card: "border-[rgba(14,165,233,0.16)] bg-[rgba(240,249,255,0.92)]",
    };
  }

  return {
    badge: "bg-[rgba(82,103,217,0.1)] text-[var(--brand)]",
    card: "border-[rgba(82,103,217,0.08)] bg-white",
  };
}

export default async function SettingsPage({ searchParams }: SettingsPageProps) {
  const resolvedSearchParams = (await searchParams) ?? {};
  const workspaceUser = await requireWorkspaceUser("/settings");
  const workspaceView = await getWorkspaceView(workspaceUser);
  const notice = getNoticeContent(resolvedSearchParams.notice);
  const { settings, summary } = workspaceView;
  const selectedTemplate =
    templates.find((template) => template.id === settings.defaultTemplateId) ?? templates[0]!;
  const initials = settings.profile.name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
  const sessionTone = getSessionTone(workspaceUser.authProvider);

  return (
    <main className="mx-auto grid max-w-7xl gap-6 px-4 py-4 lg:grid-cols-[280px_minmax(0,1fr)] lg:px-6 lg:py-6">
      <Sidebar activePath="/settings" authLabel={workspaceUser.authLabel} userName={workspaceUser.name} />

      <section className="space-y-6">
        <header className="panel flex flex-col gap-5 border-[rgba(82,103,217,0.08)] bg-[linear-gradient(180deg,_rgba(255,255,255,0.96),_rgba(244,247,255,0.92))] p-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow text-[var(--brand)]">Settings</p>
            <h1 className="mt-2 text-[2rem] font-semibold tracking-tight text-[var(--ink)]">
              Account, access, and workspace defaults
            </h1>
            <p className="mt-2 max-w-2xl text-[0.98rem] leading-7 text-[var(--muted)]">
              Update the identity details, template default, and notification settings that
              the signed-in workspace uses across dashboard pages on this browser.
            </p>
          </div>

          <div className="subtle-panel flex items-center gap-4 px-4 py-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[rgba(82,103,217,0.12)] text-[var(--brand)]">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[var(--ink)]">Scoped workspace storage</p>
              <p className="mt-1 text-sm text-[var(--muted)]">
                Saved through authenticated server actions and signed storage on this browser.
              </p>
            </div>
          </div>
        </header>

        {notice ? (
          <div
            className={cn(
              "rounded-[1.6rem] border px-5 py-4 shadow-[0_12px_30px_rgba(15,23,42,0.04)]",
              notice.tone,
            )}
          >
            <p className="text-sm font-semibold">{notice.title}</p>
            <p className="mt-1 text-sm leading-6">{notice.body}</p>
          </div>
        ) : null}

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-6">
            <div className={cn("panel border p-6 shadow-[0_12px_30px_rgba(15,23,42,0.04)]", sessionTone.card)}>
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-lg font-semibold text-[var(--ink)]">Session & security</h2>
                    <span className={cn("rounded-full px-3 py-1 text-xs font-semibold", sessionTone.badge)}>
                      {workspaceUser.authLabel}
                    </span>
                  </div>
                  <p className="mt-2 max-w-2xl text-sm leading-7 text-[var(--muted)]">
                    {workspaceUser.authDescription}
                  </p>
                </div>

                <form action={signOutFromSettings}>
                  <Button
                    type="submit"
                    variant="secondary"
                    className="rounded-full border-[rgba(25,35,61,0.12)] px-5 py-3"
                  >
                    <span className="inline-flex items-center gap-2">
                      <LogOut className="h-4 w-4" />
                      {workspaceUser.isPreview ? "Exit preview" : "Sign out"}
                    </span>
                  </Button>
                </form>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="rounded-[1.5rem] border border-[rgba(82,103,217,0.08)] bg-white/90 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                    Signed in as
                  </p>
                  <p className="mt-2 text-base font-semibold text-[var(--ink)]">{workspaceUser.name}</p>
                  <p className="mt-1 text-sm text-[var(--muted)]">{workspaceUser.email}</p>
                </div>
                <div className="rounded-[1.5rem] border border-[rgba(82,103,217,0.08)] bg-white/90 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                    Protection model
                  </p>
                  <p className="mt-2 text-base font-semibold text-[var(--ink)]">
                    Signed session plus server validation
                  </p>
                  <p className="mt-1 text-sm text-[var(--muted)]">
                    Critical workspace saves do not rely on middleware alone.
                  </p>
                </div>
              </div>
            </div>

            <div className="panel border-[rgba(82,103,217,0.08)] bg-white p-6">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-[var(--ink)]">Profile</h2>
                  <p className="mt-1 text-sm text-[var(--muted)]">
                    Edit the identity and contact details used to generate your workspace card.
                  </p>
                </div>
                <span className="inline-flex h-fit rounded-full bg-[rgba(82,103,217,0.1)] px-3 py-1 text-xs font-semibold text-[var(--brand)]">
                  {summary.profileCompletion}% complete
                </span>
              </div>

              <form action={saveProfileSettings} className="mt-6 space-y-5">
                <div className="grid gap-5 md:grid-cols-2">
                  <SettingsField
                    autoComplete="name"
                    defaultValue={settings.profile.name}
                    label="Display name"
                    name="name"
                    placeholder="Your name"
                    required
                  />
                  <SettingsField
                    autoComplete="email"
                    defaultValue={settings.profile.email}
                    label="Profile email"
                    name="email"
                    placeholder="you@example.com"
                    required
                    type="email"
                  />
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <SettingsField
                    defaultValue={settings.profile.title}
                    label="Professional title"
                    name="title"
                    placeholder="Student, founder, designer, or advisor"
                    required
                  />
                  <SettingsField
                    defaultValue={settings.card.company}
                    label="School or company"
                    name="company"
                    placeholder="University or company"
                  />
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <SettingsField
                    autoComplete="url"
                    defaultValue={settings.profile.website}
                    label="Website"
                    name="website"
                    placeholder="yourwebsite.com"
                  />
                  <SettingsField
                    defaultValue={settings.card.linkedin}
                    label="LinkedIn"
                    name="linkedin"
                    placeholder="linkedin.com/in/yourname"
                  />
                </div>

                <SettingsField
                  autoComplete="tel"
                  defaultValue={settings.card.phone}
                  label="Phone"
                  name="phone"
                  placeholder="+1 (555) 000-0000"
                />

                <div className="rounded-[1.6rem] border border-[rgba(82,103,217,0.08)] bg-[linear-gradient(180deg,_rgba(247,249,255,0.94),_rgba(255,255,255,0.96))] p-4">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[linear-gradient(135deg,_#172340,_#5267d9)] text-sm font-semibold text-white shadow-[0_16px_32px_rgba(82,103,217,0.18)]">
                      {initials || "DC"}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-base font-semibold text-[var(--ink)]">
                        {settings.profile.name}
                      </p>
                      <p className="mt-1 text-sm text-[var(--muted)]">
                        {settings.profile.title || "Add a professional title"}
                      </p>
                      <p className="mt-2 truncate text-sm text-[var(--muted)]">
                        {settings.profile.email}
                      </p>
                    </div>
                    <div className="sm:ml-auto rounded-full border border-[rgba(82,103,217,0.14)] bg-white px-4 py-2 text-sm font-medium text-[var(--muted)]">
                      Workspace owner
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button
                    type="submit"
                    className="rounded-full bg-[var(--brand)] px-5 py-3 shadow-[0_16px_34px_rgba(82,103,217,0.2)] hover:bg-[#4459cb]"
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
                    Pick the design every new card should start from.
                  </p>
                </div>
                <span className="inline-flex h-fit rounded-full bg-[rgba(82,103,217,0.1)] px-3 py-1 text-xs font-semibold text-[var(--brand)]">
                  {selectedTemplate.name} selected
                </span>
              </div>

              <form action={saveTemplateSettings} className="mt-6 space-y-6">
                <div
                  role="radiogroup"
                  aria-label="Default card template"
                  className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3"
                >
                  {templates.map((template) => {
                    const isSelected = template.id === settings.defaultTemplateId;

                    return (
                      <label key={template.id} className="cursor-pointer">
                        <input
                          aria-label={template.name}
                          className="peer sr-only"
                          defaultChecked={isSelected}
                          name="defaultTemplateId"
                          type="radio"
                          value={template.id}
                        />
                        <div
                          className={cn(
                            "rounded-[1.7rem] border p-4 text-left transition focus-within:ring-4 focus-within:ring-[rgba(82,103,217,0.16)]",
                            "peer-checked:border-[var(--ink)] peer-checked:bg-white peer-checked:shadow-[0_18px_40px_rgba(15,23,42,0.08)]",
                            "border-transparent bg-[var(--soft)] hover:border-[rgba(82,103,217,0.14)] hover:bg-white",
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
                                  : "border-slate-300 bg-white text-transparent peer-checked:border-[var(--brand)] peer-checked:bg-[var(--brand)] peer-checked:text-white",
                              )}
                            >
                              <BadgeCheck className="h-4 w-4" />
                            </span>
                          </div>
                        </div>
                      </label>
                    );
                  })}
                </div>

                <div className="flex justify-end">
                  <Button
                    type="submit"
                    className="rounded-full bg-[var(--brand)] px-5 py-3 shadow-[0_16px_34px_rgba(82,103,217,0.2)] hover:bg-[#4459cb]"
                  >
                    Save template
                  </Button>
                </div>
              </form>
            </div>

            <div className="panel border-[rgba(82,103,217,0.08)] bg-white p-6">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-[var(--ink)]">Notifications</h2>
                  <p className="mt-1 text-sm text-[var(--muted)]">
                    Save the signals that matter for this workspace on the current browser.
                  </p>
                </div>
                <span className="inline-flex h-fit rounded-full bg-[rgba(82,103,217,0.1)] px-3 py-1 text-xs font-semibold text-[var(--brand)]">
                  {summary.enabledNotificationCount} of {notificationSettingOptions.length} enabled
                </span>
              </div>

              <form action={saveNotificationSettings} className="mt-6 space-y-6">
                <div className="space-y-3">
                  {notificationSettingOptions.map((option) => {
                    const enabled = settings.notifications[option.key];

                    return (
                      <label
                        key={option.key}
                        className="flex cursor-pointer flex-col gap-4 rounded-[1.5rem] border border-[rgba(82,103,217,0.08)] bg-white px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
                      >
                        <div className="max-w-2xl">
                          <p className="text-sm font-semibold text-[var(--ink)]">{option.label}</p>
                          <p className="mt-1 text-sm leading-6 text-[var(--muted)]">
                            {option.description}
                          </p>
                        </div>

                        <span className="relative inline-flex h-7 w-12 shrink-0 items-center">
                          <input
                            className="peer sr-only"
                            defaultChecked={enabled}
                            name="notifications"
                            type="checkbox"
                            value={option.key}
                          />
                          <span className="absolute inset-0 rounded-full border border-slate-200 bg-slate-200 transition peer-checked:border-[var(--brand)] peer-checked:bg-[var(--brand)]" />
                          <span className="absolute left-1 h-5 w-5 rounded-full bg-white shadow-[0_6px_16px_rgba(15,23,42,0.16)] transition-transform peer-checked:translate-x-5" />
                        </span>
                      </label>
                    );
                  })}
                </div>

                <div className="flex justify-end">
                  <Button
                    type="submit"
                    variant="secondary"
                    className="rounded-full border-[rgba(82,103,217,0.14)] px-5 py-3"
                  >
                    Save alerts
                  </Button>
                </div>
              </form>
            </div>

            <div className="panel border-red-100 bg-[linear-gradient(180deg,_rgba(255,248,248,0.96),_rgba(255,255,255,0.98))] p-6">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-[var(--ink)]">Danger zone</h2>
                  <p className="mt-1 text-sm text-[var(--muted)]">
                    Destructive account actions stay locked until the product has a database-backed
                    ownership, deletion, and audit workflow.
                  </p>
                </div>
                <span className="inline-flex h-fit rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                  Not available yet
                </span>
              </div>

              <div className="mt-6 rounded-[1.6rem] border border-red-200 bg-white/80 p-5">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-2xl bg-red-100 text-red-600">
                    <AlertTriangle className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-red-700">Delete account</p>
                    <p className="mt-1 max-w-2xl text-sm leading-6 text-red-600">
                      This stays unavailable until ownership verification, safe data removal, and
                      an audit trail are supported end to end.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="panel border-[rgba(82,103,217,0.08)] bg-white p-6">
              <p className="eyebrow text-[var(--brand)]">Workspace snapshot</p>
              <div className="mt-5 space-y-3">
                <SnapshotCard
                  description="Identity fields saved for the current workspace."
                  icon={UserRound}
                  title="Profile status"
                  value={`${summary.profileCompletion}%`}
                />
                <SnapshotCard
                  description="The single workspace card generated from the active profile."
                  icon={LayoutTemplate}
                  title="Card status"
                  value={summary.cardStatusLabel}
                />
                <SnapshotCard
                  description="Notification preferences currently enabled in this browser."
                  icon={BellRing}
                  title="Notifications"
                  value={`${summary.enabledNotificationCount} active`}
                />
              </div>
            </div>

            <div className="panel overflow-hidden border-[rgba(82,103,217,0.08)] bg-white p-6">
              <p className="eyebrow text-[var(--brand)]">Selected style</p>
              <div className={cn("mt-5 rounded-[1.8rem] p-4", selectedTemplate.tone)}>
                <div
                  className={cn(
                    "rounded-[1.5rem] bg-gradient-to-br p-5 text-white shadow-[0_18px_40px_rgba(15,23,42,0.16)]",
                    selectedTemplate.accent,
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-white/75">{settings.profile.name}</p>
                      <p className="mt-2 text-xl font-semibold tracking-tight">
                        {settings.profile.title || "Add your title"}
                      </p>
                    </div>
                    <LayoutTemplate className="h-5 w-5 text-white/80" />
                  </div>
                  <div className="mt-10 space-y-2 text-sm text-white/75">
                    <p>{settings.profile.email}</p>
                    <p>{settings.profile.website || "Add a website"}</p>
                  </div>
                </div>
              </div>
              <p className="mt-4 text-sm leading-6 text-[var(--muted)]">
                {selectedTemplate.description}
              </p>
            </div>

            <div className="panel border-[rgba(82,103,217,0.08)] bg-[linear-gradient(135deg,_#172340_0%,_#2d4177_48%,_#5267d9_100%)] p-6 text-white shadow-[0_24px_54px_rgba(35,51,103,0.22)]">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/58">
                Access overview
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em]">
                Keep account controls visible and accountable.
              </h2>
              <p className="mt-3 text-sm leading-7 text-white/72">
                The active session, storage scope, and latest save timestamp now live in one
                place without pretending this is already a full database-backed account system.
              </p>
              <div className="mt-6 space-y-3">
                <AccessRow icon={Mail} label="Session email" value={workspaceUser.email} />
                <AccessRow icon={LockKeyhole} label="Sign-in method" value={workspaceUser.authLabel} />
                <AccessRow icon={Clock3} label="Last saved" value={summary.lastUpdatedLabel} />
                <AccessRow icon={Smartphone} label="Storage scope" value="Current browser" />
                <AccessRow icon={Globe} label="Integrity model" value="Signed / validated" />
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

type SettingsFieldProps = {
  autoComplete?: string;
  defaultValue?: string;
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  type?: string;
};

function SettingsField({
  autoComplete,
  defaultValue,
  label,
  name,
  placeholder,
  required,
  type = "text",
}: SettingsFieldProps) {
  return (
    <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
      {label}
      <input
        autoComplete={autoComplete}
        className="h-12 rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
        defaultValue={defaultValue}
        name={name}
        placeholder={placeholder}
        required={required}
        type={type}
      />
    </label>
  );
}

type SnapshotCardProps = {
  description: string;
  icon: ComponentType<{ className?: string }>;
  title: string;
  value: string;
};

function SnapshotCard({ description, icon: Icon, title, value }: SnapshotCardProps) {
  return (
    <div className="rounded-[1.4rem] bg-[var(--soft)] p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-[var(--brand)] shadow-[0_10px_22px_rgba(21,32,58,0.05)]">
          <Icon className="h-4 w-4" />
        </div>
        <p className="text-sm font-semibold text-[var(--ink)]">{title}</p>
      </div>
      <p className="mt-3 text-xl font-semibold text-[var(--ink)]">{value}</p>
      <p className="mt-1 text-sm leading-6 text-[var(--muted)]">{description}</p>
    </div>
  );
}

function AccessRow({
  icon: Icon,
  label,
  value,
}: {
  icon: ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-[1.3rem] border border-white/15 bg-white/10 px-4 py-3 text-sm">
      <span className="inline-flex items-center gap-3">
        <Icon className="h-4 w-4" />
        {label}
      </span>
      <span className="max-w-[12rem] text-right text-white/78">{value}</span>
    </div>
  );
}

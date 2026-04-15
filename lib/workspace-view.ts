import type { DigiCard } from "@/lib/data";
import { templates } from "@/lib/data";
import { supabaseEnabled } from "@/lib/supabase-env";
import type { WorkspaceUser } from "@/lib/workspace-auth";
import { getWorkspaceSettings } from "@/lib/workspace-settings";

export type WorkspaceSummary = {
  activeCardCount: number;
  cardStatusLabel: string;
  enabledNotificationCount: number;
  lastUpdatedLabel: string;
  profileCompletion: number;
  selectedTemplateName: string;
  storageScopeLabel: string;
};

export type WorkspaceView = {
  cards: DigiCard[];
  settings: Awaited<ReturnType<typeof getWorkspaceSettings>>;
  summary: WorkspaceSummary;
  user: WorkspaceUser;
};

const WORKSPACE_DISPLAY_TIME_ZONE = "America/New_York";

function formatUpdatedAt(value: string | null) {
  if (!value) {
    return "Not saved yet";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Not saved yet";
  }

  const dateLabel = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    timeZone: WORKSPACE_DISPLAY_TIME_ZONE,
    year: "numeric",
  }).format(date);
  const timeLabel = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: WORKSPACE_DISPLAY_TIME_ZONE,
  }).format(date);

  return `${dateLabel} at ${timeLabel}`;
}

function formatSavedLabel(value: string | null) {
  const formatted = formatUpdatedAt(value);
  return formatted === "Not saved yet" ? formatted : `Saved ${formatted}`;
}

function buildWorkspaceCards(settings: Awaited<ReturnType<typeof getWorkspaceSettings>>) {
  const cards: DigiCard[] = [];

  // Primary card
  const selectedTemplate =
    templates.find((template) => template.id === settings.defaultTemplateId) ?? templates[0]!;
  const hasMinimumProfile = Boolean(
    settings.profile.name && settings.profile.email && settings.profile.title,
  );

  if (hasMinimumProfile) {
    cards.push({
      color: selectedTemplate.accent,
      company: settings.card.company,
      email: settings.profile.email,
      id: "primary",
      lastSavedLabel: formatSavedLabel(settings.updatedAt),
      linkedin: settings.card.linkedin,
      name: settings.profile.name,
      phone: settings.card.phone,
      qrPreference: settings.card.qrPreference,
      template: selectedTemplate.name,
      title: settings.profile.title,
      website: settings.profile.website,
    });
  }

  // Extra cards
  for (const extra of settings.extraCards) {
    const extraTemplate =
      templates.find((t) => t.id === extra.templateId) ?? templates[0]!;
    const hasExtraMinimum = Boolean(
      extra.profile.name && extra.profile.email && extra.profile.title,
    );
    if (!hasExtraMinimum) continue;
    cards.push({
      color: extraTemplate.accent,
      company: extra.card.company,
      email: extra.profile.email,
      id: extra.id,
      label: extra.label || undefined,
      lastSavedLabel: formatSavedLabel(extra.updatedAt ?? extra.createdAt),
      linkedin: extra.card.linkedin,
      name: extra.profile.name,
      phone: extra.card.phone,
      qrPreference: extra.card.qrPreference,
      template: extraTemplate.name,
      title: extra.profile.title,
      website: extra.profile.website,
    });
  }

  return cards;
}

export async function getWorkspaceView(user: WorkspaceUser): Promise<WorkspaceView> {
  const settings = await getWorkspaceSettings(user);
  const cards = buildWorkspaceCards(settings);
  const selectedTemplate =
    templates.find((template) => template.id === settings.defaultTemplateId) ?? templates[0]!;
  const profileCompletion = Math.round(
    (
      [
        settings.profile.name,
        settings.profile.email,
        settings.profile.title,
        settings.profile.website,
        settings.card.company,
        settings.card.phone,
        settings.card.linkedin,
      ].filter(Boolean).length / 7
    ) * 100,
  );
  const enabledNotificationCount = Object.values(settings.notifications).filter(Boolean).length;
  const hasActiveCard = cards.length > 0;

  return {
    cards,
    settings,
    summary: {
      activeCardCount: cards.length,
      cardStatusLabel: hasActiveCard ? (cards.length === 1 ? "1 card ready" : `${cards.length} cards ready`) : "Needs setup",
      enabledNotificationCount,
      lastUpdatedLabel: formatUpdatedAt(settings.updatedAt),
      profileCompletion,
      selectedTemplateName: selectedTemplate.name,
      storageScopeLabel: supabaseEnabled ? "Supabase cloud sync" : "Current browser",
    },
    user,
  };
}

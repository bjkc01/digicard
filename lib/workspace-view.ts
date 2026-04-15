import type { DigiCard } from "@/lib/data";
import { templates } from "@/lib/data";
import {
  formatSavedWorkspaceTimestamp,
  formatWorkspaceTimestamp,
} from "@/lib/workspace-format";
import { supabaseEnabled } from "@/lib/supabase-env";
import type { WorkspaceUser } from "@/lib/workspace-auth";
import {
  getWorkspaceLatestUpdatedAt,
  getWorkspaceSettings,
} from "@/lib/workspace-settings";

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

function canResolveQrTarget(settings: Awaited<ReturnType<typeof getWorkspaceSettings>>) {
  if (settings.card.qrPreference === "website") {
    return Boolean(settings.profile.website);
  }

  if (settings.card.qrPreference === "linkedin") {
    return Boolean(settings.card.linkedin);
  }

  return Boolean(settings.profile.website || settings.card.linkedin || settings.profile.email);
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
      lastSavedLabel: formatSavedWorkspaceTimestamp(
        settings.sectionUpdatedAt.cards ?? settings.updatedAt,
      ),
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
      lastSavedLabel: formatSavedWorkspaceTimestamp(extra.updatedAt ?? extra.createdAt),
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
  const readinessChecks = [
    Boolean(settings.profile.name),
    Boolean(settings.profile.email),
    Boolean(settings.profile.title),
    Boolean(settings.card.company),
    Boolean(settings.profile.website || settings.card.linkedin),
    Boolean(settings.card.phone),
    canResolveQrTarget(settings),
    Boolean(selectedTemplate),
    cards.length > 0,
  ];
  const profileCompletion = Math.round(
    (readinessChecks.filter(Boolean).length / readinessChecks.length) * 100,
  );
  const enabledNotificationCount = Object.values(settings.notifications).filter(Boolean).length;
  const hasActiveCard = cards.length > 0;
  const latestUpdatedAt = getWorkspaceLatestUpdatedAt(settings);

  return {
    cards,
    settings,
    summary: {
      activeCardCount: cards.length,
      cardStatusLabel: hasActiveCard ? (cards.length === 1 ? "1 card ready" : `${cards.length} cards ready`) : "Needs setup",
      enabledNotificationCount,
      lastUpdatedLabel: formatWorkspaceTimestamp(latestUpdatedAt),
      profileCompletion,
      selectedTemplateName: selectedTemplate.name,
      storageScopeLabel: supabaseEnabled ? "Cloud sync with browser fallback" : "Saved on this browser",
    },
    user,
  };
}

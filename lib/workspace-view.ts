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

function formatUpdatedAt(value: string | null) {
  if (!value) {
    return "Not saved yet";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Not saved yet";
  }

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function buildWorkspaceCard(settings: Awaited<ReturnType<typeof getWorkspaceSettings>>) {
  const selectedTemplate =
    templates.find((template) => template.id === settings.defaultTemplateId) ?? templates[0]!;
  const hasMinimumProfile = Boolean(
    settings.profile.name && settings.profile.email && settings.profile.title,
  );

  if (!hasMinimumProfile) {
    return [];
  }

  const stableId =
    settings.owner
      .split("")
      .reduce((sum, character) => sum + character.charCodeAt(0), 0) || 1;

  return [
    {
      color: selectedTemplate.accent,
      company: settings.card.company,
      email: settings.profile.email,
      id: stableId,
      linkedin: settings.card.linkedin,
      name: settings.profile.name,
      phone: settings.card.phone,
      template: selectedTemplate.name,
      title: settings.profile.title,
      website: settings.profile.website,
    },
  ] satisfies DigiCard[];
}

export async function getWorkspaceView(user: WorkspaceUser): Promise<WorkspaceView> {
  const settings = await getWorkspaceSettings(user);
  const cards = buildWorkspaceCard(settings);
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
      cardStatusLabel: hasActiveCard ? "Ready" : "Needs setup",
      enabledNotificationCount,
      lastUpdatedLabel: formatUpdatedAt(settings.updatedAt),
      profileCompletion,
      selectedTemplateName: selectedTemplate.name,
      storageScopeLabel: supabaseEnabled ? "Supabase cloud sync" : "Current browser",
    },
    user,
  };
}

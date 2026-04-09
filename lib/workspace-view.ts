import type { DigiCard } from "@/lib/data";
import { templates } from "@/lib/data";
import type { WorkspaceUser } from "@/lib/workspace-auth";
import { getWorkspaceSettings } from "@/lib/workspace-settings";

export type WorkspaceSummary = {
  activeCardCount: number;
  alertsEnabledCount: number;
  authLabel: string;
  lastUpdatedLabel: string;
  profileCompletion: number;
  selectedTemplateDescription: string;
  selectedTemplateName: string;
  sidebarStatusCopy: string;
};

export type WorkspaceView = {
  cards: DigiCard[];
  settings: Awaited<ReturnType<typeof getWorkspaceSettings>>;
  summary: WorkspaceSummary;
  user: WorkspaceUser;
};

function formatUpdatedAt(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function buildWorkspaceCard(user: WorkspaceUser, settings: Awaited<ReturnType<typeof getWorkspaceSettings>>) {
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
  const cards = buildWorkspaceCard(user, settings);
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
  const alertsEnabledCount = Object.values(settings.notifications).filter(Boolean).length;

  return {
    cards,
    settings,
    summary: {
      activeCardCount: cards.length,
      alertsEnabledCount,
      authLabel: user.authLabel,
      lastUpdatedLabel: formatUpdatedAt(settings.updatedAt),
      profileCompletion,
      selectedTemplateDescription: selectedTemplate.description,
      selectedTemplateName: selectedTemplate.name,
      sidebarStatusCopy:
        cards.length > 0
          ? `${cards.length} saved card${cards.length === 1 ? "" : "s"} and ${alertsEnabledCount} alert signal${alertsEnabledCount === 1 ? "" : "s"} enabled.`
          : "No saved cards yet. Complete your workspace card to get this area ready to share.",
    },
    user,
  };
}

import { cookies } from "next/headers";
import { authSecret } from "@/lib/auth-env";
import {
  notificationSettingOptions,
  validQrPreferences,
  type WorkspaceNotificationKey,
  type WorkspaceQrPreference,
} from "@/lib/workspace-settings-options";
import {
  isSupportedWorkspaceAvatarUrl,
} from "@/lib/workspace-avatar";
import { normalizeEmail } from "@/lib/email-auth";
import { templates } from "@/lib/data";
import {
  getLatestWorkspaceTimestamp,
  isNewerWorkspaceTimestamp,
} from "@/lib/workspace-format";
import { supabaseEnabled } from "@/lib/supabase-env";
import {
  getSupabaseProfileByOwnerEmail,
  getSupabaseProfileByUserId,
  upsertSupabaseProfile,
} from "@/lib/supabase/profiles";
import {
  deleteSupabaseWorkspaceCard,
  deleteSupabaseWorkspaceCardsByProfileId,
  getSupabaseWorkspaceCardsByProfileId,
  upsertSupabaseWorkspaceCard,
} from "@/lib/supabase/workspace-cards";
import type { SupabaseProfile, SupabaseWorkspaceCard } from "@/lib/supabase/types";
import type { WorkspaceUser } from "@/lib/workspace-auth";

const SETTINGS_COOKIE_NAME = "digicard-workspace-settings";
const SETTINGS_COOKIE_MAX_AGE = 60 * 60 * 24 * 30;
const SETTINGS_VERSION = 2;
const defaultTemplateId = "blueprint";
const encoder = new TextEncoder();
const decoder = new TextDecoder();

export type WorkspaceSectionKey = "cards" | "notifications" | "profile" | "template";
export type WorkspacePersistenceStatus = "browser" | "cloud" | "degraded";
export type WorkspaceNotificationSettings = Record<WorkspaceNotificationKey, boolean>;
export type WorkspaceSectionUpdatedAt = Record<WorkspaceSectionKey, string | null>;

export type WorkspaceProfile = {
  avatarUrl: string;
  email: string;
  name: string;
  title: string;
  website: string;
};

export type WorkspaceCardDetails = {
  company: string;
  linkedin: string;
  phone: string;
  qrPreference: WorkspaceQrPreference;
};

export type WorkspaceExtraCard = {
  id: string;
  label: string;
  profile: WorkspaceProfile;
  card: WorkspaceCardDetails;
  templateId: string;
  createdAt: string;
  updatedAt: string;
};

export type WorkspaceSettings = {
  card: WorkspaceCardDetails;
  defaultTemplateId: string;
  extraCards: WorkspaceExtraCard[];
  notifications: WorkspaceNotificationSettings;
  owner: string;
  profile: WorkspaceProfile;
  sectionUpdatedAt: WorkspaceSectionUpdatedAt;
  updatedAt: string | null;
  version: number;
};

export type WorkspaceSaveResult = {
  settings: WorkspaceSettings;
  storageStatus: WorkspacePersistenceStatus;
};

type WorkspaceSettingsCookiePayload = {
  owner: string;
  value: WorkspaceSettings;
  version: number;
};

type PersistWorkspaceOptions = {
  touchedSections?: WorkspaceSectionKey[];
};

type PersistWorkspaceResult = WorkspaceSaveResult & {
  profileId: string | null;
};

const defaultNotificationSettings: WorkspaceNotificationSettings = {
  cardOpens: true,
  newSaves: false,
  qrScans: true,
  weeklyDigest: true,
};

const defaultSectionUpdatedAt: WorkspaceSectionUpdatedAt = {
  cards: null,
  notifications: null,
  profile: null,
  template: null,
};

const validTemplateIds = new Set(templates.map((template) => template.id));

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function getOptionalString(value: unknown, fallback = "") {
  return typeof value === "string" ? value : fallback;
}

function getOptionalBoolean(value: unknown, fallback = false) {
  return typeof value === "boolean" ? value : fallback;
}

function isValidDateString(value: unknown): value is string {
  if (typeof value !== "string" || !value) {
    return false;
  }

  return !Number.isNaN(new Date(value).getTime());
}

export class WorkspaceSettingsValidationError extends Error {
  code: string;
  fieldErrors: Record<string, string>;

  constructor(code: string, message: string, fieldErrors: Record<string, string> = {}) {
    super(message);
    this.code = code;
    this.fieldErrors = fieldErrors;
  }
}

function getSettingsSecret() {
  if (authSecret) {
    return authSecret;
  }

  if (process.env.NODE_ENV !== "production") {
    return "digicard-local-settings-secret";
  }

  throw new Error("AUTH_SECRET (or NEXTAUTH_SECRET) is required to persist workspace settings.");
}

function getWorkspaceOwner(user: WorkspaceUser) {
  return user.email.toLowerCase();
}

function cleanText(value: string, maxLength: number) {
  return value.trim().replace(/\s+/g, " ").slice(0, maxLength);
}

function normalizeWebsite(value: string) {
  return cleanText(value, 120).replace(/^https?:\/\//i, "");
}

function normalizeAvatarUrl(value: string) {
  return value.trim();
}

function isValidWebsite(value: string) {
  if (!value) {
    return true;
  }

  try {
    const url = new URL(`https://${value}`);
    return url.hostname === "localhost" || url.hostname.includes(".");
  } catch {
    return false;
  }
}

function isValidPhone(value: string) {
  if (!value) {
    return true;
  }

  const digits = value.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 15;
}

function isValidQrPreference(value: unknown): value is WorkspaceQrPreference {
  return typeof value === "string" && validQrPreferences.has(value as WorkspaceQrPreference);
}

function normalizeLinkedIn(value: string) {
  const cleaned = cleanText(value, 120)
    .replace(/^https?:\/\//i, "")
    .replace(/^www\./i, "")
    .replace(/^@/, "")
    .replace(/[?#].*$/, "")
    .replace(/\/+$/, "");

  if (!cleaned) {
    return "";
  }

  const withoutDomain = cleaned.replace(/^linkedin\.com\//i, "").replace(/^linkedin\//i, "");
  const normalizedPath = withoutDomain.replace(/^\/+/, "");

  if (!normalizedPath) {
    return "";
  }

  if (/^(in|company|school)\//i.test(normalizedPath)) {
    return `linkedin.com/${normalizedPath}`;
  }

  return `linkedin.com/in/${normalizedPath}`;
}

function isValidLinkedIn(value: string) {
  if (!value) {
    return true;
  }

  return /^linkedin\.com\/(in|company|school)\/[a-z0-9._-]+$/i.test(value);
}

function touchSectionTimestamps(
  current: WorkspaceSectionUpdatedAt,
  touchedSections: WorkspaceSectionKey[],
  timestamp: string,
) {
  const next = { ...current };

  for (const section of touchedSections) {
    next[section] = timestamp;
  }

  return next;
}

function mergeSectionUpdatedAt(raw: unknown) {
  const source = isRecord(raw) ? raw : {};

  return {
    cards: isValidDateString(source.cards) ? source.cards : defaultSectionUpdatedAt.cards,
    notifications: isValidDateString(source.notifications)
      ? source.notifications
      : defaultSectionUpdatedAt.notifications,
    profile: isValidDateString(source.profile) ? source.profile : defaultSectionUpdatedAt.profile,
    template: isValidDateString(source.template) ? source.template : defaultSectionUpdatedAt.template,
  } satisfies WorkspaceSectionUpdatedAt;
}

function createDefaultWorkspaceSettings(user: WorkspaceUser): WorkspaceSettings {
  return {
    card: {
      company: "",
      linkedin: "",
      phone: "",
      qrPreference: "auto",
    },
    defaultTemplateId: validTemplateIds.has(defaultTemplateId)
      ? defaultTemplateId
      : templates[0]?.id ?? "blueprint",
    extraCards: [],
    notifications: { ...defaultNotificationSettings },
    owner: getWorkspaceOwner(user),
    profile: {
      avatarUrl: "",
      email: user.email,
      name: user.name,
      title: "",
      website: "",
    },
    sectionUpdatedAt: { ...defaultSectionUpdatedAt },
    updatedAt: null,
    version: SETTINGS_VERSION,
  };
}

function mapSupabaseProfileToWorkspaceSettings(
  user: WorkspaceUser,
  profile: SupabaseProfile,
  extraCards: WorkspaceExtraCard[],
) {
  return mergeWorkspaceSettings(user, {
    card: {
      company: profile.company ?? "",
      linkedin: profile.linkedin ?? "",
      phone: profile.phone ?? "",
      qrPreference: isValidQrPreference(profile.qr_preference) ? profile.qr_preference : "auto",
    },
    defaultTemplateId: profile.default_template_id,
    notifications: profile.notifications,
    owner: profile.owner_email,
    profile: {
      avatarUrl: profile.avatar_url ?? "",
      email: profile.email,
      name: profile.name,
      title: profile.title ?? "",
      website: profile.website ?? "",
    },
    sectionUpdatedAt: {
      cards: profile.cards_updated_at,
      notifications: profile.notifications_updated_at,
      profile: profile.profile_updated_at,
      template: profile.template_updated_at,
    },
    extraCards,
    updatedAt: profile.updated_at,
  });
}

function toBase64Url(bytes: Uint8Array) {
  let binary = "";

  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });

  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function fromBase64Url(value: string) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padding = normalized.length % 4 === 0 ? "" : "=".repeat(4 - (normalized.length % 4));
  const binary = atob(`${normalized}${padding}`);
  const bytes = new Uint8Array(binary.length);

  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }

  return bytes;
}

async function signValue(value: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(getSettingsSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(value));

  return toBase64Url(new Uint8Array(signature));
}

async function encodePayload(payload: WorkspaceSettingsCookiePayload) {
  const encodedPayload = toBase64Url(encoder.encode(JSON.stringify(payload)));
  return `${encodedPayload}.${await signValue(encodedPayload)}`;
}

async function decodePayload(value: string | undefined) {
  if (!value) {
    return null;
  }

  try {
    const [encodedPayload, signature] = value.split(".");

    if (!encodedPayload || !signature || (await signValue(encodedPayload)) !== signature) {
      return null;
    }

    const parsed = JSON.parse(
      decoder.decode(fromBase64Url(encodedPayload)),
    ) as unknown;

    if (!isRecord(parsed) || !isRecord(parsed.value)) {
      return null;
    }

    return parsed as WorkspaceSettingsCookiePayload;
  } catch {
    return null;
  }
}

async function getCookieWorkspaceSettings(user: WorkspaceUser) {
  const cookieStore = await cookies();
  const payload = await decodePayload(cookieStore.get(SETTINGS_COOKIE_NAME)?.value);
  const owner = getWorkspaceOwner(user);

  if (!payload || payload.owner !== owner || payload.version !== SETTINGS_VERSION) {
    return createDefaultWorkspaceSettings(user);
  }

  return mergeWorkspaceSettings(user, payload.value);
}

function mergeExtraCard(raw: unknown): WorkspaceExtraCard | null {
  if (!isRecord(raw)) return null;
  const id = typeof raw.id === "string" && raw.id ? raw.id : null;
  const createdAt = typeof raw.createdAt === "string" && raw.createdAt ? raw.createdAt : null;
  if (!id || !createdAt) return null;
  const rawCard = isRecord(raw.card) ? raw.card : {};
  const rawProfile = isRecord(raw.profile) ? raw.profile : {};
  const templateId =
    typeof raw.templateId === "string" && validTemplateIds.has(raw.templateId)
      ? raw.templateId
      : "blueprint";
  return {
    id,
    label: typeof raw.label === "string" ? raw.label : "",
    profile: {
      email: getOptionalString(rawProfile.email),
      name: getOptionalString(rawProfile.name),
      title: getOptionalString(rawProfile.title),
      avatarUrl: "",
      website: getOptionalString(rawProfile.website),
    },
    card: {
      company: getOptionalString(rawCard.company),
      linkedin: getOptionalString(rawCard.linkedin),
      phone: getOptionalString(rawCard.phone),
      qrPreference: isValidQrPreference(rawCard.qrPreference) ? rawCard.qrPreference : "auto",
    },
    templateId,
    createdAt,
    updatedAt:
      typeof raw.updatedAt === "string" && raw.updatedAt
        ? raw.updatedAt
        : createdAt,
  };
}

function mapSupabaseWorkspaceCardToExtraCard(card: SupabaseWorkspaceCard): WorkspaceExtraCard {
  return {
    id: card.id,
    label: card.label ?? "",
    profile: {
      avatarUrl: "",
      email: card.email,
      name: card.name,
      title: card.title,
      website: card.website ?? "",
    },
    card: {
      company: card.company ?? "",
      linkedin: card.linkedin ?? "",
      phone: card.phone ?? "",
      qrPreference: isValidQrPreference(card.qr_preference) ? card.qr_preference : "auto",
    },
    templateId: validTemplateIds.has(card.template_id) ? card.template_id : defaultTemplateId,
    createdAt: card.created_at,
    updatedAt: card.updated_at,
  };
}

function mergeExtraCards(
  primaryCards: WorkspaceExtraCard[],
  secondaryCards: WorkspaceExtraCard[],
) {
  const cardsById = new Map<string, WorkspaceExtraCard>();

  for (const card of [...secondaryCards, ...primaryCards]) {
    const existing = cardsById.get(card.id);

    if (!existing || isNewerWorkspaceTimestamp(card.updatedAt, existing.updatedAt)) {
      cardsById.set(card.id, card);
    }
  }

  return [...cardsById.values()].sort((left, right) => {
    const leftTime = new Date(left.updatedAt).getTime();
    const rightTime = new Date(right.updatedAt).getTime();
    return rightTime - leftTime;
  });
}

function mergeWorkspaceSettings(
  user: WorkspaceUser,
  candidate: Partial<WorkspaceSettings> | null | undefined,
) {
  const defaults = createDefaultWorkspaceSettings(user);
  const candidateCard = isRecord(candidate?.card) ? candidate.card : undefined;
  const candidateNotifications = isRecord(candidate?.notifications)
    ? candidate.notifications
    : undefined;
  const candidateProfile = isRecord(candidate?.profile) ? candidate.profile : undefined;
  const templateId =
    typeof candidate?.defaultTemplateId === "string" && validTemplateIds.has(candidate.defaultTemplateId)
      ? candidate.defaultTemplateId
      : defaults.defaultTemplateId;
  const extraCards = Array.isArray(candidate?.extraCards)
    ? (candidate.extraCards as unknown[]).map(mergeExtraCard).filter((c): c is WorkspaceExtraCard => c !== null)
    : [];

  return {
    card: {
      company: getOptionalString(candidateCard?.company, defaults.card.company),
      linkedin: getOptionalString(candidateCard?.linkedin, defaults.card.linkedin),
      phone: getOptionalString(candidateCard?.phone, defaults.card.phone),
      qrPreference: isValidQrPreference(candidateCard?.qrPreference)
        ? candidateCard.qrPreference
        : defaults.card.qrPreference,
    },
    defaultTemplateId: templateId,
    extraCards,
    notifications: notificationSettingOptions.reduce<WorkspaceNotificationSettings>(
      (accumulator, option) => {
        accumulator[option.key] = getOptionalBoolean(
          candidateNotifications?.[option.key],
          defaults.notifications[option.key],
        );
        return accumulator;
      },
      { ...defaults.notifications },
    ),
    owner: defaults.owner,
    profile: {
      email: getOptionalString(candidateProfile?.email, defaults.profile.email),
      name: getOptionalString(candidateProfile?.name, defaults.profile.name),
      title: getOptionalString(candidateProfile?.title, defaults.profile.title),
      avatarUrl: getOptionalString(candidateProfile?.avatarUrl, defaults.profile.avatarUrl),
      website: getOptionalString(candidateProfile?.website, defaults.profile.website),
    },
    sectionUpdatedAt: mergeSectionUpdatedAt(candidate?.sectionUpdatedAt),
    updatedAt: isValidDateString(candidate?.updatedAt) ? candidate.updatedAt : defaults.updatedAt,
    version: SETTINGS_VERSION,
  } satisfies WorkspaceSettings;
}

function buildCookieSafeSettings(settings: WorkspaceSettings): WorkspaceSettings {
  return {
    ...settings,
    profile: {
      ...settings.profile,
      avatarUrl: "",
    },
  };
}

async function persistWorkspaceSettings(
  user: WorkspaceUser,
  settings: WorkspaceSettings,
  options: PersistWorkspaceOptions = {},
): Promise<PersistWorkspaceResult> {
  const baseSettings = mergeWorkspaceSettings(user, settings);
  const timestamp = new Date().toISOString();
  const touchedSections = options.touchedSections ?? [];
  let updatedAt = touchedSections.length > 0 ? timestamp : baseSettings.updatedAt ?? timestamp;
  let sectionUpdatedAt = touchSectionTimestamps(
    baseSettings.sectionUpdatedAt,
    touchedSections,
    timestamp,
  );
  let storageStatus: WorkspacePersistenceStatus = supabaseEnabled ? "cloud" : "browser";
  let profileId: string | null = null;

  if (supabaseEnabled) {
    try {
      const profile = await upsertSupabaseProfile({
        cards_updated_at: sectionUpdatedAt.cards,
        company: baseSettings.card.company,
        default_template_id: baseSettings.defaultTemplateId,
        email: baseSettings.profile.email,
        avatar_url: baseSettings.profile.avatarUrl || null,
        linkedin: baseSettings.card.linkedin,
        name: baseSettings.profile.name,
        notifications: baseSettings.notifications,
        notifications_updated_at: sectionUpdatedAt.notifications,
        owner_email: baseSettings.owner,
        phone: baseSettings.card.phone,
        profile_updated_at: sectionUpdatedAt.profile,
        qr_preference: baseSettings.card.qrPreference,
        template_updated_at: sectionUpdatedAt.template,
        title: baseSettings.profile.title,
        user_id: user.id,
        website: baseSettings.profile.website,
      });
      updatedAt = profile.updated_at;
      profileId = profile.id;
      sectionUpdatedAt = {
        cards: profile.cards_updated_at,
        notifications: profile.notifications_updated_at,
        profile: profile.profile_updated_at,
        template: profile.template_updated_at,
      };
    } catch (error) {
      storageStatus = "degraded";
      // Restore the pre-save timestamp so the local cookie doesn't appear newer than
      // Supabase on other devices. A fresh local timestamp would incorrectly "win" the
      // next sync comparison and hide cloud data (e.g. a card saved on another device).
      updatedAt = baseSettings.updatedAt ?? updatedAt;
      console.error("Failed to persist workspace settings to Supabase. Falling back to cookie-only.", error);
    }
  }

  const normalized = mergeWorkspaceSettings(user, {
    ...baseSettings,
    sectionUpdatedAt,
    updatedAt,
  });

  const cookieStore = await cookies();

  cookieStore.set(
    SETTINGS_COOKIE_NAME,
    await encodePayload({
      owner: normalized.owner,
      value: buildCookieSafeSettings(normalized),
      version: SETTINGS_VERSION,
    }),
    {
      httpOnly: true,
      maxAge: SETTINGS_COOKIE_MAX_AGE,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    },
  );

  return {
    profileId,
    settings: normalized,
    storageStatus,
  };
}

export async function getWorkspaceSettings(user: WorkspaceUser) {
  const cookieSettings = await getCookieWorkspaceSettings(user);

  if (!supabaseEnabled) {
    return cookieSettings;
  }

  try {
    const profile =
      (await getSupabaseProfileByUserId(user.id)) ??
      (await getSupabaseProfileByOwnerEmail(getWorkspaceOwner(user)));

    if (!profile) {
      return cookieSettings;
    }

    const supabaseCards = await getSupabaseWorkspaceCardsByProfileId(profile.id);
    const mergedExtraCards = mergeExtraCards(
      supabaseCards.map(mapSupabaseWorkspaceCardToExtraCard),
      cookieSettings.extraCards,
    );
    const supabaseSettings = mapSupabaseProfileToWorkspaceSettings(user, profile, mergedExtraCards);

    if (isNewerWorkspaceTimestamp(cookieSettings.updatedAt, supabaseSettings.updatedAt)) {
      // Cookie is newer (local edits not yet reflected in Supabase). Use cookie data but fall back
      // to Supabase for any fields that are empty — empty values indicate a degraded/default cookie
      // state (e.g. from a failed save), not an intentional edit.
      return mergeWorkspaceSettings(user, {
        ...supabaseSettings,
        card: {
          company: cookieSettings.card.company || supabaseSettings.card.company,
          linkedin: cookieSettings.card.linkedin || supabaseSettings.card.linkedin,
          phone: cookieSettings.card.phone || supabaseSettings.card.phone,
          qrPreference: cookieSettings.card.qrPreference,
        },
        defaultTemplateId: cookieSettings.defaultTemplateId,
        extraCards: mergedExtraCards,
        notifications: cookieSettings.notifications,
        profile: {
          email: cookieSettings.profile.email || supabaseSettings.profile.email,
          name: cookieSettings.profile.name || supabaseSettings.profile.name,
          title: cookieSettings.profile.title || supabaseSettings.profile.title,
          website: cookieSettings.profile.website || supabaseSettings.profile.website,
          avatarUrl: cookieSettings.profile.avatarUrl || supabaseSettings.profile.avatarUrl,
        },
        sectionUpdatedAt: cookieSettings.sectionUpdatedAt,
        updatedAt: cookieSettings.updatedAt,
      });
    }

    return supabaseSettings;
  } catch (error) {
    console.error("Failed to load workspace settings from Supabase. Falling back to cookies.", error);
    return cookieSettings;
  }
}

function validateWorkspaceProfileInput(input: {
  avatarUrl: string;
  email: string;
  linkedin: string;
  name: string;
  phone: string;
  qrPreference: string;
  title: string;
  website: string;
}) {
  const avatarUrl = normalizeAvatarUrl(input.avatarUrl);
  const name = cleanText(input.name, 60);
  const email = normalizeEmail(input.email);
  const linkedin = normalizeLinkedIn(input.linkedin);
  const phone = cleanText(input.phone, 40);
  const qrPreference = isValidQrPreference(input.qrPreference) ? input.qrPreference : null;
  const title = cleanText(input.title, 80);
  const website = normalizeWebsite(input.website);

  if (name.length < 2) {
    throw new WorkspaceSettingsValidationError(
      "profile-invalid",
      "Display name must be at least 2 characters.",
      { name: "Enter your full name." },
    );
  }

  if (!email) {
    throw new WorkspaceSettingsValidationError(
      "profile-invalid",
      "A valid email address is required.",
      { email: "Enter a valid email address." },
    );
  }

  if (!title) {
    throw new WorkspaceSettingsValidationError(
      "profile-invalid",
      "Professional title is required.",
      { title: "Add a professional title." },
    );
  }

  if (!isSupportedWorkspaceAvatarUrl(avatarUrl)) {
    throw new WorkspaceSettingsValidationError(
      "avatar-invalid",
      "Use a PNG, JPG, or WEBP photo under 5 MB.",
      { avatarUrl: "Upload a PNG, JPG, or WEBP photo." },
    );
  }

  if (!qrPreference) {
    throw new WorkspaceSettingsValidationError(
      "qr-invalid",
      "Choose how the QR code should behave before saving.",
      { qrPreference: "Choose a QR destination preference." },
    );
  }

  if (!isValidWebsite(website)) {
    throw new WorkspaceSettingsValidationError(
      "website-invalid",
      "Enter a valid website or leave it blank.",
      { website: "Enter a valid website like yoursite.com." },
    );
  }

  if (!isValidLinkedIn(linkedin)) {
    throw new WorkspaceSettingsValidationError(
      "linkedin-invalid",
      "Enter a valid LinkedIn username or profile URL.",
      { linkedin: "Use a LinkedIn username or linkedin.com/in/yourname." },
    );
  }

  if (!isValidPhone(phone)) {
    throw new WorkspaceSettingsValidationError(
      "phone-invalid",
      "Enter a valid phone number or leave it blank.",
      { phone: "Use a phone number with 10 to 15 digits." },
    );
  }

  return {
    avatarUrl,
    email,
    linkedin,
    name,
    phone,
    qrPreference,
    title,
    website,
  };
}

export async function saveWorkspaceProfile(
  user: WorkspaceUser,
  input: {
    avatarUrl?: string;
    email: string;
    name: string;
    title: string;
    website: string;
  },
) {
  const current = await getWorkspaceSettings(user);
  return saveWorkspaceProfileDetails(user, {
    ...input,
    avatarUrl: input.avatarUrl ?? current.profile.avatarUrl,
    company: current.card.company,
    linkedin: current.card.linkedin,
    phone: current.card.phone,
    qrPreference: current.card.qrPreference,
  });
}

export async function saveWorkspaceProfileDetails(
  user: WorkspaceUser,
  input: {
    avatarUrl: string;
    company: string;
    email: string;
    linkedin: string;
    name: string;
    phone: string;
    qrPreference: string;
    title: string;
    website: string;
  },
) {
  const current = await getWorkspaceSettings(user);
  const validated = validateWorkspaceProfileInput(input);
  const result = await persistWorkspaceSettings(
    user,
    {
      ...current,
      card: {
        company: cleanText(input.company, 80),
        linkedin: validated.linkedin,
        phone: validated.phone,
        qrPreference: validated.qrPreference,
      },
      profile: {
        avatarUrl: validated.avatarUrl,
        email: validated.email,
        name: validated.name,
        title: validated.title,
        website: validated.website,
      },
    },
    { touchedSections: ["cards", "profile"] },
  );

  return {
    settings: result.settings,
    storageStatus: result.storageStatus,
  };
}

export async function saveWorkspaceCardDetails(
  user: WorkspaceUser,
  input: {
    company: string;
    linkedin: string;
    phone: string;
  },
) {
  const current = await getWorkspaceSettings(user);
  return saveWorkspaceProfileDetails(user, {
    company: input.company,
    email: current.profile.email,
    avatarUrl: current.profile.avatarUrl,
    linkedin: input.linkedin,
    name: current.profile.name,
    phone: input.phone,
    qrPreference: current.card.qrPreference,
    title: current.profile.title,
    website: current.profile.website,
  });
}

export async function saveWorkspaceTemplate(user: WorkspaceUser, templateId: string) {
  if (!validTemplateIds.has(templateId)) {
    throw new WorkspaceSettingsValidationError(
      "template-invalid",
      "Choose a valid template before saving.",
      { defaultTemplateId: "Choose one of the available templates." },
    );
  }

  const current = await getWorkspaceSettings(user);
  const result = await persistWorkspaceSettings(
    user,
    {
      ...current,
      defaultTemplateId: templateId,
    },
    { touchedSections: ["template"] },
  );

  return {
    settings: result.settings,
    storageStatus: result.storageStatus,
  };
}

export async function saveWorkspaceCardSnapshot(
  user: WorkspaceUser,
  input: {
    company: string;
    defaultTemplateId: string;
    email: string;
    avatarUrl?: string;
    linkedin: string;
    name: string;
    phone: string;
    qrPreference: string;
    title: string;
    website: string;
  },
) {
  if (!validTemplateIds.has(input.defaultTemplateId)) {
    throw new WorkspaceSettingsValidationError(
      "template-invalid",
      "Choose a valid template before saving.",
      { defaultTemplateId: "Choose one of the available templates." },
    );
  }

  const current = await getWorkspaceSettings(user);
  const validated = validateWorkspaceProfileInput({
    ...input,
    avatarUrl: input.avatarUrl ?? current.profile.avatarUrl,
  });
  const result = await persistWorkspaceSettings(
    user,
    {
      ...current,
      card: {
        company: cleanText(input.company, 80),
        linkedin: validated.linkedin,
        phone: validated.phone,
        qrPreference: validated.qrPreference,
      },
      defaultTemplateId: input.defaultTemplateId,
      profile: {
        avatarUrl: validated.avatarUrl,
        email: validated.email,
        name: validated.name,
        title: validated.title,
        website: validated.website,
      },
    },
    { touchedSections: ["cards", "profile", "template"] },
  );

  return {
    settings: result.settings,
    storageStatus: result.storageStatus,
  };
}

export async function saveWorkspaceExtraCard(
  user: WorkspaceUser,
  input: {
    id: string;
    label: string;
    company: string;
    defaultTemplateId: string;
    email: string;
    linkedin: string;
    name: string;
    phone: string;
    qrPreference: string;
    title: string;
    website: string;
  },
) {
  if (!validTemplateIds.has(input.defaultTemplateId)) {
    throw new WorkspaceSettingsValidationError(
      "template-invalid",
      "Choose a valid template before saving.",
      { defaultTemplateId: "Choose one of the available templates." },
    );
  }

  const validated = validateWorkspaceProfileInput({ ...input, avatarUrl: "" });

  if (!input.id || input.id === "new") {
    throw new WorkspaceSettingsValidationError(
      "card-invalid",
      "Invalid card ID.",
    );
  }

  const current = await getWorkspaceSettings(user);
  const existingIndex = current.extraCards.findIndex((c) => c.id === input.id);
  const createdAt =
    existingIndex >= 0 ? current.extraCards[existingIndex]!.createdAt : new Date().toISOString();
  const updatedAt = new Date().toISOString();

  const updatedCard: WorkspaceExtraCard = {
    id: input.id,
    label: cleanText(input.label, 60),
    profile: {
      email: validated.email,
      name: validated.name,
      title: validated.title,
      avatarUrl: "",
      website: validated.website,
    },
    card: {
      company: cleanText(input.company, 80),
      linkedin: validated.linkedin,
      phone: validated.phone,
      qrPreference: validated.qrPreference,
    },
    templateId: input.defaultTemplateId,
    createdAt,
    updatedAt,
  };

  const nextExtraCards =
    existingIndex >= 0
      ? current.extraCards.map((c, i) => (i === existingIndex ? updatedCard : c))
      : [...current.extraCards, updatedCard];
  const persistResult = await persistWorkspaceSettings(
    user,
    { ...current, extraCards: nextExtraCards },
    { touchedSections: ["cards"] },
  );
  let storageStatus = persistResult.storageStatus;

  if (supabaseEnabled && persistResult.profileId) {
    try {
      await upsertSupabaseWorkspaceCard({
        company: updatedCard.card.company,
        created_at: updatedCard.createdAt,
        email: updatedCard.profile.email,
        id: updatedCard.id,
        label: updatedCard.label,
        linkedin: updatedCard.card.linkedin,
        name: updatedCard.profile.name,
        phone: updatedCard.card.phone,
        profile_id: persistResult.profileId,
        qr_preference: updatedCard.card.qrPreference,
        template_id: updatedCard.templateId,
        title: updatedCard.profile.title,
        updated_at: updatedCard.updatedAt,
        user_id: user.id,
        website: updatedCard.profile.website,
      });
    } catch (error) {
      storageStatus = "degraded";
      console.error("Failed to persist workspace extra card to Supabase.", error);
    }
  }

  return {
    settings: persistResult.settings,
    storageStatus,
  };
}

export async function deleteWorkspaceExtraCard(user: WorkspaceUser, cardId: string) {
  const current = await getWorkspaceSettings(user);
  const persistResult = await persistWorkspaceSettings(
    user,
    {
      ...current,
      extraCards: current.extraCards.filter((c) => c.id !== cardId),
    },
    { touchedSections: ["cards"] },
  );
  let storageStatus = persistResult.storageStatus;

  if (supabaseEnabled && persistResult.profileId) {
    try {
      await deleteSupabaseWorkspaceCard(cardId);
    } catch (error) {
      storageStatus = "degraded";
      console.error("Failed to delete workspace extra card from Supabase.", error);
    }
  }

  return {
    settings: persistResult.settings,
    storageStatus,
  };
}

export async function deleteWorkspacePrimaryCard(user: WorkspaceUser) {
  const current = await getWorkspaceSettings(user);
  const defaults = createDefaultWorkspaceSettings(user);

  const result = await persistWorkspaceSettings(
    user,
    {
      ...current,
      card: {
        company: "",
        linkedin: "",
        phone: "",
        qrPreference: "auto",
      },
      profile: {
        ...defaults.profile,
        avatarUrl: current.profile.avatarUrl,
      },
    },
    { touchedSections: ["cards", "profile"] },
  );

  return {
    settings: result.settings,
    storageStatus: result.storageStatus,
  };
}

export async function clearWorkspaceCards(user: WorkspaceUser): Promise<WorkspaceSaveResult> {
  const current = await getWorkspaceSettings(user);
  const defaults = createDefaultWorkspaceSettings(user);
  const persistResult = await persistWorkspaceSettings(
    user,
    {
      ...current,
      card: {
        company: "",
        linkedin: "",
        phone: "",
        qrPreference: "auto",
      },
      extraCards: [],
      profile: {
        ...defaults.profile,
        avatarUrl: current.profile.avatarUrl,
      },
    },
    { touchedSections: ["cards", "profile"] },
  );
  let storageStatus = persistResult.storageStatus;

  if (supabaseEnabled && persistResult.profileId) {
    try {
      await deleteSupabaseWorkspaceCardsByProfileId(persistResult.profileId);
    } catch (error) {
      storageStatus = "degraded";
      console.error("Failed to clear workspace cards from Supabase.", error);
    }
  }

  return {
    settings: persistResult.settings,
    storageStatus,
  };
}

export async function saveWorkspaceNotifications(
  user: WorkspaceUser,
  enabledKeys: WorkspaceNotificationKey[],
) {
  const current = await getWorkspaceSettings(user);
  const nextNotifications = notificationSettingOptions.reduce<WorkspaceNotificationSettings>(
    (accumulator, option) => {
      accumulator[option.key] = enabledKeys.includes(option.key);
      return accumulator;
    },
    { ...defaultNotificationSettings },
  );

  const result = await persistWorkspaceSettings(
    user,
    {
      ...current,
      notifications: nextNotifications,
    },
    { touchedSections: ["notifications"] },
  );

  return {
    settings: result.settings,
    storageStatus: result.storageStatus,
  };
}

export function getWorkspaceLatestUpdatedAt(settings: WorkspaceSettings) {
  return getLatestWorkspaceTimestamp([
    settings.updatedAt,
    settings.sectionUpdatedAt.profile,
    settings.sectionUpdatedAt.template,
    settings.sectionUpdatedAt.notifications,
    settings.sectionUpdatedAt.cards,
    ...settings.extraCards.flatMap((card) => [card.createdAt, card.updatedAt]),
  ]);
}

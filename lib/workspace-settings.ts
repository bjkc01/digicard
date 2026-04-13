import { cookies } from "next/headers";
import { authSecret } from "@/lib/auth-env";
import {
  notificationSettingOptions,
  qrPreferenceOptions,
  validQrPreferences,
  type WorkspaceNotificationKey,
  type WorkspaceQrPreference,
} from "@/lib/workspace-settings-options";
import { normalizeEmail } from "@/lib/email-auth";
import { templates } from "@/lib/data";
import { supabaseEnabled } from "@/lib/supabase-env";
import {
  getSupabaseProfileByOwnerEmail,
  getSupabaseProfileByUserId,
  upsertSupabaseProfile,
} from "@/lib/supabase/profiles";
import type { WorkspaceUser } from "@/lib/workspace-auth";

const SETTINGS_COOKIE_NAME = "digicard-workspace-settings";
const SETTINGS_COOKIE_MAX_AGE = 60 * 60 * 24 * 30;
const SETTINGS_VERSION = 1;
const defaultTemplateId = "blueprint";
const encoder = new TextEncoder();
const decoder = new TextDecoder();

export type WorkspaceNotificationSettings = Record<WorkspaceNotificationKey, boolean>;

export type WorkspaceProfile = {
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

export type WorkspaceSettings = {
  card: WorkspaceCardDetails;
  defaultTemplateId: string;
  notifications: WorkspaceNotificationSettings;
  owner: string;
  profile: WorkspaceProfile;
  updatedAt: string | null;
  version: number;
};

type WorkspaceSettingsCookiePayload = {
  owner: string;
  value: WorkspaceSettings;
  version: number;
};

const defaultNotificationSettings: WorkspaceNotificationSettings = {
  cardOpens: true,
  newSaves: false,
  qrScans: true,
  weeklyDigest: true,
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

  constructor(code: string, message: string) {
    super(message);
    this.code = code;
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

  if (/^(in|company|school)\//i.test(normalizedPath)) {
    return `linkedin.com/${normalizedPath}`;
  }

  return `linkedin.com/in/${normalizedPath}`;
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
    notifications: { ...defaultNotificationSettings },
    owner: getWorkspaceOwner(user),
    profile: {
      email: user.email,
      name: user.name,
      title: "",
      website: "",
    },
    updatedAt: null,
    version: SETTINGS_VERSION,
  };
}

function mapSupabaseProfileToWorkspaceSettings(
  user: WorkspaceUser,
  profile: Awaited<ReturnType<typeof getSupabaseProfileByUserId>>,
) {
  if (!profile) {
    return null;
  }

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
      email: profile.email,
      name: profile.name,
      title: profile.title ?? "",
      website: profile.website ?? "",
    },
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
      website: getOptionalString(candidateProfile?.website, defaults.profile.website),
    },
    updatedAt: isValidDateString(candidate?.updatedAt) ? candidate.updatedAt : defaults.updatedAt,
    version: SETTINGS_VERSION,
  } satisfies WorkspaceSettings;
}

async function persistWorkspaceSettings(user: WorkspaceUser, settings: WorkspaceSettings) {
  const normalized = mergeWorkspaceSettings(user, {
    ...settings,
    updatedAt: new Date().toISOString(),
  });

  if (supabaseEnabled) {
    await upsertSupabaseProfile({
      company: normalized.card.company,
      default_template_id: normalized.defaultTemplateId,
      email: normalized.profile.email,
      linkedin: normalized.card.linkedin,
      name: normalized.profile.name,
      notifications: normalized.notifications,
      owner_email: normalized.owner,
      phone: normalized.card.phone,
      qr_preference: normalized.card.qrPreference,
      title: normalized.profile.title,
      user_id: user.id,
      website: normalized.profile.website,
    });
  }

  const cookieStore = await cookies();

  cookieStore.set(SETTINGS_COOKIE_NAME, await encodePayload({
    owner: normalized.owner,
    value: normalized,
    version: SETTINGS_VERSION,
  }), {
    httpOnly: true,
    maxAge: SETTINGS_COOKIE_MAX_AGE,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return normalized;
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

    return mapSupabaseProfileToWorkspaceSettings(user, profile) ?? cookieSettings;
  } catch (error) {
    console.error("Failed to load workspace settings from Supabase. Falling back to cookies.", error);
    return cookieSettings;
  }
}

export async function saveWorkspaceProfile(
  user: WorkspaceUser,
  input: {
    email: string;
    name: string;
    title: string;
    website: string;
  },
) {
  const current = await getWorkspaceSettings(user);
  return saveWorkspaceProfileDetails(user, {
    ...input,
    company: current.card.company,
    linkedin: current.card.linkedin,
    phone: current.card.phone,
    qrPreference: current.card.qrPreference,
  });
}

export async function saveWorkspaceProfileDetails(
  user: WorkspaceUser,
  input: {
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
  const name = cleanText(input.name, 60);
  const email = normalizeEmail(input.email);
  const qrPreference = isValidQrPreference(input.qrPreference) ? input.qrPreference : null;
  const title = cleanText(input.title, 80);
  const website = normalizeWebsite(input.website);

  if (name.length < 2) {
    throw new WorkspaceSettingsValidationError(
      "profile-invalid",
      "Display name must be at least 2 characters.",
    );
  }

  if (!email) {
    throw new WorkspaceSettingsValidationError(
      "profile-invalid",
      "A valid email address is required.",
    );
  }

  if (!title) {
    throw new WorkspaceSettingsValidationError(
      "profile-invalid",
      "Professional title is required.",
    );
  }

  if (!qrPreference) {
    throw new WorkspaceSettingsValidationError(
      "qr-invalid",
      "Choose how the QR code should behave before saving.",
    );
  }

  return persistWorkspaceSettings(user, {
    ...current,
    card: {
      company: cleanText(input.company, 80),
      linkedin: normalizeLinkedIn(input.linkedin),
      phone: cleanText(input.phone, 40),
      qrPreference,
    },
    profile: {
      email,
      name,
      title,
      website,
    },
  });
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
    );
  }

  const current = await getWorkspaceSettings(user);

  return persistWorkspaceSettings(user, {
    ...current,
    defaultTemplateId: templateId,
  });
}

export async function saveWorkspaceCardSnapshot(
  user: WorkspaceUser,
  input: {
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
    );
  }

  const current = await getWorkspaceSettings(user);
  const name = cleanText(input.name, 60);
  const email = normalizeEmail(input.email);
  const qrPreference = isValidQrPreference(input.qrPreference) ? input.qrPreference : null;
  const title = cleanText(input.title, 80);
  const website = normalizeWebsite(input.website);

  if (name.length < 2) {
    throw new WorkspaceSettingsValidationError(
      "profile-invalid",
      "Display name must be at least 2 characters.",
    );
  }

  if (!email) {
    throw new WorkspaceSettingsValidationError(
      "profile-invalid",
      "A valid email address is required.",
    );
  }

  if (!title) {
    throw new WorkspaceSettingsValidationError(
      "profile-invalid",
      "Professional title is required.",
    );
  }

  if (!qrPreference) {
    throw new WorkspaceSettingsValidationError(
      "qr-invalid",
      "Choose how the QR code should behave before saving.",
    );
  }

  return persistWorkspaceSettings(user, {
    ...current,
    card: {
      company: cleanText(input.company, 80),
      linkedin: normalizeLinkedIn(input.linkedin),
      phone: cleanText(input.phone, 40),
      qrPreference,
    },
    defaultTemplateId: input.defaultTemplateId,
    profile: {
      email,
      name,
      title,
      website,
    },
  });
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

  return persistWorkspaceSettings(user, {
    ...current,
    notifications: nextNotifications,
  });
}

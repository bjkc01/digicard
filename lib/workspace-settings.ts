import { cookies } from "next/headers";
import { authSecret } from "@/lib/auth-env";
import { normalizeEmail } from "@/lib/email-auth";
import { templates } from "@/lib/data";
import type { WorkspaceUser } from "@/lib/workspace-auth";

const SETTINGS_COOKIE_NAME = "digicard-workspace-settings";
const SETTINGS_COOKIE_MAX_AGE = 60 * 60 * 24 * 30;
const SETTINGS_VERSION = 1;
const defaultTemplateId = "blueprint";
const encoder = new TextEncoder();
const decoder = new TextDecoder();

export const notificationSettingOptions = [
  {
    description: "Get a heads-up when someone opens a shared card.",
    key: "cardOpens",
    label: "Card opens",
  },
  {
    description: "Track in-person interest from badges, flyers, and handouts.",
    key: "qrScans",
    label: "QR code scans",
  },
  {
    description: "Know when someone saves your card details for later.",
    key: "newSaves",
    label: "New contact saves",
  },
  {
    description: "Receive a concise weekly recap of profile activity.",
    key: "weeklyDigest",
    label: "Weekly digest",
  },
] as const;

export type WorkspaceNotificationKey = (typeof notificationSettingOptions)[number]["key"];

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

function normalizeLinkedIn(value: string) {
  return cleanText(value, 120)
    .replace(/^https?:\/\//i, "")
    .replace(/^www\./i, "");
}

function createDefaultWorkspaceSettings(user: WorkspaceUser): WorkspaceSettings {
  return {
    card: {
      company: "",
      linkedin: "",
      phone: "",
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

  const [encodedPayload, signature] = value.split(".");

  if (!encodedPayload || !signature || (await signValue(encodedPayload)) !== signature) {
    return null;
  }

  try {
    return JSON.parse(
      decoder.decode(fromBase64Url(encodedPayload)),
    ) as WorkspaceSettingsCookiePayload;
  } catch {
    return null;
  }
}

function mergeWorkspaceSettings(
  user: WorkspaceUser,
  candidate: Partial<WorkspaceSettings> | null | undefined,
) {
  const defaults = createDefaultWorkspaceSettings(user);
  const templateId =
    typeof candidate?.defaultTemplateId === "string" && validTemplateIds.has(candidate.defaultTemplateId)
      ? candidate.defaultTemplateId
      : defaults.defaultTemplateId;

  return {
    card: {
      ...defaults.card,
      ...candidate?.card,
    },
    defaultTemplateId: templateId,
    notifications: {
      ...defaults.notifications,
      ...candidate?.notifications,
    },
    owner: defaults.owner,
    profile: {
      ...defaults.profile,
      ...candidate?.profile,
    },
    updatedAt:
      typeof candidate?.updatedAt === "string" && candidate.updatedAt
        ? candidate.updatedAt
        : null,
    version: SETTINGS_VERSION,
  } satisfies WorkspaceSettings;
}

async function persistWorkspaceSettings(user: WorkspaceUser, settings: WorkspaceSettings) {
  const cookieStore = await cookies();
  const normalized = mergeWorkspaceSettings(user, {
    ...settings,
    updatedAt: new Date().toISOString(),
  });

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
  const cookieStore = await cookies();
  const payload = await decodePayload(cookieStore.get(SETTINGS_COOKIE_NAME)?.value);
  const owner = getWorkspaceOwner(user);

  if (!payload || payload.owner !== owner || payload.version !== SETTINGS_VERSION) {
    return createDefaultWorkspaceSettings(user);
  }

  return mergeWorkspaceSettings(user, payload.value);
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
    title: string;
    website: string;
  },
) {
  const current = await getWorkspaceSettings(user);
  const name = cleanText(input.name, 60);
  const email = normalizeEmail(input.email);
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

  return persistWorkspaceSettings(user, {
    ...current,
    card: {
      company: cleanText(input.company, 80),
      linkedin: normalizeLinkedIn(input.linkedin),
      phone: cleanText(input.phone, 40),
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

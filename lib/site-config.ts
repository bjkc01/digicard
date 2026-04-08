import type { DigiCard } from "@/lib/data";

const DEFAULT_SITE_URL = "https://getmycard.vercel.app";

function normalizeSiteUrl(value: string | undefined) {
  if (!value) {
    return undefined;
  }

  const trimmed = value.trim();

  if (!trimmed) {
    return undefined;
  }

  const withProtocol = /^[a-z]+:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;

  try {
    return new URL(withProtocol).origin;
  } catch {
    return undefined;
  }
}

function normalizePublicUrl(value: string | undefined) {
  if (!value) {
    return undefined;
  }

  const trimmed = value.trim();

  if (!trimmed) {
    return undefined;
  }

  if (/^(mailto:|tel:)/i.test(trimmed)) {
    return trimmed;
  }

  const withProtocol = /^[a-z]+:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;

  try {
    return new URL(withProtocol).toString();
  } catch {
    return undefined;
  }
}

function normalizeEmail(value: string | undefined) {
  const trimmed = value?.trim().toLowerCase();

  if (!trimmed || !trimmed.includes("@")) {
    return undefined;
  }

  return trimmed;
}

export const siteConfig = {
  description:
    "Create a digital professional card your team can share with a QR code, keep up to date in one place, and use across meetings, events, and follow-ups.",
  name: "DigiCard",
  url: normalizeSiteUrl(process.env.NEXT_PUBLIC_APP_URL) ?? DEFAULT_SITE_URL,
} as const;

export function getAbsoluteUrl(path = "/") {
  const resolvedPath = path.startsWith("/") ? path : `/${path}`;
  return new URL(resolvedPath, siteConfig.url).toString();
}

export function getCardShareTarget(card: Pick<DigiCard, "email" | "linkedin" | "website">) {
  const websiteUrl = normalizePublicUrl(card.website);

  if (websiteUrl) {
    return {
      label: "website",
      url: websiteUrl,
    };
  }

  const linkedInUrl = normalizePublicUrl(card.linkedin);

  if (linkedInUrl) {
    return {
      label: "LinkedIn",
      url: linkedInUrl,
    };
  }

  const email = normalizeEmail(card.email);

  if (email) {
    return {
      label: "email",
      url: `mailto:${email}`,
    };
  }

  return {
    label: "DigiCard home",
    url: getAbsoluteUrl("/"),
  };
}

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

function normalizeLinkedInUrl(value: string | undefined) {
  if (!value) {
    return undefined;
  }

  const trimmed = value.trim();

  if (!trimmed) {
    return undefined;
  }

  const withoutProtocol = trimmed.replace(/^https?:\/\//i, "").replace(/^www\./i, "");
  const withoutQuery = withoutProtocol.replace(/[?#].*$/, "").replace(/\/+$/, "");
  const withoutAtSign = withoutQuery.replace(/^@/, "");
  const withoutDomain = withoutAtSign
    .replace(/^linkedin\.com\//i, "")
    .replace(/^linkedin\//i, "")
    .replace(/^\/+/, "");

  if (!withoutDomain) {
    return undefined;
  }

  const normalizedPath = /^(in|company|school)\//i.test(withoutDomain)
    ? withoutDomain
    : `in/${withoutDomain}`;

  return `https://linkedin.com/${normalizedPath}`;
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

function normalizePhoneDigits(value: string | undefined) {
  if (!value) return undefined;
  const digits = value.replace(/\D/g, "");
  if (!digits) return undefined;
  const hasPlus = value.trim().startsWith("+");
  return `${hasPlus ? "+" : ""}${digits}`;
}

function buildVCard(card: Pick<DigiCard, "name" | "title" | "company" | "email" | "phone" | "website" | "linkedin">) {
  const phone = normalizePhoneDigits(card.phone);
  const linkedInUrl = normalizeLinkedInUrl(card.linkedin);
  const websiteUrl = normalizePublicUrl(card.website);
  const email = normalizeEmail(card.email);

  const nameParts = card.name.trim().split(/\s+/);
  const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : nameParts[0];
  const firstName = nameParts.length > 1 ? nameParts[0] : "";

  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${card.name}`,
    `N:${lastName};${firstName};;;`,
  ];

  if (card.title) lines.push(`TITLE:${card.title}`);
  if (card.company) lines.push(`ORG:${card.company}`);
  if (phone) lines.push(`TEL;TYPE=CELL:${phone}`);
  if (email) lines.push(`EMAIL:${email}`);
  if (websiteUrl) lines.push(`URL:${websiteUrl}`);
  else if (linkedInUrl) lines.push(`URL:${linkedInUrl}`);

  lines.push("END:VCARD");
  return lines.join("\n");
}

export function getCardShareTarget(
  card: Pick<DigiCard, "company" | "email" | "linkedin" | "name" | "phone" | "title" | "website" | "qrPreference">,
) {
  const websiteUrl = normalizePublicUrl(card.website);
  const linkedInUrl = normalizeLinkedInUrl(card.linkedin);
  const email = normalizeEmail(card.email);
  const preference = card.qrPreference ?? "auto";

  if (preference === "phone") {
    const vcard = buildVCard(card);
    return { label: "Contact", url: vcard };
  }

  const candidates =
    preference === "linkedin"
      ? [
          linkedInUrl ? { label: "LinkedIn", url: linkedInUrl } : null,
          websiteUrl ? { label: "Website", url: websiteUrl } : null,
          email ? { label: "Email", url: `mailto:${email}` } : null,
        ]
      : preference === "website"
        ? [
            websiteUrl ? { label: "Website", url: websiteUrl } : null,
            linkedInUrl ? { label: "LinkedIn", url: linkedInUrl } : null,
            email ? { label: "Email", url: `mailto:${email}` } : null,
          ]
        : [
            websiteUrl ? { label: "Website", url: websiteUrl } : null,
            linkedInUrl ? { label: "LinkedIn", url: linkedInUrl } : null,
            email ? { label: "Email", url: `mailto:${email}` } : null,
          ];

  const selectedTarget = candidates.find(Boolean);

  if (selectedTarget) {
    return selectedTarget;
  }

  return {
    label: "DigiCard home",
    url: getAbsoluteUrl("/"),
  };
}

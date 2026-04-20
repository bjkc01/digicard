import type { CardQrPreference } from "@/lib/data";

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

export const qrPreferenceOptions = [
  {
    description: "Use website first, then LinkedIn, then email if a field is missing.",
    key: "auto",
    label: "Auto",
  },
  {
    description: "Prefer the website QR when one is available.",
    key: "website",
    label: "Website",
  },
  {
    description: "Prefer the LinkedIn QR when one is available.",
    key: "linkedin",
    label: "LinkedIn",
  },
  {
    description: "Encode your phone number so scanners can save or call it directly.",
    key: "phone",
    label: "Phone",
  },
] as const;

export type WorkspaceQrPreference = (typeof qrPreferenceOptions)[number]["key"];

export const manualQrPreferenceOptions = qrPreferenceOptions.filter(
  (option) => option.key !== "auto",
);

export const validQrPreferences = new Set<CardQrPreference>(
  qrPreferenceOptions.map((option) => option.key),
);

export const validManualQrPreferences = new Set<CardQrPreference>(
  manualQrPreferenceOptions.map((option) => option.key),
);

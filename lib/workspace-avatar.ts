export const workspaceAvatarStorageKey = "digicard-workspace-avatar";
export const maxWorkspaceAvatarFileSizeBytes = 5 * 1024 * 1024;
export const maxWorkspaceAvatarDataUrlLength = 250_000;

const avatarDataUrlPattern = /^data:image\/(png|jpeg|jpg|webp);base64,[a-z0-9+/=]+$/i;

export function getWorkspaceAvatarInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase() || "DC";
}

export function isSupportedWorkspaceAvatarUrl(value: string) {
  if (!value) {
    return true;
  }

  if (avatarDataUrlPattern.test(value)) {
    return value.length <= maxWorkspaceAvatarDataUrlLength;
  }

  return /^https?:\/\//i.test(value);
}

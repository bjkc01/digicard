const localGoogleAuthHosts = new Set(["127.0.0.1:3000", "localhost:3000"]);

function normalizeHost(value: string | null | undefined) {
  if (!value) {
    return null;
  }

  const trimmed = value.trim().toLowerCase();

  if (!trimmed) {
    return null;
  }

  return trimmed.split(",")[0]?.trim() ?? null;
}

function getConfiguredAppHost() {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL?.trim();

  if (!appUrl) {
    return null;
  }

  try {
    return new URL(appUrl).host.toLowerCase();
  } catch {
    return null;
  }
}

export function getGoogleAuthSupportedHosts() {
  const hosts = new Set<string>();
  const configuredAppHost = getConfiguredAppHost();

  if (configuredAppHost) {
    hosts.add(configuredAppHost);
  }

  if (process.env.NODE_ENV !== "production") {
    localGoogleAuthHosts.forEach((host) => hosts.add(host));
  }

  return hosts;
}

export function isGoogleAuthSupportedHost(host: string | null | undefined) {
  const normalizedHost = normalizeHost(host);

  if (!normalizedHost) {
    return false;
  }

  return getGoogleAuthSupportedHosts().has(normalizedHost);
}

export function getGoogleAuthHostErrorMessage() {
  const configuredAppHost = getConfiguredAppHost();

  if (configuredAppHost) {
    return `Google sign-in is only enabled on ${configuredAppHost} right now. Preview deployments use changing callback URLs that Google will reject.`;
  }

  return "Google sign-in is not available on this host right now.";
}

function getRawEnvValue(keys: string[]) {
  for (const key of keys) {
    const value = process.env[key]?.trim();

    if (value) {
      return value;
    }
  }

  return undefined;
}

function getConfiguredEnvValue(keys: string[], placeholderValues: string[]) {
  const value = getRawEnvValue(keys);

  if (!value) {
    return undefined;
  }

  const normalized = value.toLowerCase();
  const placeholderMatch = placeholderValues.some(
    (placeholderValue) => normalized === placeholderValue.toLowerCase(),
  );

  return placeholderMatch ? undefined : value;
}

export const authSecret = getConfiguredEnvValue(
  ["AUTH_SECRET", "NEXTAUTH_SECRET"],
  ["replace-with-a-long-random-secret"],
);

export const googleClientId = getConfiguredEnvValue(
  ["AUTH_GOOGLE_ID", "GOOGLE_CLIENT_ID"],
  ["your-google-oauth-client-id"],
);

export const googleClientSecret = getConfiguredEnvValue(
  ["AUTH_GOOGLE_SECRET", "GOOGLE_CLIENT_SECRET"],
  ["your-google-oauth-client-secret"],
);

const WORKSPACE_DISPLAY_TIME_ZONE = "America/New_York";

export function formatWorkspaceTimestamp(value: string | null) {
  if (!value) {
    return "Not saved yet";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Not saved yet";
  }

  const dateLabel = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    timeZone: WORKSPACE_DISPLAY_TIME_ZONE,
    year: "numeric",
  }).format(date);
  const timeLabel = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: WORKSPACE_DISPLAY_TIME_ZONE,
  }).format(date);

  return `${dateLabel} at ${timeLabel}`;
}

export function formatSavedWorkspaceTimestamp(value: string | null) {
  const formatted = formatWorkspaceTimestamp(value);
  return formatted === "Not saved yet" ? formatted : `Saved ${formatted}`;
}

export function getLatestWorkspaceTimestamp(values: Array<string | null | undefined>) {
  let latest: string | null = null;
  let latestTime = Number.NEGATIVE_INFINITY;

  for (const value of values) {
    if (!value) {
      continue;
    }

    const time = new Date(value).getTime();

    if (Number.isNaN(time) || time <= latestTime) {
      continue;
    }

    latest = value;
    latestTime = time;
  }

  return latest;
}

export function isNewerWorkspaceTimestamp(candidate: string | null, reference: string | null) {
  if (!candidate) {
    return false;
  }

  if (!reference) {
    return true;
  }

  const candidateTime = new Date(candidate).getTime();
  const referenceTime = new Date(reference).getTime();

  if (Number.isNaN(candidateTime)) {
    return false;
  }

  if (Number.isNaN(referenceTime)) {
    return true;
  }

  return candidateTime > referenceTime;
}

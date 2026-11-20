// What the hero phone shows for the visitor's typed name, title, and email (with sample fallbacks).

export type PreviewPerson = {
  name: string;
  firstName: string;
  title: string;
  email: string;
  handle: string;
  initials: string;
  /** Font size of the name on the live card, smaller for long names. */
  cardNameSize: string;
  /** Font size of the name on the Wallet pass. */
  passNameSize: string;
};

export function getPreviewPerson(name: string, title: string, email: string): PreviewPerson {
  const displayName = name.trim() || "Jordan Lin";
  const parts = displayName.split(/\s+/);
  const initials = [parts[0], ...(parts.length > 1 ? [parts[parts.length - 1]] : [])]
    .map((part) => Array.from(part)[0] ?? "")
    .join("")
    .toLocaleUpperCase();
  const handle = displayName.toLowerCase().replace(/[^a-z0-9]+/g, "") || "yourname";

  return {
    name: displayName,
    firstName: parts[0],
    title: title.trim() || "Computer Science Student",
    email: email.trim() || `${handle}@example.com`,
    handle,
    initials,
    cardNameSize: displayName.length > 36 ? "1.25rem" : displayName.length > 22 ? "1.55rem" : "1.95rem",
    passNameSize: displayName.length > 26 ? "15px" : displayName.length > 18 ? "17px" : "20px",
  };
}

import { authSecret } from "@/lib/auth-env";

const EMAIL_CODE_TTL_SECONDS = 10 * 60;
const EMAIL_LOGIN_TOKEN_TTL_SECONDS = 5 * 60;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const encoder = new TextEncoder();
const decoder = new TextDecoder();

export const emailAuthCookieName = "digicard-email-signin";

type PendingEmailCodePayload = {
  codeHash: string;
  email: string;
  expiresAt: number;
  nonce: string;
};

type EmailLoginTokenPayload = {
  email: string;
  expiresAt: number;
  name: string;
  nonce: string;
  userId: string;
};

function getAuthSecret() {
  const secret = authSecret;

  if (!secret) {
    throw new Error("AUTH_SECRET (or NEXTAUTH_SECRET) is required for email sign-in.");
  }

  return secret;
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
    encoder.encode(getAuthSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(value));

  return toBase64Url(new Uint8Array(signature));
}

async function encodeSignedPayload(payload: PendingEmailCodePayload | EmailLoginTokenPayload) {
  const encodedPayload = toBase64Url(encoder.encode(JSON.stringify(payload)));
  return `${encodedPayload}.${await signValue(encodedPayload)}`;
}

async function decodeSignedPayload<T>(value: string | undefined) {
  if (!value) {
    return null;
  }

  const [encodedPayload, signature] = value.split(".");

  if (!encodedPayload || !signature || (await signValue(encodedPayload)) !== signature) {
    return null;
  }

  try {
    return JSON.parse(decoder.decode(fromBase64Url(encodedPayload))) as T;
  } catch {
    return null;
  }
}

async function hashEmailCode(email: string, code: string, nonce: string) {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    encoder.encode(`${email}:${code}:${nonce}:${getAuthSecret()}`),
  );

  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function createRandomDigits(length: number) {
  const digits = new Uint32Array(length);
  crypto.getRandomValues(digits);

  return Array.from(digits, (value) => (value % 10).toString()).join("");
}

export const emailDeliveryConfigured = Boolean(
  process.env.AUTH_EMAIL_FROM && process.env.AUTH_RESEND_API_KEY,
);

export const emailAuthUsesConsoleFallback =
  process.env.NODE_ENV !== "production" && !emailDeliveryConfigured;

export const emailAuthEnabled = Boolean(authSecret) && (
  emailDeliveryConfigured || emailAuthUsesConsoleFallback
);

export function normalizeEmail(value: FormDataEntryValue | string | null | undefined) {
  if (typeof value !== "string") {
    return null;
  }

  const normalized = value.trim().toLowerCase();

  if (!emailPattern.test(normalized)) {
    return null;
  }

  return normalized;
}

export function formatEmailDisplayName(email: string) {
  const localPart = email.split("@")[0] ?? "DigiCard user";
  const words = localPart
    .split(/[._-]+/)
    .filter(Boolean)
    .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`);

  return words.join(" ") || "DigiCard user";
}

export async function createEmailUserId(email: string) {
  const digest = await crypto.subtle.digest("SHA-256", encoder.encode(email));

  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export async function createPendingEmailCode(email: string) {
  const code = createRandomDigits(6);
  const nonce = crypto.randomUUID();
  const expiresAt = Date.now() + EMAIL_CODE_TTL_SECONDS * 1000;
  const cookieValue = await encodeSignedPayload({
    codeHash: await hashEmailCode(email, code, nonce),
    email,
    expiresAt,
    nonce,
  });

  return {
    code,
    cookieValue,
    expiresAt,
  };
}

export function getPendingEmailCodeCookieOptions(expiresAt: number) {
  return {
    expires: new Date(expiresAt),
    httpOnly: true,
    maxAge: EMAIL_CODE_TTL_SECONDS,
    path: "/",
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
  };
}

export async function verifyPendingEmailCode(
  value: string | undefined,
  email: string,
  code: string,
) {
  const payload = await decodeSignedPayload<PendingEmailCodePayload>(value);

  if (!payload || payload.email !== email) {
    return { ok: false as const, reason: "EmailCodeExpired" };
  }

  if (payload.expiresAt < Date.now()) {
    return { ok: false as const, reason: "EmailCodeExpired" };
  }

  if (payload.codeHash !== (await hashEmailCode(email, code, payload.nonce))) {
    return { ok: false as const, reason: "EmailCodeInvalid" };
  }

  return { ok: true as const };
}

export async function createEmailLoginToken(email: string) {
  return encodeSignedPayload({
    email,
    expiresAt: Date.now() + EMAIL_LOGIN_TOKEN_TTL_SECONDS * 1000,
    name: formatEmailDisplayName(email),
    nonce: crypto.randomUUID(),
    userId: await createEmailUserId(email),
  });
}

export async function verifyEmailLoginToken(token: string | undefined, email: string | undefined) {
  const payload = await decodeSignedPayload<EmailLoginTokenPayload>(token);

  if (!payload || payload.expiresAt < Date.now()) {
    return null;
  }

  if (!email || payload.email !== email) {
    return null;
  }

  return {
    email: payload.email,
    id: payload.userId,
    name: payload.name,
  };
}

export async function sendEmailSignInCode({
  code,
  email,
  host,
}: {
  code: string;
  email: string;
  host: string;
}) {
  if (emailDeliveryConfigured) {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.AUTH_RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.AUTH_EMAIL_FROM,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:420px;margin:0 auto;padding:24px;">
            <p style="margin:0 0 16px;color:#475569;font-size:14px;">DigiCard sign-in</p>
            <h1 style="margin:0 0 16px;color:#0f172a;font-size:28px;">Your sign-in code</h1>
            <p style="margin:0 0 24px;color:#334155;font-size:16px;line-height:1.6;">
              Enter this code to keep signing in to DigiCard on ${host}.
            </p>
            <div style="margin:0 0 24px;padding:18px 20px;border-radius:16px;background:#eef2ff;color:#172554;font-size:32px;font-weight:700;letter-spacing:0.24em;text-align:center;">
              ${code}
            </div>
            <p style="margin:0;color:#64748b;font-size:14px;line-height:1.6;">
              This code expires in 10 minutes. If you did not request it, you can safely ignore this email.
            </p>
          </div>
        `,
        subject: "Your DigiCard sign-in code",
        text: `Your DigiCard sign-in code is ${code}. It expires in 10 minutes.`,
        to: email,
      }),
    });

    if (!response.ok) {
      throw new Error(`Resend email delivery failed with status ${response.status}.`);
    }

    return;
  }

  if (emailAuthUsesConsoleFallback) {
    console.info(
      `[digicard auth] Email sign-in code for ${email}: ${code}. Add AUTH_RESEND_API_KEY and AUTH_EMAIL_FROM to send real emails.`,
    );
    return;
  }

  throw new Error("Email delivery is not configured.");
}

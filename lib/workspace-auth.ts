import { redirect } from "next/navigation";
import { auth, devAuthBypassEnabled } from "@/auth";

export type WorkspaceUser = {
  authDescription: string;
  authLabel: string;
  authProvider: string;
  email: string;
  id: string;
  isPreview: boolean;
  name: string;
};

function getSafeCallbackUrl(callbackUrl: string) {
  return callbackUrl.startsWith("/") ? callbackUrl : "/dashboard";
}

function getAuthCopy(provider: string) {
  switch (provider) {
    case "google":
      return {
        authDescription: "Managed by Google OAuth and backed by a signed session.",
        authLabel: "Google",
      };
    case "email-code":
      return {
        authDescription: "Authenticated with a one-time verification code and signed session.",
        authLabel: "Email code",
      };
    case "dev-bypass":
      return {
        authDescription:
          "Local preview mode is bypassing sign-in in development so protected screens can be reviewed.",
        authLabel: "Local preview",
      };
    default:
      return {
        authDescription: "Authenticated with a valid DigiCard session.",
        authLabel: "Authenticated session",
      };
  }
}

export async function requireWorkspaceUser(callbackUrl = "/dashboard"): Promise<WorkspaceUser> {
  const session = await auth();
  const sessionUser = session?.user;
  const provider = sessionUser?.authProvider ?? "session";

  if (sessionUser && (sessionUser.email || sessionUser.name || sessionUser.id)) {
    const authCopy = getAuthCopy(provider);

    return {
      ...authCopy,
      authProvider: provider,
      email: sessionUser.email ?? "account@digicard.local",
      id: sessionUser.id ?? sessionUser.email ?? "workspace-user",
      isPreview: false,
      name: sessionUser.name ?? "DigiCard user",
    };
  }

  if (devAuthBypassEnabled) {
    const authCopy = getAuthCopy("dev-bypass");

    return {
      ...authCopy,
      authProvider: "dev-bypass",
      email: "preview@digicard.local",
      id: "dev-preview-user",
      isPreview: true,
      name: "Preview User",
    };
  }

  redirect(`/login?callbackUrl=${encodeURIComponent(getSafeCallbackUrl(callbackUrl))}`);
}

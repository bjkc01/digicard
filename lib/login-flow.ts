export type AuthView = "modal" | "page";

export type LoginSearchParams = {
  auth?: string;
  callbackUrl?: string;
  email?: string;
  error?: string;
  method?: string;
  notice?: string;
  step?: string;
};

function mergeParamsIntoPath(pathname: string, params: URLSearchParams) {
  const [basePath, existingQuery] = pathname.split("?");
  const merged = new URLSearchParams(existingQuery ?? "");

  params.forEach((value, key) => {
    merged.set(key, value);
  });

  const query = merged.toString();
  return query ? `${basePath}?${query}` : basePath;
}

export function getSafeCallbackUrl(value?: FormDataEntryValue | string | null) {
  return typeof value === "string" && value.startsWith("/") ? value : "/dashboard";
}

export function getSafeOriginPath(value?: FormDataEntryValue | string | null) {
  return typeof value === "string" && value.startsWith("/") ? value : "/";
}

export function getAuthView(value?: FormDataEntryValue | string | null): AuthView {
  return value === "modal" ? "modal" : "page";
}

export function getDestinationLabel(callbackUrl: string) {
  if (callbackUrl === "/dashboard") return "your dashboard";
  if (callbackUrl.startsWith("/cards")) return "your saved cards";
  if (callbackUrl.startsWith("/create-card")) return "the create-card flow";
  if (callbackUrl.startsWith("/settings")) return "settings";
  if (callbackUrl.startsWith("/templates")) return "template selection";
  return "your workspace";
}

export function getLoginErrorMessage(error?: string) {
  switch (error) {
    case "AccessDenied":
      return "Google sign-in was canceled before it finished. Please try again.";
    case "Configuration":
      return "Google sign-in is misconfigured for this deployment. Check AUTH_SECRET, AUTH_GOOGLE_ID, AUTH_GOOGLE_SECRET, and the callback URL in Google Cloud.";
    case "GoogleOAuthHostUnsupported":
      return "Google sign-in is only enabled on the primary DigiCard domain right now. Preview deployments use different callback URLs, so Google blocks them.";
    case "GoogleOAuthNotConfigured":
      return "Google sign-in is not configured for this deployment yet.";
    case "EmailInvalid":
      return "Enter a valid email address to continue.";
    case "EmailSigninUnavailable":
      return "Email sign-in is not configured for this deployment yet.";
    case "EmailSendFailed":
      return "We could not send your sign-in code. Please try again.";
    case "EmailCodeRequired":
      return "Enter the 6-digit code we sent to your email.";
    case "EmailCodeInvalid":
      return "That code did not match. Please try again.";
    case "EmailCodeExpired":
      return "That code expired. Request a new one and try again.";
    case "EmailSigninFailed":
      return "We could not finish email sign-in. Please try again.";
    case "TempCredentialsRequired":
      return "Enter the temporary ID and password to continue.";
    case "TempCredentialsUnavailable":
      return "Temporary access is not configured for this deployment yet.";
    case "TempCredentialsInvalid":
      return "That temporary ID or password was not correct.";
    default:
      return error ? "We couldn't complete sign-in. Please try again." : null;
  }
}

export function getLoginNoticeMessage(notice?: string) {
  switch (notice) {
    case "EmailCodeSent":
      return "A 6-digit sign-in code is ready for you.";
    default:
      return null;
  }
}

export function getLoginUrl({
  authView = "page",
  callbackUrl,
  email,
  error,
  notice,
  originPath = "/",
  step,
}: {
  authView?: AuthView;
  callbackUrl: string;
  email?: string;
  error?: string;
  notice?: string;
  originPath?: string;
  step?: "verify";
}) {
  const params = new URLSearchParams({ callbackUrl });

  if (authView === "modal") {
    params.set("auth", "login");
  }

  if (email) {
    params.set("email", email);
  }

  if (error) {
    params.set("error", error);
  }

  if (notice) {
    params.set("notice", notice);
  }

  if (step) {
    params.set("method", "email");
    params.set("step", step);
  }

  return authView === "modal"
    ? mergeParamsIntoPath(originPath, params)
    : `/login?${params.toString()}`;
}

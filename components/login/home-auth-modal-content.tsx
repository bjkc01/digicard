import { headers } from "next/headers";
import {
  devAuthBypassEnabled,
  emailAuthEnabled,
  emailAuthUsesConsoleFallback,
  googleAuthEnabled,
  temporaryAccessEnabled,
} from "@/auth";
import { getGoogleAuthHostErrorMessage, isGoogleAuthSupportedHost } from "@/lib/google-auth";
import {
  getDestinationLabel,
  getLoginErrorMessage,
  getLoginNoticeMessage,
  getSafeCallbackUrl,
  type LoginSearchParams,
} from "@/lib/login-flow";
import { HomeAuthModalCard, type AuthModalPanel } from "@/components/login/home-auth-modal-card";

type HomeAuthModalContentProps = {
  originPath?: string;
  searchParams?: LoginSearchParams;
};

function getInitialPanel(searchParams: LoginSearchParams): AuthModalPanel {
  if (searchParams.method === "email" && searchParams.step === "verify") {
    return "verify";
  }

  if (
    searchParams.error === "EmailCodeRequired" ||
    searchParams.error === "EmailCodeInvalid" ||
    searchParams.error === "EmailCodeExpired" ||
    searchParams.error === "EmailSigninFailed"
  ) {
    return "verify";
  }

  if (searchParams.error === "EmailInvalid" || searchParams.error === "EmailSendFailed") {
    return "email";
  }

  if (searchParams.error?.startsWith("TempCredentials")) {
    return "temporary";
  }

  return "choices";
}

export async function HomeAuthModalContent({
  originPath = "/",
  searchParams,
}: HomeAuthModalContentProps) {
  const resolvedSearchParams = searchParams ?? {};
  const callbackUrl = getSafeCallbackUrl(resolvedSearchParams.callbackUrl);
  const headerStore = await headers();
  const requestHost = headerStore.get("x-forwarded-host") ?? headerStore.get("host");
  const googleAvailable = googleAuthEnabled && isGoogleAuthSupportedHost(requestHost);
  const googleDisabledMessage =
    googleAuthEnabled && !googleAvailable ? getGoogleAuthHostErrorMessage() : undefined;

  return (
    <HomeAuthModalCard
      callbackUrl={callbackUrl}
      destinationLabel={getDestinationLabel(callbackUrl)}
      devAuthBypassEnabled={devAuthBypassEnabled}
      emailAddress={resolvedSearchParams.email ?? ""}
      emailAuthUsesConsoleFallback={emailAuthUsesConsoleFallback}
      errorCode={resolvedSearchParams.error}
      errorMessage={getLoginErrorMessage(resolvedSearchParams.error)}
      googleConfigured={googleAvailable}
      googleDisabledMessage={googleDisabledMessage}
      hasAnySignInMethod={googleAvailable || emailAuthEnabled || temporaryAccessEnabled}
      initialPanel={getInitialPanel(resolvedSearchParams)}
      isEmailConfigured={emailAuthEnabled}
      isTemporaryAccessAvailable={temporaryAccessEnabled}
      noticeCode={resolvedSearchParams.notice}
      noticeMessage={getLoginNoticeMessage(resolvedSearchParams.notice)}
      originPath={originPath}
    />
  );
}

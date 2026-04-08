import {
  devAuthBypassEnabled,
  emailAuthEnabled,
  emailAuthUsesConsoleFallback,
  googleAuthEnabled,
  temporaryAccessEnabled,
} from "@/auth";
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

  if (searchParams.error?.startsWith("Email")) {
    return "email";
  }

  if (searchParams.error?.startsWith("TempCredentials")) {
    return "temporary";
  }

  return "choices";
}

export function HomeAuthModalContent({
  originPath = "/",
  searchParams,
}: HomeAuthModalContentProps) {
  const resolvedSearchParams = searchParams ?? {};
  const callbackUrl = getSafeCallbackUrl(resolvedSearchParams.callbackUrl);

  return (
    <HomeAuthModalCard
      callbackUrl={callbackUrl}
      destinationLabel={getDestinationLabel(callbackUrl)}
      devAuthBypassEnabled={devAuthBypassEnabled}
      emailAddress={resolvedSearchParams.email ?? ""}
      emailAuthUsesConsoleFallback={emailAuthUsesConsoleFallback}
      errorCode={resolvedSearchParams.error}
      errorMessage={getLoginErrorMessage(resolvedSearchParams.error)}
      googleConfigured={googleAuthEnabled}
      hasAnySignInMethod={googleAuthEnabled || emailAuthEnabled || temporaryAccessEnabled}
      initialPanel={getInitialPanel(resolvedSearchParams)}
      isEmailConfigured={emailAuthEnabled}
      isTemporaryAccessAvailable={temporaryAccessEnabled}
      noticeCode={resolvedSearchParams.notice}
      noticeMessage={getLoginNoticeMessage(resolvedSearchParams.notice)}
      originPath={originPath}
    />
  );
}

import { redirect } from "next/navigation";
import { getLoginUrl, getSafeCallbackUrl, type LoginSearchParams } from "@/lib/login-flow";

type LoginPageProps = {
  searchParams?: Promise<LoginSearchParams>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const resolvedSearchParams = (await searchParams) ?? {};

  redirect(
    getLoginUrl({
      authView: "modal",
      callbackUrl: getSafeCallbackUrl(resolvedSearchParams.callbackUrl),
      email: resolvedSearchParams.email,
      error: resolvedSearchParams.error,
      notice: resolvedSearchParams.notice,
      originPath: "/",
      step:
        resolvedSearchParams.method === "email" && resolvedSearchParams.step === "verify"
          ? "verify"
          : undefined,
    }),
  );
}

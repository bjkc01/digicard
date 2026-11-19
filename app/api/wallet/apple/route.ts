import { type NextRequest, NextResponse } from "next/server";
import { auth, devAuthBypassEnabled } from "@/auth";
import { getWorkspaceSettings } from "@/lib/workspace-settings";
import { generateAppleWalletPass } from "@/lib/apple-wallet";

export async function GET(request: NextRequest) {
  const session = await auth();

  let userId: string;
  let userEmail: string;
  let userName: string;
  let authProvider: string;
  let isPreview: boolean;

  if (session?.user?.id && session?.user?.email) {
    userId = session.user.id;
    userEmail = session.user.email;
    userName = session.user.name ?? userEmail;
    authProvider = session.user.authProvider ?? "session";
    isPreview = false;
  } else if (devAuthBypassEnabled) {
    userId = "dev-preview-user";
    userEmail = "preview@digicard.local";
    userName = "Preview User";
    authProvider = "dev-bypass";
    isPreview = true;
  } else {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = {
    authDescription: "",
    authLabel: "",
    authProvider,
    email: userEmail,
    id: userId,
    isPreview,
    name: userName,
  };

  const settings = await getWorkspaceSettings(user);
  const cardId = request.nextUrl.searchParams.get("cardId") ?? "primary";

  let name: string;
  let title: string;
  let email: string;
  let company: string;
  let phone: string;
  let linkedin: string;
  let website: string;
  let serialNumber: string;

  if (cardId === "primary") {
    name = settings.profile.name;
    title = settings.profile.title;
    email = settings.profile.email;
    company = settings.card.company;
    phone = settings.card.phone;
    linkedin = settings.card.linkedin;
    website = settings.profile.website;
    serialNumber = `primary-${userId}`;
  } else {
    const extra = settings.extraCards.find((c) => c.id === cardId);
    if (!extra) {
      return NextResponse.json({ error: "Card not found" }, { status: 404 });
    }
    name = extra.profile.name;
    title = extra.profile.title;
    email = extra.profile.email;
    company = extra.card.company;
    phone = extra.card.phone;
    linkedin = extra.card.linkedin;
    website = extra.profile.website;
    serialNumber = `extra-${extra.id}`;
  }

  if (!name || !email) {
    return NextResponse.json(
      { error: "Complete your profile first — name and email are required." },
      { status: 400 },
    );
  }

  const result = await generateAppleWalletPass({
    serialNumber,
    name,
    title,
    company: company || undefined,
    email: email || undefined,
    phone: phone || undefined,
    linkedin: linkedin || undefined,
    website: website || undefined,
  });

  if (result.error) {
    return NextResponse.json({ error: result.error }, { status: 503 });
  }

  const filename = `${name.toLowerCase().replace(/\s+/g, "-")}-digicard.pkpass`;

  return new NextResponse(result.buffer, {
    headers: {
      "Content-Type": "application/vnd.apple.pkpass",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}

import type { Metadata, Viewport } from "next";
import { Toaster } from "sonner";
import { siteConfig } from "@/backend/site-config";
// Manrope is bundled with the app (not downloaded from Google Fonts at build time,
// which made Vercel builds fail randomly). The --font-manrope variable is set in globals.css.
import "@fontsource-variable/manrope";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "DigiCard - Digital Professional Cards",
    template: "%s | DigiCard",
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    description: siteConfig.description,
    siteName: siteConfig.name,
    title: "DigiCard - Digital Professional Cards",
    type: "website",
    url: siteConfig.url,
  },
  twitter: {
    card: "summary_large_image",
    description: siteConfig.description,
    title: "DigiCard - Digital Professional Cards",
  },
  icons: {
    icon: [
      { url: "/brand/icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/brand/icon-64.png", sizes: "64x64", type: "image/png" },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster
          position="bottom-right"
          richColors
          toastOptions={{
            style: {
              borderRadius: "14px",
              fontFamily: "var(--font-manrope)",
              fontSize: "14px",
            },
          }}
        />
      </body>
    </html>
  );
}

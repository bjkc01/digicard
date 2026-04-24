import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import { Toaster } from "sonner";
import { siteConfig } from "@/lib/site-config";
import { CursorGlow } from "@/components/ui/cursor-glow";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700", "800"],
});

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
    icon: "/favicon.svg",
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
      <body className={manrope.variable}>
        <CursorGlow />
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

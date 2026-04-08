import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { Toaster } from "sonner";
import { siteConfig } from "@/lib/site-config";
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
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='8' fill='%230f172a'/><text x='16' y='22' text-anchor='middle' font-family='system-ui,sans-serif' font-size='13' font-weight='700' fill='white'>DC</text></svg>",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={manrope.variable}>
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              borderRadius: "16px",
              fontFamily: "var(--font-manrope)",
              fontSize: "14px",
            },
          }}
        />
      </body>
    </html>
  );
}

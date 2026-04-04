import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "DigiCard — Digital Professional Cards",
  description:
    "Create a digital professional card your team can share with a QR code, keep up to date in one place, and use across meetings, events, and follow-ups.",
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

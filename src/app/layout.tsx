import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: {
    default: "Holy Shrine Incenses",
    template: "%s | Holy Shrine Incenses",
  },
  description:
    "Premium incense crafted from recycled temple flowers — clean burn, long-lasting fragrance, purpose-driven impact.",
  metadataBase: process.env.NEXT_PUBLIC_SITE_URL ? new URL(process.env.NEXT_PUBLIC_SITE_URL) : undefined,
  openGraph: {
    title: "Holy Shrine Incenses",
    description:
      "Premium incense crafted from recycled temple flowers — clean burn, long-lasting fragrance, purpose-driven impact.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}

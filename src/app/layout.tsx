import type { Metadata } from "next";
import { Inter, Zilla_Slab } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingPhoneCTA from "@/components/FloatingPhoneCTA";
import JsonLd from "@/components/JsonLd";
import CookieConsent from "@/components/CookieConsent";
import { localBusinessSchema } from "@/lib/schema";
import { site } from "@/lib/site";
import { media } from "@/lib/media";
import { consentBootstrap } from "@/lib/consent";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const zilla = Zilla_Slab({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-zilla",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "H&S Insulation, Spray Foam, Blown-In & Batt Insulation in NorCal",
    template: "%s | H&S Insulation",
  },
  description:
    "Locally owned insulation contractor serving Yuba City, Marysville, and Northern California since 2016. Spray foam, blown-in, batt insulation, and old insulation removal. Free estimates, English & Spanish.",
  keywords: [
    "insulation contractor Yuba City",
    "spray foam insulation",
    "blown-in insulation",
    "attic insulation NorCal",
    "insulation removal",
    "Marysville insulation",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: site.brand,
    title: "H&S Insulation, NorCal Insulation, Done Clean",
    description:
      "Spray foam, blown-in, batt insulation, and old insulation removal across Yuba City and Northern California. Free estimates, English & Spanish.",
    images: [{ url: media.og, width: 1200, height: 630, alt: "H&S Insulation" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "H&S Insulation, NorCal Insulation, Done Clean",
    description: "Spray foam, blown-in, batt & insulation removal across Northern California. Free estimates.",
    images: [media.og],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${zilla.variable} h-full`}>
      <head>
        {/* Consent Mode v2 defaults. A raw head script, not next/script: an inline
            beforeInteractive Script is serialised into the RSC payload and only runs
            at hydration, which lets the GA4 tag fire ahead of the defaults. */}
        {site.gaId && site.gaId !== "G-XXXXXXXXXX" && (
          <script dangerouslySetInnerHTML={{ __html: consentBootstrap() }} />
        )}
      </head>
      <body className="flex min-h-full flex-col bg-white antialiased">
        <JsonLd data={localBusinessSchema()} />
        {site.gaId && site.gaId !== "G-XXXXXXXXXX" && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${site.gaId}`} strategy="afterInteractive" />
            <Script id="ga4" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${site.gaId}');`}
            </Script>
          </>
        )}
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingPhoneCTA />
        <CookieConsent />
      </body>
    </html>
  );
}

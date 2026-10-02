import type { Metadata } from "next";
import localFont from "next/font/local";
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

// These are the existing production font subsets packaged locally so builds do
// not require a runtime request to Google Fonts.
const inter = localFont({
  src: "../../public/fonts/inter-latin.woff2",
  variable: "--font-inter",
  display: "swap",
  weight: "100 900",
});
const zilla = localFont({
  src: [
    { path: "../../public/fonts/zilla-slab-500-latin.woff2", weight: "500" },
    { path: "../../public/fonts/zilla-slab-600-latin.woff2", weight: "600" },
    { path: "../../public/fonts/zilla-slab-700-latin.woff2", weight: "700" },
  ],
  variable: "--font-zilla",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Insulation Contractor in Yuba City, CA | H&S Insulation",
    template: "%s | H&S Insulation",
  },
  description:
    "Locally owned insulation contractor in Yuba City since 2016. Spray foam, blown-in and batt insulation, plus removal. Free estimates, English & Spanish.",
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

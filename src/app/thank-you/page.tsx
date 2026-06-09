import type { Metadata } from "next";
import Link from "next/link";
import { LogoIcon } from "@/components/Logo";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Thank You",
  description: "Thanks for reaching out to H&S Insulation. We'll be in touch shortly.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/thank-you" },
};

export default function ThankYouPage() {
  return (
    <section className="flex min-h-[70vh] items-center bg-cream-2 py-20">
      <div className="container-x max-w-xl text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-card">
          <LogoIcon className="h-11 w-11" />
        </div>
        <h1 className="font-display mt-6 text-3xl font-extrabold text-graphite sm:text-4xl">
          Thank you — we got it!
        </h1>
        <p className="mt-4 text-lg text-[#4a4d51]">
          Thanks for reaching out to H&amp;S Insulation. We&apos;ll get back to you shortly to schedule your free estimate. Need us sooner?
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a href={site.phoneHref} className="inline-flex items-center justify-center rounded-full bg-orange px-7 py-3 text-sm font-semibold text-white hover:bg-orange-dark">
            Call {site.phone}
          </a>
          <Link href="/" className="inline-flex items-center justify-center rounded-full border border-graphite/20 px-7 py-3 text-sm font-semibold text-graphite hover:border-orange hover:text-orange">
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}

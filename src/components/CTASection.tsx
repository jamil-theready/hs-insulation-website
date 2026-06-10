import Link from "next/link";
import { site } from "@/lib/site";
import { Eyebrow } from "./ui";

export default function CTASection({
  heading = "Let's make your home comfortable again",
  text = "Free, no-pressure estimates. We show up on time, work clean, and explain everything in plain language, English or Spanish.",
}: {
  heading?: string;
  text?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-ink py-20">
      {/* wave motif backdrop */}
      <svg aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.06]" preserveAspectRatio="none" viewBox="0 0 1200 400">
        {[60, 130, 200, 270, 340].map((y) => (
          <path key={y} d={`M-20,${y} q60,40 120,0 t120,0 t120,0 t120,0 t120,0 t120,0 t120,0 t120,0 t120,0 t120,0 t120,0`} fill="none" stroke="#F26A21" strokeWidth={3} strokeLinecap="round" />
        ))}
      </svg>
      <div className="container-x relative text-center">
        <Eyebrow light>Get Started</Eyebrow>
        <h2 className="font-display mx-auto mt-4 max-w-2xl text-3xl font-extrabold text-cream sm:text-4xl">
          {heading}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-cream/70">{text}</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full bg-orange px-8 py-3.5 text-sm font-semibold text-white shadow-lift transition-transform hover:-translate-y-0.5"
          >
            Get a Free Estimate
          </Link>
          <a
            href={site.phoneHref}
            className="inline-flex items-center justify-center rounded-full border border-white/30 px-8 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-white/10"
          >
            Call {site.phone}
          </a>
        </div>
      </div>
    </section>
  );
}

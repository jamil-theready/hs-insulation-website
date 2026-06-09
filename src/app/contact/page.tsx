import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import { WaveTick } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact — Free Insulation Estimate",
  description:
    "Request a free, no-pressure insulation estimate from H&S Insulation. Serving Yuba City and Northern California. Call or fill out the form — English & Spanish.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const items = [
    { label: "Call or text", value: site.phone, href: site.phoneHref },
    { label: "Email", value: site.email, href: site.emailHref },
    { label: "Service area", value: `${site.baseCity}, ${site.state} & NorCal corridor` },
    { label: "Hours", value: site.hours },
  ];
  return (
    <>
      <PageHero
        eyebrow="Get in touch"
        title="Request your free estimate"
        subtitle="Tell us about your home and we'll get back to you fast. No pressure, no obligation — and yes, we speak Spanish."
        breadcrumbs={[{ name: "Home", href: "/" }, { name: "Contact", href: "/contact" }]}
      />

      <section className="py-20 sm:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <div>
              <h2 className="font-display text-2xl font-bold text-graphite">Talk to a real person</h2>
              <p className="mt-3 text-[#4a4d51]">
                Prefer to call? We&apos;d love to hear from you. Otherwise, fill out the form and we&apos;ll reach out to schedule your free estimate.
              </p>
              <ul className="mt-8 space-y-5">
                {items.map((it) => (
                  <li key={it.label} className="flex items-start gap-3">
                    <WaveTick className="mt-1.5 text-orange" />
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted">{it.label}</p>
                      {it.href ? (
                        <a href={it.href} className="font-semibold text-graphite hover:text-orange break-all">{it.value}</a>
                      ) : (
                        <p className="font-semibold text-graphite">{it.value}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-8 rounded-2xl bg-ink p-6">
                <p className="font-display text-lg font-bold text-cream">Free &amp; no-pressure</p>
                <p className="mt-1 text-sm text-cream/65">
                  We&apos;ll inspect your home, measure what&apos;s there, and give you an honest written quote — at no cost.
                </p>
              </div>
            </div>
          </Reveal>

          <div className="lg:col-span-7">
            <Reveal delay={0.1}>
              <div className="rounded-3xl border border-line bg-white p-6 shadow-card sm:p-8">
                <ContactForm />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

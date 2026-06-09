import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import Media from "@/components/Media";
import CTASection from "@/components/CTASection";
import { ArrowRight } from "@/components/ui";
import { services, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Insulation Services, Spray Foam, Blown-In, Batt & Removal",
  description:
    "Spray foam, blown-in, and batt insulation, plus complete old insulation removal across Northern California. Free estimates from a locally owned crew.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="What we do"
        title="Insulation services for every part of your home"
        subtitle={`From a quick attic top-up to a full removal and reinstall, H&S handles the work that keeps ${site.region} homes comfortable year-round.`}
        breadcrumbs={[{ name: "Home", href: "/" }, { name: "Services", href: "/services" }]}
      />

      <section className="py-20 sm:py-24">
        <div className="container-x space-y-8">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.05}>
              <div className={`grid items-center gap-8 rounded-3xl border border-line bg-white p-5 shadow-card sm:p-7 lg:grid-cols-2 ${i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}>
                <Media src={s.image} alt={s.name} className="aspect-[16/10]" />
                <div className="lg:px-4">
                  <h2 className="font-display text-2xl font-bold text-graphite sm:text-3xl">{s.name}</h2>
                  <p className="mt-3 text-[#4a4d51]">{s.blurb}</p>
                  <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                    {s.benefits.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-sm text-[#3a3d41]">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange" />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <Link href={`/services/${s.slug}`} className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-orange-dark hover:gap-2.5 transition-all">
                    Learn more about {s.short} <ArrowRight />
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <CTASection />
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import CTASection from "@/components/CTASection";
import { ArrowRight } from "@/components/ui";
import { serviceAreas, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Service Areas, Insulation Across Northern California",
  description:
    "H&S Insulation serves Yuba City, Marysville, Sutter County, Grass Valley, Auburn, Truckee, and Lake Tahoe. Find your city, request a free estimate.",
  alternates: { canonical: "/service-areas" },
};

export default function ServiceAreasPage() {
  return (
    <>
      <PageHero
        eyebrow="Where we work"
        title="Insulation across Northern California"
        subtitle={`From our home base in ${site.baseCity}, we serve homeowners up the corridor, valley floor to foothills to the Tahoe basin.`}
        breadcrumbs={[{ name: "Home", href: "/" }, { name: "Service Areas", href: "/service-areas" }]}
      />

      <section className="py-20 sm:py-24">
        <div className="container-x grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {serviceAreas.map((a, i) => (
            <Reveal key={a.slug} delay={i * 0.05}>
              <Link href={`/service-areas/${a.slug}`} className="group flex h-full flex-col rounded-2xl border border-line bg-white p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-lift">
                <div className="flex items-center justify-between">
                  <h2 className="font-display text-xl font-bold text-graphite group-hover:text-orange-dark">{a.city}</h2>
                  <ArrowRight className="text-muted transition-transform group-hover:translate-x-1 group-hover:text-orange" />
                </div>
                {a.county && <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-muted">{a.county}</p>}
                <p className="mt-3 flex-1 text-sm leading-relaxed text-[#4a4d51]">{a.blurb}</p>
                <p className="mt-4 text-sm font-medium text-orange-dark">{a.note}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <CTASection heading="Not sure if you're in our area?" text="Give us a call, if we can help, we'll tell you straight." />
    </>
  );
}

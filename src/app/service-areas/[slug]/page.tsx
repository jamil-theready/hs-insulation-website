import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import CTASection from "@/components/CTASection";
import JsonLd from "@/components/JsonLd";
import { ArrowRight } from "@/components/ui";
import { serviceAreas, areaBySlug, services, site } from "@/lib/site";
import { breadcrumbSchema, serviceAreaSchema } from "@/lib/schema";

export function generateStaticParams() {
  return serviceAreas.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = areaBySlug(slug);
  if (!a) return {};
  return {
    title: `Insulation in ${a.city}, CA`,
    description: `Spray foam, blown-in, batt insulation and removal in ${a.city}${a.county ? `, ${a.county}` : ""}. ${a.note} Free estimates from H&S Insulation.`,
    alternates: { canonical: `/service-areas/${a.slug}` },
  };
}

export default async function AreaDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = areaBySlug(slug);
  if (!a) notFound();

  return (
    <>
      <JsonLd
        data={[
          serviceAreaSchema(a),
          breadcrumbSchema([
            { name: "Home", url: site.url },
            { name: "Service Areas", url: `${site.url}/service-areas` },
            { name: a.city, url: `${site.url}/service-areas/${a.slug}` },
          ]),
        ]}
      />
      <PageHero
        eyebrow={a.county ? `${a.county}` : "Service area"}
        title={`Insulation in ${a.city}`}
        subtitle={a.blurb}
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Service Areas", href: "/service-areas" },
          { name: a.city, href: `/service-areas/${a.slug}` },
        ]}
      />

      <section className="py-20 sm:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-cream-2 px-4 py-1.5 text-xs font-semibold text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-orange" /> {a.elevation}
              </div>
              <h2 className="font-display text-3xl font-bold text-graphite">
                Insulation built for {a.city}&apos;s climate
              </h2>
              <div className="mt-5 space-y-5 text-lg leading-relaxed text-[#4a4d51]">
                <p>{a.climate}</p>
                <div>
                  <h3 className="font-display text-xl font-bold text-graphite">The homes we work on here</h3>
                  <p className="mt-2">{a.housing}</p>
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-graphite">What we usually recommend in {a.city}</h3>
                  <p className="mt-2">{a.emphasis}</p>
                </div>
              </div>

              <div className="mt-8">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted">Areas we serve in &amp; around {a.city}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {a.neighborhoods.map((n) => (
                    <span key={n} className="rounded-full border border-line bg-white px-3.5 py-1.5 text-sm text-graphite">{n}</span>
                  ))}
                </div>
              </div>

              <div className="mt-8 rounded-2xl border border-orange/30 bg-orange-soft px-5 py-4">
                <p className="font-semibold text-graphite">{a.note} We work in English and Spanish.</p>
              </div>
            </Reveal>
          </div>

          <aside className="lg:col-span-5">
            <Reveal delay={0.1}>
              <div className="rounded-2xl border border-line bg-cream-2 p-6">
                <h3 className="font-display text-lg font-bold text-graphite">Services in {a.city}</h3>
                <ul className="mt-4 space-y-2.5">
                  {services.map((s) => (
                    <li key={s.slug}>
                      <Link href={`/services/${s.slug}`} className="group flex items-center justify-between rounded-xl bg-white px-4 py-3 text-sm font-medium text-graphite shadow-sm transition-colors hover:text-orange-dark">
                        {s.name}
                        <ArrowRight className="text-muted transition-transform group-hover:translate-x-1 group-hover:text-orange" />
                      </Link>
                    </li>
                  ))}
                </ul>
                <a href={site.phoneHref} className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-orange px-5 py-3 text-sm font-semibold text-white hover:bg-orange-dark">
                  Call {site.phone}
                </a>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>

      <CTASection heading={`Ready for a free estimate in ${a.city}?`} />
    </>
  );
}

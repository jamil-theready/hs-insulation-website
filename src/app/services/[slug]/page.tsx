import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import Media from "@/components/Media";
import CTASection from "@/components/CTASection";
import JsonLd from "@/components/JsonLd";
import { ArrowRight } from "@/components/ui";
import { services, serviceBySlug, site } from "@/lib/site";
import { serviceSchema, breadcrumbSchema } from "@/lib/schema";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = serviceBySlug(slug);
  if (!s) return {};
  return {
    title: `${s.name} in NorCal`,
    description: s.blurb,
    alternates: { canonical: `/services/${s.slug}` },
  };
}

export default async function ServiceDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = serviceBySlug(slug);
  if (!s) notFound();

  const others = services.filter((x) => x.slug !== s.slug);

  return (
    <>
      <JsonLd
        data={[
          serviceSchema(s.name, s.blurb, s.slug),
          breadcrumbSchema([
            { name: "Home", url: site.url },
            { name: "Services", url: `${site.url}/services` },
            { name: s.name, url: `${site.url}/services/${s.slug}` },
          ]),
        ]}
      />
      <PageHero
        eyebrow="Insulation service"
        title={s.name}
        subtitle={s.blurb}
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
          { name: s.short, href: `/services/${s.slug}` },
        ]}
      />

      <section className="py-20 sm:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <Media src={s.image} alt={s.name} className="aspect-[16/10]" priority />
            </Reveal>
            <div className="mt-10 space-y-8">
              {s.body.map((b, i) => (
                <Reveal key={b.heading} delay={i * 0.05}>
                  <div>
                    <h2 className="font-display text-2xl font-bold text-graphite">{b.heading}</h2>
                    <p className="mt-3 text-lg leading-relaxed text-[#4a4d51]">{b.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <aside className="lg:col-span-5">
            <Reveal delay={0.1}>
              <div className="sticky top-24 space-y-6">
                <div className="rounded-2xl border border-line bg-cream-2 p-6">
                  <h3 className="font-display text-lg font-bold text-graphite">Why it matters</h3>
                  <ul className="mt-4 space-y-3">
                    {s.benefits.map((b) => (
                      <li key={b} className="flex items-start gap-3 text-sm text-[#3a3d41]">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange text-white">
                          <svg viewBox="0 0 20 20" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={3}><path d="M4 10l4 4 8-9" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </span>
                        {b}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 rounded-xl bg-white p-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted">Best for</p>
                    <p className="mt-1 text-sm text-graphite">{s.bestFor}</p>
                  </div>
                </div>

                <div className="rounded-2xl bg-ink p-6 text-center">
                  <p className="font-display text-lg font-bold text-cream">Get a free estimate</p>
                  <p className="mt-1 text-sm text-cream/65">No pressure, no obligation.</p>
                  <a href={site.phoneHref} className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-orange px-5 py-3 text-sm font-semibold text-white hover:bg-orange-dark">
                    Call {site.phone}
                  </a>
                  <Link href="/contact" className="mt-2 inline-flex w-full items-center justify-center rounded-full border border-white/25 px-5 py-3 text-sm font-semibold text-cream hover:bg-white/10">
                    Request online
                  </Link>
                </div>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>

      {/* Other services */}
      <section className="bg-cream-2 py-16">
        <div className="container-x">
          <h2 className="font-display text-2xl font-bold text-graphite">Other services</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            {others.map((o) => (
              <Link key={o.slug} href={`/services/${o.slug}`} className="group flex items-center justify-between rounded-2xl border border-line bg-white p-5 shadow-card transition-all hover:-translate-y-1 hover:shadow-lift">
                <span className="font-display font-bold text-graphite group-hover:text-orange-dark">{o.name}</span>
                <ArrowRight className="text-muted transition-transform group-hover:translate-x-1 group-hover:text-orange" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
